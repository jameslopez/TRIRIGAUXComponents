/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component to specify conditions to be evaluated for a triplat-query component. 

Additional information including examples can be found on the triplat-query documentation page.

*/
Polymer({

	is: "triplat-query-filter",

	/**
	 * Fired when the filter changes.
	 *
	 * @event triplat-query-filter-change
	 */

	properties: {

		/**
		 * The name of the data source field to be used for this filter.
		 */ 
		name: {
			type: String,
			notify: false,
			readOnly: false
		},
		
		/**
		 * The operator to be used for this comparison. The list of supported values for operator can be found on the triplat-query documentation page.
		 */
		operator: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * The value to which the field will be evaluated. 
		 */
		value: {
			type: Object,
			notify: false,
			readOnly: false
		},

		/**
		 * If specified and when the value is empty, this entire filter will be ignored.
		 */
		ignoreIfBlank: {
			type: Boolean,
			notify: false,
			readOnly: false,
			value: false
		},

		/**
		 * If specified, then this filter will be required.
		 */
		required: {
			type: Boolean,
			notify: false,
			readOnly: false,
			value: false
		},

		/**
		 * An internal representation of the filter.
		 */
		filter: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_filterChanged"
		},

		/**
		 * If specified, the client query will attempt to convert the operands to the specified type before applying the filter.
		 * The supported types are:
		 *  - DATE
		 *  - DATE_TIME
		 *  - STRING_WITH_ID
		 */
		type: {
			type: String,
			value: ""
		}

	},

	observers: [
		"_init(name, operator, value, ignoreIfBlank, type)"
	],

	_init: function(name, operator, value, ignoreIfBlank, type) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setFilter({name: name, operator: operator, value: value, ignoreIfBlank: ignoreIfBlank, type: type});
	},

	_filterChanged: function(filter) {
		this.fire("triplat-query-filter-change", filter);
	}

});