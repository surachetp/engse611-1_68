const http = require('http');
const url = require('url');
const fs = require('fs').promises; // เพิ่มโมดูล fs สำหรับบันทึกไฟล์

const PORT = 3000;

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

const server = http.createServer((req, res) => {
    try {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json; charset=utf-8');

        // Route: GET /
        if (method === 'GET' && pathname === '/') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: 'ยินดีต้อนรับสู่ Basic HTTP Server!',
                endpoints: [
                    'GET /',
                    'GET /students',
                    'POST /students',
                    'GET /students/:id',
                    'GET /students/major/:major',
                    'GET /stats'
                ]
            }));
            return;
        }

        // Route: GET /students (รองรับ query parameter ?year)
        if (method === 'GET' && pathname === '/students') {
            const year = parsedUrl.query.year;
            let result = students;
            if (year) {
                const yearNum = parseInt(year);
                if (isNaN(yearNum)) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'year ต้องเป็นตัวเลข' }));
                    return;
                }
                result = students.filter(s => s.year === yearNum);
            }
            res.statusCode = 200;
            res.end(JSON.stringify(result));
            return;
        }

        // Route: POST /students
        if (method === 'POST' && pathname === '/students') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                try {
                    const { name, major, year } = JSON.parse(body);
                    if (!name || !major || !year) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'ต้องระบุ name, major, และ year' }));
                        return;
                    }
                    if (typeof year !== 'number' || year < 1 || year > 4) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'year ต้องเป็นตัวเลขระหว่าง 1-4' }));
                        return;
                    }
                    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
                    const newStudent = { id, name, major, year };
                    students.push(newStudent);
                    try {
                        await fs.writeFile('students.json', JSON.stringify(students, null, 2));
                        res.statusCode = 201;
                        res.end(JSON.stringify(newStudent));
                    } catch (err) {
                        console.error('Error saving students:', err);
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'ไม่สามารถบันทึกข้อมูลได้' }));
                    }
                } catch (err) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'ข้อมูล JSON ไม่ถูกต้อง' }));
                }
            });
            return;
        }

        // Route: GET /students/:id
        if (method === 'GET' && pathname.startsWith('/students/') && pathname.split('/').length === 3) {
            const id = parseInt(pathname.split('/')[2]);
            if (isNaN(id)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'ID ต้องเป็นตัวเลข' }));
                return;
            }
            const student = students.find(s => s.id === id);
            if (student) {
                res.statusCode = 200;
                res.end(JSON.stringify(student));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'ไม่พบนักศึกษาด้วย ID นี้' }));
            }
            return;
        }

        // Route: GET /students/major/:major
        if (method === 'GET' && pathname.startsWith('/students/major/') && pathname.split('/').length === 4) {
            const major = decodeURIComponent(pathname.split('/')[3]);
            const filteredStudents = students.filter(s => s.major === major);
            if (filteredStudents.length > 0) {
                res.statusCode = 200;
                res.end(JSON.stringify(filteredStudents));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'ไม่พบนักศึกษาในสาขานี้' }));
            }
            return;
        }

        // Route: GET /stats
        if (method === 'GET' && pathname === '/stats') {
            const totalStudents = students.length;
            const majors = [...new Set(students.map(s => s.major))];
            const majorCounts = majors.reduce((acc, major) => {
                acc[major] = students.filter(s => s.major === major).length;
                return acc;
            }, {});
            res.statusCode = 200;
            res.end(JSON.stringify({
                totalStudents,
                majorCounts
            }));
            return;
        }

        // Handle 404 Not Found
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'ไม่พบ Endpoint ที่ร้องขอ' }));
    } catch (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' }));
    }
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  POST /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});