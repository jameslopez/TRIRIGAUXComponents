/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { addDomStyleModule } from "../tricore-util/tricore-util.js";

const triplatGraphicPinClasses = `
<dom-module id="triplat-graphic-pin-classes">
	<template>
		<style>

			.tri-pin-icon-1 {
				fill: var(--triplat-graphic-pin-color-1, var(--ibm-gray-60));
			}

			.tri-pin-icon-2 {
				fill: var(--triplat-graphic-pin-color-2, var(--ibm-gray-60));
			}

			.tri-pin-icon-3 {
				fill: var(--triplat-graphic-pin-color-3, var(--ibm-gray-60));
			}

			.tri-pin-icon-4 {
				fill: var(--triplat-graphic-pin-color-4, var(--ibm-gray-60));
			}

			.tri-pin-icon-5 {
				fill: var(--triplat-graphic-pin-color-5, var(--ibm-gray-60));
			}

			.tri-pin-tooltip {
				--internal-pin-tooltip-bg-color: var(--triplat-graphic-pin-tooltip-bg-color, var(--tri-primary-content-background-color));
				--internal-pin-tooltip-text-color: var(--triplat-graphic-pin-tooltip-text-color, var(--ibm-gray-60));
				--internal-pin-tooltip-border-color: var(--triplat-graphic-pin-tooltip-border-color, var(--tri-primary-light-color));
				--internal-pin-tooltip-close-button-color: var(--triplat-graphic-pin-tooltip-close-button-color, var(--ibm-gray-60));
				--internal-pin-tooltip-divider-line-color: var(--triplat-graphic-pin-tooltip-divider-line-color, var(--ibm-gray-10));
				--internal-pin-tooltip: {
					@apply --triplat-graphic-pin-tooltip;
				};
				--internal-pin-tooltip-container: {
					@apply --triplat-graphic-pin-tooltip-container;
				};
			}

			.tri-pin-outline[selected] {
				stroke: var(--triplat-graphic-pin-tooltip-border-color, var(--tri-primary-light-color));
				stroke-width: 2px;
			}
		
		</style>
	</template>
</dom-module>
`;

addDomStyleModule(triplatGraphicPinClasses, "triplat-graphic/triplat-graphic-pin-classes.js");