/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/iron-icon/iron-icon.js";

import "../@polymer/iron-iconset-svg/iron-iconset-svg.js";
import { addDomNodes } from "../tricore-util/tricore-util.js";

const domNodesContainer = `
<iron-iconset-svg name="ibm" size="32">
 
<!--
	  icon: access-password-key (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="access-password-key" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M25,1L12.611,13.388C11.785,13.138,10.908,13,10,13c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9
		c0-0.909-0.138-1.785-0.389-2.612L21,17v-2h2l8-8V1H25z M29,6.171L22.172,13H21h-2v2v1.171l-1.803,1.802l-0.848,0.848l0.348,1.147
		C16.898,20.63,17,21.313,17,22c0,3.86-3.141,7-7,7s-7-3.14-7-7s3.141-7,7-7c0.686,0,1.37,0.102,2.031,0.302l1.146,0.348
		l0.848-0.848L25.828,3H29V6.171z"></path>
	<circle cx="8" cy="24" r="2"></circle>
	<rect x="19.757" y="7.5" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 46.6274 -3.3137)" width="8.485" height="1"></rect>
</g>
</svg>
<!--
	  icon: activity (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="activity" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="21,14.414 25.293,18.707 26.707,17.293 21,11.586 11,21.586 6.707,17.293 5.293,18.707 11,24.414 	"></polygon>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
</g>
</svg>
<!--
	  icon: add-new (from Action-based)
  -->
<svg version="1.1" id="add-new" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="17,9 15,9 15,15 9,15 9,17 15,17 15,23 17,23 17,17 23,17 23,15 17,15 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: admin (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="admin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,21c5.523,0,10-4.477,10-10S21.523,1,16,1S6,5.477,6,11S10.477,21,16,21z M16,3c4.411,0,8,3.589,8,8s-3.589,8-8,8
		s-8-3.589-8-8S11.589,3,16,3z"></path>
	<path d="M24,23H8c-2.209,0-4,1.791-4,4v4h24v-4C28,24.791,26.209,23,24,23z"></path>
	<polygon points="21.207,8.707 19.793,7.293 14.5,12.586 12.207,10.293 10.793,11.707 14.5,15.414 	"></polygon>
</g>
</svg>
<!--
	  icon: aligncenter (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="aligncenter" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="5" y="6" width="22" height="2"></rect>
	<rect x="9" y="12" width="14" height="2"></rect>
	<rect x="3" y="18" width="26" height="2"></rect>
	<rect x="9" y="24" width="14" height="2"></rect>
</g>
</svg>
<!--
	  icon: alignleft (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="alignleft" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="1" y="6" width="22" height="2"></rect>
	<rect x="1" y="12" width="14" height="2"></rect>
	<rect x="1" y="18" width="26" height="2"></rect>
	<rect x="1" y="24" width="14" height="2"></rect>
</g>
</svg>
<!--
	  icon: alignright (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="alignright" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="9" y="6" width="22" height="2"></rect>
	<rect x="17" y="12" width="14" height="2"></rect>
	<rect x="5" y="18" width="26" height="2"></rect>
	<rect x="17" y="24" width="14" height="2"></rect>
</g>
</svg>
<!--
	  icon: api (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="api" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M14.16,15.715c-0.107,0-0.179-0.03-0.215-0.09c-0.037-0.06-0.055-0.16-0.055-0.3v-2.66c0-0.274-0.06-0.505-0.18-0.695
		c-0.12-0.19-0.278-0.345-0.475-0.465c-0.197-0.12-0.419-0.207-0.665-0.26c-0.247-0.053-0.497-0.08-0.75-0.08
		c-0.287,0-0.566,0.027-0.84,0.08c-0.273,0.053-0.519,0.146-0.735,0.28c-0.217,0.134-0.395,0.31-0.535,0.53
		c-0.14,0.22-0.22,0.497-0.24,0.83h1.14c0.027-0.28,0.143-0.487,0.35-0.62c0.207-0.133,0.47-0.2,0.79-0.2
		c0.113,0,0.233,0.009,0.36,0.025c0.126,0.017,0.242,0.05,0.345,0.1c0.103,0.05,0.19,0.122,0.26,0.215
		c0.07,0.093,0.105,0.213,0.105,0.36c0,0.167-0.042,0.292-0.125,0.375c-0.083,0.083-0.197,0.145-0.34,0.185
		c-0.144,0.04-0.309,0.068-0.495,0.085c-0.187,0.017-0.383,0.045-0.59,0.085c-0.24,0.027-0.479,0.065-0.715,0.115
		c-0.237,0.05-0.45,0.132-0.64,0.245c-0.19,0.114-0.344,0.27-0.46,0.47c-0.117,0.2-0.175,0.46-0.175,0.78
		c0,0.253,0.048,0.475,0.145,0.665c0.097,0.19,0.227,0.347,0.39,0.47c0.163,0.124,0.352,0.217,0.565,0.28
		c0.213,0.063,0.436,0.095,0.67,0.095c0.307,0,0.625-0.05,0.955-0.15c0.33-0.1,0.608-0.26,0.835-0.48
		c0.047,0.234,0.147,0.397,0.3,0.49c0.153,0.093,0.346,0.14,0.58,0.14c0.047,0,0.104-0.003,0.17-0.01
		c0.066-0.007,0.133-0.017,0.2-0.03c0.067-0.014,0.132-0.028,0.195-0.045c0.063-0.017,0.115-0.032,0.155-0.045v-0.79
		c-0.06,0.013-0.113,0.02-0.16,0.02C14.233,15.715,14.193,15.715,14.16,15.715z M12.75,14.734c0,0.18-0.043,0.332-0.13,0.455
		c-0.087,0.123-0.195,0.225-0.325,0.305c-0.13,0.08-0.269,0.137-0.415,0.17c-0.146,0.034-0.283,0.05-0.41,0.05
		c-0.1,0-0.211-0.01-0.335-0.03c-0.123-0.02-0.236-0.055-0.34-0.105s-0.192-0.118-0.265-0.205c-0.073-0.086-0.11-0.193-0.11-0.32
		c0-0.146,0.025-0.271,0.075-0.375c0.05-0.104,0.118-0.186,0.205-0.25c0.086-0.063,0.186-0.113,0.3-0.15
		c0.113-0.037,0.23-0.065,0.35-0.085c0.253-0.047,0.506-0.082,0.76-0.105c0.253-0.023,0.467-0.092,0.64-0.205V14.734z"></path>
	<path d="M19.67,11.97c-0.2-0.25-0.452-0.447-0.755-0.59c-0.303-0.143-0.659-0.215-1.065-0.215c-0.333,0-0.644,0.065-0.93,0.195
		c-0.287,0.13-0.51,0.345-0.67,0.645h-0.02v-0.7h-1.08v7.08h1.14v-2.58h0.02c0.086,0.14,0.195,0.262,0.325,0.365
		c0.13,0.104,0.271,0.189,0.425,0.255c0.153,0.066,0.313,0.115,0.48,0.145c0.166,0.03,0.333,0.045,0.5,0.045
		c0.38,0,0.71-0.075,0.99-0.225c0.28-0.15,0.512-0.35,0.695-0.6c0.183-0.25,0.32-0.538,0.41-0.865
		c0.09-0.327,0.135-0.664,0.135-1.01c0-0.38-0.05-0.736-0.15-1.07S19.87,12.22,19.67,11.97z M19.055,14.56
		c-0.05,0.217-0.134,0.41-0.25,0.58c-0.117,0.17-0.265,0.309-0.445,0.415c-0.18,0.106-0.4,0.16-0.66,0.16
		c-0.233,0-0.438-0.047-0.615-0.14c-0.177-0.093-0.329-0.22-0.455-0.38c-0.126-0.16-0.222-0.352-0.285-0.575
		c-0.063-0.223-0.095-0.465-0.095-0.725c0-0.553,0.122-0.997,0.365-1.33c0.243-0.333,0.605-0.5,1.085-0.5
		c0.233,0,0.44,0.052,0.62,0.155c0.18,0.104,0.33,0.24,0.45,0.41c0.12,0.17,0.21,0.365,0.27,0.585c0.06,0.22,0.09,0.446,0.09,0.68
		C19.13,14.121,19.105,14.343,19.055,14.56z"></path>
	<rect x="21.26" y="9.334" width="1.14" height="1.08"></rect>
	<rect x="21.26" y="11.305" width="1.14" height="5.17"></rect>
	<path d="M3,3v22v4h26v-4V3H3z M5,5h22v18H5V5z"></path>
</g>
</svg>
<!--
	  icon: applications (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="applications" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M25.192,16.192l-1.414-1.414c-0.938,0.938-2.029,1.677-3.242,2.221l-2.32-6.671C19.291,9.61,20,8.389,20,7
	c0-1.861-1.278-3.412-3-3.858V1h-2v2.142C13.278,3.588,12,5.139,12,7c0,1.389,0.709,2.61,1.784,3.328L7.056,29.671l1.889,0.657
	l3.747-10.773c1.082,0.283,2.195,0.428,3.309,0.428c1.114,0,2.227-0.145,3.309-0.428l3.747,10.773l1.889-0.657l-3.75-10.783
	C22.692,18.239,24.04,17.345,25.192,16.192z M16,6c0.552,0,1,0.448,1,1s-0.448,1-1,1c-0.552,0-1-0.448-1-1S15.448,6,16,6z
	 M13.351,17.66l2.328-6.692C15.787,10.977,15.89,11,16,11c0.11,0,0.213-0.023,0.321-0.032l2.328,6.692
	C16.913,18.089,15.087,18.089,13.351,17.66z"></path>
</svg>
<!--
	  icon: archive-storage (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="archive-storage" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="13" y="14" width="6" height="2"></rect>
	<path d="M1,5v5h2v16v1h6v-1h14v1h6v-1V10h2V5H1z M5,24V12h22v12H5z"></path>
</g>
</svg>
<!--
	  icon: assets (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="assets" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M29,24L28.963,3H3v21h9v3.015l-2,0.003V29h12v-2l-2,0.003V24H29z M5,5h22v15H5V5z"></path>
</svg>
<!--
	  icon: attachment (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="attachment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M8.003,30c-1.876,0-3.639-0.753-4.963-2.12c-2.711-2.801-2.711-7.358,0-10.16L15.62,4.726C17.321,2.968,19.586,2,21.997,2
	c2.411,0,4.676,0.968,6.377,2.726c3.491,3.606,3.492,9.475,0.001,13.082L18.128,28.392L16.692,27l10.247-10.583
	c2.748-2.839,2.748-7.46-0.001-10.3C25.616,4.752,23.861,4,21.997,4c-1.864,0-3.619,0.752-4.941,2.117L4.477,19.111
	c-1.968,2.034-1.969,5.344,0,7.377C5.42,27.463,6.673,28,8.003,28c1.33,0,2.582-0.537,3.525-1.511l9.409-9.719
	c1.189-1.228,1.188-3.226,0-4.453c-1.131-1.168-3.09-1.169-4.222-0.001L9.64,19.624l-1.437-1.392l7.074-7.307
	c0.945-0.977,2.206-1.515,3.547-1.515c1.342,0,2.602,0.538,3.548,1.515c1.931,1.995,1.932,5.24,0,7.235l-9.408,9.718
	C11.642,29.247,9.879,30,8.003,30z"></path>
</svg>
<!--
	  icon: availability
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="availability" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<rect x="4.9" y="5.2" width="8" height="4"></rect>
		<path d="M11.9,6.2v2h-6v-2H11.9 M13.9,4.2h-10v6h10V4.2L13.9,4.2z"></path>
	</g>
	<rect x="7" y="12.7" width="18" height="6"></rect>
	<rect x="16.1" y="21.2" width="12" height="6"></rect>
	<rect x="1" y="3.5" width="1" height="25"></rect>
	<rect x="30" y="3.5" width="1" height="25"></rect>
</g>
</svg>
<!--
	  icon: audio-sound (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="audio-sound" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M5,1v30h22V1H5z M25,29H7V3h18V29z"></path>
	<path d="M16,27c3.866,0,7-3.134,7-7c0-3.865-3.134-7-7-7s-7,3.135-7,7C9,23.866,12.134,27,16,27z M16,18c1.104,0,2,0.896,2,2
		s-0.896,2-2,2s-2-0.896-2-2S14.896,18,16,18z"></path>
	<circle cx="16" cy="8" r="2"></circle>
</g>
</svg>
<!--
	  icon: audio (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="audio" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M5,10v12h7l9,9V1l-9,9H5z M10,20H7v-8h3V20z"></path>
	<path d="M22,13v6c1.654,0,3-1.346,3-3S23.654,13,22,13z"></path>
</g>
</svg>
<!--
	  icon: backward (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="backward" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
	<polygon points="15.3,9.3 8.6,16 15.3,22.7 16.7,21.3 12.4,17 24,17 24,15 12.4,15 16.7,10.7 	"></polygon>
	<path d="M2,16c0,7.7,6.3,14,14,14s14-6.3,14-14S23.7,2,16,2S2,8.3,2,16z M4,16C4,9.4,9.4,4,16,4s12,5.4,12,12s-5.4,12-12,12
		S4,22.6,4,16z"></path>
</g>
</svg>
<!--
	  icon: back-left-previous (from Action-based)
  -->
<svg version="1.1" id="back-left-previous" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
	<polygon points="16.707,10.707 15.293,9.293 8.586,16 15.293,22.707 16.707,21.293 12.414,17 24,17 24,15 12.414,15 	"></polygon>
</g>
</svg>
<!--
	  icon: barchart (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="barchart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="2,26 2,5 1,5 1,26 1,27 2,27 31,27 31,26 	"></polygon>
	<rect x="4" y="16" width="7" height="8"></rect>
	<path d="M20,8h-7v16h7V8z M18,22h-3V10h3V22z"></path>
	<rect x="22" y="13" width="7" height="1"></rect>
	<rect x="22" y="15" width="7" height="1"></rect>
	<rect x="22" y="17" width="7" height="1"></rect>
	<rect x="22" y="19" width="7" height="1"></rect>
	<rect x="22" y="21" width="7" height="1"></rect>
	<rect x="22" y="23" width="7" height="1"></rect>
</g>
</svg>
<!--
	  icon: bee (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="bee" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M11.843,14h8.313c-0.896-1.205-2.423-2-4.157-2C14.266,12,12.74,12.795,11.843,14z"></path>
	<path d="M11.033,16C11.012,16.164,11,16.331,11,16.5V18h10v-1.5c0-0.169-0.012-0.336-0.033-0.5H11.033z"></path>
	<path d="M11,21.5c0,0.169,0.012,0.336,0.033,0.5h9.935C20.988,21.836,21,21.669,21,21.5V20H11V21.5z"></path>
	<path d="M16,26c1.734,0,3.26-0.795,4.157-2h-8.313C12.74,25.205,14.266,26,16,26z"></path>
	<path d="M3.23,15.049c-0.426,0.178-0.826,0.438-1.172,0.783c-0.347,0.347-0.606,0.746-0.783,1.172
		C1.092,17.446,0.999,17.916,1,18.387c-0.001,0.472,0.092,0.941,0.275,1.383c0.177,0.428,0.436,0.826,0.783,1.173
		c0.346,0.347,0.747,0.606,1.172,0.783C3.669,21.907,4.138,22,4.606,22c0.002,0,0.005,0,0.007,0c0.002,0,0.005,0,0.007,0
		c0.468,0,0.936-0.093,1.376-0.275c0.427-0.176,0.826-0.435,1.172-0.782c0.346-0.347,0.606-0.745,0.783-1.173L11,12L3.23,15.049z
		 M7.027,19.387c-0.132,0.319-0.323,0.606-0.566,0.849c-0.244,0.243-0.528,0.434-0.848,0.565C5.294,20.934,4.961,21,4.606,21
		c-0.341,0-0.675-0.066-0.991-0.197c-0.322-0.135-0.607-0.324-0.85-0.568c-0.243-0.242-0.433-0.527-0.565-0.848
		C2.067,19.067,1.999,18.73,2,18.386c-0.001-0.343,0.067-0.679,0.199-0.999c0.132-0.319,0.323-0.604,0.566-0.848
		c0.243-0.242,0.528-0.434,0.831-0.559l5.636-2.213L7.027,19.387z"></path>
	<path d="M30.725,17.004c-0.177-0.426-0.436-0.825-0.783-1.172c-0.346-0.346-0.747-0.605-1.172-0.783L21,12l3.049,7.77
		c0.177,0.428,0.437,0.826,0.783,1.173c0.346,0.347,0.745,0.606,1.172,0.782C26.444,21.907,26.912,22,27.379,22
		c0.002,0,0.005,0,0.007,0c0.002,0,0.005,0,0.007,0c0.468,0,0.937-0.093,1.376-0.274c0.425-0.177,0.826-0.436,1.172-0.783
		c0.347-0.347,0.606-0.745,0.783-1.173C30.908,19.328,31,18.858,31,18.387C31,17.916,30.908,17.446,30.725,17.004z M29.801,19.388
		c-0.132,0.319-0.323,0.605-0.566,0.849c-0.242,0.242-0.527,0.432-0.846,0.565C28.069,20.934,27.735,21,27.379,21
		c-0.34,0-0.674-0.066-0.994-0.199c-0.318-0.132-0.603-0.322-0.847-0.565c-0.244-0.243-0.434-0.529-0.56-0.831l-2.211-5.637
		l5.618,2.205c0.32,0.133,0.606,0.324,0.849,0.566c0.243,0.243,0.434,0.528,0.566,0.848c0.132,0.32,0.2,0.656,0.199,1.001
		C30,18.73,29.933,19.067,29.801,19.388z"></path>
	<path d="M13.5,11c1.104,0,2-0.894,2-2s-0.896-2-2-2c-1.105,0-2,0.894-2,2S12.395,11,13.5,11z M13.5,8c0.551,0,1,0.449,1,1
		s-0.449,1-1,1c-0.551,0-1-0.449-1-1S12.949,8,13.5,8z"></path>
	<path d="M18.5,11c1.104,0,2-0.894,2-2s-0.896-2-2-2c-1.105,0-2,0.894-2,2S17.395,11,18.5,11z M18.5,8c0.551,0,1,0.449,1,1
		s-0.449,1-1,1c-0.551,0-1-0.449-1-1S17.949,8,18.5,8z"></path>
</g>
</svg>
<!--
	  icon: blog (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="blog" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="15,13 13,13 14,9 12,9 11,13 11,17 15,17 	"></polygon>
	<polygon points="21,13 19,13 20,9 18,9 17,13 17,17 21,17 	"></polygon>
	<path d="M3,3v19v1l6,6h1h19V3H3z M27,27H10v-5H5V5h22V27z"></path>
</g>
</svg>
<!--
	  icon: bold (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="bold" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M23,16c2.126-1.248,4-3.335,4-5.849C27,6.26,24.168,3,20,3H5v26h15c4.168,0,7-3.26,7-7.151C27,19.335,25.126,17.248,23,16z
	 M15,27h-4V17h4c2.98,0,5,2.205,5,5.052C20,24.899,17.98,27,15,27z M15,15h-4V5h4c2.98,0,5,2.205,5,5.052C20,12.899,17.98,15,15,15z
	"></path>
</svg>
<!--
	  icon: booklet-guide (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="booklet-guide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M21,7L11,5L1,7v18v3v1l10-2l10,2l10-2v-1v-3V5L21,7z M20,24.8l-8-1.6V7.239l8,1.601V24.8z M3,8.64l7-1.399V23.2L3,24.6V8.64
	z M22,24.8V8.84l7-1.4V23.4L22,24.8z"></path>
</svg>
<!--
	  icon: bookmark (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="bookmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M8,1H4v30h4h20V1H8z M26,29H10V3h6v14l4-4l4,4V3h2V29z"></path>
</svg>
<!--
	  icon: bottom (from Action-based)
  -->
<svg version="1.1" id="bottom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="6" y="27" width="20" height="4"></rect>
	<polygon points="24.707,13.707 23.293,12.293 17,18.587 17,2 15,2 15,18.585 8.707,12.293 7.293,13.707 16.001,22.414 	"></polygon>
</g>
</svg>
<!--
	  icon: buildings (from TRIRIGA)
  -->
<svg version="1.1" id="buildings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="10.9" y="5" width="3" height="3"></rect>
	<rect x="15.9" y="5" width="3" height="3"></rect>
	<rect x="21" y="5" width="3" height="3"></rect>
	<rect x="21" y="10" width="3" height="3"></rect>
	<rect x="21" y="15" width="3" height="3"></rect>
	<rect x="21" y="20" width="3" height="3"></rect>
	<path d="M6.9,1v9H4v21h15.1v-3H28V1H6.9z M10.3,28.5h-4v-4h4V28.5z M10.3,22.5h-4v-4h4V22.5z M10.3,16.5h-4v-4h4V16.5z M16.8,28.5
		h-4v-4h4V28.5z M16.8,22.5h-4v-4h4V22.5z M16.8,16.5h-4v-4h4V16.5z M26,26h-6.9V10H8.9V3H26V26z"></path>
</g>
</svg>
<!--
	  icon: bulletlist (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="bulletlist" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="8" y="6" width="23" height="2"></rect>
	<rect x="8" y="15" width="23" height="2"></rect>
	<rect x="8" y="24" width="23" height="2"></rect>
	<circle cx="3" cy="7" r="2"></circle>
	<circle cx="3" cy="16" r="2"></circle>
	<circle cx="3" cy="25" r="2"></circle>
</g>
</svg>
<!--
	  icon: calendar (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="calendar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M17.461,19.279c-0.345,0.303-0.723,0.586-1.135,0.848c-0.412,0.266-0.807,0.535-1.187,0.816
		c-0.79,0.539-1.413,1.172-1.869,1.896c-0.457,0.729-0.692,1.58-0.702,2.557h7.983v-1.715h-5.695c0.078-0.26,0.222-0.5,0.436-0.73
		c0.209-0.23,0.458-0.451,0.74-0.664c0.286-0.213,0.594-0.426,0.928-0.639c0.335-0.213,0.669-0.438,1.004-0.672
		c0.333-0.234,0.657-0.488,0.97-0.76c0.311-0.27,0.588-0.563,0.832-0.881c0.246-0.318,0.441-0.668,0.586-1.049
		c0.146-0.381,0.217-0.809,0.217-1.279c0-0.379-0.062-0.781-0.183-1.201c-0.122-0.42-0.333-0.809-0.628-1.17
		c-0.294-0.357-0.681-0.654-1.16-0.891c-0.478-0.234-1.074-0.352-1.787-0.352c-0.656,0-1.232,0.115-1.728,0.344
		c-0.496,0.229-0.916,0.547-1.263,0.949c-0.345,0.404-0.604,0.883-0.775,1.438c-0.173,0.557-0.26,1.158-0.26,1.809h1.903
		c0.013-0.414,0.054-0.802,0.125-1.16c0.074-0.357,0.185-0.668,0.335-0.934c0.149-0.264,0.351-0.471,0.602-0.623
		c0.25-0.148,0.563-0.227,0.943-0.227c0.41,0,0.744,0.07,1.002,0.211c0.256,0.141,0.457,0.314,0.602,0.521s0.242,0.43,0.293,0.672
		c0.049,0.242,0.074,0.469,0.074,0.68c-0.012,0.459-0.127,0.865-0.352,1.218C18.091,18.648,17.809,18.977,17.461,19.279z"></path>
	<path d="M26,6V3.463c0-0.553-0.447-1-1-1s-1,0.447-1,1V6H8V3.463c0-0.553-0.447-1-1-1s-1,0.447-1,1V6H1v24h23.568L31,23.396V6H26z
		 M29,23h-5v5H3V11h26V23z"></path>
</g>
</svg>
<!--
	  icon: calendar-today (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="calendar-today" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<path d="M26,6V3.463c0-0.553-0.447-1-1-1s-1,0.447-1,1V6H8V3.463c0-0.553-0.447-1-1-1s-1,0.447-1,1V6H1v24h23.568L31,23.396V6H26z
			 M29,23h-5v5H3V11h26V23z"></path>
	</g>
	<polygon points="13.999,21.068 10.706,17.775 9.292,19.189 13.999,23.896 22.707,15.189 21.293,13.775 	"></polygon>
</g>
</svg>
<!--
	  icon: camera (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="camera" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M11,6V4H5v2H1v20h30V6H11z M29,24H3V8h26V24z"></path>
	<path d="M21,22.5c3.592,0,6.5-2.908,6.5-6.5S24.592,9.5,21,9.5c-3.587,0-6.5,2.908-6.5,6.5S17.413,22.5,21,22.5z M21,10.5
		c3.033,0,5.5,2.467,5.5,5.5s-2.467,5.5-5.5,5.5c-3.033,0-5.5-2.467-5.5-5.5S17.967,10.5,21,10.5z"></path>
	<path d="M21,19.5c1.934,0,3.5-1.566,3.5-3.5s-1.566-3.5-3.5-3.5c-1.932,0-3.5,1.566-3.5,3.5S19.068,19.5,21,19.5z M21,15
		c0.552,0,1,0.447,1,1s-0.448,1-1,1c-0.552,0-1-0.447-1-1S20.448,15,21,15z"></path>
</g>
</svg>
<!--
	  icon: cart-checkout (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="cart-checkout" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M25.414,12l-6.707-6.707l-1.414,1.414L22.586,12H9.414l5.293-5.293l-1.414-1.414L6.586,12H1v3h2l2,15h22l2-15h2v-3H25.414z
		 M25.249,28H6.751L5.284,17h21.432L25.249,28z"></path>
	<rect x="11" y="19" width="1" height="7"></rect>
	<rect x="14" y="19" width="1" height="7"></rect>
	<rect x="17" y="19" width="1" height="7"></rect>
	<rect x="20" y="19" width="1" height="7"></rect>
</g>
</svg>
<!--
	  icon: catalog (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="catalog" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M21,3c-2,0-4,1-5,2c-1-1-3-2-5-2H3v24h8c2,0,4,1,5,2c1-1,3-2,5-2h8V3H21z M16,26.484C14.657,25.649,12.869,25,11,25H5V5h6
	c1.359,0,2.891,0.719,3.586,1.414L16,7.829V26.484z M26,20h-7v-1h7V20z M26,17h-7v-1h7V17z M26,14h-7v-1h7V14z M26,11h-7v-1h7V11z"></path>
</svg>
<!--
	  icon: chat-im (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="chat-im" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M24.484,4.515C22.313,2.343,19.313,1,16,1S9.686,2.343,7.516,4.515C5.344,6.687,4,9.686,4,13s1.344,6.313,3.516,8.485
		C9.686,23.657,12.686,25,16,25v6l8.484-9.016C26.656,19.685,28,16.508,28,13C28,9.686,26.656,6.687,24.484,4.515z M23.027,20.613
		L18,25.956V25v-2h-2c-2.671,0-5.182-1.04-7.07-2.93C7.041,18.182,6,15.671,6,13s1.041-5.182,2.93-7.071S13.329,3,16,3
		s5.182,1.04,7.07,2.93C24.959,7.818,26,10.329,26,13C26,15.881,24.945,18.583,23.027,20.613z"></path>
	<circle cx="16" cy="13" r="1.5"></circle>
	<circle cx="21" cy="13" r="1.5"></circle>
	<circle cx="11" cy="13" r="1.5"></circle>
</g>
</svg>
<!--
	  icon: client (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="client" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="19,5 17,6 21,12 17,12 4,12 4,15 17,15 17,16 1,16 1,19 17,19 17,20 4,20 4,23 17,23 17,24 7,24 7,27 17,27 23,27 
		31,25 31,12 	"></polygon>
</g>
</svg>
<!--
	  icon: clock-time (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="clock-time" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2C8.268,2,2,8.268,2,16s6.268,14,14,14c7.732,0,14-6.268,14-14S23.732,2,16,2z M16,28C9.383,28,4,22.617,4,16
		S9.383,4,16,4c6.617,0,12,5.383,12,12S22.617,28,16,28z"></path>
	<polygon points="22.646,8.646 16.353,14.939 12.707,11.293 11.293,12.707 14.939,16.354 13.646,17.646 14.353,18.354 15.646,17.06 
		17.293,18.707 18.707,17.293 17.06,15.646 23.353,9.354 	"></polygon>
</g>
</svg>
<!--
	  icon: close-cancel-error (from Action-based)
  -->
<svg version="1.1" id="close-cancel-error" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="20.293,10.293 16,14.586 11.707,10.293 10.293,11.707 14.586,16 10.293,20.293 11.707,21.707 16,17.414 
		20.293,21.707 21.707,20.293 17.414,16 21.707,11.707 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: cloud (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="cloud" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M26.446,12.604C26.003,8.287,22.416,5,18,5c-4.162,0-7.691,3.083-8.374,7.086C9.253,12.029,8.877,12,8.5,12
	C4.364,12,1,15.364,1,19.5S4.364,27,8.5,27h15c4.136,0,7.5-3.364,7.5-7.5C31,16.464,29.196,13.773,26.446,12.604z M23.5,25h-15
	C5.467,25,3,22.533,3,19.5S5.467,14,8.5,14c0.575,0,1.146,0.092,1.699,0.271l1.277,0.416l0.032-1.344C11.592,9.846,14.504,7,18,7
	c3.552,0,6.403,2.784,6.491,6.338l0.017,0.711l0.676,0.217C27.466,14.999,29,17.103,29,19.5C29,22.533,26.533,25,23.5,25z"></path>
</svg>
<!--
	  icon: code (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="code" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="8.586,8.586 1.171,16 8.586,23.414 11.414,20.586 6.829,16 11.414,11.414 	"></polygon>
	<polygon points="23.414,8.586 20.586,11.414 25.171,16 20.586,20.586 23.414,23.414 30.829,16 	"></polygon>
</g>
</svg>
<!--
	  icon: collaborate-group (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="collaborate-group" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M8,23c2.762,0,5-2.238,5-5s-2.238-5-5-5s-5,2.238-5,5S5.238,23,8,23z M8,15c1.654,0,3,1.346,3,3s-1.346,3-3,3s-3-1.346-3-3
		S6.346,15,8,15z"></path>
	<path d="M19,18c0,2.762,2.238,5,5,5s5-2.238,5-5s-2.238-5-5-5S19,15.238,19,18z M24,15c1.654,0,3,1.346,3,3s-1.346,3-3,3
		s-3-1.346-3-3S22.346,15,24,15z"></path>
	<path d="M21,7c0-2.762-2.238-5-5-5s-5,2.238-5,5s2.238,5,5,5S21,9.762,21,7z M16,10c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3
		S17.654,10,16,10z"></path>
	<path d="M12,25H4c-1.105,0-2,0.896-2,2v3h12v-3C14,25.896,13.104,25,12,25z"></path>
	<path d="M28,25h-8c-1.104,0-2,0.896-2,2v3h12v-3C30,25.896,29.104,25,28,25z"></path>
</g>
</svg>
<!--
	  icon: commandline-terminal (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="commandline-terminal" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="7.707,23.707 13.414,18 7.707,12.293 6.293,13.707 10.586,18 6.293,22.293 	"></polygon>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
</g>
</svg>
<!--
	  icon: compass (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="compass" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M16,6C10.478,6,6,10.479,6,16c0,5.523,4.478,10,10,10c5.523,0,10-4.477,10-10C26,10.479,21.523,6,16,6z M18,18l-8,4l4-8
				l8-4L18,18z"></path>
		</g>
	</g>
	<g>
		<g>
			<path d="M16,2C8.268,2,2,8.268,2,16s6.268,14,14,14s14-6.268,14-14S23.732,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
				s12,5.383,12,12S22.617,28,16,28z"></path>
		</g>
	</g>
	<g>
		<circle cx="16" cy="16" r="1"></circle>
	</g>
</g>
</svg>
<!--
	  icon: compressed (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="compressed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<path d="M3,3v22v4h26v-4V3H3z M5,5h22v18H5V5z"></path>
	</g>
	<g>
		<rect x="15" y="9" width="2" height="1"></rect>
	</g>
	<g>
		<rect x="15" y="7" width="2" height="1"></rect>
	</g>
	<g>
		<rect x="15" y="11" width="2" height="1"></rect>
	</g>
	<g>
		<rect x="15" y="13" width="2" height="1"></rect>
	</g>
	<g>
		<polygon points="15,15 14,19 14,21 18,21 18,19 17,15 		"></polygon>
	</g>
</g>
</svg>
<!--
	  icon: configure-manage (from Action-based)
  -->
<svg version="1.1" id="configure-manage" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M12.858,7C12.412,5.278,10.861,4,9,4S5.588,5.278,5.142,7H1v2h4.142C5.588,10.722,7.139,12,9,12s3.412-1.278,3.858-3H31V7
		H12.858z M9,9C8.448,9,8,8.552,8,8s0.448-1,1-1s1,0.448,1,1S9.552,9,9,9z"></path>
	<path d="M23,12c-1.861,0-3.412,1.278-3.858,3H1v2h18.142c0.446,1.722,1.997,3,3.858,3s3.412-1.278,3.858-3H31v-2h-4.142
		C26.412,13.278,24.861,12,23,12z M23,17c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S23.552,17,23,17z"></path>
	<path d="M9,20c-1.861,0-3.412,1.278-3.858,3H1v2h4.142C5.588,26.722,7.139,28,9,28s3.412-1.278,3.858-3H31v-2H12.858
		C12.412,21.278,10.861,20,9,20z M9,25c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S9.552,25,9,25z"></path>
</g>
</svg>
<!--
	  icon: copy (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="copy" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M21,7V1H5v24h6v6h16V7H21z M11,23H7V3h12v4h-8V23z M25,29H13V9h12V29z"></path>
	<rect x="15" y="13" width="8" height="1"></rect>
	<rect x="15" y="15" width="8" height="1"></rect>
	<rect x="15" y="17" width="8" height="1"></rect>
	<rect x="15" y="19" width="4" height="1"></rect>
</g>
</svg>
<!--
	  icon: create-new (from Action-based)
  -->
<svg version="1.1" id="create-new" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="15,24 17,24 17,19 22,19 22,17 17,17 17,12 15,12 15,17 10,17 10,19 15,19 	"></polygon>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
</g>
</svg>
<!--
	  icon: cut (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="cut" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M27,13H17V8.858C18.722,8.412,20,6.861,20,5c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.861,1.278,3.412,3,3.858V13
	c-1.106,0-2,0.895-2,2H8.858C8.412,13.278,6.861,12,5,12c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.861,0,3.412-1.278,3.858-3H13v10l4,4
	V17h14L27,13z M5,18c-1.103,0-2-0.896-2-2s0.897-2,2-2s2,0.896,2,2S6.103,18,5,18z M15,16c-0.553,0-1-0.448-1-1s0.447-1,1-1
	c0.552,0,1,0.448,1,1S15.552,16,15,16z M16,7c-1.104,0-2-0.896-2-2s0.896-2,2-2s2,0.895,2,2S17.104,7,16,7z"></path>
</svg>
<!--
	  icon: dashboard (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="dashboard" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M12.465,21.535C11.521,20.591,11,19.335,11,18c0-2.757,2.243-5,5-5s5,2.243,5,5c0,1.335-0.521,2.591-1.465,3.535
		l1.414,1.414C22.271,21.627,23,19.87,23,18c0-3.86-3.141-7-7-7s-7,3.14-7,7c0,1.87,0.729,3.627,2.051,4.949L12.465,21.535z"></path>
	<polygon points="15,25 17,25 16,16 	"></polygon>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
</g>
</svg>
<!--
	  icon: data (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="data" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="1" y="9" width="2" height="14"></rect>
	<path d="M14.061,11.354c-0.365-0.685-0.875-1.25-1.529-1.692C11.877,9.221,11.033,9,10.001,9C8.967,9,8.123,9.221,7.47,9.663
		c-0.655,0.442-1.165,1.007-1.529,1.692c-0.365,0.687-0.613,1.44-0.744,2.26C5.065,14.436,5,15.231,5,16s0.065,1.564,0.196,2.384
		c0.131,0.821,0.379,1.574,0.744,2.26c0.364,0.687,0.874,1.25,1.529,1.692C8.123,22.779,8.967,23,10.001,23
		c1.032,0,1.876-0.221,2.53-0.664c0.654-0.442,1.164-1.006,1.529-1.692c0.364-0.685,0.612-1.439,0.743-2.26
		C14.936,17.564,15,16.769,15,16s-0.064-1.564-0.196-2.385C14.673,12.795,14.425,12.042,14.061,11.354z M12.521,18
		c-0.083,0.627-0.225,1.176-0.424,1.644c-0.199,0.468-0.471,0.84-0.816,1.115c-0.344,0.276-0.771,0.413-1.279,0.413
		c-0.524,0-0.956-0.138-1.292-0.413c-0.338-0.275-0.607-0.647-0.807-1.115c-0.2-0.468-0.341-1.017-0.423-1.644
		c-0.083-0.628-0.124-1.295-0.124-2c0-0.705,0.041-1.369,0.124-1.991c0.082-0.622,0.223-1.17,0.423-1.645
		c0.199-0.474,0.469-0.849,0.807-1.125c0.336-0.276,0.768-0.413,1.292-0.413c0.509,0,0.935,0.138,1.279,0.413
		c0.346,0.275,0.617,0.651,0.816,1.125c0.199,0.475,0.341,1.023,0.424,1.645c0.083,0.622,0.124,1.286,0.124,1.991
		C12.644,16.705,12.604,17.372,12.521,18z"></path>
	<path d="M30.804,13.615c-0.131-0.82-0.379-1.573-0.743-2.26c-0.365-0.685-0.875-1.25-1.529-1.692C27.877,9.221,27.033,9,26.001,9
		c-1.034,0-1.878,0.221-2.531,0.663c-0.655,0.442-1.165,1.007-1.529,1.692c-0.365,0.687-0.613,1.44-0.744,2.26
		C21.065,14.436,21,15.231,21,16s0.065,1.564,0.196,2.384c0.131,0.821,0.379,1.574,0.744,2.26c0.364,0.687,0.874,1.25,1.529,1.692
		C24.123,22.779,24.967,23,26.001,23c1.032,0,1.876-0.221,2.53-0.664c0.654-0.442,1.164-1.006,1.529-1.692
		c0.364-0.685,0.612-1.439,0.743-2.26C30.935,17.564,31,16.769,31,16S30.935,14.436,30.804,13.615z M28.521,18
		c-0.083,0.627-0.225,1.176-0.424,1.644c-0.199,0.468-0.471,0.84-0.816,1.115c-0.344,0.276-0.771,0.413-1.279,0.413
		c-0.524,0-0.956-0.138-1.292-0.413c-0.338-0.275-0.607-0.647-0.807-1.115c-0.2-0.468-0.341-1.017-0.423-1.644
		c-0.083-0.628-0.124-1.295-0.124-2c0-0.705,0.041-1.369,0.124-1.991c0.082-0.622,0.223-1.17,0.423-1.645
		c0.199-0.474,0.469-0.849,0.807-1.125c0.336-0.276,0.768-0.413,1.292-0.413c0.509,0,0.936,0.138,1.279,0.413
		c0.346,0.275,0.617,0.651,0.816,1.125c0.199,0.475,0.341,1.023,0.424,1.645c0.083,0.622,0.124,1.286,0.124,1.991
		C28.645,16.705,28.604,17.372,28.521,18z"></path>
	<rect x="17" y="9" width="2" height="14"></rect>
</g>
</svg>
<!--
	  icon: database-server (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="database-server" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M3,3v8v2v6v2v8h26v-8v-2v-6v-2V3H3z M27,27H5v-6h22V27z M27,19H5v-6h22V19z M24,7c0.552,0,1,0.448,1,1s-0.448,1-1,1
		s-1-0.448-1-1S23.448,7,24,7z"></path>
	<circle cx="24" cy="16" r="1"></circle>
	<circle cx="24" cy="24" r="1"></circle>
</g>
</svg>
<!--
	  icon: debug (from Action-based)
  -->
<svg version="1.1" id="debug" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M31,15h-2.051C28.462,8.621,23.379,3.538,17,3.051V1h-2v2.051C8.621,3.538,3.538,8.621,3.051,15H1v2h2.051
	C3.538,23.379,8.621,28.462,15,28.949V31h2v-2.051c6.379-0.487,11.462-5.57,11.949-11.949H31V15z M26.949,15h-3.018
	C23.479,11.384,20.617,8.521,17,8.069V5.051C22.268,5.528,26.472,9.732,26.949,15z M22.92,17c-0.44,3.059-2.861,5.479-5.92,5.92V19
	h-2v3.92c-3.059-0.44-5.479-2.861-5.92-5.92H13v-2H9.08c0.44-3.059,2.861-5.479,5.92-5.92V13h2V9.08
	c3.059,0.44,5.479,2.861,5.92,5.92H19v2H22.92z M15,5.051v3.018C11.383,8.521,8.521,11.384,8.069,15H5.051
	C5.528,9.732,9.732,5.528,15,5.051z M5.051,17h3.018c0.452,3.616,3.314,6.479,6.931,6.931v3.018C9.732,26.472,5.528,22.268,5.051,17
	z M17,26.949v-3.018c3.617-0.452,6.479-3.315,6.931-6.931h3.018C26.472,22.268,22.268,26.472,17,26.949z"></path>
</svg>
<!--
	  icon: deploy (from Action-based)
  -->
<svg version="1.1" id="deploy" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<path d="M30.707,8.293L24,1.586l-6.707,6.707l1.414,1.414L23,5.414V19c0,5.514-4.486,10-10,10S3,24.514,3,19
			c0-2.671,1.04-5.182,2.929-7.071l-1.414-1.414C2.248,12.782,1,15.795,1,19c0,6.617,5.383,12,12,12s12-5.383,12-12V5.414
			l4.293,4.293L30.707,8.293z"></path>
	</g>
	<g>
		<circle cx="13" cy="19" r="3"></circle>
	</g>
</g>
</svg>
<!--
	  icon: details (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="details" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M26,23v-1V1H6v30h11h1L26,23z M24,22h-7v7H8V3h16V22z"></path>
	<rect x="10" y="13" width="12" height="1"></rect>
	<rect x="10" y="11" width="12" height="1"></rect>
	<rect x="10" y="9" width="12" height="1"></rect>
	<rect x="10" y="15" width="12" height="1"></rect>
	<rect x="10" y="17" width="6" height="1"></rect>
</g>
</svg>
<!--
	  icon: document (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="document" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M18,1h-1H6v30h20V10V9L18,1z M24,29H8V3h9v7h7V29z"></path>
	<rect x="10" y="13" width="12" height="1"></rect>
	<rect x="10" y="15" width="12" height="1"></rect>
	<rect x="10" y="17" width="6" height="1"></rect>
</g>
</svg>
<!--
	  icon: down (from Action-based)
  -->
<svg version="1.1" id="down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="15" y="9" width="2" height="14"></rect>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: download-import (from Action-based)
  -->
<svg version="1.1" id="download-import" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="24.708,13.707 23.294,12.292 17,18.587 17,2 15,2 15,18.585 8.708,12.292 7.294,13.707 16.001,22.414 	"></polygon>
	<polygon points="29,19 29,27 3,27 3,19 1,19 1,27 1,31 3,31 29,31 31,31 31,27 31,19 	"></polygon>
</g>
</svg>
<!--
	  icon: edit (from Action-based)
  -->
<svg version="1.1" id="edit" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="24.379" y="1.257" transform="matrix(0.7071 -0.7071 0.7071 0.7071 3.8726 20.3492)" width="4.243" height="8.485"></rect>
	<path d="M5,21l6,6l15-15l-6-6L5,21z M11,24.171L7.828,21L20,8.829L23.172,12L11,24.171z"></path>
	<polygon points="1,31 6,29 3,26 	"></polygon>
</g>
</svg>
<!--
	  icon: email (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="email" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M16,4L1,12v1v15h30V13v-1L16,4z M7,11h18v4.2L16,20l-9-4.8V11z M29,26H3V14.066L16,21l13-6.934V26z"></path>
</svg>
<!--
	  icon: equipment (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="equipment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M30.131,9.806c-1.252-2.948-4.152-4.683-7.17-4.6L21.178,1l-4.983,2.115l1.768,4.167c-2.218,2.11-3.023,5.451-1.758,8.435
		l3.838-1.629c0.58,1.245,1.82,2.047,3.201,2.047c0.477,0,0.939-0.095,1.379-0.282c1.756-0.745,2.588-2.751,1.91-4.52L30.131,9.806z
		 M24.246,14.962c-0.328,0.139-0.668,0.205-1.002,0.205c-0.961,0-1.871-0.546-2.309-1.458l4.707-1.998
		C26.113,12.989,25.514,14.425,24.246,14.962z"></path>
	<path d="M18.516,28.855c0-1.852-1.502-3.355-3.358-3.355c-0.15,0-0.293,0.025-0.438,0.045l-8.451-8.451
		c0.057-0.197,0.097-0.401,0.097-0.617c0-0.277-0.057-0.54-0.148-0.786L13.25,8.66c0.25,0.096,0.52,0.155,0.804,0.155
		c1.244,0,2.253-1.007,2.253-2.249c0-1.243-1.009-2.25-2.253-2.25c-1.239,0-2.248,1.007-2.248,2.25c0,0.24,0.048,0.467,0.117,0.684
		l-7.101,7.101c-0.224-0.074-0.457-0.124-0.704-0.124c-1.244,0-2.249,1.007-2.249,2.25c0,1.242,1.005,2.25,2.249,2.25
		c0.309,0,0.603-0.063,0.871-0.176l7.872,7.873c-0.647,0.611-1.056,1.473-1.056,2.432c0,0.072,0.013,0.139,0.018,0.209H8.619V31
		h13.194v-1.936h-3.314C18.504,28.994,18.516,28.928,18.516,28.855z"></path>
</g>
</svg>
<!--
	  icon: event-announcement (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="event-announcement" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M4,13.714V13H3v-1H1v8h2v-1h1v-0.714l2,0.571V22c0,1.104,0.896,2,2,2h4c1.104,0,2-0.896,2-2v-0.857L31,26V6L4,13.714z
	 M12,22H8v-2.571l4,1.143V22z M29,23.349L5,16.491v-0.982l24-6.857V23.349z"></path>
</svg>
<!--
	  icon: file (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="file" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M18,1h-1H6v30h20V10V9L18,1z M24,29H8V3h9v7h7V29z"></path>
</svg>
<!--
	  icon: fileextension (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="fileextension" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M13.964,21.424c-0.155-0.203-0.35-0.365-0.584-0.488c-0.235-0.122-0.515-0.183-0.84-0.183
		c-0.256,0-0.491,0.051-0.704,0.152c-0.213,0.102-0.39,0.264-0.528,0.488h-0.016v-0.529h-1.08v5.585h1.136v-1.96h0.016
		c0.139,0.203,0.316,0.355,0.532,0.46c0.216,0.104,0.452,0.155,0.708,0.155c0.304,0,0.569-0.059,0.796-0.176
		c0.227-0.117,0.416-0.274,0.568-0.472c0.152-0.197,0.265-0.424,0.34-0.681c0.075-0.256,0.112-0.521,0.112-0.799
		c0-0.294-0.038-0.575-0.112-0.845C14.233,21.863,14.119,21.627,13.964,21.424z M13.236,23.432c-0.032,0.16-0.087,0.301-0.164,0.42
		c-0.077,0.121-0.179,0.218-0.304,0.293c-0.125,0.074-0.281,0.111-0.468,0.111c-0.181,0-0.336-0.037-0.464-0.111
		c-0.128-0.075-0.231-0.172-0.308-0.293c-0.078-0.119-0.133-0.26-0.168-0.42c-0.035-0.16-0.052-0.322-0.052-0.488
		c0-0.17,0.016-0.336,0.048-0.495c0.032-0.16,0.087-0.302,0.164-0.425c0.077-0.122,0.178-0.223,0.304-0.299
		c0.125-0.078,0.281-0.117,0.468-0.117c0.181,0,0.335,0.039,0.46,0.117c0.125,0.076,0.228,0.178,0.308,0.303
		c0.08,0.126,0.138,0.269,0.172,0.429c0.035,0.16,0.052,0.323,0.052,0.487C13.284,23.109,13.268,23.271,13.236,23.432z"></path>
	<path d="M15.956,20.932c-0.23,0.12-0.42,0.279-0.572,0.477c-0.152,0.197-0.267,0.426-0.344,0.684
		c-0.078,0.259-0.116,0.527-0.116,0.805c0,0.287,0.039,0.564,0.116,0.832c0.077,0.266,0.192,0.502,0.344,0.707
		c0.152,0.206,0.345,0.369,0.58,0.488c0.235,0.12,0.507,0.18,0.816,0.18c0.272,0,0.516-0.049,0.732-0.147
		c0.216-0.099,0.391-0.261,0.524-0.483h0.016V25h1.08v-5.712h-1.136v2.08H17.98c-0.128-0.202-0.303-0.357-0.524-0.46
		c-0.222-0.103-0.455-0.156-0.7-0.156C16.452,20.752,16.185,20.812,15.956,20.932z M17.524,21.721
		c0.123,0.074,0.223,0.172,0.3,0.291c0.078,0.12,0.132,0.259,0.164,0.416c0.032,0.158,0.048,0.322,0.048,0.492
		c0,0.171-0.016,0.336-0.048,0.496c-0.032,0.16-0.085,0.303-0.16,0.428c-0.075,0.125-0.175,0.226-0.3,0.301
		c-0.125,0.074-0.281,0.111-0.468,0.111c-0.176,0-0.327-0.039-0.452-0.115c-0.125-0.078-0.229-0.18-0.312-0.305
		c-0.082-0.125-0.143-0.267-0.18-0.428c-0.038-0.16-0.056-0.32-0.056-0.48c0-0.17,0.017-0.334,0.052-0.492
		c0.035-0.156,0.091-0.297,0.168-0.42c0.078-0.122,0.18-0.221,0.308-0.295c0.128-0.075,0.285-0.113,0.472-0.113
		C17.247,21.607,17.401,21.646,17.524,21.721z"></path>
	<path d="M20.236,25h1.136v-3.376h0.784v-0.761h-0.784v-0.247c0-0.171,0.033-0.292,0.1-0.364c0.066-0.072,0.177-0.108,0.332-0.108
		c0.144,0,0.283,0.008,0.416,0.023V19.32c-0.096-0.006-0.195-0.012-0.296-0.02c-0.101-0.008-0.203-0.012-0.304-0.012
		c-0.464,0-0.81,0.117-1.04,0.353c-0.229,0.234-0.344,0.535-0.344,0.903v0.319h-0.68v0.761h0.68V25z"></path>
	<path d="M18,1h-1H6v30h20V10V9L18,1z M24,29H8V3h9v7h7V29z"></path>
</g>
</svg>
<!--
	  icon: filter (from Action-based)
  -->
<svg version="1.1" id="filter" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M31,1H1v4l12,12v14l6-6v-3.379C19.733,22.459,20.798,23,22,23c2.21,0,4-1.79,4-4s-1.79-4-4-4
	c-0.423,0-0.822,0.083-1.205,0.205L31,5V1z M24,19c0,1.103-0.898,2-2,2c-1.103,0-2-0.897-2-2s0.897-2,2-2C23.102,17,24,17.897,24,19
	z M17.586,15.586L17,16.171V17v7.171l-2,2V17v-0.829l-0.586-0.585L3.829,5h24.343L17.586,15.586z"></path>
</svg>
<!--
	  icon: floorplan (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="floorplan" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<polygon points="3,3 3,29 10.346,29 10.346,27 5,27 5,17 9.951,17 9.951,15 5,15 5,5 27,5 27,15 19.947,15 19.947,11.591 
	17.947,11.591 17.947,20.409 19.947,20.409 19.947,17 27,17 27,27 17.897,27 17.897,29 29,29 29,3 "></polygon>
</svg>
<!--
	  icon: flow (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="flow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M24,19c-2.419,0-4.435,1.718-4.899,4h-6.201c-0.13-0.638-0.384-1.23-0.731-1.754l9.078-9.077
				C22.036,12.692,22.981,13,24,13c2.762,0,5-2.238,5-5s-2.238-5-5-5c-2.419,0-4.435,1.718-4.899,4h-6.201
				C12.436,4.718,10.419,3,8,3C5.238,3,3,5.238,3,8s2.238,5,5,5c2.419,0,4.436-1.718,4.899-4h6.201
				c0.13,0.638,0.384,1.23,0.731,1.754l-9.078,9.077C9.964,19.308,9.019,19,8,19c-2.762,0-5,2.238-5,5s2.238,5,5,5
				c2.419,0,4.436-1.718,4.899-4h6.201c0.464,2.282,2.481,4,4.899,4c2.762,0,5-2.238,5-5S26.762,19,24,19z M24,5
				c1.657,0,3,1.343,3,3s-1.343,3-3,3s-3-1.343-3-3S22.343,5,24,5z M8,11c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3
				S9.657,11,8,11z M8,27c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S9.657,27,8,27z"></path>
		</g>
	</g>
</g>
</svg>
<!--
	  icon: folder (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="folder" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M13,8V5H1v3v3v16h30V11V8H13z M29,25H3V11h26V25z"></path>
</svg>
<!--
	  icon: forum (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="forum" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<path d="M27.484,4.515C25.313,2.343,22.313,1,19,1s-6.314,1.343-8.484,3.515C8.344,6.687,7,9.686,7,13
			c0,1.045,0.148,2.054,0.398,3.02C7.267,16.011,7.135,16,7,16c-1.656,0-3.156,0.672-4.242,1.758C1.672,18.843,1,20.343,1,22
			c0,1.754,0.672,3.343,1.758,4.492L7,31v-3c1.656,0,3.156-0.672,4.242-1.758c0.795-0.794,1.363-1.812,1.614-2.948
			C14.654,24.37,16.752,25,19,25v6l8.484-9.016C29.656,19.685,31,16.508,31,13C31,9.686,29.656,6.687,27.484,4.515z M26.027,20.613
			L21,25.956V25v-2h-2c-2.24,0-4.361-0.74-6.104-2.09c-0.225-1.219-0.812-2.311-1.654-3.152c-0.451-0.451-0.977-0.825-1.552-1.115
			C9.242,15.497,9,14.268,9,13c0-2.671,1.041-5.182,2.93-7.071S16.329,3,19,3s5.182,1.04,7.07,2.93C27.959,7.818,29,10.329,29,13
			C29,15.881,27.945,18.583,26.027,20.613z"></path>
	</g>
	<g>
		<circle cx="19" cy="13" r="1.5"></circle>
	</g>
	<g>
		<circle cx="24" cy="13" r="1.5"></circle>
	</g>
	<g>
		<circle cx="14" cy="13" r="1.5"></circle>
	</g>
</g>
</svg>
<!--
	  icon: forward (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="iso-8859-1"?-->
<svg version="1.1" id="forward" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
	<polygon points="15.293,10.707 19.586,15 8,15 8,17 19.586,17 15.293,21.293 16.707,22.707 23.414,16 16.707,9.293 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14c7.731,0,14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16
		S9.383,4,16,4c6.617,0,12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: gauge (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="gauge" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2C8.268,2,2,8.268,2,16s6.268,14,14,14s14-6.268,14-14S23.732,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
	<polygon points="15,17 17,19 23,9 13,15 	"></polygon>
</g>
</svg>
<!--
	  icon: glasses (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="glasses" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M31,15h-1.09c-0.478-2.836-2.941-5-5.91-5c-1.176,0-2.27,0.344-3.196,0.93l-0.136-0.136C19.378,9.637,17.721,9,16,9
	s-3.378,0.637-4.707,1.831l-0.098,0.098C10.269,10.344,9.176,10,8,10c-2.97,0-5.433,2.164-5.91,5H1v2h1.09
	C2.567,19.836,5.03,22,8,22c3.311,0,6-2.687,6-6c0-1.413-0.492-2.709-1.31-3.734C13.609,11.451,14.783,11,16,11
	c1.227,0,2.41,0.455,3.293,1.245l0.019,0.019C18.492,13.289,18,14.586,18,16c0,3.313,2.69,6,6,6c2.97,0,5.433-2.164,5.91-5H31V15z
	 M8,20c-2.205,0-4-1.795-4-4s1.795-4,4-4s4,1.795,4,4S10.205,20,8,20z M24,20c-2.205,0-4-1.795-4-4s1.795-4,4-4s4,1.795,4,4
	S26.205,20,24,20z"></path>
</svg>
<!--
	  icon: hat (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="hat" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M28,23v-6v-1c0-6.627-5.375-12-12-12S4,9.373,4,16v1v6H1c0,2.766,2.241,5,4.995,5h20.01C28.759,28,31,25.766,31,23H28z
	 M6,23v-6h20v6H6z"></path>
</svg>
<!--
	  icon: headphones (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="headphones" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M27,17v4h2v-4h-1v-1.5c0-6.617-5.383-12-12-12c-6.617,0-12,5.383-12,12V17H3v4h2v-4v-1.5c0-6.065,4.935-11,11-11
		c6.065,0,11,4.935,11,11V17z"></path>
	<rect x="1" y="22" width="4" height="9"></rect>
	<rect x="27" y="22" width="4" height="9"></rect>
</g>
</svg>
<!--
	  icon: help (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="help" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M23,16c0,0.893-0.174,1.743-0.479,2.528
	c-0.711,1.829-2.164,3.281-3.992,3.992C17.744,22.826,16.893,23,16,23c-0.893,0-1.744-0.174-2.529-0.479
	c-1.828-0.711-3.281-2.164-3.992-3.992C9.174,17.743,9,16.893,9,16c0-0.893,0.174-1.743,0.479-2.527
	c0.711-1.829,2.165-3.283,3.992-3.994C14.257,9.174,15.107,9,16,9c0.893,0,1.743,0.174,2.529,0.479
	c1.827,0.71,3.281,2.165,3.992,3.994C22.826,14.257,23,15.107,23,16z M19.286,8.714C18.282,8.259,17.172,8,16,8
	s-2.282,0.259-3.286,0.714L9.766,5.766C11.586,4.653,13.715,4,16,4s4.414,0.653,6.234,1.766L19.286,8.714z M8.714,19.286
	l-2.948,2.948C4.653,20.415,4,18.285,4,16s0.653-4.415,1.766-6.234l2.948,2.948C8.26,13.718,8,14.828,8,16S8.26,18.282,8.714,19.286
	z M12.714,23.286C13.718,23.741,14.828,24,16,24s2.282-0.259,3.286-0.714l2.948,2.948C20.414,27.347,18.285,28,16,28
	s-4.414-0.653-6.234-1.766L12.714,23.286z M23.286,12.714l2.948-2.948C27.347,11.585,28,13.715,28,16s-0.653,4.415-1.766,6.234
	l-2.948-2.948C23.74,18.282,24,17.172,24,16S23.74,13.718,23.286,12.714z"></path>
</svg>
<!--
	  icon: home (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="home" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,1L2,15l3,3v13h22V18l3-3L16,1z M25,29H7V16l9-9l9,9V29z"></path>
</g>
</svg>
<!--
	  icon: idea (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="idea" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,1C9.924,1,5,5.924,5,12s4.924,11,11,11s11-4.924,11-11S22.076,1,16,1z M16,21c-4.963,0-9-4.038-9-9s4.037-9,9-9
		s9,4.038,9,9S20.963,21,16,21z"></path>
	<rect x="12" y="24" width="8" height="4"></rect>
	<path d="M16,31c1.104,0,2-0.896,2-2h-4C14,30.104,14.896,31,16,31z"></path>
	<path d="M16,19l4-6h-8L16,19z M16,17.197L13.868,14h4.264L16,17.197z"></path>
</g>
</svg>
<!--
	  icon: indent (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="indent" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="2.293,11.707 6.586,16 2.293,20.293 3.707,21.707 9.414,16 3.707,10.293 	"></polygon>
	<rect x="11" y="6" width="2" height="20"></rect>
	<rect x="15" y="9" width="12" height="2"></rect>
	<rect x="15" y="13" width="8" height="2"></rect>
	<rect x="15" y="17" width="16" height="2"></rect>
	<rect x="15" y="21" width="8" height="2"></rect>
</g>
</svg>
<!--
	  icon: industry-factory (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="industry-factory" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M29,1h-4l-1,15h-7v-4l-8,4v-4l-8,4v15h22h5h3L29,1z M3,29V18h20.867l-0.734,11H3z"></path>
</g>
</svg>
<!--
	  icon: info-moreinfo (from Action-based)
  -->
<svg version="1.1" id="info-moreinfo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="18,14 12,14 12,16 14,16 14,22 12,22 12,24 20,24 20,22 18,22 	"></polygon>
	<circle cx="16" cy="10" r="2"></circle>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: insert (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="insert" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M29.293,22.293L25,26.586V13c0-6.617-5.383-12-12-12S1,6.383,1,13h2C3,7.486,7.486,3,13,3s10,4.486,10,10v13.586
	l-4.293-4.293l-1.414,1.414L24,30.414l6.707-6.707L29.293,22.293z"></path>
</svg>
<!--
	  icon: inventory (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="inventory" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M24,15V3H8v12H3v14h26V15H24z M10,5h12v10H10V5z M27,27H5V17h3h16h3V27z"></path>
	<rect x="12" y="9" width="8" height="1"></rect>
	<rect x="12" y="11" width="8" height="1"></rect>
	<polygon points="19,22 13,22 13,21 12,21 12,22 12,23 13,23 19,23 20,23 20,22 20,21 19,21 	"></polygon>
</g>
</svg>
<!--
	  icon: italic (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="italic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<polygon points="25,5 25,3 13,3 13,5 16.923,5 10.577,27 7,27 7,29 19,29 19,27 14.577,27 20.923,5 "></polygon>
</svg>
<!--
	  icon: justify (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="justify" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="5" y="24" width="22" height="2"></rect>
	<rect x="5" y="18" width="22" height="2"></rect>
	<rect x="5" y="12" width="22" height="2"></rect>
	<rect x="5" y="6" width="22" height="2"></rect>
</g>
</svg>
<!--
	  icon: like-heart (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="like-heart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M22,4c-2.551,0-4.776,1.369-6,3.408C14.776,5.369,12.551,4,10,4c-3.866,0-7,3.134-7,7c0,1.933,0.761,3.706,2,5
	c2.815,2.94,11,12,11,12s8.185-9.06,11-12c1.239-1.294,2-3.067,2-5C29,7.134,25.866,4,22,4z M25.556,14.617
	C23.457,16.808,18.499,22.262,16,25.02c-2.499-2.757-7.457-8.211-9.556-10.403C5.513,13.644,5,12.36,5,11c0-2.757,2.243-5,5-5
	c1.768,0,3.369,0.911,4.285,2.437L16,11.294l1.715-2.857C18.631,6.911,20.232,6,22,6c2.757,0,5,2.243,5,5
	C27,12.36,26.487,13.644,25.556,14.617z"></path>
</svg>
<!--
	  icon: link-externallink (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="link-externallink" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M28.95,3.05C27.683,1.784,25.933,1,24,1s-3.683,0.784-4.95,2.05l-3,3C14.784,7.317,14,9.067,14,11
	c0,1.206,0.286,2.359,0.808,3.364l-0.443,0.443C13.359,14.286,12.206,14,11,14c-1.933,0-3.683,0.784-4.95,2.05l-3,3
	C1.784,20.317,1,22.067,1,24s0.784,3.683,2.05,4.95S6.067,31,8,31s3.683-0.784,4.95-2.05l3-3C17.216,24.683,18,22.933,18,21
	c0-1.206-0.286-2.359-0.808-3.364l0.443-0.443C18.641,17.714,19.794,18,21,18c1.933,0,3.683-0.784,4.95-2.05l3-3
	C30.216,11.683,31,9.933,31,8S30.216,4.317,28.95,3.05z M16,21c0,1.335-0.52,2.591-1.464,3.536l-3,3C10.591,28.48,9.335,29,8,29
	s-2.591-0.52-3.536-1.464C3.52,26.591,3,25.335,3,24s0.52-2.591,1.464-3.536l3-3C8.409,16.52,9.665,16,11,16
	c0.642,0,1.264,0.122,1.84,0.332l-4.254,4.254l2.828,2.828l4.254-4.254C15.878,19.736,16,20.358,16,21z M27.536,11.536l-3,3
	C23.591,15.48,22.335,16,21,16c-0.642,0-1.264-0.122-1.84-0.332l4.254-4.254l-2.828-2.828l-4.254,4.254
	C16.122,12.264,16,11.642,16,11c0-1.335,0.52-2.591,1.464-3.536l3-3C21.409,3.52,22.665,3,24,3s2.591,0.52,3.536,1.464
	C28.48,5.409,29,6.665,29,8S28.48,10.591,27.536,11.536z"></path>
</svg>
<!--
	  icon: list-view (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="list-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M1,4v4v20h30V8V4H1z M29,26H3v-4h26V26z M29,20H3v-4h26V20z M29,14H3v-4h26V14z"></path>
</svg>
<!--
	  icon: location (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="location" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M24.484,4.515C22.313,2.343,19.313,1,16,1c-3.314,0-6.314,1.343-8.484,3.515C5.344,6.687,4,9.686,4,13
		c0,3.508,1.344,6.685,3.516,8.984L16,31l8.484-9.016C26.656,19.685,28,16.508,28,13C28,9.686,26.656,6.687,24.484,4.515z
		 M23.028,20.613L16,28.081L8.969,20.61C7.055,18.583,6,15.881,6,13c0-2.671,1.04-5.182,2.93-7.071C10.818,4.04,13.329,3,16,3
		c2.671,0,5.182,1.04,7.07,2.93C24.959,7.818,26,10.329,26,13C26,15.881,24.945,18.583,23.028,20.613z"></path>
	<circle cx="16" cy="13" r="4"></circle>
</g>
</svg>
<!--
	  icon: location-map (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="location-map" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M24.484,4.515C22.313,2.343,19.313,1,16,1c-3.314,0-6.314,1.343-8.484,3.515C5.344,6.687,4,9.686,4,13
		c0,3.508,1.344,6.685,3.516,8.984L16,31l8.484-9.016C26.656,19.685,28,16.508,28,13C28,9.686,26.656,6.687,24.484,4.515z
		 M23.028,20.613L16,28.081L8.969,20.61C7.055,18.583,6,15.881,6,13c0-2.671,1.04-5.182,2.93-7.071C10.818,4.04,13.329,3,16,3
		c2.671,0,5.182,1.04,7.07,2.93C24.959,7.818,26,10.329,26,13C26,15.881,24.945,18.583,23.028,20.613z"></path>
	<circle cx="16" cy="13" r="4"></circle>
</g>
</svg>
<!--
	  icon: lock-secure (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="lock-secure" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="14.5,21.586 12.207,19.293 10.793,20.707 14.5,24.414 21.207,17.707 19.793,16.293 	"></polygon>
	<path d="M24,12.466V9c0-4.418-3.581-8-8-8S8,4.582,8,9v3.467C6.145,14.436,5,17.082,5,20c0,6.074,4.926,11,11,11
		c6.076,0,11-4.926,11-11C27,17.081,25.855,14.436,24,12.466z M10,9c0-3.309,2.691-6,6-6s6,2.691,6,6v1.788
		C20.273,9.661,18.215,9,16,9c-2.215,0-4.273,0.661-6,1.788V9z M16,29c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9
		S20.971,29,16,29z"></path>
</g>
</svg>
<!--
	  icon: log (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="log" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="6" y="29" width="20" height="2"></rect>
	<path d="M6,1v4v22h20V5V1H6z M24,25H8V7h16V25z"></path>
	<rect x="10" y="15" width="12" height="1"></rect>
	<rect x="10" y="11" width="12" height="1"></rect>
	<rect x="10" y="19" width="12" height="1"></rect>
</g>
</svg>
<!--
	  icon: maximize (from Action-based)
  -->
<svg version="1.1" id="maximize" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
	<polygon points="18.707,21.707 25,15.414 25,20 27,20 27,12 19,12 19,14 23.586,14 17.293,20.293 	"></polygon>
</g>
</svg>
<!--
	  icon: menuoverflow (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="menuoverflow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<circle cx="4" cy="16" r="3"></circle>
	<circle cx="16" cy="16" r="3"></circle>
	<circle cx="28" cy="16" r="3"></circle>
</g>
</svg>
<!--
	  icon: microphone-recording (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="microphone-recording" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,23c3.865,0,7-3.135,7-7v-2v-1v-2v-1V8c0-3.865-3.135-7-7-7S9,4.135,9,8v2v1v2v1v2C9,19.865,12.135,23,16,23z M13,14h-2
		v-1h2c0.553,0,1-0.447,1-1s-0.447-1-1-1h-2v-1h2c0.553,0,1-0.447,1-1s-0.447-1-1-1h-2c0-2.757,2.243-5,5-5s5,2.243,5,5h-2
		c-0.553,0-1,0.447-1,1s0.447,1,1,1h2v1h-2c-0.553,0-1,0.447-1,1s0.447,1,1,1h2v1h-2c-0.553,0-1,0.447-1,1s0.447,1,1,1h2
		c0,2.757-2.243,5-5,5s-5-2.243-5-5h2c0.553,0,1-0.447,1-1S13.553,14,13,14z"></path>
	<path d="M26,16h-2c0,4.411-3.589,8-8,8s-8-3.589-8-8H6c0,5.177,3.954,9.445,9,9.949V29h-3v2h3h2h3v-2h-3v-3.051
		C22.046,25.445,26,21.177,26,16z"></path>
</g>
</svg>
<!--
	  icon: migrate (from Action-based)
  -->
<svg version="1.1" id="migrate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M24.707,16.293l-1.414,1.414L26.586,21H21V10V9l-8-8h-1H1v30h20v-8h5.586l-3.293,3.293l1.414,1.414L30.414,22L24.707,16.293
	z M19,29H3V3h9v7h7v11h-7v2h7V29z"></path>
</svg>
<!--
	  icon: minimize (from Action-based)
  -->
<svg version="1.1" id="minimize" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M1,4v20v4h30v-4V4H1z M3,6h26v16H3V6z"></path>
	<polygon points="13.293,10.293 7,16.586 7,12 5,12 5,20 13,20 13,18 8.414,18 14.707,11.707 	"></polygon>
</g>
</svg>
<!--
	  icon: mobile (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="mobile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M7,1v4v22v4h18v-4V5V1H7z M23,7v18H9V7H23z M14,3h4v1h-4V3z"></path>
</svg>
<!--
	  icon: monitoring (from Action-based)
  -->
<svg version="1.1" id="monitoring" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
	</g>
	<g>
		<path d="M16,24c4.484,0,7.9-2.417,10-6c-2.1-3.583-5.516-6-10-6s-7.9,2.417-10,6C8.1,21.583,11.516,24,16,24z M16,13
			c3.627,0,6.74,1.77,8.826,5c-2.086,3.23-5.199,5-8.826,5s-6.74-1.77-8.826-5C9.26,14.77,12.373,13,16,13z"></path>
	</g>
	<g>
		<path d="M16,21.5c1.934,0,3.5-1.566,3.5-3.5s-1.566-3.5-3.5-3.5c-1.932,0-3.5,1.566-3.5,3.5S14.068,21.5,16,21.5z M16,16.833
			c0.646,0,1.166,0.522,1.166,1.167s-0.52,1.167-1.166,1.167S14.834,18.645,14.834,18S15.354,16.833,16,16.833z"></path>
	</g>
</g>
</svg>
<!--
	  icon: move (from Action-based)
  -->
<svg version="1.1" id="move" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="12,17 12,15 5.414,15 7.707,12.707 6.293,11.293 1.586,16 6.293,20.707 7.707,19.293 5.414,17 	"></polygon>
	<polygon points="25.707,11.293 24.293,12.707 26.586,15 20,15 20,17 26.586,17 24.293,19.293 25.707,20.707 30.414,16 	"></polygon>
	<polygon points="17,26.586 17,20 15,20 15,26.586 12.707,24.293 11.293,25.707 16,30.414 20.707,25.707 19.293,24.293 	"></polygon>
	<polygon points="15,5.414 15,12 17,12 17,5.414 19.293,7.707 20.707,6.293 16,1.586 11.293,6.293 12.707,7.707 	"></polygon>
</g>
</svg>
<!--
	  icon: move-cart (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="move-cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M13.35,13.22l3.245,7.673c1.407,0.051,2.69,0.6,3.677,1.482l7.664-3.242L23.602,8.885L13.35,13.22z M19.92,11.938
		l2.762-1.174l0.193,0.457l-2.76,1.176L19.92,11.938z M23.416,12.446l-2.777,1.184l-0.195-0.458l2.775-1.182L23.416,12.446z"></path>
	<path d="M21.295,23.571c0.359,0.555,0.629,1.171,0.783,1.834l8.746-3.698l-0.777-1.837L21.295,23.571z"></path>
	<path d="M13.199,21.833c0.284-0.184,0.582-0.354,0.902-0.488c0.302-0.129,0.614-0.219,0.931-0.294L7.542,3.334L1.97,0.918
		L1.176,2.747l4.84,2.1L13.199,21.833z"></path>
	<path d="M16.359,22.286c-2.399,0.043-4.315,2.027-4.273,4.426s2.026,4.314,4.425,4.273c2.397-0.042,4.315-2.027,4.273-4.426
		S18.757,22.245,16.359,22.286z M16.477,28.995c-1.302,0.023-2.38-1.017-2.403-2.318c-0.022-1.302,1.019-2.379,2.32-2.402
		s2.38,1.018,2.403,2.318C18.819,27.896,17.778,28.974,16.477,28.995z"></path>
</g>
</svg>
<!--
	  icon: music (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="music" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M11,5v4v1v12.023C10.162,21.39,9.131,21,8,21c-2.761,0-5,2.238-5,5s2.239,5,5,5s5-2.238,5-5V9.556l14-3.111v11.579
	C26.162,17.39,25.131,17,24,17c-2.761,0-5,2.238-5,5s2.239,5,5,5s5-2.238,5-5V6V5V1L11,5z M8,29c-1.654,0-3-1.346-3-3s1.346-3,3-3
	s3,1.346,3,3S9.654,29,8,29z M24,25c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S25.654,25,24,25z"></path>
</svg>
<!--
	  icon: musicfile (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="musicfile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M3,3v22v4h26v-4V3H3z M5,5h22v18H5V5z"></path>
	<path d="M13,9v2v5.779C12.469,16.3,11.771,16,11,16c-1.655,0-3,1.344-3,3c0,1.656,1.345,3,3,3s3-1.344,3-3v-8.182l9-1.637v5.598
		C22.469,14.3,21.771,14,21,14c-1.655,0-3,1.344-3,3c0,1.656,1.345,3,3,3s3-1.344,3-3V9V7V6L13,8V9z M11,21c-1.102,0-2-0.897-2-2
		s0.898-2,2-2s2,0.897,2,2S12.102,21,11,21z M21,19c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.898,2,2S22.103,19,21,19z"></path>
</g>
</svg>
<!--
	  icon: new-indicator (from TRIRIGA)
  -->
<svg version="1.1" id="new-indicator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2C8.27,2,2,8.269,2,16c0,7.729,6.27,14,14,14c7.73,0,14-6.271,14-14C30,8.269,23.73,2,16,2z M16,28
		C9.383,28,4,22.617,4,16S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"></path>
	<g>
		<path d="M8.525,14.971l0.701-1.854L15,15.174V9h1.956v6.174l5.769-2.058l0.752,1.854l-5.92,1.957l3.611,4.918L19.564,23
			L15.9,17.982L12.241,23l-1.605-1.154l3.659-4.918L8.525,14.971z"></path>
	</g>
</g>
</svg>
<!--
	  icon: next-right-forward (from Action-based)
  -->
<svg version="1.1" id="next-right-forward" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="15.293,10.707 19.586,15 8,15 8,17 19.586,17 15.293,21.293 16.707,22.707 23.414,16 16.707,9.293 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14c7.731,0,14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16
		S9.383,4,16,4c6.617,0,12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: not-ready (from TRIRIGA)
  -->
<svg version="1.1" id="not-ready" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon fill="#C7C7C7" points="14,18.586 10.707,15.293 9.293,16.707 14,21.414 22.707,12.707 21.293,11.293 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16c0,7.73,6.269,14,14,14c7.73,0,14-6.27,14-14C30,8.269,23.73,2,16,2z M16,28
		C9.383,28,4,22.617,4,16S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: numberlist (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="numberlist" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="8" y="6" width="23" height="2"></rect>
	<rect x="8" y="15" width="23" height="2"></rect>
	<rect x="8" y="24" width="23" height="2"></rect>
	<polygon points="3,4 2,4 1,4 1,5 2,5 2,9 1,9 1,10 2,10 3,10 4,10 4,9 3,9 	"></polygon>
	<polygon points="3,15 3,16 4,16 4,15 4,14 3,14 	"></polygon>
	<rect x="2" y="16" width="1" height="1"></rect>
	<polygon points="1,18 1,19 4,19 4,18 2,18 2,17 1,17 	"></polygon>
	<polygon points="2,13 1,13 1,14 2,14 3,14 3,13 	"></polygon>
	<rect x="3" y="23" width="1" height="1"></rect>
	<rect x="2" y="24" width="1" height="1"></rect>
	<polygon points="3,27 4,27 4,26 4,25 3,25 3,26 	"></polygon>
	<polygon points="1,27 1,28 2,28 3,28 3,27 2,27 	"></polygon>
	<polygon points="2,22 1,22 1,23 2,23 3,23 3,22 	"></polygon>
</g>
</svg>
<!--
	  icon: outdent (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="outdent" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="7.292,10.292 1.585,16 7.292,21.706 8.706,20.292 4.414,16 8.706,11.707 	"></polygon>
	<rect x="11" y="6" width="2" height="20"></rect>
	<rect x="15" y="9" width="12" height="2"></rect>
	<rect x="15" y="13" width="8" height="2"></rect>
	<rect x="15" y="17" width="16" height="2"></rect>
	<rect x="15" y="21" width="8" height="2"></rect>
</g>
</svg>
<!--
	  icon: overview (from Action-based)
  -->
<svg version="1.1" id="overview" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M24,9c-1.906,0-3.632,0.764-4.895,2h-1.383c-0.347-0.595-0.984-1-1.723-1s-1.376,0.405-1.723,1h-1.383
	C11.632,9.764,9.906,9,8,9c-3.867,0-7,3.135-7,7s3.133,7,7,7s7-3.135,7-7h2c0,3.865,3.133,7,7,7s7-3.135,7-7S27.867,9,24,9z M8,21
	c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S10.757,21,8,21z M24,21c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5
	S26.757,21,24,21z"></path>
</svg>
<!--
	  icon: pan-zoom (from TRIRIGA)
  -->
<svg version="1.1" id="pan-zoom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
	<g>
		<g>
			<polygon points="11.9,19.2 11.9,21.2 20.1,21.2 20.1,19.2 			"></polygon>
		</g>
	</g>
	<polygon points="20,12 17,12 17,9 15,9 15,12 12,12 12,14 15,14 15,17 17,17 17,14 20,14 	"></polygon>
	<polygon points="3.7,16 5.1,14.6 7.8,11.9 6.5,10.5 1,16 6.5,21.5 7.8,20.1 5.1,17.4 	"></polygon>
	<polygon points="25.5,10.5 24.2,11.9 26.9,14.6 28.3,16 26.9,17.4 24.2,20.1 25.5,21.5 31,16 	"></polygon>
	<polygon points="17.4,26.9 16,28.3 14.6,26.9 11.9,24.2 10.5,25.5 16,31 21.5,25.5 20.1,24.2 	"></polygon>
	<polygon points="14.6,5.1 16,3.7 17.4,5.1 20.1,7.8 21.5,6.5 16,1 10.5,6.5 11.9,7.8 	"></polygon>
</g>
</svg>
<!--
	  icon: paste (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="paste" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M21,7V1H5v24h6v6h16V7H21z M25,29H13V9h12V29z"></path>
	<rect x="15" y="13" width="8" height="1"></rect>
	<rect x="15" y="15" width="8" height="1"></rect>
	<rect x="15" y="17" width="8" height="1"></rect>
	<rect x="15" y="19" width="4" height="1"></rect>
</g>
</svg>
<!--
	  icon: pause (from Action-based)
  -->
<svg version="1.1" id="pause" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
	<rect x="11" y="11" width="4" height="10"></rect>
	<rect x="17" y="11" width="4" height="10"></rect>
</g>
</svg>
<!--
	  icon: payment-creditcard (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="payment-creditcard" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M1,6v20h30V6H1z M29,8v2H3V8H29z M3,24V13h26v11H3z"></path>
	<rect x="5" y="21" width="4" height="1"></rect>
	<rect x="10" y="21" width="4" height="1"></rect>
</g>
</svg>
<!--
	  icon: person (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="person" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,9c2.209,0,4-1.791,4-4s-1.791-4-4-4s-4,1.791-4,4S13.791,9,16,9z M16,3c1.103,0,2,0.897,2,2s-0.897,2-2,2s-2-0.897-2-2
		S14.898,3,16,3z"></path>
	<path d="M19,11h-6c-1.104,0-2,0.896-2,2v8l2,2v7c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1v-7l2-2v-8C21,11.896,20.104,11,19,11z"></path>
</g>
</svg>
<!--
	  icon: phone-call (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="phone-call" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M24,1l-6,7l2,3l-9,9l-3-2l-7,5l3,8c5-2,11-6,16-11S29,9,31,4L24,1z M18.586,18.586c-4.049,4.049-8.952,7.582-13.455,9.733
	l-1.719-4.584l4.627-3.306l1.852,1.234l1.364,0.91l1.159-1.16l9-9l1.159-1.159l-0.909-1.364l-1.159-1.739l4.058-4.734l3.798,1.627
	C26.213,9.571,22.661,14.511,18.586,18.586z"></path>
</svg>
<!--
	  icon: picturefile (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="picturefile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M3,3v22v4h26v-4V3H3z M5,5h22v18H5V5z"></path>
	<polygon points="19,17 12,10 7,15 7,21 25,21 25,17 22,14 	"></polygon>
	<circle cx="23" cy="9" r="2"></circle>
</g>
</svg>
<!--
	  icon: piechart (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="piechart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2v14H2c0,7.731,6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M18,4.167C23.668,5.122,28,10.064,28,16H18V4.167z
		 M16,28c-5.936,0-10.878-4.332-11.833-10H16h2h9.819C26.863,23.666,21.934,28,16,28z"></path>
	<path d="M14,2.159C7.873,3.038,3.038,7.873,2.159,14H14V2.159z"></path>
</g>
</svg>
<!--
	  icon: pin (from TRIRIGA)
  -->
<svg version="1.1" id="pin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M31.011,11.131L20.745,0.866l-7.318,9.714c-0.403-0.05-0.81-0.076-1.219-0.076c-2.535,0-5.033,0.983-7.032,2.769
	l-1.578,1.41l6.257,6.255l-8.861,8.86l-0.004,1.325l1.341,0.01l8.859-8.859l6.004,6.003l1.409-1.578
	c2.096-2.346,3.057-5.346,2.693-8.25L31.011,11.131z M19.094,17.604c0.704,2.546,0.084,5.449-1.982,7.763L6.509,14.765
	c1.706-1.524,3.732-2.261,5.699-2.261c0.701,0,1.395,0.094,2.063,0.278l6.687-8.875l7.012,7.011L19.094,17.604z"></path>
</svg>
<!--
	  icon: pin-asset (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="pin-asset" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path fill="#FFFFFF" d="M25.246,3.749C22.778,1.332,19.495,0,16,0c-3.494,0-6.779,1.332-9.248,3.75
	c-2.479,2.419-3.845,5.641-3.845,9.072c0,3.604,1.358,6.996,3.826,9.552L16,32l9.268-9.627c2.466-2.555,3.824-5.947,3.824-9.551
	C29.093,9.392,27.727,6.169,25.246,3.749z"></path>
<path d="M24.558,4.455C22.373,2.315,19.349,0.986,16,0.986c-3.349,0-6.373,1.329-8.558,3.468c-2.19,2.138-3.549,5.098-3.549,8.368
	c0,3.461,1.358,6.598,3.549,8.867L16,30.578l8.558-8.889c2.19-2.27,3.549-5.406,3.549-8.867C28.106,9.552,26.748,6.592,24.558,4.455
	z M16,22.821c-5.2,0-9.415-4.216-9.415-9.416S10.8,3.991,16,3.991c5.2,0,9.415,4.215,9.415,9.415S21.2,22.821,16,22.821z"></path>
<path d="M21.918,17.838l-0.02-10.225H10.082v10.225h4.301v1.087h-1.074v0.524h5.38v-0.537h-1.076v-1.074H21.918z M11.159,8.689h9.68
	v7h-9.68V8.689z"></path>
</svg>
<!--
	  icon: pin-equipment (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="pin-equipment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path fill="#FFFFFF" d="M25.246,3.749C22.778,1.332,19.494,0,16,0S9.221,1.332,6.752,3.75c-2.479,2.419-3.845,5.642-3.845,9.072
	c0,3.604,1.358,6.996,3.825,9.552l8.557,8.888L16,32l0.711-0.738l8.558-8.889c2.466-2.555,3.824-5.947,3.824-9.551
	C29.093,9.392,27.727,6.169,25.246,3.749z"></path>
<g>
	<path d="M24.558,4.455C22.373,2.315,19.349,0.986,16,0.986c-3.349,0-6.373,1.329-8.558,3.468c-2.19,2.138-3.549,5.098-3.549,8.368
		c0,3.461,1.358,6.598,3.549,8.867L16,30.578l8.558-8.889c2.19-2.27,3.549-5.406,3.549-8.867
		C28.106,9.552,26.748,6.592,24.558,4.455z M16,22.535c-5.2,0-9.416-4.216-9.416-9.417c0-5.2,4.215-9.415,9.416-9.415
		s9.415,4.215,9.415,9.415C25.415,18.319,21.2,22.535,16,22.535z"></path>
	<path d="M22.429,9.416c-0.567-1.346-1.89-2.131-3.263-2.1l-0.812-1.91l-2.266,0.965l0.804,1.894
		c-1.01,0.963-1.374,2.475-0.801,3.84l1.6-0.678c0.287,0.622,0.908,1.024,1.602,1.024c0.235,0,0.472-0.045,0.69-0.14
		c0.437-0.182,0.772-0.534,0.951-0.966c0.168-0.419,0.167-0.873,0.003-1.296L22.429,9.416z M19.752,11.76
		c-0.152,0.059-0.305,0.095-0.458,0.095c-0.435,0-0.845-0.25-1.043-0.671l2.135-0.903C20.602,10.863,20.327,11.511,19.752,11.76z"></path>
	<path d="M15.628,16.553l-4.018-4.016c0.002-0.029,0.012-0.058,0.012-0.087c0-0.066-0.012-0.124-0.021-0.185l3.325-3.321
		c0.06,0.014,0.125,0.014,0.193,0.014c0.563,0,1.021-0.457,1.021-1.023c0-0.564-0.458-1.022-1.021-1.022
		c-0.568,0-1.023,0.455-1.023,1.022c0,0.042,0.007,0.084,0.012,0.132l-3.376,3.375c-0.047-0.014-0.089-0.014-0.137-0.014
		c-0.566,0-1.024,0.457-1.024,1.022c0,0.566,0.458,1.023,1.024,1.023c0.076,0,0.15-0.012,0.226-0.025l3.648,3.645
		c-0.218,0.256-0.353,0.566-0.369,0.925h-1.461v1.2h6.008v-1.202H17.14C17.104,17.204,16.443,16.561,15.628,16.553z"></path>
</g>
</svg>
<!--
	  icon: pin-multiples (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="pin-multiples" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path fill="#FFFFFF" d="M25.237,3.738C22.77,1.328,19.489,0,16.001,0H16h-0.016c-3.493,0.004-6.775,1.339-9.242,3.759
	c-2.477,2.422-3.839,5.646-3.835,9.077c0.004,3.605,1.366,6.996,3.835,9.549l8.567,8.878L16.021,32l0.71-0.739l8.548-8.898
	c2.464-2.555,3.818-5.948,3.814-9.554C29.089,9.376,27.719,6.155,25.237,3.738z"></path>
<path d="M24.549,4.444c-2.188-2.136-5.214-3.462-8.562-3.458c-3.35,0.004-6.372,1.335-8.554,3.477
	c-2.188,2.139-3.544,5.102-3.54,8.372c0.004,3.462,1.365,6.598,3.558,8.864l8.568,8.879l8.548-8.898
	c2.188-2.271,3.543-5.409,3.539-8.871C28.103,9.54,26.742,6.58,24.549,4.444z M16,22.535c-5.2,0-9.416-4.216-9.416-9.417
	c0-5.2,4.215-9.415,9.416-9.415s9.415,4.215,9.415,9.415C25.415,18.319,21.2,22.535,16,22.535z"></path>
</svg>
<!--
	  icon: pin-person (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="pin-person" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path fill="#FFFFFF" d="M25.246,3.749C22.777,1.332,19.494,0,16,0S9.221,1.332,6.752,3.75c-2.479,2.419-3.845,5.642-3.845,9.072
	c0,3.604,1.358,6.997,3.825,9.552l8.557,8.888L16,32l0.711-0.738l8.559-8.889c2.465-2.555,3.823-5.947,3.823-9.551
	C29.093,9.392,27.727,6.169,25.246,3.749z"></path>
<g>
	<path d="M24.559,4.455C22.373,2.315,19.35,0.986,16,0.986S9.627,2.315,7.441,4.454c-2.189,2.138-3.549,5.098-3.549,8.368
		c0,3.461,1.358,6.598,3.549,8.868L16,30.578l8.559-8.889c2.189-2.271,3.549-5.406,3.549-8.868
		C28.105,9.552,26.748,6.592,24.559,4.455z M16,22.535c-5.2,0-9.416-4.217-9.416-9.417S10.799,3.703,16,3.703
		s9.415,4.215,9.415,9.415S21.2,22.535,16,22.535z"></path>
	<g>
		<path d="M16.001,5.656c2.424,0,4.391,1.964,4.391,4.393c0,2.421-1.967,4.391-4.391,4.391c-2.428,0-4.395-1.97-4.395-4.391
			C11.607,7.621,13.574,5.656,16.001,5.656z"></path>
	</g>
	<path d="M19.766,15.699h-7.533c-1.012,0-1.883,0.871-1.883,1.888v1.879h11.3v-1.879C21.648,16.568,20.781,15.699,19.766,15.699z"></path>
</g>
</svg>
<!--
	  icon: pin-room-function (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="pin-room-function" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path fill="#FFFFFF" d="M25.246,3.749C22.778,1.332,19.494,0,16,0S9.221,1.332,6.752,3.75c-2.479,2.419-3.845,5.642-3.845,9.072
	c0,3.604,1.358,6.996,3.825,9.552l8.557,8.888L16,32l0.711-0.738l8.558-8.889c2.466-2.555,3.824-5.947,3.824-9.551
	C29.093,9.392,27.727,6.169,25.246,3.749z"></path>
<g>
	<path d="M24.558,4.455C22.373,2.315,19.349,0.986,16,0.986c-3.349,0-6.373,1.329-8.558,3.468c-2.19,2.138-3.549,5.098-3.549,8.368
		c0,3.461,1.358,6.598,3.549,8.867L16,30.578l8.558-8.889c2.19-2.27,3.549-5.406,3.549-8.867
		C28.106,9.552,26.748,6.592,24.558,4.455z M16,22.535c-5.2,0-9.416-4.216-9.416-9.417c0-5.2,4.215-9.415,9.416-9.415
		s9.415,4.215,9.415,9.415C25.415,18.319,21.2,22.535,16,22.535z"></path>
	<rect x="10.082" y="11.056" width="11.836" height="4.25"></rect>
	<path d="M11.972,16.207c0.798,0,1.441,0.636,1.441,1.419c0,0.782-0.643,1.418-1.441,1.418c-0.79,0-1.435-0.636-1.435-1.418
		C10.537,16.842,11.182,16.207,11.972,16.207z"></path>
	<path d="M20.167,16.207c0.798,0,1.439,0.636,1.439,1.419c0,0.782-0.642,1.418-1.439,1.418c-0.793,0-1.434-0.636-1.434-1.418
		C18.733,16.842,19.374,16.207,20.167,16.207z"></path>
	<path d="M16.073,16.207c0.792,0,1.436,0.636,1.436,1.419c0,0.782-0.644,1.418-1.436,1.418c-0.797,0-1.441-0.636-1.441-1.418
		C14.632,16.842,15.277,16.207,16.073,16.207z"></path>
	<path d="M11.972,7.208c0.798,0,1.441,0.636,1.441,1.418s-0.643,1.418-1.441,1.418c-0.79,0-1.435-0.636-1.435-1.418
		S11.182,7.208,11.972,7.208z"></path>
	<ellipse cx="20.167" cy="8.626" rx="1.439" ry="1.418"></ellipse>
	<path d="M16.073,7.208c0.792,0,1.436,0.636,1.436,1.418s-0.644,1.418-1.436,1.418c-0.797,0-1.441-0.636-1.441-1.418
		S15.277,7.208,16.073,7.208z"></path>
</g>
</svg>
<!--
	  icon: pinned (from TRIRIGA)
  -->
<svg version="1.1" id="pinned" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M31.011,11.131L20.745,0.866l-7.318,9.714c-0.403-0.05-0.81-0.076-1.219-0.076c-2.535,0-5.033,0.983-7.032,2.769
	l-1.578,1.41l6.257,6.255l-8.861,8.86l-0.004,1.325l1.341,0.01l8.859-8.859l6.004,6.003l1.409-1.578
	c2.096-2.346,3.057-5.346,2.693-8.25L31.011,11.131z"></path>
</svg>
<!--
	  icon: play-demo-start (from Action-based)
  -->
<svg version="1.1" id="play-demo-start" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
	<polygon points="11,22 23,16 11,10 	"></polygon>
</g>
</svg>
<!--
	  icon: power-start (from Action-based)
  -->
<svg version="1.1" id="power-start" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M18,7.18V1h-4v6.18C8.326,8.134,4,13.055,4,19c0,6.628,5.371,12,12,12c6.629,0,12-5.372,12-12
	C28,13.055,23.674,8.134,18,7.18z M16,29c-5.514,0-10-4.486-10-10c0-4.829,3.441-8.869,8-9.798V19h4V9.202
	c4.559,0.929,8,4.969,8,9.798C26,24.514,21.514,29,16,29z"></path>
</svg>
<!--
	  icon: presentationfile (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="presentationfile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
	<path d="M16,25c3.865,0,7-3.135,7-7s-3.135-7-7-7v7H9C9,21.865,12.135,25,16,25z M16,19h1v-1v-5.916c2.834,0.477,5,2.948,5,5.916
		c0,3.309-2.691,6-6,6c-2.968,0-5.439-2.166-5.917-5H16z"></path>
	<path d="M15,11.08c-3.064,0.439-5.481,2.856-5.92,5.92H15V11.08z"></path>
</g>
</svg>
<!--
	  icon: print (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="print" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M26,6V1H6v5H2v12h4v4v1l8,8h1h11V18h4V6H26z M8,3h16v3H8V3z M15,29v-7H8v-8h16v15H15z"></path>
</svg>
<!--
	  icon: priority-emergency
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="priority-emergency" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
<path d="M17.4,7.6l-7-7c-0.8-0.8-2-0.8-2.8,0l-7,7c-0.8,0.8-0.8,2,0,2.8l7,7c0.8,0.8,2,0.8,2.8,0l7-7C18.2,9.6,18.2,8.4,17.4,7.6z
	 M8,3.4h2v3.2l-0.5,4.9H8.5L8,6.6V3.4z M10.1,14.6H7.9v-2h2.1V14.6z"></path>
</svg>
<!--
	  icon: priority-high
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="priority-high" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
<path d="M9,6.1l4.5,7.9h-9L9,6.1 M9,1C8.6,1,8.3,1.2,8,1.7L0.2,15.3c-0.6,1-0.1,1.7,1.1,1.7h15.4c1.1,0,1.6-0.8,1.1-1.7L10,1.7
	C9.7,1.2,9.4,1,9,1L9,1z"></path>
</svg>
<!--
	  icon: priority-low
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="priority-low" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
<path d="M13.5,4L9,11.9L4.5,4H13.5 M16.7,1H1.3C0.2,1-0.3,1.8,0.2,2.7L8,16.3C8.3,16.8,8.6,17,9,17c0.4,0,0.7-0.2,1-0.7l7.8-13.5
	C18.3,1.8,17.8,1,16.7,1L16.7,1z"></path>
</svg>
<!--
	  icon: priority-medium
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="priority-medium" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
<path d="M15,3v12H3V3H15 M16,0H2C0.9,0,0,0.9,0,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V2C18,0.9,17.1,0,16,0L16,0z"></path>
</svg>
<!--
	  icon: priority-none
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="priority-none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
	<rect y="7.5" width="18" height="3"/>
</svg>
<!--
	  icon: project-planning (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="project-planning" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M25,1l-7.646,7.646l-0.707,0.707l-1.293,1.293l-0.707,0.707l-1.293,1.293l-0.707,0.707l-1.293,1.293l-0.707,0.707
		l-1.293,1.293l-0.707,0.707l-1.293,1.293l-0.707,0.707L4,22l-3,3l6,6l3-3L31,7L25,1z M8.586,26.586l-3.172-3.172l2.646-2.647
		l1.586,1.586l0.707-0.707L8.768,20.06l1.293-1.293l1.586,1.586l0.707-0.707l-1.586-1.586l1.293-1.293l1.586,1.586l0.707-0.707
		l-1.586-1.586l1.293-1.293l1.586,1.586l0.707-0.707l-1.586-1.586l1.293-1.293l1.586,1.586l0.707-0.707l-1.586-1.586l1.293-1.293
		l1.586,1.586l0.707-0.707l-1.586-1.586L25,3.829L28.172,7L8.586,26.586z"></path>
	<circle cx="25" cy="7" r="1"></circle>
</g>
</svg>
<!--
	  icon: rating-star (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="rating-star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M31,13l-11-1L16,1l-4,11L1,13l9,7L7,31l9-7l9,7l-3-11L31,13z M17.228,22.421L16,21.466l-1.228,0.955l-4.264,3.316
	l1.421-5.211l0.351-1.287l-1.052-0.818l-5-3.889l5.953-0.541l1.265-0.115l0.434-1.193L16,6.852l2.121,5.831l0.434,1.193l1.265,0.115
	l5.953,0.541l-4.999,3.889L19.72,19.24l0.351,1.287l1.421,5.211L17.228,22.421z"></path>
</svg>
<!--
	  icon: rating-star-filled
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="rating-star-filled" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M31,13l-11-1L16,1l-4,11L1,13l9,7L7,31l9-7l9,7l-3-11L31,13z"></path>
</svg>
<!--
	  icon: read (from TRIRIGA)
  -->
<svg version="1.1" id="read" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M16,4L1,12v1v15h30V13v-1L16,4z M7,11h18v4.2L16,20l-9-4.8V11z M29,26H3V14.066L16,21l13-6.934V26z"></path>
</svg>
<!--
	  icon: ready (from TRIRIGA)
  -->
<svg version="1.1" id="ready" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M16,2C8.269,2,2,8.269,2,16c0,7.73,6.269,14,14,14c7.73,0,14-6.27,14-14C30,8.269,23.73,2,16,2z M14,21.414l-4.707-4.707
	l1.414-1.414L14,18.586l7.293-7.293l1.414,1.414L14,21.414z"></path>
</svg>
<!--
	  icon: recommended (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="recommended" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<polygon points="14.5,13.586 12.207,11.293 10.793,12.707 14.5,16.414 21.207,9.707 19.793,8.293 		"></polygon>
	</g>
	<g>
		<path d="M27,12c0-6.074-4.924-11-11-11C9.926,1,5,5.926,5,12c0,4.21,2.369,7.865,5.844,9.714L10,31l6-4l6,4l-0.844-9.286
			C24.632,19.865,27,16.21,27,12z M16,21c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S20.971,21,16,21z"></path>
	</g>
</g>
</svg>
<!--
	  icon: recurring (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="recurring" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M21.5,1l-1.4,1.4l4.3,4.3h-9.8C8,6.8,2.5,12.2,2.5,18.9c0,1.1,0.2,2.2,0.4,3.2l1.7-1.7c-0.1-0.5-0.1-1-0.1-1.5
		c0-5.6,4.5-10.1,10.1-10.1h9.8l-4.3,4.3l1.4,1.4l6.8-6.8L21.5,1z"></path>
	<path d="M27.3,11.6c0.1,0.5,0.1,1,0.1,1.5c0,5.6-4.5,10.1-10.1,10.1H7.6l4.3-4.3l-1.4-1.4l-6.8,6.8l6.8,6.8l1.4-1.4l-4.3-4.3h9.8
		c6.7,0,12.1-5.4,12.1-12.1c0-1.1-0.2-2.2-0.4-3.2L27.3,11.6z"></path>
</g>
</svg>

<!--
	  icon: recurring-exception (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="recurring-exception" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
	<style type="text/css">
		.exception{fill:#E05702;}
	</style>
	<path d="M21.5,1l-1.4,1.4l4.3,4.3h-9.8C8,6.8,2.5,12.2,2.5,18.9c0,1.1,0.2,2.2,0.4,3.2l1.7-1.7c-0.1-0.5-0.1-1-0.1-1.5
		c0-5.6,4.5-10.1,10.1-10.1h9.8l-4.3,4.3l1.4,1.4l6.8-6.8L21.5,1z"></path>
	<g>
		<path d="M26.2,18.1l1.5,1.5c1.2-1.9,1.9-4.1,1.9-6.4c0-1.1-0.2-2.2-0.4-3.2l-1.7,1.7c0.1,0.5,0.1,1,0.1,1.5
			C27.5,14.9,27,16.6,26.2,18.1z"></path>
		<polygon points="15.2,25.2 14.2,24.2 15.2,23.2 7.6,23.2 11.9,18.9 10.5,17.5 3.7,24.2 10.5,31 11.9,29.6 7.6,25.2"></polygon>
	</g>
	<g>
		<rect x="18.8" y="19.8" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -10.3252 23.5218)" class="exception" width="8.8" height="8.8"></rect>
	</g>
</svg>
<!--
	  icon: refresh-redo (from Action-based)
  -->
<svg version="1.1" id="refresh-redo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M17,29c-5.514,0-10-4.486-10-10S11.486,9,17,9h6.586l-4.293,4.293l1.414,1.414L27.414,8l-6.707-6.707l-1.414,1.414L23.586,7
	H17C10.383,7,5,12.383,5,19s5.383,12,12,12c3.205,0,6.218-1.248,8.485-3.515l-1.414-1.414C22.182,27.96,19.671,29,17,29z"></path>
</svg>
<!--
	  icon: relationship (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="relationship" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M24,9c2.209,0,4-1.791,4-4s-1.791-4-4-4s-4,1.791-4,4S21.791,9,24,9z M24,3c1.103,0,2,0.897,2,2c0,1.102-0.897,2-2,2
		c-1.104,0-2-0.898-2-2C22,3.897,22.896,3,24,3z"></path>
	<path d="M27,11h-6l-5,5l-5-5H5c-1.105,0-2,0.896-2,2v8l2,2v7c0,0.553,0.447,1,1,1h4c0.553,0,1-0.447,1-1V16l5,5l5-5v14
		c0,0.553,0.447,1,1,1h4c0.553,0,1-0.447,1-1v-7l2-2v-8C29,11.896,28.104,11,27,11z"></path>
	<path d="M8,9c2.209,0,4-1.791,4-4s-1.791-4-4-4S4,2.791,4,5S5.791,9,8,9z M8,3c1.103,0,2,0.897,2,2c0,1.102-0.897,2-2,2
		C6.896,7,6,6.102,6,5C6,3.897,6.896,3,8,3z"></path>
</g>
</svg>
<!--
	  icon: remove-delete (from Action-based)
  -->
<svg version="1.1" id="remove-delete" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="9" y="15" width="14" height="2"></rect>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: remove-trash (from Action-based)
  -->
<svg version="1.1" id="remove-trash" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="12" y="2" width="8" height="2"></rect>
	<path d="M6,5v5h1v20h18V10h1V5H6z M23,28H9V12h14V28z"></path>
	<rect x="11" y="14" width="1" height="12"></rect>
	<rect x="14" y="14" width="1" height="12"></rect>
	<rect x="17" y="14" width="1" height="12"></rect>
	<rect x="20" y="14" width="1" height="12"></rect>
</g>
</svg>
<!--
	  icon: report (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="report" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="10" y="7" width="5" height="21"></rect>
	<rect x="17" y="17" width="5" height="1"></rect>
	<rect x="17" y="15" width="5" height="1"></rect>
	<rect x="17" y="19" width="5" height="1"></rect>
	<rect x="17" y="21" width="5" height="1"></rect>
	<rect x="17" y="23" width="5" height="1"></rect>
	<rect x="17" y="25" width="5" height="1"></rect>
	<rect x="17" y="27" width="5" height="1"></rect>
	<path d="M6,1v2v28h20V3V1H6z M24,29H8V5h16V29z"></path>
</g>
</svg>
<!--
	  icon: repository-archive (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="repository-archive" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M29,10V8h-1h-1V7V6h-1H6H5v1v1H4H3v2H1v16h30V10H29z M6,7h20v1H6V7z M29,24H3V12h26V24z"></path>
	<polygon points="19,19 20,19 20,18 20,17 19,17 19,18 13,18 13,17 12,17 12,18 12,19 13,19 	"></polygon>
</g>
</svg>
<!--
	  icon: reset-revert (from Action-based)
  -->
<svg version="1.1" id="reset-revert" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M19,5C12.383,5,7,10.383,7,17v6.586l-4.293-4.293l-1.414,1.414L8,27.414l6.707-6.707l-1.414-1.414L9,23.586V17
	c0-5.514,4.486-10,10-10s10,4.486,10,10c0,2.671-1.04,5.182-2.929,7.071l1.414,1.414C29.752,23.218,31,20.205,31,17
	C31,10.383,25.617,5,19,5z"></path>
</svg>
<!--
	  icon: restore (from Action-based)
  -->
<svg version="1.1" id="restore" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M19,4C12.383,4,7,9.383,7,16v8.586l-4.293-4.293l-1.414,1.414L8,28.414l6.707-6.707l-1.414-1.414L9,24.586V16
		c0-5.514,4.486-10,10-10s10,4.486,10,10s-4.486,10-10,10v2c6.617,0,12-5.383,12-12S25.617,4,19,4z"></path>
	<polygon points="20.293,18.707 21.707,17.293 20.06,15.646 25.354,10.354 24.646,9.646 19.354,14.939 16.707,12.293 15.293,13.707 
		17.94,16.354 16.646,17.646 17.354,18.354 18.646,17.06 	"></polygon>
</g>
</svg>
<!--
	  icon: retrieve (from Action-based)
  -->
<svg version="1.1" id="retrieve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="12" y="23" width="8" height="1"></rect>
	<rect x="12" y="25" width="8" height="1"></rect>
	<path d="M24,29V17H8v12H3v2h5h16h5v-2H24z M10,29V19h12v10H10z"></path>
	<polygon points="15,5.414 15,15 17,15 17,5.414 20.293,8.707 21.707,7.293 16,1.586 10.293,7.293 11.707,8.707 	"></polygon>
</g>
</svg>
<!--
	  icon: role (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="role" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M18,5V1h-4v4H6v26h20V5H18z M16,2c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S15.448,2,16,2z M24,29H8V7h6v2h4V7h6V29z
		"></path>
	<path d="M16,11c-2.762,0-5,2.238-5,5s2.238,5,5,5s5-2.238,5-5S18.762,11,16,11z M16,19c-1.654,0-3-1.346-3-3s1.346-3,3-3
		s3,1.346,3,3S17.654,19,16,19z"></path>
	<path d="M12,23c-1.104,0-2,0.896-2,2v2h12v-2c0-1.104-0.896-2-2-2H12z"></path>
</g>
</svg>
<!--
	  icon: room-function (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="room-function" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="3" y="11.454" width="26" height="9.331"></rect>
	<ellipse cx="7.156" cy="25.881" rx="3.157" ry="3.119"></ellipse>
	<ellipse cx="25.156" cy="25.881" rx="3.158" ry="3.119"></ellipse>
	<ellipse cx="16.156" cy="25.881" rx="3.157" ry="3.119"></ellipse>
	<ellipse cx="7.156" cy="6.119" rx="3.157" ry="3.119"></ellipse>
	<ellipse cx="25.156" cy="6.119" rx="3.158" ry="3.119"></ellipse>
	<ellipse cx="16.156" cy="6.119" rx="3.157" ry="3.119"></ellipse>
</g>
</svg>
<!--
	  icon: rss-feed (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="rss-feed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M3,3v5c11.598,0,21,9.402,21,21h5C29,14.641,17.359,3,3,3z"></path>
	<path d="M3,13v5c6.076,0,11,4.924,11,11h5C19,20.163,11.837,13,3,13z"></path>
	<circle cx="4.5" cy="27.5" r="3.5"></circle>
</g>
</svg>
<!--
	  icon: run-running (from Action-based)
  -->
<svg version="1.1" id="run-running" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<path d="M11,11c-2.761,0-5,2.239-5,5s2.239,5,5,5c2.761,0,5-2.239,5-5S13.761,11,11,11z M11,18c-1.105,0-2-0.896-2-2s0.895-2,2-2
			c1.104,0,2,0.896,2,2S12.104,18,11,18z"></path>
	</g>
	<g>
		<path d="M30.121,6.879C29.578,6.337,28.828,6,28,6H11C8.239,6,5.739,7.119,3.929,8.929C2.119,10.738,1,13.238,1,16
			s1.119,5.262,2.929,7.071C5.739,24.881,8.239,26,11,26c2.761,0,5.257-1.123,7.071-2.929c0,0,0,0,0,0
			c0.002-0.002,0.003-0.003,0.004-0.005c3.011-2.998,12.045-11.945,12.045-11.945C30.665,10.579,31,9.829,31,9
			S30.665,7.421,30.121,6.879z M16.661,21.652l-0.001,0.001C15.14,23.167,13.13,24,11,24c-2.137,0-4.146-0.832-5.657-2.343
			C3.832,20.146,3,18.137,3,16s0.832-4.146,2.343-5.657C6.854,8.832,8.863,8,11,8c2.049,0,4.097,0.783,5.657,2.343
			C19.774,13.461,19.775,18.533,16.661,21.652z M20.882,17.461c0.444-3.022-0.485-6.206-2.811-8.533
			C17.727,8.585,17.36,8.283,16.982,8h8.2c-0.374,1.056-0.148,2.276,0.697,3.121c0.246,0.246,0.528,0.428,0.824,0.571
			C25.148,13.231,22.924,15.436,20.882,17.461z M28,10c-0.552,0-1-0.448-1-1s0.448-1,1-1c0.552,0,1,0.448,1,1S28.552,10,28,10z"></path>
	</g>
</g>
</svg>
<!--
	  icon: satellitedish (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="satellitedish" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M28,21l-9-9l2.494-4.157C21.645,7.934,21.812,8,22,8c0.553,0,1-0.447,1-1s-0.447-1-1-1s-1,0.447-1,1
		c0,0.188,0.066,0.356,0.157,0.506L17,10L8,1C5.45,3.549,4,7.11,4,11c0,3.891,1.45,7.451,4,10c2.548,2.549,6.109,4,10,4
		C21.89,25,25.451,23.549,28,21z M6,11c0-2.614,0.745-5.053,2.127-7.045l16.918,16.918C23.053,22.255,20.614,23,18,23
		c-3.336,0-6.385-1.213-8.586-3.414C7.213,17.385,6,14.336,6,11z"></path>
	<rect x="11" y="27" width="10" height="4"></rect>
</g>
</svg>
<!--
	  icon: save (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="save" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M3,3v26h7h12h3l4-4V3H3z M27,24.171L24.172,27H22v-2H10v2H5V5h22V24.171z"></path>
	<path d="M16,22c3.313,0,6-2.687,6-6s-2.687-6-6-6s-6,2.686-6,6S12.686,22,16,22z M16,14c1.104,0,2,0.896,2,2s-0.896,2-2,2
		s-2-0.896-2-2S14.896,14,16,14z"></path>
</g>
</svg>
<!--
	  icon: search (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="search" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M12,1C5.926,1,1,5.926,1,12c0,6.074,4.926,11,11,11s11-4.926,11-11C23,5.926,18.074,1,12,1z M12,21c-4.962,0-9-4.038-9-9
		s4.038-9,9-9s9,4.038,9,9S16.962,21,12,21z"></path>
	<rect x="23.879" y="21.05" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -10.7696 26)" width="4.243" height="9.899"></rect>
	<circle cx="21" cy="21" r="1"></circle>
</g>
</svg>
<!--
	  icon: select-area (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="select-area" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
	<polygon points="3.2,1.2 1.2,1.2 1.2,3.2 3.2,3.2 3.2,1.2 	"></polygon>
	<polygon points="7.2,1.2 5.2,1.2 5.2,3.2 7.2,3.2 7.2,1.2 	"></polygon>
	<polygon points="11.2,1.2 9.2,1.2 9.2,3.2 11.2,3.2 11.2,1.2 	"></polygon>
	<polygon points="15.2,1.2 13.2,1.2 13.2,3.2 15.2,3.2 15.2,1.2 	"></polygon>
	<polygon points="19.2,1.2 17.2,1.2 17.2,3.2 19.2,3.2 19.2,1.2 	"></polygon>
	<polygon points="23.2,1.2 21.2,1.2 21.2,3.2 23.2,3.2 23.2,1.2 	"></polygon>
	<polygon points="27.2,1.2 25.2,1.2 25.2,3.2 27.2,3.2 27.2,1.2 	"></polygon>
	<polygon points="27.2,5.2 25.2,5.2 25.2,7.2 27.2,7.2 27.2,5.2 	"></polygon>
	<polygon points="27.2,9.2 25.2,9.2 25.2,11.2 27.2,11.2 27.2,9.2 	"></polygon>
	<polygon points="27.2,13.2 25.2,13.2 25.2,15.2 27.2,15.2 27.2,13.2 	"></polygon>
	<polygon points="3.2,5.2 1.2,5.2 1.2,7.2 3.2,7.2 3.2,5.2 	"></polygon>
	<polygon points="3.2,9.2 1.2,9.2 1.2,11.2 3.2,11.2 3.2,9.2 	"></polygon>
	<polygon points="3.2,13.2 1.2,13.2 1.2,15.2 3.2,15.2 3.2,13.2 	"></polygon>
	<polygon points="3.2,17.2 1.2,17.2 1.2,19.2 3.2,19.2 3.2,17.2 	"></polygon>
	<polygon points="3.2,21.2 1.2,21.2 1.2,23.2 3.2,23.2 3.2,21.2 	"></polygon>
	<polygon points="3.2,25.2 1.2,25.2 1.2,27.2 3.2,27.2 3.2,25.2 	"></polygon>
	<polygon points="7.2,25.2 5.2,25.2 5.2,27.2 7.2,27.2 7.2,25.2 	"></polygon>
	<polygon points="11.2,25.2 9.2,25.2 9.2,27.2 11.2,27.2 11.2,25.2 	"></polygon>
	<polygon points="15.2,25.2 13.2,25.2 13.2,27.2 15.2,27.2 15.2,25.2 	"></polygon>
	<polygon points="31,28.9 26,23.8 28.8,21 18.5,18.2 21.2,28.5 24,25.7 29.1,30.8 	"></polygon>
</g>
</svg>
<!--
	  icon: settings (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="settings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M30.366,5.876l-4.245,4.246C25.535,10.707,24.768,11,24,11s-1.535-0.293-2.121-0.879c-1.172-1.171-1.172-3.071-0.001-4.243
		l4.245-4.245C25.164,1.226,24.108,1,23,1c-4.419,0-8,3.582-8,8c0,0.914,0.161,1.789,0.443,2.606L2.025,25.025
		c-1.367,1.367-1.367,3.583,0,4.95C2.709,30.658,3.605,31,4.5,31s1.791-0.342,2.475-1.025l13.418-13.418
		C21.211,16.839,22.086,17,23,17c4.418,0,8-3.582,8-8C31,7.891,30.773,6.835,30.366,5.876z M23,15c-0.654,0-1.312-0.112-1.954-0.334
		l-1.183-0.409l-0.885,0.885L5.561,28.56C5.277,28.844,4.9,29,4.5,29s-0.777-0.156-1.06-0.44C3.156,28.277,3,27.9,3,27.5
		c0-0.401,0.156-0.777,0.44-1.061l13.418-13.418l0.885-0.884l-0.408-1.182C17.112,10.312,17,9.654,17,9
		c0-2.901,2.069-5.328,4.81-5.881l-1.347,1.346c-1.948,1.95-1.947,5.122,0.001,7.07C21.408,12.479,22.664,13,24,13
		c1.335,0,2.591-0.52,3.535-1.465l1.347-1.347C28.328,12.93,25.901,15,23,15z"></path>
	<circle cx="4.5" cy="27.5" r="1"></circle>
</g>
</svg>
<!--
	  icon: settings-manage (from Action-based)
  -->
<svg version="1.1" id="settings-manage" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<g>
		<path d="M27.5,16c0-0.615-0.062-1.213-0.155-1.802L31,11l-3.105-5.098l-4.359,1.424c-1.042-0.906-2.248-1.623-3.569-2.109L19,1h-6
			l-0.966,4.217c-1.321,0.486-2.527,1.203-3.57,2.11L4.105,5.902L1,11l3.655,3.199C4.562,14.787,4.5,15.386,4.5,16
			c0,0.615,0.062,1.213,0.155,1.802L1,21l3.106,5.098l4.358-1.424c1.042,0.907,2.249,1.624,3.57,2.11L13,31h6l0.966-4.217
			c1.321-0.486,2.527-1.203,3.569-2.109l4.359,1.424L31,21l-3.655-3.197C27.438,17.214,27.5,16.615,27.5,16z M28.416,21.397
			l-1.406,2.308l-2.854-0.932l-1.078-0.352l-0.855,0.744c-0.868,0.755-1.86,1.341-2.947,1.742l-1.017,0.375l-0.242,1.056L17.406,29
			h-2.812l-0.61-2.664l-0.242-1.056l-1.017-0.375c-1.088-0.4-2.08-0.986-2.948-1.742L8.921,22.42l-1.078,0.353L4.99,23.705
			l-1.406-2.308l2.388-2.09l0.83-0.727L6.63,17.49C6.543,16.934,6.5,16.446,6.5,16c0-0.446,0.043-0.934,0.13-1.49l0.172-1.09
			l-0.83-0.727l-2.388-2.091l1.406-2.308l2.854,0.933L8.921,9.58l0.855-0.744c0.869-0.756,1.86-1.342,2.948-1.742l1.017-0.375
			l0.242-1.056L14.594,3h2.812l0.61,2.664l0.242,1.056l1.017,0.375c1.087,0.4,2.079,0.986,2.947,1.742l0.855,0.744l1.078-0.352
			l2.854-0.933l1.406,2.308l-2.388,2.089l-0.831,0.727l0.173,1.091C25.457,15.066,25.5,15.553,25.5,16s-0.043,0.935-0.131,1.49
			l-0.173,1.091l0.831,0.727L28.416,21.397z"></path>
	</g>
	<g>
		<path d="M16,10c-3.314,0-6,2.685-6,6s2.686,6,6,6c3.315,0,6-2.685,6-6S19.315,10,16,10z M16,18c-1.104,0-2-0.896-2-2s0.896-2,2-2
			s2,0.896,2,2S17.104,18,16,18z"></path>
	</g>
</g>
</svg>
<!--
	  icon: sign-out (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="sign-out" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="22.244,7.32 20.83,8.72 27.123,15 10,15 10,17 27.123,17 20.83,23.307 22.244,24.728 30.952,16.023 	"></polygon>
	<polygon points="3,3 16,3 16,1 1,1 1,31 16,31 16,29 3,29 	"></polygon>
</g>
</svg>
<!--
	  icon: sort (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="sort" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="5.434,13 16.178,1 26.921,13 	"></polygon>
	<polygon points="5.434,19 16.178,31 26.921,19 	"></polygon>
</g>
</svg>
<!--
	  icon: sort-ascending (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="sort-ascending" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="5.434,13 16.178,1 26.921,13 	"></polygon>
	<polygon fill="#E0E0E0" points="5.434,19 16.178,31 26.921,19 	"></polygon>
</g>
</svg>
<!--
	  icon: sort-descending (from Custom)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="sort-descending" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon fill="#E0E0E0" points="5.434,13 16.178,1 26.921,13 	"></polygon>
	<polygon points="5.434,19 16.178,31 26.921,19 	"></polygon>
</g>
</svg>
<!--
	  icon: spaces (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="spaces" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M1,6v20h30V6H1z M29,24H3V8h26V24z"></path>
	<path d="M28,9H17v6h11V9z M27,14h-9v-4h9V14z"></path>
	<rect x="4" y="9" width="11" height="6"></rect>
	<path d="M15,17H4v6h11V17z M14,22H5v-4h9V22z"></path>
	<path d="M28,17H17v6h11V17z M27,22h-9v-4h9V22z"></path>
</g>
</svg>
<!--
	  icon: spellcheck (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="spellcheck" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M6.832,16.62v-3.229c0-0.376-0.084-0.678-0.252-0.905c-0.168-0.229-0.384-0.406-0.648-0.534
		c-0.264-0.128-0.556-0.214-0.876-0.258c-0.32-0.044-0.636-0.066-0.948-0.066c-0.344,0-0.686,0.034-1.026,0.103
		c-0.34,0.067-0.646,0.182-0.918,0.342c-0.272,0.16-0.496,0.372-0.672,0.636c-0.176,0.264-0.276,0.596-0.3,0.996h1.704
		c0.032-0.336,0.144-0.576,0.336-0.72c0.192-0.145,0.456-0.217,0.792-0.217c0.152,0,0.294,0.011,0.426,0.03
		c0.132,0.021,0.248,0.061,0.348,0.12c0.1,0.059,0.18,0.143,0.24,0.252c0.06,0.108,0.09,0.254,0.09,0.439
		c0.008,0.176-0.044,0.31-0.156,0.401c-0.112,0.093-0.264,0.162-0.456,0.21c-0.192,0.048-0.412,0.084-0.66,0.108
		c-0.249,0.023-0.5,0.056-0.756,0.096c-0.256,0.04-0.51,0.095-0.762,0.162c-0.252,0.068-0.476,0.17-0.672,0.306
		c-0.196,0.137-0.356,0.318-0.48,0.547C1.062,15.666,1,15.956,1,16.308c0,0.32,0.054,0.597,0.162,0.828
		c0.108,0.233,0.258,0.425,0.45,0.576c0.192,0.152,0.416,0.264,0.672,0.336c0.256,0.072,0.532,0.108,0.828,0.108
		c0.384,0,0.76-0.057,1.128-0.168C4.608,17.876,4.928,17.68,5.2,17.4c0.008,0.104,0.022,0.206,0.042,0.306
		c0.02,0.1,0.046,0.198,0.078,0.294h1.728c-0.08-0.128-0.136-0.32-0.168-0.576C6.848,17.168,6.832,16.9,6.832,16.62z M5.128,15.6
		c0,0.097-0.01,0.225-0.03,0.385c-0.02,0.16-0.074,0.317-0.162,0.474c-0.088,0.156-0.224,0.29-0.408,0.402
		c-0.184,0.111-0.444,0.168-0.78,0.168c-0.136,0-0.268-0.013-0.396-0.036c-0.128-0.024-0.24-0.066-0.336-0.126
		c-0.096-0.06-0.172-0.143-0.228-0.246c-0.056-0.104-0.084-0.232-0.084-0.384c0-0.16,0.028-0.292,0.084-0.396
		c0.056-0.103,0.13-0.189,0.222-0.258c0.092-0.068,0.2-0.122,0.324-0.162c0.124-0.04,0.25-0.072,0.378-0.096
		C3.848,15.3,3.984,15.28,4.12,15.264c0.136-0.016,0.266-0.036,0.39-0.06c0.124-0.024,0.24-0.054,0.348-0.09
		c0.108-0.036,0.198-0.086,0.27-0.15V15.6z"></path>
	<path d="M9.772,17.208h0.024c0.184,0.344,0.456,0.588,0.816,0.732c0.36,0.144,0.768,0.216,1.224,0.216
		c0.312,0,0.62-0.064,0.924-0.192c0.304-0.128,0.578-0.324,0.822-0.588c0.244-0.264,0.442-0.602,0.594-1.014
		c0.152-0.412,0.228-0.902,0.228-1.471c0-0.567-0.076-1.058-0.228-1.47c-0.152-0.412-0.35-0.75-0.594-1.014
		c-0.244-0.265-0.518-0.46-0.822-0.588c-0.304-0.128-0.612-0.192-0.924-0.192c-0.384,0-0.754,0.074-1.11,0.222
		c-0.356,0.148-0.638,0.383-0.846,0.702H9.856v-3.12H8.152V18h1.62V17.208z M9.88,14.148c0.056-0.24,0.144-0.452,0.264-0.637
		c0.12-0.184,0.272-0.33,0.456-0.438c0.184-0.108,0.4-0.162,0.648-0.162c0.256,0,0.474,0.054,0.654,0.162
		c0.18,0.107,0.33,0.254,0.45,0.438c0.12,0.185,0.208,0.397,0.264,0.637c0.056,0.239,0.084,0.491,0.084,0.756
		c0,0.256-0.028,0.504-0.084,0.744c-0.056,0.239-0.144,0.451-0.264,0.636c-0.12,0.184-0.27,0.33-0.45,0.438
		c-0.18,0.108-0.398,0.162-0.654,0.162c-0.248,0-0.464-0.054-0.648-0.162c-0.184-0.107-0.336-0.254-0.456-0.438
		c-0.12-0.185-0.209-0.397-0.264-0.636c-0.056-0.24-0.084-0.488-0.084-0.744C9.796,14.64,9.824,14.388,9.88,14.148z"></path>
	<path d="M16.156,17.268c0.272,0.28,0.602,0.498,0.99,0.654c0.388,0.156,0.814,0.234,1.278,0.234c0.824,0,1.5-0.216,2.028-0.649
		c0.528-0.432,0.848-1.06,0.96-1.884h-1.644c-0.056,0.384-0.194,0.691-0.414,0.918c-0.22,0.228-0.534,0.342-0.942,0.342
		c-0.264,0-0.488-0.06-0.672-0.18c-0.184-0.12-0.33-0.274-0.438-0.462c-0.108-0.189-0.186-0.398-0.234-0.63
		c-0.048-0.232-0.072-0.46-0.072-0.685c0-0.231,0.024-0.466,0.072-0.702c0.048-0.235,0.13-0.451,0.246-0.648
		c0.116-0.196,0.266-0.356,0.45-0.48c0.184-0.124,0.412-0.186,0.684-0.186c0.728,0,1.148,0.356,1.26,1.068h1.668
		c-0.024-0.4-0.12-0.746-0.288-1.038c-0.168-0.292-0.386-0.536-0.654-0.732c-0.268-0.196-0.572-0.342-0.912-0.438
		c-0.34-0.097-0.694-0.145-1.062-0.145c-0.504,0-0.952,0.084-1.344,0.252c-0.392,0.168-0.724,0.402-0.996,0.702
		c-0.272,0.3-0.479,0.656-0.618,1.068c-0.14,0.412-0.21,0.857-0.21,1.338c0,0.464,0.076,0.89,0.228,1.277
		C15.672,16.654,15.884,16.988,16.156,17.268z"></path>
	<polygon points="28,14 17,25 12,20 9,23 17,31 31,17 	"></polygon>
</g>
</svg>
<!--
	  icon: spreadsheet-listview (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="spreadsheet-listview" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M1,4v4v20h30V8V4H1z M29,26H3v-4h26V26z M29,20H3v-4h26V20z M29,14H3v-4h26V14z"></path>
</svg>
<!--
	  icon: status-error (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="status-error" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="20.293,10.293 16,14.586 11.707,10.293 10.293,11.707 14.586,16 10.293,20.293 11.707,21.707 16,17.414 
		20.293,21.707 21.707,20.293 17.414,16 21.707,11.707 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16c0,7.73,6.269,14,14,14c7.73,0,14-6.27,14-14C30,8.269,23.73,2,16,2z M16,28
		C9.383,28,4,22.617,4,16S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: status-info (from TRIRIGA)
  -->
<svg version="1.1" id="status-info" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="18,14 12,14 12,16 14,16 14,22 12,22 12,24 20,24 20,22 18,22 	"></polygon>
	<circle cx="16" cy="10" r="2"></circle>
	<path d="M16,2C8.269,2,2,8.269,2,16c0,7.73,6.269,14,14,14c7.73,0,14-6.27,14-14C30,8.269,23.73,2,16,2z M16,28
		C9.383,28,4,22.617,4,16S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: status-success (from TRIRIGA)
  -->
<svg version="1.1" id="status-success" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="14,18.586 10.707,15.293 9.293,16.707 14,21.414 22.707,12.707 21.293,11.293 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16c0,7.73,6.269,14,14,14c7.73,0,14-6.27,14-14C30,8.269,23.73,2,16,2z M16,28
		C9.383,28,4,22.617,4,16S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: status-warning (from TRIRIGA)
  -->
<svg version="1.1" id="status-warning" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,3L1,29h30L16,3z M16,7.002L27.537,27H4.463L16,7.002z"></path>
	<polygon points="15,14 15,16 15.5,21 16.5,21 17,16 17,14 	"></polygon>
	<circle cx="16" cy="23" r="1"></circle>
</g>
</svg><!--
	  icon: status-warning-major (from TRIRIGA)
  -->
<svg version="1.1" id="status-warning-major" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M16,29L31,3H1L16,29z M16,24.998L4.463,5h23.074L16,24.998z"></path>
<polygon points="15,8 15,10 15.5,15 16.5,15 17,10 17,8 "></polygon>
<circle cx="16" cy="17" r="1"></circle>
</svg>
<!--
	  icon: stop (from Action-based)
  -->
<svg version="1.1" id="stop" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
	<rect x="11" y="11" width="10" height="10"></rect>
</g>
</svg>
<!--
	  icon: success-confirmation (from Action-based)
  -->
<svg version="1.1" id="success-confirmation" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="14,18.586 10.707,15.293 9.293,16.707 14,21.414 22.707,12.707 21.293,11.293 	"></polygon>
	<path d="M16,2C8.269,2,2,8.269,2,16s6.269,14,14,14s14-6.269,14-14S23.731,2,16,2z M16,28C9.383,28,4,22.617,4,16S9.383,4,16,4
		s12,5.383,12,12S22.617,28,16,28z"></path>
</g>
</svg>
<!--
	  icon: table-tables (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="table-tables" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M1,4v4v20h30V8V4H1z M19,17H3v-7h16V17z M3,26v-7h16v7H3z M29,26h-8v-7h8V26z M29,17h-8v-7h8V17z"></path>
</svg>
<!--
	  icon: tag (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="tag" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M18,1L4,15l-3,3l13,13l3-3l14-14V1H18z M29,13.172L15.586,26.586L5.414,16.414L18.829,3H29V13.172z"></path>
	<circle cx="24" cy="8" r="2"></circle>
</g>
</svg>
<!--
	  icon: task (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="task" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
	<rect x="10" y="14" width="11" height="1"></rect>
	<rect x="10" y="16" width="11" height="1"></rect>
	<rect x="10" y="18" width="5" height="1"></rect>
	<path d="M17.621,3c-0.156-1-1.086-1.932-2.218-1.932S13.342,2,13.186,3H5v28h21V3H17.621z M15.403,2.331c0.69,0,1.25,0.56,1.25,1.25
	c0,0.69-0.56,1.25-1.25,1.25s-1.25-0.56-1.25-1.25C14.153,2.891,14.713,2.331,15.403,2.331z M7,24.146L12.456,29H7V24.146z M24,29
	H13.52l-0.001-6H7V5h4v2h9V5h4V29z"></path>
</svg>
<!--
	  icon: task-tasks (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="task-tasks" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M3,3v19v1l6,6h1h19V3H3z M27,27H10v-5H5V5h22V27z"></path>
	<polygon points="22.707,12.707 21.293,11.293 14,18.586 10.707,15.293 9.293,16.707 14,21.414 	"></polygon>
</g>
</svg>
<!--
	  icon: template (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="template" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M18,11H4v14h14V11z M17,12.707v10.586L11.707,18L17,12.707z M11,17.293L5.707,12h10.586L11,17.293z M10.293,18L5,23.293
		V12.707L10.293,18z M11,18.707L16.293,24H5.707L11,18.707z"></path>
	<rect x="20" y="11" width="8" height="14"></rect>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
</g>
</svg>
<!--
	  icon: textcolor (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="textcolor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="6" y="25" width="20" height="6"></rect>
	<path d="M12.4,19H19.6l1.4,4h4L18,3h-4L7,23h4L12.4,19z M16,8.714L18.2,15h-4.4L16,8.714z"></path>
</g>
</svg>
<!--
	  icon: tile-tiles-tileview (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="tile-tiles-tileview" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="19" y="3" width="10" height="10"></rect>
	<path d="M17,3h-2H3v12v2v12h12h2h12V17v-2H17V3z M15,27H5V17h10V27z M27,17v10H17V17H27z M5,15V5h10v10H5z"></path>
</g>
</svg>
<!--
	  icon: tile-view (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="tile-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="19" y="3" width="10" height="10"></rect>
	<path d="M17,3h-2H3v12v2v12h12h2h12V17v-2H17V3z M15,27H5V17h10V27z M27,17v10H17V17H27z M5,15V5h10v10H5z"></path>
</g>
</svg>
<!--
	  icon: timer-complete
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="timer-complete" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
	<path d="M17.5,28.8c-0.7,0.1-1.4,0.2-2.1,0.2c-6.6,0-12-5.4-12-12c0-6.6,5.4-12,12-12s12,5.4,12,12c0,0.2,0,0.3,0,0.5
		c0.7,0.3,1.3,0.6,1.9,1.1c0.1-0.5,0.1-1.1,0.1-1.6c0-3.5-1.3-6.7-3.4-9.1l1.1-1.1l-2.2-2.2l-1.2,1.2c-2.1-1.5-4.5-2.5-7.3-2.7V2h1
		V1h-4.1v1h1v1.1C7.2,3.7,1.5,9.7,1.5,17c0,7.7,6.3,14,14,14c1.2,0,2.3-0.2,3.4-0.4C18.3,30.1,17.9,29.5,17.5,28.8z"></path>
	<path d="M22.1,11.2l-0.7-0.7l-4.8,4.8c-0.3-0.2-0.7-0.3-1-0.3c-1.1,0-2.1,0.9-2.1,2.1c0,1.1,0.9,2.1,2.1,2.1
		s2.1-0.9,2.1-2.1c0-0.4-0.1-0.7-0.3-1L22.1,11.2z"></path>
	<path fill="#325c80" d="M24.5,19c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S27.9,19,24.5,19z M23.8,28.2l-0.7-0.7l-0.7-0.7l-2.1-2.1
		l1.4-1.4l2.1,2.1l3.5-3.5l1.4,1.4L23.8,28.2z"></path>
</g>
</svg>
<!--
	  icon: timer-start
  -->
<!--?xml version="1.0" encoding="UTF-8"?-->
<svg id="timer-start" viewBox="0 0 31 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<g>
		<path d="M26.7232298,19.6285686 L24.4062742,18.4690655 C24.5334523,17.7969047 24.6,17.1035743 24.6,16.395 C24.6,10.2555 19.608,5.262 13.4685,5.262 C7.33,5.262 2.3375,10.256 2.3375,16.395 C2.3375,22.5325 7.3305,27.5255 13.4685,27.5255 C14.7024215,27.5255 15.8899917,27.3237962 17,26.9516439 L17,29.5529444 C15.8945969,29.8446072 14.7338255,30 13.5365,30 C6.0365,30 0,23.8955 0,16.395 C0,9.461 5.0685,3.7325 12.0685,2.9025 L12.0685,1.5 L11.5685,1.5 L11.5685,0 L15.5685,0 L15.5685,1.5 L15.0685,1.5 L15.0685,2.9025 C17.0685,3.135 18.728,3.748 20.286,4.6625 L21.2235,3.536 L23.188,5.101 L22.3685,6.1285 C25.2455,8.624 27.109,12.296 27.1095,16.395 C27.1095,17.5087776 26.9756871,18.5917729 26.7232298,19.6285686 Z M19.9255,10.7 C20.2505,11.0255 20.32,11.4825 20.0815,11.722 L15.8285,15.9745 C15.908,16.191 15.9585,16.4215 15.9585,16.6655 C15.9585,17.769 15.0625,18.666 13.9585,18.666 C12.853,18.666 11.958,17.769 11.958,16.6655 C11.958,15.561 12.853,14.6655 13.9585,14.6655 C14.2025,14.6655 14.4335,14.7155 14.6495,14.796 L18.9025,10.5435 C19.142,10.3045 19.599,10.374 19.9255,10.7 Z M19,18 L31,24.0053101 L19,30 L19,18 Z"></path>
	</g>
</svg>
<!--
	  icon: timer-stop
  -->
<!--?xml version="1.0" encoding="UTF-8"?-->
<svg id="timer-stop" viewBox="0 0 31 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<g>
		<path d="M24.6116621,16 C24.3707443,10.102047 19.4985821,5.3785 13.542,5.3785 C7.4315,5.3785 2.4625,10.3485 2.4625,16.458 C2.4625,22.5675 7.4315,27.536 13.542,27.536 C14.5977304,27.536 15.6168317,27.381471 16.5835,27.1014226 L16.5835,29.6529534 C15.6055309,29.8794246 14.5878999,30 13.542,30 C6.075,30 0,23.925 0,16.4585 C0,9.6295 5.0865,3.98 11.6665,3.062 L11.6665,1.6665 L10.8335,1.6665 L10.8335,0 L15.8335,0 L15.8335,1.6665 L15.0005,1.6665 L15.0005,2.9985 C16.943,3.2075 18.757,3.837 20.3665,4.7815 L21.261,3.6605 L23.2155,5.219 L22.401,6.24 C25.1553348,8.63151715 26.9450559,12.1061989 27.0758125,16 L24.6116621,16 Z M19.9675,10.2985487 C20.2925,10.6240487 20.362,11.0810487 20.1235,11.3205487 L15.8705,15.5730487 C15.95,15.7895487 16.0005,16.0200487 16.0005,16.2640487 C16.0005,17.3675487 15.1045,18.2645487 14.0005,18.2645487 C12.895,18.2645487 12,17.3675487 12,16.2640487 C12,15.1595487 12.895,14.2640487 14.0005,14.2640487 C14.2445,14.2640487 14.4755,14.3140487 14.6915,14.3945487 L18.9445,10.1420487 C19.184,9.9030487 19.641,9.9725487 19.9675,10.2985487 Z M18.5835,18 L30.5835,18 L30.5835,30 L18.5835,30 L18.5835,18 Z"></path>
	</g>
</svg>
<!--
	  icon: tools-toolbox (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="tools-toolbox" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M1,26l4,4l17-17l-4-4L1,26z M5,27.172L3.828,26L18,11.828L19.172,13L5,27.172z"></path>
	<polygon points="30,11 28,11 28,9 21,2 13,2 24,13 26,13 26,15 27,16 31,12 	"></polygon>
</g>
</svg>
<!--
	  icon: top (from Action-based)
  -->
<svg version="1.1" id="top" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="6" y="1" width="20" height="4"></rect>
	<polygon points="7.293,18.293 8.707,19.707 15,13.413 15,30 17,30 17,13.415 23.293,19.707 24.707,18.293 15.999,9.586 	"></polygon>
</g>
</svg>
<!--
	  icon: traffic (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="traffic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<circle cx="17" cy="8" r="3"></circle>
	<path d="M17,19c1.656,0,3-1.344,3-3c0-1.656-1.344-3-3-3c-1.656,0-3,1.344-3,3C14,17.656,15.344,19,17,19z M17,14
		c1.103,0,2,0.896,2,2s-0.897,2-2,2s-2-0.896-2-2S15.898,14,17,14z"></path>
	<path d="M17,27c1.656,0,3-1.344,3-3c0-1.656-1.344-3-3-3c-1.656,0-3,1.344-3,3C14,25.656,15.344,27,17,27z M17,22
		c1.103,0,2,0.896,2,2s-0.897,2-2,2s-2-0.896-2-2S15.898,22,17,22z"></path>
	<path d="M28,13h-4v-2l4-6h-4V1H10v4H6l4,6v2H6l4,6v2H6l4,6v4h14v-4l4-6h-4v-2L28,13z M22,29H12V3h10V29z"></path>
</g>
</svg>
<!--
	  icon: underline (from Formatting)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="underline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<rect x="7" y="27" width="18" height="2"></rect>
	<path d="M21,3v13c0,2.762-2.238,5-5,5s-5-2.238-5-5V3H7v13c0,4.971,4.029,9,9,9s9-4.029,9-9V3H21z"></path>
</g>
</svg>
<!--
	  icon: unlock-nonsecure (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="unlock-nonsecure" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="19.293,15.293 16,18.586 12.707,15.293 11.293,16.707 14.586,20 11.293,23.293 12.707,24.707 16,21.414 
		19.293,24.707 20.707,23.293 17.414,20 20.707,16.707 	"></polygon>
	<path d="M16,9c-2.215,0-4.273,0.661-6,1.788V9c0-3.309,2.691-6,6-6c1.654,0,3.154,0.673,4.241,1.759l1.416-1.416
		C20.209,1.895,18.209,1,16,1c-4.419,0-8,3.582-8,8v3.467C6.145,14.436,5,17.082,5,20c0,6.074,4.926,11,11,11
		c6.076,0,11-4.926,11-11S22.076,9,16,9z M16,29c-4.971,0-9-4.029-9-9s4.029-9,9-9c4.971,0,9,4.029,9,9S20.971,29,16,29z"></path>
</g>
</svg>
<!--
	  icon: unread (from TRIRIGA)
  -->
<svg version="1.1" id="unread" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M1,12v16h30V12H1z M29,26H3V14.066L16,21l13-6.934V26z"></path>
</svg>
<!--
	  icon: upload-export (from Action-based)
  -->
<svg version="1.1" id="upload-export" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="15,5.414 15,22 17,22 17,5.414 23.293,11.707 24.707,10.293 16,1.585 7.293,10.293 8.707,11.707 	"></polygon>
	<polygon points="29,19 29,27 3,27 3,19 1,19 1,27 1,31 3,31 29,31 31,31 31,27 31,19 	"></polygon>
</g>
</svg>
<!--
	  icon: user (from TRIRIGA)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="user" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,21c5.523,0,10-4.477,10-10S21.523,1,16,1S6,5.477,6,11S10.477,21,16,21z M16,3c4.411,0,8,3.589,8,8s-3.589,8-8,8
		s-8-3.589-8-8S11.589,3,16,3z"></path>
	<path d="M24,23H8c-2.209,0-4,1.791-4,4v4h24v-4C28,24.791,26.209,23,24,23z"></path>
</g>
</svg>
<!--
	  icon: user-profile (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="user-profile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,21c5.523,0,10-4.477,10-10S21.523,1,16,1S6,5.477,6,11S10.477,21,16,21z M16,3c4.411,0,8,3.589,8,8s-3.589,8-8,8
		s-8-3.589-8-8S11.589,3,16,3z"></path>
	<path d="M24,23H8c-2.209,0-4,1.791-4,4v4h24v-4C28,24.791,26.209,23,24,23z"></path>
</g>
</svg>
<!--
	  icon: video (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="video" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="11,13 11,23 21,18 	"></polygon>
	<path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"></path>
</g>
</svg>
<!--
	  icon: videofile (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="videofile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M3,3v22v4h26v-4V3H3z M5,5h22v18H5V5z"></path>
	<polygon points="10,20 22,14 10,8 	"></polygon>
</g>
</svg>
<!--
	  icon: view (from Action-based)
  -->
<svg version="1.1" id="view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,11c-3.314,0-6,2.685-6,6s2.686,6,6,6c3.315,0,6-2.685,6-6S19.315,11,16,11z M16,19c-1.106,0-2-0.895-2-2s0.894-2,2-2
		s2,0.895,2,2S17.105,19,16,19z"></path>
	<path d="M16,8C9.269,8,4.147,11.625,1,17c3.147,5.375,8.269,9,15,9s11.854-3.625,15-9C27.854,11.625,22.73,8,16,8z M16,24
		c-5.164,0-9.612-2.475-12.642-7c3.029-4.525,7.477-7,12.642-7s9.612,2.475,12.642,7C25.612,21.525,21.164,24,16,24z"></path>
</g>
</svg>
<!--
	  icon: warning (from Action-based)
  -->
<svg version="1.1" id="warning" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M16,3L1,29h30L16,3z M16,7.002L27.537,27H4.463L16,7.002z"></path>
	<polygon points="15,14 15,16 15.5,21 16.5,21 17,16 17,14 	"></polygon>
	<circle cx="16" cy="23" r="1"></circle>
</g>
</svg>
<!--
	  icon: watch-clock-time (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="watch-clock-time" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<polygon points="21.646,9.646 16.354,14.939 13.707,12.293 12.293,13.707 14.939,16.354 13.646,17.646 14.354,18.354 15.646,17.06 
		17.293,18.707 18.707,17.293 17.06,15.646 22.354,10.354 	"></polygon>
	<path d="M27.949,15C27.652,11.402,25.77,8.263,23,6.268V1H9v5.268C5.977,8.445,4,11.988,4,16s1.977,7.555,5,9.732V31h14v-5.268
		c2.77-1.995,4.652-5.135,4.949-8.732H29v-2H27.949z M16,26c-5.514,0-10-4.486-10-10S10.486,6,16,6s10,4.486,10,10S21.514,26,16,26z
		"></path>
</g>
</svg>
<!--
	  icon: watson-globe (from TRIRIGA)
  -->
<svg version="1.1" id="watson-globe" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
	<path d="M16,6c0.3,0,0.6-0.3,0.6-0.6V1.6C16.6,1.3,16.4,1,16,1s-0.6,0.3-0.6,0.6v3.8C15.4,5.8,15.7,6.1,16,6z"></path>
	<path d="M22.1,7.5c0.1,0,0.2,0.1,0.3,0c0.2,0,0.5-0.1,0.6-0.3l1.6-3.4c0-0.1,0-0.2,0-0.3c0-0.2-0.1-0.5-0.3-0.6c-0.1,0-0.2,0-0.3,0
		c-0.2,0-0.4,0.1-0.6,0.3l-1.6,3.4c0,0.1,0,0.2,0,0.3C21.8,7.1,21.9,7.4,22.1,7.5z"></path>
	<path d="M8.9,7.2C9,7.4,9.2,7.5,9.4,7.5c0.1,0,0.2,0,0.3,0C9.9,7.4,10,7.2,10,6.9c0-0.1,0-0.2,0-0.3L8.3,3.2C8.2,3,8,2.9,7.8,2.9
		c-0.1,0-0.2,0-0.3,0C7.3,3,7.2,3.3,7.2,3.5c0,0.1,0,0.2,0.1,0.3L8.9,7.2z"></path>
	<path d="M4.9,11.6c0.2,0,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.2,0.1-0.3c0-0.2-0.1-0.4-0.3-0.5l-3.2-2c-0.1,0-0.2-0.1-0.3-0.1
		c-0.2,0-0.4,0.1-0.5,0.3C1,8.8,1,8.8,1,9c0,0.2,0.1,0.4,0.3,0.5l3.2,2C4.6,11.5,4.7,11.6,4.9,11.6z"></path>
	<path d="M30.9,8.6c-0.1-0.2-0.3-0.3-0.5-0.3c-0.1,0-0.3,0-0.3,0.1l-3.2,2c-0.2,0.1-0.3,0.3-0.3,0.5c0,0.1,0,0.3,0.1,0.3
		c0.1,0.2,0.3,0.3,0.5,0.3c0.1,0,0.3,0,0.3-0.1l3.2-2C30.9,9.4,31,9.2,31,9C31,8.8,31,8.7,30.9,8.6z"></path>
	<path d="M27.5,17.6L27.5,17.6C27.5,17.6,27.5,17.5,27.5,17.6C26.6,12,21.8,7.8,16,7.8C9.6,7.8,4.4,13,4.4,19.4c0,0.6,0,1.2,0.1,1.8
		l0,0c0,0,0,0,0,0.1C5.5,26.8,10.3,31,16,31c3,0,5.8-1.2,7.9-3.1c0.1-0.1,0.3-0.2,0.4-0.4l0,0c2.1-2.1,3.4-5,3.4-8.2
		C27.7,18.8,27.6,18.2,27.5,17.6z M23.7,26.8c-0.1,0.2-0.3,0.3-0.5,0.4c-1.5,1.1-4,1.1-6.6,0.1c1-0.5,2.1-1.1,3.1-1.8
		c0.2,0.2,0.5,0.3,0.9,0.3c0.9,0,1.5-0.7,1.5-1.5c0-0.2-0.1-0.4-0.1-0.6c0.9-0.9,1.6-1.8,2.2-2.7C25,23.3,24.9,25.5,23.7,26.8z
		 M8.4,12c0.1-0.1,0.1-0.1,0.2-0.2c1.4-1.4,4.1-1.4,6.8-0.1c-1.3,0.6-2.5,1.4-3.7,2.4c-0.1,0.1-0.2,0.2-0.3,0.2
		c-0.1-0.1-0.3-0.1-0.5-0.1c-0.5,0-0.8,0.4-0.8,0.8c0,0.1,0,0.3,0.1,0.4c-0.9,1-1.7,2-2.4,3C7,15.8,7.1,13.4,8.4,12z M25,16.3
		c-0.5-0.1-1-0.1-1.5-0.1c-0.1-0.7-0.7-1.3-1.4-1.3c-0.2,0-0.3,0-0.5,0.1c-0.2-0.2-0.4-0.4-0.6-0.6c-0.4-0.4-0.8-0.8-1.2-1.1
		c0-0.8,0-1.6,0-2.2c1.8-0.1,3.4,0.4,4.3,1.4c0.2,0.2,0.4,0.5,0.6,0.7C25.1,14,25.2,15.1,25,16.3z M26,15.7c0.1,0.3,0.2,0.6,0.3,0.9
		c-0.1,0-0.2-0.1-0.4-0.1C26,16.2,26,15.9,26,15.7z M21.3,22.9c-0.2-0.1-0.5-0.2-0.8-0.2c-0.9,0-1.5,0.7-1.5,1.5
		c0,0.2,0,0.4,0.1,0.6c-0.8,0.5-1.5,1-2.3,1.4c0.5-1.3,1.1-2.7,1.5-4.4c1.3-0.3,3.2-0.7,4.9-1.2C22.6,21.4,22,22.2,21.3,22.9z
		 M12.9,25.8c0.6,0.5,1.2,0.9,1.8,1.2c-0.6,0.2-1.2,0.3-1.8,0.4C12.9,27,12.9,26.4,12.9,25.8z M11,23c-0.1,0-0.3,0-0.4,0.1
		c-0.1-0.1-0.2-0.3-0.3-0.4c0.7,0,1.4-0.1,2-0.1c-0.1,0.7-0.2,1.4-0.3,2c-0.1-0.1-0.3-0.2-0.4-0.3c0.1-0.1,0.1-0.2,0.1-0.4
		C11.8,23.4,11.5,23,11,23z M10.5,15.6c0.1,0.1,0.3,0.2,0.5,0.2c0.5,0,0.8-0.4,0.8-0.8c0-0.2,0-0.3-0.1-0.4c0.1-0.1,0.1-0.1,0.2-0.2
		c1.1-0.9,2.2-1.6,3.4-2.1c-0.4,0.9-0.8,1.9-1.2,3.1c-1,0-1.7,0.8-1.7,1.8c0,0.1,0,0.3,0,0.4c-1.3,0.3-2.7,0.6-4.1,1.1
		C8.9,17.5,9.6,16.5,10.5,15.6z M19.3,12.8c-0.7-0.5-1.4-1-2-1.3c0.7-0.2,1.4-0.3,2-0.4C19.3,11.6,19.3,12.2,19.3,12.8z M17,21.1
		c-0.2-0.4-0.7-0.7-1.2-0.7c-0.7,0-1.2,0.5-1.3,1.1c-0.4,0-0.7,0.1-1.1,0.1c0.2-0.9,0.4-1.9,0.6-2.8c1,0,1.7-0.8,1.7-1.7
		c0.4-0.1,0.7-0.1,1-0.1c0.1,0.2,0.3,0.4,0.6,0.4c0.3,0,0.6-0.3,0.6-0.6c0.3,0,0.6-0.1,0.9-0.1c-0.1,0.4-0.1,0.8-0.2,1.2
		c-0.4,0-0.7,0.4-0.7,0.8c0,0.3,0.2,0.6,0.4,0.7c-0.1,0.2-0.1,0.4-0.2,0.7c-0.1,0.3-0.1,0.5-0.2,0.8C17.8,21,17.4,21,17,21.1z
		 M18.8,20L18.8,20c0-0.2,0.1-0.3,0.1-0.5c0.5,0,0.8-0.4,0.8-0.8c0-0.3-0.2-0.6-0.5-0.7c0.1-0.4,0.2-0.9,0.2-1.3
		c0.4,0,0.9,0,1.3-0.1c0.2,0.6,0.7,1.1,1.4,1.1c0.1,0,0.3,0,0.4-0.1c0.4,0.6,0.8,1.2,1.1,1.8c-1.3,0.5-2.9,0.9-4.9,1.3
		C18.7,20.6,18.7,20.3,18.8,20z M20.7,16.3c-0.4,0-0.8,0.1-1.2,0.1c0.1-0.6,0.2-1.2,0.2-1.8c0.2,0.2,0.4,0.4,0.6,0.5
		c0.2,0.2,0.4,0.4,0.5,0.6C20.8,15.8,20.7,16,20.7,16.3z M19,16.4c-0.3,0-0.6,0.1-0.9,0.1c-0.1-0.2-0.3-0.4-0.6-0.4
		c-0.3,0-0.6,0.3-0.6,0.6c-0.5,0.1-0.8,0.1-1,0.1c-0.1-0.5-0.4-0.9-0.8-1.2c0.4-1.2,0.9-2.5,1.3-3.5c1,0.5,1.9,1.2,2.9,1.9
		C19.2,14.8,19.1,15.6,19,16.4z M8.2,19.2c1.1-0.5,2.6-1,4.3-1.4c0.1,0.3,0.4,0.6,0.7,0.8c0,0,0,0.1,0,0.1c-0.2,1.1-0.4,2.1-0.6,3
		c-1.1,0.1-2.1,0.1-2.9,0.1C9,21,8.5,20.1,8.2,19.2z M9.1,21.8c-0.8,0-1.5-0.1-2-0.2c0.1-0.7,0.4-1.4,0.7-2.1
		C8.1,20.3,8.6,21.1,9.1,21.8z M13.3,22.6c0.5,0,1-0.1,1.5-0.2c0.2,0.3,0.6,0.5,1.1,0.5c0.6,0,1-0.4,1.2-0.9c0.2,0,0.4-0.1,0.7-0.1
		c-0.5,1.6-1.2,3.3-1.9,4.6c-0.2,0.1-0.4,0.1-0.6,0.2c-0.8-0.4-1.6-0.9-2.4-1.5C13.1,24.5,13.2,23.5,13.3,22.6z M23.3,17.1
		c0.1-0.1,0.1-0.2,0.2-0.3c0.5,0,1,0.1,1.4,0.2c-0.1,0.6-0.4,1.2-0.6,1.8C24,18.1,23.6,17.6,23.3,17.1z M20.8,10.3
		c-0.3,0-0.7,0-1,0.1c-0.1-0.4-0.1-0.7-0.2-1c0.8,0.3,1.5,0.6,2.2,1C21.4,10.3,21.1,10.3,20.8,10.3z M18.6,9.1L18.6,9.1
		c0.3,0.1,0.4,0.6,0.5,1.3c-0.7,0.1-1.5,0.3-2.3,0.6C17.5,9.8,18.1,9.1,18.6,9.1z M6.4,21.5c-0.5-0.1-0.8-0.3-0.9-0.5l0,0h0
		c-0.2-0.3,0.4-0.8,1.6-1.4C6.9,20.3,6.6,20.9,6.4,21.5z M6.2,22.4c0,0.3-0.1,0.6-0.1,0.8c-0.1-0.3-0.2-0.6-0.3-1
		C5.9,22.3,6.1,22.4,6.2,22.4z M7,22.6c0.8,0.1,1.8,0.2,2.8,0.2c0.2,0.2,0.3,0.4,0.5,0.6c-0.1,0.1-0.2,0.3-0.2,0.5
		c0,0.4,0.3,0.8,0.8,0.8c0.2,0,0.3-0.1,0.5-0.1c0.2,0.2,0.4,0.4,0.6,0.5c-0.1,1-0.1,1.8-0.1,2.5c-1.4,0.1-2.6-0.1-3.4-0.7
		c-0.2-0.2-0.5-0.5-0.7-0.7l0,0C7.1,25.3,6.8,24,7,22.6z M12.1,28.5c0.1,0.3,0.1,0.6,0.2,0.8c-0.6-0.2-1.2-0.5-1.7-0.8
		C11,28.5,11.5,28.6,12.1,28.5z M13.5,29.7L13.5,29.7c-0.3-0.2-0.4-0.6-0.5-1.2c0.7-0.1,1.5-0.3,2.3-0.6
		C14.5,29.1,13.9,29.9,13.5,29.7z M25.8,17.2c0.4,0.1,0.6,0.3,0.7,0.4c0,0.1,0,0.1,0,0.2l0,0c0,0.2-0.4,0.6-1.3,1
		C25.5,18.2,25.7,17.7,25.8,17.2z M17.3,8.8c-0.4,0.4-0.9,1.1-1.4,2c-1.6-0.7-3.1-1-4.5-1c1.4-0.7,3-1.1,4.7-1.1
		C16.5,8.8,16.9,8.8,17.3,8.8z M6.5,14.7c0,1.3,0.3,2.7,0.9,4.2c-0.8,0.3-1.5,0.6-2,1c0-0.2,0-0.3,0-0.5C5.4,17.7,5.8,16.1,6.5,14.7
		z M16,30c-0.5,0-1,0-1.5-0.1c0.5-0.5,1-1.2,1.5-2.2c1.5,0.7,3.1,1.1,4.4,1.2v0c0.1,0,0.2,0,0.3,0C19.4,29.6,17.7,30,16,30z
		 M25.6,24c0-1.2-0.2-2.6-0.8-4c0.7-0.3,1.4-0.6,1.8-1c0,0.1,0,0.2,0,0.4C26.7,21,26.3,22.6,25.6,24z"></path>
</g>
</svg>
<!--
	  icon: wikis (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="wikis" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<path d="M16,2C8.268,2,2,8.268,2,16s6.268,14,14,14s14-6.268,14-14S23.732,2,16,2z M20.928,20.221L16.707,16l8.111-8.111
	c0.002,0.002,0.004,0.004,0.006,0.007C25.372,12.539,23.982,16.953,20.928,20.221z M11.072,11.779L15.293,16l-8.111,8.111
	c-0.002-0.002-0.004-0.004-0.006-0.007C6.628,19.461,8.018,15.047,11.072,11.779z M24.111,7.182L16,15.293l-4.225-4.225
	c2.775-2.592,6.443-4.027,10.406-4.027c0.635,0,1.273,0.05,1.91,0.123C24.098,7.17,24.104,7.176,24.111,7.182z M7.889,24.818
	L16,16.707l4.225,4.225c-2.775,2.592-6.443,4.027-10.405,4.027c-0.635,0-1.274-0.05-1.911-0.123
	C7.902,24.83,7.896,24.824,7.889,24.818z M22.723,6.065c-0.181-0.006-0.361-0.024-0.541-0.024c-4.229,0-8.148,1.54-11.113,4.32
	l-3.18-3.18C10.027,5.213,12.871,4,16,4C18.489,4,20.803,4.763,22.723,6.065z M7.182,7.889l3.174,3.174
	c-2.895,3.09-4.421,7.286-4.296,11.652C4.76,20.797,4,18.486,4,16C4,12.871,5.213,10.027,7.182,7.889z M9.277,25.935
	c0.181,0.006,0.362,0.024,0.542,0.024c4.229,0,8.148-1.539,11.112-4.32l3.18,3.18C21.973,26.787,19.129,28,16,28
	C13.511,28,11.197,27.237,9.277,25.935z M24.818,24.111l-3.174-3.174c2.895-3.09,4.421-7.286,4.296-11.652
	C27.24,11.203,28,13.514,28,16C28,19.129,26.787,21.973,24.818,24.111z"></path>
</svg>
<!--
	  icon: workspace (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="workspace" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M1,6v2h2v18h12V8h12v18h2V8h2V6H1z M13,14H5v-4h8V14z M5,24v-8h8v8H5z"></path>
	<circle cx="9" cy="12" r="1"></circle>
</g>
</svg>
<!--
	  icon: world-globe (from Object-based)
  -->
<!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.1" id="world-globe" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M8.575,18.925C10.625,20.975,13.312,22,16,22c2.531,0,5.055-0.922,7.054-2.74l0.018,0.018l0.707-0.707l-0.018-0.019
		c3.748-4.119,3.645-10.497-0.336-14.477C21.375,2.025,18.688,1,16,1c-2.531,0-5.055,0.922-7.054,2.74L8.929,3.722L8.222,4.429
		l0.018,0.019C4.491,8.567,4.595,14.944,8.575,18.925z M16,3c2.271,0,4.405,0.885,6.011,2.489c3.194,3.195,3.3,8.316,0.335,11.649
		L10.36,5.152C11.917,3.767,13.896,3,16,3z M21.64,17.848C20.083,19.233,18.104,20,16,20c-2.271,0-4.405-0.885-6.011-2.489
		c-3.194-3.194-3.3-8.315-0.335-11.649L21.64,17.848z"></path>
	<path d="M26.253,1.247l-1.414,1.414C27.2,5.022,28.5,8.16,28.5,11.5s-1.3,6.479-3.661,8.839C22.479,22.699,19.34,24,16,24
		s-6.479-1.301-8.839-3.661l-1.414,1.414C8.484,24.492,12.126,26,16,26s7.516-1.508,10.253-4.247
		c2.738-2.738,4.247-6.38,4.247-10.253S28.991,3.985,26.253,1.247z"></path>
	<rect x="11" y="28" width="10" height="3"></rect>
</g>
</svg>
<!--
	  icon: zoomin (from Action-based)
  -->
<svg version="1.1" id="zoomin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M12,1C5.926,1,1,5.926,1,12c0,6.074,4.926,11,11,11c6.074,0,11-4.926,11-11C23,5.926,18.074,1,12,1z M12,21
		c-4.962,0-9-4.038-9-9s4.038-9,9-9c4.962,0,9,4.038,9,9S16.962,21,12,21z"></path>
	<rect x="23.879" y="21.05" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -10.7696 26)" width="4.243" height="9.899"></rect>
	<circle cx="21" cy="21" r="1"></circle>
	<polygon points="13,6 11,6 11,11 6,11 6,13 11,13 11,18 13,18 13,13 18,13 18,11 13,11 	"></polygon>
</g>
</svg>
<!--
	  icon: zoomout (from Action-based)
  -->
<svg version="1.1" id="zoomout" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
<g>
	<path d="M12,1C5.926,1,1,5.926,1,12c0,6.074,4.926,11,11,11c6.074,0,11-4.926,11-11C23,5.926,18.074,1,12,1z M12,21
		c-4.963,0-9-4.038-9-9s4.037-9,9-9c4.963,0,9,4.038,9,9S16.963,21,12,21z"></path>
	<rect x="23.879" y="21.05" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -10.7696 26)" width="4.243" height="9.899"></rect>
	<circle cx="21" cy="21" r="1"></circle>
	<rect x="6" y="11" width="12" height="2"></rect>
</g>
</svg>
</iron-iconset-svg>
`;

addDomNodes(domNodesContainer);