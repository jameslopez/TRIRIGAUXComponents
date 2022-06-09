/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triblock-tabs/triblock-tabs.js';
import '../../triblock-tabs/triblock-tab.js';
import '../../@polymer/paper-styles/demo-pages.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/iron-pages/iron-pages.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../@polymer/iron-ajax/iron-ajax.js';
import '../../triplat-theme/triplat-theme.js';
import '../../triplat-icon/ibm-icons.js';

import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriDemo extends PolymerElement {
	static get template() {
        return html `
            <style is="custom-style" include="demo-pages-shared-styles">
                #container {
                    max-width: 800px;
                }
                .container {
                            @apply --layout-flex;
                            @apply --layout-vertical;
                            height: 200px;
                        }
                        #myIronPages {
                            position:relative;
                            @apply --layout-flex;
                            @apply --layout-vertical;
                            @apply --layout-center-justified;
                            background-color: #f5f5f5;
                        }
                        #tabs {
                            position:relative;
                        }
                        section {
                            @apply --layout-horizontal;
                            @apply --layout-center-justified;
                        }
            </style>
            
            <div id="container" class="vertical-section-container centered">
                <h2>Sample <code>triblock-tabs</code></h2>
                <span>You can navigate tabs with keyboard arrow keys.</span>

                <h4>Primary <code>triblock-tabs</code></h4>
                <demo-snippet id="demo1">
                    <triblock-tabs primary>
                        <triblock-tab slot="tab" id="activityNav" icon="ibm:activity" label="Activity"></triblock-tab>
                        <triblock-tab slot="tab" id="adminNav" icon="ibm:admin" label="Admin"></triblock-tab>
                        <triblock-tab slot="tab" id="applicationNav" icon="ibm:applications" label="Application"></triblock-tab>
                    </triblock-tabs>
                <template id="template1" is="dom-bind">
                </template>
                </demo-snippet>

                <h4>Secondary <code>triblock-tabs</code></h4>
                <demo-snippet id="demo2"> 
                    <triblock-tabs>
                        <triblock-tab slot="tab" id="activityNav" icon="ibm:activity" label="Activity"></triblock-tab>
                        <triblock-tab slot="tab" id="adminNav" icon="ibm:admin" label="Admin"></triblock-tab>
                        <triblock-tab slot="tab" id="applicationNav" icon="ibm:applications" label="Application"></triblock-tab>
                    </triblock-tabs>
                <template id="template2" is="dom-bind">
                </template>
                </demo-snippet>

                <h4>Label-only <code>triblock-tabs</code></h4>
                <demo-snippet id="demo3">
                    <triblock-tabs primary>
                        <triblock-tab slot="tab" id="activityNav" label="Activity"></triblock-tab>
                        <triblock-tab slot="tab" id="adminNav" label="Admin"></triblock-tab>
                        <triblock-tab slot="tab" id="applicationNav" label="Application"></triblock-tab>
                    </triblock-tabs>
                <template id="template3" is="dom-bind">
                </template>
                </demo-snippet>

                <h4>Icon-only <code>triblock-tabs</code></h4>
                <demo-snippet id="demo4">
                    <triblock-tabs primary>
                        <triblock-tab slot="tab" icon="ibm:activity" id="activityNav"></triblock-tab>
                        <triblock-tab slot="tab" icon="ibm:admin" id="adminNav"></triblock-tab>
                        <triblock-tab slot="tab" icon="ibm:applications" id="applicationNav"></triblock-tab>
                    </triblock-tabs>
                <template id="template4" is="dom-bind">
                </template>
                </demo-snippet>	

                <h4>Scrollable Primary <code>triblock-tabs</code></h4>
                <demo-snippet id="demo5">
                    <triblock-tabs primary>
                        <triblock-tab slot="tab" id="activityNav" icon="ibm:activity" label="Activity"></triblock-tab>
                        <triblock-tab slot="tab" id="adminNav" icon="ibm:admin" label="Admin"></triblock-tab>
                        <triblock-tab slot="tab" id="applicationNav" icon="ibm:applications" label="Application"></triblock-tab>
                        <triblock-tab slot="tab" id="mailNav" icon="ibm:icons:mail" label="Mail Nav"></triblock-tab>
                        <triblock-tab slot="tab" id="settingsNav" icon="ibm:icons:settings" label="Settings Nav"></triblock-tab>
                        <triblock-tab slot="tab" id="helpNav" icon="ibm:icons:help-outline" label="Help Nav"></triblock-tab>
                    </triblock-tabs>
                <template id="template5" is="dom-bind">
                </template>
                </demo-snippet>	

                <h4>Scrollable Secondary <code>triblock-tabs</code></h4>
                <demo-snippet id="demo6">
                    <triblock-tabs>
                        <triblock-tab slot="tab" id="activityNav" icon="ibm:activity" label="Activity"></triblock-tab>
                        <triblock-tab slot="tab" id="adminNav" icon="ibm:admin" label="Admin"></triblock-tab>
                        <triblock-tab slot="tab" id="applicationNav" icon="ibm:applications" label="Application"></triblock-tab>
                        <triblock-tab slot="tab" id="mailNav" icon="ibm:icons:mail" label="Mail Nav"></triblock-tab>
                        <triblock-tab slot="tab" id="settingsNav" icon="ibm:icons:settings" label="Settings Nav"></triblock-tab>
                        <triblock-tab slot="tab" id="helpNav" icon="ibm:icons:help-outline" label="Help Nav"></triblock-tab>
                    </triblock-tabs>
                <template id="template6" is="dom-bind">
                </template>
                </demo-snippet>	

                <h4>Fit-to-container Primary <code>triblock-tabs</code></h4>
                <demo-snippet id="demo7">
                    <triblock-tabs primary fit-container>
                        <triblock-tab slot="tab" id="activityNav" icon="ibm:activity" label="Activity"></triblock-tab>
                        <triblock-tab slot="tab" id="adminNav" icon="ibm:admin" label="Admin"></triblock-tab>
                        <triblock-tab slot="tab" id="applicationNav" icon="ibm:applications" label="Application"></triblock-tab>
                    </triblock-tabs>
                <template id="template7" is="dom-bind">
                </template>
                </demo-snippet>	

                <h4>Fit-to-container Secondary <code>triblock-tabs</code></h4>
                <demo-snippet id="demo8">
                    <triblock-tabs fit-container>
                        <triblock-tab slot="tab" id="activityNav" icon="ibm:activity" label="Activity"></triblock-tab>
                        <triblock-tab slot="tab" id="adminNav" icon="ibm:admin" label="Admin"></triblock-tab>
                        <triblock-tab slot="tab" id="applicationNav" icon="ibm:applications" label="Application"></triblock-tab>
                    </triblock-tabs>
                <template id="template8" is="dom-bind">
                </template>
                </demo-snippet>	
                
                <h4>Dynamic <code>triblock-tabs</code></h4>
                <demo-snippet id="demo9">
                    <iron-ajax url="data/tabs.json" last-response="{{tabs}}" auto></iron-ajax>
                    <triblock-tabs primary>
                        <template is="dom-repeat" items="[[tabs]]">
                            <triblock-tab slot="tab" id="[[item._id]]" icon="ibm:[[item.icon]]" label="[[item.label]]"></triblock-tab>
                        </template>
                    </triblock-tabs>
                <template id="template9" is="dom-bind">
                </template>
                </demo-snippet>	

                <h4>Static and Dynamic <code>triblock-tabs</code></h4>
                <demo-snippet id="demo10">
                    <iron-ajax url="data/tabs.json" last-response="{{tabs}}" auto></iron-ajax>
                    <triblock-tabs>
                        <triblock-tab slot="tab" id="ceoOfficeNav" icon="ibm:user" label="CEO Office"></triblock-tab>
                        <template is="dom-repeat" items="[[tabs]]">
                            <triblock-tab slot="tab" id="[[item._id]]" icon="ibm:[[item.icon]]" label="[[item.label]]"></triblock-tab>
                        </template>
                        <triblock-tab slot="tab" id="inventoryNav" icon="ibm:inventory" label="Storage"></triblock-tab>
                    </triblock-tabs>
                <template id="template10" is="dom-bind">
                </template>
                </demo-snippet>	
                        
                <h4>Selected (default <code>id</code>)</h4>
                <demo-snippet id="demo11">
                    <triblock-tabs selected="adminNav">
                        <triblock-tab slot="tab" 
                            id="activityNav" 
                            icon="ibm:activity" 
                            label="Activity">
                        </triblock-tab>
                        <triblock-tab slot="tab" 
                            id="adminNav" 
                            icon="ibm:admin" 
                            label="Admin">
                        </triblock-tab>
                        <triblock-tab slot="tab" 
                            id="applicationNav" 
                            icon="ibm:applications" 
                            label="Application">
                        </triblock-tab>
                    </triblock-tabs>
                <template id="template11" is="dom-bind">
                </template>
                </demo-snippet>

                <h4>Selected (<code>attr-for-selected</code>)</h4>
                <demo-snippet id="demo12">
                    <triblock-tabs selected="applicationNav" attr-for-selected="nav-id">
                        <triblock-tab slot="tab" 
                            nav-id="activityNav" 
                            icon="ibm:activity" 
                            label="Activity">
                        </triblock-tab>
                        <triblock-tab slot="tab" 
                            nav-id="adminNav" 
                            icon="ibm:admin" label="Admin">
                        </triblock-tab>
                        <triblock-tab slot="tab" 
                            nav-id="applicationNav" 
                            icon="ibm:applications" 
                            label="Application">
                        </triblock-tab>
                    </triblock-tabs>
                <template id="template12" is="dom-bind">
                </template>
                </demo-snippet>

                <h4><code>badge-max-number</code> for badges</h4>
                <demo-snippet id="demo13">
                    <triblock-tabs badge-max-number="99">
                        <triblock-tab slot="tab" 
                            id="activityNavBadge" 
                            icon="ibm:activity" 
                            label="Activity" 
                            badge-max-number="50" 
                            badge-number="60">
                        </triblock-tab>
                        <triblock-tab slot="tab" 
                            id="adminNavBadge" 
                            icon="ibm:admin" 
                            label="Admin" 
                            badge-number="70">
                        </triblock-tab>
                        <triblock-tab slot="tab" 
                            id="applicationNavBadge" 
                            icon="ibm:applications" 
                            label="Application" 
                            badge-number="80">
                        </triblock-tab>
                    </triblock-tabs>
                <template id="template13" is="dom-bind">
                </template>
                </demo-snippet>

                <h4>Default <code>iron-pages-id</code></h4>
                <demo-snippet id="demo14">
                    <div class="container">
                        <triblock-tabs id="tabs" iron-pages-id="myIronPages" selected="activityNavIron">
                            <triblock-tab slot="tab" 
                                id="activityNavIron" 
                                iron-page-id="activityPage" 
                                icon="ibm:activity" 
                                label="Activity">
                            </triblock-tab>
                            <triblock-tab slot="tab" 
                                id="adminNavIron" 
                                iron-page-id="adminPage" 
                                icon="ibm:admin" 
                                label="Admin">
                            </triblock-tab>
                            <triblock-tab slot="tab" 
                                id="applicationNavIron" 
                                iron-page-id="applicationPage" 
                                icon="ibm:applications" 
                                label="Application">
                            </triblock-tab>
                        </triblock-tabs>
                        <iron-pages id="myIronPages">
                            <section id="activityPage">
                                <span>Activity Page</span>
                            </section>
                            <section id="adminPage">
                                <span>Administrator Page</span>
                            </section>
                            <section id="applicationPage">
                                <span>Application Page</span>
                            </section>
                        </iron-pages>
                    </div>
                <template id="template14" is="dom-bind">
                </template>
                </demo-snippet>

                <h4>Badge Icon <code>triblock-tabs</code></h4>
                <demo-snippet id="demo15">
                    <triblock-tabs>
                        <triblock-tab slot="tab" label="Activity" badge-icon="ibm:activity" id="activityNav"></triblock-tab>
                        <triblock-tab slot="tab" label="Admin" badge-icon="ibm:admin" id="adminNav"></triblock-tab>
                        <triblock-tab slot="tab" label="Applications" badge-icon="ibm:applications" id="applicationNav"></triblock-tab>
                    </triblock-tabs>
                <template id="template15" is="dom-bind">
                </template>
                </demo-snippet>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.$.template1.innerHTML = formatMarkupForDemo(this.$.demo1);
        this.$.template2.innerHTML = formatMarkupForDemo(this.$.demo2);
        this.$.template3.innerHTML = formatMarkupForDemo(this.$.demo3);
        this.$.template4.innerHTML = formatMarkupForDemo(this.$.demo4);
        this.$.template5.innerHTML = formatMarkupForDemo(this.$.demo5);
        this.$.template6.innerHTML = formatMarkupForDemo(this.$.demo6);
        this.$.template7.innerHTML = formatMarkupForDemo(this.$.demo7);
        this.$.template8.innerHTML = formatMarkupForDemo(this.$.demo8);
        this.$.template9.innerHTML = formatMarkupForDemo(this.$.demo9);
        this.$.template10.innerHTML = formatMarkupForDemo(this.$.demo10);
        this.$.template11.innerHTML = formatMarkupForDemo(this.$.demo11);
        this.$.template12.innerHTML = formatMarkupForDemo(this.$.demo12);
        this.$.template13.innerHTML = formatMarkupForDemo(this.$.demo13);
        this.$.template14.innerHTML = this._style14 + formatMarkupForDemo(this.$.demo14);
        this.$.template15.innerHTML = formatMarkupForDemo(this.$.demo15);
    }
    
    static get properties() {
		return {
            _style14: {
				type: String,
				value: `
                <style is="custom-style">
                .container {
                            @apply --layout-flex;
                            @apply --layout-vertical;
                            height: 200px;
                        }
                        #myIronPages {
                            position:relative;
                            @apply --layout-flex;
                            @apply --layout-vertical;
                            @apply --layout-center-justified;
                            background-color: #f5f5f5;
                        }
                        #tabs {
                            position:relative;
                        }
                        section {
                            @apply --layout-horizontal;
                            @apply --layout-center-justified;
                        }
            </style>
				`
            }
        }
    }
}

window.customElements.define('tri-demo', TriDemo);