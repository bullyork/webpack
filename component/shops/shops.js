import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { redirect } from '../../util/history'
import {getCurrentTab} from '../../action/shops'


@connect(state => ({
  currentTab: state.currentTab,
}))
class Main extends Component {
  render(){
    const {
      dispatch,
      children,
      currentTab
    } = this.props
    const buttonList = [{
      name:'海运',
      ename: 'SeaCids'
    },{
      name:'下架',
      ename:'UnderCarriageCids'
    },{
      name:'导入prime',
      ename:'ImportToPrime'
    },
    {
      name:'Prime运输方式',
      ename:'PrimeShipMent'
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

export default Main