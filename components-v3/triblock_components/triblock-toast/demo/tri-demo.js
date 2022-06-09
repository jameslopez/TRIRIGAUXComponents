/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triblock-toast/triblock-toast.js';
import '../../@polymer/paper-styles/demo-pages.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-theme/triplat-theme.js';
import '../../@polymer/paper-button/paper-button.js';

class TriDemo extends PolymerElement {
	static get template() {
		return html `
            
            <style is="custom-style" include="demo-pages-shared-styles tristyles-theme">
            #container {
                max-width: 1200px;
            }

            .example {
                @apply --layout-center;
                @apply --layout-horizontal;
                margin-bottom: 20px;
            }

            .label {
                margin-right: 10px;
            }
            
            .buttons {
                margin-top: 20px;
                display: flex;
            }
            paper-button {
                max-width: 300px;
            }

            .closeButton {
                max-width: 150px;
            }

            .popup {
                max-width: 550px;
            }
            </style>
                
            <div id="container" class="vertical-section-container centered">
                <h2>Sample <code>triblock-toast</code></h2>
    
                <div class="example">
                    <span class="label">Success type: </span>
                    <paper-button on-tap="_successOpen">Success</paper-button>
                </div>
                <div class="example">
                    <span class="label">Warning type: </span>
                    <paper-button on-tap="_warningOpen">Warning</paper-button>
                </div>
                <div class="example">
                    <span class="label">Major-warning type: </span>
                    <paper-button on-tap="_majorWarningOpen">Major-warning</paper-button>
                </div>
                <div class="example">
                    <span class="label">Error type: </span>
                    <paper-button on-tap="_errorOpen">Error</paper-button>
                </div>
                <div class="example">
                    <span class="label">Info type: </span>
                    <paper-button on-tap="_infoOpen">Info</paper-button>
                </div>
    
                <triblock-toast id="success" type="success" duration="0" title="Title" text="Text message"></triblock-toast>
                <triblock-toast id="warning" type="warning" duration="0" title="Title" text="Text message"></triblock-toast>
                <triblock-toast id="majorWarning" type="major-warning" duration="0" title="Title" text="Text message"></triblock-toast>
                <triblock-toast id="error" type="error" duration="0" title="Title" text="Text message"></triblock-toast>
                <triblock-toast id="info" type="info" duration="0" title="Title" text="Text message"></triblock-toast>
            </div> 
        `;
    }

    _successOpen() {
        this.$.success.open();
    }

    _warningOpen() {
        this.$.warning.open();
    }

    _majorWarningOpen() {
        this.$.majorWarning.open();
    }

    _errorOpen() {
        this.$.error.open();
    }

    _infoOpen() {
        this.$.info.open();
    }
}

window.customElements.define('tri-demo', TriDemo);