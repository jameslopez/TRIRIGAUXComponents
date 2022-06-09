/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../tricore-context-path/tricore-context-path.js';

class TriDemo extends PolymerElement {
	static get template() {
        return html `

            <!-- Initialize the context path. This only has to happen once on a page. -->
		    <tricore-context-path set-path="/dev"></tricore-context-path>

            <!-- This is how you retrieve the context path after it has been set. -->
            <tricore-context-path get-path="{{contextPath}}"></tricore-context-path>

            <!-- Ouput the value of contextPath. -->
            <span>The context path is <i>{{contextPath}}</i></span>
        `;
    }
}

window.customElements.define('tri-demo', TriDemo);