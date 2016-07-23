import React,{Component} from "react"
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import ComponentsList from "../component/bulma/componentslist.jsx"
import ToolBar from "../component/bulma/toolbar.jsx"
import PageList from "../component/bulma/pagelist.jsx"
import PageAdd from "../component/bulma/pageadd.jsx"
import EditPagePanel from "../component/bulma/editpage.jsx"
import EditPagePanelMobile from "../component/bulma/editpageMobile.jsx"
import {Provider,connect} from "react-redux"
import bulmaStore from "../store/bulma.js"

import "../asset/css/bulma.css";

class Bulma extends Component{
  constructor(props){
    super(props)
    this.state = {
      siderOpen:true
    }
  }
	render(){
		let pageData = [];
	    let _width_= this.state.siderOpen ? "" : " sider-close";
	    let derection = this.state.siderOpen ? "left" :"right";

		return (
			<div style={{height:"100%",overflow:"hidden"}}>
				<div className={"componentsListWrapper" + _width_ }>
          			<span className={"sider-close-btn glyphicon glyphicon-chevron-" + derection } onClick={this.changeSider.bind(this)}></span>
          			<span className="cover"></span>
					<ComponentsList platform={this.props.platform} />
				</div>
				<div className={"applicationPanel" + _width_}>
					<ToolBar slug={this.props.editPageSlug} importExcelDialogDisplayState={this.props.isImportExcelDialogOpen} platform={this.props.platform} />
					<PageList pageIndexes={this.props.pageIndexes} slug={this.props.editPageSlug} platform={this.props.platform} />
					<div className="pageAddAndFrontWrapper">
						{this.renderPageAndAndFront()}
					</div>
				</div>
			</div>
		)
	}

  changeSider(){

    this.setState({
      siderOpen: !this.state.siderOpen
    });
  }
	renderPageAndAndFront(){
		if(this.props.panelMode === "NewPage"){
			return <PageAdd platform={this.props.platform} />
		}else if(this.props.panelMode === "EditPage" && this.props.platform !== "Mobile"){
			return <EditPagePanel {...this.props.editingPageDetail} platform={this.props.platform} />;
		}else if(this.props.panelMode === "EditPage" && this.props.platform === "Mobile"){
			return <EditPagePanelMobile {...this.props.editingPageDetail} platform={this.props.platform} />;
		}
		return (<div className="bulmaWelcome">Welcome to Bulma</div>);
	}
}



function mapStateToProps(state) {
	return Object.assign({},state,{});
}


var BulmaWithStore = connect(mapStateToProps)(Bulma)

class BulmaWithProviderAndStore extends Component{
  render(){
    return (
      <Provider store={bulmaStore}>
        <BulmaWithStore />
      </Provider>
    )
  }
}

ReactDOM.render(<AppWrapper><BulmaWithProviderAndStore /></AppWrapper>, document.getElementById("appContainer"));

window.currentCountryCode = "SG";