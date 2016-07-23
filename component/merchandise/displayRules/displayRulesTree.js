import React,{Component} from 'react'
import { connect } from 'react-redux'
import {redirect} from '../../../util/history'
import {Row,Col,Input,Button,Modal,Form,Radio} from 'antd'
import { warn, success } from '../../../util/antd'
import './displayRulesTree.less'
import { 
  adminDisplayCateList,
  adminDisplayCateUpdate
} from '../../../action/merchandise'
const assign = Object.assign
const FormItem = Form.Item
const RadioGroup = Radio.Group
@connect(state =>({
  displayTree: state.displayTree,
}))
class DisplayRulesTree extends Component{
  constructor(props){
    super(props)
    this.state={
      id: 0,
      visible: false,
      name:'',
      disabled: false,
      index: 0
    }
  }
  componentWillMount(){
    const {
      dispatch
    } = this.props
    dispatch(adminDisplayCateList(0,0))
  }
  render(){
    const {
      dispatch,
      displayTree
    } = this.props
    const {
      id,
      visible,
      name,
      disabled,
      index
    } = this.state
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    }
    let displayTreeItems = []
    for (let i = 0; i < 4; i++) {
      const items = displayTree[i].all.map((item)=>{
        const disabled = item.disabled
        const selectFlag = item.id == displayTree[i].selected
        let style = {borderBottom:'1px dashed #d9d9d9',fontSize:'15px',padding:'5px 0',textAlign:"center"}
        if(!disabled){
          if(selectFlag){
            style = assign({},style,{background:"rgba(24, 115, 216, 0.7)",cursor: "pointer",color:"white"})
          }else{
            style = assign({},style,{cursor: "pointer"})
          }
        }else{
          style = assign({},style,{background:"#e7e2e7"})
        }
        return (
          <Col span="24" key={item.id} style={style}
            onClick ={
              () => {
                dispatch(adminDisplayCateList(item.id, i))}
            }>
              <span>{item.name}</span>
              <Row type="flex" justify="center">
                <Button size="small" onClick={()=>
                  this.setState({
                    visible:true,
                    id:item.id,
                    disabled:false,
                    index: i,
                    name: item.name
                  })
                }>更新</Button>
              </Row>
          </Col>
        )
      })
      const formFlag = (i==0)||(displayTree[i-1].selected!=-1)
      displayTreeItems.push(
        <Col span="6">
          <Row className='displayTreeItem'>
            {items}
          </Row>
        </Col>
      )
    }
    return (<section className="displayTree">
      <Row className="treeContainer">
        {displayTreeItems}
      </Row>
      <Modal title='更新类目状态' visible={visible}
        onOk={()=>{
          if(!name){
            warn('名字不能为空！')
            return
          }
          dispatch(adminDisplayCateUpdate(id,name,disabled,()=>{
            this.setState({visible:false})
            let parent = 0
            if(index>0){
              parent = displayTree[i-1].selected
            }
            dispatch(adminDisplayCateList(parent, index))
          }))
        }} onCancel={()=>this.setState({visible:false})}>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            required
            label="新名字：">
            <Input value={name} onChange={(e)=>this.setState({name:e.target.value})} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            required
            label="是否禁用：">
            <RadioGroup onChange={(e)=>this.setState({disabled:e.target.value})} defaultValue={false}>
              <Radio key="a" value={true}>是</Radio>
              <Radio key="b" value={false}>否</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Modal>
    </section>)
  }
}
export default DisplayRulesTree