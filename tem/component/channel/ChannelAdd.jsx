import React,{Component} from "react"
import ChannelBasicEditPanel from "./ChannelBasicEditPanel.jsx"
import {connect} from "react-redux"
import {doAdd} from "./actions/channel.js"
import { message } from 'antd'

@connect((state)=>({countryCode:state.country}))
class ChannelAdd extends Component {
	constructor(props){
		super(props);

		["onSave"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		return (
			<div>
				<h3>添加频道</h3>
				<hr style={{marginTop:"10px",marginBottom:"10px"}} />
				<ChannelBasicEditPanel onSave={this.onSave} isChannelHasDetail={this.props.params.channelId === "0"} data={null}  ref="addPanel" />
			</div>
		)
	}

	onSave(fields){
		let mergeObject = {
			campaigns:[],
			isDisplayFront:false,
			keywords:[],
			sourceCategoryIds:[],
			parentId:this.props.params.channelId,
			countryCode:this.props.countryCode,
		};
		if(typeof fields.productCount === "undefined"){
			mergeObject.productCount = 0;
			mergeObject.banner = "";
		}
		let channel = Object.assign({},fields,mergeObject);
		this.props.dispatch(doAdd(channel)).then((flag)=>{
			if(flag){
				message.success("添加成功！");
				location.hash = `/${this.props.params.channelId}`;
			}else{
				message.warn("添加失败！");
			}
		})
	}
}

export default ChannelAdd;