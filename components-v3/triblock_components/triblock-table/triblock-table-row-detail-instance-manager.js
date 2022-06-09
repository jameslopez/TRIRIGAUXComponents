/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
/*
`triblock-table-row-detail-instance-manager` manages the data-binding of a single row-detail section to and from the `triblock-table` data array. This is designed for internal use within the `triblock-table` component only.
*/
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import * as async from '../@polymer/polymer/lib/utils/async.js'

class TriblockTableRowDetailInstanceManager extends PolymerElement {
	static get properties() {
		return{
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
			 * The `detail-id` attribute value for the `triblock-table-row-detail` that is associated to this row-detail instance.
			 */
			detailId: {
				type: String,
				value: "",
				reflectToAttribute: true
			},
	
			/**
			 * Row index value that is passed in from the `iron-list`.
			 */
			index: {
				type: String,
				reflectToAttribute: true,
				observer: "_handleIndexChange"
			},
	
			/**
			 * Row data that is passed in from the `iron-list`.
			 */
			rowData: {
				type: Object,
				notify: true,
				reflectToAttribute: true
			},
			
			/**
			 * The `tabIndex` value that is passed in from the `iron-list`.
			 */
			tabIndex: {
				type: String,
				reflectToAttribute: true,
				observer: "_handleTabIndexChange"
			},

			rowDetail: {
				type: Object
			},

			tableBodyRef: {
				type: Object
			}
		}
	}

	static get observers(){
		return [ 
			"_handleRowDataChange(rowData.*, rowDetail)" 
		];
	}

	/**
	 * Update the template instance for this row-detail section with the row index
	 */
	_handleIndexChange(index) {
		if (index != null && index != "{{index}}" && this._instance) {
			this._instance.notifyPath(this.bindIndexAs, parseInt(index)+1, true);
		}
	}

	/**
	 * Create or update the template instance for this row-detail section with the new row data
	 */
	_handleRowDataChange(change, rowDetail) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (change.path == "rowData") {
			// rowData change
			var item = change.value;
			if (item && item != "{{item}}") {
				if (this._instance) {
					// template instance already created for this row-detail section - update the data bindings
					this._instance.notifyPath(this.bindItemAs, item, true);
				} else {
					// template instance needs to be created and initialized for this row-detail section 

					// create binding key object which has initial values for the instance binding variables
					var stampBindingKey = {};
					stampBindingKey[this.bindIndexAs] = (this.index && this.index != "{{index}}") ? parseInt(this.index)+1 : "";
					stampBindingKey[this.bindItemAs] = item;
					stampBindingKey.tabIndex = (this.tabIndex && this.tabIndex != "{{tabIndex}}") ? parseInt(this.tabIndex) : "-1";

					var instance = this.rowDetail._createTemplateInstance(stampBindingKey);
					// store references to/from the template instance and this component for later use
					this._instance = instance;
					instance._rowDetail = this;

					let slotName = "row-detail-row" + this.index;
					
					// append slot as sibling to the host
					var parentDom = dom(this).parentNode;
					let rowDetailSlot = dom(parentDom).querySelector("#rowDetailSlot");
					rowDetailSlot.setAttribute("name", slotName);

					// append to light dom of triblock-table-body
					let cellInnerDiv = document.createElement("div");
					cellInnerDiv.setAttribute("slot", slotName);
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
				// update {{item}} subproperty bindings
				var changedPath = change.path.substring(change.path.indexOf('.') + 1);
				this._instance.notifyPath(this.bindItemAs+"."+changedPath, change.value, true);
			} else {
				console.warn("Unexpected rowData subproperty change before row detail instance has been stamped.");
			}
		}
	}

	/**
	 * Update the template instance for this cell with the tabIndex
	 */
	_handleTabIndexChange(tabIndex) {
		if (tabIndex != null && tabIndex != "{{tabIndex}}" && this._instance) {
			this._instance.notifyPath("tabIndex", parseInt(tabIndex), true);
		}
	}

}

customElements.define('triblock-table-row-detail-instance-manager', TriblockTableRowDetailInstanceManager);

