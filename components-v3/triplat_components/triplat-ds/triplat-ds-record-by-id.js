/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

Polymer({

	is: "triplat-ds-record-by-id",

	properties: {

		recordId: {
			type: Number,
			observer: "_initRecord"
		},

		data: {
			type: Array,
			notify: true,
			readOnly: false,
			observer: "_initRecord"
		},

		record: {
			type: Object,
			notify: true,
			readOnly: true
		}

	},

	_initRecord: function() {
		if (this.recordId == null 
				|| this.recordId == undefined 
				|| this.data == null 
				|| this.data == undefined) {
			this._setRecord(null);
			return;
		}

		var foundRecord = null;
		for (var i = 0; i < this.data.length; i++) {
			var record = this.data[i];
			if (this.recordId == record._id) {
				foundRecord = record;
				break;
			}
		}
		this._setRecord(foundRecord);
	}

});