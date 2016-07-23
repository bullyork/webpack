import React,{Component} from 'react'
import {connect} from 'react-redux'
import { warn, success} from '../../../util/antd'
import {
  getUnderCarriage,
  addUnderCarriage,
  removeUnderCarriage,
  getCurrentTab,
  getCurrentFilter
} from '../../../action/shops'
import {Row, Col, Table, Button, Input, Upload, Icon} from 'antd'

@connect(state => ({
  underCarriageCids: state.underCarriageCids,
  filter: state.filter
}))
class UnderCarriageCids extends Component {
  componentWillMount(){
    const {dispatch} =  this.props
    dispatch(getCurrentTab('UnderCarriageCids'))
    dispatch(getUnderCarriage(10,0))
  }
  render(){
    const {
      underCarriageCids,
      dispatch,
      filter
    } = this.props
    const {
      cids,
      total
    } = underCarriageCids
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
              dispatch(removeUnderCarriage(record.cid,()=>{
                dispatch(getUnderCarriage(10,(current-1)*10))
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
        dispatch(getUnderCarriage(10,(current-1)*10))
        dispatch(getCurrentFilter({current}))
      }
    }
    const dataSource = cids.map((item,index) =>{
      return {cid:item}
    })
    const props = {
      name: 'file',
      action: '/api/shops/import/UnshelveCids',
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
    const propsProductUrl = {
      name: 'file',
      action: '/api/shops/import/UnshelveProduct',
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
    let linkToExportData = "api/shops/download/UnshelveProductTemplate";
    return (
      <section>
        <Row type="flex" justify="end">
        <Col span = '8' style = {{textAlign: 'left',marginBottom:'5px'}}>
          <Upload {...props}>
            <Button type="ghost">
              <Icon type="upload" /> Cid下架
            </Button>
          </Upload>
          <Upload {...propsProductUrl}>
            <Button type="ghost">
              <Icon type="upload" /> product url下架
            </Button>
          </Upload>
          <Button type="ghost">
            <a href={linkToExportData} className="export excelButton">Export productUrl Template</a>
          </Button>
        </Col>
        <Col span = '8' style = {{textAlign: 'center'}}><input className='ant-input' style={{width: '200px',marginRight:'10px'}} ref='addItem' placeholder={'添加cid'}/><Button type="primary" onClick={
          () => {
            let cid = this.refs.addItem.value
            cid = parseInt(cid)
            if(cid){
              dispatch(addUnderCarriage(cid,()=>{
                dispatch(getUnderCarriage(10,(current-1)*10))
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
export default UnderCarriageCids