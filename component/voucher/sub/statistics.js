import React,{Component} from 'react'
import { connect } from 'react-redux'
import {searchType} from '../../../constant'
import {redirect} from '../../../util/history'
import {distinguishCashAndRegister} from '../../../util/kit'
import {
  Row,
  Col,
  Checkbox,
  Button,
  Table,
  Tabs,
  InputNumber,
  Modal,
  Select
} from 'antd'
import {
  getCurrentTab,
  getStats,
  getVoucherUsage,
  deleteVoucher,
  updateVoucherTotalCount,
  getVoucherTotalCountLog
} from '../../../action/voucher'
import './statistics.less'
const TabPane = Tabs.TabPane
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

@connect(state => ({
  currentTab: state.currentTab,
  rebateDataList: state.rebateDataList,
  cashDataList: state.cashDataList,
  primeTrialDataList: state.primeTrialDataList,
  voucherTotalCountLogs: state.voucherTotalCountLogs
}))
class Statistics extends Component{
  constructor(props) {
    super(props)
    this.state = {
      type:'',
      visible: false,
      key: 1,
      reissueNum: 1,
      id: 0,
      catalogCode: 'SG'
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    const {catalogCode} = this.state
    dispatch(getCurrentTab('Statistics'))
    dispatch(getStats(0,50,0,'SG'))
    dispatch(getStats(1,50,0,'SG'))
    dispatch(getStats(2,50,0,'SG'))
    dispatch(getStats(3,50,0,'SG'))
  }
  render(){
    const {
      rebateDataList,
      cashDataList,
      primeTrialDataList,
      registerDataList,
      dispatch,
      voucherTotalCountLogs
    } = this.props
    const {
      type,
      visible,
      key,
      reissueNum,
      id,
      catalogCode
    } = this.state
    console.log(cashDataList.length)
    const cashList = distinguishCashAndRegister(cashDataList).cashList
    const registerList = distinguishCashAndRegister(cashDataList).registerList
    const columns = [{
      title: '类型id',
      dataIndex: 'id',
      key: 'id',
      render: (text) =>(<a  onClick={()=>{
        dispatch(getVoucherUsage(text,50,0))
        redirect('/Query')
      }}>{text}</a>)
    },{
      title: '名称',
      dataIndex: 'Name',
      key: 'Name'
    },{
      title: '生成数量',
      dataIndex: 'createCount',
      key: 'createCount'
    },{
      title: '发放数量',
      dataIndex: 'givenCount',
      key: 'givenCount',
      render: (text,record) =>(<section>
        <p>{text}</p>
        <Button onClick={()=>{
          dispatch(getVoucherTotalCountLog(record.id,()=>{
            this.setState({
              visible:true,
              type:'log'
            })
          }))
        }}>补发记录</Button>
      </section>)
    },{
      title: '已使用数量',
      dataIndex: 'usedCount',
      key: 'usedCount'
    },{
      title: '图片',
      dataIndex: 'picture',
      key: 'picture',
      render: (text) => (<img src={text} alt=""/>)
    },{
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },{
      title: '操作',
      key: 'operate',
      render: (text,record) =>(<section>
        <Button onClick={()=>{
          this.setState({
            visible:true,
            type:'reissue',
            id:record.id
          })
        }}>补发</Button>
        <Button onClick={()=>{
          dispatch(deleteVoucher(record.id,()=>{
            dispatch(getStats(key-1,50,0,catalogCode))
          }))
        }}>删除</Button>
      </section>)
    }]
    const getTitle = () =>{
      const info = type == 'log'?'补发记录':'补发'
      return info
    }
    const getContent = () =>{
      const flag = type == 'log'
      if(flag){
        let infos = voucherTotalCountLogs.map((item)=>(<p>
          创建时间：{item.createDate},补发数量:{item.delta}
        </p>))
        infos = infos.length>0?infos:'没有补发记录'
        return infos
      }else{
        return (<InputNumber min={1} step={1} onChange={(v)=>this.setState({reissueNum:v})}/>)
      }
    }
    return (<section className="statistics">
        <Select value={catalogCode}  style={{width:100}} onChange={
          (v) => {
            this.setState({catalogCode:v})
            dispatch(getStats(0,50,0,v))
            dispatch(getStats(1,50,0,v))
            dispatch(getStats(2,50,0,v))
          }
        }>
          <Option key={0} value={'SG'}>SG</Option>
          <Option key={1} value={'MY'}>MY</Option>
          <Option key={2} value={'AU'}>AU</Option>
          <Option key={3} value={'TH'}>TH</Option>
          <Option key={4} value={'ID'}>ID</Option>
        </Select>
        <Tabs defaultActiveKey="1" onChange={(key)=>this.setState({key})}>
          <TabPane tab="满减券" key="1"><Table columns={columns} dataSource={rebateDataList} /></TabPane>
          <TabPane tab="现金红包券" key="2"><Table columns={columns} dataSource={cashList} /></TabPane>
          <TabPane tab="prime体验券" key="3"><Table columns={columns} dataSource={primeTrialDataList} /></TabPane>
          <TabPane tab="现金注册券" key="4"><Table columns={columns} dataSource={registerList} /></TabPane>
        </Tabs>
        <Modal title={getTitle()} visible={visible}
          onOk={()=>{
            if(type == 'reissue'){
              dispatch(updateVoucherTotalCount(id,reissueNum,()=>{
                dispatch(getStats(key-1,50,0))
                this.setState({visible:false})
              }))
            }
          }} onCancel={()=>this.setState({visible:false})}>
          {getContent()}
        </Modal>
      </section>)
  }
}
export default Statistics