import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeShift } from '../../action/d2d'
import moment from 'moment'
import { Button, Icon, Table, Select, Cascader, DatePicker, message } from 'antd'
import Fetch from 'fetch.io'
import shifts from './shifts'

const ButtonGroup = Button.Group

const D2D_API = new Fetch({ prefix: '/api/D2D' })
const columns = [{
  title: 'Shipment ID',
  dataIndex: 'shipmentIds',
  key: 'shipmentIds',
  width: 130
},{
  title: 'Customer ID',
  dataIndex: 'customerId',
  key: 'customerId',
  width: 120
},{
  title: 'Nickname',
  dataIndex: 'nickname',
  key: 'nickname',
  width: 120
},{
  title: 'Customer Name',
  dataIndex: 'customerName',
  key: 'customerName',
  width: 160
},{
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  width: 200
},{
  title: 'Post Code',
  dataIndex: 'postCode',
  key: 'postCode',
  width: 130
},{
  title: 'Phone',
  dataIndex: 'telephone',
  key: 'telephone',
  width: 150
},{
  title: 'Time',
  dataIndex: 'deliveryDate',
  key: 'deliveryDate',
  width: 160
},{
  title: 'Weight',
  dataIndex: 'weight',
  key: 'weight',
  width: 120,
  render (text) { return parseFloat(text).toFixed(2) }
},{
  title: 'Parcel No. & Memo',
  dataIndex: 'parcels',
  key: 'parcels',
  width: 160
}]

const manageBtns = [{
  text: 'Sync',
  fn () {
    this.setState({ loading : true })
    const hide = message.loading('syncing ... ')
    const { pendingJobs, selectedRowKeys, selectAll } = this.state
    const jobs = pendingJobs.filter(job => selectAll 
      ? true
      : selectedRowKeys.includes(job._id))
    D2D_API
      .post('/SyncPendingDeliveryJobs')
      .send({ jobs })
      .text()
      .then(responseText => {
        hide()
        if (responseText === '""') {
          message.success('Sync Success')
          this.setState({ selectedRowKeys: [], loading: false })
          this.fetchJobs()
        } else {
          this.setState({ loading: false })
          message.warn(responseText)
        }
      })
  }
}]


@connect(state => ({ shift: state.shift }))
class SyncJobs extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      selectedRowKeys: [],
      selectAll: false,
      loading: false,
      date: new Date(),
      pendingJobs: []
    }
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }

  onShiftChange(value) {
    const { dispatch } = this.props
    dispatch(changeShift(value))
  }

  onSelectAll(selected) {
    const { pendingJobs } = this.state
    this.setState({ selectAll: selected, selectedRowKeys: selected ?  pendingJobs.map((job, index) => index) : []})
  }

  fetchJobs() {
    this.setState({ loading: true })
    const { shift } = this.props
    const ds = moment(this.state.date)
    D2D_API
      .post('/FindPendingDeliveryJobs')
      .send({filter: {
        catalogCode: shift[0],
        shift: shift[1],
        dateInt: Number(ds.format('YYYYMMDD'))
      }})
      .json()
      .then(res => {
        this.setState({ pendingJobs: res, loading: false})
      })
  }


  onDateChange (date) {
    this.setState({ date })
  }

  render () {
    const { 
      selectedRowKeys,
      pendingJobs,
      date,
      loading
    } = this.state

    pendingJobs.forEach((job, index) => {
      job.shipmentIds = ''
      job.weight = 0
      job.parcels = ''
      job.shipments.forEach(shipment => {
        job.weight += shipment.weight
        job.shipmentIds = job.shipmentIds + shipment.shipmentId + ','
        job.parcels = job.parcels + shipment.parcelNo + ' ' + shipment.memo + ','
      })
      job.shipmentIds = job.shipmentIds.slice(0, job.shipmentIds.length - 1)
      job.parcels = job.parcels.slice(0, job.parcels.length - 1)
      job._id = index
    })

    const mbs = manageBtns.map(btn => (
        <Button type="primary" size="small" key={btn.text} onClick={btn.fn.bind(this)} disabled={selectedRowKeys.length === 0}>{btn.text}</Button>
    ))
    const rowSelection = {
      selectedRowKeys,
      onSelectAll: this.onSelectAll.bind(this),
      onChange: this.onSelectChange.bind(this)
    }

    return (
      <div>
        <h4>Job Management</h4>
        <div>
          <ButtonGroup style={{marginTop:5, marginBottom:5}}>{mbs}</ButtonGroup>
          <Button type="primary" style={{float: 'right', marginLeft: 5}} onClick={this.fetchJobs.bind(this)}>Fetch</Button>
          <DatePicker onChange={this.onDateChange.bind(this)} style={{float: 'right', marginLeft: 5}} value={date} />
          <Cascader placeholder="Show All" options={shifts} style={{float: 'right'}} allowClear={false} displayRender={label => label.join('-')} value={this.props.shift} onChange={this.onShiftChange.bind(this)}/>
        </div>
        <Table 
          loading={loading}
          rowKey={record => record._id}
          columns={columns} 
          dataSource={pendingJobs}
          rowSelection={rowSelection} />
      </div>
    )
  }
}

export default SyncJobs