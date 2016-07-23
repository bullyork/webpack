import React,{Component} from 'react';
import {Header,Sidebar,BreadCrumbs} from "./webframe.jsx";
import Util from "./util.js";
import URLMaker from "./urlmaker.js"
import "../less/style.less"
import backendmodules from "./backendmodules.js";

const getViewPageSystemName = (function(){
    let viewPage2SystemName = {};
    return function(viewPaged){
        if("index.html".indexOf(viewPaged) !== -1){
            return "app";
        }else if(typeof viewPage2SystemName[viewPaged] === "undefined"){
            let systemName = findSystemNameByBackendModules(viewPaged,backendmodules);
            if(systemName!== null){
                viewPage2SystemName[viewPaged] = systemName;
            }
        }
        return viewPage2SystemName[viewPaged];
    }
})()

const findSystemNameByBackendModules = function(viewPaged,modules){
    for(let i=0;i<modules.length;i++){
        let oneModule = modules[i];
        if(typeof oneModule.submenu !== "undefined"){
            let systemName = findSystemNameByBackendModules(viewPaged,oneModule.submenu);
            if(systemName !== null){
                return systemName;
            }
        }else if(oneModule.href.indexOf(viewPaged) !== -1){
            return oneModule.system;
        }
    }
    return null;
}

export default class extends Component {
    constructor(props){
        super(props);
        let user = Util.getSessionStorage("userinfo", null);
        if (user === null) {
            user = {
                systems:[],
            };
        }
        this.state = user;
    }
    render() {
        if(this.state.username === undefined){
            location.href = URLMaker.login();
            return;
        }
        let pageName = getViewPageSystemName(location.pathname.replace("/",""));
        let flag = false;
        if(typeof pageName !== "undefined"){
            pageName = pageName.toLowerCase();
        }
        this.state.systems.map(function(item,i){
            if(item == 'product' && pageName == 'productchangelogs'){
                flag = true
            }
            if(pageName === item.toLowerCase() || item === "admin"){
                flag = true;
            }else if(pageName === "app"){
                flag = true;
            }else if(pageName === 'admin'){
                flag = true;
            }
        },this)
        if(flag === false){
            location.href = URLMaker.home();
            return;
        }
        return (
            <div style={{position:"absolute",width:"100%",height:"100%",boxSizing:"border-box",paddingTop:"45px"}} id="topAppracheComponent">
                <Header />
                <div className="main-container" style={{height:"100%"}}>
                    <Sidebar systems={this.state.systems}/>
                    <div className="main-content" style={{height:"100%"}}>
                        <div className="main-content-inner">
                            <div className="page-content">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="footer-inner">
                        </div>
                    </div>
                    <a href="#" id="btn-scroll-up" className="btn-scroll-up btn btn-sm btn-inverse">
                        <i className="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
                    </a>
                </div>
            </div>
        )
    }
}
