import WishlistServices from './../models/WishlistServices.js'

export const CHANGE_COUNTRY_CODE = "CHANGE_COUNTRY_CODE"
export const SETTING_DATA = "SETTING_DATA"
export const CHANGE_STATUS = "CHANGE_STATUS"
export const ACTIVITY_DATA = "ACTIVITY_DATA"
export const SELECTED_DATA = "SELECTED_DATA"
export const CHANGE_LIMIT = "CHANGE_LIMIT"
export const CHANGE_OFFSET = "CHANGE_OFFSET"
export const ACTIVITY_ID = "ACTIVITY_ID"
export const LIST_DATA = "LIST_DATA"
export const CHANGE_TOTALCOUNT = "CHANGE_TOTALCOUNT"
export const SEARCH_CONDITION = "SEARCH_CONDITION"
export const CURRENT_ACTIVITY = "CURRENT_ACTIVITY"

var formatTime  = function (timeObj, fmt) {

    //author: meizz
    var o = {
        "M+": timeObj.getMonth() + 1, //月份
        "d+": timeObj.getDate(), //日 
        "H+": timeObj.getHours(), //小时 
        "m+": timeObj.getMinutes(), //分 
        "s+": timeObj.getSeconds(), //秒 
        "q+": Math.floor((timeObj.getMonth() + 3) / 3), //季度 
        "S": timeObj.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (timeObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
}

export const ActivityConfig = (activity,cb)=>{
  return (dispatch, getState)=>{
    const {countryCode} = getState();
    activity.countryCode = countryCode;

    for(var prp in activity){
      var item = activity[prp];
      if(typeof item === 'object' && item.getTime){
        activity[prp] = formatTime(item, "yyyy-MM-dd HH:mm:ss");
      }
    }
    return WishlistServices.ActivityConfig(activity).then((data)=>{
      cb(data);

      if(data.code === 0){
        dispatch(ListActivityPage());
      }
    })
  }
}

export const ActivityConditionConfig = (activityCondition, cb) =>{
  return (dispatch, getState)=>{
    const {countryCode} = getState();
    activityCondition.countryCode = countryCode;

    for(var prp in activityCondition){
      var item = activityCondition[prp];
      if(typeof item === 'object' && item.getTime){
        activityCondition[prp] = formatTime(item, "yyyy-MM-dd HH:mm:ss");
      }
    }
    return WishlistServices.ActivityConditionConfig(activityCondition).then((data)=>{
      cb(data);
    })
  }
}

export const GetActivityCondition = (cb)=>{
  return (dispatch, getState)=>{
    const {countryCode} =  getState();
    return WishlistServices.GetActivityCondition(countryCode).then((data)=>{
      cb(data);
    })
  }
}

export const RemoveActivity = (activityId, cb) =>{
  cb = cb || function(){};
  return (dispatch, getState)=>{

    return WishlistServices.RemoveActivity(activityId).then((data)=>{
      cb(data);

      if(data.code === 0){
        dispatch(ListActivityPage());
      }
    })
  }
}

export const ListActivityPage = (cb)=>{

  let callback = cb || function(){};

  return (dispatch, getState)=>{
    const {countryCode} = getState();

    return WishlistServices.ListActivityPage(100, 0, countryCode).then((data)=>{
      let listActivityData = data.activitys;

      var currentActivity = listActivityData.find((item)=>{
        let {startTime, expireTime} = item;
        let nT = new Date().getTime();

        return (nT > new Date(startTime).getTime() && nT < new Date(expireTime).getTime());
      });

      currentActivity = currentActivity || {};


      dispatch(changeActivity(currentActivity.id || "")) //可能都过期了

      dispatch({
        type:CURRENT_ACTIVITY,
        currentActivity
      });


      dispatch({
        type:ACTIVITY_DATA,
        listActivityData
      });

      callback(data);

    })
  }
}

export const GetActivityDetail = (activityId,cb)=>{
  return (dispatch, getState)=>{
    return WishlistServices.GetActivityDetail(activityId).then((data)=>{
      // console.log(data);
      const settingData = data;
      dispatch({
        type: SETTING_DATA,
        settingData
      })
    })
  }
}

export const CheckPrimeProduct = (productId,status, primeShipment,cb)=>{
  return (dispatch, getState)=>{
    return WishlistServices.CheckPrimeProduct(productId, status, primeShipment).then((data)=>{
      cb(data);
    })
  }
}


export const BulkCheckoutPrimeProduct = (productIds, status, primeShipment,cb)=>{
  return (dispatch, getState)=>{
    return WishlistServices.BulkCheckoutPrimeProduct(productIds, status, primeShipment).then((data)=>{
      if(cb){
        cb(data);
      }
    })
  }
}

export const ListPrimeProduct = (userId, url, status, countryCode, limit, offset, startTime, endTime, activityId, cb)=>{
  return (dispatch, getState)=>{
    return WishlistServices.ListPrimeProduct(userId, url, status, countryCode,limit, offset, startTime, endTime, activityId).then((data)=>{

      if(typeof data.message !== "undefined"){
        return;
      }

      let listData = data.products;
      let totalCount = data.total;

      dispatch({
        type:CHANGE_TOTALCOUNT,
        totalCount
      })

      dispatch({
        type:LIST_DATA,
        listData
      })
    })
  }
}

export const changeCountryCode = (countryCode) => {
  return (dispatch, getState)=>{
    dispatch({type:CHANGE_COUNTRY_CODE, countryCode})
  }
}


export const changeSettingData = (settingData)=>{
  return (dispatch, getState)=>{
    dispatch({
      type:SETTING_DATA,
      settingData
    })
  }
}


export const changeActivity = (activityId)=>{
  return (dispatch, getState)=>{
    dispatch(changeSearchCondition({activityId}))

    dispatch({
      type:ACTIVITY_ID,
      activityId
    })
  }
}

export const changeSearchCondition = (searchCondition) =>{
  return (dispatch, getState) =>{

    const {countryCode, limit, offset, status, activityId} = getState();

    searchCondition = Object.assign({countryCode, limit, offset, status, activityId}, searchCondition)

    for(var prp in searchCondition){
      var item = searchCondition[prp];
      if(typeof item === 'object' && item !== null && item.getTime){
        searchCondition[prp] = formatTime(item, "yyyy-MM-dd HH:mm:ss");
      }
    }

    dispatch({
      type:SEARCH_CONDITION,
      searchCondition
    })
  }
}


export const changeListData = (listData)=>{
  return (dispatch, getState)=>{
    dispatch({
      type:LIST_DATA,
      listData
    })
  }
}


export const changeSelectedData = (selectedData)=>{
  return (dispatch, getState)=>{
    dispatch({
      type:SELECTED_DATA,
      selectedData
    })
  }
}



export const changeLimit = (limit)=>{
  return (dispatch, getState)=>{

    dispatch({
      type:CHANGE_LIMIT,
      limit
    })
  }
}

export const changeOffset = (offset)=>{
  return (dispatch, getState)=>{
    dispatch({
      type:CHANGE_OFFSET,
      offset
    })
  }
}


export const changeStatus = (status)=>{

  return (dispatch, getState)=>{

    dispatch(changeSearchCondition({status}))


    dispatch({type:CHANGE_STATUS, status})
  }
}