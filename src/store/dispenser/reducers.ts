import {
  ProductActionType,
  CHANGE_PRODUCT_STATUS,
  UPDATE_PRODUCT_STOCK,
  INIT_PRODUCT_STATUS,
  DispenserState,
} from './types';

const initialState: DispenserState = {
  products: [
    {
      url: require('../../image/tea.svg'),
      name: 'tea',
      checked: false,
      stock: 25,
    },
    {
      url: require('../../image/coffee.svg'),
      name: 'coffee',
      checked: false,
      stock: 30,
    },
    {
      url: require('../../image/milk.svg'),
      name: 'milk',
      checked: false,
      stock: 27,
    },
    {
      url: require('../../image/sugar.svg'),
      name: 'sugar',
      checked: false,
      stock: 23,
    }
  ]
};

export function dispenserReducer (
  state = initialState,
  action: ProductActionType
): DispenserState {
  switch(action.type) {
    case CHANGE_PRODUCT_STATUS:
      return {
        products: state.products.map(product => {
          if (product.name === action.payload) {
            product.checked = !product.checked
          }
          return product;
        })
      }
    case UPDATE_PRODUCT_STOCK:
      return {
        products: state.products.map(product => {
          if (product.checked) product.stock --
          return product;
        })
      }
    case INIT_PRODUCT_STATUS:
      return {
        products: state.products.map(product => {
          product.checked = false;
          return product;
        })
      }
    default:
      return state
  }
}
