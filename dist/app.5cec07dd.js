// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var span = document.querySelector('span');
var todoList = document.querySelector('.todos');

function renderTodos(collection) {
  if (collection !== undefined) {
    span.innerHTML = collection.length;
    todoList.innerHTML = '';

    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
      var item = collection_1[_i];
      todoList.innerHTML += "\n        <li>\n        <input type=\"checkbox\" value='" + JSON.stringify(item) + "'/>\n          " + item.label + "\n          <button type=\"button\" data-todo='" + JSON.stringify(item) + "'>\n            Delete\n          </button>\n        </li>\n       ";
    }
  }
}

exports.renderTodos = renderTodos;
},{}],"src/store/store.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Store =
/** @class */
function () {
  function Store(reducers, initialState) {
    if (reducers === void 0) {
      reducers = {};
    }

    if (initialState === void 0) {
      initialState = {};
    }

    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  Object.defineProperty(Store.prototype, "value", {
    get: function get() {
      return this.state;
    },
    enumerable: true,
    configurable: true
  });

  Store.prototype.subscribe = function (fn) {
    var _this = this;

    this.subscribers = __spreadArrays(this.subscribers, [fn]);
    this.notify();
    return function () {
      _this.subscribers = _this.subscribers.filter(function (sub) {
        return sub !== fn;
      });
    };
  };

  Store.prototype.dispatch = function (action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  };

  Store.prototype.notify = function () {
    var _this = this;

    this.subscribers.forEach(function (fn) {
      return fn(_this.value);
    });
  };

  Store.prototype.reduce = function (state, action) {
    var newState = {};

    for (var prop in this.reducers) {
      newState[prop] = this.reducers[prop](state, action);
    }

    return newState;
  };

  return Store;
}();

exports.Store = Store;
},{}],"src/store/actions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ADD_TODO = '[Todo] Add Todo';
exports.REMOVE_TODO = '[Todo] Remove Todo';
exports.MODIFY_TODO = '[Todo] Modify Todo';

var AddTodo =
/** @class */
function () {
  function AddTodo(payload) {
    this.payload = payload;
    this.type = exports.ADD_TODO;
  }

  return AddTodo;
}();

exports.AddTodo = AddTodo;

var RemoveTodo =
/** @class */
function () {
  function RemoveTodo(payload) {
    this.payload = payload;
    this.type = exports.REMOVE_TODO;
  }

  return RemoveTodo;
}();

exports.RemoveTodo = RemoveTodo;

var ModifyTodo =
/** @class */
function () {
  function ModifyTodo(payload) {
    this.payload = payload;
    this.type = exports.MODIFY_TODO;
  }

  return ModifyTodo;
}();

exports.ModifyTodo = ModifyTodo;
},{}],"src/store/reducers.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fromActions = __importStar(require("./actions"));

exports.initialState = {
  loaded: false,
  loading: false,
  data: [{
    label: 'Todo di Prova',
    complete: false
  }]
};

function reducer(state, action) {
  if (state === void 0) {
    state = exports.initialState;
  }

  switch (action.type) {
    case fromActions.ADD_TODO:
      {
        var todo = action.payload;

        var data = __spreadArrays(state['todos'].data, [todo]);

        return __assign(__assign({}, state), {
          data: data
        });
      }

    case fromActions.REMOVE_TODO:
      {
        var data = state['todos'].data.filter(function (todo) {
          return todo.label !== action.payload.label;
        });
        return __assign(__assign({}, state), {
          data: data
        });
      }

    case fromActions.MODIFY_TODO:
      {
        var foundIndex = state['todos'].data.findIndex(function (todo) {
          return todo.label === todo.label;
        });
        var data = action.payload;
        state['todos'].data[foundIndex] = data;
        return __assign({}, state['todos']);
      }
  }

  return Object.keys(state).length === 0 ? state = exports.initialState : state;
}

exports.reducer = reducer;
},{"./actions":"src/store/actions.ts"}],"src/store/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./store"));

__export(require("./reducers"));

__export(require("./actions"));
},{"./store":"src/store/store.ts","./reducers":"src/store/reducers.ts","./actions":"src/store/actions.ts"}],"src/app.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var fromStore = __importStar(require("./store"));

var input = document.querySelector('input');
var button = document.querySelector('button');
var destroy = document.querySelector('.unsubscribe');
var todoList = document.querySelector('.todos');
var reducers = {
  todos: fromStore.reducer
};
var store = new fromStore.Store(reducers);
button.addEventListener('click', function () {
  if (!input.value.trim()) return;
  var todo = {
    label: input.value,
    complete: false
  };
  store.dispatch(new fromStore.AddTodo(todo));
  input.value = '';
}, false);
var unsubscribe = store.subscribe(function (state) {
  utils_1.renderTodos(state.todos.data);
});
destroy.addEventListener('click', unsubscribe, false);
todoList.addEventListener('click', function (event) {
  var target = null;

  if (event.target.getAttribute('type') === 'button') {
    target = event.target;
    var todo = JSON.parse(target.getAttribute('data-todo'));
    store.dispatch(new fromStore.RemoveTodo(todo));
  } else if (event.target.getAttribute('type') === 'checkbox') {
    target = event.target;
    var x_1 = document.createElement("INPUT");
    var inviaMod = document.createElement("BUTTON");
    inviaMod.innerHTML = 'Modify Todo';
    var valore_1 = JSON.parse(target.value);
    x_1.setAttribute("type", "text");
    x_1.setAttribute("value", valore_1.label);
    todoList.appendChild(x_1);
    inviaMod.addEventListener('click', function (e) {
      valore_1.label = x_1.value;
      console.log('valore', x_1.value);
      store.dispatch(new fromStore.ModifyTodo(valore_1));
    });
    todoList.appendChild(inviaMod);
  }
});
store.subscribe(function (state) {
  return console.log('STATE:::', state);
});
},{"./utils":"src/utils.ts","./store":"src/store/index.ts"}],"../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57789" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.ts"], null)
//# sourceMappingURL=/app.5cec07dd.js.map