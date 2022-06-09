/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-datetime-picker/triplat-datetime-picker.js';
import "../../triplat-date-picker/triplat-calendar-times.js";
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../@polymer/iron-icons/av-icons.js';
import '../../@polymer/iron-icon/iron-icon.js';
import "../../triplat-theme/triplat-theme.js";

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<style is="custom-style" include="tristyles-theme iron-flex iron-flex-alignment" type="text/css">
				body {
					font-family: var(--tri-font-family);
				}
			
				div.line span.info {
					align-self: flex-end;
					margin-bottom: 5px;
					font-weight: bold;
				}
			
				.line {
					padding: 0px;
					margin: 0px 30px;
				}
				
				.time-section {
					width: 400px;
					margin: 30px 30px 0px;
				}
				
				.time-style {
					--iron-icon-fill-color: var(--tri-primary-color);
					--triplat-calendar-times-separator: {
						display: none;
					};
					--triplat-calendar-times-header: {
						display: none;
					};
					--triplat-calendar-times-time-section: {
						padding: 0px;
						@apply --layout-center-justified;
					};
				}
			</style>
			<div class="layout vertical line">
			
			<div class="layout horizontal line">
				<span class="info"> Simple date time picker: </span>
				<triplat-datetime-picker></triplat-datetime-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date time picker with minutes increase and decrease by 15: </span>
				<triplat-datetime-picker step-minute="15"></triplat-datetime-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date time picker with disallow weekends: </span>
				<triplat-datetime-picker disallow-weekends></triplat-datetime-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date time with custom elements: </span>
				<triplat-datetime-picker>
			      <iron-icon slot="label" icon="av:play-arrow"></iron-icon>
			      <span slot="label">Start</span>
			    </triplat-datetime-picker>
			</div>
			<div class="time-section">
				<span class="info">Simple time picker: </span>
				<triplat-calendar-times
					hour="{{_hour}}"
					minute="{{_min}}"
					step-hour="1"
					step-minute="15"
					step-second="15"
					display-seconds
					is-am-pm-format
					>
				</triplat-calendar-times>
			</div>
			<div class="time-section">
				<span class="info">Time picker styled with focus on the period counters: </span>
				<triplat-calendar-times
					class="time-style"
					hour="{{_hour}}"
					minute="{{_min}}"
					step-hour="1"
					step-minute="15"
					show-colon-separator
					show-label-under
					counters-only
					hour-min-digits=1
					display-seconds
					>
				</triplat-calendar-times>
			</div>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);