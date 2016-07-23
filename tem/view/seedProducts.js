import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Router, Route, Link } from 'react-router';
import { Form, Input, Button, Checkbox,Table } from 'antd';
import SeedStore from "../store/seedStore.js";
import {Provider,connect} from "react-redux";
import {getCategorylist,setCategoryId} from "../action/seedAction.js";
import SeedProductComponents from "../component/seedProduct/seedProducts.jsx";

class Category extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            columns : [
              { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
              { title: 'Category Name', dataIndex: 'categoryName', key: 'Products' ,render: (text, record) => <Button onClick={() =>{this.viewProducts(record.id)}}>Products</Button> },
              { title: 'Categories', dataIndex: '', key: 'x', render: (text, record) => <Button onClick={() =>{this.viewSoonCategory(record.id)}}>Categories</Button> },
            ],
        };
    }
	render(){
		var reGoCategory;
		if(this.props.Category.categoryId === null){
			reGoCategory = (
				<Button type="primary" onClick={()=>{window.location.hash = '/Category/0'}}>回到Top Category</Button>
				)
		}else if(this.props.Category.categoryId === 0){
			reGoCategory=(
				<Button type="primary" onClick={()=>{window.location.hash = '/Category/0'}}>回到Top Category</Button>
				)
		}else if(this.props.Category.categoryId >0){
			reGoCategory=(
				<Button type="primary" onClick={()=>{window.location.hash = '/Category/0'}}>回到Top Category</Button>
				)
		}
		return(
				<div>
				{reGoCategory}
	            <Table columns={this.state.columns} dataSource={this.props.Category.categoryList} className="table" />
	            </div>
			)
	}
	componentWillMount(){
		if(this.props.params.id !== undefined){
			SeedStore.dispatch(getCategorylist(parseInt(this.props.params.id)));
			return;
		}
		SeedStore.dispatch(getCategorylist(this.props.Category.categoryId));
	}
	componentWillUpdate(nextProps, nextState) {
        if (this.props.params.id !== nextProps.params.id) {
            SeedStore.dispatch(getCategorylist(parseInt(nextProps.params.id)));
        }
    }
	viewSoonCategory(id){
		if(this.props.params.id === undefined){
			SeedStore.dispatch(setCategoryId(0));
		}else {
			SeedStore.dispatch(setCategoryId(parseInt(this.props.params.id)));
		}
		window.location.hash = '/Category/'+id;
	}
	viewProducts(id){
		SeedStore.dispatch(setCategoryId(parseInt(this.props.params.id)));
		window.location.hash = '/Product/'+id;
	}
}


function mapStateToProps(state) {
  return Object.assign({},state,{});
}

var SeedCategoryStore = connect(mapStateToProps)(Category)

class SeedRouter extends React.Component{
    render(){
        return (
            <div>
                <Router>
                    <Route path="/" component={SeedCategoryStore}></Route>
                    <Route path="/Category/:id" component={SeedCategoryStore}></Route>
                    <Route path="/Product/:cid" component={SeedProductComponents}></Route>
                </Router>
            </div>
        )
    }
}

class SeedProvider extends React.Component{
	render(){
		return(
			<Provider store={SeedStore}>
				<SeedRouter />
			</Provider>
		)

	}
}

ReactDOM.render(<AppWrapper><SeedProvider /></AppWrapper>, document.getElementById("appContainer"));