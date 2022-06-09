/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from "../@polymer/polymer/polymer-element.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../@polymer/paper-input/paper-input.js";
import "../@polymer/paper-button/paper-button.js";

import { getModuleUrl } from "../tricore-util/tricore-util.js";
import "../triplat-theme/triplat-theme.js";
import "./tricore-signon-message-dialog.js";

class TricoreSignonUI extends PolymerElement {
	
	constructor() {
		super();
		this._loadedLowRes = false;
		this._loadedHighRes = false;
	}

	static get is() { return "tricore-signon-ui"; }

	static get template() {
		return html `
			<style include="iron-flex iron-flex-alignment tristyles-theme">
				:host {
					--login-font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
					font-family: var(--login-font-family);
				}

				.bg-picture {
					position: fixed;
					top: 42px;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: -1;
					background-image: url('images/BuildingsLowResBlur.svg');
					background-size: cover;
				}

				.bg-picture:after {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					content: "";
					display: block;
					background-size: cover;
					background-image: url('images/Buildings.jpg');
					transition-property: opacity;
					transition-duration: 2s;
					transition-timing-function: ease;
					opacity: 0;
				}

				.bg-picture[enhanced]:after {
					opacity: 1;
				}

				.page-title{
					width: 100%;
					height: 42px;
					line-height: 42px;
					background-color: #171717;
					position: absolute;
					left: 0;
					top: 0;
					color: whitesmoke;
					font-family: var(--login-font-family);
					font-weight: bold;
					font-size: 16px;
					padding: 0px 0px 0px 8px;
				}

				.login-box {
					height: 228px;
					width: 350px;
					padding: 48px;
					margin-top: 120px;
					margin-left: auto;
					margin-right: auto;
					background-color: white;
				}

				.login-title {
					font-weight: normal;
					font-size:20px;
					color: #171717;
					margin-bottom: 0px;
					margin-top: 0px;
					clear: left;
				}

				.login-input {
					margin-top: 19px;
				}

				paper-input {
					width: 90%;
					--paper-input-container-input: {
						font-family: var(--login-font-family);
						font-size:12px;
						background-color: #f3f3f3;
					};
					--paper-input-container-label: {
						font-family: var(--login-font-family);
					};
				}

				.button-container {
					margin-top: 30px;
				}

				.error, .processing {
					font-size: 13px;
					text-align: center;
					padding-top: 16px;
					padding-bottom: 16px;
				}

				.processing {
					color: grey;
				}

				.error {
					color: #da1e28;
				}

				.footer {
					position: fixed;
					left: 0;
					bottom: 0;
					margin-top: 3em;
					min-height:120px;
					padding: 16px 0;
					width:100%;
					background-color:#171717;
					opacity: .9;
					font-weight: normal;
					font-size: 10px;
					color: #999999;
					@apply(--layout-vertical);
				}

				.footer > div {
					margin: 0 15%;
				}

				.footer p {
					margin-top:5px;
				}

				.footer a:link{
					color: #999999;
				}

				.csi-container {
					padding-top: 1em;
					padding-right: 2em;
				}

				.message-container {
					width: 100%;
					@apply(--layout-vertical);
				}

				#dialogHeader {
					background-color: var(--tri-header-background-color);
					color: var(--tri-header-color);
				}

				.active-user {
					color: #FFFFC2;
				}

				paper-button.login-btn {
					padding: 6px 32px 6px 8px !important;
					min-width: 0px !important;
					align-items: start !important;
				}

				@media (max-height: 750px) {
					.login-box {
						margin-top: 58px !important;
					}
				}

				@media (max-height: 550px) {
					.footer {
						display: none;
					}
				}

				@media (max-height: 400px) {
					.footer {
						display: none;
					}

					.login-box {
						margin-top: 42px !important;
						padding: 16px 16px 48px 16px;
					}
				}

				@media (max-width: 499px) {
					.login-box {
						margin-top: 58px !important;
						width: 80%;
						padding: 16px 16px 48px 16px;
					}
		
					.footer > div {
						margin-left: 5%;
						margin-right: 5%;
					}
				}

				@media (max-width: 325px) {
					.login-box {
						margin-top: 42px !important;
						width: 90%;
					}

					.footer {
						display: none;
					}
				}
			</style>

			<div class="bg-picture" enhanced\$="[[_imagesLoaded]]"></div>
			<div class="page-title">[[loginTitle]]</div>

			<dom-if if="[[!_imagesLoaded]]" restamp>
				<template>
					<img hidden src="[[importPath]]images/BuildingsLowResBlur.svg" on-load="_handleLoadLowRes">
					<img hidden src="[[importPath]]images/Buildings.jpg" on-load="_handleLoadHighRes">
				</template>
			</dom-if>

			<div class="login-box">
				<div class="login-title">IBM TRIRIGA</div>
				<div class="login-input">
					<paper-input label="User ID" value="{{username}}" auto-validate on-keypress="_keyPressHandler"
									tabIndex="1" autofocus required always-float-label>
					</paper-input>
					<paper-input label="Password" value="{{password}}" auto-validate type="password" on-keypress="_keyPressHandler"
									tabIndex="2" required always-float-label>
					</paper-input>
				</div>
				<div class="layout horizontal button-container">
					<paper-button class="login-btn" tabIndex="3" on-tap="_handleLoginTap">Continue</paper-button>
				</div>
				<div class="message-container">
					<dom-if if="[[_logging]]">
						<template>
							<div class="processing">Logging in...</div>
						</template>
					</dom-if>
					<dom-if if="[[_unauthorized]]">
						<template>
							<div class="error">Invalid User ID or Password.</div>
						</template>
					</dom-if>
					<dom-if if="[[_error]]">
						<template>
							<div class="error">Login failed</div>
						</template>
					</dom-if>
				</div>
			</div>

			<tricore-signon-message-dialog id="message" modal>
				<div id="dialogHeader">The user <span class="active-user">[[username]]</span> is already active.</div>
				<div id="dialogBody">
					<div class="flex layout vertical">
						<div class="">You may end the active session or click cancel to log in as another user.</div>
					</div>
				</div>
				
				<div class="buttons">
					<paper-button class="login-btn"
						id="forceSignOn" primary-outline tabIndex="0" 
						class="msgButtonAffirm" on-tap="_handleForceLogin">End Active Session</paper-button>
					<paper-button class="login-btn"
						id="closeDialog" primary-outline tabIndex="1" 
						class="msgButtonAffirm" on-tap="_closeDialog">Cancel</paper-button>
				</div>
			</tricore-signon-message-dialog>

			<div class="footer">
				<div>
					<p translate="no">
						Licensed Materials - Property of IBM (c) Copyright IBM Corp. 1997, 2020  All Rights Reserved. IBM, the IBM logo, ibm.com and TRIRIGA are trademarks or registered trademarks of International Business Machines Corp., registered in many jurisdictions worldwide. Other product and service names might be trademarks of IBM or other companies. A current list of IBM trademarks is available on the Web at <a href="http://www.ibm.com/legal/copytrade.shtml">Copyright and trademark information</a>.
					</p>
				</div>
				<div class="layout horizontal">
					<div class="csi-container">
						<img src="[[importPath]]images/csi_logo.png"/>
					</div>
					<div class="flex">
						<p translate="no">
							<i>MasterFormat</i><sup>&reg;</sup> is produced jointly by CSI and Construction Specifications Canada (CSC). U.S. copyright is held by CSI and Canadian copyright by CSC. All Rights Reserved. For license information, contact CSI at csi@csinet.org. For more information on MasterFormat visit <a href="http://www.MasterFormat.com">www.MasterFormat.com</a>.
						</p>
					</div>
				</div>
				<div>
					<p translate="no">Portions copyright (C) Free Software Foundation, Inc 1991, 1999.</p>
				</div>
			</div>
		`;
	}

