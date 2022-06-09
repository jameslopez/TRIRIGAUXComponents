/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */

import { addDomStyleModule } from "../../tricore-util/tricore-util.js";

const styles = `
<dom-module id="availability-styles">
	<template>
		<style>
			/* Should override this style for the treegrid links */
			a {
				color: #000000!important;
			}
			
			.TUXGanttLineTimeSelector {
				background-color: #00B4A0;
				opacity:0.4;
				width:1px;
			}
			
			
			.TUXGanttLineTimeBorder {
				background-color:#00665B;
				width:1px;
			}
			
			.TUXGanttBackUnavailable {
				background-color:#ECECEC;
			}
			
			.TUXGanttTentativeIn {
				background-color:#AEAEAE;
			}
			
			.TUXGanttTentativeOut {
				border-color:#AEAEAE;
			}
			
			.TUXGanttSimpleIn {
				background-color:#AEAEAE;
			}
			
			.TUXGanttSimpleOut {
				border-color:#AEAEAE;
			}
			
			.TUXGanttSeriesIn {
				background-color:#AEAEAE;
			}
			
			.TUXGanttSeriesOut {
				border-color:#AEAEAE;
			}
			
			.TUXGanttExceptionIn {
				background-color:#AEAEAE;
			}
			
			.TUXGanttExceptionOut {
				border-color:#AEAEAE;
			}
			
			.TUXGanttMark90 {
				background-color:#D6CA42;
				margin-top:4px!important; 
				height:21px!important; 
				margin-bottom:-25px!important;
			}
			
			.TUXGanttMark80 {
				background-color:#D6CA42;
				margin-top:25px!important; 
				height:21px!important; 
				margin-bottom:-46px!important;
			}
		</style>
	</template>
</dom-module>
`;

addDomStyleModule(styles, "triplat-availability/styles/tristyles-availability.js");