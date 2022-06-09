/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from "../../@polymer/polymer/lib/legacy/class.js";
import "../../@polymer/paper-material/paper-material.js";
import "../../@polymer/marked-element/marked-element.js";

import "../../@polymer/prism-element/prism-highlighter.js";
import "../../@polymer/iron-collapse/iron-collapse.js";
import "../../@polymer/paper-listbox/paper-listbox.js";
import "../../@polymer/paper-icon-button/paper-icon-button.js";
import "../../@polymer/paper-item/paper-item.js";

import "../../triplat-icon/ibm-icons-glyphs.js";
import { TriDirBehavior } from "../../tricore-dir-behavior/tricore-dir-behavior.js";

import "../triplat-graphic.js";

class TriplatGraphicPinDemo1 extends mixinBehaviors([TriDirBehavior], PolymerElement) {
	static get template() {
		return html`
		<style include="iron-flex iron-flex-alignment">
			paper-material {
				margin-top: 15px;
				margin-bottom: 15px;
				width: 550px;
				height:480px;
				@apply(--layout-vertical);
			}

			.collapseBorder {
				background-color: var(--ibm-gray-30);
				width: 20px;
				@apply(--layout-horizontal);
				@apply(--layout-center-center);
			}

			iron-collapse {
				overflow-y:auto;
				overflow-x: hidden;
				max-height: 100%
			}

			.showItemsButton {
				color: var(--tri-primary-color);
				width: 20px;
				height: 20px;
				--paper-icon-button: {
					padding: 0px;
				};
			}

			:host([dir="ltr"]) .showItemsButton {
				 transform: rotate(180deg); 
			}

			:host([dir="ltr"]) .showItemsButton[active] {
				transform: rotate(0deg);  
			}

			:host([dir="rtl"]) .showItemsButton {
				transform: rotate(0deg);  
			}

			:host([dir="rtl"]) .showItemsButton[active] {
				transform: rotate(180deg);  
			}

			.markdown-html {
				background-color: #eeeeee;
				height:180px;
				border-top-width: 2px;
				border-top-style: solid;
				border-top-color: gray;
				padding: 20px;
				margin: 0;
				font-size: 13px;
				overflow: auto;
			}

			.markdown-html > pre {
				margin: 0;
				padding: 0 0 10px 0;
			}

			paper-item[selected] {
				color: black;
				font-weight: bold;
				background-color: var(--ibm-blue-10);
			}
		</style>
		<prism-highlighter></prism-highlighter>
		<h3>Showing a person location</h3>
		<paper-material elevation="1">
			<div class="layout horizontal" style="height:300px;">
				<div class="layout horizontal">
					<iron-collapse class="layout horizontal" id="collapse" horizontal opened="{{_showItems}}">
						<div class="layout vertical" style="min-width:200px">
							<h1>Persons</h1>
							<paper-listbox selected-attribute="selected" 
										   attr-for-selected="pin" selected={{_selectedPerson}}>
								<template is="dom-repeat" items="{{_personPins}}">
									<paper-item pin="[[item]]">[[item.label]]</paper-item>
								</template>
							</paper-listbox>
						</div>
					</iron-collapse>
					<div class="collapseBorder">
						<paper-icon-button class="showItemsButton" 
										   icon="ibm-glyphs:back"
										   active="{{_showItems}}" toggles
										   on-tap="_handleShowListButtonTap">
						</paper-icon-button>
					</div>
				</div>
				<triplat-graphic class="layout flex" id="triplatGraphic" on-_graphic-changed="_handleGraphicChanged">
					<triplat-graphic-zoomable slot="graphic-zoomable"></triplat-graphic-zoomable>
					<triplat-graphic-pin slot="graphic-pin" pins="[[_personPins]]"  
										 icon="ibm:pin-person" show-label-onhover
										 selected="{{_selectedPerson}}">
					</triplat-graphic-pin>

					<triplat-graphic-pin slot="graphic-pin" multiple-pin show-label-onhover>
					</triplat-graphic-pin>
				</triplat-graphic>
			</paper-material>
		</div>
		<marked-element markdown=[[_markdown]]>
			<div slot="markdown-html" class="markdown-html"></div>
		</marked-element>
	`;
	}
	
	static get is() { return "triplat-graphic-pin-demo-1" }
		
	static get properties() {
		return {

			_personPins: {
				type: Array,
				value: [{"_id":"127817414", "label":"Person One"},
						{"_id":"127817415", "label":"Person Two"},
						{"_id":"127817415", "label":"Person Three"},
						{"_id":"127817415", "label":"Person Four"},
						{"_id":"127817416", "label":"Person Five"},
						{"_id":"127817416", "label":"Person Six"}]
			},

			_markdown: {
				type: String,
				value:
					`<triplat-graphic drawing-id="[[_drawingID]]">
						<triplat-graphic-zoomable></triplat-graphic-zoomable>

						<triplat-graphic-pin pins="[[_personPins]]" icon="ibm:pin-person"
							show-label-onhover enabled="[[_personPinsEnabled]]">
						</triplat-graphic-pin>
	
						<triplat-graphic-pin multiple-pin show-label-onhover>
						</triplat-graphic-pin>

					</triplat-graphic>`
			},

			_showItems: {
				type: Boolean,
				value: true
			}
		};
	}

