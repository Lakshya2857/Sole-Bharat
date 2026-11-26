# 👟 Sole Bharat — 1990 Classic Terrace Footwear Store

A full-fledged, high-performance 90s retro sneaker brand web application built with **React.js (Vite)** on the frontend and **Node.js (Express)** on the backend.

---

## 🎨 Design & Experience Features

1. **Unified 90s Archival Loading Screen**:
   - Matches the homepage aesthetic with an ecru/cream graph paper grid (`#f4eee1`).
   - "ARCHIVE ISSUE 01 // AUTUMN 1990" stamp and authentic barcode.
   - Deep royal blue print brand title: **Sole Bharat**.
   - Smooth animated rule line filling from 0% to 100% with live `100%.` counter.

2. **Top-Mounted Continuous Looping Video**:
   - Positioned directly below the header banner.
   - Web-optimized FastStart MP4 encoding for instant loading without buffering.
   - **Audio ON by default**.
   - **Permanent seamless repeat loop (`loop={true}`)** running continuously in the background.
   - 90s VHS Camcorder HUD (`LIVE ● 1990`, audio status indicator).

3. **The 4 Official 1990 Terrace Colorways**:
   - **Heritage Maroon (`SB-90-MRN`)**: Vintage cream tumbled leather, oxblood wave stripe, raw suede mudguard, amber gum sole.
   - **Retro Azure (`SB-90-BLU`)**: Sky-blue leather wave paneling, cream perforated toe box, and sky-blue "SB" charm.
   - **Vintage Olive (`SB-90-GRN`)**: Earthy sage green wave stripe, military olive collar lining, and gold "S" emblem.
   - **Mocha Gum (`SB-90-BRN`)**: Deep roasted espresso leather stripe with chocolate collar lining.

4. **Deconstructed Terrace 1990 Anatomy**:
   - Interactive blueprint highlighting 6 numbered craftsmanship hotspots:
     1. Debossed Suede Heel Counter
     2. Hand-Embroidered Morse Code Stitches
     3. Retro Wave Leather Stripe with Gold "S" Crest
     4. Detachable Brass "SB" Tag Charm & Eyelets
     5. Perforated Tumbled Leather Toe
     6. Translucent Amber Gum Rubber Cupsole

5. **Street Lookbook & Order Tracking**:
   - 35mm polaroid editorial gallery from Delhi, Mumbai, Bengaluru, and Jaipur.
   - Real-time order tracking teletype connected to `GET /api/orders/:id`.

6. **E-Commerce Bag & Checkout**:
   - Interactive slide-over cart with coupon codes (`BHARAT10`, `RETRO90`).
   - 90s order slip checkout with UPI, Card, and Cash on Delivery (COD) connected to `POST /api/orders`.

---

## 🚀 Running the Project

### Frontend (React + Vite):
```bash
npm run client
# Or: cd client && npm run dev
```
Available at: **[http://localhost:3000](http://localhost:3000)**

### Backend (Node.js + Express):
```bash
npm run server
# Or: cd server && node server.js
```
Available at: **[http://localhost:5050](http://localhost:5050)**  
API endpoints:
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/:id`
# Sole-Bharat
