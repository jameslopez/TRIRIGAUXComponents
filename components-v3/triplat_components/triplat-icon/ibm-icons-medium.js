/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/iron-icon/iron-icon.js";

import "../@polymer/iron-iconset-svg/iron-iconset-svg.js";
import { addDomNodes } from "../tricore-util/tricore-util.js";

const domNodesContainer = `
<iron-iconset-svg name="ibm-medium" size="64">
 
<!--
	  icon: buildings (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="buildings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<rect x="21.3" y="10" width="6" height="6"></rect>
	<rect x="31.4" y="10" width="6" height="6"></rect>
	<rect x="41.4" y="10" width="6" height="6"></rect>
	<rect x="41.4" y="20" width="6" height="6"></rect>
	<rect x="41.4" y="30" width="6" height="6"></rect>
	<rect x="41.4" y="40" width="6" height="6"></rect>
	<path d="M14.3,2v18H8.5v42h29.2v-6h17.8V2H14.3z M21.1,56h-8v-8h8V56z M21.1,44h-8v-8h8V44z M21.1,32h-8v-8h8V32z M33.1,56h-8v-8h8
		V56z M33.1,44h-8v-8h8V44z M33.1,32h-8v-8h8V32z M52.5,53H37.7V20H17.3V5h35.2V53z"></path>
</g>
</svg>
<!--
	  icon: difference-noted (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="difference-noted" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<path d="M32,5.999L2,58.001h60L32,5.999z M32,10.001l26.537,46H5.463L32,10.001z"></path>
	<polygon points="30,28.001 30,32 31,42.001 33,42.001 34,32 34,28.001 	"></polygon>
	<circle cx="32" cy="46" r="2"></circle>
</g>
</svg>
<!--
	  icon: ok (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="ok" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<polygon points="28,37.172 21.414,30.586 18.586,33.414 28,42.829 45.414,25.415 42.586,22.585 	"></polygon>
	<path d="M32,4C16.538,4,4,16.538,4,32s12.538,28,28,28c15.463,0,28-12.538,28-28S47.463,4,32,4z M32,58.001
		C17.663,58.001,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58.001,32,58.001z"></path>
</g>
</svg>
<!--
	  icon: reserve (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="reserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<path d="M52.2,10V7c0-1.1-0.9-2-2-2s-2,0.9-2,2v3h-32V7c0-1.1-0.9-2-2-2s-2,0.9-2,2v3h-10v50h60V10H52.2z M59.2,57h-54V20h54V57z"></path>
	<rect x="11.2" y="24.9" width="12" height="12"></rect>
	<rect x="11.2" y="39.9" width="12" height="12"></rect>
	<path d="M36.2,26.9v8h-8v-8H36.2 M38.2,24.9h-12v12h12V24.9L38.2,24.9z"></path>
	<rect x="26.2" y="39.9" width="12" height="12"></rect>
	<path d="M51.2,26.9v8h-8v-8H51.2 M53.2,24.9h-12v12h12V24.9L53.2,24.9z"></path>
	<rect x="41.2" y="39.9" width="12" height="12"></rect>
</g>
</svg>
<!--
	  icon: service-request (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="service-request" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<rect x="2" y="48.1" width="60" height="5.9"></rect>
	<path d="M33,17v-3h5v-4H26v4h5v3C16.1,17.5,4,30,4,45c0.8,0,55.2,0,56,0C60,30,47.9,17.5,33,17z M13.7,26.6
		c4.9-5,11.5-7.7,18.3-7.7s13.4,2.7,18.3,7.7c4.5,4.5,7.1,10.2,7.6,16.4H6.1C6.6,36.9,9.2,31.1,13.7,26.6z"></path>
</g>
</svg>

</iron-iconset-svg>
`;

addDomNodes(domNodesContainer);