	static get properties() {
		return {
			username: {
				type: String,
				notify: true,
				value:""
			},

			password: {
				type: String,
				notify: true,
				value: ""
			},

			loginTitle: {
				type: String,
				value: "IBM TRIRIGA"
			},

			_imagesLoaded: {
				type: Boolean,
				value: false
			},

			_unauthorized: {
				type: Boolean,
				value: false
			},

			_logging: {
				type: Boolean,
				value: false
			},

			_error: {
				type: Boolean,
				value: false
			}
		};
	}

	showAlreadyLoggedMessage() {
		this.shadowRoot.querySelector("#message").open();
		this._logging = false;
		setTimeout(
			() => {
				this.shadowRoot.querySelector("#forceSignOn").focus();
			},
			100
		);
	}

	showUnauthorizedMessage() {
		this._unauthorized = true;
		this._logging = false;
	}

	showErrorMessage() {
		this._error = true;
		this._logging = false;
	}

	_handleLoginTap() {
		this._logging = true;
		this._unauthorized = false;
		this._error = false;
		this.dispatchEvent(new CustomEvent("login", { bubbles: false, composed: false }));
	}

	_handleForceLogin() {
		this.dispatchEvent(new CustomEvent("force-login", { bubbles: false, composed: false }));
	}

	_keyPressHandler(event) {
		var code = event.keyCode;
		if (code == 13) {
			this._handleLoginTap();
		}
	}

	_closeDialog(){
		this.shadowRoot.querySelector("#message").close();
	}

	_handleLoadLowRes() {
		this._loadedLowRes = true;
		this._computeImagesLoaded();
	}

	_computeImagesLoaded() {
		if (this._loadedLowRes && this._loadedHighRes) setTimeout(() => this._imagesLoaded = true, 1000);
	}

	_handleLoadHighRes() {
		this._loadedHighRes = true;
		this._computeImagesLoaded();
	}

	static get importMeta() {
		return getModuleUrl("tricore-signon/tricore-signon-ui.js");
	}
}

window.customElements.define(TricoreSignonUI.is, TricoreSignonUI);