import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import store from '../../store/d2d'
import shifts from './shifts'
import { Button, Icon, Table, Select, Cascader, DatePicker, Input, Form, Modal, message } from 'antd'
import { findDeliveryJobs, updateDeliveryJob, lockDeliveryJobs, unlockDeliveryJobs, deleteDeliveryJobs, changeShift } from '../../action/d2d'

const ButtonGroup = Button.Group
const FormItem = Form.Item

const columns = [{
  title: 'Shipment ID',
  dataIndex: 'shipmentIds',
  key: 'shipmentIds',
  width: 130
},{
  title: 'Priority',
  dataIndex: 'priority',
  key: 'priority',
  width: 120,
  sorter: true
},{
  title: 'Nick Name',
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
  width: 150
},{
  title: 'Post Code',
  dataIndex: 'postCode',
  key: 'postCode',
  width: 130,
  sorter: true
},{
  title: 'Phone',
  dataIndex: 'telephone',
  key: 'telephone',
  width: 100,
  sorter: true
},{
  title: 'Time',
  dataIndex: 'deliveryDate',
  key: 'deliveryDate',
  width: 100
},{
  title: 'Weight',
  dataIndex: 'weight',
  key: 'weight',
  width: 100,
  sorter: true,
  render (text) { return parseFloat(text).toFixed(2) }
},{
  title: 'Parcel No. & Memo',
  dataIndex: 'parcels',
  key: 'parcels',
  width: 230
},{
  title: 'Driver',
  dataIndex: 'driverName',
  key: 'driverId',
  width: 100,
  filters: [],
  onFilter: (value, record) => record.driverNo == value
},{
  title: 'Latitude',
  dataIndex: 'latitude',
  key: 'latitude',
  width: 120,
  render (text, record) {return text ? parseFloat(text).toFixed(2) : 0}
},{
  title: 'Longitude',
  dataIndex: 'longitude',
  key: 'longitude',
  width: 120,
  render (text, record) {return text ? parseFloat(text).toFixed(2) : 0}
},{
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  width: 80
},{
  title: 'Lock Status',
  dataIndex: 'isLocked',
  key: 'isLocked',
  width: 120,
  render (text) {return text 
    ? (<Icon style={{ fontSize: '1.5rem', color: 'red'}} type="lock" />) 
    : (<Icon style={{ fontSize: '1.5rem', color: 'green'}} type="unlock" />)
  }
},{
  title: 'Operation',
  dataIndex: 'operation',
  key: 'operation',
  fixed: 'right',
  width: 100
}]

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

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
    if (confirm("Are you sure wanna delete?")) {
      const hide = message.loading('deleting ...')
      dispatch(deleteDeliveryJobs(this.state.selectedRowKeys, () => {
        this.setState({selectedRowKeys: []})
        hide()
        this.reloadJobs()
      }))
    }
  }
}]


