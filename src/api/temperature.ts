import axios from 'axios';

const getTemperature = (machine_id: string) => {
  return axios.get('/api/temperature').then(res => {
    return res.data;
  })
}

const updateTemperature = async (machine_id: string, temperature: number) => {
  return await axios.post('/api/temperature', {
    machine_id, temperature, timestamp: Date.now()
  })
}

export default {
  getTemperature,
  updateTemperature
}