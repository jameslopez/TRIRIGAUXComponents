/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../tricore-url/tricore-url.js";
import { TriPlatDs } from "../triplat-ds/triplat-ds.js";
import { TriplatQuery } from "../triplat-query/triplat-query.js";
import "./triplat-multipart-util.js";

Polymer({

	is: "triplat-ds-impl",

	properties: {

		context: {
			type: String,
			notify: false,
			readOnly: false
		},

		parentContext: {
			type: String,
			notify: false,
			readOnly: false
		},

		query: {
			type: Object,
			notify: false,
			readOnly: false
		},

		appendPage: {
			type: Boolean,
			notify: false,
			readOnly: false
		},

		reserveIncludeUnavailable: {
			type: Boolean,
			value: false
		},

		queryFrom: {
			type: Number,
			notify: false,
			readOnly: true,
			value: 0
		},

		querySize: {
			type: Number,
			notify: false,
			readOnly: true,
			value: 0
		},

		queryTotalSize: {
			type: Number,
			notify: false,
			readOnly: true
		},

		webContextIdElement: {
			type: Object,
			notify: false,
			readOnly: false
		},

		_registry: {
			type: Array,
			notify: false,
			readOnly: true,
			value: function() {
				return [];
			}
		},

		_data: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_transitionInfo: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_queryMetadata: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_urlElement: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_activeRequestCount: {
			type: Number,
			notify: false,
			readOnly: true,
			value: 0
		},

		_getAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_getQueryMetadataAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_queryAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_createAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_deleteAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_updateAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_addAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_removeAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		countOnly: {
			type: Boolean,
			value: false
		}

	},

	get isUnregistered() {
		return this._registry.length == 0;
	},

	get _contextUrl() {
		return this._getUrl("/p/webapi/rest/v2" + this.context);
	},

	register: function(element, manual, offlineMode) {
		var doFirstRequest = this.isUnregistered && !manual;
		this.push("_registry", element);

		if (doFirstRequest) {
			this.doGet(offlineMode);
		} else {
			if (this._data) {
				element._setDsData(this._data);
			}
			if (this._activeRequestCount == 0) {
				element._setLoading(false);
			} else {
				element._setLoading(true);
			}
		}

		if (element.reserveIncludeUnavailable) {
			this.reserveIncludeUnavailable = true;
		}
	},

	unregister: function(element) {
		var registryIndex = null;
		for (var i = 0; i < this._registry.length; i++) {
			if (this._registry[i] === element) {
				registryIndex = i;
				break;
			}
		}
		if (registryIndex != null) {
			this.splice("_registry", registryIndex, 1);
		}
		if (this.isUnregistered) {
			this._set_data(null);
			this.set("webContextIdElement", null);
			// TODO do cleanup here
		}
	},

	refresh: function(promiseResolve, promiseReject, offlineMode) {
		if (this.query || this._serverFiltering) {
			var query = this._getRefreshQuery();
			this.doQueryGet(offlineMode, query, true, promiseResolve, promiseReject);
		} else {
			this.doNonQueryGet(offlineMode, promiseResolve, promiseReject);
		}
	},

	getQueryMetadata: function(promiseResolve, promiseReject, offlineMode) {
		this.doGetQueryMetadata(offlineMode, promiseResolve, promiseReject);
	},

	doGet: function(offlineMode) {
		if (this.query || this._serverFiltering) {
			this.doQueryGet(offlineMode);
		} else {
			this.doNonQueryGet(offlineMode);
		}
	},

	updateCountOnly: function(source, countOnly) {
		this.set("countOnly", countOnly);
	},

	updateQuery: function(query, manual, offlineMode) {
		if (!this.query.areFiltersEqual(query) || !this.query.areSortsEqual(query)) {
			this._setQueryFrom(0);
			this._setQuerySize(0);
			this._setQueryTotalSize(null);
			this._set_data(null);
			this.set("query", query);
			if (!manual) {
				this.doQueryGet(offlineMode);
			}				
			return;
		}

		if (!this.query.isPageEqual(query)) {
			this.set("query", query);
			if (!manual) {
				this.doQueryGet(offlineMode);
			}
			return;
		}

		if (!this.query.isCalendarEqual(query) || !this.query.isWorkPlannerEqual(query) || !this.query.isReserveContextEqual(query)) {
			this.set("query", query);
			if (!manual) {
				this.doQueryGet(offlineMode, query,true);
			}
			return;
		}
	},

	doNonQueryGet: function(offlineMode, promiseResolve, promiseReject) {
		this._incrementActiveRequestCount();

		var getAjax = this._getAjax;
		if (!getAjax) {
			getAjax = document.createElement("iron-ajax");
			getAjax.url = this._contextUrl;
			
			var params = (getAjax.params != undefined)? getAjax.params:{};
			params.countOnly = this.countOnly;
			getAjax.params = params;

			this._addMultiContextIdsParam(getAjax);

			getAjax.addEventListener("response", this._onNonQueryGetRespone.bind(this));
			getAjax.addEventListener("error", this._onError.bind(this, "_onGetError"));
			this._set_getAjax(getAjax);
		}

		this._ajaxWithWebContextId(getAjax, offlineMode, null, function() {
			var params = (getAjax.params != undefined)? getAjax.params:{};
			params.countOnly = this.countOnly;
			getAjax.params = params;

			this._reserveIncludeUnavailable(getAjax, null);
			var request = getAjax.generateRequest();
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;
		});
	},

	doGetQueryMetadata: function(offlineMode, promiseResolve, promiseReject) {
		this._incrementActiveRequestCount();

		var getQueryMetadataAjax = this._getQueryMetadataAjax;
		if (!getQueryMetadataAjax) {
			getQueryMetadataAjax = document.createElement("iron-ajax");
			getQueryMetadataAjax.url = this._contextUrl;

			var params = getQueryMetadataAjax.params || {};
			params.method = "dsMetadata";
			getQueryMetadataAjax.params = params;

			this._addMultiContextIdsParam(getQueryMetadataAjax);

			getQueryMetadataAjax.addEventListener("response", this._onGetQueryMetadataResponse.bind(this));
			getQueryMetadataAjax.addEventListener("error", this._onError.bind(this, "_onGetError"));
			this._set_getQueryMetadataAjax(getQueryMetadataAjax);
		}

		this._ajaxWithWebContextId(getQueryMetadataAjax, offlineMode, null, function() {
			var params = getQueryMetadataAjax.params || {};
			params.method = "dsMetadata";
			getQueryMetadataAjax.params = params;

			var request = getQueryMetadataAjax.generateRequest();
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;
		});
	},

	_addMultiContextIdsParam: function(ajax) {
		if(this._registry!=undefined && this._registry.length>0){
			var currentDs = this._registry[0];
			var numOfDsContexts = currentDs._contexts.length;
			
			if(numOfDsContexts>0) {
				var parentDsContext = currentDs._contexts[numOfDsContexts-1];
				
				if(parentDsContext.contextIds != undefined && parentDsContext.contextIds.length>1) {
					var params = (ajax.params != undefined)? ajax.params:{};
					params.multiContextIds = parentDsContext.contextIds.join();
					ajax.params = params;
				}
			}
		}
	},

	_onNonQueryGetRespone: function(e) {
		this._updateDataFromResponse(e.detail.response);
		this._notifyComplete("_onGetComplete", e.detail.response);
		var promiseResolve = e.detail._promiseResolve;
		if (promiseResolve) {
			promiseResolve(e.detail.response);
		}

		this._decrementActiveRequestCount();
	},

	_onGetQueryMetadataResponse: function(e) {
		this._updateQueryMetadataFromResponse(e.detail.response);
		this._notifyComplete("_onGetQueryMetadataComplete", e.detail.response);
		var promiseResolve = e.detail._promiseResolve;
		if (promiseResolve) {
			promiseResolve(e.detail.response);
		}

		this._decrementActiveRequestCount();
	},

	doQueryGet: function(offlineMode, query, force, promiseResolve, promiseReject) {

		var query = query || this.query;

		if (!this._data) {
			this._set_data([]);
		}

		if (!force && this.queryTotalSize != null && this.queryTotalSize != undefined) {
			if (query.page.from >= this.queryTotalSize) {
				// nothing more to get
				return;
			}
		}

		var queryLastIndex = query.page.from + query.page.size - 1;
		var dataLastIndex = this.queryFrom + this.querySize - 1;
		if (!force && query.page.from >= this.queryFrom && queryLastIndex <= dataLastIndex) {
			// we already have all the data
			return;
		}

		this._incrementActiveRequestCount();

		var queryAjax = this._queryAjax;
		if (!queryAjax) {
			queryAjax = document.createElement("iron-ajax");
			queryAjax.url = this._contextUrl;

			var params = (queryAjax.params != undefined)? queryAjax.params:{};
			params.countOnly = this.countOnly;
			queryAjax.params = params;
			
			this._addMultiContextIdsParam(queryAjax);

			queryAjax.addEventListener("response", this._onQueryGetRespone.bind(this));
			queryAjax.addEventListener("error", this._onError.bind(this, "_onGetError"));
			queryAjax.method = "POST";
			queryAjax.contentType = "application/json";
			this._set_queryAjax(queryAjax);
		}

		this._ajaxWithWebContextId(queryAjax, offlineMode, null, function() {
			var params = (queryAjax.params != undefined)? queryAjax.params:{};
			params.query = true;
			params.countOnly = this.countOnly;
			queryAjax.params = params;
			this._reserveIncludeUnavailable(queryAjax, params);
			queryAjax.body = JSON.stringify(query);
			var request = queryAjax.generateRequest();
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;
		});
	},

	_reserveIncludeUnavailable: function(request, params) {
		if (this.reserveIncludeUnavailable) {
			if (params == null) {
				var params = {reserveIncludeUnavailable: true};
				request.params = params;
			} else {
				params.reserveIncludeUnavailable = true;
				request.params = params;
			}
		}
	},

	_onQueryGetRespone: function(e) {
		this._updateDataFromResponse(e.detail.response);

		this._notifyComplete("_onGetComplete", e.detail.response);
		var promiseResolve = e.detail._promiseResolve;
		if (promiseResolve) {
			promiseResolve(e.detail.response);
		}
		this._decrementActiveRequestCount();
	},

	createRecord: function(element, data, refreshType, actionGroup, action, promiseResolve,
			promiseReject, wfParametersMap, offlineMode, appContext) {
		this._incrementActiveRequestCount();

		var createAjax = this._createAjax;
		if (!createAjax) {
			createAjax = document.createElement("iron-ajax");
			createAjax.url = this._contextUrl;
			createAjax.addEventListener("response", this._handleCreateResponse.bind(this));
			createAjax.addEventListener("error", this._onError.bind(this, "_onCreateError"));
			createAjax.method = "POST";
			createAjax.contentType = "application/json";
			this._set_createAjax(createAjax);
		}

		this._ajaxWithWebContextId(createAjax, offlineMode, appContext, function() {
			
			this._updateAjaxWithBody(createAjax, data, refreshType, wfParametersMap);

			var params = {};
			if (actionGroup && action) {
				params.actionGroup = actionGroup;
				params.action = action;
			}
			if (this._isServerRefreshType(refreshType)) {
				params.refresh = true;
			}
			createAjax.params = params;
			var request = createAjax.generateRequest();
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;

			if (!this._shouldDoClientRefresh(refreshType)) {
				return;
			}

			// client refresh logic
			request._refresh = data;
			request._element = element;

			var dsData = this._data;
			if (Array.isArray(dsData) && Array.isArray(data)) {
				// multi record ds and creating multiple records
				data.forEach(function(record) {
					element.push("data", record);
				});
			} else if (Array.isArray(dsData) && !Array.isArray(data)) {
				// multi record ds and creating single record
				element.push("data", data);
			} else if (!Array.isArray(dsData) && !Array.isArray(data)) {
				// single record ds and creating single record
				this._setDataWithNotify(data);
			} else {
				// single record ds and creating multiple records
				// this shouldn't happen
			}
		});
	},

	_handleCreateResponse: function(e) {
		var createdRecordIdDetails = null;
		var response = e.detail.response;
		if (response.createdRecordId) {
			createdRecordIdDetails = response.createdRecordId;
		} else if (response.createdRecordIds) {
			createdRecordIdDetails = response.createdRecordIds;
		}

		var context = this.context;

		if (response.refresh) {
			this._updateDataFromResponse(response.refresh);
		} else if (e.detail._refresh) {
			var data = this._data;
			if (Array.isArray(data)) {
				var idsToUpdate = Array.isArray(createdRecordIdDetails) ? createdRecordIdDetails : [createdRecordIdDetails];
				var recordsToUpdate = Array.isArray(e.detail._refresh) ? e.detail._refresh : [e.detail._refresh];
				for (var i = 0; i < idsToUpdate.length; i++) {
					var idToUpdate = idsToUpdate[i];
					var recordToUpdate = recordsToUpdate[i];
					var index = this._getRecordIndexByRecord(recordToUpdate);
					if (index != null && index >= 0) {
						e.detail._element.set("data." + index + "._id", idToUpdate);
					}
				}
			} else {
				if (Array.isArray(createdRecordIdDetails)) {
					// this shouldn't happen
				} else {
					e.detail._element.set("data._id", idToUpdate);
				}
			}
		}

		var responseDetail = null;
		if(e.detail.response.wfParametersMap) {
			//response detail includes wf parameters map and the created record id(s) 
			responseDetail = this._getResponseDetail(e);
			responseDetail.createdRecordId = response.createdRecordId;
			responseDetail.createdRecordIds = response.createdRecordIds;
		} else {
			//Backwards competability, if user do not pass wf parameters map to the ds action, 
			//the response detail only includes the created record id(s) 
			responseDetail = createdRecordIdDetails;
		}

		this._notifyComplete("_onCreateComplete", responseDetail); //include responseDetail with fire event
		var promiseResolve = e.detail._promiseResolve;
		promiseResolve(responseDetail); //include responseDetail with promise event
		
		this._decrementActiveRequestCount();
	},

	deleteRecord: function(element, instanceId, refreshType, actionGroup, action, promiseResolve, 
			promiseReject, wfParametersMap, offlineMode, appContext) {
		this._incrementActiveRequestCount();

		var deleteAjax = this._deleteAjax;
		if (!deleteAjax) {
			deleteAjax = document.createElement("iron-ajax");
			deleteAjax.url = this._contextUrl;
			deleteAjax.addEventListener("response", this._handleDeleteResponse.bind(this));
			deleteAjax.addEventListener("error", this._onError.bind(this, "_onDeleteError"));
			deleteAjax.method = "POST";
			deleteAjax.contentType = "application/json";
			this._set_deleteAjax(deleteAjax);
		}

		this._ajaxWithWebContextId(deleteAjax, offlineMode, appContext, function() {
			var params = {};
			params.method = "delete";
			if (actionGroup && action) {
				params.actionGroup = actionGroup;
				params.action = action;
			}
			if (this._isServerRefreshType(refreshType)) {
				params.refresh = true;
			}
			deleteAjax.params = params;

			var instanceIds = Array.isArray(instanceId) ? instanceId : [instanceId];
			var recordIds = [];
			instanceIds.forEach(function(recordId) {
				// TODO check if the record ID is in the data source
				recordIds.push({_id: recordId});
			});

			this._updateAjaxWithBody(deleteAjax, recordIds, refreshType, wfParametersMap);

			var request = deleteAjax.generateRequest();
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;

			if (!this._shouldDoClientRefresh(refreshType)) {
				return;
			}

			// client refresh logic
			var data = this._data;
			if (Array.isArray(data)) {
				var refreshIds = Array.isArray(instanceId) ? instanceId : [instanceId];
				refreshIds.forEach(function(refreshId) {
					var index = this._getRecordIndexById(refreshId);
					if (index != null && index >= 0) {
						element.splice("data", index, 1);
					}
				}.bind(this));
			} else {
				// TODO make sure the record is the one being deleted?
				this._setDataWithNotify({});
			}
		});
	},

	_handleDeleteResponse: function(e) {
		var registry = this._registry;
		var response = e.detail.response;

		if (response.refresh) {
			this._updateDataFromResponse(response.refresh);
		}

		var responseDetail = this._getResponseDetail(e);
		this._notifyComplete("_onDeleteComplete", responseDetail); //include responseDetail with fire event
		e.detail._promiseResolve(responseDetail); //include responseDetail with promise event

		this._decrementActiveRequestCount();
	},

	updateRecord: function(element, instanceId, refreshType, actionGroup, action, 
			completeFunctionName, errorFunctionName, idsOnly, parentDs, promiseResolve, 
			promiseReject, wfParametersMap, offlineMode, appContext) {
		this._incrementActiveRequestCount();

		var updateAjax = this._updateAjax;
		if (!updateAjax) {
			updateAjax = document.createElement("iron-ajax");
			updateAjax.url = this._contextUrl;
			updateAjax.addEventListener("response", this._handleUpdateResponse.bind(this));
			updateAjax.addEventListener("error", this._onErrorDynamicErrorFunctionName.bind(this));
			updateAjax.contentType = "application/json";
			this._set_updateAjax(updateAjax);
		}
		updateAjax.method = "PUT";

		this._ajaxWithWebContextId(updateAjax, offlineMode, appContext, function() {
			var params = {};
			if (actionGroup && action) {
				params.actionGroup = actionGroup;
				params.action = action;
			}
			if (this._isServerRefreshType(refreshType)) {
				params.refresh = true;
			}
			params.method = "update";
			updateAjax.params = params;

			var single = !Array.isArray(instanceId);
			var instanceIds = single ? [instanceId] : instanceId;
			var data = this._data;
			var recordsToUpdate = [];
			instanceIds.forEach(function(recordId) {
				if (Array.isArray(data)) {
					var record = this._getRecordById(recordId);
					if (record == null) {
						console.warn("Can't update record because no record found with ID [id=" + recordId + "]");
						return;
					}
					recordsToUpdate.push(record);
				} else {
					recordsToUpdate.push(data);
				}
			}.bind(this));

			if (idsOnly) {
				var recordIdsToUpdate = [];
				recordsToUpdate.forEach(function(recordToUpdate) {
					recordIdsToUpdate.push({_id: recordToUpdate._id});
				});
				recordsToUpdate = recordIdsToUpdate;
			}

			if (single) {
				recordsToUpdate = recordsToUpdate[0];
			}

			this._updateAjaxWithBody(updateAjax, recordsToUpdate, refreshType, wfParametersMap);

			var request = updateAjax.generateRequest();
			request._completeFunctionName = completeFunctionName;
			request._errorFunctionName = errorFunctionName;
			request._parentDs = parentDs;
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;

			if (!this._shouldDoClientRefresh(refreshType) 
					|| !this.parentContext 
					|| Array.isArray(instanceId)
					|| idsOnly) {
				return;
			}

			// Client Refresh for parent data source
			if (!parentDs || !parentDs._data) {
				return;
			}

			var parentDsData = parentDs._data;
			if (Array.isArray(parentDsData)) {
				var index = parentDs._getRecordIndexById(instanceId);
				if (index != null && index >= 0) {
					parentDs._registry[0].set("data." + index, data);
				}
			} else if (parentDsData._id == instanceId) {
				parentDs._registry[0].set("data", data);
			}
		});
	},

	_handleUpdateResponse: function(e) {
		var refresh = e.detail.response.refresh;

		if (refresh) {
			this._updateDataFromResponse(refresh);

			var parentDs = e.detail._parentDs;
			if (parentDs && parentDs._data) {
				var parentDsData = parentDs._data;

				if (Array.isArray(parentDsData)) {
					var index = parentDs._getRecordIndexById(refresh.data._id);
					if (index != null && index >= 0) {
						parentDs._registry[0].set("data." + index, refresh.data);
					}
				} else if (parentDsData._id == refresh.data._id) {
					parentDs._registry[0].set("data", refresh.data);
				}
			}
		}

		var completeFunctionName = e.detail._completeFunctionName;
		var responseDetail = this._getResponseDetail(e);
		this._notifyComplete(completeFunctionName, responseDetail); //include responseDetail with fire event
		e.detail._promiseResolve(responseDetail); //include responseDetail with promise event

		this._decrementActiveRequestCount();
	},

	addRecord: function(element, data, refreshType, actionGroup, action, promiseResolve, 
			promiseReject, wfParametersMap, offlineMode, appContext) {
		this._incrementActiveRequestCount();

		var addAjax = this._addAjax;
		if (!addAjax) {
			addAjax = document.createElement("iron-ajax");
			addAjax.url = this._contextUrl;
			addAjax.addEventListener("response", this._handleAddResponse.bind(this));
			addAjax.addEventListener("error", this._onError.bind(this, "_onAddError"));
			addAjax.method = "PUT";
			addAjax.contentType = "application/json";
			this._set_addAjax(addAjax);
		}

		this._ajaxWithWebContextId(addAjax, offlineMode, appContext, function() {
			var params = {type: "add"};
			if (actionGroup && action) {
				params.actionGroup = actionGroup;
				params.action = action;
			}
			if (this._isServerRefreshType(refreshType)) {
				params.refresh = true;
			}
			addAjax.params = params;

			this._updateAjaxWithBody(addAjax, data, refreshType, wfParametersMap);

			var request = addAjax.generateRequest();
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;

			if (!this._shouldDoClientRefresh(refreshType)) {
				return;
			}

			// Refresh Logic
			var dsData = this._data;
			if (Array.isArray(dsData)) {
				var dataArray = Array.isArray(data) ? data : [data];
				dataArray.forEach(function(record) {
					// check if it is in the ds already
					var foundIndex = this._getRecordIndexById(record._id);
					var found = foundIndex != null && foundIndex >= 0;
					if (!found) {
						element.push("data", record);
					}
				}.bind(this));
			} else {
				if (Array.isArray(data)) {
					// this shouldn't happen
				} else {
					this._setDataWithNotify(data);
				}
			}
		});
	},

	_handleAddResponse: function(e) {
		var refresh = e.detail.response.refresh;

		if (refresh) {
			this._updateDataFromResponse(refresh);
		}

		var responseDetail = this._getResponseDetail(e);
		this._notifyComplete("_onAddComplete", responseDetail); //include responseDetail with fire event
		e.detail._promiseResolve(responseDetail); //include responseDetail with promise event

		this._decrementActiveRequestCount();
	},

	removeRecord: function(element, data, refreshType, actionGroup, action, promiseResolve,
			promiseReject, wfParametersMap, offlineMode, appContext) {
		this._incrementActiveRequestCount();

		var removeAjax = this._removeAjax;
		if (!removeAjax) {
			removeAjax = document.createElement("iron-ajax");
			removeAjax.url = this._contextUrl;
			removeAjax.addEventListener("response", this._handleRemoveResponse.bind(this));
			removeAjax.addEventListener("error", this._onError.bind(this, "_onRemoveError"));
			removeAjax.method = "PUT";
			removeAjax.contentType = "application/json";
			this._set_removeAjax(removeAjax);
		}

		this._ajaxWithWebContextId(removeAjax, offlineMode, appContext, function() {
			var params = {type: "remove"};
			if (actionGroup && action) {
				params.actionGroup = actionGroup;
				params.action = action;
			}
			if (this._isServerRefreshType(refreshType)) {
				params.refresh = true;
			}
			removeAjax.params = params;

			this._updateAjaxWithBody(removeAjax, data, refreshType, wfParametersMap);

			var request = removeAjax.generateRequest();
			request._promiseResolve = promiseResolve;
			request._promiseReject = promiseReject;

			if (!this._shouldDoClientRefresh(refreshType)) {
				return;
			}

			// Client Refresh Logic
			var dsData = this._data;
			if (Array.isArray(dsData)) {
				var dataArray = Array.isArray(data) ? data : [data];
				dataArray.forEach(function(record) {
					var index = this._getRecordIndexById(record._id);
					if (index != null && index >= 0) {
						element.splice("data", index, 1);
					}
				}.bind(this));
			} else {
				if (Array.isArray(data)) {
					// this shouldn't happen
				} else {
					this._setDataWithNotify({});
				}
			}
		});
	},

	_handleRemoveResponse: function(e) {
		var refresh = e.detail.response.refresh;

		if (refresh) {
			this._updateDataFromResponse(refresh);
		}

		var responseDetail = this._getResponseDetail(e);
		this._notifyComplete("_onRemoveComplete", responseDetail); //include responseDetail with fire event
		e.detail._promiseResolve(responseDetail); //include responseDetail with promise event

		this._decrementActiveRequestCount();
	},

	_getResponseDetail: function(e) {
		var responseDetail = {};
		responseDetail.wfParametersMap = e.detail.response.wfParametersMap;
		responseDetail.actionGroupName = e.detail.response.actionGroupName;
		responseDetail.actionName = e.detail.response.actionName;
		return responseDetail;			
	},
	
	dsChanged: function(source, data) {
		this._set_data(data);
		this._registry.forEach(function(element) {
			if (element !== source) {
				element._setDsData(data);
			}
		});
	},

	dataChanged: function(source, change) {
		this._registry.forEach(function(element) {
			if (element !== source) {
				element._notifyDsDataChange(change);
			}
		});
	},

	_shouldDoClientRefresh: function(refreshType) {
		if (!this._isClientRefreshType(refreshType)) {
			return false;
		}
		if (this.query) {
			console.warn("Paginated data sources cannot do client refreshing.");
			return false;
		} else {
			return true;
		}
	},

	_isServerRefreshType: function(refreshType) {
		return refreshType === TriPlatDs.RefreshType.SERVER || refreshType === TriPlatDs.RefreshType.BOTH;
	},

	_isClientRefreshType: function(refreshType) {
		return refreshType === TriPlatDs.RefreshType.CLIENT || refreshType === TriPlatDs.RefreshType.BOTH;
	},

	_getRecordById: function(recordId) {
		var recordInfo = this._getRecordInfoById(recordId);
		return recordInfo == null ? null : recordInfo.record;
	},

	_getRecordIndexById: function(recordId) {
		var recordInfo = this._getRecordInfoById(recordId);
		return recordInfo == null ? null : recordInfo.index;
	},

	_getRecordIndexByRecord: function(record) {
		var records = this._data;
		if (!records) {
			return -1;
		}

		if (!Array.isArray(records)) {
			if (record === records) {
				return 0;
			} else {
				return -1;
			}
		}

		return records.indexOf(record);
	},

	_getRecordInfoById: function(recordId) {
		var records = this._data;
		if (!records) {
			return null;
		}
		
		if (!Array.isArray(records)) {
			if (records._id == recordId) {
				return {
					record: records,
					index: -1
				};
			} else {
				return null;
			}
		}

		var foundInfo = null;
		for (var i = 0; i < records.length; i++) {
			if (records[i]._id == recordId) {
				foundInfo = {
					record: records[i],
					index: i
				};
				break;
			}
		}

		return foundInfo;
	},

	_incrementActiveRequestCount: function() {
		this._set_activeRequestCount(this._activeRequestCount + 1);
		this._activeRequestCountChanged(this._activeRequestCount);
	},

	_decrementActiveRequestCount: function() {
		this._set_activeRequestCount(this._activeRequestCount - 1);
		this._activeRequestCountChanged(this._activeRequestCount);
	},

	_activeRequestCountChanged: function(activeRequestCount) {
		if (activeRequestCount == 0) {
			this._registry.forEach(function(element) {
				element._setLoading(false);
			});
		} else if (activeRequestCount == 1) {
			this._registry.forEach(function(element) {
				element._setLoading(true);
			});
		}
	},

	_updateDataWithNotify: function(records) {
		for (var i = 0; i < records.length; i++) {
			this._data.push(records[i]);
		}

		this._registry.forEach(function(element) {
			element._notifyDsDataAppended(records);
		});
	},


	_setDataWithNotify: function(data) {
		this._set_data(data);
		this._registry.forEach(function(element) {
			element._setDsData(data);
		});
	},

	_setTransitionInfoWithNotify: function(transitionInfo) {
		this._set_transitionInfo(transitionInfo);
		this._registry.forEach(function(element) {
			element._setDsTransitionInfo(transitionInfo);
		});
	},

	_setQueryTotalSizeWithNotify: function(totalSize) {
		this._setQueryTotalSize(totalSize);
		this._registry.forEach(function(element) {
			element._setQueryTotalSize(totalSize);
		});
	},

	_setQueryMetadataWithNotify: function(metadata) {
		this._set_queryMetadata(metadata);
		this._registry.forEach(function(element) {
			element._setDsQueryMetadata(metadata);
		})
	},

	_notifyComplete: function(functionName) {
		var args = null;
		if (arguments.length == 0) {
			console.warn("_notifyComplete no function name");
			return;
		} else if (arguments.length > 1) {
			args = [];
			for (var i = 1; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
		}

		this._registry.forEach(function(element) {
			var completeFunction = element[functionName];
			completeFunction.apply(element, args);
		});
	},

	_onErrorDynamicErrorFunctionName: function(e) {
		var request = e.detail.request;
		var errorFunctionName = request._errorFunctionName;
		this._onError(errorFunctionName, e);
	},

	_onError: function(functionName, e) {
		var request = e.detail.request;
		var xhr = request.xhr;
		var errorCode = xhr.status;
		
		switch (errorCode) {
			
			case 401:
				// Unauthorized - Need to login
				break;
			case 403:
				// Forbidden - User doesn't have correct access
				const triplatDs = this._registry.find(el => {
					return request.url.search(el.name) != -1;
				});
				var errorDialog = triplatDs.shadowRoot.querySelector('#triPlatDsErrorDialog');
				var errorMsg = triplatDs.shadowRoot.querySelector('#triPlatDsErrorMsg');
				var __dictionary__title = "Security Warning";
				var __dictionary__line2 = "Contact your TRIRIGA administrator for assistance.";
				var __dictionary__read = "You do not have permission to access this page.";
				var __dictionary__update = "You do not have permission to update this record.";
				var __dictionary__create = "You do not have permission to create records.";
				var __dictionary__delete = "You do not have permission to delete records.";
				var __dictionary__action = "You do not have permission to perform the action.";
				var __dictionary__context = "Context security check has failed. Verify that your application has the proper security.";
				if(xhr.response && xhr.response.operation)
				{
					var operation = xhr.response.operation;
					var action = xhr.response.action;
					
					errorMsg.titleLabel = __dictionary__title;
					errorMsg.message_line2Label = __dictionary__line2;
					switch(operation)
					{
					case "read":
						errorMsg.message_line1Label = __dictionary__read;
						break;
					case "update":
						errorMsg.message_line1Label = __dictionary__update;
						break;
					case "create":
						errorMsg.message_line1Label = __dictionary__create;
						break;
					case "delete":
						errorMsg.message_line1Label = __dictionary__delete;
						break;
					case "action":
						errorMsg.message_line1Label = __dictionary__action;
						break;
					case "context":
						errorMsg.message_line1Label = __dictionary__context;
						break;
					default:
						//invalid operation
						console.log("Illegal security check operation: "+operation);
					}
				} else {
					errorMsg.title = "Error: " + e.detail.request.status + " : " + e.detail.request.statusText;
					if (xhr.response.message) {
							errorMsg.message_line1 = xhr.response.message;
						}
				}
				errorDialog.opened = true;
				break;
			default:
				// All other errors
		}

		var promiseReject = request._promiseReject;

		var eventDetail = xhr.response != null && xhr.response != "" ? xhr.response : {};
		eventDetail.status = xhr.status;
		this._notifyComplete(functionName,eventDetail);

		if (promiseReject) {
			promiseReject();
			if(eventDetail.message) {
				console.log(eventDetail.message);
			}
		}

		this._decrementActiveRequestCount();
	},

	_getUrl: function(url) {
		var urlElement = this._urlElement;
		if (!urlElement) {
			urlElement = document.createElement("tricore-url");
			this._set_urlElement(urlElement);
		}
		return urlElement.getUrl(url);
	},

	_updateAjaxWithBody: function(ajax, data, refreshType, wfParametersMap) {
		var dataCopy = this._copyData(data);
		var usavedFiles = triplatMultipartUtil.handleUnsavedFiles(dataCopy);
		
		var body = {data: dataCopy};
		if (this.query && this._isServerRefreshType(refreshType)) {
			var query = this._getRefreshQuery();
			body.query = query;
		}
		if(wfParametersMap) {
			body.wfParametersMap = wfParametersMap;
		}
		
		var bodyJson = JSON.stringify(body);
		
		if (usavedFiles == null) {
			ajax.body = bodyJson;
			ajax.contentType = "application/json";
		} else {
			var boundary = triplatMultipartUtil.generateMultipartFormDataBoundary();
			ajax.contentType = "multipart/form-data; boundary=" + boundary;
			var formData = triplatMultipartUtil.buildMultipartFormData(
					ajax.contentType,
					boundary, 
					bodyJson, 
					JSON.stringify(usavedFiles.imageFieldMap), 
					JSON.stringify(usavedFiles.fileFieldMap), 
					usavedFiles.files);
			ajax.body = formData;
			ajax.method = "POST";
		}
	},

	_getRefreshQuery: function() {
		if (!this.query) {
			return null;
		}

		if (!this.queryTotalSize) {
			//It is a first request from this triplat-ds-impl, so just use the query object.
			return this.query;
		}

		var querySize = this.querySize;
		if (this.queryTotalSize==this.querySize) {
			//The data source queryTotalSize is updated after records retrieved.
			//Therefore, when querySize reached the queryTotalSize, increase requested querySize by one (in case record was added and DS refreshed).
			querySize = querySize+1;
		} else if (this.queryTotalSize> 0 && this.querySize==0) {
			//It is a first request from this triplat-ds-impl after countOnly was change to false, so just use the query object.
			return this.query;
		}
		
		var page = {
			from: this.queryFrom,
			size: querySize
		};
		var query = new TriplatQuery.Query(page, this.query.filters, this.query.sorts, this.query.calendar, this.query.searchColumn, this.query.workPlanner, this.query.reserveContext);
		return query;
	},

	_ajaxWithWebContextId: function(ajax, offlineMode, appContext, callback) {
		this.webContextIdElement.getWebContextId().then(function(webContextId) {
			ajax.headers = {"triWebContextId": webContextId};
			if (offlineMode) {
				ajax.headers["tri-offline-mode"] = offlineMode;
			}
			if (appContext && (typeof appContext === "string")) {
				ajax.headers["app-context"] = this._encodeAppContext(appContext);
			}
			callback.call(this);
		}.bind(this));
	},
	
	_encodeAppContext: function(str) {
		// first encodeURIComponent to get percent-encoded UTF-8,
		// then convert the percent encodings into raw bytes
		// then convert the raw bytes into BASE64 string
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode('0x' + p1);
		}));
	},

	_updateDataFromResponse: function(payload) {
		if (this.query) {
			this._updateDataFromResponseQuery(payload);
		} else {
			this._updateDataFromResponseNonQuery(payload);
		}
	},

	_updateDataFromResponseNonQuery: function(payload) {
		this._setDataWithNotify(payload.data);
		this._setTransitionInfoWithNotify(payload.transitionInfo);
		this._setQueryTotalSizeWithNotify(payload.totalSize);
	},

	_updateDataFromResponseQuery: function(payload) {
		var records = payload.data;
		var from = payload.from;
		var size = payload.size;
		this._setQueryTotalSizeWithNotify(payload.totalSize);

		if (this.appendPage) {
			var firstIndex = Math.min(this.queryFrom, from);
			var lastIndex = Math.max(this.queryFrom + this.querySize, from + size) - 1;
			var newSize = lastIndex - firstIndex + 1;

			this._setQueryFrom(firstIndex);
			this._setQuerySize(newSize);
			
			if (this.queryFrom == 0 && from == 0) {
				this._setDataWithNotify(records);
			} else {
				this._updateDataWithNotify(records);
			}
		} else {
			this._setQueryFrom(from);
			this._setQuerySize(size);
			this._setDataWithNotify(records);
		}
	},
	
	_updateQueryMetadataFromResponse: function(payload) {
		this._setQueryMetadataWithNotify(payload);
	},

	_copyData: function(data) {
		if (data == null) {
			return null;
		}
		var copy = null;
		if (Array.isArray(data)) {
			copy = data.map(this._copyRecord);				
		} else {
			copy = this._copyRecord(data);
		}			
		return copy;
	},
	
	_copyRecord: function(record) {
		var copy = {};
		for (var attr in record) {
			copy[attr] = record[attr];
		}
		return copy;
	}
});