@connect(state => ({jobs: state.jobs, shift: state.shift}))
class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      driverFilter: [],
      loading: false,
      selecteAll: false,
      showInvalid: false,
      date: new Date(),
      editingJob: {},
      selectedRowKeys: [],
      sortInfo: {}
    }
  }

  componentWillMount() {
    columns[columns.length - 1].render = (text, record) => {
      return (
        <Button
          onClick={() => {
            this.setState({editingJob: record})
          }}
          type="primary">
          <Icon type="edit" />
        </Button>
      )
    }     
  }

  componentDidMount () {
    this.reloadJobs()
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }

  updateJob(job) {
    const { dispatch } = this.props
    this.setState({editingJob: {}})
    const hide = message.loading('processing...')
    dispatch(updateDeliveryJob(job, () => {
      hide()
      this.reloadJobs()
    }))
  }

  onCancel() {
    this.setState({editingJob: {}})
  }

  reloadJobs(filter = {}) {
    const { dispatch, shift } = this.props
    this.setState({loading: true})
    const ds = moment(filter.date || this.state.date)
    dispatch(findDeliveryJobs({catalogCode: filter.catalogCode || shift[0], shift: filter.shift || shift[1], dateInt: Number(ds.format('YYYYMMDD'))}, jobs => {
      if (jobs && Object.prototype.toString(jobs) === '[object Object]') {
        columns.forEach(col => {
          if (col.key === 'driverId') {
            col.filters = []
            const ids = []
            for (let i = 0, length = jobs.length; i < length; i++) {
              if (!ids.includes(jobs[i].driverNo) && !!jobs[i].driverName) {
                ids.push(jobs[i].driverNo)
                col.filters.push({text: jobs[i].driverName, value: jobs[i].driverNo})
              }
            }         
          }
        })
      }
      this.setState({loading: false})
    }))
  }

  onShiftChange(value) {
    const { dispatch } = this.props
    dispatch(changeShift(value))
    this.reloadJobs({ catalogCode: value[0], shift: value[1]})
  }

  onSelectAll(selected) {
    const { jobs } = this.props
    this.setState({ selectedRowKeys: selected ? jobs.map(job => job.ID) : [] })
  }


  onDateChange(date) {
    this.setState({ date })
    this.reloadJobs({ date })
  }

  handleTableChange(pagination, filters, sorter) {
    this.setState({driverFilter: filters.driverId, sortInfo: sorter})
  }

  render () {
    const { selectedRowKeys, driverFilter, sortInfo, showInvalid, date } = this.state
    const { shift } = this.props

    const mbs = manageBtns.map(btn => (
        <Button type="primary" size="small" key={btn.text} onClick={btn.fn.bind(this)} disabled={selectedRowKeys.length === 0}>{btn.text}</Button>
    ))

    mbs.push((
      <Button type="primary" size="small" onClick={() => {
        if (driverFilter.length != 1) {
          message.warn('please filter only one driver')
          return
        }
        window.open(`d2dReport/index.html?catalogCode=${shift[0]}&shift=${shift[1]}&driverNo=${driverFilter[0]}`)
      }}>Print</Button>
    ))

    const jobs = this.props.jobs
        .filter(job => 1==1)

    jobs.forEach(job => {
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
    })

    switch (sortInfo.field) {
      case 'weight':
        jobs.sort((next, prev) => sortInfo.order === 'ascend' 
            ? (parseFloat(next.weight) > parseFloat(prev.weight) ? 1 : -1)
            : (parseFloat(next.weight) < parseFloat(prev.weight) ? 1 : -1))
        break
      case 'priorityName':
      case 'postCode':
      case 'telephone':
        jobs.sort((next, prev) => sortInfo.order === 'ascend' 
          ? (next[sortInfo.field] > prev[sortInfo.field] ? 1 : -1)
          : (next[sortInfo.field] < prev[sortInfo.field] ? 1 : -1))
        break
      default:
        break
    }

    const rowSelection = {
      selectedRowKeys,
      onSelectAll: this.onSelectAll.bind(this),
      onChange: this.onSelectChange.bind(this)
    }

    const pagination = { total: jobs.length }

    return (
      <div>
        <div>
          <h4>Job Management</h4>
          <div>
            <ButtonGroup style={{marginTop:5, marginBottom:5}}>{mbs}</ButtonGroup>
            <DatePicker onChange={this.onDateChange.bind(this)} style={{float: 'right', marginLeft: 5}} value={date} />
            <Cascader placeholder="Show All" options={shifts} style={{float: 'right'}} allowClear={false} displayRender={label => label.join('-')} value={this.props.shift} onChange={this.onShiftChange.bind(this)}/>
          </div>
        </div>
        <Table columns={columns} 
          dataSource={jobs.filter(job => this.state.showInvalid ? job.latitude === 0 && job.longitude === 0 : true)} 
          locale={{filterConfirm: 'Confirm', filterReset: 'Reset'}}
          rowKey={record => record.ID} 
          loading={this.state.loading} 
          rowSelection={rowSelection} 
          scroll={{x: 1500}}
          footer={() => {
            return jobs.filter(job => !job.latitude && !job.longitude).length > 0 
              ? (
                <div style={{color: 'red', fontSize: '1.4rem'}}>
                  {'There are some jobs with no latitude or longitude, try to fullfill them manually.'}
                  <a href='javascript:;' onClick={() => this.setState({showInvalid: !showInvalid})}>
                    {showInvalid ? 'Show All' : 'Click here to show these jobs'}
                  </a>
                </div>
              )
              : null
          }}
          onChange={this.handleTableChange.bind(this)}
          style={{fontSize: 1 + 'rem'}} />

        <EditLatLngDialog 
          showEdit={!!this.state.editingJob.ID} 
          editingJob={this.state.editingJob}
          updateJob={this.updateJob.bind(this)} 
          onCancel={this.onCancel.bind(this)} />
      </div>
    )
  }
}


@Form.create()
class EditLatLngDialog extends Component {
  render () {
    const { getFieldProps, getFieldValue } = this.props.form
    const { editingJob, updateJob } = this.props

    const shipmentIdProps = getFieldProps('shipmentId',{
      initialValue: editingJob.shipmentIds || ''
    })
    const latitudeProps = getFieldProps('latitude', {initialValue: editingJob.latitude || ''})
    const longitudeProps = getFieldProps('longitude', {initialValue: editingJob.longitude || ''})
    return (
      <div>
        <Modal
          title="Edit lat&lng"
          visible={this.props.showEdit}
          onOk={() => {
            const lat = parseFloat(getFieldValue('latitude'))
            const lng = parseFloat(getFieldValue('longitude'))
            if (isNaN(lat) || lat < -90 || lat > 90) {
              message.warn('invalid latitude')
              return
            } else if (isNaN(lng) || lng < -180 || lng > 180) {
              message.warn('invalid longitude')
              return
            }
            updateJob(Object.assign({}, editingJob, {latitude: lat, longitude: lng}))
          }}
          onCancel={this.props.onCancel}>
            <Form horizontal form={this.props.form}>
              <FormItem {...formItemLayout} label="Shipment Id">
                <Input type="text" {...shipmentIdProps} disabled />
              </FormItem>
              <FormItem {...formItemLayout} label="Latitude">
                <Input type="text" {...latitudeProps} />
              </FormItem>
              <FormItem {...formItemLayout} label="Longitude">
                <Input type="text" {...longitudeProps} />
              </FormItem>
            </Form>
        </Modal>
      </div>
    )
  }
}


export default Main
