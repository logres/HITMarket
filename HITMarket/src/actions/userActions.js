import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/Utils/axios_instance';


export const getUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async () => {
      try {
        const response = await axios.get('/api/user');
        const userInfo = response.data;
  
        return userInfo; 
      } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
      }
    }
  );