import React,{Component} from 'react'
import { connect } from 'react-redux'
import {redirect} from '../../../util/history'
import DisplayRulesTree from './displayRulesTree'
import { warn, success } from '../../../util/antd'
import { 
  Alert,
  Row,
  Col,
  Select,
  Button,
  Input,
  Checkbox,
  InputNumber,
  Radio,
  Table,
  Form,
  Tabs
} from 'antd'
import { 
  displayPropertyConfig,
  displayPropertyMap,
  conditionFieldType,
  conditionOperator
} from '../../../constant'
import { 
  displaySetName,
  getCurrentTab,
  getProperties,
  getCategories,
  displaySelect,
  addToDisplaySet,
  getValuesForProperty,
  adminDisplaySetAdd,
  adminDisplaySetGet,
  adminDisplaySetUpdate,
  adminDisplayCateList,
  adminDisplayCateAdd,
  updateRule
} from '../../../action/merchandise'
import './displayRulesSet.less'
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const assign = Object.assign
const RadioGroup = Radio.Group
const FormItem = Form.Item
const TabPane = Tabs.TabPane
@connect(state =>({
  displayPname: state.displayPname,
  properties: state.properties,
  preCategories: state.preCategories,
  DisplaySet: state.DisplaySet,
  displaySelected: state.displaySelected,
  propertyValues: state.propertyValues,
  displayTree: state.displayTree,
  rule: state.rule
}))
class DisplayRulesSet extends Component{
    constructor(props){
      super(props)
      this.state={
        activeKey:"1"
      }
    }
    componentWillMount(){
      const {
        dispatch
      } = this.props
      dispatch(getCurrentTab('DisplayRulesSet'))
    }
    render(){
      const {
        dispatch,
        displayPname,
        properties,
        preCategories,
        displaySelected,
        propertyValues,
        DisplaySet,
        displayTree,
        rule
      } = this.props
      const {
        category,
        property,
        other
      } = displaySelected
      const {
        disabled,
        id,
        name,
        op
      } = DisplaySet
      const {
        activeKey
      } = this.state
      let conditions = rule.conditions
      let rules = DisplaySet.rules
      const categoryOptions = preCategories.map((item,index) =>(<Option key={index} value ={item.cid}>{item.name}</Option>))
      const propertyOptions = properties.map((item) =>(<Option key={item.name} value={item.name}>{item.name}</Option>))
      const getOthersOptions = displayPropertyConfig.map((item, index) =>(<Option key={index} value={item.name} >{item.cname}</Option>))
      const getOthersValues = () =>{
        const key = other.name
        if(key){
          const type = displayPropertyMap[key].type
          if(type == 'radio'){
            return (
              <RadioGroup onChange={(v)=>{
                const values = assign({},other.values,{1:v.toString()})
                let tmpOther = {
                  name:key,
                  values:values
                }
                dispatch(displaySelect({other:tmpOther}))
              }}>
                <Radio key="0" value={true}>是</Radio>
                <Radio key="1" value={false}>否</Radio>
              </RadioGroup>
            )
          }else{
            return (
              <section>
                从 <InputNumber min={0} step={0.1} onChange={(v) =>{
                  const values = assign({},other.values,{8:v})
                  let tmpOther = {
                    name:key,
                    values:values
                  }
                  dispatch(displaySelect({other:tmpOther}))
                }} />
                到 <InputNumber min={0} step={0.1} onChange={(v) =>{
                  const values = assign({},other.values,{5:v})
                  let tmpOther = {
                    name:key,
                    values:values
                  }
                  dispatch(displaySelect({other:tmpOther}))
                }} />
              </section>
            )
          }
        }
      }
      const pvs = propertyValues.map((item) => (item.vname))
      const columns =[{
        title: '类型',
        dataIndex: 'fieldType',
        key: 'fieldType',
        render: (text) => (conditionFieldType[text])
      },{
        title: '名字',
        dataIndex: 'fieldName',
        key: 'fieldName'
      },{
        title: '逻辑',
        dataIndex: 'op',
        key: 'op',
        render: (text) => (conditionOperator[text])
      },{
        title: '值',
        key: 'value',
        render: (text,record)=> {
          const value = record.strVal || record.intVal || record.doubleVal
          return (<span>{value}</span>)
        }
      },{
        title: '操作',
        key: 'operate',
        render: (text,record,index) => (<Button onClick={()=>{
          conditions.splice(index, 1)
          dispatch(updateRule({conditions}))
        }}>删除</Button>)
      }]
      const columnsToRules = [{
        title: '逻辑',
        dataIndex: 'op',
        key: 'op',
        render: (text) => {
          switch (text) {
            case 1:
              return (<span>与</span>)
            case 2:
              return (<span>或</span>)
            default:
              return (<span>未知</span>)
              break;
          }
        }
      },{
        title: '规则数',
        dataIndex: 'conditions',
        key: 'conditions',
        render: (text) => (<span>{text.length}</span>)
      },{
        title: '操作',
        key: 'operation',
        render:(text,record,index)=>(<section>
          <Button onClick={()=>{
            rules.splice(index,1)
            dispatch(addToDisplaySet({rules}))
          }}>删除</Button>
          <Button onClick={()=>{
            dispatch(updateRule({conditions:rules[index].conditions}))
          }}>查看详情</Button>
        </section>)
      }]
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      }
      return (<section className="displayRulesSet">
        <Tabs activeKey={activeKey} onChange={(key)=>{
          const clearDisplaySet =  {
            id: -1,
            name: '',
            op: 1,
            rules: [],
            disabled: false
          }
          const clearRule = {
            op:1,
            conditions:[]
          }
          dispatch(updateRule(clearRule))
          if(key == '2'){
            dispatch(addToDisplaySet(clearDisplaySet))
          } 
          this.setState({activeKey:key})
        }}>
          <TabPane tab="展示类目层级" key="1">
            <DisplayRulesTree />
            <div style={{marginTop:15}}>
              <Button style={{marginRight:10}} onClick={()=>{
                let index = 0
                for (var i = 0; i < 4; i++) {
                  if(displayTree[i].selected>0){
                    index = i
                  }
                }
                if(index == 3){
                  warn('该类目不存在子层级！')
                }else{
                  const clearDisplaySet =  {
                    id: -1,
                    name: '',
                    op: 1,
                    rules: [],
                    disabled: false
                  }
                  const clearRule = {
                    op:1,
                    conditions:[]
                  }
                  dispatch(addToDisplaySet(clearDisplaySet))
                  dispatch(updateRule(clearRule))
                  this.setState({activeKey:"2"})
                }
              }}>添加类目</Button>
              <Button onClick={()=>{
                const clearRule = {
                    op:1,
                    conditions:[]
                  }
                dispatch(updateRule(clearRule))
                let parent = 0
                for (var i = 0; i < 4; i++) {
                  if(displayTree[i].selected>0){
                    const list = displayTree[i].all
                    for (let j = 0; j < list.length; j++) {
                      if(list[j].id == displayTree[i].selected){
                        parent = list[j].setId
                      }
                    }
                  }
                }
                dispatch(adminDisplaySetGet(parent,()=>{
                  this.setState({activeKey:"3"})
                }))
              }}>查看详情</Button>
            </div>
          </TabPane>
          <TabPane tab="添加展示类目" key="2">
            <Alert message="以下规则和条件以及最终展示规则均有逻辑设置选项，默认为“与”。逻辑“或”和“与”，例子：颜色黑，尺寸xl，颜色黑“或”尺寸xl：只要产品拥有xl属性或颜色黑属性任一即可；颜色黑“与”xl属性，代表同时具有颜色黑和xl属性的产品。" type="info"/>
            <div className="addRule">
              <h2>1，添加条件</h2>
              <div className="edit well">
                <h6>1）添加类目</h6>
                <div className="add">
                  <label>类目名：</label>
                  <Select combobox
                    style={{ width: 300 }}
                    placeholder="请输入类目"
                    filterOption={false}
                    onChange={(v)=>{
                      const queryAll ={
                        prefix:v,
                        caseSensitive: false,
                        limit: 0
                      }
                      dispatch(getCategories(queryAll, -1, 0))
                    }}
                    onSelect ={ (v) =>
                      dispatch(displaySelect({category: v}))
                    }
                    >
                    {categoryOptions}
                  </Select>
                  <br/>
                  <Button onClick={() =>{
                    const condition = {
                      fieldType: 1,
                      intVal: category,
                      op: 1
                    }
                    conditions.push(condition)
                    dispatch(updateRule({conditions}))
                  }}>添加</Button>
                </div>
              </div>

              <div className="edit well">
                <h6>2）添加属性</h6>
                <div className="add">
                  <label>属性名：</label>
                  <Select combobox
                    style={{ width: 300 }}
                    placeholder="请输入属性"
                    filterOption={false}
                    onChange={(v)=>{
                      const listQuery ={
                        prefix: v,
                        caseSensitive: false,
                        limit: 10
                      }
                      dispatch(getProperties(listQuery))
                    }}
                    onSelect={(v)=>dispatch(getValuesForProperty(v))}
                    >
                    {propertyOptions}
                  </Select>
                  <br/>
                  <label>属性值：</label>
                  <CheckboxGroup options={pvs} onChange={(v) => {
                    const pname = propertyValues[0].pname
                    const newProperty = {
                      name:pname,
                      values:v
                    }
                    dispatch(displaySelect({property: newProperty}))
                  }} />
                  <br/>
                  <Button style={{marginTop:10}} onClick={() =>{
                    const newConditions = property.values.map((item) =>({
                      fieldType: 2,
                      fieldName: property.name,
                      op:1,
                      strVal: item
                    }))
                    conditions = conditions.concat(newConditions)
                    dispatch(updateRule({conditions}))
                  }}>添加</Button>
                </div>             
              </div>

              <div className="edit well">
                <h6>3）添加其他相关选项</h6>
                <div className="add">
                  <label>名字：</label>
                  <Select style={{marginRight:10,width:300}}
                    onSelect ={(v) =>{
                      dispatch(displaySelect({other:assign({},other,{name:v})}))
                    }}
                  >
                    {getOthersOptions}
                  </Select>
                  <br/>
                  <label>值：</label>
                    {getOthersValues()}
                  <br/>
                  <Button style={{marginTop:10}} onClick={()=>{
                    for (let key in other.values) {
                      let tmpCondition = {}
                      if(key != 1){
                        if(other.values[key]!=-1){
                          tmpCondition = {
                            fieldType:2,
                            fieldName: other.name,
                            op: Number(key),
                            doubleVal:other.values[key]
                          }
                          conditions.push(tmpCondition)
                        }
                      }else{
                        if(other.values[key]!=-1){
                          tmpCondition = {
                            fieldType:2,
                            fieldName: other.name,
                            op: Number(key),
                            strVal:other.values[key]
                          }
                          conditions.push(tmpCondition)
                        }
                      }
                    }
                    dispatch(updateRule({conditions}))
                  }}>添加</Button>
                </div>             
              </div>
              <h2>2，添加规则</h2>
              <Table columns={columns} dataSource={conditions} />
              <section className='displaySetInput'>
                <Form horizontal >
                  <FormItem
                    {...formItemLayout}
                    label = '规则间的逻辑：'
                    required
                  >
                    <RadioGroup value={rule.op} onChange={(e)=>{
                      dispatch(updateRule({op:e.target.value}))
                    }}>
                      <Radio key="0" value={2}>或</Radio>
                      <Radio key="1" value={1}>与</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem
                    wrapperCol={{ span: 12, offset: 4 }} >
                   <Button onClick={()=>{
                    rules.push(rule)
                    dispatch(updateRule({
                      op:1,
                      conditions:[]
                    }))
                    dispatch(addToDisplaySet({rules}))
                   }}>
                     添加
                   </Button>
                  </FormItem>
                </Form>
              </section>
              <h2>3，添加规则集</h2>
              <Table columns={columnsToRules} dataSource={rules} />
              <section className='displaySetInput'>
                <Form horizontal >
                  <FormItem
                    {...formItemLayout}
                    label = '规则集的名字：'
                    required
                  >
                    <input className="ant-input" value={name} onChange={(e)=>{
                      dispatch(addToDisplaySet({name:e.target.value}))
                    }}/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = '规则集间的逻辑：'
                    required
                  >
                    <RadioGroup value={op} onChange={(e)=>{
                      dispatch(addToDisplaySet({op:e.target.value}))
                    }}>
                      <Radio key="0" value={2}>或</Radio>
                      <Radio key="1" value={1}>与</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label = '是否禁用：'
                    required
                  >
                    <RadioGroup value={disabled} onChange={(e)=>{
                      dispatch(addToDisplaySet({disabled:e.target.value}))
                    }}>
                      <Radio key="0" value={true}>禁用</Radio>
                      <Radio key="1" value={false}>开放</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem
                    wrapperCol={{ span: 12, offset: 4 }} >
                    <Button type="primary" onClick={() =>{
                      let parent = 0
                      let index = 0
                      for (var i = 0; i < 3; i++) {
                        if(displayTree[i].selected>0){
                          parent = displayTree[i].selected
                          index = i
                        }
                      }
                      dispatch(adminDisplaySetAdd(DisplaySet,(data)=>{
                        dispatch(adminDisplayCateAdd(parent,data.name,data.id,()=>{
                          dispatch(adminDisplayCateList(parent,index))
                        }))
                      }))
                    }}>确定添加</Button>
                  </FormItem>
                </Form>
              </section>
            </div>
          </TabPane>
          <TabPane tab="查看展示类目" key="3">
            <h2>1，规则</h2>
            <Table columns={columns} dataSource={conditions} />
            <h2>2，规则集</h2>
            <Table columns={columnsToRules} dataSource={rules} />
          </TabPane>
        </Tabs>    
        </section>)
    }
}
export default DisplayRulesSet