/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';

import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../triplat-date-picker/triplat-date-picker.js";
import "../triplat-datetime-picker/triplat-datetime-picker.js";
import { templatize } from '../@polymer/polymer/lib/utils/templatize.js';
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/*
`triblock-table-column` defines the metadata necessary to create the column content inside of the table.  At minimum, it displays the specified `property` value for each `data` item.  It also displays the `title` as the column header, but this setting is optional.

Example:

```html
<triblock-table data="{{data}}">
  <triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
  <triblock-table-column title="Name" property="name"></triblock-table-column>
  <triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
</triblock-table>
```

To customize cell content in the column, provide a `template` inside `triblock-table-column`.

Example:

```html
<triblock-table data="{{data}}">
  <triblock-table-column title="Employee ID" property="_id">
	<template>
	  <a target="_blank" href="data/employees.json">{{value}}</a>
	</template>
  </triblock-table-column>
  <triblock-table-column title="Name" property="name">
	<template>
	  <div>{{item.last}}, {{item.first}}</div>
	</template>
  </triblock-table-column>
  <triblock-table-column title="Status" property="status"></triblock-table-column>
</triblock-table>
```

Column templates should bind to template models of the following structure:

```js
{
  item: {},        // user data corresponding to data[index]
  value: {},       // user data corresponding to this column's "property"
				   // value at data[index]
  index: 0,        // index in the data array
  tabIndex: -1,    // a dynamically generated tabIndex 
				   // for focus management (managed by internal iron-list)
}
```

See the <a href="#triblock-table">`triblock-table`</a> Demo page for more examples of the various properties and settings that are available for `triblock-table-column`.


### Styling

The following CSS variables can be applied directly on `triblock-table-column` in order to style the generated column:

Custom property | Description | Default
----------------|-------------|----------
`--triblock-table-column-flex` | `flex` applied to the column | `1`
`--triblock-table-column-body-flex-alignment` | `justify-content` applied to the body cells in the column | `flex-start`
`--triblock-table-column-header-flex-alignment` | `justify-content` applied to the header cells in the column | `flex-start`
`--triblock-table-column-fixed-width` | `width` applied to the column to override the `--triblock-table-column-flex` setting | none

Example:

```html
<style>
  .fixed-width-column {
	// column will always be 200px
	--triblock-table-column-fixed-width: 200px;  
  }
  .custom-column-1 {
	// column header center-aligned
	--triblock-table-column-header-flex-alignment: center;
	  
	// column body cells right-aligned
	--triblock-table-column-body-flex-alignment: flex-end;  
  }
  .custom-column-2 {
	// column will be twice as wide as default columns
	--triblock-table-column-flex: 2;  
  }
</style>

<triblock-table data="{{data}}">
  <triblock-table-column 
	title="Employee ID" 
	property="_id" 
	class="fixed-width-column">
  </triblock-table-column>
  <triblock-table-column 
	title="Name" 
	property="name" 
	class="custom-column-1">
  </triblock-table-column>
  <triblock-table-column 
	title="Status" 
	property="status"
	type="STRING_WITH_ID" 
	class="custom-column-2">
  </triblock-table-column>
</triblock-table>
```

As a convenience, the following predefined classes can be applied for common column-styling scenarios:
<ul>
  <li>
	narrow
	<ul>
	  <li>`--triblock-table-column-flex: 0.5;`</li>
	</ul>
  </li>
  <li>
	wide
	<ul>
	  <li>`--triblock-table-column-flex: 2;`</li>
	</ul>
  </li>
  <li>
	extra-wide
	<ul>
	  <li>`--triblock-table-column-flex: 3;`</li>
	</ul>
  </li>
  <li>
	centered
	<ul>
	  <li>`--triblock-table-column-header-flex-alignment: center;`</li>
	  <li>`--triblock-table-column-body-flex-alignment: center;`</li>
	</ul>
  </li>
  <li>
	right-aligned
	<ul>
	  <li>`--triblock-table-column-header-flex-alignment: flex-end;`</li>
	  <li>`--triblock-table-column-body-flex-alignment: flex-end;`</li>
	</ul>
  </li>
</ul>
*/
class TriblockTableColumn extends PolymerElement {
	static get template() {
		return html `
			<style include="tristyles-theme">

				:host {
					flex: var(--triblock-table-column-flex, 1);
					justify-content: var(--triblock-table-column-body-flex-alignment, flex-start);
					max-width: var(--triblock-table-column-fixed-width, auto);
					display: none;
				}

				/* Preset classes for columns: */
				:host(.narrow) {
					flex: var(--triblock-table-column-flex, 0.5);
				}
				:host(.wide) {
					flex: var(--triblock-table-column-flex, 2);
				}
				:host(.extra-wide) {
					flex: var(--triblock-table-column-flex, 3);
				}
				:host(.centered) {
					justify-content: var(--triblock-table-column-body-flex-alignment, center);
				}
				:host(.right-aligned) {
					justify-content: var(--triblock-table-column-body-flex-alignment, flex-end);
				}

				div[header] {
					justify-content: var(--triblock-table-column-header-flex-alignment, flex-start);
				}
				:host(.centered) > div[header] {
					justify-content: var(--triblock-table-column-header-flex-alignment, center);
				}
				:host(.right-aligned) > div[header] {
					justify-content: var(--triblock-table-column-header-flex-alignment, flex-end);
				}
				
			</style>

			<div header="" id="header"></div>

			<!-- Available cell templates: -->
			<template id="defaultTemplate">
				<span>{{value}}</span>
			</template>
			<template id="booleanTemplate">
				<paper-checkbox disabled="" checked="{{value}}" tabindex\$="[[tabIndex]]"></paper-checkbox>
			</template>
			<template id="dateTemplate">
				<triplat-date-picker readonly="" value="{{value}}"></triplat-date-picker>
			</template>
			<template id="dateTimeTemplate">
				<triplat-datetime-picker readonly="" value="{{value}}"></triplat-datetime-picker>
			</template>
			<template id="stringWithIdTemplate">
				<span>{{value.value}}</span>
			</template>
		`
	}

