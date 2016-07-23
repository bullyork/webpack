import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './../reducer/product.js'

var store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

export default store;