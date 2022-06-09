/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import "../../@polymer/iron-demo-helpers/demo-snippet.js";
import "../../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../../@polymer/iron-icon/iron-icon.js";
import "../../@polymer/iron-ajax/iron-ajax.js";
import "../../@polymer/iron-pages/iron-pages.js";
import "../../@polymer/paper-icon-button/paper-icon-button.js";
import "../../@polymer/paper-checkbox/paper-checkbox.js";
import '../../@polymer/polymer/lib/elements/dom-bind.js';

import "../triblock-table.js";
import "../../triblock-tabs/triblock-tabs.js";
import "../../triplat-theme/triplat-theme.js";
import "../../triplat-query/triplat-query.js";
import "../../triplat-icon/ibm-icons.js";
import "../../triplat-theme/triplat-theme.js";

import { formatMarkupForDemo } from '../../tricore-util/tricore-util.js';

class TriDemo extends PolymerElement {
	static get template() {
		return html `
			<style include="tristyles-theme">
				:host {
					@apply --layout-fit;
					@apply --layout-vertical;
					margin: 0;
					padding: 0;
				}

				code {
					color: var(--ibm-purple-50);
				}

				demo-snippet {
					margin: 5px;
				}

				#pagesContainer {
					@apply --layout-flex;
					@apply --layout-vertical;
				}

				.page {
					@apply --layout-flex;
					@apply --layout-vertical;
					@apply --layout-center;
					@apply --layout-scroll;
				}
				.page > * {
					max-width: 1000px;
					width: 95%;
				}

				#pageTabs {
					--triblock-tabs-background-color: transparent;
					--triblock-tab-background-color: transparent;
					--triblock-tabs: {
						font-size: 18px;
					};
					--triblock-tabs-style: {
						font-size: 18px;
					};
				}

				.tri-h2 {
					margin: 30px 0 10px 10px;
				}
			</style>

			<iron-ajax url="data/many_employees.json" last-response="{{manyEmployees}}" auto></iron-ajax>

			<triblock-tabs id="pageTabs" iron-pages-id="pagesContainer" attr-for-selected="iron-page-id" selected="generalPage">
				<triblock-tab slot="tab" label="General Settings" iron-page-id="generalPage"></triblock-tab>
				<triblock-tab slot="tab" label="Styling" iron-page-id="stylingPage"></triblock-tab>
				<triblock-tab slot="tab"label="Custom Templates and Data Binding" iron-page-id="templatesPage"></triblock-tab>
				<triblock-tab slot="tab" label="Selection" iron-page-id="selectionPage"></triblock-tab>
				<triblock-tab slot="tab" label="Sorting" iron-page-id="sortingPage"></triblock-tab>
				<triblock-tab slot="tab" label="Dynamic Columns" iron-page-id="dynamicColumnsPage"></triblock-tab>
			</triblock-tabs>

			<iron-pages id="pagesContainer">

				<div id="generalPage" class="page">
					<div class="tri-h2">A basic <code>triblock-table</code></div>
					<demo-snippet id="demo1">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
						</triblock-table>
						<template id="template1" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>fixed-header</code> to fix the header row at the top of the table.</div>
					<demo-snippet id="demo2">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:350px;" fixed-header>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
						</triblock-table>
						<template id="template2" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>remove-row-focus-and-hover</code> to remove row hover styling and arrow-keys/tab focusing functionality.</div>
					<demo-snippet id="demo3">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" remove-row-focus-and-hover>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
						</triblock-table>
						<template id="template3" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>indexed</code> to add an index column to the table.</div>
					<demo-snippet id="demo4">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" indexed>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
							<triblock-table-column title="Email" property="email"></triblock-table-column>
						</triblock-table>
						<template id="template4" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Specify a <code>bold-row-property</code> to bold the text in a row whenever the specified item property is true.</div>
					<demo-snippet id="demo5">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" bold-row-property="isManager">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
							<triblock-table-column title="Email" property="email"></triblock-table-column>
						</triblock-table>
						<template id="template5" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Specify a <code>header-tooltip</code> on a <code>triblock-table-column</code> to set the tooltip hover text on a column header. By default, each column's header tooltip matches the <code>title</code> value.</div>
					<demo-snippet id="demo6">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name" header-tooltip="CUSTOM TOOLTIP HERE"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
						</triblock-table>
						<template id="template6" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">To disable the default column header tooltips, set <code>disable-default-tooltips</code>. Each column's <code>header-tooltip</code> property will still work as expected.</div>
					<demo-snippet id="demo7">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" disable-default-tooltips>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name" header-tooltip="CUSTOM TOOLTIP HERE"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
						</triblock-table>
						<template id="template7" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>merge-with-previous-column</code> on a <code>triblock-table-column</code> to visually combine the column with the previous one in the table.</div>
					<demo-snippet id="demo8">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" bold-row-property="isManager">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Info" property="name"></triblock-table-column>
							<triblock-table-column property="phone" merge-with-previous-column></triblock-table-column>
							<triblock-table-column property="email" merge-with-previous-column></triblock-table-column>
						</triblock-table>
						<template id="template8" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Specify a <code>title-icon</code> on a <code>triblock-table-column</code> to replace the title of a column with an <code>iron-icon</code>. You can still supply a <code>title</code> as tooltip text in the header.</div>
					<demo-snippet id="demo9">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" bold-row-property="isManager">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" title-icon="info-outline" property="status" type="STRING_WITH_ID"></triblock-table-column>
							<triblock-table-column title="Email" title-icon="send" property="email"></triblock-table-column>
						</triblock-table>
						<template id="template9" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>remove-default-cell-padding</code> on a <code>triblock-table-column</code> to remove the padding automatically applied on each table cell.</div>
					<demo-snippet id="demo10">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
							<triblock-table-column title="Action Button" property="status" remove-default-cell-padding>
								<template>
									<paper-icon-button icon="icons:delete"></paper-icon-button>
								</template>
							</triblock-table-column>
						</triblock-table>
						<template id="template10" is="dom-bind">
						</template>
					</demo-snippet>
				</div>

				<div id="stylingPage" class="page">
					<div class="tri-h2">Use various CSS properties to style the table...</div>
					<demo-snippet id="demo11">
					<style is="custom-style">
						#table1 {
							color: white;
							--triblock-table-header-background-color: black;
							--triblock-table-header-color: white;
							--triblock-table-even-row-background-color: rgb(80, 80, 80);
							--triblock-table-odd-row-background-color: rgb(40, 40, 40);
							--triblock-table-row-hover-background-color: darkblue;
						}
					</style>

	<triblock-table id="table1" data="[[manyEmployees]]" style="width:100%; height:250px;">
		<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
		<triblock-table-column title="Name" property="name"></triblock-table-column>
		<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
		<triblock-table-column title="Email" property="email"></triblock-table-column>
	</triblock-table>
						<template id="template11" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">...or individual columns.</div>
					<demo-snippet id="demo12">
						<style is="custom-style">
							.custom-column {
								--triblock-table-column-fixed-width: 80px;
								--triblock-table-column-body-flex-alignment: flex-end;
								--triblock-table-column-header-flex-alignment: center;
							}
						</style>

	<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
		<triblock-table-column class="custom-column" title="ID" property="_id"></triblock-table-column>
		<triblock-table-column title="Name" property="name"></triblock-table-column>
		<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
		<triblock-table-column title="Email" property="email"></triblock-table-column>
	</triblock-table>
						<template id="template12" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Additionally, there are predefined classes available to quickly style a <code>triblock-table-column</code>: <code>narrow</code>, <code>wide</code>, <code>extra-wide</code>, <code>centered</code>, and <code>right-aligned</code>.</div>
					<demo-snippet id="demo13">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="default" property="_id"></triblock-table-column>
							<triblock-table-column title="narrow right-aligned" property="name" class="narrow right-aligned"></triblock-table-column>
							<triblock-table-column title="wide centered" property="email" class="wide centered"></triblock-table-column>
						</triblock-table>
						<template id="template13" is="dom-bind">
						</template>
					</demo-snippet>
				</div>

				<div id="templatesPage" class="page">
					<div class="tri-h2">Set <code>type</code> on <code>triblock-table-column</code> to use a preset cell template (either "boolean" or "date")...</div>
					<demo-snippet id="demo14">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:350px;">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Manager?" property="isManager" type="boolean"></triblock-table-column>
							<triblock-table-column title="Date of Birth" property="dateOfBirth" type="date"></triblock-table-column>
						</triblock-table>
						<template id="template14" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">...or add a <code>template</code> within <code>triblock-table-column</code> to define your own custom cell template. The available binding variables are <code>value</code> (the row item's specified <code>property</code> value for the column), <code>item</code> (the entire row item), <code>index</code> (index of the row in the table), and <code>tabIndex</code> (managed by iron-list for keyboard accessibility within the table).</div>
					<demo-snippet id="demo15">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="Employee ID" property="_id">
								<template>
									<a tabindex$="[[tabIndex]]" target="_blank" href="data/many_employees.json">[[value]]</a>
								</template>
							</triblock-table-column>
							<triblock-table-column title="Name" property="name">
								<template>
									<div>[[item.last]], [[item.first]]</div>
								</template>
							</triblock-table-column>
							<triblock-table-column title="Index">
								<template>
									<div>[[index]]</div>
								</template>
							</triblock-table-column>
						</triblock-table>
						<template id="template15" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Add a <code>triblock-table-row-detail</code> template to add an expandable row-detail section on each row. The available binding variables are <code>item</code> (the entire row item), <code>index</code> (index of the row in the table), and <code>tabIndex</code> (managed by iron-list for keyboard accessibility within the table).</div>
					<demo-snippet id="demo16">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" expand-on-row-tap>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
							<triblock-table-row-detail>
								<template>
									<div>[[index]].</div>
									<div>First name: {{item.first}}</div>
									<div>Last name: {{item.last}}</div>
									<div>Contact information:</div>
									<div tabindex$="[[tabIndex]]">E-mail: {{item.email}}</div>
									<div>Phone #: {{item.phone}}</div>
								</template>
							</triblock-table-row-detail>
						</triblock-table>
						<template id="template16" is="dom-bind">
						</template>
					</demo-snippet>
					
					<div class="tri-h2">...or always show the expandable row-detail section in each row and hide the row expand icon column.</div>
					<demo-snippet id="demo17">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" always-show-row-detail>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
							<triblock-table-row-detail>
								<template>
									<div>[[index]].</div>
									<div>First name: {{item.first}}</div>
									<div>Last name: {{item.last}}</div>
									<div>Contact information:</div>
									<div tabindex$="[[tabIndex]]">E-mail: {{item.email}}</div>
									<div>Phone #: {{item.phone}}</div>
								</template>
							</triblock-table-row-detail>
						</triblock-table>
						<template id="template17" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">To change the binding variable names, specify <code>bind-value-as</code>, <code>bind-item-as</code>, and <code>bind-index-as</code>.</div>
					<demo-snippet id="demo18">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" expand-on-row-tap bind-value-as="val" bind-item-as="row" bind-index-as="idx">
							<triblock-table-column title="Employee ID" property="_id">
								<template>
									<a target="_blank" href="data/many_employees.json">[[val]]</a>
								</template>
							</triblock-table-column>
							<triblock-table-column title="Name" property="name">
								<template>
									<div>[[row.last]], [[row.first]]</div>
								</template>
							</triblock-table-column>
							<triblock-table-column title="Index">
								<template>
									<div>[[idx]]</div>
								</template>
							</triblock-table-column>
							<triblock-table-row-detail>
								<template>
									<div>[[idx]].</div>
									<div>First name: {{row.first}}</div>
									<div>Last name: {{row.last}}</div>
									<div>Contact information:</div>
									<div>E-mail: {{row.email}}</div>
									<div>Phone #: {{row.phone}}</div>
								</template>
							</triblock-table-row-detail>
						</triblock-table>
						<template id="template18" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Specify a <code>default-value</code> on a <code>triblock-table-column</code> to replace any blank/empty <code>value</code> bindings...</div>
					<demo-snippet id="demo19">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Has Email?" property="email">
								<template>
									<paper-checkbox disabled checked="[[!_isEmpty(value)]]"></paper-checkbox>
								</template>
							</triblock-table-column>
							<triblock-table-column title="Contact" property="email" default-value="manager@data.com">
								<template>
									<a href="[[_computeEmailLink(value)]]">Contact</a>
								</template>
							</triblock-table-column>
						</triblock-table>
						<template is="dom-bind" id="template19">
						</template>
					</demo-snippet>

					<div class="tri-h2">...or specify <code>default-text</code> on a <code>triblock-table-column</code> to show a message replacement for any blank/empty cell values.</div>
					<demo-snippet id="demo20">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Email" property="email" default-text="No email specified">
								<template>
									<a href="[[_computeEmailLink(value)]]">[[value]]</a>
								</template>
							</triblock-table-column>
						</triblock-table>
						<template is="dom-bind" id="template20">
						</template>
					</demo-snippet>
				</div>

				<div id="selectionPage" class="page">
					<div class="tri-h2">Set <code>selectable</code> to enable selection. By default, it sets up single-record selection.</div>
					<demo-snippet id="demo21">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" selectable select-on-row-tap>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
						</triblock-table>
						<template id="template21" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>multi-select</code> in addition to <code>selectable</code> to switch to multi-record selection.</div>
					<demo-snippet id="demo22">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" selectable multi-select select-on-row-tap>
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
						</triblock-table>
						<template id="template22" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">When a selection is made, the specified <code>selected-property</code> (by default, "selected") is toggled on the data item and a <code>row-select</code> event is fired. You can use these to keep track of the selected item(s).</div>
					<demo-snippet id="demo23">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" selectable multi-select select-on-row-tap selected-property="isSelected" on-row-select="_onRowSelect">
							<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Name" property="name"></triblock-table-column>
							<triblock-table-column title="Custom Selection Column" property="isSelected">
								<template>
									<iron-icon icon="visibility" hidden\$="[[!value]]"></iron-icon>
								</template>
							</triblock-table-column>
						</triblock-table>

						<array-selector id="selector" items="{{manyEmployees}}" selected="{{selectedItems}}" multi toggle></array-selector>

						<div>Selected:</div>
						<template is="dom-repeat" items="[[selectedItems]]">
							<div>[[item._id]]</div>
						</template>
						<template is="dom-bind" id="template23">
						</template>
					</demo-snippet>
				</div>
				<div id="sortingPage" class="page">
					<div class="tri-h2">Set <code>sortable</code> on a <code>triblock-table-column</code> to mark it as sortable. This will cause <code>sort-property</code> and <code>sort-descending</code> on the <code>triblock-table</code> to update based on user input (tapping on the column headers to modify the sort), which can be used to sort the table data.</div>
					<demo-snippet id="demo24">
						<triplat-query data="{{manyEmployees}}" filtered-data-out="{{manyEmployeesSorted1}}">
							<triplat-query-sort name="[[sortProperty1]]" desc="[[sortDescending1]]"></triplat-query-sort>
						</triplat-query>

						<triblock-table data="[[manyEmployeesSorted1]]" style="width:100%; height:250px;" sort-property="{{sortProperty1}}" sort-descending="{{sortDescending1}}">
							<triblock-table-column title="ID" property="_id" sortable></triblock-table-column>
							<triblock-table-column title="Full name" property="name" sortable></triblock-table-column>
							<triblock-table-column title="E-mail" property="email" hide="[[hideEmailColumn]]" sortable></triblock-table-column>
						</triblock-table>
						<template id="template24" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>initial-sort</code> on a <code>sortable triblock-table-column</code> to make it the initial sort order for the table.</div>
					<demo-snippet id="demo25">
						<triplat-query data="{{manyEmployees}}" filtered-data-out="{{manyEmployeesSorted2}}">
							<triplat-query-sort name="[[sortProperty2]]" desc="[[sortDescending2]]"></triplat-query-sort>
						</triplat-query>

						<triblock-table data="[[manyEmployeesSorted2]]" style="width:100%; height:250px;" sort-property="{{sortProperty2}}" sort-descending="{{sortDescending2}}">
							<triblock-table-column title="ID" property="_id" sortable initial-sort></triblock-table-column>
							<triblock-table-column title="Full name" property="name" sortable></triblock-table-column>
							<triblock-table-column title="E-mail" property="email" hide="[[hideEmailColumn]]" sortable></triblock-table-column>
						</triblock-table>
						<template id="template25" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>default-sort-descending</code> on a <code>sortable triblock-table-column</code> to indicate that it should sort descending on the first tap of the column header before sorting ascending. This also works with <code>initial-sort</code> for initializing the table with a descending sort order.</div>
					<demo-snippet id="demo26">
						<triplat-query data="{{manyEmployees}}" filtered-data-out="{{manyEmployeesSorted3}}">
							<triplat-query-sort name="[[sortProperty3]]" desc="[[sortDescending3]]"></triplat-query-sort>
						</triplat-query>

						<triblock-table data="[[manyEmployeesSorted3]]" style="width:100%; height:250px;" sort-property="{{sortProperty3}}" sort-descending="{{sortDescending3}}">
							<triblock-table-column title="ID" property="_id" sortable initial-sort default-sort-descending></triblock-table-column>
							<triblock-table-column title="Full name" property="name" sortable></triblock-table-column>
							<triblock-table-column title="E-mail" property="email" hide="[[hideEmailColumn]]" sortable></triblock-table-column>
						</triblock-table>
						<template id="template26" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">If all of the columns in a table are sortable, you can set <code>sortable</code> on the <code>triblock-table</code> instead of each <code>triblock-table-column</code>.</div>
					<demo-snippet id="demo27">
						<triplat-query data="{{manyEmployees}}" filtered-data-out="{{manyEmployeesSorted4}}">
							<triplat-query-sort name="[[sortProperty4]]" desc="[[sortDescending4]]"></triplat-query-sort>
						</triplat-query>

						<triblock-table data="[[manyEmployeesSorted4]]" style="width:100%; height:250px;" sortable sort-property="{{sortProperty4}}" sort-descending="{{sortDescending4}}">
							<triblock-table-column title="ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Full name" property="name"></triblock-table-column>
							<triblock-table-column title="E-mail" property="email" hide="[[hideEmailColumn]]"></triblock-table-column>
						</triblock-table>
						<template id="template27" is="dom-bind">
						</template>
					</demo-snippet>
				</div>

				<div id="dynamicColumnsPage" class="page">
					<div class="tri-h2">Set or update <code>hide</code> on <code>triblock-table-column</code> to dynamically show or hide a column.</div>
					<demo-snippet id="demo28">
						<paper-checkbox checked="{{hideEmailColumn}}" style="margin: 20px;">Hide Email Column</paper-checkbox>
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Full name" property="name"></triblock-table-column>
							<triblock-table-column title="E-mail" property="email" hide="[[hideEmailColumn]]"></triblock-table-column>
						</triblock-table>
						<template id="template28" is="dom-bind">
						</template>
					</demo-snippet>

					<div class="tri-h2">Set <code>hide-on-screen-width</code> on <code>triblock-table-column</code> to responsively show or hide a column based on the width of the browser window. This property accepts values in px.</div>
					<demo-snippet id="demo29">
						<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
							<triblock-table-column title="ID" property="_id"></triblock-table-column>
							<triblock-table-column title="Full name" property="name" hide-on-screen-width="800px"></triblock-table-column>
							<triblock-table-column title="E-mail" property="email" hide-on-screen-width="1000px"></triblock-table-column>
							<triblock-table-column title="Phone #" property="phone" hide-on-screen-width="500px"></triblock-table-column>
						</triblock-table>
						<template id="template29" is="dom-bind">
						</template>
					</demo-snippet>
				</div>
			</iron-pages>
		`;
	}	

