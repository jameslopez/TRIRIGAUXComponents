/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/**
 * `TriBlockNavSelectContainerBehavior` manages the selected navigation item including the initial selection when the navigation items are first rendered in the page.
 *
 * @polymerBehavior
 */
export const TriBlockNavSelectContainerBehavior = {

	properties: {
		/**
		 * Gets or sets the selected navigation item.  The value corresponds to the value of the `id` property, by default,  or the property value of the property specified in `attr-for-selected` property of the navigation item.
		 */
		selected: {
		  type: String,
		  notify: true
		},
		/**
		 * If you want to use a property value that is not from the `id` property for the `selected` property, set this to the name of the property.
		 */
		attrForSelected: {
			type: String,
			value: "id"
		}
	},

	attached: function() {
		this.listen(this, 'triblock-nav-behavior-route-activated', '_onRouteActivated');
	},
	
	detached: function() {
		this.unlisten(this, 'triblock-nav-behavior-route-activated', '_onRouteActivated');
	},

	_onRouteActivated: function(e) {
		var attrSelector = "[triplat-route-id=" + e.detail.triplatRouteId + "]";
		var routeNavEl = dom(this).querySelector(attrSelector);
		if (routeNavEl) {
			var selectAttr = this._computeSelectAttr(routeNavEl, this.attrForSelected);
			if (this.selected !== selectAttr) {
				this.selected = selectAttr;
			}
		}
	},

	/**
	 * Returns the value of the property named in `attrForSelected`.
	 * 
	 * @param {HTMLElement} item The element to retrieve the value of the property from. 
	 * @param {string} attrForSelected The name of the property to retrieve the value from.
	 * @return {string}
	 */
	_computeSelectAttr: function(item, attrForSelected) {
	  return item.getAttribute(attrForSelected);
	},

	/**
	 * Sets a value to the `selected` property if one of the navigation items has `initial-selection` property sets to true.  The value is based from the property value of the property specified in `attr-for-selected`, otherwise the value of the `id` property of the navigation item.
	 * 
	 * @param {Array<HTMLElement>} items Navigation items to check for the `initial-selection` property. 
	 */
	_computeInitialSelection: function(items) {
		items.forEach(function(item) {
		  if (item.initialSelection){
			this.selected = this._computeSelectAttr(item, this.attrForSelected);
		  }
	  }.bind(this));
	}

};