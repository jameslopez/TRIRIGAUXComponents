/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../tricore-url/tricore-url.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
let models = {};

let instances = [];

/*
`triplat-auth-check` is a component that is used to find out which licenses and permissions (via security groups) are held by a user to access certain UX apps or models.

### Declaring Examples

The following example will get the licenses and permissions for the logged-in user to access
the **app** named "roomReservation":

```
  <triplat-auth-check app-name="roomReservation"
	auth="{{auth}}"
	on-check-complete="_doSomething">
  </triplat-auth-check>
```

The following example will get the licenses and permissions for the logged-in user to access
the **model** named "triReservationManager":

```
  <triplat-auth-check model-name="triReservationManager"
	auth="{{auth}}"
	on-check-complete="_doSomething">
  </triplat-auth-check>
```

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
	<b>Note:</b> The `app-name` refers to the <b>Exposed Name</b> defined in the <b>Application Designer</b>, 
	and the `model-name` refers to the <b>Exposed Name</b> defined in the <b>Model Designer</b>.
  </div>
</div>


### Model name has priority over App name

If both <b>app-name</b> and <b>model-name</b> are set, the component will prioritize the model, 
so it will check the permissions for the model, not the app.

### Get Permission for an Action

It's possible to get an action permission by using the method `getActionPermission` and setting parameters for the 
exposed name of the model, action, action group, and data sources path. 
If the action is in a parent data source, then set the data source exposed name as the "data sources path" parameter:

```
  this.$.authChecker.getActionPermission("triModel", "create", "defaultActions", "buildings");
```

If the action is in a child data source, then the "data sources path" parameter should be set in the following format: 
"parent_datasource/child_datasource".

```
  this.$.authChecker.getActionPermission("triModel", "create", "defaultActions", "buildings/floors");
```

If the action is in a grandchild data source, then follow the same logic to set the "data sources path" parameter: 
"parent_datasource/child_datasource/grandchild_datasource".

```
  this.$.authChecker.getActionPermission("triModel", "create", "defaultActions", "buildings/floors/spaces");
```
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<tricore-url hidden="" raw-url="/p/auth" bind-url="{{_authUrl}}">
		</tricore-url>
	`,

    is: "triplat-auth-check",

    /** 
	* Fired after checking the authorization.
	* <br>The event detail is the auth object
	* and follows the same format.
	*
	* @event check-complete
	*/

	properties: {
		/**
		* The name of the app whose authorization will be checked.
		*/
		appName: {
			type: String,
			value: ""
		},

		/**
		* Holds the current authorization result for the user.
		* It has the following format:<br> 
		* <b>{hasLicense: true/false, canRead: true/false, 
		* canCreate: true/false, canDelete: true/false,
		* canUpdate: true/false}</b>
		*/
		auth: {
			type: Object,
			readOnly: true,
			notify: true
		},

		/**
		* The name of the model whose authorization will be checked.
		*/
		modelName: {
			type: String,
			value: ""
		},

		_authAjax: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_authUrl: {
			type: String
		}
	},

    observers: [
		'_triggerRequestForAuth(appName, modelName, _authUrl)'
	],
	
	attached: function() {
		instances.push(this);
	},
	
	detached: function() {
		let index = instances.indexOf(this);
		if (index >=0) {
			instances.splice(index, 1);
		}
	},

    /**
	 * Returns the permission for the specified action. 
	 * It's necessary to provide the exposed name of the model, action, action group, and data sources path. 
	 * The data sources path is the hierarchy of data sources where the action was defined.
	 *
	 * @param {String} modelName The model exposed name where the action was created.
	 * @param {String} actionName The action exposed name.
	 * @param {String} actionGroup The action group exposed name where the action was created.
	 * @param {String} dataSourcesPath The data sources path. It has the following format: "parent_datasource/child_datasource".
	 * @return {Promise}
	 */
	getActionPermission: function(modelName, actionName, actionGroup, dataSourcesPath) {
		return this.getModelPermission(modelName)
			.then(modelPermission => this._checkActionPermission(modelName, actionName, actionGroup, dataSourcesPath));
	},

    _checkActionPermission: function(modelName, actionName, actionGroup, dataSourcesPath) {
		return new Promise(
			function (resolve, reject) {
				var currentAction = (models[modelName] && models[modelName].actions) ? 
						(models[modelName].actions.find(currentAction => currentAction.actionName == actionName && 
								currentAction.actionGroup == actionGroup && 
								currentAction.dataSourcesPath == dataSourcesPath)) :
						null;

				if (currentAction) {
					resolve(currentAction.permission);
				} else {
					reject("The specified action doesn't exist.");
				}
			}
		);
	},

    /**
	 * Returns the authorization result for the specified model. 
	 * It's necessary to provide the exposed name of the model.
	 *
	 * @param {String} modelName The model exposed name.
	 * @return {Promise}
	 */
	getModelPermission: function(modelName) {
		return this._triggerRequestForAuth("", modelName, this._authUrl).then(function() {
			return this.auth;
		}.bind(this));
	},

    _triggerRequestForAuth: function(appName, modelName, url) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (url != "" && (appName != "" || modelName != "")) {
			if (modelName != "" && models && models[modelName]) {
				this._setAuth(models[modelName]);
				return Promise.resolve();
			}

			var params = {};
			if (appName) params.appName = appName;
			if (modelName) params.modelName = modelName;

			return this._createAuthRequest(params, url).then(
				function(response) {
					if (response.applicationNotFound) {
						return Promise.reject("'" + appName + "' application not found when requesting authorization check");
					} else if (response.modelNotFound) {
						return Promise.reject("'" + modelName + "' model not found when requesting authorization check");
					} else {
						var auth = {
							hasLicense: response.hasLicense,
							canRead: response.canRead,
							canCreate: response.canCreate,
							canDelete: response.canDelete,
							canUpdate: response.canUpdate
						}
						if (response && response.actions) auth.actions = response.actions;
						if (response && response.modelName) { 
							auth.modelName = response.modelName;
							models[auth.modelName] = auth;
						}
						this._setAuth(auth);
						this.fire("check-complete", auth);
					}
				}.bind(this),
				function(errorCode) { 
					// Just for sanity as there's a try/catch server side
					Promise.reject("Error when requesting authentication check - Error Code: " + errorCode);
				}
			);
		}
	},

    _createAuthRequest: function(params, url) {
		return new Promise(function(resolve, reject) {
			this._doAuthRequest(params, url, resolve, reject);
		}.bind(this));
	},

    _doAuthRequest: function(params, url, resolve, reject) {
		var _authAjax = this._authAjax;
		if (!_authAjax) {
			_authAjax = document.createElement("iron-ajax");
			_authAjax.url = url;
			_authAjax.addEventListener("response", 
				this._handleAuthResponse.bind(this));
			_authAjax.addEventListener("error", 
				this._onError.bind(this));
			_authAjax.method = "GET";
			_authAjax.handleAs = 'json';
			this._set_authAjax(_authAjax);
		}
		_authAjax.params = params;
		var request = _authAjax.generateRequest();
		request._promiseResolve = resolve;
		request._promiseReject = reject;
	},

    _handleAuthResponse: function(e) {
		var response = e.detail.response;
		e.detail._promiseResolve(response);
	},

    _onError: function(e) {
		var request = e.detail.request;
		request._promiseReject(request.xhr.status);
	},

    _cache: function() {
		var params = {appName: this.appName};
		return this._createAuthRequest(params, this._authUrl);
	}
});

export function cacheAllAuthChecks() {
	if (!instances || instances.length == 0) {
		return Promise.resolve();
	}
	var cachePromises = [];
	for (var i = 0; i < instances.length; ++i) {
		cachePromises[i] = instances[i]._cache();
	}
	return Promise.all(cachePromises);
}