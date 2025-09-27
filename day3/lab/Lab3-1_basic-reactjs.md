# Lab 3.1: ทำความรู้จักกับ React.js และ JSX
## Personal Profile Component

**เวลา:** 30 นาที  
**เป้าหมาย:** สร้าง Component แสดงโปรไฟล์ส่วนตัวแบบ Interactive  
**เทคนิคที่ใช้:** JSX, Props, Conditional Rendering, Lists, Event Handling

---

## Part 1: Follow Along (15 นาที)
### ทำตามทีละขั้นตอน

### ขั้นตอนที่ 1: สร้างโปรเจค React ด้วย Vite
```bash
# เปิด Terminal หรือ Command Prompt
npm create vite@latest personal-profile-lab -- --template react
cd personal-profile-lab
npm install
npm run dev
```

**ทำไมใช้ Vite แทน Create React App?**

#### 🚀 **ข้อดีของ Vite:**
1. **เร็วกว่ามาก** - Hot Module Replacement (HMR) ใน 0.1 วินาที
2. **ขนาดเล็กกว่า** - โปรเจคเบา ไฟล์น้อย
3. **Build เร็วกว่า** - ใช้ esbuild แทน Webpack  
4. **ทันสมัย** - รองรับ ES modules แบบ native
5. **เป็นมาตรฐานใหม่** - Vue, React, Svelte ใช้กันแล้ว

#### ⏱️ **เปรียบเทียบเวลา:**
- **Create React App:** Start ~30 วินาที, Hot reload ~2 วินาที
- **Vite:** Start ~3 วินาที, Hot reload ~0.1 วินาที

**อธิบาย:**
- `npm create vite@latest` สร้างโปรเจค Vite + React ใหม่
- `npm install` ติดตั้ง dependencies
- `npm run dev` รันโปรเจคที่ localhost:5173

**ผลลัพธ์:** เบราว์เซอร์เปิดที่ http://localhost:5173 แสดงหน้า Vite + React logo

---

### ขั้นตอนที่ 2: ลบไฟล์ที่ไม่ใช้และเตรียมโครงสร้าง
```bash
# ลบไฟล์ที่ไม่ต้องใช้
rm src/App.css src/index.css
```

**แก้ไขไฟล์ `src/main.jsx`:**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

### ขั้นตอนที่ 3: สร้างไฟล์ CSS สำหรับ styling
**สร้างไฟล์:** `src/ProfileCard.css`

```css
/* ProfileCard.css */
.profile-card {
  max-width: 500px;
  margin: 20px auto;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Arial', sans-serif;
}

.profile-header {
  text-align: center;
  margin-bottom: 25px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 15px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #667eea;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.profile-name {
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}

.student-id {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  display: inline-block;
  font-size: 14px;
}

.profile-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}

.info-item {
  background: rgba(255, 255, 255, 0.15);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.info-label {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-value {
  font-size: 18px;
  font-weight: bold;
}

.profile-section {
  margin: 20px 0;
}

.profile-section h3 {
  font-size: 18px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.hobby-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.hobby-item:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.25);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-tag:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.contact-button {
  width: 100%;
  padding: 12px;
  background: #fff;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.contact-button:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 600px) {
  .profile-card {
    margin: 10px;
    padding: 20px;
  }
  
  .profile-info {
    grid-template-columns: 1fr;
  }
  
  .skills {
    grid-template-columns: 1fr 1fr;
  }
}
```

---

### ขั้นตอนที่ 4: สร้าง ProfileCard Component
**สร้างไฟล์:** `src/ProfileCard.jsx`

