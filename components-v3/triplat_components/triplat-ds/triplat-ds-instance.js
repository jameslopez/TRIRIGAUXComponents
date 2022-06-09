/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

Polymer({

	is: "triplat-ds-instance",

	/**
	 * Fired when the instance Id changes.
	 *
	 * @event triplat-ds-instance-changed
	 */

	properties: {

		instanceId: {
			type: Number,
			notify: false,
			readOnly: false,
			observer: "_handleInstanceIdChanged"
		}

	},

	_handleInstanceIdChanged: function(instanceId) {
		this.fire("triplat-ds-instance-changed", {instanceId: instanceId});
	},

});