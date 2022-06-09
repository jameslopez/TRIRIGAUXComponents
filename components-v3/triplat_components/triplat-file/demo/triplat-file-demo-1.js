/*<!--
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
-->*/
import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-file/triplat-file.js';

import '../../@polymer/prism-element/prism-highlighter.js';

import '../../triplat-icon/ibm-icons.js';
import '../../triplat-icon/triplat-icon.js';

import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriplatFileDemo1 extends PolymerElement {
	static get template() {
		return html `

        <style include="demo-pages-shared-styles iron-flex iron-flex-alignment">
            #container {
                max-width: 800px;
            }

            demo-snippet {
                --demo-snippet-demo: {
                    padding: 0px;
                    @apply(--layout-vertical);
                };
            }

            .fileIconLabel {
                --triplat-icon-width: 18px;
                --triplat-icon-height: 18px;
                padding-bottom:4px;
            }

        </style>
        <prism-highlighter></prism-highlighter>
        <h3>Using an upload button</h3>
        <div id="container" class="vertical-section-container centered">
            <demo-snippet id="demo">
                <triplat-file value="{{binaryField}}" show-download-button 
                    show-clear-button show-upload-button  
                    show-upload-progress-bar show-upload-error>
                    <div slot="label">
                        <triplat-icon class="fileIconLabel" icon="file">
                        </triplat-icon>
                        <span>Binary Field</span>
                    </div>
                </triplat-file>
                <template id="template" is="dom-bind">
                </template>
            </demo-snippet>
        </div>
       
        `;
    }

    static get properties() {
        return {
            binaryField: {
                type: Object
            }
        }
    }
    
	connectedCallback() {
		super.connectedCallback();
        this.$.template.innerHTML = formatMarkupForDemo(this.$.demo);
	}
}

window.customElements.define('triplat-file-demo-1', TriplatFileDemo1);