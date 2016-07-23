import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store/merchandise'
import Merchandise from '../component/merchandise/merchandise'
import Edit from '../component/merchandise/sub/edit'
import DisplayRulesList from '../component/merchandise/displayRules/displayRulesList'
import DisplayRulesSet from '../component/merchandise/displayRules/displayRulesSet'

class Md extends React.Component{
  render(){
    return(
      <Router>
          <Route path="/" component={Merchandise}>
            <IndexRoute component = {Edit}/>
            <Route path = '/Edit' component = {Edit}/>
            <Route path = '/DisplayRulesList' component = {DisplayRulesList}/>
            <Route path = '/DisplayRulesSet' component = {DisplayRulesSet}/>
          </Route>
      </Router>
      )
  }
}
class MerchandiseDatabase extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <Md/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><MerchandiseDatabase /></AppWrapper>, document.getElementById("appContainer"));