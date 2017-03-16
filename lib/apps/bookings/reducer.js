import { combineReducers } from 'redux'; 
import bookings from './ducks/bookings';  
import confirmation from './ducks/confirmation';  

export default combineReducers({
  bookings
, confirmation
});