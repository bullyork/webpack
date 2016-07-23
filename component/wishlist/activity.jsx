import React, { Component } from 'react';
import { connect } from "react-redux"
import {Select, Button, Modal, Row, Col} from 'antd';
import Setting, {EditActivityCondition} from './setting.jsx'
import { changeCountryCode, ListActivityPage, changeSearchCondition, ActivityConfig, ActivityConditionConfig,GetActivityCondition, GetActivityDetail, changeActivity, changeStatus, RemoveActivity } from './../../action/wishlist.js'

@connect((state)=>({
  countryCode:state.countryCode,
  listActivityData:state.listActivityData,
  activityId: state.activityId,
  settingData: state.settingData,
  currentActivity: state.currentActivity
}))
export default class Activity extends Component {
  constructor(props){
    super(props)
    this.state = {
      add: false,
      activityId:null,
      visible: false,
      title:"添加wish活动",
      setting: false,
      hideHeader: false,
      ActivityCondition:{}
    }
  }

  renderActivitys(){
    let _this = this;
    const {hideHeader, setting, button} = this.state;
    const { activityId, listActivityData} = this.props;

    if(hideHeader){
      return null;
    }else{
      return (
        <Row>
          <br/>
          <br/>
          <Col span="10">
              <Row>
                <Button type="primary" onClick={()=>{this.setState({
                        add: true,
                        visible: true,
                        title:"添加Wishlist内容"
                      })}}>ADD ITEM</Button>

                      &nbsp; &nbsp;

                <Button type="primary" onClick={this.SettingFn.bind(this)}>Setting</Button>
                <br/>
                <br/>
              </Row>
             <ul className="list-group">
              {
                listActivityData.map((item,i)=>{
                  let _key = `${item.name}_${i}`;

                  return (<ActivityItem key={_key} activity={item} editItem={_this._editItem.bind(this)}  /> )
                })
              }
            </ul>
          </Col>
        </Row>
      )
    }
  }

  SettingFn(){
    const _this = this;

    this.props.dispatch(GetActivityCondition((data)=>{
      _this.setState({
        ActivityCondition:data,
        setting: true,
        visible:true,
        title:"编辑配置时间",
        editItem: false
      })
    }))
  }

  _hideHeader(){
    const {showHeader, dispatch, currentActivity, activityId} = this.props;
    let status = !this.state.hideHeader;
    let currentActivityId = currentActivity.id;

    showHeader(status);

    this.setState({
      hideHeader: status
    });

    if(!this.Init){
      this.Init = true;
      if(currentActivityId !== activityId){
        dispatch(changeActivity(currentActivityId));
      }
    }
  }
  renderModalContent(){
    const { activityId, settingData} = this.props;

    if(!this.state.setting){
      return (
        <Setting ref="setting" key={activityId} activityId={activityId} add={this.state.add} settingData={settingData} handleModalOk={this.handleModalOk.bind(this)} closeModal={()=>{
              this.setState({
                visible: false
              })
        }}  />
      )
    }else{
      return (
        <EditActivityCondition ref="setting" key={activityId} activityId={activityId} add={this.state.add} ActivityCondition={this.state.ActivityCondition} handleModalOk={this.handleModalOk.bind(this)} closeModal={()=>{
              this.setState({
                visible: false
              })
        }}  />
      )
    }
  }

  render() {
    let _this = this;
    const { visible, title, hideHeader}  = this.state;


    return (
      <div className="_head">
        <div className="_change-code">
            <Button onClick={()=>{
              this._hideHeader();
            }}> { hideHeader ? "Show Header" : "Hide Header"} </Button>

            &nbsp;&nbsp;

            <label htmlFor="CountryCode">
              Manage CountryCode:
            </label>
            &nbsp; &nbsp;
            <Select onChange={(countryCode)=>{

              const {dispatch, currentActivity} = this.props;
              dispatch(changeCountryCode(countryCode));

              dispatch(ListActivityPage(()=>{

                // dispatch(changeSearchCondition({reload: true}));

              }))


            }} defaultValue="Singapore" style={{width:100}} placeholder="CountryCode">
              <Option value="SG">Singapore</Option>
              <Option value="MY">Malaysia</Option>
              <Option value="AU">Australia</Option>
            </Select>
        </div>

        {this.renderActivitys()}

        <Modal width="680" title={title} visible={visible} onOk={this.handleModalOk.bind(this)} onChange onCancel={()=>{
          this.setState({
            visible:false,
            add:false,
            setting:false
          })
        }}>

        { visible ? (
            this.renderModalContent()
          ) : null
        }

        </Modal>
      </div>
    );
  }

  handleModalOk(){

    const {setting, visible, add, editItem} = this.state;

    if(!add && !setting && !editItem){
      this.setState({
        visible: false
      });
      return;
    }

    const {dispatch, settingData} = this.props;
    var data = this.refs.setting.getFieldsValue();


    if(add || editItem){

      data.id =  editItem ? settingData.id : "";

      dispatch(
        ActivityConfig(data, (_data)=>{
        if(_data.code !== 0){
          alert(_data.msg);
        }else{
          alert("successful!")
        }
      }));

    }else{
      dispatch(ActivityConditionConfig(data, (_data)=>{
        if(_data.code !== 0){
          alert(_data.msg);
        }else{
          alert("successful!")
        }
      }))
    }

    this.setState({
      visible: false,
      add:false,
      setting:false,
      editItem:false
    })
  }

  _editItem(id){
    this.setState({
      add:false,
      visible: true,
      title:"编辑内容",
      setting:false,
      editItem:true
    });

    this.props.dispatch(changeActivity(id));
    this.props.dispatch(GetActivityDetail(id))
  }

  componentWillReceiveProps(nextProps){
    if(this.props.countryCode !== nextProps.countryCode){
      this.changeActivity();
    }
  }

  changeActivity(){
    var _this = this;
    const {dispatch} = this.props;
    dispatch(ListActivityPage());
  }

  componentDidMount(){
    this.changeActivity();
  }
}


@connect()
class ActivityItem extends Component{

  render(){

    const {activity, editItem} = this.props;

    let {startTime, expireTime} = activity;
    let nT = new Date().getTime();
    let currentItem = (nT > new Date(startTime).getTime() && nT < new Date(expireTime).getTime());

    let style = {
      background: currentItem ? "#4f9fff" : "#fff",
      color: currentItem ? "#fff" : "#333",
      lineHeight:"2"
    };

    return (
      <li style={style} className="list-group-item">
        <span className="tag">
          {currentItem ? "Current Item" : "Other"}
        </span>
        &nbsp;
        &nbsp;
        <span className="name">
          {`Name: ${activity.name}`}
        </span>

        &nbsp;&nbsp;
        <span className="commit">
          {`commitCount: ${activity.commitCount}`}
        </span>

        <Button className="pull-right" onClick={editItem.bind(this, activity.id)}>Edit</Button>

        <Button className="pull-right" style={{color:"#f34"}} onClick={(eve)=>{
          eve.stopPropagation();

          if(currentItem){alert("不能删除正在进行的活动!"); return false;}
          this.props.dispatch(RemoveActivity(activity.id));
        }}>delete</Button>
      </li>
    )

  }
}
