import React, { Component } from 'react';
import {connect} from "react-redux"
import { Button, Row, Form, Col, Select, Input, Checkbox, DatePicker} from 'antd';
import {primeShipmentBooks, statusTexts} from './wish.js'
import EditBox from './Edit.jsx'
import {ListPrimeProduct, BulkCheckoutPrimeProduct, changeStatus, changeActivity, changeSearchCondition} from './../../action/wishlist.js'

const FormItem = Form.Item;


@connect((state)=>({
  status:state.status,
  listActivityData:state.listActivityData,
  activityId: state.activityId,
  selectedData: state.selectedData,
  currentActivity: state.currentActivity
}))
@Form.create()
export default class HandleHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      startTime:null,
      endTime:null,
      status:0,
      search:""
    }
  }

  handleOk(status, primeShipment){
    const {selectedData, dispatch} = this.props;
    let prevStatus = this.props.status;

    let productIds = selectedData.map((item)=>{
      return item.id;
    });

    dispatch(BulkCheckoutPrimeProduct(productIds,status,primeShipment,(data)=>{
      if(data){
        alert("your change ok!");

        if(prevStatus !== status){
          dispatch(changeStatus(status))
        }else{
          dispatch(changeSearchCondition({reload: true}))
        }
      }
    }))
  }
  openChangeEdit(){
    const {selectedData} = this.props;

    if(selectedData.length <= 0){
      alert('Please choose you want to change items!');
      return;
    }

    let canChange = selectedData.every((item)=>{
      return item.isActivityCid;
    });

    if(!canChange){
      alert("你所勾选的商品中包含CID已下架的商品，不支持批量修改!");
      return;
    }

    this.setState({
      visible: !this.state.visible
    });
  }

  disabledStartDate(startTime) {
    if (!startTime || !this.state.endTime) {
      return false;
    }
    return startTime.getTime() >= this.state.endTime.getTime();
  }
  disabledEndDate(endTime) {
    if (!endTime || !this.state.startTime) {
      return false;
    }
    return endTime.getTime() <= this.state.startTime.getTime();
  }
  onChange(field, value) {
    var _this = this;

    const {form, dispatch} = this.props;

    form.setFieldsValue({
      [field]:value
    });

    this.setState({
      [field]: value,
    },()=>{
      dispatch(changeSearchCondition({
        startTime:_this.state.startTime,
        endTime:_this.state.endTime
      }));

    });


  }
  onStartChange(value) {
    this.onChange('startTime', value);
  }
  onEndChange(value) {
    this.onChange('endTime', value);
  }

  searchContent(){
    let search = this.state.search;

    var urlReg = /((?:(?:https?\:)?\/\/)?(?:(?:(?:(?:[\w\d]+)\.)+(?:(?:[a-z]{2,3})|(?:[a-z]{2,3}\.[a-z]{2,3})))|(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(?:\:\d{2,5})?(?:\/(?:[\w%!_\$\+\-\?\/|=\.&]+)?)?)/i;
    let searchCondition = {};
    if(urlReg.test(search)){
      searchCondition.url = search;
      searchCondition.userId = "";
    }else{
      searchCondition.userId = search;
      searchCondition.url = "";
    }

    this.props.dispatch(changeSearchCondition(searchCondition));

  }
  render() {
    const { status, listActivityData, activityId } = this.props;
    const { getFieldProps } = this.props.form;
    let keys = Object.keys(statusTexts);
    let activityText = "All Activity";

    let listSelectData = listActivityData.concat([{
      id:"",
      name:"All Activity"
    }]);

    let activityObj = listActivityData.find((activity)=>{
      return activity.id === activityId;
    });

    if(activityObj){
      activityText = activityObj.name;
    }


    const formItemLayout = {
      labelCol: { span: "6" },
      wrapperCol: { span: "18" }
    };

    return (
      <Row gutter={16}>
        <Col className="gutter-row" span="2">
          <Button type="primary" onClick={this.openChangeEdit.bind(this)}>Batch Through</Button>
          &nbsp;
          <EditBox title="批量修改选中商品审核状态&运输方式" visible={this.state.visible} closeModal={()=>{
            this.setState({
              visible:false
            });
          }} handleOk={this.handleOk.bind(this)}></EditBox>
        </Col>
        <Col className="gutter-row" span="6">
          <FormItem label="URL/UserID:">
           <Row>
             <Col span="16">
                <Input onChange={(eve)=>{
                  let val = eve.target.value;
                  this.setState({
                    search: val
                  });
                }} value={this.state.search} placeholder="userName/productURL" style={{ width: '100%', marginRight: 5 }} />
             </Col>
             <Col span="4">
                <Button type="primary" onClick={this.searchContent.bind(this)}>Search</Button>
             </Col>
           </Row>
          </FormItem>
        </Col>

        <Col className="gutter-row" span="16">
          <Form horizontal className="ant-advanced-search-form" ref="filter">

          <Row>
            <Col span="6">
            <FormItem label="Status:" span>
              <Select onChange={(status)=>{
                this.props.dispatch(changeStatus(parseInt(status)));
                }} defaultValue={statusTexts[status]} style={{width:140}} placeholder="all prime wishlist">
                {
                  keys.map((key, i)=>{
                    return (
                      <Option key={i} value={key}>{statusTexts[key]}</Option>
                    )
                  })
                }
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="Activity">
              <Select onChange={(status)=>{
                this.props.dispatch(changeActivity(status));
              }} value={activityText} style={{width:140}} placeholder="all prime wishlist">
                {
                  listSelectData.map((item,i)=>{
                    return (
                      <Option key={`${item.name}_${i}`} value={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </FormItem>

            </Col>
            <Col span="12">
              <FormItem labelCol={{span:"4"}} wrapperCol={{span:"20"}} label="时间段:">
              <Col span="12">
                <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps('startTime')} disabledDate={this.disabledStartDate.bind(this)}
                  placeholder="开始日期"
                  onChange={this.onStartChange.bind(this)} />
              </Col>
              <Col span="12">
                <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps('endTime')} disabledDate={this.disabledEndDate.bind(this)}
                  placeholder="结束日期"
                  onChange={this.onEndChange.bind(this)} />
              </Col>
            </FormItem>
            </Col>
          </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}