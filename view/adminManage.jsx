import React,{Component} from 'react';
import ReactDOM from "react-dom"
import { Router, Route, Link } from 'react-router';
import AppWrapper from "../common/appwrapperCommon.jsx";
import { Form, Input, Button, Checkbox } from 'antd';
import Userservice from '../common/User.js';
import {Provider,connect} from "react-redux";
import { createStore } from 'redux';
import ManagerList from "../component/webManager/manager.jsx"
import adminStore from "../store/admin.js"

const FormItem = Form.Item;

let Demo = React.createClass({
    getInitialState(){
      return {
        hasSubmit:false,
      }
    },
  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    if(self.state.hasSubmit){
      return;
    }
    self.setState({hasSubmit:true},function(){
      Userservice.create(this.props.form.getFieldsValue().userName,this.props.form.getFieldsValue().password).then((data)=>{
              $.toaster({ priority : 'success', title : '', message : data.msg});
              self.setState({hasSubmit:false});
        })
    })
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem
          label="UserId:">
          <Input placeholder="please input userId"
            {...getFieldProps('userName')} />
        </FormItem>
        <FormItem
          label="password:">
          <Input type="password" placeholder="please input password"
            {...getFieldProps('password')} />
        </FormItem>
        <Button type="primary" htmlType="submit">Add User</Button>
      </Form>
    );
  }
});

let ManageEdit = Form.create()(Demo);

class SystemEdit extends React.Component{
  constructor(props){
        super(props);
        this.state = {
          inputValue:"",
          hasSubmit:false,
        };
    }
    inputValue(event){
      this.setState({inputValue:event.target.value});
    }
    addSystem(){
      var self =this;
      if(self.state.hasSubmit){
        return;
      }
      self.setState({hasSubmit:true},function(){
        Userservice.createSystem(this.state.inputValue).then((data)=>{
              $.toaster({ priority : 'success', title : '', message : data.msg});
              self.setState({hasSubmit:false});
          })
      })
    }
  render(){
    return (
      <div>
      <input value={this.state.inputValue} onChange={this.inputValue.bind(this)} />
      <Button onClick={this.addSystem.bind(this)}>add System</Button>
      </div>
      )
  }
}


class AppRouter extends React.Component{
	addCommonManager(){
    	window.location.hash = '/ManageEdit'
    }
    BackIndexManager() {
    	window.history.back();
    }
    addSystem() {
      window.location.hash = '/SystemEdit'
    }
	render(){
		return (
			<div>
				<div>
	            	<Button type="primary" onClick={this.BackIndexManager}>Back</Button>
	                <Button type="primary" onClick={this.addCommonManager}>Add User</Button>
                  <Button type="primary" onClick={this.addSystem}>Add System</Button>
	            </div>
                <Router>
                    <Route path="/" component={ManagerList}></Route>
                    <Route path="/ManageEdit" component={ManageEdit}></Route>
                    <Route path="/SystemEdit" component={SystemEdit}></Route>
                </Router>
            </div>
			)
	}
}


function mapStateToProps(state) {
  return Object.assign({},state,{});
}


var BulmaWithStore = connect(mapStateToProps)(AppRouter)


class Admin extends React.Component {
    render(){
        return(
            <div>
                <Provider store={adminStore}>
                    <BulmaWithStore />
                </Provider>
            </div>
            )
    }
}

ReactDOM.render(<AppWrapper><Admin /></AppWrapper>, document.getElementById("appContainer"));