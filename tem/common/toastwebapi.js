import WebAPI from "./webapijson.js"

var ToastWebApi = {
  do: function(method, params, apiUrl) {
    return WebAPI
      .do(method, params,apiUrl)
      .catch(function(error) {
        $.toaster({
          priority: 'warning',
          title: '',
          message: error
        });
        return Promise.reject(new Error("Network error!"))
      })
  }
}


export default ToastWebApi
