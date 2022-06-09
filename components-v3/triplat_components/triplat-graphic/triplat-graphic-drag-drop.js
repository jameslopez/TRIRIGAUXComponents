/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../tricore-context-path/tricore-context-path.js";
import { PolymerElement } from "../@polymer/polymer/polymer-element.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriLazyLoadingBehavior } from '../tricore-lazy-loading-behavior/tricore-lazy-loading-behavior.js';
import { getModuleUrl } from "../tricore-util/tricore-util.js";

/*
A plugin to enable drag-drop on a graphic. It should be used as an inner element of **triplat-graphic**.

	<triplat-graphic record-id="15294509">

	  <triplat-graphic-drag-drop
		  selector="polyline.tri-interactive"
		  accept-selector=".user-class, #user-id"
		  drop-spaces="{{spaces}}"
		  spaceSelected="{{selectedSpaces}}"
		  slot="graphic-drag-drop">
	  </triplat-graphic-drag-drop>

	</triplat-graphic>

### Styling

Style the drop-enter/drop-done shapes using mixins on the **triplat-graphic** element. 

Example:
	
	 triplat-graphic {
		  --triplat-graphic-interactive-drop-enter: {
			   stroke: rgb(255, 165, 115);
			   stroke-width: 3;
			   stoke-endpath: square;
			   fill-opacity: 0;
			   vector-effect: non-scaling-stroke;
		  };
		  --triplat-graphic-interactive-drop-done: {
			   fill: rgb(255, 165, 115);
			   fill-opacity: 0.5;
		  };
	 }

Custom property                            | Description                                           | Default
-------------------------------------------|-------------------------------------------------------|----------
`--triplat-graphic-interactive-drop-enter` | Mixin for drop space that drag element has entered.   |
										   | This mixin will be clear when drag element leave      | `{}`
`--triplat-graphic-interactive-drop-done`  | Mixin for drop space that drag element has dropped    | `{}`
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<tricore-context-path get-path="{{_contextPath}}"></tricore-context-path>
		<triplat-drop id="triDrop" selector="{{selector}}" accept-selector="{{acceptSelector}}" no-setup="" in-graphic=""></triplat-drop>
	`,

    is: "triplat-graphic-drag-drop",

    /**
	 * Fired when drag target drops into space.
	 *
	 * @event drop
	 */

	properties: {

		/**
		 * The graphic on which the drag & drop will apply to. 
		 * 
		 * Usually, this is automatically set by **triplat-graphic**.
		 */
		graphic: Object,
		
		/*
		 * CSS selector for the element to interact with. 
		 * The default value (polyline.tri-interactive) will make all spaces in the floor plan become dropzones.
		 */
		selector: {
			type: String,
			value: "polyline.tri-interactive",
			reflectToAttribute: true,
			observer: '_updateSelector'
		},
		/**
		 * An array of the droppable spaces used to lookup space info when drop is successful
		 * 
		 * This data is usually from **triplat-ds** for all the spaces in the floor
		 */
		dropSpaces: {
			type: Array,
			notify: false,
			readOnly: false,
			observer: "_handleDropSpacesChanged"
		},
		
		/**
		 * This property can be useds as data bridge between **triplat-graphic-drag-drop** and **triplat-graphic-select**.
		 * When a successful drop occurs, this data array will be updated with the space as selected.
		 */
		spaceSelected: {
			type: Object,
			notify: true,
			readOnly: false
		},
		
		/*
		 * CSS selector for the accept element(s). 
		 * If using multiple triplat-graphic and default selector with different acceptSelector values,
		 * only the last one will succeed. Make sure to put all accept selectors in this property for that scenario.
		 */
		acceptSelector: {
			type: String,
			value: null,
			reflectToAttribute: true,
			observer: '_updateAcceptSelector'
		},
		
		/*
		 * Declaratively enable/disable graphic drop interaction
		 */
		enabled: {
			type: Boolean,
			value: true,
			readOnly: false,
			observer: 'updateEnabled'
		},

		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		},
		
		_dropSpaceById: {
			type: Object,
			notify: false,
			readOnly: true
		},
		
		_matrix: {
			type: Object,
			value: null
		},
		
		_position: {
			type: Object,
			value: null
		}
		
	},
	
	behaviors: [
		TriLazyLoadingBehavior
	],

    observers: [
		"_initializeGraphic(graphic)",
		"_setupDragdrop(_svgLoaded)"
	],

    listeners: {
		"drag-enter" : "_dropEnterHandler",
		"drag-leave" : "_dropLeaveHandler",
		"_drop" : "_dropDoneHandler"
	},

    _initializeGraphic: function(graphic) {
		this.listen(graphic, "svg-loaded", "_handleSvgLoadedChanged");
		this.listen(graphic, "refresh-ctm", "_handleCtmRefresh");
	},

    _updateSelector: function(newValue, oldValue) {
	},

    _updateAcceptSelector: function(newValue, oldValue) {
	},

    _handleDropSpacesChanged: function(dropSpaces) {
		if(dropSpaces){
			var dropSpaceById = {};
			dropSpaces.forEach(function(space) {
				dropSpaceById[space._id] = space;
			});
			this._set_dropSpaceById(dropSpaceById);
		}
	},

    _computeOffset: function(obj) {
		var offsetleft = 0;
		var offsetTop = 0;
		if (obj.offsetParent) {
			do {
				offsetleft += obj.offsetLeft;
				offsetTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return {
			left : offsetleft,
			top : offsetTop
		};
	},

    _setupDragdrop: function(svgLoaded) {
		if (!svgLoaded) {
			return;
		}

		if (this.enabled) {
			this.$.triDrop.removeAttribute("no-setup");
			var matrix = this.graphic.svgElement.getCTM() || this.graphic.svgElement.getScreenCTM();
			var position = this._computeOffset(this.graphic);
			if (this._sameCoordinate(matrix, position)) return;
			var svgContainer = {};
			svgContainer.position = position;
			svgContainer.element = this.graphic.svgElement;
			this._matrix = matrix;
			this._position = position;
			/* Good info keeps for future debugging
				var graphicId = this.parentElement.getAttribute("id");
				console.log("_setupDragdrop: graphic id = " + graphicId + ", matrix = (" + matrix.a +"," + matrix.b + "," + matrix.c +
						"," + matrix.d + "," + matrix.e + "," + matrix.f +"), position = (left: " +
						position.left +", top: " + position.top + ")");
			*/
			this.$.triDrop.setSvgContainer(svgContainer);
			let polyElements = dom(svgContainer.element).querySelectorAll(this.selector);
			polyElements.forEach(element => {
				this.$.triDrop.setupDropZone(element);
			});
		}
	},

    _handleSvgLoadedChanged: function(e) {
		this._set_svgLoaded(e.detail);
	},

    _dropEnterHandler: function(e) {
		var dropTarget = e.detail.dropTarget;
		if (!dropTarget || !dropTarget.hasAttribute("tri-record-id")) {
			return;
		}
		if (dropTarget.getAttribute("class").indexOf("tri-interactive") < 0) {
			return;
		}
		var recordId = dropTarget.getAttribute("tri-record-id");
		this.graphic.clearAllAttachedClasses("drop-enter");
		this.graphic.addAttachedClass(recordId, "drop-enter");	
	},

    _dropLeaveHandler: function(e) {
		var dropTarget = e.detail.dropTarget;
		if (!dropTarget || !dropTarget.hasAttribute("tri-record-id")) {
			return;
		}
		if (dropTarget.getAttribute("class").indexOf("tri-interactive") < 0) {
			return;
		}
		this.graphic.clearAllAttachedClasses("drop-enter");        	
	},

    _dropDoneHandler: function(e) {
		var dropTarget = e.detail.dropTarget;
		if (!dropTarget || !dropTarget.hasAttribute("tri-record-id")) {
			return;
		}
		if (dropTarget.getAttribute("class").indexOf("tri-interactive") < 0) {
			return;
		}
		var recordId = dropTarget.getAttribute("tri-record-id");
		this.graphic.clearAllAttachedClasses("drop-done");
		this.graphic.clearAllAttachedClasses("drop-enter");
		this.graphic.addAttachedClass(recordId, "drop-done");
		
		var dropSpaceValue = this._dropSpaceById[recordId];
		this.fire('drop', {dropTarget: dropSpaceValue,
						   dragTarget: e.detail.dragTarget});
						   
		if (this.spaceSelected) {
			var index = this.spaceSelected.indexOf(dropSpaceValue);
			if (index < 0) {
				this.push("spaceSelected", dropSpaceValue);
			} else {
				this.splice("spaceSelected", index, 1);
			}
		}
	},

    _handleCtmRefresh: function(e) {
		if (this.graphic.svgElement) {
			this._setupDragdrop(this._svgLoaded);
		}
	},

    _sameCoordinate: function(matrix, position) {
		if (this._matrix == null) return false;
		if (this._position == null) return false;
		if (this._matrix.a != matrix.a) return false;
		if (this._matrix.b != matrix.b) return false;
		if (this._matrix.c != matrix.c) return false;
		if (this._matrix.d != matrix.d) return false;
		if (this._matrix.e != matrix.e) return false;
		if (this._matrix.f != matrix.f) return false;
		if (this._position.left != position.left) return false;
		if (this._position.top != position.top) return false;
		return true;
	},

    /*
	 * Programmatically enable/disable graphic drop interaction.
	 * Parameter value is true to enable, false to disable
	 */
	updateEnabled: function(newValue, oldValue) {
		if ((typeof newValue != 'undefined') && (typeof oldValue != 'undefined')) {
			this.$.triDrop.updateEnabled(value);
		}	
	},

    ready: function() {
		var triplatGraphic = dom(this).parentNode;
		var drag_drop_plugin = triplatGraphic._findPlugin("triplat-graphic-drag-drop");
		if (drag_drop_plugin) {
			this.loadResource(this.$.triDrop, "../triplat-drag-drop/triplat-drop.js");
		}
	},

	importMeta: getModuleUrl("triplat-graphic/triplat-graphic-drag-drop.js")
});