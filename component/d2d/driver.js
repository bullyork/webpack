import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import store from '../../store/d2d'
import { redirect } from '../../util/history'
import { Form, Input, InputNumber, Table, Button, Modal, Checkbox, Cascader } from 'antd'
import { Link } from "react-router"
import shifts from './shifts'
import { getDrivers, getZipGroups, addDriver, editDriver, editArea, cancelEdit, updateDriver, deleteDriver, openDialog, closeDialog, moveMarker, changeShift } from '../../action/d2d'
import { initGoogleApi } from './tools'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const allShifts = ['day', 'night', 'big']

const initSpot = {lat: 1.377243, lng: 103.838110}

@connect(state => ({drivers: state.drivers, shift: state.shift}))
class Main extends Component {

  constructor(props) {
    super(props)
  
    this.state = {loading: false}
  }

  componentDidMount () {
    this.fetchDrivers()
    this.props.dispatch(getZipGroups())
    //init google map
    initGoogleApi()
  }

  fetchDrivers() {
    const { dispatch, shift } = this.props
    dispatch(getDrivers({catalogCode: shift[0] || 'SG',shift: shift[1] || 'day'}))
  }

  onShiftChange(val) {
    const { dispatch } = this.props
    this.setState({loading: true})
    dispatch(changeShift(val))
    dispatch(getDrivers({catalogCode: val[0], shift: val[1]}, () => {
      this.setState({loading: false})
    }))
  }

  render () {
    const { dispatch, drivers, shift } = this.props
    let ds = drivers.map(driver => {
      return {
        id: driver.driverNo,
        driverName: driver.name,
        phone: driver.telephone || '110',
        remark: driver.remark,
        load: driver.maxWeight,
        // area: driver.postCodes.join(','),
        zipGroups: driver.postCodeGroups
      }
    })

    const columns = [{
      title: 'DriverName',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },{
      title: 'Phone',
      dataIndex: 'telephone',
      key: 'telephone',
      width: 150,
    },{
      title: 'Shifts',
      dataIndex: 'shifts',
      key: 'shifts',
      width: 150,
      render (text) {
        return text ? text.join(' ') : ''
      }
    },{
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
      width: 150,
      render (text) {
        return text.toFixed(6)
      }
    },{
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
      width: 150,
      render (text) {
        return text.toFixed(6)
      }
    },{
      title: 'Area',
      dataIndex: 'postCodes',
      key: 'postCodes',
      width: 500,
      render (text, record) {
        return text ? text.join(',') : ''
      }
    },{
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      width: 200
    },{
      title: 'Load',
      dataIndex: 'maxWeight',
      key: 'maxWeight',
      width: 100
    },{
      title: 'Operation',
      key: 'operation',
      width: 350,
      render (text, record) {
        return (
          <div>
            <Button style={{marginLeft: 5}} onClick={()=>{dispatch(editDriver(record))}}>Edit</Button>
            <Button style={{marginLeft: 5}} onClick={()=>{
              store.dispatch(editArea(record.driverNo))
              redirect(`/editArea/${record.driverNo}`) 
            }}>Edit Area</Button>
            <Button style={{marginLeft: 5}} onClick={() => {
              confirm("Are you sure wanna delete?") && dispatch(deleteDriver(record.driverNo,() => {
                dispatch(getDrivers({catalogCode: shift[0] || 'SG', shift: shift[1] || 'day'}))
              }))
            }}>Delete</Button>
          </div>
        )
      }
    }]

    const pagination = {
      size: ds.length
    }

    return (
      <div>
        <div>
          <Button type="primary" style={{marginBottom: 5}} onClick={() => {dispatch(openDialog('addDriverDialog'))}}>Add Driver</Button>
          <Cascader placeholder="Show All" options={shifts} style={{float: 'right'}} allowClear={false} displayRender={label => label.join('-')} value={this.props.shift} onChange={this.onShiftChange.bind(this)}/>
        </div>
        <Table pagination={pagination} loading={this.state.loading} rowKey={record => record.driverNo} dataSource={drivers} columns={columns} />

        <AddDriverDialog fetchDrivers={this.fetchDrivers.bind(this)} />
        <EditDriverDialog fetchDrivers={this.fetchDrivers.bind(this)} />
      </div>
    )
  }
}

@connect(state => ({visible: !!state.dialog.addDriverDialog}))
class AddDriverDialog extends Component {

  constructor(props){
    super(props)
    this["onOk"].bind(this)
  }

