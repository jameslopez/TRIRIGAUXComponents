/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triblock-confirmation-popup/triblock-confirmation-popup.js';
import '../../@polymer/paper-styles/demo-pages.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '../../@polymer/iron-demo-helpers/demo-snippet.js';
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

            demo-snippet {
                --demo-snippet-demo: {
                    position: relative;
                    height: 100px;
                };
            }

            paper-button {
                max-width: 300px;
            }
            </style>
            
                <div id="container" class="vertical-section-container centered">
                <h2>Sample <code>triblock-confirmation-popup</code></h2>
                    <paper-button raised on-tap="_confirmationOpen">Confirmation Popup</paper-button>
                    
                    <triblock-confirmation-popup id="confirmationPopup">
                        <p slot="text" class="text">Lorem ipsum dolor sit amet.</p>
                    </triblock-confirmation-popup>
                </div>
        `;
    }

    _confirmationOpen() {
        this.$.confirmationPopup.openPopup();
    }
}

window.customElements.define('tri-demo', TriDemo);