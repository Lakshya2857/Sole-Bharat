import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, 
  Zap, Check, MapPin, Heart 
} from 'lucide-react';
import { SHOES_DATA } from '../data/shoes';

// Exact 4-angle studio photography mapping for every single colorway
// Each colorway displays exclusively its own genuine colorway assets across all 4 angles
const COLORWAY_ANGLES = {
  'sb-90-maroon': {
    lateral: '/assets/shoes_png/sole-bharat-maroon.png',
    top: '/assets/360_png/shoe-top-maroon.png',
    medial: '/assets/360_png/shoe-medial-maroon.png',
    heel: '/assets/360_png/shoe-heel-maroon.png',
  },
  'sb-90-blue': {
    lateral: '/assets/shoes_png/sole-bharat-blue.png',
    top: '/assets/360_png/shoe-top.png',
    medial: '/assets/360_png/shoe-medial.png',
    heel: '/assets/360_png/shoe-heel.png',
  },
  'sb-90-green': {
    lateral: '/assets/shoes_png/sole-bharat-green.png',
    top: '/assets/360_png/shoe-top-green.png',
    medial: '/assets/360_png/shoe-medial-green.png',
    heel: '/assets/360_png/shoe-heel-green.png',
  },
  'sb-90-brown': {
    lateral: '/assets/shoes_png/sole-bharat-brown.png',
    top: '/assets/360_png/shoe-top-brown.png',
    medial: '/assets/360_png/shoe-medial-brown.png',
    heel: '/assets/360_png/shoe-heel-brown.png',
  },
};

