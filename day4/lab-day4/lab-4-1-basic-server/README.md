````markdown
# Lab 4.1 — สร้างเซิร์ฟเวอร์แรกด้วย Node.js

สรุปสั้น ๆ:
โปรเจกต์นี้สาธิตการสร้าง HTTP server แบบดั้งเดิมโดยใช้โมดูล `http` ของ Node.js และการสร้างเซิร์ฟเวอร์เดียวกันโดยใช้ Express.js เพื่อเปรียบเทียบการใช้งาน การจัดการ route และความสะดวกในการพัฒนา

---

## ความสามารถ (Endpoints)
- GET / — หน้า welcome และรายการ endpoint
- GET /students — ดึงรายการนักศึกษาทั้งหมด (JSON)
- GET /students/:id — ดึงข้อมูลนักศึกษาตาม ID
- GET /students/major/:major — ดึงรายการนักศึกษาตามสาขา
- GET /stats — (เฉพาะ Express) สถิติ เช่น จำนวนรวมและจำนวนตามสาขา

ทุก endpoint ของตัวอย่างจะคืนค่า JSON และมีการจัดการกรณีไม่พบ (404)

---

## ความต้องการเบื้องต้น
- Node.js (แนะนำ v18.x ขึ้นไป)
- Git

## ติดตั้งและรันโปรเจกต์
1. Clone โปรเจกต์

```bash
git clone <repository-url>
cd day4/lab-day4/lab-4-1-basic-server
```

2. ติดตั้ง dependencies

```bash
npm install
```

3. สคริปต์ที่มีให้ (ตัวอย่างใน `package.json`)

```bash
# รัน HTTP server (port 3000)
npm run start:http

# รัน HTTP server แบบพัฒนา (nodemon) ถ้ามี
npm run dev:http

# รัน Express server (port 3001)
npm run start:express

# รัน Express แบบพัฒนา (nodemon) ถ้ามี
npm run dev:express
```

หมายเหตุ: ตรวจสอบว่า port 3000 และ 3001 ว่างก่อนรัน

---

## ตัวอย่างการทดสอบ (curl)

HTTP server (port 3000):

---

# Lab 4.1 — สร้างเซิร์ฟเวอร์แรกด้วย Node.js / Build your first Node.js server

This lab shows two implementations of the same simple API: one using Node's built-in `http` module and one using Express.js. The goal is to compare how routing, JSON responses and error handling differ between the two approaches.

## Features / ความสามารถ
- GET / — Welcome message and list of endpoints (หน้า welcome และรายการ endpoint)
- GET /students — Return all students as JSON (แสดงรายการนักศึกษา)
- GET /students/:id — Return student by ID (แสดงนักศึกษาตาม ID)
- GET /students/major/:major — Return students filtered by major (แสดงนักศึกษาตามสาขา)
- GET /stats — (Express only) Basic statistics about students (สถิติ)

All endpoints return JSON and handle 404 (Not Found) where appropriate.

---

## Prerequisites / ความต้องการ
- Node.js v18+ recommended
- Git

## Install & Run / ติดตั้งและรัน

1) Clone and change directory / Clone โปรเจกต์

```bash
git clone <repository-url>
cd day4/lab-day4/lab-4-1-basic-server
```

2) Install dependencies / ติดตั้ง

```bash
npm install
```

3) Available scripts (see `package.json`) / สคริปต์ที่มีให้

```bash
# Run the simple HTTP server (port 3000)
npm run start:http

# Run the HTTP server with nodemon (if configured)
npm run dev:http

# Run the Express server (port 3001)
npm run start:express

# Run Express with nodemon (if configured)
npm run dev:express
```

Note: Make sure ports 3000 and 3001 are free.

---

## Quick examples / ตัวอย่างการทดสอบ (curl)

HTTP server (port 3000):

```bash
curl http://localhost:3000/
curl http://localhost:3000/students
curl http://localhost:3000/students/1
curl "http://localhost:3000/students/major/วิศวกรรม"
```

Express server (port 3001):

```bash
curl http://localhost:3001/
curl http://localhost:3001/students
curl http://localhost:3001/students/1
curl "http://localhost:3001/students/major/วิศวกรรม"
curl http://localhost:3001/stats
```

---

## Example responses / ตัวอย่าง response

GET /students — 200 OK

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "สมชาย", "major": "วิศวกรรม" },
    { "id": 2, "name": "สมหญิง", "major": "คอมพิวเตอร์" }
  ]
}
```

404 Not Found example / ตัวอย่าง 404 (ไม่พบ)

```json
{
  "success": false,
  "error": "Student not found"
}
```

---

## Project files / โครงสร้างไฟล์

```
project-root/
├─ http-server.js         # minimal server using Node's http module
├─ express-server.js      # server using Express framework
├─ package.json
├─ comparison.md          # notes comparing http vs express
└─ README.md
```

---

## Edit sample data / แก้ข้อมูลตัวอย่าง
To add or change student data, edit the `students` array inside `http-server.js` and `express-server.js`.

---

## Grading checklist / เกณฑ์การประเมิน
1. Both servers run and respond to listed endpoints (HTTP:3000, Express:3001)
2. Responses are JSON with appropriate status codes (200, 404)
3. 404 responses are handled gracefully
4. `comparison.md` documents differences between the two approaches

---

If you want, I can also:

- add a `requests.http` file for VS Code REST Client with all sample requests
- generate a Postman collection (exportable JSON)
- translate this README fully into English or Thai-only version
