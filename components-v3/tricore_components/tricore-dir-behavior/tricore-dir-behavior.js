/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

/**
 * `TriDirBehavior` can be used to provide text directional context to the element.
 *
 * @polymerBehavior
 */
export const TriDirBehavior = {

	properties: {

		/**
		 * The text directional value
		 */
		dir: {
			type: String,
			readonly: true,
			reflectToAttribute: true,
			value: function() {
				return document.querySelector('body').getAttribute('dir');
			}
		}
	}
}