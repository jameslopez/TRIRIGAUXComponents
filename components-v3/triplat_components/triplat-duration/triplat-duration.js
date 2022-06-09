/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-input/paper-input-container.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../@polymer/iron-media-query/iron-media-query.js";
import "../triplat-theme/triplat-theme.js";
import { TriplatInputContainerBehavior } from "../triplat-input-container-behavior/triplat-input-container-behavior.js";
import { triPlatDuration, TriPlatDurationBehavior } from "./triplat-duration-behavior.js";
import "./triplat-duration-picker.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component that accepts a numeric duration value and transforms it into a readable formatted string. The component 
provides an input box with a duration icon. The input box is read-only and displays the duration periods and values. Clicking on the icon 
brings up a duration dialog and allows you to change the duration values. Once the new values are selected, a new numeric
duration value is generated so it can be saved. 

The duration periods are configurable. By default, the years, months, weeks, days, hours, minutes and seconds are displayed. 

	<triplat-duration value="{{value}}"></triplat-duration>

Example of using a label and displaying year, month, and day. 

	<triplat-duration 
	  value="{{value}}" 
	  label="Duration" 
	  display-tokens="y:M:d"></triplat-duration>

The duration periods have default settings for minimum and maximum value, increase and decrease step, and looping functionality (see the default settings for each period below).
If needed, these default settings can be modified. Here is an example of modifying the default settings for the year, month, and minute. The year is set with a maximum value of 5 and looping enabled (1). The month 
is set with looping disabled (0). The minute is set with an increase and decrease step of 15.

	<triplat-duration 
	  value="{{value}}" 
	  label="Duration" 
	  year-max=5
	  year-loop=1
	  month-loop=0
	  minute-step=15></triplat-duration>

Example of using custom label. In order for an element to be considered as a label, it must have the `label` slot.

	<triplat-duration value="{{value}}">
	  <iron-icon slot="label" icon="icons:hourglass-empty"></iron-icon>
	  <span slot="label">Duration</span>
	</triplat-duration>

Note: The 'label' property value will be overridden when using a custom 'label'. <br/>

