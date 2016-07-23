import React,{ Component } from 'react'
import { toTimestamp,minTimestampToMs } from '../../util/kit'
import { DatePicker, Modal, Select, Button, Icon } from 'antd'
import { warn, success } from '../../util/antd'
import { getPopStatus} from '../../action/hpArrange'
import { getToken } from '../../api/hpArrange'
import {popStatusClear} from '../../constant/index'
import { Upload } from 'antd'
import Config from '../../common/config'
const Option = Select.Option
const assign = Object.assign
class Pop extends Component{
  constructor(props) {
    super(props)
    this.state = {
      startAt:-1,
      endAt:-1,
      baseUrl:'',
      token:'',
      imageUrl: '',
      order: -1
    }
  }
  handleSubmit(){
    const {
      startAt,
      endAt,
      imageUrl,
      order,
      visible
    } = this.state


    const {
      inputList,
      updateData,
      index,
      dataTimePicker,
      dispatch,
      k,
      imgType,
      action,
      info,
      upload,
      sort,
      preLength
    } = this.props
    let data = {}
    if(imageUrl){
      data[imgType] = imageUrl
    }
    for (let i = inputList.length - 1; i >= 0; i--) {
      if(this.state[inputList[i]]){
        data[inputList[i]] = this.state[inputList[i]]
      }
    }
    var linkAddress = this.state.linkAddress || '';
    var find = linkAddress.indexOf('http');
    if(find != -1){
      if (!confirm("使用绝对路径有可能造成跳转错误，您确认添加吗？")) {
          return
      }
    }
    if(startAt !== -1){
      data.startAt = startAt
    }
    if (endAt !== -1) {
      data.endAt = endAt
    }
    if(visible == true || visible == false){
      data.visible = visible
    }
    updateData(data, index, k, action, order)
    this.setState({imageUrl: '',startAt:0,endAt:0})
    dispatch(getPopStatus(popStatusClear))
  }
  componentWillMount(){
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
    })
    }
    )
  }
  render(){
    const {
      token,
      baseUrl,
      imageUrl
    } = this.state
    const props = {
      name: 'file',
      action: Config.QINIU_UPLOAD_URL,
      data: {token: token},
      showUploadList: false,
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList = fileList.slice(-2)
        this.setState({ fileList })
         if (info.file.status === 'done') {
          success(`${info.file.name} 上传成功。`)
          this.setState({imageUrl: baseUrl+info.file.response.key})
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
      let {
        dataTimePicker,
        inputList,
        visible,
        dispatch,
        upload,
        sort,
        index,
        preLength,
        action
      } = this.props
      let {info} = this.props
      info = assign({},{startAt:0,endAt:0,name:'',linkAddress:'',visible:true},info)
      const inputs = inputList.map((item, index) => {
        if(item != 'visible'){
          return (
            <section className="inputArea" key={index}>
              <label htmlFor={item}>{item}:</label>
              <input placeholder={info[item]} type = "text" name={item} onChange={
                (e)=>{
                  if(item == 'price'){
                    this.setState({[item]: Number(e.target.value)});
                  }else{
                    this.setState({[item]: e.target.value});
                  }
                }
              }/>
            </section>
          )
        }else{
          return (
          <section className="inputArea" key={index}>
            <label htmlFor={item}>{item}:</label>
            <Select defaultValue={info.visible} style={{ width: 120 }} onChange={(v) =>{
              this.state.visible = v
            }}>
              <Option value={true}>是</Option>
              <Option value={false}>否</Option>
            </Select>
          </section>
          )
        }
        
      })
      const timePicker = dataTimePicker&&(
        <section className="datetime">
          <section className="inputArea">
            <label htmlFor='startTime'>startTime:</label>
            <DatePicker defaultValue={info.startAt?new Date(minTimestampToMs(info.startAt)):''} format='yyyy-MM-dd HH:mm:ss' showTime
               onChange={v => {
                this.setState({startAt:parseInt(toTimestamp(v))})
              }}/>
          </section>
          <section className="inputArea">
            <label htmlFor='endTime'>endTime:</label>
            <DatePicker defaultValue={info.endAt?new Date(minTimestampToMs(info.endAt)):''} showTime format='yyyy-MM-dd HH:mm:ss'
               onChange={v => {
                this.setState({endAt:parseInt(toTimestamp(v))})
              }}/>
          </section>
        </section>
      )
      const uploadArea = upload&&(
        <Upload {...props} fileList={this.state.fileList}>
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
        )
      let sortOptions =[]
      for (let i = 1; i < sort+1; i++) {
        sortOptions.push(
          <Option value={i}>{i}</Option>
        )
      }
      if(preLength>0){index =index - preLength}
      const sortSelect = sort&&(
        <section className="inputArea">
          <label>排序:</label>
          <Select defaultValue={index+1} style={{ width: 120 }} onChange={(v) =>{
            this.setState({order: v})
          }}>
            {sortOptions}
          </Select>
        </section>
      )

      const getTitle = () =>{
        if (action == 'add') {
          return '添加图片'
        }else if(action == 'delete'){
          return '删除图片'
        }else{
          return '替换图片'
        }
      }
      const getTips = () =>{
        if(action == 'delete'){
          return '确认删除图片？'
        }else{
          return
        }
      }
    return(
      <Modal title={getTitle()} visible={visible}
          onOk={()=>this.handleSubmit()} 
          onCancel={()=>dispatch(getPopStatus(popStatusClear))}>
        {getTips()}
        {uploadArea}
        {timePicker}
        {inputs}
        {sortSelect}
      </Modal>
    )
  }
}
export default Pop