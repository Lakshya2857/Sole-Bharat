import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, User, LogOut, ChevronDown, Heart, Package, 
  Settings, UserCheck, Sparkles 
} from 'lucide-react';

export default function Navbar({ 
  cartCount = 0, 
  wishlistCount = 0,
  orderCount = 0,
  onCartClick, 
  onWishlistClick,
  onTrackOrderClick, 
  onProfileClick,
  onHomeClick,
  onAuthClick,
  currentUser = null,
  onLogout,
  isVisible = true 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDropdownSelect = (action) => {
    setIsDropdownOpen(false);
    if (action) action();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-300 ease-in-out transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onHomeClick} 
            className="flex items-center gap-2.5 group text-left cursor-pointer select-none"
            title="Sole Bharat - 1990 Terrace Sneaker Co."
          >
            {/* Single Shoe Logo - Pure Side View Profile */}
            <div className="w-11 h-8 sm:w-12 sm:h-8.5 rounded-xl bg-[#f4f0eb] border border-stone-300/80 flex items-center justify-center p-1 group-hover:border-neutral-900 group-hover:bg-white shadow-sm transition-all overflow-hidden shrink-0">
              <img 
                src="/assets/shoes_png/sole-bharat-maroon.png" 
                alt="Sole Bharat Side View Shoe Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
              />
            </div>

            <span 
              className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 leading-none group-hover:text-amber-900 transition-colors"
            >
              Sole Bharat
            </span>
            <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-sans text-[10px] font-semibold tracking-wider">
              1990
            </span>
          </button>
        </div>

        {/* Vintage Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.12em] font-medium text-stone-600">
          <button 
            onClick={() => {
              onHomeClick();
              setTimeout(() => {
                const el = document.getElementById('collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }} 
            className="hover:text-black transition-colors cursor-pointer"
          >
            The Collection
          </button>
          
          <button 
            onClick={() => {
              onHomeClick();
              setTimeout(() => {
                const el = document.getElementById('terrace-classic');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }} 
            className="hover:text-black transition-colors cursor-pointer"
          >
            3D Archive
          </button>
          
          <button 
            onClick={() => {
              onHomeClick();
              setTimeout(() => {
                const el = document.getElementById('craftsmanship');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }} 
            className="hover:text-black transition-colors cursor-pointer"
          >
            Craftsmanship
          </button>

          <button 
            onClick={() => {
              onHomeClick();
              setTimeout(() => {
                const el = document.getElementById('story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }} 
            className="hover:text-black transition-colors cursor-pointer"
          >
            About Us
          </button>
        </nav>

        {/* Action Buttons & User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Wishlist Quick Icon Button */}
          <button
            onClick={onWishlistClick}
            className="relative p-2 rounded-full border border-stone-300 hover:border-neutral-900 bg-white text-stone-700 hover:text-black transition-all shadow-sm cursor-pointer"
            title="View Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Quick Bag Button */}
          <button 
            onClick={onCartClick}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-medium tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-stone-300" />
            <span className="hidden sm:inline font-semibold">Bag</span>
            <span className="w-4 h-4 rounded-full bg-stone-100 text-neutral-900 text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* USER DROPDOWN WITH ARROW */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border bg-white shadow-sm transition-all cursor-pointer ${
                isDropdownOpen 
                  ? 'border-neutral-900 ring-2 ring-neutral-900/10' 
                  : 'border-stone-300 hover:border-neutral-900'
              }`}
              title="User Account Menu"
              aria-expanded={isDropdownOpen}
            >
              {currentUser?.avatar ? (
                <div className="w-6 h-6 rounded-full overflow-hidden border border-stone-200 shrink-0">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.fullname || currentUser.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : currentUser ? (
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center uppercase shrink-0">
                  {(currentUser.fullname || currentUser.name || 'U')[0]}
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}

              <span className="hidden sm:inline font-sans text-xs font-semibold text-neutral-900 max-w-[90px] truncate">
                {currentUser ? (currentUser.fullname || currentUser.name) : 'Account'}
              </span>

              {/* DROPDOWN ARROW INDICATOR */}
              <ChevronDown 
                className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-neutral-900' : ''
                }`} 
              />
            </button>

            {/* DROPDOWN MENU */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-72 sm:w-80 rounded-2xl bg-[#faf8f5] border border-stone-200/90 shadow-2xl p-2 z-50 animate-fadeIn font-sans selection:bg-yellow-300 selection:text-black">
                
                {/* User Header in Dropdown */}
                {currentUser ? (
                  <div className="p-3 mb-2 rounded-xl bg-white border border-stone-200/70 flex items-center gap-3">
                    {currentUser.avatar ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200 shrink-0">
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.fullname || currentUser.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-neutral-900 text-white text-sm font-bold flex items-center justify-center uppercase shrink-0">
                        {(currentUser.fullname || currentUser.name || 'U')[0]}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-xs text-neutral-900 block truncate">
                        {currentUser.fullname || currentUser.name}
                      </span>
                      <span className="text-[11px] text-stone-500 block truncate">
                        @{currentUser.userName || currentUser.username || currentUser.email?.split('@')[0]}
                      </span>
                      <span className="text-[10px] text-stone-400 block truncate">
                        {currentUser.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 mb-2 rounded-xl bg-white border border-stone-200/70">
                    <span className="font-semibold text-xs text-neutral-900 block">
                      Welcome to Sole Bharat
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Sign in to track orders, manage wishlist and save shipping addresses.
                    </p>
                    <button
                      onClick={() => handleDropdownSelect(onAuthClick)}
                      className="mt-2.5 w-full py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}

                {/* THE 3 MANDATORY DROPDOWN OPTIONS: ORDERS, WISHLIST, CART */}
                <div className="space-y-1">
                  
                  {/* 1. ORDERS */}
                  <button
                    onClick={() => handleDropdownSelect(onTrackOrderClick)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-stone-200 text-neutral-800 flex items-center justify-center transition-colors">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-neutral-900 block group-hover:text-black">
                          My Orders
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          Track shipments & delivery status
                        </span>
                      </div>
                    </div>
                    {orderCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-bold">
                        {orderCount}
                      </span>
                    )}
                  </button>

                  {/* 2. WISHLIST */}
                  <button
                    onClick={() => handleDropdownSelect(onWishlistClick)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-neutral-900 block group-hover:text-black">
                          My Wishlist
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          Saved terrace silhouettes
                        </span>
                      </div>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  {/* 3. CART / BAG */}
                  <button
                    onClick={() => handleDropdownSelect(onCartClick)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-stone-200 text-neutral-800 flex items-center justify-center transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-neutral-900 block group-hover:text-black">
                          Shopping Bag / Cart
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          Items ready for checkout
                        </span>
                      </div>
                    </div>
                    {cartCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-bold">
                        {cartCount}
                      </span>
                    )}
                  </button>

                </div>

                {/* Account Settings / Profile & Logout */}
                {currentUser && (
                  <div className="mt-2 pt-2 border-t border-stone-200/80 space-y-1">
                    <button
                      onClick={() => handleDropdownSelect(onProfileClick)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white text-left transition-colors cursor-pointer text-xs font-semibold text-neutral-900"
                    >
                      <UserCheck className="w-4 h-4 text-stone-600" />
                      <span>View Full Profile</span>
                    </button>

                    <button
                      onClick={() => handleDropdownSelect(onLogout)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50 text-left transition-colors cursor-pointer text-xs font-semibold text-red-600"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
