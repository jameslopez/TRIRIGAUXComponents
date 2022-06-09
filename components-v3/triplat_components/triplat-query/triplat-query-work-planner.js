/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */

import { PolymerElement } from '../@polymer/polymer/polymer-element.js';
import { Debouncer } from '../@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '../@polymer/polymer/lib/utils/async.js';

class TriplatQueryWorkPlanner extends PolymerElement {
	static get is() { return "triplat-query-work-planner"; }

	static get properties() {
		return {
			/**
			 * The start date for the range that you want to search. This must be in ISO format.
			 */
			startDate: {
				type: String
			},

			/**
			 * The end date for the range that you want to search. This must be in ISO format.
			 */
			endDate: {
				type: String
			},
			
			/**
			 * An object that holds a context ID or an array of context IDs for the work planner data source. If not specified, then the context-id from the triplat-ds-context will be used.
			 */ 
			contextId: {
				type: Object
			}
		};
	}
	
	static get observers() {
		return [
			"_handleQueryWorkPlannerChanged(startDate, endDate, contextId)"
		]
	}
	
	_handleQueryWorkPlannerChanged(startDate, endDate, contextId) {
		if (!startDate || !endDate) {
			return
		}
		this._debounceWorkPlannerChanged = Debouncer.debounce(
			this._debounceWorkPlannerChanged, 
			microTask, 
			() => {
				this.dispatchEvent(
					new CustomEvent(
						"triplat-query-work-planner-changed", 
						{
							detail: this.config,
							bubbles: true, composed: true
						}
					)
				);
			}
		);
	}
	
	get config() {
		const extractedContextId = this._getContextId();
		if (!this.startDate && !this.endDate && !extractedContextId) {
			return null;
		}
		return {startDate: this.startDate, endDate: this.endDate, contextId: extractedContextId}
	}
	
	_getContextId() {
		let contextIdObject = this.contextId;
		const single = !Array.isArray(contextIdObject);
		if (single) {
			return this._getContextIdFromObject(contextIdObject);
		} else {
			let contextIds = [];
			for(let indexContext in contextIdObject) {
				let contextId = this._getContextIdFromObject(contextIdObject[indexContext]);
				if (contextId) {
					contextIds.push(contextId);
				} else {
					console.warn("Skipped non numeric context id value: " + contextIdObject[indexContext]);
				}
			}
			return contextIds.length > 0 ? contextIds : null;
		}
	}
	
	_getContextIdFromObject(contextIdObject) {
		if (!contextIdObject) {
			return null;
		}
		let contextId = null;
		if(typeof contextIdObject === "object") {
			contextId = contextIdObject._id ? parseInt(contextIdObject._id) : null;
		} else {
			contextId = parseInt(contextIdObject);
		}
		if (!isNaN(contextId)) {
			return contextId;
		} else {
			console.warn("Non numeric context id value: "+contextId);
			return null;
		}
	}
}

window.customElements.define(TriplatQueryWorkPlanner.is, TriplatQueryWorkPlanner);