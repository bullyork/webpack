import React,{Component} from "react"

export default class TagName extends Component{
	render(){
		return (
			<div className="tagNameWrapper">
				<div className="line">
					<div className="strightLine"></div>
					<div className="circle"></div>
				</div>
				<div className="name">{this.props.name}</div>
				<div className="line">
					<div className="circle"></div>
					<div className="strightLine"></div>
				</div>
			</div>
		)
	}
}