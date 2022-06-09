/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-search-input/triplat-search-input.js';
import "../../triplat-theme/triplat-theme.js";

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<triplat-search-input value="{{searchValue}}" placeholder="Search people"></triplat-search-input>
			<div>{{searchValue}}</div>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);