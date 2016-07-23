import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { redirect } from '../../util/history'
import {getCurrentTab} from '../../action/merchandise'

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
      name:'发布类目和属性',
      ename:'Edit'
    },{
      name: '展示类目－展示规则编辑',
      ename: 'DisplayRulesSet'
    },{
      name: '展示类目－展示规则列表',
      ename: 'DisplayRulesList'
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