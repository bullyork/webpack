import React,{Component} from "react"
import {connect} from "react-redux"
import {loadBaseUrlIfNeed} from "./../action/qiniu.js"


@connect(state=>({baseurl:state.qiniu.qiniuBaseUrl}))
class Image extends Component{

	constructor(props){
		super(props);

		this.genImageSource = this.genImageSource.bind(this);
	}

	render(){
		let props = Object.assign({},{},{
			onClick:this.props.onClick,
			style:this.props.style,
			className:this.props.className,
			width:this.props.width,
			height:this.props.height,
		})

		return (
			<img {...props} {...this.genImageSource()} />
		)
	}

	genImageSource(){
		if(this.props.src !== null || typeof this.props.src !== "undefined"){
			if(!/^(?:https?\:)\/\//.test(this.props.src)){
				if(this.props.baseurl !== null){
					return {src:`${this.props.baseurl}${this.props.src}${typeof this.props.params !== "undefined"?`?${this.props.params}`:""}`};
				}
			}else{
				return {src:this.props.src};	
			}
		}
		return {};
	}

	componentDidMount(){
		this.props.dispatch(loadBaseUrlIfNeed());
	}

}

export default Image