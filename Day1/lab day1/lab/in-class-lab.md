# LAB วันที่ 1 - HTML, CSS และ Responsive Design
## ENGSE611 - การพัฒนาเว็บด้วยเทคโนโลยีสมัยใหม่

---

## การเตรียมตัวก่อนเริ่ม LAB 🛠️

### เครื่องมือที่ต้องมี:
- **Visual Studio Code** (ติดตั้งแล้ว)
- **Git** (ติดตั้งจาก git-scm.com)
- **GitHub Account** (สมัครที่ github.com)
- **Live Server Extension** ใน VS Code

### การตั้งค่า Git ครั้งแรก:
```bash
git config --global user.name "ชื่อของคุณ"
git config --global user.email "อีเมลของคุณ"
```

---

## LAB 1.1: สร้างหน้าเว็บแนะนำตัวด้วย HTML พื้นฐาน
### ⏰ เวลา: 1.5 ชั่วโมง

### 🎯 จุดประสงค์:
- สร้างโครงสร้าง HTML5 ที่ถูกต้อง
- ใช้ Semantic HTML Tags
- เพิ่มเนื้อหาที่หลากหลาย (ข้อความ, รูป, ลิงก์, รายการ)

### 📋 สิ่งที่ต้องทำ:

#### ขั้นตอนที่ 1: สร้างโปรเจค (15 นาที)
1. สร้างโฟลเดอร์ `web-portfolio` บนเดสก์ท็อป
2. เปิดโฟลเดอร์ใน VS Code
3. สร้างไฟล์ `index.html`
4. สร้างโฟลเดอร์ `images` สำหรับรูปภาพ

#### ขั้นตอนที่ 2: เขียน HTML พื้นฐาน (30 นาที)
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>แนะนำตัว - [ชื่อของคุณ]</title>
</head>
<body>
    <header>
        <h1>สวัสดี! ฉันคือ [ชื่อของคุณ]</h1>
        <nav>
            <a href="#about">เกี่ยวกับฉัน</a>
            <a href="#education">การศึกษา</a>
            <a href="#hobbies">งานอดิเรก</a>
            <a href="#contact">ติดต่อ</a>
        </nav>
    </header>

    <main>
        <section id="about">
            <h2>เกี่ยวกับฉัน</h2>
            <img src="images/profile.jpg" alt="รูปโปรไฟล์ของฉัน" width="200">
            <p>สวัสดีครับ/ค่ะ ฉันชื่อ [ชื่อเต็ม] เป็นนักศึกษาวิศวกรรมซอฟต์แวร์...</p>
            <p>ฉันสนใจในการเขียนโปรแกรมและต้องการเป็นนักพัฒนาเว็บไซต์ในอนาคต</p>
        </section>

        <section id="education">
            <h2>การศึกษา</h2>
            <h3>ปัจจุบัน</h3>
            <ul>
                <li><strong>มหาวิทยาลย:</strong> [ชื่อมหาวิทยาลัย]</li>
                <li><strong>คณะ:</strong> วิศวกรรมศาสตร์</li>
                <li><strong>สาขา:</strong> วิศวกรรมซอฟต์แวร์</li>
                <li><strong>ชั้นปีที่:</strong> 1</li>
            </ul>
        </section>

        <section id="hobbies">
            <h2>งานอดิเรกและความสนใจ</h2>
            <h3>สิ่งที่ฉันชอบทำ:</h3>
            <ol>
                <li>เล่นเกมคอมพิวเตอร์</li>
                <li>ดูซีรีย์/หนัง Netflix</li>
                <li>ฟังเพลง</li>
                <li>อ่านหนังสือเทคโนโลยี</li>
                <li>[เพิ่มงานอดิเรกของคุณ]</li>
            </ol>

            <h3>ทักษะที่กำลังเรียนรู้:</h3>
            <ul>
                <li>HTML & CSS</li>
                <li>JavaScript</li>
                <li>Python (ยังเริ่มต้น)</li>
            </ul>
        </section>

        <section id="contact">
            <h2>ติดต่อฉัน</h2>
            <p>หากต้องการติดต่อ สามารถติดต่อได้ที่:</p>
            <ul>
                <li><strong>อีเมล:</strong> <a href="mailto:your-email@example.com">your-email@example.com</a></li>
                <li><strong>เฟซบุ๊ก:</strong> <a href="https://facebook.com/yourprofile" target="_blank">facebook.com/yourprofile</a></li>
                <li><strong>Line ID:</strong> yourlineid</li>
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 [ชื่อของคุณ]. สร้างด้วย HTML5</p>
    </footer>
