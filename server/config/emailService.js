import https from 'https';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000,     // 10 seconds
    greetingTimeout: 10000,
    pool: {
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 4000,
        rateLimit: true,
    },
    tls: {
        rejectUnauthorized: false, // For development; use true in production with valid certs
    },
});

async function sendEmail(to, subject, text, html, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL,
                to,
                subject,
                text,
                html,
            });
            console.log(`Email sent successfully to ${to} (Attempt ${attempt})`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            lastError = error;
            console.error(`Email send attempt ${attempt} failed:`, error.code || error.message);
            
            // Don't retry if it's an auth error
            if (error.code === 'EAUTH') {
                console.error('Authentication failed - check EMAIL and EMAIL_PASS environment variables');
                return { success: false, error: 'Authentication failed', code: error.code };
            }
            
            // Retry on connection timeout
            if (error.code === 'ETIMEDOUT' && attempt < maxRetries) {
                const delay = Math.pow(2, attempt - 1) * 1000; // Exponential backoff
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else if (attempt === maxRetries) {
                console.error(`Email send failed after ${maxRetries} attempts`);
                return { success: false, error: lastError.message, code: lastError.code };
            }
        }
    }
    
    return { success: false, error: lastError?.message || 'Unknown error', code: lastError?.code };
}

export { sendEmail };