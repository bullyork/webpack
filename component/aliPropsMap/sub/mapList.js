import React,{Component} from 'react'
import { connect } from 'react-redux'
import { 
  getCurrentTab
} from '../../../action/merchandise'
import './mapList.less'
@connect()
class MapList extends Component{
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('MapList'))
  }
  render(){
    return (<p>我是mapList</p>)
  }
}
export default MapList
