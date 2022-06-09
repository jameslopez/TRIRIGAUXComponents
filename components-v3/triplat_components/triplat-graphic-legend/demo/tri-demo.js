/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-graphic-legend/triplat-graphic-legend.js';
import '../../triplat-graphic/triplat-graphic.js';
import '../../triplat-graphic/triplat-graphic-zoomable.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../tricore-demo-url/tricore-demo-url.js';
import '../../triplat-theme/triplat-theme.js';
import '../../@polymer/iron-ajax/iron-ajax.js';
import { dom } from "../../@polymer/polymer/lib/legacy/polymer.dom.js";

import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriDemo extends PolymerElement {
	static get template() {
        return html `
            <style is="custom-style" include="demo-pages-shared-styles iron-flex iron-flex-alignment">
                #container {
                    max-width: 800px;
                }

                demo-snippet {
                    --demo-snippet-demo: {
                        padding: 0px;
                        height: 300px;
                        @apply --layout-horizontal;
                    };
                }

                triplat-graphic-legend {
                    --triplat-graphic-legend-min-width: 250px;
                    flex: initial;
                }

                triplat-graphic {
                    --triplat-graphic-pin-color-2: #872a0f;
                    --triplat-graphic-pin-color-3: #562f72;
                    --triplat-graphic-pin-color-4: #339d8d;
                }

                .legendPeoplePin {
                    --triplat-graphic-legend-pin-fill-color: #872a0f;
                }

                .legendAssetPin {
                    --triplat-graphic-legend-pin-fill-color: #562f72;
                }

                .red-checkbox {
                    --triplat-graphic-legend-checkbox-color: red;
                }
            </style>
            <tricore-demo-url></tricore-demo-url>
			<tricore-url raw-url="/p/floorplans/1010" bind-url="{{_floorPlanUrl}}"></tricore-url>
			<iron-ajax url="{{_floorPlanUrl}}" last-response="{{_floorPlan}}" auto></iron-ajax>
			<tricore-url raw-url="/p/floorplans" bind-url="{{_drawingIdUrl}}"></tricore-url>
			<iron-ajax url="{{_drawingIdUrl}}" last-response="{{_drawingId}}" auto></iron-ajax>

            <div id="container" class="vertical-section-container centered">
            <h3>Location Pins and Show By sections</h3>
            <demo-snippet id="demo1">
                <triplat-graphic class="layout flex" id="triplatGraphic" drawing-id="[[_drawingId.drawingId]]">
                    <triplat-graphic-zoomable id="triplat-graphic-zoomable" slot="graphic-zoomable"></triplat-graphic-zoomable>
                    <triplat-graphic-pin pins="[[persons]]"  
                            icon="pin-person" class-number="2" enabled="[[personsEnabled]]" slot="graphic-pin">
                    </triplat-graphic-pin>
                    <triplat-graphic-pin pins="[[assets]]"  
                            icon="pin-asset" class-number="3" enabled="[[assetsEnabled]]" slot="graphic-pin">
                    </triplat-graphic-pin>
                    <triplat-graphic-pin multiple-pin class-number="4" slot="graphic-pin">
                    </triplat-graphic-pin>
                    <triplat-graphic-highlight-group legend-spaces="[[legend1]]" highlight-layer="ATTACHED"
                    	slot="graphic-highlight-group">
                    </triplat-graphic-highlight-group>
                </triplat-graphic>
                
                <triplat-graphic-legend spaces="[[spaces]]"
                            legend-spaces="{{legend1}}" opened show-by-selected="Occupancy Status">
                    <triplat-graphic-legend-pin class="legendPeoplePin" label="People" icon="pin-person" 
                            checked="{{personsEnabled}}" slot="graphic-legend-pin">
                    </triplat-graphic-legend-pin>

                    <triplat-graphic-legend-pin class="legendAssetPin" label="Assets" icon="pin-asset"
                            checked="{{assetsEnabled}}" slot="graphic-legend-pin">
                    </triplat-graphic-legend-pin>

                    <triplat-graphic-legend-show-by attribute="OccupancyStatus" 
                            color-by="OccupancyColor" label="Occupancy Status" show-all-checked
                            slot="graphic-legend-show-by">
                    </triplat-graphic-legend-show-by>
                </triplat-graphic-legend>
                <template id="template1" is="dom-bind">
                </template>
            </demo-snippet>

			<h3>Alternative layout for controlling the pins</h3>
            <demo-snippet id="demo2">
                <triplat-graphic class="layout flex" id="triplatGraphic" drawing-id="[[_drawingId.drawingId]]">
                    <triplat-graphic-zoomable id="triplat-graphic-zoomable" slot="graphic-zoomable"></triplat-graphic-zoomable>
                    <triplat-graphic-pin pins="[[persons]]"  
                            icon="pin-person" enabled="[[pinsEnabled]]" slot="graphic-pin">
                    </triplat-graphic-pin>
                    <triplat-graphic-pin pins="[[assets]]"  
                            icon="pin-asset" enabled="[[pinsEnabled]]" slot="graphic-pin">
                    </triplat-graphic-pin>
                    <triplat-graphic-highlight-group legend-spaces="[[legend2]]" highlight-layer="ATTACHED"
                    slot="graphic-highlight-group">
                    </triplat-graphic-highlight-group>
                </triplat-graphic>
                
                <triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legend2}}" show-location-pin
                        location-pin-checked="{{pinsEnabled}}" opened show-by-selected="Occupancy Status">
                    <triplat-graphic-legend-show-by attribute="OccupancyStatus" 
                            color-by="OccupancyColor" label="Occupancy Status" show-all-checked
                            slot="graphic-legend-show-by">
                    </triplat-graphic-legend-show-by>
                </triplat-graphic-legend>
                <template id="template2" is="dom-bind">
                </template>
            </demo-snippet>

            <h3>Mask unavailable spaces</h3>
            <demo-snippet id="demo3">
                <triplat-graphic class="layout flex" id="triplatGraphic" drawing-id="[[_drawingId.drawingId]]">
                    <triplat-graphic-zoomable id="triplat-graphic-zoomable" slot="graphic-zoomable"></triplat-graphic-zoomable>
                    <triplat-graphic-highlight-group legend-spaces="[[legend3]]" highlight-layer="ATTACHED"
                    	slot="graphic-highlight-group">
                    </triplat-graphic-highlight-group>
                </triplat-graphic>
                
                <triplat-graphic-legend spaces="[[spaces]]" available-spaces="[[availableSpaces]]" legend-spaces="{{legend3}}" 
                        opened show-by-selected="Organization">
                    <triplat-graphic-legend-show-by attribute="OrgName" color-by="OrgColor"
                        label="Organization" mask-unavailable-spaces show-all-checked
                        slot="graphic-legend-show-by">
                    </triplat-graphic-legend-show-by>
                </triplat-graphic-legend>
                <template id="template3" is="dom-bind">
                </template>
            </demo-snippet>

            <h3>Show the empty criterion</h3>
            <demo-snippet id="demo4">
                <triplat-graphic class="layout flex" id="triplatGraphic" drawing-id="[[_drawingId.drawingId]]">
                    <triplat-graphic-zoomable id="triplat-graphic-zoomable" slot="graphic-zoomable"></triplat-graphic-zoomable>
                    <triplat-graphic-highlight-group legend-spaces="[[legend4]]" highlight-layer="ATTACHED"
                    id="triplat-graphic-highlight-group" slot="graphic-highlight-group">
                    </triplat-graphic-highlight-group>
                </triplat-graphic>
                
                <triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legend4}}" 
                        opened show-by-selected="Organization">
                    <triplat-graphic-legend-show-by attribute="OrgName" color-by="OrgColor" label="Organization" 
                            show-all-checked show-empty-criterion empty-criterion-text="No Org"
                            slot="graphic-legend-show-by">
                    </triplat-graphic-legend-show-by>
                </triplat-graphic-legend>
                <template id="template4" is="dom-bind">
                </template>
            </demo-snippet>

            <h3>Show By and Filter By section</h3>
            <demo-snippet id="demo5">
                <triplat-graphic class="layout flex" id="triplatGraphic" drawing-id="[[_drawingId.drawingId]]">
                    <triplat-graphic-zoomable id="triplat-graphic-zoomable" slot="graphic-zoomable"></triplat-graphic-zoomable>
                    <triplat-graphic-highlight-group legend-spaces="[[legend5]]" highlight-layer="ATTACHED"
                    id="triplat-graphic-highlight-group" slot="graphic-highlight-group">
                    </triplat-graphic-highlight-group>
                </triplat-graphic>
                
                <triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legend5}}" 
                        opened show-by-selected="Organization" filter-by-selected="Space Class">
                    <triplat-graphic-legend-show-by attribute="OrgName" color-by="OrgColor" label="Organization" 
                            show-all-checked show-empty-criterion empty-criterion-text="No Org"
                            slot="graphic-legend-show-by">
                    </triplat-graphic-legend-show-by>

                    <triplat-graphic-legend-filter-by attribute="ClassName" label="Space Class" filter-all-checked
                    slot="graphic-legend-filter-by">
                    </triplat-graphic-legend-filter-by>
                </triplat-graphic-legend>
                <template id="template5" is="dom-bind">
                </template>
            </demo-snippet>

            <h3>Applying a CSS property to the legend and its children</h3>
            <demo-snippet id="demo6">
                <triplat-graphic class="layout flex" id="triplatGraphic" drawing-id="[[_drawingId.drawingId]]">
                    <triplat-graphic-zoomable id="triplat-graphic-zoomable" slot="graphic-zoomable"></triplat-graphic-zoomable>
                    <triplat-graphic-pin pins="[[persons]]" icon="pin-person" enabled="[[personsEnabled]]" slot="graphic-pin">
                    </triplat-graphic-pin>
                    <triplat-graphic-pin pins="[[assets]]" icon="pin-asset" enabled="[[assetsEnabled]]" slot="graphic-pin">
                    </triplat-graphic-pin>
                    <triplat-graphic-highlight-group legend-spaces="[[legend6]]" highlight-layer="ATTACHED"
                    id="triplat-graphic-highlight-group" slot="graphic-highlight-group"></slot>
                    </triplat-graphic-highlight-group>
                </triplat-graphic>
                
                <triplat-graphic-legend class="red-checkbox" spaces="[[spaces]]" legend-spaces="{{legend6}}" 
                        opened show-by-selected="Organization" filter-by-selected="Space Class">

                    <triplat-graphic-legend-pin label="People" icon="pin-person" checked="{{personsEnabled}}">
                    </triplat-graphic-legend-pin slot="graphic-legend-pin">

                    <triplat-graphic-legend-pin label="Assets" icon="pin-asset"	checked="{{assetsEnabled}}">
                    </triplat-graphic-legend-pin slot="graphic-legend-pin">

                    <triplat-graphic-legend-show-by class="red-checkbox" attribute="OrgName" color-by="OrgColor" 
                            label="Organization" show-all-checked show-empty-criterion empty-criterion-text="No Org"
                            slot="graphic-legend-show-by">
                    </triplat-graphic-legend-show-by>

                    <triplat-graphic-legend-filter-by class="red-checkbox" attribute="ClassName" label="Space Class" 
                            filter-all-checked
                            slot="graphic-legend-filter-by">
                    </triplat-graphic-legend-filter-by>
                </triplat-graphic-legend>
                <template id="template6" is="dom-bind">
                </template>
            </demo-snippet>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.$.template1.innerHTML = this._style1 + formatMarkupForDemo(this.$.demo1);
        this.$.template2.innerHTML = this._styleAll + formatMarkupForDemo(this.$.demo2);
        this.$.template3.innerHTML = this._styleAll + formatMarkupForDemo(this.$.demo3);
        this.$.template4.innerHTML = this._styleAll + formatMarkupForDemo(this.$.demo4);
		this.$.template5.innerHTML = this._styleAll + formatMarkupForDemo(this.$.demo5);
		this.$.template6.innerHTML = this._style6 + formatMarkupForDemo(this.$.demo6);
	}
	
	static get properties() {
		return {
			personsEnabled: {
				type: Boolean,
				value: true
			},
			assetsEnabled: {
				type: Boolean,
				value: true
			},
			pinsEnabled: {
				type: Boolean,
				value: true
			},
			spaces: {
				type: Array,
				value: () => {
					return [
		        		{"_id":"127817414",	"OccupancyStatus":"Occupied","OccupancyColor":"#FFFF00", 
		        							"OrgName":"Org A","OrgColor":"#006633",
		        							"ClassName":"Enclosed Workstation"},
		                {"_id":"127817415", "OccupancyStatus":"Occupied","OccupancyColor":"#FFFF00",
		            						"OrgName":"Org A","OrgColor":"#006633",
		            						"ClassName":"Open Workstation"},
		            	{"_id":"127817415", "OccupancyStatus":"Occupied","OccupancyColor":"#FFFF00",
		            						"OrgName":"Org B","OrgColor":"#CCCC00",
		            						"ClassName":"Open Workstation"},
		                {"_id":"127817416",	"OccupancyStatus":"Vacant","OccupancyColor":"#66FF00",
		            						"OrgName":null,"OrgColor":null,
		            						"ClassName":"Enclosed Workstation"}
		            ];
				}
			},

			availableSpaces: {
				type: Array,
				value: () => {
					return [
						{"_id":"127817415"}
					]
				}
			},
			
			assets: {
				type: Array,
				value: () => {
					return [
		            	{"_id":"127817416", "label":"Asset A", "space":" Room 03"},
		                {"_id":"127817415", "label":"Asset B", "space":" Room 02"}
		            ];
				}
			},
			
			persons: {
				type: Array,
				value: () => {
					return [
		            	{"_id":"127817414", "label":"Person One", "space":" Room 01"},
		                {"_id":"127817415", "label":"Person Two", "space":" Room 02"}
		            ];
				}
			},

			_style1: {
				type: String,
				value: `
						<style>
							triplat-graphic-legend {
								--triplat-graphic-legend-min-width: 250px;
								flex: initial;
							}

							triplat-graphic {
								--triplat-graphic-pin-color-2: #872a0f;
								--triplat-graphic-pin-color-3: #562f72;
								--triplat-graphic-pin-color-4: #339d8d;
							}

							.legendPeoplePin {
								--triplat-graphic-legend-pin-fill-color: #872a0f;
							}

							.legendAssetPin {
								--triplat-graphic-legend-pin-fill-color: #562f72;
							}
						</style>
				`
			},

			_styleAll: {
				type: String,
				value: `
					<style>
						triplat-graphic-legend {
							--triplat-graphic-legend-min-width: 250px;
							flex: initial;
						}
					</style>
				`
			},

			_style6: {
				type: String,
				value: `
					<style>
						triplat-graphic-legend {
							--triplat-graphic-legend-min-width: 250px;
							flex: initial;
						}

						.red-checkbox {
							--triplat-graphic-legend-checkbox-color: red;
						}
					</style>
				`
			}

		}
	}

}

window.customElements.define('tri-demo', TriDemo);