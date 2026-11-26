import React, { useState } from 'react';
import {
  X, User, Mail, MapPin, Package, Heart, ShoppingBag,
  LogOut, Camera, Edit2, Check, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function ProfileModal({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onLogout,
  onOpenOrders,
  onOpenWishlist,
  onOpenCart,
  orderCount = 0,
  wishlistCount = 0,
  cartCount = 0,
}) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    houseNo: currentUser?.address?.houseNo || 'Flat 402, Block C',
    street: currentUser?.address?.street || 'Royal Residency, Indiranagar',
    city: currentUser?.address?.city || 'Bengaluru',
    state: currentUser?.address?.state || 'Karnataka',
    pincode: currentUser?.address?.pinCode || currentUser?.address?.pincode || '560038',
  });

  if (!isOpen || !currentUser) return null;

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      const updated = {
        ...currentUser,
        address: {
          ...addressData,
          pinCode: addressData.pincode,
          pincode: addressData.pincode,
        },
      };
      onUpdateUser(updated);
      try {
        localStorage.setItem('sole_bharat_user', JSON.stringify(updated));
      } catch (err) { }
    }
    setIsEditingAddress(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#faf8f5] rounded-3xl max-w-xl w-full border border-stone-200/90 shadow-2xl z-10 overflow-hidden max-h-[92vh] overflow-y-auto selection:bg-yellow-300 selection:text-black animate-modalPop transform-gpu">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer z-20"
          aria-label="Close profile"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cover Image Banner */}
        <div className="relative h-40 sm:h-48 w-full bg-stone-300 overflow-hidden">
          {currentUser.coverImage ? (
            <img
              src={currentUser.coverImage}
              alt="Profile Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-stone-800 to-stone-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-4 left-5">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-sans font-medium">
              Sole Bharat Terrace Member
            </span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative font-sans">

          {/* Avatar and Info Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#faf8f5] shadow-lg overflow-hidden bg-white shrink-0">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullname || currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-900 text-white flex items-center justify-center font-bold text-2xl uppercase">
                    {(currentUser.fullname || currentUser.name || 'U')[0]}
                  </div>
                )}
              </div>

              <div className="pb-1">
                <h3 className="text-2xl font-serif font-normal text-neutral-900">
                  {currentUser.fullname || currentUser.name}
                </h3>
                <span className="text-xs text-stone-500 font-medium block">
                  @{currentUser.userName || currentUser.username || (currentUser.email ? currentUser.email.split('@')[0] : 'user')}
                </span>
                <span className="text-xs text-stone-600 block mt-0.5">
                  {currentUser.email}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 hover:border-red-600 hover:text-red-600 text-stone-700 bg-white text-xs font-semibold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Quick Metrics (Orders, Wishlist, Bag) */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => { onClose(); if (onOpenOrders) onOpenOrders(); }}
              className="p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-neutral-900 shadow-sm text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <Package className="w-4 h-4 text-stone-600 group-hover:text-neutral-900" />
                <span className="text-xs font-bold text-neutral-900 bg-stone-100 px-2 py-0.5 rounded-full">
                  {orderCount}
                </span>
              </div>
              <span className="text-xs font-semibold text-neutral-900 block">Orders</span>
              <span className="text-[10px] text-stone-500">Track shipments</span>
            </button>

            <button
              onClick={() => { onClose(); if (onOpenWishlist) onOpenWishlist(); }}
              className="p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-neutral-900 shadow-sm text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <Heart className="w-4 h-4 text-stone-600 group-hover:text-red-500" />
                <span className="text-xs font-bold text-neutral-900 bg-stone-100 px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              </div>
              <span className="text-xs font-semibold text-neutral-900 block">Wishlist</span>
              <span className="text-[10px] text-stone-500">Saved shoes</span>
            </button>

            <button
              onClick={() => { onClose(); if (onOpenCart) onOpenCart(); }}
              className="p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-neutral-900 shadow-sm text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <ShoppingBag className="w-4 h-4 text-stone-600 group-hover:text-neutral-900" />
                <span className="text-xs font-bold text-neutral-900 bg-stone-100 px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-semibold text-neutral-900 block">Bag</span>
              <span className="text-[10px] text-stone-500">Items ready</span>
            </button>
          </div>

          {/* Delivery Address Section (House No, Street, City, State, PIN) */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm mb-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                  Default Shipping Address
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>{isEditingAddress ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {isEditingAddress ? (
              <form onSubmit={handleSaveAddress} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      House / Flat / Floor No. *
                    </label>
                    <input
                      type="text"
                      name="houseNo"
                      required
                      value={addressData.houseNo}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Street / Colony / Landmark *
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={addressData.street}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={addressData.city}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={addressData.state}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={addressData.pincode}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  Save Address
                </button>
              </form>
            ) : (
              <div className="text-xs text-stone-700 leading-relaxed">
                <p className="font-semibold text-neutral-900">
                  {currentUser.fullname || currentUser.name}
                </p>
                <p className="text-stone-600 mt-0.5">
                  {addressData.houseNo}, {addressData.street}
                </p>
                <p className="text-stone-600">
                  {addressData.city}, {addressData.state} — {addressData.pincode}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

