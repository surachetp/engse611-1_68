# HTML5 พื้นฐานและโครงสร้างเว็บไซต์
## ENGSE611 - การพัฒนาเว็บด้วยเทคโนโลยีสมัยใหม่
### วันที่ 1 - หัวข้อที่ 1 (3 ชั่วโมง)

---

## Slide 1: ยินดีต้อนรับสู่โลกของ Web Development! 🌐

### สิ่งที่เราจะเรียนรู้วันนี้
- HTML5 คืออะไร และทำไมสำคัญ
- โครงสร้างพื้นฐานของเว็บเพจ
- HTML Tags ที่ใช้บ่อยที่สุด
- การสร้างเว็บไซต์แรกของคุณ

**เป้าหมาย:** ในตอนท้ายของบทเรียนนี้ คุณจะสามารถสร้างเว็บเพจง่ายๆ ได้ด้วยตัวเอง!

---

## Slide 2: HTML คืออะไร? 🤔

**HTML = HyperText Markup Language**

- **HyperText** = ข้อความที่เชื่อมโยงกันได้ (เหมือน Link)
- **Markup** = การใส่เครื่องหมายเพื่อบอกโครงสร้าง
- **Language** = ภาษาที่เบราว์เซอร์เข้าใจ

### เปรียบเทียบกับชีวิตจริง
HTML เหมือนกับ **โครงสร้างของบ้าน** 🏠
- หัวข้อ = หลังคา
- เนื้อหา = ห้องต่างๆ
- รูปภาพ = เฟอร์นิเจอร์

---

## Slide 3: ทำไมต้อง HTML5? ✨

### HTML5 vs HTML เก่า
| HTML เก่า | HTML5 |
|-----------|--------|
| ⚠️ ซับซ้อน | ✅ เรียบง่าย |
| ❌ ไม่รองรับมือถือดี | ✅ รองรับทุกอุปกรณ์ |
| 🐌 ช้า | ⚡ เร็ว |
| 📱 ฟีเจอร์น้อย | 🚀 ฟีเจอร์เยอะ |

**HTML5 = มาตรฐานปัจจุบันที่ทุกเว็บไซต์ใช้!**

---

## Slide 4: ก่อนเริ่ม - เครื่องมือที่ต้องใช้ 🛠️

### 1. Text Editor (เลือก 1 อย่าง)
- **Visual Studio Code** ⭐ แนะนำ (ฟรี)
- Sublime Text
- Atom

### 2. Web Browser (เลือก 1 อย่าง)
- **Google Chrome** ⭐ แนะนำ
- Firefox
- Safari

### 3. ไฟล์ที่เราจะสร้าง
- `index.html` (ไฟล์หลัก)

---

## Slide 5: โครงสร้างพื้นฐานของ HTML5 📋

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>หน้าแรกของฉัน</title>
</head>
<body>
    <h1>สวัสดีชาวโลก!</h1>
    <p>นี่คือเว็บไซต์แรกของฉัน</p>
</body>
</html>
```

**ทุกไฟล์ HTML จะมีโครงสร้างแบบนี้เสมอ!**

---

## Slide 6: แยกชิ้นส่วนโครงสร้าง HTML 🔍

### 1. DOCTYPE Declaration
```html
<!DOCTYPE html>
```
→ บอกเบราว์เซอร์ว่าเป็น HTML5

### 2. HTML Element
```html
<html lang="th">
```
→ เริ่มต้นเอกสาร HTML (lang="th" = ภาษาไทย)

### 3. Head Section
```html
<head>...</head>
```
→ ข้อมูลเกี่ยวกับเว็บไซต์ (ไม่แสดงบนหน้าเว็บ)

---

## Slide 7: ส่วน Head - ข้อมูลเบื้องหลัง 📊

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>หน้าแรกของฉัน</title>
</head>
```

### อธิบายแต่ละบรรทัด:
- **charset="UTF-8"** = รองรับภาษาไทย
- **viewport** = แสดงผลดีบนมือถือ
- **title** = ชื่อที่แสดงบน Tab เบราว์เซอร์

---

## Slide 8: ส่วน Body - สิ่งที่ผู้ใช้เห็น 👀

```html
<body>
    <h1>สวัสดีชาวโลก!</h1>
    <p>นี่คือเว็บไซต์แรกของฉัน</p>
</body>
```

