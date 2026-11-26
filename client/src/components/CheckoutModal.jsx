import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, CreditCard, Smartphone, Banknote, Sparkles, MapPin, User, Mail, Phone, Printer, Award } from 'lucide-react';
import { submitOrder } from '../services/api';

export default function CheckoutModal({ isOpen, onClose, checkoutData, onOrderSuccess, currentUser = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Initialize or autofill with currentUser if available
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || currentUser.fullname || currentUser.name || '',
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phone || '',
        houseNo: prev.houseNo || currentUser.address?.houseNo || '',
        street: prev.street || currentUser.address?.street || '',
        city: prev.city || currentUser.address?.city || '',
        state: prev.state || currentUser.address?.state || '',
        pincode: prev.pincode || currentUser.address?.pinCode || currentUser.address?.pincode || '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || 'Aarav Sharma',
        phone: prev.phone || '9876543210',
        email: prev.email || 'aarav@example.com',
        houseNo: prev.houseNo || 'Flat 402, Block C',
        street: prev.street || 'Royal Residency, Indiranagar',
        city: prev.city || 'Bengaluru',
        state: prev.state || 'Karnataka',
        pincode: prev.pincode || '560038',
      }));
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullAddress = `${formData.houseNo}, ${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

    const payload = {
      items: (checkoutData?.items || []).map((item) => ({
        ...item,
        product: item.id,
        size: item.selectedSize || 8,
        selectedSize: item.selectedSize || 8,
        quantity: item.quantity || 1,
      })),
      customer: {
        ...formData,
        pinCode: formData.pincode,
        address: fullAddress,
      },
      paymentMethod,
      totalAmount: checkoutData?.finalTotal || 0,
    };

    const res = await submitOrder(payload);
    setIsSubmitting(false);

    if (res && res.success) {
      setConfirmedOrder(res.order);
      if (onOrderSuccess) onOrderSuccess(res.order);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#faf8f5] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200/90 max-h-[92vh] overflow-y-auto z-10 selection:bg-yellow-300 selection:text-black animate-modalPop transform-gpu">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ORDER CONFIRMATION: Authentic 1990 Bhiwani Workshop Dispatch Manifest */}
        {confirmedOrder ? (
          <div className="py-4 space-y-4 animate-fade-in">
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase block mb-1">
                Order Confirmed
              </span>
              <h3 className="text-2xl font-serif text-neutral-900">
                Waybill #{confirmedOrder.orderId || '7842'}
              </h3>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-xs text-neutral-900 space-y-3.5">
              <div className="text-center border-b border-stone-200 pb-3">
                <span className="font-serif text-base font-semibold">Sole Bharat</span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">
                  1990 Terrace Footwear • Bhiwani, Haryana
                </p>
              </div>

              <div className="space-y-1.5 py-1 text-[11px] border-b border-stone-100">
                <div className="flex justify-between">
                  <span className="text-stone-500">Consignee</span>
                  <span className="font-medium text-neutral-900">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Destination</span>
                  <span className="font-medium text-stone-700 text-right max-w-[220px]">
                    {formData.houseNo}, {formData.street}, {formData.city} — {formData.pincode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment</span>
                  <span className="font-medium">{paymentMethod}</span>
                </div>
              </div>

              <div className="space-y-1 text-[11px] border-b border-stone-100 pb-2.5">
                {(checkoutData?.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-stone-700 truncate max-w-[220px]">
                      {item.shortName || item.name} (UK {item.selectedSize || 8})
                    </span>
                    <span className="font-medium">₹{((item.price || 3999) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm pt-0.5">
                <span className="font-medium text-stone-600">Total</span>
                <span className="font-serif font-bold text-lg text-neutral-900">
                  ₹{confirmedOrder.totalAmount?.toLocaleString('en-IN') || checkoutData?.finalTotal?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-neutral-900 border border-stone-200 font-sans text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-stone-600" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-medium text-stone-500 block mb-1">
                Express Cargo Checkout
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900">
                Delivery Details & Payment
              </h3>
            </div>

            {/* Customer Contact */}
            <div className="space-y-3 font-sans">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                1. Contact Information
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Lakshya Sangwan"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Phone (+91) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Address Details with House No, Street, City, State, PIN Code */}
            <div className="space-y-3 font-sans pt-3 border-t border-stone-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                  2. Shipping Address
                </span>
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  All-India Delivery
                </span>
              </div>

              {/* House No / Flat / Floor */}
              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  House / Flat / Floor / Building No. *
                </label>
                <input
                  type="text"
                  name="houseNo"
                  required
                  value={formData.houseNo}
                  onChange={handleChange}
                  placeholder="e.g. Flat 402, Block C, Maple Heights"
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              {/* Street / Colony / Landmark */}
              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Street / Area / Colony / Landmark *
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="e.g. 12th Main Road, Near Metro Station"
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              {/* City, State, PIN Code in 3-col grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Karnataka"
                    className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    pattern="\d{6}"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN"
                    className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-3 border-t border-stone-200/80 font-sans">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                3. Payment Method
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'UPI'
                      ? 'border-neutral-900 bg-stone-100 ring-1 ring-neutral-900'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-neutral-900" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 block">Instant UPI</span>
                    <span className="text-[10px] text-stone-500">GPay, PhonePe</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'Card'
                      ? 'border-neutral-900 bg-stone-100 ring-1 ring-neutral-900'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-neutral-900" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 block">Cards / Net</span>
                    <span className="text-[10px] text-stone-500">Visa, RuPay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'border-neutral-900 bg-stone-100 ring-1 ring-neutral-900'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-neutral-900" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 block">COD</span>
                    <span className="text-[10px] text-stone-500">Cash on Delivery</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Total & Submit */}
            <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-sans text-stone-500 block">Amount to Pay</span>
                <span className="text-2xl font-serif font-bold text-neutral-900">
                  ₹{checkoutData?.finalTotal?.toLocaleString('en-IN') || 0}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Securing Order...' : 'Confirm Order →'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
