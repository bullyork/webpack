import channelReducer from './../reducers/channel.js'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'

const store = applyMiddleware(thunkMiddleware)(createStore)(channelReducer);

export default store;
