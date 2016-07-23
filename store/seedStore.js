import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './../reducer/seedReducer.js'

var SeedStore = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

export default SeedStore;