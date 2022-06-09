/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component to specify how to sort the data for a triplat-query component. 

Additional information including examples can be found on the triplat-query documentation page.
*/
Polymer({

	is: "triplat-query-sort",

	/**
	 * Fired when the sort changes.
	 *
	 * @event triplat-query-sort-changed
	 */

	properties: {

		/**
		 * The name of the data source field to be used for this sort.
		 */
		name: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * If specified, the sort order will be descending. Otherwise it will be ascending.
		 */
		desc: {
			type: Boolean,
			notify: false,
			readOnly: false,
			value: false
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
		},

		/** 
		 * A representation of 'name' and 'desc' in a single object. 
		 */
		sort: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_sortChanged"
		}

	},

	observers: [
		"_initBoth(name, desc, type)"
	],

	_initBoth: function(name, desc, type) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setSort({name: name, desc: desc, type: type});
	},

	_sortChanged: function(sort) {
		this.fire("triplat-query-sort-changed", sort);
	}

});