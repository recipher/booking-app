import assign from 'lodash/object/assign';
import { RESOURCE } from '@recipher/resource';
import { entitiesSelector, entitiesReducer, LIMIT } from '@recipher/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('slots');

export const FETCH = 'recipher/product/slots/FETCH';
export const SUCCESS = 'recipher/product/slots/SUCCESS';
export const FAILED = 'recipher/product/slots/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ], { clearOnSignOut: false });

export const slotsSelector = entitiesSelector(state => state.product.slots, 'slots');

export function fetch(brand) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/slots'
      , method: 'get'
      , normalize: r => normalize(r.slots, arrayOf(schema))
      }
    }
  };
};