  render () {
    const { dispatch } = this.props
    return (
      <Modal
        title = "Add Driver"
        visible = { this.props.visible }
        onCancel = {() => { 
            dispatch(closeDialog('addDriverDialog'))
            this.refs.editPanel.resetFields()
            this.refs.editPanel.setState({shifts: []})
          } 
        }
        onOk = { this.onOk.bind(this) }
        >
        <DriverEditPanel ref="editPanel" initMap={this.initMap}/>
      </Modal>
    )
  }

  onOk () {
    const { dispatch, fetchDrivers } = this.props
    this.refs.editPanel.validateFieldsAndScroll((error, driver)=>{
      if (!!error) return

      dispatch(addDriver(Object.assign({}, driver, {telephone: parseInt(driver.telephone) + '', catalogCode: 'SG', shifts: driver.shifts.split(' '), latitude: parseFloat(driver.latitude), longitude:parseFloat(driver.longitude), maxWeight: parseFloat(driver.maxWeight)}),(msg)=>{
        this.refs.editPanel.resetFields()
        fetchDrivers()
        dispatch(closeDialog('addDriverDialog'))
      }))
    })
  }
}

@connect(state => ({editingDriver: state.editingDriver}))
class EditDriverDialog extends Component {

  constructor (props) {
    super(props)
    this['onOk'].bind(this)
  }

  render () {
    const { dispatch } = this.props
    return (
      <Modal
        title = "Edit Driver"
        visible = { !!this.props.editingDriver.driverNo }
        onCancel = {() => { 
            dispatch(cancelEdit())
            this.refs.editPanel.resetFields()
            this.refs.editPanel.setState({shifts: []})
          } 
        }
        onOk = { this.onOk.bind(this) }
        >
        <DriverEditPanel ref="editPanel"/>
      </Modal>
    )
  }

  onOk () {
    const { dispatch, fetchDrivers } = this.props
    this.refs.editPanel.validateFieldsAndScroll((error, driver) => {
      if (!!error) return

      dispatch(updateDriver(Object.assign({}, this.props.editingDriver, driver, {shifts: driver.shifts.split(' '), latitude: parseFloat(driver.latitude), longitude: parseFloat(driver.longitude), maxWeight: parseFloat(driver.maxWeight), telephone: parseInt(driver.telephone) + ''}),() => {
        this.refs.editPanel.resetFields()
        fetchDrivers()
        dispatch(cancelEdit())
      }))
    })
  }
}

