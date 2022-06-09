/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/iron-icon/iron-icon.js";

import "../@polymer/iron-iconset-svg/iron-iconset-svg.js";
import { addDomNodes } from "../tricore-util/tricore-util.js";

const domNodesContainer = `
<iron-iconset-svg name="ibm-large" size="128">
 
<!--
	  icon: graph-in-progress (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="graph-in-progress" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="128px" height="128px" viewBox="0 0 128 128" enable-background="new 0 0 128 128" xml:space="preserve">
<g>
	<g>
		<path d="M47.591,47.65c6.678,0,8.616,4.899,8.616,10.77c0,5.6-2.369,10.823-8.616,10.823c-6.516,0-8.723-4.847-8.723-10.662
			C38.868,52.819,40.968,47.65,47.591,47.65z M47.43,66.281c4.093,0,4.738-4.523,4.738-7.861c0-3.178-0.538-7.809-4.577-7.809
			c-3.984,0-4.685,4.631-4.685,7.862C42.906,61.597,43.391,66.281,47.43,66.281z M73.008,46.95h4.577L48.668,87.013h-4.631
			L73.008,46.95z M74.192,64.882c6.677,0,8.615,4.899,8.615,10.77c0,5.6-2.369,10.823-8.615,10.823
			c-6.516,0-8.724-4.847-8.724-10.662C65.469,70.051,67.569,64.882,74.192,64.882z M74.031,83.513c4.092,0,4.738-4.523,4.738-7.861
			c0-3.178-0.539-7.809-4.577-7.809c-3.984,0-4.685,4.631-4.685,7.862C69.508,78.828,69.992,83.513,74.031,83.513z"></path>
	</g>
	<g>
		<path d="M61.136,17.377c27.188,0,49.306,22.119,49.306,49.307c0,27.188-22.118,49.308-49.306,49.308
			c-27.188,0-49.307-22.119-49.307-49.308C11.829,39.496,33.948,17.377,61.136,17.377 M61.136,13.377
			c-29.44,0-53.307,23.867-53.307,53.307c0,29.44,23.866,53.308,53.307,53.308s53.306-23.867,53.306-53.308
			C114.441,37.244,90.576,13.377,61.136,13.377L61.136,13.377z"></path>
	</g>
	<path d="M61,8.009v15.061C85,23.57,104.859,43,105.11,67h15.061C119.919,35,93,8.513,61,8.009z"></path>
</g>
</svg>

<!--
	  icon: review (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="review" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="128px" height="128px" viewBox="0 0 128 128" enable-background="new 0 0 128 128" xml:space="preserve">
<g>
	<path d="M64,64c-13.254,0-24,10.738-24,24s10.746,24,24,24c13.262,0,24-10.738,24-24S77.262,64,64,64z M64,96c-4.422,0-8-3.58-8-8
		s3.578-8,8-8s8,3.58,8,8S68.422,96,64,96z"></path>
	<rect x="48" y="28.009" width="32" height="4"></rect>
	<rect x="48" y="36.009" width="32" height="4"></rect>
	<path d="M96,59.946V4H32v55.987C20,66.326,10.993,76.084,4.019,88c12.586,21.5,33.069,36,59.991,36c26.921,0,47.428-14.5,60.014-36
		C117.033,76.06,108,66.283,96,59.946z M36,8h56v49.941C84,54.124,74.326,52,64.037,52C53.718,52,44,54.137,36,57.976V8z M64,120
		c-22.888,0-42.451-11.341-55.327-32C21.549,67.341,41.112,56,64,56c22.889,0,42.451,11.341,55.327,32
		C106.451,108.659,86.889,120,64,120z"></path>
</g>
</svg>
</iron-iconset-svg>
`;

addDomNodes(domNodesContainer);