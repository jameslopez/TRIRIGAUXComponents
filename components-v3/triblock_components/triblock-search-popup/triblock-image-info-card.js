/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../triplat-image/triplat-image.js";
import "../triplat-icon/triplat-icon.js";

/*
`triblock-image-info-card` is a card with an image on the left side and a customizable information section on the right side.

Example:
```html
<triblock-image-info-card
  data="[[data]]" 
  placeholder-icon="icon" 
  image-width="[[imageWidth]]" 
  image-height="[[imageHeight]]">
</triblock-image-info-card>
```

### Styling

The following custom properties and mixins are also available for styling:

Custom property                               | Description                                         | Default
----------------------------------------------|-----------------------------------------------------|----------
`--triblock-image-info-card-image-container`  | Mixin applied to the image container                | `{}`
`--triblock-image-info-card-placeholder-icon` | Mixin applied to the triplat-image placeholder icon | `{}`
`--triblock-image-info-card-detail-container` | Mixin applied to the detail container               | `{}`
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				#horizontal {
					@apply --layout-flex;
					@apply --layout-horizontal;
					@apply --layout-center;
				}

				.image {
					position: relative;
					z-index: 1;
					display: inline-block;
					border-radius: 100%;
					overflow: hidden;
					background-color: var(--tri-secondary-color);
					height: 44px;
					width: 44px;
					min-width: 44px;
					@apply --layout-vertical;
					@apply --layout-center-justified;

					@apply --triblock-image-info-card-image-container;
				}
				:host([image-align-top]) .image {
					align-self: flex-start;
				}

				.image-non-circular {
					border-radius: 0;
				}

				triplat-image {
					--triplat-image-placeholder-icon: {
						height: 32px;
						width: 32px;
						color: white;

						@apply --triblock-image-info-card-placeholder-icon;
					};
				}

				.detail {
					@apply --layout-vertical;
					flex: 1;
					padding: 0 1em;

					@apply --triblock-image-info-card-detail-container;
				}

				.detail * {
					margin: 0;
					font-size: 14px;
				}

				.detail h3 {
					font-weight: 400;
				}
			
		</style>

		<div id="horizontal">
			<div class\$="[[_computeImageClass(data.picture, circularImage)]]" aria-hidden="true">
				<triplat-image src="[[data.picture]]" width="[[imageWidth]]" height="[[imageHeight]]" sizing="cover" placeholder-icon="[[placeholderIcon]]" cache="[[cacheImage]]" thumbnail="[[thumbnail]]">
				</triplat-image>
			</div>

			<div class="detail">
				<slot></slot>
			</div>
		</div>
	`,

    is: "triblock-image-info-card",

    properties: {
		// Data object that should have a `picture` property with an image URL path.
		data: Object,
		
		// Placeholder icon that is displayed when no user-defined image is provided.
		placeholderIcon: String,
		
		// Height in pixels.
		imageHeight: {
			type: Number,
			value: 44
		},

		// Width in pixels.
		imageWidth: {
			type: Number,
			value: 44
		},
		
		// If true, the image will be displayed in a circular container.
		circularImage: {
			type: Boolean,
			value: false
		},

		// If true, the image will be aligned at the top of the card.
		imageAlignTop: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		
		/**
		 * If true, the images displayed by this component will be saved to the offline cache.
		 */
		cacheImage: {
			type: Boolean,
			value: false
		},
		
		/**
		 * If true, it will display a thumbnail version of the images.
		 */
		thumbnail: {
			type: Boolean,
			value: false
		}
	},

    _computeImageClass: function(image, circularImage) {
		var imageClass = "image" + ((image && !circularImage) ? "image-non-circular" : "");
		return imageClass;
	}
});