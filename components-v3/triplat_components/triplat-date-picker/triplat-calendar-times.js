/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { TriPlatCalendarBehavior } from "./triplat-calendar-behavior.js";
import "../@polymer/paper-input/paper-input.js";
import "../triplat-incremental-input/triplat-incremental-input.js";
import { TriDateUtilities } from "../triplat-date-utilities/triplat-date-utilities.js";
import { assertParametersAreDefined, importJs } from "../tricore-util/tricore-util.js";
const importJsPromise = importJs(["../moment/moment.js"], "triplat-date-picker/triplat-calendar-times.js");

importJsPromise.then(() => {
/*
A component that provides a way to display and input time. This is typically used within the context of date and time. This can also be used as a duration. See the `triplat-datetime-picker` demo page for an example that displays hours, minutes, and seconds.

<triplat-calendar-times
  hour="{{_hour}}"
  minute="{{_min}}"
  step-hour="1"
  step-minute="15"
  step-second="15"
  display-seconds
  is-am-pm-format>
</triplat-calendar-times>


### Styling

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-calendar-times-time-section` | Applied to the time section | `{}`
`--triplat-calendar-times-separator` | Applied to the separator | `{}`
`--triplat-calendar-times-header` | Applied to the time header | `{}`
`--triplat-calendar-times-colon` | Applied to the colon separator | `{}`
*/
    Polymer({
	    _template: html`
		<style include="iron-flex iron-flex-alignment tristyles-theme">

			#times {
				box-sizing: border-box;
				max-width: 100%;
				padding: 6px;
				overflow: auto; 
				font-size: 14px;
				font-weight: bold;
				padding-left: 28px;
				padding-right: 24px;
				@apply --layout-horizontal;
				@apply --layout-center;
				@apply --layout-around-justified;
				@apply --triplat-calendar-times-time-section;
			}

			#viewingMonthYear {
				overflow: hidden;
			}
			.viewingMonthYear {
				margin: 0;
				font-size: 16px;
				font-weight: bold;
				line-height: 48px;
				letter-spacing: 0.02em;
				margin-left: 12px;
				margin-right: 12px;
				height: 35px;
			}

			#amPmButton {
				font-size: 14px;
				font-weight: bold;
				font-family: var(--tri-font-family);
				margin: 0px;
				padding: 0px;
				min-width: 2.14em !important;
				color: var(--ibm-gray-60) !important;
			}

			#separator{
				border: solid rgb(230, 230, 230);
				border-width: 2px;
				margin: 0px 12px 0px 12px;
				@apply --triplat-calendar-times-separator;
			}
			
			#header {
				@apply --triplat-calendar-times-header;
			}

			triplat-incremental-input.timepicker {
				--triplat-increment-input-label: {
					padding-bottom: 5px;
				};

				--triplat-increment-input-paper: { 
					width: 30px;
					margin-top: -12px;
						margin-bottom: -5px;
					};

				--triplat-increment-input-main: {
					padding-right:  var(--tri-calendar-time-counter-padding-right, 18px); 
					padding-left: var(--tri-calendar-time-counter-padding-left, 18px); 
					@apply --layout;
					@apply --layout-vertical;
					@apply --layout-center-center;
				};

				--triplat-increment-input-counter: { 
					@apply --layout;
					@apply --layout-vertical;
					@apply --layout-center-center;
				};

				--triplat-duration-period-counter-icon: {
					height: 40px; 
					width: 40px;
					color: var(--triplat-date-picker-icon-color, var(--tri-primary-content-color));
				} 
			}
			
			:host([show-label-under]) triplat-incremental-input.timepicker {
				--triplat-increment-input-label: {
					padding: 5px 0px;
				};
			}

			#time-counter paper-icon-button{
					height: 40px;
					width: 40px; 
					padding: 6px;
					color: var(--triplat-date-picker-icon-color);
				}

				#time-counter {
					margin-top: 2px;
					padding-right:  var(--triplat-calendar-time-counter-padding-right, 18px); 
				padding-left: var(--tri-calendar-time-counter-padding-left, 18px); 
				}
			
				.colon {
					font-size: 28px;
					padding-bottom: 18px;
					@apply --triplat-calendar-times-colon;
				}

		
		</style>

		<hr id="separator">
		<div id="header" class="layout horizontal">
			<div class="flex relative" id="viewingMonthYear">
				<h4 class="viewingMonthYear">
				<span>Time</span>
				</h4>
			</div>
		</div>
		<div>
			<div id="times">
				<triplat-incremental-input reverse-icons="" class="timepicker" label="Hour" increase-aria-label="Increase hour" decrease-aria-label="Decrease hour" value="{{hour}}" min="{{_minHour}}" max="{{_maxHour}}" min-digits="[[hourMinDigits]]" step="{{stepHour}}" loop="[[!noLoop]]" show-label-under="[[showLabelUnder]]" counters-only="[[countersOnly]]">
				</triplat-incremental-input>
				<template is="dom-if" if="[[showColonSeparator]]">
					<span class="colon">:</span>
				</template>
				<triplat-incremental-input reverse-icons="" class="timepicker" label="Minute" increase-aria-label="Increase minute" decrease-aria-label="Decrease minute" value="{{minute}}" min="0" max="59" min-digits="2" step="{{stepMinute}}" loop="[[!noLoop]]" show-label-under="[[showLabelUnder]]" counters-only="[[countersOnly]]">
				</triplat-incremental-input>
				
				<template is="dom-if" if="{{displaySeconds}}">
					<template is="dom-if" if="[[showColonSeparator]]">
						<span class="colon">:</span>
					</template>
					<triplat-incremental-input reverse-icons="" class="timepicker" label="Second" increase-aria-label="Increase second" decrease-aria-label="Decrease second" value="{{second}}" min="0" max="59" min-digits="2" step="{{stepSecond}}" loop="[[!noLoop]]" show-label-under="[[showLabelUnder]]" counters-only="[[countersOnly]]">
					</triplat-incremental-input>
				</template>
				<template is="dom-if" if="{{isAmPmFormat}}">
					<div id="time-counter">
					<span>&nbsp;</span>
					<div id="amPm-counter" class="layout vertical">
						<paper-icon-button icon="icons:arrow-drop-up" on-tap="_toggleAmPm" aria-label\$="{{_amPmAriaLabel}}"></paper-icon-button>
						<paper-button id="amPmButton" class="tri-disable-theme" on-tap="_toggleAmPm" tabindex="0" aria-label\$="{{_amPmAriaLabel}}">{{_translatedAmPm}}</paper-button>
						<paper-icon-button icon="icons:arrow-drop-down" on-tap="_toggleAmPm" aria-label\$="{{_amPmAriaLabel}}"></paper-icon-button>
					</div>
					</div>
				</template>
			</div>
		</div>
	`,

	    is: "triplat-calendar-times",
	    behaviors: [TriDateUtilities],

	    properties: {
			
			/* 
				* Display in 12-hour clock time convention with AM and PM time periods.
				*/
			isAmPmFormat: {
				type: Boolean,
				value: false,
				observer:"_isAmPmChanged"
			},

			/*
				* Display the seconds counter.
				*/
			displaySeconds: {
				type: Boolean,
				value: false,
				observer: "_displayChanged"
			},

			/*
				* Hour value.
				*/
			hour: {
				type: Number,
				value: 0,
			},

			/*
				* Minute value.
				*/
			minute: {
				type: Number,
				value: 0
			},

			/*
				* Second value.
				*/
			second: {
				type: Number,
				value: 0
			},

			/*
				* True if the time is in the PM.
				*/
			isPm: {
				type: Boolean,
				value: false
			},

			/*
				* The date value for the component. The time portion is the main concern.
				*/
			date: {
				type: Object,
				value: new Date(),
				observer: "_dateChanged"
			},
			
			/*
				* Show colon separators between the period counters.
				*/
			showColonSeparator: {
				type: Boolean,
				value: false
			},
			
			/*
				* Show the label underneath the value instead of above the value.
				*/
			showLabelUnder: {
				type: Boolean,
				reflectToAttribute: true,
				value: false
			},
			
			/*
				* The user can edit the values with the period counters only. The input will be read-only.
				*/
			countersOnly: {
					type: Boolean,
					value: false
				},
				
				/*
					* The number of minimum digits to display for the hours period.
					*/
			hourMinDigits: {
					type: Number,
					value: 2
			},
			
			/*
				* The period counters will not loop when a value is increased or decreased.
				*/
			noLoop: {
					type: Boolean,
					value: false
			},

			/*
			 * Amount to add or subtract when increasing or decreasing hours.
			 */
			stepHour: {
				type: Number
			},

			/*
			 * Amount to add or subtract when increasing or decreasing minutes.
			 */
			stepMinute: {
				type: Number
			},

			/*
			 * Amount to add or subtract when increasing or decreasing steps.
			 */
			stepSecond: {
				type: Number
			},


			_maxHour: Number,
			_minHour: Number,

			_toggleFontSize: {
				type: Boolean,
				value: false,
				readOnly: false
			},
		},

	    observers: [
			'_updateTimePropsChanged(hour, minute, second, isPm)'
		],

	    _dateChanged: function(newDate){
			if(this._isDateObject(newDate)){
				this._updateTimeProps(newDate);
			}
		},

	    _updateTimeProps: function(date){
			this._minHour = this.isAmPmFormat ? 1 : 0;
			this._maxHour = this.isAmPmFormat ? 12 : 23;
			var hour = this.isAmPmFormat ? moment(date).format("hh") : moment(date).hour();
			if (!isNaN(hour)) {
				this.hour = Number(hour);
			} else {
				// For Arabic (and perhaps other langages) moment(date).format("hh") will not necessarily return a number
				// so use hour() and preform the military time conversion
				hour = Number(moment(date).hour());
				if (this.isAmPmFormat && hour > 12) {
					hour = hour - 12;
				}
				this.hour = hour;
			}
			this._hour = moment(date).hour();
			this.minute = moment(date).minute();
			this.second = moment(date).second();
			this.isPm = (Number(this._hour >= 12)) ? true : false;
		},

	    _updateTimePropsChanged: function(hour, minute, second, isPm){
		    if (!assertParametersAreDefined(arguments)) {
			    return;
			}

			var _hour = this.isAmPmFormat ? this._getConvertedHour(hour, isPm) : hour;
			var _mDate = moment(this.date).hour(_hour).minute(minute).second(second);

			this.fire('triplat-calendar-time-updated', {
						updatedDatetime: _mDate.toDate()
						});

			this._translatedAmPm = this._handleTranslation();
		},

	    _isAmPmChanged: function(){
			if(!this.date){
				var dateString = this._getCurrentDateString();
				this.date = moment(dateString).toDate();
				this._updateTimeProps(this.date);
			}
		},

	    _getConvertedHour: function(hour, isPm){
			hour = Number(hour);
			hour = (hour === 12) ? 0 : hour; 
			var _hour = isPm ? (Number(hour) + 12) : hour;
			return _hour;
		},

	    _toggleAmPm: function(){
			if(this.isPm){
				this.set("isPm", false);
			}else{
				this.set("isPm", true);
			}
			this._translatedAmPm = this._handleTranslation();
			this._forceAmPmRender();

		},

	    _handleTranslation: function(){
			var __dictionary__am = "AM";
			var __dictionary__pm = "PM";
			var __dictionary__toggleToAM = "toggle to AM";
			var __dictionary__toggleToPM = "toggle to PM";
			var _translatedAmPm = this.isPm ? __dictionary__pm : __dictionary__am;
			this._amPmAriaLabel = this.isPm ? __dictionary__toggleToAM : __dictionary__toggleToPM;
			return _translatedAmPm;
		},

	    _displayChanged: function(){
			if(this.displaySeconds){
			    this.updateStyles({
				    "--tri-calendar-time-counter-padding-right": '9px',
				    "--tri-calendar-time-counter-padding-left": '9px'
				});
			}
		},

	    _forceAmPmRender: function(){
			/*
				* In Microsoft Edge the paper-button nested as it is in this component does not render the changed am/pm value, 
				* changing the font-size forces a render. 
				*/
			if (this._toggleFontSize) {
				this.$$('#amPmButton').style.fontSize = "100%";
			} else {
				this.$$('#amPmButton').style.fontSize = "101%";
			}
			this._toggleFontSize = !this._toggleFontSize;
		}
	});
});