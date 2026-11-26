import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export default function Hero({ onShopClick }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-[#f7f3e8] via-[#f2ece0] to-[#eae2d0]">
      {/* Background decorative watermark */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/paper-texture.jpg')" }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-[#0c35dc] text-xs font-bold tracking-wide">
              <Award className="w-4 h-4 text-[#0c35dc]" />
              <span>THE NEW ERA OF INDIAN FOOTWEAR</span>
            </div>

            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-gray-900"
              style={{ fontFamily: '"Plus Jakarta Sans", "Fredoka", sans-serif' }}
            >
              Step Into <br />
              <span className="text-royal-texture inline-block">Bharat's Pride.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
              Rooted in Indian craftsmanship, engineered with aerospace-grade sole cushioning. 
              Designed for extreme comfort on Indian streets and global stages.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#collection"
                onClick={onShopClick}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0c35dc] hover:bg-[#082aa3] text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:gap-3 transition-all active:scale-95"
              >
                <span>Explore Sole Drops</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#story"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/70 hover:bg-white text-gray-800 font-semibold text-base border border-gray-300 backdrop-blur-sm transition-all"
              >
                The Sole Story
              </a>
            </div>

            {/* Value Props / Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-300/70">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <Truck className="w-4 h-4 text-[#0c35dc]" />
                <span>Express Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <RefreshCw className="w-4 h-4 text-[#0c35dc]" />
                <span>7-Day Free Exchange</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <ShieldCheck className="w-4 h-4 text-[#0c35dc]" />
                <span>1-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Circular Backdrop */}
              <div 
                className="absolute -inset-4 rounded-3xl bg-royal-texture opacity-90 blur-2xl transform -rotate-6"
                style={{ backgroundImage: "url('/assets/royal-blue-texture.jpg')" }}
              />

              {/* Shoe Card Display */}
              <div className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl p-6 shadow-2xl border border-white/60">
                <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-50 flex items-center justify-center group">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80" 
                    alt="Sole Bharat Flagship Shoe"
                    className="w-full h-full object-contain transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out drop-shadow-2xl"
                  />
                  <div className="absolute top-3 left-3 bg-[#0c35dc] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                    Flagship Drop
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 font-display">Sole Bharat Runner V1</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Dual-Density Nitrogen Foam • Royal Edition</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through block">₹4,999</span>
                    <span className="font-extrabold text-2xl text-[#0c35dc]">₹3,499</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

