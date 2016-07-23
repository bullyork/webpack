import React,{Component} from "react"
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import { Router, Route} from 'react-router';
import List from "../component/product/list.jsx"
import Edit from "../component/product/edit.jsx"
import Sku from "../component/product/sku.jsx"
import EditSku from "../component/product/editSku.jsx"
import productStore from "../store/product.js"
import {Provider} from "react-redux"


import "./../less/product.less";

class Product extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				<Provider store={productStore}>
	                <Router>
	                    <Route path="/" component={List}></Route>
	                    <Route path="/edit/:refId" component={Edit}></Route>
	                    <Route path="/sku/:refId" component={Sku}></Route>
	                    <Route path="/sku/edit/:refId/:skuId" component={EditSku}></Route>
	                </Router>
                </Provider>
			</div>
		)
	}
}

ReactDOM.render(<AppWrapper><Product /></AppWrapper>, document.getElementById("appContainer"))