var QiniuFileUploader;

(function() {

    var WebAPI = {
        _id: 0,
        do: function(url, method, params, resolve, reject) {
            var ajaxData = {
                url: url + "/" + method.replace(".", "/"),
                type: "POST",
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                data: JSON.stringify(params),
                success: function(data) {
                    if (typeof data === "string") {
                        if (data === "True") {
                            data = true;
                        } else if (data === "False") {
                            data = false;
                        }
                    }
                    resolve(data);
                },
                error: function(xhr) {
                    reject(new Error(xhr.statusText))
                },
                timeout: 30000,
                crossDomain: true
            };
            if (window.location.origin === url) {
                ajaxData["crossDomain"] = false;
                ajaxData["xhrFields"] = {};
            }
            $.ajax(ajaxData);
        }
    }

    var doRequest = function(url, method, data, headers, resolve, reject) {
        $.ajax({
            url: url,
            type: method,
            dataType: "json",
            headers: headers,
            data: data,
            success: function(data) {
                resolve(data);
            },
            error: function() {
                reject();
            }
        })
    }

    var getUptoken = function(downtokenUrl, resolve, reject) {
        WebAPI.do(downtokenUrl, "Qiniu.GetUploadToken", {}, resolve, reject)
    }

    var doFileUpload = function(filedata, token, resolve, reject) {
        var url = "http://up.qiniu.com/putb64/-1";
        var headers = {
            "Content-Type": "application/octet-stream",
            "Authorization": "UpToken " + token
        }
        doRequest(url, "POST", filedata, headers, resolve, reject);
    }

    QiniuFileUploader = function(options) {
        this.downtokenUrl = options === undefined ? "" : options.downtokenUrl;
    }

    QiniuFileUploader.prototype.upload = function(file, resolve, reject) {
        getUptoken(this.downtokenUrl, function(uptoken) {
            doFileUpload(file, uptoken, resolve, reject);
        }, reject);
    }
})();

var QiniuImageDragging;

(function() {
    'use strict';

    QiniuImageDragging = MediumEditor.Extension.extend({
        name: "qiniuimageDragging",
        qiniubaseUrl: "",
        init: function() {
            this.subscribe('editableDrag', this.handleDrag.bind(this));
            this.subscribe('editableDrop', this.handleDrop.bind(this));
            var config = {};

            this.getEditorElements().forEach(function(el) {
                config["downtokenUrl"] = el.getAttribute('data-qiniutokenurl');
                this.qiniubaseUrl = el.getAttribute('data-qiniubaseurl');
            }, this);

            this.qiniuUploader = new QiniuFileUploader(config);
        },

        handleDrag: function(event) {
            var className = 'medium-editor-dragover';
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';

            if (event.type === 'dragover') {
                event.target.classList.add(className);
            } else if (event.type === 'dragleave') {
                event.target.classList.remove(className);
            }
        },

        handleDrop: function(event) {
            var className = 'medium-editor-dragover',
                files;
            event.preventDefault();
            event.stopPropagation();

            if (event.dataTransfer.files) {
                files = Array.prototype.slice.call(event.dataTransfer.files, 0);
                files.some(function(file) {
                    if (file.type.match('image')) {
                        var fileReader, id;
                        fileReader = new FileReader();
                        fileReader.readAsDataURL(file);

                        id = 'medium-img-' + (+new Date());
                        MediumEditor.util.insertHTMLCommand(this.document, '<div id="' + id + '" style="width:100%;padding-top:10px;padding-bottom:10px;text-align:center;border:1px solid black;">placeholder</div><p><br /></p>');
                        fileReader.onload = function() {
                            var file = fileReader.result.replace(/^data.*?,/, "");
                            this.qiniuUploader.upload(
                                file,
                                function(ret) {
                                    var imgsrc = this.baseurl + ret.hash;
                                    var div = this.document.getElementById(this.id);
                                    if (div) {
                                        div.innerHTML = '<img src="' + imgsrc + '" width="100%" />';
                                        div.removeAttribute("id");
                                        div.removeAttribute("class");
                                        div.removeAttribute("style");
                                    }
                                }.bind({
                                    document: this.document,
                                    id: id,
                                    baseurl: this.qiniubaseUrl
                                }),
                                function(error) {
                                    if (this.self.document.getElementById(this.id)) {
                                        this.self.document.removeChild(this.self.document.getElementById(this.id));
                                    }
                                    alert("图片文件上传失败！")
                                }.bind({
                                    self: this,
                                    id: id
                                })
                            )
                        }.bind(this);
                    }
                }.bind(this));
            }
            event.target.classList.remove(className);
        }
    });

}());
