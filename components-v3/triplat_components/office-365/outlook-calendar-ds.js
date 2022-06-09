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

const LIST_EVENT_URL      = "https://graph.microsoft.com/v1.0/me/calendar/events"
const EVENT_INSTANCE_URL  = "https://graph.microsoft.com/v1.0/me/events/{0}/instances"
const NEW_EVENT_URL       = "https://graph.microsoft.com/v1.0/me/events";
const LIST_FREE_BUSY_URL  = "https://graph.microsoft.com/v1.0/me/calendar/getschedule";
const LIST_TIME_ZONES_URL = "https://graph.microsoft.com/v1.0/me/outlook/supportedTimeZones";

var _fetchTimeZone  = null;
var _resolveAuthoToken = null;
var _rejecteAuthoToken = null;

var _timeZoneLookup  = {};

/**
 * A Component that provides access to the Microsoft Outlook Event object which includes
 * Meetings, Appointments, and Reminders.
 * 
 * This version uses the Microsoft Graph API which provides access to cloud hosted versions
 * of Exchange, and to on-prem Exchange instances configured as hybrid installs.  That is
 * integrated with Azure active directory.   
 */
class OutlookCalendarDs extends PolymerElement 
{
	static get is() { return 'outlook-calendar-ds' };
	
    /**
	 * Fired when the response status of any HTTP response from REST call to Microsoft or
	 * TRIRIGA is not OK
	 *
	 * @event office-365-http-error
	 */

    /**
	 * Fired when the the getEventList or getNextPage operation returns records, including a query that
	 * returns no records
	 *
	 * @event calendar-event-list
	 */

    /**
	 * Fired on retrieval of instances of a repeating event 
	 *
	 * @event calendar-event-instances
	 */

    /**
	 * Fired when a calendar event is successfully created
	 *
	 * @event calendar-event-create
	 */

    /**
	 * Fired when a calendar event is successfully updated
	 *
	 * @event calendar-event-update
	 */

    /**
	 * Fired when a calendar Free/Busy list is retrieved
	 *
	 * @event calendar-freebusy-list
	 */
	

    /**
	 * Fired when when the list of supported time zones is retrieved from the Exchange server.
	 * The query runs once when authorization with the Office 365 is complete
	 *
	 * @event office-365-time-zone-list
	 */
	
