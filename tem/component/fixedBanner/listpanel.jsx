import React,{Component} from "react"
import {Table,Row,Col,Button,Icon,Form,Input} from "antd"
import { Image } from "./../../common";
import {connect} from "react-redux";
import {startUpdate, doDelete} from "./../../action/fixedBanner.js"
import {openDialog} from "./../../action/dialog.js"
import fixedBannerStore from "./../../store/fixedBanner.js"
import types from "../guideImg/types.js";

const FormItem = Form.Item;
const InputGroup = Input.Group;

const columns = [{
  title: 'Key',
  dataIndex: 'key',
  key: 'key',
  width: 150,
},{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 250,
  render(text,record){
    return (
      <div>
        <nobr>{text}</nobr>
      </div>
    )
  }
},{
  title: 'LinkAddress',
  dataIndex: 'linkAddress',
  key: 'linkAddress',
  width: 250,
},{
  title: 'Picture',
  dataIndex: 'picture',
  key: 'picture',
  width: 80,
  render(picurl,record){
    return (
      <Image src={picurl} width={80} />
    )
  }
}, {
  title: 'Operation',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <Button onClick={()=>{fixedBannerStore.dispatch(startUpdate(record.key))}}>Edit</Button>
        <Button onClick={()=>{fixedBannerStore.dispatch(doDelete(record.key))} }>Delete</Button>
      </span>
    );
  }
}];

@connect((state)=>({images:state.images}))
class ListForProduct extends Component{
	render(){
    const images = this.props.images;
    const dataSource = images;

		return (
			<div>
        <Row style={{marginBottom:"10px"}}>
          <Col span="4">
            <Button type="primary" onClick={()=>{this.props.dispatch(openDialog("addDialog"))}}>添加</Button>
          </Col>
        </Row>
				<Table pagination={false} dataSource={dataSource} columns={columns} />
			</div>
		)
	}
}

export default ListForProduct