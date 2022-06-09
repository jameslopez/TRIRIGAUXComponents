/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../tricore-url/tricore-url.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/**
 *	<div style="background-color:#FFFFCC">
 *  	<div style="padding:20px;">
 *			<b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
 *		</div>
 *	</div>
 */

Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				display: block;
			}
		
		</style>

		<tricore-url id="url"></tricore-url>
		<div id="content"></div>
	`,

    is: "tricore-view-container",

    properties: {

		modelAndViewName: {
			type: String,
			readOnly: false,
			notify: true
		},

		viewName: {
			type: String,
			notify: false,
			readOnly: false
		},

		instanceId: {
			type: String,
			readOnly: false,
			notify: true
		},

		applyDefaultTheme: {
			type: Boolean,
			notify: false,
			readOnly: false	
		},

		scroller: {
			type: Object,
			readOnly: false,
			notify: true
		}

	},

    viewInfo: null,

    observers: [
		"_init(modelAndViewName, viewName, instanceId)"
	],

    _init: function(modelAndViewName, viewName, instanceId) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this.importHref([this._getTagUrl()], function() {
			var element = document.createElement(this.viewName);
			element.modelAndView = this.modelAndViewName;
			element.instanceId = this.instanceId;
			element.contextUrl = this._getContextUrl();
			element.scroller = this.scroller;
			if (this.applyDefaultTheme) {
				dom(element).classList.add("tri-theme");
			}
			dom(this.$.content).appendChild(element);
		}.bind(this));
	},

    _getTagUrl: function() {
		return this._getContextUrl() +
				"/" + this.viewName + ".html";
	},

    _getContextUrl: function() {
		return this.$.url.getUrl("/p/components/r" +
				"/" + this.viewName);
	}
});