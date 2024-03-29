/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../@polymer/paper-input/paper-input-container.js";
import "../@polymer/paper-input/paper-input-error.js";
import "../@polymer/paper-dialog/paper-dialog.js";
import "../@polymer/iron-icons/iron-icons.js";
import "../@polymer/iron-media-query/iron-media-query.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../triplat-date-picker/triplat-calendar.js";
import "../triplat-icon/triplat-icon.js";
import { TriPlatDateTimePickerBehavior } from "./triplat-datetime-picker-behavior.js";
import { TriplatInputContainerBehavior } from "../triplat-input-container-behavior/triplat-input-container-behavior.js";
import { TriBlockScrollFieldIntoViewBehavior } from "../triblock-scroll-field-into-view-behavior/triblock-scroll-field-into-view-behavior.js";
import { TriDateUtilities } from "../triplat-date-utilities/triplat-date-utilities.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined, importJs } from "../tricore-util/tricore-util.js";

const importJsPromise = importJs([
    "../jstimezonedetect/dist/jstz.min.js",
    "../moment/moment.js",
    "../moment-timezone/builds/moment-timezone-with-data-2012-2022.js",
    "../moment-jdateformatparser/moment-jdateformatparser.min.js",
    "../moment/min/locales.min.js"
], "triplat-datetime-picker/triplat-datetime-picker.js");

