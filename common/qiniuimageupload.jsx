import ModalDialog from "./../commons/modaldialog.jsx";
import React from "react"

var Qiniu_UploadUrl = "http://up.qiniu.com";

var Qiniu_upload = function(f, token, key,callbacks) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Qiniu_UploadUrl, true);
    var formData = new FormData();
    var startDate = new Date().getTime();
    if (key !== null && key !== undefined) formData.append('key', key);
    formData.append('token', token);
    formData.append('file', f);
    var taking;
    var callbackLock = false;
    xhr.upload.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
            var nowDate = new Date().getTime();
            taking = nowDate - startDate;
            var x = (evt.loaded) / 1024;
            var y = taking / 1000;
            var uploadSpeed = (x / y);
            var formatSpeed;
            if (uploadSpeed > 1024) {
                formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
            } else {
                formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
            }
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            callbacks["progress"]&&callbacks["progress"](formatSpeed,percentComplete);
        }
    }, false);

    xhr.onreadystatechange = (function(lock){
    	return function(response) {
	    	if (lock===false){
	    		if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
	    			lock = true;
		            var blkRet = JSON.parse(xhr.responseText);
		            callbacks["success"]&&callbacks["success"](blkRet);
		        } else if (xhr.status != 200 && xhr.responseText) {
	    			lock = true;
		        	callbacks["error"]&&callbacks["error"](xhr.responseText);
		        }
	    	}
	    };
    })(callbackLock);
    xhr.send(formData);
    startDate = new Date().getTime();
};

var QiniuImageUpload = React.createClass({
	getInitialState: function () {
	    return {
	        previewImageShow:false,
	        updatePic:0,
	        isPicUploading:false,
	    };
	},
	render:function(){
		var previewImageShow = this.state.previewImageShow&&(this.props.mode === undefined||this.props.mode==="dialog"||this.props.mode==="iseditpic")?"":"hide";
		var progressHide = this.state.isPicUploading?"":"hide";
		var uploadContent = (
			<div>
				<div className="row">
					Select Upload File:
					<input ref="uploadSelector" type="file" onChange={this.previewImage} />
				</div>
				<div className={"row padding10px "+previewImageShow}>
					<img ref="previewImage" src="" width="100%" />
				</div>
				<div className={"row "+progressHide}>
					<progress max="100" style={{width:"100%"}} value={this.state.uploadPercent}></progress>
				</div>
				<div>
					<button type="button" onClick={this.doImageUpload} className="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Do Upload</button>
				</div>
			</div>
		);
		if(this.props.mode !== undefined&&this.props.mode!=="dialog"){
			return uploadContent;
		}else{
			return (
				<ModalDialog title="Image Upload" ref="imageUploader" modalHideHandler={this._onModalHideHandler}>
					{uploadContent}		
				</ModalDialog>
			)	
		}
	},
	previewImage:function(e){
		var oFReader = new FileReader();
        oFReader.readAsDataURL(e.target.files[0]);

        oFReader.onload = function (oFREvent) {
        	React.findDOMNode(this.refs.previewImage).src = oFREvent.target.result;
        	this.setState({previewImageShow:true});
        }.bind(this);
	},
	doImageUpload:function(){
		this.props.uploadToken().then(function(data){
			var token = data;
			Qiniu_upload(React.findDOMNode(this.self.refs.uploadSelector).files[0],token,null,{
				success:function(data){
					this.self.setState({isPicUploading:false},function(){
						this.props.onUploadSuccessHandler&&this.props.onUploadSuccessHandler(data);
					}.bind(this.self));
				}.bind({self:this.self}),
				progress:function(speed,percentComplete){
					this.self.setState({uploadPercent:percentComplete});
				}.bind({self:this.self}),
				error:function(reason){
					$.toaster({ priority : 'danger', title : '', message : 'Image Upload Error,reason:'+reason});
				}
			});
			this.self.props.onTokenGotHandler&&this.self.props.onTokenGotHandler();
			this.self.setState({isPicUploading:true})
		}.bind({self:this}),function(){
			$.toaster({ priority : 'danger', title : '', message : 'Error get upload token'});
		})
		$.toaster({ priority : 'success', title : '', message : 'Start uploading image!'});
	},
	_onModalHideHandler:function(e){
		if(this.state.isPicUploading){
			e.preventDefault();
			$.toaster({ priority : 'warning', title : '', message : 'Image is uploading,Please wait!'});
			return false;
		}
		this.props.onModalHide&&this.props.onModalHide();
	},
	show:function(){
		this.refs.imageUploader&&this.refs.imageUploader.show();
	},
	hide:function(){
		this.refs.imageUploader&&this.refs.imageUploader.hide();
	}
})

module.exports = QiniuImageUpload;
