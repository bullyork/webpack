import React,{Component} from 'react';
import ReactDOM from "react-dom";
import {Provider,connect} from "react-redux";
import { Link } from 'react-router';
import { Form, Input, Button, Checkbox, Table,message,Switch } from 'antd';
import QuickBuyService from "./../../models/quickBuyService.js";
import quickBuyStore from "./../../store/quickBuyStore.js";
import {getFlashSalesList} from "./../../action/quickBuyAction.js";

class FlashSales extends React.Component {
	constructor(props){
        super(props);
        this.state = {
        	record:{},
        	columns : [
              { title: 'salesName', dataIndex: 'salesName', key: 'salesName' },
              { title: 'salesStartTime', dataIndex: 'salesStartTime', key: 'salesStartTime' },
              { title: 'salesEndTime', dataIndex: 'salesEndTime', key: 'salesEndTime' },
              { title: 'isActive', dataIndex: 'isActive', key: 'isActive',render: (text, record) => <Switch checked={text} onChange={(checked) => this.onChangeActiveState(checked,record,record.settingId)} /> },
              { title: 'limitation', dataIndex: 'limitation', key: 'limitation' },
              { title: 'View', dataIndex: 'view', key: 'view',render: (text, record) => <Link to={`/products/${record.settingId}`} params={{id: 1}} className="btn btn-default">view</Link> },
			  { title: 'Update', dataIndex: 'update', key: 'update',render: (text, record) => <Button type="primary" onClick={this.updateEaleaserach(record.settingId)}>Update</Button> },
			  { title: 'Delete', dataIndex: 'delete', key: 'delete',render: (text, record) => <Button type="primary" onClick={this.deleteActivies(record.settingId)}>Delete</Button> }
            ],
        };
    }
    deleteActivies(recordId){
    	return function(){
    		QuickBuyService.UserDeleteFlashSalesSetting(recordId).then((data)=>{
				message.success('Delete Success');
				if(data.message === "ok"){
					quickBuyStore.dispatch(getFlashSalesList(0,20));
				}
			})
    	}
    }
    updateEaleaserach(recordId){
    	return function(){
    		QuickBuyService.SyncFlashSales(recordId).then((flashSales)=>{
				message.success('Update Success');
				window.location.reload();
			})
    	}
    }
    onChangeActiveState(checked,record,recordId){
    	var newSeting = record;
    	newSeting["settingId"] = recordId;
    	newSeting["isActive"] = checked;
    	this.setState({record:newSeting},function(){
    		QuickBuyService.UserUpdateFlashSalesSetting(this.state.record).then((data)=>{
				message.success(data.message,3);
			})
    	})
    }
	componentDidMount(){
		this.loadData();
	}
	ToAddActivity(){
		window.location.hash = '/activitie';
	}
	renderFlashSalesItem(){
        return (
            <Table columns={this.state.columns} dataSource={this.props.QuickBuy.flashSalesList} className="table" />
            )
	}
	render(){
		return (
			<div>
				<Button type="primary" htmlType="submit" onClick={this.ToAddActivity}>Add activity</Button>
				<div>
					{this.renderFlashSalesItem()}
				</div>
			</div>
			)
	}
	loadData(){

		quickBuyStore.dispatch(getFlashSalesList(0,20));
	}
}


function mapStateToProps(state) {
  return Object.assign({},state,{});
}


export var FlashSalesList = connect(mapStateToProps)(FlashSales)

export default class FlashSalesListStore extends React.Component{
	render(){
		return (
				<div>
					<Provider store={quickBuyStore}>
	                    <FlashSalesList />
	                </Provider>
				</div>
			)
	}
}
