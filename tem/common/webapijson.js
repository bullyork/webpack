import Config from "./config.js"

var WebAPI = {
  do: function(method, params,apiUrl) {
    apiUrl = typeof apiUrl === "undefined" ? Config.API_URL : apiUrl;

    return new Promise(function(resolve, reject) {
      var ajaxData = {
        url: apiUrl + "/" + method.replace(/\./g, "/"),
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
      if (window.location.origin === Config.WEBAPI_URL) {
        ajaxData["crossDomain"] = false;
        ajaxData["xhrFields"] = {};
      }
      $.ajax(ajaxData);
    });
  }
}


export default WebAPI
