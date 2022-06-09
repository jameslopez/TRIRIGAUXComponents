/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
The `triplat-availability-layout` provides layout settings and must be used as an inner element of the `triplat-availability` component. 

> **Caution: This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.**

Additional information including examples can be found on the `triplat-availability` documentation page.

*/
Polymer({

	is: "triplat-availability-layout",

	/**
	 * Fired when the layout properties change.
	 *
	 * @event triplat-availability-layout-change
	 */

	properties: {

		/**
		 * The maximum view mode available for the availability component.
		 */ 
		maxViewMode: {
			type: String,
			notify: false,
			readOnly: false
		},
		
		/**
		 * The default view mode for the availability component.
		 */ 
		defaultViewMode: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * Whether the single selection is enabled.
		 * Because the multiple selection is not yet supported, the default
		 * value of this property is true.
		 */
		singleSelect: {
			type: Boolean,
			notify: false,
			readOnly: false,
			value: true // Only single selection for this release
		},

		/**
		 * The columns that are displayed for each resource in the availability
		 * component. It is an object that must be formatted as follows: <br/>
		 * 
		 * var columns = {
		 *		room: "Room Name",
		 *		floor: "Floor number",
		 *		capacity: "Max capacity"
		 * };
		 *
		 * <b>room</b>, <b>floor</b> and <b>capacity</b> are 
		 * the data source fields.
		 * <b>"Room Name"</b>, <b>"Floor number"</b> and <b>"Max capacity"</b> 
		 * represent how these fields (columns) will be displayed.
		 */
		columns: {
			type: Object,
			notify: false,
			readOnly: false
		},

		/**
		 * Whether there is only the Home button in the toolbar.
		 */
		homeOnlyToolbar: {
			type: Boolean,
			value: false
		},

		/**
		 * An internal representation of the view.
		 */
		_layout: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_layoutChanged"
		},

	},

	observers: [
		"_init(maxViewMode, defaultViewMode, singleSelect, columns, homeOnlyToolbar)"
	],

	_init: function(maxViewMode, defaultViewMode, singleSelect, columns, homeOnlyToolbar) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._set_layout({maxViewMode: maxViewMode, 
			defaultViewMode: defaultViewMode, 
			singleSelect: singleSelect, columns: columns,
			homeOnlyToolbar: homeOnlyToolbar});
	},

	_layoutChanged: function(layout) {
		this.fire("triplat-availability-layout-change", layout);
	}

});