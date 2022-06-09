/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
export const TriPlatCalendarBehavior = {

  addDays: function(d, days) {
   var newDate = this.clone(d);
   newDate.setDate(d.getDate() + days);
   return newDate;
 },

 addMonths: function(d, months) {
   var newDate = this.clone(d);
   newDate.setMonth(d.getMonth() + months);
   return newDate;
 },

 clone: function(d) {
   var year = d.getFullYear(), 
	month = d.getMonth();
	d = new Date(year, month, 1);
   return new Date(d.getTime());
 },

 getDaysInMonth: function(d) {
   var resultDate = this.getFirstDayOfMonth(d);
   resultDate.setMonth(resultDate.getMonth() + 1);
   resultDate.setDate(resultDate.getDate() - 1);
   return resultDate.getDate();
 },

 getFirstDayOfMonth: function(d) {
   return new Date(d.getFullYear(), d.getMonth(), 1);
 },

 getWeekArray: function(d) {
   var dayArray = [];
   var daysInMonth = this.getDaysInMonth(d);
   var daysInWeek;
   var emptyDays;
   var firstDayOfWeek;
   var week;
   var weekArray = [];

   for (var i = 1; i <= daysInMonth; i++) {
	 dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
   };

   while (dayArray.length) {
	firstDayOfWeek = dayArray[0].getDay();
	daysInWeek = 7 - firstDayOfWeek;
	emptyDays = 7 - daysInWeek;
	week = dayArray.splice(0, daysInWeek);

	for (var i = 0; i < emptyDays; i++) {
	  week.unshift(null);
	};

	weekArray.push(week);
  }

  return weekArray;
},

  isEqualDate: function(d1, d2) {
 return d1 && d2 &&
 (d1.getFullYear() === d2.getFullYear()) &&
 (d1.getMonth() === d2.getMonth()) &&
 (d1.getDate() === d2.getDate());
},

isEqualMonth: function(d1, d2) {
 return d1 && d2 &&
 (d1.getFullYear() === d2.getFullYear()) &&
 (d1.getMonth() === d2.getMonth());
},

monthDiff: function(d1, d2) {
  var m;
  m = (d1.getFullYear() - d2.getFullYear()) * 12;
  m += d1.getMonth();
  m -= d2.getMonth();
  return m;
}
};