/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { mixinBehaviors } from '../@polymer/polymer/lib/legacy/class.js';
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

import "../@polymer/iron-list/iron-list.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../@polymer/paper-radio-button/paper-radio-button.js";
import "../@polymer/paper-tooltip/paper-tooltip.js";
import "../@polymer/iron-icons/hardware-icons.js";
import "../@polymer/iron-icons/iron-icons.js";
import "../@polymer/iron-icon/iron-icon.js";

import { TriPlatAccessibilityBehavior } from "../triplat-accessibility-behavior/triplat-accessibility-behavior.js";
import { IronResizableBehavior } from "../@polymer/iron-resizable-behavior/iron-resizable-behavior.js";
import "../triplat-icon/ibm-icons.js";

import './triblock-table-cell-instance-manager.js';
import "./triblock-table-row-detail-instance-manager.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

class TriblockTableBody extends mixinBehaviors([TriDirBehavior, TriPlatAccessibilityBehavior, IronResizableBehavior], PolymerElement) {
	static get template() {
		return html`
			<style include="tristyles-theme">
				
				iron-list[table-body] {
					@apply --layout-vertical;
				}

				div[row-container] {
					@apply --layout-vertical;

					@apply --triblock-table-row-container;
				}
				div[row-container][index=even] {
					background-color: var(--triblock-table-even-row-background-color, white);
				}
				div[row-container][index=odd] {
					background-color: var(--triblock-table-odd-row-background-color, var(--ibm-neutral-2));
				}
				div[row-container][clickable]:hover {
					cursor: pointer;
					background-color: var(--triblock-table-row-hover-background-color, var(--ibm-neutral-4));

					@apply --triblock-table-row-hover;
				}
				div[row-container][clickable]:focus {
					cursor: pointer;
					outline: none;
					background-color: var(--triblock-table-row-hover-background-color, var(--ibm-neutral-4));

					@apply --triblock-table-row-hover;
				}
				div[row-container][selected] {
					cursor: pointer;
					background-color: var(--triblock-table-row-selected-background-color, var(--tri-primary-light-color)) !important;

					@apply --triblock-table-row-selected;
				}
				div[row-container]:focus {
					outline-color: var(--triblock-table-focus-outline-color, var(--tri-primary-color-20));
				}

				div[row] {
					@apply --layout-horizontal;
					background-color: inherit;
					flex-shrink: 0;

					@apply --triblock-table-row;
				}
				div[row][bolded-row] {
					font-weight: bold;
				}

				div[column] {
					@apply --layout-flex;
					@apply --layout-horizontal;
					@apply --layout-center;
					min-width: 0;
					min-height: 0;
					background-color: inherit;
					position: relative;
					overflow: hidden;

					@apply --triblock-table-column;
				}
				div[column][hidden-by-screen-width] {
					display: none !important;
				}
				div[column][hidden-by-col-prop] {
					display: none !important;
				}
				div[column]:not([header-column])[merge-with-previous-column]::before {
					border-left: 1px solid var(--triblock-table-column-divider-color, var(--tri-primary-content-accent-color));
					content: "";
					position: absolute;
					top: 20px;
					height: 24px;
					
					@apply --triblock-table-column-divider;
				}

				div[cell] {
					@apply --layout-flex;
					@apply --layout-horizontal;
					@apply --layout-center;
					background-color: inherit;
					overflow: hidden;
					
					@apply --triblock-table-cell;
				}
				div[cell]:not([remove-default-cell-padding]):not([icon-cell]) {
					height: 44px;
					padding: 10px;
				}
				div[cell][remove-default-cell-padding] {
					height: 64px;
					padding: 0;
				}
				div[cell][icon-cell] {
					@apply --layout-center-justified;
					height: 64px;
					padding: 0;
				}

				div[cell] ::slotted(div) {
					@apply --layout-flex;
					@apply --layout-horizontal;
					@apply --layout-center;
				}

				.row-collapse-icon {
					height: 44px;
					width: 44px;
					padding: 6px;
					cursor: pointer;
					
					@apply --triblock-table-row-collapse-icon;
				}

				.row-collapse {
					flex-shrink: 0;
					display: none;
				}
				.row-collapse[opened] {
					display: block;
				}

				.row-detail-container {
					border-top: 1px solid var(--triblock-table-row-detail-divider-color, var(--tri-primary-content-accent-color));
					margin: 0 10px;
					padding: 20px 0;
					overflow: hidden;

					@apply --triblock-table-row-detail;
				}

				.row-detail-container ::slotted(div) {
					@apply --layout-flex;
				}

				:host([dir="rtl"]) .row-collapse-icon {
					transform: scaleX(-1);
				}

				.selection-checkbox {
					--paper-checkbox-label-spacing: 0px;
					--paper-checkbox-size: 24px;
					--paper-checkbox-ink-size: 45px;

					@apply --triblock-table-selection-checkbox;
				}

				.selection-radio-button {
					--paper-radio-button-label-spacing: 0px;
					margin-bottom: 1px; /* offsetting weird 1px space above radio buttons being applied from within paper-radio-button */

					@apply --triblock-table-selection-radio-button;
				}

				.icon-column {
					min-width: 45px; 
					max-width: 45px; 
					width: 45px;
				}
			</style>
			<iron-list table-body="" id="tableBodyList" role="rowgroup" items="{{data}}" index-as="rowIndex">
				<template>
					<div id="rowContainerId" row-container selected\$="[[_computeRowContainerSelected(item, selectedProperty, _selectedItem, _selectedItems)]]" index\$='[[_computeRowIndex(rowIndex)]]' on-tap="_onRowTap" on-mouseover="_onRowMouseOver" on-keypress="_onRowTap" aria-label\$="[[_computeRowAriaLabel(item)]]" tabindex\$="[[_computeTabIndex(removeRowFocusAndHover, tabIndex)]]" clickable\$="[[!removeRowFocusAndHover]]">
						<div row role="row" bolded-row\$="[[_computeBoldRow(item, boldRowProperty)]]">
							<template is="dom-if" if="[[indexed]]">
								<div class="icon-column" column role="gridcell">
									<div cell icon-cell>
										<span>[[_addOne(rowIndex)]]</span>
									</div>
								</div>
							</template>
							<template is="dom-if" if="[[showExpandIcon]]">
								<div class="icon-column" column merge-with-previous-column\$="[[_computedExpandMerge(indexed)]]" role="gridcell">
									<div cell icon-cell>
										<paper-icon-button class="row-collapse-icon" primary icon='[[_computeCollapseIcon(item.rowCollapseOpened)]]'
											on-tap='_onRowCollapseTap' tabindex\$='[[tabIndex]]'>
										</paper-icon-button>
									</div>
								</div>
							</template>
							<template is="dom-if" if="[[selectable]]">
								<div class="icon-column" column merge-with-previous-column\$="[[_computedSelectMerge(indexed, showExpandIcon)]]" role="gridcell">
									<div cell icon-cell>
										<template is="dom-if" if="[[multiSelect]]">
											<paper-checkbox class="selection-checkbox" checked="[[_computeRowContainerSelected(item, selectedProperty, _selectedItem, _selectedItems)]]" noink tabindex$="[[tabIndex]]"
												on-tap='_onRowSelectCheckboxTap'>
											</paper-checkbox>
										</template>
										<template is="dom-if" if="[[!multiSelect]]">
											<paper-radio-button class="selection-radio-button" checked="[[_computeRowContainerSelected(item, selectedProperty, _selectedItem, _selectedItems)]]" noink tabindex$="[[tabIndex]]" 
												on-tap='_onRowSelectRadioButtonTap'>
											</paper-radio-button>
										</template>
									</div>
								</div>
							</template>
							<template id="rowColumnsTemplateId" is="dom-repeat" items="[[columns]]" as="column">
								<div id="columnId" column role="gridcell" column-id\$="[[column.columnId]]"
									merge-with-previous-column\$="[[column.mergeWithPreviousColumn]]"
									hidden-by-col-prop\$="[[column.hide]]" style\$="[[_computeColumnStyle(column)]]">
									<div id="cellId" cell style\$="[[_computeBodyCellStyle(column)]]"
										remove-default-cell-padding\$="[[column.removeDefaultCellPadding]]">
										<template is="dom-if" if="[[_isEmptyCellValue(item, column)]]">
											<span>[[column.defaultText]]</span>
										</template>
										<slot id="cellSlot"></slot>
										<triblock-table-cell-instance-manager id="cellInstanceId" row-data="{{item}}" column="[[column]]" column-id="[[column.columnId]]" index="{{rowIndex}}" tab-index="{{tabIndex}}"
											bind-index-as="[[bindIndexAs]]" bind-item-as="[[bindItemAs]]" bind-value-as="[[bindValueAs]]"
											property="[[column.property]]" default-value="[[column.defaultValue]]"
											hidden-by-col-prop="[[column.hide]]" table-id="[[tableId]]" table-body-ref="[[_tableBodyRef]]">
										</triblock-table-cell-instance-manager>
									</div>
								</div>
							</template>
						</div>
						<div class="row-collapse" opened\$="[[_computeCollapseOpen(alwaysShowRowDetail, item.rowCollapseOpened, rowDetail)}}">
							<div id="rowDetailId" class="row-detail-container">
								<slot id="rowDetailSlot"></slot>
								<triblock-table-row-detail-instance-manager row-data="{{item}}" index="{{rowIndex}}" tab-index="{{tabIndex}}" 
									bind-index-as="[[bindIndexAs]]" bind-item-as="[[bindItemAs]]" detail-id="[[rowDetail.detailId]]"
									row-detail="[[rowDetail]]" table-id="[[tableId]]" table-body-ref="[[_tableBodyRef]]">
								</triblock-table-row-detail-instance-manager>
							</div>
						</div>
					</div>
				</template>
			</iron-list>

			<array-selector id="selector" items="{{data}}" selected="{{selected}}" multi="{{multiSelect}}" toggle=""></array-selector>
		`
	}

