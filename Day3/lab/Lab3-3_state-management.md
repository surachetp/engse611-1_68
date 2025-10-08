# Lab 3.3: Simple Counter Game - State Management เบื้องต้น

**เวลา:** 30 นาที  
**เป้าหมาย:** สร้างเกมนับคะแนนง่ายๆ ที่ใช้ useState หลายตัวร่วมกัน พร้อมให้นักศึกษาพัฒนาเองบางส่วน  
**เทคนิคที่ใช้:** useState, Event Handling, Conditional Rendering, State Calculations

---

## Part 1: Follow Along (15 นาที)
### ทำตามทีละขั้นตอน - ได้โครงสร้างพื้นฐาน 70%

### ขั้นตอนที่ 1: สร้างโปรเจคใหม่
```bash
# สร้างโปรเจค Counter Game
npm create vite@latest counter-game-lab -- --template react
cd counter-game-lab
npm install
npm run dev
```

---

### ขั้นตอนที่ 2: สร้าง CSS พื้นฐาน
**สร้างไฟล์:** `src/components/CounterGame.css`

```css
/* src/components/CounterGame.css - CSS พื้นฐาน นักศึกษาจะปรับปรุงเพิ่มเติม */
.game-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

.game-title {
  color: #6f42c1;
  margin-bottom: 25px;
  font-size: 2rem;
}

.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;
}

.stat-box {
  padding: 20px;
  border-radius: 10px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.game-buttons {
  margin: 20px 0;
}

.game-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 5px;
  transition: all 0.3s ease;
}

.btn-start {
  background: #28a745;
  color: white;
}

.btn-start:hover {
  background: #218838;
  transform: translateY(-2px);
}

.btn-click {
  background: #007bff;
  color: white;
}

.btn-click:hover {
  background: #0056b3;
  transform: scale(1.05);
}

.btn-stop {
  background: #dc3545;
  color: white;
}

.btn-stop:hover {
  background: #c82333;
}

.btn-disabled {
  background: #e9ecef !important;
  color: #6c757d !important;
  cursor: not-allowed !important;
  transform: none !important;
}

.game-result {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.instructions {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  font-size: 0.9rem;
}

/* ส่วนที่นักศึกษาจะต้องเพิ่มเติม:
- Time progress bar styles
- Level indicator styles  
- Animation effects
- Mobile responsive
*/
```

---

### ขั้นตอนที่ 3: สร้าง CounterGame Component (โครงสร้างพื้นฐาน)
**สร้างไฟล์:** `src/components/CounterGame.jsx`

```jsx
import React, { useState } from 'react';
import './CounterGame.css';

function CounterGame() {
    // States พื้นฐาน - ให้มาแล้ว
    const [score, setScore] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    
    // TODO: นักศึกษาจะเพิ่ม states เพิ่มเติมใน Challenge

    // ฟังก์ชันเริ่มเกม - พื้นฐาน
    const startGame = () => {
        setScore(0);
        setIsGameActive(true);
        // TODO: นักศึกษาจะรีเซ็ต states อื่นๆ ใน Challenge
    };

    // ฟังก์ชันเพิ่มคะแนน - พื้นฐาน
    const clickButton = () => {
        if (isGameActive) {
            setScore(score + 1);
            // TODO: นักศึกษาจะเพิ่ม logic การคำนวณเลเวลใน Challenge
        }
    };

    // ฟังก์ชันหยุดเกม - พื้นฐาน  
    const stopGame = () => {
        setIsGameActive(false);
        // TODO: นักศึกษาจะเพิ่มการบันทึกคะแนนสูงสุดใน Challenge
    };

    return (
        <div className="game-container">
            <h1 className="game-title">🎮 เกมนับคะแนน</h1>
            
            {/* สถิติเกม - พื้นฐาน */}
            <div className="stats-container">
                <div className="stat-box">
                    <div className="stat-number" style={{ color: '#007bff' }}>
                        {score}
                    </div>
                    <div className="stat-label">คะแนน</div>
                </div>
                
                {/* TODO: นักศึกษาจะเพิ่ม Level และ High Score ใน Challenge */}
                <div className="stat-box">
                    <div className="stat-number" style={{ color: '#28a745' }}>
                        1
                    </div>
                    <div className="stat-label">เลเวล</div>
                </div>
            </div>

            {/* ปุ่มควบคุมเกม */}
            <div className="game-buttons">
                {!isGameActive ? (
                    // ปุ่มเริ่มเกม
                    <button 
                        className="game-btn btn-start"
                        onClick={startGame}
                    >
                        🚀 เริ่มเกม
                    </button>
                ) : (
                    // ปุ่มเล่นเกม
                    <div>
                        <button 
                            className="game-btn btn-click"
                            onClick={clickButton}
                        >
                            👆 คลิก! (+1)
                        </button>
                        <br />
                        <button 
                            className="game-btn btn-stop"
                            onClick={stopGame}
                        >
                            ⏹️ หยุดเกม
                        </button>
                    </div>
                )}
            </div>

            {/* แสดงผลเมื่อเกมจบ */}
            {!isGameActive && score > 0 && (
                <div className="game-result">
                    <h3>🎉 เกมจบแล้ว!</h3>
                    <p>คะแนนรวม: <strong>{score}</strong> คะแนน</p>
                    {/* TODO: นักศึกษาจะเพิ่มการแสดงสถิติอื่นๆ ใน Challenge */}
                </div>
            )}

            {/* คำแนะนำการเล่น */}
            <div className="instructions">
                <h4>📖 วิธีเล่น:</h4>
                <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                    <li>คลิก "เริ่มเกม" เพื่อเริ่มเล่น</li>
                    <li>คลิกปุ่ม "คลิก!" เพื่อเก็บคะแนน</li>
                    <li>พยายามทำคะแนนให้ได้มากที่สุด!</li>
                    {/* TODO: นักศึกษาจะเพิ่มกติกาใหม่ใน Challenge */}
                </ul>
            </div>

            {/* Debug Info สำหรับการเรียนรู้ */}
            <div style={{ 
                marginTop: '20px', 
                padding: '10px', 
                background: '#f8f9fa', 
                borderRadius: '5px',
                fontSize: '0.8rem',
                color: '#666'
            }}>
                <strong>Debug States:</strong><br />
                score: {score} | isGameActive: {isGameActive.toString()}
                {/* TODO: นักศึกษาจะเพิ่ม states อื่นๆ ที่นี่ */}
            </div>
        </div>
    );
}

export default CounterGame;
```

