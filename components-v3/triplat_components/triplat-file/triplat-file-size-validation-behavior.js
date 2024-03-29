/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import "../@polymer/iron-ajax/iron-request.js";
import "../tricore-url/tricore-url.js";

/**
 * A behavior to validate if the size of a file exceeds the maximum allowed by the 
 * MAXIMUM_UPLOAD_FILE_SIZE_MEGABYTES parameter in the TRIRIGAWEB.properties.
 * 
 * @polymerBehavior TriplatFileSizeValidationBehavior
 *
 */
export const TriplatFileSizeValidationBehavior = {
		
	properties: {
		_maximumFileSizeForUpload: {
			type: Number,
			value: 0
		}
	},
		
	/**
	 * Check if the size of the file exceeds the maximum allowed by the MAXIMUM_UPLOAD_FILE_SIZE_MEGABYTES
	 * parameter.
	 * Returns resolved promise if the file size is less than or equals the maximum allowed by the 
	 * MAXIMUM_UPLOAD_FILE_SIZE_MEGABYTES
	 * Otherwise returns a rejected promise.
	 */
	 checkFileSize: function(file) {
		var promiseResolve, promiseReject;
		var promise = new Promise(
			function(resolve, reject) {
				promiseResolve = resolve;
				promiseReject = reject;
			}
		);

		this.getMaximumFileSizeForUpload()
			.then(this._doCheckFileSize.bind(this, file, promiseResolve, promiseReject));

		return promise;
	},

	_doCheckFileSize: function(file, resolve, reject, maximumFileSize) {
		if (file.size > maximumFileSize) {
			reject(maximumFileSize);
		} else {
			resolve(maximumFileSize);
		}
	},

	/**
	 * Returns a promise resolved to the number specified by the MAXIMUM_UPLOAD_FILE_SIZE_MEGABYTES
	 * parameter in the TRIRIGAWEB.properties.
	 */
	getMaximumFileSizeForUpload: function() {
		if (this._maximumFileSizeForUpload > 0) {
			return Promise.resolve(this._maximumFileSizeForUpload);
		} else {
			var tricoreUrl = document.createElement('tricore-url');
			var getMaxFileSizeUrl = tricoreUrl.getUrl("/p/fileupload/maximumFileSizeForUpload");
			var request = document.createElement('iron-request');
			var requestOptions = {
				url: getMaxFileSizeUrl,
				method: "GET",
				handleAs: "json"
			};		       
				request.send(requestOptions);
				return request.completes
						.then(this._getMaximumFileSizeForUploadResponse.bind(this))
						.catch(Promise.resolve.bind(Promise, 0));
			}
	},
	
	_getMaximumFileSizeForUploadResponse: function(request) {
		return this._maximumFileSizeForUpload = request.response.maximumFileSizeForUpload;
	}
};