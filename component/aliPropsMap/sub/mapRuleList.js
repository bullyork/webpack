import React,{Component} from 'react'
import { connect } from 'react-redux'
import { 
  getCurrentTab
} from '../../../action/merchandise'
@connect()
class MapRuleList extends Component{
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('MapRuleList'))
  }
  render(){
    return (<p>我是mapRuleList</p>)
  }
}
export default MapRuleList
