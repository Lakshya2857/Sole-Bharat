import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroVideoRetro from './components/HeroVideoRetro';
import ShoeShowcase from './components/ShoeShowcase';
import ShoeAnatomy from './components/ShoeAnatomy';
import Lookbook from './components/Lookbook';
import VhsTimeMachine from './components/VhsTimeMachine';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductPage from './components/ProductPage';
import OrderTrackerModal from './components/OrderTrackerModal';
import ScrollIndicator from './components/ScrollIndicator';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import WishlistDrawer from './components/WishlistDrawer';
import ShoeViewer from './ShoeViewer';
import { CheckCircle } from 'lucide-react';
import { SHOES_DATA } from './data/shoes';

const frames = Array.from({ length: 20 }, (_, i) => `/shoe/${i + 1}.webp`);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Page view routing: 'home' | 'product'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductShoe, setSelectedProductShoe] = useState(SHOES_DATA[1]); // Default: Retro Azure

  // Navbar visibility state (hidden initially over video, appears on scroll down)
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  // Cart & Checkout state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // User profile state loaded from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sole_bharat_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Wishlist state loaded from localStorage
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sole_bharat_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Orders state loaded from localStorage
  const [placedOrders, setPlacedOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sole_bharat_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [checkoutData, setCheckoutData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sole_bharat_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {}
  }, [wishlistItems]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sole_bharat_orders', JSON.stringify(placedOrders));
    } catch (e) {}
  }, [placedOrders]);

  // Scroll listener: Navbar is hidden initially on the video, appears on scroll down
  useEffect(() => {
    if (currentPage === 'product') {
      setIsNavbarVisible(true);
      return;
    }

    const handleScroll = () => {
      // Reveal navbar once user scrolls 320px down into the content below video
      const threshold = 320;
      if (window.scrollY > threshold) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Sync hash routing so browser Back/Forward works
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const id = hash.replace('#product/', '');
        const found = SHOES_DATA.find((s) => s.id === id);
        if (found) {
          setSelectedProductShoe(found);
          setCurrentPage('product');
          return;
        }
      }
      if (hash === '' || hash === '#') {
        setCurrentPage('home');
      }
    };

    checkHash();
    window.addEventListener('popstate', checkHash);
    return () => window.removeEventListener('popstate', checkHash);
  }, []);

  const handleOpenProductPage = (shoe) => {
    setSelectedProductShoe(shoe);
    setCurrentPage('product');
    try {
      window.history.pushState({ page: 'product', shoeId: shoe.id }, '', `#product/${shoe.id}`);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    try {
      window.history.pushState({ page: 'home' }, '', '#');
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAddToCart = (shoe) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === shoe.id && item.selectedSize === shoe.selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + (shoe.quantity || 1);
        return updated;
      }
      return [...prev, { ...shoe, quantity: shoe.quantity || 1 }];
    });

    showToast(`Added "${shoe.shortName || shoe.name}" (UK ${shoe.selectedSize || 8}) to bag!`);
  };

  const handleBuyNow = (shoe) => {
    const item = { ...shoe, selectedSize: shoe.selectedSize || 8, quantity: shoe.quantity || 1 };
    setCheckoutData({
      items: [item],
      finalTotal: item.price * (item.quantity || 1),
      discountAmount: 0,
    });
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (shoeId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(shoeId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === shoeId && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (shoeId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === shoeId && item.selectedSize === size))
    );
  };

  const handleProceedToCheckout = (data) => {
    setCheckoutData(data);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setCartItems([]);
    if (order) {
      setPlacedOrders((prev) => [order, ...prev]);
    }
    showToast('Order placed successfully! Tracking waybill generated.');
  };

  // Wishlist handlers
  const handleToggleWishlist = (shoe) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === shoe.id);
      if (exists) {
        showToast(`Removed "${shoe.shortName || shoe.name}" from wishlist.`);
        return prev.filter((item) => item.id !== shoe.id);
      } else {
        showToast(`Saved "${shoe.shortName || shoe.name}" to wishlist.`);
        return [...prev, shoe];
      }
    });
  };

  const handleRemoveFromWishlist = (shoeId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== shoeId));
  };

  const handleMoveWishlistToCart = (shoe) => {
    handleAddToCart({ ...shoe, selectedSize: 8, quantity: 1 });
    handleRemoveFromWishlist(shoe.id);
  };

  // User auth handlers
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('sole_bharat_user', JSON.stringify(user));
    } catch (e) {}
    showToast(`Welcome back, ${user.fullname || user.name}!`);
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('sole_bharat_user', JSON.stringify(updatedUser));
    } catch (e) {}
    showToast('Profile and address updated.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('sole_bharat_user');
    } catch (e) {}
    showToast('Signed out successfully.');
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#18181b] font-sans flex flex-col relative selection:bg-yellow-300 selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-neutral-900 text-white px-5 py-3 rounded-full shadow-2xl text-xs font-sans font-semibold border border-neutral-700/80 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={handleRemoveFromWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onOpenProduct={handleOpenProductPage}
      />

      {/* Checkout Modal with House No, City, State, PIN */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderSuccess={handleOrderSuccess}
        currentUser={currentUser}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />

      {/* Auth Modal (Frontend Sign In & Sign Up with Username, Email, Password, Avatar, Cover) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* User Full Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
        onOpenOrders={() => setIsTrackerOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        orderCount={placedOrders.length}
        wishlistCount={wishlistItems.length}
        cartCount={totalCartCount}
      />

      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      <div className="flex-1 flex flex-col">
          
          {/* Scroll-Revealed Sticky Navbar with Dropdown Arrow (Orders, Wishlist, Bag) */}
          <Navbar 
            cartCount={totalCartCount} 
            wishlistCount={wishlistItems.length}
            orderCount={placedOrders.length}
            onCartClick={() => setIsCartOpen(true)}
            onWishlistClick={() => setIsWishlistOpen(true)}
            onTrackOrderClick={() => setIsTrackerOpen(true)}
            onProfileClick={() => setIsProfileOpen(true)}
            onHomeClick={handleBackToHome}
            onAuthClick={() => setIsAuthOpen(true)}
            currentUser={currentUser}
            onLogout={handleLogout}
            isVisible={isNavbarVisible}
          />

          {/* Vertical Page Section Scroll Indicator (Video -> Carousel -> Products -> Details -> About Us) */}
          <ScrollIndicator isVisible={currentPage === 'home'} />

          {/* Main Content Area */}
          <main className="flex-1">
            {currentPage === 'product' ? (
              /* Dedicated Full Product Page View */
              <ProductPage
                initialShoe={selectedProductShoe}
                onBackToHome={handleBackToHome}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            ) : (
              /* Home Page View with Video & Collection */
              <>
                <HeroVideoRetro 
                  onSelectShoe={handleOpenProductPage} 
                  onShopAll={() => {
                    const el = document.getElementById('collection');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
                <ShoeShowcase 
                  onAddToCart={handleAddToCart} 
                  onOpenDetail={handleOpenProductPage} 
                  wishlistItems={wishlistItems}
                  onToggleWishlist={handleToggleWishlist}
                />
                <ShoeAnatomy />
                <Lookbook onSelectShoe={handleOpenProductPage} />
              </>
            )}
          </main>

          <Footer />

          {/* 1990 VHS Camcorder Time-Machine Mode */}
          <VhsTimeMachine />
        </div>
    </div>
  );
}