export default function ProductPage({ 
  initialShoe, 
  onBackToHome, 
  onAddToCart, 
  onBuyNow,
  wishlistItems = [],
  onToggleWishlist,
}) {
  const [currentShoe, setCurrentShoe] = useState(initialShoe || SHOES_DATA[0]);
  const [selectedSize, setSelectedSize] = useState(8);
  const [quantity, setQuantity] = useState(1);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [addedToBag, setAddedToBag] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'heritage' | 'care'

  // Update current shoe if initialShoe prop changes
  useEffect(() => {
    if (initialShoe) {
      setCurrentShoe(initialShoe);
      setActiveAngleIndex(0);
    }
  }, [initialShoe]);

  // Scroll to top on mount or when shoe changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentShoe.id]);

  // Retrieve matching angles strictly for the active colorway
  const currentAngles = COLORWAY_ANGLES[currentShoe.id] || COLORWAY_ANGLES['sb-90-blue'];
  const isWishlisted = wishlistItems.some((w) => w.id === currentShoe.id);

  const galleryAngles = [
    {
      id: 'lateral',
      title: 'Lateral Profile',
      tag: 'OUTER SIDE',
      src: currentAngles.lateral,
    },
    {
      id: 'top',
      title: 'Top Laces & Tongue',
      tag: 'TOP-DOWN',
      src: currentAngles.top,
    },
    {
      id: 'medial',
      title: 'Inner Arch Wave',
      tag: 'MEDIAL ARCH',
      src: currentAngles.medial,
    },
    {
      id: 'heel',
      title: 'Heel Counter',
      tag: 'HEEL TAB',
      src: currentAngles.heel,
    },
  ];

  const handleSelectColorway = (shoe) => {
    setCurrentShoe(shoe);
    setActiveAngleIndex(0); // Reset to primary lateral angle
  };

  const handleAdd = () => {
    onAddToCart({ ...currentShoe, selectedSize, quantity });
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const handleInstantBuy = () => {
    onBuyNow({ ...currentShoe, selectedSize, quantity });
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus({
        valid: true,
        message: `Express Air Cargo: Delivery in 2-3 business days to ${pincode}`,
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#18181b] pt-28 pb-24 selection:bg-yellow-300 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Breadcrumb & Clean Back Navigation */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-stone-200/80">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-300 font-sans text-xs font-semibold text-neutral-800 hover:border-neutral-900 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Archive</span>
          </button>

          <div className="flex items-center gap-2 font-sans text-xs text-stone-500 font-medium">
            <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Terrace</span>
            <span>/</span>
            <span className="font-semibold text-neutral-900">{currentShoe.shortName}</span>
          </div>
        </div>

        {/* Main Product Layout (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Multi-Angle Gallery & Big Preview */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Stage Display Box */}
            <div className="relative rounded-3xl bg-[#f4f0eb] p-6 sm:p-10 border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
              
              {/* Minimal Top Angle Tag & Wishlist */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-stone-700 border border-stone-200 font-sans text-xs font-medium tracking-wide shadow-sm">
                  {galleryAngles[activeAngleIndex].title}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleWishlist && onToggleWishlist(currentShoe)}
                  className={`p-2 rounded-full border transition-all cursor-pointer shadow-sm ${
                    isWishlisted 
                      ? 'bg-red-50 text-red-600 border-red-200' 
                      : 'bg-white/90 hover:bg-white text-stone-600 hover:text-black border-stone-200'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                </button>
              </div>

              {/* The Shoe Image */}
              <div className="relative aspect-[4/3] w-full flex items-center justify-center p-6 overflow-hidden rounded-2xl bg-white/70 border border-stone-200/50">
                <img 
                  key={galleryAngles[activeAngleIndex].src}
                  src={galleryAngles[activeAngleIndex].src} 
                  alt={`${currentShoe.name} - ${galleryAngles[activeAngleIndex].title}`}
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform hover:scale-105 animate-fadeIn transform-gpu"
                />
              </div>
            </div>

            {/* 4 Multi-Angle Thumbnail Strip (All strictly matching the active colorway) */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {galleryAngles.map((angle, idx) => {
                const isActive = activeAngleIndex === idx;
                return (
                  <button
                    key={angle.id}
                    onClick={() => setActiveAngleIndex(idx)}
                    className={`group rounded-2xl p-2.5 sm:p-3 bg-white border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isActive 
                        ? 'border-neutral-900 shadow-md ring-1 ring-neutral-900 -translate-y-0.5' 
                        : 'border-stone-200/80 hover:border-stone-400 shadow-sm'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-xl bg-[#f4f0eb] p-1.5 flex items-center justify-center overflow-hidden mb-2">
                      <img 
                        src={angle.src} 
                        alt={angle.title} 
                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-sans font-medium uppercase truncate text-stone-700">
                      {angle.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 4 Authentic Trust Badges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm text-center">
                <Truck className="w-4 h-4 text-neutral-800 mx-auto mb-1.5" />
                <span className="font-sans text-xs font-semibold uppercase text-neutral-900 block">Express Air</span>
                <span className="font-sans text-[10px] text-stone-500">Free All-India Courier</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm text-center">
                <RefreshCw className="w-4 h-4 text-neutral-800 mx-auto mb-1.5" />
                <span className="font-sans text-xs font-semibold uppercase text-neutral-900 block">7-Day Return</span>
                <span className="font-sans text-[10px] text-stone-500">Free Size Exchange</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm text-center">
                <ShieldCheck className="w-4 h-4 text-neutral-800 mx-auto mb-1.5" />
                <span className="font-sans text-xs font-semibold uppercase text-neutral-900 block">1-Yr Warranty</span>
                <span className="font-sans text-[10px] text-stone-500">Full Stitch Warranty</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm text-center">
                <span className="text-base block mb-0.5">🇮🇳</span>
                <span className="font-sans text-xs font-semibold uppercase text-neutral-900 block">100% Bharat</span>
                <span className="font-sans text-[10px] text-stone-500">Zero Synthetic Plastic</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Product Information, Colorway Switcher & Buying */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header: Title, Reviews & Price */}
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 block mb-2">
                Authentic 1990 Terrace Cut
              </span>
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-neutral-900 leading-tight"
              >
                {currentShoe.name}
              </h1>

              {/* Rating & Verified Purchases */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="font-sans text-xs font-bold text-neutral-900">{currentShoe.rating}</span>
                <span className="font-sans text-xs text-stone-500">({currentShoe.reviews} reviews)</span>
              </div>

              {/* Price Banner */}
              <div className="mt-5 p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-serif font-bold text-neutral-900">
                      ₹{currentShoe.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-sans text-stone-400 line-through">
                      ₹{currentShoe.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="font-sans text-xs text-stone-500 block mt-0.5">
                    Inclusive of GST & Free Express Air Delivery
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-sans text-xs font-medium">
                  Save ₹{(currentShoe.originalPrice - currentShoe.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-stone-600 leading-relaxed bg-[#f4f0eb] p-5 rounded-2xl border border-stone-200/60 font-normal">
              {currentShoe.description}
            </p>

            {/* ------------------------------------------------------------- */}
            {/* ALL 4 COLORWAYS SELECTOR */}
            {/* ------------------------------------------------------------- */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-sans text-xs font-semibold uppercase text-stone-800 tracking-wider">
                  Colorway: <span className="text-neutral-900 font-bold">{currentShoe.shortName}</span>
                </span>
                <span className="font-sans text-xs text-stone-500">
                  4 Archival Options
                </span>
              </div>

              {/* 4 Color Options Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {SHOES_DATA.map((shoe) => {
                  const isSelected = shoe.id === currentShoe.id;
                  return (
                    <button
                      key={shoe.id}
                      onClick={() => handleSelectColorway(shoe)}
                      className={`group p-2.5 rounded-2xl border transition-all flex items-center gap-3 text-left cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 bg-white shadow-md ring-1 ring-neutral-900 -translate-y-0.5'
                          : 'border-stone-200/80 bg-white/70 hover:bg-white hover:border-stone-400 shadow-sm'
                      }`}
                    >
                      {/* Mini Shoe Thumbnail */}
                      <div className="w-12 h-10 rounded-xl bg-[#f4f0eb] p-1 flex items-center justify-center flex-shrink-0 border border-stone-200 overflow-hidden">
                        <img 
                          src={shoe.image} 
                          alt={shoe.shortName} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: shoe.accentHex }}
                          />
                          <span className="font-medium text-xs text-neutral-900 font-sans truncate">
                            {shoe.shortName}
                          </span>
                        </div>
                        <span className="font-sans text-xs text-stone-500 block truncate">
                          ₹{shoe.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector (UK / IND) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-xs font-semibold uppercase text-stone-800 tracking-wider">
                  Select Size (UK):
                </span>
                <span className="font-sans text-xs text-stone-500 font-normal">
                  Standard low profile fit
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[7, 8, 9, 10, 11].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-full font-sans text-xs font-semibold border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-full bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 font-sans font-bold text-sm text-neutral-800 hover:bg-stone-50 rounded-l-full transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-sans font-medium text-xs text-neutral-900">
                    Qty: {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                    className="px-3.5 py-1.5 font-sans font-bold text-sm text-neutral-800 hover:bg-stone-50 rounded-r-full transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="flex-1 font-sans text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In stock • Ready to dispatch</span>
                </div>
              </div>

              {/* Add to Bag & Buy Now CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAdd}
                  className={`py-3.5 px-6 rounded-full font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all active:scale-95 cursor-pointer ${
                    addedToBag
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white hover:bg-stone-50 text-neutral-900 border-stone-300 shadow-sm hover:border-neutral-900'
                  }`}
                >
                  {addedToBag ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-neutral-800" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleInstantBuy}
                  className="py-3.5 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Instant Buy Now</span>
                </button>
              </div>
            </div>

            {/* Indian Pincode Delivery Estimator */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
              <span className="font-sans text-xs font-semibold text-stone-800 flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Check Delivery Pincode:</span>
              </span>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 110001, 400001, 560001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-full border border-stone-300 font-sans text-xs focus:border-neutral-900 focus:outline-none bg-stone-50"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-neutral-900 text-white font-sans text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div className={`mt-2.5 font-sans text-xs flex items-center gap-1.5 ${pincodeStatus.valid ? 'text-emerald-800 font-bold' : 'text-red-700'}`}>
                  {pincodeStatus.valid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span>✕</span>}
                  <span>{pincodeStatus.message}</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* LOWER SECTION: Archival Specs Sheet, Heritage, & Craftsmanship */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          
          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-stone-200 pb-4 mb-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-neutral-900'
              }`}
            >
              Material Specifications
            </button>
            <button
              onClick={() => setActiveTab('heritage')}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'heritage'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-neutral-900'
              }`}
            >
              1990 Heritage
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'care'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-neutral-900'
              }`}
            >
              Leather Care
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <span className="font-sans text-xs font-medium uppercase text-stone-400 block mb-1">Upper Construction</span>
                <h4 className="font-serif font-medium text-xl text-neutral-900 mb-2">Tumbled Ecru Cowhide</h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {currentShoe.specs?.upper}. Cut from thick full-grain hides with butter-soft rough-out suede mudguards that age with distinct character.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <span className="font-sans text-xs font-medium uppercase text-stone-400 block mb-1">Traction & Cupsole</span>
                <h4 className="font-serif font-medium text-xl text-neutral-900 mb-2">Amber Gum Rubber</h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {currentShoe.specs?.sole}. Authentic translucent gum formulation with micro-siping engineered for grip on Indian stone and asphalt.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <span className="font-sans text-xs font-medium uppercase text-stone-400 block mb-1">Metallic Accents</span>
                <h4 className="font-serif font-medium text-xl text-neutral-900 mb-2">Antique Brass Hardware</h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {currentShoe.specs?.hardware}. Non-corrosive solid brass eyelets and detachable "SB" monogram charm on ball chain.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <span className="font-sans text-xs font-medium uppercase text-stone-400 block mb-1">Subtle Artistry</span>
                <h4 className="font-serif font-medium text-xl text-neutral-900 mb-2">Hand-Stitched Morse</h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {currentShoe.specs?.embroidery}. Heavyweight waxed cotton thread hand-sewn along lower lateral profile in rhythmic tribal Morse strokes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <span className="font-sans text-xs font-medium uppercase text-stone-400 block mb-1">Collar & Tongue</span>
                <h4 className="font-serif font-medium text-xl text-neutral-900 mb-2">Terry Cotton Mesh</h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {currentShoe.specs?.lining}. Padded vintage sweatband collar prevents heel slip and maintains breathability under harsh Indian sun.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <span className="font-sans text-xs font-medium uppercase text-stone-400 block mb-1">Origin Guarantee</span>
                <h4 className="font-serif font-medium text-xl text-neutral-900 mb-2">Crafted in Bharat</h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {currentShoe.specs?.origin}. Hand-lasted in small artisan batches by master cobblers with three generations of terrace heritage.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'heritage' && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 font-sans text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              <h3 
                className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900"
              >
                The 1990 Terrace Sneaker Phenomenon
              </h3>
              <p>
                Before mass imports flooded Indian retail shelves, college terraces and street corners from Delhi’s North Campus to Mumbai’s Bandra Bandstand were defined by low-cut gum sneakers paired with raw baggy denim and washed oversized shirts.
              </p>
              <p>
                Sole Bharat was conceived to resurrect this exact era. We discarded all cheap synthetics and lightweight foam shortcuts. Instead, we preserved the authentic heavy-gauge tumbled leather, hand-stitched morse threads, and vulcanized natural gum rubber that gets softer, crease-patterned, and visibly better with every year of wear.
              </p>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-sm text-stone-600">
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h4 className="font-serif font-medium text-lg text-neutral-900 mb-2">1. Dry Brush Cleaning</h4>
                <p className="font-normal leading-relaxed text-xs sm:text-sm">Use a soft horsehair brush to wipe off dry dust from the suede mudguards after each terrace walk. Avoid soaking suede under running water.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h4 className="font-serif font-medium text-lg text-neutral-900 mb-2">2. Leather Balm</h4>
                <p className="font-normal leading-relaxed text-xs sm:text-sm">Apply natural beeswax or neutral leather cream every 3-4 months to keep the tumbled cowhide supple, water-resistant, and deeply hydrated.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h4 className="font-serif font-medium text-lg text-neutral-900 mb-2">3. Amber Gum Longevity</h4>
                <p className="font-normal leading-relaxed text-xs sm:text-sm">Natural gum rubber loves regular wear. Store in a cool, dry place away from direct high-heat radiators to maintain translucent gum grip.</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
