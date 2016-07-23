import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, Link } from 'react-router';
import { Modal,Button ,Menu, DropdownButton, message,Upload,Icon, Dropdown } from 'antd';
import UserService from "../models/User.js";
import URLMaker from "../common/urlmaker.js";
import {Provider,connect} from "react-redux";
import PrimeFloorStore from "../store/primeFloor.js"
import {getFloor,getCategory} from "../action/primeFloorAction.js";
import PrimeFloorService from "../models/PrimeFloorService.js";
import QiniuJSONRPC from "../models/QiniuService.js";
// import PrimeFloorManager from "./components/primeFloor/floorManager.jsx";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragSource, DropTarget,DragDropContext } from 'react-dnd';
import FloorCategory from '../component/primeFloor/floorManager.jsx';
import update from 'react/lib/update';


class PrimeFlooor extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            preItemId:0,
            afterId:0,
            itemId:0,
        	floorId:2384,
        	visible:false,
    		visibleCategory:false,
    		visibleProducts:false,
    		selectedCategoryId:2647,
    		domain:"",
    		token:"",
            locked:false,
    		addProduct:{
	        	categoryId:0,
	            product:{
	            	productImage:"",
	            	productName:"",
	            	productUrl:"",
	            	fileImage:"",
	            	unitPrice:"",
	            	originCode:""
	            }
	        },
	        selectedProduct:{
	        	productImage:"",
            	productName:"",
            	productUrl:"",
            	fileImage:"",
            	unitPrice:"",
            	originCode:""
	        }
        };
    }
    getUploadInformation(){
    	var that = this;
	    QiniuJSONRPC.uptoken({
	      success:function(data){
	        var uptoken = data.result.token;
	        that.setState({
	          token:uptoken
	        })
	      }
	    });

	    QiniuJSONRPC.BaseUrl({
	      success:function(data){
	        var QiniuBaseUrl = data.result.result;
	        that.setState({
	          domain:QiniuBaseUrl
	        });
	      }
	    })
    }
    selectPrimeProduct(item){
    	let newAddProduct = this.state.addProduct;
    	newAddProduct.product = $.extend({},item);
    	this.setState({
	      visible: true,
	      addProduct:newAddProduct
	    });
    }
    handleOk() {
	    this.setState({
	      visible: false
	    });
	}
	handleCancel(e) {
		this.setState({
			visible: false,
            visibleCategory:false
		});
	}
    componentWillMount(){
    	this.getUploadInformation();
		this.loadData();
    }
    addFloor(){
    	PrimeFloorService.AddCategoryFloor(this.state.selectedCategoryId).then(function(data){
            if(data === true){
                message.success('Add success', 3);
                PrimeFloorStore.dispatch(getFloor());
            }else{
                message.success("the floor exist", 3);
            }
    	})
    	this.setState({
	      visibleCategory: false
	    });
    }
    showUpadateDialog(){

    }
    showAddCategoryDialog(){
    	this.setState({visibleCategory:true});
    }
    selectCategory(){
    }
    addProductFun(){
        var flag = 0;
        this.props.Floor.floorList.map(function(item,i){
            if(item.categoryId === this.props.Floor.categoryId){
                if(item.products.length === 8){
                    alert("Products amount must less 8");
                    flag =1;
                    return;
                }
            }
        },this)
        if(flag === 1){
            return;
        }
        let newProduct = this.state.addProduct;
        newProduct["categoryId"] = this.props.Floor.categoryId;
        newProduct.product ={
            productImage:"",
            productName:"",
            productUrl:"",
            fileImage:"",
            unitPrice:"",
            originCode:""
        }
        this.setState({addProduct:newProduct,visibleProducts:true}); 
    }
    hideProductDialog(){
    	this.setState({visibleProducts:false,visible:false});
    }
    addProductConfirm(){
    	var context = this;
    	if(this.state.addProduct.product.productUrl === ""){
    		alert("productUrl is NULL");
    		return;
    	}
    	var newProduct = this.state.addProduct.product;
    	newProduct["unitPrice"] = parseFloat(newProduct["unitPrice"]);
    	PrimeFloorService.AddFloorProduct(this.state.addProduct.categoryId,newProduct).then(function(data){
            console.info(data);
    		message.success(data, 3);
    		PrimeFloorStore.dispatch(getFloor());
    		context.hideProductDialog();
    	})
    }
    UpdateProductConfirm(){
    	var context = this;
    	if(this.state.addProduct.product.productName === ""){
    		alert("productName is NULL");
    		return;
    	}
    	if(this.state.addProduct.product.productUrl === ""){
    		alert("productUrl is NULL");
    		return;
    	}
    	if(this.state.addProduct.product.unitPrice === ""){
    		alert("productUrl is NULL");
    		return;
    	}
    	if(typeof this.state.addProduct.product.unitPrice === String){
    		alert("productUrl is number");
    		return;
    	}
    	if(typeof this.state.addProduct.product.originCode === ""){
    		alert("productUrl is NULL");
    		return;
    	}
    	if(this.state.addProduct.product.id === ""){
    		alert("productId is NULL");
    		return;
    	}
        if(this.state.addProduct.product.originCode === ""){
            alert("originCode is NULL");
            return;
        }
    	var newProduct = this.state.addProduct.product;
        newProduct["fileImage"] = newProduct["productImage"];
    	newProduct["unitPrice"] = parseFloat(newProduct["unitPrice"]);
    	PrimeFloorService.UpdateFloorProduct(newProduct).then(function(data){
    		message.success("Update success", 3);
    		PrimeFloorStore.dispatch(getFloor());
    		context.handleCancel();
    		context.hideProductDialog();
    	})
    }
	handleMenuClick(e) {
		let categoryId = parseInt(e.key)
		this.setState({selectedCategoryId:categoryId})

	}
    renderSelect(){
    	const DropdownButton = Dropdown.Button;
    	var category = this.props.Category.category.map(function(item,i){
    		return (
    			<Menu.Item key={item.categoryId}>{item.categoryName}</Menu.Item>
    			)
    	},this)
    	const menu = (
			<Menu onClick={this.handleMenuClick.bind(this)}>
				{category}
			</Menu>
		);
    	return(
			<DropdownButton overlay={menu} type="primary">
				relate Category
			</DropdownButton>
    		)
    }
    changeInputValue(event){
    	var key = event.target.name;
    	var newAddProduct = this.state.addProduct;
    	newAddProduct.product[key] =  event.target.value;
        if(key === "productImage"){
            newAddProduct.product["fileImage"] = event.target.value;
        }
    	this.setState({addProduct:newAddProduct});
    }
    publishFllor(){
		PrimeFloorService.PublishPrimeFloor().then(function(data){
            if(data === true){
                message.success(`发布成功`,3);
            }else {
                message.success(`发布失败,请检查`,3);
            }
		})
    }
    RemoveFloorProduct(ProductId){
    	return function(){
    		PrimeFloorService.RemoveFloorProduct(ProductId).then(function(data){
    			PrimeFloorStore.dispatch(getFloor());
    		})
    	}
    }
    renderAddProductItem(){
    	var context = this;
    	var newProduct= this.state.addProduct;
		const props = {
			name: 'file',
			action: 'http://upload.qiniu.com/',
			data:{
				token:this.state.token
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
				}
				if (info.file.status === 'done') {
				  message.success(`${info.file.name} 上传成功。`);
				  newProduct.product['productImage'] = context.state.domain + info.file.response.hash;
					newProduct.product['fileImage'] = context.state.domain + info.file.response.hash;
					//newProduct['fileImage']\
					context.setState({addProduct:newProduct});
				} else if (info.file.status === 'error') {
				  message.error(`${info.file.name} 上传失败。`);
				}
				}
		};
    	return (
    		<div>
				<Upload {...props}>
					<Button type="ghost">
						<Icon type="upload" /> 点击上传
					</Button>
				</Upload>
                <br></br>
    			<div style={{height:"50px"}}><span>Product Name:</span><input value={this.state.addProduct.product.productName} name="productName" onChange={this.changeInputValue.bind(this)} style={{width:"60%",height:"40px",outline:"medium",marginLeft:"3px"}}/></div>
                <div style={{height:"50px"}}><span>Product Image:</span><input value={this.state.addProduct.product.productImage} name="productImage" onChange={this.changeInputValue.bind(this)} style={{width:"60%",height:"40px",outline:"medium",marginLeft:"3px"}} /></div>
                <div style={{height:"50px"}}><span>productUrl:</span><input value={this.state.addProduct.product.productUrl} name="productUrl" onChange={this.changeInputValue.bind(this)} style={{width:"60%",height:"40px",outline:"medium",marginLeft:"3px"}}/></div>
    			<div style={{height:"50px"}}><span>unitPrice:</span><input value={this.state.addProduct.product.unitPrice} name="unitPrice" onChange={this.changeInputValue.bind(this)} style={{width:"60%",height:"40px",outline:"medium",marginLeft:"3px"}}/></div>
    			<div style={{height:"50px"}}><span>originCode:</span><input value={this.state.addProduct.product.originCode} name="originCode" onChange={this.changeInputValue.bind(this)} style={{width:"60%",height:"40px",outline:"medium",marginLeft:"3px"}}/></div>
    		</div>
    		)
    }
    moveItem(id, afterId) {
        var self = this;
        const floorList = this.props.Floor.floorList;

        const item = floorList.filter(i => i.categoryId === id)[0];
        const afterItem = floorList.filter(i => i.categoryId === afterId)[0];
        const itemIndex = floorList.indexOf(item);
        const afterIndex = floorList.indexOf(afterItem);
        const preIndex = afterIndex -1;
        var preItem = {};
        floorList.map(function(li,index){

            if(index===preIndex){
                preItem = li;
            }
        })
        
        if(preIndex >=0 && (floorList.length - 1) !== afterIndex){
            self.setState({preItemId:preItem.categoryId,afterId:afterItem.categoryId});
        }else if((floorList.length - 1) == afterIndex){
            console.info("qigua")
            self.setState({preItemId:preItem.categoryId,afterId:-1});
        }
        else {
            self.setState({preItemId:-1,afterId:afterItem.categoryId});
        }
    }
	render(){
		var PrimeList = this.props.Floor.floorList.map(function(item,i){
			if(this.props.Floor.categoryId === item.categoryId){
				var productList = item.products.map(function(product,index){
					return (
							<div style={{width:"190px",float:"left",padding:"5px 5px 5px 5px",border:"1px solid #E1E1E1",height:"298px",overflow:"hidden"}}>
								<div style={{width:"190px",height:"190px",overflow:"hidden"}} onClick={()=>this.selectPrimeProduct(product)}><img src={product.productImage} style={{width:"100%"}}/></div>
								<div style={{maxHeight:"52px",overflow:"hidden",height:"52px"}}>{product.productName}</div>
								<div>
									<button style={{backgroundColor:"#8b9aa3",borderColor:"#abbac3",width:"50px",height:"42px",borderRadius:"1px",color:"white",fontSize:"14px"}} onClick={()=>this.selectPrimeProduct(product)}>Edit</button>
									<button style={{backgroundColor:"#b74635",borderColor:"#d15b47",width:"73px",height:"42px",marginLeft:"8px",borderRadius:"1px",color:"white",fontSize:"14px"}} onClick={this.RemoveFloorProduct(product.id)}>Delete</button>
								</div>
							</div>
						)
				},this)
			}else {
				return;
			}
			return (
				<div style={{width:"780px",margin:"auto"}}>{productList}</div>
				)
		},this)
		var FloorList = this.props.Floor.floorList.map(function(item,i){
			return (
				<FloorCategory key={item.categoryId} productCateogry={this.props.Floor.floorList[0].categoryId} addProductFun={this.addProductFun} SelectCategory={this.props.Category.categoryId} preItemId={this.state.preItemId} afterId={this.state.afterId} id={item.categoryId} text={item.categoryId} moveItem={this.moveItem.bind(this)} />
				)
		},this)
        var categoryName;
        this.props.Category.category.map(function(item,i){
            if(item.categoryId === this.props.Floor.categoryId){
                categoryName = item.categoryName;
            }
        },this)
        var hideFunction = null;
        const fileUploadProps = {
            "action":"api/floorAdmin/PrimeFloor/ImportFloorProduct",
            "accept":"*.xlsx,*.xls",
            "multiple":false,
            data:{
                categoryId:this.props.Floor.categoryId,
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
				<div style={{height:"50px"}}>
                    <Button type="primary" onClick={this.showAddCategoryDialog.bind(this)}>Add Floor</Button>
                    <Button type="primary" onClick={this.publishFllor.bind(this)}>Publish Floor</Button>
                    <Button type="primary" onClick={this.addProductFun.bind(this)}>Add Products</Button>
				</div>
				<div>
	                <div style={{float:"left",width:"200px",backgroundColor:"white",padding:"0px",border:"1px solid #999"}}>
                        {FloorList}
	                </div>
	                <div style={{marginLeft:"220px",backgroundColor:"#F4F7F8",padding:"10px 10px 10px 10px",overflow:"hidden"}}>
	                	<div>
                        <span style={{marginRight:"10px"}}>categoryName:{categoryName}</span>
                        <Upload {...fileUploadProps}>
                            <Button type="ghost">
                                <Icon type="upload" /> Excel导入闪购商品
                            </Button>
                        </Upload>
                        </div>
                        <br></br>
                        {PrimeList}
	                </div>
	            </div>
	            <Modal title="Update Prime" visible={this.state.visible}
		          onOk={this.UpdateProductConfirm.bind(this)} onCancel={this.hideProductDialog.bind(this)}>
		          	{this.renderAddProductItem()}
		        </Modal>
		        <Modal title="Add Floor" visible={this.state.visibleCategory}
		          onOk={this.addFloor.bind(this)} onCancel={this.handleCancel.bind(this)}>
					{this.renderSelect()}
		        </Modal>
		        <Modal title="Add Products" visible={this.state.visibleProducts}
		          onOk={this.addProductConfirm.bind(this)} onCancel={this.hideProductDialog.bind(this)}>
		          	{this.renderAddProductItem()}
		        </Modal>
            </div>
			)
	}
	loadData(){
        PrimeFloorStore.dispatch(getFloor());
        PrimeFloorStore.dispatch(getCategory());
		// var id = this.state.PrimeFloor[0].id;
		// this.setState({floorId:id});
	}
}

var WaterfallCanDrop = DragDropContext(HTML5Backend)(PrimeFlooor);

function mapStateToProps(state) {
  return Object.assign({},state,{});
}


var PrimeWithStore = connect(mapStateToProps)(WaterfallCanDrop)

class PrimeFloorRouter extends React.Component{
    render(){
        return (
            <div>
                <Router>
                    <Route path="/" component={PrimeWithStore}></Route>
                    <Route path="/addFloor" component={PrimeWithStore}></Route>
                    <Route path="/deleteFloor" component={PrimeWithStore}></Route>
                </Router>
            </div>
        )
    }
}

class PrimeStore extends React.Component {
    render(){
        return(
            <div>
                <Provider store={PrimeFloorStore}>
                    <PrimeFloorRouter />
                </Provider>
            </div>
            )
    }
}

ReactDOM.render(<AppWrapper><PrimeStore /></AppWrapper>, document.getElementById("appContainer"));