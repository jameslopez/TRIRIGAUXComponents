import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-routing/triplat-routing.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../@polymer/iron-pages/iron-pages.js';
import '../../@polymer/iron-icons/iron-icons.js';
import '../../@polymer/paper-fab/paper-fab.js';
import { TriRouteDemoData } from './people-data.js';
import './x-people.js';
import "./x-person.js";
import "./x-new-person.js";
import "../../triplat-theme/triplat-theme.js";

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<style>
				a {
					position: fixed;
					top: 50px;
					right: 50px;
				}
			</style>
				<triplat-route name="people" path="/"></triplat-route>
				<triplat-route id="personRoute" name="person" path="/:personId" params="{{personParams}}"></triplat-route>
				<triplat-route id="newPersonRoute" name="newPerson" path="/new"></triplat-route>

				<triplat-route-selector>
					<iron-pages>
						<x-people default-route route="people" people="{{people}}" on-person-selected="_handlePersonSelected" on-new-person="_handleNewPerson"></x-people>
						<x-person route="person" person="{{_selectedPerson}}"></x-person>
						<x-new-person route="newPerson"></x-new-person>
					</iron-pages>
				</triplat-route-selector>
				<a href="index.html" target="_blank">
					<paper-fab icon="icons:open-in-browser"></paper-fab>
				</a>
		`;
	}

	static get properties() {
		return {
			people: {
				type: Array,
				value: function() {
					return TriRouteDemoData;
				}
			}
		}
	}

	static get observers() {
		return [
			"_onPersonLoad(personParams.personId)"
		]
	}
		
	_handlePersonSelected(e) {
		this.$.personRoute.navigate({personId: e.detail});
	}

	_onPersonLoad(personId) {
		var foundPerson = null;
		this.people.forEach(function(person) {
			if (person.id == personId) {
				foundPerson = person;
				return false;
			}
		});
		this._selectedPerson = foundPerson;
	}

	_handleNewPerson() {
		this.$.newPersonRoute.navigate();
	}
}

window.customElements.define('tri-demo', TriDemo);