/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";

/*
A component used to get the server's context path.

	 <tricore-context-path get-path="{{contextPath}}"></tricore-context-path>

@demo demo/index.html
*/
Polymer({
	
	is: "tricore-context-path",

	properties: {
		
		/**
		 * Property retrieve the current context path. This will not work if the 
		 * context has not yet been initialized.
		 */
		getPath: {
			type: String,
			notify: true,
			readOnly: true,
			value: function() {
				return this._getPath();
			}
		}
	},

	_getPath: function() {
		var contextPathInputElement = document.querySelector("#contextPath");
		var newContextPath = null;
		if (contextPathInputElement) {
			newContextPath = contextPathInputElement.getAttribute("value");
		}
		if (newContextPath && newContextPath.length > 0 && newContextPath.slice(newContextPath.length-1, newContextPath.length) == "/") {
			newContextPath = newContextPath.slice(0, newContextPath.length-1);
		}

		return newContextPath;
	}

});