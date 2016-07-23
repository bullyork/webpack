import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Button, Row, Form, Col, Select, Radio, Input, Checkbox, Table, Switch} from 'antd';
import {primeShipmentBooks, statusTexts, checkError} from './wish.js'
import { CheckPrimeProduct, BulkAcceptPrimeProduct, ListPrimeProduct, changeSelectedData, changeLimit, changeOffset, changeSearchCondition} from './../../action/wishlist.js'
import EditItem  from './Edit.jsx'



const RadioGroup = Radio.Group;

@connect()
class Operate extends Component {
	constructor(props){
		super(props);

		this.state = {
			visible:false
		}
	}

	changeFn(status, primeShipment){
		const {dispatch} = this.props;
		let productId = this.props.record.id;

		dispatch(CheckPrimeProduct(productId, status, primeShipment, (re)=>{

			if(re.code !== 0){
				alert("Update Failed!" + checkError[re.code]);
				return;
			}

			dispatch(changeSearchCondition({reload: true}))

		}))
	}
	render(){
		const {visible} = this.state;

		if(!this.props.record.isActivityCid){
			return (
				<span style={{color:"#f34"}} title="分类已下架, 拒绝Prime Wishlist请求">You Can Reject</span>
			)
		}

		return (
			<span>
				<Button onClick={()=>{
					this.setState({
						visible:true
					})
				}}>Edit</Button>
				<EditItem visible={visible} {...this.props.record}  title="Edit Wish List" handleOk={this.changeFn.bind(this)}  closeModal={()=>{
					this.setState({
						visible:false
					})
				}}  />
			</span>
		)
	}
}

@connect()
class CheckStatus extends Component {
	constructor(props){
		super(props);
	}

	changeStatus(status){
		const {dispatch, record} = this.props;
		const {primeShipment, id} = record;
		let productId = id;

		this.props.dispatch(CheckPrimeProduct(productId, status, primeShipment, (re)=>{

			if(re.code !== 0){
				alert("Update Failed!" + checkError[re.code]);
				return;
			}

			dispatch(changeSearchCondition({reload: true}))
		}))
	}

	render(){
		const {status, record} = this.props;
		let colors = ['#3B3C2B', '#03AD03', 'red'];

		if(status != 0){
			return (
				<strong style={{color: colors[status] }}>
					{statusTexts[status]}
				</strong>
			)
		}

		if(!record.isActivityCid){
			return (
				<span>
					<Button type="primary" onClick={this.changeStatus.bind(this, 2)}>Reject</Button>
				</span>
			)
		}

		return (
			<span>
				<Button type="primary" onClick={this.changeStatus.bind(this, 2)}>Reject</Button>
				&nbsp; &nbsp;
				<Button type="primary" onClick={this.changeStatus.bind(this, 1)}>Approve</Button>
			</span>
		)
	}
}

@connect()
class PrimeShipment extends Component{
	constructor(props){
		super(props);

		this.state = {
			primeShipment: props.primeShipment
		}
	}
	changeShipment(_status){

		const {dispatch, record} = this.props;
		const primeShipment = _status.target.value;

		this.setState({
			primeShipment: primeShipment
		});

		//  change shipment
		const {status, id} = record;
		let productId = id;

		dispatch(CheckPrimeProduct(productId, status, primeShipment, (re)=>{
			if(re.code !== 0){
				alert("Update Failed!" + checkError[re.code]);
				return;
			}

			dispatch(changeSearchCondition({reload: true}))
		}))
	}
	render(){
		const {primeShipment} = this.state;
		let keys = Object.keys(primeShipmentBooks);

		if(!this.props.record.isActivityCid){
			return (<span>{primeShipmentBooks[primeShipment]}</span>);
		}

 		return (
 			<span>
				<RadioGroup value={primeShipment} onChange={this.changeShipment.bind(this)}>
 					{
 						keys.map((key, i)=>{
 							var val = primeShipmentBooks[key];
							return (<Radio key={val} value={parseInt(key)}>{val}</Radio>)
 						})
 					}
 				</RadioGroup>
 			</span>
 		)
 	}
}


