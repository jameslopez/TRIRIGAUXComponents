import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../triplat-geo/triplat-geo.js';
import '../../@polymer/paper-material/paper-material.js';

class TriDemo extends PolymerElement {
	static get template() {
		return html `
		<style>
            paper-material {
                padding: 20px;
                background-color: white;
                margin-top: 30px;
            }
        </style>
        
        <triplat-geo latitude="{{latitude}}" longitude="{{longitude}}" accuracy="{{accuracy}}" 
         is-watch-position time-out="200" maximum-age="1000" api-key="1234"></triplat-geo>

        <div class="layout horizontal center-justified">
            <paper-material z="1">
                <div>Latitude: <b><span>{{latitude}}</span></b></div>
                <div>Longitude: <b><span>{{longitude}}</span></b></div>
                <div>Accuracy: <b><span>{{accuracy}}</span>m</b></div>

                <div>Test out the geo coordinates with Google Maps</div>
                <a href="[[_buildGoogleMapsUrl(latitude, longitude)]]">[[_buildGoogleMapsUrl(latitude, longitude)]]</a>
            </paper-material>
        </div>	
		`;
    }

    static get properties() {
        return {
            latitude: Number,
            longitude: Number
        }
    }
    
    _buildGoogleMapsUrl(selectedLocation) {
        var apiUrl = "https://www.google.com/maps/search/?api=1";
        return this._buildMapsUrl(apiUrl, "query", this.latitude, this.longitude);
    }

    _buildMapsUrl(apiUrl, destParam, latitude, longitude) {
        var url = [apiUrl];
        var destination = latitude + "," + longitude;
        url.push(destParam + "=" + destination);

        return url.join("&");
    }
}

window.customElements.define('tri-demo', TriDemo);