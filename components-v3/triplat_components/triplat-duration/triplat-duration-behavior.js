/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
export const triPlatDuration = {};

triPlatDuration.Multiplier = {};
triPlatDuration.Multiplier.SECOND = 1000;
triPlatDuration.Multiplier.MINUTE = 60*triPlatDuration.Multiplier.SECOND;
triPlatDuration.Multiplier.HOUR = 60*triPlatDuration.Multiplier.MINUTE;
triPlatDuration.Multiplier.DAY = 24*triPlatDuration.Multiplier.HOUR;
triPlatDuration.Multiplier.WEEK = 7*triPlatDuration.Multiplier.DAY;
triPlatDuration.Multiplier.MONTH_DAY = (365 * triPlatDuration.Multiplier.DAY)/12;
triPlatDuration.Multiplier.MONTH = 100000000000000;
triPlatDuration.Symbol = {};
triPlatDuration.Symbol.MILLISECOND = "S";
triPlatDuration.Symbol.SECOND = "s";
triPlatDuration.Symbol.MINUTE = "m";
triPlatDuration.Symbol.HOUR = "h";
triPlatDuration.Symbol.DAY = "d";
triPlatDuration.Symbol.WEEK = "w";
triPlatDuration.Symbol.MONTH = "M";
triPlatDuration.Symbol.YEAR = "y";
triPlatDuration.Max = {};
triPlatDuration.Max.SECOND = 59;
triPlatDuration.Max.MINUTE = 59;
triPlatDuration.Max.HOUR = 23;
triPlatDuration.Max.DAY = 6;
triPlatDuration.Max.MONTH = 11;

/**
 * A behavior to support duration. 
 *
 * @polymerBehavior TriPlatDurationBehavior
 *
 */
