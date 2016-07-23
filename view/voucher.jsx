import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/voucher'
import Voucher from '../component/voucher/voucher'
import Generate from '../component/voucher/sub/generate'
import Query from '../component/voucher/sub/query'
import Statistics from '../component/voucher/sub/statistics'
import SendVoucher from '../component/voucher/sub/sendVoucher.js'

class Vc extends React.Component{
  render(){
    return(
      <Router>
          <Route path="/" component={Voucher}>
            <IndexRoute component = {Generate}/>
            <Route path = '/Generate' component = {Generate}/>
            <Route path = '/Query' component = {Query}/>
            <Route path = '/Statistics' component = {Statistics}/>
            <Route path = '/sendVoucher' component={SendVoucher} ></Route>
          </Route>
      </Router>
      )
  }
}
class VoucherArrange extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <Vc/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><VoucherArrange /></AppWrapper>, document.getElementById("appContainer"));