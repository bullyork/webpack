import React,{Component} from "react"
import bulmaStore from "./../../store/bulma.js"
import {savePage,publishPage,showImportExcelDialog,hideImportExcelDialog,excelFileImported,removePage,changeCountryCode} from "./../../action/bulma.js"
import { Modal, Button,Upload,Icon,message } from 'antd';
import CountrySelector from "./../../common/CountrySelector.jsx";
import {connect} from "react-redux";

@connect((state)=>({countryCode:state.country}))
class Toolbar extends Component{
	constructor(props){
		super(props);
		["onSaveHandler","onPublishHandler"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		const {props} = this;
		const {dispatch} = props;
		let linkToPreview = props.slug === null ? "javascript:void(0)" : `/BulmaPage/Preview/${props.countryCode}/${props.platform}/${props.slug}`;
		let linkToExportData = props.slug === null ? "javascript:void(0)" : `/api/BulmaPage/ParsePage?slug=${props.slug}&platForm=${props.platform}&countryCode=${props.countryCode}`;

		return (
			<div className="toolbarWrapper">
				<div className="countrySelectorWrapper">
					<CountrySelector onChange={(value)=>{dispatch(changeCountryCode(value))}} value={props.countryCode} />
				</div>
				<div className="tollbarbtn delete" onClick={()=>{confirm("Are you sure delete this?") && props.slug !== null && dispatch(removePage(props.slug,props.platform))}}>
					Delete Page
				</div>
				<div className="tollbarbtn" onClick={this.onSaveHandler}>
					Save
				</div>
				<div className="tollbarbtn">
					<a href={linkToPreview} target="_blank">Preview</a>
				</div>
				<div className="tollbarbtn" onClick={this.onPublishHandler}>
					Publish
				</div>
				<div className="excelButtons">
					<a href={linkToExportData} className="export excelButton">Export content Template</a>
					<a href="javascript:void(0)" className="import excelButton" onClick={()=>{dispatch(showImportExcelDialog())}}>Import Content</a>
				</div>
				<ExcelUploadDialog visible={props.importExcelDialogDisplayState} slug={props.slug} />
			</div>
		)
	}

	onPublishHandler(){
		const {dispatch,platform,countryCode,slug} = this.props;
		dispatch(publishPage(platform)).then((flag)=>{
			if(flag === true){
				let url = genPublishAddress(slug,countryCode);
				if(platform === "Mobile"){
					url = genPublishAddressMobile(slug,countryCode);
				}
				window.open(url);
			}
		})
	}

	onSaveHandler(){
		this.props.dispatch(savePage()).then((flag)=>{
			if(flag === true){
				message.success(`保存成功.`);
			}else{
				message.error(`保存失败.`);
			}
		});
	}
}

var genPublishAddress = function(slug,countryCode){
	if(location.hostname.indexOf("65daigou.com") !== -1){
		switch(countryCode){
			case "AU":
			case "ID":
				return `https://${countryCode.toLowerCase()}.ezbuy.com/Promotion/${slug}.html`;
			case "TH":
				return `https://ezbuy.co.th/Promotion/${slug}.html`;
			default:
				return `https://ezbuy.${countryCode.toLowerCase()}/Promotion/${slug}.html`;
		}
	}else{
		return `//${countryCode.toLowerCase()}.65emall.net/Promotion/${slug}.html`;
	}
}

var genPublishAddressMobile = function(slug,countryCode){
	if(location.hostname.indexOf("65daigou.com") !== -1){
		return `https://m.ezbuy.${countryCode.toLowerCase()}/PromotionMobile/${slug}`
	}else{
		return `https://m.ezbuy.${countryCode.toLowerCase()}/PromotionMobile/${slug}`;
	}
}

export default Toolbar;


@connect((state)=>({countryCode:state.country,platform:state.platform}))
class ExcelUploadDialog extends Component{
	render(){
		var self = this;
		const fileUploadProps = {
			"action":"/api/BulmaPage/ImportPage",
			"accept":"*.xlsx,*.xls",
			"multiple":false,
			onChange(info) {
				if (info.file.status === 'done') {
					if(info.file.response.code === 0){
						Modal.success({
							title: '上传成功',
							content: `${info.file.name} 上传成功。`
						});
						bulmaStore.dispatch(excelFileImported(self.props.platform));
					}else{
						Modal.error({
							title: '上传失败',
							content: `${info.file.response.message}`
						});
					}
				}else if(info.file.status === "error"){
					message.error(`${info.file.name} 上传失败。`);
				}
		  	}
		}
		const {props} = this;
		return (
			<Modal title="Import Excel" visible={this.props.visible} 
				onOk={()=>{bulmaStore.dispatch(hideImportExcelDialog())}}
				onCancel={()=>{bulmaStore.dispatch(hideImportExcelDialog())}}>
	          <p>Please choose a files</p>
	          <Upload {...fileUploadProps} data={{slug:props.slug,platForm:props.platform,countryCode:props.countryCode}}>
	          	<Button type="ghost">
			      <Icon type="upload" /> Click to choose file
			    </Button>
	          </Upload>
	        </Modal>
		)
	}
}