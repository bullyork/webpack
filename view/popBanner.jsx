import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/popBanner'
import PopBannerList from '../component/popBanner/popBannerList'
import EditPopBanner from '../component/popBanner/editPopBanner'

class PopBanner extends React.Component{
  render(){
    return(
      <Router>
          <Route path = '/' component = {PopBannerList}/>
          <Route path = '/editPopBanner' component = {EditPopBanner}/>
      </Router>
      )
  }
}
class Pb extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <PopBanner/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><Pb /></AppWrapper>, document.getElementById("appContainer"));