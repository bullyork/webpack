import React, { Component } from 'react';
import Sidebar from "./sidebar.jsx";
import CmsContent from "./content.jsx";
import ctypes from './cmsTypes.js'
import {changeCountryCode, changeLang} from '../../action/cms.js';
import {connect} from 'react-redux';
import {changeCtype} from '../../action/cms.js';
import AddMeta from './meta.jsx';
import ImportData from './importData.jsx';
import CmsPanel from './cmsPanel.jsx';
import showText from "./showText.js";
import {Select} from 'antd';
const Option = Select.Option;

@connect((state)=>({ctype:state.ctype}))
export default class Home extends Component {
  render() {
    return (
      <div className="cms-home">
        <CMSTypes />
        <ShowBox />
      </div>
    )
  }
}

@connect((state)=>({ctype:state.ctype}))
class CMSTypes extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {dispatch,ctype} = this.props;
    const _this = this;

    var allTypes = ctypes.map((val)=>{
      return (
        <li onClick={((ctype)=>{ dispatch(changeCtype(ctype)); }).bind(_this,val.type)}>
          <span className={ctype === val.type ? 'active' : ''}>
            {val.type}
          </span>
          <span className="des">
            {val.description}
          </span>
        </li>)
    });

    var all = (
      <ul className="clearfix">{allTypes}</ul>
    )
    var home = (
      <div className="nav">
        <span className="home" onClick={()=>{ dispatch(changeCtype('')); }}>
          <i className="fa fa-home"></i>HOME</span>
        <span className="child">
          {ctype}
        </span>
      </div>

    );

    return (
      <div className="choose-type">
        {ctype === "" ? all : home}
      </div>
    );
  }
}

@connect((state)=>({ctype:state.ctype, area: state.area, lang: state.lang}))
class ShowBox extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {ctype} = this.props;
    let Main = null;

    if(ctype === ""){
      return null;
    }


    switch(ctype) {
      case "Import Data":
        return (<ImportData />);
        break;
      case "FAQ":
        Main = (
          <CmsContent />
        )
        break;
      default:
        Main = (
          <CmsPanel />
        )
        break;
    }
    return (
      <div className="__bb">
        {this.renderOther()}

        <div className="form-inline">
          <div className="form-group">
            <label for="">Area Filter:</label>
            <span className="form-control" style={{border:0, padding:0, margin:"0 20px 0"}}>
              {this.renderAreaTags()}
            </span>
          </div>
          <div className="form-group">
            <label for="">Lang Filter:</label>
            <span className="form-control" style={{border:0, padding:0, margin:"0 20px 0"}}>
              {this.renderLangTags()}
            </span>
          </div>
        </div>
        <section className="cms-wrapper">
          <Sidebar />
          { Main }
        </section>
      </div>
    )
  }
  renderAreaTags(){
    const {areasBook} = showText;
    const {dispatch, area} = this.props;
    var options = [];
    for(let prp in areasBook){
      var op = (<Option value={prp}>{areasBook[prp]}</Option>);
      options.push(op);
    }

    return (
      <div className="areas-list">
         &nbsp; &nbsp;
        <Select defaultValue={areasBook[area]} style={{ width: 160 }} onChange={(value)=>{ dispatch(changeCountryCode(value)); }}>
          {options}
        </Select>
      </div>
    )
  }
  renderLangTags(){
    const {langsBook} = showText;
    const {dispatch, lang} = this.props;
    var options = [];
    for(let prp in langsBook){
      var op = (<Option value={prp}>{langsBook[prp]}</Option>);
      options.push(op);
    }

    return (
      <div className="langs-list">
         &nbsp; &nbsp;
        <Select defaultValue={langsBook[lang]} style={{ width: 160 }} onChange={(value)=>{dispatch(changeLang(value))}}>
          {options}
        </Select>
      </div>
    )
  }
  renderOther(){
    return null;
  }
}