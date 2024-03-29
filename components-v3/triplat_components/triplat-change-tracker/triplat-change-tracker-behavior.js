/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
var trackValue = {};

var changeStatus = {};
var customMessage = "Unsaved data";
var checkEnable = true;
var _useModernDialog = null;
var _availableDs = {};

export const TriPlatChangeTrackerBehavior = {
	
	_getDataSourceFromContext: function(context) {
		var contextParts = context.split('/');
		var retDsName;
		var indexValue = -1;
		for(dsName in _availableDs) {
			if (contextParts.indexOf(dsName) > indexValue) {
				retDsName = dsName;
				indexValue = contextParts.indexOf(dsName)
			}
		}
		if (indexValue != -1) return retDsName;
		//console.log("can't find data source in context (" + context +")");
		return "";
	},
	
	_markDataSourceDirty: function(context) {
		var dataSource = this._getDataSourceFromContext(context);
		changeStatus[dataSource] = true;
		//console.log("_markDataSourceDirty: " + dataSource + " is marked dirty");
	},
	
	_isPageStatusDirty: function(routeName) {
		for(dataSource in changeStatus) {
			if (changeStatus[dataSource]) return true;
		}
		return false;
	},
	
	_resetPageStatus: function() {
		for(item in changeStatus) {
			changeStatus[item] = false;
		}
		for(item in trackValue) {
			delete trackValue[item];
		}
		for(item in _availableDs) {
			delete _availableDs[item];
		}
	},
	
	_setCheckEnable: function(value) {
		checkEnable = value;
	},
	
	_isUnsaveCheckEnable: function() {
		return checkEnable;
	},
	
	_setCustomMessage: function(message) {
		customMessage = message;
	},
	
	_getCustomMessage: function() {
		return customMessage;
	},
	
	_isDeepPathValueChange: function(dataName, value) {
		if (JSON.stringify(value.base) === JSON.stringify(value.value)) {
			// init load
			if (dataName.localeCompare(value.path) == 0) {
				// clone the object
				trackValue[dataName] = JSON.parse(JSON.stringify(value.base));
			}
			return false;
		} else {
			var rootPath = value.path.split('.')[0];
			if (rootPath.localeCompare(dataName)) {
				console.log("error: _trackChange dataName(" + dataName + ") cannot be found in value = " + rootPath);
				return false;
			}
			if (JSON.stringify(trackValue[rootPath]) !== JSON.stringify(value.base)) {
				// clone the object
				trackValue[rootPath] = JSON.parse(JSON.stringify(value.base));
				return true;
			} else {
				return false;
			}
		}		
	},
	
	_notEqualOperator: function(oldValue, newValue, valueType) {
		if (valueType === 'object') 
			return (JSON.stringify(newValue) !== JSON.stringify(oldValue));
		if (valueType === 'string')
			return (newValue.localeCompare(oldValue) !== 0);
		return (newValue !== oldValue);
	},
	
	_copyValue: function(value, valueType) {
		if (valueType === 'object')
			return JSON.parse(JSON.stringify(value));
		if (valueType === 'string')
			return value.toString();
		return value;
	},
	
	_isSinglePathValueChange: function(dataName, value) {
		if (typeof value === 'undefined') {
			// exit page
			delete trackValue[dataName];
			return false;
		}
		if (dataName in trackValue) {
			if (this._notEqualOperator(trackValue[dataName], value, typeof value)) {
				trackValue[dataName] = this._copyValue(value, typeof value);
				return true;
			}
			return false;
		} else {
			// init load
			trackValue[dataName] = this._copyValue(value, typeof value);
			return false;
		}
	},
	
	_isDeepPathValue: function(value) {
		if (value 
			&& (typeof value.base !== 'undefined') 
			&& (typeof value.path !== 'undefined') 
			&& (typeof value.value !== 'undefined')) return true;
		return false;
	},
	
	_isValueChange: function(dataName, value) {
		if (typeof dataName === 'undefined') {
			error.log("error in _trackChange argument");
			return false;
		}
		if (this._isDeepPathValue(value)) {
			return this._isDeepPathValueChange(dataName, value);
		} else {
			return this._isSinglePathValueChange(dataName, value);
		}
	},
	
	/**
	  * Called by app
	  * useCustomChanges: if true it will use a custom validation 
	  * customChanges: if true it means that there're unsaved changes 
	  */
	trackChange: function(dataSourceName, dataName, value, useCustomChanges, customChanges) {
		_availableDs[dataSourceName] = true;
		if (this._isUnsaveCheckEnable()) {
			if (useCustomChanges) {
				if(customChanges) {
					this._markDataSourceDirty(dataSourceName);
				} else {
					this._resetPageStatus();
				}
			} else {
				if (this._isValueChange(dataName, value)) {
					this._markDataSourceDirty(dataSourceName);
				}
			}
		}
	},
	
	// called by triplat-ds-container-behavior
	markDataSourceClean: function(context) {
		if (this._isUnsaveCheckEnable()) {
			var dataSource = this._getDataSourceFromContext(context);
			if (dataSource in changeStatus) {
				changeStatus[dataSource] = false;
				//console.log("_markDataSourceClean: " + dataSource + " is marked clean");
			}
		}
	},
	
	// called by triplat-route using javascript built-in confirm method
	// return false when there is unsaved data and user confirm cancel
	unsaveCheck: function() {
		var retValue = true;
		if (this._isUnsaveCheckEnable()) {
			if (this._isPageStatusDirty()) {
				var message = this._getCustomMessage();
				var res = confirm(message);
				if (res) {
					this._resetPageStatus();
				} else {
					retValue = false;
				}
			}
		}
		return retValue;
	},
	
	// return true for using paper-dialog
	// return false for using built-in confirm dialog
	_isDialogPromiseRegister: function() {
		if (_useModernDialog) {
			return true;
		} else {
			return false;
		}
	},
	
	_registerDialogPromise: function(dialogInfo) {
		_useModernDialog= dialogInfo;
	},
	
	/**
	  * useCustomDialog: if true it will use a custom dialog, otherwise it will try to use triplat-change-tracker
	  * customDialogId: the ID of the custom dialog 
	  * Important: if a customDialogId is not set, it will look for a dialog with ID 'alertDialog'. 
	  * Also, the confirm and dismiss button must have, respectivelly, the IDs: 'confirm' and 'dismiss' 
	  */
	setupDialogPromise: function(node, useCustomDialog, customDialogId) {
		var dialogId = (customDialogId) ? customDialogId : "alertDialog";
		var queryElement = (useCustomDialog) ? node.querySelector("#" + dialogId) : node.querySelector("triplat-change-tracker");
		if (queryElement) {
			var disabled = queryElement.hasAttribute("disabled");
			if (disabled) {
				this._setCheckEnable(false);
			}
			var dialogIdData = {
				'node': node,
				'dialogId': dialogId,
				'dismissButtonId': 'dismiss',
				'confirmButtonId': 'confirm'
			};
			this._registerDialogPromise(dialogIdData);
		} 
	},
	
	getDialogPromise: function() {
		var _dialogPromise = new Promise(function(resolve, reject) {
			var dialogElement = _useModernDialog.node.querySelector("#" + _useModernDialog.dialogId);
			var dismissButton = _useModernDialog.node.querySelector("#" + _useModernDialog.dismissButtonId);
			var confirmButton = _useModernDialog.node.querySelector("#" + _useModernDialog.confirmButtonId);
			var _rejectFunction = function() { 
				reject();
				dismissButton.removeEventListener('tap', _rejectFunction);
			}
			var _resolveFunction = function() {
				resolve();
				confirmButton.removeEventListener('tap', _resolveFunction);
			}
			dismissButton.addEventListener('tap', _rejectFunction);
			confirmButton.addEventListener('tap', _resolveFunction);
			dialogElement.opened = true;
		});
		return _dialogPromise;
	},
	
	// called by TriplatWebContextIdBehavior._endContext
	unsaveCheckBeforeUnload: function() {
		var message = "";
		if (this._isUnsaveCheckEnable()) {
			if (this._isPageStatusDirty()) {
				message = this._getCustomMessage();
			}
		}
		return message;
	},
	
	// api to allow force clean dirty view
	forceClean: function() {
		this._resetPageStatus();
	},
	
	// called by triplat-route-selector to reset dialog promise
	resetDialogPromise: function() {
		this._setCheckEnable(true);
		this._registerDialogPromise(null);
	}
};