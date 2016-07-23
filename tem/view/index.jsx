import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, Link } from 'react-router';
import { Form, Input, Button, Checkbox } from 'antd';
import UserService from "../models/User.js"
import URLMaker from "../common/urlmaker.js"

class Welcome extends React.Component {
	render(){
		return (
			<div>
                Welcome to product backend!
            </div>
			)
	}
}

class ChangePass extends React.Component {
	 constructor(props){
        super(props);
        this.state = {
        	formData:{
        		loginId:"",
        		password:"",
        		repassword:"",
        	}
        };
    }
	changePassword() {
    	UserService.changePassword(this.state.formData.loginId,this.state.formData.password,this.state.formData.repassword).then((logoutData)=>{
				if(confirm("password change and you need to login!")){
	                location.href = URLMaker.login();
    				sessionStorage.removeItem("loginInfo");
	            }else{
	                location.href = URLMaker.login();
    				sessionStorage.removeItem("loginInfo");
	            }
			})
  	}
  	changevalue(key,context) {
  		return function(e){
			let newformData = context.state.formData
			newformData[key] = e.currentTarget.value;
			context.setState({formData:newformData});
  		}
  	}
	render() {
		return (
			<div style={{width:"100%",height:"100%",padding:"50px 0 10px 0"}}>
		        <div style={{display:"relative",textAlign:"center"}}>
			        <span style={{marginRight:"30px"}}>ID:  </span>
			        <input type="text" value={this.state.formData.loginId} onChange={this.changevalue("loginId",this)}/>
		        </div>
		        <br></br>
		        <div style={{display:"relative",textAlign:"center"}}>
			        <span style={{marginRight:"30px"}}>PASSWORD: </span>
			        <input type="text" value={this.state.formData.password} onChange={this.changevalue("password",this)}/>
		        </div>
		        <br></br>
		        <div style={{display:"relative",textAlign:"center"}}>
			        <span style={{marginRight:"30px"}}>RE PASSWORD:  </span>
			        <input type="text" value={this.state.formData.repassword} onChange={this.changevalue("repassword",this)}/>
		        </div>
		  		<br></br>
		  		<div style={{display:"relative",textAlign:"center"}}>
		  		<Button type="primary" onClick={()=>this.changePassword()}>Confirm</Button>
		  		</div>
			</div>
			)
	}
}


class App extends React.Component{
    render(){
        return (
            <div>
                <Router>
                    <Route path="/" component={Welcome}></Route>
                    <Route path="/changePassword" component={ChangePass}></Route>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<AppWrapper><App /></AppWrapper>, document.getElementById("appContainer"));
