import React,{Component} from "react"
import {render} from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import { Router, Route, Link, hashHistory } from 'react-router'
import {Provider} from "react-redux"
import store from '../component/newhomebanner/stores/newhomebanner.js'
import { syncHistoryWithStore } from 'react-router-redux'
import {NewHomeBannerForMarketing,NewHomeBannerForOperation,NewHomeHotProduct,NewHomeCollections} from "../component/newhomebanner";
import '../component/newhomebanner/less/base.less';


const history = syncHistoryWithStore(hashHistory, store)

class NewHomeBanner extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route path="/operation" component={NewHomeBannerForOperation}></Route>
					<Route path="/marketing" component={NewHomeBannerForMarketing}></Route>
					<Route path="/hotProduct" component={NewHomeHotProduct}></Route>
					<Route path="/homeCollections" component={NewHomeCollections}></Route>
				</Router>
			</Provider>
		)
	}
}


render(<AppWrapper><NewHomeBanner /></AppWrapper>, document.getElementById("appContainer"))