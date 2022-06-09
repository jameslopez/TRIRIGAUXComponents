import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriBlockOpenPageLifecycleBehavior } from "./triblock-open-page-lifecycle-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriPlatDs } from "../triplat-ds/triplat-ds.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<slot id="content"></slot>
	`,

    is: "triblock-open",

    properties:{
		
		updateDsId: String,
		
		actionGroup: String,
		updateAction: String,
		
		_updateDs: {
			type: Object,
			readOnly: true
		},
		
		_dsInstance: {
			type: Object,
			readOnly: true,
		},
	},

    behaviors: [
		TriBlockOpenPageLifecycleBehavior
	],

    assignButtons: function(){
		var updateButton = null;
		var backButton = null;
		dom(this.$.content).getDistributedNodes().forEach(function(node){
			if(node.nodeType != 3){
				updateButton = node.querySelector("[data-block-id='updateButton']");
				backButton = node.querySelector("[data-block-id='backButton']");
				var updateDs = node.querySelector("#"+this.updateDsId);
				if(updateDs){
					this._set_componentPage(node);
					this._set_updateDs(updateDs);
					this.listen(this._updateDs, "ds-update-complete", "_handleDsUpdateComplete");
					var dsInstance = updateDs.querySelector("triplat-ds-instance");
					this._set_dsInstance(dsInstance);
				}
			}
		}.bind(this), false);
		
		if(updateButton){
			this.unlisten(updateButton, "tap", "_updateEvent");
			this.listen(updateButton, "tap", "_updateEvent");
		}

		if(backButton){
			this.unlisten(backButton, "tap", "_backEvent");
			this.listen(backButton, "tap", "_backEvent");
		}
	},

    _updateEvent: function(){
		this._updateDs.updateRecord(this._dsInstance.instanceId, TriPlatDs.RefreshType.CLIENT, this.actionGroup, this.updateAction);
	},

    _handleDsUpdateComplete: function(){
		this.fire("ds-update-complete");
	},

    _backEvent: function(){
		this.fire("back-button-tapped");
	},

    setOpenRecordId: function(recordId){
		if(this._dsInstance){
			dom(this._dsInstance).setAttribute("instance-id", recordId);
		}
	}
});