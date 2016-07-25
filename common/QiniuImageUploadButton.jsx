import React,{Component} from "react"
import {connect} from "react-redux"
import { Modal, Button,Upload,Icon,message } from 'antd';
import {loadUploadTokenIfNeed,loadBaseUrlIfNeed} from "./../action/qiniu.js"


const getUpUrl = function(){
    if (window.location.protocol === 'https:') {
        return 'https://up.qbox.me';
    } 
    return 'http://upload.qiniu.com';
}

const fileUploadProps = {
	"action":getUpUrl(),
	"accept":"*.jpg,*.jpeg,*.gif,*.png",
	"multiple":false,
	listType:"picture"
}


@connect(state=>({uptoken:state.qiniu.qiniuUptoken,baseurl:state.qiniu.qiniuBaseUrl}))
class QiniuImageUploadButton extends Component{

	constructor(props){
		super(props);
		this.state = {
			modalVisible:false,
			uploadFileList:[],
		}

		this.onUploadButtonClickHandler = this.onUploadButtonClickHandler.bind(this);
		this.onUploadChangeHandler = this.onUploadChangeHandler.bind(this);
		this.onOkHandler = this.onOkHandler.bind(this);
	}

	render(){
		return (
			<div>
				<Button type="ghost" onClick={this.onUploadButtonClickHandler}>Upload Image</Button>
				<Modal title="Upload Image" visible={this.state.modalVisible} 
					onOk={this.onOkHandler}
					onCancel={()=>{this.setState({modalVisible:false,uploadFileList:[]});}}>
		          <p>Please choose a image file</p>
		          <Upload {...fileUploadProps} showUploadList={false} onChange={this.onUploadChangeHandler} data={{token:this.props.uptoken}}>
		          	<Button type="ghost">
				      <Icon type="upload" /> Click to choose file
				    </Button>
		          </Upload>
		        </Modal>
			</div>
		)
	}

	onUploadButtonClickHandler(){
		let {dispatch} = this.props;
		Promise.all([dispatch(loadUploadTokenIfNeed()),dispatch(loadBaseUrlIfNeed())]).then(()=>{
			this.setState({modalVisible:true,uploadFileList:[]});
		})
	}

	onUploadChangeHandler(info){
		if (info.file.status === 'done') {
			message.success(`${info.file.name} Upload Success`);
			this.setState({uploadFileList:info.fileList});
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} Upload Error`);
		}
	}

	onOkHandler(){
		this.setState({modalVisible:false,uploadFileList:[]});
		if(typeof this.state.uploadFileList[0] !== "undefined"){
			if(typeof this.props.onUpload !== "undefined"){
				this.props.onUpload(`${this.getQiniuDomain()}${this.state.uploadFileList[0].response.hash}`);
			}
		}
	}

	getQiniuDomain(){
		if(this.props.isAppendQiniuDomain){
			return this.props.baseurl;
		}
		return "";
	}
}

QiniuImageUploadButton.defaultProps = {
	isAppendQiniuDomain:false,
}

export default QiniuImageUploadButton