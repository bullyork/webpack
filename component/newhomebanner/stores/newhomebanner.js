import newhomebannerReducer from './../reducers/newhomebanner.js'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'

const store = applyMiddleware(thunkMiddleware)(createStore)(newhomebannerReducer);

export default store;
