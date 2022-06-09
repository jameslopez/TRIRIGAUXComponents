/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/paper-input/paper-input.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment tristyles-theme">


			paper-input {
				text-align: center;
				width: 44px;
				padding-left: 4px;
				padding-right: 4px;
			}

			.period-label{
				color: var(--ibm-gray-60);
			}
				
			paper-icon-button{
			height: 44px;
			width: 44px; 
			padding: 6px;
			color: var(--tri-actionable-color, var(--tri-primary-color));
			background-color: var(--tri-actionable-color-contrast, white);
			@apply --triplat-duration-period-counter-icon; 
		}

		
		</style>

	<div class="layout vertical">
		<span class="period-label">{{label}}</span>
		<div class="layout horizontal center-center">
			<paper-icon-button icon="ibm-glyphs:incremental-input-minus" on-tap="decreaseValue" aria-label\$="[[decreaseAriaLabel]]" disabled\$="[[_disableDecrementButton(loop, value)]]"></paper-icon-button>
			<paper-input value="{{value}}" on-change="_handleEdit" allowed-pattern="[0-9]" prevent-invalid-input="" no-label-float="" readonly="[[disableKeyboardInput]]">
			</paper-input>
			<paper-icon-button icon="ibm-glyphs:incremental-input-add" on-tap="increaseValue" aria-label\$="[[increaseAriaLabel]]" disabled\$="[[_disableIncrementButton(loop, value)]]"></paper-icon-button>
		</div>
	</div>
	`,

    is: "triplat-duration-period-counter",

    properties: {

		/**
		 * Calculated numeric value for a duration field. 
		 */
		value: {
			type: Number,
			notify: true
		},


		/**
		  * String value to be used for the duration period label.
		  */
		label: {
			type: String,
		},

		/*
		 * String value to be used for the increase icon ARIA label.
		 */
		increaseAriaLabel: {
			type: String,
		},

		/*
		 * String value to be used for the decrease icon ARIA label.
		 */
		decreaseAriaLabel: {
			type: String,
		},

		/*
		 * Optional minimum allowed for a value when a value is decreased. If a value is smaller than min, the value will immediately be changed to min.
		 */
		min: {
			type: Number,
			value: 0
		},

		/*
		 * Optional maximum allowed for a value when a value is increased. If a value is greater than max, the value will immediately be changed to max.
		 */
		max: {
			type: Number
		},

		/*
		 * Optional loop when a value is increased or decreased (between min and max). If a value is greater than max, the value will immediately be changed to min.
		 * If a value is smaller than min, the value will immediately be changed to max. Requires max value.
		 */
		loop: {
			type: Boolean,
			value: false
		},

		/*
		 * Amount to add or subtract when incrementing or decrementing.
		 */
		step: {
			type: Number,
			value: 1
		},
		
		/*
		 * If true, the keyboard input is disabled and the user can only change the duration by using the minus and plus buttons.
		 */
		disableKeyboardInput: {
			type: Boolean, 
			value: false
		}
	},

    _disableDecrementButton: function(loop, value) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (loop) return false;
		var value = Number(value);
		if (isNaN(value)) return true;
		if (value <= Number(this.min)) return true;
		return false;
	},

    _disableIncrementButton: function(loop, value) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (loop) return false;
		var value = Number(value);
		if (isNaN(value)) return true;
		if (value >= Number(this.max)) return true;
		return false;
	},

    /**
	  * Increase the value of a duration period by a given step.
	  * If max value is set, duration value cannot exceed it.
	  * If loop is set and duration value exceeds max, then set duration value to min.
	  */
	increaseValue: function(){
		this.value = Number(this.value) + Number(this.step);
		if(this.max != null) {
			if(this.loop){
				//loop value min to max
				this.value = (this.value > this.max ) ? Number(this.min) : this.value;
			} else {
				//value no bigger then max
				this.value = (this.value > this.max ) ? Number(this.max) : this.value;
			}
		}
	},

    /**
	  * Decrease the value of a duration period by a given step.
	  * Duration value cannot be smaller than min (or zero).
	  * If loop is set and duration value is smaller than min, then set duration value to max.
	  */
	decreaseValue: function(){
		this.value = Number(this.value) - Number(this.step);
		if(this.max != null && this.loop) {
			//loop value min to max
			this.value = (this.value < this.min || this.value > this.max) ? Number(this.max) : this.value;
		} else {
			//value no smaller then min
			this.value = (this.value < this.min ) ? Number(this.min) : this.value;
		}
	},

    _handleEdit: function(){
		var numberValue = parseInt(this.value);
		if(isNaN(numberValue)) {
			//value not a number, set value to the min
			this.value = this.min;
		} else {
			//Set typed value as numeric instead of string.
			//It also handle the case of value contains mix of letter and number, set to number value
			this.value = numberValue;
		}
	}
});