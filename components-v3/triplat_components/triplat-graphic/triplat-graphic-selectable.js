/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriplatGraphicSelectableBehavior } from "./triplat-graphic-selectable-behavior.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A plugin to enable selections on a graphic. It should be used as an inner element of triplat-graphic.

	<triplat-graphic record-id="15294509">

	  <triplat-graphic-selectable
		  slot="graphic-selectable"
		  selectable="{{floor.floorSpaces}}"
		  selected="{{selected}}"
		  multi>
	  </triplat-graphic-selectable>

	</triplat-graphic>

# Styling

Style the selected/selectable/non-selectable shapes using mixins on the triplat-graphic element. 

Example:
	
	 triplat-graphic {
		  --triplat-graphic-selected: {
			   fill: #5AAAFA;
			   fill-opacity: 1;
		  };
		  --triplat-graphic-selectable: {
			   fill: #C7C7C7;
			   fill-opacity: 1;
			   cursor: pointer;
		  };
		  --triplat-graphic-non-selectable: {
			   fill: white;
			   fill-opacity: 1;
		  }
	 }

Custom property | Description | Default
----------------|-------------|----------
`--triplat-graphic-selected`               | Mixin for shapes that are selected                          | `{}`
`--triplat-graphic-interactive-selected`   | Mixin for interactive(top layer) shapes that are selected   | `{}`
`--triplat-graphic-selectable`             | Mixin for shapes that are selectable                        | `{}`
`--triplat-graphic-interactive-selectable` | Mixin for interactive(top layer) shapes that are selectable | `{}`
`--triplat-graphic-non-selectable`         | Mixin for shapes that are attached, but not selectable      | `{}`
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: "triplat-graphic-selectable",

    behaviors: [
		TriplatGraphicSelectableBehavior
	],

    properties: {

		/**
		 * The graphic on which the selectable shapes will perform actions against. 
		 * 
		 * Usually, this is automatically set by triplat-graphic.
		 */
		graphic: Object,

		/**
		 * If the multi option is not present, this will give access to the 
		 * selected record.
		 *
		 * If the multi option is present, this will give access to an array
		 * of selected records.
		 */
		selected: {
			type: Object,
			notify: true,
			readOnly: false
		},

		/**
		 * A flag to enable multi select of shapes. If this is omitted it will be 
		 * single select.
		 */
		multi: {
			type: Boolean,
			nofity: false,
			readOnly: false
		},
		
		/**
		 * A flag that will indicate if the selectable spaces are loaded. 
		 */
		selectableLoaded: {
			type: Boolean,
			readOnly: true,
			value: false,
			notify: true
		},
		
		/**
		 * A flag to enable this plugin. If this is omitted it will be 
		 * true and the plugin will be enabled.
		 */
		enabled: {
			type: Boolean,
			readOnly: false,
			value: true,
			observer: "_enabledChanged"
		},
		
		/**
		 * A flag to indicate the selectable styles will be
		 * maintained even though this plugin is disabled
		 */
		keepSelectableStyle: {
			type: Boolean,
			value: false
		},
		
		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false,
		},
		
	},

    observers: [
		"_initializeGraphic(graphic)",
		"_initializeSelected(selected.*, _svgLoaded)",
		"_handleSelectableByIdChanged(_selectableById, _svgLoaded)",
	],

    ready: function() {
		if (this.multi) {
			this.set("selected", []);
		}
	},

    _initializeGraphic: function(graphic) {
		this.listen(graphic, "svg-loaded", "_handleSvgLoadedChanged");
	},

    _handleSelectableByIdChanged: function(_selectableById, svgLoaded) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setSelectableLoaded(false);

		if (!svgLoaded || !this.enabled) {
			return;
		}

		this.graphic.clearAllAttachedClasses("selectable");

		if (!_selectableById || Object.keys(_selectableById).length == 0) {
			return;
		}

		for (var recordId  in _selectableById) {
			this.graphic.addAttachedClass(recordId, "selectable");
		}

		this._setSelectableLoaded(true);
	},

    _initializeSelected: function(selected, svgLoaded) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!svgLoaded || !this.enabled) {
			return;
		}

		if (this.multi) {
			this._initializeMultiSelected(selected);
		} else {
			var selectedValue = selected.value;
			this._initializeSingleSelected(selectedValue);
		}
	},

    _initializeSingleSelected: function(selected) {
		this._selectSingle(selected);
	},

    _initializeMultiSelected: function(selected) {
		this._selectMulti(selected);
	},

    _selectSingle: function(selected) {
		this.graphic.clearAllAttachedClasses("selected");
		if (selected) {
			this.graphic.addAttachedClass(selected._id, "selected");
		}
	},

    _selectMulti: function(selected) {
		
		if (selected.path == "selected.splices") {
			var indexSplice = selected.value.indexSplices[0];
			indexSplice.removed.forEach(function(removed) {
				this.graphic.removeAttachedClass(removed._id, "selected");
			}, this);
			for (var i = 0; i < indexSplice.addedCount; i++) {
				var added = indexSplice.object[indexSplice.index + i];
				this.graphic.addAttachedClass(added._id, "selected");
			}
		} else if(selected.path == "selected" && selected.value && selected.value.length > 0){
			
			if(selected.value[selected.value.length-1]._isBoundSelected){
				selected.value.forEach(function(elem){
					if(elem._isBoundSelected){
						var index = this.selected.indexOf(elem);
						this._handleTapByRecordId(elem._id, index);
					}
				}, this);
			   return;
			}
			
			this.graphic.clearAllAttachedClasses("selected");
			selected.value.forEach(function(elem){
				this.graphic.addAttachedClass(elem._id, "selected");
			}, this);
		}
	},

	handleTap: function(target) {
		if (!this.enabled) {
			return;
		}

		if (!target.triRecordId) {
			return;
		}
		if (target.class.indexOf("tri-interactive") < 0) {
			return;
		}

		this._handleTapByRecordId(target.triRecordId);
	},

    _handleTapByRecordId: function(recordId, boundingIndex){
		if (!(recordId in this._selectableById)) {
			return;
		}

		var selectedValue = this._selectableById[recordId];

		if (this.multi) {
			var index = this.selected.indexOf(selectedValue);
			if (index < 0) {
				if(boundingIndex >= 0){
					this.splice("selected", boundingIndex, 1, selectedValue);
				} else {
				   this.push("selected", selectedValue);
				}
			} else {
				this.splice("selected", index, 1);
			}
		} else {
			if (this.selected && this.selected._id == recordId) {
				this.set("selected", null);
			} else {
				this.set("selected", selectedValue);
			}
		}
	},

    _handleSvgLoadedChanged: function(e){
		this._set_svgLoaded(e.detail);
	},

    _enabledChanged: function(value){
		if(!this.graphic){
			return;
		}
		if(value){
			this._handleSelectableByIdChanged(this._selectableById, this._svgLoaded);
			this._initializeSelected(this.selected, this._svgLoaded);
		} else {
			if(!this.keepSelectableStyle){
				this.graphic.clearAllAttachedClasses("selectable");
			}
			this.graphic.clearAllAttachedClasses("selected");
		} 
	}
});