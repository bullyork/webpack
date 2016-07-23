import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import store from '../../store/d2d'
import { Button, Table, Select, Cascader, DatePicker } from 'antd'
import { findDeliveryJobs, lockDeliveryJobs, unlockDeliveryJobs } from '../../action/d2d'

const ButtonGroup = Button.Group
const options = [{
  value: 'sg',
  label: 'sg',
  children: [{
    value: 'day',
    label: 'day'
  },{
    value: 'night',
    label: 'night'
  },{
    value: 'big',
    label: 'big'
  }]
}]

const columns = [{
  title: 'Priority',
  dataIndex: 'priorityName',
  key: 'priorityValue',
  width: 80,
  sorter: (a, b) => a.priorityValue > b.priorityValue
},{
  title: 'Nick Name',
  dataIndex: 'nickName',
  key: 'nickName',
  width: 120
},{
  title: 'Shipment ID',
  dataIndex: 'shipmentId',
  key: 'shipmentId',
  width: 80
},{
  title: 'Customer Name',
  dataIndex: 'customerName',
  key: 'customerName',
  width: 100
},{
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  width: 150
},{
  title: 'Post Code',
  dataIndex: 'postCode',
  key: 'postCode',
  width: 100,
  sorter: (a, b) => a.postCode > b.postCode
},{
  title: 'Phone',
  dataIndex: 'telephone',
  key: 'telephone',
  width: 80,
  sorter: (a, b) => a.telephone > b.telephone
},{
  title: 'Time',
  dataIndex: 'deliveryTime',
  key: 'deliveryTime',
  width: 100
},{
  title: 'Weight',
  dataIndex: 'weight',
  key: 'weight',
  width: 80,
  sorter: (a, b) => parseFloat(a.weight) > parseFloat(b.weight)
},{
  title: 'Parcel No. & Memo',
  dataIndex: 'parcels',
  key: 'parcels',
  width: 150
},{
  title: 'Driver',
  dataIndex: 'driverName',
  key: 'driverId',
  width: 80,
  sorter: (a, b) => a.driverName > b.driverName
},{
  title: 'SMS Status',
  dataIndex: 'smsStatus',
  key: 'smsStatus',
  width: 80
},{
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  width: 80
}]

const displayBtns = [{
  text: 'Display All',
  show () {
    this.setState({display: 'all'})
  }
},{
  text: 'Display Completed',
  show () {
    this.setState({display: 'completed'})
  }
},{
  text: 'Display Uncompleted',
  show () {
    this.setState({display: 'uncompleted'})
  }
}]

const manageBtns = [{
  text: 'Lock',
  fn () {
    const { dispatch } = this.props
    dispatch(lockDeliveryJobs(this.state.selectedRowKeys, () => {
      this.setState({selectedRowKeys: []})
      this.reloadJobs()
    }))
  }
},{
  text: 'Unlock',
  fn () {
    const { dispatch } = this.props
    dispatch(unlockDeliveryJobs(this.state.selectedRowKeys, () => {
      this.setState({selectedRowKeys: []})
      this.reloadJobs()
    }))
  }
},{
  text: 'Delete',
  fn () {
    const { dispatch } = this.props
    //delete jobs
  }
}]


@connect(state => ({jobs: state.jobs}))
class Main extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      display: 'all',
      shift: 'day',
      loading: false,
      selectedRowKeys: []
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    this.reloadJobs()
  }

  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys})
  }

  reloadJobs(value) {
    const { dispatch } = this.props
    this.setState({loading: true})
    dispatch(findDeliveryJobs({shift: value || this.state.shift}, () => this.setState({loading: false})))
  }

  onShiftChange(value) {
    const { dispatch } = this.props
    this.reloadJobs(value[1])
  }


  onDateChange(value) {
    
  }

  render () {
    const { selectedRowKeys } = this.state

    const mbs = manageBtns.map(btn => {
      return (
        <Button type="primary" size="small" key={btn.text} onClick={btn.fn.bind(this)} disabled={selectedRowKeys.length === 0}>{btn.text}</Button>
      )
    })

    const jobs = this.props.jobs.filter(job => {
      switch (this.state.display) { 
        case 'all':
          return true
        case 'completed':
          return job.status === 'completed'
        case 'uncompleted':
          return job.status === 'uncompleted'
      }
    })

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this)
    }

    const pagination = {
      total: jobs.length
    }

    return (
      <div>
        <div>
          <h4>Job Management</h4>
          <div>
            <ButtonGroup style={{marginTop:5, marginBottom:5}}>{mbs}</ButtonGroup>
            <DatePicker onChange={this.onDateChange.bind(this)} style={{float: 'right', marginLeft: 5}} />
            <Cascader placeholder="Show All" options={options} style={{float: 'right'}} displayRender={label => label.join('-')} onChange={this.onShiftChange.bind(this)}/>
          </div>
        </div>
        <Table columns={columns} dataSource={jobs} rowKey={record => record.ID} loading={this.state.loading} rowSelection={rowSelection} style={{fontSize: 1 + 'rem'}} />
      </div>
    )
  }
}

export default Main