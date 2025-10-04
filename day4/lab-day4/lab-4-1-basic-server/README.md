# Lab 4.1: สร้างเซิร์ฟเวอร์แรกด้วย Node.js

## คำอธิบาย
โปรเจคนี้เป็นการสร้าง HTTP server พื้นฐานโดยใช้โมดูล `http` ของ Node.js และเปรียบเทียบกับการใช้ Express.js framework เพื่อสร้างเซิร์ฟเวอร์ที่มีฟังก์ชันเดียวกัน โดยมี endpoint ดังนี้:
- `GET /`: แสดงข้อความต้อนรับและรายการ endpoint
- `GET /students`: แสดงรายการนักศึกษาทั้งหมด
- `GET /students/:id`: แสดงข้อมูลนักศึกษาตาม ID
- `GET /students/major/:major`: แสดงรายการนักศึกษาตามสาขา
- `GET /stats` (เฉพาะ Express): แสดงสถิติจำนวนนักศึกษาและจำนวนนักศึกษาในแต่ละสาขา

## การติดตั้ง
1. ติดตั้ง Node.js (แนะนำเวอร์ชัน 18.x หรือสูงกว่า)
2. Clone โปรเจคนี้:
   ```bash
   git clone <repository-url>
   cd lab-4-1-basic-server
3.ติดตั้ง dependencies:bash
	npm install
วิธีรันเซิร์ฟเวอร์

รัน HTTP Server:
bashnpm run start:http
หรือใช้ nodemon เพื่อรันแบบพัฒนา:
bashnpm run dev:http
เซิร์ฟเวอร์จะรันที่ http://localhost:3000
รัน Express Server:
bashnpm run start:express
หรือใช้ nodemon:
bashnpm run dev:express
เซิร์ฟเวอร์จะรันที่ http://localhost:3001

การทดสอบ
ทดสอบ endpoint โดยใช้ curl, browser, หรือเครื่องมือเช่น Postman:

HTTP Server:
bashcurl http://localhost:3000/
curl http://localhost:3000/students
curl http://localhost:3000/students/1
curl http://localhost:3000/students/major/วิศวกรรม

Express Server:
bashcurl http://localhost:3001/
curl http://localhost:3001/students
curl http://localhost:3001/students/1
curl http://localhost:3001/students/major/วิศวกรรม
curl http://localhost:3001/stats


ไฟล์ในโปรเจค

package.json: กำหนด dependencies และ scripts
http-server.js: เซิร์ฟเวอร์ที่ใช้โมดูล http
express-server.js: เซิร์ฟเวอร์ที่ใช้ Express.js
comparison.md: เปรียบเทียบระหว่าง HTTP Server และ Express Server
README.md: คำอธิบายโปรเจคและวิธีใช้งาน

หมายเหตุ

ตรวจสอบให้แน่ใจว่า port 3000 และ 3001 ว่างก่อนรันเซิร์ฟเวอร์
หากต้องการเพิ่มข้อมูลนักศึกษา สามารถแก้ไข array students ในไฟล์ http-server.js และ express-server.js

text---

### การทดสอบและเกณฑ์การประเมิน
1. **ทดสอบการทำงาน**:
   - รันทั้งสองเซิร์ฟเวอร์และใช้ `curl` หรือ browser เพื่อตรวจสอบว่า endpoint ทั้งหมดทำงานถูกต้อง
   - ตัวอย่างคำสั่งทดสอบ:
     ```bash
     curl http://localhost:3000/students
     curl http://localhost:3001/students/major/วิศวกรรม

ตรวจสอบว่า response เป็น JSON และมี status code ที่ถูกต้อง (200 สำหรับสำเร็จ, 404 สำหรับไม่พบ)


เกณฑ์การประเมิน:

✅ Server ทั้งสองทำงานได้ถูกต้อง: ทั้ง HTTP และ Express server รันได้และตอบสนองทุก endpoint
✅ Routes ส่ง response ที่ถูกต้อง: ตรวจสอบว่า response ตรงกับข้อมูลใน students และ endpoint /stats ใน Express
✅ มีการจัดการ 404 error: ส่ง response 404 พร้อมข้อความ error ที่เหมาะสม
✅ comparison.md มีเนื้อหาที่สมเหตุสมผล: อธิบายข้อดีข้อเสียของ HTTP และ Express ได้ชัดเจน
✅ README.md อธิบายได้ชัดเจน: มีคำแนะนำการติดตั้ง รัน และทดสอบที่ครบถ้วน