	static get properties() {
		return {
			/**
			 * The name of the data-binding variable representing the row index. For columns using user-provided templates, the name is overwritten by the value passed by the user via triblock-table.
			 */
			bindIndexAs: {
				type: String,
				value: "index",
				reflectToAttribute: true
			},

			/**
			 * The name of the data-binding variable representing the row data object. For columns using user-provided templates, the name is overwritten by the value passed by the user via triblock-table.
			 */
			bindItemAs: {
				type: String,
				value: "item",
				reflectToAttribute: true
			},

			/**
			 * The name of the data-binding variable representing the row data value that corresponds to the `property` of the context column. For columns using user-provided templates, the name is overwritten by the value passed by the user via triblock-table.
			 */
			bindValueAs: {
				type: String,
				value: "value",
				reflectToAttribute: true
			},

			columnId: {
				type: String,
				notify: true,
				reflectToAttribute: true
			},

			/**
			 * Indicate that the default sort direction for this column is descending.
			 */
			defaultSortDescending: {
				type: Boolean,
				value: false
			},

			/**
			 * Default text to display whenever the cell value is empty.
			 */
			defaultText: {
				type: String,
				value: ""
			},

			/**
			 * Default value to replace any empty cell values in this column. If a custom template is being used for this column, note that `defaultValue` is applied only on empty `{{value}}` bindings. This property is applied only whenever `defaultText` is empty.
			 */
			defaultValue: {
				type: Object,
				value: ""
			},

			/**
			 * Tooltip displayed when hovering over column header.
			 */
			headerTooltip: {
				type: String,
				value: ""
			},

			/**
			 * Updatable property to show or hide the column.
			 */
			hide: {
				type: Boolean,
				value: false,
				observer: "_onHideChange"
			},

			/**
			 * Hide this column if the screen width is less-than-or-equal-to the value.  Accepts any valid value for CSS width.
			 */
			hideOnScreenWidth: {
				type: String,
				value: ""
			},

			/**
			 * Indicate that the property of this column should be the initial sort property.
			 */
			initialSort: {
				type: Boolean,
				value: false
			},

			/**
			 * Remove the column divider in the table header between this column and the previous column, and add a divider between the columns' row cells.
			 */
			mergeWithPreviousColumn: {
				type: Boolean,
				value: false
			},

			/**
			 * Property name from `data` to be used in this column.
			 */
			property: {
				type: String,
				value: "",
				reflectToAttribute: true
			},

			/**
			 * Remove the default cell padding for this column (excluding the header row).
			 */
			removeDefaultCellPadding: {
				type: Boolean,
				value: false
			},

			/**
			 * Indicate that this column is sortable.
			 */
			sortable: {
				type: Boolean,
				value: false
			},

			/**
			 * Column title.
			 */
			title: {
				type: String,
				reflectToAttribute: true,
				value: ""
			},

			/**
			 * The `iron-icon` to display instead of `title`.
			 */
			titleIcon: {
				type: String,
				value: ""
			},

			/**
			 * The type of the property (case-insensitive): "STRING", "BOOLEAN", "DATE", "DATETIME", "STRING_WITH_ID".
			 * Used to determine the default display.
			 */
			type: {
				type: String,
				value: "string"
			},

			/** 
			 * Indicates that this column will sort in reverse order, e.g. where a lower number has a higher value.
			 */
			reverseSort: {
				type: Boolean,
				value: false
			}
		}
	}

	/**
	 * Return style attribute value for table body cell elements
	 */
	get _bodyCellStyle() {
		return this._computeBodyCellStyleString();
	}

    /**
	 * Return style attribute value for column wrapper elements
	 */
	get _columnStyle() {
		return this._computeColumnStyleString();
	}

    /**
	 * Return style attribute value for table header cell elements
	 */
	get _headerCellStyle() {
		return this._computeHeaderCellStyleString();
	}
	
