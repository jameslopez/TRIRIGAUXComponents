/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "./triplat-graphic-base.js";
import "./triplat-graphic-selectable.js";
import "./triplat-graphic-zoomable.js";
import { TriplatHighlightLayers } from "./triplat-graphic-highlight.js";
import "./triplat-graphic-label.js";
import "./triplat-graphic-bounding-selection.js";
import "./triplat-graphic-layer-manager.js";
import "./triplat-graphic-def.js";
import "./triplat-graphic-drag-drop.js";
import { TriplatHighlightGroupLayers, HighlightClass } from "./triplat-graphic-highlight-group.js";
import "./triplat-graphic-pin.js";
import { PolymerElement } from "../@polymer/polymer/polymer-element.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/*
A component that renders an SVG floor plan. You can specify either the drawing ID to be
rendered or a record ID that the drawing is attached to. An example of the record ID
would be the spec ID of the floor record, where the floor plan you want to render is the
floor plan for that floor.

	 <triplat-graphic drawing-id="1026"></triplat-graphic>

or

	 <triplat-graphic record-id="15294509"></triplat-graphic>

The graphic will scale to fit the size of the component (without stretching or
scrolling). So the user of this component should have a width and height set. This can be set
either explicitly or using layout css styles.
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				height: 100%;
				width: inherit; /*needed for FF (in page Tile)*/
			}
			triplat-graphic-base {
				--triplat-graphic-base-selected: {
					@apply --triplat-graphic-selected;
				};
				--triplat-graphic-base-interactive-selected: {
					@apply --triplat-graphic-interactive-selected;
				};
				--triplat-graphic-base-selectable: {
					@apply --triplat-graphic-selectable;
				};
				--triplat-graphic-base-interactive-selectable: {
					@apply --triplat-graphic-interactive-selectable;
				};
				--triplat-graphic-base-non-selectable: {
					@apply --triplat-graphic-non-selectable;
				};
				--triplat-graphic-base-highlight-1: {
					@apply --triplat-graphic-highlight-1;
				};
				--triplat-graphic-base-highlight-2: {
					@apply --triplat-graphic-highlight-2;
				};
				--triplat-graphic-base-highlight-3: {
					@apply --triplat-graphic-highlight-3;
				};
				--triplat-graphic-base-highlight-4: {
					@apply --triplat-graphic-highlight-4;
				};
				--triplat-graphic-base-highlight-5: {
					@apply --triplat-graphic-highlight-5;
				};
				--triplat-graphic-base-highlight-group-1: {
					@apply --triplat-graphic-highlight-group-1;
				};
				--triplat-graphic-base-highlight-group-2: {
					@apply --triplat-graphic-highlight-group-2;
				};
				--triplat-graphic-base-highlight-group-3: {
					@apply --triplat-graphic-highlight-group-3;
				};
				 --triplat-graphic-base-highlight-group-4: {
					@apply --triplat-graphic-highlight-group-4;
				};
				 --triplat-graphic-base-highlight-group-5: {
					@apply --triplat-graphic-highlight-group-5;
				};
				--triplat-graphic-base-interactive-drop-enter: {
					@apply --triplat-graphic-interactive-drop-enter;
				};
				--triplat-graphic-base-interactive-drop-done: {
					@apply --triplat-graphic-interactive-drop-done;
				};
			}
		
		</style>

		<triplat-graphic-base drawing-id="{{drawingId}}" record-id="{{recordId}}" has-graphic="{{hasGraphic}}" drawing-id-loading="{{drawingIdLoading}}" loading="{{loading}}" svg-aria-label="[[svgAriaLabel]]">
		</triplat-graphic-base>
		<slot id="triplat-graphic-selectable" name="graphic-selectable"></slot>
		<slot id="triplat-graphic-zoomable" name="graphic-zoomable"></slot>
		<slot id="triplat-graphic-highlight" name="graphic-highlight"></slot>
		<slot id="triplat-graphic-pin" name="graphic-pin"></slot>
		<slot id="triplat-graphic-label" name="graphic-label"></slot>
		<slot id="triplat-graphic-bounding-selection" name="graphic-bounding-selection"></slot>
		<slot id="triplat-graphic-layer-manager" name="graphic-layer-manager"></slot>
		<slot id="triplat-graphic-def" name="graphic-def"></slot>
		<slot id="triplat-graphic-drag-drop" name="graphic-drag-drop"></slot>
		<slot id="triplat-graphic-highlight-group" name="graphic-highlight-group"></slot>
	`,

    is: "triplat-graphic",

    properties: {
		/**
		 * A flag that indicates if the graphic is loaded.
		 */
		svgLoaded: {
			type: Boolean,
			notify: true,
			readOnly: true
		},

		/**
		 * A flag that indicates whether or not a graphic
		 * has been found for the related record.
		 */
		hasGraphic: {
			type: Boolean,
			notify: true,
		},

		/**
		 * A flag that indicates if the component is currently making a request 
		 * to the server to get the drawing ID.
		 */
		drawingIdLoading: {
			type: Boolean,
			notify: true,	
		},

		/**
		 * A flag that indicates if the component is currently making a request 
		 * to the server to get the graphic.
		 */
		loading: {
			type: Boolean,
			notify: true
		},

		/**
		 * Aria-label value for the svg.
		 */
		svgAriaLabel: {
			type: String,
			value: ""
		},

		_graphic: {
			type: Object,
			notify: true,
			readOnly: true
		},

		_singlePlugins: {
			type: Array,
			value: function(){
				return ["triplat-graphic-selectable",
						"triplat-graphic-zoomable",
						"triplat-graphic-label",
						"triplat-graphic-bounding-selection",
						"triplat-graphic-layer-manager",
						"triplat-graphic-highlight-group"]
			}
		},

		_graphic_label: {
			type: Object,
			value: null,
			readOnly: true
		}
	},

	listeners: {
		"graphic-tapped":"_handleTap"
	},

    attached: function() {
		this.async(function() {
			var graphic = this.$$("triplat-graphic-base");
			if (!graphic) {
				console.warn("no graphic found");
				return;
			}
			this._set_graphic(graphic);

			this.listen(graphic, "svg-loaded", "_handleSvgLoadedChanged");
			
			this._singlePlugins.forEach(function(plugin){
				var pluginTag = dom(this.$$("#"+plugin)).getDistributedNodes()[0];
				if(pluginTag){
					pluginTag.set("graphic", graphic);
				}
			}, this);

			dom(this.$$("#triplat-graphic-highlight")).getDistributedNodes().forEach(function(node){
				node.set("graphic", graphic);
			});

			dom(this.$$("#triplat-graphic-def")).getDistributedNodes().forEach(function(node){
				node.set("graphic", graphic);
			});
			
			dom(this.$$("#triplat-graphic-pin")).getDistributedNodes().forEach(function(node){
				node.set("graphic", graphic);
			});

			var graphic_label = dom(this.$$("#triplat-graphic-label")).getDistributedNodes()[0];
			this._set_graphic_label(graphic_label);
			this._setSvgLoaded(graphic.svgLoaded);
		});
		this._lazyLoading();
	},

    _handleSvgLoadedChanged: function(e) {
		this._setSvgLoaded(e.detail);
	},

    /**
	 * Recalculates the view box of the graphic.
	 * If triplat-graphic-highlight-group is used, it will refresh the mask element.
	 * If triplat-graphic-zoomable plugin and cached property are used, it will set to cached view box.
	 */
	refreshViewBox: function(){
		if(this._graphic) {
			this._graphic.refreshViewBox();

			var highlight_group_plugin = this.queryEffectiveChildren("triplat-graphic-highlight-group");
			if (highlight_group_plugin) { 
				highlight_group_plugin.refreshMaskElement();
			}

			var zoomable_plugin = this.queryEffectiveChildren("triplat-graphic-zoomable");
			if (zoomable_plugin && zoomable_plugin._isCached()) {
				zoomable_plugin._setCachedViewPort(this.svgLoaded);
			}
		}
	},

    /**
	 * Forces the refresh of labels in the graphic.
	 */
	refreshLabel: function(delay) {
		console.warn("triplat-graphic: refreshLabel is deprecated. Use it directly against the plugin element(triplat-graphic-label) instead.");
		if(this._graphic_label) {
			this._graphic_label.refreshLabel(delay);
		}
	},

    _findPlugin: function(plugin) {
		var pluginElm = dom(this.$$("#"+plugin)).getDistributedNodes()[0];
		return pluginElm;
	},

    _lazyLoading: function() {
		var graphic = this.$$("triplat-graphic-base");
		if (!graphic) {
			console.warn("no graphic found");
			return;
		}
		var drag_drop_plugin = dom(this.$$("#triplat-graphic-drag-drop")).getDistributedNodes()[0];
		if (drag_drop_plugin) {
			// triplat-graphic-drag-drop will be imported only when instance is used
			// if no triplat-graphic-drag-drop plugin in triplat-graphic, no actual triplat-graphic-drag-drop import occcurs.
			if (drag_drop_plugin instanceof PolymerElement) {
				drag_drop_plugin.set("graphic", graphic);
			}
		}
	},

	_handleTap: function(e) {
		e.stopPropagation();
		var selectable_plugin = dom(this.$$("#triplat-graphic-selectable")).getDistributedNodes()[0];
		if (selectable_plugin) {
			selectable_plugin.handleTap(e.detail);
		}
	}
});