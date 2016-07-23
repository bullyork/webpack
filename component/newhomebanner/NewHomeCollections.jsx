import React,{Component} from "react"
import {Row,Col,Button,message,Icon} from "antd"
import {connect,Provider} from "react-redux"
import { Image,CountrySelector,StringArrayInput } from "./../../common";
import {changeCountry} from "./../../action/country.js"
import {loadCollections,saveHomeCollections} from "./actions/newhomebanner.js"


@connect((state)=>({countryCode:state.country,collections:state.collections}))
class NewHomeCollections extends Component{

	constructor(props){
		super(props);

		["onSaveHandler"].forEach((methodName)=>{
			this[methodName] = this[methodName].bind(this);
		})
	}

	render(){
		const {collections,dispatch} = this.props;
		let normalCollection = collections.find(oneCollectionList=>!oneCollectionList.isPrime);
		let primeCollection = collections.find(oneCollectionList=>oneCollectionList.isPrime);
		let normalCollectionList = typeof normalCollection !== "undefined"?normalCollection.showTrending:[];
		let primeCollectionList = typeof primeCollection !== "undefined"?primeCollection.showTrending:[];

		return (
			<div>
				<Row style={{marginBottom:"10px"}}>
					<Col span="4">
						请选择国家：
					</Col>
					<Col span="8">
						<CountrySelector value={this.props.countryCode} onChange={(value)=>{dispatch(changeCountry(value));dispatch(loadCollections());}} />
					</Col>
				</Row>
				<Row>
					<Col span="4">
						普通Collection Id：
					</Col>
					<Col span="16">
						<StringArrayInput ref="normalCollectionsInput" value={normalCollectionList} />
					</Col>
				</Row>
				<Row>
					<Col span="4">
						Prime Collection Id：
					</Col>
					<Col span="16">
						<StringArrayInput ref="primeCollectionsInput" value={primeCollectionList} />
					</Col>
				</Row>
				<Row>
					<Col span="4">
						<Button type="primary" icon="cloud-upload-o" onClick={this.onSaveHandler}>保存</Button>
					</Col>
				</Row>
			</div>
		)
	}
	componentDidMount(){
		this.props.dispatch(loadCollections());
	}

	onSaveHandler(){
		this.props.dispatch(saveHomeCollections(this.refs.primeCollectionsInput.getData(),this.refs.normalCollectionsInput.getData())).then((flag)=>{
			if(flag){
				message.success("更新成功.");
			}else{
				message.error("更新失败.");
			}
		});
	}
}

export default NewHomeCollections