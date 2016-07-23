import React,{Component} from 'react'
import {connect} from 'react-redux'
import { warn, success} from '../../../util/antd'
import {Row, Col, Table, Button, Input, Upload, Icon} from 'antd'
import {
  getDownloadUrl,
  getCurrentTab
} from '../../../action/shops'

@connect(state => ({
  downloadUrl: state.downloadUrl
}))
class ImportToPrime extends Component {
  componentWillMount(){
    const {dispatch} =  this.props
    dispatch(getCurrentTab('ImportToPrime'))
  }
  render(){
    const linkToImportData = 'api/shops/download/PrimeImportTemplate'
    const {
      downloadUrl,
      dispatch
    } = this.props
    const props = {
      name: 'file',
      action: '/api/shops/import/Prime',
      showUploadList: false,
      beforeUpload: (file) => {
        dispatch(getDownloadUrl(''))
      },
      onChange: (info) => {
         if (info.file.response) {
          success('上传成功。')
          dispatch(getDownloadUrl('/api/shops/download/Prime?refIds='+info.file.response))
        } else {
          warn('上传中..')
        }
      }
    }
    const getButton = () =>{
      if(downloadUrl){
        return(
          <section>
            <Button onClick = {
              () => {window.location.href = downloadUrl}
            }>下载</Button>
            <Button type="ghost">
                <a href={linkToImportData} >Import content Template</a>
            </Button>
            <span style={{color:'green'}}>导入成功了哦，^_^</span>
          </section>
        )
      }else{
        return(
          <section>
            <Button disabled>下载</Button>
            <Button type="ghost">
              <a href={linkToImportData} >Import content Template</a>
          </Button>
          </section>
        )
      }
    }
    return (
      <section>
        <Upload {...props}>
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
        {getButton()}
      </section>
    )
  }
}
export default ImportToPrime