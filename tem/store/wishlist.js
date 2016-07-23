import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './../reducer/wishlist.js'

var store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

export default store;