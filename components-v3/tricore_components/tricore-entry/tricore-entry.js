/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../tricore-url/tricore-url.js";
import "../triplat-signout-button/triplat-signout-button.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/paper-toolbar/paper-toolbar.js";
import "../@polymer/paper-header-panel/paper-header-panel.js";
import "../@polymer/paper-item/paper-item.js";
import "./tricore-mock-view-switch.js";
import "./tricore-automation-switch.js";
import "./tricore-dev-mode-switch.js";
import "../triplat-theme/triplat-theme.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				font-family: "Roboto", "Helvetica Neue";
				@apply --layout-fit;
			}
			
			tricore-dev-mode-switch,
			tricore-mock-view-switch,
			tricore-automation-switch  { 
				@apply --layout-flex;
				@apply --layout;
				@apply --layout-vertical;
			}
			
			.modes {
				background: #CDCED2;
				color: #444;
				font-weight: bold;
				@apply --layout-flex;
			}

			.container {
				@apply --layout-vertical;
				@apply --layout-center;
			}

			.content {
				min-width: 300px;
				padding: 10px;
			}

			.content > div {
				min-height: 48px;
				padding: 0px 16px;
				@apply --layout-vertical;
				@apply --layout-center-justified;
			}

			.name {
				@apply --layout-flex;
				font-size: 1.1em;
			}
		
		</style>

		<tricore-url raw-url="/p/web/doc" bind-url="{{docUrl}}"></tricore-url>
		<tricore-url raw-url="/p/components/dclear" bind-url="{{dclearUrl}}"></tricore-url>
		<tricore-url raw-url="/p/components/cclear" bind-url="{{cclearUrl}}"></tricore-url>
		<tricore-url raw-url="/p/web/" bind-url="{{baseAppUrl}}"></tricore-url>
			
		<paper-header-panel main="" slot="main">
			<paper-toolbar slot="header">
				<div class="name" slot="top">UX Framework</div>
				<triplat-signout-button slot="top">
				</triplat-signout-button>
			</paper-toolbar>
			<div class="container">
				<div class="content">
					<paper-item class="modes">Resources</paper-item>
					<div>
						<a href="{{docUrl}}" target="_blank">Component Doc Page</a>
					</div>
					<div>
						<a href="https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/IBM%20TRIRIGA1/page/UX%20Framework" target="_blank">UX Framework Wiki</a>
					</div>
					<paper-item class="modes">Modes</paper-item>
					<paper-item>
						<tricore-mock-view-switch></tricore-mock-view-switch>
					</paper-item>
					<paper-item>
						<tricore-automation-switch></tricore-automation-switch>
					</paper-item>
					<paper-item>
						<tricore-dev-mode-switch></tricore-dev-mode-switch>
					</paper-item>
					<paper-item class="modes">Globalization</paper-item>
					<div>
						<a href="{{dclearUrl}}" target="_blank">Clear Dictionary Cache</a> 
					</div>
					<div>
						<a href="{{cclearUrl}}" target="_blank">Clear Translated File Cache</a>
					</div>

				</div>
			</div>
		</paper-header-panel>

	`,

	is: "tricore-entry"
	
});