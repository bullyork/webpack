import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget,DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import SortListPanel from "../sortableJobList.jsx"
import { initGoogleApi } from '../tools'
import shifts from '../shifts'
import moment from 'moment'
import { connect } from 'react-redux'
import store from '../../../store/d2d'
import { changeShift } from '../../../action/d2d' 
import Fetch from 'fetch.io'
import {
	Form,
	Input,
	Modal,
	Icon,
	Select,
	Checkbox,
	Radio,
	Button,
	message,
	Cascader
} from 'antd'
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group
const InputGroup = Input.Group

import './index.css'

/*****************************************
 *						Static Resource						*
 *						
 *****************************************/
import styles from './index.css'
import { colorHues, sls } from './images/_cargoHues'
import img_driver from './images/driver.svg'
const InpuGroup = Input.Group
const img_cargos = []
const driverColors = {}
// for (let i = 0;i < 120;i++) {
// 	img_cargos.push(Array(99).fill(0).map((el,ind) => (
// 		require(`./images/cargo${i}_${ind}.svg`)
// 	)))
// }
for (let i = 0;i < 120;i ++) {
	img_cargos.push(require(`./images/sprite${i}.png`))
}
// const img_cargos = colorHues.map((elm, index) => (
// 	Array(30).fill(0).map((el, ind) => (
// 		require(`./images/cargo${index}_${ind}.svg`)
// 	))
// ))

/*************************************
 *						Google Maps						*
*************************************/
let { maps } = window.google || {}
let map
let infoWin = {} //infowindow for markers
let driverMarkers = []
let jobMarkers = {}, selectedJobs = []
const sgArea = {
	lat1: 1.2979922935167072,
	lat2: 1.4610232806227543,
	lng1: 103.64004135131836,
	lng2: 103.941650390625
}
const rightNum = { key: 0, x: 0, y: 0, lat: 0, lng: 0 }
const getPixelPosition = marker => {
	const scale = Math.pow(2, map.getZoom())
	const nw = new maps.LatLng(
		map.getBounds().getNorthEast().lat(),
		map.getBounds().getSouthWest().lng()
	)
	const worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw)
	const worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition())
	const pixelOffset = new maps.Point(
		Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
		Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
	)

	return pixelOffset
}

/*******************************************
 * 						Custom Funciton							*
*******************************************/
const D2D_API = new Fetch({ prefix: '/api/D2D' })
const querySelector = element => document.querySelector(element)
const querySelectorAll = element => document.querySelectorAll(element)

const addEventListener = (targetName, event, fun) => {
	const target = querySelector(targetName)
	if (target.addEventListener) {
		target.addEventListener(event, fun, false)
	} else if (target.attachEvent) {
		target.attachEvent(`on${event}`, fun)
	} else {
		target[`on${event}`] = fun
	}
}

const createElement = (element, text, css, prototype) => {
	const node = document.createElement(element)
	node.appendChild(document.createTextNode(text))
	if (css) {
		node.style.cssText = css
	}
	if (prototype) {
		Object.keys(prototype).forEach(name => {
			node[name] = prototype[name]
		})
	}
	return node
}

const addStyle = (node, styles) => {
	for (const styleName in styles) {
		if (styles.hasOwnProperty(styleName)) {
			const style = styles[styleName]
			node.style[styleName] = style
		}
	}
}

function clearMarkers(markers) {
	switch (Object.prototype.toString.call(markers)) {
		case '[object Array]':
			markers.forEach(marker => marker.setMap(null))
			for (let i = 0, length = markers.length;i < length; i++) delete markers[i]
			markers = []
			break
		case '[object Object]':
			for (let key in markers) {
				markers[key].forEach(marker => marker.setMap(null))
				for (let i = 0, length = markers[key].length;i < length; i++) delete markers[key][i]
				markers[key] = []
			}
			markers = {}
			break
		default:
			return
	}
}


class SearchInput extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
	  	value: '',
	  	focus: false
	  }
	}

	handleInputChange(e) {
		this.setStatus({
			focus: e.target === document.activeElement
		})
	}

	handleSearch() {
		this.props.onSearch && this.props.onSearch(this.state.value)
	}

	render () {
		const { style, size, placeholder } = this.props
    const btnCls = 'ant-search-btn' + !!this.state.value.trim() ? ' ant-search-btn-noempty' : ' '
    const searchCls = 'ant-search-input' + this.state.focus ? ' ant-search-input-focus' : ' '
    return (
      <div className="ant-search-input-wrapper" style={style}>
        <InputGroup className={btnCls}>
          <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={searchCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    )
	}
}