@Form.create()
@connect(state => ({markerPosition: state.markerPosition, editingDriver: state.editingDriver}))
class DriverEditPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hasMarker: false,
      shifts: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editingDriver.driverNo) {
      this.setState({
        shifts: nextProps.editingDriver.shifts
      })
    }     
  }

  //init google map
  getMarker () {
    if (!this.state.hasMarker) {
      const mapDom = ReactDOM.findDOMNode(this).lastChild
      const map = new google.maps.Map(mapDom, {
        center: initSpot,
        disableDefaultUI: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoom: 12
      })
      const marker = new google.maps.Marker({
        position: initSpot,
        map: map,
        draggable: true,
        title: 'ezbuy'
      })
      marker.addListener('dragend', evt => {
        const { dispatch } = this.props
        map.panTo(evt.latLng)
        dispatch(moveMarker(evt.latLng))
      })
      this.setState({hasMarker: true})
      this.map = map
      this.marker = marker
    }
  }

  componentDidMount(){
    this.getMarker()
    if (this.props.editingDriver.driverNo) this.setState({shifts: this.props.editingDriver.shifts})
  }

  onMarkerMove(evt, map) {
    const { dispatch } = this.props
    map.panTo(evt.latLng)
    dispatch(moveMarker(evt.latLng))
  }

  checkTelephone(rule, value, callback) {
    if (isNaN(parseInt(value))) callback('invalid telephone number')

    callback()
  }

  checkLoad(rule, value, callback) {
    if (isNaN(parseInt(value))) callback('invalid maxWeight')

    callback()
  }

  checkLat(rule, value, callback) {
    const lat = parseFloat(value)
    if (isNaN(lat)) callback('invalid latitude')
    if (lat < -90 || lat > 90) callback('latitude should be -90 ~ 90')
    callback()
  }

  checkLng(rule, value, callback) {
    const lng = parseFloat(value)
    if (isNaN(parseFloat(value))) callback('invalid longitude')
    if (lng < -180 || lng > 180) callback('longitude should be -180 ~ 180')
    callback()
  }

  changeLat(evt) {
    const newLat = parseFloat(evt.target.value)
    if (isNaN(newLat) || newLat < -90 || newLat > 90) return false
    const { dispatch } = this.props
    dispatch(moveMarker({
      lat: newLat,
      lng: this.marker.position.lng()
    }))
  }

  changeLng(evt) {
    const newLng = parseFloat(evt.target.value)
    if (isNaN(newLng) || newLng < -180 || newLng > 180) return false
    const { dispatch } = this.props
    dispatch(moveMarker({
      lat: this.marker.position.lat(),
      lng: newLng
    }))
  }

  changeShifts(value) {
    console.log(value)
    this.setState({
      shifts: value
    })
  }

  render () {
    const { getFieldProps } = this.props.form
    const { hasMarker } = this.state
    const { editingDriver, markerPosition } = this.props

    const nameProps = getFieldProps('name', {
      initialValue: editingDriver.name || '',
      rules: [{
        required: true, message: 'please input name'
      }]
    })

    const telProps = getFieldProps('telephone', {
      initialValue: editingDriver.telephone || '',
      rules: [{
        require: true, message: 'please input telephone'
      },{
        validator: this.checkTelephone
      }]
    })

    const loadProps = getFieldProps('maxWeight', {
      initialValue: editingDriver.maxWeight || '',
      rules: [{
        validator: this.checkLoad
      }]
    })

    const shiftsProps = getFieldProps('shifts', {
      // initialValue: this.state.shifts.length > 0 ? this.state.shifts.join(' ') : (editingDriver.shifts ? editingDriver.shifts.join(' ') : ''),
      initialValue: this.state.shifts.join(' '),
      rules: [{
        required: true, message: 'please select shifts'
      }]
    })

    let latProps, lngProps
    const latRules = [{required: false},{validator: this.checkLat}]
    const lngRules = [{required: false},{validator: this.checkLng}]
    if (hasMarker) {
      const { map, marker } = this
      marker.setPosition({lat: markerPosition.lat || editingDriver.latitude || initSpot.lat, lng:markerPosition.lng || editingDriver.longitude || initSpot.lng})
      map.setCenter({lat: markerPosition.lat || editingDriver.latitude || initSpot.lat, lng:markerPosition.lng || editingDriver.longitude || initSpot.lng})
    }
    latProps = getFieldProps('latitude', {initialValue: markerPosition.lat || editingDriver.latitude || initSpot.lat})
    lngProps = getFieldProps('longitude', {initialValue: markerPosition.lng || editingDriver.longitude || initSpot.lng})
    const remarkProps = getFieldProps('remark', {
      initialValue: editingDriver.remark || ''
    })

    return (
      <Form horizontal form={this.props.form}>
        <FormItem {...formItemLayout} label="Driver Name:" style={{marginBottom: 12}}>
          <Input type="text" {...nameProps} disabled={false} />
        </FormItem>
        <FormItem {...formItemLayout} label="Phone:" style={{marginBottom: 12}}>
          <Input type="text" {...telProps} disabled={false} />
        </FormItem>
        <FormItem {...formItemLayout} label="Shifts:" style={{marginBottom: 12}}>
          <Input type="text" {...shiftsProps} disabled />
          <CheckboxGroup options={allShifts} value={this.state.shifts} onChange={this.changeShifts.bind(this)} />
        </FormItem>
        <FormItem {...formItemLayout} label="Latitude:" style={{marginBottom: 12}}>
          <Input type="text" {...latProps} ref="lat_input" disabled={false} onChange={this.changeLat.bind(this)} value={markerPosition.lat || editingDriver.latitude || initSpot.lat} />
        </FormItem>
        <FormItem {...formItemLayout} label="Longitude:" style={{marginBottom: 12}}>
          <Input type="text" {...lngProps} ref="lng_input" disabled={false} onChange={this.changeLng.bind(this)} value={markerPosition.lng || editingDriver.longtidue || initSpot.lng} />
        </FormItem>
        <FormItem {...formItemLayout} label="Remark:" style={{marginBottom: 12}}>
          <Input type="text" {...remarkProps} disabled={false} />
        </FormItem>
        <FormItem {...formItemLayout} label="Load:" style={{marginBottom: 12}}>
          <Input type="text" {...loadProps} disabled={false} />
        </FormItem>

        <div id="gmap">
        </div>
      </Form>
    )
  }
}

export default Main