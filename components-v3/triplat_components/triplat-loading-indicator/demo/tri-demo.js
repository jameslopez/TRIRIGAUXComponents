/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-loading-indicator/triplat-loading-indicator.js';
import '../../@polymer/paper-styles/demo-pages.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/iron-pages/iron-pages.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-theme/triplat-theme.js';
import '../../triblock-tabs/triblock-tabs.js';
import '../../triblock-tabs/triblock-tab.js';
import '../../triblock-tabs/triblock-tab-nav-layout.js';
import '../../triplat-routing/triplat-routing.js';
import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriDemo extends PolymerElement {
	static get template() {
        return html `
            <style include="demo-pages-shared-styles tristyles-theme">
            #container {
                max-width: 800px;
			}
			
			triblock-tab-nav-layout {
				--triblock-tab-nav-layout: {
					height: 200px;
				}
			}

			section {
				@apply --layout-horizontal;
				@apply --layout-center-justified;
			}

			#myIronPages {
				@apply --layout-vertical;
				@apply --layout-center-justified;
				background-color: #f5f5f5;
			}

			</style>

			<div id="container" class="vertical-section-container centered">
			<h2>Sample <code>triplat-loading-indicator</code></h2>
			
            <demo-snippet id="demo">
				<triblock-tab-nav-layout>
					<triblock-tabs primary selected="showPageNav" nav>
						<triblock-tab 
							id="showPageNav" 
							iron-page-id="showPage" 
							label="Show page"
							slot="tab">
						</triblock-tab>
						<triblock-tab 
							id="hidePageNav" 
							iron-page-id="hidePage" 
							label="Hide page"
							slot="tab">
						</triblock-tab>
						<triblock-tab 
							id="noLoadingIndicatorNav" 
							iron-page-id="noLoadingIndicatorPage" 
							label="No loading indicator"
							slot="tab">
						</triblock-tab>
					</triblock-tabs>
					<iron-pages id="myIronPages" page>
						<section id="showPage">
							<span>This page is shown in the background when the loading indicator is activated.</span>
							<triplat-loading-indicator show></triplat-loading-indicator>
						</section>
						<section id="hidePage">
							<span>This page is not shown in the background when the loading indicator is activated.</span>
							<triplat-loading-indicator show hide-background></triplat-loading-indicator>
						</section>
						<section id="noLoadingIndicatorPage">
							<span>The loading indicator in this page is not activated.</span>
							<triplat-loading-indicator></triplat-loading-indicator>
						</section>
					</iron-pages>
				</triblock-tab-nav-layout>
				<template id="template" is="dom-bind">
				</template>
		    </demo-snippet>
            </div>
        `;
	}
	
	connectedCallback() {
		super.connectedCallback();
		this.$.template.innerHTML = formatMarkupForDemo(this.$.demo);
	}
}

window.customElements.define('tri-demo', TriDemo);