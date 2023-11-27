var t,
  e,
  _typeof2 =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        };

function _defineProperty(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}

function mimetype(e) {
  "use strict";
  var t = [
      {
        file: "image",
        ext: ["jpg", "jpeg", "png", "gif", "webp", "svg", "psd"],
      },
      {
        file: "archive",
        ext: ["zip", "7z", "rar"],
      },
      {
        file: "pdf",
        ext: ["pdf"],
      },
      {
        file: "video",
        ext: ["mp4", "flv", "m3u8", "ts", "3gp", "avi", "mov", "wmv"],
      },
      {
        file: "code",
        ext: ["php", "html", "css", "js", "inc", "py", "xml", "json"],
      },
      {
        file: "text",
        ext: ["txt", "rtf", "pages"],
      },
      {
        file: "music",
        ext: ["mp3", "m3u"],
      },
      {
        file: "audio",
        ext: ["mid", "aif", "wav"],
      },
      {
        file: "chart",
        ext: ["xls", "xlsx", "numbers"],
      },
      {
        file: "csv",
        ext: ["csv"],
      },
      {
        file: "powerpoint",
        ext: ["pptx", "pptm", "ppt"],
      },
      {
        file: "word",
        ext: ["doc", "docx"],
      },
    ],
    n = e.ext || "file",
    i = e.filename;
  if (e.url)
    try {
      var o = new URL(e.url),
        s = o.pathname.match(/\/([^\/]+\.[^\s\?#\/]+)$/i),
        i = s ? s[1] : o.hostname;
    } catch (e) {}
  if (i && !e.ext) {
    var r = (i = i.replace(/(\?.*|$)/, "")).lastIndexOf(".");
    if (-1 != r)
      for (var a = i.toLowerCase().substr(r + 1), l = 0; l < t.length; l++)
        if (-1 != t[l].ext.indexOf(a)) {
          n = t[l].file;
          break;
        }
  }
  return "files/" + n;
}

function humanSize(e) {
  if (!e) return e;
  for (var t = 0; 1024 <= e; ) (e /= 1024), t++;
  return e.toFixed(0) + " " + ["B", "KB", "MB", "GB"][t];
}

function format(e) {
  var t,
    n =
      1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaults;
  "string" != typeof e ||
    0 != n.precision ||
    (-1 != (t = e.indexOf(".")) && (e = e.substring(0, t))),
    "number" == typeof e && (e = e.toFixed(fixed(n.precision)));
  var i = 0 <= e.indexOf("-") ? "-" : "",
    o = toStr(numbersToCurrency(e, n.precision)).split("."),
    s = o[0],
    r = o[1],
    s = addThousandSeparator(s, n.thousands);
  return (
    (null != n.prefix ? n.prefix : "") +
    i +
    joinIntegerAndDecimal(s, r, n.decimal) +
    (null != n.suffix ? n.suffix : "")
  );
}

function unformat(e, t) {
  var n = 0 <= e.indexOf("-") ? -1 : 1,
    i = numbersToCurrency(e, t);
  return parseFloat(i) * n;
}

function fixed(e) {
  return between(0, e, 20);
}

function between(e, t, n) {
  return Math.max(e, Math.min(t, n));
}

function numbersToCurrency(e, t) {
  return parseFloat(toStr(e).replace(/[^0-9\.]+/g, "") || "0").toFixed(
    fixed(t)
  );
}

function addThousandSeparator(e, t) {
  return e.replace(/(\d)(?=(?:\d{3})+\b)/gm, "$1" + t);
}

function currencyToIntegerAndDecimal(e) {
  return toStr(e).split(".");
}

function joinIntegerAndDecimal(e, t, n) {
  return t ? e + n + t : e;
}

function toStr(e) {
  return e ? e.toString() : "";
}

function setCursor(e, t) {
  function n() {
    e.setSelectionRange(t, t);
  }
  e === document.activeElement && (n(), setTimeout(n, 1));
}

function event(e) {
  var t = document.createEvent("Event");
  return t.initEvent(e, !0, !0), t;
}

function setEventWrapper(e) {
  var r = e.addEventListener;
  e.addEventListener = function (e, t, n) {
    var i = this,
      o = !1,
      s = t;
    return (
      -1 != ["DOMContentLoaded", "load"].indexOf(e) &&
        (t = function (e) {
          o || (s.call(i, e), (o = !0));
        }),
      r.call(i, e, t, n)
    );
  };
}

function scrollIt(e) {
  var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "y",
    s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
    r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 300,
    a =
      4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "linear",
    l = arguments[5],
    c = arguments[6],
    i =
      7 < arguments.length && void 0 !== arguments[7]
        ? arguments[7]
        : {
            x: 0,
            y: 0,
          };
  null == s && (s = window);
  var u = {
    linear: function (e) {
      return e;
    },
    easeInQuad: function (e) {
      return e * e;
    },
    easeOutQuad: function (e) {
      return e * (2 - e);
    },
  };
  var d =
      "y" == o
        ? s != window
          ? s.scrollTop
          : s.pageYOffset
        : s != window
        ? s.scrollLeft
        : s.pageXOffset,
    h = "now" in window.performance ? performance.now() : new Date().getTime(),
    p = Math.max(
      0,
      Math.floor(
        "number" == typeof e
          ? e
          : (function (e) {
              for (var t = i.x, n = i.y; e; )
                (t += e.offsetLeft), (n += e.offsetTop), (e = e.offsetParent);
              return {
                x: t,
                y: n,
              };
            })("string" == typeof e ? document.querySelector(e) : e)[o]
      )
    );
  if ("requestAnimationFrame" in window == !1 || !r)
    return "y" == o ? s.scroll(0, p) : s.scroll(p, 0), void (l && l());
  !(function e() {
    var t =
        "now" in window.performance ? performance.now() : new Date().getTime(),
      n = Math.min(1, (t - h) / r),
      i = u[a](n) * (p - d) + d;
    if (
      ("y" == o ? s.scroll(0, i) : s.scroll(i, 0),
      c && c(),
      0 == Math.ceil(Math.floor(i - p)))
    )
      return "y" == o ? s.scroll(0, p) : s.scroll(p, 0), void (l && l());
    requestAnimationFrame(e);
  })();
}

function gtag() {
  dataLayer.push(arguments);
}

function facebookPixelInit(e) {
  var t, n, i, o, s;
  (t = window),
    (n = document),
    t.fbq ||
      ((i = t.fbq =
        function () {
          i.callMethod
            ? i.callMethod.apply(i, arguments)
            : i.queue.push(arguments);
        }),
      t._fbq || (t._fbq = i),
      ((i.push = i).loaded = !0),
      (i.version = "2.0"),
      (i.queue = []),
      ((o = n.createElement("script")).async = !0),
      (o.src = "https://connect.facebook.net/en_US/fbevents.js"),
      (s = n.getElementsByTagName("script")[0]).parentNode.insertBefore(o, s));
  var r = e.data();
  console.log("Init facebook pixel:", r.id),
    fbq("init", r.id),
    fbq("track", "PageView"),
    $mx(document).on("click", '[data-track-event="payment"]', function () {
      fbq("track", "InitiateCheckout");
    });
  $events.on("navigate", function (e, t) {
    fbq("track", "PageView", {
      url: t.path,
    });
  });

  function a(e, t) {
    null != window.fbq &&
      fbq("track", "Purchase", {
        content_type: "product",
        value: t.budget,
        currency: t.currency,
      });
  }
  ecommerceEvent && "purchase" == ecommerceEvent.type && a(0, ecommerceEvent),
    $events.on("paid", a);
  $events.on(
    "viewProduct",
    function (e, t) {
      fbq("track", "ViewContent", t);
    },
    !0
  ),
    $events.on("lead", function (e, t) {
      var n;
      null != window.fbq &&
        (fbq(
          "track",
          "Lead",
          {},
          {
            eventID: "lead_" + t.lead_id,
          }
        ),
        t.addons &&
          null != t.addons["facebookpixel-goal"] &&
          ((n = JSON.parse(t.addons["facebookpixel-goal"])),
          window.fbq(
            "trackCustom",
            n.e,
            {},
            {
              eventID: t.tms,
            }
          )));
    }),
    $events.on("addToCart", function (e, t) {
      var n = t.product.price,
        i = t.product_id,
        o = [i],
        s = [
          {
            id: i,
            quantity: 1,
            item_price: n,
          },
        ];
      _.each(t.options, function (e, t) {
        (n += e.price),
          s.push({
            id: "option:" + t,
            quantity: 1,
            item_price: e.price,
          });
      }),
        fbq(
          "track",
          "AddToCart",
          {
            value: n,
            currency: t.currency,
            content_type: "product",
            contents: s,
            content_ids: o,
          },
          {
            eventID: t.event_id,
          }
        );
    }),
    $events.on("search", function (e, t) {
      fbq("track", "Search", {
        search_string: t.query,
      });
    }),
    $events.on("initiateCheckout", function (e, t) {
      fbq("track", "InitiateCheckout");
    }),
    $events.on("__tap", function (e, t) {
      var n, i;
      t.addons && null != t.addons["facebookpixel-goal"]
        ? ((n = JSON.parse(t.addons["facebookpixel-goal"])),
          window.fbq(
            "trackCustom",
            n.e,
            {},
            {
              eventID: t.tms,
            }
          ))
        : t.data &&
          ((i = 0),
          _.each(t.data, function (e) {
            i++,
              e &&
                e.event &&
                window.fbq(
                  "trackCustom",
                  e.event,
                  {
                    custom_param: e.param,
                  },
                  {
                    eventID: t.tms + "-" + i,
                  }
                );
          }));
    });
}
!(function (e, t) {
  "object" ==
    ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) &&
  "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Vue = t());
})(this, function () {
  "use strict";
  var g = Object.freeze({});

  function I(e) {
    return null == e;
  }

  function j(e) {
    return null != e;
  }

  function A(e) {
    return !0 === e;
  }

  function T(e) {
    return (
      "string" == typeof e ||
      "number" == typeof e ||
      "symbol" == (void 0 === e ? "undefined" : _typeof2(e)) ||
      "boolean" == typeof e
    );
  }

  function L(e) {
    return null !== e && "object" == (void 0 === e ? "undefined" : _typeof2(e));
  }
  var n = Object.prototype.toString;

  function l(e) {
    return "[object Object]" === n.call(e);
  }

  function o(e) {
    var t = parseFloat(String(e));
    return 0 <= t && Math.floor(t) === t && isFinite(e);
  }

  function b(e) {
    return j(e) && "function" == typeof e.then && "function" == typeof e.catch;
  }

  function t(e) {
    return null == e
      ? ""
      : Array.isArray(e) || (l(e) && e.toString === n)
      ? JSON.stringify(e, null, 2)
      : String(e);
  }

  function P(e) {
    var t = parseFloat(e);
    return isNaN(t) ? e : t;
  }

  function r(e, t) {
    for (
      var n = Object.create(null), i = e.split(","), o = 0;
      o < i.length;
      o++
    )
      n[i[o]] = !0;
    return t
      ? function (e) {
          return n[e.toLowerCase()];
        }
      : function (e) {
          return n[e];
        };
  }
  var c = r("slot,component", !0),
    u = r("key,ref,slot,slot-scope,is");

  function y(e, t) {
    if (e.length) {
      var n = e.indexOf(t);
      if (-1 < n) return e.splice(n, 1);
    }
  }
  var i = Object.prototype.hasOwnProperty;

  function d(e, t) {
    return i.call(e, t);
  }

  function e(t) {
    var n = Object.create(null);
    return function (e) {
      return n[e] || (n[e] = t(e));
    };
  }
  var s = /-(\w)/g,
    k = e(function (e) {
      return e.replace(s, function (e, t) {
        return t ? t.toUpperCase() : "";
      });
    }),
    a = e(function (e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    }),
    h = /\B([A-Z])/g,
    w = e(function (e) {
      return e.replace(h, "-$1").toLowerCase();
    }),
    p = Function.prototype.bind
      ? function (e, t) {
          return e.bind(t);
        }
      : function (n, i) {
          function e(e) {
            var t = arguments.length;
            return t
              ? 1 < t
                ? n.apply(i, arguments)
                : n.call(i, e)
              : n.call(i);
          }
          return (e._length = n.length), e;
        };

  function f(e, t) {
    t = t || 0;
    for (var n = e.length - t, i = new Array(n); n--; ) i[n] = e[n + t];
    return i;
  }

  function m(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }

  function v(e) {
    for (var t = {}, n = 0; n < e.length; n++) e[n] && m(t, e[n]);
    return t;
  }

  function _(e, t, n) {}

  function C() {
    return !1;
  }
  var x = function (e) {
    return e;
  };

  function $(t, n) {
    if (t === n) return !0;
    var e = L(t),
      i = L(n);
    if (!e || !i) return !e && !i && String(t) === String(n);
    try {
      var o = Array.isArray(t),
        s = Array.isArray(n);
      if (o && s)
        return (
          t.length === n.length &&
          t.every(function (e, t) {
            return $(e, n[t]);
          })
        );
      if (t instanceof Date && n instanceof Date)
        return t.getTime() === n.getTime();
      if (o || s) return !1;
      var r = Object.keys(t),
        a = Object.keys(n);
      return (
        r.length === a.length &&
        r.every(function (e) {
          return $(t[e], n[e]);
        })
      );
    } catch (t) {
      return !1;
    }
  }

  function S(e, t) {
    for (var n = 0; n < e.length; n++) if ($(e[n], t)) return n;
    return -1;
  }

  function N(e) {
    var t = !1;
    return function () {
      t || ((t = !0), e.apply(this, arguments));
    };
  }
  var O = "data-server-rendered",
    F = ["component", "directive", "filter"],
    D = [
      "beforeCreate",
      "created",
      "beforeMount",
      "mounted",
      "beforeUpdate",
      "updated",
      "beforeDestroy",
      "destroyed",
      "activated",
      "deactivated",
      "errorCaptured",
      "serverPrefetch",
    ],
    z = {
      optionMergeStrategies: Object.create(null),
      silent: !1,
      productionTip: !1,
      devtools: !1,
      performance: !1,
      errorHandler: null,
      warnHandler: null,
      ignoredElements: [],
      keyCodes: Object.create(null),
      isReservedTag: C,
      isReservedAttr: C,
      isUnknownElement: C,
      getTagNamespace: _,
      parsePlatformTagName: x,
      mustUseProp: C,
      async: !0,
      _lifecycleHooks: D,
    },
    M =
      /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  function E(e, t, n, i) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: !!i,
      writable: !0,
      configurable: !0,
    });
  }
  var B,
    R = new RegExp("[^" + M.source + ".$_\\d]"),
    H = "__proto__" in {},
    V = "undefined" != typeof window,
    q = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform,
    U = q && WXEnvironment.platform.toLowerCase(),
    W = V && window.navigator.userAgent.toLowerCase(),
    Y = W && /msie|trident/.test(W),
    X = W && 0 < W.indexOf("msie 9.0"),
    K = W && 0 < W.indexOf("edge/"),
    Z =
      (W && W.indexOf("android"),
      (W && /iphone|ipad|ipod|ios/.test(W)) || "ios" === U),
    G =
      (W && /chrome\/\d+/.test(W),
      W && /phantomjs/.test(W),
      W && W.match(/firefox\/(\d+)/)),
    J = {}.watch,
    Q = !1;
  if (V)
    try {
      var ee = {};
      Object.defineProperty(ee, "passive", {
        get: function () {
          Q = !0;
        },
      }),
        window.addEventListener("test-passive", null, ee);
    } catch (g) {}
  var te = function () {
      return (
        void 0 === B &&
          (B =
            !V &&
            !q &&
            "undefined" != typeof global &&
            global.process &&
            "server" === global.process.env.VUE_ENV),
        B
      );
    },
    ne = V && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  function ie(e) {
    return "function" == typeof e && /native code/.test(e.toString());
  }
  var oe,
    se =
      "undefined" != typeof Symbol &&
      ie(Symbol) &&
      "undefined" != typeof Reflect &&
      ie(Reflect.ownKeys);

  function re() {
    this.set = Object.create(null);
  }
  oe =
    "undefined" != typeof Set && ie(Set)
      ? Set
      : ((re.prototype.has = function (e) {
          return !0 === this.set[e];
        }),
        (re.prototype.add = function (e) {
          this.set[e] = !0;
        }),
        (re.prototype.clear = function () {
          this.set = Object.create(null);
        }),
        re);
  var ae = _,
    le = 0,
    ce = function () {
      (this.id = le++), (this.subs = []);
    };
  (ce.prototype.addSub = function (e) {
    this.subs.push(e);
  }),
    (ce.prototype.removeSub = function (e) {
      y(this.subs, e);
    }),
    (ce.prototype.depend = function () {
      ce.target && ce.target.addDep(this);
    }),
    (ce.prototype.notify = function () {
      for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++)
        e[t].update();
    }),
    (ce.target = null);
  var ue = [];

  function de(e) {
    ue.push(e), (ce.target = e);
  }

  function he() {
    ue.pop(), (ce.target = ue[ue.length - 1]);
  }
  var pe = function (e, t, n, i, o, s, r, a) {
      (this.tag = e),
        (this.data = t),
        (this.children = n),
        (this.text = i),
        (this.elm = o),
        (this.ns = void 0),
        (this.context = s),
        (this.fnContext = void 0),
        (this.fnOptions = void 0),
        (this.fnScopeId = void 0),
        (this.key = t && t.key),
        (this.componentOptions = r),
        (this.componentInstance = void 0),
        (this.parent = void 0),
        (this.raw = !1),
        (this.isStatic = !1),
        (this.isRootInsert = !0),
        (this.isComment = !1),
        (this.isCloned = !1),
        (this.isOnce = !1),
        (this.asyncFactory = a),
        (this.asyncMeta = void 0),
        (this.isAsyncPlaceholder = !1);
    },
    fe = {
      child: {
        configurable: !0,
      },
    };
  (fe.child.get = function () {
    return this.componentInstance;
  }),
    Object.defineProperties(pe.prototype, fe);
  var me = function (e) {
    void 0 === e && (e = "");
    var t = new pe();
    return (t.text = e), (t.isComment = !0), t;
  };

  function ve(e) {
    return new pe(void 0, void 0, void 0, String(e));
  }

  function ge(e) {
    var t = new pe(
      e.tag,
      e.data,
      e.children && e.children.slice(),
      e.text,
      e.elm,
      e.context,
      e.componentOptions,
      e.asyncFactory
    );
    return (
      (t.ns = e.ns),
      (t.isStatic = e.isStatic),
      (t.key = e.key),
      (t.isComment = e.isComment),
      (t.fnContext = e.fnContext),
      (t.fnOptions = e.fnOptions),
      (t.fnScopeId = e.fnScopeId),
      (t.asyncMeta = e.asyncMeta),
      (t.isCloned = !0),
      t
    );
  }
  var be = Array.prototype,
    ye = Object.create(be);
  ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
    function (s) {
      var r = be[s];
      E(ye, s, function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        var n,
          i = r.apply(this, e),
          o = this.__ob__;
        switch (s) {
          case "push":
          case "unshift":
            n = e;
            break;
          case "splice":
            n = e.slice(2);
        }
        return n && o.observeArray(n), o.dep.notify(), i;
      });
    }
  );
  var ke = Object.getOwnPropertyNames(ye),
    we = !0;

  function _e(e) {
    we = e;
  }
  var xe = function (e) {
    (this.value = e),
      (this.dep = new ce()),
      (this.vmCount = 0),
      E(e, "__ob__", this),
      Array.isArray(e)
        ? (H
            ? (e.__proto__ = ye)
            : (function (e, t, n) {
                for (var i = 0, o = n.length; i < o; i++) {
                  var s = n[i];
                  E(e, s, t[s]);
                }
              })(e, ye, ke),
          this.observeArray(e))
        : this.walk(e);
  };

  function $e(e, t) {
    var n;
    if (L(e) && !(e instanceof pe))
      return (
        d(e, "__ob__") && e.__ob__ instanceof xe
          ? (n = e.__ob__)
          : we &&
            !te() &&
            (Array.isArray(e) || l(e)) &&
            Object.isExtensible(e) &&
            !e._isVue &&
            (n = new xe(e)),
        t && n && n.vmCount++,
        n
      );
  }

  function Ce(n, e, i, t, o) {
    var s,
      r,
      a,
      l = new ce(),
      c = Object.getOwnPropertyDescriptor(n, e);
    (c && !1 === c.configurable) ||
      ((s = c && c.get),
      (r = c && c.set),
      (s && !r) || 2 !== arguments.length || (i = n[e]),
      (a = !o && $e(i)),
      Object.defineProperty(n, e, {
        enumerable: !0,
        configurable: !0,
        get: function () {
          var e = s ? s.call(n) : i;
          return (
            ce.target &&
              (l.depend(),
              a &&
                (a.dep.depend(),
                Array.isArray(e) &&
                  (function e(t) {
                    for (var n = void 0, i = 0, o = t.length; i < o; i++)
                      (n = t[i]) && n.__ob__ && n.__ob__.dep.depend(),
                        Array.isArray(n) && e(n);
                  })(e))),
            e
          );
        },
        set: function (e) {
          var t = s ? s.call(n) : i;
          e === t ||
            (e != e && t != t) ||
            (s && !r) ||
            (r ? r.call(n, e) : (i = e), (a = !o && $e(e)), l.notify());
        },
      }));
  }

  function Se(e, t, n) {
    if (Array.isArray(e) && o(t))
      return (e.length = Math.max(e.length, t)), e.splice(t, 1, n), n;
    if (t in e && !(t in Object.prototype)) return (e[t] = n);
    var i = e.__ob__;
    return (
      e._isVue ||
        (i && i.vmCount) ||
        (i ? (Ce(i.value, t, n), i.dep.notify()) : (e[t] = n)),
      n
    );
  }

  function Ae(e, t) {
    var n;
    Array.isArray(e) && o(t)
      ? e.splice(t, 1)
      : ((n = e.__ob__),
        e._isVue ||
          (n && n.vmCount) ||
          (d(e, t) && (delete e[t], n && n.dep.notify())));
  }
  (xe.prototype.walk = function (e) {
    for (var t = Object.keys(e), n = 0; n < t.length; n++) Ce(e, t[n]);
  }),
    (xe.prototype.observeArray = function (e) {
      for (var t = 0, n = e.length; t < n; t++) $e(e[t]);
    });
  var Te = z.optionMergeStrategies;

  function Oe(e, t) {
    if (!t) return e;
    for (
      var n, i, o, s = se ? Reflect.ownKeys(t) : Object.keys(t), r = 0;
      r < s.length;
      r++
    )
      "__ob__" !== (n = s[r]) &&
        ((i = e[n]),
        (o = t[n]),
        d(e, n) ? i !== o && l(i) && l(o) && Oe(i, o) : Se(e, n, o));
    return e;
  }

  function Fe(n, i, o) {
    return o
      ? function () {
          var e = "function" == typeof i ? i.call(o, o) : i,
            t = "function" == typeof n ? n.call(o, o) : n;
          return e ? Oe(e, t) : t;
        }
      : i
      ? n
        ? function () {
            return Oe(
              "function" == typeof i ? i.call(this, this) : i,
              "function" == typeof n ? n.call(this, this) : n
            );
          }
        : i
      : n;
  }

  function De(e, t) {
    var n = t ? (e ? e.concat(t) : Array.isArray(t) ? t : [t]) : e;
    return n
      ? (function (e) {
          for (var t = [], n = 0; n < e.length; n++)
            -1 === t.indexOf(e[n]) && t.push(e[n]);
          return t;
        })(n)
      : n;
  }

  function ze(e, t, n, i) {
    var o = Object.create(e || null);
    return t ? m(o, t) : o;
  }
  (Te.data = function (e, t, n) {
    return n ? Fe(e, t, n) : t && "function" != typeof t ? e : Fe(e, t);
  }),
    D.forEach(function (e) {
      Te[e] = De;
    }),
    F.forEach(function (e) {
      Te[e + "s"] = ze;
    }),
    (Te.watch = function (e, t, n, i) {
      if ((e === J && (e = void 0), t === J && (t = void 0), !t))
        return Object.create(e || null);
      if (!e) return t;
      var o = {};
      for (var s in (m(o, e), t)) {
        var r = o[s],
          a = t[s];
        r && !Array.isArray(r) && (r = [r]),
          (o[s] = r ? r.concat(a) : Array.isArray(a) ? a : [a]);
      }
      return o;
    }),
    (Te.props =
      Te.methods =
      Te.inject =
      Te.computed =
        function (e, t, n, i) {
          if (!e) return t;
          var o = Object.create(null);
          return m(o, e), t && m(o, t), o;
        }),
    (Te.provide = Fe);
  var Me = function (e, t) {
    return void 0 === t ? e : t;
  };

  function Ee(n, s, i) {
    if (
      ("function" == typeof s && (s = s.options),
      (function (e) {
        var t = e.props;
        if (t) {
          var n,
            i,
            o = {};
          if (Array.isArray(t))
            for (n = t.length; n--; )
              "string" == typeof (i = t[n]) &&
                (o[k(i)] = {
                  type: null,
                });
          else if (l(t))
            for (var s in t)
              (i = t[s]),
                (o[k(s)] = l(i)
                  ? i
                  : {
                      type: i,
                    });
          e.props = o;
        }
      })(s),
      (function () {
        var e = s.inject;
        if (e) {
          var t = (s.inject = {});
          if (Array.isArray(e))
            for (var n = 0; n < e.length; n++)
              t[e[n]] = {
                from: e[n],
              };
          else if (l(e))
            for (var i in e) {
              var o = e[i];
              t[i] = l(o)
                ? m(
                    {
                      from: i,
                    },
                    o
                  )
                : {
                    from: o,
                  };
            }
        }
      })(),
      (function () {
        var e = s.directives;
        if (e)
          for (var t in e) {
            var n = e[t];
            "function" == typeof n &&
              (e[t] = {
                bind: n,
                update: n,
              });
          }
      })(),
      !s._base && (s.extends && (n = Ee(n, s.extends, i)), s.mixins))
    )
      for (var e = 0, t = s.mixins.length; e < t; e++)
        n = Ee(n, s.mixins[e], i);
    var o,
      r = {};
    for (o in n) a(o);
    for (o in s) d(n, o) || a(o);

    function a(e) {
      var t = Te[e] || Me;
      r[e] = t(n[e], s[e], i, e);
    }
    return r;
  }

  function Ie(e, t, n) {
    if ("string" == typeof n) {
      var i = e[t];
      if (d(i, n)) return i[n];
      var o = k(n);
      if (d(i, o)) return i[o];
      var s = a(o);
      return (!d(i, s) && (i[n] || i[o])) || i[s];
    }
  }

  function je(e, t, n, i) {
    var o,
      s,
      r = t[e],
      a = !d(n, e),
      l = n[e],
      c = Be(Boolean, r.type);
    return (
      -1 < c &&
        (a && !d(r, "default")
          ? (l = !1)
          : ("" !== l && l !== w(e)) ||
            (((o = Be(String, r.type)) < 0 || c < o) && (l = !0))),
      void 0 === l &&
        ((l = (function (e, t, n) {
          if (d(t, "default")) {
            var i = t.default;
            return e &&
              e.$options.propsData &&
              void 0 === e.$options.propsData[n] &&
              void 0 !== e._props[n]
              ? e._props[n]
              : "function" == typeof i && "Function" !== Pe(t.type)
              ? i.call(e)
              : i;
          }
        })(i, r, e)),
        (s = we),
        _e(!0),
        $e(l),
        _e(s)),
      l
    );
  }
  var Le = /^\s*function (\w+)/;

  function Pe(e) {
    var t = e && e.toString().match(Le);
    return t ? t[1] : "";
  }

  function Ne(e, t) {
    return Pe(e) === Pe(t);
  }

  function Be(e, t) {
    if (!Array.isArray(t)) return Ne(t, e) ? 0 : -1;
    for (var n = 0, i = t.length; n < i; n++) if (Ne(t[n], e)) return n;
    return -1;
  }

  function Re(e, t, n) {
    de();
    try {
      if (t)
        for (var i = t; (i = i.$parent); ) {
          var o = i.$options.errorCaptured;
          if (o)
            for (var s = 0; s < o.length; s++)
              try {
                if (!1 === o[s].call(i, e, t, n)) return;
              } catch (e) {
                Ve(e, i, "errorCaptured hook");
              }
        }
      Ve(e, t, n);
    } finally {
      he();
    }
  }

  function He(e, t, n, i, o) {
    var s;
    try {
      (s = n ? e.apply(t, n) : e.call(t)) &&
        !s._isVue &&
        b(s) &&
        !s._handled &&
        (s.catch(function (e) {
          return Re(e, i, o + " (Promise/async)");
        }),
        (s._handled = !0));
    } catch (e) {
      Re(e, i, o);
    }
    return s;
  }

  function Ve(e, t, n) {
    if (z.errorHandler)
      try {
        return z.errorHandler.call(null, e, t, n);
      } catch (t) {
        t !== e && qe(t);
      }
    qe(e);
  }

  function qe(e) {
    if ((!V && !q) || "undefined" == typeof console) throw e;
    console.error(e);
  }
  var Ue,
    We,
    Ye,
    Xe,
    Ke,
    Ze = !1,
    Ge = [],
    Je = !1;

  function Qe() {
    Je = !1;
    for (var e = Ge.slice(0), t = (Ge.length = 0); t < e.length; t++) e[t]();
  }

  function et(e, t) {
    var n;
    if (
      (Ge.push(function () {
        if (e)
          try {
            e.call(t);
          } catch (e) {
            Re(e, t, "nextTick");
          }
        else n && n(t);
      }),
      Je || ((Je = !0), We()),
      !e && "undefined" != typeof Promise)
    )
      return new Promise(function (e) {
        n = e;
      });
  }
  "undefined" != typeof Promise && ie(Promise)
    ? ((Ue = Promise.resolve()),
      (We = function () {
        Ue.then(Qe), Z && setTimeout(_);
      }),
      (Ze = !0))
    : Y ||
      "undefined" == typeof MutationObserver ||
      (!ie(MutationObserver) &&
        "[object MutationObserverConstructor]" !== MutationObserver.toString())
    ? (We =
        "undefined" != typeof setImmediate && ie(setImmediate)
          ? function () {
              setImmediate(Qe);
            }
          : function () {
              setTimeout(Qe, 0);
            })
    : ((Ye = 1),
      (Xe = new MutationObserver(Qe)),
      (Ke = document.createTextNode(String(Ye))),
      Xe.observe(Ke, {
        characterData: !0,
      }),
      (We = function () {
        (Ye = (Ye + 1) % 2), (Ke.data = String(Ye));
      }),
      (Ze = !0));
  var tt = new oe();

  function nt(e) {
    !(function e(t, n) {
      var i,
        o,
        s = Array.isArray(t);
      if (!((!s && !L(t)) || Object.isFrozen(t) || t instanceof pe)) {
        if (t.__ob__) {
          var r = t.__ob__.dep.id;
          if (n.has(r)) return;
          n.add(r);
        }
        if (s) for (i = t.length; i--; ) e(t[i], n);
        else for (i = (o = Object.keys(t)).length; i--; ) e(t[o[i]], n);
      }
    })(e, tt),
      tt.clear();
  }
  var it = e(function (e) {
    var t = "&" === e.charAt(0),
      n = "~" === (e = t ? e.slice(1) : e).charAt(0),
      i = "!" === (e = n ? e.slice(1) : e).charAt(0);
    return {
      name: (e = i ? e.slice(1) : e),
      once: n,
      capture: i,
      passive: t,
    };
  });

  function ot(e, o) {
    function s() {
      var e = arguments,
        t = s.fns;
      if (!Array.isArray(t)) return He(t, null, arguments, o, "v-on handler");
      for (var n = t.slice(), i = 0; i < n.length; i++)
        He(n[i], null, e, o, "v-on handler");
    }
    return (s.fns = e), s;
  }

  function st(e, t, n, i, o, s) {
    var r, a, l, c;
    for (r in e)
      (a = e[r]),
        (l = t[r]),
        (c = it(r)),
        I(a) ||
          (I(l)
            ? (I(a.fns) && (a = e[r] = ot(a, s)),
              A(c.once) && (a = e[r] = o(c.name, a, c.capture)),
              n(c.name, a, c.capture, c.passive, c.params))
            : a !== l && ((l.fns = a), (e[r] = l)));
    for (r in t) I(e[r]) && i((c = it(r)).name, t[r], c.capture);
  }

  function rt(e, t, n) {
    var i;
    e instanceof pe && (e = e.data.hook || (e.data.hook = {}));
    var o = e[t];

    function s() {
      n.apply(this, arguments), y(i.fns, s);
    }
    I(o)
      ? (i = ot([s]))
      : j(o.fns) && A(o.merged)
      ? (i = o).fns.push(s)
      : (i = ot([o, s])),
      (i.merged = !0),
      (e[t] = i);
  }

  function at(e, t, n, i, o) {
    if (j(t)) {
      if (d(t, n)) return (e[n] = t[n]), o || delete t[n], 1;
      if (d(t, i)) return (e[n] = t[i]), o || delete t[i], 1;
    }
  }

  function lt(e) {
    return T(e)
      ? [ve(e)]
      : Array.isArray(e)
      ? (function e(t, n) {
          for (var i, o, s, r = [], a = 0; a < t.length; a++)
            I((i = t[a])) ||
              "boolean" == typeof i ||
              ((s = r[(o = r.length - 1)]),
              Array.isArray(i)
                ? 0 < i.length &&
                  (ct((i = e(i, (n || "") + "_" + a))[0]) &&
                    ct(s) &&
                    ((r[o] = ve(s.text + i[0].text)), i.shift()),
                  r.push.apply(r, i))
                : T(i)
                ? ct(s)
                  ? (r[o] = ve(s.text + i))
                  : "" !== i && r.push(ve(i))
                : ct(i) && ct(s)
                ? (r[o] = ve(s.text + i.text))
                : (A(t._isVList) &&
                    j(i.tag) &&
                    I(i.key) &&
                    j(n) &&
                    (i.key = "__vlist" + n + "_" + a + "__"),
                  r.push(i)));
          return r;
        })(e)
      : void 0;
  }

  function ct(e) {
    return j(e) && j(e.text) && !1 === e.isComment;
  }

  function ut(e, t) {
    if (e) {
      for (
        var n = Object.create(null),
          i = se ? Reflect.ownKeys(e) : Object.keys(e),
          o = 0;
        o < i.length;
        o++
      ) {
        var s = i[o];
        if ("__ob__" !== s) {
          for (var r, a = e[s].from, l = t; l; ) {
            if (l._provided && d(l._provided, a)) {
              n[s] = l._provided[a];
              break;
            }
            l = l.$parent;
          }
          !l &&
            "default" in e[s] &&
            ((r = e[s].default),
            (n[s] = "function" == typeof r ? r.call(t) : r));
        }
      }
      return n;
    }
  }

  function dt(e, t) {
    if (!e || !e.length) return {};
    for (var n = {}, i = 0, o = e.length; i < o; i++) {
      var s,
        r,
        a = e[i],
        l = a.data;
      l && l.attrs && l.attrs.slot && delete l.attrs.slot,
        (a.context !== t && a.fnContext !== t) || !l || null == l.slot
          ? (n.default || (n.default = [])).push(a)
          : ((r = n[(s = l.slot)] || (n[s] = [])),
            "template" === a.tag
              ? r.push.apply(r, a.children || [])
              : r.push(a));
    }
    for (var c in n) n[c].every(ht) && delete n[c];
    return n;
  }

  function ht(e) {
    return (e.isComment && !e.asyncFactory) || " " === e.text;
  }

  function pt(e) {
    return e.isComment && e.asyncFactory;
  }

  function ft(e, t, n) {
    var i,
      o = 0 < Object.keys(t).length,
      s = e ? !!e.$stable : !o,
      r = e && e.$key;
    if (e) {
      if (e._normalized) return e._normalized;
      if (s && n && n !== g && r === n.$key && !o && !n.$hasNormal) return n;
      for (var a in ((i = {}), e))
        e[a] &&
          "$" !== a[0] &&
          (i[a] = (function (e, t, n) {
            function i() {
              var e = arguments.length ? n.apply(null, arguments) : n({}),
                t =
                  (e =
                    e &&
                    "object" == (void 0 === e ? "undefined" : _typeof2(e)) &&
                    !Array.isArray(e)
                      ? [e]
                      : lt(e)) && e[0];
              return e && (!t || (1 === e.length && t.isComment && !pt(t)))
                ? void 0
                : e;
            }
            return (
              n.proxy &&
                Object.defineProperty(e, t, {
                  get: i,
                  enumerable: !0,
                  configurable: !0,
                }),
              i
            );
          })(t, a, e[a]));
    } else i = {};
    for (var l in t)
      l in i ||
        (i[l] = (function (e, t) {
          return function () {
            return e[t];
          };
        })(t, l));
    return (
      e && Object.isExtensible(e) && (e._normalized = i),
      E(i, "$stable", s),
      E(i, "$key", r),
      E(i, "$hasNormal", o),
      i
    );
  }

  function mt(e, t) {
    var n, i, o, s, r;
    if (Array.isArray(e) || "string" == typeof e)
      for (n = new Array(e.length), i = 0, o = e.length; i < o; i++)
        n[i] = t(e[i], i);
    else if ("number" == typeof e)
      for (n = new Array(e), i = 0; i < e; i++) n[i] = t(i + 1, i);
    else if (L(e))
      if (se && e[Symbol.iterator]) {
        n = [];
        for (var a = e[Symbol.iterator](), l = a.next(); !l.done; )
          n.push(t(l.value, n.length)), (l = a.next());
      } else
        for (
          s = Object.keys(e), n = new Array(s.length), i = 0, o = s.length;
          i < o;
          i++
        )
          (r = s[i]), (n[i] = t(e[r], r, i));
    return j(n) || (n = []), (n._isVList = !0), n;
  }

  function vt(e, t, n, i) {
    var o = this.$scopedSlots[e],
      s = o
        ? ((n = n || {}),
          i && (n = m(m({}, i), n)),
          o(n) || ("function" == typeof t ? t() : t))
        : this.$slots[e] || ("function" == typeof t ? t() : t),
      r = n && n.slot;
    return r
      ? this.$createElement(
          "template",
          {
            slot: r,
          },
          s
        )
      : s;
  }

  function gt(e) {
    return Ie(this.$options, "filters", e) || x;
  }

  function bt(e, t) {
    return Array.isArray(e) ? -1 === e.indexOf(t) : e !== t;
  }

  function yt(e, t, n, i, o) {
    var s = z.keyCodes[t] || n;
    return o && i && !z.keyCodes[t]
      ? bt(o, i)
      : s
      ? bt(s, e)
      : i
      ? w(i) !== t
      : void 0 === e;
  }

  function kt(o, s, r, a, l) {
    if (r && L(r)) {
      var c;
      Array.isArray(r) && (r = v(r));
      for (var e in r)
        !(function (t) {
          var e;
          c =
            "class" === t || "style" === t || u(t)
              ? o
              : ((e = o.attrs && o.attrs.type),
                a || z.mustUseProp(s, e, t)
                  ? o.domProps || (o.domProps = {})
                  : o.attrs || (o.attrs = {}));
          var n = k(t),
            i = w(t);
          n in c ||
            i in c ||
            ((c[t] = r[t]),
            l &&
              ((o.on || (o.on = {}))["update:" + t] = function (e) {
                r[t] = e;
              }));
        })(e);
    }
    return o;
  }

  function wt(e, t) {
    var n = this._staticTrees || (this._staticTrees = []),
      i = n[e];
    return (
      (i && !t) ||
        xt(
          (i = n[e] =
            this.$options.staticRenderFns[e].call(
              this._renderProxy,
              null,
              this
            )),
          "__static__" + e,
          !1
        ),
      i
    );
  }

  function _t(e, t, n) {
    return xt(e, "__once__" + t + (n ? "_" + n : ""), !0), e;
  }

  function xt(e, t, n) {
    if (Array.isArray(e))
      for (var i = 0; i < e.length; i++)
        e[i] && "string" != typeof e[i] && $t(e[i], t + "_" + i, n);
    else $t(e, t, n);
  }

  function $t(e, t, n) {
    (e.isStatic = !0), (e.key = t), (e.isOnce = n);
  }

  function Ct(e, t) {
    if (t && l(t)) {
      var n = (e.on = e.on ? m({}, e.on) : {});
      for (var i in t) {
        var o = n[i],
          s = t[i];
        n[i] = o ? [].concat(o, s) : s;
      }
    }
    return e;
  }

  function St(e, t, n, i) {
    t = t || {
      $stable: !n,
    };
    for (var o = 0; o < e.length; o++) {
      var s = e[o];
      Array.isArray(s)
        ? St(s, t, n)
        : s && (s.proxy && (s.fn.proxy = !0), (t[s.key] = s.fn));
    }
    return i && (t.$key = i), t;
  }

  function At(e, t) {
    for (var n = 0; n < t.length; n += 2) {
      var i = t[n];
      "string" == typeof i && i && (e[t[n]] = t[n + 1]);
    }
    return e;
  }

  function Tt(e, t) {
    return "string" == typeof e ? t + e : e;
  }

  function Ot(e) {
    (e._o = _t),
      (e._n = P),
      (e._s = t),
      (e._l = mt),
      (e._t = vt),
      (e._q = $),
      (e._i = S),
      (e._m = wt),
      (e._f = gt),
      (e._k = yt),
      (e._b = kt),
      (e._v = ve),
      (e._e = me),
      (e._u = St),
      (e._g = Ct),
      (e._d = At),
      (e._p = Tt);
  }

  function Ft(e, t, n, s, i) {
    var r,
      o = this,
      a = i.options;
    d(s, "_uid")
      ? ((r = Object.create(s))._original = s)
      : (s = (r = s)._original);
    var l = A(a._compiled),
      c = !l;
    (this.data = e),
      (this.props = t),
      (this.children = n),
      (this.parent = s),
      (this.listeners = e.on || g),
      (this.injections = ut(a.inject, s)),
      (this.slots = function () {
        return o.$slots || ft(e.scopedSlots, (o.$slots = dt(n, s))), o.$slots;
      }),
      Object.defineProperty(this, "scopedSlots", {
        enumerable: !0,
        get: function () {
          return ft(e.scopedSlots, this.slots());
        },
      }),
      l &&
        ((this.$options = a),
        (this.$slots = this.slots()),
        (this.$scopedSlots = ft(e.scopedSlots, this.$slots))),
      a._scopeId
        ? (this._c = function (e, t, n, i) {
            var o = Pt(r, e, t, n, i, c);
            return (
              o &&
                !Array.isArray(o) &&
                ((o.fnScopeId = a._scopeId), (o.fnContext = s)),
              o
            );
          })
        : (this._c = function (e, t, n, i) {
            return Pt(r, e, t, n, i, c);
          });
  }

  function Dt(e, t, n, i) {
    var o = ge(e);
    return (
      (o.fnContext = n),
      (o.fnOptions = i),
      t.slot && ((o.data || (o.data = {})).slot = t.slot),
      o
    );
  }

  function zt(e, t) {
    for (var n in t) e[k(n)] = t[n];
  }
  Ot(Ft.prototype);
  var Mt = {
      init: function (e, t) {
        var n, i, o;
        e.componentInstance &&
        !e.componentInstance._isDestroyed &&
        e.data.keepAlive
          ? Mt.prepatch(e, e)
          : (e.componentInstance =
              ((i = {
                _isComponent: !0,
                _parentVnode: (n = e),
                parent: Yt,
              }),
              j((o = n.data.inlineTemplate)) &&
                ((i.render = o.render),
                (i.staticRenderFns = o.staticRenderFns)),
              new n.componentOptions.Ctor(i))).$mount(t ? e.elm : void 0, t);
      },
      prepatch: function (e, t) {
        var n = t.componentOptions;
        !(function (e, t, n, i, o) {
          var s = i.data.scopedSlots,
            r = e.$scopedSlots,
            a = !!(
              (s && !s.$stable) ||
              (r !== g && !r.$stable) ||
              (s && e.$scopedSlots.$key !== s.$key) ||
              (!s && e.$scopedSlots.$key)
            ),
            l = !!(o || e.$options._renderChildren || a);
          if (
            ((e.$options._parentVnode = i),
            (e.$vnode = i),
            e._vnode && (e._vnode.parent = i),
            (e.$options._renderChildren = o),
            (e.$attrs = i.data.attrs || g),
            (e.$listeners = n || g),
            t && e.$options.props)
          ) {
            _e(!1);
            for (
              var c = e._props, u = e.$options._propKeys || [], d = 0;
              d < u.length;
              d++
            ) {
              var h = u[d],
                p = e.$options.props;
              c[h] = je(h, p, t, e);
            }
            _e(!0), (e.$options.propsData = t);
          }
          n = n || g;
          var f = e.$options._parentListeners;
          (e.$options._parentListeners = n),
            Wt(e, n, f),
            l && ((e.$slots = dt(o, i.context)), e.$forceUpdate());
        })(
          (t.componentInstance = e.componentInstance),
          n.propsData,
          n.listeners,
          t,
          n.children
        );
      },
      insert: function (e) {
        var t = e.context,
          n = e.componentInstance;
        n._isMounted || ((n._isMounted = !0), Gt(n, "mounted")),
          e.data.keepAlive &&
            (t._isMounted ? ((n._inactive = !1), en.push(n)) : Zt(n, !0));
      },
      destroy: function (e) {
        var t = e.componentInstance;
        t._isDestroyed ||
          (e.data.keepAlive
            ? (function e(t, n) {
                if (
                  !((n && ((t._directInactive = !0), Kt(t))) || t._inactive)
                ) {
                  t._inactive = !0;
                  for (var i = 0; i < t.$children.length; i++)
                    e(t.$children[i]);
                  Gt(t, "deactivated");
                }
              })(t, !0)
            : t.$destroy());
      },
    },
    Et = Object.keys(Mt);

  function It(r, a, e, t, n) {
    if (!I(r)) {
      var i,
        o = e.$options._base;
      if ((L(r) && (r = o.extend(r)), "function" == typeof r)) {
        if (
          I(r.cid) &&
          void 0 ===
            (r = (function (t, n) {
              if (A(t.error) && j(t.errorComp)) return t.errorComp;
              if (j(t.resolved)) return t.resolved;
              var e = Bt;
              if (
                (e &&
                  j(t.owners) &&
                  -1 === t.owners.indexOf(e) &&
                  t.owners.push(e),
                A(t.loading) && j(t.loadingComp))
              )
                return t.loadingComp;
              if (e && !j(t.owners)) {
                var i = (t.owners = [e]),
                  o = !0,
                  s = null,
                  r = null;
                e.$on("hook:destroyed", function () {
                  return y(i, e);
                });
                var a = function (e) {
                    for (var t = 0, n = i.length; t < n; t++)
                      i[t].$forceUpdate();
                    e &&
                      ((i.length = 0),
                      null !== s && (clearTimeout(s), (s = null)),
                      null !== r && (clearTimeout(r), (r = null)));
                  },
                  l = N(function (e) {
                    (t.resolved = Rt(e, n)), o ? (i.length = 0) : a(!0);
                  }),
                  c = N(function (e) {
                    j(t.errorComp) && ((t.error = !0), a(!0));
                  }),
                  u = t(l, c);
                return (
                  L(u) &&
                    (b(u)
                      ? I(t.resolved) && u.then(l, c)
                      : b(u.component) &&
                        (u.component.then(l, c),
                        j(u.error) && (t.errorComp = Rt(u.error, n)),
                        j(u.loading) &&
                          ((t.loadingComp = Rt(u.loading, n)),
                          0 === u.delay
                            ? (t.loading = !0)
                            : (s = setTimeout(function () {
                                (s = null),
                                  I(t.resolved) &&
                                    I(t.error) &&
                                    ((t.loading = !0), a(!1));
                              }, u.delay || 200))),
                        j(u.timeout) &&
                          (r = setTimeout(function () {
                            (r = null), I(t.resolved) && c(null);
                          }, u.timeout)))),
                  (o = !1),
                  t.loading ? t.loadingComp : t.resolved
                );
              }
            })((i = r), o))
        )
          return (
            (d = i),
            (h = a),
            (p = e),
            (f = t),
            (m = n),
            ((v = me()).asyncFactory = d),
            (v.asyncMeta = {
              data: h,
              context: p,
              children: f,
              tag: m,
            }),
            v
          );
        (a = a || {}),
          Cn(r),
          j(a.model) &&
            (function (e, t) {
              var n = (e.model && e.model.prop) || "value",
                i = (e.model && e.model.event) || "input";
              (t.attrs || (t.attrs = {}))[n] = t.model.value;
              var o = t.on || (t.on = {}),
                s = o[i],
                r = t.model.callback;
              j(s)
                ? (Array.isArray(s) ? -1 === s.indexOf(r) : s !== r) &&
                  (o[i] = [r].concat(s))
                : (o[i] = r);
            })(r.options, a);
        var s = (function () {
          var e = r.options.props;
          if (!I(e)) {
            var t = {},
              n = a.attrs,
              i = a.props;
            if (j(n) || j(i))
              for (var o in e) {
                var s = w(o);
                at(t, i, o, s, !0) || at(t, n, o, s, !1);
              }
            return t;
          }
        })();
        if (A(r.options.functional))
          return (function (e, t, n, i, o) {
            var s = e.options,
              r = {},
              a = s.props;
            if (j(a)) for (var l in a) r[l] = je(l, a, t || g);
            else j(n.attrs) && zt(r, n.attrs), j(n.props) && zt(r, n.props);
            var c = new Ft(n, r, o, i, e),
              u = s.render.call(null, c._c, c);
            if (u instanceof pe) return Dt(u, n, c.parent, s);
            if (Array.isArray(u)) {
              for (
                var d = lt(u) || [], h = new Array(d.length), p = 0;
                p < d.length;
                p++
              )
                h[p] = Dt(d[p], n, c.parent, s);
              return h;
            }
          })(r, s, a, e, t);
        var l,
          c = a.on;
        (a.on = a.nativeOn),
          A(r.options.abstract) && ((l = a.slot), (a = {}), l && (a.slot = l)),
          (function () {
            for (var e = a.hook || (a.hook = {}), t = 0; t < Et.length; t++) {
              var n = Et[t],
                i = e[n],
                o = Mt[n];
              i === o ||
                (i && i._merged) ||
                (e[n] = i
                  ? (function (n, i) {
                      var e = (function (n) {
                        function e(e, t) {
                          return n.apply(this, arguments);
                        }
                        return (
                          (e.toString = function () {
                            return n.toString();
                          }),
                          e
                        );
                      })(function (e, t) {
                        n(e, t), i(e, t);
                      });
                      return (e._merged = !0), e;
                    })(o, i)
                  : o);
            }
          })();
        var u = r.options.name || n;
        return new pe(
          "vue-component-" + r.cid + (u ? "-" + u : ""),
          a,
          void 0,
          void 0,
          void 0,
          e,
          {
            Ctor: r,
            propsData: s,
            listeners: c,
            tag: n,
            children: t,
          },
          i
        );
      }
    }
    var d, h, p, f, m, v;
  }
  var jt = 1,
    Lt = 2;

  function Pt(e, t, n, i, o, s) {
    return (
      (Array.isArray(n) || T(n)) && ((o = i), (i = n), (n = void 0)),
      A(s) && (o = Lt),
      (r = e),
      (a = t),
      (c = i),
      (u = o),
      j((l = n)) && j(l.__ob__)
        ? me()
        : (j(l) && j(l.is) && (a = l.is),
          a
            ? (Array.isArray(c) &&
                "function" == typeof c[0] &&
                (((l = l || {}).scopedSlots = {
                  default: c[0],
                }),
                (c.length = 0)),
              u === Lt
                ? (c = lt(c))
                : u === jt &&
                  (c = (function (e) {
                    for (var t = 0; t < e.length; t++)
                      if (Array.isArray(e[t]))
                        return Array.prototype.concat.apply([], e);
                    return e;
                  })(c)),
              (p =
                "string" == typeof a
                  ? ((h = (r.$vnode && r.$vnode.ns) || z.getTagNamespace(a)),
                    z.isReservedTag(a)
                      ? new pe(
                          z.parsePlatformTagName(a),
                          l,
                          c,
                          void 0,
                          void 0,
                          r
                        )
                      : (l && l.pre) ||
                        !j((d = Ie(r.$options, "components", a)))
                      ? new pe(a, l, c, void 0, void 0, r)
                      : It(d, l, r, c, a))
                  : It(a, l, r, c)),
              Array.isArray(p)
                ? p
                : j(p)
                ? (j(h) &&
                    (function e(t, n, i) {
                      if (
                        ((t.ns = n),
                        "foreignObject" === t.tag && (i = !(n = void 0)),
                        j(t.children))
                      )
                        for (var o = 0, s = t.children.length; o < s; o++) {
                          var r = t.children[o];
                          j(r.tag) &&
                            (I(r.ns) || (A(i) && "svg" !== r.tag)) &&
                            e(r, n, i);
                        }
                    })(p, h),
                  j(l) &&
                    (L((f = l).style) && nt(f.style),
                    L(f.class) && nt(f.class)),
                  p)
                : me())
            : me())
    );
    var r, a, l, c, u, d, h, p, f;
  }
  var Nt,
    Bt = null;

  function Rt(e, t) {
    return (
      (e.__esModule || (se && "Module" === e[Symbol.toStringTag])) &&
        (e = e.default),
      L(e) ? t.extend(e) : e
    );
  }

  function Ht(e) {
    if (Array.isArray(e))
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        if (j(n) && (j(n.componentOptions) || pt(n))) return n;
      }
  }

  function Vt(e, t) {
    Nt.$on(e, t);
  }

  function qt(e, t) {
    Nt.$off(e, t);
  }

  function Ut(t, n) {
    var i = Nt;
    return function e() {
      null !== n.apply(null, arguments) && i.$off(t, e);
    };
  }

  function Wt(e, t, n) {
    st(t, n || {}, Vt, qt, Ut, (Nt = e)), (Nt = void 0);
  }
  var Yt = null;

  function Xt(e) {
    var t = Yt;
    return (
      (Yt = e),
      function () {
        Yt = t;
      }
    );
  }

  function Kt(e) {
    for (; (e = e && e.$parent); ) if (e._inactive) return 1;
  }

  function Zt(e, t) {
    if (t) {
      if (((e._directInactive = !1), Kt(e))) return;
    } else if (e._directInactive) return;
    if (e._inactive || null === e._inactive) {
      e._inactive = !1;
      for (var n = 0; n < e.$children.length; n++) Zt(e.$children[n]);
      Gt(e, "activated");
    }
  }

  function Gt(e, t) {
    de();
    var n = e.$options[t],
      i = t + " hook";
    if (n) for (var o = 0, s = n.length; o < s; o++) He(n[o], e, null, e, i);
    e._hasHookEvent && e.$emit("hook:" + t), he();
  }
  var Jt,
    Qt = [],
    en = [],
    tn = {},
    nn = !1,
    on = !1,
    sn = 0,
    rn = 0,
    an = Date.now;

  function ln() {
    var e, t;
    for (
      rn = an(),
        on = !0,
        Qt.sort(function (e, t) {
          return e.id - t.id;
        }),
        sn = 0;
      sn < Qt.length;
      sn++
    )
      (e = Qt[sn]).before && e.before(), (t = e.id), (tn[t] = null), e.run();
    var n = en.slice(),
      i = Qt.slice();
    (sn = Qt.length = en.length = 0),
      (nn = on = !(tn = {})),
      (function (e) {
        for (var t = 0; t < e.length; t++) (e[t]._inactive = !0), Zt(e[t], !0);
      })(n),
      (function (e) {
        for (var t = e.length; t--; ) {
          var n = e[t],
            i = n.vm;
          i._watcher === n &&
            i._isMounted &&
            !i._isDestroyed &&
            Gt(i, "updated");
        }
      })(i),
      ne && z.devtools && ne.emit("flush");
  }
  !V ||
    Y ||
    ((Jt = window.performance) &&
      "function" == typeof Jt.now &&
      an() > document.createEvent("Event").timeStamp &&
      (an = function () {
        return Jt.now();
      }));

  function cn(e, t, n, i, o) {
    (this.vm = e),
      o && (e._watcher = this),
      e._watchers.push(this),
      i
        ? ((this.deep = !!i.deep),
          (this.user = !!i.user),
          (this.lazy = !!i.lazy),
          (this.sync = !!i.sync),
          (this.before = i.before))
        : (this.deep = this.user = this.lazy = this.sync = !1),
      (this.cb = n),
      (this.id = ++un),
      (this.active = !0),
      (this.dirty = this.lazy),
      (this.deps = []),
      (this.newDeps = []),
      (this.depIds = new oe()),
      (this.newDepIds = new oe()),
      (this.expression = ""),
      "function" == typeof t
        ? (this.getter = t)
        : ((this.getter = (function (e) {
            if (!R.test(e)) {
              var n = e.split(".");
              return function (e) {
                for (var t = 0; t < n.length; t++) {
                  if (!e) return;
                  e = e[n[t]];
                }
                return e;
              };
            }
          })(t)),
          this.getter || (this.getter = _)),
      (this.value = this.lazy ? void 0 : this.get());
  }
  var un = 0;
  (cn.prototype.get = function () {
    var e;
    de(this);
    var t = this.vm;
    try {
      e = this.getter.call(t, t);
    } catch (e) {
      if (!this.user) throw e;
      Re(e, t, 'getter for watcher "' + this.expression + '"');
    } finally {
      this.deep && nt(e), he(), this.cleanupDeps();
    }
    return e;
  }),
    (cn.prototype.addDep = function (e) {
      var t = e.id;
      this.newDepIds.has(t) ||
        (this.newDepIds.add(t),
        this.newDeps.push(e),
        this.depIds.has(t) || e.addSub(this));
    }),
    (cn.prototype.cleanupDeps = function () {
      for (var e = this.deps.length; e--; ) {
        var t = this.deps[e];
        this.newDepIds.has(t.id) || t.removeSub(this);
      }
      var n = this.depIds;
      (this.depIds = this.newDepIds),
        (this.newDepIds = n),
        this.newDepIds.clear(),
        (n = this.deps),
        (this.deps = this.newDeps),
        (this.newDeps = n),
        (this.newDeps.length = 0);
    }),
    (cn.prototype.update = function () {
      this.lazy
        ? (this.dirty = !0)
        : this.sync
        ? this.run()
        : (function (e) {
            var t = e.id;
            if (null == tn[t]) {
              if (((tn[t] = !0), on)) {
                for (var n = Qt.length - 1; sn < n && Qt[n].id > e.id; ) n--;
                Qt.splice(n + 1, 0, e);
              } else Qt.push(e);
              nn || ((nn = !0), et(ln));
            }
          })(this);
    }),
    (cn.prototype.run = function () {
      var e, t, n;
      !this.active ||
        (((e = this.get()) !== this.value || L(e) || this.deep) &&
          ((t = this.value),
          (this.value = e),
          this.user
            ? ((n = 'callback for watcher "' + this.expression + '"'),
              He(this.cb, this.vm, [e, t], this.vm, n))
            : this.cb.call(this.vm, e, t)));
    }),
    (cn.prototype.evaluate = function () {
      (this.value = this.get()), (this.dirty = !1);
    }),
    (cn.prototype.depend = function () {
      for (var e = this.deps.length; e--; ) this.deps[e].depend();
    }),
    (cn.prototype.teardown = function () {
      if (this.active) {
        this.vm._isBeingDestroyed || y(this.vm._watchers, this);
        for (var e = this.deps.length; e--; ) this.deps[e].removeSub(this);
        this.active = !1;
      }
    });
  var dn = {
    enumerable: !0,
    configurable: !0,
    get: _,
    set: _,
  };

  function hn(e, t, n) {
    (dn.get = function () {
      return this[t][n];
    }),
      (dn.set = function (e) {
        this[t][n] = e;
      }),
      Object.defineProperty(e, n, dn);
  }

  function pn(e) {
    e._watchers = [];
    var t = e.$options;
    t.props &&
      (function (n, i) {
        var o = n.$options.propsData || {},
          s = (n._props = {}),
          r = (n.$options._propKeys = []);
        n.$parent && _e(!1);
        var t,
          e =
            ((t = function (e) {
              r.push(e);
              var t = je(e, i, o, n);
              Ce(s, e, t), e in n || hn(n, "_props", e);
            }),
            (a.toString = function () {
              return t.toString();
            }),
            a);

        function a(e) {
          return t.apply(this, arguments);
        }
        for (var l in i) e(l);
        _e(!0);
      })(e, t.props),
      t.methods &&
        (function (e, t) {
          for (var n in (e.$options.props, t))
            e[n] = "function" != typeof t[n] ? _ : p(t[n], e);
        })(e, t.methods),
      t.data
        ? (function (e) {
            var t = e.$options.data;
            l(
              (t = e._data =
                "function" == typeof t
                  ? (function (e, t) {
                      de();
                      try {
                        return e.call(t, t);
                      } catch (e) {
                        return Re(e, t, "data()"), {};
                      } finally {
                        he();
                      }
                    })(t, e)
                  : t || {})
            ) || (t = {});
            for (
              var n,
                i = Object.keys(t),
                o = e.$options.props,
                s = (e.$options.methods, i.length);
              s--;

            ) {
              var r = i[s];
              (o && d(o, r)) ||
                (36 !== (n = (r + "").charCodeAt(0)) &&
                  95 !== n &&
                  hn(e, "_data", r));
            }
            $e(t, !0);
          })(e)
        : $e((e._data = {}), !0),
      t.computed &&
        (function (e, t) {
          var n = (e._computedWatchers = Object.create(null)),
            i = te();
          for (var o in t) {
            var s = t[o],
              r = "function" == typeof s ? s : s.get;
            i || (n[o] = new cn(e, r || _, _, fn)), o in e || mn(e, o, s);
          }
        })(e, t.computed),
      t.watch &&
        t.watch !== J &&
        (function (e, t) {
          for (var n in t) {
            var i = t[n];
            if (Array.isArray(i))
              for (var o = 0; o < i.length; o++) bn(e, n, i[o]);
            else bn(e, n, i);
          }
        })(e, t.watch);
  }
  var fn = {
    lazy: !0,
  };

  function mn(e, t, n) {
    var i = !te();
    "function" == typeof n
      ? ((dn.get = i ? vn(t) : gn(n)), (dn.set = _))
      : ((dn.get = n.get ? (i && !1 !== n.cache ? vn(t) : gn(n.get)) : _),
        (dn.set = n.set || _)),
      Object.defineProperty(e, t, dn);
  }

  function vn(t) {
    return function () {
      var e = this._computedWatchers && this._computedWatchers[t];
      if (e) return e.dirty && e.evaluate(), ce.target && e.depend(), e.value;
    };
  }

  function gn(e) {
    return function () {
      return e.call(this, this);
    };
  }

  function bn(e, t, n, i) {
    return (
      l(n) && (n = (i = n).handler),
      "string" == typeof n && (n = e[n]),
      e.$watch(t, n, i)
    );
  }
  var yn,
    kn,
    wn,
    _n,
    xn,
    $n = 0;

  function Cn(o) {
    var e,
      t,
      n = o.options;
    return (
      !o.super ||
        ((e = Cn(o.super)) !== o.superOptions &&
          ((o.superOptions = e),
          (t = (function () {
            var e,
              t = o.options,
              n = o.sealedOptions;
            for (var i in t) t[i] !== n[i] && ((e = e || {})[i] = t[i]);
            return e;
          })()) && m(o.extendOptions, t),
          (n = o.options = Ee(e, o.extendOptions)).name &&
            (n.components[n.name] = o))),
      n
    );
  }

  function Sn(e) {
    this._init(e);
  }

  function An(e) {
    e.cid = 0;
    var r = 1;
    e.extend = function (e) {
      e = e || {};
      var t = this,
        n = t.cid,
        i = e._Ctor || (e._Ctor = {});
      if (i[n]) return i[n];

      function o(e) {
        this._init(e);
      }
      var s = e.name || t.options.name;
      return (
        (((o.prototype = Object.create(t.prototype)).constructor = o).cid =
          r++),
        (o.options = Ee(t.options, e)),
        (o.super = t),
        o.options.props &&
          (function (e) {
            var t = e.options.props;
            for (var n in t) hn(e.prototype, "_props", n);
          })(o),
        o.options.computed &&
          (function (e) {
            var t = e.options.computed;
            for (var n in t) mn(e.prototype, n, t[n]);
          })(o),
        (o.extend = t.extend),
        (o.mixin = t.mixin),
        (o.use = t.use),
        F.forEach(function (e) {
          o[e] = t[e];
        }),
        s && (o.options.components[s] = o),
        (o.superOptions = t.options),
        (o.extendOptions = e),
        (o.sealedOptions = m({}, o.options)),
        (i[n] = o)
      );
    };
  }

  function Tn(e) {
    return e && (e.Ctor.options.name || e.tag);
  }

  function On(e, t) {
    return Array.isArray(e)
      ? -1 < e.indexOf(t)
      : "string" == typeof e
      ? -1 < e.split(",").indexOf(t)
      : "[object RegExp]" === n.call(e) && e.test(t);
  }

  function Fn(e, t) {
    var n = e.cache,
      i = e.keys,
      o = e._vnode;
    for (var s in n) {
      var r,
        a = n[s];
      !a || ((r = a.name) && !t(r) && Dn(n, s, i, o));
    }
  }

  function Dn(e, t, n, i) {
    var o = e[t];
    !o || (i && o.tag === i.tag) || o.componentInstance.$destroy(),
      (e[t] = null),
      y(n, t);
  }
  (Sn.prototype._init = function (e) {
    var t,
      n,
      i,
      o = this;
    (o._uid = $n++),
      (o._isVue = !0),
      e && e._isComponent
        ? (function (e) {
            var t = (o.$options = Object.create(o.constructor.options)),
              n = e._parentVnode;
            t.parent = e.parent;
            var i = (t._parentVnode = n).componentOptions;
            (t.propsData = i.propsData),
              (t._parentListeners = i.listeners),
              (t._renderChildren = i.children),
              (t._componentTag = i.tag),
              e.render &&
                ((t.render = e.render),
                (t.staticRenderFns = e.staticRenderFns));
          })(e)
        : (o.$options = Ee(Cn(o.constructor), e || {}, o)),
      (function (e) {
        var t = e.$options,
          n = t.parent;
        if (n && !t.abstract) {
          for (; n.$options.abstract && n.$parent; ) n = n.$parent;
          n.$children.push(e);
        }
        (e.$parent = n),
          (e.$root = n ? n.$root : e),
          (e.$children = []),
          (e.$refs = {}),
          (e._watcher = null),
          (e._inactive = null),
          (e._directInactive = !1),
          (e._isMounted = !1),
          (e._isDestroyed = !1),
          (e._isBeingDestroyed = !1);
      })(((o._renderProxy = o)._self = o)),
      (function (e) {
        (e._events = Object.create(null)), (e._hasHookEvent = !1);
        var t = e.$options._parentListeners;
        t && Wt(e, t);
      })(o),
      (function (o) {
        (o._vnode = null), (o._staticTrees = null);
        var e = o.$options,
          t = (o.$vnode = e._parentVnode),
          n = t && t.context;
        (o.$slots = dt(e._renderChildren, n)),
          (o.$scopedSlots = g),
          (o._c = function (e, t, n, i) {
            return Pt(o, e, t, n, i, !1);
          }),
          (o.$createElement = function (e, t, n, i) {
            return Pt(o, e, t, n, i, !0);
          });
        var i = t && t.data;
        Ce(o, "$attrs", (i && i.attrs) || g, null, !0),
          Ce(o, "$listeners", e._parentListeners || g, null, !0);
      })(o),
      Gt(o, "beforeCreate"),
      (i = ut((n = o).$options.inject, n)) &&
        (_e(!1),
        Object.keys(i).forEach(function (e) {
          Ce(n, e, i[e]);
        }),
        _e(!0)),
      pn(o),
      (t = o.$options.provide) &&
        (o._provided = "function" == typeof t ? t.call(o) : t),
      Gt(o, "created"),
      o.$options.el && o.$mount(o.$options.el);
  }),
    (xn = Sn),
    Object.defineProperty(xn.prototype, "$data", {
      get: function () {
        return this._data;
      },
    }),
    Object.defineProperty(xn.prototype, "$props", {
      get: function () {
        return this._props;
      },
    }),
    (xn.prototype.$set = Se),
    (xn.prototype.$delete = Ae),
    (xn.prototype.$watch = function (e, t, n) {
      if (l(t)) return bn(this, e, t, n);
      (n = n || {}).user = !0;
      var i,
        o = new cn(this, e, t, n);
      return (
        n.immediate &&
          ((i = 'callback for immediate watcher "' + o.expression + '"'),
          de(),
          He(t, this, [o.value], this, i),
          he()),
        function () {
          o.teardown();
        }
      );
    }),
    (_n = /^hook:/),
    ((wn = Sn).prototype.$on = function (e, t) {
      var n = this;
      if (Array.isArray(e))
        for (var i = 0, o = e.length; i < o; i++) n.$on(e[i], t);
      else
        (n._events[e] || (n._events[e] = [])).push(t),
          _n.test(e) && (n._hasHookEvent = !0);
      return n;
    }),
    (wn.prototype.$once = function (e, t) {
      var n = this;

      function i() {
        n.$off(e, i), t.apply(n, arguments);
      }
      return (i.fn = t), n.$on(e, i), n;
    }),
    (wn.prototype.$off = function (e, t) {
      var n = this;
      if (!arguments.length) return (n._events = Object.create(null)), n;
      if (Array.isArray(e)) {
        for (var i = 0, o = e.length; i < o; i++) n.$off(e[i], t);
        return n;
      }
      var s,
        r = n._events[e];
      if (!r) return n;
      if (!t) return (n._events[e] = null), n;
      for (var a = r.length; a--; )
        if ((s = r[a]) === t || s.fn === t) {
          r.splice(a, 1);
          break;
        }
      return n;
    }),
    (wn.prototype.$emit = function (e) {
      var t = this._events[e];
      if (t) {
        t = 1 < t.length ? f(t) : t;
        for (
          var n = f(arguments, 1),
            i = 'event handler for "' + e + '"',
            o = 0,
            s = t.length;
          o < s;
          o++
        )
          He(t[o], this, n, this, i);
      }
      return this;
    }),
    ((kn = Sn).prototype._update = function (e, t) {
      var n = this,
        i = n.$el,
        o = n._vnode,
        s = Xt(n);
      (n._vnode = e),
        (n.$el = o ? n.__patch__(o, e) : n.__patch__(n.$el, e, t, !1)),
        s(),
        i && (i.__vue__ = null),
        n.$el && (n.$el.__vue__ = n),
        n.$vnode &&
          n.$parent &&
          n.$vnode === n.$parent._vnode &&
          (n.$parent.$el = n.$el);
    }),
    (kn.prototype.$forceUpdate = function () {
      this._watcher && this._watcher.update();
    }),
    (kn.prototype.$destroy = function () {
      var e = this;
      if (!e._isBeingDestroyed) {
        Gt(e, "beforeDestroy"), (e._isBeingDestroyed = !0);
        var t = e.$parent;
        !t || t._isBeingDestroyed || e.$options.abstract || y(t.$children, e),
          e._watcher && e._watcher.teardown();
        for (var n = e._watchers.length; n--; ) e._watchers[n].teardown();
        e._data.__ob__ && e._data.__ob__.vmCount--,
          (e._isDestroyed = !0),
          e.__patch__(e._vnode, null),
          Gt(e, "destroyed"),
          e.$off(),
          e.$el && (e.$el.__vue__ = null),
          e.$vnode && (e.$vnode.parent = null);
      }
    }),
    Ot((yn = Sn).prototype),
    (yn.prototype.$nextTick = function (e) {
      return et(e, this);
    }),
    (yn.prototype._render = function () {
      var e,
        t = this,
        n = t.$options,
        i = n.render,
        o = n._parentVnode;
      o && (t.$scopedSlots = ft(o.data.scopedSlots, t.$slots, t.$scopedSlots)),
        (t.$vnode = o);
      try {
        (Bt = t), (e = i.call(t._renderProxy, t.$createElement));
      } catch (n) {
        Re(n, t, "render"), (e = t._vnode);
      } finally {
        Bt = null;
      }
      return (
        Array.isArray(e) && 1 === e.length && (e = e[0]),
        e instanceof pe || (e = me()),
        (e.parent = o),
        e
      );
    });
  var zn,
    Mn,
    En,
    In = [String, RegExp, Array],
    jn = {
      KeepAlive: {
        name: "keep-alive",
        abstract: !0,
        props: {
          include: In,
          exclude: In,
          max: [String, Number],
        },
        methods: {
          cacheVNode: function () {
            var e,
              t,
              n,
              i = this.cache,
              o = this.keys,
              s = this.vnodeToCache,
              r = this.keyToCache;
            s &&
              ((e = s.tag),
              (t = s.componentInstance),
              (n = s.componentOptions),
              (i[r] = {
                name: Tn(n),
                tag: e,
                componentInstance: t,
              }),
              o.push(r),
              this.max &&
                o.length > parseInt(this.max) &&
                Dn(i, o[0], o, this._vnode),
              (this.vnodeToCache = null));
          },
        },
        created: function () {
          (this.cache = Object.create(null)), (this.keys = []);
        },
        destroyed: function () {
          for (var e in this.cache) Dn(this.cache, e, this.keys);
        },
        mounted: function () {
          var e = this;
          this.cacheVNode(),
            this.$watch("include", function (t) {
              Fn(e, function (e) {
                return On(t, e);
              });
            }),
            this.$watch("exclude", function (t) {
              Fn(e, function (e) {
                return !On(t, e);
              });
            });
        },
        updated: function () {
          this.cacheVNode();
        },
        render: function () {
          var e = this.$slots.default,
            t = Ht(e),
            n = t && t.componentOptions;
          if (n) {
            var i = Tn(n),
              o = this.include,
              s = this.exclude;
            if ((o && (!i || !On(o, i))) || (s && i && On(s, i))) return t;
            var r = this.cache,
              a = this.keys,
              l =
                null == t.key
                  ? n.Ctor.cid + (n.tag ? "::" + n.tag : "")
                  : t.key;
            r[l]
              ? ((t.componentInstance = r[l].componentInstance),
                y(a, l),
                a.push(l))
              : ((this.vnodeToCache = t), (this.keyToCache = l)),
              (t.data.keepAlive = !0);
          }
          return t || (e && e[0]);
        },
      },
    };
  (zn = Sn),
    (En = {
      get: function () {
        return z;
      },
    }),
    Object.defineProperty(zn, "config", En),
    (zn.util = {
      warn: ae,
      extend: m,
      mergeOptions: Ee,
      defineReactive: Ce,
    }),
    (zn.set = Se),
    (zn.delete = Ae),
    (zn.nextTick = et),
    (zn.observable = function (e) {
      return $e(e), e;
    }),
    (zn.options = Object.create(null)),
    F.forEach(function (e) {
      zn.options[e + "s"] = Object.create(null);
    }),
    m((zn.options._base = zn).options.components, jn),
    (zn.use = function (e) {
      var t = this._installedPlugins || (this._installedPlugins = []);
      if (-1 < t.indexOf(e)) return this;
      var n = f(arguments, 1);
      return (
        n.unshift(this),
        "function" == typeof e.install
          ? e.install.apply(e, n)
          : "function" == typeof e && e.apply(null, n),
        t.push(e),
        this
      );
    }),
    (zn.mixin = function (e) {
      return (this.options = Ee(this.options, e)), this;
    }),
    An(zn),
    (Mn = zn),
    F.forEach(function (n) {
      Mn[n] = function (e, t) {
        return t
          ? ("component" === n &&
              l(t) &&
              ((t.name = t.name || e), (t = this.options._base.extend(t))),
            "directive" === n &&
              "function" == typeof t &&
              (t = {
                bind: t,
                update: t,
              }),
            (this.options[n + "s"][e] = t))
          : this.options[n + "s"][e];
      };
    }),
    Object.defineProperty(Sn.prototype, "$isServer", {
      get: te,
    }),
    Object.defineProperty(Sn.prototype, "$ssrContext", {
      get: function () {
        return this.$vnode && this.$vnode.ssrContext;
      },
    }),
    Object.defineProperty(Sn, "FunctionalRenderContext", {
      value: Ft,
    }),
    (Sn.version = "2.6.14");

  function Ln(e, t, n) {
    return (
      ("value" === n && Nn(e) && "button" !== t) ||
      ("selected" === n && "option" === e) ||
      ("checked" === n && "input" === e) ||
      ("muted" === n && "video" === e)
    );
  }
  var Pn = r("style,class"),
    Nn = r("input,textarea,option,select,progress"),
    Bn = r("contenteditable,draggable,spellcheck"),
    Rn = r("events,caret,typing,plaintext-only"),
    Hn = function (e, t) {
      return Yn(t) || "false" === t
        ? "false"
        : "contenteditable" === e && Rn(t)
        ? t
        : "true";
    },
    Vn = r(
      "allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"
    ),
    qn = "http://www.w3.org/1999/xlink",
    Un = function (e) {
      return ":" === e.charAt(5) && "xlink" === e.slice(0, 5);
    },
    Wn = function (e) {
      return Un(e) ? e.slice(6, e.length) : "";
    },
    Yn = function (e) {
      return null == e || !1 === e;
    };

  function Xn(e, t) {
    return {
      staticClass: Kn(e.staticClass, t.staticClass),
      class: j(e.class) ? [e.class, t.class] : t.class,
    };
  }

  function Kn(e, t) {
    return e ? (t ? e + " " + t : e) : t || "";
  }

  function Zn(e) {
    return Array.isArray(e)
      ? (function (e) {
          for (var t, n = "", i = 0, o = e.length; i < o; i++)
            j((t = Zn(e[i]))) && "" !== t && (n && (n += " "), (n += t));
          return n;
        })(e)
      : L(e)
      ? (function (e) {
          var t = "";
          for (var n in e) e[n] && (t && (t += " "), (t += n));
          return t;
        })(e)
      : "string" == typeof e
      ? e
      : "";
  }

  function Gn(e) {
    return Qn(e) || ei(e);
  }
  var Jn = {
      svg: "http://www.w3.org/2000/svg",
      math: "http://www.w3.org/1998/Math/MathML",
    },
    Qn = r(
      "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"
    ),
    ei = r(
      "svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",
      !0
    );

  function ti(e) {
    return ei(e) ? "svg" : "math" === e ? "math" : void 0;
  }
  var ni = Object.create(null),
    ii = r("text,number,password,search,email,tel,url");

  function oi(e) {
    return "string" != typeof e
      ? e
      : document.querySelector(e) || document.createElement("div");
  }
  var si = Object.freeze({
      createElement: function (e, t) {
        var n = document.createElement(e);
        return (
          "select" !== e ||
            (t.data &&
              t.data.attrs &&
              void 0 !== t.data.attrs.multiple &&
              n.setAttribute("multiple", "multiple")),
          n
        );
      },
      createElementNS: function (e, t) {
        return document.createElementNS(Jn[e], t);
      },
      createTextNode: function (e) {
        return document.createTextNode(e);
      },
      createComment: function (e) {
        return document.createComment(e);
      },
      insertBefore: function (e, t, n) {
        e.insertBefore(t, n);
      },
      removeChild: function (e, t) {
        e.removeChild(t);
      },
      appendChild: function (e, t) {
        e.appendChild(t);
      },
      parentNode: function (e) {
        return e.parentNode;
      },
      nextSibling: function (e) {
        return e.nextSibling;
      },
      tagName: function (e) {
        return e.tagName;
      },
      setTextContent: function (e, t) {
        e.textContent = t;
      },
      setStyleScope: function (e, t) {
        e.setAttribute(t, "");
      },
    }),
    ri = {
      create: function (e, t) {
        ai(t);
      },
      update: function (e, t) {
        e.data.ref !== t.data.ref && (ai(e, !0), ai(t));
      },
      destroy: function (e) {
        ai(e, !0);
      },
    };

  function ai(e, t) {
    var n,
      i,
      o,
      s = e.data.ref;
    j(s) &&
      ((n = e.context),
      (i = e.componentInstance || e.elm),
      (o = n.$refs),
      t
        ? Array.isArray(o[s])
          ? y(o[s], i)
          : o[s] === i && (o[s] = void 0)
        : e.data.refInFor
        ? Array.isArray(o[s])
          ? o[s].indexOf(i) < 0 && o[s].push(i)
          : (o[s] = [i])
        : (o[s] = i));
  }
  var li = new pe("", {}, []),
    ci = ["create", "activate", "update", "remove", "destroy"];

  function ui(i, o) {
    return (
      i.key === o.key &&
      i.asyncFactory === o.asyncFactory &&
      ((i.tag === o.tag &&
        i.isComment === o.isComment &&
        j(i.data) === j(o.data) &&
        (function () {
          if ("input" !== i.tag) return 1;
          var e,
            t = j((e = i.data)) && j((e = e.attrs)) && e.type,
            n = j((e = o.data)) && j((e = e.attrs)) && e.type;
          return t === n || (ii(t) && ii(n));
        })()) ||
        (A(i.isAsyncPlaceholder) && I(o.asyncFactory.error)))
    );
  }
  var di = {
    create: hi,
    update: hi,
    destroy: function (e) {
      hi(e, li);
    },
  };

  function hi(e, t) {
    (e.data.directives || t.data.directives) &&
      (function (t, n) {
        var e,
          i,
          o,
          s,
          r = t === li,
          a = n === li,
          l = fi(t.data.directives, t.context),
          c = fi(n.data.directives, n.context),
          u = [],
          d = [];
        for (e in c)
          (i = l[e]),
            (o = c[e]),
            i
              ? ((o.oldValue = i.value),
                (o.oldArg = i.arg),
                mi(o, "update", n, t),
                o.def && o.def.componentUpdated && d.push(o))
              : (mi(o, "bind", n, t), o.def && o.def.inserted && u.push(o));
        if (
          (u.length &&
            ((s = function () {
              for (var e = 0; e < u.length; e++) mi(u[e], "inserted", n, t);
            }),
            r ? rt(n, "insert", s) : s()),
          d.length &&
            rt(n, "postpatch", function () {
              for (var e = 0; e < d.length; e++)
                mi(d[e], "componentUpdated", n, t);
            }),
          !r)
        )
          for (e in l) c[e] || mi(l[e], "unbind", t, t, a);
      })(e, t);
  }
  var pi = Object.create(null);

  function fi(e, t) {
    var n,
      i,
      o,
      s = Object.create(null);
    if (!e) return s;
    for (n = 0; n < e.length; n++)
      (i = e[n]).modifiers || (i.modifiers = pi),
        ((s[
          (o = i).rawName ||
            o.name + "." + Object.keys(o.modifiers || {}).join(".")
        ] = i).def = Ie(t.$options, "directives", i.name));
    return s;
  }

  function mi(e, t, n, i, o) {
    var s = e.def && e.def[t];
    if (s)
      try {
        s(n.elm, e, n, i, o);
      } catch (i) {
        Re(i, n.context, "directive " + e.name + " " + t + " hook");
      }
  }
  var vi = [ri, di];

  function gi(e, t) {
    var n = t.componentOptions;
    if (
      !(
        (j(n) && !1 === n.Ctor.options.inheritAttrs) ||
        (I(e.data.attrs) && I(t.data.attrs))
      )
    ) {
      var i,
        o,
        s = t.elm,
        r = e.data.attrs || {},
        a = t.data.attrs || {};
      for (i in (j(a.__ob__) && (a = t.data.attrs = m({}, a)), a))
        (o = a[i]), r[i] !== o && bi(s, i, o, t.data.pre);
      for (i in ((Y || K) && a.value !== r.value && bi(s, "value", a.value), r))
        I(a[i]) &&
          (Un(i)
            ? s.removeAttributeNS(qn, Wn(i))
            : Bn(i) || s.removeAttribute(i));
    }
  }

  function bi(e, t, n, i) {
    i || -1 < e.tagName.indexOf("-")
      ? yi(e, t, n)
      : Vn(t)
      ? Yn(n)
        ? e.removeAttribute(t)
        : ((n = "allowfullscreen" === t && "EMBED" === e.tagName ? "true" : t),
          e.setAttribute(t, n))
      : Bn(t)
      ? e.setAttribute(t, Hn(t, n))
      : Un(t)
      ? Yn(n)
        ? e.removeAttributeNS(qn, Wn(t))
        : e.setAttributeNS(qn, t, n)
      : yi(e, t, n);
  }

  function yi(n, e, t) {
    Yn(t)
      ? n.removeAttribute(e)
      : (!Y ||
          X ||
          "TEXTAREA" !== n.tagName ||
          "placeholder" !== e ||
          "" === t ||
          n.__ieph ||
          (n.addEventListener("input", function e(t) {
            t.stopImmediatePropagation(), n.removeEventListener("input", e);
          }),
          (n.__ieph = !0)),
        n.setAttribute(e, t));
  }
  var ki = {
    create: gi,
    update: gi,
  };

  function wi(e, t) {
    var n,
      i,
      o = t.elm,
      s = t.data,
      r = e.data;
    (I(s.staticClass) &&
      I(s.class) &&
      (I(r) || (I(r.staticClass) && I(r.class)))) ||
      ((n = (function (e) {
        for (var t, n, i = e.data, o = e, s = e; j(s.componentInstance); )
          (s = s.componentInstance._vnode) && s.data && (i = Xn(s.data, i));
        for (; j((o = o.parent)); ) o && o.data && (i = Xn(i, o.data));
        return (
          (t = i.staticClass), (n = i.class), j(t) || j(n) ? Kn(t, Zn(n)) : ""
        );
      })(t)),
      j((i = o._transitionClasses)) && (n = Kn(n, Zn(i))),
      n !== o._prevClass && (o.setAttribute("class", n), (o._prevClass = n)));
  }
  var _i,
    xi,
    $i,
    Ci,
    Si,
    Ai,
    Ti = {
      create: wi,
      update: wi,
    },
    Oi = /[\w).+\-_$\]]/;

  function Fi(e) {
    for (
      var t,
        n,
        i,
        o,
        s = !1,
        r = !1,
        a = !1,
        l = !1,
        c = 0,
        u = 0,
        d = 0,
        h = 0,
        p = 0;
      p < e.length;
      p++
    )
      if (((n = t), (t = e.charCodeAt(p)), s)) 39 === t && 92 !== n && (s = !1);
      else if (r) 34 === t && 92 !== n && (r = !1);
      else if (a) 96 === t && 92 !== n && (a = !1);
      else if (l) 47 === t && 92 !== n && (l = !1);
      else if (
        124 !== t ||
        124 === e.charCodeAt(p + 1) ||
        124 === e.charCodeAt(p - 1) ||
        c ||
        u ||
        d
      ) {
        switch (t) {
          case 34:
            r = !0;
            break;
          case 39:
            s = !0;
            break;
          case 96:
            a = !0;
            break;
          case 40:
            d++;
            break;
          case 41:
            d--;
            break;
          case 91:
            u++;
            break;
          case 93:
            u--;
            break;
          case 123:
            c++;
            break;
          case 125:
            c--;
        }
        if (47 === t) {
          for (
            var f = p - 1, m = void 0;
            0 <= f && " " === (m = e.charAt(f));
            f--
          );
          (m && Oi.test(m)) || (l = !0);
        }
      } else void 0 === i ? ((h = p + 1), (i = e.slice(0, p).trim())) : v();

    function v() {
      (o = o || []).push(e.slice(h, p).trim()), (h = p + 1);
    }
    if ((void 0 === i ? (i = e.slice(0, p).trim()) : 0 !== h && v(), o))
      for (p = 0; p < o.length; p++)
        i = (function (e, t) {
          var n = t.indexOf("(");
          if (n < 0) return '_f("' + t + '")(' + e + ")";
          var i = t.slice(0, n),
            o = t.slice(n + 1);
          return '_f("' + i + '")(' + e + (")" !== o ? "," + o : o);
        })(i, o[p]);
    return i;
  }

  function Di(e, t) {
    console.error("[Vue compiler]: " + e);
  }

  function zi(e, t) {
    return e
      ? e
          .map(function (e) {
            return e[t];
          })
          .filter(function (e) {
            return e;
          })
      : [];
  }

  function Mi(e, t, n, i, o) {
    (e.props || (e.props = [])).push(
      Ri(
        {
          name: t,
          value: n,
          dynamic: o,
        },
        i
      )
    ),
      (e.plain = !1);
  }

  function Ei(e, t, n, i, o) {
    (o
      ? e.dynamicAttrs || (e.dynamicAttrs = [])
      : e.attrs || (e.attrs = [])
    ).push(
      Ri(
        {
          name: t,
          value: n,
          dynamic: o,
        },
        i
      )
    ),
      (e.plain = !1);
  }

  function Ii(e, t, n, i) {
    (e.attrsMap[t] = n),
      e.attrsList.push(
        Ri(
          {
            name: t,
            value: n,
          },
          i
        )
      );
  }

  function ji(e, t, n) {
    return n ? "_p(" + t + ',"' + e + '")' : e + t;
  }

  function Li(e, t, n, i, o, s, r, a) {
    var l;
    (i = i || g).right
      ? a
        ? (t = "(" + t + ")==='click'?'contextmenu':(" + t + ")")
        : "click" === t && ((t = "contextmenu"), delete i.right)
      : i.middle &&
        (a
          ? (t = "(" + t + ")==='click'?'mouseup':(" + t + ")")
          : "click" === t && (t = "mouseup")),
      i.capture && (delete i.capture, (t = ji("!", t, a))),
      i.once && (delete i.once, (t = ji("~", t, a))),
      i.passive && (delete i.passive, (t = ji("&", t, a))),
      (l = i.native
        ? (delete i.native, e.nativeEvents || (e.nativeEvents = {}))
        : e.events || (e.events = {}));
    var c = Ri(
      {
        value: n.trim(),
        dynamic: a,
      },
      r
    );
    i !== g && (c.modifiers = i);
    var u = l[t];
    Array.isArray(u)
      ? o
        ? u.unshift(c)
        : u.push(c)
      : (l[t] = u ? (o ? [c, u] : [u, c]) : c),
      (e.plain = !1);
  }

  function Pi(e, t, n) {
    var i = Ni(e, ":" + t) || Ni(e, "v-bind:" + t);
    if (null != i) return Fi(i);
    if (!1 !== n) {
      var o = Ni(e, t);
      if (null != o) return JSON.stringify(o);
    }
  }

  function Ni(e, t, n) {
    var i;
    if (null != (i = e.attrsMap[t]))
      for (var o = e.attrsList, s = 0, r = o.length; s < r; s++)
        if (o[s].name === t) {
          o.splice(s, 1);
          break;
        }
    return n && delete e.attrsMap[t], i;
  }

  function Bi(e, t) {
    for (var n = e.attrsList, i = 0, o = n.length; i < o; i++) {
      var s = n[i];
      if (t.test(s.name)) return n.splice(i, 1), s;
    }
  }

  function Ri(e, t) {
    return (
      t &&
        (null != t.start && (e.start = t.start),
        null != t.end && (e.end = t.end)),
      e
    );
  }

  function Hi(e, t, n) {
    var i = n || {},
      o = i.trim ? "(typeof $$v === 'string'? $$v.trim(): $$v)" : "$$v";
    i.number && (o = "_n(" + o + ")");
    var s = Vi(t, o);
    e.model = {
      value: "(" + t + ")",
      expression: JSON.stringify(t),
      callback: "function ($$v) {" + s + "}",
    };
  }

  function Vi(e, t) {
    var n = (function (e) {
      if (
        ((e = e.trim()),
        (_i = e.length),
        e.indexOf("[") < 0 || e.lastIndexOf("]") < _i - 1)
      )
        return -1 < (Ci = e.lastIndexOf("."))
          ? {
              exp: e.slice(0, Ci),
              key: '"' + e.slice(Ci + 1) + '"',
            }
          : {
              exp: e,
              key: null,
            };
      for (xi = e, Ci = Si = Ai = 0; !Ui(); )
        Wi(($i = qi()))
          ? Yi($i)
          : 91 === $i &&
            (function (e) {
              var t = 1;
              for (Si = Ci; !Ui(); )
                if (Wi((e = qi()))) Yi(e);
                else if ((91 === e && t++, 93 === e && t--, 0 === t)) {
                  Ai = Ci;
                  break;
                }
            })($i);
      return {
        exp: e.slice(0, Si),
        key: e.slice(Si + 1, Ai),
      };
    })(e);
    return null === n.key
      ? e + "=" + t
      : "$set(" + n.exp + ", " + n.key + ", " + t + ")";
  }

  function qi() {
    return xi.charCodeAt(++Ci);
  }

  function Ui() {
    return _i <= Ci;
  }

  function Wi(e) {
    return 34 === e || 39 === e;
  }

  function Yi(e) {
    for (var t = e; !Ui() && (e = qi()) !== t; );
  }
  var Xi,
    Ki = "__r";

  function Zi(t, n, i) {
    var o = Xi;
    return function e() {
      null !== n.apply(null, arguments) && Qi(t, e, i, o);
    };
  }
  var Gi = Ze && !(G && Number(G[1]) <= 53);

  function Ji(e, t, n, i) {
    var o, s;
    Gi &&
      ((o = rn),
      (t = (s = t)._wrapper =
        function (e) {
          if (
            e.target === e.currentTarget ||
            e.timeStamp >= o ||
            e.timeStamp <= 0 ||
            e.target.ownerDocument !== document
          )
            return s.apply(this, arguments);
        })),
      Xi.addEventListener(
        e,
        t,
        Q
          ? {
              capture: n,
              passive: i,
            }
          : n
      );
  }

  function Qi(e, t, n, i) {
    (i || Xi).removeEventListener(e, t._wrapper || t, n);
  }

  function eo(e, t) {
    var n, i, o, s;
    (I(e.data.on) && I(t.data.on)) ||
      ((n = t.data.on || {}),
      (i = e.data.on || {}),
      (Xi = t.elm),
      j((o = n).__r) &&
        ((o[(s = Y ? "change" : "input")] = [].concat(o.__r, o[s] || [])),
        delete o.__r),
      j(o.__c) && ((o.change = [].concat(o.__c, o.change || [])), delete o.__c),
      st(n, i, Ji, Qi, Zi, t.context),
      (Xi = void 0));
  }
  var to,
    no = {
      create: eo,
      update: eo,
    };

  function io(e, t) {
    if (!I(e.data.domProps) || !I(t.data.domProps)) {
      var n,
        i,
        o = t.elm,
        s = e.data.domProps || {},
        r = t.data.domProps || {};
      for (n in (j(r.__ob__) && (r = t.data.domProps = m({}, r)), s))
        n in r || (o[n] = "");
      for (n in r) {
        if (((i = r[n]), "textContent" === n || "innerHTML" === n)) {
          if ((t.children && (t.children.length = 0), i === s[n])) continue;
          1 === o.childNodes.length && o.removeChild(o.childNodes[0]);
        }
        if ("value" === n && "PROGRESS" !== o.tagName) {
          var a = I((o._value = i)) ? "" : String(i);
          (u = a),
            (c = o).composing ||
              ("OPTION" !== c.tagName &&
                !(function (e, t) {
                  var n = !0;
                  try {
                    n = document.activeElement !== e;
                  } catch (e) {}
                  return n && e.value !== t;
                })(c, u) &&
                !(function (e) {
                  var t = c.value,
                    n = c._vModifiers;
                  if (j(n)) {
                    if (n.number) return P(t) !== P(e);
                    if (n.trim) return t.trim() !== e.trim();
                  }
                  return t !== e;
                })(u)) ||
              (o.value = a);
        } else if ("innerHTML" === n && ei(o.tagName) && I(o.innerHTML)) {
          (to = to || document.createElement("div")).innerHTML =
            "<svg>" + i + "</svg>";
          for (var l = to.firstChild; o.firstChild; )
            o.removeChild(o.firstChild);
          for (; l.firstChild; ) o.appendChild(l.firstChild);
        } else if (i !== s[n])
          try {
            o[n] = i;
          } catch (e) {}
      }
    }
    var c, u;
  }
  var oo = {
      create: io,
      update: io,
    },
    so = e(function (e) {
      var n = {},
        i = /:(.+)/;
      return (
        e.split(/;(?![^(]*\))/g).forEach(function (e) {
          var t;
          !e || (1 < (t = e.split(i)).length && (n[t[0].trim()] = t[1].trim()));
        }),
        n
      );
    });

  function ro(e) {
    var t = ao(e.style);
    return e.staticStyle ? m(e.staticStyle, t) : t;
  }

  function ao(e) {
    return Array.isArray(e) ? v(e) : "string" == typeof e ? so(e) : e;
  }

  function lo(e, t, n) {
    if (uo.test(t)) e.style.setProperty(t, n);
    else if (ho.test(n))
      e.style.setProperty(w(t), n.replace(ho, ""), "important");
    else {
      var i = fo(t);
      if (Array.isArray(n))
        for (var o = 0, s = n.length; o < s; o++) e.style[i] = n[o];
      else e.style[i] = n;
    }
  }
  var co,
    uo = /^--/,
    ho = /\s*!important$/,
    po = ["Webkit", "Moz", "ms"],
    fo = e(function (e) {
      if (
        ((co = co || document.createElement("div").style),
        "filter" !== (e = k(e)) && e in co)
      )
        return e;
      for (
        var t = e.charAt(0).toUpperCase() + e.slice(1), n = 0;
        n < po.length;
        n++
      ) {
        var i = po[n] + t;
        if (i in co) return i;
      }
    });

  function mo(e, t) {
    var n = t.data,
      i = e.data;
    if (!(I(n.staticStyle) && I(n.style) && I(i.staticStyle) && I(i.style))) {
      var o,
        s,
        r = t.elm,
        a = i.staticStyle,
        l = i.normalizedStyle || i.style || {},
        c = a || l,
        u = ao(t.data.style) || {};
      t.data.normalizedStyle = j(u.__ob__) ? m({}, u) : u;
      var d = (function (e) {
        for (var t, n = {}, i = e; i.componentInstance; )
          (i = i.componentInstance._vnode) &&
            i.data &&
            (t = ro(i.data)) &&
            m(n, t);
        (t = ro(e.data)) && m(n, t);
        for (var o = e; (o = o.parent); ) o.data && (t = ro(o.data)) && m(n, t);
        return n;
      })(t);
      for (s in c) I(d[s]) && lo(r, s, "");
      for (s in d) (o = d[s]) !== c[s] && lo(r, s, null == o ? "" : o);
    }
  }
  var vo = {
      create: mo,
      update: mo,
    },
    go = /\s+/;

  function bo(t, e) {
    var n;
    (e = e && e.trim()) &&
      (t.classList
        ? -1 < e.indexOf(" ")
          ? e.split(go).forEach(function (e) {
              return t.classList.add(e);
            })
          : t.classList.add(e)
        : (n = " " + (t.getAttribute("class") || "") + " ").indexOf(
            " " + e + " "
          ) < 0 && t.setAttribute("class", (n + e).trim()));
  }

  function yo(t, e) {
    if ((e = e && e.trim()))
      if (t.classList)
        -1 < e.indexOf(" ")
          ? e.split(go).forEach(function (e) {
              return t.classList.remove(e);
            })
          : t.classList.remove(e),
          t.classList.length || t.removeAttribute("class");
      else {
        for (
          var n = " " + (t.getAttribute("class") || "") + " ",
            i = " " + e + " ";
          0 <= n.indexOf(i);

        )
          n = n.replace(i, " ");
        (n = n.trim())
          ? t.setAttribute("class", n)
          : t.removeAttribute("class");
      }
  }

  function ko(e) {
    if (e) {
      if ("object" != (void 0 === e ? "undefined" : _typeof2(e)))
        return "string" == typeof e ? wo(e) : void 0;
      var t = {};
      return !1 !== e.css && m(t, wo(e.name || "v")), m(t, e), t;
    }
  }
  var wo = e(function (e) {
      return {
        enterClass: e + "-enter",
        enterToClass: e + "-enter-to",
        enterActiveClass: e + "-enter-active",
        leaveClass: e + "-leave",
        leaveToClass: e + "-leave-to",
        leaveActiveClass: e + "-leave-active",
      };
    }),
    _o = V && !X,
    xo = "transition",
    $o = "animation",
    Co = "transition",
    So = "transitionend",
    Ao = "animation",
    To = "animationend";
  _o &&
    (void 0 === window.ontransitionend &&
      void 0 !== window.onwebkittransitionend &&
      ((Co = "WebkitTransition"), (So = "webkitTransitionEnd")),
    void 0 === window.onanimationend &&
      void 0 !== window.onwebkitanimationend &&
      ((Ao = "WebkitAnimation"), (To = "webkitAnimationEnd")));
  var Oo = V
    ? window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : setTimeout
    : function (e) {
        return e();
      };

  function Fo(e) {
    Oo(function () {
      Oo(e);
    });
  }

  function Do(e, t) {
    var n = e._transitionClasses || (e._transitionClasses = []);
    n.indexOf(t) < 0 && (n.push(t), bo(e, t));
  }

  function zo(e, t) {
    e._transitionClasses && y(e._transitionClasses, t), yo(e, t);
  }

  function Mo(t, e, n) {
    var i = Io(t, e),
      o = i.type,
      s = i.timeout,
      r = i.propCount;
    if (!o) return n();

    function a() {
      t.removeEventListener(l, u), n();
    }
    var l = o === xo ? So : To,
      c = 0,
      u = function (e) {
        e.target === t && ++c >= r && a();
      };
    setTimeout(function () {
      c < r && a();
    }, s + 1),
      t.addEventListener(l, u);
  }
  var Eo = /\b(transform|all)(,|$)/;

  function Io(e, t) {
    var n,
      i = window.getComputedStyle(e),
      o = (i[Co + "Delay"] || "").split(", "),
      s = (i[Co + "Duration"] || "").split(", "),
      r = jo(o, s),
      a = (i[Ao + "Delay"] || "").split(", "),
      l = (i[Ao + "Duration"] || "").split(", "),
      c = jo(a, l),
      u = 0,
      d = 0;
    return (
      t === xo
        ? 0 < r && ((n = xo), (u = r), (d = s.length))
        : t === $o
        ? 0 < c && ((n = $o), (u = c), (d = l.length))
        : (d = (n = 0 < (u = Math.max(r, c)) ? (c < r ? xo : $o) : null)
            ? n === xo
              ? s.length
              : l.length
            : 0),
      {
        type: n,
        timeout: u,
        propCount: d,
        hasTransform: n === xo && Eo.test(i[Co + "Property"]),
      }
    );
  }

  function jo(n, e) {
    for (; n.length < e.length; ) n = n.concat(n);
    return Math.max.apply(
      null,
      e.map(function (e, t) {
        return Lo(e) + Lo(n[t]);
      })
    );
  }

  function Lo(e) {
    return 1e3 * Number(e.slice(0, -1).replace(",", "."));
  }

  function Po(n, e) {
    var i = n.elm;
    j(i._leaveCb) && ((i._leaveCb.cancelled = !0), i._leaveCb());
    var t = ko(n.data.transition);
    if (!I(t) && !j(i._enterCb) && 1 === i.nodeType) {
      for (
        var o = t.css,
          s = t.type,
          r = t.enterClass,
          a = t.enterToClass,
          l = t.enterActiveClass,
          c = t.appearClass,
          u = t.appearToClass,
          d = t.appearActiveClass,
          h = t.beforeEnter,
          p = t.enter,
          f = t.afterEnter,
          m = t.enterCancelled,
          v = t.beforeAppear,
          g = t.appear,
          b = t.afterAppear,
          y = t.appearCancelled,
          k = t.duration,
          w = Yt,
          _ = Yt.$vnode;
        _ && _.parent;

      )
        (w = _.context), (_ = _.parent);
      var x,
        $,
        C,
        S,
        A,
        T,
        O,
        F,
        D,
        z,
        M,
        E = !w._isMounted || !n.isRootInsert;
      (E && !g && "" !== g) ||
        ((x = E && c ? c : r),
        ($ = E && d ? d : l),
        (C = E && u ? u : a),
        (S = (E && v) || h),
        (A = E && "function" == typeof g ? g : p),
        (T = (E && b) || f),
        (O = (E && y) || m),
        (F = P(L(k) ? k.enter : k)),
        (D = !1 !== o && !X),
        (z = Ro(A)),
        (M = i._enterCb =
          N(function () {
            D && (zo(i, C), zo(i, $)),
              M.cancelled ? (D && zo(i, x), O && O(i)) : T && T(i),
              (i._enterCb = null);
          })),
        n.data.show ||
          rt(n, "insert", function () {
            var e = i.parentNode,
              t = e && e._pending && e._pending[n.key];
            t && t.tag === n.tag && t.elm._leaveCb && t.elm._leaveCb(),
              A && A(i, M);
          }),
        S && S(i),
        D &&
          (Do(i, x),
          Do(i, $),
          Fo(function () {
            zo(i, x),
              M.cancelled ||
                (Do(i, C), z || (Bo(F) ? setTimeout(M, F) : Mo(i, s, M)));
          })),
        n.data.show && (e && e(), A && A(i, M)),
        D || z || M());
    }
  }

  function No(e, t) {
    var n = e.elm;
    j(n._enterCb) && ((n._enterCb.cancelled = !0), n._enterCb());
    var i,
      o,
      s,
      r,
      a,
      l,
      c,
      u,
      d,
      h,
      p,
      f,
      m,
      v,
      g,
      b = ko(e.data.transition);
    if (I(b) || 1 !== n.nodeType) return t();

    function y() {
      g.cancelled ||
        (!e.data.show &&
          n.parentNode &&
          ((n.parentNode._pending || (n.parentNode._pending = {}))[e.key] = e),
        l && l(n),
        f &&
          (Do(n, s),
          Do(n, a),
          Fo(function () {
            zo(n, s),
              g.cancelled ||
                (Do(n, r), m || (Bo(v) ? setTimeout(g, v) : Mo(n, o, g)));
          })),
        c && c(n, g),
        f || m || g());
    }
    j(n._leaveCb) ||
      ((i = b.css),
      (o = b.type),
      (s = b.leaveClass),
      (r = b.leaveToClass),
      (a = b.leaveActiveClass),
      (l = b.beforeLeave),
      (c = b.leave),
      (u = b.afterLeave),
      (d = b.leaveCancelled),
      (h = b.delayLeave),
      (p = b.duration),
      (f = !1 !== i && !X),
      (m = Ro(c)),
      (v = P(L(p) ? p.leave : p)),
      (g = n._leaveCb =
        N(function () {
          n.parentNode &&
            n.parentNode._pending &&
            (n.parentNode._pending[e.key] = null),
            f && (zo(n, r), zo(n, a)),
            g.cancelled ? (f && zo(n, s), d && d(n)) : (t(), u && u(n)),
            (n._leaveCb = null);
        })),
      h ? h(y) : y());
  }

  function Bo(e) {
    return "number" == typeof e && !isNaN(e);
  }

  function Ro(e) {
    if (I(e)) return !1;
    var t = e.fns;
    return j(t) ? Ro(Array.isArray(t) ? t[0] : t) : 1 < (e._length || e.length);
  }

  function Ho(e, t) {
    !0 !== t.data.show && Po(t);
  }
  var Vo = (function (e) {
    for (var t, g = {}, n = e.modules, b = e.nodeOps, i = 0; i < ci.length; ++i)
      for (g[ci[i]] = [], t = 0; t < n.length; ++t)
        j(n[t][ci[i]]) && g[ci[i]].push(n[t][ci[i]]);

    function s(e) {
      var t = b.parentNode(e);
      j(t) && b.removeChild(t, e);
    }

    function y(e, t, n, i, o, s, r) {
      var a, l, c;
      j(e.elm) && j(s) && (e = s[r] = ge(e)),
        (e.isRootInsert = !o),
        (function (e, t, n, i) {
          var o = e.data;
          if (j(o)) {
            var s = j(e.componentInstance) && o.keepAlive;
            if (
              (j((o = o.hook)) && j((o = o.init)) && o(e, !1),
              j(e.componentInstance))
            )
              return (
                p(e, t),
                u(n, e.elm, i),
                A(s) &&
                  (function (e, t, n, i) {
                    for (var o, s = e; s.componentInstance; )
                      if (
                        j((o = (s = s.componentInstance._vnode).data)) &&
                        j((o = o.transition))
                      ) {
                        for (o = 0; o < g.activate.length; ++o)
                          g.activate[o](li, s);
                        t.push(s);
                        break;
                      }
                    u(n, e.elm, i);
                  })(e, t, n, i),
                1
              );
          }
        })(e, t, n, i) ||
          ((a = e.data),
          (l = e.children),
          j((c = e.tag))
            ? ((e.elm = e.ns
                ? b.createElementNS(e.ns, c)
                : b.createElement(c, e)),
              d(e),
              f(e, l, t),
              j(a) && m(e, t))
            : A(e.isComment)
            ? (e.elm = b.createComment(e.text))
            : (e.elm = b.createTextNode(e.text)),
          u(n, e.elm, i));
    }

    function p(e, t) {
      j(e.data.pendingInsert) &&
        (t.push.apply(t, e.data.pendingInsert), (e.data.pendingInsert = null)),
        (e.elm = e.componentInstance.$el),
        k(e) ? (m(e, t), d(e)) : (ai(e), t.push(e));
    }

    function u(e, t, n) {
      j(e) &&
        (j(n)
          ? b.parentNode(n) === e && b.insertBefore(e, t, n)
          : b.appendChild(e, t));
    }

    function f(e, t, n) {
      if (Array.isArray(t))
        for (var i = 0; i < t.length; ++i) y(t[i], n, e.elm, null, !0, t, i);
      else T(e.text) && b.appendChild(e.elm, b.createTextNode(String(e.text)));
    }

    function k(e) {
      for (; e.componentInstance; ) e = e.componentInstance._vnode;
      return j(e.tag);
    }

    function m(e, t) {
      for (var n = 0; n < g.create.length; ++n) g.create[n](li, e);
      j((i = e.data.hook)) &&
        (j(i.create) && i.create(li, e), j(i.insert) && t.push(e));
    }

    function d(e) {
      var t;
      if (j((t = e.fnScopeId))) b.setStyleScope(e.elm, t);
      else
        for (var n = e; n; )
          j((t = n.context)) &&
            j((t = t.$options._scopeId)) &&
            b.setStyleScope(e.elm, t),
            (n = n.parent);
      j((t = Yt)) &&
        t !== e.context &&
        t !== e.fnContext &&
        j((t = t.$options._scopeId)) &&
        b.setStyleScope(e.elm, t);
    }

    function w(e, t, n, i, o, s) {
      for (; i <= o; ++i) y(n[i], s, e, t, !1, n, i);
    }

    function v(e) {
      var t,
        n,
        i = e.data;
      if (j(i))
        for (
          j((t = i.hook)) && j((t = t.destroy)) && t(e), t = 0;
          t < g.destroy.length;
          ++t
        )
          g.destroy[t](e);
      if (j((t = e.children)))
        for (n = 0; n < e.children.length; ++n) v(e.children[n]);
    }

    function _(e, t, n) {
      for (; t <= n; ++t) {
        var i = e[t];
        j(i) &&
          (j(i.tag)
            ? ((function e(t, n) {
                if (j(n) || j(t.data)) {
                  var i,
                    o = g.remove.length + 1;
                  for (
                    j(n)
                      ? (n.listeners += o)
                      : (n = (function (e, t) {
                          function n() {
                            0 == --n.listeners && s(e);
                          }
                          return (n.listeners = t), n;
                        })(t.elm, o)),
                      j((i = t.componentInstance)) &&
                        j((i = i._vnode)) &&
                        j(i.data) &&
                        e(i, n),
                      i = 0;
                    i < g.remove.length;
                    ++i
                  )
                    g.remove[i](t, n);
                  j((i = t.data.hook)) && j((i = i.remove)) ? i(t, n) : n();
                } else s(t.elm);
              })(i),
              v(i))
            : s(i.elm));
      }
    }

    function x(e, t, n, i, o, v) {
      if (e !== t) {
        j(t.elm) && j(i) && (t = i[o] = ge(t));
        var s = (t.elm = e.elm);
        if (A(e.isAsyncPlaceholder))
          j(t.asyncFactory.resolved)
            ? S(e.elm, t, n)
            : (t.isAsyncPlaceholder = !0);
        else if (
          A(t.isStatic) &&
          A(e.isStatic) &&
          t.key === e.key &&
          (A(t.isCloned) || A(t.isOnce))
        )
          t.componentInstance = e.componentInstance;
        else {
          var r,
            a = t.data;
          j(a) && j((r = a.hook)) && j((r = r.prepatch)) && r(e, t);
          var l = e.children,
            c = t.children;
          if (j(a) && k(t)) {
            for (r = 0; r < g.update.length; ++r) g.update[r](e, t);
            j((r = a.hook)) && j((r = r.update)) && r(e, t);
          }
          I(t.text)
            ? j(l) && j(c)
              ? l !== c &&
                (function (e, t, n, i) {
                  for (
                    var o,
                      s,
                      r,
                      a = 0,
                      l = 0,
                      c = t.length - 1,
                      u = t[0],
                      d = t[c],
                      h = n.length - 1,
                      p = n[0],
                      f = n[h],
                      m = !v;
                    a <= c && l <= h;

                  )
                    I(u)
                      ? (u = t[++a])
                      : I(d)
                      ? (d = t[--c])
                      : ui(u, p)
                      ? (x(u, p, i, n, l), (u = t[++a]), (p = n[++l]))
                      : ui(d, f)
                      ? (x(d, f, i, n, h), (d = t[--c]), (f = n[--h]))
                      : ui(u, f)
                      ? (x(u, f, i, n, h),
                        m && b.insertBefore(e, u.elm, b.nextSibling(d.elm)),
                        (u = t[++a]),
                        (f = n[--h]))
                      : (p =
                          (ui(d, p)
                            ? (x(d, p, i, n, l),
                              m && b.insertBefore(e, d.elm, u.elm),
                              (d = t[--c]))
                            : (I(o) &&
                                (o = (function (e, t, n) {
                                  for (var i, o = {}, s = t; s <= n; ++s)
                                    j((i = e[s].key)) && (o[i] = s);
                                  return o;
                                })(t, a, c)),
                              !I(
                                (s = j(p.key)
                                  ? o[p.key]
                                  : (function (e, t, n, i) {
                                      for (var o = n; o < i; o++) {
                                        var s = t[o];
                                        if (j(s) && ui(e, s)) return o;
                                      }
                                    })(p, t, a, c))
                              ) && ui((r = t[s]), p)
                                ? (x(r, p, i, n, l),
                                  (t[s] = void 0),
                                  m && b.insertBefore(e, r.elm, u.elm))
                                : y(p, i, e, u.elm, !1, n, l)),
                          n[++l]));
                  c < a
                    ? w(e, I(n[h + 1]) ? null : n[h + 1].elm, n, l, h, i)
                    : h < l && _(t, a, c);
                })(s, l, c, n)
              : j(c)
              ? (j(e.text) && b.setTextContent(s, ""),
                w(s, null, c, 0, c.length - 1, n))
              : j(l)
              ? _(l, 0, l.length - 1)
              : j(e.text) && b.setTextContent(s, "")
            : e.text !== t.text && b.setTextContent(s, t.text),
            j(a) && j((r = a.hook)) && j((r = r.postpatch)) && r(e, t);
        }
      }
    }

    function $(e, t, n) {
      if (A(n) && j(e.parent)) e.parent.data.pendingInsert = t;
      else for (var i = 0; i < t.length; ++i) t[i].data.hook.insert(t[i]);
    }
    var C = r("attrs,class,staticClass,staticStyle,key");

    function S(e, t, n, i) {
      var o,
        s = t.tag,
        r = t.data,
        a = t.children;
      if (
        ((i = i || (r && r.pre)),
        (t.elm = e),
        A(t.isComment) && j(t.asyncFactory))
      )
        return (t.isAsyncPlaceholder = !0);
      if (
        j(r) &&
        (j((o = r.hook)) && j((o = o.init)) && o(t, !0),
        j((o = t.componentInstance)))
      )
        return p(t, n), 1;
      if (j(s)) {
        if (j(a))
          if (e.hasChildNodes())
            if (j((o = r)) && j((o = o.domProps)) && j((o = o.innerHTML))) {
              if (o !== e.innerHTML) return;
            } else {
              for (var l = !0, c = e.firstChild, u = 0; u < a.length; u++) {
                if (!c || !S(c, a[u], n, i)) {
                  l = !1;
                  break;
                }
                c = c.nextSibling;
              }
              if (!l || c) return;
            }
          else f(t, a, n);
        if (j(r)) {
          var d = !1;
          for (var h in r)
            if (!C(h)) {
              (d = !0), m(t, n);
              break;
            }
          !d && r.class && nt(r.class);
        }
      } else e.data !== t.text && (e.data = t.text);
      return 1;
    }
    return function (e, t, n, i) {
      if (!I(t)) {
        var o,
          s = !1,
          r = [];
        if (I(e)) (s = !0), y(t, r);
        else {
          var a = j(e.nodeType);
          if (!a && ui(e, t)) x(e, t, r, null, null, i);
          else {
            if (a) {
              if (
                (1 === e.nodeType &&
                  e.hasAttribute(O) &&
                  (e.removeAttribute(O), (n = !0)),
                A(n) && S(e, t, r))
              )
                return $(t, r, !0), e;
              (o = e),
                (e = new pe(b.tagName(o).toLowerCase(), {}, [], void 0, o));
            }
            var l = e.elm,
              c = b.parentNode(l);
            if ((y(t, r, l._leaveCb ? null : c, b.nextSibling(l)), j(t.parent)))
              for (var u = t.parent, d = k(t); u; ) {
                for (var h = 0; h < g.destroy.length; ++h) g.destroy[h](u);
                if (((u.elm = t.elm), d)) {
                  for (var p = 0; p < g.create.length; ++p) g.create[p](li, u);
                  var f = u.data.hook.insert;
                  if (f.merged)
                    for (var m = 1; m < f.fns.length; m++) f.fns[m]();
                } else ai(u);
                u = u.parent;
              }
            j(c) ? _([e], 0, 0) : j(e.tag) && v(e);
          }
        }
        return $(t, r, s), t.elm;
      }
      j(e) && v(e);
    };
  })({
    nodeOps: si,
    modules: [
      ki,
      Ti,
      no,
      oo,
      vo,
      V
        ? {
            create: Ho,
            activate: Ho,
            remove: function (e, t) {
              !0 !== e.data.show ? No(e, t) : t();
            },
          }
        : {},
    ].concat(vi),
  });
  X &&
    document.addEventListener("selectionchange", function () {
      var e = document.activeElement;
      e && e.vmodel && Go(e, "input");
    });
  var qo = {
    inserted: function (e, t, n, i) {
      "select" === n.tag
        ? (i.elm && !i.elm._vOptions
            ? rt(n, "postpatch", function () {
                qo.componentUpdated(e, t, n);
              })
            : Uo(e, t, n.context),
          (e._vOptions = [].map.call(e.options, Xo)))
        : ("textarea" !== n.tag && !ii(e.type)) ||
          ((e._vModifiers = t.modifiers),
          t.modifiers.lazy ||
            (e.addEventListener("compositionstart", Ko),
            e.addEventListener("compositionend", Zo),
            e.addEventListener("change", Zo),
            X && (e.vmodel = !0)));
    },
    componentUpdated: function (e, t, n) {
      var i, o;
      "select" === n.tag &&
        (Uo(e, t, n.context),
        (i = e._vOptions),
        (o = e._vOptions = [].map.call(e.options, Xo)).some(function (e, t) {
          return !$(e, i[t]);
        }) &&
          (e.multiple
            ? t.value.some(function (e) {
                return Yo(e, o);
              })
            : t.value !== t.oldValue && Yo(t.value, o)) &&
          Go(e, "change"));
    },
  };

  function Uo(e, t, n) {
    Wo(e, t),
      (Y || K) &&
        setTimeout(function () {
          Wo(e, t);
        }, 0);
  }

  function Wo(e, t) {
    var n = t.value,
      i = e.multiple;
    if (!i || Array.isArray(n)) {
      for (var o, s, r = 0, a = e.options.length; r < a; r++)
        if (((s = e.options[r]), i))
          (o = -1 < S(n, Xo(s))), s.selected !== o && (s.selected = o);
        else if ($(Xo(s), n))
          return e.selectedIndex !== r && (e.selectedIndex = r), 0;
      i || (e.selectedIndex = -1);
    }
  }

  function Yo(t, e) {
    return e.every(function (e) {
      return !$(e, t);
    });
  }

  function Xo(e) {
    return "_value" in e ? e._value : e.value;
  }

  function Ko(e) {
    e.target.composing = !0;
  }

  function Zo(e) {
    e.target.composing && ((e.target.composing = !1), Go(e.target, "input"));
  }

  function Go(e, t) {
    var n = document.createEvent("HTMLEvents");
    n.initEvent(t, !0, !0), e.dispatchEvent(n);
  }

  function Jo(e) {
    return !e.componentInstance || (e.data && e.data.transition)
      ? e
      : Jo(e.componentInstance._vnode);
  }
  var Qo = {
      model: qo,
      show: {
        bind: function (e, t, n) {
          var i = t.value,
            o = (n = Jo(n)).data && n.data.transition,
            s = (e.__vOriginalDisplay =
              "none" === e.style.display ? "" : e.style.display);
          i && o
            ? ((n.data.show = !0),
              Po(n, function () {
                e.style.display = s;
              }))
            : (e.style.display = i ? s : "none");
        },
        update: function (e, t, n) {
          var i = t.value;
          !i != !t.oldValue &&
            ((n = Jo(n)).data && n.data.transition
              ? ((n.data.show = !0),
                i
                  ? Po(n, function () {
                      e.style.display = e.__vOriginalDisplay;
                    })
                  : No(n, function () {
                      e.style.display = "none";
                    }))
              : (e.style.display = i ? e.__vOriginalDisplay : "none"));
        },
        unbind: function (e, t, n, i, o) {
          o || (e.style.display = e.__vOriginalDisplay);
        },
      },
    },
    es = {
      name: String,
      appear: Boolean,
      css: Boolean,
      mode: String,
      type: String,
      enterClass: String,
      leaveClass: String,
      enterToClass: String,
      leaveToClass: String,
      enterActiveClass: String,
      leaveActiveClass: String,
      appearClass: String,
      appearActiveClass: String,
      appearToClass: String,
      duration: [Number, String, Object],
    };

  function ts(e) {
    var t = e && e.componentOptions;
    return t && t.Ctor.options.abstract ? ts(Ht(t.children)) : e;
  }

  function ns(e) {
    var t = {},
      n = e.$options;
    for (var i in n.propsData) t[i] = e[i];
    var o = n._parentListeners;
    for (var s in o) t[k(s)] = o[s];
    return t;
  }

  function is(e, t) {
    if (/\d-keep-alive$/.test(t.tag))
      return e("keep-alive", {
        props: t.componentOptions.propsData,
      });
  }

  function os(e) {
    return e.tag || pt(e);
  }

  function ss(e) {
    return "show" === e.name;
  }
  var rs = {
      name: "transition",
      props: es,
      abstract: !0,
      render: function (e) {
        var t = this,
          n = this.$slots.default;
        if (n && (n = n.filter(os)).length) {
          var i = this.mode,
            o = n[0];
          if (
            (function (e) {
              for (; (e = e.parent); ) if (e.data.transition) return 1;
            })(this.$vnode)
          )
            return o;
          var s = ts(o);
          if (!s) return o;
          if (this._leaving) return is(e, o);
          var r = "__transition-" + this._uid + "-";
          s.key =
            null == s.key
              ? s.isComment
                ? r + "comment"
                : r + s.tag
              : !T(s.key) || 0 === String(s.key).indexOf(r)
              ? s.key
              : r + s.key;
          var a = ((s.data || (s.data = {})).transition = ns(this)),
            l = this._vnode,
            c = ts(l);
          if (
            (s.data.directives &&
              s.data.directives.some(ss) &&
              (s.data.show = !0),
            c &&
              c.data &&
              (c.key !== s.key || c.tag !== s.tag) &&
              !pt(c) &&
              (!c.componentInstance || !c.componentInstance._vnode.isComment))
          ) {
            var u = (c.data.transition = m({}, a));
            if ("out-in" === i)
              return (
                (this._leaving = !0),
                rt(u, "afterLeave", function () {
                  (t._leaving = !1), t.$forceUpdate();
                }),
                is(e, o)
              );
            if ("in-out" === i) {
              if (pt(s)) return l;
              var d,
                h = function () {
                  d();
                };
              rt(a, "afterEnter", h),
                rt(a, "enterCancelled", h),
                rt(u, "delayLeave", function (e) {
                  d = e;
                });
            }
          }
          return o;
        }
      },
    },
    as = m(
      {
        tag: String,
        moveClass: String,
      },
      es
    );

  function ls(e) {
    e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb();
  }

  function cs(e) {
    e.data.newPos = e.elm.getBoundingClientRect();
  }

  function us(e) {
    var t,
      n = e.data.pos,
      i = e.data.newPos,
      o = n.left - i.left,
      s = n.top - i.top;
    (o || s) &&
      ((e.data.moved = !0),
      ((t = e.elm.style).transform = t.WebkitTransform =
        "translate(" + o + "px," + s + "px)"),
      (t.transitionDuration = "0s"));
  }
  delete as.mode;
  var ds = {
    Transition: rs,
    TransitionGroup: {
      props: as,
      beforeMount: function () {
        var i = this,
          o = this._update;
        this._update = function (e, t) {
          var n = Xt(i);
          i.__patch__(i._vnode, i.kept, !1, !0),
            (i._vnode = i.kept),
            n(),
            o.call(i, e, t);
        };
      },
      render: function (e) {
        for (
          var t = this.tag || this.$vnode.data.tag || "span",
            n = Object.create(null),
            i = (this.prevChildren = this.children),
            o = this.$slots.default || [],
            s = (this.children = []),
            r = ns(this),
            a = 0;
          a < o.length;
          a++
        ) {
          var l = o[a];
          l.tag &&
            null != l.key &&
            0 !== String(l.key).indexOf("__vlist") &&
            (s.push(l),
            (((n[l.key] = l).data || (l.data = {})).transition = r));
        }
        if (i) {
          for (var c = [], u = [], d = 0; d < i.length; d++) {
            var h = i[d];
            (h.data.transition = r),
              (h.data.pos = h.elm.getBoundingClientRect()),
              n[h.key] ? c.push(h) : u.push(h);
          }
          (this.kept = e(t, null, c)), (this.removed = u);
        }
        return e(t, null, s);
      },
      updated: function () {
        var e = this.prevChildren,
          i = this.moveClass || (this.name || "v") + "-move";
        e.length &&
          this.hasMove(e[0].elm, i) &&
          (e.forEach(ls),
          e.forEach(cs),
          e.forEach(us),
          (this._reflow = document.body.offsetHeight),
          e.forEach(function (e) {
            var n, t;
            e.data.moved &&
              ((t = (n = e.elm).style),
              Do(n, i),
              (t.transform = t.WebkitTransform = t.transitionDuration = ""),
              n.addEventListener(
                So,
                (n._moveCb = function e(t) {
                  (t && t.target !== n) ||
                    (t && !/transform$/.test(t.propertyName)) ||
                    (n.removeEventListener(So, e),
                    (n._moveCb = null),
                    zo(n, i));
                })
              ));
          }));
      },
      methods: {
        hasMove: function (e, t) {
          if (!_o) return !1;
          if (this._hasMove) return this._hasMove;
          var n = e.cloneNode();
          e._transitionClasses &&
            e._transitionClasses.forEach(function (e) {
              yo(n, e);
            }),
            bo(n, t),
            (n.style.display = "none"),
            this.$el.appendChild(n);
          var i = Io(n);
          return this.$el.removeChild(n), (this._hasMove = i.hasTransform);
        },
      },
    },
  };
  (Sn.config.mustUseProp = Ln),
    (Sn.config.isReservedTag = Gn),
    (Sn.config.isReservedAttr = Pn),
    (Sn.config.getTagNamespace = ti),
    (Sn.config.isUnknownElement = function (e) {
      if (!V) return !0;
      if (Gn(e)) return !1;
      if (((e = e.toLowerCase()), null != ni[e])) return ni[e];
      var t = document.createElement(e);
      return -1 < e.indexOf("-")
        ? (ni[e] =
            t.constructor === window.HTMLUnknownElement ||
            t.constructor === window.HTMLElement)
        : (ni[e] = /HTMLUnknownElement/.test(t.toString()));
    }),
    m(Sn.options.directives, Qo),
    m(Sn.options.components, ds),
    (Sn.prototype.__patch__ = V ? Vo : _),
    (Sn.prototype.$mount = function (e, t) {
      return (
        (n = this),
        (i = e = e && V ? oi(e) : void 0),
        (o = t),
        (n.$el = i),
        n.$options.render || (n.$options.render = me),
        Gt(n, "beforeMount"),
        (s = function () {
          n._update(n._render(), o);
        }),
        new cn(
          n,
          s,
          _,
          {
            before: function () {
              n._isMounted && !n._isDestroyed && Gt(n, "beforeUpdate");
            },
          },
          !0
        ),
        (o = !1),
        null == n.$vnode && ((n._isMounted = !0), Gt(n, "mounted")),
        n
      );
      var n, i, o, s;
    }),
    V &&
      setTimeout(function () {
        z.devtools && ne && ne.emit("init", Sn);
      }, 0);

  function hs(e, t) {
    return e && Ls(e) && "\n" === t[0];
  }
  var ps,
    fs = /\{\{((?:.|\r?\n)+?)\}\}/g,
    ms = /[-.*+?^${}()|[\]\/\\]/g,
    vs = e(function (e) {
      var t = e[0].replace(ms, "\\$&"),
        n = e[1].replace(ms, "\\$&");
      return new RegExp(t + "((?:.|\\n)+?)" + n, "g");
    }),
    gs = {
      staticKeys: ["staticClass"],
      transformNode: function (e, t) {
        t.warn;
        var n = Ni(e, "class");
        n && (e.staticClass = JSON.stringify(n));
        var i = Pi(e, "class", !1);
        i && (e.classBinding = i);
      },
      genData: function (e) {
        var t = "";
        return (
          e.staticClass && (t += "staticClass:" + e.staticClass + ","),
          e.classBinding && (t += "class:" + e.classBinding + ","),
          t
        );
      },
    },
    bs = {
      staticKeys: ["staticStyle"],
      transformNode: function (e, t) {
        t.warn;
        var n = Ni(e, "style");
        n && (e.staticStyle = JSON.stringify(so(n)));
        var i = Pi(e, "style", !1);
        i && (e.styleBinding = i);
      },
      genData: function (e) {
        var t = "";
        return (
          e.staticStyle && (t += "staticStyle:" + e.staticStyle + ","),
          e.styleBinding && (t += "style:(" + e.styleBinding + "),"),
          t
        );
      },
    },
    ys = r(
      "area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"
    ),
    ks = r("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
    ws = r(
      "address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"
    ),
    _s =
      /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
    xs =
      /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
    $s = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + M.source + "]*",
    Cs = "((?:" + $s + "\\:)?" + $s + ")",
    Ss = new RegExp("^<" + Cs),
    As = /^\s*(\/?)>/,
    Ts = new RegExp("^<\\/" + Cs + "[^>]*>"),
    Os = /^<!DOCTYPE [^>]+>/i,
    Fs = /^<!\--/,
    Ds = /^<!\[/,
    zs = r("script,style,textarea", !0),
    Ms = {},
    Es = {
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&amp;": "&",
      "&#10;": "\n",
      "&#9;": "\t",
      "&#39;": "'",
    },
    Is = /&(?:lt|gt|quot|amp|#39);/g,
    js = /&(?:lt|gt|quot|amp|#39|#10|#9);/g,
    Ls = r("pre,textarea", !0);
  var Ps,
    Ns,
    Bs,
    Rs,
    Hs,
    Vs,
    qs,
    Us,
    Ws = /^@|^v-on:/,
    Ys = /^v-|^@|^:|^#/,
    Xs = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    Ks = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    Zs = /^\(|\)$/g,
    Gs = /^\[.*\]$/,
    Js = /:(.*)$/,
    Qs = /^:|^\.|^v-bind:/,
    er = /\.[^.\]]+(?=[^\]]*$)/g,
    tr = /^v-slot(:|$)|^#/,
    nr = /[\r\n]/,
    ir = /[ \f\t\r\n]+/g,
    or = e(function (e) {
      return (
        ((ps = ps || document.createElement("div")).innerHTML = e),
        ps.textContent
      );
    }),
    sr = "_empty_";

  function rr(e, t, n) {
    return {
      type: 1,
      tag: e,
      attrsList: t,
      attrsMap: (function (e) {
        for (var t = {}, n = 0, i = e.length; n < i; n++)
          t[e[n].name] = e[n].value;
        return t;
      })(t),
      rawAttrsMap: {},
      parent: n,
      children: [],
    };
  }

  function ar(e, d) {
    (Ps = d.warn || Di),
      (Vs = d.isPreTag || C),
      (qs = d.mustUseProp || C),
      (Us = d.getTagNamespace || C),
      d.isReservedTag,
      (Bs = zi(d.modules, "transformNode")),
      (Rs = zi(d.modules, "preTransformNode")),
      (Hs = zi(d.modules, "postTransformNode")),
      (Ns = d.delimiters);
    var h,
      p,
      f = [],
      o = !1 !== d.preserveWhitespace,
      s = d.whitespace,
      m = !1,
      v = !1;

    function g(e) {
      var t, n, i;
      r(e),
        m || e.processed || (e = lr(e, d)),
        f.length ||
          e === h ||
          (h.if &&
            (e.elseif || e.else) &&
            ur(h, {
              exp: e.elseif,
              block: e,
            })),
        p &&
          !e.forbidden &&
          (e.elseif || e.else
            ? ((n = e),
              (i = (function (e) {
                for (var t = e.length; t--; ) {
                  if (1 === e[t].type) return e[t];
                  e.pop();
                }
              })(p.children)) &&
                i.if &&
                ur(i, {
                  exp: n.elseif,
                  block: n,
                }))
            : (e.slotScope &&
                ((t = e.slotTarget || '"default"'),
                ((p.scopedSlots || (p.scopedSlots = {}))[t] = e)),
              p.children.push(e),
              (e.parent = p))),
        (e.children = e.children.filter(function (e) {
          return !e.slotScope;
        })),
        r(e),
        e.pre && (m = !1),
        Vs(e.tag) && (v = !1);
      for (var o = 0; o < Hs.length; o++) Hs[o](e, d);
    }

    function r(e) {
      if (!v)
        for (
          var t;
          (t = e.children[e.children.length - 1]) &&
          3 === t.type &&
          " " === t.text;

        )
          e.children.pop();
    }
    return (
      (function (o, u) {
        for (
          var e,
            d,
            h = [],
            p = u.expectHTML,
            f = u.isUnaryTag || C,
            m = u.canBeLeftOpenTag || C,
            r = 0;
          o;

        ) {
          if (((e = o), d && zs(d))) {
            var i = 0,
              s = d.toLowerCase(),
              t =
                Ms[s] ||
                (Ms[s] = new RegExp("([\\s\\S]*?)(</" + s + "[^>]*>)", "i")),
              n = o.replace(t, function (e, t, n) {
                return (
                  (i = n.length),
                  zs(s) ||
                    "noscript" === s ||
                    (t = t
                      .replace(/<!\--([\s\S]*?)-->/g, "$1")
                      .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")),
                  hs(s, t) && (t = t.slice(1)),
                  u.chars && u.chars(t),
                  ""
                );
              });
            (r += o.length - n.length), (o = n), $(s, r - i, r);
          } else {
            var a = o.indexOf("<");
            if (0 === a) {
              if (Fs.test(o)) {
                var l = o.indexOf("--\x3e");
                if (0 <= l) {
                  u.shouldKeepComment &&
                    u.comment(o.substring(4, l), r, r + l + 3),
                    x(l + 3);
                  continue;
                }
              }
              if (Ds.test(o)) {
                var c = o.indexOf("]>");
                if (0 <= c) {
                  x(c + 2);
                  continue;
                }
              }
              var v = o.match(Os);
              if (v) {
                x(v[0].length);
                continue;
              }
              var g = o.match(Ts);
              if (g) {
                var b = r;
                x(g[0].length), $(g[1], b, r);
                continue;
              }
              var y = (function () {
                var e = o.match(Ss);
                if (e) {
                  var t,
                    n,
                    i = {
                      tagName: e[1],
                      attrs: [],
                      start: r,
                    };
                  for (
                    x(e[0].length);
                    !(t = o.match(As)) && (n = o.match(xs) || o.match(_s));

                  )
                    (n.start = r), x(n[0].length), (n.end = r), i.attrs.push(n);
                  if (t)
                    return (
                      (i.unarySlash = t[1]), x(t[0].length), (i.end = r), i
                    );
                }
              })();
              if (y) {
                (function (e) {
                  var t = e.tagName,
                    n = e.unarySlash;
                  p && ("p" === d && ws(t) && $(d), m(t) && d === t && $(t));
                  for (
                    var i = f(t) || !!n,
                      o = e.attrs.length,
                      s = new Array(o),
                      r = 0;
                    r < o;
                    r++
                  ) {
                    var a = e.attrs[r],
                      l = a[3] || a[4] || a[5] || "",
                      c =
                        "a" === t && "href" === a[1]
                          ? u.shouldDecodeNewlinesForHref
                          : u.shouldDecodeNewlines;
                    s[r] = {
                      name: a[1],
                      value: (function (e, t) {
                        var n = t ? js : Is;
                        return e.replace(n, function (e) {
                          return Es[e];
                        });
                      })(l, c),
                    };
                  }
                  i ||
                    (h.push({
                      tag: t,
                      lowerCasedTag: t.toLowerCase(),
                      attrs: s,
                      start: e.start,
                      end: e.end,
                    }),
                    (d = t)),
                    u.start && u.start(t, s, i, e.start, e.end);
                })(y),
                  hs(y.tagName, o) && x(1);
                continue;
              }
            }
            var k = void 0,
              w = void 0,
              _ = void 0;
            if (0 <= a) {
              for (
                w = o.slice(a);
                !(
                  Ts.test(w) ||
                  Ss.test(w) ||
                  Fs.test(w) ||
                  Ds.test(w) ||
                  (_ = w.indexOf("<", 1)) < 0
                );

              )
                (a += _), (w = o.slice(a));
              k = o.substring(0, a);
            }
            a < 0 && (k = o),
              k && x(k.length),
              u.chars && k && u.chars(k, r - k.length, r);
          }
          if (o === e) {
            u.chars && u.chars(o);
            break;
          }
        }

        function x(e) {
          (r += e), (o = o.substring(e));
        }

        function $(e, t, n) {
          var i, o;
          if ((null == t && (t = r), null == n && (n = r), e))
            for (
              o = e.toLowerCase(), i = h.length - 1;
              0 <= i && h[i].lowerCasedTag !== o;
              i--
            );
          else i = 0;
          if (0 <= i) {
            for (var s = h.length - 1; i <= s; s--)
              u.end && u.end(h[s].tag, t, n);
            (h.length = i), (d = i && h[i - 1].tag);
          } else
            "br" === o
              ? u.start && u.start(e, [], !0, t, n)
              : "p" === o &&
                (u.start && u.start(e, [], !1, t, n), u.end && u.end(e, t, n));
        }
        $();
      })(e, {
        warn: Ps,
        expectHTML: d.expectHTML,
        isUnaryTag: d.isUnaryTag,
        canBeLeftOpenTag: d.canBeLeftOpenTag,
        shouldDecodeNewlines: d.shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: d.shouldDecodeNewlinesForHref,
        shouldKeepComment: d.comments,
        outputSourceRange: d.outputSourceRange,
        start: function (e, t, n) {
          var i = (p && p.ns) || Us(e);
          Y &&
            "svg" === i &&
            (t = (function (e) {
              for (var t = [], n = 0; n < e.length; n++) {
                var i = e[n];
                hr.test(i.name) ||
                  ((i.name = i.name.replace(pr, "")), t.push(i));
              }
              return t;
            })(t));
          var o = rr(e, t, p);
          i && (o.ns = i),
            ("style" !== o.tag &&
              ("script" !== o.tag ||
                (o.attrsMap.type && "text/javascript" !== o.attrsMap.type))) ||
              te() ||
              (o.forbidden = !0);
          for (var s, r, a, l, c, u = 0; u < Rs.length; u++)
            o = Rs[u](o, d) || o;
          m ||
            (null != Ni((c = o), "v-pre") && (c.pre = !0), o.pre && (m = !0)),
            Vs(o.tag) && (v = !0),
            m
              ? (function (e) {
                  var t = e.attrsList,
                    n = t.length;
                  if (n)
                    for (var i = (e.attrs = new Array(n)), o = 0; o < n; o++)
                      (i[o] = {
                        name: t[o].name,
                        value: JSON.stringify(t[o].value),
                      }),
                        null != t[o].start &&
                          ((i[o].start = t[o].start), (i[o].end = t[o].end));
                  else e.pre || (e.plain = !0);
                })(o)
              : o.processed ||
                (cr(o),
                (l = Ni((r = o), "v-if"))
                  ? ((r.if = l),
                    ur(r, {
                      exp: l,
                      block: r,
                    }))
                  : (null != Ni(r, "v-else") && (r.else = !0),
                    (a = Ni(r, "v-else-if")) && (r.elseif = a)),
                null != Ni((s = o), "v-once") && (s.once = !0)),
            (h = h || o),
            n ? g(o) : ((p = o), f.push(o));
        },
        end: function () {
          var e = f[f.length - 1];
          --f.length, (p = f[f.length - 1]), g(e);
        },
        chars: function (e) {
          var t, n, i;
          !p ||
            (Y && "textarea" === p.tag && p.attrsMap.placeholder === e) ||
            ((i = p.children),
            (e =
              v || e.trim()
                ? "script" === p.tag || "style" === p.tag
                  ? e
                  : or(e)
                : i.length
                ? s
                  ? "condense" === s && nr.test(e)
                    ? ""
                    : " "
                  : o
                  ? " "
                  : ""
                : "") &&
              (v || "condense" !== s || (e = e.replace(ir, " ")),
              !m &&
              " " !== e &&
              (t = (function (e) {
                var t = Ns ? vs(Ns) : fs;
                if (t.test(e)) {
                  for (
                    var n, i, o, s = [], r = [], a = (t.lastIndex = 0);
                    (n = t.exec(e));

                  ) {
                    (i = n.index) > a &&
                      (r.push((o = e.slice(a, i))), s.push(JSON.stringify(o)));
                    var l = Fi(n[1].trim());
                    s.push("_s(" + l + ")"),
                      r.push({
                        "@binding": l,
                      }),
                      (a = i + n[0].length);
                  }
                  return (
                    a < e.length &&
                      (r.push((o = e.slice(a))), s.push(JSON.stringify(o))),
                    {
                      expression: s.join("+"),
                      tokens: r,
                    }
                  );
                }
              })(e))
                ? (n = {
                    type: 2,
                    expression: t.expression,
                    tokens: t.tokens,
                    text: e,
                  })
                : (" " === e && i.length && " " === i[i.length - 1].text) ||
                  (n = {
                    type: 3,
                    text: e,
                  }),
              n && i.push(n)));
        },
        comment: function (e) {
          var t;
          p &&
            ((t = {
              type: 3,
              text: e,
              isComment: !0,
            }),
            p.children.push(t));
        },
      }),
      h
    );
  }

  function lr(e, t) {
    var n, i, o, s, r, a;
    (i = Pi((n = e), "key")) && (n.key = i),
      (e.plain = !e.key && !e.scopedSlots && !e.attrsList.length),
      (a = Pi((r = e), "ref")) &&
        ((r.ref = a),
        (r.refInFor = (function () {
          for (var e = r; e; ) {
            if (void 0 !== e.for) return !0;
            e = e.parent;
          }
          return !1;
        })())),
      (function (e) {
        var t;
        "template" === e.tag
          ? ((t = Ni(e, "scope")), (e.slotScope = t || Ni(e, "slot-scope")))
          : (t = Ni(e, "slot-scope")) && (e.slotScope = t);
        var n,
          i,
          o,
          s,
          r,
          a,
          l,
          c,
          u,
          d,
          h,
          p = Pi(e, "slot");
        p &&
          ((e.slotTarget = '""' === p ? '"default"' : p),
          (e.slotTargetDynamic = !(
            !e.attrsMap[":slot"] && !e.attrsMap["v-bind:slot"]
          )),
          "template" === e.tag ||
            e.slotScope ||
            Ei(
              e,
              "slot",
              p,
              ((n = "slot"),
              e.rawAttrsMap[":" + n] ||
                e.rawAttrsMap["v-bind:" + n] ||
                e.rawAttrsMap[n])
            )),
          "template" === e.tag
            ? (i = Bi(e, tr)) &&
              ((s = (o = dr(i)).name),
              (r = o.dynamic),
              (e.slotTarget = s),
              (e.slotTargetDynamic = r),
              (e.slotScope = i.value || sr))
            : (a = Bi(e, tr)) &&
              ((l = e.scopedSlots || (e.scopedSlots = {})),
              (u = (c = dr(a)).name),
              (d = c.dynamic),
              ((h = l[u] = rr("template", [], e)).slotTarget = u),
              (h.slotTargetDynamic = d),
              (h.children = e.children.filter(function (e) {
                if (!e.slotScope) return (e.parent = h), !0;
              })),
              (h.slotScope = a.value || sr),
              (e.children = []),
              (e.plain = !1));
      })(e),
      "slot" === e.tag && (e.slotName = Pi(e, "name")),
      (s = Pi((o = e), "is")) && (o.component = s),
      null != Ni(o, "inline-template") && (o.inlineTemplate = !0);
    for (var l = 0; l < Bs.length; l++) e = Bs[l](e, t) || e;
    return (
      (function (e) {
        for (
          var t,
            n,
            i,
            o,
            s,
            r,
            a,
            l,
            c,
            u,
            d,
            h = e.attrsList,
            p = 0,
            f = h.length;
          p < f;
          p++
        ) {
          var m,
            v,
            g,
            b = (t = h[p].name),
            y = h[p].value;
          Ys.test(b)
            ? ((e.hasBindings = !0),
              (n = (function (e) {
                var t = e.match(er);
                if (t) {
                  var n = {};
                  return (
                    t.forEach(function (e) {
                      n[e.slice(1)] = !0;
                    }),
                    n
                  );
                }
              })(b.replace(Ys, ""))) && (b = b.replace(er, "")),
              Qs.test(b)
                ? ((b = b.replace(Qs, "")),
                  (y = Fi(y)),
                  (g = Gs.test(b)) && (b = b.slice(1, -1)),
                  n &&
                    (n.prop &&
                      !g &&
                      "innerHtml" === (b = k(b)) &&
                      (b = "innerHTML"),
                    n.camel && !g && (b = k(b)),
                    n.sync &&
                      ((i = Vi(y, "$event")),
                      g
                        ? Li(
                            e,
                            '"update:"+(' + b + ")",
                            i,
                            null,
                            !1,
                            0,
                            h[p],
                            !0
                          )
                        : (Li(e, "update:" + k(b), i, null, !1, 0, h[p]),
                          w(b) !== k(b) &&
                            Li(e, "update:" + w(b), i, null, !1, 0, h[p])))),
                  ((n && n.prop) ||
                    (!e.component && qs(e.tag, e.attrsMap.type, b))
                    ? Mi
                    : Ei)(e, b, y, h[p], g))
                : Ws.test(b)
                ? ((b = b.replace(Ws, "")),
                  (g = Gs.test(b)) && (b = b.slice(1, -1)),
                  Li(e, b, y, n, !1, 0, h[p], g))
                : ((g = !1),
                  (v = (m = (b = b.replace(Ys, "")).match(Js)) && m[1]) &&
                    ((b = b.slice(0, -(v.length + 1))),
                    Gs.test(v) && ((v = v.slice(1, -1)), (g = !0))),
                  (o = e),
                  (s = b),
                  (r = t),
                  (a = y),
                  (l = v),
                  (c = g),
                  (u = n),
                  (d = h[p]),
                  (o.directives || (o.directives = [])).push(
                    Ri(
                      {
                        name: s,
                        rawName: r,
                        value: a,
                        arg: l,
                        isDynamicArg: c,
                        modifiers: u,
                      },
                      d
                    )
                  ),
                  (o.plain = !1)))
            : (Ei(e, b, JSON.stringify(y), h[p]),
              !e.component &&
                "muted" === b &&
                qs(e.tag, e.attrsMap.type, b) &&
                Mi(e, b, "true", h[p]));
        }
      })(e),
      e
    );
  }

  function cr(e) {
    var o, t;
    !(o = Ni(e, "v-for")) ||
      ((t = (function () {
        var e = o.match(Xs);
        if (e) {
          var t = {};
          t.for = e[2].trim();
          var n = e[1].trim().replace(Zs, ""),
            i = n.match(Ks);
          return (
            i
              ? ((t.alias = n.replace(Ks, "").trim()),
                (t.iterator1 = i[1].trim()),
                i[2] && (t.iterator2 = i[2].trim()))
              : (t.alias = n),
            t
          );
        }
      })()) &&
        m(e, t));
  }

  function ur(e, t) {
    e.ifConditions || (e.ifConditions = []), e.ifConditions.push(t);
  }

  function dr(e) {
    var t = e.name.replace(tr, "");
    return (
      t || ("#" !== e.name[0] && (t = "default")),
      Gs.test(t)
        ? {
            name: t.slice(1, -1),
            dynamic: !0,
          }
        : {
            name: '"' + t + '"',
            dynamic: !1,
          }
    );
  }
  var hr = /^xmlns:NS\d+/,
    pr = /^NS\d+:/;

  function fr(e) {
    return rr(e.tag, e.attrsList.slice(), e.parent);
  }
  var mr,
    vr,
    gr = [
      gs,
      bs,
      {
        preTransformNode: function (e, t) {
          if ("input" === e.tag) {
            var n,
              i = e.attrsMap;
            if (!i["v-model"]) return;
            if (
              ((i[":type"] || i["v-bind:type"]) && (n = Pi(e, "type")),
              i.type || n || !i["v-bind"] || (n = "(" + i["v-bind"] + ").type"),
              n)
            ) {
              var o = Ni(e, "v-if", !0),
                s = o ? "&&(" + o + ")" : "",
                r = null != Ni(e, "v-else", !0),
                a = Ni(e, "v-else-if", !0),
                l = fr(e);
              cr(l),
                Ii(l, "type", "checkbox"),
                lr(l, t),
                (l.processed = !0),
                (l.if = "(" + n + ")==='checkbox'" + s),
                ur(l, {
                  exp: l.if,
                  block: l,
                });
              var c = fr(e);
              Ni(c, "v-for", !0),
                Ii(c, "type", "radio"),
                lr(c, t),
                ur(l, {
                  exp: "(" + n + ")==='radio'" + s,
                  block: c,
                });
              var u = fr(e);
              return (
                Ni(u, "v-for", !0),
                Ii(u, ":type", n),
                lr(u, t),
                ur(l, {
                  exp: o,
                  block: u,
                }),
                r ? (l.else = !0) : a && (l.elseif = a),
                l
              );
            }
          }
        },
      },
    ],
    br = {
      expectHTML: !0,
      modules: gr,
      directives: {
        model: function (e, t) {
          var n,
            i,
            o,
            s,
            r,
            a,
            l,
            c,
            u,
            d,
            h = t.value,
            p = t.modifiers,
            f = e.tag,
            m = e.attrsMap.type;
          if (e.component) return Hi(e, h, p), !1;
          if ("select" === f)
            Li(
              e,
              "change",
              'var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' +
                (p && p.number ? "_n(val)" : "val") +
                "});" +
                " " +
                Vi(
                  h,
                  "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"
                ),
              null,
              !0
            );
          else if ("input" === f && "checkbox" === m)
            (r = e),
              (a = h),
              (l = p && p.number),
              (c = Pi(r, "value") || "null"),
              (u = Pi(r, "true-value") || "true"),
              (d = Pi(r, "false-value") || "false"),
              Mi(
                r,
                "checked",
                "Array.isArray(" +
                  a +
                  ")?_i(" +
                  a +
                  "," +
                  c +
                  ")>-1" +
                  ("true" === u ? ":(" + a + ")" : ":_q(" + a + "," + u + ")")
              ),
              Li(
                r,
                "change",
                "var $$a=" +
                  a +
                  ",$$el=$event.target,$$c=$$el.checked?(" +
                  u +
                  "):(" +
                  d +
                  ");if(Array.isArray($$a)){var $$v=" +
                  (l ? "_n(" + c + ")" : c) +
                  ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" +
                  Vi(a, "$$a.concat([$$v])") +
                  ")}else{$$i>-1&&(" +
                  Vi(a, "$$a.slice(0,$$i).concat($$a.slice($$i+1))") +
                  ")}}else{" +
                  Vi(a, "$$c") +
                  "}",
                null,
                !0
              );
          else if ("input" === f && "radio" === m)
            (n = e),
              (i = h),
              (o = p && p.number),
              (s = Pi(n, "value") || "null"),
              Mi(
                n,
                "checked",
                "_q(" + i + "," + (s = o ? "_n(" + s + ")" : s) + ")"
              ),
              Li(n, "change", Vi(i, s), null, !0);
          else if ("input" === f || "textarea" === f)
            !(function (e, t) {
              var n = e.attrsMap.type,
                i = p || {},
                o = i.lazy,
                s = i.number,
                r = i.trim,
                a = !o && "range" !== n,
                l = o ? "change" : "range" === n ? Ki : "input",
                c = r ? "$event.target.value.trim()" : "$event.target.value";
              s && (c = "_n(" + c + ")");
              var u = Vi(t, c);
              a && (u = "if($event.target.composing)return;" + u),
                Mi(e, "value", "(" + t + ")"),
                Li(e, l, u, null, !0),
                (r || s) && Li(e, "blur", "$forceUpdate()");
            })(e, h);
          else if (!z.isReservedTag(f)) return Hi(e, h, p), !1;
          return !0;
        },
        text: function (e, t) {
          t.value && Mi(e, "textContent", "_s(" + t.value + ")", t);
        },
        html: function (e, t) {
          t.value && Mi(e, "innerHTML", "_s(" + t.value + ")", t);
        },
      },
      isPreTag: function (e) {
        return "pre" === e;
      },
      isUnaryTag: ys,
      mustUseProp: Ln,
      canBeLeftOpenTag: ks,
      isReservedTag: Gn,
      getTagNamespace: ti,
      staticKeys: gr
        .reduce(function (e, t) {
          return e.concat(t.staticKeys || []);
        }, [])
        .join(","),
    },
    yr = e(function (e) {
      return r(
        "type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" +
          (e ? "," + e : "")
      );
    });

  function kr(e, t) {
    e &&
      ((mr = yr(t.staticKeys || "")),
      (vr = t.isReservedTag || C),
      (function e(t) {
        var n;
        if (
          ((t.static =
            2 !== (n = t).type &&
            (3 === n.type ||
              !(
                !n.pre &&
                (n.hasBindings ||
                  n.if ||
                  n.for ||
                  c(n.tag) ||
                  !vr(n.tag) ||
                  (function (e) {
                    for (; e.parent; ) {
                      if ("template" !== (e = e.parent).tag) return;
                      if (e.for) return 1;
                    }
                  })(n) ||
                  !Object.keys(n).every(mr))
              ))),
          1 === t.type)
        ) {
          if (
            !vr(t.tag) &&
            "slot" !== t.tag &&
            null == t.attrsMap["inline-template"]
          )
            return;
          for (var i = 0, o = t.children.length; i < o; i++) {
            var s = t.children[i];
            e(s), s.static || (t.static = !1);
          }
          if (t.ifConditions)
            for (var r = 1, a = t.ifConditions.length; r < a; r++) {
              var l = t.ifConditions[r].block;
              e(l), l.static || (t.static = !1);
            }
        }
      })(e),
      (function e(t, n) {
        if (1 === t.type) {
          if (
            ((t.static || t.once) && (t.staticInFor = n),
            t.static &&
              t.children.length &&
              (1 !== t.children.length || 3 !== t.children[0].type))
          )
            return (t.staticRoot = !0), 0;
          if (((t.staticRoot = !1), t.children))
            for (var i = 0, o = t.children.length; i < o; i++)
              e(t.children[i], n || !!t.for);
          if (t.ifConditions)
            for (var s = 1, r = t.ifConditions.length; s < r; s++)
              e(t.ifConditions[s].block, n);
        }
      })(e, !1));
  }
  var wr = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,
    _r = /\([^)]*?\);*$/,
    xr =
      /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
    $r = {
      esc: 27,
      tab: 9,
      enter: 13,
      space: 32,
      up: 38,
      left: 37,
      right: 39,
      down: 40,
      delete: [8, 46],
    },
    Cr = {
      esc: ["Esc", "Escape"],
      tab: "Tab",
      enter: "Enter",
      space: [" ", "Spacebar"],
      up: ["Up", "ArrowUp"],
      left: ["Left", "ArrowLeft"],
      right: ["Right", "ArrowRight"],
      down: ["Down", "ArrowDown"],
      delete: ["Backspace", "Delete", "Del"],
    },
    Sr = function (e) {
      return "if(" + e + ")return null;";
    },
    Ar = {
      stop: "$event.stopPropagation();",
      prevent: "$event.preventDefault();",
      self: Sr("$event.target !== $event.currentTarget"),
      ctrl: Sr("!$event.ctrlKey"),
      shift: Sr("!$event.shiftKey"),
      alt: Sr("!$event.altKey"),
      meta: Sr("!$event.metaKey"),
      left: Sr("'button' in $event && $event.button !== 0"),
      middle: Sr("'button' in $event && $event.button !== 1"),
      right: Sr("'button' in $event && $event.button !== 2"),
    };

  function Tr(e, t) {
    var n = t ? "nativeOn:" : "on:",
      i = "",
      o = "";
    for (var s in e) {
      var r = (function t(e) {
        if (!e) return "function(){}";
        if (Array.isArray(e))
          return (
            "[" +
            e
              .map(function (e) {
                return t(e);
              })
              .join(",") +
            "]"
          );
        var n = xr.test(e.value),
          i = wr.test(e.value),
          o = xr.test(e.value.replace(_r, ""));
        if (e.modifiers) {
          var s,
            r = "",
            a = "",
            l = [];
          for (var c in e.modifiers) {
            Ar[c]
              ? ((a += Ar[c]), $r[c] && l.push(c))
              : "exact" === c
              ? ((s = e.modifiers),
                (a += Sr(
                  ["ctrl", "shift", "alt", "meta"]
                    .filter(function (e) {
                      return !s[e];
                    })
                    .map(function (e) {
                      return "$event." + e + "Key";
                    })
                    .join("||")
                )))
              : l.push(c);
          }
          return (
            l.length &&
              (r += (function (e) {
                return (
                  "if(!$event.type.indexOf('key')&&" +
                  e.map(Or).join("&&") +
                  ")return null;"
                );
              })(l)),
            a && (r += a),
            "function($event){" +
              r +
              (n
                ? "return " + e.value + ".apply(null, arguments)"
                : i
                ? "return (" + e.value + ").apply(null, arguments)"
                : o
                ? "return " + e.value
                : e.value) +
              "}"
          );
        }
        return n || i
          ? e.value
          : "function($event){" + (o ? "return " + e.value : e.value) + "}";
      })(e[s]);
      e[s] && e[s].dynamic
        ? (o += s + "," + r + ",")
        : (i += '"' + s + '":' + r + ",");
    }
    return (
      (i = "{" + i.slice(0, -1) + "}"),
      o ? n + "_d(" + i + ",[" + o.slice(0, -1) + "])" : n + i
    );
  }

  function Or(e) {
    var t = parseInt(e, 10);
    if (t) return "$event.keyCode!==" + t;
    var n = $r[e],
      i = Cr[e];
    return (
      "_k($event.keyCode," +
      JSON.stringify(e) +
      "," +
      JSON.stringify(n) +
      ",$event.key," +
      JSON.stringify(i) +
      ")"
    );
  }
  var Fr = {
      on: function (e, t) {
        e.wrapListeners = function (e) {
          return "_g(" + e + "," + t.value + ")";
        };
      },
      bind: function (t, n) {
        t.wrapData = function (e) {
          return (
            "_b(" +
            e +
            ",'" +
            t.tag +
            "'," +
            n.value +
            "," +
            (n.modifiers && n.modifiers.prop ? "true" : "false") +
            (n.modifiers && n.modifiers.sync ? ",true" : "") +
            ")"
          );
        };
      },
      cloak: _,
    },
    Dr = function (e) {
      (this.options = e),
        (this.warn = e.warn || Di),
        (this.transforms = zi(e.modules, "transformCode")),
        (this.dataGenFns = zi(e.modules, "genData")),
        (this.directives = m(m({}, Fr), e.directives));
      var t = e.isReservedTag || C;
      (this.maybeComponent = function (e) {
        return !!e.component || !t(e.tag);
      }),
        (this.onceId = 0),
        (this.staticRenderFns = []),
        (this.pre = !1);
    };

  function zr(e, t) {
    var n = new Dr(t);
    return {
      render:
        "with(this){return " +
        (e ? ("script" === e.tag ? "null" : Mr(e, n)) : '_c("div")') +
        "}",
      staticRenderFns: n.staticRenderFns,
    };
  }

  function Mr(e, t) {
    if (
      (e.parent && (e.pre = e.pre || e.parent.pre),
      e.staticRoot && !e.staticProcessed)
    )
      return Er(e, t);
    if (e.once && !e.onceProcessed) return Ir(e, t);
    if (e.for && !e.forProcessed) return Lr(e, t);
    if (e.if && !e.ifProcessed) return jr(e, t);
    if ("template" !== e.tag || e.slotTarget || t.pre) {
      if ("slot" === e.tag)
        return (
          (d = (u = e).slotName || '"default"'),
          (h = Rr(u, t)),
          (p = "_t(" + d + (h ? ",function(){return " + h + "}" : "")),
          (f =
            u.attrs || u.dynamicAttrs
              ? qr(
                  (u.attrs || [])
                    .concat(u.dynamicAttrs || [])
                    .map(function (e) {
                      return {
                        name: k(e.name),
                        value: e.value,
                        dynamic: e.dynamic,
                      };
                    })
                )
              : null),
          (m = u.attrsMap["v-bind"]),
          (!f && !m) || h || (p += ",null"),
          f && (p += "," + f),
          m && (p += (f ? "" : ",null") + "," + m),
          p + ")"
        );
      var n, i, o;
      o = e.component
        ? ((r = e.component),
          (l = t),
          (c = (a = e).inlineTemplate ? null : Rr(a, l, !0)),
          "_c(" + r + "," + Pr(a, l) + (c ? "," + c : "") + ")")
        : ((!e.plain || (e.pre && t.maybeComponent(e))) && (n = Pr(e, t)),
          (i = e.inlineTemplate ? null : Rr(e, t, !0)),
          "_c('" + e.tag + "'" + (n ? "," + n : "") + (i ? "," + i : "") + ")");
      for (var s = 0; s < t.transforms.length; s++) o = t.transforms[s](e, o);
      return o;
    }
    var r, a, l, c, u, d, h, p, f, m;
    return Rr(e, t) || "void 0";
  }

  function Er(e, t) {
    e.staticProcessed = !0;
    var n = t.pre;
    return (
      e.pre && (t.pre = e.pre),
      t.staticRenderFns.push("with(this){return " + Mr(e, t) + "}"),
      (t.pre = n),
      "_m(" +
        (t.staticRenderFns.length - 1) +
        (e.staticInFor ? ",true" : "") +
        ")"
    );
  }

  function Ir(e, t) {
    if (((e.onceProcessed = !0), e.if && !e.ifProcessed)) return jr(e, t);
    if (e.staticInFor) {
      for (var n = "", i = e.parent; i; ) {
        if (i.for) {
          n = i.key;
          break;
        }
        i = i.parent;
      }
      return n ? "_o(" + Mr(e, t) + "," + t.onceId++ + "," + n + ")" : Mr(e, t);
    }
    return Er(e, t);
  }

  function jr(e, t, n, i) {
    return (
      (e.ifProcessed = !0),
      (function e(t, n, i, o) {
        if (!t.length) return o || "_e()";
        var s = t.shift();
        return s.exp
          ? "(" + s.exp + ")?" + r(s.block) + ":" + e(t, n, i, o)
          : "" + r(s.block);

        function r(e) {
          return (i || (e.once ? Ir : Mr))(e, n);
        }
      })(e.ifConditions.slice(), t, n, i)
    );
  }

  function Lr(e, t, n, i) {
    var o = e.for,
      s = e.alias,
      r = e.iterator1 ? "," + e.iterator1 : "",
      a = e.iterator2 ? "," + e.iterator2 : "";
    return (
      (e.forProcessed = !0),
      (i || "_l") +
        "((" +
        o +
        "),function(" +
        s +
        r +
        a +
        "){return " +
        (n || Mr)(e, t) +
        "})"
    );
  }

  function Pr(n, i) {
    var e = "{",
      t = (function (e, t) {
        var n = e.directives;
        if (n) {
          for (
            var i, o, s = "directives:[", r = !1, a = 0, l = n.length;
            a < l;
            a++
          ) {
            (i = n[a]), (o = !0);
            var c = t.directives[i.name];
            c && (o = !!c(e, i, t.warn)),
              o &&
                ((r = !0),
                (s +=
                  '{name:"' +
                  i.name +
                  '",rawName:"' +
                  i.rawName +
                  '"' +
                  (i.value
                    ? ",value:(" +
                      i.value +
                      "),expression:" +
                      JSON.stringify(i.value)
                    : "") +
                  (i.arg
                    ? ",arg:" + (i.isDynamicArg ? i.arg : '"' + i.arg + '"')
                    : "") +
                  (i.modifiers
                    ? ",modifiers:" + JSON.stringify(i.modifiers)
                    : "") +
                  "},"));
          }
          return r ? s.slice(0, -1) + "]" : void 0;
        }
      })(n, i);
    t && (e += t + ","),
      n.key && (e += "key:" + n.key + ","),
      n.ref && (e += "ref:" + n.ref + ","),
      n.refInFor && (e += "refInFor:true,"),
      n.pre && (e += "pre:true,"),
      n.component && (e += 'tag:"' + n.tag + '",');
    for (var o, s = 0; s < i.dataGenFns.length; s++) e += i.dataGenFns[s](n);
    return (
      n.attrs && (e += "attrs:" + qr(n.attrs) + ","),
      n.props && (e += "domProps:" + qr(n.props) + ","),
      n.events && (e += Tr(n.events, !1) + ","),
      n.nativeEvents && (e += Tr(n.nativeEvents, !0) + ","),
      n.slotTarget && !n.slotScope && (e += "slot:" + n.slotTarget + ","),
      n.scopedSlots &&
        (e +=
          (function (e, n, t) {
            var i =
                e.for ||
                Object.keys(n).some(function (e) {
                  var t = n[e];
                  return t.slotTargetDynamic || t.if || t.for || Nr(t);
                }),
              o = !!e.if;
            if (!i)
              for (var s = e.parent; s; ) {
                if ((s.slotScope && s.slotScope !== sr) || s.for) {
                  i = !0;
                  break;
                }
                s.if && (o = !0), (s = s.parent);
              }
            var r = Object.keys(n)
              .map(function (e) {
                return Br(n[e], t);
              })
              .join(",");
            return (
              "scopedSlots:_u([" +
              r +
              "]" +
              (i ? ",null,true" : "") +
              (!i && o
                ? ",null,false," +
                  (function (e) {
                    for (var t = 5381, n = e.length; n; )
                      t = (33 * t) ^ e.charCodeAt(--n);
                    return t >>> 0;
                  })(r)
                : "") +
              ")"
            );
          })(n, n.scopedSlots, i) + ","),
      n.model &&
        (e +=
          "model:{value:" +
          n.model.value +
          ",callback:" +
          n.model.callback +
          ",expression:" +
          n.model.expression +
          "},"),
      n.inlineTemplate &&
        (o = (function () {
          var e = n.children[0];
          if (e && 1 === e.type) {
            var t = zr(e, i.options);
            return (
              "inlineTemplate:{render:function(){" +
              t.render +
              "},staticRenderFns:[" +
              t.staticRenderFns
                .map(function (e) {
                  return "function(){" + e + "}";
                })
                .join(",") +
              "]}"
            );
          }
        })()) &&
        (e += o + ","),
      (e = e.replace(/,$/, "") + "}"),
      n.dynamicAttrs &&
        (e = "_b(" + e + ',"' + n.tag + '",' + qr(n.dynamicAttrs) + ")"),
      n.wrapData && (e = n.wrapData(e)),
      n.wrapListeners && (e = n.wrapListeners(e)),
      e
    );
  }

  function Nr(e) {
    return 1 === e.type && ("slot" === e.tag || e.children.some(Nr));
  }

  function Br(e, t) {
    var n = e.attrsMap["slot-scope"];
    if (e.if && !e.ifProcessed && !n) return jr(e, t, Br, "null");
    if (e.for && !e.forProcessed) return Lr(e, t, Br);
    var i = e.slotScope === sr ? "" : String(e.slotScope),
      o =
        "function(" +
        i +
        "){return " +
        ("template" === e.tag
          ? e.if && n
            ? "(" + e.if + ")?" + (Rr(e, t) || "undefined") + ":undefined"
            : Rr(e, t) || "undefined"
          : Mr(e, t)) +
        "}",
      s = i ? "" : ",proxy:true";
    return "{key:" + (e.slotTarget || '"default"') + ",fn:" + o + s + "}";
  }

  function Rr(e, t, n, i, o) {
    var s = e.children;
    if (s.length) {
      var r = s[0];
      if (1 === s.length && r.for && "template" !== r.tag && "slot" !== r.tag) {
        var a = n ? (t.maybeComponent(r) ? ",1" : ",0") : "";
        return (i || Mr)(r, t) + a;
      }
      var l = n
          ? (function (e, t) {
              for (var n = 0, i = 0; i < e.length; i++) {
                var o = e[i];
                if (1 === o.type) {
                  if (
                    Hr(o) ||
                    (o.ifConditions &&
                      o.ifConditions.some(function (e) {
                        return Hr(e.block);
                      }))
                  ) {
                    n = 2;
                    break;
                  }
                  (t(o) ||
                    (o.ifConditions &&
                      o.ifConditions.some(function (e) {
                        return t(e.block);
                      }))) &&
                    (n = 1);
                }
              }
              return n;
            })(s, t.maybeComponent)
          : 0,
        c = o || Vr;
      return (
        "[" +
        s
          .map(function (e) {
            return c(e, t);
          })
          .join(",") +
        "]" +
        (l ? "," + l : "")
      );
    }
  }

  function Hr(e) {
    return void 0 !== e.for || "template" === e.tag || "slot" === e.tag;
  }

  function Vr(e, t) {
    return 1 === e.type
      ? Mr(e, t)
      : 3 === e.type && e.isComment
      ? "_e(" + JSON.stringify(e.text) + ")"
      : "_v(" +
        (2 === e.type ? e.expression : Ur(JSON.stringify(e.text))) +
        ")";
  }

  function qr(e) {
    for (var t = "", n = "", i = 0; i < e.length; i++) {
      var o = e[i],
        s = Ur(o.value);
      o.dynamic
        ? (n += o.name + "," + s + ",")
        : (t += '"' + o.name + '":' + s + ",");
    }
    return (
      (t = "{" + t.slice(0, -1) + "}"),
      n ? "_d(" + t + ",[" + n.slice(0, -1) + "])" : t
    );
  }

  function Ur(e) {
    return e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }

  function Wr(t, n) {
    try {
      return new Function(t);
    } catch (e) {
      return (
        n.push({
          err: e,
          code: t,
        }),
        _
      );
    }
  }
  new RegExp(
    "\\b" +
      "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments"
        .split(",")
        .join("\\b|\\b") +
      "\\b"
  );
  var Yr,
    Xr,
    Kr,
    Zr,
    Gr,
    Jr =
      ((Yr = function (e, t) {
        var n = ar(e.trim(), t);
        !1 !== t.optimize && kr(n, t);
        var i = zr(n, t);
        return {
          ast: n,
          render: i.render,
          staticRenderFns: i.staticRenderFns,
        };
      }),
      (Kr = br),
      {
        compile: ea,
        compileToFunctions:
          ((Zr = ea),
          (Gr = Object.create(null)),
          function (e, t, n) {
            (t = m({}, t)).warn, delete t.warn;
            var i = t.delimiters ? String(t.delimiters) + e : e;
            if (Gr[i]) return Gr[i];
            var o = Zr(e, t),
              s = {},
              r = [];
            return (
              (s.render = Wr(o.render, r)),
              (s.staticRenderFns = o.staticRenderFns.map(function (e) {
                return Wr(e, r);
              })),
              (Gr[i] = s)
            );
          }),
      }),
    Qr = Jr.compileToFunctions;

  function ea(e, t) {
    var n = Object.create(Kr),
      i = [],
      o = [];
    if (t)
      for (var s in (t.modules &&
        (n.modules = (Kr.modules || []).concat(t.modules)),
      t.directives &&
        (n.directives = m(Object.create(Kr.directives || null), t.directives)),
      t))
        "modules" !== s && "directives" !== s && (n[s] = t[s]);
    n.warn = function (e, t, n) {
      (n ? o : i).push(e);
    };
    var r = Yr(e.trim(), n);
    return (r.errors = i), (r.tips = o), r;
  }

  function ta(e) {
    return (
      ((Xr = Xr || document.createElement("div")).innerHTML = e
        ? '<a href="\n"/>'
        : '<div a="\n"/>'),
      0 < Xr.innerHTML.indexOf("&#10;")
    );
  }
  var na = !!V && ta(!1),
    ia = !!V && ta(!0),
    oa = e(function (e) {
      var t = oi(e);
      return t && t.innerHTML;
    }),
    sa = Sn.prototype.$mount;
  return (
    (Sn.prototype.$mount = function (e, t) {
      if ((e = e && oi(e)) === document.body || e === document.documentElement)
        return this;
      var n = this.$options;
      if (!n.render) {
        var i,
          o,
          s,
          r = n.template;
        if (r)
          if ("string" == typeof r) "#" === r.charAt(0) && (r = oa(r));
          else {
            if (!r.nodeType) return this;
            r = r.innerHTML;
          }
        else
          e &&
            (r = (function (e) {
              if (e.outerHTML) return e.outerHTML;
              var t = document.createElement("div");
              return t.appendChild(e.cloneNode(!0)), t.innerHTML;
            })(e));
        r &&
          ((o = (i = Qr(
            r,
            {
              outputSourceRange: !1,
              shouldDecodeNewlines: na,
              shouldDecodeNewlinesForHref: ia,
              delimiters: n.delimiters,
              comments: n.comments,
            },
            this
          )).render),
          (s = i.staticRenderFns),
          (n.render = o),
          (n.staticRenderFns = s));
      }
      return sa.call(this, e, t);
    }),
    (Sn.compile = Qr),
    Sn
  );
}),
  (t = this),
  (e = function () {
    "use strict";

    function p(e) {
      return -1 < Object.prototype.toString.call(e).indexOf("Error");
    }

    function _(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }

    function t(e) {
      return "%" + e.charCodeAt(0).toString(16);
    }
    var s = {
        name: "RouterView",
        functional: !0,
        props: {
          name: {
            type: String,
            default: "default",
          },
        },
        render: function (e, t) {
          var n = t.props,
            i = t.children,
            o = t.parent,
            s = t.data;
          s.routerView = !0;
          for (
            var r = o.$createElement,
              a = n.name,
              l = o.$route,
              c = o._routerViewCache || (o._routerViewCache = {}),
              u = 0,
              d = !1;
            o && o._routerRoot !== o;

          ) {
            var h = o.$vnode && o.$vnode.data;
            h && (h.routerView && u++, h.keepAlive && o._inactive && (d = !0)),
              (o = o.$parent);
          }
          if (((s.routerViewDepth = u), d)) return r(c[a], s, i);
          var p = l.matched[u];
          if (!p) return (c[a] = null), r();
          var f = (c[a] = p.components[a]);
          (s.registerRouteInstance = function (e, t) {
            var n = p.instances[a];
            ((t && n !== e) || (!t && n === e)) && (p.instances[a] = t);
          }),
            ((s.hook || (s.hook = {})).prepatch = function (e, t) {
              p.instances[a] = t.componentInstance;
            }),
            (s.hook.init = function (e) {
              e.data.keepAlive &&
                e.componentInstance &&
                e.componentInstance !== p.instances[a] &&
                (p.instances[a] = e.componentInstance);
            });
          var m = (s.props = (function (e, t) {
            switch (void 0 === t ? "undefined" : _typeof2(t)) {
              case "undefined":
                return;
              case "object":
                return t;
              case "function":
                return t(e);
              case "boolean":
                return t ? e.params : void 0;
            }
          })(l, p.props && p.props[a]));
          if (m) {
            m = s.props = _({}, m);
            var v = (s.attrs = s.attrs || {});
            for (var g in m)
              (f.props && g in f.props) || ((v[g] = m[g]), delete m[g]);
          }
          return r(f, s, i);
        },
      },
      n = /[!'()*]/g,
      i = /%2C/g,
      r = function (e) {
        return encodeURIComponent(e).replace(n, t).replace(i, ",");
      },
      a = decodeURIComponent;

    function h(e) {
      var o = {};
      return (
        (e = e.trim().replace(/^(\?|#|&)/, "")) &&
          e.split("&").forEach(function (e) {
            var t = e.replace(/\+/g, " ").split("="),
              n = a(t.shift()),
              i = 0 < t.length ? a(t.join("=")) : null;
            void 0 === o[n]
              ? (o[n] = i)
              : Array.isArray(o[n])
              ? o[n].push(i)
              : (o[n] = [o[n], i]);
          }),
        o
      );
    }
    var x = /\/?$/;

    function $(e, t, n, i) {
      var o = i && i.options.stringifyQuery,
        s = t.query || {};
      try {
        s = l(s);
      } catch (e) {}
      var r = {
        name: t.name || (e && e.name),
        meta: (e && e.meta) || {},
        path: t.path || "/",
        hash: t.hash || "",
        query: s,
        params: t.params || {},
        fullPath: u(t, o),
        matched: e
          ? (function (e) {
              for (var t = []; e; ) t.unshift(e), (e = e.parent);
              return t;
            })(e)
          : [],
      };
      return n && (r.redirectedFrom = u(n, o)), Object.freeze(r);
    }

    function l(e) {
      if (Array.isArray(e)) return e.map(l);
      if (e && "object" == (void 0 === e ? "undefined" : _typeof2(e))) {
        var t = {};
        for (var n in e) t[n] = l(e[n]);
        return t;
      }
      return e;
    }
    var c = $(null, {
      path: "/",
    });

    function u(e, t) {
      var n = e.path,
        i = e.query;
      void 0 === i && (i = {});
      var o = e.hash;
      return (
        void 0 === o && (o = ""),
        (n || "/") +
          (
            t ||
            function (i) {
              var e = i
                ? Object.keys(i)
                    .map(function (t) {
                      var e = i[t];
                      if (void 0 === e) return "";
                      if (null === e) return r(t);
                      if (Array.isArray(e)) {
                        var n = [];
                        return (
                          e.forEach(function (e) {
                            void 0 !== e &&
                              (null === e
                                ? n.push(r(t))
                                : n.push(r(t) + "=" + r(e)));
                          }),
                          n.join("&")
                        );
                      }
                      return r(t) + "=" + r(e);
                    })
                    .filter(function (e) {
                      return 0 < e.length;
                    })
                    .join("&")
                : null;
              return e ? "?" + e : "";
            }
          )(i) +
          o
      );
    }

    function C(e, t) {
      return t === c
        ? e === t
        : !!t &&
            (e.path && t.path
              ? e.path.replace(x, "") === t.path.replace(x, "") &&
                e.hash === t.hash &&
                d(e.query, t.query)
              : !(!e.name || !t.name) &&
                e.name === t.name &&
                e.hash === t.hash &&
                d(e.query, t.query) &&
                d(e.params, t.params));
    }

    function d(i, o) {
      if ((void 0 === i && (i = {}), void 0 === o && (o = {}), !i || !o))
        return i === o;
      var e = Object.keys(i),
        t = Object.keys(o);
      return (
        e.length === t.length &&
        e.every(function (e) {
          var t = i[e],
            n = o[e];
          return "object" == (void 0 === t ? "undefined" : _typeof2(t)) &&
            "object" == (void 0 === n ? "undefined" : _typeof2(n))
            ? d(t, n)
            : String(t) === String(n);
        })
      );
    }
    var f,
      e = [String, Object],
      o = [String, Array],
      m = {
        name: "RouterLink",
        props: {
          to: {
            type: e,
            required: !0,
          },
          tag: {
            type: String,
            default: "a",
          },
          exact: Boolean,
          append: Boolean,
          replace: Boolean,
          activeClass: String,
          exactActiveClass: String,
          event: {
            type: o,
            default: "click",
          },
        },
        render: function (e) {
          var t,
            n,
            i = this,
            o = this.$router,
            s = this.$route,
            r = o.resolve(this.to, s, this.append),
            a = r.location,
            l = r.route,
            c = r.href,
            u = {},
            d = o.options.linkActiveClass,
            h = o.options.linkExactActiveClass,
            p = null == d ? "router-link-active" : d,
            f = null == h ? "router-link-exact-active" : h,
            m = null == this.activeClass ? p : this.activeClass,
            v = null == this.exactActiveClass ? f : this.exactActiveClass,
            g = a.path ? $(null, a, null, o) : l;
          (u[v] = C(s, g)),
            (u[m] = this.exact
              ? u[v]
              : ((n = g),
                0 ===
                  (t = s).path
                    .replace(x, "/")
                    .indexOf(n.path.replace(x, "/")) &&
                  (!n.hash || t.hash === n.hash) &&
                  (function (e, t) {
                    for (var n in t) if (!(n in e)) return !1;
                    return !0;
                  })(t.query, n.query)));

          function b(e) {
            S(e) && (i.replace ? o.replace(a) : o.push(a));
          }
          var y = {
            click: S,
          };
          Array.isArray(this.event)
            ? this.event.forEach(function (e) {
                y[e] = b;
              })
            : (y[this.event] = b);
          var k,
            w = {
              class: u,
            };
          return (
            "a" === this.tag
              ? ((w.on = y),
                (w.attrs = {
                  href: c,
                }))
              : (k = (function e(t) {
                  if (t)
                    for (var n, i = 0; i < t.length; i++) {
                      if ("a" === (n = t[i]).tag) return n;
                      if (n.children && (n = e(n.children))) return n;
                    }
                })(this.$slots.default))
              ? ((k.isStatic = !1),
                ((k.data = _({}, k.data)).on = y),
                ((k.data.attrs = _({}, k.data.attrs)).href = c))
              : (w.on = y),
            e(this.tag, w, this.$slots.default)
          );
        },
      };

    function S(e) {
      if (
        !(
          e.metaKey ||
          e.altKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.defaultPrevented ||
          (void 0 !== e.button && 0 !== e.button)
        )
      ) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
          var t = e.currentTarget.getAttribute("target");
          if (/\b_blank\b/i.test(t)) return;
        }
        return e.preventDefault && e.preventDefault(), !0;
      }
    }
    var v = "undefined" != typeof window;

    function g(e, t, n) {
      var i = e.charAt(0);
      if ("/" === i) return e;
      if ("?" === i || "#" === i) return t + e;
      var o = t.split("/");
      (n && o[o.length - 1]) || o.pop();
      for (var s = e.replace(/^\//, "").split("/"), r = 0; r < s.length; r++) {
        var a = s[r];
        ".." === a ? o.pop() : "." !== a && o.push(a);
      }
      return "" !== o[0] && o.unshift(""), o.join("/");
    }

    function b(e) {
      return e.replace(/\/\//g, "/");
    }
    var y =
        Array.isArray ||
        function (e) {
          return "[object Array]" == Object.prototype.toString.call(e);
        },
      k = function s(e, t, n) {
        return (
          y(t) || ((n = t || n), (t = [])),
          (n = n || {}),
          e instanceof RegExp
            ? (function (e, t) {
                var n = e.source.match(/\((?!\?)/g);
                if (n)
                  for (var i = 0; i < n.length; i++)
                    t.push({
                      name: i,
                      prefix: null,
                      delimiter: null,
                      optional: !1,
                      repeat: !1,
                      partial: !1,
                      asterisk: !1,
                      pattern: null,
                    });
                return E(e, t);
              })(e, t)
            : (y(e)
                ? function (e, t, n) {
                    for (var i = [], o = 0; o < e.length; o++)
                      i.push(s(e[o], t, n).source);
                    return E(new RegExp("(?:" + i.join("|") + ")", I(n)), t);
                  }
                : function (e, t, n) {
                    return j(F(e, n), t, n);
                  })(e, t, n)
        );
      },
      w = F,
      A = z,
      T = j,
      O = new RegExp(
        [
          "(\\\\.)",
          "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))",
        ].join("|"),
        "g"
      );

    function F(e, t) {
      for (
        var n, i = [], o = 0, s = 0, r = "", a = (t && t.delimiter) || "/";
        null != (n = O.exec(e));

      ) {
        var l,
          c,
          u,
          d,
          h,
          p,
          f,
          m,
          v,
          g,
          b,
          y,
          k = n[0],
          w = n[1],
          _ = n.index;
        (r += e.slice(s, _)),
          (s = _ + k.length),
          w
            ? (r += w[1])
            : ((l = e[s]),
              (c = n[2]),
              (u = n[3]),
              (d = n[4]),
              (h = n[5]),
              (p = n[6]),
              (f = n[7]),
              r && (i.push(r), (r = "")),
              (m = null != c && null != l && l !== c),
              (v = "+" === p || "*" === p),
              (g = "?" === p || "*" === p),
              (b = n[2] || a),
              (y = d || h),
              i.push({
                name: u || o++,
                prefix: c || "",
                delimiter: b,
                optional: g,
                repeat: v,
                partial: m,
                asterisk: !!f,
                pattern: y
                  ? y.replace(/([=!:$\/()])/g, "\\$1")
                  : f
                  ? ".*"
                  : "[^" + M(b) + "]+?",
              }));
      }
      return s < e.length && (r += e.substr(s)), r && i.push(r), i;
    }

    function D(e) {
      return encodeURI(e).replace(/[\/?#]/g, function (e) {
        return "%" + e.charCodeAt(0).toString(16).toUpperCase();
      });
    }

    function z(u) {
      for (var d = new Array(u.length), e = 0; e < u.length; e++)
        "object" == _typeof2(u[e]) &&
          (d[e] = new RegExp("^(?:" + u[e].pattern + ")$"));
      return function (e, t) {
        for (
          var n = "",
            i = e || {},
            o = (t || {}).pretty ? D : encodeURIComponent,
            s = 0;
          s < u.length;
          s++
        ) {
          var r = u[s];
          if ("string" != typeof r) {
            var a,
              l = i[r.name];
            if (null == l) {
              if (r.optional) {
                r.partial && (n += r.prefix);
                continue;
              }
              throw new TypeError('Expected "' + r.name + '" to be defined');
            }
            if (y(l)) {
              if (!r.repeat)
                throw new TypeError(
                  'Expected "' +
                    r.name +
                    '" to not repeat, but received `' +
                    JSON.stringify(l) +
                    "`"
                );
              if (0 === l.length) {
                if (r.optional) continue;
                throw new TypeError(
                  'Expected "' + r.name + '" to not be empty'
                );
              }
              for (var c = 0; c < l.length; c++) {
                if (((a = o(l[c])), !d[s].test(a)))
                  throw new TypeError(
                    'Expected all "' +
                      r.name +
                      '" to match "' +
                      r.pattern +
                      '", but received `' +
                      JSON.stringify(a) +
                      "`"
                  );
                n += (0 === c ? r.prefix : r.delimiter) + a;
              }
            } else {
              if (
                ((a = r.asterisk
                  ? encodeURI(l).replace(/[?#]/g, function (e) {
                      return "%" + e.charCodeAt(0).toString(16).toUpperCase();
                    })
                  : o(l)),
                !d[s].test(a))
              )
                throw new TypeError(
                  'Expected "' +
                    r.name +
                    '" to match "' +
                    r.pattern +
                    '", but received "' +
                    a +
                    '"'
                );
              n += r.prefix + a;
            }
          } else n += r;
        }
        return n;
      };
    }

    function M(e) {
      return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
    }

    function E(e, t) {
      return (e.keys = t), e;
    }

    function I(e) {
      return e.sensitive ? "" : "i";
    }

    function j(e, t, n) {
      y(t) || ((n = t || n), (t = []));
      for (
        var i = (n = n || {}).strict, o = !1 !== n.end, s = "", r = 0;
        r < e.length;
        r++
      ) {
        var a,
          l,
          c = e[r];
        "string" == typeof c
          ? (s += M(c))
          : ((a = M(c.prefix)),
            (l = "(?:" + c.pattern + ")"),
            t.push(c),
            c.repeat && (l += "(?:" + a + l + ")*"),
            (s += l =
              c.optional
                ? c.partial
                  ? a + "(" + l + ")?"
                  : "(?:" + a + "(" + l + "))?"
                : a + "(" + l + ")"));
      }
      var u = M(n.delimiter || "/"),
        d = s.slice(-u.length) === u;
      return (
        i || (s = (d ? s.slice(0, -u.length) : s) + "(?:" + u + "(?=$))?"),
        (s += o ? "$" : i && d ? "" : "(?=" + u + "|$)"),
        E(new RegExp("^" + s, I(n)), t)
      );
    }
    (k.parse = w),
      (k.compile = function (e, t) {
        return z(F(e, t));
      }),
      (k.tokensToFunction = A),
      (k.tokensToRegExp = T);
    var L = Object.create(null);

    function P(e, t) {
      t = t || {};
      try {
        var n = L[e] || (L[e] = k.compile(e));
        return (
          t.pathMatch && (t[0] = t.pathMatch),
          n(t, {
            pretty: !0,
          })
        );
      } catch (e) {
        return "";
      } finally {
        delete t[0];
      }
    }

    function N(e, t, n, i) {
      var o = t || [],
        s = n || Object.create(null),
        r = i || Object.create(null);
      e.forEach(function (e) {
        !(function n(i, o, s, r, a, l) {
          var e,
            t,
            c = r.path,
            u = r.name,
            d = r.pathToRegexpOptions || {},
            h =
              ((e = c),
              (t = a),
              d.strict || (e = e.replace(/\/$/, "")),
              "/" === e[0] || null == t ? e : b(t.path + "/" + e));
          "boolean" == typeof r.caseSensitive &&
            (d.sensitive = r.caseSensitive);
          var p = {
            path: h,
            regex: k(h, [], d),
            components: r.components || {
              default: r.component,
            },
            instances: {},
            name: u,
            parent: a,
            matchAs: l,
            redirect: r.redirect,
            beforeEnter: r.beforeEnter,
            meta: r.meta || {},
            props:
              null == r.props
                ? {}
                : r.components
                ? r.props
                : {
                    default: r.props,
                  },
          };
          r.children &&
            r.children.forEach(function (e) {
              var t = l ? b(l + "/" + e.path) : void 0;
              n(i, o, s, e, p, t);
            }),
            void 0 !== r.alias &&
              (Array.isArray(r.alias) ? r.alias : [r.alias]).forEach(function (
                e
              ) {
                var t = {
                  path: e,
                  children: r.children,
                };
                n(i, o, s, t, a, p.path || "/");
              }),
            o[p.path] || (i.push(p.path), (o[p.path] = p)),
            u && (s[u] || (s[u] = p));
        })(o, s, r, e);
      });
      for (var a = 0, l = o.length; a < l; a++)
        "*" === o[a] && (o.push(o.splice(a, 1)[0]), l--, a--);
      return {
        pathList: o,
        pathMap: s,
        nameMap: r,
      };
    }

    function B(e, t, n, s) {
      var i =
        "string" == typeof e
          ? {
              path: e,
            }
          : e;
      if (i._normalized) return i;
      if (i.name) return _({}, e);
      if (!i.path && i.params && t) {
        (i = _({}, i))._normalized = !0;
        var o,
          r = _(_({}, t.params), i.params);
        return (
          t.name
            ? ((i.name = t.name), (i.params = r))
            : t.matched.length &&
              ((o = t.matched[t.matched.length - 1].path),
              (i.path = P(o, r, t.path))),
          i
        );
      }
      var a = (function (e) {
          var t = "",
            n = "",
            i = e.indexOf("#");
          0 <= i && ((t = e.slice(i)), (e = e.slice(0, i)));
          var o = e.indexOf("?");
          return (
            0 <= o && ((n = e.slice(o + 1)), (e = e.slice(0, o))),
            {
              path: e,
              query: n,
              hash: t,
            }
          );
        })(i.path || ""),
        l = (t && t.path) || "/",
        c = a.path ? g(a.path, l, n || i.append) : l,
        u = (function (e, t) {
          void 0 === t && (t = {});
          var n,
            i = (s && s.options.parseQuery) || h;
          try {
            n = i(e || "");
          } catch (e) {
            n = {};
          }
          for (var o in t) n[o] = t[o];
          return n;
        })(a.query, i.query),
        d = i.hash || a.hash;
      return (
        d && "#" !== d.charAt(0) && (d = "#" + d),
        {
          _normalized: !0,
          path: c,
          query: u,
          hash: d,
        }
      );
    }

    function R(e, d) {
      var t = N(e),
        h = t.pathList,
        p = t.pathMap,
        f = t.nameMap;

      function u(e, t, n) {
        var i = B(e, t, !1, d),
          o = i.name;
        if (o) {
          var s = f[o];
          if (!s) return m(null, i);
          var r = s.regex.keys
            .filter(function (e) {
              return !e.optional;
            })
            .map(function (e) {
              return e.name;
            });
          if (
            ("object" != _typeof2(i.params) && (i.params = {}),
            t && "object" == _typeof2(t.params))
          )
            for (var a in t.params)
              !(a in i.params) &&
                -1 < r.indexOf(a) &&
                (i.params[a] = t.params[a]);
          return (i.path = P(s.path, i.params)), m(s, i, n);
        }
        if (i.path) {
          i.params = {};
          for (var l = 0; l < h.length; l++) {
            var c = h[l],
              u = p[c];
            if (
              (function (e, t, n) {
                var i = t.match(e);
                if (!i) return !1;
                if (!n) return !0;
                for (var o = 1, s = i.length; o < s; ++o) {
                  var r = e.keys[o - 1],
                    a =
                      "string" == typeof i[o] ? decodeURIComponent(i[o]) : i[o];
                  r && (n[r.name || "pathMatch"] = a);
                }
                return !0;
              })(u.regex, i.path, i.params)
            )
              return m(u, i, n);
          }
        }
        return m(null, i);
      }

      function m(o, e, t) {
        return o && o.redirect
          ? (function (e, t) {
              var n = e.redirect,
                i = "function" == typeof n ? n($(e, t, null, d)) : n;
              if (
                ("string" == typeof i &&
                  (i = {
                    path: i,
                  }),
                !i || "object" != (void 0 === i ? "undefined" : _typeof2(i)))
              )
                return m(null, t);
              var o = i,
                s = o.name,
                r = o.path,
                a = t.query,
                l = t.hash,
                c = t.params,
                a = o.hasOwnProperty("query") ? o.query : a,
                l = o.hasOwnProperty("hash") ? o.hash : l,
                c = o.hasOwnProperty("params") ? o.params : c;
              return s
                ? (f[s],
                  u(
                    {
                      _normalized: !0,
                      name: s,
                      query: a,
                      hash: l,
                      params: c,
                    },
                    void 0,
                    t
                  ))
                : r
                ? u(
                    {
                      _normalized: !0,
                      path: P(g(r, e.parent ? e.parent.path : "/", !0), c),
                      query: a,
                      hash: l,
                    },
                    void 0,
                    t
                  )
                : m(null, t);
            })(o, t || e)
          : o && o.matchAs
          ? (function (e) {
              var t = u({
                _normalized: !0,
                path: P(o.matchAs, e.params),
              });
              if (t) {
                var n = t.matched,
                  i = n[n.length - 1];
                return (e.params = t.params), m(i, e);
              }
              return m(null, e);
            })(e)
          : $(o, e, t, d);
      }
      return {
        match: u,
        addRoutes: function (e) {
          N(e, h, p, f);
        },
      };
    }
    var H = Object.create(null);

    function V() {
      var e = window.location.protocol + "//" + window.location.host,
        t = window.location.href.replace(e, "");
      window.history.replaceState(
        {
          key: Q,
        },
        "",
        t
      ),
        window.addEventListener("popstate", function (e) {
          var t;
          U(), e.state && e.state.key && ((t = e.state.key), (Q = t));
        });
    }

    function q(n, i, o, s) {
      var r;
      !n.app ||
        ((r = n.options.scrollBehavior) &&
          n.app.$nextTick(function () {
            var t = (function () {
                if (Q) return H[Q];
              })(),
              e = r.call(n, i, o, s ? t : null);
            e &&
              ("function" == typeof e.then
                ? e
                    .then(function (e) {
                      K(e, t);
                    })
                    .catch(function (e) {})
                : K(e, t));
          }));
    }

    function U() {
      Q &&
        (H[Q] = {
          x: window.pageXOffset,
          y: window.pageYOffset,
        });
    }

    function W(e) {
      return X(e.x) || X(e.y);
    }

    function Y(e) {
      return {
        x: X(e.x) ? e.x : window.pageXOffset,
        y: X(e.y) ? e.y : window.pageYOffset,
      };
    }

    function X(e) {
      return "number" == typeof e;
    }

    function K(e, t) {
      var n,
        i,
        o,
        s,
        r,
        a,
        l,
        c = "object" == (void 0 === e ? "undefined" : _typeof2(e));
      c && "string" == typeof e.selector
        ? (i = document.querySelector(e.selector))
          ? ((o = e.offset && "object" == _typeof2(e.offset) ? e.offset : {}),
            (s = i),
            (r = o =
              {
                x: X((n = o).x) ? n.x : 0,
                y: X(n.y) ? n.y : 0,
              }),
            (a = document.documentElement.getBoundingClientRect()),
            (t = {
              x: (l = s.getBoundingClientRect()).left - a.left - r.x,
              y: l.top - a.top - r.y,
            }))
          : W(e) && (t = Y(e))
        : c && W(e) && (t = Y(e)),
        t && window.scrollTo(t.x, t.y);
    }
    var Z,
      G =
        v &&
        ((-1 === (Z = window.navigator.userAgent).indexOf("Android 2.") &&
          -1 === Z.indexOf("Android 4.0")) ||
          -1 === Z.indexOf("Mobile Safari") ||
          -1 !== Z.indexOf("Chrome") ||
          -1 !== Z.indexOf("Windows Phone")) &&
        window.history &&
        "pushState" in window.history,
      J =
        v && window.performance && window.performance.now
          ? window.performance
          : Date,
      Q = ee();

    function ee() {
      return J.now().toFixed(3);
    }

    function te(e, t) {
      U();
      var n = window.history;
      try {
        t
          ? n.replaceState(
              {
                key: Q,
              },
              "",
              e
            )
          : ((Q = ee()),
            n.pushState(
              {
                key: Q,
              },
              "",
              e
            ));
      } catch (n) {
        window.location[t ? "replace" : "assign"](e);
      }
    }

    function ne(e) {
      te(e, !0);
    }

    function ie(n, i, o) {
      !(function e(t) {
        t >= n.length
          ? o()
          : n[t]
          ? i(n[t], function () {
              e(t + 1);
            })
          : e(t + 1);
      })(0);
    }

    function oe(e, n) {
      return se(
        e.map(function (t) {
          return Object.keys(t.components).map(function (e) {
            return n(t.components[e], t.instances[e], t, e);
          });
        })
      );
    }

    function se(e) {
      return Array.prototype.concat.apply([], e);
    }
    var re =
      "function" == typeof Symbol && "symbol" == _typeof2(Symbol.toStringTag);

    function ae(n) {
      var i = !1;
      return function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        if (!i) return (i = !0), n.apply(this, e);
      };
    }

    function le(e, t) {
      var n, i;
      (this.router = e),
        (this.base =
          ("/" !==
            (n =
              (n = t) ||
              (v
                ? (n =
                    ((i = document.querySelector("base")) &&
                      i.getAttribute("href")) ||
                    "/").replace(/^https?:\/\/[^\/]+/, "")
                : "/")).charAt(0) && (n = "/" + n),
          n.replace(/\/$/, ""))),
        (this.current = c),
        (this.pending = null),
        (this.ready = !1),
        (this.readyCbs = []),
        (this.readyErrorCbs = []),
        (this.errorCbs = []);
    }

    function ce(e, a, l, t) {
      var n = oe(e, function (e, t, n, i) {
        var o,
          s,
          r =
            ((s = a),
            "function" != typeof (o = e) && (o = f.extend(o)),
            o.options[s]);
        if (r)
          return Array.isArray(r)
            ? r.map(function (e) {
                return l(e, t, n, i);
              })
            : l(r, t, n, i);
      });
      return se(t ? n.reverse() : n);
    }

    function ue(e, t) {
      if (t)
        return function () {
          return e.apply(t, arguments);
        };
    }
    (le.prototype.listen = function (e) {
      this.cb = e;
    }),
      (le.prototype.onReady = function (e, t) {
        this.ready
          ? e()
          : (this.readyCbs.push(e), t && this.readyErrorCbs.push(t));
      }),
      (le.prototype.onError = function (e) {
        this.errorCbs.push(e);
      }),
      (le.prototype.transitionTo = function (e, t, n) {
        var i = this,
          o = this.router.match(e, this.current);
        this.confirmTransition(
          o,
          function () {
            i.updateRoute(o),
              t && t(o),
              i.ensureURL(),
              i.ready ||
                ((i.ready = !0),
                i.readyCbs.forEach(function (e) {
                  e(o);
                }));
          },
          function (t) {
            n && n(t),
              t &&
                !i.ready &&
                ((i.ready = !0),
                i.readyErrorCbs.forEach(function (e) {
                  e(t);
                }));
          }
        );
      }),
      (le.prototype.confirmTransition = function (n, t, e) {
        function i(t) {
          p(t) &&
            (o.errorCbs.length
              ? o.errorCbs.forEach(function (e) {
                  e(t);
                })
              : console.error(t)),
            e && e(t);
        }
        var o = this,
          s = this.current;
        if (C(n, s) && n.matched.length === s.matched.length)
          return this.ensureURL(), i();
        var r,
          a = (function (e, t) {
            for (
              var n = Math.max(e.length, t.length), i = 0;
              i < n && e[i] === t[i];
              i++
            );
            return {
              updated: t.slice(0, i),
              activated: t.slice(i),
              deactivated: e.slice(i),
            };
          })(this.current.matched, n.matched),
          l = a.updated,
          c = a.deactivated,
          d = a.activated,
          u = [].concat(
            ce(c, "beforeRouteLeave", ue, !0),
            this.router.beforeHooks,
            ce(l, "beforeRouteUpdate", ue),
            d.map(function (e) {
              return e.beforeEnter;
            }),
            ((r = d),
            function (e, t, l) {
              var c = !1,
                u = 0,
                d = null;
              oe(r, function (t, e, n, i) {
                if ("function" == typeof t && void 0 === t.cid) {
                  (c = !0), u++;
                  var o,
                    s,
                    r = ae(function (e) {
                      (e.__esModule ||
                        (re && "Module" === e[Symbol.toStringTag])) &&
                        (e = e.default),
                        (t.resolved = "function" == typeof e ? e : f.extend(e)),
                        (n.components[i] = e),
                        --u <= 0 && l();
                    }),
                    a = ae(function (e) {
                      var t =
                        "Failed to resolve async component " + i + ": " + e;
                      d || ((d = p(e) ? e : new Error(t)), l(d));
                    });
                  try {
                    o = t(r, a);
                  } catch (e) {
                    a(e);
                  }
                  o &&
                    ("function" == typeof o.then
                      ? o.then(r, a)
                      : (s = o.component) &&
                        "function" == typeof s.then &&
                        s.then(r, a));
                }
              }),
                c || l();
            })
          );
        this.pending = n;

        function h(e, t) {
          if (o.pending !== n) return i();
          try {
            e(n, s, function (e) {
              !1 === e || p(e)
                ? (o.ensureURL(!0), i(e))
                : "string" == typeof e ||
                  ("object" == (void 0 === e ? "undefined" : _typeof2(e)) &&
                    ("string" == typeof e.path || "string" == typeof e.name))
                ? (i(),
                  "object" == (void 0 === e ? "undefined" : _typeof2(e)) &&
                  e.replace
                    ? o.replace(e)
                    : o.push(e))
                : t(e);
            });
          } catch (e) {
            i(e);
          }
        }
        ie(u, h, function () {
          var c,
            u,
            e = [];
          ie(
            ((c = e),
            (u = function () {
              return o.current === n;
            }),
            ce(d, "beforeRouteEnter", function (e, t, n, i) {
              return (
                (o = e),
                (s = n),
                (r = i),
                (a = c),
                (l = u),
                function (e, t, n) {
                  return o(e, t, function (e) {
                    "function" == typeof e &&
                      a.push(function () {
                        !(function e(t, n, i, o) {
                          n[i] && !n[i]._isBeingDestroyed
                            ? t(n[i])
                            : o() &&
                              setTimeout(function () {
                                e(t, n, i, o);
                              }, 16);
                        })(e, s.instances, r, l);
                      }),
                      n(e);
                  });
                }
              );
              var o, s, r, a, l;
            }).concat(o.router.resolveHooks)),
            h,
            function () {
              return o.pending !== n
                ? (i(), 0)
                : ((o.pending = null),
                  t(n),
                  void (
                    o.router.app &&
                    o.router.app.$nextTick(function () {
                      e.forEach(function (e) {
                        e();
                      });
                    })
                  ));
            }
          );
        });
      }),
      (le.prototype.updateRoute = function (t) {
        var n = this.current;
        (this.current = t),
          this.cb && this.cb(t),
          this.router.afterHooks.forEach(function (e) {
            e && e(t, n);
          });
      });
    var de,
      he =
        ((de = le) && (pe.__proto__ = de),
        (((pe.prototype = Object.create(de && de.prototype)).constructor =
          pe).prototype.go = function (e) {
          window.history.go(e);
        }),
        (pe.prototype.push = function (e, t, n) {
          var i = this,
            o = this.current;
          this.transitionTo(
            e,
            function (e) {
              te(b(i.base + e.fullPath)), q(i.router, e, o, !1), t && t(e);
            },
            n
          );
        }),
        (pe.prototype.replace = function (e, t, n) {
          var i = this,
            o = this.current;
          this.transitionTo(
            e,
            function (e) {
              ne(b(i.base + e.fullPath)), q(i.router, e, o, !1), t && t(e);
            },
            n
          );
        }),
        (pe.prototype.ensureURL = function (e) {
          fe(this.base) !== this.current.fullPath &&
            (e ? te : ne)(b(this.base + this.current.fullPath));
        }),
        (pe.prototype.getCurrentLocation = function () {
          return fe(this.base);
        }),
        pe);

    function pe(i, e) {
      var o = this;
      de.call(this, i, e);
      var t = i.options.scrollBehavior,
        s = G && t;
      s && V();
      var r = fe(this.base);
      window.addEventListener("popstate", function (e) {
        var t = o.current,
          n = fe(o.base);
        (o.current === c && n === r) ||
          o.transitionTo(n, function (e) {
            s && q(i, e, t, !0);
          });
      });
    }

    function fe(e) {
      var t = decodeURI(window.location.pathname);
      return (
        e && 0 === t.indexOf(e) && (t = t.slice(e.length)),
        (t || "/") + window.location.search + window.location.hash
      );
    }
    var me,
      ve =
        ((me = le) && (ge.__proto__ = me),
        (((ge.prototype = Object.create(me && me.prototype)).constructor =
          ge).prototype.setupListeners = function () {
          var n = this,
            e = this.router.options.scrollBehavior,
            i = G && e;
          i && V(),
            window.addEventListener(G ? "popstate" : "hashchange", function () {
              var t = n.current;
              be() &&
                n.transitionTo(ye(), function (e) {
                  i && q(n.router, e, t, !0), G || _e(e.fullPath);
                });
            });
        }),
        (ge.prototype.push = function (e, t, n) {
          var i = this,
            o = this.current;
          this.transitionTo(
            e,
            function (e) {
              we(e.fullPath), q(i.router, e, o, !1), t && t(e);
            },
            n
          );
        }),
        (ge.prototype.replace = function (e, t, n) {
          var i = this,
            o = this.current;
          this.transitionTo(
            e,
            function (e) {
              _e(e.fullPath), q(i.router, e, o, !1), t && t(e);
            },
            n
          );
        }),
        (ge.prototype.go = function (e) {
          window.history.go(e);
        }),
        (ge.prototype.ensureURL = function (e) {
          var t = this.current.fullPath;
          ye() !== t && (e ? we : _e)(t);
        }),
        (ge.prototype.getCurrentLocation = ye),
        ge);

    function ge(e, t, n) {
      var i, o;
      me.call(this, e, t),
        (n &&
          ((i = this.base),
          (o = fe(i)),
          !/^\/#/.test(o) && (window.location.replace(b(i + "/#" + o)), 1))) ||
          be();
    }

    function be() {
      var e = ye();
      return "/" === e.charAt(0) || (_e("/" + e), 0);
    }

    function ye() {
      var e = window.location.href,
        t = e.indexOf("#");
      if (t < 0) return "";
      var n,
        i = (e = e.slice(t + 1)).indexOf("?");
      return (
        i < 0
          ? (e =
              -1 < (n = e.indexOf("#"))
                ? decodeURI(e.slice(0, n)) + e.slice(n)
                : decodeURI(e))
          : -1 < i && (e = decodeURI(e.slice(0, i)) + e.slice(i)),
        e
      );
    }

    function ke(e) {
      var t = window.location.href,
        n = t.indexOf("#");
      return (0 <= n ? t.slice(0, n) : t) + "#" + e;
    }

    function we(e) {
      G ? te(ke(e)) : (window.location.hash = e);
    }

    function _e(e) {
      G ? ne(ke(e)) : window.location.replace(ke(e));
    }

    function xe(e) {
      void 0 === e && (e = {}),
        (this.app = null),
        (this.apps = []),
        (this.options = e),
        (this.beforeHooks = []),
        (this.resolveHooks = []),
        (this.afterHooks = []),
        (this.matcher = R(e.routes || [], this));
      var t = e.mode || "hash";
      switch (
        ((this.fallback = "history" === t && !G && !1 !== e.fallback),
        this.fallback && (t = "hash"),
        v || (t = "abstract"),
        (this.mode = t))
      ) {
        case "history":
          this.history = new he(this, e.base);
          break;
        case "hash":
          this.history = new ve(this, e.base, this.fallback);
          break;
        case "abstract":
          this.history = new Ce(this, e.base);
      }
    }
    var $e,
      Ce =
        (($e = le) && (Ae.__proto__ = $e),
        (((Ae.prototype = Object.create($e && $e.prototype)).constructor =
          Ae).prototype.push = function (e, t, n) {
          var i = this;
          this.transitionTo(
            e,
            function (e) {
              (i.stack = i.stack.slice(0, i.index + 1).concat(e)),
                i.index++,
                t && t(e);
            },
            n
          );
        }),
        (Ae.prototype.replace = function (e, t, n) {
          var i = this;
          this.transitionTo(
            e,
            function (e) {
              (i.stack = i.stack.slice(0, i.index).concat(e)), t && t(e);
            },
            n
          );
        }),
        (Ae.prototype.go = function (e) {
          var t,
            n = this,
            i = this.index + e;
          i < 0 ||
            i >= this.stack.length ||
            ((t = this.stack[i]),
            this.confirmTransition(t, function () {
              (n.index = i), n.updateRoute(t);
            }));
        }),
        (Ae.prototype.getCurrentLocation = function () {
          var e = this.stack[this.stack.length - 1];
          return e ? e.fullPath : "/";
        }),
        (Ae.prototype.ensureURL = function () {}),
        Ae),
      Se = {
        currentRoute: {
          configurable: !0,
        },
      };

    function Ae(e, t) {
      $e.call(this, e, t), (this.stack = []), (this.index = -1);
    }

    function Te(t, n) {
      return (
        t.push(n),
        function () {
          var e = t.indexOf(n);
          -1 < e && t.splice(e, 1);
        }
      );
    }
    return (
      (xe.prototype.match = function (e, t, n) {
        return this.matcher.match(e, t, n);
      }),
      (Se.currentRoute.get = function () {
        return this.history && this.history.current;
      }),
      (xe.prototype.init = function (t) {
        var e,
          n,
          i = this;
        this.apps.push(t),
          t.$once("hook:destroyed", function () {
            var e = i.apps.indexOf(t);
            -1 < e && i.apps.splice(e, 1),
              i.app === t && (i.app = i.apps[0] || null);
          }),
          this.app ||
            ((this.app = t),
            (e = this.history) instanceof he
              ? e.transitionTo(e.getCurrentLocation())
              : e instanceof ve &&
                ((n = function () {
                  e.setupListeners();
                }),
                e.transitionTo(e.getCurrentLocation(), n, n)),
            e.listen(function (t) {
              i.apps.forEach(function (e) {
                e._route = t;
              });
            }));
      }),
      (xe.prototype.beforeEach = function (e) {
        return Te(this.beforeHooks, e);
      }),
      (xe.prototype.beforeResolve = function (e) {
        return Te(this.resolveHooks, e);
      }),
      (xe.prototype.afterEach = function (e) {
        return Te(this.afterHooks, e);
      }),
      (xe.prototype.onReady = function (e, t) {
        this.history.onReady(e, t);
      }),
      (xe.prototype.onError = function (e) {
        this.history.onError(e);
      }),
      (xe.prototype.push = function (e, t, n) {
        this.history.push(e, t, n);
      }),
      (xe.prototype.replace = function (e, t, n) {
        this.history.replace(e, t, n);
      }),
      (xe.prototype.go = function (e) {
        this.history.go(e);
      }),
      (xe.prototype.back = function () {
        this.go(-1);
      }),
      (xe.prototype.forward = function () {
        this.go(1);
      }),
      (xe.prototype.getMatchedComponents = function (e) {
        var t = e ? (e.matched ? e : this.resolve(e).route) : this.currentRoute;
        return t
          ? [].concat.apply(
              [],
              t.matched.map(function (t) {
                return Object.keys(t.components).map(function (e) {
                  return t.components[e];
                });
              })
            )
          : [];
      }),
      (xe.prototype.resolve = function (e, t, n) {
        var i,
          o,
          s,
          r = B(e, (t = t || this.history.current), n, this),
          a = this.match(r, t),
          l = a.redirectedFrom || a.fullPath;
        return {
          location: r,
          route: a,
          href:
            ((i = this.history.base),
            (o = this.mode),
            (s = "hash" === o ? "#" + l : l),
            i ? b(i + "/" + s) : s),
          normalizedTo: r,
          resolved: a,
        };
      }),
      (xe.prototype.addRoutes = function (e) {
        this.matcher.addRoutes(e),
          this.history.current !== c &&
            this.history.transitionTo(this.history.getCurrentLocation());
      }),
      Object.defineProperties(xe.prototype, Se),
      (xe.install = function e(t) {
        var i, n, o;
        (e.installed && f === t) ||
          ((e.installed = !0),
          (i = function (e) {
            return void 0 !== e;
          }),
          (n = function (e, t) {
            var n = e.$options._parentVnode;
            i(n) &&
              i((n = n.data)) &&
              i((n = n.registerRouteInstance)) &&
              n(e, t);
          }),
          (f = t).mixin({
            beforeCreate: function () {
              i(this.$options.router)
                ? (((this._routerRoot = this)._router = this.$options.router),
                  this._router.init(this),
                  t.util.defineReactive(
                    this,
                    "_route",
                    this._router.history.current
                  ))
                : (this._routerRoot =
                    (this.$parent && this.$parent._routerRoot) || this),
                n(this, this);
            },
            destroyed: function () {
              n(this);
            },
          }),
          Object.defineProperty(t.prototype, "$router", {
            get: function () {
              return this._routerRoot._router;
            },
          }),
          Object.defineProperty(t.prototype, "$route", {
            get: function () {
              return this._routerRoot._route;
            },
          }),
          t.component("RouterView", s),
          t.component("RouterLink", m),
          ((o = t.config.optionMergeStrategies).beforeRouteEnter =
            o.beforeRouteLeave =
            o.beforeRouteUpdate =
              o.created));
      }),
      (xe.version = "3.0.7"),
      v && window.Vue && window.Vue.use(xe),
      xe
    );
  }),
  "object" ==
    ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) &&
  "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.VueRouter = e()),
  (window.number_format = format),
  setEventWrapper(window),
  setEventWrapper(document),
  "function" != typeof Object.assign &&
    Object.defineProperty(Object, "assign", {
      value: function (e) {
        "use strict";
        if (null == e)
          throw new TypeError("Cannot convert undefined or null to object");
        for (var t = Object(e), n = 1; n < arguments.length; n++) {
          var i = arguments[n];
          if (null != i)
            for (var o in i)
              Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
        }
        return t;
      },
      writable: !0,
      configurable: !0,
    }),
  (function () {
    function t(e) {
      return new RegExp("(^| )" + e + "( |$)");
    }

    function e(e, t, n) {
      for (var i = 0; i < e.length; i++) t.call(n, e[i]);
    }

    function n(e) {
      this.element = e;
    }
    (n.prototype = {
      add: function () {
        e(
          arguments,
          function (e) {
            this.contains(e) || (this.element.className += " " + e);
          },
          this
        );
      },
      remove: function () {
        e(
          arguments,
          function (e) {
            this.element.className = this.element.className.replace(t(e), "");
          },
          this
        );
      },
      toggle: function (e, t) {
        return (null == t && this.contains(e)) || t
          ? (this.remove(e), !1)
          : (this.add(e), !0);
      },
      contains: function (e) {
        return t(e).test(this.element.className);
      },
    }),
      "classList" in Element.prototype ||
        Object.defineProperty(Element.prototype, "classList", {
          get: function () {
            return new n(this);
          },
        }),
      window.DOMTokenList &&
        null == DOMTokenList.prototype.replace &&
        (DOMTokenList.prototype.replace = n.prototype.replace);
  })(),
  Element.prototype.matches ||
    (Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector),
  Element.prototype.closest ||
    (Element.prototype.closest = function (e) {
      var t = this;
      do {
        if (t.matches(e)) return t;
        t = t.parentElement || t.parentNode;
      } while (null !== t && 1 === t.nodeType);
      return null;
    }),
  Object.entries ||
    (Object.entries = function (e) {
      for (var t = Object.keys(e), n = t.length, i = new Array(n); n--; )
        i[n] = [t[n], e[t[n]]];
      return i;
    }),
  (function () {
    "use strict";
    var i, t, o, l;

    function s(e) {
      if (
        ("string" != typeof e && (e = e.toString()),
        /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))
      )
        throw new TypeError("Invalid character in header field name");
      return e.toLowerCase();
    }

    function r(e) {
      return "string" != typeof e && (e = e.toString()), e;
    }

    function c(t) {
      this.map = {};
      var n = this;
      t instanceof c
        ? t.forEach(function (t, e) {
            e.forEach(function (e) {
              n.append(t, e);
            });
          })
        : t &&
          Object.getOwnPropertyNames(t).forEach(function (e) {
            n.append(e, t[e]);
          });
    }

    function a(e) {
      if (e.bodyUsed)
        return fetch.Promise.reject(new TypeError("Already read"));
      e.bodyUsed = !0;
    }

    function u(n) {
      return new fetch.Promise(function (e, t) {
        (n.onload = function () {
          e(n.result);
        }),
          (n.onerror = function () {
            t(n.error);
          });
      });
    }

    function e(e) {
      var t = new FileReader();
      return t.readAsArrayBuffer(e), u(t);
    }

    function n() {
      return (
        (this.bodyUsed = !1),
        (this._initBody = function (e) {
          if ("string" == typeof (this._bodyInit = e)) this._bodyText = e;
          else if (i && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
          else if (t && FormData.prototype.isPrototypeOf(e))
            this._bodyFormData = e;
          else {
            if (e) throw new Error("unsupported BodyInit type");
            this._bodyText = "";
          }
        }),
        i
          ? ((this.blob = function () {
              var e = a(this);
              if (e) return e;
              if (this._bodyBlob) return fetch.Promise.resolve(this._bodyBlob);
              if (this._bodyFormData)
                throw new Error("could not read FormData body as blob");
              return fetch.Promise.resolve(new Blob([this._bodyText]));
            }),
            (this.arrayBuffer = function () {
              return this.blob().then(e);
            }),
            (this.text = function () {
              var e,
                t,
                n = a(this);
              if (n) return n;
              if (this._bodyBlob)
                return (
                  (e = this._bodyBlob),
                  (t = new FileReader()).readAsText(e),
                  u(t)
                );
              if (this._bodyFormData)
                throw new Error("could not read FormData body as text");
              return fetch.Promise.resolve(this._bodyText);
            }))
          : (this.text = function () {
              var e = a(this);
              return e || fetch.Promise.resolve(this._bodyText);
            }),
        t &&
          (this.formData = function () {
            return this.text().then(h);
          }),
        (this.json = function () {
          return this.text().then(function (e) {
            return JSON.parse(e);
          });
        }),
        this
      );
    }

    function d(e, t) {
      var n, i;
      if (
        ((t = t || {}),
        (this.url = e),
        (this.credentials = t.credentials || "omit"),
        (this.headers = new c(t.headers)),
        (this.method =
          ((n = t.method || "GET"),
          (i = n.toUpperCase()),
          -1 < o.indexOf(i) ? i : n)),
        (this.mode = t.mode || null),
        (this.referrer = null),
        ("GET" === this.method || "HEAD" === this.method) && t.body)
      )
        throw new TypeError("Body not allowed for GET or HEAD requests");
      this._initBody(t.body);
    }

    function h(e) {
      var o = new FormData();
      return (
        e
          .trim()
          .split("&")
          .forEach(function (e) {
            var t, n, i;
            e &&
              ((n = (t = e.split("=")).shift().replace(/\+/g, " ")),
              (i = t.join("=").replace(/\+/g, " ")),
              o.append(decodeURIComponent(n), decodeURIComponent(i)));
          }),
        o
      );
    }

    function p(e, t) {
      (t = t || {}),
        this._initBody(e),
        (this.type = "default"),
        (this.url = null),
        (this.status = t.status),
        (this.ok = 200 <= this.status && this.status < 300),
        (this.statusText = t.statusText),
        (this.headers = t.headers instanceof c ? t.headers : new c(t.headers)),
        (this.url = t.url || "");
    }
    self.fetch ||
      ((c.prototype.append = function (e, t) {
        (e = s(e)), (t = r(t));
        var n = this.map[e];
        n || ((n = []), (this.map[e] = n)), n.push(t);
      }),
      (c.prototype.delete = function (e) {
        delete this.map[s(e)];
      }),
      (c.prototype.get = function (e) {
        var t = this.map[s(e)];
        return t ? t[0] : null;
      }),
      (c.prototype.getAll = function (e) {
        return this.map[s(e)] || [];
      }),
      (c.prototype.has = function (e) {
        return this.map.hasOwnProperty(s(e));
      }),
      (c.prototype.set = function (e, t) {
        this.map[s(e)] = [r(t)];
      }),
      (c.prototype.forEach = function (t) {
        var n = this;
        Object.getOwnPropertyNames(this.map).forEach(function (e) {
          t(e, n.map[e]);
        });
      }),
      (i =
        "FileReader" in self &&
        "Blob" in self &&
        (function () {
          try {
            return new Blob(), !0;
          } catch (e) {
            return !1;
          }
        })()),
      (t = "FormData" in self),
      (o = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"]),
      (l = !(
        "undefined" == typeof window ||
        !window.ActiveXObject ||
        (window.XMLHttpRequest && new XMLHttpRequest().dispatchEvent)
      )),
      n.call(d.prototype),
      n.call(p.prototype),
      (self.Headers = c),
      (self.Request = d),
      (self.Response = p),
      (self.fetch = function (e, t) {
        var n = d.prototype.isPrototypeOf(e) && !t ? e : new d(e, t);
        return new fetch.Promise(function (s, r) {
          var a = (function () {
            return l &&
              !/^(get|post|head|put|delete|options)$/i.test(this.method)
              ? ((this.usingActiveXhr = !0),
                new ActiveXObject("Microsoft.XMLHTTP"))
              : new XMLHttpRequest();
          })();

          function e() {
            var e, t, n, o, i;
            4 === a.readyState &&
              ((e = 1223 === a.status ? 204 : a.status) < 100 || 599 < e
                ? r(new TypeError("Network request failed"))
                : ((t = {
                    status: e,
                    statusText: a.statusText,
                    headers:
                      ((n = a),
                      (o = new c()),
                      n
                        .getAllResponseHeaders()
                        .trim()
                        .split("\n")
                        .forEach(function (e) {
                          var t = e.trim().split(":"),
                            n = t.shift().trim(),
                            i = t.join(":").trim();
                          o.append(n, i);
                        }),
                      o),
                    url:
                      "responseURL" in a
                        ? a.responseURL
                        : /^X-Request-URL:/m.test(a.getAllResponseHeaders())
                        ? a.getResponseHeader("X-Request-URL")
                        : void 0,
                  }),
                  (i = "response" in a ? a.response : a.responseText),
                  s(new p(i, t))));
          }
          "cors" === n.credentials && (a.withCredentials = !0),
            (a.onreadystatechange = e),
            self.usingActiveXhr ||
              ((a.onload = e),
              (a.onerror = function () {
                r(new TypeError("Network request failed"));
              })),
            a.open(n.method, n.url, !0),
            "responseType" in a && i && (a.responseType = "blob"),
            n.headers.forEach(function (t, e) {
              e.forEach(function (e) {
                a.setRequestHeader(t, e);
              });
            }),
            a.send(void 0 === n._bodyInit ? null : n._bodyInit);
        });
      }),
      (fetch.Promise = self.Promise),
      (self.fetch.polyfill = !0));
  })(),
  Array.isArray ||
    (Array.isArray = function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    }),
  Object.values ||
    (Object.values = function (t) {
      return Object.keys(t).map(function (e) {
        return t[e];
      });
    }),
  (function (e) {
    var t,
      n = e.Promise,
      i =
        n &&
        "resolve" in n &&
        "reject" in n &&
        "all" in n &&
        "race" in n &&
        (new n(function (e) {
          t = e;
        }),
        "function" == typeof t);
    "undefined" != typeof exports && exports
      ? ((exports.Promise = i ? n : $), (exports.Polyfill = $))
      : "function" == typeof define && define.amd
      ? define(function () {
          return i ? n : $;
        })
      : i || (e.Promise = $);

    function o() {}
    var s = "pending",
      r = "sealed",
      a = "fulfilled",
      l = "rejected";

    function c(e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    }
    var u,
      d = "undefined" != typeof setImmediate ? setImmediate : setTimeout,
      h = [];

    function p() {
      for (var e = 0; e < h.length; e++) h[e][0](h[e][1]);
      u = !(h = []);
    }

    function f(e, t) {
      h.push([e, t]), u || ((u = !0), d(p, 0));
    }

    function m(e, t) {
      function n(e) {
        k(t, e);
      }
      try {
        e(function (e) {
          b(t, e);
        }, n);
      } catch (e) {
        n(e);
      }
    }

    function v(e) {
      var t = e.owner,
        n = t.state_,
        i = t.data_,
        o = e[n],
        s = e.then;
      if ("function" == typeof o) {
        n = a;
        try {
          i = o(i);
        } catch (e) {
          k(s, e);
        }
      }
      g(s, i) || (n === a && b(s, i), n === l && k(s, i));
    }

    function g(t, n) {
      var i;
      try {
        if (t === n)
          throw new TypeError(
            "A promises callback cannot return that same promise."
          );
        if (
          n &&
          ("function" == typeof n ||
            "object" === (void 0 === n ? "undefined" : _typeof2(n)))
        ) {
          var e = n.then;
          if ("function" == typeof e)
            return (
              e.call(
                n,
                function (e) {
                  i || ((i = !0), (n !== e ? b : y)(t, e));
                },
                function (e) {
                  i || ((i = !0), k(t, e));
                }
              ),
              1
            );
        }
      } catch (e) {
        return i || k(t, e), 1;
      }
    }

    function b(e, t) {
      (e !== t && g(e, t)) || y(e, t);
    }

    function y(e, t) {
      e.state_ === s && ((e.state_ = r), (e.data_ = t), f(_, e));
    }

    function k(e, t) {
      e.state_ === s && ((e.state_ = r), (e.data_ = t), f(x, e));
    }

    function w(e) {
      var t = e.then_;
      e.then_ = void 0;
      for (var n = 0; n < t.length; n++) v(t[n]);
    }

    function _(e) {
      (e.state_ = a), w(e);
    }

    function x(e) {
      (e.state_ = l), w(e);
    }

    function $(e) {
      if ("function" != typeof e)
        throw new TypeError("Promise constructor takes a function argument");
      if (this instanceof $ == !1)
        throw new TypeError(
          "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
        );
      (this.then_ = []), m(e, this);
    }
    ($.prototype = {
      constructor: $,
      state_: s,
      then_: null,
      data_: void 0,
      then: function (e, t) {
        var n = {
          owner: this,
          then: new this.constructor(o),
          fulfilled: e,
          rejected: t,
        };
        return (
          this.state_ === a || this.state_ === l ? f(v, n) : this.then_.push(n),
          n.then
        );
      },
      catch: function (e) {
        return this.then(null, e);
      },
    }),
      ($.all = function (r) {
        if (!c(r))
          throw new TypeError("You must pass an array to Promise.all().");
        return new this(function (n, e) {
          var i = [],
            o = 0;
          for (var t, s = 0; s < r.length; s++)
            (t = r[s]) && "function" == typeof t.then
              ? t.then(
                  (function (t) {
                    return (
                      o++,
                      function (e) {
                        (i[t] = e), --o || n(i);
                      }
                    );
                  })(s),
                  e
                )
              : (i[s] = t);
          o || n(i);
        });
      }),
      ($.race = function (o) {
        if (!c(o))
          throw new TypeError("You must pass an array to Promise.race().");
        return new this(function (e, t) {
          for (var n, i = 0; i < o.length; i++)
            (n = o[i]) && "function" == typeof n.then ? n.then(e, t) : e(n);
        });
      }),
      ($.resolve = function (t) {
        return t &&
          "object" === (void 0 === t ? "undefined" : _typeof2(t)) &&
          t.constructor === this
          ? t
          : new this(function (e) {
              e(t);
            });
      }),
      ($.reject = function (n) {
        return new this(function (e, t) {
          t(n);
        });
      });
  })(
    "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
  ),
  (window.$events = {
    events: {},
    stack: {},
    on: function (e, t, n) {
      var i = 2 < arguments.length && void 0 !== n && n;
      return (
        null == this.events[e] && (this.events[e] = []),
        this.events[e].push(t),
        i &&
          null != this.stack[e] &&
          _.each(this.stack[e], function (e) {
            t(null, e);
          }),
        window.$events
      );
    },
    one: function (t, n) {
      var i = this;
      return (
        this.on(t, function e() {
          n(), i.off(t, e);
        }),
        window.$events
      );
    },
    off: function (e, t) {
      if (t) {
        if (null != this.events[e])
          for (var n = this.events[e].length - 1; 0 <= n; n--)
            if (this.events[e][n] === t) {
              this.events[e].splice(n, 1);
              break;
            }
      } else delete this.events[e];
      return window.$events;
    },
    fire: function (e, t, n) {
      var i = 2 < arguments.length && void 0 !== n && n;
      if (null != this.events[e])
        for (
          var o = _.map(this.events[e], function (e) {
              return e;
            }),
            s = 0;
          s < o.length;
          s++
        )
          o[s](null, t);
      return (
        i &&
          (null == this.stack[e] && (this.stack[e] = []),
          this.stack[e].push(t)),
        window.$events
      );
    },
  }),
  (function (s, a, d) {
    "use strict";

    function l(e, t, n) {
      return setTimeout(o(e, n), t);
    }

    function i(e, t, n) {
      return Array.isArray(e) && (r(e, n[t], n), 1);
    }

    function r(e, t, n) {
      var i;
      if (e)
        if (e.forEach) e.forEach(t, n);
        else if (e.length !== d)
          for (i = 0; i < e.length; ) t.call(n, e[i], i, e), i++;
        else for (i in e) e.hasOwnProperty(i) && t.call(n, e[i], i, e);
    }

    function e(i, e, t) {
      var o = "DEPRECATED METHOD: " + e + "\n" + t + " AT \n";
      return function () {
        var e = new Error("get-stack-trace"),
          t =
            e && e.stack
              ? e.stack
                  .replace(/^[^\(]+?[\n$]/gm, "")
                  .replace(/^\s+at\s+/gm, "")
                  .replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@")
              : "Unknown Stack Trace",
          n = s.console && (s.console.warn || s.console.log);
        return n && n.call(s.console, o, t), i.apply(this, arguments);
      };
    }

    function t(e, t, n) {
      var i = t.prototype,
        o = (e.prototype = Object.create(i));
      (o.constructor = e), (o._super = i), n && ne(o, n);
    }

    function o(e, t) {
      return function () {
        return e.apply(t, arguments);
      };
    }

    function c(e, t) {
      return (void 0 === e ? "undefined" : _typeof2(e)) == J
        ? e.apply((t && t[0]) || d, t)
        : e;
    }

    function n(e, t) {
      return e === d ? t : e;
    }

    function u(t, e, n) {
      r(m(e), function (e) {
        t.addEventListener(e, n, !1);
      });
    }

    function h(t, e, n) {
      r(m(e), function (e) {
        t.removeEventListener(e, n, !1);
      });
    }

    function p(e, t) {
      for (; e; ) {
        if (e == t) return !0;
        e = e.parentNode;
      }
      return !1;
    }

    function f(e, t) {
      return -1 < e.indexOf(t);
    }

    function m(e) {
      return e.trim().split(/\s+/g);
    }

    function v(e, t, n) {
      if (e.indexOf && !n) return e.indexOf(t);
      for (var i = 0; i < e.length; ) {
        if ((n && e[i][n] == t) || (!n && e[i] === t)) return i;
        i++;
      }
      return -1;
    }

    function g(e) {
      return Array.prototype.slice.call(e, 0);
    }

    function b(e, n, t) {
      for (var i = [], o = [], s = 0; s < e.length; ) {
        var r = n ? e[s][n] : e[s];
        v(o, r) < 0 && i.push(e[s]), (o[s] = r), s++;
      }
      return (
        t &&
          (i = n
            ? i.sort(function (e, t) {
                return e[n] > t[n];
              })
            : i.sort()),
        i
      );
    }

    function y(e, t) {
      for (
        var n, i, o = t[0].toUpperCase() + t.slice(1), s = 0;
        s < Z.length;

      ) {
        if ((i = (n = Z[s]) ? n + o : t) in e) return i;
        s++;
      }
      return d;
    }

    function k(e) {
      var t = e.ownerDocument || e;
      return t.defaultView || t.parentWindow || s;
    }

    function w(t, e) {
      var n = this;
      (this.manager = t),
        (this.callback = e),
        (this.element = t.element),
        (this.target = t.options.inputTarget),
        (this.domHandler = function (e) {
          c(t.options.enable, [t]) && n.handler(e);
        }),
        this.init();
    }

    function _(e, t, n) {
      var i = n.pointers.length,
        o = n.changedPointers.length,
        s = t & de && i - o == 0,
        r = t & (he | pe) && i - o == 0;
      (n.isFirst = !!s),
        (n.isFinal = !!r),
        s && (e.session = {}),
        (n.eventType = t),
        (function (e, t) {
          var n = e.session,
            i = t.pointers,
            o = i.length;
          n.firstInput || (n.firstInput = x(t)),
            1 < o && !n.firstMultiple
              ? (n.firstMultiple = x(t))
              : 1 === o && (n.firstMultiple = !1);
          var s = n.firstInput,
            r = n.firstMultiple,
            a = r ? r.center : s.center,
            l = (t.center = $(i));
          (t.timeStamp = te()),
            (t.deltaTime = t.timeStamp - s.timeStamp),
            (t.angle = T(a, l)),
            (t.distance = A(a, l)),
            (function (e, t) {
              var n = t.center,
                i = e.offsetDelta || {},
                o = e.prevDelta || {},
                s = e.prevInput || {};
              (t.eventType !== de && s.eventType !== he) ||
                ((o = e.prevDelta =
                  {
                    x: s.deltaX || 0,
                    y: s.deltaY || 0,
                  }),
                (i = e.offsetDelta =
                  {
                    x: n.x,
                    y: n.y,
                  })),
                (t.deltaX = o.x + (n.x - i.x)),
                (t.deltaY = o.y + (n.y - i.y));
            })(n, t),
            (t.offsetDirection = S(t.deltaX, t.deltaY));
          var c = C(t.deltaTime, t.deltaX, t.deltaY);
          (t.overallVelocityX = c.x),
            (t.overallVelocityY = c.y),
            (t.overallVelocity = ee(c.x) > ee(c.y) ? c.x : c.y),
            (t.scale = r
              ? (function (e, t) {
                  return A(t[0], t[1], xe) / A(e[0], e[1], xe);
                })(r.pointers, i)
              : 1),
            (t.rotation = r
              ? (function (e, t) {
                  return T(t[1], t[0], xe) + T(e[1], e[0], xe);
                })(r.pointers, i)
              : 0),
            (t.maxPointers =
              !n.prevInput || t.pointers.length > n.prevInput.maxPointers
                ? t.pointers.length
                : n.prevInput.maxPointers),
            (function (e, t) {
              var n,
                i,
                o,
                s,
                r = e.lastInterval || t,
                a = t.timeStamp - r.timeStamp;
              {
                var l, c, u;
                t.eventType != pe && (ue < a || r.velocity === d)
                  ? ((l = t.deltaX - r.deltaX),
                    (c = t.deltaY - r.deltaY),
                    (u = C(a, l, c)),
                    (i = u.x),
                    (o = u.y),
                    (n = ee(u.x) > ee(u.y) ? u.x : u.y),
                    (s = S(l, c)),
                    (e.lastInterval = t))
                  : ((n = r.velocity),
                    (i = r.velocityX),
                    (o = r.velocityY),
                    (s = r.direction));
              }
              (t.velocity = n),
                (t.velocityX = i),
                (t.velocityY = o),
                (t.direction = s);
            })(n, t);
          var u = e.element;
          p(t.srcEvent.target, u) && (u = t.srcEvent.target), (t.target = u);
        })(e, n),
        e.emit("hammer.input", n),
        e.recognize(n),
        (e.session.prevInput = n);
    }

    function x(e) {
      for (var t = [], n = 0; n < e.pointers.length; )
        (t[n] = {
          clientX: Q(e.pointers[n].clientX),
          clientY: Q(e.pointers[n].clientY),
        }),
          n++;
      return {
        timeStamp: te(),
        pointers: t,
        center: $(t),
        deltaX: e.deltaX,
        deltaY: e.deltaY,
      };
    }

    function $(e) {
      var t = e.length;
      if (1 === t)
        return {
          x: Q(e[0].clientX),
          y: Q(e[0].clientY),
        };
      for (var n = 0, i = 0, o = 0; o < t; )
        (n += e[o].clientX), (i += e[o].clientY), o++;
      return {
        x: Q(n / t),
        y: Q(i / t),
      };
    }

    function C(e, t, n) {
      return {
        x: t / e || 0,
        y: n / e || 0,
      };
    }

    function S(e, t) {
      return e === t
        ? fe
        : ee(e) >= ee(t)
        ? e < 0
          ? me
          : ve
        : t < 0
        ? ge
        : be;
    }

    function A(e, t, n) {
      var i = t[(n = n || _e)[0]] - e[n[0]],
        o = t[n[1]] - e[n[1]];
      return Math.sqrt(i * i + o * o);
    }

    function T(e, t, n) {
      var i = t[(n = n || _e)[0]] - e[n[0]],
        o = t[n[1]] - e[n[1]];
      return (180 * Math.atan2(o, i)) / Math.PI;
    }

    function O() {
      (this.evEl = Ce),
        (this.evWin = Se),
        (this.pressed = !1),
        w.apply(this, arguments);
    }

    function F() {
      (this.evEl = Oe),
        (this.evWin = Fe),
        w.apply(this, arguments),
        (this.store = this.manager.session.pointerEvents = []);
    }

    function D() {
      (this.evTarget = "touchstart"),
        (this.evWin = "touchstart touchmove touchend touchcancel"),
        (this.started = !1),
        w.apply(this, arguments);
    }

    function z() {
      (this.evTarget = Me), (this.targetIds = {}), w.apply(this, arguments);
    }

    function M() {
      w.apply(this, arguments);
      var e = o(this.handler, this);
      (this.touch = new z(this.manager, e)),
        (this.mouse = new O(this.manager, e)),
        (this.primaryTouch = null),
        (this.lastTouches = []);
    }

    function E(e) {
      var t,
        n,
        i = e.changedPointers[0];
      i.identifier === this.primaryTouch &&
        ((t = {
          x: i.clientX,
          y: i.clientY,
        }),
        this.lastTouches.push(t),
        (n = this.lastTouches),
        setTimeout(function () {
          var e = n.indexOf(t);
          -1 < e && n.splice(e, 1);
        }, Ee));
    }

    function I(e, t) {
      (this.manager = e), this.set(t);
    }

    function j(e) {
      (this.options = ne({}, this.defaults, e || {})),
        (this.id = se++),
        (this.manager = null),
        (this.options.enable = n(this.options.enable, !0)),
        (this.state = He),
        (this.simultaneous = {}),
        (this.requireFail = []);
    }

    function L(e) {
      return 16 & e
        ? "cancel"
        : 8 & e
        ? "end"
        : 4 & e
        ? "move"
        : 2 & e
        ? "start"
        : "";
    }

    function P(e) {
      return e == be
        ? "down"
        : e == ge
        ? "up"
        : e == me
        ? "left"
        : e == ve
        ? "right"
        : "";
    }

    function N(e, t) {
      var n = t.manager;
      return n ? n.get(e) : e;
    }

    function B() {
      j.apply(this, arguments);
    }

    function R() {
      B.apply(this, arguments), (this.pX = null), (this.pY = null);
    }

    function H() {
      B.apply(this, arguments);
    }

    function V() {
      j.apply(this, arguments), (this._timer = null), (this._input = null);
    }

    function q() {
      B.apply(this, arguments);
    }

    function U() {
      B.apply(this, arguments);
    }

    function W() {
      j.apply(this, arguments),
        (this.pTime = !1),
        (this.pCenter = !1),
        (this._timer = null),
        (this._input = null),
        (this.count = 0);
    }

    function Y(e, t) {
      return (
        ((t = t || {}).recognizers = n(t.recognizers, Y.defaults.preset)),
        new X(e, t)
      );
    }

    function X(e, t) {
      var n;
      (this.options = ne({}, Y.defaults, t || {})),
        (this.options.inputTarget = this.options.inputTarget || e),
        (this.handlers = {}),
        (this.session = {}),
        (this.recognizers = []),
        (this.oldCssProps = {}),
        (this.element = e),
        (this.input = new ((n = this).options.inputClass ||
          (ae ? F : le ? z : re ? M : O))(n, _)),
        (this.touchAction = new I(this, this.options.touchAction)),
        K(this, !0),
        r(
          this.options.recognizers,
          function (e) {
            var t = this.add(new e[0](e[1]));
            e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3]);
          },
          this
        );
    }

    function K(n, i) {
      var o,
        s = n.element;
      s.style &&
        (r(n.options.cssProps, function (e, t) {
          (o = y(s.style, t)),
            i
              ? ((n.oldCssProps[o] = s.style[o]), (s.style[o] = e))
              : (s.style[o] = n.oldCssProps[o] || "");
        }),
        i || (n.oldCssProps = {}));
    }
    var Z = ["", "webkit", "Moz", "MS", "ms", "o"],
      G = a.createElement("div"),
      J = "function",
      Q = Math.round,
      ee = Math.abs,
      te = Date.now,
      ne =
        "function" != typeof Object.assign
          ? function (e) {
              if (e === d || null === e)
                throw new TypeError(
                  "Cannot convert undefined or null to object"
                );
              for (var t = Object(e), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (i !== d && null !== i)
                  for (var o in i) i.hasOwnProperty(o) && (t[o] = i[o]);
              }
              return t;
            }
          : Object.assign,
      ie = e(
        function (e, t, n) {
          for (var i = Object.keys(t), o = 0; o < i.length; )
            (!n || (n && e[i[o]] === d)) && (e[i[o]] = t[i[o]]), o++;
          return e;
        },
        "extend",
        "Use `assign`."
      ),
      oe = e(
        function (e, t) {
          return ie(e, t, !0);
        },
        "merge",
        "Use `assign`."
      ),
      se = 1,
      re = "ontouchstart" in s,
      ae = y(s, "PointerEvent") !== d,
      le =
        re && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
      ce = "touch",
      ue = 25,
      de = 1,
      he = 4,
      pe = 8,
      fe = 1,
      me = 2,
      ve = 4,
      ge = 8,
      be = 16,
      ye = me | ve,
      ke = ge | be,
      we = ye | ke,
      _e = ["x", "y"],
      xe = ["clientX", "clientY"];
    w.prototype = {
      handler: function () {},
      init: function () {
        this.evEl && u(this.element, this.evEl, this.domHandler),
          this.evTarget && u(this.target, this.evTarget, this.domHandler),
          this.evWin && u(k(this.element), this.evWin, this.domHandler);
      },
      destroy: function () {
        this.evEl && h(this.element, this.evEl, this.domHandler),
          this.evTarget && h(this.target, this.evTarget, this.domHandler),
          this.evWin && h(k(this.element), this.evWin, this.domHandler);
      },
    };
    var $e = {
        mousedown: de,
        mousemove: 2,
        mouseup: he,
      },
      Ce = "mousedown",
      Se = "mousemove mouseup";
    t(O, w, {
      handler: function (e) {
        var t = $e[e.type];
        t & de && 0 === e.button && (this.pressed = !0),
          2 & t && 1 !== e.which && (t = he),
          this.pressed &&
            (t & he && (this.pressed = !1),
            this.callback(this.manager, t, {
              pointers: [e],
              changedPointers: [e],
              pointerType: "mouse",
              srcEvent: e,
            }));
      },
    });
    var Ae = {
        pointerdown: de,
        pointermove: 2,
        pointerup: he,
        pointercancel: pe,
        pointerout: pe,
      },
      Te = {
        2: ce,
        3: "pen",
        4: "mouse",
        5: "kinect",
      },
      Oe = "pointerdown",
      Fe = "pointermove pointerup pointercancel";
    s.MSPointerEvent &&
      !s.PointerEvent &&
      ((Oe = "MSPointerDown"),
      (Fe = "MSPointerMove MSPointerUp MSPointerCancel")),
      t(F, w, {
        handler: function (e) {
          var t = this.store,
            n = !1,
            i = e.type.toLowerCase().replace("ms", ""),
            o = Ae[i],
            s = Te[e.pointerType] || e.pointerType,
            r = s == ce,
            a = v(t, e.pointerId, "pointerId");
          o & de && (0 === e.button || r)
            ? a < 0 && (t.push(e), (a = t.length - 1))
            : o & (he | pe) && (n = !0),
            a < 0 ||
              ((t[a] = e),
              this.callback(this.manager, o, {
                pointers: t,
                changedPointers: [e],
                pointerType: s,
                srcEvent: e,
              }),
              n && t.splice(a, 1));
        },
      });
    var De = {
      touchstart: de,
      touchmove: 2,
      touchend: he,
      touchcancel: pe,
    };
    t(D, w, {
      handler: function (e) {
        var t,
          n = De[e.type];
        n === de && (this.started = !0),
          this.started &&
            ((t = function (e, t) {
              var n = g(e.touches),
                i = g(e.changedTouches);
              return (
                t & (he | pe) && (n = b(n.concat(i), "identifier", !0)), [n, i]
              );
            }.call(this, e, n)),
            n & (he | pe) &&
              t[0].length - t[1].length == 0 &&
              (this.started = !1),
            this.callback(this.manager, n, {
              pointers: t[0],
              changedPointers: t[1],
              pointerType: ce,
              srcEvent: e,
            }));
      },
    });
    var ze = {
        touchstart: de,
        touchmove: 2,
        touchend: he,
        touchcancel: pe,
      },
      Me = "touchstart touchmove touchend touchcancel";
    t(z, w, {
      handler: function (e) {
        var t = ze[e.type],
          n = function (e, t) {
            var n = g(e.touches),
              i = this.targetIds;
            if (t & (2 | de) && 1 === n.length)
              return (i[n[0].identifier] = !0), [n, n];
            var o,
              s = g(e.changedTouches),
              r = [],
              a = this.target,
              l = n.filter(function (e) {
                return p(e.target, a);
              });
            if (t === de)
              for (o = 0; o < l.length; ) (i[l[o].identifier] = !0), o++;
            for (o = 0; o < s.length; )
              i[s[o].identifier] && r.push(s[o]),
                t & (he | pe) && delete i[s[o].identifier],
                o++;
            return r.length ? [b(l.concat(r), "identifier", !0), r] : void 0;
          }.call(this, e, t);
        n &&
          this.callback(this.manager, t, {
            pointers: n[0],
            changedPointers: n[1],
            pointerType: ce,
            srcEvent: e,
          });
      },
    });
    var Ee = 2500;
    t(M, w, {
      handler: function (e, t, n) {
        var i = n.pointerType == ce,
          o = "mouse" == n.pointerType;
        if (
          !(o && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)
        ) {
          if (i)
            (function (e, t) {
              e & de
                ? ((this.primaryTouch = t.changedPointers[0].identifier),
                  E.call(this, t))
                : e & (he | pe) && E.call(this, t);
            }).call(this, t, n);
          else if (
            o &&
            function (e) {
              for (
                var t = e.srcEvent.clientX, n = e.srcEvent.clientY, i = 0;
                i < this.lastTouches.length;
                i++
              ) {
                var o = this.lastTouches[i],
                  s = Math.abs(t - o.x),
                  r = Math.abs(n - o.y);
                if (s <= 25 && r <= 25) return !0;
              }
              return !1;
            }.call(this, n)
          )
            return;
          this.callback(e, t, n);
        }
      },
      destroy: function () {
        this.touch.destroy(), this.mouse.destroy();
      },
    });
    var Ie = y(G.style, "touchAction"),
      je = Ie !== d,
      Le = "manipulation",
      Pe = "none",
      Ne = "pan-x",
      Be = "pan-y",
      Re = (function () {
        if (!je) return !1;
        var t = {},
          n = s.CSS && s.CSS.supports;
        return (
          [
            "auto",
            "manipulation",
            "pan-y",
            "pan-x",
            "pan-x pan-y",
            "none",
          ].forEach(function (e) {
            t[e] = !n || s.CSS.supports("touch-action", e);
          }),
          t
        );
      })();
    I.prototype = {
      set: function (e) {
        "compute" == e && (e = this.compute()),
          je &&
            this.manager.element.style &&
            Re[e] &&
            (this.manager.element.style[Ie] = e),
          (this.actions = e.toLowerCase().trim());
      },
      update: function () {
        this.set(this.manager.options.touchAction);
      },
      compute: function () {
        var t = [];
        return (
          r(this.manager.recognizers, function (e) {
            c(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()));
          }),
          (function (e) {
            if (f(e, Pe)) return Pe;
            var t = f(e, Ne),
              n = f(e, Be);
            return t && n
              ? Pe
              : t || n
              ? t
                ? Ne
                : Be
              : f(e, Le)
              ? Le
              : "auto";
          })(t.join(" "))
        );
      },
      preventDefaults: function (e) {
        var t = e.srcEvent,
          n = e.offsetDirection;
        if (!this.manager.session.prevented) {
          var i = this.actions,
            o = f(i, Pe) && !Re.none,
            s = f(i, Be) && !Re[Be],
            r = f(i, Ne) && !Re[Ne];
          if (o) {
            var a = 1 === e.pointers.length,
              l = e.distance < 2,
              c = e.deltaTime < 250;
            if (a && l && c) return;
          }
          return (!r || !s) && (o || (s && n & ye) || (r && n & ke))
            ? this.preventSrc(t)
            : void 0;
        }
        t.preventDefault();
      },
      preventSrc: function (e) {
        (this.manager.session.prevented = !0), e.preventDefault();
      },
    };
    var He = 1;
    (j.prototype = {
      defaults: {},
      set: function (e) {
        return (
          ne(this.options, e),
          this.manager && this.manager.touchAction.update(),
          this
        );
      },
      recognizeWith: function (e) {
        if (i(e, "recognizeWith", this)) return this;
        var t = this.simultaneous;
        return (
          t[(e = N(e, this)).id] || (t[e.id] = e).recognizeWith(this), this
        );
      },
      dropRecognizeWith: function (e) {
        return (
          i(e, "dropRecognizeWith", this) ||
            ((e = N(e, this)), delete this.simultaneous[e.id]),
          this
        );
      },
      requireFailure: function (e) {
        if (i(e, "requireFailure", this)) return this;
        var t = this.requireFail;
        return (
          -1 === v(t, (e = N(e, this))) && (t.push(e), e.requireFailure(this)),
          this
        );
      },
      dropRequireFailure: function (e) {
        if (i(e, "dropRequireFailure", this)) return this;
        e = N(e, this);
        var t = v(this.requireFail, e);
        return -1 < t && this.requireFail.splice(t, 1), this;
      },
      hasRequireFailures: function () {
        return 0 < this.requireFail.length;
      },
      canRecognizeWith: function (e) {
        return !!this.simultaneous[e.id];
      },
      emit: function (t) {
        function e(e) {
          n.manager.emit(e, t);
        }
        var n = this,
          i = this.state;
        i < 8 && e(n.options.event + L(i)),
          e(n.options.event),
          t.additionalEvent && e(t.additionalEvent),
          8 <= i && e(n.options.event + L(i));
      },
      tryEmit: function (e) {
        return this.canEmit() ? this.emit(e) : void (this.state = 32);
      },
      canEmit: function () {
        for (var e = 0; e < this.requireFail.length; ) {
          if (!(this.requireFail[e].state & (32 | He))) return !1;
          e++;
        }
        return !0;
      },
      recognize: function (e) {
        var t = ne({}, e);
        return c(this.options.enable, [this, t])
          ? (56 & this.state && (this.state = He),
            (this.state = this.process(t)),
            void (30 & this.state && this.tryEmit(t)))
          : (this.reset(), void (this.state = 32));
      },
      process: function () {},
      getTouchAction: function () {},
      reset: function () {},
    }),
      t(B, j, {
        defaults: {
          pointers: 1,
        },
        attrTest: function (e) {
          var t = this.options.pointers;
          return 0 === t || e.pointers.length === t;
        },
        process: function (e) {
          var t = this.state,
            n = e.eventType,
            i = 6 & t,
            o = this.attrTest(e);
          return i && (n & pe || !o)
            ? 16 | t
            : i || o
            ? n & he
              ? 8 | t
              : 2 & t
              ? 4 | t
              : 2
            : 32;
        },
      }),
      t(R, B, {
        defaults: {
          event: "pan",
          threshold: 10,
          pointers: 1,
          direction: we,
        },
        getTouchAction: function () {
          var e = this.options.direction,
            t = [];
          return e & ye && t.push(Be), e & ke && t.push(Ne), t;
        },
        directionTest: function (e) {
          var t = this.options,
            n = !0,
            i = e.distance,
            o = e.direction,
            s = e.deltaX,
            r = e.deltaY;
          return (
            o & t.direction ||
              (i =
                t.direction & ye
                  ? ((o = 0 === s ? fe : s < 0 ? me : ve),
                    (n = s != this.pX),
                    Math.abs(e.deltaX))
                  : ((o = 0 === r ? fe : r < 0 ? ge : be),
                    (n = r != this.pY),
                    Math.abs(e.deltaY))),
            (e.direction = o),
            n && i > t.threshold && o & t.direction
          );
        },
        attrTest: function (e) {
          return (
            B.prototype.attrTest.call(this, e) &&
            (2 & this.state || (!(2 & this.state) && this.directionTest(e)))
          );
        },
        emit: function (e) {
          (this.pX = e.deltaX), (this.pY = e.deltaY);
          var t = P(e.direction);
          t && (e.additionalEvent = this.options.event + t),
            this._super.emit.call(this, e);
        },
      }),
      t(H, B, {
        defaults: {
          event: "pinch",
          threshold: 0,
          pointers: 2,
        },
        getTouchAction: function () {
          return [Pe];
        },
        attrTest: function (e) {
          return (
            this._super.attrTest.call(this, e) &&
            (Math.abs(e.scale - 1) > this.options.threshold || 2 & this.state)
          );
        },
        emit: function (e) {
          var t;
          1 !== e.scale &&
            ((t = e.scale < 1 ? "in" : "out"),
            (e.additionalEvent = this.options.event + t)),
            this._super.emit.call(this, e);
        },
      }),
      t(V, j, {
        defaults: {
          event: "press",
          pointers: 1,
          time: 251,
          threshold: 9,
        },
        getTouchAction: function () {
          return ["auto"];
        },
        process: function (e) {
          var t = this.options,
            n = e.pointers.length === t.pointers,
            i = e.distance < t.threshold,
            o = e.deltaTime > t.time;
          if (((this._input = e), !i || !n || (e.eventType & (he | pe) && !o)))
            this.reset();
          else if (e.eventType & de)
            this.reset(),
              (this._timer = l(
                function () {
                  (this.state = 8), this.tryEmit();
                },
                t.time,
                this
              ));
          else if (e.eventType & he) return 8;
          return 32;
        },
        reset: function () {
          clearTimeout(this._timer);
        },
        emit: function (e) {
          8 === this.state &&
            (e && e.eventType & he
              ? this.manager.emit(this.options.event + "up", e)
              : ((this._input.timeStamp = te()),
                this.manager.emit(this.options.event, this._input)));
        },
      }),
      t(q, B, {
        defaults: {
          event: "rotate",
          threshold: 0,
          pointers: 2,
        },
        getTouchAction: function () {
          return [Pe];
        },
        attrTest: function (e) {
          return (
            this._super.attrTest.call(this, e) &&
            (Math.abs(e.rotation) > this.options.threshold || 2 & this.state)
          );
        },
      }),
      t(U, B, {
        defaults: {
          event: "swipe",
          threshold: 10,
          velocity: 0.3,
          direction: ye | ke,
          pointers: 1,
        },
        getTouchAction: function () {
          return R.prototype.getTouchAction.call(this);
        },
        attrTest: function (e) {
          var t,
            n = this.options.direction;
          return (
            n & (ye | ke)
              ? (t = e.overallVelocity)
              : n & ye
              ? (t = e.overallVelocityX)
              : n & ke && (t = e.overallVelocityY),
            this._super.attrTest.call(this, e) &&
              n & e.offsetDirection &&
              e.distance > this.options.threshold &&
              e.maxPointers == this.options.pointers &&
              ee(t) > this.options.velocity &&
              e.eventType & he
          );
        },
        emit: function (e) {
          var t = P(e.offsetDirection);
          t && this.manager.emit(this.options.event + t, e),
            this.manager.emit(this.options.event, e);
        },
      }),
      t(W, j, {
        defaults: {
          event: "tap",
          pointers: 1,
          taps: 1,
          interval: 300,
          time: 250,
          threshold: 9,
          posThreshold: 10,
        },
        getTouchAction: function () {
          return [Le];
        },
        process: function (e) {
          var t = this.options,
            n = e.pointers.length === t.pointers,
            i = e.distance < t.threshold,
            o = e.deltaTime < t.time;
          if ((this.reset(), e.eventType & de && 0 === this.count))
            return this.failTimeout();
          if (i && o && n) {
            if (e.eventType != he) return this.failTimeout();
            var s = !this.pTime || e.timeStamp - this.pTime < t.interval,
              r = !this.pCenter || A(this.pCenter, e.center) < t.posThreshold;
            if (
              ((this.pTime = e.timeStamp),
              (this.pCenter = e.center),
              r && s ? (this.count += 1) : (this.count = 1),
              (this._input = e),
              0 == this.count % t.taps)
            )
              return this.hasRequireFailures()
                ? ((this._timer = l(
                    function () {
                      (this.state = 8), this.tryEmit();
                    },
                    t.interval,
                    this
                  )),
                  2)
                : 8;
          }
          return 32;
        },
        failTimeout: function () {
          return (
            (this._timer = l(
              function () {
                this.state = 32;
              },
              this.options.interval,
              this
            )),
            32
          );
        },
        reset: function () {
          clearTimeout(this._timer);
        },
        emit: function () {
          8 == this.state &&
            ((this._input.tapCount = this.count),
            this.manager.emit(this.options.event, this._input));
        },
      }),
      (Y.VERSION = "2.0.8"),
      (Y.defaults = {
        domEvents: !1,
        touchAction: "compute",
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
          [
            q,
            {
              enable: !1,
            },
          ],
          [
            H,
            {
              enable: !1,
            },
            ["rotate"],
          ],
          [
            U,
            {
              direction: ye,
            },
          ],
          [
            R,
            {
              direction: ye,
            },
            ["swipe"],
          ],
          [W],
          [
            W,
            {
              event: "doubletap",
              taps: 2,
            },
            ["tap"],
          ],
          [V],
        ],
        cssProps: {
          userSelect: "none",
          touchSelect: "none",
          touchCallout: "none",
          contentZooming: "none",
          userDrag: "none",
          tapHighlightColor: "rgba(0,0,0,0)",
        },
      });
    (X.prototype = {
      set: function (e) {
        return (
          ne(this.options, e),
          e.touchAction && this.touchAction.update(),
          e.inputTarget &&
            (this.input.destroy(),
            (this.input.target = e.inputTarget),
            this.input.init()),
          this
        );
      },
      stop: function (e) {
        this.session.stopped = e ? 2 : 1;
      },
      recognize: function (e) {
        var t = this.session;
        if (!t.stopped) {
          this.touchAction.preventDefaults(e);
          var n,
            i = this.recognizers,
            o = t.curRecognizer;
          (!o || (o && 8 & o.state)) && (o = t.curRecognizer = null);
          for (var s = 0; s < i.length; )
            (n = i[s]),
              2 === t.stopped || (o && n != o && !n.canRecognizeWith(o))
                ? n.reset()
                : n.recognize(e),
              !o && 14 & n.state && (o = t.curRecognizer = n),
              s++;
        }
      },
      get: function (e) {
        if (e instanceof j) return e;
        for (var t = this.recognizers, n = 0; n < t.length; n++)
          if (t[n].options.event == e) return t[n];
        return null;
      },
      add: function (e) {
        if (i(e, "add", this)) return this;
        var t = this.get(e.options.event);
        return (
          t && this.remove(t),
          this.recognizers.push(e),
          (e.manager = this).touchAction.update(),
          e
        );
      },
      remove: function (e) {
        return (
          i(e, "remove", this) ||
            !(e = this.get(e)) ||
            (-1 !== (n = v((t = this.recognizers), e)) &&
              (t.splice(n, 1), this.touchAction.update())),
          this
        );
        var t, n;
      },
      on: function (e, t) {
        if (e !== d && t !== d) {
          var n = this.handlers;
          return (
            r(m(e), function (e) {
              (n[e] = n[e] || []), n[e].push(t);
            }),
            this
          );
        }
      },
      off: function (e, t) {
        if (e !== d) {
          var n = this.handlers;
          return (
            r(m(e), function (e) {
              t ? n[e] && n[e].splice(v(n[e], t), 1) : delete n[e];
            }),
            this
          );
        }
      },
      emit: function (e, t) {
        var n, i, o;
        this.options.domEvents &&
          ((n = e),
          (i = t),
          (o = a.createEvent("Event")).initEvent(n, !0, !0),
          (o.gesture = i).target.dispatchEvent(o));
        var s = this.handlers[e] && this.handlers[e].slice();
        if (s && s.length) {
          (t.type = e),
            (t.preventDefault = function () {
              t.srcEvent.preventDefault();
            });
          for (var r = 0; r < s.length; ) s[r](t), r++;
        }
      },
      destroy: function () {
        this.element && K(this, !1),
          (this.handlers = {}),
          (this.session = {}),
          this.input.destroy(),
          (this.element = null);
      },
    }),
      ne(Y, {
        INPUT_START: de,
        INPUT_MOVE: 2,
        INPUT_END: he,
        INPUT_CANCEL: pe,
        STATE_POSSIBLE: He,
        STATE_BEGAN: 2,
        STATE_CHANGED: 4,
        STATE_ENDED: 8,
        STATE_RECOGNIZED: 8,
        STATE_CANCELLED: 16,
        STATE_FAILED: 32,
        DIRECTION_NONE: fe,
        DIRECTION_LEFT: me,
        DIRECTION_RIGHT: ve,
        DIRECTION_UP: ge,
        DIRECTION_DOWN: be,
        DIRECTION_HORIZONTAL: ye,
        DIRECTION_VERTICAL: ke,
        DIRECTION_ALL: we,
        Manager: X,
        Input: w,
        TouchAction: I,
        TouchInput: z,
        MouseInput: O,
        PointerEventInput: F,
        TouchMouseInput: M,
        SingleTouchInput: D,
        Recognizer: j,
        AttrRecognizer: B,
        Tap: W,
        Pan: R,
        Swipe: U,
        Pinch: H,
        Rotate: q,
        Press: V,
        on: u,
        off: h,
        each: r,
        merge: oe,
        extend: ie,
        assign: ne,
        inherit: t,
        bindFn: o,
        prefixed: y,
      }),
      ((void 0 !== s ? s : "undefined" != typeof self ? self : {}).Hammer = Y),
      "function" == typeof define && define.amd
        ? define(function () {
            return Y;
          })
        : "undefined" != typeof module && module.exports
        ? (module.exports = Y)
        : (s.Hammer = Y);
  })(window, document),
  (function () {
    "use strict";
    Object.filter = function (n, t) {
      return Object.keys(n)
        .filter(function (e) {
          return t(n[e]);
        })
        .reduce(function (e, t) {
          return Object.assign(e, _defineProperty({}, t, n[t]));
        }, {});
    };
    var a = {
      _checkIteratee: function (e) {
        var t;
        return (
          "function" != typeof e &&
            ((t = e),
            (e = function (e) {
              return e[t];
            })),
          e
        );
      },
      debounce: function (i, o, s) {
        var r;
        return function () {
          var e = this,
            t = arguments,
            n = s && !r;
          clearTimeout(r),
            (r = setTimeout(function () {
              (r = null), s || i.apply(e, t);
            }, o)),
            n && i.apply(e, t);
        };
      },
      map: function (e, t) {
        t = this._checkIteratee(t);
        var n = [];
        for (var i in e) e.hasOwnProperty(i) && n.push(t(e[i], i));
        return n;
      },
      each: function (e, t) {
        for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
      },
      size: function (e) {
        return null == e ? 0 : Object.keys(e).length;
      },
      isNumber: function (e) {
        return this.isFloat(e) || this.isInteger(e);
      },
      isFloat: function (e) {
        return (
          null != e && null != e && parseFloat(e).toString() == e.toString()
        );
      },
      isInteger: function (e) {
        return null != e && null != e && parseInt(e).toString() == e.toString();
      },
      isObject: function (e) {
        return (
          e &&
          "object" === (void 0 === e ? "undefined" : _typeof2(e)) &&
          !Array.isArray(e)
        );
      },
      isString: function (e) {
        return "string" == typeof e;
      },
      isArray: function (e) {
        return Array.isArray(e);
      },
      isFunction: function (e) {
        return "function" == typeof e && "number" != typeof e.nodeType;
      },
      isNull: function (e) {
        return null == e || null == e;
      },
      isNotNull: function (e) {
        return null != e && null != e;
      },
      camelCase: function (e) {
        return e.replace(/-([a-z])/g, function (e, t) {
          return t.toUpperCase();
        });
      },
      unCamelCase: function (e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      },
      isPlainObject: function (e) {
        var t = Function.prototype.toString,
          n = t.call(Object),
          i = Object.getPrototypeOf(e);
        if (null === i) return !0;
        var o = hasOwnProperty.call(i, "constructor") && i.constructor;
        return "function" == typeof o && o instanceof o && t.call(o) == n;
      },
      reverse: function (e) {
        return Array.from(e).reverse();
      },
      flatten: function (e, t) {
        var n = this,
          i = 1 < arguments.length && void 0 !== t && t,
          o = [];
        return (
          this.each(e, function (e) {
            Array.isArray(e)
              ? (o = n.concat(o, i ? n.flatten(e, i) : e))
              : o.push(e);
          }),
          o
        );
      },
      has: function (e, t) {
        return null != e && hasOwnProperty.call(e, t);
      },
      clone: function (e) {
        return JSON.parse(JSON.stringify(e));
      },
      uniq: function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      },
      concat: function (e) {
        if (arguments.length) {
          for (var t = e, n = 1; n < arguments.length; n++)
            t = t.concat(arguments[n]);
          return t;
        }
      },
      intersect: function (e, t) {
        return a.isArray
          ? e.filter(function (e) {
              return t.includes(e);
            })
          : Object.keys(e).filter(function (e) {
              return t.hasOwnProperty(e);
            });
      },
      intersection: function (e, t) {
        return Object.values(e).filter(function (e) {
          return t.indexOf(e);
        });
      },
      compact: function (e) {
        for (
          var t = -1, n = null == e ? 0 : e.length, i = 0, o = [];
          ++t < n;

        ) {
          var s = e[t];
          s && (o[i++] = s);
        }
        return o;
      },
      pick: function (e, n) {
        return this.pickBy(e, function (e, t) {
          return -1 != n.indexOf(t);
        });
      },
      pickBy: function (e, n) {
        if (null == e) return {};
        var i = {};
        return (
          this.each(e, function (e, t) {
            n(e, t) && (i[t] = e);
          }),
          i
        );
      },
      identity: function (e) {
        return e;
      },
      keys: function (e) {
        return Object.keys(e);
      },
      merge: function (e) {
        var n = this,
          t = e;
        null == t && (t = {});
        var i = Object.assign({}, t),
          o = !1;
        "boolean" == typeof arguments[arguments.length - 1] &&
          ((o = !0), [].pop.apply(arguments));
        for (var s = 1; s < arguments.length; s++) {
          var r = arguments[s];
          "object" === (void 0 === t ? "undefined" : _typeof2(t)) &&
            "object" === (void 0 === r ? "undefined" : _typeof2(r)) &&
            a.each(r, function (e, t) {
              n.isObject(e) && o && t in i
                ? (i[t] = n.merge(i[t], e, o))
                : Object.assign(i, _defineProperty({}, t, e));
            });
        }
        return i;
      },
      combine: function (e, n) {
        if (!e || e.constructor !== Array) return !1;
        var t,
          i = {},
          o = e.length;
        if (
          (this.isArray(n) ||
            (n = Array.apply(null, Array(o)).map(function (e, t) {
              return n;
            })),
          o != n.length)
        )
          return !1;
        for (t = 0; t < o; t++) i[e[t]] = n[t];
        return i;
      },
      diff: function (e, t) {
        return Object.keys(e).filter(function (e) {
          return !t.hasOwnProperty(e);
        });
      },
      difference: function (e, t) {
        return e.filter(function (e) {
          return !t.includes(e);
        });
      },
      differenceWith: function (e, n, i) {
        var o = this;
        if ((null == i && (i = this.isEqual), this.isObject(e))) {
          var s = {};
          return (
            a.each(e, function (e, t) {
              (null !== n && void 0 !== n[t] && i(n[t], e)) ||
                ((s[t] =
                  a.isObject(e) && n && void 0 !== n[t]
                    ? o.differenceWith(e, n[t], i)
                    : e),
                void 0 !== s[t] &&
                  (a.isObject(s[t]) || a.isArray(s[t])) &&
                  0 == a.size(s[t]) &&
                  delete s[t]);
            }),
            s
          );
        }
        return e.filter(function (e) {
          for (var t in n) if (n.hasOwnProperty(t) && i(e, n[t])) return !1;
          return !0;
        });
      },
      includes: function (e, t, n) {
        return (
          (n = n || 0) <=
            (e =
              "object" == (void 0 === e ? "undefined" : _typeof2(e))
                ? Object.values(e)
                : e).length && -1 < e.indexOf(t, n)
        );
      },
      symDiff: function (t, n) {
        return t
          .filter(function (e) {
            return !n.includes(e);
          })
          .concat(
            n.filter(function (e) {
              return !t.includes(e);
            })
          );
      },
      maxBy: function (e, t) {
        if (((t = this._checkIteratee(t)), e && e.length)) {
          for (var n, i = e[0], o = t(i), s = 1; s < e.length; s++)
            o < (n = t(e[s])) && ((i = e[s]), (o = n));
          return i;
        }
      },
      isEqual: function (e, t) {
        return "object" == (void 0 === e ? "undefined" : _typeof2(e)) ||
          "array" == typeof e
          ? JSON.stringify(a.sort(e)) === JSON.stringify(a.sort(t))
          : e === t;
      },
      some: function (n, e) {
        if ("object" != (void 0 === e ? "undefined" : _typeof2(e)))
          return "function" == typeof e ? e(n) : null == e ? n : n == e;
        var i = !0;
        return (
          a.each(e, function (e, t) {
            i = i && n[t] == e;
          }),
          i
        );
      },
      filterRecursive: function (e, i) {
        var o = this;
        return this.transform(e, function (e, t, n) {
          o.isArray(t)
            ? (e[n] = o.filter(
                a.map(t, function (e) {
                  return o.isObject(e) ? o.filterRecursive(e, i) : e;
                }),
                i
              ))
            : o.isObject(t)
            ? (e[n] = o.filterRecursive(t, i))
            : o.some(t, i) && (e[n] = t);
        });
      },
      transform: function (n, i, o) {
        var e;
        return (
          null == o &&
            ((e = n && n.constructor),
            (o = this.isArray(n)
              ? []
              : this.isObject(n) && this.isFunction(e)
              ? Object.create(Object.getPrototypeOf(n))
              : {})),
          this.each(n, function (e, t) {
            i(o, e, t, n);
          }),
          o
        );
      },
      filter: function (e, t) {
        var n = this.isArray(e),
          i = n ? [] : {};
        for (var o in e)
          e.hasOwnProperty(o) &&
            this.some(e[o], t) &&
            (n ? i.push(e[o]) : (i[o] = e[o]));
        return i;
      },
      find: function (e, t) {
        for (var n in e)
          if (e.hasOwnProperty(n) && this.some(e[n], t)) return e[n];
        return null;
      },
      findIndex: function (e, t) {
        for (var n in e)
          if (e.hasOwnProperty(n) && this.some(e[n], t)) return n;
        return -1;
      },
      sort: function (t) {
        var n = this,
          i = {};
        return "object" !== (void 0 === t ? "undefined" : _typeof2(t)) ||
          null === t
          ? parseInt(t) == t
            ? parseInt(t)
            : t
          : (Object.keys(t)
              .sort()
              .forEach(function (e) {
                i[e] = n.sort(t[e]);
              }),
            i);
      },
      sortBy: function (i, o) {
        var e = Object.keys(i);
        e.sort(
          "function" == typeof o
            ? function (e, t) {
                return o(i[e], i[t], e, t);
              }
            : function (e, t) {
                var n =
                  _typeof2(i[e][o]) == _typeof2(i[t][o]) &&
                  "number" == typeof i[t][o]
                    ? {
                        numeric: !0,
                      }
                    : void 0;
                return (null === i[e][o] ? "" : i[e][o])
                  .toString()
                  .localeCompare(
                    (null === i[t][o] ? "" : i[t][o]).toString(),
                    void 0,
                    n
                  );
              }
        );
        var t = [];
        return (
          e.forEach(function (e) {
            t.push(i[e]);
          }),
          t
        );
      },
      sumBy: function (e, t) {
        var n = 0;
        for (var i in e) e.hasOwnProperty(i) && (n += t(e[i], i));
        return n;
      },
      reduce: function (e, t, n) {
        for (var i in e)
          e.hasOwnProperty(i) && (n = null == n ? e[i] : t(n, e[i]));
        return n;
      },
      sum: function (e, t) {
        var n = 1 < arguments.length && void 0 !== t ? t : null;
        return this.sumBy(e, function (e, t) {
          return n ? e[n] : e;
        });
      },
      isEmpty: function (e) {
        return (
          null == e ||
          "" == e ||
          ("[object Object]" == Object.prototype.toString.call(e) &&
            0 == Object.keys(e).length)
        );
      },
      values: function (e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
        return t;
      },
      groupBy: function (e, n) {
        var i = {},
          o = a.isArray(e);
        return (
          a.each(e, function (e, t) {
            null == i[e[n]] && (i[e[n]] = o ? [] : {}),
              o ? i[e[n]].push(e) : (i[e[n]][t] = e);
          }),
          i
        );
      },
    };
    (window._ = a), (window.__ = a);
  })(),
  (function () {
    function d(e, t) {
      return new RegExp(e, t);
    }
    window.typography = {
      protectStack: [],
      defaultConfig: {
        mode: "html",
        chars: !0,
        quotes: !0,
        quotesLevel: 2,
        lang: "ru",
        spaces: !0,
        dashs: !0,
        nbsp: !0,
      },
      protect: function (e, t) {
        (t = t
          .replace(/&lt;raw&gt;/g, "<raw>")
          .replace(/&lt;\/raw&gt;/g, "</raw>")),
          (s = t.match(d("<raw?>[\\s\\S]+?</raw?>", "g")));
        var n = 0;
        if (s)
          for (; n < s.length; n++)
            (t = t.replace(s[n], "✁UNTYPO" + this.protectStack.length + "S✃")),
              this.protectStack.push(s[n]);
        return t;
      },
      unprotect: function (e, t) {
        for (; 0 < this.protectStack.length; ) {
          var n = this.protectStack.pop().replace(d("<\\/?raw>", "g"), "");
          t = t.replace("✁UNTYPO" + this.protectStack.length + "S✃", n);
        }
        return t;
      },
      process: function (s, e) {
        var r = this.defaultConfig;
        typoend = !0;
        r.lang = e;
        var t = -1 != r.mode.indexOf("html");
        (s = (s = (s || "").toString().replace(/(\r\n|\r)/g, "\n")).replace(
          /(http|https|ftp|ftps|tel)\:\/\/([а-яА-Яa-zA-Z0-9\-\.]+\.[а-яА-Яa-zA-Z]{2,})(\/[^\s"']*)?/g,
          "<raw>$1://$2$3</raw>"
        )),
          t &&
            (s = s
              .replace(/(<pre[^<>]*?>)/g, "<raw>$1")
              .replace(/(<\/pre>)/g, "$1</raw>")
              .replace(/(<script[^<>]*?>|<style[^<>]*?>)/g, "<raw>$1")
              .replace(/(<\/script>|<\/style>)/g, "$1</raw>")
              .replace(/(<!--(.|\n)*?-->)/g, "<raw>$1</raw>")
              .replace(/(="[^"\n\r]*")/g, "<raw>$1</raw>"));
        for (var n, i, o, a, l = 0; l < 10; ++l)
          s = (s = s.replace(
            d("(<raw>)([\\s\\S]*?)(<\\/?raw>)", "g"),
            function (e, t, n, i) {
              return "/" != i.charAt(1) ? t + n : e;
            }
          )).replace(
            d("(<\\/raw>)([\\s\\S]*?)(<\\/?raw>)", "g"),
            function (e, t, n, i) {
              return "/" == i.charAt(1) ? n + i : e;
            }
          );
        if (
          ((s = (s = (s = (s = this.protect(r, s)).replace(
            /<\/?p>/gi,
            ""
          )).replace(/<\/?h1>/gi, "")).replace(/<\/?nobr>/gi, "")),
          r.chars &&
            ((s = s
              .replace(/\(c\)/g, "©")
              .replace(/\(r\)/g, "®")
              .replace(/\(tm\)/g, "™")),
            t || (s = s.replace(/&lt;/g, "<").replace(/&gt;/g, ">")),
            (s = s.replace(/…/g, "..."))),
          r.quotes &&
            ((s = s.replace(/«|»|”|“|„/g, '"')),
            "ru" == r.lang && (s = s.replace(/‚|‘/g, '"'))),
          r.spaces)
        ) {
          s = (s = s.replace(/(^)[ \t]+/g, "$1")).replace(/ {2,}/g, " ");
          for (l = 0; l < 2; ++l)
            s = s.replace(
              /([  \n\t\v]|^)([иаксуов]|же|до|из|н[аое]|по|о[тб]|за|как|что|над|под|пр[ои]|или|для|без|если|едва|л?ибо|зато|пока|дабы|ежели|когда|перед|чтобы|через|пусть|будто|однако|словно) ([А-яёЁ])/gi,
              "$1$2&nbsp;$3"
            );
        }
        if (
          ((s = s.replace(/(\n|^)[  \t]+/g, "$1")),
          r.dashs &&
            ("ru" == r.lang &&
              ((n =
                "(где|зачем|как|какая|каки[емх]|како[ейм]|какого|какому|кем|когда|кого|кому?|кто|куда|откуда|почему|чего|чему?|что|ч[её]м)"),
              (a =
                "(январ" +
                (i = "(?:[ьяюе]|[её]м)") +
                "|феврал" +
                i +
                "|март" +
                (o = "(?:[ауе]|ом)") +
                "|апрел" +
                i +
                "|ма(?:[йяюе]|ем)|ию[нл]" +
                i +
                "август" +
                o +
                "|сентябр" +
                i +
                "|ноябр" +
                i +
                "|октябр" +
                i +
                "|декабр" +
                i +
                ")"),
              (s = (s = (s = (s = (s = (s = s.replace(
                /(\s|^|<p>)([«"„‚]*)(-|–)([\s]|$)/g,
                "$1$2—$4"
              )).replace(/([A-Za-zА-яёЁ0-9]) —/g, "$1 —")).replace(
                /([\.,!?] |\n|^|<p>)— ([A-Za-zА-яёЁ0-9«"„‚])/g,
                "$1— $2"
              ))
                .replace(
                  d(
                    "([^А-яёЁ]|^)" +
                      n +
                      "(?:[  ]?|-[  ]|[  ]-)(то|либо|нибудь)([^А-яёЁ]|$)",
                    "gi"
                  ),
                  "$1$2-$3$4"
                )
                .replace(
                  d(
                    "([^А-яёЁ]|^)" +
                      n +
                      "(?:[  ]?|-[  ]|[  ]-)(то|либо|нибудь)([^А-яёЁ]|$)",
                    "gi"
                  ),
                  "$1$2-$3$4"
                )
                .replace(
                  d(
                    "([^А-яёЁ]|^)(кое|кой)(?:[  ]?[-—]?[  ]?)" +
                      n +
                      "([^А-яёЁ]|$)",
                    "gi"
                  ),
                  "$1$2-$3$4"
                )
                .replace(
                  d(
                    "([^А-яёЁ]|^)(ко[ей])(?:[  ]?[-—]?[  ]?)" +
                      n +
                      "([^А-яёЁ]|$)",
                    "gi"
                  ),
                  "$1$2-$3$4"
                )
                .replace(
                  /([\s]|^)(из)(?:[  ]?[-—]?[  ]?)(за)([\s]|$)/gi,
                  "$1$2-$3$4"
                )
                .replace(
                  /([\s]|^)(из)(?:[  ]?[-—]?[  ]?)(под)([\s]|$)/gi,
                  "$1$2-$3$4"
                )
                .replace(/([А-яёЁ]{2,}) (ка|кась)([\s,\.\?!]|$)/g, "$1-$2$3")
                .replace(
                  /([^А-яёЁ]|^)(вс[ёе]|так)(?:[  ]?|-[  ]|[  ]-)(таки)([^А-яёЁ]|$)/gi,
                  "$1$2-$3$4"
                )
                .replace(
                  /(ГОСТ(?:[  ]Р)?(?:[  ](?:ИСО|ISO))?)[  ]([\d\.]+)-([\d]+)/gi,
                  "$1 $2–$3"
                ))
                .replace(
                  /([IVXLCDM]{1,3})-([IVXLCDM]{1,3})[  ]?вв?\.?([\s\.,?!;\)])/g,
                  "$1—$2 вв.$3"
                )
                .replace(
                  /([\d]{1,4})-([\d]{1,4})[  ]?гг?\.([\s\.,?!;\)])/g,
                  "$1–$2 гг.$3"
                )
                .replace(
                  /([^\d]|^)([0-2][0-9]:[0-5][0-9])-([0-2][0-9]:[0-5][0-9])([^\d]|$)/g,
                  "$1$2–$3$4"
                ))
                .replace(
                  d(
                    "([\\s]|^)([1-3]?[\\d])-([1-3]?[\\d])[  ]?" +
                      a +
                      "([^А-яёЁ]|$)",
                    "gi"
                  ),
                  "$1$2–$3 $4$5"
                )
                .replace(
                  d("([^А-яёЁ]|^)" + a + "-" + a + "([^А-яёЁ]|&)", "gi"),
                  "$1$2—$3$4"
                ))),
            (s = s
              .replace(/(\d)--(\d)/g, "$1–$2")
              .replace(/([^-]|\s|^)--([^-]|$|\n)/g, "$1—$2")
              .replace(/([^-\d]|^)(\d+)-(\d+)([^-\d]|$)/g, "$1$2−$3$4")
              .replace(/([^a-z][a-z]|[Α-Ωα-ω+=*\/])-(\d)/g, "$1−$2"))),
          r.chars &&
            (s = s
              .replace(/([^\.])\.{2,4}/g, "$1...")
              .replace(/(\?!|!\?)\.{3}/g, "?!.")
              .replace(/\?\.{3}/g, "?..")
              .replace(/!\.{3}/g, "!..")
              .replace(/(!+)(\?+)/g, "$2$1")
              .replace(/(\d+?)[xх](\d+?)/g, "$1×$2")
              .replace(/(\d+?)([  ])[xх]([  ])(\d+?)/g, "$1×$4")
              .replace(
                /([0-9a-zA-ZΑ-Ωα-ωА-яёЁ])\^([0-9]+)/g,
                function (e, t, n) {
                  for (var i = n, o = 0; o < 10; ++o)
                    i = i.replace(
                      d("0123456789".charAt(o), "g"),
                      "⁰¹²³⁴⁵⁶⁷⁸⁹".charAt(o)
                    );
                  return t + i;
                }
              )
              .replace(/!=/g, "≠")
              .replace(/\+\/[\-−]/g, "±")
              .replace(/~=/g, "≈")
              .replace(/&lt;=/g, "≤")
              .replace(/&gt;=/g, "≥")
              .replace(/<-([^-]|&)/g, "←$1")
              .replace(/([^-]|^)->/g, "$1→")
              .replace(/(!+)(\?+)/g, "$2$1")
              .replace(/\?{3,}/g, "???")
              .replace(/!{3,}/g, "!!!")),
          r.quotes)
        )
          if (
            ((s = (s = (s = s
              .replace(/(^|\n|\s|—|-|\()"/g, "$1«")
              .replace(/"($|\n|\s|—|-|\.|,|!|\?|:|;|\))/g, "»$1")
              .replace(/«\)/g, "»)")
              .replace(/«( ?)/g, "«")
              .replace(/( ?)»/g, "»")
              .replace(/>"/g, ">«")
              .replace(/"</g, "»<")
              .replace(/«""/g, "«««")
              .replace(/«"/g, "««")
              .replace(/""»/g, "»»»")
              .replace(/"»/g, "»»")
              .replace(/("{2}|"»)/g, "»»")
              .replace(/$"/g, "«")
              .replace(/([A-Za-zа-яА-ЯёЁ])'/g, "$1’"))
              .replace(/[a-zA-ZА-яёЁ]"-/g, "$1»-")
              .replace(/-"[a-zA-ZА-яёЁ]/g, "-«$1"))
              .replace(/(^[^«»]*)"/g, "$1«")
              .replace(/"([^«»]*$)/g, "»$1")
              .replace(/«([^«»]*)"/g, "«$1»")
              .replace(/"([^«»]*)»/g, "«$1»")),
            "ru" == r.lang && 1 < r.quotesLevel)
          ) {
            for (var c = 0, l = 0; l < s.length; ++l)
              if ("«" == s.charAt(l)) {
                ++c;
                for (var u = l + 1; u < s.length; ++u)
                  if (
                    ("«" == s.charAt(u) && ++c, "»" == s.charAt(u) && --c <= 0)
                  ) {
                    (s = (function (e, t) {
                      var n,
                        i = "",
                        o = "";
                      0 != e && (i = s.substring(0, e)),
                        t != s.length - 1 && (o = s.substring(t + 1, s.length)),
                        (n = s.substring(e, t + 1));
                      for (e = 0; e < 32; ++e)
                        (n = n.replace(/«([^«»]*)«([^»]*)»/g, "«$1„$2“")),
                          2 < r.quotesLevel &&
                            (n = n.replace(/„([^„“]*)„([^“]*)“/g, "„$1‚$2‘"));
                      return i + n + o;
                    })(l, u)),
                      (l = u);
                    break;
                  }
                c = 0;
              }
          } else s = s.replace(/'([A-Za-zа-яА-ЯёЁ])/g, "‘$1");
        return (
          "ru" != r.lang && (s = s.replace(/«/g, "“").replace(/»/g, "”")),
          (s = s.replace(/ (\))/g, "$1")),
          (s = this.unprotect(r, s))
        );
      },
    };
  })(),
  (function (r, c) {
    "use strict";

    function u(e, t) {
      return e instanceof u ? e : new u.fn.init(e, t);
    }
    var d = new Promise(function (e, t) {
      function n() {
        c.removeEventListener("DOMContentLoaded", n),
          r.removeEventListener("load", n),
          e(u),
          (d = null);
      }
      c.addEventListener("DOMContentLoaded", n), r.addEventListener("load", n);
    });
    d.then(function () {
      u(document).trigger("ready");
    });
    var a = {
      float: "cssFloat",
    };

    function h(e) {
      return (e = (e = e.replace(
        /\:(first|last)([\x20\t\r\n\f])?/gi,
        ":$1-child$2"
      )).replace(
        /\:(checkbox|password|radio|reset|submit|text)([\x20\t\r\n\f])?/gi,
        "[type=$1]$2"
      ));
    }
    (u.fn = u.prototype =
      {
        length: 0,
        constructor: u,
        init: function (e, t) {
          if (!e) return this;
          if ((t instanceof u && (t = t[0]), e instanceof u))
            return this.constructor(t).find(e);
          "string" == typeof t && (t = c.querySelector(h(t)));
          var n = u.isWindow(e);
          if (e.nodeType || n)
            return (
              (1 != e.nodeType && 9 != e.nodeType && !n) ||
                ((this[0] = e), (this.length = 1)),
              this
            );
          if (Array.isArray(e) || e instanceof HTMLCollection) {
            for (var i = (this.length = 0); i < e.length; i++)
              1 == e[i].nodeType && ((this[this.length] = e[i]), this.length++);
            return this;
          }
          if ("function" == typeof e) return d ? d.then(e) : e(u), this;
          if ("string" != typeof e)
            return "object" == (void 0 === e ? "undefined" : _typeof2(e))
              ? ((this[this.length] = e), this.length++, this)
              : void 0;
          var o = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/.exec(e);
          if (o && o[1]) {
            var s = c.createElement("template"),
              r = e.trim();
            (s.innerHTML = r),
              (this.length = 1),
              (this[0] = s.content.firstChild);
          } else if (!t || null != t.nodeType) {
            var a = null;
            try {
              a = (t || c).querySelectorAll(h(e));
            } catch (e) {}
            if (a && a.length) {
              this.length = a.length;
              for (var l = 0; l < a.length; l++) this[l] = a[l];
            }
          }
          return this;
        },
        children: function () {
          if (!this.length) return this;
          var t = [];
          return (
            this.each(function (e) {
              t = _.concat(t, Array.prototype.slice.call(e.children));
            }),
            u(t)
          );
        },
        parent: function (t) {
          if (!this.length) return this;
          var n = [];
          return (
            this.each(function (e) {
              if (t)
                for (
                  ;
                  (e = e.parentNode) &&
                  ("function" == typeof e.matches
                    ? !e.matches(t)
                    : !e.matchesSelector(t));

                );
              else e = e.parentNode;
              n.push(e);
            }),
            u(n)
          );
        },
        parents: function () {
          var n = this,
            i = [];
          return (
            this.each(function (e) {
              for (var t = n[0].parentNode; t !== document; ) {
                e = t;
                i.push(e), (t = e.parentNode);
              }
            }),
            i.push(document),
            u(_.uniq(i))
          );
        },
        find: function (e) {
          return this.length ? u(e, this[0]) : this;
        },
        closest: function (e) {
          return u(this.length ? this[0].closest(e) : null);
        },
        prop: function (e, t) {
          return void 0 !== t
            ? (this[0][e] = t)
            : this.length
            ? this[0][e]
            : null;
        },
        attr: function (t, n) {
          return n
            ? (this.each(function (e) {
                e.setAttribute(t, n);
              }),
              this)
            : null !== n
            ? this.length
              ? this[0].getAttribute(t)
              : null
            : void this.removeAttr(t);
        },
        removeAttr: function (t) {
          return (
            this.each(function (e) {
              return e.removeAttribute(t);
            }),
            this
          );
        },
        hasAttr: function (e) {
          return void 0 !== this.attr(e);
        },
        get: function (e) {
          return this.length > e ? u(this[e]) : null;
        },
        first: function () {
          return this.get(0);
        },
        each: function (e) {
          for (var t = 0; t < this.length; t++) e.apply(this[t], [this[t]]);
        },
        toArray: function () {
          return u.makeArray(this);
        },
        addClass: function (e, t) {
          var n = this;
          return (
            _.each(
              (e || "")
                .trim()
                .replace(/[ ]{2,}/g, " ")
                .split(/\s+/),
              function (t) {
                n.each(function (e) {
                  return e.classList.add(t);
                });
              }
            ),
            null != t &&
              setTimeout(function () {
                return n.removeClass(e);
              }, t),
            this
          );
        },
        removeClass: function (e) {
          var n = this;
          return (
            Array.isArray(e) || (e = [e]),
            _.each(e, function (e) {
              _.each((e || "").split(/\s+/), function (t) {
                n.each(function (e) {
                  return e.classList.remove(t);
                });
              });
            }),
            this
          );
        },
        hasClass: function (e) {
          return this.length && this[0].classList.contains(e);
        },
        toggleClass: function (e, n) {
          var i = this;
          return (
            _.each((e || "").split(/\s+/), function (t) {
              i.each(function (e) {
                return e.classList.toggle(t, n);
              });
            }),
            this
          );
        },
        remove: function () {
          return (
            this.each(function (e) {
              e.remove();
            }),
            this
          );
        },
        append: function (e) {
          var t = this;
          return (
            this.length &&
              u(e).each(function (e) {
                return t[0].appendChild(e);
              }),
            this
          );
        },
        prepend: function (e) {
          var t = this;
          return (
            this.length &&
              u(e).each(function (e) {
                return t[0].insertBefore(e, t[0].children[0]);
              }),
            this
          );
        },
        insertBefore: function (e) {
          var t = u(e)[0];
          return this.insertBeforeAfter(t, t);
        },
        insertAfter: function (e) {
          var t = u(e)[0];
          return this.insertBeforeAfter(t, t.nextSibling);
        },
        insertBeforeAfter: function (t, n) {
          return (
            this.each(function (e) {
              t.parentNode.insertBefore(e, n);
            }),
            this
          );
        },
        appendTo: function (e) {
          return u(e).append(this), this;
        },
        prependTo: function (e) {
          return u(e).prepend(this), this;
        },
        data: function (e, t) {
          var i = this;
          if (
            null != t ||
            "object" == (void 0 === e ? "undefined" : _typeof2(e))
          )
            return (
              (t =
                "object" == (void 0 === e ? "undefined" : _typeof2(e))
                  ? e
                  : _defineProperty({}, e, t)),
              _.each(t, function (t, n) {
                (n = _.camelCase(n)),
                  i.each(function (e) {
                    return (e.dataset[n] = t);
                  });
              }),
              this
            );
          if (this.length) {
            var n = function (e) {
              return _.isInteger(e)
                ? parseInt(e)
                : __.isFloat(e)
                ? parseFloat(e)
                : "false" === e || "true" === e
                ? "true" == e
                : e;
            };
            if (e) return n(this[0].dataset[_.camelCase(e)]);
            var o = {};
            return (
              _.each(this[0].dataset, function (e, t) {
                o[t] = n(e);
              }),
              o
            );
          }
          return [];
        },
        index: function (e) {
          if (!this.length) return -1;
          for (
            var t = null,
              t = e
                ? e.children
                : this[0].parentNode
                ? this[0].parentNode.children
                : [this[0]],
              n = 0;
            n < t.length;
            n++
          )
            if (t[n] == this[0]) return n;
          return -1;
        },
        triggerHandler: function (e, t) {
          return this.trigger(e, t, !0);
        },
        trigger: function (n, i, o) {
          var s = this;
          return (
            (n = n.split(".")[0]),
            this.each(function (e) {
              var t = void 0;
              window.CustomEvent
                ? (t = new CustomEvent(n, {
                    detail: i,
                  }))
                : (t = document.createEvent("CustomEvent")).initCustomEvent(
                    n,
                    !0,
                    !0,
                    i
                  ),
                Object.defineProperty(t, "target", {
                  writable: !1,
                  value: e,
                }),
                null == e.dispatchEvent || o
                  ? null != e.$tinyquery &&
                    null != e.$tinyquery[n] &&
                    _.each(e.$tinyquery[n], function (e) {
                      Array.isArray(i) || (i = [i]),
                        i.unshift(t),
                        e.cb.apply(s, i);
                    })
                  : e.dispatchEvent(t),
                document.body.dispatchEvent(t);
            }),
            this
          );
        },
        _triggerEvent: function (i) {
          var o = this;
          _.each(o.$tinyquery[i.type], function (e) {
            var t = !0,
              n = i.target;
            if (e.selector)
              do {
                1 == n.nodeType &&
                  ("function" == typeof n.matches
                    ? n.matches(e.selector)
                    : n.matchesSelector(e.selector)) &&
                  (t = e.cb.apply(n, [i]));
              } while ((n = n.parentNode) && 9 != n.nodeType);
            else t = e.cb.apply(o, [i]);
            !1 === t && (i.preventDefault(), i.stopPropagation());
          });
        },
        on: function (e, i, o) {
          var t = this;
          if (
            ("function" == typeof i && ((o = i), (i = null)),
            null != o && null != o)
          ) {
            var s = this;
            return (
              _.each(e.replace(/[ ]+/, " ").split(" "), function (n) {
                (n = n.split(".")[0]),
                  t.each(function (t) {
                    null == t.$tinyquery && (t.$tinyquery = {}),
                      null == t.$tinyquery[n] && (t.$tinyquery[n] = []),
                      i
                        ? ((i = h(i)),
                          _.each(
                            i.replace(/[ ]+/, " ").split(","),
                            function (e) {
                              return t.$tinyquery[n].push({
                                selector: e,
                                cb: o,
                              });
                            }
                          ))
                        : t.$tinyquery[n].push({
                            cb: o,
                          }),
                      null != t.addEventListener &&
                        t.addEventListener(n, s._triggerEvent);
                  });
              }),
              this
            );
          }
        },
        one: function (n, i, o) {
          var s = this;
          "function" == typeof i && ((o = i), (i = null));
          var r = this;
          return this.on(n, i, function e(t) {
            o.apply(s, [t]), r.off(n, i, e);
          });
        },
        off: function (e, t, s) {
          var n = this;
          "function" == typeof t && ((s = t), (t = null));
          var r = this;
          return (
            _.each(e.replace(/[ ]+/, " ").split(" "), function (o) {
              (o = o.split(".")[0]),
                n.each(function (i) {
                  if (t || s) {
                    if (t)
                      _.each(t.replace(/[ ]+/, " ").split(","), function (e) {
                        if (null != i.$tinyquery && null != i.$tinyquery[o])
                          for (var t = 0; t < i.$tinyquery[o].length; t++) {
                            var n = i.$tinyquery[o][t];
                            if (n.selector == e && (n.cb == s || !s)) {
                              i.$tinyquery[o].splice(t, 1);
                              break;
                            }
                          }
                      });
                    else if (null != i.$tinyquery && null != i.$tinyquery[o])
                      for (var e = 0; e < i.$tinyquery[o].length; e++) {
                        if (i.$tinyquery[o][e].cb == s || !s) {
                          i.$tinyquery[o].splice(e, 1);
                          break;
                        }
                      }
                    null == i.$tinyquery ||
                      null == i.$tinyquery[o] ||
                      i.$tinyquery[o].length ||
                      (i.removeEventListener(o, r._triggerEvent),
                      delete i.$tinyquery[o]);
                  } else i.removeEventListener(o, r._triggerEvent), null != i.$tinyquery && null != i.$tinyquery[o] && delete i.$tinyquery[o];
                });
            }),
            this
          );
        },
        delegate: function (e, t, n) {
          return this.on(t, e, n);
        },
        undelegate: function (e, t, n) {
          return this.off(t, e, n);
        },
        val: function (t) {
          return null == t
            ? this.length &&
              -1 != ["INPUT", "TEXTAREA", "SELECT"].indexOf(this[0].tagName)
              ? this[0].value
              : null
            : (this.each(function (e) {
                -1 != ["INPUT", "TEXTAREA", "SELECT"].indexOf(e.tagName) &&
                  (e.value = t);
              }),
              this);
        },
        is: function (e) {
          return (
            !!this.length &&
            ("function" == typeof this[0].matches
              ? this[0].matches(e)
              : "function" == typeof this[0].matchesSelector &&
                this[0].matchesSelector(e))
          );
        },
        has: function (o) {
          return this.filter(function (e, t) {
            for (var n = u(o, t), i = 0; i < n.length; i++)
              if (t.contains(n[i])) return t;
            return !1;
          });
        },
        filter: function (e) {
          if ("function" != typeof e) return this.has(e);
          for (var t = [], n = 0; n < this.length; n++)
            e.apply(this[n], [n, this[n]]) && t.push(this[n]);
          return u(t);
        },
        html: function (t) {
          return null != t
            ? (t instanceof u && (t = t.length ? t[0].outerHTML : ""),
              null != t.outerHTML && (t = t.outerHTML),
              this.each(function (e) {
                e.innerHTML = t;
              }),
              this)
            : this.length
            ? this[0].innerHTML
            : null;
        },
        text: function (t) {
          return null != t
            ? (this.each(function (e) {
                e.innerText = t;
              }),
              this)
            : this.length
            ? "string" == typeof this[0].textContent
              ? this[0].textContent
              : this[0].innerText
            : "";
        },
        clone: function () {
          return u(
            this.map(function (e) {
              return e.cloneNode(!0);
            })
          );
        },
        empty: function () {
          return this.html("");
        },
        hide: function () {
          return this.toggle(!1);
        },
        show: function () {
          return this.toggle(!0);
        },
        toggle: function (t) {
          return (
            this.each(function (e) {
              e.style.display =
                null == t
                  ? "none" == e.style.display
                    ? "block"
                    : "none"
                  : t
                  ? "block"
                  : "none";
            }),
            this
          );
        },
        focus: function () {
          this.length && this[0].focus();
        },
        viewportOffset: function () {
          return this.length
            ? this[0].getBoundingClientRect()
            : {
                x: null,
                y: null,
                width: null,
                height: null,
                left: null,
                top: null,
                right: null,
                bottom: null,
              };
        },
        offset: function () {
          if (this.length) {
            for (var e = 0, t = 0, n = this[0]; n; )
              (e += n.offsetLeft), (t += n.offsetTop), (n = n.offsetParent);
            return {
              left: e,
              top: t,
            };
          }
          return {
            left: null,
            top: null,
          };
        },
        position: function () {
          return this.length
            ? {
                left: this[0].offsetLeft,
                top: this[0].offsetTop,
              }
            : {
                left: null,
                top: null,
              };
        },
        _scrollValue: function (e) {
          var t = this[0],
            n = u.isWindow(t) ? t : 9 === t.nodeType && t.defaultView;
          return n
            ? n[
                {
                  scrollLeft: "pageXOffset",
                  scrollTop: "pageYOffset",
                }[e]
              ]
            : t[e];
        },
        scrollTop: function () {
          return this._scrollValue("scrollTop");
        },
        scrollLeft: function () {
          return this._scrollValue("scrollLeft");
        },
        next: function () {
          return this.length
            ? u(this[0].nextElementSibling || this[0].nextSibling)
            : this;
        },
        prev: function () {
          return this.length
            ? u(this[0].previousElementSibling || this[0].previousSibling)
            : this;
        },
        eq: function (e) {
          return u(this.length > e ? this[e] : null);
        },
        css: function (i, t) {
          function o(e, t) {
            return (
              -1 !=
                ["width", "height", "left", "top", "right", "bottom"].indexOf(
                  e
                ) &&
                _.isNumber(t) &&
                (t += "px"),
              t
            );
          }

          function s(e) {
            return null != a[e] ? a[e] : _.camelCase(e);
          }
          var r = this;
          if (_.isObject(i)) {
            for (var e in i)
              !(function (e) {
                var t = s(e),
                  n = o(t, i[e]);
                r.each(function (e) {
                  return (e.style[t] = n);
                });
              })(e);
            return this;
          }
          if (((i = s(i)), void 0 !== t))
            return (
              (t = o(i, t)),
              this.each(function (e) {
                e.style[i] = t;
              }),
              this
            );
          var n = this[0].ownerDocument.defaultView;
          return (
            (n && n.opener) || (n = window),
            this[0].style[i] ||
              n.getComputedStyle(this[0]).getPropertyValue(_.unCamelCase(i)) ||
              null
          );
        },
        map: function (t) {
          return _.map(u.makeArray(this), function (e) {
            return t.apply(e, [e]);
          });
        },
        hover: function (e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        },
        outerHeight: function () {
          var e = window.getComputedStyle(this[0]),
            t = parseFloat(e.marginTop) + parseFloat(e.marginBottom);
          return this[0].offsetHeight + t;
        },
        outerWidth: function () {
          var e = window.getComputedStyle(this[0]),
            t = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
          return this[0].offsetWidth + t;
        },
        submit: function () {
          return this.length && this[0].submit(), this;
        },
      }),
      _.each(
        [
          "click",
          "dblclick",
          "resize",
          "scroll",
          "keypress",
          "keydown",
          "keyup",
          "change",
          "mouseenter",
          "mouseleave",
          "ready",
          "load",
        ],
        function (n) {
          u.fn[n] = function (e, t) {
            return null == e && null == t ? this.trigger(n) : this.on(n, e, t);
          };
        }
      ),
      _.each(["height", "width"], function (o) {
        var s = o;
        u.fn[s] = function () {
          if (0 == this.length) return null;
          var e = this[0],
            t = o.substr(0, 1).toUpperCase() + o.substr(1);
          if (u.isWindow(e)) return e.innerHeight;
          if (9 == e.nodeType) {
            var n = e.documentElement;
            return Math.max(
              e.body["scroll" + t],
              n["scroll" + t],
              e.body["offset" + t],
              n["offset" + t],
              n["client" + t]
            );
          }
          var i = r.getComputedStyle(this[0], null);
          return parseInt(i.getPropertyValue(s));
        };
      }),
      (u.contains = function (e, t) {
        e.contains(t);
      }),
      (u.isWindow = function (e) {
        return null != e && e === e.window;
      }),
      (u.isset = function (e) {
        return void 0 !== e && null != e;
      }),
      (u.nvl = function (e, t) {
        return void 0 === e || null == e ? t : e;
      }),
      (u.param = function (e, t) {
        var n,
          i,
          o = [];
        for (var s in e) {
          e.hasOwnProperty(s) &&
            (null == e[s] && (e[s] = ""),
            "boolean" == typeof e[s] && (e[s] = e[s] ? 1 : 0),
            (n = t ? t + "[" + s + "]" : s),
            (i = e[s]),
            o.push(
              null !== i &&
                "object" === (void 0 === i ? "undefined" : _typeof2(i))
                ? u.param(i, n)
                : encodeURIComponent(n) +
                    "=" +
                    (null !== i ? encodeURIComponent(i) : "")
            ));
        }
        return o.join("&");
      }),
      (u.getScript = function (e, t) {
        var n;
        null != t &&
          ((n = "_mx_callback" + Math.floor(1e5 * Math.random())),
          (window[n] = function (e) {
            t(e), delete window[n];
          }),
          (e += (-1 != e.indexOf("?") ? "&" : "?") + "callback=" + n));
        var i = document.createElement("script");
        (i.type = "text/javascript"), (i.src = e), document.head.appendChild(i);
      }),
      (u.extend = u.fn.extend =
        function () {
          var e = !1,
            t = 0,
            n = this;
          return (
            "boolean" == typeof arguments[0] && ((e = arguments[0]), t++),
            t + 1 < arguments.length && ((n = arguments[t]), t++),
            _.merge(n, arguments[t], e)
          );
        }),
      (u.each = function (e, t) {
        for (var n in e) e.hasOwnProperty(n) && t(n, e[n]);
      }),
      (u.makeArray = function (e) {
        for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
        return t;
      }),
      (u.proxy = function (e, t) {
        var n = Array.prototype.slice.call(arguments, 2);
        return function () {
          return e.apply(t, n.concat(Array.prototype.slice.call(arguments)));
        };
      }),
      (u.fn.init.prototype = u.fn),
      (r.$ = r.$mx = u);
  })(window, document),
  window,
  document,
  ($mx.request = function (s) {
    var r = this;
    return new Promise(function (i, o) {
      var e = {
          headers: Object.assign($mx.nvl(s.headers, {}), {
            "X-Requested-With": "XMLHttpRequest",
          }),
          method: s.method || "get",
          mode: s.mode || "same-origin",
          credentials: s.credentials || "same-origin",
        },
        t = s.url;
      switch (e.method) {
        case "get":
          (s.data = s.data || s.json),
            (t = s.url + (_.isEmpty(s.data) ? "" : "?" + $mx.param(s.data)));
          break;
        case "post":
          null != s.json
            ? ((e.body = JSON.stringify(s.json)),
              (e.headers["Content-Type"] = "application/json"))
            : (!(s.data instanceof FormData) && "object" == _typeof2(s.data)
                ? ((e.body = $mx.param(s.data)),
                  (e.headers["Content-Type"] =
                    "application/x-www-form-urlencoded"))
                : (e.body = s.data),
              null != s.headers &&
                (e.headers = Object.assign(e.headers, s.headers)));
      }
      fetch(t, e)
        .then(function (t) {
          function n(e) {
            i({
              data: e,
              headers: t.headers,
              status: t.status,
            });
          }
          var e = t.headers.get("Content-Type");
          403 == t.status
            ? "application/json" == e.split(";")[0]
              ? t
                  .json()
                  .then(function (e) {
                    "challenge" == e.result && null != e.response.payload
                      ? $mx
                          .get("/challenge-platform/check.jsdata", e.response)
                          .then(function () {
                            r.request(s).then(i).catch(o);
                          })
                          .catch(o)
                      : "challenge" == e.result && null != e.response.sitekey
                      ? n(e)
                      : o();
                  })
                  .catch(o)
              : o()
            : 429 == t.status
            ? setTimeout(function () {
                r.request(s).then(i).catch(o);
              }, 1e3)
            : 400 <= t.status
            ? o()
            : "application/json" == e.split(";")[0]
            ? t.json().then(n).catch(o)
            : t.text().then(n).catch(o);
        })
        .catch(o);
    });
  }),
  ($mx.get = function (e, t) {
    return $mx.request({
      url: e,
      method: "get",
      data: t,
    });
  }),
  ($mx.post = function (e, t) {
    return $mx.request({
      url: e,
      method: "post",
      data: t,
    });
  }),
  (function () {
    "use strict";
    ($mx.lazyScripts = []),
      ($mx.lazyScriptsLoading = []),
      ($mx.lazyScriptsPrefix = "/s"),
      $mx(function () {
        $mx.lazyScripts = _.filter(
          _.flatten(
            [].concat(
              $mx.makeArray(
                $mx("script[src]").map(function () {
                  return this.getAttribute("src").split("?")[0];
                })
              ),
              $mx.makeArray(
                $mx("link[rel=stylesheet]").map(function () {
                  return this.getAttribute("href").split("?")[0];
                })
              )
            )
          )
        );
      }),
      ($mx.lazy = function (e, t, n, i) {
        "function" == typeof t && ((n = t), (t = null)),
          (null != t && null != t) || (t = []);

        function o(e) {
          0 == --r && "function" == typeof n && n(e);
        }

        function s(e) {
          for (var t = 0; t < $mx.lazyScriptsLoading[e].length; t++)
            $mx.lazyScriptsLoading[e][t].apply(null, [t]);
          $mx.lazyScripts.push(e), delete $mx.lazyScriptsLoading[e];
        }
        var r = 0,
          a = document
            .querySelector("link[type='text/css']")
            .href.match(/\?([0-9\.]+)/),
          l = a ? a[0] : "";
        if (
          ("string" == typeof e && (e = [e]),
          "string" == typeof t && (t = [t]),
          (r = e.length + t.length))
        ) {
          for (var c = 0; c < e.length; c++)
            !(function (e) {
              var n;
              -1 == e.indexOf("//") &&
                e[0] &&
                (e = $mx.lazyScriptsPrefix + "/js/" + e),
                -1 != $mx.lazyScripts.indexOf(e)
                  ? o(0)
                  : (null == $mx.lazyScriptsLoading[e] &&
                      ($mx.lazyScriptsLoading[e] = []),
                    $mx.lazyScriptsLoading[e].push(o),
                    1 == $mx.lazyScriptsLoading[e].length &&
                      (((n = document.createElement("script")).type =
                        "text/javascript"),
                      (n.src = e + (-1 == e.indexOf("?") ? l : "")),
                      null != i &&
                        _.each(i, function (e, t) {
                          n.setAttribute(t, e);
                        }),
                      (n.onload = function () {
                        s(e), (n.onload = null);
                      }),
                      document.head.appendChild(n)));
            })(e[c]);
          for (c = 0; c < t.length; c++)
            !(function (e) {
              var t;
              "//" != e.substring(0, 2) &&
                (e =
                  ("/" != e[0] ? $mx.lazyScriptsPrefix + "/css/" : "") +
                  e +
                  (-1 == e.indexOf("?") ? l : "")),
                -1 != $mx.lazyScripts.indexOf(e)
                  ? o(0)
                  : (null == $mx.lazyScriptsLoading[e] &&
                      ($mx.lazyScriptsLoading[e] = []),
                    $mx.lazyScriptsLoading[e].push(o),
                    1 == $mx.lazyScriptsLoading[e].length &&
                      ((t = document.createElement("link")).setAttribute(
                        "rel",
                        "stylesheet"
                      ),
                      t.setAttribute("type", "text/css"),
                      t.setAttribute("href", e),
                      (t.onload = function () {
                        s(e), (t.onload = null);
                      }),
                      document.head.appendChild(t)));
            })(t[c]);
        } else n(0);
      });
  })(window),
  (function (t) {
    "use strict";
    var a = [],
      l = [];
    ($mx.observe = function (e, t, n) {
      $mx(function () {
        t &&
          ($mx(e).each(function () {
            t.call(this, $mx(this));
          }),
          a.push([e, t])),
          n && l.push([e, n]);
      });
    }),
      $mx(function () {
        var e =
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver;

        function r(c, u) {
          for (var e = 0; e < u.length; e++) {
            var d;
            (function (t) {
              var e,
                n,
                i,
                o = u[t][0],
                s = [];
              for (d = 0; d < c.length; d++) {
                var r = c[d];
                if (1 === r.nodeType) {
                  (n = o),
                    (i = void 0),
                    (i =
                      (e = r).matches ||
                      e.matchesSelector ||
                      e.msMatchesSelector ||
                      e.mozMatchesSelector ||
                      e.webkitMatchesSelector ||
                      e.oMatchesSelector) &&
                      i.call(e, n) &&
                      s.push(r);
                  for (var a = r.querySelectorAll(o), l = 0; l < a.length; l++)
                    s.push(a[l]);
                }
              }
              if (!s.length) return;
              s.filter(function (e, t, n) {
                return n.indexOf(e) === t;
              }).forEach(function (e) {
                u[t][1].call(e, $mx(e));
              });
            })(e);
          }
        }
        $mx.isset(e) ||
          ((e = function (t) {
            (this.onAdded = function (e) {
              t([
                {
                  addedNodes: [e.target],
                  removedNodes: [],
                },
              ]);
            }),
              (this.onRemoved = function (e) {
                t([
                  {
                    addedNodes: [],
                    removedNodes: [e.target],
                  },
                ]);
              });
          }).prototype.observe = function (e) {
            e.addEventListener("DOMNodeInserted", this.onAdded),
              e.addEventListener("DOMNodeRemoved", this.onRemoved);
          }),
          new e(function (e) {
            var t = [],
              n = [];
            e.forEach(function (e) {
              t.push.apply(t, e.addedNodes), n.push.apply(n, e.removedNodes);
            });
            for (var i = 0, o = n.length; i < o; ++i) {
              var s = t.indexOf(n[i]);
              -1 < s && (t.splice(s, 1), n.splice(i--, 1));
            }
            r(t, a), r(n, l), (t.length = 0), (n.length = 0);
          }).observe(t.body, {
            childList: !0,
            subtree: !0,
          });
      });
  })(document, window),
  ($mx.scrollIt = scrollIt),
  ($mx.fn.scrollIt = function () {
    var e =
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 300,
      t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "y",
      n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
      i =
        3 < arguments.length && void 0 !== arguments[3]
          ? arguments[3]
          : "linear",
      o = arguments[4],
      s = arguments[5],
      r =
        6 < arguments.length && void 0 !== arguments[6]
          ? arguments[6]
          : {
              x: 0,
              y: 0,
            };
    return scrollIt(this[0], t, n, e, i, o, s, r), this;
  }),
  (window.dataLayer = window.dataLayer || []),
  gtag("js", new Date()),
  window.$events.on("statistic:event", function (e, t) {
    console.log("event:", t.name, t.params || null);
  }),
  (window.ecommerceEvent = null),
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      $events.on("tap", function (e, t) {
        var n,
          i = Date.now();
        "basic" != window.account.tariff_current &&
          t.stat &&
          ((n = $mx.param(
            Object.assign(
              {},
              {
                data: t.data,
                tms: i,
                url: document.location.href,
              }
            )
          )),
          null != navigator.sendBeacon
            ? navigator.sendBeacon("/api/stat/" + t.stat + "/ping.json?" + n)
            : $mx.get("/api/stat/" + t.stat + "/ping.json?" + n)),
          (t.tms = i),
          window.$events.fire("__tap", t);
      });
      var e,
        t,
        n = document.location.hash.match(/#paid:([a-zA-Z0-9\+\/\\\=]+)/);
      n &&
        ((t = []),
        null !=
          (e = decodeURIComponent(escape(window.atob(n[1]))).split(":"))[3] &&
          t.push({
            id: e[3],
            name: null == e[4] ? e[3] : e[4],
          }),
        (window.ecommerceEvent = {
          type: "purchase",
          id: e[0],
          budget: parseFloat(e[1]),
          currency: e[2],
          contents: t,
          content_type: "product",
        }),
        (document.location.hash = document.location.hash.replace(
          /#paid:([a-zA-Z0-9]+)/,
          ""
        )),
        console.log("paid:", window.ecommerceEvent));
    },
    {
      once: !0,
    }
  ),
  $mx.observe(".facebookpixel", function (e) {
    e.removeClass("facebookpixel"),
      null != window.account && null != window.account.cookies
        ? window.account.cookies.push(["target", facebookPixelInit, e])
        : facebookPixelInit(e);
  });
var google_index = 64,
  google_codes = [],
  googleTagsLoadedUrl = null;

function googleTagsInit(t) {
  var s = t.data();
  (googleTagsLoadedUrl =
    googleTagsLoadedUrl || "//googletagmanager.com/gtag/js?id=" + s.id),
    console.log("Init googletag:", s.id),
    $mx.lazy(googleTagsLoadedUrl, function () {
      var o = t.is(".googleanalytics-customer");
      gtag(
        "config",
        s.id,
        o
          ? {}
          : {
              user_id: s.uid,
            }
      ),
        $events.on("navigate", function (e, t) {
          gtag("config", s.id, {
            page_path: t.path,
          }),
            gtag("event", "page_view", {
              send_to: s.id,
            });
        }),
        o
          ? ($events.on("__tap", function (e, t) {
              var n;
              t.addons &&
                null != t.addons["googleanalytics-goal"] &&
                gtag(
                  "event",
                  (n = JSON.parse(t.addons["googleanalytics-goal"])).a,
                  {
                    event_category: n.c,
                    send_to: s.id,
                  }
                );
            }),
            $events.on("lead", function (e, t) {
              var n;
              t.addons &&
                null != t.addons["googleanalytics-goal"] &&
                gtag(
                  "event",
                  (n = JSON.parse(t.addons["googleanalytics-goal"])).a,
                  {
                    event_category: n.c,
                    send_to: s.id,
                  }
                );
            }))
          : window.$events.on(
              "statistic:event",
              function (e, t) {
                gtag("event", t.name, {
                  event_category: "taplink",
                  send_to: s.id,
                });
              },
              !0
            );

      function e(e, t) {
        var n = {
            transaction_id: t.id,
            affiliation: "Taplink",
            value: t.budget,
            currency: t.currency,
            send_to: s.id,
          },
          i =
            (i = document.location.host.split("."))[i.length - 2] +
            "." +
            i[i.length - 1];
        -1 == ["taplink.ru", "taplink.at"].indexOf(i) &&
          o &&
          gtag("event", "purchase", n);
      }
      $mx(document).on("paid", e),
        ecommerceEvent &&
          "purchase" == ecommerceEvent.type &&
          e(0, ecommerceEvent),
        $events.on("paid", e);
    });
}

function googleAnalyticsInit(n) {
  var s = n.data();
  $mx.lazy("//www.google-analytics.com/analytics.js", function () {
    if (null != window.ga) {
      google_index++;
      var o = String.fromCharCode(google_index);
      if (-1 == google_codes.indexOf(s.id)) {
        google_codes.push(s.id), console.log("Init googleanalytics:", s.id);
        var e = n.is(".googleanalytics-customer");
        if (
          (ga("create", s.id, "auto", o, e ? void 0 : s.uid),
          ga(o + ".send", "pageview"),
          null != s.require)
        )
          for (require = s.require.split(","), i = 0; i < require.length; i++)
            ga(o + ".require", require[i]);
        $events.on("navigate", function (e, t) {
          ga(o + ".set", "page", t.path), ga(o + ".send", "pageview");
        }),
          e
            ? ($events.on("__tap", function (e, t) {
                var n;
                t.addons &&
                  null != t.addons["googleanalytics-goal"] &&
                  ((n = JSON.parse(t.addons["googleanalytics-goal"])),
                  ga(o + ".send", "event", n.c, n.a));
              }),
              $events.on("lead", function (e, t) {
                var n;
                t.addons &&
                  null != t.addons["googleanalytics-goal"] &&
                  ((n = JSON.parse(t.addons["googleanalytics-goal"])),
                  ga(o + ".send", "event", n.c, n.a));
              }))
            : ($mx(document).on(
                "click",
                '[data-track-event="payment"]',
                function () {
                  ga(o + ".send", "event", "taplink", "payment");
                }
              ),
              $events.on(
                "statistic:event",
                function (e, t) {
                  ga(o + ".send", "event", "taplink", t.name);
                },
                !0
              ));

        function t(e, t) {
          ga(o + ".require", "ecommerce"),
            ga(o + ".ecommerce:addTransaction", {
              id: t.id,
              affiliation: "Taplink",
              revenue: t.budget,
              currency: t.currency,
            }),
            ga(o + ".ecommerce:send");
        }
        $mx(document).on("paid", t),
          ecommerceEvent &&
            "purchase" == ecommerceEvent.type &&
            t(0, ecommerceEvent),
          $events.on("paid", t);
      }
    }
  });
}

function linkedinPixelInit(e) {
  var t = e.data();
  console.log("Init LinkedIn pixel:", t.id),
    (_linkedin_partner_id = t.id),
    (window._linkedin_data_partner_ids =
      window._linkedin_data_partner_ids || []),
    window._linkedin_data_partner_ids.push(_linkedin_partner_id),
    window.lintrk ||
      ((window.lintrk = function (e, t) {
        window.lintrk.q.push([e, t]);
      }),
      (window.lintrk.q = [])),
    $mx.lazy("https://snap.licdn.com/li.lms-analytics/insight.min.js"),
    $events.on("navigate", function (e, t) {
      setTimeout(function () {
        window.lintrk("track");
      }, 0);
    }),
    $events.on("lead", function (e, t) {
      var n;
      t.addons &&
        null != t.addons["linkedinpixel-conversion"] &&
        ((n = JSON.parse(t.addons["linkedinpixel-conversion"])),
        window.lintrk("track", {
          conversion_id: n.id,
        }));
    }),
    $events.on("__tap", function (e, t) {
      var n;
      t.addons &&
        null != t.addons["linkedinpixel-conversion"] &&
        ((n = JSON.parse(t.addons["linkedinpixel-conversion"])),
        window.lintrk("track", {
          conversion_id: n.id,
        }));
    });
}

function snapchatPixelInit(e) {
  var t,
    n,
    i,
    o,
    s = e.data();
  console.log("Init Snapchat pixel:", s.id),
    (t = window),
    (n = document),
    t.snaptr ||
      (((i = t.snaptr =
        function () {
          i.handleRequest
            ? i.handleRequest.apply(i, arguments)
            : i.queue.push(arguments);
        }).queue = []),
      (r = n.createElement("script")),
      (r.async = !0),
      (r.src = "https://sc-static.net/scevent.min.js"),
      (o = n.getElementsByTagName("script")[0]).parentNode.insertBefore(r, o)),
    snaptr("init", s.id),
    snaptr("track", "PAGE_VIEW"),
    $events.on("navigate", function (e, t) {
      setTimeout(function () {
        snaptr("track", "PAGE_VIEW");
      }, 0);
    }),
    $events.on("lead", function (e, t) {
      var n;
      t.addons &&
        null != t.addons["snapchatpixel-goal"] &&
        ((n = JSON.parse(t.addons["snapchatpixel-goal"])), snaptr("track", n));
    }),
    $events.on("addToCart", function (e, t) {
      var n = t.product.price;
      _.each(t.options, function (e, t) {
        n += e.price;
      }),
        snaptr("track", "ADD_CART", {
          price: n,
          currency: t.currency,
        });
    }),
    $events.on("__tap", function (e, t) {
      var n;
      t.addons && null != t.addons["snapchatpixel-goal"]
        ? ((n = JSON.parse(t.addons["snapchatpixel-goal"])), snaptr("track", n))
        : t.data &&
          _.each(t.data, function (e) {
            e && e.event && snaptr("track", e.param);
          });
    });
}

function tiktokPixelInit(e) {
  var t = e.data();
  console.log("Init TikTok pixel:", t.id);
  window.TiktokAnalyticsObject = "ttq";
  var o = (window.ttq = window.ttq || []);
  (o.methods = [
    "page",
    "track",
    "identify",
    "instances",
    "debug",
    "on",
    "off",
    "once",
    "ready",
    "alias",
    "group",
    "enableCookie",
    "disableCookie",
  ]),
    (o.setAndDefer = function (e, t) {
      e[t] = function () {
        e.push([t].concat(Array.prototype.slice.call(arguments, 0)));
      };
    });
  for (var n = 0; n < o.methods.length; n++) o.setAndDefer(o, o.methods[n]);
  (o.instance = function (e) {
    for (var t = o._i[e] || [], n = 0; n < o.methods.length; n++)
      o.setAndDefer(t, o.methods[n]);
    return t;
  }),
    (o.load = function (e, t) {
      var n = "https://analytics.tiktok.com/i18n/pixel/events.js";
      (o._i = o._i || {}),
        (o._i[e] = []),
        (o._i[e]._u = n),
        (o._t = o._t || {}),
        (o._t[e] = +new Date()),
        (o._o = o._o || {}),
        (o._o[e] = t || {}),
        $mx.lazy(n + "?sdkid=" + e + "&lib=ttq");
    });
  var s = t.id;
  o.load(s),
    o.page(),
    $events.on("navigate", function (e, t) {
      setTimeout(function () {
        o.instance(s).page();
      }, 0);
    }),
    $events.on("lead", function (e, t) {
      var n;
      t.addons && null != t.addons["tiktokpixel-goal"]
        ? ((n = JSON.parse(t.addons["tiktokpixel-goal"])),
          o.instance(s).track("SubmitForm", {
            id: n,
          }))
        : o.instance(s).track("SubmitForm");
    }),
    $events.on("addToCart", function (e, t) {
      var n = t.product.price,
        i = [
          {
            content_id: "product:" + t.product_id,
            content_type: "product",
            quantity: 1,
            price: n,
          },
        ];
      __.each(t.options, function (e, t) {
        (n += e.price),
          i.push({
            content_id: "option:" + t,
            content_type: "product",
            quantity: 1,
            price: e.price,
          });
      }),
        o.instance(s).track("AddToCart", {
          value: n,
          currency: t.currency,
          contents: i,
        });
    }),
    $mx(document).on("click", '[data-track-event="payment"]', function () {
      o.instance(s).track("InitiateCheckout");
    }),
    $events.on("__tap", function (e, t) {
      var n, i;
      t.addons && null != t.addons["tiktokpixel-goal"]
        ? ((n = JSON.parse(t.addons["tiktokpixel-goal"])),
          o.instance(s).track("ClickButton", {
            content_type: "product",
            content_id: n,
          }))
        : t.data &&
          ((i = []),
          __.each(t.data, function (e) {
            e && e.event && i.push(e.event + ":" + e.param);
          }),
          __.each(__.uniq(i), function (e) {
            o.instance(s).track("ClickButton", {
              content_type: "product",
              content_id: e,
            });
          }));
    });
}

function topmailruInit(e) {
  var t = e.data();
  console.log("Init Top@Mail.ru:", t.id),
    (window._tmr || (window._tmr = [])).push({
      id: t.id,
      type: "pageView",
      start: new Date().getTime(),
    }),
    $mx.lazy("https://top-fwz1.mail.ru/js/code.js", function () {
      $events.on("navigate", function () {
        setTimeout(function () {
          window._tmr.pageView({
            id: t.id,
            url: location.href,
          });
        }, 0);
      }),
        $events.on("lead", function (e, t) {
          var n;
          t.addons &&
            null != t.addons["topmailru-goal"] &&
            (null == (n = JSON.parse(t.addons["topmailru-goal"])).type ||
            "event" == n.type
              ? window._tmr.sendEvent({
                  category: n.c,
                  action: n.a,
                  label: n.l,
                })
              : window._tmr.push({
                  type: "reachGoal",
                  goal: n.g,
                }));
        }),
        $events.on("__tap", function (e, t) {
          var n;
          t.addons &&
            null != t.addons["topmailru-goal"] &&
            (null == (n = JSON.parse(t.addons["topmailru-goal"])).type ||
            "event" == n.type
              ? window._tmr.sendEvent({
                  category: n.c,
                  action: n.a,
                  label: n.l,
                })
              : window._tmr.push({
                  type: "reachGoal",
                  goal: n.g,
                }));
        });
    });
}

function vkontaktePixelInit(e) {
  var t = e.data();
  console.log("Init Vkontakte pixel:", t.id),
    $mx.lazy("https://vk.com/js/api/openapi.js?169", function () {
      VK.Retargeting.Init(t.id), VK.Retargeting.Hit();
      $events.on("navigate", function () {
        setTimeout(function () {
          (VK._pData.url = location.href), VK.Retargeting.Hit();
        }, 0);
      }),
        $events.on("messenger", function (e, t) {
          VK.Goal("contact");
        }),
        $events.on("lead", function (e, t) {
          VK.Goal("lead");
        }),
        $events.on("addToCart", function (e, t) {
          var n = t.product.price;
          _.each(t.options, function (e, t) {
            n += e.price;
          }),
            VK.Goal("add_to_cart", {
              value: n,
            });
        }),
        $events.on("initiateCheckout", function (e, t) {
          VK.Goal("initiate_checkout", {
            value: t.value,
          });
        }),
        $events.on("search", function (e, t) {
          VK.Goal("search");
        }),
        $events.on("__tap", function (e, t) {
          var n;
          t.addons &&
            null != t.addons["vkontakte-goal"] &&
            ((n = JSON.parse(t.addons["vkontakte-goal"])),
            VK.Retargeting.Event(n)),
            t.data &&
              _.each(t.data, function (e) {
                e && e.event && VK.Retargeting.Event(e.event);
              });
        });
    });
}
$mx.observe(".googletags", function (e) {
  e.removeClass("googletags"),
    null != window.account && null != window.account.cookies
      ? window.account.cookies.push(["analytics", googleTagsInit, e])
      : googleTagsInit(e);
}),
  $mx.observe(".googleanalytics", function (e) {
    e.removeClass("googleanalytics"),
      null != window.account && null != window.account.cookies
        ? window.account.cookies.push(["analytics", googleAnalyticsInit, e])
        : googleAnalyticsInit(e);
  }),
  $mx.observe(".linkedinpixel", function (e) {
    e.removeClass("linkedinpixel"),
      null != window.account.cookies
        ? window.account.cookies.push(["target", linkedinPixelInit, e])
        : linkedinPixelInit(e);
  }),
  $mx.observe(".snapchatpixel", function (e) {
    e.removeClass("snapchatpixel"),
      null != window.account.cookies
        ? window.account.cookies.push(["target", snapchatPixelInit, e])
        : snapchatPixelInit(e);
  }),
  $mx.observe(".tiktokpixel", function (e) {
    e.removeClass("tiktokpixel"),
      null != window.account.cookies
        ? window.account.cookies.push(["target", tiktokPixelInit, e])
        : tiktokPixelInit(e);
  }),
  $mx.observe(".topmailru", function (e) {
    e.removeClass("topmailru"),
      null != window.account.cookies
        ? window.account.cookies.push(["analytics", topmailruInit, e])
        : topmailruInit(e);
  }),
  $mx.observe(".vkontaktepixel", function (e) {
    e.removeClass("vkontaktepixel"),
      null != window.account.cookies
        ? window.account.cookies.push(["target", vkontaktePixelInit, e])
        : vkontaktePixelInit(e);
  });
var metrika_index = 64,
  metrika_codes = [],
  stat_socials = {
    tk: {
      ua: /\s(BytedanceWebview|TikTok)/,
      domain: "tiktok.com",
    },
    ig: {
      ua: /\sInstagram\s/,
      domain: "instagram.com",
    },
    in: {
      domain: "linkedin.com",
    },
    vk: {
      domain: "vk.com",
    },
    tw: {
      ua: /\sTwitter/,
      domain: "t.co",
    },
    fb: {
      ua: /\[FBAN\//,
      domain: "facebook.com",
    },
    pt: {
      us: /\[Pinterest\//,
      domain: "pinterest.com",
    },
    yt: {
      domain: "youtube.com",
    },
    sn: {
      ua: /Snapchat\//,
      domain: "snapchat.com",
    },
    ln: {
      ua: /\sLine\//,
    },
    we: {
      ua: /\sWeixin\//,
    },
  },
  stat_social = null;

function yandexMetrikaInit(t) {
  var r = t.data();
  console.log("Init metrika: ", r.id, r);
  var e,
    a = r.format ? r.format : "tag";
  r.simple
    ? (44929738 == r.id &&
        $events.on("pageview", function (e, t) {
          var n, i, o, s, r;
          null != t.page_id &&
            null != t.profile_id &&
            ((n =
              "pages/" +
              t.profile_id.toString(16) +
              "/" +
              t.page_id.toString(16)),
            (o = [
              "la",
              (i = window.navigator).language
                ? i.language
                : i.userLanguage
                ? i.userLanguage
                : i.browserLanguage,
            ].join(":")),
            (s =
              "https://mc.yandex.ru/watch/84470437?page-ref=" +
              encodeURIComponent(document.referrer) +
              "&page-url=" +
              encodeURIComponent(
                "https://taplink.cloud/" +
                  n +
                  "/" +
                  (stat_social ? "?from=" + stat_social : "")
              ) +
              "&browser-info=" +
              encodeURIComponent(o) +
              "&rn=" +
              Math.random()),
            null != navigator.sendBeacon
              ? navigator.sendBeacon(s)
              : (r = $mx('<img class="stat" src="' + s + '">').load(
                  function () {
                    return r.remove();
                  }
                )).appendTo(document.body));
        }),
      $events.on("navigate", function () {
        console.log("stat navigate");
        var e = $mx(
          '<img class="stat" src="https://mc.yandex.ru/watch/' +
            r.id +
            "?page-ref=" +
            encodeURIComponent(document.referrer) +
            "&page-url=" +
            encodeURIComponent(
              document.location.origin + document.location.pathname
            ) +
            "&rn=" +
            Math.random() +
            '">'
        ).load(function () {
          return e.remove();
        });
        e.appendTo(document.body);
      }),
      $events.on("__tap", function (e, t) {
        var n, i;
        "basic" != window.account.tariff_current &&
          44929738 == r.id &&
          ((n =
            "https://mc.yandex.ru/watch/84470437?page-ref=" +
            encodeURIComponent(document.referrer) +
            "&page-url=" +
            encodeURIComponent(
              "https://taplink.cloud/block/" +
                t.page_id +
                "/" +
                t.block_id +
                (null != t.slot ? "/" + t.slot : "") +
                "/" +
                (stat_social ? "?from=" + stat_social : "")
            ) +
            "&rn=" +
            Math.random()),
          null != navigator.sendBeacon
            ? navigator.sendBeacon(n)
            : (i = $mx('<img class="stat" src="' + n + '">').load(function () {
                return i.remove();
              })).appendTo(document.body));
      }))
    : ((e = function () {
        var i, o, e, s;
        (i = document),
          (o = window),
          (s = t),
          (o[(e = "yandex_metrika_callbacks" + ("tag" == a ? "2" : ""))] =
            o[e] || []).push(function () {
            try {
              if (-1 != metrika_codes.indexOf(r.id)) return;
              metrika_codes.push(r.id),
                metrika_index++,
                (r.ecommerce =
                  "dataLayer_" + String.fromCharCode(metrika_index)),
                (window[r.ecommerce] = window[r.ecommerce] || []);
              var n = null;
              switch (a) {
                case "watch":
                  n = new Ya.Metrika(r);
                  break;
                case "tag":
                  n = new Ya.Metrika2(r);
              }
              o["yaCounter" + r.id] = n;
              var e;
              $events.on("navigate", function (e, t) {
                n.hit(t.path);
              }),
                s.is(".yandexmetrika-customer")
                  ? (window.$events.on("__tap", function (e, t) {
                      t.addons &&
                        t.addons["yandexmetrika-goal"] &&
                        n.reachGoal(t.addons["yandexmetrika-goal"]);
                    }),
                    $events.on("lead", function (e, t) {
                      n.reachGoal("ym-submit-leadform"),
                        t.addons &&
                          null != t.addons["yandexmetrika-goal"] &&
                          n.reachGoal(t.addons["yandexmetrika-goal"]);
                    }),
                    $mx(document)
                      .on("paid", function () {
                        n.reachGoal("ym-purchase");
                      })
                      .on("click", '[data-track-event="payment"]', function () {
                        n.reachGoal("ym-open-leadform");
                      }),
                    $events.on("paid", function () {
                      n.reachGoal("ym-purchase");
                    }))
                  : ($mx(i).on(
                      "click",
                      '[data-track-event="payment"]',
                      function () {
                        n.reachGoal("payment");
                      }
                    ),
                    window.$events
                      .on(
                        "statistic:event",
                        function (e, t) {
                          n.reachGoal(t.name);
                        },
                        !0
                      )
                      .on("account:updated", function () {
                        e();
                      }),
                    (e = function () {
                      null != window.account &&
                        window.account.profile_id &&
                        n.setUserID(window.account.profile_id);
                    })());

              function t(e, t) {
                var n = {
                  ecommerce: {},
                };
                null != t.currency && (n.ecommerce.currencyCode = t.currency),
                  (n.ecommerce[t.type] = {
                    products: t.products,
                  }),
                  "purchase" == t.type &&
                    (n.ecommerce[t.type].actionField = {
                      id: t.id,
                      revenue: t.budget,
                    }),
                  window[r.ecommerce].push(n);
              }
              $mx(i).on("paid", t),
                ecommerceEvent &&
                  "purchase" == ecommerceEvent.type &&
                  t(0, ecommerceEvent);
            } catch (e) {}
          }),
          $mx.lazy(
            "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/" + a + ".js"
          );
      }),
      r.lazy ? setTimeout(e, 3e3) : e());
}
_.each(stat_socials, function (e, t) {
  !stat_social &&
    ((e.ua && navigator.userAgent.match(e.ua)) ||
      (e.domain &&
        document.referrer.match(
          new RegExp(
            "\\/\\/([a-z]+\\.)?" + e.domain.replace(".", "\\.") + "[\\/]?"
          )
        ))) &&
    (stat_social = t),
    !stat_social &&
      window.location.search.match(/[\?\&]from=qr/) &&
      (stat_social = "qr"),
    !stat_social &&
      window.location.search.match(/[\?\&]from=widget/) &&
      (stat_social = "wg");
}),
  $mx.observe(".yandexmetrika", function (e) {
    e.removeClass("yandexmetrika"),
      null != window.account && null != window.account.cookies
        ? window.account.cookies.push(["analytics", yandexMetrikaInit, e])
        : yandexMetrikaInit(e);
  }),
  $mx(document).ready(function () {
    $mx("body").append(
      '<div style="position:absolute;top:-1000px;z-index: -1"><div id="autoResizeTextareaCopy" style="white-space:pre-wrap;box-sizing: border-box; -moz-box-sizing: border-box;  -ms-box-sizing: border-box; -webkit-box-sizing: border-box; visibility: hidden;"></div></div>'
    );
    var l = $mx("#autoResizeTextareaCopy");

    function n(e) {
      var t = e.is("textarea"),
        n = getComputedStyle(e[0]);
      l.css({
        fontFamily: n.getPropertyValue("font-family"),
        fontSize: n.getPropertyValue("font-size"),
        lineHeight: n.getPropertyValue("line-height"),
        padding: n.getPropertyValue("padding"),
        paddingLeft: n.getPropertyValue("padding-left"),
        paddingRight: n.getPropertyValue("padding-right"),
        paddingTop: n.getPropertyValue("padding-top"),
        paddingBottom: n.getPropertyValue("padding-bottom"),
        overflow: "hidden",
        width: t ? e.css("width") : null,
      });
      var o = e.val() || e.attr("placeholder") || "";
      if (
        e.hasAttr("rows") &&
        (!e.closest(".has-form-compact").length ||
          e.is(".is-ignore-form-compact"))
      ) {
        var s = o.replace(/[^\n]*/g, "").length + 1;
        for (i = 0; i < parseInt(e.attr("rows")) - s; i++) o += "\n";
      }
      (o = o
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br/>")),
        l.html(o + (t ? "<br />" : ""));
      var r,
        a = l.outerHeight();
      e.css("height", a),
        t
          ? 0 != parseInt(a) && e.css("overflow-y", "hidden")
          : ((r = l.outerWidth()), e.css("width", r));
    }
    $mx.fn.autoResize = function (e) {
      var t = $mx(this);
      t.on(
        "keyup keydown keypress change paste input cut paste focus",
        function () {
          n(t);
        }
      ),
        n(t);
    };
  }),
  $mx.observe(".autoresize-init", function (e) {
    setTimeout(function () {
      e.autoResize();
    }, 150);
  });
var Device = {
  install: function (e) {
    e.prototype.$device = d = e.observable({
      mobile: !1,
      desktop: !1,
      lg: !1,
      md: !1,
      sm: !1,
      class: "",
    });

    function t() {
      var e = window.matchMedia,
        t = !!e("(max-width: 767px)").matches;
      (d.mobile = t),
        (d.desktop = !t),
        (d.lg = !!e("(min-width: 1200px)").matches),
        (d.md = !!e("(min-width: 992px)").matches),
        (d.sm = !!e("(min-width: 768px)").matches),
        (d.class = d.lg ? "lg" : d.md ? "md" : d.sm ? "sm" : "xs"),
        (document.documentElement.className =
          document.documentElement.className
            .replace(/\bis\-device\-[a-z]+/, "")
            .trim() +
          " is-device-" +
          (t ? "mobile" : "desktop"));
    }
    t(), $mx(window).on("resize orientationchange", t);
    var n = navigator.userAgent;
    (d.isSafari = -1 != n.indexOf("Safari/")),
      (d.isChrome = -1 != n.indexOf("Chrome/")),
      (d.isMobile = -1 != n.indexOf("Mobile/")),
      (d.isOpera =
        -1 != n.indexOf("Opera/") ||
        -1 != n.indexOf("OPR/") ||
        -1 != n.indexOf("OPT/")),
      (d.isInstagram = -1 != n.indexOf("Instagram")),
      (window.$device = d);
  },
};
null != window.Vue && Vue.use(Device);
var m = document
    .querySelector("link[type='text/css']")
    .href.match(/\?([0-9\.]+)/),
  scriptsVersion = m ? m[0] : "";

function nope() {}

function prepareTimezones() {
  for (
    var n = [],
      i = new Date(),
      o = i.getTimezoneOffset() / 60,
      s = i.getTime(),
      e = -12;
    e <= 13;
    e++
  ) {
    var t = [];
    switch (e) {
      case 4:
      case 5:
      case 6:
      case 9:
      case 10:
        t = [e, e + 0.5];
        break;
      case -9:
      case -2:
      case -3:
        t = [e - 0.5, e];
        break;
      case 5:
      case 8:
      case 12:
      case 13:
        t = [e, e + 0.75];
        break;
      default:
        t = [e];
    }
    __.each(t, function (e) {
      i.setTime(s - 3600 * (-o - e) * 1e3);
      var t = e - Math.floor(e);
      n.push({
        k: e,
        v:
          window.$vue.$datetime(i) +
          ", (Etc/GMT" +
          (0 <= e ? "+" : "-") +
          (Math.abs(e) < 10 ? "0" : "") +
          Math.floor(Math.abs(e)) +
          ":" +
          (t ? 60 * t : "00") +
          ")",
      });
    });
  }
  return n;
}

function showLightboxPicture(e) {
  $mx.lazy(
    "//cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js",
    "//cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.css",
    function () {
      basicLightbox.create('<img src="' + e + '">').show();
    }
  );
}

function go(e) {
  void 0 === e && (e = document.location.href),
    (i = e.indexOf("#")),
    -1 != i && (e = e.substr(0, i)),
    (document.location = e);
}

function checkHeightCSS() {
  var e = 0.01 * window.innerHeight;
  document.documentElement.style.setProperty("--vh", e + "px");
}
(String.prototype.trim = function () {
  return this.replace(/^\s*/, "").replace(/\s*$/, "");
}),
  $mx(function () {
    var e;
    $mx(document.body).on("click", 'a[href="#"]', function (e) {
      e.preventDefault();
    }),
      -1 != document.location.hash.indexOf("#event=") &&
        ((e = document.location.hash.split("=")),
        $mx('[href="#' + e[1] + '"]').click()),
      $mx(document.body).on("keydown", ".skip-enter", function (e) {
        if (13 == e.keyCode) return e.preventDefault(), !1;
      });
  }),
  (function () {
    "use strict";
    var c,
      u,
      d,
      i = window,
      o = document;

    function s(e) {
      for (var t = e._util, n = 0; n < t.count; n++) {
        var i = t.elements[n];
        ((function (e, t) {
          var n = e.getBoundingClientRect();
          if (t.container && Element.prototype.closest) {
            var i = e.closest(t.containerClass);
            if (i) {
              var o = i.getBoundingClientRect();
              if (h(o, u)) {
                var s = o.top - t.offset,
                  r = o.right + t.offset,
                  a = o.bottom + t.offset,
                  l = o.left - t.offset,
                  c = {
                    top: s > u.top ? s : u.top,
                    right: r < u.right ? r : u.right,
                    bottom: a < u.bottom ? a : u.bottom,
                    left: l > u.left ? l : u.left,
                  };
                return h(n, c);
              }
              return !1;
            }
          }
          return h(n, u);
        })(i, e.options) ||
          $mx(i).hasClass(e.options.successClass)) &&
          (e.load($mx(i)), t.elements.splice(n, 1), t.count--, n--);
      }
    }

    function h(e, t) {
      return (
        e.right >= t.left &&
        e.bottom >= t.top &&
        e.left <= t.right &&
        e.top <= t.bottom
      );
    }

    function p(t, e) {
      t.addClass(e.successClass),
        e.success && e.success(t),
        t.removeAttr(e.src).removeAttr(e.srcset),
        _.each(e.breakpoints, function (e) {
          $mx(t).removeAttr(e.src);
        });
    }

    function f(e, t, n) {
      n ? e.attr("srcset", n) : e.attr("src", t);
    }

    function r(e) {
      (u.bottom = (i.innerHeight || o.documentElement.clientHeight) + e),
        (u.right = (i.innerWidth || o.documentElement.clientWidth) + e);
    }
    i.Blazy = function (e) {
      var t = this,
        n = (t._util = {
          elements: [],
          count: 0,
          destroyed: !0,
        });
      (t.options = _.merge(
        {
          error: !1,
          offset: 100,
          root: o,
          success: !1,
          selector: ".lazy",
          separator: "|",
          errorClass: "has-error",
          breakpoints: !1,
          loadInvisible: !1,
          successClass: "is-loaded",
          validateDelay: 25,
          srcset: "data-srcset",
          src: "data-src",
        },
        e || {}
      )),
        (t.options.saveViewportOffsetDelay =
          t.options.saveViewportOffsetDelay || 50),
        (t.options.containerClass = t.options.container),
        (t.options.container =
          !!t.options.containerClass && $mx(t.options.containerClass)),
        (d = 1 < i.devicePixelRatio),
        (u = {
          top: 0 - t.options.offset,
          left: 0 - t.options.offset,
        }),
        (t.revalidate = function () {
          s(t);
        }),
        (t.load = function (e, t) {
          !(function (e, t, n) {
            {
              var i, o, s, r, a, l;
              !e.hasClass(n.successClass) &&
                (t ||
                  n.loadInvisible ||
                  (0 < e[0].offsetWidth && 0 < e[0].offsetHeight)) &&
                ((i = e.attr(c) || e.attr(n.src))
                  ? ((o = i.split(n.separator)),
                    (s = o[d && 1 < o.length ? 1 : 0]),
                    (r = e.attr(n.srcset)),
                    (a = e.is("img")),
                    e.parent(),
                    a || void 0 === e[0].src
                      ? ((l = $mx(new Image()))
                          .one("error", function () {
                            n.error && n.error(e, "invalid"),
                              e.addClass(n.errorClass);
                          })
                          .one("load", function () {
                            a
                              ? f(e, s, r)
                              : e.is(".is-mask")
                              ? e
                                  .css("mask-image", 'url("' + s + '")')
                                  .css("-webkit-mask-image", 'url("' + s + '")')
                              : e.css("background-image", 'url("' + s + '")'),
                              p(e, n);
                          }),
                        f(l, s, r))
                      : ((e[0].src = s), p(e, n)))
                  : (e.trigger("lazy-hit"),
                    n.error && n.error(e, "missing"),
                    e.addClass(n.successClass)));
            }
          })(e, t, this.options);
        }),
        (t.destroy = function () {
          var e = t._util;
          t.options.container &&
            t.options.container.off("scroll lazy", e.validateT),
            $mx(i)
              .off("scroll resize lazy", e.validateT)
              .off("resize", e.saveViewportOffsetT),
            (e.count = 0),
            (e.elements.length = 0),
            (e.destroyed = !0);
        }),
        (n.validateT = _.debounce(function () {
          s(t);
        }, t.options.validateDelay)),
        (n.saveViewportOffsetT = _.debounce(function () {
          r(t.options.offset);
        }, t.options.saveViewportOffsetDelay)),
        r(t.options.offset),
        _.each(t.options.breakpoints, function (e) {
          if (e.width >= i.screen.width) return (c = e.src), !1;
        }),
        (function (e) {
          var t = e._util;
          t.destroyed &&
            ((t.destroyed = !1),
            e.options.container &&
              e.options.container.on("scroll lazy", t.validateT),
            $mx(i)
              .on("resize", t.saveViewportOffsetT)
              .on("resize scroll lazy", t.validateT));
          s(e);
        })(t),
        $mx.observe(
          t.options.selector,
          function (e) {
            n.elements.push(e[0]),
              n.count++,
              e.is(".lazy-force") ? t.load(e) : n.validateT(),
              e.one("lazy-force", function () {
                t.load(e);
              });
          },
          function (e) {
            var t = n.elements.indexOf(e[0]);
            -1 != t && (n.elements.splice(t, 1), n.count--);
          }
        );
    };
  })(),
  $mx(function () {
    new Blazy({
      loadInvisible: !0,
      offset: 200,
      success: function (e) {
        $mx(e).trigger("loaded");
      },
    });
  }),
  null != window.Vue &&
    Vue.directive("mask", {
      twoWay: !0,
      bind: function (n, e) {
        var i = e.value,
          o = i.preg ? new RegExp("[^" + i.preg + "]+", "g") : null;
        (this.handler = function () {
          var e,
            t = n.value;
          if (null != i.transform)
            switch (i.transform) {
              case "lower":
                t = t.toLowerCase();
                break;
              case "upper":
                t = t.toUpperCase();
            }
          o && (t = t.replace(o, "")),
            n.value != t &&
              ((n.value = t),
              (e = document.createEvent("HTMLEvents")).initEvent(
                "input",
                !0,
                !0
              ),
              n.dispatchEvent(e));
        }.bind(this)),
          n.addEventListener("input", this.handler);
      },
      unbind: function (e) {
        e.removeEventListener("input", this.handler);
      },
    }),
  (function (e, t) {
    var n, i;
    "object" ===
      ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) &&
    "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self),
        (n = e.Cookies),
        ((i = e.Cookies = t()).noConflict = function () {
          return (e.Cookies = n), i;
        }));
  })(this, function () {
    "use strict";

    function r(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) e[i] = n[i];
      }
      return e;
    }
    var l = {
      read: function (e) {
        return e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      },
      write: function (e) {
        return encodeURIComponent(e).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        );
      },
    };
    return (function t(a, s) {
      function n(e, t, n) {
        if ("undefined" != typeof document) {
          "number" == typeof (n = r({}, s, n)).expires &&
            (n.expires = new Date(Date.now() + 864e5 * n.expires)),
            n.expires && (n.expires = n.expires.toUTCString()),
            (e = encodeURIComponent(e)
              .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
              .replace(/[()]/g, escape)),
            (t = a.write(t, e));
          var i = "";
          for (var o in n)
            n[o] &&
              ((i += "; " + o),
              !0 !== n[o] && (i += "=" + n[o].toString().split(";")[0]));
          return (document.cookie = e + "=" + t + i);
        }
      }
      return Object.create(
        {
          set: n,
          get: function (e) {
            if ("undefined" != typeof document && (!arguments.length || e)) {
              for (
                var t = document.cookie ? document.cookie.split("; ") : [],
                  n = {},
                  i = 0;
                i < t.length;
                i++
              ) {
                var o = t[i].split("="),
                  s = o.slice(1).join("=");
                '"' === s[0] && (s = s.slice(1, -1));
                try {
                  var r = l.read(o[0]);
                  if (((n[r] = a.read(s, r)), e === r)) break;
                } catch (e) {}
              }
              return e ? n[e] : n;
            }
          },
          remove: function (e, t) {
            n(
              e,
              "",
              r({}, t, {
                expires: -1,
              })
            );
          },
          withAttributes: function (e) {
            return t(this.converter, r({}, this.attributes, e));
          },
          withConverter: function (e) {
            return t(r({}, this.converter, e), this.attributes);
          },
        },
        {
          attributes: {
            value: Object.freeze(s),
          },
          converter: {
            value: Object.freeze(a),
          },
        }
      );
    })(l, {
      path: "/",
      sameSite: "lax",
    });
  }),
  (function (t) {
    "use strict";
    var n =
      null == t.account ||
      null == t.account.status_id ||
      3 != t.account.status_id;
    t.Firewall = {
      checkHTML: function (e) {
        return (
          n &&
            ((e = (e = (e = (e = (e = (e = (e = (e = (e = (e = " " + e).replace(
              /data:text\/javascript;base64,(.*)?(['"])/g,
              "data:text/javascript,void(null)$2"
            )).replace(/(document|window)\.location\.assign/g, "void")).replace(
              /(document|window)\.location\.replace/g,
              "void"
            )).replace(
              /(document|window)\.location\.href\s*=/g,
              "var href ="
            )).replace(
              /(document|window)\.location\s*=/g,
              "var href ="
            )).replace(/\slocation\s*=/g, "var href =")).replace(
              /\slocation\.href\s*=/g,
              "var href ="
            )).replace(/http\-equiv=[\"\']?refresh[\"\']?/g, "")).replace(
              /(<base)/g,
              "<div-base"
            )),
            $mx("html").is(".is-app") &&
              (e = e.replace(/(<script)/g, "<div-script"))),
          e
        );
      },
    };
    var i = document.write,
      o = window.atob;
    (document.write = function (e) {
      (e = e.replace(/http\-equiv=[\"\']?refresh[\"\']?/g, "")),
        i.call(document, e);
    }),
      (window.atob = function (e) {
        return t.Firewall.checkHTML(o(e));
      }),
      n && (window.eval = function (e) {});
  })((document, window)),
  window.addEventListener("resize", checkHeightCSS),
  window.addEventListener("touchmove", checkHeightCSS),
  window.addEventListener("load", checkHeightCSS),
  checkHeightCSS(),
  $mx(checkHeightCSS),
  $mx.observe(".map-view-init", function (a) {
    $mx.lazy("map.js", "map.css", function () {
      var e = a.data(),
        t = JSON.parse(a.find('script[type="text/data"]').text()),
        n = JSON.parse(a.find('script[type="text/markers"]').text());
      e.showZoom && a.addClass("map-view-with-zoom-control");
      var i = L.map(a[0], {
        dragging: !e.isFixed,
        doubleClickZoom: !e.isFixed,
        boxZoom: !e.isFixed,
        touchZoom: !e.isFixed,
        scrollWheelZoom: !e.isFixed,
        doubleClickZoom: !e.isFixed,
        zoomControl: !0,
        attributionControl: !1,
      }).setView([parseFloat(t.center.lat), parseFloat(t.center.lng)], t.zoom);
      t.bounds && i.fitBounds(t.bounds),
        L.control
          .attribution({
            prefix: "",
          })
          .addTo(i),
        L.tileLayer("/maps/{z}/{x}/{y}.png", {
          attribution:
            '<a href="https://taplink.cc" target="_blank">Taplink</a> <span style="color:#ccc">|</span> <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
          crossOrigin: !0,
        }).addTo(i);
      for (
        var o = L.icon({
            iconUrl: "/s/i/marker.png",
            iconSize: [28, 37],
            popupAnchor: [0, -10],
            shadowUrl: "/s/i/marker-shadow.png",
            shadowSize: [40, 50],
            shadowAnchor: [12, 31],
          }),
          s = (i.getBounds(), 0);
        s < n.length;
        s++
      ) {
        var r = n[s];
        L.marker([parseFloat(r.lat), parseFloat(r.lng)], {
          icon: o,
        })
          .addTo(i)
          .bindPopup(
            "<b>" +
              r.title +
              "</b>" +
              (r.text ? "<div>" + r.text.replace(/\n/g, "<br>") + "</div>" : "")
          );
      }
    });
  }),
  (window.$musicplayer = {
    parse: function (e) {
      pregs = [
        {
          s: "/soundcloud.com/(.*)/g",
        },
      ];
      for (i = 0; i < pregs.length; i++)
        if ((r = e.match(pregs[i])))
          return (
            "https://w.soundcloud.com/player/?url=" +
            e +
            "&color=d81946&theme_color=d81946&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&like=false&sharing=false&download=false&buying=false&text_buy_track=false&visual=true"
          );
    },
  }),
  $mx.observe(
    '[type="tel"]',
    function (s) {
      var r, t;
      ((!s.is(".skip-init") && s.closest(".form-field").length) ||
        s.is(".need-init")) &&
        (s.addClass("skip-init"),
        (r = null),
        (t = s.data("val") || s.val()),
        s.val(t),
        $mx.lazy("phone.js", function () {
          var e = s.data("country");
          (r = intlTelInput(s[0], {
            initialCountry: e || "auto",
            defaultCountry: e || "auto",
            preferredCountries: [e],
            separateDialCode: !0,
            autoHideDialCode: !1,
            nationalMode: !0,
          })),
            (s[0].iti = r),
            s.on("open:countrydropdown", function () {
              $mx(".iti--container").addClass("in");
              $mx("html").addClass("is-clipped"),
                $mx(".iti__country-list .iti__header").length ||
                  $mx(".iti__country-list").prepend(
                    $mx(
                      '<div class="iti__header"><div>' +
                        s.data("title") +
                        '</div><button type="button" class="modal-close is-small"></button></div>'
                    )
                  );
            }),
            s.on("close:countrydropdown", function () {
              $mx(".iti--container").removeClass("in"),
                $mx("html").removeClass("is-clipped");
            }),
            s
              .attr("mx-input-type", "phone")
              .addClass("mx-validate")
              .on("change keyup keydown keypress countrychange", function (e) {
                var t =
                    (t = e.target.value.trim().replace(/[^0-9\+]/g, "")) || "",
                  n = r.getSelectedCountryData();
                null != n.dialCode &&
                  t.substr(0, n.dialCode.toString().length + 1) ==
                    "+" + n.dialCode &&
                  ((t = t.substr(n.dialCode.toString().length + 1)),
                  r.setNumber(t)),
                  null != n.dialCode && "+" + n.dialCode == t && (t = "");
                var i = r.isValidNumber() || "" == t,
                  o = s.closest(".iti").parent().find(".tel-code");
                (t = r
                  .getNumber()
                  .toString()
                  .trim()
                  .replace(/[^0-9\+]/g, "")),
                  o.val() != t &&
                    o.val(t).trigger("change", {
                      value: r
                        .getNumber()
                        .toString()
                        .trim()
                        .replace(/[^0-9\+]/g, ""),
                    }),
                  s
                    .closest(".iti")
                    .parent()
                    .find(".tel-valid")
                    .val(i ? 1 : 0)
                    .trigger("change");
              })
              .on("blur", function (e) {
                var t = e.target.value.trim().replace(/[^0-9\+]/g, "");
                r.setNumber(t);
              }),
            r.setNumber(t),
            s.trigger("change");
        }));
    },
    function (e) {
      null != e[0].iti && e[0].iti && e[0].iti.destroy();
    }
  ),
  $mx.observe(".has-scroll-emulate", function (n) {
    var i, o, s, t;
    "ontouchstart" in document.documentElement ||
      ((o = i = null),
      (s = !1),
      (t = function (e) {
        var t;
        n.closest(".stop-scroll-emulate").length ||
          ((t = (e.clientX || e.changedTouches[0].clientX) - i),
          10 < Math.abs(t) &&
            ((n[0].scrollLeft = o - t),
            n.trigger("wheel"),
            (s = !0),
            n.addClass("is-emulate-moving")));
      }),
      n.on("click", function (e) {
        s && (e.preventDefault(), e.stopPropagation());
      }),
      n.on("mousedown", function (e) {
        (i = e.clientX || e.changedTouches[0].clientX),
          (o = n[0].scrollLeft),
          e.preventDefault(),
          (s = !1),
          n.on("mousemove", t),
          $mx(window).one("mouseup", function (e) {
            n.off("mousemove", t),
              setTimeout(function () {
                n.removeClass("is-emulate-moving");
              }, 50);
          });
      }));
  }),
  (Storage = {
    get: function (e, t) {
      var n = void 0;
      try {
        if (this.hasStorage() && (n = localStorage.getItem(e))) {
          if (
            (n = JSON.parse(n)).expired_at &&
            (n.expired_at < Date.now() / 1e3) | 0
          )
            return void localStorage.removeItem(e);
          n = n.content;
        }
      } catch (e) {
        n = void 0;
      }
      return null == n && (n = Cookies.get(e)), null != n ? n : t;
    },
    delete: function (e) {
      console.log(e), this.hasStorage() && localStorage.removeItem(e);
    },
    set: function (e, t, n, i) {
      try {
        var o;
        this.hasStorage()
          ? ((o = {
              content: t,
            }),
            null != n && (o.expired_at = ((Date.now() / 1e3) | 0) + n),
            localStorage.setItem(e, JSON.stringify(o)))
          : Cookies.set(e, t, {
              expires: n,
              path: i || "/",
            });
      } catch (e) {}
    },
    hasStorage: function () {
      return "localStorage" in window && window.localStorage;
    },
  });
var globalFonts = {
    0: {
      n: "Roboto",
      f: "sans-serif",
      w: "100,400,700",
    },
    1: {
      n: "Lobster",
      f: "cursive",
      w: "400,400,700",
    },
    2: {
      n: "Pacifico",
      f: "cursive",
      w: "400,400,700",
    },
    3: {
      n: "Caveat",
      f: "cursive",
      w: "400,400,700",
    },
    4: {
      n: "Montserrat Alternates",
      f: "sans-serif",
      heading_uppercase1: !0,
    },
    5: {
      n: "Kelly Slab",
      f: "cursive",
      w: "400,400,700",
    },
    6: {
      n: "Pangolin",
      f: "cursive",
      w: "400,400,700",
    },
    7: {
      n: "Oswald",
      f: "sans-serif",
      heading_uppercase1: !0,
    },
    8: {
      n: "Open Sans Condensed",
      f: "sans-serif",
      w: "300,300,700",
    },
    9: {
      n: "Amatic SC",
      f: "cursive",
      w: "400,400,700",
      heading_uppercase1: !0,
    },
    10: {
      n: "Merriweather",
      f: "serif",
      w: "300,400,700",
    },
    11: {
      n: "Comfortaa",
      f: "cursive",
      w: "300,500,700",
    },
    12: {
      n: "PT Mono",
      f: "monospace",
      w: "400,400,700",
    },
    13: {
      n: "Open Sans",
      f: "sans-serif",
      w: "300,400,700",
    },
    14: {
      n: "Alice",
      f: "cursive",
      w: "400,400,700",
      heading_uppercase1: !0,
    },
    15: {
      n: "IBM Plex Sans",
      f: "sans-serif",
      heading_uppercase1: !0,
    },
    16: {
      n: "Raleway",
      f: "sans-serif",
      heading_uppercase1: !0,
    },
    17: {
      n: "PT Sans",
      f: "sans-serif",
      w: "400,400,700",
    },
    18: {
      n: "PT Serif",
      f: "serif",
      w: "400,400,700",
    },
    19: {
      n: "Lato",
      f: "sans-serif",
      w: "300,400,700",
    },
    20: {
      n: "Roboto Slab",
      f: "serif",
    },
    21: {
      n: "Playfair Display",
      f: "serif",
      w: "400,600,900",
    },
    22: {
      n: "Cormorant Garamond",
      f: "serif",
      w: "300,500,700",
    },
    23: {
      n: "Russo One",
      f: "sans-serif",
      w: "400,400,700",
      heading_uppercase1: !0,
    },
    24: {
      n: "Source Sans Pro",
      f: "sans-serif",
    },
    25: {
      n: "Montserrat",
      f: "sans-serif",
    },
    26: {
      n: "Tajawal",
      f: "sans-serif",
    },
    27: {
      n: "Comic Sans MS",
      f: "sans-serif",
      system: !0,
    },
    28: {
      n: "Impact",
      f: "sans-serif",
      system: !0,
    },
    29: {
      n: "Helvetica",
      f: "sans-serif",
      system: !0,
    },
    30: {
      n: "Helvetica Neue",
      f: "sans-serif",
      system: !0,
    },
  },
  isSupportsWoff2 = null;

function getDominantColor(i) {
  return new Promise(function (h, e) {
    function t(e) {
      var d = new Image();
      (d.onload = function () {
        var e = document.createElement("canvas"),
          t = e.getContext("2d");
        (e.width = Math.min(d.width, 512)),
          (e.height = (d.height / d.width) * e.width),
          t.drawImage(d, 0, 0, e.width, e.height);
        for (
          var n,
            i,
            o,
            s,
            r,
            a = t.getImageData(0, 0, e.width, e.height).data,
            l = {},
            c = [0, 0],
            u = 0;
          u < a.length;
          u += 4
        ) {
          0 === a[u + 3]
            ? c[0]++
            : (c[1]++,
              (n = a[u]),
              (i = a[u + 1]),
              (o = a[u + 2]),
              (s =
                "#" +
                n.toString(16).padStart(2, 0) +
                i.toString(16).padStart(2, 0) +
                o.toString(16).padStart(2, 0)) in l
                ? l[s]++
                : (l[s] = 1));
        }
        c[0] > c[1]
          ? h(null)
          : ((r = Object.keys(l).reduce(function (e, t) {
              return l[e] > l[t] ? e : t;
            })),
            h(r));
      }),
        (d.src = e);
    }
    var n;
    _.isObject(i)
      ? (((n = new FileReader()).onload = function (e) {
          t(e.target.result);
        }),
        n.readAsDataURL(i))
      : t(i);
  });
}

function hexToRgba(e) {
  var t = [255, 255, 255, 255];
  return (
    e &&
      ((e = ColorsFactory.normalize(e).replace("#", "")),
      (t = (t = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?/i.exec(e))
        ? [
            parseInt(t[1], 16),
            parseInt(t[2], 16),
            parseInt(t[3], 16),
            parseInt(t[4] || "ff", 16),
          ]
        : [255, 255, 255, 255])),
    t
  );
}

function hsl2rgb(e, t, n) {
  if (((e /= 360), (n /= 100), 0 === (t /= 100))) {
    var i = Math.round(255 * n);
    return [i, i, i];
  }

  function o(e, t, n) {
    return (
      n < 0 && (n += 1),
      1 < n && --n,
      n < 1 / 6
        ? e + 6 * (t - e) * n
        : n < 0.5
        ? t
        : n < 2 / 3
        ? e + (t - e) * (2 / 3 - n) * 6
        : e
    );
  }
  var s = n < 0.5 ? n * (1 + t) : n + t - n * t,
    r = 2 * n - s;
  return [
    Math.round(255 * o(r, s, e + 1 / 3)),
    Math.round(255 * o(r, s, e)),
    Math.round(255 * o(r, s, e - 1 / 3)),
  ];
}

function hexToRgb(e) {
  var t =
    1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "string";
  if (null == e) return null;
  var n = hexToRgba(e);
  switch ((n.pop(), t)) {
    case "hash":
      return {
        r: n[0],
        g: n[1],
        b: n[2],
      };
    case "array":
      return n;
    default:
      return n.join(",");
  }
}

function rgb2hex(e) {
  return "string" == typeof e && "#" == e.substr(0, 1)
    ? e
    : ("object" == (void 0 === e ? "undefined" : _typeof2(e)) &&
        (e = e.join(",")),
      "#" +
        e
          .match(/\d+/g)
          .map(function (e) {
            return (+e).toString(16).padStart(2, 0);
          })
          .join(""));
}
var rgba2hex = function (e) {
  return "string" == typeof e && "#" == e.substr(0, 1)
    ? e
    : ("object" == (void 0 === e ? "undefined" : _typeof2(e)) &&
        (e = e.join(",")),
      "#" +
        e
          .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
          .slice(1)
          .map(function (e, t) {
            return (3 === t ? Math.round(255 * parseFloat(e)) : parseFloat(e))
              .toString(16)
              .padStart(2, "0")
              .replace("NaN", "");
          })
          .join(""));
};

function isTransparentColor(e) {
  return (
    null != e &&
    ("transparent" == (e = e.toString().replace("#", "")) ||
      (8 == e.length && "00" == e.substr(6, 2)))
  );
}

function color2Digs(e) {
  var t = [255, 255, 255];
  e &&
    (3 == (e = e.toString().trim().toLowerCase().replace("#", "")).length &&
      (e += e),
    (t = (t = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(e))
      ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
      : [255, 255, 255]));
}

function colorIsRed(e) {
  var t = hexToRgb(e, "hash");
  return 150 < t.r && t.b < 100 && t.g < 100;
}

function colorDarken(e, t) {
  t /= 100;
  var n = hexToRgba(e);
  for (i = 0; i < 3; i++)
    n[i] = Math.min(Math.max(0, n[i] - Math.round(n[i] * t)), 255);
  return rgb2hex(n);
}

function isLightColor(e) {
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 200;
  if (!e) return !0;
  var n = (e = __.isArray(e) ? __.filter(e) : [e]).shift();
  return (
    (v = hexToRgba(n)),
    v[3] < 128 && __.size(e)
      ? isLightColor(e, t)
      : v
      ? (299 * v[0] + 587 * v[1] + 114 * v[2]) / 1e3 > t
      : "is-light"
  );
}

function lightOrDark(e) {
  return "string" != typeof e ||
    isLightColor(
      e,
      1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 200
    )
    ? "light"
    : "dark";
}
window.lightOrDark = lightOrDark;
var HoverAnimation = {
    defaults: {
      transparent: {
        on: !1,
        v: 10,
      },
      zoom: {
        on: !1,
        v: 102,
      },
      shift: {
        on: !1,
        v: {
          v: 2,
          d: "u",
        },
      },
      shadow: {
        on: !1,
        v: {
          x: 0,
          y: 0,
          b: 0,
          s: 0,
          color: "#000000",
          o: 20,
        },
      },
    },
    convert: function (e) {
      var t = __.clone(this.defaults);
      return (
        e &&
          (t[
            {
              1: "transparent",
              2: "zoom",
            }[e]
          ].on = !0),
        t
      );
    },
    fillStyles: function (e, t, n, i) {
      var o,
        s = 3 < arguments.length && void 0 !== i && i,
        r = [],
        a = [];
      __.each(t, function (e, t) {
        switch (t) {
          case "transparent":
            e.on
              ? r.push("opacity:" + (1 - e.v / 100))
              : s && r.push("opacity: unset");
            break;
          case "zoom":
            e.on ? a.push("scale(" + e.v / 100 + ")") : s && a.push("scale(1)");
            break;
          case "shift":
            e.on
              ? a.push(
                  "translate(0, " + e.v.v * ("d" == e.v.d ? 1 : -1) + "px)"
                )
              : s && a.push("translate(0, 0)");
            break;
          case "shadow":
            e.on
              ? r.push(
                  "box-shadow:" + StylesFactory.getShadow(e.v) + " !important"
                )
              : s &&
                r.push(
                  "box-shadow: var(--theme-link-shadow-params) var(--theme-link-shadow-color) !important"
                );
        }
      }),
        a.length && r.push("transform:" + a.join(" ")),
        r.length &&
          ((o = ".5s cubic-bezier(.2, 2, .2, 1)"),
          e.push(
            n +
              ".btn-link {transition: transform " +
              o +
              ", opacity " +
              o +
              ", box-shadow " +
              o +
              "}"
          ),
          e.push(
            n +
              ".btn-link:not(.is-opened):not(.is-shape-icon):hover, " +
              n +
              ".btn-link.is-hovered {" +
              r.join(";") +
              "}"
          ));
    },
  },
  FontsFactory = {
    used: {
      _: 0,
    },
    getFont: function (e, t) {
      var n = 1 < arguments.length && void 0 !== t ? t : null;
      return null == e
        ? null
        : (null == this.used[e] && (this.used[e] = 1),
          1e3 < e && n && null == n.fonts[e] && (e = n.screen.font),
          null == globalFonts[e]
            ? null
            : "'" + globalFonts[e].n + "'," + globalFonts[e].f);
    },
    getWeight: function (e, t) {
      return null == t || null == t || null == globalFonts[e]
        ? null
        : (null == globalFonts[e].w ? "200,400,700" : globalFonts[e].w).split(
            ","
          )[t];
    },
    getTransform: function (e) {
      if (null == e || null == e) return null;
      return {
        n: "none",
        u: "uppercase",
      }[e];
    },
    isUpperCaseHeading: function () {
      return !1;
    },
    loadAll: function () {
      var n = this;
      __.each(globalFonts, function (e, t) {
        null == n.used[t] && (n.used[t] = 1);
      }),
        this.check();
    },
    getTextStyles: function (e, t) {
      var n = 1 < arguments.length && void 0 !== t ? t : null;
      if (n) {
        var i = {};
        return (
          _defineProperty(
            i,
            n + "-lineheight",
            "var(--theme-text-lineheight-" + (e || "md") + ")"
          ),
          _defineProperty(
            i,
            n + "-size",
            "var(--theme-text-size-" + (e || "md") + ")"
          ),
          _defineProperty(
            i,
            n + "-letterspacing",
            "var(--theme-text-letterspacing-" + (e || "md") + ")"
          ),
          i
        );
      }
      return {
        "line-height": "var(--theme-text-lineheight-" + (e || "md") + ")",
        "font-size": "var(--theme-text-size-" + (e || "md") + ")",
        "letter-spacing": "var(--theme-text-letterspacing-" + (e || "md") + ")",
      };
    },
    supportsWoff2: function () {
      if (null !== isSupportsWoff2) return isSupportsWoff2;
      if (!("FontFace" in window)) return !1;
      var e = new FontFace(
        "t",
        'url("data:font/woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA")format("woff2")',
        {}
      );
      return (
        e.load().catch(function () {}),
        (isSupportsWoff2 = "loading" == e.status || "loaded" == e.status)
      );
    },
    check: function () {
      var e,
        n = this,
        i = {
          0: [],
          1: [],
        },
        o = ["cyrillic", "cyrillic-ext", "latin-ext"];
      __.each(this.used, function (e, t) {
        "_" != t &&
          n.used[t] &&
          null != t &&
          null != globalFonts[t] &&
          null == globalFonts[t].system &&
          (i[1e3 < t ? 0 : 1].push([
            globalFonts[t].n,
            __.uniq((globalFonts[t].w || "200,400,700").split(",")).join(","),
          ]),
          null != globalFonts[t].s && (o = o.concat(globalFonts[t].s)),
          (n.used[t] = 0));
      }),
        i[0].length &&
          ((e =
            "//fonts.googleapis.com/css?family=" +
            __.map(i[0], function (e) {
              return e[0].replace(/ /g, "+") + ":" + e[1];
            }).join("|") +
            "&display=swap&subset=" +
            __.uniq(o).join(",")),
          $mx.lazy([], e, function () {
            $events.fire("fontloaded");
          })),
        i[1].length &&
          __.each(i[1], function (e) {
            var t =
              "/s/fonts/google/css/" +
              (n.supportsWoff2() ? "woff2" : "ttf") +
              "/" +
              e[0].toLowerCase().replace(/ /g, "") +
              ".css";
            $mx.lazy([], t, function () {
              $events.fire("fontloaded");
            });
          });
    },
  };
document.fonts &&
  (document.fonts.loadingdone = function () {
    $events.fire("fontloaded");
  });
var ColorsFactory = {
    regex: /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g,
    getColor: function (e) {
      return e && -1 != e.indexOf(";") ? e.split(";")[0] : e;
    },
    getBackground: function (e, t, n) {
      var i = 1 < arguments.length && void 0 !== t ? t : null,
        o = 2 < arguments.length && void 0 !== n && n;
      if (!e) return e;
      if (
        ((!0 !== i && 1 !== i) || (i = 100),
        null !== i && (e = this.transparent(i, e)),
        -1 == e.indexOf(";"))
      )
        return o ? null : e;
      for (
        var s = e.split(";"), r = parseInt(s.pop()), a = [], l = 0;
        l < s.length;
        l += 2
      )
        a.push({
          c: s[l],
          p: parseInt(s[l + 1]),
        });
      return (
        (s =
          r +
          "deg, " +
          _.map(a, function (e) {
            return e.c + " " + e.p + "%";
          }).join(", ")),
        o ? s : "linear-gradient(" + s + ")"
      );
    },
    normalize: function (e) {
      return e
        ? e.replace(this.regex, function (e) {
            return (
              3 ==
                (e = e.toString().trim().toLowerCase().replace("#", ""))
                  .length && (e += e),
              "#" + e
            );
          })
        : e;
    },
    transparent: function (t, e) {
      return parseInt(t).toString() != t
        ? e
        : null == e
        ? null
        : 0 === (t = parseInt(t))
        ? e
        : 100 === t
        ? "transparent"
        : e.replace(this.regex, function (e) {
            return e + Math.round(((100 - t) / 100) * 255).toString(16);
          });
    },
  },
  StylesFactory = {
    applyCssMedia: function (e, t) {
      var n = "";
      return (
        null != e.none
          ? ((n = e.none),
            e.xs &&
              e.xs.trim() &&
              (n += "@media (max-width: 767px) {" + e.xs + "}"),
            e.xs && e.xs.trim() && (n += applyCssContext(e.xs, ".screen")),
            e.sm &&
              e.sm.trim() &&
              (n += "@media (max-width: 991px) {" + e.sm + "}"),
            e.md &&
              e.md.trim() &&
              (n += "@media (min-width: 992px) {" + e.md + "}"))
          : "string" == typeof e && (n = e),
        (n = n.replace(/\{\$storage_domain\}/g, t))
      );
    },
    prepareExtendedPicturesItem: function (n, i) {
      __.each(n, function (e, t) {
        n[t] = e.replace(/\{\$pictures\.p([^}]+)\}/g, function (e, t) {
          return null == i[t] ? "" : "//{$storage_domain}/p/" + i[t].filename;
        });
      });
    },
    prepareExtendedPictures: function (e) {
      var t = e.extended_pictures,
        t = __.combine(__.map(t, "picture_id"), t);
      StylesFactory.prepareExtendedPicturesItem(e.extended.base.css, t),
        __.each(e.extended.items, function (e) {
          return StylesFactory.prepareExtendedPicturesItem(e.css, t);
        });
    },
    getBaseStyles: function () {
      return {
        heading: {
          font: 0,
          color: "#000000",
          transform: "n",
          weight: 1,
          textsizes: [24, 30, 50],
          lineheights: [1.4, 1.25, 1.15],
          letterspacings: [0, 0, 0],
        },
        screen: {
          font: 0,
          color: "#000000",
          textsizes: [14, 17, 20],
          lineheights: [1.45, 1.45, 1.45],
          letterspacings: [0, 0, 0],
        },
        avatar: {
          color: "#777777",
        },
        panel: {
          bg: null,
          text: null,
          primary: {
            bg: null,
            text: null,
          },
          secondary: {
            bg: null,
            text: null,
          },
        },
        link: {
          bg: "#7795f8",
          color: "#ffffff",
          transform: "n",
          weight: 1,
          font: 0,
          textsize: 16,
          lineheight: 1.2,
          letterspacing: 0,
          subtitle: {
            color: "#ffffff",
            font: 0,
            textsize: 14,
            lineheight: 1.2,
            letterspacing: 0,
          },
          shadow: {
            x: 0,
            y: 0,
            b: 0,
            s: 0,
            color: "#000000",
            o: 20,
          },
          border: {
            width: 2,
            color: null,
          },
          radius: 3,
          align: "center",
          thumb: "left",
          hover: __.clone(HoverAnimation.defaults),
          transparent: 0,
        },
        bg: {
          position: "0% 0%",
          repeat: "repeat",
          opacity: 0,
          size: "tile",
          cover: !1,
          fixed: 0,
          color: "#eff2f7",
          picture: null,
        },
        block: {
          radius: 5,
          pictures: {
            title: "#000000",
            text: "#000000",
            button_text: "#0383de",
            bg: "#ffffff",
            nav: "#53a3e0",
          },
        },
        form: {
          style: "normal",
        },
        fonts: {},
        sections: {
          _: 0,
        },
        extended: {
          items: [],
          base: {},
        },
      };
    },
    getEmptySection: function (e) {
      return {
        text: {
          color: null,
          font: null,
          textsizes: null,
          lineheights: null,
          letterspacings: null,
        },
        heading: {
          color: null,
          font: null,
          weight: null,
          transform: null,
          textsizes: null,
          lineheights: null,
          letterspacings: null,
        },
        link: {
          color: null,
          bg: null,
          shadow: null,
          weight: null,
          transform: null,
          font: null,
          textsize: null,
          lineheight: null,
          letterspacing: null,
          subtitle: {
            color: null,
            font: null,
            textsize: null,
            lineheight: null,
            letterspacing: null,
          },
          transparent: null,
          border: {
            width: null,
            color: null,
          },
        },
        indent: {
          on: !1,
          radius: 20,
          border: {
            width: 0,
            color: e.screen.color,
          },
        },
        bg: {
          color: null,
          picture: null,
          size: null,
          repeat: null,
          position: null,
          opacity: null,
        },
        padding: {
          top: 1,
          bottom: 1,
        },
        margin: {
          top: 0,
          bottom: 0,
        },
      };
    },
    getDefaultSection: function (e, t) {
      var n = !(1 < arguments.length && void 0 !== t) || t,
        i = e.link.subtitle || e.link;
      return __.clone(
        __.merge(
          {
            text: {
              color: e.screen.color,
              font: e.screen.font,
              textsizes: e.screen.textsizes,
              lineheights: e.screen.lineheights,
              letterspacings: e.screen.letterspacings,
            },
            heading: {
              color: e.heading.color,
              font: e.heading.font,
              weight: e.heading.weight,
              transform: e.heading.transform,
              textsizes: e.heading.textsizes,
              lineheights: e.heading.lineheights,
              letterspacings: e.heading.letterspacings,
            },
            link: {
              color: e.link.color,
              bg: e.link.bg,
              shadow: e.link.shadow,
              weight: e.link.weight,
              transform: e.link.transform,
              font: e.link.font,
              textsize: e.link.textsize,
              lineheight: e.link.lineheight,
              letterspacing: e.link.letterspacing,
              subtitle: {
                color: i.color,
                font: i.font,
                textsize: i.textsize,
                lineheight: i.lineheight,
                letterspacing: i.letterspacing,
              },
              transparent: e.link.transparent,
              border: {
                width: e.link.border.width,
                color: e.link.border.color,
              },
            },
            indent: {
              on: !1,
              radius: 20,
              border: {
                width: 0,
                color: e.screen.color,
              },
            },
            bg: {},
            padding: {
              top: 1,
              bottom: 1,
            },
            margin: {
              top: 0,
              bottom: 0,
            },
          },
          n
            ? {
                bg: {
                  color: "#00000000",
                  opacity: 0,
                  picture: null,
                  size: "tile",
                  repeat: "repeat",
                  position: "0% 0%",
                },
              }
            : {},
          !0
        )
      );
    },
    restoreSection: function (e, t, n) {
      var i = 2 < arguments.length && void 0 !== n ? n : null;
      return (
        null == i && (i = StylesFactory.getDefaultSection(t, !1)),
        (e =
          (e = __.filter(e)).id &&
          null != t.sections &&
          null != t.sections[e.id]
            ? __.merge(i, t.sections[e.id] || {}, e, !0)
            : __.merge(i, e, !0))
      );
    },
    decompress: function (e) {
      return (
        (null != e.link && null != e.link.hover) ||
          (null == e.link && (e.link = {}), (e.link.hover = 1)),
        null != e.link.hover &&
          __.isNumber(e.link.hover) &&
          (e.link.hover = HoverAnimation.convert(parseInt(e.link.hover))),
        (e = __.merge(
          this.getBaseStyles(),
          __.filterRecursive(e, __.isNotNull),
          !0
        ))
      );
    },
    compress: function (e) {
      var n = this.getBaseStyles(),
        i = __.clone(e);
      return (
        __.each(i.link.hover, function (e, t) {
          e.on || (i.link.hover[t] = n.link.hover[t]);
        }),
        __.differenceWith(i, n)
      );
    },
    checkStyles: function (e) {
      return (
        null != (e = e || {}).link &&
          null != e.screen &&
          null != e.screen.font &&
          null == e.link.font &&
          (e.link.font = e.screen.font),
        (null != (e = this.decompress(e)).link.border &&
          "" !== e.link.border) ||
          (e.link.border = {
            width: 2,
          }),
        (null != e.link.radius && "" !== e.link.radius) || (e.link.radius = 3),
        "string" == typeof e.link.radius &&
          -1 == e.link.radius.indexOf(" ") &&
          (e.link.radius = parseInt(e.link.radius.replace("px", ""))),
        "object" != _typeof2(e.link.border) &&
          (e.link.border = {
            width: parseInt(e.link.border.replace("px", "")),
          }),
        null != e.html &&
          (e.extended.items.push({
            title: {
              en: "",
            },
            html: e.html,
            css: e.css,
          }),
          delete e.html,
          delete e.css),
        null != e.animations &&
          ((e.extended = e.animations), delete e.animations),
        __.each(e.fonts, function (e, t) {
          globalFonts[t] = e;
        }),
        e
      );
    },
    getPageClasses: function (e, t) {
      var n,
        i,
        o,
        s = 1 < arguments.length && void 0 !== t ? t : null,
        r = [];
      return (
        null == s && (s = e.theme),
        s &&
          null != s.bg &&
          ((i = hexToRgb((n = ColorsFactory.getColor(s.bg.color)), "hash")),
          (i = __.sort(i)),
          (i =
            (o = Object.values(i))[0] > 1.2 * o[1] ? Object.keys(i)[0] : null),
          (r = [
            "is-" + e.locale.direction,
            "is-" + lightOrDark(n),
            i ? "is-bg-main-" + i : null,
          ])),
        r
      );
    },
    getShadow: function (e, t, n) {
      var i = 1 < arguments.length && void 0 !== t && t,
        o = 2 < arguments.length && void 0 !== n && n;
      if (
        Math.abs(e.x || 0) +
          Math.abs(e.y || 0) +
          Math.abs(e.s || 0) +
          Math.abs(e.b || 0) &&
        e.o
      ) {
        var s =
          (e.x || 0) +
          "px " +
          (e.y || 0) +
          "px " +
          (e.b || 0) +
          "px " +
          (e.s || 0) +
          "px";
        return o
          ? s
          : s +
              " " +
              (i
                ? ColorsFactory.transparent(100 - e.o, e.color)
                : "var(--theme-link-shadow-color)");
      }
      return "none";
    },
    updateCSSBlock: function (e, t) {
      "string" != typeof e &&
        (e = __.map(e, function (e) {
          return __.values(e).join("\n");
        }).join("\n"));
      var n = document.createElement("style"),
        i = document.createTextNode(e);
      n.appendChild(i),
        (t.innerHTML = ""),
        t.appendChild(n),
        FontsFactory.check();
    },
    addStyle: function (e, t, n, i, o) {
      null == e["b:" + t] && (e["b:" + t] = []),
        e["b:" + t].push(
          __.map(n || [""], function (e) {
            return o + ".b-" + t + " " + e;
          }).join(",") +
            "{" +
            i.join(";") +
            "}"
        );
    },
    getLinkVariables: function (e) {
      e.transparent && e.transparent;
      var t = parseInt(e.radius.toString().split(" ")[0]),
        n = Math.max(10, Math.ceil(Math.min(t, 40) / 4));
      return {
        "--theme-link-shadow-params": StylesFactory.getShadow(e.shadow, !1, !0),
        "--theme-link-shadow-color": ColorsFactory.transparent(
          100 - e.shadow.o,
          e.shadow.color
        ),
        "--theme-link-title-fontsize": e.textsize + "px",
        "--theme-link-title-lineheight": e.lineheight,
        "--theme-link-title-letterspacing": e.letterspacing + "px",
        "--theme-link-title-transform": FontsFactory.getTransform(e.transform),
        "--theme-link-title-font-family": FontsFactory.getFont(e.font),
        "--theme-link-title-font-weight": FontsFactory.getWeight(
          e.font,
          e.weight
        ),
        "--theme-link-subtitle-fontsize": e.subtitle.textsize + "px",
        "--theme-link-subtitle-lineheight": e.subtitle.lineheight,
        "--theme-link-subtitle-letterspacing": e.subtitle.letterspacing + "px",
        "--theme-link-subtitle-font-family":
          null != e.subtitle
            ? FontsFactory.getFont(e.subtitle.font)
            : FontsFactory.getFont(e.font),
        "--theme-link-background": ColorsFactory.getBackground(
          e.bg,
          e.transparent
        ),
        "--theme-link-background-digs": hexToRgb(ColorsFactory.getColor(e.bg)),
        "--theme-link-title-color": e.color,
        "--theme-link-subtitle-color":
          null != e.subtitle ? e.subtitle.color : e.color,
        "--theme-link-contrast-color": isLightColor(
          ColorsFactory.getColor(e.bg)
        )
          ? "#000"
          : "#fff",
        "--theme-link-border-color":
          e.border.color || ColorsFactory.getColor(e.bg),
        "--theme-link-border-radius": (e.radius + " ")
          .replace(/ /g, "px ")
          .trim(),
        "--theme-link-border-radius-one": t + "px",
        "--theme-link-border-width": e.border.width + "px",
        "--theme-link-border-width-offset": Math.min(3, e.border.width) + "px",
        "--theme-link-offset": n + "px",
        "--theme-link-backdrop-filter":
          e.transparent && e.transparent < 100
            ? "blur(3px) saturate(120%)"
            : null,
      };
    },
    getLinkSectionVariables: function (e, t, n) {
      var i,
        o = 1 < arguments.length && void 0 !== t ? t : null,
        s = 2 < arguments.length && void 0 !== n ? n : "--theme-link",
        r = e.bg,
        a = r ? ColorsFactory.getColor(r) : null,
        l = e && e.shadow ? __.merge(o.link.shadow || {}, e.shadow, !0) : null;
      return __.filter(
        (_defineProperty((i = {}), s + "-subtitle-color", e.subtitle.color),
        _defineProperty(i, s + "-title-color", e.color),
        _defineProperty(
          i,
          s + "-background",
          r || (null != e.transparent && null != e.transparent)
            ? ColorsFactory.getBackground(
                r || o.link.bg,
                null == e.transparent ? o.link.transparent : e.transparent
              )
            : null
        ),
        _defineProperty(i, s + "-background-digs", a ? hexToRgb(a) : null),
        _defineProperty(
          i,
          s + "-border-color",
          e.border.color ||
            o.link.border.color ||
            (r ? ColorsFactory.getColor(r) : null)
        ),
        _defineProperty(
          i,
          s + "-border-width",
          null != e.border.width ? e.border.width + "px" : null
        ),
        _defineProperty(
          i,
          s + "-border-width-offset",
          null != e.border.width ? Math.min(3, e.border.width) + "px" : null
        ),
        _defineProperty(
          i,
          s + "-shadow-params",
          l ? StylesFactory.getShadow(l, !1, !0) : null
        ),
        _defineProperty(
          i,
          s + "-shadow-color",
          l ? ColorsFactory.transparent(100 - l.o, l.color) : null
        ),
        _defineProperty(
          i,
          s + "-contrast-color",
          a ? (isLightColor(a) ? "#000" : "#fff") : null
        ),
        _defineProperty(
          i,
          s + "-title-fontsize",
          e.textsize ? e.textsize + "px" : null
        ),
        _defineProperty(i, s + "-title-lineheight", e.lineheight),
        _defineProperty(
          i,
          s + "-title-letterspacing",
          e.letterspacing ? e.letterspacing + "px" : null
        ),
        _defineProperty(
          i,
          s + "-title-font-family",
          FontsFactory.getFont(e.font)
        ),
        _defineProperty(
          i,
          s + "-title-transform",
          FontsFactory.getTransform(e.transform)
        ),
        _defineProperty(
          i,
          s + "-title-font-weight",
          FontsFactory.getWeight(
            null == e.font ? o.link.font : e.font,
            e.weight
          )
        ),
        _defineProperty(
          i,
          s + "-subtitle-fontsize",
          e.subtitle.textsize ? e.subtitle.textsize + "px" : null
        ),
        _defineProperty(i, s + "-subtitle-lineheight", e.subtitle.lineheight),
        _defineProperty(
          i,
          s + "-subtitle-letterspacing",
          e.subtitle.letterspacing ? e.subtitle.letterspacing + "px" : null
        ),
        _defineProperty(
          i,
          s + "-subtitle-font-family",
          FontsFactory.getFont(e.subtitle.font)
        ),
        i)
      );
    },
    getSectionVariables: function (e, t) {
      var n = 1 < arguments.length && void 0 !== t ? t : null,
        i = e.link.bg,
        o = i ? ColorsFactory.getColor(i) : null,
        s = null == e.heading.font ? n.heading.font : e.heading.font,
        r = null == e.text.font ? n.screen.font : e.text.font,
        a = {
          "--theme-font-family": FontsFactory.getFont(e.text.font),
          "--theme-heading-color": e.heading.color,
          "--theme-heading-font-family": FontsFactory.getFont(e.heading.font),
          "--theme-heading-text-transform": FontsFactory.getTransform(
            e.heading.transform
          ),
          "--theme-heading-font-weight": FontsFactory.getWeight(
            s,
            e.heading.weight
          ),
          "--theme-heading-font-weight-bold":
            null != e.heading.weight
              ? FontsFactory.getWeight(
                  s,
                  Math.min(parseInt(e.heading.weight) + 1, 2)
                )
              : null,
          "--theme-title-font-weight": FontsFactory.getWeight(
            r,
            e.heading.weight
          ),
          "--theme-input-border-focused-color": o,
          "--theme-checkbox-checked-background": o,
          "--theme-checkbox-checked-color": o
            ? isLightColor(o)
              ? "#000"
              : "#fff"
            : null,
        };
      return (
        e.text &&
          (a = __.merge(
            a,
            this.getLinkSectionVariables(e.link, n),
            this.getTextVariables(e.text),
            this.getTextSizes(e)
          )),
        __.filter(a)
      );
    },
    getTextVariables: function (e) {
      return {
        "--theme-text-color": e.color,
        "--theme-text-color-digs": e.color ? hexToRgb(e.color) : null,
        "--theme-text-color-contrast": e.color
          ? isLightColor(e.color)
            ? "#000"
            : "#fff"
          : null,
      };
    },
    getTextSizes: function (t) {
      var i = {};
      return (
        __.each(
          _defineProperty(
            {
              heading: ["h3", "h2", "h1"],
            },
            null == t.screen ? "text" : "screen",
            ["sm", "md", "lg"]
          ),
          function (n, e) {
            null != t[e] &&
              (t[e].textsizes &&
                __.each(t[e].textsizes || [], function (e, t) {
                  i["--theme-text-size-" + n[t]] = e + "px";
                }),
              t[e].lineheights &&
                __.each(t[e].lineheights || [], function (e, t) {
                  i["--theme-text-lineheight-" + n[t]] = e;
                }),
              t[e].letterspacings &&
                __.each(t[e].letterspacings || [], function (e, t) {
                  i["--theme-text-letterspacing-" + n[t]] = e + "px";
                }));
          }
        ),
        i
      );
    },
    getSectionCommonVariables: function (e, t) {
      var n = {},
        i = {
          top: e.padding.top + "rem",
          bottom: e.padding.bottom + "rem",
        };
      e.indent.on &&
        e.indent.border.width &&
        ((i.top = "calc(" + i.top + " + " + e.indent.border.width + "px)"),
        (i.bottom =
          "calc(" + i.bottom + " + " + e.indent.border.width + "px)")),
        (n["--section-padding-top"] = i.top),
        (n["--section-padding-bottom"] = i.bottom),
        (n["--section-border-radius"] =
          (e.indent.on ? e.indent.radius : 0) + "px"),
        (n["--section-border-width"] =
          (e.indent.on ? e.indent.border.width : 0) + "px");
      var o = e.indent.border.color || t.screen.color;
      return (
        (n["--section-border-color"] = o),
        (n["--section-outline-color"] = isLightColor(o) ? "#000" : "#fff"),
        e.indent.on &&
          ((n["--section-padding-left"] =
            "calc(1rem + var(--section-border-width))"),
          (n["--section-padding-right"] =
            "calc(1rem + var(--section-border-width))")),
        e.bg.color &&
          isTransparentColor(ColorsFactory.getColor(e.bg.color)) &&
          (n["--section-backdrop-filter"] = "none"),
        n
      );
    },
    prepareSectionStyles: function (e, t, n, i, o, s, r, a) {
      var l,
        c,
        u,
        d = r,
        h = 7 < arguments.length && void 0 !== a && a;
      __.size(e) &&
        ((o = null == o ? "" : o + " "),
        delete i[(l = "s:" + t)],
        (c = __.merge(
          this.getSectionVariables(e, n),
          this.getSectionCommonVariables(e, n)
        )),
        (u = [
          o +
            ".blocks-section.s-" +
            t +
            (e.indent.on || h
              ? " > div > div > .section-main:before"
              : ":before") +
            "{" +
            buildStylesBackground(e, "html", void 0, d, h) +
            "}",
          o +
            ".blocks-section.s-" +
            t +
            (e.indent.on || h ? " > div > div > .section-main" : "") +
            " > div:before {" +
            buildStylesBackground(e, "body", void 0, d, h) +
            "}",
        ]),
        e.indent.on &&
          e.indent.radius &&
          u.push(
            o +
              ".blocks-section.is-empty:first-child + .s-" +
              t +
              " {margin-top: 1rem}"
          ),
        __.size(c) &&
          u.push(
            o +
              ".s-" +
              t +
              "{" +
              __.map(c, function (e, t) {
                return t + ":" + e;
              }).join(";") +
              "}"
          ),
        (i[l] = u));
    },
  };

function buildStylesBackground(e, t, n, i) {
  var o = 4 < arguments.length && void 0 !== arguments[4] && arguments[4];
  bg = {};
  var s = e.bg,
    r = s && s.color && -1 != s.color.indexOf(";") ? "gradient" : "solid";
  switch (
    (null != s.picture &&
      null == s.picture.link &&
      null != s.picture.filename &&
      (s.picture.link = "//" + i + "/p/" + s.picture.filename),
    t)
  ) {
    case "html":
      if (s.picture && s.picture.link) {
        switch (
          ((bg = {
            p: "background-position:" + s.position,
            r: "background-repeat: " + s.repeat,
            i: "background-image:url(" + s.picture.link + ")",
          }),
          (bg.c = "background-color: " + ColorsFactory.getColor(s.color)),
          r)
        ) {
          case "gradient":
            bg.i += ", " + ColorsFactory.getBackground(s.color);
        }
        switch (s.size) {
          case "width":
            bg.s = "background-size: 100% auto";
            break;
          case "cover":
            bg.s = "background-size: cover";
            break;
          case "adaptive":
            var a = s.position ? s.position.split(" ")[1] : "0%";
            Object.assign(bg, {
              p: "background-position: 50% " + a,
              r: "background-repeat:no-repeat",
              s: "background-size: auto " + e.bg.height + "px",
            });
            break;
          default:
            "thumb" == n && (bg.s = "background-size: 100%");
        }
      } else if (0 == s.opacity)
        switch (r) {
          case "solid":
            bg.c =
              "background-color: " +
              ColorsFactory.getColor(s.color) +
              ";" +
              (o ? "background-image: unset;" : "");
            break;
          case "gradient":
            bg.i = "background-image: " + ColorsFactory.getBackground(s.color);
        }
      break;
    case "body":
      0 != s.opacity &&
        ("gradient" == r
          ? (bg.i =
              "background-image:" +
              ColorsFactory.getBackground(
                s.color,
                s.picture && s.picture.link ? 100 - s.opacity : null
              ))
          : (bg.c =
              "background-color:" +
              (s.picture && s.picture.link
                ? ColorsFactory.transparent(
                    100 - s.opacity,
                    ColorsFactory.getColor(s.color)
                  )
                : ColorsFactory.getColor(s.color))));
  }
  return __.values(bg).join(";");
}

function applyCssContext(e, i) {
  e = e.trim();
  var t = /([\s\S]+?)\{([\s\S]*?)\}/gi,
    o = [],
    n = [],
    s = [];
  for (
    e = (e = (e = e.replace(
      /(@keyframes[^{]+)\{([\s\S]+?})\s*}/g,
      function (e) {
        return n.push(e), "@@frame-" + n.length + "{}";
      }
    )).replace(/(@media[^{]+)\{([\s\S]+?})\s*}/g, function (e, t, n) {
      return (
        o.push(t + "{" + applyCssContext(n, i) + "}"), "@@" + o.length + "{}"
      );
    })).replace(/\/\*[\s\S]*?\*\//g, "");
    (token = t.exec(e));

  ) {
    var r = {
      selectorText: token[1].trim().split(/\s*\,\s*/g),
      style: token[2].trim(),
    };
    s.push(r);
  }
  for (
    var a = __.map(s, function (e) {
        return (
          __.map(e.selectorText, function (e) {
            return "@@" == (e = e.trim()).substr(0, 2)
              ? e
              : 0 == e.indexOf(".device")
              ? i + e
              : i + " " + e;
          }) +
          " {" +
          e.style +
          "}"
        );
      }).join("\n"),
      l = 1;
    l <= o.length;
    l++
  )
    a = a.replace("@@" + l + " {}", o[l - 1]);
  for (var c = 1; c <= n.length; c++)
    a = a.replace("@@frame-" + c + " {}", n[c - 1]);
  return a;
}

function buildStyles(e, n, t, i) {
  var o = !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4];
  i = i || ".main-theme";

  function s(e) {
    return __.map(e, function (e, t) {
      return t + ":" + e;
    }).join(";");
  }
  var r,
    a = e.link,
    l = parseInt(a.radius.toString().split(" ")[0]),
    c =
      ColorsFactory.getColor(a.bg) == ColorsFactory.getColor(e.bg.color)
        ? a.shadow.color
        : ColorsFactory.getColor(a.bg),
    u = Math.max(10, Math.ceil(Math.min(l, 40) / 4)),
    d = __.merge(
      {
        "--block-radius": e.block.radius + "px",
        "--bg-card-content": e.block.pictures.bg,
        "--theme-font-family": FontsFactory.getFont(e.screen.font),
        "--theme-font-weight": FontsFactory.getWeight(e.screen.font, 1),
        "--theme-font-weight-bold": FontsFactory.getWeight(e.screen.font, 2),
        "--theme-heading-color": e.heading.color,
        "--theme-heading-font-family": FontsFactory.getFont(e.heading.font),
        "--theme-heading-font-weight": FontsFactory.getWeight(
          e.heading.font,
          e.heading.weight
        ),
        "--theme-heading-font-weight-bold": FontsFactory.getWeight(
          e.heading.font,
          Math.min(parseInt(e.heading.weight) + 1, 2)
        ),
        "--theme-heading-text-transform": FontsFactory.getTransform(
          e.heading.transform
        ),
        "--theme-title-font-weight": FontsFactory.getWeight(
          e.screen.font,
          e.heading.weight
        ),
        "--theme-input-radius": Math.min(8, l) + "px",
        "--theme-input-border-focused-color": ColorsFactory.getColor(e.link.bg),
        "--theme-checkbox-checked-background": c,
        "--theme-checkbox-checked-color": isLightColor(c) ? "#000" : "#fff",
        "--theme-block-pictures-button-text-color":
          e.block.pictures.button_text,
        "--theme-block-pictures-text-color": e.block.pictures.text,
        "--theme-block-pictures-title-color": e.block.pictures.title,
        "--theme-block-pictures-background": e.block.pictures.bg,
        "--theme-block-pictures-nav-color": e.block.pictures.nav,
        "--theme-block-pictures-background-text": isLightColor(
          e.block.pictures.bg
        )
          ? "#000"
          : "#fff",
        "--theme-block-pictures-background-text-digs": isLightColor(
          e.block.pictures.bg
        )
          ? "0,0,0"
          : "255,255,255",
        "--theme-block-pictures-background-text-light": isLightColor(
          e.block.pictures.bg
        )
          ? 1
          : 4,
        "--theme-block-card-input-flat-bg": isLightColor(e.block.pictures.bg)
          ? "#1919190f"
          : "#ffffff33",
        "--theme-block-card-input-flat-bg-focused": isLightColor(
          e.block.pictures.bg
        )
          ? "#1919191f"
          : "#ffffff4d",
      },
      StylesFactory.getTextVariables(e.screen),
      StylesFactory.getLinkVariables(e.link),
      StylesFactory.getTextSizes(e)
    ),
    h = e.panel.bg ? ColorsFactory.getColor(e.panel.bg) : null,
    p = __.filter(
      {
        "--theme-panel-background": h,
        "--theme-panel-background-digs": h ? hexToRgb(h) : null,
        "--theme-panel-background-secondary": h
          ? colorDarken(h, isLightColor(h) ? 5 : -10)
          : null,
        "--theme-panel-text-color": e.panel.text,
        "--theme-panel-text-color-digs": e.panel.text
          ? hexToRgb(e.panel.text)
          : null,
        "--theme-panel-button-primary-background": e.panel.primary.bg,
        "--theme-panel-button-primary-color": e.panel.primary.text,
        "--theme-panel-button-background": e.panel.secondary.bg,
        "--theme-panel-button-color": e.panel.secondary.text,
        "--theme-panel-border-color": h ? colorDarken(h, 15) : null,
      },
      __.isNotNull
    ),
    f = [
      i + "{" + s(d) + "}",
      i +
        " .block-item .btn-link > div, " +
        i +
        ".btn-socials span {flex-grow: " +
        ("center" == a.thumb ? 0 : 1) +
        "}",
      i + ".base-theme {" + s(p) + "}",
    ];
  return (
    "left" == e.link.align
      ? (f.push(i + ' .btn-link-styled:before {content: "\\f054";}'),
        f.push(
          i +
            ".is-rtl .btn-link-styled {padding-left: " +
            (2 * u + 16) +
            "px !important;text-align: right;justify-content: end}"
        ),
        f.push(
          i +
            ".is-ltr .btn-link-styled {padding-right: " +
            (2 * u + 16) +
            "px !important;text-align: left;justify-content: start}"
        ),
        f.push(
          i +
            ".is-rtl .btn-link-styled.without-thumb {padding-right: " +
            u +
            "px !important}"
        ),
        f.push(
          i +
            ".is-ltr .btn-link-styled.without-thumb {padding-left: " +
            u +
            "px !important}"
        ))
      : f.push(
          i +
            " .btn-link-styled.without-thumb.is-embeded-page {padding-left: 36px !important;padding-right: 36px !important}"
        ),
    (i += " "),
    HoverAnimation.fillStyles(f, a.hover, i),
    ("page" != t && "design" != t) ||
      null == e.extended ||
      (null != e.extended.base &&
        e.extended.base.css &&
        ((r = StylesFactory.applyCssMedia(e.extended.base.css, n)),
        i ? f.push(applyCssContext(r, i)) : f.push(r)),
      null != e.extended.items &&
        __.size(e.extended.items) &&
        __.each(e.extended.items, function (e) {
          var t = StylesFactory.applyCssMedia(e.css, n);
          i ? f.push(applyCssContext(t, i)) : f.push(t);
        })),
    e.link.radius &&
      (f.push(
        i +
          ".btn-link-style-two, " +
          i +
          ".btn-link-style-arr {;padding-left: 2rem !important;padding-right: 3rem !important; }"
      ),
      f.push(
        i +
          ".btn-link-style-two:before, " +
          i +
          ".btn-link-style-arr:before { right: 1.5rem }"
      )),
    e.bg.fixed &&
      "page" == t &&
      f.push(
        i +
          ".page-background:before," +
          i +
          ".page-background-overlay:before, " +
          i +
          ".page-background-extended:before {position:fixed}"
      ),
    f.push(
      i +
        ".page-background:before {" +
        buildStylesBackground(e, "html", t, n) +
        " }"
    ),
    f.push(
      i +
        ".page-background-overlay:before {" +
        buildStylesBackground(e, "body", t, n) +
        " }"
    ),
    f.push(i + ".text-avatar {color:" + e.avatar.color + " !important}"),
    (f = o
      ? f.join("\n")
      : {
          _base: f,
        })
  );
}
var VideoHelper = {
  matchers: [
    {
      r: /\.(mp4|m3u8|webm)/,
      p: "file",
    },
    {
      r: /youtube\.com\/watch\?.*?v=([a-zA-Z0-9\-\_]+)/,
      p: "youtube",
    },
    {
      r: /youtube\.com\/live\/([a-zA-Z0-9\-\_]+)/,
      p: "youtube",
    },
    {
      r: /youtu\.be\/([a-zA-Z0-9\-\_]+)/,
      p: "youtube",
    },
    {
      r: /youtube\.com\/embed\/([a-zA-Z0-9\-\_]+)/,
      p: "youtube",
    },
    {
      r: /vimeo\.com\/(video\/)?([a-zA-Z0-9\-\_]+)/,
      p: "vimeo",
    },
    {
      r: /rutube\.ru\/video\/(private\/)?([a-zA-Z0-9\-\_]+)/,
      p: "rutube",
    },
    {
      r: /tiktok\.com\/embed\/([a-zA-Z0-9\-\_]+)/,
      p: "tiktok",
    },
    {
      r: /twitch\.tv\/([a-zA-Z0-9\-\_]+)(\/[a-zA-Z0-9\-\_]+)?/,
      p: "twitch",
    },
    {
      r: /vk\.com\//,
      p: "vk",
      isNeedCode: function (e) {
        return -1 == e.indexOf("video_ext.php");
      },
      parseCode: function (e) {
        var t = e.match(/src=[\'"]([^\'\"]*)[\'"]/);
        return t ? t[1] : null;
      },
    },
  ],
  getProviderName: function (e) {
    for (i = 0; i < this.matchers.length; i++)
      if ((m = e.match(this.matchers[i].r))) return this.matchers[i];
    return null;
  },
  getSupportServices: function (e) {
    return "ru" == e
      ? "YouTube, Vimeo, RuTube, VK, TikTok, Twitch"
      : "YouTube, Vimeo, TikTok, Twitch";
  },
  getProvider: function (o, s) {
    var e = null,
      t = {
        youtube: {
          embeded: function (e) {
            var t = ["showinfo=0&rel=0&playsinline=0"];
            return (
              o.is_autoplay && s && t.push("autoplay=1&autohide=1"),
              o.is_autohide && t.push("controls=0&disablekb=1"),
              "https://www.youtube.com/embed/" + e[1] + "?" + t.join("&")
            );
          },
        },
        vimeo: {
          embeded: function (e) {
            var t = [];
            return (
              o.is_autoplay && s && t.push("autoplay=1"),
              o.is_autohide && t.push("title=0&byline=0&portrait=0"),
              "https://player.vimeo.com/video/" + e[2] + "?" + t.join("&")
            );
          },
        },
        rutube: {
          embeded: function (e) {
            return "https://rutube.ru/play/embed/" + e[2];
          },
        },
        tiktok: {
          embeded: function (e, t) {
            var n = 1 < arguments.length && void 0 !== t ? t : null;
            return "https://tiktok.com/embed/v2/" + e[1] + "?lang=" + n;
          },
        },
        vk: {
          embeded: function (e) {
            var t = [];
            return (
              o.is_autoplay && s && t.push("autoplay=1"),
              e.input + "&" + t.join("&")
            );
          },
        },
        twitch: {
          embeded: function (e, t) {
            var n = [
              "parent=" + document.location.host,
              "autoplay=" + (o.is_autoplay && s ? "true" : "false"),
            ];
            return (
              "https://player.twitch.tv/?" +
              (e[2] ? "video=" + e[2].substr(1) : "channel=" + e[1]) +
              "&" +
              n.join("&")
            );
          },
        },
        file: {
          s: null,
          t: function () {},
        },
      };
    for (i = 0; i < this.matchers.length; i++)
      if ((m = o.url.match(this.matchers[i].r))) {
        ((e = t[this.matchers[i].p]).match = m), (e.name = this.matchers[i].p);
        break;
      }
    return e;
  },
};

function date_format(e, t) {
  function n(e, t) {
    return c[e] ? c[e]() : t;
  }

  function i(e, t) {
    for (e = String(e); e.length < t; ) e = "0" + e;
    return e;
  }
  var o,
    s,
    r,
    a = [
      "Sun",
      "Mon",
      "Tues",
      "Wednes",
      "Thurs",
      "Fri",
      "Satur",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    l = /\\?(.?)/gi,
    c = {
      d: function () {
        return i(c.j(), 2);
      },
      D: function () {
        return c.l().slice(0, 3);
      },
      j: function () {
        return o.getDate();
      },
      l: function () {
        return a[c.w()] + "day";
      },
      N: function () {
        return c.w() || 7;
      },
      S: function () {
        var e = c.j(),
          t = e % 10;
        return (
          t <= 3 && 1 === parseInt((e % 100) / 10, 10) && (t = 0),
          ["st", "nd", "rd"][t - 1] || "th"
        );
      },
      w: function () {
        return o.getDay();
      },
      z: function () {
        var e = new Date(c.Y(), c.n() - 1, c.j()),
          t = new Date(c.Y(), 0, 1);
        return Math.round((e - t) / 864e5);
      },
      W: function () {
        var e = new Date(c.Y(), c.n() - 1, c.j() - c.N() + 3),
          t = new Date(e.getFullYear(), 0, 4);
        return i(1 + Math.round((e - t) / 864e5 / 7), 2);
      },
      F: function () {
        return a[6 + c.n()];
      },
      m: function () {
        return i(c.n(), 2);
      },
      M: function () {
        return c.F().slice(0, 3);
      },
      n: function () {
        return o.getMonth() + 1;
      },
      t: function () {
        return new Date(c.Y(), c.n(), 0).getDate();
      },
      L: function () {
        var e = c.Y();
        return ((e % 4 == 0) & (e % 100 != 0)) | (e % 400 == 0);
      },
      o: function () {
        var e = c.n(),
          t = c.W();
        return c.Y() + (12 === e && t < 9 ? 1 : 1 === e && 9 < t ? -1 : 0);
      },
      Y: function () {
        return o.getFullYear();
      },
      y: function () {
        return c.Y().toString().slice(-2);
      },
      a: function () {
        return 11 < o.getHours() ? "pm" : "am";
      },
      A: function () {
        return c.a().toUpperCase();
      },
      B: function () {
        var e = 3600 * o.getUTCHours(),
          t = 60 * o.getUTCMinutes(),
          n = o.getUTCSeconds();
        return i(Math.floor((e + t + n + 3600) / 86.4) % 1e3, 3);
      },
      g: function () {
        return c.G() % 12 || 12;
      },
      G: function () {
        return o.getHours();
      },
      h: function () {
        return i(c.g(), 2);
      },
      H: function () {
        return i(c.G(), 2);
      },
      i: function () {
        return i(o.getMinutes(), 2);
      },
      s: function () {
        return i(o.getSeconds(), 2);
      },
      u: function () {
        return i(1e3 * o.getMilliseconds(), 6);
      },
      e: function () {
        throw new Error(
          "Not supported (see source code of date() for timezone on how to add support)"
        );
      },
      I: function () {
        return new Date(c.Y(), 0) - Date.UTC(c.Y(), 0) !=
          new Date(c.Y(), 6) - Date.UTC(c.Y(), 6)
          ? 1
          : 0;
      },
      O: function () {
        var e = o.getTimezoneOffset(),
          t = Math.abs(e);
        return (0 < e ? "-" : "+") + i(100 * Math.floor(t / 60) + (t % 60), 4);
      },
      P: function () {
        var e = c.O();
        return e.substr(0, 3) + ":" + e.substr(3, 2);
      },
      T: function () {
        return "UTC";
      },
      Z: function () {
        return 60 * -o.getTimezoneOffset();
      },
      c: function () {
        return "Y-m-d\\TH:i:sP".replace(l, n);
      },
      r: function () {
        return "D, d M Y H:i:s O".replace(l, n);
      },
      U: function () {
        return (o / 1e3) | 0;
      },
    };
  return (
    (s = e),
    (o =
      void 0 === (r = t)
        ? new Date()
        : r instanceof Date
        ? new Date(r)
        : new Date(1e3 * r)),
    s.replace(l, n)
  );
}
!(function (e, t) {
  "object" ===
    ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) &&
  "object" === ("undefined" == typeof module ? "undefined" : _typeof2(module))
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" ===
      ("undefined" == typeof exports ? "undefined" : _typeof2(exports))
    ? (exports.postscribe = t())
    : (e.postscribe = t());
})(this, function () {
  return (
    (o = {}),
    (n.m = i =
      [
        function (e, t, n) {
          "use strict";
          var i,
            o = n(1),
            s =
              (i = o) && i.__esModule
                ? i
                : {
                    default: i,
                  };
          e.exports = s.default;
        },
        function (e, t, n) {
          "use strict";
          t.__esModule = !0;
          var a =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                  Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
              }
              return e;
            };
          t.default = f;
          var i,
            o = n(2),
            l =
              (i = o) && i.__esModule
                ? i
                : {
                    default: i,
                  },
            s = (function (e) {
              {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                  for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return (t.default = e), t;
              }
            })(n(4));

          function c() {}
          var r = {
              afterAsync: c,
              afterDequeue: c,
              afterStreamStart: c,
              afterWrite: c,
              autoFix: !0,
              beforeEnqueue: c,
              beforeWriteToken: function (e) {
                return e;
              },
              beforeWrite: function (e) {
                return e;
              },
              done: c,
              error: function (e) {
                throw new Error(e.msg);
              },
              releaseAsync: !1,
            },
            u = 0,
            d = [],
            h = null;

          function p() {
            var e,
              t = d.shift();
            t &&
              ((e = s.last(t)).afterDequeue(),
              (t.stream = function (e, t, i) {
                ((h = new l.default(e, i)).id = u++),
                  (h.name = i.name || h.id),
                  (f.streams[h.name] = h);
                var n = e.ownerDocument,
                  o = {
                    close: n.close,
                    open: n.open,
                    write: n.write,
                    writeln: n.writeln,
                  };

                function s(e) {
                  (e = i.beforeWrite(e)), h.write(e), i.afterWrite(e);
                }
                a(n, {
                  close: c,
                  open: c,
                  write: function () {
                    for (
                      var e = arguments.length, t = Array(e), n = 0;
                      n < e;
                      n++
                    )
                      t[n] = arguments[n];
                    return s(t.join(""));
                  },
                  writeln: function () {
                    for (
                      var e = arguments.length, t = Array(e), n = 0;
                      n < e;
                      n++
                    )
                      t[n] = arguments[n];
                    return s(t.join("") + "\n");
                  },
                });
                var r = h.win.onerror || c;
                return (
                  (h.win.onerror = function (e, t, n) {
                    i.error({
                      msg: e + " - " + t + ": " + n,
                    }),
                      r.apply(h.win, [e, t, n]);
                  }),
                  h.write(t, function () {
                    a(n, o), (h.win.onerror = r), i.done(), (h = null), p();
                  }),
                  h
                );
              }.apply(void 0, t)),
              e.afterStreamStart());
          }

          function f(e, t, n) {
            if (s.isFunction(n))
              n = {
                done: n,
              };
            else if ("clear" === n) return (d = []), (h = null), void (u = 0);
            n = s.defaults(n, r);
            var i = [
              (e = /^#/.test(e)
                ? window.document.getElementById(e.substr(1))
                : e.jquery
                ? e[0]
                : e),
              t,
              n,
            ];
            return (
              (e.postscribe = {
                cancel: function () {
                  i.stream ? i.stream.abort() : (i[1] = c);
                },
              }),
              n.beforeEnqueue(i),
              d.push(i),
              h || p(),
              e.postscribe
            );
          }
          a(f, {
            streams: {},
            queue: d,
            WriteStream: l.default,
          });
        },
        function (e, t, n) {
          "use strict";
          t.__esModule = !0;
          var i,
            a =
              Object.assign ||
              function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
                }
                return e;
              },
            o = n(3),
            s =
              (i = o) && i.__esModule
                ? i
                : {
                    default: i,
                  },
            r = (function (e) {
              {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                  for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return (t.default = e), t;
              }
            })(n(4));
          var u = "data-ps-";

          function l(e, t) {
            var n = u + t,
              i = e.getAttribute(n);
            return r.existy(i) ? String(i) : i;
          }

          function c(e, t, n) {
            var i = 2 < arguments.length && void 0 !== n ? n : null,
              o = u + t;
            r.existy(i) && "" !== i
              ? e.setAttribute(o, i)
              : e.removeAttribute(o);
          }
          var d =
            ((h.prototype.write = function () {
              var e;
              for (
                (e = this.writeQueue).push.apply(e, arguments);
                !this.deferredRemote && this.writeQueue.length;

              ) {
                var t = this.writeQueue.shift();
                r.isFunction(t) ? this._callFunction(t) : this._writeImpl(t);
              }
            }),
            (h.prototype._callFunction = function (e) {
              var t = {
                type: "function",
                value: e.name || e.toString(),
              };
              this._onScriptStart(t),
                e.call(this.win, this.doc),
                this._onScriptDone(t);
            }),
            (h.prototype._writeImpl = function (e) {
              this.parser.append(e);
              for (
                var t = void 0, n = void 0, i = void 0, o = [];
                (t = this.parser.readToken()) &&
                !(n = r.isScript(t)) &&
                !(i = r.isStyle(t));

              )
                (t = this.options.beforeWriteToken(t)) && o.push(t);
              0 < o.length && this._writeStaticTokens(o),
                n && this._handleScriptToken(t),
                i && this._handleStyleToken(t);
            }),
            (h.prototype._writeStaticTokens = function (e) {
              var t = this._buildChunk(e);
              return t.actual
                ? ((t.html = this.proxyHistory + t.actual),
                  (this.proxyHistory += t.proxy),
                  (this.proxyRoot.innerHTML = t.html),
                  this._walkChunk(),
                  t)
                : null;
            }),
            (h.prototype._buildChunk = function (e) {
              for (
                var t = this.actuals.length,
                  n = [],
                  i = [],
                  o = [],
                  s = e.length,
                  r = 0;
                r < s;
                r++
              ) {
                var a,
                  l = e[r],
                  c = l.toString();
                n.push(c),
                  l.attrs
                    ? /^noscript$/i.test(l.tagName) ||
                      ((a = t++),
                      i.push(c.replace(/(\/?>)/, " " + u + "id=" + a + " $1")),
                      "ps-script" !== l.attrs.id &&
                        "ps-style" !== l.attrs.id &&
                        o.push(
                          "atomicTag" === l.type
                            ? ""
                            : "<" +
                                l.tagName +
                                " " +
                                u +
                                "proxyof=" +
                                a +
                                (l.unary ? " />" : ">")
                        ))
                    : (i.push(c), o.push("endTag" === l.type ? c : ""));
              }
              return {
                tokens: e,
                raw: n.join(""),
                actual: i.join(""),
                proxy: o.join(""),
              };
            }),
            (h.prototype._walkChunk = function () {
              for (var e, t = [this.proxyRoot]; r.existy((e = t.shift())); ) {
                var n,
                  i = 1 === e.nodeType;
                (i && l(e, "proxyof")) ||
                  (i && c((this.actuals[l(e, "id")] = e), "id"),
                  (n = e.parentNode && l(e.parentNode, "proxyof")) &&
                    this.actuals[n].appendChild(e)),
                  t.unshift.apply(t, r.toArray(e.childNodes));
              }
            }),
            (h.prototype._handleScriptToken = function (e) {
              var t = this,
                n = this.parser.clear();
              n && this.writeQueue.unshift(n),
                (e.src = e.attrs.src || e.attrs.SRC),
                (e = this.options.beforeWriteToken(e)) &&
                  (e.src && this.scriptStack.length
                    ? (this.deferredRemote = e)
                    : this._onScriptStart(e),
                  this._writeScriptToken(e, function () {
                    t._onScriptDone(e);
                  }));
            }),
            (h.prototype._handleStyleToken = function (e) {
              var t = this.parser.clear();
              t && this.writeQueue.unshift(t),
                (e.type = e.attrs.type || e.attrs.TYPE || "text/css"),
                (e = this.options.beforeWriteToken(e)) &&
                  this._writeStyleToken(e),
                t && this.write();
            }),
            (h.prototype._writeStyleToken = function (e) {
              var t = this._buildStyle(e);
              this._insertCursor(t, "ps-style"),
                e.content &&
                  (t.styleSheet && !t.sheet
                    ? (t.styleSheet.cssText = e.content)
                    : t.appendChild(this.doc.createTextNode(e.content)));
            }),
            (h.prototype._buildStyle = function (e) {
              var n = this.doc.createElement(e.tagName);
              return (
                n.setAttribute("type", e.type),
                r.eachKey(e.attrs, function (e, t) {
                  n.setAttribute(e, t);
                }),
                n
              );
            }),
            (h.prototype._insertCursor = function (e, t) {
              this._writeImpl('<span id="' + t + '"/>');
              var n = this.doc.getElementById(t);
              n && n.parentNode.replaceChild(e, n);
            }),
            (h.prototype._onScriptStart = function (e) {
              (e.outerWrites = this.writeQueue),
                (this.writeQueue = []),
                this.scriptStack.unshift(e);
            }),
            (h.prototype._onScriptDone = function (e) {
              e === this.scriptStack[0]
                ? (this.scriptStack.shift(),
                  this.write.apply(this, e.outerWrites),
                  !this.scriptStack.length &&
                    this.deferredRemote &&
                    (this._onScriptStart(this.deferredRemote),
                    (this.deferredRemote = null)))
                : this.options.error({
                    msg: "Bad script nesting or script finished twice",
                  });
            }),
            (h.prototype._writeScriptToken = function (e, t) {
              var n = this._buildScript(e),
                i = this._shouldRelease(n),
                o = this.options.afterAsync;
              e.src &&
                ((n.src = e.src),
                this._scriptLoadHandler(
                  n,
                  i
                    ? o
                    : function () {
                        t(), o();
                      }
                ));
              try {
                this._insertCursor(n, "ps-script"), (n.src && !i) || t();
              } catch (e) {
                this.options.error(e), t();
              }
            }),
            (h.prototype._buildScript = function (e) {
              var n = this.doc.createElement(e.tagName);
              return (
                r.eachKey(e.attrs, function (e, t) {
                  n.setAttribute(e, t);
                }),
                e.content && (n.text = e.content),
                n
              );
            }),
            (h.prototype._scriptLoadHandler = function (t, n) {
              function i() {
                t = t.onload = t.onreadystatechange = t.onerror = null;
              }
              var o = this.options.error;

              function e() {
                i(), null != n && n(), (n = null);
              }

              function s(e) {
                i(), o(e), null != n && n(), (n = null);
              }

              function r(e, t) {
                var n = e["on" + t];
                null != n && (e["_on" + t] = n);
              }
              r(t, "load"),
                r(t, "error"),
                a(t, {
                  onload: function () {
                    if (t._onload)
                      try {
                        t._onload.apply(
                          this,
                          Array.prototype.slice.call(arguments, 0)
                        );
                      } catch (e) {
                        s({
                          msg: "onload handler failed " + e + " @ " + t.src,
                        });
                      }
                    e();
                  },
                  onerror: function () {
                    if (t._onerror)
                      try {
                        t._onerror.apply(
                          this,
                          Array.prototype.slice.call(arguments, 0)
                        );
                      } catch (e) {
                        return void s({
                          msg: "onerror handler failed " + e + " @ " + t.src,
                        });
                      }
                    s({
                      msg: "remote script failed " + t.src,
                    });
                  },
                  onreadystatechange: function () {
                    /^(loaded|complete)$/.test(t.readyState) && e();
                  },
                });
            }),
            (h.prototype._shouldRelease = function (e) {
              return (
                !/^script$/i.test(e.nodeName) ||
                !!(
                  this.options.releaseAsync &&
                  e.src &&
                  e.hasAttribute("async")
                )
              );
            }),
            h);

          function h(e) {
            var t =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, h),
              (this.root = e),
              (this.options = t),
              (this.doc = e.ownerDocument),
              (this.win = this.doc.defaultView || this.doc.parentWindow),
              (this.parser = new s.default("", {
                autoFix: t.autoFix,
              })),
              (this.actuals = [e]),
              (this.proxyHistory = ""),
              (this.proxyRoot = this.doc.createElement(e.nodeName)),
              (this.scriptStack = []),
              (this.writeQueue = []),
              c(this.proxyRoot, "proxyof", 0);
          }
          t.default = d;
        },
        function (e, t, n) {
          var i;
          (i = function () {
            return (
              (o = {}),
              (n.m = i =
                [
                  function (e, t, n) {
                    "use strict";
                    var i,
                      o = n(1),
                      s =
                        (i = o) && i.__esModule
                          ? i
                          : {
                              default: i,
                            };
                    e.exports = s.default;
                  },
                  function (e, t, n) {
                    "use strict";
                    t.__esModule = !0;
                    var i,
                      r = c(n(2)),
                      o = c(n(3)),
                      s = n(6),
                      a =
                        (i = s) && i.__esModule
                          ? i
                          : {
                              default: i,
                            },
                      l = n(5);

                    function c(e) {
                      if (e && e.__esModule) return e;
                      var t = {};
                      if (null != e)
                        for (var n in e)
                          Object.prototype.hasOwnProperty.call(e, n) &&
                            (t[n] = e[n]);
                      return (t.default = e), t;
                    }
                    var u = {
                        comment: /^<!--/,
                        endTag: /^<\//,
                        atomicTag:
                          /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
                        startTag: /^</,
                        chars: /^[^<]/,
                      },
                      d =
                        ((h.prototype.append = function (e) {
                          this.stream += e;
                        }),
                        (h.prototype.prepend = function (e) {
                          this.stream = e + this.stream;
                        }),
                        (h.prototype._readTokenImpl = function () {
                          var e = this._peekTokenImpl();
                          if (e)
                            return (
                              (this.stream = this.stream.slice(e.length)), e
                            );
                        }),
                        (h.prototype._peekTokenImpl = function () {
                          for (var e in u)
                            if (u.hasOwnProperty(e) && u[e].test(this.stream)) {
                              var t = o[e](this.stream);
                              if (t)
                                return "startTag" === t.type &&
                                  /script|style/i.test(t.tagName)
                                  ? null
                                  : ((t.text = this.stream.substr(0, t.length)),
                                    t);
                            }
                        }),
                        (h.prototype.peekToken = function () {
                          return this._peekToken();
                        }),
                        (h.prototype.readToken = function () {
                          return this._readToken();
                        }),
                        (h.prototype.readTokens = function (e) {
                          for (var t; (t = this.readToken()); )
                            if (e[t.type] && !1 === e[t.type](t)) return;
                        }),
                        (h.prototype.clear = function () {
                          var e = this.stream;
                          return (this.stream = ""), e;
                        }),
                        (h.prototype.rest = function () {
                          return this.stream;
                        }),
                        h);

                    function h() {
                      var e = this,
                        t =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : "",
                        n =
                          1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : {};
                      !(function (e, t) {
                        if (!(e instanceof t))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this, h),
                        (this.stream = t);
                      var i = !1,
                        o = {};
                      for (var s in r)
                        r.hasOwnProperty(s) &&
                          (n.autoFix && (o[s + "Fix"] = !0),
                          (i = i || o[s + "Fix"]));
                      i
                        ? ((this._readToken = (0, a.default)(
                            this,
                            o,
                            function () {
                              return e._readTokenImpl();
                            }
                          )),
                          (this._peekToken = (0, a.default)(
                            this,
                            o,
                            function () {
                              return e._peekTokenImpl();
                            }
                          )))
                        : ((this._readToken = this._readTokenImpl),
                          (this._peekToken = this._peekTokenImpl));
                    }
                    for (var p in (((t.default = d).tokenToString = function (
                      e
                    ) {
                      return e.toString();
                    }),
                    (d.escapeAttributes = function (e) {
                      var t = {};
                      for (var n in e)
                        e.hasOwnProperty(n) &&
                          (t[n] = (0, l.escapeQuotes)(e[n], null));
                      return t;
                    }),
                    (d.supports = r)))
                      r.hasOwnProperty(p) &&
                        (d.browserHasFlaw = d.browserHasFlaw || (!r[p] && p));
                  },
                  function (e, t) {
                    "use strict";
                    var n = !(t.__esModule = !0),
                      i = !1,
                      o = window.document.createElement("div");
                    try {
                      var s = "<P><I></P></I>";
                      (o.innerHTML = s), (t.tagSoup = n = o.innerHTML !== s);
                    } catch (e) {
                      t.tagSoup = n = !1;
                    }
                    try {
                      (o.innerHTML = "<P><i><P></P></i></P>"),
                        (t.selfClose = i = 2 === o.childNodes.length);
                    } catch (e) {
                      t.selfClose = i = !1;
                    }
                    (o = null), (t.tagSoup = n), (t.selfClose = i);
                  },
                  function (e, t, n) {
                    "use strict";
                    t.__esModule = !0;
                    var r =
                      "function" == typeof Symbol &&
                      "symbol" === _typeof2(Symbol.iterator)
                        ? function (e) {
                            return void 0 === e ? "undefined" : _typeof2(e);
                          }
                        : function (e) {
                            return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : void 0 === e
                              ? "undefined"
                              : _typeof2(e);
                          };
                    (t.comment = function (e) {
                      var t = e.indexOf("--\x3e");
                      if (0 <= t)
                        return new a.CommentToken(e.substr(4, t - 1), t + 3);
                    }),
                      (t.chars = function (e) {
                        var t = e.indexOf("<");
                        return new a.CharsToken(0 <= t ? t : e.length);
                      }),
                      (t.startTag = o),
                      (t.atomicTag = function (e) {
                        var t = o(e);
                        if (t) {
                          var n = e.slice(t.length);
                          if (
                            n.match(
                              new RegExp("</\\s*" + t.tagName + "\\s*>", "i")
                            )
                          ) {
                            var i = n.match(
                              new RegExp(
                                "([\\s\\S]*?)</\\s*" + t.tagName + "\\s*>",
                                "i"
                              )
                            );
                            if (i)
                              return new a.AtomicTagToken(
                                t.tagName,
                                i[0].length + t.length,
                                t.attrs,
                                t.booleanAttrs,
                                i[1]
                              );
                          }
                        }
                      }),
                      (t.endTag = function (e) {
                        var t = e.match(l.endTag);
                        if (t) return new a.EndTagToken(t[1], t[0].length);
                      });
                    var a = n(4),
                      l = {
                        startTag:
                          /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                        endTag: /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
                        attr: /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
                        fillAttr:
                          /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,
                      };

                    function o(e) {
                      var n, i, o;
                      if (-1 !== e.indexOf(">")) {
                        var t = e.match(l.startTag);
                        if (t) {
                          var s =
                            ((n = {}),
                            (i = {}),
                            (o = t[2]),
                            t[2].replace(l.attr, function (e, t) {
                              arguments[2] ||
                              arguments[3] ||
                              arguments[4] ||
                              arguments[5]
                                ? arguments[5]
                                  ? ((n[arguments[5]] = ""),
                                    (i[arguments[5]] = !0))
                                  : (n[t] =
                                      arguments[2] ||
                                      arguments[3] ||
                                      arguments[4] ||
                                      (l.fillAttr.test(t) && t) ||
                                      "")
                                : (n[t] = ""),
                                (o = o.replace(e, ""));
                            }),
                            {
                              v: new a.StartTagToken(
                                t[1],
                                t[0].length,
                                n,
                                i,
                                !!t[3],
                                o.replace(
                                  /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                                  ""
                                )
                              ),
                            });
                          if ("object" === (void 0 === s ? "undefined" : r(s)))
                            return s.v;
                        }
                      }
                    }
                  },
                  function (e, t, n) {
                    "use strict";
                    (t.__esModule = !0),
                      (t.EndTagToken =
                        t.AtomicTagToken =
                        t.StartTagToken =
                        t.TagToken =
                        t.CharsToken =
                        t.CommentToken =
                        t.Token =
                          void 0);
                    var r = n(5);

                    function a(e, t) {
                      if (!(e instanceof t))
                        throw new TypeError(
                          "Cannot call a class as a function"
                        );
                    }
                    (t.Token = function e(t, n) {
                      a(this, e),
                        (this.type = t),
                        (this.length = n),
                        (this.text = "");
                    }),
                      (t.CommentToken =
                        ((i.prototype.toString = function () {
                          return "\x3c!--" + this.content;
                        }),
                        i));

                    function i(e, t) {
                      a(this, i),
                        (this.type = "comment"),
                        (this.length = t || (e ? e.length : 0)),
                        (this.text = ""),
                        (this.content = e);
                    }
                    t.CharsToken =
                      ((o.prototype.toString = function () {
                        return this.text;
                      }),
                      o);

                    function o(e) {
                      a(this, o),
                        (this.type = "chars"),
                        (this.length = e),
                        (this.text = "");
                    }
                    var s = (t.TagToken =
                      ((l.formatTag = function (e, t) {
                        var n,
                          i = 1 < arguments.length && void 0 !== t ? t : null,
                          o = "<" + e.tagName;
                        for (var s in e.attrs) {
                          e.attrs.hasOwnProperty(s) &&
                            ((o += " " + s),
                            (n = e.attrs[s]),
                            (void 0 !== e.booleanAttrs &&
                              void 0 !== e.booleanAttrs[s]) ||
                              (o += '="' + (0, r.escapeQuotes)(n) + '"'));
                        }
                        return (
                          e.rest && (o += " " + e.rest),
                          e.unary && !e.html5Unary ? (o += "/>") : (o += ">"),
                          null != i && (o += i + "</" + e.tagName + ">"),
                          o
                        );
                      }),
                      l));

                    function l(e, t, n, i, o) {
                      a(this, l),
                        (this.type = e),
                        (this.length = n),
                        (this.text = ""),
                        (this.tagName = t),
                        (this.attrs = i),
                        (this.booleanAttrs = o),
                        (this.unary = !1),
                        (this.html5Unary = !1);
                    }
                    t.StartTagToken =
                      ((c.prototype.toString = function () {
                        return s.formatTag(this);
                      }),
                      c);

                    function c(e, t, n, i, o, s) {
                      a(this, c),
                        (this.type = "startTag"),
                        (this.length = t),
                        (this.text = ""),
                        (this.tagName = e),
                        (this.attrs = n),
                        (this.booleanAttrs = i),
                        (this.html5Unary = !1),
                        (this.unary = o),
                        (this.rest = s);
                    }
                    t.AtomicTagToken =
                      ((u.prototype.toString = function () {
                        return s.formatTag(this, this.content);
                      }),
                      u);

                    function u(e, t, n, i, o) {
                      a(this, u),
                        (this.type = "atomicTag"),
                        (this.length = t),
                        (this.text = ""),
                        (this.tagName = e),
                        (this.attrs = n),
                        (this.booleanAttrs = i),
                        (this.unary = !1),
                        (this.html5Unary = !1),
                        (this.content = o);
                    }
                    t.EndTagToken =
                      ((d.prototype.toString = function () {
                        return "</" + this.tagName + ">";
                      }),
                      d);

                    function d(e, t) {
                      a(this, d),
                        (this.type = "endTag"),
                        (this.length = t),
                        (this.text = ""),
                        (this.tagName = e);
                    }
                  },
                  function (e, t) {
                    "use strict";
                    (t.__esModule = !0),
                      (t.escapeQuotes = function (e) {
                        var t =
                          1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : "";
                        return e
                          ? e.replace(/([^"]*)"/g, function (e, t) {
                              return /\\/.test(t) ? t + '"' : t + '\\"';
                            })
                          : t;
                      });
                  },
                  function (e, t) {
                    "use strict";
                    (t.__esModule = !0),
                      (t.default = function (s, n, r) {
                        var i = (function () {
                            var e = [];
                            return (
                              (e.last = function () {
                                return this[this.length - 1];
                              }),
                              (e.lastTagNameEq = function (e) {
                                var t = this.last();
                                return (
                                  t &&
                                  t.tagName &&
                                  t.tagName.toUpperCase() === e.toUpperCase()
                                );
                              }),
                              (e.containsTagName = function (e) {
                                for (var t, n = 0; (t = this[n]); n++)
                                  if (t.tagName === e) return !0;
                                return !1;
                              }),
                              e
                            );
                          })(),
                          a = {
                            startTag: function (e) {
                              var t = e.tagName;
                              "TR" === t.toUpperCase() &&
                              i.lastTagNameEq("TABLE")
                                ? (s.prepend("<TBODY>"), o())
                                : n.selfCloseFix &&
                                  l.test(t) &&
                                  i.containsTagName(t)
                                ? i.lastTagNameEq(t)
                                  ? u(s, i)
                                  : (s.prepend("</" + e.tagName + ">"), o())
                                : e.unary || i.push(e);
                            },
                            endTag: function (e) {
                              i.last()
                                ? n.tagSoupFix && !i.lastTagNameEq(e.tagName)
                                  ? u(s, i)
                                  : i.pop()
                                : n.tagSoupFix && (r(), o());
                            },
                          };

                        function o() {
                          var e,
                            t,
                            n,
                            i,
                            o =
                              ((t = r),
                              (n = (e = s).stream),
                              (i = c(t())),
                              (e.stream = n),
                              i);
                          o && a[o.type] && a[o.type](o);
                        }
                        return function () {
                          return o(), c(r());
                        };
                      });
                    var n =
                        /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,
                      l =
                        /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;

                    function c(e) {
                      return (
                        e &&
                          "startTag" === e.type &&
                          ((e.unary = n.test(e.tagName) || e.unary),
                          (e.html5Unary = !/\/>$/.test(e.text))),
                        e
                      );
                    }

                    function u(e, t) {
                      var n = t.pop();
                      e.prepend("</" + n.tagName + ">");
                    }
                  },
                ]),
              (n.c = o),
              (n.p = ""),
              n(0)
            );

            function n(e) {
              if (o[e]) return o[e].exports;
              var t = (o[e] = {
                exports: {},
                id: e,
                loaded: !1,
              });
              return (
                i[e].call(t.exports, t, t.exports, n),
                (t.loaded = !0),
                t.exports
              );
            }
            var i, o;
          }),
            (e.exports = i());
        },
        function (e, t) {
          "use strict";
          t.__esModule = !0;
          var i =
            "function" == typeof Symbol &&
            "symbol" === _typeof2(Symbol.iterator)
              ? function (e) {
                  return void 0 === e ? "undefined" : _typeof2(e);
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : void 0 === e
                    ? "undefined"
                    : _typeof2(e);
                };

          function o(e) {
            return null != e;
          }

          function s(e, t, n) {
            for (var i = void 0, o = (e && e.length) || 0, i = 0; i < o; i++)
              t.call(n, e[i], i);
          }

          function r(e, t, n) {
            for (var i in e) e.hasOwnProperty(i) && t.call(n, i, e[i]);
          }

          function n(e, t) {
            return (
              !(
                !e ||
                ("startTag" !== e.type && "atomicTag" !== e.type) ||
                !("tagName" in e)
              ) && !!~e.tagName.toLowerCase().indexOf(t)
            );
          }
          (t.existy = o),
            (t.isFunction = function (e) {
              return "function" == typeof e;
            }),
            (t.each = s),
            (t.eachKey = r),
            (t.defaults = function (n, e) {
              return (
                (n = n || {}),
                r(e, function (e, t) {
                  o(n[e]) || (n[e] = t);
                }),
                n
              );
            }),
            (t.toArray = function (n) {
              try {
                return Array.prototype.slice.call(n);
              } catch (e) {
                var t = (function () {
                  var t = [];
                  return (
                    s(n, function (e) {
                      t.push(e);
                    }),
                    {
                      v: t,
                    }
                  );
                })();
                if ("object" === (void 0 === t ? "undefined" : i(t)))
                  return t.v;
              }
            }),
            (t.last = function (e) {
              return e[e.length - 1];
            }),
            (t.isTag = n),
            (t.isScript = function (e) {
              return n(e, "script");
            }),
            (t.isStyle = function (e) {
              return n(e, "style");
            });
        },
      ]),
    (n.c = o),
    (n.p = ""),
    n(0)
  );

  function n(e) {
    if (o[e]) return o[e].exports;
    var t = (o[e] = {
      exports: {},
      id: e,
      loaded: !1,
    });
    return i[e].call(t.exports, t, t.exports, n), (t.loaded = !0), t.exports;
  }
  var i, o;
}),
  (function (e, t) {
    "object" ==
      ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) &&
    "object" == ("undefined" == typeof module ? "undefined" : _typeof2(module))
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define([], t)
      : "object" ==
        ("undefined" == typeof exports ? "undefined" : _typeof2(exports))
      ? (exports.VNumber = t())
      : (e.VNumber = t());
  })(this, function () {
    return (
      (o = {}),
      (i.m = n =
        [
          function (e, t, n) {
            t.a = {
              prefix: "",
              suffix: "",
              thousands: ",",
              decimal: ".",
              step: 0,
              precision: 2,
              min: void 0,
              max: void 0,
            };
          },
          function (e, t, c) {
            var u = c(2),
              d = c(5),
              h = c(0);
            t.a = function (i, n) {
              var o, e, s, r, a, l;
              n.value &&
                ((o = c.i(d.a)(h.a, n.value)),
                "INPUT" !== i.tagName.toLocaleUpperCase() &&
                  (1 !== (e = i.getElementsByTagName("input")).length ||
                    (i = e[0])),
                (s = parseInt(n.value.step) != parseFloat(n.value.step)),
                (r = (s ? parseFloat : parseInt)(n.value.step)),
                (a =
                  null != n.value.min
                    ? (s ? parseFloat : parseInt)(n.value.min)
                    : void 0),
                (l =
                  null != n.value.max
                    ? (s ? parseFloat : parseInt)(n.value.max)
                    : void 0),
                (i.onkeydown = function (e) {
                  var t, n;
                  -1 != ["ArrowUp", "ArrowDown"].indexOf(e.key) &&
                    0 != r &&
                    ((t = "ArrowUp" == e.key ? 1 : -1),
                    (n = i.value.replace(" ", "")),
                    (n = (s ? parseFloat : parseInt)(n) + r * t),
                    null != a && n < a && (n = a),
                    null != l && l < n && (n = l),
                    (i.value = s ? n.toFixed(2) : n),
                    i.dispatchEvent(c.i(u.c)("change")),
                    e.preventDefault());
                }),
                (i.onblur = function () {
                  var e,
                    t = i.value.length - i.selectionEnd;
                  "R$ 0,0" != i.value && i.value
                    ? ((e = /[^0-9 \.\,\-]/g.test(i.value)),
                      ((!n.value.allowText || e) && n.value.allowText) ||
                        (i.value = c.i(u.a)(i.value, o)))
                    : (i.value = ""),
                    (t = Math.max(t, o.suffix.length)),
                    (t = i.value.length - t),
                    (t = Math.max(t, o.prefix.length + 1)),
                    c.i(u.b)(i, t);
                }),
                (i.onfocus = function () {
                  c.i(u.b)(i, i.value.length - o.suffix.length),
                    (i.value = i.value.replace(/[^0-9\.\-]+/g, ""));
                }),
                i.onblur(),
                i.dispatchEvent(c.i(u.c)("input")));
            };
          },
          function (e, t, n) {
            var i = window.number_format;
            n(0);
            n.d(t, "a", function () {
              return i;
            }),
              n.d(t, "d", function () {
                return unformat;
              }),
              n.d(t, "b", function () {
                return setCursor;
              }),
              n.d(t, "c", function () {
                return event;
              });
          },
          function (e, t, n) {
            function i(e, t) {
              t &&
                Object.keys(t).map(function (e) {
                  a.a[e] = t[e];
                }),
                e.directive("number", r.a),
                e.component("number", s.a);
            }
            Object.defineProperty(t, "__esModule", {
              value: !0,
            });
            var o = n(6),
              s = n.n(o),
              r = n(1),
              a = n(0);
            n.d(t, "Number", function () {
              return s.a;
            }),
              n.d(t, "VNumber", function () {
                return r.a;
              }),
              n.d(t, "options", function () {
                return a.a;
              }),
              (t.default = i),
              "undefined" != typeof window && window.Vue && window.Vue.use(i);
          },
          function (e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
              value: !0,
            });
            var n = i(1),
              o = i(0),
              s = i(2);
            t.default = {
              name: "Number",
              props: {
                value: {
                  required: !0,
                  default: 0,
                },
                masked: {
                  type: Boolean,
                  default: 0,
                },
                allowText: {
                  type: Boolean,
                  default: 0,
                },
                precision: {
                  type: Number,
                  default: function () {
                    return Vue.prototype.$account.number.precision;
                  },
                },
                decimal: {
                  type: String,
                  default: function () {
                    return Vue.prototype.$account.number.decimal;
                  },
                },
                thousands: {
                  type: String,
                  default: function () {
                    return Vue.prototype.$account.number.thousands;
                  },
                },
                prefix: {
                  type: String,
                  default: function () {
                    return o.a.prefix;
                  },
                },
                suffix: {
                  type: String,
                  default: function () {
                    return o.a.suffix;
                  },
                },
                step: {
                  type: Number,
                  default: 0,
                },
                min: {
                  type: Number,
                  default: void 0,
                },
                max: {
                  type: Number,
                  default: void 0,
                },
              },
              directives: {
                number: n.a,
              },
              data: function () {
                return {
                  formattedValue: "",
                };
              },
              watch: {
                value: {
                  immediate: !0,
                  handler: function (e) {
                    var t, n;
                    (n =
                      null === e || "" === e
                        ? ""
                        : ((t = /[^0-9 \.\,\-]/g.test(e)),
                          this.allowText && t
                            ? e
                            : i.i(s.a)(e, this.$props))) !==
                      this.formattedValue && (this.formattedValue = n);
                  },
                },
              },
              methods: {
                change: function (e) {
                  var t = /[^0-9 \.\,\-]/g.test(e.target.value);
                  this.$emit(
                    "input",
                    !(this.masked || (this.allowText && t)) && e.target.value
                      ? i.i(s.d)(e.target.value, this.precision)
                      : e.target.value
                  );
                },
              },
            };
          },
          function (e, t, n) {
            "use strict";
            t.a = function (n, i) {
              return (
                (n = n || {}),
                (i = i || {}),
                Object.keys(n)
                  .concat(Object.keys(i))
                  .reduce(function (e, t) {
                    return (e[t] = void 0 === i[t] ? n[t] : i[t]), e;
                  }, {})
              );
            };
          },
          function (e, t, n) {
            var i = n(7)(n(4), n(8), null, null);
            e.exports = i.exports;
          },
          function (e, t) {
            e.exports = function (e, t, n, i) {
              var o,
                s = (e = e || {}),
                r = _typeof2(e.default);
              ("object" !== r && "function" !== r) || (s = (o = e).default);
              var a,
                l = "function" == typeof s ? s.options : s;
              return (
                t &&
                  ((l.render = t.render),
                  (l.staticRenderFns = t.staticRenderFns)),
                n && (l._scopeId = n),
                i &&
                  ((a = l.computed || (l.computed = {})),
                  Object.keys(i).forEach(function (e) {
                    var t = i[e];
                    a[e] = function () {
                      return t;
                    };
                  })),
                {
                  esModule: o,
                  exports: s,
                  options: l,
                }
              );
            };
          },
          function (e, t) {
            e.exports = {
              render: function () {
                var e = this,
                  t = this,
                  n = t.$createElement;
                return (t._self._c || n)("input", {
                  directives: [
                    {
                      name: "number",
                      rawName: "v-number",
                      value: {
                        precision: t.precision,
                        decimal: t.decimal,
                        thousands: t.thousands,
                        prefix: t.prefix,
                        suffix: t.suffix,
                        allowText: t.allowText,
                        step: t.step,
                        min: t.min,
                        max: t.max,
                      },
                      expression:
                        "{precision, decimal, thousands, prefix, suffix}",
                    },
                  ],
                  staticClass: "v-number",
                  attrs: {
                    type: "text",
                  },
                  domProps: {
                    value: t.formattedValue,
                  },
                  on: {
                    change: t.change,
                    focus: function () {
                      e.$emit("focus");
                    },
                    blur: function () {
                      e.$emit("blur");
                    },
                  },
                });
              },
              staticRenderFns: [],
            };
          },
          function (e, t, n) {
            e.exports = n(3);
          },
        ]),
      (i.c = o),
      (i.i = function (e) {
        return e;
      }),
      (i.d = function (e, t, n) {
        i.o(e, t) ||
          Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n,
          });
      }),
      (i.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return i.d(t, "a", t), t;
      }),
      (i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (i.p = "."),
      i((i.s = 9))
    );

    function i(e) {
      if (o[e]) return o[e].exports;
      var t = (o[e] = {
        i: e,
        l: !1,
        exports: {},
      });
      return n[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
    }
    var n, o;
  }),
  (function () {
    var t,
      n,
      s = document.attachEvent,
      r = !1;
    if (!s) {
      var e =
          ((n =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (e) {
              return window.setTimeout(e, 20);
            }),
          function (e) {
            return n(e);
          }),
        i =
          ((t =
            window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.clearTimeout),
          function (e) {
            return t(e);
          }),
        a = function (e) {
          var t = e.__resizeTriggers__,
            n = t.firstElementChild,
            i = t.lastElementChild,
            o = n.firstElementChild;
          (i.scrollLeft = i.scrollWidth),
            (i.scrollTop = i.scrollHeight),
            (o.style.width = n.offsetWidth + 1 + "px"),
            (o.style.height = n.offsetHeight + 1 + "px"),
            (n.scrollLeft = n.scrollWidth),
            (n.scrollTop = n.scrollHeight);
        },
        l = function (t) {
          var n = this;
          a(this),
            this.__resizeRAF__ && i(this.__resizeRAF__),
            (this.__resizeRAF__ = e(function () {
              var e;
              ((e = n).offsetWidth == e.__resizeLast__.width &&
                e.offsetHeight == e.__resizeLast__.height) ||
                ((n.__resizeLast__.width = n.offsetWidth),
                (n.__resizeLast__.height = n.offsetHeight),
                n.__resizeListeners__.forEach(function (e) {
                  e.call(n, t);
                }));
            }));
        },
        o = !1,
        c = "",
        u = "animationstart",
        d = "Webkit Moz O ms".split(" "),
        h =
          "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(
            " "
          ),
        p = "",
        f = document.createElement("fakeelement");
      if ((void 0 !== f.style.animationName && (o = !0), !1 === o))
        for (var m = 0; m < d.length; m++)
          if (void 0 !== f.style[d[m] + "AnimationName"]) {
            (p = d[m]), (c = "-" + p.toLowerCase() + "-"), (u = h[m]), (o = !0);
            break;
          }
      var v = "resizeanim",
        g =
          "@" +
          c +
          "keyframes " +
          v +
          " { from { opacity: 0; } to { opacity: 0; } } ",
        b = c + "animation: 1ms " + v + "; ";
    }
    (window.addResizeListener = function (t, e) {
      var n, i, o;
      s
        ? t.attachEvent("onresize", e)
        : (t.__resizeTriggers__ ||
            ("static" == getComputedStyle(t).position &&
              (t.style.position = "relative"),
            r ||
              ((n =
                (g || "") +
                ".resize-triggers { " +
                (b || "") +
                'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }'),
              (i = document.head || document.getElementsByTagName("head")[0]),
              ((o = document.createElement("style")).type = "text/css"),
              o.styleSheet
                ? (o.styleSheet.cssText = n)
                : o.appendChild(document.createTextNode(n)),
              i.appendChild(o),
              (r = !0)),
            (t.__resizeLast__ = {}),
            (t.__resizeListeners__ = []),
            ((t.__resizeTriggers__ = document.createElement("div")).className =
              "resize-triggers"),
            (t.__resizeTriggers__.innerHTML =
              '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>'),
            t.appendChild(t.__resizeTriggers__),
            a(t),
            t.addEventListener("scroll", l, !0),
            u &&
              t.__resizeTriggers__.addEventListener(u, function (e) {
                e.animationName == v && a(t);
              })),
          t.__resizeListeners__.push(e));
    }),
      (window.removeResizeListener = function (e, t) {
        s
          ? e.detachEvent("onresize", t)
          : (e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t), 1),
            e.__resizeListeners__.length ||
              (e.removeEventListener("scroll", l),
              (e.__resizeTriggers__ = !e.removeChild(e.__resizeTriggers__))));
      });
  })(),
  (window.modules_loaded = {}),
  (window.components_hooks = {}),
  (window.modules_hooks = {}),
  (BlockModel = {
    data: function () {
      return {
        values: {},
      };
    },
    created: function () {
      (this.values = this.defaults), this.checkOptions();
    },
    watch: {
      options: {
        handler: function () {
          this.checkOptions();
        },
        deep: !0,
      },
    },
    methods: {
      isAllowDesign: function () {
        return this.$auth.isAllowTariff("pro");
      },
      checkOptions: function () {
        this.values = _.merge(
          this.defaults || {},
          {
            design: {
              on: !1,
            },
          },
          this.options,
          !0
        );
      },
    },
  }),
  (EventsModel = {
    data: function () {
      return {
        _events: {},
      };
    },
    methods: {
      on: function (i, e) {
        var o = this;
        _.each(e, function (e, t) {
          var n = i + ":" + t;
          o.$io.on("events:" + n, e), (o._events[n] = e);
        });
      },
    },
    beforeDestroy: function () {
      var t = this;
      _.each(Object.keys(this._events), function (e) {
        t.$io.off("events:" + e, t._events[e]);
      });
    },
  }),
  (InfinityModel = {
    data: function () {
      return {
        bottom: !1,
        isInfinityActive: !0,
        fields: [],
        next: 0,
        isFetching: !1,
        isFlowFetching: !1,
      };
    },
    mounted: function () {
      var e = this;
      this.$nextTick(function () {
        e.scroll();
      }),
        "edit" == this.mode && (this.isInfinityActive = !1),
        this.container.on("scroll", this.scroll);
    },
    beforeDestroy: function () {
      this.container.off("scroll", this.scroll);
    },
    watch: {
      bottom: function () {
        this.checkBottom();
      },
      next: function () {
        var e = this;
        this.$nextTick(function () {
          e.scroll(), e.checkBottom();
        });
      },
    },
    computed: {
      container: function () {
        return $mx(this.$device.mobile ? ".main-block" : window);
      },
    },
    methods: {
      scroll: function () {
        this.isInfinityActive && (this.bottom = this.bottomVisible());
      },
      clearData: function () {
        (this.fields = []), (this.next = 0);
      },
      checkBottom: function () {
        this.bottom &&
          !this.isFlowFetching &&
          this.next &&
          ((this.isFlowFetching = !0), this.fetchData(!1, !0));
      },
      bottomVisible: function () {
        var e = this.container[0].scrollY || this.container[0].scrollTop,
          t = document.documentElement.clientHeight;
        return (
          (this.container[0].scrollHeight ||
            document.documentElement.scrollHeight) <
          t + e + 200
        );
      },
    },
  });
var App = (window.$app = {
  modules: {},
  endpoints: {},
  components: {},
  defineModuleLazy: [],
  isClipped: 0,
  isDarkMode: !1,
  data: [],
  colorScheme: window.matchMedia("(prefers-color-scheme: dark)"),
  setClipped: function (e) {
    (this.isClipped += e),
      $mx("html").toggleClass("is-clipped", this.isClipped);
  },
  loadModule: function (e) {
    $mx.lazy("vue." + e + ".js", "vue." + e + ".css"),
      (window.modules_loaded[e] = !0);
  },
  updateAppearance: function () {
    var e;
    $mx(".main-block").length &&
      ((e = Vue.prototype.$account.appearance),
      (this.isDarkMode =
        "auto" == e.theme ? $app.colorScheme.matches : "dark" == e.theme),
      $mx("html")
        .toggleClass("is-dark-mode", this.isDarkMode)[0]
        .style.setProperty("--h", this.isDarkMode ? e.hue : null));
  },
  loadComponent: function (o) {
    var s = this;
    return new Promise(function (e, t) {
      if (null === o) return e(null);
      var n,
        i = /^vue\-([^-]+)/gi.exec(o);
      null != Vue.options.components[o]
        ? e(Vue.options.components[o])
        : (null == Vue.options.components[o] &&
            Vue.component(o, function (e) {
              window.components_hooks[o] = e;
            }),
          i
            ? ((window.components_hooks[o] = e),
              "addons" == (n = i[1]) &&
                -1 != o.indexOf("vue-addons-catalog") &&
                (n =
                  "addons.catalog." +
                  (n = o.split("vue-addons-catalog-")[1].split("-")[0])),
              null == window.modules_loaded[n] && s.loadModule(n))
            : t());
    });
  },
  defineComponent: function (e, t, n) {
    null == this.components[e] && (this.components[e] = {}),
      (this.components[e][t] = [t, n]),
      (window.modules_loaded[e] = !0),
      Vue.component(t, n);
  },
  defineModuleComplete: function () {
    var t = this;
    _.each(this.defineModuleLazy, function (e) {
      t.defineModule(e[0], e[1], !0);
    }),
      (this.defineModuleLazy = []);
  },
  defineModule: function (i, n, e) {
    var o,
      s = this;
    null != window.$vue || null != e
      ? "index" == i || "frontend" == i
        ? ((function e(t) {
            _.each(t, function (n) {
              (n.pathToRegexpOptions = {
                strict: !0,
              }),
                null != window.account &&
                  "/" != n.path &&
                  (window.account.custom_domain ||
                    (n.path = "/:username" + n.path),
                  (n.component = "vue-frontend-page")),
                "string" == typeof n.component
                  ? ((n.componentName = n.component),
                    (n.component = function (e, t) {
                      $app.loadComponent(n.componentName).then(e, t);
                    }))
                  : null == n.component &&
                    (n.component = {
                      template: "<router-view></router-view>",
                    }),
                null != n.children && n.children.length && e(n.children);
            });
          })(n),
          (router_options.routes = n),
          ((router = new VueRouter(router_options)).getRoute = function (e) {
            return (function e(t, n) {
              if (((r = _.find(t, n)), r)) return r;
              for (var i = 0; i < t.length; i++)
                if ((null != t[i].children && (r = e(t[i].children, n)), r))
                  return r;
              return null;
            })(this.options.routes, e);
          }),
          router.beforeEach(function (e, t, n) {
            window.$events.fire("beforeNavigate", {
              from: t,
              to: e,
            }),
              n();
          }),
          router.afterEach(function (e) {
            null != e.meta &&
              null != e.meta.statistic_event &&
              window.$events.fire("statistic:event", {
                name: "screen_" + e.meta.statistic_event,
              }),
              window.$events.fire("navigate", e);
          }),
          null == window.account &&
            router.beforeResolve(function (n, e, i) {
              function t() {
                var e,
                  t = null;
                null != n.meta && null != n.meta.module
                  ? (t = n.meta.module)
                  : (e = /^\/[0-9]+\/([^\/]+)\//gi.exec(n.path)) &&
                    e.length &&
                    (t = e[1].replace(/\-/g, ".")),
                  t && null == window.modules_loaded[t]
                    ? ((window.components_hooks[t] = function () {
                        i(), router.replace(router.currentRoute);
                      }),
                      s.loadModule(t))
                    : i();
              }
              0 == n.matched.length
                ? Vue.prototype.$auth.refresh(null, function () {
                    (n = router.resolve(n.path).route), t();
                  })
                : t();
            }),
          (window.vue_options.router = router))
        : ((o = function () {
            var t, e;
            !(function e(t) {
              _.each(t, function (n) {
                (n.pathToRegexpOptions = {
                  strict: !0,
                }),
                  null == n.meta && (n.meta = {}),
                  (n.meta.module = i),
                  null != n.children &&
                    ((n.children = _.filter(n.children, function (e) {
                      if (null == e.meta || null == e.meta.endpoint) return !0;
                      var t = e.meta.endpoint.split("/"),
                        n = s.endpoints,
                        i = !0;
                      for (var o in t) {
                        if (
                          !(
                            null != n[t[o]] ||
                            -1 != _.findIndex(n, t[o]) ||
                            (_.isArray(n) && -1 != n.indexOf(t[o]))
                          )
                        ) {
                          i = !1;
                          break;
                        }
                        n = _.isArray(n) ? null : n[t[o]];
                      }
                      return i;
                    })),
                    null != n.children && n.children.length && e(n.children)),
                  null != n.children &&
                    n.children.length &&
                    null == n.component &&
                    null == n.redirect &&
                    (n.redirect = n.path + n.children[0].path),
                  "string" == typeof n.component
                    ? ((n.componentName = n.component),
                      (n.component = function (e, t) {
                        $app.loadComponent(n.componentName).then(e, t);
                      }))
                    : null == n.component &&
                      (n.component = {
                        template: "<router-view></router-view>",
                      }),
                  null == router &&
                    base &&
                    (n.path = base + n.path.substring(1));
              });
            })(n),
              (s.modules[i] = n),
              _.each(s.components[i], function (e) {
                null != window.components_hooks[e[0]] &&
                  window.components_hooks[e[0]](e[1]);
              }),
              delete s.components[i],
              null != router &&
                n.length &&
                ((t = router.getRoute({
                  name: i,
                }))
                  ? (t.children = n)
                  : ((t = router.getRoute({
                      name: "main",
                    })),
                    _.each(n, function (e) {
                      router.getRoute({
                        name: e.name,
                      }) || t.children.splice(t.children.length - 4, 0, e);
                    }),
                    window.$events.fire("menu:updated")),
                (router_options.routes = router.options.routes),
                (e = new VueRouter(router_options)),
                (router.matcher = e.matcher)),
              null != window.components_hooks[i] &&
                window.components_hooks[i](n);
          }),
          -1 != i.indexOf("addons.catalog.")
            ? o()
            : $mx
                .get("/api/permissions/get.json", {
                  module: i,
                })
                .then(function (e) {
                  var t,
                    n = e.data;
                  "success" == n.result &&
                    ((t = n.response.endpoints[i]), (s.endpoints[i] = t)),
                    o();
                }))
      : this.defineModuleLazy.push([i, n]);
  },
  scrollScreen: function (e, t) {
    var n = 0 < arguments.length && void 0 !== e ? e : 0,
      i = 1 < arguments.length && void 0 !== t ? t : 300;
    return new Promise(function (e, t) {
      scrollIt(
        n,
        "y",
        $device.mobile ? $mx(".main-block")[0] : null,
        i,
        "linear",
        e
      );
    });
  },
  defineLanguage: function (e, t, n) {
    null == i18n.phrases[e] && (i18n.phrases[e] = {}),
      Object.assign(i18n.phrases[e], n),
      (i18n.first_day_week[e] = t),
      (i18n.inited = !0),
      i18n.keyComponent++,
      window.$events.fire("locale:updated"),
      window.$vue && window.$vue.$forceUpdate();
  },
  defineAddonLanguage: function (e, t) {
    null == i18n.phrases[i18n.locale] && (i18n.phrases[i18n.locale] = {}),
      Object.assign(i18n.phrases[i18n.locale], t),
      delete window.account.locales["addons." + e],
      window.$events.fire("locale:updated", {
        target: e,
      }),
      window.$vue.$forceUpdate();
  },
});
App.colorScheme.addEventListener("change", App.updateAppearance),
  (function (n) {
    "use strict";
    (n.i18n = Vue.observable({
      locale: $mx("html").attr("lang"),
      keyComponent: 0,
      formats: {},
      phrases: {},
      counties: {},
      inited: !1,
      first_day_week: {
        ru: 1,
      },
      init: function (e) {
        null != e.locales && (n.locales = e.locales);
        var t = $mx("html");
        (this.formats = {
          date: t.data("format-date"),
          datetime: t.data("format-datetime"),
        }),
          (this.inited = "ru" == this.locale),
          null == n.account && this.setLocale(this.locale);
      },
      setLocale: function (e, t) {
        var n = 1 < arguments.length && void 0 !== t ? t : "";
        null == this.phrases[e] &&
          ((this.phrases[e] = {}), $mx.lazy("locales." + n + e + ".js")),
          (this.locale = e);
      },
      extend: function (e) {
        this.phrases[this.locale] = Object.assign(this.phrases[this.locale], e);
      },
      install: function (o) {
        function e(e, t) {
          var n = 1 < arguments.length && void 0 !== t && t;
          if ((p.keyComponent, !(e = e || ""))) return e;
          var i = new RegExp("[\\u0400-\\u04FF]"),
            o =
              "ru" == p.locale || !i.test(e[0]) || n
                ? e
                : e.replace(/[^ ]/g, "•");
          return "string" ==
            typeof (e =
              p.phrases[p.locale] && p.phrases[p.locale][e]
                ? p.phrases[p.locale][e]
                : o)
            ? e.split("|")[0]
            : e;
        }

        function t(e, t) {
          var n = (p.phrases[p.locale] && p.phrases[p.locale][e]) || e;
          if ((n = n.split("|")).length) {
            if (1 == n.length) return t + " " + n[0];
            if (0 == (t = Math.abs(t))) return n[2];
            return (
              t +
              " " +
              n[
                4 < t % 100 && t % 100 < 20
                  ? 2
                  : [2, 0, 1, 1, 1, 2][Math.min(t % 10, 5)]
              ]
            );
          }
          return t + " " + e;
        }

        function n(e, t) {
          null == t && (t = 0);
          var n = o.prototype.$account.number;
          return _.isNumber(e)
            ? window.number_format(e, {
                decimal: n.decimal,
                thousands: n.thousands,
                precision: t,
              })
            : e;
        }

        function i(e) {
          return _.isNumber(e)
            ? window.number_format(e, o.prototype.$account.number)
            : e;
        }

        function s(e, t, n) {
          var i = _.isObject(t) ? t : o.prototype.$account.currency;
          return (
            (null != t && !_.isObject(t)) || (t = i.title),
            null == n && (n = i.format),
            _.isNumber(e)
              ? n
                  .replace("%p", window.number_format(e, i))
                  .replace("%c", t)
                  .replace(/ /g, " ")
              : e
          );
        }

        function r(e) {
          return e
            ? date_format(
                p.formats.datetime,
                _.isNumber(e) ? e : (Date.parse(e) / 1e3) | 0
              )
            : e;
        }

        function a(e) {
          return e
            ? date_format(
                p.formats.date,
                _.isNumber(e) ? e : (Date.parse(e) / 1e3) | 0
              )
            : e;
        }

        function l() {
          var n = arguments;
          return n[0].replace(/{(\d+)}/g, function (e, t) {
            return void 0 !== n[t] ? n[t] : e;
          });
        }

        function c(e) {
          return (
            (null != e && null != e) || (e = ""),
            "string" == typeof e ? e.replace(/\n/g, "<br>") : e
          );
        }

        function u(e) {
          return e
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        }

        function d(e, t) {
          return void 0 === e || null == e || "" === e ? t : e;
        }

        function h(e, t) {
          return e
            ? (1 < arguments.length &&
                void 0 !== t &&
                t &&
                (e = e
                  .toString()
                  .replace(/<([^=])/g, "&lt;$1")
                  .replace(/>([^=]|$)/g, "&gt;$1")
                  .replace(/&lt;(\/?)(s|b|strong|i|u)&gt;/gi, "<$1$2>")),
              window.typography.process(e, o.prototype.$account.language_code))
            : e;
        }
        var p = this;
        o.filter("typography", h),
          (o.prototype.$typography = h),
          o.filter("gettext", e),
          (o.prototype.$gettext = e),
          o.filter("plural", t),
          (o.prototype.$plural = t),
          o.filter("number", n),
          o.filter("weight", function (e, t) {
            var n = o.prototype.$account.weight;
            return (
              (_.isNumber(e) ? window.number_format(e, n) : e) +
              (t ? " " + n.unit_title : "")
            );
          }),
          (o.prototype.$number = n),
          o.filter("decimal", i),
          (o.prototype.$decimal = i),
          o.filter("currency", s),
          (o.prototype.$currency = s),
          o.filter("datetime", r),
          (o.prototype.$datetime = r),
          o.filter("date", a),
          (o.prototype.$date = a),
          o.filter("nvl", d),
          (o.prototype.$nvl = d),
          (o.prototype.$parseContacts = function (e, r, t) {
            var a = 2 < arguments.length && void 0 !== t && t;
            null == r && (r = "a"), (null != e && null != e) || (e = "");
            var l =
              '<div class="video-container is-youtube"><iframe frameborder="0" src="{{1}}" allowfullscreen="allowfullscreen" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></div>';
            return c(
              e
                .replace(
                  /(\s?[\>\;]?)([a-zA-Zа-яА-Я0-9\.\-\_\-]+@[0-9A-Za-z][0-9A-Za-zА-Яа-я\-\.]*\.[A-Za-zА-Яа-я]*)/g,
                  "$1<" +
                    r +
                    ' href="mailto:$2" target="_blank" style="color: inherit">$2</' +
                    r +
                    ">"
                )
                .replace(/\+([0-9]*[-\s\(\)0-9]*)/g, function (e) {
                  return (
                    "<" +
                    r +
                    ' href="tel:+' +
                    e.replace(/[^0-9]/g, "") +
                    '" target="_blank" style="color: inherit">' +
                    e +
                    "</" +
                    r +
                    ">"
                  );
                })
                .replace(
                  /(\s?[\>\;]?)(http|https|ftp|ftps|tel)\:\/\/([а-яА-Яa-zA-Z0-9\-\.]+\.[а-яА-Яa-zA-Z]{2,})(\/[^\s"'<]*)?/g,
                  function (e, t, n, i, o) {
                    var s = n + "://" + i + (o || "");
                    switch (i) {
                      case "www.youtube.com":
                      case "youtube.com":
                        if (a)
                          return (
                            (s = s.replace("/watch?v=", "/embed/")),
                            t + l.replace("{{1}}", s)
                          );
                      case "youtu.be":
                        if (a)
                          return (
                            t +
                            l.replace("{{1}}", "https://youtube.com/embed/" + o)
                          );
                        break;
                      default:
                        return (
                          t +
                          "<" +
                          r +
                          ' href="' +
                          s +
                          '" target="_blank" style="color: inherit" class="link">' +
                          s +
                          "</" +
                          r +
                          ">"
                        );
                    }
                  }
                )
            );
          }),
          o.filter("sprintf", function (e, t) {
            return t.replace("%s", e);
          }),
          o.filter("replace", function () {
            var e = arguments;
            return e[0].replace(e[1], e[2]);
          }),
          o.filter("format", l),
          o.filter("nl2br", c),
          o.filter("escape", u),
          o.filter("lowercase", function (e) {
            return e.toString().toLowerCase();
          }),
          o.filter("uppercase", function (e) {
            return e.toString().toUpperCase();
          }),
          (o.prototype.$nl2br = c),
          (o.prototype.$format = l),
          (o.prototype.$escape = u),
          (o.prototype.$clone = function (e) {
            return JSON.parse(JSON.stringify(e));
          }),
          o.filter("join", function (e, t) {
            return e ? e.join(t) : e;
          }),
          (o.prototype.$getDaysNames = function () {
            return _.map(
              ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
              o.prototype.$gettext
            );
          }),
          (o.prototype.$getMonthsNames = function () {
            return _.map(
              [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ],
              o.prototype.$gettext
            );
          }),
          (o.prototype.$getFirstDayWeek = function () {
            return p.first_day_week[p.locale];
          });
      },
    })),
      (n.IconsCache = {
        icons: {},
        wait: {},
        empty:
          '<img src="data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==">',
        modes: {
          tabler: "stroke",
          icofont: "fill",
          legacy: "fill",
        },
        install: function (e) {
          e.prototype.$icons = this;
        },
        prepare: function (e, t) {
          switch (e.t || "i") {
            case "i":
              if (e.i)
                return (
                  '<div class="is-icon">' +
                  (this.get(e.i, t) || this.empty) +
                  "</div>"
                );
              break;
            case "p":
              if (e.p)
                return (
                  '<div class="is-picture" style="background-image:url(' +
                  ("//" +
                    Vue.prototype.$account.storage_domain +
                    "/p/" +
                    e.p.filename) +
                  ')">' +
                  this.empty +
                  "</div>"
                );
          }
          return null;
        },
        get: function (t, e) {
          var n = this;
          if (
            (-1 == t.indexOf("/") && (t = "tabler/" + t),
            void 0 === this.icons[t])
          ) {
            this.icons[t] = null;
            var i = "/s/icons/" + t + ".svg";
            (this.wait[t] = [e]),
              $mx
                .get(i)
                .then(function (e) {
                  (n.icons[t] = e.data.replace(
                    "<svg",
                    '<svg data-mode="' + n.modes[t.split("/")[0]] + '"'
                  )),
                    _.each(n.wait[t], function (e) {
                      return _.isFunction(e) ? e() : e.$forceUpdate();
                    }),
                    delete n.wait[t];
                })
                .catch(function () {
                  delete n.icons[t];
                });
          } else {
            if (null !== this.icons[t]) return this.icons[t];
            this.wait[t].push(e);
          }
        },
      }),
      Vue.use(i18n),
      Vue.use(IconsCache);
  })((document, window));
var gestures = ["tap", "pan", "pinch", "press", "rotate", "swipe"],
  subGestures = [
    "panstart",
    "panend",
    "panmove",
    "pancancel",
    "pinchstart",
    "pinchmove",
    "pinchend",
    "pinchcancel",
    "pinchin",
    "pinchout",
    "pressup",
    "rotatestart",
    "rotatemove",
    "rotateend",
    "rotatecancel",
  ],
  directions = ["up", "down", "left", "right", "horizontal", "vertical", "all"],
  VueHammer = {
    config: {},
    customEvents: {},
    install: function (e) {
      var d = this;
      e.directive("hammer", {
        bind: function (n, t) {
          n.hammer || (n.hammer = new Hammer.Manager(n));
          var e = n.hammer,
            i = t.arg;
          i || console.warn("[vue-hammer] event type argument is required."),
            (n.__hammerConfig = n.__hammerConfig || {}),
            (n.__hammerConfig[i] = {});
          var o = t.modifiers;
          (n.__hammerConfig[i].direction = n.__hammerConfig[i].direction || []),
            Object.keys(o).length &&
              Object.keys(o)
                .filter(function (e) {
                  return t.modifiers[e];
                })
                .forEach(function (e) {
                  var t = n.__hammerConfig[i].direction;
                  -1 === t.indexOf(e) && t.push(String(e));
                });
          var s = void 0,
            r = void 0;
          if (d.customEvents[i]) {
            var a = d.customEvents[i],
              s = a.type;
            (r = new Hammer[d.capitalize(s)](a)).recognizeWith(e.recognizers),
              e.add(r);
          } else {
            s = gestures.find(function (e) {
              return e === i;
            });
            var l = subGestures.find(function (e) {
              return e === i;
            });
            if (!s && !l)
              return void console.warn("[vue-hammer] invalid event type: " + i);
            if (
              (l &&
                0 !== n.__hammerConfig[l].direction.length &&
                console.warn(
                  "[vue-hammer] " + l + " should not have directions"
                ),
              !s)
            )
              return;
            if (
              ("tap" === s ||
                "pinch" === s ||
                "press" === s ||
                "rotate" === s) &&
              0 !== n.__hammerConfig[s].direction.length
            )
              throw Error("[vue-hammer] " + s + " should not have directions");
            (r = e.get(s)) ||
              ((r = new Hammer[d.capitalize(s)]()).recognizeWith(e.recognizers),
              e.add(r));
            var c = d.config[s];
            c && (d.guardDirections(c), r.set(c));
            var u = n.hammerOptions && n.hammerOptions[s];
            u && (d.guardDirections(u), r.set(u));
          }
        },
        inserted: function (e, t) {
          var n = e.hammer,
            i = t.arg,
            o = subGestures.find(function (e) {
              return e === i;
            })
              ? i
              : d.buildEventWithDirections(i, e.__hammerConfig[i].direction);
          n.handler && n.off(o, n.handler),
            "function" != typeof t.value
              ? ((n.handler = null),
                console.warn(
                  "[vue-hammer] invalid handler function for v-hammer: " + t.arg
                ))
              : n.on(o, (n.handler = t.value));
        },
        componentUpdated: function (e, t) {
          var n = e.hammer,
            i = t.arg,
            o = subGestures.find(function (e) {
              return e === i;
            })
              ? i
              : d.buildEventWithDirections(i, e.__hammerConfig[i].direction);
          n.handler && n.off(o, n.handler),
            "function" != typeof t.value
              ? ((n.handler = null),
                console.warn(
                  "[vue-hammer] invalid handler function for v-hammer: " + t.arg
                ))
              : n.on(o, (n.handler = t.value));
        },
        unbind: function (e, t) {
          var n = e.hammer,
            i = t.arg,
            o = subGestures.find(function (e) {
              return e === i;
            })
              ? i
              : d.buildEventWithDirections(i, e.__hammerConfig[i].direction);
          n.handler && e.hammer.off(o, n.handler),
            Object.keys(n.handlers).length ||
              (e.hammer.destroy(), (e.hammer = null));
        },
      });
    },
    guardDirections: function (e) {
      var t,
        n = e.direction;
      "string" == typeof n &&
        ((t = "DIRECTION_" + n.toUpperCase()),
        -1 < directions.indexOf(n) && Hammer.hasOwnProperty(t)
          ? (e.direction = Hammer[t])
          : console.warn("[vue-hammer] invalid direction: " + n));
    },
    buildEventWithDirections: function (t, e) {
      var n = {};
      e.forEach(function (e) {
        "horizontal" === (e = e.toLowerCase())
          ? ((n.left = 1), (n.right = 1))
          : "vertical" === e
          ? ((n.up = 1), (n.down = 1))
          : "all" === e
          ? ((n.left = 1), (n.right = 1), (n.up = 1), (n.down = 1))
          : (n[e] = 1);
      });
      var i = Object.keys(n);
      return 0 === i.length
        ? t
        : i
            .map(function (e) {
              return t + e;
            })
            .join(" ");
    },
    capitalize: function (e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
  };
(VueHammer.config.swipe = {
  threshold: 200,
}),
  Vue.use(VueHammer),
  Vue.component("mx-phone", {
    data: function () {
      return {
        tmp: "",
      };
    },
    props: {
      value: String,
      disabled: Boolean,
      required: Boolean,
      isValid: Boolean,
      name: String,
      title: String,
      classname: String,
    },
    created: function () {
      this.tmp = this.value;
    },
    mounted: function () {
      var t = this;
      $mx(this.$refs.hidden).on("change", function (e) {
        t.$emit("input", e.target.value);
      }),
        $mx(this.$refs.valid).on("change", function (e) {
          t.$emit("update:isValid", !!parseInt(e.target.value));
        });
    },
    template:
      '<div><input type="tel" @focus="$emit(\'focus\')" @blur="$emit(\'blur\')" :data-country="$account.client.country" :data-title="title" :value="tmp" :name="name" autocorrect="off" autocapitalize="none" :disabled="disabled" :required="required" :class="classname"><input type="hidden" ref="hidden" class="tel-code" v-model="tmp"><input type="hidden" ref="valid" class="tel-valid"></div>',
  }),
  Vue.directive("focus", {
    inserted: function (e) {
      window.$device.desktop &&
        setTimeout(function () {
          e.focus();
        }, 0);
    },
  }),
  Vue.component("mx-modal", {
    props: {
      active: Boolean,
      component: [Object, Function],
      content: String,
      programmatic: Boolean,
      props: Object,
      events: Object,
      width: {
        type: [String, Number],
        default: 960,
      },
      hasModalCard: Boolean,
      animation: {
        type: String,
        default: "zoom-out",
      },
      parentNode: Object,
      parent: Object,
      customClass: String,
      canCancel: {
        type: [Array, Boolean],
        default: function () {
          return ["outside", "button"];
        },
      },
      onCancel: {
        type: Function,
        default: function () {},
      },
      scroll: {
        type: String,
        default: function () {
          return "clip";
        },
        validator: function (e) {
          return 0 <= ["clip", "keep"].indexOf(e);
        },
      },
    },
    data: function () {
      return {
        isActive: this.active || !1,
        savedScrollTop: null,
        newWidth:
          "number" == typeof this.width ? this.width + "px" : this.width,
      };
    },
    computed: {
      cancelOptions: function () {
        return "boolean" == typeof this.canCancel
          ? this.canCancel
            ? ["escape", "x", "outside", "button"]
            : []
          : this.canCancel;
      },
      showX: function () {
        return 0 <= this.cancelOptions.indexOf("x");
      },
    },
    watch: {
      active: function (e) {
        this.isActive = e;
      },
      isActive: function () {
        this.handleScroll();
      },
    },
    methods: {
      handleScroll: function () {
        "undefined" != typeof window &&
          ("clip" !== this.scroll
            ? ((this.savedScrollTop = this.savedScrollTop
                ? this.savedScrollTop
                : document.documentElement.scrollTop),
              this.isActive
                ? document.body.classList.add("is-noscroll")
                : document.body.classList.remove("is-noscroll"),
              this.isActive
                ? (document.body.style.top = "-" + this.savedScrollTop + "px")
                : ((document.documentElement.scrollTop = this.savedScrollTop),
                  (document.body.style.top = null),
                  (this.savedScrollTop = null)))
            : this.isActive
            ? document.documentElement.classList.add("is-clipped")
            : document.documentElement.classList.remove("is-clipped"));
      },
      cancel: function (e) {
        this.cancelOptions.indexOf(e) < 0 ||
          (this.onCancel.apply(null, arguments), this.close());
      },
      close: function () {
        var e = this;
        this.$emit("close"),
          this.$emit("update:active", !1),
          this.programmatic &&
            ((this.isActive = !1),
            setTimeout(function () {
              e.$destroy(), e.$el.remove();
            }, 150));
      },
      keyPress: function (e) {
        this.isActive && 27 === e.keyCode && this.cancel("escape");
      },
    },
    created: function () {
      "undefined" != typeof window &&
        document.addEventListener("keyup", this.keyPress);
    },
    beforeMount: function () {
      this.programmatic && $mx(".page-content")[0].appendChild(this.$el);
    },
    mounted: function () {
      this.programmatic
        ? (this.isActive = !0)
        : this.isActive && this.handleScroll();
    },
    beforeDestroy: function () {
      var e;
      "undefined" != typeof window &&
        (document.removeEventListener("keyup", this.keyPress),
        document.documentElement.classList.remove("is-clipped"),
        (e = this.savedScrollTop
          ? this.savedScrollTop
          : document.documentElement.scrollTop),
        document.body.classList.remove("is-noscroll"),
        (document.documentElement.scrollTop = e),
        (document.body.style.top = null));
    },
    template:
      '\n    <transition :name="animation">\n        <div v-if="isActive" class="modal is-active" :class="customClass">\n            <div class="modal-background" @click="cancel(\'outside\')"/>\n            <div\n                class="animation-content"\n                :class="{ \'modal-content\': !hasModalCard }"\n                :style="{ maxWidth: newWidth }">\n                <component\n                    v-if="component"\n                    v-bind="props"\n                    v-on="events"\n                    :is="component"\n                    @close="close"/>\n                <div\n                    v-else-if="content"\n                    v-html="content"/>\n                <slot v-else/>\n            </div>\n            <button\n                type="button"\n                v-if="showX"\n                class="modal-close is-large"\n                @click="cancel(\'x\')"/>\n        </div>\n    </transition>\n    ',
  }),
  (function (r) {
    "scrollRestoration" in r.history &&
      (r.history.scrollRestoration = "manual"),
      (r.$scroll = {
        preventParts: {},
        position: {
          x: 0,
          y: 0,
        },
        body: null,
        init: function () {
          $mx("html").addClass("has-page-fixed"), (this.body = $mx(".page"));
          var e = $mx(r);
          this.body.on("scroll touchmove", function () {
            e.trigger("scroll");
          });
        },
        scroll: function () {
          var e = this.body[0];
          this.position
            ? _.isObject(this.position)
              ? e.scroll(this.position.x, this.position.y)
              : $page.scrollTo(this.position)
            : null === this.position && $page.scrollTo(),
            (this.position = {
              x: 0,
              y: 0,
            });
        },
      }),
      r.history &&
        _.isFunction(r.history.pushState) &&
        (r.$events.on("beforeNavigate", function (e, t) {
          var n, i, o, s;
          r.$scroll.body &&
            ((n = r.$scroll.body[0]),
            t.from &&
              null != t.from.params.part &&
              null != t.to.params.part &&
              t.from.params.part == t.to.params.part &&
              void 0 !== r.$scroll.preventParts[t.from.params.part] &&
              (r.$scroll.position = !1),
            (i = _.merge(history.state, {
              scroll: {
                x: n.scrollLeft,
                y: n.scrollTop,
              },
            })),
            (o = window.location.protocol + "//" + r.location.host),
            (s = window.location.href.replace(o, "")),
            r.history.replaceState(i, "", s));
        }),
        r.addEventListener("popstate", function () {
          history.state &&
            void 0 !== history.state.scroll &&
            (r.$scroll.position = history.state.scroll);
        }));
  })(window),
  console.log("Init frontend");
var router = null,
  router_options = {
    mode: "history",
    routes: [],
    base: "/",
    linkExactActiveClass: "active",
    linkActiveClass: "active",
  };

function openUrlWithFallback(e, t) {
  var n,
    i,
    o,
    s,
    r,
    a = document.querySelector("#launcher"),
    l = ($device.isSafari || $device.isInstagram) && $device.isMobile;
  a ||
    (((a = document.createElement("iframe")).id = "launcher"),
    (a.style.display = "none"),
    document.body.appendChild(a),
    (a.onError = function () {})),
    t &&
      ((n = Date.now()),
      (i = !0),
      (o = setTimeout(function () {
        try {
          window.top.location = e;
        } catch (e) {}
      }, 300)),
      (s = setTimeout(function () {
        (!l && (1250 < Date.now() - n || !i)) || (window.top.location = t);
      }, 1200)),
      l ||
        ((r = function e() {
          (i = !1),
            clearTimeout(o),
            clearTimeout(s),
            window.removeEventListener("blur", e, !1),
            window.removeEventListener("pagehide", e, !1);
        }),
        window.addEventListener("blur", r, !1),
        window.addEventListener("pagehide", r, !1))),
    (a.src = e);
}
(window.vue_options = {}),
  Vue.use({
    install: function (e) {
      (e.prototype.$history = new e({
        data: {
          stackBack: [],
        },
        created: function () {
          var o = this;
          window.$events.on("navigate", function (e, t) {
            var n, i;
            1 < o.stackBack.length &&
            ((n = o.stackBack[o.stackBack.length - 2]),
            (i = t),
            n.path == i.path && _.isEqual(n.params, i.params))
              ? o.stackBack.pop()
              : o.stackBack.push(t);
          });
        },
        computed: {
          prevName: function () {
            return 1 < this.stackBack.length
              ? this.stackBack[this.stackBack.length - 2].name
              : null;
          },
          prev: function () {
            return 1 < this.stackBack.length
              ? this.stackBack[this.stackBack.length - 2]
              : null;
          },
        },
      })),
        (window.$page = e.prototype.$page =
          new e({
            data: {
              page_filename: null,
              page_id: null,
              max_width: "lg",
            },
            methods: {
              scrollTo: function (e, t) {
                var n,
                  i = 1 < arguments.length && void 0 !== t ? t : 300,
                  o = $mx(".page")[0];
                e
                  ? (-1 == ["#", "."].indexOf(e[0]) &&
                      (e = '[name="' + e + '"]'),
                    (n = $mx(
                      ".has-menu-placement-top .menu-block-container.is-fixed"
                    )),
                    $mx(e).scrollIt(i, "y", o, "easeInQuad", null, null, {
                      x: 0,
                      y: n.length ? -(n.outerHeight() + 15) : 0,
                    }))
                  : scrollIt(0, "y", o, i);
              },
            },
          })),
        (e.prototype.$links = new e({
          data: {
            postfix: {},
            platform: "",
            cookies: {},
          },
          created: function () {
            var n = this;
            window.$events.on("links_postfix.set", function (e, t) {
              n.postfix = Object.assign({}, n.postfix, t);
            }),
              window.$events.on("links_variables.set", function (e, t) {
                n.cookies = Object.assign({}, n.cookies, t);
              }),
              (this.cookies = Cookies.get()),
              null != this.cookies.clt &&
                null != this.cookies.clid &&
                (this.postfix.tpclid =
                  this.cookies.clt + "." + this.cookies.clid);
            var e = navigator.userAgent.toLowerCase();
            /iphone|ipad|ipod/.test(e) && (this.platform = "ios"),
              -1 != e.indexOf("android") && (this.platform = "android");
          },
          methods: {
            checkVariables: function (e) {
              var n = this;
              return (e = e
                ? e.replace(
                    /\%7B\%7B([a-z\_\-0-9]+)\%7D\%7D/g,
                    function (e, t) {
                      return escape(n.cookies[t] || "{{" + t + "}}");
                    }
                  )
                : "");
            },
            application: function (e) {
              return this.checkVariables(
                null != e.a &&
                  ((this.platform && null != e.a[this.platform]) ||
                    null != e.a.default)
                  ? e.a[this.platform] || e.a.default
                  : e.b
              );
            },
            deeplink: function (e) {
              null != e.a &&
              ((this.platform && null != e.a[this.platform]) ||
                null != e.a.default)
                ? openUrlWithFallback(
                    this.checkVariables(e.a[this.platform] || e.a.default),
                    this.checkVariables(e.b)
                  )
                : (window.top.location = this.checkVariables(e.b));
            },
            resolve: function (e, t) {
              var n = !(1 < arguments.length && void 0 !== t) || t,
                i = null;
              switch (e.type || "link") {
                case "sms":
                  return (
                    "sms:+" +
                    (i = (e.value || "").split(":"))[0]
                      .toString()
                      .replace(/[^0-9]/, "") +
                    (null != i[1] && i[1].trim().length
                      ? "?&body=" + encodeURIComponent(i[1])
                      : "")
                  );
                case "phone":
                  return (
                    "tel:+" + (e.value || "").toString().replace(/[^0-9]/, "")
                  );
                case "email":
                  return (
                    "mailto:" +
                    (i = (e.value || "").split(":"))[0] +
                    (null != i[1] && i[1].trim().length
                      ? "?subject=" + encodeURIComponent(i[1])
                      : "")
                  );
                case "anchor":
                case "page":
                  var o = "anchor" == e.type ? e.value.split(":")[0] : e.value;
                  return null == o ||
                    this.$account.main_page_id.toString(16) == o
                    ? {
                        name: "index",
                      }
                    : {
                        name: "page",
                        params: {
                          page_filename: o,
                        },
                      };
                case "vcard":
                  var s = ["BEGIN:VCARD"],
                    r = {
                      ln: "",
                      fn: "",
                      mn: "",
                    };
                  return (
                    -1 ==
                      this.$account.avatar.url.indexOf("empty-avatar.png") &&
                      s.push(
                        "PHOTO;VALUE=uri:" +
                          location.protocol +
                          "//" +
                          this.$account.storage_domain +
                          this.$account.avatar.url
                      ),
                    _.each(e.value, function (e, t) {
                      switch (t) {
                        case "email":
                          s.push("EMAIL;TYPE=HOME,INTERNET:" + e);
                          break;
                        case "workemail":
                          s.push("EMAIL;TYPE=WORK,INTERNET:" + e);
                          break;
                        case "link":
                          -1 == e.indexOf("://") && (e = "https://" + e),
                            s.push("URL:" + e);
                          break;
                        case "phone":
                          s.push("TEL;TYPE=CELL:" + e);
                          break;
                        case "workphone":
                          s.push("TEL;TYPE=WORK:" + e);
                          break;
                        case "org":
                          s.push("ORG;CHARSET=UTF-8:" + e);
                          break;
                        case "job":
                          s.push("TITLE;CHARSET=UTF-8:" + e);
                          break;
                        case "ln":
                        case "fn":
                          r[t] = e;
                      }
                    }),
                    ";;" != (r = _.values(r).join(";")) &&
                      s.push("N;CHARSET=UTF-8:" + r),
                    s.push("END:VCARD"),
                    "data:text/vcard;base64," +
                      btoa(unescape(encodeURIComponent(s.join("\n"))))
                  );
                case "market":
                  return {
                    name: "part.index",
                    params: {
                      part: "m",
                    },
                  };
                case "basket":
                  return {
                    name: "part.index",
                    params: {
                      part: "b",
                    },
                  };
                case "collection":
                  return {
                    name: "part",
                    params: {
                      part: "m",
                      page_filename: parseInt(e.value).toString(16),
                    },
                  };
                case "product":
                  return {
                    name: "part",
                    params: {
                      part: "o",
                      page_filename: parseInt(e.value).toString(16),
                    },
                  };
                case "link":
                  if (!e.value) return e.value;
                  var a,
                    l = e.value.split("//")[0].toLowerCase(),
                    c = e.value,
                    u = "";
                  return (
                    -1 != c.indexOf("#") &&
                      ((a = c.indexOf("#")),
                      (u = c.substr(a)),
                      (c = c.substr(0, a))),
                    c +
                      (-1 != ["http:", "https:"].indexOf(l) &&
                      n &&
                      _.size(this.postfix)
                        ? (-1 != c.indexOf("?") ? "&" : "?") +
                          $mx.param(this.postfix)
                        : "") +
                      u
                  );
                default:
                  if (1 != e.type.split("/")[0].length) return e.value;
                  var d = e.type.split("/"),
                    h = _.isObject(e.value) ? e.value.value : e.value;
                  return 1 == d.length
                    ? {
                        name: "part",
                        params: {
                          part: e.type,
                          page_filename: parseInt(h).toString(16),
                        },
                      }
                    : {
                        name: "param",
                        params: {
                          part: d[0],
                          page_filename: d[1],
                          param_id: h,
                        },
                      };
              }
            },
          },
        }));
    },
  }),
  (Vue.prototype.$lazy = Vue.observable({
    items: [],
    fetch: function (e) {
      (this.items = this.items.concat(e)), this.fetchAll();
    },
    fetchAll: __.debounce(function (e) {
      Vue.prototype.$api
        .get("addon/resolve", {
          params: {
            ids: this.items.join(","),
            request: "items",
            addon: "digitals",
          },
        })
        .then(function (e) {
          "success" == e.result &&
            $events.fire("digitalsupdated", e.response.items);
        }),
        (this.items = []);
    }, 350),
  })),
  (Vue.prototype.$auth = Vue.observable({
    inited: !1,
    initing: !1,
    user: null,
    loadData: function (e, t) {
      var n = this,
        i = 0 < arguments.length && void 0 !== e ? e : document.location.host,
        o = 1 < arguments.length && void 0 !== t && t;
      (this.initing && !o) ||
        ((this.initing = !0),
        $mx
          .request({
            url: "//" + i + "/api/auth/current.json",
            method: "get",
            mode: "cors",
            credentials: "include",
          })
          .then(function (e) {
            var t = e.data;
            t.user || "my.taplink.cc" == t.host
              ? n.init(t.user)
              : "taplink.cc" !=
                i.substring(i.lastIndexOf(".", i.lastIndexOf(".") - 1) + 1)
              ? n.loadData("my.taplink.cc", !0)
              : n.clear();
          })
          .catch(function (e) {
            n.clear();
          }));
    },
    init: function (e) {
      (this.initing = !1),
        (this.inited = !!e),
        Vue.prototype.$set(this, "user", e),
        $events.fire("userauth", e),
        $events.fire("contentupdated");
    },
    clear: function () {
      this.init(null);
    },
    logout: function () {
      Vue.prototype.$api.get("auth/logout").then(function (e) {
        "success" == e.result &&
          (Vue.prototype.$auth.clear(),
          Vue.prototype.$api.purgeCache(),
          $events.fire("reload"));
      });
    },
    isAllowTariff: function (e) {
      var t = ["basic", "plus", "pro", "business"];
      return t.indexOf(Vue.prototype.$account.tariff_current) >= t.indexOf(e);
    },
  })),
  (Vue.prototype.$modal = function (s, r, a) {
    var l = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
    return new Promise(function (o, e) {
      window.$app.loadComponent(s).then(function () {
        var e = window.$vue.$options.components["mx-modal"],
          t = new (Vue.extend(e))({
            propsData: Object.assign({}, l, {
              programmatic: !0,
              component: s,
              hasModalCard: !0,
              width: "auto",
              parent: a,
              props: r,
            }),
          }),
          n = document.createElement("div");
        t.$mount(n);

        function i() {
          t.close();
        }
        t.$on("close", function () {
          window.$events.off("beforeNavigate", i);
        }),
          window.$events.on("beforeNavigate", i),
          o(t);
      });
    });
  }),
  (Vue.prototype.$api = {
    cacheStorage: {},
    cacheKeyFunc: null,
    purgeCache: function () {
      this.cacheStorage = {};
    },
    get: function (e, t) {
      return this.request(e, "get", t);
    },
    post: function (e, t) {
      return this.request(e, "post", t);
    },
    request: function (a, l, c) {
      var u = this;
      return new Promise(function (o, s) {
        var r = null;
        return "get" == l &&
          null != u.cacheKeyFunc &&
          ((r = u.cacheKeyFunc(a, c)), null != u.cacheStorage[r])
          ? o(_.clone(u.cacheStorage[r]))
          : (((c = c || {}).params = c.params || {}),
            $mx
              .request({
                method: l,
                url:
                  (window.account.custom_domain
                    ? ""
                    : "/" +
                      (Vue.prototype.$account.nickname
                        ? Vue.prototype.$account.nickname
                        : "id:" + Vue.prototype.$account.profile_id)) +
                  "/api/" +
                  a +
                  ".json",
                json: c.params,
              })
              .then(function (n) {
                if (null == n.data.redirect)
                  if (null != n.data.code)
                    switch (n.data.code) {
                      case "need_auth":
                        var e = c.params.fields,
                          t = "";
                        for (i = 0; i < c.params.fields.length; i++)
                          6 == e[i].type && (t = e[i].value);
                        Vue.prototype
                          .$modal("vue-frontend-auth-form", {
                            login: t,
                            withClose: !0,
                          })
                          .then(function (e) {
                            var t = !1;
                            e.$on("close", function () {
                              t
                                ? u.request(a, l, c).then(o).catch(s)
                                : o(n.data);
                            }),
                              e.$on("reload", function () {
                                t = !0;
                              });
                          });
                        break;
                      default:
                        o(n.data);
                    }
                  else
                    r &&
                      null != n.data.cache_ttl &&
                      n.data.cache_ttl &&
                      (u.cacheStorage[r] = _.clone(n.data)),
                      o(n.data);
                else
                  -1 != n.data.redirect.indexOf("//")
                    ? (window.top.location = n.data.redirect)
                    : router.replace(n.data.redirect);
              })
              .catch(s));
      });
    },
  }),
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      null == window.$vue &&
        null != window.account &&
        ((window.prepareAccount = function (e) {
          return (
            (e.currency = Object.assign(_.clone(e.number), e.currency)),
            (e.weight = Object.assign(_.clone(e.number), e.weight)),
            (e.theme = StylesFactory.checkStyles(e.theme)),
            (e.styles = buildStyles(e.theme, e.storage_domain, "page")),
            e
          );
        }),
        (Vue.prototype.$account = Vue.observable(
          prepareAccount(window.account),
          {
            history: 0,
          }
        )),
        App.defineModuleComplete(),
        (window.$vue = new Vue(window.vue_options).$mount(
          document.querySelector(".page")
        )),
        i18n.init(window.account.locale),
        _.each(window.account.locales, function (e, t) {
          $mx.lazy("locales." + t + "." + e + ".js");
        }),
        null == window.account.locales.pages && (i18n.inited = !0),
        $mx("#loading-global").remove());
    },
    {
      once: !0,
    }
  ),
  (Vue.prototype.$actionbar = Vue.observable({
    info: {
      basket: {
        products: {},
        amount: 0,
      },
    },
    list: [],
    buttons: {},
    prepared: [
      {
        name: "basket",
        icon: "is-basket-icon",
        visible: !1,
        shrink: !0,
        hits: 0,
        link: {
          name: "part.index",
          params: {
            part: "b",
          },
        },
        title: Vue.prototype.$gettext("Корзина"),
        buttonClass: "is-default",
        iconClass: "is-basket-icon",
      },
    ],
    setButtons: function (t) {
      var n = this,
        o = [];
      for (i = 0; i < t.length; i++) __.isString(t[i]) && o.push(t[i]);
      __.each(__.clone(this.prepared), function (e) {
        t.push(
          __.merge(e, {
            hits: n.info.basket.amount,
            visible: 0 < n.info.basket.amount || -1 != o.indexOf(e.name),
          })
        );
      }),
        (this.list = []);
      var e,
        s = [[], [], []],
        r = [0, 0, 0],
        a = !(this.buttons = {});
      for (i = 0; i < t.length; i++) {
        __.isString(t[i]) ||
          ((e = Object.assign(
            {
              name: i,
              visible: !0,
              shrink: !1,
              loading: !1,
              autoLoading: null == t[i].loading,
            },
            t[i]
          )).shrink ||
            a ||
            (a = !0),
          e.link && !this.allowLink(e) && (e.visible = !1),
          s[e.shrink ? (a ? 2 : 0) : 1].push(e),
          e.visible && r[e.shrink ? (a ? 2 : 0) : 1]++);
      }
      for (
        r[1] &&
          r[0] != r[2] &&
          s[r[0] > r[2] ? 2 : 0].push({
            empty: !0,
            shrink: !0,
            visible: !0,
          }),
          t = __.flatten(s),
          i = 0;
        i < t.length;
        i++
      ) {
        var l = t[i];
        (l.divClass = l.shrink
          ? "col-xs col-xs-shrink col-sm-3"
          : "col-xs col-sm-6" + (l.shrink_mobile ? " col-xs-shrink" : "")),
          l.shrink &&
            (1 < t.length
              ? (l.title = "")
              : (l.divClass = "col-xs-12 col-sm-8 col-md-6")),
          l.empty && (l.divClass += " is-hidden-mobile"),
          l.visible && this.list.push(l.name),
          Vue.prototype.$set(this.buttons, l.name, l);
      }
    },
    allowLink: function (e) {
      if (!router) return !1;
      var t = router.currentRoute;
      return (
        (e.link &&
          !(t.name == e.link.name && t.params.part == e.link.params.part)) ||
        !e.link
      );
    },
    init: function () {
      var e = Cookies.get("cart");
      if (((this.info.basket.amount = 0), e)) {
        e = e.split(".");
        for (var t = 0; t < e.length; t += 2) {
          var n = parseInt(e[t + 1]);
          (this.info.basket.products[e[t]] = n), (this.info.basket.amount += n);
        }
      }
      this.clear();
    },
    clear: function () {
      this.setButtons([]);
    },
    pack: function () {
      var n = [],
        i = 0;
      _.each(this.info.basket.products, function (e, t) {
        n.push(t), n.push(e), (i += e);
      }),
        (this.info.basket.amount = i);
      var e = Object.assign(
        window.account.custom_domain
          ? {
              domain: "." + window.account.custom_domain,
              path: "/",
            }
          : {
              domain: ".taplink.cc",
              path: "/" + Vue.prototype.$account.nickname,
            },
        "http:" == window.location.protocol
          ? {
              sameSite: "Lax",
            }
          : {
              sameSite: "None",
              secure: !0,
            },
        {
          expires: 365,
        }
      );
      Cookies.set("cart", n.join("."), e);
    },
    addToCart: function (e, t) {
      return (
        null == this.info.basket.products[e] &&
          (this.info.basket.products[e] = 0),
        (this.info.basket.products[e] += t),
        (this.info.basket.amount += t),
        (this.buttons.basket.hits += t),
        Vue.prototype.$api.post("market/checkout/addtocart", {
          params: {
            id: e,
            quantity: t,
          },
        })
      );
    },
  })),
  Vue.prototype.$actionbar.init(),
  window.$app.defineComponent("frontend", "vue-frontend-actionbar", {
    data: function () {
      return {
        isAllowStart: null,
        isAllowEnd: null,
      };
    },
    created: function () {
      this.updateAllows(this.isAllow);
    },
    watch: {
      isAllow: _.debounce(function (e) {
        this.updateAllows(e);
      }, 350),
    },
    computed: {
      disabled: function () {
        return null != this.$account.readonly && this.$account.readonly;
      },
      buttons: function () {
        var t = this;
        return __.map(this.$actionbar.list, function (e) {
          return t.$actionbar.buttons[e];
        });
      },
      isAllow: function () {
        return 0 < this.$actionbar.list.length;
      },
    },
    methods: {
      updateAllows: function (e) {
        var t = this;
        null == this.isAllowStart
          ? (this.isAllowStart = this.isAllowEnd = e)
          : e
          ? ((this.isAllowStart = e),
            setTimeout(function () {
              t.isAllowEnd = e;
            }, 300))
          : ((this.isAllowEnd = e),
            setTimeout(function () {
              t.isAllowStart = e;
            }, 300)),
          $mx("html").toggleClass("has-actionbar", e);
      },
      click: function (e) {
        e.autoLoading && (e.loading = !0),
          e.click ? e.click() : this.$router.push(e.link);
      },
    },
    template:
      '<div> <div class="action-panel-container" :class="{in: isAllowEnd}" v-if="isAllowStart"> <div class="action-panel"> <div class="page-container"> <div class="row row-small" v-if="$actionbar.list.length"> <div v-for="b in buttons" :class="b.divClass"> <button v-if="!b.empty" @click="click(b)" class="button is-medium is-panel-button is-fullwidth" :class="[b.buttonClass, {disabled: b.disabled || disabled, \'is-loading\': b.loading}]"><span :class="[b.iconClass, {\'with-text\': b.title}]" :data-value="b.hits?b.hits:null"><i class="has-mr-1" :class="b.icon" v-if="b.icon"></i><span v-if="b.title" :class="{\'is-hidden-mobile\': b.icon_hidden_mobile}">{{b.title}}</span></span></button> </div> </div> </div> </div> </div> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-addons-agreement-banner",
    {
      data: function () {
        return {
          isOpenAgreement: !1,
          isLoading: !1,
          isClosed: !1,
        };
      },
      props: ["value"],
      methods: {
        click: function (e) {
          if (e.target && "A" == e.target.tagName.toUpperCase()) {
            var t = $mx(e.target);
            if ("_blank" == t.attr("target")) return;
            this.$refs.agreement.show(t.data());
          }
          e.preventDefault();
        },
      },
      template:
        '<div> <div class="footer-banner cookie-banner has-rtl" :class="{\'is-closed\': value.isClosed}" @click="click"> <div class="container has-mb-2 has-mt-2"> <div v-html="value.message"></div> </div> </div> <vue-frontend-addons-agreement-modal ref="agreement"/> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-addons-agreement-modal",
    {
      data: function () {
        return {
          isOpened: !1,
          index: -1,
          agreements: {},
        };
      },
      props: {
        isOpened: Boolean,
        message: String,
      },
      computed: {
        title: function () {
          return -1 != this.index && this.agreements[this.index].title
            ? this.agreements[this.index].title
            : this.$gettext("Юридическая информация");
        },
        b: function () {
          return this.agreements[this.index].body;
        },
      },
      methods: {
        show: function (t) {
          var n = this;
          (this.index = -1),
            (this.isOpened = !0),
            null == this.agreements[t.index]
              ? this.$api
                  .get("addon/resolve", {
                    params: {
                      addon: "agreement",
                      params: {
                        index: t.index,
                      },
                      request: "body",
                    },
                  })
                  .then(function (e) {
                    "success" == e.result &&
                      ((n.index = t.index),
                      (n.agreements[n.index] = e.response));
                  })
              : (this.index = t.index);
        },
      },
      template:
        '<mx-modal :active.sync="isOpened" :has-modal-card="true"> <div class="modal-card"> <header class="modal-card-head"><p class="modal-card-title">{{title}}</p> <button type="button" class="modal-close is-large" @click="isOpened = false"></button></header> <section class="modal-card-body"> <div class="border col-xs-12" v-if="index == -1"><div class="loading-overlay loading-block is-active"><div class="loading-icon"></div></div></div> <vue-frontend-components-document v-else-if="b && _.size(b)" v-model="b" style="font-size: 1rem"/> </section> <div class="modal-card-foot"> <button type="button" class="button is-secondary" @click="isOpened = false">{{\'Закрыть\'|gettext}}</button> </div> </div> </mx-modal>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-addons-cdek-shipping-field",
    {
      data: function () {
        return {
          isOpenForm: !1,
          selectedItem: null,
          widget: null,
          desc: "",
          points: [],
          cities: [],
        };
      },
      props: ["value"],
      created: function () {
        var t = this;
        this.$api
          .get("addon/resolve", {
            params: {
              addon: "cdek",
              request: "cities",
            },
          })
          .then(function (e) {
            "success" == e.result && (t.cities = e.response.cities);
          });
      },
      methods: {
        click: function (e) {
          (this.selectedItem = this.selectedItem == e ? null : e),
            this.selectedItem &&
              this.points[this.selectedItem].placeMark.events.fire("click");
        },
        select: function () {
          this.points[this.selectedItem].placeMark.events.fire("select");
        },
        openForm: function () {
          var t = this;
          (this.isOpenForm = !0),
            (this.points = []),
            $.lazy("cdek.js", function () {
              t.widget = new ISDEKWidjet({
                defaultCity: t.value.city,
                cityFrom: t.value.city,
                cities: t.cities,
                link: "cdekMap",
                path: "https://widget.cdek.ru/widget/scripts/",
                api: t.$api,
                onReady: function () {},
                onChoose: function (e) {
                  (t.value.value = e.id),
                    (t.value.address = e.pvz.address),
                    (t.desc = "цена: " + e.price + ", срок " + e.term + "дн."),
                    (t.isOpenForm = !1);
                },
                onPointsList: function (e) {
                  t.points = e;
                },
                onSelectPoint: function (e) {
                  (t.selectedItem = e),
                    t.$nextTick(function () {
                      scrollIt(
                        $("#cdek_p" + e)[0].offsetTop,
                        "y",
                        $("#cdekPointList")[0]
                      );
                    });
                },
                servicepath:
                  "https://widget.cdek.ru/widget/scripts/service.php",
              });
            });
        },
      },
      template:
        '<div> <div class="form-field"> <label class="label">Город</sup></label> <div class="select"> <select :disabled="select.length == 0" v-model="value.city" @change="value.value = null"> <option :value="null">{{\'-- Не выбрано --\'|gettext}}</option> <option v-for="c in cities" :value="c.city_id">{{c.city}}</option> </select> </div> </div> <div class="form-field" v-show="value.city"> <label class="label">Пункт выдачи<sup class="required">*</sup></label> <a class="input-field shipping-addon-item" @click="openForm" tabindex="1"> <span v-if="value.value">{{value.address}} <span class="has-text-grey">{{desc}}</span></span><span v-else>{{\'-- Не выбрано --\'|gettext}}</span> <span v-if="value.value">Изменить адрес</span><span v-else></span> </a> </div> <mx-modal :active.sync="isOpenForm" :has-modal-card="true"> <div class="modal-card has-text-black" style="font-size: 1rem"> <header class="modal-card-head"><p class="modal-card-title">{{\'Все адреса\'|gettext}}</p> <button type="button" class="modal-close is-large" @click="isOpenForm = false"></button></header> <section class="modal-card-body modal-card-body-blocks modal-card-body-overflow" id="cdekMap"> <section id="MAP" class="is-paddingless" style="height:300px"></section> <section class="is-paddingless" id="cdekPointList" style="position: relative"> <div class="cdek-point-list"> <div v-for="(p, i) in points" class="has-p-2" :class="{in: selectedItem== i}" @click="click(i)" :id="\'cdek_p\'+i"> <div> <b>{{p.name}}</b> <p>{{p.address}}</p> </div> <div class="is-desc"> <div class="has-mt-1"><b>Время работы:</b></div> <p class="has-text-grey">{{p.work_time}}</p> <div v-if="p.address_comment"> <div class="has-mt-1"><b>Комментарий:</b></div> <p>{{p.address_comment}}</p> </div> </div> <div class="is-buttons"> <button class="button is-primary" @click.stop="select(i)" type="button">Выбрать пункт выдачи</button> </div> </div> </div> </section> </section> <div class="modal-card-foot"> <button type="button" class="button is-dark" @click="isOpenForm = false">{{\'Закрыть\'|gettext}}</button> </div> </div> </mx-modal> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-addons-cookiepolicy-banner",
    {
      data: function () {
        return {
          keyComponent: 0,
          localeInited: null == window.account.locales["addons.cookiepolicy"],
          cookieAgree: !1,
          isOpenConsent: !1,
          types: {},
          used: ["base"],
          index: -1,
          policy: [],
        };
      },
      props: ["value"],
      created: function () {
        var e,
          t = this;
        (this.cookieAgree = Storage.get(
          "cookie_privacy." + this.$account.profile_id,
          0
        )),
          null == this.value.titles && (this.value.titles = [this.value.title]),
          null != this.$account.cookies &&
            ((e = Storage.get(
              "cookie_privacy_last." + this.$account.profile_id,
              null
            )),
            (this.used = _.uniq(_.map(this.$account.cookies, 0))),
            this.used.unshift("base"),
            !this.cookieAgree ||
            _.isNumber(this.cookieAgree) ||
            e != this.used.join(",")
              ? ((this.isOpenConsent = !0),
                this.$modal(
                  "vue-frontend-addons-cookiepolicy-consent-form",
                  {
                    parent: this,
                  },
                  this,
                  {
                    customClass:
                      "cookie-banner-form modal-card-little is-light",
                  }
                ))
              : this.$nextTick(function () {
                  t.allowCookies(t.cookieAgree.split(","));
                }));
      },
      mounted: function () {
        $events.on("locale:updated", this.localeUpdated), this.rebuild();
      },
      beforeDestroy: function () {
        $events.off("locale:updated", this.localeUpdated);
      },
      computed: {
        body: function () {
          return null == this.policy[this.index]
            ? null
            : this.policy[this.index].body;
        },
        title: function () {
          return -1 != this.index && this.policy[this.index].title
            ? this.policy[this.index].title
            : this.$gettext("Политика конфиденциальности");
        },
      },
      methods: {
        allowCookies: function (t) {
          var n = this;
          _.each(this.$account.cookies, function (e) {
            -1 != t.indexOf(e[0]) &&
              (e[1](e[2]),
              "analytics" == e[0] &&
                ($events.fire("navigate", {
                  path: document.location.pathname,
                }),
                $events.fire("pageview", {
                  page_id: n.$page.page_id,
                  profile_id: n.$account.profile_id,
                })));
          }),
            (this.$account.cookies = []);
        },
        rebuild: function () {
          this.types = {
            base: {
              in: !0,
              opened: !1,
              title: this.$gettext("Основные файлы cookie"),
              desc: this.$gettext(
                "Эти файлы cookie необходимы для работы веб-сайта и не могут быть отключены. Обычно они размещаются только в ответ на ваши действия, такие как оформления заказов, вход в систему или заполнение форм."
              ),
            },
            functional: {
              in: !0,
              opened: !1,
              title: this.$gettext("Функциональные файлы cookies"),
              desc: this.$gettext(
                "Эти файлы cookie позволяют веб-сайту предоставить расширенные функциональные возможности и персонализацию. Они могут быть установлены нами или третьими поставщиками, услуги которых мы добавили на наши страницы. Если вы не разрешите эти файлы cookie, некоторые или все эти службы могут работать неправильно."
              ),
            },
            analytics: {
              in: !0,
              opened: !1,
              title: this.$gettext("Cookies-файлы статистики"),
              desc: this.$gettext(
                "Эти файлы cookie позволяют нам отслеживать посещения, чтобы мы могли измерять и улучшать производительность нашего веб-сайта. Они помогают нам определить, какие страницы являются наиболее и наименее популярными, и увидеть, как посетители перемещаются по сайту. Вся информация, собираемая этими файлами cookie, является агрегированной и, следовательно, анонимной."
              ),
            },
            target: {
              in: !0,
              opened: !1,
              title: this.$gettext("Маркетинговые cookie-файлы"),
              desc: this.$gettext(
                "Эти файлы cookie могут быть установлены через наш сайт нашими рекламными партнерами. Эти компании могут использовать их для создания профиля ваших интересов и показа вам релевантной рекламы на других сайтах. Они не хранят непосредственно личную информацию. Если вы не разрешите использование этих файлов cookie, вы будете получать менее целенаправленную рекламу."
              ),
            },
          };
        },
        localeUpdated: function (e, t) {
          t &&
            "cookiepolicy" == t.target &&
            ((this.localeInited = !0), this.keyComponent++, this.rebuild());
        },
        agreeCookie: function () {
          Storage.set("cookie_privacy." + this.$account.profile_id, 1, 86400),
            (this.cookieAgree = !0);
        },
        click: function (e) {
          var t,
            n,
            i = this;
          ("A" == e.target.tagName.toUpperCase() &&
            "_blank" == e.target.getAttribute("target")) ||
            (e.preventDefault(),
            e.target &&
              "A" == e.target.tagName.toUpperCase() &&
              ((this.index = -1),
              this.$modal(
                "vue-frontend-addons-cookiepolicy-form",
                {
                  parent: this,
                },
                this,
                {
                  customClass: "is-light",
                }
              ),
              (t = /\/a\/cookiepolicy\/([0-9]+)\//.exec(e.target.href)),
              (n = parseInt(t && null != t[1] ? t[1] : 0)),
              null == this.policy[n]
                ? this.$api
                    .get("addon/resolve", {
                      params: {
                        addon: "cookiepolicy",
                        request: "body",
                        params: {
                          index: n,
                        },
                      },
                    })
                    .then(function (e) {
                      "success" == e.result &&
                        (i.$set(i.policy, n, e.response), (i.index = n));
                    })
                : (this.index = n)));
        },
      },
      template:
        '<div :key="keyComponent" v-show="localeInited"> <div class="footer-banner cookie-banner has-rtl" :class="{\'is-closed\': cookieAgree || isOpenConsent}" @click="click"> <div class="container has-mb-2 has-mt-2"> <div v-html="value.message"></div> <button class="button is-panel-button is-default is-hidden-touch" @click="agreeCookie">{{\'Я понял\'|gettext}}</button> <button class="modal-close is-large is-hidden-desktop" @click="agreeCookie"></button> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-addons-cookiepolicy-consent-form",
    {
      props: ["parent"],
      methods: {
        confirm: function () {
          var n = this,
            e = _.filter(
              _.map(this.parent.types, function (e, t) {
                return e.in && -1 != n.parent.used.indexOf(t) ? t : null;
              })
            );
          Storage.set(
            "cookie_privacy." + this.$account.profile_id,
            e.join(","),
            86400
          ),
            Storage.set(
              "cookie_privacy_last." + this.$account.profile_id,
              this.parent.used.join(","),
              86400
            ),
            this.parent.allowCookies(e),
            (this.parent.isOpenConsent = !1),
            (this.parent.cookieAgree = !0),
            this.$parent.close();
        },
      },
      template:
        '<form class="modal-card"> <div class="modal-card" style="font-size: 1rem"> <header class="modal-card-head"><p class="modal-card-title">{{\'Настройки файлов cookie\'|gettext}}</p></header> <section class="modal-card-body is-cookiepolicy-message"> <div v-html="parent.value.message" @click="parent.click"></div> <h4 class="has-mt-4 has-mb-2">{{\'Согласие на использование файлов cookie\'|gettext}}</h4> <ul class="cookie-banner-list"> <li v-for="(t, i) in parent.types" :class="{in: t.opened}" v-if="parent.used.indexOf(i) != -1"> <div class="is-label" @click.stop="t.opened = !t.opened"> <label class="checkbox"><input type="checkbox" v-model="t.in" :disabled="i == \'base\'">{{t.title}}</label> <span></span> </div> <div class="is-desc">{{t.desc}}</div> </li> </ul> </section> <div class="modal-card-foot"> <button type="button" class="button is-primary" @click="confirm">{{\'Подтвердить\'|gettext}}</button> </div> </div> </form>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-addons-cookiepolicy-form",
    {
      props: ["parent"],
      template:
        '<div class="modal-card" style="font-size: 1rem"> <header class="modal-card-head"><p class="modal-card-title">{{parent.title}}</p> <button type="button" class="modal-close is-large" @click="$parent.close"></button></header> <section class="modal-card-body"> <div class="border col-xs-12" v-if="parent.index == -1"><div class="loading-overlay loading-block is-active"><div class="loading-icon"></div></div></div> <vue-frontend-components-document v-else-if="parent.body && _.size(parent.body)" v-model="parent.body"/> </section> <div class="modal-card-foot"> <button type="button" class="button is-secondary" @click="$parent.close">{{\'Закрыть\'|gettext}}</button> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-addons-courses-access-form",
    {
      data: function () {
        return {
          isUpdating: !1,
          errors: {},
          plan: null,
          name: "",
          promocode: "",
        };
      },
      props: ["data", "user", "email", "message"],
      created: function () {
        this.plan = this.data.plans[0];
      },
      watch: {
        message: function (e) {
          this.$emit("update:message", e);
        },
        email: function (e) {
          this.$emit("update:email", e);
        },
      },
      methods: {
        updateData: function () {
          var i = this;
          (this.isUpdating = !0),
            (this.errors = {}),
            (this.message = ""),
            this.$api
              .post("addon/resolve", {
                params: {
                  addon: "courses",
                  request: "join",
                  params: {
                    feed_id: this.data.feed_id,
                    email: this.email,
                    name: this.name,
                    promocode: this.promocode,
                    plan_id: this.plan.plan_id,
                  },
                },
              })
              .then(function (e) {
                switch (e.result) {
                  case "success":
                    function t() {
                      switch (e.response.action) {
                        case "redirect":
                          document.location = e.response.link;
                          break;
                        case "reload":
                          i.$emit("reload");
                      }
                    }
                    var n = document.location.host;
                    e.response.auth &&
                    "taplink.cc" !=
                      n.substring(
                        n.lastIndexOf(".", n.lastIndexOf(".") - 1) + 1
                      )
                      ? $mx
                          .request({
                            url:
                              "//my.taplink.cc/api/auth/session.json?auth=" +
                              e.response.auth +
                              "&ts=" +
                              e.response.ts +
                              "&hs=" +
                              e.response.hs,
                            method: "get",
                            mode: "cors",
                            credentials: "include",
                          })
                          .then(t)
                          .catch(t)
                      : t();
                    break;
                  case "fail":
                    (i.errors = e.errors || {}),
                      (i.isUpdating = !1),
                      e.message &&
                        i.$modal("vue-frontend-dialog", {
                          title: e.message,
                          type: "danger",
                        });
                }
                null != e.response &&
                  null != e.response.tab &&
                  i.$emit("setTab", e.response.tab);
              });
        },
        logout: function () {
          this.user.email = null;
        },
      },
      template:
        '<div> <section class="modal-card-body"> <transition name="fade"> <div class="message is-danger has-text-centered has-mb-5" v-if="message"> <div class="message-body">{{message}}</div> </div> </transition> <div v-if="user && user.email"> <label class="label">{{\'Пользователь\'|gettext}}</label> <vue-frontend-components-userfield v-model="user" @logout="logout"/> </div> <div v-else> <div :class="{\'has-error\': errors.email}"> <label class="label">{{\'Электронная почта\'|gettext}}<sup class="required">*</sup></label> <input type="email" v-model="email" class="input is-large" :disabled="isUpdating" v-focus> <p class="help" v-if="errors.email">{{errors.email}}</p> </div> <div :class="{\'has-error\': errors.name}" class="has-mt-4"> <label class="label">{{\'ФИО\'|gettext}}</label> <input type="text" v-model="name" class="input is-large" :disabled="isUpdating"> <p class="help" v-if="errors.name">{{errors.name}}</p> </div> </div> <div v-if="_.size(data.plans)> 1" class="has-mt-4"> <label class="label">{{\'Тариф\'|gettext}}</label> <label v-for="p in data.plans" class="plan has-mt-2" :class="{in: plan== p, disabled: isUpdating}"> <input type="radio" v-model="plan" :value="p" name="plan"> <em></em><span>{{p.plan_title}}</span><dd>{{p.price|currency}}</dd> </label> </div> <div v-if="data.has_promocodes" class="has-mt-4"> <label class="label">{{\'Промокод\'|gettext}}</label> <input type="text" v-model="promocode" class="input is-large" :disabled="isUpdating || !plan.price" maxlength="16" v-mask="{transform: \'upper\', preg: \'A-ZА-Я0-9-_\'}"> <p class="help" v-if="errors.promocode">{{errors.promocode}}</p> </div> <vue-frontend-form-elements :fields="data.fields" :isLoading="isUpdating" v-if="data.fields.length"/> </section> <section class="modal-card-foot"> <button class="button is-primary is-large is-fullwidth" type="submit" :class="{\'is-loading\': isUpdating}"><span v-if="plan.price">{{\'Перейти к оплате\'|gettext}}</span><span v-else>{{\'Зарегистрироваться\'|gettext}}</span></button> </section> </div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-auth-form", {
    data: function () {
      return {
        isUpdating: !1,
        isChecked: !1,
        password: "",
        code: "",
        errors: {},
        state: "login",
        passwordHidden: !0,
        message: "",
        tabsBase: {
          signup: this.$gettext("Регистрация"),
          signin: this.$gettext("Авторизация"),
        },
        hasScroll: !1,
        tab: "signin",
      };
    },
    props: {
      login: String,
      withClose: Boolean,
      params: Object,
      hs: String,
      thumb: String,
      access: Object,
    },
    watch: {
      state: function () {
        this.$refs.email.focus();
      },
    },
    created: function () {
      (this.tab = this.access ? "signup" : "signin"),
        this.login &&
          -1 != this.login.indexOf(";") &&
          (this.login = this.login.substr(0, this.login.indexOf(";"))),
        $events.on("userlogout", this.userlogout);
    },
    beforeDestroy: function () {
      $events.off("userlogout", this.userlogout);
    },
    mounted: function () {
      var t = this,
        e = document.location.host;
      "taplink.cc" ==
        (e = e.substring(e.lastIndexOf(".", e.lastIndexOf(".") - 1) + 1)) ||
      (null != this.access && null != this.access.user) ||
      !this.hs
        ? this.init()
        : $mx
            .request({
              url: "//my.taplink.cc/api/auth/cookies.json?hs=" + this.hs,
              method: "get",
              mode: "cors",
              credentials: "include",
            })
            .then(function (e) {
              e.data.cookie
                ? t.$api
                    .get("auth/session", {
                      params: e.data.cookie,
                    })
                    .then(function (e) {
                      "success" == e.result ? t.reload() : t.init();
                    })
                : t.init();
            });
    },
    computed: {
      tabs: function () {
        var n = this,
          i = {};
        return (
          _.each(this.tabsBase, function (e, t) {
            switch (t) {
              case "signin":
                if (null != n.access && null != n.access.user) return;
            }
            i[t] = e;
          }),
          i
        );
      },
      thumbStyle: function () {
        return this.thumb
          ? {
              "background-image":
                "url(//" +
                this.$account.storage_domain +
                "/p/" +
                this.thumb +
                ")",
            }
          : null;
      },
    },
    methods: {
      userlogout: function () {
        this.access.user = null;
      },
      init: function () {
        this.isChecked = !0;
      },
      setTab: function (e) {
        var t = this;
        this.$nextTick(function () {
          t.tab = e;
        });
      },
      reload: function () {
        this.$api.purgeCache(), $events.fire("reload"), this.$parent.close();
      },
      updateData: function () {
        var i = this;
        "signup" == this.tab
          ? this.$refs.accessform.updateData()
          : ((this.isUpdating = !0),
            (this.message = ""),
            (this.errors = {}),
            this.$api
              .post("auth/" + this.state, {
                params: Object.assign({}, this.params, {
                  login: this.login,
                  password: this.password,
                  lang: this.$account.language_code,
                  state: this.state,
                  code: this.code,
                }),
              })
              .then(function (e) {
                var t, n;
                "success" == e.result
                  ? "restore" == i.state
                    ? ((i.state = "code"),
                      i.$nextTick(function () {
                        i.$refs.code.focus();
                      }))
                    : e.response.auth &&
                      (i.$auth.init(e.response.user),
                      "taplink.cc" !=
                      (t = document.location.host).substring(
                        t.lastIndexOf(".", t.lastIndexOf(".") - 1) + 1
                      )
                        ? ((n = e.response),
                          $mx
                            .request({
                              url:
                                "//my.taplink.cc/api/auth/session.json?auth=" +
                                n.auth +
                                "&ts=" +
                                n.ts +
                                "&hs=" +
                                n.hs,
                              method: "get",
                              mode: "cors",
                              credentials: "include",
                            })
                            .then(i.reload)
                            .catch(i.reload))
                        : i.reload())
                  : (e.errors && (i.errors = e.errors),
                    (i.message = e.message)),
                  (i.isUpdating = !1);
              }));
      },
    },
    template:
      '<form class="modal-card modal-auth-form user-form is-light" :class="{\'with-thumb\': thumb, \'hide-thumb\': hasScroll, \'with-tabs\': access}" @submit.prevent="updateData"> <header class="modal-card-head" :style="thumbStyle" v-if="!access || (thumb && !hasScroll)"> <p class="modal-card-title" v-if="!thumb">{{\'Авторизация\'|gettext}}<button type="button" class="modal-close is-large" @click="$parent.close()" v-if="withClose"></button></p> </header> <section class="tabs" v-if="access"> <div v-for="(t, k) in tabs" :class="{in: tab== k}" @click="tab = k"><span>{{t}}</span></div> </section> <div class="loading-overlay is-active" v-if="!isChecked"><div class="loading-background"></div><div class="loading-icon"></div></div> <div v-if="tab == \'signin\'" class="modal-card-form"> <section class="modal-card-body"> <div> <transition name="fade"> <div class="message is-danger has-text-centered has-mb-5" v-if="message"> <div class="message-body">{{message}}</div> </div> </transition> <div v-if="isChecked"> <div> <div class="row has-mb-1"> <div class="col-xs col-shrink"><label class="label">{{\'Электронная почта\'|gettext}}</label></div> <div class="col-xs has-text-right" v-if="state == \'login\'"><a @click="state = \'restore\'">{{\'Вход по коду\'|gettext}}</a></div> <div class="col-xs has-text-right" v-else><a @click="state = \'login\'">{{\'Вход по паролю\'|gettext}}</a></div> </div> <div :class="{\'has-error\': errors.login}"> <input type="email" v-model="login" class="input is-large" :disabled="isUpdating || (state == \'code\')" ref="email" v-focus> <p class="help" v-if="errors.login">{{errors.login}}</p> </div> </div> <transition name="fade"> <div class="has-mt-4" v-if="state == \'login\'"> <label class="label">{{\'Пароль\'|gettext}}</label> <div class="control has-icons-right is-medium is-clearfix"> <input :type="passwordHidden?\'password\':\'text\'" v-model="password" class="input is-large" :disabled="isUpdating" maxlength="40" ref="password"> <span class="icon is-right is-clickable" @click="passwordHidden = !passwordHidden"><i class="fab" :class="passwordHidden?\'fa-eye\':\'fa-eye-slash\'"></i></span> </div> </div> <div class="has-mt-4" :class="{\'has-error\': errors.code}" v-if="state == \'code\'"> <label class="label">{{\'Код\'|gettext}}</label> <vue-frontend-components-verifyfield v-model="code" :disabled="isUpdating || (state == \'restore\')" ref="code"/> <p class="help" v-if="errors.code">{{errors.code}}</p> </div> </transition> </div> <div v-else> <div class="loading-overlay loading-block is-active"> <div class="loading-icon"></div> </div> </div> </div> </section> <section class="modal-card-foot"> <button class="button is-primary is-large is-fullwidth" type="submit" :class="{\'is-loading\': isUpdating}" :disabled="!isChecked"><span v-if="state == \'restore\'">{{\'Отправить код\'|gettext}}</span><span v-else>{{\'Войти\'|gettext}}</span></button> </section> </div> <component :is="\'vue-frontend-addons-\'+access.form" class="modal-card-form" :data="access.data" :user="access.user" ref="accessform" :email.sync="login" :message.sync="message" @setTab="setTab" @reload="reload" v-else/> </form>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-avatar", {
    props: {
      index: {
        type: Number,
        default: 0,
      },
      mode: {
        default: "view",
      },
      account: Object,
      data: Object,
    },
    computed: {
      style: function () {
        return 0 == this.index ? "" : "visibility:hidden";
      },
      backLink: function () {
        return "view" == this.mode
          ? this.$history.stackBack.length < 2
            ? ""
            : this.$history.stackBack[this.$history.stackBack.length - 2].path
          : null;
      },
      to: function () {
        return this.data && 2 == this.data.avatar_link_storefront
          ? {
              name: "part.index",
              params: {
                part: "m",
              },
            }
          : {
              name: "index",
            };
      },
    },
    methods: {
      click: function () {
        "view" == this.mode && this.$router.push(this.to);
      },
    },
    template:
      '<div> <div class="block-avatar block-avatar-history"> <div> <router-link class="fai fa-chevron-left avatar-history is-left has-p-2" style="padding-left:0 !important" :to="backLink" :class="{\'is-hide\': $history.stackBack.length < 2}" :style="style" v-if="mode == \'view\'"></router-link> </div> <component v-bind:is="(mode == \'view\')?\'a\':\'div\'" @click.prevent="click" :href="$router.resolve(to).href"> <div class="has-text-centered"><img :src="\'//{1}{2}\'|format(account.storage_domain, account.avatar.url)" :class="\'profile-avatar profile-avatar-{1}\'|format(account.avatar.size)" :alt="account.nickname"></div> </component> <div> <i class="fai fa-chevron-right avatar-history has-p-2" style="padding-right:0 !important;visibility:hidden" @click="$router.go(1)" v-if="mode == \'view\'"></i> </div> </div> <div class="has-text-centered text-avatar has-mt-1" v-if="!account.avatar.is_hide_text && account.has_nickname">{{account.nickname}}</div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-banner", {
    data: function () {
      return {
        index: 0,
        block_page_id: null,
        defaults: {
          link: {
            title: "",
            type: "link",
            value: null,
          },
          p: null,
          is_link: !1,
          is_scale: !1,
          is_stretch: !1,
          is_marginless: !1,
          width: "",
        },
      };
    },
    props: {
      options: Object,
      block: Object,
      page_id: Number,
      mode: {
        default: "view",
      },
    },
    mixins: [BlockModel],
    created: function () {
      (this.block.tariff = "pro"), (this.block_page_id = this.page_id);
    },
    computed: {
      classnames: function () {
        return {
          "picture-container-empty": !this.values.p,
          lazy: this.values.p,
          "lazy-force": "edit" == this.mode,
        };
      },
      style: function () {
        return (
          "padding-top: " +
          (this.values.p
            ? (this.values.p.height / this.values.p.width) * 100
            : 50) +
          "%" +
          (this.values.p ? ";background: 0 0 / 100% no-repeat" : "")
        );
      },
      backgroundImage: function () {
        var e = this.values.p;
        return e
          ? "string" == typeof e && -1 != e.indexOf("://")
            ? e
            : "//" + this.$account.storage_domain + "/p/" + e.filename
          : null;
      },
      bannerInnerStyle: function () {
        var e = this.values;
        return e.p && !e.is_stretch
          ? "width:" + (e.is_scale && e.width ? e.width : e.p.width) + "px"
          : "";
      },
    },
    methods: {
      isExternal: function (e) {
        return (
          -1 != ["link", "phone", "sms", "email", "vcard", ""].indexOf(e.type)
        );
      },
      link: (function (t) {
        function e(e) {
          return t.apply(this, arguments);
        }
        return (
          (e.toString = function () {
            return t.toString();
          }),
          e
        );
      })(function (e) {
        return this.$links.resolve(e);
      }),
      click: function (e) {
        var t,
          n = this.values,
          i = this.$links.resolve(n.link);
        _.isObject(i) || "#" != i.substr(0, 1)
          ? ("anchor" == n.link.type &&
              ((t = n.link.value.split(":"))[0] == this.$page.page_filename
                ? (this.$page.scrollTo(".b-" + t[1]), e.preventDefault())
                : ($scroll.position = ".b-" + t[1])),
            (i = _.isObject(i) ? this.$router.resolve(i).href : i),
            window.$events.fire("tap", {
              page_id: this.block_page_id,
              block_id: this.block.block_id,
              stat: this.block.block_id + "." + this.block.stat,
              data: [
                {
                  event: "taplink:" + n.link.type,
                  param: i,
                },
              ],
              addons:
                null != this.values.data && null != this.values.data.link
                  ? this.values.data.link
                  : null,
            }),
            this.isExternal(n.link) || e.preventDefault())
          : this.$page.scrollTo(i);
      },
    },
    template:
      '<div :class="{\'is-marginless\': values.is_marginless && values.is_stretch}" :key="block.block_id"> <div v-if="values.is_link && (mode != \'edit\')"> <a v-if="isExternal(values.link)" :download="(values.link.type == \'vcard\')?\'contacts.vcf\':null" rel="noopener" :target="(values.open_new_window || $account.open_new_window)?\'_blank\':\'_top\'" :href=\'link(values.link)\' @click="click"><div class="block-banner-inner" :style="bannerInnerStyle"><div class="picture-container" :class="classnames" :data-src="backgroundImage" :style="style"></div></div></a> <router-link v-else rel="noopener" :to=\'link(values.link)\' @click.native="click"><div class="block-banner-inner" :style="bannerInnerStyle"><div class="picture-container" :class="classnames" :style="style" :data-src="backgroundImage"></div></div></router-link> </div> <div v-else> <div class="block-banner-inner" :style="bannerInnerStyle"><div class="picture-container" :class="classnames" :style="style" :data-src="backgroundImage"></div></div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-breadcrumbs", {
    data: function () {
      return {};
    },
    props: {
      options: Object,
      items: Array,
      active: Number,
      equalSize: {
        default: !0,
      },
      isFetching: Boolean,
      isHistoryBreadcrumbs: !1,
    },
    mixins: [BlockModel],
    computed: {
      styleColors: function () {
        var e = this.options,
          t = e.colors;
        return {
          "--block-breadcrumbs-active-bg": t.bg.active,
          "--block-breadcrumbs-inactive-bg": t.bg.inactive,
          "--block-breadcrumbs-active-color": t.text.active
            ? t.text.active
            : t.bg.active
            ? isLightColor(t.bg.active)
              ? "#000"
              : "#fff"
            : null,
          "--block-breadcrumbs-inactive-color": t.text.inactive
            ? t.text.inactive
            : t.bg.inactive
            ? isLightColor(t.bg.inactive)
              ? "#000"
              : "#fff"
            : null,
          "--block-breadcrumbs-active-color-digs": t.text.active
            ? hexToRgb(t.text.active)
            : null,
          "--block-breadcrumbs-active-light": t.text.active
            ? isLightColor(t.text.active)
              ? 4
              : 1
            : null,
          "--block-breadcrumbs-border-width": e.border.width + "px",
          "--block-breadcrumbs-border-color": e.border.color || t.bg.active,
        };
      },
      index: function () {
        return null == this.active ? this.items.length - 2 : this.active;
      },
    },
    methods: {
      setActive: function (e) {
        (this.active = e), this.$emit("update:active", e);
      },
    },
    template:
      '<div class="block-breadcrumbs" :class="\'is-\'+options.size"> <div class="field has-addons" data-toggle="buttons" :style="styleColors"> <div class="control" :class="[f.class, {\'is-expanded\': equalSize, \'is-active\': index>= i}]" :style="{width: equalSize?((100 / items.length)+\'%\'):null}" v-for="(f, i) in items"><dd v-if="i"></dd><component :is="f.link?(_.isObject(f.link)?\'router-link\':\'a\'):\'label\'" :to="_.isObject(f.link)?f.link:null" :href="_.isObject(f.link)?null:f.link" class="button is-fullwidth" @click="setActive(i)" :class="{\'is-disabled\': isHistoryBreadcrumbs?(index < i):(index <= i)}"><i :class="{\'is-fetching-block\': isFetching}">{{f.title}}</i></component></div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-break", {
    data: function () {
      return {
        defaults: {
          break_size: 30,
          icon: 0,
          fullwidth: !1,
          fading: !1,
        },
        keyComponent: 0,
      };
    },
    props: ["options"],
    mixins: [BlockModel],
    watch: {
      values: function () {},
    },
    computed: {
      designStyles: function () {
        var e = this.options.design;
        return e && e.on
          ? {
              "--block-break-color": e.color,
            }
          : null;
      },
    },
    methods: {
      icon: function (e) {
        var t = this;
        if (!e || -1 == e) return null;
        var n = {
          1: "tabler/circle",
          2: "tabler/square-rotated",
          3: "legacy/wave-triangle",
          4: "legacy/wave-sine",
          5: "legacy/chevron-double-down",
          6: "legacy/chevron-down",
          7: "tabler/star",
        };
        return (
          null != n[e] && (e = n[e]),
          this.$icons.get(e, function () {
            t.keyComponent++;
          })
        );
      },
    },
    template:
      "<div class='block-break' :key=\"keyComponent\" :style=\"designStyles\"><div class='block-break-inner' :class=\"{'has-icon': values.icon, 'is-invisible': values.icon < 0, 'is-fullwidth': values.fullwidth, 'has-fading': values.fading}\" :style=\"{'height': values.break_size + 'px', margin: (values.icon == -1)?'-7px 0':null}\"><span v-html=\"icon(values.icon)\"> </span></div>",
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-collapse", {
    data: function () {
      return {
        defaults: {
          fields: [],
          once: !1,
          separator: !1,
          separator_extreme_hide: !0,
          indicator: {
            placement: "left",
            style: "plus",
          },
        },
        collapsed: [],
      };
    },
    props: {
      options: Object,
      section: Object,
      theme: Object,
      mode: {
        default: "view",
      },
    },
    mixins: [BlockModel],
    created: function () {
      this.prepareCollapsed();
    },
    computed: {
      hasActiveBackground: function () {
        return (
          this.options.design &&
          this.options.design.active &&
          this.options.design.active.bg
        );
      },
      designStyles: function () {
        var e = this.options.design;
        if (e && e.on) {
          var t = e.title ? e.title.color : null,
            n =
              e.indicator && e.indicator.border ? e.indicator.border.color : t,
            i = this.values.separator && !e.bg,
            o = e.bg ? ColorsFactory.getBackground(e.bg) : null,
            s =
              (e.active && e.active.bg
                ? ColorsFactory.getBackground(e.active.bg)
                : null) || o;
          return __.filter(
            __.merge(
              e.text && e.text.size
                ? FontsFactory.getTextStyles(
                    e.text.size,
                    "--block-collapse-text"
                  )
                : null,
              e.title && e.title.size
                ? FontsFactory.getTextStyles(
                    e.title.size,
                    "--block-collapse-title"
                  )
                : null,
              {
                "--block-collapse-text-color": e.text ? e.text.color : null,
                "--block-collapse-text-font-family": e.text
                  ? FontsFactory.getFont(e.text.font)
                  : null,
                "--block-collapse-text-font-weight": e.text
                  ? FontsFactory.getWeight(e.text.font, 1)
                  : null,
                "--block-collapse-title-color": t,
                "--block-collapse-title-font-family": e.title
                  ? FontsFactory.getFont(e.title.font)
                  : null,
                "--block-collapse-title-font-weight": e.title
                  ? FontsFactory.getWeight(
                      e.title.font ||
                        (this.section && this.section.text
                          ? this.section.text.font
                          : null) ||
                        this.theme.screen.font,
                      e.title.weight || 1
                    )
                  : null,
                "--block-collapse-indicator-color":
                  (e.indicator ? e.indicator.color : null) || t,
                "--block-collapse-indicator-background": e.indicator
                  ? e.indicator.bg
                  : null,
                "--block-collapse-indicator-border-color": n || t,
                "--block-collapse-indicator-border-width":
                  e.indicator &&
                  e.indicator.border &&
                  null != e.indicator.border.width
                    ? e.indicator.border.width + "px"
                    : null,
                "--block-collapse-indicator-width":
                  e.indicator && null != e.indicator.width
                    ? e.indicator.width + "px"
                    : null,
                "--block-collapse-background": o,
                "--block-collapse-padding-y": o ? "1rem" : null,
                "--block-collapse-padding-x": o || s ? "1rem" : null,
                "--block-collapse-separator-size": i ? "1px" : null,
                "--block-collapse-margin": i ? "1rem" : null,
                "--block-collapse-active-background": s,
                "--block-collapse-active-title-color":
                  e.active && e.active.title && e.active.title.color
                    ? e.active.title.color
                    : null,
                "--block-collapse-active-indicator-color":
                  e.active && e.active.indicator && e.active.indicator.color
                    ? e.active.indicator.color
                    : null,
                "--block-collapse-active-indicator-background":
                  e.active && e.active.indicator && e.active.indicator.bg
                    ? e.active.indicator.bg
                    : null,
                "--block-collapse-active-indicator-border-color":
                  e.active &&
                  e.active.indicator &&
                  e.active.indicator.border &&
                  e.active.indicator.border.color
                    ? e.active.indicator.border.color
                    : null,
              }
            )
          );
        }
        return _.filter({
          "--block-collapse-separator-size": this.values.separator
            ? "1px"
            : null,
        });
      },
    },
    methods: {
      prepareCollapsed: function () {
        this.$set(this, "collapsed", Array(this.values.fields.length).fill(0));
      },
      toggle: function (e) {
        var t = this.collapsed[e];
        if (this.options.once)
          for (i = 0; i < this.values.fields.length; i++)
            this.$set(this.collapsed, i, 0);
        this.$set(
          this.collapsed,
          e,
          t ? 0 : $mx(this.$refs.texts[e]).outerHeight() + "px"
        ),
          this.$parent.$emit("checkHeight");
      },
    },
    template:
      '<div class="has-rtl"> <div class="collapse-list" :class="[\'has-indicator-\'+values.indicator.placement, \'has-indicator-\'+values.indicator.style, {\'has-active-background\': hasActiveBackground, \'has-extreme-separator\': !values.separator_extreme_hide}]" :style="designStyles"> <div v-for="(f, i) in values.fields" class="collapse-item" :class="{in: collapsed[i]}"> <div class="a" @click="toggle(i)"> <span class="collapse-icon"></span> <span class="collapse-title" v-if="f.title" v-html="$typography(f.title, true)"></span> <span class="collapse-title" v-else>{{\'Вопрос\'|gettext}}</span> </div> <div class="collapse-text" :style="{maxHeight: collapsed[i]}"><div class="collapse-text-inner" ref="texts" v-html="$parseContacts($typography(f.text, true), (mode == \'view\')?\'a\':\'span\')"></div></div> </div> </div> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-courses-breadcrumbs",
    {
      data: function () {
        return {
          isFetching: !0,
          data: {
            menu: {
              items: [
                {
                  title: "AAAAA",
                },
              ],
            },
          },
          defaults: {
            colors: {
              bg: null,
              text: {
                active: null,
                inactive: null,
              },
              divider: null,
              hover: {
                bg: null,
                text: null,
              },
            },
            size: "lg",
            home: {
              on: !0,
            },
            border: {
              disabled: !0,
            },
          },
        };
      },
      props: ["options", "page_id", "block", "theme"],
      mixins: [BlockModel],
      computed: {
        b: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        o: function () {
          this.b;
          return {
            colors: {
              bg: {
                active: null,
                inactive: null,
              },
              text: {
                active: null,
                inactive: null,
              },
            },
            border: {
              width: 2,
              color: null,
            },
            size: "lg",
          };
        },
        styleColors: function () {
          var e = this.b.colors,
            t = e.bg ? (isLightColor(e.bg) ? "#000" : "#fff") : null,
            n = e.text.active ? e.text.active : t,
            i = e.text.inactive ? e.text.inactive : t;
          return {
            "--block-courses-breadcrumbs-hover-bg": e.hover.bg,
            "--block-courses-breadcrumbs-hover-color": e.hover.text
              ? e.hover.text
              : e.hover.bg && !isTransparentColor(e.hover.bg)
              ? isLightColor(e.hover.bg)
                ? "#000"
                : "#fff"
              : null,
            "--block-breadcrumbs-inactive-bg": e.bg,
            "--block-breadcrumbs-active-bg": e.bg,
            "--block-breadcrumbs-inactive-color": i,
            "--block-breadcrumbs-active-color": n,
            "--block-breadcrumbs-active-color-digs": n ? hexToRgb(n) : null,
            "--block-breadcrumbs-active-color-light": e.bg
              ? isLightColor(e.bg)
                ? 1
                : 4
              : null,
            "--block-breadcrumbs-divider-color": e.divider,
          };
        },
      },
      created: function () {
        window.$events.on("courses:data", this.setData),
          (this.block.tariff = "business");
      },
      beforeDestroy: function () {
        window.$events.off("courses:data", this.setData);
      },
      methods: {
        setData: function (e, t) {
          this.b.home.on || t.data.menu.items.shift(),
            (this.data = t.data),
            (this.isFetching = !1);
        },
      },
      template:
        '<vue-frontend-blocks-breadcrumbs :items="data.menu.items" :options="o" :equalSize="false" :isFetching="isFetching" :is-history-breadcrumbs="true" :class="{\'has-border\': !b.border.disabled}" :style="styleColors"/>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-courses-button",
    {
      data: function () {
        return {
          isLoading: !1,
          defaults: {
            texts: {
              lesson: "",
              task: "",
            },
          },
          data: {},
        };
      },
      props: {
        options: Object,
        block: Object,
        section: Object,
        page_id: String,
        page_filename: String,
        param_id: String,
        theme: Object,
        mode: {
          default: "view",
        },
      },
      mixins: [BlockModel],
      created: function () {
        window.$events.on("courses:setbutton", this.setButton),
          (this.block.tariff = "business");
      },
      beforeDestroy: function () {
        window.$events.off("courses:setbutton", this.setButton);
      },
      computed: {
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        storageKey: function () {
          return "taplink:addons.courses.tasks:" + this.param_id;
        },
        stylesheets: function () {
          var e = {},
            t = this.theme,
            n = StylesFactory.getDefaultSection(t, !1);
          if (this.values.design && this.values.design.on) {
            var i = this.values.design,
              i = __.merge(
                n.link,
                this.section ? this.section.link : {},
                i,
                !0
              );
            return StylesFactory.getLinkSectionVariables(i, t, "--block-link");
          }
          return e;
        },
        classname: function () {
          var e =
            null != this.values.animation && this.values.animation
              ? "has-animation has-animation-" + this.values.animation
              : "";
          return [
            "button btn-link btn-link-styled",
            {
              "is-loading": this.isLoading,
            },
            e,
          ];
        },
        title: function () {
          var e = _.size(this.data.tasks)
            ? this.o.texts.task || this.$gettext("Отправить на проверку")
            : this.o.texts.lesson || this.$gettext("Завершить урок");
          return this.$typography(e, !0);
        },
      },
      methods: {
        checkForm: function () {
          var t = this;
          "edit" != this.mode &&
            this.data.check() &&
            ((this.isLoading = !0),
            this.$api
              .post("addon/resolve", {
                params: {
                  addon: "courses",
                  request: "lesson.done",
                  params: {
                    feed_id: this.page_filename,
                    lesson_id: this.param_id,
                    tasks: this.data.tasks,
                  },
                },
              })
              .then(function (e) {
                "success" == e.result &&
                  (Storage.hasStorage() && Storage.delete(t.storageKey),
                  t.$router.push({
                    name: "part",
                    params: e.response.redirect,
                  })),
                  (t.isLoading = !1);
              }));
        },
        setButton: function (e, t) {
          this.data = t;
        },
      },
      template:
        '<component v-bind:is="(mode == \'view\')?\'a\':\'div\'" :class="classname" :style="stylesheets" @click="checkForm" v-if="data.check"><div><div class="btn-link-title" v-html="title"></div></div></component>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-courses-feed", {
    data: function () {
      return {
        isFetching: !1,
        defaults: {
          colors: {
            modules: {
              bg: null,
              text: null,
              icon: null,
            },
            bg: null,
            text: null,
            icons: {
              new: null,
              lock: null,
              done: null,
              pending: null,
              decline: null,
            },
          },
          border: {
            disabled: !0,
          },
        },
        modulesOpened: [],
      };
    },
    props: ["options", "page_id", "page_filename", "block", "mode"],
    mixins: [BlockModel],
    created: function () {
      null == this.options.data
        ? this.fetchData(!0)
        : window.$events.fire("courses:data", {
            data: this.options.data,
          }),
        (this.block.tariff = "business");
    },
    computed: {
      modules: function () {
        var t = this,
          n = [],
          i = null,
          o = null;
        return (
          this.options.lessons.length &&
            (_.each(this.options.lessons, function (e) {
              o != e.module_id &&
                (i &&
                  i.lessons.length &&
                  (null == t.modulesOpened[n.length] &&
                    t.$set(t.modulesOpened, n.length, !0),
                  n.push(i)),
                (i = {
                  title: e.module,
                  lessons: [],
                  _opened: !0,
                }),
                (o = e.module_id)),
                i.lessons.push(e);
            }),
            i &&
              i.lessons.length &&
              (null == this.modulesOpened[n.length] &&
                this.$set(this.modulesOpened, n.length, !0),
              n.push(i))),
          n
        );
      },
      o: function () {
        return _.merge(this.defaults, this.options, !0);
      },
      stylesheetsBody: function () {
        var e = this.o.colors,
          t = e.text
            ? e.text
            : e.bg
            ? isLightColor(e.bg)
              ? "#000"
              : "#fff"
            : null,
          n = e.bg ? (isLightColor(e.bg) ? "#000" : "#fff") : null,
          i = e.modules.bg
            ? isLightColor(e.modules.bg)
              ? "#000"
              : "#fff"
            : null,
          o = e.icons.decline;
        return (
          !o && e.bg && colorIsRed(e.bg) && (o = "#fff"),
          {
            "--block-courses-feed-bg": e.bg,
            "--block-courses-feed-color": t,
            "--block-courses-feed-modules-bg": e.modules.bg,
            "--block-courses-feed-modules-color": e.modules.text
              ? e.modules.text
              : i,
            "--block-courses-feed-modules-icon": e.modules.icon
              ? e.modules.icon
              : i,
            "--block-courses-feed-background-contrast-digs": e.bg
              ? isLightColor(e.bg)
                ? "0,0,0"
                : "255,255,255"
              : null,
            "--block-courses-feed-icon-lock-color": e.icons.lock,
            "--block-courses-feed-icon-pending-color": e.icons.pending,
            "--block-courses-feed-icon-new-color": e.icons.new,
            "--block-courses-feed-icon-done-color": e.icons.done,
            "--block-courses-feed-icon-decline-color": o,
            "--block-courses-feed-icon-color": n,
            "--block-courses-feed-icon-color-digs": n ? hexToRgb(n) : null,
          }
        );
      },
    },
    methods: {
      fetchData: function (e) {
        var t = this;
        (this.isFetching = e),
          this.$set(this.options, "lessons", [
            {
              title: "AAAAA",
              subtitle: "AAAAAAA",
              lesson_id: 0,
              module_id: 1,
            },
            {
              title: "AAAAAAAA",
              subtitle: "AAAAAAAAAAA",
              lesson_id: 0,
              module_id: 1,
            },
            {
              title: "AAAAA",
              subtitle: "AAAA",
              lesson_id: 0,
              module_id: 1,
            },
            {
              title: "AAAAAAAAAAA",
              subtitle: "AAAAAAA",
              lesson_id: 0,
              module_id: 1,
            },
          ]),
          this.$api
            .get(
              "edit" == this.mode
                ? "addons/addon/courses/example"
                : "addon/resolve",
              {
                params: {
                  addon: "courses",
                  request: "feed",
                  params: {
                    feed_id:
                      "edit" == this.mode ? this.page_id : this.page_filename,
                  },
                },
              }
            )
            .then(function (e) {
              "success" == e.result
                ? (t.$set(t.options, "lessons", e.response.lessons),
                  t.$set(t.options, "data", e.response.data),
                  window.$events.fire("courses:data", {
                    data: e.response.data,
                  }),
                  e.response.data.waiting_delay &&
                    setTimeout(function () {
                      t.fetchData(!1);
                    }, 1e3 * (e.response.data.waiting_delay + 5)),
                  (t.isFetching = !1))
                : "unauthorized" == e.result && t.$emit("refreshPage");
            });
      },
      clickModule: function (e) {
        this.$set(this.modulesOpened, e, !this.modulesOpened[e]);
      },
    },
    template:
      '<div> <div class="block-course has-rtl" :class="{\'has-border\': !o.border.disabled}" v-for="(m, i) in modules"> <div :style="stylesheetsBody"> <div :class="{disabled: isFetching}"> <div class="course-module" :class="{in: modulesOpened[i]}"> <div class="course-module-title" v-if="modules.length> 1" @click="clickModule(i)"><b :class="{\'is-fetching-block\': isFetching}">{{m.title}}</b></div> <div v-if="modulesOpened[i]"> <component :is="(l.status == \'lock\')?\'div\':\'router-link\'" :to="{name: \'param\', params: {part: \'c\', page_id: page_filename, param_id: l.lesson_id.toString(16)}}" v-for="l in m.lessons" class="course-lesson" :data-status="l.status"> <div><div><span :class="{\'is-fetching-block\': isFetching}">{{l.title}}</span></div><span style="font-size: 90%;opacity: .6" :class="{\'is-fetching-block\': isFetching}">{{l.subtitle}}</span></div> </component> </div> </div> <div v-if="!_.size(options.lessons) && !isFetching" class="has-text-centered" style="padding:6rem"><i class="fab fa-hourglass has-mb-4" style="font-size: 5rem;opacity: .2;"></i><div>{{\'В настоящий момент уроки недоступны\'|gettext}}</div></div> </div> </div> </div> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-courses-lesson",
    {
      data: function () {
        return {
          isFetching: !1,
          isUpdating: !1,
          defaults: {
            colors: {
              bg: null,
              text: null,
            },
            border: {
              disabled: !0,
            },
          },
          data: {
            status: "new",
          },
        };
      },
      props: [
        "options",
        "page_id",
        "page_filename",
        "block",
        "mode",
        "param_id",
        "section",
      ],
      created: function () {
        null == this.options.data
          ? this.fetchData()
          : (this.data = this.options.data),
          (this.block.tariff = "business");
      },
      watch: {
        data: function (e) {
          (this.block.visible =
            (e.body && _.size(e.body)) || "edit" == this.mode),
            window.$events.fire("courses:data", e);
        },
      },
      computed: {
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        isTransparent: function () {
          return (
            isTransparentColor(this.o.colors.bg) ||
            (this.section && this.section.bg.color == this.o.colors.bg)
          );
        },
        stylesheetsBody: function () {
          var e = this.o.colors,
            t = e.bg && !isTransparentColor(e.bg),
            n = e.text
              ? e.text
              : t
              ? isLightColor(e.bg)
                ? "#000"
                : "#fff"
              : null;
          return {
            "--block-courses-lesson-bg": e.bg,
            "--block-courses-lesson-color": n,
            "--block-courses-lesson-color-digs": n ? hexToRgb(n) : null,
          };
        },
      },
      methods: {
        html: function (e) {
          var t = "view" == this.mode ? "a" : "span";
          return this.$parseContacts(this.$typography(e, !0), t);
        },
        fetchData: function () {
          var t = this;
          (this.isFetching = !0),
            this.$api
              .get(
                "edit" == this.mode
                  ? "addons/addon/courses/example"
                  : "addon/resolve",
                {
                  params: {
                    addon: "courses",
                    request: "lesson",
                    params: {
                      feed_id:
                        "edit" == this.mode ? this.page_id : this.page_filename,
                      lesson_id: this.param_id,
                    },
                  },
                }
              )
              .then(function (e) {
                "success" == e.result
                  ? (t.$set(t.options, "data", (t.data = e.response)),
                    (t.isFetching = !1))
                  : "unauthorized" == e.result && t.$emit("refreshPage");
              });
        },
      },
      template:
        '<div class="block-lesson has-rtl" :class="{\'is-fetching-block\': isFetching, \'has-border\': !o.border.disabled, \'is-transparent\': isTransparent}"> <div :style="stylesheetsBody"> <div class="document" v-if="isFetching"> <div class="is-fetching-block" :class="{\'has-mt-2\': i}" v-for="(w, i) in [50, 80, 60]" :style="{width: w+\'%\'}">A</div> </div> <div class="document" v-else-if="mode == \'edit\'"> {{loremText.join(\' \')}} </div> <vue-frontend-components-document v-else-if="data.body && _.size(data.body)" v-model="data.body"/> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-courses-message",
    {
      data: function () {
        return {
          defaults: {
            colors: {
              bg: null,
              text: null,
            },
            border: {
              disabled: !0,
            },
          },
          messages: [],
          isAnimated: !1,
          index: 0,
        };
      },
      props: ["options", "page_id", "block", "mode", "section"],
      mixins: [BlockModel],
      created: function () {
        window.$events.on("courses:data", this.setData),
          (this.block.tariff = "business");
      },
      beforeDestroy: function () {
        window.$events.off("courses:data", this.setData);
      },
      computed: {
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        m: function () {
          return this.messages[this.index] || null;
        },
        isTransparent: function () {
          return (
            isTransparentColor(this.o.colors.bg) ||
            (this.section && this.section.bg.color == this.o.colors.bg)
          );
        },
        indexTips: function () {
          var e = _.size(this.messages);
          return e - this.index + " / " + e;
        },
        avatarStyle: function () {
          return this.m && this.m.teacher && this.m.teacher.picture
            ? {
                backgroundImage:
                  "url(//" +
                  this.$account.storage_domain +
                  "/p/" +
                  this.m.teacher.picture +
                  ")",
              }
            : null;
        },
        stylesheetsBody: function () {
          var e = this.o.colors,
            t = e.bg && !isTransparentColor(e.bg),
            n = e.text
              ? e.text
              : t
              ? isLightColor(e.bg)
                ? "#000"
                : "#fff"
              : null;
          return {
            "--block-courses-message-bg": e.bg,
            "--background-checkbox-color": isLightColor(e.bg) ? "#fff" : "#000",
            "--block-courses-message-color": n,
            "--block-courses-message-color-digs": n ? hexToRgb(n) : null,
          };
        },
      },
      methods: {
        setData: function (e, t) {
          var n = this;
          (this.messages = t.messages),
            (this.block.visible = _.size(this.messages)),
            _.size(t.messages) &&
              "view" == this.mode &&
              this.$nextTick(function () {
                setTimeout(function () {
                  (n.isAnimated = !0),
                    setTimeout(function () {
                      n.isAnimated = !1;
                    }, 1e3);
                }, 500),
                  $mx(n.$el).scrollIt(300);
              });
        },
        html: function (e) {
          var t = "view" == this.mode ? "a" : "span";
          return this.$parseContacts(this.$typography(e, !0), t);
        },
      },
      template:
        '<div v-if="m"> <div class="block-message has-rtl" :class="{\'has-border\': !o.border.disabled, \'is-transparent\': isTransparent, \'shake animated\': isAnimated}"> <div :style="stylesheetsBody"> <div class="courses-message-header has-mb-2"> <div><dd class="avatar has-mr-2" :style="avatarStyle"></dd><b>{{m.teacher.fullname || $gettext(\'Без имени\')}}</b></div> <div :data-tips="indexTips" v-if="_.size(this.messages)> 1"> <button @click="index++" :disabled="index == _.size(messages) - 1"></button> <button @click="index--" :disabled="index == 0"></button> </div> </div> <div v-html="html(m.message)"></div> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-courses-progress",
    {
      data: function () {
        return {
          isFetching: !0,
          data: null,
          defaults: {
            colors: {
              done: null,
              opened: null,
              bg: null,
            },
          },
        };
      },
      props: ["options", "page_id", "block", "mode"],
      mixins: [BlockModel],
      computed: {
        colors: function () {
          return _.merge(this.defaults, this.options, !0).colors;
        },
        stylesheetsBody: function () {
          return {
            "--block-courses-progress-done": this.colors.done,
            "--block-courses-progress-opened": this.colors.opened,
            "--block-courses-progress-bg": this.colors.bg,
          };
        },
      },
      created: function () {
        window.$events.on("courses:data", this.setData),
          (this.block.tariff = "business");
      },
      beforeDestroy: function () {
        window.$events.off("courses:data", this.setData);
      },
      methods: {
        setData: function (e, t) {
          (this.data = t.data), (this.isFetching = !1);
        },
      },
      template:
        '<div class="block-course-progress has-rtl has-mb-1" :style="stylesheetsBody"> <div class="course-progress-title"> <div>{{\'Прогресс\'|gettext}}</div> <div v-if="data">{{data.progress.done}} {{\'из\'|gettext}} {{data.progress.total}}</div> </div> <div class="course-progress"> <div :style="{width: (data.progress.done / data.progress.total * 100) + \'%\'}" v-if="data" class="is-done"></div> <div :style="{width: ((data.progress.opened - data.progress.done) / data.progress.total * 100) + \'%\'}" class="is-opened" v-if="data"></div> </div> </div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-courses-tasks", {
    data: function () {
      return {
        isFetching: !0,
        defaults: {
          colors: {
            bg: null,
            text: null,
          },
          border: {
            disabled: !0,
          },
        },
        tasks: {},
        errors: {},
        data: {
          tasks: [],
        },
        animated: null,
      };
    },
    props: [
      "options",
      "page_id",
      "block",
      "mode",
      "param_id",
      "section",
      "theme",
    ],
    mixins: [BlockModel],
    created: function () {
      window.$events.on("courses:data", this.setData),
        (this.block.tariff = "business");
    },
    beforeDestroy: function () {
      window.$events.off("courses:data", this.setData);
    },
    watch: {
      tasks: {
        handler: function (e) {
          !this.disabled &&
            Storage.hasStorage() &&
            Storage.set(this.storageKey, e, 3600);
        },
        deep: !0,
      },
    },
    computed: {
      storageKey: function () {
        return "taplink:addons.courses.tasks:" + this.param_id;
      },
      disabled: function () {
        return "new" != this.data.status;
      },
      isTransparent: function () {
        return (
          isTransparentColor(this.o.colors.bg) ||
          (this.section && this.section.bg.color == this.o.colors.bg)
        );
      },
      o: function () {
        return _.merge(this.defaults, this.options, !0);
      },
      stylesheetsBody: function () {
        var e = this.o.colors,
          t = e.bg && !isTransparentColor(e.bg),
          n = e.text
            ? e.text
            : t
            ? isLightColor(e.bg)
              ? "#000"
              : "#fff"
            : null;
        return {
          "--block-courses-task-bg": e.bg,
          "--block-courses-task-text-color": n,
          "--block-courses-task-subtext-color": e.subtext
            ? e.subtext
            : t
            ? isLightColor(e.bg)
              ? "#7a7a7a"
              : "#fff"
            : null,
          "--block-courses-task-text-color-digs": n ? hexToRgb(n) : null,
          "--input-flat-bg": t
            ? isLightColor(e.bg)
              ? "#1919190f"
              : "#ffffff33"
            : null,
          "--input-flat-bg-focused": t
            ? isLightColor(e.bg)
              ? "#1919191f"
              : "#ffffff4d"
            : null,
        };
      },
    },
    methods: {
      input: function () {
        var n = this;
        _.each(this.data.tasks, function (e) {
          var t;
          (n.tasks[e.id] = e.field[0].value),
            "radio" == e.type &&
              ((t = _.filter(e.v, {
                v: n.tasks[e.id],
              })),
              (n.tasks[e.id] = t.length ? t[0].id : null));
        });
      },
      setData: function (e, t) {
        var i = this,
          n = {},
          o = {
            radio: "radio",
            text: "textarea",
            string: "text",
            file: "file",
          };
        _.each(t.tasks, function (e) {
          i.$set(
            n,
            e.id,
            null == e.value ? ("checkbox" == e.type ? [] : null) : e.value
          );
        }),
          (this.tasks = _.merge(n, Storage.get(this.storageKey, {}))),
          _.each(t.tasks, function (e) {
            var t,
              n = {
                typename: o[e.type],
                placeholder: i.$gettext("Ответ"),
                required: e.required,
                value: i.tasks[e.id],
              };
            switch (e.type) {
              case "radio":
                (n.variants = _.map(e.v, "v")),
                  !n.value ||
                    ((t = _.filter(e.v, {
                      id: i.tasks[e.id],
                    })).length &&
                      (n.value = t[0].v));
                break;
              case "file":
                n.options = e.v;
            }
            i.$set(e, "field", [n]);
          }),
          (this.data = t),
          (this.block.visible = _.size(this.data.tasks)),
          "new" == t.status &&
            window.$events.fire("courses:setbutton", {
              tasks: this.tasks,
              check: this.checkForm,
            }),
          (this.isFetching = !1);
      },
      checkForm: function () {
        var t = this;
        this.errors = {};
        var n = null,
          i = {};
        return (
          _.each(this.data.tasks, function (e) {
            e.required &&
              (("file" != e.type && !t.tasks[e.id]) ||
                ("file" == e.type && !t.tasks[e.id].length)) &&
              ((i[e.id] = !0), null == n && (n = e.id));
          }),
          n &&
            ($mx(this.$refs["id" + n]).scrollIt(300),
            this.$nextTick(function () {
              setTimeout(function () {
                (t.animated = n),
                  setTimeout(function () {
                    t.animated = null;
                  }, 1e3);
              }, 200),
                $mx(t.$el).scrollIt(300);
            })),
          (this.errors = i),
          null == n
        );
      },
    },
    template:
      '<div class="block-form block-task has-rtl" :class="[{\'has-border\': !o.border.disabled, \'is-transparent\': isTransparent}, \'has-form-\'+theme.form.style]" v-if="_.size(data.tasks)"> <div :style="stylesheetsBody"> <vue-frontend-components-document v-if="data.tasks_body" v-model="data.tasks_body"/> <div v-for="t in data.tasks" :ref="\'id\'+t.id" class="task"> <div style="overflow: hidden"> <h4 class="has-text-weight-bold">{{t.text}}<sup class="required" v-if="t.required">*</sup></h4> <component :is="(mode == \'edit\')?\'vue-component-document\':\'vue-frontend-components-document\'" v-if="t.subtext" v-model="t.subtext" class="is-subtext"/> </div> <div :class="{\'has-error\': errors[t.id], \'shake animated\': (animated == t.id) && !isFetching}"> <vue-frontend-form-elements :fields="t.field" ref="elements" :block_id="t.id" :mode="mode" @input="input" :disabled="data.status != \'new\'"/> </div> </div> </div> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-digitals-description",
    {
      props: ["options", "page_id", "block", "data", "mode"],
      mixins: [BlockModel],
      computed: {
        hasText: function () {
          return this.data.body && _.size(this.data.body);
        },
      },
      template:
        '<div class="has-rtl" v-if="(mode == \'edit\') || hasText"> <div class="document" v-if="mode == \'edit\'"> {{loremText.join(\' \')}} </div> <component :is="(mode == \'view\')?\'vue-frontend-components-document\':\'vue-component-document\'" v-else-if="hasText" v-model="data.body"/> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-digitals-details",
    {
      props: {
        options: Object,
        block: Object,
        page_id: Number,
        theme: Object,
        data: {
          type: Object,
          default: null,
        },
        mode: {
          default: "view",
        },
      },
      mixins: [BlockModel],
      data: function () {
        return {
          cta: {
            1: this.$gettext("Купить"),
            2: this.$gettext("Купить сейчас"),
            3: this.$gettext("Купить это"),
            4: this.$gettext("Хочу это"),
            5: this.$gettext("Оплатить"),
            6: this.$gettext("Получить сейчас"),
            7: this.$gettext("Получить доступ"),
          },
          defaults: {
            items: [
              {
                name: "title",
                weight: 1,
                transform: "n",
                size: "h2",
                colors: {
                  title: null,
                },
              },
              {
                name: "price",
                price_compare: !0,
                weight: 2,
                size: "h3",
                colors: {
                  price: null,
                  price_compare: null,
                },
              },
            ],
          },
          buyFormModal: null,
        };
      },
      watch: {
        "data.user_id": {
          handler: function (e) {
            e &&
              ("view" == this.mode && this.$actionbar.clear(),
              $events.fire("digitals_access"));
          },
        },
        "data.cta": {
          handler: function () {
            this.updateBuyButton();
          },
        },
        "data.is_sellable": {
          handler: function () {
            this.updateBuyButton();
          },
        },
      },
      mounted: function () {
        var e = this;
        this.data &&
          "view" == this.mode &&
          (this.data.sales_start &&
            (setTimeout(function () {
              e.data.is_sellable = 1;
            }, 1e3 * this.data.sales_start),
            (this.data.is_sellable = 0)),
          this.data.sales_end &&
            setTimeout(function () {
              e.data.is_sellable = 0;
            }, 1e3 * this.data.sales_end)),
          this.setButtons(),
          $events.on("digitals:buyform", this.eventBuyform);
      },
      beforeDestroy: function () {
        this.allowButtons && this.$actionbar.clear(),
          $events.off("digitals:buyform", this.eventBuyform);
      },
      computed: {
        o: function () {
          return __.merge(this.defaults, this.options, !0);
        },
        d: function () {
          return "edit" == this.mode.substr(0, 4)
            ? {
                title: this.$gettext("Название товара"),
                price: 99,
                price_compare: 299,
              }
            : this.data;
        },
        stylesheets: function () {
          var i = {};
          return (
            _.each(this.o.items, function (e) {
              var t = "--block-digitals-" + e.name + "-",
                n = [200, 400, 700];
              switch (e.name) {
                case "title":
                  (i[t + "color"] = e.colors.title),
                    (i[t + "font-weight"] =
                      null != e.weight ? n[e.weight] : null),
                    (i[t + "text-transform"] = e.transform
                      ? {
                          u: "uppercase",
                          n: "none",
                        }[e.transform]
                      : null);
                  break;
                case "price":
                  (i[t + "color"] = e.colors.price),
                    (i[t + "compare-color"] = e.colors.price_compare),
                    (i[t + "font-weight"] =
                      null != e.weight ? n[e.weight] : null);
              }
            }),
            __.filter(i, __.isNotNull)
          );
        },
        allowButtons: function () {
          return this.data && !this.data.user_id && "edit" != this.mode;
        },
        buttonTitle: function () {
          return this.data.is_sellable
            ? null != this.cta[this.data.cta]
              ? this.cta[this.data.cta]
              : __.isNumber(this.data.cta)
              ? this.cta[1]
              : this.data.cta
            : this.$gettext("Товар недоступен для покупки");
        },
        details: function () {
          return {
            fields: __.map(this.data.details, function (e) {
              return {
                title: e.title,
                value: e.value,
              };
            }),
          };
        },
      },
      methods: {
        setButtons: function () {
          this.allowButtons &&
            (this.$actionbar.setButtons([
              {
                name: "buy",
                title: this.buttonTitle,
                click: this.buyForm,
                buttonClass: "is-primary",
                loading: !1,
                icon: "",
              },
            ]),
            this.updateBuyButton());
        },
        updateBuyButton: function () {
          var e = this.$actionbar.buttons.buy,
            t = this.data.is_sellable;
          e &&
            ((e.title = this.buttonTitle),
            (e.buttonClass = t ? "is-primary" : "is-nope"),
            (e.icon = t ? "" : "fai fa-circle-exclamation"));
        },
        eventBuyform: function (e, t) {
          "open" == t.action &&
            (t.v
              ? this.buyForm(!0)
              : this.buyFormModal && this.buyFormModal.close());
        },
        buyForm: function (e) {
          var t = this;
          null == this.buyFormModal &&
            (this.data.is_sellable || ("preview" == this.mode && e)) &&
            this.$modal(
              "vue-frontend-blocks-digitals-submit-form",
              {
                o: this,
                title: this.buttonTitle,
              },
              this,
              {
                customClass: "modal-bottom",
                canCancel: ["outside", "escape"],
              },
              "view" == this.mode
                ? null
                : $mx(".browser-preview .main-theme")[0]
            ).then(function (e) {
              e.$on("close", function () {
                (t.buyFormModal = null),
                  $events.fire("digitals:buyform", {
                    action: "status",
                    v: !1,
                  });
              }),
                (t.buyFormModal = e),
                $events.fire("digitals:buyform", {
                  action: "status",
                  v: !0,
                });
            });
        },
      },
      template:
        '<div class="is-digitals-details-items has-rtl" :class="{\'has-mb-4\': mode != \'edit_preview\'}" :style="stylesheets"> <div v-for="v in o.items"> <component v-bind:is="(v.size == \'h3\')?\'h4\':v.size" :class="{\'has-mb-1\': v.name == \'title\'}"> <span v-if="v.name == \'title\'" class="is-title">{{d.title}}</span> <span v-if="v.name == \'price\'" class="is-price"> <span>{{d.price|currency}}</span> <span class="is-price-compare has-ml-1 strikethrough" style="font-size: 70%" v-if="d.price_compare && (d.price < d.price_compare)">&nbsp;{{d.price_compare|currency}}&nbsp;</span> </span> </component> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-digitals-files",
    {
      data: function () {
        return {
          keyComponent: 0,
          defaults: {
            design: {
              active: {
                border: null,
                bg: null,
                icon: null,
                text: null,
              },
              inactive: {
                border: null,
                bg: null,
                icon: null,
                text: null,
              },
            },
          },
        };
      },
      props: ["options", "block", "data", "mode"],
      mixins: [BlockModel],
      computed: {
        sections: function () {
          var e = {
            title: this.$gettext("Файл"),
            filename: "file.pdf",
          };
          return this.data
            ? this.data.sections
            : [
                {
                  t: this.$gettext("Файлы"),
                  files: [e, e, e],
                },
              ];
        },
        stylesheets: function () {
          var e,
            t = this.values.design,
            n = "--block-digitals-files-",
            i = t.inactive,
            o = t.active;
          return __.filter(
            (_defineProperty((e = {}), n + "inactive-border-color", i.border),
            _defineProperty(e, n + "inactive-background", i.bg),
            _defineProperty(e, n + "inactive-icon-color", i.icon),
            _defineProperty(e, n + "inactive-text-color", i.text),
            _defineProperty(e, n + "active-border-color", o.border),
            _defineProperty(e, n + "active-background", o.bg),
            _defineProperty(e, n + "active-icon-color", o.icon),
            _defineProperty(e, n + "active-text-color", o.text),
            e),
            __.isNotNull
          );
        },
      },
      methods: {
        clickFile: function () {
          "edit_preview" == this.mode ||
            this.data.user_id ||
            $events.fire("digitals:buyform", {
              action: "open",
              v: !0,
            });
        },
        filelinks: function (e) {
          var o = /\/([^\/]+\.[^\s\?#\/]+)$/i;
          return __.map(__.clone(e), function (e) {
            var t = null;
            if (e.link)
              try {
                var n = new URL(e.link),
                  i = n.pathname.match(o),
                  t = i ? i[1] : n.hostname;
              } catch (e) {}
            return (e.title = e.title || t), e;
          });
        },
        icon: function (e) {
          var t = this;
          return this.$icons.get(mimetype(e), function () {
            t.keyComponent++;
          });
        },
      },
      template:
        '<div class="has-rtl" :style="stylesheets"> <div v-for="s in sections" class="digitals-files-section"> <h3 class="is-heading has-mb-1" v-if="s.t">{{s.t}}</h3> <div class="has-mb-2" v-html="$nl2br(s.d)" v-if="s.d"/> <div v-if="s.files.length" :key="keyComponent"> <component :is="(data && data.user_id)?\'a\':\'div\'" @click="clickFile" target="_blank" :href="f.link" v-for="f in filelinks(s.files)" class="file"><div class="is-icon" v-html="icon(f)"></div><div class="is-title"><div v-if="f.title" class="has-text-weight-bold">{{f.title}}</div><div><span :class="{\'has-text-weight-bold\': !f.title}">{{f.filename}}</span><span class="has-ml-1" style="opacity: .4" v-if="f.filesize">({{humanSize(f.filesize)}})</span></div></div></component> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-digitals-pictures",
    {
      props: {
        options: Object,
        block: Object,
        page_id: Number,
        theme: Object,
        mode: {
          default: "view",
        },
        data: Object,
      },
      mixins: [BlockModel],
      computed: {
        pictures: function () {
          return _.merge(
            this.options,
            {
              list: this.data
                ? __.map(this.data.pictures, function (e) {
                    return {
                      p: e,
                    };
                  })
                : [
                    {
                      p: null,
                    },
                    {
                      p: null,
                    },
                    {
                      p: null,
                    },
                  ],
              picture_size: "auto",
              placement: "contain",
            },
            !0
          );
        },
      },
      template:
        '<vue-frontend-blocks-pictures :options="pictures" :theme="theme" :block="block" :allow-zoom="true" :mode="mode"/>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-digitals-product",
    {
      data: function () {
        return {
          defaults: {
            items: [],
            design: {
              layout: "c",
            },
          },
          cta: {
            1: this.$gettext("Купить"),
            2: this.$gettext("Купить сейчас"),
            3: this.$gettext("Купить это"),
            4: this.$gettext("Хочу это"),
            5: this.$gettext("Оплатить"),
            6: this.$gettext("Получить сейчас"),
            7: this.$gettext("Получить доступ"),
          },
          loading: "",
        };
      },
      props: {
        options: Object,
        block: Object,
        page_id: Number,
        theme: Object,
        mode: {
          default: "view",
        },
      },
      mixins: [BlockModel],
      created: function () {
        $events.on("digitalsupdated", this.digitalsUpdated),
          this.values.items.length &&
            ((this.isFetching = __.isNumber(this.values.items[0])),
            this.isFetching && this.$lazy.fetch(this.values.items));
      },
      computed: {
        isFetching: function () {
          return this.values.items.length && __.isNumber(this.values.items[0]);
        },
        sliders: function () {
          return {
            cols: 2,
            list: this.isFetching
              ? __.map(this.values.items, function (e) {
                  return {
                    title: "aaaaaaaaa",
                    price: 100,
                  };
                })
              : this.values.items,
            design: this.values.design,
          };
        },
        designStyles: function () {
          var e = this.values.design;
          return (
            e &&
              (r = {
                "--block-digitals-title-color": e.title,
                "--block-digitals-price-color": e.price || e.title,
                "--block-digitals-price-compare-color": e.price_compare,
                "--block-digitals-background": e.bg,
                "--block-digitals-button-text-color": e.button_text,
              }),
            __.filter(r)
          );
        },
        s: function () {
          return {
            skeleton: this.isFetching,
          };
        },
      },
      methods: {
        buttonTitle: function (e) {
          return e.is_active
            ? null != this.cta[e.cta]
              ? this.cta[e.cta]
              : __.isNumber(e.cta)
              ? this.cta[1]
              : e.cta
            : this.$gettext("Не доступен");
        },
        isDisallow: function (e) {
          return (
            this.isFetching ||
            !e.product_id ||
            "edit" == this.mode ||
            !e.is_active
          );
        },
        isLoading: function (e) {
          return (
            "view" == this.mode &&
            null != this.options.stat &&
            this.loading == this.options.stat[e]
          );
        },
        link: function (e) {
          return this.isDisallow(e)
            ? null
            : {
                name: "part",
                params: {
                  part: "d",
                  page_filename: e.filename,
                },
              };
        },
        click: function (e, t) {
          var n = this;
          this.isDisallow(e) ||
            ((this.loading =
              null != this.options.stat ? this.options.stat[t] : null),
            (link = this.$router.resolve(this.link).href),
            this.block.block_id &&
              window.$events.fire("tap", {
                page_id: this.page_id,
                block_id: this.block.block_id,
                slot: this.values.items[t].product_id,
                stat: this.block.block_id + "." + this.options.stat[t],
                data: [
                  {
                    event: "taplink:digitals",
                    param: link,
                  },
                ],
              }),
            setTimeout(function () {
              n.loading = "";
            }, 2e3));
        },
        digitalsUpdated: function (e, t) {
          var n = this;
          (this.values.items = __.map(this.values.items, function (e) {
            return t[e];
          })),
            this.$nextTick(function () {
              $mx(n.$el).find(".lazy").triggerHandler("lazy-force");
            });
        },
        urlPicture: function (e) {
          return e.p
            ? e.p.link
              ? e.p.link
              : "//" + this.$account.storage_domain + "/p/" + e.p.filename
            : null;
        },
      },
      template:
        '<div class=\'block-digitals-product\'> <vue-frontend-blocks-slider :options="sliders" :block="block" :theme="theme" :page_id="page_id" :mode="mode" class="slider-has-text slider-has-link" v-if="values.design.layout == \'c\'" :style="designStyles"> <template v-slot:default="{f, i}"> <div class="picture-container lazy" :class="[{skeleton: isFetching, \'picture-container-empty\': !f.p}]" :data-src="urlPicture(f)" style="padding-top: 100%" :style="{backgroundColor: f.p?f.p.color:null}"></div> <div class="slider-slide-text"> <div class="slider-slide-title"> <div class="has-mb-1 is-title"><span :class="s">{{f.title}}</span></div> <span> <b class="is-price" :class="s">{{f.price|currency}}</b> <span v-if="f.price_compare && f.price_compare> f.price" class="is-price-compare strikethrough" :class="s">&nbsp;{{f.price_compare|currency}}&nbsp;</span> </span> </div> </div> <div class="button slider-slide-link" v-if="isFetching || !f.product_id || (mode == \'edit\') || !f.is_active" :class="{\'is-disallow\': !f.is_active}"><span :class="s">{{buttonTitle(f)}}</span></div> <router-link class="button slider-slide-link" :to=\'link(f)\' @click.native="click(f, i)" :class="{\'is-loading\': isLoading(i)}" v-else>{{buttonTitle(f)}}</router-link> </template> </vue-frontend-blocks-slider> <div v-else :style="designStyles"> <component v-for="(f, i) in sliders.list" :is="isDisallow(f)?\'div\':\'router-link\'" :to=\'link(f)\' @click.native="click(f, i)" class="digitals-product" :class="\'has-layout-\'+values.design.layout"> <div class="is-digitals"> <div> <div class="is-title"><span :class="s">{{f.title}}</span></div> <span> <b class="is-price" :class="s">{{f.price|currency}}</b> <span v-if="f.price_compare && f.price_compare> f.price" class="is-price-compare strikethrough" :class="s">&nbsp;{{f.price_compare|currency}}&nbsp;</span> </span> </div> <div class="button is-link" :class="{\'is-disallow\': !f.is_active, \'is-loading\': isLoading(i)}"><span :class="{skeleton: isFetching}">{{buttonTitle(f)}}</span></div> </div> <div class="is-picture lazy" :class="[s]" :style="{backgroundColor: f.p?f.p.color:null}" :data-src="urlPicture(f)"><div></div></div> </component> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-digitals-submit-form",
    {
      props: ["o", "title"],
      data: function () {
        return {
          keyComponent: 0,
        };
      },
      mounted: function () {
        $events.on("reload", this.reload),
          $events.on("digitals_access", this.close);
      },
      beforeDestroy: function () {
        $events.off("reload", this.reload),
          $events.off("digitals_access", this.close);
      },
      computed: {
        form: function () {
          var t = this,
            e = [
              {
                type_id: 3,
                title: this.$gettext("Имя"),
                text: "",
                value: "",
                required: !1,
                idx: "#a",
              },
              {
                type_id: 6,
                title: this.$gettext("Email"),
                text: "",
                value: "",
                required: !0,
                idx: "#b",
              },
              {
                type_id: 100,
                title: this.$gettext("Промокод"),
                text: "",
                value: "",
                required: !1,
                idx: "#c",
              },
            ];
          return {
            fields: __.filter(
              this.o.data.fields.length ? this.o.data.fields : e,
              function (e) {
                return (
                  (100 == e.type_id && t.o.data.promocodes) || 100 != e.type_id
                );
              }
            )
              .concat([
                {
                  typename: "button",
                },
              ])
              .concat(this.o.data.fields_more ? this.o.data.fields_more : []),
            form_btn:
              this.$gettext("Оплатить") +
              " " +
              this.$currency(this.o.data.price),
          };
        },
      },
      methods: {
        close: function () {
          this.$parent.close();
        },
        reload: function () {
          this.keyComponent++;
        },
      },
      template:
        '<div class="modal-card modal-card-little" style="justify-content: flex-end;padding: 0"> <header class="modal-card-head has-rtl"> <p class="modal-card-title">{{title}}</p> <button class="modal-close is-large" @click="close" type="button"></button> </header> <section class="modal-card-body"> <div class="block-item"> <div class="block-form"> <vue-frontend-blocks-form :key="keyComponent" :options="form" :theme="o.theme" :block="o.block" :fields="{product_id: o.data.product_id, request: \'lead\', addon: \'digitals\'}" endpoint="addon/resolve" :need-user="true" :mode="o.mode"/> </div> </div> </section> </div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-document", {
    props: {
      options: Object,
      theme: Object,
      section: Object,
      mode: {
        default: "view",
      },
    },
    mixins: [BlockModel],
    template:
      "<component :is=\"(mode == 'view')?'vue-frontend-components-document':'vue-component-document'\" v-model=\"values.body\" v-if=\"values.body\"/>",
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-form", {
    data: function () {
      return {
        isLoading: !1,
        defaults: {
          fields: [],
          form_text: this.$gettext("Спасибо за вашу заявку"),
          form_btn: this.$gettext("Отправить"),
          order_budget: 0,
          order_purpose: "",
          payment_object_id: 1,
          payment_object_value: null,
          is_order: 0,
          form_type: "text",
          paid_status_id: 3,
          paid_change_status: !0,
          target_id: null,
          target_value: null,
        },
      };
    },
    props: {
      options: Object,
      block: Object,
      mode: {
        default: "view",
      },
      theme: Object,
      section: Object,
      endpoint: {
        default: "form/push",
      },
      fields: {
        defaults: {},
      },
      needUser: Boolean,
    },
    mixins: [BlockModel],
    created: function () {
      var e, t;
      (this.block.tariff = "business"),
        "edit" == this.mode ||
          ((t = (e = document.location.search).match(/[\?|\&]form=([0-9]+)/)) &&
            t[1] == this.block.block_id &&
            ((e = e.replace(/[\?|\&]form=[0-9]+/, "")),
            this.openCompleteForm(),
            this.$router.replace(document.location.pathname + e)));
    },
    computed: {
      stylesheets: function () {
        var e = {},
          t = this.theme,
          n = StylesFactory.getDefaultSection(t, !1);
        if (this.values.design && this.values.design.on && this.isAllowDesign) {
          var i = this.values.design,
            i = __.merge(n.link, this.section ? this.section.link : {}, i, !0);
          return StylesFactory.getLinkSectionVariables(i, t, "--block-link");
        }
        return e;
      },
    },
    methods: {
      openCompleteForm: function () {
        this.$modal("vue-frontend-form-complete-modal", {
          message: this.values.form_text,
        });
      },
      submit: function () {
        var e,
          t = this;
        "view" != this.mode ||
          (null != (e = this.$refs.elements.getFields()) &&
            ((this.isLoading = !0),
            this.$api
              .post(this.endpoint, {
                params: Object.assign(
                  {
                    fields: e,
                    block_id: this.block.block_id,
                  },
                  this.fields
                ),
              })
              .then(function (e) {
                "reload" == e.result
                  ? ((t.isLoading = !1), $events.fire("reload"))
                  : "success" == e.result
                  ? ($events.fire("lead", {
                      lead_id: e.response.lead_id,
                      addons:
                        null != t.values.data && null != t.values.data.link
                          ? t.values.data.link
                          : null,
                    }),
                    "https://www.messenger.com/closeWindow/" ==
                    e.response.redirect
                      ? (window.location = e.response.redirect)
                      : "#" == e.response.redirect[0]
                      ? (t.$refs.elements.reset(),
                        (t.isLoading = !1),
                        (t.values.form_text = e.response.redirect.substr(1)),
                        t.openCompleteForm())
                      : window.self !== window.top
                      ? window.open(e.response.redirect)
                      : (window.location = e.response.redirect))
                  : ((t.isLoading = !1),
                    null != e.message &&
                      t.$modal("vue-frontend-dialog", {
                        title: e.message,
                        type: "danger",
                      }));
              })));
      },
    },
    template:
      '<form @submit.prevent="submit" ref="form" :style="stylesheets" :class="\'has-form-\'+(values.design.style || theme.form.style)"> <vue-frontend-form-elements :fields.sync="values.fields" :isLoading.sync="isLoading" ref="elements" :block_id="block.block_id" :mode="mode" :need-user="values.target_id?true:false || needUser" :form_btn="values.form_btn"/> </form>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-html", {
    mounted: function () {
      this.refresh();
    },
    watch: {
      options: function () {
        this.refresh();
      },
    },
    props: ["options", "block"],
    created: function () {
      this.block && (this.block.tariff = "pro");
    },
    methods: {
      refresh: function () {
        var t = this;
        (this.block && !this.$auth.isAllowTariff(this.block.tariff)) ||
          this.$nextTick(function () {
            t.$el.innerHTML = "";
            var e = Firewall.checkHTML(t.options.html);
            null == window.html_blocks_amount &&
              (window.html_blocks_amount = 0),
              window.html_blocks_amount++,
              (e = e
                .replace(/(<script[^>]*>)/g, "$1try {")
                .replace(
                  /(<\/script[^>]*>)/g,
                  "} catch (e) { console.log('ERROR:', e); }$1"
                )),
              postscribe(t.$el, e, {
                done: function () {
                  var e;
                  window.html_blocks_amount--,
                    window.html_blocks_amount ||
                      (window.dispatchEvent(
                        new Event("load", {
                          bubbles: !1,
                        })
                      ),
                      document.dispatchEvent(
                        new Event("DOMContentLoaded", {
                          bubbles: !1,
                        })
                      ),
                      (e = window.location.hash) &&
                        ((o = $mx(e)),
                        o.length
                          ? o.scrollIt(300)
                          : ((o = $mx('[name="' + e.substr(1) + '"]')),
                            o.length && o.scrollIt(300))));
                },
                error: function (e) {
                  console.log("ERROR:", e);
                },
                beforeWrite: Firewall.checkHTML,
              });
          });
      },
    },
    template: "<div></div>",
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-link", {
    data: function () {
      return {
        loading: "",
        signupShown: 0,
        signupSending: !1,
        embededPageLoading: !1,
        embededHeight: null,
        embededTitleHeight: null,
        message: "",
        cookieToc: !1,
        addonIndex: -1,
        email: "",
        embededPageId: null,
        embededSection: null,
        fields: null,
        fields_options: {},
        keyIcon: 0,
        block_page_id: null,
        defaults: {
          title: "",
          subtitle: "",
          type: "link",
          value: null,
          animation: "",
          thumb: {
            t: "n",
            i: null,
            p: null,
          },
        },
      };
    },
    props: {
      options: Object,
      block: Object,
      section: Object,
      page_id: Number,
      isEmbeded: Boolean,
      theme: Object,
      mode: {
        default: "view",
      },
    },
    mixins: [BlockModel],
    created: function () {
      switch (this.values.type) {
        case "emailsignup":
        case "product":
        case "collection":
        case "page":
        case "embeded":
          this.block.tariff = "business";
      }
      this.block_page_id = this.page_id;
    },
    computed: {
      withoutThumb: function () {
        return null == this.values.thumb || "n" == this.values.thumb.t;
      },
      classname: function () {
        var e =
          null != this.values.animation &&
          this.values.animation &&
          !this.embededPageId
            ? "has-animation has-animation-" + this.values.animation
            : "";
        return [
          "button btn-link btn-link-styled",
          {
            "is-embeded-page": "embeded" == this.values.type,
            "is-close":
              this.$page.page_filename == this.values.value &&
              "edit" != this.mode,
            "is-already-embeded": this.isEmbeded,
            "is-opened": "embeded" == this.values.type && this.embededPageId,
            "without-thumb": this.withoutThumb,
            "with-thumb": !this.withoutThumb,
            "is-loading":
              this.loading == this.block.stat || this.embededPageLoading,
          },
          e,
        ];
      },
      stylesheets: function () {
        var e = this.theme,
          t = StylesFactory.getDefaultSection(e, !1),
          n = {},
          i = {};
        if (
          (this.values.design &&
            this.values.design.on &&
            this.isAllowDesign &&
            (i = this.values.design),
          (i = __.merge(t.link, this.section ? this.section.link : {}, i, !0)),
          this.embededPageId)
        )
          var o = this.embededSection,
            s =
              null != (o = o && StylesFactory.restoreSection(o, e, t)) &&
              null != o.text
                ? o.text.color
                : null != o && null != o.link
                ? o.link.color
                : e.screen.color,
            r =
              null != o && null != o.text
                ? o.text.color
                : null != o && null != o.link
                ? o.link.subtitle.color
                : e.screen.color,
            a =
              null != o && null != o.bg && null != o.bg.color
                ? o.bg.color
                : null,
            n = __.filter({
              "--block-link-background": a
                ? ColorsFactory.getBackground(a, null)
                : "none",
              "--block-link-title-color": s,
              "--block-link-subtitle-color": r,
              "--block-link-border-width": (i.border.width || 2) + "px",
              "--block-link-border-color": i.border.color
                ? i.border.color
                : null,
            });
        else if (
          this.values.design &&
          this.values.design.on &&
          this.isAllowDesign
        )
          return StylesFactory.getLinkSectionVariables(i, e, "--block-link");
        return __.filter(n);
      },
      title: function () {
        return this.values.title ? this.values.title : this.values.link;
      },
      isExternal: function () {
        return (
          "edit" == this.mode ||
          -1 !=
            ["link", "phone", "email", "sms", "vcard"].indexOf(
              this.values.type
            ) ||
          _.isObject(this.values.value)
        );
      },
      isAnchor: function () {
        return "link" == this.values.type && "#" == this.link.substr(0, 1);
      },
      link: function () {
        if ("view" != this.mode) return null;
        var e = this.$links.resolve(this.values);
        return (
          _.isObject(e) &&
            this.isExternal &&
            (e = this.$router.resolve(e).href),
          e
        );
      },
    },
    methods: {
      innerButton: function () {
        var e = "",
          t = this.thumb();
        return (
          t && (e += '<figure class="thumb">' + t + "</figure>"),
          (e +=
            '<div><div class="btn-link-title">' +
            this.$typography(this.title, !0) +
            "</div>"),
          this.values.subtitle &&
            (e +=
              '<div class="btn-link-subtitle">' +
              this.$typography(this.values.subtitle, !0) +
              "</div>"),
          (e += "</div>")
        );
      },
      thumb: function () {
        var e = this;
        return null == this.values.thumb
          ? null
          : this.$icons.prepare(this.values.thumb, function () {
              e.keyIcon++;
            });
      },
      signupSend: function () {
        var t = this;
        "edit" != this.mode &&
          ((this.signupSending = !0),
          this.$api
            .post("form/push", {
              params: {
                fields: [
                  {
                    type: 6,
                    value: this.email,
                    idx: 1,
                  },
                ],
                block_id: this.block.block_id,
              },
            })
            .then(function (e) {
              "success" == e.result &&
                (window.$events.fire("lead", {
                  lead_id: e.response.lead_id,
                  addons:
                    null != t.values.data && null != t.values.data.link
                      ? t.values.data.link
                      : null,
                }),
                t.hideEmailSingnup(),
                "https://www.messenger.com/closeWindow/" == e.response.redirect
                  ? (window.location = e.response.redirect)
                  : "#" == e.response.redirect[0]
                  ? ((t.message = e.response.redirect.substr(1)),
                    t.$modal("vue-frontend-form-complete-modal", {
                      message: t.message,
                    }),
                    (t.email = ""))
                  : (window.top.location = e.response.redirect),
                "#" != e.response.redirect[0] &&
                  ((t.loading = t.block.stat),
                  t.stat(),
                  setTimeout(function () {
                    t.loading = "";
                  }, 2e3))),
                (t.signupSending = !1);
            }));
      },
      hideEmailSingnup: function () {
        var e,
          t = this;
        (this.signupShown = 0),
          -1 != this.addonIndex &&
            ((e = this.addonIndex),
            (this.$account.widgets[e].data.isClosed = !0),
            setTimeout(function () {
              t.$account.widgets.splice(e, 1);
            }, 250),
            (this.addonIndex = -1)),
          $mx("body").off("click", this.hideEmailSignup);
      },
      hideEmailSignup: function (e) {
        $mx(this.$refs.form).has(e.target).length ||
          $mx(".footer-banner").has(e.target).length ||
          $mx(".modal").has(e.target).length ||
          this.hideEmailSingnup();
      },
      hideEmbeded: function () {
        var e = this;
        (this.embededHeight = null),
          $mx(window).off("resize", this.checkEmbededHeight),
          this.embededPageId != this.values.value && (this.fields = null),
          setTimeout(function () {
            (e.embededPageId = null), $events.fire("contentupdated");
          }, 250);
      },
      checkEmbededHeight: function () {
        this.$refs.embeded &&
          (this.embededHeight = $mx(this.$refs.embeded.$el).outerHeight());
      },
      fetchEmbededPage: function (t) {
        var n = this;
        if (this.$page.page_filename == t) return this.hideEmbeded();
        (this.embededPageLoading = !0),
          this.$api
            .get("page/get", {
              params: {
                part: this.part,
                page_id: t,
              },
            })
            .then(function (e) {
              null != e.redirect
                ? n.$router.replace(e.redirect)
                : ((n.fields = e.response.fields),
                  (n.embededSection =
                    n.fields && _.size(n.fields) && n.fields[0].section
                      ? n.fields[0].section
                      : null),
                  (n.fields = _.filter(
                    _.map(n.fields, function (e) {
                      return (
                        (e.items = _.filter(
                          _.map(e.items, function (e) {
                            return "avatar" == e.block_type_name ? null : e;
                          })
                        )),
                        e.items.length ? e : null
                      );
                    })
                  )),
                  (n.fields_options = e.response.options),
                  $events.fire("pageview", {
                    page_id: e.response.page_id,
                    profile_id: n.$account.profile_id,
                  }),
                  $events.fire("contentupdated"),
                  n.checkHeight(),
                  $mx(window).on("resize", n.checkEmbededHeight),
                  (n.embededPageId = t),
                  (n.$account.embeded = n)),
                (n.embededPageLoading = !1);
            });
      },
      checkHeight: function () {
        var t = this;
        _.each([150, 500, 700], function (e) {
          return setTimeout(t.checkEmbededHeight, e);
        });
      },
      stat: function (e) {
        var t = 0 < arguments.length && void 0 !== e ? e : null;
        window.$events.fire("tap", {
          page_id: this.block_page_id,
          block_id: this.block.block_id,
          stat: this.block.block_id + "." + this.block.stat,
          data: [t],
          addons:
            null != this.values.data && null != this.values.data.link
              ? this.values.data.link
              : null,
        });
      },
      click: function (e) {
        var t,
          n,
          i = this;
        if ("edit" != this.mode)
          if ("embeded" == this.values.type)
            if (this.embededPageId) this.hideEmbeded();
            else {
              if (this.isEmbeded)
                return this.$account.embeded.fetchEmbededPage(
                  this.values.value
                );
              (this.embededTitleHeight = $mx(this.$el).outerHeight()),
                this.fields
                  ? ((this.embededPageId = this.values.value),
                    setTimeout(this.checkEmbededHeight, 150),
                    $mx(window).on("resize", this.checkEmbededHeight))
                  : (this.fetchEmbededPage(this.values.value), this.stat());
            }
          else
            "emailsignup" == this.values.type
              ? ((this.signupSending = !0),
                (this.signupShown = 1),
                (this.signupSending = !1),
                setTimeout(function () {
                  (i.signupShown = 2),
                    setTimeout(function () {
                      i.$refs.input.focus(),
                        $mx("body").on("click", i.hideEmailSignup),
                        i.values.value.agreement &&
                          (i.$account.widgets.push({
                            name: "agreement-banner",
                            data: {
                              message: i.values.value.agreement,
                              isClosed: !0,
                            },
                          }),
                          (i.addonIndex = i.$account.widgets.length - 1),
                          setTimeout(function () {
                            i.$account.widgets[i.addonIndex].data.isClosed = !1;
                          }, 150));
                    }, 100);
                }, 250))
              : _.isObject(this.values.value) &&
                null != this.values.value.component
              ? (e.preventDefault(),
                $events.fire("component:show", this.values.value.component))
              : ((t = _.isObject(this.link)
                  ? this.$router.resolve(this.link).href
                  : this.link),
                this.stat({
                  event: "taplink:" + this.values.type,
                  param: t,
                }),
                "anchor" == this.values.type
                  ? (n = this.values.value.split(":"))[0] ==
                    this.$page.page_filename
                    ? (this.$page.scrollTo(".b-" + n[1]), e.preventDefault())
                    : ($scroll.position = ".b-" + n[1])
                  : this.isAnchor
                  ? (this.$page.scrollTo(t), e.preventDefault())
                  : ((this.loading = this.block.stat),
                    this.isExternal || e.preventDefault(),
                    setTimeout(function () {
                      i.loading = "";
                    }, 2e3)));
      },
    },
    template:
      '<div :class="\'is-\'+$account.locale.direction"> <div v-if="values.type == \'emailsignup\'" :style="stylesheets"> <transition name="fade" mode="out-in" :duration="100"> <form ref="form" v-if="signupShown" @submit.prevent="signupSend" class="email-signup" :class="classname"><input type="email" v-model="email" class="input" required ref="input" :disabled="signupSending" placeholder="example@domain.com"><button class="button" :class="{\'is-loading\': signupSending, in: signupShown== 2}" type="submit">{{\'Отправить\'|gettext}}</button></form> <component :is="(mode == \'view\')?\'a\':\'div\'" v-else :class="classname" @click="click" v-html="innerButton()" :key="keyIcon"></component> </transition> </div> <div v-else-if="values.type == \'embeded\'" :style="stylesheets"> <component :is="(mode == \'view\')?\'a\':\'div\'" :class="classname" @click="click" v-html="innerButton()" :key="keyIcon"/> <div class="is-embeded-content main-theme" v-if="embededPageId" :style="StylesFactory.getSectionCommonVariables(StylesFactory.getDefaultSection($account.theme), $account.theme)"> <div :style="{height: this.embededHeight?(this.embededHeight+\'px !important\'):null}"><vue-frontend-page-blocks :fields="fields" :page_id="values.value" part="p" :is-embeded="true" v-if="fields" ref="embeded" @checkHeight="checkHeight"/></div> </div> </div> <component :is="(mode == \'view\')?\'a\':\'div\'" :download="(values.type == \'vcard\')?\'contacts.vcf\':null" v-else-if="isExternal" rel="noopener" :data-link="link" :href=\'link\' :class="classname" @click="click" :style="stylesheets" v-html="innerButton()" :key="keyIcon" :target="(values.open_new_window || $account.open_new_window)?\'_blank\':\'_top\'"/> <router-link v-else rel="noopener" :to=\'link\' :class="classname" @click.native="click" :style="stylesheets" v-html="innerButton()" :key="keyIcon"/> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-map", {
    data: function () {
      return {
        map: null,
        icon: null,
        loading: null,
        markers: [],
        defaults: {
          bounds: {},
          markers: [],
          show_buttons: !0,
          is_fixed: !0,
          show_types: !1,
          show_zoom: !1,
          show_street: !1,
          style: "b",
        },
      };
    },
    props: {
      options: Object,
      block: Object,
      page_id: Number,
      mode: {
        default: "view",
      },
      theme: Object,
      section: Object,
    },
    mixins: [BlockModel],
    mounted: function () {
      this.rebuild();
    },
    created: function () {
      this.block.tariff = "pro";
    },
    watch: {
      values: function () {
        this.refresh();
      },
      "values.style": {
        handler: function () {
          this.rebuild();
        },
      },
    },
    computed: {
      stylesheets: function () {
        var e = {},
          t = this.theme,
          n = StylesFactory.getDefaultSection(t, !1);
        if (this.values.design && this.values.design.on && this.isAllowDesign) {
          var i = this.values.design,
            i = __.merge(n.link, this.section ? this.section.link : {}, i, !0);
          return StylesFactory.getLinkSectionVariables(i, t, "--block-link");
        }
        return e;
      },
      isSupportWebp: function () {
        var e = document.createElement("canvas");
        return (
          !(!e.getContext || !e.getContext("2d")) &&
          0 == e.toDataURL("image/webp").indexOf("data:image/webp")
        );
      },
    },
    methods: {
      click: function (e, t) {
        var n = this;
        (this.loading = t),
          window.$events.fire("tap", {
            page_id: this.page_id,
            block_id: this.block.block_id,
            slot: t,
            stat: this.block.block_id + "." + this.block.stat[t],
            data: [
              {
                event: "taplink:map",
                param: e.lat + ":" + e.lng,
              },
            ],
          }),
          (window.top.location = this.link(e)),
          setTimeout(function () {
            n.loading = null;
          }, 2e3);
      },
      rebuild: function () {
        var i = this;
        $mx.lazy("map.js", "map.css", function () {
          var e,
            t = i.values.bounds,
            n = i.values.is_fixed;
          i.$refs.map &&
            (i.map && i.map.remove(),
            (i.map = L.map(i.$refs.map, {
              dragging: !n,
              doubleClickZoom: !n,
              boxZoom: !n,
              touchZoom: !n,
              scrollWheelZoom: !n,
              zoomControl: !0,
              attributionControl: !1,
            }).setView([t.center.lat, t.center.lng], i.values.zoom)),
            t.bounds && i.map.fitBounds(t.bounds),
            L.control
              .attribution({
                prefix: "",
              })
              .addTo(i.map),
            (e = 1 < window.devicePixelRatio ? "@2x" : ""),
            L.tileLayer(
              "https://m.taplink.st/" +
                i.values.style +
                "/{z}/{x}/{y}" +
                e +
                "." +
                (i.isSupportWebp ? "webp" : "png"),
              {
                attribution:
                  "view" == i.mode
                    ? '<a href="https://taplink.cc" target="_blank">Taplink</a> <span style="color:#ccc">|</span> <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                    : "",
                crossOrigin: !0,
              }
            ).addTo(i.map),
            (i.icon = L.icon({
              iconUrl: "/s/i/marker.png",
              iconSize: [28, 37],
              popupAnchor: [0, -10],
              shadowUrl: "/s/i/marker-shadow.png",
              shadowSize: [40, 50],
              shadowAnchor: [12, 31],
            })),
            i.fillMarkers());
        });
      },
      refresh: function () {
        var e;
        this.map &&
          ((e = this.values.bounds),
          this.map.fitBounds(e.bounds),
          this.fillMarkers(),
          (this.map.options.zoomControl = !0));
      },
      fillMarkers: function () {
        for (var n = this, e = 0; e < this.markers.length; e++)
          this.map.removeLayer(this.markers[e]);
        _.each(this.values.markers, function (e) {
          var t = L.marker([parseFloat(e.lat), parseFloat(e.lng)], {
            icon: n.icon,
          }).addTo(n.map);
          t.bindPopup(
            "<b>" +
              e.title +
              "</b>" +
              (e.text
                ? "<div>" + e.text.toString().replace(/\n/g, "<br>") + "</div>"
                : "")
          ),
            n.markers.push(t);
        });
      },
      link: function (e) {
        return (
          "https://maps.google.com/?q=" +
          e.lat +
          "," +
          e.lng +
          "&z=" +
          this.values.bounds.zoom
        );
      },
    },
    template:
      '<div> <div class="map-container btn-link-block"> <div class="map-view" ref="map" :class="{\'map-view-with-zoom-control\': values.show_zoom}"></div> </div> <component v-bind:is="(mode == \'view\')?\'a\':\'div\'" v-if="values.show_buttons" v-for="(m, i) in values.markers" :href=\'link(m)\' @click.prevent="click(m,i)" target="_top" class="btn-link btn-link-block btn-map btn-link-styled" :class="{\'is-loading\': loading== i}" :style="stylesheets"> <i class="fa fai fa-map-marker-alt"></i><span class="btn-link-title">{{m.title|nvl($gettext(\'Заголовок\'))}}</span> </component> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-media", {
    data: function () {
      return {
        lazyHit: !1,
        values: {},
        keyComponent: 0,
        defaults: {
          fields: [],
          styles: {
            shape: "square",
            style: "none",
            size: 48,
            color: "",
            align: "l",
            cols: 1,
            spacing: 1,
            centered: 1,
          },
        },
      };
    },
    props: {
      options: Object,
      section: Object,
      theme: Object,
      mode: {
        default: "view",
      },
    },
    mixins: [BlockModel],
    computed: {
      stylesheets: function () {
        var e = {
          "--block-media-card-spacing": 15 * this.values.styles.spacing + "px",
          "--block-media-icon-size": this.values.styles.size + "px",
          "--block-media-icon-border": "2px",
        };
        this.values.styles.color &&
          (e["--block-media-icon-color"] = this.values.styles.color);
        var t = this.options.design;
        return (
          t &&
            t.on &&
            Object.assign(
              e,
              t.text && t.text.size
                ? FontsFactory.getTextStyles(t.text.size, "--block-media-text")
                : null,
              t.heading && t.heading.size
                ? FontsFactory.getTextStyles(
                    t.heading.size,
                    "--block-media-heading"
                  )
                : null,
              {
                "--block-media-text-color": t.text ? t.text.color : null,
                "--block-media-heading-color": t.heading
                  ? t.heading.color
                  : null,
                "--block-media-text-font-family": t.text
                  ? FontsFactory.getFont(t.text.font)
                  : null,
                "--block-media-text-font-weight": t.text
                  ? FontsFactory.getWeight(t.text.font, 1)
                  : null,
                "--block-media-heading-font-weight": t.heading
                  ? FontsFactory.getWeight(
                      t.heading.font ||
                        (this.section && this.section.heading
                          ? this.section.heading.font
                          : null) ||
                        this.theme.heading.font,
                      t.heading.weight
                    )
                  : null,
                "--block-media-heading-font-family": t.heading
                  ? FontsFactory.getFont(t.heading.font)
                  : null,
              }
            ),
          e
        );
      },
      isIcons: function () {
        return (
          0 ==
          _.sum(
            _.map(this.values.fields, function (e) {
              return (e.title || "").length + (e.text || "").length;
            })
          )
        );
      },
      hasCentered: function () {
        return "c" == this.values.styles.align && this.values.styles.centered;
      },
    },
    methods: {
      lazy: function () {
        this.lazyHit = !0;
      },
      parse: function (e, t) {
        var n = "view" == this.mode ? "a" : "contact";
        return this.$parseContacts(this.$typography(e, t), n);
      },
      icon: function (e) {
        var t = this;
        return this.lazyHit
          ? this.$icons.get(e.thumb.i, function () {
              t.keyComponent++;
            })
          : null;
      },
    },
    template:
      "<div> <ul class=\"block-media-content\" :style=\"stylesheets\" :key=\"keyComponent\" :class=\"['is-align-'+values.styles.align, isIcons?'is-icons':'row']\"> <li v-for=\"f in values.fields\" class=\"media\" :class=\"isIcons?'':('col-xs-12 col-sm-'+(12/values.styles.cols))\" :style=\"values.styles.color?{'--theme-text-color-contrast': (lightOrDark(values.styles.color) == 'light')?'#000':'#fff'}:null\"> <div v-if=\"f.thumb && f.thumb.t != 'n'\" :class=\"'is-'+values.styles.shape+' is-'+values.styles.style\"> <span :data-src=\"(f.thumb.t == 'p' && f.thumb.p)?('//'+$account.storage_domain+'/p/'+f.thumb.p.filename):null\" :class=\"{'is-icon': f.thumb.t == 'i', 'is-image lazy': f.thumb.t == 'p', 'lazy-force': mode== 'edit'}\"> <figure v-if=\"f.thumb.t == 'i'\" v-html=\"icon(f)\" class=\"lazy\" :class=\"{'lazy-force': mode== 'edit'}\" @lazy-hit=\"lazy\"></figure> <figure v-if=\"f.thumb.t == 'p'\"></figure> </span> </div> <div> <div v-if=\"f.title\" class=\"has-rtl is-heading\" :class=\"{'has-text-centered': hasCentered}\" v-html=\"parse(f.title, true)\"/> <div v-if=\"f.text\" class=\"has-rtl is-text\" :class=\"{'has-text-centered': hasCentered}\" v-html=\"parse(f.text, true)\"/> </div> </li> </ul> </div>",
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-menu-item", {
    data: function () {
      return {
        active: !1,
        keyIcon: 0,
      };
    },
    props: ["value", "mode", "tag", "anchor", "hasIcons", "showIcons"],
    created: function () {
      $events.on("contentupdated", this.checkActive), this.checkActive();
    },
    beforeDestroyed: function () {
      $events.off("contentupdated", this.checkActive);
    },
    computed: {
      thumb: function () {
        var e = this;
        return (
          this.keyIcon,
          null == this.value.thumb
            ? null
            : this.$icons.prepare(this.value.thumb, function () {
                e.keyIcon++;
              })
        );
      },
      showThumb: function () {
        return (this.value.thumb || this.hasIcons) && this.showIcons;
      },
      isExternal: function () {
        return (
          "view" != this.mode ||
          -1 !=
            ["link", "phone", "email", "sms", "vcard"].indexOf(
              this.value.type || "link"
            )
        );
      },
      isAnchor: function () {
        return (
          "view" == this.mode &&
          "link" == (this.value.type || "link") &&
          "#" == this.link.substr(0, 1)
        );
      },
      link: function () {
        return "view" == this.mode ? this.$links.resolve(this.value) : null;
      },
    },
    watch: {
      anchor: function () {
        this.checkActive();
      },
    },
    methods: {
      checkActive: function () {
        var e;
        "view" != this.mode ||
          this.isExternal ||
          ((e =
            this.$router.resolve(this.link).href ==
            this.$router.currentRoute.path),
          (this.active =
            "anchor" == this.value.type
              ? e &&
                this.value.value ==
                  (this.anchor || this.$page.page_filename + ":")
              : e && !this.anchor));
      },
      click: function (e) {
        var t;
        "view" != this.mode && (e.preventDefault(), this.$emit("click")),
          "page" != this.value.type ||
          (this.value.value != this.$page.page_filename &&
            (this.$page.page_id != this.$account.main_page_id ||
              this.value.value))
            ? "anchor" == this.value.type
              ? (t = this.value.value.split(":"))[0] == this.$page.page_filename
                ? ($page.scrollTo(".b-" + t[1]), e.preventDefault())
                : ($scroll.position = ".b-" + t[1])
              : this.isAnchor &&
                (this.$page.scrollTo(this.link.substr(1)), e.preventDefault())
            : ($page.scrollTo(), e.preventDefault());
      },
    },
    template:
      '<component :is="tag" class="menu-block-item" :class="{in: active}"> <a v-if="isExternal" :download="(value.type == \'vcard\' && mode== \'view\')?\'contacts.vcf\':null" rel="noopener" :href=\'link\' @click="click" target="_blank"><figure class="thumb" v-if="showThumb" v-html="thumb" :class="{\'has-title\': value.title}"></figure><span v-if="value.title">{{value.title}}</span></a> <router-link v-else rel="noopener" :to=\'link\' @click.native.prevent="click"><figure class="thumb" v-if="showThumb" v-html="thumb" :class="{\'has-title\': value.title}"></figure><span v-if="value.title">{{value.title}}</span></router-link> </component>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-menu", {
    data: function () {
      return {
        current: null,
        index: 0,
        offset: null,
        keyIndex: 0,
        visible: !0,
        menuOpened: !1,
        anchorsInited: !1,
        scrollInited: !1,
        anchor: null,
        keyComponent: 0,
        circle: {},
        defaults: {
          items: [],
          width: "fullscreen",
          fixed: !0,
          placement: "top",
          align: "centered",
          logo: {
            type: "none",
            p: null,
            text: {
              title: "",
              bg: null,
              color: null,
              font: null,
              transform: "n",
              weight: 1,
              textsize: 20,
              letterspacing: 0,
            },
          },
          burger: {
            rule: "mobile",
            shrink: !1,
            duration: 200,
            view: "circle",
            align: "center",
            button: "b",
            spacing: 20,
            font: null,
            transform: "u",
            textsize: 20,
            letterspacing: 0,
            weight: 1,
            font_size: "lg",
            colors: {
              bg: "#343a40fa",
              text: null,
              close: null,
            },
          },
          design: {
            style: "button",
            border: {
              size: 1,
              color: null,
            },
            shadow: {
              x: 0,
              y: 0,
              b: 0,
              s: 0,
              color: "#000000",
              o: 20,
            },
            font: null,
            transform: "n",
            textsize: 17,
            letterspacing: 0,
            weight: 1,
            colors: {
              bg: null,
              text: null,
              active: null,
              active_text: null,
            },
          },
        },
      };
    },
    props: {
      value: Object,
      mode: {
        default: "view",
      },
      withScroll: {
        default: !0,
      },
      visible: {
        default: !0,
      },
      menuOpenedDefault: Boolean,
      rootSelector: {
        default: "html",
      },
      circleSelector: String,
      closeOutside: {
        default: !0,
      },
    },
    watch: {
      menuOpened: function (e) {
        var t;
        this.closeOutside &&
          ((t = $mx(document.body)),
          e ? t.on("click", this.menuClick) : t.off("click", this.menuClick)),
          this.root
            .toggleClass("is-menu-opened", e)
            .addClass("is-menu-opened-once");
      },
      value: {
        handler: function (e, t) {
          this.toggleDocumentClasses(!1),
            this.toggleDocumentClasses(!0),
            this.updateHTMLClasses(!0),
            this.checkGUI(!1),
            _.size(_.differenceWith(e.logo, t.logo)) &&
              ((this.visible = !1), this.recheckOffset());
        },
        deep: !0,
      },
      shrink: function () {
        this.setMenuView();
      },
      anchors: function () {
        this.checkScrollAnchors();
      },
      anchor: function () {
        this.checkGUI(!0);
      },
    },
    computed: {
      userIconsClass: function () {
        return "center" != this.o.burger.align || this.o.burger.shrink
          ? ""
          : this.shrink
          ? "is-hidden-mobile"
          : "is-hidden";
      },
      isMenuVisible: function () {
        return _.size(this.o.items) || "none" != this.o.logo.type;
      },
      vbar: function () {
        return this.withScroll
          ? "vue-" + ("view" == this.mode ? "frontend" : "component") + "-vbar"
          : "div";
      },
      classContainer: function () {
        var e = this.$page.max_width;
        return "view" == this.mode
          ? "max-page-container-" +
              ("widget" == this.o.placement
                ? "fullscreen"
                : "fullwidth" == this.o.width
                ? e
                : this.o.width)
          : "";
      },
      circleStyles: function () {
        return "circle" != this.o.burger.view || this.shrink
          ? null
          : this.circle;
      },
      shrink: function () {
        return (
          this.o.burger.shrink ||
          (this.hasUser && "all" != this.o.burger.rule && this.$device.desktop)
        );
      },
      anchors: function () {
        var n = this;
        this.keyIndex;
        var i = [];
        return (
          "view" == this.mode &&
            _.each(this.o.items, function (e) {
              var t;
              "anchor" != e.type ||
                ((t = e.value.split(":"))[0] == n.$page.page_filename &&
                  i.push({
                    y: t[1] ? $mx(".b-" + t[1]).offset().top : 0,
                    v: e.value,
                  }));
            }),
          i.length && (i = _.sortBy(i, "y")),
          i
        );
      },
      o: function () {
        var n = this,
          e = _.merge(this.defaults, this.value, !0);
        switch (e.placement) {
          case "widget":
            e.burger.rule = "all";
            break;
          case "bottom":
            (e.burger.rule = "none"), (e.logo.type = "none"), (e.fixed = !0);
        }
        var i,
          t = _.sum(
            _.filter(e.items, function (e) {
              return "anchor" == e.type;
            })
          );
        return (
          !this.anchorsInited &&
            t &&
            "view" == this.mode &&
            ($scroll.body.on("scroll touchmove", this.checkScrollAnchors),
            (i = _.uniq(
              _.filter(
                _.map(e.items, function (e) {
                  return "anchor" == e.type ? e.value.split(":")[0] : null;
                })
              )
            )).length &&
              _.each(e.items, function (e) {
                var t = e.value || n.$account.main_page_id.toString(16);
                "page" == e.type &&
                  -1 != i.indexOf(t) &&
                  ((e.type = "anchor"), (e.value = t + ":"));
              }),
            (this.anchorsInited = !0),
            this.checkScrollAnchors()),
          this.scrollInited ||
            "circle" != e.burger.view ||
            ($mx(window).on("resize", this.checkWindowSize),
            this.checkWindowSize()),
          e
        );
      },
      ml: function () {
        return this.o.items.length || "view" != this.mode;
      },
      logo: function () {
        this.keyComponent;
        var e = this.o.logo.text;
        return e.title
          ? e.gettext
            ? this.$gettext(e.title)
            : e.title
          : "Logo";
      },
      hasUser: function () {
        return this.keyIndex, "view" == this.mode && !!this.$auth.user;
      },
      hasBurger: function () {
        return "none" != this.o.burger.rule || this.hasUser;
      },
      hasIcons: function () {
        return (
          !(
            0 != this.o.items.length ||
            ("center" == this.o.burger.align && !this.shrink)
          ) ||
          _.filter(this.o.items, function (e) {
            return null != e.thumb;
          }).length
        );
      },
      mobileItems: function () {
        return _.filter(this.o.items, function (e) {
          return null == e.thumb || e.title;
        });
      },
      logoStyles: function () {
        if (this.o.logo.p) {
          var e = this.o.logo.p;
          return {
            "background-image":
              "url(//" +
              this.$account.storage_domain +
              "/p/" +
              e.filename +
              ")",
            width: (e.width / e.height) * 32 + "px",
          };
        }
        return null;
      },
      stylesheets: function () {
        var e = this.o.design,
          t = e.border,
          n = e.colors,
          i = this.o.logo.text,
          o = this.o.burger,
          s = isLightColor(ColorsFactory.getColor(n.bg)),
          r = null == e.font ? this.$account.theme.screen.font : e.font,
          a = n.text ? n.text : n.bg ? (s ? "#000" : "#fff") : null,
          l = n.active
            ? n.active
            : n.bg
            ? s
              ? "#00000008"
              : "#ffffff25"
            : null,
          c = o.colors.bg
            ? isLightColor(o.colors.bg)
              ? "#000"
              : "#fff"
            : null,
          u = o.colors.text ? o.colors.text : c,
          d = o.colors.close ? o.colors.close : c,
          h = {
            "--block-menu-background": ColorsFactory.getBackground(n.bg),
            "--block-menu-color": a,
            "--block-menu-background-active": ColorsFactory.getBackground(l),
            "--block-menu-active-color": n.active_text
              ? n.active_text
              : (n.active && !isTransparentColor(n.active)) ||
                (n.bg && !isTransparentColor(n.bg))
              ? isLightColor([l, n.active, n.bg])
                ? "#000"
                : "#fff"
              : null,
            "--block-menu-font-weight": FontsFactory.getWeight(r, e.weight),
            "--block-menu-text-transform": FontsFactory.getTransform(
              e.transform
            ),
            "--block-menu-font-family": FontsFactory.getFont(e.font),
            "--block-menu-font-size": e.textsize + "px",
            "--block-menu-text-letterspacing": e.letterspacing + "px",
            "--block-menu-logo-color": i.color,
            "--block-menu-logo-font-weight": FontsFactory.getWeight(
              null == i.font ? r : i.font,
              i.weight
            ),
            "--block-menu-logo-text-transform": FontsFactory.getTransform(
              i.transform
            ),
            "--block-menu-logo-font-family":
              "text" == this.o.logo.type && null != i.font
                ? FontsFactory.getFont(i.font)
                : null,
            "--block-menu-logo-font-size": i.textsize + "px",
            "--block-menu-logo-text-letterspacing": i.letterspacing + "px",
            "--block-menu-shadow": StylesFactory.getShadow(e.shadow, !0),
            "--block-menu-border-color": t.color,
            "--block-menu-border-size": t.size + "px",
            "--block-menu-burger-bg": o.colors.bg,
            "--block-menu-burger-color": u,
            "--block-menu-burger-close": d,
            "--block-menu-burger-font-family":
              null != o.font ? FontsFactory.getFont(o.font) : null,
            "--block-menu-burger-font-weight": FontsFactory.getWeight(
              null == o.font ? this.$account.theme.screen.font : o.font,
              o.weight
            ),
            "--block-menu-burger-text-transform": FontsFactory.getTransform(
              o.transform
            ),
            "--block-menu-burger-font-size": o.textsize + "px",
            "--block-menu-burger-text-letterspacing": o.letterspacing + "px",
            "--block-menu-burger-spacing": o.spacing + "px",
            "--block-menu-burger-duration": o.duration + "ms",
            "--offset":
              "widget" != this.o.placement && this.offset
                ? this.offset + 20 + "px"
                : null,
          };
        return FontsFactory.check(), h;
      },
    },
    created: function () {
      this.$account.menu;
      (this.menuOpened = this.menuOpenedDefault),
        $events.on("fontloaded", this.checkOffset),
        $events.on("locale:updated", this.localeUpdated),
        "view" == this.mode && $events.on("contentupdated", this.checkActive);
    },
    mounted: function () {
      (this.root = $mx(this.rootSelector)),
        "view" == this.mode &&
          ($mx(window).on("resize", this.setMenuView),
          this.$auth.loadData(),
          this.setMenuView()),
        this.toggleDocumentClasses(!0),
        this.updateHTMLClasses(!0),
        this.checkOffset(),
        this.checkGUI(!1),
        this.checkScrollAnchors(),
        this.checkWindowSize();
    },
    beforeDestroy: function () {
      "view" == this.mode &&
        ($events.off("contentupdated", this.checkActive),
        $mx(window).off("resize", this.setMenuView),
        this.root.removeClass("has-menu")),
        $events.off("locale:updated", this.localeUpdated),
        $events.off("fontloaded", this.checkOffset),
        this.toggleDocumentClasses(!1),
        this.updateHTMLClasses(!1),
        this.anchorsInited &&
          $scroll.body.off("scroll touchmove", this.checkScrollAnchors),
        this.scrollInited && $mx(window).off("resize", this.checkWindowSize);
    },
    methods: {
      thumb: function (e) {
        var t = this;
        return (
          this.keyIndex,
          this.$icons.prepare(
            {
              i: e,
              t: "i",
            },
            function () {
              t.keyIndex++;
            }
          )
        );
      },
      open: function () {
        this.menuOpened = !0;
      },
      close: function () {
        this.menuOpened = !1;
      },
      toggleDocumentClasses: function (e) {
        "preview" != this.mode && this.root.toggleClass("has-menu", e);
      },
      updateHTMLClasses: function (e) {
        (this.root[0].className = this.root[0].className
          .replace(/has\-menu\-[a-z]+\-[a-z\-]*/g, "")
          .trim()),
          e &&
            this.root.addClass(
              "has-menu-placement-" +
                this.o.placement +
                " has-menu-view-" +
                this.o.burger.view
            );
      },
      styleMenuItem: function (e) {
        if (!this.$device.desktop || !this.o.burger.shrink) {
          var t = 0,
            n = this.ml + (this.hasUser ? 2 : 0);
          switch (this.o.burger.view) {
            case "slidedown":
              t = n - e;
              break;
            default:
              t = e;
          }
          return {
            "transition-delay":
              (t / 3 / n) * (this.o.burger.duration / 300) + "s",
          };
        }
      },
      setMenuView: function () {
        this.root.toggleClass(
          "has-menu-view",
          (this.$device.mobile || !this.shrink) && !this.o.burger.shrink
        );
      },
      menuClick: function (e) {
        var t = $mx(e.target);
        (0 == t.closest(".menu-block-item").length &&
          0 != t.closest(".menu-block-avatar").length) ||
          (this.menuOpened = !1);
      },
      logoClick: function (e) {
        this.$account.main_page_id == this.$page.page_id &&
          ($page.scrollTo(), e.preventDefault());
      },
      logout: function () {
        (this.menuOpened = !1), this.$auth.logout();
      },
      recheckOffset: function () {
        var e = this;
        this.$nextTick(function () {
          (e.visible = !0),
            e.$nextTick(function () {
              e.checkOffset();
            });
        });
      },
      checkOffset: function () {
        var t = this;
        if (
          "widget" == this.o.placement ||
          (this.$device.mobile && "none" == this.o.logo.type)
        )
          return (this.offset = null);

        function n() {
          var e = Math.max(
            t.hasUser ? 60 : 0,
            "none" == t.o.logo.type ? 0 : $mx(t.$refs.logo).find("a").width()
          );
          0 == e && (e = -20), (t.offset = e);
        }
        null == this.offset
          ? n()
          : _.each([150, 450, 1e3, 1250, 2500, 5e3, 1e4], function (e) {
              setTimeout(function () {
                n();
              }, e);
            });
      },
      localeUpdated: function () {
        this.keyComponent++, this.recheckOffset();
      },
      editProfile: function () {
        "my.taplink.cc" == document.location.hostname.substr(-13, 13)
          ? this.$router.push({
              name: "part",
              params: {
                part: "p",
                page_filename: "common",
              },
            })
          : (document.location = "https://my.taplink.cc/p/common/"),
          (this.menuOpened = !1);
      },
      checkActive: function () {
        var e = this;
        this.$nextTick(function () {
          e.keyIndex++, e.checkGUI(!0);
        });
      },
      click: function (e) {
        this.index = e;
      },
      checkGUI: function (r) {
        var a = this;
        _.size(this.o.items) &&
          this.$nextTick(function () {
            var e, t, n, i, o, s;
            null == a.$refs.scrollInner ||
              ((e = a.$refs.scrollInner.querySelector(".in")) &&
                ((t = a.$refs.scroll),
                (n = e.offsetLeft),
                (i = t.width),
                (o = Math.max(n - i / 2 + e.offsetWidth / 2, 0)),
                r
                  ? ((s = function () {
                      t && t.getSizes();
                    }),
                    scrollIt(o, "x", t.getWrapper(), 300, "easeOutQuad", s, s))
                  : t.scrollTo(o, 0)));
          });
      },
      checkScrollAnchors: function () {
        var e = null;
        if (this.anchors.length) {
          var t = $scroll.body.scrollTop(),
            n = $scroll.body.height();
          for (i = this.anchors.length - 1; 0 <= i; i--) {
            var o = this.anchors[i];
            if (
              null != o.y &&
              o.y < t + n &&
              (!i || this.anchors[i - 1].y < t)
            ) {
              e = o.v;
              break;
            }
          }
        }
        this.anchor = e;
      },
      checkWindowSize: function () {
        var e,
          t = void 0,
          n = void 0;
        n =
          this.circleSelector && this.root
            ? ((t = (e = $mx("#" + this.circleSelector)).width()), e.height())
            : ((t = window.innerWidth), window.innerHeight);
        var i = Math.ceil(Math.sqrt(t * t + n * n));
        this.circle = {
          width: i + "px",
          height: i + "px",
          left: Math.floor(-(i - t) / 2) + "px !important",
          top: Math.floor(-(i - n) / 2) + "px !important",
        };
      },
    },
    template:
      '<div class="menu-block-container block-item is-paddingless" :class="[\'is-\'+mode, \'is-style-\'+o.design.style, {\'is-fixed\': o.fixed && (mode == \'view\')}]" :style="stylesheets" v-if="visible && isMenuVisible" :key="keyComponent"> <div :class="classContainer"> <div class="page-container"> <div class="menu-block-container-inner"> <div class="menu-block-logo" ref="logo" v-if="o.placement != \'widget\'"><router-link :to="{name: \'index\'}" v-if="o.logo.type != \'none\'" @click.native.prevent="logoClick"><span v-if="o.logo.type == \'text\'">{{logo}}</span><div v-if="o.logo.type == \'picture\'" :style="logoStyles"></div></router-link></div> <component v-bind:is="vbar" class="menu-block-items" :class="\'has-text-\'+o.align" ref=\'scroll\'> <div class="menu-block-scroll" ref="scrollInner" :class="{\'is-hidden-mobile\': o.burger.rule == \'mobile\'}"> <div v-if="_.size(o.items) && (o.burger.rule != \'all\')"> <vue-frontend-blocks-menu-item v-for="(v, i) in o.items" v-model="v" :mode="mode" :class="{in: mode != \'view\' && i== index}" tag="div" @click="click(i)" :anchor="anchor" :show-icons="true"/> </div> </div> </component> <div class="menu-block-avatar" :class="[{in: menuOpened, \'has-user\': hasUser && (o.placement != \'widget\'), \'is-hidden\': !hasBurger}, \'is-rule-\'+o.burger.rule, \'is-align-\'+o.burger.align]"> <div @click="menuOpened = !menuOpened" v-if="hasBurger"> <dd></dd> <dt v-if="ml" :class="\'is-\'+o.burger.button"></dt> </div> <ul v-if="ml || hasUser" :style="circleStyles"> <div :class="(mode == \'view\')?(\'max-page-container-\'+$page.max_width):null"> <div v-if="ml && (o.burger.rule != \'none\')" :class="{\'page-container is-paddingless\': (mode == \'view\') && !shrink, \'is-hidden-tablet\': o.burger.rule == \'mobile\'}"> <vue-frontend-blocks-menu-item v-for="(v, i) in o.items" v-model="v" :mode="mode" tag="li" @click="click(i)" :style="styleMenuItem(i)" :has-icons="hasIcons" :show-icons="o.burger.align != \'center\'"/> <li class="hr" v-if="hasUser" :class="{\'is-hidden-tablet\': o.burger.rule == \'mobile\'}"></li> </div> <div :class="{\'page-container is-paddingless\': (mode == \'view\') && !shrink}" v-if="hasUser" :key="keyComponent"> <li :style="styleMenuItem(ml)"><a @click="editProfile"><figure class="thumb has-title" v-html="thumb(\'tabler/settings\')" :class="userIconsClass" v-if="hasIcons"></figure>{{\'Мой профиль\'|gettext}}</a></li> <li :style="styleMenuItem(ml+1)"><a @click="logout"><figure class="thumb has-title is-logout-icon" v-html="thumb(\'tabler/logout\')" :class="userIconsClass" v-if="hasIcons"></figure>{{\'Выйти\'|gettext}}</a></li> </div> </div> </ul> </div> </div> </div> </div> <div class="max-page-container-xl" v-if="$account.menu.submenu"> <div class="page-container top-panel"> <div class="scrolling-container is-submenu"> <div ref="submenu"> <router-link v-for="m in $account.menu.submenu" :to="m.to" class="button">{{m.title|gettext}}</router-link> </div> </div> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-messenger", {
    data: function () {
      return {
        loading: null,
        values: null,
        v: null,
        defaults: {
          items: [],
          messenger_style: {
            layout: "full",
            shape: "brand",
            design: "brand",
            colors: {
              bg: null,
              text: null,
              icon: null,
            },
          },
        },
      };
    },
    props: {
      options: Object,
      block: Object,
      page_id: Number,
      section: Object,
      theme: Object,
      mode: {
        default: "view",
      },
    },
    mixins: [BlockModel],
    created: function () {
      this.initData(), (this.block.tariff = "plus");
    },
    watch: {
      values: function () {
        this.initData();
      },
    },
    methods: {
      initData: function () {
        this.v = this.values.messenger_style;
      },
      iconPaths: function (e) {
        var t = "";
        if (null != e.ip)
          for (i = 1; i <= e.ip; i++) t += '<span class="p' + i + '"></span>';
        return t;
      },
      click: function (e, t) {
        var n = this;
        this.loading = t.n;
        var i = this.block.stat[t.n].split("."),
          o = [
            {
              event: "taplink:messengers",
              param: i[i.length - 1] + ":" + t.v,
            },
            {
              event: "taplink:messengers:" + i[i.length - 1],
              param: t.v,
            },
          ];
        if (
          ($events.fire("tap", {
            page_id: this.page_id,
            block_id: this.block.block_id,
            slot: this.block.slot[t.n],
            stat: this.block.block_id + "." + this.block.stat[t.n],
            data: o,
            addons:
              null != this.values.data && null != this.values.data[t.n]
                ? this.values.data[t.n]
                : null,
          }),
          $events.fire("messenger", t),
          setTimeout(function () {
            n.loading = "";
          }, 2e3),
          e.target.href == t.link.b || this.$device.isOpera)
        )
          return !0;
        e.preventDefault(), this.$links.deeplink(t.link);
      },
      link: function (e) {
        return "view" == this.mode ? this.$links.application(e.link) : null;
      },
      classname: function (e) {
        return [
          "btn-link is-service-" + e.i,
          "is-layout-" + this.v.layout,
          this.isFlat ? null : "btn-socials",
          "is-shape-" + this.v.shape,
          "is-design-" + this.v.design,
          "full" == this.v.layout ? "btn-link-styled" : null,
        ];
      },
    },
    computed: {
      isFlat: function () {
        return "full" == this.v.layout && "flat" == this.v.shape;
      },
      stylesheet: function () {
        var e = this.section,
          t = (e && e.link && null != e.link.transparent ? e : this.theme).link
            .transparent;
        if ("custom" != this.v.design) return null;
        switch ((100 == t && (t = 0), this.v.shape)) {
          case "icon":
            return {
              "--block-socials-icon-text": this.v.colors.icon,
            };
          default:
            var n = this.v.colors.bg,
              i = this.v.colors.text,
              n =
                n ||
                (e && e.link && e.link.bg ? e.link.bg : null) ||
                this.theme.link.bg,
              i =
                i ||
                (e && e.link && e.link.color ? e.link.color : null) ||
                this.theme.link.color,
              o = ColorsFactory.getColor(n);
            return {
              "--block-link-background": ColorsFactory.getBackground(n, t),
              "--block-link-shadow-color": this.v.colors.shadow
                ? ColorsFactory.transparent(
                    100 -
                      (e && e.link && e.link.shadow && null != e.link.shadow.o
                        ? e.link
                        : this.theme.link
                      ).shadow.o,
                    this.v.colors.shadow
                  )
                : null,
              "--block-link-background-digs": hexToRgb(o),
              "--block-link-border-color": o,
              "--block-link-title-color": i,
            };
        }
      },
    },
    template:
      '<div class="socials" :class="\'is-\'+$account.locale.direction" v-if="v"> <div class="row row-small"> <div :class="{\'col-shrink\': v.layout == \'square\', \'col-xs\': v.layout != \'full\', \'col-xs-12\': v.layout == \'full\'}" v-for="l in values.items"> <component v-bind:is="(mode == \'view\')?\'a\':\'div\'" :href=\'link(l)\' @click="click($event, l)" target="_top" :aria-label="l.t" :class="classname(l)" :style="stylesheet"> <i :class="\'fa fab fa-\'+l.i" v-if="!isFlat" v-html="iconPaths(l)"></i> <div v-if="v.layout == \'full\'" v-html="$typography(l.t, true)" class="btn-link-title"></div> </component> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-music", {
    data: function () {
      return {
        sample: null,
        size: null,
        inited: !1,
        titles: {
          sc: "Sound Cloud",
          pm: "Apple Music",
          ym: "Яндекс.Музыка",
          sp: "Spotify",
          dz: "Deezer",
          bc: "Bandcamp",
          sb: "Сбер Звук",
          mk: "Audiomack",
          an: "Anghami",
          am: "Amazon Music",
          vk: "ВКонтакте",
          yt: "Youtube Music",
          bs: "BeatStars",
          pd: "Pandora",
          bm: "Boom",
          td: "Tidal",
          bp: "Beatport",
        },
        defaults: {
          items: [],
          sample: "",
          size: "m",
        },
      };
    },
    props: ["options", "block"],
    mixins: [BlockModel],
    created: function () {
      this.initData(), (this.block.tariff = "pro");
    },
    mounted: function () {
      var t = this;
      $mx(this.$el).on("lazy-hit", function (e) {
        t.inited = !0;
      });
    },
    watch: {
      values: function () {
        this.initData();
      },
    },
    methods: {
      initData: function () {
        if (((this.sample = ""), !this.values.sample)) return null;
        var e,
          t = {
            sc: [
              {
                s: "https://w.soundcloud.com/player/?url={1}&color=d81946&theme_color=d81946&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&like=false&sharing=false&download=false&buying=false&text_buy_track=false&visual=true",
              },
            ],
            ym: [
              {
                r: /music\.yandex\.(ru|com)\/album\/([0-9]+)\/track\/([0-9]+)/g,
                s: "https://music.yandex.{2}/iframe/#track/{4}/{3}/",
              },
              {
                r: /music\.yandex\.(ru|com)\/users\/([^\/]+)\/playlists\/([0-9]+)/g,
                s: "https://music.yandex.{2}/iframe/#playlist/{3}/{4}",
              },
              {
                r: /music\.yandex\.(ru|com)\/([0-9]+)/g,
                s: "https://music.yandex.{2}/iframe/#album/{3}/",
              },
            ],
            pm: [
              {
                r: /music\.apple\.com\/(.*)/g,
                s: "https://embed.music.apple.com/{2}",
              },
            ],
            sp: [
              {
                r: /\/(track|album|playlist)\/(.*)/g,
                s: "https://open.spotify.com/embed/{2}/{3}",
              },
            ],
            dz: [
              {
                r: /\/(track|album|playlist)\/(.*)/g,
                s: "https://widget.deezer.com/widget/auto/{2}/{3}",
              },
            ],
            sb: [
              {
                r: /\/(track|release|playlist|podcast)\/([0-9]+)/g,
                s: "https://zvuk.com/embed/{2}?id={3}",
              },
            ],
            mk: [
              {
                r: /audiomack\.com\/([^\/]+)\/(album|song|playlist)\/([^\/]+)/g,
                s: "https://audiomack.com/embed/{3}/{2}/{4}?background=1",
              },
            ],
            an: [
              {
                r: /play\.anghami\.com\/(album|song|playlist)\/([^\/]+)/g,
                s: "https://widget.anghami.com/{2}/{3}/?layout=wide",
              },
            ],
            bp: [
              {
                r: /beatport\.com\/(track)\/([^\/]+)\/([0-9]+)/g,
                s: "https://embed.beatport.com/?id={4}&type={2}",
              },
            ],
          },
          i = _.filter(this.values.items, {
            n: this.values.sample,
          })[0],
          o = [t[this.values.sample], i.url],
          s = null,
          r = null != o[0];
        for (j in t[this.values.sample]) {
          if (
            (e =
              null != (s = t[this.values.sample][j]).r ? s.r.exec(o[1]) : null)
          ) {
            for (o[0] = s.s, n = 1; n < e.length; n++) o.push(e[n]);
            break;
          }
          null == s.r && (o[0] = s.s);
        }
        var a;
        r
          ? ("p" == (a = i.t) && (a = "a"),
            (this.sample = this.$format.apply(null, o)),
            (this.size = {
              sc: {
                t: {
                  s: 300,
                  m: 450,
                  l: 600,
                },
                a: {
                  s: 300,
                  m: 450,
                  l: 600,
                },
              },
              ym: {
                t: {
                  s: 240,
                  m: 240,
                  l: 320,
                },
                a: {
                  s: 240,
                  m: 450,
                  l: 600,
                },
              },
              pm: {
                t: 150,
                a: 450,
              },
              sp: {
                t: 80,
                a: 380,
              },
              dz: {
                t: {
                  s: 70,
                  m: 120,
                  l: 240,
                },
                a: {
                  s: 240,
                  m: 450,
                  l: 600,
                },
              },
              sb: {
                t: 240,
                a: 450,
                c: 450,
              },
              mk: {
                t: 252,
                a: 400,
              },
              bp: {
                t: 162,
              },
            }[this.values.sample][a]),
            _.isObject(this.size) && (this.size = this.size[this.values.size]))
          : (this.sample = this.size = null);
      },
      empty: function (e) {
        return e.b ? e.b : this.$gettext("Слушать");
      },
    },
    template:
      '<div class="lazy"> <iframe width="100%" :height="size" scrolling="no" frameborder="no" :src="sample" v-if="sample && inited" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" allow="autoplay *; encrypted-media *; fullscreen *"></iframe> <a v-for="f in values.items" class="music-source" v-if="!sample || (sample && values.items.length> 1)" target="_blank" :href="f.url"> <div><span :class="\'btn-socials is-shape-circle-fill is-design-brand is-service-\'+f.n"><i :class="\'fa fab fa-\'+f.n"></i></span><span class="t">{{titles[f.n]}}</span></div> <span class="button" v-html="empty(f)"></span> </a> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-pictures", {
    data: function () {
      return {
        defaults: {
          picture_size: "1:1",
          cols: 1,
          options: {
            text: 0,
            link: 0,
            mode: "button",
          },
          bg: null,
          placement: "cover",
          indicator: {
            placement: "outside",
            style: "dots",
          },
        },
        zoomActived: !1,
        scaleWidth: 100,
        pinchCenter: null,
        pinchCenterOffset: null,
        lastX: 0,
        lastY: 0,
        imgWidth: 0,
        imgHeight: 0,
        viewportWidth: 0,
        viewportHeight: 0,
        curWidth: 0,
        curHeight: 0,
        scale: 1,
        lastScale: 1,
        x: 0,
        y: 0,
        index: 0,
        navOffsetTop: null,
        loading: "",
      };
    },
    props: {
      options: Object,
      block: Object,
      page_id: Number,
      theme: Object,
      mode: {
        default: "view",
      },
      allowZoom: Boolean,
    },
    mixins: [BlockModel],
    created: function () {
      $mx(window).on("resize", this.checkScaleHeight);
    },
    watch: {
      "options.list": {
        handler: function (e) {
          e.length <= this.index && this.$refs.slider.moveSlide(e.length - 1),
            this.checkAspectRatio();
        },
        deep: !0,
      },
    },
    mounted: function () {
      var e = this;
      this.checkAspectRatio(),
        this.checkScaleHeight(),
        setTimeout(function () {
          e.checkScaleHeight();
        }, 350);
    },
    beforeDestroy: function () {
      $mx(window).off("resize", this.checkScaleHeight);
    },
    computed: {
      isBannerMode: function () {
        return "banner" == this.values.options.mode;
      },
      zoomStyles: function () {
        var e = 0,
          t = 0,
          n = 0,
          i = 0;
        return (
          this.imgHeight * this.scale <= this.viewportHeight &&
            ((e = 0 - this.imgHeight / 2), (n = "calc(var(--vh)*50)")),
          this.imgWidth * this.scale <= this.viewportWidth &&
            ((t = 0 - this.imgWidth / 2), (i = "50vw")),
          {
            marginTop: n,
            marginLeft: i,
            width: window.innerWidth + "px",
            transform:
              "scale(" +
              this.scale +
              ") translateX(" +
              (this.x + t) +
              "px) translateY(" +
              (this.y + e) +
              "px)",
            "transform-origin": "left top",
          }
        );
      },
    },
    methods: {
      checkAspectRatio: function () {
        if ("auto" == this.options.picture_size) {
          var t = 0,
            n = 0,
            e = this.options.list;
          if (!e.length) return;
          _.each(e, function (e) {
            e && e.p && ((t += e.p.width), (n += e.p.height));
          });
          var i = t / n,
            o = (Number.MAX_VALUE, 1),
            s = 1;
          1 <= i ? (s = (o = t / e.length) / i) : (o = (s = n / e.length) * i),
            1.2 < s / o && (s = 1.2 * o),
            (this.values.picture_size = o + ":" + s);
        }
      },
      isLoading: function (e) {
        return (
          "view" == this.mode &&
          null != this.block.stat &&
          this.loading == this.block.stat[e]
        );
      },
      isExternal: function (e) {
        return -1 != ["link", "phone", "email", ""].indexOf(e.type);
      },
      link: (function (t) {
        function e(e) {
          return t.apply(this, arguments);
        }
        return (
          (e.toString = function () {
            return t.toString();
          }),
          e
        );
      })(function (e) {
        return "view" == this.mode ? this.$links.resolve(e) : null;
      }),
      click: function (e, t) {
        var n,
          i = this;
        "edit" != this.mode &&
          ((this.loading = null != this.block.stat ? this.block.stat[t] : null),
          (n = this.$links.resolve(e.link)),
          (n = _.isObject(n) ? this.$router.resolve(n).href : n),
          this.block.block_id &&
            window.$events.fire("tap", {
              page_id: this.page_id,
              block_id: this.block.block_id,
              slot: t,
              stat: this.block.block_id + "." + this.block.stat[t],
              data: [
                {
                  event: "taplink:pictures",
                  param: n,
                },
              ],
            }),
          this.isExternal(e.link) && (document.location = this.link(e.link)),
          setTimeout(function () {
            i.loading = "";
          }, 2e3));
      },
      bannerClick: function () {
        this.allowZoom &&
          ((this.zoomActived = !0),
          (this.x = this.y = 0),
          this.checkScaleHeight(),
          (this.lastScale = this.scale = this.scaleWidth));
      },
      checkScaleHeight: function () {
        var e,
          t = this;
        this.zoomActived &&
          ((e =
            (window.innerWidth / 100) *
            (null != this.values.aspect_ratio
              ? 100 * this.values.aspect_ratio
              : this.values.picture_size)),
          (this.scaleWidth =
            e > window.innerHeight ? window.innerHeight / e : 0.95),
          this.$nextTick(function () {
            var e = $mx(t.$refs.preview);
            (t.imgWidth = e.width()),
              (t.imgHeight = e.height()),
              (t.viewportWidth = window.innerWidth),
              (t.viewportHeight = window.innerHeight),
              (t.curWidth = t.imgWidth * t.scale),
              (t.curHeight = t.imgHeight * t.scale);
          })),
          (this.navOffsetTop = $mx(this.$el)
            .find(".slider-slide.active .picture-container")
            .height());
      },
      updateLastScale: function () {
        this.lastScale = this.scale;
      },
      updateLastPos: function () {
        (this.lastX = this.x), (this.lastY = this.y);
      },
      restrictScale: function (e) {
        return Math.max(this.scaleWidth, Math.min(8, e));
      },
      translate: function (e, t) {
        var n = this.restrictRawPos(
            this.lastX + e / this.scale,
            Math.min(this.viewportWidth, this.curWidth) / this.scale,
            this.imgWidth
          ),
          i = this.restrictRawPos(
            this.lastY + t / this.scale,
            Math.min(this.viewportHeight, this.curHeight) / this.scale,
            this.imgHeight
          );
        (this.x = n), (this.y = i);
      },
      restrictRawPos: function (e, t, n) {
        return e < t - n ? (e = t - n) : 0 < e && (e = 0), e;
      },
      zoomPan: function (e) {
        this.translate(e.deltaX, e.deltaY);
      },
      zoomPanEnd: function () {
        this.updateLastPos();
      },
      zoomPinchend: function () {
        this.updateLastScale(), this.updateLastPos(), (this.pinchCenter = null);
      },
      zoomClose: function () {
        this.zoomActived = !1;
      },
      zoomReset: function (e) {
        var t = this.rawCenter(e);
        this.zoomAround(2, t.x, t.y);
      },
      zoomWheel: function (e) {
        var t = e.deltaY || e.detail || e.wheelDelta;
        (e.scale = 1 + 0.05 * (0 < t ? -1 : 1)),
          (e.center = {
            x: e.clientX,
            y: e.clientY,
          }),
          this.zoomPinch(e),
          this.zoomPinchend();
      },
      zoomPinch: function (e) {
        var t, n;
        null === this.pinchCenter &&
          ((this.pinchCenter = this.rawCenter(e)),
          (t =
            this.pinchCenter.x * this.scale -
            (-this.x * this.scale +
              Math.min(this.viewportWidth, this.curWidth) / 2)),
          (n =
            this.pinchCenter.y * this.scale -
            (-this.y * this.scale +
              Math.min(this.viewportHeight, this.curHeight) / 2)),
          (this.pinchCenterOffset = {
            x: t,
            y: n,
          }));
        var i = this.restrictScale(this.scale * e.scale),
          o = {
            x: (this.pinchCenter.x * i - this.pinchCenterOffset.x) / i,
            y: (this.pinchCenter.y * i - this.pinchCenterOffset.y) / i,
          };
        this.zoomAround(e.scale, o.x, o.y, !0);
      },
      rawCenter: function (e) {
        var t = $mx(this.$refs.container).offset(),
          n = window.pageXOffset
            ? window.pageXOffset
            : document.body.scrollLeft,
          i = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
        return {
          x: -this.x + (e.center.x - t.left + n) / this.scale,
          y: -this.y + (e.center.y - t.top + i) / this.scale,
        };
      },
      zoomDo: function (e) {
        (this.scale = this.restrictScale(this.lastScale * e)),
          (this.curWidth = this.imgWidth * this.scale),
          (this.curHeight = this.imgHeight * this.scale),
          this.translate(0, 0);
      },
      zoomAround: function (e, t, n, i) {
        this.zoomDo(e);
        var o =
            -this.x +
            Math.min(this.viewportWidth, this.curWidth) / 2 / this.scale,
          s =
            -this.y +
            Math.min(this.viewportHeight, this.curHeight) / 2 / this.scale,
          r = (o - t) * this.scale,
          a = (s - n) * this.scale;
        this.translate(r, a),
          i || (this.updateLastScale(), this.updateLastPos());
      },
      stylesheetPicture: function (e, t) {
        var n = 1 < arguments.length && void 0 !== t && t;
        if (e) {
          var i = 100;
          if (null != this.values.aspect_ratio)
            i = 100 * this.values.aspect_ratio;
          else {
            if (
              ((i = this.values.picture_size.toString()),
              -1 != ["50", "70", "100", "138"].indexOf(i))
            )
              switch (i) {
                case "50":
                  i = "2:1";
                  break;
                case "100":
                  i = "1:1";
                  break;
                case "70":
                  i = "620x438";
                  break;
                case "138":
                  i = "620x877";
              }
            (i = i.replace("x", ":").split(":")),
              (i = (parseInt(i[1]) / parseInt(i[0])) * 100);
          }
          var o = this.urlPicture(e, !1),
            i = {
              "padding-top": i + "%",
            };
          return (
            (("view" != this.mode && o) || n) &&
              (i["background-image"] = "url(" + o + ")"),
            (this.values.bg || (e.p && e.p.color)) &&
              (i["--block-pictures-picture-background"] =
                (e.p ? e.p.color : null) || this.values.bg),
            i
          );
        }
      },
      urlPicture: function (e, t) {
        return (!t || "edit" != this.mode) && (e.picture || e.p)
          ? e.p.link
            ? e.p.link
            : "//" +
              this.$account.storage_domain +
              "/p/" +
              (null == e.picture ? e.p.filename : e.picture)
          : null;
      },
    },
    template:
      '<div> <vue-frontend-blocks-slider :options="values" :block="block" :theme="theme" :page_id="page_id" :mode="mode" :allowZoom="allowZoom" :index.sync="index" @bannerClick="bannerClick" :container-classes="{\'slider-has-text\': this.values.options.text, \'slider-has-link\': this.values.options.link && (this.values.options.mode == \'button\')}" :is-banner-mode="isBannerMode" :nav-offset-top="navOffsetTop" ref="slider"> <template v-slot:default="{f, i, isFetching}"> <div class="picture-container lazy" :class="[{skeleton: f.isFetching, \'picture-container-empty\': !f.p, \'loading-overlay is-active\': isFetching}, \'picture-\'+values.placement]" :style="stylesheetPicture(f)" :data-src="urlPicture(f, true)"> <div class="loading-icon" v-if="isFetching"></div> </div> <div class="slider-slide-text" v-if="values.options.text"> <div class="slider-slide-title" v-if="f.t" v-html="$typography(f.t, true)" :class="{skeleton: f.isFetching}"></div> <div class="slider-slide-title" v-else>{{\'Заголовок\'|gettext}}</div> <div class="slider-slide-snippet" v-if="f.s" v-html="$typography(f.s, true)"></div> </div> <component v-bind:is="(mode == \'view\')?\'a\':\'block\'" v-if="values.options.link && (isExternal(f.link) || (mode == \'edit\'))" class="button slider-slide-link" :class="{\'is-loading\': isLoading(i)}" rel="noopener" target="_top" :href=\'link(f.link)\' @click.prevent="click(f, i)">{{f.link.title|nvl($gettext(\'Открыть\'))}}</component> <router-link v-else-if="values.options.link" class="button slider-slide-link" :class="{\'is-loading\': isLoading(i)}" rel="noopener" :to=\'link(f.link)\' @click.native="click(f, i)">{{f.link.title|nvl($gettext(\'Открыть\'))}}</router-link> </template> </vue-frontend-blocks-slider> <div class="pan-zooming-background" :class="{in: zoomActived}" ref="container" v-hammer:tap="zoomClose"> <div :style="zoomStyles" ref="preview" v-hammer:pinch="zoomPinch" v-hammer:pan="zoomPan" v-hammer:panend="zoomPanEnd" v-hammer:pinchend="zoomPinchend" @wheel="zoomWheel"> <div :style="stylesheetPicture(values.list[index], true)" :class="\'picture-\'+values.placement" style="background-color: transparent"></div> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-pricing", {
    data: function () {
      return {
        defaults: {
          fields: [],
          styles: {
            text_size: "md",
          },
        },
      };
    },
    props: ["options", "block"],
    mixins: [BlockModel],
    created: function () {
      this.block.tariff = "pro";
    },
    computed: {
      styleText: function () {
        return FontsFactory.getTextStyles(this.values.styles.text_size);
      },
    },
    methods: {
      prepareText: function (n) {
        return (
          (n = (n || this.$gettext("Без имени")).split("\n")),
          _.map(n, function (e, t) {
            return {
              p: e
                .trim()
                .replace(/[ ]{2,}/g, " ")
                .split(" "),
              d: t == n.length - 1,
            };
          })
        );
      },
    },
    template:
      '<ul class="block-pricing" :style="styleText"> <li v-for="f in values.fields"> <div> <div v-for="r in prepareText(f.title)"> <span v-for="s in r.p">{{s}} </span> <span class="dotted" v-if="r.d"></span> </div> </div> <span v-if="f.value">{{f.value}}</span> <span v-else>{{$nvl(f.price, 0)|currency}}</span> </li> </ul>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-added",
    {
      props: ["done"],
      methods: {
        toBasket: function () {
          this.done(), this.$parent.close();
        },
      },
      template:
        '<div class="modal-card modal-card-little" style="justify-content: flex-end;padding: 0"> <section class="modal-card-body"> <div class="media"> <div class="media-left" style="align-self: center"> <div class="sa-icon sa-success animate" style="display: block;"> <span class="sa-line sa-tip animateSuccessTip"></span> <span class="sa-line sa-long animateSuccessLong"></span> <div class="sa-placeholder"></div> <div class="sa-fix"></div> </div> </div> <div class="media-content" style="align-self: center"> <h2>{{\'Товар добавлен в корзину\'|gettext}}</h2> </div> </div> <button class="button is-medium is-fullwidth is-primary has-mb-2" @click="toBasket">{{\'Перейти в корзину\'|gettext}}</button> <button class="button is-medium is-fullwidth is-secondary" @click="$parent.close">{{\'Продолжить покупки\'|gettext}}</button> </section> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-breadcrumbs",
    {
      data: function () {
        return {
          step: 0,
          defaults: {
            colors: {
              bg: {
                active: null,
                inactive: null,
              },
              text: {
                active: null,
                inactive: null,
              },
            },
            border: {
              width: 2,
              color: null,
            },
            size: "sm",
          },
        };
      },
      props: ["options", "page_id", "block"],
      mixins: [BlockModel],
      created: function () {
        (this.block.tariff = "business"),
          window.$events.on("products:stepchanged", this.stepChanged);
      },
      beforeDestroy: function () {
        window.$events.off("products:stepchanged", this.stepChanged);
      },
      computed: {
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        items: function () {
          return [
            {
              title: this.$gettext("Корзина"),
            },
            {
              title: this.$gettext("Контакты"),
            },
            {
              title: this.$gettext("Подтверждение"),
            },
          ];
        },
      },
      watch: {
        step: function (e) {
          window.$events.fire("products:stepchanged", {
            step: e,
          });
        },
      },
      methods: {
        stepChanged: function (e, t) {
          this.step = t.step;
        },
      },
      template:
        '<vue-frontend-blocks-breadcrumbs :items="items" :options="o" :active.sync="step"/>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-checkout",
    {
      data: function () {
        return {
          step: 0,
          cart: null,
          fields: null,
          fields_footer: null,
          shipping: null,
          discounts: [],
          amount_issues: {},
          hasPromocodes: !1,
          confirm: null,
          button: null,
          isFetching: !1,
          contacts: {},
          errors: {},
          failed: null,
          defaults: {
            amount: {
              colors: {
                bg: null,
                button: {
                  bg: null,
                  text: null,
                },
              },
            },
          },
        };
      },
      props: ["options", "page_id", "block", "data", "theme", "mode"],
      mixins: [BlockModel],
      mounted: function () {
        $events.on("products:stepchanged", this.stepChanged),
          this.initData(
            this.data
              ? this.data
              : {
                  amount_issues: {
                    2: 2,
                  },
                  cart: {
                    1: {
                      amount: 1,
                      title: "Товар 1",
                      subtitles: ["Размер: XL"],
                      price: 100,
                      product_id: 1,
                      is_active: 1,
                    },
                    2: {
                      amount: 3,
                      title: "Товар 2",
                      subtitles: ["Цвет: черный"],
                      price: 100,
                      product_id: 2,
                      is_active: 1,
                    },
                  },
                  discounts: [],
                  has_promocodes: 0,
                }
          );
      },
      watch: {
        step: function () {
          this.$actionbar.buttons.checkout.title = this.checkoutButtonTitle;
        },
        isFetching: function (e) {
          "view" == this.mode && (this.$actionbar.buttons.checkout.loading = e);
        },
        cart: {
          handler: function () {
            "view" == this.mode &&
              (this.$actionbar.buttons.checkout.disabled =
                this.checkoutButtonDisabled);
          },
          deep: !0,
        },
      },
      beforeDestroy: function () {
        $events.off("products:stepchanged", this.stepChanged);
      },
      computed: {
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        styleColors: function () {
          var e = this.o.amount.colors;
          return {
            "--block-storefront-checkout-amount-bg": e.bg,
            "--block-storefront-checkout-amount-button-bg": e.button.bg,
            "--block-storefront-checkout-amount-button-text": e.button.text
              ? e.button.text
              : e.button.bg
              ? isLightColor(e.button.bg)
                ? "#000"
                : "#fff"
              : null,
          };
        },
        discountValue: function () {
          var o = this,
            s = 0,
            r = [],
            a = !1;
          return (
            _.each(this.discounts, function (n) {
              var e;
              if (!a)
                switch (n.profit) {
                  case "free_shipping":
                    break;
                  default:
                    switch (n.profit_apply) {
                      case "order":
                        var t = Math.pow(10, o.$account.currency.precision);
                        "percentage" == n.profit
                          ? ((s += _.sumBy(o.cart, function (e, t) {
                              return -1 == r.indexOf(e.id)
                                ? (r.push(e.id),
                                  ((e.amount *
                                    (n.apply_options
                                      ? e.price
                                      : e.price_offer)) /
                                    100) *
                                    n.profit_value)
                                : 0;
                            })),
                            (e = s),
                            (s = Math.round(e * t) / t))
                          : n.profit_value && ((s = n.profit_value), (a = !0));
                        break;
                      case "offers":
                        var i = n.profit_offers;
                        s += _.sumBy(o.cart, function (e, t) {
                          return null != i[e.id] && -1 == r.indexOf(e.id)
                            ? (r.push(e.id),
                              e.amount *
                                Math.max(
                                  0,
                                  (n.apply_options ? e.price : e.price_offer) -
                                    i[e.id]
                                ))
                            : 0;
                        });
                    }
                }
            }),
            s
          );
        },
        shippingPrice: function () {
          for (i in this.discounts) {
            if ("free_shipping" == this.discounts[i].profit) return 0;
          }
          return this.confirm.shipping.price;
        },
        total_compare: function () {
          return _.sumBy(this.cart, function (e) {
            return (
              (e.price_compare &&
              0 < e.price_compare &&
              e.price_compare > e.price
                ? e.price_compare
                : e.price) * e.amount
            );
          });
        },
        total: function () {
          return _.sumBy(this.cart, function (e) {
            return e.price * e.amount;
          });
        },
        title_zones: function () {
          return null != this.shipping.title_zones && this.shipping.title_zones
            ? this.shipping.title_zones
            : this.$gettext("Другие страны");
        },
        isSelfservice: function () {
          return (
            "" != this.fields.shipping_method.value &&
            0 == this.fields.shipping_method.value.indexOf("selfservice:")
          );
        },
        userShipping: function () {
          return (
            1 < this.shipping.amount_methods ||
            (1 == this.shipping.amount_methods && !this.shipping.use_zones)
          );
        },
        isAllowAction: function () {
          switch (this.step) {
            case 0:
              return (
                this.cart &&
                this.cart.length &&
                _.sum(this.cart, "is_active") == this.cart.length &&
                0 == _.size(this.amount_issues)
              );
            case 1:
              return (
                0 == Object.keys(this.errors).length &&
                0 < _.size(this.fields) &&
                null == this.failed
              );
            case 2:
              return !0;
          }
        },
        checkoutButtonTitle: function () {
          return [
            this.$gettext("Оформить заказ"),
            this.$gettext("Подтвердить"),
            this.button,
          ][this.step];
        },
        checkoutButtonDisabled: function () {
          return (
            !this.isAllowAction ||
            (null != this.$account.readonly && this.$account.readonly)
          );
        },
      },
      methods: {
        amountError: function (e) {
          return null == this.amount_issues[e.id] && e.is_active
            ? null
            : e.is_active
            ? null != this.amount_issues[e.id]
              ? this.amount_issues[e.id]
                ? this.$gettext("В наличии") +
                  " " +
                  this.amount_issues[e.id] +
                  " " +
                  this.$gettext("шт.")
                : this.$gettext("Нет в наличии")
              : void 0
            : this.$gettext("Не доступно для продажи");
        },
        hasError: function (e) {
          return !e.is_active || null != this.amount_issues[e.id];
        },
        setStep: function (e) {
          this.step != e &&
            ((this.errors = []),
            (this.failed = null),
            (this.step = e),
            window.$events.fire("products:stepchanged", {
              step: this.step,
            }),
            1 == e &&
              $events.fire("initiateCheckout", {
                value: this.total - this.discountValue,
              }));
        },
        stepChanged: function (e, t) {
          this.setStep(t.step);
        },
        openPromocodeForm: function () {
          this.$modal("vue-frontend-blocks-products-promocode-form", {
            apply: this.setDiscounts,
          });
        },
        clearPromocode: function () {
          var t = this;
          this.$api.get("market/checkout/clearpromocode").then(function (e) {
            "success" == e.result && t.setDiscounts(e.response.discounts);
          });
        },
        setDiscounts: function (e) {
          this.discounts = e;
        },
        checkFieldDepends: function (e) {
          return (
            null != this.fields[e.depends_name] &&
            -1 != e.depends_value.indexOf(this.fields[e.depends_name].value)
          );
        },
        amountFilter: function (e) {
          var t = e.which ? e.which : e.keyCode;
          (t < 48 || 57 < t) && e.preventDefault();
        },
        amountFilterCheck: function (e) {
          e.amount = "" === e.amount ? 0 : parseInt(e.amount);
        },
        amountBlur: function (e, t) {
          e.amount || this.cart.splice(t, 1), this.updateCart();
        },
        amountChange: function (e, t, n) {
          (e.amount += n), this.amountBlur(e, t);
        },
        updateCart: function () {
          var t = this;
          (this.$actionbar.info.basket.products = {}),
            _.each(this.cart, function (e) {
              t.$actionbar.info.basket.products[e.id] = e.amount;
            }),
            this.$actionbar.pack(),
            this.updateDiscount();
        },
        fetchData: function () {
          var t = this;
          this.$api.get("market/checkout/check", {}).then(function (e) {
            "success" == e.result && Object.assign(t, e.response);
          });
        },
        updateDiscount: _.debounce(function () {
          this.fetchData();
        }, 500),
        initData: function (e) {
          var n = this;
          (this.cart = _.map(e.cart, function (e, t) {
            return (
              (e.id = t),
              (e.link = {
                name: "part",
                params: {
                  page_filename: e.product_id.toString(16),
                  part: "o",
                },
              }),
              (e.style = e.picture
                ? "background-image:url(//" +
                  n.$account.storage_domain +
                  "/p/" +
                  e.picture +
                  ")"
                : ""),
              (e.subtitles = null != e.subtitles ? e.subtitles.join(", ") : ""),
              e
            );
          })),
            (this.discounts = e.discounts),
            (this.amount_issues = e.amount_issues),
            (this.hasPromocodes = e.has_promocodes),
            "view" == this.mode &&
              this.$actionbar.setButtons([
                {
                  name: "back",
                  title: this.$gettext("Вернуться в каталог"),
                  click: this.backToCatalog,
                  buttonClass: "is-default product-back-catalog",
                  icon: "fai fa-th",
                  shrink_mobile: !0,
                  icon_hidden_mobile: !0,
                  disabled: !1,
                },
                {
                  name: "checkout",
                  title: this.checkoutButtonTitle,
                  click: this.marketAction,
                  buttonClass: "is-primary",
                  disabled: this.checkoutButtonDisabled,
                },
              ]);
        },
        backToCatalog: function () {
          var e = this.$router.currentRoute;
          "part.index" == e.name && "m" == e.params.part
            ? this.$router.back()
            : this.$router.push({
                name: "part.index",
                params: {
                  part: "m",
                },
              });
        },
        marketAction: function () {
          var n = this;
          if (null != window.fbq)
            switch (this.data.step) {
              case 0:
                $events.fire("openCart");
            }
          switch (this.step) {
            case 0:
              (this.isFetching = !0),
                (this.errors = []),
                (this.failed = null),
                this.$api
                  .get("market/checkout/checkout", {})
                  .then(function (e) {
                    var t;
                    n.setStep(n.step + 1),
                      "success" == e.result
                        ? ((t = e.response),
                          (n.fields = t.fields),
                          (n.fields_footer = t.fields_footer),
                          (n.shipping = t.shipping))
                        : n.checkResult(e),
                      (n.isFetching = !1);
                  });
              break;
            case 1:
              (this.$actionbar.buttons.checkout.loading = !1),
                this.$refs.submit.click();
              break;
            case 2:
              (this.isFetching = !0),
                this.$api
                  .post("market/checkout/pay", {
                    params: {
                      fields: this.contacts,
                    },
                  })
                  .then(function (e) {
                    "success" == e.result
                      ? (window.$events.fire("lead", {
                          lead_id: e.response.lead_id,
                        }),
                        null != e.response.redirect
                          ? (window.top.location = e.response.redirect)
                          : n.checkResult(e))
                      : n.checkResult(e);
                  });
          }
        },
        getFields: function () {
          var e = [this.$refs.fields1, this.$refs.fields2, this.$refs.fields3],
            t = {
              addons: {},
            };
          if (
            (_.each(this.shipping.addons, function (e) {
              t.addons[e.value] = _.clone(e.fields);
            }),
            this.shipping.is_active)
          ) {
            if (
              (!this.userShipping &&
                this.shipping.use_zones &&
                (this.fields.shipping_method.value = "zones"),
              this.userShipping && !this.fields.shipping_method.value)
            )
              return void alert(
                this.$gettext("Необходимо выбрать метод доставки")
              );
            null != this.fields.shipping_method &&
              (t.shipping_method = {
                value: this.fields.shipping_method.value,
              });
          }
          for (var n = 0; n <= 2; n++)
            if (null != e[n]) {
              var i = e[n].getFields();
              if (!i) {
                t = null;
                break;
              }
              t = Object.assign(t, i);
            }
          return t;
        },
        submitCheckout: function () {
          var t = this;
          (this.contacts = this.getFields()),
            this.contacts &&
              ((this.isFetching = !0),
              (this.errors = []),
              (this.failed = null),
              this.$api
                .post("market/checkout/confirm", {
                  params: {
                    fields: this.contacts,
                  },
                })
                .then(function (e) {
                  "success" == e.result
                    ? ((t.confirm = e.response),
                      (t.button = e.response.button),
                      t.setStep(t.step + 1))
                    : t.checkResult(e),
                    (t.isFetching = !1);
                }));
        },
        checkResult: function (e) {
          (this.errors = e.errors || []),
            (this.failed = e.failed || null),
            (this.isFetching = !1),
            "recheck" == e.result && (this.setStep(0), this.fetchData()),
            "empty" == e.result &&
              (this.$actionbar.init(),
              this.$router.replace({
                name: "catalog",
              }));
        },
      },
      template:
        '<div class="block-storefront-cart"> <div class="message is-danger is-marginless" style="font-size: 1.9em !important;" v-if="failed"> <div class="message-body">{{failed}}</div> </div> <div class="block-item" v-if="step == 0"> <div class="has-pt-2 has-pb-2" v-if="isFetching"> <div class="loading-overlay loading-block is-active"><div class="loading-icon"></div></div> </div> <div v-else> <div class="has-p-2 block-text" v-if="!cart || cart.length == 0"> <div class="border-vertical has-text-centered">{{\'Корзина пуста\'|gettext}}</div> </div> <div class="block-text has-rtl products-cart" :style="styleColors" v-else> <div class="row row-small" v-for="(f, k) in cart"> <div class="col-sm-1 col-xs-3"><div class="has-text-centered" style="width:100%"><router-link :to="f.link" class="product-container-outer slider-has-border"><div class=\'product-container\' :class="{\'product-container-empty\': !f.picture}" :style="f.style"></div></router-link></div></div> <div class="col-sm-11 col-xs-9"> <div class="row row-small"> <div class="col-sm col-xs-12 has-xs-mb-1"><router-link :to="f.link" style="line-height: 1;display: inline-block">{{f.title}}</router-link><div v-if="f.subtitles" style="font-size: 70%;opacity: .5">{{f.subtitles}}</div></div> <div class="col-sm col-sm-shrink col-xs-5"> <div class="field"> <span class="control" style="display: block"> <div class="field field-amount" :class="{\'has-addons\': hasError(f) || !isTransparentColor(o.amount.colors.bg), error: hasError(f)}" :data-error="amountError(f)"> <span class="control"><button class="button" @click="amountChange(f, k, -1)"><i class="fai fa-minus"></i></button></span> <span class="control"><input type=\'number\' class="input skip-enter" v-model="f.amount" min="0" max="999999" @keypress="amountFilter" @keyup="amountFilterCheck(f)" @blur="amountBlur(f, k)"></span> <span class="control"><button class="button" @click="amountChange(f, k, 1)"><i class="fai fa-plus"></i></button></span> </div> </span> </div> </div> <div class="col-sm-2 col-md-3 col-lg-2 col-xs-7 has-text-nowrap has-text-right"><div class="has-text-right" style="width:100%"> <div v-if="f.price_compare && f.price_compare> f.price" style="font-size: 70%;opacity: .2;height: 0 !important;position: relative;"><span class="strikethrough" style="position: absolute;right: 0;top: -15px;">{{f.price_compare*f.amount|currency}}</span></div> {{f.price*f.amount|currency}} </div></div> </div> </div> </div> <vue-frontend-market-discount @openPromocodeForm="openPromocodeForm" @clearPromocode="clearPromocode" :hasPromocodes="hasPromocodes" :discountValue="discountValue" :discounts="discounts" v-if="hasPromocodes || discounts.length"/> <div class="row row-small"> <div class="col-md-3 col-lg-3 col-xs-5"><div class="text-xs-left" style="width:100%;">{{\'Итого\'|gettext}}:</div></div> <div class="col-md-9 col-lg-9 col-xs-7"><div class="has-text-right has-text-nowrap" style="width:100%;"> {{total - discountValue|currency}} </div></div> </div> </div> </div> </div> <div class="block-item" v-if="step == 1"> <form @submit.prevent="submitCheckout" class="block-form has-rtl" :class="\'has-form-\'+theme.form.style" v-if="_.size(fields)> 0"> <button type="submit" ref=\'submit\' style="display: none"></button> <vue-frontend-form-elements :fields="fields" v-if="fields" ref=\'fields1\' :is-loading="isFetching"/> <div v-if="shipping && shipping.is_active"> <div v-if="userShipping"> <div class="form-field"> <label class="label">{{\'Доставка\'|gettext}}<sup class="required">*</sup></label> <div class="radio-list"> <label class="radio is-block" v-if="shipping.use_selfservice" v-for="(c, i) in shipping.shipping"> <input type="radio" name="dvField" :value="\'selfservice:{1}\'|format(i)" v-model="fields.shipping_method.value" required=\'on\' :disabled="isFetching"> {{\'Самовывоз\'|gettext}} <span v-if="c.full" style="opacity: .5;padding-left: 8px">({{c.full}})</span> </label> <div v-for="(method, i) in shipping.addons" style="margin-top: .5rem"> <label class="radio is-block"> <input type="radio" name="dvField" :value="method.value" v-model="fields.shipping_method.value" required=\'on\' :disabled="isFetching"> {{method.title}} </label> </div> <label class="radio is-block" v-if="method.on" v-for="method in shipping.custom"> <input type="radio" name="dvField" :value="method.value" v-model="fields.shipping_method.value" required=\'on\' :disabled="isFetching"> {{method.title}} <span style="opacity: .5;padding-left: 8px">({{method.price|currency}})</span> </label> <label class="radio is-block" v-if="shipping.use_zones"> <input type="radio" name="dvField" value="zones" v-model="fields.shipping_method.value" required=\'on\' :disabled="isFetching"> {{title_zones}} </label> </div> </div> </div> <component :is="\'vue-frontend-addons-\'+a.value+\'-shipping-field\'" :ref="\'addon\'+i" v-for="(a, i) in shipping.addons" v-show="fields.shipping_method.value == a.value" v-model="a.fields"/> <vue-frontend-form-elements ref=\'fields2\' :errors="errors" :fields="shipping.fields" :checkDepends="checkFieldDepends" :is-loading="isFetching" v-if="!isSelfservice && fields.shipping_method.value"/> </div> <vue-frontend-form-elements ref=\'fields3\' :fields="fields_footer" v-if="fields_footer" :is-loading="isFetching"/> </form> <div v-else> <div class="message is-danger"> <div class="message-body has-text-centered">{{\'В магазине не настроены опции оформления заказа\'}}</div> </div> </div> </div> <div class="block-item" v-if="step == 2"> <div class="block-text has-rtl products-cart" :style="styleColors"> <div class="row row-small" v-for="(f, k) in cart"> <div class="col-sm-1 col-xs-3"><div class="has-text-centered" style="width:100%"><router-link :to="f.link" class="product-container-outer slider-has-border"><div class=\'product-container\' :class="{\'product-container-empty\': !f.picture}" :style="f.style"></div></router-link></div></div> <div class="col-sm-11 col-xs-9"> <div class="row row-small"> <div class="col-sm col-xs-12 has-xs-mb-1"><router-link :to="f.link">{{f.title}}</router-link><div v-if="f.subtitles" style="font-size: 70%;opacity: .5">{{f.subtitles}}</div></div> <div class="col-sm-2 col-xs-5"> {{f.amount|number}} {{\'шт.\'|gettext}} </div> <div class="col-sm-3 col-md-3 col-lg-2 col-xs-7 has-text-nowrap has-text-right"><div class="has-text-right" style="width:100%"> {{f.price*f.amount|currency}} </div></div> </div> </div> </div> <div class="row row-small"> <div class="col-sm-1 col-xs-3" style="line-height: 0"><div class="product-container-outer slider-has-border"><div class="product-container fa fai fa-user"></div></div></div> <div class="col-sm col-xs-9">{{\'Контакты\'|gettext}}<div style="font-size: 70%;opacity: .5">{{confirm.contacts}}</div></div> </div> <div class="row row-small" v-if="confirm.shipping.is_active"> <div class="col-sm-1 col-xs-3" style="line-height: 0"><div class="product-container-outer slider-has-border"><div class="product-container fa fai fa-truck"></div></div></div> <div class="col-sm-11 col-xs-9"> <div class="row row-small"> <div class="col-sm col-xs-8">{{\'Доставка\'|gettext}}<div style="font-size: 70%;opacity: .5">{{confirm.shipping.details}}</div></div> <div class="col-sm-3 col-xs-4 has-text-nowrap has-text-right"> {{shippingPrice|currency}} </div> </div> </div> </div> <vue-frontend-market-discount @openPromocodeForm="openPromocodeForm" @clearPromocode="clearPromocode" :hasPromocodes="hasPromocodes" :discountValue="discountValue" :discounts="discounts" v-if="hasPromocodes || discounts.length"/> <div class="row row-small"> <div class="col-md-3 col-lg-3 col-xs-5"><div class="text-xs-left" style="width:100%;">{{\'Итого\'|gettext}}:</div></div> <div class="col-md-9 col-lg-9 col-xs-7"><div class="has-text-right has-text-nowrap" style="width:100%;"> {{total+shippingPrice-discountValue|currency}} </div></div> </div> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-collections",
    {
      data: function () {
        return {
          defaults: {
            view: "row",
            radius: 4,
            border: 2,
            colors: {
              bg: {
                active: null,
                inactive: null,
              },
              border: {
                active: null,
                inactive: null,
              },
              text: {
                active: null,
                inactive: null,
              },
            },
          },
          collection_id: null,
        };
      },
      props: ["options", "page_id", "page_filename", "block", "data", "mode"],
      mixins: [BlockModel],
      created: function () {
        (this.block.tariff = "business"),
          "view" == this.mode && ($scroll.preventParts.m = null);
      },
      mounted: function () {
        this.checkGUI(!1),
          this.data
            ? (this.collection_id = this.data.collection_id)
            : (this.page_id = null);
      },
      watch: {
        collection_id: function () {
          this.checkGUI(!0);
        },
        data: {
          handler: function () {
            this.collection_id = this.data.collection_id;
          },
          deep: !0,
        },
      },
      computed: {
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        collections: function () {
          return this.data
            ? this.data.collections
            : [
                {
                  collection_id: 0,
                  collection: this.$gettext("Коллекция") + " 1",
                },
                {
                  collection_id: 0,
                  collection: this.$gettext("Коллекция") + " 2",
                },
                {
                  collection_id: 0,
                  collection: this.$gettext("Коллекция") + " 3",
                },
              ];
        },
        vbar: function () {
          return "vue-" + (this.data ? "frontend" : "component") + "-vbar";
        },
        styleColors: function () {
          var e = this.o,
            t = e.colors;
          return {
            "--product-collection-bg-inactive": t.bg.inactive,
            "--product-collection-bg-active": t.bg.active,
            "--product-collection-border-inactive": t.border.inactive,
            "--product-collection-border-active": t.border.active,
            "--product-collection-text-inactive": t.text.inactive
              ? t.text.inactive
              : t.bg.inactive
              ? isLightColor(t.bg.inactive)
                ? "#000"
                : "#fff"
              : null,
            "--product-collection-text-active": t.text.active
              ? t.text.active
              : t.bg.active
              ? isLightColor(t.bg.active)
                ? "#000"
                : "#fff"
              : null,
            "--product-collection-radius":
              null != e.radius
                ? (e.radius + " ").replace(/ /g, "px ").trim()
                : null,
            "--product-collection-border-width":
              null != e.border ? e.border + "px" : null,
          };
        },
      },
      methods: {
        collectionLink: function (e) {
          return e
            ? {
                name: "part",
                params: {
                  part: "m",
                  page_filename: e || null,
                },
              }
            : {
                name: "part.index",
                params: {
                  part: "m",
                },
              };
        },
        checkGUI: function (i) {
          var o = this;
          this.data &&
            this.$nextTick(function () {
              var e, t, n;
              null == o.$refs.collections ||
                "row" != o.o.view ||
                ((e = o.$refs.collections.querySelector(".in")) &&
                  ((t =
                    e.offsetLeft -
                    o.$refs.scroll.width / 2 +
                    e.offsetWidth / 2),
                  i
                    ? ((n = function () {
                        o.$refs.scroll.getSizes();
                      }),
                      scrollIt(
                        t,
                        "x",
                        o.$refs.scroll.getWrapper(),
                        300,
                        "easeOutQuad",
                        n,
                        n
                      ))
                    : o.$refs.scroll.scrollTo(t, 0)));
            });
        },
      },
      template:
        '<div class="has-rtl block-form" v-if="_.size(collections)"> <div class="form-field has-compacted-mode" v-if="o.view == \'dropdown\'"> <div class="select is-fullwidth" style="margin-bottom: 0 !important"> <select v-model="collection_id" @change="router.push(collectionLink(collection_id))" class="element"> <option :value="null">-- {{\'Все товары\'|gettext}} --</option> <option v-for="c in collections" :value="c.collection_id" v-if="c.collection_id != null">{{c.collection}}</option> </select> </div> </div> <component v-bind:is="vbar" v-if="o.view == \'row\'" class="collection-bar" ref=\'scroll\'> <div class="collection-list" ref=\'collections\' :style="styleColors"> <router-link :to="collectionLink(null)" class="collection-item button" :class="{in: collection_id== null}">{{\'Все товары\'|gettext}}</router-link> <router-link :to="collectionLink(c.collection_id)" v-for="c in collections" class="collection-item button" :class="{in: c.collection_id == collection_id}">{{c.collection}}</router-link> </div> </component> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-description",
    {
      props: ["options", "page_id", "block", "data"],
      mixins: [BlockModel],
      created: function () {
        this.block.tariff = "business";
      },
      computed: {
        product: function () {
          return this.data
            ? this.data.product
            : {
                description: "Описание товара",
              };
        },
      },
      methods: {
        prepareHTML: function (e) {
          return this.$parseContacts(this.$typography(e, !0), "a", !0);
        },
      },
      template:
        '<div class="block-text has-rtl" v-html="prepareHTML(product.description)"></div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-products-feed", {
    data: function () {
      return {
        mobile: !0,
        defaults: {
          pictures: {
            placement: "cover",
            bg: "#fff",
          },
          radius: 3,
          colors: {
            bg_card: null,
          },
          cols: {
            xs: 2,
            sm: 3,
          },
          has_border: !0,
          style: "standard",
          grid: "strict",
          card: [],
        },
        filters: {
          query: "",
        },
      };
    },
    props: ["options", "page_id", "page_filename", "block", "data", "mode"],
    mixins: [BlockModel, InfinityModel],
    watch: {
      page_filename: function () {
        this.clearData(), (this.isFetching = !0);
      },
      data: function () {
        var e = this;
        (this.isFetching = !1),
          this.initData(),
          (this.bottom = !1),
          this.$nextTick(function () {
            e.bottom = e.bottomVisible();
          });
      },
    },
    computed: {
      o: function () {
        return _.merge(this.defaults, this.options, !0);
      },
      container: function () {
        return $mx(".page");
      },
      styleColors: function () {
        var e = this.o,
          t = {
            "--product-card-bg": e.colors.bg_card,
            "--product-card-radius": e.radius ? e.radius + "px" : null,
          },
          n = null;
        return (
          "overlay" != e.style &&
            ("card" == e.style &&
              e.colors.bg_card &&
              (n = isLightColor(e.colors.bg_card) ? "#000000" : "#ffffff"),
            _.each(e.card, function (e) {
              switch (e.name) {
                case "price":
                  (t["--product-card-price-color"] = e.colors.price || n),
                    (t["--product-card-pricecompare-color"] =
                      e.colors.price_compare || n);
                  break;
                default:
                  t["--product-card-" + e.name + "-color"] = e.color || n;
              }
            })),
          _.filter(t)
        );
      },
      pageKey: function () {
        return this.page_filename;
      },
      products: function () {
        return this.data
          ? this.data.products
          : _.map([1, 2, 3, 4, 5, 6], function (e) {
              var t = e % 3 == 0;
              return {
                product_id: 0,
                title: t ? "Название товара со скидкой" : "Название товара",
                price: 100,
                price_compare: t ? 120 : null,
                sku: "0000" + e,
              };
            });
      },
      columns: function () {
        var e = this.o.cols,
          n = this.mobile ? e.xs : e.sm;
        if ("flex" != this.o.grid) return [this.fields];
        var i = [];
        return (
          _.each(this.fields, function (e, t) {
            null == i[t % n] && (i[t % n] = []), i[t % n].push(e);
          }),
          i
        );
      },
      colClass: function () {
        if ("strict" == this.o.grid) return "col-xs-12";
        var e = this.o.cols;
        return "col-xs-" + 12 / e.xs + " col-sm-" + 12 / e.sm;
      },
      rowClass: function () {
        if ("flex" == this.o.grid) return null;
        var e = this.o.cols;
        return [
          "row-products-" + this.o.grid,
          "is-col-xs-" + e.xs,
          "is-col-sm-" + e.sm,
          {
            "slider-has-border": this.o.has_border,
          },
          "is-style-" +
            ("card" == this.o.style && 0 == this.o.card.length
              ? "standard"
              : this.o.style),
        ];
      },
    },
    mounted: function () {
      this.data && $events.on("products:filter", this.onFilter),
        this.reCheckColumns(),
        "flex" == this.o.grid &&
          $mx(window).on("resize orientationchange", this.reCheckColumns);
    },
    beforeDestroy: function () {
      "flex" == this.o.grid &&
        $mx(window).off("resize orientationchange", this.reCheckColumns),
        window.$events.off("products:filter", this.onFilter);
    },
    created: function () {
      (this.block.tariff = "business"), this.initData();
    },
    methods: {
      reCheckColumns: function () {
        this.mobile =
          this.$device.mobile || $mx(this.$el).closest(".device").length;
      },
      styleCardItem: function (e, t) {
        var n = {
          "--product-card-font-weight": [200, 400, 700][e.weight],
          "--product-card-text-transform": {
            u: "uppercase",
            n: "none",
          }[e.transform],
        };
        return (
          "title" == t &&
            (n = __.merge(n, {
              "--block-product-list-outstock-color": e.outstock,
            })),
          n
        );
      },
      initData: function () {
        var e,
          t = this.products;
        this.data
          ? null != window.$cacheStorefront &&
            null != window.$cacheStorefront[this.pageKey]
            ? ((e = window.$cacheStorefront[this.pageKey]),
              (this.fields = e.fields),
              (this.next = e.next))
            : ((window.$cacheStorefront = {}),
              this.prepareFields(t),
              (this.fields = t),
              (window.$cacheStorefront[this.pageKey] = _.clone({
                fields: this.fields,
                next: this.next,
                filters: this.filters,
              })))
          : (this.fields = t),
          $events.fire("actionbar:set", {
            data: this,
            component: "vue-frontend-blocks-products-actionbar",
          });
      },
      onFilter: function (e, t) {
        (this.filters = t.filters), this.clearData(), this.fetchData();
      },
      fetchData: function () {
        var t = this;
        this.$api
          .get("market/products/list", {
            params: {
              collection_id: this.data.collection_id
                ? parseInt(this.data.collection_id, 16)
                : null,
              next: this.next,
              filters: this.filters,
            },
          })
          .then(function (e) {
            "success" == e.result &&
              (t.prepareFields(e.response.products),
              (t.fields = t.fields.concat(e.response.products)),
              (window.$cacheStorefront[t.pageKey] = _.clone({
                fields: t.fields,
                next: t.next,
                filters: t.filters,
              }))),
              (t.isFetching = !1),
              (t.isFlowFetching = !1);
          });
      },
      prepareFields: function (e) {
        this.next = e.length ? e[e.length - 1].column_id : 0;
      },
      classname: function (e) {
        return (
          "product-container " +
          (e.picture
            ? "picture-" + this.o.pictures.placement
            : "product-container-empty")
        );
      },
      stylesheet: function (e) {
        var t = this.o.pictures.bg,
          n = "contain" == this.o.pictures.placement;
        if (this.data)
          return e.picture
            ? "background-image:url(//" +
                this.$account.storage_domain +
                "/p/" +
                e.picture +
                ");background-color: " +
                this.o.pictures.bg
            : "";
        var i = this.data
          ? t
          : "linear-gradient(0deg, " +
            t +
            " 0%, " +
            t +
            " 25%, transparent 25%, transparent 25%, transparent 75%, transparent 75%, " +
            t +
            " 75%, " +
            t +
            " 100%)";
        return {
          background: n ? i : "var(--background-secondary)",
          "padding-top": "100%",
        };
      },
    },
    template:
      '<div class="has-rtl"> <div class="row-products row row-small" :class="rowClass" ref="products"> <div v-for="items in columns" :class="colClass" :style="styleColors"> <router-link v-for="f in items" :to="{name: \'part\', params: {part: \'o\', page_filename: f.product_id.toString(16)}}" class="item product-container-outer"> <div :class="classname(f)" :style="stylesheet(f)"> <div v-if="(o.style == \'overlay\') && o.card.length" class="product-container-text has-rtl"> <div v-for="v in o.card" :style="styleCardItem(v, v.name)" :data-name="v.name"> <span v-if="v.name == \'title\'" class="is-product-title">{{f.title}}<span class="is-outstock" v-if="f.amount != null && !f.amount">&nbsp;/&nbsp;{{\'Нет в наличии\'|gettext}}</span></span> <span v-if="v.name == \'price\'" class="is-product-price">{{f.price|currency}}</span> </div> </div> </div> <div v-if="(o.style != \'overlay\') && o.card.length" class="product-container-text has-rtl"> <div v-for="v in o.card" :style="styleCardItem(v, v.name)" :data-name="v.name"> <span v-if="v.name == \'title\'" class="is-product-title">{{f.title}}<span class="is-outstock" v-if="f.amount != null && !f.amount">&nbsp;/&nbsp;{{\'Нет в наличии\'|gettext}}</span></span> <span v-if="v.name == \'sku\' && f.sku" class="is-product-sku">{{v.prefix}}{{f.sku}}</span> <span v-if="v.name == \'price\'" class="is-product-price"><span>{{f.price|currency}}</span> <span v-if="v.price_compare && f.price_compare" class="is-price strikethrough is-product-pricecompare" style="font-size: 70%;line-height: 1;">&nbsp;{{f.price_compare|currency}}&nbsp;</span></span> </div> </div> </router-link> </div> </div> <div class="block-item has-mb-2" v-if="!fields.length && !this.isFetching"> <div class="block-field has-text-centered has-mt-2" style="opacity: .5"> {{\'В магазине пока отсутствуют товары\'|gettext}} </div> </div> <div class="border col-xs-12" v-if="isFlowFetching"><div class="loading-overlay loading-block is-active"><div class="loading-icon"></div></div></div> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-filters",
    {
      data: function () {
        return {
          filters: {
            query: "",
          },
        };
      },
      props: ["options", "page_id", "block"],
      mixins: [BlockModel],
      methods: {
        onFilter: _.debounce(function () {
          this.changeFilter();
        }, 700),
        changeFilter: function () {
          $events.fire("search", {
            query: this.filters.query,
          }),
            window.$events.fire("products:filter", {
              filters: this.filters,
            });
        },
        clearFilter: function () {
          (this.filters.query = ""), this.changeFilter();
        },
      },
      computed: {
        pageKey: function () {
          return this.page_id;
        },
      },
      created: function () {
        (this.block.tariff = "business"),
          null != window.$cacheStorefront &&
            null != window.$cacheStorefront[this.pageKey] &&
            (this.filters = window.$cacheStorefront[this.pageKey].filters);
      },
      template:
        '<div class="has-rtl block-form has-form-normal"> <div class="form-field has-compacted-mode"> <div class="control has-icons-right is-clearfix has-products-search-icon"> <input type="text" inputmode="search" :placeholder="\'Поиск по названию\'|gettext" v-model="filters.query" @input="onFilter" class="has-rtl element" style="margin-bottom: 0 !important"> <span class="icon is-right is-clickable" @click="clearFilter" v-if="filters.query"><i class="fai fa-circle-times"></i></span> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-header",
    {
      data: function () {
        return {
          variants_value: "",
          variants_offers: {},
          options_selected: [],
          defaults: {
            items: [
              {
                name: "title",
                weight: 1,
                transform: "n",
                size: "h2",
                colors: {
                  title: null,
                  outstock: null,
                },
              },
              {
                name: "price",
                price_compare: !0,
                weight: 2,
                size: "h3",
                colors: {
                  price: null,
                  price_compare: null,
                },
              },
              {
                name: "sku",
                weight: 2,
                transform: "n",
                size: "h3",
                colors: {
                  text: null,
                },
              },
            ],
          },
          variants: [],
          min_price: 0,
          max_price: 0,
          isAdding: !1,
        };
      },
      props: ["options", "page_id", "block", "data", "mode"],
      mixins: [BlockModel],
      created: function () {
        (this.block.tariff = "business"),
          $events.on("products:setoffer", this.setOffer);
      },
      mounted: function () {
        this.initData();
      },
      beforeDestroy: function () {
        $events.off("products:setoffer", this.setOffer);
      },
      watch: {
        isAdding: function (e) {
          this.$actionbar.buttons.add.loading = e;
        },
      },
      computed: {
        allowCheckout: function () {
          return "view" == this.mode && !this.data.hide_checkout;
        },
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        product: function () {
          return this.data
            ? this.data.product
            : {
                title: this.$gettext("Название товара"),
                price: 100,
                price_compare: 120,
                offer_id: 0,
                sku: "Abc",
              };
        },
        price_html: function () {
          return _.size(this.variants_offers)
            ? null != this.variants_offers[this.variants_value]
              ? this.$currency(this.variants_offers[this.variants_value].price)
              : (this.min_price == this.max_price
                  ? ""
                  : this.$currency(this.min_price) +
                    '<span style="opacity:.5;" class="is-text">&nbsp;—&nbsp;</span>') +
                this.$currency(this.max_price)
            : this.$currency(this.product.price);
        },
        price: function () {
          return _.size(this.variants_offers)
            ? null != this.variants_offers[this.variants_value]
              ? this.variants_offers[this.variants_value].price
              : this.min_price == this.max_price
              ? this.max_price
              : null
            : this.product.price;
        },
        price_compare: function () {
          return this.product.price_compare
            ? _.size(this.variants_offers)
              ? null == this.variants_offers[this.variants_value] ||
                this.variants_offers[this.variants_value].price <
                  this.product.price_compare
                ? this.product.price_compare
                : null
              : this.product.price_compare > this.product.price
              ? this.product.price_compare
              : null
            : null;
        },
        sku: function () {
          return _.size(this.variants_offers) &&
            null != this.variants_offers[this.variants_value] &&
            this.variants_offers[this.variants_value].sku
            ? this.variants_offers[this.variants_value].sku
            : this.product.sku;
        },
        hasAvailability: function () {
          return _.size(this.variants_offers)
            ? (amount =
                null != this.variants_offers[this.variants_value] &&
                null !== this.variants_offers[this.variants_value].amount)
            : null !== this.product.amount;
        },
        availability: function () {
          if (!_.size(this.variants_offers))
            return !(null !== this.product.amount && !this.product.amount);
          var e =
            null != this.variants_offers[this.variants_value]
              ? this.variants_offers[this.variants_value].amount
              : null;
          return !(null !== e && !e);
        },
        offer_id: function () {
          if (!_.size(this.variants_offers) && !this.variants.length)
            return this.product.offer_id;
          if (_.size(this.variants_offers))
            return null != this.variants_offers[this.variants_value]
              ? this.variants_offers[this.variants_value].offer_id
              : 0;
          var t = !0;
          return (
            _.each(this.variants, function (e) {
              return (t &= "" !== e.value);
            }),
            t ? this.product.offer_id + "#" + this.variants_value : null
          );
        },
        addToCartDisabled: function () {
          return (
            !this.product.is_sellable || !this.offer_id || !this.availability
          );
        },
      },
      methods: {
        styleColor: function (e, t, n) {
          var i = t.replace("_", "-");
          "sku" == n && "text" == t && (i = "sku");
          var o = _defineProperty(
            {},
            "--block-product-header-" + i + "-color",
            e.colors[t]
          );
          return (
            "price_compare" != t || e.colors[t] || (o.opacity = 0.5),
            "sku" != n || e.colors[t] || (o.opacity = 0.5),
            o
          );
        },
        styleCardItem: function (e) {
          return {
            "font-weight": [200, 400, 700][e.weight],
            "text-transform": {
              u: "uppercase",
              n: "none",
            }[e.transform],
            opacity: (100 - e.transparent) / 100,
          };
        },
        initData: function () {
          (this.variants_value = ""),
            (this.min_price = Number.MAX_SAFE_INTEGER),
            (this.max_price = 0);
          var e = {
            click: this.backToCatalog,
            buttonClass: "is-default product-back-catalog",
            icon: "fai fa-th",
          };
          this.allowCheckout
            ? ((e.shrink = !0),
              this.$actionbar.setButtons([
                e,
                {
                  name: "add",
                  title: this.$gettext("Добавить в корзину"),
                  click: this.addToCart,
                  buttonClass: "is-primary",
                  disabled: this.addToCartDisabled,
                  loading: !1,
                },
                "basket",
              ]))
            : ((e.title = this.$gettext("Вернуться в каталог")),
              this.$actionbar.setButtons([e]));
        },
        backToCatalog: function () {
          var e = this.$router.currentRoute;
          "part.index" == e.name && "m" == e.params.part
            ? this.$router.back()
            : this.$router.push({
                name: "part.index",
                params: {
                  part: "m",
                },
              });
        },
        addToCart: function () {
          var i = this,
            e = this.offer_id;
          this.options_selected.length &&
            (e += "-" + this.options_selected.join("-")),
            (this.isAdding = !0),
            this.$actionbar.addToCart(e, 1).then(function (e) {
              var n;
              (i.isAdding = !1),
                "success" == e.result &&
                  ((n = {}),
                  _.each(i.options, function (e, t) {
                    -1 != i.options_selected.indexOf(t) && (n[t] = e);
                  }),
                  $events.fire("addToCart", {
                    product_id: parseInt(i.product_id, 16),
                    options: n,
                    product: i.product,
                    currency: i.$account.currency.code,
                    event_id: e.response.event_id,
                  }),
                  $events.fire("products:clearform"),
                  i.$modal(
                    "vue-frontend-blocks-products-added",
                    {
                      done: function () {
                        i.$router.push({
                          name: "part.index",
                          params: {
                            part: "b",
                          },
                        });
                      },
                    },
                    i,
                    {
                      customClass: "modal-bottom",
                    }
                  ));
            });
        },
        setOffer: function (e, t) {
          Object.assign(this, t),
            this.allowCheckout &&
              (this.$actionbar.buttons.add.disabled = this.addToCartDisabled);
        },
      },
      template:
        '<div class="has-rtl"> <div v-for="v in o.items"> <component v-bind:is="(v.size == \'h3\')?\'h4\':v.size" class="is-heading" :class="{\'has-mb-1\': v.name == \'title\'}" :style="styleCardItem(v)"> <span v-if="v.name == \'title\'" :style="styleColor(v, \'title\', v.name)">{{product.title}}<span v-if="data && hasAvailability && !availability" class="has-ml-1 is-outstock" :style="styleColor(v, \'outstock\', v.name)">&nbsp;/&nbsp;{{\'Нет в наличии\'|gettext}}</span></span> <span v-if="v.name == \'sku\' && product.sku" class="is-sku" :style="styleColor(v, \'text\', v.name)"><span style="text-transform: initial">{{v.prefix}}</span>{{sku}}</span> <span v-if="v.name == \'price\'"> <span class="is-price" v-html="price_html" :style="styleColor(v, \'price\', v.name)"></span> <span class="is-price-compare has-ml-1 strikethrough" style="font-size: 70%" :style="styleColor(v, \'price_compare\', v.name)" v-if="price_compare && (price < price_compare)">&nbsp;{{price_compare|currency}}&nbsp;</span> </span> </component> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-offers",
    {
      data: function () {
        return {
          offers_checked: {},
          variants_value: "",
          min_price: 0,
          max_price: 0,
          defaults: {
            view: "row",
            show_title: !0,
            colors: {
              bg: {
                active: null,
                inactive: null,
              },
              text: {
                active: null,
                inactive: null,
              },
              border: {
                active: null,
                inactive: null,
              },
            },
          },
        };
      },
      props: ["options", "page_id", "block", "data"],
      mixins: [BlockModel],
      created: function () {
        (this.block.tariff = "business"),
          window.$events.on("products:clearform", this.clearForm),
          this.initData();
      },
      beforeDestroy: function () {
        window.$events.off("products:clearform", this.clearForm);
      },
      computed: {
        o: function () {
          return _.merge(this.defaults, this.options, !0);
        },
        variants: function () {
          return this.data
            ? this.data.variants
            : [
                {
                  variant_id: 0,
                  variant_title: "Свойство",
                  variant_values: [
                    "Значение 1",
                    "Значение 2",
                    "Значение 3",
                    "Значение 4",
                    "Значение 5",
                  ],
                },
              ];
        },
        variantsAll: function () {
          return !this.data || 0 == _.size(this.data.variants_offers);
        },
        vbar: function () {
          return "row" == this.o.view
            ? "vue-" + (this.data ? "frontend" : "component") + "-vbar"
            : "div";
        },
        styleColors: function () {
          var e = this.o.colors;
          return {
            "--block-storefront-offers-bg-inactive": e.bg.inactive,
            "--block-storefront-offers-bg-active": e.bg.active,
            "--block-storefront-offers-border-inactive": e.border.inactive,
            "--block-storefront-offers-border-active": e.border.active,
            "--block-storefront-offers-text-inactive": e.text.inactive
              ? e.text.inactive
              : e.bg.inactive
              ? isLightColor(e.bg.inactive)
                ? "#000"
                : "#fff"
              : null,
            "--block-storefront-offers-text-active": e.text.active
              ? e.text.active
              : e.bg.active
              ? isLightColor(e.bg.active)
                ? "#000"
                : "#fff"
              : null,
          };
        },
      },
      methods: {
        clearForm: function () {
          _.each(this.data.variants, function (e) {
            e.value = "";
          }),
            this.changeVariant();
        },
        initData: function () {
          var o,
            s = this;
          (this.variants_value = ""),
            (this.min_price = Number.MAX_SAFE_INTEGER),
            (this.max_price = 0),
            this.variantsAll
              ? _.each(this.variants, function (e) {
                  s.$set(e, "value", ""),
                    (e.variant_values = _.map(
                      e.variant_values,
                      function (e, t) {
                        return {
                          k: parseInt(t),
                          v: e,
                        };
                      }
                    ));
                })
              : ((o = {}),
                _.each(this.data.variants_offers, function (e, t) {
                  (s.min_price = Math.min(s.min_price, e.price)),
                    (s.max_price = Math.max(s.max_price, e.price));
                  var n = t.split(":");
                  for (i = 0; i < n.length; i += 2)
                    null == o[n[i]] && (o[n[i]] = {}),
                      (o[n[i]][parseInt(n[i + 1])] = !0);
                }),
                _.each(this.data.variants, function (n) {
                  s.$set(n, "value", "");
                  n.variant_values = _.filter(
                    _.map(n.variant_values, function (e, t) {
                      return (
                        ("" == e || null != o[n.variant_id][t]) && {
                          k: parseInt(t),
                          v: e,
                        }
                      );
                    })
                  );
                })),
            this.changeVariant();
        },
        changeVariant: function () {
          var a = this;
          (this.variants_value = _.map(this.variants, function (e) {
            return e.variant_id + ":" + e.value;
          }).join(":")),
            (this.offers_checked = {}),
            this.variantsAll ||
              _.each(this.data.variants, function (t, e) {
                var n = [];
                for (i in (_.each(a.data.variants, function (e) {
                  e.variant_id == t.variant_id
                    ? n.push(e.variant_id + ":[0-9]+")
                    : n.push(
                        e.variant_id +
                          ":" +
                          ("" !== e.value ? e.value : "[0-9]+")
                      );
                }),
                (n = new RegExp(n.join(":"), "i")),
                a.data.variants_offers))
                  if (n.test(i)) {
                    var o = i.split(":");
                    for (j = 0; j < o.length; j++) {
                      var s = parseInt(o[j]),
                        r = parseInt(o[j + 1]);
                      t.variant_id == o[j] &&
                        (null == a.offers_checked[s] &&
                          (a.offers_checked[s] = []),
                        -1 == a.offers_checked[s].indexOf(r) &&
                          a.offers_checked[s].push(r)),
                        j++;
                    }
                  }
              }),
            this.data &&
              this.$nextTick(function () {
                window.$events.fire("products:setoffer", {
                  min_price: a.min_price,
                  max_price: a.max_price,
                  variants_offers: a.data.variants_offers,
                  variants_value: a.variants_value,
                  variants: a.data.variants,
                });
              });
        },
        setVariant: function (e, t) {
          (e.value = e.value === t.k ? "" : t.k), this.changeVariant();
        },
      },
      template:
        '<div v-if="_.size(variants)" class="block-form block-storefront-offers"> <div class="form-field" v-for="(f, i) in variants" :class="{\'has-compacted-mode\': o.view == \'dropdown\', \'has-mb-2\': i < _.size(variants) - 1, \'is-empty\': f.value === \'\'}" :data-c="f.value"> <label class="label" v-if="o.show_title">{{f.variant_title}}</label> <component v-bind:is="vbar" class="offers-bar" :style="styleColors" :class="{\'is-multiline\': o.view == \'tags\'}" ref=\'scroll\' v-if="o.view != \'dropdown\'"> <div class="offers-list"> <a class="button" v-for="(v, i) in f.variant_values" @click="setVariant(f, v)" :data-a="v.k" :data-b="f.value" :class="{in: v.k === f.value || (!data && !i), disabled: (!variantsAll && (offers_checked[f.variant_id] == undefined || offers_checked[f.variant_id].indexOf(v.k) == -1))}">{{v.v}}</a> </div> </component> <div class="select" v-if="o.view == \'dropdown\'"><select @change="changeVariant" v-model="f.value" :class="{\'has-text-grey\': f.value === \'\'}"><option value="">{{\'-- Не выбрано --\'|gettext}}</option> <option :value="v.k" v-for="v in f.variant_values" :disabled="!variantsAll && (offers_checked[f.variant_id] == undefined || offers_checked[f.variant_id].indexOf(v.k) == -1)">{{v.v}}</option> </select></div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-options",
    {
      data: function () {
        return {
          options_selected: [],
        };
      },
      props: ["options", "page_id", "block", "data"],
      mixins: [BlockModel],
      watch: {
        options_selected: function () {
          window.$events.fire("products:setoffer", {
            options_selected: this.options_selected,
          });
        },
      },
      computed: {
        opts: function () {
          return this.data
            ? this.data.options
            : [
                {
                  title: "Опция 1",
                  price: 100,
                },
                {
                  title: "Опция 2",
                  price: 200,
                },
              ];
        },
      },
      created: function () {
        (this.block.tariff = "business"),
          window.$events.on("products:clearform", this.clearForm);
      },
      beforeDestroy: function () {
        window.$events.off("products:clearform", this.clearForm);
      },
      methods: {
        clearForm: function () {
          this.options_selected = [];
        },
      },
      template:
        '<div v-if="_.size(opts)" class="block-form"> <div class="form-field"> <div class="checkbox-list" id=\'productOptions\'> <label class="is-block checkbox" v-for="(f, option_id) in opts"> <input type="checkbox" :value="option_id" v-model="options_selected"> {{f.title}} <span style="opacity:.5">(<span v-if="f.price> 0">+</span>{{f.price|currency}})</span> </label> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-pictures",
    {
      data: function () {
        return {
          index: 0,
          defaults: {
            pictures: {
              placement: "cover",
              bg: "#fff",
            },
            remove_border: !1,
            is_desktop_fullwidth: !1,
            indicator: {
              placement: "outside",
              style: "dots",
            },
          },
        };
      },
      props: ["options", "page_id", "block", "data", "theme"],
      mixins: [BlockModel],
      created: function () {
        this.block.tariff = "business";
      },
      computed: {
        o: function () {
          var e = _.merge(this.defaults, this.options, !0);
          return {
            list: this.data
              ? _.map(this.data.product.pictures || [], function (e) {
                  return {
                    p: e,
                  };
                })
              : [
                  {
                    p: null,
                  },
                  {
                    p: null,
                  },
                  {
                    p: null,
                  },
                ],
            picture_size: "auto",
            is_desktop_fullwidth: e.is_desktop_fullwidth,
            remove_border: e.remove_border,
            indicator: e.indicator,
            placement: e.pictures.placement,
            bg: "contain" == e.pictures.placement ? e.pictures.bg : null,
          };
        },
      },
      template:
        '<vue-frontend-blocks-pictures :data="data" :options="o" :block="block" :theme="theme" :allow-zoom="true"/>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-products-promocode-form",
    {
      props: ["apply"],
      data: function () {
        return {
          promocode: "",
          errorPromocode: "",
          isCheckingPromocode: !1,
        };
      },
      methods: {
        promocodeFilter: function (e) {
          var t = e.which ? e.which : e.keyCode;
          if (13 == t) return !0;
          String.fromCharCode(t)
            .toUpperCase()
            .match(/[A-ZА-Яa-zа-я0-9\-_]/) || e.preventDefault();
        },
        promocodeFilterAfter: function () {
          this.promocode = this.promocode
            .toUpperCase()
            .replace(/[^A-ZА-Я0-9\-_ ]/g, "")
            .trim()
            .replace(/ /g, "_");
        },
        applyPromocode: function () {
          var t = this;
          (this.isCheckingPromocode = !0),
            this.$api
              .get(
                "market/checkout/promocode",
                {
                  params: {
                    promocode: this.promocode,
                  },
                },
                this
              )
              .then(function (e) {
                "success" == e.result
                  ? (t.apply(e.response.discounts), t.$parent.close())
                  : ((t.errorPromocode = e.fail),
                    t.$nextTick(function () {
                      t.$refs.inputPromocode.focus();
                    })),
                  (t.isCheckingPromocode = !1);
              })
              .catch(function () {
                t.isCheckingPromocode = !1;
              });
        },
      },
      template:
        '<form class="modal-card" @submit.prevent="applyPromocode"> <div class="modal-card modal-card-little"> <header class="modal-card-head"><p class="modal-card-title">{{\'Активировать промокод\'|gettext}}</p> <button type="button" class="modal-close is-large" @click="$parent.close()"></button></header> <section class="modal-card-body has-text-black"> <div class="field" :class="{\'has-error\': errorPromocode}"> <input type="text" class="input is-large has-rtl" maxlength="16" @keypress="promocodeFilter" @change="promocodeFilterAfter" @keyup="promocodeFilterAfter" placeholder="PROMOCODE" v-model="promocode" :disabled="isCheckingPromocode" ref="inputPromocode"> <p class="help">{{errorPromocode}}</p> </div> </section> <div class="modal-card-foot"> <button type="submit" class="button is-primary" :class="{\'is-loading\': isCheckingPromocode}">{{\'Применить\'|gettext}}</button> </div> </div> </form>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-slider", {
    data: function () {
      return {
        defaults: {
          list: [],
          cols: 1,
          carousel_ride: !1,
          carousel_interval: 5,
          is_desktop_fullwidth: !1,
          remove_border: !1,
          arrows: {
            style: "opacity",
            icon: "none",
            size: 2,
            color: null,
          },
          indicator: {
            placement: "outside",
            style: "dots",
          },
        },
        hack: !1,
        loading: "",
        index: 0,
        blockPageId: null,
        isFetching: !1,
        isSliding: !1,
        isSlidingActive: !1,
        timeID: null,
        transform: "",
        scrollTopSliding: 0,
      };
    },
    props: {
      options: Object,
      block: Object,
      page_id: Number,
      theme: Object,
      mode: {
        default: "view",
      },
      allowZoom: Boolean,
      containerClasses: Object,
      isBannerMode: Boolean,
      inactiveScale: {
        default: 0.94,
      },
      navOffsetTop: String,
    },
    mixins: [BlockModel],
    created: function () {
      var e = this;
      (VueHammer.config.swipe = {
        threshold: 10,
      }),
        (this.block.tariff = "pro"),
        (this.blockPageId = this.page_id),
        this.dataInterval &&
          "view" == this.mode &&
          (this.timeID = setInterval(function () {
            e.isSliding ||
              e.moveSlide(
                e.index < e.values.list.length - 1 ? e.index + 1 : 0,
                !1
              );
          }, 1e3 * Math.max(this.dataInterval, 1)));
    },
    beforeDestroy: function () {
      this.timeID && clearInterval(this.timeID);
    },
    computed: {
      cols: function () {
        return $device.mobile ? 1 : this.valueCols;
      },
      valueCols: function () {
        return 1 < this.values.list.length ? this.values.cols : 1;
      },
      amountNav: function () {
        return this.values.list.length - this.cols + 1;
      },
      dataInterval: function () {
        return "view" == this.mode &&
          this.values.carousel_ride &&
          this.$auth.isAllowTariff("pro")
          ? this.values.carousel_interval
          : null;
      },
      colorClass: function () {
        var e = this.theme;
        return isLightColor(
          this.values.design
            ? this.values.design.bg
            : (null == e.block ? StylesFactory.getBaseStyles() : e).block
                .pictures.bg
        )
          ? "is-light"
          : "is-dark";
      },
      designStyles: function () {
        var e = this.values.design,
          t = {
            "--block-pictures-arrows-color": this.values.arrows.color,
            "--block-pictures-arrows-contrast": this.values.arrows.color
              ? isLightColor(this.values.arrows.color)
                ? "#000"
                : "#fff"
              : null,
            "--block-pictures-inactive-scale": this.inactiveScale,
          };
        return (
          e &&
            (t = __.merge(t, {
              "--block-pictures-text-color": e.text,
              "--block-pictures-title-color": e.title,
              "--block-pictures-background": e.bg,
              "--block-pictures-nav-color": e.nav,
              "--block-pictures-button-text-color": e.button_text,
            })),
          __.filter(t)
        );
      },
      isDesktop: function () {
        return $device.desktop && this.values.is_desktop_fullwidth;
      },
      isRTL: function () {
        return "rtl" == this.$account.locale.direction;
      },
    },
    watch: {
      block: function () {
        var e = this;
        (this.hack = !0),
          this.$nextTick(function () {
            e.hack = !1;
          });
      },
      index: function (e) {
        this.$emit("update:index", e);
      },
      "values.cols": function () {
        this.moveSlide(0);
      },
    },
    methods: {
      isActive: function (e) {
        return 2 == this.cols
          ? this.index == e || this.index == e - 1
          : this.index == e;
      },
      keyup: function (e) {
        switch (e.key) {
          case "ArrowLeft":
            this.moveSlide(this.index + (this.isRTL ? 1 : -1), !0);
            break;
          case "ArrowRight":
            this.moveSlide(this.index + (this.isRTL ? -1 : 1), !0);
        }
      },
      touchDeltaX: function (e) {
        var t = $mx(this.$refs.device).width(),
          n = Math.ceil((e.deltaX / t) * 100),
          i = this.index,
          o = this.values.list.length;
        return (
          this.isRTL
            ? (i == o - this.cols && 0 < n && (n = 0),
              0 == i && n < 0 && (n = 0))
            : (0 == i && 0 < n && (n = 0),
              i == o - this.cols && n < 0 && (n = 0)),
          n * this.cols
        );
      },
      touchstart: function () {
        this.isSliding = this.isSlidingActive = !0;
      },
      touchend: function (e) {
        var t = this,
          n = this.touchDeltaX(e);
        this.isRTL && (n = -n),
          n < -5
            ? this.moveSlide(this.index + 1, !0)
            : 5 < n
            ? this.moveSlide(this.index - 1, !0)
            : 0 != n && this.moveSlide(this.index, !1),
          setTimeout(function () {
            t.isSlidingActive = !1;
          }, 150),
          (this.isSliding = !1);
      },
      touchcancel: function () {
        (this.isSlidingActive = this.isSliding = !1),
          this.moveSlide(this.index, !0);
      },
      touchmove: function (e) {
        var t = this.touchDeltaX(e);
        this.transform =
          "translateX(" + (t - 100 * this.index * (this.isRTL ? -1 : 1)) + "%)";
      },
      moveSlide: function (e, t) {
        var r = this,
          n = 1 < arguments.length && void 0 !== t && t,
          i = Math.min(Math.max(0, e), this.values.list.length - this.cols);
        if (this.index != i) {
          this.index = i;
          var o = $mx(this.$refs.device),
            s = o.find(".slider-slide");
          o.find(".picture-container").eq(e);
          for (
            n && this.timeID && clearInterval(this.timeID),
              this.scrollTopSliding = $mx(".page").scrollTop(),
              n &&
                setTimeout(function () {
                  var e,
                    t,
                    n,
                    i,
                    o,
                    s = $mx(".page").scrollTop();
                  r.scrollTopSliding == s &&
                    ((e = $mx(window).height()),
                    (t = $mx(r.$el).offset().top),
                    (n = r.$el.offsetHeight),
                    (i = $mx(".menu-block-container")),
                    (o = $mx(".action-panel")),
                    (t < s || s + e < t + n) &&
                      n < e &&
                      scrollIt(
                        t -
                          (e -
                            n +
                            (i.length ? i.height() : 0) *
                              ($mx("html").is(".has-menu-placement-bottom")
                                ? -1
                                : 1) -
                            (o.length ? o.height() : 0)) /
                            2,
                        "y",
                        $mx(".page")[0]
                      ));
                }, 350),
              i = -2;
            i < 3;
            i++
          )
            s.eq(this.index + i)
              .find(".lazy")
              .triggerHandler("lazy-force");
          (this.transform =
            "translateX(" + (this.isRTL ? "" : "-") + 100 * this.index + "%)"),
            o.triggerHandler("change", [this.index]),
            o.triggerHandler("changeindex", [this.index]);
        } else
          this.transform =
            "translateX(" + (this.isRTL ? "" : "-") + 100 * this.index + "%)";
      },
      bannerClick: function (e, t) {
        var n = this;
        this.isSlidingActive ||
          this.isActive(t) ||
          (this.index == t
            ? "banner" == this.values.options.mode && this.isExternal(e.link)
              ? ((this.isFetching = !0),
                setTimeout(function () {
                  n.isFetching = !1;
                }, 2e3))
              : this.$emit("bannerClick")
            : this.isDesktop && this.moveSlide(t, !0));
      },
      isExternal: function (e) {
        return -1 != ["link", "phone", "email", ""].indexOf(e.type);
      },
    },
    template:
      '<div class="block-slider has-rtl" :class="[{\'is-allow-fullwidth\': values.is_desktop_fullwidth, disabled: isFetching}, \'has-cols-\'+valueCols, \'is-indicator-\'+values.indicator.placement, \'is-indicator-\'+values.indicator.style, colorClass]"> <div class="block-slider-inner" @keyup="keyup" tabindex="0"> <div ref=\'device\' v-if="!hack" class="slider slider-pictures" :class="[containerClasses, {\'slider-has-border\': !values.remove_border, \'is-mode-banner\': isBannerMode}]" :style="designStyles" v-hammer:panstart.horizontal="touchstart" v-hammer:pan.horizontal="touchmove" v-hammer:panend.horizontal="touchend" v-hammer:pancancel.horizontal="touchcancel"> <div class="slider-inner"> <component :is="isBannerMode?\'a\':\'div\'" :href="isBannerMode?$links.resolve(f.link, false):null" class="slider-slide" :class="{active: isActive(i), disabled: f.isFetching, \'stop-transition\': isSliding}" v-for="(f, i) in values.list" :style="{transform: transform + ((isActive(i) || !isDesktop)?\'\':\' scale(var(--block-pictures-inactive-scale))\')}" @click="bannerClick(f, i)"> <slot :f="f" :i="i" :isFetching="isFetching"></slot> </component> </div> <div class="slider-nav" :class="{\'is-hidden\': amountNav== 1 || values.indicator.style == \'none\'}" ref=\'sliders\' :style="{top: (values.indicator.placement == \'inside\')?((navOffsetTop - 30)+\'px\'):null}"> <div v-for="(v, i) in values.list" class="slider-dot" :class="{active: index == i}" @click="moveSlide(i, true)" v-if="i < amountNav"></div> </div> <div class="slider-arrows" :style="{top: (navOffsetTop / 2)+\'px\'}" v-if="values.arrows.icon != \'none\'"> <label class="slider-arrows-icon" :class="[\'is-\'+values.arrows.style, \'fai fa-\'+values.arrows.icon+\'-right\', \'is-x\'+values.arrows.size, {\'is-hide\': index== 0}]" @click="moveSlide(index-1, true)"></label> <label class="slider-arrows-icon" :class="[\'is-\'+values.arrows.style, \'fai fa-\'+values.arrows.icon+\'-right\', \'is-x\'+values.arrows.size, {\'is-hide\': index== values.list.length-cols}]" @click="moveSlide(index+1, true)"></label> </div> </div> </div> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-blocks-socialnetworks",
    {
      data: function () {
        return {
          loading: null,
          values: null,
          v: null,
          defaults: {
            socials_style: {
              layout: "full",
              shape: "brand",
              design: "brand",
              colors: {
                bg: null,
                text: null,
                icon: null,
              },
            },
            items: [],
          },
        };
      },
      props: {
        options: Object,
        block: Object,
        page_id: Number,
        section: Object,
        theme: Object,
        mode: {
          default: "view",
        },
      },
      mixins: [BlockModel],
      created: function () {
        this.initData(), (this.block.tariff = "plus");
      },
      watch: {
        values: function () {
          this.initData();
        },
      },
      methods: {
        initData: function () {
          this.v = this.values.socials_style;
        },
        iconPaths: function (e) {
          var t = "";
          if (null != e.ip)
            for (i = 1; i <= e.ip; i++) t += '<em class="p' + i + '"></em>';
          return t;
        },
        click: function (e, t) {
          var n = this;
          this.loading = t.n;
          var i = this.block.stat[t.n].split("."),
            o = [
              {
                event: "taplink:socialnetworks",
                param: i[i.length - 1] + ":" + t.v,
              },
              {
                event: "taplink:socialnetworks:" + i[i.length - 1],
                param: t.v,
              },
            ];
          if (
            ($events.fire("tap", {
              page_id: this.page_id,
              block_id: this.block.block_id,
              slot: this.block.slot[t.n],
              stat: this.block.block_id + "." + this.block.stat[t.n],
              data: o,
              addons:
                null != this.values.data && null != this.values.data[t.n]
                  ? this.values.data[t.n]
                  : null,
            }),
            setTimeout(function () {
              n.loading = null;
            }, 2e3),
            e.target.href == t.link.b || this.$device.isOpera)
          )
            return !0;
          e.preventDefault(), this.$links.deeplink(t.link);
        },
        link: function (e) {
          return "view" == this.mode ? this.$links.application(e.link) : null;
        },
        classname: function (e) {
          return [
            "btn-link is-service-" + e.i,
            "is-layout-" + this.v.layout,
            this.isFlat ? null : "btn-socials",
            "is-shape-" + this.v.shape,
            "is-design-" + this.v.design,
            "full" == this.v.layout ? "btn-link-styled" : null,
          ];
        },
      },
      computed: {
        isFlat: function () {
          return "full" == this.v.layout && "flat" == this.v.shape;
        },
        stylesheet: function () {
          var e = this.section,
            t = (e && e.link && null != e.link.transparent ? e : this.theme)
              .link.transparent;
          if ("custom" != this.v.design) return null;
          switch ((100 == t && (t = 0), this.v.shape)) {
            case "icon":
              return {
                "--block-socials-icon-text": this.v.colors.icon,
              };
            default:
              var n = this.v.colors.bg,
                i = this.v.colors.text,
                n =
                  n ||
                  (e && e.link && e.link.bg ? e.link.bg : null) ||
                  this.theme.link.bg,
                i =
                  i ||
                  (e && e.link && e.link.color ? e.link.color : null) ||
                  this.theme.link.color,
                o = ColorsFactory.getColor(n);
              return {
                "--block-link-background": ColorsFactory.getBackground(n, t),
                "--block-link-shadow-color": this.v.colors.shadow
                  ? ColorsFactory.transparent(
                      100 -
                        (e && e.link && e.link.shadow && null != e.link.shadow.o
                          ? e.link
                          : this.theme.link
                        ).shadow.o,
                      this.v.colors.shadow
                    )
                  : null,
                "--block-link-background-digs": hexToRgb(o),
                "--block-link-border-color": o,
                "--block-link-title-color": i,
              };
          }
        },
      },
      template:
        '<div class="socials" :class="\'is-\'+$account.locale.direction" v-if="v"> <div class="row row-small"> <div :class="{\'col-shrink\': v.layout == \'square\', \'col-xs\': v.layout != \'full\', \'col-xs-12\': v.layout == \'full\'}" v-for="l in values.items"> <component v-bind:is="(mode == \'view\')?\'a\':\'div\'" :href="link(l)" @click="click($event, l)" target="_top" :aria-label="l.t" :class="classname(l)" :style="stylesheet"> <i :class="\'fa fab fa-\'+l.i" v-if="!isFlat" v-html="iconPaths(l)"></i> <div v-if="v.layout == \'full\'" v-html="$typography(l.t, true)" class="btn-link-title"></div> </component> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-text", {
    data: function () {
      return {
        defaults: {
          text: "",
          text_size: "md",
          text_align: "left",
          color: "",
          font: "",
        },
      };
    },
    props: {
      options: Object,
      theme: Object,
      section: Object,
      mode: {
        default: "view",
      },
    },
    mixins: [BlockModel],
    computed: {
      component: function () {
        return this.isHeading ? this.values.text_size : "div";
      },
      isHeading: function () {
        return "h" == this.values.text_size[0];
      },
      html: function () {
        var e = "view" == this.mode ? "a" : "span";
        return this.isPlaceholder
          ? this.$gettext("Редактировать текст")
          : this.$parseContacts(this.$typography(this.values.text), e);
      },
      isEmpty: function () {
        return "" == this.values.text.toString().trim().replace(/<br>/g, "");
      },
      isPlaceholder: function () {
        return this.isEmpty && "edit" == this.mode;
      },
      style: function () {
        var e = _.merge(
          {
            "text-align": this.values.text_align,
          },
          FontsFactory.getTextStyles(this.values.text_size)
        );
        this.values.color && (e.color = this.values.color + "!important");
        var t,
          n = "h" == this.values.text_size[0],
          i = this.section ? this.section : this.theme,
          o =
            n && null != i.heading && null != i.heading.weight
              ? i.heading.weight
              : 1,
          s = "--theme" + (n ? "-heading" : "");
        return (
          "" !== this.values.font &&
            Object.assign(
              e,
              (_defineProperty(
                (t = {}),
                s + "-font-family",
                FontsFactory.getFont(this.values.font, this.theme)
              ),
              _defineProperty(
                t,
                s + "-font-weight",
                FontsFactory.getWeight(this.values.font, o)
              ),
              _defineProperty(
                t,
                s + "-font-weight-bold",
                FontsFactory.getWeight(this.values.font, Math.min(o + 1, 2))
              ),
              t)
            ),
          this.isPlaceholder && (e.opacity = 0.3),
          FontsFactory.check(),
          e
        );
      },
    },
    template:
      '<component v-bind:is="component" class="block-text has-rtl" :class="{\'is-heading\': values.text_size[0] == \'h\'}" :style=\'style\' v-html="html"/>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-timer-tracker", {
    props: ["time"],
    data: function () {
      return {
        current: null,
        previous: null,
      };
    },
    created: function () {
      this.update(this.time);
    },
    watch: {
      time: function (e) {
        void 0 !== e && this.update(e);
      },
    },
    methods: {
      update: function (e) {
        var t = e;
        ((t = t < 0 ? 0 : t) === this.current && null !== this.current) ||
          ((this.previous = null === this.previous ? t : this.current),
          (this.current = t),
          this.$el &&
            (this.$el.classList.remove("flip"),
            this.$el.offsetWidth,
            this.$el.classList.add("flip")));
      },
    },
    template:
      '<span class="timer-piece"> <span class="timer-card"> <b class="timer-card-top">{{current}}</b> <b class="timer-card-bottom" :data-value="current"></b> <b class="timer-card-back" :data-value="previous"></b> <b class="timer-card-back-bottom" :data-value="previous"></b> </span> </span>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-timer", {
    data: function () {
      return {
        countdown: 0,
        timer: 0,
        time: null,
        i: 0,
        trackers: ["hours", "minutes", "seconds"],
        titles: {},
        numbers: [0, 1],
        frame: null,
        withDays: !0,
        defaults: {
          type: 1,
          timer: {
            1: {
              date: "",
              time: "",
            },
            2: {
              days: "",
              hours: "",
              minutes: "",
              expires: "",
            },
            3: {
              time: "",
            },
          },
          design: {
            on: !1,
          },
        },
      };
    },
    props: ["options", "block", "block_id", "page_id"],
    mixins: [BlockModel],
    watch: {
      values: function () {
        this.rebuild();
      },
    },
    created: function () {
      var e = this;
      this.rebuild(),
        (this.block.tariff = "business"),
        (this.titles = {
          days: this.$gettext("Дни"),
          hours: this.$gettext("Часы"),
          minutes: this.$gettext("Минуты"),
          seconds: this.$gettext("Секунды"),
        }),
        this.withDays && this.trackers.unshift("days"),
        (this.timer = setInterval(function () {
          e.countdown && e.countdown--;
        }, 1e3)),
        window.requestAnimationFrame && this.update();
    },
    beforeDestroy: function () {
      window.cancelAnimationFrame && cancelAnimationFrame(this.frame),
        this.timer && clearInterval(this.timer);
    },
    computed: {
      classes: function () {
        var e = this.values.design;
        return [
          "has-theme-" + (e.style || "dark"),
          "has-style-" + (e.type || "volume"),
          "has-place-" + (e.label && e.label.place ? e.label.place : "top"),
        ];
      },
      designStyles: function () {
        var e = this.options.design;
        return e && e.on
          ? _.filter({
              "--block-timer-label-color": e.label ? e.label.color : null,
              "--block-timer-font-family": e.font
                ? FontsFactory.getFont(e.font)
                : null,
              "--block-timer-font-weight": e.font
                ? FontsFactory.getWeight(e.font || 30, e.weight || 2)
                : null,
            })
          : null;
      },
    },
    methods: {
      rebuild: function () {
        var e,
          t,
          n,
          i = _.merge(this.defaults, this.values, !0);
        (this.withDays = 3 != i.type),
          2 == i.type &&
            ((e = "timer" + this.block_id),
            (t = Math.round(new Date() / 1e3)),
            (n = Cookies.get(e)),
            (i.tms = Math.min(i.tms, 8639999)),
            n
              ? (i.tms = n - t)
              : Cookies.set(e, i.tms + t, {
                  maxAge: t + 86400 * i.expires,
                  path: i.path ? i.path : "/",
                })),
          i.tms < 0 && (i.tms = 0),
          (this.countdown = i.tms);
      },
      split: function (e) {
        return [(e / 10) | 0, e % 10];
      },
      update: function () {
        var e, t, n, i;
        (this.frame = requestAnimationFrame(this.update.bind(this))),
          this.i++ % 10 ||
            ((e = this.countdown),
            (e -= 86400 * (t = Math.floor(e / 86400))),
            (e -= 3600 * (n = Math.floor(e / 3600))),
            (e -= 60 * (i = Math.floor(e / 60))),
            (this.time = {
              days: this.split(t),
              hours: this.split(n),
              minutes: this.split(i),
              seconds: this.split(e),
            }));
      },
    },
    template:
      '<div class="timer" :class="classes" :style="designStyles"> <div v-for="tracker in trackers"> <span class="timer-slot">{{titles[tracker]}}</span> <div v-if="time"> <vue-frontend-blocks-timer-tracker :time="time[tracker][i]" v-ref:trackers v-for="i in numbers"/> <div class="timer-dots"><em></em><em></em></div> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-user-auth", {
    props: ["options"],
    watch: {
      options: function (e) {
        e && this.showForm();
      },
    },
    created: function () {
      this.showForm();
    },
    methods: {
      showForm: function () {
        this.$modal(
          "vue-frontend-auth-form",
          Object.assign({}, this.options, {
            params: {
              part: this.part,
              id: this.page_id,
            },
          }),
          null,
          {
            customClass: "is-modal-auth is-modal-front",
            canCancel: [],
          }
        );
      },
    },
    template: '<div class="block-auth"></div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-user-feed", {
    data: function () {
      return {
        loading: -1,
      };
    },
    props: {
      view: {
        default: "list",
      },
    },
    mixins: [InfinityModel],
    mounted: function () {
      this.fetchData(!0);
    },
    watch: {
      view: function () {
        this.scroll();
      },
    },
    computed: {
      container: function () {
        return $mx(".page");
      },
      fieldsFull: function () {
        return this.isFetching || this.isFlowFetching
          ? this.fields.concat(
              _.map([1, 2, 3], function (e) {
                return {
                  title: "AAAAAAAAA",
                  isFetching: !0,
                };
              })
            )
          : this.fields;
      },
    },
    methods: {
      click: function (e) {
        var t = this;
        (this.loading = e),
          setTimeout(function () {
            t.loading = -1;
          }, 2e3);
      },
      stylePicture: function (e) {
        return e.picture
          ? {
              "background-image":
                "url(//" +
                this.$account.storage_domain +
                "/p/" +
                e.picture +
                ")",
            }
          : null;
      },
      slide: function (e) {
        return {
          list: [
            {
              p: e.picture
                ? {
                    filename: e.picture,
                  }
                : null,
              isFetching: e.isFetching,
              s: e.subtitle,
              t: e.title,
              link: {
                type: "link",
                value: e.link,
              },
            },
          ],
          aspect_ratio: 228 / 510,
          options: {
            text: 1,
            link: 1,
            mode: "banner",
          },
          remove_border: !0,
        };
      },
      fetchData: function (e) {
        var t = this;
        (this.isFetching = e),
          this.$api
            .get("user/feed/list", {
              params: {
                next: this.next,
              },
            })
            .then(function (e) {
              "success" == e.result &&
                ((t.fields = t.fields.concat(e.response.fields)),
                (t.next = e.response.next)),
                (t.isFetching = !1),
                (t.isFlowFetching = !1);
            });
      },
    },
    template:
      '<div class="block-user-feed is-hoverable" :class="\'is-\'+view"> <div class="row" v-if="fields.length || isFetching"> <div class="col-xs-12" v-if="view == \'grid\'"> <vue-frontend-blocks-pictures :options="slide(f)" :block="{}" :account="$account" :theme="$account.theme" v-for="f in fieldsFull"/> </div> <div class="col-xs-12" v-else> <a v-for="(f, i) in fieldsFull" class="feed-row" :href="f.link" :class="{disabled: loading== i || f.isFetching}" @click="click(i)"> <div class="p" :class="{\'loading-overlay is-active\': loading== i, skeleton: f.isFetching, \'is-empty\': !f.picture}" :style="stylePicture(f)"><div class="loading-icon" v-if="loading == i"></div></div> <div> <label>{{f.type_title}}</label> <div :class="{skeleton: f.isFetching}">{{f.title}}<span v-if="f.subtitle">, {{f.subtitle}}</span></div> </div> </a> </div> </div> <div v-else class="has-text-centered"> <div style="margin: 3rem 0 2rem 0"><i class="fab fa-shopping-basket" style="font-size: 8rem;opacity: .1"></i></div> <div>{{\'Ваш список покупок в настоящее время пуст\'|gettext}}</div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-user-index", {
    props: {
      options: Object,
      block: Object,
      section: Object,
      page_id: Number,
    },
    data: function () {
      return {
        view: "list",
        views: ["grid", "list"],
      };
    },
    watch: {
      "options.current": function (e) {
        e || this.redirectIndex();
      },
    },
    created: function () {
      this.options.current || this.redirectIndex();
    },
    methods: {
      redirectIndex: function () {
        this.$router.push({
          name: "part",
          params: {
            part: "c",
            page_filename: "products",
          },
        });
      },
    },
    template:
      '<div> <div v-if="options.current == \'products\'"> <div style="display:flex;justify-content: space-between;" class="has-mb-2"> <h3>{{\'Мои покупки\'|gettext}}</h3> <div class="user-toggle"><label v-for="i in views" :class="{in: view== i}"><input type="radio" v-model="view" :value="i"><i class="fab" :class="\'fa-view-\'+i"></i></label></div> </div> <vue-frontend-blocks-user-feed :view="view"/> </div> <div v-if="options.current == \'orders\'"> <h3 class="has-mb-2">{{\'Все заказы\'|gettext}}</h3> <vue-frontend-blocks-user-leads/> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-user-leads", {
    mixins: [InfinityModel],
    mounted: function () {
      this.fetchData(!0);
    },
    computed: {
      container: function () {
        return $mx(".page");
      },
      fieldsFull: function () {
        return this.isFetching || this.isFlowFetching
          ? this.fields.concat(
              _.map([1, 2, 3], function (e) {
                return {
                  title: "AAAAAAAAA",
                  link: "AAAAAA",
                  type: "AAAA",
                  tms_created: "AAAAAA",
                  isFetching: !0,
                };
              })
            )
          : this.fields;
      },
    },
    methods: {
      fetchData: function (e) {
        var t = this;
        (this.isFetching = e),
          this.$api
            .get("user/leads/list", {
              params: {
                next: this.next,
              },
            })
            .then(function (e) {
              "success" == e.result &&
                ((t.fields = t.fields.concat(e.response.fields)),
                (t.next = e.response.next)),
                (t.isFetching = !1),
                (t.isFlowFetching = !1);
            });
      },
    },
    template:
      '<div class="block-user-feed is-list is-mobile-cards"> <div v-for="(f, i) in fieldsFull" class="feed-row"> <div> <label><span :class="{skeleton: f.isFetching}">{{f.type}}</span></label> <a :href="f.link" :class="{skeleton: f.isFetching}" v-if="f.link">{{f.title}}</a> <span v-else>{{\'Удалено\'|gettext}}</span> </div> <div class="has-width-20"> <label><span :class="{skeleton: f.isFetching}">{{\'Дата заказа\'|gettext}}</span></label> <span :class="{skeleton: f.isFetching}">{{f.tms_created|datetime}}</span> </div> <div class="has-width-15"> <label><span :class="{skeleton: f.isFetching}">{{\'Статус\'|gettext}}</span></label> <span :class="{\'skeleton skeleton-all\': f.isFetching}"> <span class="has-text-danger" v-if="f.price && f.paymentlink">{{\'Не оплачен\'|gettext}}</span> <span class="has-text-success" v-else-if="f.price">{{\'Оплачен\'|gettext}}</span> <span v-else>{{\'Бесплатно\'|gettext}}</span> </span> </div> <div class="has-width-15 has-text-right"> <label><span :class="{skeleton: f.isFetching}">{{\'Стоимость\'|gettext}}</span></label> <span :class="{\'skeleton skeleton-all\': f.isFetching}"><component :is="f.paymentlink?\'a\':\'span\'" v-if="f.price" :href="f.paymentlink" target="_blank"><span v-if="f.paymentlink"><i class="fab fa-link-square-alt"></i>{{\'Оплатить\'|gettext}} </span>{{f.price|currency(f.currency_title)}}</component><div v-else class="has-text-grey-light">{{\'Нет\'|gettext}}</div></span> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-user-profile", {
    data: function () {
      return {
        isFetching: !0,
        values: {
          email: "",
          first_name: "",
          last_name: "",
          language_id: null,
        },
        actions: [
          {
            type: "password",
            title: this.$gettext("Сменить пароль"),
          },
          {
            type: "email",
            title: this.$gettext("Сменить электронную почту"),
          },
        ],
        variants: {},
        errors: {},
        form: {},
      };
    },
    props: {
      options: Object,
      block: Object,
      page_id: Number,
      theme: Object,
    },
    created: function () {
      this.fetchData(),
        this.updateForm(),
        $events.on("locale:updated", this.localeUpdated);
    },
    beforeDestroy: function () {
      $events.off("locale:updated", this.localeUpdated);
    },
    methods: {
      updateForm: function () {
        this.form = {
          fields: [
            {
              name: "email",
              typename: "email",
              title: this.$gettext("Электронная почта"),
              value: this.values.email,
              disabled: !0,
            },
            {
              name: "first_name",
              typename: "text",
              title: this.$gettext("Первое имя"),
              value: this.values.first_name,
            },
            {
              name: "last_name",
              typename: "text",
              title: this.$gettext("Фамилия"),
              value: this.values.last_name,
            },
            {
              name: "language_id",
              typename: "select",
              title: this.$gettext("Язык"),
              value: this.values.language_id,
              variants: this.variants.language_id,
              default: 1,
            },
            {
              name: "utc_timezone",
              typename: "select",
              title: this.$gettext("Текущее время"),
              value: this.values.utc_timezone,
              variants: this.variants.utc_timezone,
              default: 0,
            },
          ].concat([
            {
              title: this.$gettext("Сохранить изменения"),
              typename: "button",
            },
          ]),
        };
      },
      changeForm: function (e) {
        this.$modal(
          "vue-frontend-user-change-form",
          {
            action: e,
            values: this.values,
          },
          this
        );
      },
      localeUpdated: function () {
        this.updateForm();
      },
      fetchData: function () {
        var t = this;
        (this.isFetching = !0),
          this.$api.get("user/profile/get").then(function (e) {
            "success" == e.result &&
              (Object.assign(t, e.response),
              (t.variants.utc_timezone = prepareTimezones()),
              t.updateForm()),
              (t.isFetching = !1);
          });
      },
      updateData: function () {
        var t = this;
        this.isFetching = !0;
        var n = this.$refs.elements.getFields(),
          n = __.combine(__.map(n, "name"), __.map(n, "value"));
        this.$api
          .post("user/profile/set", {
            params: n,
          })
          .then(function (e) {
            "success" == e.result &&
              ((t.values = n),
              i18n.setLocale(
                __.filter(t.variants.language_id, {
                  k: n.language_id,
                })[0].c,
                "pages."
              )),
              (t.isFetching = !1);
          });
      },
    },
    template:
      '<div class="row"> <div class="col-xs-12 col-sm-6"> <div class="block-form"> <form @submit.prevent="updateData" ref="form" class="has-form-floating"> <h3 class="has-mb-2">{{\'Мой профиль\'|gettext}}</h3> <vue-frontend-form-elements :fields="form.fields" :isLoading.sync="isFetching" ref="elements"/> </form> <div class="user-profile-actions has-mt-5"> <h3 class="has-mb-2">{{\'Действия\'|gettext}}</h3> <button type="button" class="button btn-link btn-link-title" @click="changeForm(b)" v-for="b in actions">{{b.title}}</button> </div> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-blocks-video", {
    data: function () {
      return {
        player: null,
        isStarted: !1,
        provider: null,
        inited: !1,
      };
    },
    props: {
      options: Object,
      mode: {
        default: "view",
      },
      block: Object,
    },
    mixins: [BlockModel],
    created: function () {
      (this.block.tariff = "pro"),
        (this.provider = VideoHelper.getProvider(
          this.values,
          "view" == this.mode
        ));
    },
    mounted: function () {
      var t = this;
      $mx(this.$el).on("lazy-hit", function (e) {
        t.provider &&
          (null != t.provider.t
            ? t.values.is_autoplay && t.start()
            : ((t.values.embeded = t.provider.embeded(
                t.provider.match,
                t.$account.language_code
              )),
              (t.values.handler = "embeded"))),
          (t.inited = !0);
      });
    },
    computed: {
      handler: function () {
        return null != this.values.handler ? this.values.handler : "embeded";
      },
      link: function () {
        return (new RegExp("[?|&]static=1", "i").test(location.search) ||
          "edit" == this.mode) &&
          this.values.embeded
          ? this.values.embeded.replace("autoplay=1", "")
          : this.values.embeded;
      },
      sources: function () {
        return [
          {
            src: this.values.url,
            type: this.values.type,
          },
        ];
      },
      poster: function () {
        return this.values.poster
          ? "//" +
              this.$account.storage_domain +
              "/p/" +
              this.options.poster.filename
          : null;
      },
    },
    beforeDestroy: function () {
      this.player && this.player.dispose();
    },
    methods: {
      start: function () {
        var n = this;
        this.isStarted ||
          ((this.isStarted = !0),
          this.$nextTick(function () {
            var e = [
              "//cdn.jsdelivr.net/combine/npm/video.js@7.6.0/dist/video.min.js,npm/videojs-contrib-quality-levels@2.2.0/dist/videojs-contrib-quality-levels.min.js,npm/videojs-http-source-selector@1.1.6/dist/videojs-http-source-selector.min.js",
            ];
            n.provider.s && e.push(n.provider.s),
              $mx.lazy(e, "videoplayer.css", function () {
                var e = [
                    {
                      src: n.values.url,
                      type:
                        "function" == typeof n.provider.t
                          ? n.provider.t(n.provider.match[1])
                          : n.provider.t,
                    },
                  ],
                  t = {
                    html5: {
                      hls: {
                        overrideNative: !0,
                      },
                    },
                    poster: n.values.poster,
                    controls: !0,
                    autoplay: !1,
                    textTrackSettings: !1,
                    playbackRates: [0.5, 1, 1.5, 2, 4],
                    plugins: {
                      httpSourceSelector: {
                        default: "auto",
                      },
                    },
                    controlBar: {
                      volumePanel: {
                        inline: !1,
                      },
                      liveDisplay: !0,
                      pictureInPictureToggle: !0,
                    },
                    sources: e,
                  };
                null != n.provider.techOrder &&
                  (t.techOrder = n.provider.techOrder),
                  (n.player = videojs(n.$refs.videoPlayer, t)),
                  n.player.play();
              });
          }));
      },
    },
    template:
      '<div class="video-container lazy" :class="provider?(\'is-\'+provider.name):null"> <iframe frameborder="0" :src="link" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" v-if="handler == \'embeded\' && inited"></iframe> <div class="video-container-poster" :data-src="poster" @click="start" :class="{\'is-started\': isStarted, lazy: poster, \'lazy-force\': poster && (mode == \'edit\')}" v-else-if="inited"> <video ref="videoPlayer" class="video-js vjs-fill" :class="{\'vjs-hidden-control-bar\': values.is_autohide}" v-if="isStarted"><div class="video-container-poster-play"></div></video> <div class="video-container-poster-play" v-else></div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-brandlink", {
    data: function () {
      return {
        index: 0,
      };
    },
    computed: {
      brandlink: function () {
        return (
          "https://" +
          this.$account.domain +
          "?utm_source=pages&utm_medium=" +
          this.$account.nickname
        );
      },
      isAllow: function () {
        this.index;
        var e = this.$router.currentRoute;
        return !(
          this.$account.is_hidelink ||
          this.$account.lock_message ||
          (-1 != ["part", "part.index"].indexOf(e.name) && "p" != e.params.part)
        );
      },
      title: function () {
        var e = this.$account.domain;
        return e[0].toUpperCase() + e.slice(1);
      },
    },
    created: function () {
      var e = this;
      $events.on("contentupdated", function () {
        e.index++;
      });
    },
    template:
      '<aside v-if="isAllow"> <a :href=\'brandlink\' target="_blank" rel="noopener" class="footer-link"> {{\'Сделано на\'|gettext}} <svg version="1.1" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 76 76" xml:space="preserve" style="fill:#000;position:relative;top:3px;margin:0 2px"> <g><path d="M38,0C17,0,0,17,0,38s17,38,38,38s38-17,38-38S59,0,38,0z M38,72C19.2,72,4,56.8,4,38S19.2,4,38,4s34,15.2,34,34S56.8,72,38,72z M57.5,38c0,1.1-0.9,2-2,2h-35c-1.1,0-2-0.9-2-2s0.9-2,2-2h35C56.6,36,57.5,36.9,57.5,38z M57.5,50c0,1.1-0.9,2-2,2h-35c-1.1,0-2-0.9-2-2s0.9-2,2-2h35C56.6,48,57.5,48.9,57.5,50z M57.5,26c0,1.1-0.9,2-2,2h-35c-1.1,0-2-0.9-2-2s0.9-2,2-2h35C56.6,24,57.5,24.9,57.5,26z"/></g> </svg> <span>{{title}}</span> </a> </aside>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-clockpicker-face",
    {
      props: {
        pickerSize: Number,
        min: Number,
        max: Number,
        double: Boolean,
        value: Number,
        faceNumbers: Array,
        disabledValues: Function,
      },
      data: function () {
        return {
          isDragging: !1,
          inputValue: this.value,
          prevAngle: 720,
        };
      },
      computed: {
        count: function () {
          return this.max - this.min + 1;
        },
        countPerRing: function () {
          return this.double ? this.count / 2 : this.count;
        },
        radius: function () {
          return this.pickerSize / 2;
        },
        outerRadius: function () {
          return this.radius - 5 - 20;
        },
        innerRadius: function () {
          return Math.max(0.6 * this.outerRadius, this.outerRadius - 5 - 40);
        },
        degreesPerUnit: function () {
          return 360 / this.countPerRing;
        },
        degrees: function () {
          return (this.degreesPerUnit * Math.PI) / 180;
        },
        handRotateAngle: function () {
          for (var e = this.prevAngle; e < 0; ) e += 360;
          var t = this.calcHandAngle(this.displayedValue),
            n = this.shortestDistanceDegrees(e, t);
          return this.prevAngle + n;
        },
        handScale: function () {
          return this.calcHandScale(this.displayedValue);
        },
        handStyle: function () {
          return {
            transform:
              "rotate(" +
              this.handRotateAngle +
              "deg) scaleY(" +
              this.handScale +
              ")",
            transition: ".3s cubic-bezier(.25,.8,.50,1)",
          };
        },
        displayedValue: function () {
          return null == this.inputValue ? this.min : this.inputValue;
        },
      },
      watch: {
        value: function (e) {
          e !== this.inputValue && (this.prevAngle = this.handRotateAngle),
            (this.inputValue = e);
        },
      },
      methods: {
        isDisabled: function (e) {
          return this.disabledValues && this.disabledValues(e);
        },
        euclidean: function (e, t) {
          var n = t.x - e.x,
            i = t.y - e.y;
          return Math.sqrt(n * n + i * i);
        },
        shortestDistanceDegrees: function (e, t) {
          var n = (t - e) % 360,
            i = 180 - Math.abs(Math.abs(n) - 180);
          return (360 + n) % 360 < 180 ? i : -1 * i;
        },
        coordToAngle: function (e, t) {
          var n = 2 * Math.atan2(t.y - e.y - this.euclidean(e, t), t.x - e.x);
          return Math.abs((180 * n) / Math.PI);
        },
        getNumberTranslate: function (e) {
          var t = this.getNumberCoords(e);
          return "translate(" + t.x + "px, " + t.y + "px)";
        },
        getNumberCoords: function (e) {
          var t = this.isInnerRing(e) ? this.innerRadius : this.outerRadius;
          return {
            x: Math.round(t * Math.sin((e - this.min) * this.degrees)),
            y: Math.round(-t * Math.cos((e - this.min) * this.degrees)),
          };
        },
        getFaceNumberClasses: function (e) {
          return {
            active: e.value === this.displayedValue,
            disabled: this.isDisabled(e.value),
          };
        },
        isInnerRing: function (e) {
          return this.double && e - this.min >= this.countPerRing;
        },
        calcHandAngle: function (e) {
          var t = this.degreesPerUnit * (e - this.min);
          return this.isInnerRing(e) && (t -= 360), t;
        },
        calcHandScale: function (e) {
          return this.isInnerRing(e) ? this.innerRadius / this.outerRadius : 1;
        },
        onMouseDown: function (e) {
          e.preventDefault(), (this.isDragging = !0), this.onDragMove(e);
        },
        onMouseUp: function () {
          (this.isDragging = !1),
            this.isDisabled(this.inputValue) ||
              this.$emit("change", this.inputValue);
        },
        onDragMove: function (e) {
          var t, n, i, o, s, r, a, l, c, u;
          e.preventDefault(),
            (!this.isDragging && "click" !== e.type) ||
              ((n = (t = this.$refs.clock.getBoundingClientRect()).width),
              (i = t.top),
              (o = t.left),
              (r = {
                x: n / 2,
                y: -n / 2,
              }),
              (a = {
                x: (s = "touches" in e ? e.touches[0] : e).clientX - o,
                y: i - s.clientY,
              }),
              (l = Math.round(this.coordToAngle(r, a) + 360) % 360),
              (c =
                this.double &&
                this.euclidean(r, a) <
                  (this.outerRadius + this.innerRadius) / 2 - 16),
              (u =
                Math.round(l / this.degreesPerUnit) +
                this.min +
                (c ? this.countPerRing : 0)),
              l >= 360 - this.degreesPerUnit / 2 &&
                (u = c ? this.max : this.min),
              this.update(u));
        },
        update: function (e) {
          this.inputValue === e ||
            this.isDisabled(e) ||
            ((this.prevAngle = this.handRotateAngle),
            (this.inputValue = e),
            this.$emit("input", e));
        },
      },
      template:
        '<div class="b-clockpicker-face" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onDragMove" @touchstart="onMouseDown" @touchend="onMouseUp" @touchmove="onDragMove"> <div class="b-clockpicker-face-outer-ring" ref="clock"> <div class="b-clockpicker-face-hand" :style="handStyle"/> <span v-for="(num, index) of faceNumbers" :key="index" class="b-clockpicker-face-number" :class="getFaceNumberClasses(num)" :style="{ transform: getNumberTranslate(num.value) }"> <span>{{ num.label }}</span> </span> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-clockpicker",
    {
      props: {
        value: Date,
        pickerSize: {
          type: Number,
          default: 290,
        },
        hourFormat: {
          type: String,
          default: "12",
          validator: function (e) {
            return "24" === e || "12" === e;
          },
        },
        mobileNative: {
          type: Boolean,
          default: !0,
        },
        incrementMinutes: {
          type: Number,
          default: 5,
        },
        autoSwitch: {
          type: Boolean,
          default: !0,
        },
        type: {
          type: String,
          default: "is-primary",
        },
        position: String,
        editable: Boolean,
        rounded: Boolean,
        disabled: Boolean,
        inline: Boolean,
        minTime: Date,
        maxTime: Date,
        placeholder: String,
        loading: Boolean,
        useHtml5Validation: {
          type: Boolean,
          default: !0,
        },
        timeFormatter: {
          type: Function,
          default: function (e, t) {
            var n, i, o, s, r, a;
            return (
              (i = t),
              (o = (n = e).getHours()),
              (s = n.getMinutes()),
              (r = n.getSeconds()),
              (a = ""),
              "12" === i.hourFormat &&
                ((a = " " + (o < 12 ? AM : PM)),
                12 < o ? (o -= 12) : 0 === o && (o = 12)),
              i.pad(o) +
                ":" +
                i.pad(s) +
                (i.enableSeconds ? ":" + i.pad(r) : "") +
                a
            );
          },
        },
      },
      data: function () {
        return {
          isSelectingHour: !0,
          isDragging: !1,
          _isClockpicker: !0,
          dateSelected: this.value,
          hoursSelected: null,
          minutesSelected: null,
          secondsSelected: null,
          meridienSelected: null,
        };
      },
      watch: {
        value: function (e) {
          (this.dateSelected = e), this.checkHtml5Validity();
        },
      },
      computed: {
        computedValue: {
          get: function () {
            return this.dateSelected;
          },
          set: function (e) {
            (this.dateSelected = e), this.$emit("input", e);
          },
        },
        hours: function () {
          for (
            var e = [], t = this.isHourFormat24 ? 24 : 12, n = 0;
            n < t;
            n++
          ) {
            var i = n,
              o = i;
            this.isHourFormat24 ||
              ((o = i = n + 1),
              this.meridienSelected === this.AM
                ? 12 === i && (i = 0)
                : this.meridienSelected === this.PM && 12 !== i && (i += 12)),
              e.push({
                label: this.formatNumber(o),
                value: i,
              });
          }
          return e;
        },
        minutes: function () {
          for (var e = [], t = 0; t < 60; t += this.incrementMinutes)
            e.push({
              label: this.formatNumber(t),
              value: t,
            });
          return e;
        },
        seconds: function () {
          for (var e = [], t = 0; t < 60; t += this.incrementSeconds)
            e.push({
              label: this.formatNumber(t),
              value: t,
            });
          return e;
        },
        meridiens: function () {
          return [AM, PM];
        },
        hoursDisplay: function () {
          if (null == this.hoursSelected) return "--";
          if (this.isHourFormat24) return this.pad(this.hoursSelected);
          var e = this.hoursSelected;
          return (
            this.meridienSelected === this.PM && (e -= 12),
            0 === e && (e = 12),
            e
          );
        },
        minutesDisplay: function () {
          return null == this.minutesSelected
            ? "--"
            : this.pad(this.minutesSelected);
        },
        minFaceValue: function () {
          return this.isSelectingHour &&
            !this.isHourFormat24 &&
            this.meridienSelected === this.PM
            ? 12
            : 0;
        },
        maxFaceValue: function () {
          return this.isSelectingHour
            ? this.isHourFormat24 || this.meridienSelected !== this.AM
              ? 23
              : 11
            : 59;
        },
        faceFormatter: function () {
          return this.isSelectingHour && !this.isHourFormat24
            ? function (e) {
                return e;
              }
            : this.formatNumber;
        },
        faceSize: function () {
          return this.pickerSize - 24;
        },
        faceDisabledValues: function () {
          return this.isSelectingHour
            ? this.isHourDisabled
            : this.isMinuteDisabled;
        },
        isMobile: function () {
          return this.mobileNative && screen.width < 768;
        },
        isHourFormat24: function () {
          return "24" === this.hourFormat;
        },
      },
      methods: {
        toggle: function () {},
        onClockInput: function (e) {
          this.isSelectingHour
            ? ((this.hoursSelected = e), this.onHoursChange(e))
            : ((this.minutesSelected = e), this.onMinutesChange(e));
        },
        onHoursChange: function (e) {
          !this.minutesSelected &&
            this.defaultMinutes &&
            (this.minutesSelected = this.defaultMinutes),
            !this.secondsSelected &&
              this.defaultSeconds &&
              (this.secondsSelected = this.defaultSeconds),
            this.updateDateSelected(
              parseInt(e, 10),
              this.minutesSelected,
              this.enableSeconds ? this.secondsSelected : 0,
              this.meridienSelected
            );
        },
        onMinutesChange: function (e) {
          !this.secondsSelected &&
            this.defaultSeconds &&
            (this.secondsSelected = this.defaultSeconds),
            this.updateDateSelected(
              this.hoursSelected,
              parseInt(e, 10),
              this.enableSeconds ? this.secondsSelected : 0,
              this.meridienSelected
            );
        },
        onSecondsChange: function (e) {
          this.updateDateSelected(
            this.hoursSelected,
            this.minutesSelected,
            parseInt(e, 10),
            this.meridienSelected
          );
        },
        updateDateSelected: function (e, t, n, i) {
          var o;
          null != e &&
            null != t &&
            ((!this.isHourFormat24 && null !== i) || this.isHourFormat24) &&
            ((o = null),
            this.computedValue && !isNaN(this.computedValue)
              ? (o = new Date(this.computedValue))
              : (o = new Date()).setMilliseconds(0),
            o.setHours(e),
            o.setMinutes(t),
            o.setSeconds(n),
            (this.computedValue = new Date(o.getTime())));
        },
        formatValue: function (e) {
          return e && !isNaN(e) ? this.timeFormatter(e, this) : null;
        },
        onClockChange: function () {
          this.autoSwitch &&
            this.isSelectingHour &&
            (this.isSelectingHour = !this.isSelectingHour);
        },
        onMeridienClick: function (e) {
          this.meridienSelected !== e &&
            ((this.meridienSelected = e), this.onMeridienChange(e));
        },
        handleOnFocus: function () {
          this.onFocus(), this.openOnFocus && this.toggle(!0);
        },
        onChangeNativePicker: function (e) {
          var t,
            n,
            i = e.target.value;
          i
            ? ((t = null),
              this.computedValue && !isNaN(this.computedValue)
                ? (t = new Date(this.computedValue))
                : (t = new Date()).setMilliseconds(0),
              (n = i.split(":")),
              t.setHours(parseInt(n[0], 10)),
              t.setMinutes(parseInt(n[1], 10)),
              t.setSeconds(n[2] ? parseInt(n[2], 10) : 0),
              (this.computedValue = new Date(t.getTime())))
            : (this.computedValue = null);
        },
        formatNumber: function (e, t) {
          return this.isHourFormat24 || t ? this.pad(e) : e;
        },
        onBlur: function (e) {
          (this.isFocused = !1),
            this.$emit("blur", e),
            this.checkHtml5Validity();
        },
        onFocus: function (e) {
          (this.isFocused = !0), this.$emit("focus", e);
        },
        pad: function (e) {
          return (e < 10 ? "0" : "") + e;
        },
        checkHtml5Validity: function () {
          var e = this;
          if (
            this.useHtml5Validation &&
            void 0 !== this.$refs[this.$data._elementRef]
          ) {
            var t = this.$el.querySelector(this.$data._elementRef),
              n = null,
              i = null,
              o = !0;
            return (
              t.checkValidity() ||
                ((n = "is-danger"), (i = t.validationMessage), (o = !1)),
              (this.isValid = o),
              this.$nextTick(function () {
                e.parentField &&
                  (e.parentField.type || (e.parentField.newType = n),
                  e.parentField.message || (e.parentField.newMessage = i));
              }),
              this.isValid
            );
          }
        },
        formatHHMMSS: function (e) {
          var t = new Date(e);
          if (!e || isNaN(t)) return "";
          var n = t.getHours(),
            i = t.getMinutes(),
            o = t.getSeconds();
          return (
            this.formatNumber(n) +
            ":" +
            this.formatNumber(i, !0) +
            ":" +
            this.formatNumber(o, !0)
          );
        },
      },
      template:
        '<div class="b-clockpicker clockpicker-container"> <div class="control has-icons-right" :class="{\'is-inline-mode\': !isMobile || inline}"> <vue-frontend-components-dropdown v-if="!isMobile || inline" ref="dropdown" :position="position" :disabled="disabled" :inline="inline"> <input v-if="!inline" ref="input" slot="trigger" autocomplete="off" type="text" :value="formatValue(computedValue)" :placeholder="placeholder" class="element" :loading="loading" :disabled="disabled" :readonly="!editable" :rounded="rounded" v-bind="$attrs" :use-html5-validation="useHtml5Validation" @click.native.stop="toggle(true)" @keyup.native.enter="toggle(true)" @change.native="onChangeNativePicker" @focus="handleOnFocus" @blur="onBlur() && checkHtml5Validity()"/> <div class="card" :disabled="disabled" custom> <header v-if="inline" class="card-header"> <div class="b-clockpicker-header card-header-title"> <div class="b-clockpicker-time"> <span class="b-clockpicker-btn" :class="{ active: isSelectingHour }" @click="isSelectingHour = true">{{ hoursDisplay }}</span> <span>:</span> <span class="b-clockpicker-btn" :class="{ active: !isSelectingHour }" @click="isSelectingHour = false">{{ minutesDisplay }}</span> </div> <div v-if="!isHourFormat24" class="b-clockpicker-period"> <div class="b-clockpicker-btn" :class="{ active: meridienSelected== AM }" @click="onMeridienClick(AM)">am</div> <div class="b-clockpicker-btn" :class="{ active: meridienSelected== PM }" @click="onMeridienClick(PM)">pm</div> </div> </div> </header> <div class="card-content"> <div class="b-clockpicker-body" :style="{ width: faceSize + \'px\', height: faceSize + \'px\' }"> <div v-if="!inline" class="b-clockpicker-time"> <div class="b-clockpicker-btn" :class="{ active: isSelectingHour }" @click="isSelectingHour = true">Hours</div> <span class="b-clockpicker-btn" :class="{ active: !isSelectingHour }" @click="isSelectingHour = false">Min</span> </div> <div v-if="!isHourFormat24 && !inline" class="b-clockpicker-period"> <div class="b-clockpicker-btn" :class="{ active: meridienSelected== AM }" @click="onMeridienClick(AM)">{{ AM }}</div> <div class="b-clockpicker-btn" :class="{ active: meridienSelected== PM }" @click="onMeridienClick(PM)">{{ PM }}</div> </div> <vue-frontend-components-clockpicker-face :picker-size="faceSize" :min="minFaceValue" :max="maxFaceValue" :face-numbers="isSelectingHour ? hours : minutes" :disabled-values="faceDisabledValues" :double="isSelectingHour && isHourFormat24" :value="isSelectingHour ? hoursSelected : minutesSelected" @input="onClockInput" @change="onClockChange"/> </div> </div> <footer v-if="$slots.default !== undefined && $slots.default.length" class="b-clockpicker-footer card-footer"> <slot/> </footer> </div> </vue-frontend-components-dropdown> <input v-else ref="input" type="time" autocomplete="off" :value="formatHHMMSS(computedValue)" :placeholder="placeholder" :loading="loading" :max="formatHHMMSS(maxTime)" :min="formatHHMMSS(minTime)" :disabled="disabled" class="element" :readonly="false" v-bind="$attrs" :use-html5-validation="useHtml5Validation" style="-webkit-appearance: none" @click.stop="toggle(true)" @keyup.enter="toggle(true)" @change="onChangeNativePicker" @focus="handleOnFocus" @blur="onBlur() && checkHtml5Validity()"/> <span class="icon is-right is-clickable" v-if="dateSelected" @click="computedValue = null"><i class="fai fa-circle-times"></i></span> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-datapicker",
    {
      inheritAttrs: !1,
      props: {
        value: Date,
        dayNames: {
          type: Array,
          default: function () {
            return Vue.prototype.$getDaysNames();
          },
        },
        monthNames: {
          type: Array,
          default: function () {
            return Vue.prototype.$getMonthsNames();
          },
        },
        firstDayOfWeek: {
          type: Number,
          default: function () {
            return Vue.prototype.$getFirstDayWeek();
          },
        },
        inline: Boolean,
        minDate: Date,
        maxDate: Date,
        focusedDate: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: {
          type: Array,
          default: function () {
            return [];
          },
        },
        selectableDates: Array,
        dateFormatter: {
          type: Function,
          default: function (e) {
            return date_format(
              window.i18n.formats.date,
              (Date.parse(e) / 1e3) | 0
            );
          },
        },
        dateParser: {
          type: Function,
          default: function (e) {
            return new Date(Date.parse(e));
          },
        },
        dateCreator: {
          type: Function,
          default: function () {
            return new Date();
          },
        },
        mobileNative: {
          type: Boolean,
          default: !0,
        },
        position: String,
        events: Array,
        indicators: {
          type: String,
          default: "dots",
        },
        required: {
          type: Boolean,
          default: !1,
        },
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        autocomplete: String,
        maxlength: [Number, String],
        useHtml5Validation: {
          type: Boolean,
          default: !0,
        },
      },
      data: function () {
        var e = this.value || this.focusedDate || this.dateCreator();
        return {
          dateSelected: this.value,
          focusedDateData: {
            month: e.getMonth(),
            year: e.getFullYear(),
          },
          _elementRef: "input",
          _isDatepicker: !0,
          isValid: !0,
          isFocused: !1,
          newIconPack: "fa",
        };
      },
      computed: {
        listOfYears: function () {
          for (
            var e = this.maxDate
                ? this.maxDate.getFullYear()
                : Math.max(
                    this.dateCreator().getFullYear(),
                    this.focusedDateData.year
                  ) + 3,
              t = [],
              n = this.minDate ? this.minDate.getFullYear() : 1900;
            n <= e;
            n++
          )
            t.push(n);
          return t.reverse();
        },
        isFirstMonth: function () {
          return (
            !!this.minDate &&
            new Date(this.focusedDateData.year, this.focusedDateData.month) <=
              new Date(this.minDate.getFullYear(), this.minDate.getMonth())
          );
        },
        isLastMonth: function () {
          if (!this.maxDate) return !1;
          var e = new Date(
            this.focusedDateData.year,
            this.focusedDateData.month
          );
          return (
            new Date(this.maxDate.getFullYear(), this.maxDate.getMonth()) <= e
          );
        },
        isMobile: function () {
          return this.mobileNative && screen.width < 768;
        },
        parentField: function () {
          for (var e = this.$parent, t = 0; t < 3; t++)
            e && !e.$data._isField && (e = e.$parent);
          return e;
        },
        statusType: function () {
          if (this.parentField && this.parentField.newType) {
            if ("string" == typeof this.parentField.newType)
              return this.parentField.newType;
            for (var e in this.parentField.newType)
              if (this.parentField.newType[e]) return e;
          }
        },
        statusMessage: function () {
          if (this.parentField) return this.parentField.newMessage;
        },
      },
      watch: {
        dateSelected: function (e) {
          var t = e || this.dateCreator();
          (this.focusedDateData = {
            month: t.getMonth(),
            year: t.getFullYear(),
          }),
            this.$emit("input", e),
            this.$refs.dropdown && (this.$refs.dropdown.isActive = !1);
        },
        value: function (e) {
          (this.dateSelected = e),
            this.isValid ||
              null == this.$refs.input.checkHtml5Validity ||
              this.$refs.input.checkHtml5Validity();
        },
        focusedDate: function (e) {
          e &&
            (this.focusedDateData = {
              month: e.getMonth(),
              year: e.getFullYear(),
            });
        },
        "focusedDateData.month": function (e) {
          this.$emit("change-month", e);
        },
        "focusedDateData.year": function (e) {
          this.$emit("change-year", e);
        },
      },
      methods: {
        updateSelectedDate: function (e) {
          this.dateSelected = e;
        },
        onChange: function (e) {
          var t = this.dateParser(e);
          t && !isNaN(t)
            ? (this.dateSelected = t)
            : ((this.dateSelected = null),
              (this.$refs.input.newValue = this.dateSelected));
        },
        formatValue: function (e) {
          return e && !isNaN(e) ? this.dateFormatter(e) : null;
        },
        decrementMonth: function () {
          this.disabled ||
            (0 < this.focusedDateData.month
              ? --this.focusedDateData.month
              : ((this.focusedDateData.month = 11),
                --this.focusedDateData.year));
        },
        incrementMonth: function () {
          this.disabled ||
            (this.focusedDateData.month < 11
              ? (this.focusedDateData.month += 1)
              : ((this.focusedDateData.month = 0),
                (this.focusedDateData.year += 1)));
        },
        formatYYYYMMDD: function (e) {
          var t = new Date(e);
          if (!e || isNaN(t)) return "";
          var n = t.getFullYear(),
            i = t.getMonth() + 1,
            o = t.getDate();
          return (
            n + "-" + (i < 10 ? "0" : "") + i + "-" + (o < 10 ? "0" : "") + o
          );
        },
        onChangeNativePicker: function (e) {
          var t = e.target.value;
          this.dateSelected = t ? new Date(t.replace(/-/g, "/")) : null;
        },
        focus: function () {
          var e = this;
          void 0 !== this.$data._elementRef &&
            this.$nextTick(function () {
              return e.$el.querySelector(e.$data._elementRef).focus();
            });
        },
        onBlur: function (e) {
          (this.isFocused = !1),
            this.$emit("blur", e),
            this.checkHtml5Validity();
        },
        onFocus: function (e) {
          (this.isFocused = !0), this.$emit("focus", e);
        },
        checkHtml5Validity: function () {
          var e = this;
          if (
            this.useHtml5Validation &&
            void 0 !== this.$refs[this.$data._elementRef]
          ) {
            var t = this.$el.querySelector(this.$data._elementRef),
              n = null,
              i = null,
              o = !0;
            return (
              t.checkValidity() ||
                ((n = "is-danger"), (i = t.validationMessage), (o = !1)),
              (this.isValid = o),
              this.$nextTick(function () {
                e.parentField &&
                  (e.parentField.type || (e.parentField.newType = n),
                  e.parentField.message || (e.parentField.newMessage = i));
              }),
              this.isValid
            );
          }
        },
      },
      template:
        '<div class="has-feedback datepicker-container"> <div class="datepicker" :class="{\'is-expanded\': expanded}"> <div class="control has-icons-right" :class="{\'is-inline-mode\': !isMobile || inline}"> <vue-frontend-components-dropdown v-if="!isMobile || inline" ref="dropdown" :position="position" :disabled="disabled" :inline="inline"> <input v-if="!inline" ref="input" :required="required" class="element" slot="trigger" type="text" autocomplete="off" :value="formatValue(dateSelected)" :placeholder="placeholder" :rounded="rounded" :loading="loading" :disabled="disabled" v-bind="$attrs" @change.native="onChange($event.target.value)" @focus="$emit(\'focus\', $event)" @blur="$emit(\'blur\', $event) && checkHtml5Validity()"/> <vue-frontend-components-dropdown-item :disabled="disabled" custom> <header class="datepicker-header"> <template v-if="$slots.header !== undefined && $slots.header.length"> <slot name="header"/> </template> <div v-else class="field has-addons"> <div class="control"> <a v-show="!isFirstMonth && !disabled" class="button" role="button" :disabled="disabled" @click.prevent="decrementMonth" @keydown.enter.prevent="decrementMonth" @keydown.space.prevent="decrementMonth"> <i class="fai fa-angle-left"></i> </a> </div> <div class="control is-expanded"> <span class="select is-fullwidth"> <select v-model="focusedDateData.month" :disabled="disabled"> <option v-for="(month, index) in monthNames" :value="index" :key="month"> {{ month }} </option> </select> </span> </div> <div class="control is-expanded"> <span class="select is-fullwidth"> <select v-model="focusedDateData.year" :disabled="disabled"> <option v-for="year in listOfYears" :value="year" :key="year"> {{ year }} </option> </select> </span> </div> <div class="control"> <a v-show="!isLastMonth && !disabled" class="button" role="button" :disabled="disabled" @click.prevent="incrementMonth" @keydown.enter.prevent="incrementMonth" @keydown.space.prevent="incrementMonth"> <i class="fai fa-angle-right"></i> </a> </div> </div> </header> <div class="datepicker-content"> <vue-frontend-components-datepicker-table v-model="dateSelected" :day-names="dayNames" :month-names="monthNames" :first-day-of-week="firstDayOfWeek" :min-date="minDate" :max-date="maxDate" :focused="focusedDateData" :disabled="disabled" :unselectable-dates="unselectableDates" :unselectable-days-of-week="unselectableDaysOfWeek" :selectable-dates="selectableDates" :events="events" :indicators="indicators" :date-creator="dateCreator" @close="$refs.dropdown.isActive = false"/> </div> <footer v-if="$slots.default !== undefined && $slots.default.length" class="datepicker-footer"> <slot/> </footer> </vue-frontend-components-dropdown-item> </vue-frontend-components-dropdown> <input v-else ref="input" type="date" :required="required" autocomplete="off" class="element" :value="formatYYYYMMDD(value)" :placeholder="placeholder" :loading="loading" :max="formatYYYYMMDD(maxDate)" :min="formatYYYYMMDD(minDate)" :disabled="disabled" v-bind="$attrs" @change="onChangeNativePicker" @focus="$emit(\'focus\', $event)" @blur="$emit(\'blur\', $event) && checkHtml5Validity()"/> <span class="icon is-right is-clickable" v-if="value" @click="value = null"><i class="fai fa-circle-times"></i></span> </div> </div> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-datepicker-table-row",
    {
      props: {
        selectedDate: Date,
        week: {
          type: Array,
          required: !0,
        },
        month: {
          type: Number,
          required: !0,
        },
        minDate: Date,
        maxDate: Date,
        disabled: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
        events: Array,
        indicators: String,
        dateCreator: Function,
      },
      methods: {
        selectableDate: function (e) {
          var t = [];
          if (
            (this.minDate && t.push(e >= this.minDate),
            this.maxDate && t.push(e <= this.maxDate),
            t.push(e.getMonth() === this.month),
            this.selectableDates)
          )
            for (var n = 0; n < this.selectableDates.length; n++) {
              var i = this.selectableDates[n];
              if (
                e.getDate() === i.getDate() &&
                e.getFullYear() === i.getFullYear() &&
                e.getMonth() === i.getMonth()
              )
                return !0;
              t.push(!1);
            }
          if (this.unselectableDates)
            for (var o = 0; o < this.unselectableDates.length; o++) {
              var s = this.unselectableDates[o];
              t.push(
                e.getDate() !== s.getDate() ||
                  e.getFullYear() !== s.getFullYear() ||
                  e.getMonth() !== s.getMonth()
              );
            }
          if (this.unselectableDaysOfWeek)
            for (var r = 0; r < this.unselectableDaysOfWeek.length; r++) {
              var a = this.unselectableDaysOfWeek[r];
              t.push(e.getDay() !== a);
            }
          return t.indexOf(!1) < 0;
        },
        emitChosenDate: function (e) {
          this.disabled || (this.selectableDate(e) && this.$emit("select", e));
        },
        eventsDateMatch: function (e) {
          if (!this.events.length) return !1;
          for (var t = [], n = 0; n < this.events.length; n++)
            this.events[n].date.getDay() === e.getDay() &&
              t.push(this.events[n]);
          return !!t.length && t;
        },
        classObject: function (e) {
          function t(e, t) {
            return (
              !(!e || !t) &&
              e.getDate() === t.getDate() &&
              e.getFullYear() === t.getFullYear() &&
              e.getMonth() === t.getMonth()
            );
          }
          return {
            "is-selected": t(e, this.selectedDate),
            "is-today": t(e, this.dateCreator()),
            "is-selectable": this.selectableDate(e) && !this.disabled,
            "is-unselectable": !this.selectableDate(e) || this.disabled,
          };
        },
      },
      template:
        '<div class="datepicker-row"> <template v-for="(day, index) in week"> <a v-if="selectableDate(day) && !disabled" :key="index" :class="[classObject(day), {\'has-event\':eventsDateMatch(day)}, indicators]" class="datepicker-cell" role="button" href="#" :disabled="disabled" @click.prevent="emitChosenDate(day)" @keydown.enter.prevent="emitChosenDate(day)" @keydown.space.prevent="emitChosenDate(day)"> {{ day.getDate() }} <div class="events" v-if="eventsDateMatch(day)"> <div class="event" :class="event.type" v-for="(event, index) in eventsDateMatch(day)" :key="index"/> </div> </a> <div v-else :key="index" :class="classObject(day)" class="datepicker-cell"> {{ day.getDate() }} </div> </template> </div>',
    }
  ),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-datepicker-table",
    {
      props: {
        value: Date,
        dayNames: Array,
        monthNames: Array,
        firstDayOfWeek: Number,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
      },
      computed: {
        visibleDayNames: function () {
          for (
            var e = [], t = this.firstDayOfWeek;
            e.length < this.dayNames.length;

          ) {
            var n = this.dayNames[t % this.dayNames.length];
            e.push(n), t++;
          }
          return e;
        },
        hasEvents: function () {
          return this.events && this.events.length;
        },
        eventsInThisMonth: function () {
          if (!this.events) return [];
          for (var e = [], t = 0; t < this.events.length; t++) {
            var n = this.events[t];
            n.hasOwnProperty("date") ||
              (n = {
                date: n,
              }),
              n.hasOwnProperty("type") || (n.type = "is-primary"),
              n.date.getMonth() === this.focused.month &&
                n.date.getFullYear() === this.focused.year &&
                e.push(n);
          }
          return e;
        },
      },
      methods: {
        updateSelectedDate: function (e) {
          this.$emit("input", e);
        },
        weekBuilder: function (e, t, n) {
          for (
            var i = new Date(n, t),
              o = [],
              s = new Date(n, t, e).getDay(),
              r =
                s >= this.firstDayOfWeek
                  ? s - this.firstDayOfWeek
                  : 7 - this.firstDayOfWeek + s,
              a = 1,
              l = 0;
            l < r;
            l++
          )
            o.unshift(new Date(i.getFullYear(), i.getMonth(), e - a)), a++;
          o.push(new Date(n, t, e));
          for (var c = 1; o.length < 7; ) o.push(new Date(n, t, e + c)), c++;
          return o;
        },
        weeksInThisMonth: function (t, e) {
          for (
            var n = [], i = new Date(e, t + 1, 0).getDate(), o = 1;
            o <= i + 6;

          ) {
            var s = this.weekBuilder(o, t, e),
              r = !1;
            s.forEach(function (e) {
              e.getMonth() === t && (r = !0);
            }),
              r && n.push(s),
              (o += 7);
          }
          return n;
        },
        eventsInThisWeek: function (e, t) {
          if (!this.eventsInThisMonth.length) return [];
          for (
            var n = [],
              i = [],
              i = this.weeksInThisMonth(this.focused.month, this.focused.year),
              o = 0;
            o < i[t].length;
            o++
          )
            for (var s = 0; s < this.eventsInThisMonth.length; s++) {
              this.eventsInThisMonth[s].date.getTime() === i[t][o].getTime() &&
                n.push(this.eventsInThisMonth[s]);
            }
          return n;
        },
      },
      template:
        '<section class="datepicker-table"> <header class="datepicker-header"> <div v-for="(day, index) in visibleDayNames" :key="index" class="datepicker-cell"> {{ day }} </div> </header> <div class="datepicker-body" :class="{\'has-events\':hasEvents}"> <vue-frontend-components-datepicker-table-row v-for="(week, index) in weeksInThisMonth(focused.month, focused.year)" :key="index" :selected-date="value" :week="week" :month="focused.month" :min-date="minDate" :max-date="maxDate" :disabled="disabled" :unselectable-dates="unselectableDates" :unselectable-days-of-week="unselectableDaysOfWeek" :selectable-dates="selectableDates" :events="eventsInThisWeek(week, index)" :indicators="indicators" :date-creator="dateCreator" @select="updateSelectedDate"/> </div> </section>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-components-document", {
    props: ["value"],
    methods: {
      classes: function (e) {
        var t,
          n = [];
        return (
          null != e.tunes &&
            null != e.tunes.alignment &&
            ((t = e.tunes.alignment.alignment),
            n.push(
              "has-text-" +
                ({
                  center: "centered",
                }[t] || t)
            )),
          n
        );
      },
      html: function (e) {
        return e.replace(
          /<a.*?href="(.*?)".*?>(.*?)<\/a>/g,
          function (e, t, n) {
            return "#" == t.substr(0, 1)
              ? "<a onclick=\"scrollIt('" +
                  t +
                  "', 'y', $mx(this).closest('.help-container')[0])\">" +
                  n +
                  "</a>"
              : '<a href="' + t + '" target="_blank">' + n + "</a>";
          }
        );
      },
    },
    template:
      '<div class="document document-view small-images"> <div v-for="(b, i) in value.blocks" class="ce-block" :class="[\'is-\'+b.type, {\'is-first-child\': i== 0, \'is-last-child\': i== value.blocks.length - 1}]"> <div class="ce-block__content"> <p v-if="b.type == \'paragraph\'" class="ce-paragraph" :class="classes(b, i)" v-html="html(b.data.text)"/> <component v-if="b.type == \'header\'" v-bind:is="\'h\'+b.data.level" :id="b.data.anchor" v-html="html(b.data.text)" class="ce-header" :class="classes(b, i)"/> <div v-if="b.type == \'image\'" :class="{\'has-bordered\': b.data.withBorder, \'has-stretched\': b.data.stretched, \'has-background\': b.data.withBackground}"> <div class="doc-image" :data-size="(b.data.files != undefined)?b.data.files.length:1"> <img v-if="b.data.file != undefined" :src="b.data.file.url" :alt="b.data.caption" style="cursor: default" @click="showLightboxPicture(b.data.file.url)"> <img v-for="p in b.data.files" :src="p.url" :alt="b.data.caption" @click="showLightboxPicture(p.url)" :class="(p.width> p.height)?\'is-horizontal\':\'is-vertical\'"> </div> </div> <component v-if="b.type == \'list\'" v-bind:is="(b.data.style == \'ordered\')?\'ol\':\'ul\'"><li v-for="item in b.data.items" v-html="html(item)"/></component> <div v-if="b.type == \'avatar\'" class="ce-avatar"> <img :width="b.data.size+\'px\'" :height="b.data.size+\'px\'" :src="\'//{1}{2}\'|format(account.storage_domain, account.avatar.url)"> <div v-if="b.data.title" style="line-height: 2">{{b.data.title}}</div> <div v-if="b.data.subtitle" style="color:#a6a6a6;line-height: 1.2">{{b.data.subtitle}}</div> </div> <div v-if="b.type == \'button\'" v-html="b.data.html"></div> <div v-if="b.type == \'embed\'"> <div v-if="[\'vimeo\', \'youtube\'].indexOf(b.data.service) != -1" class="video-container"> <iframe :src="b.data.embed" frameborder="0" allowtransparency="true" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> </div> </div> <div v-if="b.type == \'alert\'" :class="\'cdx-alert cdx-alert-\'+b.data.type" v-html="html(b.data.message)"></div> <div v-if="b.type == \'delimiter\'" class="ce-delimiter"></div> <pre v-if="b.type == \'code\'" class="highlightjs" :class="\'lang-\'+b.data.language">{{b.data.code}}</pre> <blockquote v-if="b.type == \'quote\'" v-html="html(b.data.text)"></blockquote> <table class="doc-table" :class="{\'with-headings\': b.data.withHeadings}" v-if="b.type == \'table\'"> <tbody> <tr v-for="tr in b.data.content"><td v-for="td in tr" v-html="html(td)"></td></tr> </tbody> </table> <div v-if="b.type == \'zeroblock\'" v-html="html(b.data.html)" style="margin: 0 -15px"/> <vue-frontend-blocks-video v-if="b.type == \'video\'" :options=\'{"url": b.data.url, "type": b.data.type, "handler": "player", "is_autoplay": false, "is_autohide": false, "poster": b.data.poster}\' :block="{}"/> </div> </div> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-dropdown-item",
    {
      props: {
        value: {
          type: [String, Number, Boolean, Object, Array, Function],
          default: null,
        },
        separator: Boolean,
        disabled: Boolean,
        custom: Boolean,
        paddingless: Boolean,
        hasLink: Boolean,
        ariaRole: {
          type: String,
          default: "",
        },
      },
      computed: {
        anchorClasses: function () {
          return {
            "is-disabled": this.$parent.disabled || this.disabled,
            "is-paddingless": this.paddingless,
            "is-active":
              null !== this.value && this.value === this.$parent.selected,
          };
        },
        itemClasses: function () {
          return {
            "dropdown-item": !this.hasLink,
            "is-disabled": this.disabled,
            "is-paddingless": this.paddingless,
            "is-active":
              null !== this.value && this.value === this.$parent.selected,
            "has-link": this.hasLink,
          };
        },
        ariaRoleItem: function () {
          return "menuitem" === this.ariaRole || "listitem" === this.ariaRole
            ? this.ariaRole
            : null;
        },
        isClickable: function () {
          return !(
            this.$parent.disabled ||
            this.separator ||
            this.disabled ||
            this.custom
          );
        },
      },
      methods: {
        selectItem: function () {
          this.isClickable &&
            (this.$parent.selectItem(this.value), this.$emit("click"));
        },
      },
      created: function () {
        if (!this.$parent.$data._isDropdown)
          throw (
            (this.$destroy(),
            new Error("You should wrap bDropdownItem on a bDropdown"))
          );
      },
      template:
        '<hr v-if="separator" class="dropdown-divider"> <a v-else-if="!custom && !hasLink" class="dropdown-item" :class="anchorClasses" @click="selectItem" :role="ariaRoleItem"> <slot/> </a> <div v-else :class="itemClasses" @click="selectItem" :role="ariaRoleItem"> <slot/> </div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-components-dropdown", {
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function],
        default: null,
      },
      disabled: Boolean,
      hoverable: Boolean,
      inline: Boolean,
      position: {
        type: String,
        validator: function (e) {
          return (
            -1 < ["is-top-right", "is-top-left", "is-bottom-left"].indexOf(e)
          );
        },
      },
      mobileModal: {
        type: Boolean,
        default: !0,
      },
      ariaRole: {
        type: String,
        default: "",
      },
      animation: {
        type: String,
        default: "fade",
      },
    },
    data: function () {
      return {
        selected: this.value,
        isActive: !1,
        _isDropdown: !0,
      };
    },
    computed: {
      rootClasses: function () {
        return [
          this.position,
          {
            "is-disabled": this.disabled,
            "is-hoverable": this.hoverable,
            "is-inline": this.inline,
            "is-active": this.isActive || this.inline,
            "is-mobile-modal": this.isMobileModal,
          },
        ];
      },
      isMobileModal: function () {
        return this.mobileModal && !this.inline && !this.hoverable;
      },
      ariaRoleMenu: function () {
        return "menu" === this.ariaRole || "list" === this.ariaRole
          ? this.ariaRole
          : null;
      },
    },
    watch: {
      value: function (e) {
        this.selected = e;
      },
      isActive: function (e) {
        this.$emit("active-change", e);
      },
    },
    methods: {
      selectItem: function (e) {
        this.selected !== e && (this.$emit("change", e), (this.selected = e)),
          this.$emit("input", e),
          (this.isActive = !1);
      },
      isInWhiteList: function (e) {
        if (e === this.$refs.dropdownMenu) return !0;
        if (e === this.$refs.trigger) return !0;
        if (void 0 !== this.$refs.dropdownMenu) {
          var t = this.$refs.dropdownMenu.querySelectorAll("*"),
            n = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var s, r = t[Symbol.iterator]();
              !(n = (s = r.next()).done);
              n = !0
            ) {
              if (e === s.value) return !0;
            }
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              !n && r.return && r.return();
            } finally {
              if (i) throw o;
            }
          }
        }
        if (void 0 !== this.$refs.trigger) {
          var a = this.$refs.trigger.querySelectorAll("*"),
            l = !0,
            c = !1,
            u = void 0;
          try {
            for (
              var d, h = a[Symbol.iterator]();
              !(l = (d = h.next()).done);
              l = !0
            ) {
              if (e === d.value) return !0;
            }
          } catch (e) {
            (c = !0), (u = e);
          } finally {
            try {
              !l && h.return && h.return();
            } finally {
              if (c) throw u;
            }
          }
        }
        return !1;
      },
      clickedOutside: function (e) {
        this.inline || this.isInWhiteList(e.target) || (this.isActive = !1);
      },
      toggle: function () {
        var e = this;
        this.disabled ||
          this.hoverable ||
          (this.isActive
            ? (this.isActive = !this.isActive)
            : this.$nextTick(function () {
                e.isActive = !e.isActive;
              }));
      },
    },
    created: function () {
      "undefined" != typeof window &&
        document.addEventListener("click", this.clickedOutside);
    },
    beforeDestroy: function () {
      "undefined" != typeof window &&
        document.removeEventListener("click", this.clickedOutside);
    },
    template:
      '<div class="dropdown" :class="rootClasses"> <div v-if="!inline" role="button" ref="trigger" class="dropdown-trigger" @click="toggle" aria-haspopup="true"> <slot name="trigger"/> </div> <transition :name="animation"> <div v-if="isMobileModal" v-show="isActive" class="background" :aria-hidden="!isActive"/> </transition> <transition :name="animation"> <div v-show="(!disabled && (isActive || hoverable)) || inline" ref="dropdownMenu" class="dropdown-menu" :aria-hidden="!isActive"> <div class="dropdown-content" :role="ariaRoleMenu"> <slot/> </div> </div> </transition> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-fileupload",
    {
      props: {
        accept: String,
        disabled: Boolean,
        multiple: Boolean,
        value: Array,
        options: Object,
      },
      data: function () {
        return {
          dropFile: null,
          dragDropFocus: !1,
          keyComponent: 0,
          message: "",
        };
      },
      created: function () {
        this.value || (this.value = []);
      },
      watch: {
        value: {
          handler: function () {
            this.$emit("input", this.value);
          },
          deep: !0,
        },
      },
      computed: {
        maxAmount: function () {
          return this.options.limits.amount;
        },
      },
      methods: {
        icon: function (e) {
          var t = this;
          return this.$icons.get(mimetype(e), function () {
            t.keyComponent++;
          });
        },
        updateDragDropFocus: function (e) {
          this.dragDropFocus = e;
        },
        humanSize: function (e) {
          for (var t = 0; 1024 <= e; ) (e /= 1024), t++;
          return e.toFixed(0) + " " + ["B", "KB", "MB", "GB"][t];
        },
        deleteFile: function (e) {
          (this.value[e].file_id || this.value[e].error) &&
            this.value.splice(e, 1);
        },
        percent: function (e, t) {
          var n = 1 < arguments.length && void 0 !== t ? t : 2;
          return ((e.progress / e.filesize) * 100).toFixed(n);
        },
        dropFilesChanged: function (e) {
          var t,
            s = this;
          (this.message = ""),
            window.File && window.FormData
              ? ((t = e.target.files || e.dataTransfer.files),
                _.each(t, function (e, t) {
                  var n = new FormData();
                  if (s.value.length < s.maxAmount) {
                    if (
                      e.size >
                      1024 * Math.min(s.options.limits.maxsize, 256) * 1024
                    )
                      return void (s.message =
                        s
                          .$gettext("Максимальный размер файла: %s")
                          .replace("%s", s.options.limits.maxsize) + " MB");
                    var i = {
                      filename: e.name,
                      progress: 0,
                      filesize: e.size,
                    };
                    s.value.push(i), n.append("file", e);
                    var o = new XMLHttpRequest();
                    (o.onreadystatechange = function (e) {
                      var t,
                        n = "Unknow error:" + JSON.stringify(e);
                      o.readyState === XMLHttpRequest.DONE &&
                        (200 === o.status
                          ? "success" == (t = JSON.parse(o.responseText)).result
                            ? (s.$set(i, "file_id", t.response.file_id),
                              s.$delete(i, "progress"))
                            : s.$set(i, "error", t.message || n)
                          : s.$set(i, "error", n));
                    }),
                      o.upload &&
                        (o.upload.onprogress = function (e) {
                          e.lengthComputable &&
                            ((i.progress = e.loaded), (i.filesize = e.total));
                        }),
                      o.open(
                        "POST",
                        "/storage/upload?profile_id=" + s.$account.profile_id,
                        !0
                      ),
                      o.send(n);
                  }
                }))
              : alert("The File APIs are not fully supported in this browser"),
            this.dragDropFocus || (this.$refs.input.value = null),
            (this.dragDropFocus = !1);
        },
      },
      template:
        '<div class="fileupload-field" :key="keyComponent"> <transition name="fade"><div class="message is-danger" v-if="message"><div class="message-body has-text-centered">{{message}}</div></div></transition> <div v-for="(f, i) in value" class="file element" tabindex="0" :class="{\'is-done\': f.file_id, \'is-error\': f.error, \'is-uploading\': !f.file_id && !f.error}"> <div class="is-icon" v-html="icon(f)"></div> <div class="is-title"> <div class="t">{{f.filename}}</div> <div class="d" v-if="f.error">{{f.error}}</div> <div class="d" v-else><span v-if="f.progress">{{humanSize(f.progress)}} /</span> {{humanSize(f.filesize)}}</div> <transition name="fade"> <div class="progress" v-if="!f.file_id"><div :style="{width: percent(f)+\'%\'}" :class="{\'is-done\': f.progress == f.filesize}"></div></div> </transition> </div> <div class="control"><div class="percent"><span v-if="!f.file_id">{{percent(f, 0)}}%</span></div><span class="control-icon" @click="deleteFile(i)" v-if="!disabled"></span></div> </div> <div v-if="!disabled && (value.length < maxAmount)" class="upload element" tabindex="0" :class="{\'is-hover\': dragDropFocus}" @drop.prevent="dropFilesChanged" @dragover.prevent="updateDragDropFocus(true)" @dragleave.prevent="updateDragDropFocus(false)" @dragenter.prevent="updateDragDropFocus(true)"> <div class="empty"><i class="fab fa-upload has-mr-1"></i>{{\'Перетащите или выберите файлы\'|gettext}}</div> <input ref="input" type="file" :multiple="multiple" :accept="accept" :disabled="disabled" @change="dropFilesChanged" v-if="!dragDropFocus"> </div> </div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-components-userfield", {
    props: ["value", "disabled"],
    template:
      '<div class="input user-field element" :class="{disabled: disabled}" tabindex="0" @focus="$emit(\'focus\')" @blur="$emit(\'blur\')"> <dt><dd :class="{\'is-fetching-block\': !value}"></dd><span><span :class="{\'is-fetching-block\': !value}">{{value?value.email:\'AAAAAAAAAA\'}}</span></span></dt> <a @click="$emit(\'logout\')" tabindex="0" v-if="value"></a> </div>',
  }),
  window.$app.defineComponent(
    "frontend",
    "vue-frontend-components-verifyfield",
    {
      data: function () {
        return {
          code: ["", "", "", "", "", ""],
        };
      },
      props: {
        value: String,
        disabled: Boolean,
        type: {
          type: String,
          default: "text",
        },
      },
      watch: {
        code: function () {
          (this.value = this.code.join("")), this.$emit("input", this.value);
        },
      },
      created: function () {
        for (i = 0; i < this.value.length; i++) this.code[i] = this.value[i];
      },
      mounted: function () {
        this.focus();
      },
      methods: {
        reset: function () {
          for (i = 0; i < this.code.length; i++) this.$set(this.code, i, "");
        },
        focus: function () {
          this.$refs.c0[0].focus();
        },
        isAndroid: function () {
          return navigator && /android/i.test(navigator.userAgent);
        },
        textInput: function (e, t) {
          this.isAndroid() &&
            (null != e.data && (e.keyCode = e.data.charCodeAt(0)),
            this.keydown(e, t, !0));
        },
        paste: function (e, t) {
          if (this.disabled) return e.preventDefault();
          var n = e.clipboardData
            .getData("text")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
          for (j = 0; j < Math.min(this.code.length - t, n.length); j++)
            this.$set(this.code, t + j, n[j]);
          this.$refs["c" + (j - 1)][0].focus();
        },
        keydown: function (e, t, n) {
          if (8 == e.keyCode)
            this.$set(this.code, t, ""),
              t && this.$refs["c" + (t - 1)][0].focus(),
              e.preventDefault();
          else {
            if (this.isAndroid() && !n) return;
            if (13 == e.keyCode || this.disabled || e.metaKey || e.ctrlKey)
              return;
            switch (
              ((37 == e.keyCode || (e.shiftKey && 9 == e.keyCode)) &&
                t &&
                this.$refs["c" + (t - 1)][0].focus(),
              (39 == e.keyCode || (!e.shiftKey && 9 == e.keyCode)) &&
                t < this.code.length - 1 &&
                this.$refs["c" + (t + 1)][0].focus(),
              this.type)
            ) {
              case "text":
                if (
                  !(
                    (97 <= e.keyCode && e.keyCode <= 122) ||
                    (65 <= e.keyCode && e.keyCode <= 90) ||
                    (48 <= e.keyCode && e.keyCode <= 57)
                  )
                )
                  return e.preventDefault();
                break;
              case "tel":
                if (!(48 <= e.keyCode && e.keyCode <= 57))
                  return e.preventDefault();
            }
            this.$set(
              this.code,
              t,
              String.fromCharCode(e.keyCode).toLowerCase()
            ),
              t < this.code.length - 1 && this.$refs["c" + (t + 1)][0].focus(),
              e.preventDefault();
          }
          this.$emit("keydown", e);
        },
      },
      template:
        '<div class="row row-small verifyfield"> <div class="col-xs-2" v-for="(v, i) in code"><input :type="type" v-model="v" class="input is-large input-code" autocomplete=\'off\' @textInput="textInput($event, i)" @keydown="keydown($event, i)" :ref="\'c\'+i" @paste.prevent="paste($event, i)" :disabled="disabled" placeholder="0"></input></div> </div>',
    }
  ),
  window.$app.defineComponent("frontend", "vue-frontend-dialog", {
    data: function () {
      return {
        buttons: {
          info: "is-primary",
          danger: "is-danger",
        },
      };
    },
    props: {
      title: String,
      text: String,
      type: {
        default: "info",
      },
      confirm: Function,
    },
    methods: {
      response: function (e) {
        this.$parent.close(), this.confirm(e);
      },
    },
    template:
      '<div class="modal-card modal-card-little" style="max-width: 370px;margin: 0 auto"> <section class="modal-card-body has-text-centered"> <div :class="\'modal-icon is-\'+type+\' has-mt-2 has-mb-2\'"><div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 2rem"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM256 304c8.844 0 16-7.156 16-16V128c0-8.844-7.156-16-16-16S240 119.2 240 128v160C240 296.8 247.2 304 256 304zM256 344c-13.25 0-24 10.75-24 24s10.75 24 24 24s24-10.75 24-24S269.3 344 256 344z"/></svg> </div></div> <h4>{{title|gettext}}</h4> <p>{{text|gettext}} </section> <footer class="modal-card-foot" style="border-top: 0"> <div v-if="confirm" style="flex:1;display:flex"> <button class="button is-medium is-fullwidth is-clear" type="button" @click="response(0)">{{\'Нет\'|gettext}}</button> <button class="button is-medium is-fullwidth" :class="buttons[type]" type="button" @click="response(1)">{{\'Да\'|gettext}}</button> </div> <button class="button is-medium is-fullwidth" :class="buttons[type]" type="button" @click="$parent.close()" v-else>{{\'Закрыть\'|gettext}}</button> </footer> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-form-complete-modal", {
    props: {
      isOpened: Boolean,
      message: String,
    },
    template:
      '<div class="modal-card modal-card-little"> <section class="modal-card-body"> <div class="has-text-centered"> <div class="has-mb-2"> <div class="sa-icon sa-success animate" style="display: block;"> <span class="sa-line sa-tip animateSuccessTip"></span> <span class="sa-line sa-long animateSuccessLong"></span> <div class="sa-placeholder"></div> <div class="sa-fix"></div> </div> </div> <h4 v-html="$nl2br($escape(message))"></h4> </div> </section> <div class="modal-card-foot" style="justify-content: center"> <button type="button" class="button is-secondary" @click="$parent.close">{{\'Закрыть\'|gettext}}</button> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-form-elements", {
    props: {
      fields: Array,
      errors: Object,
      isLoading: Boolean,
      checkDepends: Boolean,
      block_id: String,
      mode: {
        default: "view",
      },
      needUser: Boolean,
      disabled: Boolean,
      form_btn: String,
    },
    data: function () {
      return {
        focused: null,
        userFieldIndex: null,
        keyComponent: 0,
        types: {
          1: "text",
          3: "name",
          5: "textarea",
          6: "email",
          7: "phone",
          8: "select",
          9: "radio",
          10: "checkbox",
          11: "country",
          12: "number",
          13: "date",
          14: "time",
          100: "code",
        },
      };
    },
    mounted: function () {
      this.rebuildValues(),
        null == this.block_id &&
          (this.block_id =
            Date.now().toString(36) + Math.random().toString(36).substring(2)),
        $events.on("userauth", this.onUserAuth),
        $events.on("userlogout", this.clearUser);
    },
    beforeDestoyed: function () {
      $events.off("userauth", this.onUserAuth),
        $events.off("userlogout", this.clearUser);
    },
    watch: {
      fields: function () {
        this.rebuildValues();
      },
    },
    computed: {
      d: function () {
        return (
          (null != this.$account.readonly && this.$account.readonly) ||
          this.isLoading ||
          this.disabled
        );
      },
    },
    methods: {
      input: function () {
        this.$emit("update:fields", this.fields),
          this.$emit("input", this.fields);
      },
      onUserAuth: function (e, t) {
        if (t) {
          for (i = 0; i < this.fields.length; i++)
            if (3 == this.fields[i].type_id) {
              this.fields[i].value = this.$auth.user.name;
              break;
            }
        } else this.clearUser();
        this.keyComponent++;
      },
      buttonTitle: function (e) {
        return e.title
          ? e.title
          : this.form_btn
          ? this.form_btn
          : this.$gettext("Отправить");
      },
      clearUser: function () {
        var t = this;
        this.userFieldIndex &&
          (__.each(this.fields, function (e) {
            switch (t.type(e)) {
              case "user":
                (e.typename = "email"), (e.value = "");
                break;
              case "name":
                e.value = "";
            }
          }),
          (this.userFieldIndex = null));
      },
      logout: function () {
        var t = this;
        this.$modal("vue-frontend-dialog", {
          title: this.$format(
            this.$gettext(
              "Вы авторизованы как {1}. Вы хотите выйти и оформить заявку на другой аккаунт?"
            ),
            this.$auth.user.email
          ),
          type: "danger",
          confirm: function (e) {
            e && t.$auth.logout();
          },
        });
      },
      type: function (e) {
        return e.typename ? e.typename : this.types[e.type_id];
      },
      rebuildValues: function () {
        var t = this;
        (this.userFieldIndex = null),
          __.each(this.fields, function (n, e) {
            switch (
              (void 0 === n.value && t.$set(n, "value", null), t.type(n))
            ) {
              case "checkbox":
                n.default && (n.value = 1);
                break;
              case "country":
                $mx.lazy("countries." + i18n.locale + ".js", function () {
                  (n.variants = __.sortBy(
                    __.filter(
                      __.map(i18n.counties, function (e, t) {
                        return null != n.ids &&
                          n.ids.length &&
                          -1 == n.ids.indexOf(parseInt(t))
                          ? null
                          : __.isObject(e)
                          ? e
                          : {
                              k: t,
                              v: e,
                            };
                      })
                    ),
                    "v"
                  )),
                    (n.nulltitle =
                      "-- " + t.$gettext("Выберите страну") + " --"),
                    t.$set(n, "typename", "select");
                });
                break;
              case "user":
                t.userFieldIndex = e;
                break;
              case "name":
                t.$auth.inited && (n.value = t.$auth.user.name);
                break;
              case "email":
                t.needUser &&
                  null === t.userFieldIndex &&
                  "view" == t.mode &&
                  ((n.typename = "user"),
                  (t.userFieldIndex = e),
                  t.$auth.inited || t.$auth.loadData());
            }
          });
      },
      prepareVariants: function (e) {
        return _.isString(e) ? e.split("\n") : e;
      },
      prepareSelect: function (e) {
        return __.map(__.isString(e) ? e.split("\n") : e, function (e, t) {
          return __.isObject(e)
            ? e
            : {
                k: e,
                v: e,
              };
        });
      },
      checkFieldDepends: function (e) {
        return (
          null == e.depends_name ||
          !this.checkDepends ||
          this.checkDepends(e) ||
          (null != this.fields[e.depends_name] &&
            -1 != e.depends_value.indexOf(this.fields[e.depends_name].value))
        );
      },
      input_type: function (e) {
        var t = "text";
        return (
          -1 != ["password", "number", "email"].indexOf(this.type(e)) &&
            (t = this.type(e)),
          t
        );
      },
      clickParagraph: function (e) {
        if (
          e.target &&
          "A" == e.target.tagName.toUpperCase() &&
          "view" == this.mode
        ) {
          var t = $mx(e.target);
          if ("_blank" == t.attr("target")) return;
          var n = t.data();
          n.component &&
            $events.fire("component:show", {
              name: n.component,
              data: n,
            });
        }
        e.preventDefault();
      },
      alert: function (e) {
        this.$modal("vue-frontend-dialog", {
          title: e,
          type: "danger",
        });
      },
      reset: function () {
        for (i in this.fields) this.fields[i].value = null;
        this.input();
      },
      getFields: function () {
        var e = !0,
          t = [];
        for (i in this.fields) {
          var n = this.fields[i];
          if (this.checkFieldDepends(n)) {
            var o = this.type(n),
              s = null == n.value ? null : n.value;
            if (-1 == ["paragraph", "button"].indexOf(o)) {
              switch (o) {
                case "date":
                  s = s ? date_format("d.m.Y", (s / 1e3) | 0) : "";
                  break;
                case "user":
                  s = this.$auth.user.email + ";" + this.$auth.user.hs;
                  break;
                case "time":
                  s = s ? date_format("H:i", (s / 1e3) | 0) : "";
                  break;
                default:
                  switch (_typeof2(n.value)) {
                    case "number":
                    case "boolean":
                      break;
                    default:
                      s = s ? s.toString().trim() : s;
                  }
              }
              if (n.required && !s) {
                this.alert(this.$gettext("Необходимо заполнить поле")),
                  (e = !1);
                break;
              }
              if (("phone" == o && !n.valid && s) || (!s && n.required)) {
                this.alert(this.$gettext("Введите корректный номер телефона")),
                  (e = !1);
                break;
              }
              if (("email" == o && !n.valid && s) || (!s && n.required)) {
                if (
                  !/^(([^а-я<>()[\]\\.,;:\s@\"]+(\.[^а-я<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    s
                  )
                ) {
                  this.alert(this.$gettext("Введите корректный email")),
                    (e = !1);
                  break;
                }
              }
              t[i] = __.filter(
                {
                  type: null == n.type_id ? null : n.type_id,
                  value: s || "",
                  idx: null == n.idx ? null : n.idx,
                  name: null == n.name ? null : n.name,
                },
                __.isNotNull
              );
            }
          }
        }
        return e ? t : null;
      },
    },
    template:
      '<div class="has-rtl" :key="keyComponent"> <div v-for="(field, idx) in fields" v-if="checkFieldDepends(field)" :data-a="type(field)" :data-b="field.value" :data-c="$auth.user"> <div v-if="type(field) == \'button\'" class="form-field"><button type="submit" class="button btn-link btn-link-title" :class="{\'is-loading\': isLoading}">{{buttonTitle(field)}}</button></div> <div v-else-if="type(field) == \'paragraph\'" class="form-field form-field-paragraph has-mt-2" style="font-size:.9em" v-html="field.text" @click="clickParagraph"></div> <div v-else class="form-field" :class="{\'is-focused\': focused== idx, \'is-empty\': __.isEmpty(field.value) && (type(field) != \'user\'), \'has-label\': !__.isEmpty(field.title), \'has-error\': errors && errors[idx], \'has-compacted-mode\': [\'name\', \'text\', \'email\', \'number\', \'password\', \'select\', \'country\', \'date\', \'time\', \'textarea\', \'phone\', \'user\', \'code\', \'file\'].indexOf(type(field)) != -1}" :data-type="type(field)" :data-t="typeof(field.value)"> <div v-if="type(field) == \'checkbox\'" class="checkbox-list"> <label class="checkbox"> <input type="checkbox" :checked="field.default" v-model="field.value" @input="input" :required="field.required == 1" :disabled="d"> {{field.title}}<sup class="required" v-if="field.required">*</sup> </label> <div class="form-field-desc" v-if="field.text">{{field.text}}</div> </div> <label v-else-if="field.title" class="label" :class="{\'is-marginless\': type(field) == \'radio\'}" :for="block_id+\'fid\'+idx">{{field.title}}<sup class="required" v-if="field.required == 1">*</sup></label> <div v-if="(type(field) != \'checkbox\') && field.text" class="form-field-desc">{{field.text}}</div> <vue-frontend-components-userfield v-model="$auth.user" @input="input" @logout="logout" v-if="(type(field) == \'user\')" @focus="focused = idx" @blur="focused = null" :disabled="d"/> <input class="element" v-if="[\'name\', \'text\', \'email\', \'number\', \'password\'].indexOf(type(field)) != -1" :placeholder="field.placeholder" :name="field.name" @input="input" :type="input_type(field)" :disabled="d || field.disabled" v-model="field.value" :required="field.required == 1" :id="block_id+\'fid\'+idx" @focus="focused = idx" @blur="focused = null"> <input class="element" v-if="type(field) == \'code\'" :name="type(field)" @input="input" :type="input_type(field)" :disabled="d" v-model="field.value" :required="field.required == 1" :id="block_id+\'fid\'+idx" @focus="focused = idx" @blur="focused = null" maxlength="16" v-mask="{transform: \'upper\', preg: \'A-ZА-Я0-9-_\'}"> <mx-phone v-if="type(field) == \'phone\'" :name="type(field)" @input="input" v-model="field.value" :disabled="d" :required="field.required == 1" :isValid.sync="field.valid" :id="block_id+\'fid\'+idx" :title="\'Страна\'|gettext" @focus="focused = idx" @blur="focused = null" classname="element"/> <textarea v-if="type(field) == \'textarea\'" rows="4" :disabled="d" @input="input" :placeholder="field.placeholder" v-model="field.value" :required="field.required == 1" :id="block_id+\'fid\'+idx" class="element autoresize-init" @focus="focused = idx" @blur="focused = null"></textarea> <div class="select" v-if="type(field) == \'select\'"><select class="element" @input="input" v-model="field.value" :required="field.required == 1" :disabled="d || field.disabled" @focus="focused = idx" @blur="focused = null"> <option :value="null" v-if="field.nulltitle">{{field.nulltitle}}</option> <option :value="null" v-else-if="field.default == undefined">-- {{\'Не выбрано\'|gettext}} --</option> <option v-for="v in prepareSelect(field.variants)" :value="v.k">{{v.v}}</option> </select></div> <div class="select" v-if="type(field) == \'country\'"><select class="element" disabled><option v-if="field.nulltitle">{{field.nulltitle}}</option><option v-else>-- {{\'Не выбрано\'|gettext}} --</option></select></div> <vue-frontend-components-datapicker v-if="(type(field) == \'date\') && (mode != \'edit\')" @input="input" v-model=\'field.value\' :required="field.required == 1" :disabled="d || field.disabled" :id="block_id+\'fid\'+idx" @focus="focused = idx" @blur="focused = null"/> <vue-frontend-components-clockpicker v-if="(type(field) == \'time\') && (mode != \'edit\')" @input="input" v-model="field.value" :disabled="d || field.disabled" hour-format="24" :id="block_id+\'fid\'+idx" @focus="focused = idx" @blur="focused = null"/> <vue-frontend-components-fileupload v-if="type(field) == \'file\'" v-model="field.value" @input="input" :multiple="true" :disabled="d" :options="field.options" @focus="focused = idx" @blur="focused = null"/> <input v-if="(mode == \'edit\') && ([\'date\', \'time\'].indexOf(type(field)) != -1)" type="text" class="element"> <div class="radio-list" v-if="type(field) == \'radio\'"> <label v-for="v in prepareVariants(field.variants)" class="radio"> <input type="radio" :value="v" :disabled="d" @change="input" v-model="field.value" :required="field.required == 1" :name="\'b{1}f{2}\'|format(block_id, idx)">{{v}} </label> </div> <p class="help is-danger" v-if="errors && errors[idx]">{{errors[idx]}}</p> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-index", {
    data: function () {
      return {
        inited: !1,
        keyComponent: 0,
        indexHTML: 0,
        needAuth: null,
        dynamicComponent: {
          name: null,
          data: null,
        },
      };
    },
    computed: {
      showHTML: function () {
        return (
          this.$account.html &&
          (null == this.$account.cookies || 0 == this.$account.cookies.length)
        );
      },
      pageClasses: function () {
        var e = [];
        return (
          this.options &&
            (e.push("max-page-container-" + (this.options.max_width || "lg")),
            null != this.options.valign &&
              e.push("page-valign-" + this.options.valign)),
          e
        );
      },
    },
    created: function () {
      var e,
        t = this;
      $scroll.init(),
        null != this.$account.addons &&
          null != this.$account.addons.codes &&
          _.each(this.$account.addons.codes, function (e) {
            null != t.$account.cookies && null != e.cookie
              ? t.$account.cookies.push([
                  "functional",
                  function () {
                    t.$account.html += e.html;
                  },
                ])
              : (t.$account.html += e.html);
          }),
        $events.on("userauth", this.onUserAuth),
        $events.on("component:show", this.showComponent),
        document.location.search &&
          !this.$auth.user &&
          ((e = new URLSearchParams(document.location.search)),
          (this.needAuth = e.get("auth")),
          this.needAuth && this.$auth.loadData());
    },
    mounted: function () {
      this.reduildStyles(),
        $mx(this.$el)
          .closest(".main-theme")
          .addClass(StylesFactory.getPageClasses(this.$account).join(" ")),
        (this.inited = !0);
    },
    beforeDestroy: function () {
      $events.off("userauth", this.onUserAuth);
    },
    methods: {
      reduildStyles: function () {
        StylesFactory.updateCSSBlock(this.$account.styles, this.$refs.styles);
      },
      showComponent: function (e, t) {
        var n = this;
        (this.dynamicComponent = t),
          this.$nextTick(function () {
            var e = n.$refs.dynamicComponent;
            e && e.show(t.data);
          });
      },
      onUserAuth: function (e, t) {
        !this.needAuth ||
          (t && t.email == this.needAuth) ||
          (Vue.prototype.$modal("vue-frontend-auth-form", {
            login: this.needAuth,
            withClose: !0,
          }),
          (this.needAuth = null));
      },
    },
    template:
      '<div class="page-background" :class="\'is-device-\'+$device.class"> <div class="page-background-overlay"> <div ref=\'styles\'></div> <div class="page-background-extended" v-if="inited && i18n.inited"> <div v-if="$account.theme && $account.theme.extended" class="page-background-extended-items"><div v-for="a in $account.theme.extended.items" v-html="a.html"></div></div> <vue-frontend-blocks-menu v-if="$account.menu" v-model="$account.menu" mode="view"/> <router-view v-if="inited"/> <vue-frontend-actionbar :key="keyComponent"/> <component v-bind:is="\'vue-frontend-addons-\'+w.name" v-for="w in $account.widgets" v-model="w.data"/> <vue-frontend-blocks-html v-if="showHTML" :options=\'$account\'/> </div> <component :is="dynamicComponent.name" v-if="dynamicComponent.name" ref="dynamicComponent"/> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-market-discount", {
    props: ["hasPromocodes", "discountValue", "discounts"],
    computed: {
      promocode: function () {
        var e = null;
        for (i in this.discounts) {
          var t = this.discounts[i];
          if (t.promocode) {
            e = t.promocode;
            break;
          }
        }
        return e;
      },
    },
    template:
      '<transition name="fade"> <div class="row row-small" v-if="hasPromocodes || discountValue"> <div class="col-sm-1 col-xs-3" style="line-height: 0"><div class="product-container-outer slider-has-border"><div class="product-container fa fai fa-badge-percent"></div></div></div> <div class="col-sm-11 col-xs-9"> <div class="row row-small"> <div class="col-sm col-xs"> <span v-if="discountValue && !promocode">{{\'Скидка\'|gettext}}</span> <span v-else>{{\'Промокод\'|gettext}}</span> <div style="font-size: 70%;color: #777" v-if="hasPromocodes"> <div class="tags has-addons" v-if="promocode"><span class="tag">{{promocode}}</span><a role="button"tabindex="0" class="tag is-delete" @click="$emit(\'clearPromocode\')"></a></div> <a v-else style="text-decoration: underline;opacity: .7" @click="$emit(\'openPromocodeForm\')">{{\'Активировать промокод\'|gettext}}</a> </div> </div> <div class="col-sm-3 col-xs col-shrink has-text-nowrap has-text-right"> <transition name="fade"> <span v-if="discountValue">-&nbsp;{{discountValue|currency}}</span> </transition> </div> </div> </div> </div> </transition>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-page-blocks", {
    props: {
      fields: Object,
      data: Object,
      page_id: String,
      page_filename: String,
      param_id: String,
      part: String,
      isEmbeded: Boolean,
      showBlockedMessage: Boolean,
      excludeTypes: {
        default: [],
      },
    },
    data: function () {
      return {
        prefix: "",
      };
    },
    mounted: function () {
      this.prepareStyles();
    },
    watch: {
      showBlockedMessage: function (e) {
        this.$emit("update:showBlockedMessage", e);
      },
      fields: function () {
        this.prepareStyles();
      },
    },
    computed: {
      mode: function () {
        return -1 == document.location.pathname.indexOf("template:")
          ? "view"
          : "edit";
      },
    },
    methods: {
      isTransparentSection: function (e) {
        var t =
          e.indent &&
          e.indent.on &&
          e.indent.border &&
          0 < e.indent.border.width &&
          e.indent.border.color &&
          !isTransparentColor(e.indent.border.color);
        return (
          (!e.bg || !e.bg.color || isTransparentColor(e.bg.color)) &&
          !t &&
          !(e.bg && e.bg.picture)
        );
      },
      classSection: function (e, t) {
        var n = this.fields;
        return [
          null == e.section ||
          null == e.section.bg ||
          null == e.section.bg.color
            ? null
            : "is-" + lightOrDark(ColorsFactory.getColor(e.section.bg.color)),
          e.section
            ? "has-s s-" +
              this.prefix +
              t +
              " s-" +
              e.section.section_id +
              (this.isTransparentSection(e.section) ? " is-transparent" : "")
            : null,
          null != e.section && null != e.section.indent && e.section.indent.on
            ? " has-indent"
            : null,
          n[t + 1] && n[t + 1].section
            ? " has-next-s" +
              (this.isTransparentSection(n[t + 1].section)
                ? " is-next-transparent"
                : "")
            : null,
          {
            " is-empty": !e.items.length,
          },
        ];
      },
      checkTariff: function (e) {
        this.$auth.isAllowTariff(e) || (this.showBlockedMessage = !0);
      },
      prepareStyles: function () {
        var i = this;
        this.prefix = this.page_id
          ? this.page_id.toString().replace(".", "_") + "-"
          : "";
        var o = {},
          s = StylesFactory.getEmptySection(this.$account.theme);
        _.each(this.fields, function (e, t) {
          var n;
          e.section &&
            (e.section &&
              e.section.bg &&
              e.section.bg.picture &&
              (e.section.bg.picture.link =
                "//" +
                Vue.prototype.$account.storage_domain +
                "/p/" +
                e.section.bg.picture.filename),
            (n = StylesFactory.restoreSection(e.section, i.$account.theme, s)),
            StylesFactory.prepareSectionStyles(
              n,
              i.prefix + t,
              i.$account.theme,
              o,
              void 0,
              "page",
              i.$account.storage_domain,
              i.isEmbeded
            ),
            (e.section = n));
        }),
          StylesFactory.updateCSSBlock(o, this.$refs.styles);
      },
      loadEntry: function (e) {
        return (
          (e = "vue-frontend-blocks-" + e), window.$app.loadComponent(e), e
        );
      },
    },
    template:
      '<div> <div ref=\'styles\'></div> <div class="is-flex-fullheight"> <div class="blocks-section is-empty"><div><div class="page-container"></div></div></div> <div v-for="(p, j) in fields" class="blocks-section" :class="classSection(p, j)"> <div> <div :class="{\'page-container\': !isEmbeded}"> <div class="section-main" v-if="p.items.length"> <div> <div> <div class="block-item" v-for="(f, i) in p.items" :name="f.anchor" v-if="excludeTypes.indexOf(f.block_type_name) == -1" :key="i" :class="[\'block-\'+f.block_type_name, {\'is-textable\': f.block_type_name == \'text\', \'is-headline\': (f.block_type_name == \'text\') && (f.options != undefined) && (f.options.text_size != undefined) && f.options.text_size[0] == \'h\', \'block-item-locked\': !$auth.isAllowTariff(f.tariff), \'is-hidden\': (f.visible != undefined) && !f.visible}, ((f.options != undefined) && (f.options.padding != undefined) && f.options.padding.on)?(\'has-pb-\'+f.options.padding.bottom+\' has-pt-\'+f.options.padding.top):null, \'b-\'+f.block_id]" @click="checkTariff(f.tariff)" :key="f.block_id"> <div> <component v-bind:is="loadEntry(f.block_type_name)" :options="f.options" :data="data" :section="p.section" :block_id="f.block_id" :block="f" :account="$account" :theme="$account.theme" :index="i" :page_id="page_id" :page_filename="page_filename" :param_id="param_id" :part="part" @refreshPage="$parent.fetchData" :isEmbeded="isEmbeded" :mode="mode"/> </div> </div> <vue-frontend-brandlink v-if="!isEmbeded && j== fields.length - 1 && p.section != null && (fields[fields.length-1].section.indent == undefined || !fields[fields.length-1].section.indent.on)"/> </div> </div> </div> </div> </div> </div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-page", {
    data: function () {
      return {
        showBlockedMessage: !1,
        fields: [],
        options: {},
        data: null,
        isFetching: !1,
        page_id: null,
      };
    },
    props: ["page_filename", "part", "param_id"],
    created: function () {
      (this.$api.cacheKeyFunc = function (e, t) {
        return e + "?" + $mx.param(t);
      }),
        window.data
          ? (this.initData(window.data, !0), delete window.data)
          : this.fetchData(),
        $events.on("reload", this.reload);
    },
    mounted: function () {
      location.hash && $page.scrollTo(location.hash.substr(1));
    },
    watch: {
      page_filename: function () {
        this.fetchData();
      },
      part: function () {
        this.fetchData();
      },
      param_id: function () {
        this.fetchData();
      },
    },
    computed: {
      brandlinkOutside: function () {
        return (
          !this.fields.length ||
          null == this.fields[this.fields.length - 1].section ||
          (null != this.fields[this.fields.length - 1].section.indent &&
            this.fields[this.fields.length - 1].section.indent.on)
        );
      },
      current_page_id: function () {
        return this.page_id ? this.page_id : this.$page.page_id;
      },
      foundBlocked: function () {
        for (var e = 0; e < this.fields.length; e++)
          for (var t = 0; t < this.fields[e].items.length; t++)
            if (!this.$auth.isAllowTariff(this.fields[e].items[t].tariff))
              return !0;
        return !1;
      },
      pageClasses: function () {
        var e = [];
        return (
          this.options &&
            (e.push("max-page-container-" + (this.options.max_width || "lg")),
            null != this.options.valign &&
              e.push("page-valign-" + this.options.valign)),
          e
        );
      },
    },
    methods: {
      reload: function () {
        this.fetchData("account");
      },
      initData: function (e, t) {
        var n = this;
        null != e.account &&
          _.each(prepareAccount(e.account), function (e, t) {
            n.$set(n.$account, t, e);
          }),
          (this.fields = this.checkFields(e.fields)),
          (this.options = e.options),
          (this.data = e.data || null),
          (this.$page.page_filename =
            this.page_filename ||
            (this.part ? null : this.$account.main_page_id.toString(16))),
          (this.$page.page_id = this.page_id = e.page_id || null),
          (this.$page.max_width = e.options.max_width || "lg"),
          null != e.seo &&
            null != e.seo.title &&
            (document.title = e.seo.title),
          e.page_id &&
            $events.fire("pageview", {
              page_id: e.page_id,
              profile_id: this.$account.profile_id,
            }),
          $events.fire("contentupdated"),
          t && this.$actionbar.clear();
      },
      fetchData: _.debounce(function () {
        var t = this,
          n =
            0 < arguments.length && void 0 !== arguments[0]
              ? arguments[0]
              : null,
          e = this.$history.prev,
          i = this.$router.currentRoute;
        null == e ||
          ("part" != i.name && "part.index" != i.name) ||
          ("part" != e.name && "part.index" != e.name) ||
          e.params.part != i.params.part ||
          e.params.part;
        (this.isFetching = !0),
          this.$api
            .get("page/get", {
              params: _.filter({
                part: this.part,
                page_id: this.page_filename || null,
                extra: n,
                param_id: this.param_id,
              }),
            })
            .then(function (e) {
              null != e.redirect
                ? t.$router.replace(e.redirect)
                : (t.initData(e.response, !n),
                  t.$nextTick(function () {
                    $scroll.scroll();
                  })),
                (t.isFetching = !1);
            });
      }, 1),
      checkFields: function (e) {
        return (
          _.each(e, function (e) {
            _.each(e.items, function (e) {
              (e.tariff = "basic"), (e.visible = !0);
            });
          }),
          e
        );
      },
    },
    template:
      '<div class="page-content" :class="pageClasses"> <a class="header-banner lock-footer has-background-black" v-if="!$account.has_nickname && $account.allow_by_session && !$account.allow_by_token" style="position: inherit" target="_blank" :href="\'https://\'+this.$account.domain+\'/profile/pages/#publish\'"> <div class="container has-mb-2 has-mt-2 is-text-centered" style="justify-content: center">{{\'Страница недоступна для просмотра всем. Для решения этой проблемы вам необходимо подключить профиль или доменное имя\'|gettext}}</div> </a> <div class="is-flex-fullheight"> <div class="is-flex-fullheight"> <div class="container has-mt-3" v-if="$account.lock_message"> <div class="message is-danger block-text has-text-centered"><div class="message-body">{{$account.lock_message}}</div></div> </div> <main class="is-flex-fullheight"> <vue-frontend-page-blocks :fields="fields" :data="data" :page_id="current_page_id" :page_filename="page_filename" :param_id="param_id" :part="part" :showBlockedMessage.sync="showBlockedMessage" :class="{\'is-flex-fullheight\': !brandlinkOutside}"/> <vue-frontend-brandlink v-if="brandlinkOutside && !isFetching"/> </main> </div> </div> <div class="footer-banner lock-footer has-background-black has-close" :class="{\'is-closed\': !showBlockedMessage}" @click="showBlockedMessage = false" v-if="foundBlocked"> <div class="container has-mb-2 has-mt-2">{{\'К сожалению эта функция была заблокирована, так как владелец страницы своевременно не оплатил ее. Если вас не затруднит, сообщите владельцу страницы о данной проблеме\'|gettext}}</div> </div> </div>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-user-change-form", {
    data: function () {
      return {
        isUpdating: !1,
        isFetching: !0,
        step: 1,
        code: "",
        errors: {},
        fields: {},
      };
    },
    props: ["action", "values"],
    created: function () {
      var e = {
        password: {
          value: {
            name: "value",
            typename: "password",
            title: this.$gettext("Новый пароль"),
            value: "",
            disabled: !1,
          },
          base: {
            typename: "password",
            title: this.$gettext("Повторите новый пароль"),
            value: "",
            disabled: !1,
          },
        },
        email: {
          base: {
            typename: "email",
            title: this.$gettext("Старый email"),
            value: this.values.email,
            disabled: !0,
          },
          value: {
            name: "value",
            typename: "email",
            title: this.$gettext("Новый email"),
            value: "",
            disabled: !1,
          },
        },
      };
      this.fields = e[this.type];
    },
    mounted: function () {
      console.log(
        $mx(this.$el).find("input"),
        $mx(this.$el).find('input[name="value"]').length
      ),
        $mx(this.$el).find('input[name="value"]').focus();
    },
    computed: {
      value: function () {
        return this.fields.value.value;
      },
      type: function () {
        return this.action.type;
      },
    },
    methods: {
      updateData: function () {
        var t = this;
        (this.isUpdating = !0),
          (this.errors = {}),
          this.$api
            .post("user/profile/action", {
              params: {
                action: this.type,
                value: this.value,
                base: this.fields.base.value,
                step: this.step,
                code: this.code,
              },
            })
            .then(function (e) {
              if ("success" == e.result)
                switch (t.step) {
                  case 1:
                    (t.fields.value.disabled = !0),
                      (t.fields.base.disabled = !0),
                      (t.step = 2);
                    break;
                  case 2:
                    "email" == t.type && t.$parent.parent.fetchData(),
                      t.$parent.close();
                }
              else t.errors = e.errors;
              t.isUpdating = !1;
            });
      },
    },
    template:
      '<form class="modal-card user-change-form has-form-normal" @submit.prevent="updateData"> <header class="modal-card-head"> <p class="modal-card-title">{{action.title}}</p> <button type="button" class="modal-close is-large" @click="$parent.close()"></button> </header> <section class="modal-card-body"> <div class="block-item"> <div class="block-form"> <vue-frontend-form-elements :fields="fields" :isLoading.sync="isUpdating" ref="elements" :errors="errors"/> <div v-if="step == 2"> <div class="message is-success has-mt-3 has-mb-2"><div class="message-body">{{\'Мы отправили проверочный код на вашу электронную почту. Введите его и нажмите кнопку "Продолжить"\'|gettext}}</div></div> <div :class="{\'has-error\': errors.code}"> <label class="label">{{\'Код\'|gettext}}</label> <vue-frontend-components-verifyfield v-model="code" :disabled="isUpdating"/> <p class="help is-danger" v-if="errors.code" style="margin-top:-.5rem">{{errors.code}}</p> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-medium is-fullwidth-mobile is-clear" type="button" @click="$parent.close()" :disabled="isUpdating">{{\'Отмена\'|gettext}}</button> <button class="button is-medium is-fullwidth-mobile is-primary" type="submit" :class="{\'is-loading\': isUpdating}" :disabled="!value">{{\'Продолжить\'|gettext}}</button> </footer> <b-loading :is-full-page="false" :active.sync="isFetching"></b-loading> </form>',
  }),
  window.$app.defineComponent("frontend", "vue-frontend-vbar", {
    data: function () {
      return {
        dragging: {
          enable: !1,
          axis: "",
          offset: "",
        },
        bars: {
          horizontal: {
            elm: "",
            parent: "",
            size: 0,
          },
          vertical: {
            elm: "",
            parent: "",
            size: 0,
          },
        },
        wrapperObj: {
          elm: "",
          scrollHeight: "",
          scrollWidth: "",
          scrollLeft: "",
          scrollTop: "",
        },
        container: {
          elm: "",
          scrollHeight: "",
          scrollWidth: "",
        },
      };
    },
    mounted: function () {
      addResizeListener(this.$refs.container, this.resize),
        addResizeListener(this.$refs.wrapperRef.children[0], this.resize),
        document.addEventListener("mousemove", this.onDrag),
        document.addEventListener("touchmove", this.onDrag),
        document.addEventListener("mouseup", this.stopDrag),
        document.addEventListener("touchend", this.stopDrag),
        this.getSizes();
    },
    beforeDestroy: function () {
      removeResizeListener(this.$refs.container, this.resize),
        removeResizeListener(this.$refs.wrapperRef.children[0], this.resize),
        document.removeEventListener("mousemove", this.onDrag),
        document.removeEventListener("touchmove", this.onDrag),
        document.removeEventListener("mouseup", this.stopDrag),
        document.removeEventListener("touchend", this.stopDrag);
    },
    computed: {
      propWrapperSize: function () {
        return this.wrapper ? this.wrapper : "";
      },
      propBarVertical: function () {
        return this.vBar ? this.vBar : "";
      },
      propBarInternalVertical: function () {
        return this.vBarInternal ? this.vBarInternal : "";
      },
      propBarHorizontal: function () {
        return this.hBar ? this.hBar : "";
      },
      propBarInternalHorizontal: function () {
        return this.hBarInternal ? this.hBarInternal : "";
      },
      barSizeVertical: function () {
        if (this.bars.horizontal.size && this.bars.vertical.size)
          return {
            height: "calc(100% - 16px)",
          };
      },
      barSizeHorizontal: function () {
        if (this.bars.horizontal.size && this.bars.vertical.size)
          return {
            width: "calc(100% - 16px)",
          };
      },
      barInternalVertical: function () {
        var e = this.getBarInternal("Y");
        return {
          height: this.bars.vertical.size + "px",
          top: e + "px",
        };
      },
      barInternalHorizontal: function () {
        var e = this.getBarInternal("X");
        return {
          width: this.bars.horizontal.size + "px",
          left: e + "px",
        };
      },
      validationScrolls: function () {
        return this.bars.horizontal.size
          ? this.bars.vertical.size
            ? void 0
            : "overflowY: hidden"
          : "overflowX: hidden";
      },
      width: function () {
        return this.$refs.wrapperRef.getBoundingClientRect().width;
      },
      shadowStyle: function () {
        return (
          "-webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 1.0) " +
          Math.min((this.wrapperObj.scrollLeft / 80) * 10, 10) +
          "%, rgba(0, 0, 0, 1.0) " +
          (100 -
            Math.min(
              ((this.wrapperObj.scrollWidth -
                this.wrapperObj.scrollLeft -
                this.container.scrollWidth) /
                80) *
                10,
              10
            )) +
          "%, transparent 100%);"
        );
      },
    },
    methods: {
      scroll: function () {
        this.getSizes(0, 0);
      },
      resize: function () {
        this.getSizes();
      },
      getBarInternal: function (e) {
        var t = void 0,
          n = void 0,
          i = void 0,
          o = void 0,
          s = void 0,
          s = this.bars.horizontal.size && this.bars.vertical.size ? 40 : 0;
        return (
          "X" === e
            ? ((t = this.wrapperObj.scrollLeft),
              (n = this.wrapperObj.scrollWidth),
              (i = this.bars.horizontal.size + s),
              (o = this.container.scrollWidth))
            : "Y" === e &&
              ((t = this.wrapperObj.scrollTop),
              (n = this.wrapperObj.scrollHeight),
              (i = this.bars.vertical.size + s),
              (o = this.container.scrollHeight)),
          (t / (n - o)) * (o - i)
        );
      },
      getCoordinates: function (e, t) {
        var n = void 0,
          i = void 0,
          o = void 0,
          s = void 0,
          r = void 0;
        return (
          "X" === t
            ? ((n = this.wrapperObj.scrollWidth),
              (i = this.bars.horizontal.size),
              (o = this.container.scrollWidth),
              (s = this.container.elm.offsetLeft),
              (r = e.clientX - this.dragging.offset))
            : "Y" === t &&
              ((n = this.wrapperObj.scrollHeight),
              (i = this.bars.vertical.size),
              (o = this.container.scrollHeight),
              (s =
                this.container.elm.offsetTop - 1.4 * this.bars.vertical.size),
              (r = e.clientY - this.dragging.offset)),
          ((n - o) * (r - s)) / (o - i)
        );
      },
      startDrag: function (e) {
        e.preventDefault(), e.stopPropagation();
        var t = (e = e.changedTouches
            ? e.changedTouches[0]
            : e).target.getAttribute("data-axis"),
          n = e.target.getAttribute("data-drag-source"),
          i = void 0;
        "Y" === t
          ? "bar" === n
            ? (i =
                e.explicitOriginalTarget.offsetTop +
                1.4 * this.bars.vertical.size)
            : "internal" === n &&
              (i = e.clientY - this.bars.vertical.elm.offsetTop)
          : "X" === t &&
            ("bar" === n
              ? (i =
                  e.explicitOriginalTarget.offsetLeft +
                  1.4 * this.bars.horizontal.size)
              : "internal" === n &&
                (i = e.clientX - this.bars.horizontal.elm.offsetLeft)),
          (this.dragging = {
            enable: !0,
            axis: t,
            offset: i,
          });
      },
      getWrapper: function () {
        return this.$refs.wrapperRef;
      },
      scrollTo: function (e, t) {
        var n = this.getWrapper();
        (n.scrollLeft = e), (n.scrollTop = t), this.getSizes();
      },
      onDrag: function (e) {
        var t;
        this.dragging.enable &&
          (e.preventDefault(),
          e.stopPropagation(),
          (e = e.changedTouches ? e.changedTouches[0] : e),
          (t = this.$refs.wrapperRef),
          "X" === this.dragging.axis
            ? (t.scrollLeft = this.getCoordinates(e, "X"))
            : "Y" === this.dragging.axis &&
              (t.scrollTop = this.getCoordinates(e, "Y")),
          this.getSizes());
      },
      stopDrag: function () {
        this.dragging.enable &&
          (this.dragging = {
            enable: !1,
            axis: "",
          });
      },
      getSizes: function () {
        var e = this.$refs.wrapperRef,
          t = this.$refs.container,
          n = this.$refs.verticalBar,
          i = this.$refs.verticalInternalBar,
          o = this.$refs.horizontalBar,
          s = this.$refs.horizontalInternalBar;
        (this.wrapperObj = {
          elm: e,
          scrollHeight: e ? e.scrollHeight : 0,
          scrollWidth: e ? e.scrollWidth : 0,
          scrollLeft: e ? e.scrollLeft : 0,
          scrollTop: e ? e.scrollTop : 0,
        }),
          (this.container = {
            elm: t,
            scrollHeight: t ? t.scrollHeight : 0,
            scrollWidth: t ? t.scrollWidth : 0,
          }),
          (this.bars.horizontal.elm = s),
          (this.bars.horizontal.parent = o),
          (this.bars.horizontal.size =
            24 < this.wrapperObj.scrollWidth - this.container.scrollWidth &&
            this.wrapperObj.scrollWidth - this.container.scrollWidth != 0
              ? (this.container.scrollWidth / this.wrapperObj.scrollWidth) *
                this.container.scrollWidth
              : 0),
          (this.bars.vertical.elm = i),
          (this.bars.vertical.parent = n),
          (this.bars.vertical.size =
            24 < this.wrapperObj.scrollHeight - this.container.scrollHeight &&
            this.wrapperObj.scrollHeight - this.container.scrollHeight != 0
              ? (this.container.scrollHeight / this.wrapperObj.scrollHeight) *
                this.container.scrollHeight
              : 0);
      },
    },
    props: ["wrapper", "vBar", "vBarInternal", "hBar", "hBarInternal"],
    template:
      '<div id="vbar" :class="propWrapperSize"> <div class="bar--container" ref="container" :style="shadowStyle"> <div class="bar--vertical" ref="verticalBar" v-show="bars.vertical.size" :style="barSizeVertical" :class="propBarVertical" @touchstart="startDrag" @mousedown="startDrag" data-axis="Y" data-drag-source="bar"> <div class="bar--vertical-internal" ref="verticalInternalBar" :style="barInternalVertical" :class="propBarInternalVertical" @touchstart="startDrag" @mousedown="startDrag" data-axis="Y" data-drag-source="internal"></div> </div> <div class="bar--horizontal" ref="horizontalBar" v-show="bars.horizontal.size" :style="barSizeHorizontal" :class="propBarHorizontal" @touchstart="startDrag" @mousedown="startDrag" data-axis="X" data-drag-source="bar"> <div class="bar--horizontal-internal" ref="horizontalInternalBar" :style="barInternalHorizontal" :class="propBarInternalHorizontal" @touchstart="startDrag" @mousedown="startDrag" data-axis="X" data-drag-source="internal"></div> </div> <div class="bar--wrapper has-scroll-emulate" ref="wrapperRef" :style="validationScrolls" @wheel="scroll" @touchmove="scroll"> <slot></slot> </div> </div> </div>',
  }),
  window.$app.defineModule("frontend", [
    {
      path: "/",
      props: !0,
      component: "vue-frontend-index",
      children: [
        {
          path: "",
          props: !0,
          name: "index",
        },
        {
          path: "/p/:page_filename/",
          props: !0,
          name: "page",
        },
        {
          path: "/:part/",
          props: !0,
          name: "part.index",
        },
        {
          path: "/:part/:page_filename/",
          props: !0,
          name: "part",
        },
        {
          path: "/:part/:page_filename/:param_id/",
          props: !0,
          name: "param",
        },
      ],
    },
  ]);
