/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
/* These imports are required so we don't need to import them in the main jsp */
import "../@polymer/polymer/polymer-legacy.js";

import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../triplat-theme/triplat-theme.js";
import "../tricore-properties/tricore-properties.js";
import { TriplatWebContextIdBehavior } from "../triplat-ds/triplat-web-context-id-behavior.js";
import { TriplatDsContainerBehavior } from "../triplat-ds/triplat-ds-container-behavior.js";
import { TriPlatChangeTrackerBehavior } from "../triplat-change-tracker/triplat-change-tracker-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

export const TriPlatViewBehaviorImpl = {

	properties: {

		modelAndView: {
			type: String,
			notify: false,
			readOnly: false
		},

		instanceId: {
			type: String,
			notify: false,
			readOnly: false
		},

		contextUrl: {
			type: String,
			notify: false,
			readOnly: false
		},
		numberpatternInteger: { 
			type: String, 
			value: "[0-9]*",
			readonly: true 
		},
		numberinvalidmsgInteger: { 
			type: String, 
			value: "Invalid value entered. Expected an integer value.",
			readonly: true 
		},
		numberpatternCurrency: { 
			type: String, 
			value: "[0-9]*\.?[0-9][0-9]|[0-9]",
			readonly: true
		},
		numberinvalidmsgCurrency: { 
			type: String, 
			value: "Invalid value entered. Expect a currency value with either zero or 2 decimals of precision.",
			readonly: true 
		},

		numberpatternFloat: { 
			type: String, 
			value: "[0-9]*\.?[0-9]*",
			readonly: true
		},
		numberinvalidmsgFloat: { 
			type: String, 
			value: "Invalid value entered. Expect a floating point value.",
			readonly: true 
		}

	},

	view: null,

	ready: function() {
		this.view = dom(this.root).querySelector("tri-view");
		if (this.view == null) {
			// console.warn("No tri-view element found");
		}
		this._hideAppLoadingIndicator();
	},

	action: function(e) {
		if (this.view == null) {
			console.warn("Cannot process action as no tri-view element was found on this view.");
			return;
		}

		var targetElement = e.target;
		if (!targetElement) {
			console.warn("No target on action event.");
			return;
		}
		
		var actionElement = null;
		while (targetElement != null) {
			if (targetElement.hasAttribute("data-source-name")
					&& targetElement.hasAttribute("action-group-name")
					&& targetElement.hasAttribute("action-name")) {
				actionElement = targetElement;
				break;	
			}
			
			targetElement = targetElement.parentNode;
		}

		if (actionElement == null) {
			console.warn("No action element found with required attribures (data-source-name, action-group-name, action-name)");
			return;
		}

		var dataSourceName = actionElement.getAttribute("data-source-name");
		var actionGroupName = actionElement.getAttribute("action-group-name");
		var actionName = actionElement.getAttribute("action-name");

		this.view.performAction(dataSourceName, actionGroupName, actionName);
	},

	_getPattern: function(val) {
		var rc = "";
		if (val == "integer") {
			rc = "[0-9]*";
		}
		return rc
	},

	_hideAppLoadingIndicator: function() {
		document.querySelector("#app-loading-indicator").hidden = true;
	}

};

export const TriPlatViewBehavior = [
	TriPlatViewBehaviorImpl,
	TriplatWebContextIdBehavior,
	TriplatDsContainerBehavior,
	TriPlatChangeTrackerBehavior
];