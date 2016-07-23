import React,{Component} from "react";
import CmsUrl from "../../common/cmsUrl.js";
import CmsServices from "../../common/CmsServices.js";
import { Modal, Button } from 'antd';
import FAQ from './faq.jsx';
import showText from './showText.js';
import {connect} from 'react-redux';
import Tags from './tag.jsx';
import EditBox,{formTodata} from "./seoEdit.jsx";
import {searchEditItem, updateEditHtml, publishItem, revertItem, deleteItem} from '../../action/cms.js';


@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, activeItem: state.activeItem}))
export default class CmsContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeItem: props.activeItem,
      htmlContent: props.activeItem ? props.activeItem.html : null,
      isEdit:false,
      visible:false,
      ContentIsChange:false,
      messageVisible:false,
      isFAQ: props.ctype === "FAQ",
      isSEO: props.ctype === "SEO",
      isQuickGuide:props.ctype === "QuickGuide"
    }

    var that = this;
    this.editChangeFn = function(eve){
      that.editChange.call(that,eve);
    }
  }

  render(){
    const {cmsKey} = this.props;

    if(cmsKey === ""){
      return this.renderInitContent();
    }

    return (
      <div className="cms-wrapper--content">
        {this.renderHandleLine()}

        {this.renderEditText()}

        <Modal title="Confirm" visible={this.state.visible}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
            {this.state.saveText}
        </Modal>
        <Modal title="Message" visible={this.state.messageVisible} onOk={this.confirmMeg.bind(this)} onCancel={this.confirmMeg.bind(this)}>
          {this.state.message}
        </Modal>
      </div>
    );
  }

  renderInitContent(){
    return (
      <h1 className="text-center empty-content">Web Content Edit Area</h1>
    );
  }

  renderHandleLine(){
    const {isFAQ, isSEO, isQuickGuide} = this.state;
    var visible = isFAQ ? "hide" :""
    var visibleDel =  isQuickGuide || isFAQ ? 'hide' :'';

    return (
        <div className="handle-line">
          <button className={"btn btn-default " + visible} onClick={this.handleEdit.bind(this)} >{this.state.isEdit ? "Exit Edit" : "Edit"}</button>
          &nbsp;&nbsp;
          <button className="btn btn-default" onClick={this.showModal.bind(this)}> {isFAQ ? "Preview":"Save and Preview"}</button>
          &nbsp;&nbsp;
          <div className="pull-right">
            <button onClick={this.PublishItem.bind(this)} className="btn btn-default">Publish</button>
            &nbsp;&nbsp;
            <button onClick={this.RevertVersion.bind(this)} className="btn btn-default">Back Version</button>
            &nbsp;&nbsp;
            <button onClick={this.DeleteItem.bind(this)} className={'btn btn-default ' + visibleDel}>Delete</button>
          </div>
        </div>
    )
  }
  confirmMeg(){
    this.setState({
      messageVisible:false,
      message:""
    });
  }

  DeleteItem(){
    const { dispatch, cmsKey, activeItem } = this.props;
    var that = this;
    var sureDelete = confirm('Do you sure delete this item?');

    if(!sureDelete){
      return;
    }

    dispatch(deleteItem(cmsKey,function(data){
      if(data){
        alert(`delete ${activeItem.name} successful!`)
      }else{
        alert(`delete ${activeItem.name} failed!`)
      }
    }));

  }
  PublishItem(){
    const { dispatch, cmsKey, activeItem } = this.props;
    if(cmsKey === ""){
      return false;
    }

    if(activeItem.isPublish){
      alert('this item is published!');
      return false;
    }

    var that = this;
    var surePublish = confirm('Do you sure publish edit item?');
    if(!surePublish){
      return;
    }

    dispatch(publishItem(cmsKey,function(data){
      if(data){
        that.setState({
          message:"publish " + activeItem.name + " successful!",
          messageVisible:true
        });
      }else{
        that.setState({
          message:"publish " + activeItem.name + " failed!",
          messageVisible:true
        });
      }
    }))
  }

  RevertVersion(){
    const { dispatch, cmsKey, activeItem} = this.props;

    if(cmsKey === ""){
      return false;
    }

    var that = this;
    dispatch(revertItem(cmsKey, function(data){
      if(data){
        that.setState({
          message:"RevertVersion " + activeItem.name + " successful!",
          messageVisible:true
        });
      }else{
        that.setState({
          message:"RevertVersion " + activeItem.name + " failed!",
          messageVisible:true
        });
      }
    }));

  }

  showModal(){
    var _saveText = "";
    if(this.state.ContentIsChange){
      _saveText = "Are you sure save change text and preview?";
    }else{
      _saveText = "Are you sure preview?";
    }

    this.setState({
      saveText: _saveText,
      visible: true,
      isEdit: false
    });
  }

  handleOk(){
    // 执行去预览的动作
    const {dispatch,activeItem, ctype} = this.props;
    const {lang,area,key} = activeItem;
    const {ContentIsChange, isFAQ, isSEO} = this.state;
    var reqHtml = '';

    var that = this;
    var previewPath = CmsUrl.getPreviewUrl(area);

    var preview = null;

    var _path = activeItem.path
    var _s = "?lang="+lang +"&area=" + area +"&isPreview=true";
    var _arr = _path.split(/#{1}/);
    _arr.splice(1,0,_s + '#');

    previewPath = previewPath + _arr.join('');

    if(isSEO){
      const formData = this.refs.SEOformData.getFieldsValue();
      var params =  formTodata(formData);
      reqHtml = params.html;

      if(reqHtml === ""){
        alert(0);
      }

    }else{
      reqHtml = this.state.htmlContent;
    }

    if((ContentIsChange && !isFAQ) || isSEO){
      dispatch(updateEditHtml(key,reqHtml,function(){
        preview = window.open(previewPath);
      }));
    }else{
      preview = window.open(previewPath);
    }

    this.setState({
      visible: false
    });
  }

  handleCancel(){
    this.setState({
      visible: false
    });
  }

  renderEditText(){
    const {cmsKey, activeItem, ctype} = this.props;
    const {htmlContent, isEdit} = this.state;

    if(cmsKey === '' || !activeItem){
      return null;
    }

    var previewCode = isEdit ? "hide" :"";
    var editCode = isEdit ? "":"hide";
    var showContent = null;

    switch(ctype) {
      case "SEO":
        showContent = (
          <EditBox isEdit={isEdit} isAdd={false} item={activeItem} ref="SEOformData" />
        );
        break;
      case "FAQ":
        showContent = (<FAQ />)
        break;
      default:
        showContent =(
          <div>
            <div className={"preview-code " + previewCode}>
              <pre>
                <code className="html">{htmlContent}</code>
              </pre>
            </div>
            <div className={"edit " + editCode}>
              <textarea onChange={this.editChangeFn} name="" id="" value={htmlContent} defaultValue={htmlContent} />
            </div>
          </div>
        );
        break;
    }

    return (
      <div className="editContent">
        <Tags />
        {showContent}
      </div>
    )
  }

  editChange(eve){
    this.setState({
      ContentIsChange: true,
      htmlContent: eve.target.value
    });
  }


  handleEdit(){
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  componentWillReceiveProps(nextProps){
    const {cmsKey,activeItem} = this.props;
    const _this = this;

   _this.setState({
      activeItem:nextProps,
      htmlContent:nextProps.activeItem.html,
      isEdit:false,
      ContentIsChange:false
    });
  }
}