@connect(state => ({shift: state.shift}))
class Map extends Component {
	constructor(props) {
		super(props)
		this.state = {
			jobs: {},
			colors: {},
			showDriver: '',
			showAssign: false,
			drivers: [],
			driverFilter: ''
		}
	}


	componentWillMount() {
		this.initGoogleMap()
	}

	componentDidMount() {
		this.createMap()
	}

	initGoogleMap() {
		initGoogleApi()
	}

		/**
	 * @Author    graysheep
	 * @DateTime  2016-07-09
	 * @copyright ezbuy
	 * @version   v1.0
	 * @param     {Object}   driver driver object
	 * @return    {String}          info nodes for a driver
	 */
	genDriverInfoWin(driver) {
		let totalWeight = 0
		jobMarkers[driver.driverNo].forEach(marker => {
			 totalWeight = totalWeight + marker.weight || 0
		})
		return `
			<h4>${driver.name}</h4>
			<label>Phone:</label>
			<span>${driver.telephone || '110'}</span>
			<label>Total Weight:</label>
			<span>${totalWeight.toFixed(1) + 'kg'}</span>
		`
	}

	/**
	 * @Author    graysheep
	 * @DateTime  2016-07-09
	 * @copyright ezbuy
	 * @version   v1.0
	 * @param     {Object}   job job object
	 * @return    {String}       info nodes for a job
	 */
	genJobInfoWin(job, marker) {
		const btn_text = selectedJobs.length + ' Jobs Selected' 
		const shipmentIds = job.shipments.length > 1 
			? job.shipments.reduce((prev, next) => prev.shipmentId + ',' + next.shipmentId)
			: job.shipments[0].shipmentId
		return `
			<h4>${shipmentIds}</h4>
			<label>Customer:</label>
			<span>${job.customerName}</span>
			<div class="btn-wrap" style="display:none">
				<button class="assign-btn">
					<div style="height: 36px; border-radius: 2px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; top: 0px;">
						<span style="position: relative; opacity: 1; font-size: 14px; letter-spacing: 0px; text-transform: uppercase; font-weight: 500; margin: 0px; padding-left: 16px; padding-right: 16px; color: rgb(255, 255, 255); -moz-user-select: none;">Re-assign</span>
					</div>
				</button>
			</div>
			<div style="text-align: center; color: #345678;display: none;">
				${btn_text}
			</div>
		`
	}

	reAssignJobs() {
		if (!this.selectedDriver) {
			message.warn('please select driver')
			return
		}
		this.setState({showAssign: false})
		const hide = message.loading('re-assigning ... ')
		const jobIds = selectedJobs.map(job => job.jobId)
		this.assignDeliveryJobs(jobIds, this.selectedDriver, () => {
			hide()
			this.resetMarkers()
			this.findDeliveryJobs()
			message.success('re-assign successfully')
		})
	}

	reOrderJobs(jobIds) {
		const hide = message.loading('re-ordering ... ')
		D2D_API
			.post('/ReorderDeliveryJobs')
			.send({ jobIds })
			.then(msg => {
				if (msg.ok === true) {
					this.resetMarkers()
					this.findDeliveryJobs()
					message.success('re-order successfully')
				}
			})
			.catch(err => {console.error(err)})
	}

