import CmsServices from "./../models/CmsServices.js";

export const ADD = "ADD"
export const EDIT_EDIT = "EDIT"
export const UPDATE_EDIT = "UPDATE_EDIT"
export const UPDATE_HTML = "UPDATE_HTML"
export const REMOVE = "REMOVE"
export const SEARCH_EDIT = "SEARCH"
export const SEARCH_EDIT_ITEM = "SEARCH_EDIT_ITEM"
export const SEARCH_PRO_ITEM = "SEARCH_PRO_ITEM"
export const PUBLISH_ITEM = "PUBLISH_ITEM"
export const REVERT_ITEM = "REVERT_ITEM"
export const DELETE_ITEM = "DELETE_ITEM"
export const LIST_EDIT_ITEMS = "LIST_EDIT_ITEMS"
export const LIST_PRO_ITEMS = "LIST_PRO_ITEMS"
export const CHANGE_LANG = 'CHANGE_LANG'
export const CHANGE_COUNTRYCODE = "CHANGE_COUNTRYCODE"
export const CHANGE_CTYPE = "CHANGE_CTYPE"
export const CHANGE_KEY = "CHANGE_KEY"
export const FULL_ADD_ITEM = "FULL_ADD_ITEM"
export const CHANGE_EDIT = "CHANGE_EDIT"
export const CHANGE_EDIT_CONTENT = "CHANGE_EDIT_CONTENT"


export function searchEdit(cb){
  return (dispatch,getState)=>{
    const {area, lang, ctype} = getState();

    var limit = 1000;
    var offset = 0;
    var isPublish = 0;

    return CmsServices.ShowCmsEditSubject({limit, offset, area, lang, isPublish, ctype}).then((data)=>{
      dispatch({type:SEARCH_EDIT,data})
      if(cb){
        cb();
      }
    })
  }
}

export function changeCtype(ctype){
  return (dispatch,getState)=>{
    dispatch({type:CHANGE_CTYPE,ctype})
    dispatch(changeKey('')) //改变类型 将选中的重置

    if(ctype !== ''){
      dispatch(searchEdit())
    }
  }
}

export function changeCountryCode(countryCode){
  return (dispatch, getState)=>{
    dispatch({type:CHANGE_COUNTRYCODE, countryCode});
    dispatch(searchEdit())
  }
}

export function changeLang(lang){
  return (dispatch, getState)=>{
    dispatch({type:CHANGE_LANG, lang})
    dispatch(searchEdit())
  }
}


export function changeKey(key){
  return (dispatch,getState)=>{
    dispatch({type:CHANGE_EDIT_CONTENT, editContent: null})
    dispatch({type:CHANGE_EDIT, edit:false})

    dispatch(searchEditItem(key,function(){

      dispatch({type:CHANGE_KEY,key})

    }))
  }
}

export function searchEditItem(key,cb){
  return (dispatch,getState)=>{
    if(key !== ''){
      return CmsServices.GetEditCmsSubject({key:key}).then(function(data){
        dispatch({type:SEARCH_EDIT_ITEM,data})
        if(cb){
          cb(data);
        }
      });
    }else{
      if(cb){
        cb();
      }
      return {type:SEARCH_EDIT_ITEM}
    }

  }
}

export function updateEditHtml(key,html,cb){
  return (dispatch,getState)=>{
    return CmsServices.UpdateCmsEditSubJectHtml({key:key,html:html}).then(function(data){
      if(data){
        dispatch({type:UPDATE_HTML,data});
        dispatch(changeKey(key))
      }else{
        alert("save data failed!");
      }
      if(cb){
        cb(data);
      }
    })
  }
}


export function publishItem(key, cb){
  return (dispatch, getState)=>{
    const {cmsKey} = getState();

    return CmsServices.PublishCmsSubject({key:key}).then(function(data){
      if(data){
        dispatch({type:PUBLISH_ITEM,data});
        dispatch(changeKey(cmsKey))
      }else{
        console.log("发布数据失败!");
      }
      cb(data);
    })
  }
}

export function revertItem(key,cb){
  return (dispatch, getState)=>{
    const {cmsKey} = getState();

    return CmsServices.RevertVersion({key:key}).then(function(data){
      if(data){
        dispatch({type: REVERT_ITEM, data});
        dispatch(changeKey(cmsKey))
      }else{
        console.log("倒退版本失败!");
      }
      cb(data);
    })
  }
}

export function deleteItem(key,cb){
  return (dispatch, getState)=>{
    const {ctype} = getState();

    return CmsServices.RemoveCmsEditSubject({key: key}).then(function(data){
      if(data){
        dispatch({type:DELETE_ITEM,data});
        dispatch(changeCtype(ctype))
      }else{
        console.log("删除数据失败!");
      }
      cb(data);
    })
  }
}


export function changeEdit(edit){
  return (dispatch, getState)=>{
    dispatch({type:CHANGE_EDIT, edit});
  }
}

export function changeEditContent(editContent){
  return (dispatch, getState)=>{
    dispatch({type:CHANGE_EDIT_CONTENT, editContent})
  }
}


export function fullAddItem(params,cb=()=>{}){
  return (dispatch,getState)=>{
    return CmsServices.FullAddCmsEditSubject(params).then(function(data){
      dispatch({type:FULL_ADD_ITEM,data});
      dispatch(searchEdit())
      cb(data);
    });
  }
}


