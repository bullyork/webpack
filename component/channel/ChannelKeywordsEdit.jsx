import React,{Component} from "react"
import {connect} from "react-redux"
import {startEditKeyword,doSaveKeyword,doDeleteKeyword,doAddKeyword,endEditKeyword,loadDetail} from "./actions/channel.js"
import { message } from 'antd'
import { Form, Input,Row,Col,Select,Button,Table,Modal} from 'antd';
import {tagTypes,linkTypes} from "./constant.js"
import channelStore from "./stores/channel.js"
import {openDialog,closeDialog} from "./../../action/dialog.js"

const Option = Select.Option;
const FormItem = Form.Item;

const {assign} = Object;

const columns = [{
  title: '关键字名',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  render(text,record){
    return (
      <div>
        <nobr>{text}</nobr>
      </div>
    )
  }
},{
  title: 'slug',
  dataIndex: 'slug',
  key: 'slug',
  width: 100,
  render(text,record){
    return (
      <div>
        <nobr>{text}</nobr>
      </div>
    )
  }
},{
	title: '链接类型',
	dataIndex: 'linkType',
  	key: 'linkType',
  	width: 200,
  	render(value,record){
  		return (
  			<div>{linkTypes[value]}</div>
  		)
  	}
},{
	title: '标签类型',
	dataIndex: 'tagType',
  	key: 'tagType',
  	width: 100,
  	render(value,record){
  		return (
  			<div>{tagTypes[value]}</div>
  		)
  	}
},{
  title: '操作',
  render(text, record,idx) {
    return (
      <div>
        <Button onClick={()=>{channelStore.dispatch(startEditKeyword(idx))}}>编辑</Button>
        <Button onClick={()=>{confirm("Are you sure delete?")&&channelStore.dispatch(doDeleteKeyword(idx))}}>删除</Button>
      </div>
    );
  }
}];

@connect((state)=>({keywords:state.editingChannel===null?[]:state.editingChannel.keywords}))
class ChannelKeywordsEdit extends Component {
	constructor(props){
		super(props);
	}

	render(){
		let dataSource = this.props.keywords.map((keyword,idx)=>{
			return assign({},keyword,{
				key:idx
			});
		});
		return (
			<div>
				<h3>编辑频道关键字</h3>
				<hr style={{marginTop:"10px",marginBottom:"10px"}} />
				<div>
					<Row style={{marginBottom:"10px"}}>
						<Col span="4">
							<Button type="primary" onClick={()=>{this.props.dispatch(openDialog("addDialog"))}}>添加</Button>
						</Col>
					</Row>
					<Table pagination={false} dataSource={dataSource} columns={columns} />
					<ChannelKeywordEditModal />
					<ChannelKeywordAddModal />
				</div>
			</div>
		)
	}

	componentDidMount(){
		this.props.dispatch(loadDetail(this.props.params.channelId));
	}
}

@connect((state)=>({dataForEditing:state.editingKeywordIndex === -1?null:state.editingChannel.keywords[state.editingKeywordIndex],visible:state.editingKeywordIndex!==-1}))
class ChannelKeywordEditModal extends Component{

	constructor(props){
		super(props);
		["onOK"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		const {dispatch} = this.props;
		return (
			<Modal title="编辑关键词"
				visible={this.props.visible}
				onOk={this.onOK}
				onCancel={()=>{dispatch(endEditKeyword())}}>
				<ChannelKeywordEditPanel data={this.props.dataForEditing} ref="editPanel" />
			</Modal>
		)
	}

	onOK(){
		const {dispatch} = this.props;
		let keyword = this.refs.editPanel.getFieldsValue();

		dispatch(doSaveKeyword(keyword)).then((flag)=>{
			if(flag){
				message.success("更新成功!");
				dispatch(endEditKeyword());
			}else{
				message.warn("更新失败!");
			}
		});
	}

}



@connect((state)=>({visible:state.dialog.addDialog}))
class ChannelKeywordAddModal extends Component{

	constructor(props){
		super(props);
		["onOK"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		const {dispatch} = this.props;
		return (
			<Modal title="添加关键词"
				visible={this.props.visible}
				onOk={this.onOK}
				onCancel={()=>{dispatch(closeDialog("addDialog"))}}>
				<ChannelKeywordEditPanel ref="editPanel" />
			</Modal>
		)
	}

	onOK(){
		const {dispatch} = this.props;
		this.refs.editPanel.validateFieldsAndScroll((errors, values) => {
			if(!!errors){
				return;
			}

			dispatch(doAddKeyword(values)).then((flag)=>{
				if(flag){
					message.success("更新成功!");
					dispatch(closeDialog("addDialog"));
				}else{
					message.warn("更新失败!");
				}
			});
		});
	}

}


@Form.create()
class ChannelKeywordEditPanel extends Component{

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

		const nameProps = getFieldProps('name', {
			rules: [
				{ required: true, message: '请输入关键词名' }
			]
		});

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
				<FormItem {...formItemLayout} label="关键词名:">
					<Input type="text" {...nameProps} disabled={false} placeholder="请输入关键词名" />
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
				<FormItem {...formItemLayout} label="标签类型:">
					<Select {...getFieldProps("tagType",{initialValue:0})} disabled={false} placeholder="请输入标签类型">
						{
							tagTypes.map((oneTagType,idx)=>{
								return (<option key={idx} value={idx}>{oneTagType}</option>)
							})
						}
					</Select>
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

ChannelKeywordEditPanel.defaultProps = {
	data:null
}

export default ChannelKeywordsEdit;
