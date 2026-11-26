import React from 'react';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function ReferenceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-[#f5f0e3] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-white/60 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#0c35dc]" />
            <h3 className="text-xl font-bold text-gray-900 font-display">
              User Design Reference & Assets
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-2">
          Here are your 3 provided reference images and how they were mapped to the live experience:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Reference 1: Layout */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#0c35dc] uppercase tracking-wider block mb-1">
                Pic 1: Animation Layout
              </span>
              <p className="text-xs text-gray-500 mb-3">
                "Sole Bharat" centered text + animated loading line + "100%." percentage.
              </p>
              <div className="rounded-xl overflow-hidden bg-gray-950 aspect-video flex items-center justify-center border border-gray-800">
                <img 
                  src="/assets/reference.png" 
                  alt="Reference 1 layout" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="mt-3 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md text-center">
              ✓ Fully implemented in animation
            </div>
          </div>

          {/* Reference 2: Background Texture */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#0c35dc] uppercase tracking-wider block mb-1">
                Pic 2: Background Texture
              </span>
              <p className="text-xs text-gray-500 mb-3">
                Crumpled vintage parchment paper applied as full-screen background.
              </p>
              <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center border border-gray-200">
                <img 
                  src="/assets/paper-texture.jpg" 
                  alt="Paper texture" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-3 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md text-center">
              ✓ Applied as screen background
            </div>
          </div>

          {/* Reference 3: Royal Blue Texture */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#0c35dc] uppercase tracking-wider block mb-1">
                Pic 3: Royal Blue Color
              </span>
              <p className="text-xs text-gray-500 mb-3">
                Vibrant royal blue watercolor applied to "Sole Bharat", line, & numbers.
              </p>
              <div className="rounded-xl overflow-hidden bg-blue-900 aspect-video flex items-center justify-center border border-gray-200">
                <img 
                  src="/assets/royal-blue-texture.jpg" 
                  alt="Royal blue texture" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-3 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md text-center">
              ✓ Applied via CSS background-clip
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#0c35dc] text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Got it, looks great!
          </button>
        </div>
      </div>
    </div>
  );
}

