import React,{Component} from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Form,
  Select,
  Upload,
  Icon,
  DatePicker
} from 'antd'
import { redirect } from '../../util/history'
import { success,warn } from '../../util/antd'
import { getToken } from '../../api/hpArrange'
import Config from '../../common/config'
import { toNormalDateString,normalDataStringToTime } from '../../util/kit'
import { changeBanner,addBanner,editBanner } from '../../action/popBanner'
const FormItem = Form.Item
const Option = Select.Option
@connect(state => ({
  newBanner: state.newBanner
}))
class editPopBanner extends Component{
  constructor(props) {
    super(props)
    this.state = {
      baseUrl:'',
      token:'',
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    const {
      todo
    } = this.props.location.query
    if(todo == 'add'){
      dispatch(changeBanner({
        name: '',
        countryCode: 'SG',
        picture: '',
        url: '',
        startDate: '',
        endDate: ''
      }))
    }
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
    })
    }
    )
  }
  verifyData(data){
    const keys = [{
      key:'name',
      label: '名字'
    },{
      key: 'picture',
      label: '图片'
    },{
      key: 'url',
      label: '链接地址'
    },{
      key: 'startDate',
      label: '开始时间'
    },{
      key: 'endDate',
      label: '结束时间'
    }]
    let flag = true
    for (let i = 0; i < keys.length; i++) {
      if(!data[keys[i].key]){
        flag = false
        warn(`${keys[i].label}不能为空`)
        break
      }
    }
    return flag
  }
  render(){
    const {
      todo
    } = this.props.location.query
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const {
      dispatch,
      newBanner
    } = this.props

    const {
      token,
      baseUrl
    } = this.state

    const props = {
      name: 'file',
      action: Config.QINIU_UPLOAD_URL,
      data: {token: token},
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList = fileList.slice(-1)
         if (info.file.status === 'done') {
          success(`${info.file.name} 上传成功。`)
          dispatch(changeBanner({picture:baseUrl+info.file.response.key}))
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const disabledDate = (current) => {
      return current && current.getTime() < Date.now()
    }
    let fileList = [{
      uid: -1,
      name: '',
      status: 'done',
      url: newBanner.picture,
      thumbUrl: newBanner.picture
    }]
    fileList = newBanner.picture?fileList:[]
    return (<section className="editPopBanner">
        <Button onClick={()=>{
          redirect('/')
        }}>返回列表</Button>
        <div className="well">
          <Form horizontal >
            <FormItem
              {...formItemLayout}
              label = 'banner 名称：'
              required
            >
              <input className="ant-input" value={newBanner.name} placeholder={'请输入banner名称'} 
                onChange={(e) =>{
                  dispatch(changeBanner({name:e.target.value}))
              }}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label = '链接地址：'
              required
            >
              <input className="ant-input" value={newBanner.url} placeholder={'请输入链接地址'} 
                onChange={(e) =>{
                  dispatch(changeBanner({url:e.target.value}))
              }}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label = '国家：'
              required
            >
              <Select style={{width:120}} value={newBanner.countryCode} onChange={(v)=>{
                dispatch(changeBanner({countryCode:v}))
              }}>
                <Option key="1" value={'SG'}>SG</Option>
                <Option key="2" value={'MY'}>MY</Option>
                <Option key="3" value={'ID'}>ID</Option>
                <Option key="4" value={'AU'}>AU</Option>
                <Option key="5" value={'TH'}>TH</Option>
              </Select>
            </FormItem>
            <FormItem horizontal
              {...formItemLayout}
              label = '有效期：'
              required
            >
              <section className="inputArea">
                <label htmlFor='startTime'>开始日期:</label>
                <DatePicker format='yyyy-MM-dd' disabledDate={disabledDate} value={newBanner.startDate?normalDataStringToTime(newBanner.startDate):''} onChange={(v)=>{
                  dispatch(changeBanner({startDate:toNormalDateString(v)}))
                }} />
              </section>
              <section className="inputArea">
                <label htmlFor='endTime'>结束日期:</label>
                <DatePicker format='yyyy-MM-dd' disabledDate={disabledDate} value={newBanner.endDate?normalDataStringToTime(newBanner.endDate):''} onChange={(v)=>{
                  dispatch(changeBanner({endDate:toNormalDateString(v)}))
                }} />
              </section>
            </FormItem>
            <FormItem horizontal
              {...formItemLayout}
              label = '上传图片：'
              required
            >
            <Upload {...props} fileList={fileList}>
              <Button type="ghost">
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
            </FormItem>
            <FormItem horizontal
              wrapperCol={{ span: 20, offset: 4 }}
            >
              <Button type="primary" htmlType="submit" onClick={()=>{
                const {newBanner} = this.props
                if(this.verifyData(newBanner)){
                  if(todo == 'add'){
                    dispatch(addBanner(newBanner))
                  }else{
                    dispatch(editBanner(newBanner))
                  }
                }
              }}>确定</Button>
            </FormItem>
          </Form>
        </div>
      </section>)
  }
}
export default editPopBanner