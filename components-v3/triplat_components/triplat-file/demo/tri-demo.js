import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-file/triplat-file.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../tricore-demo-url/tricore-demo-url.js';
import '../../triplat-theme/triplat-theme.js';
import './triplat-file-demo-1.js';
import './triplat-file-demo-2.js';
import './triplat-file-demo-3.js';

class TriDemo extends PolymerElement {
	static get template() {
		return html `
        <style include="iron-flex iron-flex-alignment">
		
		    .demoContainer {
                border-top-width: 2px;
                border-top-style: solid;	
                border-top-color: gray;
		    }
		
        </style>

	    <div style="background-color:#FFFFCC">
	        <div style="padding:20px;">
	            <b>Note:</b> This demo page works against mocked back-end services, so the filename and the file content to download will always be the same.
	        </div>
	    </div>
		<tricore-demo-url></tricore-demo-url>
		<div class="demoContainer layout fit vertical center">
			<triplat-file-demo-1></triplat-file-demo-1>
			<triplat-file-demo-2></triplat-file-demo-2>
			<triplat-file-demo-3></triplat-file-demo-3>
		</div>
        `;
	}
}

window.customElements.define('tri-demo', TriDemo);