/*
 * @license
 *
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * (C) COPYRIGHT IBM CORP. 2019
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
 * @Author Doug Wood
 */
import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';

const FILE_PATH       = "/p/web";
const RESOURCE_PATH   = "/api/p/v1/reserve365";

const ME_URL          = "https://graph.microsoft.com/v1.0/me";
const LIST_USER_URL   = "https://graph.microsoft.com/v1.0/users"
const CREATE_USER_URL = "https://graph.microsoft.com/v1.0/users";
const USER_DETAIL_URL = "https://graph.microsoft.com/v1.0/users";
const DELETE_USER_URL = "https://graph.microsoft.com/v1.0/users";
	
var _fetchTririgaUser  = null;	
var _fetchOutlookUser  = null;
var _resolveAuthoToken = null;
var _rejecteAuthoToken = null;

// Sources:
// - tririga : TRIRIGA db
// - iana : https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// - name : Office 365 - https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones
var _timezones = {
	"Greenwich"              : { name : "Greenwich Standard Time",                 iana : "Greenwich",                      tririga : "Greenwich",             abbr : "GMT",  offset : "UTC±00",    adjust : 0 },
	"Europe/Lisbon"          : { name : "GMT Standard Time",                       iana : "Europe/Lisbon",                  tririga : "Europe/Lisbon",         abbr : "GMT",  offset : "UTC±00",    adjust : 0 },
	"Europe/London"          : { name : "GMT Standard Time",                       iana : "Europe/London",                  tririga : "Europe/London",         abbr : "GMT",  offset : "UTC±00",    adjust : 0 },
	"Africa/Monrovia"        : { name : "Greenwich Standard Time",                 iana : "Africa/Monrovia",                tririga : "Africa/Monrovia",       abbr : "GMT",  offset : "UTC±00",    adjust : 0 },
	"Europe/Berlin"          : { name : "W Europe Standard Time",                  iana : "Europe/Berlin",                  tririga : "Europe/Berlin",         abbr : "MEZ",  offset : "UTC+01",    adjust : 1 },	
	"Europe/Paris"           : { name : "Romance Standard Time",                   iana : "Europe/Paris",                   tririga : "Europe/Paris",          abbr : "CET",  offset : "UTC+01",    adjust : 1 },
	"Europe/Prague"          : { name : "Central Europe Standard Time",            iana : "Europe/Prague",                  tririga : "Europe/Prague",         abbr : "CET",  offset : "UTC+01",    adjust : 1 },
	"Europe/Warsaw"          : { name : "Central European Standard Time",          iana : "Europe/Warsaw",                  tririga : "Europe/Warsaw",         abbr : "CET",  offset : "UTC+01",    adjust : 1 },
	"Australia/Brisbane"     : { name : "E Australia Standard Time",               iana : "Australia/Brisbane",             tririga : "Australia/Brisbane",    abbr : "AEST", offset : "UTC+10",    adjust : 10 },
	"Australia/Canberra"     : { name : "AUS. Eastern Standard Time",              iana : "Australia/Sydney",               tririga : "Australia/Canberra",    abbr : "AEST", offset : "UTC+10",    adjust : 10 },
	"Pacific/Guam"           : { name : "West Pacific Standard Time",              iana : "Pacific/Guam",                   tririga : "Pacific/Guam",          abbr : "ChST", offset : "UTC+10",    adjust : 10 },
	"Australia/Hobart"       : { name : "Tasmania Standard Time",                  iana : "Australia/Hobart",               tririga : "Australia/Hobart",      abbr : "AEST", offset : "UTC+10",    adjust : 10 },
	"Kwajalein"              : { name : "Kamchatka Standard Time",                 iana : "Pacific/Kwajalein",              tririga : "Pacific/Kwajalein",     abbr : "PETT", offset : "UTC+12",    adjust : 12 },
	"Pacific/Fiji"           : { name : "Fiji Islands Standard Time",              iana : "Pacific/Fiji",                   tririga : "Pacific/Fiji",          abbr : "FJT",  offset : "UTC+12",    adjust : 12 },
	"Pacific/Auckland"       : { name : "New Zealand Standard Time",               iana : "Pacific/Auckland",               tririga : "Pacific/Auckland",      abbr : "NZST", offset : "UTC+12",    adjust : 12 },
	"Europe/Athens"          : { name : "GTB Standard Time",                       iana : "Europe/Athens",                  tririga : "Europe/Athens",         abbr : "EET",  offset : "UTC+02",    adjust : 2 },
	"Africa/Cairo"           : { name : "Egypt Standard Time",                     iana : "Africa/Cairo",                   tririga : "Africa/Cairo",          abbr : "EET",  offset : "UTC+02",    adjust : 2 },
	"Europe/Malta"           : { name : "E Europe Standard",                       iana : "Europe/Malta",                   tririga : "Europe/Malta",          abbr : "CET",  offset : "UTC+01",    adjust : 1 },
	"Africa/Harare"          : { name : "South Africa Standard Time",              iana : "Africa/Maputo",                  tririga : "Africa/Harare",         abbr : "CAT",  offset : "UTC+02",    adjust : 2 },
	"Israel"                 : { name : "Israel Standard Time",                    iana : "Asia/Jerusalem",                 tririga : "Israel",                abbr : "IST",  offset : "UTC+02",    adjust : 2 },  	
	"Asia/Tehran"            : { name : "Iran Standard Time",                      iana : "Asia/Tehran",                    tririga : "Asia/Tehran",           abbr : "IRST", offset : "UTC+03:30", adjust : 3.5 }, 	
	"Asia/Baghdad"           : { name : "Arabic Standard Time",                    iana : "Asia/Baghdad",                   tririga : "Asia/Baghdad",          abbr : "AST",  offset : "UTC+03",    adjust : 3 },
	"Asia/Kabul"             : { name : "Transitional Islamic State of Afghanistan Standard Time",
		                                                                           iana : "Asia/Kabul",                     tririga : "Asia/Kabul",            abbr : "AFT",  offset : "UTC+04:30", adjust : 4.5 },
	"Asia/Muscat"            : { name : "Arabian Standard Time",                   iana : "Asia/Dubai",                     tririga : "Asia/Muscat",           abbr : "GST",  offset : "UTC+04",    adjust : 4 },
	"Europe/Moscow"          : { name : "Russian Standard Time",                   iana : "Europe/Moscow",                  tririga : "Europe/Moscow",         abbr : "MSK",  offset : "UTC+03",    adjust : 3 },
	"Asia/Calcutta"          : { name : "India Standard Time",                     iana : "Asia/Kolkata",                   tririga : "Asia/Calcutta",         abbr : "IST",  offset : "UTC+05:30", adjust : 5.5 },
	"Asia/Karachi"           : { name : "Pakistan Standard Time",                  iana : "Asia/Karachi",                   tririga : "Asia/Karachi",          abbr : "PKT",  offset : "UTC+05",    adjust : 5 },
	"Asia/Almaty"            : { name : "N Central Asia Standard Time",            iana : "Asia/Almaty",                    tririga : "Asia/Almaty",           abbr : "ALMT", offset : "UTC+06",    adjust : 6 },
	"Asia/Bangkok"           : { name : "SE Asia Standard Time",                   iana : "Asia/Bangkok",                   tririga : "Asia/Bangkok",          abbr : "ICT",  offset : "UTC+07",    adjust : 7 },
	"Asia/Chongqing"         : { name : "China Standard Time",                     iana : "Asia/Chongqing",                 tririga : "Asia/Chongqing",        abbr : "CST",  offset : "UTC+08",    adjust : 8 },
	"Asia/Hong_Kong"         : { name : "China Standard Time",                     iana : "Asia/Hong_Kong",                 tririga : "Asia/Hong_Kong",        abbr : "HKT",  offset : "UTC+08",    adjust : 8 },
	"Asia/Taipei"            : { name : "Taipei Standard Time",                    iana : "Asia/Taipei",                    tririga : "Asia/Taipei",           abbr : "CST",  offset : "UTC+08",    adjust : 8 },
	"Australia/Adelaide"     : { name : "Cen. Australia Standard Time",            iana : "Australia/Adelaide",             tririga : "Australia/Adelaide",    abbr : "ACST", offset : "UTC+09:30", adjust : 9.5 },
	"Australia/Darwin"       : { name : "Cen. Australia Standard Time",            iana : "Australia/Darwin",               tririga : "Australia/Darwin",      abbr : "ACST", offset : "UTC+09:30", adjust : 9.5 },
	"Asia/Seoul"             : { name : "Korea Standard Time",                     iana : "Asia/Seoul",                     tririga : "Asia/Seoul",            abbr : "KST",  offset : "UTC+09",    adjust : 9 },
	"Asia/Tokyo"             : { name : "Tokyo Standard Time",                     iana : "Asia/Tokyo",                     tririga : "Asia/Tokyo",            abbr : "JST",  offset : "UTC+09",    adjust : 9 }, 	
	"Atlantic/Azores"        : { name : "Azores Standard Time",                    iana : "Atlantic/Azores",                tririga : "Atlantic/Azores",       abbr : "AZOT", offset : "UTC-10",    adjust : -10 },
	"US/Hawaii"              : { name : "Hawaiian Standard Time",                  iana : "Pacific/Honolulu",               tririga : "US/Hawaii",             abbr : "HST",  offset : "UTC−10",    adjust : -10 },
	"Pacific/Midway"         : { name : "Samoa Standard Time",                     iana : "Pacific/Pago_Pago",              tririga : "Pacific/Midway",        abbr : "SST",  offset : "UTC−11",    adjust : -11 },
	"Atlantic/South_Georgia" : { name : "Mid-Atlantic Standard Time",              iana : "Atlantic/South_Georgia",         tririga : "Atlantic/South_Georgia",abbr : "GST",  offset : "UTC−02",    adjust : -2 },
	"Canada/Newfoundland"    : { name : "Newfoundland and Labrador Standard Time", iana : "America/St_Johns",               tririga : "Canada/Newfoundland",   abbr : "NST",  offset : "UTC−03:30", adjust : -3.5 },
	"Brazil/East"            : { name : "E South America Standard Time",           iana : "America/Sao_Paulo",              tririga : "Brazil/East",           abbr : "BRT",  offset : "UTC−03",    adjust : -3 },
	"America/Buenos_Aires"   : { name : "E South America Standard Time",           iana : "America/Argentina/Buenos_Aires", tririga : "America/Buenos_Aires",  abbr : "ART",  offset : "UTC-03",    adjust : -3 },
	"Canada/Atlantic"        : { name : "Atlantic Standard Time",                  iana : "America/Halifax",                tririga : "Canada/Atlantic",       abbr : "AST",  offset : "UTC-04",    adjust : -4 },
	"America/Caracas"        : { name : "Pacific SA Standard Time",                iana : "America/Caracas",                tririga : "America/Caracas",       abbr : "VET",  offset : "UTC-04",    adjust : -4 },
	"America/Bogota"         : { name : "SA Pacific Standard Time",                iana : "America/Bogota",                 tririga : "America/Bogota",        abbr : "COT",  offset : "UTC−05",    adjust : -5 },
	"US/Eastern"             : { name : "Eastern Standard Time",                   iana : "America/New_York",               tririga : "US/Eastern",            abbr : "EST",  offset : "UTC−05",    adjust : -5 },
	"US/East-Indiana"        : { name : "US Eastern Standard Time",                iana : "America/Indiana/Indianapolis",   tririga : "US/East-Indiana",       abbr : "EST",  offset : "UTC−05",    adjust : -5 },
	"US/Central"             : { name : "Central Standard Time",                   iana : "America/Chicago",                tririga : "US/Central",            abbr : "CST",  offset : "UTC−06",    adjust : -6 },
	"America/Mexico_City"    : { name : "Mexico Standard Time",                    iana : "America/Mexico_City",            tririga : "America/Mexico_City",   abbr : "EST",  offset : "UTC−05",    adjust : -5 },
	"Canada/Saskatchewan"    : { name : "Canada Central Standard Time",            iana : "America/Regina",                 tririga : "Canada/Saskatchewan",   abbr : "CST",  offset : "UTC−06",    adjust : -6 },
	"US/Arizona"             : { name : "US Mountain Standard Time",               iana : "America/Phoenix",                tririga : "US/Arizona",            abbr : "MST",  offset : "UTC−07",    adjust : -7 },
	"US/Mountain"            : { name : "Mountain Standard Time",                  iana : "America/Denver",                 tririga : "US/Mountain",           abbr : "MST",  offset : "UTC−07",    adjust : -7 },
	"US/Pacific"             : { name : "Pacific Standard Time",                   iana : "America/Los_Angeles",            tririga : "US/Pacific",            abbr : "PST",  offset : "UTC−08",    adjust : -8 },
	"US/Alaska"              : { name : "Alaskan Standard Time",                   iana : "America/Anchorage",              tririga : "US/Alaska",             abbr : "AKST", offset : "UTC−09",    adjust : -9 },
};
var _timZoneByMSName = {}

