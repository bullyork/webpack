import React,{Component} from 'react'
import { connect } from 'react-redux'
import { redirect } from '../../../util/history'
import { 
  getCurrentTab,
  getUsers,
  deleteUser,
  updateUser
} from '../../../action/primeDiscount'
import { success,warn } from '../../../util/antd'
import {
  Select,
  Form,
  Radio,
  InputNumber,
  Button,
  Icon,
  Input,
  Modal,
  Table
} from 'antd'
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

@connect(state => ({
  primeDiscountUserList: state.primeDiscountUserList,
}))
class PrimeDiscountUserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current:1,
      catalog: 'SG',
      visible: false,
      type: '',
      id: '',
      userName: '',
      status:1,
      amount:0
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('PrimeDiscountUserList'))
    dispatch(getUsers('SG',0,10))
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const {
      dispatch,
      primeDiscountUserList
    } = this.props
    const {
      total,
      users
    } = primeDiscountUserList
    const {
      id,
      userName,
      status,
      amount,
      type,
      visible,
      catalog
    } = this.state
    let pages = Math.ceil(total/10)
    const {current} = this.state
    const pagination = {
      total: total,
      current: current,
      showSizeChanger: false,
      onChange:(current) => {
        this.setState({current})
        dispatch(getUsers(catalog,(current-1)*10,10))
      }
    }
    const columns = [{
      title:'userName',
      dataIndex:'userName',
      key: 'userName'
    },{
      title: 'identId',
      dataIndex: 'identId',
      key: 'identId'
    },{
      title: 'OriginCountry',
      dataIndex: 'catalog',
      key: 'catalog'
    },{
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const label = text == 0? '失效':'正常'
        return (<span>{label}</span>)
      }
    },{
      title:'membershipType',
      dataIndex: 'membershipType',
      key: 'membershipType',
      render: (text) => {
        const label = text == 1?'月会员':'年会员'
        return (<span>{label}</span>)
      }
    },{
      title: 'Paid Number',
      dataIndex: 'hasPaidAmount',
      key: 'hasPaidAmount'
    },{
      title: 'Order Number',
      dataIndex: 'orderAmount',
      key: 'orderAmount'
    },{
      title: 'amount',
      dataIndex:'amount',
      key: 'amount'
    },{
      title: 'operate',
      key: 'operate',
      render: (text,record) =>(<section>
        <Button onClick={()=>{
          this.setState({
            visible:true,
            type:'update',
            id:record.id,
            userName: record.userName,
            status: record.status,
            amount: record.amount
          })
        }}>更新</Button>
        <Button onClick={()=>{
          this.setState({
            visible:true,
            type:'delete',
            id:record.id
          })
        }}>删除</Button>
        <Button onClick = {
          () => {window.location.href = '/api/RedPacket_WebAPI/download/PrimeDiscount?Id='+record.id}
        }>导出excel</Button>
      </section>)
    }]

    const getTitle = () =>{
      const info = type == 'update'?'更新':'删除'
      return info
    }
    const getContent = () =>{
      const flag = type == 'update'
      if(flag){
        return(<section>
          <Form horizontal >
            <FormItem
              {...formItemLayout}
              label = '用户名：'
              required
            >
              <input value={userName} className="ant-input" placeholder={'请输入用户名'} onChange={
                (e) => this.setState({userName:e.target.value})
              }/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label = '状态：'
              required
            >
              <RadioGroup value={status} onChange={(e)=>this.setState({status:e.target.value})}>
                <Radio key="0" value={0}>失效</Radio>
                <Radio key="1" value={1}>正常</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label = '金额：'
              required
            >
              <InputNumber value={amount} step={0.01} min={0} style={{width:200}} placeholder={'金额'}
                onChange={(v) => this.setState({amount:v})}/>
            </FormItem>
          </Form>
        </section>)
      }else{
        return (<p>确认删除？</p>)
      }
    }
    return(
      <section>
        <div style={{marginBottom:10}}>
          <label>国家号：</label>
          <Select defaultValue={'SG'}  style={{width:100}} onChange={
            (v) => {
              this.setState({catalog:v})
              dispatch(getUsers(v,(current-1)*10,10))
            }
          }>
            <Option key={0} value={'SG'}>SG</Option>
            <Option key={1} value={'MY'}>MY</Option>
            <Option key={2} value={'AU'}>AU</Option>
            <Option key={3} value={'TH'}>TH</Option>
            <Option key={4} value={'ID'}>ID</Option>
          </Select>
        </div>
        <Table dataSource={users} columns={columns} pagination={pagination}/>
        <Modal title={getTitle()} visible={visible}
          onOk={()=>{
            if(type == 'update'){
              dispatch(updateUser(id,userName,status,amount,()=>{
                dispatch(getUsers(catalog,(current-1)*10,10))
              }))
            }else{
              dispatch(deleteUser(id,()=>{
                dispatch(getUsers(catalog,(current-1)*10,10))
              }))
            }
            this.setState({
              visible:false
            })
          }} onCancel={()=>this.setState({visible:false})}>
          {getContent()}
        </Modal>
      </section>
    )
  }
}

export default PrimeDiscountUserList