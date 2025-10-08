import { useState, useEffect } from 'react';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import './App.css';

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectRestaurant = (id) => {
    setSelectedRestaurantId(id);
    setShowStats(false);
  };

  const handleBack = () => {
    setSelectedRestaurantId(null);
  };

  const handleBackToList = () => {
    setSelectedRestaurantId(null);
    setShowStats(false);
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    setError(null);
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลสถิติได้');
      const data = await res.json();
      setStats(data.data);
      setShowStats(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍜 Restaurant Review</h1>
        <nav>
          <button onClick={handleBackToList} className={!showStats && !selectedRestaurantId ? 'active' : ''}>
            🏠 หน้าแรก
          </button>
          <button onClick={fetchStats} className={showStats ? 'active' : ''}>
            📊 ดูสถิติ
          </button>
        </nav>
      </header>

      <main>
        {error && <p className="error">{error}</p>}
        {loadingStats ? (
          <div className="loading">กำลังโหลดข้อมูล...</div>
        ) : showStats && stats ? (
          <div className="stats-card">
            <h2>📈 สถิติร้านอาหาร</h2>
            <ul>
              <li>จำนวนร้านทั้งหมด: <strong>{stats.totalRestaurants}</strong></li>
              <li>จำนวนรีวิวทั้งหมด: <strong>{stats.totalReviews}</strong></li>
              <li>คะแนนเฉลี่ยรวม: <strong>{stats.averageRating}</strong></li>
            </ul>

            <h3>🏆 ร้านยอดนิยม 5 อันดับ</h3>
            <ol>
              {stats.topRatedRestaurants.map(r => (
                <li key={r.id}>
                  <strong>{r.name}</strong> ({r.category}) ⭐ {r.averageRating} ({r.totalReviews} รีวิว)
                </li>
              ))}
            </ol>

            <button className="back-btn" onClick={handleBackToList}>🔙 กลับไปหน้าหลัก</button>
          </div>
        ) : selectedRestaurantId ? (
          <RestaurantDetail restaurantId={selectedRestaurantId} onBack={handleBack} />
        ) : (
          <RestaurantList onSelectRestaurant={handleSelectRestaurant} />
        )}
      </main>

      <footer className="app-footer">
        &copy; 2025 Restaurant Review App | สร้างด้วย React + Express
      </footer>
    </div>
  );
}

export default App;
