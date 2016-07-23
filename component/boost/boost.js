import React,{Component} from 'react'
import { warn, success} from '../../util/antd'
import {Upload, Button, Icon} from "antd"
class Boost extends Component{
  render(){
    const props = {
      name: 'file',
      action: '/api/Boost/ImportBoostProduct',
      showUploadList: false,
      onChange: (info) => {
        if(info.file.response){
          success('上传成功！')
        }
      }
    }
    return(
      <section>
        <Upload {...props}>
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
      </section>
      )
  }
}
export default Boost