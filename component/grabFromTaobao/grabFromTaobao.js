import React,{Component} from 'react'
import { warn, success} from '../../util/antd'
import {Row,Col,Form,Input,InputNumber,Button,Alert} from "antd"
import { connect } from 'react-redux'
import {
  searchSubmit,
  getData,
  queryData
} from '../../action/grabFromTaobao'
import {searchQuery} from '../../api/grabFromTaobao'
const FormItem = Form.Item
@connect(state =>({
  data: state.data,
  info: state.info
}))
@Form.create()
class GrabFromTaobao extends Component{

  componentWillReceiveProps(nextProps){
    const {data,dispatch} = this.props
    const {info} = nextProps
    if(info && !data){
      searchQuery(info.url,info.page)
      .then(result =>{
        if(result.code == 0){
          dispatch(queryData(result.url))
        }
      })
    let t = setInterval(()=>{
        searchQuery(info.url,info.page)
        .then(result =>{
          if(result.code == 0){
            dispatch(queryData(result.url))
            window.clearInterval(t)
          }
        })
      }, 2000)
    }
  }
  render(){
    const {
      dispatch,
      data,
      info
    } = this.props
    const { getFieldProps } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const getButton = () =>{
      if(data){
        return (<Button onClick={ () => {
          dispatch(queryData(''))
          window.location.href = "/api/files?filename="+data
        }} >点击下载</Button>)
      }else{
        return (<Button disabled>点击下载</Button>)
      }
    }
    return(
      <section style={{marginTop:40}}>
        <Alert message="商品默认导入prime" type="success" />
        <Form horizontal onSubmit={(e) =>{
          e.preventDefault()
          dispatch(queryData(''))
          dispatch(getData(this.props.form.getFieldsValue()))
          dispatch(searchSubmit(this.props.form.getFieldsValue().url,this.props.form.getFieldsValue().page))
        }}>
          <FormItem
            {...formItemLayout}
            label="url：">
            <Input type="text" {...getFieldProps('url')} placeholder="请输入url" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="页数：">
            <InputNumber min={1} step={1}  {...getFieldProps('page')} />
          </FormItem>
          <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
          <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
            {getButton()}
          </FormItem>
        </Form>
      </section>
      )
  }
}
export default GrabFromTaobao