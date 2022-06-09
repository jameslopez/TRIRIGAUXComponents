/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-date-utilities/triplat-date-utilities.js';
import '../../triplat-datetime-picker/triplat-datetime-picker.js';
import '../../triplat-date-picker/triplat-date-picker.js';
import "../../triplat-calendar-container/triplat-calendar-container.js";
import '../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../@polymer/paper-listbox/paper-listbox.js';
import "../../@polymer/paper-item/paper-item.js";
import { TriDateUtilities } from '../../triplat-date-utilities/triplat-date-utilities.js';
import { mixinBehaviors } from '../../@polymer/polymer/lib/legacy/class.js';
import { assertParametersAreDefined, importJs } from "../../tricore-util/tricore-util.js";

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
                <div>The current date in ISO string format: <span>{{getCurrentDate()}}</span></div><br/>
                <div>The current date in ISO string format in New York time zone: <span>{{getCurrentDate("America/New_York")}}</span></div><br/>
                <div>The current datetime in ISO string format: <span>{{getCurrentDatetime()}}</span></div><br/>
                <div>The current datetime in ISO string format in New York time zone: <span>{{getCurrentDatetime("America/New_York")}}</span></div><br/>
                <div>
                    <div style="width:75%;height:75%">
                        <triplat-calendar-container
                                    id="calendar"
                                    value="{{toDateIsoString(1450743185000)}}"
                                    fit-width-to-parent>
                        </triplat-calendar-container> 
                    </div>
                </div>
                <div><br/>
                    <paper-dropdown-menu label="{{switchTo}}">
                    <paper-listbox slot="dropdown-content">
                        <paper-item on-tap="switchMilliseconds">Unix timestamp (seconds)</paper-item>
                        <paper-item on-tap="switchIsoDatetimeString">ISO date string</paper-item>
                    </paper-listbox>
                    </paper-dropdown-menu>
                    <span id="displayDatetime">1450743185000</span>
                </div>
            `;
        }

        static get properties() {
            return {
                switchTo: {
                    type: String,
                    value: "Unix timestamp (seconds)"
                },
                isISOstring:  {
                    type: Boolean,
                    value: false
                },
                isMillisecond: {
                    type: Boolean,
                    value: true
                }
            }
        }
        
        switchIsoDatetimeString() {
            if(!this.isISOstring){
                this.$.displayDatetime.innerHTML = this.toDateIsoString(Number(this.$.displayDatetime.innerHTML));
                this.set('isMillisecond', false);
                this.set('isISOstring', true);
                this.set('switchTo', "to ISO date string");
            }
            
        }
        switchMilliseconds() {
            if(!this.isMillisecond){
                this.$.displayDatetime.innerHTML = this.toMilliseconds(this.$.displayDatetime.innerHTML);
                this.set("isISOstring", false);	
                this.set("isMillisecond", true);
                this.set('switchTo', "to milliseconds");
            }
            
        }
    }

    window.customElements.define('tri-demo', TriDemo);
})
