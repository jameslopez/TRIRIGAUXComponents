/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { PolymerElement, html } from "../@polymer/polymer/polymer-element.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/**
 * `triplat-word-highlight` is a component that highlights a string in bold, based on a given value. 
 * This can be useful in a search, where an input string is typed by a user, 
 * and the results are displayed with that input string highlighted.
 * 
 * Example: In the word "Highlight", the string "light" will be highlighted in bold.
 * 
 * ```html
 * <triplat-word-highlight value="Highlight" search-value="light">
 * </triplat-word-highlight>
 * ```
 * 
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TriplatWordHighlight extends PolymerElement {
	static get template() {
		return html `
			<style include="tristyles-theme">
				:host {
					display: inline;
				}
			</style>
		`
	}

	static get properties() {
		return {
			/**
			 * The base value. This is the string that is highlighted in bold, based on a given value (`searchValue`).
			 */
			value: {
				type: String,
				value: ""
			},

			/**
			 * The search value that is used to highlight the string `value`.
			 */
			searchValue: {
				type: String,
				value: ""
			}
		}
	}

	static get observers() {
		return [
			"_handleValueChanged(value, searchValue)"
		]
	}

	_handleValueChanged(value, searchValue) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}

		const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
		let text = "";

		if (searchValue == null) {
			searchValue = "";
		}

		if (value != null) {
			let escapedSearchValue = searchValue.replace(matchOperatorsRegex, '\\$&');
			let regex = new RegExp('(' + escapedSearchValue + ')','i');
			text = value.replace(regex, "<strong>$1</strong>");
		}

		dom(this.root).innerHTML = text;
	}
}

customElements.define('triplat-word-highlight', TriplatWordHighlight);