import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
    // ข้อมูลโปรไฟล์ตัวอย่าง
    const sampleProfile = {
        name: "สุรเชษฐ์ เป็งคำ",
        studentId: "68543210080-6",
        major: "วิศวกรรมซอฟต์แวร์",
        year: 1,
        age: 36,
        gpa: 3.50,
        email: "surachet.pengcom@live.rmutl.ac.th",
        hobbies:
         [ // เพิ่มงานอดิเรกของคุณ 5 อย่าง
            "เขียนโค้ด",
            "เล่นเกม",
            "ดูหนัง",
            "ฟังเพลง",
            "ตกปลา",
            "ขี่รถเที่ยวดอย",
            "อ่านหนังสือ"
        ],
        skills: [ // เพิ่มทักษะของคุณ 4-6 อย่าง
            "JavaScript",
            "React.js",
            "HTML/CSS",
            "Python",
            "Git",
            "Node.js"
            
        ],
        /* Social Links - นักศึกษาเพิ่มเอง */
        socialLinks: [
            { platform: "GitHub", url: "https://github.com/yourusername" },
            { platform: "TikTok", url: "https://www.tiktok.com/foryou" },
            { platform: "Facebook", url: "https://www.facebook.com/" },
            { platform: "Instagram", url: "hhttps://www.instagram.com/?utm_source=pwa_homescreen&__pwa=1" }
            // เพิ่มเติมตามต้องการ
        ]
    };
             // TODO: นักศึกษาจะเพิ่ม fields เพิ่มเติมใน Challenge
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
