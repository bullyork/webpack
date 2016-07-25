import moment from 'moment'

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

function toTimestamp(v) {
  return moment(v).format('x')
}
function getPictureUrl(picture){
  if(picture.indexOf('http')!= -1){
    return 'url('+picture+')'
  }else{
    return 'url('+'http:'+picture+')'
  }
}
function minTimestampToMs(ts){
  ts = String(ts)
  return ts.length == 10 ? parseInt(ts) * 1000 : parseInt(ts)
}
//index 为当前所选，order为要插入的排序
function arrayInsert(index, order, list){
  const temp = list[index]
  list.splice(index, 1)
  list.splice(order, 0, temp)
  return list
}

function uniqueSort(array){
  let left = []
  let right = []
  for (let i = 0; i < array.length; i++) {
    if(array[i].disabled){
      right.push(array[i])
    }else{
      left.push(array[i])
    }
  }
  return Array.concat([],left,right)
}

function toNormalDateString(date){
  const dateArray = date.toLocaleDateString().split('/')
  let [a,b,c] = dateArray
  if(a.length == 4){
    b = b.length < 2?'0'+b:b
    c = c.length < 2?'0'+c:c
    return a+b+c
  }else{
    b = b.length < 2?'0'+b:b
    a = a.length < 2?'0'+a:a
    return c+a+b
  }
}

function normalDataStringToTime(date){
  const year = Number(date.slice(0,4))
  const month = Number(date.slice(4,6))-1
  const day = Number(date.slice(6,8))
  return new Date(year,month,day)
}
function distinguishCashAndRegister(list){
  let cashList = []
  let registerList = []
  for (let i = 0; i < list.length; i++) {
    if(list[i].duration == 0){
      cashList.push(list[i])
    }else{
      registerList.push(list[i])
    }
  }
  return {
    cashList,
    registerList
  }
}
function getRequest() { 
  var url = location.search; //获取url中"?"符后的字串 
  var theRequest = new Object(); 
  if (url.indexOf("?") != -1) { 
    var str = url.substr(1); 
    var strs = str.split("&"); 
    for(var i = 0; i < strs.length; i ++) { 
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
    } 
  } 
  return theRequest; 
} 
export {
  distinguishCashAndRegister,
  toTimestamp,
  minTimestampToMs,
  getPictureUrl,
  arrayInsert,
  uniqueSort,
  toNormalDateString,
  normalDataStringToTime,
  showTimestampToDate,
  getRequest
}