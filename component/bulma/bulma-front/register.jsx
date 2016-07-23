import React,{Component} from "react"
import $ from "jquery"
import Account from './services/account.js';

require("../../../asset/css/register.css");

var iconImg_google = require("../../../asset/images/register/google.png");
var iconImg_facebook = require("../../../asset/images/register/facebook.png");
var login_logo = require("../../../asset/images/icons/logo_register.png");

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
    key = "1658276937768799";
    domain = "https://ezbuy.sg/";
  }

  if(currentCountryCode === "MY"){
    key = "1566758586970007";
    domain = "http://my.ezbuy.com/";
  }

  window.location.href = `https://www.facebook.com/dialog/oauth?response_type=token&display=page&client_id=${key}&redirect_uri=${domain}/Account/FaceBookBinding&scope=email`;
  return false;
}

export default class Register extends Component {
  constructor(props){
    super(props)

    this.state = {
      email:true,
      username: true,
      password: true,
      server: true
    };

  }
  render() {
    const {bgImage, linkAddress} = this.props;
    const {email, username, password, server, emailInfo, usernameInfo, passwordInfo, serverInfo} = this.state;
    let pageTitle = "";
    if(this.props.loginTyle === undefined){
      pageTitle = (
        <h2>Register</h2>
        )
    }else {
      pageTitle= (
        <img src={login_logo} width="160px" className="login_logo"/>
        );
    }
    return (
      <section className="bulma-register _pc">
        <div className="register-bg">
          <a href={linkAddress && linkAddress !== '' ? linkAddress : 'javascript:void(0);'}>
            <img src={bgImage} alt=""/>
          </a>
        </div>
        <div className="_inner">
          <div className="module-register-input _pc">
            {pageTitle}
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
                Have an Account? <a href="/Account/Login">Sign In</a>
              </div>

              <div className={"info " +  (server ? '' : 'sh')}>
                {serverInfo}
              </div>
            </div>

            <div className="line line-other">
              <div className="tt-hr">
                <hr/>
                <span>
                  Sign in with
                </span>
              </div>
              <div className="others">
                <a ref="googleLogin" className="other-item google"> <span className="la"><i className="icon" style={{backgroundImage:`url(${iconImg_google})`}}></i></span><span>Google</span></a>
                <a onClick={facebookLogin} className="other-item facebook"> <span className="la"><i className="icon" style={{backgroundImage:`url(${iconImg_facebook})`}}></i></span><span>Facebook</span></a>
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
      platform:"Website"
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
          window.location.href = '/Account/RegisterWelcome';
        }
    })
  }

  googleLogin(){
      var googleScript = document.createElement('script');
      googleScript.src="https://apis.google.com/js/platform.js?onload=__renderButton";
      document.head.appendChild(googleScript);
      var googleButton = this.refs.googleLogin;

      var googleUser = {};
      var startApp = function () {
          gapi.load('auth2', function () {
              var auth2 = gapi.auth2.init({
                  client_id: '174680109644-79410s8ufm6v28cma3n9r8c3e2gjo208.apps.googleusercontent.com',
                  scope: 'profile email'
              });
              auth2.attachClickHandler(googleButton, {}, onSignIn, function (error) {

              });
          });
      };
      function onSignIn(googleUser) {
          var profile = googleUser.getBasicProfile();
          var email = profile.getEmail();
          var id_token = googleUser.getAuthResponse().id_token;
          var registerUrl = "/Account/GooglePlusRegister?txtEmail=" + encodeURI(email) + " &utm_nooverride=1&facebook_token=" + id_token;
          var loginUrl = "/Account/GooglePlugLogin?txtEmail=" + encodeURI(email) + " &utm_nooverride=1&facebook_token=" + id_token;
          $.get("/Account/GetCustomerIdByGooglePlusEmail", { email: email }).then(function (customerId) {
              if (customerId != "0") {
                  window.location.href = "/Account/RedirectToLogin?type=google&customerId=" + customerId;
              } else {
                  if (email != undefined && email != 'undefined') {
                      $.post("/Account/GetCustomerByEmail", { type: 'google', email: email, token: id_token }, function (result) {
                          if (result.SerializedData != null && result.SerializedData != 'null') {
                              var data = eval('(' + result.SerializedData + ')');
                              if (data.CustomerId > 0) {
                                  if (result.Message != undefined && result.Message != '' && result.Message != null && result.Message != 'null') {
                                      window.location.href = "/Account/RedirectToLogin?type=google&customerId=" + result.Message;
                                  } else
                                      window.location.href = loginUrl;
                              } else {
                                  window.location.href = registerUrl;
                              }
                          } else {
                              window.location.href = registerUrl;
                          }
                      });
                  }
              }
          });
      };
      function __renderButton() {
          startApp();
      }

      window['__renderButton'] = __renderButton;
  }

  componentDidMount(){
    this.googleLogin();
  }
}