import WebAPI from "../common/toastwebapi.js"

const apiUrl = '/api'

var WishlistServices = {
  ActivityConfig:(activity)=>{
    return WebAPI.do("WishListAdmin.ActivityCinfig",{activity}, apiUrl);
  },
  RemoveActivity:(activityId)=>{
    return WebAPI.do("WishListAdmin.RemoveActivity",{activityId}, apiUrl);
  },
  ActivityConditionConfig:(activityCondition)=>{
    return WebAPI.do("WishListAdmin.ActivityConditionConfig", {activityCondition}, apiUrl);
  },
  GetActivityCondition:(countryCode)=>{
    return WebAPI.do("WishListAdmin.GetActivityCondition",{countryCode}, apiUrl);
  },
  ListActivityPage:(limit, offset, countryCode)=>{
    return WebAPI.do("WishListAdmin.ListActivityPage",{
      limit,
      offset,
      countryCode
    }, apiUrl);
  },
  GetActivityDetail:(activityId)=>{
    return WebAPI.do("WishListAdmin.GetActivityDetail",{
      activityId
    }, apiUrl);
  },
  CheckPrimeProduct:(productId,status, primeShipment)=>{
    return WebAPI.do("WishListAdmin.CheckPrimeProduct",{
      productId,
      status,
      primeShipment}, apiUrl);
  },
  BulkCheckoutPrimeProduct:(productIds, status, primeShipment)=>{
    return WebAPI.do("WishListAdmin.BulkCheckoutPrimeProduct",{
      productIds,
      status,
      primeShipment},apiUrl)
  },
  ListPrimeProduct:(userId, url, status, countryCode, limit, offset, startTime, endTime, activityId)=>{

    return WebAPI.do("WishListAdmin.ListPrimeProduct",{
      userId,
      url,
      status,
      countryCode,
      limit,
      offset,
      startTime,
      endTime,
      activityId
    },apiUrl);
  }
}


export default WishlistServices