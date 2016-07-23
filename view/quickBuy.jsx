import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, Link } from 'react-router';
import { Form, Input, Button, Checkbox, Table,message,Upload,Icon, Dropdown,Modal } from 'antd';
import QuickBuyService from "../models/quickBuyService.js";
import URLMaker from "../common/urlmaker.js";
import {Provider,connect} from "react-redux";
import quickBuyStore from "../store/quickBuyStore.js";
import {getlist,setProductDialgo,clearList,doSave,startEditProduct,endEditProduct} from "../action/quickBuyAction.js";
import DialogProduct from "../component/quickBuy/productDialog.jsx";
import EditProductPanel from "../component/quickBuy/editProductPanel.jsx";
import Activities from "../component/quickBuy/activities.jsx";
import FlashSalesListStore from "../component/quickBuy/flashSalesList.jsx";
import ScrollApp from "../common/scrollLoadMore.js";


class QuickBuyManage extends Component {
	constructor(props){
        super(props);
        this.state = {
            visible:false,
            selectedUser:"",
            checkoutList:[],
            selectedSystem:[],
            propsHash:"",
            columns : [
              { title: 'Name', dataIndex: 'username', key: 'username' },
              { title: 'Operate', dataIndex: '', key: 'x', render: (text, record) => <Button onClick={() =>{this.setState({selectedUser:record.username},function(){this.showModal()}.bind(this))}}>Systems</Button> }
            ],
        };
    }
	componentDidMount(){
		this.loadData();
		ScrollApp.init(this,this.loadData);
	}
	showDialog(){
		quickBuyStore.dispatch(setProductDialgo(true));
	}
	ToAddActivity(){
		window.location.hash = '/activitie';
	}
	deleteProduct(url){
		var context = this;
		return function(){
			QuickBuyService.UserDeleteFlashSalesProduct(context.props.params.setting,url).then(function(data){
				message.success('delete success',3);
				quickBuyStore.dispatch(getlist(context.props.params.setting,0,300));

			})
		}
	}
	renderFlashSalesItem(){
		var flashSalesItem = this.props.QuickBuy.flashSales.map(function(item,i){
			return (
				<div>
					<div style={styles.ProductsItem}>
						<div>
							<img src={item.productImage} width="100%" height="200px" />
						</div>
						<div style={{textAlign:"left",marginTop:"5px"}}>
							<span>Price:{item.productPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<span>OriginPrice:{item.productOriginPrice}</span>
						</div>
						<br></br>
						<div style={{textAlign:"left",marginBottom:"5px"}}><span>Stock:{item.productStock}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>discount:{item.discount}</span></div>
						<button style={styles.actionButton} onClick={()=>{this.props.dispatch(startEditProduct(i))}}>Edit</button>
						<button style={styles.actionButtonR} onClick={this.deleteProduct(item.productUrl)}>delete</button>
					</div>
				</div>
				)
		},this)
		return flashSalesItem;
	}
	flashSalesList(){
		window.location.hash = '/';
	}
	render(){
		var hideFunction = null;
		const fileUploadProps = {
			"action":"api/FlashSales/import/flxlsx",
			"accept":"*.xlsx,*.xls",
			"multiple":false,
			data:{
		        settingId:this.props.params.setting,
		      },
			onChange(info) {
				if(hideFunction === null){
					hideFunction = message.loading('正在执行中...', 0);
				}
				if (info.file.status === 'done' && info.file.response !== null) {
					location.reload();
				} else if (info.file.status === 'error') {
					hideFunction();
					hideFunction = null;
					message.error("error",3);
				}
		  	}
		}
		return (
			<div>
				<Button type="primary" htmlType="submit" onClick={this.flashSalesList}>FlashSales list</Button>
				<Button type="primary" htmlType="submit" onClick={this.ToAddActivity}>Add Activity</Button>
	        	<Button type="primary" htmlType="submit" onClick={this.showDialog}>Add Products</Button>
	        	<span style={{padding:"0 10px 0 10px"}}>Products Amount:{this.props.QuickBuy.flashSales.length}</span>
	        	<Upload {...fileUploadProps}>
					<Button type="ghost">
						<Icon type="upload" /> Excel导入闪购商品
					</Button>
				</Upload>
				<div style={styles.products}>
					{this.renderFlashSalesItem()}
					<DialogProduct visible={this.props.QuickBuy.visible} product={this.props.QuickBuy.selectedProduct} settingId={this.props.params.setting}></DialogProduct>
				</div>
				<EditProductModal settingId={this.props.params.setting} />
			</div>
			)
	}
	loadData(context){
		if(context !== undefined){
			if(context.props.QuickBuy.flashSales.length%300 === 0){
				quickBuyStore.dispatch(getlist(context.props.params.setting,0,300));
				return;
			}else{
				return;
			}
		}
		quickBuyStore.dispatch(getlist(this.props.params.setting,0,300));
	}
	
}
@connect(state=>{return {visible:state.QuickBuy.editingProductIdx !== -1,product:state.QuickBuy.editingProductIdx === -1 ? null : state.QuickBuy.flashSales[state.QuickBuy.editingProductIdx]}})
class EditProductModal extends Component{
	constructor(props){
		super(props);
		["onCancel","onOk"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		return (
			<Modal
				title="Edit Products"
				visible={this.props.visible}
				onOk={this.onOk}
				onCancel={this.onCancel}
				>
				<EditProductPanel data={this.props.product} ref="editPanel" />
			</Modal>
		)
	}

	onOk(){
		this.refs.editPanel.validateFieldsAndScroll((errors, product) => {
			if (!!errors) {
				return;
			}
			this.props.dispatch(doSave(this.props.settingId,Object.assign({},this.props.product,product,{
				productPrice:parseFloat(product.productPrice)
			}))).then(()=>{
				message.success("更新成功!");
				this.props.dispatch(endEditProduct());
			}).catch((e)=>{
				message.error("保存失败.");
			});
	    });
	}

	onCancel(){
		this.props.dispatch(endEditProduct());
	}
}

class QuickBuyRouter extends React.Component{
    render(){
        return (
            <div>
                <Router>
                	<Route path="/" component={FlashSalesListStore}></Route>
                    <Route path="/products/:setting" component={QuickBuyStore}></Route>
                    <Route path="/activitie" component={Activities}></Route>
                </Router>
            </div>
        )
    }
}


function mapStateToProps(state) {
  return Object.assign({},state,{});
}


var QuickBuyStore = connect(mapStateToProps)(QuickBuyManage)


class QuickBuyProvider extends React.Component{
	render(){
		return (
				<div>
					<Provider store={quickBuyStore}>
	                    <QuickBuyRouter />
	                </Provider>
				</div>
			)
	}
}

var styles = {
	products:{
		width:"1161px",
		height:"100%",
		overflow:"hidden",
		textAlign:"center",
		margin:"0 auto"
	},
	ProductsItem:{
		position:"relative",
		float:"left",
		width:"23%",
		height:"310px",
		margin:"4px 4px 4px 4px",
		border:"1px solid #ddd",
		backgroundColor:"white",
		borderRadius:"8px",
		padding:"8px",
	},
	actionButton:{
		float:"left",
		width:"30%",
		height:"40px",
		left:"0",
		border:"1px solid #abbac3",
		backgroundColor:"#8b9aa3",
		color:"white",
		fontSize:"15px"
	},
	actionButtonR:{
		float:"left",
		width:"30%",
		height:"40px",
		marginLeft:"10px",
		left:"0",
		border:"1px solid #d15b47",
		backgroundColor:"#b74635",
		color:"white",
		fontSize:"15px"
	}

}

ReactDOM.render(<AppWrapper><QuickBuyProvider /></AppWrapper>, document.getElementById("appContainer"));