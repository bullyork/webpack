import React,{Component} from 'react'
import {connect} from 'react-redux'
import { warn, success} from '../../../util/antd'
import {
  getTransBySea,
  addTransBySea,
  removeTransBySea,
  getCurrentTab,
  getCurrentFilter
} from '../../../action/shops'
import {Row, Col, Table, Button, Input, Upload, Icon} from 'antd'

@connect(state => ({
  seaCids: state.seaCids,
  filter: state.filter
}))
class SeaCids extends Component {
  componentWillMount(){
    const {dispatch} =  this.props
    dispatch(getCurrentTab('SeaCids'))
    dispatch(getTransBySea(10,0))
  }
  render(){
    const {
      seaCids,
      dispatch,
      filter
    } = this.props
    const {
      cids,
      total
    } = seaCids
    const {current} = filter
    let pages = Math.ceil(total/10)
    const columns = [{
      title: 'cid',
      dataIndex: 'cid',
      key: 'cid',
    }, {
      title: '操作',
      render: (text, record) => {
        return(<section>
            <Button onClick={() =>{
              dispatch(removeTransBySea(record.cid,()=>{
                dispatch(getTransBySea(10,(current-1)*10))
              }))
            }
            }>删除</Button>
          </section>)
      }
    }]
    const pagination = {
      total: total,
      current: current,
      showSizeChanger: false,
      onChange(current) {
        dispatch(getTransBySea(10,(current-1)*10))
        dispatch(getCurrentFilter({current}))
      }
    }
    const dataSource = cids.map((item,index) =>{
      return {cid:item}
    })
    const props = {
      name: 'file',
      action: '/api/shops/import/ShipCids',
      showUploadList: false,
      onChange: (info) => {
         if (info.file.status === 'done') {
          success(`${info.file.name} 上传成功。`)
          console.log(info.file.response)
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    return (
      <section>
        <Row type="flex" justify="end" >
        <Col span = '8' style = {{textAlign: 'center',marginBottom:'5px'}}>
          <Upload {...props}>
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </Col>
        <Col span = '8' style = {{textAlign: 'center'}}><input className='ant-input' placeholder={'添加cid'} style={{width: '200px',marginRight:'10px'}} ref='addItem' /><Button type="primary" onClick={
          () => {
            let cid = this.refs.addItem.value;
            cid = parseInt(cid)
            if(cid){
              dispatch(addTransBySea(cid,()=>{
                dispatch(getTransBySea(10,(current-1)*10))
              }))
            }else{
              warn('请输入cid！')
            }
          }
        }>确定</Button></Col>
        <Col span = '4' style = {{textAlign: 'right'}}>第{current}页－总{pages}页</Col>
        <Col span = '4' style = {{textAlign: 'right'}}>total:{total}</Col>
        <Col span="24">
          <Table dataSource={dataSource} columns={columns} pagination={pagination}/>
        </Col>
        </Row>
      </section>
    )
  }
}
export default SeaCids