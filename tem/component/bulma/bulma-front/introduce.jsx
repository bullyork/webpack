import React,{Component} from "react"


require("../../../asset/css/introduce.css");
export default class Introduce extends Component{
	render(){
		let quickGuild = this.props.quickGuild;
		var quickList = quickGuild.map((item)=>{
			var answer_item;
			let quick_answer = item.answers.map((item_answer)=>{
				if(item_answer.answer !== ""){
					answer_item = (<p className="quickGuild-answer">{item_answer.answer}</p>)
				}else {
					answer_item = "";
				}
				return (
					<div className="item-answe">
						<p className="quickGuild-answer-title">{item_answer.title}</p>
						{answer_item}
					</div>
					)
			})
			return (
				<div className="quickGuild-list">
					<p className="quickguild-question">{item.question}</p>
					{quick_answer}
				</div>
				)
		})
		return (
			<div className="quickGuild">{quickList}</div>
		)
	}
}