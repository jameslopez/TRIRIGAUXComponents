/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { PolymerElement } from '../@polymer/polymer/polymer-element.js';
import { Debouncer } from '../@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '../@polymer/polymer/lib/utils/async.js';

/*
triplat-query-reserve-context specifies the context properties to run a reserve query. When this component is used, you do not need <b>triplat-ds-context</b> 
to set a reserve context record. But if you run a reserve query without using this component, you need <b>triplat-ds-context</b> to set the reserve context 
record that is used by the reserve query engine to run the desired query.

### Recurrence object

The recurrence object has the following properties:
- <b>type</b>: The type of the recurrence pattern. It can be one of the values from the triRecurrencePatternTypeICal list: DAILY, WEEKLY, MONTHLY or YEARLY.
- <b>dailyProperties</b>: The daily recurrence object. It must be set if the <b>type</b> is DAILY.
- <b>weeklyProperties</b>: The weekly recurrence object. It must be set if the <b>type</b> is WEEKLY.
- <b>monthlyProperties</b>: The monthly recurrence object. It must be set if the <b>type</b> is MONTHLY.
- <b>yearlyProperties</b>: The yearly recurrence object. It must be set if the <b>type</b> is YEARLY.

### Daily recurrence object

The daily recurrence object has the following properties:
- <b>type</b>: The type of the daily recurrence. It can be one of the values from the triRecurrenceDailyOptionsICal list:  "Every [x] day(s)", "Every weekday" or "Every weekend day".
- <b>interval</b>: The daily recurrence period between instances. It can be used if the <b>type</b> is "Every [x] day(s)".
- <b>end</b>: The recurrence end object.

### Weekly recurrence object

The weekly recurrence object has the following properties:
- <b>interval</b>: The weekly recurrence period between instances.
- <b>weeklyDays</b>: An array of days of the week. The array can contain one or more days of week. Valid values are: "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" and "Saturday".
- <b>end</b>: The recurrence end object.

### Monthly recurrence object

The monthly recurrence object has the following properties:
- <b>type</b>: The type of the monthly recurrence. It can be one of the values from the triRecurrenceMonthlyOptionsICal list:  "Day [x] of every [x] month(s)" or "The [First] [Monday] of every [x] month(s)".
- <b>interval</b>: The monthly recurrence period between instances.
- <b>dayOfMonth</b>: A number representing the day of the month. It must be a number between 1 and 31. It must be used if the <b>type</b> is "Day [x] of every [x] month(s)".
- <b>dayOfWeek</b>: Represents the day of the week. It can be one of the values from the triRecurrenceMonthlyDayOfWeekICal list: "day", "weekday", "weekend day", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" or "Saturday". It must be used if the type is "The [First] [Monday] of every [x] month(s)".
- <b>weekOfMonth</b>: Represents the ordinal position of the week inside the month. It can be one of the values from the weeks list: "First", "Second", "Third" or "Fourth", "Last". It must be used if the <b>type</b> is "The [First] [Monday] of every [x] month(s)".
- <b>end</b>: The recurrence end object.

### Yearly recurrence object

The yearly recurrence object has the following properties:
- <b>type</b>: The type of the yearly recurrence. It can be one of the values from the triRecurrenceYearlyOptionsICal list:  "Every [May] [1]" or "The [First] [Monday] of [May]".
- <b>dayOfMonth</b>: A number representing the day of the month. It must be a number between 1 and 31. It must be used if the <b>type</b> is "Every [May] [1]".
- <b>dayOfWeek</b>: Represents the day of the week. It can be one of the values from the triRecurrenceYearlyDayOfWeekICal list: "day", "weekday", "weekend day", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" or "Saturday". It must be used if the type is "The [First] [Monday] of [May]".
- <b>weekOfMonth</b>: Represents the ordinal position of the week inside the month. It can be one of the values from the weeks list: "First", "Second", "Third", "Fourth" or "Last". It must be used if the <b>type</b> is "The [First] [Monday] of [May]".
- <b>month</b>: Represents the month. It can be one of the values from the months list: "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" or "December".
- <b>end</b>: The recurrence end object.

### Recurrence end object

The recurrence end has the following properties:
- <b>type</b>: The type of the recurrence end. It can be one of the values from the triRecurrenceEndOptionsICal list:  "End After", "End Date" or "No End Date".
- <b>endDate</b>: The end date for the recurrence. This must be in ISO format. It must be used if the <b>type</b> is "End Date".
- <b>numberOfOccurrencesBeforeEnd</b>: The number of recurrence instances. It must be used if the <b>type</b> is "End After".

### Recurrence object examples

- A monthly recurrence, on the third weekday of every month, ending after 10 occurrences:
```
	{
		type: "MONTHLY",
		monthlyProperties: {
			type: "The [First] [Monday] of every [x] month(s)",
			interval: 1,
			dayOfWeek: "weekday",
			weekOfMonth: "Third",
			end: {
				type: "End After",
				numberOfOccurrencesBeforeEnd: 10
			}
		}
	}
```

- A weekly recurrence, every 2 weeks, on Monday and Friday, ending on 30 August 2019:
```
	{
		type: "WEEKLY",
		weeklyProperties: {
			interval: 2,
			weeklyDays: ["Monday", "Friday"],
			end: {
				type: "End Date",
				endDate: "2019-08-30T23:59:59.000-00:00"
			}
		}
	}
```
*/
class TriplatQueryReserveContext extends PolymerElement {
	static get is() { return "triplat-query-reserve-context"; }

