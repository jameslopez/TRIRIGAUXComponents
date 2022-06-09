/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

/**
 * Behavior for components that require the web context ID.
 * 
 * @polymerBehavior
 */
export const TriplatRequiresWebContextIdBehavior = {

	properties: {

		/**
		 * The web context ID for communicating with the server.
		 */
		webContextId: {
			type: String,
			notify: true,
			observer: "_webContextIdChanged"
		},

		/**
		 * Set this property to prevent the web context ID from being looked up with the 
		 * element is attached.
		 */
		preventWebContextIdLookupOnAttach: {
			type: Boolean,
			value: false
		}

	},

	/**
	 * Fired when the webContextId is changed. The detail of the even contains the webContextId.
	 *
	 * @event triplat-web-context-id-changed
	 */

	listeners: {
		"triplat-ds-web-context-id-parent-found": "_foundWebContextIdParent"
	},

	attached: function() {
		if (this.preventWebContextIdLookupOnAttach) {
			return;
		}

		this.lookupWebContextId();
	},

	/**
	 * Looks up the web context ID and set it to the webContextId property.
	 */
	lookupWebContextId: function() {
		this.fire("triplat-ds-web-context-id-search", {sourceElement: this});
	},

	_foundWebContextIdParent: function(e) {
		var parentEl = e.detail;
		parentEl.getWebContextId().then(function(webContextId) {
			this.set("webContextId", webContextId);
		}.bind(this));
	},

	_webContextIdChanged: function(webContextId) {
		this.fire("triplat-web-context-id-changed", webContextId);
	}

};