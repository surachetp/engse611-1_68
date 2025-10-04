// Contact form validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ name
    // - ต้องมีค่า
    // - ต้องเป็น string
    // - ความยาวอย่างน้อย 2 ตัวอักษร
    // - ไม่เกิน 100 ตัวอักษร
      if (!name || typeof name !== 'string') {
        errors.push('Name is required and must be a string.');
    } else {
        const trimmedName = name.trim();
        if (trimmedName.length < 2) errors.push('Name must be at least 2 characters.');
        if (trimmedName.length > 100) errors.push('Name must not exceed 100 characters.');
    }
    
    // TODO: ตรวจสอบ email
    // - ต้องมีค่า  
    // - ต้องเป็น email format ที่ถูกต้อง
    // - ใช้ regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string') {
        errors.push('Email is required and must be a string.');
    } else if (!emailRegex.test(email.trim())) {
        errors.push('Email format is invalid.');
    }


    // TODO: ตรวจสอบ subject
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 5 ตัวอักษร
    // - ไม่เกิน 200 ตัวอักษร
     if (!subject || typeof subject !== 'string') {
        errors.push('Subject is required and must be a string.');
    } else {
        const trimmedSubject = subject.trim();
        if (trimmedSubject.length < 5) errors.push('Subject must be at least 5 characters.');
        if (trimmedSubject.length > 200) errors.push('Subject must not exceed 200 characters.');
    }

    
    // TODO: ตรวจสอบ message
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 10 ตัวอักษร
    // - ไม่เกิน 1000 ตัวอักษร
     if (!message || typeof message !== 'string') {
        errors.push('Message is required and must be a string.');
    } else {
        const trimmedMessage = message.trim();
        if (trimmedMessage.length < 10) errors.push('Message must be at least 10 characters.');
        if (trimmedMessage.length > 1000) errors.push('Message must not exceed 1000 characters.');
    }

    
    // TODO: ตรวจสอบ phone (optional)
    // - ถ้ามีค่า ต้องเป็นเบอร์โทรที่ถูกต้อง
    // - ใช้ regex: /^[0-9]{9,10}$/
     const phoneRegex = /^[0-9]{9,10}$/;
    if (phone) {
        if (!phoneRegex.test(phone.trim())) {
            errors.push('Phone number is invalid. Must be 9-10 digits.');
        }
    }
    
    // TODO: ตรวจสอบ company (optional)
    // - ถ้ามีค่า ต้องไม่เกิน 100 ตัวอักษร
       if (company && company.trim().length > 100) {
        errors.push('Company name must not exceed 100 characters.');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    
    // Sanitize data
    req.body.name = req.body.name.trim();
    req.body.email = req.body.email.trim().toLowerCase();
    req.body.subject = req.body.subject.trim();
    req.body.message = req.body.message.trim();
    if (phone) req.body.phone = phone.trim();
    if (company) req.body.company = company.trim();
    
    next();
};

// Feedback validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ rating
    // - ต้องมีค่า
    // - ต้องเป็นตัวเลข 1-5
     if (rating === undefined || rating === null) {
        errors.push('Rating is required.');
    } else if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        errors.push('Rating must be a number between 1 and 5.');
    }
    
    // TODO: ตรวจสอบ comment
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 5 ตัวอักษร
    // - ไม่เกิน 500 ตัวอักษร
    if (!comment || typeof comment !== 'string') {
        errors.push('Comment is required and must be a string.');
    } else {
        const trimmedComment = comment.trim();
        if (trimmedComment.length < 5) errors.push('Comment must be at least 5 characters.');
        if (trimmedComment.length > 500) errors.push('Comment must not exceed 500 characters.');
    }
    
    // TODO: ตรวจสอบ email (optional)
    // - ถ้ามีค่า ต้องเป็น email format ที่ถูกต้อง
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {
        if (!emailRegex.test(email.trim())) {
            errors.push('Email format is invalid.');
        }
    }
    
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    // Sanitize data
    if (email) req.body.email = email.trim().toLowerCase();
    req.body.comment = comment.trim();

    
    next();
};

module.exports = {
    validateContact,
    validateFeedback
};