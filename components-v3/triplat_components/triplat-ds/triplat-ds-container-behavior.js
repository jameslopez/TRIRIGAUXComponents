/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "./triplat-ds-impl.js";

export const TriplatDsContainerBehavior = {

	isTriplatDsContainer: true,

	properties: {

		_dsImplsByContext: {
			type: Object,
			notify: false,
			readOnly: true,
			value: function() { return {}; }
		},

		_queryDsElements: {
			type: Array,
			notify: false,
			readOnly: true,
			value: function() { return []; }
		},

		_queryDsImpls: {
			type: Array,
			notify: false,
			readOnly: true,
			value: function() { return []; }
		}

	},

	// called by triplat-ds
	registerContext: function(element, context, parentContext, manual, query, appendPage, offlineMode, countOnly) {
		var dsImpl = null;
		if (query) {
			dsImpl = this._getQueryDsImpl(element);
		} else {
			dsImpl = this._getNonQueryDsImpl(context);
		}
		if (!dsImpl) {
			dsImpl = document.createElement("triplat-ds-impl");
			dsImpl.context = context;
			dsImpl.parentContext = parentContext;
			dsImpl.query = query;
			dsImpl.countOnly = countOnly;
			dsImpl.appendPage = appendPage;
			dsImpl.webContextIdElement = this;
			if (query) {
				this.push("_queryDsElements", element);
				this.push("_queryDsImpls", dsImpl);
			} else {
				this.set("_dsImplsByContext." + context, dsImpl);
			}
		}

		dsImpl.register(element, manual, offlineMode);
	},

	unregisterContext: function(element, context) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}
		
		dsImpl.unregister(element);

		if (dsImpl.isUnregistered) {
			var queryDsImplIndex = this._queryDsElements.indexOf(element);
			if (queryDsImplIndex > -1) {
				this.splice("_queryDsElements", queryDsImplIndex, 1);
				this.splice("_queryDsImpls", queryDsImplIndex, 1);
			} else {
				this.set("_dsImplsByContext." + context, null);
			}
		}
	},

	refresh: function(element, context, promiseResolve, promiseReject, offlineMode) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}
		dsImpl.refresh(promiseResolve, promiseReject, offlineMode);
	},

	getQueryMetadata: function(element, context, promiseResolve, promiseReject, offlineMode) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}
		dsImpl.getQueryMetadata(promiseResolve, promiseReject, offlineMode);
	},
	
	updateQuery: function(element, context, query, manual, offlineMode) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}

		dsImpl.updateQuery(query, manual, offlineMode);
	},

	createRecord: function(element, context, data, refreshType, actionGroup, action, promiseResolve, 
			promiseReject, wfParametersMap, offlineMode, appContext) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}
				
		if(this.markDataSourceClean) {
			this.markDataSourceClean(context);
		}
		
		dsImpl.createRecord(element, data, refreshType, actionGroup, action, promiseResolve, promiseReject, 
				wfParametersMap, offlineMode, appContext);
	},

	deleteRecord: function(element, context, instanceId, refreshType, actionGroup, action, promiseResolve,
			promiseReject, wfParametersMap, offlineMode, appContext) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}

		dsImpl.deleteRecord(element, instanceId, refreshType, actionGroup, action, promiseResolve, promiseReject, 
				wfParametersMap, offlineMode, appContext);
	},

	updateRecord: function(element, context, instanceId, refreshType, actionGroup, action, 
			completeFunctionName, errorFunctionName, idsOnly, promiseResolve, promiseReject, wfParametersMap, 
			offlineMode, appContext) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}

		var parentDs = null;
		if (dsImpl.parentContext) {
			var parentContext = dsImpl.parentContext;
			parentDs = this._dsImplsByContext[parentContext];
		}
		
		if(this.markDataSourceClean) {
			this.markDataSourceClean(context);
		}

		dsImpl.updateRecord(element, instanceId, refreshType, actionGroup, action, 
			completeFunctionName, errorFunctionName, idsOnly, parentDs, promiseResolve, 
			promiseReject, wfParametersMap, offlineMode, appContext);
	},

	addRecord: function(element, context, data, refreshType, actionGroup, action, promiseResolve, 
			promiseReject, wfParametersMap, offlineMode, appContext) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}

		dsImpl.addRecord(element, data, refreshType, actionGroup, action, promiseResolve, 
				promiseReject, wfParametersMap, offlineMode, appContext);
	},

	removeRecord: function(element, context, data, refreshType, actionGroup, action, promiseResolve, 
			promiseReject, wfParametersMap, offlineMode, appContext) {
		var dsImpl = this._getDsImpl(element, context);
		if (!dsImpl) {
			return;
		}

		dsImpl.removeRecord(element, data, refreshType, actionGroup, action, promiseResolve, 
				promiseReject, wfParametersMap, offlineMode, appContext);
	},

	// called by triplat-ds
	dsChanged: function(source, context, data) {
		var dsImpl = this._getDsImpl(source, context);
		if (!dsImpl) {
			return;
		}

		dsImpl.dsChanged(source, data);
	},

	// called by triplat-ds
	dataChanged: function(source, context, change) {
		var dsImpl = this._getDsImpl(source, context);
		if (!dsImpl) {
			return;
		}
		dsImpl.dataChanged(source, change);
	},

	// called by triplat-ds
	updateCountOnly: function(source, context, change) {
		var dsImpl = this._getDsImpl(source, context);
		if (!dsImpl) {
			return;
		}
		dsImpl.updateCountOnly(source, change);
	},

	_getDsImpl: function(element, context) {
		return this._getQueryDsImpl(element) || this._getNonQueryDsImpl(context);
	},

	_getQueryDsImpl: function(element) {
		var queryDsImplIndex = this._queryDsElements.indexOf(element);
		if (queryDsImplIndex > -1) {
			return this._queryDsImpls[queryDsImplIndex];
		}
		return null;
	},

	_getNonQueryDsImpl: function(context) {
		return this._dsImplsByContext[context];
	}

};