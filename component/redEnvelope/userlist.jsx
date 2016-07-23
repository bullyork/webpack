import React,{Component} from 'react';
import { Router, Route, Link } from 'react-router';
import {Provider,connect} from "react-redux";
import {logout,setListUser,setOriginCode} from "../../action/redEnvelopeAction.js";
import RedPacket from "../../models/RedPacketService.js";
import ModalDialog from "../../common/modaldialog.jsx";
import { createStore } from 'redux'
import rootReducer from '../../reducer/redEnvelopeReducer';
import Config from "../../common/config.js"
import loading from "../../util/loading"
import {Switch} from 'antd'

class FeatureCollection extends Component {
	constructor(props){
        super(props);
        this.state = {
            usersObj:{id:"",userName:"",catalog:"SG",phoneNumber:"",amount:"",isGiveVoucher:false,isGiveGift:false},
        };
    }
	render() {
		let {usersObj} = this.state
		var reigsterLength = 0;
		var userRows = this.props.usersObj.map(function(item){
			if(item.registerIncensees === null){
				reigsterLength = 0;
			}else{
				reigsterLength = item.registerIncensees.length;
			}
			var identId = item.url.split('=')[1];
			return (
				<tr>
					<td className="center">
						<label className="position-relative">
							<input type="checkbox" className="ace" />
							<span className="lbl"></span>
						</label>
					</td>
					<td>{item.catalog}</td>
					<td>{item.userName}</td>
					<td>{item.isGiveVoucher+''}</td>
					<td>{item.isGiveGift+''}</td>
					<td>{item.amount}</td>
					<td>{item.clickAmount}</td>
					<td>{reigsterLength}</td>
          <td>{parseInt(item.AppRegisterAmount) > 0 ? (<a href={Config.redpacket_excel+"/APP?id="+item.Id} target="_blank"><i className="ace-icon fa fa-pencil bigger-120"></i>
								Excel &nbsp; {item.AppRegisterAmount}</a>) : item.AppRegisterAmount}</td>
					<td>{item.overOrderAmount}</td>
					<td>{identId}</td>

					<td>
						<div className="hidden-sm hidden-xs btn-group">
							<button className="btn btn-xs btn-info" onClick={this.deleteUser(item)}>
								<i className="ace-icon fa fa-pencil bigger-120"></i>
								delete
							</button>
							<button className="btn btn-xs btn-info" onClick={this.updateUser(item)}>
								<i className="ace-icon fa fa-pencil bigger-120"></i>
								Update
							</button>
							<button className="btn btn-xs btn-info" onClick={this.download(item)}>
								<i className="ace-icon fa fa-pencil bigger-120"></i>
								Excel
							</button>
						</div>
					</td>
				</tr>
			)
		},this)
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="row">
						<div className="col-xs-12">
							<a className="btn btn-primary btn-xs" onClick={this.onAddUserDialogShowHandler()}>Add</a>
						</div>

						<span>OriginCode:</span>
						<select value={this.props.OriginCode} onChange={this.onOriginChangeHandler()} style={{marginRight:"16px"}}>
							<option value="SG">SG</option>
							<option value="MY">MY</option>
						</select>
					</div>
					<div className="space-6"></div>
					<div className="row">
						<div className="col-xs-12">
							<table className="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th className="center">
											<label className="position-relative">
												<input type="checkbox" className="ace" />
												<span className="lbl"></span>
											</label>
										</th>
										<th>
											<i className="ace-icon fa fa-clock-o bigger-110 hidden-480"></i>
											OriginCode
										</th>
										<th>Username</th>
										<th>isGiveVoucher</th>
										<th>isGiveGift</th>
										<th>amount</th>
										<th>clickAmount</th>
										<th>registerAmount</th>
										<th>appRegisterAmount</th>
										<th>overOrderAmount</th>
										<th>identId</th>
										<th className="hidden-480">Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{userRows}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<ModalDialog title="Add User" ref="userForAdd" buttons={this.getSaveButtons("add")}>
					<form className="form-horizontal" role="form">
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >userName</label>

							<div className="col-sm-9">
								<input type="text" placeholder="userName" className="col-xs-10 col-sm-5" value={this.state.usersObj.userName} onChange={this.onUserValueChangeHandler("userName","usersObj",this)} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >OriginCode</label>

					

							<select value={this.state.usersObj.catalog} onChange={this.onUserValueChangeHandler("catalog","usersObj",this)} className="col-xs-10 col-sm-5" style={{marginRight:"16px"}}>
								<option value="SG">SG</option>
								<option value="MY">MY</option>
							</select>

						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >isGiveVoucher</label>

							<div className="col-sm-9">
								<Switch defaultChecked={false} onChange={(checked)=>{
								usersObj =	Object.assign({},usersObj, {isGiveVoucher:checked})
								this.setState({usersObj})
								}} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >isGiveGift</label>

							<div className="col-sm-9">
								<Switch defaultChecked={false} onChange={(checked)=>{
								usersObj = Object.assign({},usersObj, {isGiveGift:checked})
								this.setState({usersObj})
								}} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >PhoneNumber</label>

							<div className="col-sm-9">
								<input type="text" placeholder="PhoneNumber" className="col-xs-10 col-sm-5" value={this.state.usersObj.phoneNumber} onChange={this.onUserValueChangeHandler("phoneNumber","usersObj",this)} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >Amount</label>

							<div className="col-sm-9">
								<input type="text" placeholder="Amount" className="col-xs-10 col-sm-5" value={this.state.usersObj.amount} onChange={this.onUserValueChangeHandler("amount","usersObj",this)} />
							</div>
						</div>
					</form>
				</ModalDialog>
				<ModalDialog title="update User" ref="userForUpdate" buttons={this.getSaveButtons("update")}>
					<form className="form-horizontal" role="form">
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >UserName</label>

							<div className="col-sm-9">
								<input type="text" placeholder="userName" className="col-xs-10 col-sm-5" value={this.state.usersObj.userName} onChange={this.onUserValueChangeHandler("userName","usersObj",this)} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >isGiveVoucher</label>

							<div className="col-sm-9">
								<Switch checked={this.state.usersObj.isGiveVoucher} onChange={(checked)=>{
								usersObj =	Object.assign({},usersObj, {isGiveVoucher:checked})
								this.setState({usersObj})
								}} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >isGiveGift</label>

							<div className="col-sm-9">
								<Switch checked={this.state.usersObj.isGiveGift} onChange={(checked)=>{
								usersObj = Object.assign({},usersObj, {isGiveGift:checked})
								this.setState({usersObj})
								}} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >PhoneNumber</label>

							<div className="col-sm-9">
								<input type="text" placeholder="PhoneNumber" className="col-xs-10 col-sm-5" value={this.state.usersObj.phoneNumber} onChange={this.onUserValueChangeHandler("phoneNumber","usersObj",this)} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-3 control-label no-padding-right" >Amount</label>

							<div className="col-sm-9">
								<input type="text" placeholder="Amount" className="col-xs-10 col-sm-5" value={this.state.usersObj.amount} onChange={this.onUserValueChangeHandler("amount","usersObj",this)} />
							</div>
						</div>
					</form>
				</ModalDialog>
			</div>
		)
	}
	componentWillMount(){
		this.getdataList();
	}
	onOriginChangeHandler(){
		var self = this;
		return function(e){
			var OriginCode = e.target.value;
			self.props.dispatch(setOriginCode(OriginCode));
			loading('add')
			RedPacket.UserGetQRUserList(OriginCode,{
				success:function(data){
					 loading('none')
					self.props.dispatch(setListUser(data.result.QRList));
				},
				error:function(data){
					$.toaster({ priority : 'danger', title : '', message : 'change origin fail!'});
				}
			});
		}
	}
	getdataList(){
		var self = this;
		loading('add')
		RedPacket.UserGetQRUserList(this.props.OriginCode,{
			success:function(data){
				loading('none')
				self.props.dispatch(setListUser(data.result.QRList));
			},
			error:function(data){
				$.toaster({ priority : 'danger', title : '', message : 'get user fail!'});
			}
		});
	}
	getSaveButtons(type){
		var action = null;
		if(type === "add"){
			return (
				<a className="btn btn-primary" onClick={this.addUberUser()}>Save</a>
			)
		}else if(type === "update"){
			return (
				<a className="btn btn-primary" onClick={this.udateUberUser()}>Save</a>
			)
		}
	}
	addUberUser(){
		var self = this;
		return function(){
			if(self.state.usersObj.catalog === ""){
				alert("please input OriginCode");
			}
			RedPacket.UserAddQRUser(
				self.state.usersObj.userName,
				self.state.usersObj.catalog,
				self.state.usersObj.phoneNumber,
				parseFloat(self.state.usersObj.amount),
				self.state.usersObj.isGiveVoucher,
				self.state.usersObj.isGiveGift,
				{
					success:function(data){
						$.toaster({ priority : 'success', title : '', message : 'Add user sucess!'});
						self.getdataList();
						self.refs.userForAdd.hide();
					},
					error:function(data){
						$.toaster({ priority : 'danger', title : '', message : 'Add user fail!'});
					}
				})
		}
	}
	udateUberUser(){
		var self = this;
		return function(){
			RedPacket.UserUpdateQRUser(
				self.state.usersObj.id,
				self.state.usersObj.userName,
				self.state.usersObj.catalog,
				self.state.usersObj.phoneNumber,
				parseFloat(self.state.usersObj.amount),
				self.state.usersObj.isGiveVoucher,
				self.state.usersObj.isGiveGift,
				{
					success:function(data){
						$.toaster({ priority : 'success', title : '', message : 'Update user sucess!'});
						self.getdataList();
						self.refs.userForUpdate.hide();
					},
					error:function(data){
						$.toaster({ priority : 'danger', title : '', message : 'Update user fail!'});
					}
				})
		}
	}
	onUserValueChangeHandler(key,changeUserKey,context){
		return function(e){
			let newUserInfo = context.state[changeUserKey];
			let newState = {};
			newUserInfo[key] = e.currentTarget.value;
			newState[changeUserKey] = newUserInfo;
			context.setState(newState);
		}
	}
	onAddUserDialogShowHandler(){
		var self = this;
		return function(){
			self.refs.userForAdd.show();
		}
	}
	download(item){
		var self = this;
		return function(){
			if (item.Id === ""){
				alert('没有产品');
				return;
			}else{
				window.open(Config.redpacket_excel+"?id="+item.Id);
			}
		}
	}
	updateUser(item){
		var self = this;
		return function(){
			var newUserObj = self.state.usersObj;
			newUserObj['id'] = item.Id;
			newUserObj['userName'] = item.userName;
			newUserObj['amout'] = item.amount;
			newUserObj['catalog'] = item.catalog;
			newUserObj['phoneNumber'] = item.phoneNumber;
			newUserObj.isGiveGift = item.isGiveGift;
			newUserObj.isGiveVoucher = item.isGiveVoucher;
			self.setState({usersObj:newUserObj},function(){
				self.refs.userForUpdate.show();
			});
		}
	}
	deleteUser(item){
		var index = item.Id;
		var self = this;
		return function(){
			if(confirm("confirm delete!")){
				RedPacket.UserDeleteQRUser(index,{
					success:function(data){
						$.toaster({ priority : 'success', title : '', message : 'delte user sucess!'});
						self.getdataList();
					},
					error:function(data){
						$.toaster({ priority : 'danger', title : '', message : 'delte user fail!'});
					}
				})
			}
		}
	}
}

function mapStateToProps(state) {
    return { 
    	isLogin: state.tLogin.isLogin,
    	usersObj:state.tLogin.usersObj,
    	OriginCode:state.tLogin.OriginCode,
	}
}

function mapDispatchToProps(dispatch) {

  return { actions: bindActionCreators({logout}, dispatch) }
}
var FeatureCollectionStore = connect(mapStateToProps)(FeatureCollection);

export default FeatureCollectionStore

