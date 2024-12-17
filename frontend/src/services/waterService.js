import axios from 'axios';


export const getAll = async () => {
    const { data } = await axios.get('/api/waters');
    return data;
};


export const search = async searchTerm =>
{
    const { data }= await axios.get('/api/waters/search/' + searchTerm);
    return data;
};

export const getById =  async waterId => {
    const {data} = await axios.get('/api/waters/' + waterId);
    return data;
};

