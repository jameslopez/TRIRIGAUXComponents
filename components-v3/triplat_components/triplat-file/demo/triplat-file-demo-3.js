/*<!--
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2016 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
-->*/
import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-file/triplat-file.js';

import '../../@polymer/prism-element/prism-highlighter.js';

import '../../triplat-icon/ibm-icons.js';
import '../../triplat-icon/triplat-icon.js';

import '../../@polymer/iron-demo-helpers/demo-snippet.js';
import '../../@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriplatFileDemo3 extends PolymerElement {
	static get template() {
		return html `

		<style include="demo-pages-shared-styles iron-flex iron-flex-alignment">
			#container {
				max-width: 800px;
			}

			demo-snippet {
				--demo-snippet-demo: {
					padding: 0px;
					@apply --layout-vertical;
				};
			}

			.fileIconLabel {
				--triplat-icon-width: 18px;
				--triplat-icon-height: 18px;
				padding-bottom:4px;
			}

			div[slot="label"] {
				color: red;
			}

			triplat-file {
				--triplat-file-input-container: {
					@apply --layout-flex-5;
				};
				--triplat-file-drop-area: {
					color: var(--ibm-green-50);
					border-color: var(--ibm-green-50);
					border-style: double;
					border-width: 3px;
					@apply --layout-flex-3;
				};
				--triplat-file-hover-drop-area: {
					color: var(--ibm-red-50);
					border-color: var(--ibm-red-50);
					font-style: italic;
					text-decoration: underline;
				};
				--triplat-file-drop-area-text: {
					text-align: center;
				};              
				--triplat-file-download-link-color: var(--ibm-green-50);
				--triplat-file-download-link: {
					font-style: italic;
					text-decoration: underline;
				};
				--triplat-file-button: {
					color: var(--ibm-green-50);
				};
				--triplat-file-error-notification: {
					@apply --layout-center-center;
				};
				--triplat-file-error-notification-background-color: var(--tri-primary-light-color);
				--triplat-file-error-notification-color: var(--tri-primary-content-color);

				--triplat-file-progress-notification-background-color: var(--tri-primary-light-color);
				--triplat-file-progress-notification-color: var(--ibm-green-50);
				--triplat-file-progress-bar-active-color: var(--ibm-yellow-10);
				--triplat-file-progress-container: {
					max-width: 95%;
				};
			}
		</style>
		<prism-highlighter></prism-highlighter>
		<h3>Styling the triplat-file and using a download link</h3>
		<div id="container" class="vertical-section-container centered">
			<demo-snippet id="demo">
				<triplat-file value="{{binaryField}}" show-download-link 
					show-clear-button show-drop-area  
					show-upload-progress-bar show-upload-error
					always-float-label drop-text="Drop the file here">
					<div slot="label">
						<triplat-icon class="fileIconLabel" icon="file">
						</triplat-icon>
						<span class="label">Binary Field</span>
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
		this.$.template.innerHTML =
		'<style>\n' +
		'    .fileIconLabel {\n' +
		'        --triplat-icon-width: 18px;\n' +
		'        --triplat-icon-height: 18px;\n' +
		'        padding-bottom:4px;\n' +
		'    }\n' +
		'\n' +
		'    div[slot="label"] {\n' +
		'        color:red;\n' +
		'    }\n' +
		'    \n' +
		'    triplat-file {\n' +
		'        --triplat-file-input-container: {\n' +
		'            @apply --layout-flex-5;\n' +
		'        };\n' +
		'        --triplat-file-drop-area: {\n' +
		'            color: var(--ibm-green-50);\n' +
		'            border-color: var(--ibm-green-50);\n' +
		'            border-style: double;\n' +
		'            border-width: 3px;\n' +
		'            @apply --layout-flex-3;\n' +
		'        };\n' +
		'        --triplat-file-hover-drop-area: {\n' +
		'            color: var(--ibm-red-50);\n' +
		'            border-color: var(--ibm-red-50);\n' +
		'            font-style: italic;\n' +
		'            text-decoration: underline;\n' +
		'        };\n' +
		'        --triplat-file-drop-area-text: {\n' +
		'            text-align: center;\n' +
		'        };              \n' +
		'        --triplat-file-download-link-color: var(--ibm-green-50);\n' +
		'        --triplat-file-download-link: {\n' +
		'            font-style: italic;\n' +
		'            text-decoration: underline;\n' +
		'        };\n' +
		'        --triplat-file-button: {\n' +
		'            color: var(--ibm-green-50);\n' +
		'        };\n' +
		'        --triplat-file-error-notification: {\n' +
		'            @apply --layout-center-center;\n' +
		'        };\n' +
		'        --triplat-file-error-notification-background-color: var(--tri-primary-light-color);\n' +
		'        --triplat-file-error-notification-color: var(--tri-primary-content-color);\n' +
		'    \n' +
		'        --triplat-file-progress-notification-background-color: var(--tri-primary-light-color);\n' +
		'        --triplat-file-progress-notification-color: var(--ibm-green-50);\n' +
		'        --triplat-file-progress-bar-active-color: var(--ibm-yellow-10);\n' +
		'\n' +
		'        --triplat-file-progress-container: {\n' +
		'            max-width: 95%;\n' +
		'        };\n' +
		'    }\n' +
		'</style>\n' + '\n' + formatMarkupForDemo(this.$.demo);
	}
}

window.customElements.define('triplat-file-demo-3', TriplatFileDemo3);