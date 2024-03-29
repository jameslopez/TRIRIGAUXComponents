/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

export const TriPlatDatePickerBehavior = {
	properties: {
		/**
		  * An invalid string message that appears under the date picker field when <b>_invalid</b> property set to true.
		**/
		_hightLighted : {
			type: String,
			value: ""
		},

		dateinvalidMsg:{
			type: String,
			computed: 'computeDateInvalidMsg(displayFormat)'
		},

		dateinvalidMsgViolateRestriction:{
			type: String,
			computed: 'computeDateInvalidMsgViolateRestriction(disallowWeekends, disallowPastDates)'
		}

	},

	formatDate: function (input, format) {
		format = format ? format : this.displayFormat;
		if(!input || Object.prototype.toString.call(input) ==="[object Object]" || !this._hasIsoDateLength(this.value))
			return "";

		var fixedFormat = this._convertToFixedMomentTzFormat(format);
		var withoutTimeIndex = input.indexOf("T");
		var dateString = input.substring(0, withoutTimeIndex);

		var mDate = moment(dateString);
		var translatedMDate = mDate.locale(this._lang);  
		var formatedDate = translatedMDate.formatWithJDF(fixedFormat);
		return formatedDate;
	},

	_convertToFixedMomentTzFormat: function(format){
		format = format || "MM/DD/YYYY";
		if (format.replace(/[^z]/g, "").length===1){
			format = format.replace("z", "zz");
		} 

		else if (format.replace(/[^z]/g, "").length===3){
			format = format.replace("zzz", "zz");
		}
		else if (format.replace(/[^z]/g, "").length===4){
			format = format.replace("zzzz", "zz");
		}

		if(format.replace(/[^M]/g,"").length===5){
			format = format.replace("MMMMM", "MMMM");
		}

		var end = false;
		var fixedFormat = format.replace(/\'/g, function(match) {
		  return (end = !end) ? '[' : ']';    
		});
		return fixedFormat;
	},

	_convertStringToDate: function(val, nullDateInvalid) {
		var dataEntryErrorMsg = null;
		var formatedDate;
		
		this._enteredDateValue = val;

		if(!val){
			if(nullDateInvalid) {
				dataEntryErrorMsg = this.dateinvalidMsg; 
				this.value = null;  
			}
			this.set("_errorMsg" , dataEntryErrorMsg);
			var __dictionary__empty = "Empty";
			this.set("_enteredDateValue" , __dictionary__empty);
			return null; 
		}
		var fixedFormat = this._convertToFixedMomentTzFormat(this.displayFormat);
		var momentFormat = moment().toMomentFormatString(fixedFormat);

		moment.locale(this._lang);
		var fieldValueToMoment = moment(val, momentFormat).format();
		if(fieldValueToMoment === "Invalid date"){
			dataEntryErrorMsg = this.dateinvalidMsg;
			this.set("_errorMsg" , dataEntryErrorMsg);
			this.set("_enteredDateValue" , val);
			return null;
		}

		var mDate = moment(fieldValueToMoment);
		var dateInMillisec = mDate.valueOf();
		if(moment.locale() !== 'en') moment.locale('en');

		var dateWithoutTz = moment(dateInMillisec).format("YYYY-MM-DDTHH:mm:ss");
		var datetimeBasedOnUserTimezone = moment.tz(dateWithoutTz, this.timeZone).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
		return datetimeBasedOnUserTimezone;
	},

	openTriCalendar: function(picker, calendar,phone, header){
		calendar.style.overflow = "auto";
		if(phone || this._isMobileDevice()){
			this._openInMobileDevice(calendar);
		}else{
			this._openInNonMobileDevice(calendar, picker, header);
		}
		calendar.open();
	},

	_openInMobileDevice: function(calendar){
		calendar.resetFit();
		calendar.style.position = '';
		calendar.style.top = '';
		calendar.style.left = '';

		var _top = calendar.style.top;
		var _left= calendar.style.left;
		var _position = calendar.style.position;
		this._handleTriPlatDatePickerCalendarPosition(_top, _left, _position);
	},

	_openInNonMobileDevice: function(calendar, picker, header){
		calendar.style.position = "fixed";
		calendar.style.top = picker.getBoundingClientRect().top+"px";
		calendar.style.left = picker.getBoundingClientRect().left+"px";

		var calendarHeight = 306;
		var calendarWidth = 290;
		var _top = calendar.style.top;
		var _left= calendar.style.left;
		var _position = calendar.style.position;

		if (window.innerWidth - picker.getBoundingClientRect().left < calendarWidth){
			var newWPosition = picker.getBoundingClientRect().left - calendarWidth;
			calendar.style.left = newWPosition + "px";
			_left = calendar.style.left;

			if(picker.getBoundingClientRect().left <= calendarWidth){
				calendar.style.left = "0px";
				_left = calendar.style.left;
			}
		}
		if (window.innerHeight - picker.getBoundingClientRect().top <= calendarHeight){
			var newHPosition = picker.getBoundingClientRect().top - calendarHeight;
			newHPosition = newHPosition < 0 ? 0 : newHPosition;
			calendar.style.top = newHPosition + "px";
			_top = calendar.style.top;

			if(picker.getBoundingClientRect().top <= calendarHeight/2){
				calendar.style.top = "0px";
				_top = calendar.style.top;
			}
		}
		if (header){
			var headerHeight = 180;
			if (window.innerHeight - picker.getBoundingClientRect().top <= (calendarHeight + headerHeight)  ){
					var newHPosition = window.innerHeight/3;
					calendar.style.top = newHPosition + "px";
					_top = calendar.style.top;

				if(picker.getBoundingClientRect().top <= (calendarHeight +180)){
					calendar.style.top = "0px";
					_top = calendar.style.top;
				}
			}
		}
		this._handleTriPlatDatePickerCalendarPosition(_top, _left, _position);
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

	_directEditRestrictedDateCheck: function(momentDate) {     
		if(!momentDate) {
			return;
		}
		var withoutTimeIndex = momentDate.indexOf("T");
		var dateString = momentDate.substring(0, withoutTimeIndex);
		var dateObj =  new Date(moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
		if (!this._isDateObject(dateObj)) {
			// For Arabic (and perhaps other languages), format("YYYY-MM-DDTHH:mm:ss.SSSZ") does not work, so use toISOString()
			dateObj =  new Date(moment(dateString).toISOString());
			if(!this._isDateObject(dateObj)){
				dateObj =  new Date(dateString);
				if (!this._isDateObject(dateObj)) {
					dateObj = null; 
				}
			}
		}
		if (this.disallowWeekends) {
			var day = dateObj.getDay();
			if (day == 0 || day == 6) {
				this.set("_errorMsg" , this.dateinvalidMsgViolateRestriction);
			}
		}
		if (this.disallowPastDates) {
			var today = new Date();
			var todayZeroHour = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			if (dateObj.getTime() < todayZeroHour.getTime()) {
				this.set("_errorMsg" , this.dateinvalidMsgViolateRestriction);
			}
		}
	  },


	computeDateInvalidMsg: function(displayFormat){
		var __dictionary__erroMsg = "The expected format is {dateFormat}. For example, {example}.";
		
		var d = new Date();
		var fixedFormat = this._convertToFixedMomentTzFormat(this.displayFormat);
		var momentFormat = moment().toMomentFormatString(fixedFormat);
		var example = moment(d).format(momentFormat);
		displayFormat = "\""+displayFormat+"\"";
		var _temp = __dictionary__erroMsg.replace("{dateFormat}", displayFormat).replace("{example}", example);
		__dictionary__erroMsg = _temp;
		return __dictionary__erroMsg;
	},

	computeDateInvalidMsgViolateRestriction: function(disallowWeekends, disallowPastDates){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var __dictionary__erroMsgViolateRestriction = "The date violates one or more of the restrictions specified by {restrictionAttributes}.";
		var restrictionAttributes = null;

		if (disallowPastDates && disallowWeekends) {
			restrictionAttributes = "disallow-weekends and disallow-past-dates";
		} else if (disallowWeekends) {
			restrictionAttributes = "disallow-weekends"
		} else if (disallowPastDates) {
			restrictionAttributes = "disallow-past-dates";
		}

		var _temp = __dictionary__erroMsgViolateRestriction.replace("{restrictionAttributes}", restrictionAttributes);
		__dictionary__erroMsgViolateRestriction = _temp;
		return __dictionary__erroMsgViolateRestriction;
	},

	_handleTriPlatDatePickerCalendarPosition: function(_top, _left, _position){
	    this.updateStyles({
		    "--tri-date-picker-calendar-position-top": _top + " !important",
		    "--tri-date-picker-calendar-position-left": _left + " !important",
		    "--tri-date-picker-calendar-position": _position + " !important"
		});
	},

	_hasIsoDateLength: function(date) {
		return date.length === this._isoDateLength || date.length === this._isoUTCDateLength;   
	} 
};