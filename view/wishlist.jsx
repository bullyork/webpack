import React, { Component } from 'react';
import ReactDOM from "react-dom"
import {Provider, connect} from "react-redux"
import wishlistStore from "../store/wishlist.js"
import AppWrapper from "../common/appwrapperCommon.jsx";
import HandleHeader from "../component/wishlist/handle.jsx"
import ListProduct from "../component/wishlist/listProduct.jsx"
import { Button } from 'antd';
import Activity from '../component/wishlist/activity.jsx'

@connect((state)=>({
  listData: state.listData
}))
export class Wishlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      showList: false
    }
  }
  render() {

    const {listData} = this.props;

    return (
      <div>
        <h1 className="text-center" style={{lineHeight:3}}> Wishlist Admin System </h1>
        <Activity showHeader={this._showHeader.bind(this)} />
        <div className={this.state.showList ? "" :"hide"}>
          <br/>
          <br/>
          <HandleHeader />
          <ListProduct />
        </div>
      </div>
    );
  }
  _showHeader(status){
    this.setState({
      showList:status
    });
  }
  componentDidMount(){
    var timer = setTimeout(function(){
      $("#sidebar-collapse").click();
      clearTimeout(timer);
    }, 2000);
  }
}


class BoxWrapper extends Component{

  render(){
    return (
      <Provider store={wishlistStore}>
        <Wishlist />
      </Provider>
    )
  }
}


ReactDOM.render(<AppWrapper><BoxWrapper /></AppWrapper>, document.getElementById("appContainer"))