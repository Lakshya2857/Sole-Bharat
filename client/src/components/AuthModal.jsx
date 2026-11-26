import React, { useState, useEffect } from 'react';
import { 
  X, User, Mail, Lock, ArrowRight, ShieldCheck, Camera, Image as ImageIcon, 
  Sparkles, Check, AtSign, Eye, EyeOff 
} from 'lucide-react';

// Preset Archival Avatars
const PRESET_AVATARS = [
  { id: 'av-1', name: 'Terrace Cap', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-2', name: '90s Archival', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-3', name: 'Vintage Artisan', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-4', name: 'Sole Collector', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
];

// Preset Vintage Cover Banners
const PRESET_COVERS = [
  { id: 'cov-1', name: 'Warm Terracotta', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80' },
  { id: 'cov-2', name: 'Artisan Workshop', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80' },
  { id: 'cov-3', name: 'Vintage Stadium', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80' },
];

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    avatar: PRESET_AVATARS[0].url,
    coverImage: PRESET_COVERS[0].url,
    // Address defaults
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [avatarTab, setAvatarTab] = useState('preset'); // 'preset' | 'upload' | 'url'
  const [coverTab, setCoverTab] = useState('preset'); // 'preset' | 'upload' | 'url'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form status when opened
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  // Handle Avatar file upload
  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Cover image file upload
  const handleCoverFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setError('Please enter your email/username and password.');
        return;
      }
    } else {
      if (!formData.username.trim()) {
        setError('Please enter a username.');
        return;
      }
      if (!formData.fullname.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!formData.email.trim()) {
        setError('Please enter your email.');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    }

    setLoading(true);

    // Frontend authentication simulation
    // Prepared to plug in your live backend API: fetch('http://localhost:8000/api/v1/users/...')
    setTimeout(() => {
      setLoading(false);
      
      const cleanUsername = formData.username.trim().replace(/^@/, '') || formData.email.split('@')[0];
      const newUser = {
        userName: cleanUsername,
        username: cleanUsername,
        fullname: formData.fullname.trim() || cleanUsername,
        name: formData.fullname.trim() || cleanUsername,
        email: formData.email.trim(),
        avatar: formData.avatar,
        coverImage: formData.coverImage,
        address: {
          houseNo: formData.houseNo.trim() || 'Flat 402, Block C',
          street: formData.street.trim() || 'Royal Residency, Indiranagar',
          city: formData.city.trim() || 'Bengaluru',
          state: formData.state.trim() || 'Karnataka',
          pinCode: formData.pincode.trim() || '560038',
          pincode: formData.pincode.trim() || '560038',
        },
        orders: [],
        wishList: [],
        wishlist: [],
        cart: [],
      };

      try {
        localStorage.setItem('sole_bharat_user', JSON.stringify(newUser));
      } catch (err) {}

      if (onAuthSuccess) {
        onAuthSuccess(newUser);
      }
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#faf8f5] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-stone-200/90 shadow-2xl z-10 overflow-hidden max-h-[92vh] overflow-y-auto selection:bg-yellow-300 selection:text-black animate-modalPop transform-gpu">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-500 block mb-1">
            Sole Bharat Archive // 1990
          </span>
          <h2 className="text-3xl font-serif font-normal text-neutral-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Terrace Account'}
          </h2>
          <p className="text-xs font-sans text-stone-600 mt-1.5">
            {mode === 'login' 
              ? 'Access your orders, saved silhouettes in wishlist & bag' 
              : 'Join the community of authentic 1990 Indian terrace culture'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-full bg-stone-200/70 p-1 mb-6 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 py-2 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans font-medium">
            {error}
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          
          {/* ============ SIGN UP SPECIFIC: COVER IMAGE & AVATAR ============ */}
          {mode === 'signup' && (
            <div className="space-y-4 pb-4 border-b border-stone-200/80">
              
              {/* Profile Banner & Avatar Preview Card */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 bg-stone-100 shadow-sm">
                {/* Cover Image Banner Preview */}
                <div className="h-28 sm:h-32 w-full relative bg-stone-300 overflow-hidden">
                  {formData.coverImage ? (
                    <img 
                      src={formData.coverImage} 
                      alt="Profile Cover Banner" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                      No cover image selected
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium">
                    Cover Banner Preview
                  </span>
                </div>

                {/* Avatar Preview overlapping banner */}
                <div className="px-4 pb-4 pt-0 relative flex items-end gap-3 -mt-10">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 border-[#faf8f5] shadow-md overflow-hidden bg-white shrink-0">
                    {formData.avatar ? (
                      <img 
                        src={formData.avatar} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-500 font-bold">
                        SB
                      </div>
                    )}
                  </div>
                  <div className="pb-1">
                    <span className="font-semibold text-sm text-neutral-900 block truncate">
                      {formData.fullname || 'Your Full Name'}
                    </span>
                    <span className="text-xs text-stone-500 block truncate">
                      @{formData.username.replace(/^@/, '') || 'username'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image Selection Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
                    <span>Profile Cover Image</span>
                  </label>
                  <div className="flex gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setCoverTab('preset')}
                      className={`px-2 py-0.5 rounded ${coverTab === 'preset' ? 'bg-neutral-900 text-white' : 'text-stone-600 hover:text-black'}`}
                    >
                      Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverTab('upload')}
                      className={`px-2 py-0.5 rounded ${coverTab === 'upload' ? 'bg-neutral-900 text-white' : 'text-stone-600 hover:text-black'}`}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverTab('url')}
                      className={`px-2 py-0.5 rounded ${coverTab === 'url' ? 'bg-neutral-900 text-white' : 'text-stone-600 hover:text-black'}`}
                    >
                      URL
                    </button>
                  </div>
                </div>

                {coverTab === 'preset' && (
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_COVERS.map((cov) => (
                      <button
                        key={cov.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, coverImage: cov.url }))}
                        className={`h-12 rounded-xl overflow-hidden border relative group transition-all cursor-pointer ${
                          formData.coverImage === cov.url ? 'ring-2 ring-neutral-900 border-transparent' : 'border-stone-300 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={cov.url} alt={cov.name} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-medium">
                          {cov.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {coverTab === 'upload' && (
                  <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-stone-300 rounded-xl bg-white hover:bg-stone-50 cursor-pointer text-xs text-stone-600 transition-colors">
                    <Camera className="w-4 h-4 text-stone-500" />
                    <span>Upload Cover Photo (JPG/PNG)</span>
                    <input type="file" accept="image/*" onChange={handleCoverFile} className="hidden" />
                  </label>
                )}

                {coverTab === 'url' && (
                  <input
                    type="url"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-cover.jpg"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                  />
                )}
              </div>

              {/* Avatar Selection Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-600" />
                    <span>User Avatar Photo</span>
                  </label>
                  <div className="flex gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setAvatarTab('preset')}
                      className={`px-2 py-0.5 rounded ${avatarTab === 'preset' ? 'bg-neutral-900 text-white' : 'text-stone-600 hover:text-black'}`}
                    >
                      Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarTab('upload')}
                      className={`px-2 py-0.5 rounded ${avatarTab === 'upload' ? 'bg-neutral-900 text-white' : 'text-stone-600 hover:text-black'}`}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarTab('url')}
                      className={`px-2 py-0.5 rounded ${avatarTab === 'url' ? 'bg-neutral-900 text-white' : 'text-stone-600 hover:text-black'}`}
                    >
                      URL
                    </button>
                  </div>
                </div>

                {avatarTab === 'preset' && (
                  <div className="flex items-center gap-2.5">
                    {PRESET_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, avatar: av.url }))}
                        className={`w-11 h-11 rounded-full overflow-hidden border transition-all cursor-pointer ${
                          formData.avatar === av.url ? 'ring-2 ring-neutral-900 scale-110' : 'border-stone-300 opacity-70 hover:opacity-100'
                        }`}
                        title={av.name}
                      >
                        <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {avatarTab === 'upload' && (
                  <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-stone-300 rounded-xl bg-white hover:bg-stone-50 cursor-pointer text-xs text-stone-600 transition-colors">
                    <Camera className="w-4 h-4 text-stone-500" />
                    <span>Upload Avatar Image (JPG/PNG)</span>
                    <input type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" />
                  </label>
                )}

                {avatarTab === 'url' && (
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-avatar.jpg"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                  />
                )}
              </div>

            </div>
          )}

          {/* ============ USER CREDENTIALS ============ */}
          {mode === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Username */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Username *
                </label>
                <div className="relative">
                  <AtSign className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g. lakshya_90"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullname"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="e.g. Lakshya Sangwan"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {mode === 'login' ? 'Email or Username *' : 'Email Address *'}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={mode === 'login' ? 'name@example.com or @username' : 'name@example.com'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:border-neutral-900 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ============ SIGN UP OPTIONAL: SHIPPING ADDRESS ============ */}
          {mode === 'signup' && (
            <div className="pt-2 border-t border-stone-200/80 space-y-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                Default Delivery Address (House No, City, State, PIN)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  placeholder="House / Flat / Floor No."
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street / Colony / Landmark"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City (e.g. Delhi)"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State (e.g. Delhi)"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="PIN Code"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>
          )}

          {/* Login Helpers */}
          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs text-stone-500">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-stone-300 accent-neutral-900" />
                <span>Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => setError('Password reset will be sent to your registered email.')}
                className="hover:underline text-stone-700 font-medium"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-600 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In To Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
              </>
            )}
          </button>
        </form>

        {/* Footnote */}
        <div className="mt-5 pt-3 border-t border-stone-200/70 flex items-center justify-center gap-1.5 text-[11px] font-sans text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>Compatible with user.model.js (Full Name, Username, Email, Avatar, Cover)</span>
        </div>

      </div>
    </div>
  );
}
