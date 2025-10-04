# Lab 4.3 — Contact Form (แบบสั้น)

คำอธิบายสั้น ๆ:
โปรเจกต์นี้เป็นตัวอย่างการรับข้อมูลจากฟอร์มติดต่อ (contact form) ทางฝั่งเซิร์ฟเวอร์ โดยรับข้อมูลจากฟอร์ม (เช่น name, email, message) และบันทึก/แสดงผลหรือส่งต่อ (ตัวอย่างการประยุกต์: บันทึกลงไฟล์, ส่งอีเมล, หรือเก็บในฐานข้อมูล)

## ความต้องการ
- Node.js (แนะนำ v18.x ขึ้นไป)
- Git

## ติดตั้งและรัน

```bash
git clone <repository-url>
cd day4/lab-day4/lab-4-3-contact-form
npm install

# รัน server
npm start
# (ถ้ามี) เซิร์ฟเวอร์จะรันที่ http://localhost:3000
```

## Endpoints (ตัวอย่าง)
- GET / — หน้า welcome / ตรวจสอบสถานะ
- GET /contact — หน้าแบบฟอร์ม (ถ้ามีหน้า HTML)
- POST /contact — รับข้อมูลฟอร์ม (JSON หรือ form-data)

ตัวอย่างฟิลด์ที่คาดว่าจะรับ (JSON):
```json
{
  "name": "สมชาย",
  "email": "somchai@example.com",
  "message": "สอบถามเกี่ยวกับการบ้าน"
}
```

ตัวอย่างเรียกด้วย curl (JSON):
```bash
curl -X POST http://localhost:3000/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"สมชาย","email":"somchai@example.com","message":"สอบถามเกี่ยวกับการบ้าน"}'
```

## พฤติกรรมที่คาดหวัง
- เซิร์ฟเวอร์ตอบกลับสถานะ 200 พร้อมข้อความยืนยันเมื่อส่งข้อมูลสำเร็จ
- หากข้อมูลไม่ครบให้คืน 400 และข้อความอธิบายข้อผิดพลาด
- (ตัวเลือก) บันทึกข้อมูลลงไฟล์ `contacts.json` หรือ `logs/` ตามการตั้งค่า

## ข้อมูลเพิ่มเติม
- หากต้องการให้ผมสร้างตัวอย่าง `requests.http` สำหรับทดสอบโดยตรงใน VS Code บอกได้เลย
