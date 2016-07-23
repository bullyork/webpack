import moment from 'moment'

function toTimestamp(v) {
  // to 10 位 (精确到 秒)
  return moment(v).format('X')
}
function  numberConnect(a,b) {
  a = a.toString()
  b = b.toString()
  return a+b
}
function showTimestampToDate(ts) {
  ts = String(ts)

  if (ts.length !== 10 && ts.length !== 13) {
    return '未知'
  }

  if (ts.length === 10) {
    ts = parseInt(ts) * 1000
  }

  return moment(ts).format('MM-DD')
}
function showTimestamp(ts, fmt) {
  ts = String(ts)

  if (ts.length !== 10 && ts.length !== 13) {
    return '未知'
  }

  if (ts.length === 10) {
    ts = parseInt(ts) * 1000
  }

  // WARN: Table 中 render: showTimestamp 会导致 第二个参数传入 record
  // 所以, 不要用 ES6 默认参数处理 fmt
  if (!(typeof fmt === 'string' && fmt.startsWith('YYYY'))) {
    fmt = 'YYYY-MM-DD HH:mm'
  }

  return moment(ts).format(fmt)
}

function getRequest() {
  
  const url = location.search; //获取url中"?"符后的字串
   const theRequest = new Object();
   if (url.indexOf("?") != -1) {
      const str = url.substr(1);
      const strs = str.split("&");
      for(let i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}


function equal(objA, objB)
{
    let flag = true
    for (let key in objA) {
      if(!objB.hasOwnProperty(key) || objB[key]!= objA[key]){
        flag = false
      }
    }
    for (let key in objB) {
      if(!objA.hasOwnProperty(key) || objA[key]!= objB[key]){
        flag = false
      }
    }
    return flag
}

function constraintImg(){
  // console.info(document.getElementsByTagName('img'))
  const ImgList = document.getElementsByTagName('img')
  Array.prototype.map.call(ImgList,function(item){
    const width = item.width
    item.height = width
  })

}
export {
  toTimestamp,
  numberConnect,
  showTimestampToDate,
  showTimestamp,
  getRequest,
  equal,
  constraintImg
}