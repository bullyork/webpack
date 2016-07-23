import FormDataChangeMixin from "../mixins/FormDataChangeMixin.jsx"
import URLMaker from "../common/urlmaker.js"
import React,{Component} from 'react';
import ReactDOM from "react-dom"
import Userservice from '../models/User.js';
import utilObj from '../common/util.js';

class LoginPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
        	formData:{
        		loginId:"",
        		password:"",
        	}
        };
    }
    render() {
        return (
			<div className="main-container">
				<div className="main-content">
					<div className="row">
						<div className="col-sm-10 col-sm-offset-1">
							<div className="login-container">
								<div className="center">
									<h1>
										<span className="blue">EZBuy Admin</span>
									</h1>
								</div>
								<div className="space-6"></div>
								<div className="position-relative">
									<div id="login-box" className="login-box visible widget-box no-border">
										<div className="widget-body">
											<div className="widget-main">
												<h4 className="header blue lighter bigger">
													<i className="ace-icon fa fa-coffee green"></i>
													Login
												</h4>
												<div className="space-6"></div>
												<form>
													<fieldset>
														<label className="block clearfix">
															<span className="block input-icon input-icon-right">
																<input onKeyDown={this.enterEvent.bind(this)} type="text" name="loginId" className="form-control" onChange={this.changeInput("loginId")}/>
																<i className="ace-icon fa fa-user"></i>
															</span>
														</label>
														<label className="block clearfix">
															<span className="block input-icon input-icon-right">
																<input onKeyDown={this.enterEvent.bind(this)} type="password" name="password" className="form-control" onChange={this.changeInput("password")}/>
																<i className="ace-icon fa fa-lock"></i>
															</span>
														</label>
														<div className="space"></div>
														<button type="button" className="width-100 btn btn-sm btn-primary" onClick={()=>this.onLoginHandler()}>
															<i className="ace-icon fa fa-key"></i>
															<span className="bigger-110">Login Or InputEnter</span>
														</button>
														<div className="space-4"></div>
													</fieldset>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
  }

  enterEvent(eve){
  	if(eve.keyCode === 13){
  		this.onLoginHandler();
  	}
  }
    componentWillMount(){
		document.body.className = "login-layout light-login";
	}
	changeInput(key) {
		var self = this;
		return function(e){
			let value = e.currentTarget.value;
			let newform = self.state.formData;
			newform[key] = value;
			self.setState({formData:newform});
		}
	}
	onLoginHandler(){
		let loginInfo = {
			userName : this.state.formData.loginId,
			lever : "admin",
			isLogin: true,
		};
		Userservice.Login(this.state.formData.loginId.toLowerCase(),this.state.formData.password).then((data)=>{
			if(data.code === 0) {
				$.toaster({ priority : 'success', title : '', message : 'login success!'});
				utilObj.setSessionStorage(data.data);
				location.href = URLMaker.home();
			}else if(data.code === 1){
				sessionStorage.removeItem("loginInfo");
				$.toaster({ priority : 'danger', title : '', message : data.msg});
			}else{
				sessionStorage.removeItem("loginInfo");
				$.toaster({ priority : 'danger', title : '', message : data.msg});
			}
		})
	}
}

ReactDOM.render(<LoginPanel />, document.getElementById("appContainer"));

