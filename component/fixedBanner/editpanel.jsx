import React,{Component} from "react"
import { Form, Input,Row,Col} from 'antd';
import {ImageField} from "./../../common";
const FormItem = Form.Item;
const {assign} = Object;


@Form.create()
class EditPanel extends Component{
	constructor(props){
		super(props);
		this.state = {data:null}
	}

	render(){
	    const { getFieldProps } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    let keyDisabled = this.state.data  === null? false:true;

		return (
			<Form horizontal>
				<FormItem {...formItemLayout} label="Key:">
					<Input type="text" {...getFieldProps("key")} disabled={keyDisabled} placeholder="Please input SkuId " />
				</FormItem>
				<FormItem {...formItemLayout} label="Name:">
					<Input type="text" {...getFieldProps("name")} disabled={false} placeholder="Please input Name " />
				</FormItem>
				<FormItem {...formItemLayout} label="LinkAddress:">
					<Input type="text" {...getFieldProps("linkAddress")} disabled={false} placeholder="Please input Weight " />
				</FormItem>
				<FormItem {...formItemLayout} label="Picture:">
					<ImageField {...getFieldProps("picture")}  />
				</FormItem>
				<Row>
					<Col span="16">
						<div style={{height:"20px"}}></div>
					</Col>
		    	</Row>
			</Form>
		)
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

