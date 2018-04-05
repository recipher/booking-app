import assign from 'lodash/object/assign';
import { createSelector } from 'reselect';
import { RESOURCE } from '@recipher/resource';
import { entitiesSelector, entitiesReducer, LIMIT } from '@recipher/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('brands');

export const FETCH = 'recipher/brands/FETCH';
export const SUCCESS = 'recipher/brands/SUCCESS';
export const FAILED = 'recipher/brands/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ], { clearOnSignOut: false });

export const brandsSelector = entitiesSelector(state => state.brands.brands, 'brands');

export function fetch() {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/brands'
      , query: { sort: 'name' }
      , method: 'get'
      , normalize: r => normalize(r.brands, arrayOf(schema))
      }
    }
  };
};