	connectedCallback() {
		super.connectedCallback();
		this.$.template1.innerHTML = formatMarkupForDemo(this.$.demo1);
		this.$.template2.innerHTML = formatMarkupForDemo(this.$.demo2);
		this.$.template3.innerHTML = formatMarkupForDemo(this.$.demo3);
		this.$.template4.innerHTML = formatMarkupForDemo(this.$.demo4);
		this.$.template5.innerHTML = formatMarkupForDemo(this.$.demo5);
		this.$.template6.innerHTML = formatMarkupForDemo(this.$.demo6);
		this.$.template7.innerHTML = formatMarkupForDemo(this.$.demo7);
		this.$.template8.innerHTML = formatMarkupForDemo(this.$.demo8);
		this.$.template9.innerHTML = formatMarkupForDemo(this.$.demo9);
		this.$.template10.innerHTML = formatMarkupForDemo(this.$.demo10);
		this.$.template11.innerHTML = `
	<style is="custom-style">
		#table1 {
			color: white;
			--triblock-table-header-background-color: black;
			--triblock-table-header-color: white;
			--triblock-table-even-row-background-color: rgb(80, 80, 80);
			--triblock-table-odd-row-background-color: rgb(40, 40, 40);
			--triblock-table-row-hover-background-color: darkblue;
		}
	</style>` + formatMarkupForDemo(this.$.demo11);
		this.$.template12.innerHTML = `
	<style is="custom-style">
		.custom-column {
			--triblock-table-column-fixed-width: 80px;
			--triblock-table-column-body-flex-alignment: flex-end;
			--triblock-table-column-header-flex-alignment: center;
		}
	</style>` + formatMarkupForDemo(this.$.demo12);
		this.$.template13.innerHTML = formatMarkupForDemo(this.$.demo13);
		this.$.template14.innerHTML = formatMarkupForDemo(this.$.demo14);
		this.$.template15.innerHTML = `
	<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
		<triblock-table-column title="Employee ID" property="_id">
			<template>
				<a tabindex$="[[tabIndex]]" target="_blank" href="data/many_employees.json">[[value]]</a>
			</template>
		</triblock-table-column>
		<triblock-table-column title="Name" property="name">
			<template>
				<div>[[item.last]], [[item.first]]</div>
			</template>
		</triblock-table-column>
		<triblock-table-column title="Index">
			<template>
				<div>[[index]]</div>
			</template>
		</triblock-table-column>
	</triblock-table>`;
		this.$.template16.innerHTML = `
		<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" expand-on-row-tap>
			<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
			<triblock-table-column title="Name" property="name"></triblock-table-column>
			<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
			<triblock-table-row-detail>
				<template>
					<div>[[index]].</div>
					<div>First name: {{item.first}}</div>
					<div>Last name: {{item.last}}</div>
					<div>Contact information:</div>
					<div tabindex$="[[tabIndex]]">E-mail: {{item.email}}</div>
					<div>Phone #: {{item.phone}}</div>
				</template>
			</triblock-table-row-detail>
		</triblock-table>`;
		this.$.template17.innerHTML = `
		<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" always-show-row-detail>
			<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
			<triblock-table-column title="Name" property="name"></triblock-table-column>
			<triblock-table-column title="Status" property="status" type="STRING_WITH_ID"></triblock-table-column>
			<triblock-table-row-detail>
				<template>
					<div>[[index]].</div>
					<div>First name: {{item.first}}</div>
					<div>Last name: {{item.last}}</div>
					<div>Contact information:</div>
					<div tabindex$="[[tabIndex]]">E-mail: {{item.email}}</div>
					<div>Phone #: {{item.phone}}</div>
				</template>
			</triblock-table-row-detail>
		</triblock-table>`;
		this.$.template18.innerHTML = `
		<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" expand-on-row-tap bind-value-as="val" bind-item-as="row" bind-index-as="idx">
			<triblock-table-column title="Employee ID" property="_id">
				<template>
					<a target="_blank" href="data/many_employees.json">[[val]]</a>
				</template>
			</triblock-table-column>
			<triblock-table-column title="Name" property="name">
				<template>
					<div>[[row.last]], [[row.first]]</div>
				</template>
			</triblock-table-column>
			<triblock-table-column title="Index">
				<template>
					<div>[[idx]]</div>
				</template>
			</triblock-table-column>
			<triblock-table-row-detail>
				<template>
					<div>[[idx]].</div>
					<div>First name: {{row.first}}</div>
					<div>Last name: {{row.last}}</div>
					<div>Contact information:</div>
					<div>E-mail: {{row.email}}</div>
					<div>Phone #: {{row.phone}}</div>
				</template>
			</triblock-table-row-detail>
		</triblock-table>`;
		this.$.template19.innerHTML = `
		<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
			<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
			<triblock-table-column title="Name" property="name"></triblock-table-column>
			<triblock-table-column title="Has Email?" property="email">
				<template>
					<paper-checkbox disabled checked="[[!_isEmpty(value)]]"></paper-checkbox>
				</template>
			</triblock-table-column>
			<triblock-table-column title="Contact" property="email" default-value="manager@data.com">
				<template>
					<a href="[[_computeEmailLink(value)]]">Contact</a>
				</template>
			</triblock-table-column>
		</triblock-table>

		// js
		_computeEmailLink(value) {
			return "mailto:"+value;
		}
	
		_isEmpty(value) {
			return !value || value == "";
		}`;
		this.$.template20.innerHTML = `
			<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
				<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
				<triblock-table-column title="Name" property="name"></triblock-table-column>
				<triblock-table-column title="Email" property="email" default-text="No email specified">
					<template>
						<a href="[[_computeEmailLink(value)]]">[[value]]</a>
					</template>
				</triblock-table-column>
			</triblock-table>
			// js
			_computeEmailLink(value) {
				return "mailto:"+value;
			}`;
		this.$.template21.innerHTML = formatMarkupForDemo(this.$.demo21);
		this.$.template22.innerHTML = formatMarkupForDemo(this.$.demo22);
		this.$.template23.innerHTML = `
			<triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;" selectable multi-select select-on-row-tap selected-property="isSelected" on-row-select="_onRowSelect">
				<triblock-table-column title="Employee ID" property="_id"></triblock-table-column>
				<triblock-table-column title="Name" property="name"></triblock-table-column>
				<triblock-table-column title="Custom Selection Column" property="isSelected">
					<template>
						<iron-icon icon="visibility" hidden$="[[!value]]"></iron-icon>
					</template>
				</triblock-table-column>
			</triblock-table>

			<array-selector id="selector" items="{{manyEmployees}}" selected="{{selectedItems}}" multi toggle></array-selector>

			<div>Selected:</div>
			<template is="dom-repeat" items="[[selectedItems]]">
				<div>[[item._id]]</div>
			</template>
			// js
			_onRowSelect = function(e) {
				// toggle selection
				var item = e.detail.item;
				this.$.selector.select(item);
			}`;
		 this.$.template24.innerHTML = formatMarkupForDemo(this.$.demo24);
		 this.$.template25.innerHTML = formatMarkupForDemo(this.$.demo25);
		 this.$.template26.innerHTML = formatMarkupForDemo(this.$.demo26);
		 this.$.template27.innerHTML = formatMarkupForDemo(this.$.demo27);
		 this.$.template28.innerHTML = `
		 <paper-checkbox checked="{{hideEmailColumn}}" style="margin: 20px;">Hide Email Column</paper-checkbox>
		 <triblock-table data="[[manyEmployees]]" style="width:100%; height:250px;">
			 <triblock-table-column title="ID" property="_id"></triblock-table-column>
			 <triblock-table-column title="Full name" property="name"></triblock-table-column>
			 <triblock-table-column title="E-mail" property="email" hide="[[hideEmailColumn]]"></triblock-table-column>
		 </triblock-table>`;
		 this.$.template29.innerHTML = formatMarkupForDemo(this.$.demo29);
	}

	_computeEmailLink(value) {
		return "mailto:"+value;
	}

	_isEmpty(value) {
		return !value || value == "";
	}

	_onRowSelect(e) {
		// toggle selection
		var item = e.detail.item;
		this.$.selector.select(item);
	}

}

customElements.define('tri-demo', TriDemo);