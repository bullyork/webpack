var URLMaker = {
    product: {
        add: function(categoryId) {
            if (categoryId) {
                return "product.html#product/add/" + categoryId;
            }
            return "product.html#product/add";
        },
        edit: function(categoryId, editId) {
            if (categoryId) {
                return "product.html#product/edit/" + categoryId + "/" + editId;
            }
            return "product.html#product/edit//" + editId;
        },
        editSku: function(categoryId, editId) {
            if (categoryId) {
                return "product.html#product/editSku/" + categoryId + "/" + editId;
            }
            return "product.html#product/editSku//" + editId;
        },
        home: function(categoryId) {
            if (categoryId) {
                return "product.html#product/home/" + categoryId;
            }
            return "product.html#product/home";
        }
    },
    featurecollection: {
        home: function() {
            return "featurecollection.html#collection";
        },
    },
    category: {
        home: function(categoryId) {
            if (categoryId) {
                return "category.html#category/home/" + categoryId;
            }
            return "category.html#category/home";
        },
        add: function(parentId) {
            return "category.html#category/add/" + parentId;
        },
        update: function(category) {
            return "category.html#category/update/" + category;
        },
    },
    home: function() {
        return "index.html";
    },
    login: function() {
        return "login.html";
    }
}
module.exports = URLMaker;
