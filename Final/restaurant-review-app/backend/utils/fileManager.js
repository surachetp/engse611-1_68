const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

/**
 * ✅ ฟังก์ชันช่วยตรวจสอบให้แน่ใจว่า path อยู่ในโฟลเดอร์ data เท่านั้น
 * ป้องกัน Directory Traversal (เช่น ../../etc/passwd)
 */
const safePath = (filename) => {
  const resolved = path.resolve(DATA_DIR, filename);
  if (!resolved.startsWith(DATA_DIR)) {
    throw new Error('Access to invalid path is not allowed');
  }
  return resolved;
};

/**
 * ✅ อ่านไฟล์ JSON
 * - ตรวจสอบว่าไฟล์อยู่ในโฟลเดอร์ที่ปลอดภัย
 * - คืนค่า array หรือ object
 * - ถ้าไฟล์ไม่เจอหรือเสีย ให้คืน []
 * 
 * @param {string} filename - ชื่อไฟล์ JSON เช่น 'restaurants.json'
 * @returns {Promise<Array|Object>} - ข้อมูลจากไฟล์ (ถ้า error จะได้ [])
 */
const readJsonFile = async (filename) => {
  try {
    const filePath = safePath(filename);
    const data = await fs.readFile(filePath, 'utf8');

    // ✅ ตรวจสอบข้อมูลว่ามีรูปแบบ JSON ที่ถูกต้อง
    try {
      return JSON.parse(data);
    } catch (parseErr) {
      console.warn(`⚠️ Invalid JSON format in ${filename}, returning empty array.`);
      return [];
    }

  } catch (error) {
    // ✅ ถ้าไฟล์ไม่เจอ — คืน []
    if (error.code === 'ENOENT') {
      console.warn(`⚠️ File ${filename} not found. Returning empty array.`);
      return [];
    }

    console.error(`❌ Error reading ${filename}:`, error);
    return [];
  }
};

/**
 * ✅ เขียนไฟล์ JSON
 * - ตรวจสอบ path ปลอดภัย
 * - แปลงข้อมูลเป็น JSON (มีการ indent 2 ช่อง)
 * - ถ้า error ให้ return false
 * 
 * @param {string} filename - ชื่อไฟล์
 * @param {Array|Object} data - ข้อมูลที่จะเขียน
 * @returns {Promise<boolean>} - สำเร็จหรือไม่
 */
const writeJsonFile = async (filename, data) => {
  try {
    const filePath = safePath(filename);

    // ✅ สร้างโฟลเดอร์ data ถ้ายังไม่มี
    await fs.mkdir(DATA_DIR, { recursive: true });

    // ✅ เขียนไฟล์แบบ pretty JSON (อ่านง่ายเวลา debug)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return true;
  } catch (error) {
    console.error(`❌ Error writing ${filename}:`, error);
    return false;
  }
};

/**
 * ✅ ฟังก์ชันเสริม (ไม่จำเป็นแต่มีประโยชน์มาก)
 * ใช้สำหรับตรวจสอบว่าไฟล์มีอยู่จริงไหม
 * @param {string} filename
 * @returns {Promise<boolean>}
 */
const fileExists = async (filename) => {
  try {
    const filePath = safePath(filename);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  fileExists, // ฟังก์ชันเสริม
};
