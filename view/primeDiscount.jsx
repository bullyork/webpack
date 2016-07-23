import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/primeDiscount'
import PrimeDiscount from '../component/primeDiscount/primeDiscount'
import PrimeDiscountUserList from '../component/primeDiscount/sub/list'
import PrimeDiscountAddUser from '../component/primeDiscount/sub/addUser'

class Pd extends React.Component{
  render(){
    return(
      <Router>
          <Route path="/" component={PrimeDiscount}>
            <IndexRoute component = {PrimeDiscountUserList}/>
            <Route path = '/PrimeDiscountUserList' component = {PrimeDiscountUserList}/>
            <Route path = '/PrimeDiscountAddUser' component = {PrimeDiscountAddUser}/>
          </Route>
      </Router>
      )
  }
}
class PrimeDiscountEdit extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <Pd/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><PrimeDiscountEdit /></AppWrapper>, document.getElementById("appContainer"));