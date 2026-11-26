const API_BASE_URL = 'http://localhost:5050/api';

export async function fetchProducts({ category = 'All', search = '', sort = '' } = {}) {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch from backend API');
    return await res.json();
  } catch (err) {
    console.warn('API error, falling back to local dataset:', err);
    return null;
  }
}

export async function submitOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Order submission failed');
    return await res.json();
  } catch (err) {
    console.warn('API order error, using local fallback:', err);
    return {
      success: true,
      order: {
        orderId: 'SB-' + Math.floor(100000 + Math.random() * 900000),
        estimatedDelivery: '3 to 4 business days',
        ...orderData,
      },
    };
  }
}

export async function subscribeNewsletter(email) {
  try {
    const res = await fetch(`${API_BASE_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      message: `Welcome to Sole Bharat Club! Code: BHARAT10`,
      couponCode: 'BHARAT10',
    };
  }
}

