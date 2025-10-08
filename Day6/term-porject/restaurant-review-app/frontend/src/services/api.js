const API_URL = 'http://localhost:3000/api';

/**
 * ฟังก์ชันสำหรับดึงรายการร้านอาหารทั้งหมด พร้อม filtering
 * @param {Object} filters - ตัวกรอง { search, category, minRating, priceRange }
 * @returns {Promise<Object>} - ข้อมูลร้านอาหาร
 */
export const getRestaurants = async (filters = {}) => {
  try {
    // 1️⃣ สร้าง query string จาก filters
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.minRating) queryParams.append('minRating', filters.minRating);
    if (filters.priceRange) queryParams.append('priceRange', filters.priceRange);

    // 2️⃣ สร้าง URL พร้อม query string
    const url = `${API_URL}/restaurants?${queryParams.toString()}`;

    // 3️⃣ Fetch ข้อมูลจาก API
    const response = await fetch(url);

    // 4️⃣ ตรวจสอบ response
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }

    // 5️⃣ แปลง response เป็น JSON และ return
    return await response.json();

  } catch (error) {
    console.error('API Error [getRestaurants]:', error);
    throw error;
  }
};

/**
 * ฟังก์ชันสำหรับดึงข้อมูลร้านอาหารตาม ID พร้อมรีวิว
 * @param {number} id - รหัสร้าน
 * @returns {Promise<Object>} - ข้อมูลร้านและรีวิว
 */
export const getRestaurantById = async (id) => {
  try {
    // 6️⃣ สร้าง URL endpoint สำหรับร้านตาม ID
    const url = `${API_URL}/restaurants/${id}`;

    // Fetch ข้อมูล
    const response = await fetch(url);

    // ตรวจสอบ response
    if (!response.ok) {
      throw new Error(`Failed to fetch restaurant with ID ${id}`);
    }

    // Return JSON
    return await response.json();

  } catch (error) {
    console.error('API Error [getRestaurantById]:', error);
    throw error;
  }
};

/**
 * ฟังก์ชันสำหรับเพิ่มรีวิวใหม่
 * @param {Object} reviewData - ข้อมูลรีวิว
 * @returns {Promise<Object>} - ผลลัพธ์การเพิ่มรีวิว
 */
export const addReview = async (reviewData) => {
  try {
    // 7️⃣ POST request เพื่อเพิ่มรีวิว
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });

    // 8️⃣ ตรวจสอบ response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add review');
    }

    // 9️⃣ Return ข้อมูล JSON ของรีวิวและร้านที่อัพเดทแล้ว
    return await response.json();

  } catch (error) {
    console.error('API Error [addReview]:', error);
    throw error;
  }
};
