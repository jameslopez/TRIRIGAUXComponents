/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
/*
`triblock-table-cell-instance-manager` manages the data-binding of a single cell to and from the `triblock-table` data array. This is designed for internal use within `triblock-table` component only.
*/

import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '../@polymer/polymer/lib/legacy/class.js';
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import { TriBlockViewResponsiveBehavior } from "../triblock-responsive-layout/triblock-view-responsive-behavior.js";
import * as async from '../@polymer/polymer/lib/utils/async.js'

class TriblockTableCellInstanceManager extends mixinBehaviors([TriBlockViewResponsiveBehavior], PolymerElement) {
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

			/**
			 * The name of the data-binding variable representing the row data value that corresponds to the `property` of the context column (that is passed in from `triblock-table`).
			 */
			bindValueAs: {
				type: String,
				value: "value",
				reflectToAttribute: true
			},

			column: {
				type: Object
			},
			
			/**
			 * The `column-id` attribute value for the `triblock-table-column` that is associated to this cell instance.
			 */
			columnId: {
				type: String,
				notify: true,
				reflectToAttribute: true
			},

			/**
			 * Default value that is passed in from the associated `triblock-table-column`.
			 */
			defaultValue: {
				type: Object,
				value: ""
			},

			hiddenByColProp: {
				type: Boolean,
				reflectToAttribute: true
			},

			/**
			 * Row index value that is passed in from the `iron-list`.
			 */
			index: {
				type: String,
				reflectToAttribute: true
			},

			/**
			 * Property name that is passed in from the associated `triblock-table-column`.
			 */
			property: {
				type: String,
				value: "",
				reflectToAttribute: true
			},

			/**
			 * Row data that is passed in from the `iron-list`.
			 */
			rowData: {
				type: Object,
				notify: true
			},

			/**
			 * The `tabIndex` value that is passed in from the `iron-list`.
			 */
			tabIndex: {
				type: String,
				reflectToAttribute: true
			},

			tableId: {
				type: Number
			},

			tableBodyRef: {
				type: Object
			}
		}
	}

	static get observers() {
		return [
			"_handleRowDataChange(rowData.*)",
			"_handleTabIndexChange(tabIndex, _instance)",
			"_handleIndexChange(index, _instance)",
			"_handleHiddenByScreenWidth(smallScreenWidth, column.hideOnScreenWidth)"
		]
	}

	ready() {
		super.ready();
		let hideOnScreenWidth = this.column.hideOnScreenWidth;
		if (hideOnScreenWidth != null && hideOnScreenWidth != "") {
			this.set("smallScreenMaxWidth", hideOnScreenWidth);
		}
	}

	/**
	 * Compute the {{value}} binding value for the templatizer instance
	 */
	_computeValueBinding(item, property) {
		if (!assertParametersAreDefined(arguments)) {
		    return this.defaultValue;
		}

		return (item[property] == null || item[property] === "") ? this.defaultValue : item[property];
	}

	/**
	 * Update the template instance for this cell with the row index
	 */
	_handleIndexChange(index, instance) {
		if (index != null && index != "{{index}}" && instance) {
			instance.notifyPath(this.bindIndexAs, parseInt(index)+1, true);
		}
	}

	/**
	 * Create or update the template instance for this cell with the row data
	 */
	_handleRowDataChange(change) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (change.path == "rowData") {
			// rowData change
			var item = change.value;
			if (item && item != "{{item}}") {
				if (this._instance) {
					// template instance already created for this cell - update the data bindings
					this._instance.notifyPath(this.bindItemAs, item, true);
					this._instance.notifyPath(this.bindValueAs, this._computeValueBinding(item, this.property), true);
				} else {
					// template instance needs to be created and initialized for this cell 

					// create binding key object which has initial values for the instance binding variables
					var stampBindingKey = {};
					stampBindingKey[this.bindIndexAs] = (this.index && this.index != "{{index}}") ? parseInt(this.index)+1 : "";
					stampBindingKey[this.bindItemAs] = item;
					stampBindingKey[this.bindValueAs] = this._computeValueBinding(item, this.property);
					stampBindingKey.tabIndex = (this.tabIndex && this.tabIndex != "{{tabIndex}}") ? parseInt(this.tabIndex) : "-1";

					var instance = this.column._createTemplateInstance(stampBindingKey);

					// store references to/from the template instance and this component for later use
					this._instance = instance;
					instance._cell = this;

					let slotName = "cell-row" + this.index + "-column" + this.columnId;

					// append slot as sibling to the host
					var parentDom = dom(this).parentNode;
					let cellSlot = dom(parentDom).querySelector("#cellSlot");
					cellSlot.setAttribute("name", slotName);

					// append to light dom of triblock-table-body
					let cellInnerDiv = document.createElement("div");
					cellInnerDiv.setAttribute("slot", slotName);
					cellInnerDiv.style.cssText = parentDom.style.cssText;
					cellInnerDiv.appendChild(instance.root);
					async.microTask.run(() => {
						dom(this.tableBodyRef).appendChild(cellInnerDiv);
					});
				}
			}
		} else if (change.path == "rowData.splices") {
			console.warn("Unexpected rowData splice encountered");
		} else {
			// rowData property change
			if (this._instance) {
				var changedPath = change.path.substring(change.path.indexOf('.') + 1);

				// update {{item}} subproperty bindings
				this._instance.notifyPath(this.bindItemAs+"."+changedPath, change.value, true);

				// update {{value}} bindings
				if (changedPath == this.property) {
					// update value itself
					this._instance.notifyPath(this.bindValueAs, change.value, true);
				} else if (changedPath.indexOf(this.property+'.') == 0) {
					// update value subproperty
					var valuePath = this.bindValueAs + "." + changedPath.substring(changedPath.indexOf('.') + 1);
					this._instance.notifyPath(valuePath, change.value, true);
				}
			} else {
				console.warn("Unexpected rowData subproperty change before cell instance has been stamped.");
			}
		}
	}
	
	/**
	 * Update the template instance for this cell with the tabIndex
	 */
	_handleTabIndexChange(tabIndex, instance) {
		if (tabIndex != null && tabIndex != "{{tabIndex}}" && instance) {
			instance.notifyPath("tabIndex", parseInt(tabIndex), true);
		}
	}

	_handleHiddenByScreenWidth(smallScreenWidth, hideOnScreenWidth) {
		if (!assertParametersAreDefined(arguments)) {
		    return false;
		}

		let columnDom = dom(dom(this).parentNode).parentNode;
		if (columnDom) {
			let hide = hideOnScreenWidth != null && hideOnScreenWidth != "" && smallScreenWidth;
			if (hide) {	
				columnDom.setAttribute("hidden-by-screen-width", "");
			} else {
				columnDom.removeAttribute("hidden-by-screen-width");
			}
		}
	}

}

customElements.define('triblock-table-cell-instance-manager', TriblockTableCellInstanceManager);