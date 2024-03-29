/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriPlatRouteContextBehavior } from "./triplat-route-context-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				display: block;
			}
		
		</style>

		<slot></slot>
	`,

    is: "triplat-route-selector",

    /**
	 * Fired before navigating.
	 *
	 * @event triplat-route-selector-before-navigate
	 */

	properties: {

		/**
		 * The name of the currently selected route.
		 */
		selected: {
			type: String,
			notify: true,
			readOnly: true
		},

		_activeRoute: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_activeItem: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_selectionDelegate: {
			type: Object,
			notify: false,
			readOnly: true
		},
		
		/**
		 * When true, no route is initially selected.  A route must be explicitly navigated or marked as `default-route` so that it is selected and rendered.
		 * This property is ignored if there is a route marked as `default-route`.
		 */
		noInitialRoute: {
			type: Boolean,
			value: false
		}

	},

    behaviors: [
		TriPlatRouteContextBehavior
	],

    observers: [
		"_updateRoute(_pathData, _contextInitialized, _selectionDelegate)"
	],

    attached: function() {
		this._set_selectionDelegate(this._findSelectionDelegate());
	},

    detached: function() {
		this._set_activeRoute(null);
		this._set_activeItem(null);
		this._set_selectionDelegate(null);
	},

    select: function() {
		this._updateRoute(this._pathData, this._contextInitialized, this._selectionDelegate);
	},

    _isActiveRoute: function(routeItem) {
		if (!this._isActive()) {
			return false;
		}
		return routeItem == this._activeItem;
	},

    _isActive: function() {
		if (this._isRoot) {
			return true;
		}
		return this._parentContext._isActiveRoute(this._parentRouteContainer);
	},

    _findSelectionDelegate: function() {
		return dom(this).children[0];
	},

    _updateRoute: function(pathData, contextInitialized, selectionDelegate) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!contextInitialized || !selectionDelegate) {
			return;
		}

		if (!this._isActive()) {
			this._clearRoute();
			return;
		}

		var matchedRoute = null;
		var matchedStrength = 0;
		var matchedIndex = -1;
		var matchedDynamicCount = 1000;
		var matchedRouteName = null;
		var matchedItem = null;
		var matchedRoute = null;
		var children = dom(this._selectionDelegate).children;

		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (!child.hasAttribute("route")) {
				continue;
			}
			var routeName = child.getAttribute("route");
			var routePath = child.getAttribute("route-path");
			var routeContext = [];
			if (routePath) {
				routePath.match(/([^\/]+)/g).forEach(function(routeContextPart) {
					routeContext.push(routeContextPart);
				});
			}

			var route = this._getRouteByName(routeName);
			
			if (route == null) {
				continue;
			}

			if (matchedStrength == 0 && route._route.length == 0 && !this.noInitialRoute) {
				// do a special check for a 'root' route.
				matchedIndex = i;
				matchedDynamicCount = 0;
				matchedRouteName = route.name;
				matchedItem = child;
				matchedRoute = route;
			} else {
				var strength = this._getMatchStrength(route._route, pathData.parts, routeContext);
				var dynamicCount = this._getDynaiceCount(route._route);
				if (matchedIndex == -1 && this.noInitialRoute && (strength == 0)) {
					continue;
				}
				
				if (strength > matchedStrength 
						|| (strength == matchedStrength && dynamicCount < matchedDynamicCount)) {
					matchedStrength = strength;
					matchedIndex = i;
					matchedDynamicCount = dynamicCount;
					matchedRouteName = route.name;
					matchedItem = child;
					matchedRoute = route;
				}
			}
		}

		if (matchedIndex == -1) {
			this._selectDefault();
		} else {
			this._selectRoute(matchedIndex, matchedRouteName, matchedItem, matchedRoute);
		}
	},

    _selectDefault: function() {
		var defaultIndex = -1;
		var routePath = null;
		var children = dom(this._selectionDelegate).children;
		var routeName = null;
		for (var i = 0; i < children.length; i++) {
			if (children[i].hasAttribute("default-route")) {
				defaultIndex = i;
				routeElement = children[i];
				routeName = children[i].getAttribute("route");
				routePath = children[i].getAttribute("route-path");
				break;
			}
		}
		
		if (defaultIndex == -1) {
			this._clearRoute();
			return;
		}

		if (!routeName) {
			console.warn("The default route of a triplat-route-selector does not have a route name.");
			return;
		}

		var routeElement = this._getRouteByName(routeName);

		if (routeElement && routePath) {
			routeElement.navigate(routeElement.getParamsFromPath(routePath));
		} else if(routeElement && routeElement.path.indexOf(":") == -1) {
			routeElement.navigate({});
		} else {
			this._selectionDelegate.selected = defaultIndex;
		}
		this._setSelected(routeName);
	},

    _getMatchStrength: function(route, parts, routeContext) {
		var strength = 0;
		for (var i = 0; i < route.length; i++) {
			if (parts.length <= i) {
				return 0;
			}

			if (route[i].type == "dynamic") {
				if (routeContext.length > i) {
					if (parts[i] == routeContext[i]) {
						strength++;
						continue;
					} else {
						return 0;
					}
				} else {
					strength++;
					continue;
				}
			}

			if (route[i].part != parts[i]) {
				return 0;
			}
			strength++;
		}
		return strength;
	},

    _getDynaiceCount: function(route) {
		var dynamicCount = 0;
		route.forEach(function(route) {
			if (route.type == "dynamic") {
				dynamicCount++;
			}
		});
		return dynamicCount;
	},

    _selectRoute: function(routeIndex, routeName, routeItem, route) {
		if (routeItem && this._activeItem && routeItem == this._activeItem) {
			/*
			 * Getting here means that the URL changed, but the selected route did not.
			 * Although, the selected route isn't changing, the paramaters might have, 
			 * so we still need to update the route with new parameters.
			 */
			if (route) {
				// make sure to tell the route not to fire a route-active event
				route._markActive(this._pathData, true);
			}
			return;
		}

		this.fire("triplat-route-selector-before-navigate", {
			currentIndex: this._selectionDelegate.selected,
			nextIndex: routeIndex
		});

		if (routeItem) {
			this.fire("triplat-route-before-navigate-to", {}, {
				bubbles: false,
				cancelable: false,
				node: routeItem
			});
		}

		this._leaveRoute();
		this._selectionDelegate.selected = routeIndex;
		this._setSelected(routeName);
		this._set_activeItem(routeItem);
		this._set_activeRoute(route);
		if (route) {
			route._markActive(this._pathData);
		}
		if (routeItem && routeItem._onNavigateTo) {
			routeItem._onNavigateTo(route.params);
			this.fire("triplat-route-navigate-to", route.params, {
				bubbles: false,
				cancelable: false,
				node: routeItem
			});
		}
		if (routeItem && routeItem.setupDialogPromise) {
			routeItem.setupDialogPromise(routeItem);
		}
	},

    _clearRoute: function() {
		this._leaveRoute();
		// TODO this causes an issue if an neon-animatable-page is used
		// this._selectionDelegate.selected = -1;
		this._setSelected(null);
		this._set_activeItem(null);
		this._set_activeRoute(null);
	},

    _leaveRoute: function() {
		if (this._activeRoute) {
			this._activeRoute._markInactive();
		}
		if (this._activeItem && this._activeItem._onNavigateAway) {
			this._activeItem._onNavigateAway();
			this.fire("triplat-route-navigate-away", {}, {
				bubbles: false,
				cancelable: false,
				node: this._activeItem
			});
		}
		if (this._activeItem && this._activeItem.clearDialogPromise) {
			this._activeItem.clearDialogPromise();
		} 
	}
});