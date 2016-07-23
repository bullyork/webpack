import React, { Component } from 'react';
import Sidebar from "./sidebar.jsx";
import ctypes from './cmsTypes.js'
import {connect} from 'react-redux';
import ShowText  from './showText.js';
import {changeCtype} from '../../action/cms.js';
import { Modal, Form, Input,Row,Col, Button, Select} from 'antd';

const FormItem = Form.Item;

@Form.create()
@connect((state)=>({
  area: state.area,
  lang: state.lang,
  isEdit: state.isEdit,
  cmsKey: state.cmsKey
}))
export default class EditBox extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const {area, lang, isAdd} = this.props;
    const { getFieldProps } = this.props.form;
    const {langsBook, areasBook} = ShowText;
    let cannot = false;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };


    if(isAdd){
      cannot = false;
    }else{
      cannot = true;
    }
    return (
      <Form horizontal>
        <FormItem {...formItemLayout}
          label="contryCode:">
          <span className="text">
            {areasBook[area]}
          </span>
        </FormItem>
        <FormItem {...formItemLayout}
          label="language:">
          <span className="text">
            {langsBook[lang]}
          </span>
        </FormItem>

        <FormItem {...formItemLayout} label="key:">
          <Input disabled={true} type="text" {...getFieldProps('cmsKey')} />
        </FormItem>

        <FormItem {...formItemLayout} label="name:">
          <Input disabled={cannot} type="text" {...getFieldProps('name')} />
        </FormItem>

        <FormItem {...formItemLayout} label="path:" help="Must relative path. eg: /Prime">
          <Input disabled={cannot} type="text" {...getFieldProps('path')} onChange={this.handlePath.bind(this)} />
        </FormItem>

        <FormItem {...formItemLayout} label="title:">
          <Input rows="5" type="textarea" {...getFieldProps('title')} />
        </FormItem>

        <FormItem {...formItemLayout} label="description:">
          <Input rows="5" type="textarea" {...getFieldProps('description')} />
        </FormItem>

        <FormItem {...formItemLayout} label="keywords:">
          <Input rows="5" type="textarea" {...getFieldProps('keywords')} />
        </FormItem>
      </Form>
    )
  }

  handlePath(eve){
    const {area, lang, isAdd} = this.props;
    const { setFieldsValue, getFieldValue } = this.props.form;
    let path = eve.target.value.trim();

    let key = path.replace(/\/|-|\s/g,"_").toLowerCase() + '_' + area + '_' + lang;

    // key 的命名规则很重要
    setFieldsValue({
      cmsKey: key,
      path:path
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.cmsKey !== nextProps.cmsKey){
      this.dataInit();
    }
  }

  dataInit(){
    const {html, isAdd, cmsKey, name, path} = this.props;
    const {setFieldsValue} = this.props.form;
    let contentObj;

    if(isAdd){
      return;
    }

    if(!html || html === ""){
      console.error(`html content can not is empty`);
      return;
    }

    try{
      contentObj =  JSON.parse(html);
    }catch(meg){
      console.error(`SEO infomation JSON parse ${meg}`);
    }

    var data = Object.assign({},{cmsKey, name, path}, contentObj);
    if(!isAdd && data){
      setFieldsValue(data);
    }
  }

  componentDidMount(){
    this.dataInit();
  }
}