(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/api */ "./assets/js/theme/common/utils/api.js");
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime__WEBPACK_IMPORTED_MODULE_6__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint-disable  */









var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context); // Check if client is on special item category

    _this.breadcrumbLastPath = $.trim($('[aria-label="Breadcrumb"] ol li').last().text());
    _this.$overlay = $('[data-cart-item-add] .loadingOverlay');
    return _this;
  }

  var _proto = Category.prototype;

  _proto.isSpecialItemCategory = function isSpecialItemCategory() {
    if (this.breadcrumbLastPath === 'Special Items') return true;
    return false;
  };

  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };

  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;

    if (!$('[data-shop-by-price]').length) return;

    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }

    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };

  _proto.onReady = function onReady() {
    var _this3 = this;

    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();
    this.addAllItemsToCart(this.breadcrumbLastPath);
    this.emptyCart();
    this.getCustomerInfo();
  };

  _proto.getCustomerInfo = function getCustomerInfo() {
    var appClientId = 's3ru4zxc3itiowj35zw95p9zxmi2oa1'; // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //   if (xmlhttp.readyState == 4) {
    //     if (xmlhttp.status == 200) {
    //       console.log('Customer JWT:\n' + xmlhttp.responseText);
    //     } else if (xmlhttp.status == 404) {
    //       alert('Not logged in!');
    //     } else {
    //       alert('Something went wrong');
    //     }
    //   }
    // };
    // xmlhttp.open('GET', '/customer');
    // xmlhttp.send();
    // fetch(`/customer/current.jwt?app_client_id=${clientID}`)
    // fetch(`/api/storefront/customer`)
    //   .then((response) => console.log(response))
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });
    xhr.open('GET', 'https://api.bigcommerce.com/stores/ygbdkye24d/v3/customers');
    xhr.setRequestHeader('x-auth-token', 'f7iife7few0beiv3b1q75qvx93oizcs');
    xhr.send(data);
  };

  _proto.modal = function modal(text, type) {
    var body = $('body');
    var overlay = "\n    <div id=\"message-modal\">\n      <div id=\"modal-content\">\n        <h2>" + text + "</h2>\n        " + (type === 'add' ? "<div id=\"buttons-container\"> <button type=\"submit\" id=\"continue-shopping-btn\" class=\"button button--primary\" style=\"width: 205px\"> Continue shopping </button>\n          <button id=\"go-to-cart-btn\" class=\"button button--secundary\" style=\"width: 205px\"> Go to cart </button>" : "<div id=\"buttons-container\"> <button type=\"submit\" id=\"continue-shopping-btn\" class=\"button button--primary\" style=\"width: 205px\"> Continue shopping </button> </div>") + "\n        </div>\n      </div>\n    </div>";
    $(body).append(overlay);
    $('#message-modal').css({
      background: '#00000092',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'none',
      'z-index': 9999
    }); // $('#message-modal').on('click', function () {
    //   $(this).css('display', 'none');
    //   location.replace(location.pathname);
    // });

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
      transform: 'translate(-50%, -50%)'
    });
    $('#buttons-container').css({
      width: '430px',
      display: 'flex',
      justifyContent: type === 'add' ? 'space-between' : 'center',
      alignItems: 'center'
    });
    $('#continue-shopping-btn').on('click', function (event) {
      event.preventDefault();
      location.replace(location.pathname);
    });
    $('#go-to-cart-btn').on('click', function (event) {
      event.preventDefault();
      location.replace('/cart.php');
    });
    return {
      show: function show() {
        $('#message-modal').css('display', 'block');
      },
      hide: function hide() {
        $('#message-modal').css('display', 'none');
      }
    };
  };

  _proto.getCart = /*#__PURE__*/function () {
    var _getCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var response, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('/api/storefront/carts');

            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();

            case 5:
              data = _context.sent;
              return _context.abrupt("return", data);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getCart() {
      return _getCart.apply(this, arguments);
    }

    return getCart;
  }();

  _proto.isCartEmpty = /*#__PURE__*/function () {
    var _isCartEmpty = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var isCartEmpty;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getCart();

            case 2:
              isCartEmpty = _context2.sent;
              console.log(isCartEmpty);
              return _context2.abrupt("return", isCartEmpty.length ? true : false);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function isCartEmpty() {
      return _isCartEmpty.apply(this, arguments);
    }

    return isCartEmpty;
  }();

  _proto.findProductID = function findProductID() {
    var productsToCart = [];
    var data = {
      lineItems: [],
      locale: 'en'
    };
    $('.productGrid li').each(function () {
      var item = $(this).find('.quickview');
      var itemId = parseInt($(item[0]).attr('data-product-id'));
      data.lineItems.push({
        quantity: 1,
        productId: itemId,
        optionSelections: []
      });
    });
    return data;
  };

  _proto.addAllItemsToCart = /*#__PURE__*/function () {
    var _addAllItemsToCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event) {
      var _this4 = this;

      var isSpecialItemCategory, message, categoryPage, $addBtn;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              isSpecialItemCategory = this.isSpecialItemCategory();
              message = 'your item has been added to the cart successfully.'; // if (isSpecialItemCategory) {

              categoryPage = $('.body');
              categoryPage.prepend("<form id=\"form-action\" >\n\t\t\t\t<input id=\"form-action-addToCart\" data-wait-message=\"adding to cart...\" value=\"Add All To Cart\"  type=\"submit\" class=\"button button--primary add-btn\" />\n                </form>");
              $addBtn = $('.add-btn');
              $addBtn.on('click', /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
                  var addToCartProducts, isCartEmpty, originalBtn, waitingMessage, cart;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          event.preventDefault();
                          addToCartProducts = _this4.findProductID();
                          _context3.next = 4;
                          return _this4.getCart();

                        case 4:
                          isCartEmpty = _context3.sent;
                          isCartEmpty = isCartEmpty.length ? true : false;
                          originalBtn = $addBtn.val();
                          waitingMessage = $addBtn.data('wait-message');

                          if (isCartEmpty) {
                            _context3.next = 13;
                            break;
                          }

                          $addBtn.val(waitingMessage).prop('disabled', true);
                          fetch('/api/storefront/cart', {
                            method: 'POST',
                            // or 'PUT'
                            credentials: 'include',
                            body: JSON.stringify(addToCartProducts)
                          }).then(function (response) {
                            return response.json();
                          }).then(function (data) {
                            $addBtn.val(originalBtn).prop('disabled', false);

                            _this4.modal(message, 'add').show();

                            console.log('Success:', data);
                          }).catch(function (error) {
                            $addBtn.val(originalBtn).prop('disabled', false);
                            console.error('Error:', error);
                          });
                          _context3.next = 17;
                          break;

                        case 13:
                          _context3.next = 15;
                          return _this4.getCart();

                        case 15:
                          cart = _context3.sent;
                          fetch("/api/storefront/cart/" + cart[0].id + "/items", {
                            method: 'POST',
                            // or 'PUT'
                            credentials: 'include',
                            body: JSON.stringify(addToCartProducts)
                          }).then(function (response) {
                            return response.json();
                          }).then(function (data) {
                            $addBtn.val(originalBtn).prop('disabled', false);

                            _this4.modal(message, 'add').show();

                            console.log('Success:', data);
                          }).catch(function (error) {
                            console.error('Error:', error);
                          });

                        case 17:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()); // } //if statement

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function addAllItemsToCart(_x) {
      return _addAllItemsToCart.apply(this, arguments);
    }

    return addAllItemsToCart;
  }();

  _proto.emptyCart = /*#__PURE__*/function () {
    var _emptyCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(event) {
      var _this5 = this;

      var deleteBtnEle, $categoryPage, message, isCartEmpty, $deleteBtn;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deleteBtnEle = "<input id=\"empty-cart\" data-wait-message=\"adding to cart...\" value=\"Empty Cart\"  type=\"submit\" class=\"button button--secondary delete-btn\" />";
              $categoryPage = $('#form-action');
              message = 'Your cart was cleared successfully';
              _context6.next = 5;
              return this.isCartEmpty();

            case 5:
              isCartEmpty = _context6.sent;
              console.log(isCartEmpty);

              if (isCartEmpty) {
                $categoryPage.append(deleteBtnEle);
              }

              $deleteBtn = $('#empty-cart');
              $deleteBtn.on('click', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(event) {
                  var data, settings;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          event.preventDefault();
                          _context5.next = 3;
                          return _this5.getCart();

                        case 3:
                          data = _context5.sent;
                          settings = {
                            async: true,
                            crossDomain: true,
                            url: "/api/storefront/carts/" + data[0].id,
                            method: 'DELETE'
                          };
                          $.ajax({
                            url: "/api/storefront/carts/" + data[0].id,
                            async: true,
                            method: 'DELETE',
                            success: function success(response) {
                              return console.log(response);
                            },
                            complete: function complete() {
                              _this5.modal(message, 'delete').show();
                            }
                          });

                        case 6:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function emptyCart(_x3) {
      return _emptyCart.apply(this, arguments);
    }

    return emptyCart;
  }();

  _proto.changeImageOnHover = function changeImageOnHover() {
    var isSpecialItemCategory = this.isSpecialItemCategory();

    if (isSpecialItemCategory) {
      var $images = $('.card-figure');
      $images.hover(function () {
        $(this).find('img.card-image').attr('srcset', function (_, currentValue) {
          return 'https://cdn11.bigcommerce.com/s-ygbdkye24d/images/stencil/500x659/products/112/376/daniel-tomlinson-fFJqJ_GWxxk-unsplash__96050.1629489615.jpg';
        });
      }, function () {
        $(this).find('img.card-image').attr('srcset', function (_, currentValue) {
          return 'https://cdn11.bigcommerce.com/s-ygbdkye24d/images/stencil/500x659/products/112/377/brandon-lee-jT5mSPEteVc-unsplash__02860.1629489619.jpg?c=1';
        });
      });
    }
  };

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJicmVhZGNydW1iTGFzdFBhdGgiLCIkIiwidHJpbSIsImxhc3QiLCJ0ZXh0IiwiJG92ZXJsYXkiLCJpc1NwZWNpYWxJdGVtQ2F0ZWdvcnkiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uUmVhZHkiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImUiLCJjdXJyZW50VGFyZ2V0IiwibmV4dCIsImNvbXBhcmVQcm9kdWN0cyIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJzZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsImFkZEFsbEl0ZW1zVG9DYXJ0IiwiZW1wdHlDYXJ0IiwiZ2V0Q3VzdG9tZXJJbmZvIiwiYXBwQ2xpZW50SWQiLCJkYXRhIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJ3aXRoQ3JlZGVudGlhbHMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVhZHlTdGF0ZSIsIkRPTkUiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwibW9kYWwiLCJ0eXBlIiwiYm9keSIsIm92ZXJsYXkiLCJhcHBlbmQiLCJjc3MiLCJiYWNrZ3JvdW5kIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0Iiwid2lkdGgiLCJoZWlnaHQiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsInRleHRBbGlnbiIsInBhZGRpbmciLCJ0cmFuc2Zvcm0iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwibG9jYXRpb24iLCJyZXBsYWNlIiwicGF0aG5hbWUiLCJzaG93IiwiaGlkZSIsImdldENhcnQiLCJmZXRjaCIsInJlc3BvbnNlIiwianNvbiIsImlzQ2FydEVtcHR5IiwiZmluZFByb2R1Y3RJRCIsInByb2R1Y3RzVG9DYXJ0IiwibGluZUl0ZW1zIiwibG9jYWxlIiwiZWFjaCIsIml0ZW0iLCJmaW5kIiwiaXRlbUlkIiwicGFyc2VJbnQiLCJwdXNoIiwicXVhbnRpdHkiLCJwcm9kdWN0SWQiLCJvcHRpb25TZWxlY3Rpb25zIiwibWVzc2FnZSIsImNhdGVnb3J5UGFnZSIsInByZXBlbmQiLCIkYWRkQnRuIiwiYWRkVG9DYXJ0UHJvZHVjdHMiLCJvcmlnaW5hbEJ0biIsInZhbCIsIndhaXRpbmdNZXNzYWdlIiwicHJvcCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJjYXRjaCIsImVycm9yIiwiY2FydCIsImlkIiwiZGVsZXRlQnRuRWxlIiwiJGNhdGVnb3J5UGFnZSIsIiRkZWxldGVCdG4iLCJzZXR0aW5ncyIsImFzeW5jIiwiY3Jvc3NEb21haW4iLCJ1cmwiLCJhamF4Iiwic3VjY2VzcyIsImNvbXBsZXRlIiwiY2hhbmdlSW1hZ2VPbkhvdmVyIiwiJGltYWdlcyIsImhvdmVyIiwiXyIsImN1cnJlbnRWYWx1ZSIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxROzs7QUFDbkIsb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsb0NBQU1BLE9BQU47QUFDQSxVQUFLQyxv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QUFPQSxVQUFQO0FBQ0g7QUFDSjtBQUNKLENBUEQ7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLElBQU1qSywyQkFBMkIsR0FBRyxTQUE5QkEsMkJBQThCLENBQUNGLE9BQUQsRUFBYTtBQUFBLE1BQzVDeUssd0JBRDRDLEdBQ29EekssT0FEcEQsQ0FDNUN5Syx3QkFENEM7QUFBQSxNQUNsQkMsZ0NBRGtCLEdBQ29EMUssT0FEcEQsQ0FDbEIwSyxnQ0FEa0I7QUFBQSxNQUNnQkMsK0JBRGhCLEdBQ29EM0ssT0FEcEQsQ0FDZ0IySywrQkFEaEI7QUFFcEQsTUFBTUMsZ0JBQWdCLEdBQUdOLHNCQUFzQixDQUFDRyx3QkFBRCxFQUEyQkMsZ0NBQTNCLEVBQTZEQywrQkFBN0QsQ0FBL0M7QUFDQSxNQUFNRSxhQUFhLEdBQUdULE1BQU0sQ0FBQ1UsTUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1gsWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1jLGVBQWUsR0FBR1gsTUFBTSxDQUFDQyxJQUFQLENBQVlPLGdCQUFnQixDQUFDWCxZQUFELENBQTVCLEVBQTRDZSxHQUE1QyxDQUFnRCxVQUFBQyxHQUFHO0FBQUEsV0FBSUEsR0FBRyxDQUFDQyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQUo7QUFBQSxHQUFuRCxDQUF4QjtBQUVBLFNBQU9KLGVBQWUsQ0FBQ0ssTUFBaEIsQ0FBdUIsVUFBQ0MsR0FBRCxFQUFNSixHQUFOLEVBQVdWLENBQVgsRUFBaUI7QUFDM0NjLE9BQUcsQ0FBQ0osR0FBRCxDQUFILEdBQVdKLGFBQWEsQ0FBQ04sQ0FBRCxDQUF4QjtBQUNBLFdBQU9jLEdBQVA7QUFDSCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICAqL1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB7IG5vcm1hbGl6ZUZvcm1EYXRhIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvYXBpJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAncmVnZW5lcmF0b3ItcnVudGltZSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIHN1cGVyKGNvbnRleHQpO1xuICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgLy8gQ2hlY2sgaWYgY2xpZW50IGlzIG9uIHNwZWNpYWwgaXRlbSBjYXRlZ29yeVxuICAgIHRoaXMuYnJlYWRjcnVtYkxhc3RQYXRoID0gJC50cmltKCQoJ1thcmlhLWxhYmVsPVwiQnJlYWRjcnVtYlwiXSBvbCBsaScpLmxhc3QoKS50ZXh0KCkpO1xuXG4gICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnQtaXRlbS1hZGRdIC5sb2FkaW5nT3ZlcmxheScpO1xuICB9XG5cbiAgaXNTcGVjaWFsSXRlbUNhdGVnb3J5KCkge1xuICAgIGlmICh0aGlzLmJyZWFkY3J1bWJMYXN0UGF0aCA9PT0gJ1NwZWNpYWwgSXRlbXMnKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgJGVsZW1lbnQuYXR0cih7XG4gICAgICByb2xlOiByb2xlVHlwZSxcbiAgICAgICdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcbiAgICB9KTtcbiAgfVxuXG4gIG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG4gICAgaWYgKCEkKCdbZGF0YS1zaG9wLWJ5LXByaWNlXScpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpO1xuICAgIH1cblxuICAgICQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksICdzdGF0dXMnLCAnYXNzZXJ0aXZlJyksXG4gICAgKTtcbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLCAnc3RhdHVzJywgJ3BvbGl0ZScpLFxuICAgICk7XG5cbiAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKSxcbiAgICApO1xuXG4gICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICAgIHRoaXMuYWRkQWxsSXRlbXNUb0NhcnQodGhpcy5icmVhZGNydW1iTGFzdFBhdGgpO1xuICAgIHRoaXMuZW1wdHlDYXJ0KCk7XG4gICAgdGhpcy5nZXRDdXN0b21lckluZm8oKTtcbiAgfVxuXG4gIGdldEN1c3RvbWVySW5mbygpIHtcbiAgICBsZXQgYXBwQ2xpZW50SWQgPSAnczNydTR6eGMzaXRpb3dqMzV6dzk1cDl6eG1pMm9hMSc7XG4gICAgLy8gdmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAvLyB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgIC8vICAgICBpZiAoeG1saHR0cC5zdGF0dXMgPT0gMjAwKSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coJ0N1c3RvbWVyIEpXVDpcXG4nICsgeG1saHR0cC5yZXNwb25zZVRleHQpO1xuICAgIC8vICAgICB9IGVsc2UgaWYgKHhtbGh0dHAuc3RhdHVzID09IDQwNCkge1xuICAgIC8vICAgICAgIGFsZXJ0KCdOb3QgbG9nZ2VkIGluIScpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfTtcbiAgICAvLyB4bWxodHRwLm9wZW4oJ0dFVCcsICcvY3VzdG9tZXInKTtcbiAgICAvLyB4bWxodHRwLnNlbmQoKTtcblxuICAgIC8vIGZldGNoKGAvY3VzdG9tZXIvY3VycmVudC5qd3Q/YXBwX2NsaWVudF9pZD0ke2NsaWVudElEfWApXG4gICAgLy8gZmV0Y2goYC9hcGkvc3RvcmVmcm9udC9jdXN0b21lcmApXG4gICAgLy8gICAudGhlbigocmVzcG9uc2UpID0+IGNvbnNvbGUubG9nKHJlc3BvbnNlKSlcbiAgICAvLyAgIC50aGVuKChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhKSlcbiAgICAvLyAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG5cbiAgICB2YXIgZGF0YSA9IG51bGw7XG5cbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJpZ2NvbW1lcmNlLmNvbS9zdG9yZXMveWdiZGt5ZTI0ZC92My9jdXN0b21lcnMnKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcigneC1hdXRoLXRva2VuJywgJ2Y3aWlmZTdmZXcwYmVpdjNiMXE3NXF2eDkzb2l6Y3MnKTtcblxuICAgIHhoci5zZW5kKGRhdGEpO1xuICB9XG5cbiAgbW9kYWwodGV4dCwgdHlwZSkge1xuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGBcbiAgICA8ZGl2IGlkPVwibWVzc2FnZS1tb2RhbFwiPlxuICAgICAgPGRpdiBpZD1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgPGgyPiR7dGV4dH08L2gyPlxuICAgICAgICAke1xuICAgICAgICAgIHR5cGUgPT09ICdhZGQnXG4gICAgICAgICAgICA/IGA8ZGl2IGlkPVwiYnV0dG9ucy1jb250YWluZXJcIj4gPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJjb250aW51ZS1zaG9wcGluZy1idG5cIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXByaW1hcnlcIiBzdHlsZT1cIndpZHRoOiAyMDVweFwiPiBDb250aW51ZSBzaG9wcGluZyA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGlkPVwiZ28tdG8tY2FydC1idG5cIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXNlY3VuZGFyeVwiIHN0eWxlPVwid2lkdGg6IDIwNXB4XCI+IEdvIHRvIGNhcnQgPC9idXR0b24+YFxuICAgICAgICAgICAgOiBgPGRpdiBpZD1cImJ1dHRvbnMtY29udGFpbmVyXCI+IDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwiY29udGludWUtc2hvcHBpbmctYnRuXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5XCIgc3R5bGU9XCJ3aWR0aDogMjA1cHhcIj4gQ29udGludWUgc2hvcHBpbmcgPC9idXR0b24+IDwvZGl2PmBcbiAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG5cbiAgICAkKGJvZHkpLmFwcGVuZChvdmVybGF5KTtcblxuICAgICQoJyNtZXNzYWdlLW1vZGFsJykuY3NzKHtcbiAgICAgIGJhY2tncm91bmQ6ICcjMDAwMDAwOTInLFxuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgJ3otaW5kZXgnOiA5OTk5LFxuICAgIH0pO1xuXG4gICAgLy8gJCgnI21lc3NhZ2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgLy8gICBsb2NhdGlvbi5yZXBsYWNlKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAvLyB9KTtcblxuICAgICQoJyNtb2RhbC1jb250ZW50JykuY3NzKHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgcGFkZGluZzogJzIwcHgnLFxuICAgICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6ICc1MCUnLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB3aWR0aDogJzQwcmVtJyxcbiAgICAgIGhlaWdodDogJzMwcmVtJyxcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG4gICAgfSk7XG5cbiAgICAkKCcjYnV0dG9ucy1jb250YWluZXInKS5jc3Moe1xuICAgICAgd2lkdGg6ICc0MzBweCcsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBqdXN0aWZ5Q29udGVudDogdHlwZSA9PT0gJ2FkZCcgPyAnc3BhY2UtYmV0d2VlbicgOiAnY2VudGVyJyxcbiAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIH0pO1xuXG4gICAgJCgnI2NvbnRpbnVlLXNob3BwaW5nLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxvY2F0aW9uLnJlcGxhY2UobG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH0pO1xuICAgICQoJyNnby10by1jYXJ0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxvY2F0aW9uLnJlcGxhY2UoJy9jYXJ0LnBocCcpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3coKSB7XG4gICAgICAgICQoJyNtZXNzYWdlLW1vZGFsJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICB9LFxuICAgICAgaGlkZSgpIHtcbiAgICAgICAgJCgnI21lc3NhZ2UtbW9kYWwnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0Q2FydCgpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMnKTtcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vIGRhdGEgPSBkYXRhLmxlbmd0aCA/IGZhbHNlIDogdHJ1ZTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGlzQ2FydEVtcHR5KCkge1xuICAgIGNvbnN0IGlzQ2FydEVtcHR5ID0gYXdhaXQgdGhpcy5nZXRDYXJ0KCk7XG4gICAgY29uc29sZS5sb2coaXNDYXJ0RW1wdHkpO1xuICAgIHJldHVybiBpc0NhcnRFbXB0eS5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBmaW5kUHJvZHVjdElEKCkge1xuICAgIGNvbnN0IHByb2R1Y3RzVG9DYXJ0ID0gW107XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxpbmVJdGVtczogW10sXG4gICAgICBsb2NhbGU6ICdlbicsXG4gICAgfTtcblxuICAgICQoJy5wcm9kdWN0R3JpZCBsaScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgaXRlbSA9ICQodGhpcykuZmluZCgnLnF1aWNrdmlldycpO1xuICAgICAgY29uc3QgaXRlbUlkID0gcGFyc2VJbnQoJChpdGVtWzBdKS5hdHRyKCdkYXRhLXByb2R1Y3QtaWQnKSk7XG5cbiAgICAgIGRhdGEubGluZUl0ZW1zLnB1c2goe1xuICAgICAgICBxdWFudGl0eTogMSxcbiAgICAgICAgcHJvZHVjdElkOiBpdGVtSWQsXG4gICAgICAgIG9wdGlvblNlbGVjdGlvbnM6IFtdLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGFkZEFsbEl0ZW1zVG9DYXJ0KGV2ZW50KSB7XG4gICAgY29uc3QgaXNTcGVjaWFsSXRlbUNhdGVnb3J5ID0gdGhpcy5pc1NwZWNpYWxJdGVtQ2F0ZWdvcnkoKTtcbiAgICBjb25zdCBtZXNzYWdlID0gJ3lvdXIgaXRlbSBoYXMgYmVlbiBhZGRlZCB0byB0aGUgY2FydCBzdWNjZXNzZnVsbHkuJztcbiAgICAvLyBpZiAoaXNTcGVjaWFsSXRlbUNhdGVnb3J5KSB7XG5cbiAgICBjb25zdCBjYXRlZ29yeVBhZ2UgPSAkKCcuYm9keScpO1xuICAgIGNhdGVnb3J5UGFnZS5wcmVwZW5kKGA8Zm9ybSBpZD1cImZvcm0tYWN0aW9uXCIgPlxuXHRcdFx0XHQ8aW5wdXQgaWQ9XCJmb3JtLWFjdGlvbi1hZGRUb0NhcnRcIiBkYXRhLXdhaXQtbWVzc2FnZT1cImFkZGluZyB0byBjYXJ0Li4uXCIgdmFsdWU9XCJBZGQgQWxsIFRvIENhcnRcIiAgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcHJpbWFyeSBhZGQtYnRuXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+YCk7XG5cbiAgICBjb25zdCAkYWRkQnRuID0gJCgnLmFkZC1idG4nKTtcbiAgICAkYWRkQnRuLm9uKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGFkZFRvQ2FydFByb2R1Y3RzID0gdGhpcy5maW5kUHJvZHVjdElEKCk7XG5cbiAgICAgIGxldCBpc0NhcnRFbXB0eSA9IGF3YWl0IHRoaXMuZ2V0Q2FydCgpO1xuICAgICAgaXNDYXJ0RW1wdHkgPSBpc0NhcnRFbXB0eS5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gICAgICBjb25zdCBvcmlnaW5hbEJ0biA9ICRhZGRCdG4udmFsKCk7XG4gICAgICBjb25zdCB3YWl0aW5nTWVzc2FnZSA9ICRhZGRCdG4uZGF0YSgnd2FpdC1tZXNzYWdlJyk7XG5cbiAgICAgIGlmICghaXNDYXJ0RW1wdHkpIHtcbiAgICAgICAgJGFkZEJ0bi52YWwod2FpdGluZ01lc3NhZ2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydCcsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgLy8gb3IgJ1BVVCdcbiAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGFkZFRvQ2FydFByb2R1Y3RzKSxcbiAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgJGFkZEJ0bi52YWwob3JpZ2luYWxCdG4pLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbChtZXNzYWdlLCAnYWRkJykuc2hvdygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3M6JywgZGF0YSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAkYWRkQnRuLnZhbChvcmlnaW5hbEJ0bikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjYXJ0ID0gYXdhaXQgdGhpcy5nZXRDYXJ0KCk7XG4gICAgICAgIGZldGNoKGAvYXBpL3N0b3JlZnJvbnQvY2FydC8ke2NhcnRbMF0uaWR9L2l0ZW1zYCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLCAvLyBvciAnUFVUJ1xuICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYWRkVG9DYXJ0UHJvZHVjdHMpLFxuICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAkYWRkQnRuLnZhbChvcmlnaW5hbEJ0bikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsKG1lc3NhZ2UsICdhZGQnKS5zaG93KCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWNjZXNzOicsIGRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gfSAvL2lmIHN0YXRlbWVudFxuICB9XG5cbiAgYXN5bmMgZW1wdHlDYXJ0KGV2ZW50KSB7XG4gICAgY29uc3QgZGVsZXRlQnRuRWxlID0gYDxpbnB1dCBpZD1cImVtcHR5LWNhcnRcIiBkYXRhLXdhaXQtbWVzc2FnZT1cImFkZGluZyB0byBjYXJ0Li4uXCIgdmFsdWU9XCJFbXB0eSBDYXJ0XCIgIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXNlY29uZGFyeSBkZWxldGUtYnRuXCIgLz5gO1xuICAgIGNvbnN0ICRjYXRlZ29yeVBhZ2UgPSAkKCcjZm9ybS1hY3Rpb24nKTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSAnWW91ciBjYXJ0IHdhcyBjbGVhcmVkIHN1Y2Nlc3NmdWxseSc7XG5cbiAgICBsZXQgaXNDYXJ0RW1wdHkgPSBhd2FpdCB0aGlzLmlzQ2FydEVtcHR5KCk7XG4gICAgY29uc29sZS5sb2coaXNDYXJ0RW1wdHkpO1xuXG4gICAgaWYgKGlzQ2FydEVtcHR5KSB7XG4gICAgICAkY2F0ZWdvcnlQYWdlLmFwcGVuZChkZWxldGVCdG5FbGUpO1xuICAgIH1cblxuICAgIGNvbnN0ICRkZWxldGVCdG4gPSAkKCcjZW1wdHktY2FydCcpO1xuXG4gICAgJGRlbGV0ZUJ0bi5vbignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMuZ2V0Q2FydCgpO1xuXG4gICAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgICAgdXJsOiBgL2FwaS9zdG9yZWZyb250L2NhcnRzLyR7ZGF0YVswXS5pZH1gLFxuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgfTtcblxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgL2FwaS9zdG9yZWZyb250L2NhcnRzLyR7ZGF0YVswXS5pZH1gLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgc3VjY2VzczogKHJlc3BvbnNlKSA9PiBjb25zb2xlLmxvZyhyZXNwb25zZSksXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tb2RhbChtZXNzYWdlLCAnZGVsZXRlJykuc2hvdygpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VJbWFnZU9uSG92ZXIoKSB7XG4gICAgY29uc3QgaXNTcGVjaWFsSXRlbUNhdGVnb3J5ID0gdGhpcy5pc1NwZWNpYWxJdGVtQ2F0ZWdvcnkoKTtcbiAgICBpZiAoaXNTcGVjaWFsSXRlbUNhdGVnb3J5KSB7XG4gICAgICBjb25zdCAkaW1hZ2VzID0gJCgnLmNhcmQtZmlndXJlJyk7XG4gICAgICAkaW1hZ2VzLmhvdmVyKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoJ2ltZy5jYXJkLWltYWdlJylcbiAgICAgICAgICAgIC5hdHRyKFxuICAgICAgICAgICAgICAnc3Jjc2V0JyxcbiAgICAgICAgICAgICAgKF8sIGN1cnJlbnRWYWx1ZSkgPT5cbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9jZG4xMS5iaWdjb21tZXJjZS5jb20vcy15Z2Jka3llMjRkL2ltYWdlcy9zdGVuY2lsLzUwMHg2NTkvcHJvZHVjdHMvMTEyLzM3Ni9kYW5pZWwtdG9tbGluc29uLWZGSnFKX0dXeHhrLXVuc3BsYXNoX185NjA1MC4xNjI5NDg5NjE1LmpwZycsXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoJ2ltZy5jYXJkLWltYWdlJylcbiAgICAgICAgICAgIC5hdHRyKFxuICAgICAgICAgICAgICAnc3Jjc2V0JyxcbiAgICAgICAgICAgICAgKF8sIGN1cnJlbnRWYWx1ZSkgPT5cbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9jZG4xMS5iaWdjb21tZXJjZS5jb20vcy15Z2Jka3llMjRkL2ltYWdlcy9zdGVuY2lsLzUwMHg2NTkvcHJvZHVjdHMvMTEyLzM3Ny9icmFuZG9uLWxlZS1qVDVtU1BFdGVWYy11bnNwbGFzaF9fMDI4NjAuMTYyOTQ4OTYxOS5qcGc/Yz0xJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcbiAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICBjb25maWc6IHtcbiAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICB9LFxuICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgIH07XG5cbiAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcbiAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMCxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9