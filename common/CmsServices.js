import WebAPI from "./toastwebapi.js"

const apiUrl = '/api/cms'

var CmsServices = {
    AddCmsEditSubject:function(params){
        // 1:string key, 2:string name
        return WebAPI.do("Cms.AddCmsEditSubject",params, apiUrl);
    },
    UpdateCmsEditSubject:function(params){
        // 1:string key, 2:string name, 3:string area, 4:string lang, 5:string path, 6:string ctype
        return WebAPI.do("Cms.UpdateCmsEditSubject",params, apiUrl);
    },
    UpdateCmsEditSubJectHtml:function(params){
        // 1:string key, 2:string html
        return WebAPI.do("Cms.UpdateCmsEditSubJectHtml",params, apiUrl);
    },
    RemoveCmsEditSubject:function(params){
        // 1:string key
        return WebAPI.do("Cms.RemoveCmsEditSubject",params, apiUrl);
    },
    ShowCmsEditSubject:function(params){
        // 1: i32 limit, 2: i32 offset,3: string area,4: string lang, 5: i32 isPublish
        return WebAPI.do("Cms.ShowCmsEditSubject",params, apiUrl);
    },
    GetEditCmsSubject:function(params){
        // 1:string key
        return WebAPI.do("Cms.GetEditCmsSubject",params, apiUrl);
    },
    GetProCmsSubject:function(params){
        // 1:string key
        return WebAPI.do("Cms.GetProCmsSubject",params, apiUrl);
    },
    PublishCmsSubject:function(params){
        // 1:string key
        return WebAPI.do("Cms.PublishCmsSubject",params, apiUrl);
    },
    RevertVersion:function(params){
        // 1:string key
        return WebAPI.do("Cms.RevertVersion",params, apiUrl);
    },
    ListCmsEditSubjects:function(params){
        // 1:list<string> keys
        return WebAPI.do("Cms.ListCmsEditSubjects",params, apiUrl);
    },
    ListCmsProSubjects:function(params){
        // 1:list<string> keys
        return WebAPI.do("Cms.ListCmsProSubjects",params, apiUrl);
    },
    FullAddCmsEditSubject:function(params){
        return WebAPI.do("Cms.FullAddCmsEditSubject",params, apiUrl);
    }
}

export default CmsServices
