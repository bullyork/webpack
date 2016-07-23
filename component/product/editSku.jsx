import React,{Component} from "react"
import EditPanel from "./../../panels/adminproductsku/editpanel.jsx"
import {loadSkuInfo,saveSku} from "./../../action/product.js"
import {connect} from "react-redux"
import {Link} from "react-router"
import {Row,Col} from "antd"
import {success} from "./../../util/antd.js"

@connect((state,ownProps)=>{return {sku:state.skuInfo.find(sku=>sku.skuId === ownProps.params.skuId)}})
class Edit extends Component{
	render(){		
		let {dispatch} = this.props;
		return (
			<div>
				<EditPanel data={this.props.sku} onBack={()=>{location.href=`#/sku/${this.props.params.refId}`}} onSave={this._onSaveHandler.bind(this)} />
			</div>
		)
	}

	componentDidMount(){
		if(typeof this.props.sku === "undefined"){
			this.props.dispatch(loadSkuInfo(this.props.params.refId));
		}
	}

	_onSaveHandler(sku){
		this.props.dispatch(saveSku(sku)).then(()=>{success("Save Success!")});
	}
}

export default Edit;