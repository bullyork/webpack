import React,{Component} from "react"
import {connect} from "react-redux"
import {loadSkuInfo} from "./../../action/product.js"
import {Table,Row,Col,Button,Icon,Form,Input} from "antd"
import { Link } from 'react-router';
import { Image } from "./../../common";

@connect(state=>({skuInfo:state.skuInfo}))
class Sku extends Component{
	render(){
		return (
			<div>
				<SkuList data={this.props.skuInfo} refId={this.props.params.refId} />
			</div>
		)
	}

	componentDidMount(){
		let {props} = this;
		props.dispatch(loadSkuInfo(props.params.refId));
	}
}


const columns = [{
  title: 'SkuId',
  dataIndex: 'skuId',
  key: 'skuId',
},{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
},{
  title: 'Images',
  dataIndex: 'images',
  key: 'images',
  render(images,record){
  	let realImages = images.map((imageItem)=>{
  		return (
  			<Image key={imageItem} src={imageItem} width="50" height="50" />
  		)
  	})
  	return (
  		<div className="skuImagesWrapper">
  			{realImages}
  		</div>
  	)
  }
},{
  title: 'Operation',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <Link to={`/sku/edit/${encodeURIComponent(record.refId)}/${encodeURIComponent(record.skuId)}`}>Edit</Link>
      </span>
    );
  }
}];

class SkuList extends Component{
	render(){
		let dataSource = this.props.data.map((item)=>{
			return Object.assign({},item,{
				key:item.skuId,
				refId:this.props.refId
			})
		})
		return (
			<div>
				<Table pagination={false} dataSource={dataSource} columns={columns} />		
			</div>
		)
	}


}

export default Sku;