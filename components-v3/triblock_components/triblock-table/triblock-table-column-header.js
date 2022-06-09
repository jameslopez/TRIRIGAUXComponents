import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '../@polymer/polymer/lib/legacy/class.js';
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriPlatAccessibilityBehavior } from "../triplat-accessibility-behavior/triplat-accessibility-behavior.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import "./triblock-table-column-header-cell.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

class TriblockTableColumnHeader extends mixinBehaviors([TriDirBehavior, TriPlatAccessibilityBehavior], PolymerElement) {
	static get template() {
		return html `
			<style include="tristyles-theme">
				:host {
					display: block;
					position: relative;
					background-color: var(--triblock-table-background-color, var(--tri-primary-content-background-color));
					color: var(--triblock-table-color, var(--tri-primary-content-color));
					font-size: var(--triblock-table-font-size, 14px);
					overflow: auto;
				}

				:host([fixed-header]){
					position: absolute;
					z-index: 1;
					width: 100%;
				}
				
				div[table-header] {
					@apply --layout-vertical;
					min-height: 0;
				}
				
				div[table-header][fixed-header] {
					position: absolute;
					z-index: 1;
					width: 100%;
				}

				div[header-row] {
					@apply --layout-horizontal;
					background-color: var(--triblock-table-header-background-color, var(--tri-primary-content-background-color));
					color: var(--triblock-table-header-color, var(--ibm-gray-50));
					border-bottom: 1px solid var(--triblock-table-header-row-border-bottom-color, var(--ibm-gray-30));
					
					@apply --triblock-table-header;
				}
								
				:host([dir="rtl"]) .row-collapse-icon {
					transform: scaleX(-1);
				}

				div[column]{
					min-width: 45px;
					max-width: 45px;
					width: 45px;
					height 30px;
					margin: 5px 0px 5px 0px;
				}

				div[header-column]:not(:first-child):not([merge-with-previous-column])::before {
					border-left: 1px solid var(--triblock-table-column-divider-color, var(--tri-primary-content-accent-color));
					content: "";
					position: absolute;
					top: 9px;
					height: 22px;
					
					@apply --triblock-table-column-divider;
				}
			</style>
			
			<div table-header="" id="tableHeader" role="rowgroup" hidden\$="[[hidden]]">
				<div header-row="" id="headerRow" role="row">
					<template is="dom-if" if="[[indexed]]">
						<div 
						column="" 
						header-column="" 
						role="columnheader" 
						merge-with-previous-column=""
						>
						</div>
					</template>
					<template is="dom-if" if="[[_showExpandRowIcon(rowDetail, alwaysShowRowDetail)]]">
						<div  
						column="" 
						header-column="" 
						role="columnheader"
						merge-with-previous-column=""
						>
						</div>
					</template>
					<template is="dom-if" if="[[selectable]]">
						<div 
						column="" 
						header-column="" 
						role="columnheader"
						merge-with-previous-column=""
						>
						</div>
					</template>
					<template id="repeater" is="dom-repeat" items="[[columns]]" as="column">
						<triblock-table-column-header-cell 
						column="[[column]]"
						first-data-column-id="[[firstDataColumnId]]"
						hidden-by-col-prop="[[column.hide]]"
						style="[[_computeColumnStyle(column)]]"
						sortable="[[_computeSortable(sortable, column.sortable)]]"
						sort-descending="{{sortDescending}}" 
						sort-property="{{sortProperty}}"
						sort-type="{{sortType}}"
						merge-with-previous-column="[[!_hasNonDataHeaderCells(indexed, rowDetail, alwaysShowRowDetail, selectable)]]"
						disable-default-tooltips="[[disableDefaultTooltips]]"
						></triblock-table-column-header-cell>
					</template>
				</div>
			</div>`
		}
	
		static get properties() {
			return {
				alwaysShowRowDetail:{
					type: Boolean,
					value: false
				},
				
				columns: {
					type: Array
				},

				firstDataColumnId: {
					type: Number,
					notify: true
				},
				
				fixedHeader: {
					type: Boolean,
					value: false,
					reflectToAttribute: true
				},
				
				indexed: {
					type: Boolean,
					value: false
				},
				
				rowDetail:{
					type:Object
				},
				
				selectable: {
					type: Boolean,
					value: false
				},
				
				sortable: {
					type: Boolean,
					value: false
				},

				sortColumns: {
					type: Array
				},
				
				sortDescending: {
					type: Boolean,
					value: false,
					notify: true
				},

				sortProperty: {
					type: String,
					value: "",
					notify: true
				},

				sortType: {
					type: String,
					value: "",
					notify: true
				},

				disableDefaultTooltips: {
					type: Boolean,
					value: false
				}
				
			}
		}

		ready() {
			super.ready();
			setTimeout(() => {
				let firstInstance = dom(this.root).querySelector("triblock-table-column-header-cell");
				if (firstInstance) {
					this.set("firstDataColumnId", firstInstance.columnId);
				}
			}, 300);
		}
						
		_showExpandRowIcon(rowDetail, alwaysShowRowDetail){
			return rowDetail && !alwaysShowRowDetail;
		}
			
		_computeColumnStyle(column){
			if(column._columnStyle!=""){
				return column._columnStyle;
			}
			else return "";
		}

		_hasNonDataHeaderCells(indexed, rowDetail, alwaysShowRowDetail, selectable) {
			return indexed || this._showExpandRowIcon(rowDetail, alwaysShowRowDetail) || selectable;
		}

		_computeSortable(sortable, colSortable) {
			return sortable || colSortable;
		}

}

customElements.define('triblock-table-column-header', TriblockTableColumnHeader);