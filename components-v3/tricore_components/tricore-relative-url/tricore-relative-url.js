/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../tricore-context-path/tricore-context-path.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component that will calculate a relative URL based off the url of the document.

	 <tricore-relative-url 
	   relative-url="demo.json" 
	   relative-data-host={{dataHost}} 
	   bind-url="{{url}}"></tricore-relative-url>

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: "tricore-relative-url",

    properties: {

		/**
		 * The relative URL that will be used in calculating a real path.
		 */
		relativeUrl: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * The data host to calculate the relative url from.
		 */
		relativeHost: {
			type: Object,
			notify: false,
			readOnly: false
		},

		/**
		 * Use the property to retrieve the calculated URL.
		 */
		bindUrl: {
			type: String,
			notify: true,
			readOnly: true
		}

	},

    observers: [
		"_init(relativeUrl, relativeHost)"
	],

	ready: function() {
		this.set("relativeHost", this._getDefaultDataHost());
	},
	
    _init: function(relativeUrl, relativeHost) {
	    if (!assertParametersAreDefined(arguments) || !relativeHost) {
		    return;
		}

		var bindUrl = relativeHost.resolveUrl(relativeUrl);

		if (bindUrl.indexOf("http") == 0) {
			var match = bindUrl.match(/^(.*?)\/?([^\/]+\.[^\/]+)?$/);
			if (match.length >= 1) {
				bindUrl = match[1];
			}
		} else {
			// this means that the relative url should come from the document
			bindUrl = document.baseURI.match(/^(.*?)\/?([^\/]+\.[^\/]+)?$/)[1];
			if (relativeUrl.length != 0) {
				bindUrl += "/" + relativeUrl;
			}
		}

		this._setBindUrl(bindUrl);
	},

	_getDefaultDataHost: function() {
		return this.dataHost ? this.dataHost : this.__dataHost;
	}
});