```jsx
import React from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
    // ฟังก์ชันสำหรับแสดง Avatar (ตัวอักษรแรกของชื่อ)
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    // ฟังก์ชันจัดการเมื่อคลิกปุ่ม Contact
    const handleContactClick = () => {
        alert(`สวัสดี! ติดต่อ ${profile.name} ที่อีเมล ${profile.email}`);
    };

    // ฟังก์ชันจัดการเมื่อคลิกที่ skill
    const handleSkillClick = (skill) => {
        alert(`${profile.name} มีความเชี่ยวชาญใน ${skill}!`);
    };

    return (
        <div className="profile-card">
            {/* ส่วนหัว - รูปและชื่อ */}
            <div className="profile-header">
                <div className="profile-avatar">
                    {getInitials(profile.name)}
                </div>
                <h1 className="profile-name">{profile.name}</h1>
                <div className="student-id">{profile.studentId}</div>
            </div>

            {/* ข้อมูลพื้นฐาน */}
            <div className="profile-info">
                <div className="info-item">
                    <div className="info-label">สาขา</div>
                    <div className="info-value">{profile.major}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">ชั้นปี</div>
                    <div className="info-value">{profile.year}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">อายุ</div>
                    <div className="info-value">{profile.age} ปี</div>
                </div>
                <div className="info-item">
                    <div className="info-label">เกรด</div>
                    <div className="info-value">
                        {profile.gpa.toFixed(2)}
                        {profile.gpa >= 3.5 && ' 🌟'}
                    </div>
                </div>
            </div>

            {/* งานอดิเรก */}
            <div className="profile-section">
                <h3>🎯 งานอดิเรก</h3>
                <ul className="hobbies-list">
                    {profile.hobbies.map((hobby, index) => (
                        <li key={index} className="hobby-item">
                            {hobby}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ทักษะ */}
            <div className="profile-section">
                <h3>💻 ทักษะ</h3>
                <div className="skills">
                    {profile.skills.map((skill, index) => (
                        <div 
                            key={index} 
                            className="skill-tag"
                            onClick={() => handleSkillClick(skill)}
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* ปุ่ม Contact */}
            <button 
                className="contact-button"
                onClick={handleContactClick}
            >
                📧 ติดต่อ {profile.name}
            </button>
        </div>
    );
}

export default ProfileCard;
```

---

### ขั้นตอนที่ 5: แก้ไข App Component
**แก้ไขไฟล์:** `src/App.jsx`

```jsx
import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
    // ข้อมูลโปรไฟล์ตัวอย่าง
    const sampleProfile = {
        name: "สมชาย ใจดี",
        studentId: "66130500001",
        major: "วิศวกรรมซอฟต์แวร์",
        year: 3,
        age: 21,
        gpa: 3.75,
        email: "somchai.jaidee@student.university.ac.th",
        hobbies: [
            "เขียนโค้ด",
            "เล่นเกม",
            "ดูหนัง",
            "ฟังเพลง",
            "อ่านหนังสือ"
        ],
        skills: [
            "JavaScript",
            "React.js",
            "HTML/CSS",
            "Python",
            "Git",
            "Node.js"
        ]
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(45deg, #f0f2f5 0%, #e8eaf6 100%)',
            padding: '20px'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ 
                    color: '#333', 
                    fontSize: '32px',
                    margin: '20px 0'
                }}>
                    🎓 Personal Profile Card
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Lab 3.1 - ทำความรู้จักกับ React.js และ JSX
                </p>
            </div>
            
            <ProfileCard profile={sampleProfile} />
        </div>
    );
}

export default App;
```

---

### ขั้นตอนที่ 6: ทดสอบและรัน
```bash
# ตรวจสอบว่าทุกอย่างทำงานได้
npm run dev
```

**ตรวจสอบผลลัพธ์:**
1. ✅ โปรไฟล์การ์ดแสดงข้อมูลครบ
2. ✅ Avatar แสดงตัวอักษรแรก
3. ✅ คลิกที่ทักษะแสดง alert
4. ✅ คลิกปุ่ม Contact แสดงอีเมล
5. ✅ Responsive design ใช้งานได้

---

## Part 2: Challenge Time! (15 นาที)
### งานที่ต้องทำให้เสร็จ

ตอนนี้เรามี ProfileCard component พื้นฐานแล้ว ให้นักศึกษาเพิ่มฟีเจอร์ต่อไปนี้:

### 🎯 **Challenge 1: เพิ่มข้อมูลส่วนตัว (5 นาที)**

