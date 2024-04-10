
document.querySelectorAll('.cart-item').forEach(item => {
    const incrementButton = item.querySelector('.increment-button');
    const decrementButton = item.querySelector('.decrement-button');
    const quantityDisplay = item.querySelector('.item-quantity');
    
    let quantity = parseInt(quantityDisplay.textContent);

    incrementButton.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateTotal();
    });

    decrementButton.addEventListener('click', () => {
        if (quantity > 0) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updateTotal();
        }
    });
});
function updateTotal() {
    let totalPrice = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('.item-price').textContent.slice(1)); 
        const quantity = parseInt(item.querySelector('.item-quantity').textContent);
        totalPrice += price * quantity;
    });
    document.querySelector('.cart-total').textContent = 'Total: $' + totalPrice.toFixed(2);
}
function dropdown(){
    var menu = document.querySelector(".second-ul")
     menu.classList.toggle("toggle")
}
document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cart-count');
  const selectedProductImage = document.getElementById('selected-product');
  const selectedProductInfo = document.getElementById('selected-product-info');
  const selectedProductsList = document.getElementById('selected-products-list');

  let cartItemsCount = 0;
  const selectedProducts = [];

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = this.parentNode;
      const productId = product.getAttribute('data-id');

      if (!selectedProducts.includes(productId)) {
        selectedProducts.push(productId);
        cartItemsCount++;
        updateCartCount(cartItemsCount);
        updateSelectedProductList(product);
      }
    });
  });

  selectedProductImage.addEventListener('click', function() {
    toggleSelectedProductDropdown();
  });

  function updateCartCount(count) {
    cartCount.textContent = count;
  }

  function updateSelectedProductList(product) {
    const productName = product.querySelector('p').textContent;
    const productImageSrc = product.querySelector('img').src;

    const listItem = document.createElement('li');
    listItem.dataset.id = product.getAttribute('data-id');
    listItem.innerHTML = `
      <div class="product-info">
        <img src="${productImageSrc}" alt="${productName}">
        <span>${productName}</span>
      </div>
      <img class="delete-icon" src="icon-delete.svg" alt="Delete">
    `;
    selectedProductsList.appendChild(listItem);

    
    const deleteIcon = listItem.querySelector('.delete-icon');
    deleteIcon.addEventListener('click', function() {
      const productId = listItem.getAttribute('data-id');
      const index = selectedProducts.indexOf(productId);
      if (index !== -1) {
        selectedProducts.splice(index, 1);
        cartItemsCount--;
        updateCartCount(cartItemsCount);
        listItem.remove();
      }
    });
  }

  function toggleSelectedProductDropdown() {
    if (selectedProductInfo.style.display === 'block') {
      selectedProductInfo.style.display = 'none';
    } else {
      selectedProductInfo.style.display = 'block';
      displaySelectedProducts();
    }
  }

  function displaySelectedProducts() {
    
    selectedProductsList.innerHTML = '';

    
    selectedProducts.forEach(productId => {
      const product = document.querySelector(`[data-id="${productId}"]`);
      updateSelectedProductList(product);
    });
  }
});