import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Select,Row,Col,Button,Icon,Modal,Form,Input} from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import {
  getCategories,
  getSubCategories,
  getPrefix,
  addCategory,
  delCategory,
  updateSubCategories,
  disableCategory,
  renameCategory
} from '../../../action/merchandise'
import './category.less'
@connect(state=>({
  categoryTree: state.categoryTree,
  preCategories: state.preCategories,
  prefix: state.prefix
}))
class Category extends Component{
  constructor(props){
    super(props)
    this.state={
      categoryName: '',
      cid: 0,
      newCategoryName:'',
      visible: false,
      index: 0
    }
  }
  componentWillMount(){
    const query = {
      prefix: '',
      caseSensitive: false,
      limit: 0
    }
    const {dispatch} = this.props
    dispatch(getCategories(query, 0, 0))
  }
  handleClick(){
    const {onTabChange} = this.props
    onTabChange('3')
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    }
    const{
      dispatch,
      categoryTree,
      preCategories,
      prefix
    } = this.props
    const {
      cid,
      newCategoryName,
      visible,
      index
    } = this.state
    const translation ={MY:'',CN:''}
    const {categoryName} = this.state
    const preCategoriesOptions = preCategories.map((item) =>(<Option key={item.cid}>{item.name}</Option>))
    let selectArea = []
    for (let i = 0; i < 4; i++) {
      const {
        selected,
        prefixCategories,
        all
      } = categoryTree[i]
      const optionArray = prefixCategories.length>0?prefixCategories:all
      const options = optionArray.map((item) =>{
        const disabled = item.disabled
        const flag = item.cid == selected
        if(!disabled){
          if(flag){
            return(
              <Col span="24" key={item.cid}
                style={{borderBottom:'1px dashed #d9d9d9',fontSize:'15px',padding:'5px 0',background:"rgba(24, 115, 216, 0.7)",cursor: "pointer",color:"white",textAlign:"center"}}
                onClick ={
                  () => {
                    dispatch(getSubCategories(item.cid, i))}
                }>
                  <span>{item.name}</span>
                  <Row type="flex" justify="space-around">
                    <Button size="small" onClick={
                      (e) => {
                        e.preventDefault()
                        dispatch(disableCategory(item.cid, true, ()=>{
                          const query ={
                            prefix: prefix[i],
                            caseSensitive: false,
                            limit: 10
                          }
                          if(i>0){
                            dispatch(getCategories(query, categoryTree[i-1].selected, i))
                          }else{
                            const queryAll ={
                              prefix:'',
                              caseSensitive: false,
                              limit: 0
                            }
                            dispatch(getCategories(queryAll, 0, 0))
                          }
                        }))
                      }
                    }>停用</Button>
                    <Button size="small" onClick={()=>{
                      this.setState({
                        cid:item.cid,
                        visible: true,
                        index: i,
                        newCategoryName: ''
                      })
                    }}>重命名</Button>
                  </Row>
              </Col>
            )
          } else {
            return(
              <Col span="24" key={item.cid} style={{borderBottom:'1px dashed #d9d9d9',fontSize:'15px',padding:'5px 0',cursor: "pointer",textAlign:"center"}}
                onClick ={
                  () => {
                    dispatch(getSubCategories(item.cid, i))}
                }>
                  <span>{item.name}</span>
                  <Row type="flex" justify="space-around">
                    <Button size="small" onClick={
                      (e) => {
                        e.preventDefault()
                        dispatch(disableCategory(item.cid, true, ()=>{
                          const query ={
                            prefix: prefix[i],
                            caseSensitive: false,
                            limit: 10
                          }
                          if(i>0){
                            dispatch(getCategories(query, categoryTree[i-1].selected, i))
                          }else{
                            const queryAll ={
                              prefix:'',
                              caseSensitive: false,
                              limit: 0
                            }
                            dispatch(getCategories(queryAll, 0, 0))
                          }
                        }))
                      }
                    }>停用</Button>
                    <Button size="small" onClick={()=>{
                      this.setState({
                        cid:item.cid,
                        visible: true,
                        index: i,
                        newCategoryName: ''
                      })
                    }}>重命名</Button>
                  </Row>
              </Col>
            )
          } 
        } else {
          return (
            <Col span="24" key={item.cid} style={{borderBottom:'1px dashed #d9d9d9',fontSize:'15px',padding:'5px 0',cursor: "pointer",textAlign:"center",background:"#e7e2e7"}}
                onClick ={
                  () => {
                    dispatch(getSubCategories(item.cid, i))}
                }>
                  <span>{item.name}</span>
                  <Row type="flex" justify="center">
                    <Button size="small" onClick={
                      (e) => {
                        e.preventDefault()
                        dispatch(disableCategory(item.cid, false, ()=>{
                          const query ={
                            prefix: prefix[i],
                            caseSensitive: false,
                            limit: 10
                          }
                          if(i>0){
                            dispatch(getCategories(query, categoryTree[i-1].selected, i))
                          }else{
                            dispatch(getCategories(query, 0, 0))
                          }
                        }))
                      }
                    }>重启</Button>
                  </Row>
              </Col>
            )
        }
      })
      const formFlag = (i==0)||(categoryTree[i-1].selected!=-1)
      const inputArea = formFlag && (
        <section>
          <Select combobox
            style={{ width: 120 }}
            onChange={(v) =>{
              const query = {
                prefix: v,
                caseSensitive: false,
                limit: 10
              }
              this.setState({categoryName:v})
              dispatch(getCategories(query,-1,10))
            }}
            filterOption={false}
            placeholder="添加类目" >
            {preCategoriesOptions}
          </Select>
          <Button onClick={
            () => {
              let parent
              if(i == 0){
                parent = 0
              }else{
                parent = categoryTree[i-1].selected
              }
              dispatch(addCategory(categoryName,parent,translation,(category)=>{
              const query ={
                prefix: '',
                caseSensitive: false,
                limit: 0
              }
              if(i>0){
                dispatch(getPrefix('', i))
                dispatch(getSubCategories(categoryTree[i-1].selected,i-1))
              }else{
                dispatch(getPrefix('', 0))
                dispatch(getSubCategories(0,0))
              }
            }))
            }
          }>确定</Button>
          <input className="ant-input inputCategory" onChange ={(e) => {
            const query ={
              prefix: e.target.value,
              caseSensitive: false,
              limit: -1
            }
            dispatch(getPrefix(e.target.value, i))
            if(i>0){
              dispatch(getCategories(query, categoryTree[i-1].selected, i))
            }else{
              dispatch(getCategories(query, 0, 0))
            }
          }} placeholder="输入类目" />
        </section>
        )
        const selectItem = (
          <Col key={i} span="6" style={{paddingRight: "10px"}}>
            {inputArea}
            <Row type="flex">
              {options}
            </Row>
          </Col>
        )
        selectArea.push(selectItem)
    }
    return(<Row type="flex" className="categoryEdit">
        {selectArea}
        <Button onClick={()=>this.handleClick()}>确定</Button>
        <Modal title="新增对应" visible={visible}
          onOk={()=>{
            dispatch(renameCategory(cid,newCategoryName,translation,()=>{
              const query ={
                prefix: prefix[index],
                caseSensitive: false,
                limit: 10
              }
              if(index>0){
                dispatch(getCategories(query, categoryTree[index-1].selected, index))
              }else{
                dispatch(getCategories(query, 0, 0))
              }
              this.setState({visible:false})
            }))
          }} onCancel={()=>this.setState({visible:false})}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              required
              label="新名字：">
              <Input value={newCategoryName} onChange={(e)=>this.setState({newCategoryName:e.target.value})} />
            </FormItem>
          </Form>
        </Modal>
      </Row>)
  }
}
export default Category
