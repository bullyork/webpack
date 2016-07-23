import React,{Component} from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Select,
  Table
} from 'antd'
import { redirect } from '../../util/history'
import { search,changeBanner } from '../../action/popBanner'
import './popBannerList.less'
const Option = Select.Option
@connect(state => ({
  popBanners: state.popBanners
}))
class PopBannerList extends Component{
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(search('SG'))
  }
  render(){
    const {
      dispatch,
      popBanners
    } = this.props
    const columns =[{
      title:'id',
      dataIndex:'id',
      key: 'id'
    },{
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },{
      title: 'picture',
      dataIndex: 'picture',
      key: 'picture',
      render:(text)=>(<img src={text} alt="ezbuy is the best"/>)
    },{
      title: '链接地址',
      dataIndex: 'url',
      key: 'url'
    },{
      title: '国家号',
      dataIndex: 'countryCode',
      key: 'countryCode'
    },{
      title: 'startDate',
      dataIndex: 'startDate',
      key: 'startDate'
    },{
      title: 'endDate',
      dataIndex: 'endDate',
      key: 'endDate'
    },{
      title: '操作',
      key: 'operate',
      render: (text,record) =>(<Button onClick={()=>{
        dispatch(changeBanner(record))
        redirect('/editPopBanner',{
          todo: 'edit'
        })
      }}>编辑</Button>)
    }]
    return (<section className="popBannerList">
        <div className="addBanner">
          添加：
          <Button onClick={()=>{
            redirect('/editPopBanner',{
              todo: 'add'
            })
          }}>添加新popBanner</Button>
        </div>
        <div className="select">
          选择国家号：
          <Select style={{width:120}} defaultValue={'SG'} onChange={(v)=>{
            dispatch(search(v))
          }}>
            <Option key={0} value={"MY"}>MY</Option>
            <Option key={1} value={"SG"}>SG</Option>
            <Option key={2} value={"AU"}>AU</Option>
            <Option key={3} value={"ID"}>ID</Option>
            <Option key={4} value={"TH"}>TH</Option>
          </Select>
        </div>
        <div className="list">
          <Table columns={columns} dataSource={popBanners} />
        </div>
      </section>)
  }
}
export default PopBannerList