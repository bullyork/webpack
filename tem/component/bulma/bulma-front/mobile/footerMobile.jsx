import React,{Component} from "react"
import $ from "jquery"

require("../../../../asset/css/mobile/footerMobile.css");
export default class FooterMobile extends Component{
	render(){
		let linkAddress = this.props.linkAddress === ""? "javascript:void(0)" : this.props.linkAddress;
		return (
			<div className="footer-support-box">
				<div className="footerMobile">
					<a href={linkAddress}>
						Register now to view more
					</a>
				</div>
			</div>
		)
	}
	componentDidMount(){
		$("body").css("padding-bottom","0.72rem");
	}
}

