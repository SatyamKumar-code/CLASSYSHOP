import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

// Use SendGrid for Render deployment (more reliable than Gmail on cloud)
const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY,
    },
}));

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
            console.log(`Email sent successfully to ${to}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            lastError = error;
            console.error(`Email send attempt ${attempt} failed:`, error.message);
            
            // Don't retry if it's an auth error
            if (error.code === 'EAUTH' || error.message?.includes('unauthorized')) {
                console.error('SendGrid API key is invalid - check SENDGRID_API_KEY');
                return { success: false, error: 'Authentication failed', code: error.code };
            }
            
            // Retry on timeout/network errors
            if (attempt < maxRetries && (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED')) {
                const delay = Math.pow(2, attempt) * 1000;
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