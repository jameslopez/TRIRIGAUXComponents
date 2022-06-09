/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../tricore-url/tricore-url.js";
import "../triplat-search-input/triplat-search-input.js";
import "../triplat-routing/triplat-routing.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import "../triplat-theme/triplat-theme.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../@polymer/iron-pages/iron-pages.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../@polymer/paper-drawer-panel/paper-drawer-panel.js";
import "../@polymer/paper-header-panel/paper-header-panel.js";
import "../@polymer/paper-toolbar/paper-toolbar.js";
import "../@polymer/paper-listbox/paper-listbox.js";
import "../@polymer/paper-item/paper-item.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../@polymer/paper-radio-group/paper-radio-group.js";
import "../@polymer/paper-radio-button/paper-radio-button.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning tristyles-theme">

			iframe {
				@apply --layout-flex;
				padding: 0px;
				margin: 0px;
				border: 0px;
				width: 100%;
			}
			.group-item {
				font-size: 22px;
				font-weight: bolder;
				color: #424242;
				padding: 20px 0px 5px 16px;
				border-top: solid #ccc 1px;
				border-bottom: solid #ccc 1px;
			}
			paper-header-panel[drawer] paper-listbox {
				background-color: white;
				overflow-y: auto;
			}
			.demo-link:link,
			.demo-link:visited,
			.demo-link:hover,
			.demo-link:active,
			.demo-link {
				color: inherit;
				text-decoration: none;
				@apply --layout-flex;
				@apply --layout;
				@apply --layout-horizontal;
				@apply --layout-end-justified;
			}
			.title {
				@apply --layout-flex;
				text-align: left;
			}
			paper-item {
				cursor: pointer;
				padding-left: 27px;
				@apply --layout-horizontal;
			}

			paper-drawer-panel {
				--paper-drawer-panel-left-drawer-container: {
					box-shadow:  0 0 8px rgba(0,0,0,0.4);
				};
			}

			paper-toolbar {
				background-color: white;
				--paper-toolbar-height: 45px;
				--paper-toolbar-sm-height: 45px;
				height: 90px;
			}
			
			label {
				font-weight: bolder;
				padding-left: 16px;
			}
			
			paper-radio-group {
				@apply --layout-horizontal;
			}

			triplat-search-input {
				@apply --layout-flex;
				padding: 0px 16px;
				background-color: white;
				border-top: solid #ccc 1px;
				--triplat-search-input-search-icon: {
					color: rgba(0,0,0,.54);
				};
				--triplat-search-input-clear-icon: {
					color: rgba(0,0,0,.54);	
				};
				--triplat-search-input: {
					font-size: 14px;
				};
			}

			.version {
				color: var(--paper-grey-500);
				font-size: 12px;
				line-height: 24px;
				font-weight: 400;
				@apply --layout-flex-1;
				text-align: right;
			}
		
		</style>

		<triplat-route id="router" name="component" path="/:componentName/:componentVersion" params="{{params}}" greedy=""></triplat-route>

		<iron-ajax auto="" url="{{url}}" last-response="{{groups}}"></iron-ajax>
		<paper-drawer-panel class="flex" id="drawerPanel" narrow="{{_narrow}}">
			
			<paper-header-panel drawer="" mode="waterfall" slot="drawer">
				
				<paper-toolbar slot="header">
					<label id="polymerLabel" slot="top">Polymer:</label>
					<paper-radio-group class="top" selected="{{polymerVersion}}" aria-labelledby="polymerLabel" slot="top">
						<paper-radio-button name="1">1</paper-radio-button>
						<paper-radio-button name="3">3</paper-radio-button>
					</paper-radio-group>
					<triplat-search-input class="bottom" value="{{search}}" placeholder="Search Components" slot="bottom"></triplat-search-input>
				</paper-toolbar>

				<paper-listbox class="content" attr-for-selected="path" selectable="paper-item" on-iron-activate="_handleSelection">
					<template is="dom-repeat" items="{{filteredGroups.groups}}" as="group">
						<div class="group-item self-center">{{group.name}}</div>
						<template is="dom-repeat" items="{{group.files}}" as="file">
							<paper-item file="[[file]]">
								<div class="title">[[file.name]]</div>
								<div class="version">[[file.version]]</div>
							</paper-item>
						</template>
					</template>
				</paper-listbox>

			</paper-header-panel>
			
			<div main="" class="layout vertical" slot="main">
				<paper-icon-button icon="ibm-glyphs:menu" on-tap="_toggleDrawer" hidden\$="[[!_narrow]]"></paper-icon-button>
				<iframe id="content"></iframe>
			</div>
			
		</paper-drawer-panel>
	`,

    is: "tricore-doc-page",

    properties: {
		url: {
			type: String,
			notify: false,
			readOnly: false
		},
		
		polymerVersion: {
			type: String,
			value: "1",
			observer: "_handlePolymerVersionChange"
		},
		
		groups: Array,

		filteredGroups: Array,
		
		_narrow: Boolean
	},

    observers: [
		"_filterFiles(groups, search)",
		"_handleGroupsChange(groups)",
		"_handleRouteChange(files, params.componentName)"
	],

    _computeRoutePath: function(file) {
		return "/" + file.name;
	},

    _filterFiles: function(groups, search) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var filteredGroups = {
			groups: []
		};

		var lowerSearch = search.toLowerCase();

		for (var i = 0, j = 0; i < groups.groups.length; i++) {
			var group = groups.groups[i];
			if (group.files.length == 0) {
				continue;
			}
			filteredGroups.groups.push({name: group.name});
			filteredGroups.groups[j].files = group.files.sort(function(a, b) {
				 if (a.name < b.name){
					return -1;
				 }else if (a.name > b.name){
				   return  1;
				 }
				 return 0;
				}).filter(function(file) {
				return file.name.toLowerCase().indexOf(lowerSearch) >= 0;
			});
			++j;
		}

		this.filteredGroups = filteredGroups;
	},

    _handleGroupsChange: function(groups) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var files = {};

		groups.groups.forEach(function(group) {
			group.files.forEach(function(file) {
				files[file.name] = file;
			});
		});

		this.files = files;
	},

    _handleRouteChange: function(files, componentName) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this.currentFile = files[componentName];
		this.$.content.src = this.currentFile.path;
	},

    _handleSelection: function(e) {
		this.$.router.navigate({
			componentName: e.detail.item.file.name,
			componentVersion: e.detail.item.file.version
		});
	},

    _handlePolymerVersionChange: function(newVersion, oldVersion) {
		if (oldVersion && newVersion && newVersion != oldVersion) {
			var url = new URL(document.location.href);
			url.searchParams.set("polymerVersion", newVersion)
			window.location.assign(url.href)
		}
	},
	
	_toggleDrawer: function() {
		this.$.drawerPanel.togglePanel();
	}
});