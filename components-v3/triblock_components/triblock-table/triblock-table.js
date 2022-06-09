/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import "../@polymer/polymer/polymer-legacy.js";

import "./triblock-table-body.js";
import "./triblock-table-column.js";
import "./triblock-table-column-header.js";
import "./triblock-table-row-detail.js";

import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { templatize } from '../@polymer/polymer/lib/utils/templatize.js';
import { microTask } from '../@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '../@polymer/polymer/lib/utils/debounce.js';

var TRIBLOCK_TABLE_COUNTER = 1;

function generateTriblockTableId() {
	return TRIBLOCK_TABLE_COUNTER++;
}

/*
`triblock-table` displays an array of data, specified by the `data` property, in a tabular layout.  

<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
	 <b>Note:</b> It internally uses the `iron-list` component to manage the display of the rows in the table, so be aware of any known issues and limitations related to `iron-list` when implementing the `triblock-table`.
   </div>
</div>


Use <a href="#triblock-table-column">`triblock-table-column`</a> to configure the displayed columns in the table.

Use <a href="#triblock-table-row-detail">`triblock-table-row-detail`</a> to add an expandable section beneath each row.

Example:

```html
<triblock-table data="{{data}}">
  <triblock-table-column title="ID" property="_id"></triblock-table-column>
  <triblock-table-column title="Name">
	<template>
	  <div>{{item.last}}, {{item.first}}</div>
	</template>
  </triblock-table-column>
  <triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
  <triblock-table-row-detail>
	<template>
	  <div>First name: {{item.first}}</div>
	  <div>Last name: {{item.last}}</div>
	  <div>Contact information:</div>
	  <div>E-mail: {{item.email}}</div>
	  <div>Phone #: {{item.phone}}</div>
	</template>
  </triblock-table-row-detail>
</triblock-table>
```

This example renders a table with 3 columns, a row for each object in `data`, and an expandable section beneath each row.

See the Demo page for more examples of the various properties and settings that are available.
  
  
### Sizing triblock-table

Since `triblock-table` is the `scrollTarget` for the internal `iron-list`, it must be explicitly sized. By "explicitly sized", we mean it either has an explicit CSS `height` property set via a class or inline style, or else is sized by other layout means (e.g. the `flex` or `fit` classes). See the `iron-list` documentation for further details.


### Resizing

When dynamically showing, hiding, or resizing a `triblock-table` (e.g. applying or removing `display: none;` on the element's CSS), the internal `iron-list` requires notification of this resize so it can recalculate the layout of the rows in the table.

This notification is achieved by implementing `IronResizableBehavior` on the component hosting the `triblock-table` in question and calling `this.notifyResize();` after showing, hiding, or resizing the table. See the `iron-resizable-behavior` documentation for further details.


### Accessibility

The internal `iron-list` automatically manages the focus state for the rows in the table. It also provides a `tabIndex` property within the template scope that can be used for keyboard navigation. This `tabIndex` binding property is propagated into both `triblock-table-column` and `triblock-table-row-detail` templates for defining accessibility. See the `iron-list` documentation for further details.

Example:

```html
<triblock-table data="{{data}}">
  <triblock-table-column title="ID" property="_id"></triblock-table-column>
  <triblock-table-column title="Name" property="name"></triblock-table-column>
  <triblock-table-column title="Administrator?" property="isAdministrator">
	<template>
	  <paper-checkbox 
		tabindex$="[[tabIndex]]" 
		checked="{{value}}">
	  </paper-checkbox>
	</template>
  </triblock-table-column>
  <triblock-table-row-detail>
	<template>
	  <div>Give [[item.name]] administrator privileges: 
		<paper-checkbox 
		  tabindex$="[[tabIndex]]" 
		  checked="{{item.isAdministrator}}">
		</paper-checkbox>
	  </div>
	</template>
  </triblock-table-row-detail>
</triblock-table>
```

Additionally, the column headers of sortable columns are keyboard accessible, so keyboard-only users can modify the `sortProperty` and `sortDescending` of the table.
  

### Styling

The following custom properties and mixins are available for styling:

#### Table styles

Custom property | Description | Default
----------------|-------------|----------
`--triblock-table-background-color` | Background color applied to the table | `--tri-primary-content-background-color`
`--triblock-table-color` | Color applied to the table | `--tri-primary-content-color`
`--triblock-table-font-size` | Font size applied to the table | `14px`
`--triblock-table-focus-outline-color` | Outline color when sortable header cell or row is focused | `--tri-primary-color-20`
`--triblock-table` | Mixin applied to the host component | `{}`

#### Header row styles

Custom property | Description | Default
----------------|-------------|----------
`--triblock-table-header-background-color` | Background color applied to the table header | `--tri-primary-content-background-color`
`--triblock-table-header-color` | Color applied to the table header | `--ibm-gray-50`
`--triblock-table-header-sortable-color` | Color applied to sortable header cells | `--tri-primary-color`
`--triblock-table-header-row-border-bottom-color` | Color applied to the bottom border of the header row | `--ibm-gray-30`
`--triblock-table-header` | Mixin applied to the table header | `{}`
`--triblock-table-header-sort-icon` | Mixin applied to the sort-icon in sortable columns | `{}`
`--triblock-table-header-cell` | Mixin applied to each header cell | `{}`
`--triblock-table-header-cell-label` | Mixin applied to the label in each header cell | `{}`

#### Body row styles

Custom property | Description | Default
----------------|-------------|----------
`--triblock-table-even-row-background-color` | Background color applied to even rows | `white`
`--triblock-table-odd-row-background-color` | Background color applied to odd rows | `--ibm-neutral-2`
`--triblock-table-row-hover-background-color` | Background color applied to rows when hovered | `--ibm-neutral-4`
`--triblock-table-row-selected-background-color` | Background color applied to rows when selected | `--tri-primary-light-color`
`--triblock-table-row-detail-divider-color` | Color applied to the border above the row-detail section when it is expanded | `--tri-primary-content-accent-color`
`--triblock-table-row-container` | Mixin applied to the row and row-detail section container | `{}`
`--triblock-table-row` | Mixin applied to the row | `{}`
`--triblock-table-row-detail` | Mixin applied to the row-detail section | `{}`
`--triblock-table-row-hover` | Mixin applied to the row when hovered | `{}`
`--triblock-table-row-selected` | Mixin applied to the row when it is selected | `{}`
`--triblock-table-cell` | Mixin applied to every table body cell | `{}`

#### Column styles

Custom property | Description | Default
----------------|-------------|----------
`--triblock-table-column-divider-color` | Color applied to column dividers | `--tri-primary-content-accent-color`
`--triblock-table-column-divider` | Mixin applied to column dividers | `{}`
`--triblock-table-column` | Mixin applied to each cell's column wrapper (including the header) | `{}`

Go to <a href="#triblock-table-column">`triblock-table-column`</a> to see CSS variables for styling individual columns.

#### Miscellaneous styles

Custom property | Description | Default
----------------|-------------|----------
`--triblock-table-row-collapse-icon` | Mixin applied to each row expand/collapse icon | `{}`
`--triblock-table-selection-checkbox` | Mixin applied to each multi-select checkbox | `{}`
`--triblock-table-selection-radio-button` | Mixin applied to each single-select radio button | `{}`

@demo demo/index.html
*/
class TriblockTable extends PolymerElement {
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
			</style>

