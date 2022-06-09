/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/**
 *	<div style="background-color:#FFFFCC">
 *  	<div style="padding:20px;">
 *			<b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
 *		</div>
 *	</div>
 */

export const TriBlockPageContainerBehavior = {

	properties: {

		_availableDs: {
			type: Object,
			value: {}
		},

		_handleDSGetComplete: {
			type: Object
		}
	},

	_onNavigateTo: function(params){
		if(this._pageAttached){
			this._pageAttached(params);
		}

		this._registerAvailableDs();
	},

	_onNavigateAway: function(){
		if(this._pageDetached){
			this._pageDetached();
		}
	
	},

	_registerAvailableDs: function(){
		this._availableDs = {};
		var ds = Array.from(dom(this.root).querySelectorAll("triplat-ds"));
		if(ds.length > 0){
			ds.forEach(function(datasource){
				if(datasource.refreshOnNavigate){
					datasource.refresh();
				}
				this._availableDs[ds.id] = false;
				this._handleDSGetComplete = function() {
					this._availableDs[this.id] = true;
					this._verifyLoadComplete();
					this.removeEventListener("ds-get-complete", this._handleDSGetComplete);
				}.bind(this);
				datasource.addEventListener("ds-get-complete", this._handleDSGetComplete);
			});
		} else {
			this._triggerPageLoaded();
		}

	},

	_verifyLoadComplete: function(){
		var complete = false;
		for (var property in this._availableDs) {
			if (this._availableDs.hasOwnProperty(property)) {
				complete = this._availableDs[property]; 
			}
		}
		
		if(complete){
			this._triggerPageLoaded();
		}
	},

	_triggerPageLoaded: function(){
		if(this._pageLoaded){
			this._pageLoaded();
		}
	}

};