	createMap() {
		if (!window.google) {
			setTimeout(() => {
				this.createMap()
			}, 1000)
			return
		}
		maps = window.google.maps
		const myLatlng = new maps.LatLng(1.343792248621084, 103.84037017822266)
		const mapOption = {
			zoom: 13,
			center: myLatlng,
			disableDefaultUI: false,
      streetViewControl: false,
      mapTypeControl: false,
			mapTypeId: maps.MapTypeId.ROADMAP,
			zoomControl: true,
			scaleControl: true,
			rotateControl: true
		}
		map = new maps.Map(querySelector('#full_gmap'), mapOption)
		map.addListener('click', this.resetMarkers)

		let mouseUpFun, mouseMoveFun, mapMouseUpHandler, mapMoueMoveHandler
		map.addListener('rightclick',e => {
			const _this = this
			_this.resetMarkers()
			const [lat, lng, x, y] = [e.latLng.lat(), e.latLng.lng(), e.pixel.x, e.pixel.y]
			const css = `
				position: absolute;
				background: rgba(0, 136, 255, 0.25);
				border: 1px solid hsla(208, 100%, 50%, 1);
				left: ${x}px;
				top: ${y}px;
				margin: 0;
			`
			const mapRight = document.createElement('div')
			mapRight.id = 'mapRight'
			mapRight.style = css
			querySelector('#full_gmap').appendChild(mapRight)

			//remove events when mouse up
			mouseUpFun = function(evt) {
				querySelectorAll('#mapRight').forEach(div => div.remove())
				document.body.removeEventListener('mousemove', mouseMoveFun)
				document.body.removeEventListener('mouseup', mouseUpFun)
				if (!evt.latLng) return
				const [latEnd, lngEnd] = [evt.latLng.lat(), evt.latLng.lng()]
				if (lat === latEnd || lng === lngEnd) return
				for (let key in jobMarkers) {
					jobMarkers[key].forEach(marker => {
						const [mlat, mlng] = [marker.position.lat(), marker.position.lng()]
						if ((mlat - lat) * (mlat - latEnd) < 0 && (mlng - lng) * (mlng - lngEnd) < 0) {
							marker.setAnimation(maps.Animation.BOUNCE)
							selectedJobs.push(marker)
						}
					})
				}
				if (!!selectedJobs.length) _this.setState({showAssign: true})
			}

			mouseMoveFun = function(evt) {
				if (evt.latLng) {
					mapRight.style.width = Math.abs(evt.pixel.x - x) + 'px'
					mapRight.style.height = Math.abs(evt.pixel.y - y) + 'px'
				} else {
					const tmp = querySelector('#full_gmap').getBoundingClientRect()
					if (evt.clientX - tmp.left > x && evt.clientY - tmp.top < y) {
						mapRight.style.top = evt.clientY - tmp.top + 'px'
					} else if (evt.clientX - tmp.left < x && evt.clientY - tmp.top > y) {
						mapRight.style.left = evt.clientX - tmp.left + 'px'
					} else if (evt.clientX - tmp.left < x && evt.clientY - tmp.top < y) {
						mapRight.style.top = y - (evt.clientY - tmp.top) > 3 ? evt.clientY - tmp.top + 3 + 'px' : mapRight.style.top
						mapRight.style.left = x - (evt.clientX - tmp.left) > 3 ? evt.clientX - tmp.left + 3 + 'px' : mapRight.style.left
					}
					mapRight.style.width = Math.abs(evt.clientX - tmp.left - x) + 'px'
					mapRight.style.height = Math.abs(evt.clientY - tmp.top - y) + 'px'
				}
			}

			document.body.addEventListener('mousemove', mouseMoveFun)
			google.maps.event.addListenerOnce(map, 'mousemove', mouseMoveFun)

			document.body.addEventListener('mouseup', mouseUpFun)
			google.maps.event.addListenerOnce(map, 'mouseup', mouseUpFun)
		})


		this.findDrivers()
	}

	/**
	 * @Author    graysheep
	 * @DateTime  2016-07-16
	 * @copyright ezbuy
	 * @version   v1.0
	 * @description 重置已选择的marker数组
	 */
	resetMarkers() {
		infoWin.close && infoWin.close()
		selectedJobs.forEach(marker => {
			marker.setAnimation(null)
		})
		selectedJobs = []
	}

	addDriverMarkers(drivers) {
		const icon = {
			url: img_driver,
			size: new maps.Size(50, 50),
			origin: new maps.Point(0, 0),
			anchor: new maps.Point(0, 32)
		}
		clearMarkers(jobMarkers)
		clearMarkers(driverMarkers)
		driverMarkers = drivers.map((elm, index) => {
			const marker = new maps.Marker({
				position: { lat: elm.latitude, lng: elm.longitude },
				null,
				icon,
				animation: maps.Animation.DROP
			})
			marker.driverNo = elm.driverNo
			marker.addListener('click', () => {
				this.resetMarkers()
				jobMarkers[elm.driverNo].forEach(mk => {
					mk.setAnimation(maps.Animation.BOUNCE)
					selectedJobs.push(mk)
				})
				map.panTo(marker.getPosition())
				infoWin.close && infoWin.close()
				infoWin = new google.maps.InfoWindow({
					content: this.genDriverInfoWin(elm)
				})
				infoWin.open(map, marker)
				this.setState({showDriver: elm.driverNo})
				querySelector('.driver_list').style.left = "0"
				$('.driver_list').animate({ scrollTop: $('.driver_item')[0].offsetHeight * index }, 500)
			})

			return marker
		})

	}

