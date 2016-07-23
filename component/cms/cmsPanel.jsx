import React,{Component} from "react";
import { Modal, Button } from 'antd';
import {connect} from 'react-redux';
import {changeEditContent} from '../../action/cms.js';
import Tags from './tag.jsx';
import Navigation from './navigation.jsx';
import {HandlePanel} from './handlePanel.jsx';
import Text from "./Text.jsx";
import SEO from "./SEO.jsx";

@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, activeItem: state.activeItem}))
export default class CmsPanel extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {cmsKey, ctype, activeItem} = this.props;
    let showContent = null;

    if(cmsKey === "" || !activeItem){
      return this.renderInitContent();
    }

    switch(ctype) {
      case "Navigation":
        showContent = (<Navigation />)
        break;
      case "Text":
        showContent = (<Text />)
        break;
      case "SEO":
        showContent = (<SEO />)
        break;
      default:
        showContent = (<CMSmainBox />)
        break;
    }


    return (
      <div className="cms-wrapper--content">
        <HandlePanel />
        <Tags />
        <div className="editContent">
          {showContent}
        </div>
      </div>
    );
  }

  renderInitContent(){
    return (
      <h1 className="text-center empty-content">Web Content Edit Area</h1>
    );
  }
}

@connect((state)=>({ctype:state.ctype, cmsKey: state.cmsKey, activeItem: state.activeItem, isEdit: state.isEdit}))
class CMSmainBox extends Component{
  constructor(props){
    super(props)
    this.state = {
      htmlContent:props.activeItem.html
    }
  }

  render(){
    const {isEdit, activeItem} = this.props;
    const {html} = activeItem;
    const {htmlContent} = this.state;

    if(isEdit){
      return (
        <div className="edit">
          <textarea ref="html" onChange={this.editChangeFn.bind(this)} value={htmlContent} defaultValue={htmlContent} />
        </div>
      )
    }

    return (
      <div className="preview-code">
        <code className="html">{html}</code>
      </div>
    )
  }
  editChangeFn(){
    const {dispatch} = this.props;
    let htmlInput = this.refs.html;
    let html = htmlInput.value;

    this.setState({
      htmlContent:html
    },function(){
      dispatch(changeEditContent(html));
    })
  }

  componentWillReceiveProps(nextProps){
    const {cmsKey} = this.props;
    if(cmsKey !== nextProps.cmsKey){
      this.setState({
        htmlContent:nextProps.activeItem.html
      });
    }
  }
}

