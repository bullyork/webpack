
import { message } from 'antd'

// for Modal
function noLoading() {
  this.setState({
    confirmLoading: false
  })
}

function success(text, duration = 3) {
  message.success(text, duration)
}

function info(text, duration = 3) {
  message.info(text, duration)
}

function warn(text, duration = 3) {
  message.error(text, duration)
}

export {
  noLoading,
  success,
  info,
  warn
}
