import React,{Component} from "react"
import {priceWithSymbol} from "./helpers/price.js"
require("../../../asset/css/countdownclock.css");

export default class CountDownClock extends Component{

	constructor(props){
		super(props);
		this.state = {
			timeToStart:null,
			timeToEnd:null,
			now:null,
		}
	}

	render(){
		let timeInfo = {
			remainingTime:this.getRemainingTime(),
			isTimeStart:this.isTimeStart(),
			isTimeEnd:this.isTimeEnd(),
		}
		let items = this.props.products.map(function(product){
			return <CountDownClockProductItem {...product} {...timeInfo}  />
		},this)
		return (
			<div className="countDownClockPanel">
				<div className="_container">
					<div className="list-wrapper">
						{items}
					</div>
				</div>
			</div>
		)
	}

	isTimeStart(){
		return this.state.timeToStart !== null && this.state.timeToStart.getTime() < this.state.now.getTime();
	}

	isTimeEnd(){
		return this.state.timeToEnd !== null && this.state.timeToEnd.getTime() < this.state.now.getTime();
	}

	getRemainingTime(){
		if(this.isTimeStart() && !this.isTimeEnd()){
			var time = Math.ceil((this.state.timeToEnd.getTime() - this.state.now.getTime()) / 1000);
			return `${convertNumberToTwoBit(Math.floor(time/3600))}:${convertNumberToTwoBit(Math.floor((time%3600) / 60))}:${convertNumberToTwoBit((time%3600) % 60)}`;
		}
		return null;
	}

	componentDidMount(){
		this.setState({now:new Date(),timeToStart:new Date(this.props.startTime),timeToEnd:new Date(this.props.endTime)});
		this.tickFunctionIntervalId = setInterval(this.tick.bind(this),1000);

	}

	componentWillUnmount(){
		clearInterval(this.tickFunctionIntervalId);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.startTime !== this.props.startTime){
			this.setState({timeToStart:new Date(nextProps.startTime)});
		}
		if(nextProps.endTime !== this.props.endTime){
			this.setState({timeToEnd:new Date(nextProps.endTime)});
		}
	}

	tick(){
		this.setState({now:new Date()});
	}
}

class CountDownClockProductItem extends Component{

	render(){
		let pieces = this.props.stock > 1 ? "pieces":"piece";

		return (
			<div className="countDownClockProductItem">
				<a className="productImageWrapper" href={this.props.linkAddress} target="_blank">
					<img width="100%" height="100%" src={this.props.picture} />
					{this.renderRemaining()}
					{this.renderNotStart()}
				</a>
				<div className="productInfoWrapper">
					<div className="productInfo">
						<a className="name" href={this.props.linkAddress}><nobr>{this.props.name}</nobr></a>
						<div className="priceAndStockWrapper">
							<div className="priceWrapper">
								{this.renderPromotionPrice()}
								{this.renderOriginPrice()}
							</div>
							<div className="stock">
								<span className="stockNumber">{this.props.stock}</span> {pieces} left
							</div>
						</div>
					</div>
				</div>
				{this.renderSoldOut()}
			</div>
		)
	}

	renderOriginPrice(){
		if(this.props.originPrice > 0){
			return (
				<span className="origin">{priceWithSymbol(this.props.originPrice)}</span>
			)
		}
		return null;
	}

	renderPromotionPrice(){
		if(this.props.promotionPrice > 0){
			return <span className="promotion">{priceWithSymbol(this.props.promotionPrice)}</span>
		}
		return null
	}

	renderRemaining(){
		if(this.props.isTimeStart && !this.props.isTimeEnd && this.props.stock > 0){
			return (
				<div className="remainingWrapper">
					<span className="remainText">Remaining: {this.props.remainingTime}</span>
				</div>
			)
		}
		return null;
	}

	renderNotStart(){
		if(!this.props.isTimeStart){
			return (
				<div className="aboutToStartWrapper">
					About to start
				</div>
			)	
		}
		return null;
	}

	renderSoldOut(){
		if((this.props.isTimeStart && this.props.isTimeEnd) || this.props.stock === 0){
			return (
				<div className="souldOutWrapper">
					<div className="soldOut">
						<div className="text">Sold<br />Out</div>
					</div>
				</div>
			)
		}
		return null;
	}
}

var convertNumberToTwoBit = function convertNumberToTwoBit(number){
	return  number >= 10 ? `${number}`:`0${number}`;
}