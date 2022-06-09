/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

/**
 * This mixin holds common properties and functions that are used by both code-scanner components: `triplat-barcode-scanner` and `triplat-qrcode-scanner`.
 * 
 * @polymer
 * @mixinFunction
 */
export const TriplatCodeScannerMixin = (superClass) => class extends superClass {
	static get properties() {
		return {
			/**
			 * The time in milliseconds when the camera should be active. 
			 * After the timeout, the related component will fire an event, so an action can be performed on the application side, 
			 * such as: stop the camera, display a message for the user, etc.
			 */
			timeout: {
				type: Number,
				value: 0
			},

			/**
			 * True if the video is active.
			 */
			_isVideoActive: {
				type: Boolean,
				value: false,
				readOnly: true,
				reflectToAttribute: true
			},

			_timeoutId: {
				type: Number,
				readOnly: true
			}
		};
	}

	/**
	 * Return `true` if the current device that is running a code-scanner component, has a camera.
	 * @return {Promise}
	 */
	hasCamera() {
		let mediaDevices = navigator.mediaDevices;
		if (!mediaDevices || !mediaDevices.enumerateDevices) return Promise.resolve(false);
		return mediaDevices.enumerateDevices().then(devices => {
			return devices.some(device => 'videoinput' === device.kind);
		});
	}

	_startTimer({ eventNameToDispatch }) {
		if (this._timeoutId) {
			clearTimeout(this._timeoutId);
		}

		// Set timeout to stop scan when timeout is greater than zero and video is active.
		if (this.timeout > 0 && this._isVideoActive) {
			let timeoutId = window.setTimeout(() => {
				this.dispatchEvent(new CustomEvent(eventNameToDispatch));
			}, this.timeout);
			this._set_timeoutId(timeoutId);
		}
	}
}