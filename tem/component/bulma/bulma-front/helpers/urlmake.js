var encodeSlash = function(str) {
    if (typeof str === "string") {
        return str.replace(/\//g, "slash|slash");
    }
    return "";
}
var URLMaker = {
	product: {
        detail: function(domain, url, purchaseSource) {
            if (!purchaseSource) {
                purchaseSource = "10100";
            }
            return domain+"/productdetail.html#product/detail/" + encodeSlash(url) + "/" + purchaseSource;
        }
    },
}

export default URLMaker;