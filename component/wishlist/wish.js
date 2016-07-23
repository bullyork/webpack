export const primeShipmentBooks = {
  "1":"经济空运",
  "2":"海运"
}


export const statusTexts = {
  "0":"Varifying",
  "1":"Approve",
  "2":"Reject",
  "3":"All Status"
};

export const checkError = {
  "-1":"审核错误",
  "-2":"商品cid不允许通过",
  "0":"successful"
}


export const ObjQual = (aObj, bObj)=>{
  var keysA = Object.keys(aObj);
  var keysB = Object.keys(bObj);

  if(keysA.length !== keysB.length){
    return false;
  }

  return keysA.every((key)=>{
    return aObj[key] !== bObj[key];
  })
}