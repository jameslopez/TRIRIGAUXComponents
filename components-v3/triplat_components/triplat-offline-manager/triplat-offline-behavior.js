/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

export const TriplatOfflineBehavior = {
	_sendCommand: function (command, params) {
		return new Promise(
			function (resolve, reject) {
				this._getActiveServiceWorker().then(this._doSendCommand.bind(this, resolve, reject, command, params));
			}.bind(this)
		);
	},

	_doSendCommand: function(resolve, reject, command, params, swReg) {
		var messageChannel = new MessageChannel();
		messageChannel.port1.onmessage = this._handleCommandResponse.bind(this, resolve, reject);
		swReg.active.postMessage({ command: command, params: params }, [messageChannel.port2]);
	},

	_handleCommandResponse: function(resolve, reject, event) {
		if (event.data != null && event.data.error) {
			reject(event.data.errorDetail);
		} else {
			resolve(event.data);
		}
	},

	_getActiveServiceWorker: function () {
		return navigator.serviceWorker.ready;
	},
};