import $ from 'jquery'

function getLoadId(url) {
    return url.replace(/\W/gi, '_');
}

export function simpleLoad(url) {
    var def = $.Deferred();
    var sid = getLoadId(url);
    if (document.getElementById(sid) != null) {
        def.resolve();
    } else {
        var script = null;
        if (url.indexOf('.css') > 0) {
            script = document.createElement('link');
            script.rel = 'stylesheet';
            script.href = url;
            script.id = sid;
        } else {
            script = document.createElement('script');
            script.src = url;
            script.id = sid;
        }
        script.onload = function () {
            def.resolve();
        };
        script.onerror = function (e) {
            def.reject(e)
        };
        document.head.appendChild(script);
    }
    return def;
}