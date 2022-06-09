/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriplatQueryPageBehaviorImpl, TriplatQueryPageBehavior } from "./triplat-query-page-behavior.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component to specify criteria for retrieving a resource calendar. 

When this component is specified, server-side filtering will be used. 
When this component is specified, the triplat-ds 'data' will be an array of calendar events.
This plugin must be used with data sources of type RESOURCE_CALENDAR to retrieve calendar events for resources.

	<triplat-ds id="myResourceCalendarSpace" 
				name="myResourceCalendarSpace" 
				data="{{resourceCalendarSpace}}">
		<triplat-ds-context name="spaceDs" 
							context-id="{{space._id}}">
		</triplat-ds-context>
		<triplat-query id="myResourceCalendarQuerySpace">
			<triplat-query-resource-calendar
				start-date="{{startDateSpace}}"
				end-date="{{endDateSpace}}">
			</triplat-query-resource-calendar>
		</triplat-query>
	</triplat-ds>

There is a triplat-query plugin which contains this plugin. 
In the above example, the name of the data source, myResourceCalendarSpace, is a data source whose type is RESOURCE_CALENDAR. 
Because triplat-ds-context is specified, we do not need to specify the id property in triplat-query-resource-calendar. 
The value needed for context-id will depend on the Calendar Set and the filter criteria specified in its queries. 

*/
Polymer({

	is: "triplat-query-resource-calendar",

	/**
	 * Fired after the availability object changes.
	 *
	 * @event triplat-query-resource-calendar-changed
	 */

	properties: {

		/**
		 * The start date for the range that you want to search. This must be in ISO format.  
		 */
		startDate: {
			type: String,
			observer: "_startDateChanged",
			required: true
		},

		/**
		 * The end date for the range that you want to search. This must be in ISO format.
		 */
		endDate: {
			type: String,
			observer: "_endDateChanged",
			required: true
		},

		/**
		  * The resource identifier of the calendar you want to query. If not specified, then the context-id will be used.
		  */ 
		id: {
			type: Number,
			observer: "_idChanged"
		},

		/**
		  * The calendar set name that you want to be used. If not specified, then the calendar set name specified in the 
		  * Query Name field of that data source model will be used.
		  */ 
		name: {
			type: String,
			observer: "_nameChanged"
		},

		/** 
		 * A representation of 'startDate', 'endDate' , 'id' and 'name' in a single object. 
		 */
		availability: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_availabilityChanged"
		}


	},

	observers: [
		"_initAll(startDate, endDate, id, name)"
	],

	_initAll: function(startDate, endDate, id, name) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setAvailability({startDate: startDate, endDate: endDate, id: id, name: name});
	},

	_availabilityChanged: function(availability) {
		this.debounce("availabilityChanged",  function() {
			this.fire("triplat-query-resource-calendar-changed", availability);
		});
	},

	_startDateChanged: function(e) {
		this._setAvailability({startDate: this.startDate, endDate: this.endDate, id: this.id, name: this.name});
	},

	_endDateChanged: function(e) {
		this._setAvailability({startDate: this.startDate, endDate: this.endDate, id: this.id, name: this.name});
	},

	_idChanged: function(e) {
		this._setAvailability({startDate: this.startDate, endDate: this.endDate, id: this.id, name: this.name});
	},

	_nameChanged: function(e) {
		this._setAvailability({startDate: this.startDate, endDate: this.endDate, id: this.id, name: this.name});
	}


});