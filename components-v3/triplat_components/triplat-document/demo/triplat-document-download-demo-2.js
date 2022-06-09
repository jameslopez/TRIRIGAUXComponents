/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-document/triplat-document-download.js';

import '../../@polymer/paper-material/paper-material.js';
import '../../@polymer/marked-element/marked-element.js';

import '../../@polymer/prism-element/prism-highlighter.js';

import '../../triplat-icon/ibm-icons.js';
import '../../triplat-icon/triplat-icon.js';

class TridocumentDownloadDemo2 extends PolymerElement {
	static get template() {
        return html `
            <style>
                paper-material {
                    margin-top: 15px;
                    margin-bottom: 15px;
                    width: 700px;
                    height: 183px;
                    @apply --layout-vertical;    
                }

                .markdown-html {
                    background-color: #eeeeee;
                    height:100px;
                    border-top-width: 2px;
                    border-top-style: solid;    
                    border-top-color: gray;
                    padding: 10px;
                    margin: 0;
                    font-size: 13px;
                    overflow: auto;
                }

                .markdown-html > pre {
                    margin: 0px;
                    padding: 0px;
                }
            </style>
            
            <prism-highlighter></prism-highlighter>
            <h3>Displaying an error message if the download fails</h3>
            <paper-material elevation="1">
                <triplat-document-download document-id="[[document._id]]" document-name="[[document.name]]" document-file-name="[[document.fileName]]" show-error>
                </triplat-document-download>
                <marked-element markdown=[[_markdown]]>
                    <div slot="markdown-html" class="markdown-html"></div>
                </marked-element>
            </paper-material>
        `;
    }

    static get properties() {
        return {
            document: {
                type: Object,
                value: {
                	_id: "445566",
                	name: "Restricted Presentation",
                	fileName: "presentation.ppt"
                }
            },

            _markdown: {
                type: String,
                value:
                    '```html\n' +
                    '<triplat-document-download document-id="[[document._id]]"\n' +
                    '    document-name="[[document.name]]"\n' +
                    '    document-file-name="[[document.fileName]]" show-error>\n' +
                    '</triplat-document-download>\n' +
                    '```'
            }  
        }
    }
}

window.customElements.define('triplat-document-download-demo-2', TridocumentDownloadDemo2);