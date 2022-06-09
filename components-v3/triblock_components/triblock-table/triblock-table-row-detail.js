/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { templatize } from '../@polymer/polymer/lib/utils/templatize.js';
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/*

`triblock-table-row-detail` defines the metadata necessary to create an expandable detail section beneath each row in the table.  Including `triblock-table-row-detail` is optional.  When included, an icon will appear on each row allowing the user to expand and collapse the detail section.

To add a row-detail section, provide a `template` inside `triblock-table-row-detail`.

Example:

```html
<triblock-table data="{{data}}">
	<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
	<triblock-table-column title="Name" property="name"></triblock-table-column>
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

Row-detail templates should bind to template models of the following structure:

```js
{
	item: {},        // user data corresponding to data[index]
	index: 0,        // index in the data array
	tabIndex: -1,    // a dynamically generated tabIndex 
									 // for focus management (managed by internal iron-list)
}
```

*/
class TriblockTableRowDetail extends PolymerElement {

	static get properties() {
		return {
			/**
			 * The name of the data-binding variable representing the row index (that is passed in from `triblock-table`).
			 */
			bindIndexAs: {
				type: String,
				value: "index",
				reflectToAttribute: true
			},

			/**
			 * The name of the data-binding variable representing the row data object (that is passed in from `triblock-table`).
			 */
			bindItemAs: {
				type: String,
				value: "item",
				reflectToAttribute: true
			},

			detailId: {
				type: String,
				notify: true,
				reflectToAttribute: true
			}
		}
	}

	get _rowDetailTemplate() {
		let template = dom(this).querySelector('template');
		let slot = dom(this).querySelector('slot');
		if (!template && slot) {
			let nodes = dom(slot).getDistributedNodes();
			template = nodes.find(node => {
				return node.nodeName == "TEMPLATE"
			})
		}
		return template;
	}

	get _hasUserProvidedTemplate() {
		return Boolean(this._rowDetailTemplate);
	}

	/**
	 * Stamp a new template instance for the given stampBindingKey. (See Polymer.Templatizer)
	 */
	_createTemplateInstance(stampBindingKey) {
		if (!this._templatized) {
			// this row-detail section hasn't been templatized yet (a.k.a. first call to this method) - templatize it

			// in Polymer.Templatizer, _instanceProps defines what local properties are to be used when stamping instances of the template
			this._instanceProps = {};
			this._instanceProps[this.bindIndexAs] = true;
			this._instanceProps[this.bindItemAs] = true;
			this._instanceProps.tabIndex = true;

			// templatize this component
			let template = this._rowDetailTemplate;
			if (template) {
				this._templateClass = templatize(template, this, {
					parentModel: true,
					instanceProps: this._instanceProps,
					forwardHostProp: function (prop, value) {
						let rowDetailInstances = this._rowDetailInstances;
						if (!rowDetailInstances) return;
						for (let i=0, inst; (i < rowDetailInstances.length) && (inst=rowDetailInstances[i]); i++) {
							inst.forwardHostProp(prop, value);
						}
					}
				});
				this._templatized = true;
			}
		}

		// create template instance
		var instance = new this._templateClass(stampBindingKey);

		// keep track of all template instances created by this component
		if (!this._rowDetailInstances) this._rowDetailInstances = [];
		this._rowDetailInstances.push(instance);

		return instance;
	}
}

customElements.define("triblock-table-row-detail", TriblockTableRowDetail);