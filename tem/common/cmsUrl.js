let web_hostname = location.hostname;
let online = web_hostname.indexOf(/ezbuy.sg|my.ezbuy.com|au.ezbuy.com|65daigou.com/) !== -1;

let previewUrlBook = null;

if(!online){
  previewUrlBook = {
    "SG":"//sg.65emall.net",
    "MY":"//my.65emall.net",
    "AU":"//au.65emall.net"
  }
}else{
  previewUrlBook = {
    "SG":"//ezbuy.sg",
    "MY":"//my.ezbuy.com",
    "AU":"//au.ezbuy.com"
  }
}


var CmsUrl = {
  getPreviewUrl:function(area){
    return previewUrlBook[area];
  },
  online:online
}

export default CmsUrl