### ในส่วน Body จะมี:
- เนื้อหาทั้งหมดที่ผู้ใช้เห็น
- ข้อความ, รูปภาพ, ลิงก์, ปุ่ม
- ทุกอย่างที่คุณต้องการแสดง

---

## Slide 9: คำถาม 🤔

### ถ้าคุณต้องการเปลี่ยนชื่อเว็บไซต์ที่แสดงบน Tab เบราว์เซอร์
### คุณจะแก้ไขส่วนไหนของ HTML?

A) `<body>`
B) `<title>`
C) `<h1>`
D) `<meta charset>`

**คิด 30 วินาที...**

---

## Slide 10: เฉลย 🎯

### คำตอบ: B) `<title>`

```html
<title>ชื่อที่จะแสดงบน Tab</title>
```

### เหตุผล:
- `<title>` อยู่ใน `<head>` 
- ใช้กำหนดชื่อเว็บไซต์ที่แสดงบน Tab
- ไม่แสดงในเนื้อหาหน้าเว็บ

---

## Slide 11: HTML Tags คืออะไร? 🏷️

### Tag = เครื่องหมายที่ห้อมข้อความ

```html
<tagname>เนื้อหา</tagname>
```

### ตัวอย่าง:
```html
<h1>หัวข้อใหญ่</h1>
<p>ย่อหน้าข้อความ</p>
<strong>ข้อความตัวหนา</strong>
```

### กฎสำคัญ:
- เปิด `<tag>` ต้องปิด `</tag>`
- ตัวพิมพ์เล็ก-ใหญ่ไม่สำคัญ แต่แนะนำใช้ตัวเล็ก

---

## Slide 12: Tags สำหรับหัวข้อ (Headings) 📚

```html
<h1>หัวข้อใหญ่ที่สุด</h1>
<h2>หัวข้อรอง</h2>
<h3>หัวข้อย่อย</h3>
<h4>หัวข้อย่อยย่อย</h4>
<h5>หัวข้อเล็ก</h5>
<h6>หัวข้อเล็กที่สุด</h6>
```

### การใช้งาน:
- `<h1>` = หัวข้อหลักของหน้า (ใช้ครั้งเดียวต่อหน้า)
- `<h2>` = หัวข้อหมวด
- `<h3>-<h6>` = หัวข้อย่อยต่างๆ

---

## Slide 13: Tags สำหรับข้อความ (Text) ✍️

### ย่อหน้าธรรมดา:
```html
<p>นี่คือย่อหน้าข้อความปกติ</p>
```

### ข้อความพิเศษ:
```html
<strong>ข้อความสำคัญ (ตัวหนา)</strong>
<em>ข้อความเน้น (ตัวเอียง)</em>
<mark>ข้อความไฮไลต์</mark>
<small>ข้อความเล็ก</small>
```

### ขึ้นบรรทัดใหม่:
```html
บรรทัดแรก<br>
บรรทัดที่สอง
```

---

## Slide 14: Demo Time! 💻

### ลองสร้างไฟล์ HTML แรกกัน!

1. เปิด Visual Studio Code
2. สร้างไฟล์ใหม่ `index.html`
3. พิมพ์โครงสร้าง HTML พื้นฐาน
4. เพิ่มหัวข้อและข้อความ
5. เปิดดูในเบราว์เซอร์

**หยุด 10 นาที - ทำไปด้วยกัน!**

---

## Slide 15: Tags สำหรับรายการ (Lists) 📝

### รายการแบบมีลำดับ (Ordered List):
```html
<ol>
    <li>ขั้นตอนที่ 1</li>
    <li>ขั้นตอนที่ 2</li>
    <li>ขั้นตอนที่ 3</li>
</ol>
```

### รายการแบบไม่มีลำดับ (Unordered List):
```html
<ul>
    <li>รายการที่ 1</li>
    <li>รายการที่ 2</li>
    <li>รายการที่ 3</li>
</ul>
```

---

## Slide 16: Tags สำหรับลิงก์ (Links) 🔗

### ลิงก์ไปยังเว็บไซต์อื่น:
```html
<a href="https://www.google.com">ไปยัง Google</a>
```

### ลิงก์ไปยังหน้าอื่นในเว็บไซต์เดียวกัน:
```html
<a href="about.html">เกี่ยวกับเรา</a>
```

### ลิงก์อีเมล:
```html
<a href="mailto:someone@example.com">ส่งอีเมล</a>
```