</body>
</html>
```

#### ขั้นตอนที่ 3: เพิ่มเนื้อหาส่วนตัว (30 นาที)
- แทนที่ `[ชื่อของคุณ]` ด้วยชื่อจริง
- เพิ่มรูปโปรไฟล์ในโฟลเดอร์ `images`
- ปรับแต่งเนื้อหาให้เป็นข้อมูลจริงของตัวเอง
- เพิ่มหัวข้อใหม่ที่สนใจ (เช่น เป้าหมายในอนาคต)

#### ขั้นตอนที่ 4: ตรวจสอบและทดสอบ (15 นาที)
1. ใช้ Live Server ดูผลลัพธ์
2. ตรวจสอบลิงก์ภายในหน้าทำงานได้
3. ตรวจสอบรูปภาพแสดงผลได้

### ✅ เกณฑ์การผ่าน:
- [ ] มีโครงสร้าง HTML5 ที่สมบูรณ์
- [ ] ใช้ Semantic Tags ถูกต้อง
- [ ] มีเนื้อหาครบ 4 section
- [ ] มีรูปภาพและลิงก์ทำงานได้
- [ ] เปิดผลงานใน browser ได้

---

## LAB 1.2: ตั้งแต่งหน้าเว็บด้วย CSS สีสันสวยงาม
### ⏰ เวลา: 1.5 ชั่วโมง

### 🎯 จุดประสงค์:
- เชื่อมต่อ CSS กับ HTML
- ใช้ CSS Selectors และ Properties
- จัด Layout ด้วย Flexbox
- เพิ่มสีสันและ Typography

### 📋 สิ่งที่ต้องทำ:

#### ขั้นตอนที่ 1: สร้างไฟล์ CSS (10 นาที)
1. สร้างไฟล์ `style.css` ในโฟลเดอร์เดียวกับ `index.html`
2. เชื่อมต่อ CSS ใน HTML:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>แนะนำตัว - [ชื่อของคุณ]</title>
    <link rel="stylesheet" href="style.css">
</head>
```

#### ขั้นตอนที่ 2: CSS Reset และ Typography (20 นาที)
```css
/* CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Typography */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
}

h1, h2, h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
}

h2 {
    font-size: 2rem;
    border-bottom: 3px solid #3498db;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
}

h3 {
    font-size: 1.3rem;
    color: #34495e;
}

p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}
```

#### ขั้นตอนที่ 3: Header และ Navigation (25 นาที)
```css
/* Header Styling */
header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem 0;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
    color: white;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Navigation */
nav {
    margin-top: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    padding: 0.5rem 1.5rem;
    border: 2px solid white;
    border-radius: 25px;
    transition: all 0.3s ease;
    display: inline-block;
    margin-bottom: 0.5rem;
}

nav a:hover {
    background-color: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

#### ขั้นตอนที่ 4: Main Content Layout (25 นาที)
```css
/* Main Content */
main {
    max-width: 1000px;
    margin: 3rem auto;
    padding: 0 2rem;
}

section {
    background: white;
    margin-bottom: 3rem;
    padding: 2.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
}

section:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Profile Image */
#about img {
    border-radius: 50%;
    border: 5px solid #3498db;
    margin-bottom: 1.5rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

/* Lists Styling */
ul, ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
}

li {
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
}

li strong {
    color: #2c3e50;
}
```

#### ขั้นตอนที่ 5: Links และ Footer (20 นาที)
```css
/* Links */
a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: #2980b9;
    text-decoration: underline;
}

/* Contact Section Special Styling */
#contact {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

#contact h2 {
    color: white;
    border-bottom-color: white;
}

#contact a {
    color: white;
    font-weight: bold;
}

#contact a:hover {
    color: #f8f9fa;
}

/* Footer */
footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 3rem;
}

