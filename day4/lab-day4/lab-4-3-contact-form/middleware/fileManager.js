const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // npm install uuid

const DATA_DIR = path.join(__dirname, '../data');

// ฟังก์ชัน append ข้อมูลลงไฟล์ JSON
const appendToJsonFile = (fileName, data) => {
    const filePath = path.join(DATA_DIR, fileName);

    let fileData = [];
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        try {
            fileData = JSON.parse(content);
        } catch (err) {
            console.error(`Error parsing JSON from ${fileName}:`, err.message);
        }
    }

    // เพิ่ม id และ timestamp
    const newData = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        ...data
    };

    fileData.push(newData);

    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
    return newData;
};

// ฟังก์ชัน getFileStats → ส่งจำนวนข้อมูลในแต่ละไฟล์
const getFileStats = () => {
    const stats = {};
    const files = fs.readdirSync(DATA_DIR);

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(DATA_DIR, file);
            let fileData = [];
            try {
                const content = fs.readFileSync(filePath, 'utf-8');
                fileData = JSON.parse(content);
            } catch (err) {
                console.error(`Error reading/parsing ${file}:`, err.message);
            }
            stats[file] = fileData.length;
        }
    });

    return stats;
};

module.exports = {
    appendToJsonFile,
    getFileStats
};


