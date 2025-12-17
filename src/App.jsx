import { useState, useEffect } from 'react'
import './App.css'

// Product catalog with tech items and their details
const availableProducts = [
  { 
    productId: 1, 
    productName: 'MacBook Pro', 
    priceInRupees: 82999, 
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop', 
    productDescription: 'Powerful laptop with M3 chip, 16GB RAM, 512GB SSD. Perfect for professionals and creators.' 
  },
  { 
    productId: 2, 
    productName: 'iPhone 15', 
    priceInRupees: 58999, 
    productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop', 
    productDescription: 'Latest iPhone with A17 Pro chip, 128GB storage, advanced camera system, and USB-C.' 
  },
  { 
    productId: 3, 
    productName: 'AirPods Pro', 
    priceInRupees: 16999, 
    productImage: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop', 
    productDescription: 'Premium wireless earbuds with active noise cancellation and spatial audio.' 
  },
  { 
    productId: 4, 
    productName: 'Apple Watch', 
    priceInRupees: 24999, 
    productImage: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop', 
    productDescription: 'Smart watch with health monitoring, GPS, and cellular connectivity.' 
  },
  { 
    productId: 5, 
    productName: 'iPad Air', 
    priceInRupees: 45999, 
    productImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop', 
    productDescription: 'Versatile tablet with M2 chip, 10.9-inch display, perfect for work and entertainment.' 
  },
  { 
    productId: 6, 
    productName: 'Samsung TV', 
    priceInRupees: 35999, 
    productImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', 
    productDescription: '55-inch 4K Smart TV with HDR, built-in streaming apps, and voice control.' 
  }
]





