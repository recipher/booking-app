import assign from 'lodash/object/assign';
import { RESOURCE } from '@recipher/resource';
import { entitiesSelector, entitiesReducer, LIMIT } from '@recipher/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('models');

export const FETCH = 'recipher/product/models/FETCH';
export const SUCCESS = 'recipher/product/models/SUCCESS';
export const FAILED = 'recipher/product/models/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ]);

export const modelsSelector = entitiesSelector(state => state.product.models, 'models');

export function fetch(product) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/models'
      , method: 'get'
      , query: { product }
      , normalize: r => normalize(r.models, arrayOf(schema))
      }
    , meta: { product }
    }
  };
};
