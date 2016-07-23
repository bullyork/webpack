import React,{Component} from "react"
import EditPanel from "./../../panels/product/editpanel.jsx"
import {loadEditProduct,saveProduct} from "./../../action/product.js"
import {searchProducts} from "./../../action/product.js"
import {connect} from "react-redux"
import {success} from "./../../util/antd.js"

@connect(state=>({productForEdit:state.productForEdit}))
class Edit extends Component{
	render(){
		return (
			<div>
				<EditPanel data={this.props.productForEdit} onBack={()=>{history.back()}} originCodeOptions={[{name:"China",value:"CN"},{name:"Taiwan",value:"TW"},{name:"USA",value:"US"},]} primeShippingTypeOptions={[{name:"未知运输方式",value:0},{name:"经济空运",value:1},{name:"海运",value:2},]} onSave={this._onSaveHandler.bind(this)} />
			</div>
		)
	}

	componentDidMount(){
		this.props.dispatch(loadEditProduct(this.props.params.refId));
	}

	_onSaveHandler(detail){
		this.props.dispatch(saveProduct(detail))
			.then(()=>{success("Save Success!")});
	}
}

export default Edit;