/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../tricore-url/tricore-url.js';
import '../../tricore-context-path/tricore-context-path.js';
import "../../triplat-theme/triplat-theme.js";

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<!-- Initialize the context path. This only has to happen once on a page -->
			<tricore-context-path set-path="/dev"></tricore-context-path>
	
			<!-- Compute the doc URL with the context path and store it in a variable called docUrl -->
			<tricore-url raw-url="/p/web/doc" bind-url="{{docUrl}}"></tricore-url>
	
			<!-- Ouput the value of docUrl -->
			<span>This output of the tricore-url component is <i>{{docUrl}}</i></span>
	
			<br/>
	
			<!-- Example in a link. -->
			<a href="{{docUrl}}" target="_blank">A Doc Link</a>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);