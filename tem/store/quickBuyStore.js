import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './../reducer/quickBuyReducer.js'

var quickBuyStore = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

export default quickBuyStore;