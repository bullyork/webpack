import React,{Component} from 'react'
import { connect } from 'react-redux'
import {searchType} from '../../../constant'
import {
  Row,
  Col,
  Checkbox,
  Button,
  Table,
  Input,
  Form,
  Select,
  Option
} from 'antd'
import {
  getCurrentTab,
  AdminGiveVoucher,
  changeCatalogcode
} from '../../../action/voucher'
const CheckboxGroup = Checkbox.Group


const FormItem = Form.Item;

@connect(state => ({
  catalogCode: state.catalogCode
}))
class SendVoucher extends Component{
  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(getCurrentTab('sendVoucher'))
  }
  render(){
    const {catalogCode, dispatch} = this.props;

    return (
      <section className="send-voucher">
        <h2 className="text-center">送券到用户</h2>
        选择国家：
        <Select defaultValue={catalogCode}  style={{width:100}} onChange={this.changeCatalogcodeFn.bind(this)} >
          <Option key={0} value={'SG'}>SG</Option>
          <Option key={1} value={'MY'}>MY</Option>
          <Option key={2} value={'AU'}>AU</Option>
          <Option key={3} value={'TH'}>TH</Option>
          <Option key={4} value={'ID'}>ID</Option>
        </Select>
        <InputForm ref="Info" />
        <Button type='primary'  onClick={()=>{
          var catalogCode = this.props.catalogCode;
          const data = this.refs.Info.getFieldsValue();
          let {nickname, voucherTypeId} = data;
          voucherTypeId = parseInt(voucherTypeId);



          if(nickname == ''){
            alert('请输入昵称！');
            return false;
          }

          if(voucherTypeId ==''){
            alert('请输入券ID');
            return false;
          }else if(isNaN(voucherTypeId)){
            alert("券ID为数字");
            return;
          }

          dispatch(AdminGiveVoucher(nickname, catalogCode, voucherTypeId, ()=>{
            // 成功
          }));

          return false;
        }}>开始送券</Button>
      </section>
    )
  }

  changeCatalogcodeFn(code){
    this.props.dispatch(changeCatalogcode(code));
  }
}

@Form.create()
class InputForm extends Component{
  render(){
    const { getFieldProps } = this.props.form;

    return (
      <Form>
        <Row>
          <Col span="6">
            <FormItem
              label="用户昵称:">
              <Input type="text" {...getFieldProps("nickname")} placeholder="" />
            </FormItem>
            <FormItem
              label="券ID:">
              <Input type="text" {...getFieldProps("voucherTypeId")} placeholder="" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default SendVoucher