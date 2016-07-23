var Collection = require("../../models/FeatureCollectionService.js");
var Product = require("../../models/Product.js");
var Qiniu = require("./models/Qiniu.js");
var QiniuImageUpload = require("./qiniuimageupload.jsx");
var SortableContainerMixin = require("../../mixins/SortableContainerMixin.js");
var DpsService = require("../../models/Dps.js");

import Config from "../../common/config.js"
import Waterfall from "./../../common/waterfall.jsx";
import ModalDialog from "./../../common/modaldialog.jsx";
import RadioButtonGroup from "./../../common/radiobutton.jsx";
import FormDataChangeMixin from "./../../common/FormDataChangeMixin.js";
import {ImageField} from "./../../common";
import React,{Component} from "react"
import { Modal, Button,Upload,Icon,message,Alert,Select,Switch } from 'antd';
import Util from "../../common/util.js";
import { DragSource, DropTarget,DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SortableContainer from "../../common/sortable.jsx";
import { Router, Route, Link } from 'react-router';
const {assign} = Object;
const Option = Select.Option;


var WaterfallCanDrop = DragDropContext(HTML5Backend)(Waterfall);

var ItemTypes={
	CARD:"card"
}

var dragSource = {
  beginDrag:function(props) {
    return {
      item: {
        cardid: props.cardid
      }
    };
  },
  canDrag:function(props){
  	if(typeof props.canDarg === "undefined"){
  		return true;
  	}
  	return props.canDarg;
  },
  endDrag:function(props){
  	props.onDragEnd(props.cardid);
  	return null;
  }
};

var dropTarget = {
  hover:function(props, monitor) {
  	var item = monitor.getItem().item;
  	props.moveCard&&props.moveCard(item.cardid, props.cardid);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectForTarget(connect){
	return {
		connectDropTarget: connect.dropTarget()
	}
}

var CollectionProductItemOrigin = React.createClass({
	render:function(){

    	const { isDragging, connectDragSource, connectDropTarget } = this.props;

		var opacity = isDragging.isDragging?0.5:1;
		
		var removeBorder = "";
		if(this.props.isRemove){
			removeBorder = " borderred";
		}
		return connectDragSource(connectDropTarget(
			<div
           		style={{
					opacity:opacity
				}}
				key={this.props.id} 
				className={"waterfallCollectionProductItem padding10px"+removeBorder}>
				<div>
					<div>
						<img data-columnidx={this.props.columnIdx} src={Util.ImageUrl(this.props.qnBaseUrl,this.props.picture)} width="100%" />
					</div>
					<div className="productname"><a href={this.props.url} target="_blank">{this.props.name}</a></div>
					<div >
						<a href="javascript:void(0)" data-productid={this.props.id} onClick={this.props.onProductEdit} className="btn btn-default">Edit</a>
						&nbsp;&nbsp;
						<a href="javascript:void(0)" data-productid={this.props.id} onClick={this.props.onProductDelete} className="btn btn-danger">Delete</a>
					</div>
				</div>
			</div>
		))
	}
})

var CollectionProductItem = DropTarget(ItemTypes.CARD,dropTarget,collectForTarget)(DragSource(ItemTypes.CARD, dragSource, collect)(CollectionProductItemOrigin))

var CollectionEdit = React.createClass({
	getInitialState:function(){
		return {
			collection:{},
			currentPicKey:"",
			qnBaseUrl:"",
		}
	},
	mixins:[FormDataChangeMixin],
	emptyImageContent:<span>Please upload a image!</span>,
	render:function(){
		var previewImageShow = this.state.previewImageShow?"":"hide";
		var pic1ImgContent = this.emptyImageContent;
		var pic2ImgContent = this.emptyImageContent;
		var pic3ImgContent = this.emptyImageContent;
		if(this.state.collection.pic1!==""&&this.state.collection.pic1!==undefined){
			pic1ImgContent = <img className="img-thumbnail" src={Util.ImageUrl(this.state.qnBaseUrl,this.state.collection.pic1)} width="100%" />;
		}
		if(this.state.collection.pic2!==""&&this.state.collection.pic2!==undefined){
			pic2ImgContent = <img className="img-thumbnail" src={Util.ImageUrl(this.state.qnBaseUrl,this.state.collection.pic2)} width="100%" />;
		}
		if(this.state.collection.pic3!==""&&this.state.collection.pic3!==undefined){
			pic3ImgContent = <img className="img-thumbnail" src={Util.ImageUrl(this.state.qnBaseUrl,this.state.collection.pic3)} width="100%" />;
		}
		return (
			<div>
				<div className="container">
					<div>
						<a href="javascript:history.back()" className="btn btn-primary pull-right">Back</a>
						<h1>{this.state.collection.name}</h1>
					</div>
					<hr />
					<div className="row">
						<div className="input-group">
							<span className="input-group-addon">Collection Name:</span>
							<input type="text" className="form-control" {...this.formInputFor("collectionName")} placeholder={this.state.collection.name} aria-describedby="basic-addon1" />
							<a href="javascript:void(0)" style={{display:"table-cell"}} onClick={this._onCollectionUpdateNameHandler} className="btn btn-primary">Update Name</a>
						</div>
					</div>
					<div className="row margintop1rem">
						<div className="input-group">
							<span className="input-group-addon">IsActive?</span>
							<div className="form-control">
								<RadioButtonGroup ref="activeButton" options={[{name:"True",value:true},{name:"False",value:false}]} value={this.state.collection.isActive} />
							</div>
							<a  style={{display:"table-cell"}} onClick={this._onCollectionUpdateActiveHandler} className="btn btn-primary">Update Active</a>
						</div>
					</div>
					<hr />
					<div className="row text-center">
						<div className="col-md-4 padding10px" onClick={this.onPictureUploadHandler} data-pickey="pic1">
							<div className="collectionpicwrapper">{pic1ImgContent}</div>
							<div>PIC1(Click to upload)</div>
						</div>
						<div className="col-md-4 padding10px" onClick={this.onPictureUploadHandler} data-pickey="pic2">
							<div className="collectionpicwrapper">{pic2ImgContent}</div>
							<div>PIC2(Click to upload)</div>
						</div>
						<div className="col-md-4 padding10px" onClick={this.onPictureUploadHandler} data-pickey="pic3">
							<div className="collectionpicwrapper">{pic3ImgContent}</div>
							<div>PIC3(Click to upload)</div>
						</div>
					</div>
				</div>
				<QiniuImageUpload ref="imageUploadDialog" onUploadSuccessHandler={this._onImageUploadSuccessHandler} uploadToken={Qiniu.uptoken} />	
			</div>
		);
	},
	componentDidMount:function(){
		Collection.detail(this.props.params.collectionId,{
			"success":function(data){
				this.setState({collection:data.result});
			}.bind(this)
		})

		Qiniu.qnBaseUrl({
			"success":function(data){
				this.setState({qnBaseUrl:data.result});
			}.bind(this)
		})
	},
	onPictureUploadHandler:function(e){
		var pickey = e.currentTarget.getAttribute("data-pickey");
		this.setState({currentPicKey:pickey},function(){
			this.refs.imageUploadDialog.show();
		}.bind(this))
	},
	_onImageUploadSuccessHandler:function(data){

		var state = this.state;
		Collection.updatePic(this.props.params.collectionId,data.key,state.currentPicKey,{
			success:function(d){
				if(d.code === 0){
					var newCollection = this.self.state.collection;
					newCollection[this.self.state.currentPicKey] = this.key;
					this.self.setState({collection:newCollection})
					$.toaster({ priority : 'success', title : '', message : 'Upload Success!'});
				}else{
					$.toaster({ priority : 'warning', title : '', message : 'Save Fail!'});
				}
			}.bind({self:this,key:data.key})
		})
	},
	_onCollectionUpdateNameHandler:function(){
		var name = this.formValue("collectionName");
		if(this.state.collection.name !== name&&name!==undefined){
			Collection.updateName(this.state.collection.id,this.formValue("collectionName"),{
				success:function(d){
					if(d){
						var newCollection = this.state.collection;
						newCollection.name = this.formValue("collectionName");
						this.setState({collection:newCollection});
						$.toaster({ priority : 'success', title : '', message : 'Upload Success!'});
					}else{
						$.toaster({ priority : 'warning', title : '', message : 'Save Fail!'});
					}
				}.bind(this)
			})
		}else{
			$.toaster({ priority : 'warning', title : '', message : 'The name is the same!'});
		}
	},
	_onCollectionUpdateActiveHandler:function(){
		var newValue = this.refs.activeButton.getValue();
		if(newValue !== this.state.collection.isActive){
			Collection.updateActive(this.state.collection.id,newValue,{
				success:function(d){
					if(d){
						var newCollection = this.state.collection;
						newCollection.isActive = this.refs.activeButton.getValue();
						this.setState({collection:newCollection});
						$.toaster({ priority : 'success', title : '', message : 'Upload Success!'});
					}else{
						$.toaster({ priority : 'warning', title : '', message : 'Save Fail!'});
					}
				}.bind(this)
			})
		}else{
			$.toaster({ priority : 'warning', title : '', message : 'The new value is the same!'});
		}
	},
	_onCollectionUpdatePrimeHandler:function(){
		Collection.UpdatePrime(this.state.collection.id,newValue,{
			success:function(d){
				if(d){
					var newCollection = this.state.collection;
					newCollection.isActive = this.refs.primeRadioButton.getValue();
					this.setState({collection:newCollection});
					$.toaster({ priority : 'success', title : '', message : 'Upload Success!'});
				}else{
					$.toaster({ priority : 'warning', title : '', message : 'Save Fail!'});
				}
			}.bind(this)
		})
	}
})

var CollectionProductManage = React.createClass({
	prevOffset:0,
	mixins:[SortableContainerMixin],
	loadingProductsLock:false,
	fetchProductLinkLock:false,
	getInitialState: function () {
	    return {
	        products:[],
	        collection:{},
	        editItem:{},
	        canDrag:true,
	        qnBaseUrl:"",
			limit:75,
			offset:0,
			productNum:0
		};
	},
	render:function(){
		return (
			<div className="container">
				<div className="row">
					<h1>Product List: ({this.state.collection.name})</h1>
				</div>
				<div className="row">
					<h1>Product Amount: {this.state.collection.productCount}</h1>
				</div>
				<div className="row">
					<h1>Product Number: {this.state.productNum}</h1>
				</div>
				<div className="row">
					<a href="javascript:history.back()" className="pull-left btn btn-primary">Back</a>
					<a href="javascript:void(0)" className="pull-left btn btn-default" onClick={this._onProductAddHandler}>Add</a>
					<a href="javascript:void(0)" className="pull-left btn btn-default" onClick={this.downloadXlsx} >下载Excel</a>
					<a href="javascript:void(0)" className="pull-left btn btn-default" onClick={this._onUpdateToPrimeHandler}>Update To Prime</a>
					<a href="javascript:void(0)" className="pull-left btn btn-default" onClick={this._onCancelToPrimeHandler}>Cancel Prime</a>
				</div>
				<div className="row padding10px">
					<div className="input-group">
						<span className="input-group-addon" id="basic-addon1">Product Url</span>
						<input type="text" ref="productLink" className="form-control" placeholder="Please input the product url." />
						<div className="input-group-btn">
							<a href="javascript:void(0)" className="btn btn-default" onClick={this._onProductAddByLinkHandler}>Add By Link</a>
						</div>
					</div>
				</div>
				<div className="row" border={{borderBottom:"1px dashed #ccc",marginTop:"10px"}}>
	                <WaterfallCanDrop 
	                	columnNum={5} 
	                	data={this.state.products} 
	                	itemRender={this.waterFallItemRender(this)}
	                	onLoadMore={this._onWaterfallLoadMoreHandler} />
				</div>
				<div style={{display:"none",textAlign:"center",marginTop:"10px"}}>
					<a href="javascript:void(0)" className="btn btn-primary" onClick={this._onLoadMoreHandler}>Load more product</a>
				</div>
				<ModalDialog title="Edit Product" ref="editProductDialog" buttons={this.getEditProductButtons()}>
					<CollectionProductInput qnBaseUrl={this.state.qnBaseUrl} ref="editProductInput" product={this.state.editItem} />
				</ModalDialog>
				<ModalDialog title="Add Product" ref="addProductDialog" buttons={this.getAddProductButtons()}>
					<CollectionProductInput qnBaseUrl={this.state.qnBaseUrl} ref="addProductInput" product={this.state.editItem} />
				</ModalDialog>
			</div>
		)
	},
	componentDidMount: function () {
	   this.loadData();
	},
	waterFallItemRender:function(context){
		return function(item,columnIdx){
			return (
				<CollectionProductItem 
					key={item.id}
					cardid={item.id} 
					columnIdx={columnIdx} 
					qnBaseUrl={context.state.qnBaseUrl}
					{...item}
					moveCard={context._onMoveCardHandler}
					onDragEnd={context.onDragEndHandler}
					onProductEdit={context._onProductEditHandler}
					onProductDelete={context._onProductDeleteHandler} />
			)
		}
	},
	_onWaterfallLoadMoreHandler:function(){
		this.loadProductsData();
	},
	_onProductAddByLinkHandler:function(){
		if(this.fetchProductLinkLock){
			return;
		}
		var productUrl = React.findDOMNode(this.refs.productLink).value;
		$.toaster({ priority : 'success', title : '', message : 'Start fetch product data!'});
		var neweditItem = {};
		neweditItem.collectionId = this.props.params.collectionId;
		neweditItem.isPrime = false;
		neweditItem.transportType = 0;
		neweditItem.isRemove = false;
		neweditItem.weight = 0;
		this.setState({editItem:neweditItem},function(){
			this.refs.addProductDialog.show();
		}.bind(this))
		DpsService.GetProductDetail(productUrl,{

			success:(data)=>{
				if(data.result.productName!==undefined){
					var product = {
						name:data.result.productName,
						price:data.result.unitPrice,
						url:data.result.productUrl,
						picture:data.result.productImage,
						collectionId:this.props.params.collectionId,
					};
					this.setState({editItem:assign({},product,neweditItem)});
				}
			},
			error:function(){
				$.toaster({ priority : 'warning', title : '', message : 'Save fail'});
			},
			complete:function(){
			}.bind(this)
		})
	},
	loadProductsData:function(callback){
		if(this.loadingProductsLock){
			return;
		}
		this.loadingProductsLock = true;
		Product.list(this.props.params.collectionId,this.state.products.length,this.state.limit,{
    		success:function(data){
    			if(data.products.length === 0){
					$.toaster({ priority : 'warning', title : '', message : 'No more data'});
    			}
    			this.setState({productNum: data.productNum});

    			this.setState({products:[...this.state.products,...data.products.map((oneProduct)=>{
    				return assign({},oneProduct.product,{
    					weight:oneProduct.weight,
    					isPrime:oneProduct.isPrime,
    					transportType:oneProduct.transportType
    				})	
    			})]});
    			//this.refreshCards();
    		}.bind(this),
    		complete:function(data){
    			this.self.loadingProductsLock = false;
    			this.self.setState({canDarg:true});
    			this.callback&&this.callback();
    		}.bind({self:this,callback:callback})
    	});
	},
	loadData:function(){
    	this.setState({canDarg:false});
    	this.loadProductsData();
    	Collection.detail(this.props.params.collectionId,{
			"success":function(data){
				this.setState({collection:data.result});
			}.bind(this)
		});
		Qiniu.qnBaseUrl({
			"success":function(data){
				this.setState({qnBaseUrl:data.result});
			}.bind(this)
		})
	},
	_onLoadMoreHandler:function(){
    	this.loadProductsData();
	},
	onPageSizeChangeHandler:function(e){
		this.setState({limit:e.target.value},function(){
			this.loadData();
		})
	},
	setProductsByIds:function(ids){
		var newProducts = [];
		for(var i in this.state.products){
			var idx = ids.indexOf(this.state.products[i].id);
			if(idx>-1){
				newProducts[idx] = this.state.products[i];
			}
		}
		this.setState({products:newProducts});
	},
	_onDragEndHandler:function(prevId,nextId,sortId){
		var ids = this.getCurrentOrder();
		var originSort = this.state.products.map(function(item){return item.id});
		this.setProductsByIds(ids);
    	this.setState({canDarg:false});
		Product.doSort(prevId,nextId,sortId,{
			success:function(data){
				if(data.isSuccess===true){
					$.toaster({ priority : 'success', title : '', message : 'Change Order Success!'});
				}else{
					this.self.setProductsByIds(this.ids);
					$.toaster({ priority : 'warning', title : '', message : 'Save fail'});
				}
			}.bind({self:this,ids:originSort}),
			error:function(){
				this.self.setProductsByIds(this.ids);
				$.toaster({ priority : 'warning', title : '', message : 'Save fail'});
			}.bind({self:this,ids:originSort}),
			complete:function(){
    			this.setState({canDarg:true});
			}.bind(this)
		});
	},
	componentWillMount: function () {
	    this.collectionKey = "products";  
	},
	findByProductId:function(productId){
		var product = {};
		for(var i in this.state.products){
			if(this.state.products[i].id === productId){
				product = this.state.products[i];
				break;
			}
		}
		return product;
	},
	_onProductEditHandler:function(e){
		var productid = e.currentTarget.getAttribute("data-productid");
		if(productid){
			this.setState({editItem:this.findByProductId(productid)},function(){
				this.refs.editProductDialog.show();
			}.bind(this));
		}
	},
	_onProductAddHandler:function(e){
		var newItem = {};
		newItem = {};
		newItem.collectionId = this.props.params.collectionId;
		newItem.isPrime = false;
		newItem.transportType = 0;
		newItem.isRemove = false;
		newItem.weight = 0;
		this.setState({editItem:newItem},function(){
			this.refs.addProductDialog.show();
		}.bind(this));
	},
	_onProductDeleteHandler:function(e){
		var productid = e.currentTarget.getAttribute("data-productid");
		if(productid){
			if(confirm("Are you sure delete?")){
				Product.delete(productid,{
					success:function(data){
						if(data.isSuccess){
							var limitBefore = this.state.limit;
							this.setState({products:[],limit:this.state.products.length},function(){
								this.self.loadProductsData(function(){
									this.self.setState({limit:this.limitBefore});
								}.bind({self:this.self,limitBefore:this.self.limitBefore}));
							}.bind({self:this,limitBefore:limitBefore}));
							$.toaster({ priority : 'success', title : '', message : 'Delete Success!'});
						}else{
							$.toaster({ priority : 'danger', title : '', message : 'Delete Fail'});
						}
					}.bind(this)
				});
			}
		}
	},
	_onProductDoEditHandler:function(){
		var product = this.refs.editProductInput.getProductData();
		var priceType = parseFloat(product.price);
		Product.update(
			product.id, product.name, product.url, priceType, product.picture,product.isRemove,parseFloat(product.weight),product.isPrime,product.transportType,
			{
				success:function(data){
					if(data.isSuccess === true){
						$.toaster({ priority : 'success', title : '', message : 'Modify Product Success!'});
						var newProducts = this.self.state.products;
						for(var i in newProducts){
							if(newProducts[i].id === this.product.id){
								newProducts[i] = assign({},this.product,{weight:parseFloat(this.product.weight),isPrime:this.product.isPrime,transportType:this.product.transportType});
							}
						}
						this.self.setState({products:newProducts});
						this.self.refs.editProductDialog.hide();
					}else{
						$.toaster({ priority : 'warning', title : '', message : 'Modify Product Fail!'});
					}
				}.bind({self:this,product:product}),
				error:function(){
					$.toaster({ priority : 'warning', title : '', message : 'Modify Product Fail!'});
				}
			}
		);
	},
	getEditProductButtons:function(){
		var buttons = [];
		buttons.push(<button className="btn btn-danger" onClick={this._onProductDoEditHandler}>Update</button>);
		return buttons;
	},
	_onProductDoAddHandler:function(){
		if(this.fetchProductLinkLock === true){
			return;
		}
		this.fetchProductLinkLock = true;
		var reactThis = this;
		var product = this.refs.addProductInput.getProductData();
		var priceFloat = parseFloat(product.price);
		if(product.isRemove === undefined ){
			product.isRemove = false;
		}

		Product.add(
			{collectionId:this.state.collection.id, name:product.name, url:product.url, price:priceFloat,weight:product.weight, picture:product.picture,isRemove:product.isRemove,isPrime:product.isPrime,transportType:product.transportType},
			{
				success:function(data){
					if(data.isSuccess === true){
						var limitBefore = reactThis.state.limit;
							reactThis.setState({products:[],limit:75},function(){
								reactThis.loadProductsData(function(){
									reactThis.setState({limit:reactThis.limitBefore});
								});
							});
						$.toaster({ priority : 'success', title : '', message : 'Add Product Success!'});
						reactThis.refs.addProductDialog.hide();
					}else{
						$.toaster({ priority : 'warning', title : '', message : 'Add Product Fail!'});
					}
					reactThis.fetchProductLinkLock = false;
				}.bind({product:product}),
				error:function(){
					$.toaster({ priority : 'warning', title : '', message : 'Add Product Fail!'});
					reactThis.fetchProductLinkLock = false;
				}
			}
		);
	},
	downloadXlsx:function(data){
		if (this.state.products.length === 0){
			alert('没有产品');
			return;
		}else{
			var downloadCollectionId = this.state.products[0].collectionId;
			window.open(Config.GET_EXCEL_URL + "?collectionId=" + downloadCollectionId);
		}
	},
	getAddProductButtons:function(){
		var buttons = [];
		buttons.push(<button className="btn btn-danger" onClick={this._onProductDoAddHandler}>Add</button>);
		return buttons;
	},
	_onUpdateToPrimeHandler:function(){
		Collection.UpdatePrime(this.props.params.collectionId,true,{
			success:function(){
				$.toaster({ priority : 'success', title : '', message : 'Update Success!'});
			},
			error:function(){
				$.toaster({ priority : 'warning', title : '', message : 'Update Fail!'});
			}
		})
	},
	_onCancelToPrimeHandler:function(){
		Collection.UpdatePrime(this.props.params.collectionId,false,{
			success:function(){
				$.toaster({ priority : 'success', title : '', message : 'Update Success!'});
			},
			error:function(){
				$.toaster({ priority : 'warning', title : '', message : 'Update Fail!'});
			}
		})
	}
});

const shipmentInfos = [{
	name:"Unknown",
	id:0
},{
	name:"Normal",
	id:1
},{
	name:"Sensitive",
	id:2
}];


var CollectionProductInput = React.createClass({
	mixins:[FormDataChangeMixin],
	fields:[
		{name:"id",type:"string"},
		{name:"collectionId",type:"string"},
		{name:"name",type:"string"},
		{name:"url",type:"string"},
		{name:"price",type:"float"},
		{name:"weight",type:"float"},
		{name:"picture_link",type:"string",placeholder:"If image is uploaded this field will overwrite upload image url."},
	],
	getInitialState: function () {
	    return {
	        picture:"",  
	    };
	},
	render:function(){
		var rows = this.fields.map(function(item,i){
			var disabled = {};
			if(item.name==="collectionId"||item.name==="id"){
				disabled["disabled"] = "disabled"; 
			}
			var placeholder = {};
			if(item.placeholder !== undefined){
				placeholder = {placeholder:item.placeholder};
			}
			return(
				<div className="row margintop1rem" key={i}>
					<div className="input-group">
						<span className="input-group-addon" id="basic-addon1">{item.name}</span>
						<input type="text" {...disabled} className="form-control" {...this.formInputFor(item.name)} {...placeholder} aria-describedby="basic-addon1" />
					</div>
				</div>
			)
		},this)
		
		return (
			<div>
				{rows}
				<div className="row margintop1rem">
					<div>
			  			<div className="col-md-4">
			  				<div className="padding10px">IsRemove?</div>
			  			</div>
  						<div className="col-md-8">
  							<div className="padding10px">
  								<RadioButtonGroup ref="removeRadio" options={[{name:"True",value:true},{name:"False",value:false}]} value={this.props.product.isRemove} />
							</div>
						</div>
					</div>
				</div>
				<div className="row margintop1rem">
		  			<div className="col-md-6">
		  				<QiniuImageUpload ref="imageUploadDialog" mode="row" uploadToken={Qiniu.uptoken} onUploadSuccessHandler={this._onImageUploadSuccessHandler} />
		  			</div>
		  			<div className="col-md-6">
						<div style={{width:"80px",backgroundSize: "contain",border:"1px solid #ddd",height:"80px",backgroundImage:"url("+Util.ImageUrl(this.props.qnBaseUrl,this.state.picture)+")"}}></div>
		  			</div>
				</div>
				<div className="row margintop1rem">
		  			<div className="col-md-4">
		  				<div className="padding10px">Shipment Info</div>
		  			</div>
					<div className="col-md-8">
						<Select
							{...this.formInputFor("transportType")}
						>
							{shipmentInfos.map((oneShipment)=>{
								return (
									<Option value={oneShipment.id}>{oneShipment.name}</Option>
								)
							})}
						</Select>
					</div>
				</div>
				<div className="row margintop1rem">
		  			<div className="col-md-4">
		  				<div className="padding10px">Is Prime</div>
		  			</div>
		  			<div className="col-md-8">
		  				<Switch {...this.formInputFor("isPrime",{valueKey:"checked"})} />
		  			</div>
				</div>
			</div>
		)
	},
	componentWillReceiveProps: function (nextProps) {
		if(nextProps.product!==undefined){
		    var newForm = {};
		    for(var i in nextProps.product){
		    	newForm[i] = nextProps.product[i];
		    }
		    if(/^(?:https?:)?\/\/.*/.test(nextProps.product.picture)){
		    	newForm["picture_link"] = nextProps.product.picture;
		    }
		    this.setState({form:newForm,picture:nextProps.product.picture});
		}
	},
	getProductData:function(){
		var product = {};
		for(var i=0;i< this.fields.length;i++){
			var value = this.formValue(this.fields[i].name);
			if(this.fields[i].type === "int"){
				value = parseInt(value);
			}else if(this.fields[i].type === "float"){
				value = parseFloat(value);
			}
			product[this.fields[i].name] = value;
		}
		product["picture"] = this.state.picture;
		if(product["picture_link"]!==undefined&&product["picture_link"]!==""){
			product["picture"] = product["picture_link"];
		}
		product["isRemove"] = this.refs.removeRadio.getValue();
		product["transportType"] = this.formValue("transportType");
		product["isPrime"] =  this.formValue("isPrime");
		return product;
	},
	resetForm:function(){
		this.setState({form:{},picture:""});
	},
	_onImageUploadSuccessHandler:function(data){
		var newForm = this.state.form;
		newForm["picture_link"] = this.props.qnBaseUrl + data.key;
		this.setState({picture:data.key,form:newForm},function(){
			this.refs.imageUploadDialog.hide();
		}.bind(this))
	}
})

var CollectionManage = React.createClass({
	prevOffset:0,
	getInitialState: function () {
	    return {
	        originCode:"CN",
	        collections:[],
	        canDrag:true,
	    	limit:2000,
	    	offset:0,
	    	ExcelDialogDisplayState:false,
	    };
	},
	mixins:[FormDataChangeMixin],
	render:function(){
		var row = {
			"marginBottom" : "3",
		};
		var upDate = {
			"marginLeft" : "7",
		};
		var input = {
			"width" : "200","height" : "40","marginTop" : "1","marginRight" : "7"
		}
		var witebox = {
			"width" : "100","height" : "30","text-align" : "center","position" : "absolute","left" : "50%","margin-left" : "-50px;","top" : "0","background" : "#ddd","lineHeight" : "30","display" : "none",
		}
		return (
			<div className="container" style={{marginBottom:"26px"}}>
				<h1>Feature Collections({this.state.originCode})</h1>
				<div className="row"  style={row}>
					<div className="col-md-12">
						<a href="javascript:history.back()" className="btn btn-default">Back</a>
						<a href="javascript:void(0)" className="btn btn-default" onClick={this._onCollectionAddHandler}>Add</a>
						<a href="javascript:void(0)" className="btn btn-default" onClick={this.updatePrice} style={upDate}>upDate</a>
						<input type="text" style={input} ref="upDateId"/>
						<Upload {...fileUploadProps}>
						    <Button type="ghost">
						      <Icon type="upload" /> Excel导入
						    </Button>
						</Upload>
					</div>
				</div>
				<wite ref="witeUpdate" style={witebox}>
					<div>
						正在更新
					</div>
				</wite>
				<div style={{fontSize:"16px"}}>
					<span>OriginCode:</span>
					<select value={this.state.originCode} onChange={this.onOriginChangeHandler} style={{marginRight:"16px"}}>
						<option value="CN">CN</option>
						<option value="TW">TW</option>
						<option value="US">USA</option>
					</select>
					<a href="javascript:void(0)" onClick={this.onPrevPageHandler} className="btn btn-default">Prev</a>
					&nbsp;&nbsp;{this.state.offset}&nbsp;&nbsp;
					<a href="javascript:void(0)" onClick={this.onNextPageHandler} className="btn btn-default" style={{marginRight:"16px"}}>Next</a>
					<span>Page Size:</span>
					<select value={this.state.limit} onChange={this.onPageSizeChangeHandler} style={{marginRight:"16px"}}>
						<option value="10">10</option>
						<option value="2000">2000</option>
						<option value="50">50</option>
					</select>
					Total :{this.state.collections.length}
				</div>
				<div className="row">
					<SortableContainer 
						customRender={this.customRender} 
						canDarg={this.state.canDarg} 
						data={this.state.collections} 
						ref="list" 
						onDragEnd={this.onDragEndHandler} />
				</div>
				<ModalDialog title="Add Collection" ref="addCollectionDialog" buttons={this.getAddCollectionButtons()}>
					<div className="input-group">
						<span className="input-group-addon" id="basic-addon1">Collection Name</span>
						<input type="text" className="form-control" {...this.formInputFor("collectionname")} aria-describedby="basic-addon1" />
					</div>
				</ModalDialog>
			</div>
		)
	},
	componentDidMount: function () {
	   this.loadData();
	},
	loadData:function(){
    	this.setState({canDarg:false});
		Collection.list(this.state.originCode,0,this.state.limit,{
    		success:function(data){
    			this.setState({collections:data.ProList,canDarg:true});
    			//this.refs.list.refreshCards();
    		}.bind(this),
    		complete:function(data){
    			this.setState({canDarg:true});
    		}.bind(this)
    	})
	},
	changeDialogState: function(){
		this.setState({ExcelDialogDisplayState:false});
	},
	onOriginChangeHandler:function(e){
		this.setState({offset:0,originCode:e.target.value},function(){
			this.loadData();
		})
	},
	onPageSizeChangeHandler:function(e){
		this.setState({offset:0,limit:e.target.value},function(){
			this.loadData();
		})
	},
	setCollectionsByIds:function(ids){
		var newCollections = [];
		for(var i in this.state.collections){
			var idx = ids.indexOf(this.state.collections[i].id);
			if(idx>-1){
				newCollections[idx] = this.state.collections[i];
			}
		}
		this.setState({collections:newCollections});
	},
	onDragEndHandler:function(prevId,nextId,sortId){
		var ids = this.refs.list.refs.child.getCurrentOrder();
    	var originIds = this.state.collections.map(function(item){return item.id;});
    	this.setCollectionsByIds(ids);
    	this.setState({canDarg:false});
		Collection.doSort(prevId,nextId,sortId,{
			success:function(data){
				if(data===false){
					this.self.setCollectionsByIds(this.originIds);
					$.toaster({ priority : 'warning', title : '', message : 'Save Fail!'});
				}else{
					$.toaster({ priority : 'success', title : '', message : 'Save Success!'});
				}
			}.bind({self:this,ids:ids,originIds:originIds}),
			complete:function(){
    			this.setState({canDarg:true});
			}.bind(this)
		});
	},
	onNextPageHandler:function(){
		if(this.state.collections.length!==0){
			this.prevOffset = this.state.offset;
		}
		this.setState({offset:this.state.offset+this.state.collections.length},function(){
			this.loadData();	
		})
	},
	onPrevPageHandler:function(){
		var newOffset = this.prevOffset;
		if(this.state.collections.length>0){
			newOffset = this.state.offset-this.state.limit;
		}
		if(newOffset<0){
			newOffset = 0;
		}
		this.setState({offset:newOffset},function(){
			this.loadData();
		})
	},
	customRender:function(props,connectDragSource, connectDropTarget,dragState){
		var activeStatus = "";
		if(props.isActive === false){
			activeStatus = "Not Active";
		}
		return connectDragSource(connectDropTarget(
			<div style={{padding:"5px",borderBottom:"1px dashed #aaa",cursor:"pointer",opacity:dragState.isDragging?"0.5":"1.0"}}>
				<div style={{float:"left"}}>{props.name}</div>
				<div style={{float:"right"}}>
					<span>{activeStatus}</span>&nbsp;
					<div style={{width:"100px",display:"inline-block",textAlign:"center","color":"green"}}>{props.isPrimeCollection ? "Prime Collection":"Not Prime"}</div>&nbsp;
					<Link to={`/collectionEdit/${props.cardid}`} params={{id: 1}} className="btn btn-default">Edit</Link>&nbsp;&nbsp;
					<Link to={`/productManage/${props.cardid}`} className="btn btn-primary">View Products</Link>
				</div>
				<div style={{clear:"both"}}></div>
			</div>
		))
	},
	getAddCollectionButtons:function(){
		var buttons = [];
		buttons.push(<button className="btn btn-danger" onClick={this._onCollectionDoAddHandler}>Add</button>);
		return buttons;
	},
	_onCollectionDoAddHandler:function(){
		Collection.add(this.state.form.collectionname,this.state.originCode,{
			success:function(data){
				if(data.isSuccess === true){
					this.loadData();
					this.refs.addCollectionDialog.hide();
					$.toaster({ priority : 'success', title : '', message : 'Add Collection Success!'});
				}else{
					$.toaster({ priority : 'danger', title : '', message : 'Add Collection Fail!'});
				}
			}.bind(this)
		});
	},
	updatePrice:function(){
		var upDateId = React.findDOMNode(this.refs.upDateId).value;
		React.findDOMNode(this.refs.witeUpdate).style.display = "block";
		Collection.UpdatePrice(upDateId,{
			success:function(data){
				if(data.result.code === 1){
					$.toaster({ priority : 'success', title : '', message : 'UpDate Success'});
					React.findDOMNode(this.refs.witeUpdate).style.display = "none";
				}else if(data.result.code === -2){
					$.toaster({ priority : 'success', title : '', message : 'No find'});
					React.findDOMNode(this.refs.witeUpdate).style.display = "none";
				}else{
					$.toaster({ priority : 'danger', title : '', message : 'UpDate Error'});
					React.findDOMNode(this.refs.witeUpdate).style.display = "none";
				}
			}.bind(this)
		});
	},
	_onCollectionAddExcelHandler: function() {
		this.setState({ExcelDialogDisplayState:true});
	},
	_onCollectionAddHandler:function(){
		this.refs.addCollectionDialog.show();
	},
	_onExcelAddHandler:function(){
		this.refs.addExcelDialog.show();
	},
});

var hideFunction = null;

const fileUploadProps = {
	"action":"/api/upload",
	"accept":"*.xlsx,*.xls",
	"multiple":false,
	onChange(info) {
		if(hideFunction === null){
			hideFunction = message.loading('正在执行中...', 0);
		}
		if (info.file.status === 'done' && info.file.response !== null) {
			hideFunction();
			hideFunction = null;
			message.success(info.file.response.data.info,3);
		} else if (info.file.status === 'error') {
			hideFunction();
			hideFunction = null;
			message.error("erro",3);
		}
  	}
}

module.exports = {
	Manage:CollectionManage,
	CollectionEdit:CollectionEdit,
	ProductManage:CollectionProductManage,
}