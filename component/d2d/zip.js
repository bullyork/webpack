import React,{Component} from 'react'
import { connect } from 'react-redux'
import store from '../../store/d2d'
import { Form, Input, Table, Button, Modal, message } from 'antd'
import { Link } from "react-router"
import { getZipGroups, addZipGroup, editZipGroup, updateZipGroup, deleteZipGroup, cancelEdit, openDialog, closeDialog } from '../../action/d2d'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const columns = [{
  title: 'Code',
  dataIndex: 'name',
  key: 'name',
  width: 300
},{
  title: 'Area',
  dataIndex: 'postCodes',
  key: 'postCodes',
  width: 400,
  render (text, record) {
    return text.split(',').join(' ')
  }  
},{
  title: 'Operation',
  key: 'operation',
  width: 200,
  render (text, record) {
    return (
      <div>
        <Button style={{marginLeft: 5}} onClick={()=>{store.dispatch(editZipGroup(record.id))}}>Edit</Button>
        <Button style={{marginLeft: 5}} onClick={()=>{confirm("Are you sure wanna delete?") && store.dispatch(deleteZipGroup(record.id, ()=>{store.dispatch(getZipGroups())}))}}>Delete</Button>
      </div>
    )
  }
}]

@connect(state => ({zipGroups: state.zipGroups}))
class Main extends Component {

  componentDidMount() {
      if (this.props.zipGroups.length === 0) this.props.dispatch(getZipGroups())
  }

  onPageChange(n) {
    const { dispatch, zipGroups } = this.props
    if (n * 10 >= zipGroups.length) {
      const hide = message.loading('loading more ...')
      dispatch(getZipGroups(zipGroups.length, 20, hide))
    }
  }

  render () {
    const ds = this.props.zipGroups.map((zipGroup) => {
      return {
        id: zipGroup.ID,
        name: zipGroup.name,
        postCodes: zipGroup.postCodes ? zipGroup.postCodes.join(',') : ''
      }
    })

    const pagination = {
      size: ds.length,
      onChange: this.onPageChange.bind(this)
    }

    return (
      <div>
        <Button type="primary" style={{marginBottom: 5}} onClick={ this.create.bind(this) }>Create</Button>
        <Table dataSource={ds} pagination={pagination} columns={columns} />

        <AddZipGroupDialog />
        <EditZipGroupDialog />
      </div>
    )
  }

  create () {
    const { dispatch } = this.props

    dispatch(openDialog('addZipGroupDialog'))

  }
}


@connect(state => ({visible: state.dialog.addZipGroupDialog}))
class AddZipGroupDialog extends Component {
  constructor(props){
    super(props)
    this["onOk"].bind(this)
  }

  render () {
    const { dispatch } = this.props
    return (
      <Modal
        title = "Add Zip Group"
        visible = { this.props.visible }
        onCancel = {() => { dispatch(closeDialog('addZipGroupDialog'))} }
        onOk = { this.onOk.bind(this) }
        >

      <ZipGroupEditPanel ref="editPanel"/>
      </Modal>
    )
  }

  onOk () {
    const { dispatch } = this.props
    this.refs.editPanel.validateFieldsAndScroll((error, zipGroup)=>{
      if (!!error) return

      dispatch(addZipGroup(zipGroup, () => {
        this.refs.editPanel.resetFields()
        dispatch(closeDialog('addZipGroupDialog'))
        dispatch(getZipGroups())
      }))
    })
  }
}

@connect(state => ({editingZipGroupId: state.editingZipGroupId}))
class EditZipGroupDialog extends Component {
  constructor (props) {
    super(props)
    this['onOk'].bind(this)
  }

  render () {
    const { dispatch } = this.props
    return (
      <Modal
        title = "Edit Driver"
        visible = { !!this.props.editingZipGroupId }
        onCancel = {() => { 
          this.refs.editPanel.resetFields() 
          dispatch(cancelEdit())} 
        }
        onOk = { this.onOk.bind(this) }
        >
        <ZipGroupEditPanel ref="editPanel" />
      </Modal>
    )
  }

  onOk () {
    const { dispatch } = this.props
    this.refs.editPanel.validateFieldsAndScroll((error, zipGroup) => {
      if (!!error) return

      dispatch(updateZipGroup(Object.assign({}, zipGroup, {ID: this.props.editingZipGroupId, postCodes: zipGroup.postCodes.split(' ')}), () => {
        this.refs.editPanel.resetFields()
        dispatch(cancelEdit())
        dispatch(getZipGroups())
      }))
    })
  }
}


@Form.create()
@connect(state => ({editingZipGroup: state.zipGroups.find(zg => state.editingZipGroupId === zg.ID)}))
class ZipGroupEditPanel extends Component {

  componentDidMount() {
    const { setFieldsValue } = this.props.form
    // setFieldsValue(this.props.editingZipGroup)     
  }

  checkPostCodes(rule, value, callback) {
    let postCodes = value.split(' ')
    for (let i = 0, length = postCodes.length; i < length; i++) {
      if ((postCodes[i].length != 6) || isNaN(parseInt(postCodes[i]))) callback('invalid post codes')
    }

    callback()
  }

  render () {
    const { getFieldProps } = this.props.form

    const nameProps = getFieldProps('name', {
      initialValue: this.props.editingZipGroup ? this.props.editingZipGroup.name : '',
      rules: [{
        required: true, message: 'please input name'
      }]
    })

    const postCodesProps = getFieldProps('postCodes',{
      initialValue: this.props.editingZipGroup ? this.props.editingZipGroup.postCodes.join(' ') : '',
      rules: [{
        required: true, message: 'invalid post codes'
      }, {
        validator: this.checkPostCodes
      }]
    })
    return (
      <Form horizontal form={this.props.form}>
        <FormItem {...formItemLayout} label="Code:">
          <Input type="text" {...nameProps}
            placeholder="Watten Estate, Novena, Thomson" 
            disabled={false} />
        </FormItem>
        <FormItem {...formItemLayout} label="Area:">
          <Input type="text" {...postCodesProps} 
            placeholder="280000 290000 300000" 
            disabled={false} />
        </FormItem>
      </Form>
    )
  }
}


export default Main