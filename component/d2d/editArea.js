import React,{Component} from 'react'
import { connect } from 'react-redux'
import store from '../../store/d2d'
import { getZipGroups, updateDriver, getDrivers } from '../../action/d2d'
import { Form, Input, Table, Button, Modal, Transfer } from 'antd'

@connect(state => ({zipGroups: state.zipGroups, driver: state.drivers.find(driver => driver.driverNo === state.editingDriverId)}))
class Main extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      mockData: [],
      targetKeys: []
    }
  }

  componentDidMount() {
    // this.getMock()     
  }

  getMock() {
    const targetKeys = []
    const mockData = []
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i,
        title: `内容${i + 1}`,
        description: `内容${i + 1}的描述`,
        chosen: Math.random() * 2 > 1,
      }
      if (data.chosen) {
        targetKeys.push(data.key)
      }
      mockData.push(data)
    }
    this.setState({ mockData, targetKeys })
  }

  render () {
    const { zipGroups, driver } = this.props

    const ds = zipGroups ? zipGroups.map(zg => ({key: zg.ID, text: zg.name + '(' + zg.postCodes.join(',') + ')'})) : []
    const tks = driver.postCodeGroups ? driver.postCodeGroups.map(zg => zg.ID) : []

    return (
      <Transfer
        dataSource={ds}
        targetKeys={tks}
        onChange={this.handleChange.bind(this)}
        title={['Zip Group List', 'Delivery Area']}
        listStyle={{
          width: 500,
          height: 800
        }}
        showSearch
        render={item => item.text}
      />
    )
    // return (
    //   <div>
    //     <Transfer
    //       rowKey={record => record.ID}
    //       dataSource={ds}
    //       showSearch
    //       titles={['Zip Group List', 'Deliver Area']}
    //       listStyle={{
    //         width: 500,
    //         height: 800
    //       }}
    //       onChange={this.handleChange.bind(this)}
    //       targetKeys={tks}
    //       render={item => item.text}
    //     />
    //   </div>
    // )
  }

  handleChange (targetKeys) {
    const { dispatch } = this.props
    const tmp = this.props.zipGroups.filter(zg => targetKeys.includes(zg.ID))
    dispatch(updateDriver(Object.assign({}, this.props.driver, {postCodeGroups:tmp ,postCodeGroupIDs:targetKeys}), () => {
      dispatch(getDrivers())
    }))
  }
}

export default Main