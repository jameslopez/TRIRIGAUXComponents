/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../tricore-context-path/tricore-context-path.js";
import { IronMeta } from "../@polymer/iron-meta/iron-meta.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A utility component for building a URL that will contain a context path.

	<tricore-url raw-url="/p/web/doc" bind-url="{{docUrl}}"></tricore-url>

If the context path of the system is /dev then the output for this example will be /dev/p/web/doc

@demo demo/index.html
*/
Polymer({

	is: "tricore-url",

	properties: {

		/**
		 * The URL without the context path to use to construct the bind URL.
		 */
		rawUrl: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * Use this attibute for getting the output of the URL with the context path.
		 */
		bindUrl: {
			type: String,
			notify: true,
			readOnly: true
		},
		
		_demoBaseUrl: {
			type: String,
			readOnly: true
		}
	},

	observers: [
		"_computeUrl(rawUrl)"
	],
	
	_getContextPath: function() {
		if (!this._contextPath) {
			var contextPathElement = document.createElement("tricore-context-path");
			this._contextPath = contextPathElement.getPath;
		}
		return this._contextPath;
	},

	_computeUrl: function(rawUrl) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setBindUrl(this.getUrl(rawUrl));
	},

	/**
	 * Returns a URL from the given rawUrl that will contain 
	 * the context path.
	 * 
	 * @param {String} rawUrl
	 * @return {String} The URL with the context path.
	 */
	getUrl: function(rawUrl) {
		var demoBaseUrl = this._getDemoBasedUrl();
		if (demoBaseUrl) {
			var fileName = "demo" + rawUrl.match(/[^\?]+/)[0].replace(/\//g, ".") + ".json";
			return demoBaseUrl + "/" + fileName;
		} else {
			return this._getContextPath() + rawUrl;
		}
	},
	
	_getDemoBasedUrl: function() {
		if (!this._demoBaseUrl) {
			var ironMeta = document.createElement("iron-meta");
			ironMeta.type = "tri";
			this._set_demoBaseUrl(ironMeta.byKey("demoBaseUrl"));
		}			
		return this._demoBaseUrl;
	}

});