import React,{Component} from "react"
import ReactDOM from "react-dom"
import { Router, Route, Link } from 'react-router';
import AppWrapper from "../common/appwrapperCommon.jsx";
import QiniuJSONRPC from "../models/QiniuService.js";
import { Upload, Icon, Tooltip } from 'antd';
import CopyButton from "../thirdpart/ZeroClipboard/react/index.js";

const Dragger = Upload.Dragger;
var  qiniuUploadUrl;

if (window.location.protocol === 'https:') {
    qiniuUploadUrl = 'https://up.qbox.me';
} else {
    qiniuUploadUrl = 'http://upload.qiniu.com';
}


export class QiniuUpload extends Component {
  constructor(props){
      super(props)
      this.state = {
        token:null,
        domain:null,
        fileList: []
      }
  }
  handleChange(info){
    var that = this;

    var result = null;
    if(info.file.status === "done"){
      result = info.file.response;
    }

    let fileList = info.fileList;

    // 1. 上传列表数量的限制
    //    只显示最近上传的10个，旧的会被新的顶掉
    // fileList = fileList.slice(-10);

    // 2. 读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = that.state.domain + file.response.key;
      }
      return file;
    });

    // 3. 按照服务器返回信息筛选成功上传的文件
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.hasOwnProperty("key");
      }
      return true;
    });

    this.setState({ fileList });
  }
  render() {
    var that = this;
    const props = {
      multiple:true,
      action: qiniuUploadUrl,
      data:{
        token:this.state.token
      },
      onChange:this.handleChange.bind(that)
    };
    return (
      <div>
        <div>
          <div style={{ marginTop: 16, height: 180 }}>
            <Dragger {...props} fileList={this.state.fileList}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
              <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
            </Dragger>
            {this.showImages()}
          </div>
        </div>
      </div>
    );
  }
  showImages(){

    if(this.state.fileList.length <= 0){
      return null;
    }

    return this.state.fileList.map((val,i)=>{
      var refValue = "UrlText" + i;
      if(typeof val.url === "undefined"){
        return null;
      }

      return (
        <div className="scan-img-item">
          <div className="imgBox">
            <img src={val.url} alt={val.name} style={{maxWidth:"100%",display:"block"}}/>
          </div>
          <div className="link-url">
            <textarea className="form-control" ref={refValue} value={val.url} name={val.name} rows="3" onFocus={this.handleTextarea.bind(this,refValue)} />
            <CopyButton text={val.url} onAfterCopy={this.handleAfterCopy.bind(this,val)}>
              <Tooltip title="Click Copy URL">
                <button className="btn btn-default">Copy URL</button>
              </Tooltip>
            </CopyButton>
          </div>
        </div>
      )
    });
  }

  handleAfterCopy(val){
    var text = val.url;
    alert("Copy successful!");
  }
  handleTextarea(name){
    this.refs[name].select();
  }
  componentDidMount(){
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
}

ReactDOM.render(<AppWrapper><QiniuUpload /></AppWrapper>, document.getElementById("appContainer"))