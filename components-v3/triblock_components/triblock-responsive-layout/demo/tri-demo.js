/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triblock-responsive-layout/triblock-responsive-layout.js';
import '../../@polymer/paper-styles/demo-pages.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/paper-button/paper-button.js';
import { dom } from "../../@polymer/polymer/lib/legacy/polymer.dom.js";

import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriDemo extends PolymerElement {
	static get template() {
        return html `
            <style is="custom-style" include="demo-pages-shared-styles">
                #container {
                    max-width: 800px;
                }
                
                demo-snippet {
                    --demo-snippet-demo: {
                        position: relative;
                        height: 300px;
                    };
                }

                .box {
                    min-width: 100px;
                    min-height: 100px;
                    @apply --layout;
                    @apply --layout-center-center;
                    border: solid black;
                }

                .box-1 {
                    background-color: lightblue;
                }
                
                .box-2 {
                    background-color: lightgreen;
                }

                .box-3 {
                    background-color: lightyellow;
                }

            </style>
            
            <div id="container" class="vertical-section-container centered">
		    <h2>Default layout</h2>
            
            <demo-snippet id="demo1">
            <triblock-responsive-layout>
                <div class="box box-1">1</div>
                <div class="box box-2">2</div>
            </triblock-responsive-layout>
            <template id="template1" is="dom-bind">
            </template>
            </demo-snippet> 	 
            
            <h2>Stack reverse layout</h2>
            
            <demo-snippet id="demo2">
            <triblock-responsive-layout stack-reverse>
                <div class="box box-1">1</div>
                <div class="box box-2">2</div>
            </triblock-responsive-layout>
            <template id="template2" is="dom-bind">
            </template>
            </demo-snippet>	
            
            <h2>Swtich view layout</h2>

            <demo-snippet id="demo3"> 
        		<paper-button raised hidden$="{{!smallScreen}}" on-tap="_toggleView">Toggle view</paper-button>
				<triblock-responsive-layout id="responsiveComp" switch-view current-view-id="first-box" small-screen-width="{{smallScreen}}">
					<div id="first-box" class="box box-1">1</div>
					<div id="second-box" class="box box-2">2</div>
                </triblock-responsive-layout>
                <template id="template3" is="dom-bind">
                </template>
            </demo-snippet>
            
            <h2>Configure responsive layout behavior</h2>
            
            <div><p>The child components are stacked to display vertically when the screen width is lesser than or equal to 800px</p></div>
            <demo-snippet id="demo4"> 

                    <triblock-responsive-layout small-screen-max-width="800px">
                        <div class="box box-1">1</div>
                        <div class="box box-2">2</div>
                        <div class="box box-3">3</div>
                    </triblock-responsive-layout> 
                <template id="template4" is="dom-bind">
                </template>
            </demo-snippet>
        `;
    }

    static get properties() {
        return {
            _script3: {
                type: String,
                value: `
                <script>
                    function _toggleView(){
                        var responsiveComp = document.querySelector("#responsive-comp"); 
                        if (responsiveComp.currentViewId == "first-box"){
                            responsiveComp.currentViewId = "second-box";
                        } else {
                            responsiveComp.currentViewId = "first-box";
                        }
                    }
                </script>
                `
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.$.template1.innerHTML = formatMarkupForDemo(this.$.demo1);
        this.$.template2.innerHTML = formatMarkupForDemo(this.$.demo2);
        this.$.template3.innerHTML = formatMarkupForDemo(this.$.demo3) + this._script3;
        this.$.template4.innerHTML = formatMarkupForDemo(this.$.demo4);
	}

    _toggleView() {
        var responsiveComp = this.$.responsiveComp; 
        if(responsiveComp.currentViewId == "first-box"){
            responsiveComp.currentViewId = "second-box";
        }else{
            responsiveComp.currentViewId = "first-box";
        }
    }
}

window.customElements.define('tri-demo', TriDemo);