### Attributes สำคัญ:
- `href` = จุดหมายของลิงก์
- `target="_blank"` = เปิดในแท็บใหม่

---

## Slide 17: Tags สำหรับรูปภาพ (Images) 🖼️

### แสดงรูปภาพ:
```html
<img src="image.jpg" alt="คำอธิบายรูป">
```

### ตัวอย่างการใช้งาน:
```html
<img src="profile.jpg" alt="รูปโปรไฟล์ของฉัน" width="300">
```

### Attributes สำคัญ:
- `src` = ที่อยู่ไฟล์รูป
- `alt` = คำอธิบายรูป (สำคัญมาก!)
- `width`, `height` = ขนาดรูป

**หมายเหตุ:** `<img>` ไม่ต้องมี closing tag

---

## Slide 18: คำถาม 🤔

### ถ้าคุณต้องการสร้างรายการขั้นตอนการทำอาหาร
### คุณจะใช้ tag ไหน?

A) `<ul>` + `<li>`
B) `<ol>` + `<li>`
C) `<h1>` + `<p>`
D) `<strong>` + `<em>`

**คิด 30 วินาที...**

---

## Slide 19: เฉลย 🎯

### คำตอบ: B) `<ol>` + `<li>`

```html
<h2>วิธีทำไข่เจียว</h2>
<ol>
    <li>ตีไข่ใส่ชาม</li>
    <li>ใส่น้ำปลา</li>
    <li>ตั้งกระทะใส่น้ำมัน</li>
    <li>เทไข่ลงกระทะ</li>
    <li>ทอดจนสุก</li>
</ol>
```

### เหตุผล: การทำอาหารต้องมีลำดับขั้นตอน ใช้ `<ol>` (ordered list)

---

## Slide 20: HTML Attributes คืออะไร? ⚙️

### Attributes = คุณสมบัติพิเศษของ Tag

```html
<tag attribute="value">เนื้อหา</tag>
```

### ตัวอย่าง:
```html
<a href="https://google.com" target="_blank">Google</a>
<img src="photo.jpg" alt="รูปภาพ" width="200">
<p id="intro" class="highlight">ข้อความแนะนำ</p>
```

### Attributes ที่ใช้บ่อย:
- `id` = ชื่อเฉพาะ (ไม่ซ้ำ)
- `class` = หมวดหมู่ (ซ้ำได้)

---

## Slide 21: โครงสร้างเว็บไซต์จริง 🏗️

### เว็บไซต์ทั่วไปจะมี:

```html
<body>
    <header>หัวเว็บ (โลโก้, เมนู)</header>
    <nav>แถบนำทาง</nav>
    <main>เนื้อหาหลัก</main>
    <aside>แถบข้าง</aside>
    <footer>ท้ายเว็บ (ลิขสิทธิ์)</footer>
</body>
```

### ประโยชน์:
- อ่านง่าย
- เข้าใจโครงสร้าง
- เป็นมาตรฐาน

---

## Slide 22: Semantic HTML5 Tags 🎯

### Tag เก่า vs Tag ใหม่:
| เก่า | ใหม่ | ความหมาย |
|-----|-----|----------|
| `<div>` | `<header>` | หัวเว็บ |
| `<div>` | `<nav>` | เมนูนำทาง |
| `<div>` | `<main>` | เนื้อหาหลัก |
| `<div>` | `<article>` | บทความ |
| `<div>` | `<section>` | หมวดหมู่ |
| `<div>` | `<aside>` | แถบข้าง |
| `<div>` | `<footer>` | ท้ายเว็บ |

**Semantic = มีความหมาย ชัดเจน**

---

## Slide 23: ตัวอย่างเว็บไซต์ครบครัน 📄

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>เว็บไซต์ของฉัน</title>
</head>
<body>
    <header>
        <h1>ยินดีต้อนรับ</h1>
        <nav>
            <a href="#home">หน้าแรก</a>
            <a href="#about">เกี่ยวกับ</a>
            <a href="#contact">ติดต่อ</a>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>หน้าแรก</h2>
            <p>นี่คือเว็บไซต์ของฉัน</p>
        </section>
    </main>
    
    <footer>
        <p>© 2024 เว็บไซต์ของฉัน</p>
    </footer>
