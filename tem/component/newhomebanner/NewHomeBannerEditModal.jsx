import React,{Component} from "react"
import {doSave,endEditBanner} from "./actions/newhomebanner.js"
import {connect} from "react-redux"
import {Modal,message,Icon} from "antd"
import NewHomeBannerEditPanel from "./NewHomeBannerEditPanel.jsx";
import {OPERATION_BANNER} from "./constant.js";


const {assign} = Object;

@connect((state)=>({visible:state.editingBannerId !== "",editingData:state.editingBannerId === ""?null:typeof state.banners.find((banner)=>banner.id === state.editingBannerId) === "undefined"?null:state.banners.find((banner)=>banner.id === state.editingBannerId),countryCode:state.country}))
class NewHomeBannerEditModal extends Component{
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
        title="编辑Banner"
        visible={this.props.visible}
        onCancel={()=>{dispatch(endEditBanner())}}
        onOk={this.onOk}
        >
        <NewHomeBannerEditPanel ref="editPanel" data={this.props.editingData} isHideTime={this.props.bannerType!==OPERATION_BANNER} />
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

      dispatch(doSave(banner)).then((flag)=>{
        if(flag){
          message.success("保存成功!");
          dispatch(endEditBanner());
        }else{
          message.warn("保存失败!");
        }
      });
    });
  
  }
}
export default NewHomeBannerEditModal;

