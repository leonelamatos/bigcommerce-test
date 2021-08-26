/* eslint-disable  */
import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import { normalizeFormData } from './common/utils/api';
import { async } from 'regenerator-runtime';
import utils from '@bigcommerce/stencil-utils';

export default class Category extends CatalogPage {
  constructor(context) {
    super(context);
    this.validationDictionary = createTranslationDictionary(context);
    // Check if client is on special item category
    this.breadcrumbLastPath = $.trim($('[aria-label="Breadcrumb"] ol li').last().text());

    this.$overlay = $('[data-cart-item-add] .loadingOverlay');
  }

  isSpecialItemCategory() {
    if (this.breadcrumbLastPath === 'Special Items') return true;
    return false;
  }

  setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus,
    });
  }

  makeShopByPriceFilterAccessible() {
    if (!$('[data-shop-by-price]').length) return;

    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }

    $('a.navList-action').on('click', () =>
      this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'),
    );
  }

  onReady() {
    this.arrangeFocusOnSortBy();

    $('[data-button-type="add-cart"]').on('click', (e) =>
      this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'),
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
      this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'),
    );

    this.ariaNotifyNoProducts();
    this.addAllItemsToCart(this.breadcrumbLastPath);
    this.emptyCart();
  }

  modal(text, type) {
    // get the body element on the page
    const body = $('body');
    // modal for displaying when adding items to cart and deleting the cart
    const overlay = `
    <div id="message-modal">
      <div id="modal-content">
        <h2>${text}</h2>
        ${
          type === 'add'
            ? `<div id="buttons-container"> <button type="submit" id="continue-shopping-btn" class="button button--primary" style="width: 205px"> Continue shopping </button>
          <button id="go-to-cart-btn" class="button button--secundary" style="width: 205px"> Go to cart </button>`
            : `<div id="buttons-container"> <button type="submit" id="continue-shopping-btn" class="button button--primary" style="width: 205px"> Continue shopping </button> </div>`
        }
        </div>
      </div>
    </div>`;
    // append the modal to the page's body element.
    $(body).append(overlay);

    // styles for the modal element

    $('#message-modal').css({
      background: '#00000092',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'none',
      'z-index': 9999,
    });

    $('#modal-content').css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      background: '#fff',
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '40rem',
      height: '30rem',
      transform: 'translate(-50%, -50%)',
    });

    $('#buttons-container').css({
      width: '430px',
      display: 'flex',
      justifyContent: type === 'add' ? 'space-between' : 'center',
      alignItems: 'center',
    });

    $('#continue-shopping-btn').on('click', function (event) {
      event.preventDefault();
      location.replace(location.pathname);
    });
    $('#go-to-cart-btn').on('click', function (event) {
      event.preventDefault();
      location.replace('/cart.php');
    });

    // methods to show and hide the modal.
    return {
      show() {
        $('#message-modal').css('display', 'block');
      },
      hide() {
        $('#message-modal').css('display', 'none');
      },
    };
  }

  // get the cart object.
  async getCart() {
    const response = await fetch('/api/storefront/carts');
    let data = await response.json();
    return data;
  }

  // function to check if the cart is empty.
  async isCartEmpty() {
    const isCartEmpty = await this.getCart();
    console.log(isCartEmpty);
    return isCartEmpty.length ? true : false;
  }

  // get the product id of the products in the categories.
  findProductID() {
    //  object data for the cart
    const data = {
      lineItems: [],
      locale: 'en',
    };

    // loop through every item in the page and add them to the lineItems array.
    $('.productGrid li').each(function () {
      const item = $(this).find('.quickview');
      const itemId = parseInt($(item[0]).attr('data-product-id'));

      data.lineItems.push({
        quantity: 1,
        productId: itemId,
        optionSelections: [],
      });
    });

    return data;
  }

  // add items to the cart.
  async addAllItemsToCart(event) {
    // check if is the special item category
    const isSpecialItemCategory = this.isSpecialItemCategory();
    // message to pass to the modal element after item is added to cart.
    const message = 'your item has been added to the cart successfully.';

    if (isSpecialItemCategory) {
      const categoryPage = $('.body');

      // append the button to the page
      categoryPage.prepend(`
      <form id="form-action" >
				<input id="form-action-addToCart" data-wait-message="adding to cart..." value="Add All To Cart"  type="submit" class="button button--primary add-btn" />
      </form>`);

      // grab the add all items button
      const $addBtn = $('.add-btn');

      // set event listener to the button
      $addBtn.on('click', async (event) => {
        event.preventDefault();
        // get products to add to the cart.
        const addToCartProducts = this.findProductID();

        // get the cart object.
        let isCartEmpty = await this.getCart();
        // check if cart is empty.
        isCartEmpty = isCartEmpty.length ? true : false;
        // grab the add button text.
        const originalBtn = $addBtn.val();
        // set message for the button to display when submitting.
        const waitingMessage = $addBtn.data('wait-message');

        // if cart is empty create cart
        if (!isCartEmpty) {
          $addBtn.val(waitingMessage).prop('disabled', true);
          fetch('/api/storefront/cart', {
            method: 'POST', // or 'PUT'
            credentials: 'include',
            body: JSON.stringify(addToCartProducts),
          })
            .then((response) => response.json())
            .then((data) => {
              $addBtn.val(originalBtn).prop('disabled', false);
              // show modal when products are added to the cart.
              this.modal(message, 'add').show();
              console.log('Success:', data);
            })
            .catch((error) => {
              $addBtn.val(originalBtn).prop('disabled', false);
              console.error('Error:', error);
            });
          // if cart is not empty, get cart id and add products to cart.
        } else {
          let cart = await this.getCart();
          fetch(`/api/storefront/cart/${cart[0].id}/items`, {
            method: 'POST', // or 'PUT'
            credentials: 'include',
            body: JSON.stringify(addToCartProducts),
          })
            .then((response) => response.json())
            .then((data) => {
              $addBtn.val(originalBtn).prop('disabled', false);
              // show modal when products are added to the cart.
              this.modal(message, 'add').show();
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      });
    } //if statement
  }

  // method to add delete button if cart is not empty.
  async emptyCart(event) {
    const deleteBtnEle = `
    <input id="empty-cart" data-wait-message="adding to cart..." value="Empty Cart"  type="submit" class="button button--secondary delete-btn" />`;
    // get container where add all button element is located.
    const $categoryPage = $('#form-action');

    // message for the modal after clearing the cart.
    const message = 'Your cart was cleared successfully';

    // check if cart is empty.
    let isCartEmpty = await this.isCartEmpty();

    // if cart is not empty add the button.
    if (isCartEmpty) {
      $categoryPage.append(deleteBtnEle);
    }
    // grab the delete button
    const $deleteBtn = $('#empty-cart');

    // set event listerner for the delete button.
    $deleteBtn.on('click', async (event) => {
      event.preventDefault();
      // get the cart object
      let data = await this.getCart();

      // settings for the ajax request
      var settings = {
        url: `/api/storefront/carts/${data[0].id}`,
        async: true,
        method: 'DELETE',
        success: (response) => console.log(response),
        complete: () => {
          this.modal(message, 'delete').show();
        },
      };

      $.ajax(settings);
    });
  }

  // method to change the image on hover.
  changeImageOnHover() {
    // check if is in the special item category.
    const isSpecialItemCategory = this.isSpecialItemCategory();

    // if is onn the special category change the image on hover.
    if (isSpecialItemCategory) {
      const $images = $('.card-figure');
      $images.hover(
        function () {
          $(this)
            .find('img.card-image')
            .attr(
              'srcset',
              (_, currentValue) =>
                'https://cdn11.bigcommerce.com/s-ygbdkye24d/images/stencil/500x659/products/112/376/daniel-tomlinson-fFJqJ_GWxxk-unsplash__96050.1629489615.jpg',
            );
        },
        function () {
          $(this)
            .find('img.card-image')
            .attr(
              'srcset',
              (_, currentValue) =>
                'https://cdn11.bigcommerce.com/s-ygbdkye24d/images/stencil/500x659/products/112/377/brandon-lee-jT5mSPEteVc-unsplash__02860.1629489619.jpg?c=1',
            );
        },
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
          100,
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
      },
    );
  }
}
