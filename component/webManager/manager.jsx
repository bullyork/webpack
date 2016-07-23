import React,{Component} from 'react';
import {Provider,connect} from "react-redux";
import {getManager,deleteManager,getRoles,setRoles} from "./../../action/admin.js"
import adminStore from "./../../store/admin.js";
import { Modal, Button,Menu, Dropdown,Table,Icon,Checkbox } from 'antd';
import Userservice from '../../models/User.js';
const CheckboxGroup = Checkbox.Group;

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            selectedUser:"",
            checkoutList:[],
            selectedSystem:[],
            columns : [
              { title: 'Name', dataIndex: 'username', key: 'username' },
              { title: 'Operate', dataIndex: '', key: 'x', render: (text, record) => <Button onClick={() =>{this.setState({selectedUser:record.username},function(){this.showModal()}.bind(this))}}>Systems</Button> }
            ],
        };
    }
	addCommonManager(){
    	window.location.hash = '/ManageEdit'
    }
    BackIndexManager() {
    	window.history.back();
    }
    componentDidMount() {
        this.getSystem();
        adminStore.dispatch(getManager("user"));
    }
    getSystem(){
        var self = this;
        Userservice.getSystems().then((data)=>{
            self.setState({checkoutList:data.data});
              $.toaster({ priority : 'success', title : '', message : 'success!'});
        })
    }
    deleteUser(name) {
        adminStore.dispatch(deleteManager(name));
    }
    selectRoles(e) {
        let roleName = e.key;
        console.info(e)
        adminStore.dispatch(setRoles(this.state.selectedUser,roleName));
        this.handleCancel();
    }
    showModal() {
        this.setState({
          visible: true
        });
    }
    handleOk() {
        console.log('点击了确定');
        this.setState({
        visible: false
        });
        Userservice.assignSystemToUser(this.state.selectedUser,this.state.selectedSystem).then((data)=>{
            $.toaster({ priority : 'success', title : '', message : 'success!'});
        })
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
          visible: false
        });
    }
    checkBoxonChange(checkedValues) {
      this.setState({selectedSystem:checkedValues})
    }
    renderCheckBox(){
        return (
            <CheckboxGroup options={this.state.checkoutList} defaultChecked={false} onChange={this.checkBoxonChange.bind(this)} />
            )
    }
    renderTable(){
        return (
            <Table columns={this.state.columns} dataSource={this.props.Tusers.managerUsers} className="table" />
            )
    }
    render(){
        return (
            <div>
                {this.renderTable()}
                <div>
                        <Modal title="第一个 Modal" visible={this.state.visible}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
          {this.renderCheckBox()}
        </Modal>
                      </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return Object.assign({},state,{});
}
var ManagerList = connect(mapStateToProps)(UserList);

export default ManagerList