	static get properties() {
		return {
			/**
			 * The start date for the range that is searched. This must be in ISO format.
			 */
			startDate: {
				type: String
			},

			/**
			 * The end date for the range that is searched. This must be in ISO format.
			 */
			endDate: {
				type: String
			},
			
			/**
			 * The maximum number of resources that is returned by the reserve query. 
			 * If this property is not set or has a value that equals zero, it returns the entire set of query results.
			 */
			resultsLimit: {
				type: Number
			},
			
			/**
			 * The minimum percentage of the time that a resource can be available for a recurring reservation. 
			 * For example, if you specify 90, the query will return only resources that are available 90% of the recurring instances. 
			 * In this case, a resource that is available 4 of 5 days is not shown as available.
			 * This property is only used if you set the <b>recurrence</b> property.
			 * It must be a integer between 1 and 100.
			 */
			recurrenceAvailabilityPercentage: {
				type: Number
			},
			
			/**
			 * The recurrence properties that are applied to the reserve query.
			 */
			recurrence: {
				type: Object
			}
		};
	}
	
	static get observers() {
		return [
			"_handleQueryReserveContextChanged(startDate, endDate, resultsLimit, recurrenceAvailabilityPercentage, recurrence.*)"
		]
	}
	
	_handleQueryReserveContextChanged(startDate, endDate, resultsLimit, recurrenceAvailabilityPercentage, recurrenceChange) {
		if (!startDate || !endDate) {
			return
		}
		this._debounceReserveContextChanged = Debouncer.debounce(
			this._debounceReserveContextChanged, 
			microTask, 
			() => {
				this.dispatchEvent(
					new CustomEvent(
						"triplat-query-reserve-context-changed", 
						{
							detail: this.config,
							bubbles: true, composed: true
						}
					)
				);
			}
		);
	}
	
	get config() {
		if (!this.startDate && !this.endDate) {
			return null;
		}
		let config = {startDate: this.startDate, endDate: this.endDate, resultsLimit: this.resultsLimit, recurrence: this.recurrence};
		if (this.recurrenceAvailabilityPercentage != null && this.recurrenceAvailabilityPercentage > 0 && this.recurrenceAvailabilityPercentage <= 100) {
			config.availabilityThreshold = this.recurrenceAvailabilityPercentage / 100;
		}
		return config;
	}
}

window.customElements.define(TriplatQueryReserveContext.is, TriplatQueryReserveContext);