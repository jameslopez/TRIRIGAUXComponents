/*<!--
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
-->*/
import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../@polymer/paper-listbox/paper-listbox.js';
import '../../@polymer/paper-item/paper-item.js';
import '../../@polymer/iron-icons/iron-icons.js';
import '../../@polymer/paper-fab/paper-fab.js';

class Xpeople extends PolymerElement {
	static get template() {
		return html`
			<style>
				.scroll-container {
					@apply --layout-fit;
					overflow-y: auto;
				}
				paper-fab {
					position: fixed;
					bottom: 100px;
					right: 100px;
					color: white;
					background-color: red;
				}
			</style>
			<div class="scroll-container">
				<paper-listbox selected-item="{{selectedPersonItem}}" attr-for-selected="id">
					<template is="dom-repeat" items="[[people]]">
						<paper-item id="[[item.id]]">[[item.first]]</paper-item>
					</template>
				</paper-listbox>
			</div>
			<paper-fab icon="icons:add" on-tap="_handleNewPerson"></paper-fab>
		`;
	}

	static get properties() {
		return {
			people: {
				type: Array,
				notify: false,
				readOnly: false
			},
			selectedPerson: {
				type: Object,
				notify: true,
				readOnly: true
			}
		}
	}

	static get observers() {
		return [
			"_handleSelectPerson(selectedPersonItem)"
		]
	}

	_handleSelectPerson (selectedPersonItem) {
		if (!selectedPersonItem) {
			return;
		}
		this.dispatchEvent(new CustomEvent('person-selected', {bubbles: true, composed: true, detail: selectedPersonItem.id}));
	}

	_handleNewPerson () {
		this.dispatchEvent(new CustomEvent('new-person'));
	}
}

window.customElements.define('x-people', Xpeople);
