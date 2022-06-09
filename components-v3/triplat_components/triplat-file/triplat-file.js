/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../@polymer/iron-input/iron-input.js";
import "../@polymer/iron-ajax/iron-request.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../@polymer/paper-input/paper-input-container.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../@polymer/paper-progress/paper-progress.js";
import "../@polymer/paper-toast/paper-toast.js";
import "../tricore-url/tricore-url.js";
import "../triplat-icon/triplat-icon.js";
import { TriplatServerStatus } from "../triplat-offline-manager/triplat-server-status.js";
import { TriplatFileSizeValidationBehavior } from "./triplat-file-size-validation-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A custom element for displaying and editing a field type of binary.

A binary field contains a reference to the file, instead of having the file itself. It is represented by a JavaScript object that contains two properties:
 - **contentID**: A reference to the file stored in the TRIRIGA Content Manager.
 - **fileName**: The name of the file.

This element should be bound to a data source field that has the data type of **Binary** in the Model Designer. When a binary field is edited, the changes will only be persisted when the record is saved using the data source.
	
	 <triplat-file value="{{record.binaryField}}">
	 </triplat-file>

### Adding a label

The label must be defined as an inner element of **triplat-file**. In order for an element to be considered as a label, it must have the **label** attribute. 

Example of a simple label:

	<triplat-file value="{{record.binaryField}}">
		<span label>Binary field</span>
	</triplat-file>

Example of a label with an icon:

	<triplat-file value="{{record.binaryField}}">
		<div label>
			<triplat-icon icon="file"></triplat-icon>
			<span>Binary field</span>
		</div>
	</triplat-file>

### Enabling triplat-file for download

This element has two options for downloading the file from a binary field. One way is to show a button next to the filename, and the other is to define the filename as a link.

Example of using a download button:

	<triplat-file value="{{record.binaryField}}" show-download-button>
		<div label>
			<triplat-icon icon="file"></triplat-icon>
			<span>Binary field</span>
		</div>
	</triplat-file>

Example of using the filename as a link:

	<triplat-file value="{{record.binaryField}}" show-download-link>
		<div label>
			<triplat-icon icon="file"></triplat-icon>
			<span>Binary field</span>
		</div>
	</triplat-file>

### Editing a binary field

There are three actions for editing a binary field:
 - One **upload button** that enables the user to search and select a file for uploading.
 - One **drop area** that enables the user to drag and drop a file for uploading.
 - One **clear button** that enables the user to clear the binary field.

Example of enabling the ability to edit a binary field using an upload button:

	<triplat-file value="{{record.binaryField}}" show-download-button 
		show-clear-button show-upload-button>
		<div label>
			<triplat-icon icon="file"></triplat-icon>
			<span>Binary field</span>
		</div>
	</triplat-file>

Example of enabling the ability to edit a binary field using a drop area:

	<triplat-file value="{{record.binaryField}}" show-download-button 
		show-clear-button show-drop-area>
		<div label>
			<triplat-icon icon="file"></triplat-icon>
			<span>Binary field</span>
		</div>
	</triplat-file>

### Showing notifications

The **triplat-file** can be configured to notify the user of the uploading progress and to display the error when the upload fails. The notifications are displayed on top of the triplat-file.

Example:

	<triplat-file value="{{record.binaryField}}" show-download-button 
		show-clear-button show-drop-area show-upload-progress-bar show-upload-error>
		<div label>
			<triplat-icon icon="file"></triplat-icon>
			<span>Binary field</span>
		</div>
	</triplat-file>

### Styling

