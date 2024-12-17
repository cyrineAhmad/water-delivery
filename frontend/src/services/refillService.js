import axios from 'axios';

export const sendRefillRequest = async (refillData) => {
  try {
    const response = await axios.post('/api/refills', refillData);
    return response.data;
  } catch (error) {
    console.error('Error submitting refill request:', error);
    throw error;
  }
};

export const getRefillRequests = async (userId) => {
  try {
    const response = await axios.get(`/api/refills?userId=${userId}`);
    return response.data;
  } catch (error) {
      console.error('Error fetching refill requests:', error);
      throw error;
  }
};


