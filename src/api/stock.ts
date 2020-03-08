import axios from 'axios';
import { Product } from '../store/dispenser/types'

const lowstockalert = (machine_id: string, products: Product[]) => {
  const stock = products.map(product => {
    return {
      product: product.name,
      stock: product.stock,
    }
  })
  return axios.post('/api/lowstockalert', {
    machine_id,
    stock,
    timestamp: Date.now()
  })
};

export default {
  lowstockalert,
}