	get _tableBodyList() {
		return dom(this.root).querySelector("#tableBodyList");
	}

	static get properties() {
		return {
			alwaysShowRowDetail: {
				type: Boolean
			},

			bindIndexAs: {
				type: String
			},

			bindItemAs: {
				type: String
			},

			bindValueAs: {
				type: String
			},

			boldRowProperty: {
				type: String
			},

			data: {
				type: Array,
				notify: true,
				observer: "_notifyResize"
			},

			expandOnRowTap: {
				type: Boolean
			},

			fixedHeader: {
				type: Boolean,
				observer: "_onFixedHeaderChange",
				reflectToAttribute: true
			},

			indexed: {
				type: Boolean
			},

			multiSelect: {
				type: Boolean
			},
			
			removeRowFocusAndHover: {
				type: Boolean
			},

			scroller: {
				type: Object
			},

			selectable: {
				type: Boolean
			},

			selectedProperty: {
				type: String
			},

			selectOnRowTap: {
				type: Boolean
			},

			showExpandIcon: {
				type: Boolean
			},

			/**
			 * Callback function used to determine the aria-label value of each table row.
			 */
			rowAriaLabelCallback: {
				type: Object
			},

			rowDetail: {
				type: Object
			},

			selected: {
				type: Object,
				notify: true
			},

			_selectedItem: {
				type: Object,
				notify: true,
				value: null
			},

			_selectedItems: {
				type: Object,
				notify: true,
				value: null
			},

			tableId: {
				type: Number,
				notify: true
			},

			_tableBodyRef: {
				type: Object,
				value: function() {
					return this;
				}
			}
		}
	}

