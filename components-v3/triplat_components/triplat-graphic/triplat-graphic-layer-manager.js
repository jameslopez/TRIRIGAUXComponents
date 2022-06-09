/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../tricore-url/tricore-url.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A plugin to enable the controlling of layers at runtime. It provides a list of available layers as well as optional properties to disable or enable layers before the rendering phase.

This plugin should be used as an inner element of triplat-graphic. Example:

	<triplat-graphic record-id="[[floorId]]">
	  <triplat-graphic-layer-manager layers="{{layers}}"
		turn-on="{{layersToTurnOn}}" turn-off="{{layersToTurnOff}}"
		slot="graphic-layer-manager">
	  </triplat-graphic-layer-manager>
	</triplat-graphic>

The **turn-on** and **turn-off** properties are optional. If they are defined, the plugin will turn on/off the layers when rendering the graphic in addition to the ones that are already set to be visible or not. So, a developer should use these properties when there is a need for changing the layer visibility at runtime.

The **layers** property provides the ability to retrieve all layers for a graphic. Each element of this list follows the pattern: 

	{ name: layerName, visible: true/false }

This way, a developer is able to create his own UI for a layer manager. For example, in order to build a very simple UI:


	<template is="dom-repeat" items="{{layers}}">
	  <paper-checkbox checked="{{item.visible}}" 
		on-change="_changeModel"> {{item.name}} </paper-checkbox>
	</template>

A **_changeModel** function can be implemented as follows:

	 _changeModel: function(e){
	   var checked = e.target.checked;
	   e.model.set("item.visible", checked);
	}
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<iron-ajax id="getLayersAjax" on-response="_handleGetLayerResponse">
		</iron-ajax>
		<iron-ajax id="getLayerSVGAjax" handle-as="text" on-response="_handleGetLayerSVGResponse">
		</iron-ajax>
	`,

    is: "triplat-graphic-layer-manager",

    properties: {

		/**
		 * The graphic on which the layers will be excluded. 
		 * 
		 * Typically, this is automatically set by triplat-graphic.
		 */
		graphic: Object,

		/**
		 * Object containing a list of available layers for
		 * the current drawing. Each element has information
		 * about the layer name and its visibility.
		 */
		layers: {
			type: Object,
			notify: true,
			value: []
		},

		/**
		 * Optional object that contains the layer names to be turned on
		 * when rendering the graphic. It can be either an array of
		 * layer names or a single string.
		 */
		turnOn: {
			type: Object,
			notify: true
		},

		/**
		 * Optional object that contains the layer names to be turned off
		 * when rendering the graphic. It can be either an array of
		 * layer names or a single string.
		 */
		turnOff: {
			type: Object,
			notify: true
		},
		
		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		},

		_layersLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		}
	},

    observers: [
		"_initializeGraphic(graphic)",
		"_mapLayers(_svgLoaded)",
		"_handleLayers(layers.*)",
		"_turnOffChanged(_layersLoaded, turnOff.*)",
		"_turnOnChanged(_layersLoaded, turnOn.*)"
	],

    _initializeGraphic: function(graphic) {
		this.listen(graphic, "svg-loaded", "_handleSvgLoadedChanged");
	},

    _handleSvgLoadedChanged: function(e){
		this._set_svgLoaded(e.detail);
	},

    _mapLayers: function(svgLoaded){
		if (!svgLoaded) {
			return;
		}

		this._set_layersLoaded(false);
		var url = document.createElement("tricore-url");

		this.$.getLayersAjax.url = 
			url.getUrl("/p/floorplans/"+this.graphic.drawingId+"/layers");

		this.$.getLayersAjax.generateRequest();
	},

    _handleGetLayerResponse: function(e) {
		this.set("layers", e.detail.response);
		this._set_layersLoaded(true);
	},

    _handleLayers: function(change){
		var visibleSubpath = change.path.indexOf('.visible');

		if(visibleSubpath != -1){
			var itempath = change.path.substring(0, visibleSubpath);
			var item = this.get(itempath);
			var layers = Array.from(dom(this.graphic.svgElement).querySelectorAll("g[id='"+item.name+"']"));
			if(layers.length == 0 && item.visible){
				// Layer is not retrieved yet
				var url = document.createElement("tricore-url");
				this.$.getLayerSVGAjax.url = 
					url.getUrl("/p/floorplans/"+this.graphic.drawingId+"/layers/"+item.name);
				this.$.getLayerSVGAjax.generateRequest();
			}
			
			layers.forEach(function(layer){
				layer.style.display = item.visible ? "block" : "none";
			});
		}
	},

    _handleGetLayerSVGResponse: function(e) {
		var container = document.createElement("div");
		var svgToAdd = "<svg>" + e.detail.response + "</svg>";
		container.innerHTML=""+svgToAdd;
		var nodes = Array.prototype.slice.call(container.childNodes[0].childNodes);
		nodes.forEach(function(el){
			dom(this.graphic.svgElement).appendChild(el);
		}, this);
	},

    _turnOffChanged: function(layersLoaded, change){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!layersLoaded) {
			return;
		}

		this._handleVisibilityArrayChange(change, false);
	},

    _turnOnChanged: function(layersLoaded, change){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!layersLoaded) {
			return;
		}

		this._handleVisibilityArrayChange(change, true);
	},

    _handleVisibilityArrayChange: function(change, visible){
		var arrayName = visible ? "turnOn" : "turnOff";
		if(change.path == arrayName+".splices"){
			var indexSplice = change.value.indexSplices[0];
			indexSplice.removed.forEach(function(removed) {
				this._toggleLayer(removed, !visible);
			}, this);
			for (var i = 0; i < indexSplice.addedCount; i++) {
				var added = indexSplice.object[indexSplice.index + i];
				this._toggleLayer(added, visible);
			}
		}

		if(change.path == arrayName){
			if(Array.isArray(change.value)){
				change.value.forEach(function(layerName){
					this._toggleLayer(layerName, visible);
				}, this);
			} else if(change.value){
				this._toggleLayer(change.value, visible);
			}	
		}
	},

    _toggleLayer: function(layerName, visible){
		var index = -1;
		for(var i=0; i<this.layers.length; i++){
			var layer = this.layers[i];
			if(layer.name == layerName){
				if(layer.visible == !visible){
					index = this.layers.indexOf(layer);
				}
				break;
			}
		}
		if(index != -1){
			this.set("layers."+index+".visible", visible);
		}
	}
});