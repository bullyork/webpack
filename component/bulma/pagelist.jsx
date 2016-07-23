import React,{Component} from "react"
import bulmaStore from "./../../store/bulma.js"
import {loadPageIndexes,startAddNewPage,editPage,removePage,udpatePageName} from "./../../action/bulma.js"

class PageList extends Component{
	render(){
		let pages = this.props.pageIndexes.map((onePage)=>{
			return <PageItem {...onePage} isEdit={onePage.slug === this.props.slug} platform={this.props.platform} />
		})
		return (
			<div className="pageListWrapper">
				<div className="pageAddButton" onClick={this._onPageAddedHandler}>
					+
				</div>
				{pages}
			</div>
		)
	}

	_onPageAddedHandler(){
		bulmaStore.dispatch(startAddNewPage());
	}

	componentDidMount(){
		bulmaStore.dispatch(loadPageIndexes(this.props.platform));
	}
}

class PageItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			isTitleEditing:false
		}
	}

	render(){
		let className = `pageItemWrapper ${this.props.isEdit === true?"active":""}`;

		return (
			<div className={className}>
				<div className="picture">
					<div className="previewWrapper">
						{this.renderPreviewWrapper()}
					</div>
					<div className="btnsWrapper">
						<div className="btns">
							<div className="edit button" onClick={this._onPageIndexClickHandler.bind(this)}>
								Edit
							</div>
							<div className="delete button" onClick={this._onRemovePageClickHandler.bind(this)}>
								Delete
							</div>
						</div>
					</div>
				</div>
				<div className="name">
					{this.renderTitle()}
				</div>
				<div className="date">
					{this.props.date}
				</div>
			</div>
		)
	}

	renderTitle(){
		if(this.state.isTitleEditing){
			return (
				<div>
					<input type="text" ref="nameInput" />
					<button onClick={this._onSaveNameHandler.bind(this)}>ok</button>
					<button onClick={this._onCancelHandler.bind(this)}>cancel</button>
				</div>
			)
		}
		return <div onDoubleClick={this._onStartEditHandler.bind(this)}>{this.props.title}</div>;
	}

	renderPreviewWrapper(){
		if(typeof this.props.sectionTypes !== "undefined"){
			return this.props.sectionTypes.map((section)=>{
				return <img src={`dist/images/${section}.png`} />
			})
		}
		return null;
	}

	_onPageIndexClickHandler(){
		bulmaStore.dispatch(editPage(this.props.slug,this.props.platform));
	}

	_onRemovePageClickHandler(){
		confirm("Are you sure delete this?") && bulmaStore.dispatch(removePage(this.props.slug,this.props.platform));
	}

	_onSaveNameHandler(){
		var name = this.refs.nameInput.value;
		var slug = this.props.slug;
		this.setState({isTitleEditing:false},()=>{
			bulmaStore.dispatch(udpatePageName(slug,name));	
		})
	}

	_onCancelHandler(){
		this.setState({isTitleEditing:false});
	}

	_onStartEditHandler(){
		this.setState({isTitleEditing:true},()=>{
			this.refs.nameInput.value = this.props.title;
		});
	}
}

export default PageList