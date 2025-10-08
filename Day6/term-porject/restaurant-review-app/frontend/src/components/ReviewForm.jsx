import { useState } from 'react';
import { addReview } from '../services/api';

function ReviewForm({ restaurantId, onReviewAdded }) {
  // ========================================
  // State สำหรับฟอร์มรีวิว
  // ========================================
  const [formData, setFormData] = useState({
    userName: '',
    rating: 5,
    comment: '',
    visitDate: new Date().toISOString().split('T')[0] // กำหนดวันที่ปัจจุบันเป็น default
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // ========================================
  // ฟังก์ชันตรวจสอบความถูกต้องของฟอร์ม
  // ========================================
  const validateForm = () => {
    const newErrors = {};

    // --- ตรวจสอบชื่อผู้ใช้ (2-50 ตัวอักษร)
    if (!formData.userName.trim()) {
      newErrors.userName = 'กรุณากรอกชื่อ';
    } else if (formData.userName.trim().length < 2) {
      newErrors.userName = 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
    } else if (formData.userName.trim().length > 50) {
      newErrors.userName = 'ชื่อต้องไม่เกิน 50 ตัวอักษร';
    }

    // --- ตรวจสอบ rating (1-5)
    const ratingNum = parseInt(formData.rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      newErrors.rating = 'คะแนนต้องอยู่ระหว่าง 1-5';
    }

    // --- ตรวจสอบ comment (10-500 ตัวอักษร)
    if (!formData.comment.trim()) {
      newErrors.comment = 'กรุณากรอกความคิดเห็น';
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = 'ความคิดเห็นต้องมีอย่างน้อย 10 ตัวอักษร';
    } else if (formData.comment.trim().length > 500) {
      newErrors.comment = 'ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // ฟังก์ชัน submit form
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ ตรวจสอบความถูกต้องก่อนส่ง
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // 2️⃣ เรียก API เพื่อเพิ่มรีวิว
      const result = await addReview({
        restaurantId,
        ...formData,
        rating: parseInt(formData.rating)
      });

      // 3️⃣ ถ้าสำเร็จ
      if (result.success) {
        alert('เพิ่มรีวิวสำเร็จ! ขอบคุณสำหรับความคิดเห็น');

        // รีเซ็ตฟอร์ม
        setFormData({
          userName: '',
          rating: 5,
          comment: '',
          visitDate: new Date().toISOString().split('T')[0]
        });
        setErrors({});

        // เรียก callback เพื่อ refresh รีวิว
        if (onReviewAdded) onReviewAdded();
      }

    } catch (error) {
      console.error('Error adding review:', error);
      alert(error.message || 'เกิดข้อผิดพลาดในการส่งรีวิว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-form" style={{
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(8px)',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      marginTop: '2rem',
      animation: 'fadeIn 0.8s ease'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>📝 เขียนรีวิว</h3>

      <form onSubmit={handleSubmit}>
        {/* ชื่อผู้ใช้ */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label>ชื่อของคุณ *</label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => setFormData({...formData, userName: e.target.value})}
            placeholder="กรอกชื่อ-นามสกุล"
            className={errors.userName ? 'invalid' : ''}
          />
          {errors.userName && <span className="error">{errors.userName}</span>}
        </div>

        {/* Rating */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label>คะแนน *</label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
            className={errors.rating ? 'invalid' : ''}
          >
            <option value="5">⭐⭐⭐⭐⭐ ดีเยี่ยม</option>
            <option value="4">⭐⭐⭐⭐ ดีมาก</option>
            <option value="3">⭐⭐⭐ ดี</option>
            <option value="2">⭐⭐ พอใช้</option>
            <option value="1">⭐ ต้องปรับปรุง</option>
          </select>
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>

        {/* Comment */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label>ความคิดเห็น *</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            placeholder="เล่าประสบการณ์การทานอาหารที่ร้านนี้... (อย่างน้อย 10 ตัวอักษร)"
            rows="4"
            className={errors.comment ? 'invalid' : ''}
          />
          <div className="char-count" style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
            {formData.comment.length}/500 ตัวอักษร
          </div>
          {errors.comment && <span className="error">{errors.comment}</span>}
        </div>

        {/* Visit Date */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label>วันที่เข้าร้าน</label>
          <input
            type="date"
            value={formData.visitDate}
            onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={submitting} style={{
          padding: '0.75rem 1.75rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(102,126,234,0.25)',
          transition: 'all 0.3s ease'
        }}>
          {submitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
