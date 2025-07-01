import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../api";
// import { storeAccessToken } from "../../api";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.email = "Please enter password";
    }
    return newErrors;
  };
  const history = useHistory();
  //Promise
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    const validateerror = validate();
    setErrors(validateerror);
    if (Object.keys(validateerror).length === 0) {
      setLoading(true);
      try {
        const res = await loginUser(email, password);
        setMessage(res.data?.message || "Login Successful");
        // store the access token in cookie
        const token = res.data?.token;
        if (!token) {
          setMessage("Login Failed: No token received");
          setLoading(false);
          return;
        }
        //store in cookie only
        document.cookie = `access_token=${token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user_id: res.data.user_id || null,
          },
        });

        history.push("/VmockDashboard");
      } catch (err) {
        setMessage("Login Failed");
      }
      setLoading(false);
    }
  };

  return (
    <div className="Login-form">
      <h1 className="Login-title"> Login </h1>
      <form onSubmit={handleLogin} noValidate>
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "Invalid" : ""}
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="Invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="loginpassword">Password</label>
          <input
            id="loginpassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "Invalid" : ""}
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="Invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "logging in" : "login"}
        </button>
        <div className="Register">
          Don't have account ? <a href="/Register">Registerhere</a>
        </div>
        {/* <div className="ForgetPassword">
                    ForgetPassword
                </div> */}
      </form>
      {message && <div className="login-message">message</div>}
    </div>
  );
}
export default Login;
