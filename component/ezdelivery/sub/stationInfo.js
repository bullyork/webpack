import React,{Component} from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Select,
  Table
} from 'antd'
import { redirect } from '../../../util/history'
import { success,warn } from '../../../util/antd'
import {
  getCurrentTab,
  getStationsInfo
} from '../../../action/ezdelivery'
const Option = Select.Option

@connect(state => ({
  stationsInfo:state.stationsInfo
}))
class StaionsInfo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      catelog:'SG'
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('StaionInfo'))
    dispatch(getStationsInfo('SG'))
  }
  render(){
    const {
      dispatch,
      stationsInfo
    } = this.props
    const {catelog} = this.state
    const columns=[{
      title:'名字',
      dataIndex: 'name',
      key: 'name',
    },{
      title: 'pkgWeight(kg)',
      dataIndex:'pkgWeight',
      key: 'pkgWeight'
    },{
      title: 'chargeWeight(kg)',
      dataIndex:'chargeWeight',
      key: 'chargeWeight'
    },{
      title: 'maxWeight(kg)',
      dataIndex:'maxWeight',
      key: 'maxWeight'
    }]
    return (
      <section>
        <Select value={catelog}  style={{width:100,marginBottom:10}} onChange={
          (v) => {
            this.setState({catelog:v})
            dispatch(getStationsInfo(v))
          }
        }>
          <Option key={0} value={'SG'}>SG</Option>
          <Option key={1} value={'MY'}>MY</Option>
          <Option key={2} value={'AU'}>AU</Option>
          <Option key={3} value={'TH'}>TH</Option>
          <Option key={4} value={'ID'}>ID</Option>
        </Select>
        <Table columns={columns} dataSource={stationsInfo} />
      </section>
    )
  }
}

export default StaionsInfo