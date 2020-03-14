module.exports = {
    isIE: () => !!window.ActiveXObject || 'ActiveXObject' in window,
    browserVersion: () => {
        var ua = navigator.userAgent;
        var ret = {},
            webkit = ua.match(/WebKit\/([\d.]+)/),
            chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
            ie = ua.match(/MSIE\s([\d]+)/) || ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
            firefox = ua.match(/Firefox\/([\d.]+)/),
            safari = ua.match(/Safari\/([\d.]+)/),
            opera = ua.match(/OPR\/([\d.]+)/);
        webkit && (ret.webkit = parseFloat(webkit[1]));
        chrome && (ret.chrome = parseFloat(chrome[1]));
        ie && (ret.ie = parseFloat(ie[1]));
        firefox && (ret.firefox = parseFloat(firefox[1]));
        safari && (ret.safari = parseFloat(safari[1]));
        opera && (ret.opera = parseFloat(opera[1]));
        return ret;
    }
};