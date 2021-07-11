module.exports = {
    //监听
    addEvent: (target, eventType, handle) => {
        if (document.addEventListener) {
            return target.addEventListener(eventType, handle, false);
        } else {
            return target.attachEvent('on' + eventType, handle);
        }
    },
    //移除监听
    removeEvent: (target, eventType, handle) => {
        if (document.addEventListener) {
            return target.removeEventListener(eventType, handle, false);
        } else {
            return target.detachEvent('on' + eventType, handle);
        }
    },
    //触发事件
    fireEvent: (eventType) => {
        if (document.createEvent) {
            let event = document.createEvent('HTMLEvents');
            event.initEvent(eventType, true, true);
            window.dispatchEvent(event);
        } else if (document.createEventObject) {
            window.fireEvent('on' + eventType);
        }
    }
};
