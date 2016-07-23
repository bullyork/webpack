import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import bulmaReducer from './../reducer/bulma.js'

var store = applyMiddleware(thunkMiddleware)(createStore)(bulmaReducer);

export default store;