/**
 * A Component that provides access to the Microsoft Outlook User object. and provides 
 * Current user context.
 * 
 * On startup, it makes a single query to get the logged TRIRIGA user and Outlook 365 user.
 * The TRIRIGA user is used to establish the Outlook 365 time zone for other Outlook 365 API
 * calls which require a time zone.  
 * 
 * Access to the user object include:
 *  - Query a list of users
 *  - Create a user
 *  - Get details for an individual user
 *  - Update a User
 *  - Delete a User
 * 
 * This version uses the Microsoft Graph API which provides access to cloud hosted versions
 * of Exchange, and to on-prem Exchange instances configured as hybrid installs, that is
 * integrated with Azure active directory.   
 */
class OutlookUserDs extends PolymerElement 
{
	static get is() { return 'outlook-user-ds' };
	
    /**
	 * Fired when the response status of any HTTP response from REST call to Microsoft is not OK
	 *
	 * @event office-365-http-error
	 */

    /**
	 * Fired when the TRIRIGA users has been retrieved and the time zone in its profiles has been
	 * converted to an Office 365 time zone 
	 *
	 * @event office-365-timezone
	 */

    /**
	 * Fired when the currently logged in Outlook users is retrieved
	 *
	 * @event office-365-user-me
	 */
	
    /**
	 * Fired when the response status of any HTTP response from REST call to TRIRIGA is not OK
	 *
	 * @event tririga-http-error
	 */

