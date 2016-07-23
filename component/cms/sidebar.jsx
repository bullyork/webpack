import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeCtype, searchEdit, changeKey} from '../../action/cms.js';


@connect((state)=>({ctype:state.ctype, sidebarData:state.sidebarData, cmsKey: state.cmsKey}))
export default class Sidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: null
    }

    var parent = this;
    this.handleChangeFn = function(eve){
      parent.handleChange.call(parent,eve);
    }
  }
  render() {
    const {sidebarData} = this.props;
    if(!sidebarData || sidebarData.total <= 0){
      return null;
    }
    return (
      <div className="cms-wrapper--sidebar">
        <div className="cms-wrapper--sidebar--header">
          <div className="search">
              <input type="text" className="form-control" placeholder="search text" value={this.state.search} onChange={this.handleChangeFn}/>
              <button className="btn btn-default hide" id="">search</button>
          </div>
        </div>
        <div className="cms-wrapper--sidebar--list">
          <ul>
            {this.renderList()}
          </ul>
        </div>
      </div>
    )
  }


  handleChange(eve){
    this.setState({
      search:eve.target.value
    });
  }

  renderList(){
    const {dispatch, sidebarData, cmsKey} = this.props;
    const that = this;

    if(sidebarData === null){
      return null;
    }

    const subjects = sidebarData.subjects;

    return subjects.map((val,i)=>{

      let searchStr = !that.state.search ? "" : that.state.search.toLowerCase();
      if(that.state.search !== null && val.name.toLowerCase().indexOf(searchStr) === -1){
        return null;
      }else if(val.key.indexOf('QuickGuide_Delivery')!== -1){
        return null;
      }

      let tags = (
        <span className="_tags">
          <b>
            {val.area}
          </b>
          <b>
            {val.lang}
          </b>
        </span>
      )
      return (<li key={i} className={cmsKey === val.key ? "active":""} onClick={((key)=>{ dispatch(changeKey(key)); }).bind(that,val.key)}>{val.name} {tags}</li>)
    })
  }
}
