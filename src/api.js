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
// function to read cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// retrieves token from cookie
export const getAccessToken = () => getCookie("access_token");

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
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
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

export const getTasks = (params = {}) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    "http://localhost:8000/auth/get-tasks",
    null, // no body
    {
      params, // query params
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const updateTaskStatus = (taskId, status) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    `http://localhost:8000/auth/update-task-status/${taskId}`,
    null, // no body
    {
      params: { status }, // query params
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const createTasks = (user_id, title, description, end_date) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    "http://localhost:8000/auth/create-task",
    null, // no body
    {
      params: { user_id, title, description, end_date }, // query params
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

//get user by token
export const getUserByToken = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post("http://localhost:8000/auth/get-user-detail", null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getNumberoftasksbystatus = (params = {}) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    "http://localhost:8000/auth/get-number-of-tasks-bystatus",
    null, // no body
    {
      params, // query params
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const updatetaskdetails = (taskId, params) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    `http://localhost:8000/auth/update-task/${taskId}`,
    null, // no body
    {
      params, // query params
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getTasksduetoday = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    "http://localhost:8000/auth/get-tasks-duetoday",
    null, // no body
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getUnreadNotifications = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    "http://localhost:8000/auth/count-notification-of-user",
    null, // no body
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getAllNotifications = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing. User not authorized.");
    return Promise.reject(new Error("User not authorized"));
  }
  return axios.post(
    "http://localhost:8000/auth/get-all-notifications",
    null, // no body
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
