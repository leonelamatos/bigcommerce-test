import { hooks } from '@bigcommerce/stencil-utils';
import utils from '@bigcommerce/stencil-utils';
import { normalizeFormData } from './common/utils/api';

import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';

import ProductDetails from './common/product-details';

export default class Category extends CatalogPage {
	constructor(context) {
		super(context);
		this.validationDictionary = createTranslationDictionary(context);

		// Check if client is on special item category
		this.breadcrumbLastPath = $.trim(
			$('[aria-label="Breadcrumb"] ol li').last().text()
		);
	}

	isSpecialItemCategory() {
		if (this.breadcrumbLastPath === 'Special Items') return true;
		return false;
	}

	setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
		$element.attr({
			'role': roleType,
			'aria-live': ariaLiveStatus,
		});
	}

	makeShopByPriceFilterAccessible() {
		if (!$('[data-shop-by-price]').length) return;

		if ($('.navList-action').hasClass('is-active')) {
			$('a.navList-action.is-active').focus();
		}

		$('a.navList-action').on('click', () =>
			this.setLiveRegionAttributes(
				$('span.price-filter-message'),
				'status',
				'assertive'
			)
		);
	}

	onReady() {
		this.arrangeFocusOnSortBy();

		$('[data-button-type="add-cart"]').on('click', (e) =>
			this.setLiveRegionAttributes(
				$(e.currentTarget).next(),
				'status',
				'polite'
			)
		);

		this.makeShopByPriceFilterAccessible();

		compareProducts(this.context);

		if ($('#facetedSearch').length > 0) {
			this.initFacetedSearch();
		} else {
			this.onSortBySubmit = this.onSortBySubmit.bind(this);
			hooks.on('sortBy-submitted', this.onSortBySubmit);
		}

		$('a.reset-btn').on('click', () =>
			this.setLiveRegionsAttributes(
				$('span.reset-message'),
				'status',
				'polite'
			)
		);

		this.ariaNotifyNoProducts();

		this.changeImageOnHover();

		this.addAllItemsToCart(this.breadcrumbLastPath);
	}

	addAllItemsToCart(event) {
		const isSpecialItemCategory = this.isSpecialItemCategory();
		if (isSpecialItemCategory) {
			const buttonStyle = {
				background: 'red',
				color: 'white',
				padding: '10px',
				position: 'absolute',
				right: '50px',
			};
			const categoryPage = $('.body');
			categoryPage.prepend(
				`<form
				<button id="form-action-addToCart" data-wait-message="aading to cart...  type="submit" class="button button--primary add-btn">Add All To Cart</button>`
			);
			const $addBtn = $('.add-btn');

			$addBtn.on('click', function () {
				normalizeFormData(new FormData(form)),
					(err, response) => {
						const errorMessage = err || response.data.error;

						$addToCartBtn
							.val(originalBtnVal)
							.prop('disabled', false);

						this.$overlay.hide();

						// Guard statement
						if (errorMessage) {
							// Strip the HTML from the error message
							const tmp = document.createElement('DIV');
							tmp.innerHTML = errorMessage;

							if (!this.checkIsQuickViewChild($addToCartBtn)) {
								alertModal().$preModalFocusedEl = $addToCartBtn;
							}

							return showAlertModal(
								tmp.textContent || tmp.innerText
							);
						}

						// Open preview modal and update content
						if (this.previewModal) {
							this.previewModal.open();

							if (window.ApplePaySession) {
								this.previewModal.$modal.addClass(
									'apple-pay-supported'
								);
							}

							if (!this.checkIsQuickViewChild($addToCartBtn)) {
								this.previewModal.$preModalFocusedEl =
									$addToCartBtn;
							}

							this.updateCartContent(
								this.previewModal,
								response.data.cart_item.id
							);
						} else {
							this.$overlay.show();
							// if no modal, redirect to the cart page
							this.redirectTo(
								response.data.cart_item.cart_url ||
									this.context.urls.cart
							);
						}
					};
				// )
			});

			//.css(buttonStyle);
			// $('[data-test]').each(function () {
			// 	console.log(this);
			// 	addBtn.click(() => {
			// 		// addProductToCart();
			// 		// alert('button clicked');
			// 	});
			// });
		}
	}

	changeImageOnHover() {
		const isSpecialItemCategory = this.isSpecialItemCategory();
		if (isSpecialItemCategory) {
			let $images = $('.card-figure');
			$images.hover(
				function () {
					$(this)
						.find('img.card-image')
						.attr('srcset', function (_, currentValue) {
							return 'https://cdn11.bigcommerce.com/s-ygbdkye24d/images/stencil/500x659/products/112/376/daniel-tomlinson-fFJqJ_GWxxk-unsplash__96050.1629489615.jpg';
						});
				},
				function () {
					$(this)
						.find('img.card-image')
						.attr('srcset', function (_, currentValue) {
							return 'https://cdn11.bigcommerce.com/s-ygbdkye24d/images/stencil/500x659/products/112/377/brandon-lee-jT5mSPEteVc-unsplash__02860.1629489619.jpg?c=1';
						});
				}
			);
		}
	}

	ariaNotifyNoProducts() {
		const $noProductsMessage = $('[data-no-products-notification]');
		if ($noProductsMessage.length) {
			$noProductsMessage.focus();
		}
	}

	initFacetedSearch() {
		const {
			price_min_evaluation: onMinPriceError,
			price_max_evaluation: onMaxPriceError,
			price_min_not_entered: minPriceNotEntered,
			price_max_not_entered: maxPriceNotEntered,
			price_invalid_value: onInvalidPrice,
		} = this.validationDictionary;
		const $productListingContainer = $('#product-listing-container');
		const $facetedSearchContainer = $('#faceted-search-container');
		const productsPerPage = this.context.categoryProductsPerPage;
		const requestOptions = {
			config: {
				category: {
					shop_by_price: true,
					products: {
						limit: productsPerPage,
					},
				},
			},
			template: {
				productListing: 'category/product-listing',
				sidebar: 'category/sidebar',
			},
			showMore: 'category/show-more',
		};

		this.facetedSearch = new FacetedSearch(
			requestOptions,
			(content) => {
				$productListingContainer.html(content.productListing);
				$facetedSearchContainer.html(content.sidebar);

				$('body').triggerHandler('compareReset');

				$('html, body').animate(
					{
						scrollTop: 0,
					},
					100
				);
			},
			{
				validationErrorMessages: {
					onMinPriceError,
					onMaxPriceError,
					minPriceNotEntered,
					maxPriceNotEntered,
					onInvalidPrice,
				},
			}
		);
	}
}
