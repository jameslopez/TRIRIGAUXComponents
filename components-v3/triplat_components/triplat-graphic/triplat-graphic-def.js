/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/*
A triplat-graphic plugin for adding a defs element to the graphic SVG.  This is most usefull for 
adding hatch styling to the shapes of the drawing.

Example:
	 
	 <triplat-graphic id="graphic" 
			   record-id="{{floorId}}" 
			   svg-loaded="{{loaded}}" 
			   has-graphic="{{hasGraphic}}">
		  <triplat-graphic-def slot="graphic-def">
			   <pattern id="selectedPattern" 
						 width="40" height="40" 
						 patternUnits="userSpaceOnUse">
					<line x1="20" y1="0" x2="40" y2="20" 
						 stroke="#5AAAFA" 
						 stroke-width="10" 
						 stroke-linecap="square"></line>
					<line x1="0" y1="20" x2="20" y2="40" 
						 stroke="#5AAAFA" 
						 stroke-width="10" 
						 stroke-linecap="square"></line>
			   </pattern>
		  </triplat-graphic-def>
		  <triplat-graphic-selectable selectable="{{_filter(spaces, searchTerms)}}" 
			   selected="{{selectedSpace}}">
		  </triplat-graphic-selectable>
		</triplat-graphic>
	 
CSS:
	 
	 triplat-graphic {
		  --triplat-graphic-interactive-selected: {
			   fill-opacity: 1;
			   fill: url(#selectedPattern);
		  };
	 }
	 
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<slot></slot>
	`,

    is: "triplat-graphic-def",

    properties: {

		/**
		 * The graphic on which the layers will be excluded. 
		 * 
		 * Usually, this is automatically set by triplat-graphic
		 */
		graphic: {
			type: Object,
			observer: "_onGraphicChange"
		}

	},

    _onGraphicChange: function(graphic) {
		this.listen(graphic, "svg-loaded", "_onSvgLoaded");
	},

    _onSvgLoaded: function(e) {
		var svgLoaded = e.detail;
		if (!svgLoaded) {
			return;
		}

		this._applyDefToSvg();
	},

    _applyDefToSvg: function() {
		var svgEl = this.graphic.svgElement;
		if (!svgEl) {
			return;
		}

		var svgNS = "http://www.w3.org/2000/svg";
		var defs = document.createElementNS(svgNS, "defs");
		defs.innerHTML = dom(this).innerHTML;
		dom(svgEl).appendChild(defs);
	}
});