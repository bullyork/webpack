import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Select, Row, Col, Button, Form, Input, Table, Modal, Icon, Tabs, Breadcrumb, Tag} from 'antd'
import {
  updateCategoryValueOptions,
  getCategoryValueOptions,
  getProperties,
  clearPropertyValues,
  getValues,
  addPropertyValueByNames,
  delValuesForProperty,
  getValuesForProperty
} from '../../../action/merchandise'
const FormItem = Form.Item
const Option = Select.Option
const concat = Array.concat
@connect(state => ({
  ValueOptions: state.ValueOptions,
  properties: state.properties,
  values: state.values,
  categoryTree: state.categoryTree
}))
class CategoryPropertyValueSet extends Component{
  constructor(props){
    super(props)
    this.state = {
      property: '',
      vs: [],
      ptype: 'multi',
      addOptions: {fixed:[],multi:[],single:[]},
      visible: false
    }
  }
  handleSubmit(){
    let update = this.props.ValueOptions

    const {
      categoryTree,
      dispatch
    } = this.props
    let selectCid
    for (let i = 0; i < 4; i++) {
      if(categoryTree[i].selected != -1){
        selectCid = categoryTree[i].selected
      }
    }
    const {
      ptype,
      addOptions,
      property
    } = this.state
    update.fixed = update.fixed?update.fixed:[]
    update.multi = update.multi?update.multi:[]
    update.single = update.single?update.single:[]
    update.fixed = concat([],update.fixed,addOptions.fixed)
    if(addOptions.multi.length>0){
      console.log(addOptions.multi)
      update.multi = concat([],update.multi,[{pname:property,pvs:addOptions.multi}])
    }
    if(addOptions.single.length>0){
      update.single = concat([],update.single,[{pname:property,pvs:addOptions.single}])
    }
    dispatch(updateCategoryValueOptions(selectCid, update))
    this.setState({visible:false})
  }
  render(){
    const {
      ValueOptions,
      properties,
      values,
      categoryTree,
      dispatch
    } = this.props
    const {
      property,
      vs
    } = this.state
    const propertyOptions = properties.map((item) =>{
      return (<Option key={item.name}>{item.name}</Option>)
    })
    const valueOptions = values.map((item) =>{
      return (<Option key={item.name}>{item.name}</Option>)
    })
    let selectCid
    for (let i = 0; i < 4; i++) {
      if(categoryTree[i].selected != -1){
        selectCid = categoryTree[i].selected
      }
    }
    let dataSourceForSet = []
    for (let key in ValueOptions) {
      if(key == 'fixed'){
        for (let i = 0; i < ValueOptions[key].length; i++) {
          let item = {}
          item.ptype = key
          item = Object.assign({},ValueOptions[key][i],item)
          dataSourceForSet.push(item)
        }
      }else{
        for (let i = 0; i < ValueOptions[key].length; i++) {
          for (let j = 0; j < ValueOptions[key][i].pvs.length; j++) {
            let item = {}
            item.ptype = key
            item = Object.assign({},ValueOptions[key][i].pvs[j],item)
            dataSourceForSet.push(item)
          }
        }
      }
    }
    console.log(dataSourceForSet)
    const columnsForSet = [{
      title: '属性',
      dataIndex: 'pname',
      key: 'pname'
    }, {
      title: '属性类型',
      dataIndex: 'ptype',
      key: 'ptype'
    }, {
      title: '属性值',
      dataIndex: 'vname',
      key: 'vname',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => {
        let update = ValueOptions
        let {
          single,
          multi,
          fixed
        } = ValueOptions
        return(
          <Button onClick={
            () => {
              switch (record.ptype) {
              case 'fixed':
                for (let i = 0; i < fixed.length; i++) {
                  if(fixed[i].pid == record.pid){
                    fixed.splice(i, 1)
                  }
                }
                update.fixed = fixed
                break;
              case 'single':
                for (let i = 0; i < single.length; i++) {
                  for (let j = 0; j < single[i].pvs.length; j++) {
                    if(single[i].pvs[j].pvid == record.pvid){
                      single[i].pvs.splice(j, 1)
                    }
                  }
                }
                update.single = single
                break;
              case 'multi':
                for (let i = 0; i < multi.length; i++) {
                  for (let j = 0; j < multi[i].pvs.length; j++) {
                    if(multi[i].pvs[j].pvid == record.pvid){
                      multi[i].pvs.splice(j, 1)
                    }
                  }
                }
                update.multi = multi
                break;
              default:
                for (let i = 0; i < multi.length; i++) {
                  for (let j = 0; j < multi[i].pvs.length; j++) {
                    if(multi[i].pvs[j].pvid == record.pvid){
                      multi[i].pvs.splice(j, 1)
                    }
                  }
                }
                update.multi = multi
                break;
            }
            dispatch(updateCategoryValueOptions(selectCid, update))
          }
          }>删除</Button>
        )
      }
    }]
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    }
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
    return(
      <section>
        <Breadcrumb>
          {breadcrumb}
        </Breadcrumb>
        <div>
          <Button onClick={
            () => {

              this.setState({
                visible: true,
                property: '',
                vs: [],
                addOptions: {fixed:[],multi:[],single:[]}
              })
            }
          }>添加属性和相应的属性值</Button>
        </div>
        <Table columns={columnsForSet} dataSource={dataSourceForSet}/>
         <Modal title="新增对应" visible={this.state.visible}
            onOk={()=>this.handleSubmit()} onCancel={()=>this.setState({visible:false})}>
             <Form horizontal>
              <FormItem
                {...formItemLayout}
                required
                label="属性：">
                <Select combobox value = {property}
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
                label="属性类型：">
                <Select defaultValue='多选属性' onChange={
                  (v) => {
                    this.setState({ptype:v})
                  }
                }>
                  <Option key={1} value='fixed'>固有属性</Option>
                  <Option key={2} value='multi'>多选属性</Option>
                  <Option key={3} value='single'>单选属性</Option>
                </Select>
              </FormItem>
              <FormItem
                {...formItemLayout}
                required
                label="属性值：">
                <Select tags value = {vs}
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
                      this.setState({vs:v})
                    }
                  }
                  onSelect ={
                    (v) => {
                      const {
                        property,
                        ptype,
                        addOptions
                      } = this.state
                      dispatch(addPropertyValueByNames(property, v, (propertyValue)=>{
                        addOptions[ptype].push(propertyValue)
                        this.setState({addOptions})
                      }))
                    }
                  }
                  onDeselect ={
                    (v) => {
                      let pid='',vids=[]
                      const {
                        addOptions,
                        ptype
                      } = this.state
                      addOptions[ptype].map((item)=>{
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
export default CategoryPropertyValueSet
