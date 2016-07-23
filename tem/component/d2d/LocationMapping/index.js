import React, { Component } from 'react'
import { warn, success } from '../../../util/antd'
import {
	Table,
	message,
	Icon,
	Form,
	Input,
	Button,
	Row,
	Col,
	Modal
} from 'antd'
import Fetch from 'fetch.io'

const ButtonGroup = Button.Group
const FormItem = Form.Item

const D2D_API = new Fetch({ prefix: '/api/D2D' })
const querySelector = element => document.querySelector(element)
const initSpot = {lat: '1.343792248621084', lng: '103.84037017822266'}

class LocationMapping extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			addPostCodeing: false,
			addPostCode: {
				postCode: '',
				longitude: '',
				latitude: ''
			},
			editPostCode: {},
			deletID: null,
			showDeleteDialog: false,
			showAddDialog: false,
			allPostCode: [],
			mapLoading: false
		}
	}

	componentDidMount() {
		this.initGoogleMap()
		if (this.state.allPostCode.length === 0) this.fetchPostCode()
	}

	componentDidUpdate() {
		if (this._componentDidUpdateCallBack) {
			setTimeout(() => {
				this._componentDidUpdateCallBack()
				delete this._componentDidUpdateCallBack
			}, 200)
		}
	}

	resetAddCode() {
		this.props.form.setFieldsValue({
			postCode: '',
			latitude: '',
			longitude: ''
		})
	}

	initGoogleMap() {
		if (!window.google) {
			const script = document.createElement('script')
			script.src = 'https://maps.googleapis.com/maps/api/js?region=sg&libraries=places&language=zh-CN&signed_in=false&key=AIzaSyCRnxKr5e6cr1Evt0Evn9l3w76W3c96VcY'

			document.body.appendChild(script)
		}
	}

	createMap() {
		const { maps } = window.google
		if (!maps) warn('google maps is not available')
		const myLatlng = new maps.LatLng(1.343792248621084, 103.84037017822266)
		const mapOption = {
			zoom: 14,
			center: myLatlng,
			disableDefaultUI: false,
      streetViewControl: false,
      mapTypeControl: false,
		}
		if (!this.map) this.map = new maps.Map(querySelector('#gmap'), mapOption)
		if (!this.placeService) this.placeService = new maps.places.PlacesService(this.map)
		if (!!this.marker) this.marker.setMap(null)
		if (!this.state.addPostCodeing) {
			this.map.setCenter({lat: this.state.editPostCode.latitude, lng: this.state.editPostCode.longitude})
			this.marker = new maps.Marker({
				position: { lat: this.state.editPostCode.latitude, lng: this.state.editPostCode.longitude },
				map: this.map,
				draggable: true,
				animation: maps.Animation.DROP
			})
			this.marker.addListener('dragend', e => {
				this.props.form.setFieldsValue({
					latitude: e.latLng.lat(),
					longitude: e.latLng.lng()
				})
				this.map.setCenter(e.latLng)
			})
		} else {
			this.map.setCenter(myLatlng)
			this.marker = new maps.Marker({
				position: myLatlng,
				map: this.map,
				draggable: true,
				animation: maps.Animation.DROP
			})
			this.props.form.setFieldsValue({
				latitude: myLatlng.lat(),
				longitude: myLatlng.lng()
			})
			this.marker.addListener('dragend', e => {
				this.state.addPostCode.longitude = e.latLng.lng()
				this.state.addPostCode.latitude = e.latLng.lat()
				this.props.form.setFieldsValue({
					latitude: e.latLng.lat(),
					longitude: e.latLng.lng()
				})
				this.map.setCenter(e.latLng)
			})
		}
	}

	fetchPostCode(offset = 0, limit = 20) {
		const hide = message.loading('loading data ... ')
		D2D_API
			.post('/FindPostCodes')
			.send({offset: offset, limit: limit})
			.json()
			.then(res => {
				hide()
				this.setState({
					allPostCode: this.state.allPostCode.concat(res),
					loading: false
				})
			})
			.catch(err => {console.error(err)})
	}

	addPostCode(postCode) {
		postCode.latitude = Number(postCode.latitude)
		postCode.longitude = Number(postCode.longitude)
		this.resetAddCode()
		D2D_API
			.post('/AddPostCode')
			.send({ postCode })
			.then(msg => {
				if (msg.ok === true) {
					success('添加成功')
					this.state.allPostCode = []
					this.fetchPostCode()
				} else {
					warn('添加失败')
				}
			})
			.catch(err => {console.error(err)})
	}

	updatePosteCode(postCode) {
		D2D_API
			.post('/UpdatePostCode')
			.send({ postCode })
			.then(msg => {
				if (msg.ok === true) {
					success('更新成功')
					this.state.allPostCode = []
					this.fetchPostCode()
				} else {
					warn('更新失败')
				}
			})
			.catch(err => {console.error(err)})
	}

	deletePostCode(id) {
		D2D_API
			.post('/DeletePostCode')
			.send({ id })
			.then(msg => {
				if (msg.ok === true) {
					success('删除成功')
					this.state.allPostCode = []
					this.fetchPostCode()
				} else {
					warn('删除失败')
				}
			})
			.catch(err => {console.error(err)})
	}

	checkPostCode(rule, value, callback) {
		if (isNaN(parseInt(value))) {
			callback('invalid post codes')
		} else if ((parseInt(value) + '').length != 6) {
			callback('invalid post codes')
		}

		callback()
	}

	onPageChange(n) {
		const { allPostCode } = this.state
		if (n * 10 >= allPostCode.length) {
			this.fetchPostCode(allPostCode.length , 20)
		}
	}

	render () {
		const {
			loading,
			addPostCodeing,
			addPostCode,
			editPostCode,
			deletID,
			showDeleteDialog,
			showAddDialog,
			allPostCode,
			mapLoading
		} = this.state

		const { getFieldsValue, getFieldValue, getFieldProps, setFieldsValue } = this.props.form

		for (let elm of ['Post Code', 'Latitude', 'Longitude']) {
			const name = (elm.charAt(0).toLowerCase() + elm.slice(1)).replace(' ', '')
			getFieldProps(
				name,
				{
					initialValue: addPostCodeing ? '' : (editPostCode ? editPostCode[name] : ''),
					rules: [
						{ required: true, message: `Pleace Input The ${elm}` },
						{ validator: this.checkPostCode }
					]
				}
			)
		}

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		}

		const pagination = {
			size: allPostCode.length,
			onChange: this.onPageChange.bind(this)
		}

		const columns = [{
			title: 'Postal Code',
			dataIndex: 'postCode',
			key: 'postCode'
		}, {
			title: 'Latitude',
			dataIndex: 'latitude',
			key: 'latitude',
		}, {
			title: 'Longitude',
			dataIndex: 'longitude',
			key: 'longitude',
		}, {
			title: 'Edit / Delete',
			key: 'edit',
			render: (text, record) => (
				<div style={{ width: 100 }}>
					<ButtonGroup>
						<Button
							onClick={() => {
								this.setState({
									editPostCode: record,
									showAddDialog: !showAddDialog,
								})
								this.props.form.setFieldsValue(record)
								setTimeout(() => {
									this.createMap()
								}, 200)
							}}
							type="primary">
							<Icon type="edit" />
						</Button>
						<Button
							onClick={() => {
								this.setState({
									deletID: record.ID,
									showDeleteDialog: !showDeleteDialog
								})
							}}
							type="primary">
							<Icon type="delete" />
						</Button>
					</ButtonGroup>
				</div>
			),
		}]

		if (loading) {
			return null
		}

		return (
			<div>
				<Table columns={columns} pagination={pagination} dataSource={allPostCode} rowKey={row => row.ID} loading={this.state.loading} />
				<div style={{
					marginBottom: 60
				}}>
					<Row type="flex" justify="center">
						<Col span={'1'}>
							<Button
								type="primary"
								shape="circle"
								size="large"
								onClick={() => {
									this.resetAddCode()
									this.setState({
										addPostCodeing: true
									})
									setTimeout(() => {
										this.setState({
											showAddDialog: !showAddDialog
										})
										this.createMap()
									}, 200)
								}}
							>
								<Icon type="plus" />
							</Button>
						</Col>
					</Row>
				</div>
				<Modal title={addPostCodeing ? "Add Post Code" : "Edit Post Code"}
					visible={showAddDialog}
					onOk={() => {
						const _postCode = getFieldValue('postCode'),
									_latitude = parseFloat(getFieldValue('latitude')),
						      _longitude = parseFloat(getFieldValue('longitude'))
						if (isNaN(Number(_postCode)) || _postCode.length != 6) {
							warn('invalid post code')
							return
						} else if (isNaN(_latitude) || _latitude < -90 || _latitude > 90) {
							warn('invalid latitude')
							return
						} else if (isNaN(_longitude) || _longitude < -180 || _longitude > 180) {
							warn('invalid longitude')
							return
						}

						this.setState({
							showAddDialog: !showAddDialog
						})
						if (addPostCodeing) {
							setTimeout(() => {
								this.setState({
									addPostCodeing: false
								})
							}, 500)
							this.addPostCode(this.props.form.getFieldsValue())
						} else {
							this.updatePosteCode(Object.assign({}, this.state.editPostCode, {postCode:_postCode, latitude: _latitude, longitude: _longitude}))
						}
					}}
					onCancel={() => {
						this.setState({
							showAddDialog: !showAddDialog
						})
						setTimeout(() => {
							if (addPostCodeing) {
								this.setState({
									addPostCodeing: false
								})
							}
						}, 500)
					}}
				>
					<Form horizontal form={this.props.form}>
						{
							['Post Code', 'Latitude', 'Longitude'].map(elm => {
								const name = (elm.charAt(0).toLowerCase() + elm.slice(1)).replace(' ', '')
								return (
									<FormItem
										{...formItemLayout}
										label={elm}
									>
										<Input
											{...getFieldProps(name)}
											placeholder={`Pleace Input ${elm}`}
											onChange={e => {
												const form = getFieldsValue()
												form[name] = e.currentTarget.value
												setFieldsValue(form)

												this.map.setCenter({
													lat: parseFloat(getFieldValue('latitude')),
													lng: parseFloat(getFieldValue('longitude'))
												})
												this.marker.setPosition({
													lat: parseFloat(getFieldValue('latitude')),
													lng: parseFloat(getFieldValue('longitude'))
												})

												if (name === 'postCode') {
													const code = e.currentTarget.value
													if (!isNaN(Number(code)) && code.length === 6) {
														let hide = message.loading('searching for the code...', 0)
														this.placeService.textSearch({
															query: code
														},(places, status) => {
															hide()
															if (status === google.maps.places.PlacesServiceStatus.OK) {
																if (places.length === 1) {
																	const _location = places[0].geometry.location
																	this.map.setCenter(_location)
																	this.marker.setPosition(_location)
																	setFieldsValue({latitude: _location.lat() + '', longitude: _location.lng() + ''})
																}
															} else {
																warn('search failed..please move the marker manually')
															}
														})
													}
												}
											}}
										/>
									</FormItem>
								)
							})
						}

					</Form>
					<div id="gmap" />
				</Modal>
				<Modal title="Delete Post Code"
					visible={showDeleteDialog}
					onOk={() => {
						this.deletePostCode(deletID)
						this.setState({
							showDeleteDialog: !showDeleteDialog
						})
					}}
					onCancel={() => {
						this.setState({
							showDeleteDialog: !showDeleteDialog
						})
					}}
				>
					Are You Sure Delte This Post Code ?
				</Modal>
			</div>
		)
	}
}

LocationMapping = Form.create()(LocationMapping)
export default LocationMapping
