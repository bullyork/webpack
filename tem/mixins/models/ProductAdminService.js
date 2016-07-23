var WebApi = require("./../jslib/toastwebapi.js");

var ProductAdminService = {
    GetProductsByCategory: function(cateId, limit, offset) {
        return WebApi.do("Product.GetProductsByCategory", {
            cateId: cateId,
            limit: limit,
            offset: offset
        });
    },
    GetAllList: function(limit, offset) {
        return WebApi.do("Product.GetAllList", {
            limit: limit,
            offset: offset
        })
    },
    GetProductById: function(productId) {
        return WebApi.do("Product.GetProductById", {
            productId: productId
        });
    },
    AdminAddProduct: function(obj) {
        return WebApi.do("Product.AdminAddProduct", {
            obj: obj
        });
    },
    AdminDelteProduct: function(id) {
        return WebApi.do("Product.AdminDelteProduct", {
            id: id,
        });
    },
    AdminUpdateProductDesc: function(id, desc) {
        return WebApi.do("Product.AdminUpdateProductDesc", {
            id: id,
            desc: desc
        });
    },
    AdminUpdateProduct: function(obj) {
        return WebApi.do("Product.AdminUpdateProduct", {
            obj: obj
        });
    },
    GetProductSkusByProduct: function(productId) {
        return WebApi.do("Product.GetProductSkusByProduct", {
            productId: productId
        });
    },
    GetProductSku: function(skuId) {
        return WebApi.do("Product.GetProductSku", {
            skuId: skuId
        });
    },
    GetSkuProperty:function(productId){
        return WebApi.do("Product.GetSkuProperty",{
            productId:productId
        })
    },
    GetSkus:function(productId){
        return WebApi.do("Product.GetSkus",{
            productId:productId
        })
    },
    AdminAddProductSku: function(obj) {
        return WebApi.do("Product.AdminAddProductSku", {
            obj: obj
        });
    },
    AdminDeleteProductSku: function(id) {
        return WebApi.do("Product.AdminDeleteProductSku", {
            id: id
        });
    },
    AdminUpdateProductSku: function(obj) {
        return WebApi.do("Product.AdminUpdateProductSku", {
            obj: obj
        });
    },
    GetTags: function() {
        return WebApi.do("Product.GetTags")
    },
    UpdateProduct:function(obj){
        return WebApi.do("Product.UpdateProduct",{
            obj:obj
        })
    },
    UpdateByAdminEdit:function(obj){
        return WebApi.do("Product.UpdateByAdminEdit",{
            obj:obj
        })
    },
    UpdateEtaById:function(values){
        return WebApi.do("Product.UpdateEtaById",{
            values:values
        })
    }
}


export default ProductAdminService
