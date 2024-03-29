/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../tricore-url/tricore-url.js";

import "../@polymer/iron-ajax/iron-ajax.js";

/**
 * `TriPlatGraphicUtilitiesBehavior` is a behavior to support the use of the `triplat-graphic` component.
 * @polymerBehavior
 */

export const TriPlatGraphicUtilitiesBehavior = {
	properties: {
		_drawingIdAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_tricoreEl: {
			type: Object,
			notify: false,
			readOnly: true
		}
	},

	/**
	 * Returns a promise that resolves to the drawing ID associated to a floor record.
	 * @param {string} recordId The `ID` of the floor.
	 * @return {Promise}
	 */
	getDrawingId: function(recordId) {
		var url = this._getDrawingUrl(recordId);
		var drawingIdAjax = this._drawingIdAjax;

		if (!drawingIdAjax) {
			drawingIdAjax = document.createElement("iron-ajax");
			this._set_drawingIdAjax(drawingIdAjax);
		}
		drawingIdAjax.url = url;

		var request = drawingIdAjax.generateRequest();
		return request.completes
			.then(function() {
				if (request.response) {
					return request.response.drawingId;
				}
				return null;
			}.bind(this))
			.catch(function() {
				return null;
			}.bind(this));
	},

	/**
	 * Checks if the current floor has a graphic svg.
	 * It returns a promise that resolves to a boolean value.
	 * @param {string} recordId The `ID` of the floor.
	 * @return {Promise}
	 */
	hasGraphic: function(recordId) {
		return this.getDrawingId(recordId)
			.then(function(drawingId) {
				return drawingId != null;
			})
			.catch(function() {
				return false;
			});
	},

	_getDrawingUrl: function(recordId) {
		var tricoreEl = this._tricoreEl;
		if (!tricoreEl) {
			tricoreEl = document.createElement("tricore-url");
			this._set_tricoreEl(tricoreEl);
		}
		var floorUrl = "/p/floorplans?recordId=" + recordId;
		return tricoreEl.getUrl(floorUrl);
	},
};