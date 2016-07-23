import React, { Component } from 'react';
import CmsServices from "../../models/CmsServices.js";
import showText from './showText.js';
import {connect} from 'react-redux';
import {changeKey} from '../../action/cms.js';


@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, activeItem: state.activeItem}))

export default class Tags extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {activeItem} = this.props;
    const {key,lang,area,isPublish} = activeItem;

    return (<div className="tag-line">
      TAGS:
      <span className="tag">{showText.getLangText(lang)}</span>
      <span className="tag">{showText.getAreaText(area)}</span>
      <br/>
      KEY:
      <span className="tag">{key}</span>
      <br/>
      PUBLISH:
      <span className="tag">{isPublish ? "YES" : "NO"}</span>
    </div>);
  }
}