import axios from "axios";

// This function performs the login API call
export async function loginUser(email, password) {
  return axios.post("http://localhost:8000/auth/login", null, {
    params: { email, password },
  });
}

// Store token on login
export function storeAccessToken(token) {
  window.sessionStorage.setItem("accessToken", token);
}
// retrieves token from session storage
export function getAccessToken() {
  return window.sessionStorage.getItem("accessToken");
}
// use token to logout user
export const logout = () => {
  const accessToken = getAccessToken();
  console.log("Access Token:", accessToken);
  return axios.post("http://localhost:8000/auth/logout", null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const registerUser = (name, email, password, password_confirmation) => {
  return axios.post("http://localhost:8000/auth/register", null, {
    params: { name, email, password, password_confirmation },
  });
};

export async function forgotPassword(email) {
  return axios.post("http://localhost:8000/auth/forgot-password", null, {
    params: { email },
  });
}

export const UserListing = (params = {}) => {
  // if not authorised , dont open the page
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post("http://localhost:8000/auth/user-listing", null, {
    params,
  });
};

export const UserActivity = (params = {}) => {
  // if not authorised , dont open the page
  return axios.post(
    "http://localhost:8000/auth/get-all-user-activities",
    null,
    {
      params,
    }
  );
};

export const isAuthenticated = () => {
  return getAccessToken() !== null && getAccessToken() !== undefined;
};

export const DeleteUser = (ids = []) => {
  // if not authorised , dont open the page
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    "http://localhost:8000/auth/multiple-user-delete",
    { ids },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const AssignRole = (user_id, role) => {
  return axios.post("http://localhost:8000/auth/assign-role", null, {
    params: { user_id, role },
  });
};
