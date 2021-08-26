## BigCommerce assingment

I made all my codes in the category JS class.

I created two methods which take care of the two requested task along with others methods helper
that are used in the two methods.

The addAllToCart method first check if is in the Special Items category, then create and append the
button to the to of category body. The findProductID function get every product in the category page
and search for the product ID for each one and return the object to add it the cart.

When the Add All To Cart is clicked it sends a POST request to the storefront cart api, if the
request is successfull a modal is showned taht let the user know the product has been added to the
cart, and refresh the cart count.

After products are added to the cart, the method Delete All is added, that clears the cart. when the
button is clicked, a DELETE request is sent to the storefornt carts api. After the cart is cleared a
modal is shown to let the user know that it was cleared.
