/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A plugin to enable pan and zoom for a graphic. It should be used as an inner element of triplat-graphic.

	<triplat-graphic record-id="15294509">
			<triplat-graphic-zoomable slot="graphic-zoomable"></triplat-graphic-zoomable>
	</triplat-graphic>
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: "triplat-graphic-zoomable",

    properties: {
		/**
		 * The graphic on which the zoomable will perform actions against. 
		 * 
		 * Usually, this is automatically set by triplat-graphic
		 */
		graphic: {
			type: Object,
			observer: "_graphicChanged"
		},
		
		/**
		 * A flag to enable this plugin. If this is omitted it will be 
		 * true and the plugin will be enabled.
		 */
		enabled: {
			type: Boolean,
			notify: true,
			readOnly: false,
			value: true
		},
		
		/**
		 * A flag to enable the caching of pan and zoom. If this is omitted, it will be 
		 * false and the pan and zoom will not be persisted when switching between different graphics
		 * or when the graphic is reloaded. When cached is on, the last pan and zoom location will be preserved 
		 * until either this property is turned off or the component is detached.
		 */
		cached: {
			type: Boolean,
			notify: true,
			readOnly: false,
			reflectToAttribute: true,
			value: false,
			observer: "_cachedChanged"
		},
		
		/**
		 * Gets or sets the zoom factor for this graphic.
		 * By increasing this number, the graphic will be zoomed out, while the decrease will zoom in.
		 * It accepts a value between 0.01 and 1.5.
		 * When the graphic is first loaded the scale will have the value 1.0.
		 */
		scale: {
			type: Number,
			value: 1.0,
			notify: true,
			observer: "_handleScaleChanged"
		},
		
		_cacheViewPortMap: {
			type: Object,
			value: {}
		},
		
		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		},
		
		_mouseWheelModifier: {
			type: Object,
			value: {
				0: 0.0002,	// deltaMode.DOM_DELTA_PIXEL
				1: 0.008	// deltaMode.DOM_DELTA_LINE
			}
		},
		
		_lastScale: {
			type: Number,
			value: 1.0
		}
	},

    observers: [
		"_initializeGraphic(graphic)",
		"_setCachedViewPort(_svgLoaded)",
		"_handleEnabledChanged(_svgLoaded, enabled)"
	],

    _initializeGraphic: function(graphic) {
		this.listen(graphic, "svg-loaded", "_handleSvgLoadedChanged");
	},

    _handleSvgLoadedChanged: function(e){
		this._set_svgLoaded(e.detail);
	},

    _graphicChanged: function(){
		this._handleEnabledChanged();
	},

    _handleEnabledChanged: function(){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(this.enabled && this._svgLoaded) {
			this._handleEnable();
		} else {
			this._handleDisable();
		}
	},

    _cachedChanged: function(newValue) {
		if (!newValue) {
			if (this._cacheViewPortMap) {
				this._clearCacheViewPortMap();
			}
		}
	},

    _handleTrackZoomPlugin: function(e) {
		var detail = e.detail;
		switch(detail.state) {
			case "start":
				var ctm = this.graphic.svgElement.getCTM() || this.graphic.svgElement.getScreenCTM();
				var matrix = ctm.inverse();
				this._panStart = {
					matrix: matrix,
					start: this._getNormalizedPoint(detail.x, detail.y),
					orig: {x: this.graphic._viewPort.x, y: this.graphic._viewPort.y}
				};
				e.preventDefault();
			break;
			case "track":
				if (this._pinchInfo != null) {
					break;
				}
				var mousePoint = this._getNormalizedPoint(detail.x, detail.y, this._panStart.matrix);
				var x = this._panStart.orig.x + (this._panStart.start.x - mousePoint.x);
				this.graphic.set("_viewPort.x", x);
				var y = this._panStart.orig.y + (this._panStart.start.y - mousePoint.y);
				this.graphic.set("_viewPort.y", y);
				if (this.cached) {
					this._setViewPortCache(x, y, this.graphic._viewPort.scale);
				}
				e.preventDefault();
			break;
			case "end":
				this._panStart = null;
			break;
		}
	},

    _handleTouchStart: function(e) {
		if (e.touches.length != 2) {
			return;
		}
		e.preventDefault();
		this._pinchInfo = {
			startScale: this.graphic._viewPort.scale,
			startDistance: this._getMultiTouchDistance(e),
			width: this.graphic.offsetWidth,
			height: this.graphic.offsetHeight
		};
	},

    _handleTouchMove: function(e) {
		if (e.touches.length != 2) {
			return;
		}
		e.preventDefault();
		var distance = this._getMultiTouchDistance(e);
		var delta = (distance - this._pinchInfo.startDistance) * 0.001;
		this._handleZoom(this._pinchInfo.startScale - delta, this._pinchInfo.width, this._pinchInfo.height);
	},

    _handlePointerMove: function(e) {
		if (e.pointerType != "touch") {
			return;
		}
		e.preventDefault();
		if (this._pointerA && e.pointerId == this._pointerA.pointerId) {
			this._pointerA.clientX = e.clientX;
			this._pointerA.clientY = e.clientY;
		} else if (this._pointerB && e.pointerId == this._pointerB.pointerId) {
			this._pointerB.clientX = e.clientX;
			this._pointerB.clientY = e.clientY;
		}
		if (this._pointerA && this._pointerB) {
			var distance = this._getLineDistance(this._pointerB.clientX, this._pointerB.clientY, this._pointerA.clientX, this._pointerA.clientY);
			var delta = (distance - this._pinchInfo.startDistance) * 0.001;
			this._handleZoom(this._pinchInfo.startScale - delta, this._pinchInfo.width, this._pinchInfo.height);
		}
	},

    _handleTouchEnd: function(e) {
		this._pinchInfo = null;
	},

    _handleMouseWheel: function(e) {
		var deltaModifier = this._mouseWheelModifier[e.deltaMode];
		var delta = e.deltaY * deltaModifier;
		if (delta !== 0) {
			var newScale = this.graphic._viewPort.scale + delta;
			this._handleZoom(newScale, this.graphic._calculatedWidth, this.graphic._calculatedHeight);
		}
		e.preventDefault();
	},

    _handleZoom: function(newScale, width, height) {
		// prevent zooming too far out or too far in or same scale
		if (newScale > 1.5) {
			newScale = 1.5;	
		} 
		if (newScale < 0.01) {
			newScale = 0.01;
		}
		if (newScale == this._lastScale) {
			return;
		}
		this._lastScale = newScale;
		this.scale = newScale;
		var viewPort = {};
		viewPort.x = this.graphic._viewPort.x + 
			(((this.graphic._extents.width * this.graphic._viewPort.scale) - (this.graphic._extents.width * newScale)) / 2);
		viewPort.y = this.graphic._viewPort.y + 
			(((this.graphic._extents.height * this.graphic._viewPort.scale) - (this.graphic._extents.height * newScale)) / 2);
		viewPort.scale = newScale;
		this.graphic._set_viewPort(viewPort);
		if (this.cached) {
			this._setViewPortCache(viewPort.x, viewPort.y, viewPort.scale);
		}
	},

    _handleScaleChanged: function(newScale, oldScale) {
		if (this.graphic == null || !this._svgLoaded) {
			return;
		}
		this.debounce(
				"zoomable-handleScaleChanged",
				this._handleZoom.bind(this, newScale, this.graphic._calculatedWidth, this.graphic._calculatedHeight),
				20);
	},

    _handlePointerDown: function(e) {
		if (e.pointerType != "touch") {
			return;
		}

		if (!this._pointerA || e.pointerId == this._pointerA.pointerId) {
			this._pointerA = {
				pointerId: e.pointerId,
				clientX: e.clientX,
				clientY: e.clientY
			}
		} else  if (!this._pointerB || e.pointerId == this._pointerB.pointerId) {
			this._pointerB = {
				pointerId: e.pointerId,
				clientX: e.clientX,
				clientY: e.clientY
			}
		} 

		if (this._pointerA && this._pointerB) {
			var distance = this._getLineDistance(this._pointerB.clientX, this._pointerB.clientY, this._pointerA.clientX, this._pointerA.clientY);
			this._pinchInfo = {
				startScale: this.graphic._viewPort.scale,
				startDistance: distance,
				width: this.graphic.offsetWidth,
				height: this.graphic.offsetHeight
			};
		}
	},

    _handlePointerUp: function(e) {
		if (e.pointerType != "touch") {
			return;
		}
		if (this._pointerA && e.pointerId == this._pointerA.pointerId) {
			this._pointerA = null;
		}
		if (this._pointerB && e.pointerId == this._pointerB.pointerId) {
			this._pointerB = null;
		}
		if (!this._pointerA && !this._pointerB) {
			this._pinchInfo = null;
		}
	},

    _getMultiTouchDistance: function(e) {
		return this._getLineDistance(e.touches[0].clientX, e.touches[0].clientY, 
			e.touches[1].clientX, e.touches[1].clientY);
	},

    _getLineDistance: function(x1, y1, x2, y2) {
		var xdiff = x2 - x1;
		var ydiff = y2 - y1;
		return Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
	},

    _getNormalizedPoint: function(x, y, matrix) {
		if (!matrix) {
			var ctm = this.graphic.svgElement.getCTM() || this.graphic.svgElement.getScreenCTM();
			matrix = ctm.inverse();
		}
		var point = this.graphic.svgElement.createSVGPoint();
		point.x = x;
		point.y = y;
		return point.matrixTransform(matrix);
	},

    /**
	 * Calling this method will enable this plugin
	 */
	enable: function(){
		this.set("enabled", true);
	},

    /**
	 * Calling this method will disable this plugin
	 */
	disable: function(){
		this.set("enabled", false);
	},

    _handleEnable: function(){
		if(!this.graphic){
			return;
		}
		this.listen(this.graphic, "track", "_handleTrackZoomPlugin");
		this.listen(this.graphic, "wheel", "_handleMouseWheel");
		this.listen(this.graphic, "touchstart", "_handleTouchStart");
		this.listen(this.graphic, "pointerdown", "_handlePointerDown");
		this.listen(this.graphic, "touchmove", "_handleTouchMove");
		this.listen(this.graphic, "pointermove", "_handlePointerMove");
		this.listen(this.graphic, "touchend", "_handleTouchEnd");
		this.listen(this.graphic, "pointerup", "_handlePointerUp");
	},

    _handleDisable: function(){
		if(!this.graphic){
			return;
		}
		this.unlisten(this.graphic, "track", "_handleTrackZoomPlugin");
		this.unlisten(this.graphic, "wheel", "_handleMouseWheel");
		this.unlisten(this.graphic, "touchstart", "_handleTouchStart");
		this.unlisten(this.graphic, "pointerdown", "_handlePointerDown");
		this.unlisten(this.graphic, "touchmove", "_handleTouchMove");
		this.unlisten(this.graphic, "pointermove", "_handlePointerMove");
		this.unlisten(this.graphic, "touchend", "_handleTouchEnd");
		this.unlisten(this.graphic, "pointerup", "_handlePointerUp");
	},

    _clearCacheViewPortMap: function() {
		this._cacheViewPortMap = {};
	},

    _setViewPortCache: function(x, y, scale) {
		var cacheViewPort = {};
		cacheViewPort.x = x;
		cacheViewPort.y = y;
		cacheViewPort.scale = scale;
		this._cacheViewPortMap[this.graphic.drawingId] = cacheViewPort;
	},

    _setCachedViewPort: function(svgLoaded) {		
		if (!svgLoaded || !this.cached) {
			return;
		}
		var cacheViewPort = this._cacheViewPortMap[this.graphic.drawingId];
		if (cacheViewPort && cacheViewPort.scale) {
			this._lastScale = cacheViewPort.scale;
			this.scale = cacheViewPort.scale;
			this.graphic._set_viewPort(cacheViewPort);
		} else {
			this._lastScale = 1;
			this.scale = 1;
		}
	},

    _isCached: function() {
		return (this.cached && this._cacheViewPortMap[this.graphic.drawingId]);
	}
});