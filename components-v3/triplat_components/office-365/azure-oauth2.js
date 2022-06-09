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

import '../@polymer/iron-localstorage/iron-localstorage.js';
import '../@polymer/paper-button/paper-button.js';
import '../@polymer/paper-dialog/paper-dialog.js';
import '../@polymer/paper-input/paper-input.js';
import '../@polymer/neon-animation/animations/scale-up-animation.js';
import '../@polymer/neon-animation/animations/fade-out-animation.js';

const FILE_PATH     = "/p/web";

const AUTH_URL   = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
const TOKEN_URL  = "/api/p/v1/office365/Token";
const CONFIG_URL = "/p/webapi/rest/v2/triOffice365/-1/config?query=true"

class AzureOauth2 extends PolymerElement 
{
/*
 A component that handle authenticating to the Microsoft Azure service using OAuth2 3 leg authentication
 flow describe here:
 
 https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 
 Note: This component require Platform REST services and configuration
 
 Note: This component opens the Microsoft Azure login URL
 
 This component processes 3 query parameters:
 	- code			This is supplied by Azure when opening the OAuth redirect URL after a successful
 	            	login.  It has a code that must be exchanged for the oauth access token
 	- state     	This is supplied by Azure when opening the OAuth redirect URL after a successful
 	            	login. It is the same value that was in any state parameter provided with the 
 	            	OAuth login URL was opened.   This component uses it to pass the name of the
 	            	profile used for the login to the target of the redirect so it can be used to
 	            	exchange the code for an access token
 	 - azureprofile	This is the name of a TRIRIG triOffice365 Config record to use for login.  The config 
 	                record as the application key secret, and redirect URL.  The app key effectively 
 	                selects the office 365 instance, application rights, and the list of valid
 	                redirect URL.  The redirect URL can be used to deal with proxy servers or to
 	                select which TRIRIGA app to launch.
 	                
 	                If this parameter is no provided and there is exactly one profile defined on the
 	                server, that profile is used.  Otherwise the calling component must select a profile
 	                from the profile list
 */
	
	static get is() { return 'azure-oauth2' }
	
    /**
	 * Fired after retrieving the profile list from TRIRIGA if a profile can not be automatically
	 * selected wither because there is only one or a entry in the list matches the profilename
	 * property 
	 *
	 * @event profile-list
	 */

    /**
	 * Fired if an error is included in the query parameters of the redirect URL opened by Microsoft 
	 *
	 * @event office-365-auth-error
	 */

    /**
	 * Fired when the response status of any HTTP response from REST call to Microsoft or
	 * TRIRIGA is not OK
	 *
	 * @event office-365-http-error
	 */

    /**
	 * Fired after successfully retrieving an access token.
	 *
	 * @event office-365-authenticate
	 */
	
	static get properties() {
		return {

		  /**
		   * Final OAuth access token for use in later calls to the Microsoft Graph API
		   */
			authtoken : {
				type               : String,
				reflectToAttribute : true,
				notify             : true,
			},

			  /**
			   * If there is only a single profile returned, this component automatically
			   * redirects to the Microsoft Azure login. If a non-zero delay is specified
			   * It waits delay seconds before redirecting.  This is intended to allow a
			   * splash screen to display 
			   */
			delay : {
				type     : Number,
				value    : 3
			},
		    
		  /**
		   * If there are multiple profiles defined on the TRIRIGA server, and no profile
		   * name is specified, the component doesn't automatically display the Microsoft
		   * login page.  Instead it reports the list of profiles to the containing component
		   * which must select a profile and initiate the login process.  
		   */
			profilelist : {
				type               : Array,
				reflectToAttribute : true,
				notify             : true
		    },

		  /**
		   * This is the name of a TRIRIG triOffice365 Config record to use for login. 
		   * The config record as the application key secret, and redirect URL.  The app 
		   * key effectively selects the office 365 instance, application rights, and the 
		   * list of valid redirect URL.  The redirect URL can be used to deal with proxy
		   * servers or to select which TRIRIGA app to launch.
		   * 
		   * This can only be set for the  
		   */
			profilename : {
				type               : String,
			},

		  /**
		   * Requested user scopes (rights).  Scopes in this list must be approved by the 
		   * user on first login.  These are different from those defined in the Microsoft
		   * application definition which must be approved by the Office 365 instance
		   * administrator
		   */
			scopes : {
				type               : Array,
		    },
		}
	};

