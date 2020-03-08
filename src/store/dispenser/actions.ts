import { ProductActionType, CHANGE_PRODUCT_STATUS, UPDATE_PRODUCT_STOCK, INIT_PRODUCT_STATUS, Product } from './types'
import stockAPI from '../../api/stock';

export function changeProductStatus(productName: string): ProductActionType {
  return {
    type: CHANGE_PRODUCT_STATUS,
    payload: productName
  }
}

export function updateProductStock(products: Product[]): ProductActionType {
  const lowStockItems:Product[] = [];
  products.forEach(product => {
    if (product.checked) {
      product.stock --;
      if (product.stock < 25) {
        lowStockItems.push(product);
      }
    }
  })
  lowStockItems.length > 0 && reportLowStock(lowStockItems);
  return {
    type: UPDATE_PRODUCT_STOCK,
    payload: products
  }
}

function reportLowStock(lowStockItems: Product[]) {
  stockAPI.lowstockalert('123', lowStockItems);
}

export function initProductStatus(): ProductActionType {
  return {
    type: INIT_PRODUCT_STATUS,
  }
}