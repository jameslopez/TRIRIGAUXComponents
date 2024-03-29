/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-spinner/paper-spinner.js";

/*
A component that dims the screen and displays a `paper-spinner` at the center whenever `show` is true. The component uses "position: absolute; top: 0; right: 0; bottom: 0; left: 0;" to 
  expand itself to the nearest container with "position: relative;". The ancestor CSS style affects the position and layout of the triplat-loading-indicator.
  

  <div style="background-color:#FFFFCC">
	  <div style="padding:20px;">
		  <b>Note:</b> Avoid visible or scrollable overflowing content in the container with "position: relative;", 
				because the loading indicator will not expand to cover the exposed overflow. 
				This is a known side-effect of "position: absolute; top: 0; right: 0; bottom: 0; left: 0;".
	  </div>
  </div>


  ### Example of showing the loading indicator

	<triplat-loading-indicator show></triplat-loading-indicator>
	
  The loading indicator is shown on the page and the page is shown by default in the background.

  ### Example of showing the loading indicator but hiding the page in the background

	<triplat-loading-indicator show hide-background></triplat-loading-indicator>
	
  The loading indicator is shown on the page and the page is hidden in the background.


### Styling

`@apply(--layout-fit)` is used to expand to the nearest containing element.

Custom property | Description | Default
----------------|-------------|----------
`--triplat-loading-indicator-clear-background`  | The background color when `hide-background` is not set | `rgba(0, 0, 0, .65)`
`--triplat-loading-indicator-opaque-background` | The background color when `hide-background` is set     | `--tri-body-background-color`
`--triplat-loading-indicator-container`         | Mixin applied to the loading indicator container       | {}

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				.container > div {
					@apply --layout-fit;
					@apply --layout-vertical;
					@apply --layout-center-center;
					z-index: 7;
					@apply --triplat-loading-indicator-container;
				}
		
				.clear-background {
					background-color: var(--triplat-loading-indicator-clear-background, rgba(0, 0, 0, .65));
				}
		
				.opaque-background {
					background-color: var(--triplat-loading-indicator-opaque-background, var(--tri-body-background-color));
				}
		
				paper-spinner {
					z-index: 8;
				}
			
		</style>

		<div class="container" hidden\$="{{!show}}">
			<div class="clear-background" hidden\$="{{hideBackground}}">
				<paper-spinner active=""></paper-spinner>
			</div>
			<div class="opaque-background" hidden\$="{{!hideBackground}}">
				<paper-spinner active=""></paper-spinner>
			</div>
		</div>
	`,

    is: "triplat-loading-indicator",

    properties: {
		/**
		 * If true, the screen is dimmed and a loading indicator is shown on the screen.
		 */
		show: {
			type: Boolean,
			value: false
		},
		/**
		 * If true, hides the content of the page when the loading indicator is activated.  Otherwise, it shows the content of the page in the background.
		 */
		hideBackground: {
			type: Boolean,
			value: false
		}
	}
});