	constructor()
	{
		super();
	}

	ready() 
	{
		super.ready();

		this.contextroot = "";
		var path = location.pathname;
		var idx = path.lastIndexOf( FILE_PATH );
		if( idx > 0 )
		{
			this.contextroot = path.substring( 0, idx );  		    		
		}
		
		var error = null;
		var error_description = null;

		var search = location.search;
		if( search != null && search != "" )
		{
			if( search.startsWith( '?') ) search = search.substring( 1 );
			var queryParams = search.split( '&' );
			for( var i = 0; i < queryParams.length; i++ )
			{
				if( queryParams[i].startsWith( "code=" ) )
				{
					this.authcode = queryParams[i].substring( 5 );
				}
				if( queryParams[i].startsWith( "state=" ) )
				{
					var state = queryParams[i].substring( 6 );
					state = decodeURIComponent( state );
					this.profilename = atob( state );
				}
				if( queryParams[i].startsWith( "azureprofile=" ) )
				{
					this.profilename = queryParams[i].substring( 13 );
				}

				if( queryParams[i].startsWith( "error=" ) )
				{
					error = queryParams[i].substring( 13 );
				}
				if( queryParams[i].startsWith( "error_description=" ) )
				{
					error_description = queryParams[i].substring( 13 );
				}
			}
			
			if( error )
			{
				this.dispatchEvent( new CustomEvent('office-365-auth-error', { bubbles: true, composed: true,  
					                                                           detail: {
					                                                        	   error             : error,
					                                                        	   error_description : error_description
					                                                           } 
				                                                              } ));
			}
			
			else if( this.authcode )
			{
				this._getToken();
			}
			else
			{
				this._getConfig()
			}
		}
		else
		{
			this._getConfig()
		}
	}
	
	//=========================================================================================
	// Before Redirect to Microsoft OAuth login
	// This path is selected if there is no "code" query parameter on the URL
	// 1) Query all configuration records from TRIRIGA
	// 2) Find the right config record
	//		- If there is a name query parameter, and a record with a matching name, use it
	//		- If there is just one record and no name query parameter, use it
	//		- Send an event that there is a config list.  Consuming code must select a config
	// 3) Open the Microsoft OAuth login URL
	//=========================================================================================
	_getConfig()
	{
		var url = this.contextroot + CONFIG_URL;

		fetch( url, 
				{ 
					method: "GET",
					headers: {
						'content-type': 'application/json',
						'Accept': 'application/json',
					},
						credentials: 'same-origin', 
				} 
			).then(
				( request ) => { this._onConfig( request ); },
				( err ) => { this._onError( err ); } );
	}

