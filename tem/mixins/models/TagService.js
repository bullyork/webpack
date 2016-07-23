var TagService = {
    GetTags: function(cateId, limit, offset) {
        return new Promise((resolve, reject) => {
            resolve(["tag1", "tag2", "tag3", "tag4"]);
        })
    },
}



export default TagService
