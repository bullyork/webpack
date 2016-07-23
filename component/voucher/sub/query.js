import React,{Component} from 'react'
import { connect } from 'react-redux'
import {searchType} from '../../../constant'
import {
  Row,
  Col,
  Checkbox,
  Button,
  Table
} from 'antd'
import {
  getCurrentTab,
  getVoucherUsage
} from '../../../action/voucher'
const CheckboxGroup = Checkbox.Group

@connect(state => ({
  currentTab: state.currentTab,
  voucherUsageList: state.voucherUsageList
}))
class Query extends Component{
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('Query'))
  }
  render(){
    const {
      voucherUsageList
    } = this.props
    const columns =[{
      title:'券id',
      key: 'id',
      dataIndex:'id'
    },{
      title: '是否被领取',
      dataIndex: 'isGiven',
      key: 'isGiven'
    },{
      title: '是否被使用',
      dataIndex: 'isUsed',
      key: 'isUsed'
    },{
      title: '使用渠道',
      dataIndex: 'givenChanel',
      key: 'givenChanel'
    },{
      title: '领取人',
      dataIndex: 'customer',
      key: 'customer'
    }]
    return (<section className="statistics">
        <Table columns={columns} dataSource={voucherUsageList} />
      </section>)
  }
}
export default Query