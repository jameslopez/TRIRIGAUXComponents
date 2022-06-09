/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import "../../@polymer/paper-button/paper-button.js";
import "../../@polymer/paper-input/paper-input.js";

import "../../@polymer/iron-list/iron-list.js";

import '../../triplat-code-scanner/triplat-qrcode-scanner.js';
import "../../triplat-theme/triplat-theme.js";

import "../../triblock-popup/triblock-popup.js";
import "../../triblock-toast/triblock-toast.js";

class TriplatQrcodeScannerDemo extends PolymerElement {
	static get template() {
		return html`
			<style include="tristyles-theme">
				.settings,
				.result {
					border: 1px solid var(--tri-secondary-color);
					border-radius: 10px;
					margin: 15px 0;
					padding: 15px;
				}

				.settings > *,
				.result > * {
					margin: 10px 0;
				}

				.settings-section {
					@apply --layout-vertical;
				}

				.settings-section label {
					font-size: 13px;
					margin-bottom: 6px;
				}

				.settings-section paper-button {
					margin: 15px 0 0 !important;
				}

				.list-item {
					padding: 5px 0;
				}

				triblock-popup {
					@apply --layout-vertical;
					height: 90%;
					width: 90%;
				}

				triplat-qrcode-scanner {
					@apply --layout-flex-auto;
					height: 100%;
				}

				.popup-footer {
					margin-top: 20px;
				}
			</style>

			<h3>Scanning a QR Code</h3>

			<div class="settings">
				<h4>Settings</h4>

				<div class="settings-section">
					<paper-input label="Timeout (miliseconds)" value="{{_timeout}}" type="number" always-float-label></paper-input>
				</div>

				<div class="settings-section">
					<paper-button on-tap="_scanQrcode">Start Scan</paper-button>
				</div>
			</div>

			<div class="result">
				<h4>Results</h4>

				<iron-list items="[[_decodedValues]]">
					<template>
						<div class="list-item">
							[[item]]
						</div>
					</template>
				</iron-list>
			</div>

			<triblock-popup id="qrcodePopup" on-iron-overlay-closed="_onPopupClosed">
				<triplat-qrcode-scanner id="qrcodeScanner"
					decoded-data="{{_decodedValue}}"
					timeout="[[_timeout]]"
					on-qrcode-detected="_closeQrcodePopup"
					on-qrcode-timeout="_onQrcodeTimeout"></triplat-qrcode-scanner>

				<div class="popup-footer" hidden\$="[[!smallScreenWidth]]">
					<paper-button on-tap="_closeQrcodePopup">Cancel</paper-button>
				</div>
			</triblock-popup>

			<triblock-toast id="toastAlert" type="warning" title="Warning" text="Qrcode timeout expired."></triblock-toast>
		`
	}

	static get properties() {
		return {
			_decodedValue: {
				type: String,
				value: ""
			},

			_decodedValues: {
				type: Array,
				value: function() {
					return [];
				}
			},

			_timeout: {
				type: Number,
				value: 0
			}
		}
	}

	static get observers() {
		return [
			"_observeDecodeValue(_decodedValue)"
		]
	}

	_closeQrcodePopup() {
		if (this.$.qrcodePopup.opened) {
			this.$.qrcodePopup.closePopup();
		}
	}

	_observeDecodeValue(value) {
		if (value && value != "") {
			this.push('_decodedValues', value);
		}
	}

	_onQrcodeTimeout() {
		this.$.toastAlert.open();
		this._closeQrcodePopup();
	}

	_onPopupClosed() {
		this.$.qrcodeScanner.stop();
	}

	_scanQrcode() {
		this.$.qrcodePopup.openPopup();
		this.$.qrcodeScanner.start();
	}

}

window.customElements.define('triplat-qrcode-scanner-demo', TriplatQrcodeScannerDemo);