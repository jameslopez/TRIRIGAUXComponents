/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/iron-pages/iron-pages.js";
import { IronOverlayBehaviorImpl, IronOverlayBehavior } from "../@polymer/iron-overlay-behavior/iron-overlay-behavior.js";
import "../@polymer/iron-media-query/iron-media-query.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/iron-icons/device-icons.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { NeonAnimationRunnerBehaviorImpl, NeonAnimationRunnerBehavior } from "../@polymer/neon-animation/neon-animation-runner-behavior.js";
import "../@polymer/neon-animation/animations/slide-from-left-animation.js";
import "../@polymer/neon-animation/animations/slide-from-right-animation.js";
import "../@polymer/neon-animation/animations/fade-in-animation.js";
import "./triplat-calendar-weeks.js";
import "./triplat-calendar-years.js";
import "./triplat-calendar-times.js";
import { TriPlatCalendarBehavior } from "./triplat-calendar-behavior.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined, importJs } from "../tricore-util/tricore-util.js";

const importJsPromise = importJs([
  "../moment/moment.js",
  "../web-animations-js/web-animations-next-lite.min.js"
], "triplat-date-picker/triplat-calendar.js");

importJsPromise.then(() => {
  Polymer({
    _template: html`
	<style include="iron-flex iron-flex-alignment tristyles-theme">


:host { 
  font-size: 12px;
  line-height: 24px;
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: var(--tri-font-family);
} 

#selectedWeekdayHeader {
  height: 36px;
  overflow: hidden;
}

#selectedDateHeader {
  box-sizing: border-box;
  padding: 12px 0;
  background-color: var(--triplat-date-picker-header-bg-color, var(--tri-primary-color-40));
}

#selectedDateHeader > div {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.selectedWeekday {
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  margin: 0;
  font-weight: 400;
  color: white;
  background-color: var(--triplat-date-picker-header-sec-bg-color, var(--tri-primary-color-30));
}

#selectedMonth,
#selectedYear {
  height: 30px;
}
#selectedDay {
  height: 60px;
}
.selectedMonth,
.selectedYear {
  font-size: 22px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.05em;
}
.selectedDay {
  font-size: 60px;
  line-height: 60px;
}
.selectedYear {
  color: rgba(255, 255, 255, 0.6);
}


#calendar {
  overflow: hidden;
}

#header {
  position: relative;
  overflow: hidden;
  padding-left: 3.5px;
  padding-right:3.5px;
} 

#viewingMonthYear {
  overflow: hidden;
}
.viewingMonthYear {
  margin: 0;
  font-size: 20px;
  font-weight: normal;
  line-height: 32px;
  letter-spacing: 0.02em;
  text-align: center;
  height: 40px;
}

.viewingMonthYear span {
  vertical-align: middle;
}

.weekday-name {
  font-weight: 500;
  width: 36px;
  text-align: center;
  color: black;
}
:host .weekday-name{
  color: var(--triplat-date-picker-weekday-color, var(--ibm-gray-60));
}

.views {
  width: 276px;
  overflow: hidden;
}

.calendarSelection {
  width: 276px;
  color: #fff;
}

.weekday {
  margin: 0px 12px 0px 12px;
}

#weekday {
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: rgb(230, 230, 230);
}

.buttons{
  margin: 0px 12px;
}

.yearselection {
  color: var(--tri-primary-color);
}

#confirmButtons #cancelBtn, #confirmButtons #doneBtn {
  padding: 0px 0px;
  height: 30px;

}

#doneBtn {
  @apply --tri-primary-button;
  color: white;
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
  border-radius: 0px;
  text-transform: none;
  @apply --triplat-date-picker-done-button;  
}

#doneBtn:hover {
  @apply --tri-primary-button-hover;
}

#doneBtn[pressed] {
  @apply --tri-primary-button-press;
}

#cancelBtn {
  @apply --tri-secondary-button;
  font-weight: bold;
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
  text-transform: none;
  --paper-button-flat-keyboard-focus: {
	  border-width: 3px !important;
	};
  @apply --triplat-date-picker-cancel-button;  
}

#cancelBtn:hover {
  @apply --tri-secondary-button-hover;
}

#cancelBtn[pressed] {
  @apply --tri-secondary-button-press;
}

paper-icon-button[view=timeView] {
  padding: 0px;
}

.landscape{
  background-color: var(--triplat-date-picker-landscape-bg-color, var(--tri-primary-color-30)) !important;
  width: 100px !important;
}
.time{
  padding-top: .75em;
}

paper-button:not([raised]).paper-button-2.keyboard-focus{
	border-style: none;
}

.paper-icon-button-rtl {
	transform: scaleX(-1);
}
.space-between {
  justify-content: space-between;
}
@media all and (min-width: 1280px) {
	._views {
	  width: 766px;
	}
	._calendarSelection{
	  width: 766px;
	}
	._selectedWeekdayHeader{
	  height: 36px;
	}
	._weekdayName {
	  width: 100px;
	  font-size: 20px;
	}
}
@media all and (min-width: 800px) and (max-width: 1279px) {
	._views {
	  width: 574px;
	}
	._calendarSelection{
	  width: 574px;
	}
	._selectedWeekdayHeader{
	  height: 30px;
	}
	._weekdayName {
	  width: 75px;
	  font-size: 15px;
	}
}
@media all and (max-width: 799px) {
	._views {
	  width: 383px;
	}
	._calendarSelection{
	  width: 383px;
	}
	._selectedWeekdayHeader{
	  height: 24px;
	}
	 ._weekdayName {
	  width: 50px;
	  font-size: 14px;
	}
}

#confirmButtons{
	padding-bottom: 10px;
	@apply --layout-horizontal;
	@apply --layout-justified;
}

#nextMonthArrow, #previousMonthArrow {
  --iron-icon-fill-color: var(--triplat-date-picker-icon-color, var(--tri-primary-icon-button-color));

} 
#space-between-confirmBtn {
  height: 1em;
}


	</style>

  <iron-media-query query="max-height: 550px" query-matches="{{landscape}}"></iron-media-query>
 
  <div id="wrapper" class="layout">

	<template is="dom-if" if="{{header}}">

	  <template is="dom-if" if="{{landscape}}" on-dom-change="_handleDomChange"><span>{{_detectedLandscape(landscape)}}</span>
		<div id="calendarSelection" class="layout vertical center center-justified selectedDay landscape">
		  <div id="selectedWeekdayHeader" class="layout horizontal">
			<div class="relative flex" id="selectedWeekday">
			  <div class="selectedWeekday">{{selectedWeekday}}</div>
			</div>
		  </div>

		<div id="selectedDateHeader" class="layout vertical center center-justified landscape">
		  <div id="selectedMonth">
			<div class="selectedMonth slideup animate landscape" style="text-transform: uppercase">{{selectedMonth}}</div>
		  </div>
		  <div id="selectedDay">
			<div class="selectedDay landscape" view="dateView" on-tap="viewSelectAction">{{selectedDay}}</div>
		  </div>
		  <div id="selectedYear">
			<div class=" landscape selectedYear" view="yearView" on-tap="viewSelectAction">{{selectedYear}}</div>
		  </div>
		</div>
	  </div>
	  </template>
	  
	  <template is="dom-if" if="{{!landscape}}" on-dom-change="_handleDomChange">
		<div id="calendarSelection">
		<div id="selectedWeekdayHeader" class="layout horizontal">
		  <div class="relative flex" id="selectedWeekday">
			<div class="selectedWeekday">{{selectedWeekday}}</div>
			</div>
		  </div>

		  <div id="selectedDateHeader" class="layout vertical center center-justified">
			<div id="selectedMonth">
			  <div class="selectedMonth slideup animate" style="text-transform: uppercase">{{selectedMonth}}</div>
			</div>
			<div id="selectedDay">
			  <div class="selectedDay" view="dateView" on-tap="viewSelectAction">{{selectedDay}}</div>
			</div>
			<div id="selectedYear">
			  <div class="selectedYear" view="yearView" on-tap="viewSelectAction">{{selectedYear}}</div>
			</div>
			<div id="selectTime">
			  <div class=" landscape selectedTime" view="timeView" on-tap="viewSelectAction">{{selectedTime}}</div>
			</div>
		  </div>
		</div>
	  </template>
	  
	</template>

	<div id="calendar" class="layout vertical" on-trackx="trackx" on-trackstart="trackstart" on-trackend="trackend">

	  <iron-pages id="views" selected="{{selectedView}}" attr-for-selected="name">
	  <section name="dateView">

		<div id="header" class="layout horizontal">
		  <paper-icon-button id="previousMonthArrow" icon="ibm-glyphs:backward" on-tap="prevAction" aria-label="Previous Month"></paper-icon-button>
		  <div class="flex relative" id="viewingMonthYear">
			<h4 class="viewingMonthYear">
			  <span>{{viewingMonth}}</span>
			  <span id="yearSelectionSpan" style="cursor: pointer; " class="yearselection" view="yearView" on-tap="viewSelectAction" tabindex="0" aria-label\$="{{_viewingMonthYear}}" role="button">{{viewingYear}}</span>
			</h4>
		  </div>
		  <paper-icon-button id="nextMonthArrow" icon="ibm-glyphs:forward" on-tap="nextAction" aria-label="Next Month"></paper-icon-button>
		</div>
		<div class="weekday">
		  <div id="weekday" class="layout horizontal center">
			<template is="dom-repeat" items="{{weekdays}}" as="weekday">
			  <div class="weekday-name">{{weekday}}</div>
			</template>
		  </div>
		</div>
		<div id="calendarWeeks">
			<triplat-calendar-weeks id="calendarWeek" date="{{viewingDate}}" picker-date="{{_currentDate}}" initiated-date="{{initiatedDate}}" selected-date="{{selectedDate}}" disallow-past-dates\$="{{disallowPastDates}}" disallow-weekends\$="{{disallowWeekends}}" restrict-to-date-list\$="{{restrictToDateList}}" valid-date-list="{{validDateList}}" triplat-calendar-container="{{triplatCalendarContainer}}" confirm-buttons="{{confirmButtons}}" on-triplat-calendar-date-selected="dateSelectAction" on-triplat-calendar-date-selected-without-confirm-buttons="_returnSelectedDayWithoutConfirmButtons" on-swipe-away="_handleSwipe">
			  </triplat-calendar-weeks>
		</div>

		<template is="dom-if" if="{{time}}">
		 <triplat-calendar-times id="timeSelection" confirm-buttons="{{confirmButtons}}" is-am-pm-format="{{_isAmPmFormat}}" on-triplat-calendar-time-updated="timeUpdateAction" on-triplat-calendar-date-selected="_returnAction" display-seconds\$="{{displaySeconds}}" date="[[currentDate]]" step-hour\$="{{stepHour}}" step-minute\$="{{stepMinute}}" step-second\$="{{stepSecond}}">
		</triplat-calendar-times>
	  </template>

	  <template is="dom-if" if="{{!time}}">
		  <div id="space-between-confirmBtn"></div>
	  </template>

	  <template is="dom-if" if="{{confirmButtons}}">
		<template is="dom-if" if="{{!triplatCalendarContainer}}">
		  <div id="confirmButtons" class="buttons layout horizontal">
			<paper-button id="cancelBtn" on-tap="_handleCancel" tabindex="0">Cancel</paper-button>
			<paper-button id="doneBtn" on-tap="_handleOk" tabindex="0">Done</paper-button>
		  </div>
		</template>
	  </template>
	  </section>

	  <section name="yearView">
		<triplat-calendar-years id="yearSelection" on-triplat-calendar-year-selected="yearSelectAction" on-triplat-calendar-date-selected="_returnAction" triplat-calendar-container="" viewing-year="{{viewingYear}}">
		</triplat-calendar-years>
	  </section>

	  </iron-pages>
	</div>
  </div>
  `,

    is: "triplat-calendar",

    behaviors: [
	  TriPlatCalendarBehavior, 
	  IronOverlayBehavior,
	  NeonAnimationRunnerBehavior
	],

    listeners: {
	  'iron-overlay-opened':'_calendarOpened',
	  'calendar-weeks-changed':'_handleFitWidthToParentForDays' 
	},

    properties: {

	  currentDate: {
		type: Date,
		value: null,
		notify: true,
		observer: "currentDateChanged"
	  },


	  disallowPastDates: {
		type: Boolean,
	  },

	  disallowWeekends: {
		type: Boolean,
	  },

	  restrictToDateList: {
		type: Boolean,
	  },

	  validDateList: {
		type: Array,
	  },

	  selectedDate: {
		type: Date,
		observer: "selectedDateChanged"
	  },

	  selectedView: {
		type: String,
		value: 'dateView'
	  },

	  disableSelectYear: {
		type: Boolean,
		value: false
	  },

	  _language: {
		type: String,
		value: "en"
	  },

	  locale: {
		type: Object,
		value: function() {
		  var locale = {
			'en': {
			  monthNames: [
			  'January',
			  'February',
			  'March',
			  'April',
			  'May',
			  'June',
			  'July',
			  'August',
			  'September',
			  'October',
			  'November',
			  'December'
			  ],
			  shortMonthNames: [
			  'Jan',
			  'Feb',
			  'Mar',
			  'Apr',
			  'May',
			  'Jun',
			  'Jul',
			  'Aug',
			  'Sep',
			  'Oct',
			  'Nov',
			  'Dec'
			  ],      
			  dayNames: [
			  'Sunday',
			  'Monday',
			  'Tuesday',
			  'Wednesday',
			  'Thursday',
			  'Friday',
			  'Saturday'
			  ],      
			  shortDayNames: [
			  'S',
			  'M',
			  'T',
			  'W',
			  'T',
			  'F',
			  'S'
			  ]
			}
		  }
		  return locale;
		}
	  },

	  date: {
		type: Date
	  },

	  header: {
		type: Boolean,
		value: false
	  },

	  viewingDate: {
		type: String,
		observer: "viewingDateChanged"
	  },

	  viewingYear: {
		type: String,
		notify: true
	  },

	  _viewingMonthYear: {
		type: String,
		computed: '_computeMonthYear(viewingMonth, viewingYear)'
	  },

	  noCancelOnOutsideClick: {
		type: Boolean,
		value: true
	  }, 

	  initiatedDate:{
		type: Boolean
	  },

	  viewingTime:{
		type: String,
		value: "00:00:00",
		notify: true
	  },

	  time: {
		type: Boolean,
		value: false
	  },

	  triplatCalendarContainer:{
		type: Boolean,
		value: false
	  },

	  confirmButtons:{
		type: Boolean,
		value: false
	  },

	  displayFormat:{
		type: String,
		observer: "_changeDisplayFormat"
	  },

	  _isAmPmFormat:{
		type: Boolean,
		value: false
	  },

	  displaySeconds:{
		type: Boolean,
		value: false
	  },

	  widthOfParent: {
		type: Number,
		value: null,
		observer: "_handleFitWidthToParent"
	  },

	  _dayWidth: {
		type: Number,
		value: 65
	  },

	  animationConfig: {}

	},

    _computeMonthYear: function(month, year) {
	  if (!assertParametersAreDefined(arguments)) {
	    return;
	  }

	  if(this.disableSelectYear){
		this.$.yearSelectionSpan.setAttribute('role', '');
	  }

	  return month + ' ' + year;
	},

    getFullMonth: function(d) {
	  return this.locale[this._language].monthNames[d.getMonth()];
	},

    getShortMonth: function(d) {
	  return this.locale[this._language].shortMonthNames[d.getMonth()];
	},

    getDayOfWeek: function(d) {
	  return this.locale[this._language].dayNames[d.getDay()];
	},

    getShortDayNames: function() {
	  return this.locale[this._language].shortDayNames;
	},

    attached: function() {
	  if(this.landscape){
		this.$.wrapper.className = "layout horizontal";
	  }
	  if (!this.currentDate){
		this.set("selectedDate", new Date());
	  } else {
		this.set("selectedDate", new Date(this.currentDate));
	  }
	  this._setTranslation();
	  this.weekdays = this.getShortDayNames();
	  this.viewingDate = this.viewingDate || new Date(this.selectedDate);
	  this.viewingDate.setDate(1);
	  this.nowDate = new Date();
	  this.async(function() {
		this._handleTriplatCalendarContainer();
	  }, 10);
	  this._handleTriplatCalendarBidi();
	  this.confirmButtons = this.time ? true : this.confirmButtons;
	  this.addEventListener('keyup', this.keyup.bind(this));
	},

    ready: function() {
	  this.async(function() {
		this._handleFitWidthToParent();
	  }, 10);

	  this.set("animationConfig", {
		'previous': [
		  {
			name: 'slide-from-left-animation',
			node: this.$.calendarWeeks,
		  },
		  {
			name: 'fade-in-animation',
			node: this.$.calendarWeeks,
		  }
		],
		'next': [ 
		  {
			name: 'slide-from-right-animation',
			node: this.$.calendarWeeks,
		  },
		  {
			name: 'fade-in-animation',
			node: this.$.calendarWeeks,
		  }
		]
	  });
	},

    _handleFitWidthToParent: function() {
	   if (!this.widthOfParent) { return; }

	  // in landscape mode, the header is on the left side of the calendar so it needs to be accounted for in the width calculation
	  var landscapeHeaderWidth = 100; // set default, in case the landscape dom tree has not been built yet
	  if (dom(this.root).querySelector("#calendarSelection.landscape") != null) {
		 landscapeHeaderWidth = dom(this.root).querySelector("#calendarSelection.landscape").offsetWidth;
	  }
	  var minCalendarWidth = 270; // based on the font used in the small media query, we look ok down to 270px, but then
								  // the days wrap and cause 6 days per week 

	  var newWidthPortrait = this.widthOfParent < minCalendarWidth ? minCalendarWidth : this.widthOfParent; // enforce the min width

	  var newWidthLandscape = newWidthPortrait;
	
	  if (this.header) {
		newWidthLandscape = newWidthLandscape - landscapeHeaderWidth; // subtract the width that the header will consume
		newWidthLandscape = newWidthLandscape < minCalendarWidth ? minCalendarWidth : newWidthLandscape; // enforce min width 
	  }

	  var newWidth = this.landscape ? newWidthLandscape : newWidthPortrait;

	  if (dom(this.root).querySelector("#calendarSelection:not(.landscape)") != null) {
		dom(this.root).querySelector("#calendarSelection:not(.landscape)").style.width = newWidthPortrait + "px";
		dom(this.root).querySelector(":not(.landscape)>#selectedWeekdayHeader").style.width = newWidthPortrait + "px";
	  }
	  dom(this.root).querySelector("#views").style.width = newWidth + "px";
	  // match how the media query-based calculations are done, the 
	  // width of the weekday name is one-seventh of 91% of the full width.
	  var weekdayWidth = (newWidth * 0.91)/7;
	  // match how the media query-based calculations are done, the 
	  // width of each day is 10 less than the width of the weekday header
	  this._dayWidth = weekdayWidth - 10;
	  var weekdayNames = Array.from(dom(this.root).querySelectorAll(".weekday-name"));
	  for (var i=0; i < weekdayNames.length; i++) {
		weekdayNames[i].style.width = weekdayWidth + "px";
	  }

	  this._handleFitWidthToParentForDays();
	},

    _handleFitWidthToParentForDays: function() {
	   if (!this.widthOfParent) { return; }

	  var days = Array.from(dom(this.$.calendarWeek.root).querySelectorAll(".day"));
	  for (var i=0; i < days.length; i++) {
		days[i].style.width = this._dayWidth + "px";
	  }
	},

    _handleDomChange: function(){
	  this._handleTriplatCalendarContainer();
	},

    _handleTriplatCalendarBidi: function(){
	  var textDirectionValue = document.querySelector('body').getAttribute('dir');
	  if(textDirectionValue==="rtl"){
		this.$.previousMonthArrow.classList.add('paper-icon-button-rtl');
		this.$.nextMonthArrow.classList.add('paper-icon-button-rtl');
	  }
	},

    _handleTriplatCalendarContainer: function(){
	  if(this.triplatCalendarContainer) {
		this.$.views.classList.add("_views");
		if(this.$$('#calendarSelection')){
		  this.$$('#calendarSelection').classList.add("_calendarSelection");
		}
		if(this.$$('#selectedWeekdayHeader')){
		  this.$$('#selectedWeekdayHeader').classList.add("_selectedWeekdayHeader");
		}
		var weekdayName = Array.from(dom(this.root).querySelectorAll(".weekday-name"));
		this.async(function(){
		   for (var i = 0; i < weekdayName.length; i++){
			weekdayName[i].classList.add("_weekdayName");           
		  }
		});
	  }else{
		this.$.views.classList.add("views");
		if(this.$$('#calendarSelection')){
		  this.$$('#calendarSelection').classList.add("calendarSelection");
		}
		if(this.$$('#selectedWeekdayHeader')){
		  this.$$('#selectedWeekdayHeader').classList.add("selectedWeekdayHeader");
		}
	  }
	},

    _changeDisplayFormat: function(format){
	  if(format){
		 if(format.indexOf("a") >-1){
			this.set("_isAmPmFormat", true);       
		 }else {
			this.set("_isAmPmFormat", false);
		 }
	  }
	},

    _init: function() {
	  if (!this.currentDate) {
	  } else {
		  this.set("selectedDate", new Date(this.currentDate));
	  }

	  this.nowDate = new Date();
	  this.weekdays = this.getShortDayNames();
	  this.viewingDate = this._getDefaultViewingDate();
	  this.addEventListener('keyup', this.keyup.bind(this));
	},

    _getDefaultViewingDate: function() {
	  var viewingDate = this.viewingDate;
	  if (viewingDate) {
	  } else if (this.selectedDate) {
		viewingDate = new Date(this.selectedDate);
	  } else {
		viewingDate = this.nowDate;
	  }

	  viewingDate.setDate(1);

	  return viewingDate;
	},

    currentDateChanged: function() {
	  if (this.currentDate){
		  this.set("selectedDate", new Date(this.currentDate)); 
		  this.hour = this.hour ? this.hour : this.currentDate.getHours();
		  this.minute = this.minute ? this.minute : this.currentDate.getMinutes();
		  this.second = this.second ? this.second : this.currentDate.getSeconds();
		  this.viewingDate = new Date(this.selectedDate);
		  this._currentDate = this.currentDate;
	  }
	},

    selectedDateChanged: function() {
	  this.async(this.updateSelectedDateProps);
	},

    viewingDateChanged: function(olddate, newdate) {
	  this.async(this.updateViewingDateProps)
	},

    updateSelectedDateProps: function() {
	  this.selectedWeekday = this.getDayOfWeek(this.selectedDate);
	  this.selectedMonth = this.getShortMonth(this.selectedDate);
	  this.selectedDay = this.selectedDate.getDate();
	  this.selectedYear = this.selectedDate.getFullYear();
	},

    updateViewingDateProps: function() {
	  this.viewingMonth = this.getFullMonth(this.viewingDate);
	  this.viewingYear = this.viewingDate.getFullYear();
	  this.viewingMonthYear = this.viewingMonth + ' ' + this.viewingYear;
	},

    nextAction: function() {
	  this.viewingDate = this.addMonths(this.viewingDate, 1);  
	  this.playAnimation('next'); 
	},

    prevAction: function() {
	  this.viewingDate = this.addMonths(this.viewingDate, -1);
	  this.playAnimation('previous'); 
	},

    viewSelectAction: function(e) {
	  if(this.disableSelectYear) return false;
	  var target = e.target;
	  this.async(function(){
		 this.selectedView = target.getAttribute("view");
		// sometimes e.target is paper-ripple, so we need to get the parent
		if (!this.selectedView) {
		  this.selectedView = target.parentElement.getAttribute("view");
		}
		this._setFocus(this.selectedView);
	  }, 10);
	 

	},

    dateSelectAction: function(e) {
	  var year = e.detail.date.getFullYear(), 
		  month= e.detail.date.getMonth(), 
		  date = e.detail.date.getDate();
		  this.hour = this.hour ? this.hour : 0;
		  this.minute = this.minute ? this.minute : 0;
		  this.second = this.second ? this.second : 0;

	  this.set("selectedDate", new Date(year, month, date, this.hour, this.minute, this.second));
	  this.set("currentDate", this.selectedDate);
	  this._handleNoConfirmButtoms();
	},

    _handleNoConfirmButtoms: function(){
	  if(this.triplatCalendarContainer) return false;
	  if(!this.confirmButtons) {
		this.async(function(){
		  this.close();
		}, 10); 
	  }
	},

    yearSelectAction: function(e) {
	  var year = e.detail.year;
	  this.disablePropertyAnimations = true;
	  this.viewingDate = new Date(year, this.viewingDate.getMonth(), this.viewingDate.getDay());
	  this.viewingYear = year;
	  this.async(function(){
		this.$.views.selected = "dateView";
		this._setFocus("dateView");
		this.disablePropertyAnimations = false;
	  }, null, 280);
	},

    timeUpdateAction: function(e) {
	 if(!this.selectedDate) return;
	 var updatedDatetime = e.detail.updatedDatetime;
	 this.hour = moment(updatedDatetime).hour();
	 this.minute = moment(updatedDatetime).minute();
	 this.second = moment(updatedDatetime).second();
	 this.set("viewingDate", updatedDatetime)
	 this.initiatedDate = true;
	 this.set("selectedDate", updatedDatetime);
   },

    _returnAction: function(e) {
	  var view = e.detail.view;
	  this.selectedView = view;
	  this._setFocus(view);
	},

    keyup: function(e){
	  var month = this.selectedDate.getMonth();
	  switch (e.keyCode) {
		case 37:
			this.prevAction()
			break;
		case 39:
			this.nextAction()
			break;
		case 13:
		case 32:
			// paper elements handle spacebar and enter themselves, so exclude them here
			if (e.target.nodeName.indexOf("PAPER") != 0) {
			  e.target.click();
			}
			break;
	  }
	},

    _handleOk: function(){
	  this.fire("calendar-date-selected", {datetime: this.selectedDate});
	  this.set("currentDate", this.selectedDate);
	  if(this.time){
		this.set("currentDate", new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), this.hour, this.minute, this.second));
	  }
	   this.initiatedDate = true;
	  this.async(function(){
		this.close();
	  }, 10); 
	},

    _handleCancel: function(){
	  if(!this.currentDate){
		this.async(function(){
		  this.set("viewingDate", new Date());
		}, 10);
		
		this._currentDate = new Date();
		this.selectedDate = new Date();

		this.hour = 0, this.minute = 0, this.second = 0;
	  }
	  this.async(function(){
		this.cancel();
	  }, 10);
	},

    _detectedLandscape: function(landscape){
	  if(landscape){
		dom(this.$.wrapper).classList.remove("vertical");
		dom(this.$.wrapper).classList.add("horizontal");
	  }
	  else{
		dom(this.$.wrapper).classList.remove("horizontal");
		dom(this.$.wrapper).classList.add("vertical");
	  }
	  this._handleFitWidthToParent();
	},

    _handleSwipe: function(e){
	  var swipeDirection = e.detail.direction;
	  switch(swipeDirection){
		case 1: this.prevAction();
		break;
		case -1: this.nextAction();
		break;
	  }
	},

    _setFocus: function(view) {
	  var focusElement = null;

	  if (view == "dateView") {
		focusElement = this.$.previousMonthArrow;
	  } if (view == "yearView") {
		focusElement = this.$.yearSelection.$.previousYearArrow;
	  } if (view == "timeView") {
		focusElement = this.$.timeSelection.$.timeViewFirstElement;
	  }
	  if (focusElement) {
		focusElement.focus();
	  }

	},

    _resetCalendar: function(){
	  if(this.currentDate){
		  this.selectedView = "dateView";
		  this.set("viewingDate", this.currentDate);
		  this.$.yearSelection._resetToCurrentYear(this.currentDate.getFullYear());
	  } else{
		  this.viewingDate = new Date();
		  this.selectedView = "dateView";
		  this.$.yearSelection._resetToCurrentYear(new Date().getFullYear());
	  }
	},

    _setTranslation: function(){
	  var __dictionary__January = "January";
	  var __dictionary__February = "February";
	  var __dictionary__March = "March";
	  var __dictionary__April = "April";
	  var __dictionary__May = "May";
	  var __dictionary__June = "June";
	  var __dictionary__July = "July";
	  var __dictionary__August = "August";
	  var __dictionary__September = "September";
	  var __dictionary__October = "October";
	  var __dictionary__November = "November";
	  var __dictionary__December = "December";

	  var __dictionary__Jan = "Jan";
	  var __dictionary__Feb = "Feb";
	  var __dictionary__Mar = "Mar";
	  var __dictionary__Apr = "Apr";
	  var __dictionary__May = "May";
	  var __dictionary__Jun = "Jun";
	  var __dictionary__Jul = "Jul";
	  var __dictionary__Aug = "Aug";
	  var __dictionary__Sep = "Sep";
	  var __dictionary__Oct = "Oct";
	  var __dictionary__Nov = "Nov";
	  var __dictionary__Dec = "Dec";

	  var __dictionary__Monday = "Monday";
	  var __dictionary__Tuesday = "Tuesday";
	  var __dictionary__Wednesday = "Wednesday";
	  var __dictionary__Thursday = "Thursday";
	  var __dictionary__Friday = "Friday";
	  var __dictionary__Saturday = "Saturday";
	  var __dictionary__Sunday = "Sunday";

	  
	  

	  var __dictionary__M = "M - Short for Monday in Calendar";
	  var __dictionary__T = "T - Short for Tuesday in Calendar";
	  var __dictionary__W = "W - Short for Wednesday in Calendar";
	  var __dictionary__Th = "T - Short for Thursday in Calendar";
	  var __dictionary__F = "F - Short for Friday in Calendar";
	  var __dictionary__Sa = "S - Short for Saturday in Calendar";
	  var __dictionary__Su = "S - Short for Sunday in Calendar";

	  this.locale[this._language].monthNames[0] = __dictionary__January; 
	  this.locale[this._language].monthNames[1] = __dictionary__February; 
	  this.locale[this._language].monthNames[2] = __dictionary__March;
	  this.locale[this._language].monthNames[3] = __dictionary__April;
	  this.locale[this._language].monthNames[4] = __dictionary__May;
	  this.locale[this._language].monthNames[5] = __dictionary__June;
	  this.locale[this._language].monthNames[6] = __dictionary__July;
	  this.locale[this._language].monthNames[7] = __dictionary__August;
	  this.locale[this._language].monthNames[8] = __dictionary__September;
	  this.locale[this._language].monthNames[9] = __dictionary__October;
	  this.locale[this._language].monthNames[10] = __dictionary__November;
	  this.locale[this._language].monthNames[11] = __dictionary__December;

	  this.locale[this._language].shortMonthNames[0] = __dictionary__Jan; 
	  this.locale[this._language].shortMonthNames[1] = __dictionary__Feb; 
	  this.locale[this._language].shortMonthNames[2] = __dictionary__Mar;
	  this.locale[this._language].shortMonthNames[3] = __dictionary__Apr;
	  this.locale[this._language].shortMonthNames[4] = __dictionary__May;
	  this.locale[this._language].shortMonthNames[5] = __dictionary__Jun;
	  this.locale[this._language].shortMonthNames[6] = __dictionary__Jul;
	  this.locale[this._language].shortMonthNames[7] = __dictionary__Aug;
	  this.locale[this._language].shortMonthNames[8] = __dictionary__Sep;
	  this.locale[this._language].shortMonthNames[9] = __dictionary__Oct;
	  this.locale[this._language].shortMonthNames[10] = __dictionary__Nov;
	  this.locale[this._language].shortMonthNames[11] = __dictionary__Dec;

	  this.locale[this._language].dayNames[0] = __dictionary__Sunday; 
	  this.locale[this._language].dayNames[1] = __dictionary__Monday;
	  this.locale[this._language].dayNames[2] = __dictionary__Tuesday; 
	  this.locale[this._language].dayNames[3] = __dictionary__Wednesday;
	  this.locale[this._language].dayNames[4] = __dictionary__Thursday;
	  this.locale[this._language].dayNames[5] = __dictionary__Friday;
	  this.locale[this._language].dayNames[6] = __dictionary__Saturday;
	  
	  this.locale[this._language].shortDayNames[0] = ("S - Short for Sunday in Calendar" !== __dictionary__Su ) ? __dictionary__Su : "S";
	  this.locale[this._language].shortDayNames[1] = ("M - Short for Monday in Calendar" !== __dictionary__M ) ? __dictionary__M : "M";
	  this.locale[this._language].shortDayNames[2] = ("T - Short for Tuesday in Calendar" !== __dictionary__T) ? __dictionary__T :"T" ;
	  this.locale[this._language].shortDayNames[3] = ("W - Short for Wednesday in Calendar"  !== __dictionary__W) ? __dictionary__W : "W";
	  this.locale[this._language].shortDayNames[4] = ("T - Short for Thursday in Calendar" !== __dictionary__Th) ? __dictionary__Th : "T";
	  this.locale[this._language].shortDayNames[5] = ("F - Short for Friday in Calendar" !== __dictionary__F) ? __dictionary__F : "F"; 
	  this.locale[this._language].shortDayNames[6] = ("S - Short for Saturday in Calendar" !==__dictionary__Sa) ? __dictionary__Sa : "S";

	},

    _returnSelectedDayWithoutConfirmButtons: function(e){
	  this.fire("calendar-date-selected", {datetime: this.selectedDate});
	},

    _calendarOpened: function(){
	  this.$.previousMonthArrow.focus();
	}
  });
});