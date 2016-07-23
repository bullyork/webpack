import React,{Component} from "react"
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import {Provider,connect} from "react-redux"
import cmsStore from "../store/cms.js";
import "./../less/cms.less";
import Home from '../component/cms/home.jsx';

class CmsBox extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Home></Home>
    )
  }
}

class CmsBoxStore extends Component{
  render(){
    return (
      <Provider store={cmsStore}>
          <CmsBox />
      </Provider>
    )
  }
}

ReactDOM.render(<AppWrapper> <CmsBoxStore /></AppWrapper>, document.getElementById("appContainer"))