import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { redirect } from '../../util/history'
import {getCurrentTab} from '../../action/ezdelivery'

@connect(state => ({
  currentTab: state.currentTab,
}))
class Ezdelivery extends Component {
  render(){
    console.log(121)
    const {
      dispatch,
      children,
      currentTab
    } = this.props
    const buttonList = [{
      name:'用户信息',
      ename:'UserInfo'
    },{
      name: '添加用户',
      ename: 'AddUser'
    },{
      name: '站点详情',
      ename: 'StaionInfo'
    }]
    const buttons = buttonList.map(function(item, index){
      if(currentTab == item.ename){
        return(
        <Button type='primary' style={{marginRight: '5px'}} onClick = {() => {
          dispatch(getCurrentTab(item))
          redirect(`/${item.ename}`) 
        }}>{item.name}</Button>
        )
      }else{
        return(
        <Button style={{marginRight: '5px'}} onClick = {() => {
          dispatch(getCurrentTab(item.ename))
          redirect(`/${item.ename}`) 
        }}>{item.name}</Button>
        )
      }
      
    }.bind(this))
    return(
      <div>
        <section>
          <header style={{paddingBottom: '5px',paddingTop: '10px'}}>
            {buttons}
          </header>
          {children}
        </section>
      </div>
    )
  }
}

export default Ezdelivery