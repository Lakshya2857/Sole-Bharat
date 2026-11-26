import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Sole Bharat Real Shoes Database (1990 Terrace Sneaker Drop)
const SHOES = [
  {
    id: 'sb-90-maroon',
    code: 'SB-90-MRN',
    name: "Sole Bharat '90 Classic — Heritage Maroon",
    shortName: 'Heritage Maroon',
    category: 'Terrace Sneaker',
    tag: 'Original 1990 Drop',
    price: 3999,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 640,
    stock: 25,
    accentHex: '#6d1f34',
    image: '/assets/shoes_png/sole-bharat-maroon.png',
    color: 'Cream / Heritage Maroon / Gum',
    sizes: [7, 8, 9, 10, 11],
    description: 'The defining silhouette of 90s Indian street style. Crafted from full-grain tumbled ecru leather, butter-soft suede mudguards, deep maroon wave stripe, antique brass eyelets, and the signature amber gum rubber sole.',
    specs: {
      upper: 'Full-Grain Tumbled Cowhide + Raw Suede Mudguard',
      sole: 'Translucent Amber Gum Rubber Cupsole',
      lining: 'Breathable Padded Mesh Collar (Maroon)',
      hardware: 'Antique Brass Eyelets & Detachable "SB" Charm',
      embroidery: 'Hand-Finished Morse-Code Lateral Stitching',
      origin: '100% Handcrafted in Bharat',
    },
  },
  {
    id: 'sb-90-blue',
    code: 'SB-90-BLU',
    name: "Sole Bharat '90 Classic — Retro Azure",
    shortName: 'Retro Azure',
    category: 'Terrace Sneaker',
    tag: 'Trending Colorway',
    price: 3999,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 512,
    stock: 18,
    accentHex: '#4b8eb2',
    image: '/assets/shoes_png/sole-bharat-blue.png',
    color: 'Cream / Sky Blue / Gum',
    sizes: [7, 8, 9, 10, 11],
    description: 'Cool vintage vibes for warm summer afternoons. Features ice-blue leather wave paneling, cream perforated toe box, sky-blue branded "SB" pendant, and contrast cross-stitches on the heel.',
    specs: {
      upper: 'Full-Grain Tumbled Cowhide + Raw Suede Mudguard',
      sole: 'Translucent Amber Gum Rubber Cupsole',
      lining: 'Breathable Padded Mesh Collar (Azure)',
      hardware: 'Antique Brass Eyelets & Detachable "SB" Charm',
      embroidery: 'Hand-Finished Morse-Code Lateral Stitching',
      origin: '100% Handcrafted in Bharat',
    },
  },
  {
    id: 'sb-90-green',
    code: 'SB-90-GRN',
    name: "Sole Bharat '90 Classic — Vintage Olive",
    shortName: 'Vintage Olive',
    category: 'Terrace Sneaker',
    tag: 'Archival Issue',
    price: 3999,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 428,
    stock: 14,
    accentHex: '#506e57',
    image: '/assets/shoes_png/sole-bharat-green.png',
    color: 'Cream / Sage Green / Gum',
    sizes: [7, 8, 9, 10, 11],
    description: 'An earthy homage to timeless terrace culture. Sage green leather wave with military-inspired olive collar, gold-tone "S" crest on the side panel, and archival gum grip.',
    specs: {
      upper: 'Full-Grain Tumbled Cowhide + Raw Suede Mudguard',
      sole: 'Translucent Amber Gum Rubber Cupsole',
      lining: 'Breathable Padded Mesh Collar (Olive)',
      hardware: 'Antique Brass Eyelets & Detachable "SB" Charm',
      embroidery: 'Hand-Finished Morse-Code Lateral Stitching',
      origin: '100% Handcrafted in Bharat',
    },
  },
  {
    id: 'sb-90-brown',
    code: 'SB-90-BRN',
    name: "Sole Bharat '90 Classic — Mocha Gum",
    shortName: 'Mocha Gum',
    category: 'Terrace Sneaker',
    tag: 'Limited Edition',
    price: 3999,
    originalPrice: 5999,
    rating: 5.0,
    reviews: 389,
    stock: 10,
    accentHex: '#513629',
    image: '/assets/shoes_png/sole-bharat-brown.png',
    color: 'Cream / Espresso Mocha / Gum',
    sizes: [7, 8, 9, 10, 11],
    description: 'Rich dark espresso leather wave matched with deep cocoa padded lining. The ultimate versatile 90s low-profile sneaker that looks better with every crease and wear.',
    specs: {
      upper: 'Full-Grain Tumbled Cowhide + Raw Suede Mudguard',
      sole: 'Translucent Amber Gum Rubber Cupsole',
      lining: 'Breathable Padded Mesh Collar (Mocha)',
      hardware: 'Antique Brass Eyelets & Detachable "SB" Charm',
      embroidery: 'Hand-Finished Morse-Code Lateral Stitching',
      origin: '100% Handcrafted in Bharat',
    },
  },
];

// In-Memory Orders Store
const ORDERS = [];

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Sole Bharat API',
    version: '2.0.0',
    productsCount: SHOES.length,
    ordersCount: ORDERS.length,
    timestamp: new Date().toISOString(),
  });
});

// Products API
app.get('/api/products', (req, res) => {
  const { search, sort } = req.query;
  let results = [...SHOES];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.color.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  }

  res.json(results);
});

// Single Product Details
app.get('/api/products/:id', (req, res) => {
  const product = SHOES.find((s) => s.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Shoe not found' });
  }
  res.json(product);
});

// Create Order API
app.post('/api/orders', (req, res) => {
  const { items, customer, paymentMethod, totalAmount } = req.body;

  if (!items || !items.length || !customer || !customer.name || !customer.phone) {
    return res.status(400).json({ error: 'Missing required order fields.' });
  }

  const orderId = 'SB90-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    orderId,
    items,
    customer,
    paymentMethod: paymentMethod || 'UPI',
    totalAmount: totalAmount || items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0),
    status: 'Order Placed',
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }),
    createdAt: new Date().toISOString(),
  };

  ORDERS.push(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully! Welcome to the Sole Bharat archive.',
    order: newOrder,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Sole Bharat Backend Server running on port ${PORT}`);
});
