import { combineReducers } from 'redux'; 
import models from './ducks/models';  
import bookings from './ducks/bookings';  
import slots from './ducks/slots';  

export default combineReducers({
  models
, bookings
, slots
});