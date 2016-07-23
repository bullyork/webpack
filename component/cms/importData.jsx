import React, { Component } from 'react';
import showText from "./showText.js";
import {connect} from 'react-redux';
import {changeCtype,searchEdit,changeKey} from '../../action/cms.js';
import { Modal, Upload, Form, Button, Icon, message} from 'antd';
import dataEg from './dataEg.json';

const FormItem = Form.Item;

const props = {
  name:"file",
  action:'/api/cms/import/ImportJson',
  onChange(info){
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} successful!`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} failed!`);
    }
  }
}

@connect((state)=>({ctype:state.ctype}))
export default class ImportData extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const codeEg = JSON.stringify(dataEg);
    let code = codeEg.replace(/,/g,',\n');

    return (
      <section className="import-data">
        <h2>Import Data</h2>
        <br/>
        <Upload {...props}>
          <Button type="ghost">
            <Icon type="upload" /> Click Upload File
          </Button>
        </Upload>
        <br/>
        <br/>
        <p className="text-success">
          This item must use it with developer.
        </p>
        <div className="data-eg">
            {code}
        </div>
      </section>
    )
  }
}