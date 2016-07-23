import React,{Component} from "react"
import { Form, Input, Button, Checkbox, DatePicker, Radio, Row, Col, Tooltip, Icon,Switch,InputNumber,Select} from 'antd';
import {QiniuImageUploadButton,Image,StringStringMapInput,StringArrayInput,ImageUploadList} from "../../common";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {assign} = Object;

const convertOriginDataToInputData = (data)=>{
	return assign({},data,{
	});
}

const convertInputDataToOriginData = (data)=>{
	return assign({},data,{
		weight:parseFloat(data.weight),
		price:parseFloat(data.price),
	});
}


@Form.create()
class EditPanel extends Component{
	constructor(props){
		super(props);
		this.state = {data:{}};
	}

	render(){
		if(this.props.data === null || typeof this.props.data === "undefined"){
			return null;
		}

	    const { getFieldProps } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };

		return (
			<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
				<FormItem {...formItemLayout} label="SkuId:">
					<Input type="text" {...getFieldProps("skuId")} disabled={true} placeholder="Please input SkuId " />
				</FormItem>
				<FormItem {...formItemLayout} label="Name:">
					<Input type="text" {...getFieldProps("name")} disabled={false} placeholder="Please input Name " />
				</FormItem>
				<Row className="ant-form-item">
					<Col span="6" style={{textAlign:"right"}}>
						Images:
					</Col>
					<Col span="14">
						<ImageUploadList data={this.state.data.images} onChange={(data)=>{this.setState({data:assign({},this.state.data,{images:data})})}} />
					</Col>
				</Row>
				<FormItem {...formItemLayout} label="IsOnSale:">
					<Switch defaultChecked={this.props.data.isOnSale } {...getFieldProps("isOnSale")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="Weight:">
					<Input type="text" {...getFieldProps("weight")} disabled={false} placeholder="Please input Weight " />
				</FormItem>
				<FormItem {...formItemLayout} label="Price:">
					<Input type="text" {...getFieldProps("price")} disabled={false} placeholder="Please input Price " />
				</FormItem>
				<FormItem {...formItemLayout} label="ShipmentInfo:">
					<InputNumber {...getFieldProps("shipmentInfo")} disabled={false} />
				</FormItem>
				<Row className="ant-form-item">
					<Col span="6" style={{textAlign:"right"}}>
						Attributes:
					</Col>
					<Col span="18">
						<StringStringMapInput data={this.state.data.attributes} onChange={(data)=>{this.setState({data:assign({},this.state.data,{attributes:data})})}} />
					</Col>
				</Row>
				<FormItem {...formItemLayout} label="Quantity:">
					<InputNumber {...getFieldProps("quantity")} disabled={false} />
				</FormItem>
		        <Row>
					<Col span="16" offset="6">
						<Button type="ghost" onClick={this.props.onBack}>Back</Button>
						<Button type="primary" htmlType="submit">Save</Button>
					</Col>
				</Row>
				<Row>
					<Col span="16">
						<div style={{height:"20px"}}></div>
					</Col>
		        </Row>
			</Form>
		)
	}

	handleSubmit(e){
    	e.preventDefault();
    	if(typeof this.props.onSave !== "undefined"){
    		let dataMixinStateData = assign({},this.props.form.getFieldsValue(),this.state.data);
    		this.props.onSave(convertInputDataToOriginData(dataMixinStateData));
    	}
	}

	componentDidMount(){
		if(this.props.data !== null && typeof this.props.data !== "undefined"){
			this.props.form.setFieldsValue(convertOriginDataToInputData(this.props.data));
			this.setState({data:assign({},this.state.data,{
				images:this.props.data.images,
				attributes:this.props.data.attributes,
			})})
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== null && this.props.data !== nextProps.data && typeof nextProps.data !== "undefined"){
			this.props.form.setFieldsValue(convertOriginDataToInputData(nextProps.data));
			this.setState({data:assign({},this.state.data,{
				images:nextProps.data.images,
				attributes:nextProps.data.attributes,
			})});
		}
	}

}

export default EditPanel;

EditPanel.propTypes = {
	onSave:React.PropTypes.func,
}