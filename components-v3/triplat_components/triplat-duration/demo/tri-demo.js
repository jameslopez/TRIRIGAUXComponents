/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-duration/triplat-duration.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import "../../triplat-theme/triplat-theme.js";

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<style is="custom-style" include="tristyles-theme iron-flex iron-flex-alignment" type="text/css">
				body {
					font-family: 'Roboto', 'Noto', sans-serif;
				}
		
				.info {
					font-weight: bold;
				}
		
				.line {
					padding-bottom: 30px;
		    		padding-left: 30px;
		    		padding-right: 30px;
				}
		
				triplat-duration.duration400 {
					--triplat-duration-width: 400px;
				}
			</style>
			<div class="layout vertical line">
			
			<div class="line">
				<span class="info"> Duration (default periods are year, month, week, day, hour, minute and second): </span>
				<triplat-duration
						label="Duration"
						value="0">
				</triplat-duration>
			</div>
			<div class="line">
				<span class="info"> Duration (year, month, day): </span>
				<triplat-duration
						class="duration400"
						label="Duration"
						display-tokens="y:M:d"
						value="0">
				</triplat-duration>
			</div>
			<div class="line">
				<span class="info"> Duration (hour, minute, second): </span>
				<triplat-duration
						class="duration400"
						label="Duration"
						display-tokens="h:m:s"
						value="0">
				</triplat-duration>
			</div>
			<div class="line">
				<span class="info"> Duration read-only (no picker button): </span>
				<triplat-duration
						class="duration400"
						label="Duration"
						value="259200000"
						readonly>
				</triplat-duration>
			</div>
			<div class="line">
				<span class="info"> Duration (overwrite default setting with year-max=5, year-loop=1, month-loop=0, and minute-step=15): </span>
				<triplat-duration
						class="duration400"
						label="Duration"
						year-max=5
						year-loop=1
						month-loop=0
						minute-step=15
						value="0">
				</triplat-duration>
			</div>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);