footer p {
    margin: 0;
    font-size: 1rem;
}
```

#### ขั้นตอนที่ 6: เพิ่มสีสันและ Effects (10 นาที)
```css
/* Color Variations for Sections */
#education {
    border-left: 5px solid #e74c3c;
}

#hobbies {
    border-left: 5px solid #f39c12;
}

#about {
    border-left: 5px solid #27ae60;
}

/* Hover Effects */
section h2 {
    transition: color 0.3s ease;
}

section:hover h2 {
    color: #3498db;
}

/* Smooth Scrolling */
html {
    scroll-behavior: smooth;
}
```

### ✅ เกณฑ์การผ่าน:
- [ ] CSS เชื่อมต่อกับ HTML ได้
- [ ] มีการใช้สีและฟอนต์ที่สวยงาม
- [ ] Header มี gradient background
- [ ] Navigation มี hover effects
- [ ] Sections มี shadow และ hover effects
- [ ] เว็บไซต์ดูสวยงามและเป็นระบบ

---

## LAB 1.3: ปรับให้เว็บไซต์แสดงผลดีบนมือถือ
### ⏰ เวลา: 1 ชั่วโมง

### 🎯 จุดประสงค์:
- ทำให้เว็บไซต์ Responsive
- ใช้ Media Queries
- ปรับ Navigation สำหรับมือถือ
- ทดสอบบนอุปกรณ์ต่างๆ

### 📋 สิ่งที่ต้องทำ:

#### ขั้นตอนที่ 1: ตรวจสอบ Viewport (5 นาที)
ตรวจสอบให้แน่ใจว่า HTML มี viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### ขั้นตอนที่ 2: เพิ่ม Base Responsive CSS (15 นาที)
เพิ่มใน `style.css`:
```css
/* Responsive Images */
img {
    max-width: 100%;
    height: auto;
}

/* Flexible Container */
main {
    max-width: 1000px;
    margin: 3rem auto;
    padding: 0 1rem; /* ลด padding บนมือถือ */
}
```

#### ขั้นตอนที่ 3: Media Queries สำหรับ Tablet (15 นาที)
```css
/* Tablet Styles (768px and down) */
@media (max-width: 768px) {
    /* Header adjustments */
    header {
        padding: 2rem 0;
    }
    
    header h1 {
        font-size: 2rem;
    }
    
    /* Navigation adjustments */
    nav a {
        margin: 0.25rem;
        padding: 0.4rem 1rem;
        font-size: 0.9rem;
    }
    
    /* Main content adjustments */
    main {
        margin: 2rem auto;
        padding: 0 1rem;
    }
    
    section {
        padding: 1.5rem;
        margin-bottom: 2rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    /* Profile image */
    #about img {
        width: 150px;
    }
}
```

#### ขั้นตอนที่ 4: Media Queries สำหรับ Mobile (20 นาที)
```css
/* Mobile Styles (480px and down) */
@media (max-width: 480px) {
    /* Header adjustments */
    header {
        padding: 1.5rem 0;
    }
    
    header h1 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }
    
    /* Navigation - Stack vertically */
    nav {
        margin-top: 1rem;
    }
    
    nav a {
        display: block;
        margin: 0.5rem auto;
        max-width: 200px;
        text-align: center;
    }
    
    /* Main content */
    main {
        margin: 1rem auto;
        padding: 0 0.5rem;
    }
    
    section {
        padding: 1rem;
        margin-bottom: 1.5rem;
    }
    
    h1 {
        font-size: 1.8rem;
    }
    
    h2 {
        font-size: 1.3rem;
    }
    
    h3 {
        font-size: 1.1rem;
    }
    
    p, li {
        font-size: 1rem;
    }
    
    /* Profile image */
    #about img {
        width: 120px;
    }
    
    /* Lists - reduce margin */
    ul, ol {
        margin-left: 1rem;
    }
    
    /* Footer */
    footer {
        padding: 1.5rem 1rem;
    }
}
```

#### ขั้นตอนที่ 5: ทดสอบ Responsive (5 นาทีj)
1. เปิด Developer Tools (F12)
2. คลิก Toggle Device Toolbar (Ctrl+Shift+M)
3. ทดสอบขนาดหน้าจอต่างๆ:
   - iPhone SE (375x667)
   - iPad (768x1024)
   - Desktop (1920x1080)
4. ตรวจสอบว่าทุกอย่างดูดีและใช้งานได้

### ✅ เกณฑ์การผ่าน:
- [ ] เว็บไซต์แสดงผลดีบนมือถือ
- [ ] Navigation ปรับเป็นแนวตั้งบนมือถือ
- [ ] รูปภาพและข้อความปรับขนาดได้
- [ ] ไม่มี horizontal scrollbar บนมือถือ
- [ ] ทดสอบผ่านใน Developer Tools

---

## การส่งงาน LAB ด้วย Git 📤

### ขั้นตอนที่ 1: สร้าง Repository บน GitHub (5 นาที)
1. เข้า [github.com](https://github.com) และ Login
2. คลิก **"New repository"**
3. ตั้งชื่อ: `web-portfolio-lab1`
4. เลือก **Public**
5. ✅ เลือก **"Add a README file"**
6. คลิก **"Create repository"**

### ขั้นตอนที่ 2: Clone Repository (5 นาที)
1. คัดลอก HTTPS URL จาก GitHub
2. เปิด Terminal ใน VS Code (Ctrl + `)
3. รันคำสั่ง:
```bash
cd Desktop
git clone https://github.com/[username]/web-portfolio-lab1.git
```
4. ย้ายไฟล์ทั้งหมดเข้าโฟลเดอร์ที่ clone มา

