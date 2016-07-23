import React,{Component} from "react"
import {Table,Row,Col,Button,Icon,Form,Input} from "antd"
import { Link } from 'react-router';
import { Image } from "./../../common";
import {redirect} from '../../util/history'
const FormItem = Form.Item;
const InputGroup = Input.Group;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 450,
  render(text,record){
    return (
      <div className="nameDisplayWrapper">
        <nobr>{text}</nobr>
      </div>
    )
  }
}, {
  title: 'ProductImage',
  dataIndex: 'productImage',
  key: 'productImage',
  render(picurl,record){
  	return (
  		<Image src={picurl} width={50} height={50} />
  	)
  }
}, {
  title: 'RefId',
  dataIndex: 'refId',
  key: 'refId',
  width: 350,
  render(text,record){
    return (
      <div className="refIdDisplayWrapper">
        <nobr>{text}</nobr>
      </div>
    )
  }
}, {
  title: 'VendorName',
  dataIndex: 'vendorName',
  key: 'vendorName',
}, {
  title: 'Operation',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <Link to={`/edit/${encodeURIComponent(record.refId)}`}>Edit</Link>
        <span className="ant-divider"></span>
        <Link to={`/sku/${encodeURIComponent(record.refId)}`}>Sku</Link>
        <span className="ant-divider"></span>
        <a onClick={()=>{
          window.location.href = '/productChangeLogs.html'+"?refId="+record.refId
        }}>changeLog</a>
      </span>
    );
  }
}];


class ListForProduct extends Component{
	render(){
		let dataSource = this.props.data.map((item)=>{
			return {
				key:`${item.refId}`,
				name:item.name,
				vendorName:item.vendorName,
				refId:item.refId,
				productImage:item.productImage,
			}
		});
		return (
			<div>
        <Row>
          <Col span="8" style={{ textAlign: 'left' }}>
            <Row>
              <Col span="4">
                RefId:
              </Col>
              <Col span="14">
                <Input ref="searchWordsInput" placeholder="Please input RefId" />  
              </Col>
            </Row>
          </Col>
          <Col span="8">
            <Button type="primary" onClick={this.handleSearch.bind(this)} htmlType="submit">搜索</Button>
          </Col>
        </Row>
				<Table pagination={false} dataSource={dataSource} columns={columns} />			
			</div>
		)
	}

  handleSearch(){
    if(typeof this.props.onSearch !== "undefined"){
      this.props.onSearch(this.refs.searchWordsInput.refs.input.value);
    }
  }
}

export default ListForProduct