import React,{Component} from "react"
import {Row,Col,Input,Button,Icon} from "antd"


class StringStringMapInput extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:{},
			keyForAdd:"",
			valueForAdd:"",
		}
	}

	render(){
		let alreadyValues = Object.keys(this.state.data).map((key)=>{
			return (
				<Row key={key} type="flex" justify="start" align="middle">
					<Col span="6">{key}</Col>
					<Col span="6"><Input type="text" value={this.state.data[key]} onChange={this._onChangeHandler.bind(this,`data.${key}`)} /></Col>
					<Col span="4">
						<Button onClick={this._onRemoveKeyHandler.bind(this,key)}><Icon type="cross" /></Button>
					</Col>
				</Row>
			)
		})
		return (
			<div>
				{alreadyValues}
				<Row type="flex" justify="start" align="middle">
					<Col span="6"><Input type="text" value={this.state.keyForAdd} onChange={this._onChangeHandler.bind(this,"keyForAdd")} /></Col>
					<Col span="6"><Input type="text" value={this.state.valueForAdd} onChange={this._onChangeHandler.bind(this,"valueForAdd")} /></Col>
					<Col span="4">
						<Button onClick={this._onAddHandler.bind(this)}><Icon type="plus" /></Button>
					</Col>
				</Row>
			</div>
		);
	}

	componentDidMount(){
		if(this.props.data !== null && typeof this.props.data !== "undefined" ){
			this.setState({data:this.props.data});
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== null && nextProps.data !== this.props.data && typeof nextProps.data !== "undefined"){
			this.setState({data:nextProps.data});
		}
	}

	_onChangeHandler(key,e){
		let value = e.currentTarget.value;
		if(key.indexOf("data.") > -1){
			this.setState({data:Object.assign({},this.state.data,{
				[key.replace("data.")]:value
			})},this.forceChange)
		}else{
			this.setState({[key]:value});	
		}
	}

	_onAddHandler(){
		if(!/^\s*$/.test(this.state.keyForAdd) && !/^\s*$/.test(this.state.valueForAdd)){
			this.setState({keyForAdd:"",valueForAdd:"",data:Object.assign({},this.state.data,{
				[this.state.keyForAdd]:this.state.valueForAdd
			})},this.forceChange);
		}
	}

	_onRemoveKeyHandler(keyForRemove){
		let newData = {};
		Object.keys(this.state.data).filter(key=>keyForRemove !== key).forEach((key)=>{
			newData[key] = this.state.data[key];
		})
		this.setState({data:newData},this.forceChange)
	}

	forceChange(){
		if(this.props.onChange){
			this.props.onChange(this.state.data);
		}
	}
}

export default StringStringMapInput