/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/paper-dialog/paper-dialog.js";
import "../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";

/*
This component is a Popup that displays viewer error messages. It is used by triplat-bim-viewer.
  
  var messageBox = document.createElement( 'triplat-bim-message-box' );
  messageBox.value = {
		  title        : "Title",
		  label        : "Icon label",
		  messages     : [
			"message line 1", 
			"message line 2" 
		  ],
		  body = "<html><body>Formatted Message</body></html>",
		  link = "http://www.mylink.com/TRIRIGA",
		};
  this.parentNode.appendChild( messageBox );
  messageBox.open();
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				paper-button {
					background-color : #204080;
					color            : white;
				}		
				.buttons {
					float            : right;
				}
			
		</style>

		<paper-dialog id="messageBox">
			<h2>[[value.title]]</h2>
			<paper-dialog-scrollable>
				<div style="display:inline">
					[[value.label]]
					<paper-icon-button icon="[[icon]]">[[value.label]]</paper-icon-button>
				</div>
				<template id="repeat" is="dom-repeat" items="[[value.messages]]">
					<p>[[item]]</p>
				</template>
				<div id="body"></div>
				<div> <a href="[[value.link]]">[[value.link]]</a></div>
			</paper-dialog-scrollable>
			<div class="buttons">
				<paper-button dialog-dismiss="" autofocus="" on-click="_close" raised="">Close</paper-button>
			</div>
		</paper-dialog>
	`,

    is: "triplat-bim-message-box",

    properties : {
		value : {
			type     : Object,
			observer : '_onValue'
		},
		icon : {
			type     : String,
			value    : 'error'
		},
	},

    ready : function()
	{
		this.messages = [];
	},

    open : function()
	{
		this.$.messageBox.open();
	},

    _close : function()
	{
		this.parentNode.removeChild( this );
	},

    //============================================================================
	// Observers
	//============================================================================
	_onValue  : function(
		value
	) {
		if( value.body )
		{
			this.$.body.innerHTML = value.body;
		}
	}
});