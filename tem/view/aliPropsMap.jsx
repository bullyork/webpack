import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/merchandise'
import Main from '../component/aliPropsMap/main'
import ToMap from '../component/aliPropsMap/sub/toMap'
import MapList from '../component/aliPropsMap/sub/mapList'
import MapRuleList from '../component/aliPropsMap/sub/MapRuleList'

class Ap extends React.Component{
  render(){
    return(
      <Router>
          <Route path="/" component={Main}>
            <IndexRoute component = {ToMap}/>
            <Route path = '/ToMap' component = {ToMap}/>
            <Route path = '/MapList' component = {MapList}/>
            <Route path = '/MapRuleList' component = {MapRuleList}/>
          </Route>
      </Router>
      )
  }
}
class AliPropsMap extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <Ap/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><AliPropsMap /></AppWrapper>, document.getElementById("appContainer"));