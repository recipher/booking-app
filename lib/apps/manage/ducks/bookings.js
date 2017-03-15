import assign from 'lodash/object/assign';
import isArray from 'lodash/lang/isArray';
import moment from 'moment';
import { RESOURCE } from '@recipher/resource';
import { entitiesSelector, entitiesReducer, LIMIT } from '@recipher/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

const FORMAT = 'YYYY-MM-DD';

export const schema = new Schema('bookings');

export const SEARCH = 'recipher/manage/bookings/SEARCH';
export const SEARCH_SUCCESS = 'recipher/manage/bookings/SEARCH_SUCCESS';
export const SEARCH_FAILED = 'recipher/manage/bookings/SEARCH_FAILED';

export default entitiesReducer([ SEARCH, SEARCH_SUCCESS, SEARCH_FAILED ]);

export const bookingsSelector = entitiesSelector(state => state.manage.bookings, 'bookings');

export function search(data) {
  const query = assign({}, { q: '', page: 1, limit: LIMIT }, data);
  
  if (query.page < 1) query.page = 1;

  return {
    [RESOURCE]: {
      types: [ SEARCH, SEARCH_SUCCESS, SEARCH_FAILED ]
    , payload: {
        url: '/bookings/search'
      , method: 'get'
      , query: assign({}, query, { sort: 'description', dir: 'asc' })
      , normalize: r => normalize(r.bookings, arrayOf(schema))
      }
    , meta: { query }
    }
  };
};

export function reset() {
  return dispatch => dispatch(search());
};