---

### ขั้นตอนที่ 4: แก้ไข App Component
**แก้ไขไฟล์:** `src/App.jsx`

```jsx
import React from 'react';
import CounterGame from './components/CounterGame';

function App() {
    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px'
        }}>
            <CounterGame />
        </div>
    );
}

export default App;
```

---

### ขั้นตอนที่ 5: ทดสอบการทำงาน
```bash
npm run dev
```

**ผลลัพธ์พื้นฐานที่ได้:**
- ✅ แสดงหน้าเกมพร้อม UI สวยงาม
- ✅ คลิกเริ่มเกมได้
- ✅ คลิกเพิ่มคะแนนได้
- ✅ หยุดเกมได้
- ⚠️ **ยังไม่สมบูรณ์ - รอการพัฒนาใน Challenge!**

---

## Part 2: Challenge Time! (15 นาที) 
### งานที่นักศึกษาต้องทำเองจากความรู้ที่เรียนมา

### 🎯 **Challenge 1: เพิ่ม Level System และ High Score (5 นาที)**

**คำแนะนำ:**
- เพิ่ม state สำหรับ `level` และ `highScore`
- ทุก 10 คะแนน = เลเวลอัพ 1 ระดับ
- บันทึกคะแนนสูงสุดและแสดงผล

**สิ่งที่ต้องทำ:**
1. เพิ่ม `useState` สำหรับ `level` (เริ่มต้น 1) และ `highScore` (เริ่มต้น 0)
2. ในฟังก์ชัน `clickButton` เพิ่มการคำนวณ level ใหม่
3. ในฟังก์ชัน `stopGame` เพิ่มการอัพเดท high score
4. แสดง level และ high score ในส่วน stats
5. อัพเดท debug info ให้แสดง states ใหม่

**คำใบ้:** 
```jsx
// การคำนวณ level
const newLevel = Math.floor(newScore / 10) + 1;

// การอัพเดท high score
if (score > highScore) {
    setHighScore(score);
}
```

---

### 🎯 **Challenge 2: เพิ่ม Click Streak และ Bonus Points (5 นาที)**

**คำแนะนำ:**
- เพิ่ม state สำหรับ `clickStreak` (การคลิกต่อเนื่อง)
- ทุก 5 ครั้งต่อเนื่อง = โบนัส +5 คะแนน
- แสดงจำนวน streak ปัจจุบัน

**สิ่งที่ต้องทำ:**
1. เพิ่ม `useState` สำหรับ `clickStreak` (เริ่มต้น 0)
2. ในฟังก์ชัน `clickButton` เพิ่มการนับ streak
3. เช็คว่าถ้า streak หาร 5 ลงตัว ให้โบนัสคะแนน
4. แสดงจำนวน streak ใน UI
5. รีเซ็ต streak เมื่อเริ่มเกมใหม่

**คำใบ้:**
```jsx
// การเช็ค bonus
if (newStreak % 5 === 0) {
    setScore(prevScore => prevScore + 5); // โบนัส!
}
```

---

### 🎯 **Challenge 3: เพิ่ม Timer และ Auto Stop (5 นาที)**

**คำแนะนำ:**
- เพิ่ม state สำหรับ `timeLeft` (เริ่มต้น 30 วินาที)  
- ใช้ `setInterval` นับถอยหลัง
- เกมจบอัตโนมัติเมื่อหมดเวลา

