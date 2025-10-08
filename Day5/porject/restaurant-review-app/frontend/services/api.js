const API_URL = 'http://localhost:3000/api';
/**
 * ฟังก์ชันสำหรับดึงรายการร้านอาหารทั้งหมด พร้อม filtering
 * @param {Object} filters - ตัวกรอง { search, category, minRating, priceRange }
*/

async function handleFetch(url, opts = {}) {
  const response = await fetch(url, { signal: opts.signal });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json();
}

export const getRestaurants = async (filters = {}, opts = {}) => {
  const q = new URLSearchParams();
  if (filters.search) q.append('search', filters.search);
  if (filters.category) q.append('category', filters.category);
  if (filters.minRating) q.append('minRating', filters.minRating);
  if (filters.priceRange) q.append('priceRange', filters.priceRange);
  const url = `${API_URL}/restaurants?${q.toString()}`;
  return handleFetch(url, opts);
};

export const getRestaurantById = async (id, opts = {}) => {
  return handleFetch(`${API_URL}/restaurants/${id}`, opts);
};

export const getReviewsByRestaurant = async (restaurantId, opts = {}) => {
  return handleFetch(`${API_URL}/reviews/${restaurantId}`, opts);
};

export const addReview = async (reviewData, opts = {}) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
    signal: opts.signal
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to add review');
  }
  return response.json();
};

export const getStats = async (opts = {}) => {
  return handleFetch(`${API_URL}/stats`, opts);
};

export const getRestaurantsByCategory = async (category, opts = {}) => {
  return handleFetch(`${API_URL}/restaurants/category/${encodeURIComponent(category)}`, opts);
};

export const getRandomRestaurant = async (opts = {}) => {
  return handleFetch(`${API_URL}/restaurants/random`, opts);
};