export const TriPlatDurationBehavior = {

	properties: {

	  /*
	   * Optional minimum allowed when a year value is decreased. If a value is smaller than yearMin, the value will immediately be changed to yearMin.
	   */
	  yearMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when a year value is increased. If a value is greater than yearMax, the value will immediately be changed to yearMax.
	   */
	  yearMax: {
		type: Number
	  },

	  /*
	   * Optional looping functionality for the year. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when a year value is increased or decreased (between yearMin and yearMax). If a value is greater than yearMax, the value will immediately be changed to yearMin.
	   * If a value is smaller than yearMin, the value will immediately be changed to yearMax. Requires yearMax value.
	   */
	  yearLoop: {
		type: Number,
		value: 0
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing a year value.
	   */
	  yearStep: {
		type: Number,
		value: 1
	  },    

	  /*
	   * Optional minimum allowed when a month value is decreased. If a value is smaller than monthMin, the value will immediately be changed to monthMin.
	   */
	  monthMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when a month value is increased. If a value is greater than monthMax, the value will immediately be changed to monthMax.
	   */
	  monthMax: {
		type: Number,
		value: 11
	  },

	  /*
	   * Optional looping functionality for the month. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when a month value is increased or decreased (between monthMin and monthMax). If a value is greater than monthMax, the value will immediately be changed to monthMin.
	   * If a value is smaller than monthMin, the value will immediately be changed to monthMax. Requires monthMax value.
	   */
	  monthLoop: {
		type: Number,
		value: 1
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing a month value.
	   */
	  monthStep: {
		type: Number,
		value: 1
	  },    

	  /*
	   * Optional minimum allowed when a week value is decreased. If a value is smaller than weekMin, the value will immediately be changed to weekMin.
	   */
	  weekMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when a week value is increased. If a value is greater than weekMax, the value will immediately be changed to weekMax.
	   */
	  weekMax: {
		type: Number
	  },

	  /*
	   * Optional looping functionality for the week. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when a week value is increased or decreased (between weekMin and weekMax). If a value is greater than weekMax, the value will immediately be changed to weekMin.
	   * If a value is smaller than weekMin, the value will immediately be changed to weekMax. Requires weekMax value.
	   */
	  weekLoop: {
		type: Number,
		value: 0
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing a week value.
	   */
	  weekStep: {
		type: Number,
		value: 1
	  },    

	  /*
	   * Optional minimum allowed when a day value is decreased. If a value is smaller than dayMin, the value will immediately be changed to dayMin.
	   */
	  dayMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when a day value is increased. If a value is greater than dayMax, the value will immediately be changed to dayMax.
	   */
	  dayMax: {
		type: Number,
		value: 6
	  },

	  /*
	   * Optional looping functionality for the day. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when a day value is increased or decreased (between dayMin and dayMax). If a value is greater than dayMax, the value will immediately be changed to dayMin.
	   * If a value is smaller than dayMin, the value will immediately be changed to dayMax. Requires dayMax value.
	   */
	  dayLoop: {
		type: Number,
		value: 1
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing a day value.
	   */
	  dayStep: {
		type: Number,
		value: 1
	  },    

	  /*
	   * Optional minimum allowed when an hour value is decreased. If a value is smaller than hourMin, the value will immediately be changed to hourMin.
	   */
	  hourMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when an hour value is increased. If a value is greater than hourMax, the value will immediately be changed to hourMax.
	   */
	  hourMax: {
		type: Number,
		value: 23
	  },

	  /*
	   * Optional looping functionality for the hour. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when an hour value is increased or decreased (between hourMin and hourMax). If a value is greater than hourMax, the value will immediately be changed to hourMin.
	   * If a value is smaller than hourMin, the value will immediately be changed to hourMax. Requires hourMax value.
	   */
	  hourLoop: {
		type: Number,
		value: 1
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing an hour value.
	   */
	  hourStep: {
		type: Number,
		value: 1
	  },    

	  /*
	   * Optional minimum allowed when a minute value is decreased. If a value is smaller than minuteMin, the value will immediately be changed to minuteMin.
	   */
	  minuteMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when a minute value is increased. If a value is greater than minuteMax, the value will immediately be changed to minuteMax.
	   */
	  minuteMax: {
		type: Number,
		value: 59
	  },

	  /*
	   * Optional looping functionality for the minute. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when a minute value is increased or decreased (between minuteMin and minuteMax). If a value is greater than minuteMax, the value will immediately be changed to minuteMin.
	   * If a value is smaller than minuteMin, the value will immediately be changed to minuteMax. Requires minuteMax value.
	   */
	  minuteLoop: {
		type: Number,
		value: 1
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing a minute value.
	   */
	  minuteStep: {
		type: Number,
		value: 1
	  },    

	  /*
	   * Optional minimum allowed when a second value is decreased. If a value is smaller than secondMin, the value will immediately be changed to secondMin.
	   */
	  secondMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when a second value is increased. If a value is greater than secondMax, the value will immediately be changed to secondMax.
	   */
	  secondMax: {
		type: Number,
		value: 59
	  },

	  /*
	   * Optional looping functionality for the second. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when a second value is increased or decreased (between secondMin and secondMax). If a value is greater than secondMax, the value will immediately be changed to secondMin.
	   * If a value is smaller than secondMin, the value will immediately be changed to secondMax. Requires secondMax value.
	   */
	  secondLoop: {
		type: Number,
		value: 1
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing a second value.
	   */
	  secondStep: {
		type: Number,
		value: 1
	  },    

	  /*
	   * Optional minimum allowed when a millisecond value is decreased. If a value is smaller than millisecondMin, the value will immediately be changed to millisecondMin.
	   */
	  millisecondMin: {
		type: Number,
		value: 0
	  },

	  /*
	   * Optional maximum allowed when a millisecond value is increased. If a value is greater than millisecondMax, the value will immediately be changed to millisecondMax.
	   */
	  millisecondMax: {
		type: Number,
		value: 999
	  },

	  /*
	   * Optional looping functionality for the millisecond. When set to 1, looping is enabled, and when set to 0, looping is disabled. 
	   * Looping occurs when a millisecond value is increased or decreased (between millisecondMin and millisecondMax). If a value is greater than millisecondMax, the value will immediately be changed to millisecondMin.
	   * If a value is smaller than millisecondMin, the value will immediately be changed to millisecondMax. Requires millisecondMax value.
	   */
	  millisecondLoop: {
		type: Number,
		value: 1
	  },

	  /*
	   * Amount to add or subtract when incrementing or decrementing a millisecond value.
	   */
	  millisecondStep: {
		type: Number,
		value: 1
	  }

	},

	 /**
	  * Return a formatted string duration to display (periods and values).
	  * Only duration periods that have a value will be displayed.
	  * Each duration period is followed by its period label (adjust to singular/plural).
	  */
	formatDisplayedDuration: function (displayedDuration) {
	  if(displayedDuration==null){
		return "";
	  }

	  var formatedValue = "";

	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.years, "Year");
	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.months, "Month");
	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.weeks, "Week");
	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.days, "Day");
	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.hours, "Hour");
	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.minutes, "Minute");
	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.seconds, "Second");
	  formatedValue = formatedValue + this.addDisplayedPeriod(displayedDuration.milliseconds, "Millisecond");

	  return formatedValue.trim();
	},


	 /**
	  * Return a string duration to display a given period.
	  */
	addDisplayedPeriod: function (periodValue, period) {
	  if(periodValue==null || period==null){
		return "";
	  }

	  var formatedValue = "";

	  if(periodValue>0){
		var periodLabel = period;
		if(periodValue > 1){
		  //get the plural translated value
		  periodLabel = periodLabel + "s";
		}

		formatedValue = periodValue + " " + this.handleTranslation(periodLabel) + " ";
	  }

	  return formatedValue;
	},

	/**
	  * Process the numeric duration value and return an object that contains the duration values.
	  * Only duration values that are part of the duration displayToken are returned.
	  */
	getDisplayedDuration: function (durationValue, displayTokens) {
	  //Convert to absolute value;
	  if(durationValue < 0) {
		  durationValue = 0-durationValue;
	  }

	  var displayedDuration = {};
	  displayedDuration.years;
	  displayedDuration.months;
	  displayedDuration.weeks;
	  displayedDuration.days;
	  displayedDuration.hours;
	  displayedDuration.minutes;
	  displayedDuration.seconds;
	  displayedDuration.milliseconds;

		//Only calculate the Duartion Fields being displayed/visible.
	  if (this.isDisplayYears(displayTokens) || this.isDisplayMonths(displayTokens)) {
		  var tempval = Math.floor(durationValue/triPlatDuration.Multiplier.MONTH);  
		  durationValue = durationValue%triPlatDuration.Multiplier.MONTH;
		  if (this.isDisplayYears(displayTokens)) {
			displayedDuration.years = Math.floor(tempval/12);
		  } else {
			displayedDuration.months = tempval;
		  }
		  if (this.isDisplayYears(displayTokens) && this.isDisplayMonths(displayTokens)) {
			displayedDuration.months = tempval%12;
		  }
		} else {
		  // Handle durationValue if months/years are no longer displayed on the duration field,
		  // but were once populated. This modifies the duration value to a number usable by
		  // weeks, days, hours, seconds, and milliseconds.
		  durationValue = this.handleDurationValueForNonDisplayedMonths(durationValue);
		}
	  if (this.isDisplayWeeks(displayTokens)) {
		  displayedDuration.weeks = Math.floor(durationValue/triPlatDuration.Multiplier.WEEK);
		  durationValue = durationValue%triPlatDuration.Multiplier.WEEK;
	  }
	  if (this.isDisplayDays(displayTokens)) {
		  displayedDuration.days = Math.floor(durationValue/triPlatDuration.Multiplier.DAY);
		  durationValue = durationValue%triPlatDuration.Multiplier.DAY;
	  }
	  if (this.isDisplayHours(displayTokens)) {
		  displayedDuration.hours = Math.floor(durationValue/triPlatDuration.Multiplier.HOUR);
		  durationValue = durationValue%triPlatDuration.Multiplier.HOUR;
	  }
	  if (this.isDisplayMinutes(displayTokens)) {
		  displayedDuration.minutes = Math.floor(durationValue/triPlatDuration.Multiplier.MINUTE);
		  durationValue = durationValue%triPlatDuration.Multiplier.MINUTE;
	  }
	  if (this.isDisplaySeconds(displayTokens)) {
		displayedDuration.seconds = Math.floor(durationValue/triPlatDuration.Multiplier.SECOND);
	  }
	  if (this.isDisplayMilliseconds(displayTokens)) {
		displayedDuration.milliseconds = durationValue%triPlatDuration.Multiplier.SECOND;
	  }

	return displayedDuration;
  },

  /**
   * Return an adjusted duration value (if the month was removed).
   */
  handleDurationValueForNonDisplayedMonths:function(durationValue){
	  var nonDisplayedMonths = Math.floor(durationValue/triPlatDuration.Multiplier.MONTH);
	  var ONE_MONTH = 1;

		if ( nonDisplayedMonths >= ONE_MONTH) {
		  durationValue = durationValue%triPlatDuration.Multiplier.MONTH + nonDisplayedMonths*triPlatDuration.Multiplier.MONTH_DAY;
		}
		return durationValue;
  },

  /**
	* Return a numeric calculated duration value for a given duration object.
	* This is the numeric value that can be saved.
	*/
  calculateDurationValue: function(periods) {
	  var durationValue = 0;
	  if(periods==null) {
		return "";
	  }

	  //verify positive numeric values
	  periods.year = (this.isNumericPositiveValue(periods.year))? Number(periods.year):0;
	  periods.month = (this.isNumericPositiveValue(periods.month))? Number(periods.month):0;
	  periods.week = (this.isNumericPositiveValue(periods.week))? Number(periods.week):0;
	  periods.day = (this.isNumericPositiveValue(periods.day))? Number(periods.day):0;
	  periods.hour = (this.isNumericPositiveValue(periods.hour))? Number(periods.hour):0;
	  periods.minute = (this.isNumericPositiveValue(periods.minute))? Number(periods.minute):0;
	  periods.second = (this.isNumericPositiveValue(periods.second))? Number(periods.second):0;
	  periods.millisecond = (this.isNumericPositiveValue(periods.millisecond))? Number(periods.millisecond):0;

	  //calculation formula base on Duration class
	  durationValue = (triPlatDuration.Multiplier.MONTH * ((periods.year *12 ) + periods.month)) +
				(periods.week * triPlatDuration.Multiplier.WEEK ) + (periods.day * triPlatDuration.Multiplier.DAY) +
				(periods.hour * triPlatDuration.Multiplier.HOUR) + (periods.minute * triPlatDuration.Multiplier.MINUTE) +
				(periods.second * triPlatDuration.Multiplier.SECOND) + periods.millisecond;

	  return durationValue;
  },

  /*
   * Return true if the loop value is 1, and return false if it is 0. Otherwise, keep the default loop setting.
   */
  isLoop: function(loopValue) {
	if (loopValue != undefined && loopValue == 1) {
	  return true;
	} else if (loopValue != undefined && loopValue == 0) {
	  return false;
	}

	return;
   },

  /*
   * Return true if the value is numeric and positive. Otherwise, return false.
   */
  isNumericPositiveValue: function(value) {
	if(isNaN(value) || value==null || value<0) {
	  return false;
	} else {
	  return true;
	}
  },

  /**
	* Return true if the given display tokens include the symbol for the year. Otherwise, return false.
	*/
  isDisplayYears:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.YEAR)>-1)? true:false;
  },

  /**
	* Return true if the given display tokens include the symbol for the month. Otherwise, return false.
	*/
  isDisplayMonths:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.MONTH)>-1)? true:false;
  },

  /**
	* Return true if the given display tokens include the symbol for the week. Otherwise, return false.
	*/
  isDisplayWeeks:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.WEEK)>-1)? true:false;
  },

  /**
	* Return true if the given display tokens include the symbol for the day. Otherwise, return false.
	*/
  isDisplayDays:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.DAY)>-1)? true:false;
  },

  /**
	* Return true if the given display tokens include the symbol for the hour. Otherwise, return false.
	*/
  isDisplayHours:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.HOUR)>-1)? true:false;
  },

  /**
	* Return true if the given display tokens include the symbol for the minute. Otherwise, return false.
	*/
  isDisplayMinutes:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.MINUTE)>-1)? true:false;
  },

  /**
	* Return true if the given display tokens include the symbol for the second. Otherwise, return false.
	*/
  isDisplaySeconds:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.SECOND)>-1)? true:false;
  },

  /**
	* Return true if the given display tokens include the symbol for the millisecond. Otherwise, return false.
	*/
  isDisplayMilliseconds:function(displayTokens){
	return (displayTokens!=null && displayTokens.indexOf(triPlatDuration.Symbol.MILLISECOND)>-1)? true:false;
  },

  /**
   * Return a translated period label.
   */
  handleTranslation: function(durationPeriod){
	//singular duration periods
  var __dictionary__y = "Year";
  var __dictionary__M = "Month";
  var __dictionary__w = "Week";
  var __dictionary__d = "Day";
  var __dictionary__h = "Hour";
  var __dictionary__m = "Minute";
  var __dictionary__s = "Second";
  var __dictionary__S = "Millisecond";

	//plural duration periods
  var __dictionary__yp = "Years";
  var __dictionary__Mp = "Months";
  var __dictionary__wp = "Weeks";
  var __dictionary__dp = "Days";
  var __dictionary__hp = "Hours";
  var __dictionary__mp = "Minutes";
  var __dictionary__sp = "Seconds";
  var __dictionary__Sp = "Milliseconds";

  if(durationPeriod ==="Year") return __dictionary__y;
  if(durationPeriod ==="Month") return __dictionary__M;
  if(durationPeriod ==="Week") return __dictionary__w;
  if(durationPeriod ==="Day") return __dictionary__d;
  if(durationPeriod ==="Hour") return __dictionary__h;
  if(durationPeriod ==="Minute") return __dictionary__m;
  if(durationPeriod ==="Second") return __dictionary__s;
  if(durationPeriod ==="Millisecond") return __dictionary__S;
  if(durationPeriod ==="Years") return __dictionary__yp;
  if(durationPeriod ==="Months") return __dictionary__Mp;
  if(durationPeriod ==="Weeks") return __dictionary__wp;
  if(durationPeriod ==="Days") return __dictionary__dp;
  if(durationPeriod ==="Hours") return __dictionary__hp;
  if(durationPeriod ==="Minutes") return __dictionary__mp;
  if(durationPeriod ==="Seconds") return __dictionary__sp;
  if(durationPeriod ==="Milliseconds") return __dictionary__Sp;
  }
 
};