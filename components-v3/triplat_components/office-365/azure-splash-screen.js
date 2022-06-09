/** 
* Copyright Wipro 2017
*
* Licensed under the Eclipse Public License - v 1.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* https://www.eclipse.org/legal/epl-v10.html
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* 
* @Author Doug Wood 
*/
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';

import '../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../@polymer/paper-item/paper-item.js';
import '../@polymer/paper-listbox/paper-listbox.js';
import '../@polymer/paper-card/paper-card.js';
import '../office-365/azure-oauth2.js';

import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";

import { importJs } from "../tricore-util/tricore-util.js";
import { getModuleUrl  } from '../tricore-util/tricore-util.js';
const importJsPromise = importJs(["../web-animations-js/web-animations-next-lite.min.js"], "tri-office-365/tri-office-365.js");

class AzureSplashScreen extends PolymerElement 
{
	static get template() {
		return html`
			<style include="iron-flex iron-flex-alignment">
				html, body {
					margin           	: 0;
					padding          	: 0;
					height           	: 100%;
					width            	: 100%;
					font-family      	: arial;
					background			: #373b50; 
				}

				:host {
					--login-font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
					font-family: var(--login-font-family);
					@apply(--layout-fit);
				}

				#container {
					@apply(--layout-horizontal);
					@apply(--layout-center-justified);
					@apply(--layout-center);
					@apply(--layout-fit);
					background-color : #373b50;
				}

				.splash {
					@apply(--layout-self-center);
					height              : 420px;
					width               : 420px;
					min-width           : 364px;
					z-index             : 100;
					background-color    : #3d415a;
					color               : white;
					padding             : 0px 48px 48px 48px;
					background-repeat   : no-repeat;
					background-position : 85% 100%;
					box-shadow          : 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4);
				}

				.title {
				  text-align    : center
				  overflow-wrap : break-word;
				}

				.center {
				  margin-right  : 0px;
				  width      	: 50%;
				  padding    	: 10px;
				}

				.image-container {
					background-position : 85% 90%;
					width               : 100%;
					padding             : 2em;
					background-repeat   : no-repeat;
				}

				#loginForm {
					@apply(--layout-self-start);
					@apply(--layout-center-justified);
					max-width: 320px;
					min-width: 320px;
				}
			</style>

			<style is="custom-style">
				paper-dropdown-menu.custom {
					--paper-input-container-label: {
						color: white;
						font-style: italic;
						text-align: center;
					};

					--paper-input-container-input: {
						color: var(--paper-indigo-500);
						font-style: normal;
					}

					/* no underline */
					--paper-input-container-underline: {
						color: white;
					};
				}

			</style>

			<div id="container">	
				<div id="splash" class="splash">
					<div id="image_container" class="image-container"></div>	

					<div id="loginForm">
						<div class="center">
			
						</div>
						<div style="width:100%;">
							<slot id="titleSlot" name="title" class="title"></slot>
						</div>
						<div id="profiles" class="center" style="display:none;">
							<h3 style="white-space: nowrap;">Select integration profile</h3>
		
							<paper-dropdown-menu id="profileDropdown" class="custom" label="Office 365 Profile" vertical-offset="55">
								<paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{region}}">
									<template id="profileRepeat" is="dom-repeat" items="[[profilelist]]">
										<paper-item value="{{item}}" on-click="_onProfileSelect">[[item.name]]</paper-item>
									</template>
								</paper-listbox>
							</paper-dropdown-menu>
						</div>
					</div>	
				</div>
			</div>
			
			<message-mgr></message-mgr>
			<azure-oauth2 id="azureAuth"
			              on-authenticate="onAuth"
			              on-profile-list="_onProfile">
            </azure-oauth2>
		`;
	}

	static get is() { return 'azure-splash-screen' }

	constructor()
	{
		super();
	}

	ready() 
	{
		super.ready();
		var top = (window.innerHeight - 500) / 2;
		var left = (window.innerWidth - 500) / 2;
		if( top < 0 ) top = 0;
		if( left < 0 ) left = 0;
		
		var ip = this.importPath;
		var idx = ip.lastIndexOf( "/");
		ip = ip.substring( 0, idx );
		var idx = ip.lastIndexOf( "/");
		ip = ip.substring( 0, idx );
		this.$.splash.style.top  = "" + top + "px";
		this.$.splash.style.left = "" + left + "px";
		this.$.splash.style.backgroundImage          = "url('" + ip + "/office-365/images/login_background.png" + "')";
		this.$.image_container.style.backgroundImage = "url('" + ip + "/office-365/images/login_logo.png" + "')";
		
		this.profilelist = [];
		
		var ip = this.importPath;
	}

	_onProfile( event )
	{
		this.$.profiles.style.display = "";
		this.profilelist = event.detail;
		this.$.profileRepeat.render();
	}
	
	_onProfileSelect( event )
	{
		var profile = event.model.__data.item;
		this.$.azureAuth.login( profile );
	}

	static get importMeta() {
		return getModuleUrl("tri-office-365/splash-screen.js");
	}
}

customElements.define( AzureSplashScreen.is, AzureSplashScreen );
