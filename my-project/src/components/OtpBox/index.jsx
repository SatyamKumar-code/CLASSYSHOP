import React, { useState, useCallback } from "react";

const  OtpBox = React.memo(({ lenght, onchange }) => {
    const [otp, setOtp] = useState(new Array(lenght).fill(""));

    const handleChange = useCallback((element, index) => {
        const value = element.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onchange(newOtp.join(""));

        if (value && index < lenght - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    }, [otp, lenght, onchange]);

    const handleKeyDown = useCallback((event, index) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    }, [otp]);

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
                    className="w-[45px] h-[45px] text-center text-[17px]"
                />
            ))}
        </div>
    )
});

export default OtpBox;