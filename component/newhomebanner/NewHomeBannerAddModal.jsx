import React,{Component} from "react"
import {doAdd} from "./actions/newhomebanner.js"
import {connect} from "react-redux"
import {Modal,message} from "antd"
import {closeDialog} from "./../../action/dialog.js";
import NewHomeBannerEditPanel from "./NewHomeBannerEditPanel.jsx";
import {OPERATION_BANNER,MARKETING_BANNER,HOT_PRODUCT_BANNER} from "./constant.js";

const {assign} = Object;


@connect((state)=>({visible:state.dialog.addDialog,countryCode:state.country}))
class NewHomeBannerAddModal extends Component{
  constructor(props){
    super(props);
    ["onOk"].forEach((key)=>{
      this[key] = this[key].bind(this);
    })
  }

  render(){
    const {dispatch} = this.props;
    return (
      <Modal 
        title="添加新Banner"
        visible={this.props.visible}
        onCancel={()=>{dispatch(closeDialog("addDialog"))}}
        onOk={this.onOk}
        >
        <NewHomeBannerEditPanel ref="editPanel" isHideTime={this.props.bannerType!==OPERATION_BANNER} />
      </Modal>
    )
  }

  onOk(){
    const {dispatch} = this.props;
    this.refs.editPanel.validateFieldsAndScroll((error,banner)=>{
      if(!!error){
        return ;
      }

      banner = assign({},banner,{
        countryCode:this.props.countryCode,
        bannerType:this.props.bannerType,
      })

      dispatch(doAdd(banner)).then((flag)=>{
        if(flag){
          message.success("添加成功!");
          this.refs.editPanel.resetFields();
          dispatch(closeDialog("addDialog"));
        }else{
          message.warn("添加失败!");
        }
      });
    });
  
  }
}

export default NewHomeBannerAddModal
