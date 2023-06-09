import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5023', 
});

export const GetLoginAuth = async (loginData) => {
    var userData = prepareDataToRequest(loginData)
    
  try {
    const response = await api.post('/signin', userData); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

const prepareDataToRequest = (inputedUserData) => {
    var userFormData = new FormData();
    userFormData.append('email', inputedUserData.email)
    userFormData.append('password', inputedUserData.password)

    return userFormData ;
}