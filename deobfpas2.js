 ========== API ENDPOINTS ==========
const API_BASE = 'https://api.layma.net';
const ENDPOINTS = {
  session:   '/api/traffic/session',
  visitor:   '/api/traffic/visitor',
  getcode:   '/api/traffic/getcode',
  checkcode: '/api/traffic/checkcode',
  go:        '/api/traffic/go/',
  mission:   '/api/traffic/mission/change',
  captchaNonce: '/api/traffic/captcha-nonce',
  qcaptcha: {
    init:    '/v1/init',
    signals: '/qcaptcha/v1/signals',
    solve:   '/v1/solve',
    skip:    '/v1/skip',
    verify:  '/v1/verify_passive',
    frame:   '/frame.html',
    jsUrl:   'https://js.103-141-140-153.sslip.io/api.js',
    baseUrl: 'https://frame.103-141-140-153.sslip.io',
  },
  hcaptcha:  'https://js.hcaptcha.com/1/api.js?render=explicit',
  admin: {
    campain: '/api/admin/campain',
    campainKey: '/api/admin/campain?keytoken=',
  }
};

// ========== BLACKLIST URLs ==========
const BLACKLIST_URLS = [
  'https://pastefy.app/TKphHBjA/raw',
  'https://pastefy.app/ZR3kGQZp/raw',
];

