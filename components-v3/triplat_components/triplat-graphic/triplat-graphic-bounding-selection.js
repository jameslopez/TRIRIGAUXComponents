/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriplatGraphicSelectableBehavior } from "./triplat-graphic-selectable-behavior.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A plugin to enable bounding selection on a graphic. It should be used as an inner element of triplat-graphic.

	<triplat-graphic record-id="15294509">
		<triplat-graphic-bounding-selection 
			selected="{{selected}}" slot="graphic-bounding-selection">
		</triplat-graphic-bounding-selection>
	</triplat-graphic>
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: "triplat-graphic-bounding-selection",

    behaviors: [
		TriplatGraphicSelectableBehavior
	],

    properties: {

		/**
		 * The graphic on which the shapes will be highlighted. 
		 * 
		 * Usually, this is automatically set by triplat-graphic
		 */
		graphic: Object,

		/**
		 * This will give access to an array of selected records.
		 */
		selected: {
			type: Object,
			notify: true,
			readOnly: false
		},
		
		/**
		 * A flag to enable this plugin. If this is ommitted it will be 
		 * true and the plugin will be enabled.
		 */
		enabled: {
			type: Boolean,
			notify: true,
			readOnly: false,
			value: true
		},

		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		},

		_svgPath: {
			type: Object,
			readOnly: true
		},
	},

    observers: [
		"_initializeGraphic(graphic)",
		"_handleEnabledChanged(_svgLoaded, enabled)"
	],

    _initializeGraphic: function() {
		this.listen(this.graphic, "svg-loaded", "_handleSvgLoadedChanged");
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

    _handleSvgLoadedChanged: function(e){
		this._set_svgLoaded(e.detail);
	},

    _handleTrackBounding: function(e) {
		var detail = e.detail;
		switch(detail.state) {
			case "start":
				this._set_svgPath(this._createSvgElement("rect"));
				this._svgPath.setAttribute("fill", "blue");
				this._svgPath.setAttribute("fill-opacity", "0.2");
				this._svgPath.setAttribute("stroke", "#000000");
				
				this._trackStart = {
					start: this._getSVGCoordinate(detail.x, detail.y, this.graphic.svgElement),
				};

				this._svgPath.setAttribute("x", this._trackStart.start.x);
				this._svgPath.setAttribute("width", 0);
				this._svgPath.setAttribute("y", this._trackStart.start.y);
				this._svgPath.setAttribute("height", 0);
				
				this.graphic.svgElement.appendChild(this._svgPath);
				e.preventDefault();
			break;
			case "track":
				if (this._svgPath){
					this._setSvgPathAttrs(detail);
				}
				e.preventDefault();
			break;
			case "end":
				if (this._svgPath){
					this._setSvgPathAttrs(detail);
					
					this.graphic.svgElement.removeChild(this._svgPath);
					this._trackStart = null;
					
					var intX = parseInt(this._svgPath.getAttribute("x"));
					var intY = parseInt(this._svgPath.getAttribute("y"))
					
					var calcX2 = intX + parseInt(this._svgPath.getAttribute("width"));
					var calcY2 = intY + parseInt(this._svgPath.getAttribute("height"));
					var bbox = {
						x: intX,
						x2: calcX2,
						y: intY,
						y2: calcY2,
					}
					this._set_svgPath(null);
					this._doSelections(bbox);
				}
				e.preventDefault();
			break;
		}
	},

    _setSvgPathAttrs: function(detail){
		var mousePoint = this._getSVGCoordinate(detail.x, detail.y, this.graphic.svgElement);
		
		var diffX = 0;
		var pathW = 0;
		var pathX = parseInt(this._svgPath.getAttribute("x"));
		if(mousePoint.x < pathX){
			pathW = parseInt(this._svgPath.getAttribute("width"));
			diffX = pathW + (pathX - mousePoint.x);
			this._svgPath.setAttribute("x", Math.ceil(mousePoint.x));
		} else if(this._trackStart.start.x > mousePoint.x){
			pathW = parseInt(this._svgPath.getAttribute("width"));
			diffX = pathW - (mousePoint.x - pathX);
			this._svgPath.setAttribute("x", Math.ceil(mousePoint.x));
		} else {
			diffX = mousePoint.x - this._trackStart.start.x;
		}
		
		var diffY = 0;
		var pathH = 0;
		var pathY = parseInt(this._svgPath.getAttribute("y"));
		if(mousePoint.y < pathY){
			pathH = parseInt(this._svgPath.getAttribute("height"));
			this._svgPath.setAttribute("y", Math.ceil(mousePoint.y));
			diffY = pathH + (pathY - mousePoint.y);
		} else if(this._trackStart.start.y > mousePoint.y){
			pathH = parseInt(this._svgPath.getAttribute("height"));
			diffY = pathH - (mousePoint.y - pathY);
			this._svgPath.setAttribute("y", Math.ceil(mousePoint.y));
		} else {
			diffY = mousePoint.y - this._trackStart.start.y;
		}
		
		this._svgPath.setAttribute("width", diffX);
		this._svgPath.setAttribute("height", diffY);
	},

    _createSvgElement: function(tagName){
		return document.createElementNS("http://www.w3.org/2000/svg", tagName);
	},

    _doSelections: function(selectionBBox){
		
		var previousSelection = {};
		var records = [];
		this.selected.forEach(function(elem){
			previousSelection[elem._id] = elem;
			records.push(elem);
		});
		
		this.graphic.svgElements.forEach(function(svgElement){
			
			if(svgElement.recordId == this.graphic.recordId || previousSelection[svgElement.recordId]){
				return;
			}

			if (this._selectableById && !(svgElement.recordId in this._selectableById)) {
				return;
			}

			var bbox = svgElement.bbox;
			bbox.x2 = bbox.x + bbox.width;
			bbox.y2 = bbox.y + bbox.height;

			if ( ((bbox.x >= selectionBBox.x && bbox.x <= selectionBBox.x2)
				&& (bbox.x2 <= selectionBBox.x2)) 
				&& ((bbox.y >= selectionBBox.y && bbox.y <= selectionBBox.y2)
				&& (bbox.y2 <= selectionBBox.y2))
			   )
			{
				records.push({_id: svgElement.recordId, _isBoundSelected: true});   
			}
		}, this);
		
		
		this.selected = records;
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
		this.listen(this.graphic, "track", "_handleTrackBounding");
	},

    _handleDisable: function(){
		if(!this.graphic){
			return;
		}
		this.unlisten(this.graphic, "track", "_handleTrackBounding");
	},

    _getSVGCoordinate: function (x, y, svgElement) {
		var svgPoint = null;
		var screenCTM = svgElement.getScreenCTM();
		if (screenCTM) {
			var screenPoint = svgElement.createSVGPoint();
			screenPoint.x = x;
			screenPoint.y = y;
			svgPoint = screenPoint.matrixTransform( screenCTM.inverse() );
		}
		return svgPoint;
	}
});