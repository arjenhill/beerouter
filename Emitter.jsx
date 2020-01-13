let _listeners = {};

const BeeRouterEmitter = {
  on(type, listener) {
    if (!_listeners[type]) _listeners[type] = [];
    _listeners[type].push(listener);

    return listener;
  },

  one(type, listener) {
    BeeRouterEmitter.on(type, proxyListener);

    function proxyListener() {
      BeeRouterEmitter.off(type, proxyListener);
      listener.apply(null, arguments);
    }
  },

  off(type, listener) {
    if (!_listeners || !_listeners[type]) return;

    const arr = _listeners[type];
    for (let i = 0, l = arr.length; i < l; i++) {
      if (arr[i].toString() === listener.toString()) {
        if (l === 1) {
          delete _listeners[type];
        } else {
          arr.splice(i, 1);
        }
        break;
      }
    }
  },

  offAll(type) {
    if (!type) _listeners = {};
    else if (_listeners) delete _listeners[type];
  },

  emit(eventName) {
    let ret = false,
      listeners = _listeners;

    if (eventName && listeners) {
      let arr = listeners[eventName];
      if (!arr) return ret;

      arr = arr.slice();
      let i = arr.length;

      let args = Array.prototype.slice.call(arguments);
      args.shift();

      while (i--) {
        let handler = arr[i];
        ret = ret || handler.apply(null, args);
      }
    }

    return !!ret;
  },

  has(type) {
    const listeners = _listeners;
    return !!(listeners && listeners[type]);
  }
};

export default BeeRouterEmitter;
