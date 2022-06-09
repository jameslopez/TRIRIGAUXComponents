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

const LIST_PEOPLE_URL = "https://graph.microsoft.com/v1.0/me/people/"


/**
 * A Component that provides access to the Microsoft Outlook People object.
 * Microsoft Graph applications can use the People API to retrieve the people 
 * who are most relevant to a user. Relevance is determined by the user’s 
 * communication and collaboration patterns and business relationships. 
 * People can be local contacts, contacts from social networking or from an 
 * organization’s directory, and people from recent communications (such as 
 * email and Skype). Along with generating this insight, the People API also 
 * provides fuzzy matching search support and the ability to retrieve the 
 * list of users relevant to another user in the signed-in user's organization. 
 * The People API is particularly useful for people picking scenarios, such as 
 * composing an email or creating a meeting. For example, you can use the 
 * People API in email compose scenarios. 
 * 
 * This version uses the Microsoft Graph API which provides access to cloud hosted versions
 * of Exchange, and to on-prem Exchange instances configured as hybrid installs, that is
 * integrated with Azure active directory.   
 */
class OutlookPeopleDs extends PolymerElement 
{
	static get is() { return 'outlook-people-ds' };
	
	static get properties() {
		return {
			  /**
			   * Microsoft OAuth access token. typical returned from azure-oauth2
			   */
			authtoken : {
				type     : String,
				observer : 'authCodeChanged'
			},
			   /**
			    * Maximum number of entries to return in a query
			    */
		    fetchsize : {
				type     : Number,
				value    : 10,
		    },
		    /**
		     * Fully formated fetch query parameter
		     * This is appended to the url without any processing
		     */
		    filter : {
		    	type     : String
		    },
			   /**
			    * True if the User List has been successfully fetched and there are additional records to fetch
			    */
			hasnextpage : {
				type               : Boolean,
				value              : false,
				notify             : true
		   },
		    // $select=displayName,scoredEmailAddresses
		    fieldlist : {
				type     : Array,
		    },
		    orderby : {
				type     : String,
			},
			  /**
			   * List of Microsoft Outlook people which can be users, contacts, or just
			   * email addresses that were referenced by the user.  By default, the list
			   * is sorted based on relevance as determined by Exchange.
			   * 
			   * Only the number of records specified by fetchsize are returned
			   */
			peoplelist : {
				type               : Array,
				reflectToAttribute : true,
				notify             : true
		   },
		}
	}
	
	constructor()
	{
		super();
		this.peoplelist = [];
	}
	
	ready() 
	{
		super.ready();
	}
	
	/**
	 * People Search
	 * 
	 * https://docs.microsoft.com/en-us/graph/people-example
	 */
	getList(
		search, 
		skip
	) {
		if( this.peoplelist.length > 0 )
		{
			this.set( "peoplelist", [] );
			this.dispatchEvent( new CustomEvent('people-list', { bubbles: true, composed: true, detail: [] } ));
		}
		this.nextLink = null;
		this.set( "hasnextpage", false );
		var url = LIST_PEOPLE_URL + "?$top=" + this.fetchsize;
		if( this.skip && this.skip > 0 )
		{
			url + "&$skip=" + skip;
		}
		if( this.orderby && this.orderby != "" )
		{
			url + "$orderby=" + orderby.trim();
		}
		if( search && search != ""  )
		{
			url += "&$search="  + '"' + encodeURIComponent( search ) + '"';
			this.search = search;
		}
		if( this.fieldlist )
		{
			url += "&$select="
			for( var i = 0; i < this.fieldlist.length; i++ )
			{
				url += this.fieldlist[i];
				if( i + 1 < this.fieldlist.length ) url += ",";
			}
		}

		this._getList( url );
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
		this._getList( url );
	}
	
	_getList( url )
	{
		fetch( url, 
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
		( request ) => { this._onList( request ); },
		( err ) => { this._onError( err ); } );
	}
	
	_onList(
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
																				source : "People List" }} ));
			this.set( "peoplelist", [] );
			this.dispatchEvent( new CustomEvent('people-list', { bubbles: true, composed: true, detail: [] } ));
			return;
		}
		response.json().then(
			( json ) => { this._processList( json ) },
			( err ) => { this._onError( err ) }
		);
	};
		  
	_processList( json )
	{
		if( !json.value || json.value.lenght == 0 ) return;
		
		if( json[ "@odata.nextLink" ] )
		{
			this.nextLink = json[ "@odata.nextLink" ];
			this.hasnextpage = true;
		}
		
		var list = [];
		for( var i = 0; i < this.peoplelist.length; i++ )
		{
			list.push(this.peoplelist[i]);
		}
		for( var i = 0; i < json.value.length; i++ )
		{
			list.push( json.value[i] );
		}
		this.set( "peoplelist", list );
		this.dispatchEvent( new CustomEvent('people-list', { bubbles: true, composed: true, detail: this.peoplelist } ));
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
		if( this.peoplelist && this.peoplelist.length > 0 )
		{
			this.peoplelist = [];
			this.hasnextpage = false;
			this.dispatchEvent( new CustomEvent('people-list', { bubbles: true, composed: true, detail: [] } ));
		}
	}

	//============================================================================
	// Observers
	//============================================================================
	authCodeChanged(
		  value
	) {
		this.clear();
	}
}

customElements.define(OutlookPeopleDs.is, OutlookPeopleDs );