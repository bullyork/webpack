import React,{Component} from "react";
import { Form, Input,Row,Col,Select,Button,Switch,InputNumber,DatePicker} from 'antd';
import {ImageField} from "./../../common";
const FormItem = Form.Item;
const Option = Select.Option;
const {assign} = Object;

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};


@Form.create()
class ProductEditPanel extends Component{
	render(){
		const { getFieldProps } = this.props.form;
	    
		return (
			<Form horizontal form={this.props.form}>
				<FormItem {...formItemLayout} label="productUrl:">
					<Input type="text" {...getFieldProps("productUrl",{initialValue:""})} disabled={true} />
				</FormItem>
				<FormItem {...formItemLayout} label="productPrice:">
					<Input type="text" {...getFieldProps("productPrice",{rules:[{ required: true, message: '请设置价格',type:"string"},{ validator:this.checkProductPrice}]})} disabled={false} />
				</FormItem>
				<FormItem {...formItemLayout} label="productStock:">
					<InputNumber type="text" {...getFieldProps("productStock",{rules:[{ required: true, message: '请设置库存数量',type:"number"}]})} disabled={false} />
				</FormItem>
				<FormItem {...formItemLayout} label="productImage:">
					<Input type="text" {...getFieldProps("productImage",{initialValue:""})} disabled={false} />
				</FormItem>
				<FormItem {...formItemLayout} label="productImage:">
					<ImageField {...getFieldProps("productImage",{initialValue:""})} isAppendQiniuDomain={true} />
				</FormItem>
				<FormItem {...formItemLayout} label="rebateProductUrl:">
					<Input type="text" {...getFieldProps("rebateProductUrl",{initialValue:""})} disabled={false} />
				</FormItem>
			</Form>
		)
	}

	checkProductPrice(rule, value, callback){
		let resultAfterParse = parseFloat(value);
		if (isNaN(resultAfterParse) || resultAfterParse <= 0 || !/^[\.\d]+$/.test(value)) {
			callback(new Error('格式只能是大于零的数'));
		} else {
			callback();
		}
	}

	componentDidMount(){
		if(this.props.data !== null){
			this.props.form.setFieldsValue(this.processPropsData(this.props.data));
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== this.props.data){
			if(nextProps.data === null){
				this.props.form.resetFields();
			}else{
				this.props.form.setFieldsValue(this.processPropsData(nextProps.data));
			}
		}
	}

	processPropsData(data){
		return Object.assign({},data,{
			productPrice:`${data.productPrice}`
		})
	}

}

export default ProductEditPanel;