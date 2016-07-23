import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './../reducer/d2d.js'
import createLogger from 'redux-logger'

var store = applyMiddleware(thunkMiddleware, createLogger())(createStore)(reducer)

export default store