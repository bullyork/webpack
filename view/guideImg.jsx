import React,{Component} from "react"
import {render} from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import {Provider,connect} from "react-redux"
import guideImgStore from "../store/fixedBanner.js"
import {searchFixedBanner,cancelUpdate,doUpdate,doAdd,changeCountry,changeType} from "../action/fixedBanner.js"
import {closeDialog} from "../action/dialog.js"
import ListPanel from "../component/guideImg/listpanel.jsx"
import EditPanel from "../component/guideImg/editpanel.jsx"
import { Modal } from 'antd';
import {success,warn} from "../util/antd.js";
import CountrySelector from "../common/CountrySelector.jsx";
import types,{getTypeValue} from "../component/guideImg/types.js";
import {Select} from "antd"


import "./../less/product.less";
const {assign} = Object;


@connect((state)=>({images:state.images,editKey:state.editKey,isAddDialogShow:state.dialog.addDialog,countryCode:state.countryCode,typeId:state.typeId}))
class GuideImg extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {dispatch, typeId} = this.props;

    var typesOptions = types.map((val,_)=>{
        return (
          <Option value={val.typeId}>{val.value}</Option>
        )
    });
    return (
      <div>
        <div>
          Please Select Country:&nbsp;&nbsp;
            <CountrySelector value={this.props.countryCode} onChange={(value)=>{dispatch(changeCountry(value))}} />

            &nbsp;&nbsp;

          Please Select Type:&nbsp;&nbsp;
            <Select value={typeId} style={{ width: 140 }} onChange={(value)=>{dispatch(changeType(value))}}>
              {typesOptions}
            </Select>
        </div>
        <ListPanel />
        <EditFixedBannerModal visible={this.props.editKey!==null} />
        <AddFixedBannerModal visible={this.props.isAddDialogShow} />
      </div>)
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(changeType(4));
  }
}

@connect((state)=>({productForEditing:state.images.find(image=>image.key === state.editKey),countryCode:state.countryCode, typeId:state.typeId}))
class EditFixedBannerModal extends Component{
  render(){
    const {dispatch} = this.props;
    return (
      <Modal title="Edit FixedBanner"
        visible={this.props.visible}
        onOk={this._onOKHandler.bind(this)}
        onCancel={()=>{dispatch(cancelUpdate())}}>
        <EditPanel data={this.props.productForEditing} countryCode={this.props.countryCode} isAdd={false} typeId={this.props.typeId} ref="editPanel" />
      </Modal>
    )
  }

  _onOKHandler(){
    const {dispatch} = this.props;
    dispatch(doUpdate(assign(this.refs.editPanel.getFieldsValue(),{},{countryCode:this.props.countryCode}))).then((flag)=>{
      if(flag){
        success("Update Success");
        dispatch(cancelUpdate());
      }else{
        warn("Update Fail");
      }
    })
  }
}

@connect((state)=>({countryCode:state.countryCode,typeId:state.typeId}))
class AddFixedBannerModal extends Component{
  render(){
    const {dispatch} = this.props;
    return (
      <Modal title="Add FixedBanner"
        visible={this.props.visible}
        onOk={this._onOKHandler.bind(this)}
        onCancel={()=>{dispatch(closeDialog("addDialog"))}}>
        <EditPanel data={this.props.productForEditing} countryCode={this.props.countryCode} isAdd={true} typeId={this.props.typeId} ref="editPanel" />
      </Modal>
    )
  }

  _onOKHandler(){
    const {dispatch} = this.props;
    dispatch(doAdd(assign(this.refs.editPanel.getFieldsValue(),{},{countryCode:this.props.countryCode}))).then((flag)=>{
      if(flag){
        success("Add Success");
        dispatch(closeDialog("addDialog"));
      }else{
        warn("Add Fail");
      }
    });
  }
}


class GuideImgBox extends Component{
  render(){
    return (
      <Provider store={guideImgStore}>
        <GuideImg />
      </Provider>
    )
  }
}

render(<AppWrapper><GuideImgBox /></AppWrapper>, document.getElementById("appContainer"))