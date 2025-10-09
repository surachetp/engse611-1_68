import React, { useState, useEffect, useRef } from 'react';
import './CounterGame.css';

function CounterGame() {
  // 🔢 คะแนนปัจจุบัน
  const [count, setCount] = useState(0);

  // ▶ สถานะเกม
  const [isRunning, setIsRunning] = useState(false);

  // ⏳ เวลาเล่นที่เหลือ
  const [timeLeft, setTimeLeft] = useState(30);

  // 🧩 เลเวล
  const [level, setLevel] = useState(1);

  // 🏆 คะแนนสูงสุด
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem('highScore')) || 0
  );

  // 🔥 คลิกต่อเนื่อง
  const [clickStreak, setClickStreak] = useState(0);

  // ✨ เอฟเฟกต์เลเวลอัป
  const [levelUpEffect, setLevelUpEffect] = useState(false);

  // ⏱ เก็บ timer
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

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          stopGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /* =========================
     👆 เมื่อคลิกเพิ่มคะแนน
  ========================== */
  const clickButton = () => {
    if (!isRunning) return;

    const newStreak = clickStreak + 1;
    setClickStreak(newStreak);

    let bonus = 0;
    if (newStreak % 5 === 0) bonus = 5; // โบนัสทุก 5 คลิก

    const newCount = count + 1 + bonus;
    setCount(newCount);

    const newLevel = Math.floor(newCount / 10) + 1;
    if (newLevel > level) {
      setLevelUpEffect(true);
      setTimeout(() => setLevelUpEffect(false), 1000);
    }
    setLevel(newLevel);
  };

  /* =========================
     ⏹ หยุดเกม
  ========================== */
  const stopGame = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);

    if (count > highScore) {
      setHighScore(count);
      localStorage.setItem('highScore', count);
    }
  };

  /* =========================
     🧹 เคลียร์ timer เมื่อ unmount
  ========================== */
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="game-card">
      <h1>⚡ Counter Game</h1>

      <div className="stats">
        <p>⏳ เวลา: {timeLeft}s</p>
        <p>⭐ คะแนน: {count}</p>
        <p>🔥 เลเวล: {level}</p>
        <p>💥 สตรีคต่อเนื่อง: {clickStreak}</p>
        <p>🏆 คะแนนสูงสุด: {highScore}</p>
      </div>

      <div className="buttons">
        {!isRunning ? (
          <button className="start-btn" onClick={startGame}>▶ เริ่มเกม</button>
        ) : (
          <button className="click-btn" onClick={clickButton}>+1 คะแนน</button>
        )}
      </div>

      {isRunning && <button className="stop-btn" onClick={stopGame}>⏹ หยุดเกม</button>}

      {levelUpEffect && <div className="level-up-effect">🎉 Level Up! 🎉</div>}

      <div className="debug-box">
        <h3>🧩 Debug Info</h3>
        <pre>{JSON.stringify({ count, timeLeft, isRunning, level, highScore, clickStreak }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default CounterGame;
