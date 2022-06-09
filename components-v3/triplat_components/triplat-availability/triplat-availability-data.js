/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "./triplat-availability-data-context.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
The `triplat-availability-data` provides data settings and must be used as an inner element of the `triplat-availability` component. 

> **Caution: This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.**

Additional information including examples can be found on the `triplat-availability` documentation page.
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<slot name="availability-data-context"></slot>
	`,

    is: "triplat-availability-data",

    /**
	* Fired when the data properties change.
	*
	* @event triplat-availability-data-change
  */

	listeners: {
	  'triplat-availability-data-context-change': '_contextChanged'
	},

    properties: {

		/**
		 * The name of the data source from which the
		 * resources are retrieved.
		 */ 
		datasource: {
			type: String,
			notify: false,
			readOnly: false
		},
		
		/**
		* Whether the unavailable time for each resource is
		* retrieved.
		*/
		includeUnavailable: {
			type: Boolean,
			value: false
		},

		/**
		* The calendar set name to which the resources
		* are associated.
		*/
		calendarSetName:{
			type: String
		},

		/**
		 * An internal representation of the data.
		 */
		_data: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_dataChanged"
		},

		_contexts: {
			type: Array,
			notify: false,
			readOnly: false,
			value: []
		},

		_contextChildren: {
			type: Number,
			readOnly: true
		}
	},

    observers: [
		'_init(datasource, includeUnavailable, calendarSetName, _contexts.splices, _contextChildren)'
	],

    attached: function(){
		var contextChildren = this.queryAllEffectiveChildren('triplat-availability-data-context').length;
		this._set_contextChildren(contextChildren);
	},

    _init: function(datasource, includeUnavailable, calendarSetName, splices, contextChildren) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(!(this._contexts.length == this._contextChildren)){
			return;
		}

		this._set_data({datasource: datasource, includeUnavailable: includeUnavailable, calendarSetName: calendarSetName,
			contexts: this._contexts});
	},

    _dataChanged: function(data) {
		this.fire("triplat-availability-data-change", data);
	},

    _contextChanged: function(e){
		this.push("_contexts", e.detail);
	}
});