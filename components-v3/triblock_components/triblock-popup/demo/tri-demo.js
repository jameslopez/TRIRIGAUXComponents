/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triblock-popup/triblock-popup.js';
import '../../@polymer/paper-styles/demo-pages.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/iron-pages/iron-pages.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-theme/triplat-theme.js';
import '../../triblock-app-layout/triblock-app-layout.js';
import '../../triblock-app-layout/triblock-banner-button.js';
import '../../@polymer/paper-button/paper-button.js';

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
            
            .buttons {
                margin-top: 20px;
                display: flex;
            }
            .buttons > paper-button {
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
                <h2>Sample <code>triblock-popup</code></h2>

                <div style="font-size:12px"><p>The component covers the <code>triblock-popup</code> container to make it look like a new page when the displayed screen width is smaller than 600px.</p> <p>This behavior of changing from a dialog pop-up display to a page display can be configured using the property called "smallScreenMaxWidth" (its default value is 600px see "TriBlockViewResponsiveBehavior" behavior for more information)</p></div></br>
                    <triblock-app-layout>
                        <triblock-banner-button home></triblock-banner-button>
                            <div class="buttons">
                                <paper-button raised on-tap="_simpleOpen">Simple popup</paper-button>	
                                <paper-button raised on-tap="_modalOpen">Modal popup</paper-button>
                            </div>
                    
                        <triblock-popup class="popup" id="simplePopup">
                            <h2>Simple Popup Title</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <paper-button class="closeButton" on-tap="_simpleClose">close</paper-button>
                        </triblock-popup>
                        <triblock-popup class="popup" modal id="modalPopup">
                            <h2>Simple Modal Popup Title</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <paper-button class="closeButton" on-tap="_modalClose">close</paper-button>
                        </triblock-popup>
                    </triblock-app-layout> 
        `;
    }

    _simpleOpen() {
        this.$.simplePopup.open();
    }

    _modalOpen() {
        this.$.modalPopup.open();
    }

    _simpleClose() {
        this.$.simplePopup.close();
    }

    _modalClose() {
        this.$.modalPopup.close();
    }
}

window.customElements.define('tri-demo', TriDemo);