/*<!--
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
-->*/
import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

class XnewPerson extends PolymerElement {
	static get template() {
		return html `
		<h1>New Person Page</h1>
		`;
	}
}

window.customElements.define('x-new-person', XnewPerson);
