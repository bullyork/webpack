import URLMaker from './urlmaker.js'
import React,{Component} from 'react'; 
import backendmodules from "./backendmodules.js"
import Userservice from "./User.js";

class Header extends Component{
    
    render(){
        return (
            <div className="navbar navbar-default" style={{position:"absolute",width:"100%",height:"45px",top:"0",left:"0"}}>
                <div className="navbar-container" id="navbar-container">
                    <button type="button" className="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
                        <span className="sr-only">Toggle sidebar</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="navbar-header pull-left">
                        <a href="#" className="navbar-brand">
                            <small>
                                <i className="fa fa-leaf"></i>
                                EZBuy Admin
                            </small>
                        </a>
                    </div>
                    <div className="navbar-buttons navbar-header pull-right" role="navigation">
                        <ul className="nav ace-nav">
                            <li className="light-blue">
                                <a data-toggle="dropdown" href="#" className="dropdown-toggle">
                                    <img className="nav-user-photo" src="assets/avatars/user.jpg" alt="Jason's Photo" />
                                    <span className="user-info">
                                        <small>Welcome,</small>
                                    </span>
                                    <i className="ace-icon fa fa-caret-down"></i>
                                </a>
                                <ul className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                    <li>
                                        <a href="index.html#/changePassword">
                                            <i className="ace-icon fa fa-user"></i> Change Password
                                        </a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a onClick={this.onUserLogoutHandler}>
                                            <i className="ace-icon fa fa-power-off"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    onUserLogoutHandler(){
        Userservice.logout().then((data)=>{
            //sessionStorage.removeItem("loginInfo");
        });
        //不管成功失败，都删除
        sessionStorage.removeItem("loginInfo");
        location.href = "login.html";
    }
}

const generateCurrentFile = ()=>{
    return location.pathname.substring(location.pathname.lastIndexOf("/")+1)+location.hash;
}

var currentfile = generateCurrentFile();

export class Sidebar extends Component{
    static change(visible){
        console.log(this);
    }
    constructor(props){
        super(props)
        this.state = {
            visible: props.visible || true
        }
    }
    render(){
        const {visible} = this.state;

        return (
            <div className={"sidebar responsive" + (!visible ? " menu-min" : "")}>
                <ul className="nav nav-list">
                    {this.renderMenu(backendmodules, this.ii = 0)}
                </ul>
                <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                    <i onClick={()=>{
                        this.setState({
                            visible:!visible
                        });
                        return false;
                    }} className={"ace-icon fa fa-angle-double-" + (!visible ? 'left' : 'right')} data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
                </div>
            </div>
        )
    }
    renderMenu(menu, ii){
        return menu.map(function(item, idx){
            return this.renderMenuItem(item, ii, idx);
        },this);
    }
    renderMenuItem(item, ii, idx){
        item.icon = item.icon || 'desktop';
        var isHidder = "hide";
        let activeClass = this.checkMenuItemActiveState(item)?" active ":"";
        for(var i=0;i<this.props.systems.length;i++){
            if(this.props.systems[i] === "admin"){
                isHidder = "";
                break;
            }
            if(item.system){
                if(this.props.systems[i].toLowerCase() === item.system.toLowerCase()){
                    isHidder = "";
                    break;
                }
                if(item.system === "All"){
                    isHidder = "";
                    break;
                }
            }
        }
        if(item.submenu !== undefined){
            var isAdmin = false;
            for (var i = 0; i < this.props.systems.length; i++) {
                if(this.props.systems[i] == 'admin'){
                    isAdmin = true
                }
            }
            var flag = checkSubmenuPerimmison(item.submenu, this.props.systems) || isAdmin
            if(flag){
                return (
                    <li key={idx} className={activeClass}>
                        <a href="javascript:void(0)" className="dropdown-toggle">
                            <i className={"menu-icon fa fa-" + item.icon}></i>
                            <span className="menu-text">{item.name}</span>
                            <b className="arrow fa fa-angle-down"></b>
                        </a>
                        <b className="arrow"></b>
                        <ul key={ii} className="submenu">
                            {this.renderMenu(item.submenu, this.ii++)}
                        </ul>
                    </li>
                )
            }
        }
        return (
            <li key={idx} className={activeClass+isHidder}>
                <a href={item.href}>
                    <i className={"menu-icon fa fa-" + item.icon}></i>
                    <span className="menu-text"> {item.name} </span>
                </a>
                <b className="arrow"></b>
            </li>
        );
    }
    checkMenuItemActiveState(item){
        if(item.submenu !== undefined){
            let result = false;
            for(let subMenuItem of item.submenu){
                result = this.checkMenuItemActiveState(subMenuItem)
                if(result === true){
                    return true;   
                }
            }
        }else{
            if(item.activeRegex){
                return item.activeRegex.test(currentfile);
            }
            return item.href === currentfile || (currentfile === ""&&item.href === "index.html");   
        }
        return false;
    }


  componentDidMount(){
    this.hashChange = ()=>{
      currentfile = generateCurrentFile();
      this.forceUpdate();
    };
    window.addEventListener("hashchange",this.hashChange)
  }

  componentWillUnmount(){
    window.removeEventListener("hashchange",this.hashChange);
  }
}

class BreadCrumbs extends Component{
    render(){
        let breads = this.state.breadCrumbs.map((item,idx)=>{
            if(this.state.breadCrumbs.length === idx+1){
                return (
                    <li>{item.name}</li>
                )
            }
            return (
                <li><a href={item.href}>{item.name}</a></li>
            )
        },this);
        return (
            <div className="breadcrumbs">
                <ul className="breadcrumb">
                    <li>
                        <i className="ace-icon fa fa-home home-icon"></i>
                        <a href={URLMaker.home()}>Home</a>
                    </li>
                    {breads}
                </ul>
            </div>
        )
    }
}

module.exports = {
    Header:Header,
    Sidebar:Sidebar
}
//判断submenu项目，用户是否有权限
function checkSubmenuPerimmison(a, b){
    var flag = false;
    for (var i = 0; i < a.length; i++) {
        if(!a[i].hasOwnProperty('system')){
            return
        }
        for (var j = 0; j < b.length; j++) {
            if(a[i].system == b[j]){
                flag = true
            }
        }
    }
    return flag
}
