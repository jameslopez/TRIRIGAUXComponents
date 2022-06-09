/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../tricore-relative-url/tricore-relative-url.js';
import "../../triplat-theme/triplat-theme.js";

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<tricore-relative-url relative-url="demo.json" bind-url="{{url}}"></tricore-relative-url>
			<div>The relative url <b><i>demo.json</i></b> turns into <b><i>{{url}}</i></b></div>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);