import assign from 'lodash/object/assign';
import { RESOURCE } from '@recipher/resource';
import { entitiesSelector, entitiesReducer, LIMIT } from '@recipher/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('products');

export const FETCH = 'recipher/products/FETCH';
export const SUCCESS = 'recipher/products/SUCCESS';
export const FAILED = 'recipher/products/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ], { clearOnSignOut: false });

export const productsSelector = entitiesSelector(state => state.brand.products, 'products');

export function fetch(brand) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/products'
      , method: 'get'
      , query: { brand }
      , normalize: r => normalize(r.products, arrayOf(schema))
      }
    }
  };
};