	ready() {
		super.ready();
		this._ensureAttributes('role', 'grid');
	}

	connectedCallback() {
		super.connectedCallback();
		// set the iron-list's scrollTarget to this
		if (this._tableBodyList) {
			this._tableBodyList.scrollTarget = this;
		}
	}

	handleHideChanged(columnId, hideValue) {
		let columns = dom(this.root).querySelectorAll(`div[column-id="${columnId}"]`);
		columns.forEach(column => {
			if (hideValue) {
				column.setAttribute("hidden-by-col-prop", "");
			} else {
				column.removeAttribute("hidden-by-col-prop");
			}
		});
	}

	_addOne(val) {
		return parseInt(val) + 1;
	}

	_computeRowIndex(val) {
		return (val % 2 == 0) ? "even" : "odd";
	}

	_computeTabIndex(removeRowFocusAndHover, tabIndex) {
		return !removeRowFocusAndHover ? tabIndex : "";
	}

	_computeBoldRow(item, boldRowProperty) {
		if (boldRowProperty == "") {
			return false;
		}

		let negateBoldRowProperty = false;

		if (boldRowProperty.charAt(0) == '!') {
			boldRowProperty = boldRowProperty.slice(1);
			negateBoldRowProperty = true;
		}

		let boldPropertyValue = item[boldRowProperty];
		return negateBoldRowProperty ? !boldPropertyValue : boldPropertyValue;
	}

