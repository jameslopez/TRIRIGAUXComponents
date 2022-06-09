/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/paper-input/paper-input.js";
import "../@polymer/paper-button/paper-button.js";
import "../triplat-icon/triplat-icon.js";
import { IronOverlayBehaviorImpl, IronOverlayBehavior } from "../@polymer/iron-overlay-behavior/iron-overlay-behavior.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { triPlatDuration, TriPlatDurationBehavior } from "./triplat-duration-behavior.js";
import "./triplat-duration-period-counter.js";

Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment tristyles-theme">

			:host {
			background-color: #fff;
			border: 1px solid #ccc;
				padding-top: 20px;
				padding-bottom: 20px;
				overflow: auto;
			}

			.rtl-picker {
				padding-right: 20px;
				padding-left: 14px;
			}

			.ltr-picker {
				padding-right: 14px;
				padding-left: 20px;
			}

			.periods {
				box-sizing: border-box;
				max-width: 100%;
				padding-top: 14px;
				padding-bottom: 24px;
				overflow: auto; 
				font-size: 14px;
				overflow: visible;
			}
			
			#cancelButton {
				height: 40px;
				background-color: white;
				color: var(--tri-primary-color);
				border: 1px solid var(--tri-primary-color);
				-moz-border-radius: 0px;
				-webkit-border-radius: 0px;
				border-radius: 0px;
				text-transform: none;
				--paper-button-flat-keyboard-focus: {
					border-width: 3px !important;
				};
				@apply --triplat-duration-cancel-button;  
			}

			#doneButton {
				height: 40px;
				background-color: var(--tri-primary-color);
				color: white;
				-moz-border-radius: 0px;
				-webkit-border-radius: 0px;
				border-radius: 0px;
				text-transform: none;
				@apply --triplat-duration-done-button;  
			}

			.ltr-done-button {
				margin-right: 10px;
			}
			
			.rtl-done-button {
				margin-left: 10px;
			}
			
			.header {
				margin: 0;
				font-size: 16px;
				font-weight: bold;
				letter-spacing: 0.02em;
				text-align: left;
				color: var(--ibm-gray-60);
			}

			paper-input {
				text-align: center;
				width: 50px;
				margin-top: -2em;
			}

			paper-button:not([raised]).paper-button-0.keyboard-focus{
				border-style: none;
			}

			.period-label{
				width: 80px;
			}
			
			triplat-duration-period-counter {
				@apply --layout-flex;
			}
				
		
		</style>

	<div id="picker">
		<div class="layout horizontal">
			<div class="flex relative">
				<span class="header">Duration</span>
			</div>
		</div>

		 <div class="periods layout vertical">

			<div class="layout horizontal" hidden\$="{{!isDisplayYears(displayTokens)}}">
				<triplat-duration-period-counter label="Years:" value="{{year}}" min\$="[[yearMin]]" max\$="[[yearMax]]" step\$="[[yearStep]]" loop\$="[[isLoop(yearLoop)]]" increase-aria-label="{{increaseYears}}" decrease-aria-label="{{decreaseYears}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>

			<div class="layout horizontal" hidden\$="{{!isDisplayMonths(displayTokens)}}">
				<triplat-duration-period-counter label="Months:" value="{{month}}" min\$="[[monthMin]]" max\$="[[monthMax]]" step\$="[[monthStep]]" loop\$="[[isLoop(monthLoop)]]" increase-aria-label="{{increaseMonths}}" decrease-aria-label="{{decreaseMonths}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>

			<div class="layout horizontal" hidden\$="{{!isDisplayWeeks(displayTokens)}}">
				<triplat-duration-period-counter label="Weeks:" value="{{week}}" min\$="[[weekMin]]" max\$="[[weekMax]]" step\$="[[weekStep]]" loop\$="[[isLoop(weekLoop)]]" increase-aria-label="{{increaseWeeks}}" decrease-aria-label="{{decreaseWeeks}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>

			<div class="layout horizontal" hidden\$="{{!isDisplayDays(displayTokens)}}">
				<triplat-duration-period-counter label="Days:" value="{{day}}" min\$="[[dayMin]]" max\$="[[dayMax]]" step\$="[[dayStep]]" loop\$="[[isLoop(dayLoop)]]" increase-aria-label="{{increaseDays}}" decrease-aria-label="{{decreaseDays}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>

			<div class="layout horizontal" hidden\$="{{!isDisplayHours(displayTokens)}}">
				<triplat-duration-period-counter label="Hours:" value="{{hour}}" min\$="[[hourMin]]" max\$="[[hourMax]]" step\$="[[hourStep]]" loop\$="[[isLoop(hourLoop)]]" increase-aria-label="{{increaseHours}}" decrease-aria-label="{{decreaseHours}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>

			<div class="layout horizontal" hidden\$="{{!isDisplayMinutes(displayTokens)}}">
				<triplat-duration-period-counter label="Minutes:" value="{{minute}}" min\$="[[minuteMin]]" max\$="[[minuteMax]]" step\$="[[minuteStep]]" loop\$="[[isLoop(minuteLoo)]]" increase-aria-label="{{increaseMinutes}}" decrease-aria-label="{{decreaseMinutes}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>

		   <div class="layout horizontal" hidden\$="{{!isDisplaySeconds(displayTokens)}}">
				<triplat-duration-period-counter label="Seconds:" value="{{second}}" min\$="[[secondMin]]" max\$="[[secondMax]]" step\$="[[secondStep]]" loop\$="[[isLoop(secondLoop)]]" increase-aria-label="{{increaseSeconds}}" decrease-aria-label="{{decreaseSeconds}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>

		   <div class="layout horizontal" hidden\$="{{!isDisplayMilliseconds(displayTokens)}}">
				<triplat-duration-period-counter label="Milliseconds:" value="{{millisecond}}" min\$="[[millisecondMin]]" max\$="[[millisecondMax]]" step\$="[[millisecondStep]]" loop\$="[[isLoop(millisecondLoop)]]" increase-aria-label="{{increaseMilliseconds}}" decrease-aria-label="{{decreaseMilliseconds}}" on-change="_handleEdit"></triplat-duration-period-counter>
			</div>
		  </div>

		  <div class="layout horizontal">
			<paper-button id="cancelButton" class="cancelButton" on-tap="_handleCancel" tabindex="0">Cancel</paper-button>
			<paper-button id="doneButton" class="doneButton" on-tap="_handleOk" tabindex="0" disabled\$="{{invalidInput}}">Done</paper-button>
		  </div>
	</div>
	`,

    is: "triplat-duration-picker",
    behaviors: [IronOverlayBehavior, TriPlatDurationBehavior],

    properties: {
		/**
		 * Calculated numeric value for a duration field. 
		 */
		value: {
			type: Number,
			notify: true
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
		invalidInput: {
			type: Boolean,
			value: false
		},

		year:{
			type: Number,
			value: 0
		},
		month:{
			type: Number,
			value: 0
		},
		week:{
			type: Number,
			value: 0
		},
		day:{
			type: Number,
			value: 0
		},
		hour:{
			type: Number,
			value: 0
		},
		minute:{
			type: Number,
			value: 0
		},
		second:{
			type: Number,
			value: 0
		},
		millisecond:{
			type: Number,
			value: 0
		},


	},

    attached: function() {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if(textDirectionValue==="rtl"){
			this.$.picker.classList.add('rtl-picker');
			this.$.doneButton.classList.add('rtl-done-button');
		} else {
			this.$.picker.classList.add('ltr-picker');
			this.$.doneButton.classList.add('ltr-done-button');
		}
	},

    ready: function(){
		//set translated values for aria-label periods counters buttons
		var __dictionary__yi = "Increase Years";
		var __dictionary__Mi = "Increase Months";
		var __dictionary__wi = "Increase Weeks";
		var __dictionary__di = "Increase Days";
		var __dictionary__hi = "Increase Hours";
		var __dictionary__mi = "Increase Minutes";
		var __dictionary__si = "Increase Seconds";
		var __dictionary__Si = "Increase Milliseconds";
		var __dictionary__yd = "Decrease Years";
		var __dictionary__Md = "Decrease Months";
		var __dictionary__wd = "Decrease Weeks";
		var __dictionary__dd = "Decrease Days";
		var __dictionary__hd = "Decrease Hours";
		var __dictionary__md = "Decrease Minutes";
		var __dictionary__sd = "Decrease Seconds";
		var __dictionary__Sd = "Decrease Milliseconds";

		this.increaseYears = __dictionary__yi;
		this.increaseMonths = __dictionary__Mi;
		this.increaseWeeks = __dictionary__wi;
		this.increaseDays = __dictionary__di;
		this.increaseHours = __dictionary__hi;
		this.increaseMinutes = __dictionary__mi;
		this.increaseSeconds = __dictionary__si;
		this.increaseMilliseconds = __dictionary__Si;
		this.decreaseYears = __dictionary__yd;
		this.decreaseMonths = __dictionary__Md;
		this.decreaseWeeks = __dictionary__wd;
		this.decreaseDays = __dictionary__dd;
		this.decreaseHours = __dictionary__hd;
		this.decreaseMinutes = __dictionary__md;
		this.decreaseSeconds = __dictionary__sd;
		this.decreaseMilliseconds = __dictionary__Sd;
	},

    /**
	  * Open the duration dialog and set the duration values.
	  * If duration values exist, the dialog displays the duration values. Otherwise, duration values are set to zero.
	  */
	openPicker: function () {
		//set picker periods values
		this.invalidInput = false;
		if(this.value == null) {
			//set periods to zero
			this.year = 0;
			this.month = 0;
			this.week = 0;
			this.day = 0;
			this.hour = 0;
			this.minute = 0;
			this.second = 0;
			this.millisecond = 0;
		} else {
			//find the periods values for a given calculate duration value
			var displayedDuration = this.getDisplayedDuration(this.value, this.displayTokens);
			this.year = (this.isNumericPositiveValue(displayedDuration.years))? displayedDuration.years:0;
			this.month = (this.isNumericPositiveValue(displayedDuration.months))? displayedDuration.months:0;
			this.week = (this.isNumericPositiveValue(displayedDuration.weeks))? displayedDuration.weeks:0;
			this.day = (this.isNumericPositiveValue(displayedDuration.days))? displayedDuration.days:0;
			this.hour = (this.isNumericPositiveValue(displayedDuration.hours))? displayedDuration.hours:0;
			this.minute = (this.isNumericPositiveValue(displayedDuration.minutes))? displayedDuration.minutes:0;
			this.second = (this.isNumericPositiveValue(displayedDuration.seconds))? displayedDuration.seconds:0;
			this.millisecond = (this.isNumericPositiveValue(displayedDuration.milliseconds))? displayedDuration.milliseconds:0;
		}

		//display picker
		this.open();
	},

    _handleCancel: function() {
		//close picker (without changing the duration)
		this.close();
	 },

    _handleOk: function() {
		this._handleEdit();
		if(!this.invalidInput){
				var newPeriods = {};
				newPeriods.year = this.year;
				newPeriods.month = this.month;
				newPeriods.week = this.week;
				newPeriods.day = this.day;
				newPeriods.hour = this.hour; 
				newPeriods.minute = this.minute; 
				newPeriods.second = this.second;
				newPeriods.millisecond = this.millisecond;

				//calculate and set new duration value
				var newDurationValue = this.calculateDurationValue(newPeriods);
				this.set("value",newDurationValue);

				//close picker
				this.close();
		}
	},

    _handleEdit: function(e){
			//On field edit, verify duration periods are positive numeric values
			if(this.isNumericPositiveValue(this.year)
				&& this.isNumericPositiveValue(this.month)
				&& this.isNumericPositiveValue(this.week)
				&& this.isNumericPositiveValue(this.day)
				&& this.isNumericPositiveValue(this.hour)
				&& this.isNumericPositiveValue(this.minute)
				&& this.isNumericPositiveValue(this.second)
				&& this.isNumericPositiveValue(this.millisecond)
				) {
				//rollup periods value (if possible)
				this._rollup();
				this.invalidInput = false;
			} else {
				//Disable the OK button.
				//This should not happen as triplat-duration-period-counter force positive numeric value.
				this.invalidInput = true;
			}
	 },

    /**
	  * Optimizes and rollup periods values (if possible). 
	  * Does not rollup weeks to months, or days to months.
	  */
	_rollup: function(){
		//rolls up milliseconds to seconds
		if(this.millisecond > 999 && this.isDisplaySeconds(this.displayTokens)) {
			var divisor = Math.floor(this.millisecond/1000);
			var remainder = this.millisecond%1000;
			this.millisecond = remainder;
			this.second = Number(this.second) + divisor;
		}
		//rolls up seconds to minutes
		if(this.second > 59 && this.isDisplayMinutes(this.displayTokens)) {
			var divisor = Math.floor(this.second/60);
			var remainder = this.second%60;
			this.second = remainder;
			this.minute = Number(this.minute) + divisor;
		}
		//rolls up minutes to hours
		if(this.minute > 59 && this.isDisplayHours(this.displayTokens)) {
			var divisor = Math.floor(this.minute/60);
			var remainder = this.minute%60;
			this.minute = remainder;
			this.hour = Number(this.hour) + divisor;
		}
		//rolls up hours to days
		if(this.hour > 23 && this.isDisplayDays(this.displayTokens)) {
			var divisor = Math.floor(this.hour/24);
			var remainder = this.hour%24;
			this.hour = remainder;
			this.day = Number(this.day) + divisor;
		}
		//rolls up days to weeks
		if(this.day > 6 && this.isDisplayWeeks(this.displayTokens)) {
			var divisor = Math.floor(this.day/7);
			var remainder = this.day%7;
			this.day = remainder;
			this.week = Number(this.week) + divisor;
		}
		//rolls up months to years
		if(this.month > 11 && this.isDisplayYears(this.displayTokens)) {
			var divisor = Math.floor(this.month/12);
			var remainder = this.month%12;
			this.month = remainder;
			this.year = Number(this.year) + divisor;
		}
	}
});