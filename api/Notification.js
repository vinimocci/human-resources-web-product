import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5023', 
  });

export const PostNotification = async (notificationData) => {
    var notification = prepareNotificationDataToRequest(notificationData)
    
  try {
    const response = await api.post('/changeNotification', notification); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

const prepareNotificationDataToRequest = (notificationData) => {
    var notificationFormData = new FormData()

    notificationFormData.append('description', notificationData.description)
    notificationFormData.append('topic', notificationData.topic)

    return notificationFormData
}