/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/polymer/polymer-legacy.js";
import { TriplatOfflineBehavior } from "./triplat-offline-behavior.js";
import "./triplat-offline-ds-registry.js";
import { TriplatServerStatus } from "./triplat-server-status.js";
import { afterNextRender } from "../@polymer/polymer/lib/utils/render-status.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import { cacheAllAuthChecks } from "../triplat-auth-check/triplat-auth-check.js";

/*
The `triplat-offline-manager` adds an offline user experience to UX applications. It uses the following Web APIs:
- Service Worker: A script that your browser runs in the background, separate from a web page, and intercepts and handles network requests, including programmatically managing a cache of responses.
- Cache: A storage mechanism for Request/Response object pairs that are cached, usually as part of the Service Worker life cycle. It is used to cache the HTML, CSS, Javascript and image files.
- IndexedDB: A way to persistently store data inside your browser. It is used to store the records and to queue the changes made when the application is offline.

All the logic to handle the offline experience is handled by this component and abstracted from the application. The application does not need to create a Service Worker script or to create code to 
save files into the Cache or to save the records into the IndexedDB. To support an offline experience, the application uses the `triplat-offline-manager` and `triplat-ds-offline` components and the cache 
property that is added to the `triplat-image` and `triplat-file` components.

Example:
```
<triplat-offline-manager id="offlineManager" online="{{online}}" 
  config-file="sw-config.json">
</triplat-offline-manager>
```

### Prerequisites

- The browser must support the Service Worker, Cache and IndexedDB APIs for this component to be usable. The most recent versions of Chrome, Firefox and Safari support these APIs.
- During development, you can use Service Worker through your localhost. But to use it on production, for security reasons, you must have HTTPS configured on your TRIRIGA server. In other words, to guarantee that the Service Worker code is not tampered or compromised during its journey across the network, you must download it over an HTTPS connection.

### Config file

A JSON config file can be used to specify a list of application files (like HTML, JS, and CSS) that must be loaded into the cache when installing the Service Worker.
The name of the config file must be passed to the `config-file` property.

Example:
```
{
  "appFiles": [
	"../my-app-view/page1.html",
	"../my-app-view/page2.html",
	"../my-app-view/styles1.css",
	"../my-app-view/script1.js"
  ]
}
```
You can also use the `config-dev-file` property to specify a config file when you are running the application in development mode.

### Installing the Service Worker

The Service Worker is installed by the `triplat-offline-manager`. It can be installed automatically when the application loads if the autoInstall property is true, or manually by calling the install method.
If the Service Worker is already installed, the installation is skipped.
After the Service Worker is installed, it will intercept all requests made by the application to get or change files and data.

### Downloading data

The download process caches the following data:
- All the files specified in the JSON config file.
- All the records bound to data sources configured with the `triplat-ds-offline` element.
- All the `triplat-auth-check` data used by the application.

The download process is started on any of the following occasions:
- After the Service Worker is installed.
- By calling the download method. It will update the cache with the most recent data from the server.
- When loading the application and the time in seconds since the last download is greater than the value specified by the cacheMaxAge property. It will update the cache with the most recent data from the server.
- When using the same device and browser, the user logging into the application is different from the last user. It will clear the cache and download all the data and files again.
- Whenever the application is online and it requests one or more records using the `triplat-ds` component, it will update the records already saved in the cache.

### Configuring data sources to cache records

The Service Worker automatically download the records from the data sources if it is configured to do so. The data source can be configured in the application code by adding a `triplat-ds-offline` element to a 
`triplat-ds` component.
See the `triplat-ds-offline` component documentation for detailed information.

### Running in offline mode

If the TRIRIGA server is not reachable for any reason, then the application will run in offline mode. 
In offline mode, all the files and data requested by the application will be served by Service Worker from the cache. 
The application continues to use the same `triplat-ds` properties and methods as it would use in online mode. 
Also, all the actions executed by the user while offline is queued in the IndexedDB.
When the TRIRIGA server is online again, the Service Worker will upload to the server all the pending actions executed while offline.
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<triplat-offline-ds-registry id="offlineDsRegistry"></triplat-offline-ds-registry>
		<triplat-server-status on-online-changed="_handleServerStatusOnlineChanged"></triplat-server-status>
	`,

    is: "triplat-offline-manager",

    behaviors: [
		TriplatOfflineBehavior
	],

    /**
	 * Fired when the download of data from the server to the cache succeeds.
	 *
	 * @event download-success
	 */

	/**
	 * Fired when the download of data from the server to the cache fails.
	 * The event contains an error object with the following properties:
	 * - message: The translated error message.
	 * - cause:  It contains one of the following strings:
	 *    - UNAUTHORIZED: If there was a session timeout or unauthorized access.
	 *    - FILE_NOT_FOUND: If a file specified in the JSON config files was not found on the server.
	 *    - CANNOT_EXECUTE_OFFLINE: If the application is running in offline mode.
	 *    - HAS_PENDING_ACTIONS_ERROR: If there are pending actions in the offline queue.
	 *    - QUOTA_EXCEEDED_ERROR: If there is insufficient storage available.
	 *    - DOWNLOAD_FAILED: If the download process failed for any other reason.
	 * @event download-error
	 */

	/**
	 * Fired when the upload of a pending action succeeds.
	 *
	 * @event upload-success
	 */

	/**
	 * Fired when the upload of a pending action fails.
	 * The event contains an error object with the following properties:
	 * - message: The translated error message.
	 * - cause:  It contains one of the following strings:
	 *    - UNAUTHORIZED: If there was a session timeout or unauthorized access.
	 *    - CANNOT_EXECUTE_OFFLINE: If the application is running in offline mode.
	 *    - UPLOAD_FAILED: If the upload of a pending action failed for any other reason.
	 * @event upload-error
	 */

	properties: {
		
		/**
		 * Returns the online status of the application. It is false when the TRIRIGA server is not reachable.
		 */
		online: {
			type: Boolean,
			notify: true,
			readOnly: true,
			observer: "_handleOnlineChange"
		},
		
		/**
		 * Indicates if the browser supports the Service Worker and Cache APIs.
		 */
		supported: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false
		},
		
		/**
		 * It is true when the Service Worker is installed and the offline support is ready to be used.
		 */
		installed: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false
		},
		
		/**
		 * The name of a JSON config file that contains the list of application files (like HTML, JS and CSS) that must be loaded into the cache 
		 * after the Service Worker is installed.
		 * This property is optional and if it is empty, the Service Worker caches the application files only when the application fetches them.
		 */
		configFile: {
			type: String,
			value: ""
		},
		
		/**
		 * The name of a JSON config file that overrides the configFile property when running the application in development mode.
		 * This property is optional and if it is empty, the JSON config file specified in the configFile property will be used instead.
		 */
		configDevFile: {
			type: String,
			value: ""
		},
		
		/**
		 * Indicates if the Service Worker is uploading to the TRIRIGA server all the actions executed offline.
		 */
		uploading: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false,
			observer: "_handleUploadingChanged"
		},
		
		/**
		 * Indicates if the Service Worker is downloading data from the TRIRIGA server to the local cache.
		 */
		downloading: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false,
			observer: "_handleDownloadingChanged"
		},

		/**
		 * It is true whenever there are pending actions in the queue, waiting to be uploaded to the TRIRIGA server.
		 */
		hasPendingActions: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false
		},
		
		/**
		 * If the `hasUploadError` property is true, this property will contain an error object describing why the upload of the action failed.
		 * The error object contains the following properties:
		 * - appContext: A brief description of the action that failed. It is the same context string specified by the application when calling any action method on the `triplat-ds` component.
		 * - translatedMessage: The translated error message.
		 * - error.errorType: It contains one of the following strings:
		 *     - UserMismatch: If the current user does not match the user who executed the offline action.
		 *     - PerformActionException: If the server returns an exception when uploading a pending action.
		 *     - ImageSaveException: If the upload of an image file failed.
		 *     - FileSaveException: If the upload of a binary file failed.
		 *     - SecurityException or ContextSecurityViolation: If a security violation was detected when uploading a pending action.
		 */
		uploadError: {
			type: Object,
			notify: true,
			readOnly: true,
			value: null
		},
		
		/**
		 * Indicates if the last attempt of uploading a pending action to the TRIRIGA server failed.
		 */
		hasUploadError: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false
		},
		
		/**
		 * The date and time of the last complete data download from the TRIRIGA server to the cache.
		 */
		lastDownload: {
			type: Date,
			notify: true,
			readOnly: true
		},
		
		/**
		 * Specifies the maximum amount of time in seconds, since the last complete download, that the data in the cache is considered fresh. After this time is exceeded, 
		 * on the next time the application is loaded, the Service Worker will automatically update all the records in the cache with the most recent data from the server.
		 * If this property is less than or equal to zero, the Service Worker never automatically updates all the records in the cache.
		 */
		cacheMaxAge: {
			type: Number,
			value: 60 * 60 
		},
		
		/**
		 * If true, the Service Worker will be installed when the application loads.
		 */
		autoInstall: {
			type: Boolean,
			value: false
		},
		
		/**
		 * Callback function invoked as the last step of the download process.
		 * It takes no arguments and if it returns a promise, the download process will wait until the promise is resolved or rejected.
		 * This can be used by the application to manually save records into the cache.
		 * @type Function
		 */
		downloadCallback: {
			type: Object,
			value: null
		},
		
		_downloadPromise: {
			type: Object,
			value: null
		},
		
		_translatedMessages: {
			type: Object,
			value: function () {
				var __dictionary__notSupported = "Service worker not supported by the browser.";
				var __dictionary__notSupportedInsecure = "Service worker not supported with insecure connection.";
				var __dictionary__notInstalled = "Service worker not installed for this application.";
				var __dictionary__cannotExecuteOffline =  "Cannot execute while offline.";
				var __dictionary__uploadFailed =  "Error in uploading a pending action.";
				var __dictionary__downloadFailed =  "Error in downloading the data for offline work.";
				var __dictionary__hasPendingActionsError = "The application data cannot be downloaded if there are pending actions.";
				var __dictionary__uploadSuccess = "Pending actions were uploaded.";
				var __dictionary__downloadSuccess = "Data for offline work was downloaded.";
				var __dictionary__fileNotFoundError = "A requested file was not found.";
				var __dictionary__unAuthorizedError = "Session timeout or unauthorized access.";
				var __dictionary__quotaExceededError = "Insufficient storage available.";
				
				var _messages = {};
				_messages["NOT_SUPPORTED"] = __dictionary__notSupported;
				_messages["NOT_SUPPORTED_INSECURE"] = __dictionary__notSupportedInsecure;
				_messages["NOT_INSTALLED"] = __dictionary__notInstalled;
				_messages["CANNOT_EXECUTE_OFFLINE"] = __dictionary__cannotExecuteOffline;
				_messages["UPLOAD_FAILED"] = __dictionary__uploadFailed;
				_messages["DOWNLOAD_FAILED"] = __dictionary__downloadFailed;
				_messages["HAS_PENDING_ACTIONS_ERROR"] = __dictionary__hasPendingActionsError;
				_messages["UPLOAD_SUCCESS"] = __dictionary__uploadSuccess;
				_messages["DOWNLOAD_SUCCESS"] = __dictionary__downloadSuccess;
				_messages["FILE_NOT_FOUND"] = __dictionary__fileNotFoundError;
				_messages["UNAUTHORIZED"] = __dictionary__unAuthorizedError;
				_messages["QUOTA_EXCEEDED_ERROR"] = __dictionary__quotaExceededError;

				return _messages;
			}
		}
	},

    observers: [
		"_handleUploadErrorChanged(hasPendingActions, uploadError)"
	],

    ready: function () {
		this._setSupported("serviceWorker" in navigator);
		this._setInstalled(this._isInstalled());
		this._setupNetworkStatusListener();
		this._setupServiceWorkerMessageListener();
		this._setupGetServerStatus()
			.then(this._setupUploading.bind(this))
			.then(this._setupHasPendingActions.bind(this))
			.then(this._setupLastDownload.bind(this))
			.then(function() {
				afterNextRender(this, function() {
					if (this.autoInstall && this.supported && this.online && !this.uploading) {
						this.install().catch(function(error) {
							console.log("triplat-offline-manager:", error);
						});
					}
				});
			}.bind(this));
	},

    /**
	 * Installs the Service Worker for the current application, if it is not already installed. The application can safely call this method even if the Service Worker is already installed.
	 * If the Service Worker is already installed and there are pending actions, it will start the process of uploading the pending actions.
	 * Otherwise, it will start the download process.
	 * Returns a promise that indicates if the installation was successful or not.
	 */
	install: function() {
		return this._checkSupported()
			.then(this._checkOnline.bind(this))
			.then(this._registerServiceWorker.bind(this))
			.then(this._syncData.bind(this, false, true));
	},

    /**
	 * Uninstall the Service Worker for the current application.
	 * Returns a promise that indicates if the removal was successful or not.
	 */
	uninstall: function() {
		return this._checkSupported()
			.then(this._checkInstalled.bind(this))
			.then(this._setupHasPendingActions.bind(this))
			.then(this._checkHasNoPendingActions.bind(this))
			.then(this._deleteAppRecord.bind(this))
			.then(this._getActiveServiceWorker.bind(this))
			.then(this._doUnregister.bind(this));
	},

    /**
	 * Skips pending actions from the offline queue. The skipped action is discarded and it is not uploaded to the server.
	 * @param {Boolean} allActions If true, it skips all the pending actions. Otherwise, it skips only the first pending action in the queue.
	 * After the skip is complete, if there are pending actions remaining in the queue then it will start the upload process of the remaining pending actions.
	 * Otherwise, the returned promise will resolve to the NO_MORE_PENDING_ACTIONS value. 
	 */
	skipAction: function(allActions) {
		return new Promise(this._doSkipAction.bind(this, allActions));
	},

    _doSkipAction: function(allActions, resolve, reject) {
		if (!this.supported || !this.installed) {
			return resolve();
		}
		this._sendCommand("skipAction", { allActions: allActions })
			.then(function() {
				afterNextRender(this, function() {
					if (this.hasPendingActions) {
						this._uploadPendingActions()
							.then(resolve)
							.catch(reject);
					} else {
						resolve("NO_MORE_PENDING_ACTIONS");	
					}
				});
			}.bind(this))
			.catch(reject);
	},

    /**
	 * Tries again to upload the pending actions in the queue.
	 */
	retryUpload: function() {
		return this._uploadPendingActions(true);
	},

    _syncData: function(forceCache, forceUpload) {
		if (this.hasPendingActions) {
			return this._uploadPendingActions(forceUpload);
		} else {
			return this._download(forceCache);
		}
	},

    /**
	 * Starts the process of downloading and updating all the files and records in the cache with the most recent data from the server.
	 * Returns a promise that resolves when the download process is completed.
	 */
	download: function() {
		return this._download(true);
	},

    _download: function(force) {
		if (!this.downloading) {
			this._setDownloading(true); 
			this._downloadPromise =	this._checkSupported()
				.then(this._checkOnline.bind(this))
				.then(this._cacheApplicationFiles.bind(this, force))
				.then(this._cacheAutomaticOfflineDS.bind(this))
				.then(this._cacheAuthRequests.bind(this))
				.then(this._runDownloadCallback.bind(this))
				.then(this._setupLastDownload.bind(this))
				.then(this._fireDownloadSuccess.bind(this))
				.catch(this._handleDownloadError.bind(this));
		}
		return this._downloadPromise;
	},

    _fireDownloadSuccess: function() {
		this._setDownloading(false); 
		var message = this._getMessage("DOWNLOAD_SUCCESS");
		this.fire("download-success", message);
		return message;
	},

    _handleDownloadError: function(error) {
		this._setDownloading(false); 
		if (error && error.cause == "CACHE_NOT_STALE") {
			return Promise.resolve();//Ignore cache not stale error
		}
		var errorMessage = this._getErrorMessage(error, "DOWNLOAD_FAILED");
		this.fire("download-error", errorMessage);
		return Promise.reject(errorMessage);
	},

    _uploadPendingActions: function(forceUpload) {
		if (!this.hasPendingActions) {
			return Promise.resolve();
		}
		if (this.hasUploadError && !forceUpload) {
			return Promise.resolve();//Do not start the upload process if there last upload failed and the upload is not forced.
		}		
		return this._checkSupported()
			.then(this._checkOnline.bind(this))
			.then(this._doUpload.bind(this))
			.then(this._getMessage.bind(this, "UPLOAD_SUCCESS"))
			.catch(this._handleUploadError.bind(this));
	},

    _handleUploadingChanged: function(uploadingNew, uploadingOld) {
		if (!uploadingNew && uploadingOld && !this.hasPendingActions) {
			this._fireUploadSuccess();
		}
	},

    _fireUploadSuccess: function() {
		var message = this._getMessage("UPLOAD_SUCCESS");
		this.fire("upload-success", message);
	},

    _handleUploadError: function(error) { 
		var errorMessage = this._getErrorMessage(error, "UPLOAD_FAILED");
		this.fire("upload-error", errorMessage);
		return Promise.reject(errorMessage);
	},

    _doUnregister: function(swReg) {
		return swReg.unregister().then(
			function(result) {
				this._setInstalled(false);
				return result
			}.bind(this)
		);
	},

    _cacheApplicationFiles: function(forceCache) {
		return this._sendCommand("cacheApplication", { offlineDsList: this._getOfflineDsList(), cacheMaxAge: this.cacheMaxAge, forceCache: forceCache});
	},

    _doUpload: function() {
		return this._sendCommand("uploadPendingActions");
	},

    _isInstalled: function() {
		return this.supported && navigator.serviceWorker.controller != null
	},

    _registerServiceWorker: function() {
		var serviceWorkerUrl = location.pathname + "/sw.js";
		var queryString = "";
		if (this.configFile) {
			queryString = "config=" + this.configFile;
		}
		if (this.configDevFile) {
			queryString += queryString.length > 0 ? "&" : "";
			queryString += "configDev=" + this.configDevFile;
		}
		if (queryString.length > 0) {
			serviceWorkerUrl = serviceWorkerUrl + "?" + queryString;
		}
		return navigator.serviceWorker.register(serviceWorkerUrl, { scope: location.pathname })
			.then(this._waitServiceWorkerRegistration.bind(this))
			.then(this._setInstalled.bind(this, true))
			.catch(function(error) {
				if (error.code == 18) {
					this._setSupported(false);
					return Promise.reject(this._getMessage("NOT_SUPPORTED_INSECURE"));
				}
				return Promise.reject(error);
			}.bind(this));
	},

    _waitServiceWorkerRegistration: function(serviceWorkerRegistration) {
		return new Promise(function(resolve) {
			this.async(
				function() {
					resolve(serviceWorkerRegistration);
				},
				3000 //wait any new service worker to be activated
			);
		}.bind(this));
	},

    _cacheAutomaticOfflineDS: function() {
		var automaticOfflineDS = this.$.offlineDsRegistry.getAllAutomatic();
		var cachePromises = automaticOfflineDS.map(
			function(offlineDs) {
				return offlineDs._cache();
			}
		);
		return Promise.all(cachePromises);
	},

    _getOfflineDsList: function() {
		return this.$.offlineDsRegistry.getAll().map(function(offlineDs) {
			return {modelAndView: offlineDs._modelAndView, hierarchyPath: offlineDs._hierarchyPath}
		});
	},

    _cacheAuthRequests: function() {
		return cacheAllAuthChecks();
	},

    _runDownloadCallback: function() {
		if (this.downloadCallback && this.downloadCallback instanceof Function) {
			return this.downloadCallback();
		}
		return Promise.resolve();
	},

    _setupServiceWorkerMessageListener: function() {
		if (!this.supported) {
			return;
		}
		navigator.serviceWorker.addEventListener('message', function(event) {
			switch (event.data.event) {
				case "uploadingChanged":
					this._setUploading(event.data.params === undefined ? false : event.data.params);
					break;
				
				case "hasPendingActionsChanged":
					this._setHasPendingActions(event.data.params === undefined ? false : event.data.params);
					break;
					
				case "serverStatusChanged":
					this._handleServerStatusChanged(event.data.params === undefined ? true : event.data.params);
					break;
					
				case "uploadErrorChanged":
					this._translateUploadError(event.data.params);
					break;

				default:
					break;
			}
		}.bind(this));
	},

    _deleteAppRecord: function () {
		return this._sendCommand("deleteApp");
	},

    _handleServerStatusChanged: function(online) {
		TriplatServerStatus.notifyServerStatusChanged(online);
	},

    _handleServerStatusOnlineChanged: function(e) {
		this._setOnline(e.detail.value);
	},

    _handleOnlineChange: function(newOnline, oldOnline) {
		if (!this.supported || !this.installed || this.downloading || this.uploading) {
			return;
		}
		if (oldOnline === false && newOnline === true) {
			afterNextRender(this, function() {
				this._syncData().catch(function(error) {
					console.log("triplat-offline-manager:", error);
				});
			});
		}
	},

    _setupUploading: function() {
		if (!this.supported || !this.installed) {
			return Promise.resolve();
		}
		return this._sendCommand("isUploading").then(function(uploading) {
			this._setUploading(uploading === undefined ? false : uploading);
		}.bind(this));
	},

    _setupLastDownload: function() {
		if (!this.supported || !this.installed) {
			return Promise.resolve();
		}
		return this._sendCommand("getLastDownload").then(function(lastDownload) {
			this._setLastDownload(lastDownload);
		}.bind(this));
	},

    _setupHasPendingActions: function() {
		if (!this.supported || !this.installed) {
			this._setHasPendingActions(false);
			return Promise.resolve();
		}
		return this._sendCommand("hasPendingActions").then(function(result) {
			this._setHasPendingActions(result.hasPendingActions === undefined ? false : result.hasPendingActions);
		}.bind(this));
	},

    _setupGetServerStatus: function() {
		if (!this.supported || !this.installed) {
			return Promise.resolve();
		}
		return this._sendCommand("getServerStatus").then(this._handleServerStatusChanged.bind(this));
	},

    _setupNetworkStatusListener: function() {
		window.addEventListener('offline', function() {
			this._sendCommand("notifyNetworkIsOffline");
		}.bind(this));
	},

    _checkSupported: function() {
		if (!this.supported) {
			return Promise.reject(this._getMessage("NOT_SUPPORTED"));
		}
		return Promise.resolve();
	},

    _checkOnline: function () {
		if(!this.online) {
			return Promise.reject(this._getMessage("CANNOT_EXECUTE_OFFLINE"));
		}
		return Promise.resolve();
	},

    _checkHasNoPendingActions: function () {
		if(this.hasPendingActions) {
			return this._uploadPendingActions(true);
		}
		return Promise.resolve();
	},

    _checkInstalled: function () {
		if(!this.installed) {
			return Promise.reject(this._getMessage("NOT_INSTALLED"));
		}
		return Promise.resolve();
	},

    _getMessage: function(msgKey, error) {
		return {cause: msgKey, message: this._translatedMessages[msgKey], error: error};
	},

    _getErrorMessage: function(error, defaultMsgKey) {
		if (!error || !error.cause) {
			return this._getMessage(defaultMsgKey, error);
		}
		
		if (!error.message) {
			return this._getMessage(error.cause, error);
		}
		
		return error;
	},

    _translateUploadError: function(uploadError) {
		if (uploadError != null && uploadError.error != null) {
			switch (uploadError.error.errorType) {
				case "UserMismatch":
					var __dictionary__SyncUserMismatch = "The user ({currentUser}) does not match the user ({actionUser}) who executed the offline action.";
					uploadError.error.translatedMessage = __dictionary__SyncUserMismatch
						.replace("{currentUser}", uploadError.error.currentUserFullName)
						.replace("{actionUser}", uploadError.error.actionUserFullName);
					break;
				
				case "PerformActionException":
					var __dictionary__PerformActionException = "Could not upload the requested action."
					uploadError.error.translatedMessage = __dictionary__PerformActionException;
					break;
				
				case "ImageSaveException":
					var __dictionary__ImageSaveException = "Could not upload a image file."
					uploadError.error.translatedMessage = __dictionary__ImageSaveException;
					break;
					
				case "FileSaveException":
					var __dictionary__FileSaveException = "Could not upload a binary file."
					uploadError.error.translatedMessage = __dictionary__FileSaveException;
					break;
				
				case "SecurityException":
				case "ContextSecurityViolation":
					var __dictionary__SecurityException = "Could not upload the requested action because a security violation was detected."
					uploadError.error.translatedMessage = __dictionary__SecurityException;
					break;	

				default:
					var __dictionary__Exception = "An internal error occurred. Please contact your server administrator."
					uploadError.error.translatedMessage = __dictionary__Exception;
					break;
			}
			uploadError.appContext = this._decodeAppContext(uploadError.appContext);
			this._setUploadError(uploadError);
		} else {
			this._setUploadError(null);
		}
	},

    _decodeAppContext: function(str) {
		if (!str) {
			return "";
		}
		// First decode base64 string
		// then convert to percent encodings
		// then decodeURIComponent to the original string
		return decodeURIComponent(atob(str).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	},

    _handleUploadErrorChanged: function(hasPendingActions, uploadError) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setHasUploadError(hasPendingActions && uploadError != null);
	},

    _handleDownloadingChanged: function(downloading) {
		if (!downloading) {
			this._downloadPromise = null;
		}
	}
});