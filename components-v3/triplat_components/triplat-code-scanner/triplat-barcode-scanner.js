/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { afterNextRender } from "../@polymer/polymer/lib/utils/render-status.js";

import { importJs } from "../tricore-util/tricore-util.js";

import { TriplatCodeScannerMixin } from "./triplat-code-scanner-mixin.js";

const importJsPromise = importJs(["../quagga/quagga.min.js"], "triplat-code-scanner/triplat-barcode-scanner.js");

importJsPromise.then(() => {
/**
 * `triplat-barcode-scanner` uses the device camera to scan a barcode.
 * 
 * Example:
 * 
 * ```html
 * <triplat-barcode-scanner decoded-data="{{_decodedData}}"></triplat-barcode-scanner>
 * ```
 * 
 * @customElement
 * @polymer
 * @appliesMixin TriplatCodeScannerMixin
 * @demo demo/barcode-demo.html
 */
	class TriplatBarcodeScanner extends TriplatCodeScannerMixin(PolymerElement) {
		static get template() {
			return html `
				<style include="tristyles-theme">
					:host {
						@apply --layout-horizontal;
						@apply --layout-flex-auto;
						position: relative;
					}

					.viewport {
						@apply --layout-horizontal;
						@apply --layout-flex-auto;
						min-width: 0;
						overflow: hidden;
					}

					.viewport video {
						@apply --layout-flex-auto;
						min-width: 0;
						object-fit: cover;
					}

					.viewport canvas {
						@apply --layout-fit;
						height: 100%;
						width: 100%;
						object-fit: cover;
					}

					:host(:not([_is-video-active])) .viewport video,
					:host(:not([_is-video-active])) .viewport canvas,
					.viewport br {
						display: none;
					}
				</style>

				<div id="interactive" class="viewport"></div>
			`
		}

		static get properties() {
			return {
				/**
				 * The decoded data from the barcode.
				 */
				decodedData: {
					type: String,
					value: "",
					notify: true
				},

				/**
				 * An array with the types of barcodes which can be decoded during the session.
				 * The default value is "code_128_reader".
				 * The possible values are: "code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", 
				 * "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader", "2of5_reader", and "code_93_reader".
				 */
				types: {
					type: Array,
					value: function() {
						return [ "code_128_reader" ]
					}
				},

				/**
				 * Callback function used to determine if the decoded data is valid.
				 * When a validator callback is set, the component will only provide the `decodedData`,
				 * and fire the `barcode-detected` event when the data is valid.
				 */
				validatorCallback: {
					type: Object
				}
			}
		}

		/**
		 * Fired when the scanner detects a barcode and returns a result.
		 *
		 * @event barcode-detected
		 */

		/**
		 * Fired when an error occurs in starting the camera.
		 *
		 * @event barcode-error
		 */

		/**
		 * Fired when the timeout expires.
		 *
		 * @event barcode-timeout
		 */

		connectedCallback() {
			super.connectedCallback();

			afterNextRender(this, () => {
				// Callback when a code is detected.
				Quagga.onDetected((result) => {
					var code = result.codeResult.code;

					if (this.validatorCallback) {
						if (this.validatorCallback(code)) {
							this._barcodeDetectionResponse(code);
						}
					} else {
						this._barcodeDetectionResponse(code);
					}
				});
			});
		}

		_barcodeDetectionResponse(code) {
			this.decodedData = code;
			this.dispatchEvent(new CustomEvent('barcode-detected', { data: code }));
		}

		/**
		 * Initialize the device camera to scan the barcode.
		 */
		start() {
			Quagga.init({
				inputStream : {
					name : "Live",
					type : "LiveStream",
					constraints: {
						width: { min: 640 },
						height: { min: 480 },
						facingMode: "environment",
						aspectRatio: { min: 1, max: 2 }
					},
					target: this.$.interactive
				},
				decoder : {
					readers : this.types
				}
			}, (error) => {
				if (error) {
					this.dispatchEvent(new CustomEvent('barcode-error', { error: error }));
					return
				}
				
				// Start Quagga.
				Quagga.start();
				this._set_isVideoActive(true);
				this.decodedData = "";

				this.startTimer();
			});
		}

		/**
		 * Stop the device camera.
		 */
		stop() {
			// Stop Quagga.
			Quagga.stop();
			this._set_isVideoActive(false);
		}

		/**
		 * Start the timer for the timeout
		 */
		startTimer() {
			this._startTimer({eventNameToDispatch: 'barcode-timeout'});
		}
	}

	customElements.define('triplat-barcode-scanner', TriplatBarcodeScanner);
});