import React, { Component } from 'react';
import CmsServices from "../../common/CmsServices.js";
import showText from './showText.js';
import {connect} from 'react-redux';
import Tags from './tag.jsx';
import {changeKey, updateEditHtml} from '../../action/cms.js';

class Item extends Component{
  constructor(props){

    super(props)
    this.state = {
      edit:false,
      itemData:props.data,
      q:props.data.question,
      a:props.data.answer
    }

    var that = this;
    this.changeContentFn = function(eve){
      that.changeContent.call(that,eve);
    }

    this.changeTitleFn = function(eve){
      that.changeTitle.call(that,eve);
    }
  }

  render(){
    const {question, answer} = this.state.itemData;
    const {q, a} = this.state;
    const {classIndex, index} = this.props;

    let itemTag = `${classIndex + 1}.${index + 1}`


    var visible = this.state.edit ? "" :"hide";
    var Bvisible = this.state.edit ? "hide" :"";
    var hasExchange = /%CURRENT_EXCHANAGE%/g.test(answer);

    return (
      <div className="item" data-index={index}>
        <div className="faq-question">
          <h5>
            <span className={Bvisible}>{itemTag} {q}</span>
            <div className="pull-right">
                <span className={"op-pull " + visible}>
                  <button className="btn btn-default" onClick={this.changeEdit.bind(this, false)}>Cancel</button>
                  <button className="btn btn-success" onClick={this.changeEdit.bind(this, true)}>Save</button>
                </span>
                &nbsp;&nbsp;
                <i className={"glyphicon glyphicon-pencil " + Bvisible} onClick={this.changeEdit.bind(this,false)}></i>
            </div>
          </h5>
          <div className={"i-input " + visible}>
            {itemTag}
            <input onChange={this.changeTitleFn} className="form-control" type="text" value={question}/>
          </div>
        </div>
        <div className="faq-anwser">
          <p className={Bvisible}>{a}</p>
          <textarea onChange={this.changeContentFn} name="" id="" value={answer} className={visible}/>
        </div>
        <p className={"bg-danger " + (hasExchange ? '' : 'hide')}>%CURRENT_EXCHANAGE% Can not update;</p>
      </div>
    )
  }


  changeTitle(eve){
    var item = this.state.itemData;
    item.question = eve.target.value;
    this.setState({
      itemData:item
    })
  }

  changeContent(eve){
    var item = this.state.itemData;
    item.answer = eve.target.value;
    this.setState({
      itemData:item
    })
  }

  changeEdit(isSave){
    const {edit} = this.state;
    const {question, answer} = this.state.itemData;

    this.setState({
      edit:!edit
    },function(){

      if(isSave){
        this.setState({
          q:question,
          a:answer
        });
        // save faq data
        this.saveData();
      }

    });
  }

  saveData(){
    var item = this.state.itemData;
    var index = this.props.index;
    this.props.saveData(item,index);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      edit:false,
      itemData:nextProps.data,
      q:nextProps.data.question,
      a:nextProps.data.answer
    })
  }
}

class FAQitem extends Component{
  constructor(props){
    super(props)

    this.state = {
      visible: false
    }
  }

  render(){
    var that = this;
    const faqs = this.props.faqs;
    const {index} = this.props;

    if(faqs === null || faqs === undefined){
      return null;
    }
    var items = faqs.map((val,i)=>{
      return (
        <Item data={val} index={i} classIndex={index} saveData={that.saveData.bind(this)}/>
      )
    })
    return (
      <li>
        <h4>{index + 1}. {this.props.title}
          <div className="pull-right">
            <i className="glyphicon glyphicon-chevron-down" onClick={this.showItem.bind(this)}></i>
          </div>
        </h4>
        <div style={{display:this.state.visible ? "block" :"none" }} className="faq-section-wrapper">
          {items}
        </div>
      </li>)
  }

  showItem(id){
    this.setState({
      visible: !this.state.visible
    })
  }

  saveData(item,index){

    const faqs = this.props.faqs;
    faqs[index] = item;

    this.props.saveData(faqs,this.props.index)
  }
}



@connect((state)=>({ctype:state.ctype,cmsKey: state.cmsKey, activeItem: state.activeItem}))
export default class FAQ extends Component {
  constructor(props){
    super(props)

    this.state ={
      faqData: JSON.parse(props.activeItem.html),
      item:props.activeItem
    }
  }
  render() {
    return (
      <div className="faq-list">
        <p className="bg-primary info">
        </p>
        {this.renderClassList()}
      </div>
    );
  }

  renderClassList(){
    const {faqData, item} = this.state;
    const that = this;

    if(item === null || !(faqData instanceof Array) || faqData.length <= 0 ){
      return null;
    }

    var AllFaqs = faqData.map((val,i)=>{
      return (
        <FAQitem title={val.title} index={i} faqs={val.faqs} saveData={that.saveData.bind(this)} />
      )
    });

    return (
      <ul>
       {AllFaqs}
      </ul>
    )
  }

  saveData(item,index){
    const {faqData} = this.state;
    const {dispatch, cmsKey} = this.props;

    faqData[index].faqs = item;
    // save data connect
    var html = JSON.stringify(faqData);// must string

    dispatch(updateEditHtml(cmsKey,html,function(data){
      if(data){
        console.log("update faq data OK! " + cmsKey);
      }else{
        console.log("update faq data failed! " + cmsKey);
      }
    }))

  }

  componentWillReceiveProps(nextProps){
    const {activeItem} = nextProps;
    const faqData = JSON.parse(activeItem.html);

    this.setState({
      faqData:faqData,
      item: activeItem
    });

  }
}