Custom property                                 | Description                                              | Default
------------------------------------------------|----------------------------------------------------------|--------------------------------------
`--triplat-file-drop-area`                      | Mixin applied to the drop area                           | {}
`--triplat-file-hover-drop-area`                | Mixin applied to the drop area while dragging a file over it | {}
`--triplat-file-drop-area-text`                 | Mixin applied to the drop area text                      | {}
`--triplat-file-input`                          | Mixin applied to the input element                       | {}
`--triplat-file-input-container`                | Mixin applied to the input container                     | {}
`--triplat-file-download-link-color`            | The color of the download link                           | --tri-link-color
`--triplat-file-download-link`                  | Mixin applied to the download link                       | {}
`--triplat-file-button`                         | Mixin applied to the icon buttons                        | {}
`--triplat-file-notification-icon`              | Mixin applied to the icon of a notification              | {}
`--triplat-file-error-notification`             | Mixin applied to the error notification                  | {}
`--triplat-file-error-notification-background-color` | The background color of the error notification      | #fad2d6
`--triplat-file-error-notification-color`       | The color of the error notification                      | ---tri-primary-color
`--triplat-file-error-notification-icon-container` | Mixin applied to the icon container of the error notification | {}
`--triplat-file-error-notification-message-container` | Mixin applied to the message container of the error notification | {}
`--triplat-file-error-notification-title`       | Mixin applied to the title of the error notification     | {}
`--triplat-file-progress-notification`          | Mixin applied to the upload progress notification        | {}
`--triplat-file-progress-notification-icon-container` | Mixin applied to the icon container of the upload progress notification | {}
`--triplat-file-progress-container`             | Mixin applied to the upload progress container           | {}
`--triplat-file-progress-bar-container`         | Mixin applied to the upload progress bar container       | {}
`--triplat-file-progress-notification-background-color` | The background color of the upload progress notification  | #deeefe
`--triplat-file-progress-notification-color`    | The color of the upload progress notification            | --tri-primary-content-color
`--triplat-file-progress-bar-active-color`      | The color of the upload progress bar                     | --tri-primary-color

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment iron-positioning tristyles-theme">

				:host {
					font-family: var(--tri-font-family);
					@apply --layout-horizontal;
					@apply --layout-end;
				}

				.dropArea {
					@apply --layout-flex;
					@apply --layout-vertical;
					@apply --layout-center-center;
					@apply --layout-self-stretch;
					color: var(--tri-primary-content-color);
					border-color: var(--tri-primary-content-color);
					border-width: 1px;
					border-style: dashed;	
					padding: 2px;
					margin: 5px;
					cursor: pointer;
					@apply --triplat-file-drop-area;
				}

				.dropAreaHover {
					border-color: var(--tri-primary-color);
					color: var(--tri-primary-color);
					@apply --triplat-file-hover-drop-area;
				}

				.dropText {
					pointer-events: none;
					margin: 0px;
					@apply --triplat-file-drop-area-text;
				}

				#fileInput {
					--paper-input-container-input : {
						font-family: var(--tri-font-family);
					};
					@apply --layout-flex;
					@apply --triplat-file-input-container;
				}

				#input {
					@apply --triplat-file-input;
				}

				.fileDownload {
					--paper-input-container-input-color: var(--triplat-file-download-link-color, var(--tri-link-color));
					--paper-input-container-input : {
						cursor: pointer;
						font-family: var(--tri-font-family);
						@apply --triplat-file-download-link;
					};
				}

				.innerIconButton {
					padding: 0px;
					width: 24px;
					height: 24px;
					margin-left: 4px;
					margin-bottom: 4px;
					@apply --triplat-file-button;
				}

				#progressToast {
					padding: 0px;
					height: 60px;
					--paper-toast-background-color: var(--triplat-file-progress-notification-background-color, #deeefe);
					--paper-toast-color: var(--triplat-file-progress-notification-color, var(--tri-primary-content-color));
					font-family: var(--tri-font-family);
					font-size:16px;
					@apply --layout-horizontal;
					@apply --triplat-file-progress-notification;
				}

				.progressIconContainer {
					background-color: var(--tri-info-color);
					padding: 6px;
					@apply --layout-vertical;
					@apply --layout-center;
					@apply --triplat-file-progress-notification-icon-container;
				}

				.notificationIcon {
					padding: 0px;
					width: 22px;
					height: 22px;
					margin-left: 0px;
					color: white;
					@apply --triplat-file-notification-icon;
				}

				.progressContainer {
					padding: 6px;
					position: relative;
					@apply --layout-horizontal;
					@apply --layout-center;
					width: calc(100% - 46px);
					@apply --triplat-file-progress-container;
				}

				.progressBarContainer {
					position: relative;
					@apply --layout-vertical;
					width: calc(100% - 28px);
					@apply --triplat-file-progress-bar-container;
				}

				.progressFileName {
					padding-bottom: 2px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					@apply --triplat-file-progress-notification-text;
				}

				paper-progress {
					--paper-progress-transition-timing-function: linear;
					--paper-progress-active-color: var(--triplat-file-progress-bar-active-color, var(--tri-primary-color));
					--paper-progress-container-color: var(--triplat-file-progress-notification-color, var(--tri-primary-content-accent-color));
					width: 100%;
				}

				#errorToast {
					padding: 0px;
					height: 60px;
					--paper-toast-background-color: var(--triplat-file-error-notification-background-color, #fad2d6);
					--paper-toast-color: var(--triplat-file-error-notification-color, var(--tri-primary-content-color));
					font-family: var(--tri-font-family);
					font-size:16px;
					@apply --layout-horizontal;
					@apply --triplat-file-error-notification;
				}

				.errorIconContainer {
					background-color: var(--tri-error-color);
					padding: 6px;
					@apply --layout-vertical;
					@apply --layout-center;
					@apply --triplat-file-error-notification-icon-container;
				}

				.errorMessageContainer {
					padding: 6px;
					@apply --layout-flex;
					@apply --layout-vertical;
					@apply --triplat-file-error-notification-message-container;
				}

				.errorTitle {
					font-weight: bold;
					@apply --triplat-file-error-notification-title;
				}

				.errorMessage {
					@apply --layout-flex;
				}
				
			input {
				@apply --paper-input-container-shared-input-style;
			}
			
		</style>

		<tricore-url id="tricoreUrl" raw-url="/p/fileupload/uploadfile" bind-url="{{_uploadFileUrl}}"></tricore-url>

		<tricore-url raw-url="/p/fileupload/validFileExtensions" bind-url="{{_validFileExtensionsUrl}}"></tricore-url>
		<iron-ajax id="validFileExtensionsAjax" url="[[_validFileExtensionsUrl]]" on-response="_handleValidFileExtensionsResponse" auto="">
		</iron-ajax>
		
		<paper-input-container id="fileInput" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" no-label-float="[[noLabelFloat]]">
			
			<label hidden\$="[[!_hasLabel]]" aria-hidden="true" for="input" id="fileLabel" slot="label">
				<slot id="labelContent" name="label"></slot>
			</label>

			<iron-input id="input" bind-value="[[value.fileName]]" slot="input">

				<input type="text" placeholder\$="[[placeholder]]" on-keypress="_keyPressHandler" aria-label\$="[[ariaLabel]]" readonly="">

			</iron-input>

			<paper-icon-button suffix="" class="innerIconButton primary" icon="[[uploadIcon]]" title="upload" on-tap="_uploadTap" hidden\$="[[!_isUploadEnabled(showUploadButton, value.contentID, uploading)]]" slot="suffix">
			</paper-icon-button>

			<paper-icon-button suffix="" class="innerIconButton primary" icon="[[downloadIcon]]" title="download" on-tap="_downloadFileTap" hidden\$="[[!_isDownloadEnabled(showDownloadButton, value.contentID, uploading)]]" slot="suffix">
			</paper-icon-button>

			<paper-icon-button suffix="" class="innerIconButton primary" icon="[[clearIcon]]" title="clear" on-tap="_clearFieldTap" hidden\$="[[!_isClearEnabled(showClearButton, value.contentID, uploading)]]" slot="suffix">
			</paper-icon-button>
		</paper-input-container>

		<div id="dropArea" class="dropArea" on-tap="openFileSelection" hidden\$="[[!_isDropAreaVisible(showDropArea, value.contentID, uploading)]]">
			<p class="dropText">[[dropText]]</p>
		</div>

		<paper-toast id="progressToast" duration="0" class="fit-bottom">
			<div class="progressIconContainer">
				<triplat-icon class="notificationIcon" icon="status-info"></triplat-icon>
			</div>
			<div class="progressContainer">
				<div class="progressBarContainer" hidden\$="[[!uploading]]">
					<div class="progressFileName" title="[[_uploadFileName]]">[[_uploadFileName]]</div>
					<paper-progress class="transiting" value="[[uploadProgress]]">
					</paper-progress>
				</div>
				<paper-icon-button hidden\$="[[!uploading]]" class="innerIconButton primary" icon="[[abortUploadIcon]]" title="abort upload" on-tap="_abortUploadTap">
				</paper-icon-button>
			</div>
		</paper-toast>
			
		<paper-toast id="errorToast" class="fit-bottom" duration="[[errorNotificationDuration]]">
			<div class="errorIconContainer">
				<triplat-icon class="notificationIcon" icon="status-error"></triplat-icon>
			</div>
			<div class="errorMessageContainer">
				<span class="errorTitle">Error</span>
				<span class="errorMessage">[[error.errorMessage]]</span>
			</div>
		</paper-toast>

		<input type="file" id="fileInputControl" on-change="_fileSelected" accept\$="[[_computeValidExtensions(includedExtensions)]]" hidden="">
		<a id="downloadFileLink" target="_blank" hidden=""></a>
	`,

    is: "triplat-file",

    behaviors: [
		TriplatFileSizeValidationBehavior
	],

    /**
	 * Fired when the upload of a file succeeds.
	 *
	 * @event upload-succeeded
	 */

	/**
	 * Fired when the upload of a file fails.
	 *
	 * @event upload-error
	 */

	properties : {

		/**
		 * An object representing the binary field.
		 */
		value: {
			type: Object,
			notify: true,
			observer: "_handleValueChange"
		},

		/**
		 * Set to true to always float the floating label.
		 */
		alwaysFloatLabel: {
			type: Boolean,
			value: false
		},

		/**
		 * Set to true to disable the floating label. The label disappears when the input value is
		 * not null.
		 */
		noLabelFloat: {
			type: Boolean,
			value: false
		},

		/**
		 * The text to display in the drop area.
		 */
		dropText: {
			type: String,
			value: ""
		},

		/**
		 * The ARIA label for this file input.
		 */
		ariaLabel: {
			type: String
		},

		/**
		 * A placeholder string in addition to the label. If this is set, the label will always float.
		 */
		placeholder: {
			type: String,
			value: ""
		},

		/**
		 * If true, this element shows a button to download the file.
		 */
		showDownloadButton: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, this element shows a visual area where the user can drop a file.
		 */
		showDropArea: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, this element shows a link to download the file.
		 */
		showDownloadLink: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, this element shows a button to upload a new file.
		 */
		showUploadButton: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, this element shows a button to clear this field.
		 */
		showClearButton: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, this element displays a progress bar while it is uploading a file.
		 * It gives users a quick sense of how much longer the upload operation will take.
		 */
		showUploadProgressBar: {
			type: Boolean,
			value: false
		},

		/**
		 * It indicates if uploading is in progress.
		 */
		uploading: {
			type: Boolean,
			value: false,
			notify: true,
			readOnly: true
		},

		/**
		 * It is a number that represents the current progress of uploading a file. It has a value between 0 and 100.
		 */
		uploadProgress: {
			type: Number,
			value: 0,
			notify: true,
			readOnly: true
		},

		/**
		 * If true, this element will show an error notification when the upload of a file fails.
		 */
		showUploadError: {
			type: Boolean,
			value: false
		},

		/**
		 * Becomes true when the upload of a file fails.
		 */
		errored: {
			type: Boolean,
			value: false,
			readOnly: true,
			notify: true
		},

		/**
		 * An object that contains the error key and message.
		 * Use the error key to create custom error messages. The available error keys are:
		 * - UploadFileInvalidExtension - Selected file has an extension that is not allowed (as defined in the TRIRIGAWEB.properties file).
		 * - UploadFileAntiVirusScanFailed - Selected file failed to pass the antivirus scan.
		 * - UploadAborted - If the user aborted the current upload.
		 * - UploadFileSizeFailed - Selecte file size exceeds the maximum allowed (as defined in the TRIRIGAWEB.properties file).
		 * - UploadFileError - The upload of the file failed for any other reason.
		 */
		error: {
			type: Object,
			readOnly: true,
			notify: true
		},

		/**
		 * The duration in milliseconds to show the error notification.
		 */
		errorNotificationDuration: {
			type: Number,
			value: 3000
		},

		/**
		 * The name of the icon to use for the upload button. 
		 */
		uploadIcon: {
			type: String,
			value: "ibm:upload-export"
		},

		/**
		 * The name of the icon to use for the download button.
		 */
		downloadIcon: {
			type: String,
			value: "ibm:download-import"
		},

		/**
		 * The name of the icon to use for the clear button.
		 */
		clearIcon: {
			type: String,
			value: "ibm:close-cancel-error"
		},

		/**
		 * The name of the icon to use for the abort button.
		 */
		abortUploadIcon: {
			type: String,
			value: "ibm:close-cancel-error"
		},
		
		/**
		 * If true, the file will be uploaded only when the record that contains the binded binary field is saved or updated.
		 * When running in offline mode, this property is ignored and the file upload is always postponed.
		 */
		postponeUpload: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, it indicates that this element has a label.
		 */
		_hasLabel: {
			type: Boolean,
			readOnly: true,
			value: false
		}
	},

    observers: [
		"_handleContentIDChange(value.contentID,showDownloadLink)"
	],

    ready: function() {
		if (!this.value) {
			this.clearField();
		}
				this._setupDropArea();
				this.$.errorToast.fitInto = this;
				this.$.progressToast.fitInto = this;
				dom(this.$.labelContent).observeNodes(
						function(info) {
								var labelDistributedNodes = dom(this.$.labelContent).getDistributedNodes();
								this._set_hasLabel(labelDistributedNodes && labelDistributedNodes.length > 0);
							}.bind(this)
					);
			},

    /**
	 * Downloads the file from the binary field bound to this element.
	 */
	downloadFile: function() {
		if (!this.value || !this.value.contentID) {
			return;
		}
		var downloadContentUrl = this._computeDownloadContentUrl(this.value);
						
		if (this.value.isUnsavedFile) {
			this.$.downloadFileLink.href = downloadContentUrl;
		this.$.downloadFileLink.click();
		} else if (!TriplatServerStatus.getInstance().isServerOnline()) {
			var getFileRequest = document.createElement('iron-request');
			var getFilRequestOptions = {
				url: downloadContentUrl,
				method: "GET",
				handleAs: "blob"
			};
			getFileRequest.send(getFilRequestOptions);
			getFileRequest.completes.then(function() {
				this.$.downloadFileLink.href = URL.createObjectURL(getFileRequest.response);
				this.$.downloadFileLink.download = this.value.fileName;
				this.$.downloadFileLink.click();
			}.bind(this));
		} else {
			window.open(downloadContentUrl);
		}
	},

    /**
	 * Shows a file selection dialog box to the user, so that the user can search and select a file to upload.
	 */
	openFileSelection: function() {
		var elem = this.$.fileInputControl;
		if (elem && document.createEvent) {
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, false);
				elem.dispatchEvent(evt);
			}
	},

    /**
	 * Clears the value of the binary field bound to this element.
	 */
	clearField : function() {
		this.value = {contentID:null, fileName: null};
				this.$.fileInputControl.value="";
		},

    /**
		* Uploads a new file to the binary field.
		* @param {Object} file A JavaScript file object representing the file to be uploaded.
		*/
	uploadFile: function(file) {
		if (!file) {
			return;
		}
	
		try { 
			this._checkFileExtension(file.name);
		} catch(err) {
			this._showError("UploadFileInvalidExtension", err);
			return;
		}

		this.checkFileSize(file)
			.then(this._doUploadFile.bind(this, file))
			.catch(this._showError.bind(this, "UploadFileSizeFailed"));
	},

    _doUploadFile: function(file) {
		this._setUploading(true);
		this._setUploadProgress(0);
		this._setError(null);
		this._setErrored(false);
		this._uploadFileName = file.name;
		
		if (this.postponeUpload || !TriplatServerStatus.getInstance().isServerOnline()) {
			this._readFileAsDataURL(file)
					.then(
						function(dataUrl) {
							this.value = {
								isUnsavedFile: true,
								contentID: -1,
								fileName: file.name,
								file: dataUrl
							};
								this._setUploading(false);
						}.bind(this)
					)
					.catch(this._showError.bind(this, "UploadFileError"));
		} else {
			if (this.showUploadProgressBar) {
				this.$.progressToast.open();
			}	
			var request = document.createElement('iron-request');
			var requestOptions = this._createUploadRequestOptions(file);

			this._currentRequest = request;
			request.completes.then(
				this._handleUploadResponse.bind(this)
			).catch(
				this._handleUploadError.bind(this, request)
			);

			request.xhr.upload.onprogress = this._handleUploadProgress.bind(this);
			request.send(requestOptions);
		}
		
	},

    /**
	 * Aborts the current upload.
	 */
	abortUpload: function() {
		if (this._currentRequest != null) {
			this._currentRequest.abort();
			this._discardRequest();
		}
	},

    _checkFileExtension: function(fileName) {
		var lastIndex = fileName.lastIndexOf('.');
		if (lastIndex == -1) {
			throw new "Invalid file extension";
		}

		var fileNameExtension = fileName.substring(lastIndex).toLowerCase();	
		if(this.includedExtensions != null && this.includedExtensions.length > 0) {
			if (this.includedExtensions.indexOf(fileNameExtension) == -1) {
				throw new "Invalid file extension '" + fileNameExtension + "'";
			}
		} else if (this.excludedExtensions != null && this.excludedExtensions.indexOf(fileNameExtension) >= 0) {
			throw new "Invalid file extension '" + fileNameExtension + "'";
		}
	},

    _clearFieldTap: function(e) {
		this.clearField();
		e.stopPropagation();
	},

    _downloadFileTap: function(e) {
		this.downloadFile();
		e.stopPropagation();
	},

    _uploadTap: function(e) {
		this.openFileSelection();
		e.stopPropagation();
	},

    _setupDropArea : function () {
		var dropArea  = this.$.dropArea;
		dropArea.ondragenter = function(e) {
			e.preventDefault();
			this.toggleClass("dropAreaHover", true, this.$.dropArea);
			this.updateStyles({});
		}.bind(this);

		dropArea.ondragover = function(e) {
			e.preventDefault();
		}.bind(this);

		dropArea.ondragleave = function(e) {
			this.toggleClass("dropAreaHover", false, this.$.dropArea);
			this.updateStyles({});
		}.bind(this);

		dropArea.ondrop = function(e) {
			e.preventDefault();
			this.toggleClass("dropAreaHover", false, this.$.dropArea);
			this.updateStyles({});
			if (e.dataTransfer.files.length > 0) {
				var file = e.dataTransfer.files[0];
				this.uploadFile(file);
			}
		}.bind(this);
	},

    _handleValidFileExtensionsResponse: function(e) {
		this.excludedExtensions = e.detail.response.excludedExtensions;
		this.includedExtensions = e.detail.response.includedExtensions;
	},

    _computeValidExtensions: function(extensions) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var validExtensions = "";

		if (extensions != null && extensions.length > 0) {
			validExtensions = extensions.toString();
		}

		return validExtensions;
	},

    _keyPressHandler: function(event) {
		var code = event.keyCode;
		// accept enter or spacebar
		if (code == 13 || code == 32) {
			if (this.value != null && this.value.contentID != null) {
				this.downloadFile();
			} else {
				this.openFileSelection();
			}
		}
	},

    _fileSelected: function(e) {
		var length = e.target.files.length;
		if(length>0) {
			var file = e.target.files[0];
			this.uploadFile(file);
		}
	},

    _createUploadRequestOptions: function(file) {
		var formData = new FormData();
		formData.append("file", file, file.name);
		return {
			url: this._uploadFileUrl || '',
			method: "POST",
			body: formData,
			async: true,
			handleAs: "json",
			jsonPrefix: "",
			withCredentials: false,
			timeout: 0
		};
	},

    _handleUploadResponse: function(request) {
		if(request.response.isContentUploaded) {
			this.value = {contentID:request.response.contentId, fileName: request.response.fileName};
			this.fire("upload-succeeded", request.response);
		} else {
			this._showError(request.response.errorKey, request.response.errorMessage);
		}
		this._discardRequest();
	},

    _handleUploadError: function(request, error) {
		this._discardRequest();
		if (!request.aborted) {
			this._showError("UploadFileError", "Upload Failed");
		} else {
			this._showError("UploadAborted", "Upload Aborted");
		}
	},

    _handleUploadProgress: function(progress) {
		if (progress.lengthComputable && progress.total != null && progress.total > 0) {
			this._setUploadProgress(Math.floor((progress.loaded/progress.total)*100));
		}
	},

    _abortUploadTap: function(e) {
		this.abortUpload();
	},

    _showError: function(key, detail) {
		if (key == null) {
			return;
		}
		this.$.fileInputControl.value="";
		this._setUploading(false);
		var error = {key: key, detail: detail, errorMessage: this._getFormattedErrorMessage(key, detail)};
		this._setError(error);
		this._setErrored(true);
		this.fire("upload-error", error);
		if (this.showUploadError && key != "UploadAborted" && !this._hidden) {
			this.$.errorToast.open();
		}
	},

    _getFormattedErrorMessage : function(key, detail) {
		var translatedErrorMessage = TriplatFile.errorMesssages[key];
		if (key == "UploadFileSizeFailed") {
			translatedErrorMessage = translatedErrorMessage.replace("{size}", detail / (1024*1024));
		}
	
		return translatedErrorMessage;
	},

    _discardRequest: function() {
		this._currentRequest = null;
		this._setUploading(false);
		this.$.progressToast.close();
		this._setUploadProgress(0);
		this._uploadFileName = "";
		this.$.fileInputControl.value="";
	},

    _isDownloadEnabled: function(showDownloadButton, contentID, uploading) {
		return showDownloadButton && contentID != null && !uploading &&  
			(this.value.isUnsavedFile || (this.value.moduleID && this.value.boID));
	},

    _isUploadEnabled: function(showUploadButton, contentID, uploading) {
		return showUploadButton  && contentID == null && !uploading;
	},

    _isClearEnabled: function(showClearButton, contentID, uploading) {
		return showClearButton && contentID != null && !uploading;
	},

    _isDropAreaVisible: function (showDropArea, contentID, uploading) {
		return showDropArea && contentID == null && !uploading;
	},

    _handleContentIDChange: function(contentID, showDownloadLink) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var fileInput = this.$.fileInput;

		if (showDownloadLink && contentID != null && (this.value.isUnsavedFile || (this.value.moduleID && this.value.boID))) {
			this.toggleClass("fileDownload", true, fileInput);
			this.listen(fileInput,'tap', "downloadFile");
		} else {
			this.toggleClass("fileDownload", false, fileInput);
			this.unlisten(fileInput,'tap', "downloadFile");
		}

		fileInput.updateStyles({});
	},

    _computeAlwaysFloatLabel: function(alwaysFloatLabel, placeholder) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return alwaysFloatLabel || (placeholder != null && placeholder.length > 0);
	},

    get _hidden() {
		return this.hasAttribute("hidden");
	},

    _handleValueChange: function(value) {
		if (!value) {
			this.clearField();
		}
	},

    /**
	 * Cache the binary field content to the local browser storage.
	 * @param {Object} value An object representing the binary field to be cached. It defaults to the `value` property.
	 */
	cacheFile: function(value) {
		var fileToCache = value || this.value;
		return this._doCacheFile(this._computeDownloadContentUrl(fileToCache, true));
	},

    _doCacheFile: function(fileDownloadUrl) {
		if (!fileDownloadUrl) {
			return Promise.resolve();
		}
		var request = document.createElement('iron-request');
		var requestOptions = {
			url: fileDownloadUrl,
			method: "GET"
		};
		request.send(requestOptions);
		return request.completes.then(function() {
			var cacheError = request.xhr.getResponseHeader("trisw-cache-error");
			if (cacheError && cacheError != "") {
				return Promise.reject({cause: cacheError})
			}
			return request.response;
		});
	},

    _computeDownloadContentUrl: function(value, cache) {
		if (!value || !value.contentID) {
			return "";
		} else {
			if (value.isUnsavedFile) {
				var blob = this._dataURLtoBlob(value.file);
				return URL.createObjectURL(blob);
			} else {
				var url = "/GetDocServlet.srv?moduleId=" + value.moduleID + "&boId=" + value.boID + "&contentId=" + value.contentID;
				url = cache ? url + "&offlineCache=true" : url;
				return this.$.tricoreUrl.getUrl(url);
			}
		}
	},

    _readFileAsDataURL: function(file) {
		return new Promise(
			function(resolve, reject) {
				var reader  = new FileReader();
				reader.addEventListener(
					"loadend", 
					function () {
						resolve(reader.result);
					}
				);
				reader.addEventListener("error",reject);
				reader.readAsDataURL(file);
			}
		);
	},

    _dataURLtoBlob: function(dataUrl) {
		var dataSplit = dataUrl.split(',');
					
		var mimeString = dataSplit[0].split(':')[1].split(';')[0]
		
		var byteCharacters = atob(dataSplit[1]);
		var ab = new ArrayBuffer(byteCharacters.length);
		var ia = new Uint8Array(ab);
		
		for (var i = 0; i < byteCharacters.length; i++) {
				ia[i] = byteCharacters.charCodeAt(i);
		}
		
		return new Blob([ab], {type: mimeString});
	}
});

export const TriplatFile = {};
TriplatFile.__dictionary__UploadFileInvalidExtension = "Invalid file extension.";
TriplatFile.__dictionary__UploadFileAntiVirusScanFailed = "Antivirus scan failed.";
TriplatFile.__dictionary__UploadFileError = "Upload failed.";
TriplatFile.__dictionary__UploadAborted = "Upload aborted.";
TriplatFile.__dictionary__UploadFileSizeFailed = "The file size exceeds the maximum of {size} MB.";

TriplatFile.errorMesssages = {
	UploadFileInvalidExtension: TriplatFile.__dictionary__UploadFileInvalidExtension,
	UploadFileAntiVirusScanFailed: TriplatFile.__dictionary__UploadFileAntiVirusScanFailed,
	UploadFileError: TriplatFile.__dictionary__UploadFileError,
	UploadAborted: TriplatFile.__dictionary__UploadAborted,
	UploadFileSizeFailed: TriplatFile.__dictionary__UploadFileSizeFailed
};