import React,{Component} from 'react';
import ReactDom from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/d2d.js'
import { syncHistoryWithStore } from 'react-router-redux'
import Driver from '../component/d2d/driver'
import Zip from '../component/d2d/zip'
import Job from '../component/d2d/deliverJobs'
import LocationMapping from '../component/d2d/LocationMapping'
import Map from '../component/d2d/Map'
import EditArea from '../component/d2d/editArea'
import '../component/d2d/dtd.css'

class D2d extends React.Component{

    render(){
        return (
          <Provider store = {store} >
            <Router history={hashHistory}>
              <Route path = '/driver' component = {Driver}/>
              <Route path = '/zip' component = {Zip}/>
              <Route path = '/editArea/:driverId' component = {EditArea} />
              <Route path = '/jobs' component = {Job} />
              <Route path="/locationMapping" component={LocationMapping} />
              <Route path="/map" component={Map} />
            </Router>
          </Provider>
        )
    }
}
ReactDom.render(<AppWrapper><D2d /></AppWrapper>, document.getElementById("appContainer"));