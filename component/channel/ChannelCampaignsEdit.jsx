import React,{Component} from "react"
import {connect} from "react-redux"
import {loadDetail,doSaveCampaign,doAddCampaign,startEditCampaign,endEditCampaign} from "./actions/channel.js"
import { message , Icon } from 'antd'
import { Form, Input,Row,Col,Select,Button,Table,Modal} from 'antd';
import {linkTypes} from "./constant.js"
import {openDialog,closeDialog} from "./../../action/dialog.js"
import {ImageField,Image} from "./../../common";

require("./less/campaignsEdit.less")

const FormItem = Form.Item;
const Option = Select.Option;
const {assign} = Object;

@connect((state)=>({campaigns:state.editingChannel===null?[]:state.editingChannel.campaigns}))
class ChannelCampaignsEdit extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<h3>编辑促销图片</h3>
				<hr style={{marginTop:"10px",marginBottom:"10px"}} />
				<div>
					<div className="campaignsWrapper">
						{this.renderCampaigns()}
					</div>
				</div>
				<ChannelCampaignAddModal />
				<ChannelCampaignEditModal />
			</div>
		)
	}

	renderCampaigns(){
		const {dispatch} = this.props;
		let campaigns = this.props.campaigns.slice(0,5);

		for(var i=0;campaigns.length < 5;i++){
			if(i===0){
				campaigns.push("add");
			}else{
				campaigns.push("empty");
			}
		}

		return campaigns.map((campaign,idx)=>{
			let innerComponent = null;
			let props = {};
			if(campaign === "add"){
				props["onClick"] = ()=>{
					dispatch(openDialog("addDialog"));
				}
				innerComponent = (
					<Button type="primary" shape="circle">
						<Icon type="plus" />
					</Button>
				);
			}else if(typeof campaign === "object"){
				props["onClick"] = ()=>{
					dispatch(startEditCampaign(idx));
				}
				innerComponent = (
					<Image src={campaign.picture} params="imageMogr2/thumbnail/300x" width="100%" />
				);
			}
			return (
				<div className="campaignItem" {...props}>
					{innerComponent}
				</div>
			)
		})
	}

	componentDidMount(){
		this.props.dispatch(loadDetail(this.props.params.channelId));
	}
}



@connect((state)=>({visible:state.editingCampaignIndex !== -1,dataForEditing:state.editingCampaignIndex === -1?null:state.editingChannel.campaigns[state.editingCampaignIndex]}))
class ChannelCampaignEditModal extends Component{
	constructor(props){
		super(props);
		["onOK"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		const {dispatch} = this.props;
		return (
			<Modal title="编辑促销图片"
				visible={this.props.visible}
				onOk={this.onOK}
				onCancel={()=>{dispatch(endEditCampaign())}}>
				<ChannelCampaignEditPanel data={this.props.dataForEditing} ref="editPanel" />
			</Modal>
		)
	}

	onOK(){
		const {dispatch} = this.props;
		this.refs.editPanel.validateFieldsAndScroll((errors, values) => {
			if(!!errors){
				return;
			}
			dispatch(doSaveCampaign(values)).then((flag)=>{
				if(flag){
					message.success("更新成功!");
					dispatch(endEditCampaign());
				}else{
					message.warn("更新失败!");
				}
			});
		});

	}
}


@connect((state)=>({visible:state.dialog.addDialog}))
class ChannelCampaignAddModal extends Component{
	constructor(props){
		super(props);
		["onOK"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		const {dispatch} = this.props;
		return (
			<Modal title="添加促销图片"
				visible={this.props.visible}
				onOk={this.onOK}
				onCancel={()=>{dispatch(closeDialog("addDialog"))}}>
				<ChannelCampaignEditPanel ref="editPanel" />
			</Modal>
		)
	}

	onOK(){
		const {dispatch} = this.props;
		this.refs.editPanel.validateFieldsAndScroll((errors, values) => {
			if(!!errors){
				return;
			}
			dispatch(doAddCampaign(values)).then((flag)=>{
				if(flag){
					message.success("添加成功!");
					dispatch(closeDialog("addDialog"));
				}else{
					message.warn("添加失败!");
				}
			});
		});

	}
}


@Form.create()
class ChannelCampaignEditPanel extends Component{

	constructor(props){
		super(props);
		this.state = {data:null};
	}


	render(){		
	    const { getFieldProps } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };

		const slugProps = getFieldProps('slug', {
			rules: [
				{ required: true, message: '请输入slug' }
			]
		});

		const linkTypeProps = getFieldProps('linkType', {
			rules: [
				{ required: true, message: '请输入链接类型',type:"number" }
			]
		});

		return (
			<Form horizontal form={this.props.form}>	
				{
					this.state.data !== null?(
						<FormItem {...formItemLayout} label="Id:">
							<Input type="text" {...getFieldProps("id")} disabled={true} placeholder="请输入Id信息 " />
						</FormItem>
					):null
				}
				<FormItem {...formItemLayout} label="促销图片名:">
					<Input type="text" {...getFieldProps("name")} disabled={false} placeholder="请输入关键词名" />
				</FormItem>
				<FormItem {...formItemLayout} label="链接类型:">
					<Select {...linkTypeProps} disabled={false} placeholder="请输入链接类型">
						{
							linkTypes.map((oneLinkType,idx)=>{
								return (<Option key={idx} value={idx}>{oneLinkType}</Option>)
							})
						}
					</Select>
				</FormItem>
				<FormItem {...formItemLayout} label="slug:">
					<Input type="text" {...slugProps} disabled={false} placeholder="请输入slug" />
				</FormItem>
				<FormItem {...formItemLayout} label="频道标识图片:">
					<ImageField {...getFieldProps("picture")} width="78" />
				</FormItem>
			</Form>
		)
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
}

ChannelCampaignEditPanel.defaultProps = {
	data:null
}

export default ChannelCampaignsEdit;
