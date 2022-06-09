/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../tricore-demo-url/tricore-demo-url.js';
import '../../tricore-url/tricore-url.js';
import '../../@polymer/iron-ajax/iron-ajax.js';
import "../../triplat-theme/triplat-theme.js";

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<tricore-demo-url></tricore-demo-url>
			<tricore-url raw-url="/p/webapi/someModelAndViewName/startSession?query" bind-url="{{url}}"></tricore-url>
			<iron-ajax auto url="{{url}}" last-response="{{data}}"></iron-ajax>
	
			<div>The original URL is:</div>
			<div>/p/webapi/someModelAndViewName/startSession?query</div>
			<div>The demo url will become:</div>
			<div>{{url}}</div>
			<div>The contextId from the response (from the demo json file) <i><b>{{data.contextId}}</b></i></div>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);