import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriBlockOpenPageLifecycleBehavior } from "./triblock-open-page-lifecycle-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<slot id="content"></slot>
	`,

    is: "triblock-create",

    properties:{

		actionGroup: String,
		createAction: String,
		createData: {
			type: Object,
			readOnly: false,
			notify: true,
			value: {}
		},
	},

    behaviors: [
		TriBlockOpenPageLifecycleBehavior
	],

    assignButtons: function(){
		var createButton = null;
		var backButton = null;
		dom(this.$.content).getDistributedNodes().forEach(function(node){
			if(node.nodeType != 3){
				this._set_componentPage(node);
				createButton = node.querySelector("[data-block-id='createButton']");
				backButton = node.querySelector("[data-block-id='backButton']");
			}
		}.bind(this), false);
		
		if(createButton){
			this.unlisten(createButton, "tap", "_createEvent");
			this.listen(createButton, "tap", "_createEvent");
		}

		if(backButton){
			this.unlisten(backButton, "tap", "_backEvent");
			this.listen(backButton, "tap", "_backEvent");
		}
	},

    _createEvent: function(){
		this.fire("create-button-tapped");
	},

    _backEvent: function(){
		this.fire("back-button-tapped");
	}
});