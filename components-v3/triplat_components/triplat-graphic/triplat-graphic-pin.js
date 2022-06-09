/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { PinWorker } from "./triplat-graphic-pin-worker.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A plugin to enable pins on a graphic. A pin denotes the location of an entity on a graphic by showing an icon and an optional label. An entity can be anything that is located in a space of the floor plan like a person, asset or equipment.

This plugin should be used as an inner element of triplat-graphic. Example:

	<triplat-graphic record-id="[[floorId]]">
	  <triplat-graphic-pin
		pins="[[selectedPersons]]" icon="ibm:pin-person" 
		pin-size="32" show-label-onhover
		enabled="{{personsEnabled}}" class-number="1"
		slot="graphic-pin">
	  </triplat-graphic-pin>
	</triplat-graphic>

The pin icon will be placed in the center of the space. If the pin has a label, it will be shown as a tooltip when you tap the pin icon or optionally when you hover your cursor over it.

If there is more than one pin in the same space, a multiple pin icon will be shown. A counter inside the multiple pin icon indicates to the user how many pins are located in the same space.

The **pins** attribute receives the pin objects to be added to the graphic. Every pin object must have the ID of the space where the pin will be placed and optionally a label for the pin and the name of the space. The triplat-graphic-pin will look for the space ID using the attribute name defined by the **recordIdAttrName** property, will look for the label using the attribute name defined by the **labelAttrName** property and will look the space name using the attribute name defined by the **spaceAttrName** property.

For example, let's say you want to show pins that denote the location of persons on a graphic. In this case you will pass to triplat-graphic-pin an array of persons objects. Each person object must have an attribute containing ID of the space, and optionally an attribute containing the label and an attribute containing the space name. For this example, each person object has a **spaceId**, **name** and **spaceName** attributes.

	<triplat-graphic-pin 
		pins="[[selectedPersons]]" 
		record-id-attr-name="spaceId" label-attr-name="name"
		space-attr-name="spaceName">
	</triplat-graphic-pin>

One or more **tripat-graphic-pin** elements can be defined inside a **triplat-graphic**. 

### Styling

To style the pin icons and tooltips, you must apply the mixins and CSS properties on the triplat-graphic 
element.

Some mixins and CSS properties must be declared with a number suffix. The number suffix corresponds to the number defined by the **classNumber** property. The **classNumber** must be between 1 and 5 inclusive.

CSS example:
	
	<style>
		triplat-graphic {
			--triplat-graphic-pin-color-3: #562f72;
			--triplat-graphic-pin-tooltip: #e4c0fe;
			--triplat-graphic-pin-tooltip: black;
			--triplat-graphic-pin-tooltip: #562f72;
			--triplat-graphic-pin-tooltip: {
				font-size: 14px;
				font-weight: 600;
			};
		}
	</style>

Example:
	
	<triplat-graphic-pin 
		pins="[[selectedPersons]]" class-number="3">
	</triplat-graphic-pin>

Custom property | Description | Default
----------------|-------------|----------
`--triplat-graphic-pin-color-(classNumber)`  | The color of the pin icon                 | `--ibm-gray-60`
`--triplat-graphic-pin-tooltip-bg-color`     | The background color of the tooltip       | `--tri-primary-content-background-color`
`--triplat-graphic-pin-tooltip-text-color`   | The text color of the text of the tooltip | `--ibm-gray-60`
`--triplat-graphic-pin-tooltip-border-color` | The border color of the tooltip and the outline color of the pin when it is selected | `--tri-primary-light-color`
`--triplat-graphic-pin-tooltip-close-button-color` | The color of the button to close the tooltip | `--ibm-gray-60`
`--triplat-graphic-pin-tooltip-divider-line-color` | The color of the divider line between the head and the items in the tooltip | `--ibm-gray-10`
`--triplat-graphic-pin-tooltip-container`    | Mixin applied to the tooltip container    | `{}`
`--triplat-graphic-pin-tooltip`              | Mixin applied to the tooltip              | `{}`


