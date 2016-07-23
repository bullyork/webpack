import React,{Component} from "react"
import { Form, Input, Button, Checkbox, DatePicker, Radio, Row, Col, Tooltip, Icon,Switch,InputNumber,Select} from 'antd';
import {QiniuImageUploadButton,Image,StringStringMapInput,StringArrayInput,ImageUploadList} from "../../common";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {assign} = Object;

const convertOriginDataToInputData = (data)=>{
	return assign({},data,{
		syncDate:new Date(data.syncDate),
		fetchDate:new Date(data.fetchDate),
	});
}

const convertInputDataToOriginData = (data)=>{
	return assign({},data,{
		weight:parseFloat(data.weight),
		price:parseFloat(data.price),
		internalShipmentFee:parseFloat(data.internalShipmentFee),
		internalShippingFeeGZ:parseFloat(data.internalShippingFeeGZ),
		internalShippingFeeSH:parseFloat(data.internalShippingFeeSH),
		syncDate:data.syncDate.getTime(),
		fetchDate:data.fetchDate.getTime(),
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
				<FormItem {...formItemLayout} label="Name:">
					<Input type="text" {...getFieldProps("name")} disabled={false} placeholder="Please input Name " />
				</FormItem>
				<FormItem {...formItemLayout} label="RefId:">
					<Input type="text" {...getFieldProps("refId")} disabled={true} placeholder="Please input RefId " />
				</FormItem>
				<FormItem {...formItemLayout} label="Url:">
					<Input type="text" {...getFieldProps("url")} disabled={false} placeholder="Please input Url " />
				</FormItem>
				<FormItem {...formItemLayout} label="EnName:">
					<Input type="text" {...getFieldProps("enName")} disabled={false} placeholder="Please input EnName " />
				</FormItem>
				<FormItem {...formItemLayout} label="VendorName:">
					<Input type="text" {...getFieldProps("vendorName")} disabled={false} placeholder="Please input VendorName " />
				</FormItem>
				<FormItem {...formItemLayout} label="BrandName:">
					<Input type="text" {...getFieldProps("brandName")} disabled={false} placeholder="Please input BrandName " />
				</FormItem>
				<FormItem {...formItemLayout} label="Cid:">
					<Input type="text" {...getFieldProps("cid")} disabled={false} placeholder="Please input Cid " />
				</FormItem>
				<FormItem {...formItemLayout} label="Weight:">
					<Input type="text" {...getFieldProps("weight")} disabled={false} placeholder="Please input Weight " />
				</FormItem>
				<FormItem {...formItemLayout} label="Price:">
					<Input type="text" {...getFieldProps("price")} disabled={false} placeholder="Please input Price " />
				</FormItem>
				<Row className="ant-form-item">
					<Col span="6" style={{textAlign:"right"}}>
						ProductImage:
					</Col>
					<Col span="6">
						<Image src={this.state.data.productImage} style={{width:"100%"}} />
					</Col>
					<Col span="10" offfset="1">
						<QiniuImageUploadButton onUpload={(hash)=>{this.setState({data:assign({},this.state.data,{productImage:hash})})}}  />
					</Col>
				</Row>
				<FormItem {...formItemLayout} label="BuyCount:">
					<InputNumber {...getFieldProps("buyCount")} disabled={false} />
				</FormItem>
				<FormItem {...formItemLayout} label="InternalShipmentFee:">
					<Input type="text" {...getFieldProps("internalShipmentFee")} disabled={false} placeholder="Please input InternalShipmentFee " />
				</FormItem>
				<FormItem {...formItemLayout} label="OriginCode:">
					<Select optionFilterProp="children" notFoundContent="Not Found" searchPlaceholder="Keywords" {...getFieldProps("originCode")} >
						{this.renderOriginCodeOptions()}
					</Select>
				</FormItem>
				<FormItem {...formItemLayout} label="StateCode:">
					<Input type="text" {...getFieldProps("stateCode")} disabled={false} placeholder="Please input StateCode " />
				</FormItem>
				<Row className="ant-form-item">
					<Col span="6" style={{textAlign:"right"}}>
						SellType:
					</Col>
					<Col span="18">
						<StringArrayInput value={this.state.data.sellType} onChange={(data)=>{this.setState({data:assign({},this.state.data,{sellType:data})})}} />
					</Col>
				</Row>
				<FormItem {...formItemLayout} label="IsPrime:">
					<Switch defaultChecked={this.props.data.isPrime } {...getFieldProps("isPrime")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="IsEzbuy:">
					<Switch defaultChecked={this.props.data.isEzbuy } {...getFieldProps("isEzbuy")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="IsTranslated:">
					<Switch defaultChecked={this.props.data.isTranslated } {...getFieldProps("isTranslated")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="IsOnSale:">
					<Switch defaultChecked={this.props.data.isOnSale } {...getFieldProps("isOnSale")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="IsSeller:">
					<Switch defaultChecked={this.props.data.isSeller } {...getFieldProps("isSeller")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="IsBoost:">
					<Switch defaultChecked={this.props.data.isBoost } {...getFieldProps("isBoost")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="IsManuallyFetchFee:">
					<Switch defaultChecked={this.props.data.isManuallyFetchFee } {...getFieldProps("isManuallyFetchFee")}  />
				</FormItem>
				<FormItem {...formItemLayout} label="InternalShippingFeeGZ:">
					<Input type="text" {...getFieldProps("internalShippingFeeGZ")} disabled={false} placeholder="Please input InternalShippingFeeGZ " />
				</FormItem>
				<FormItem {...formItemLayout} label="InternalShippingFeeSH:">
					<Input type="text" {...getFieldProps("internalShippingFeeSH")} disabled={false} placeholder="Please input InternalShippingFeeSH " />
				</FormItem>
				<FormItem {...formItemLayout} label="SyncDate:">
					<DatePicker showTime={true} format="yyyy-MM-dd HH:mm:ss" {...getFieldProps("syncDate")} style={{ width: 160 }} />
				</FormItem>
				<FormItem {...formItemLayout} label="FetchDate:">
					<DatePicker showTime={true} format="yyyy-MM-dd HH:mm:ss" {...getFieldProps("fetchDate")} style={{ width: 160 }} />
				</FormItem>
				<FormItem {...formItemLayout} label="SellerId:">
					<Input type="text" {...getFieldProps("sellerId")} disabled={false} placeholder="Please input SellerId " />
				</FormItem>
				<FormItem {...formItemLayout} label="ShipmentInfo:">
					<InputNumber {...getFieldProps("shipmentInfo")} disabled={false} />
				</FormItem>
				<FormItem {...formItemLayout} label="PrimeShippingType:">
					<Select optionFilterProp="children" notFoundContent="Not Found" searchPlaceholder="Keywords" {...getFieldProps("primeShippingType")} >
						{this.renderPrimeShippingTypeOptions()}
					</Select>
				</FormItem>
				<Row className="ant-form-item">
					<Col span="6" style={{textAlign:"right"}}>
						DescriptionImages:
					</Col>
					<Col span="14">
						<ImageUploadList data={this.state.data.descriptionImages} onChange={(data)=>{this.setState({data:assign({},this.state.data,{descriptionImages:data})})}} />
					</Col>
				</Row>
				<FormItem {...formItemLayout} label="DescriptionText:">
					<Input type="textarea" {...getFieldProps("descriptionText")} disabled={false} placeholder="Please input DescriptionText " />
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
				productImage:this.props.data.productImage,
				sellType:this.props.data.sellType,
				descriptionImages:this.props.data.descriptionImages,
			})})
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== null && this.props.data !== nextProps.data && typeof nextProps.data !== "undefined"){
			this.props.form.setFieldsValue(convertOriginDataToInputData(nextProps.data));
			this.setState({data:assign({},this.state.data,{
				productImage:nextProps.data.productImage,
				sellType:nextProps.data.sellType,
				descriptionImages:nextProps.data.descriptionImages,
			})});
		}
	}

	renderOriginCodeOptions(){
		return this.props.originCodeOptions.map((item)=>{
			return (
				<option value={item.value} key={item.value}>{item.name}</option>
			)
		})
	}

	renderPrimeShippingTypeOptions(){
		return this.props.primeShippingTypeOptions.map((item)=>{
			return (
				<option value={item.value} key={item.value}>{item.name}</option>
			)
		})
	}

}

export default EditPanel;

EditPanel.propTypes = {
	originCode:React.PropTypes.array,
	primeShippingType:React.PropTypes.array,
	onSave:React.PropTypes.func,
}