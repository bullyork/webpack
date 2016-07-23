var cmsTypes = [{
  type:'CMSpage',
  id:0,
  preview:false,
  onlyEdit:true,
  onlyRead:false,
  save:true,
  description:"CMS add page 页面地址 域名 + /CMS/page/?cmskey=键值"
},{
  type:'FAQ',
  id:2,
  preview:true,
  onlyEdit:true,
  onlyRead:true,
  save:true,
  description:"web FAQ manage"
},{
  type:'QuickGuide',
  id:4,
  preview:true,
  onlyEdit:true,
  onlyRead:false,
  save:true,
  description:"new customer quick guide edit"
},{
  type:"SEO",
  id:8,
  preview:true,
  onlyEdit:false,
  onlyRead:false,
  save:false,
  description:"every web page seo edit"
},{
  type:"Navigation",
  id:16,
  preview:false,
  onlyEdit:true,
  onlyRead:false,
  save:true,
  description:"new home page Navigation edit"
},{
  type:"NewHome",
  id:32,
  preview:false,
  onlyEdit:true,
  onlyRead:false,
  save:true,
  description:"new home need dynamic data"
},
{
  type:"Text",
  id:64,
  preview:false,
  onlyEdit:true,
  onlyRead:false,
  save:true,
  description:"key value text update"
}]

var importItem = {
  type:"Import Data",
  id:9999,
  description:'Item edit for ezbuy developer!'
};

cmsTypes.push(importItem);

export default cmsTypes

export function getCtypeItem(type){
  for(var i = 0; i < cmsTypes.length; i++){
    var ctypeItem = cmsTypes[i];
    if(ctypeItem.type === type){
      return ctypeItem;
    }
  }
}