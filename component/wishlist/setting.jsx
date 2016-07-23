import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Row, Form, Col, InputNumber, Select, Input, Switch, Radio, RadioGroup, DatePicker} from 'antd';
import {ActivityConfig } from './../../action/wishlist.js'
import {ObjQual } from './wish.js'

const FormItem = Form.Item;


@Form.create()
export default class Setting extends Component {
	constructor(props){
		super(props)
		this.state = {
			startTime:null,
			expireTime:null
		}
	}
	disabledStartDate(startTime) {
		if (!startTime || !this.state.expireTime) {
			return false;
		}
		return startTime.getTime() >= this.state.expireTime.getTime();
	}
	disabledEndDate(expireTime) {
		if (!expireTime || !this.state.startTime) {
			return false;
		}
		return expireTime.getTime() <= this.state.startTime.getTime();
	}
	onChange(field, value) {
		// console.log(field, 'change', value);
		this.props.form.setFieldsValue({
			[field]:value
		});

		this.setState({
			[field]: value,
		});
	}
	onStartChange(value) {
		this.onChange('startTime', value);
	}
	onEndChange(value) {
		this.onChange('expireTime', value);
	}
	render() {

		const { getFieldProps } = this.props.form;
		const { add, settingData } = this.props;

		let disabled = !add;

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		};

		return (
			<Form horizontal>
				<div className="" style={{margin:"10px 20px",border:"1px solid #eee", padding:"10px"}}>
					<FormItem
						{...formItemLayout}
						label="Activity Name:">
						<Input {...getFieldProps('name')} />
					</FormItem>

					<FormItem {...formItemLayout} label="活动时间:">
						<DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps('startTime')} disabledDate={this.disabledStartDate.bind(this)}
							placeholder="开始日期"
							onChange={this.onStartChange.bind(this)} />
						--
						<DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps('expireTime')} disabledDate={this.disabledEndDate.bind(this)}
							placeholder="结束日期"
							onChange={this.onEndChange.bind(this)} />
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="Max commitCount:">
						<InputNumber {...getFieldProps('commitCount')} min={1} max={1000} defaultValue={10} />
					</FormItem>
					</div>
				</Form>
		);
	}

	componentWillReceiveProps(nextProps){
		const {form} = this.props;
		const {settingData} = nextProps;

		if(!this.props.add && settingData.id !== this.props.settingData.id){
			form.setFieldsValue(settingData);
		}
	}

	componentDidMount(){
		const {settingData, form} = this.props;

		if(this.props.add){
			form.setFieldsValue({
				commitCount:10,
				name:""
			})
		}else if(settingData.id){
			form.setFieldsValue(settingData);
		}

	}
}


@Form.create()
class ActivityCondition extends Component{
	render(){

		const { getFieldProps } = this.props.form;
		const { add, settingData } = this.props;

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		};


		return (
			<Form horizontal>
				<div className="" style={{margin:"10px 20px",border:"1px solid #eee", padding:"10px"}}>
					<FormItem {...formItemLayout} label="购物车时间是否有效:">
						<Switch {...getFieldProps("isSetTimeAddCart",{ valuePropName: 'checked' })}  />
					</FormItem>
					<FormItem {...formItemLayout} label="购物车时间:">
						<DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps("addCartTime")} />
					</FormItem>

					<FormItem {...formItemLayout} label="结账时间是否有效:">
						<Switch {...getFieldProps("isSetTimeCheckout", { valuePropName: 'checked' })}  />
					</FormItem>
					<FormItem {...formItemLayout} label="结账时间:">
						<DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps("checkoutTime")} />
					</FormItem>

					<p className="info">
						1. 购物车时间和结账时间不能同时有效
						2. 时间必须是大于当前时间的
					</p>
				</div>
			</Form>
		)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.ActivityCondition && nextProps.ActivityCondition.countryCode && !ObjQual(this.props.ActivityCondition, nextProps.ActivityCondition)){
			const {ActivityCondition, form} = this.props;
			form.setFieldsValue(ActivityCondition);
		}
	}

	componentDidMount(){
		const {ActivityCondition, form} = this.props;
		form.setFieldsValue(ActivityCondition);
	}
}


export const EditActivityCondition = ActivityCondition