@demo demo/triplat-graphic-pin-demo.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: "triplat-graphic-pin",

    properties: {

		/**
		 * The graphic on which the pins will be added. 
		 * Usually, this is automatically set by triplat-graphic.
		 */
		graphic: Object,

		/**
		 * An object containing the pins to be added to the graphic.
		 * It can be either an array or a single element. 
		 * Every pin object must have the ID of the space where the pin will be placed and optionally a label for the pin.
		 */
		pins: {
			type: Object,
			notify: false,
			readOnly: false
		},

		/**
		 * The name of the pin object attribute that contains the ID of the space where the pin will be placed.
		 */
		recordIdAttrName: {
			type: String,
			value: "_id"
		},

		/**
		 * The name of the pin object attribute that contains the label for the pin.
		 */
		labelAttrName: {
			type: String,
			value: "label"
		},

		/**
		 * The name of the pin object attribute that contains the name of the space where the pin will be placed.
		 */
		spaceAttrName: {
			type: String,
			value: "space"
		},

		/**
		 * The size in pixels of the pin icon.
		 */
		pinSize: {
			type: Number,
			value: 32
		},

		/**
		 * The name of the icon to use. The name should have the format: iconset_name:icon_name. 
		 * The iconset_name: can be omitted for the IBM icon set.
		 */
		icon: {
			type: String,
			value: "ibm:pin-multiples",
			observer: '_iconChanged'
		},

		/**
		 * A flag to enable this plugin. If this is omitted, then it will be 
		 * true and the plugin will be enabled.
		 */
		enabled: {
			type: Boolean,
			notify: true,
			readOnly: false,
			value: true
		},

		/**
		 * If true, the pin size will be scaled as the whole graphic is zoomed in or out.
		 * Otherwise, the pin size will be fixed and it will not be changed when the graphic is zoomed in or out.
		 */
		preservePinSizeRatio: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, the label of a pin will be shown as a tooltip when the user taps or hovers the cursor over the pin icon.
		 * Otherwise, the label will be shown only when the user taps the icon.
		 */
		showLabelOnhover: {
			type: Boolean,
			value: false
		},

		/**
		 * The number used for styling with mixins and CSS properties. It must be a number between 1 to 5 inclusive.  
		 */
		classNumber: {
			type: Number,
			readOnly: false,
			notify: false,
			value: 1,
			observer: "_onClassNumberChange"
		},

		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		},
		
		/**
		 * If true, this **triplat-graphic-pin** will be used only for configuring the multiple pin and 
		 * the following attributes will be ignored:
		 * - **enabled**
		 * - **labelAttrName**
		 * - **spaceAttrName**
		 * - **pins**
		 * - **recordIdAttrName**
		 *
		 * The multiple pin is shown when there is more than one pin in the same space. Inside the multiple pin there is a 
		 * counter indicating the number of pins located in that space.
		 */
		multiplePin: {
			type: Boolean,
			value: false
		},

		/**
		 *	Gets or sets the selected pin. The selected pin shows the tooltip in the graphic.
		 */
		selected: {
			type: Object,
			notify: true
		}
	},

    _DEFAULT_ICONSET: 'ibm',

    observers: [
		"_initializeGraphic(graphic)",
		"_handlePinsChanged(pins.*, _svgLoaded, enabled)",
		"_handleSelectedChanged(selected, _svgLoaded, enabled)"
	],

    _initializeGraphic: function(graphic) {
		if (!graphic._pinWorker) {
			graphic._pinWorker = new PinWorker();
			graphic._pinWorker.set("_graphic", graphic); 
			dom(graphic.root).appendChild(graphic._pinWorker);
		}

		if (this.multiplePin) {
			graphic._pinWorker.multiplePinSize = this.pinSize;
			graphic._pinWorker.multiplePinIconsetName = this._iconsetName;
			graphic._pinWorker.multiplePinIconName = this._iconName;
			graphic._pinWorker.preserveMultiplePinSizeRatio = this.preservePinSizeRatio;
			graphic._pinWorker.multiplePinShowLabelOnhover = this.showLabelOnhover;
			graphic._pinWorker.multiplePinClassNumber = this.classNumber;
		} else {
			this.listen(this.graphic, "pin-selected-change", "_handlePinSelectedChangeEvent");
		}

		this.listen(this.graphic, "svg-loaded", "_handleSvgLoadedChanged");
	},

    _handleSvgLoadedChanged: function(e) {
		this._set_svgLoaded(e.detail);
	},

    _iconChanged: function(icon) {
		var parts = (icon || '').split(':');
		this._iconName = parts.pop();
		this._iconsetName = parts.pop() || this._DEFAULT_ICONSET;
	},

    _onClassNumberChange: function(classNumber, oldClassNumber) {
		if (!classNumber || classNumber < 1 || classNumber > 5) {
			console.warn("triplat-graphic-pin: the classNumber must be a number from 1 to 5 inclusive. [classNumber=" + classNumber + "]");
		}
	},

    _handlePinsChanged: function(pins, svgLoaded, enabled) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!svgLoaded) {
			return;
		}

		if (this.multiplePin) {
			console.warn("triplat-graphic-pin: the pins and enabled attributes are ignored when the multiplePin property is used. ");
			return;
		}

		if (!enabled) {
			this._clearAllInternalPins();
			return;
		}

		if(pins.path == "pins"){
			this._clearAllInternalPins();
			this._addAllPins(pins.value);
		}

		if(pins.path == "pins.splices"){
			var indexSplice = pins.value.indexSplices[0];
			indexSplice.removed.forEach(function(removed) {
				this.graphic._pinWorker._removeInternalPin(this._createInternalPin(removed));
			}, this);
			for (var i = 0; i < indexSplice.addedCount; i++) {
				var added = indexSplice.object[indexSplice.index + i];
				this._addPin(added);
			}
		}
	},

    _handleSelectedChanged: function(selected,  svgLoaded, enabled) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!svgLoaded) {
			return;
		}

		if (!enabled) {
			this.selected = this._selected = null;
			return;
		}

		if (this.multiplePin) {
			return;
		}

		if (selected) {
			var internalPin = this._createInternalPin(selected);
			if (!this._selected || this._selected.key != internalPin.key) {
				this._selected = internalPin;
				if (this.graphic._pinWorker) {
					this.graphic._pinWorker._selectPin(internalPin);
				}
			}
		} else {
			if (this._selected) {
				this.graphic._pinWorker._deselectPin(this._selected);
				this._selected = null;
			}
		}
	},

    _handlePinSelectedChangeEvent: function(event) {
		if (this.multiplePin || !this.enabled) {
			return;
		}
		if (event.detail.key) {
			if (event.detail.iconName == this._iconName) {
				this._selected = event.detail;
				this.selected = event.detail.originalPin;
			} else {
				this.selected = this._selected = null;
			}
		} else {
			this.selected = this._selected = null;
		}
	},

    _addPin: function(pin) {
		var internalPin = this._createInternalPin(pin);
		this.graphic._pinWorker._addInternalPin(internalPin);
		if (this.selected && this._selected) {
			this.graphic._pinWorker._selectPin(this._selected);
		}
	},

    _addAllPins: function(pins){
		if(Array.isArray(pins)){
			pins.forEach(function(pin) {
				this._addPin(pin);
			}, this);
		} else if(pins){
			this._addPin(pins);
		}   
	},

    _createInternalPin: function(pin) {
		var label = this.get(this.labelAttrName,pin);
		if (!label) {
			label = "";
		}
		
		var spaceName = this.get(this.spaceAttrName,pin);
		if (!spaceName) {
			spaceName = "";
		}
		var spaceId = this.get(this.recordIdAttrName,pin);
		return {
			spaceId: spaceId, 
			label: label,
			iconName: this._iconName,
			iconsetName: this._iconsetName,
			classNumber: this.classNumber,
			showLabelOnhover: this.showLabelOnhover,
			preservePinSizeRatio: this.preservePinSizeRatio,
			pinSize: this.pinSize,
			spaceName: spaceName,
			key: spaceId+label+this._iconName,
			originalPin: pin
		}
	},

    _clearAllInternalPins: function() {
		this.graphic._pinWorker._removeInternalPins(this._iconName);
	}
});