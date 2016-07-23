import React,{Component} from 'react';
import ReactDOM from "react-dom"
import { Router, Route, Link } from 'react-router';
import { Modal,Form, Input, Button, Checkbox,Table,message,Upload,Icon, Dropdown } from 'antd';
import SeedStore from "./../../store/seedStore.js";
import {Provider,connect} from "react-redux";
import {getProductByCid,getCategorylist,setBoostType} from "./../../action/seedAction.js";
import SeedService from "./../../models/seedService.js"


class SeedProduct extends React.Component{
	constructor(props){
        super(props);
        this.state = {
        	visibleProducts:false,
        	addProduct:{
        		productUrl:"",
        	},
            columns : [
              { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
              { title: 'Categories', dataIndex: '', key: 'x', render: (text, record) => <Button onClick={() =>{this.viewSoonCategory(record.id)}}>Categories</Button> },
            ],
        };
    }
    render(){
    	var hideFunction = null;
    	const fileUploadProps = {
		    "action":"/api/boostAdmin/BoostAdmin/ImportBoostProduct",
		    "accept":"*.xlsx,*.xls",
		    "multiple":false,
		    data:{
		    	cid:this.props.params.cid
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
    	return(
    		<div>
    			<div style={{height:"50px"}}>
    				<Button type="primary" onClick={this.goCateogry.bind(this)}>回到Category</Button>
    				<Button type="primary" onClick={this.resort.bind(this)}>Resort</Button>
    				<Button type="primary" onClick={this.resetBoostType("")}>All</Button>
                    <Button type="primary" onClick={this.resetBoostType("ezbuy")}>Ezbuy</Button>
                    <Button type="primary" onClick={this.resetBoostType("prime")}>prime</Button>
                    <Button type="primary" onClick={this.deleteAll.bind(this)}>Remove All</Button>
                    <Button type="primary" onClick={this.addProducts.bind(this)}>Add Products</Button>
                    <Upload {...fileUploadProps}>
                        <Button type="ghost">
                            <Icon type="upload" /> Excel导入种子商品
                        </Button>
                    </Upload>
				</div>
				<div style={styles.products}>
					{this.renderFlashSalesItem()}
				</div>
				<Modal title="Add Products" visible={this.state.visibleProducts}
		          onOk={this.addProductConfirm.bind(this)} onCancel={this.hideProductDialog.bind(this)}>
		          	{this.renderAddProductItem()}
		        </Modal>
			</div>
    		)
    }
    componentWillMount(){
    	SeedStore.dispatch(getProductByCid(parseInt(this.props.params.cid),this.props.Product.boostType,50,0));
    	// SedStore.dispatch(getCategorylist(0));
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.props.Product.boostType !== nextProps.Product.boostType) {
            SeedStore.dispatch(getProductByCid(parseInt(this.props.params.cid),nextProps.Product.boostType,50,0));
        }
    }
	changeInputValue(event){
    	var key = event.target.name;
    	var newAddProduct = this.state.addProduct;
    	newAddProduct[key] =  event.target.value;
    	this.setState({addProduct:newAddProduct});
    }
    hideProductDialog(){
    	this.setState({visibleProducts:false});
    }
    goCateogry(){
    	if(this.props.Category.cateogryId === 0){
    		window.location.hash = '/Category/0';
    	}else {
    		window.location.hash = '/Category/'+this.props.Category.categoryId;
    	}
    }
    addProductConfirm(){
    	var context = this;
    	if(this.state.addProduct.productUrl === ""){
    		alert("productUrl is NULL");
    		return;
    	}

    	SeedService.AddBoostProduct(context.state.addProduct.productUrl,parseInt(context.props.params.cid)).then((data)=>{
			if(data === false){
				message.success("add fail", 3);
			}
			context.setState({visibleProducts:false});
			// SeedStore.dispatch(getProductByCid(parseInt(self.props.params.cid),self.props.Product.boostType,50,0));
		})
    }
    renderAddProductItem(){
    	
    	return (
    		<div>
                <div style={{height:"50px"}}><span>productUrl:</span><input value={this.state.addProduct.productUrl} name="productUrl" onChange={this.changeInputValue.bind(this)} style={{width:"60%",height:"40px",outline:"medium",marginLeft:"3px"}}/></div>
    		</div>
    		)
    }
    renderFlashSalesItem(){
		var flashSalesItem = this.props.Product.products.map(function(item,i){
			return (
				<div>
					<div style={styles.ProductsItem}>
						<div>
							<img src={item.productImage} width="100%" height="200px" />
						</div>
						<div>
							Price:{item.productPrice}
						</div>
						<div>OriginPrice:{item.productOriginPrice}</div>
						<button style={styles.actionButton}>Edit</button>
						<button style={styles.actionButtonR} onClick={this.deleteProducts(item.id)}>delete</button>
					</div>
				</div>
				)
		},this)
		return flashSalesItem;
	}
	deleteProducts(id){
		var self = this;
		return function(){
			if(confirm("delete the products")){
				SeedService.DeleteBoostProduct(id).then((data)=>{
					message.success(data, 3);
					SeedStore.dispatch(getProductByCid(parseInt(self.props.params.cid),self.props.Product.boostType,50,0));
				})
			}
		}

	}
	resetBoostType(boostType){
		return function(){
			SeedStore.dispatch(setBoostType(boostType));
		}
	}
	resort(){
		var self = this;
		SeedService.ReSortBoostProduct(parseInt(this.props.params.cid)).then((data)=>{
			if(data.message === "ok"){
				message.success("resort success", 3);
				SeedStore.dispatch(getProductByCid(parseInt(self.props.params.cid),self.props.Product.boostType,50,0));
			}else {
				message.success("resort fail", 3);
			}
		})
	}
	deleteAll(){
		var self = this;
		if(confirm("delete the products")){
			SeedService.RemoveAllBoostProductByCid(parseInt(self.props.params.cid),self.props.Product.boostType).then((data)=>{
				if(data.message === "ok"){
					message.success("delete success", 3);
					SeedStore.dispatch(getProductByCid(parseInt(self.props.params.cid),self.props.Product.boostType,50,0));
				}else {
					message.success("resort fail", 3);
				}
			})
		}
	}
	addProducts(){
		this.setState({visibleProducts:true});
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


function mapStateToProps(state) {
  return Object.assign({},state,{});
}

var SeedProductComponents = connect(mapStateToProps)(SeedProduct);

export default SeedProductComponents;