	addJobsMarkers() {
		clearMarkers(jobMarkers)
		const { jobs, drivers } = this.state

		let i = 0
		for (let key in jobs) {
			jobs[key].forEach((elm, index) => {
				const icon = {
					url: img_cargos[i],
					size: new maps.Size(50, 50),
					origin: new maps.Point(50*(index + 1), 0),
					anchor: new maps.Point(0, 32)
				}
				const marker = new maps.Marker({
					position: { lat: elm.latitude, lng: elm.longitude },
					map,
					icon
				})
				marker.weight = elm.shipments.length > 1 
					? elm.shipments.reduce((prev, next) => prev.weight + next.weight)
					: elm.shipments[0].weight
				marker.driverNo = elm.driverNo
				marker.jobId = elm.ID
				marker.priority = elm.priority
				marker.addListener('click', () => {
					if (map.getZoom() < 13) map.setZoom(13)
					this.resetMarkers()
					map.panTo(marker.position)
					marker.setAnimation(maps.Animation.BOUNCE)
					selectedJobs.push(marker)
					infoWin.close && infoWin.close()
					infoWin = new google.maps.InfoWindow({
						content: this.genJobInfoWin(elm)
					})
					infoWin.open(map, marker)

					this.setState({ showDriver: key })
					querySelector('.driver_list').style.left = "0"
					let tmp = 0
					drivers.forEach((driver, index) => {if (driver.driverNo == key) tmp = index})
					$('.driver_list').animate({ scrollTop: $('.driver_item')[0].offsetHeight * tmp }, 500)
				})

				if (!jobMarkers[key]) jobMarkers[key] = []
				jobMarkers[key].push(marker)
			})
			driverColors[key] = i
			i ++
		}
		this.setState({ colors: driverColors })
	}

	/*
		@v2.0
	 */
	addJobsMarkersByDriver(driverId) {

	} 

	toggleFocuJob(job, index) {
		setTimeout(() => {
			querySelector('.assign-btn').addEventListener('click', () => this.setState({showAssign: true}))
		}, 300)
	}

	findDrivers(filter = {}) {
		const hide = message.loading('fetching data ...')
		D2D_API
			.post('/FindDrivers')
			.send({filter: {
				catalogCode: filter.catalogCode || this.props.shift[0],
				shift: filter.shift || this.props.shift[1]
			}})
			.json()
			.then(res => {
				hide()
				this.addDriverMarkers(res)
				this.setState({
					drivers: res
				})

				this.findDeliveryJobs()
			})
			.catch(err => {})
	}

	findDeliveryJobs(filter = {}) {
		const hide = message.loading('fetching data ...')
		D2D_API
			.post('/FindDeliveryJobs')
			.send({filter: {
				catalogCode: filter.catalogCode || this.props.shift[0],
				shift: filter.shift || this.props.shift[1],
				dateInt: Number(moment().format('YYYYMMDD'))
			}})
			.json()
			.then(res => {
				hide()
				let jobsGroupByDriver = {}
				res.forEach((elm, index) => {
					if (!jobsGroupByDriver[elm.driverNo]) jobsGroupByDriver[elm.driverNo] = [elm]
					else jobsGroupByDriver[elm.driverNo].push(elm)
				})
				for (let key in jobsGroupByDriver) {
					jobsGroupByDriver[key].sort((prev, next) => prev.priority > next.priority ? 1 : -1)
				}
				this.setState({
					jobs: jobsGroupByDriver,
					showDriver: ''
				})
				this.addJobsMarkers()
			})
			.catch(err => {console.error(err)})
	}

	findDriverDeliveryJobs(filter = {}, driverNo) {
		const hide = message.loading('fetching data ...')
		D2D_API
			.post('/FindDriverDeliveryJobs')
			.send({filter: {shift: filter.shift || this.props.shift[1]}, driverNo})
			.json()
			.then(res => {
				hide()
				jobMarkers[driverNo] = res
			})
			.catch(err => {console.error(err)})
	}

	assignDeliveryJobs(jobIds = [], driverNo, cb) {
		D2D_API
			.post('/AssignDeliveryJobs')
			.send({jobIds, driverNo})
			.then(msg => {
				if (msg.ok === true) {
					cb && cb()
					// this.findDriverDeliveryJobs({}, driverNo)
				}
			})
			.catch(err => {console.error(err)})
	}

	onShiftChange(val) {
		const { dispatch } = this.props
		dispatch(changeShift(val))
		this.findDrivers({catalogCode: val[0], shift: val[1]})
		// this.findDeliveryJobs({catalogCode: val[0], shift: val[1]})
	}

