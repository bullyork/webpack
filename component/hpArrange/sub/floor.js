import React,{Component} from 'react'
import { connect } from 'react-redux'
import Pop from '../../_widget/pop'
import {getPictureUrl} from '../../../util/kit'
import { 
  getFloor,
  addFloor,
  deleteFloor,
  getPopStatus,
  getCurrentTab
 } from '../../../action/hpArrange.js'
const assign = Object.assign


@connect((state => ({
  popStatus: state.popStatus,
  collection: state.collection
})))
class Floor extends Component{
  constructor(props) {
    super(props)
    this.state = {
      collection: [{id: '',collections: [{
        campaign: {picture:'', linkAddress: ''},
        thirdLevelCampaigns: []
      }],removed: ''}],
      collectionIndex: 0,
      f: 0
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('floor'))
  }
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getFloor((collection)=>this.setState({collection})))
  }

  updateData(data, index, k, action, order){
    let {
      collection,
      collectionIndex,
      f
    } = this.state
    if(k == 'campaign'){
      collection[collectionIndex].collections[f].campaign = assign({},collection[collectionIndex].collections[f].campaign,data)
    }else{
      collection[collectionIndex].collections[f].thirdLevelCampaigns[index] = assign({},collection[collectionIndex].collections[f].thirdLevelCampaigns[index],data)
    }
    this.setState({collection})
  }
  render(){
    const {
      dispatch
    } = this.props
    const {
      inputList,
      visible,
      index,
      dataTimePicker,
      k,
      imgType,
      upload,
      info
    } = this.props.popStatus
    const {
      collection,
      collectionIndex,
      f
    } = this.state

    const {
      id,
      removed
    } = collection[collectionIndex]

    const {collections} = collection[collectionIndex]
    const params = {
      inputList,
      visible,
      index,
      dataTimePicker,
      k,
      dispatch,
      imgType,
      upload,
      info
    }
    const getInputArea = (params) => (
      <Pop  {...params} updateData={this.updateData.bind(this)}/>)
    const floors = []
    const pagination = []
    const bigCollection = collections[f].campaign
    const subCollections = collections[f].thirdLevelCampaigns

    for (let i = 0; i < collection.length; i++) {
      if(collectionIndex == i){
        pagination.push(
        <div className="data-value-c divSelected" key={i} onClick = {() => {this.setState({collectionIndex: i})}}>
          {i}
        </div>
      )
      }else{
        pagination.push(
        <div className="data-value-c" key={i} onClick = {() => {this.setState({collectionIndex: i})}}>
          {i}
        </div>
      )
      }
    }

    for (let i = 0; i < collections.length; i++) {
      if(f == i){
        floors.push(
        <div className="home-li-c divSelected" key={i} onClick = {() => {this.setState({f: i})}}>
          {i+1}F
        </div>
      )
      }else{
        floors.push(
        <div className="home-li-c" key={i} onClick = {() => {this.setState({f: i})}}>
          {i+1}F
        </div>
      )
      }
    }

    const subCollection = subCollections.map((item,index) => (
      <div className="subfloor-c" key = {index}
        onClick = {() => {dispatch(getPopStatus({
          inputList: ['name','linkAddress'],
          index: index,
          visible: true,
          imgType: 'picture',
          info: {name: item.name,linkAddress: item.linkAddress}
        }))}}
        style={{backgroundImage: getPictureUrl(item.picture)}}>
        <p>{item.name}</p>
      </div>
    ))
    return (
  		<div className="home-body">
        <div className="home-li">
          {floors}
        </div>
        <div className="home-value">
          <div className="bigfloor" 
            style={{backgroundImage: getPictureUrl(bigCollection.picture)}}
            onClick = {() => {dispatch(getPopStatus({
            inputList: ['linkAddress'],
            visible: true,
            dataTimePicker: false,
            k: 'campaign',
            imgType: 'picture',
            info: {linkAddress: bigCollection.linkAddress}
          }))}}>
          </div>
          <div className="subfloor">
            {subCollection}
          </div>
          <div className="sub">
            <div className="sub-buttom-a"
            onClick={()=>{
              dispatch(addFloor(collections,
                () => dispatch(getFloor((collection)=>this.setState({collection})))
              ))
            }}>Apply</div>
            <div className="sub-buttom-d"
            onClick={()=>{
              dispatch(deleteFloor(id,
                () => dispatch(getFloor((collection)=>this.setState({collection})))
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
} 
export default Floor