/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { getRouteById } from "../triplat-routing/triplat-route-context-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/**
 * `TriBlockNavBehavior` handles navigating to pages and invoking actions depending on the populated properties.  It can navigate to both route and iron pages and also invoke actions on both tap and event handlers at the same time.  If all properties are specified with values the order of execution are as follows:  
 *	<ul>
 * 		<li>Fire `navigate` event</li>
 * 		<li>Navigate to a route page</li>
 * 		<li>Navigate to an iron page</li>
 * 		<li>Invoke tap handler</li>
 *	</ul>
 *
 *
 * @polymerBehavior
 */
export const TriBlockNavBehavior = {

	properties: {
		/**
		 * Value of the `id` property of the `triplat-route` to be navigated.
		 */
		triplatRouteId: String,
		/**
		 * URL parameters when navigating to a `triplat-route`.
		 */
		triplatRouteParams: Object,
		/**
		 * Value of the `id` property of the `iron-pages` to be navigated.
		 */
		ironPagesId: String,
		/**
		 * Identifier of the iron page inside `iron-pages` to be navigated.  Value can either be from the `id` property or from the property specified in the `attr-for-selected` property of `iron-pages`. 
		 */
		ironPageId: String,
		/**
		 * Name of the action or function to call when the navigation is tapped.
		 */
		tapHandler: String,
	},

	attached: function() {
		if (this._isTriplatRoute()) {
			var routeEl = this._getTriplatRouteElement();
			if (routeEl) {
				this.listen(routeEl, 'route-active', '_onRouteActive');
			}
		}
	},
	
	detached: function() {
		if (this._isTriplatRoute()) {
			var routeEl = this._getTriplatRouteElement();
			if (routeEl) {
				this.unlisten(routeEl, 'route-active', '_onRouteActive');
			}
		}
	},
	
	_onRouteActive: function(e) {
		if (e.detail.active) {
			this.fire("triblock-nav-behavior-route-activated", {triplatRouteId: this.triplatRouteId});
		}
	},

	/**
	 * Navigates to route and/or iron pages and/or invokes an action based on the tap and event handlers.
	 */
	_navigate: function() {
		/**
		 * Fired when `navigate` is called.  It is fired before pages are routed or a tap handler is invoked.  The element is passed to the event listener as an item, like `e.detail.item`.  
		 *
		 * @event navigate
		 */
		this.fire("navigate", {item: this});
		
		// navigate to triplat route page if needed
		this._navigateRoutePage();
	
		// navigate to iron page if needed
		this._navigateIronPage();
	
		// navigate to tap handler if needed
		this._executeTapHandler();
	},

	_isTriplatRoute: function() {
		return this.triplatRouteId && this.triplatRouteId != "";
	},
	
	_getTriplatRouteElement: function() {
		if (this._isTriplatRoute()) {
			return getRouteById(this.triplatRouteId);
		}
		return null;
	},
	
	_navigateRoutePage: function() {
		if (this._isTriplatRoute()) {
			var triplatRoute = this._getTriplatRouteElement();
			if (triplatRoute) {
				if (!triplatRoute.active) {
					try {
						if (triplatRoute._contextInitialized) {
							triplatRoute.navigate(this.triplatRouteParams);
						}
					} catch (e) {
						console.error("An error occurred while navigating to route page: " + this.triplatRouteId + " Error: " + e.message);
					}
				}
			} else {
			console.warn("Could not find a <triplat-route> element with an `id` value of " + this.triplatRouteId + ".");
			}
		}
	},

	_navigateIronPage: function() {
		if (this.ironPagesId && this.ironPagesId != "" && this.ironPageId && this.ironPageId != "") {
			var ironPagesSelector = "iron-pages#" + this.ironPagesId;
			var ironPagesContainer = null;
			if (this.domHost) {
					ironPagesContainer = dom(this.domHost.root).querySelector(ironPagesSelector);
			} else {
					ironPagesContainer = document.querySelector(ironPagesSelector);
			}
			if (ironPagesContainer) {
				if (!ironPagesContainer.attrForSelected) {
					ironPagesContainer.attrForSelected = "id";
				}
			ironPagesContainer.selected = this.ironPageId;
			} else {
			console.warn("Could not find a <iron-pages> element with an `id` value of " + this.ironPagesId + "."); 
			}
		}
	},

	_executeTapHandler: function() {
		if (this.tapHandler && this.tapHandler != "") {
			this.domHost[this.tapHandler](this);
		}
	},
};