importJsPromise.then(() => {
/*
A component that provides an input box with a calendar icon. Clicking on the icon 
brings up a calendar and allows you to select a datetime from the calendar.

	 <triplat-datetime-picker value="{{value}}"></triplat-datetime-picker>
	 
Note: The pop-up calendar will be centered when opened on a mobile device. 

Example of setting minutes increase and decrease by 15.

	 <triplat-datetime-picker value="{{value}}" 
	   step-minute="15">
	 </triplat-datetime-picker>

Example of using custom label. In order for an element to be considered as a label, it must have the `label` slot attribute.

	<triplat-datetime-picker value="{{searchStart}}">
	  <iron-icon slot="label" icon="av:play-arrow"></iron-icon>
	  <span slot="label">Start</span>
	</triplat-datetime-picker>

	<triplat-datetime-picker value="{{searchEnd}}">
	  <iron-icon slot="label" icon="av:stop"></iron-icon>
	  <span slot="label">End</span>
	</triplat-datetime-picker>

Note: The 'label' property value will be overridden when using a custom 'label' slot. <br/>

### Styling

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-date-picker-width` | Width of the input field | `100%`
`--triplat-date-picker-header-bg-color` | Background color for the header | `--tri-primary-color-40`
`--triplat-date-picker-header-sec-bg-color` | Secondary background color for the header | `--tri-primary-color-30`
`--triplat-date-picker-weekday-color` | Color for the weekday column header | `--ibm-gray-60`
`--triplat-date-picker-cancel-button` | Mixin applied to the cancel button | `{}`
`--triplat-date-picker-done-button` | Mixin applied to the done button | `{}`
`--triplat-date-picker-selected-bg-color` | Color of the background for a selected day or year | `--tri-primary-color-30`
`--triplat-date-picker-disabled-color` | Color of the disabled days | `--ibm-gray-50`
`--triplat-date-picker-landscape-bg-color` | Color of the background in landscape mode | `--tri-primary-color-30`
`--triplat-date-picker-icon-size` | Size of the calendar icon | `24px`
`--triplat-date-picker-icon-color` | Color of the component icons | `--tri-primary-content-color`
`--triplat-date-picker-icon` | Mixin applied to the picker icon | `{}`

See `Polymer.PaperInputContainer` for a list of custom properties that can be used to style the paper-input element contained within this element.

### Utilities

See `triplat-date-utilites` for more API docs.


@demo demo/index.html
*/
    Polymer({
	    _template: html`
		<style include="iron-flex iron-flex-alignment tristyles-theme">


		paper-icon-button {
		padding: 0px;
		height: var(--triplat-date-picker-icon-size, 24px);
		width: var(--triplat-date-picker-icon-size, 24px);
		--iron-icon-fill-color: var(--triplat-date-picker-icon-color, var(--tri-primary-content-color));
		bottom:3px;
		@apply --triplat-date-picker-icon;
		}

		paper-input {
			width: var(--triplat-date-picker-width);
		}

		paper-dialog {
			position: fixed;
			width: 60%;
			margin: 0px;	
		}

		.__triPlatDatetimePickerCalendar {
			top: var(--tri-datetime-picker-calendar-position-top);
			left: var(--tri-datetime-picker-calendar-position-left);
			position: var(--tri-datetime-picker-calendar-position);
		}

		#content {
			display:none;
		}
			
			input {
			@apply --paper-input-container-shared-input-style;
		}
		
		</style>

		<iron-media-query query="max-width: 414px" query-matches="{{phone}}"></iron-media-query>
		<paper-input-container hidden="{{_readonlyNoDisabledNoLabel(disabled,readonly,label)}}" class="flex" on-change="_directEdit" invalid="[[invalid]]" aria-label\$="[[label]]" always-float-label\$="[[alwaysFloatLabel]]" disabled\$="[[disabled]]" no-label-float\$="[[noLabelFloat]]" focused="{{focused}}">
			<label id="[[_labelId]]" for\$="[[_inputId]]" slot="label">[[label]]<slot id="labelContent" name="label"></slot></label>
			<iron-input id="[[_inputId]]" bind-value\$="{{formatDate(value, displayFormat, timeZone)}}" slot="input">
				<input aria-labelledby\$="[[_labelId]]" pattern\$="[[_datetimePattern]]" readonly\$="[[_computeInputReadonly(readonly, disableKeyboardInput)]]" disabled\$="[[disabled]]" on-input="_fireInputChanged" tri-scroll-into-view="">
			</iron-input>
			<template is="dom-if" if="{{_notDisabledReadonly(disabled,readonly)}}">
				<paper-icon-button suffix="" icon="ibm:calendar" id="picker" on-tap="_openTriCalendar" aria-label\$="{{_setPickerAriaLabel(label)}}" slot="suffix">
				</paper-icon-button>
			</template>
			<paper-input-error slot="input">[[_hightLighted]]</paper-input-error>
		</paper-input-container>
		<template is="dom-if" if="{{_readonlyNoDisabledNoLabel(disabled,readonly,label)}}">
			<span>{{formatDate(value, displayFormat, timeZone)}}</span>
		</template>
		<template is="dom-if" if="{{_notDisabledReadonly(disabled,readonly)}}">
			<triplat-calendar id="calendar" class="__triPlatDatetimePickerCalendar" no-cancel-on-esc-key="{{_noCancelOnEscKey}}" no-cancel-on-outside-click="{{_noCancelOnOutsideClick}}" header="{{header}}" current-date="{{_changeToBrowserTimeZone(_dateValue)}}" initiated-date="{{_initiatedDate}}" time="{{_time}}" military-time="{{_militaryTime}}" disallow-past-dates\$="{{disallowPastDates}}" disallow-weekends\$="{{disallowWeekends}}" restrict-to-date-list\$="{{restrictToDateList}}" valid-date-list="{{validDateList}}" on-calendar-date-selected="_getDateTime" display-format="{{displayFormat}}" display-seconds\$="{{displaySeconds}}" disable-select-year\$="{{disableSelectYear}}" on-iron-overlay-opened="_openCalendar" on-iron-overlay-closed="_closeCalendar" step-hour="{{stepHour}}" step-minute="{{stepMinute}}" step-second="{{stepSecond}}" allow-click-through="[[allowClickThrough]]">
			</triplat-calendar>
		</template>
		<paper-dialog id="directentryerror" no-cancel-on-outside-click="" role="alertdialog">
			<h2>Invalid value: <span>{{_enteredDateValue}}</span></h2>
			<div>{{_errorMsg}}</div>
			<div class="buttons">
				<paper-button id="triCloseButton" dialog-dismiss="">Close</paper-button>
			</div>

		</paper-dialog>
	`,

	    is: "triplat-datetime-picker",

	    /**
		 * Fired when the datetime-picker value changes.
		 *
		 * @event datetime-picker-change
		 */

		/**
		* Fired when the datetime-picker input changes due to user interaction.
		*
		* @event datetime-picker-user-change
		*/

		/**
		*  Fired every time the value is typed into the datetime-picker input field.
		*
		* @event datetime-picker-input-change
		*/

		behaviors: [ 
			  TriPlatDateTimePickerBehavior,
			  TriDateUtilities,
			  TriplatInputContainerBehavior,
			  TriBlockScrollFieldIntoViewBehavior
		],

	    listeners: {
			  'calendar-date-selected': '_calendarDateSelected',
		},

	    properties: {

			  /**
			   * The ISO date format 
			   */
			  value: {
				  type: String,
				  notify: true,
				  observer: "_valueChanged"
			  },

			  /**
			   * Representation of the value as a java.util.Date object
			   */
			  _dateValue: {
				  type: Date,
				  observer: "_dateValueChanged"
			  },

			  /**
				* Flag indicating whether to display a block above the calendar containing
				* the day of the week, month, day, and year of the currently selected value.<br>
				* <b>true</b> means display the header above the calendar.<br>
				* <b>false</b> means just display the calendar without the header block.<br>
				*/
			  header: {
				  type: Boolean,
				  value: false
			  },

			  /**
				* String value to be used for the label.
				*/
			  label: {
				  type: String,
				  value: null
			  },

			  /** 
				* Boolean value to indicate that this is a disabled date value input field. Show
				* the value, but not the datetime picker. The value will be grayed out and not editable.
				* The value will be underlined to indicate it is an input field.
				*/
			  disabled: {
				  type: Boolean,
				  value: false
			  },

			  /** 
				* Boolean value to indicate that this is a readonly date value. Show
				* the value, but not the datetime picker.
				*/
			  readonly: {
				  type: Boolean,
				  value: false
			  }, 

			  /** 
				* Boolean value to indicate that a null date should be considered as invalid.
				*/
			  nullDateInvalid: {
				  type: Boolean,
				  value: false
			  },
			  
			/**
			 * If true, the keyboard input is disabled and the user can only change the date by using the calendar.
			 */
			disableKeyboardInput: {
				type: Boolean, 
				value: false
			},

			  /**
				* String value that is null when no error exists or it contains the current error
				* message if the existing value is invalid.
				*/
			  _errorMsg: {
				  type: String,
				  value: null,
				  notify: true
			  },

			  /**
				* Flag indicating whether to display time in the calendar.<br>
				* <b>true</b> means display the time in the calendar.<br>
				* <b>false</b> means just display the calendar without the time.<br>
				*/
			  _time: {
				  type: Boolean,
				  value: true
			  },

			  _militaryTime: {
				  type: Object,
				  value: true
			  },

			  /**
				* String value to be used for the time zone.
				*/ 
			  timeZone:{
				  type: String,
				  observer: "_timeZoneChanged"
			  },

			  _currentTimeZone:{
				  type: String
			  },

			  _initiatedDate:{
				  type: Boolean
			  },

			  _datetimeInvlidmsg:{
				  type: String
			  },

			  _datetimePattern:{
				  type: String
			  },
			  _enteredDateValue:{
				  type: String
			  },

			  /**
				* Flag indicating whether to disable weekends and make them become gray color and unselectable in the calendar.<br>
				*/
			  disallowWeekends: {
				  type: Boolean,
				  value: false
			  },
			  /**
				* Flag that indicates whether to allow the user to select any date, or just select dates 
				* in the future. If this is specified, then only dates in the future, excluding today's date, will be able 
				* to be selected. Even if the specific hour is in the future, the user still cannot select today's date.
				**/
			  disallowPastDates:{
				  type: Boolean,
				  value: false
			  },
			  /**
				  *Datetime format strings
			   */
			  displayFormat: {
				  type: String,
				  value: "MM/DD/YYYY hh:mm a"
			  },

			  _noCancelOnOutsideClick:{
				  type: Boolean,
				  value: false
			  },

			  _noCancelOnEscKey:{
				  type: Boolean,
				  value: false
			  },

			  /**
			   * True if the input has focus.
			   */
			  focused: {
				  type: Boolean,
				  value: false,
				  notify: true
			  },

			  /**
			   * True if the input is invalid.
			   */
			  invalid: {
				  type: Boolean,
				  value: false,
				  notify: true,
				  reflectToAttribute: true
			  },

			  _isoDateLength: {
				  type: Number,
				  value: (moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ")).length
			  },
			  /**
			   * Returns the length of a datetime using the UTC time zone.
			   * For example "2016-06-08T23:30:00.000Z" is a datetime with the UTC timezone.
			   */
			  _isoUTCDateLength: {
				  type: Number,
				  value: ("YYYY-MM-DDTHH:mm:ss.SSSZ").length
			  },
			  
			  /**
				* Flag that indicates whether to allow the message to alert when the user enters an invalid datetime.
				**/
			  disableErrorMsg: {
				  type: Boolean,
				  value: false
			  }, 

			  /**
				* Set to true to always float the label.
				*/
			  alwaysFloatLabel: {
				  type: Boolean,
				  value: false
			  },

			  /**
				* Set to true to disable the floating label.
				**/
			  noLabelFloat: {
				  type: Boolean,
				  value: false
			  },

			  /**
				* Set to true to disable select year.
				**/
			  disableSelectYear: {
				  type: Boolean,
				  value: false
			  },

			  /**
				* Set to true to display seconds.
				**/
			  displaySeconds: {
				  type: Boolean,
				  value: false
			  },

			  /*
			   * Amount to add or subtract when increasing or decreasing hours.
			   */
			  stepHour: {
				  type: Number,
				  value: 1
			  },

			  /*
			   * Amount to add or subtract when increasing or decreasing minutes.
			   */
			  stepMinute: {
				  type: Number,
				  value: 1
			  },

			  /*
			   * Amount to add or subtract when increasing or decreasing seconds.
			   */
			  stepSecond: {
				  type: Number,
				  value: 1
			  },

			  _userValueChange: {
				  type: String,
				  observer: "_fireUserChanged"
			  }, 

			  _lang: String,

			/**
			 * Set to true to allow clicks to go through overlays. 
			 * When the user clicks outside this overlay, the click may close the overlay below.
			 */
			allowClickThrough: {
				type: Boolean,
			}
		},

	    _calendarDateSelected: function() {
			  this.set("_errorMsg" , null);
		},

	    /* Neither disabled nor readonly flag were set
		*/
		_notDisabledReadonly: function(disabled,readonly) {
		    if (!assertParametersAreDefined(arguments)) {
			    return;
			}

			return !disabled && !readonly;
		},

	    /* readonly flag was set, but disabled was not set
		*/
		_readonlyNoDisableLabel: function(disabled,readonly, label) {
		  return !disabled && readonly && label;
		},

	    _readonlyNoDisabledNoLabel: function(disabled,readonly,label) {
		    if (!assertParametersAreDefined(arguments)) {
			    return;
			}

			return !disabled && readonly && !label;
		},

	    _dateValueChanged: function() {
		  this._initiatedDate = false;
		  if(this._calendarIconIsTapped) {
			  this._calendarIconIsTapped = false; 
			  return;
		  }

		  // When the input field holds an invalid value, set an empty string before setting the selected value.
		  if (this.invalid) { this.set("value", ""); }

		  if (this._dateValue) {
			  this.set("value", moment(this._dateValue).tz(this.timeZone).format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
		  }
		},

	    /**
		  * Handle user directly entering a new value into the input field
		  * without using the calendar.
		  */
		_directEdit: function(e) {
		  this.set("_errorMsg" , null);
		  var newDate = this._convertStringToDate(e.target.value, this.nullDateInvalid);
		  if (this._errorMsg ===null) {
			  this._directEditRestrictedDateCheck(newDate);
		  }
		  if (this._errorMsg===null) {
			  if (newDate === null) {
				  this.invalid = false;
				  this.set("value", null);
				  
			  } else {
				  this.invalid = false;
				  this.set("value", newDate);				
				  this.currentTime = newDate;

			  }
		  } else {
			  this.invalid = true;
			  if(!this.disableErrorMsg){
				  this.$.directentryerror.style.top = this.getBoundingClientRect().top + "px";
				  this.$.directentryerror.style.left = this.getBoundingClientRect().left + "px";
				  this.$.directentryerror.toggle();
			  }
		  }
		  this._userValueChange = this.value;
		},

	    _openTriCalendar: function(){
		  this._calendarIconIsTapped = true;
		  var dateObj = null; 
		  if(this.value){
			  this.value = String(this.value);
			  if(this.value.replace(/[^T]/g, "").length > 0){
				  var withoutTimeIndex = this.value.indexOf("T");
				  var dateString = this.value.substring(0, withoutTimeIndex);
				  dateObj =  new Date(moment(this.value).tz(this.timeZone).format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
				  if (!this._isDateObject(dateObj)){ 
					  // For Arabic (and perhaps other languages), format("YYYY-MM-DDTHH:mm:ss.SSSZ") does not work, so use toISOString()
					  dateObj =  new Date(moment(this.value).tz(this.timeZone).toISOString());
					  if(!this._isDateObject(dateObj)){
						  dateObj =  new Date(moment(dateString).tz(this.timeZone));
						  if (!this._isDateObject(dateObj)) {
						  dateObj = null; 
						  }
					  }
				  }
			  }else{
				  dateObj = null;
			  }
			  
		  } else{
			  dateObj = null;
		  }

		  this.set("_dateValue", dateObj);

		  this.openTriCalendar(this.$$("#picker"), this.$$("#calendar"), this.phone, this.header);
		},

	    created: function(){
		  this._currentTimeZone = jstz.determine().name();
		  this._handleLocale();
		},

	    attached: function(){
		  this.timeZone = this.timeZone ? this.timeZone : this._currentTimeZone;
		  this.allowPastDates = true;
		  this._initiatedDate = this.value ? true : false;
		  this._convertedToLocalTimeZone();	
		  this._handleCustomLabel();
		},

	    _handleLocale: function(){
		  var lang = document.querySelector('html').getAttribute("lang") || 'en';
		  //TODO to remove this later when have a better way/implementation to handle mock user.
		  this._lang = (lang === "mock-USER") ? "en" : lang;
		  moment.locale('en');
		},

	    _convertedToLocalTimeZone: function(){
		 if(this.timeZone){
			 if (this.value && this._hasIsoDateLength(this.value)){
				 var currentTimeZone = (moment.tz(this.value, this.timeZone)).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
				 this.value = currentTimeZone;
			 }
		 }else{
			 if (this.value && this._hasIsoDateLength(this.value)){
				 var currentTimeZone = (moment.tz(this.value, this._currentTimeZone)).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
				 this.value = currentTimeZone;
			 }
		 }

	   },

	    _timeZoneChanged: function(newtz, oldtz){
			  if (this.value && this._hasIsoDateLength(this.value) && newtz && oldtz ){
				  var currentTimeZone = moment.tz(this.value, oldtz); 
				  var newTimeZone = (currentTimeZone.clone().tz(newtz)).format("YYYY-MM-DDTHH:mm:ss.SSSZ"); 
				  this.value = newTimeZone;
					  
			  }
		},

	    _getDateTime: function(e){
		  var calendarDatetime = e.detail.datetime;
		  // as is but in the different timezone based on user's profile
		  var year = calendarDatetime.getFullYear(), 
			  month = calendarDatetime.getMonth() + 1, month = month <= 9  ? "0" + month : month;
		  var date = calendarDatetime.getDate() <= 9 ? "0" + calendarDatetime.getDate() : calendarDatetime.getDate(),
			  hour = calendarDatetime.getHours() <= 9 ? "0" + calendarDatetime.getHours() : calendarDatetime.getHours(),
			  minute = calendarDatetime.getMinutes() <= 9 ? "0" + calendarDatetime.getMinutes() : calendarDatetime.getMinutes(),
			  second = calendarDatetime.getSeconds() <= 9 ? "0" + calendarDatetime.getSeconds() : calendarDatetime.getSeconds(); 
		  moment.locale('en');
		  var dateTimeInCurrentUserTz = moment.tz( year + "-" + month + "-" + date  + " " + hour  + ":" + minute  + ":" + second, this.timeZone).format();
		  this._calendarIconIsTapped = false;
		  this.set("_dateValue", dateTimeInCurrentUserTz);
		  this.invalid = false; 
		  this._userValueChange = this.value;
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

	    _closeCalendar: function(e){
		  this.$$("#calendar")._resetCalendar();	
		  this.$$("#"+this._inputId).focus();
		},

	    _openCalendar: function(){
		  this._calendarState = true;
		  this._handleBrowserResize();
		},

	    _changeToBrowserTimeZone: function(val){
		    if (!assertParametersAreDefined(arguments)) {
			    return;
			}

			// return the date object of the browser timezone
			if (val){
				this.timeZone = this.timeZone ? this.timeZone : this._currentTimeZone;
				var valueTz = moment(val).tz(this.timeZone);

				var browerTimeZone = new Date(valueTz.year(), valueTz.month(), valueTz.date(), valueTz.hour(), valueTz.minute(), valueTz.second());
				return browerTimeZone;
			}

			return moment(this._getCurrentDateString()).toDate();
		},

	    /**
		  * Handle clear value from the input field.
		  */
		clearDatetimeValue: function(){
		  this.value = null;
		  this._userValueChange = this.value;
		  this.$$('input').bindValue = null;
		  this.$.directentryerror.close();
		  this.invalid = false;

		  var todayDate = moment().format("YYYY-MM-DD");
		  this.$$("triplat-calendar").currentDate = moment(todayDate).toDate();
		},

	    _valueChanged:function(){
		  this.fire("datetime-picker-change", {date: this.value});
		},

	    _handleCustomLabel: function(){
		  if(dom(this.$$('#labelContent')).getDistributedNodes().length >0){
			  this.label=" ";
		  }
		},

	    _handleBrowserResize: function(){
		  var self = this;
		  window.onresize = function(){
			  self._openInMobileDevice(self.$$("#calendar"));
		  } 
		},

	    _fireInputChanged: function(){
		  this.fire('datetime-picker-input-change');
		},

	    // This event get fired when user edit or input a new date string value in the field and tab out
		// or click on the date from the calendar 
		_fireUserChanged: function(){
		  this.fire('datetime-picker-user-change', {value: this.value});
		},

		/*
		 * Close the calendar dropdown.
		 */
		closeCalendar: function() {
			let calendar = this.$$("#calendar");
			if (calendar) calendar.close();
		},
		
		_computeInputReadonly(readonly, disableKeyboardInput) {
			return readonly || disableKeyboardInput;
		}
	});
});