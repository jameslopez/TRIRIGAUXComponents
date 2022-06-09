/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triblock-side-nav/triblock-side-nav.js';
import '../../triblock-side-nav/triblock-side-nav-item.js';
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
                    @apply --layout-horizontal;
                }

                #myIronPages {
                    position:relative;
                    @apply --layout-flex;
                    @apply --layout-vertical;
                    @apply --layout-center-justified;
                    background-color: #f5f5f5;
                }

                #sideNav {
                    position:relative;
                }

                section {
                    @apply --layout-horizontal;
                    @apply --layout-center-justified;
                }

                triblock-side-nav-item[badge-icon="warning"] {
                    --triblock-side-nav-item-badge-icon-color: var(--ibm-yellow-20) !important;
                }
                triblock-side-nav-item[badge-icon="close"] {
                    --triblock-side-nav-item-badge-icon-color: red !important;
                }
            </style>
            
            <div id="container" class="vertical-section-container centered">
            <h2>Sample <code>triblock-side-nav</code></h2>
            <span>You can navigate items with keyboard arrow keys.</span>
    
            <h4>Plain <code>triblock-side-nav</code></h4>
            <demo-snippet id="demo1">
                <triblock-side-nav>
                    <triblock-side-nav-item 
                        id="activityNav" 
                        icon="ibm:activity" 
                        label="Activity"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="adminNav" 
                        icon="ibm:admin" 
                        label="Admin"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="applicationNav"
                        icon="ibm:applications" 
                        label="Application"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                </triblock-side-nav>
                <template id="template1" is="dom-bind">
                </template>
            </demo-snippet>

            <h4>Selected (default <code>id</code>)</h4>
            <demo-snippet id="demo2">
                <triblock-side-nav selected="adminNav">
                    <triblock-side-nav-item 
                        id="activityNav" 
                        icon="ibm:activity" 
                        label="Activity"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="adminNav" 
                        icon="ibm:admin" 
                        label="Admin"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="applicationNav" 
                        icon="ibm:applications" 
                        label="Application"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                </triblock-side-nav>
                <template id="template2" is="dom-bind">
                </template>
            </demo-snippet>

            <h4>Selected (<code>attr-for-selected</code>)</h4>
            <demo-snippet id="demo3">
                <triblock-side-nav selected="applicationNav" attr-for-selected="nav-id">
                    <triblock-side-nav-item 
                        nav-id="activityNav" 
                        icon="ibm:activity" 
                        label="Activity"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        nav-id="adminNav" 
                        icon="ibm:admin" 
                        label="Admin"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        nav-id="applicationNav" 
                        icon="ibm:applications" 
                        label="Application"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                </triblock-side-nav>
                <template id="template3" is="dom-bind">
                </template>
            </demo-snippet>

            <h4><code>badge-max-number</code> for badges</h4>
            <demo-snippet id="demo4">
                <triblock-side-nav badge-max-number="99">
                    <triblock-side-nav-item 
                        id="activityNavBadge" 
                        icon="ibm:activity" 
                        label="Activity" 
                        badge-max-number="50" 
                        badge-number="60"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="adminNavBadge" 
                        icon="ibm:admin" 
                        label="Admin" 
                        badge-number="70"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="applicationNavBadge" 
                        icon="ibm:applications" 
                        label="Application" 
                        badge-number="80"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                </triblock-side-nav>
                <template id="template4" is="dom-bind">
                </template>
            </demo-snippet>
	
            <h4>Default <code>iron-pages-id</code></h4>
            <demo-snippet id="demo5">
                <div class="container">
                    <triblock-side-nav id="sideNav" iron-pages-id="myIronPages" selected="activityNavIron">
                        <triblock-side-nav-item 
                            id="activityNavIron" 
                            iron-page-id="activityPage" 
                            icon="ibm:activity" 
                            label="Activity"
                            slot="side-nav-item">
                        </triblock-side-nav-item>
                        <triblock-side-nav-item 
                            id="adminNavIron" 
                            iron-page-id="adminPage" 
                            icon="ibm:admin" 
                            label="Admin"
                            slot="side-nav-item">
                        </triblock-side-nav-item>
                        <triblock-side-nav-item 
                            id="applicationNavIron" 
                            iron-page-id="applicationPage" 
                            icon="ibm:applications" 
                            label="Application"
                            slot="side-nav-item">
                        </triblock-side-nav-item>
                    </triblock-side-nav>
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
                <template id="template5" is="dom-bind">
                </template>
            </demo-snippet>
	
            <h4>Icon as badge</h4>
            <div style="background-color:#FFFFCC">
                <div style="padding:20px;">
                    <b>Note:</b> Styling the icon on the badge, currently only works for IBM icon set.
                </div>
            </div>
            <br>
            <demo-snippet id="demo6">
                <triblock-side-nav>
                    <triblock-side-nav-item 
                        id="activityNav" 
                        badge-icon="warning"
                        icon="ibm:activity" 
                        label="Activity"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="adminNav" 
                        badge-icon="close"
                        icon="ibm:admin" 
                        label="Admin"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="applicationNav" 
                        icon="ibm:applications" 
                        label="Application"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                </triblock-side-nav>
                <template id="template6" is="dom-bind">
                </template>
            </demo-snippet>

            <h4>Disabled navigation item</h4>
            <demo-snippet id="demo7">
                <triblock-side-nav badge-max-number="99">
                    <triblock-side-nav-item 
                        id="activityNavBadge" 
                        icon="ibm:activity" 
                        label="Activity" 
                        badge-max-number="50" 
                        badge-number="60"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="adminNavBadge" 
                        icon="ibm:admin" 
                        label="Admin" 
                        badge-number="70"
                        disabled
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="applicationNavBadge" 
                        icon="ibm:applications" 
                        label="Application" 
                        badge-number="80"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                </triblock-side-nav>
                <template id="template7" is="dom-bind">
                </template>
            </demo-snippet>	

            <h4>Icons only</h4>
            <demo-snippet id="demo8">
                <triblock-side-nav>
                    <triblock-side-nav-item 
                        id="activityNavBadge" 
                        icon="ibm:activity"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="adminNavBadge" 
                        icon="ibm:admin"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                    <triblock-side-nav-item 
                        id="applicationNavBadge" 
                        icon="ibm:applications"
                        slot="side-nav-item">
                    </triblock-side-nav-item>
                </triblock-side-nav>
                <template id="template8" is="dom-bind">
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
        this.$.template5.innerHTML = this._style5 + formatMarkupForDemo(this.$.demo5);
        this.$.template6.innerHTML = this._style6 + formatMarkupForDemo(this.$.demo6);
        this.$.template7.innerHTML = formatMarkupForDemo(this.$.demo7);
        this.$.template8.innerHTML = formatMarkupForDemo(this.$.demo8);
    }
    
    static get properties() {
		return {
            _style5: {
				type: String,
				value: `
                <style is="custom-style">
                .container {
                    @apply --layout-flex;
                    @apply --layout-horizontal;
                }

                #myIronPages {
                    position:relative;
                    @apply --layout-flex;
                    @apply --layout-vertical;
                    @apply --layout-center-justified;
                    background-color: #f5f5f5;
                }

                #sideNav {
                    position:relative;
                }

                section {
                    @apply --layout-horizontal;
                    @apply --layout-center-justified;
                }
                </style>
				`
            },

            _style6: {
				type: String,
                value: `
                <style>
                triblock-side-nav-item[badge-icon="warning"] {
                    --triblock-side-nav-item-badge-icon-color: var(--ibm-yellow-20) !important;
                }
                triblock-side-nav-item[badge-icon="close"] {
                    --triblock-side-nav-item-badge-icon-color: red !important;
                }
                </style>
                `
            }
        }
    }
}

window.customElements.define('tri-demo', TriDemo);
