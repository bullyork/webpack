import React,{Component} from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Radio,
  Form,
  InputNumber,
  Select,
  Switch
} from 'antd'
import { redirect } from '../../../util/history'
import { success,warn } from '../../../util/antd'
import {
  getCurrentTab,
  addUser,
  getStationByStr
} from '../../../action/ezdelivery'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const Option = Select.Option

@connect(state => ({
  currentTab: state.currentTab,
  matchedStations: state.matchedStations
}))
class AddUser extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username:'',
      password:'',
      catelog:'SG',
      userType:'partner shop',
      identUrl:'',
      myStationName:'',
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
    dispatch(getCurrentTab('AddUser'))
    dispatch(getStationByStr('','SG'))
  }
  verifyBaseInfo(data){
    const keys = [{
      key:'username',
      label: '名字'
    },{
      key: 'password',
      label: '密码'
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
      dispatch,
      matchedStations
    } = this.props
    const {
      username,
      password,
      catelog,
      userType,
      identUrl,
      myStationName,
      isGiveVoucher,
      itemPrice,
      ezbuyApportionPrice
    } = this.state
    let {data} = this.state
    const matchedOptions = matchedStations.map((item,index)=>(<Option key={index} value={item} >{item}</Option>))
    const getCommission = () =>{
      if(userType == 'partner shop'){
        return (
          <section>
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
          </section>
        )
      }
    }
    return (<div className="addUser">
              <div className="well">
                <Form horizontal >
                  <FormItem horizontal
                      {...formItemLayout}
                      label = '用户类型：'
                      required
                    >
                      <RadioGroup onChange={(e)=>{
                        const value = e.target.value
                        this.setState({
                          username:'',
                          password:'',
                          data:{},
                          myStationName:''
                        })
                        this.setState({userType:e.target.value})
                      }} value={userType}>
                        <Radio key="a" value={'partner shop'}>partner shop</Radio>
                        <Radio key="b" value={'delivery staff'}>delivery staff</Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem horizontal
                      {...formItemLayout}
                      label = '国家号：'
                      required
                    >
                      <Select value={catelog}  style={{width:100}} onChange={
                        (v) => {
                          dispatch(getStationByStr('',v,()=>{
                            this.setState({catelog:v})
                          }))
                        }
                      }>
                        <Option key={0} value={'SG'}>SG</Option>
                        <Option key={1} value={'MY'}>MY</Option>
                        <Option key={2} value={'AU'}>AU</Option>
                        <Option key={3} value={'TH'}>TH</Option>
                        <Option key={4} value={'ID'}>ID</Option>
                      </Select>
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
                  <FormItem horizontal
                      {...formItemLayout}
                      label = '用户名：'
                      required
                    >
                      <input className="ant-input" value={username} placeholder={'请输入用户名'} 
                        onChange={(e) =>{
                          this.setState({username:e.target.value})
                      }}/>
                  </FormItem>

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
                  {getCommission()}
                  <FormItem horizontal
                    wrapperCol={{ span: 20, offset: 4 }}
                  >
                    <Button type="primary" htmlType="submit" onClick={()=>{
                      if(this.verifyBaseInfo(this.state)){
                        dispatch(addUser(username, password, catelog, userType, data, identUrl, myStationName, isGiveVoucher, itemPrice, ezbuyApportionPrice))
                      }
                    }}>确定</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          )
  }
}

export default AddUser