	_onConfig(
		response 
	) {
		if( !response.ok )
		{
			this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true,
																		   detail: { response : response, 
																			         source : "Office365-Profile" }} ));
			return;
		}
		response.json().then(
			( json ) => {  
				if( this.profilename && this.profilename != "" )
				{
					if( Array.isArray( json.data ) )
					{
						for( var i = 0; i < json.data.length; i++ )
						{
							if( json.data[i].name == this.profilename )
							{
								this._getCodeDelayed( json.data[i] )
							}
						}
					}
					else
					{
						if( json.data.name == this.profilename )
						{
							this._getCodeDelayed( json.data )
						}
					}
				}
				else if( !Array.isArray( json.data ) )
				{
					this._getCodeDelayed( json.data )
				}
				else if( json.data.length == 1  )
				{
					this._getCodeDelayed( json.data[0] )
				}
				else
				{
					this.set( "profilelist", json.data );
					this.dispatchEvent( new CustomEvent('profile-list', { bubbles: false, composed: true, detail: json.data } ));
				}
			},
			( err ) => { this._onError( err ); }
		);
	}
	
	_getCodeDelayed( profile )
	{
		if( this.delay > 0 )
		{
			setTimeout( ()=>{ this._getCode( profile ) }, this.delay * 1000 );					
		}
		else
		{
			this._getCode( profile )
		}
	}

	_getCode(
		profile
	) {
		var redirect = encodeURIComponent( profile.redirectURL );
		var url = AUTH_URL + "?client_id=" + profile.key;
		url += "&redirect_uri=" + redirect;
		url += "&response_type=code";
		url += "&response_mode=query";
		var hasscope = false;
		if( this.scopes && this.scopes.length > 0 )
		{
			hasscope = true;
			url = url + "&scope=";
			for( var i = 0; i < this.scopes.length; i++ )
			{
				url += this.scopes[i];
				if( i + 1 < this.scopes.length ) url += "+";
			}
		}
		if( profile.scope &&  profile.scope != "" )
		{
			if( !hasscope ) url += "&scope=";
			else            url += "+";
			url += profile.scope;
		}
		url = url + "&state=" + btoa( profile.name ); 
		
		window.open( url, "_top" );
	}

	
	//=========================================================================================
	// After Redirect
	// Request the code be exchanged for an OAuth token.  This is proxied by the TRIRIGA server
	//=========================================================================================
	login( profile ) 
	{
		this._getCode( profile );
	}
	
	
	_getToken() 
	{
		var url = this.contextroot + TOKEN_URL + "?authcode=" + this.authcode;
		if( this.profilename != null )
		{
			url += "&name=" +  this.profilename;
		}
		fetch( url,           
			   { 
					method: "POST", 
				    credentials: 'same-origin', 
					headers: {
						'Content-Type' : 'application/x-www-form-urlencoded',
						'Accept'       : 'application/json; charset=utf-8',
					},
			   } 
			).then(
			( request ) => { this._onAuthToken( request ); },
			( err ) => { this._onError( err ); } );
		}
	
		_onAuthToken(
			response 
		) {
			if( response.redirected )
			{
				location.href = response.url;
			}
			if( !response.ok )
			{
				/*
				{
					  "error": "invalid_scope",
					  "error_description": "AADSTS70011: The provided value for the input parameter 'scope' is not valid. The scope https://foo.microsoft.com/mail.read is not valid.\r\nTrace ID: 255d1aef-8c98-452f-ac51-23d051240864\r\nCorrelation ID: fb3d2015-bc17-4bb9-bb85-30c5cf1aaaa7\r\nTimestamp: 2016-01-09 02:02:12Z",
					  "error_codes": [
					    70011
					  ],
					  "timestamp": "2016-01-09 02:02:12Z",
					  "trace_id": "255d1aef-8c98-452f-ac51-23d051240864",
					  "correlation_id": "fb3d2015-bc17-4bb9-bb85-30c5cf1aaaa7"
				}
				*/
				this.dispatchEvent( new CustomEvent('office-365-http-error', { bubbles: true, composed: true, 
																		       detail: { response : response, 
																					     source : "Office365-OAuth" }} ));
				return;	
			}
			response.json().then(
				( json ) => { this._processToken( json ) },
				function( err ) { console.error( err ); }
			);
		}
		
		_processToken( 
			token
		) {
			/*
			 {
			 	access_token: "eyJ0eXAiOiJKV1QiLCJub25..."
				expires_in: 3599
				ext_expires_in: 3599
				id_token: "eyJ0eXAiOiJKV1QiLCJ..."
				scope: "Calendars.Read Calendars.Read.Shared Calendars.ReadWrite..."
				token_type: "Bearer"
			 }
			 */
			this.set( "authtoken", token );
			if( token.ErrorCode || token.errorCode )
			{
				this.dispatchEvent( new CustomEvent('office-365-auth-error', { bubbles: true, composed: true,  detail: token }));
				return;
			}
		
			var d = new Date();
			this.authTokenFetchTime = d.getTime();
		    this.dispatchEvent( new CustomEvent('office-365-authenticate', { bubbles: true, composed: true, detail: token } ));
		    var now = new Date();
			setTimeout( ()=>{ this._onTokenExpire( token, now ) }, token.expires_in * 1000 - 60000 );					
		}

		//============================================================================
		// Renew Token
		//============================================================================
		_onTokenExpire( token, issued )
		{
			var expires = issued.getTime() + token.expires_in * 1000;
			var now = new Date().getTime();
			var msg = "Auth token expiring:" + "\n"
				    + "Issued:     " + issued.getTime() + "\n"
			        + "Expired:    " + expires + "\n"
			        + "now:        " + now + "\n"
			        + "Expires in: " + ((expires - now) / 1000 );
			// alert( msg );
		}
		
		//============================================================================
		// Utilities
		//============================================================================

		_onError( err )
		{
			console.error( err );
		}

}

customElements.define(AzureOauth2.is, AzureOauth2);
