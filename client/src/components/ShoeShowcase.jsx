import React, { useState } from 'react';
import { SHOES_DATA } from '../data/shoes';
import { Star, ShoppingCart, Check, Eye, Heart, Search } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ShoeShowcase({ 
  onAddToCart, 
  onOpenDetail,
  wishlistItems = [],
  onToggleWishlist,
}) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedShoeId, setAddedShoeId] = useState(null);
  const [loupeState, setLoupeState] = useState(null);

  const handleSizeSelect = (shoeId, size, e) => {
    e.stopPropagation();
    setSelectedSizes((prev) => ({ ...prev, [shoeId]: size }));
  };

  const handleAddToCartClick = (shoe, e) => {
    e.stopPropagation();
    const size = selectedSizes[shoe.id] || 8;
    onAddToCart({ ...shoe, selectedSize: size });
    setAddedShoeId(shoe.id);
    setTimeout(() => setAddedShoeId(null), 1500);
  };

  const handleLoupeMove = (shoeId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupeState({
      shoeId,
      x,
      y,
      pxX: e.clientX - rect.left,
      pxY: e.clientY - rect.top,
    });
  };

  const handleLoupeLeave = () => {
    setLoupeState(null);
  };

  return (
    <section id="collection" className="pt-10 sm:pt-14 pb-20 sm:pb-28 bg-[#faf8f5] relative border-b border-stone-200 selection:bg-yellow-300 selection:text-black scroll-mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Clean & Minimal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="border-b border-stone-200/80 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 block mb-2 font-sans">
                1990 Terrace Sneaker Drop
              </span>
              <h2 
                className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-neutral-900"
              >
                The Four Archival Silhouettes
              </h2>
            </div>
            <p className="font-sans text-sm text-stone-600 max-w-md leading-relaxed">
              Full-grain tumbled ecru cowhide, natural gum cupsoles, and hand-embroidered Morse details.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Shoes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SHOES_DATA.map((shoe, index) => {
            const currentSize = selectedSizes[shoe.id] || 8;
            const isAdded = addedShoeId === shoe.id;
            const isWishlisted = wishlistItems.some((w) => w.id === shoe.id);

            return (
              <ScrollReveal 
                key={shoe.id} 
                animation="fade-up" 
                delay={index * 100} 
                duration={700}
                className="h-full"
              >
                <div 
                  onClick={() => onOpenDetail(shoe)}
                  className="group cursor-pointer rounded-2xl bg-white p-6 sm:p-7 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between h-full transform-gpu"
                >
                <div>
                  {/* Shoe Image Box with Soft Warm Finish & Jeweler's Macro Loupe */}
                  <div 
                    onMouseMove={(e) => handleLoupeMove(shoe.id, e)}
                    onMouseLeave={handleLoupeLeave}
                    className="relative mb-6 h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-[#f4f0eb] border border-stone-200/60 flex items-center justify-center p-6 group/box cursor-crosshair"
                  >
                    
                    {/* Wishlist Heart Toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleWishlist) onToggleWishlist(shoe);
                      }}
                      className={`absolute top-3.5 left-3.5 p-2 rounded-full backdrop-blur-sm transition-all z-10 cursor-pointer shadow-sm ${
                        isWishlisted 
                          ? 'bg-red-50 text-red-600 border border-red-200' 
                          : 'bg-white/80 hover:bg-white text-stone-600 hover:text-black border border-stone-200'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                    </button>

                    <img 
                      src={shoe.image} 
                      alt={shoe.name} 
                      className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-xl transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu"
                    />

                    {loupeState?.shoeId === shoe.id && (
                      <div 
                        className="absolute pointer-events-none w-28 h-28 rounded-full border border-stone-800/80 shadow-[0_12px_36px_rgba(0,0,0,0.35)] overflow-hidden z-20 -translate-x-1/2 -translate-y-1/2 bg-[#f4f0eb] hidden sm:block ring-2 ring-white/60 animate-fade-in"
                        style={{ left: `${loupeState.pxX}px`, top: `${loupeState.pxY}px` }}
                      >
                        <img 
                          src={shoe.image} 
                          alt="" 
                          className="w-full h-full object-contain pointer-events-none"
                          style={{
                            transform: 'scale(3)',
                            transformOrigin: `${loupeState.x}% ${loupeState.y}%`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />
                      </div>
                    )}

                    {/* Quick View Hover Label */}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white font-sans text-xs font-medium rounded-full shadow-sm">
                        <Eye className="w-3 h-3 text-stone-300" />
                        <span>Inspect</span>
                      </span>
                    </div>

                    {/* Color Accent Indicator Circle */}
                    <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-200 text-xs font-sans font-medium text-stone-800 shadow-sm">
                      <div 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: shoe.accentHex }}
                      />
                      <span>{shoe.shortName}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl font-semibold text-neutral-900 tracking-tight group-hover:text-amber-900 transition-colors">
                        {shoe.name}
                      </h3>
                      <div className="flex items-center gap-1 font-sans text-xs text-stone-600 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{shoe.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-stone-600 mt-2.5 leading-relaxed font-normal">
                      {shoe.description}
                    </p>
                  </div>

                  {/* Minimal Size Selector */}
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-sans font-medium text-stone-600">
                      Size (UK):
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[7, 8, 9, 10, 11].map((size) => (
                        <button
                          key={size}
                          onClick={(e) => handleSizeSelect(shoe.id, size, e)}
                          className={`w-8 h-8 rounded-full font-sans text-xs font-medium transition-all cursor-pointer ${
                            currentSize === size
                              ? 'bg-neutral-900 text-white shadow-sm'
                              : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Pricing & Add to Bag */}
                <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-sans text-stone-400 line-through block">
                      ₹{shoe.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-2xl font-serif font-bold text-neutral-900">
                      ₹{shoe.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCartClick(shoe, e)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer ${
                      isAdded 
                        ? 'bg-emerald-700 text-white' 
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>In Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5 text-stone-300" />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>

      </div>
    </section>
  );
}
