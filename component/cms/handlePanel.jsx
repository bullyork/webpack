import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Modal, Button } from 'antd';
import CmsUrl from "../../common/cmsUrl.js";
import {getCtypeItem} from './cmsTypes.js';

import {updateEditHtml, publishItem, revertItem, deleteItem, changeEdit} from '../../action/cms.js';

@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, cmsTypeItem: getCtypeItem(state.ctype), isEdit:state.isEdit, editContent:state.editContent, activeItem: state.activeItem}))
export class HandlePanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      messageVisible:false,
      message:""
    }
  }
  render() {
    const {visible, messageVisible, message} = this.state;
    const {cmsKey, dispatch, isEdit, cmsTypeItem} = this.props;
    const {type, preview, onlyEdit, onlyRead, save} = cmsTypeItem;


    let saveButtonText = "Save and Preview";
    let showDel = "btn btn-default " + (onlyRead ? "hide" :"");
    if(onlyEdit){
      showDel = "hide";
    }

    if(!preview){
      saveButtonText = "Save";
    }


    return (
      <div className="handle-line">
        <Button className={"btn btn-default " + (onlyRead ? "hide" :"")} onClick={()=>{dispatch(changeEdit(!isEdit))}} >{isEdit ? "Exit Edit" : "Edit"}</Button>
        &nbsp;&nbsp;
        <Button className={"btn btn-default " + (!save ? "hide" :"")} onClick={this.saveEditContent.bind(this)}> { saveButtonText }</Button>
        &nbsp;&nbsp;
        <div className="pull-right">
          <Button onClick={this.PublishItem.bind(this)} className={"btn btn-default " + (onlyRead ? "hide" :"")}>Publish</Button>
          &nbsp;&nbsp;
          <Button onClick={this.RevertVersion.bind(this)} className={"btn btn-default " + (onlyRead ? "hide" :"")}>Back Version</Button>
          &nbsp;&nbsp;
          <Button onClick={this.DeleteItem.bind(this)} className={showDel}>Delete</Button>
        </div>

        <Modal title="Message" visible={messageVisible} onOk={this.confirmMeg.bind(this)} onCancel={this.confirmMeg.bind(this)}>
          {message}
        </Modal>
      </div>
    )
  }

  confirmMeg(){
    this.setState({
      messageVisible:false,
      message:""
    });
  }

  saveEditContent(){
    const { dispatch, cmsKey, editContent, cmsTypeItem, activeItem} = this.props;
    const {lang, area, key} = activeItem;
    const {type, preview, onlyEdit, onlyRead} = cmsTypeItem;
    var that = this;

    if(editContent === null || editContent === ""){
      console.log(editContent);
      alert('data is error!');
      return false;
    }

    var sureDelete = confirm('Are you sure save edit item?');
    if(!sureDelete){
      return false;
    }


    var that = this;
    var previewPath = CmsUrl.getPreviewUrl(area);

    let _preview = null;
    let _path = activeItem.path
    let _s = "?lang="+lang +"&area=" + area +"&isPreview=true";
    let _arr = _path.split(/#{1}/);
    _arr.splice(1,0,_s + '#');
    previewPath = previewPath + _arr.join('');

    dispatch(updateEditHtml(cmsKey,editContent,function(){
      if(preview){
        _preview = window.open(previewPath);
      }else{
        alert('save successful!');
      }

    }));
  }

  DeleteItem(){
    const { dispatch, cmsKey, activeItem } = this.props;
    var that = this;

    var sureDelete = confirm('Are you sure delete this item?');
    if(!sureDelete){
      return false;
    }

    dispatch(deleteItem(cmsKey,function(data){
      const {name} = activeItem;
      if(data){
        alert(`delete ${name} successful!`)
      }else{
        alert(`delete ${name} failed!`)
      }
    }));

  }
  PublishItem(){
    const {dispatch, cmsKey, activeItem } = this.props;
    const that = this;

    if(activeItem.isPublish){
      alert('this item is published!');
      return false;
    }

    var surePublish = confirm('Are you sure publish edit item?');
    if(!surePublish){
      return false;
    }

    dispatch(publishItem(cmsKey,function(data){
      const {name} = activeItem;
      if(data){
        that.setState({
          message:`publish ${name} successful!`,
          messageVisible:true
        });
      }else{
        that.setState({
          message:`publish ${name} failed!`,
          messageVisible:true
        });
      }
    }))
  }

  RevertVersion(){
    const { dispatch, cmsKey, activeItem} = this.props;

    var surePublish = confirm('Are you sure revert?');
    if(!surePublish){
      return false;
    }

    var that = this;
    dispatch(revertItem(cmsKey, function(data){
      const {name} = activeItem;

      if(data){
        that.setState({
          message:`RevertVersion ${name} successful! `,
          messageVisible:true
        });
      }else{
        that.setState({
          message:`RevertVersion ${name} failed! `,
          messageVisible:true
        });
      }
    }));

  }
}
