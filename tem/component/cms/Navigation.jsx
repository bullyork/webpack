import React, { Component } from 'react';
import {connect} from 'react-redux';
import {showKeyBooks} from './showKeyBooks.js';
import {changeEditContent} from '../../action/cms.js';
import {Switch, Input, Button} from 'antd'
import './../../less/nav.less';

@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, isEdit:state.isEdit, activeItem: state.activeItem}))
export default class Navigation extends Component {
  constructor(props){
    super(props)
    this.state = {
      source: JSON.parse(props.activeItem.html)
    }
  }
  render() {
    const {activeItem, isEdit, dispatch} = this.props;
    let source = this.state.source;
    let all = null, addItem = null;

    if(isEdit){
      addItem = (<Button onClick={this.add.bind(this)}>Add Nav</Button>);

      all =source.map((val,i)=>{
        return (
          <EditContent key={val.idx} index={i} data={val} onDelete={this.deleteItem.bind(this, i)} onUpdate={this.updateHtml.bind(this)} />
        )
      });
    }else{
      all = JSON.parse(activeItem.html).map((val,i)=>{
        return (
          <ShowContent key={i} data={val} />
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
    let {source} = this.state;
    source.splice(index,1);
    this.updateHtml(source);
  }

  updateHtml(value, index){
    const {dispatch} = this.props;
    let {source} = this.state;

    if(source instanceof Array && typeof index !== "undefined"){
      source[index] = value;
    }else{
      source = value;
    }

    let html = JSON.stringify(source);
    dispatch(changeEditContent(html));

    source.forEach((item,i)=>{
      item.index = i;
      // delete item.idx;
    })

    this.setState({
      source:source
    });

  }

  add(){
    const {source} = this.state;
    let newSource = source.concat({
      name:"",
      link:"",
      target:false
    });

    this.setState({
      source:newSource
    },()=>{
      this.genIdxs();
    });
  }

  genIdxs(){
    const {source} = this.state;
    var prex = "abc_";
    var genData = source.map((item,i)=>{
      var idx = item.idx;
      if(!idx){
        item.idx = prex + Math.random() * 100 + i + Date.now();
      }
      return item;
    })
  }

  componentWillReceiveProps(nextprops){
    const {cmsKey} = this.props;
    if(cmsKey !== nextprops.cmsKey){
      this.setState({
        source: JSON.parse(nextprops.activeItem.html)
      })
    }
  }

  componentDidMount(){
    this.genIdxs();
  }
}

class ShowContent extends Component{
  constructor(props){
    super(props);
  }

  render(){
     const {data, key} = this.props;
     let idx = 0;
     let contents = [];
     var keys = Object.keys(data);

     return (
      <div className="_show-item">
        { keys.map((key,i)=>{
          let value = data[key];
          let label = showKeyBooks[key] || key;

          if(key === 'idx'){ return null; }
          if(typeof value === "boolean"){
            value = value ? "YES" : "NO";
          }

          return (
            <div key={i} className="item">
              <label htmlFor="">{label}:</label>
              <p className="_content">
                {value}
              </p>
            </div>
          )
        }) }
      </div>
    )
  }
}

@connect((state)=>({cmsKey: state.cmsKey}))
class EditContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:props.data
    }
  }
  render(){
     const {data} = this.state;
     let idx = 0;
     let contents = [];
     var keys = Object.keys(data);

     contents = keys.map((key,i)=>{
        let ref_value = `abc_${key}`;
        let value_dom = null;
        let value = data[key];
        let label = showKeyBooks[key] || key;

        if(key === 'idx'){
          return null;
        }

        switch(typeof value) {
          case "boolean":
            value_dom = (<Switch ref={ref_value} checkedChildren="OK" unCheckedChildren="NO" defaultChecked={value} onChange={this.changeField.bind(this, key)}/>)
            break;
          case "string":
            value_dom = (<input ref={ref_value} defaultValue={value} onChange={this.changeField.bind(this, key)} />)
            break;
          default:
            value_dom = (<span>{value}</span>);
            break;
        }

        return (
          <div key={i} className="item">
            <label htmlFor="">{label}:</label>
            <p className="_content">
              {value_dom}
            </p>
          </div>
        )
     })

     return (
      <div className="_show-item">
        <Button className="delete" onClick={this.handleDelete.bind(this)}>delete</Button>
        {contents}
      </div>
    )
  }

  handleDelete(){
    const {onDelete, index} = this.props;
    onDelete(index);
  }

  changeField(field, target){
    const {data} = this.state;
    const {index, onUpdate} = this.props;

    if(field === "target"){
      data.target = target;
    }else{
      data[field] = this.refs[`abc_${field}`].value;
    }
    onUpdate(data, index);
  }
}
