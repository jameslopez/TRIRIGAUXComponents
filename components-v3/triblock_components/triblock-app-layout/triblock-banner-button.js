/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriBlockNavBehavior } from "../triblock-nav-behavior/triblock-nav-behavior.js";

Polymer({

	is: "triblock-banner-button",

	behaviors: [TriBlockNavBehavior],

	properties: {
		/**
		 * Gets or sets the label of the navigation item.
		 */
		label: String,
		/**
		 * Gets or sets the name of the icon of the navigation item.  See the demo pages of `triplat-icon` and `iron-icons` for the list of available icons to use.
		 */
		icon: String,
		/**
		 * Indicates that the banner button is for the Home button.
		 */
		home: {
			type: Boolean,
			value: false
		},
		/**
		 * Indicates that the banner button is for the Back button.
		 */
		back: {
			type: Boolean,
			value: false
		},
	},

	observers: [
		'_handleLabelChanged(label)'
	],

	_handleLabelChanged: function(label) {
		this._refreshTabs();
	},
	
	_refreshTabs: function() {
		/**
		 * Fired when the properties of a navigation item get updated.  The element is passed to the event listener as an item, like `e.detail.item`.
		 *
		 * @event update
		 */
		this.fire("update", {item: this});
	}
});