**สิ่งที่ต้องทำ:**
1. เพิ่ม `useState` สำหรับ `timeLeft` (เริ่มต้น 30)
2. ใน `startGame` เริ่ม timer ด้วย `setInterval`
3. ลดเวลาทุกวินาที และหยุดเกมเมื่อเวลาหมด
4. แสดงเวลาเหลือใน UI
5. เคลียร์ timer เมื่อกดหยุดเกมหรือเกมจบ

**คำใบ้:**
```jsx
// ใน startGame
const timer = setInterval(() => {
    setTimeLeft(prev => {
        if (prev <= 1) {
            setIsGameActive(false);
            return 0;
        }
        return prev - 1;
    });
}, 1000);

// อย่าลืม clearInterval เมื่อเกมจบ!
```

---

## 🏆 **เกณฑ์การประเมินผล:**

### **ระดับพื้นฐาน (70%):**
- ✅ ทำ Challenge 1 สำเร็จ (Level System + High Score)
- ✅ Level คำนวณถูกต้อง (ทุก 10 คะแนน)
- ✅ High Score บันทึกและแสดงผลได้

### **ระดับดี (80%):**  
- ✅ Challenge 1 + 2 สำเร็จ
- ✅ Streak system ทำงานถูกต้อง
- ✅ Bonus points ให้ครบถูกเวลา

### **ระดับดีเยี่ยม (90-100%):**
- ✅ ทำครบทั้ง 3 Challenges
- ✅ Timer ทำงานถูกต้อง (นับถอยหลัง + auto stop)
- ✅ ไม่มี memory leaks (เคลียร์ timer ถูกต้อง)
- ✅ UI/UX เพิ่มเติม (เช่น progress bar, animations)

---

## 🎓 **สิ่งที่นักศึกษาจะได้เรียนรู้:**

### **จากการทำ Challenge:**
- **Multiple useState** - จัดการ state หลายตัวพร้อมกัน
- **State Calculations** - คำนวณค่าใหม่จาก state เดิม  
- **Conditional Logic** - เงื่อนไขในการอัพเดท state
- **Timer Management** - ใช้ setInterval กับ React
- **State Dependencies** - state ที่ขึ้นอยู่กับ state อื่น
- **Memory Management** - การเคลียร์ timer เพื่อป้องกัน memory leaks

### **React Concepts ที่ใช้:**
- **useState Hook** - การประกาศและใช้งาน
- **Event Handling** - onClick events
- **Conditional Rendering** - แสดงเนื้อหาตามเงื่อนไข  
- **State Updates** - การอัพเดท state อย่างถูกต้อง
- **Component Lifecycle** - การทำงานของ component

### **JavaScript Skills ที่ต้องใช้:**
- **Math.floor()** - การคำนวณ level
- **setInterval/clearInterval** - timer management
- **Modulo operator (%)** - เช็ค streak bonus
- **Conditional operators** - if/else, ternary operator
- **Arrow functions** - callback functions

### **เวลาในการทำ Challenge:**
- **Challenge 1:** 5 นาที (พื้นฐาน - ต้องทำได้ทุกคน)
- **Challenge 2:** 5 นาที (ปานกลาง - ใช้ logic calculation) 
- **Challenge 3:** 5 นาที (ยาก - ต้องจัดการ timer และ cleanup)

---

## 💡 **เคล็ดลับสำหรับอาจารย์:**

### **การสอนที่มีประสิทธิภาพ:**
- เน้นให้เข้าใจ **useState** ก่อนที่จะเพิ่ม state ใหม่
- อธิบาย **state dependencies** - ว่า state ตัวหนึ่งเปลี่ยนแล้วส่งผลกับตัวอื่น
- ให้ดู **debug info** เพื่อเข้าใจการเปลี่ยนแปลงของ state
- เตือนเรื่อง **memory leaks** จาก timer

### **จุดที่ต้องเฝ้าระวัง:**
- นักศึกษาอาจลืม **clearInterval** ในอัพเดท timer
- การใช้ **setScore(score + 1)** แทน **setScore(prev => prev + 1)**
- การคำนวณ level ผิด (ไม่ +1 ในการคำนวณ)
- การอัพเดท multiple states ในเวลาเดียวกัน

### **การช่วยเหลือนักศึกษา:**
- ให้เริ่มจาก Challenge ง่ายๆ ก่อน
- ใช้ `console.log()` เพื่อ debug state changes
- อธิบายว่าทำไมต้องใช้ `prev =>` ใน state updates
- แสดงตัวอย่างการเคลียร์ timer

---

**⏰ เวลาที่ใช้จริง: 30 นาที**  
**🎯 ระดับความยาก: เหมาะสำหรับผู้เริ่มต้น React + มี Challenge ที่ท้าทาย**  
**📚 เนื้อหาครอบคลุม: useState, Event Handling, State Management, Timer**