**ในไฟล์ `src/App.jsx` เพิ่ม:**
```jsx
const myProfile = {
    name: "ชื่อจริงของคุณ",
    studentId: "รหัสนักศึกษาของคุณ", 
    major: "สาขาของคุณ",
    year: /* ชั้นปีของคุณ */,
    age: /* อายุของคุณ */,
    gpa: /* เกรดของคุณ */,
    email: "อีเมลของคุณ",
    hobbies: [
        // เพิ่มงานอดิเรกของคุณ 5 อย่าง
    ],
    skills: [
        // เพิ่มทักษะของคุณ 4-6 อย่าง
    ]
};

// แล้วแสดง ProfileCard ทั้งสองแบบ
return (
    <div>
        {/* แสดงตัวอย่าง */}
        <ProfileCard profile={sampleProfile} />
        
        {/* แสดงของตัวเอง */}
        <ProfileCard profile={myProfile} />
    </div>
);
```

---

### 🎯 **Challenge 2: เพิ่ม Social Links (5 นาที)**

**ในไฟล์ `src/ProfileCard.jsx` เพิ่ม:**

```jsx
// เพิ่มในส่วน profile data
const socialLinks = profile.socialLinks || [];

// เพิ่มใน JSX หลัง skills section
{socialLinks.length > 0 && (
    <div className="profile-section">
        <h3>🌐 Social Media</h3>
        <div className="social-links">
            {socialLinks.map((link, index) => (
                <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    {link.platform}
                </a>
            ))}
        </div>
    </div>
)}
```

**เพิ่ม CSS ในไฟล์ `ProfileCard.css`:**
```css
.social-links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.social-link {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.social-link:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
}
```

**เพิ่มข้อมูล social ใน App.jsx:**
```jsx
socialLinks: [
    { platform: "GitHub", url: "https://github.com/yourusername" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { platform: "Facebook", url: "https://facebook.com/yourusername" }
]
```

---

### 🎯 **Challenge 3: เพิ่ม Animation และ Dark Mode Toggle (5 นาที)**

**เพิ่ม state และ function ใน ProfileCard.jsx:**
```jsx
import React, { useState } from 'react';

function ProfileCard({ profile }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    
    // เพิ่ม className conditionally
    const cardClassName = `profile-card ${isDarkMode ? 'dark-mode' : ''}`;
    
    return (
        <div className={cardClassName}>
            {/* เพิ่มปุ่ม toggle ในส่วน header */}
            <div className="profile-header">
                <button 
                    className="theme-toggle"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                {/* ... rest of header ... */}
            </div>
            {/* ... rest of component ... */}
        </div>
    );
}
```

**เพิ่ม CSS สำหรับ dark mode:**
```css
.theme-toggle {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.3);
}

.profile-card.dark-mode {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
}

/* เพิ่ม smooth transition */
.profile-card {
    transition: all 0.3s ease;
    position: relative;
}
```

---

## 🏆 **ผลลัพธ์ที่คาดหวัง:**

เมื่อเสร็จแล้วจะได้:
1. ✅ ProfileCard แสดงข้อมูลส่วนตัวจริง
2. ✅ Social media links ที่คลิกได้
3. ✅ Dark/Light mode toggle
4. ✅ Responsive design ใช้งานได้ดี
5. ✅ Interactive elements มี hover effects

## 🎓 **สิ่งที่เรียนรู้:**
- **JSX syntax** - เขียน HTML ใน JavaScript
- **Components** - สร้างชิ้นส่วน UI ที่นำกลับมาใช้ได้
- **Props** - ส่งข้อมูลระหว่าง components
- **Event Handling** - จัดการ onClick, hover
- **Conditional Rendering** - แสดงเนื้อหาตามเงื่อนไข
- **Map function** - วนลูปแสดงรายการ
- **CSS-in-React** - จัดการ styles และ classes
- **State (Preview)** - เก็บข้อมูลที่เปลี่ยนแปลงได้

## 🚀 **Next Steps:**
พร้อมสำหรับหัวข้อถัดไป: **Components & Props** ที่จะเจาะลึกการส่งข้อมูลและสร้าง reusable components มากขึ้น!

---

**⏰ เวลาที่ใช้จริง: ~30 นาที**  
**🎯 ความยาก: เหมาะสำหรับมือใหม่**  
**💡 Tips: ถ้าติดปัญหา ลองดู console.log และ browser developer tools**