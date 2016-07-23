import {WebApi} from './jsonrpc/jsonrpc.js';
import {AccountURL} from './../helpers/api.js';

var Account = {
  Register:function(params){
    return WebApi.do(AccountURL(),"Account.Register", params);
  }
}

export default Account