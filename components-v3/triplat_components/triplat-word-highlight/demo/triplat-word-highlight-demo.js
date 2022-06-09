/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from "../../@polymer/polymer/polymer-element.js";

import "../../@polymer/iron-list/iron-list.js";

import "../../@polymer/paper-input/paper-input.js";

import "../../triplat-theme/triplat-theme.js";
import "../../triplat-word-highlight/triplat-word-highlight.js";

class TriplatWordHighlightDemo extends PolymerElement {
	static get template() {
		return html `
			<style include="tristyles-theme">
				.result {
					border: 1px solid var(--tri-secondary-color);
					border-radius: 10px;
					margin: 15px 0;
					padding: 15px;
				}

				.result > * {
					margin: 10px 0;
				}

				.list-item {
					padding: 5px 0;
				}
			</style>
			
			<h3>Word Highlight</h3>
			<p>Type one of the words in the list to see the "triplat-word-highlight" component in action.</p>

			<paper-input label="Search" value="{{_searchValue}}" always-float-label></paper-input>

			<div class="result">
				<h4>List</h4>

				<iron-list items="[[_listValues]]">
					<template>
						<div class="list-item">
							<triplat-word-highlight value="[[item]]" search-value="[[_searchValue]]"></triplat-word-highlight>
						</div>
					</template>
				</iron-list>
			</div>

		`;
	}

	static get properties() {
		return {
			_searchValue: {
				type: String,
				value: ""
			},

			_listValues: {
				type: Array,
				value: () => {
					return [
						"Apple",
						"Banana",
						"Dollar$",
						"Euro€"
					];
				}
			}
		}
	}
}

window.customElements.define('triplat-word-highlight-demo', TriplatWordHighlightDemo);