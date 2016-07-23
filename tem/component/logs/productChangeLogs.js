import React,{Component} from 'react'
import { redirect } from '../../util/history'
import {connect} from 'react-redux'
import {warn} from '../../util/antd'
import {showTimestampToDate, getRequest} from '../../util/kit'
import {getProductChangeLogs} from '../../action/productChangeLogs'
import {
  Button,
  Alert,
  Col,
  Row,
  DatePicker,
  Table,
  Input
} from 'antd'

@connect(state => ({
  productChangeLogs: state.productChangeLogs
}))
class ChangeLog extends Component {
  constructor(props){
    super(props)
    this.state={
      keyWord:'',
      startTime:0,
      endTime:0,
      current:0
    }
  }
  componentWillMount(){
    const {
      keyWord,
      startTime,
      endTime,
      current
    } = this.state
    const {dispatch} = this.props
    const refid = getRequest().refId
    this.setState({keyWord:refid})
    dispatch(getProductChangeLogs(refid,startTime,endTime,current*10,10))
  }
  render(){
    const {
      dispatch,
      productChangeLogs
    } = this.props
    const {
      keyWord,
      startTime,
      endTime,
      current
    } = this.state
    const columns = [{
      title:'refid',
      dataIndex:'refid',
      key:'refid',
      width:200
    },{
      title:'属性',
      dataIndex:'props',
      key:'props',
      render:(text)=>{
        let logs = []
        for (let key in text) {
          logs.push(<p>
            属性名：{key},属性值：{text[key]}
          </p>)
        }
        return logs
      }
    },{
      title:'updateBy',
      dataIndex:'updateBy',
      key:'updateBy'
    },{
      title:'updateDate',
      dataIndex:'updateDate',
      key:'updateDate',
      render:(text)=>(<span>{showTimestampToDate(text)}</span>)
    },{
      title:'action',
      dataIndex:'action',
      key:'action'
    }]
    return(<section className='changeLog'>
      <Row style={{marginBottom:15,marginTop:35}}>
        <Col span="6">
          <div style={{marginBottom:10}}>
            <label htmlFor="keyWord">refid:</label>
            <input type="text" name="keyWord" value={keyWord} style={{width:200}} className="ant-input" onChange={(e)=>this.setState({keyWord:e.target.value})} />
          </div>
        </Col>
        <Col span="6">
            <label htmlFor='startTime'>开始日期:</label>
            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" onChange={(v)=>{
              this.setState({startTime:Date.parse(v)})
            }} />
        </Col>
        <Col span="6">
            <label htmlFor='endTime'>截止日期:</label>
            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" onChange={(v)=>{
              this.setState({endTime:Date.parse(v)})
            }} />
        </Col>
        <Col span="6">
          <Button onClick={()=>{
            if(endTime<startTime && endTime!=0){
              warn('截止日期要大于开始日期')
              return
            }
            dispatch(getProductChangeLogs(keyWord,startTime,endTime,current*10,10))
          }}>确定</Button>
        </Col>
      </Row>
      <div className='content'>
        <Table dataSource={productChangeLogs} columns={columns} pagination={false}/>
        <p style={{textAlign:'center'}}><Button onClick={()=>{
          dispatch(getProductChangeLogs(keyWord,startTime,endTime,0,10*(current+1)))
          this.setState({current:current+1})
        }}>查看更多</Button></p>
      </div>
    </section>)
  }
}

export default ChangeLog