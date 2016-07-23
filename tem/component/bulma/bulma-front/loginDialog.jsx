import React,{Component} from "react"
import {connect} from "react-redux"
// import {loginStateAction} from "./../actions/login.js"
require("../../../asset/css/loginDialog.css");
import $ from "jquery"


import Register from "./register.jsx"
var logo_close = require("../../../asset/images/icons/login_close.png");

@connect(state=>({login:state.login}))
export default class LoginDialog extends Component{
	render(){
		if(location.hostname.indexOf("65daigou.com") !== -1 || location.hostname.indexOf("65emall.net") !== -1 || location.hostname.indexOf("localhost") !== -1){
			return (
				<img src="../../asset/images/LoginDialog.png" width="388px" height="288px" />
				)
		}
		// if(this.props.login.loginState === false){
		// 	return (
		// 		<div className="hide"></div>
		// 		)
		// }
		let picture = this.props.picture;
		return (
			<div className={"bannerHeightAllScreen"}>
				<div className="loginDialog">
					<img src={logo_close} className="login_hide_button" onClick={this.hideDialog.bind(this)} />
					<Register loginTyle={true} />
					<img src={picture} className="logo_right_img" />
				</div>
			</div>
		)
	}
	hideDialog(){
		this.props.dispatch(loginStateAction(false));
	}
	componentDidMount(){
		$("body,html").css({"overflow":"hidden"});
	}
	componentDidUpdate(){
		$("body,html").css({"overflow":"auto"});
	}
}