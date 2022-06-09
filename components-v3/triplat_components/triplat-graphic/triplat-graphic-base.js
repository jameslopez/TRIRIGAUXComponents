/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../tricore-url/tricore-url.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../@polymer/iron-ajax/iron-request.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import { IronResizableBehavior } from "../@polymer/iron-resizable-behavior/iron-resizable-behavior.js";
import "./triplat-graphic-pin-classes.js";
import { TriPlatGraphicUtilitiesBehavior } from "./triplat-graphic-utilities-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({
    _template: html`
		<style include="triplat-graphic-pin-classes tristyles-theme">

			:host {
				display: block;
				height: 100%;
				@apply --layout-flex;
				@apply --layout;
				@apply --layout-vertical;
				position: relative;
				overflow: hidden;
			}
			#svgContainer {
				@apply --layout-flex;
				@apply --layout;
				@apply --layout-vertical;
				height: inherit; /* Set the height to the triplat-graphic-base height. 
								  * It solves a issue in EDGE when the svgContainer overflows the triplat-graphic-base
								  */
			}

			svg {
				@apply --layout-flex;
				height: 100%;
				width: 100%;
				overflow: hidden;
				fill-rule: evenodd;
			}

			div {
				-webkit-tap-highlight-color: rgba(0,0,0,0);
			}
			
			svg .tri-attached.selectable {
				@apply --triplat-graphic-base-selectable;
			}
			svg .tri-interactive.selectable:not(.selected) {
				@apply --triplat-graphic-base-interactive-selectable;
			}
			svg .tri-attached.selectable.selected {
				@apply --triplat-graphic-base-selected;
			}
			svg .tri-interactive.selectable.selected {
				@apply --triplat-graphic-base-interactive-selected;
			}
			svg .tri-attached:not(.selectable){
				@apply --triplat-graphic-base-non-selectable;
			}
			svg .tri-attached.tri-highlight-1 {
				@apply --triplat-graphic-base-highlight-1;
			}
			svg .tri-attached.tri-highlight-2 {
				@apply --triplat-graphic-base-highlight-2;
			}
			svg .tri-attached.tri-highlight-3 {
				@apply --triplat-graphic-base-highlight-3;
			}
			svg .tri-attached.tri-highlight-4 {
				@apply --triplat-graphic-base-highlight-4;
			}
			svg .tri-attached.tri-highlight-5 {
				@apply --triplat-graphic-base-highlight-5;
			}
			svg .tri-attached.tri-highlight-group-1 {
				@apply --triplat-graphic-base-highlight-group-1;
			}
			svg .tri-attached.tri-highlight-group-2 {
				@apply --triplat-graphic-base-highlight-group-2;
			}
			svg .tri-attached.tri-highlight-group-3 {
				@apply --triplat-graphic-base-highlight-group-3;
			}
			svg .tri-attached.tri-highlight-group-4 {
				@apply --triplat-graphic-base-highlight-group-4;
			}
			svg .tri-attached.tri-highlight-group-5 {
				@apply --triplat-graphic-base-highlight-group-5;
			}
			svg .tri-interactive.tri-highlight-1 {
				@apply --triplat-graphic-base-highlight-1;
			}
			svg .tri-interactive.tri-highlight-2 {
				@apply --triplat-graphic-base-highlight-2;
			}
			svg .tri-interactive.tri-highlight-3 {
				@apply --triplat-graphic-base-highlight-3;
			}
			svg .tri-interactive.tri-highlight-4 {
				@apply --triplat-graphic-base-highlight-4;
			}
			svg .tri-interactive.tri-highlight-5 {
				@apply --triplat-graphic-base-highlight-5;
			}
			svg .tri-interactive.tri-highlight-group-1 {
				@apply --triplat-graphic-base-highlight-group-1;
			}
			svg .tri-interactive.tri-highlight-group-2 {
				@apply --triplat-graphic-base-highlight-group-2;
			}
			svg .tri-interactive.tri-highlight-group-3 {
				@apply --triplat-graphic-base-highlight-group-3;
			}
			svg .tri-interactive.tri-highlight-group-4 {
				@apply --triplat-graphic-base-highlight-group-4;
			}
			svg .tri-interactive.tri-highlight-group-5 {
				@apply --triplat-graphic-base-highlight-group-5;
			}
			svg .tri-interactive.drop-enter {
				@apply --triplat-graphic-base-interactive-drop-enter;
			}
			svg .tri-interactive.drop-done {
				@apply --triplat-graphic-base-interactive-drop-done;
			}
			
		</style>

		<tricore-url raw-url="{{_computeGetSvgUrl(drawingId)}}" bind-url="{{_svgUrl}}"></tricore-url>
		<iron-ajax id="getSvgAjax" url="{{_svgUrl}}" handle-as="text" on-response="_handleGetDrawingSvgResponse"></iron-ajax>
		<tricore-url raw-url="[[_computeGetCenterPointsUrl(drawingId)]]" bind-url="{{_centerPointsUrl}}"></tricore-url>
		<div id="svgContainer" on-tap="_svgTapped"></div>
	`,

    is: "triplat-graphic-base",

    behaviors: [
		IronResizableBehavior,
		TriPlatGraphicUtilitiesBehavior
	],

    properties: {

		drawingId: {
			type: Number,
			notify: false,
			readOnly: false,
			observer: "_handleDrawingIdChange"
		},

		recordId: {
			type: Number,
			notify: false,
			readOnly: false,
			observer: "_handleRecordIdChange"
		},

		svgLoaded: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false,
			observer: "_handleSvgLoadedChanged"
		},

		svgElement: {
			type: Object,
			notify: true,
			readOnly: true
		},

		hasGraphic: {
			type: Boolean,
			readOnly: true,
			notify: true,
			value: false
		},

		units: {
			type: String,
			notify: true,
			readOnly: true
		},

		unitScaleFactor: {
			type: Number,
			notify: true,
			readOnly: true
		},

		/**
		 * Aria-label value for the svg.
		 */
		svgAriaLabel: {
			type: String,
			value: ""
		},

		svgElements: {
			type: Array,
			readOnly: true,
		},

		attachedElementsByRecordId: {
			type: Object,
			notify: true,
			readOnly: true
		},

		interactiveElementsByRecordId: {
			type: Object,
			notify: true,
			readOnly: true
		},

		drawingIdLoading: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false,
		},

		loading: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false,
			computed: "_computeLoading(drawingIdLoading, _svgLoading)"
		},

		_centerPointsByRecordId: {
			type: Object,
			readOnly: true
		},

		_viewPort: {
			type: Object,
			notify: true,
			readOnly: true
		},

		_calculatedWidth: {
			type: Number,
			notify: false,
			readOnly: true
		},

		_calculatedHeight: {
			type: Number,
			notify: false,
			readOnly: true
		},

		_svgLoading: {
			type: Boolean,
			readOnly: true,
			value: false
		}

	},

    observers: [
		"_handleViewPortChange(_viewPort.*, svgLoaded)"
	],

    listeners: {
		"iron-resize": "_onIronResize"
	},

    clearAllAttachedClasses: function(className) {
		Array.from(dom(this.svgElement).querySelectorAll("." + className)).forEach(function(element) {
			this._removeClassSvg(element, className);
		}, this);
	},

    addClass: function(recordId, className, interactiveLayer) {
		if (interactiveLayer) {
			var interactiveEl = this.interactiveElementsByRecordId[recordId];
			if (interactiveEl) {
				this._addClassSvg(interactiveEl, className);
			}
		} else {
			var element = this.attachedElementsByRecordId[recordId];
			if (element) {
				this._addClassSvg(element, className);
			}
		}
	},

    addAttachedClass: function(recordId, className) {
		var element = this.attachedElementsByRecordId[recordId];
		if (element) {
			this._addClassSvg(element, className);
		}

		var interactiveEl = this.interactiveElementsByRecordId[recordId];
		if (interactiveEl) {
			this._addClassSvg(interactiveEl, className);
		}
	},

    addAttachedClassHGroup: function(recordId, className, color, interactiveLayer) {
		var element = null;
		if (interactiveLayer) {
			element = this.interactiveElementsByRecordId[recordId];
		} else {
			element = this.attachedElementsByRecordId[recordId];
		}
		
		if (element) {
			element.style.fill = color;
			this._addClassSvg(element, className);
		}
	},

    removeAttachedClass: function(recordId, className) {
		var element = this.attachedElementsByRecordId[recordId];
		if (element) {
			this._removeClassSvg(element, className);
		}

		var interactiveEl = this.interactiveElementsByRecordId[recordId];
		if (interactiveEl) {
			this._removeClassSvg(interactiveEl, className);
		}
	},

    getSvgContainer: function() {
		return this.$.svgContainer;
	},

    _addClassSvg: function(element, className) {
		var currentClasses = element.getAttribute("class");
		element.setAttribute("class", currentClasses + " " + className);
	},

    _removeClassSvg: function(element, className) {
		var currentClasses = element.getAttribute("class");
		var currentClassesArray = currentClasses.split(/\s/);
		var classToRemoveIndex = currentClassesArray.indexOf(className);
		if (classToRemoveIndex < 0) {
			return;
		}
		currentClassesArray.splice(classToRemoveIndex, 1);
		element.setAttribute("class", currentClassesArray.join(" "));
	},

    _handleRecordIdChange: function(newValue) {
		this.set("drawingId", null);
		this._setHasGraphic(false);
		if (newValue) {
			this._setDrawingIdLoading(true);
			this.getDrawingId(newValue).then(function(drawingId) {
				this._setDrawingIdLoading(false);
				if (!drawingId) {
					this._removeCurrentSvg();
					this._setHasGraphic(false);
				} else {
					this._setHasGraphic(true);
				}
				this.set("drawingId", drawingId);
			}.bind(this));
		}
	},

    _handleDrawingIdChange: function(newValue) {
		this._resetDrawing();
		this._setSvgLoaded(false);
		if (newValue) {
			this._set_svgLoading(true); 
			this.$.getSvgAjax.generateRequest();
		}
	},

    _handleSvgLoadedChanged: function(svgLoaded) {
		this.fire("svg-loaded", svgLoaded);
	},

    _computeGetSvgUrl: function(drawingId) {
		return "/p/floorplans/" + drawingId;
	},

    _removeCurrentSvg: function(){
		var container = this.$.svgContainer;
		var firstChild = dom(container).firstChild;
		while (firstChild) {
			dom(container).removeChild(firstChild);
			firstChild = dom(container).firstChild;
		}
	},

    _handleGetDrawingSvgResponse: function(e) {
		var detail = e.detail;
		var xhr = detail.xhr;
		this._setUnits(xhr.getResponseHeader("X-Tri-Drawing-Units"));
		this._setUnitScaleFactor(parseFloat(xhr.getResponseHeader("X-TRI-Drawing-Scale-Factor")));
		var svg = detail.response;

		dom(this.$.svgContainer).innerHTML = svg;
		var svgElement = dom(this.$.svgContainer).querySelector("svg");
		dom(svgElement).setAttribute("preserveAspectRatio", "xMidYMid");

		dom(svgElement).setAttribute('aria-label', this.svgAriaLabel);

		this._setSvgElements([]);
		this._setAttachedElementsByRecordId({});
		var attachedElementsByRecordId = {};
		Array.from(dom(svgElement).querySelectorAll("[tri-record-id].tri-attached")).forEach(function(element) {
			var recordId = element.getAttribute("tri-record-id");
			var bBox = null;
			if (recordId && recordId.length > 0) {
				try {
					bBox = element.getBBox();
				} catch(e) {
					//Firefox Bug 612118 - workaround
					// getBBox() fail if svg is hidden. For example, svg in hidden page of neon-animated-pages. 
					// Catch the exception and continue so svgLoad is set to true else elements that depend on this flag will fail (for example, tri-loading-indicator keep spinning).
					//console.warn(e);	
				}
				this.svgElements.push({recordId: recordId, bbox: bBox});
				attachedElementsByRecordId[recordId] = element;
			}
		}, this);
		this._setAttachedElementsByRecordId(attachedElementsByRecordId);

		this._setInteractiveElementsByRecordId({});
		var interactiveElementsByRecordId = {};
		Array.from(dom(svgElement).querySelectorAll("[tri-record-id].tri-interactive")).forEach(function(element) {
			var recordId = element.getAttribute("tri-record-id");
			if (recordId && recordId.length > 0) {
				interactiveElementsByRecordId[recordId] = element;
			}
		}, this);
		this._setInteractiveElementsByRecordId(interactiveElementsByRecordId);

		try {
			this._extents = svgElement.getBBox();
		} catch(e) {
			//Firefox Bug 612118 - workaround
			// Catch the exception and continue so svgLoad is set to true else elements that depend on this flag will fail (for example, tri-loading-indicator keep spinning).
			//console.warn(e);	
			this._extents = {height: 0, width: 0, x: 0, y: 0};
		}
		this._setViewPort(this._extents);
		this._setSvgElement(svgElement);
		this._setSvgLoaded(true);
		this._set_svgLoading(false);

		this.async(this._updateStrokeWidthsExecute, 1);
	},

    _handleViewPortChange: function(viewPortChange, svgLoaded) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!svgLoaded) {
			return;
		}

		if (!this._viewPort) {
			return;
		}

		if (!this._viewPort.scale) {
			return;
		}

		this._updateStrokeWidths();

		this._setViewBox(
			this._viewPort.x,
			this._viewPort.y, 
			this._extents.width * this._viewPort.scale, 
			this._extents.height * this._viewPort.scale);

		this.fire("view-port-change", viewPortChange);
	},

    _updateStrokeWidths: function() {
		if (this._updateStrokeWidthsHandle) {
			this.cancelAsync(this._updateStrokeWidthsHandle);
		}
		this._updateStrokeWidthsHandle = this.async(this._updateStrokeWidthsExecute, 100);
	},

    _updateStrokeWidthsExecute: function() {
		if (!this.svgElement) {
			return;
		}

		var matrix = this.svgElement.getCTM() || this.svgElement.getScreenCTM();
		//Firefox Bug 612118 - workaround
		// hidden svg return null matrix, therefore return default scale of "1".
		var scale = matrix? matrix.a:"1";

		// Story 220077 - supporrt multiple triplat-graphic with different floor plan on the same page
		// hijack this method to send out event for triplatg-graphic-drag-drop
		if (this.matrixTransform(matrix)) {
			this.fire("refresh-ctm");
		}

		if (this._currentStrokeWidthScale === scale) {
			this._updateStrokeWidthsHandle = null;
			return;
		}
		this._currentStrokeWidthScale = scale;

		Array.from(dom(this.svgElement).querySelectorAll("g [stroke-width]")).forEach(function(element) {
			var transformScale = 1.0;
			if (element.hasAttribute("sf")) {
				transformScale = parseFloat(element.getAttribute("sf"));
			}

			var strokeWidth = 1.0 / transformScale;
			var newStrokeWidth = strokeWidth / scale;
			element.setAttribute("stroke-width", newStrokeWidth);
		}, this);

		this._updateStrokeWidthsHandle = null;
	},

    _setViewBox: function(x, y, width, height) {
		dom(this.svgElement).setAttribute("viewBox", x + " " + y + " " + width + " " + height);
	},

    _setViewPort: function(extents){
		this._set_viewPort({
			scale: 1.0,
			x: extents.x,
			y: extents.y,
			width: extents.width,
			height: extents.height
		});
	},

    _resetDrawing: function() {
		this._setSvgElement(null);
		this.set("_extents", null);
		dom(this.$.svgContainer).innerHTML = "";
		this._setSvgElements([]);
		this._setAttachedElementsByRecordId({});
		this._setInteractiveElementsByRecordId({});
		this._currentStrokeWidthScale = null;
		this._set_centerPointsByRecordId(null);
	},

    _onIronResize: function() {
		var width = this.$.svgContainer.offsetWidth;
		var height = this.$.svgContainer.offsetHeight;
		this._set_calculatedWidth(width);
		this._set_calculatedHeight(height);
		this._updateStrokeWidths();
	},

    refreshViewBox: function(){
		if(this.svgElement) {
			//reseset the ViewBox before getBBox() is calculated so refresh return same BBox and init
			//(the ViewBox will be updated as ViewPort is set) 
			this._setViewBox(0,0,0,0);
			this._extents = this.svgElement.getBBox();
			this._setViewPort(this._extents);
		}
	},

    matrixTransform: function(matrix) {
		if (matrix) {
			if (matrix.a !== 1) return true;
			if (matrix.b !== 0) return true;
			if (matrix.c !== 0) return true;
			if (matrix.d !== 1) return true;
			if (matrix.e !== 0) return true;
			if (matrix.f !== 0) return true;
			return false;
		} else 
			return false;
	},

    appendChild: function(node) {
		dom(this.root).appendChild(node);
	},

    _computeGetCenterPointsUrl: function(drawingId) {
		return "/p/floorplans/spaceCenterPoints?drawingId=" + drawingId;
	},

    /**
	 * Asynchronously gets the center points for all spaces in the floor plan.
	 * It returns a promise that resolves when all the center points
	 * are returned from the server. 
	 */
	getCenterPointsByRecordId: function() {
		var promiseResolve, promiseReject;
		var promise = new Promise(
			function(resolve, reject) {
				promiseResolve = resolve;
				promiseReject = reject;
			}
		);

		this.async(
			this._runGetCenterPointsByRecordId.bind(this, promiseResolve, promiseReject),
			1
		);

		return promise;
	},

    /**
	 * Executor method for the promise returned by
	 * the getCenterPointsByRecordId method
	 */
	_runGetCenterPointsByRecordId: function(promiseResolve, promiseReject) {
		if (this.drawingId) {
			if (!this._centerPointsByRecordId) {
				var request = document.createElement('iron-request');
				var requestOptions = {
					url: this._centerPointsUrl,
					method: "GET",
					handleAs: "json"
				};

				request.completes.then(
					this._handleGetCenterPointsResponse.bind(this, promiseResolve)
				).catch(
					promiseReject
				);
			
				request.send(requestOptions);
			} else {
				promiseResolve(this._centerPointsByRecordId);
			}
		} else {
			promiseReject();
		}
	},

    _handleGetCenterPointsResponse: function(promiseResolve, request) {
		var centerPoints = request.response;
		var centerPointsByRecordId = {};
		if (centerPoints && centerPoints.length > 0) {
			for (var i = 0; i < centerPoints.length; i++) {
				centerPointsByRecordId[centerPoints[i].recordId] = centerPoints[i];
			}
		}
		this._set_centerPointsByRecordId(centerPointsByRecordId);
		promiseResolve(this._centerPointsByRecordId);
	},

    _computeLoading: function(drawingIdLoading, _svgLoading) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return drawingIdLoading || _svgLoading;
	},

	_svgTapped: function(e) {
		e.stopPropagation();
		var target = e.target;
		this.fire("graphic-tapped", {"triRecordId": target.getAttribute("tri-record-id"), "class": target.getAttribute("class")});
	}
});