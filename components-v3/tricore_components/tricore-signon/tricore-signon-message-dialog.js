/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { PaperDialogBehaviorImpl, PaperDialogBehavior } from "../@polymer/paper-dialog-behavior/paper-dialog-behavior.js";

Polymer({
  _template: html`

		<style>
			:host ::slotted(.buttons) {
				@apply --layout-horizontal;
				@apply --layout-end-justified;
				margin: 10px;
			}

			:host ::slotted(#dialogHeader) { 
				height: 2em;
				background: #003e68;
				margin: 0;      
				padding-top: 1.2em;
				padding-left: 1em;
				padding-right: .1em;
				color: white;
				font-size: 1.2em;
				font-weight: bold;
				font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
				line-height: 15px;

			}

			:host ::slotted(#dialogBody) {
				margin-top: .5em;
				padding: 10px 15px;
				font-size:small;
				font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
				color:#4C4C4C;
				text-align:justify;
				line-height: 15px;
			}

			:host {
				margin-bottom: -2em;
				width: 310px;
				background-color: rgba(255, 255, 255, 1);
				max-height: 400px;
				top:22.5% !important;   
				white-space: normal;
			}

			:host ::slotted(.activeUser) {
				color: #FFFFC2;
			}

			@media (max-width: 375px) {
				:host ::slotted(#dialogHeader) { 
					font-size: 1em;
				} 
			}

			@media (max-width: 325px) {
				:host ::slotted(#dialogHeader) { 
					padding-top: 0;
					padding-left: .9em;
					font-size: .9em;
				} 
				:host ::slotted(#dialogBody) {
					font-size:.9em;
					line-height: 15px;
					padding-left: 11.34px;
					padding-right: 11.34px;
				}
			}
   		</style>

		<slot></slot>
  `,

  is: 'tricore-signon-message-dialog',

  behaviors: [
	  PaperDialogBehavior
  ]
});