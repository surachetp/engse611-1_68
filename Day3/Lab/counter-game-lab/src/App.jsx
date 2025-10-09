import React, { useState, useEffect, useRef } from 'react';

function CounterGame() {
  // 🔢 คะแนนปัจจุบัน
  const [count, setCount] = useState(0);

  // ▶ สถานะเกม (กำลังเล่น / หยุด)
  const [isRunning, setIsRunning] = useState(false);

  // ⏳ เวลาเล่นที่เหลือ (เริ่มต้น 30 วินาที)
  const [timeLeft, setTimeLeft] = useState(30);

  // 🧩 ระบบเลเวล
  const [level, setLevel] = useState(1);

  // 🏆 คะแนนสูงสุด (ดึงจาก localStorage)
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem('highScore')) || 0
  );

  // 🔥 ระบบคลิกต่อเนื่อง (Click Streak)
  const [clickStreak, setClickStreak] = useState(0);

  // ✨ เอฟเฟกต์เมื่อเลเวลอัป
  const [levelUpEffect, setLevelUpEffect] = useState(false);

  // ⏱ เก็บค่า timer (เพื่อเคลียร์ interval ได้)
  const timerRef = useRef(null);

  /* =========================
     🎮 เริ่มเกมใหม่
  ========================== */
  const startGame = () => {
    setIsRunning(true);
    setCount(0);
    setLevel(1);
    setClickStreak(0);
    setTimeLeft(30);
    setLevelUpEffect(false);

    // ถ้ามี timer เดิม ให้ล้างก่อน
    if (timerRef.current) clearInterval(timerRef.current);

    // สร้าง timer ใหม่
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          stopGame(); // หมดเวลา = หยุดเกมอัตโนมัติ
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /* =========================
     👆 เมื่อคลิกปุ่มเพิ่มคะแนน
  ========================== */
  const clickButton = () => {
    if (!isRunning) return;

    // เพิ่มค่า streak
    const newStreak = clickStreak + 1;
    setClickStreak(newStreak);

    let bonus = 0;

    // 🎁 ทุก 5 คลิกติดต่อกัน = โบนัส +5 คะแนน
    if (newStreak % 5 === 0) {
      bonus = 5;
    }

    const newCount = count + 1 + bonus;
    setCount(newCount);

    // คำนวณเลเวลใหม่
    const newLevel = Math.floor(newCount / 10) + 1;

    // ถ้าเลเวลเพิ่ม → แสดงเอฟเฟกต์
    if (newLevel > level) {
      setLevelUpEffect(true);
      setTimeout(() => setLevelUpEffect(false), 1000);
    }

    setLevel(newLevel);
  };

  /* =========================
     ⏹ หยุดเกม (ทั้งกดเอง และหมดเวลา)
  ========================== */
  const stopGame = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);

    // ถ้าคะแนนครั้งนี้มากกว่าคะแนนสูงสุด → อัปเดต high score
    if (count > highScore) {
      setHighScore(count);
      localStorage.setItem('highScore', count);
    }
  };

  /* =========================
     🧹 เคลียร์ timer เมื่อ component ถูก unmount
  ========================== */
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚡ Counter Game</h1>

      {/* 🔹 แสดงสถานะของเกม */}
      <div style={styles.stats}>
        <p>⏳ เวลา: {timeLeft} วินาที</p>
        <p>⭐ คะแนน: {count}</p>
        <p>🔥 เลเวล: {level}</p>
        <p>💥 สตรีคต่อเนื่อง: {clickStreak}</p>
        <p>🏆 คะแนนสูงสุด: {highScore}</p>
      </div>

      {/* 🔹 ปุ่มควบคุม */}
      <div style={styles.buttons}>
        {!isRunning ? (
          <button style={styles.startBtn} onClick={startGame}>
            ▶ เริ่มเกม
          </button>
        ) : (
          <button style={styles.clickBtn} onClick={clickButton}>
            +1 คะแนน
          </button>
        )}
      </div>

      {/* 🔹 ปุ่มหยุดเกม */}
      {isRunning && (
        <button style={styles.stopBtn} onClick={stopGame}>
          ⏹ หยุดเกม
        </button>
      )}

      {/* ✨ เอฟเฟกต์เลเวลอัป */}
      {levelUpEffect && (
        <div style={styles.levelUpEffect}>🎉 Level Up! 🎉</div>
      )}

      {/* 🔍 Debug Info */}
      <div style={styles.debugBox}>
        <h3>🧩 Debug Info</h3>
        <pre>
          {JSON.stringify(
            { count, timeLeft, isRunning, level, highScore, clickStreak },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}

/* =========================
   🎨 ส่วนกำหนดสไตล์
========================= */
const styles = {
  container: {
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    color: 'white',
    maxWidth: '400px',
    margin: '0 auto',
    backdropFilter: 'blur(10px)',
    position: 'relative',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  stats: {
    marginBottom: '20px',
    fontSize: '1.2rem',
    lineHeight: '1.6',
  },
  buttons: {
    marginBottom: '20px',
  },
  startBtn: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1.2rem',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  clickBtn: {
    background: '#ffca28',
    color: '#333',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1.2rem',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  stopBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  levelUpEffect: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '2rem',
    color: '#fff',
    animation: 'pop 1s ease-out',
    textShadow: '0 0 10px gold, 0 0 20px orange',
  },
  debugBox: {
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '8px',
    padding: '10px',
    marginTop: '20px',
    fontSize: '0.9rem',
    textAlign: 'left',
  },
};

export default CounterGame;
