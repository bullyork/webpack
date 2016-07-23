import React,{Component} from "react"
import ChannelBasicEditPanel from "./ChannelBasicEditPanel.jsx"
import {connect} from "react-redux"
import {doSave,loadDetail} from "./actions/channel.js"
import { message } from 'antd'
import { push } from 'react-router-redux'

@connect((state)=>({editingChannel:state.editingChannel}))
class ChannelEditBasic extends Component {
	constructor(props){
		super(props);
		["onSave"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this)
		})
	}

	render(){
		let isChannelHasDetail = this.props.editingChannel === null?false:this.props.editingChannel.parentId === "0";
		return (
			<div>
				<h3>编辑频道</h3>
				<hr style={{marginTop:"10px",marginBottom:"10px"}} />
				<ChannelBasicEditPanel onSave={this.onSave} data={this.props.editingChannel} isChannelHasDetail={isChannelHasDetail}  ref="editPanel" />
			</div>
		)
	}

	componentDidMount(){
		this.props.dispatch(loadDetail(this.props.params.channelId));
	}

	onSave(fields){
		let channel = Object.assign({},this.props.editingChannel,fields);
		const {dispatch} = this.props;

		dispatch(doSave(channel)).then((flag)=>{
			if(flag){
				message.success("保存成功！");
				location.hash = `/${this.props.editingChannel.parentId}`;
			}else{
				message.warn("保存失败！");
			}
		})
	}
}

export default ChannelEditBasic;