/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriPlatRouteContextBehavior } from "./triplat-route-context-behavior.js";
import "./triplat-route-selector.js";
import { TriPlatChangeTrackerBehavior } from "../triplat-change-tracker/triplat-change-tracker-behavior.js";
import { Base } from "../@polymer/polymer/polymer-legacy.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
@demo demo/index.html
*/
Polymer({

	is: "triplat-route",

	properties: {

		/**
		 * The name of the route.
		 */
		name: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * The path of the route.
		 */
		path: {
			type: String,
			notify: false,
			readOnly: false
		},

		/**
		 * The params of an active route.
		 */
		params: {
			type: Object,
			notify: true,
			readOnly: true
		},

		/**
		 * Whether the route is active or not.
		 */
		active: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false
		},

		greedy: {
			type: Boolean,
			notify: false,
			readOnly: false,
			value: false
		},

		_route: {
			type: Array,
			notify: true,
			readOnly: true
		},

		_delegateRoute: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_delegateRouteActiveHandler: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_routeInitialized: {
			type: Boolean,
			notify: true,
			readOnly: true
		}

	},

	get _isPathDefined() {
		return this.path;
	},

	get _isPassiveRoute() {
		return !this._isPathDefined;
	},

	behaviors: [
		TriPlatRouteContextBehavior,
		TriPlatChangeTrackerBehavior
	],

	observers: [
		"_handlePathDataChanged(_pathData, _route)"
	],

	attached: function() {
		if (this._isPathDefined) {
			this._registerRoute();
		}
		this._handleInit();
	},

	detached: function() {
		if (this._isPathDefined) {
			this._unregisterRoute();
		}
		if (this._delegateRoute && this._delegateRouteActiveHandler) {
			this._delegateRoute.removeEventListener("route-active", this._delegateRouteActiveHandler);
		}
		this._set_delegateRoute(null);
	},

	_startNavigate: function(params, replaceUrl) {
		var path = this._resolvePath(params);
		if (!path || path.length == 0) {
			path = "/";
		}
		this._navigate(path, replaceUrl);
	},
	
	navigate: function(params, replaceUrl) {
		if (this._isPassiveRoute) {
			this._delegateRoute.navigate(params, replaceUrl);
			return;
		}
		if (this._isDialogPromiseRegister && this._isDialogPromiseRegister()) {
			if (this._isUnsaveCheckEnable && 
				this._isUnsaveCheckEnable() &&
				this._isPageStatusDirty()) {
			
				this.getDialogPromise().then(function() {
					//console.log("user confirm to discard the changes");
					this._resetPageStatus();
					this._startNavigate(params);
				}.bind(this), function() {
					//console.log("user cancel navigation");
				});
			} else {
				this._startNavigate(params);
			}
		} else {
			if (this.unsaveCheck) {
				if (!this.unsaveCheck()) return;
			}
			this._startNavigate(params, replaceUrl);
		}
	},

	_resolvePath: function(params) {
		if (!params) {
			params = {};
		}
		var computedParams = this._getParamsFromPath(this._pathData);
		Base.mixin(computedParams, params);
		var path = "";
		this._route.forEach(function(route) {
			path += "/";
			if (route.type == "dynamic") {
				path += computedParams[route.name];
			} else {
				path += route.part;
			}
		});
		return path;
	},

	getParamsFromPath: function(path) {
		var parts = [];
		path.match(/([^\/]+)/g).forEach(function(part) {
			parts.push(part);
		});

		var params = {};
		for (var i = 0; i < this.route.length; i++) {
			if (this.route[i].type == "dynamic") {
				params[this.route[i].name] = parts[i];
			}
		}
		
		return params;
	},

	_handleInit: function() {
		if (this._isPassiveRoute) {
			var delegateRoute = this._getRouteByName(this.name);
			if (!delegateRoute) {
				console.warn("Cannot initialize passive route as no route found with name. " + 
					"[routeName=" + this.name + "]");
				return;
			}
			var delegateRouteActiveHandler = this._handleDelegateRouteActive.bind(this);
			if (delegateRoute.active) {
				this._setParams(delegateRoute.params);
				this._setActive(true);
				this.fire("route-active", {
					active: true,
					params: this.params
				});
			}
			delegateRoute.addEventListener("route-active", delegateRouteActiveHandler);
			this._set_delegateRouteActiveHandler(delegateRouteActiveHandler);
			this._set_delegateRoute(delegateRoute);
			this._set_routeInitialized(true);
			return;
		}

		var fullPath = this._calculatePath();

		var route = [];
		if (fullPath == "/") {
			// this is a 'root' route
			this._set_route(route);
			return;
		}
		fullPath.match(/([^\/]+)/g).forEach(function(match) {
			if (match.search(/\:.*$/) != -1) {
				var name = match.match(/([^:]+)/g)[0];
				route.push({type: "dynamic", name: name});
			} else {
				route.push({type: "static", part: match});
			}
		});
		
		this._set_route(route);
		this._set_routeInitialized(true);
	},

	_calculatePath: function() {
		if (this._isPassiveRoute) {
			console.warn("_calculatePath should not be called on a passive route.");
			return;
		}
		
		if (this._isRoot) {
			return this.path;
		}

		var parentRouteName = this._parentRouteContainer.getAttribute("route");
		var parentRouteElement = this._getRouteByName(parentRouteName);
		if (!parentRouteElement) {
			console.warn("Cannot calculate route path as the parent route could not be found. " + 
				"[routeName=" + parentRouteName + "]");
			return;
		}

		return parentRouteElement._calculatePath() + this.path;
	},

	// called by plat-route-selector
	_markActive: function(pathData, doNotFireEvent) {
		this._setParams(this._getParamsFromPath(pathData));
		this._setActive(true);

		if (!doNotFireEvent) {
			this.fire("route-active", {
				active: true,
				params: this.params
			});
		}
	},

	// called by plat-route-selector
	_markInactive: function() {
		this._setParams({});
		this._setActive(false);
		this.fire("route-active", {
			active: false,
			params: this.params
		});
	},

	_getParamsFromPath: function(pathData) {
		var params = {};
		for (var i = 0; i < this._route.length; i++) {
			if (this._route[i].type != "dynamic") {
				continue;
			}
			params[this._route[i].name] = pathData.parts[i];
		}
		return params;
	},

	_isActive: function() {
		if (this._isRoot) {
			return true;
		}
		return this._parentContext._isActiveRoute(this._parentRouteContainer);
	},

	_handleDelegateRouteActive: function(e) {
		this._setParams(e.detail.params);
		this._setActive(e.detail.active);
		this.fire("route-active", e.detail);
	},

	_handlePathDataChanged: function(pathData) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!this.greedy) {
			return;
		}

		this._setParams(this._getParamsFromPath(pathData));
	}

});