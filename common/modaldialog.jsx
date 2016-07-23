import React,{Component} from 'react';
export default class extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalId:"btstpModal"+new Date().getTime() 
		};
	}
	render(){
		return(
			<div className="modal fade" id={this.state.modalId} tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
							<h4 className="modal-title">{this.props.title}</h4>
						</div>
						<div className="modal-body">
							{this.props.children}
						</div>
						<div className="modal-footer">
							{this.props.buttons}
							<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>	
						</div>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		if(this.props.modalHideHandler){
			$("#"+this.state.modalId).on("hide.bs.modal",function(e){
				this.props.modalHideHandler(e);
			}.bind(this));
		}
	}
	show(){
		$("#"+this.state.modalId).modal("show");
		$("#topAppracheComponent").css("position","");
	}
	hide(){
		$("#"+this.state.modalId).modal("hide");
	}
}