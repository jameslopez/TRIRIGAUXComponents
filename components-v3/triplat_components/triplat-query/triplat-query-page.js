/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriplatQueryPageBehaviorImpl, TriplatQueryPageBehavior } from "./triplat-query-page-behavior.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component to specify that the data should be retrieved from the server by using traditional pagination for a triplat-query component. 
Filtering and sorting will be done on the server.

Additional information including examples can be found on the triplat-query documentation page.
*/
Polymer({

	is: "triplat-query-page",

	behaviors: [
		TriplatQueryPageBehavior
	],

	properties: {

		/**
		 * The number of the current page retrieved from the server. The methods reset, prev, and next can be used to change this.
		 */
		currentPage: {
			type: Number,
			notify: true,
			readOnly: false,
			value: 1
		},

		/**
		 * The total number of pages available from the server.
		 */
		totalPages: {
			type: Number,
			notify: true,
			readOnly: true
		},

		/**
		  * The total number of records available from the server.
		  */ 
		totalSize: {
			type: Number,
			notify: true,
			readOnly: true
		},

		/**
		 * The number of records that you want to represent a page.
		 */
		size: {
			type: Number
		}

	},

	observers: [
		"_totalSizeChanged(totalSize, size)",
		"_currentPageChanged(currentPage, size)"
	],

	listeners: {
		"triplat-ds-change": "_dsChanged"
	},

	_totalSizeChanged: function(totalSize, size) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setTotalPages(Math.max(Math.ceil(totalSize / size), 1));
	},

	_currentPageChanged: function(currentPage, size) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (this._ignoreCurrentPageChanged) {
			return;
		}

		if (currentPage < 1) {
			this.set("currentPage", 1);
			return;
		}

		if (this.totalPages != undefined && this.totalPages != null && currentPage > this.totalPages) {
			this.set("currentPage", this.totalPages);
			return;
		}

		this.set("from", (currentPage - 1) * size);
	},

	_dsChanged: function(e) {
		this._setTotalSize(e.detail.totalSize);
	},

	/**
	 * Resets the current page to one.
	 */
	reset: function() {
		this.set("currentPage", 1);
	},

	/**
	 * Retrieves the next page of records.
	 */
	next: function() {
		this.set("currentPage", this.currentPage + 1);
	},

	/**
	 * Retrieves the previous page of records.
	 */
	prev: function() {
		this.set("currentPage", this.currentPage - 1);
	}

});