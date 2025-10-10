# Restaurant Review Website

## รายละเอียดโปรเจค
เว็บสำหรับรีวิวร้านอาหารขนาดเล็กที่ประกอบด้วย frontend (React + Vite) และ backend (Node.js + Express) โดยเก็บข้อมูลแบบ JSON file เหมาะสำหรับการสาธิตการทำ CRUD, การค้นหา/กรอง, การจัดการรีวิว และการคำนวณ rating อัตโนมัติ

## เทคโนโลยีที่ใช้
- Frontend: React 18 + Vite (โฟลเดอร์ `frontend/`) — UI สำหรับดูรายการร้าน ค้นหา กรอง ดูรายละเอียด และเพิ่มรีวิว
- Backend: Node.js + Express (โฟลเดอร์ `backend/`) — REST API ที่เก็บข้อมูลเป็นไฟล์ JSON ใน `backend/data/`
- Database: JSON File Storage 

## โครงสร้างไฟล์สำคัญ
- `backend/`
  - `server.js` — ตั้งค่า Express app, routes และ endpoint `/api/stats`
  - `routes/restaurants.js` — GET `/api/restaurants`, GET `/api/restaurants/:id`
  - `routes/reviews.js` — GET `/api/reviews/:restaurantId`, POST `/api/reviews`
  - `middleware/validation.js` — validate รีวิวก่อนบันทึก (ป้องกัน input ที่เป็นอันตราย)
  - `utils/fileManager.js` — ฟังก์ชันอ่าน/เขียน JSON files
  - `data/restaurants.json` — ข้อมูลร้าน
  - `data/reviews.json` — ข้อมูลรีวิว

- `frontend/`
  - `src/App.jsx` — entry ของ React app, จัดการ theme และ routing แบบง่าย (list <-> detail)
  - `src/services/api.js` — wrapper สำหรับเรียก REST API (getRestaurants, getRestaurantById, addReview)
  - `src/components/` — `RestaurantList`, `RestaurantCard`, `RestaurantDetail`, `ReviewForm`, `ReviewList`, `SearchBar`, `FilterPanel`

## Features ที่ทำได้
### Required Features
- [x] แสดงรายการร้านอาหาร
- [x] ค้นหาร้าน
- [x] กรองตามหมวด/rating/ราคา
- [x] ดูรายละเอียดร้าน
- [x] เพิ่มรีวิว
- [x] Validation
- [x] อัพเดท rating อัตโนมัติ

### Bonus Features
- [x] Sort restaurants
- [x] Responsive design
- [x] Animations

## วิธีติดตั้งและรัน

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- GET `/api/restaurants` - ดึงรายการร้านทั้งหมด
- GET `/api/restaurants/:id` - ดึงร้านตาม ID
- POST `/api/reviews` - เพิ่มรีวิว
- GET `/api/stats` - ดึงสถิติ

## Screenshots
### หน้าแรก
- Light Mode  
![Home (Light mode)](./screenshots/home-light.png)

- Dark Mode  
![Home (Dark mode)](./screenshots/home-dark.png)

### รายละเอียดร้าน  
![Detail](./screenshots/detail.png)

### ฟอร์มรีวิว  
![Review Form 1](./screenshots/review-form-1.png)  
![Review Form 2](./screenshots/review-form-2.png)
## ผู้พัฒนา
- นาย สรุรเชษฐ์ เป็งคำ
- รหัสนักศึกษา: 68543210080-6
- Email: surachet.pengcom@live.rmutl.ac.th

## License
MIT License
