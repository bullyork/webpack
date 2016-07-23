import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Fetch from 'fetch.io'
import {
	Form,
	Input,
	Modal,
	Select,
	Checkbox,
	Radio,
	Button
} from 'antd'
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

import './index.css'

/*****************************************
 *						Static Resource						*
 *****************************************/
import styles from './index.css'
import colorHues from './images/_cargoHues'
import img_driver from './images/driver.svg'
const img_cargos = colorHues.map((elm, index) => (
	Array(100).fill(0).map((el, ind) => (
		require(`./images/cargo${index}_${ind}.svg`)
	))
))

/*************************************
 *						Google Maps						*
*************************************/
let { maps } = window.google || {}
let map
const driverMarkers = []
let jobMarkers = []
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

class Map extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDriver: false,
			driverJobs: null,
			showJobs: null,
			reseter: false,
			startMove: 0,
			moveCargo: null,
			willReseter: 0,
			reseterCargo: [0, 0],
			jobs: null,
			showAssign: false,
			drivers: Array(20).fill(0).map((el, ind) => (
				{
					name: `${ind} Mr\'s`,
					position: { lat: sgArea.lat1 + Math.random() * (sgArea.lat2 - sgArea.lat1), lng: sgArea.lng1 + Math.random() * (sgArea.lng2 - sgArea.lng1) },
					cargos: Array(20).fill(0).map((elm, index) => (
						{
							name: `Cargos ${index}`,
							position: { lat: sgArea.lat1 + Math.random() * (sgArea.lat2 - sgArea.lat1), lng: sgArea.lng1 + Math.random() * (sgArea.lng2 - sgArea.lng1) },
							time: new Date(),
							id: `http:sg.65emall.com.${index}`
						}
					))
				}
			)),
			jobs: null
		}
	}


	componentWillMount() {
		this.findDrivers()
		this.findDeliveryJobs()
		this.initGoogleMap()
	}

	componentDidMount() {
		addEventListener('body', 'mousemove', e => this.mouseMove(e))
		this.createMap()
	}

	initGoogleMap() {
		const script = document.createElement('script')
		script.src = 'https://maps.googleapis.com/maps/api/js?region=sg&language=zh-CN&libraries=places&sensor=false&key=AIzaSyCRnxKr5e6cr1Evt0Evn9l3w76W3c96VcY'
		script.async = true

		document.body.insertBefore(script, document.body.firstChild)
	}

	createMap() {
		if (!window.google || !this.state.jobs) {
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
			mapTypeId: maps.MapTypeId.ROADMAP,
			zoomControl: true,
			mapTypeControl: true,
			scaleControl: true,
			streetViewControl: true,
			rotateControl: true
		}
		map = new maps.Map(querySelector('#full_gmap'), mapOption)
		this.addDriverMarkers()
		this.addJobsMarkers()
		map.addListener('rightclick', e => this.selectMarkers(e, map))
		map.addListener('click', e => {
			jobMarkers.forEach(marker => {
				marker.setAnimation(null)
			})
			this.notShowCargoTootip()
		})
		map.addListener('mousemove', e => this.mouseMove(e))
		map.addListener('bounds_changed', () => this.notShowCargoTootip())
	}

	selectMarkers(e) {
		const [lat, lng, x, y] = [e.latLng.lat(), e.latLng.lng(), e.pixel.x, e.pixel.y]
		if (rightNum.key === 0) {
			const css = `
				position: absolute;
				background: rgba(0, 136, 255, 0.25);
				border: 1px solid hsla(208, 100%,50%,1);
				left: ${x}px;
				top: ${y}px;
				margin: 0;
			`
			querySelector('#full_gmap').appendChild(createElement('div', '', css, { id: 'mapRight' }))
			rightNum.x = x
			rightNum.y = y
			rightNum.lat = lat
			rightNum.lng = lng
		} else {
			if (querySelector('#mapRight')) {
				querySelector('#mapRight').remove()
			}
		}
		if (rightNum.key === 2) {
			this.showAssignDeliveryJobs()
		}
		rightNum.key++
		rightNum.key %= 3
	}

	mouseMove(e) {
		const isMapEvent = Boolean(e.latLng)
		const [latEnd, lngEnd] = isMapEvent ? [e.latLng.lat(), e.latLng.lng()] : [0, 0]
		if (rightNum.key === 1) {
			const [x, y] = isMapEvent ? [e.pixel.x, e.pixel.y] : [e.clientX - querySelector('#full_gmap').getBoundingClientRect().left, e.clientY - querySelector('#full_gmap').getBoundingClientRect().top]
			if (x > rightNum.x) {
				if (y > rightNum.y) {
					if (isMapEvent) {
						jobMarkers.forEach(marker => {
							const [lat, lng] = [marker.position.lat(), marker.position.lng()]
							if (lat < rightNum.lat && lat > latEnd && lng > rightNum.lng && lng < lngEnd) {
								marker.setAnimation(maps.Animation.BOUNCE)
							} else {
								marker.setAnimation(null)
							}
						})
					}
					addStyle(
						querySelector('#mapRight'),
						{
							width: `${x - rightNum.x - 5 < 0 ? 0 : x - rightNum.x - 5}px`,
							height: `${y - rightNum.y - 5 < 0 ? 0 : y - rightNum.y - 5}px`
						}
					)
				} else {
					if (isMapEvent) {
						jobMarkers.forEach(marker => {
							const [lat, lng] = [marker.position.lat(), marker.position.lng()]
							if (lat > rightNum.lat && lat < latEnd && lng > rightNum.lng && lng < lngEnd) {
								marker.setAnimation(maps.Animation.BOUNCE)
							} else {
								marker.setAnimation(null)
							}
						})
					}
					addStyle(
						querySelector('#mapRight'),
						{
							top: `${y + 5 < 0 ? 0 : y + 5}px`,
							width: `${x - rightNum.x - 5 < 0 ? 0 : x - rightNum.x - 5}px`,
							height: `${rightNum.y - y - 5 < 0 ? 0 : rightNum.y - y - 5}px`
						}
					)
				}
			}
			if (x < rightNum.x) {
				if (y > rightNum.y) {
					if (isMapEvent) {
						jobMarkers.forEach(marker => {
							const [lat, lng] = [marker.position.lat(), marker.position.lng()]
							if (lat < rightNum.lat && lat > latEnd && lng < rightNum.lng && lng > lngEnd) {
								marker.setAnimation(maps.Animation.BOUNCE)
							} else {
								marker.setAnimation(null)
							}
						})
					}
					addStyle(
						querySelector('#mapRight'),
						{
							left: `${x + 5 < 0 ? 0 : x + 5}px`,
							width: `${rightNum.x - x - 5 < 0 ? 0 : rightNum.x - x - 5}px`,
							height: `${y - rightNum.y - 5 < 0 ? 0 : y - rightNum.y - 5}px`
						}
					)
				} else {
					if (isMapEvent) {
						jobMarkers.forEach(marker => {
							const [lat, lng] = [marker.position.lat(), marker.position.lng()]
							if (lat > rightNum.lat && lat < latEnd && lng < rightNum.lng && lng > lngEnd) {
								marker.setAnimation(maps.Animation.BOUNCE)
							} else {
								marker.setAnimation(null)
							}
						})
					}
					addStyle(
						querySelector('#mapRight'),
						{
							left: `${x + 5 < 0 ? 0 : x + 5}px`,
							top: `${y + 5 < 0 ? 0 : y + 5}px`,
							width: `${rightNum.x - x - 5 < 0 ? 0 : rightNum.x - x - 5}px`,
							height: `${rightNum.y - y - 5 < 0 ? 0 : rightNum.y - y - 5}px`
						}
					)
				}
			}
		}
	}

	notShowOneJobs() {
		jobMarkers.forEach(marker => {
			marker.setAnimation(null)
		})
	}

	addDriverMarkers() {
		const icon = {
			url: img_driver,
			size: new maps.Size(50, 50),
			origin: new maps.Point(0, 0),
			anchor: new maps.Point(0, 32)
		}
		this.state.drivers.forEach((elm, index) => {
			setTimeout(() => {
				const marker = new maps.Marker({
					position: { lat: elm.latitude, lng: elm.longitude },
					map,
					icon,
					animation: maps.Animation.DROP
				})
				marker.addListener('click', () => {
					if (marker.getAnimation() === null) {
						marker.setAnimation(maps.Animation.BOUNCE)
					} else {
						marker.setAnimation(null)
					}
				})
				driverMarkers.push(marker)
			}, 150 * index)
		})
	}

	addJobsMarkers() {
		jobMarkers = this.state.jobs.map((elm, index) => {
			const icon = {
				url: img_cargos[parseInt(index / 100)][index % 100],
				size: new maps.Size(50, 50),
				origin: new maps.Point(0, 0),
				anchor: new maps.Point(0, 32)
			}
			const marker = new maps.Marker({
				position: { lat: elm.latitude, lng: elm.longitude },
				map,
				icon,
				animation: maps.Animation.DROP
			})
			marker.addListener('click', () => this.toggleFocuJob(index))
			return marker
		})
	}

	toggleFocuJob(index) {
		if (map.getZoom() < 13) map.setZoom(13)
		this.notShowCargoTootip()
		map.panTo(jobMarkers[index].position)
		if (jobMarkers[index].getAnimation() === null) {
			this.setState({
				showJobs: index
			})
			const ps = getPixelPosition(jobMarkers[index])
			ps.x += 60
			ps.y -= 225
			setTimeout(() => {
				jobMarkers[index].setAnimation(maps.Animation.DROP)
				addStyle(
					findDOMNode(this.refs.cargoTootip),
					{
						left: `${ps.x}px`,
						top: `${ps.y}px`,
						transform: 'translateX(-400px) scale(0)'
					}
				)
				this.showCargoTootip()
				setTimeout(() => {
					jobMarkers[index].setAnimation(maps.Animation.BOUNCE)
				}, 500)
			}, 500)
		} else {
			this.setState({
				showJobs: null
			})
			jobMarkers[index].setAnimation(null)
			this.notShowCargoTootip()
		}
	}

	showCargoTootip() {
		addStyle(
			findDOMNode(this.refs.cargoTootip),
			{
				transform: 'translateX(0px) scale(1)'
			}
		)
	}

	showAssignDeliveryJobs(confirm) {
		this.setState({
			showAssign: !this.state.showAssign
		})
		if (confirm && this.showAssignDeliveryJobs.value) {
			const jobIds = jobMarkers.map((marker, index) => marker.getAnimation() === null ? null : this.state.jobs[index].ID).filter(num => num !== null)
			this.assignDeliveryJobs(jobIds, this.showAssignDeliveryJobs.value)
			delete this.showAssignDeliveryJobs.value
		}
	}

	notShowCargoTootip() {
		addStyle(
			findDOMNode(this.refs.cargoTootip),
			{
				transform: 'translateX(-400px) scale(0)'
			}
		)
	}


	findDrivers(filter = {}) {
		D2D_API
			.post('/FindDrivers')
			.send(filter)
			.json()
			.then(res => {
				this.setState({
					drivers: res
				})
			})
			.catch(err => {console.error(err)})
	}

	findDeliveryJobs(filter = {}) {
		D2D_API
			.post('/FindDeliveryJobs')
			.send(filter)
			.json()
			.then(res => {
				this.setState({
					jobs: res
				})
			})
			.catch(err => {console.error(err)})
	}

	findDriverDeliveryJobs(filter = {}, driverNo) {
		D2D_API
			.post('/FindDriverDeliveryJobs')
			.send({filter, driverNo})
			.json()
			.then(res => {
				this.setState({
					jobs: res,
					showDriver: driverNo
				})
				for (let i = 0; i < jobMarkers.length; i++) {
					jobMarkers[i].setMap(null)
				}
				this.addJobsMarkers()
			})
			.catch(err => {console.error(err)})
	}

	assignDeliveryJobs(jobIds = [], driverNo) {
		D2D_API
			.post('/AssignDeliveryJobs')
			.send({jobIds, driverNo})
			.then(() => {
				this.findDriverDeliveryJobs({}, driverNo)
			})
			.catch(err => {console.error(err)})
	}

	render() {
		const {
			showDriver,
			showJobs,
			reseter,
			startMove,
			moveCargo,
			willReseter,
			reseterCargo,
			jobs,
			showAssign,
			drivers
		} = this.state
		return (
			<div id="map_container">
				<div id="full_gmap" />
				<select
					id="job_select"
					onChange={e => {
						for (let i = 0; i < jobMarkers.length; i++) {
							jobMarkers[i].setMap(null)
						}
						if (e.currentTarget.value === 'all') {
							this.findDeliveryJobs()
							this.addJobsMarkers()
							return
						}
						this.findDeliveryJobs({ shift: e.currentTarget.value })
						this.addJobsMarkers()
					}}
				>
					<option value="all">All</option>
					<option value="day">SG-Day</option>
					<option value="night">SG-Night</option>
					<option value="big">SG-Big</option>
				</select>
				<div
					className="cargo_tootip"
					ref="cargoTootip"
					style={{
						transform: 'translateX(-400px) scale(0)',
						left: 0,
						top: 0
					}}
				>
					<Form horizontal form={this.props.form}>
						{
							showJobs !== null
							?
								Object.keys(jobs[showJobs]).map((elm, index) => (
									<FormItem
										label={elm}
										labelCol={{ span: 6 }}
										wrapperCol={{ span: 14 }}
									>
									  <Input id="control-input" defaultValue={jobs[showJobs][elm]} />
									</FormItem>
								))
							:
								null
							}
					</Form>
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
					<h4>Drivers</h4>
					{
						drivers
						?
							drivers.map((driver, index) => {
								const showList = showDriver === driver.driverNo
								return (
									<div className="driver_item">
										<div className="driver_item_header">
											<h2 className="material-icons">account_box</h2>
											<h3>{driver.name || ''}</h3>
											<h2
												className="material-icons"
												onClick={() => {
													if (showList) {
														this.setState({
															showDriver: false
														})
													} else {
														this.findDriverDeliveryJobs({}, driver.driverNo)
													}
												}}
											>
												{ showList ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }
											</h2>
										</div>
										{
											showList
											?
												jobs.map((job, index) => {
													return (
														<div
															className="jobs_item"
															onClick={() => {
																this.toggleFocuJob(index)
																this.setState({
																	showJobs: index
																})
															}}
														>
															<h2 className="material-icons">card_giftcard</h2>
															<div>
																<p style={{ fontSize: 16 }}>Customer: {job.customerName}</p>
																<p>Weight: {job.weight}kg</p>
															</div>
															<h2 className="material-icons">more_vert</h2>
														</div>
													)
												})
											:
												null
										}
									</div>
								)
							})
						:
							null
					}
				</div>
				<Modal
					title="Assign Jobs To Driver"
					onOk={() => this.showAssignDeliveryJobs(true)}
					onCancel={() => this.showAssignDeliveryJobs()}
					visible={showAssign}
				>
					<Select
						ref="assignDriver"
						placeholder="Please Choice Driver"
						style={{ width: '100%' }}
						onChange={value => {
							this.showAssignDeliveryJobs.value = value
						}}
					>
						{
							drivers.filter(driver => driver.driverNo !== showDriver).map(driver => (
								<Option value={driver.driverNo}>
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
