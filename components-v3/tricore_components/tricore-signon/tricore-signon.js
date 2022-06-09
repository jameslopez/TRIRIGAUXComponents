/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from "../@polymer/polymer/polymer-element.js";
import "../triplat-login/triplat-login.js";
import "./tricore-signon-ui.js";

class TricoreSignon extends PolymerElement {
	static get is() { return "tricore-signon"; }

	static get template() {
		return html `
			<tricore-signon-ui 
				id="loginUI" 
				username="{{username}}"
				password="{{password}}"
				login-title="IBM TRIRIGA"
				on-login="_handleLogin" 
				on-force-login="_handleForceLogin">
			</tricore-signon-ui>

			<triplat-login 
				id="loginControl" 
				username="[[username]]"
				password="[[password]]"
				on-unauthorized="_handleUnauthorized"
				on-already-logged="_handleAlreadyLogged"
				on-error="_handleError">
			</triplat-login>
		`;
	}

	connectedCallback() {
		super.connectedCallback();
		document.querySelector('body').style.backgroundColor = "#373b50";
	}

	get loginControl() {
		return this.shadowRoot.querySelector("#loginControl");
	}

	get loginUI() {
		return this.shadowRoot.querySelector("#loginUI");
	}
	
	_handleLogin() {
		this.loginControl.login();
	}

	_handleForceLogin() {
		this.loginControl.forceLogin();
	}

	_handleUnauthorized() {
		this.loginUI.showUnauthorizedMessage();
	}

	_handleAlreadyLogged() {
		this.loginUI.showAlreadyLoggedMessage();
	}

	_handleError(e) {
		this.$.loginUI.showErrorMessage();
	}
}

window.customElements.define(TricoreSignon.is, TricoreSignon);