import React,{Component} from "react"


require("../../../../asset/css/mobile/quickGuild.css");
export default class QuickGuildMobile extends Component{
	render(){
		let quickGuild = this.props.quickGuild;
		var quickList = quickGuild.map((item)=>{
			var title_item;
			let quick_answer = item.answers.map((item_answer)=>{
				if(item_answer.title !== ""){
					title_item = (<p className="quickGuild-answer-title">{item_answer.title}</p>)
				}else {
					title_item = "";
				}
				return (
					<div className="item-answe">
						{title_item}
						<p className="quickGuild-answer">{item_answer.answer}</p>
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

