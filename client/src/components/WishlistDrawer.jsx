import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  items = [],
  onRemoveItem,
  onMoveToCart,
  onOpenProduct,
}) {
  if (!isOpen) return null;

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
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <h2 className="text-2xl font-serif font-normal text-neutral-900">
                  Saved Wishlist
                </h2>
                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200">
                  {items.length} {items.length === 1 ? 'PAIR' : 'PAIRS'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Your archival shortlist from the 1990 drop
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-200/60 flex items-center justify-center mx-auto text-stone-400">
                  <Heart className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-neutral-900">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                    Click the heart icon on any archival sneaker silhouette to save it to your wishlist.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((shoe) => (
                <div
                  key={shoe.id}
                  className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex gap-4 items-center group transition-all hover:border-stone-400"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => { onClose(); if (onOpenProduct) onOpenProduct(shoe); }}
                    className="w-20 h-20 rounded-xl bg-[#f4f0eb] border border-stone-200/60 p-2 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: shoe.accentHex }}
                      />
                      <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-stone-500">
                        {shoe.shortName}
                      </span>
                    </div>

                    <h4
                      onClick={() => { onClose(); if (onOpenProduct) onOpenProduct(shoe); }}
                      className="font-serif text-base font-medium text-neutral-900 truncate cursor-pointer hover:underline"
                    >
                      {shoe.name}
                    </h4>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs text-stone-400 line-through">
                        ₹{shoe.originalPrice?.toLocaleString('en-IN')}
                      </span>
                      <span className="font-serif text-sm font-bold text-neutral-900">
                        ₹{shoe.price?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(shoe.id)}
                      className="p-1.5 rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onMoveToCart(shoe)}
                      className="px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                      title="Move to Bag"
                    >
                      <ShoppingBag className="w-3 h-3 text-stone-300" />
                      <span>Move</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200/80 bg-white">
              <button
                onClick={() => {
                  items.forEach((item) => onMoveToCart(item));
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Move All to Shopping Bag</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

