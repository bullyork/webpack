import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import Banner from './sub/banner'
import Category from './sub/category'
import Floor from './sub/floor'
import { Menu } from 'antd'
import { redirect } from '../../util/history'
import {getCurrentTab} from '../../action/hpArrange'


@connect(state => ({
  currentTab: state.currentTab,
}))
class Main extends Component {
  render(){
    const {
      dispatch,
      children,
      currentTab,
      countryCode,
    } = this.props
    const buttonList = ['banner','category', 'floor']
    const buttons = buttonList.map(function(item, index){
      if(currentTab == item){
        return(
        <Button type='primary' style={{marginRight: '5px'}} onClick = {() => {
          dispatch(getCurrentTab(item))
          redirect(`/${item}`) 
        }}>{item}</Button>
        )
      }else{
        return(
        <Button style={{marginRight: '5px'}} onClick = {() => {
          dispatch(getCurrentTab(item))
          redirect(`/${item}`) 
        }}>{item}</Button>
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