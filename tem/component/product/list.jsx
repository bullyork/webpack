import React,{Component} from "react"
import ListForProduct from "./listpanel.jsx"
import {connect} from "react-redux"
import {searchProducts} from "./../../action/product.js"

@connect(state=>state)
class List extends Component {

	constructor(props){
		super(props);
	}

	render(){
		let {dispatch} = this.props; 
		return (
			<div className="productListWrapper">
				<ListForProduct data={this.props.products} onSearch={(words)=>{dispatch(searchProducts(words))}} />
			</div>
		)
	}
}

export default List;