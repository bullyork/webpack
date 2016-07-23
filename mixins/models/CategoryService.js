var WebApi = require("./../jslib/toastwebapi.js");

var CategoryService = {
    GetCategories: function(parentId) {
        return WebApi.do("Category.GetCategories", {
            parentId: parentId
        });
    },
    GetCategory: function(CategoryId) {
        return WebApi.do("Category.GetSingleById", {
            id: CategoryId
        });
    },
    GetAllCategories: function() {
        return WebApi.do("Category.GetAllCategories", {});
    },
    AdminUpdateCategory: function(cate) {
        return WebApi.do("Category.AdminUpdateCategory",
            cate
        );
    },
    AdminAddCategory: function(cate) {
        return WebApi.do("Category.AdminAddCategory",
            cate
        );
    },
    AdminDelteCategory: function(id) {
        return WebApi.do("Category.AdminDelteCategory", {
            id: id
        });
    },
}

export default CategoryService
