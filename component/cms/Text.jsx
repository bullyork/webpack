import React, { Component } from 'react';
import {connect} from 'react-redux';
import {showKeyBooks} from './showKeyBooks.js';
import {changeEditContent} from '../../action/cms.js';
import {Switch, Input, Button} from 'antd'
import {getCtypeItem} from './cmsTypes.js'

import './../../less/nav.less';

@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, isEdit:state.isEdit, activeItem: state.activeItem}))
export default class Text extends Component {

  constructor(props){
    super(props)
    this.state = {
      editHtml: props.activeItem.html,
      source: JSON.parse(props.activeItem.html)
    }
  }

  render() {
    const {activeItem, isEdit, dispatch, ctype} = this.props;
    const onEdit = getCtypeItem(ctype).onlyEdit;

    let all = null, addItem = null;


    if(!activeItem){
      return null;
    }

    if(isEdit){
      const {editHtml, source} = this.state;
      all =source.map((val,i)=>{
        return (
          <EditTextItem onEdit={onEdit} index={i} data={val} source={source} onDelete={this.deleteItem.bind(this, i)} onChangeContent={this.ChangeContent.bind(this)} />
        )
      });

      if(!onEdit){
        addItem = (<Button onClick={this.add.bind(this)}>Add Nav</Button>);
      }
    }else{
      let source = JSON.parse(activeItem.html);
      all =source.map((val)=>{
        return (
          <ShowTextItem data={val} />
        )
      });
    }

    return (
      <div className="navigation">
        {addItem}
        {all}
      </div>
    );
  }

  deleteItem(index){
    let source = this.state.source;
    source.splice(index,1);

    this.setState({
      source:source
    });
  }

  add(){
    let source = this.state.source;

    source.push({
      key:"your_key",
      name:"your name",
    });

    this.setState({
      source:source
    });
  }

  ChangeContent(html){
    const {dispatch} = this.props;
    dispatch(changeEditContent(html))

    this.setState({
      editHtml:html
    })
  }

  componentWillReceiveProps(nextprops){
    const {cmsKey} = this.props;
    if(cmsKey !== nextprops.cmsKey){
      this.setState({
        editHtml: nextprops.activeItem.html,
        source: JSON.parse(nextprops.activeItem.html)
      })
    }
  }
}

class ShowTextItem extends Component{
  constructor(props){
    super(props);
  }

  render(){
     const {data} = this.props;
     let contents = [];

     for(var prp in data){
        let value = data[prp];
        let label = showKeyBooks[prp] ? showKeyBooks[prp] : prp;

        if(typeof value === "boolean"){
          value = value ? "YES" : "NO";
        }

        let _t = (
          <div className="item">
            <label htmlFor="">{label}:</label>
            <p className="_content">
              {value}
            </p>
          </div>
        )

        contents.push(_t);
     }

     return (
      <div className="_show-item">
        {contents}
      </div>
    )
  }
}


@connect((state)=>({cmsKey: state.cmsKey}))
class EditTextItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:props.data,
      add: props.data.key === 'your_key'
    }
  }
  render(){
     const {data, add, onEdit} = this.state;
     let contents = [];

     for(var prp in data){
        let value = data[prp];
        let label = showKeyBooks[prp] ? showKeyBooks[prp] : prp;

        let value_dom = null;

        switch(prp) {
          case "name":
            value_dom = (<input ref="name" defaultValue={value} onChange={this.changeName.bind(this)} />)
            break;
          default:
            value_dom = (<span>{value}</span>);
            break;
        }

        if(add){
            value_dom = (<input ref="key" defaultValue={value} onChange={this.changeKey.bind(this)} />)
        }

        let _t = (
          <div className="item">
            <label htmlFor="">{label}:</label>
            <p className="_content">
              {value_dom}
            </p>
          </div>
        )

        contents.push(_t);
     }

     return (
      <div className="_show-item">
        {contents}
      </div>
    )
  }

  changeKey(){
    const {onChangeContent, source, index} = this.props;
    const {data} = this.state;
    data.key = this.refs.key.value;
    source[index] = data;
    this.setState({
      data:data
    })
    onChangeContent(JSON.stringify(source))
  }


  changeName(){
    const {onChangeContent, source, index} = this.props;
    const {data} = this.state;
    data.name = this.refs.name.value;
    source[index] = data;
    this.setState({
      data:data
    })
    onChangeContent(JSON.stringify(source))
  }
}
