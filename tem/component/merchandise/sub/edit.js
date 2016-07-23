import React,{Component} from 'react'
import {connect} from 'react-redux'
import { warn, success} from '../../../util/antd'
import { Select, Row, Col, Button, Form, Input, Table, Modal, Icon, Tabs, Breadcrumb, Tag} from 'antd'
import {
  addProperty,
  delProperty,
  addValue,
  delValue,
  addCategory,
  delCategory,
  addPropertyValue,
  addPropertyValueByNames,
  delValuesForProperty,
  getValuesForProperty,
  getCurrentTab,
  getPrefix,
  getCategories,
  getSubCategories,
  getProperties,
  getValues,
  clearPropertyValues,
  getCategoryValueOptions
} from '../../../action/merchandise'
import Category from '../base/category'
import CategoryPropertyValueSet from '../base/categoryPropertyValueSet'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option

@connect(state => ({
  propertyValues: state.propertyValues,
  categoryTree: state.categoryTree,
  prefix: state.prefix,
  preCategories: state.preCategories,
  properties: state.properties,
  values: state.values
}))
class Edit extends Component{
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      deleteState: false,
      categoryName: '',
      modalType: '',
      property: 'property',
      propertyvalues: [],
      values: '',
      defaultValues: [],
      activeKey: '1'
    }
  }
  componentWillMount(){
    const {dispatch} =  this.props
    dispatch(getCurrentTab('Edit'))
  }
  handleSubmit(){
    const modalType = this.state.modalType
    const pname = this.state.property
    const {dispatch} = this.props
    const {property} = this.state
    dispatch(getValuesForProperty(property, (propertyValues)=>{
      const defaultValues = propertyValues.map((item)=>(item.vname))
      this.setState({defaultValues})
    }))
    this.setState({visible:false})
  }
  render(){
    const {
      propertyValues,
      dispatch,
      categoryTree,
      prefix,
      categoryPropertyValueSet,
      properties,
      values,
      preCategories
    } = this.props
    let selectCid
    for (let i = 0; i < 4; i++) {
      if(categoryTree[i].selected != -1){
        selectCid = categoryTree[i].selected
      }
    }
    const columns = [{
      title: '属性id',
      dataIndex: 'pid',
      key: 'pid',
    }, {
      title: '属性',
      dataIndex: 'pname',
      key: 'pname',
    }, {
      title: '属性值id',
      dataIndex: 'vid',
      key: 'vid'
    }, {
      title: '属性值',
      dataIndex: 'vname',
      key: 'vname'
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record) => (<Button onClick={() =>
          dispatch(
            delValue(record.vid, 
            () =>dispatch(getValuesForProperty(record.pname))
          ))
        }>删除</Button>)
    }]
  const dataSource = propertyValues
  const preCategoriesOptions = preCategories.map((item) =>(<Option key={item.cid}>{item.name}</Option>))
  let breadcrumb = [];
  for (let key in categoryTree) {
    if(categoryTree[key].selected != -1){
      categoryTree[key].all.map((item) =>{
        if(item.cid == categoryTree[key].selected){
          breadcrumb.push(
            <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
          )
        }
      })
    }
  }
  
  const propertyOptions = properties.map((item) =>{
    return (<Option key={item.name}>{item.name}</Option>)
  })
  const valueOptions = values.map((item) =>{
    return (<Option key={item.name}>{item.name}</Option>)
  })
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  }
    return(
      <section>
        <Tabs  activeKey={this.state.activeKey} onTabClick={
          (key) => {
            if(key!=3){
              this.setState({activeKey:key})
            }
          }
        }>
          <TabPane tab="属性编辑" key="1">
            <Row>
              <Col span='12'>
                <label>输入属性值: </label>&nbsp;
                <Select combobox
                  style={{ width: 120 }}
                  placeholder="请输入属性"
                  filterOption={false}
                  onChange={(v)=>{
                    const listQuery ={
                      prefix: v,
                      caseSensitive: false,
                      limit: 10
                    }
                    const pv = []
                    dispatch(getProperties(listQuery))
                    dispatch(clearPropertyValues(pv))
                    this.setState({property:v})
                  }}
                  onBlur={
                    () =>{
                      const {property} = this.state
                      this.setState({deleteState:true})
                      dispatch(getValuesForProperty(property, (propertyValues)=>{
                        const defaultValues = propertyValues.map((item)=>(item.vname))
                        this.setState({defaultValues})
                      }))
                    }
                  }
                  >
                  {propertyOptions}
                </Select>
              </Col>
              <Col span='6'>
                <Button onClick={() => {
                  this.setState({
                    visible: true,
                    modalType: 'propertyValue'
                  })
                }}>新增对应</Button>
              </Col>
              <Col span='6'>
                <Button>全部导出</Button>
              </Col>
              <Col span='24'>
                <Table columns={columns} dataSource={dataSource} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="类目编辑" key="2">
            <Category onTabChange={(v)=>{
              this.setState({activeKey:v})
              dispatch(getCategoryValueOptions(selectCid))
            }}/>
          </TabPane>
          <TabPane tab="类目属性集编辑" key="3">
            <CategoryPropertyValueSet />
          </TabPane>
        </Tabs>

        <Modal title="新增对应" visible={this.state.visible}
          onOk={()=>this.handleSubmit()} onCancel={()=>this.setState({visible:false})}>
           <Form horizontal>
            <FormItem
              {...formItemLayout}
              required
              label="属性：">
              <Select combobox
                style={{ width: 120 }}
                placeholder="请输入属性"
                filterOption={false}
                onChange={(v)=>{
                  const listQuery ={
                    prefix: v,
                    caseSensitive: false,
                    limit: 10
                  }
                  const pv = []
                  dispatch(getProperties(listQuery))
                  dispatch(clearPropertyValues(pv))
                  this.setState({property:v})
                }}
                onBlur={
                  () =>{
                    const {property} = this.state
                    dispatch(getValuesForProperty(property, (propertyValues)=>{
                      const defaultValues = propertyValues.map((item)=>(item.vname))
                      this.setState({defaultValues})
                    }))
                  }
                }
                >
                {propertyOptions}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              required
              label="属性值：">
              <Select tags
                style={{ width: '100%' }}
                searchPlaceholder="输入属性值"
                onSearch={
                  (v) =>{
                    const listQuery ={
                      prefix: v,
                      caseSensitive: false,
                      limit: 10
                    }
                    dispatch(getValues(listQuery))
                  }
                }
                onChange={
                  (v) =>{
                    this.setState({values:v})
                  }
                }
                onSelect ={
                  (v) => {
                    const {
                      property,
                      propertyvalues
                    } = this.state
                    dispatch(addPropertyValueByNames(property, v, (propertyValue)=>{
                      propertyvalues.push(propertyValue)
                      this.setState(propertyvalues)
                    }))
                  }
                }
                onDeselect ={
                  (v) => {
                    let pid='',vids=[]
                    const {propertyvalues} = this.state
                    propertyvalues.map((item)=>{
                      if(item.vname == v){
                        pid = item.pid
                        vids.push(item.vid)
                      }
                    })
                    dispatch(delValuesForProperty(pid, vids))
                  }
                }
                >
                {valueOptions}
              </Select>
            </FormItem>
          </Form>
        </Modal>

      </section>
    )
  }
}

export default Edit