import React,{Component} from 'react'
import {Table,Button} from 'antd'
import {redirect} from '../../../util/history'
import { connect } from 'react-redux'
import { 
  adminDisplaySetList,
  getCurrentTab
} from '../../../action/merchandise'
@connect(state =>({
  displaySetList: state.displaySetList
}))
class DisplayRuleList extends Component{
  constructor(props){
    super(props)
    this.state={
      current:1
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('DisplayRulesList'))
    const listQuery = {
      limit:10,
      skip: 0,
      prefix: '',
      caseSensitive: false
    }
    dispatch(adminDisplaySetList(listQuery))
  }
  render(){
    const {
      dispatch,
      displaySetList
    } = this.props
    const {
      total,
      data
    } = displaySetList
    const {current} = this.state
    const pagination = {
      total: total,
      current: current,
      showSizeChanger: false,
      onChange: (current) => {
        const listQuery = {
          limit:10,
          skip: (current-1)*10,
          prefix: '',
          caseSensitive: false
        }
        dispatch(adminDisplaySetList(listQuery))
        this.setState({current})
      }
    }
    const columns =[{
      title: 'id',
      key: 'id',
      dataIndex: 'id'
    },{
      title: '路径',
      key: 'name',
      dataIndex: 'name'
    },{
      title: '名字',
      key: 'singleName',
      render: (text,record) => {
        const reg = /([^(>>)])*$/g
        const name = record.name.match(reg)
        return (<span>{name[0]}</span>)
      }
    },{
      title: '状态',
      key: 'disabled',
      render: (text) =>{
        const state = text?'下线':'线上'
        return (<span>{state}</span>)
      }
    }]
    return (<section>
        <Table columns={columns} dataSource={data} pagination={pagination}/>
      </section>)
  }
}
export default DisplayRuleList