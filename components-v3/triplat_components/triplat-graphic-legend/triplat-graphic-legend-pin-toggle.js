/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/paper-button/paper-button.js";
import "../triplat-icon/triplat-icon.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

			.pinToggle {
				min-width: var(--legend-pin-size);
				min-height: var(--legend-pin-size);
				--paper-button: {
					padding: 0px;
					position: relative;
					margin: 0px;
				};
			}
	 
			triplat-icon {
				z-index: 1;
				position: absolute;
				top: 0px;
				left: 0px;
				--triplat-icon-iron-icon: {
					width: var(--legend-pin-size);
					height: var(--legend-pin-size);
				};
				--triplat-icon-fill-color: var(--legend-pin-fill-color);
			}

			#line {
				z-index: 2;
				position: absolute;
				top: 0px;
				left: 0px;
				fill: var(--legend-pin-fill-color);
				width: var(--legend-pin-size);
				height: var(--legend-pin-size);
			}
			
			:host([dir="rtl"]) #line {
				transform: rotate(90deg);
			}  
		
		</style>

		<paper-button class="pinToggle tri-disable-theme" active="{{active}}" toggles="">
			<triplat-icon icon="[[icon]]"></triplat-icon>
			<svg id="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" hidden\$="[[active]]">
				<path fill="#FFFFFF" d="M3 3 L26 31 L29 28 L6 0 Z"></path>
				<path d="M4 2 L27 30 L28 29 L5 1 Z"></path>
			</svg>
		</paper-button>
	`,

    is: "triplat-graphic-legend-pin-toggle",

    properties: {

		active: {
			type: Boolean,
			value: false,
			notify: true
		},

		icon: {
			type: String
		}
	},

    behaviors: [TriDirBehavior]
});