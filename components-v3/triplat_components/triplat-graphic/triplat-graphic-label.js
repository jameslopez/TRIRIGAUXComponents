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
A plugin to enable labels on a graphic. It should be used as an inner element of triplat-graphic.

	<triplat-graphic record-id="15294509">

	  <triplat-graphic-label slot="graphic-label"
		  label-id="{{labelId}}>
	  </triplat-graphic-label>

	</triplat-graphic>
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<iron-ajax id="getLabelAjax" handle-as="text" on-response="_handleGetLabelResponse"></iron-ajax>
	`,

    is: "triplat-graphic-label",

    properties: {

		/**
		 * The graphic on which the label will be applied. 
		 * 
		 * Usually, this is automatically set by triplat-graphic
		 */
		graphic: Object,
		
		/**
		 * The labelId of a Label record
		 * 
		 * It can come from a query datasource with 
		 * module = triGraphics and BO = triLabelStyle or
		 * module = triGraphics and BO = triLabelFilter
		 */
		labelId: {
			type: Number,
			readOnly: false
		},
		
		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		}

	},

    observers: [
		"_initializeGraphic(graphic)",
		"_changeLabelId(labelId, _svgLoaded)",
	],

    _initializeGraphic: function(graphic) {
		this.listen(graphic, "svg-loaded", "_handleSvgLoadedChanged");
	},

    _handleGetLabelResponse: function(e) {
		if (!this.graphic.svgElement) {
			return;
		}
		var labelLayerEl = dom(this.graphic.svgElement).querySelector("#_triLabelLayer");
		if (!labelLayerEl) {
			return;
		}

		var container = document.createElement("div");
		var svgToAdd = "<svg>" + e.detail.response + "</svg>";
		container.innerHTML=""+svgToAdd;
		var nodes = Array.prototype.slice.call(container.childNodes[0].childNodes);
		nodes.forEach(function(el){
			labelLayerEl.appendChild(el);
		});
	},

    _changeLabelId: function(labelId, svgLoaded){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(!svgLoaded){
			return;
		}

		this._clearCurrentLabels();

		if(labelId){
			var url = document.createElement("tricore-url");
			this.$.getLabelAjax.url = 
				url.getUrl("/p/floorplans/labellayers?drawingId="+this.graphic.drawingId +"&labelId="+labelId);
			this.$.getLabelAjax.generateRequest();
		}
	},

    _handleSvgLoadedChanged: function(e){
		this._set_svgLoaded(e.detail);
	},

    _clearCurrentLabels: function() {
		if (!this.graphic.svgElement) {
			return;
		}
		var labelLayerEl = dom(this.graphic.svgElement).querySelector("#_triLabelLayer");
		if (labelLayerEl) {
			dom(labelLayerEl).innerHTML = "";
		}
	},

    _refreshLabel: function() {
		this._changeLabelId(this.labelId, this._svgLoaded);
	},

    refreshLabel: function(delay) {
		if (!delay) {
			delay = 1000;
		}
		this.async(this._refreshLabel, delay);
	}
});