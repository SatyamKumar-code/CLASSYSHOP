const VerificationEmail = (username, otp) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 20px;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
                color: #fff;
            }
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                letter-spacing: -0.5px;
            }
            .header p {
                font-size: 14px;
                opacity: 0.9;
                font-weight: 300;
            }
            .content {
                padding: 40px 30px;
                font-size: 16px;
                line-height: 1.8;
                color: #555;
            }
            .content p {
                margin-bottom: 25px;
            }
            .otp-section {
                background-color: #f8f9fa;
                padding: 30px;
                border-radius: 8px;
                margin: 30px 0;
                text-align: center;
                border-left: 4px solid #667eea;
            }
            .otp-label {
                font-size: 13px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 12px;
            }
            .otp {
                font-size: 36px;
                font-weight: 700;
                color: #667eea;
                letter-spacing: 3px;
                font-family: 'Courier New', monospace;
                background: #fff;
                padding: 15px 20px;
                border-radius: 6px;
                display: inline-block;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 6px;
                margin-top: 25px;
                font-size: 14px;
                line-height: 1.6;
            }
            .footer {
                background-color: #f8f9fa;
                text-align: center;
                padding: 30px;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #eee;
            }
            .footer p {
                margin-bottom: 8px;
            }
            .highlight {
                font-weight: 600;
                color: #667eea;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Classifyshop! 🎉</h1>
                <p>Verify your email address to get started</p>
            </div>
            <div class="content">
                <p>Hi <span class="highlight">${username}</span>,</p>
                <p>Thank you for registering with Classifyshop App! We're excited to have you on board. To complete your registration, please verify your email address using the OTP below:</p>
                
                <div class="otp-section">
                    <div class="otp-label">Your Verification Code</div>
                    <div class="otp">${otp}</div>
                </div>

                <p>This code will expire in 10 minutes. If you didn't create an account, you can safely ignore this email.</p>
                
                <div class="warning">
                    <strong>⚠️ Security Note:</strong> Never share your OTP with anyone. Classifyshop support staff will never ask for your verification code.
                </div>
            </div>
            <div class="footer">
                <p>Questions? Contact us at support@classifyshop.com</p>
                <p>&copy; 2025 Classifyshop App. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
}

export default VerificationEmail;