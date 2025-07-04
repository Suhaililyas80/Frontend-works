import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { resetPassword } from "../../api";

const ResetPassword = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }
    resetPassword(token, email, password, confirmPassword)
      .then((response) => {
        setLoading(false);
        setMessage(response.data.message || "Password reset successfully");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response?.data?.message || "Failed to reset password");
      });
  };
  useEffect(() => {
    if (!token || !email) {
      setMessage("Invalid reset link");
    }
  }, [token, email]);

  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <div className="reset-password-message">{message}</div>}
    </div>
  );
};
export default ResetPassword;
