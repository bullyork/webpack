import React,{Component} from 'react'
import { connect } from 'react-redux'
import Pop from '../../_widget/pop'
import { categoryConfig } from '../../../constant/index'
import {getPictureUrl} from '../../../util/kit'
import {
  addCategory,
  getCategory,
  deleteCategory,
  getPopStatus,
  getCurrentTab
} from '../../../action/hpArrange.js'
const assign = Object.assign

@connect(state => ({
  popStatus: state.popStatus,
  product: state.product
}))

class Category extends Component{

  constructor(props) {
    super(props)
    this.state = {
      product: [{id:'',products:[],promotionBanner:{
        picture: '',
        linkAddress: ''
      },removed:'',topCategoryId:''}],      
      productIndex: 0,
      topCategoryId: 2647
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('category'))
  }
  componentDidMount(){
    const {dispatch} = this.props
    const {topCategoryId} = this.state
    dispatch(getCategory(topCategoryId,(product)=>this.setState({product})))
  }
  updateData(data, index, k, action, order){
    let {
      product,
      productIndex,
    } = this.state
    if(k == 'promotionBanner'){
      product[productIndex].promotionBanner = assign({},product[productIndex].promotionBanner,data)
    }else{
      product[productIndex].products[index] = assign({}, product[productIndex].products[index],data)
    }
    this.setState({product})
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
      product,
      productIndex,
      topCategoryId
    } = this.state
    const {
      id,
      removed
    } = product[productIndex]

    const {products} = product[productIndex]
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
    const addParams = {
      products,
      promotionBanner: product[productIndex].promotionBanner,
      topCategoryId
    }
    const getInputArea = (params) => (
      <Pop  {...params} updateData={this.updateData.bind(this)}/>)
    const categories = []
    const pagination = []
    const bigProduct = product[productIndex].promotionBanner
    const smallProducts = products
    for (let i = 0; i < product.length; i++) {
      if(productIndex == i){
        pagination.push(
        <div className="data-value-c divSelected" key={i} onClick = {() => {this.setState({productIndex: i})}}>
          {i}
        </div>
      )
      }else{
        pagination.push(
        <div className="data-value-c" key={i} onClick = {() => {this.setState({productIndex: i})}}>
          {i}
        </div>
      )
      }
    }
    const smallProduct = smallProducts.map((item,index) => (
      <div className="category-right-c" key = {index}
        onClick = {() => {dispatch(getPopStatus({
          inputList: ['name','price','url'],
          index: index,
          visible: true,
          imgType: 'image',
          info: {name: item.name,price:item.price,url: item.url}
        }))}}
        style={{backgroundImage: getPictureUrl(item.image)}}>
        <div>
          <p>{item.name}</p>
          <p>{'S$ '+item.price}</p>
        </div>
      </div>
    ))
    const menuList = categoryConfig.map((item,index) => {
      if(item.id == topCategoryId){
        return(
        <div className="home-li-c divSelected" key={index} onClick={
          () => {
            this.setState({topCategoryId: item.id})
            dispatch(getCategory(item.id, (product)=>this.setState({product})))
        }
        }>{item.name}</div>
        )
      }else{
        return (
        <div className="home-li-c" key={index} onClick={
          () => {
            this.setState({topCategoryId: item.id})
            dispatch(getCategory(item.id, (product)=>this.setState({product})))
        }
        }>{item.name}</div>
        )
      }
    })
  	return (
      <section>
    		<div className="home-body">
  	  		<div className="home-li">
  	  			{menuList}
  	  		</div>
  	  		<div className="home-value">
            <div className="category-left" 
              style={{backgroundImage: getPictureUrl(bigProduct.picture)}}
              onClick = {() => {dispatch(getPopStatus({
              inputList: ['linkAddress'],
              visible: true,
              dataTimePicker: false,
              k: 'promotionBanner',
              imgType: 'picture',
              info: {linkAddress: bigProduct.linkAddress}
            }))}}></div>
  	  			<div className="category-right">
  	  				{smallProduct}
  	  			</div>
  	  			<div className="sub">
              <div className="sub-buttom-a"
              onClick={()=>{
                dispatch(addCategory(addParams,
                  () => dispatch(getCategory(topCategoryId, (product)=>this.setState({product})))
                ))
              }}>Apply</div>
              <div className="sub-buttom-d"
              onClick={()=>{
                dispatch(deleteCategory(id,
                  () => dispatch(getCategory(topCategoryId, (product)=>this.setState({product})))
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
        </div>
        {getInputArea(params)}
      </section>
  	)
  }
} 
export default Category