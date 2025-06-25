import React, { useState, useEffect } from "react";
import "./Registration.css";
import { connect } from "react-redux";
import { register, clearAuthMessage } from "../../Redux/RegistrationReducer";
import { useHistory } from "react-router-dom";

function Registration(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmp, setConfirmp] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const { loading, error, message, register, clearAuthMessage } = props;

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6 || password.length > 40)
      newErrors.password = "Password must be 6-40 characters";
    if (!confirmp) newErrors.confirmp = "Please confirm the password";
    else if (confirmp !== password)
      newErrors.confirmp = "Passwords do not match";
    return newErrors;
  };

  useEffect(() => {
    if (message) {
      //setInterval
      // counter
      setTimeout(() => {
        clearAuthMessage();
        history.push("/Login");
      }, 1000);
    }
  }, [message, clearAuthMessage, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      register(name, email, password, confirmp);
    }
  };

  return (
    <div className="Registration-form">
      <h1 className="Registration-title">Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="regName">Name</label>
          <input
            id="regName"
            type="text"
            value={name}
            placeholder="Enter your name"
            className={errors.name ? "Invalid" : ""}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="Invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="regEmail">Email</label>
          <input
            id="regEmail"
            type="email"
            value={email}
            placeholder="Enter your email"
            className={errors.email ? "Invalid" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="Invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="regPassword">Password</label>
          <input
            id="regPassword"
            type="password"
            value={password}
            placeholder="Enter your password"
            className={errors.password ? "Invalid" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="Invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="regConfirm">Confirm Password</label>
          <input
            id="regConfirm"
            type="password"
            value={confirmp}
            placeholder="Re-enter your password"
            className={errors.confirmp ? "Invalid" : ""}
            onChange={(e) => setConfirmp(e.target.value)}
          />
          {errors.confirmp && (
            <div className="Invalid-feedback">{errors.confirmp}</div>
          )}
        </div>
        <button
          type="submit"
          className="Registration-button"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="HaveAccount">
          Already have account? <a href="/Login">Login</a>
        </div>
      </form>
      {error && <div className="registration-message">{error}</div>}
      {message && <div className="registration-message">{message}</div>}
    </div>
  );
}

// Map Redux state to props
const mapStateToProps = (state, ownProps) => ({
  loading: state.auth?.loading,
  error: state.auth?.error,
  message: state.auth?.message,
});

// Map dispatch to props
const mapDispatchToProps = {
  register,
  clearAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

//HOC - higher order components
