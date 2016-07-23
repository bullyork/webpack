import React,{Component} from "react"
import {getNewHomeBannerList,doAdd,doSave,startEditBanner,endEditBanner} from "./actions/newhomebanner.js"
import {connect} from "react-redux"
import {Row,Col,Table,Form,Input,Button,Modal,message,Icon} from "antd"
import {changeCountry} from "./../../action/country.js"
import {openDialog,closeDialog} from "./../../action/dialog.js";
import { Image,CountrySelector } from "./../../common";
import NewHomeBannerEditPanel from "./NewHomeBannerEditPanel.jsx";
import {OPERATION_BANNER,MARKETING_BANNER,HOT_PRODUCT_BANNER} from "./constant.js";
import {formatTime} from "./util.js";
import store from './stores/newhomebanner.js'
import NewHomeBannerAddModal from "./NewHomeBannerAddModal.jsx"
import NewHomeBannerEditModal from "./NewHomeBannerEditModal.jsx"

require("./less/marketing.less")

const FormItem = Form.Item;
const InputGroup = Input.Group;
const {assign} = Object;


@connect((state)=>({banners:state.banners,countryCode:state.country}))
class NewHomeBannerForMarketing extends Component{
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
              <CountrySelector value={this.props.countryCode} onChange={(value)=>{dispatch(changeCountry(value));dispatch(getNewHomeBannerList(value,MARKETING_BANNER,0,100));}} />
            </Col>
      		</Row>
          <hr />
          <div >
            {this.renderBanner()}
          </div>
      		<NewHomeBannerAddModal bannerType={MARKETING_BANNER} />
          <NewHomeBannerEditModal bannerType={MARKETING_BANNER} />
      	</div>
      )
	}

  renderBanner(){
    const {dispatch} = this.props;
    if(typeof this.props.banners[0] !== "undefined"){
      let banner = this.props.banners[0];
      return (
        <div className="marketingBannerWrapper" onClick={()=>dispatch(startEditBanner(banner.id))}>
          <Image src={banner.picture} width="100%" />
        </div>
      )
    }
    return (
        <div className="marketingBannerWrapper" onClick={()=>dispatch(openDialog("addDialog"))}>
          <Button type="primary" shape="circle">
            <Icon type="plus" />
          </Button>
        </div>
    )

  }
	
	componentDidMount(){
    this.props.dispatch(getNewHomeBannerList(this.props.countryCode,MARKETING_BANNER,0,100));
	}

}

export default NewHomeBannerForMarketing

