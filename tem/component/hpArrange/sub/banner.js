import React,{Component} from 'react'
import { connect } from 'react-redux'
import Pop from '../../_widget/pop'
import {getPictureUrl,arrayInsert} from '../../../util/kit'
import { warn, success } from '../../../util/antd'
import { Carousel, Button, Row, Col, Select } from 'antd'
import {popStatusClear} from '../../../constant/index'
import { 
  getBanner,
  addBanner,
  deleteBanner,
  getPopStatus,
  getCurrentTab,
  changeCountry,
} from '../../../action/hpArrange'
const assign = Object.assign
Option = Select.Option


@connect(state => ({
  popStatus: state.popStatus,
  banner: state.banner,
  countryCode:state.countryCode,
}))
class Banner extends Component{

  constructor(props) {
    super(props)
    this.state = {
      banner: [{id: '',banners: [],removed: ''}],
      bannerIndex: 0
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('banner'))
    dispatch(getPopStatus(popStatusClear))
  }
  componentDidMount(){
    const {dispatch,countryCode} = this.props
    dispatch(getBanner(countryCode,(banner)=>this.setState({banner})))
  }

  updateData(data, index, key, action, order){
    let {
      banner,
      bannerIndex
    } = this.state

    let bannerList = banner[bannerIndex].banners
    let bigBanners = []
    let subBanners = []

    for (let i = 0; i < bannerList.length; i++) {
      if(bannerList[i].bannerType == 1){
        bigBanners.push(bannerList[i])
      }else {
        subBanners.push(bannerList[i])
      }
    }
    if(action != 'add' && action != 'delete'){
      if(index >= bigBanners.length){
        index = index - bigBanners.length
         subBanners[index] = assign({},subBanners[index],data)
        if(order>0){
          subBanners = arrayInsert(index, order-1, subBanners)
        }
      }else{
        bigBanners[index] = assign({},bigBanners[index],data)
        if(order>0){
          bigBanners = arrayInsert(index, order-1, bigBanners)
        }
      }
    }else if(action == 'add'){
      let tpl = {
        bannerType: 1,
        endAt: 0,
        linkAddress: '',
        name: '',
        picture: '',
        startAt: 0,
        visible: true
      }
      if(!data.picture){
        warn('请上传图片！')
        return
      }
      tpl = assign({},tpl,data)
      if(index >= bigBanners.length){
        index = index - bigBanners.length
        if(order>0){
          subBanners.splice(order-1,0,tpl)
        }else{
          subBanners.splice(index,0,tpl)
        }
      }else{
        if(order>0){
          bigBanners.splice(order-1,0,tpl)
        }else{
          bigBanners.splice(index,0,tpl)
        }
      }
    }else{
      bigBanners.splice(index,1)
    }
    banner[bannerIndex].banners = [].concat(bigBanners, subBanners)
    this.setState({banner})
  }
  render(){
    const {
      dispatch,
      countryCode
    } = this.props
    const {
      inputList,
      visible,
      index,
      dataTimePicker,
      imgType,
      action,
      upload,
      sort,
      preLength
    } = this.props.popStatus
    const {banner,bannerIndex} = this.state

    const {
      id,
      removed
    } = banner[bannerIndex]

    const {banners} = banner[bannerIndex]
    const params = {
      inputList,
      visible,
      index,
      dataTimePicker,
      dispatch,
      imgType,
      action,
      upload,
      sort,
      preLength
    }
    const getInputArea = (params, info) => (
      <Pop {...params} info = {banners[index]} updateData={this.updateData.bind(this)}/>)

    const pagination = []
    const bigBanners = []
    const subBanners = []
    for (let i = 0; i < banner.length; i++) {
      if(bannerIndex == i){
        pagination.push(
        <div className="data-value-c divSelected" key={i} onClick = {() => {this.setState({bannerIndex: i})}}>
          {i}
        </div>
      )
      }else{
        pagination.push(
        <div className="data-value-c" key={i} onClick = {() => {this.setState({bannerIndex: i})}}>
          {i}
        </div>
      )
      }
    }
    for (let i = 0; i < banners.length; i++) {
      if(banners[i].bannerType == 1){
        bigBanners.push(banners[i])
      }else {
        subBanners.push(banners[i])
      }
    }
    const bigBanner = bigBanners.map((item,index) => (
      <div className="bigbanner" key = {index} 
        onClick = {() => {
          dispatch(getPopStatus({
          inputList: ['name','linkAddress','visible'],
          index: index,
          visible: true,
          dataTimePicker: true,
          imgType: 'picture',
          sort: bigBanners.length
        }))}}
        style={{backgroundImage: getPictureUrl(item.picture),display: "flex",justifyContent: "center",marginTop: "10px",marginBottom:'10px',alignItems: 'center',height:'125px',backgroundSize:'100% 100%'}}>
        <Button onClick = {(e) => {
            e.stopPropagation();
            e.preventDefault();
            dispatch(getPopStatus({
              upload: false,
              visible: true,
              index: index,
              action: 'delete'
            }))}}>点击删除</Button>
      </div>
    ))
    const subBanner = subBanners.map((item,index) => (
      <div className="subbanner-c" key = {index}
        onClick = {() => {dispatch(getPopStatus({
          inputList: ['name','linkAddress'],
          index: index+bigBanners.length,
          visible: true,
          dataTimePicker: true,
          imgType: 'picture',
          sort: subBanners.length,
          preLength: bigBanners.length //现在banner是一个list用类型区分！shit
        }))}}
        style={{backgroundImage: getPictureUrl(item.picture)}}>
      </div>
    ))
  	return (
  		<div className="home-body" >
        <div style={{position:"absolute",top:'-35px',width:'50%',right:'0'}}>
          <Row style={{width:"100%"}} type="flex" justify="flex-end" align="middle">
            <Col>国家：</Col>
            <Col>
              <Select value={countryCode} style={{ width: 120 }} onChange={(countryCode)=>{dispatch(changeCountry(countryCode))}}>
                <Option value="SG">Singapore</Option>
                <Option value="MY">Malaysia</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div className="home-li">
          <div className="home-li-c">
            Banner
          </div>
        </div>
        <div className="home-value">
          <Carousel>
            {bigBanner}
          </Carousel>
          <div className="subbanner-c"
             style={{display: "flex",justifyContent: "center",marginTop: "10px",marginBottom:'10px'}}>
             <Button onClick = {() => {dispatch(getPopStatus({
              inputList: ['name','linkAddress','visible'],
              visible: true,
              dataTimePicker: true,
              imgType: 'picture',
              action: 'add',
              sort: bigBanners.length
            }))}}>点击添加</Button>
          </div>
          <div className="subbanner">
            {subBanner}
          </div>
          <div className="sub">
            <div className="sub-buttom-a"
            onClick={()=>{
               dispatch(addBanner(banners,countryCode,
                () => dispatch(getBanner(countryCode,(banner)=>this.setState({banner:fixBannerEmpty(banner)})))
              ))
            }}>Apply</div>
            <div className="sub-buttom-d"
            onClick={()=>{
              dispatch(deleteBanner(id,
                () => dispatch(getBanner(countryCode,(banner)=>this.setState({banner:fixBannerEmpty(banner)})))
              ))
            }}>Delete</div>
            <div className="data-body">
              <div className="data-li">
                <div className="data-solid"></div>
                <div className="data-solid"></div>
                <div className="data-solid"></div>
              </div>
              <div className="data-value">
                {pagination}
              </div>
            </div>
          </div>
        </div>
        {getInputArea(params)}
	  	</div>
  	)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.countryCode !== nextProps.countryCode){
      const {dispatch,countryCode} = nextProps;
      dispatch(getBanner(countryCode,(banner)=>this.setState({bannerIndex:0,banner:fixBannerEmpty(banner)})))
    }
  }
} 
export default Banner

function fixBannerEmpty(banner){
  if(banner.length === 0){
    return [{id: '',banners: [],removed: ''}];
  }
  return banner;
}