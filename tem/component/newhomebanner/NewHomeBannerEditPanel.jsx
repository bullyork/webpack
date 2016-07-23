import React,{Component} from "react"
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
class NewHomeBannerEditPanel extends Component{
	render(){
		const { getFieldProps } = this.props.form;
	    
		return (
			<Form horizontal form={this.props.form}>
				{
					this.props.data !== null?(
						<FormItem {...formItemLayout} label="Id:">
							<Input type="text" {...getFieldProps("id")} disabled={true} placeholder="请输入Id信息 " />
						</FormItem>
					):null
				}
				<FormItem {...formItemLayout} label="Banner名:">
					<Input type="text" {...getFieldProps("name",{initialValue:""})} disabled={false} />
				</FormItem>
				<FormItem {...formItemLayout} label="Banner图片:">
					<ImageField {...getFieldProps("picture", {rules:[{ required: true, message: '请输入图片信息' },{initialValue:""}]})} width="78" />
				</FormItem>
				<FormItem {...formItemLayout} label="链接地址:">
					<Input type="text" {...getFieldProps("linkAddress",{initialValue:""})} disabled={false} />
				</FormItem>
				{this.renderStartTimePicker()}
				{this.renderEndTimePicker()}
			</Form>
		)
	}

	renderStartTimePicker(){
		if(!this.props.isHideTime){
			const { getFieldProps } = this.props.form;
			
			return (
				<FormItem {...formItemLayout} label="开始时间:">
					<DatePicker showTime={true} {...getFieldProps("startAt",{rules:[{ required: true, message: '请设置开始时间',type:"date"}],initialValue:new Date()})} />
				</FormItem>
			)
		}
		return null;
	}

	renderEndTimePicker(){
		if(!this.props.isHideTime){
			const { getFieldProps } = this.props.form;
			
			return (
				<FormItem {...formItemLayout} label="结束时间:">
					<DatePicker showTime={true} {...getFieldProps("endAt",{rules:[{ required: true, message: '请设置结束时间',type:"date"}],initialValue:new Date()})} />
				</FormItem>
			)
		}
		return null;
	}

	componentDidMount(){
		if(this.props.data !== null){
			this.props.form.setFieldsValue(this.props.data);
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== this.props.data){
			if(nextProps.data === null){
				this.props.form.resetFields();
			}else{
				this.props.form.setFieldsValue(nextProps.data);
			}
		}
	}
}

NewHomeBannerEditPanel.defaultProps = {
	data:null,
}

export default NewHomeBannerEditPanel;