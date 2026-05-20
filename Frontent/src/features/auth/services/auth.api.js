import axios from "axios";

// axios instance with base URL and credentials
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Register
export const register = async ({ name, email, password, role }) => {
  try {
   
    const { data } = await API.post("/auth/register", {
      name, email, password, role
    });
    
    return data;
  } catch (error) {
    handleError(error, "Registration");
  }
};

// Login
export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });
   
    return data;
  } catch (error) {
    handleError(error, "Login");
  }
};

// logout
export const logout = async () => {
    try{
        const {data} = await API.get("/auth/logout");
        return data;

    }
    catch(error){
        handleError(error, "Logout");
    }

}


// Get Current User
export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/auth/get-me");
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null; // 👈 VERY IMPORTANT
    }
    handleError(error, "Fetch User");
  }
};

// Common Error Handler
const handleError = (error, type) => {
  const message =
    error.response?.data?.message || `${type} failed. Please try again.`;

  console.error(`${type} error:`, message);
  throw new Error(message);
};





