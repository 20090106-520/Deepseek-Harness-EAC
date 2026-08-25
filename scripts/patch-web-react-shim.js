'use strict';

// dsh-client-web-react 运行时垫片（幂等、锚点不匹配时跳过且绝不损坏文件）。
//
// 背景：dsh 内核升级到 0.1.1-rc.2 后，web 前端外壳（dsh-web-frontend dist
// bundle 的 staticModules 种子表）不再内置 @deepseek-ai/dsh-client-web-react，
// 而内核自带的 5 个官方插件（session-manager / conversation-tweaks /
// prompt-custom / openclaw-bridge / third-party-thinking）与 better-sidebar 的
// 动态 chunk 仍在构建期把它声明为 external，运行期 require/import 时命中
// 「missed the module table」直接炸掉整个插件加载。
//
// 修复方式：往 dsh-web-frontend/dist/index.html 注入一段经典脚本，在页面
// 解析阶段把缺失模块以「惰性工厂」身份注册进 window.__ModuleLoader__ 队列：
//
//   · 注册契约与插件 client.js 完全一致：load({ id, factory(require) })；
//   · factory 只导出插件真正用到的 bindSnapshotSelector —— 用 React 官方
//     use-sync-external-store-with-selector（MIT，生产压缩版内联）实现，
//     行为与旧内核随包分发的 web-react 一致（equality 原样透传，不加默认）；
//   · 同步 require（client.js makeRequire 工厂分支）与异步 import()
//     （better-sidebar CHUNK_EXTERNALS 路径）都走同一张工厂表，一处注册
//     两处受益；
//   · 脚本放在 </body> 前，执行时 __ModuleLoader__ 门面已在 <head> 就绪
//     （服务端 bootInjections 注入），Vite module 入口是 defer 语义，天然
//     晚于本脚本 —— 注册先于任何插件 materialize。
//
// 用法：
//   node scripts/patch-web-react-shim.js [<node_modules 根目录>]
// 同时导出 patchWebReactShim(nmRoot, log) 供 main.js 启动补丁复用（覆盖
// profile 共享 junction / 内置 app 副本 / agent overlay 三处运行根）。

const fs = require('node:fs');
const path = require('node:path');

const MARKER = 'dsh-desktop patch (web-react shim)';
const TARGET_ID = '@deepseek-ai/dsh-client-web-react';

// index.html 锚点：注入到 </body> 前（dist 是 Vite 纯净产物，结构稳定）。
const BODY_ANCHOR = '</body>';
const HEAD_ANCHOR = '<script type="module" crossorigin src="/assets/';

// uSES 生产压缩版原文（use-sync-external-store-with-selector@3，MIT，
// React 官方发行物），以 CommonJS 形态引用 "react"，由工厂内的 require 提供。
const USES_SRC = '\'use strict\';var g=require("react");function n(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var p="function"===typeof Object.is?Object.is:n,q=g.useSyncExternalStore,r=g.useRef,t=g.useEffect,u=g.useMemo,v=g.useDebugValue;'
  + 'exports.useSyncExternalStoreWithSelector=function(a,b,e,l,h){var c=r(null);if(null===c.current){var f={hasValue:!1,value:null};c.current=f}else f=c.current;c=u(function(){function a(a){if(!c){c=!0;d=a;a=l(a);if(void 0!==h&&f.hasValue){var b=f.value;if(h(b,a))return k=b}return k=a}b=k;if(p(d,a))return b;var e=l(a);if(void 0!==h&&h(b,e))return b;d=a;return k=e}var c=!1,d,k,m=void 0===e?null:e;return[function(){return a(b())},null===m?void 0:function(){return a(m())}]},[b,e,l,h]);var d=q(a,c[0],c[1]);'
  + 't(function(){f.hasValue=!0;f.value=d},[d]);v(d);return d};';

function buildScript() {
  return [
    '<script>/* ' + MARKER + ': 补齐内核 0.1.1-rc.2 缺失的 @deepseek-ai/dsh-client-web-react */',
    '(function(){',
    'try{',
    'window.__ModuleLoader__.load({id:' + JSON.stringify(TARGET_ID) + ',factory:function(require){',
    'var module={exports:{}};',
    '(new Function("module","exports","require",' + JSON.stringify(USES_SRC) + '))(module,module.exports,require);',
    'var useSES=module.exports.useSyncExternalStoreWithSelector;',
    'return{bindSnapshotSelector:function(w){',
    'var subscribe=function(fn){return w.subscribe(fn)};',
    'var getSnapshot=function(){return w.getSnapshot()};',
    'return function useSelector(sel,eq){',
    'return useSES(subscribe,getSnapshot,void 0,sel,eq);}}}}});',
    '}catch(e){console.error("' + MARKER + ': registration failed",e)}',
    '})();</script>'
  ].join('\n');
}

/**
 * 对某个 node_modules 根目录应用 web-react 垫片补丁（幂等）。
 * @param {string} nmRoot node_modules 根目录
 * @param {(msg: string) => void} [log]
 * @returns {boolean} 是否实际修改了文件
 */
function patchWebReactShim(nmRoot, log = () => {}) {
  const file = path.join(nmRoot, '@deepseek-ai', 'dsh-web-frontend', 'dist', 'index.html');
  let src;
  try {
    src = fs.readFileSync(file, 'utf8');
  } catch (err) {
    log('web-react 垫片: 读取失败 ' + file + ': ' + err.message);
    return false;
  }
  if (src.includes(MARKER)) {
    log('web-react 垫片: 已应用，跳过 ' + file);
    return false;
  }
  if (!src.includes(BODY_ANCHOR) || !src.includes(HEAD_ANCHOR)) {
    log('web-react 垫片: 锚点未匹配（前端 dist 结构可能已变化），跳过 ' + file);
    return false;
  }
  src = src.replace(BODY_ANCHOR, buildScript() + '\n' + BODY_ANCHOR);
  try {
    fs.writeFileSync(file, src, 'utf8');
    log('web-react 垫片: 已应用 ' + file);
    return true;
  } catch (err) {
    log('web-react 垫片: 写入失败 ' + file + ': ' + err.message);
    return false;
  }
}

module.exports = { patchWebReactShim, MARKER };

if (require.main === module) {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..', 'node_modules');
  const ok = patchWebReactShim(root, (m) => console.log(m));
  console.log(ok ? 'patched — restart DSH Desktop to pick it up' : 'nothing to patch (already up to date or anchor mismatch)');
}
