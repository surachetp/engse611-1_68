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
````markdown
# 🍽️ Food API (Lab 4.2)

RESTful API สำหรับจัดการข้อมูลเมนูอาหาร — รองรับการดึงรายการทั้งหมด, กรองด้วย query parameters, ดึงรายการสุ่ม, ดูสถิติ และหน้าเอกสาร API

---

## ความต้องการเบื้องต้น
- Node.js (แนะนำ v18.x ขึ้นไป)
- Git

## ติดตั้งและรัน

```bash
# Clone โปรเจกต์
git clone <repository-url>
cd day4/lab-day4/lab-4-2-food-api

# ติดตั้ง dependencies
npm install

# สร้างโฟลเดอร์สำหรับบันทึก log (หากยังไม่มี)
mkdir -p logs

# รัน server (ค่าเริ่มต้น: http://localhost:3000)
npm start
```

เมื่อรันสำเร็จ server จะฟังที่ http://localhost:3000

---

## Middleware
มี Logger middleware (`middleware/logger.js`) ที่บันทึกข้อมูลทุก request ลงทั้ง console และไฟล์ `logs/request.log`

ข้อมูลที่บันทึก: timestamp, method, URL, IP

---

## Endpoints

1) GET /api/foods — ดึงรายการอาหารทั้งหมด

Query parameters (ทั้งหมดจะถูก AND กัน):
- `search` (string) — ค้นหาในชื่อหรือคำอธิบาย
- `category` (string) — กรองตามประเภทอาหาร (ไม่ sensitive case)
- `maxSpicy` (number) — ระดับเผ็ดสูงสุด
- `vegetarian` (boolean) — true/false
- `available` (boolean) — true/false
- `maxPrice` (number) — ราคาสูงสุด

ตัวอย่าง:
```bash
curl "http://localhost:3000/api/foods?search=spicy&maxSpicy=2&vegetarian=true"
```

ตัวอย่าง response:
```json
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
```

2) GET /api/foods/random — ดึงอาหารแบบสุ่ม 1 รายการ

```bash
curl http://localhost:3000/api/foods/random
```

ตัวอย่าง response:
```json
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
```

3) GET /api/foods/category/:category — ดึงรายการตามหมวดหมู่

```bash
curl http://localhost:3000/api/foods/category/Vegetable
```

ตัวอย่าง response:
```json
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
```

4) GET /api/foods/:id — ดึงอาหารตาม ID

```bash
curl http://localhost:3000/api/foods/1
```

ตัวอย่าง response:
```json
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
```

5) GET /api/docs — เอกสาร API (list ของ endpoints)

```bash
curl http://localhost:3000/api/docs
```

6) GET /api/stats — สถิติข้อมูลเมนูอาหาร

```bash
curl http://localhost:3000/api/stats
```

ตัวอย่าง response:
```json
{
  "success": true,
  "data": {
    "total": 20,
    "categories": { "soup": 5, "vegetable": 7, "meat": 8 },
    "vegetarian": 10,
    "available": 18
  }
}
```

---

## หมายเหตุสำคัญ
- ลำดับการประกาศ route สำคัญ: วาง `/random` และ `/category/:category` ก่อน `/:id` เพื่อป้องกันการชนกันของ route
- การกรอง (filter) ใน `/api/foods` จะรวมเงื่อนไขทั้งหมดด้วย AND

---

## โครงสร้างไฟล์ตัวอย่าง

```
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
```

---

## ข้อแนะนำเพิ่มเติม
- เพิ่มตัวอย่าง `requests.http` หรือ Postman collection ถ้าต้องการชุดทดสอบสำเร็จรูป
- ระบุ dependencies สำคัญใน `package.json` (เช่น express) ถ้ายังไม่มี ให้เพิ่ม

---

หากต้องการ ผมสามารถสร้างไฟล์ `requests.http` หรือ Postman collection ให้เรียบร้อยเพื่อให้คุณทดสอบ endpoints ได้ทันที — บอกผมว่าต้องการแบบไหน (VS Code REST Client หรือ Postman) แล้วผมจะเพิ่มไฟล์ให้

````