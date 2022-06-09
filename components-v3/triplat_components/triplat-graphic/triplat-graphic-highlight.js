/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
export const TriplatHighlightLayers = {};
TriplatHighlightLayers.INTERACTIVE = "INTERACTIVE";
TriplatHighlightLayers.ATTACHED = "ATTACHED";

/*
A plugin to enable highlights on a graphic. It should be used as an inner element of triplat-graphic.

	<triplat-graphic record-id="15294509">

			<triplat-graphic-highlight 
					class-number="2"
					highlighted="{{floor.floorSpacesH1}}"
					slot="graphic-highlight">
			</triplat-graphic-highlight>

	</triplat-graphic>

# Styling

Style the highlighted shapes using the --triplat-graphic-highlight- mixin on the triplat-graphic 
element. The number of the variable corresponds to the property classNumber of the 
triplat-graphic-highlight component.  The classNumber must be between 1 and 5 inclusive.

Example:
	
	triplat-graphic { 
		 --triplat-graphic-highlight-2: {
			  fill: #8CD211;
			  fill-opacity: 1;
		 };
	}

Custom property | Description | Default
----------------|-------------|----------
`--triplat-graphic-highlight-1` | Mixin for shapes highlighted with class-number="1" | `{}`
`--triplat-graphic-highlight-2` | Mixin for shapes highlighted with class-number="2" | `{}`
`--triplat-graphic-highlight-3` | Mixin for shapes highlighted with class-number="3" | `{}`
`--triplat-graphic-highlight-4` | Mixin for shapes highlighted with class-number="4" | `{}`
`--triplat-graphic-highlight-5` | Mixin for shapes highlighted with class-number="5" | `{}`

*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: "triplat-graphic-highlight",

    properties: {

		/**
		 * The graphic on which the shapes will be highlighted. 
		 * 
		 * Usually, this is automatically set by triplat-graphic
		 */
		graphic: Object,

		/**
		 * NOTE: this property is deprecated.
		 * A css class to be applied to the highlighted shapes.
		 */
		classname: {
			type: String,
			readOnly: false,
			notify: false,
			observer: "_onClassnameChange"
		},

		/**
		 * The number used for styling using a mixin. See above.
		 */
		classNumber: {
			type: Number,
			readOnly: false,
			notify: false,
			value: 1,
			observer: "_onClassNumberChange"
		},

		/**
		 * An object containing the shapes to be highlighted.
		 * It can be either an array or a single element
		 */
		highlighted: {
			type: Object,
			notify: false,
			readOnly: false,
		},
		
		/**
		 * Sets the spaces layer that will be highlighted by this plugin.
		 * There are two options:
		 * - INTERACTIVE: highlights the interactive (top) layer of the graphic.
		 * - ATTACHED: highlights the attached layer of the graphic.
		 */
		highlightLayer: {
			type: String,
			value: TriplatHighlightLayers.ATTACHED
		},
		
		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		}
	},

    observers: [
		"_initializeGraphic(graphic)",
		"_changeHighlighted(highlighted.*, _svgLoaded)"
	],

    _initializeGraphic: function(graphic) {
		this.listen(graphic, "svg-loaded", "_handleSvgLoadedChanged");
	},

    _changeHighlighted: function(change, svgLoaded){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!svgLoaded) {
			return;
		}

		if(change.path == "highlighted"){
			this._clearClasses();
			this._addHighlight(change.value);
		}

		if(change.path == "highlighted.splices"){
			var indexSplice = change.value.indexSplices[0];
			indexSplice.removed.forEach(function(removed) {
				this._removeClass(removed._id);
			}, this);
			for (var i = 0; i < indexSplice.addedCount; i++) {
				var added = indexSplice.object[indexSplice.index + i];
				this._addClass(added._id);
			}
			this._forceMicrosoftStyleUpdate();
		}
	},

    _forceMicrosoftStyleUpdate: function() {
		/*
		 * In IE and Edge sometimes the style is not applied, accessing the offsetWidth forces 
		 * the browser to update the styles.
		 */
		this.graphic.getSvgContainer().offsetWidth;
	},

    _clearClasses: function() {
		if (this.classname) {
			this.graphic.clearAllAttachedClasses(this.classname);
		}
		this.graphic.clearAllAttachedClasses(this._getClassName());
	},

    _addClass: function(id) {
		var interactiveLayer = this.highlightLayer == TriplatHighlightLayers.INTERACTIVE;
		if (this.classname) {
			this.graphic.addClass(id, this.classname, interactiveLayer);
		}
		this.graphic.addClass(id, this._getClassName(), interactiveLayer);
	},

    _removeClass: function(id) {
		if (this.classname) {
			this.graphic.removeAttachedClass(id, this.classname);
		}
		this.graphic.removeAttachedClass(id, "tri-highlight-" + this.classNumber);
	},

    _getClassName: function() {
		return "tri-highlight-" + this.classNumber;
	},

    _handleSvgLoadedChanged: function(e){
		this._set_svgLoaded(e.detail);
	},

    _onClassNumberChange: function(classNumber, oldClassNumber) {
		if (!classNumber || classNumber < 1 || classNumber > 5) {
			console.warn("triplat-graphic-highlight: the classNumber must be a number from 1 to 5 inclusive. [classNumber=" + classNumber + "]");
		}
		if(oldClassNumber){
			this.graphic.clearAllAttachedClasses("tri-highlight-" + oldClassNumber);
			this._addHighlight(this.highlighted);
		}
	},

    _addHighlight: function(highlighted){
		if(Array.isArray(highlighted)){
			highlighted.forEach(function(highlight){
				this._addClass(highlight._id);
			}, this);
		} else if(highlighted){
			this._addClass(highlighted._id);
		}
		this._forceMicrosoftStyleUpdate();    
	},

    _onClassnameChange: function() {
		console.warn("triplat-graphic-highlight: classname is deprecated.");
	}
});