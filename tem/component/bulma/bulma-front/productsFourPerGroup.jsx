import React,{Component} from "react"
import {render} from "react"
import ProductItem from "./common/productItemWithFavoriteAndReviewNumber.jsx"


require("../../../asset/css/productsFourPerGroup.css");

class ProductsFourPerGroup extends Component{
	render(){
		return (
			<div className="productsFourPerGroupPanel">
				<div className="productsWrapper">
					{this.props.products.map((productItem)=>{
						return (
							<ProductItem {...productItem} />
						)
					})}
				</div>
			</div>
		)
	}
}

export default ProductsFourPerGroup