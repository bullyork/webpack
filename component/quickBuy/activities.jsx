import React,{Component} from 'react';
import ReactDOM from "react-dom"
import { Router, Route, Link } from 'react-router';
import { DatePicker, Switch,Button,message,Upload,Icon } from 'antd';
const RangePicker = DatePicker.RangePicker;
import zh_CN from 'antd/lib/date-picker/locale/zh_CN';
import assign from 'object-assign';
import QuickBuyService from "./../../models/quickBuyService.js";

export default class extends React.Component {
	constructor(props){
        super(props);
        this.state = {
        	SalesSetting:{
        		salesStartTime:"",
        		salesEndTime:"",
        		isActive:false,
        		usableCoupon:false,
        		salesName:"",
        		limitation:100,
        	}
        };
    }
	componentDidMount(){
		
	}
	onChange(value) {
		var newSalesSetting = this.state.SalesSetting;
		newSalesSetting["salesStartTime"] = value[0].toString().replace("中国标准时间", "CST");
		newSalesSetting["salesEndTime"] = value[1].toString().replace("中国标准时间", "CST");
		this.setState({SalesSetting:newSalesSetting});
	}
	changeValue(event){
		var name = event.target.name;

		var newSalesSetting = this.state.SalesSetting;
		newSalesSetting[name] = event.target.value;
		this.setState({SalesSetting:newSalesSetting});
	}
	changeChecked(checked){
		var newSalesSetting = this.state.SalesSetting;
		newSalesSetting["isActive"] = checked;
		this.setState({SalesSetting:newSalesSetting});
	}
	changeusableCoupon(checked){
		var newSalesSetting = this.state.SalesSetting;
		newSalesSetting["usableCoupon"] = checked;
		this.setState({SalesSetting:newSalesSetting});
	}
	saveActivity(){
		console.log(this.state.SalesSetting);
		var checkoutData = this.state.SalesSetting;
		if(checkoutData.salesName === ""){
			message.error('salesName is null');
			return;
		}
		if(checkoutData.salseStartTime === ""){
			message.error('startTime is null');
			return;
		}
		if(checkoutData.salseEndTime === ""){
			message.error('endTime is null');
			return;
		}
		if(checkoutData.limitation === "0" || checkoutData.limitation === ""){
			message.error('limitation is null');
			return;
		}
		var SalesSetting = this.state.SalesSetting;
		SalesSetting["limitation"] = parseInt(SalesSetting["limitation"]);
		QuickBuyService.UserAddFlashSalesSetting(SalesSetting).then((data)=>{
			console.info(data);
			if(data.message === "ok"){
				message.success('Add success');
			}
		})
	}
	redirectToProduct(){
		window.location.hash = '/';
	}
	render(){
		return (
			<div>
				<Button type="primary" htmlType="submit" onClick={this.redirectToProduct.bind(this)}>FlashSales List</Button>
				<div style={{margin:"50px 0 0 30px"}}>
					<input className='ant-input' style={{width: '200px',marginRight:'10px'}} ref='addItem' placeholder={'添加salesName'} name="salesName" value={this.state.SalesSetting.salesName} onChange={this.changeValue.bind(this)} />
					<br/>
					<br/>
					<br/>
					<RangePicker locale={this.state.locale} showTime format="yyyy/MM/dd HH:mm:ss" onChange={this.onChange.bind(this)} />
					<br/>
					<br/>
					<br/>
					<span style={{marginRight:"20px"}}>products limit</span><input className='ant-input' style={{width: '200px',marginRight:'10px'}} ref='addItem' placeholder={'添加limitation'} name="limitation" value={this.state.SalesSetting.limitation} onChange={this.changeValue.bind(this)} />
					<br/>
					<br/>
					<br/>
					<span style={{marginRight:"20px"}}>isActive</span>
					<Switch defaultChecked={false} onChange={this.changeChecked.bind(this)} />
					<br/>
					<br/>
					<br/>
					<br/>
					<Button type="primary" htmlType="submit" onClick={this.saveActivity.bind(this)}>Add activity</Button>
				</div>
			</div>
			)
	}
}

var hideFunction = null;
const fileUploadProps = {
	"action":"/api/upload",
	"accept":"*.xlsx,*.xls",
	"multiple":false,
	onChange(info) {
		if(hideFunction === null){
			hideFunction = message.loading('正在执行中...', 0);
		}
		if (info.file.status === 'done' && info.file.response !== null) {
			hideFunction();
			hideFunction = null;
			message.success(info.file.response.data.info,3);
		} else if (info.file.status === 'error') {
			hideFunction();
			hideFunction = null;
			message.error("error",3);
		}
  	}
}