// Individual product detail page component
function ProductDetailPage({ navigateToPage, selectedProductId, addItemToCart }) {
  // Find the specific product from our catalog
  const currentProduct = availableProducts.find(item => item.productId === parseInt(selectedProductId))
  
  // Show error if product doesn't exist
  if (!currentProduct) {
    return <div className="error-message">Sorry, this product was not found!</div>
  }

  return (
    <div className="product-page">
      {/* Navigation header with store name and menu buttons */}
      <header className="header">
        <h1 onClick={() => navigateToPage('products')}>🛍️ TechStore</h1>
        <div className="header-buttons">
          <button onClick={() => navigateToPage('home')}>Home</button>
          <button onClick={() => navigateToPage('products')}>Products</button>
          <button onClick={() => navigateToPage('cart')}>Cart</button>
        </div>
      </header>
      
      {/* Product details section with image and information */}
      <div className="product-detail">
        <div className="product-image">
          <img src={currentProduct.productImage} alt={currentProduct.productName} />
        </div>
        <div className="product-info">
          <h2>{currentProduct.productName}</h2>
          <p className="price">₹{currentProduct.priceInRupees.toLocaleString()}</p>
          <p className="description">{currentProduct.productDescription}</p>
          <button 
            onClick={() => addItemToCart(currentProduct)} 
            className="add-to-cart-btn"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// Main products listing page component
function ProductCatalogPage({ navigateToPage, shoppingCart, addItemToCart }) {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter products based on user's search input
  const searchResults = availableProducts.filter(item => 
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Navigate to individual product page
  const viewProductDetails = (productId) => {
    navigateToPage('product', productId)
  }

  return (
    <div className="products-page">
      {/* Header with search and navigation */}
      <header className="header">
        <h1>🛍️ TechStore</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
        </div>
        <div className="header-buttons">
          <button onClick={() => navigateToPage('home')}>Home</button>
          <button onClick={() => navigateToPage('products')}>Products</button>
          <button onClick={() => navigateToPage('cart')}>Cart ({shoppingCart.length})</button>
        </div>
      </header>
      
      {/* Grid of product cards */}
      <div className="products-grid">
        {searchResults.map(item => (
          <div key={item.productId} className="product-card">
            <img 
              src={item.productImage} 
              alt={item.productName} 
              onClick={() => viewProductDetails(item.productId)} 
            />
            <h3 onClick={() => viewProductDetails(item.productId)}>
              {item.productName}
            </h3>
            <p>₹{item.priceInRupees.toLocaleString()}</p>
            <button onClick={() => addItemToCart(item)}>
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Shopping cart page component
function ShoppingCartPage({ navigateToPage, shoppingCart, removeItemFromCart }) {
  // Calculate total price of all items in cart
  const calculateTotalPrice = () => {
    return shoppingCart.reduce((totalAmount, cartItem) => {
      return totalAmount + (cartItem.priceInRupees * cartItem.itemQuantity)
    }, 0)
  }

  const totalCartValue = calculateTotalPrice()
  const isCartEmpty = shoppingCart.length === 0

  return (
    <div className="cart-page">
      {/* Header with navigation */}
      <header className="header">
        <h1 onClick={() => navigateToPage('products')}>🛍️ TechStore</h1>
        <div className="header-buttons">
          <button onClick={() => navigateToPage('home')}>Home</button>
          <button onClick={() => navigateToPage('products')}>Products</button>
          <button onClick={() => navigateToPage('cart')}>Cart ({shoppingCart.length})</button>
        </div>
      </header>
      
      {/* Cart content area */}
      <div className="cart-content">
        <h2>Your Shopping Cart</h2>
        
        {isCartEmpty ? (
          <p className="empty-cart-message">Your cart is currently empty. Start shopping to add items!</p>
        ) : (
          <>
            {/* List of cart items */}
            <div className="cart-items">
              {shoppingCart.map(cartItem => (
                <div key={cartItem.productId} className="cart-item">
                  <img src={cartItem.productImage} alt={cartItem.productName} />
                  <div className="item-details">
                    <h4>{cartItem.productName}</h4>
                    <p>Quantity: {cartItem.itemQuantity}</p>
                    <p>Subtotal: ₹{(cartItem.priceInRupees * cartItem.itemQuantity).toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => removeItemFromCart(cartItem.productId)}
                    className="remove-item-btn"
                  >
                    Remove Item
                  </button>
                </div>
              ))}
            </div>
            
            {/* Order summary sidebar */}
            <div className="cart-sidebar">
              <div className="cart-total">
                <h3>Order Total: ₹{totalCartValue.toLocaleString()}</h3>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Main application component that manages the entire e-commerce store
function TechStoreApp() {
  // State management for current page and navigation
  const [currentPageView, setCurrentPageView] = useState('products')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [userShoppingCart, setUserShoppingCart] = useState([])

  // Navigation function to switch between different pages
  const navigateToPage = (pageName, productId = null) => {
    setCurrentPageView(pageName)
    setSelectedProductId(productId)
  }

  // Add item to shopping cart or increase quantity if already exists
  const addItemToShoppingCart = (selectedProduct) => {
    setUserShoppingCart(previousCart => {
      // Check if product already exists in cart
      const existingCartItem = previousCart.find(cartItem => 
        cartItem.productId === selectedProduct.productId
      )
      
      if (existingCartItem) {
        // Increase quantity of existing item
        return previousCart.map(cartItem => 
          cartItem.productId === selectedProduct.productId 
            ? { ...cartItem, itemQuantity: cartItem.itemQuantity + 1 } 
            : cartItem
        )
      } else {
        // Add new item to cart with quantity 1
        return [...previousCart, { ...selectedProduct, itemQuantity: 1 }]
      }
    })
  }

  // Remove item completely from shopping cart
  const removeItemFromShoppingCart = (productId) => {
    setUserShoppingCart(previousCart => 
      previousCart.filter(cartItem => cartItem.productId !== productId)
    )
  }

  // Render the appropriate page based on current view
  const renderCurrentPage = () => {
    switch (currentPageView) {
      case 'home':
        return (
          <ProductCatalogPage 
            navigateToPage={navigateToPage} 
            shoppingCart={userShoppingCart} 
            addItemToCart={addItemToShoppingCart} 
          />
        )
      case 'products':
        return (
          <ProductCatalogPage 
            navigateToPage={navigateToPage} 
            shoppingCart={userShoppingCart} 
            addItemToCart={addItemToShoppingCart} 
          />
        )
      case 'product':
        return (
          <ProductDetailPage 
            navigateToPage={navigateToPage} 
            selectedProductId={selectedProductId} 
            addItemToCart={addItemToShoppingCart} 
          />
        )
      case 'cart':
        return (
          <ShoppingCartPage 
            navigateToPage={navigateToPage} 
            shoppingCart={userShoppingCart} 
            removeItemFromCart={removeItemFromShoppingCart} 
          />
        )
      default:
        return (
          <ProductCatalogPage 
            navigateToPage={navigateToPage} 
            shoppingCart={userShoppingCart} 
            addItemToCart={addItemToShoppingCart} 
          />
        )
    }
  }

  return (
    <div className="tech-store-app">
      {renderCurrentPage()}
    </div>
  )
}

// Export the main application component
export default TechStoreApp
