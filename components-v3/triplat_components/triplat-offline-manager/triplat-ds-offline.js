/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../triplat-ds-core/triplat-ds-core.js";
import "../triplat-image/triplat-image.js";
import { TriplatFile } from "../triplat-file/triplat-file.js";
import { TriplatServerStatus } from "../triplat-offline-manager/triplat-server-status.js";
import { TriplatOfflineBehavior } from "./triplat-offline-behavior.js";
import "./triplat-offline-ds-registry.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { importJs } from "../tricore-util/tricore-util.js";

const importJsPromise = importJs(
    ["triplat-offline-download-queue.js"],
	"triplat-offline-manager/triplat-ds-offline.js"
);

importJsPromise.then(() => {
    var downloadQueue = new TriplatOfflineDownloadQueue();
/*
`triplat-ds-offline` configures how the Service Worker caches the records from data sources. The Service Worker is installed by the `triplat-offline-manager`.

Example:
```
<triplat-ds id="currentUser" name="currentUser" data="{{currentUser}}">
  <triplat-ds-offline mode="AUTOMATIC" cache-thumbnails="[[_arrayOfImageFieldNames]]">
  </triplat-ds-offline>
</triplat-ds>
```

### Configuring a data source to cache records

You can add `triplat-ds-offline` as an inner element of the `triplat-ds` element. There is one required property named `mode`.
The mode property defines how the Service Worker will cache the records that come from the data source. 
There are three mode options:
- AUTOMATIC: The data source records are automatically downloaded and saved into the cache whenever the `triplat-offline-manager` executes a download process. 
- CONTEXT: The data source records are automatically cached whenever a record from the contextual data source is saved into the cache during the download process.
- UPDATE: This mode only updates the records that are already saved into the cache whenever the application refreshes the data source.

Example:

The code below (1) caches all the building records returned by the "buildingDS" data source and also (2) caches the floors associated to each building that is saved into the cache.
```
<triplat-ds id="buildingDS" name="building">
  <triplat-ds-offline mode="AUTOMATIC"></triplat-ds-offline>
</triplat-ds>

<triplat-ds id="floorDS" name="floor">
  <triplat-ds-offline mode="CONTEXT"></triplat-ds-offline>
  <triplat-ds-context name="building" context-id="[[_buildingId]]">
  </triplat-ds-context>
</triplat-ds>
```
*/
	Polymer({
	    _template: html`
		<style include="tristyles-theme">

		</style>

		<triplat-ds-core id="dsCore" cache-response=""></triplat-ds-core>
		<triplat-offline-ds-registry id="offlineDsRegistry"></triplat-offline-ds-registry>
		<triplat-image id="triplatImage" hidden=""></triplat-image>
		<triplat-file id="triplatFile" hidden=""></triplat-file>
	`,

	    is: "triplat-ds-offline",

	    behaviors: [
			TriplatOfflineBehavior
		],

	    properties: {
			
			/**
			 * Defines how the associated data source records will be cached.
			 * There are three possible values: AUTOMATIC, CONTEXT and UPDATE.
			 */
			mode: {
				type: String,
				value: "UPDATE"
			},
			
			/**
			 * A list of image field names. Whenever a record is cached, the full-size version of the images that are referenced in this list will also be cached.
			 */
			cacheImageFields: {
				type: Array
			},
			
			/**
			 * A list of image field names. Whenever a record is cached, the thumbnail version of the images that are referenced in this list will also be cached.
			 */
			cacheThumbnails: {
				type: Array
			},
			
			/**
			 * A list of binary field names. Whenever a record is cached, the files that are referenced by the fields in this list will also be cached.
			 */
			cacheBinaryFields: {
				type: Array
			},

			_associatedDS: {
				type: Object
			},
			
			_modelAndView: {
				type: String
			},

			_hierarchyPath: {
				type: String
			},

			_dsName: {
				type: String
			}
		},

	    attached: function () {
			this._associatedDS = dom(this).parentNode;
			this.async(this._register);
		},

	    detached: function () {
			this.$.offlineDsRegistry.unregister(this);
		},

	    _register: function() {
			this._dsName = this._associatedDS.name;
			this._hierarchyPath = this._associatedDS._getHierarchyPath();
			this._modelAndView = this._associatedDS._getModelAndView();
			this.$.offlineDsRegistry.register(this);
		},

	    /**
		 * Save one or more records into the cache. The cached records are linked to the current data source.
		 * @param {Boolean} deleteOtherRecords If true, it will remove from the cache the records that are linked to the current data source and are not contained in the `records` parameter.
		 * @param {Object} records The records to be saved into the cache. It can be one record or an array of records.
		 */
		cacheRecords: function(deleteOtherRecords, records) {
			var dsPath = this._getDSPath();
			return this._sendCommand("cacheRecords", { modelAndView: this._modelAndView, dsPath: dsPath, records: records, deleteOtherRecordsOnSave: deleteOtherRecords })
				.then(function() {
					if (TriplatServerStatus.getInstance().isServerOnline()) {
						return this._processCachedRecords(null, records);
					}
				}.bind(this));
		},

	    /**
		 * Get all the cached records linked to the current data source.
		 */
		getCachedRecords: function () {
			var dsPath = this._getDSPath();
			return this._sendCommand("getRecords", { modelAndView: this._modelAndView, dsPath: dsPath });
		},

	    _cache: function(deleteOtherRecordsOnSave, idParams) {
			var recordIds = this._getRecordIds(idParams);
			return this._doCache(recordIds).then(function() {
				if (deleteOtherRecordsOnSave) {
					return this._sendCommand("deleteOtherRecords", { modelAndView: this._modelAndView, dsPath: this._getDSPath(), recordIds: recordIds });
				} 
			}.bind(this));
		},

	    _doCache: function(recordIds, parentContext) {
			var cachePromise = null;
			if (this._associatedDS._hasInstance) {
				cachePromise = this._cacheInstanceDS(recordIds, parentContext);
			} else {
				cachePromise = this._cacheNonInstanceDS(parentContext);
			}
			return cachePromise.then(this._processCachedRecords.bind(this, parentContext));
		},

	    _cacheInstanceDS: function(recordIds, parentContext) {
			return downloadQueue.add(function() {
				var cachePromises = recordIds.map(function(id) {
					var dsRequest = this.$.dsCore;
					dsRequest.context = this._getDSContext(parentContext, id);
					dsRequest.type = "GET";
					dsRequest.cacheResponse = true;
					dsRequest.query = null;
					return dsRequest.generateRequest();
				}.bind(this));
				return Promise.all(cachePromises).then(this._getRecordsFromResponse.bind(this));
			}.bind(this));
		},

	    _cacheNonInstanceDS: function(parentContext) {
			return downloadQueue.add(function() {
				var dsRequest = this.$.dsCore;
				dsRequest.context = this._getDSContext(parentContext);
				dsRequest.type = "GET";
				dsRequest.cacheResponse = true;
				dsRequest.query = this._associatedDS.query;
				return dsRequest.generateRequest().then(this._getRecordsFromResponse.bind(this));
			}.bind(this));
		},

	    _getRecordsFromResponse: function(cacheResponses) {
			if (!Array.isArray(cacheResponses)) {
				return cacheResponses.data;
			}
			return cacheResponses.map(function(response) {
				return response.data;
			});
		},

	    _processCachedRecords: function(parentContext, records) {
			return this._cacheRecordImages(records)
				.then(this._cacheRecordFiles.bind(this, records))
				.then(this._cacheChildren.bind(this, parentContext, records));
		},

	    _cacheChildren: function(parentContext, records) {
			if (records == null) {
				return Promise.resolve();
			}
			var cachePromises = [];
			var children = this.$.offlineDsRegistry.getChildren(this._modelAndView, this._hierarchyPath);
			for (var index = 0; index < records.length; index++) {
				var element = records[index];
				var context = this._getDSContext(parentContext, records[index]._id);
				children.forEach(function (childDs) {
					cachePromises.push(childDs._doCache(null, context));
				}.bind(this));
			}
			return Promise.all(cachePromises);
		},

	    _getDSContext: function (parentContext, instanceId) {
			if (parentContext != null) {
				var context = parentContext + "/" + this._dsName;
				return !instanceId ? context: context + "/" + instanceId;
			}
			return this._associatedDS._getDSContext(instanceId);
		},

	    _getDSPath: function () {
			return this._associatedDS._getDSPath();
		},

	    _getRecordIds: function(idParams) {
			var recordIds = [];
			if (idParams == null) {
				return recordIds;
			} else if (Array.isArray(idParams)) {
				for (var index = 0; index < idParams.length; index++) {
					var value = idParams[index];
					if (value == null) {
						continue;
					} else if(typeof value === 'object' && value._id != null) {
						recordIds.push(value._id);
					} else if (this._isNumber(value)) {
						recordIds.push(value);
					}
				}
			} else if (typeof idParams === 'object' && idParams._id != null) {
				recordIds.push(idParams._id);
			} else if (this._isNumber(idParams)) {
				recordIds.push(idParams._id);
			}
			return recordIds;
		},

	    _isNumber: function(value) {
			var numberValue = parseInt(value);
			return !isNaN(numberValue);
		},

	    _cacheRecordImages: function(records) {
			if (records == null) {
				return Promise.resolve();
			}
			if ((this.cacheImageFields == null || this.cacheImageFields.length == 0) && (this.cacheThumbnails == null || this.cacheThumbnails.length == 0)) {
				return Promise.resolve();
			}
			
			if (!Array.isArray(records)) {
				records = [records];
			}
			var cacheImageFields = this.cacheImageFields == null ? [] : this.cacheImageFields;
			var cacheThumbnails = this.cacheThumbnails == null ? [] : this.cacheThumbnails;
			var cacheImagePromises = [];
			for (var index = 0; index < records.length; index++) {
				var record = records[index];
				cacheImagePromises.push.apply(cacheImagePromises, cacheImageFields.map(this._cacheImage.bind(this, record, false, true)));
				cacheImagePromises.push.apply(cacheImagePromises, cacheThumbnails.map(this._cacheImage.bind(this, record, true, false)));
			}
			return Promise.all(cacheImagePromises);
		},

	    _cacheImage: function(record, cacheThumbnail, cacheFullImage, imageField) {
			if (!imageField || record == null || !record[imageField] ) {
				return Promise.resolve();
			}
			return downloadQueue.add(function() {
				return this.$.triplatImage.cacheImage(record[imageField], cacheThumbnail, cacheFullImage)
					.catch(function(error) {
						if (error && error.cause == "QUOTA_EXCEEDED_ERROR") {
							return Promise.reject(error);
						}
					});
			}.bind(this));
		},

	    _cacheRecordFiles: function(records) {
			if (this.cacheBinaryFields == null || this.cacheBinaryFields.length == 0 || records == null) {
				return Promise.resolve();
			}
			
			var cacheFilePromises;
			if (Array.isArray(records)) {
				cacheFilePromises = [];
				for (var index = 0; index < records.length; index++) {
					var record = records[index];
					cacheFilePromises.push.apply(cacheFilePromises, this.cacheBinaryFields.map(this._cacheFile.bind(this, record)));
				}
			} else {
				cacheFilePromises = this.cacheBinaryFields.map(this._cacheFile.bind(this, records));
			}
			return Promise.all(cacheFilePromises);
		},

	    _cacheFile: function(record, binaryField) {
			if (!binaryField || record == null || !record[binaryField] ) {
				return Promise.resolve();
			}
			return downloadQueue.add(function() {
				return this.$.triplatFile.cacheFile(record[binaryField])
					.catch(function(error) {
						if (error && error.cause == "QUOTA_EXCEEDED_ERROR") {
							return Promise.reject(error);
						}
					});
			}.bind(this));
		}
	});
});