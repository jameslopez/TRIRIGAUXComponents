/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
The `triplat-availability-data-context` provides context settings and must be used as an inner element of the `triplat-availability-data` component. 

> **Caution: This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.**

Additional information including examples can be found on the `triplat-availability` documentation page.

*/
Polymer({

	is: "triplat-availability-data-context",

	/**
	* Fired when the data context properties change.
	*
	* @event triplat-availability-data-context-change
  */

	properties: {

		/**
		 * The name of the context data source.
		 */
		name: {
			type: String,
			notify: false,
			readOnly: false
		},
		
		/**
		 * The context ID.
		 */
		contextId: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * An internal representation of the context.
		 */
		_context: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_contextChanged"
		},

	},

	observers: [
		"_init(name, contextId)"
	],

	_init: function(name, contextId) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(!contextId){
			return
		}

		this._set_context({name: name, contextId: contextId});
	},

	_contextChanged: function(context) {
		this.fire("triplat-availability-data-context-change", context);
	}

});