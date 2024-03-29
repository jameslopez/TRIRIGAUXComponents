/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "./triplat-ds-offline.js";

var offlineDSRegistry = {
	UPDATE: {},
	AUTOMATIC: {},
	CONTEXT: {}
};

Polymer({

	is: "triplat-offline-ds-registry",

	register: function(offlineDs) {
		offlineDSRegistry[offlineDs.mode][this._getDsRegistryKey(offlineDs)] = offlineDs;
	},

	unregister: function(offlineDs) {
		delete offlineDSRegistry[offlineDs.mode][this._getDsRegistryKey(offlineDs)];
	},
	
	getAll: function() {
		var allDSList = [];
		for (var mode in offlineDSRegistry) {
			for (var offlineDsKey in offlineDSRegistry[mode]) {
				allDSList.push(offlineDSRegistry[mode][offlineDsKey]); 
			}
		}
		return allDSList;
	},

	getAllAutomatic: function() {
		var automaticDSList = [];
		for (var offlineDsKey in offlineDSRegistry["AUTOMATIC"]) {
			automaticDSList.push(offlineDSRegistry["AUTOMATIC"][offlineDsKey]); 
		}
		return automaticDSList;
	},

	getChildren: function (modelAndView, hierarchyPath) {
		var dsList = [];
		for (var offlineDsKey in offlineDSRegistry["CONTEXT"]) {
			var offlineDs = offlineDSRegistry["CONTEXT"][offlineDsKey]
			if (offlineDs._modelAndView == modelAndView && offlineDs._hierarchyPath == (hierarchyPath + "/" + offlineDs._dsName)) {
				dsList.push(offlineDs);
			}
		};
		return dsList;
	},
	
	_getDsRegistryKey: function(offlineDs) {
		return offlineDs._modelAndView + offlineDs._hierarchyPath;
	} 
});