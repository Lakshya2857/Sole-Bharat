import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Zap, Check, Ruler, Sparkles } from 'lucide-react';

export default function ProductDetailModal({ shoe, isOpen, onClose, onAddToCart, onBuyNow }) {
  const [selectedSize, setSelectedSize] = useState(8);
  const [activeTab, setActiveTab] = useState('specs');
  const [added, setAdded] = useState(false);

  if (!isOpen || !shoe) return null;

  const handleAdd = () => {
    onAddToCart({ ...shoe, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow({ ...shoe, selectedSize });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-[#f5f0e4] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Image Box */}
          <div>
            <div className="relative rounded-2xl bg-[#ede4d1] p-4 overflow-hidden flex items-center justify-center border-2 border-black shadow-inner">
              <img 
                src={shoe.image} 
                alt={shoe.name}
                className="w-full h-72 object-contain drop-shadow-2xl"
              />
              <span className={`absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow ${shoe.badgeColor}`}>
                {shoe.tag}
              </span>
            </div>

            {/* 90s Trust Marks */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center font-mono text-[10px]">
              <div className="p-2.5 rounded-xl bg-white border-2 border-black/20">
                <Truck className="w-4 h-4 text-black mx-auto mb-1" />
                <span className="font-bold text-black block">EXPRESS AIR</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border-2 border-black/20">
                <RefreshCw className="w-4 h-4 text-black mx-auto mb-1" />
                <span className="font-bold text-black block">7-DAY RETURN</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border-2 border-black/20">
                <ShieldCheck className="w-4 h-4 text-black mx-auto mb-1" />
                <span className="font-bold text-black block">1-YR GUARANTEE</span>
              </div>
            </div>
          </div>

          {/* Right Column: 90s Spec & Purchasing */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-gray-700">
                <span className="font-bold text-black">SPEC ARCHIVE:</span>
                <span>{shoe.code}</span>
                <span>•</span>
                <span className="text-red-700 font-bold">{shoe.year} DROP</span>
              </div>
              
              <h2 
                className="text-3xl font-black uppercase text-black mt-1"
                style={{ fontFamily: '"Bebas Neue", "Space Grotesk", sans-serif' }}
              >
                {shoe.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-1 font-mono text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-black">{shoe.rating}</span>
                <span className="text-gray-500">({shoe.reviews} reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 pb-3 border-b-2 border-black/20">
              <span className="text-3xl font-black text-black font-display">
                ₹{shoe.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-mono text-gray-500 line-through">
                ₹{shoe.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                SAVE ₹{(shoe.originalPrice - shoe.price).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold text-black uppercase">Select Size (UK/IND):</span>
                <span className="text-[10px] font-mono text-gray-600">Standard 90s Low Profile Fit</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[7, 8, 9, 10, 11].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-xl font-mono text-xs font-bold border-2 transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white text-black border-black/30 hover:border-black'
                    }`}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Specs Sheet */}
            <div className="border-t-2 border-black/20 pt-3">
              <span className="text-xs font-mono font-bold uppercase text-black block mb-2">
                ARCHIVAL MATERIAL SHEET:
              </span>
              <div className="space-y-1.5 font-mono text-[11px] text-gray-700 bg-white/70 p-3 rounded-xl border border-black/20">
                <div><span className="font-bold text-black">UPPER:</span> {shoe.specs?.upper}</div>
                <div><span className="font-bold text-black">SOLE:</span> {shoe.specs?.sole}</div>
                <div><span className="font-bold text-black">LINING:</span> {shoe.specs?.lining}</div>
                <div><span className="font-bold text-black">HARDWARE:</span> {shoe.specs?.hardware}</div>
                <div><span className="font-bold text-black">EMBROIDERY:</span> {shoe.specs?.embroidery}</div>
                <div><span className="font-bold text-black">ORIGIN:</span> {shoe.specs?.origin}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-black border-2 border-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>In Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuy}
                className="flex-1 py-3 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(109,31,52,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Instant Buy</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
