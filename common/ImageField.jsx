import React,{Component} from "react"
import {QiniuImageUploadButton,Image} from "./index.js"
import {Row,Col} from "antd"

class ImageField extends Component{

	constructor(props){
		super(props);
		this.state = {
			picture:""
		}
	}

	render(){
		let picture = this.state.picture === ""?null:<Image src={this.state.picture} style={{width:"100%"}} />; 

		return (
			<Row>
				<Col span="6">
					{picture}
				</Col>
				<Col span="10" offfset="1">
					<QiniuImageUploadButton isAppendQiniuDomain={this.props.isAppendQiniuDomain} onUpload={(hash)=>{this.setState({picture:hash},()=>{this.props.onChange(hash)})}}  />
				</Col>
			</Row>
		)
	}

	componentDidMount(){
		this.setState({picture:this.convertValue(this.props)});
	}

	componentWillReceiveProps(nextProps){
		this.setState({picture:this.convertValue(nextProps)});
	}

	convertValue(props){
		if(typeof props.value !== "undefined" && props.value !== null){
			return props.value;
		}
		return "";
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps !== this.props||nextState.picture !== this.state.picture){
			return true;
		}
		return false;
	}

}

ImageField.defaultProps = {
	isAppendQiniuDomain:false
}

export default ImageField;