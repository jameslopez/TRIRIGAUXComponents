/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-date-picker/triplat-date-picker.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
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
					margin: 0px 30px;
					margin-bottom: 5px;
					font-weight: bold;
				}
		
				.line {
					padding: 0px;
					margin: 0px;
				}
			</style>
			<div class="layout vertical line">
			<div class="layout horizontal">
				<span class="info"> Simple date picker: </span>
				<triplat-date-picker></triplat-date-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date Picker with a label: </span>
				<triplat-date-picker label="Start Date"></triplat-date-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date Picker with label and header: </span>
				<triplat-date-picker label="Start Date" header="true"></triplat-date-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date Picker with label, header and initial value: </span>
				<triplat-date-picker label="Back to the Future" header="true" value="2019-10-21T21:36:59.000-04:00"></triplat-date-picker>
			</div>
			<div class="layout horizontal line">&nbsp;</div>
			<div class="layout horizontal line">
				<span class="info"> Date Picker with no label, readonly, and initial value (good for tables): </span>
				<triplat-date-picker readonly value="2015-10-21T21:36:59.000-04:00"></triplat-date-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date Picker with label, readonly and initial value: </span>
				<triplat-date-picker label="Can only read this date" readonly value="2015-10-21T21:36:59.000-04:00"></triplat-date-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date Picker with label, disabled and initial value: </span>
				<triplat-date-picker label="Cannot write this date" disabled value="2015-10-21T21:36:59.000-04:00"></triplat-date-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date Picker with label, readonly, disabled, and initial value (disabled overrides readonly): </span>
				<triplat-date-picker label="readonly and disabled" readonly disabled value="2015-10-21T21:36:59.000-04:00"></triplat-date-picker>
			</div>
			<div class="layout horizontal line">
				<span class="info"> Date picker with confirm buttons: </span>
				<triplat-date-picker confirm-buttons></triplat-date-picker>
			</div>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);