			<template id="headerBodyTemplate">
				<triblock-table-column-header
					table-header=""
					id="tableHeader"
					row-detail="[[_rowDetail]]"
					always-show-row-detail="[[alwaysShowRowDetail]]"
					fixed-header="[[fixedHeader]]" 
					indexed="[[indexed]]"
					selectable="[[selectable]]"
					columns="[[_columns]]"
					sortable="[[sortable]]"
					sort-descending="{{sortDescending}}" 
					sort-property="{{sortProperty}}"
					sort-type="{{sortType}}" 
					hidden="[[_isZero(data.length)]]"
					disable-default-tooltips="[[disableDefaultTooltips]]"
					slot="rows"
				></triblock-table-column-header>

				<triblock-table-body
					id="body"
					data="{{data}}"
					selected-property="[[selectedProperty]]"
					expand-on-row-tap="[[expandOnRowTap]]"
					multi-select="[[multiSelect]]"
					remove-row-focus-and-hover="[[removeRowFocusAndHover]]"
					bold-row-property="[[boldRowProperty]]"
					indexed="[[indexed]]"
					show-expand-icon="[[_showExpandIcon]]"
					selectable="[[selectable]]"
					columns="[[_columns]]"
					bind-index-as="[[bindIndexAs]]"
					bind-item-as="[[bindItemAs]]"
					bind-value-as="[[bindValueAs]]"
					row-detail="[[_rowDetail]]"
					always-show-row-detail="[[alwaysShowRowDetail]]"
					fixed-header="[[fixedHeader]]"
					scroller="[[scroller]]"
					select-on-row-tap="[[selectOnRowTap]]"
					selected="{{selected}}"
					table-id="[[tableId]]"
					slot="rows">
				</triblock-table-body>
			</template>

			<slot id="rowsSlot" name="rows">
			</slot>

