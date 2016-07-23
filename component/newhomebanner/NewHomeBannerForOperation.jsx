import React,{Component} from "react"
import {getNewHomeBannerList,doAdd,doSave,startEditBanner,endEditBanner,doDelete} from "./actions/newhomebanner.js"
import {connect} from "react-redux"
import {Row,Col,Table,Form,Input,Button,Modal,message} from "antd"
import {changeCountry} from "./../../action/country.js"
import {openDialog,closeDialog} from "./../../action/dialog.js";
import { Image,CountrySelector } from "./../../common";
import NewHomeBannerEditPanel from "./NewHomeBannerEditPanel.jsx";
import {OPERATION_BANNER} from "./constant.js";
import {formatTime} from "./util.js";
import store from './stores/newhomebanner.js'
import NewHomeBannerAddModal from "./NewHomeBannerAddModal.jsx"
import NewHomeBannerEditModal from "./NewHomeBannerEditModal.jsx"

const FormItem = Form.Item;
const InputGroup = Input.Group;
const {assign} = Object;

const columns = [{
  title: 'BannerId',
  dataIndex: 'id',
  key: 'id',
  width: 200,
},{
  title: '图片',
  dataIndex: 'picture',
  key: 'picture',
  width: 80,
  render(picurl,record){
    return (
      <Image src={picurl} width={39} />
    )
  }
},{
  title: '链接',
  dataIndex: 'linkAddress',
  key: 'linkAddress',
  width: 200,
},{
  title: '开始时间',
  dataIndex: 'startAt',
  key: 'startAt',
  width: 200,
  render(time){
    return formatTime(time);
  }
},{
  title: '结束时间',
  dataIndex: 'endAt',
  key: 'endAt',
  width: 200,
  render(time){
    return formatTime(time);
  }
},{
  title: '操作',
  key: 'operation',
  render(text, record,idx) {
    return (
      <div>
      	<Button onClick={()=>{store.dispatch(startEditBanner(record.id))}}>编辑</Button>
      	<Button onClick={()=>{confirm("Are you sure delete?")&&store.dispatch(doDelete(record.id))}}>删除</Button>
      </div>
    );
  }
}];

@connect((state)=>{return {banners:state.banners,countryCode:state.country}})
class NewHomeBannerForOperation extends Component{
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
      				<Button type="primary" onClick={()=>{dispatch(openDialog("addDialog"))}}>添加</Button>
      			</Col>
            <Col span="4">
              请选择国家：
            </Col>
            <Col span="8">
              <CountrySelector value={this.props.countryCode} onChange={(value)=>{dispatch(changeCountry(value));dispatch(getNewHomeBannerList(value,OPERATION_BANNER,0,100));}} />
            </Col>
      		</Row>
      		<Table pagination={false} dataSource={dataSource} columns={columns} />
      		<NewHomeBannerAddModal bannerType={OPERATION_BANNER} />
          <NewHomeBannerEditModal bannerType={OPERATION_BANNER} />
      	</div>
      )
	}
	
	componentDidMount(){
		this.props.dispatch(getNewHomeBannerList(this.props.countryCode,OPERATION_BANNER,0,100));
	}

}

export default NewHomeBannerForOperation

