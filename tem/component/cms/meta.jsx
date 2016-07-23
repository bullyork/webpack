import React, { Component } from 'react';
import Sidebar from "./sidebar.jsx";
import CmsContent from "./content.jsx";
import ctypes from './cmsTypes.js'
import {connect} from 'react-redux';
import ShowText  from './showText.js';
import {changeCtype,fullAddItem} from '../../action/cms.js';
import { Modal, Form, Input,Row,Col, Button, Select} from 'antd';
import EditBox,{formTodata} from "./seoEdit.jsx";

const FormItem = Form.Item;

@connect((state)=>({ctype: state.ctype}))
export class Meta extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <section className="module-seo">
        <AddMeta />
        <sction className="cms-wrapper">
          <Sidebar />
          <CmsContent />
        </sction>
      </section>
    )
  }
}

@connect((state)=>({ctype: state.ctype}))
export default class AddMeta extends Component{
  constructor(props){
    super(props)
    this.state = {
      Modal:false
    }
  }

  render(){

    const {dispatch} = this.props;

    return (
      <div className="add-meta">
        <Button type="primary" onClick={ ()=> { this.setState({ Modal: !this.state.Modal }) } }>Add Meta</Button>
        <Modal width="800" title="Add new page Meta" style={{width:"600px"}} visible={this.state.Modal} onOk={this._okHandler.bind(this)} onCancel={this._cancleHandle.bind(this)}>
          <EditBox ref="addForm" isAdd={true}/>
        </Modal>
      </div>
    )
  }

  _okHandler(){
    const {dispatch, ctype} = this.props;
    const formData = this.refs.addForm.getFieldsValue();

    if(!formData.area){
      alert('please select area');
      return;
    }

    if(!formData.lang){
      alert('please select lang');
      return;
    }

    if(!formData.name || formData.name.trim() === ''){
      alert('name cannot empty');
      return;
    }

    if(!formData.path || formData.path.trim() === ''){
      alert('path cannot empty');
      return;
    }

    if(!formData.title || formData.title.trim() === ''){
      alert('title cannot empty');
      return;
    }

    if(!formData.description || formData.description.trim() === ''){
      alert('description cannot empty');
      return;
    }

    if(!formData.keywords || formData.keywords.trim() === ''){
      alert('keywords cannot empty');
      return;
    }

    let params = formTodata(formData);

    dispatch(fullAddItem(params, ctype, function(data){
      console.log(data);
    }))

    this.setState({
      Modal:false
    })
  }

  _cancleHandle(){
    this.setState({
      Modal:false
    })
  }
}