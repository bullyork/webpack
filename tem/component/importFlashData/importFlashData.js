import React,{Component} from 'react'
import { warn, success} from '../../util/antd'
import {Upload, Button, Icon} from "antd"
class ImportFlashData extends Component{
  constructor(props) {
    super(props)
    this.state = {
      status:''
    }
  }
  render(){
    const props = {
      name: 'file',
      action: 'api/FeatureCollection/ImportFlashData',
      showUploadList: false,
      onChange: (info) => {
        this.setState({status:''})
        if(info.file.response){
          success('上传成功！')
          this.setState({status:'上传成功！'})
        }
      }
    }
    const {status} = this.state
    return(
      <section>
        <Upload {...props}>
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
          <p>{status}</p>
        </Upload>
      </section>
      )
  }
}
export default ImportFlashData