	_handleShowListButtonTap() {
		this.async(this._notifyResize, 300);
	}

	_notifyResize() {
		this.$.triplatGraphic._graphic.notifyResize();
	}

	_handleGraphicChanged() {
		var triplatGraphic = this.$.triplatGraphic;
		triplatGraphic._graphic._resetDrawing();
		var e = {};
		e.detail = {};
		e.detail.xhr = {
			getResponseHeader: function(name) {
				if(name==="X-Tri-Drawing-Units") {
					return "INCHES";
				} else if (name==="X-TRI-Drawing-Scale-Factor") {
					return "1.0";
				} else {
					return "";
				}
			}
		};

		e.detail.response = "<svg xmlns='http://www.w3.org/2000/svg' ><g id='triGrossAreaLayer'><polyline tri-record-id='127817411' class='tri-attached' stroke='#000000' stroke-width='0.274595' stroke-opacity='1' stroke-linecap='round' stroke-linejoin='miter' stroke-miter-limit='4' fill-opacity='0.0' points='-124.056984,-104.303547 220.382638,-104.303547 220.382638,83.429964 -124.056984,83.429964 -124.056984,-104.303547 '></polyline></g><g id='triMeasuredGrossAreaLayer'><polyline tri-record-id='127817411' class='tri-attached' stroke='#000000' stroke-width='0.274595' stroke-opacity='1' stroke-linecap='round' stroke-linejoin='miter' stroke-miter-limit='4' fill-opacity='0.0' points='-120.820121,-101.694904 216.975507,-101.694904 216.975507,80.470155 -120.820121,80.470155 -120.820121,-101.694904 '></polyline></g><g id='triSpaceLayer'><polyline tri-record-id='127817414' class='tri-attached' stroke='#000000' stroke-width='0.274595' stroke-opacity='1' stroke-linecap='round' stroke-linejoin='miter' stroke-miter-limit='4' fill-opacity='0.0' points='-114.737588,-95.199471 27.122978,-95.199471 27.122978,-45.21616 -114.737588,-45.21616 -114.737588,-95.199471 '></polyline><polyline tri-record-id='127817415' class='tri-attached' stroke='#000000' stroke-width='0.274595' stroke-opacity='1' stroke-linecap='round' stroke-linejoin='miter' stroke-miter-limit='4' fill-opacity='0.0' points='31.981217,-95.684746 209.306926,-95.684746 209.306926,-44.730885 31.981217,-44.730885 31.981217,-95.684746 '></polyline><polyline tri-record-id='127817416' class='tri-attached' stroke='#000000' stroke-width='0.274595' stroke-opacity='1' stroke-linecap='round' stroke-linejoin='miter' stroke-miter-limit='4' fill-opacity='0.0' points='-114.737588,-37.937037 -14.657872,-37.937037 -14.657872,76.102557 -114.737588,76.102557 -114.737588,-37.937037 '></polyline></g><g id='lines'></g><g id='circle'></g><g id='triItemLayer'></g><g id='Gross'></g><g id='0'></g><g id='MGross'></g><g id='Boundary'></g><g id='triLabelLayer'></g><g id='_triMaskLayer'></g><g id='_triLabelLayer'></g><g id='triGrossAreaLayer'><polyline tri-record-id='127817411' class='tri-interactive' fill-opacity='0.0' points='-124.056984,-104.303547 220.382638,-104.303547 220.382638,83.429964 -124.056984,83.429964 -124.056984,-104.303547 '></polyline></g><g id='triMeasuredGrossAreaLayer'><polyline tri-record-id='127817411' class='tri-interactive' fill-opacity='0.0' points='-120.820121,-101.694904 216.975507,-101.694904 216.975507,80.470155 -120.820121,80.470155 -120.820121,-101.694904 '></polyline></g><g id='triSpaceLayer'><polyline tri-record-id='127817414' class='tri-interactive' fill-opacity='0.0' points='-114.737588,-95.199471 27.122978,-95.199471 27.122978,-45.21616 -114.737588,-45.21616 -114.737588,-95.199471 '></polyline><polyline tri-record-id='127817415' class='tri-interactive' fill-opacity='0.0' points='31.981217,-95.684746 209.306926,-95.684746 209.306926,-44.730885 31.981217,-44.730885 31.981217,-95.684746 '></polyline><polyline tri-record-id='127817416' class='tri-interactive' fill-opacity='0.0' points='-114.737588,-37.937037 -14.657872,-37.937037 -14.657872,76.102557 -114.737588,76.102557 -114.737588,-37.937037 '></polyline></g></svg>";

		triplatGraphic._graphic.async(
			function() {
				triplatGraphic._graphic._handleGetDrawingSvgResponse(e);
			},
			1500
		);
	}
};

window.customElements.define(TriplatGraphicPinDemo1.is, TriplatGraphicPinDemo1);