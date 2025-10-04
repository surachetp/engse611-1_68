// Global variables
let isSubmitting = false;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const feedbackForm = document.getElementById('feedbackForm');
const statusMessages = document.getElementById('statusMessages');
const apiResults = document.getElementById('apiResults');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeForms();
    setupEventListeners();
    loadContacts();
    loadFeedbackStats();
    loadAPIStatus();
});

function initializeForms() {
    // Update rating display
    if (ratingSlider && ratingValue) {
        ratingSlider.addEventListener('input', () => {
            ratingValue.textContent = ratingSlider.value;
        });
    }
}

function setupEventListeners() {
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await submitContactForm();
        });

        // Real-time validation for contact form
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const { isValid, message } = validateField(input.name, input.value);
                const errorElem = document.getElementById(input.name + 'Error');
                if (errorElem) errorElem.textContent = isValid ? '' : message;
            });
        });
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await submitFeedbackForm();
        });

        // Real-time validation for feedback form
        feedbackForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                const { isValid, message } = validateField(input.name, input.value);
                const errorElem = document.getElementById(input.name + 'Error');
                if (errorElem) errorElem.textContent = isValid ? '' : message;
            });
        });
    }
}

// -------------------- Validation --------------------
function validateField(fieldName, value) {
    value = value.trim();
    switch (fieldName) {
        case 'name':
            if (value.length < 2) return { isValid: false, message: 'Name must be at least 2 characters' };
            if (value.length > 100) return { isValid: false, message: 'Name must not exceed 100 characters' };
            return { isValid: true, message: '' };
        case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { isValid: false, message: 'Invalid email format' };
            return { isValid: true, message: '' };
        case 'subject':
            if (value.length < 5) return { isValid: false, message: 'Subject must be at least 5 characters' };
            if (value.length > 200) return { isValid: false, message: 'Subject must not exceed 200 characters' };
            return { isValid: true, message: '' };
        case 'message':
            if (value.length < 10) return { isValid: false, message: 'Message must be at least 10 characters' };
            if (value.length > 1000) return { isValid: false, message: 'Message must not exceed 1000 characters' };
            return { isValid: true, message: '' };
        case 'phone':
            if (value !== '' && !/^[0-9]{9,10}$/.test(value)) return { isValid: false, message: 'Phone must be 9-10 digits' };
            return { isValid: true, message: '' };
        case 'company':
            if (value.length > 100) return { isValid: false, message: 'Company name must not exceed 100 characters' };
            return { isValid: true, message: '' };
        case 'rating':
            const num = parseInt(value);
            if (isNaN(num) || num < 1 || num > 5) return { isValid: false, message: 'Rating must be 1-5' };
            return { isValid: true, message: '' };
        case 'comment':
            if (value.length < 5) return { isValid: false, message: 'Comment must be at least 5 characters' };
            if (value.length > 500) return { isValid: false, message: 'Comment must not exceed 500 characters' };
            return { isValid: true, message: '' };
        default:
            return { isValid: true, message: '' };
    }
}

// -------------------- Submit Feedback Form --------------------
async function submitFeedbackForm() {
    if (isSubmitting) return;

    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    data.rating = parseInt(data.rating);

    // Client-side validation
    const errors = [];
    Object.keys(data).forEach(key => {
        const { isValid, message } = validateField(key, data[key]);
        if (!isValid) errors.push(message);
    });

    if (errors.length > 0) {
        errors.forEach(err => showStatusMessage(`🔸 ${err}`, 'error'));
        return;
    }

    try {
        isSubmitting = true;
        updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);

        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.success) {
            showStatusMessage('✅ ส่งความคิดเห็นสำเร็จ!', 'success');
            feedbackForm.reset();
            ratingValue.textContent = '3'; // reset slider display
            loadFeedbackStats();
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) {
                result.errors.forEach(err => showStatusMessage(`🔸 ${err}`, 'error'));
            }
        }
    } catch (err) {
        console.error(err);
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    } finally {
        isSubmitting = false;
        updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
    }
}

// -------------------- Load Contacts --------------------
async function loadContacts(page = 1, limit = 10) {
    try {
        const res = await fetch(`/api/contact?page=${page}&limit=${limit}`);
        const data = await res.json();
        const container = document.getElementById('contactList');
        if (!container) return;

        container.innerHTML = '';
        data.data.forEach(c => {
            const div = document.createElement('div');
            div.innerHTML = `
                <strong>${c.name}</strong> (${c.email})<br>
                Subject: ${c.subject}<br>
                Message: ${c.message}<br>
                <small>${c.timestamp}</small>
                <hr>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        apiResults.textContent = 'Error loading contacts: ' + err.message;
    }
}

// -------------------- Load Feedback Stats --------------------
async function loadFeedbackStats() {
    try {
        const res = await fetch('/api/feedback/stats');
        const data = await res.json();
        const statsElem = document.getElementById('feedbackStats');
        if (!statsElem) return;

        statsElem.innerHTML = `
            Total Feedback: ${data.total}<br>
            Average Rating: ${data.averageRating}
        `;
    } catch (err) {
        console.error(err);
        apiResults.textContent = 'Error loading feedback stats: ' + err.message;
    }
}

// -------------------- Load API Status --------------------
async function loadAPIStatus() {
    try {
        const res = await fetch('/api/contact?page=1&limit=1');
        const statusElem = document.getElementById('apiStatus');
        if (!statusElem) return;

        if (res.ok) {
            statusElem.textContent = 'API is ONLINE ✅';
        } else {
            statusElem.textContent = 'API is OFFLINE ❌';
        }
    } catch (err) {
        console.error(err);
        const statusElem = document.getElementById('apiStatus');
        if (statusElem) statusElem.textContent = 'API is OFFLINE ❌';
    }
}

// -------------------- Utility --------------------
function showStatusMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;

    statusMessages.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.textContent = text;
        button.disabled = disabled;
    }
}

function displayValidationErrors(errors) {
    errors.forEach(error => {
        showStatusMessage(`🔸 ${error}`, 'error');
    });
}
