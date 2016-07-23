import React, {Component} from 'react'
import {Modal, Form, Button, Switch, Radio} from 'antd'
import {primeShipmentBooks, statusTexts} from './wish.js'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;


export default class EditSatusAndShipment extends Component{
  constructor(props){
    super(props)
    this.state = {
      status: props.status || 1,
      shipment: props.primeShipment || 1
    }
  }

  changeStatus(_status){
    let status = _status ? 1 : 2

    this.setState({
      status: status
    });

  }
  changeShipment(eve){
    let shipment = eve.target.value;
    this.setState({
      shipment:shipment
    })
  }

  handleOkFn(){
    const {status, shipment} = this.state;
    this.props.handleOk(status, shipment);
    this.props.closeModal();
  }
  render(){
    let colors = ['#3B3C2B', '#03AD03', 'red']
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const {title, visible, closeModal} = this.props;
    const {status, shipment} = this.state;
    let keys = Object.keys(primeShipmentBooks);

    return (
      <Modal width="500" title={title} visible={visible}
        onOk={this.handleOkFn.bind(this)} onCancel={closeModal.bind(this)}
        >

        <Form horizontal>
          <FormItem {...formItemLayout} label="审核状态:">

            <span>
              <Switch checked={status === 1 ? true : false} onChange={this.changeStatus.bind(this)} size="large"/>
              &nbsp;
              <strong style={{color: colors[status] }}>
                {statusTexts[status]}
              </strong>
            </span>
          </FormItem>

          <FormItem {...formItemLayout} label="运输方式:">
            <span>
              <RadioGroup value={shipment} onChange={this.changeShipment.bind(this)}>
                {
                  keys.map((key, i)=>{
                    var val = primeShipmentBooks[key];
                    return (<Radio key={val} value={parseInt(key)}>{val}</Radio>)
                  })
                }
              </RadioGroup>
            </span>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}