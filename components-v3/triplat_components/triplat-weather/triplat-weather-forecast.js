/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriplatWeatherBehavior } from "./triplat-weather-behavior.js";
import { TriDateUtilities } from "../triplat-date-utilities/triplat-date-utilities.js";

/*
A component that retrieves the forecasted weather information for a given location from The Weather Channel (TWC) using the TWC API.
Weather forecasts are generated from The Weather Channel Forecast system. The return forecasts object contains weather data such as temperatures, winds, and pressure.

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
    <b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
  </div>
</div>

<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
  <b>Note:</b> The Weather Channel API requires a license and is constrained by the API Key entitlements. To use this component, update TRIRIGAWEB.properties file and set The Weather Channel API license key in the WEATHER_API_KEY property.
  </div>
</div>

Example of requesting 10 days of forecasted weather data. When the API path is not specified, the default is 10 days.

	<triplat-weather-forecast
	   auto
	   postal-and-country-code="30075:US"
	   date="{{_computeDueDate(data.triReserveAdvanceLimitDT)}}"
	   forecasts="{{forecasts}}"
	   forecast="{{forecast}}"></triplat-weather-forecast>

The return forecasts object contains an array of forecasted data. If the date property is set and it is within the 10-day range, the forecast object will contain the forecast of that day.

Example of using the forecasted weather data.

	<div class="blurb">[[forecast.night.phrase_32char]]</div>
	<div class="temps">
	  <div class="max-temp">High: [[forecast.max_temp]] Fahrenheit</div>
	  <div class="min-temp">Low: [[forecast.min_temp]] Fahrenheit</div>
	</div>
	
Example of requesting 5 days of forecasted weather data. If your API key is authorized for only the 10-day forecast, and you attempt to request a 5-day forecast, you will get an error stating 
that "API not allowed for this API key."


	<triplat-weather-forecast
	   auto
	   api-path="daily/5day"
	   postal-and-country-code="30075:US"
	   date="{{_computeDueDate(data.triReserveAdvanceLimitDT)}}"
	   forecasts="{{forecasts}}"
	   forecast="{{forecast}}"></triplat-weather-forecast>

### Units of measurement

The Weather Channel API supports the following units of measurement: e = English units, m = Metric units, and h = Hybrid units (UK).
Example of requesting the forecasted weather conditions with Metric units. The return forecasts object includes temperatures in Celsius.  

	<triplat-weather-forecast
	   auto
	   postal-and-country-code="30075:US"
	   date="{{_computeDueDate(data.triReserveAdvanceLimitDT)}}"
	   units="m"
	   forecasts="{{forecasts}}"
	   forecast="{{forecast}}"></triplat-weather-forecast>

### Translation

The Weather Channel API handles the translation of phrases. A valid language must be passed along the request.
Example of requesting the forecasted weather conditions with the Spanish language. The return forecasts object includes phrases in Spanish.  

	<triplat-weather-forecast
	   auto
	   postal-and-country-code="30075:US"
	   date="{{_computeDueDate(data.triReserveAdvanceLimitDT)}}"
	   language="es-ES"
	   forecasts="{{forecasts}}"
	   forecast="{{forecast}}"></triplat-weather-forecast>


As mentioned above, the return forecasts object includes many properties that describe the weather conditions. It also includes icon information such as icon codes and their associated weather phrases.  
  
See The Weather Channel API documentation for more details about the forecasted weather information and usage.
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					display: none;
				}
			
		</style>

		<iron-ajax id="ajax" handle-as="json" on-response="_onResponse" on-error="_onError"></iron-ajax>
	`,

    is: "triplat-weather-forecast",

    /**
	 * Fired when a response from The Weather Channel API is completed.
	 *
	 * @event triplat-weather-forecast-response-complete
	 */

	/**
	 * Fired when a response from The Weather Channel API fails.
	 *
	 * @event triplat-weather-forecast-response-error
	 */

	behaviors: [TriplatWeatherBehavior, TriDateUtilities],

    properties: {

		/*
		 * If location is provided, automatically request the weather conditions for this location.
		 */
		auto: {
			type: Boolean
		},

		/*
		 * URL to The Weather Channel API.
		 */
		baseUrl: {
			type: String,
			value: "https://api.weather.com"
		},

		/*
		 * Path to The Weather Channel API. The default API path requests 10 days of weather forecasts.
		 * See The Weather Channel API documentation for valid forecast API paths.
		 */
		apiPath: {
			type: String,
			value: "daily/10day"
		},

		/*
		 * The Weather Channel API license key. The license key will be loaded from Tririga web properties file (WEATHER_API_KEY property).
		 */ 
		_apiKey: {
			type: String
		},

		/*
		 * The requested language. The Weather Channel API supports the translation of phrases based on the requested language.
		 * For example, The Weather Channel API returns the phrase "Cloudy" for English en-US and "Nublado" for Spanish es-ES.
		 * See The Weather Channel API documentation for valid languages.
		 */
		language: {
			type: String,
			value: "en-US"
		},

		/*
		 * The unit of measure for the response. The following values are supported: e = English units, m = Metric units, and h = Hybrid units (UK).
		 * For temperatures in Celsius, use Metric unites, and for temperatures in Fahrenheit, use English units.
		 * See The Weather Channel API documentation for valid units of measurement.
		 */
		units: {
			type: String,
			value: "e"
		},

		/*
		 * String that represents a location based on postal code and country code.
		 * Format {postal code}:{country code}.
		 * Supported country postal codes: US (United States), GB (United Kingdom), FR (France), DE (Germany) , IT (Italy).
		 * For example, 89178:US.
		 * See The Weather Channel API documentation for valid country codes.
		 */
		postalAndCountryCode: {
			type: String
		},

		/*
		 * String that represents a location based on geocode.
		 * Format {latitude}:{longitude}.
		 * For example, 36.0671730:-115.1616650.
		 */
		latAndLong: {
			type: String
		},

		/*
		 * The date for the forecast object. If the date is not within the range of the forecasts object then the forecast object will be null.
		 */
		date: {
			type: Date
		},

		/*
		 * The return forecast weather object for the specified date property. It contains weather data such as temperatures, winds, and pressure.
		 */
		forecast: {
			type: Object,
			notify: true,
			readOnly: true,
			value: null
		},

		/*
		 * The return forecasts weather object . It contains an array of forecasted data, each with many properties. The data values in this API are populated 
		 * into Day, Night, or 24-hour segments. If the date property is set and it is within the 10-day range, the forecast object will contain the forecast of that day.
		 * See The Weather Channel API documentation for details about the forecasted weather information.
		 */
		forecasts: {
			type: Object,
			notify: true,
			readOnly: true,
			value: null
		}

	},

    listeners: {
		'triplat-weather-apikey-update':'_updateAPIKey',
		'triplat-weather-generate-request':'generateRequest'
	},

    observers: [
		"initForPostalCode(auto, baseUrl, _apiKey, language, units, date, postalAndCountryCode)",
		"initForLatAndLong(auto, baseUrl, _apiKey, language, units, date, latAndLong)"
	],

    _updateAPIKey: function(e) {
		this.set("_apiKey", e.detail);	
	},

    /* Request forecased weather information from The Weather Channel API.
	 * The API supports requests by postal code or by geocode (latitude and longitude).
	 */
	generateRequest: function() {
		if(!this._apiKey) {
			console.warn("The Weather Channel API requires license key. Check Tririga web server properties file (property WEATHER_API_KEY).");
			return;
		}

		var url = this.getBaseWeatherUrl(this.baseUrl, this.postalAndCountryCode, this.latAndLong);
		if(!url) {
			return; //getBaseWeatherUrl() will log the error to the console
		}

		url += "/forecast/" + this.apiPath + ".json" 
			+ "?language=" + this.language 
			+ "&units=" + this.units
			+ "&apiKey=" + this._apiKey;

		var ajax = this.$.ajax;
		ajax.url = url;
		ajax.generateRequest();
	},

    /* On response, set the days forecast provided by the weather API.
	 * If the forecasts object includes the given date, then set forecast property with weather data for that date.
	 */
	_onResponse: function(e) {
		var response = e.detail.response;
		//set 10 days forecasts
		this._setForecasts(response.forecasts);

		if (this.date) {
			if (Object.prototype.toString.call(this.date) === '[object Date]' 
					&& this.date.toString() != 'Invalid Date') {
				//Out of the 10 days forecasts find the forecast for the given date
				var forecastForDate = response.forecasts.filter(function(forecast) {
					return moment(this.date).isSame(moment(forecast.fcst_valid_local), 'day');
				}.bind(this));
				
				//set the day forecast
				this._setForecast(forecastForDate[0]);

				if(forecastForDate.length==0) {
					console.warn("Date value " + "[" + this.date + "] is not within the range of the forecasts object.");
				}
			} else {
				console.error("Invalid date value " + "[" + this.date + "]");
			}
		}
		this.fire("triplat-weather-forecast-response-complete", response);
	},

    _onError: function(e) {
		this.fire("triplat-weather-forecast-response-error", e);
	}
});