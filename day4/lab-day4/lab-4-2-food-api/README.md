# 🍽️ Food API

RESTful API สำหรับจัดการข้อมูลอาหาร รองรับการดึงรายการอาหารทั้งหมด, filter, ดูสถิติ และเอกสาร API

---

## 🛠️ การติดตั้ง

```bash
# Clone โปรเจกต์
git clone <repository-url>
cd <project-folder>

# ติดตั้ง dependencies
npm install

# สร้างโฟลเดอร์ logs สำหรับเก็บ request log
mkdir logs

# รัน server
npm start
Server จะรันที่: http://localhost:3000

📋 Middleware
Logger Middleware (middleware/logger.js)

Log ทุก request ลง console และไฟล์ logs/request.log

ข้อมูลที่ log: timestamp, method, URL, IP

🍽️ Endpoints / API
1. GET /api/foods – ดึงรายการอาหารทั้งหมด
Query Parameter	Type	Description
search	string	ค้นหาชื่อหรือคำอธิบาย
category	string	กรองตามประเภทอาหาร (case-insensitive)
maxSpicy	number	กรองระดับความเผ็ดสูงสุด
vegetarian	boolean	true หรือ false
available	boolean	true หรือ false
maxPrice	number	กรองราคาสูงสุด

ตัวอย่างการเรียก

bash
Copy code
curl "http://localhost:3000/api/foods?search=spicy&maxSpicy=2&vegetarian=true"
Response ตัวอย่าง

json
Copy code
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "Spicy Salad",
      "category": "Vegetable",
      "spicyLevel": 2,
      "vegetarian": true,
      "available": true,
      "price": 50
    }
  ],
  "total": 1,
  "filters": {
    "search": "spicy",
    "category": null,
    "maxSpicy": 2,
    "vegetarian": true,
    "available": null,
    "maxPrice": null
  }
}
2. GET /api/foods/random – ดึงอาหารแบบสุ่ม
bash
Copy code
curl http://localhost:3000/api/foods/random
Response ตัวอย่าง

json
Copy code
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Spicy Salad",
    "category": "Vegetable",
    "spicyLevel": 2,
    "vegetarian": true,
    "available": true,
    "price": 50
  }
}
3. GET /api/foods/category/:category – ดึงอาหารตามประเภท
bash
Copy code
curl http://localhost:3000/api/foods/category/Vegetable
Response ตัวอย่าง

json
Copy code
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "Green Salad",
      "category": "Vegetable",
      "spicyLevel": 0,
      "vegetarian": true,
      "available": true,
      "price": 40
    }
  ],
  "total": 1,
  "category": "vegetable"
}
4. GET /api/foods/:id – ดึงอาหารตาม ID
bash
Copy code
curl http://localhost:3000/api/foods/1
Response ตัวอย่าง

json
Copy code
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Tom Yum Soup",
    "category": "Soup",
    "spicyLevel": 3,
    "vegetarian": false,
    "available": true,
    "price": 120
  }
}
5. GET /api/docs – เอกสาร API
bash
Copy code
curl http://localhost:3000/api/docs
Response ตัวอย่าง

json
Copy code
{
  "success": true,
  "data": {
    "endpoints": [
      { "method": "GET", "path": "/api/foods", "description": "ดึงรายการอาหารทั้งหมด พร้อม filter query parameters" },
      { "method": "GET", "path": "/api/foods/random", "description": "ดึงอาหารแบบสุ่ม 1 จาน" },
      { "method": "GET", "path": "/api/foods/category/:category", "description": "ดึงอาหารตาม category" },
      { "method": "GET", "path": "/api/foods/:id", "description": "ดึงอาหารตาม ID" },
      { "method": "GET", "path": "/api/docs", "description": "แสดงเอกสาร API" },
      { "method": "GET", "path": "/api/stats", "description": "แสดงสถิติอาหาร" }
    ]
  }
}
6. GET /api/stats – สถิติอาหาร
bash
Copy code
curl http://localhost:3000/api/stats
Response ตัวอย่าง

json
Copy code
{
  "success": true,
  "data": {
    "total": 20,
    "categories": { "soup": 5, "vegetable": 7, "meat": 8 },
    "vegetarian": 10,
    "available": 18
  }
}
⚡ Notes
ลำดับ route สำคัญ

/random และ /category/:category ต้องวางก่อน /:id เพื่อป้องกัน route ชนกัน

Filtering /api/foods

ทุก parameter จะ AND กันทั้งหมด

Logger Middleware

บันทึกทุก request ลง console และไฟล์ logs/request.log

ข้อมูล: timestamp, method, URL, IP

📂 โครงสร้างไฟล์
pgsql
Copy code
project-folder/
├─ routes/
│  ├─ foods.js
│  └─ api.js
├─ middleware/
│  └─ logger.js
├─ data/
│  └─ foods.json
├─ logs/
│  └─ request.log
├─ app.js
└─ package.json