import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import Shops from '../component/shops/shops'
import UnderCarriageCids from '../component/shops/sub/UnderCarriageCids'
import SeaCids from '../component/shops/sub/SeaCids'
import ImportToPrime from '../component/shops/sub/ImportToPrime'
import PrimeShipMent from "../component/shops/sub/PrimeShipMent"
import store from '../store/shops'

class Shop extends React.Component{
  render(){
    return(
      <Router>
          <Route path="/" component={Shops}>
            <IndexRoute component = {SeaCids}/>
            <Route path = '/UnderCarriageCids' component = {UnderCarriageCids}/>
            <Route path = '/SeaCids' component = {SeaCids}/>
            <Route path = '/ImportToPrime' component = {ImportToPrime}/>
            <Route path = '/PrimeShipMent' component = {PrimeShipMent}/>
          </Route>
      </Router>
      )
  }
}
class Sp extends React.Component{

    render(){
        return (
            <Provider store={store}>
              <Shop/>
            </Provider>
        )
    }
}
ReactDOM.render(<AppWrapper><Sp /></AppWrapper>, document.getElementById("appContainer"));