### ขั้นตอนที่ 3: เพิ่มไฟล์และ Commit (5 นาที)
```bash
cd web-portfolio-lab1
git add .
git commit -m "Complete Lab 1: HTML, CSS, and Responsive Design"
```

### ขั้นตอนที่ 4: Push ขึ้น GitHub (3 นาที)
```bash
git push origin main
```

### ขั้นตอนที่ 5: เปิดใช้ GitHub Pages (5 นาที)
1. ไปที่ Repository Settings
2. เลื่อนลงหา **"Pages"**
3. เลือก Source: **"Deploy from a branch"**
4. เลือก Branch: **"main"**
5. คลิก **"Save"**
6. รอ 2-3 นาที จะได้ URL เว็บไซต์

### 📋 การส่งงาน:
ส่งใน LMS หรือระบบที่กำหนด:
1. **GitHub Repository URL:** https://github.com/[username]/web-portfolio-lab1
2. **Live Website URL:** https://[username].github.io/web-portfolio-lab1
3. **สกรีนช็อต:** เว็บไซต์บนมือถือและคอมพิวเตอร์

---

## เกณฑ์การให้คะแนน 📊

### Lab 1.1 - HTML พื้นฐาน (30 คะแนน)
- โครงสร้าง HTML5 ถูกต้อง (10 คะแนน)
- เนื้อหาครบถ้วน 4 sections (15 คะแนน)
- Semantic Tags และ Links (5 คะแนน)

### Lab 1.2 - CSS Styling (40 คะแนน)
- การเชื่อมต่อ CSS (5 คะแนน)
- Typography และ Colors (15 คะแนน)
- Layout และ Effects (15 คะแนน)
- ความสวยงามโดยรวม (5 คะแนน)

### Lab 1.3 - Responsive Design (25 คะแนน)
- Media Queries ถูกต้อง (10 คะแนน)
- แสดงผลดีบนมือถือ (10 คะแนน)
- การทดสอบและปรับแต่ง (5 คะแนน)

### การส่งงาน (5 คะแนน)
- GitHub Repository (2 คะแนน)
- GitHub Pages ทำงานได้ (2 คะแนน)
- ความสมบูรณ์ของงาน (1 คะแนน)

**รวม: 100 คะแนน**

---

## เคล็ดลับความสำเร็จ 💡

1. **อ่านโจทย์ให้ครบ** ก่อนเริ่มทำ
2. **ทำทีละขั้นตอน** อย่าข้าม
3. **ทดสอบบ่อยๆ** ใช้ Live Server
4. **ถามเมื่อติดขัด** อย่าใช้เวลานานกับปัญหาเดียว
5. **Backup โค้ด** ด้วย Git เป็นประจำ
6. **ดูตัวอย่าง** จากเว็บไซต์อื่นๆ เพื่อหาไอเดีย

**ขอให้สนุกกับการเขียนโค้ดครั้งแรก! 🚀**