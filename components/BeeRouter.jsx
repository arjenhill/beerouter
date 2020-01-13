////////////////////////////////////////////////////////////////////
//
//
//   BeeRouter 控制 显示/隐藏(display:none/block) 的路由器
//
//
////////////////////////////////////////////////////////////////////

import React from "react";
import BeeRouterEmitter from "./Emitter.jsx";

export default class BeeRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.first = -1;
  }

  componentDidMount() {
    // 添加默认path用于模糊查询.
    RouterHash.add(this.props.path);

    setTimeout(() => {
      this.hashListenerHandler();
    }, 250);
    window.addEventListener("hashchange", this.hashListenerHandler.bind(this));
  }

  hashListenerHandler() {
    const hash = window.location.hash.substr(1);
    fireHash.call(this, hash);

    // 默认路由
    RouterHash.runIndex(hash, () => {
      if (this.props.index === "default") fireHash.call(this, true);
    });

    // 触发路由机制
    function fireHash(hash) {
      if (hash === true || hash.indexOf(this.props.path) === 0) {
        this.first++;
        this.setState({ show: true });

        if (this.first === 0) {
          BeeRouterEmitter.emit("router-show-first", this.props.path);
        }
        BeeRouterEmitter.emit("router-change", this.props.path);
        return;
      } else {
        this.setState({ show: false });
      }
    }
  }

  render() {
    const style = { display: this.state.show ? "block" : "none" };

    return (
      <span style={style}>
        <this.props.component />
      </span>
    );
  }
}

BeeRouter.push = function(pathname) {
  const key = window.location.key || createRandomKey(6);
  const QueryKey = "_k";

  let path = pathname;
  path = addQueryStringValueToPath(path, QueryKey, key);

  if (this.currentHash !== path) {
    window.location.hash = path;
  }

  this.currentHash = path;
};

function addQueryStringValueToPath(path, key, value) {
  return path + (path.indexOf("?") === -1 ? "?" : "&") + (key + "=" + value);
}

function createRandomKey(length) {
  return Math.random()
    .toString(36)
    .substr(2, length);
}

////////////////////////////////////////////////////////////////////
//
//
//   默认path用于模糊查询
//
//
////////////////////////////////////////////////////////////////////
let RouterHash = {
  hashs: [],
  one: false,
  add(path) {
    this.hashs.push(path);
  },

  check(hash) {
    let has = false;
    for (let i = 0; i < this.hashs.length; i++) {
      if (hash.indexOf(this.hashs[i]) === 0) {
        has = true;
      }
    }

    return has;
  },

  runIndex(hash, callback) {
    if (!this.check(hash) && !this.one) {
      callback();
      this.one = true;
      setTimeout(() => {
        this.one = false;
      }, 500);
    }
  }
};
