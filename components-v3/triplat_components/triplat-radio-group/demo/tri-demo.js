import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-radio-group/triplat-radio-group.js';
import '../../triplat-theme/triplat-theme.js';

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<style>
				.radio-group-class {
					font-style: italic;
					--triplat-radio-group-item-padding: 7px;
					--triplat-radio-button-size: 16px;
					--triplat-radio-button-label-color: green;
					--triplat-radio-button-unchecked-color: blue;
					--triplat-radio-button-checked-color: red;
				}
			</style>
			<h3>Prefixes:</h3>
			Selected prefix is <b><span>{{prefix}}</span></b>
			<p></p>	

			<triplat-radio-group
				class="radio-group-class"
				description="Prefixes options"
				value="{{prefix}}"
				select-src="{{inputData}}"></triplat-radio-group>
		`;
	}

	static get properties() {
		return {
			inputData : {
                type: Array,
                value: [{value: "Mr."},
                {value: "Mrs."},
                {value: "Miss"},
                {value: "Ms."},
                {value: "Dr."},
                {value: "Prof."}]
            },
            
            prefix: String
		}
	}
}

window.customElements.define('tri-demo', TriDemo);