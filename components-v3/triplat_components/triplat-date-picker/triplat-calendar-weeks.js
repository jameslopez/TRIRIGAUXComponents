/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriPlatCalendarBehavior } from "./triplat-calendar-behavior.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment tristyles-theme">


		#days {
			position: relative;
			overflow: hidden;
		}

		.weeks {
			padding: 0 12px;
		}

		.day {
			width: 30px;
			height: 25.5px;
			margin:5.5px 3px 5px 3px;
			position: relative;
			cursor: pointer;
			background-color: white;
			font-weight: 500;
		} 

		.day[disabled] {
			cursor: not-allowed;
			color: var(--triplat-date-picker-disabled-color, var(--ibm-gray-50));
		}

		.day[selected]:after {
			content: '';
			/*border-radius: 5px;*/
			position: absolute;
			top: 3px;
			right: 3px;
			bottom: 3px;
			left: 3px;
			z-index: 0;
			background: var(--triplat-date-picker-selected-bg-color, var(--tri-primary-color-10));
		}

		.day div {
			z-index: 1;
			transition: all .2s;
			-webkit-transition: all .2s;
		}

		.day[selected] {
			font-weight: 500;
		}

		.day:hover {
			background: var(--ibm-gray-10);
		}

		.day[today]:not([selected]) {
			color: rgb(255, 255, 255);
		}

		.day[today]:not([selected]):after {
			content:'';
			position: absolute;
			top: 3px;
			right: 3px;
			bottom: 3px;
			left: 3px;
			z-index: 0;
			background-color: var(--tri-primary-color-70);
		}

		.inner-day{
			user-select: none;
		}

		@media all and (min-width: 1280px) {

		  ._day {
			width: 90px;
			font-size: 20px;
			height: 36px;
			margin: 5px;
		  }
		}
		@media all and (min-width: 800px) and (max-width: 1279px) {

		  ._day {
			width: 65px;
			font-size: 16px;
			height: 30px;
			margin: 5px;
		  }
		}
		@media all and (max-width: 799px) {

		  ._day {
			width: 40px;
			font-size: 14px;
			height: 24px;
			margin: 5px;
		  }
		}


		</style>

	<div id="days">
		<div class="weeks">
			<div class="layout horizontal wrap">
				<template id="weeksDomRepeat" is="dom-repeat" as="week" index-as="w">
					<template is="dom-repeat" items="{{week}}" as="day" index-as="d" on-dom-change="_handleDomChange">
						<div class="layout horizontal center-justified day" disabled\$="{{!_computeDaySelectable(w, d, week)}}" selected\$="{{_computeIsSelected(w, d, week, selectedDate)}}" today\$="{{_computeIsToday(w, d, week)}}" data-w\$="{{w}}" data-d\$="{{d}}" on-tap="_selectDay" tabindex\$="{{_computeTabIndex(w, d, week,selectedDate)}}">
							<div class="inner-day layout horizontal center">{{day}}</div>
						</div>
					</template>
				</template>
			</div>

		</div>
	</div>
	`,

    is: "triplat-calendar-weeks",

    /**
	  * Fired when the calendar changes.
	  *
	  * @event calendar-weeks-changed
	  */


	behaviors: [
		TriPlatCalendarBehavior
	],

    listeners: {
	'track': '_handleTrack',
	},

    properties: {
		date: {
			type: String,
			observer: "_handleDateChanged"
		},

		selectedDate: {
			type: Date
		},

		selectedBox: {
			type: Object
		},

		weeks: {
			type: Array
		},

		disallowPastDates: {
			type: Boolean,
			value: false,
		},

		disallowWeekends: {
			type: Boolean,
			value: false,
		},

		restrictToDateList: {
			type: Boolean,
			value: false,
		},

		validDateList: {
			type: Array
		},

		validDateListForMonth: {
			type: Array
		},

		confirmButtons:{
			type: Boolean,
			value: false
		}
	},

    created: function() {
		this.nowDate = new Date();
	},

    _handleDateChanged: function(date) {
		this.$.weeksDomRepeat.items = this._getWeeks(date);
		this.$.weeksDomRepeat.render();
	},

    _handleDomChange: function() {
		this.fire('calendar-weeks-changed');
	},

    isSameDay: function(d1, d2) {
		return this.isEqualDate(d1, d2);
	},

    isSameMonth: function(d1, d2) {
		return this.isEqualMonth(d1, d2);
	},

    _computeDaySelectable: function(week, day) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var thisDate = this.weeksFull[week][day];

		if (thisDate == null)
			return false;

		var isDaySelectable = true;

		if (this.disallowPastDates)
			isDaySelectable = this._isDayInFuture(thisDate);

		if (this.restrictToDateList) {
			if (isDaySelectable) {
				isDaySelectable = this._isValidMoveDate(thisDate);
			}
		} else {
			if (isDaySelectable && this.disallowWeekends) {
				isDaySelectable = !this._isWeekendDay(thisDate);
			}
		}

		if(this.triplatCalendarContainer){
			var dayDOMs = Array.from(dom(this.root).querySelectorAll(".day"));
			this.async(function(){
				for(var i=0; i<dayDOMs.length; i++){
					dayDOMs[i].classList.add("_day");
				}
			});
		}

		return isDaySelectable;
	},

    _isDayInFuture: function(thisDate) {
		var nowDate = this.nowDate;
		var isDayInFuture = false;

		if (thisDate && nowDate) {
			isDayInFuture = thisDate.getFullYear() > nowDate.getFullYear() ||
							(thisDate.getFullYear() == nowDate.getFullYear() &&
								thisDate.getMonth() > nowDate.getMonth()) ||
							(thisDate.getFullYear() == nowDate.getFullYear() &&
								thisDate.getMonth() == nowDate.getMonth() &&
								thisDate.getDate() > nowDate.getDate());
		}

		return isDayInFuture;
	},

    _isWeekDay: function(thisDate) {
		var isWeekDay = false;

		if (thisDate) {
			isWeekDay = (thisDate.getDay() > 0 && thisDate.getDay() < 6);
		}

		return isWeekDay;
	},

    _isWeekendDay: function(thisDate) {
		var isWeekendDay = false;

		if (thisDate) {
			isWeekendDay = (thisDate.getDay() == 0 || thisDate.getDay() == 6);
		}

		return isWeekendDay;
	},

    _isValidMoveDate: function(thisDate) {
		var isValidMoveDate = false;
		var moveDates = this.validDateListForMonth;
		if (!moveDates || moveDates.length == 0)
			return false;

		if (thisDate) {
			for(var i=0;i<moveDates.length;i++) {
				var moveDate = moveDates[i];
				if (this.isSameDay(thisDate, moveDate))
					return true;
			}
		}

		return isValidMoveDate;
	},

    _computeIsSelected: function(week, day) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!this.weeksFull)
			this.weeksFull = this.getWeekArray(this.date);

		var thisDate = this.weeksFull[week][day];

		if (this.selectedDate == null || thisDate == null)
			return false;

		var isSameDay = this.isSameDay(thisDate, this.selectedDate);
		return isSameDay;
	},

    _computeIsToday: function(week, day) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!this.weeksFull)
			this.weeksFull = this.getWeekArray(this.date);

		var thisDate = this.weeksFull[week][day];

		if (this.nowDate == null || thisDate == null)
			return false;

		var isSameDay = this.isSameDay(thisDate, this.nowDate);
		return isSameDay;
	},

    _getWeeks: function(date) {
		this.weeksFull = this.getWeekArray(this.date);
		var weeks = this.getWeekArray(this.date).map(function(week) {
			if (!week || week == null) return null;
			
			return week.map(function(day) {
				return day ? day.getDate() : null;
			})
		});
		this.async(function(){
			if (this.restrictToDateList) {
				this.validDateListForMonth = this._getValidDateListForMonth(date.getMonth());
			}
		});
		return weeks;
	},

    _getValidDateListForMonth: function(month) {
		var validDateListForMonth = [];
		var validDateList = this.validDateList;
		if (validDateList) {
			validDateList.forEach(function(date) {
				if (date && date.getMonth() == month) {
					validDateListForMonth.push(date);
				}
			});
		}

		return validDateListForMonth;
	},

    _selectDay: function(e) {
		var target = ( e.target.getAttribute("data-w") ) ? e.target : e.target.parentElement;
		var wIndex = target.getAttribute("data-w");
		var dIndex = target.getAttribute("data-d");

		var isDisabled = target.getAttribute("disabled");
		if (isDisabled != undefined)
			return;

		var selectedDate = this.weeksFull[wIndex][dIndex];
		if (selectedDate) {
			this.set("selectedDate", selectedDate);
			this.fire('triplat-calendar-date-selected', {date: selectedDate});
			if(!this.confirmButtons){
				this.fire('triplat-calendar-date-selected-without-confirm-buttons', {date: selectedDate});
			}
		}
	},

    _handleTrack: function(e){
		switch(e.detail.state) {
		  case 'track':
			this.transform('translate3d(' + e.detail.dx + 'px, 0, 0)', this.target);
			break;
		  case 'end':
			var direction = e.detail.dx > 0 ? 1 : -1;
			if (Math.abs(e.detail.dx) >= 0) {
			  this._swipe(direction);
			}
			break;
		}
	},

    _computeTabIndex: function(w, d, week, selectedDate) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var isSelected = this._computeIsSelected(w, d, week, selectedDate);

		if (isSelected) {
			return 0;
		}

		var isSelectable = this._computeDaySelectable(w, d, week);

		if (isSelectable) {
			return 0;
		}

		return -1;
	},

    _swipe: function(_direction) {
		this.transform('translate3d(0px, 0, 0)', this.target);
		this.fire('swipe-away', {direction: _direction});
	 }
});