import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/ezdelivery'
import Ezdelivery from '../component/ezdelivery/main'
import AddUser from '../component/ezdelivery/sub/addUser'
import UserInfo from '../component/ezdelivery/sub/userInfo'
import StaionInfo from '../component/ezdelivery/sub/stationInfo'

class Ez extends React.Component{
  render(){
    return(
      <Router>
          <Route path="/" component={Ezdelivery}>
            <IndexRoute component = {UserInfo}/>
            <Route path = '/AddUser' component = {AddUser}/>
            <Route path = '/UserInfo' component = {UserInfo}/>
            <Route path = '/StaionInfo' component = {StaionInfo}/>
          </Route>
      </Router>
      )
  }
}
class EzdeliveryArrange extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <Ez/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><EzdeliveryArrange /></AppWrapper>, document.getElementById("appContainer"));
