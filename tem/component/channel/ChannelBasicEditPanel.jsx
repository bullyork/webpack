import React,{Component} from "react"
import { Form, Input,Row,Col,Select,Button,Switch,InputNumber} from 'antd';
import {ImageField,StringArrayInput} from "./../../common";
import {linkTypes} from "./constant.js"
const FormItem = Form.Item;
const Option = Select.Option;

const {assign} = Object;

const themeColors = ["mintGreen","flesh","pinkAndPurple","brightYellow","green","purple"];

@Form.create()
class ChannelBasicEditPanel extends Component{
	constructor(props){
		super(props);
		this.state = {data:null};
		["handleSubmit"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
	    const { getFieldProps } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    const nameProps = getFieldProps('name', {
			rules: [
				{ required: true, message: '请输入频道名' }
			]
	    });

	    const themeColorProps = getFieldProps("themeColor",{
	    	rules:[
	    		{required:true,message:"请选择主题颜色"}
	    	]
	    })

		return (
			<Form horizontal form={this.props.form}>
				{
					this.state.data !== null?(
						<FormItem {...formItemLayout} label="Id:">
							<Input type="text" {...getFieldProps("id")} disabled={true} placeholder="请输入Id信息 " />
						</FormItem>
					):null
				}
				<FormItem {...formItemLayout} label="频道名:">
					<Input type="text" {...nameProps} disabled={false} placeholder="请输入频道名称" />
				</FormItem>
				<FormItem {...formItemLayout} label="频道标识图片:">
					<ImageField {...getFieldProps("picture")} width="78" />
				</FormItem>
				<FormItem {...formItemLayout} label="主题颜色">
					<Select {...themeColorProps} placeholder="请输入主题颜色">
						{
							themeColors.map((oneColor)=>{
								return (<Option key={oneColor} value={oneColor}>{oneColor}</Option>)
							})
						}
					</Select>
				</FormItem>
				<FormItem {...formItemLayout} label="是否显示:">
					<Switch {...getFieldProps("isDisplayFront",{valuePropName:"checked"})} />
				</FormItem>
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="内页显示商品数量:">
							<InputNumber {...getFieldProps("productCount",{rules:[{ required: true, message: '请输入商品数量',type:"integer" },{ validator:this.checkProductCount}]})} disabled={false} size="large" />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="内页banner图">
							<ImageField {...getFieldProps("banner")} />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="banner linkAddress">
							<Input type="text" {...getFieldProps("linkAddress")} />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="Normal Collection Ids">
							<StringArrayInput {...getFieldProps("unPrimeCollectionIds")} />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="Normal Collection Name">
							<Input {...getFieldProps("unPrimeCollectionName",{"initialValue":"Collection"})} />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="Prime Collection Ids">
							<StringArrayInput {...getFieldProps("primeCollectionIds")} />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="Prime Collection Name">
							<Input {...getFieldProps("primeCollectionName",{"initialValue":"Prime"})} />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="slug">
							<Input {...getFieldProps("slug")} />
						</FormItem>
					):null
				}
				{
					this.props.isChannelHasDetail ? (
						<FormItem {...formItemLayout} label="链接类型">
							<Select 
								{
									...getFieldProps('linkType', {
										rules: [
											{ required: true, message: '请输入链接类型',type:"number" }
										],
										initialValue:8,
									})
								} 
								disabled={false}
								placeholder="请输入链接类型"
							>
							{
								linkTypes.map((oneLinkType,idx)=>{
									return (<Option key={idx} value={idx}>{oneLinkType}</Option>)
								})
							}
						</Select>
					</FormItem>
					):null
				}
				<FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
					<Button type="primary" onClick={this.handleSubmit}>保存</Button>
			    </FormItem>
				<Row>
					<Col span="16">
						<div style={{height:"20px"}}></div>
					</Col>
		        </Row>
			</Form>
		)
	}

	checkProductCount(rule, value, callback) {
		let resultAfterParse = parseInt(value);
		if (isNaN(resultAfterParse) || resultAfterParse <= 0 || !/^\d+$/.test(value)) {
			callback(new Error('格式只能是大于零的正整数'));
		} else {
			callback();
		}
	}

	componentDidMount(){
		let data = this.props.data === null ? null : assign(this.props.data,{},{});
		this.setState({data:data},()=>{
			if(data !== null){
				this.props.form.setFieldsValue(this.props.data);
			}
		});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== this.props.data){
			let data = nextProps.data === null ? null : assign(nextProps.data,{},{});
			this.setState({data:data},()=>{
				if(data !== null){
					this.props.form.setFieldsValue(nextProps.data);
				}else{
					this.props.form.setFieldsValue({});
				}
			});
		}
	}

	handleSubmit(e){
    	e.preventDefault();
		this.props.form.validateFieldsAndScroll((errors, values) => {
			if (!!errors) {
				return;
			}
			if(typeof values["productCount"] !== "undefined"){
				values["productCount"] = parseInt(values["productCount"]);
			}
			this.props.onSave&&this.props.onSave(values);
	    });
	}

}


export default ChannelBasicEditPanel


ChannelBasicEditPanel.defaultProps = {
	data:null
}