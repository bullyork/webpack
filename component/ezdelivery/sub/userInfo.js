import React,{Component} from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Table,
  Modal,
  Tabs,
  Tag,
  Form,
  Select,
  InputNumber,
  Switch
} from 'antd'
import { redirect } from '../../../util/history'
import {
  getCurrentTab,
  getUserByType,
  getStationsByUserId,
  delStation,
  delUser,
  updateUser,
  updateStationByUser,
  updateUserPassword,
  addStationByUser,
  getStationByStr
} from '../../../action/ezdelivery'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option

@connect(state => ({
  currentTab: state.currentTab,
  users: state.users,
  stations: state.stations,
  matchedStations: state.matchedStations
}))
class UserInfo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      catelog: 'SG',
      visible: false,
      title: '',
      userName: '',
      userType: 'partner shop',
      objectId: '',
      password: '',
      identUrl: '',
      myStationName: '',
      isGiveVoucher:false,
      itemPrice:0,
      ezbuyApportionPrice:0,
      data:{
        web:0,
        app:0,
        pickUp:0,
        firstPercent:0,
        unFirstPercent:0,
        placeOrder:0
      }
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('UserInfo'))
    dispatch(getUserByType('partner shop','SG',-1,-1))
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const {
      dispatch,
      users,
      stations,
      matchedStations
    } = this.props
    const {
      catelog,
      visible,
      title,
      userType,
      objectId,
      password,
      userName,
      identUrl,
      myStationName,
      isGiveVoucher,
      itemPrice,
      ezbuyApportionPrice
    } = this.state
    let {data} = this.state
    const matchedOptions = matchedStations.map((item,index)=>(<Option key={index} value={item} >{item}</Option>))
    const columnsToPartnerShop =[{
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId'
    },{
      title: '用户名：',
      dataIndex: 'userName',
      key: 'userName'
    },{
      title: '用户类型：',
      dataIndex: 'typeName',
      key: 'typeName'
    },{
      title: '佣金',
      dataIndex: 'commission',
      key: 'commission',
      render: (text) =>(<section>
        <p>
          <label>取货佣金：</label>
          {text.pickUp}
        </p>
        <p>
          <label>web注册佣金：</label>
          {text.web}
        </p>
        <p>
          <label>app注册佣金：</label>
          {text.app}
        </p>
        <p>
          <label>首单佣金百分比：</label>
          {text.firstPercent}
        </p>
        <p>
          <label>非首单佣金百分比：</label>
          {text.unFirstPercent}
        </p>
        <p>
          <label>注册下单佣金：</label>
          {text.placeOrder}
        </p>
      </section>),
      width:200
    },{
      title: 'identUrl',
      dataIndex: 'identUrl',
      key: 'identUrl'
    },{
      title: '站点名字：',
      dataIndex: 'myStationName',
      key: 'myStationName'
    },{
      title: '是否送券',
      dataIndex:'isGiveVoucher',
      key:'isGiveVoucher',
      render:(text)=>(<span>{text+''}</span>)
    },{
      title:'赠品费用',
      dataIndex:'itemPrice',
      key:'itemPrice'
    },{
      title:'ezbuy分担费用',
      dataIndex:'ezbuyApportionPrice',
      key:'ezbuyApportionPrice'
    },{
      title: '操作',
      key: 'operation',
      render: (text,record) => (<section>
        <div style={{marginBottom:5}}><Button onClick={ ()=>{
          this.setState({
            visible:true,
            title:'删除用户',
            userName: record.userName,
            data: record.commission,
            identUrl: record.identUrl,
            myStationName: record.myStationName
          })
        }}>删除用户</Button></div>
        <div style={{marginBottom:5}}><Button onClick={ ()=>{
          this.setState({
            visible:true,
            title:'更新用户信息',
            userName: record.userName,
            data: record.commission,
            identUrl: record.identUrl,
            myStationName: record.myStationName,
            isGiveVoucher: record.isGiveVoucher,
            itemPrice: record.itemPrice,
            ezbuyApportionPrice: record.ezbuyApportionPrice
          })
        }}>更新用户信息</Button></div>
        <div style={{marginBottom:5}}><Button onClick={ ()=>{
          this.setState({
            visible:true,
            title:'修改用户密码',
            userName: record.userName
          })
        }}>修改用户密码</Button></div>
      </section>)
    }]
    const columnsToDeliveryStaff =[{
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId'
    },{
      title: '用户名：',
      dataIndex: 'userName',
      key: 'userName'
    },{
      title: '用户类型：',
      dataIndex: 'typeName',
      key: 'typeName'
    },{
      title: 'stations',
      key: 'stations',
      render: (text,record)=>(<Button onClick={() =>{
        dispatch(getStationsByUserId(record.objectId,()=>{
          dispatch(getStationByStr('',catelog))
          this.setState({
            visible:true,
            title:'查看站点',
            userName: record.userName,
            objectId: record.objectId
          })
        }))
      }}>查看站点</Button>)
    },{
      title: '操作',
      key: 'operation',
      render: (text,record) => (<section>
        <div style={{marginBottom:5}}><Button onClick={ ()=>{
          this.setState({
            visible:true,
            title:'删除用户',
            userName: record.userName,
            data: record.commission,
            identUrl: record.identUrl,
            myStationName: record.myStationName
          })
        }}>删除用户</Button></div>
        <div style={{marginBottom:5}}><Button onClick={ ()=>{
          this.setState({
            visible:true,
            title:'修改用户密码',
            userName: record.userName
          })
        }}>修改用户密码</Button></div>
      </section>)
    }]
    const getModalContent = () => {
      switch (title) {
        case '删除用户':
          return (<p>确定删除？</p>)
        case '查看站点':
          const tags = stations.map((item)=>(<Tag closable onClose={()=>dispatch(delStation(catelog,item,userName,()=>{
            dispatch(getStationsByUserId(objectId))
          }))}>
            {item}
          </Tag>))
          return (<section>
            <div style={{marginBottom:10}}>添加站点：
              <Select combobox defaultValue={myStationName}
                style={{ width: 200 }}
                onChange={(v)=>dispatch(getStationByStr(v,catelog))}
                onSelect={(v)=>this.setState({myStationName:v})}
                filterOption={false}
                placeholder="请输入站点名字符">
                {matchedOptions}
              </Select>
              <Button onClick={()=>dispatch(addStationByUser(myStationName,userName,catelog,()=>{
                dispatch(getStationsByUserId(objectId))
              }))} style={{marginLeft:10}}>确定</Button>
            </div>
            <div>
              站点：{tags}
            </div>
          </section>)
          break;
        case '更新用户信息':
          return (<section>
            <Form horizontal >
              <FormItem horizontal
                {...formItemLayout}
                label = '站点名字：'
                required
              >
                <Select combobox defaultValue={myStationName}
                  style={{ width: 200 }}
                  onChange={(v)=>dispatch(getStationByStr(v,catelog))}
                  onSelect={(v)=>this.setState({myStationName:v})}
                  filterOption={false}
                  placeholder="请输入站点名字符">
                  {matchedOptions}
                </Select>
              </FormItem>
              <FormItem horizontal
                {...formItemLayout}
                label = '首单佣金百分比：'
                required
              >
                <InputNumber min={0} max={100} value={data.firstPercent} onChange={(v)=>{
                  data.firstPercent = v
                  this.setState({data})
                }}/>
              </FormItem>
              <FormItem horizontal
                {...formItemLayout}
                label = '非首单佣金百分比：'
                required
              >
                <InputNumber min={0} max={100} value={data.unFirstPercent} onChange={(v)=>{
                  data.unFirstPercent = v
                  this.setState({data})
                }}/>
              </FormItem>
              <FormItem horizontal
                {...formItemLayout}
                label = '取货佣金：'
                required
              >
                <InputNumber min={0} value={data.pickUp} onChange={(v)=>{
                  data.pickUp = v
                  this.setState({data})
                }}/>
              </FormItem>
              <FormItem horizontal
                {...formItemLayout}
                label = 'web注册佣金：'
                required
              >
                <InputNumber min={0} value={data.web} onChange={(v)=>{
                  data.web = v
                  this.setState({data})
                }}/>
              </FormItem>
              <FormItem horizontal
                {...formItemLayout}
                label = 'app注册佣金：'
                required
              >
                <InputNumber min={0} value={data.app} onChange={(v)=>{
                  data.app = v
                  this.setState({data})
                }}/>
              </FormItem>
              <FormItem horizontal
                {...formItemLayout}
                label = '注册用户下单佣金：'
                required
              >
                <InputNumber min={0} value={data.placeOrder} onChange={(v)=>{
                  data.placeOrder = v
                  this.setState({data})
                }}/>
              </FormItem>
              <FormItem horizontal
                {...formItemLayout}
                label = 'identUrl'
                required
              >
                <input className="ant-input" value={identUrl} placeholder={'请输入identUrl'} 
                  onChange={(e) =>{
                    this.setState({identUrl:e.target.value})
                }}/>
              </FormItem>
              <FormItem horizontal
                  {...formItemLayout}
                  label = '是否送券：'
                  required
                >
                <Switch defaultChecked={false} onChange={(checked)=>{
                  this.setState({isGiveVoucher:checked})
                }} />
              </FormItem>
              <FormItem horizontal
                  {...formItemLayout}
                  label = '赠品费用：'
                  required
                >
                <InputNumber min={0}  value={itemPrice} onChange={(v)=>{
                  this.setState({itemPrice:v})
                }}/>
              </FormItem>
              <FormItem horizontal
                  {...formItemLayout}
                  label = 'ezbuy分担费用：'
                  required
                >
                <InputNumber min={0}  value={ezbuyApportionPrice} onChange={(v)=>{
                  this.setState({ezbuyApportionPrice:v})
                }}/>
              </FormItem>
            </Form>
          </section>)
          break;
        case '修改用户密码':
          return (
            <Form horizontal >
              <FormItem horizontal
                  {...formItemLayout}
                  label = '密码：'
                  required
                >
                  <input className="ant-input" value={password} placeholder={'请输入密码'} 
                    onChange={(e) =>{
                      this.setState({password:e.target.value})
                  }}/>
              </FormItem>
            </Form>
          )
          break;
        default:
          break;
      }
    }
    return (<section className='userInfo'>
      <div>
        <label>请选择国家号：</label>
        <Select value={catelog}  style={{width:100}} onChange={
          (v) => {
            dispatch(getUserByType(userType,v,-1,-1))
            this.setState({catelog:v})
          }
        }>
          <Option key={0} value={'SG'}>SG</Option>
          <Option key={1} value={'MY'}>MY</Option>
          <Option key={2} value={'AU'}>AU</Option>
          <Option key={3} value={'TH'}>TH</Option>
          <Option key={4} value={'ID'}>ID</Option>
        </Select>
      </div>
      <Tabs defaultActiveKey="1" onChange={(key)=>{
        switch (key) {
          case '1':
            this.setState({userType:'partner shop'})
            dispatch(getUserByType('partner shop',catelog,-1,-1))
            break;
          case '2':
            this.setState({userType:'delivery staff'})
            dispatch(getUserByType('delivery staff',catelog,-1,-1))
            break;
          default:
            break;
        }
      }}>
        <TabPane tab="partner shop" key="1">
          <Table columns={columnsToPartnerShop} dataSource={users} />
        </TabPane>
        <TabPane tab="delivery staff" key="2">
          <Table columns={columnsToDeliveryStaff} dataSource={users} />
        </TabPane>
      </Tabs>
      <Modal title={title} visible={visible}
        onOk={()=>{
          switch (title) {
            case '删除用户':
              dispatch(delUser(catelog,userName,()=>{
                dispatch(getUserByType(userType,catelog,-1,-1))
              }))
            case '查看站点':
              this.setState({visible:false})
              break
            case '更新用户信息':
              dispatch(updateUser(userName,catelog,data,identUrl,myStationName,isGiveVoucher,itemPrice,ezbuyApportionPrice,()=>{
                this.setState({visible:false})
                dispatch(getUserByType(userType,catelog,-1,-1))
              }))
              break
            case '修改用户密码':
              dispatch(updateUserPassword(userName,catelog,password,()=>{
                this.setState({visible:false})
              }))
              break;
            default:
              break
          }
        }} onCancel={()=>this.setState({visible:false})}>
        {getModalContent()}
      </Modal>
    </section>)
  }
}

export default UserInfo