/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { TriplatDsChangeBehavior } from "../triplat-ds-change-behavior/triplat-ds-change-behavior.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

export const TriplatQueryPageBehaviorImpl = {


	/**
	 * Fired when the page changes.
	 *
	 * @event triplat-query-page-change
	 */

	properties: {

		from: {
			type: Number,
			notify: true,
			readOnly: false
		},

		size: {
			type: Number,
			notify: false,
			readOnly: false
		},

		page: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_pageChanged"
		}

	},

	observers: [
		"_init(from, size)"
	],

	_init: function(from, size) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setPage({from: from, size: size});
	},

	_pageChanged: function(page) {
		this.fire("triplat-query-page-change", page);
	},

	reset: function() {

	}

};

export const TriplatQueryPageBehavior = [
	TriplatQueryPageBehaviorImpl,
	TriplatDsChangeBehavior
];