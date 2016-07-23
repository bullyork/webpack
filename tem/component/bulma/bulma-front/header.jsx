import React,{Component} from "react"


require("../../../asset/css/header.css");
var logo_ezbuy = require("../../../asset/images/icons/logo_ezbuy.png");
export default class HeaderMobile extends Component{
	render(){
		let linkAddress = this.props.linkAddress === ""? "javascript:void(0)" : this.props.linkAddress;
		return (
			<div style={{width: "100%",height:"1.72rem"}}>
				<header className="headerMobile">
					<div className="container">
						<div className="navbar-header">
							<div className="navbar-toggle">
								<img src={logo_ezbuy} />
							</div>
							<button className="navbar-toggle-right" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>
						<div className="register-button">
							<a href={linkAddress} className="m-top-xs block btn btn-warning font-lg">Register</a>
						</div>
					</div>
				</header>
			</div>
		)
	}
}

