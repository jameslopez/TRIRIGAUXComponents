/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../tricore-url/tricore-url.js";
import { TriplatRequiresWebContextIdBehavior } from "../triplat-ds/triplat-requires-web-context-id-behavior.js";
import "../@polymer/iron-ajax/iron-ajax.js";

/*
An advanced component for interacting with data sources at a deeper level than triplat-ds.
It does not support the use of the triplat-ds-offline element.
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<tricore-url id="url"></tricore-url>
		<iron-ajax id="ajax" on-response="_onResponse" on-error="_onError"></iron-ajax>
	`,

    is: "triplat-ds-core",

    behaviors: [
		TriplatRequiresWebContextIdBehavior
	],

    properties: {

		/**
		 * The context of the data source request.  The format should be:
		 * 
		 *      /{modelAndViewName}/{instanceId}/{dataSourceName}
		 *      or
		 *      /{modelAndViewName}/{instanceId}/{dataSourceName}
		 *                                      /{recordId}
		 * 
		 * The {dataSourceName}/{recordId} can repeat for nested data sources. This value 
		 * must be set before making a request.
		 */
		context: {
			type: String
		},

		/**
		 * The type of request being made. Possible values are:
		 * 
		 *      GET | CREATE | DELETE | SAVE | ADD | REMOVE
		 * 
		 * This value must be set before making a request.
		 */
		type: {
			type: String
		},

		/**
		 * Whether to retrieve the values of the data source on the response of the request.
		 */
		refresh: {
			type: Boolean
		},

		/**
		 * The action name if an action should be performed with the request.
		 */
		action: {
			type: String
		},

		/**
		 * The action group name if an action should be performed with the request.
		 */
		actionGroup: {
			type: String
		},

		/**
		 * If the request needs to have a query (filters, pagination, sorting), set this 
		 * object with the query details. The triplat-query component can be used to build up 
		 * this object. Example of the query object:
		 *
		 *      {
		 *         page: {
		 *            from: 0,
		 *            size: 100
		 *         },
		 *         filters: [
		 *            {
		 *               name: "firstName",
		 *               operator: "contains",
		 *               value: "foo"
		 *            },
		 *            {operator: "and"},
		 *            {operator: "open parenthesis"},
		 *            {
		 *               name: "lastName",
		 *               operator: "contains",
		 *               value: "foo"
		 *            },
		 *            {operator: "or"},
		 *            {
		 *               name: "lastName",
		 *               operator: "contains",
		 *               value: "bar"
		 *            },
		 *            {operator: "close parenthesis"}
		 *         ],
		 *         sorts: [
		 *            {name: "lastName", desc: false},
		 *            {name: "firstName", desc: false}
		 *         ]
		 *      }
		 */
		query: {
			type: Object
		},

		/**
		 * The data that will be sent to the server as part of the request. This will be 
		 * different for each request type. For GET requests, this property is ignored.
		 * 
		 * For CREATE, DELETE, SAVE and ADD requests, this property can be either an array of record 
		 * objects or just a single data object. It is important that the record ID is set as 
		 * "_id" in each record object.
		 */
		dataOut: {
			type: Object
		},

		/**
		 * An object that will be put on each request made. This allows the application to 
		 * put a context on the request. In some cases when the request is sent in a small window of 
		 * time, the response order may not be the same as the request order. This property 
		 * comes in handy so you can put an ID on the request that will show up in the response.
		 */
		appContext: {
			type: Object
		},
		
		/**
		 * Whether to save the response records to the offline cache. This property is only effective
		 * when the current application is registered for offline support using the <b>triplat-offline-manager</b> component.
		 *
		 * <b style="color:red;">Experimental:</b> This is an experimental property and is not yet supported. The API may change.
		 */
		cacheResponse: {
			type: Boolean,
			value: false
		}

	},

    /**
	 * Fired when a successful response is received. The detail of the event object is:
	 * 
	 *      {
	 *         // The data payload of the response (records)
	 *         data: Object | Array,
	 * 
	 *         // The iron-ajax response object
	 *         response: Object,
	 * 
	 *         // The request params used in the request
	 *         requestParams: Object
	 *      }
	 *
	 * @event triplat-ds-core-response
	 */

	/**
	 * Fired when a request results in an error. The detail of the event object is:
	 * 
	 *      {
	 *         // The HTTP status of the response
	 *         status: String,
	 *      
	 *         // The request params used in the request
	 *         requestParams: Object
	 *      } 
	 *
	 * @event triplat-ds-core-error
	 */

    /**
	 * Generates the request and sends it to the server.
	 * 
	 * @return {Promise} The resolve value will be the same as the detail of the response 
	 *                   event. The reject value will be the same as the detail of the error 
	 *                   event.
	 */
	generateRequest: function() {
		var requestParams = {
			webContextId: this.webContextId,
			context: this.context,
			type: this.type,
			refresh: this.refresh,
			action: this.action,
			actionGroup: this.actionGroup,
			query: this.query,
			dataOut: this.dataOut,
			appContext: this.appContext
		};

		return this._doRequest(requestParams);
	},

    _doRequest: function(requestParams) {
		return new Promise(function(resolve, reject) {
			this._doRequestInPromise(requestParams, resolve, reject);
		}.bind(this));
	},

    _doRequestInPromise: function(requestParams, resolve, reject) {
		if (!this._validateParams(requestParams)) {
			reject(/* TODO add error params */);
			return;
		}

		var ajax = this.$.ajax;
		ajax.method = this._getMethod(requestParams);
		ajax.url = this._getRequestUrl(requestParams);
		ajax.params = this._getParams(requestParams);
		ajax.headers = this._getHeaders(requestParams);
		ajax.contentType = this._getContentType(requestParams);
		ajax.body = this._getBody(requestParams);

		var request = ajax.generateRequest();
		request._triplatDsCore = {
			resolve: resolve,
			reject: reject,
			requestParams: requestParams
		};
	},

    _onResponse: function(e) {
		var detail = e.detail;
		var triplatDsCore = detail._triplatDsCore;
		var resolve = triplatDsCore.resolve;
		var requestParams = triplatDsCore.requestParams;
		var response = detail.response;
		var data = null;
		if (response.data) {
			data = response.data;
		} else if (response.refresh) {
			data = response.refresh.data;
		}
		var result = {
			data: data,
			response: response,
			requestParams: requestParams
		};
		resolve(result);
		this.fire("triplat-ds-core-response", result);
	},

    _onError: function(e) {
		var detail = e.detail;
		var request = detail.request;
		var triplatDsCore = request._triplatDsCore;
		var requestParams = triplatDsCore.requestParams;
		var reject = triplatDsCore.reject;
		var result = {
			status: request.status,
			requestParams: requestParams
		};
		reject(result);
		this.fire("triplat-ds-core-error", result);
	},

    _validateParams: function(requestParams) {
		if (!requestParams.type) {
			console.warn("triplat-ds-core requires a type. Possible values:");
			console.log("     GET");
			console.log("     CREATE");
			console.log("     DELETE");
			console.log("     SAVE");
			console.log("     ADD");
			console.log("     REMOVE");
			console.error("triplat-ds-core requires a type");
			return false;
		}

		if (!requestParams.context) {
			console.error("triplat-ds-core context param is requried.");
			return false;
		}

		// TODO do validation for specifc types

		return true;
	},

    _getMethod: function(requestParams) {
		var method;
		switch(requestParams.type) {
		case "GET":
			if (requestParams.query) {
				method = "POST";
			} else {
				method = "GET";
			}
			break;
		case "SAVE":
		case "ADD":
		case "REMOVE":
			method = "PUT";
			break;
		case "CREATE":
		case "DELETE":
			method = "POST";
			break;
		}

		return method;
	},

    _getRequestUrl: function(requestParams) {
		return this._getUrl("/p/webapi/rest/v2" + requestParams.context);
	},

    _getParams: function(requestParams) {
		var params = {};

		switch(requestParams.type) {
		case "CREATE":
		case "SAVE":
		case "ADD":
		case "REMOVE":
		case "DELETE":
			if (requestParams.actionGroup) {
				params.actionGroup = requestParams.actionGroup;
			}
			if (requestParams.action) {
				params.action = requestParams.action;
			}
			if (requestParams.refresh) {
				params.refresh = "true";
			}
			break;
		}			
		
		switch(requestParams.type) {
		case "GET":
			if (requestParams.query) {
				params.query = "true"
			}
			break;
		case "ADD":
			params.type = "add";
			break;
		case "REMOVE":
			params.type = "remove";
			break;
		case "DELETE":
			params.method = "delete";
			break;
		}

		return params;
	},

    _getHeaders: function(requestParams) {
		var headers = {
			"triWebContextId": requestParams.webContextId
		};
		if (this.cacheResponse) {
			headers["tri-save-on-cache"] = "true";
		}
		return headers;
	},

    _getContentType: function(requestParams) {
		var contentType = "";
		switch(requestParams.type) {
		case "GET":
			if (!requestParams.query) {
				break;
			}
		case "CREATE":
		case "SAVE":
		case "ADD":
		case "REMOVE":
		case "DELETE":
			contentType = "application/json";
			break;
		}

		return contentType;
	},

    _getBody: function(requestParams) {
		var body = null;

		switch(requestParams.type) {
		case "GET":
			if (requestParams.query) {
				body = JSON.stringify(requestParams.query);
			}
			break;
		case "CREATE":
		case "DELETE":
		case "SAVE":
		case "ADD":
		case "REMOVE":
			var bodyObject = {
				data: requestParams.dataOut
			};
			if (requestParams.query) {
				bodyObject.query = requestParams.query
			}
			body = JSON.stringify(bodyObject);
			break;
		}

		return body;
	},

    _getUrl: function(url) {
		return this.$.url.getUrl(url);
	}
});