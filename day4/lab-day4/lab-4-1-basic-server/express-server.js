const express = require('express');
const cors = require('cors'); // เพิ่มโมดูล cors
const fs = require('fs').promises; // เพิ่มโมดูล fs สำหรับบันทึกไฟล์
const app = express();
const PORT = 3001;

// Mock data: students array (จะโหลดจากไฟล์)
let students = [];

// โหลดข้อมูลจากไฟล์เมื่อเริ่มเซิร์ฟเวอร์
async function loadStudents() {
    try {
        const data = await fs.readFile('students.json', 'utf8');
        students = JSON.parse(data);
    } catch (err) {
        console.error('Error loading students:', err);
        students = [
            { id: 1, name: 'Manchester United', major: 'วิศวกรรม', year: 1 },
            { id: 2, name: 'Arsenal', major: 'วิทยาการคอมพิวเตอร์', year: 2 },
            { id: 3, name: 'Liverpool', major: 'วิศวกรรม', year: 3 }
        ];
    }
}
loadStudents();

// Middleware
app.use(cors()); // เพิ่ม CORS
app.use(express.json());

// Route: GET /
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'ยินดีต้อนรับสู่ Express Server!',
        endpoints: [
            'GET /',
            'GET /students',
            'POST /students',
            'GET /students/:id',
            'GET /students/major/:major',
            'GET /stats'
        ]
    });
});

// Route: GET /students (รองรับ query parameter ?year)
app.get('/students', (req, res) => {
    const { year } = req.query;
    let result = students;
    if (year) {
        const yearNum = parseInt(year);
        if (isNaN(yearNum)) {
            return res.status(400).json({ error: 'year ต้องเป็นตัวเลข' });
        }
        result = students.filter(s => s.year === yearNum);
    }
    res.status(200).json(result);
});

// Route: POST /students
app.post('/students', async (req, res) => {
    const { name, major, year } = req.body;
    if (!name || !major || !year) {
        return res.status(400).json({ error: 'ต้องระบุ name, major, และ year' });
    }
    if (typeof year !== 'number' || year < 1 || year > 4) {
        return res.status(400).json({ error: 'year ต้องเป็นตัวเลขระหว่าง 1-4' });
    }
    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = { id, name, major, year };
    students.push(newStudent);
    try {
        await fs.writeFile('students.json', JSON.stringify(students, null, 2));
        res.status(201).json(newStudent);
    } catch (err) {
        console.error('Error saving students:', err);
        res.status(500).json({ error: 'ไม่สามารถบันทึกข้อมูลได้' });
    }
});

// Route: GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID ต้องเป็นตัวเลข' });
    }
    const student = students.find(s => s.id === id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ error: 'ไม่พบนักศึกษาด้วย ID นี้' });
    }
});

// Route: GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
    const major = decodeURIComponent(req.params.major);
    const filteredStudents = students.filter(s => s.major === major);
    if (filteredStudents.length > 0) {
        res.status(200).json(filteredStudents);
    } else {
        res.status(404).json({ error: 'ไม่พบนักศึกษาในสาขานี้' });
    }
});

// Route: GET /stats
app.get('/stats', (req, res) => {
    const totalStudents = students.length;
    const majors = [...new Set(students.map(s => s.major))];
    const majorCounts = majors.reduce((acc, major) => {
        acc[major] = students.filter(s => s.major === major).length;
        return acc;
    }, {});
    res.status(200).json({
        totalStudents,
        majorCounts
    });
});

// Middleware: Handle 404
app.use((req, res) => {
    res.status(404).json({ error: 'ไม่พบ Endpoint ที่ร้องขอ' });
});

// Middleware: Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
});

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  POST /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});