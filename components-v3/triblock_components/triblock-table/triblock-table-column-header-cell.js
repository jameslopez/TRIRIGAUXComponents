import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '../@polymer/polymer/lib/legacy/class.js';
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriPlatAccessibilityBehavior } from "../triplat-accessibility-behavior/triplat-accessibility-behavior.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import { TriBlockViewResponsiveBehavior } from "../triblock-responsive-layout/triblock-view-responsive-behavior.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

var TRIBLOCK_TABLE_COLUMN_COUNTER = 1;

function generateTriblockTableColumnId() {
	return TRIBLOCK_TABLE_COLUMN_COUNTER++;
}

class TriblockTableColumnHeaderCell extends mixinBehaviors([TriDirBehavior, TriPlatAccessibilityBehavior, TriBlockViewResponsiveBehavior], PolymerElement) {
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

					@apply --triblock-table;
				}

				:host([hidden-by-screen-width]) {
					display: none;
				}

				:host([hidden-by-col-prop]) {
					display: none;
				}
				
				div[column] {
					@apply --layout-horizontal;
					@apply --layout-center;
					background-color: inherit;
					position: relative;
					overflow: hidden;
					height: 40px;
					@apply --triblock-table-column;
				}
				
				div[header-column]:not([merge-with-previous-column])::before {
					border-left: 1px solid var(--triblock-table-column-divider-color, var(--tri-primary-content-accent-color));
					content: "";
					position: absolute;
					top: 9px;
					height: 22px;
					
					@apply --triblock-table-column-divider;
				}

				div[header-cell] {
					@apply --layout-flex;
					@apply --layout-horizontal;
					@apply --layout-center;
					box-sizing: border-box;
					border: 1px solid transparent; /* reserve space for focus border */
					height: 30px;
					padding: 0px 10px 0px 9px;				
					margin: 5px 0px 5px 1px;
					min-width: 0;
					@apply --triblock-table-header-cell;
				}
				
				:host([dir="rtl"]) div[header-cell] {
					padding-left: 10px;
					padding-right: 9px;
					margin-left: 0;
					margin-right: 1px;
				}

				div[header-cell][sortable] {
					cursor: pointer;
					color: var(--triblock-table-header-sortable-color, var(--tri-primary-color));
				}
				
				div[header-cell][sortable]:hover {
					text-decoration: underline;
				}
				
				div[header-cell][sortable]:focus {
					outline: none;
					border: 1px solid var(--triblock-table-focus-outline-color, var(--tri-primary-color-20));
				}
							
				div[column] {
					background-color: var(--triblock-table-header-background-color, var(--tri-primary-content-background-color));
					color: var(--triblock-table-header-color, var(--ibm-gray-50));
				}

				span[header-cell-label] {
					flex-shrink: 1;
					overflow: hidden;
					min-width: 0;

					@apply --triblock-table-header-cell-label;
				}
        
				:host([dir="rtl"]) .row-collapse-icon {
					transform: scaleX(-1);
				}
				
				.sort-icon {
					--iron-icon-height: 16px;
					--iron-icon-width: 16px;
					flex-shrink: 0;
					@apply --triblock-table-header-sort-icon;
				}
				
				.sort-icon:not([column-title=""]) {
					margin-left: 4px;
				}
				
				:host([dir="rtl"]) .sort-icon:not([column-title=""]) {
					margin-left: 0;
					margin-right: 4px;
				}
				
				.sort-icon.unsorted {
					color: var(--ibm-gray-10);
				}

				.title-icon {
					@apply --triblock-table-header-title-icon;
				}

			</style>
			
			<div 
			column="" 
			header-column="" 
			role="columnheader" 
			column-id\$="[[columnId]]" 
			style\$="[[_computeColumnStyle(column)]]" 
			aria-sort\$="[[_computeColumnSort(column)]]" 
			merge-with-previous-column\$="[[_computeMergeWithPreviousColumn(column, firstDataColumnId, mergeWithPreviousColumn)]]" 
			title\$="[[_computeTooltip(column)]]" 
			>
				<div 
				header-cell=""
				style\$="[[_computeHeaderCellStyle(column)]]" 
				sortable\$="[[_computeSortable(column)]]" 
				default-sort-descending\$="[[_computeDefaultSort(column)]]" 
				tabindex\$="[[_computeTabIndex(column)]]" 
				data-property\$="[[column.property]]" 
				data-type\$="[[column.type]]" 
				data-reverse-sort\$="[[column.reverseSort]]"
				>
					<template is="dom-if" if="[[_containsTitleIcon(column)]]">
						<iron-icon class="title-icon" column-title\$="[[column.title]]" icon\$="[[column.titleIcon]]"></iron-icon>
					</template>
					<template is="dom-if" if="[[!_containsTitleIcon(column)]]">
						<span header-cell-label="">[[column.title]]</span>
					</template>
					<template is="dom-if" if="[[_isSortable(column)]]">
						<iron-icon class\$="[[_computeSortIconClasslist(column)]]" column-title\$="[[column.title]]" icon\$="[[_computeSortIcon(column)]]"></iron-icon>
					</template>
				</div>										
			</div>`
		
		}
	
		static get properties() {
			return {
				column: {
					type: Object
				},

				columnId: {
					type: String,
					notify: true,
					reflectToAttribute: true,
					computed: '_computeColumnId(column)'
				},

				firstDataColumnId: {
					type: Number,
					notify: true
				},

				hiddenByScreenWidth: {
					type: Boolean,
					reflectToAttribute: true,
					computed: '_computeHiddenByScreenWidth(smallScreenWidth, column.hideOnScreenWidth)'
				},
				
				hiddenByColProp: {
					type: Boolean,
					reflectToAttribute: true,
					value: false
				},

				mergeWithPreviousColumn: {
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
		
		static get observers() {
			return [
				"_onSortChange(sortProperty, sortDescending, sortType)"
			]
		}

		ready() {
			super.ready();
			let hideOnScreenWidth = this.column.hideOnScreenWidth;
			if (hideOnScreenWidth != null && hideOnScreenWidth != "") {
				this.set("smallScreenMaxWidth", hideOnScreenWidth);
			}
		}
		
		connectedCallback() {
			super.connectedCallback();
			var sortColumn = dom(this.root).querySelector("div[header-cell]:not([sortable='false'])");
			if(sortColumn){
				this.listen(sortColumn, "tap", "_onSortableHeaderCellTap");
				this.listen(sortColumn, "keypress", "_onSortableHeaderCellKeypress");
			}	
			
			if (!this.initialized) {
				this.debounce("initializeTriblockTableHeaderCell", function() {
					this.async(function() {
						this.initialized = true;
					}, 300);
				});
			}
		}
		
		_computeColumnStyle(column){
			if(column._columnStyle!=""){
				return column._columnStyle;
			}
			else return "";
		}
			
		_computeColumnId(column){
			var columnId;
			if (column.columnId) {
				columnId = column.columnId;
			} else {
				columnId = generateTriblockTableColumnId();
				column.columnId = columnId;
			}
			return columnId;
		}
				
		_computeMergeWithPreviousColumn(column, firstDataColumnId, mergeWithPreviousColumn) {
			return this.columnId == firstDataColumnId ? column.mergeWithPreviousColumn || mergeWithPreviousColumn : column.mergeWithPreviousColumn;
		}

		_computeColumnSort(column){
			if(!this._isSortable(column)){
				return false;
			}
			var sort = ""
			if (column.property == this.sortProperty){
				sort = (this.sortDescending) ? "descending" : "ascending";
			}
			return sort;
		}
		
		_computeSortIcon(column){
			if(column.property == this.sortProperty){
				if (column.hasAttribute("reverse-sort")){
					return this.sortDescending ? "ibm:sort-ascending" : "ibm:sort-descending";
				}
				return this.sortDescending ? "ibm:sort-descending" : "ibm:sort-ascending";
			}
			else{
				return "ibm:sort";
			}
		}
		
		_computeSortIconClasslist(column){
			if (column.property == this.sortProperty){ 
				return 	"sort-icon";				
			}
			else {
				return "sort-icon unsorted";
			}
		}
		
		_computeSortClassList(column){
			if(column.property == this.sortProperty){
				return "sort-icon";
			}else{
				return "sort-icon unsorted";
			}		
		}
		
		_computeHeaderCellStyle(column){
			if(!column._headerCellStyle){
				return "";
			}else{
				return column._headerCellStyle;
			}
		}
		
		_computeDefaultSort(column){
			if(!column.defaultSortDescending){
				return false;
			}
			return true;		
		}
		
		_computeSortable(column){
			if(!this._isSortable(column)){
				return false;
			}
			return true;
			
		}
		
		_computeTabIndex(column){
			if(!this._isSortable(column)){
				return false;
			}
			return "0"
		}
		
		_isSortable(column){
			return this.sortable || column.sortable;
		}
		
		_containsTitleIcon(column) {
			return column.titleIcon !== "";
		}
		
		_computeTooltip(column){
		    if (column.headerTooltip && column.headerTooltip != "") {
		        return column.headerTooltip;
		    } else if (!this.disableDefaultTooltips) {
		      return column.title;
		    }
		}

		_computeHiddenByScreenWidth(smallScreenWidth, hideOnScreenWidth) {
			if (!assertParametersAreDefined(arguments)) {
				return false;
			}
			return hideOnScreenWidth != null && hideOnScreenWidth != "" && smallScreenWidth;
		}
				
	    /**
		 * Handle keypress event on header-cell
		 */
		_onSortableHeaderCellKeypress(e) {
			if (e.key == "Enter" || e.key == " ") {
				// when Enter or Spacebar is pressed, set sortProperty / cycle through sortDescending
				var column = e.currentTarget;
				var columnProperty = column.getAttribute("data-property");
				var columnDefaultSortDescending = column.hasAttribute("default-sort-descending");
				var columnType = column.getAttribute("data-type");
				var columnReverseSort = (column.getAttribute("data-reverse-sort") == 'true');
				if(columnReverseSort) columnDefaultSortDescending = !columnDefaultSortDescending;
				if (this.sortProperty == columnProperty) {
					if (this.sortDescending == !columnDefaultSortDescending) {
						// reset search to no sort
						this.set("sortProperty", "");
						this.set("sortDescending", false);
						this.set("sortType", "")
					} else {
						// switch sort direction
						this.set("sortDescending", !columnDefaultSortDescending);
					}
				} else {
					// new search column
					this.set("sortProperty", columnProperty);
					this.set("sortDescending", columnDefaultSortDescending);
					this.set("sortType", columnType);
				}
				e.preventDefault();
			}
		}

	    /**
		 * Handle tap event on header-cell
		 */
		_onSortableHeaderCellTap(e) {
			e.preventDefault();
			e.stopPropagation();

			// set sortProperty / cycle through sortDescending
			var column = e.currentTarget;
			if (column.getAttribute("sortable") != "") {
				return;
			}
			var columnProperty = column.getAttribute("data-property");
			var columnDefaultSortDescending = column.hasAttribute("default-sort-descending");
			var columnType = column.getAttribute("data-type");
			var columnReverseSort = column.hasAttribute("data-reverse-sort");
			if(columnReverseSort) columnDefaultSortDescending = !columnDefaultSortDescending;
			if (this.sortProperty == columnProperty) {
				if (this.sortDescending == !columnDefaultSortDescending) {
					// reset search to no sort
					this.set("sortProperty", "");
					this.set("sortDescending", false);
					this.set("sortType", "");
				} else {
					// switch sort direction
					this.set("sortDescending", !columnDefaultSortDescending);
				}
			} else {
				// new search column
				this.set("sortProperty", columnProperty);
				this.set("sortDescending", columnDefaultSortDescending);
				this.set("sortType", columnType);
			}
		}

	_onSortChange(sortProperty, sortDescending, sortType) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._updateSortIcons();
	}
	
	/**
	 * Update the table display based on current sort property and direction.
	 */
	_updateSortIcons() {
		if (this.isAttached && this.sortable) this.debounce("updateSortIcons", function() {

			var currentSortIcon = dom(this.root).querySelector(".sort-icon");
			currentSortIcon.setAttribute("icon", "ibm:sort");
			currentSortIcon.classList.add("unsorted");
			
			var currentSortColumn = dom(this.root).querySelector("div[header-column][aria-sort]");
			if (currentSortColumn) currentSortColumn.removeAttribute("aria-sort");
			
			// Set a live area for screen readers
			var liveArea = this.setAriaLiveContainer(this, "tableLiveArea", "polite");
			if (liveArea) liveArea.innerHTML = "";
	
			// set the current sort column
			var newSortColumnIcon = dom(this.root).querySelector('div[data-property="'+this.sortProperty+'"] .sort-icon');
			if (newSortColumnIcon) {
				var newSortColumn = newSortColumnIcon.parentElement;
				var newSortColumnReverse = "reverseSort" in newSortColumn.dataset;
				var newSortColumnHeader = newSortColumn.parentElement;
				if(newSortColumnReverse) {
					newSortColumnIcon.setAttribute("icon", (this.sortDescending) ? "ibm:sort-ascending" : "ibm:sort-descending");
					newSortColumn.setAttribute("aria-sort", (this.sortDescending) ? "ascending" : "descending");
					newSortColumnHeader.setAttribute("aria-sort", (this.sortDescending) ? "ascending" : "descending");
				} else {
					newSortColumnIcon.setAttribute("icon", (this.sortDescending) ? "ibm:sort-descending" : "ibm:sort-ascending");
					newSortColumn.setAttribute("aria-sort", (this.sortDescending) ? "descending" : "ascending");
					newSortColumnHeader.setAttribute("aria-sort", (this.sortDescending) ? "descending" : "ascending");
				}
				newSortColumnIcon.classList.remove("unsorted");
				while (!newSortColumn.hasAttribute("header-column")) newSortColumn = newSortColumn.parentElement;
				
				// Sorted by message for screen readers
				var columnTitle = newSortColumnHeader.title;
				if (columnTitle && columnTitle != "" && liveArea) {
					var __dictionary__sortedByMessage = "Sorted by";
					var __dictionary__ascending = "ascending";
					var __dictionary__descending = "descending";
					liveArea.innerHTML = __dictionary__sortedByMessage + " " + columnTitle + " " + ((this.sortDescending) ? __dictionary__ascending : __dictionary__descending);
				}
			}
		});
	}
}

customElements.define('triblock-table-column-header-cell', TriblockTableColumnHeaderCell);