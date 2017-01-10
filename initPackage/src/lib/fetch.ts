import 'whatwg-fetch';
/**
 * Request 
*/

interface Options extends RequestInit {
  query: Object;
  prefix: string;
  beforeRequest: any;
  afterResponse: any;
  afterJSON: any;
}

class Request {
  constructor(method: string, url: string, opts: Options) { // 完善url，规范headers
    method = method.toUpperCase();
    const defaultOption: Options = {
      cache: 'no-cache',
      headers: {},
      mode: 'cors',
      query: {},
      prefix: '',
      beforeRequest: () => {},
      afterResponse: () => {},
      afterJSON: () => {},
      method: 'POST',
      body: '',
    };
    this.options = {...defaultOption, ...opts};
    const prefix: string = this.options.prefix || '';
    this.url = prefix + url;
    const headers: Object = this.options.headers;
    for (let h in headers) {
      if (h !== h.toLowerCase()) {
        headers[h.toLowerCase()] = headers[h];
        delete headers[h];
      }
    }
  }
  body: any;
  options: Options;
  url: string;
 /**
  * Set Options
  *
  * Examples:
  *
  *   .config('credentials', 'omit')
  *   .config({ credentials: 'omit' })
  *
  * @param {Object} key
  * @param {Any} value
  * @return {Request}
  */
  config(key: Object) {
    this.options = {...this.options, ...key};
    return this;
  }
  /**
   * Add query string
   *
   * @param {Object} object
   * @return {Request}
   */
  query(data: Object) {
    this.options.query = assign({}, this.options.query, data);
    return this;
  }
  /**
   * Send data
   *
   * Examples:
   *
   *   .send({ name: 'hello' })
   *
   * @param {Object} data
   * @return {Request}
   */
  send(data: Object) {
    this.body = data;
    this.options.headers['content-type'] = 'application/json';
    return this;
  }
  /**
   * formData
   *
   * Examples:
   *
   *   .append(formData:FormData)
   *
   * @param {FormData} formData
   * @return {Request}
   */
  form(formData: FormData) {
    this.body = formData;
    return this;
  }
  promise() {
    const { options } = this;
    let { url } = this;

    const {
      beforeRequest,
      afterResponse,
    } = options;
    try {
      if (['GET', 'HEAD', 'OPTIONS'].indexOf(options.method.toUpperCase()) === -1) {
        if (this.body instanceof FormData) {
          options.body = this.body;
        } else if (isObject(this.body) && isJsonType(options.headers['content-type'])) {
          options.body = JSON.stringify(this.body);
        } else if (isObject(this.body)) {
          options.body = stringify(this.body);
        } else {
          options.body = this.body;
        }
      }

      if (isObject(options.query)) {
        if (url.indexOf('?') >= 0) {
          url += '&' + stringify(options.query);
        } else {
          url += '?' + stringify(options.query);
        }
      }

      if (beforeRequest) {
        const canceled = beforeRequest(url, options.body);
        if (canceled === false) {
          throw new Error('request canceled by beforeRequest');
        }
      }
    } catch (e) {
      throw new Error(e);
      
    }

    if (afterResponse) {
      return fetch(url, options)
        .then(res => {
          afterResponse(res);
          return res;
        });
    }

    return fetch(url, options);
  }
  then(resolve: any, reject: any) {
    return this.promise().then(resolve, reject);
  }

  catch (reject: any) {
    return this.promise().catch(reject);
  }

  json(strict: boolean = true) {
    return this.promise()
    .then(res => res.json())
    .then(json => {
      if (strict && !isObject(json)) {
        throw new TypeError('response is not strict json');
      }

      if (this.options.afterJSON) {
        this.options.afterJSON(json);
      }
      return json;
    });
  }

  text() {
    return this.promise().then(res => res.text());
  }
}

/**
 * Private utils
 */

function assign(a: Object, b: Object, c: Object){
  return {...a, ...b, ...c};
}

function isObject(obj: any) {
  // not null
  return obj && typeof obj === 'object';
}

function isJsonType(contentType: any) {
  return contentType && contentType.indexOf('application/json') === 0;
}

function stringify(obj: Object) {
  return Object.keys(obj).map(key => {
    return key + '=' + obj[key];
  }).join('&');
}

/**
 * Fetch
 */

class Fetch {
  options: Object;
  constructor(options: Object){
    this.options = options;
  }
}

const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

methods.forEach(method => {
  method = method.toLowerCase();
  Fetch.prototype[method] = function(url) {
    const opts = {...this.options};
    return new Request(method, url, opts);
  };
});

 /**
 * export
 */

export default Fetch;

