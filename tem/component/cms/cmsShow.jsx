import React, { Component } from 'react';
import {connect} from 'react-redux';
import {showKeyBooks} from './showKeyBooks.js';
import {changeEditContent} from '../../action/cms.js';
import {Switch, Input, Button} from 'antd'


export default class CmsShow extends Component{
  constructor(props){
    super(props);
  }

  render(){
     const {data} = this.props;
     var keys = Object.keys(data);

     return (
        <div className="cms-show-item list-group-item">
          {keys.map((key, i)=>{
            var name = showKeyBooks[key] || key;
            var value = data[key];
            return (
              <div key={`${key}_${i}`} className="cms-item">
                <h3 className="list-group-item-heading">{name}:</h3>
                <div className="_value list-group-item-text">
                  {value}
                </div>
              </div>
            )
          })}
        </div>
      )
  }
}


export class CmsShowList extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {data} = this.props;
    if(!data || data.length < 0){
      return null;
    }

    return (
      <div className="cms-show-list-item list-group">
        {data.map((item, i)=>{
          return (
            <CmsShow data={item} />
          )
        })}
      </div>
    )
  }
}
