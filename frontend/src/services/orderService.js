import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {}; 
};



export const createOrder = async order => {
  try {
    const { data } = await axios.post('/api/orders/create', order, {
      headers: getAuthHeaders(),
    });
    return data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error; 
  }
};


export const pay = async (paymentId, paymentMethod) => {
  try {
    const { data } = await axios.put('/api/orders/pay', { paymentId, paymentMethod }, {
      headers: getAuthHeaders(),
    });
    return data;
  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
    throw error;
  }
};


export const getAll = async (state = '') => {
  try {
    const response = await axios.get(`/api/orders/${state}`, {
      headers: getAuthHeaders(),
    });
    return response.data; 
  } catch (error) {
    if (error.response) {
      console.error(`Server responded with ${error.response.status}: ${error.response.data}`);
      throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error making request:', error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};
