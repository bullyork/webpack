import React,{Component} from 'react'
import { connect } from 'react-redux'
import { redirect } from '../../../util/history'
import {
  getCurrentTab,
  addUser
} from '../../../action/primeDiscount'
import { success,warn } from '../../../util/antd'
import {
  Select,
  Form,
  Radio,
  InputNumber,
  Button,
  Icon,
  Input
} from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

@connect()
class PrimeDiscountAddUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      catalog: 'SG',
      membershipType: 2,
      amount:0,
      userName: ''
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('PrimeDiscountAddUser'))
  }
  verifyData(data){
    const keys = [{
      key:'userName',
      label: '用户名'
    },{
      key: 'membershipType',
      label: '会员类型'
    }]
    let flag = true
    for (let i = 0; i < keys.length; i++) {
      if(!data[keys[i].key]){
        flag = false
        warn(`${keys[i].label}不能为空`)
        break
      }
    }
    return flag
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const {
      catalog,
      membershipType,
      amount,
      userName
    } = this.state
    const {dispatch} = this.props
    return(
      <div className="well">
        <Form horizontal >
          <FormItem
            {...formItemLayout}
            label = '用户名：'
            required
          >
            <input className="ant-input" placeholder={'请输入用户名'} onChange={
              (e) => this.setState({userName:e.target.value})
            }/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label = '国家号：'
            required
          >
            <Select defaultValue={'SG'}  style={{width:100}} onChange={
              (v) => this.setState({catalog:v})
            }>
              <Option key={0} value={'SG'}>SG</Option>
              <Option key={1} value={'MY'}>MY</Option>
              <Option key={2} value={'AU'}>AU</Option>
              <Option key={3} value={'TH'}>TH</Option>
              <Option key={4} value={'ID'}>ID</Option>
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label = '会员类型：'
            required
          >
            <RadioGroup defaultValue={2} onChange={(e)=>this.setState({membershipType:e.target.value})}>
              <Radio key="0" value={1}>月会员</Radio>
              <Radio key="1" value={2}>年会员</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label = '金额：'
            required
          >
            <InputNumber step={0.01} min={0} style={{width:200}} placeholder={'金额'}
              onChange={(v) => this.setState({amount:v})}/>
          </FormItem>
          <FormItem horizontal
            wrapperCol={{ span: 20, offset: 4 }}
          >
            <Button type="primary" htmlType="submit" onClick={()=>{
              let data =  {
                userName,
                catalog,
                membershipType,
              }
              if(this.verifyData(data)){
                dispatch(addUser(userName,catalog,membershipType,amount,()=>{
                  redirect('/PrimeDiscountUserList')
                }))
              }
            }}>确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default PrimeDiscountAddUser