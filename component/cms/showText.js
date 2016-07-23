var langsBook ={
  "en":"English",
  "zh-CN":"Chinese",
  "th":"Thai",
  "id":"Indonesian"
};

var areasBook ={
  "SG":"Singapore",
  "MY":'Malaysia',
  "AU":"Australia",
  "TH":"Thailand",
  "ID":" Indonesia"
};

var showText = {
  getLangText:function(code){
    return langsBook[code];
  },
  getAreaText:function(code){
    return areasBook[code];
  },
  langsBook:langsBook,
  areasBook:areasBook
}

export default showText