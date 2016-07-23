import WebApi from "./../../../common/toastwebapi.js"
import Config from "./../../../common/config.js"

function GetNewHomeBannerList(countryCode,bannerType,offset,limit){
  return WebApi.do(
    "AdminHomepage.GetNewHomeBannerList", 
    {countryCode,bannerType,offset,limit},
    Config.API_HOMEPAGE
  )
}

function AddNewHomeBanner(banner){
  return WebApi.do(
    "AdminHomepage.AddNewHomeBanner", 
    {banner},
    Config.API_HOMEPAGE
  )
}


function UpdateNewHomeBanner(banner){
  return WebApi.do(
    "AdminHomepage.UpdateNewHomeBanner", 
    {banner},
    Config.API_HOMEPAGE
  )
}


function DeleteNewHomeBanner(id){
  return WebApi.do(
    "AdminHomepage.DeleteNewHomeBanner", 
    {id},
    Config.API_HOMEPAGE
  )
}

export {
  GetNewHomeBannerList,
  AddNewHomeBanner,
  UpdateNewHomeBanner,
  DeleteNewHomeBanner,
}

