/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-document/triplat-document-download.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-theme/triplat-theme.js';
import '../../tricore-demo-url/tricore-demo-url.js';
import './triplat-document-download-demo-1.js';
import './triplat-document-download-demo-2.js';

class TriDemo extends PolymerElement {
	static get template() {
        return html `
            <style is="custom-style" include="iron-flex iron-flex-alignment">
                .demoContainer {
                    border-top-width: 2px;
                    border-top-style: solid;	
                    border-top-color: gray;
                }
            </style>
            
            <div style="background-color:#FFFFCC">
                <div style="padding:20px;">
                    <b>Note:</b> This demo page works against mocked back-end services. The documents do not exist in the Document Manager.
                </div>
            </div>
            
            <tricore-demo-url></tricore-demo-url>
            <div class="demoContainer center layout fit vertical center">
                <triplat-document-download-demo-1></triplat-document-download-demo-1>
                <triplat-document-download-demo-2></triplat-document-download-demo-2>
            </div>
        `;
    }
}

window.customElements.define('tri-demo', TriDemo);
