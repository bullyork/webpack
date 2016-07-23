import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/hpArrange'
import HpArrange from '../component/hpArrange/hpArrange'
import Banner from '../component/hpArrange/sub/banner'
import Category from '../component/hpArrange/sub/category'
import Floor from '../component/hpArrange/sub/floor'

class Hp extends React.Component{
  render(){
    return(
      <Router>
          <Route path="/" component={HpArrange}>
            <IndexRoute component = {Banner}/>
            <Route path = '/banner' component = {Banner}/>
            <Route path = '/category' component = {Category}/>
            <Route path = '/floor' component = {Floor}/>
          </Route>
      </Router>
      )
  }
}
class HomePage extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <Hp/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><HomePage /></AppWrapper>, document.getElementById("appContainer"));