	render() {
		const {
			showDriver,
			jobs,
			colors,
			showAssign,
			drivers,
			driverFilter
		} = this.state
		return (
			<div id="map_container">
				<div id="full_gmap" />
				<div style={{position: 'absolute', right: '20px', top: '60px'}}>
					<Cascader placeholder="Show All" 
					options={shifts} 
					allowClear={false}
					displayRender={label => label.join('-')} 
					value={this.props.shift} 
					onChange={this.onShiftChange.bind(this)}/>
				</div>
				<div className="btn_driver">
					<button
						className="material-icons"
						onClick={() => {
							querySelector('.driver_list').style.left = "0"
						}}
					>
						directions_car
					</button>
				</div>
				<div className="driver_list">
					<div className="list_header">
						<h5>D2D.SG</h5>
						<h6
							className="material-icons"
							onClick={() => {
								querySelector('.driver_list').style.left = "-610px"
							}}
						>
							arrow_back
						</h6>
					</div>
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
						<Input placeholder="search drivers" onChange={e => this.setState({ driverFilter: e.target.value })} style={{ width: 300 }} />
					</div>
					{
						drivers.length
						?
							drivers.filter(driver => driver.name.includes(driverFilter)).map((driver, index) => {
								const showList = showDriver == driver.driverNo
								let totalWeight = 0
								if (!!jobs[driver.driverNo]) jobs[driver.driverNo].forEach(job => {
									let tmp = 0
									for (let i = 0, length = job.shipments.length;i < length; i++) tmp += job.shipments[i].weight
									totalWeight += tmp
								})
								//not right
								const _index = colors[driver.driverNo]
								const driverColor = _index !== undefined ? `hsl(${colorHues[Math.floor(_index / 4)]}, ${sls[_index % 4].s}, ${sls[_index % 4].l})` : ''
								return (
									<div className="driver_item" key={driver.driverNo}>
										<div className="driver_item_header">
											<h2 className="material-icons" style={{color: driverColor}}>account_circle</h2>
											<div style={{display: 'flex', flexDirection: 'column', 'alignItems': 'flex-start'}}>
												<p style={{ fontSize: 16, color: '#345678' }}>{driver.name || ''}</p>
												<p style={{ fontSize: 12 }}>Total Weight: {totalWeight.toFixed(2)}</p>
											</div>
											<h2
												className="material-icons"
												onClick={() => {
													this.resetMarkers()
													this.setState({showDriver: showList ? 0 : driver.driverNo})
													if (showList) return
													if (jobMarkers[driver.driverNo]) jobMarkers[driver.driverNo].forEach(mk => {
														mk.setAnimation(maps.Animation.BOUNCE)
														selectedJobs.push(mk)
													})
												}}
											>
												{ showList ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }
											</h2>
										</div>
										{
											showList && jobs[driver.driverNo]
											? <div>
													<SortListPanel ref="sortPanel" data={jobs[driver.driverNo].map(job => {
													let weights = 0
													for (let i = 0, length = job.shipments.length;i < length;i ++) weights += job.shipments[i].weight
													return {
														id: job.ID,
														key: job.ID,
														text: (
															<div 
																className="jobs_item"
																key={job.id}>
																<h2 className="material-icons">card_giftcard</h2>
																<div>
																	<p style={{ fontSize: 12, fontWeight: 'bold' }}>Customer: {job.customerName}</p>
																	<p>Weight: {weights.toFixed(2)}kg</p>
																</div>
															</div>
														)
													}
												})} canDrag={true} />
												<div className="btn-wrap" onClick={() => {
													const sortedJobs = this.refs.sortPanel.refs.child.state.cards.map(card => card.id)
													this.reOrderJobs(sortedJobs)
												}}>
													<button className="assign-btn">
														<div style={{height: '36px', borderRadius: '2px', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', top: '0px'}}>
															<span style={{position: 'relative', opacity: 1, fontSize: '14px', letterSpacing: '0px', textTransform: 'uppercase', fontWeight: 500, margin: '0px', paddingLeft: '16px', paddingRight: '16px', color: 'rgb(255, 255, 255)'}}>Submit Change Order</span>
														</div>
													</button>
												</div>	
											</div>			
											: null
										}
									</div>
								)
							})
						:
							null
					}
				</div>
				<Modal
					title="Re-assign Jobs"
					onOk={this.reAssignJobs.bind(this)}
					onCancel={() => {
						this.resetMarkers()
						this.setState({showAssign: false})
					}}
					visible={showAssign}
				>
					<Select
						ref="assignDriver"
						placeholder="Please Choose Driver"
						style={{ width: '100%' }}
						onChange={value => this.selectedDriver = value}
					>
						{
							drivers.map(driver => (
								<Option value={driver.driverNo} key={driver.driverNo}>
									{driver.name}
								</Option>
							))
						}
					</Select>
				</Modal>
			</div>
		)
	}
}

Map = Form.create()(Map)
export default Map