	/**
	 * Fired when a new Office 365 user is created
	 *
	 * @event user-create
	 */

	/**
	 * Fired when the the getUserList or getNextPage operation returns records, including a query that
	 * returns no records
	 *
	 * @event user-list
	 */
	
	static get properties() {
		return {
			  /**
			   * Microsoft OAuth access token. typical returned from azure-oauth2
			   */
			authtoken : {
				type                : String,
				observer           : 'authCodeChanged'
			},
			  /**
			   * Currently logged-in Office 365 user
			   */
			currentuser : {
				type               : Object,
				reflectToAttribute : true,
				notify             : true
			   },
			   /**
			    * Maximum number of user entries to return in a query
			    */
		    fetchsize : {
				type                : Number,
				value               : 10,
		    },
			   /**
			    * True if the User List has been successfully fetched and there are additional records to fetch
			    */
			hasnextpage : {
				type               : Boolean,
				value              : false,
				notify             : true
		   },
				/**
				 * Use this to specify the time zone for start and end times in the response. 
				 * If not specified, those time values are returned in UTC. Optional.
				 */
			timezone : {
				type               : Object,
				reflectToAttribute : true,
				notify             : true
			},
			   /**
			    * List out Office/Outlook users populated by getList
			    * This list is paged
			    */
			userlist : {
				type               : Array,
				reflectToAttribute : true,
				notify             : true
			   },
		}
	}
	
