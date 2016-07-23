import React,{Component} from "react"
import {render} from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import { Router, Route} from 'react-router';
import {Provider,connect} from "react-redux"
import fixedBannerStore from "../store/fixedBanner.js"
import {searchFixedBanner, cancelUpdate, doUpdate,doAdd, changeCountry, changeType} from "../action/fixedBanner.js"
import {closeDialog} from "../action/dialog.js"
import ListPanel from "../component/fixedBanner/listpanel.jsx"
import EditPanel from "../component/fixedBanner/editpanel.jsx"
import { Modal } from 'antd';
import {success,warn} from "../util/antd.js";
import CountrySelector from "../common/CountrySelector.jsx";

import "./../less/product.less";
const {assign} = Object;

@connect((state)=>({images:state.images,editKey:state.editKey,isAddDialogShow:state.dialog.addDialog,countryCode:state.countryCode}))
class FixedBanner extends Component{
	constructor(props){
		super(props)
	}
	render(){
		const {dispatch} = this.props;
		return (
			<div>
				<div>
					Please Select Country:
					<CountrySelector value={this.props.countryCode} onChange={(value)=>{dispatch(changeCountry(value))}} />
				</div>
				<ListPanel />
				<EditFixedBannerModal visible={this.props.editKey!==null} />
				<AddFixedBannerModal visible={this.props.isAddDialogShow} />
			</div>
		)
	}

	componentDidMount(){
		const {dispatch} = this.props;

		dispatch(changeType(2)) //type is 2 prime banner
	}
}


@connect((state)=>({productForEditing:state.images.find(image=>image.key === state.editKey),countryCode:state.countryCode}))
class EditFixedBannerModal extends Component{
	render(){
		const {dispatch, typeId, countryCode} = this.props;
		return (
			<Modal title="Edit FixedBanner"
				visible={this.props.visible}
				onOk={this._onOKHandler.bind(this)}
				onCancel={()=>{dispatch(cancelUpdate())}}>
				<EditPanel data={this.props.productForEditing} idEdit={true} ref="editPanel" />
			</Modal>
		)
	}

	_onOKHandler(){
		const {dispatch} = this.props;
		dispatch(doUpdate(assign(this.refs.editPanel.getFieldsValue(),{},{countryCode:this.props.countryCode}))).then((flag)=>{
			if(flag){
				success("Update Success");
				dispatch(cancelUpdate());
			}else{
				warn("Update Fail");
			}
		})
	}
}



@connect((state)=>({countryCode:state.countryCode, typeId: state.typeId}))
class AddFixedBannerModal extends Component{
	render(){
		const {dispatch} = this.props;
		return (
			<Modal title="Add FixedBanner"
				visible={this.props.visible}
				onOk={this._onOKHandler.bind(this)}
				onCancel={()=>{dispatch(closeDialog("addDialog"))}}>
				<EditPanel data={this.props.productForEditing}  ref="editPanel" />
			</Modal>
		)
	}

	_onOKHandler(){
		const {dispatch} = this.props;
		dispatch(doAdd(assign(this.refs.editPanel.getFieldsValue(),{},{countryCode:this.props.countryCode}))).then((flag)=>{
			if(flag){
				success("Add Success");
				dispatch(closeDialog("addDialog"));
			}else{
				warn("Add Fail");
			}
		})
	}
}


class FixedBannerWithProvider extends Component{
	render(){
		return (
			<Provider store={fixedBannerStore}>
				<FixedBanner />
			</Provider>
		)
	}
}

render(<AppWrapper><FixedBannerWithProvider /></AppWrapper>, document.getElementById("appContainer"))