const columns = [{
	title:"check YES/NO",
	dataIndex:"status",
	width:180,
	render:(status,record)=>{
		// status 0: waiting 1: approve 2:reject
		return (<CheckStatus status={status} record={record} />)
	}
},{
	title:"transportation",
	dataIndex:"primeShipment",
	width:100,
	render:(text, record)=>{
		return (<PrimeShipment primeShipment={text} record={record} />)
	}
},{
	title:"user id",
	dataIndex:"userId"
},{
	title:"product name",
	dataIndex:"name",
	width:250
},{
	title:"product image",
	dataIndex:"picture",
	render:(text)=>{
		return (
			<div className="_img text-center">
				<img src={text} alt="" width="40px"/>
			</div>
		)
	}
},
{
	title:"Product URL",
	dataIndex:"url",
	render:(text)=>{
		return (<a target="_target" href={text}>商品链接</a>)
	}
},{
	title:"Price",
	dataIndex:"price"
},{
	title:"CID",
	dataIndex:"cid"
},{
	title:"Add Time",
	dataIndex:"submitTime"
},{
	title:"Audit Time",
	dataIndex:"checkTime"
},{
	title:"Operate",
	dataIndex:"",
	render:(text, record)=>{
		return ( <Operate record={record} />)
	}
}]


@connect((state)=>({
	countryCode: state.countryCode,
	status: state.status,
	limit: state.limit,
	offset: state.offset,
	activityId: state.activityId,
	currentActivityId: state.currentActivityId,
	listData: state.listData,
	totalCount: state.totalCount,
	searchCondition: state.searchCondition
}))
export default class ListProduct extends Component {
	constructor(props){
		super(props)
		this.state = {
			selectedRowKeys: [],  // 这里配置默认勾选列
			loading: false
		}
	}
	render() {
		const {listData} = this.props;

		return (
			<Table rowSelection={this.rowSelectionInit()} columns={columns} dataSource={listData.map((itemData)=>Object.assign({},itemData,{key:itemData.id}))}  pagination={this.paginationInit()} bordered/>
		);
	}

	paginationInit(){

		var _this = this;
		var {totalCount, dispatch, limit, searchCondition} = this.props;

		return {
			total: totalCount,
			showSizeChanger: true,
			onShowSizeChange(current, pageSize) {

				dispatch(changeLimit(pageSize))
				dispatch(changeSearchCondition({}))
			},
			onChange(current) {
				dispatch(changeOffset((current - 1) * limit))
				dispatch(changeSearchCondition({}))
			}
		}
	}

	rowSelectionInit(){
		var _this = this;
		const {dispatch} = this.props;

		return {
			onChange(selectedRowKeys, selectedRows) {
				// console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			},
			onSelect(record, selected, selectedRows) {
				// console.log(record, selected, selectedRows);
				dispatch(changeSelectedData(selectedRows))
			},
			onSelectAll(selected, selectedRows, changeRows) {

				if(!selected){
					return;
				}

				dispatch(changeSelectedData(selectedRows))
			}
		};


	}

	componentWillReceiveProps(nextProps){
		let prevCondition = this.props.searchCondition;
		let nextCondition = nextProps.searchCondition;

		let status = Object.keys(nextCondition).every((key)=>{
			return prevCondition[key] === nextCondition[key];
		});

		if(!status || nextCondition.reload){
			this.getData(nextProps);
		}
	}

	getData(nextProps){
		const _props = nextProps || this.props;
		const {dispatch} = _props;

		let searchCondition = _props.searchCondition;

		let {status, countryCode, limit, offset, activityId, startTime, endTime, url, userId} = searchCondition;

		userId = userId ? userId : "";
		url = url ? url : "";
		startTime = startTime ? startTime : "";
		endTime = endTime ? endTime : "";

		if(activityId === "" && startTime === "" && endTime === ""){
			return;
		}


		delete searchCondition.reload;

		// activity Id 可选
		// startTime endTime 可选

		dispatch(ListPrimeProduct(userId, url, status, countryCode, limit, offset, startTime, endTime, activityId))
	}

	componentDidMount(){
		this.getData();
	}
}
