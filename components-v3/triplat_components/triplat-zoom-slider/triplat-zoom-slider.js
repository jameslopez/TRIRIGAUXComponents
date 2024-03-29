/*
IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/paper-slider/paper-slider.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
The `triplat-zoom-slider` is a custom element that allows the user to select a value from a range of values by moving the slider thumb or pressing the increase or decrease icons. The component can be used as a zoom slider of the `triplat-graphic-zoomable`. 

	<triplat-zoom-slider min="0.01" max="1.5" step="0.1" value="{{_zoomScale}}">
	</triplat-zoom-slider>
	
	<triplat-graphic record-id="10101010">
	  <triplat-graphic-zoomable scale="{{_zoomScale}}" cached></triplat-graphic-zoomable>
	</triplat-graphic>

### Styling

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-zoom-slider-container` | Style for the zoom slider | `{}`


@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					@apply --layout;
					@apply --layout-horizontal;
					@apply --layout-center-center;
					@apply --triplat-zoom-slider;
				}

				.slider {
					--paper-slider-active-color: var(--tri-secondary-color);
					--paper-slider-knob-start-color: var(--tri-primary-color);
					--paper-slider-knob-start-border-color: var(--tri-primary-color);
					--paper-slider-knob-color: var(--tri-primary-color);
					--paper-slider-secondary-color: var(--tri-secondary-color);
					@apply --layout;
					@apply --layout-flex;
				}
			
		</style>

			<paper-icon-button primary="" icon="ibm-glyphs:incremental-input-minus" on-tap="increaseValue" disabled\$="[[_disableDecrementButton]]" alt="Zoom out">
			</paper-icon-button>
			<paper-slider id="slider" class="slider" min="[[_normalizedMin]]" max="[[_normalizedMax]]" on-immediate-value-change="_handleSliderValueChange" on-change="_handleSliderValueChange" aria-label="Slide to zoom">
			</paper-slider>
			<paper-icon-button primary="" icon="ibm-glyphs:incremental-input-add" on-tap="decreaseValue" disabled\$="[[_disableIncrementButton]]" alt="Zoom in">
			</paper-icon-button>
	`,

    is: "triplat-zoom-slider",

    properties : {
		/**
		  * Optional minimum allowed for a value when a value is decreased.
		  */
		min: {
			type: Number,
			value: 0
		},
		/**
		  * Optional maximum allowed for a value when a value is increased.
		  */
		max: {
			type: Number,
			value: 100
		},

		/*
		 * Amount to add or subtract when increasing or decreasing a value.
		 */
		step: {
			type: Number,
			value: 10
		},

		/**
		 * Numeric value for the zoom slider. 
		 */
		value: {
			type: Number,
			value: 50,
			notify: true
		},

		_normalizingFactor: {
			type: Number,
			value: 1,
			computed: "_computeNormalizingFactor(min, max)"
		},

		_normalizedMin: {
			type: Number,
			computed: "_computeNormalizedMin(max, _normalizingFactor)"
		},

		_normalizedMax: {
			type: Number,
			computed: "_computeNormalizedMax(min, _normalizingFactor)"
		}
	},

    observers: [
		"_updateSlideValue(value, _normalizingFactor)",
		"_checkValueLimits(value, min, max)"
	],

    /**
	  * Increase the value by a given step.
	  * If max value is set, value cannot be larger than max.
	  */
	increaseValue: function() {
		var value = this.value + this.step;
		this.value = value > this.max ? this.max : value;
	},

    /**
	  * Decrease the value by a given step.
	  * If min value is set, value cannot be smaller than min.
	  */
	decreaseValue: function() {
		var value = this.value - this.step;
		this.value = value < this.min ? this.min : value;
	},

    _computeNormalizedMin: function(value, _normalizingFactor) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return value * _normalizingFactor * -1;
	},

    _computeNormalizedMax: function(value, _normalizingFactor) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return value * _normalizingFactor * -1;
	},

    _handleSliderValueChange: function() {
		this.value = this.$.slider.immediateValue / this._normalizingFactor * -1;
	},

    _updateSlideValue: function(value, _normalizingFactor) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this.$.slider.value = value * _normalizingFactor * -1;
	},

    _checkValueLimits: function(value, min, max) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (value < min) {
			this.value = min;
		} else if (value > max) {
			this.value = max;
		}
	},

    _computeNormalizingFactor: function(min, max) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var minDecimalPlaces = this._decimalPlaces(min);
		var maxDecimalPlaces = this._decimalPlaces(max);
		return Math.pow(10, Math.max(minDecimalPlaces, maxDecimalPlaces, 1));
	},

    _decimalPlaces: function(num) {
		if(Math.floor(num) === num) return 0;
		return num.toString().split(".")[1].length || 0; 
	},
});