    /**
	 * Return the template to be used for each cell in this column
	 */
	get _columnTemplate() {
		var template = dom(this).querySelector('template');
		let slot = dom(this).querySelector('slot');
		if (!template && slot) {
			let nodes = dom(slot).getDistributedNodes();
			template = nodes.find(node => {
				return node.nodeName == "TEMPLATE"
			})
		}
		
		if (!template) {
			switch (this.type.toLowerCase()) {
				case "string":
					template = this.$.defaultTemplate;
					break;
				case "boolean":
					template = this.$.booleanTemplate;
					break;
				case "date":
					template = this.$.dateTemplate;
					break;
				case "datetime":
					template = this.$.dateTimeTemplate;
					break;
				case "string_with_id":
					template = this.$.stringWithIdTemplate;
					break;
				default:
					template = this.$.defaultTemplate;
					break;
			}
		}
		return template;
	}

    /**
	 * Return flag indicating if the user has provided a template for this column
	 */
	get _hasUserProvidedTemplate() {
		var template = dom(this).querySelector('template');
		return Boolean(template);
	}

    /**
	 * Generate `_bodyCellStyle` property by examining the CSS variables for `<triblock-table-column>`
	 */
	_computeBodyCellStyleString() {
		var styleString = "";

		var justifyContent = getComputedStyle(this).getPropertyValue("justify-content");
		if (justifyContent && justifyContent != "" && justifyContent != "flex-start") {
			styleString += "justify-content: " + justifyContent + ";";
			if (justifyContent == "center") styleString += "text-align: center;";
			else if (justifyContent == "flex-end") styleString += "text-align: right;";
		}
		
		return styleString;
	}

    /**
	 * Generate `_columnStyle` property by examining the CSS variables for `<triblock-table-column>`
	 */
	_computeColumnStyleString() {
		var styleString = "";

		var fixedWidth = getComputedStyle(this).getPropertyValue("max-width");
		if (fixedWidth && fixedWidth != "none") {
			// ignore other styles if a fixedWidth is set
			styleString = "min-width: "+fixedWidth+"; max-width: "+fixedWidth+"; width: "+fixedWidth+";";
		} else {
			var flexGrow = getComputedStyle(this).getPropertyValue("flex-grow");
			var flexShrink = getComputedStyle(this).getPropertyValue("flex-shrink");
			var flexBasis = getComputedStyle(this).getPropertyValue("flex-basis");

			styleString = "flex: "+flexGrow+" "+flexShrink+" "+flexBasis+";";
		}
		
		return styleString;
	}

    /**
	 * Generate `_headerCellStyle` property by examining the CSS variables for `<triblock-table-column>`
	 */
	_computeHeaderCellStyleString() {
		var styleString = "";

		var justifyContent = getComputedStyle(this.$.header).getPropertyValue("justify-content");
		if (justifyContent && justifyContent != "" && justifyContent != "flex-start") {
			styleString += "justify-content: " + justifyContent + ";";
			if (justifyContent == "center") styleString += " text-align: center;";
			else if (justifyContent == "flex-end") styleString += " text-align: right;";
		}
		
		return styleString;
	}

    /**
	 * Stamp a new template instance for the given stampBindingKey. (See templatize Module)
	 */
	_createTemplateInstance(stampBindingKey) {
		if (!this._templatized) {
			// this column hasn't been templatized yet (a.k.a. first call to this method) - templatize it

			// in templatize Module, _instanceProps defines what local properties are to be used when stamping instances of the template
			this._instanceProps = {};
			this._instanceProps[this.bindIndexAs] = true;
			this._instanceProps[this.bindItemAs] = true;
			this._instanceProps[this.bindValueAs] = true;
			this._instanceProps.tabIndex = true;

			// templatize this component
			let template = this._columnTemplate;
			this._templateClass = templatize(template, this, {
				parentModel: true,
				instanceProps: this._instanceProps,
				forwardHostProp: function (prop, value) {
					let cellInstances = this._cellInstances;
					if (!cellInstances) return;
					for (let i=0, inst; (i < cellInstances.length) && (inst=cellInstances[i]); i++) {
						inst.forwardHostProp(prop, value);
					}
				},
				notifyInstanceProp: function (inst, prop, value) {
					if (prop.indexOf(this.bindItemAs+".") === 0) {
						inst._cell.notifyPath("rowData."+prop.slice(this.bindItemAs.length+1), value);
					} else if (prop.indexOf(this.bindValueAs+".") === 0) {
						inst._cell.notifyPath("rowData."+this.property+"."+prop.slice(this.bindValueAs.length+1), value);
					}
				}
			});
			this._templatized = true;
		}
		// create template instance
		var instance = new this._templateClass(stampBindingKey);

		// keep track of all template instances created by this component
		if (!this._cellInstances) this._cellInstances = [];
		this._cellInstances.push(instance);

		return instance;
	}

	_onHideChange(hide) {
		if (!this.columnId && this.columnId != 0) {
			return;
		}

		this.dispatchEvent(new CustomEvent('hide-changed', {bubbles: true, composed: true, detail: {value: hide, columnId: this.columnId}}));
	}
}

customElements.define("triblock-table-column", TriblockTableColumn);