### Styling

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-duration-width` | Width of the duration field | `100%`
`--triplat-duration-clock-time-icon` | Mixin applied to the clock icon | `{color: var(--tri-primary-color); background-color: white; cursor: pointer;}`
`--triplat-duration-period-counter-icon` | Mixin applied to the decrease and increase icons | `{color: var(--tri-primary-color); background-color: white; cursor: pointer;}`
`--triplat-duration-done-button` | Mixin applied to the done button | `{}`
`--triplat-duration-cancel-button` | Mixin applied to the cancel button | `{}`

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment tristyles-theme">

		
			.triplat-duration-div {
				@apply --layout;
				@apply --layout-horizontal;
				width: var(--triplat-duration-width, 100%);
			}

			paper-input-container {
				--paper-input-container-input: {
					color: inherit;
					font-size: inherit;
				};
			}
			:host([no-underline]) paper-input-container {
				--paper-input-container-underline: {
					display: none;
				};
			}

			.clock-time-icon {
				padding: 0px;
				bottom: 2px;
				height: 24px;
				width: 24px;
				color: var(--tri-actionable-color, var(--tri-primary-color));
				background-color: var(--tri-actionable-color-contrast, white);
				cursor: pointer;
				@apply --triplat-duration-clock-time-icon;
			}

			.__triplatDurationPicker {
				top: var(--triplat-duration-picker-position-top);
				left: var(--triplat-duration-picker-position-left);
				position: var(--triplat-duration-picker-position);
			}

			
			input {

			@apply --paper-input-container-shared-input-style;

		}

		
		</style>

		<iron-media-query query="max-width: 414px" query-matches="{{phone}}"></iron-media-query>

		<div class="triplat-duration-div">
			<paper-input-container class="flex" no-label-float="[[noLabelFloat]]">
				<label id="[[_labelId]]" for\$="[[_inputId]]" slot="label">[[label]]<slot id="labelContent" name="label"></slot></label>
				<iron-input id="[[_inputId]]" bind-value="{{_displayValue(value)}}" slot="input">
					<input readonly="" aria-labelledby\$="[[_labelId]]">
				</iron-input>
				<template is="dom-if" if="{{!readonly}}">
					<paper-icon-button suffix="" class="clock-time-icon" icon="ibm:clock-time" id="durationPickerButton" on-tap="_openDurationPicker" aria-label\$="{{_setPickerAriaLabel(label)}}" slot="suffix"></paper-icon-button>
				</template>

			</paper-input-container>
		</div>
		<triplat-duration-picker class="__triplatDurationPicker" id="durationPicker" display-tokens="{{displayTokens}}" value="{{value}}" year-min\$="[[yearMin]]" year-max\$="[[yearMax]]" year-step\$="[[yearStep]]" year-loop\$="[[yearLoop]]" month-min\$="[[monthMin]]" month-max\$="[[monthMax]]" month-step\$="[[monthStep]]" month-loop\$="[[monthLoop]]" week-min\$="[[weekMin]]" week-max\$="[[weekMax]]" week-step\$="[[weekStep]]" week-loop\$="[[weekLoop]]" day-min\$="[[dayMin]]" day-max\$="[[dayMax]]" day-step\$="[[dayStep]]" day-loop\$="[[dayLoop]]" hour-min\$="[[hourMin]]" hour-max\$="[[hourMax]]" hour-step\$="[[hourStep]]" hour-loop\$="[[hourLoop]]" minute-min\$="[[minuteMin]]" minute-max\$="[[minuteMax]]" minute-step\$="[[minuteStep]]" minute-loop\$="[[minuteLoop]]" second-min\$="[[secondMin]]" second-max\$="[[secondMax]]" second-step\$="[[secondStep]]" second-loop\$="[[secondLoop]]" millisecond-min\$="[[millisecondMin]]" millisecond-max\$="[[millisecondMax]]" millisecond-step\$="[[millisecondStep]]" millisecond-loop\$="[[millisecondLoop]]" restore-focus-on-close=""></triplat-duration-picker>
	`,

    is: "triplat-duration",

    /**
	 * Fired after a duration value change.
	 *
	 * @event triplat-duration-change
	 */


	behaviors: [TriPlatDurationBehavior,
		TriplatInputContainerBehavior],

    properties: {

		/**
		 * Calculated numeric value for a duration field. 
		 */
		value: {
			type: Number,
			notify: true,
			observer: "_valueChanged"
		},

		/**
		  * String value to be used for the duration label.
		  */
		label: {
			type: String,
			value: null
		},

		/**
		 * String value to indicate which duration periods to display.
		 * Available duration periods are: <br>
		 * y - year <br>
		 * M - month <br>
		 * w - week <br>
		 * d - day <br>
		 * h - hour <br>
		 * m - minute <br>
		 * s - second <br>
		 * S - millisecond
		 */
		displayTokens: {
			type: String,
			notify: false,
			value: "y:M:w:d:h:m:s"
		},

		/** 
		  * Boolean value to indicate that this is a read-only duration value. Show
		  * the value, but not the duration picker icon.
		  */
		readonly: {
			type: Boolean,
			value: false
		},

		/** 
		  * Set to true to disable the floating label.
		  */
		noLabelFloat: {
			type: Boolean,
			value: false
		},

		/** 
		  * Set to true to remove the underline.
		  */
		noUnderline: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		}

	},

    attached: function(){
		if(dom(this.$$('#labelContent')).getDistributedNodes().length >0){
			this.label=" ";
		}
	},

    _openDurationPicker: function () {
		if(this.phone || this._isMobileDevice()){
			this._openInMobileDevice(this.$.durationPicker);
		}else{
			this._openInNonMobileDevice(this.$.durationPicker, this.$$("#durationPickerButton"));
		}

		this.$.durationPicker.openPicker();
		this._handleBrowserResize();
	},

    _openInNonMobileDevice: function(durationPicker, durationPickerButton){
		durationPicker.style.position = "fixed";
		durationPicker.style.top = durationPickerButton.getBoundingClientRect().top+"px";
		durationPicker.style.left = durationPickerButton.getBoundingClientRect().left+"px";
		
		//Cannot compute the actual size of a hidden element. Calculate height base on the number of periods displayed.
		var numOfPeriods = (durationPicker.displayTokens && durationPicker.displayTokens.length>0)? durationPicker.displayTokens.split(':').length:0;
		var durationPickerHeight = 140 + numOfPeriods*60; //140 is dialog padding, title and buttons
		var durationPickerWidth = 260;
		
		//position the dialog to the right of the picker button
		var _top = durationPicker.style.top;
		var _left= durationPicker.style.left;
		var _position = durationPicker.style.position;
		
		//check if there is enough space on the right side of the picker button to display the dialog
		if (window.innerWidth - durationPickerButton.getBoundingClientRect().left < durationPickerWidth){
			//display the dialog on the left side of the picker button
			var newWPosition = durationPickerButton.getBoundingClientRect().left - durationPickerWidth;
			if(newWPosition<0){
				newWPosition = 0;
			}
			durationPicker.style.left = newWPosition + "px";
			_left = durationPicker.style.left;
		}
		
		//check if there is enough space below the picker button to display the dialog
		if (window.innerHeight - durationPickerButton.getBoundingClientRect().top <= durationPickerHeight){
			//display the dialog above the picker button
			var newHPosition = durationPickerButton.getBoundingClientRect().top - durationPickerHeight;
			if(newHPosition<0){
				newHPosition = 0;
			}
			durationPicker.style.top = newHPosition + "px";
			_top = durationPicker.style.top;
		}

		this._handleTriplatDurationPickerPosition(_top, _left, _position);
	},

    _openInMobileDevice: function(durationPicker){
		//on small screen and mobile devices the dialog is displayed in the center
		durationPicker.resetFit();
		durationPicker.style.position = '';
		durationPicker.style.top = '';
		durationPicker.style.left = '';

		var _top = durationPicker.style.top;
		var _left= durationPicker.style.left;
		var _position = durationPicker.style.position;
		this._handleTriplatDurationPickerPosition(_top, _left, _position);
	},

    _handleTriplatDurationPickerPosition: function(_top, _left, _position){
	    this.updateStyles({
		    "--triplat-duration-picker-position-top": _top + " !important",
		    "--triplat-duration-picker-position-left": _left + " !important",
		    "--triplat-duration-picker-position": _position + " !important"
		});
	},

    _isMobileDevice: function () {
		if( navigator.userAgent.match(/Android/i)
			 || navigator.userAgent.match(/webOS/i)
			 || navigator.userAgent.match(/iPhone/i)
			 || navigator.userAgent.match(/iPad/i)
			 || navigator.userAgent.match(/iPod/i)
			 || navigator.userAgent.match(/BlackBerry/i)
			 || navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		}
		else {
			return false;
		}
	},

    _displayValue: function (durationValue) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(durationValue == null) {
			return "";
		}

		var displayedDuration = this.getDisplayedDuration(durationValue, this.displayTokens);
		var formatDisplayedDuration = this.formatDisplayedDuration(displayedDuration);
		return formatDisplayedDuration;
	},

    _valueChanged:function(){
		this.fire("triplat-duration-change", {value: this.value});
	},

    _keyPressHandlerOpenDuration: function(event) {
		var code = event.keyCode;
		// accept enter or spacebar
		if (code == 13 || code == 32) {
			this.$.durationPicker.openPicker();
		}
	},

    /**
	  * Return a calculated end datetime for a given start datetime by adding the current duration periods.
	  */
	getCalculatedEndDateTime: function(startDateTime) {
		if(this.value == null) {
			return startDateTime;
		}

		var displayedDuration = this.getDisplayedDuration(this.value, this.displayTokens);
		var endDateTime = new Date(startDateTime.getTime());

		//append each displayed duration period value to the date
		if(displayedDuration.years>0){
			endDateTime.setFullYear(endDateTime.getFullYear() + displayedDuration.years);
		}
		if(displayedDuration.months>0){
			endDateTime.setMonth(endDateTime.getMonth() + displayedDuration.months);
		}
		if(displayedDuration.weeks>0){
			endDateTime.setHours(endDateTime.getHours() + displayedDuration.weeks*7*24); //there is no d.setWeeks()
		}
		if(displayedDuration.days>0){
			endDateTime.setHours(endDateTime.getHours() + displayedDuration.days*24); //there is no d.setDays()
		}
		if(displayedDuration.hours>0){
			endDateTime.setHours(endDateTime.getHours() + displayedDuration.hours);
		}
		if(displayedDuration.minutes>0){
			endDateTime.setMinutes(endDateTime.getMinutes() + displayedDuration.minutes);
		}
		if(displayedDuration.seconds>0){
			endDateTime.setSeconds(endDateTime.getSeconds() + displayedDuration.seconds);
		}
		if(displayedDuration.milliseconds>0){
			endDateTime.setMilliseconds(endDateTime.getMilliseconds() + displayedDuration.milliseconds);
		}

		return endDateTime;
	},

    _setPickerAriaLabel: function(val){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!val) {
		return "";
		}

		return "Select " + val;
	},

    _handleBrowserResize: function(){
		var self = this;
		window.onresize = function(){
			self._openInMobileDevice(self.$$("#durationPicker"));
		} 
	}
});