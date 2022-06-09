/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/*
A component for showing progress in a gauge.

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
    <b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
  </div>
</div>

	 <triplat-progress-gauge progress="0.5"></triplat-progress-gauge>

# Styling

Custom property | Description | Default
----------------|-------------|----------
`--triplat-progress-gauge-circle-stroke-color`    | Circle stroke color             | `--ibm-gray-10`
`--triplat-progress-gauge-circle-stroke-width`    | Circle stroke width             | `2`
`--triplat-progress-gauge-completed-stroke-width` | Completed circle stroke width   | `10`
`--triplat-progress-gauge-q1-stroke-color`        | First quarter stroke color      | `--ibm-green-10`
`--triplat-progress-gauge-q2-stroke-color`        | Second quarter stroke color     | `--ibm-green-20`
`--triplat-progress-gauge-q3-stroke-color`        | Third quarter stroke color      | `--ibm-green-30`
`--triplat-progress-gauge-q4-stroke-color`        | Fouth quarter stroke color      | `--ibm-green-40`
`--triplat-progress-gauge-complete-stroke-color`  | Complete stroke color           | `--ibm-green-40`
`--triplat-progress-gauge-value-color`            | Color of the text value         | `--ibm-gray-60`
`--triplat-progress-gauge-value-font-size`        | Font size of the text value     | `1.3em`
`--triplat-progress-gauge-value-mixin`            | Mixin fo the text value         | `{}`
`--triplat-progress-gauge-percent-color`          | Color of the percent symbol     | `--ibm-gray-60`
`--triplat-progress-gauge-percent-font-size`      | Font size of the percent symbol | `1.3em`
`--triplat-progress-gauge-percent-mixin`          | Mixin fo the percent symbol     | `{}`

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					display: block;
					position: relative;
					width: 100px;
					height: 100px;
					direction: ltr;
				}

				svg {
					position: absolute;
				}

				.text-container {
					width: 100%;
					height: 100%;
					@apply --layout;
					@apply --layout-vertical;
					@apply --layout-center-justified;
					@apply --layout-center;
				}

				.text-container-inside {
					@apply --layout;
					@apply --layout-horizontal;
					@apply --layout-center-justified;
					@apply --layout-center;
				}

				.text-container-value {
					color: var(--triplat-progress-gauge-value-color, var(--ibm-gray-60));
					font-size: var(--triplat-progress-gauge-value-font-size, 1.3em);
					@apply --triplat-progress-gauge-value-mixin;
				}

				.text-container-percent {
					color: var(--triplat-progress-gauge-precent-color, var(--ibm-gray-60));
					font-size: var(--triplat-progress-gauge-percent-font-size, 1.3em);
					@apply --triplat-progress-gauge-percent-mixin;
				}

				circle {
					stroke: var(--triplat-progress-gauge-circle-stroke-color, var(--ibm-gray-10));
					stroke-width: var(--triplat-progress-gauge-circle-stroke-width, 2);
				}

				path,
				circle.complete {
					stroke-width: var(--triplat-progress-gauge-completed-stroke-width, 10);
				}

				path.q1 {
					stroke: var(--triplat-progress-gauge-q1-stroke-color, var(--ibm-green-10));
				}

				path.q2 {
					stroke: var(--triplat-progress-gauge-q2-stroke-color, var(--ibm-green-20));
				}

				path.q3 {
					stroke: var(--triplat-progress-gauge-q3-stroke-color, var(--ibm-green-30));
				}

				path.q4 {
					stroke: var(--triplat-progress-gauge-q4-stroke-color, var(--ibm-green-40));
				}

				circle.complete {
					stroke: var(--triplat-progress-gauge-complete-stroke-color, var(--ibm-green-40));
				}
			
		</style>

		<svg width="100%" height="100%" viewBox="-5 -5 110 110" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<circle id="circle" cx="50" cy="50" r="50" fill="transparent"></circle>
			<path id="path" d="" fill="transparent"></path>
		</svg>
		<div class="text-container">
			<div class="text-container-inside">
				<span class="text-container-value">{{_displayProgress}}</span><span class="text-container-percent">%</span>
			</div>
		</div>
	`,

    is: "triplat-progress-gauge",

    properties: {

		/**
		 * The progress value between 0.0 and 1.0
		 */
		progress: {
			type: Number,
			notify: false,
			readOnly: false,
			observer: "_handleProgressChange"
		},

		_displayProgress: {
			type: String,
			notify: false,
			readOnly: true
		}

	},

    _isRtl: function() {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if(textDirectionValue==="rtl"){
			return true;
		}
		return false;
	},

    _handleProgressChange: function(progress) {
		var _rtl = this._isRtl();
		
		this._applyStyle(progress);

		if (progress >= 1.0) {
			this._set_displayProgress("100");
			this._addClassSvg(this.$.circle, "complete");
			return;
		}
		
		this._set_displayProgress(Math.round(progress * 100));

		var degrees = 360.0 * progress - 90.0;
		if(_rtl) {
			//counter-clockwise
			degrees = 360.0 * (1-progress) - 90.0;
		}
		var rads = degrees * Math.PI / 180;
		var x = 50.0 + 50.0 * Math.cos(rads);
		var y = 50.0 + 50.0 * Math.sin(rads);

		var d;
		if (degrees > 90) {
			if(_rtl) {
				//mirror large-arc-flag and sweep-flag
				d = "M50 0 A 50 50, 0, 0, 0, " + x + " " + y;
			} else {
				d = "M50 0 A 50 50, 0, 1, 1, " + x + " " + y;
			}
		} else {
			if(_rtl) {
				//mirror large-arc-flag and sweep-flag
				d = "M50 0 A 50 50, 0, 1, 0, " + x + " " + y;
			} else {
				d = "M50 0 A 50 50, 0, 0, 1, " + x + " " + y;
			}
		}
		var pathElement = this.$.path;
		dom(pathElement).setAttribute("d", d);
	},

    _clearStyles: function() {
		this._removeClassSvg(this.$.circle, "complete");
		this._removeClassSvg(this.$.path, "q1");
		this._removeClassSvg(this.$.path, "q2");
		this._removeClassSvg(this.$.path, "q3");
		this._removeClassSvg(this.$.path, "q4");
	},

    _applyStyle: function(progress) {
		this._clearStyles();
		if (progress <= 0.25) {
			this._addClassSvg(this.$.path, "q1");
		} else if (progress <= 0.5) {
			this._addClassSvg(this.$.path, "q2");
		} else if (progress <= 0.75) {
			this._addClassSvg(this.$.path, "q3");
		} else if (progress <= 1.0) {
			this._addClassSvg(this.$.path, "q4");
		}
	},

    _addClassSvg: function(element, className) {
		var currentClasses = element.getAttribute("class");
		currentClasses = currentClasses ? currentClasses : "";
		element.setAttribute("class", currentClasses + " " + className);
	},

    _removeClassSvg: function(element, className) {
		var currentClasses = element.getAttribute("class");
		if (!currentClasses) return;
		var currentClassesArray = currentClasses.split(/\s/);
		var classToRemoveIndex = currentClassesArray.indexOf(className);
		if (classToRemoveIndex < 0) {
			return;
		}
		currentClassesArray.splice(classToRemoveIndex, 1);
		element.setAttribute("class", currentClassesArray.join(" "));
	}
});