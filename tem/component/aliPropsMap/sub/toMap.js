import React,{Component} from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Icon,
  Select,
  Radio,
  Button,
  Input
} from 'antd'
import { 
  getCurrentTab
} from '../../../action/merchandise'
import './toMap.less'
const Option = Select.Option
const RadioGroup =  Radio.Group
@connect()
class ToMap extends Component{
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getCurrentTab('ToMap'))
  }
  render(){
    return (<section className="toMap">
        <h3>1，属性匹配</h3>
        <Row className="mapContent">
          <Col span="10">
            <div className='ali-ezbuy'>
              <header>ezbuy属性</header>
              <div className="props">
                <label>属性：</label>
                 <Select combobox
                  style={{ width: 200 }}
                  filterOption={false}
                  placeholder="请输入ezbuy属性前缀"
                >
                  <Option value="jack">jack</Option>
                  <Option value="lucy">lucy</Option>
                </Select>
              </div>
              <div className="propsValue">
                <label>属性值：</label>
                <RadioGroup >
                  <Radio  key="a" value={1}>Option A</Radio>
                  <Radio  key="b" value={2}>Option B</Radio>
                  <Radio  key="c" value={3}>Option C</Radio>
                </RadioGroup>
              </div>
            </div>
          </Col>
          <Col span="4" style={{height:300}}>
            <Icon type="arrow-left"/>
            <Button>对应</Button>
          </Col>
          <Col span="10">
            <div className='ali-ezbuy'>
              <header>淘宝属性</header>
              <div className="props">
                <label>属性：</label>
                 <Select combobox
                  style={{ width: 200 }}
                  filterOption={false}
                  placeholder="请输入ezbuy属性前缀"
                >
                  <Option value="jack">jack</Option>
                  <Option value="lucy">lucy</Option>
                </Select>
              </div>
              <div className="propsValue">
                <label>属性值：</label>
                <RadioGroup >
                  <Radio  key="a" value={1}>Option A</Radio>
                  <Radio  key="b" value={2}>Option B</Radio>
                  <Radio  key="c" value={3}>Option C</Radio>
                </RadioGroup>
              </div>
            </div>
          </Col>
        </Row>
        <h3>2，规则匹配</h3>
        <Row className="mapContent">
          <Col span="10">
            <div className='ali-ezbuy'>
              <header>ezbuy属性</header>
              <div className="props">
                <label>属性：</label>
                 <Select combobox
                  style={{ width: 200 }}
                  filterOption={false}
                  placeholder="请输入ezbuy属性前缀"
                >
                  <Option value="jack">jack</Option>
                  <Option value="lucy">lucy</Option>
                </Select>
              </div>
              <div className="propsValue">
                <label>属性值：</label>
                <RadioGroup >
                  <Radio  key="a" value={1}>Option A</Radio>
                  <Radio  key="b" value={2}>Option B</Radio>
                  <Radio  key="c" value={3}>Option C</Radio>
                </RadioGroup>
              </div>
            </div>
          </Col>
          <Col span="4" style={{height:300}}>
            <Icon type="arrow-left"/>
            <Button>对应</Button>
          </Col>
          <Col span="10">
            <div className='ali-ezbuy'>
              <header>淘宝规则</header>
              <div className="props">
                <label>属性名：</label>
                <Input style={{ width: 200 }}/>
              </div>
              <div className="propsValue">
                <label>属性值：</label>
                <Input style={{ width: 200 }}/>
              </div>
            </div>
          </Col>
        </Row>
      </section>)
  }
}
export default ToMap
