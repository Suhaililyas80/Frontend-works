import React, { useState } from "react";
import "./ForgotPassword.css";
import { forgotPassword } from "../../api";

const ForgotPassword = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    forgotPassword(email)
      .then((response) => {
        setLoading(false);
        setMsg(response.data.message || "Reset link sent to your email");
        setEmail("");
      })
      .catch((error) => {
        setLoading(false);
        setMsg(error.response?.data?.message || "Failed to send reset link");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modall">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {msg && <div className="modal-msg">{msg}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