// ========== REGEX PATTERNS ==========
const PATTERNS = {
  trafficKey:     /(?:var\s+)?traffic_key\s*=\s*['"]([A-Za-z0-9_-]+)['"]/,
  trafficKeyAlt:  /trafficKey['"\s:=]+['"]?([A-Za-z0-9_-]{6,})['"]?/,
  trafficIndex:   /Traffic\/Index\/([A-Za-z0-9_-]+)/,
  trafficIndexAlt:/\/Traffic\/Index\/([A-Za-z0-9_-]+)/,
  keytoken:       /keytoken=([A-Za-z0-9_-]{6,})/,
  qCaptchaSiteKey1: /(?:qCaptchaSiteKey|qcaptchaSiteKey)\s*[:=]\s*['"]([^'"]+)['"]/,
  qCaptchaSiteKey2: /(?:(?:var|let|const)\s+)?(?:window\.)?qCaptchaSiteKey\s*=\s*['"]([^'"]+)['"]/,
  qCaptchaScriptUrl: /(?:qCaptchaScriptUrl|qcaptchaScriptUrl)\s*[:=]\s*['"]([^'"]+)['"]/,
  hCaptchaSiteKey: /hCaptchaSiteKey\s*=\s*['"]([^'"]+)['"]/,
  sitekey:        /(?:captcha|sitekey)\b[^"']*?['"]([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})['"]/,
  dataSitekey:    /data-sitekey\s*=\s*['"]([^'"]+)['"]/,
  dataQCaptcha:   /data-qcaptcha-sitekey\s*=\s*['"]([^'"]+)['"]/,
  ipv4:           /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/,
  scriptSrc:      /<script[^>]+src=['"]([^'"]+)['"]/,
  dataTrafficKey: /data-traffic-key=['"]([^'"]+)['"]/,
  laymaIndex:     /layma\.net\/Traffic\/Index\/([A-Za-z0-9_-]+)/,
  alphanumToken:  /[A-Za-z0-9_-]{8,}/,
};

// ========== STORAGE KEYS ==========
const STORAGE_KEYS = {
  waitTime:        'vnbypass_wait_time',
  autoChange:      'vnbypass_auto_change',
  autoOpenLink:    'vnbypass_auto_open_link',
  autoSaveManual:  'vnbypass_auto_save_manual_link',
  blacklistAutoChange: 'vnbypass_blacklist_auto_change',
  customBlacklist: 'vnbypass_custom_blacklist',
  manualLinks:     'vnbypass_manual_links',
  settingsCollapsed: 'vnbypass_settings_collapsed',
  visitTicket:     'cache_visit_ticket_',
  trafficSession:  'cache_traffic_session_',
  solution:        'cache_solution_',
  countStep:       'count_step_',
  laymaWidgetSession: 'layma_widget_session_',
  laymaTrafficWait: 'LayMaTrafficWaitClock',
};

// ========== KNOWN BLACKLISTED DOMAINS ==========
const BLACKLISTED_DOMAINS = [
  'dealevolution.io',
  'www.dealevolution.io',
  'silverspoonentp.in',
  'www.silverspoonentp.in',
  'kingstonsteelalloys.in',
  'www.kingstonsteelalloys.in',
  'perspektivaes.in.net',
  'sunwin.perspektivaes.in.net',
  'sunwin.goldfame.co.in',
  'agilafc.com',
  'www.agilafc.com',
  'matlamafc.com',
  'cherrylift.co',
  'annetlibeau.co',
  'ziaventures.co',
  'www.ziaventures.co',
  'emitur.com.co',
  'www.emitur.com.co',
  'goldfame.co.in',
  'go88gh.com',
  'go88yt.com',
  'sunwinbv.com',
  'sunwinkt.com',
  'sunwinmb.com',
  'sunwinvv.com',
];

// ========== UI ELEMENTS (CSS IDs/Classes) ==========
const UI = {
  wrapper:         '#vnbypass-wrapper',
  fancyHeader:     '.fancy-top-header',
  countdown:       '#script-countdown',
  progress:        '#script-progress',
  settingsHeader:  '#settings-header-toggle',
  settingsBody:    '#settings-body-collapse',
  settingsToggle:  '#settings-toggle-btn',
  settingsArrow:   '#settings-toggle-arrow',
  settingsText:    '#settings-toggle-text',
  inputWaitTime:   '#input-wait-time',
  toggleAutoChange: '#toggle-auto-change',
  toggleAutoOpen:  '#toggle-auto-open-link',
  toggleAutoSave:  '#toggle-auto-save-manual-link',
  toggleBlacklist: '#toggle-blacklist-auto-change',
  showBlacklist:   '#show-blacklist-list',
  showManualCache: '#show-manual-link-cache',
  btnXacNhan:      '#btn-xac-nhan',
  btnBaoLoi:       '#btn-baoloi',
  btnNativeOpen:   '#btn-native-open',
  btnNativeCopy:   '#btn-native-copy',
  btnNativeChange: '#btn-native-change',
  btnNativeRetry:  '#btn-native-retry',
  btnManualQuest:  '#btn-manual-quest',
  btnManualChange: '#btn-manual-change-quest',
  copyMessage:     '#copyMessage',
  linkFB:          '#linkFB',
  linkWeb:         '#linkWeb',
  videohd:         '#videohd',
  hinh_nv:         '#hinh_nv',
  qcwCounter:      '#qcw-counter',
  qcwStatus:       '#qcw-status',
  qcwSkip:         '#qcw-skip',
  qcwSubmit:       '#qcw-submit',
  qcwRetry:        '#qcw-retry',
  captchaTarget:   '#captcha-native-target',
  captchaTarget2:  '#captcha2-native-target',
};

// ========== CRYPTO CONFIG (QCaptcha) ==========
const CRYPTO = {
  curve:       'P-256',
  hash:        'SHA-256',
  aesMode:     'AES-GCM',
  namedCurve:  'P-256',
  // ECDH key exchange + HKDF-SHA-256 + AES-GCM-256
  // Client generates ephemeral P-256 keypair
  // Server pubkey embedded in challenge
  // Shared secret -> HKDF -> AES-GCM key -> encrypt solution
};

// ========== TRAFFIC SESSION PAYLOAD STRUCTURE ==========
/*
POST /api/traffic/session
{
  "Token": <QCaptchaToken>,
  "CampainId": <campainId>,
  "FingerprintData": <fingerprintJSON>,
  "QCaptchaToken": passedQToken || getQCaptchaToken(),
  "HCaptchaToken": getHCaptchaToken() || "",
  "CaptchaLaToken": getCaptchaLaToken() || "",
  "UserAgent": navigator.userAgent,
  "DeviceScreen": screen.width + ' x ' + screen.height,
}

POST /api/traffic/getcode
{
  "Code": <code>,
  "CampainId": <campainId>,
  "FingerprintData": <fpData>,
  "Token": <token>,
}

POST /api/traffic/checkcode
{
  "Code": <code>,
  "Token": <token>,
  ...fingerprint fields
}
*/

// ========== FINGERPRINT DATA FIELDS ==========
/*
collectFingerprintData() returns:
{
  userAgent, browser, browserVersion, platform, osVersion,
  language, languages, colorDepth, pixelRatio, screen,
  maxTouchPoints, deviceMemory, hardwareConcurrency,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,  // 'Asia/Ho_Chi_Minh'
  cookiesEnabled, touchEvents, mouseEvents,
  battery: { level, charging, chargingTime, dischargingTime },
  orientation: { supported, granted, available },
  uuid: clientInfo.uuid,
  createdAt: new Date().toISOString(),
  webdriver, automation, untrustedEvents,
}
*/

// ========== DISCORD ==========
const DISCORD = 'https://discord.gg/4WNZx7DMQ4';
const VERSION = 'VNBYPASS.COM - V1.1.3';

// ========== RAW STRINGS (all 203 bytecode blobs decoded) ==========

// ========== API CALLS & URLS ==========
const _API_STRINGS = [
  "https://"
];

// ========== DOM PROPERTIES & METHODS ==========
const _DOM_STRINGS = [
  "_0x514b60",
  "style",
  "setProperty",
  "block",
  "important",
  "_0x1791b9",
  "_0x26aab3",
  "_0x825825",
  "_0x423d9e",
  "setTimeout",
  "_0xd413f5",
  "function",
  "Promise",
  "resolve",
  "Number",
  "isFinite",
  "document",
  "getElementById",
  "tokenId",
  "String",
  "textContent",
  "getTokenId",
  "_0x1fbce5",
  "_0x4e5849",
  "campainId",
  "getCampainId",
  "_0x5c6ade",
  "_0x1fd8ed",
  "_0x3dbd5e",
  "undefined",
  "trafficKey",
  "_0x336679",
  "_0x3494b3p",
  "console",
  "groupCollapsed",
  "status",
  "groupEnd",
  "response",
  "string",
  "stringify",
  "_0x3cb00b",
  "_0x1069db",
  "_0x43e818",
  "window",
  "sessionStorage",
  "getItem",
  "_0x4ceff8",
  "_0x3d3056",
  "_0x4b74c4b",
  "_0x30c28d",
  "responseText",
  "parse",
  "sessionToken",
  "SessionToken",
  "setItem",
  "_0x558297",
  "_0x5507a2",
  "_0x74fd74",
  "forEach",
  "onload",
  "_0x3b591f",
  "_0x4b74c4",
  "_0x3494b3",
  "keyToken",
  "_0x33610c",
  "method",
  "_0xb7ee28",
  "headers",
  "_0x393729",
  "_0x743c1c",
  "_0x353a94",
  "_0x108f6b",
  "_0xac6a13",
  "_0x32d015",
  "_0x5be6aa",
  "getVisitorInfo",
  "_0x3d58e0",
  "Object",
  "assign",
  "token",
  "_0x36dff9",
  "location",
  "reload",
  "_0x352dba",
  "onloadD",
  "_0x4a63bf",
  "Token",
  "_0x3d7180",
  "innerHTML",
  "_0x4ff736",
  "beforeunload",
  "_0x259eab",
  "_0xdeb0bd",
  "closest",
  "_0x1b4cf2",
  "_0x281559",
  "hinh_nv",
  "indexOf",
  "remove",
  "createElement",
  "documentElement",
  "appendChild",
  "footer",
  "_0x20d69a",
  "_0x42d212",
  "querySelector",
  "_0x27ba48",
  "minHeight",
  "_0x4f8e54",
  "_0x5f584f",
  "_0x10ec8a",
  "_0x1859b0",
  "_0x3d89d5",
  "Pragma",
  "Expires",
  "_0x3c8d9a",
  "Array",
  "isArray",
  "_0x4bfa93",
  "blacklist",
  "_0x5acaaa",
  "onloadx",
  "_0x2785cb",
  "_0x2f88e7",
  "_0x12136c",
  "concat",
  "_0x28601f",
  "_0x20d69az",
  "_0x42d2122",
  "getAttribute",
  "_0x6be8ebV",
  "_0x2d2a4d",
  "origin",
  "pathname",
  "length",
  "_0x3b847d",
  "_0x3a799e",
  "_0x86d881",
  "google",
  "facebook",
  "tructiep",
  "localStorage",
  "_0x4c08a2",
  "_0x567757",
  "replace",
  "_0x4ea310",
  "_0x4ca0bf",
  "_0x317dad",
  "_0x5bc79a",
  "_0x5e88bf",
  "_0x6be8eb",
  "_0x2652f2",
  "_0x3985cd",
  "platform",
  "tagName",
  "toLowerCase",
  "keyword",
  "_0x46d3b2",
  "match",
  "_0x1c4a7f",
  "hcaptcha",
  "_0xc22ef50",
  "_0x23d456",
  "_0x42ea328",
  "hostname",
  "_0x295f56",
  "split",
  "slice",
  "_0x45099b",
  "8VJVTVfz",
  "_0x29ccc6",
  "_0x8d1783",
  "_0x73a6b2T",
  "_0x3259b2T",
  "_0x3b9c5b",
  "_0x73a6b2",
  "_0x39afa5",
  "_0x6e4216",
  "_0x592082",
  "scripts",
  "reduce",
  "filter",
  "Boolean",
  "_0xbae692",
  "_0x29683b",
  "_0x3259b2",
  "_0x370440",
  "_0xf3588e",
  "_0x241a00",
  "_0x58d9ed",
  "_0x4cda4f",
  "_0x231cc2",
  "_0x44170f",
  "_0x1eb396",
  "onloadP",
  "_0x5c733",
  "_0x1348e2",
  "_0x51cd59",
  "Accept",
  "Origin",
  "Referer",
  "fetch",
  "catch",
  "_0x55d8bd",
  "_0x2a46a7",
  "importKey",
  "_0x2f3134",
  "namedCurve",
  "generateKey",
  "deriveBits",
  "public",
  "privateKey",
  "TextEncoder",
  "encode",
  "encrypt",
  "getRandomValues",
  "Uint8Array",
  "exportKey",
  "publicKey",
  "clientPub",
  "_0x335722",
  "clz32",
  "_0x19833eR",
  "digest",
  "_0x19833e",
  "_0x2f7f26",
  "screen",
  "navigator",
  "userAgent",
  "languages",
  "deviceMemory",
  "maxTouchPoints",
  "webdriver",
  "DateTimeFormat",
  "resolvedOptions",
  "timeZone",
  "depth",
  "mouseEvents",
  "untrustedEvents",
  "keyboardNav",
  "floor",
  "random",
  "timeToClickMs",
  "333333",
  "clickOffsetPx",
  "track",
  "touchEvents",
  "touchRadii",
  "behavior",
  "powMs",
  "telemetry",
  "artifacts",
  "missingApis",
  "automation",
  "_0x5230c7",
  "className",
  "loading",
  "_0x55a39a",
  "_0x328f8eN",
  "_0x361079",
  "_0x1735c4",
  "shield",
  "_0x4abae5",
  "title",
  "badge",
  "loadingText",
  "_0x289ad3",
  "successCheck",
  "successText",
  "successSub",
  "_0x17abf4n",
  "_0x20376c",
  "alert",
  "click",
  "_0x934ab4d",
  "_0x49d950",
  "_0x205a0f",
  "classList",
  "_0x34b5daL",
  "parseInt",
  "_0xc09ff6",
  "_0xd50bc5",
  "clear",
  "prototype",
  "_0x351bf1",
  "delete",
  "_0x34b5da",
  "_0x2244c2",
  "_0x2c70b3",
  "_0x6c2526",
  "_0x328f8e",
  "_0x383134",
  "_0x5181f3",
  "disabled",
  "_0xd6e00e",
  "_0x27e7ed",
  "_0x23f7c1",
  "_0x26a4b9",
  "action",
  "answer",
  "powNonce",
  "_0x1c67c6",
  "solveMs",
  "_0x17abf4",
  "_0x25a609",
  "_0x4398a0",
  "message",
  "_0x4d0676",
  "question",
  "object",
  "single",
  "assets",
  "check",
  "refresh",
  "_0x2b3aae",
  "sitekey",
  "_0x2acc57",
  "pubkey",
  "challenge",
  "_0x1837f4",
  "_0x934ab4",
  "_0x2d95c1",
  "fromCharCode",
  "apply",
  "charCodeAt",
  "siteKey",
  "scriptUrl",
  "questOrigin",
  "mountEl",
  "_0x4ccbc7",
  "_0x756d06",
  "preventDefault",
  "returnValue",
  "_0x3bd57e",
  "abort",
  "AbortController",
  "signal",
  "_0xaeb2fd",
  "clearTimeout",
  "_0x266b17",
  "_0x5a0f69",
  "_0x3c7b88",
  "_0x58198a",
  "onloadz",
  "_0x25c40b",
  "_0x27f2f9",
  "_0x3993cd",
  "_0x114cfe",
  "_0x106cd0",
  "_0x28a318",
  "_0x9a13a9",
  "_0xee5807",
  "_0x411635",
  "success",
  "result",
  "redirectUrl",
  "RedirectUrl",
  "_0xd6951b",
  "_0x5ab236",
  "submit_",
  "script",
  "_0x3157d1",
  "_0x2a0011",
  "_0x25b3c6",
  "_0xa2dc33",
  "_0x3eb588",
  "_0x2faeea",
  "_0x2e7d63",
  "_0x1419b4",
  "_0x5f2002",
  "_0x4ebf7d",
  "_0x24ebae",
  "_0x1060d5R",
  "_0x4db87a",
  "_0x3ff177",
  "_0x2982af",
  "value",
  "_0x1b1fa0",
  "_0x59879a",
  "invalid",
  "_0x2d1c61",
  "focus",
  "_0x529bf9",
  "_0x1060d5",
  "_0x50aefd",
  "_0xf6a309",
  "textContentL",
  "_0x585bcb",
  "input",
  "_0x421819",
  "visitTicket",
  "trafficId",
  "_0x1477a1",
  "_0x441443",
  "_0xb49325",
  "_0xa6762d",
  "readyState",
  "_0x4e1206",
  "responseURL",
  "finalUrl",
  "XMLHttpRequest",
  "toUpperCase",
  "_0x3a17a4",
  "looksLikeIpv4",
  "_0x25b1fd",
  "parseIpPayloadf",
  "startsWith",
  "endsWith",
  "target",
  "checked",
  "_0x44270c",
  "_0x436a49",
  "_0x40c14f",
  "_0x5634cb",
  "click6",
  "cssText",
  "button",
  "_0x36b970",
  "removeItem",
  "click8",
  "_0x307a01",
  "_0x28082f",
  "_0x24512e",
  "_0x41d8f8",
  "_0x6fe043",
  "_0x88773b",
  "placeholder",
  "isNaN",
  "_0x1dbffb",
  "INPUT",
  "BUTTON",
  "_0x435582",
  "maxHeight",
  "opacity",
  "600px",
  "_0x447fcd",
  "_0x31cca7",
  "transform",
  "false",
  "_0xda0ae4",
  "outerHTML",
  "_0x3808db",
  "qCaptchaSiteKey",
  "delay",
  "_0x2edeea",
  "_0x437724",
  "getcode",
  "Action",
  "_0x196107",
  "_0x4fe902",
  "_0x2d4ab7",
  "clearInterval",
  "_0xb31e28",
  "_0x481d67",
  "innerText",
  "_0x2ab9f8",
  "setInterval",
  "_0x483cf2",
  "_0x1194f3",
  "_0x58fd4c",
  "_0x4f4160",
  "_0x2ea388",
  "_0x4e1caa",
  "_0x576e7e",
  "_0x1a6445",
  "_0x5c68cd",
  "_0x42c493",
  "_0x5c68cdh",
  "_0x191c89",
  "_0x3b6560",
  "_0x37cf5e",
  "_0x2173f0",
  "_0x16f4f1",
  "useQCaptcha",
  "_0x5e61ae",
  "_0x32d9e0",
  "payload",
  "_0x281739",
  "count_step_",
  "count_step",
  "_0x578d69",
  "_0x6c3179",
  "_0x425b67",
  "_0x3b0b55",
  "clipboard",
  "writeText",
  "_0x40e069",
  "Chrome",
  "browser",
  "browserVersion",
  "cookies",
  "mobile",
  "Windows",
  "osVersion",
  "_0x3deeaa",
  "getReferrer",
  "referrer",
  "_0x3d3569",
  "_0x43c4b0",
  "solution",
  "_0x5305d6",
  "qCaptchaToken",
  "hCaptchaToken",
  "codeInput",
  "_0x281538",
  "parentNode",
  "transparent",
  "_0x14d768",
  "_0x5a56c2",
  "_0x1630fe",
  "Message",
  "_0x3babfd",
  "_0x4dd41a",
  "_0x3edb53",
  "_0x3f1ae1",
  "callback",
  "_0x20fb6c",
  "_0x26d018",
  "getResponse",
  "_0x4f6429",
  "_0x2edd96",
  "_0x31aa33",
  "_0x521f36",
  "_0x3f81c0",
  "_0x21dec7",
  "setAttribute",
  "_0xc22ef5",
  "render",
  "_0x1293c5",
  "_0x213830",
  "_0xcae58a",
  "_0x2fd9d6",
  "_0x420cca2",
  "_0x420cca",
  "8AUTO_CHANGE_MISSION_ON_ERROR",
  "WAIT_TIME",
  "gmXhr",
  "uWindow",
  "unsafeWindow",
  "looksLikeIpv6",
  "parseIpPayload",
  "_0x132221",
  "_0x53669b",
  "_0x2412cd",
  "parentElement",
  "insertBefore",
  "firstChild",
  "getVisitorUUID",
  "uuidv4",
  "_0x92043c",
  "_0x402d79",
  "_0x39cba1",
  "change",
  "nextSibling",
  "_0x20a4cf",
  "_0x225a86",
  "domain",
  "Domain",
  "qcaptchaSiteKey",
  "async",
  "defer",
  "_0xffc4c1",
  "_0x42071c"
];

// ========== CSS / SELECTORS ==========
const _CSS_STRINGS = [
  "display",
  "height",
  "display ",
  ".heading, .box-step-note, .box-step-link, .box-step-title, .box-copy, .box-google, ",
  ".box-step-getCode, .box-video, #videohd, #xuong, .box-linkFB-wrap, .box-btn-copy, ",
  ".box-google-note, #btn-xac-nhan, #btn-baoloi, .box-step-footer, .box-footer, footer, ",
  ".intro, .progress, .warning, aside.warning, section.step, .step, .step-body, .verify-fields, ",
  ".videos, .video-grid, .video-item, .responsive-video, .code-image, .search-mock, ",
  ".btn { ",
  ".heading",
  ".box-step-note",
  ".box-step-link",
  ".box-step-title",
  ".box-copy",
  ".box-google",
  ".box-video",
  "#videohd",
  "#xuong",
  ".box-btn-copy",
  "#btn-xac-nhan",
  "#btn-baoloi",
  ".box-footer",
  ".intro",
  ".progress",
  ".warning",
  ".step",
  ".step-body",
  ".videos",
  ".video-grid",
  ".video-item",
  ".code-image",
  ".search-mock",
  "#copyMessage",
  ".browser-link",
  ".decoration",
  ".box-form-wrap",
  "marginBottom",
  "paddingBottom",
  ".box-step-wrap, .box-step-wrap .box-form, .box-step-wrap .box-form-wrap",
  "#hinh_nv[src]",
  "#linkWeb[src]",
  ".img.url-hint-image[src]",
  "#linkFB",
  "#linkWeb",
  ".qcw-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 12px 40px rgba(2,6,23,.14),0 2px 8px rgba(2,6,23,.06);width:100%;max-width:360px;margin:0 auto;overflow:hidden;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;animation:qcwIn .3s cubic-bezier(.21,1.02,.55,1) both}",
  ".qcw-header{display:flex;align-items:center;gap:11px;padding:13px 16px;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#a855f7 100%)}",
  ".qcw-header-icon{width:36px;height:36px;flex:0 0 auto;border-radius:11px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center}",
  ".qcw-header-title{color:#fff;font-size:14.5px;font-weight:800;letter-spacing:.2px;line-height:1.25}",
  ".qcw-header-sub{color:rgba(255,255,255,.78);font-size:10.5px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;margin-top:2px}",
  ".qcw-header-badge{margin-left:auto;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:10px;font-weight:700;letter-spacing:.5px;border-radius:999px;padding:3px 9px;white-space:nowrap}",
  ".qcw-question{background:#eef2ff;border-left:3px solid #6366f1;color:#312e81;font-weight:700;font-size:14px;line-height:1.4;padding:10px 12px;border-radius:10px;margin-bottom:7px}",
  ".qcw-hint{display:flex;align-items:center;gap:6px;color:#64748b;font-size:12px;margin-bottom:12px}",
  ".qcw-grid{display:grid;grid-template-columns:repeat(var(--qc-cols,3),1fr);gap:8px;margin-bottom:11px}",
  ".qcw-tile{position:relative;aspect-ratio:1/1;padding:0;border:2px solid #e5e9f2;border-radius:12px;background:#f8fafc;cursor:pointer;overflow:hidden;transition:transform .13s ease,border-color .13s ease,box-shadow .13s ease;-webkit-tap-highlight-color:transparent}",
  ".qcw-tile:hover{border-color:#a5b4fc;transform:translateY(-2px);box-shadow:0 8px 16px rgba(79,70,229,.16)}",
  ".qcw-tile img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;user-select:none;-webkit-user-drag:none}",
  ".qcw-tile .qcw-check{position:absolute;top:6px;right:6px;width:23px;height:23px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(79,70,229,.45);opacity:0;transform:scale(.3);transition:all .16s cubic-bezier(.34,1.56,.64,1)}",
  ".qcw-tile.is-selected{border-color:#4f46e5;box-shadow:0 0 0 3px rgba(99,102,241,.22);transform:scale(.955)}",
  ".qcw-meta{display:flex;align-items:center;margin-bottom:11px;min-height:22px}",
  ".qcw-counter{font-size:11.5px;font-weight:700;color:#475569;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:999px;padding:3px 11px;transition:all .15s ease}",
  ".qcw-counter.is-active{color:#4f46e5;background:#eef2ff;border-color:#c7d2fe}",
  ".qcw-btn{font-family:inherit;cursor:pointer;transition:all .15s ease}",
  ".qcw-btn-primary{flex:1;border:0;border-radius:11px;padding:10px 14px;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#4f46e5,#7c3aed);box-shadow:0 5px 14px rgba(79,70,229,.32)}",
  ".qcw-btn-primary:not(:disabled):hover{filter:brightness(1.09);transform:translateY(-1px)}",
  ".qcw-btn-ghost{display:flex;align-items:center;gap:6px;border:1px solid #e2e8f0;background:#fff;color:#475569;border-radius:11px;padding:10px 12px;font-size:12.5px;font-weight:600}",
  ".qcw-btn-ghost:not(:disabled):hover{background:#f8fafc;color:#334155;border-color:#cbd5e1}",
  ".qcw-status{margin-top:10px;min-height:17px;font-size:12px;color:#64748b;display:flex;align-items:center;justify-content:center;gap:7px;text-align:center}",
  ".qcw-spinner{width:13px;height:13px;flex:0 0 auto;border-radius:50%;border:2px solid rgba(79,70,229,.22);border-top-color:#4f46e5;animation:qcwSpin .7s linear infinite}",
  ".qcw-loading-ring{width:44px;height:44px;margin:0 auto 14px;border-radius:50%;border:4px solid #e0e7ff;border-top-color:#4f46e5;animation:qcwSpin .8s linear infinite}",
  ".qcw-success-ring{width:60px;height:60px;margin:0 auto 13px;border-radius:50%;background:#ecfdf5;border:2px solid #a7f3d0;display:flex;align-items:center;justify-content:center;animation:qcwPop .32s cubic-bezier(.34,1.56,.64,1) both}",
  ".qcw-success-check{stroke:#059669;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;fill:none;stroke-dasharray:30;stroke-dashoffset:30;animation:qcwDraw .45s ease-out .12s forwards}",
  ".qcw-error-icon{width:52px;height:52px;margin:0 auto 12px;border-radius:50%;background:#fef2f2;border:2px solid #fecaca;display:flex;align-items:center;justify-content:center;animation:qcwPop .3s cubic-bezier(.34,1.56,.64,1) both}",
  ".qcw-error-sub{color:#7f1d1d;font-size:12px;margin:6px 0 14px;line-height:1.5;word-break:break-word}",
  ".qcw-btn-retry{border:0;border-radius:10px;padding:9px 22px;font-size:13px;font-weight:700;color:#fff;background:linear-gradient(135deg,#dc2626,#ef4444);box-shadow:0 4px 12px rgba(220,38,38,.3)}",
  "width",
  "colorDepth",
  "#qcw-retry",
  "#qcw-counter",
  "#qcw-submit",
  "#qcw-skip"
];

// ========== HTML FRAGMENTS ==========
const _HTML_FRAGMENTS = [
  "<div style='color:#dc2626; font-weight:bold; text-align:center;'>Nhi",
  "<    display: none !important; ",
  "<    display: flex !important; ",
  "<div style='color:#0284c7; font-weight:600; text-align:center;'>",
  "</span>",
  "</div>",
  "<<div class='qcw-loading-text'>",
  "<div class='qcw-loading-sub'>H",
  "<<div class='qcw-success-ring'>",
  "<<div class='qcw-success-text'>",
  "<div class='qcw-error-text'>Kh",
  "<button type='button' class='qcw-btn qcw-btn-retry' id='qcw-retry'>Th",
  "</b> c",
  "<img src='",
  "</button>",
  "<span>",
  "</span></div>",
  "<div class='qcw-meta'><span class='qcw-counter' id='qcw-counter'>",
  "<button type='button' class='qcw-btn qcw-btn-primary' id='qcw-submit'>X",
  "<button type='button' class='qcw-btn qcw-btn-ghost' id='qcw-skip'>",
  "<                } catch(e) {}",
  "</a></div>",
  "<div style='margin-top:4px;'><b>Platform:</b> <span style='color:#d97706; font-weight:bold; text-transform:uppercase;'>",
  "<div style='background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:12px; border-radius:8px; text-align:left; font-weight:bold; margin-bottom:10px; white-space:pre-wrap; word-break:break-word;'>",
  "<button type='button' id='btn-native-retry' class='btn btn-warning' style='flex:1; font-weight:bold;'>Th",
  "<button type='button' id='btn-native-change' class='btn btn-danger' style='flex:1; font-weight:bold;'>",
  "<div style='color:#dc2626; font-weight:bold; text-align:center;'>",
  "<label style='display:block; font-weight:bold; margin-bottom:4px;'>T",
  "<div style='margin-bottom:12px; padding:8px; background:#fff; border:1px solid #cbd5e1; border-radius:6px; text-align:center;'>",
  "<label for='manual-quest-keyword' style='display:block; font-weight:bold; margin-bottom:4px;'>T",
  "<div style='background:#fff7ed; border:1px solid #fed7aa; color:#9a3412; padding:10px; border-radius:6px; margin-bottom:12px;'><b>",
  "</b><br><span style='font-size:12px;'>B",
  "<label for='manual-quest-image' style='display:block; font-weight:bold; margin-bottom:4px;'>Link ",
  "</label>",
  "<img id='manual-quest-image-preview' alt='",
  "<label for='manual-quest-link' style='display:block; font-weight:bold; margin-bottom:4px;'>Link Quest th",
  "<input id='manual-quest-link' type='url' placeholder='https://...' autocomplete='off' style='width:100%; box-sizing:border-box; padding:9px; border:1px solid #cbd5e1; border-radius:6px; margin-bottom:12px;'>",
  "<button type='button' id='btn-manual-quest' class='btn btn-primary' style='width:100%; font-weight:bold;'>Ti",
  "<button type='button' id='btn-manual-change-quest' class='btn btn-danger' style='width:100%; margin-top:10px; font-weight:bold;'>",
  "<vnbypass_blacklist_auto_change",
  "<vnbypass_auto_save_manual_link",
  "<0<:<@JLRX`bxz",
  "<[^>]*>?",
  "<div id='captcha-step2-wrapper' style='display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; margin:0 auto; animation:qcwIn .3s cubic-bezier(.21,1.02,.55,1) both;'>",
  "<div style='width:100%; max-width:360px; box-sizing:border-box; margin:0 auto 12px; padding:12px 16px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:12px; text-align:center; box-shadow:0 2px 10px rgba(37,99,235,0.08);'>",
  "<div style='font-size:12px; font-weight:700; color:#1d4ed8; text-transform:uppercase; letter-spacing:.5px; margin-bottom:5px;'>",
  "<div style='font-size:16px; font-weight:800; color:#2563eb; background:#fff; border:1px dashed #93c5fd; border-radius:8px; padding:7px 12px; word-break:break-all; user-select:all;'>",
  "<div style='font-size:12px; color:#64748b; margin-top:6px;'>Vui l",
  "<div id='captcha2-native-target' style='display:flex; justify-content:center; align-items:flex-start; width:100%;'></div>",
  "<[LAYMA] QCaptcha step 2 error:",
  "<div style='background:#ecfdf5; border:1px solid #6ee7b7; padding:16px; border-radius:8px; text-align:center; margin-bottom:16px;'>",
  "<div style='color:#047857; font-weight:bold; font-size:16px; margin-bottom:8px;'>TH",
  "<div style='font-size:13px; color:#065f46; word-break:break-all; background:#fff; padding:10px; border-radius:6px; border:1px dashed #a7f3d0;'>",
  "</div></div>",
  "<div style='display:flex; flex-direction:row; gap:12px; width:100%; margin-top:16px; margin-bottom:8px;'>",
  "<button type='button' class='btn btn-success' id='btn-native-copy' style='flex:1; font-weight:bold; padding:10px 12px; font-size:14px; border-radius:6px;'>Copy Link</button>",
  "<button type='button' class='btn btn-primary' id='btn-native-open' style='flex:1; font-weight:bold; padding:10px 12px; font-size:14px; border-radius:6px;'>M",
  "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/><path d=\"M9 12l2 2 4-4\"/></svg>",
  "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg>",
  "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/></svg>",
  "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"23 4 23 10 17 10\"/><path d=\"M20.49 15a9 9 0 1 1-2.12-9.36L23 10\"/></svg>",
  "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#dc2626\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>",
  "<svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\"><polyline class=\"qcw-success-check\" points=\"20 6 9 17 4 12\"></polyline></svg>",
  "<div class='vnbypass-intro'>C",
  "<div id='settings-header-toggle' style='display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; padding: 2px 0;'>",
  "<div style='font-weight: 700; color: #d97706; font-size: 15px; display: flex; align-items: center; gap: 8px;'>",
  "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#d97706' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'>",
  "<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>",
  "</svg>",
  "<div id='settings-toggle-btn' style='display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; background: #fef3c7; border: 1px solid #fde68a; cursor: pointer; transition: all 0.2s ease;'>",
  "<span id='settings-toggle-text' style='font-size: 12px; color: #b45309; font-weight: 700;'>",
  "<span id='settings-toggle-arrow' style='display: inline-block; transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); font-size: 11px; color: #b45309; transform: ",
  "<div id='settings-body-collapse' style='overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.3s ease; max-height: ",
  "<div style='display: flex; align-items: center; justify-content: space-between;'>",
  "<label style='cursor: pointer; margin: 0; color: #92400e; font-weight: 600;'>",
  "<label style='cursor: pointer; margin: 0; color: #92400e; font-weight: 600;'>M",
  "<label style='cursor: pointer; margin: 0; color: #92400e; font-weight: 600;'>L",
  "<button type='button' id='show-manual-link-cache' style='border:0; padding:0; background:transparent; color:#b45309; cursor:pointer; text-align:left; font-size:11px; text-decoration:underline;'>Xem link nhi",
  "<button type='button' id='show-blacklist-list' style='border:0; padding:0; background:transparent; color:#b45309; cursor:pointer; text-align:left; font-size:11px; text-decoration:underline;'>Xem nhi",
  "<label for='input-wait-time' style='margin: 0; color: #92400e; font-weight: 600;'>Th"
];

// ========== REGEX PATTERNS (raw) ==========
const _REGEX_STRINGS = [
  "[LAYMA] ",
  "[AUTO-CHANGE] ",
  "^#linkWeb, img.url-hint-image, [src*='url-hint']",
  "^https?:\\/\\/",
  "(?:var|let|const)?\\s*(?:window\\.)?qCaptchaSiteKey\\s*=\\s*['\"]([^'\"]+)['\"]",
  "(?:var|let|const)?\\s*(?:window\\.)?qCaptchaScriptUrl\\s*=\\s*['\"]([^'\"]+)['\"]",
  "(?:qCaptchaScriptUrl|qcaptchaScriptUrl)\\s*[:=]\\s*['\"]([^'\"]+)['\"]",
  "^.qcw-error{padding:24px 18px;text-align:center}",
  "/frame.html",
  "/v1/solve",
  "/v1/skip",
  "\\<div class='qcw-status' id='qcw-status'></div>",
  "/v1/init",
  "^js\\.",
  "\\                    orientation: orientation,",
  "^(?:(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)$",
  "(?:(?:var|let|const)\\s+)?(?:window\\.)?qCaptchaSiteKey\\s*=\\s*['\"]([^'\"]+)['\"]",
  "(?:captcha|sitekey)\\b[^\"']*?['\"]([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})['\"]",
  "^\"|\"$",
  "^<input type='checkbox' id='toggle-auto-change' "
];

// ========== STORAGE KEYS ==========
const _STORAGE_STRINGS = [
  "*vnbypass_manual_links",
  "2vnbypass_custom_blacklist",
  "(vnbypass_auto_change",
  "$vnbypass_wait_timeB",
  "6vnbypass_settings_collapsed",
  ",cache_traffic_session_",
  "cache_solution_",
  "cache_solution",
  "$vnbypass_wait_time",
  "*layma_widget_session_",
  "&cache_visit_ticket_"
];

// ========== DOMAIN STRINGS ==========
const _DOMAIN_STRINGS = [
  "Xlayma\\.net\\/Traffic\\/Index\\/([A-Za-z0-9_-]+)",
  "Lhttps://frame.103-141-140-153.sslip.io",
  "2https://www.facebook.com/",
  "*https://api.layma.net",
  "(www.dealevolution.io",
  "matlamafc.com",
  "sunwinkt.com",
  "sunwinvv.com",
  "sunwinmb.com",
  "sunwinbv.com",
  "cherrylift.co",
  "ziaventures.co",
  "$www.ziaventures.co",
  "agilafc.com",
  "www.agilafc.com",
  "annetlibeau.co",
  "(perspektivaes.in.net",
  "6sunwin.perspektivaes.in.net",
  "goldfame.co.in",
  "*sunwin.goldfame.co.in",
  "go88yt.com",
  "go88gh.com",
  "emitur.com.co",
  "\"www.emitur.com.co",
  "Thttps://js.103-141-140-153.sslip.io/api.js",
  "`https://js.hcaptcha.com/1/api.js?render=explicit"
];

// ========== ERROR / LOG STRINGS ==========
const _ERROR_STRINGS = [
  "error",
  "onerror<",
  "BPOST /api/traffic/session timeout",
  "ontimeout<",
  "timeout",
  "onerror",
  "ontimeout",
  "ZPOST /api/traffic/visitor (checkcode) timeout",
  "B[LAYMA] Missing GM_xmlhttpRequest",
  "ontimeoutr",
  "ontimeoutt",
  "f.qcw-status.is-error{color:#dc2626;font-weight:600}",
  "~.qcw-error-text{color:#dc2626;font-size:14.5px;font-weight:800}",
  "Error",
  ".<div class='qcw-error'>",
  "8<div class='qcw-error-icon'>",
  "6<div class='qcw-error-sub'>",
  "F[LAYMA] QCaptcha native init error:",
  "AbortError",
  "        console.log('[LAYMA] POST /api/traffic/checkcode payload', Object.assign({}, pData, { Token: '***', FingerprintData: '[present]' }));",
  "                console.log('[LAYMA] /api/traffic/checkcode response', res);",
  "F            error: function(err) {",
  "                console.error('[LAYMA] /api/traffic/checkcode error', { status: err.status, response: err.responseText });",
  "\", success: false, status: err.status, error: err.responseText || \"L",
  "Z\", success: false, error: e.message }, \"*\");",
  "ontimeout^",
  "BPOST /api/traffic/getcode timeout",
  "ontimeout6",
  "R[LAYMA][DBG] sending /api/traffic/getcode"
];

// ========== CRYPTO STRINGS ==========
const _CRYPTO_STRINGS = [
  "crypto",
  "subtle",
  "P-256",
  "SHA-256",
  "AES-GCM"
];

// ========== OTHER CONSTANTS ==========
const _OTHER_STRINGS = [
  "_0x4f8e54*",
  " getQCaptchaToken",
  "(&(*:L\\",
  "_0x425b67>",
  "4\"(4JP",
  " (*@@VXdbdhn",
  "status:",
  "response:",
  "_0x30c28dH*",
  "_0x3b591f.",
  " (HTTP ",
  "B,B@BDPNRZ`ftrvz",
  "$88PR^\\^",
  "2POST /api/traffic/session",
  "*0<DFLPthtrtv",
  "(/api/traffic/session",
  " application/json",
  "Content-Type",
  "JPOST /api/traffic/visitor (checkcode)",
  "&trafficSessionToken",
  "*0<DFLP",
  "V`bnlnv",
  "(/api/traffic/visitor",
  ">application/json; charset=UTF-8",
  "&*04<<JL`",
  "i nhi",
  ".0D:@",
  "ng th",
  "6/api/traffic/mission/change",
  "\"X-Traffic-Session",
  ".&.06NXVZ",
  "y Token ID tr",
  "n trang hi",
  "ang t",
  "i...</div>",
  "&removeEventListener",
  "(executeChangeMission",
  "*<.8>jXjt",
  " vnbypass-wrapper",
  "\"#vnbypass-wrapper",
  " querySelectorAll",
  "$&88N",
  "min-height",
  "max-height",
  "none<",
  "jVui l",
  "n danh khi v",
  "(vnbypass-clean-style",
  "V#copyMessage, .browser-link, .decoration { ",
  "(#vnbypass-wrapper { ",
  "8    width: 100% !important; ",
  "B    max-width: 660px !important; ",
  "N    flex-direction: column !important; ",
  "4    gap: 14px !important; ",
  "R    margin: 0 auto 20px auto !important; ",
  "main#guide { ",
  "B    min-height: auto !important; ",
  "D    margin: 18px auto !important; ",
  "J    padding-bottom: 24px !important; ",
  "    display: inline-flex; align-items: center; justify-content: center; ",
  "    padding: 10px 16px; font-size: 14px; font-weight: 700; border-radius: 8px; ",
  "    border: none; cursor: pointer; transition: all 0.2s ease; text-decoration: none; box-sizing: border-box; ",
  "f.btn-primary { background: #2563eb; color: #fff; } ",
  "X.btn-primary:hover { background: #1d4ed8; } ",
  "f.btn-success { background: #16a34a; color: #fff; } ",
  "X.btn-success:hover { background: #15803d; } ",
  "d.btn-danger { background: #dc2626; color: #fff; } ",
  "V.btn-danger:hover { background: #b91c1c; } ",
  "f.btn-warning { background: #f59e0b; color: #fff; } ",
  "V.btn-warning:hover { background: #d97706; }",
  "\".box-step-getCode",
  " .box-linkFB-wrap",
  " .box-google-note",
  " .box-step-footer",
  "aside.warning",
  "section.step",
  "\".responsive-video",
  "D.box-step-wrap img, .step-body img",
  "ang ph",
  "ch nhi",
  "...</div>",
  "div.mt-2",
  " span.text-danger",
  "$p.fadeInUp.visible",
  "onload<",
  "Fno-cache, no-store, must-revalidate",
  "Cache-Control",
  "no-cache",
  "\"0.`4FFVT`bxvx",
  "_0x112f2a\"",
  ">.step-one img.search-image[src]",
  "B.step-three img.search-image[src]",
  "Dsection.step img.search-image[src]",
  "@img[src*=\"/media/images/posts/\"]",
  "pimg.search-image:not(#linkWeb):not(.url-hint-image)[src]",
  "Pimg.img-fluid[src*=\"media/images/posts\"]",
  " 02BDTVfhx",
  "(img[src*=\"url-hint\"]",
  "$*:@NT",
  "\".box-copy-content",
  "_0x3985cd^*",
  " 006BHTZ",
  "#TK1, #TK2, #TK3, .keyword, .box-copy-content, .box-copy-code, [data-clipboard-text]",
  "&data-clipboard-text",
  "$4:JTZdz",
  "~*~4FLTT\\Z^dlltrz",
  "D\\/Traffic\\/Index\\/([A-Za-z0-9_-]+)",
  "j(?:var\\s+)?traffic_key\\s*=\\s*['\"]([A-Za-z0-9_-]+)['\"]",
  "`trafficKey['\"\\s:=]+['\"]?([A-Za-z0-9_-]{6,})['\"]?",
  "Bdata-traffic-key=['\"]([^'\"]+)['\"]",
  "8keytoken=([A-Za-z0-9_-]{6,})",
  "@Traffic\\/Index\\/([A-Za-z0-9_-]+)",
  "\"[A-Za-z0-9_-]{8,}",
  "(^@JJT\\ `",
  "_0x5ad7ac*",
  "z(?:qCaptchaSiteKey|qcaptchaSiteKey)\\s*[:=]\\s*['\"]([^'\"]+)['\"]",
  ":&,>PNR",
  "_0x53882a*",
  "@<script[^>]+src=['\"]([^'\"]+)['\"]",
  "script[src]",
  "_0x2d17d5*",
  "&amp;",
  "&quot;",
  "&#39;",
  "_0x55a39aR*",
  "qc-native-style",
  "@keyframes qcwIn{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}",
  "`@keyframes qcwSpin{to{transform:rotate(360deg)}}",
  "@keyframes qcwPop{from{transform:scale(.25);opacity:0}to{transform:scale(1);opacity:1}}",
  "V@keyframes qcwDraw{to{stroke-dashoffset:0}}",
  "B.qcw-body{padding:14px 16px 16px}",
  "T.qcw-hint svg{flex:0 0 auto;color:#94a3b8}",
  "4.qcw-hint b{color:#4f46e5}",
  "|.qcw-tile.is-selected .qcw-check{opacity:1;transform:scale(1)}",
  "D.qcw-actions{display:flex;gap:8px}",
  "b.qcw-btn:disabled{opacity:.55;cursor:not-allowed}",
  "x.qcw-btn-primary:not(:disabled):active{transform:scale(.98)}",
  "d.qcw-status.is-info{color:#4f46e5;font-weight:600}",
  "b.qcw-loading{padding:36px 18px;text-align:center}",
  "~.qcw-loading-text{color:#4f46e5;font-size:14px;font-weight:700}",
  "z.qcw-loading-sub{color:#94a3b8;font-size:12px;margin-top:4px}",
  "b.qcw-success{padding:32px 18px;text-align:center}",
  "~.qcw-success-text{color:#047857;font-size:15px;font-weight:800}",
  "z.qcw-success-sub{color:#64748b;font-size:12px;margin-top:4px}",
  "Z.qcw-btn-retry:hover{filter:brightness(1.08)}",
  "u QCaptcha: ",
  "&P:@NP",
  "i QCaptcha",
  "LTimeout khi k",
  "\" (4:B",
  "_0x2a46a7<",
  "&(:286:",
  "nh duy",
  " WebCrypto!",
  "&qcaptcha/v1/signals",
  "N ,*DBNL",
  "$,*.4:HNf",
  "vi-VN",
  "en-US",
  "&hardwareConcurrency",
  " Asia/Ho_Chi_Minh",
  " devicePixelRatio",
  "$pauseBeforeClickMs",
  " interEventStddev",
  " *,2Tfdx",
  "qcw-status",
  "N<span class='qcw-spinner'></span><span>",
  " ,FDN",
  ",<div class='qcw-card'>",
  "0<div class='qcw-header'>",
  ":<div class='qcw-header-icon'>",
  "F<div><div class='qcw-header-title'>",
  "c minh b",
  "l</div><div class='qcw-header-sub'>QCaptcha</div></div>",
  "><span class='qcw-header-badge'>",
  "An to",
  "2<div class='qcw-loading'>",
  "H<div class='qcw-loading-ring'></div>",
  "ang k",
  "i QCaptcha...",
  "ang ki",
  "m tra m",
  "ng tr",
  "t</div>",
  "$,.4HPRXx",
  "2<div class='qcw-success'>",
  ":<div class='qcw-success-sub'>",
  "ang x",
  ", vui l",
  "$,.4HPRX",
  "c QCaptcha</div>",
  "i</button>",
  " addEventListener",
  "n: <b>",
  "is-active",
  "is-selected",
  "data-idx",
  "JVui l",
  "ng ch",
  "m tra "
];


/*
 * VNBYPASS V1.1.3 — pas2 RECONSTRUCTED LOGIC
 * Extracted from 203 bytecode blobs
 * Large code fragments (>80 chars) from decoded bytecode
 */

// --- Fragment 1 (905 chars) ---
@keyframes shimmerEffect { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } .fancy-top-header { margin: 0 0 16px 0; padding: 13px 18px; background: #eff6ff; border-radius: 10px; text-align: center; border: 1px solid #bfdbfe; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.16); } .vnbypass-title { display: block; color: #2563eb; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: clamp(23px, 6vw, 32px); font-weight: 900; letter-spacing: 1px; line-height: 1.3; background: linear-gradient(90deg, #2563eb, #9333ea, #db2777, #0891b2, #2563eb); background-size: 300% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmerEffect 4s linear infinite; text-shadow: 0 0 18px rgba(147, 51, 234, 0.18); } .vnbypass-title::after { content: '

// --- Fragment 2 (752 chars) ---
<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>

// --- Fragment 3 (618 chars) ---
.switch { position: relative; display: inline-block; width: 36px; height: 20px; margin: 0; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 20px; } .slider:before { position: absolute; content: ''; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3); } input:checked + .slider { background-color: #d97706; } input:checked + .slider:before { transform: translateX(16px); }

// --- Fragment 4 (366 chars) ---
'; -webkit-text-fill-color: #f59e0b; color: #f59e0b; font-size: 0.7em; vertical-align: super; } .vnbypass-discord { display: inline-block; margin-top: 4px; color: #5865f2; font-weight: 700; text-decoration: none; } .vnbypass-intro { margin-top: 4px; color: #475569; font-size: 12px; line-height: 1.4; } .box-form { display: flex; flex-direction: column; gap: 16px; }

// --- Fragment 5 (335 chars) ---
.qcw-tile .qcw-check{position:absolute;top:6px;right:6px;width:23px;height:23px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(79,70,229,.45);opacity:0;transform:scale(.3);transition:all .16s cubic-bezier(.34,1.56,.64,1)}

// --- Fragment 6 (312 chars) ---
.qcw-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 12px 40px rgba(2,6,23,.14),0 2px 8px rgba(2,6,23,.06);width:100%;max-width:360px;margin:0 auto;overflow:hidden;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;animation:qcwIn .3s cubic-bezier(.21,1.02,.55,1) both}

// --- Fragment 7 (305 chars) ---
if (b) battery = { level: typeof b.level === 'number' ? Math.round(b.level * 100) : null, charging: typeof b.charging === 'boolean' ? b.charging : null, chargingTime: Number.isFinite(b.chargingTime) ? b.chargingTime : null, dischargingTime: Number.isFinite(b.dischargingTime) ? b.dischargingTime : null };

// --- Fragment 8 (264 chars) ---
.qcw-tile{position:relative;aspect-ratio:1/1;padding:0;border:2px solid #e5e9f2;border-radius:12px;background:#f8fafc;cursor:pointer;overflow:hidden;transition:transform .13s ease,border-color .13s ease,box-shadow .13s ease;-webkit-tap-highlight-color:transparent}

// --- Fragment 9 (263 chars) ---
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>

// --- Fragment 10 (261 chars) ---
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>

// --- Fragment 11 (242 chars) ---
margin-bottom: 0px; padding: 12px 16px; background:#fffbeb; border:1px solid #fde68a; border-radius:10px; text-align:left; font-size:14px; line-height: 1.6; display: flex; flex-direction: column; box-shadow: 0 1px 3px rgba(217, 119, 6, 0.08);

// --- Fragment 12 (238 chars) ---
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>

// --- Fragment 13 (233 chars) ---
.qcw-success-ring{width:60px;height:60px;margin:0 auto 13px;border-radius:50%;background:#ecfdf5;border:2px solid #a7f3d0;display:flex;align-items:center;justify-content:center;animation:qcwPop .32s cubic-bezier(.34,1.56,.64,1) both}

// --- Fragment 14 (233 chars) ---
<div style='width:100%; max-width:360px; box-sizing:border-box; margin:0 auto 12px; padding:12px 16px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:12px; text-align:center; box-shadow:0 2px 10px rgba(37,99,235,0.08);'>

// --- Fragment 15 (232 chars) ---
' placeholder='https://...' autocomplete='off' readonly style='width:100%; box-sizing:border-box; padding:9px; border:1px solid #cbd5e1; border-radius:6px; margin-bottom:10px; background:#f1f5f9; color:#64748b; cursor:not-allowed;'>

// --- Fragment 16 (230 chars) ---
.qcw-error-icon{width:52px;height:52px;margin:0 auto 12px;border-radius:50%;background:#fef2f2;border:2px solid #fecaca;display:flex;align-items:center;justify-content:center;animation:qcwPop .3s cubic-bezier(.34,1.56,.64,1) both}

// --- Fragment 17 (224 chars) ---
.qcw-header-badge{margin-left:auto;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:10px;font-weight:700;letter-spacing:.5px;border-radius:999px;padding:3px 9px;white-space:nowrap}

// --- Fragment 18 (224 chars) ---
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>

// --- Fragment 19 (215 chars) ---
<div id='settings-toggle-btn' style='display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; background: #fef3c7; border: 1px solid #fde68a; cursor: pointer; transition: all 0.2s ease;'>

// --- Fragment 20 (210 chars) ---
var orientation = (typeof lastDeviceOrientation !== 'undefined' && lastDeviceOrientation) || (('DeviceOrientationEvent' in window) ? { supported: true, granted: true, available: false } : { supported: false });

// --- Fragment 21 (207 chars) ---
<div style='background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:12px; border-radius:8px; text-align:left; font-weight:bold; margin-bottom:10px; white-space:pre-wrap; word-break:break-word;'>

// --- Fragment 22 (207 chars) ---
<input id='manual-quest-link' type='url' placeholder='https://...' autocomplete='off' style='width:100%; box-sizing:border-box; padding:9px; border:1px solid #cbd5e1; border-radius:6px; margin-bottom:12px;'>

// --- Fragment 23 (206 chars) ---
' readonly autocomplete='off' style='width:100%; box-sizing:border-box; padding:9px; border:1px solid #cbd5e1; border-radius:6px; margin-bottom:12px; background:#f1f5f9; color:#64748b; cursor:not-allowed;'>

// --- Fragment 24 (206 chars) ---
<button type='button' id='show-manual-link-cache' style='border:0; padding:0; background:transparent; color:#b45309; cursor:pointer; text-align:left; font-size:11px; text-decoration:underline;'>Xem link nhi

// --- Fragment 25 (205 chars) ---
.qcw-btn-primary{flex:1;border:0;border-radius:11px;padding:10px 14px;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#4f46e5,#7c3aed);box-shadow:0 5px 14px rgba(79,70,229,.32)}

// --- Fragment 26 (203 chars) ---
<div id='captcha-step2-wrapper' style='display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; margin:0 auto; animation:qcwIn .3s cubic-bezier(.21,1.02,.55,1) both;'>

// --- Fragment 27 (200 chars) ---
.qcw-header-icon{width:36px;height:36px;flex:0 0 auto;border-radius:11px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center}

// --- Fragment 28 (198 chars) ---
<button type='button' id='show-blacklist-list' style='border:0; padding:0; background:transparent; color:#b45309; cursor:pointer; text-align:left; font-size:11px; text-decoration:underline;'>Xem nhi

// --- Fragment 29 (194 chars) ---
.qcw-btn-retry{border:0;border-radius:10px;padding:9px 22px;font-size:13px;font-weight:700;color:#fff;background:linear-gradient(135deg,#dc2626,#ef4444);box-shadow:0 4px 12px rgba(220,38,38,.3)}

// --- Fragment 30 (191 chars) ---
.qcw-success-check{stroke:#059669;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;fill:none;stroke-dasharray:30;stroke-dashoffset:30;animation:qcwDraw .45s ease-out .12s forwards}

// --- Fragment 31 (189 chars) ---
i</div><div id='captcha-native-target' style='display:flex; justify-content:center; align-items:flex-start; width:302px; max-width:100%; min-height:144px; margin:0 auto; overflow:visible;'>

// --- Fragment 32 (181 chars) ---
<div style='font-size:16px; font-weight:800; color:#2563eb; background:#fff; border:1px dashed #93c5fd; border-radius:8px; padding:7px 12px; word-break:break-all; user-select:all;'>

// --- Fragment 33 (181 chars) ---
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>

// --- Fragment 34 (180 chars) ---
.qcw-btn-ghost{display:flex;align-items:center;gap:6px;border:1px solid #e2e8f0;background:#fff;color:#475569;border-radius:11px;padding:10px 12px;font-size:12.5px;font-weight:600}

// --- Fragment 35 (179 chars) ---
.qcw-question{background:#eef2ff;border-left:3px solid #6366f1;color:#312e81;font-weight:700;font-size:14px;line-height:1.4;padding:10px 12px;border-radius:10px;margin-bottom:7px}

// --- Fragment 36 (173 chars) ---
<button type='button' class='btn btn-success' id='btn-native-copy' style='flex:1; font-weight:bold; padding:10px 12px; font-size:14px; border-radius:6px;'>Copy Link</button>

// --- Fragment 37 (168 chars) ---
.qcw-spinner{width:13px;height:13px;flex:0 0 auto;border-radius:50%;border:2px solid rgba(79,70,229,.22);border-top-color:#4f46e5;animation:qcwSpin .7s linear infinite}

// --- Fragment 38 (168 chars) ---
<div id='settings-body-collapse' style='overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.3s ease; max-height:

// --- Fragment 39 (166 chars) ---
.qcw-counter{font-size:11.5px;font-weight:700;color:#475569;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:999px;padding:3px 11px;transition:all .15s ease}

// --- Fragment 40 (166 chars) ---
.qcw-loading-ring{width:44px;height:44px;margin:0 auto 14px;border-radius:50%;border:4px solid #e0e7ff;border-top-color:#4f46e5;animation:qcwSpin .8s linear infinite}

// --- Fragment 41 (164 chars) ---
<span id='settings-toggle-arrow' style='display: inline-block; transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); font-size: 11px; color: #b45309; transform:

// --- Fragment 42 (161 chars) ---
<div id='settings-header-toggle' style='display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; padding: 2px 0;'>

// --- Fragment 43 (159 chars) ---
width:min(520px, 100%); max-height:80vh; overflow:auto; padding:18px; background:#fff; border-radius:8px; box-shadow:0 8px 30px rgba(0,0,0,.25); color:#1e293b;

// --- Fragment 44 (159 chars) ---
width:min(420px, 100%); max-height:80vh; overflow:auto; padding:18px; background:#fff; border-radius:8px; box-shadow:0 8px 30px rgba(0,0,0,.25); color:#1e293b;

// --- Fragment 45 (158 chars) ---
' style='width: 65px; padding: 4px; border: 1px solid #d97706; border-radius: 4px; text-align: center; margin-left: 10px; font-weight: bold; color: #92400e;'>

// --- Fragment 46 (156 chars) ---
<button type='button' class='btn btn-primary' id='btn-native-open' style='flex:1; font-weight:bold; padding:10px 12px; font-size:14px; border-radius:6px;'>M

// --- Fragment 47 (155 chars) ---
display:block; width:100%; margin-top:12px; padding:8px 12px; border:0; border-radius:5px; background:#dc2626; color:#fff; cursor:pointer; font-weight:600;

// --- Fragment 48 (155 chars) ---
display:block; width:100%; margin-top:16px; padding:8px 12px; border:0; border-radius:5px; background:#d97706; color:#fff; cursor:pointer; font-weight:600;

// --- Fragment 49 (154 chars) ---
.qcw-status{margin-top:10px;min-height:17px;font-size:12px;color:#64748b;display:flex;align-items:center;justify-content:center;gap:7px;text-align:center}

// --- Fragment 50 (154 chars) ---
display:block; width:100%; margin-top:8px; padding:8px 12px; border:0; border-radius:5px; background:#d97706; color:#fff; cursor:pointer; font-weight:600;

// --- Fragment 51 (154 chars) ---
display:block; width:100%; margin-top:8px; padding:8px 12px; border:0; border-radius:5px; background:#b45309; color:#fff; cursor:pointer; font-weight:600;

// --- Fragment 52 (150 chars) ---
margin-bottom: 0px; padding: 14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; text-align:left; font-size:14px; line-height: 1.6;

// --- Fragment 53 (145 chars) ---
textarea[name="h-captcha-response"], textarea[name="g-recaptcha-response"], textarea[name="q-captcha-response"], input[name="q-captcha-response"]

// --- Fragment 54 (143 chars) ---
<div style='font-size:13px; color:#065f46; word-break:break-all; background:#fff; padding:10px; border-radius:6px; border:1px dashed #a7f3d0;'>

// --- Fragment 55 (143 chars) ---
<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#d97706' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'>

// --- Fragment 56 (142 chars) ---
.qcw-header{display:flex;align-items:center;gap:11px;padding:13px 16px;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#a855f7 100%)}

// --- Fragment 57 (142 chars) ---
position:fixed; inset:0; z-index:10000; display:flex; align-items:center; justify-content:center; padding:16px; background:rgba(15,23,42,.55);

// --- Fragment 58 (138 chars) ---
.qcw-header-sub{color:rgba(255,255,255,.78);font-size:10.5px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;margin-top:2px}

// --- Fragment 59 (133 chars) ---
console.log('[LAYMA] POST /api/traffic/checkcode payload', Object.assign({}, pData, { Token: '***', FingerprintData: '[present]' }));

// --- Fragment 60 (131 chars) ---
<div style='background:#ecfdf5; border:1px solid #6ee7b7; padding:16px; border-radius:8px; text-align:center; margin-bottom:16px;'>

// --- Fragment 61 (130 chars) ---
<div style='background:#fff7ed; border:1px solid #fed7aa; color:#9a3412; padding:10px; border-radius:6px; margin-bottom:12px;'><b>

// --- Fragment 62 (129 chars) ---
<button type='button' id='btn-manual-change-quest' class='btn btn-danger' style='width:100%; margin-top:10px; font-weight:bold;'>

// --- Fragment 63 (128 chars) ---
.qcw-tile img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;user-select:none;-webkit-user-drag:none}

// --- Fragment 64 (127 chars) ---
<div style='margin-bottom:12px; padding:8px; background:#fff; border:1px solid #cbd5e1; border-radius:6px; text-align:center;'>

// --- Fragment 65 (127 chars) ---
<div style='font-size:12px; font-weight:700; color:#1d4ed8; text-transform:uppercase; letter-spacing:.5px; margin-bottom:5px;'>

// --- Fragment 66 (126 chars) ---
var b = await Promise.race([navigator.getBattery(), new Promise(function(r) { setTimeout(function() { r(null); }, 1200); })]);

// --- Fragment 67 (125 chars) ---
<svg width="28" height="28" viewBox="0 0 24 24"><polyline class="qcw-success-check" points="20 6 9 17 4 12"></polyline></svg>

// --- Fragment 68 (122 chars) ---
; max-width:100%; max-height:180px; object-fit:contain; margin:0 auto 10px; border:1px solid #e2e8f0; border-radius:6px;'>

// --- Fragment 69 (121 chars) ---
<div id='captcha2-native-target' style='display:flex; justify-content:center; align-items:flex-start; width:100%;'></div>

// --- Fragment 70 (120 chars) ---
<div id='captcha-native-target' style='display:flex; justify-content:center; align-items:flex-start; width:100%;'></div>

// --- Fragment 71 (119 chars) ---
<div style='margin-top:4px;'><b>Platform:</b> <span style='color:#d97706; font-weight:bold; text-transform:uppercase;'>

// --- Fragment 72 (115 chars) ---
<div id='script-progress' style='width:100%; height:100%; background:#0284c7; transition:width 0.3s linear;'></div>

// --- Fragment 73 (113 chars) ---
border:0; background:#fee2e2; color:#991b1b; cursor:pointer; padding:5px 8px; border-radius:4px; font-weight:600;

// --- Fragment 74 (111 chars) ---
margin: 0; padding: 10px; background: #f8fafc; border: 1px solid #dbeafe; border-radius: 8px; min-height: 60px;

// --- Fragment 75 (111 chars) ---
<div style='background:#f0f9ff; border:1px solid #0284c7; padding:12px; border-radius:8px; text-align:center;'>

// --- Fragment 76 (110 chars) ---
<div style='font-weight: 700; color: #d97706; font-size: 15px; display: flex; align-items: center; gap: 8px;'>

// --- Fragment 77 (109 chars) ---
width:100%; box-sizing:border-box; margin-top:12px; padding:8px; border:1px solid #cbd5e1; border-radius:5px;

// --- Fragment 78 (109 chars) ---
<div style='width:100%; background:#e2e8f0; height:6px; border-radius:3px; overflow:hidden; margin-top:6px;'>

// --- Fragment 79 (108 chars) ---
<button type='button' id='btn-manual-quest' class='btn btn-primary' style='width:100%; font-weight:bold;'>Ti

// --- Fragment 80 (107 chars) ---
.qcw-tile.is-selected{border-color:#4f46e5;box-shadow:0 0 0 3px rgba(99,102,241,.22);transform:scale(.955)}

// --- Fragment 81 (106 chars) ---
.qcw-tile:hover{border-color:#a5b4fc;transform:translateY(-2px);box-shadow:0 8px 16px rgba(79,70,229,.16)}

// --- Fragment 82 (106 chars) ---
console.error('[LAYMA] /api/traffic/checkcode error', { status: err.status, response: err.responseText });

// --- Fragment 83 (106 chars) ---
width: 100%; max-width: 660px; margin: 0 auto 20px auto; display: flex; flex-direction: column; gap: 14px;

// --- Fragment 84 (105 chars) ---
<div style='display:flex; flex-direction:row; gap:12px; width:100%; margin-top:16px; margin-bottom:8px;'>

// --- Fragment 85 (104 chars) ---
border: none; cursor: pointer; transition: all 0.2s ease; text-decoration: none; box-sizing: border-box;

// --- Fragment 86 (104 chars) ---
<button type='button' id='btn-native-retry' class='btn btn-warning' style='flex:1; font-weight:bold;'>Th

// --- Fragment 87 (104 chars) ---
<label for='manual-quest-link' style='display:block; font-weight:bold; margin-bottom:4px;'>Link Quest th

// --- Fragment 88 (102 chars) ---
<button type='button' id='btn-native-change' class='btn btn-danger' style='flex:1; font-weight:bold;'>

// --- Fragment 89 (102 chars) ---
<div style='text-align:center;'><div style='color:#16a34a; font-weight:bold; margin-bottom:8px;'>Vui l

// --- Fragment 90 (101 chars) ---
.qcw-grid{display:grid;grid-template-columns:repeat(var(--qc-cols,3),1fr);gap:8px;margin-bottom:11px}

// --- Fragment 91 (100 chars) ---
.qcw-error-sub{color:#7f1d1d;font-size:12px;margin:6px 0 14px;line-height:1.5;word-break:break-word}

// --- Fragment 92 (100 chars) ---
"QCaptchaToken": passedQToken || (typeof getQCaptchaToken === 'function' ? getQCaptchaToken() : ""),

// --- Fragment 93 (99 chars) ---
@keyframes qcwIn{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}

// --- Fragment 94 (99 chars) ---
.qcw-header-title{color:#fff;font-size:14.5px;font-weight:800;letter-spacing:.2px;line-height:1.25}

// --- Fragment 95 (98 chars) ---
.qcw-hint{display:flex;align-items:center;gap:6px;color:#64748b;font-size:12px;margin-bottom:12px}

// --- Fragment 96 (98 chars) ---
(?:captcha|sitekey)\b[^"']*?['"]([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})['"]

// --- Fragment 97 (96 chars) ---
<label for='manual-quest-image' style='display:block; font-weight:bold; margin-bottom:4px;'>Link

// --- Fragment 98 (96 chars) ---
border:0; background:#fee2e2; color:#991b1b; cursor:pointer; padding:3px 7px; border-radius:4px;

// --- Fragment 99 (95 chars) ---
<label for='manual-quest-keyword' style='display:block; font-weight:bold; margin-bottom:4px;'>T

// --- Fragment 100 (92 chars) ---
.intro, .progress, .warning, aside.warning, section.step, .step, .step-body, .verify-fields,

// --- Fragment 101 (91 chars) ---
<span id='settings-toggle-text' style='font-size: 12px; color: #b45309; font-weight: 700;'>

// --- Fragment 102 (90 chars) ---
.qcw-btn-ghost:not(:disabled):hover{background:#f8fafc;color:#334155;border-color:#cbd5e1}

// --- Fragment 103 (90 chars) ---
var activeSession = (typeof trafficSessionToken !== 'undefined' && trafficSessionToken) ||

// --- Fragment 104 (90 chars) ---
"DeviceScreen": clientInfo.screen || (window.screen.width + ' x ' + window.screen.height),

// --- Fragment 105 (89 chars) ---
.qcw-btn-primary:not(:disabled):hover{filter:brightness(1.09);transform:translateY(-1px)}

// --- Fragment 106 (87 chars) ---
@keyframes qcwPop{from{transform:scale(.25);opacity:0}to{transform:scale(1);opacity:1}}

// --- Fragment 107 (86 chars) ---
a' style='max-width:100%; max-height:90px; object-fit:contain; display:inline-block;'>

// --- Fragment 108 (85 chars) ---
margin:0; padding:0; list-style:none; color:#475569; font-size:13px; line-height:1.5;

// --- Fragment 109 (84 chars) ---
.box-google-note, #btn-xac-nhan, #btn-baoloi, .box-step-footer, .box-footer, footer,

// --- Fragment 110 (84 chars) ---
#TK1, #TK2, #TK3, .keyword, .box-copy-content, .box-copy-code, [data-clipboard-text]

// --- Fragment 111 (84 chars) ---
"CaptchaLaToken": typeof getCaptchaLaToken === 'function' ? getCaptchaLaToken() : ""

// --- Fragment 112 (84 chars) ---
<label for='input-wait-time' style='margin: 0; color: #92400e; font-weight: 600;'>Th

// --- Fragment 113 (83 chars) ---
margin:0 0 12px; padding-left:20px; color:#475569; font-size:13px; line-height:1.7;

// --- Fragment 114 (83 chars) ---
<div style='color:#047857; font-weight:bold; font-size:16px; margin-bottom:8px;'>TH

// --- Fragment 115 (83 chars) ---
<div id='script-countdown' style='font-size:32px; font-weight:900; color:#0284c7;'>

// --- Fragment 116 (82 chars) ---
.heading, .box-step-note, .box-step-link, .box-step-title, .box-copy, .box-google,

// --- Fragment 117 (82 chars) ---
"HCaptchaToken": typeof getHCaptchaToken === 'function' ? getHCaptchaToken() : "",

// --- Fragment 118 (81 chars) ---
.box-step-getCode, .box-video, #videohd, #xuong, .box-linkFB-wrap, .box-btn-copy,

// --- Fragment 119 (81 chars) ---
<div style='display: flex; align-items: center; justify-content: space-between;'>

// --- Fragment 120 (80 chars) ---
.videos, .video-grid, .video-item, .responsive-video, .code-image, .search-mock,

// --- Fragment 121 (78 chars) ---
var clientInfo = typeof getVisitorInfo === 'function' ? getVisitorInfo() : {};

// --- Fragment 122 (69 chars) ---
headers: activeSession ? { 'X-Traffic-Session': activeSession } : {},

// --- Fragment 123 (64 chars) ---
colorDepth: (window.screen && window.screen.colorDepth) || null,