	static get properties() {
		return {
			  /**
			   * Microsoft OAuth access token. typical returned from azure-oauth2
			   */
			authtoken : {
				type     : String,
				observer : '_authCodeChanged'
			},
			  /**
			   * List of Microsoft Outlook events - meeting, appointments, reminders 
			   * for the current user populated by getList().  
			   * This list is paged
			   */
			eventlist : {
				type               : Array,
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
		   * List of Microsoft Outlook time zone support on the Exchange server and available to the current user
		   */
		   outlookTimeZones : {
			   type               : Array,
			   reflectToAttribute : true,
			   notify             : true
		   },
			/**
			 * Use this to specify the time zone for start and end times in the response. 
			 * If not specified, those time values are returned in UTC. Optional.
			 * {
			 * 		name   : "microsoft timezone name",
			 *      abbr   : "Standard abbriviation",
			 *      offset : "offset from UTC"
			 * }
			 */
			timezone : {
				type     : Object,
			}
		}
	}
	
	constructor()
	{
		super();
		this.calendarlist = [];
	}
	
	ready() 
	{
		super.ready();
		
		// https://docs.microsoft.com/en-us/graph/api/outlookuser-supportedtimezones?view=graph-rest-1.0&tabs=http
		if( !_fetchTimeZone )
		{
			_fetchTimeZone = new Promise(
				( resolve, reject ) => {
					_resolveAuthoToken = resolve;
					_rejecteAuthoToken = reject;
				}
			).then(
				( authToken ) => {
					return fetch( LIST_TIME_ZONES_URL, 
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
																		source : "Time Zone List" }} ));
						this.dispatchEvent( new CustomEvent('office-365-time-zone-list', { bubbles: true, composed: true, detail: [] } ));
						throw response;
					}
					return response.json();
				}
			).then(
				( json ) => {
					this._makeTimeZoneLookup( json.value );
					this.outlookTimeZones = json.value;
					this.dispatchEvent( new CustomEvent('office-365-time-zone-list', { bubbles: false, composed: true, detail: user } ));
					return json;
				}
			).catch(
				( err ) => { 
					this.outlookTimeZones = json.value;
					this._onError( err ); 
				}
			);
		}
		else
		{
			_fetchTimeZone.then( 
				( json ) => {
					this.outlookTimeZones = json.value;
					this.dispatchEvent( new CustomEvent('office-365-time-zone-list', { bubbles: false, composed: true, detail: user } ));
				});
		}

		if( this.authtoken && this.authtoken.access_token ) 
		{
			_resolveAuthoToken( this.authtoken.access_token );
		}
	}
	
	
	/**
	 * Event List
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/calendar-list-events?view=graph-rest-1.0&tabs=cs
	 * 
	 * Retrieves all calendar events for the current user that meet the search criteria
	 */
	getEventList(
		search		// Substring match of the subject
	) {
		var query = "";
		if( search && search != ""  )
		{
			query = "?$filter=startswith(subject,'"  + encodeURIComponent( search.trim() ) + "')";
		}
		
		return this.getEventListWithQuery( query );
	}

	
	/**
	 * Event List
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/calendar-list-events?view=graph-rest-1.0&tabs=cs
	 * 
	 * Retrieves all calendar events for the current user that meet the query criteria
	 */
	getEventListWithQuery(
		query		// Full URL Query string
	) {
		if( !this.authtoken ) return;
		
		if( this.calendarlist.length > 0 )
		{
			this.set( "calendarlist", [] );
			this.dispatchEvent( new CustomEvent('calendar-event-list', { bubbles: true, composed: true, detail: [] } ));
		}
		this.nextLink = null;
		this.set( "hasnextpage", false );

		var url = LIST_EVENT_URL;
		if( query && query.length > 0 ) url += query;
		return this._getList( url );
	}
	
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

	/**
	 * Event List
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/calendar-list-events?view=graph-rest-1.0&tabs=cs
	 * 
	 * Retrieves all calendar events for the current user that meet the query criteria
	 */
	_getList( url ) 
	{
		var headers = {
				'Accept': 'application/json',
				"Authorization" : "Bearer" + " " + this.authtoken.access_token,
				'Access-Control-Allow-Origin' : '*',
			};
		
		if( this.timezone && this.timezone.name && this.timezone.name != "" )
		{
			headers.Prefer = 'outlook.timezone="' + this.timezone.name + '"';
		}

		return fetch( url, 
			   { 
					method: "GET", 
					mode : "cors",
					credentials: 'include',
					headers: headers,
					credentials: 'same-origin' 
			   } 
			).then(
				( response ) => { 
					if( !response.ok )
					{
						this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																				  detail: { response : response, 
																							source : "Event List" }} ));
						this.set( "calendarlist", [] );
						this.dispatchEvent( new CustomEvent('calendar-event-list', { bubbles: true, composed: true, detail: [] } ));
						throw response;
					}
					return response.json()
				}
			).then(
				( json ) => {
					if( json[ "@odata.nextLink" ] )
					{
						this.nextLink = json[ "@odata.nextLink" ];
						this.set( "hasnextpage", true );
					}

					var list = [];
					for( var i = 0; i < this.calendarlist.length; i++ )
					{
						list.push(  this.calendarlist[i] );
					}
					for( var i = 0; i < json.value.length; i++ )
					{
						list.push( json.value[i] );
					}
					this.set( "calendarlist", list );
		
					this.dispatchEvent( new CustomEvent('calendar-event-list', { bubbles: true, composed: true, detail: this.calendarlist } ));
					return json;
				}
			).catch(
				( err ) => { this._onError( err ); } 
			);
	};
	
	/**
	 * Event Instances
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/event-list-instances?view=graph-rest-1.0&tabs=http
	 * 
	 * Get individual instances of a repeating event
	 */
	getEventInstances(
		eventId,		// Id of an event retrieved via getEventList
		start,			// Start date and time
		end				// End date and time
	) {
		if( !this.authtoken ) return;
		
		this.calendarlist = [];
		var url = EVENT_INSTANCE_URL;
		url = url.replace( "{0}", eventId );
		
		var query = "";
		
		if( start )
		{
			query = "startDateTime=" + start;
		}
		if( end )
		{
//			if( query.length > 0 ) query = query + "&";
			query = query + "endDateTime" + end;
		}
		
		if( query.length > 0 ) url = url + "?" + query;
		
		var headers = {
				'Accept': 'application/json',
				"Authorization" : "Bearer" + " " + this.authtoken.access_token,
				'Access-Control-Allow-Origin' : '*',
			};
		
		if( this.timezone && this.timezone.name && this.timezone.name != "" )
		{
			headers.Prefer = 'outlook.timezone="' + this.timezone.name + '"';
		}

		fetch( url, 
			   { 
					method: "GET", 
					mode : "cors",
					credentials: 'include',
					headers: headers,
					credentials: 'same-origin' 
			   } 
			).then(
			( request ) => { this._onEventInstances( request ); },
			( err ) => { this._onError( err ); } );
	};
	
	_onEventInstances(
		response 
	) {
		if( response.redirected )
		{
			location.href = response.url;
		}
		if( !response.ok )
		{
			this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																	  detail: { response : response, 
																				source : "Event Instance" }} ));
			this.dispatchEvent( new CustomEvent('calendar-event-instances', { bubbles: true, composed: true, detail: [] } ));
			return;
		}
		response.json().then(
			( json ) => {  
				this.dispatchEvent( new CustomEvent('calendar-event-instances', { bubbles: true, composed: true, detail: json.value } ));
			},
			( err ) => { this._onError( err ) }
		);
	};
	
	/**
	 * Event Add
	 * Creates a new calendar event (Meeting, Appointment, Reminder)
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/calendar-list-events?view=graph-rest-1.0&tabs=cs
	 */
	createEvent(
		calEvent
	) {
		if( !this.authtoken ) return;
		
		this.calendarlist = [];
		
		var bodyText = JSON.stringify(calEvent);
		
		var headers = {
				'Accept'                      : 'application/json',
				"Authorization"               : "Bearer" + " " + this.authtoken.access_token,
				'Access-Control-Allow-Origin' : '*',
				'Content-type'                : 'application/json',
				'Content-length'              : bodyText.length,
			};
		
		if( this.timezone && this.timezone.name && this.timezone.name != "" )
		{
			headers[ 'Prefer: outlook.timezone' ] = this.timezone.name;
		}

		fetch( NEW_EVENT_URL, 
			   { 
					method: "POST", 
					mode : "cors",
					credentials: 'include',
					headers: headers,
					credentials: 'same-origin', 
					body: bodyText,
			   } 
			).then(
			( request ) => { this._onCreateEvent( request ); },
			( err ) => { this._onError( err ); } );
	};
	
	_onCreateEvent(
		response 
	) {
		if( response.redirected )
		{
			location.href = response.url;
		}
		if( !response.ok )
		{
			this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																	  detail: { response : response, 
																				source : "Create Event" }} ));
			return;
		}
		response.json().then(
			( json ) => { 
				this.dispatchEvent( new CustomEvent('calendar-event-create', { bubbles: true, composed: true, detail: json } ));
			},
			( err ) => { this._onError( err ) }
		);
	};
		  
	
	/**
	 * Event Update
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/calendar-list-events?view=graph-rest-1.0&tabs=cs
	 */
	updateEvent(
		calEvent
	) {
		if( calEvent.start && calEvent.start.dateTime )
		{
			calEvent.start.dateTime = calEvent.start.dateTime.substring( 0, 23 );
		}
		if( calEvent.end && calEvent.end.dateTime )
		{
			calEvent.end.dateTime = calEvent.end.dateTime.substring( 0, 23 );
		}

		var bodyText = JSON.stringify(calEvent);
		
		var headers = {
				'Accept'                      : 'application/json',
				"Authorization"               : "Bearer" + " " + this.authtoken.access_token,
				'Access-Control-Allow-Origin' : '*',
				'Content-type'                : 'application/json',
				'Content-length'              : bodyText.length,
			};
		
		return fetch( NEW_EVENT_URL + "/" + calEvent.id, 
			   { 
					method: "PATCH", 
					mode : "cors",
					credentials: 'include',
					headers: headers,
					credentials: 'same-origin', 
					body: bodyText,
			   } 
			).then(
				( response ) => { 
					if( !response.ok )
					{
						this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																				  detail: { response : response, 
																							source : "Update Event" }} ));
						throw response;
					}
					return response.json();
				}
			).then(
				( json ) => { 
					this.dispatchEvent( new CustomEvent('calendar-event-update', { bubbles: true, composed: true, detail: json } ));
				},
			).catch(
				( err ) => { this._onError( err ); } 
			);
	};
	
	/**
	 * FreeBusy List
	 * 
	 * https://docs.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0&tabs=http
	 */
	getFreeBusyList(
		start,		// Start time for list 
		end, 		// end time for list
		schedules,	// List of email addresses to return schedule for
		timeZone    // If present, time zone used for start and end date
	) {
		if( !this.authtoken ) return;
		
		this.calendarlist = [];
		var url = LIST_FREE_BUSY_URL;
		
		if( start ) start = start.substring( 0, 23 );
		if( end )   end   = end.substring( 0, 23 );
		
		var body = {
			    "schedules": schedules,
			    "startTime": {
			        "dateTime": start,
			    },
			    "endTime": {
			        "dateTime": end,
			    },
			    "availabilityViewInterval": "15"		
    	};
		
		if( timeZone && timeZone != "" )
		{
			body.startTime.timeZone = timeZone;
			body.endTime.timeZone   = timeZone;
		}
		
		var bodyText = JSON.stringify( body );

		var headers = {
				'Accept'                      : 'application/json',
				"Authorization"               : "Bearer" + " " + this.authtoken.access_token,
				'Access-Control-Allow-Origin' : '*',
				'Content-type'                : 'application/json',
				'Content-length'              : bodyText.length,
			};
		
		if( this.timezone && this.timezone.name && this.timezone.name != "" )
		{
			headers.Prefer = 'outlook.timezone="' + this.timezone.name + '"';
		}
		else
		{
			headers.Prefer = 'outlook.timezone="UTC"';
		}

		return fetch( url, 
		   { 
				method      : "POST", 
				mode        : "cors",
				credentials : 'include',
				headers     : headers,
				credentials : 'same-origin',
				body        : bodyText
		   } 
		).then(
			( response ) => { 
				if( !response.ok )
				{
					this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																			  	   detail: { response : response, 
																						     source : "FreeBusy List" }} ));
					this.dispatchEvent( new CustomEvent('calendar-freebusy-list', { bubbles: true, composed: true, detail: [] } ));
					throw response;
				}
				return response.json();
			}
		).then(
			( json ) => { 
				this.dispatchEvent( new CustomEvent('calendar-freebusy-list', { bubbles: true, composed: true, detail: json.value } ));
			}
		).catch(
			( err ) => { this._onError( err ); } 
		);
	};
	
	/**
	 * Takes a Exchange time zone name and returns the offset from UTC parsed from the displayName
	 * of the list returned from the Exchange server 
	 */
	getTimeZoneOffset( timeZone )
	{
		return _timeZoneLookup[ timeZone ];
	}
	
	//============================================================================
	// Utilities
	//============================================================================
	_makeTimeZoneLookup( tzList )
	{
		_timeZoneLookup = {};
		for( var i = 0; i < tzList.length; i++ )
		{
			var strHours   = tzList[i].displayName.substring( 4, 7 );
			var strMinutes = tzList[i].displayName.substring( 8, 10 );
			var hours      = parseInt( strHours );
			var minutes    = parseInt( strMinutes );
			if( !Number.isNaN( hours ) && !Number.isNaN( minutes ) )
			{
				if( hours >= 0 ) _timeZoneLookup[ tzList[i].alias ] = hours * 60 + minutes ;
				else             _timeZoneLookup[ tzList[i].alias ] = hours * 60 - minutes ;
			}
			else
			{
				_timeZoneLookup[ tzList[i].alias ] = 0;
			}
		}
	}
	
	_onError( err )
	{
		console.error( err );
	}
	
	clear()
	{
		if( this.calendarlist && this.calendarlist.length > 0 )
		{
			this.calendarlist = [];
			this.set( "hasnextpage", false );
			this.dispatchEvent( new CustomEvent('calendar-event-list', { bubbles: true, composed: true, detail: [] } ));
		}
		if( this.outlookTimeZones && this.outlookTimeZones.length > 0 )
		{
			this.outlookTimeZones = [];
			this.dispatchEvent( new CustomEvent('office-365-time-zone-list', { bubbles: true, composed: true, detail: [] } ));
		}
		_fetchTimeZone  = null;
		_resolveAuthoToken = null;
		_rejecteAuthoToken = null;
	}

	//============================================================================
	// Observers
	//============================================================================
	_authCodeChanged(
		  value
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

customElements.define(OutlookCalendarDs.is, OutlookCalendarDs );