	_computedExpandMerge(indexed) {
		return indexed;
	}

	_computeCollapseIcon(opened) {
		return (opened) ? "hardware:keyboard-arrow-down" : "hardware:keyboard-arrow-right";
	}

	_computedSelectMerge(indexed, showExpandIcon) {
		return indexed || showExpandIcon;
	}

	/**
	 * Checker to verify if the "enter" key was pressed
	 */
	_isEnterKey(e) {
		var key = e.which || e.keyCode;

		// 13 is enter
		return (key === 13) ? true : false;
	}

	_onFixedHeaderChange(fixedHeader) {
		if (fixedHeader) {
			// add scroll listener
			this.listen(this.scroller, "scroll", "_updateFixedHeaderPosition");
		} else {
			// remove scroll listener
			this.unlisten(this.scroller, "scroll", "_updateFixedHeaderPosition");
		}
	}

	/**
	 * Set a margin top for the table body list, to push the table body below table header when the header is fixed.
	 * @param {number} marginTop The margin top value.
	 */
	setTableBodyListMarginTop(marginTop) {
		this._tableBodyList.style.marginTop = marginTop + "px";
	}

	/**
	 * Update the fixed header position based on current scroll position.
	 */
	_updateFixedHeaderPosition() {
		this.dispatchEvent(new CustomEvent('update-header-position', {bubbles: true, composed: true}));
	}

	/**
	 * Handler for row tap event
	 */
	_onRowTap(e) {
		if (e.type == "keypress" && !this._isEnterKey(e)) {
			return;
		}

		var rowModel = e.model;
		var rowData = rowModel.item;
		
		if (this.expandOnRowTap) {
			if (rowData.rowCollapseOpened) {
				rowModel.set("item.rowCollapseOpened", false);
			} else {
				rowModel.set("item.rowCollapseOpened", true);
			}
			this._tableBodyList.updateSizeForItem(rowData);
		}

		if (this.selectable && this.selectOnRowTap) {
			// if single-select, remove previous selection
			if (!this.multiSelect && this.selected && this.selected != rowData) {
				this.selected[this.selectedProperty] = false;
				dom(this.root).querySelector(`#cellInstanceId[index="${this.selected.rowIndex}"]`).notifyPath(`rowData.${this.selectedProperty}`, false);
				this.fire("row-select", {"item": this.selected, "selected": false});
			}

			// toggle current selection
			var isSelected = Boolean(rowData[this.selectedProperty]);
			rowData[this.selectedProperty] = !isSelected;
			rowData["rowIndex"] = e.model.rowIndex;

			// maintain `selected`
			this.$.selector.select(rowData);
			
			if (!this.multiSelect) {
				this.set("_selectedItem", this.selected);
			} else {
				this.set("_selectedItems", this.selected);
				this.notifyPath("_selectedItems", this._selectedItems.slice());
			}
			dom(this.root).querySelector(`#cellInstanceId[index="${e.model.rowIndex}"]`).notifyPath(`rowData.${this.selectedProperty}`, rowData[this.selectedProperty]);
			
			// fire row-select event
			this.fire("row-select", {"item": rowData, "selected": !isSelected});
		}

		this.fire("row-tap", {"item": rowData, "model": rowModel});
	}

