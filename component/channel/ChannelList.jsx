import React,{Component} from "react"
import {Table,Row,Col,Button,Icon,Form,Input,Switch} from "antd"
import { Image } from "./../../common";
import {connect} from "react-redux";
import channelStore from "./stores/channel.js"
import {loadList,doSaveIsDisplayFront,changeSort} from "./actions/channel.js";
import {Link} from "react-router"
import CountrySelector from "./../../common/CountrySelector.jsx"
import {changeCountry} from "./../../action/country.js"
import {Tree,Modal,message} from "antd"
import SortListPanel from "./../../common/SortListPanel.jsx"
import {openDialog,closeDialog} from "./../../action/dialog.js"

const FormItem = Form.Item;
const InputGroup = Input.Group;
const {assign} = Object;

const TreeNode = Tree.TreeNode;

const columns = [{
  title: '频道Id',
  dataIndex: 'id',
  key: 'id',
  width: 200,
},{
  title: '频道名称',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render(text,record){
    return (
      <div>
        <nobr>{text}</nobr>
      </div>
    )
  }
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
  title: '是否显示',
  key: 'isDisplayFront',
  dataIndex: 'isDisplayFront',
  render(isDisplayFront, record) {
    return (
    	 <Switch checked={isDisplayFront} defaultChecked={isDisplayFront} onChange={(value)=>{channelStore.dispatch(doSaveIsDisplayFront(record.id,value))}}  />
    );
  }
}, {
  title: '操作',
  key: 'operation',
  render(text, record) {
    return (
      <div>
        {record.parentId === "0"?<Link to={`/${record.id}`}><Button>查看子频道</Button></Link>:null}
        <Link to={`/editBasic/${record.id}`}><Button>编辑基本信息</Button></Link>
        <Link to={`/editKeywords/${record.id}`}><Button>编辑关键字</Button></Link>
        <Link to={`/editCampaigns/${record.id}`}><Button>编辑促销图</Button></Link>
      </div>
    );
  }
}];


@connect((state)=>({channels:state.channels,countryCode:state.country}))
class ChannelList extends Component{
	render(){
    	let dataSource = this.props.channels.map((channel)=>{
    		return assign({},channel,{
    			key:channel.id
    		})
    	})
      const {dispatch} = this.props;
      return (
      	<div>
      		<Row style={{marginBottom:"10px"}}>
      			<Col span="4">
      				<Link to={`/add/${this.getParentChannelId()}`}><Button type="primary">添加</Button></Link>
              <Button type="primary" onClick={()=>{dispatch(openDialog("sortDialog"))}}>改变顺序</Button>
              {
                this.getParentChannelId()!=="0"?<Link to="/0"><Button>返回</Button></Link>:null
              }
      			</Col>
            <Col span="4">
              请选择国家：<CountrySelector value={this.props.countryCode} onChange={(value)=>{dispatch(changeCountry(value));dispatch(loadList(this.getParentChannelId(),value))}} />
            </Col>
      		</Row>
      		<Table pagination={false} dataSource={dataSource} columns={columns} />
          <DataSortModal parentId={this.getParentChannelId()} />
      	</div>
      )
	}

	componentDidMount(){
		this.props.dispatch(loadList(this.getParentChannelId(),this.props.countryCode));
	}

  componentWillReceiveProps(nextProps){
    if(this.getParentChannelId() !== this.getParentChannelId(nextProps)){
      this.props.dispatch(loadList(this.getParentChannelId(nextProps),this.props.countryCode));
    }
  }

	getParentChannelId(props=this.props){
    let {parentChannelId} =  props.params;
		if(typeof parentChannelId === "undefined"){
			parentChannelId = "0";
		}
		return parentChannelId;
	}
}

export default ChannelList;

@connect((state)=>({visible:state.dialog.sortDialog,isChannelSorting:state.isChannelSorting,data:state.channels.map(channel=>({key:channel.id,text:channel.name}))}))
class DataSortModal extends Component{
  constructor(props){
    super(props);
    ["onOrderChange","closeDialog"].forEach((methodName)=>{
      this[methodName] = this[methodName].bind(this);
    })
  }

  render(){
    const {props} = this;
    return (
      <Modal 
        title="更改排序" 
        visible={props.visible}
        onOk={this.closeDialog}
        onCancel={this.closeDialog}
        >
        <SortListPanel data={props.data} onOrderChange={this.onOrderChange} canDrag={!props.isChannelSorting} />
      </Modal>
    )
  }

  onOrderChange(prevKey,currentKey,nextKey){
    this.props.dispatch(changeSort(prevKey,currentKey,nextKey,this.props.parentId)).then((flag)=>{
      if(flag){
        message.success(`更新成功。`);
      }else{
        message.error(`更新失败。`);
      }
    });
  }

  closeDialog(){
    const {props} = this;
    console.log(props.isChannelSorting);
    if(!props.isChannelSorting){
      props.dispatch(closeDialog("sortDialog"));
    }
  }
}