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
class PrimeShipMent extends Component {
  componentWillMount(){
    const {dispatch} =  this.props
    dispatch(getCurrentTab('PrimeShipMent'))
  }
  render(){
    const {
      downloadUrl,
      dispatch
    } = this.props
    const props = {
      name: 'file',
      action: '/api/shops/import/PrimeShipMent',
      showUploadList: false,
      onChange: (info) => {
        console.info(info)
         if (info.file.response) {
          success('上传成功。')
          // dispatch(getDownloadUrl('/api/shops/download/Prime?refIds='+info.file.response))
        } else {
          warn('上传中..')
        }
      }
    }
    let linkToExportData = "api/shops/download/PrimeShipMentTemplate";
    return (
      <section>
        <Upload {...props}>
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
        <Button type="ghost">
            <a href={linkToExportData} className="export excelButton">Export content Template</a>
        </Button>
      </section>
    )
  }
}
export default PrimeShipMent