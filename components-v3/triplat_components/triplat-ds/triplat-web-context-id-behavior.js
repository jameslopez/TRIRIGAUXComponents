/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/iron-ajax/iron-ajax.js";

import "../tricore-url/tricore-url.js";

export const TriplatWebContextIdBehavior = {

	properties:  {

		_webContextIdPromise: {
			type: Object,
			notify: false,
			readOnly: true,
			value: new Promise(function(resolve) {
				var url = document.createElement("tricore-url");
				var ajax = document.createElement("iron-ajax");
				ajax.url = url.getUrl("/p/webapi/noop");
				ajax.addEventListener("response", function(e) {
					resolve(e.detail.xhr.getResponseHeader("triWebContextId"));
				});
				ajax.generateRequest();
			})
		}

	},

	listeners: {
		"triplat-ds-web-context-id-search": "_onSearch"
	},

	attached: function() {
		this._beforeunloadHandler = this._endContext.bind(this);
		window.addEventListener("beforeunload", this._beforeunloadHandler);
	},

	detached: function() {
		if (this._beforeunloadHandler) {
			window.removeEventListener("beforeunload", this._beforeunloadHandler);
		}
		this._endContext();
	},

	getWebContextId: function() {
		return this._webContextIdPromise;	
	},

	_endContext: function(e) {
		if (this.unsaveCheckBeforeUnload) {
			var confirmationMessage = this.unsaveCheckBeforeUnload();
			if (confirmationMessage !== "") {
				e.returnValue = confirmationMessage;
				return confirmationMessage;
			}
		}
		this.getWebContextId().then(function(webContextId) {
			var url = document.createElement("tricore-url");
			var ajax = document.createElement("iron-ajax");
			ajax.url = url.getUrl("/p/webapi/end");
			ajax.headers = {"triWebContextId": webContextId};
			ajax.generateRequest();
		});
	},

	_onSearch: function(e) {
		e.stopPropagation();
		var childEl = e.detail.sourceElement;
		this.fire("triplat-ds-web-context-id-parent-found", this, {
			bubbles: false,
			node: childEl
		});
	}

};