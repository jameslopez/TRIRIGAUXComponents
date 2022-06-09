/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { afterNextRender } from "../@polymer/polymer/lib/utils/render-status.js";

import { importJs } from "../tricore-util/tricore-util.js";

import { TriplatCodeScannerMixin } from "./triplat-code-scanner-mixin.js";

const importJsPromise = importJs(["../jsQR/jsQR.js"], "triplat-code-scanner/triplat-qrcode-scanner.js");

importJsPromise.then(() => {
/**
 * `triplat-qrcode-scanner` uses the camera on a device to scan a QR code.
 * 
 * Example:
 * 
 * ```html
 * <triplat-qrcode-scanner decoded-data="{{_decodedData}}"></triplat-qrcode-scanner>
 * ```
 * 
 * @customElement
 * @polymer
 * @appliesMixin TriplatCodeScannerMixin
 * @demo demo/qrcode-demo.html
 */
	class TriplatQrcodeScanner extends TriplatCodeScannerMixin(PolymerElement) {
		static get template() {
			return html `
				<style include="tristyles-theme">
					:host {
						@apply --layout-horizontal;
						@apply --layout-flex-auto;
					}

					.viewport {
						@apply --layout-horizontal;
						@apply --layout-flex-auto;
						min-width: 0;
						overflow: hidden;
						position: relative;
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
					:host(:not([_is-video-active])) .viewport canvas {
						display: none;
					}
				</style>

				<div class="viewport">
					<video id="video"></video>
					<canvas id="canvas"></canvas>
				</div>
			`
		}

		static get properties() {
			return {
				/**
				 * The decoded data from the QR code.
				 */
				decodedData: {
					type: String,
					value: "",
					notify: true
				},

				_video: {
					type: Object
				},

				_stream: {
					type: Object
				},

				_canvasElement: {
					type: Object
				},

				_canvas: {
					type: Object
				}
			}
		}

		/**
		 * Fired when the scanner detects a QR code and returns a result.
		 *
		 * @event qrcode-detected
		 */

		/**
		 * Fired when an error occurs in starting the camera.
		 *
		 * @event qrcode-error
		 */

		/**
		 * Fired when the timeout expires.
		 *
		 * @event qrcode-timeout
		 */

		connectedCallback() {
			super.connectedCallback();

			afterNextRender(this, () => {
				this._video = this.shadowRoot.querySelector("#video");
				this._canvasElement = this.shadowRoot.querySelector("#canvas");
				this._canvas = this._canvasElement.getContext("2d");
			});
		}

		/**
		 * Initialize the camera to scan the QR code.
		 */
		start() {
			navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
			.then(async (stream) => {
				this._stream = stream;
				this._video.srcObject = stream;
				this._video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
				await this._video.play();
				this._set_isVideoActive(true);
				requestAnimationFrame(this._scan.bind(this));

				this.startTimer();
			})
			.catch((error) => {
				this.dispatchEvent(new CustomEvent('qrcode-error', { error: error }));
			});
		}

		_scan() {
			let video = this._video;
			let canvasElement = this._canvasElement;
			let canvas = this._canvas;

			if (video.readyState === video.HAVE_ENOUGH_DATA && this._isVideoActive) {
				canvasElement.height = video.videoHeight;
				canvasElement.width = video.videoWidth;
				canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
				let imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
				let code = jsQR(imageData.data, imageData.width, imageData.height, {
					inversionAttempts: "dontInvert",
				});
				if (code && code.binaryData.length > 0) {
					this._qrcodeDetectionResponse(code.data);
				}
			}
			requestAnimationFrame(this._scan.bind(this));
		}

		_qrcodeDetectionResponse(code) {
			this.decodedData = code;
			this.dispatchEvent(new CustomEvent('qrcode-detected', { data: code }));
		}

		/**
		 * Stop the camera.
		 */
		stop() {
			this._canvas.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
			this._video.pause();
			this._stream.getVideoTracks()[0].stop();
			this._set_isVideoActive(false);
		}

		/**
		 * Start the timer for the timeout
		 */
		startTimer() {
			this._startTimer({eventNameToDispatch: 'qrcode-timeout'});
		}
	}

	customElements.define('triplat-qrcode-scanner', TriplatQrcodeScanner);
});