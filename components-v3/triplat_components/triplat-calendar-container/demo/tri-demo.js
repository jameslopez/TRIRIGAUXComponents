/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-calendar-container/triplat-calendar-container.js';
import {TriDateUtilities} from '../../triplat-date-utilities/triplat-date-utilities.js';
import { mixinBehaviors } from '../../@polymer/polymer/lib/legacy/class.js';
import { importJs } from "../../tricore-util/tricore-util.js";

const importJsPromise = importJs([
    "../jstimezonedetect/dist/jstz.min.js",
    "../moment/moment.js",
    "../moment-timezone/builds/moment-timezone-with-data-2012-2022.js",
    "../moment-jdateformatparser/moment-jdateformatparser.min.js",
    "../moment/min/locales.min.js"
    ], "triplat-date-utilities/triplat-date-utilities.js");
     
    importJsPromise.then(() => {
class TriDemo extends mixinBehaviors([TriDateUtilities], PolymerElement) {
	static get template() {
        return html `
            <style type="text/css">
                body {
                    font-family: var(--tri-font-family);
                }
            </style>
            
            <div>Show a calendar where tomorrow is selected and the only valid selections are the two weekdays after tomorrow</div>
			<div>
				<div style="width:75%;height:75%">
					<triplat-calendar-container
								id="calendar"
								disallow-weekends 
								restrict-to-date-list="{{_onlyAllowValidMoveDates()}}"
								valid-date-list="{{_validMoveDates()}}"
								value="{{initialDay}}">
					</triplat-calendar-container> 
				</div>
            </div>
        `;
    }

    static get properties() {
		return {
			initialDay: {
                type: Date,
                value: function() { 
                        var today = new Date(); 
                        var val = today.getTime();
                        val = val + 86400000;
                        return this.toDateIsoString(val);
                    }
            },
            msPerDay: {
                type: Number,
                value: 86400000,
                readOnly: true
            }
		}
    }
    
    static get behaviors() {
		return [
			TriDateUtilities
		]
    }

    _onlyAllowValidMoveDates() {
        return true;
    }

    _validMoveDates() {
        var msPerDay = 86400000; 
        var arr = [];
        var today = new Date();
        var tomorrow = today.getTime() + 86400000;

        var nextWeekday = new Date(tomorrow + msPerDay);
        while (nextWeekday.getDay() == 0 || nextWeekday.getDay() == 6) {
            nextWeekday = new Date(nextWeekday.getTime() + msPerDay);
        }
        var nextNextWeekday = new Date(nextWeekday.getTime() + msPerDay);
        while (nextNextWeekday.getDay() == 0 || nextNextWeekday.getDay() == 6) {
            nextNextWeekday = new Date(nextNextWeekday.getTime() + msPerDay);
        }

        arr.push(nextWeekday); 
        arr.push(nextNextWeekday); 
        return arr;
    }
}

window.customElements.define('tri-demo', TriDemo);
    })
