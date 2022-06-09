/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-zoom-slider/triplat-zoom-slider.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-theme/triplat-theme.js';
import '../../tricore-demo-url/tricore-demo-url.js';
import '../../tricore-url/tricore-url.js';
import '../../@polymer/iron-ajax/iron-ajax.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/polymer/lib/elements/dom-bind.js';
import '../../triplat-graphic/triplat-graphic.js';
import '../../triplat-graphic/triplat-graphic-zoomable.js';
import "../../triplat-theme/triplat-theme.js";

import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<style include="demo-pages-shared-styles">
				#container {
					max-width: 800px;
				}

				demo-snippet {
					--demo-snippet-demo: {
						padding: 0px;
						height: 500px;
						@apply --layout-vertical;
					};
				}
			</style>
			<tricore-demo-url></tricore-demo-url>
			<tricore-url raw-url="/p/floorplans/1010" bind-url="{{_floorPlanUrl}}"></tricore-url>
			<iron-ajax url="{{_floorPlanUrl}}" last-response="{{_floorPlan}}" auto></iron-ajax>
			<tricore-url raw-url="/p/floorplans" bind-url="{{_drawingIdUrl}}"></tricore-url>
			<iron-ajax url="{{_drawingIdUrl}}" last-response="{{_drawingId}}" auto></iron-ajax>
			<tricore-url raw-url="/p/floorplans/spaceCenterPoints" bind-url="{{_spaceCenterPtsUrl}}"></tricore-url>
			<iron-ajax url="{{_spaceCenterPtsUrl}}" last-response="{{_spaceCenterPoints}}" auto></iron-ajax>
			<div id="container" class="vertical-section-container centered">
				<h3>Use zoom slider with floor plan</h3>
				<demo-snippet id="demo">
					<div>
						<triplat-zoom-slider min="0.01" max="1.5" step="0.1" value="{{_zoomScale}}"></triplat-zoom-slider>
					</div>
					<triplat-graphic id="triplatGraphic" drawing-id="{{_drawingId.drawingId}}">
						<triplat-graphic-zoomable slot="graphic-zoomable" scale="{{_zoomScale}}" cached></triplat-graphic-zoomable>
					</triplat-graphic>
					<template id="template" is="dom-bind">
					</template>
				</demo-snippet>
			</div>	
		`;
	}

	static get properties() {
		return {
			_zoomScale: {
				type: Number,
				notify: true
			}
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.$.template.innerHTML = formatMarkupForDemo(this.$.demo);
	}

}

window.customElements.define('tri-demo', TriDemo);