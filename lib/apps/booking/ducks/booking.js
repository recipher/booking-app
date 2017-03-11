import assign from 'lodash/object/assign';
import { createSelector } from 'reselect';

export const SELECT = 'recipher/booking/booking/SELECT';
export const SAVE = 'recipher/booking/booking/SAVE';

const initialState = { model: {}, slot: {}, info: {}};

export default (state = initialState, action) => {
  switch (action.type) {
  case SELECT: 
  case SAVE: 
    return assign({}, state, action.payload);

  default:
    return state;
  }
};

const byProduct = state => state.booking.booking.model.product;

export const productSelector = createSelector(
  [ byProduct, state => state.entities ], (product, entities) => {
  if (product == null) return;

  return entities.products[product];
});

export const brandSelector = createSelector(
  [ productSelector, state => state.entities ], (product, entities) => {
  if (product == null) return;

  return entities.brands[product.brand];
});

export function select(model, slot) {
  return { type: SELECT, payload: { model, slot }};
};

export function saveInfo(info) {
  return { type: SAVE, payload: { info }};
};
