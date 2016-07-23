import React,{Component} from "react"
import bulmaStore from "./../../store/bulma.js"
import {loadPageIndexes,startAddNewPage} from "./../../action/bulma.js"


class BulmaFront extends Component{
	render(){
		return null;
	}

	_onPageAddedHandler(){
		bulmaStore.dispatch(startAddNewPage());
	}

	componentDidMount(){
		bulmaStore.dispatch(loadPageIndexes());
	}
}

export default BulmaFront