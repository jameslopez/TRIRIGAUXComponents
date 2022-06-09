/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import "../../@polymer/paper-button/paper-button.js";
import "../../@polymer/paper-input/paper-input.js";
import "../../@polymer/paper-checkbox/paper-checkbox.js";

import "../../@polymer/iron-list/iron-list.js";

import '../../triplat-code-scanner/triplat-barcode-scanner.js';
import "../../triplat-theme/triplat-theme.js";

import "../../triblock-popup/triblock-popup.js";
import "../../triblock-toast/triblock-toast.js";

class TriplatBarcodeScannerDemo extends PolymerElement {
	static get template() {
		return html `
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

				triplat-barcode-scanner {
					@apply --layout-flex-auto;
				}

				.popup-footer {
					margin-top: 20px;
				}
			</style>
			
			<h3>Scanning a Bar Code</h3>

			<div class="settings">
				<h4>Settings</h4>

				<div class="settings-section">
					<paper-input label="Timeout (miliseconds)" value="{{_timeout}}" type="number" always-float-label></paper-input>
				</div>

				<div class="settings-section">
					<label>Set validator callback - It will validate if the decoded data has only numbers:</label>
					<paper-checkbox checked="{{_setValidator}}">Set validator</paper-checkbox>
				</div>

				<div class="settings-section">
					<paper-button on-tap="_scanBarcode">Start Scan</paper-button>
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

			<triblock-popup id="barcodePopup" on-iron-overlay-closed="_onPopupClosed">
				<triplat-barcode-scanner id="barcodeScanner"
					decoded-data="{{_decodedValue}}"
					timeout="[[_timeout]]"
					on-barcode-detected="_closeBarcodePopup"
					on-barcode-timeout="_onBarcodeTimeout"></triplat-barcode-scanner>

				<div class="popup-footer" hidden\$="[[!smallScreenWidth]]">
					<paper-button on-tap="_closeBarcodePopup">Cancel</paper-button>
				</div>
			</triblock-popup>

			<triblock-toast id="toastAlert" type="warning" title="Warning" text="Barcode timeout expired."></triblock-toast>
		`;
	}

	static get properties() {
		return {
			_barcodeValidatorCallback: {
				type: Function,
				value: function() {
					return this._barcodeValidator.bind(this);
				}
			},

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

			_setValidator: {
				type: Boolean,
				value: false,
			},

			_timeout: {
				type: Number,
				value: 0
			}
		}
	}

	static get observers() {
		return [
			"_observeDecodeValue(_decodedValue)",
			"_observeSetValidator(_setValidator)"
		]
	}

	_barcodeValidator(code) {
		var isValid = /^\d+$/.test(code);
		return isValid;

	}

	_closeBarcodePopup() {
		if (this.$.barcodePopup.opened) {
			this.$.barcodePopup.closePopup();
		}
	}

	_observeDecodeValue(value) {
		if (value && value != "") {
			this.push('_decodedValues', value);
		}
	}

	_observeSetValidator(setValidator) {
		if (setValidator) {
			this.$.barcodeScanner.validatorCallback = this._barcodeValidatorCallback;
		} else {
			this.$.barcodeScanner.validatorCallback = null;
		}
	}

	_onBarcodeTimeout() {
		this.$.toastAlert.open();
		this._closeBarcodePopup();
	}

	_onPopupClosed() {
		this.$.barcodeScanner.stop();
	}

	_scanBarcode() {
		this.$.barcodePopup.openPopup();
		this.$.barcodeScanner.start();
	}
}

window.customElements.define('triplat-barcode-scanner-demo', TriplatBarcodeScannerDemo);