	constructor()
	{
		super();
		this.userlist = [];
		
		if( !_timZoneByMSName[ "Greenwich Standard Time" ] )
		{
			for( var tz in _timezones )
			{
				_timZoneByMSName[ _timezones[ tz ].name ] =  _timezones[ tz ];
			}
		}

		this.contextroot = "";
		var path = location.pathname;
		var idx = path.lastIndexOf( FILE_PATH );
		if( idx > 0 )
		{
			this.contextroot = path.substring( 0, idx );  		    		
		}
	}
	
	ready() 
	{
		super.ready();
		
		// Get the TRIRIGA User to get locale and time zone.  
		// Do it only once no matter how many instances of the component there are
		if( !_fetchTririgaUser )
		{
			_fetchTririgaUser = fetch( this.contextroot + "/p/webapi/rest/v2/triOffice365/-1/user?query=true", 
					{ 
						method: "GET",
						headers: {
							'content-type': 'application/json',
							'Accept': 'application/json',
						},
						credentials: 'same-origin', 
					} 
				).then(
					( response ) => { 
						if( response.redirected )
						{
							location.href = response.url;
							throw response;
						}
						if( !response.ok )
						{
							this.dispatchEvent( new CustomEvent('tririga-http-error', { bubbles: true, composed: true,
																						detail: { response : response, 
																							      source : "TRIRIGA User" }} ));
							throw response;
						}
						return response.json();
					} 
				).then(
					( json ) => {  
						this._onTririgaUser( json.data );
						this.dispatchEvent( new CustomEvent('office-365-timezone', { bubbles: true, composed: true, detail: this.timezone } ));
						return json;
					}
				).catch(
					( err ) => { this._onError( err ); }
				);
		}
		else
		{
			_fetchTririgaUser.then(
				( json ) => {  
					this._onTririgaUser( json.data );
				});
		}
		
		if( !_fetchOutlookUser )
		{
			_fetchOutlookUser = new Promise(
				( resolve, reject ) => {
					_resolveAuthoToken = resolve;
					_rejecteAuthoToken = reject;
				}
			).then(
				( authToken ) => {
					return fetch( ME_URL, 
					{ 
						method: "GET", 
						mode : "cors",
						credentials: 'include',
						headers: {
							'Accept': 'application/json',
							"Authorization" : "Bearer" + " " + authToken,
							'Access-Control-Allow-Origin' : '*',
						},
						credentials: 'same-origin' 
					});
				} 
			).then(
				( response ) => { 
					if( !response.ok )
					{
						this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
															  detail: { response : response, 
																		source : "User Me" }} ));
						this.dispatchEvent( new CustomEvent('office-365-user-me', { bubbles: true, composed: true, detail: {} } ));
						throw response;
					}
					return response.json();
				}
			).then(
				( json ) => {
					this.set( "currentUser", json );
					this.dispatchEvent( new CustomEvent('office-365-user-me', { bubbles: true, composed: true, detail: json } ));
					return json;
				}
			).catch(
				( err ) => { 
					this.set( "currentuser", null );
					this._onError( err ); 
				}
			);
		}
		else
		{
			_fetchOutlookUser.then( 
				( user ) => {
					this.set( "currentUser", user );
					this.dispatchEvent( new CustomEvent('office-365-user-me', { bubbles: false, composed: true, detail: user } ));
				});
		}

		if( this.authtoken && this.authtoken.access_token ) 
		{
			_resolveAuthoToken( this.authtoken.access_token );
		}
	}
	
	_onTririgaUser( user )
	{
		this.set( "locale", user._Locale );
		if( _timezones[ user._TimeZoneId] )
		{
			this.set( "timezone",   _timezones[ user._TimeZoneId] );
		}
		this.dispatchEvent( new CustomEvent('office-365-timezone', { bubbles: false, composed: true, detail: this.timezone } ));
	}
	
	lookupTimeZoneByMSName( name )
	{
		return _timZoneByMSName[ name ];
	}


	/**
	 * User List
	 * https://docs.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=cs
	 */
	getList(
		search
	) {
		if( this.userlist.length > 0 )
		{
			this.set( "userlist", [] );
			this.dispatchEvent( new CustomEvent('user-list', { bubbles: true, composed: true, detail: [] } ));
		}
		this.nextLink = null;
		this.set( "hasnextpage", false );
		var url = LIST_USER_URL + "?$top=" + this.fetchsize;
		if( search && search != ""  )
		{
			url += "&$filter=startswith(displayName,'"  + encodeURIComponent( search.trim()  ) + "')";
		}

		return this._getList( url );
	};
	
	
	/**
	 * Get the next page of people data using the same search as was used for getList
	 * 
	 * getList must have been called first, and a new call to getList resets the paging
	 */
	getNextPage()
	{
		if( !this.nextLink ) return;
		var url = this.nextLink;
		this.nextLink = null;
		this.set( "hasnextpage", false );
		return this._getList( url );
	}
	
	_getList(
		url
	) {
		return fetch( url, 
			   { 
					method: "GET", 
					mode : "cors",
					credentials: 'include',
					headers: {
						'Accept': 'application/json',
						"Authorization" : "Bearer" + " " + this.authtoken.access_token,
						'Access-Control-Allow-Origin' : '*',
					},
					credentials: 'same-origin' 
			   } 
			).then(
				( response ) => { 
					if( !response.ok )
					{
						this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																				  detail: { response : response, 
																							source : "User List" }} ));
						this.dispatchEvent( new CustomEvent('user-list', { bubbles: true, composed: true, detail: [] } ));
						throw response;
					}
					return response.json()
				}
			).then(
				( json ) => { 
					/*
					 {
					    "@odata.context": "https://graph.microsoft.com/beta/$metadata#users/$entity",
					    "id": "id-value",
					    "businessPhones": [],
					    "displayName": "displayName-value",
					    "givenName": null,
					    "jobTitle": null,
					    "mail": null,
					    "mobilePhone": null,
					    "officeLocation": null,
					    "preferredLanguage": null,
					    "surname": null,
					    "userPrincipalName": "upn-value@tenant-value.onmicrosoft.com"
					}
					 */
					if( json[ "@odata.nextLink" ] )
					{
						this.nextLink = json[ "@odata.nextLink" ];
						this.set( "hasnextpage", true );
					}
					
					var list = [];
					for( var i = 0; i < this.userlist.length; i++ )
					{
						list.push( this.userlist[i] );
					}
					for( var i = 0; i < json.value.length; i++ )
					{
						list.push( json.value[i] );
					}
					this.set( "userlist", list );
		
					this.dispatchEvent( new CustomEvent('user-list', { bubbles: true, composed: true, detail: this.userlist } ));
					return json;
				}
			).catch(
				( err ) => { this._onError( err ); } 
			);
	};
	
	/**
	 * Create User
	 * https://docs.microsoft.com/en-us/graph/api/user-post-users?view=graph-rest-1.0&tabs=http
	 * 
	 * User format
	 * {
     * 		"accountEnabled": true,
     * 		"displayName": "displayName-value",
     *		"mailNickname": "mailNickname-value",
     * 		"userPrincipalName": "upn-value@tenant-value.onmicrosoft.com",
     *		"passwordProfile" : {
     *    		"forceChangePasswordNextSignIn": true,
     *			"password": "password-value"
     * 		}
     * }
	 */
	createUser( user )
	{
		var newuser = {
	      		accountEnabled    : true,
	      		displayName       : user.displayName,
	     		mailNickname      : user.mailNickname,
	      		userPrincipalName : user.userPrincipalName,
	     		passwordProfile   : user.passwordProfile,
			};

			if( user.givenName ) 
			{ 
				newuser.givenName = user.givenName
			}
			if( user.jobTitle ) 
			{
				newuser.jobTitle = user.jobTitle 
			}
			if( user.mobilePhone ) 
			{ 
				newuser.mobilePhone = user.mobilePhone 
			}
			if( user.officeLocation ) 
			{ 
				newuser.officeLocation = user.officeLocation
			}
			if( user.preferredLanguage ) 
			{ 
				newuser.preferredLanguage = user.preferredLanguage
			}
			if( user.surname ) 
			{ 
				newuser.surname = user.surname
			};

		var bodyText = JSON.stringify( newuser );
	
		return fetch( 
			CREATE_USER_URL, 
			{ 
				method: "POST", 
				mode : "cors",
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					"Authorization" : "Bearer" + " " + this.authtoken.access_token,
					'Access-Control-Allow-Origin' : '*',
					'Content-type'                : 'application/json',
					'Content-length'              : bodyText.length,
				},
				credentials: 'same-origin',
				body: bodyText,
			} 
		).then(
			( response ) => { 
				if( !response.ok )
				{
					this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																			  detail: { response : response, 
																						source : "Create User" }} ));
					throw response;
				}
				return response.json();
			}
		).then(
			( json ) => { 
				this.push( "userlist", json.value[i] );
				this.dispatchEvent( new CustomEvent('user-create', { bubbles: true, composed: true, detail: json } ));
			}
		).catch(
			( err ) => { this._onError( err ); } 
		);
	}
	
	/**
	 * Get USer Details
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
	 */
	getUser( id, fieldList )
	{
		var url = USER_DETAIL_URL + "/" + id;
		if( fieldList )
		{
			url += "?$select="
			for( var i = 0; i < fieldList.length; i++ )
			{
				url += fieldList[i];
				if( i + 1 < fieldList.length ) url += ",";
			}
		}
		return fetch( 
			url, 
			{ 
				method: "GET", 
				mode : "cors",
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					"Authorization" : "Bearer" + " " + this.authtoken.access_token,
					'Access-Control-Allow-Origin' : '*',
				},
				credentials: 'same-origin' 
			}
		).then(
			( response ) => { 
				if( !response.ok )
				{
					this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
														  detail: { response : response, 
																	source : "User Detail" }} ));
					this.dispatchEvent( new CustomEvent('user-detail', { bubbles: true, composed: true, detail: {} } ));
					throw response;
				}
				return response.json();
			}
		).then(
			( json ) => {
				for( var i = 0; i < this.userlist.length; i++ )
				{
					if( this.userlist[i].id = json.id )
					{
						this.set( "this.userlist[i]", json );
						break;
					}
				}
				this.set( "userDetail", json );
				this.dispatchEvent( new CustomEvent('user-detail', { bubbles: true, composed: true, detail: json } ));
				return json;
			}
		).catch(
			( err ) => { 
				this.set( "userDetail", null );
				this._onError( err ); 
			}
		);
	}
	
	
	/**
	 * Get USer Details
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
	 */
	updateUser( user )
	{
		var bodyText = JSON.stringify( user );

		var url = USER_DETAIL_URL + "/" + user.id;
		return fetch( 
			url, 
			{ 
				method: "PATCH", 
				mode : "cors",
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					"Authorization" : "Bearer" + " " + this.authtoken.access_token,
					'Access-Control-Allow-Origin' : '*',
					'Content-type'                : 'application/json',
					'Content-length'              : bodyText.length,
				},
				credentials: 'same-origin',
				body: bodyText,
			}
		).then(
			( response ) => { 
				if( !response.ok )
				{
					this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
														  detail: { response : response, 
																	source : "User Update" }} ));
					this.dispatchEvent( new CustomEvent('user-detail', { bubbles: true, composed: true, detail: {} } ));
					throw response;
				}
				if( response.status == 204 )
				{
					this.dispatchEvent( new CustomEvent('user-update', { bubbles: true, composed: true } ));
				}
				return response.json();
			}
		).then(
			( json ) => {
				this.set( "userDetail", json );
				this.dispatchEvent( new CustomEvent('user-detail', { bubbles: true, composed: true, detail: json } ));
				return json;
			}
		).catch(
			( err ) => { 
				this.set( "userDetail", null );
				this._onError( err ); 
			}
		);
	}

	/**
	 * Delete User
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/user-delete?view=graph-rest-1.0&tabs=http
	 */
	deleteUser( id )
	{
		var url = DELETE_USER_URL + "/" + id;
		return fetch( 
			url, 
			{ 
				method: "DELETE", 
				mode : "cors",
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					"Authorization" : "Bearer" + " " + this.authtoken.access_token,
					'Access-Control-Allow-Origin' : '*',
				},
				credentials: 'same-origin' 
			}
		).then(
			( response ) => { 
				if( !response.ok )
				{
					this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
														  detail: { response : response, 
																	source : "User Delete" }} ));
					this.dispatchEvent( new CustomEvent('delete-user', { bubbles: true, composed: true, detail: {} } ));
					throw response;
				}
				return response.json();
			}
		).then(
			( json ) => {
				for( var i = 0; i < this.userlist.length; i++ )
				{
					if( this.userlist[i].id == id || this.userlist[i].userPrincipalName == id )
					{
						this.splice( "userlist", i, i );
						break;
					}
				}
				this.dispatchEvent( new CustomEvent('delete-user', { bubbles: true, composed: true, detail: json } ));
				return json;
			}
		).catch(
			( err ) => { 
				this._onError( err ); 
			}
		);
	}
	
	//============================================================================
	// Utilities
	//============================================================================
	_onError( err )
	{
		console.error( err );
	}
	
	clear()
	{
		if( this.userlist && this.userlist.length > 0 )
		{
			this.set( "hasnextpage", false );
			this.userlist = [];
			this.dispatchEvent( new CustomEvent('user-list', { bubbles: true, composed: true, detail: [] } ));
		}
		_fetchTimeZone  = null;
		_resolveAuthoToken = null;
		_rejecteAuthoToken = null;
	}

	//============================================================================
	// Observers
	//============================================================================
	authCodeChanged(
		value, oldValue
	) {
		if( value && value.id_token) 
		{
			this.appKey  = value.id_token.trim();
			if( _resolveAuthoToken )
			{
				_resolveAuthoToken( value.access_token );
			}
		}
		else
		{
			if( _rejecteAuthoToken )
			{
				_rejecteAuthoToken( value );
			}
			this.clear();
		}
	}
}

customElements.define(OutlookUserDs.is, OutlookUserDs );