export interface Product {
  url: string,
  name: string,
  checked: boolean,
  stock: number,
};

export interface DispenserState {
  products: Product[]
}

interface ChangeProductStatusAction {
  type: typeof CHANGE_PRODUCT_STATUS
  payload: string
}

interface UpdateProductStockAction {
  type: typeof UPDATE_PRODUCT_STOCK
  payload: Product[]
}

interface InitProductStatusAction {
  type: typeof INIT_PRODUCT_STATUS
}


export const CHANGE_PRODUCT_STATUS = 'CHANGE_PRODUCT_STATUS';
export const UPDATE_PRODUCT_STOCK = 'UPDATE_PRODUCT_STOCK';
export const INIT_PRODUCT_STATUS = 'INIT_PRODUCT_STATUS';


export type ProductActionType = ChangeProductStatusAction | UpdateProductStockAction | InitProductStatusAction