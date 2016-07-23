import React,{Component} from "react"
import bulmaStore from "./../../store/bulma.js"
import {addNewPage} from "./../../action/bulma.js"

class PageAdd extends Component{

	render(){
		return (
			<div className="center-block" style={{width:"50%"}}>
				  <div className="form-group">
				    <label htmlFor="">Name:</label>
				    <input type="text" ref="nameInput" className="form-control" id="" placeholder="Input Name" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="">Slug: /Page/</label>
				    <input type="text" className="form-control" id="" ref="slugInput" placeholder="Input Slug" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="">PageTitle:</label>
				    <input type="text" className="form-control" id="" ref="pageTitleInput" placeholder="Input A Page Title" />
				  </div>
				  <button type="submit" onClick={this._onConfirmHandler.bind(this)} className="btn btn-success">Confirm</button>
			</div>
		)
	}

	_onConfirmHandler(){
		let name = this.refs.nameInput.value;
		let slug = this.refs.slugInput.value;
		let pageTitle = this.refs.pageTitleInput.value;

		bulmaStore.dispatch(addNewPage(name,slug,pageTitle,this.props.platform));
	}

}

export default PageAdd