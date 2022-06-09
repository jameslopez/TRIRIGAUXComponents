/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triblock-overflow-text/triblock-overflow-text.js';
import '../../@polymer/paper-styles/demo-pages.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../triblock-table/triblock-table.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-theme/triplat-theme.js';
import '../../triblock-app-layout/triblock-app-layout.js';
import '../../triblock-app-layout/triblock-banner-button.js';

class TriDemo extends PolymerElement {
	static get template() {
		return html `
            <style is="custom-style" include="demo-pages-shared-styles tristyles-theme">
            #container {
                max-width: 1200px;
            }
            
            demo-snippet {
                --demo-snippet-demo: {
                    position: relative;
                    height: 400px;
                };
			}
			
			.span-text {
				padding-bottom: 20px;
			}

			.example-width {
				width: 400px;
			}
	    
            </style>
                
            <div id="container" class="vertical-section-container centered">
            <h2>Sample <code>triblock-overflow-text</code></h2>

            <div style="font-size:12px"><p>The component covers the <code>triblock-overflow-text</code> container to make it look like a three dot line when the description text is overflowing based on number of lines need to be displayed in screen.</p></div></br>
				
			<triblock-app-layout>
				<triblock-banner-button home></triblock-banner-button>
					<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
						<triblock-table-column title="Task Id" property="id"></triblock-table-column>
						<triblock-table-column title="Name" property="name"></triblock-table-column>
						<triblock-table-column title="Location">
							<template>
								<triblock-overflow-text lines="2" text="[[item.location]]"></triblock-overflow-text>
							</template>
						</triblock-table-column>
						<triblock-table-column title="Status" property="status"></triblock-table-column>
					</triblock-table>
					<br>
					<div class="example-width">
						<div>
							<h2>With collapse property:</h2>
							<triblock-overflow-text lines="2" collapse="" text="Automation Building 4, Automation Building 5, BBFC Denver - Corporate, BBFC Denver - Shipping, BBFC Mexico Administration, Atlanta Office, Stacking Building 1, Stacking"></triblock-overflow-text>
						</div>
						<div>
							<h2>Without collapse property:</h2>
							<triblock-overflow-text lines="2" class="span-text">
								<span>Automation Building 4, Automation Building 5, BBFC Denver - Corporate, BBFC Denver - Shipping, BBFC Mexico Administration, Atlanta Office, Stacking Building 1, Stacking</span>
							</triblock-overflow-text>
						</div>
					</div>
			</triblock-app-layout>
			</div>
		`;
		
		
	}
	static get properties() {
		return {
			manyEmployees:{
				type: Array,
				value:[
						{id: "1034914", name: "John Smith", location: "Las Vegas", status: "Active"},
						{id: "1034915", name: "Emily Cruz", location: "India", status: "Active"},
						{id: "1034916", name: "Sofia Mendez", location: "Australia", status: "Active"},
						{id: "1034917", name: "Christopher Martin", location: "Automation Building 4, Automation Building 5, BBFC Denver - Corporate, BBFC Denver - Shipping, BBFC Mexico Administration, Atlanta Office, Stacking Building 1, Stacking", status: "Active"}
					]
				},
			}
		}
		
}

window.customElements.define('tri-demo', TriDemo);