			<div style="display:none">
				<!-- Column templates (must be attached to DOM in order to access styling) -->
				<slot id="content"></slot>
			</div>
		`
	}

	static get properties() {
		return {
			/**
			 * Always show the expandable row section in a table row, hide the row expand icon column.
			 */
			alwaysShowRowDetail: {
				type: Boolean,
				value: false
			},

			/**
			 * The name of the data-binding variable representing the row index.
			 */
			bindIndexAs: {
				type: String,
				value: "index"
			},

			/**
			 * The name of the data-binding variable representing the row data object.
			 */
			bindItemAs: {
				type: String,
				value: "item"
			},

			/**
			 * The name of the data-binding variable representing the row data value corresponding to the context column's `property`.
			 */
			bindValueAs: {
				type: String,
				value: "value"
			},

			/**
			 * Boolean data property name that determines whether the row text should have bolded text. To negate the property value, prefix the property name with '!'.
			 */
			boldRowProperty: {
				type: String,
				value: ""
			},

			/**
			 * Array containing tabular data to display in the table.  Tabular means each object in the array must have the same set of properties.
			 */
			data: {
				type: Array,
				notify: true
			},

			/**
			 * Disable the default behavior of the column titles being used as the tooltip values for the column headers.  Regardless of this setting, the tooltip can be overwritten by specifying a `header-tooltip` on the individual column headers.
			 */
			disableDefaultTooltips: {
				type: Boolean,
				value: false
			},

			/**
			 * Disable the row hover styling.
			 */
			disableRowHoverStyling: {
				type: Boolean,
				value: false
			},

			/**
			 * Automatically expand the row on a row-tap event, if `triblock-table-row-detail` is present.
			 */
			expandOnRowTap: {
				type: Boolean,
				value: false
			},

			/**
			 * Fix the header row, but make the table body scrollable.
			 * When dynamically showing, hiding, or resizing a `triblock-table`, it is necessary to notify the resize, so it can recalculate the table layout. For more details, see the `Resizing` section above.
			 */
			fixedHeader: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},

			/**
			 * Add a numerical index to each row.
			 */
			indexed: {
				type: Boolean,
				value: false
			},

			/**
			 * When `true`, multiple items may be selected at once.  In this case, `selected` is an array of currently selected items.  When `false`, only one item may be selected at a time.
			 */
			multiSelect: {
				type: Boolean,
				value: false
			},

			/**
			 * Remove the row focusability and `:hover` styling.
			 */
			removeRowFocusAndHover: {
				type: Boolean,
				value: false
			},

			/**
			 * The DOM element that scrolls the content to be used for scrolling pagination.
			 */
			scroller: {
				type: Object,
				notify: true,
				readOnly: true,
				value: function() {
					return this;
				}
			},

			/**
			 * Show checkboxes on the left of each row to allow selection.
			 */
			selectable: {
				type: Boolean,
				value: false
			},

			/**
			 * The selected item for a single-select-enabled table, or selected items for a multi-select-enabled table.
			 */
			selected: {
				type: Object,
				notify: true
			},

			/**
			 * Boolean data property name that determines whether the row is selected.
			 */
			selectedProperty: {
				type: String,
				value: "selected"
			},

			/**
			 * Automatically select the row on a row-tap event, if `selectable` is specified.
			 */
			selectOnRowTap: {
				type: Boolean,
				value: false
			},

			/**
			 * Indicate that every column is sortable.
			 */
			sortable: {
				type: Boolean,
				value: false
			},

			/**
			 * Get/set the sorting direction.  Intended to be bound to the `desc` property of the `data` array in `triplat-query-sort`.
			 */
			sortDescending: {
				type: Boolean,
				value: false,
				notify: true
			},

			/**
			 * Get/set the data property name whose value determines the sorting order for the table.  Intended to be bound to the `name` property of the `data` array in `triplat-query-sort`.
			 */
			sortProperty: {
				type: String,
				value: "",
				notify: true
			},

			/**
			 * Get/set the data property type whose value determines the type of value being sorted.  Intended to be bound to the `type` property of the `data` array in `triplat-query-sort`.
			 */
			sortType: {
				type: String,
				value: "",
				notify: true
			},

			_columns: {
				type: Array
			},
			
			_rowDetail: {
				type: Object,
				notify: true
			},

			_showExpandIcon: {
				type: Boolean,
				notify: true,
				value: false
			},

			_headerBodyInstance: {
				type: Object
			},

			tableId: {
				type: Number,
				notify: true,
				reflectToAttribute: true,
				value: function() {
					return generateTriblockTableId();
				}
			}
		}
	}

	static get observers() {
		return [
			"_onFixedHeaderChange(fixedHeader, initialized)"
		];
	}

	get tableHeader() {
		return dom(this).querySelector("#tableHeader");
	}

	get tableBody() {
		return dom(this).querySelector("#body");
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("iron-resize", this._resizeHandler);

		// set the initial sort column, if any (see `initialSort` property on `triblock-table-column`)
		var initialSortCol = dom(this).querySelector('triblock-table-column[initial-sort]');
		if (initialSortCol) {
			var initialSortProperty = initialSortCol.getAttribute("property");
			if (initialSortProperty) this.set("sortProperty", initialSortProperty);
			var initialSortDescending = initialSortCol.hasAttribute("default-sort-descending");
			if (initialSortDescending) this.set("sortDescending", true);
			var initialSortType = initialSortCol.getAttribute("type");
			if (initialSortType) this.set("sortType", initialSortType);
		}

		// observe when children elements are added and removed from this component
		dom(this.$.content).observeNodes(function() {
			// get the columns and row-detail sections that are passed in via light DOM and use them to initialize the table header and table row template (make sure we only do this once)
			if (!this.initialized) {
				this._debounceJob = Debouncer.debounce(this._debounceJob, microTask, function() {
					var columns = Array.from(dom(this).querySelectorAll("triblock-table-column"));
					this.set("_columns", columns);
					var rowDetail = dom(this).querySelector("triblock-table-row-detail");
					if (rowDetail) {
						this.set("_rowDetail", rowDetail);
						this.set("_showExpandIcon", this.alwaysShowRowDetail ? !this.alwaysShowRowDetail : true);
					}

					setTimeout(() => {
						this._generateTableBinding(columns, rowDetail);
						this.initialized = true;
					}, 300);
					
				}.bind(this));
			}
		}.bind(this));

		this.addEventListener("hide-changed", this._handleHideChanged.bind(this));
		this.addEventListener("update-header-position", this._handleUpdateHeaderPosition.bind(this));

		if (!this._templatized) {
			let rowsTemplate = this.$.headerBodyTemplate;
			this._templateClass = templatize(rowsTemplate, this, {
				parentModel: true,
				forwardHostProp: function (prop, value) {
					let instance = this._headerBodyInstance;
					if (!instance) return;
					instance.forwardHostProp(prop, value);
				}
			});

			this._headerBodyInstance = new this._templateClass(null);

			dom(this).appendChild(this._headerBodyInstance.root);
			this._templatized = true;
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener("iron-resize", this._resizeHandler);
	}

	_handleHideChanged(e) {
		e.stopPropagation();
		let columnId = e.detail.columnId;
		let value = e.detail.value;
		this.tableBody.handleHideChanged(columnId, value);
		let headerCell = dom(this.tableHeader.root).querySelector(`triblock-table-column-header-cell[column-id="${columnId}"]`);
		if (value) {
			headerCell.setAttribute("hidden-by-col-prop", "");
		} else {
			headerCell.removeAttribute("hidden-by-col-prop");
		}
	}

	_handleUpdateHeaderPosition(e) {
		e.stopPropagation();
		var scrollTop = this.scrollTop;
		this.tableHeader.style.top = scrollTop + "px";
	}

	/**
	 * Create the `<iron-list>` template by combining the `triblock-table-column` templates with some additional mark-up
	 */
	_generateTableBinding(columns, rowDetail) {
		if (rowDetail) {
			rowDetail.bindItemAs = this.bindItemAs;
			rowDetail.bindIndexAs = this.bindIndexAs;

			var detailId = (new Date()).getTime();
			rowDetail.set("detailId", detailId);
		}

		// add a column for each <triblock-table-column>
		columns.forEach(function(col) {

			if (col._hasUserProvidedTemplate) {
				col.bindIndexAs = this.bindIndexAs;
				col.bindItemAs = this.bindItemAs;
				col.bindValueAs = this.bindValueAs;
			}

		}.bind(this));

		// fix console error complaining about null parentProps when the iron-list template model is modified
		// this.async(function() {
		// 	if (!this.$.tableBodyList._parentProps) this.$.tableBodyList._parentProps = [];
		// });
	}

	_isZero(val) {
		return val == 0;
	}

	_resizeHandler() {
		if (this.fixedHeader && this.initialized) {
			this._onFixedHeaderChange(this.fixedHeader, this.initialized);
		}
	}

	_onFixedHeaderChange(fixedHeader, initialized) {
		if (initialized && this.tableHeader && this.tableBody) {
			if (fixedHeader) {
				let tableHeaderRect = this.tableHeader.getBoundingClientRect();
				let tableHeaderHeight = (tableHeaderRect.height > 0) ? tableHeaderRect.height : 41;
				// Add margin above table body to push it below table header.
				this.tableBody.setTableBodyListMarginTop(tableHeaderHeight);
			} else {
				// Remove table body margin.
				this.tableBody.setTableBodyListMarginTop(0);
			}
		}
	}
}

customElements.define('triblock-table', TriblockTable);