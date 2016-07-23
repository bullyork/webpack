import React,{Component} from "react"
import Image from "./Image.jsx"
import QiniuImageUploadButton from "./QiniuImageUploadButton.jsx"
import {Row,Col,Icon,Button} from "antd"
import {moveArrayElementPosition} from "./../util/array.js"

class ImageUploadList extends Component{

	constructor(props){
		super(props);
		this.state = {
			data:[]
		}
	}

	render(){
		let images = this.state.data.map((item)=>{
			return (
				<Col span="4" style={{marginTop:"10px"}} key={item}>
					<Image style={{width:"100%"}} src={item} />
					<Row type="flex" justify="center" align="middle">
						<Button type="ghost" onClick={this._onMoveLeftHandler.bind(this,item)}><Icon type="arrow-left" /></Button>
						<Button type="ghost" onClick={this._onRemoveHandler.bind(this,item)}><Icon type="cross" /></Button>
						<Button type="ghost" onClick={this._onMoveRightHandler.bind(this,item)}><Icon type="arrow-right" /></Button>
					</Row>
				</Col>
			)
		})
		return (
			<div>
				<div>
					<Row type="flex" justify="start" align="middle">
						{images}
					</Row>
				</div>
				<QiniuImageUploadButton onUpload={this._onUploadHandler.bind(this)} />
			</div>
		)		
	}

	_onUploadHandler(hash){
		if(this.state.data.indexOf(hash) === -1){
			this.setState({data:[...this.state.data,hash]},this.forceChange);
		}
	}

	_onRemoveHandler(hash){
		this.setState({data:this.state.data.filter(item=>item !== hash)},this.forceChange);
	}

	_onMoveLeftHandler(hash){
		let index = this.state.data.findIndex((image)=>{return image === hash});
		let toIndex = index - 1;
		
		this.setState({data:moveArrayElementPosition(this.state.data,index,toIndex)},this.forceChange);
	}

	_onMoveRightHandler(hash){

		let index = this.state.data.findIndex((image)=>{return image === hash});
		let toIndex = index + 1;

		this.setState({data:moveArrayElementPosition(this.state.data,index,toIndex)},this.forceChange);
	}

	forceChange(){
		if(typeof this.props.onChange !== "undefined"){
			this.props.onChange(this.state.data);
		}
	}

	componentDidMount(){
		if(this.props.data !== null && typeof this.props.data !== "undefined"){
			this.setState({data:[...this.props.data]});
		}
	}

	componentReceiveProps(nextProps){
		if(nextProps.data !== this.props.data && nextProps.data !== null && typeof nextProps.data !== "undefined"){
			this.setState({data:[...nextProps.data]});
		}
	}
}

export default ImageUploadList