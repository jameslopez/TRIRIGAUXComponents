import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../../@polymer/iron-flex-layout/iron-flex-layout-classes.js";

Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning">

				:host {
					@apply --layout-fit;
					@apply --layout-vertical;
					@apply --layout-center;
					@apply --layout-center-justified;
				}
				h1 {
					text-align: center;
					padding: 20px;
				}
			
		</style>

		<h1>You have been successfully signed out.</h1>
	`,

    is: "tricore-sso-signout-page"
});