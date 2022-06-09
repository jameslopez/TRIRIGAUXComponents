/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({

	is: "triplat-ds-context",

	/**
	 * Fired when the context changes.
	 *
	 * @event triplat-ds-context-changed
	 */

	properties: {

		/**
		 * The data source name. 
		 */
		name: {
			type: String
		},

		/**
		 * An object that holds a context ID or an array of context IDs. Use an array of context IDs only with the parent data source.
		 */
		contextId: {
			type: Object
		},

		_index: {
			type: Number
		}

	},

	observers: [
		"_initIndex(_index)",
		"_initContextId(contextId.*)"
	],

	_initIndex: function() {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (this.contextId != undefined && this.contextId != null) {
			this.fire("triplat-ds-context-changed");
		}
	},

	_initContextId: function() {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (this._index != undefined && this._index != null) {
			this.fire("triplat-ds-context-changed");
		}
	}

});