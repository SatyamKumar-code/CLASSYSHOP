import React, { useState } from "react";

const  OtpBox = ({ lenght, onChange }) => {
    const [otp, setOtp] = useState(new Array(lenght).fill(""));

    const handleChange = (element, index) => {
        const value = element.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        if (value && index < lenght - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    return (
        <div style={{display:"flex", gap: "5px", justifyContent:"center"}} className="otpBox">
            {otp.map((data, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] text-center text-[17px]"
                />
            ))}
        </div>
    )
};

export default OtpBox;