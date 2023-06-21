import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5023', 
});

export const GetUserInfo = async (userID) => {    
  try {
    const response = await api.get('/getuserinfo/' + userID); 
    return response.data;
  } catch (error) {
    throw error;
  }
};
