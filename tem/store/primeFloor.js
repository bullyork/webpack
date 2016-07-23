import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './../reducer/primeFloor.js'

var PrimeFloorStore = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

export default PrimeFloorStore;