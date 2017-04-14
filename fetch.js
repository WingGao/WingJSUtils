import 'whatwg-fetch'
import _ from 'lodash'

let _cacheMap = {}

let comProcesser = (res) => {
    return res.json()
}

let post = (url, data, opt) => {
    opt = _.defaults(opt, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: toParams(data),
    })
    return fetch(url, opt).then(comProcesser)
}

let get = (url, data, opt) => {
    opt = _.defaults(opt, {
        method: 'GET',
        credentials: 'same-origin',
    })
    return fetch(url + (data == null ? '' : `?${toParams(data)}`), opt).then(comProcesser)
}

let toParams = (obj) => {
    let str = "";
    if (typeof obj === 'string') {
        return obj
    }
    for (let key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str
}

let hashRequest = (url, data) => {
    return encodeURI(url) + '|' + encodeURI(JSON.stringify(data))
}
/**
 * post带cache
 * @param url
 * @param data
 * @param opt
 */
let postc = (url, data, opt) => {
    let hash = hashRequest(url, data)
    let d = _cacheMap[hash]
    if (d != null) {
        return new Promise((resolve, reject) => {
            resolve(d)
        })
    } else {
        return post(url, data, opt).then((data) => {
            _cacheMap[hash] = data
            return data
        })
    }
}

export  {post, get, postc}