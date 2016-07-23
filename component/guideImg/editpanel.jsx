import React,{Component} from "react"
import { Form, Input,Row,Col} from 'antd';
import {QiniuImageUploadButton,Image} from "./../../common";
import types,{getTypeKey, getTypeValue, getTypePath} from "./types.js";
import CmsUrl from '../../common/cmsUrl.js'

const FormItem = Form.Item;
const {assign} = Object;


@Form.create()
class EditPanel extends Component{
	constructor(props){
		super(props);
		this.state = {data:null}

		var _this = this;
		this.changeNameFn = (eve)=>{
			_this.onChangeName.call(_this,eve);
		}
	}

	render(){
	    const { getFieldProps } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    let keyDisabled = true;
	    let nameDisabled = this.state.data === null ? false : true;


		return (
			<Form horizontal>
				<FormItem {...formItemLayout} label="Key:">
					<Input type="text" {...getFieldProps("key")} disabled={keyDisabled} placeholder="show key" />
				</FormItem>
				<FormItem {...formItemLayout} label="Name:">
					<Input type="text" {...getFieldProps("name")} onChange={this.changeNameFn} disabled={nameDisabled} placeholder="Please input name: ?img={name} " />
				</FormItem>
				<FormItem {...formItemLayout} label="LinkAddress:">
					<Input type="text" {...getFieldProps("linkAddress")} disabled={false} placeholder="Please input LinkAddress " />
				</FormItem>
				<FormItem {...formItemLayout} label="Picture:">
					<ImageField {...getFieldProps("picture")} />
				</FormItem>
				<Row>
					<Col span="16">
						<div style={{height:"20px"}}></div>
					</Col>
		    </Row>
		    {this.renderPreviewUrl()}
			</Form>
		)
	}

	renderPreviewUrl(){
		const {countryCode, typeId} = this.props;
		var baseUrl = CmsUrl.getPreviewUrl(countryCode);
		var testUrl = `${baseUrl}` + getTypePath(typeId);

		const { getFieldValue } = this.props.form;

		let name = getFieldValue('name');
		if(name === undefined || name === ""){
			return null;
		}

		name = name.toLowerCase();
		return (<a target="_blank" href={`${testUrl}?img=${name}`}>{`TEST URL: ${testUrl}?img=${name}`}</a>)

	}


	onChangeName(eve){
		const { typeId } = this.props;
		const { setFieldsValue } = this.props.form;

		let typeKey = getTypeKey(typeId) + eve.target.value;
		typeKey = typeKey.toLowerCase();

		setFieldsValue({
			key: typeKey,
			name:eve.target.value
		})

	}

	componentDidMount(){
		let data = typeof this.props.data === "undefined" ? null : assign(this.props.data,{},{});
		this.setState({data:data},()=>{
			if(data !== null){
				this.props.form.setFieldsValue(this.props.data);
			}
		});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== this.props.data){
			let data = typeof nextProps.data === "undefined" ? null : assign(nextProps.data,{},{});
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

export default EditPanel;

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
			<Row className="ant-form-item">
				<Col span="6" style={{textAlign:"right"}}>
					{this.props.label}:
				</Col>
				<Col span="6">
					{picture}
				</Col>
				<Col span="10" offfset="1">
					<QiniuImageUploadButton onUpload={(hash)=>{this.setState({picture:hash},()=>{this.props.onChange(hash)})}}  />
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

}
