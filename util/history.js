
import { hashHistory as history } from 'react-router'
import Debug from './debug'

const debug = Debug('util:history')

function back() {
  history.goBack()
}

function redirect(pathname, query = {}) {
  debug('pathname: %s, query: %o', pathname, query)
  const qs = Object.keys(query).map(key => key + '=' + query[key]).join('&')
  history.push({
    search: qs ? '?' + qs : '',
    pathname,
  })
}

function getTargetLink(route) {
  const {
    protocol,
    host,
    pathname,
  } = window.location

  return protocol + '//' + host + pathname + '#' + route
}

function isBack() {
  return location.hash.indexOf('type=back') !== -1
}

export {
  getTargetLink,
  redirect,
  history,
  isBack,
  back
}
