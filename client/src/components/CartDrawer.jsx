import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'BHARAT10') {
      setAppliedDiscount(0.1);
      setCouponSuccess('Coupon "BHARAT10" applied! 10% discount added.');
      setCouponError('');
    } else if (cleanCode === 'RETRO90') {
      setAppliedDiscount(0.15);
      setCouponSuccess('Coupon "RETRO90" applied! 15% discount added.');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "BHARAT10" for 10% off!');
      setCouponSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden selection:bg-yellow-300 selection:text-black">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf8f5] shadow-2xl flex flex-col border-l border-stone-200/90 font-sans animate-slideInRight transform-gpu">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200/80 flex items-center justify-between bg-white">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-neutral-900" />
                <h2 className="text-2xl font-serif font-normal text-neutral-900">
                  Your Sole Bag
                </h2>
                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200">
                  {items.reduce((sum, i) => sum + (i.quantity || 1), 0)} PAIRS
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Free Express Air Shipping across Bharat</p>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-200/60 flex items-center justify-center mb-4 text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-normal text-neutral-900">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1.5 leading-relaxed">
                  Discover the 4 archival silhouettes and step into the authentic 1990 terrace drop.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-neutral-900 text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-[#f4f0eb] p-2 flex-shrink-0 flex items-center justify-center border border-stone-200/60 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm font-semibold text-neutral-900 leading-snug truncate">
                          {item.shortName || item.name}
                        </h4>
                        <button 
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        Size: <span className="font-semibold text-neutral-900">UK {item.selectedSize || 8}</span> • {item.color}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 rounded-full bg-stone-50 px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, (item.quantity || 1) - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white text-stone-700 rounded-full cursor-pointer transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-neutral-900">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, (item.quantity || 1) + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white text-stone-700 rounded-full cursor-pointer transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-serif text-base font-bold text-neutral-900">
                        ₹{((item.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200/80 space-y-4">
              
              {/* Promo Code Box */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. BHARAT10)"
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase font-medium bg-stone-50 border border-stone-300 rounded-full focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-full transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Apply
                </button>
              </form>
              
              {couponSuccess && (
                <p className="text-[11px] font-medium text-emerald-700">{couponSuccess}</p>
              )}
              {couponError && (
                <p className="text-[11px] font-medium text-red-600">{couponError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({(appliedDiscount * 100)}%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-neutral-900">FREE AIR CARGO</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="font-serif text-2xl font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout({ finalTotal, discountAmount, items })}
                className="w-full py-3.5 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <span>Proceed to Order Slip</span>
                <ArrowRight className="w-4 h-4 text-stone-300" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>100% Encrypted Indian Payment Processing</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
