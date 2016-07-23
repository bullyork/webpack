import React,{Component} from "react"
import {getNewHomeBannerList,doAdd,doSave,startEditBanner,endEditBanner} from "./actions/newhomebanner.js"
import {connect} from "react-redux"
import {Row,Col,Table,Form,Input,Button,Modal,message,Icon} from "antd"
import {changeCountry} from "./../../action/country.js"
import {openDialog,closeDialog} from "./../../action/dialog.js";
import { Image,CountrySelector } from "./../../common";
import NewHomeBannerEditPanel from "./NewHomeBannerEditPanel.jsx";
import {HOT_PRODUCT_BANNER} from "./constant.js";
import {formatTime} from "./util.js";
import store from './stores/newhomebanner.js'
import NewHomeBannerAddModal from "./NewHomeBannerAddModal.jsx"
import NewHomeBannerEditModal from "./NewHomeBannerEditModal.jsx"

require("./less/hotProducts.less");

const FormItem = Form.Item;
const InputGroup = Input.Group;
const {assign} = Object;

@connect((state)=>({banners:state.banners,countryCode:state.country}))
class NewHomeHotProduct extends Component{
	render(){
    	let dataSource = this.props.banners.map((banner)=>{
    		return assign({},banner,{
    			key:banner.id
    		})
    	})
      const {dispatch} = this.props;
      return (
      	<div>
      		<Row style={{marginBottom:"10px"}}>
            <Col span="4">
              请选择国家：
            </Col>
            <Col span="8">
              <CountrySelector value={this.props.countryCode} onChange={(value)=>{dispatch(changeCountry(value));dispatch(getNewHomeBannerList(value,HOT_PRODUCT_BANNER,0,100));}} />
            </Col>
      		</Row>
          <div className="hotProductsWrapper">
            {this.renderHotProducts()}
          </div>
      		<NewHomeBannerAddModal bannerType={HOT_PRODUCT_BANNER} />
          <NewHomeBannerEditModal bannerType={HOT_PRODUCT_BANNER} />
      	</div>
      )
	}

  renderHotProducts(){
    const {dispatch} = this.props;
    let products = [...this.props.banners];
    
    for(var i=0;products.length<3;i++){
      if(i === 0){
        products.push("add");
      }else{
        products.push("empty");
      }
    }
    return products.map((oneProduct)=>{
      let innerComponent = null;
      let hotProductProps = {};
      if(oneProduct === "add"){
        innerComponent = (
          <Button type="primary" shape="circle">
            <Icon type="plus" />
          </Button>
        );
        hotProductProps.onClick=function(){
          dispatch(openDialog("addDialog"));
        }
      }else if(typeof oneProduct !== "string"){
        innerComponent = <Image src={oneProduct.picture} width="100%" />
        hotProductProps.onClick=function(){
          dispatch(startEditBanner(oneProduct.id));
        }
      }
      return (
        <div className="hotProductItemWrapper" {...hotProductProps}>
          {innerComponent}
        </div>
      )
    })
  }
	
	componentDidMount(){
		this.props.dispatch(getNewHomeBannerList(this.props.countryCode,HOT_PRODUCT_BANNER,0,100));
	}

}

export default NewHomeHotProduct

