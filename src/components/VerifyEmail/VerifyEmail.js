import React, { useState, useEffect } from "react";
import "./VerifyEmail.css";
import { verifyEmail } from "../../api";

const VerifyEmail = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token && email) {
      verifyEmail(token, email)
        .then((response) => {
          setMessage(response.data.message || "Email verified successfully");
        })
        .catch((error) => {
          setMessage(
            error.response?.data?.message || "Email verification failed"
          );
        });
    } else {
      setMessage("Invalid verification link");
    }
  }, [token, email]);

  return (
    <div className="verify-email-page">
      <h2>Email Verification</h2>
      <div
        className={
          message === "Email verified successfully"
            ? "success-message"
            : "error-message"
        }
      >
        {message}
      </div>
    </div>
  );
};

export default VerifyEmail;
