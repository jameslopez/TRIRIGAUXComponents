/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import "../@polymer/polymer/polymer-legacy.js";
import { importJs } from "../tricore-util/tricore-util.js";

export const importJsPromise = importJs([
    "../jstimezonedetect/dist/jstz.min.js",
    "../moment/moment.js",
    "../moment-timezone/builds/moment-timezone-with-data-2012-2022.js",
    "../moment-jdateformatparser/moment-jdateformatparser.min.js",
    "../moment/min/locales.min.js"
], "triplat-date-utilities/triplat-date-utilities.js");

/**
TriDateUtilities is a date utility component that allows user to convert and get date/datetime in ISO date string format.

@demo demo/index.html
@polymerBehavior
*/
export const TriDateUtilities = {

	_getCurrentDateString: function(){
		return this._getDateString(new Date());
	},

	_getCurrentDatetimeString: function(){
		return this._getDateTimeString(new Date());
	},

	 /**
		* Returns date string.<br/>
		* @param {Object} date The JavaScript Date Object.
		*/
	_getDateString: function(date){
		if(this._isDateObject(date)){
			return moment(date).format("YYYY-MM-DD");
		}
	},

	/**
		* Returns datetime string.<br/>
		* @param {Object} date The JavaScript Date Object.
		*/
	_getDateTimeString: function(date){
		if(this._isDateObject(date)){
			return moment(date).format("YYYY-MM-DDTHH:mm:ss"); 
		}
	},

	/**
		* Returns current date in ISO date string.<br/>
		* @param {String} timeZone The string representation of the time zone (e.g. US/Eastern).
		* Notice: if no time zone parameter is passed in, the method will return the current date that is based on browser time zone.
		*/
	getCurrentDate: function(timeZone){
		var dateString = this._getCurrentDateString();
		if(timeZone){
			return moment.tz(dateString, timeZone).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
		}else{
			return moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
		}
	},
	/**
		* Returns current datetime in ISO date string.<br/>
		* @param {String} timeZone The string representation of the time zone (e.g. US/Eastern).
		* Notice: if no time zone parameter is passed in, the method will return the current datetime that is based on browser time zone.
		*/
	getCurrentDatetime: function(timeZone){
		var datetimeString = this._getCurrentDatetimeString();
		if(timeZone){
			return moment.tz(timeZone).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
		}else{
			return moment(datetimeString).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
		}
	},
	/**
		* Converts to a given time zone by keeping the exact datetime in ISO date string format.<br/>
		* Returns ISO date string.
		* @param {String} isoString The string representation of the ISO date string (e.g. 1970-01-15T22:19:41.000-08:00).
		* @param {String} timeZone The string representation of the time zone (e.g. Canada/Eastern).
		*/
	normalizeToTimezone: function(isoString, timeZone){
		if(isoString){
			if(this._isIsoDateStringFormat(isoString)){
				var datetimeString = isoString.substring(0, "YYYY-MM-DDTHH:mm:ss.SSS".length);
				if(timeZone){
					return moment.tz(datetimeString, timeZone).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
				}else{
					console.error("Missing timeZone parameter");
					return;
				}
			}
			console.error("Incorrect ISO date string format");
			return;
		}
		console.error("Missing ISO date string parameter");
		return;
	},

	/**
		* Converts unix timestamp (seconds) to ISO date string.<br/>
		* Return ISO date string.
		* @param {Number} milliseconds The integer representation of the unix timestamp (seconds) (e.g. 1415467435).
		*/
	toDateIsoString: function(milliseconds){
		if(typeof milliseconds === 'number'){ 
			// milliseconds = moment(milliseconds).unix();
			// return moment.unix(milliseconds).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
			return moment(milliseconds).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
		}
		console.error("Incorrect milliseconds parameter format");
		return;
	},

	/**
		* Converts ISO date/datetime string to unix timestamp (seconds).<br/>
		* Return unix timestamp (seconds).
		* @param {String} isoString The string representation of the ISO date string (e.g. 2010-01-20T22:00:10.000-08:00).
		*/
	toMilliseconds: function(isoString){
		if(isoString){
			//since the time zone offset display in 6 chars (e.g -08:00)
			if(this._isIsoDateStringFormat(isoString)){
				return moment(isoString).valueOf();
			}
			console.error("Incorrect ISO date string format");
			return;
		}
		console.error("Missing ISO date string parameter or incorrect ISO date string");
		return;  
	},

	/**
		* Get client time zone from browser.<br/>
		* Return string (e.g. US/Pacific).
		*/
	getBrowserTimeZone: function(){
	   return jstz.determine().name(); 
	},
	
	/**
	 * Formats the ISO date string to a given time zone and a user date format.<br/>
	 * @param {String} isoString The string representation of the ISO date string (e.g. 1970-01-15T22:19:41.000-08:00).
	 * @param {String} timeZone The string representation of the time zone (e.g. Canada/Eastern).
	 * @param {String} format The user date format as set in the user's profile.
	 * @param {Strinh} userLanguageCode The code of the language set in the user's profile.(en-US) 
	 */
	formatDateWithTimeZone: function(isoString, timeZone, userFormat, userLanguageCode) {
		if(isoString != null && this._isIsoDateStringFormat(isoString)) {
			var fixedFormat = this._convertToFixedMomentTzFormat(userFormat);
			var mDatetime = moment(isoString);
			if (timeZone != null) {
				mDatetime = mDatetime.tz(timeZone);	
			}
			if (userLanguageCode != null) {
				mDatetime = mDatetime.locale(userLanguageCode);
			}
			return mDatetime.formatWithJDF(fixedFormat);
		}
	},
	
	/**
	 * Formats the ISO date string to a given user date format.
	 * @param {String} isoString The string representation of the ISO date string (e.g. 1970-01-15T22:19:41.000-08:00).
	 * @param {String} format the user date format as set in the user's profile.
	 * @param {Strinh} userLanguageCode The code of the language set in the user's profile.(en-US) 
	 */
	formatDate: function(date, dateFormat, locale) {
		if (!date) return "";
		
		let parsedDate = moment.parseZone(date);
		if (locale) {
			parsedDate = parsedDate.locale(locale);
		}
		return parsedDate.formatWithJDF(dateFormat);
	},
	
	/**
		* To check if a string is a ISO date string format.
		* @param {String} isoString The string representation of the ISO date string (e.g. 2010-01-20T22:00:10.000-08:00).
		*/
	_isIsoDateStringFormat: function(isoString){
		if(isoString){
			if((isoString.indexOf("T") > -1) && (isoString.length === moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ").length || isoString.length === "YYYY-MM-DDTHH:mm:ss.SSSZ".length)){
				return true;
			}
			return false;
		}
		return false;
	}, 

	/**
		* To check if the object is a JavaScript date object.
		* @param {Object} dateObj The JavaScript Date Object.
		*/
	_isDateObject: function(dateObj){
		if({}.toString.call(dateObj)==="[object Date]"){
			if(isNaN(dateObj)){
				return false;
			}else{
				return true;
			}
		}
		return false;
	},

	/**
		* Converts the ISO date string to a given time zone.<br/>
		* Returns ISO date string.
		* @param {String} isoString The string representation of the ISO date string (e.g. 1970-01-15T22:19:41.000-08:00).
		* @param {String} timeZone The string representation of the time zone (e.g. Canada/Eastern).
		* @param {String} format The format of the return string (e.g. YYYY-MM-DDTHH:mm:ss).
		* Notice: The return format is in the ISO date string (YYYY-MM-DDTHH:mm:ss.SSSZ) if no specified format is passed.
		*/
	_toTimeZone: function(isoString, timeZone, format){
		 if(isoString){
			if(this._isIsoDateStringFormat(isoString)){
				if(timeZone){
					var toMilliseconds = this.toMilliseconds(isoString);     
					if(format){
						return moment(toMilliseconds).tz(timeZone).format(format);
					}             
					return moment(toDateObj).tz(timeZone).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
				}else{
					console.error("Missing timeZone parameter");
					return;
				}
				console.error("Incorrect ISO date string format");
				return;
			}
		}
	},

	/**
		* Converts the ISO date string to a JavaScript Date Object.<br/>
		* Return JavaScript Date Object.
		* @param {String} isoString The string representation of the ISO date string (e.g. 2010-01-20T22:00:10.000-08:00).
		*/
	_toDateObject: function(isoString){
		var toDateObj = new Date(this.toMilliseconds(isoString));   
		return toDateObj;
	},
	
	_convertToFixedMomentTzFormat: function(format){
		format = format || "MM/DD/YYYY hh:mm a";
		if (format.replace(/[^z]/g, "").length===1){
			format = format.replace("z", "zz")
		} 

		else if (format.replace(/[^z]/g, "").length===3){
			format = format.replace("zzz", "zz")
		}
		else if (format.replace(/[^z]/g, "").length===4){
			format = format.replace("zzzz", "zz")
		}

		if(format.replace(/[^M]/g,"").length===5){
			format = format.replace("MMMMM", "MMMM");
		}

		var end = false;
		var fixedFormat = format.replace(/\'/g, function(match) {
		  return (end = !end) ? '[' : ']';    
		});
		return fixedFormat;
	}    
};