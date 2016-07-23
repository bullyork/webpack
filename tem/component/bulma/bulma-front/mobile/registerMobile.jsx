import React,{Component} from "react"
import $ from "jquery"
import Account from './../services/account.js';
import UserService from "./../services/jsonrpc/UserService.js";

require("../../../../asset/css/mobile/register.css");

var iconImg_google = require("../../../../asset/images/register/google.png");
var iconImg_facebook = require("../../../../asset/images/register/facebook.png");

var register_error = {
  "register_enter_emailadd": "Please enter email address",
  "register_enter_erremail": "Email address incorrect, please re-enter",
  "register_enter_password": "Please enter password",
  "register_enter_confirmpwd": "Please enter confirm password",
  "register_enter_noesamepwd": "Please make sure the password is the same to the confirm password",
  "register_enter_nickname": "Please enter user id",
  "register_hp_phone": "Please enter HP Phone",
  "register_ph_phone_err": "Please enter a valid handphone number",
  "register_err_userid": "User ID has to be started with letter, 6-16 digits, special symbols are not allowed except for \"_\",\"-\",\".\" ",
  "register_password_err_for": "Password should between 6 ~ 20 characters(no spaces).",
  "How_To_Know_Us_Error_MY": "Please choose how to know us!",
  "register_valid_code":"Please input 6 digits valid code"
};

function valid_email(email) {
  var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
  return patten.test(email);
}

function valid_userid(userid) {
  var patten = new RegExp("^[a-zA-Z][a-zA-Z0-9_\.-]{5,16}$");
  return patten.test(userid);
}

function valid_telephone(telephone) {
  var _telephone =  telephone.replace(/-/g,"");
  var patten = /^[8-9]\d{7}$/;

  if (currentCountryCode === "MY") {
    patten = /^60[1-9]\d\d{7,8}$/;
  }
  return patten.test(_telephone);
}

function valid_password(pwd){
  var rule = /^[A-Za-z0-9]{6,20}$/;
  return rule.test(pwd);
}


function facebookLogin(){
  var key, domain;

  if(currentCountryCode === "SG"){
    key = "114182155288016";
    domain = "http://marketing.ezbuy.sg/";
  }

  window.location.href = `https://www.facebook.com/dialog/oauth?response_type=token&display=page&client_id=${key}&redirect_uri=${domain}`;
  return false;
}

export default class Register extends Component {
  constructor(props){
    super(props)

    this.state = {
      email:true,
      username: true,
      password: true,
      server: true,
      client_id:114182155288016,
    };

  }
  render() {
    const {bgImage, linkAddress} = this.props;
    const {email, username, password, server, emailInfo, usernameInfo, passwordInfo, serverInfo} = this.state;

    return (
      <section className="bulma-register">
        <div className="_inner">
          <div className="module-register-input">
            <h2>Register</h2>
            <div className="line">
              <input type="text" onFocus={this.focusEmail.bind(this)} ref="email" placeholder="Email"/>
              <div className={"info " +  (email ? '' : 'sh')}>{emailInfo}</div>
            </div>
            <div className="line">
              <input type="text" onFocus={this.focusUsername.bind(this)} ref="username"  placeholder="User ID"/>
              <div className={"info " +  (username ? '' : 'sh')}>{usernameInfo}</div>
            </div>
            <div className="line">
              <input type="password" onFocus={this.focusPassword.bind(this)} ref="password"  placeholder="Password"/>
              <div className={"info " +  (password ? '' : 'sh')}>{passwordInfo}</div>
            </div>

            <div className="line">
              <button onClick={this.register.bind(this)}>Ready to Buy!</button>
              <div className="sub-line">
                Have an Account? <a href="http://m.ezbuy.sg/customer.html#customer/login">Sign In</a>
              </div>

              <div className={"info " +  (server ? '' : 'sh')}>
                {serverInfo}
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
 
  focusEmail(){
    const {email} = this.refs;
    this.setState({
      email:true,
      server:true
    });
  }
  focusUsername(){
    this.setState({
      username:true,
      server:true
    })
  }
  focusPassword(){
    this.setState({
      password:true,
      server:true
    })
  }
  register(){
    var _this = this;
    var {email, username, password} = this.refs;

    var AccountData = {
      area:currentCountryCode || "SG",
      email:email.value,
      password:password.value,
      userName:username.value,
      platform:"MobileWeb"
    };

    if(email.value.trim() === ""){
      this.setState({
        email:false,
        emailInfo: register_error.register_enter_emailadd
      });
      return;
    }else if(!valid_email(email.value.trim())){
      this.setState({
        email:false,
        emailInfo: register_error.register_enter_erremail
      });
      return;
    }

    if(username.value.trim() === ""){
      this.setState({
        username:false,
        usernameInfo: register_error.register_enter_nickname
      });
      return;
    }else if(!valid_userid(username.value.trim())){
      this.setState({
        username:false,
        usernameInfo: register_error.register_err_userid
      });
      return;
    }

    if(password.value.trim() === ""){
      this.setState({
        password:false,
        passwordInfo: register_error.register_enter_password
      });
      return;
    }else if(!valid_password(password.value.trim())){
      this.setState({
        password:false,
        passwordInfo: register_error.register_password_err_for
      });
      return;
    }

    Account.Register(AccountData).then(function(data){
        var _data = JSON.parse(data);

        var ok = false;
        if(!_data.errorCode){
          ok = true;
        }else{
          _this.setState({
            server:false,
            serverInfo:_data.errorMessage
          });
          return;
        }
        if(ok){
          UserService.Login(AccountData.userName,AccountData.password).then(function(){
                if(location.hostname.indexOf("marketing.ezbuy") !== -1){
                  var newUsermessge = {
                    "nickName":AccountData.userName,
                    "email":AccountData.email
                  }
                  sessionStorage.setItem("//dpns.65daigou.com/sg.ashxuserinfo",JSON.stringify(newUsermessge));
                  window.location.href = `//marketing.ezbuy.sg/mobile.html`;
                }else if(location.hostname.indexOf("m.ezbuy") !== -1){
                  var newUsermessge = {
                    "nickName":AccountData.userName,
                    "email":AccountData.email
                  }
                  sessionStorage.setItem("//dpns.65daigou.com/sg.ashxuserinfo",JSON.stringify(newUsermessge));
                  window.location.href = `//m.ezbuy.sg/`;
                }
            })
        }
    })
  }
  componentWillMount(){
    $("#appContainerNew").css("background-color","");
    $("body").css("background-image","url("+this.props.bgImage+")")
  }
  componentDidMount(){

  }
}