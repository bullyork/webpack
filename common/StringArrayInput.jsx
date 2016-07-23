import React,{Component} from "react"
import {Row,Col,Button,Input,Icon} from "antd"
import {moveArrayElementPosition} from "./../util/array.js"

class StringArrayInput extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			data:[],
			valueForAdd:""
		}
	}

	render(){
		let alreadyExistsItems = this.state.data.map((item)=>{
			return (
				<Row key={item} type="flex" justify="start" align="middle">
					<Col span="12">{item}</Col>
					<Col span="8">
						<Button onClick={this._onRemoveHandler.bind(this,item)}><Icon type="cross" /></Button>
						<Button onClick={this._onUpHandler.bind(this,item)}><Icon type="arrow-up" /></Button>
						<Button onClick={this._onDownHandler.bind(this,item)}><Icon type="arrow-down" /></Button>
					</Col>
				</Row>
			)
		})
		return(
			<div>
				{alreadyExistsItems}
				<Row type="flex" justify="start" align="middle">
					<Col span="12"><Input type="text" value={this.state.valueForAdd} onChange={this._onChangeHandler.bind(this)} /></Col>
					<Col span="8">
						<Button onClick={this._onAddHandler.bind(this)}><Icon type="plus" /></Button>
					</Col>
				</Row>
			</div>
		)
	}

	_onChangeHandler(e){
		let value = e.currentTarget.value;
		this.setState({valueForAdd:value});
	}

	_onRemoveHandler(key){
		this.setState({data:this.state.data.filter(item=>key!==item)},this.forceChange);
	}

	_onAddHandler(){
		let value = this.state.valueForAdd;
		if(typeof value === "string" && this.props.isTrimInput){
			value = value.trim();
		}
		if(this.state.data.indexOf(value) === -1){
			this.setState({data:[...this.state.data,value],valueForAdd:""},this.forceChange);
		}
	}

	_onUpHandler(key){
		let idx = this.state.data.findIndex(item=>key===item);
		if(idx !== 0){
			this.setState({data:moveArrayElementPosition(this.state.data,idx,idx-1)},this.forceChange);
		}
	}

	_onDownHandler(key){
		let idx = this.state.data.findIndex(item=>key===item);
		if(idx !== this.state.data.length - 1){
			this.setState({data:moveArrayElementPosition(this.state.data,idx,idx+1)},this.forceChange);
		}
	}

	forceChange(){
		if(typeof this.props.onChange === "function"){;
			this.props.onChange(this.state.data);
		}
	}

	componentDidMount(){
		if(this.props.value !== null && typeof this.props.value !== "undefined"){
			this.setState({data:[...this.props.value]});
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.value!==this.props.value && nextProps.value !== null && typeof nextProps.value !== "undefined"){
			this.setState({data:[...nextProps.value]});
		}
	}

	getData(){
		return this.state.data;
	}
}

StringArrayInput.defaultProps = {
	isTrimInput:true
}

export default StringArrayInput