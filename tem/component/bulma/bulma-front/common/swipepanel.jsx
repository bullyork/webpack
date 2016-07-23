import React from "react";
import {splitArray} from "./../helpers/array.js";

export default class SwipePanel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dataForDisplay:[],
			isAnimation:false,
			currentInedxForFrame:1,
			positionSwipe:0,
			viewWrapperWidth:0,
		}
		this.autoNextTimeoutId = -1;
	}

	render(){
		return this.props.renderView(this.state.dataForDisplay,this.state.isAnimation,{item:{},container:{left:this.state.positionSwipe+"px",width:this.state.viewWrapperWidth}})
	}

	loadShowData(props){
		if(typeof props.showData !== "undefined" && props.showData.length > 0){
			let dataForDisplay = [];
			let head = props.showData.slice(0,props.numberOfPerGroup);
			let tail = props.showData.slice(this.getSplitTailIndex(props.showData.length,props.numberOfPerGroup));
			let size = this.props.size();

			dataForDisplay.push(tail);
			dataForDisplay = dataForDisplay.concat(splitArray(props.showData,props.numberOfPerGroup))
			dataForDisplay.push(head);

			this.setState({dataForDisplay:dataForDisplay,positionSwipe:-1*size,viewWrapperWidth:size*dataForDisplay.length,currentInedxForFrame:1},()=>{
				this.startAutoNext(props);
				this.props.onPanelNumberChange && this.props.onPanelNumberChange(dataForDisplay.length - 2);
			});
		}
	}

	changeFrame(bannerPos){
		if(this.state.isAnimation === false){
			this.stopAutoNext();
			this.setState({isAnimation:true},()=>{
				this.setState({positionSwipe:this.props.size()*bannerPos*-1},()=>{
					setTimeout(()=>{
						if(bannerPos === 0){
							bannerPos = this.state.dataForDisplay.length - 2;
						}else if(bannerPos === this.state.dataForDisplay.length - 1){
							bannerPos = 1;
						}
						this.setState({isAnimation:false,currentInedxForFrame:bannerPos,positionSwipe:this.props.size()*bannerPos*-1},()=>{
							this.props.onIndexChange && this.props.onIndexChange(bannerPos-1);
							this.startAutoNext(this.props);
						});
					},900);
				});
			});
		}
	}

	next(){
		this.changeFrame((this.state.currentInedxForFrame + 1) % this.state.dataForDisplay.length);
	}

	prev(){
		this.changeFrame((this.state.currentInedxForFrame - 1) % this.state.dataForDisplay.length);
	}

	goto(idx){
		this.changeFrame(idx+1);
	}

	getSplitTailIndex(len,numberOfPerGroup){
		let remainder = len % numberOfPerGroup;
		if(remainder === 0){
			return -1 * numberOfPerGroup;
		}
		return -1 * remainder;
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.showData !== this.props.showData){
			this.loadShowData(nextProps);
		}
	}

	componentDidMount(){
		this.loadShowData(this.props);

		if(this.props.isReloadOnWindowResize === true){
			this.windowResizeHandler = function(){
				this.loadShowData(this.props);
			}.bind(this);
			window.addEventListener("resize",this.windowResizeHandler);
		}
	}

	componentWillUnmount(){
		if(this.props.isReloadOnWindowResize === true){
			window.removeEventListener("resize",this.windowResizeHandler);
		}
		this.stopAutoNext();
	}

	autoNextFunction(){
		this.changeFrame((this.state.currentInedxForFrame + 1) % this.state.dataForDisplay.length);
	}

	startAutoNext(props){
		if(props.isAutoSwipe){
			this.autoNextTimeoutId = setTimeout(this.autoNextFunction.bind(this),5000);	
		}
	}

	stopAutoNext(){
		if(this.props.isAutoSwipe){
			clearTimeout(this.autoNextTimeoutId);
		}
	}
}