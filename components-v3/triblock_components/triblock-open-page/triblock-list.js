import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriBlockOpenPageLifecycleBehavior } from "./triblock-open-page-lifecycle-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<slot id="content"></slot>
	`,

    is: "triblock-list",

    properties:{
		createLabel: String,
		actionGroup: String,
		deleteAction: String,
		
		_firstLoad: {
			type: Boolean,
			readOnly: true,
			value: true
		}
	},

    behaviors: [
		TriBlockOpenPageLifecycleBehavior
	],

    attached: function(){
		dom(this.$.content).getDistributedNodes().forEach(function(node){
			if(node.nodeType != 3){
				var templateRepeat = node.querySelector("[data-block-id='templateRepeat']");
				if(templateRepeat){
					this._set_componentPage(node);
					this.listen(templateRepeat, "dom-change", "assignButtons");
				}
			}
		}.bind(this), false);
	},

    assignButtons: function(){
		var openButtons = [];
		var deleteButtons = []; 			
				
		 dom(this.$.content).getDistributedNodes().forEach(function(node){
			if(node.nodeType != 3){
				openButtons = openButtons.concat(Array.prototype.slice.call(node.querySelectorAll("[data-block-id='openButton']"), 0));
				deleteButtons = deleteButtons.concat(Array.prototype.slice.call(node.querySelectorAll("[data-block-id='deleteButton']"), 0));
			}
		 }.bind(this), false);
		
		openButtons.forEach(function(button) {
			this.unlisten(button, "tap", "_openEvent");
			this.listen(button, "tap", "_openEvent");
		}.bind(this), false);

		deleteButtons.forEach(function(button) {
			 this.unlisten(button, "tap", "_deleteEvent");
			this.listen(button, "tap", "_deleteEvent");
		}.bind(this), false);
		
		if(this._firstLoad){
			this.doPageLoaded();
			this._set_firstLoad(false);
		}
	},

    _openEvent: function(e){
		this.fire("open-button-tapped", {recordId: e.currentTarget.getAttribute("data-item-id")});
	},

    _deleteEvent: function(e){
		this.fire("delete-button-tapped", {recordId: e.currentTarget.getAttribute("data-item-id")});
	}
});