/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
var contextRegistry = [];
var routesByName = {};
var routesById = {};
var pathData;

var handlePathChange = function() {
	var path = window.location.hash;
	pathData = {};
	if (path.search(/#\!\/.*$/) == -1) {
		pathData.parts = [];
		pathData.path = "/";
	} else {
		pathData.path = path.substr(2);
		pathData.parts = [];
		var matches = pathData.path.match(/([^\/]+)/g);
		if (matches) {
			matches.forEach(function(part) {
				pathData.parts.push(part);
			});
		}
	}

	contextRegistry.forEach(function(context) {
		context._onPathChange(pathData);
	});
};

window.addEventListener("hashchange", function(e) {
	handlePathChange();
});

handlePathChange();

export function getRouteByName(routeName) {
	return routesByName[routeName];
};

export function getRouteById(routeId) {
	return routesById[routeId];
};

export const TriPlatRouteContextBehavior = {

	properties: {

		_parentContext: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_parentRouteContainer: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_contextInitialized: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false
		},

		_isInitializedPromise: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_isInitializedPromiseResolve: {
			type: Function,
			notify: false,
			readOnly: true
		},

		_pathData: {
			type: Object,
			notify: true,
			readOnly: true
		}

	},

	get _isContained() {
		return this._parentContext && this._parentRouteContainer;
	},

	get _isRoot() {
		return !this._isContained;
	},

	attached: function() {
		this._set_isInitializedPromise(new Promise(function(resolve){
			this._set_isInitializedPromiseResolve(resolve);
		}.bind(this)));

		var node = this;
		var routeName = null;
		var routeContextSelector = null;
		var routeContextContainer = null;
		while (node) {
			node = dom(node).parentNode;
			if (node && node.nodeType !== Node.ELEMENT_NODE) {
				node = node.host;
			}

			if (node && node.hasAttribute("route")) {
				routeContextContainer = node;
				routeName = node.getAttribute("route");
			}

			if (node && node.tagName == "TRIPLAT-ROUTE-SELECTOR") {
				routeContextSelector = node;
				break;
			}
		}

		if (routeContextSelector && routeContextContainer) {
			// we found a parent route context
			this._set_parentContext(routeContextSelector);
			this._set_parentRouteContainer(routeContextContainer);
		}

		this._initializeContext();
	},

	detached: function() {
		this._unregisterContext();
	},

	_initializeContext: function() {
		if (this._isRoot) {
			this._doSetInitialized();
		} else {
			this._parentContext._isInitialzied().then(this._doSetInitialized.bind(this));
		}
	},

	_doSetInitialized: function() {
		this._registerContext();
		this._set_contextInitialized(true);
		this._onPathChange(pathData);
		this._isInitializedPromiseResolve(true);
	},

	_isInitialzied: function() {
		return this._isInitializedPromise;
	},

	_registerContext: function() {
		contextRegistry.push(this);
	},

	_unregisterContext: function() {
		var index = contextRegistry.indexOf(this);
		if (index < 0) {
			return;
		}
		contextRegistry.splice(index, 1);
	},

	_onPathChange: function(pathData) {
		this._set_pathData(pathData);
	},

	_registerRoute: function() {
		if (this.name in routesByName) {
			console.warn("A duplicate route has been defined. [routeName=" + this.name + "]");
			return;
		}
		routesByName[this.name] = this;
		if (this.id && !(this.id in routesById)) {
			routesById[this.id] = this;
		}
	},

	_unregisterRoute: function() {
		delete routesByName[this.name];
	},

	_getRouteByName: function(routeName) {
		return routesByName[routeName];
	},

	_navigate: function(path, replaceUrl) {
		if (replaceUrl && history.replaceState) {
			history.replaceState({}, "", window.location.pathname + "#!" + path);
			handlePathChange();
		} else {
			window.location.hash = "!" + path;
		}
	}

};