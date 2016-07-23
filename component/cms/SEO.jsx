import React, { Component } from 'react';
import {connect} from 'react-redux';
import ShowText  from './showText.js';
import { changeEditContent, updateEditHtml, fullAddItem } from '../../action/cms.js';
import { Modal, Form, Input,Row,Col, Button, Select, message} from 'antd';
import CmsShow from './cmsShow.jsx';
import SeoEdit from './seoEdit.jsx';

const FormItem = Form.Item;

@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, isEdit:state.isEdit, activeItem: state.activeItem, area: state.area, lang:state.lang}))
export default class SEO extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      addBox: false
    }
  }

  render(){
    const {activeItem, isEdit, dispatch, cmsKey} = this.props;
    const {visible, addBox} = this.state;
    var itemData = JSON.parse(activeItem.html);

    return (
      <div className="seo-section">
        <p className="">
          <Button onClick={()=>{
            this.setState({
              isAdd:true,
              visible:true
            });
            return false;
          }} type="primary">Add SEO</Button>
          <br/>
        </p>

        {isEdit ? (
          <div>
            <SeoEdit ref="seoEdit" isAdd={false} {...activeItem} />
            <Button onClick={this.changeFn.bind(this)}>Confirm Update</Button>
          </div>

        ) : (
          <CmsShow data={itemData} />
        )}

        <Modal width="800" title="Add SEO" style={{width:"600px"}} visible={visible} onOk={this._okHandler.bind(this)} onCancel={()=>{
          this.setState({
            visible:false
          })
        }}>
          <SeoEdit ref="addSEO" isAdd={true}  />
        </Modal>
      </div>
    )
  }

  changeFn(){
    const {cmsKey, dispatch} = this.props;
    var formData = this.refs.seoEdit.getFieldsValue();
    let {title, keywords, description} = formData;

    let htmlObj = {
      title,
      keywords,
      description
    };

    let html = JSON.stringify(htmlObj);

    dispatch(changeEditContent(html));
    dispatch(updateEditHtml(cmsKey, html));
  }

  _okHandler(){
    // 添加seo
    const {dispatch, area, lang, ctype} = this.props;
    var formData = this.refs.addSEO.getFieldsValue();
    let {name, path, cmsKey, title, keywords, description} = formData;

    let htmlObj = {
      title,
      keywords,
      description
    };

    let html = JSON.stringify(htmlObj);
    let addObj = {
      key:cmsKey,
      name,
      area,
      lang,
      path,
      ctype,
      html
    };

    dispatch(fullAddItem(addObj,(data)=>{
      if(data){
        message.success('add item successful!');
      }else{
        message.error('add item failed');
      }
    }))


    this.setState({
      visible:false
    })

  }
}