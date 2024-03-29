/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../triplat-geo/triplat-geo.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component that provides the closest location according to the user's Global Positioning System(GPS) coordinates.

<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
  <b>Note:</b> For the latest versions of supported browsers, the server must be running on a secure URL (HTTPS). Otherwise, requesting access for the user's location will not be triggered because non-HTTPS (HTTP) will be treated as an unsecured origin.
  </div>
</div>

### Declaring Examples

Example of searching a location. This will provide the closest location found as well as
the locations found within the defined threshold.

	<triplat-search-location locations="{{locations}}"
		closest-location="{{closestLocation}}"
		locations-within-threshold="{{withinThreshold}}">
	</triplat-search-location>

Example of searching a location with more complexity. This will provide the closest location and closest distance found as well as the locations found within the defined threshold. This will also watch the user's position changes and will use
the accuracy provided.

	<triplat-search-location locations="{{locations}}"
		closest-location="{{closestLocation}}" closest-distance="{{closestDistance}}"
		locations-within-threshold="{{withinThreshold}}" accuracy="10"
		is-watch-position>
	</triplat-search-location>
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<triplat-geo id="geoLocation" latitude="{{latitude}}" longitude="{{longitude}}" accuracy="{{accuracy}}" is-watch-position="{{isWatchPosition}}" time-out="{{timeOut}}" maximum-age="{{maximumAge}}" disable="{{disable}}">
		</triplat-geo>
	`,

    is: "triplat-search-location",

    /**
	 * Fired after finding the geo location successfully.
	 * The event detail includes the detected latitude and longitude.
	 *
	 * @event triplat-geo-success
	 */

	/**
	* Fired after finding the geo location with no success.
	*
	* @event triplat-geo-error
	*/

	properties: {
		/**
		 * The length of time (millisecond) that the device is given to return the coordinates.  
		 */
		timeOut: {
			type: Number,
			value: 10000
		},
		/**
		 * Set to <b>true</b> will update the current position information when the device is moved or 
		 * a more accurate location is detected.
		 */
		isWatchPosition:{
			type: Boolean,
			value: false
		},
		/**
		 * A number that represents the accuracy of the coordinates (latitude and longitude) in meters. 
		 */
		accuracy: {
			type: Number,
			readOnly: true,
			notify: true,

		},
		/**
		 * The length of time (milliseconds) that the device accepts cached positions. 
		 */
		maximumAge: {
			type: Number,
			value: 600000
		},
		/*
		 * The locations data object to which the data source values can be bound.
		 */
		locations: {
			type: Object,
			notify: true,
			readOnly: false
		},
		/*
		 * The radius(meters) of a circle around the position of
		 * the user where locations can be found.
		 */
		threshold: {
			type: Number,
			value: 100
		},
		/*
		 * An array of locations found within the 
		 * threshold.
		 */
		locationsWithinThreshold: {
			type: Object,
			notify: true,
			value: null
		},
		/*
		 * Closest location found.
		 */
		closestLocation: {
			type: Object,
			notify: true,
			value: null
		},
		/*
		 * Closest distance found.
		 */
		closestDistance: {
			type: Number,
			notify: true,
			value: 0
		},
		/**
		 * A flag to disable the detection of a location.
		 */
		disable: {
			type: Boolean,
			notify: false,
			readOnly: false,
			observer: "_disableChanged"
		},
		_geoLocationFound: {
			type: Boolean,
			value: false,
			readOnly: true
		},
	},

    listeners: {
		'triplat-geo-success': '_handleSuccessGeoLocation'
	},

    observers: [
		"_findLocation(locations.*, _geoLocationFound)"
	],

    _handleSuccessGeoLocation: function(){
		this._set_geoLocationFound(true);
	},

    _findLocation: function(change, geoLocationFound){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(!geoLocationFound){
			return;
		}

		if(change.path == "locations"
			&& change.value && change.value.length > 0){
			this._findClosestLocation(change.value);
		}
	},

    _findClosestLocation: function(value){
		if (!this.disable) {
			var locations = value;
			var tmpLocationsWithinThreshold = [];
			var tmpClosestLocation = null;
			var tmpClosestDistance = -1;
			for (var i = 0; i < locations != null && i < locations.length; i++) {
				var location = locations[i];
				var distance = this._getDistanceBetween(this.latitude, this.longitude, location.latitude, location.longitude);
				//within Location Threshold
				if(distance <= this.threshold){
					tmpLocationsWithinThreshold.push(location);
				}
				//closest location
				if(tmpClosestDistance == -1 || tmpClosestDistance > distance){
					tmpClosestDistance = distance;
					tmpClosestLocation = location;
				}
			};
			this.set("locationsWithinThreshold", tmpLocationsWithinThreshold.length > 0 ? 
				tmpLocationsWithinThreshold : []);
			if(tmpClosestDistance > -1){
				this.set("closestDistance", tmpClosestDistance);
				this.set("closestLocation", tmpClosestLocation);
			}
		}
	},

    /**
	* Implements the haversine formula to determine 
	* the great-circle distance between two
	* points on a sphere given their latitudes
	* and longitudes.
	*/
	_getDistanceBetween: function(lat1, lng1, lat2, lng2) {
		var earthRadius = 6371;
		var latitudeDistance = this._degreeToRadians(lat2-lat1);
		var longitudeDistance = this._degreeToRadians(lng2-lng1);
		var a = Math.sin(latitudeDistance/2) * 
			Math.sin(latitudeDistance/2) +
			Math.cos(this._degreeToRadians(lat1)) * 
			Math.cos(this._degreeToRadians(lat2)) * 
			Math.sin(longitudeDistance/2) * 
			Math.sin(longitudeDistance/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return (earthRadius * c) * 1000;
	},

    _degreeToRadians: function(value){
		return value * (Math.PI / 180);
	},

    _disableChanged: function(disable){
		if(disable){
			this._set_geoLocationFound(false);
			this.set("closestLocation", null);
			this.set("closestDistance", 0);
		}
	}
});