/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
export const TriCompCalendarContainerBehavior = {

	openTriCalendar: function(picker, calendar) {

		calendar.style.border = "none";

		var LARGE_WIDTH = 766;
		var MEDIUM_WIDTH = 574;     // (766 / 75%)
		var SMALL_WIDTH = 383;      // (766 / 50%)

		var MEDIUM_THRESHOLD = 800;
		var LARGE_THRESHOLD = 1280;

		var containerRect = picker.getBoundingClientRect();

		var calendarWidth = LARGE_WIDTH;
		if (window.matchMedia("(min-width: 1280px)").matches) {
			calendar.style.fontSize = "20px";
			calendarWidth = LARGE_WIDTH;
		} else if (window.matchMedia("(min-width: 800px) and (max-width: 1279px)").matches) {
			calendar.style.fontSize = "16px";
			calendarWidth = MEDIUM_WIDTH;
		} else if (window.matchMedia("(max-width: 799px)").matches) {
			calendar.style.fontSize = "14px";
			calendarWidth = SMALL_WIDTH;
		}

		calendar.style.top = containerRect.top+"px";

		var left = containerRect.left;
		if (containerRect.width == 0 && containerRect.right == containerRect.left) {
			
			var newLeft = containerRect.left - (calendarWidth / 2);
			

			left = newLeft;
		} else if (containerRect.width > 0) {
			
			var offset = (containerRect.width - calendarWidth) / 2;
			
			left = (left + offset);
		}

		calendar.style.left = left+"px";

		calendar.open();
	},
};