</body>
</html>
```

---

## Slide 24: Forms พื้นฐาน 📝

### แบบฟอร์มสำหรับรับข้อมูล:
```html
<form>
    <label for="name">ชื่อ:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">อีเมล:</label>
    <input type="email" id="email" name="email">
    
    <label for="message">ข้อความ:</label>
    <textarea id="message" name="message"></textarea>
    
    <button type="submit">ส่งข้อมูล</button>
</form>
```

### Input Types ที่ใช้บ่อย:
- `text`, `email`, `password`, `number`, `date`

---

## Slide 25: Tables พื้นฐาน 📊

### สร้างตาราง:
```html
<table>
    <thead>
        <tr>
            <th>ชื่อ</th>
            <th>อายุ</th>
            <th>เมือง</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>สมชาย</td>
            <td>25</td>
            <td>กรุงเทพ</td>
        </tr>
        <tr>
            <td>สมหญิง</td>
            <td>23</td>
            <td>เชียงใหม่</td>
        </tr>
    </tbody>
</table>
```

---

## Slide 26: Comments ในHTML 💬

### การเขียนหมายเหตุ:
```html
<!-- นี่คือ comment จะไม่แสดงบนเว็บไซต์ -->
<h1>หัวข้อ</h1>

<!-- TODO: เพิ่มรูปภาพที่นี่ -->
<p>เนื้อหา</p>

<!-- 
    Comment หลายบรรทัด
    สามารถเขียนได้แบบนี้
-->
```

### ประโยชน์:
- จดบันทึกสำหรับตัวเอง
- อธิบายโค้ดให้คนอื่นเข้าใจ
- ปิดการใช้งานโค้ดชั่วคราว

---

## Slide 27: HTML Validation 🔍

### ตรวจสอบ HTML ที่ถูกต้อง:

#### ✅ HTML ที่ดี:
```html
<h1>หัวข้อ</h1>
<p>ย่อหน้า</p>
<img src="image.jpg" alt="รูปภาพ">
```

#### ❌ HTML ที่ผิด:
```html
<h1>หัวข้อ <!-- ไม่มี closing tag -->
<p>ย่อหน้า</P> <!-- P ตัวใหญ่ผิด -->
<img src="image.jpg"> <!-- ไม่มี alt -->
```

**เครื่องมือ:** W3C Markup Validator

---

## Slide 28: Best Practices 🌟

### 1. ใช้ Semantic Tags:
```html
<!-- ดี -->
<header>, <main>, <footer>

<!-- ไม่ดี -->
<div>, <div>, <div>
```

### 2. เพิ่ม Alt ให้รูปเสมอ:
```html
<img src="photo.jpg" alt="คำอธิบายรูป">
```

### 3. ใช้ Title ที่สื่อความหมาย:
```html
<title>ร้านอาหารไทยแสนอร่อย - หน้าแรก</title>
```

### 4. เขียน HTML ที่อ่านง่าย:
- เว้นวรรค (Indentation)
- จัดเรียงอย่างเป็นระบบ

---

## Slide 29: เครื่องมือช่วยเหลือ 🛠️

### 1. เช็ค HTML ใน Browser:
- กด `F12` → เปิด Developer Tools
- ดู Console หาข้อผิดพลาด

### 2. VS Code Extensions แนะนำ:
- **Live Server** - ดูผลลัพธ์แบบ Real-time
- **Auto Rename Tag** - เปลี่ยนชื่อ tag อัตโนมัติ
- **HTML Snippets** - เขียน HTML เร็วขึ้น

### 3. เว็บไซต์ช่วยเหลือ:
- W3Schools.com
- MDN Web Docs

---

## Slide 30: สรุปและถัดไป 🎯

### สิ่งที่เราเรียนรู้วันนี้:
✅ โครงสร้าง HTML5 พื้นฐาน  
✅ Tags สำคัญ: h1-h6, p, a, img, ul/ol/li  
✅ HTML Attributes และ Semantic Tags  
✅ การสร้างเว็บไซต์ง่ายๆ  

### ถัดไป (หัวข้อที่ 2):
- CSS3 Styling และ Layout
- ทำให้เว็บไซต์สวยงาม
- ใส่สี ฟอนต์ และจัดวางตำแหน่ง

### การบ้าน 📚
สร้างเว็บไซต์แนะนำตัวเองด้วย HTML เท่านั้น ภายใน 30 นาทีต่อไปนี้!

---

## พักเบรก 15 นาที ☕
### เตรียมพร้อมสำหรับ CSS3 ในหัวข้อถัดไป!