import React,{Component} from 'react'
import { connect } from 'react-redux'
import { success,warn } from '../../../util/antd'
import { toNormalDateString } from '../../../util/kit'
import {
  Select,
  Form,
  Checkbox,
  Radio,
  DatePicker,
  InputNumber,
  Upload,
  Button,
  Icon,
  Tabs,
  Input
} from 'antd'
import { getToken } from '../../../api/hpArrange'
import Config from '../../../common/config'
import {serviceType,serviceTypeMap} from '../../../constant'
import './generate.less'
import {
  getCurrentTab,
  changeCatalogcode,
  addRebateVoucher,
  addCashVoucher,
  addPrimeTrailVoucher,
  addRegisterVoucher,
  changeRebateVoucher,
  changeCashVoucher,
  changePrimeTrailVoucher,
  changeRegisterVoucher
} from '../../../action/voucher'
const TabPane = Tabs.TabPane
const Option = Select.Option
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const assign = Object.assign

@connect(state => ({
  currentTab: state.currentTab,
  catalogCode: state.catalogCode,
  rebateData: state.rebateData,
  cashData: state.cashData,
  primeTrialData: state.primeTrialData,
  registerData: state.registerData
}))
class Generate extends Component{
  constructor(props) {
    super(props)
    this.state = {
      baseUrl:'',
      token:'',
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: []
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('Generate'))
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
    })
    }
    )
  }
  verifyBaseForm(data){
    const keys = [{
      key:'name',
      label: '名字'
    },{
      key: 'startDate',
      label: '开始日期'
    },{
      key: 'endDate',
      label: '结束日期'
    },{
      key: 'totalCount',
      label: '生成数量'
    },{
      key: 'picture',
      label: '图片'
    },{
      key: 'description',
      label: 'voucher描述'
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
  verifyRebateData(data){
    const keys = [{
      key:'serviceType',
      label: '服务类型'
    },{
      key: 'gapAmount',
      label: '“满”减金额'
    },{
      key: 'rebateAmount',
      label: '满“减”金额'
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
  verifyRegisterData(data){
    const keys = [{
      key:'serviceType',
      label: '服务类型'
    },{
      key: 'rebateAmount',
      label: '金额设置'
    },{
      key: 'isFirstOrder',
      label: '是否首单'
    },{
      key:'name',
      label: '名字'
    },{
      key: 'days',
      label: '有效期'
    },{
      key: 'totalCount',
      label: '生成数量'
    },{
      key: 'picture',
      label: '图片'
    },{
      key: 'description',
      label: 'voucher描述'
    }]
    let flag = true
    for (let i = 0; i < keys.length; i++) {
      if(keys[i].key != 'isFirstOrder'){
        if(!data[keys[i].key]){
          flag = false
          warn(`${keys[i].label}不能为空`)
          break
        }
      }else{
        if(!data.hasOwnProperty(keys[i].key)){
          flag = false
          warn(`${keys[i].label}不能为空`)
          break
        }
      }
        
    }
    return flag
  }
  verifyCashData(data){
    const keys = [{
      key:'serviceType',
      label: '服务类型'
    },{
      key: 'rebateAmount',
      label: '金额设置'
    },{
      key: 'isFirstOrder',
      label: '是否首单'
    }]
    let flag = true
    for (let i = 0; i < keys.length; i++) {
      if(keys[i].key != 'isFirstOrder'){
        if(!data[keys[i].key]){
          flag = false
          warn(`${keys[i].label}不能为空`)
          break
        }
      }else{
        if(!data.hasOwnProperty(keys[i].key)){
          flag = false
          warn(`${keys[i].label}不能为空`)
          break
        }
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
      rebateData,
      cashData,
      primeTrialData,
      registerData,
      dispatch,
      catalogCode
    } = this.props
    const {
      token,
      baseUrl,
    } = this.state
    let {
      fileList1,
      fileList2,
      fileList3,
      fileList4
    } = this.state
    const propsOne = {
      name: 'file',
      action: Config.QINIU_UPLOAD_URL,
      data: {token: token},
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList1 = fileList.slice(-1)
        this.setState({fileList1})
         if (info.file.status === 'done') {
          success(`${info.file.name} 上传成功。`)
          const {baseForm} = rebateData
          const newBaseForm = assign({},baseForm,{picture:baseUrl+info.file.response.key})
          dispatch(changeRebateVoucher({baseForm:newBaseForm}))
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsTwo = {
      name: 'file',
      action: Config.QINIU_UPLOAD_URL,
      data: {token: token},
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList2 = fileList.slice(-1)
        this.setState({fileList2})
         if (info.file.status === 'done') {
          success(`${info.file.name} 上传成功。`)
          const {baseForm} = cashData
          const newBaseForm = assign({},baseForm,{picture:baseUrl+info.file.response.key})
          dispatch(changeCashVoucher({baseForm:newBaseForm}))
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsThree = {
      name: 'file',
      action: Config.QINIU_UPLOAD_URL,
      data: {token: token},
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList3 = fileList.slice(-1)
        this.setState({fileList3})
         if (info.file.status === 'done') {
          success(`${info.file.name} 上传成功。`)
          const {baseForm} = primeTrialData
          const newBaseForm = assign({},baseForm,{picture:baseUrl+info.file.response.key})
          dispatch(changePrimeTrailVoucher({baseForm:newBaseForm}))
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsFour = {
      name: 'file',
      action: Config.QINIU_UPLOAD_URL,
      data: {token: token},
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList4 = fileList.slice(-1)
        this.setState({fileList4})
         if (info.file.status === 'done') {
          success(`${info.file.name} 上传成功。`)
          const {baseForm} = registerData
          const newBaseForm = assign({},baseForm,{picture:baseUrl+info.file.response.key})
          dispatch(changeRegisterVoucher({baseForm:newBaseForm}))
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    return (<section className="generate">
        <div className="selectCountryCode">
          <label >请选择国家号：</label>
          <Select defaultValue={'SG'}  style={{width:100}} onChange={
            (v) => dispatch(changeCatalogcode(v))
          }>
            <Option key={0} value={'SG'}>SG</Option>
            <Option key={1} value={'MY'}>MY</Option>
            <Option key={2} value={'AU'}>AU</Option>
            <Option key={3} value={'TH'}>TH</Option>
            <Option key={4} value={'ID'}>ID</Option>
          </Select>
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="满减券" key="1">
            <div className="ticket">
              <div className="well">
                <Form horizontal >
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 名称：'
                    required
                  >
                    <input className="ant-input" placeholder={'请输入voucher名称'} 
                      onChange={(e) =>{
                        const {baseForm} = rebateData
                        const newBaseForm = assign({},baseForm,{name:e.target.value})
                        dispatch(changeRebateVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 描述：'
                    required
                  >
                    <Input type="textarea" placeholder={'请输入voucher描述'} 
                      onChange={(e) =>{
                        const {baseForm} = rebateData
                        const newBaseForm = assign({},baseForm,{description:e.target.value})
                        dispatch(changeRebateVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = 'service type:'
                    required
                  >
                    <CheckboxGroup options={serviceType}  onChange={(v)=>{
                      let value = 0
                      v.map((item) =>{
                        value = value + serviceTypeMap[item]
                      })
                      dispatch(changeRebateVoucher({serviceType:value}))
                    }} />
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '金额设置：'
                    required
                  >
                    满：<InputNumber step={0.1} min={0}  style={{width:200}} placeholder={"商品费用"}
                      onChange={(v) =>dispatch(changeRebateVoucher({gapAmount:v}))}/>
                    减：<InputNumber step={0.1} min={0}  style={{width:200}} placeholder={"总帐单"}
                      onChange={(v) =>dispatch(changeRebateVoucher({rebateAmount:v}))}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '有效期：'
                    required
                  >
                    <section className="inputArea">
                      <label htmlFor='startTime'>开始日期:</label>
                      <DatePicker format='yyyy-MM-dd' onChange={(v)=>{
                        const {baseForm} = rebateData
                        const newBaseForm = assign({},baseForm,{startDate:toNormalDateString(v)})
                        dispatch(changeRebateVoucher({baseForm:newBaseForm}))
                      }} />
                    </section>
                    <section className="inputArea">
                      <label htmlFor='endTime'>结束日期:</label>
                      <DatePicker format='yyyy-MM-dd' onChange={(v)=>{
                        const {baseForm} = rebateData
                        const newBaseForm = assign({},baseForm,{endDate:toNormalDateString(v)})
                        dispatch(changeRebateVoucher({baseForm:newBaseForm}))
                      }} />
                    </section>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '生成数量：'
                    required
                  >
                    <InputNumber step={1} min={0} onChange={(v)=>{
                      const {baseForm} = rebateData
                      const newBaseForm = assign({},baseForm,{totalCount:v})
                      dispatch(changeRebateVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '上传图片：'
                    required
                  >
                  <Upload {...propsOne} fileList={this.state.fileList1}>
                    <Button type="ghost">
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                  </FormItem>
                  <FormItem horizontal
                    wrapperCol={{ span: 20, offset: 4 }}
                  >
                    <Button type="primary" htmlType="submit" onClick={()=>{
                      const {baseForm} = rebateData
                      const newBaseForm = assign({},baseForm,{catalogCode})
                      let submitRebateData = rebateData
                      submitRebateData.baseForm = newBaseForm
                      if(this.verifyRebateData(submitRebateData) && this.verifyBaseForm(submitRebateData.baseForm)){
                        dispatch(addRebateVoucher(submitRebateData))
                      }
                    }}>确定</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </TabPane>
          <TabPane tab="现金红包券" key="2">
            <div className="ticket">
              <div className="well">
                <Form horizontal >
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 名称：'
                    required
                  >
                    <input className="ant-input" placeholder={'请输入voucher名称'} 
                      onChange={(e) =>{
                        const {baseForm} = cashData
                        const newBaseForm = assign({},baseForm,{name:e.target.value})
                        dispatch(changeCashVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 描述：'
                    required
                  >
                    <Input type="textarea" placeholder={'请输入voucher描述'} 
                      onChange={(e) =>{
                        const {baseForm} = cashData
                        const newBaseForm = assign({},baseForm,{description:e.target.value})
                        dispatch(changeCashVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = '首单:'
                    required
                  >
                    <RadioGroup onChange={(e)=>dispatch(changeCashVoucher({isFirstOrder:e.target.value}))}>
                      <Radio key="0" value={true}>YES</Radio>
                      <Radio key="1" value={false}>NO</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = 'service type:'
                    required
                  >
                    <CheckboxGroup options={serviceType}  onChange={(v)=>{
                      let value = 0
                      v.map((item) =>{
                        value = value + serviceTypeMap[item]
                      })
                      dispatch(changeCashVoucher({serviceType:value}))
                    }} />
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '最低消费：'
                    required
                  >
                    <InputNumber step={0.1} min={0} style={{width:200}} placeholder={'请输入最小消费金额'}
                      onChange={(v) =>dispatch(changeCashVoucher({mininumAmount:v}))}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '金额设置：'
                    required
                  >
                    <InputNumber step={0.1} min={0} style={{width:200}} placeholder={'红包金额'}
                      onChange={(v) =>dispatch(changeCashVoucher({rebateAmount:v}))}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '有效期：'
                    required
                  >
                    <section className="inputArea">
                      <label htmlFor='startTime'>开始日期:</label>
                      <DatePicker format='yyyy-MM-dd' onChange={(v)=>{
                        const {baseForm} = cashData
                        const newBaseForm = assign({},baseForm,{startDate:toNormalDateString(v)})
                        dispatch(changeCashVoucher({baseForm:newBaseForm}))
                      }} />
                    </section>
                    <section className="inputArea">
                      <label htmlFor='endTime'>结束日期:</label>
                      <DatePicker format='yyyy-MM-dd' onChange={(v)=>{
                        const {baseForm} = cashData
                        const newBaseForm = assign({},baseForm,{endDate:toNormalDateString(v)})
                        dispatch(changeCashVoucher({baseForm:newBaseForm}))
                      }} />
                    </section>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '生成数量：'
                    required
                  >
                    <InputNumber step={1} min={0} onChange={(v)=>{
                      const {baseForm} = cashData
                      const newBaseForm = assign({},baseForm,{totalCount:v})
                      dispatch(changeCashVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '上传图片：'
                    required
                  >
                  <Upload {...propsTwo} fileList={this.state.fileList2}>
                    <Button type="ghost">
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                  </FormItem>
                  <FormItem horizontal
                    wrapperCol={{ span: 20, offset: 4 }}
                  >
                    <Button type="primary" htmlType="submit" onClick={()=>{
                      const {baseForm} = cashData
                      const newBaseForm = assign({},baseForm,{catalogCode})
                      let submitCashData = cashData
                      submitCashData.baseForm = newBaseForm
                      if(this.verifyCashData(submitCashData) && this.verifyBaseForm(submitCashData.baseForm)){
                        dispatch(addCashVoucher(submitCashData))
                      }
                    }}>确定</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </TabPane>
          <TabPane tab="prime体验券" key="3">
            <div className="ticket">
              <div className="well">
                <Form horizontal >
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 名称：'
                    required
                  >
                    <input className="ant-input" placeholder={'请输入voucher名称'} 
                      onChange={(e) =>{
                        const {baseForm} = primeTrialData
                        const newBaseForm = assign({},baseForm,{name:e.target.value})
                        dispatch(changePrimeTrailVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 描述：'
                    required
                  >
                    <Input type="textarea" placeholder={'请输入voucher描述'} 
                      onChange={(e) =>{
                        const {baseForm} = primeTrialData
                        const newBaseForm = assign({},baseForm,{description:e.target.value})
                        dispatch(changePrimeTrailVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '有效期：'
                    required
                  >
                    <section className="inputArea">
                      <label htmlFor='startTime'>开始日期:</label>
                      <DatePicker format='yyyy-MM-dd' onChange={(v)=>{
                        const {baseForm} = primeTrialData
                        const newBaseForm = assign({},baseForm,{startDate:toNormalDateString(v)})
                        dispatch(changePrimeTrailVoucher({baseForm:newBaseForm}))
                      }} />
                    </section>
                    <section className="inputArea">
                      <label htmlFor='endTime'>结束日期:</label>
                      <DatePicker format='yyyy-MM-dd' onChange={(v)=>{
                        const {baseForm} = primeTrialData
                        const newBaseForm = assign({},baseForm,{endDate:toNormalDateString(v)})
                        dispatch(changePrimeTrailVoucher({baseForm:newBaseForm}))
                      }} />
                    </section>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '生成数量：'
                    required
                  >
                    <InputNumber step={1} min={0} onChange={(v)=>{
                      const {baseForm} = primeTrialData
                      const newBaseForm = assign({},baseForm,{totalCount:v})
                      dispatch(changePrimeTrailVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '上传图片：'
                    required
                  >
                  <Upload {...propsThree} fileList={this.state.fileList3}>
                    <Button type="ghost">
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                  </FormItem>
                  <FormItem horizontal
                    wrapperCol={{ span: 20, offset: 4 }}
                  >
                    <p>注意：prime体验券只有一次checkout prime订单的机会</p>
                    <Button type="primary" htmlType="submit" onClick={()=>{
                      const {baseForm} = primeTrialData
                      const newBaseForm = assign({},baseForm,{catalogCode})
                      if(this.verifyBaseForm(primeTrialData.baseForm)){
                        dispatch(addPrimeTrailVoucher(newBaseForm))
                      }
                    }}>确定</Button>
                  </FormItem>
                </Form>
              </div>
          </div>
          </TabPane>
          <TabPane tab="注册现金券" key="4">
            <div className="ticket">
              <div className="well">
                <Form horizontal >
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 名称：'
                    required
                  >
                    <input className="ant-input" placeholder={'请输入voucher名称'} 
                      onChange={(e) =>{
                        const {baseForm} = registerData
                        const newBaseForm = assign({},baseForm,{name:e.target.value})
                        dispatch(changeRegisterVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = 'voucher 描述：'
                    required
                  >
                    <Input type="textarea" placeholder={'请输入voucher描述'} 
                      onChange={(e) =>{
                        const {baseForm} = registerData
                        const newBaseForm = assign({},baseForm,{description:e.target.value})
                        dispatch(changeRegisterVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = '首单:'
                    required
                  >
                    <RadioGroup onChange={(e)=>dispatch(changeRegisterVoucher({isFirstOrder:e.target.value}))}>
                      <Radio key="0" value={true}>YES</Radio>
                      <Radio key="1" value={false}>NO</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = 'service type:'
                    required
                  >
                    <CheckboxGroup options={serviceType}  onChange={(v)=>{
                      let value = 0
                      v.map((item) =>{
                        value = value + serviceTypeMap[item]
                      })
                      dispatch(changeRegisterVoucher({serviceType:value}))
                    }} />
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '最低消费：'
                    required
                  >
                    <InputNumber step={0.1} min={0} style={{width:200}} placeholder={'请输入最小消费金额'}
                      onChange={(v) =>dispatch(changeRegisterVoucher({mininumAmount:v}))}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '金额设置：'
                    required
                  >
                    <InputNumber step={0.1} min={0} style={{width:200}} placeholder={'红包金额'}
                      onChange={(v) =>dispatch(changeRegisterVoucher({rebateAmount:v}))}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '有效期：'
                    required
                  >
                    <InputNumber step={1} min={0} onChange={(v)=>{
                      const {baseForm} = registerData
                      const newBaseForm = assign({},baseForm,{days:v})
                      dispatch(changeRegisterVoucher({baseForm:newBaseForm}))
                    }}/>天
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '生成数量：'
                    required
                  >
                    <InputNumber step={1} min={0} onChange={(v)=>{
                      const {baseForm} = registerData
                      const newBaseForm = assign({},baseForm,{totalCount:v})
                      dispatch(changeRegisterVoucher({baseForm:newBaseForm}))
                    }}/>
                  </FormItem>
                  <FormItem horizontal
                    {...formItemLayout}
                    label = '上传图片：'
                    required
                  >
                  <Upload {...propsFour} fileList={this.state.fileList4}>
                    <Button type="ghost">
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                  </FormItem>
                  <FormItem horizontal
                    wrapperCol={{ span: 20, offset: 4 }}
                  >
                    <Button type="primary" htmlType="submit" onClick={()=>{
                      const {baseForm} = registerData
                      const newBaseForm = assign({},baseForm,{catalogCode})
                      let submitRegisterData = assign({},registerData,{baseForm:newBaseForm})
                      let verifyData = assign({},submitRegisterData,submitRegisterData.baseForm)
                      if(this.verifyRegisterData(verifyData)){
                        dispatch(addRegisterVoucher(submitRegisterData))
                      }
                    }}>确定</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </section>)
  }
}
export default Generate