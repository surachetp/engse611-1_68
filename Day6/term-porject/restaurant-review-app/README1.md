
# Restaurant Review Website

## รายละเอียดโปรเจค
เว็บสำหรับรีวิวร้านอาหารขนาดเล็กที่ประกอบด้วย frontend (React + Vite) และ backend (Node.js + Express) โดยเก็บข้อมูลแบบ JSON file เหมาะสำหรับการสาธิตการทำ CRUD, การค้นหา/กรอง, การจัดการรีวิว และการคำนวณ rating อัตโนมัติ

## เทคโนโลยีที่ใช้
- Frontend: React 18 + Vite (โฟลเดอร์ `frontend/`) — UI สำหรับดูรายการร้าน ค้นหา กรอง ดูรายละเอียด และเพิ่มรีวิว
- Backend: Node.js + Express (โฟลเดอร์ `backend/`) — REST API ที่เก็บข้อมูลเป็นไฟล์ JSON ใน `backend/data/`
- Database: JSON File Storage 

## โครงสร้างไฟล์สำคัญ
restaurant-review-app/
├── backend/
│   ├── data/
│   │   ├── restaurants.json      # ข้อมูลร้านอาหาร
│   │   └── reviews.json          # ข้อมูลรีวิว
│   ├── routes/
│   │   ├── restaurants.js        # API endpoints สำหรับร้านอาหาร
│   │   └── reviews.js            # API endpoints สำหรับรีวิว
│   ├── middleware/
│   │   └── validation.js         # Middleware ตรวจสอบข้อมูล
│   ├── utils/
│   │   └── fileManager.js        # ฟังก์ชันจัดการไฟล์ JSON
│   ├── server.js                 # Main server file
│   ├── package.json              # Dependencies และ scripts
│   ├── .env.example              # ตัวอย่างไฟล์ environment
│   └── .gitignore                # ไฟล์ที่ไม่ต้องการ commit
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── RestaurantList.jsx   # แสดงรายการร้านอาหาร
    │   │   ├── RestaurantCard.jsx   # การ์ดร้านอาหาร
    │   │   ├── RestaurantDetail.jsx # รายละเอียดร้านอาหาร
    │   │   ├── SearchBar.jsx        # แถบค้นหา
    │   │   ├── FilterPanel.jsx      # แผงกรองข้อมูล
    │   │   ├── ReviewForm.jsx       # ฟอร์มเขียนรีวิว
    │   │   └── ReviewList.jsx       # แสดงรายการรีวิว
    │   ├── services/
    │   │   └── api.js               # ฟังก์ชันเรียก API
    │   ├── App.jsx                  # Main App component
    │   ├── App.css                  # Styling หลัก
    │   └── main.jsx                 # Entry point
    ├── index.html                   # HTML template
    ├── package.json                 # Dependencies และ scripts
    ├── vite.config.js               # Vite configuration
    └── .gitignore                   # ไฟล์ที่ไม่ต้องการ commit

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
