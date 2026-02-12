import axiosInstance from './axiosInstance';

export const loginUser = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('api/auth/login', credentials);
    const { access_token } = response.data;

    if (access_token) {
      localStorage.setItem('token', access_token);
      console.log('Token is saved in localStorage');
    } else {
      console.error('No token found in response');
    }

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Login failed');
  }
};

export const registerUser = async (userData: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw new Error('Registration failed');
  }
};