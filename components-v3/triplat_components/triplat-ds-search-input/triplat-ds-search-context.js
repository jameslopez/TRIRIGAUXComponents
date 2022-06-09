/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({

	is: "triplat-ds-search-context",
	
	properties: {
		datasource: String,
		contextId: Number
	},
	
	observers: ["_handleContextChanged(datasource, contextId)"],
	
	_handleContextChanged: function(datasource, contextId){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(!datasource || !contextId){
			return;
		}

		this.fire("triplat-ds-search-context-changed",
				 {datasource: datasource, contextId: contextId});
	}
 });