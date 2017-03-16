import assign from 'lodash/object/assign';
import { RESOURCE } from '@recipher/resource';

export const SEND_CONFIRMATION = 'recipher/bookings/confirmation/SEND_CONFIRMATION';
export const SEND_CONFIRMATION_SUCCESS = 'recipher/bookings/confirmation/SEND_CONFIRMATION_SUCCESS';
export const SEND_CONFIRMATION_FAILED = 'recipher/bookings/confirmation/SEND_CONFIRMATION_FAILED';

const initialState = { sending: false, sent: false, error: null };

export default (state = initialState, action) => {
  switch (action.type) {

  case SEND_CONFIRMATION:
    return assign({}, state, { sending: true, sent: false, error: null });
  case SEND_CONFIRMATION_SUCCESS:
    return assign({}, state, { sending: false, sent: true, error: null });
  case SEND_CONFIRMATION_FAILED:
    return assign({}, state, { sending: false, sent: false, error: action.payload.statusText });

  default:
    return state;
  }
};

export function sendConfirmation(member) {
  return {
    [RESOURCE]: {
      types: [ SEND_CONFIRMATION, SEND_CONFIRMATION_SUCCESS, SEND_CONFIRMATION_FAILED ]
    , payload: {
        url: '/bookings/confirmations'
      , method: 'post'
      , data: { member }
      }
    }
  };
};

