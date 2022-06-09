/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-icon/triplat-icon.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-icon/ibm-icons.js';
import '../../triplat-icon/ibm-icons-medium.js';
import '../../triplat-icon/ibm-icons-large.js';
import '../../triplat-icon/ibm-icons-glyphs.js';
import '../../triplat-icon/carbon-icons-16.js';
import '../../triplat-icon/carbon-icons-20.js';
import { IronMeta } from "../../@polymer/iron-meta/iron-meta.js";

class TriDemo extends PolymerElement {
	static get template() {
        return html `
            <style include="iron-flex iron-flex-alignment">

                .set {
                    margin: auto;
                    padding: 1em 0;
                    border-bottom: 1px solid silver;
                }

                .container {
                    min-width: 10em;
                    padding: 1em 0.5em;
                    text-align: center;
                }

                .container > div {
                    margin-top: 0.5em;
                    color: black;
                    font-size: 12px;
                }
            </style>

            <template is="dom-repeat" items="{{iconsets}}">
                <h2>Icon Set (prefix): {{item.name}}</h2>
                <h3>This prefix is not needed when triplat-icon is used except for when the same icon exists in multiple icon sets.</h3>
                <div><b>Note:</b> CSS can be used to size these icons as needed, but their native size is {{item.size}}px.</div>
                <div class="set horizontal wrap layout">
                    <template is="dom-repeat" items="{{getIconNames(item)}}">
                        <span class="container vertical center layout flex-1">
                            <triplat-icon tab-index="0" icon="{{item}}"></triplat-icon>
                            <div>{{removePrefix(item)}}</div>
                        </span>
                    </template>
                </div>
            </template>
        `;
    }

    static get properties() {
        return {
            iconsets: {
                type: Array,
                value: new IronMeta({
                    type: "iconset"
                }).list
            }
        }
    }

    ready() {
        super.ready();
        console.log(this.iconsets);
    }

    removePrefix(item) {
        return item.substring(item.indexOf(":")+1);
    }

    getIconNames(iconset) {
        var fullset = iconset.getIconNames();
        return fullset;
    }
}

window.customElements.define('tri-demo', TriDemo);