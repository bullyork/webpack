import React,{Component} from 'react';
import quickBuyStore from "./../../store/quickBuyStore.js";
import {setProductDialgo, setInputvalue,addProduct} from "./../../action/quickBuyAction.js";
import { Modal,Button ,Menu, DropdownButton, message,Upload,Icon, Dropdown } from 'antd';
import QiniuJSONRPC from "./../../models/QiniuService.js";

const DialogProduct = React.createClass({
    getInitialState() {
        return {
            visible: true,
            token:"",
            domain:"",
        };
    },
    handleOk() {
        var product = this.props.product;
        if(product["productStock"] !== ""){
            product["productStock"] = parseFloat(product["productStock"]);
        }
        product["productPrice"] = parseFloat(product["productPrice"]);
        product["productStock"] = parseFloat(product["productStock"]);
        product["productOriginPrice"] = parseFloat(product["productOriginPrice"]);
        if(product["productUrl"] === ""){
            alert('Url is empty!');
            return;
        }
        if(product["productPrice"] <= 0 || product["productPrice"] === ""){
            alert('price is musy greater than 0 and not NULL');
            return;
        }
        if(product["productStock"] <= 0 || product["productPrice"] === ""){
            alert('productStock is musy greater than 0 and not NULL');
            return;
        }

        quickBuyStore.dispatch(addProduct(this.props.settingId,product));
        quickBuyStore.dispatch(setProductDialgo(false));
    },
    handleCancel(e) {
        quickBuyStore.dispatch(setProductDialgo(false));
    },
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
    },
    componentWillMount(){
        this.getUploadInformation();
    },
    render() {
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
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                  message.success(`${info.file.name} 上传成功。`);
                  console.info(info);
                  quickBuyStore.dispatch(setInputvalue("productImage",context.state.domain+info.file.response.hash));
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} 上传失败。`);
                }
            }
        };
        return (
            <div>
                <Modal title="Add Products" visible={this.props.visible}
                onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Upload {...props}>
                        <Button type="ghost">
                            <Icon type="upload" /> 点击上传Image
                        </Button>
                    </Upload>
                    <div style={inputItem.div}>
                        <span>productUrl:</span>
                        <input style={inputItem.input} value={this.props.product.productUrl} name="productUrl" onChange={this.changeProductvalur} />
                    </div>
                    <div style={inputItem.div}>
                        <span>productPrice:</span>
                        <input style={inputItem.input} value={this.props.product.productPrice} name="productPrice" onChange={this.changeProductvalur} />
                    </div>
                    <div style={inputItem.div}>
                        <span>productStock:</span>
                        <input style={inputItem.input} value={this.props.product.productStock} name="productStock" onChange={this.changeProductvalur} />
                    </div>
                    <div style={inputItem.div}>
                        <span>productImage:</span>
                        <input style={inputItem.input} value={this.props.product.productImage} name="productImage" placeholder="Can be empty" onChange={this.changeProductvalur} />
                    </div>
                    <div style={inputItem.div}>
                        <span>rebateProductUrl:</span>
                        <input style={inputItem.input} value={this.props.product.rebateProductUrl} name="rebateProductUrl" placeholder="Can be empty" onChange={this.changeProductvalur} />
                    </div>
                </Modal>
            </div>
        );
    },
    changeProductvalur(event) {
        quickBuyStore.dispatch(setInputvalue(event.target.name,event.target.value));
    }
});

var inputItem = {
    div:{
        position: "relative",
        display: "table",
        borderCollapse: "separate",
        marginTop:"1rem"
    },
    span:{
        color:"#555",
        textAlign:"center",
        height:"37px",
        lineHeight:"37px",
        backgroundColor:"#eee",
        border: "1px solid #ccc",
        padding: "6px 12px",
        fontSize: "14px",
        display:"table-cell"
    },
    input:{
        outline:"medium",
        height:"37px",
        width:"100%",
        float:"left",
        display:"table-cell"
    }
}

export default DialogProduct;