	/**
	 * Handler for row hover event
	 */
	_onRowMouseOver(e) {
		var rowModel = e.model;
		var rowData = rowModel.item;
		this.fire("row-mouse-over", {"item": rowData, "model": rowModel});
	}

	/**
	 * Handler for `row-collapse-icon` tap event. Collapse/expand the row details section.
	 */
	_onRowCollapseTap(e) {
		e.stopPropagation();
		var item = e.model.item;
		if (item.rowCollapseOpened) {
			e.model.set("item.rowCollapseOpened", false);
		} else {
			e.model.set("item.rowCollapseOpened", true);
		}
		this._tableBodyList.updateSizeForItem(item);
	}

	/**
	 * Handler for row's selection checkbox tap event.
	 */
	_onRowSelectCheckboxTap(e) {
		e.stopPropagation();
		var item = e.model.item;
		if (item) {
			var selected = e.currentTarget.checked;
			item[this.selectedProperty] = selected;
			item["rowIndex"] = e.model.rowIndex;

			// maintain `selected`
			this.$.selector.select(item);
			this.set("_selectedItems", this.selected);
			this.notifyPath("_selectedItems", this._selectedItems.slice());
			dom(this.root).querySelector(`#cellInstanceId[index="${e.model.rowIndex}"]`).notifyPath(`rowData.${this.selectedProperty}`, item[this.selectedProperty]);

			// fire row-select event
			this.fire("row-select", {"item": item, "selected": selected});
		}
	}

	/**
	 * Handler for row's selection `radio-button` tap event.
	 */
	_onRowSelectRadioButtonTap(e) {
		e.stopPropagation();
		var item = e.model.item;
		if (item) {
			var isSelected = e.currentTarget.checked;
			item[this.selectedProperty] = isSelected;
			item["rowIndex"] = e.model.rowIndex;

			// remove previous selection
			if (this.selected && this.selected != item) {
				this.selected[this.selectedProperty] = false;
				dom(this.root).querySelector(`#cellInstanceId[index="${this.selected.rowIndex}"]`).notifyPath(`rowData.${this.selectedProperty}`, false);
				this.fire("row-select", {"item": this.selected, "selected": false});
			}

			if (this.$.selector.isSelected(item)) {
				this.set("_selectedItem", null);
			} else {
				this.set("_selectedItem", item);
			}
			dom(this.root).querySelector(`#cellInstanceId[index="${e.model.rowIndex}"]`).notifyPath(`rowData.${this.selectedProperty}`, item[this.selectedProperty]);

			// maintain `selected`
			this.$.selector.select(item);
			
			// fire row-select event
			this.fire("row-select", {"item": item, "selected": isSelected});
		}
	}

	_computeRowAriaLabel(item) {
		if (this.rowAriaLabelCallback) {
			return this.rowAriaLabelCallback(item);
		} else {
			return "";
		}
	}

	_computeRowContainerSelected(item, selectedProperty, selectedItem, selectedItems) {
		return item[selectedProperty] ? item[selectedProperty] : false;
	}

	_computeColumnStyle(column) {
		let style = column._columnStyle;
		if (style!="") {
			return style;
		} else {
			return "";
		}
	}

	_computeBodyCellStyle(column) {
		let style = column._bodyCellStyle;
		if (!style) {
			return "";
		} else {
			return style;
		}
	}

	/**
	 * Return true if `item[property]` is empty/blank and there is no template provided
	 */
	_isEmptyCellValue(item, column) {
		if (column.property == "") {
			return false;
		}

		var cellValue = item[column.property];
		if (typeof cellValue === 'object' && cellValue !== null) {
			return cellValue.value === "";
		} else {
			return cellValue == null || cellValue === "";
		}
	}

	_notifyResize(data) {
		if (data && data.length > 0) {
			let that = this;
			this.async(() => {
				that.notifyResize();
			}, 300);
		}
	}

	_computeCollapseOpen(alwaysShowRowDetail, rowCollapseOpened, rowDetail) {
		if (rowDetail && rowDetail._hasUserProvidedTemplate) {
			return alwaysShowRowDetail ? true : rowCollapseOpened;
		} else {
			return false;
		}
	}
}

customElements.define("triblock-table-body", TriblockTableBody);