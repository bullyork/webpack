import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './../reducer/admin.js'

var adminStore = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

export default adminStore;