(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Permawit"] = factory();
	else
		root["Permawit"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base-x/index.js":
/*!**************************************!*\
  !*** ./node_modules/base-x/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer

module.exports = function base (ALPHABET) {
  var ALPHABET_MAP = {}
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)

  // pre-compute lookup table
  for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z)

    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
    ALPHABET_MAP[x] = z
  }

  function encode (source) {
    if (source.length === 0) return ''

    var digits = [0]
    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8
        digits[j] = carry % BASE
        carry = (carry / BASE) | 0
      }

      while (carry > 0) {
        digits.push(carry % BASE)
        carry = (carry / BASE) | 0
      }
    }

    var string = ''

    // deal with leading zeros
    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER
    // convert digits to a string
    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]

    return string
  }

  function decodeUnsafe (string) {
    if (typeof string !== 'string') throw new TypeError('Expected String')
    if (string.length === 0) return Buffer.allocUnsafe(0)

    var bytes = [0]
    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]]
      if (value === undefined) return

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE
        bytes[j] = carry & 0xff
        carry >>= 8
      }

      while (carry > 0) {
        bytes.push(carry & 0xff)
        carry >>= 8
      }
    }

    // deal with leading zeros
    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0)
    }

    return Buffer.from(bytes.reverse())
  }

  function decode (string) {
    var buffer = decodeUnsafe(string)
    if (buffer) return buffer

    throw new Error('Non-base' + BASE + ' character')
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/bs58/index.js":
/*!************************************!*\
  !*** ./node_modules/bs58/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var basex = __webpack_require__(/*! base-x */ "./node_modules/base-x/index.js")
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = basex(ALPHABET)


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/cids/src/index.js":
/*!****************************************!*\
  !*** ./node_modules/cids/src/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const mh = __webpack_require__(/*! multihashes */ "./node_modules/multihashes/src/index.js")
const multibase = __webpack_require__(/*! multibase */ "./node_modules/multibase/src/index.js")
const multicodec = __webpack_require__(/*! multicodec */ "./node_modules/multicodec/src/index.js")
const codecs = __webpack_require__(/*! multicodec/src/base-table */ "./node_modules/multicodec/src/base-table.js")
const codecVarints = __webpack_require__(/*! multicodec/src/varint-table */ "./node_modules/multicodec/src/varint-table.js")
const multihash = __webpack_require__(/*! multihashes */ "./node_modules/multihashes/src/index.js")

/**
 * @typedef {Object} SerializedCID
 * @param {string} codec
 * @param {number} version
 * @param {Buffer} multihash
 *
 */

/**
 * Class representing a CID `<mbase><version><mcodec><mhash>`
 * , as defined in [ipld/cid](https://github.com/ipld/cid).
 * @class CID
 */
class CID {
  /**
   * Create a new CID.
   *
   * The algorithm for argument input is roughly:
   * ```
   * if (str)
   *   if (1st char is on multibase table) -> CID String
   *   else -> bs58 encoded multihash
   * else if (Buffer)
   *   if (0 or 1) -> CID
   *   else -> multihash
   * else if (Number)
   *   -> construct CID by parts
   *
   * ..if only JS had traits..
   * ```
   *
   * @param {string|Buffer} version
   * @param {string} [codec]
   * @param {Buffer} [multihash]
   *
   * @example
   *
   * new CID(<version>, <codec>, <multihash>)
   * new CID(<cidStr>)
   * new CID(<cid.buffer>)
   * new CID(<multihash>)
   * new CID(<bs58 encoded multihash>)
   * new CID(<cid>)
   *
   */
  constructor (version, codec, multihash) {
    if (CID.isCID(version)) {
      let cid = version
      this.version = cid.version
      this.codec = cid.codec
      this.multihash = Buffer.from(cid.multihash)
      return
    }
    if (typeof version === 'string') {
      if (multibase.isEncoded(version)) { // CID String (encoded with multibase)
        const cid = multibase.decode(version)
        version = parseInt(cid.slice(0, 1).toString('hex'), 16)
        codec = multicodec.getCodec(cid.slice(1))
        multihash = multicodec.rmPrefix(cid.slice(1))
      } else { // bs58 string encoded multihash
        codec = 'dag-pb'
        multihash = mh.fromB58String(version)
        version = 0
      }
    } else if (Buffer.isBuffer(version)) {
      const firstByte = version.slice(0, 1)
      const v = parseInt(firstByte.toString('hex'), 16)
      if (v === 0 || v === 1) { // CID
        const cid = version
        version = v
        codec = multicodec.getCodec(cid.slice(1))
        multihash = multicodec.rmPrefix(cid.slice(1))
      } else { // multihash
        codec = 'dag-pb'
        multihash = version
        version = 0
      }
    }

    /**
     * @type {string}
     */
    this.codec = codec

    /**
     * @type {number}
     */
    this.version = version

    /**
     * @type {Buffer}
     */
    this.multihash = multihash

    CID.validateCID(this)
  }

  /**
   * The CID as a `Buffer`
   *
   * @return {Buffer}
   * @readonly
   *
   * @memberOf CID
   */
  get buffer () {
    switch (this.version) {
      case 0:
        return this.multihash
      case 1:
        return Buffer.concat([
          Buffer.from('01', 'hex'),
          Buffer.from(codecVarints[this.codec]),
          this.multihash
        ])
      default:
        throw new Error('unsupported version')
    }
  }

  /**
   * Get the prefix of the CID.
   *
   * @returns {Buffer}
   * @readonly
   */
  get prefix () {
    return Buffer.concat([
      Buffer.from(`0${this.version}`, 'hex'),
      codecVarints[this.codec],
      multihash.prefix(this.multihash)
    ])
  }

  /**
   * Convert to a CID of version `0`.
   *
   * @returns {CID}
   */
  toV0 () {
    if (this.codec !== 'dag-pb') {
      throw new Error('Cannot convert a non dag-pb CID to CIDv0')
    }

    return new CID(0, this.codec, this.multihash)
  }

  /**
   * Convert to a CID of version `1`.
   *
   * @returns {CID}
   */
  toV1 () {
    return new CID(1, this.codec, this.multihash)
  }

  /**
   * Encode the CID into a string.
   *
   * @param {string} [base='base58btc'] - Base encoding to use.
   * @returns {string}
   */
  toBaseEncodedString (base) {
    base = base || 'base58btc'

    switch (this.version) {
      case 0: {
        if (base !== 'base58btc') {
          throw new Error('not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()')
        }
        return mh.toB58String(this.multihash)
      }
      case 1:
        return multibase.encode(base, this.buffer).toString()
      default:
        throw new Error('Unsupported version')
    }
  }

  /**
   * Serialize to a plain object.
   *
   * @returns {SerializedCID}
   */
  toJSON () {
    return {
      codec: this.codec,
      version: this.version,
      hash: this.multihash
    }
  }

  /**
   * Compare equality with another CID.
   *
   * @param {CID} other
   * @returns {bool}
   */
  equals (other) {
    return this.codec === other.codec &&
      this.version === other.version &&
      this.multihash.equals(other.multihash)
  }

  /**
   * Test if the given input is a CID.
   *
   * @param {any} other
   * @returns {bool}
   */
  static isCID (other) {
    try {
      CID.validateCID(other)
    } catch (err) {
      return false
    }

    return true
  }

  /**
   * Test if the given input is a valid CID object.
   * Throws if it is not.
   *
   * @param {any} other
   * @returns {void}
   */
  static validateCID (other) {
    if (other == null) {
      throw new Error('null values are not valid CIDs')
    }

    if (!(other.version === 0 || other.version === 1)) {
      throw new Error('Invalid version, must be a number equal to 1 or 0')
    }

    if (typeof other.codec !== 'string') {
      throw new Error('codec must be string')
    }

    if (!Buffer.isBuffer(other.multihash)) {
      throw new Error('multihash must be a Buffer')
    }

    mh.validate(other.multihash)
  }
}

CID.codecs = codecs

module.exports = CID

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/merkling/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/merkling/src/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Merkling = __webpack_require__(/*! ./merkling */ "./node_modules/merkling/src/merkling.js")

module.exports = Merkling


/***/ }),

/***/ "./node_modules/merkling/src/ipld.js":
/*!*******************************************!*\
  !*** ./node_modules/merkling/src/ipld.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "./node_modules/cids/src/index.js")

const cidSymbol = Symbol.for('merkling#cid')
const statusSymbol = Symbol.for('merkling#status')

const IpldProxyExtension = {
  get (target, key) {
    if (key === cidSymbol) {
      const status = target[statusSymbol]
      if (status === 'UNLOADED' || status === 'SAVED') {
        return target[cidSymbol]
      }

      if (status === 'DIRTY') {
        throw Error('Can\'t read CID of unloaded ipld node')
      }
    }

    if (key === '_cid') {
      return target[cidSymbol]
    }

    if (typeof key !== 'string' || key === 'inspect') {
      return target[key]
    }

    return target[key]
  },

  set (target, key, value) {
    if (key === statusSymbol || key === cidSymbol) {
      Reflect.set(...arguments)
      return true
    }

    if (target[statusSymbol] === 'SAVED') {
      target[cidSymbol] = undefined
      target[statusSymbol] = 'DIRTY'
      Reflect.set(...arguments)
      return true
    }

    if (target[statusSymbol] === 'UNLOADED') {
      return false
    }

    Reflect.set(...arguments)
    return true
  }
}

class IpldProxy {
  constructor () {
    this.UNLOADED = 'UNLOADED'
    this.SAVED = 'SAVED'
    this.DIRTY = 'DIRTY'
    this.TEMP = 'TEMP'

    this.allowedStatuses = [this.UNLOADED, this.SAVED, this.DIRTY]
  }

  isIpld (obj) {
    return obj && this.allowedStatuses.includes(obj[statusSymbol])
  }

  isPersisted (obj) {
    return obj && (obj[statusSymbol] === this.UNLOADED || obj[statusSymbol] === this.SAVED)
  }

  isSaved (obj) {
    return obj && obj[statusSymbol] === this.SAVED
  }

  isDirty (obj) {
    return obj && obj[statusSymbol] === this.DIRTY
  }

  create (cid, status, obj) {
    if (!this.allowedStatuses.includes(status)) {
      throw Error('Unrecognized status ' + status)
    }

    obj[cidSymbol] = cid
    obj[statusSymbol] = status
    return new Proxy(obj, IpldProxyExtension)
  }

  createDirtyNode (obj) {
    return this.create(null, this.DIRTY, obj)
  }

  createSavedNode (cid, obj) {
    const id = CID.isCID(cid) ? cid : new CID(cid)
    return this.create(id, this.SAVED, obj)
  }

  createLinkNode (cid) {
    const id = CID.isCID(cid) ? cid : new CID(cid)

    const linkObj = {
      '/': id.toBaseEncodedString()
    }

    return this.create(id, this.UNLOADED, linkObj)
  }

  readCID (obj) {
    return obj[cidSymbol]
  }

  transition (node, options) {
    const { transition } = options
    switch (transition) {
      case 'load':
        if (node[statusSymbol] !== this.UNLOADED) {
          throw Error(`Transition not allowed ${transition} in state ${node[statusSymbol]}`)
        }

        this._loadLink(node, options)
        break
      case 'save':
        if (node[statusSymbol] !== this.DIRTY) {
          throw Error(`Transition not allowed ${transition} in state ${node[statusSymbol]}`)
        }

        this._saveDirty(node, options)
        break
      default:
        throw Error('Unknown transition ' + transition)
    }
  }

  extract (obj) {
    if (!this.isIpld(obj)) {
      return obj
    }

    const status = obj[statusSymbol]
    obj[statusSymbol] = this.TEMP
    const objCopy = Object.assign({}, obj)
    delete objCopy[statusSymbol]
    delete objCopy[cidSymbol]
    obj[statusSymbol] = status
    return objCopy
  }

  _loadLink (node, { object }) {
    node[statusSymbol] = null
    delete node['/']
    Object.assign(node, object)
    node[statusSymbol] = this.SAVED
  }

  _saveDirty (node, { cid }) {
    node[statusSymbol] = this.SAVED
    node[cidSymbol] = cid
  }
}

module.exports = {
  IpldProxy: IpldProxy
}


/***/ }),

/***/ "./node_modules/merkling/src/merkling.js":
/*!***********************************************!*\
  !*** ./node_modules/merkling/src/merkling.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "./node_modules/cids/src/index.js")
const { IpldProxy } = __webpack_require__(/*! ./ipld */ "./node_modules/merkling/src/ipld.js")

/**
 * Merkling entrypoint
 * @constructor
 * @param {Object} options setup options for this merkling instance
 */
const Merkling = function (options) {
  if (!options || !options.ipfs) {
    throw Error('IPFS must be passed as an option to Merkling')
  }

  this.ipfs = options.ipfs
  this.ipldProxy = new IpldProxy()

  /**
   * Create an IPLD node from a js object.
   * The IPLD node must be saved before it is persisted.
   * @param {Object} obj a js object
   * @returns {Object} an unsaved IPLD node
   */
  this.create = (obj) => {
    return this.ipldProxy.createDirtyNode(obj)
  }

  /**
   * Persist a js object or IPLD node to the IPLD graph
   * @param {Object} obj a js object or IPLD node
   */
  this.save = (obj) => {
    if (!obj) {
      throw Error('Argument exception, trying to save null or undefined')
    }

    if (this.ipldProxy.isIpld(obj)) {
      if (this.ipldProxy.isPersisted(obj)) {
        return new Promise(resolve => resolve(obj))
      } else {
        return this._persist(obj)
      }
    } else {
      const dirtyNode = this.ipldProxy.createDirtyNode(obj)
      return this._persist(dirtyNode)
    }
  }

  /**
   * Given an IPLD id, retrieve the value from the IPLD graph
   * as a js object
   * @param {Object|String} cid
   * @returns {Object} an IPLD node
   */
  this.get = (cid) => {
    return new Promise((resolve, reject) => {
      this.ipfs.dag.get(cid, (err, block) => {
        if (err) {
          reject(err)
        }

        const id = CID.isCID(cid) ? cid : new CID(cid)
        const node = this._substituteMerkleLinkProxies(block.value)
        const merkleProxy = this.ipldProxy.createSavedNode(id, node)

        resolve(merkleProxy)
      })
    })
  }

  /**
   * Given an IPLD id, create an unloaded IPLD node, that can
   * be used in persisting
   * @param {Object|String} cid
   * @returns {Object} an unloaded IPLD node
   */
  this.load = (cid) => {
    return this.ipldProxy.createLinkNode(cid)
  }

  /**
   * Takes an unloaded IPLD node and loads in the
   * object for the node's hash from IPLD
   * @param {Object} obj an unloaded IPLD node
   * @returns {Object} a saved IPLD node
   */
  this.resolve = (obj) => {
    return new Promise((resolve, reject) => {
      if (!this.ipldProxy.isIpld(obj) || this.ipldProxy.isSaved(obj)) {
        return resolve(obj)
      }

      if (this.ipldProxy.isDirty(obj)) {
        throw Error('Cannot resolve a dirty ipld node')
      }

      return this.ipfs.dag.get(obj._cid, (err, block) => {
        if (err) {
          reject(err)
        }

        const node = this._substituteMerkleLinkProxies(block.value)
        this.ipldProxy.transition(obj, { transition: 'load', object: node })

        resolve(obj)
      })
    })
  }

  this._persist = (elem) => {
    return new Promise((resolve, reject) => {
      if (this.ipldProxy.isPersisted(elem)) {
        return resolve(elem)
      }

      const subpersists = Object.keys(elem)
        .filter(key => elem[key])
        .map(key => {
          return typeof elem[key] === 'object'
            ? this._persist(elem[key])
            : null
        }).filter(Boolean)

      return Promise.all(subpersists).then(() => {
        if (!this.ipldProxy.isIpld(elem)) {
          return resolve(elem)
        }

        const dagNode = this._substituteMerkleLinks(elem)

        this.ipfs.dag.put(dagNode, { format: 'dag-cbor', hashAlg: 'sha2-256' }, (err, cid) => {
          if (err) {
            return reject(err)
          }

          this.ipldProxy.transition(elem, { transition: 'save', cid: cid })

          return resolve(elem)
        })
      }).catch(reject)
    })
  }

  this._substituteMerkleLinks = (elem) => {
    if (!elem) {
      return elem
    }

    const dagNode = this.ipldProxy.extract(elem)

    Object.keys(dagNode).forEach(key => {
      if ((typeof dagNode[key] !== 'object')) {
        return
      }

      if (this.ipldProxy.isIpld(dagNode[key])) {
        dagNode[key] = this._convertToMerkleLinkObject(dagNode[key])
      } else {
        this._substituteMerkleLinks(dagNode[key])
      }
    })

    return dagNode
  }

  this._substituteMerkleLinkProxies = (obj) => {
    const merkleNode = Object.assign({}, obj)

    Object.keys(merkleNode).forEach(key => {
      if (typeof merkleNode[key] === 'object') {
        if (this._isMerkleLinkObject(merkleNode[key])) {
          merkleNode[key] = this._convertFromMerkleLinkObject(merkleNode[key])
        } else {
          this._substituteMerkleLinkProxies(merkleNode[key])
        }
      }
    })

    return merkleNode
  }

  this._convertToMerkleLinkObject = (obj) => {
    return {
      '/': obj._cid.toBaseEncodedString()
    }
  }

  this._convertFromMerkleLinkObject = (link) => {
    return this.ipldProxy.createLinkNode(new CID(link['/']))
  }

  this._isMerkleLinkObject = (obj) => {
    return obj && (typeof obj === 'object') && obj.hasOwnProperty('/')
  }

  return this
}

module.exports = Merkling


/***/ }),

/***/ "./node_modules/multibase/node_modules/base-x/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/multibase/node_modules/base-x/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

module.exports = function base (ALPHABET) {
  var ALPHABET_MAP = {}
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)

  // pre-compute lookup table
  for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z)

    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
    ALPHABET_MAP[x] = z
  }

  function encode (source) {
    if (source.length === 0) return ''

    var digits = [0]
    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8
        digits[j] = carry % BASE
        carry = (carry / BASE) | 0
      }

      while (carry > 0) {
        digits.push(carry % BASE)
        carry = (carry / BASE) | 0
      }
    }

    var string = ''

    // deal with leading zeros
    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += ALPHABET[0]
    // convert digits to a string
    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]

    return string
  }

  function decodeUnsafe (string) {
    if (string.length === 0) return Buffer.allocUnsafe(0)

    var bytes = [0]
    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]]
      if (value === undefined) return

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE
        bytes[j] = carry & 0xff
        carry >>= 8
      }

      while (carry > 0) {
        bytes.push(carry & 0xff)
        carry >>= 8
      }
    }

    // deal with leading zeros
    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0)
    }

    return Buffer.from(bytes.reverse())
  }

  function decode (string) {
    var buffer = decodeUnsafe(string)
    if (buffer) return buffer

    throw new Error('Non-base' + BASE + ' character')
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/multibase/src/base.js":
/*!********************************************!*\
  !*** ./node_modules/multibase/src/base.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Base {
  constructor (name, code, implementation, alphabet) {
    this.name = name
    this.code = code
    this.alphabet = alphabet
    if (implementation && alphabet) {
      this.engine = implementation(alphabet)
    }
  }

  encode (stringOrBuffer) {
    return this.engine.encode(stringOrBuffer)
  }

  decode (stringOrBuffer) {
    return this.engine.decode(stringOrBuffer)
  }

  isImplemented () {
    return this.engine
  }
}

module.exports = Base


/***/ }),

/***/ "./node_modules/multibase/src/base16.js":
/*!**********************************************!*\
  !*** ./node_modules/multibase/src/base16.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

module.exports = function base16 (alphabet) {
  return {
    encode (input) {
      if (typeof input === 'string') {
        return new Buffer(input).toString('hex')
      }
      return input.toString('hex')
    },
    decode (input) {
      for (let char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base16 character')
        }
      }
      return new Buffer(input, 'hex')
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/multibase/src/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/multibase/src/constants.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Base = __webpack_require__(/*! ./base.js */ "./node_modules/multibase/src/base.js")
const baseX = __webpack_require__(/*! base-x */ "./node_modules/multibase/node_modules/base-x/index.js")
const base16 = __webpack_require__(/*! ./base16 */ "./node_modules/multibase/src/base16.js")

// name, code, implementation, alphabet
const constants = [
  ['base1', '1', '', '1'],
  ['base2', '0', baseX, '01'],
  ['base8', '7', baseX, '01234567'],
  ['base10', '9', baseX, '0123456789'],
  ['base16', 'f', base16, '0123456789abcdef'],
  ['base32hex', 'v', baseX, '0123456789abcdefghijklmnopqrstuv'],
  ['base32', 'b', baseX, 'abcdefghijklmnopqrstuvwxyz234567'],
  ['base32z', 'h', baseX, 'ybndrfg8ejkmcpqxot1uwisza345h769'],
  ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'],
  ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'],
  ['base64', 'm', baseX, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'],
  ['base64url', 'u', baseX, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_']
]

const names = constants.reduce((prev, tupple) => {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3])
  return prev
}, {})

const codes = constants.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]]
  return prev
}, {})

module.exports = {
  names: names,
  codes: codes
}


/***/ }),

/***/ "./node_modules/multibase/src/index.js":
/*!*********************************************!*\
  !*** ./node_modules/multibase/src/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 * @module Multibase
 */


const constants = __webpack_require__(/*! ./constants */ "./node_modules/multibase/src/constants.js")

exports = module.exports = multibase
exports.encode = encode
exports.decode = decode
exports.isEncoded = isEncoded

const errNotSupported = new Error('Unsupported encoding')

/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @memberof Multibase
 * @returns {Buffer}
 */
function multibase (nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer')
  }
  const base = getBase(nameOrCode)
  const codeBuf = new Buffer(base.code)

  const name = base.name
  validEncode(name, buf)
  return Buffer.concat([codeBuf, buf])
}

/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 * @memberof Multibase
 */
function encode (nameOrCode, buf) {
  const base = getBase(nameOrCode)
  const name = base.name

  return multibase(name, new Buffer(base.encode(buf)))
}

/**
 *
 * Takes a buffer or string encoded with multibase header
 * decodes it and returns an object with the decoded buffer
 * and the encoded type { base: <name>, data: <buffer> }
 *
 * from @theobat : This is not what the multibase.spec.js test is waiting for,
 * hence the return decodeObject.data
 *
 * @param {Buffer|string} bufOrString
 * @returns {Object} result
 * @returns {string} result.base
 * @returns {Buffer} result.data
 * @memberof Multibase
 *
 */
function decode (bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString()
  }

  const code = bufOrString.substring(0, 1)
  bufOrString = bufOrString.substring(1, bufOrString.length)

  if (typeof bufOrString === 'string') {
    bufOrString = new Buffer(bufOrString)
  }

  const base = getBase(code)

  const decodeObject = {
    base: base.name,
    data: new Buffer(base.decode(bufOrString.toString()))
  }
  return decodeObject.data
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} bufOrString
 * @returns {boolean}
 * @memberof Multibase
 */
function isEncoded (bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString()
  }

  const code = bufOrString.substring(0, 1)
  try {
    const base = getBase(code)
    return base.name
  } catch (err) {
    return false
  }
}

/**
 * @param {string} name
 * @param {Buffer} buf
 * @private
 * @returns {undefined}
 */
function validEncode (name, buf) {
  const base = getBase(name)
  base.decode(buf.toString())
}

function getBase (nameOrCode) {
  let base

  if (constants.names[nameOrCode]) {
    base = constants.names[nameOrCode]
  } else if (constants.codes[nameOrCode]) {
    base = constants.codes[nameOrCode]
  } else {
    throw errNotSupported
  }

  if (!base.isImplemented()) {
    throw new Error('Base ' + nameOrCode + ' is not implemented yet')
  }

  return base
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/multicodec/src/base-table.js":
/*!***************************************************!*\
  !*** ./node_modules/multicodec/src/base-table.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

// spec and table at: https://github.com/multiformats/multicodec

exports = module.exports

// Miscellaneous
exports['raw'] = Buffer.from('55', 'hex')

// bases encodings
exports['base1'] = Buffer.from('01', 'hex')
exports['base2'] = Buffer.from('00', 'hex')
exports['base8'] = Buffer.from('07', 'hex')
exports['base10'] = Buffer.from('09', 'hex')

// Serialization formats
exports['cbor'] = Buffer.from('51', 'hex')
exports['protobuf'] = Buffer.from('50', 'hex')
exports['rlp'] = Buffer.from('60', 'hex')
exports['bencode'] = Buffer.from('63', 'hex')

// Multiformats
exports['multicodec'] = Buffer.from('30', 'hex')
exports['multihash'] = Buffer.from('31', 'hex')
exports['multiaddr'] = Buffer.from('32', 'hex')
exports['multibase'] = Buffer.from('33', 'hex')
exports['md4'] = Buffer.from('d4', 'hex')
exports['md5'] = Buffer.from('d5', 'hex')

// multihashes
exports['sha1'] = Buffer.from('11', 'hex')
exports['sha2-256'] = Buffer.from('12', 'hex')
exports['sha2-512'] = Buffer.from('13', 'hex')
exports['dbl-sha2-256'] = Buffer.from('56', 'hex')
exports['sha3-224'] = Buffer.from('17', 'hex')
exports['sha3-256'] = Buffer.from('16', 'hex')
exports['sha3-384'] = Buffer.from('15', 'hex')
exports['sha3-512'] = Buffer.from('14', 'hex')
exports['shake-128'] = Buffer.from('18', 'hex')
exports['shake-256'] = Buffer.from('19', 'hex')
exports['keccak-224'] = Buffer.from('1a', 'hex')
exports['keccak-256'] = Buffer.from('1b', 'hex')
exports['keccak-384'] = Buffer.from('1c', 'hex')
exports['keccak-512'] = Buffer.from('1d', 'hex')
exports['murmur3'] = Buffer.from('22', 'hex')
exports['blake2b-8'] = Buffer.from('b201', 'hex')
exports['blake2b-16'] = Buffer.from('b202', 'hex')
exports['blake2b-24'] = Buffer.from('b203', 'hex')
exports['blake2b-32'] = Buffer.from('b204', 'hex')
exports['blake2b-40'] = Buffer.from('b205', 'hex')
exports['blake2b-48'] = Buffer.from('b206', 'hex')
exports['blake2b-56'] = Buffer.from('b207', 'hex')
exports['blake2b-64'] = Buffer.from('b208', 'hex')
exports['blake2b-72'] = Buffer.from('b209', 'hex')
exports['blake2b-80'] = Buffer.from('b20a', 'hex')
exports['blake2b-88'] = Buffer.from('b20b', 'hex')
exports['blake2b-96'] = Buffer.from('b20c', 'hex')
exports['blake2b-104'] = Buffer.from('b20d', 'hex')
exports['blake2b-112'] = Buffer.from('b20e', 'hex')
exports['blake2b-120'] = Buffer.from('b20f', 'hex')
exports['blake2b-128'] = Buffer.from('b210', 'hex')
exports['blake2b-136'] = Buffer.from('b211', 'hex')
exports['blake2b-144'] = Buffer.from('b212', 'hex')
exports['blake2b-152'] = Buffer.from('b213', 'hex')
exports['blake2b-160'] = Buffer.from('b214', 'hex')
exports['blake2b-168'] = Buffer.from('b215', 'hex')
exports['blake2b-176'] = Buffer.from('b216', 'hex')
exports['blake2b-184'] = Buffer.from('b217', 'hex')
exports['blake2b-192'] = Buffer.from('b218', 'hex')
exports['blake2b-200'] = Buffer.from('b219', 'hex')
exports['blake2b-208'] = Buffer.from('b21a', 'hex')
exports['blake2b-216'] = Buffer.from('b21b', 'hex')
exports['blake2b-224'] = Buffer.from('b21c', 'hex')
exports['blake2b-232'] = Buffer.from('b21d', 'hex')
exports['blake2b-240'] = Buffer.from('b21e', 'hex')
exports['blake2b-248'] = Buffer.from('b21f', 'hex')
exports['blake2b-256'] = Buffer.from('b220', 'hex')
exports['blake2b-264'] = Buffer.from('b221', 'hex')
exports['blake2b-272'] = Buffer.from('b222', 'hex')
exports['blake2b-280'] = Buffer.from('b223', 'hex')
exports['blake2b-288'] = Buffer.from('b224', 'hex')
exports['blake2b-296'] = Buffer.from('b225', 'hex')
exports['blake2b-304'] = Buffer.from('b226', 'hex')
exports['blake2b-312'] = Buffer.from('b227', 'hex')
exports['blake2b-320'] = Buffer.from('b228', 'hex')
exports['blake2b-328'] = Buffer.from('b229', 'hex')
exports['blake2b-336'] = Buffer.from('b22a', 'hex')
exports['blake2b-344'] = Buffer.from('b22b', 'hex')
exports['blake2b-352'] = Buffer.from('b22c', 'hex')
exports['blake2b-360'] = Buffer.from('b22d', 'hex')
exports['blake2b-368'] = Buffer.from('b22e', 'hex')
exports['blake2b-376'] = Buffer.from('b22f', 'hex')
exports['blake2b-384'] = Buffer.from('b230', 'hex')
exports['blake2b-392'] = Buffer.from('b231', 'hex')
exports['blake2b-400'] = Buffer.from('b232', 'hex')
exports['blake2b-408'] = Buffer.from('b233', 'hex')
exports['blake2b-416'] = Buffer.from('b234', 'hex')
exports['blake2b-424'] = Buffer.from('b235', 'hex')
exports['blake2b-432'] = Buffer.from('b236', 'hex')
exports['blake2b-440'] = Buffer.from('b237', 'hex')
exports['blake2b-448'] = Buffer.from('b238', 'hex')
exports['blake2b-456'] = Buffer.from('b239', 'hex')
exports['blake2b-464'] = Buffer.from('b23a', 'hex')
exports['blake2b-472'] = Buffer.from('b23b', 'hex')
exports['blake2b-480'] = Buffer.from('b23c', 'hex')
exports['blake2b-488'] = Buffer.from('b23d', 'hex')
exports['blake2b-496'] = Buffer.from('b23e', 'hex')
exports['blake2b-504'] = Buffer.from('b23f', 'hex')
exports['blake2b-512'] = Buffer.from('b240', 'hex')
exports['blake2s-8'] = Buffer.from('b241', 'hex')
exports['blake2s-16'] = Buffer.from('b242', 'hex')
exports['blake2s-24'] = Buffer.from('b243', 'hex')
exports['blake2s-32'] = Buffer.from('b244', 'hex')
exports['blake2s-40'] = Buffer.from('b245', 'hex')
exports['blake2s-48'] = Buffer.from('b246', 'hex')
exports['blake2s-56'] = Buffer.from('b247', 'hex')
exports['blake2s-64'] = Buffer.from('b248', 'hex')
exports['blake2s-72'] = Buffer.from('b249', 'hex')
exports['blake2s-80'] = Buffer.from('b24a', 'hex')
exports['blake2s-88'] = Buffer.from('b24b', 'hex')
exports['blake2s-96'] = Buffer.from('b24c', 'hex')
exports['blake2s-104'] = Buffer.from('b24d', 'hex')
exports['blake2s-112'] = Buffer.from('b24e', 'hex')
exports['blake2s-120'] = Buffer.from('b24f', 'hex')
exports['blake2s-128'] = Buffer.from('b250', 'hex')
exports['blake2s-136'] = Buffer.from('b251', 'hex')
exports['blake2s-144'] = Buffer.from('b252', 'hex')
exports['blake2s-152'] = Buffer.from('b253', 'hex')
exports['blake2s-160'] = Buffer.from('b254', 'hex')
exports['blake2s-168'] = Buffer.from('b255', 'hex')
exports['blake2s-176'] = Buffer.from('b256', 'hex')
exports['blake2s-184'] = Buffer.from('b257', 'hex')
exports['blake2s-192'] = Buffer.from('b258', 'hex')
exports['blake2s-200'] = Buffer.from('b259', 'hex')
exports['blake2s-208'] = Buffer.from('b25a', 'hex')
exports['blake2s-216'] = Buffer.from('b25b', 'hex')
exports['blake2s-224'] = Buffer.from('b25c', 'hex')
exports['blake2s-232'] = Buffer.from('b25d', 'hex')
exports['blake2s-240'] = Buffer.from('b25e', 'hex')
exports['blake2s-248'] = Buffer.from('b25f', 'hex')
exports['blake2s-256'] = Buffer.from('b260', 'hex')
exports['skein256-8'] = Buffer.from('b301', 'hex')
exports['skein256-16'] = Buffer.from('b302', 'hex')
exports['skein256-24'] = Buffer.from('b303', 'hex')
exports['skein256-32'] = Buffer.from('b304', 'hex')
exports['skein256-40'] = Buffer.from('b305', 'hex')
exports['skein256-48'] = Buffer.from('b306', 'hex')
exports['skein256-56'] = Buffer.from('b307', 'hex')
exports['skein256-64'] = Buffer.from('b308', 'hex')
exports['skein256-72'] = Buffer.from('b309', 'hex')
exports['skein256-80'] = Buffer.from('b30a', 'hex')
exports['skein256-88'] = Buffer.from('b30b', 'hex')
exports['skein256-96'] = Buffer.from('b30c', 'hex')
exports['skein256-104'] = Buffer.from('b30d', 'hex')
exports['skein256-112'] = Buffer.from('b30e', 'hex')
exports['skein256-120'] = Buffer.from('b30f', 'hex')
exports['skein256-128'] = Buffer.from('b310', 'hex')
exports['skein256-136'] = Buffer.from('b311', 'hex')
exports['skein256-144'] = Buffer.from('b312', 'hex')
exports['skein256-152'] = Buffer.from('b313', 'hex')
exports['skein256-160'] = Buffer.from('b314', 'hex')
exports['skein256-168'] = Buffer.from('b315', 'hex')
exports['skein256-176'] = Buffer.from('b316', 'hex')
exports['skein256-184'] = Buffer.from('b317', 'hex')
exports['skein256-192'] = Buffer.from('b318', 'hex')
exports['skein256-200'] = Buffer.from('b319', 'hex')
exports['skein256-208'] = Buffer.from('b31a', 'hex')
exports['skein256-216'] = Buffer.from('b31b', 'hex')
exports['skein256-224'] = Buffer.from('b31c', 'hex')
exports['skein256-232'] = Buffer.from('b31d', 'hex')
exports['skein256-240'] = Buffer.from('b31e', 'hex')
exports['skein256-248'] = Buffer.from('b31f', 'hex')
exports['skein256-256'] = Buffer.from('b320', 'hex')
exports['skein512-8'] = Buffer.from('b321', 'hex')
exports['skein512-16'] = Buffer.from('b322', 'hex')
exports['skein512-24'] = Buffer.from('b323', 'hex')
exports['skein512-32'] = Buffer.from('b324', 'hex')
exports['skein512-40'] = Buffer.from('b325', 'hex')
exports['skein512-48'] = Buffer.from('b326', 'hex')
exports['skein512-56'] = Buffer.from('b327', 'hex')
exports['skein512-64'] = Buffer.from('b328', 'hex')
exports['skein512-72'] = Buffer.from('b329', 'hex')
exports['skein512-80'] = Buffer.from('b32a', 'hex')
exports['skein512-88'] = Buffer.from('b32b', 'hex')
exports['skein512-96'] = Buffer.from('b32c', 'hex')
exports['skein512-104'] = Buffer.from('b32d', 'hex')
exports['skein512-112'] = Buffer.from('b32e', 'hex')
exports['skein512-120'] = Buffer.from('b32f', 'hex')
exports['skein512-128'] = Buffer.from('b330', 'hex')
exports['skein512-136'] = Buffer.from('b331', 'hex')
exports['skein512-144'] = Buffer.from('b332', 'hex')
exports['skein512-152'] = Buffer.from('b333', 'hex')
exports['skein512-160'] = Buffer.from('b334', 'hex')
exports['skein512-168'] = Buffer.from('b335', 'hex')
exports['skein512-176'] = Buffer.from('b336', 'hex')
exports['skein512-184'] = Buffer.from('b337', 'hex')
exports['skein512-192'] = Buffer.from('b338', 'hex')
exports['skein512-200'] = Buffer.from('b339', 'hex')
exports['skein512-208'] = Buffer.from('b33a', 'hex')
exports['skein512-216'] = Buffer.from('b33b', 'hex')
exports['skein512-224'] = Buffer.from('b33c', 'hex')
exports['skein512-232'] = Buffer.from('b33d', 'hex')
exports['skein512-240'] = Buffer.from('b33e', 'hex')
exports['skein512-248'] = Buffer.from('b33f', 'hex')
exports['skein512-256'] = Buffer.from('b340', 'hex')
exports['skein512-264'] = Buffer.from('b341', 'hex')
exports['skein512-272'] = Buffer.from('b342', 'hex')
exports['skein512-280'] = Buffer.from('b343', 'hex')
exports['skein512-288'] = Buffer.from('b344', 'hex')
exports['skein512-296'] = Buffer.from('b345', 'hex')
exports['skein512-304'] = Buffer.from('b346', 'hex')
exports['skein512-312'] = Buffer.from('b347', 'hex')
exports['skein512-320'] = Buffer.from('b348', 'hex')
exports['skein512-328'] = Buffer.from('b349', 'hex')
exports['skein512-336'] = Buffer.from('b34a', 'hex')
exports['skein512-344'] = Buffer.from('b34b', 'hex')
exports['skein512-352'] = Buffer.from('b34c', 'hex')
exports['skein512-360'] = Buffer.from('b34d', 'hex')
exports['skein512-368'] = Buffer.from('b34e', 'hex')
exports['skein512-376'] = Buffer.from('b34f', 'hex')
exports['skein512-384'] = Buffer.from('b350', 'hex')
exports['skein512-392'] = Buffer.from('b351', 'hex')
exports['skein512-400'] = Buffer.from('b352', 'hex')
exports['skein512-408'] = Buffer.from('b353', 'hex')
exports['skein512-416'] = Buffer.from('b354', 'hex')
exports['skein512-424'] = Buffer.from('b355', 'hex')
exports['skein512-432'] = Buffer.from('b356', 'hex')
exports['skein512-440'] = Buffer.from('b357', 'hex')
exports['skein512-448'] = Buffer.from('b358', 'hex')
exports['skein512-456'] = Buffer.from('b359', 'hex')
exports['skein512-464'] = Buffer.from('b35a', 'hex')
exports['skein512-472'] = Buffer.from('b35b', 'hex')
exports['skein512-480'] = Buffer.from('b35c', 'hex')
exports['skein512-488'] = Buffer.from('b35d', 'hex')
exports['skein512-496'] = Buffer.from('b35e', 'hex')
exports['skein512-504'] = Buffer.from('b35f', 'hex')
exports['skein512-512'] = Buffer.from('b360', 'hex')
exports['skein1024-8'] = Buffer.from('b361', 'hex')
exports['skein1024-16'] = Buffer.from('b362', 'hex')
exports['skein1024-24'] = Buffer.from('b363', 'hex')
exports['skein1024-32'] = Buffer.from('b364', 'hex')
exports['skein1024-40'] = Buffer.from('b365', 'hex')
exports['skein1024-48'] = Buffer.from('b366', 'hex')
exports['skein1024-56'] = Buffer.from('b367', 'hex')
exports['skein1024-64'] = Buffer.from('b368', 'hex')
exports['skein1024-72'] = Buffer.from('b369', 'hex')
exports['skein1024-80'] = Buffer.from('b36a', 'hex')
exports['skein1024-88'] = Buffer.from('b36b', 'hex')
exports['skein1024-96'] = Buffer.from('b36c', 'hex')
exports['skein1024-104'] = Buffer.from('b36d', 'hex')
exports['skein1024-112'] = Buffer.from('b36e', 'hex')
exports['skein1024-120'] = Buffer.from('b36f', 'hex')
exports['skein1024-128'] = Buffer.from('b370', 'hex')
exports['skein1024-136'] = Buffer.from('b371', 'hex')
exports['skein1024-144'] = Buffer.from('b372', 'hex')
exports['skein1024-152'] = Buffer.from('b373', 'hex')
exports['skein1024-160'] = Buffer.from('b374', 'hex')
exports['skein1024-168'] = Buffer.from('b375', 'hex')
exports['skein1024-176'] = Buffer.from('b376', 'hex')
exports['skein1024-184'] = Buffer.from('b377', 'hex')
exports['skein1024-192'] = Buffer.from('b378', 'hex')
exports['skein1024-200'] = Buffer.from('b379', 'hex')
exports['skein1024-208'] = Buffer.from('b37a', 'hex')
exports['skein1024-216'] = Buffer.from('b37b', 'hex')
exports['skein1024-224'] = Buffer.from('b37c', 'hex')
exports['skein1024-232'] = Buffer.from('b37d', 'hex')
exports['skein1024-240'] = Buffer.from('b37e', 'hex')
exports['skein1024-248'] = Buffer.from('b37f', 'hex')
exports['skein1024-256'] = Buffer.from('b380', 'hex')
exports['skein1024-264'] = Buffer.from('b381', 'hex')
exports['skein1024-272'] = Buffer.from('b382', 'hex')
exports['skein1024-280'] = Buffer.from('b383', 'hex')
exports['skein1024-288'] = Buffer.from('b384', 'hex')
exports['skein1024-296'] = Buffer.from('b385', 'hex')
exports['skein1024-304'] = Buffer.from('b386', 'hex')
exports['skein1024-312'] = Buffer.from('b387', 'hex')
exports['skein1024-320'] = Buffer.from('b388', 'hex')
exports['skein1024-328'] = Buffer.from('b389', 'hex')
exports['skein1024-336'] = Buffer.from('b38a', 'hex')
exports['skein1024-344'] = Buffer.from('b38b', 'hex')
exports['skein1024-352'] = Buffer.from('b38c', 'hex')
exports['skein1024-360'] = Buffer.from('b38d', 'hex')
exports['skein1024-368'] = Buffer.from('b38e', 'hex')
exports['skein1024-376'] = Buffer.from('b38f', 'hex')
exports['skein1024-384'] = Buffer.from('b390', 'hex')
exports['skein1024-392'] = Buffer.from('b391', 'hex')
exports['skein1024-400'] = Buffer.from('b392', 'hex')
exports['skein1024-408'] = Buffer.from('b393', 'hex')
exports['skein1024-416'] = Buffer.from('b394', 'hex')
exports['skein1024-424'] = Buffer.from('b395', 'hex')
exports['skein1024-432'] = Buffer.from('b396', 'hex')
exports['skein1024-440'] = Buffer.from('b397', 'hex')
exports['skein1024-448'] = Buffer.from('b398', 'hex')
exports['skein1024-456'] = Buffer.from('b399', 'hex')
exports['skein1024-464'] = Buffer.from('b39a', 'hex')
exports['skein1024-472'] = Buffer.from('b39b', 'hex')
exports['skein1024-480'] = Buffer.from('b39c', 'hex')
exports['skein1024-488'] = Buffer.from('b39d', 'hex')
exports['skein1024-496'] = Buffer.from('b39e', 'hex')
exports['skein1024-504'] = Buffer.from('b39f', 'hex')
exports['skein1024-512'] = Buffer.from('b3a0', 'hex')
exports['skein1024-520'] = Buffer.from('b3a1', 'hex')
exports['skein1024-528'] = Buffer.from('b3a2', 'hex')
exports['skein1024-536'] = Buffer.from('b3a3', 'hex')
exports['skein1024-544'] = Buffer.from('b3a4', 'hex')
exports['skein1024-552'] = Buffer.from('b3a5', 'hex')
exports['skein1024-560'] = Buffer.from('b3a6', 'hex')
exports['skein1024-568'] = Buffer.from('b3a7', 'hex')
exports['skein1024-576'] = Buffer.from('b3a8', 'hex')
exports['skein1024-584'] = Buffer.from('b3a9', 'hex')
exports['skein1024-592'] = Buffer.from('b3aa', 'hex')
exports['skein1024-600'] = Buffer.from('b3ab', 'hex')
exports['skein1024-608'] = Buffer.from('b3ac', 'hex')
exports['skein1024-616'] = Buffer.from('b3ad', 'hex')
exports['skein1024-624'] = Buffer.from('b3ae', 'hex')
exports['skein1024-632'] = Buffer.from('b3af', 'hex')
exports['skein1024-640'] = Buffer.from('b3b0', 'hex')
exports['skein1024-648'] = Buffer.from('b3b1', 'hex')
exports['skein1024-656'] = Buffer.from('b3b2', 'hex')
exports['skein1024-664'] = Buffer.from('b3b3', 'hex')
exports['skein1024-672'] = Buffer.from('b3b4', 'hex')
exports['skein1024-680'] = Buffer.from('b3b5', 'hex')
exports['skein1024-688'] = Buffer.from('b3b6', 'hex')
exports['skein1024-696'] = Buffer.from('b3b7', 'hex')
exports['skein1024-704'] = Buffer.from('b3b8', 'hex')
exports['skein1024-712'] = Buffer.from('b3b9', 'hex')
exports['skein1024-720'] = Buffer.from('b3ba', 'hex')
exports['skein1024-728'] = Buffer.from('b3bb', 'hex')
exports['skein1024-736'] = Buffer.from('b3bc', 'hex')
exports['skein1024-744'] = Buffer.from('b3bd', 'hex')
exports['skein1024-752'] = Buffer.from('b3be', 'hex')
exports['skein1024-760'] = Buffer.from('b3bf', 'hex')
exports['skein1024-768'] = Buffer.from('b3c0', 'hex')
exports['skein1024-776'] = Buffer.from('b3c1', 'hex')
exports['skein1024-784'] = Buffer.from('b3c2', 'hex')
exports['skein1024-792'] = Buffer.from('b3c3', 'hex')
exports['skein1024-800'] = Buffer.from('b3c4', 'hex')
exports['skein1024-808'] = Buffer.from('b3c5', 'hex')
exports['skein1024-816'] = Buffer.from('b3c6', 'hex')
exports['skein1024-824'] = Buffer.from('b3c7', 'hex')
exports['skein1024-832'] = Buffer.from('b3c8', 'hex')
exports['skein1024-840'] = Buffer.from('b3c9', 'hex')
exports['skein1024-848'] = Buffer.from('b3ca', 'hex')
exports['skein1024-856'] = Buffer.from('b3cb', 'hex')
exports['skein1024-864'] = Buffer.from('b3cc', 'hex')
exports['skein1024-872'] = Buffer.from('b3cd', 'hex')
exports['skein1024-880'] = Buffer.from('b3ce', 'hex')
exports['skein1024-888'] = Buffer.from('b3cf', 'hex')
exports['skein1024-896'] = Buffer.from('b3d0', 'hex')
exports['skein1024-904'] = Buffer.from('b3d1', 'hex')
exports['skein1024-912'] = Buffer.from('b3d2', 'hex')
exports['skein1024-920'] = Buffer.from('b3d3', 'hex')
exports['skein1024-928'] = Buffer.from('b3d4', 'hex')
exports['skein1024-936'] = Buffer.from('b3d5', 'hex')
exports['skein1024-944'] = Buffer.from('b3d6', 'hex')
exports['skein1024-952'] = Buffer.from('b3d7', 'hex')
exports['skein1024-960'] = Buffer.from('b3d8', 'hex')
exports['skein1024-968'] = Buffer.from('b3d9', 'hex')
exports['skein1024-976'] = Buffer.from('b3da', 'hex')
exports['skein1024-984'] = Buffer.from('b3db', 'hex')
exports['skein1024-992'] = Buffer.from('b3dc', 'hex')
exports['skein1024-1000'] = Buffer.from('b3dd', 'hex')
exports['skein1024-1008'] = Buffer.from('b3de', 'hex')
exports['skein1024-1016'] = Buffer.from('b3df', 'hex')
exports['skein1024-1024'] = Buffer.from('b3e0', 'hex')

// multiaddrs
exports['ip4'] = Buffer.from('04', 'hex')
exports['ip6'] = Buffer.from('29', 'hex')
exports['tcp'] = Buffer.from('06', 'hex')
exports['udp'] = Buffer.from('0111', 'hex')
exports['dccp'] = Buffer.from('21', 'hex')
exports['sctp'] = Buffer.from('84', 'hex')
exports['udt'] = Buffer.from('012d', 'hex')
exports['utp'] = Buffer.from('012e', 'hex')
exports['ipfs'] = Buffer.from('01a5', 'hex')
exports['http'] = Buffer.from('01e0', 'hex')
exports['https'] = Buffer.from('01bb', 'hex')
exports['quic'] = Buffer.from('01cc', 'hex')
exports['ws'] = Buffer.from('01dd', 'hex')
exports['onion'] = Buffer.from('01bc', 'hex')
exports['p2p-circuit'] = Buffer.from('0122', 'hex')

// archiving formats

// image formats

// video formats

// VCS formats
exports['git-raw'] = Buffer.from('78', 'hex')

// IPLD formats
exports['dag-pb'] = Buffer.from('70', 'hex')
exports['dag-cbor'] = Buffer.from('71', 'hex')
exports['git-raw'] = Buffer.from('78', 'hex')
exports['eth-block'] = Buffer.from('90', 'hex')
exports['eth-block-list'] = Buffer.from('91', 'hex')
exports['eth-tx-trie'] = Buffer.from('92', 'hex')
exports['eth-tx'] = Buffer.from('93', 'hex')
exports['eth-tx-receipt-trie'] = Buffer.from('94', 'hex')
exports['eth-tx-receipt'] = Buffer.from('95', 'hex')
exports['eth-state-trie'] = Buffer.from('96', 'hex')
exports['eth-account-snapshot'] = Buffer.from('97', 'hex')
exports['eth-storage-trie'] = Buffer.from('98', 'hex')

exports['bitcoin-block'] = Buffer.from('b0', 'hex')
exports['bitcoin-tx'] = Buffer.from('b1', 'hex')
exports['zcash-block'] = Buffer.from('c0', 'hex')
exports['zcash-tx'] = Buffer.from('c1', 'hex')
exports['stellar-block'] = Buffer.from('d0', 'hex')
exports['stellar-tx'] = Buffer.from('d1', 'hex')

exports['torrent-info'] = Buffer.from('7b', 'hex')
exports['torrent-file'] = Buffer.from('7c', 'hex')
exports['ed25519-pub'] = Buffer.from('ed', 'hex')

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/multicodec/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/multicodec/src/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Implementation of the multicodec specification.
 *
 * @module multicodec
 * @example
 * const multicodec = require('multicodec')
 *
 * const prefixedProtobuf = multicodec.addPrefix('protobuf', protobufBuffer)
 * // prefixedProtobuf 0x50...
 *
 */


const varint = __webpack_require__(/*! varint */ "./node_modules/varint/index.js")
const codecNameToCodeVarint = __webpack_require__(/*! ./varint-table */ "./node_modules/multicodec/src/varint-table.js")
const codeToCodecName = __webpack_require__(/*! ./name-table */ "./node_modules/multicodec/src/name-table.js")
const util = __webpack_require__(/*! ./util */ "./node_modules/multicodec/src/util.js")

exports = module.exports

/**
 * Prefix a buffer with a multicodec-packed.
 *
 * @param {string|number} multicodecStrOrCode
 * @param {Buffer} data
 * @returns {Buffer}
 */
exports.addPrefix = (multicodecStrOrCode, data) => {
  let prefix

  if (Buffer.isBuffer(multicodecStrOrCode)) {
    prefix = util.varintBufferEncode(multicodecStrOrCode)
  } else {
    if (codecNameToCodeVarint[multicodecStrOrCode]) {
      prefix = codecNameToCodeVarint[multicodecStrOrCode]
    } else {
      throw new Error('multicodec not recognized')
    }
  }
  return Buffer.concat([prefix, data])
}

/**
 * Decapsulate the multicodec-packed prefix from the data.
 *
 * @param {Buffer} data
 * @returns {Buffer}
 */
exports.rmPrefix = (data) => {
  varint.decode(data)
  return data.slice(varint.decode.bytes)
}

/**
 * Get the codec of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {string}
 */
exports.getCodec = (prefixedData) => {
  const code = util.varintBufferDecode(prefixedData)
  const codecName = codeToCodecName[code.toString('hex')]
  return codecName
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/multicodec/src/name-table.js":
/*!***************************************************!*\
  !*** ./node_modules/multicodec/src/name-table.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const baseTable = __webpack_require__(/*! ./base-table */ "./node_modules/multicodec/src/base-table.js")

// this creates a map for code as hexString -> codecName

const nameTable = {}
module.exports = nameTable

for (let encodingName in baseTable) {
  let code = baseTable[encodingName]
  nameTable[code.toString('hex')] = encodingName
}


/***/ }),

/***/ "./node_modules/multicodec/src/util.js":
/*!*********************************************!*\
  !*** ./node_modules/multicodec/src/util.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
const varint = __webpack_require__(/*! varint */ "./node_modules/varint/index.js")

module.exports = {
  numberToBuffer,
  bufferToNumber,
  varintBufferEncode,
  varintBufferDecode
}

function bufferToNumber (buf) {
  return parseInt(buf.toString('hex'), 16)
}

function numberToBuffer (num) {
  let hexString = num.toString(16)
  if (hexString.length % 2 === 1) {
    hexString = '0' + hexString
  }
  return Buffer.from(hexString, 'hex')
}

function varintBufferEncode (input) {
  return Buffer.from(varint.encode(bufferToNumber(input)))
}

function varintBufferDecode (input) {
  return numberToBuffer(varint.decode(input))
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/multicodec/src/varint-table.js":
/*!*****************************************************!*\
  !*** ./node_modules/multicodec/src/varint-table.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const baseTable = __webpack_require__(/*! ./base-table */ "./node_modules/multicodec/src/base-table.js")
const varintBufferEncode = __webpack_require__(/*! ./util */ "./node_modules/multicodec/src/util.js").varintBufferEncode

// this creates a map for codecName -> codeVarintBuffer

const varintTable = {}
module.exports = varintTable

for (let encodingName in baseTable) {
  let code = baseTable[encodingName]
  varintTable[encodingName] = varintBufferEncode(code)
}


/***/ }),

/***/ "./node_modules/multihashes/src/constants.js":
/*!***************************************************!*\
  !*** ./node_modules/multihashes/src/constants.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint quote-props: off */
/* eslint key-spacing: off */


exports.names = Object.freeze({
  'sha1':       0x11,
  'sha2-256':   0x12,
  'sha2-512':   0x13,
  'dbl-sha2-256': 0x56,
  'sha3-224':   0x17,
  'sha3-256':   0x16,
  'sha3-384':   0x15,
  'sha3-512':   0x14,
  'shake-128':  0x18,
  'shake-256':  0x19,
  'keccak-224': 0x1A,
  'keccak-256': 0x1B,
  'keccak-384': 0x1C,
  'keccak-512': 0x1D,
  'murmur3-128': 0x22,
  'murmur3-32':  0x23,
  'blake2b-8':   0xb201,
  'blake2b-16':  0xb202,
  'blake2b-24':  0xb203,
  'blake2b-32':  0xb204,
  'blake2b-40':  0xb205,
  'blake2b-48':  0xb206,
  'blake2b-56':  0xb207,
  'blake2b-64':  0xb208,
  'blake2b-72':  0xb209,
  'blake2b-80':  0xb20a,
  'blake2b-88':  0xb20b,
  'blake2b-96':  0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8':   0xb241,
  'blake2s-16':  0xb242,
  'blake2s-24':  0xb243,
  'blake2s-32':  0xb244,
  'blake2s-40':  0xb245,
  'blake2s-48':  0xb246,
  'blake2s-56':  0xb247,
  'blake2s-64':  0xb248,
  'blake2s-72':  0xb249,
  'blake2s-80':  0xb24a,
  'blake2s-88':  0xb24b,
  'blake2s-96':  0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'Skein256-8': 0xb301,
  'Skein256-16': 0xb302,
  'Skein256-24': 0xb303,
  'Skein256-32': 0xb304,
  'Skein256-40': 0xb305,
  'Skein256-48': 0xb306,
  'Skein256-56': 0xb307,
  'Skein256-64': 0xb308,
  'Skein256-72': 0xb309,
  'Skein256-80': 0xb30a,
  'Skein256-88': 0xb30b,
  'Skein256-96': 0xb30c,
  'Skein256-104': 0xb30d,
  'Skein256-112': 0xb30e,
  'Skein256-120': 0xb30f,
  'Skein256-128': 0xb310,
  'Skein256-136': 0xb311,
  'Skein256-144': 0xb312,
  'Skein256-152': 0xb313,
  'Skein256-160': 0xb314,
  'Skein256-168': 0xb315,
  'Skein256-176': 0xb316,
  'Skein256-184': 0xb317,
  'Skein256-192': 0xb318,
  'Skein256-200': 0xb319,
  'Skein256-208': 0xb31a,
  'Skein256-216': 0xb31b,
  'Skein256-224': 0xb31c,
  'Skein256-232': 0xb31d,
  'Skein256-240': 0xb31e,
  'Skein256-248': 0xb31f,
  'Skein256-256': 0xb320,
  'Skein512-8': 0xb321,
  'Skein512-16': 0xb322,
  'Skein512-24': 0xb323,
  'Skein512-32': 0xb324,
  'Skein512-40': 0xb325,
  'Skein512-48': 0xb326,
  'Skein512-56': 0xb327,
  'Skein512-64': 0xb328,
  'Skein512-72': 0xb329,
  'Skein512-80': 0xb32a,
  'Skein512-88': 0xb32b,
  'Skein512-96': 0xb32c,
  'Skein512-104': 0xb32d,
  'Skein512-112': 0xb32e,
  'Skein512-120': 0xb32f,
  'Skein512-128': 0xb330,
  'Skein512-136': 0xb331,
  'Skein512-144': 0xb332,
  'Skein512-152': 0xb333,
  'Skein512-160': 0xb334,
  'Skein512-168': 0xb335,
  'Skein512-176': 0xb336,
  'Skein512-184': 0xb337,
  'Skein512-192': 0xb338,
  'Skein512-200': 0xb339,
  'Skein512-208': 0xb33a,
  'Skein512-216': 0xb33b,
  'Skein512-224': 0xb33c,
  'Skein512-232': 0xb33d,
  'Skein512-240': 0xb33e,
  'Skein512-248': 0xb33f,
  'Skein512-256': 0xb340,
  'Skein512-264': 0xb341,
  'Skein512-272': 0xb342,
  'Skein512-280': 0xb343,
  'Skein512-288': 0xb344,
  'Skein512-296': 0xb345,
  'Skein512-304': 0xb346,
  'Skein512-312': 0xb347,
  'Skein512-320': 0xb348,
  'Skein512-328': 0xb349,
  'Skein512-336': 0xb34a,
  'Skein512-344': 0xb34b,
  'Skein512-352': 0xb34c,
  'Skein512-360': 0xb34d,
  'Skein512-368': 0xb34e,
  'Skein512-376': 0xb34f,
  'Skein512-384': 0xb350,
  'Skein512-392': 0xb351,
  'Skein512-400': 0xb352,
  'Skein512-408': 0xb353,
  'Skein512-416': 0xb354,
  'Skein512-424': 0xb355,
  'Skein512-432': 0xb356,
  'Skein512-440': 0xb357,
  'Skein512-448': 0xb358,
  'Skein512-456': 0xb359,
  'Skein512-464': 0xb35a,
  'Skein512-472': 0xb35b,
  'Skein512-480': 0xb35c,
  'Skein512-488': 0xb35d,
  'Skein512-496': 0xb35e,
  'Skein512-504': 0xb35f,
  'Skein512-512': 0xb360,
  'Skein1024-8': 0xb361,
  'Skein1024-16': 0xb362,
  'Skein1024-24': 0xb363,
  'Skein1024-32': 0xb364,
  'Skein1024-40': 0xb365,
  'Skein1024-48': 0xb366,
  'Skein1024-56': 0xb367,
  'Skein1024-64': 0xb368,
  'Skein1024-72': 0xb369,
  'Skein1024-80': 0xb36a,
  'Skein1024-88': 0xb36b,
  'Skein1024-96': 0xb36c,
  'Skein1024-104': 0xb36d,
  'Skein1024-112': 0xb36e,
  'Skein1024-120': 0xb36f,
  'Skein1024-128': 0xb370,
  'Skein1024-136': 0xb371,
  'Skein1024-144': 0xb372,
  'Skein1024-152': 0xb373,
  'Skein1024-160': 0xb374,
  'Skein1024-168': 0xb375,
  'Skein1024-176': 0xb376,
  'Skein1024-184': 0xb377,
  'Skein1024-192': 0xb378,
  'Skein1024-200': 0xb379,
  'Skein1024-208': 0xb37a,
  'Skein1024-216': 0xb37b,
  'Skein1024-224': 0xb37c,
  'Skein1024-232': 0xb37d,
  'Skein1024-240': 0xb37e,
  'Skein1024-248': 0xb37f,
  'Skein1024-256': 0xb380,
  'Skein1024-264': 0xb381,
  'Skein1024-272': 0xb382,
  'Skein1024-280': 0xb383,
  'Skein1024-288': 0xb384,
  'Skein1024-296': 0xb385,
  'Skein1024-304': 0xb386,
  'Skein1024-312': 0xb387,
  'Skein1024-320': 0xb388,
  'Skein1024-328': 0xb389,
  'Skein1024-336': 0xb38a,
  'Skein1024-344': 0xb38b,
  'Skein1024-352': 0xb38c,
  'Skein1024-360': 0xb38d,
  'Skein1024-368': 0xb38e,
  'Skein1024-376': 0xb38f,
  'Skein1024-384': 0xb390,
  'Skein1024-392': 0xb391,
  'Skein1024-400': 0xb392,
  'Skein1024-408': 0xb393,
  'Skein1024-416': 0xb394,
  'Skein1024-424': 0xb395,
  'Skein1024-432': 0xb396,
  'Skein1024-440': 0xb397,
  'Skein1024-448': 0xb398,
  'Skein1024-456': 0xb399,
  'Skein1024-464': 0xb39a,
  'Skein1024-472': 0xb39b,
  'Skein1024-480': 0xb39c,
  'Skein1024-488': 0xb39d,
  'Skein1024-496': 0xb39e,
  'Skein1024-504': 0xb39f,
  'Skein1024-512': 0xb3a0,
  'Skein1024-520': 0xb3a1,
  'Skein1024-528': 0xb3a2,
  'Skein1024-536': 0xb3a3,
  'Skein1024-544': 0xb3a4,
  'Skein1024-552': 0xb3a5,
  'Skein1024-560': 0xb3a6,
  'Skein1024-568': 0xb3a7,
  'Skein1024-576': 0xb3a8,
  'Skein1024-584': 0xb3a9,
  'Skein1024-592': 0xb3aa,
  'Skein1024-600': 0xb3ab,
  'Skein1024-608': 0xb3ac,
  'Skein1024-616': 0xb3ad,
  'Skein1024-624': 0xb3ae,
  'Skein1024-632': 0xb3af,
  'Skein1024-640': 0xb3b0,
  'Skein1024-648': 0xb3b1,
  'Skein1024-656': 0xb3b2,
  'Skein1024-664': 0xb3b3,
  'Skein1024-672': 0xb3b4,
  'Skein1024-680': 0xb3b5,
  'Skein1024-688': 0xb3b6,
  'Skein1024-696': 0xb3b7,
  'Skein1024-704': 0xb3b8,
  'Skein1024-712': 0xb3b9,
  'Skein1024-720': 0xb3ba,
  'Skein1024-728': 0xb3bb,
  'Skein1024-736': 0xb3bc,
  'Skein1024-744': 0xb3bd,
  'Skein1024-752': 0xb3be,
  'Skein1024-760': 0xb3bf,
  'Skein1024-768': 0xb3c0,
  'Skein1024-776': 0xb3c1,
  'Skein1024-784': 0xb3c2,
  'Skein1024-792': 0xb3c3,
  'Skein1024-800': 0xb3c4,
  'Skein1024-808': 0xb3c5,
  'Skein1024-816': 0xb3c6,
  'Skein1024-824': 0xb3c7,
  'Skein1024-832': 0xb3c8,
  'Skein1024-840': 0xb3c9,
  'Skein1024-848': 0xb3ca,
  'Skein1024-856': 0xb3cb,
  'Skein1024-864': 0xb3cc,
  'Skein1024-872': 0xb3cd,
  'Skein1024-880': 0xb3ce,
  'Skein1024-888': 0xb3cf,
  'Skein1024-896': 0xb3d0,
  'Skein1024-904': 0xb3d1,
  'Skein1024-912': 0xb3d2,
  'Skein1024-920': 0xb3d3,
  'Skein1024-928': 0xb3d4,
  'Skein1024-936': 0xb3d5,
  'Skein1024-944': 0xb3d6,
  'Skein1024-952': 0xb3d7,
  'Skein1024-960': 0xb3d8,
  'Skein1024-968': 0xb3d9,
  'Skein1024-976': 0xb3da,
  'Skein1024-984': 0xb3db,
  'Skein1024-992': 0xb3dc,
  'Skein1024-1000': 0xb3dd,
  'Skein1024-1008': 0xb3de,
  'Skein1024-1016': 0xb3df,
  'Skein1024-1024': 0xb3e0
})

exports.codes = Object.freeze({
  0x11: 'sha1',
  0x12: 'sha2-256',
  0x13: 'sha2-512',
  0x56: 'dbl-sha2-256',
  0x17: 'sha3-224',
  0x16: 'sha3-256',
  0x15: 'sha3-384',
  0x14: 'sha3-512',
  0x18: 'shake-128',
  0x19: 'shake-256',
  0x1A: 'keccak-224',
  0x1B: 'keccak-256',
  0x1C: 'keccak-384',
  0x1D: 'keccak-512',
  0x22: 'murmur3-128',
  0x23: 'murmur3-32',

  // blake2
  0xb201: 'blake2b-8',
  0xb202: 'blake2b-16',
  0xb203: 'blake2b-24',
  0xb204: 'blake2b-32',
  0xb205: 'blake2b-40',
  0xb206: 'blake2b-48',
  0xb207: 'blake2b-56',
  0xb208: 'blake2b-64',
  0xb209: 'blake2b-72',
  0xb20a: 'blake2b-80',
  0xb20b: 'blake2b-88',
  0xb20c: 'blake2b-96',
  0xb20d: 'blake2b-104',
  0xb20e: 'blake2b-112',
  0xb20f: 'blake2b-120',
  0xb210: 'blake2b-128',
  0xb211: 'blake2b-136',
  0xb212: 'blake2b-144',
  0xb213: 'blake2b-152',
  0xb214: 'blake2b-160',
  0xb215: 'blake2b-168',
  0xb216: 'blake2b-176',
  0xb217: 'blake2b-184',
  0xb218: 'blake2b-192',
  0xb219: 'blake2b-200',
  0xb21a: 'blake2b-208',
  0xb21b: 'blake2b-216',
  0xb21c: 'blake2b-224',
  0xb21d: 'blake2b-232',
  0xb21e: 'blake2b-240',
  0xb21f: 'blake2b-248',
  0xb220: 'blake2b-256',
  0xb221: 'blake2b-264',
  0xb222: 'blake2b-272',
  0xb223: 'blake2b-280',
  0xb224: 'blake2b-288',
  0xb225: 'blake2b-296',
  0xb226: 'blake2b-304',
  0xb227: 'blake2b-312',
  0xb228: 'blake2b-320',
  0xb229: 'blake2b-328',
  0xb22a: 'blake2b-336',
  0xb22b: 'blake2b-344',
  0xb22c: 'blake2b-352',
  0xb22d: 'blake2b-360',
  0xb22e: 'blake2b-368',
  0xb22f: 'blake2b-376',
  0xb230: 'blake2b-384',
  0xb231: 'blake2b-392',
  0xb232: 'blake2b-400',
  0xb233: 'blake2b-408',
  0xb234: 'blake2b-416',
  0xb235: 'blake2b-424',
  0xb236: 'blake2b-432',
  0xb237: 'blake2b-440',
  0xb238: 'blake2b-448',
  0xb239: 'blake2b-456',
  0xb23a: 'blake2b-464',
  0xb23b: 'blake2b-472',
  0xb23c: 'blake2b-480',
  0xb23d: 'blake2b-488',
  0xb23e: 'blake2b-496',
  0xb23f: 'blake2b-504',
  0xb240: 'blake2b-512',
  0xb241: 'blake2s-8',
  0xb242: 'blake2s-16',
  0xb243: 'blake2s-24',
  0xb244: 'blake2s-32',
  0xb245: 'blake2s-40',
  0xb246: 'blake2s-48',
  0xb247: 'blake2s-56',
  0xb248: 'blake2s-64',
  0xb249: 'blake2s-72',
  0xb24a: 'blake2s-80',
  0xb24b: 'blake2s-88',
  0xb24c: 'blake2s-96',
  0xb24d: 'blake2s-104',
  0xb24e: 'blake2s-112',
  0xb24f: 'blake2s-120',
  0xb250: 'blake2s-128',
  0xb251: 'blake2s-136',
  0xb252: 'blake2s-144',
  0xb253: 'blake2s-152',
  0xb254: 'blake2s-160',
  0xb255: 'blake2s-168',
  0xb256: 'blake2s-176',
  0xb257: 'blake2s-184',
  0xb258: 'blake2s-192',
  0xb259: 'blake2s-200',
  0xb25a: 'blake2s-208',
  0xb25b: 'blake2s-216',
  0xb25c: 'blake2s-224',
  0xb25d: 'blake2s-232',
  0xb25e: 'blake2s-240',
  0xb25f: 'blake2s-248',
  0xb260: 'blake2s-256',

  // skein
  0xb301: 'Skein256-8',
  0xb302: 'Skein256-16',
  0xb303: 'Skein256-24',
  0xb304: 'Skein256-32',
  0xb305: 'Skein256-40',
  0xb306: 'Skein256-48',
  0xb307: 'Skein256-56',
  0xb308: 'Skein256-64',
  0xb309: 'Skein256-72',
  0xb30a: 'Skein256-80',
  0xb30b: 'Skein256-88',
  0xb30c: 'Skein256-96',
  0xb30d: 'Skein256-104',
  0xb30e: 'Skein256-112',
  0xb30f: 'Skein256-120',
  0xb310: 'Skein256-128',
  0xb311: 'Skein256-136',
  0xb312: 'Skein256-144',
  0xb313: 'Skein256-152',
  0xb314: 'Skein256-160',
  0xb315: 'Skein256-168',
  0xb316: 'Skein256-176',
  0xb317: 'Skein256-184',
  0xb318: 'Skein256-192',
  0xb319: 'Skein256-200',
  0xb31a: 'Skein256-208',
  0xb31b: 'Skein256-216',
  0xb31c: 'Skein256-224',
  0xb31d: 'Skein256-232',
  0xb31e: 'Skein256-240',
  0xb31f: 'Skein256-248',
  0xb320: 'Skein256-256',
  0xb321: 'Skein512-8',
  0xb322: 'Skein512-16',
  0xb323: 'Skein512-24',
  0xb324: 'Skein512-32',
  0xb325: 'Skein512-40',
  0xb326: 'Skein512-48',
  0xb327: 'Skein512-56',
  0xb328: 'Skein512-64',
  0xb329: 'Skein512-72',
  0xb32a: 'Skein512-80',
  0xb32b: 'Skein512-88',
  0xb32c: 'Skein512-96',
  0xb32d: 'Skein512-104',
  0xb32e: 'Skein512-112',
  0xb32f: 'Skein512-120',
  0xb330: 'Skein512-128',
  0xb331: 'Skein512-136',
  0xb332: 'Skein512-144',
  0xb333: 'Skein512-152',
  0xb334: 'Skein512-160',
  0xb335: 'Skein512-168',
  0xb336: 'Skein512-176',
  0xb337: 'Skein512-184',
  0xb338: 'Skein512-192',
  0xb339: 'Skein512-200',
  0xb33a: 'Skein512-208',
  0xb33b: 'Skein512-216',
  0xb33c: 'Skein512-224',
  0xb33d: 'Skein512-232',
  0xb33e: 'Skein512-240',
  0xb33f: 'Skein512-248',
  0xb340: 'Skein512-256',
  0xb341: 'Skein512-264',
  0xb342: 'Skein512-272',
  0xb343: 'Skein512-280',
  0xb344: 'Skein512-288',
  0xb345: 'Skein512-296',
  0xb346: 'Skein512-304',
  0xb347: 'Skein512-312',
  0xb348: 'Skein512-320',
  0xb349: 'Skein512-328',
  0xb34a: 'Skein512-336',
  0xb34b: 'Skein512-344',
  0xb34c: 'Skein512-352',
  0xb34d: 'Skein512-360',
  0xb34e: 'Skein512-368',
  0xb34f: 'Skein512-376',
  0xb350: 'Skein512-384',
  0xb351: 'Skein512-392',
  0xb352: 'Skein512-400',
  0xb353: 'Skein512-408',
  0xb354: 'Skein512-416',
  0xb355: 'Skein512-424',
  0xb356: 'Skein512-432',
  0xb357: 'Skein512-440',
  0xb358: 'Skein512-448',
  0xb359: 'Skein512-456',
  0xb35a: 'Skein512-464',
  0xb35b: 'Skein512-472',
  0xb35c: 'Skein512-480',
  0xb35d: 'Skein512-488',
  0xb35e: 'Skein512-496',
  0xb35f: 'Skein512-504',
  0xb360: 'Skein512-512',
  0xb361: 'Skein1024-8',
  0xb362: 'Skein1024-16',
  0xb363: 'Skein1024-24',
  0xb364: 'Skein1024-32',
  0xb365: 'Skein1024-40',
  0xb366: 'Skein1024-48',
  0xb367: 'Skein1024-56',
  0xb368: 'Skein1024-64',
  0xb369: 'Skein1024-72',
  0xb36a: 'Skein1024-80',
  0xb36b: 'Skein1024-88',
  0xb36c: 'Skein1024-96',
  0xb36d: 'Skein1024-104',
  0xb36e: 'Skein1024-112',
  0xb36f: 'Skein1024-120',
  0xb370: 'Skein1024-128',
  0xb371: 'Skein1024-136',
  0xb372: 'Skein1024-144',
  0xb373: 'Skein1024-152',
  0xb374: 'Skein1024-160',
  0xb375: 'Skein1024-168',
  0xb376: 'Skein1024-176',
  0xb377: 'Skein1024-184',
  0xb378: 'Skein1024-192',
  0xb379: 'Skein1024-200',
  0xb37a: 'Skein1024-208',
  0xb37b: 'Skein1024-216',
  0xb37c: 'Skein1024-224',
  0xb37d: 'Skein1024-232',
  0xb37e: 'Skein1024-240',
  0xb37f: 'Skein1024-248',
  0xb380: 'Skein1024-256',
  0xb381: 'Skein1024-264',
  0xb382: 'Skein1024-272',
  0xb383: 'Skein1024-280',
  0xb384: 'Skein1024-288',
  0xb385: 'Skein1024-296',
  0xb386: 'Skein1024-304',
  0xb387: 'Skein1024-312',
  0xb388: 'Skein1024-320',
  0xb389: 'Skein1024-328',
  0xb38a: 'Skein1024-336',
  0xb38b: 'Skein1024-344',
  0xb38c: 'Skein1024-352',
  0xb38d: 'Skein1024-360',
  0xb38e: 'Skein1024-368',
  0xb38f: 'Skein1024-376',
  0xb390: 'Skein1024-384',
  0xb391: 'Skein1024-392',
  0xb392: 'Skein1024-400',
  0xb393: 'Skein1024-408',
  0xb394: 'Skein1024-416',
  0xb395: 'Skein1024-424',
  0xb396: 'Skein1024-432',
  0xb397: 'Skein1024-440',
  0xb398: 'Skein1024-448',
  0xb399: 'Skein1024-456',
  0xb39a: 'Skein1024-464',
  0xb39b: 'Skein1024-472',
  0xb39c: 'Skein1024-480',
  0xb39d: 'Skein1024-488',
  0xb39e: 'Skein1024-496',
  0xb39f: 'Skein1024-504',
  0xb3a0: 'Skein1024-512',
  0xb3a1: 'Skein1024-520',
  0xb3a2: 'Skein1024-528',
  0xb3a3: 'Skein1024-536',
  0xb3a4: 'Skein1024-544',
  0xb3a5: 'Skein1024-552',
  0xb3a6: 'Skein1024-560',
  0xb3a7: 'Skein1024-568',
  0xb3a8: 'Skein1024-576',
  0xb3a9: 'Skein1024-584',
  0xb3aa: 'Skein1024-592',
  0xb3ab: 'Skein1024-600',
  0xb3ac: 'Skein1024-608',
  0xb3ad: 'Skein1024-616',
  0xb3ae: 'Skein1024-624',
  0xb3af: 'Skein1024-632',
  0xb3b0: 'Skein1024-640',
  0xb3b1: 'Skein1024-648',
  0xb3b2: 'Skein1024-656',
  0xb3b3: 'Skein1024-664',
  0xb3b4: 'Skein1024-672',
  0xb3b5: 'Skein1024-680',
  0xb3b6: 'Skein1024-688',
  0xb3b7: 'Skein1024-696',
  0xb3b8: 'Skein1024-704',
  0xb3b9: 'Skein1024-712',
  0xb3ba: 'Skein1024-720',
  0xb3bb: 'Skein1024-728',
  0xb3bc: 'Skein1024-736',
  0xb3bd: 'Skein1024-744',
  0xb3be: 'Skein1024-752',
  0xb3bf: 'Skein1024-760',
  0xb3c0: 'Skein1024-768',
  0xb3c1: 'Skein1024-776',
  0xb3c2: 'Skein1024-784',
  0xb3c3: 'Skein1024-792',
  0xb3c4: 'Skein1024-800',
  0xb3c5: 'Skein1024-808',
  0xb3c6: 'Skein1024-816',
  0xb3c7: 'Skein1024-824',
  0xb3c8: 'Skein1024-832',
  0xb3c9: 'Skein1024-840',
  0xb3ca: 'Skein1024-848',
  0xb3cb: 'Skein1024-856',
  0xb3cc: 'Skein1024-864',
  0xb3cd: 'Skein1024-872',
  0xb3ce: 'Skein1024-880',
  0xb3cf: 'Skein1024-888',
  0xb3d0: 'Skein1024-896',
  0xb3d1: 'Skein1024-904',
  0xb3d2: 'Skein1024-912',
  0xb3d3: 'Skein1024-920',
  0xb3d4: 'Skein1024-928',
  0xb3d5: 'Skein1024-936',
  0xb3d6: 'Skein1024-944',
  0xb3d7: 'Skein1024-952',
  0xb3d8: 'Skein1024-960',
  0xb3d9: 'Skein1024-968',
  0xb3da: 'Skein1024-976',
  0xb3db: 'Skein1024-984',
  0xb3dc: 'Skein1024-992',
  0xb3dd: 'Skein1024-1000',
  0xb3de: 'Skein1024-1008',
  0xb3df: 'Skein1024-1016',
  0xb3e0: 'Skein1024-1024'
})

exports.defaultLengths = Object.freeze({
  0x11: 20,
  0x12: 32,
  0x13: 64,
  0x56: 32,
  0x17: 28,
  0x16: 32,
  0x15: 48,
  0x14: 64,
  0x18: 32,
  0x19: 64,
  0x1A: 28,
  0x1B: 32,
  0x1C: 48,
  0x1D: 64,
  0x22: 32,

  0xb201: 0x01,
  0xb202: 0x02,
  0xb203: 0x03,
  0xb204: 0x04,
  0xb205: 0x05,
  0xb206: 0x06,
  0xb207: 0x07,
  0xb208: 0x08,
  0xb209: 0x09,
  0xb20a: 0x0a,
  0xb20b: 0x0b,
  0xb20c: 0x0c,
  0xb20d: 0x0d,
  0xb20e: 0x0e,
  0xb20f: 0x0f,
  0xb210: 0x10,
  0xb211: 0x11,
  0xb212: 0x12,
  0xb213: 0x13,
  0xb214: 0x14,
  0xb215: 0x15,
  0xb216: 0x16,
  0xb217: 0x17,
  0xb218: 0x18,
  0xb219: 0x19,
  0xb21a: 0x1a,
  0xb21b: 0x1b,
  0xb21c: 0x1c,
  0xb21d: 0x1d,
  0xb21e: 0x1e,
  0xb21f: 0x1f,
  0xb220: 0x20,
  0xb221: 0x21,
  0xb222: 0x22,
  0xb223: 0x23,
  0xb224: 0x24,
  0xb225: 0x25,
  0xb226: 0x26,
  0xb227: 0x27,
  0xb228: 0x28,
  0xb229: 0x29,
  0xb22a: 0x2a,
  0xb22b: 0x2b,
  0xb22c: 0x2c,
  0xb22d: 0x2d,
  0xb22e: 0x2e,
  0xb22f: 0x2f,
  0xb230: 0x30,
  0xb231: 0x31,
  0xb232: 0x32,
  0xb233: 0x33,
  0xb234: 0x34,
  0xb235: 0x35,
  0xb236: 0x36,
  0xb237: 0x37,
  0xb238: 0x38,
  0xb239: 0x39,
  0xb23a: 0x3a,
  0xb23b: 0x3b,
  0xb23c: 0x3c,
  0xb23d: 0x3d,
  0xb23e: 0x3e,
  0xb23f: 0x3f,
  0xb240: 0x40,
  0xb241: 0x01,
  0xb242: 0x02,
  0xb243: 0x03,
  0xb244: 0x04,
  0xb245: 0x05,
  0xb246: 0x06,
  0xb247: 0x07,
  0xb248: 0x08,
  0xb249: 0x09,
  0xb24a: 0x0a,
  0xb24b: 0x0b,
  0xb24c: 0x0c,
  0xb24d: 0x0d,
  0xb24e: 0x0e,
  0xb24f: 0x0f,
  0xb250: 0x10,
  0xb251: 0x11,
  0xb252: 0x12,
  0xb253: 0x13,
  0xb254: 0x14,
  0xb255: 0x15,
  0xb256: 0x16,
  0xb257: 0x17,
  0xb258: 0x18,
  0xb259: 0x19,
  0xb25a: 0x1a,
  0xb25b: 0x1b,
  0xb25c: 0x1c,
  0xb25d: 0x1d,
  0xb25e: 0x1e,
  0xb25f: 0x1f,
  0xb260: 0x20,
  0xb301: 0x01,
  0xb302: 0x02,
  0xb303: 0x03,
  0xb304: 0x04,
  0xb305: 0x05,
  0xb306: 0x06,
  0xb307: 0x07,
  0xb308: 0x08,
  0xb309: 0x09,
  0xb30a: 0x0a,
  0xb30b: 0x0b,
  0xb30c: 0x0c,
  0xb30d: 0x0d,
  0xb30e: 0x0e,
  0xb30f: 0x0f,
  0xb310: 0x10,
  0xb311: 0x11,
  0xb312: 0x12,
  0xb313: 0x13,
  0xb314: 0x14,
  0xb315: 0x15,
  0xb316: 0x16,
  0xb317: 0x17,
  0xb318: 0x18,
  0xb319: 0x19,
  0xb31a: 0x1a,
  0xb31b: 0x1b,
  0xb31c: 0x1c,
  0xb31d: 0x1d,
  0xb31e: 0x1e,
  0xb31f: 0x1f,
  0xb320: 0x20,
  0xb321: 0x01,
  0xb322: 0x02,
  0xb323: 0x03,
  0xb324: 0x04,
  0xb325: 0x05,
  0xb326: 0x06,
  0xb327: 0x07,
  0xb328: 0x08,
  0xb329: 0x09,
  0xb32a: 0x0a,
  0xb32b: 0x0b,
  0xb32c: 0x0c,
  0xb32d: 0x0d,
  0xb32e: 0x0e,
  0xb32f: 0x0f,
  0xb330: 0x10,
  0xb331: 0x11,
  0xb332: 0x12,
  0xb333: 0x13,
  0xb334: 0x14,
  0xb335: 0x15,
  0xb336: 0x16,
  0xb337: 0x17,
  0xb338: 0x18,
  0xb339: 0x19,
  0xb33a: 0x1a,
  0xb33b: 0x1b,
  0xb33c: 0x1c,
  0xb33d: 0x1d,
  0xb33e: 0x1e,
  0xb33f: 0x1f,
  0xb340: 0x20,
  0xb341: 0x21,
  0xb342: 0x22,
  0xb343: 0x23,
  0xb344: 0x24,
  0xb345: 0x25,
  0xb346: 0x26,
  0xb347: 0x27,
  0xb348: 0x28,
  0xb349: 0x29,
  0xb34a: 0x2a,
  0xb34b: 0x2b,
  0xb34c: 0x2c,
  0xb34d: 0x2d,
  0xb34e: 0x2e,
  0xb34f: 0x2f,
  0xb350: 0x30,
  0xb351: 0x31,
  0xb352: 0x32,
  0xb353: 0x33,
  0xb354: 0x34,
  0xb355: 0x35,
  0xb356: 0x36,
  0xb357: 0x37,
  0xb358: 0x38,
  0xb359: 0x39,
  0xb35a: 0x3a,
  0xb35b: 0x3b,
  0xb35c: 0x3c,
  0xb35d: 0x3d,
  0xb35e: 0x3e,
  0xb35f: 0x3f,
  0xb360: 0x40,
  0xb361: 0x01,
  0xb362: 0x02,
  0xb363: 0x03,
  0xb364: 0x04,
  0xb365: 0x05,
  0xb366: 0x06,
  0xb367: 0x07,
  0xb368: 0x08,
  0xb369: 0x09,
  0xb36a: 0x0a,
  0xb36b: 0x0b,
  0xb36c: 0x0c,
  0xb36d: 0x0d,
  0xb36e: 0x0e,
  0xb36f: 0x0f,
  0xb370: 0x10,
  0xb371: 0x11,
  0xb372: 0x12,
  0xb373: 0x13,
  0xb374: 0x14,
  0xb375: 0x15,
  0xb376: 0x16,
  0xb377: 0x17,
  0xb378: 0x18,
  0xb379: 0x19,
  0xb37a: 0x1a,
  0xb37b: 0x1b,
  0xb37c: 0x1c,
  0xb37d: 0x1d,
  0xb37e: 0x1e,
  0xb37f: 0x1f,
  0xb380: 0x20,
  0xb381: 0x21,
  0xb382: 0x22,
  0xb383: 0x23,
  0xb384: 0x24,
  0xb385: 0x25,
  0xb386: 0x26,
  0xb387: 0x27,
  0xb388: 0x28,
  0xb389: 0x29,
  0xb38a: 0x2a,
  0xb38b: 0x2b,
  0xb38c: 0x2c,
  0xb38d: 0x2d,
  0xb38e: 0x2e,
  0xb38f: 0x2f,
  0xb390: 0x30,
  0xb391: 0x31,
  0xb392: 0x32,
  0xb393: 0x33,
  0xb394: 0x34,
  0xb395: 0x35,
  0xb396: 0x36,
  0xb397: 0x37,
  0xb398: 0x38,
  0xb399: 0x39,
  0xb39a: 0x3a,
  0xb39b: 0x3b,
  0xb39c: 0x3c,
  0xb39d: 0x3d,
  0xb39e: 0x3e,
  0xb39f: 0x3f,
  0xb3a0: 0x40,
  0xb3a1: 0x41,
  0xb3a2: 0x42,
  0xb3a3: 0x43,
  0xb3a4: 0x44,
  0xb3a5: 0x45,
  0xb3a6: 0x46,
  0xb3a7: 0x47,
  0xb3a8: 0x48,
  0xb3a9: 0x49,
  0xb3aa: 0x4a,
  0xb3ab: 0x4b,
  0xb3ac: 0x4c,
  0xb3ad: 0x4d,
  0xb3ae: 0x4e,
  0xb3af: 0x4f,
  0xb3b0: 0x50,
  0xb3b1: 0x51,
  0xb3b2: 0x52,
  0xb3b3: 0x53,
  0xb3b4: 0x54,
  0xb3b5: 0x55,
  0xb3b6: 0x56,
  0xb3b7: 0x57,
  0xb3b8: 0x58,
  0xb3b9: 0x59,
  0xb3ba: 0x5a,
  0xb3bb: 0x5b,
  0xb3bc: 0x5c,
  0xb3bd: 0x5d,
  0xb3be: 0x5e,
  0xb3bf: 0x5f,
  0xb3c0: 0x60,
  0xb3c1: 0x61,
  0xb3c2: 0x62,
  0xb3c3: 0x63,
  0xb3c4: 0x64,
  0xb3c5: 0x65,
  0xb3c6: 0x66,
  0xb3c7: 0x67,
  0xb3c8: 0x68,
  0xb3c9: 0x69,
  0xb3ca: 0x6a,
  0xb3cb: 0x6b,
  0xb3cc: 0x6c,
  0xb3cd: 0x6d,
  0xb3ce: 0x6e,
  0xb3cf: 0x6f,
  0xb3d0: 0x70,
  0xb3d1: 0x71,
  0xb3d2: 0x72,
  0xb3d3: 0x73,
  0xb3d4: 0x74,
  0xb3d5: 0x75,
  0xb3d6: 0x76,
  0xb3d7: 0x77,
  0xb3d8: 0x78,
  0xb3d9: 0x79,
  0xb3da: 0x7a,
  0xb3db: 0x7b,
  0xb3dc: 0x7c,
  0xb3dd: 0x7d,
  0xb3de: 0x7e,
  0xb3df: 0x7f,
  0xb3e0: 0x80
})


/***/ }),

/***/ "./node_modules/multihashes/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/multihashes/src/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Multihash implementation in JavaScript.
 *
 * @module multihash
 */


const bs58 = __webpack_require__(/*! bs58 */ "./node_modules/bs58/index.js")

const cs = __webpack_require__(/*! ./constants */ "./node_modules/multihashes/src/constants.js")

exports.names = cs.names
exports.codes = cs.codes
exports.defaultLengths = cs.defaultLengths

const varint = __webpack_require__(/*! varint */ "./node_modules/varint/index.js")

/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */
exports.toHexString = function toHexString (hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer')
  }

  return hash.toString('hex')
}

/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Buffer}
 */
exports.fromHexString = function fromHexString (hash) {
  return Buffer.from(hash, 'hex')
}

/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */
exports.toB58String = function toB58String (hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer')
  }

  return bs58.encode(hash)
}

/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Buffer} hash
 * @returns {Buffer}
 */
exports.fromB58String = function fromB58String (hash) {
  let encoded = hash
  if (Buffer.isBuffer(hash)) {
    encoded = hash.toString()
  }

  return Buffer.from(bs58.decode(encoded))
}

/**
 * Decode a hash from the given multihash.
 *
 * @param {Buffer} buf
 * @returns {{code: number, name: string, length: number, digest: Buffer}} result
 */
exports.decode = function decode (buf) {
  if (!(Buffer.isBuffer(buf))) {
    throw new Error('multihash must be a Buffer')
  }

  if (buf.length < 3) {
    throw new Error('multihash too short. must be > 3 bytes.')
  }

  let code = varint.decode(buf)
  if (!exports.isValidCode(code)) {
    throw new Error(`multihash unknown function code: 0x${code.toString(16)}`)
  }
  buf = buf.slice(varint.decode.bytes)

  let len = varint.decode(buf)
  if (len < 1) {
    throw new Error(`multihash invalid length: 0x${len.toString(16)}`)
  }
  buf = buf.slice(varint.decode.bytes)

  if (buf.length !== len) {
    throw new Error(`multihash length inconsistent: 0x${buf.toString('hex')}`)
  }

  return {
    code: code,
    name: cs.codes[code],
    length: len,
    digest: buf
  }
}

/**
 *  Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Buffer} digest
 * @param {string|number} code
 * @param {number} [length]
 * @returns {Buffer}
 */
exports.encode = function encode (digest, code, length) {
  if (!digest || !code) {
    throw new Error('multihash encode requires at least two args: digest, code')
  }

  // ensure it's a hashfunction code.
  const hashfn = exports.coerceCode(code)

  if (!(Buffer.isBuffer(digest))) {
    throw new Error('digest should be a Buffer')
  }

  if (length == null) {
    length = digest.length
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.')
  }

  return Buffer.concat([
    Buffer.from(varint.encode(hashfn)),
    Buffer.from(varint.encode(length)),
    digest
  ])
}

/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 * @param {string|number} name
 * @returns {number}
 */
exports.coerceCode = function coerceCode (name) {
  let code = name

  if (typeof name === 'string') {
    if (!cs.names[name]) {
      throw new Error(`Unrecognized hash function named: ${name}`)
    }
    code = cs.names[name]
  }

  if (typeof code !== 'number') {
    throw new Error(`Hash function code should be a number. Got: ${code}`)
  }

  if (!cs.codes[code] && !exports.isAppCode(code)) {
    throw new Error(`Unrecognized function code: ${code}`)
  }

  return code
}

/**
 * Checks wether a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isAppCode = function appCode (code) {
  return code > 0 && code < 0x10
}

/**
 * Checks whether a multihash code is valid.
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isValidCode = function validCode (code) {
  if (exports.isAppCode(code)) {
    return true
  }

  if (cs.codes[code]) {
    return true
  }

  return false
}

/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */
function validate (multihash) {
  exports.decode(multihash) // throws if bad.
}
exports.validate = validate

/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */
exports.prefix = function prefix (multihash) {
  validate(multihash)

  return multihash.slice(0, 2)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/varint/decode.js":
/*!***************************************!*\
  !*** ./node_modules/varint/decode.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = read

var MSB = 0x80
  , REST = 0x7F

function read(buf, offset) {
  var res    = 0
    , offset = offset || 0
    , shift  = 0
    , counter = offset
    , b
    , l = buf.length

  do {
    if (counter >= l) {
      read.bytes = 0
      throw new RangeError('Could not decode varint')
    }
    b = buf[counter++]
    res += shift < 28
      ? (b & REST) << shift
      : (b & REST) * Math.pow(2, shift)
    shift += 7
  } while (b >= MSB)

  read.bytes = counter - offset

  return res
}


/***/ }),

/***/ "./node_modules/varint/encode.js":
/*!***************************************!*\
  !*** ./node_modules/varint/encode.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = encode

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function encode(num, out, offset) {
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}


/***/ }),

/***/ "./node_modules/varint/index.js":
/*!**************************************!*\
  !*** ./node_modules/varint/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    encode: __webpack_require__(/*! ./encode.js */ "./node_modules/varint/encode.js")
  , decode: __webpack_require__(/*! ./decode.js */ "./node_modules/varint/decode.js")
  , encodingLength: __webpack_require__(/*! ./length.js */ "./node_modules/varint/length.js")
}


/***/ }),

/***/ "./node_modules/varint/length.js":
/*!***************************************!*\
  !*** ./node_modules/varint/length.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var N1 = Math.pow(2,  7)
var N2 = Math.pow(2, 14)
var N3 = Math.pow(2, 21)
var N4 = Math.pow(2, 28)
var N5 = Math.pow(2, 35)
var N6 = Math.pow(2, 42)
var N7 = Math.pow(2, 49)
var N8 = Math.pow(2, 56)
var N9 = Math.pow(2, 63)

module.exports = function (value) {
  return (
    value < N1 ? 1
  : value < N2 ? 2
  : value < N3 ? 3
  : value < N4 ? 4
  : value < N5 ? 5
  : value < N6 ? 6
  : value < N7 ? 7
  : value < N8 ? 8
  : value < N9 ? 9
  :              10
  )
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/feed.js":
/*!*********************!*\
  !*** ./src/feed.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Feed {
  constructor ({ name, permawit }) {
    this.name = name
    this.permawit = permawit
  }

  async post ({ text }) {
    return this.permawit.post({ feed: this.name, text })
  }

  [Symbol.asyncIterator] () {
    return this.feedAsyncIterator()
  }

  feedAsyncIterator () {
    const feedHash = this.permawit.store.getFeedSync(this.name)
    let started = false
    let nextEntry = null
    let permawit = this.permawit
    const iterateEntry = (post) => {
      nextEntry = post.next

      return {
        done: false,
        value: post.text
      }
    }
    return {
      next () {
        if (!started) {
          started = true
          return permawit.merkling.get(feedHash).then((head) => {
            if (!head.entries) {
              return { done: true }
            }

            return permawit.merkling.resolve(head.entries)
          }).then(iterateEntry)
        } else {
          if (!nextEntry) {
            return { done: true }
          }

          return permawit.merkling.resolve(nextEntry).then(iterateEntry)
        }
      },
      return () {
        return {}
      },
      [Symbol.asyncIterator] () {
        return this
      }
    }
  }
}

module.exports = Feed


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Merkling = __webpack_require__(/*! merkling */ "./node_modules/merkling/src/index.js")

const Feed = __webpack_require__(/*! ./feed */ "./src/feed.js")
const LocalStore = __webpack_require__(/*! ./stores/localStore */ "./src/stores/localStore.js")

class Permawit {
  constructor ({ ipfs, store } = {}) {
    if (ipfs === undefined) {
      if (window && window.ipfs) {
        ipfs = window.ipfs
      } else {
        throw Error('ipfs must be passed as an option')
      }
    }

    this.store = store || new LocalStore()

    this.merkling = new Merkling({ipfs: ipfs})
    this.feeds = []
  }

  async init () {
    await this.store.init()
  }

  async createFeed ({ name }) {
    const feedHead = await this.merkling.save({
      name: name,
      entries: null
    })

    this.store.setFeed(name, feedHead._cid.toBaseEncodedString())

    return new Feed({ name, permawit: this })
  }

  async loadFeed ({ cid }) {
    const feedHead = await this.merkling.get(cid)

    this.store.setFeed(feedHead.name, feedHead._cid.toBaseEncodedString())

    return new Feed({ name: feedHead.name, permawit: this })
  }

  async post ({ feed, text }) {
    const feedHeadHash = await this.store.getFeed(feed)
    const feedHead = await this.merkling.get(feedHeadHash)

    const previousEntry = feedHead.entries

    feedHead.entries = await this.merkling.create({
      text: text,
      next: previousEntry
    })

    await this.merkling.save(feedHead)

    this.store.setFeed(feed, feedHead._cid.toBaseEncodedString())

    // this.feeds[feed] = feedHead._cid.toBaseEncodedString()
  }

  async posts (feed, callback) {
    const feedHeadHash = await this.store.getFeed(feed)
    const feedHead = await this.merkling.get(feedHeadHash) // this.merkling.get(this.feeds[feed])

    let currentEntry = feedHead.entries

    while (currentEntry !== null) {
      await this.merkling.resolve(currentEntry)
      callback(currentEntry.text)
      currentEntry = currentEntry.next
    }
  }
}

module.exports = Permawit


/***/ }),

/***/ "./src/stores/localStore.js":
/*!**********************************!*\
  !*** ./src/stores/localStore.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class LocalStore {
  constructor ({ localStorageKey, localStorage } = {}) {
    this.localStorageKey = localStorageKey || 'permawit'
    this.localStorage = localStorage || window.localStorage
  }

  async init () {
    if (!this.localStorage.hasOwnProperty(this.localStorageKey)) {
      this.localStorage[this.localStorageKey] = JSON.stringify({
        version: 1,
        feeds: {}
      })
    }
  }

  async setFeed (name, ipfsHash) {
    this._applyLocalStorageChange((config) => {
      config.feeds[name] = ipfsHash
      return config
    })
  }

  async getFeed (name) {
    return this.getFeedSync(name)
  }

  getFeedSync (name) {
    var config = this._readConfig()
    return config.feeds[name]
  }

  _readConfig () {
    return JSON.parse(this.localStorage[this.localStorageKey])
  }

  _applyLocalStorageChange (actionFn) {
    var config = this._readConfig()
    var updated = actionFn(config)
    this.localStorage[this.localStorageKey] = JSON.stringify(updated)
  }
}

module.exports = LocalStore


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QZXJtYXdpdC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vUGVybWF3aXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvYmFzZS14L2luZGV4LmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9iczU4L2luZGV4LmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9jaWRzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvbWVya2xpbmcvc3JjL2luZGV4LmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL21lcmtsaW5nL3NyYy9pcGxkLmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL21lcmtsaW5nL3NyYy9tZXJrbGluZy5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9tdWx0aWJhc2Uvbm9kZV9tb2R1bGVzL2Jhc2UteC9pbmRleC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9tdWx0aWJhc2Uvc3JjL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9iYXNlMTYuanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL3NyYy9iYXNlLXRhYmxlLmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL211bHRpY29kZWMvc3JjL2luZGV4LmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL211bHRpY29kZWMvc3JjL25hbWUtdGFibGUuanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvbXVsdGljb2RlYy9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL3NyYy92YXJpbnQtdGFibGUuanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvbXVsdGloYXNoZXMvc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy9tdWx0aWhhc2hlcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvc2FmZS1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vUGVybWF3aXQvLi9ub2RlX21vZHVsZXMvdmFyaW50L2RlY29kZS5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy92YXJpbnQvZW5jb2RlLmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vbm9kZV9tb2R1bGVzL3ZhcmludC9pbmRleC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL25vZGVfbW9kdWxlcy92YXJpbnQvbGVuZ3RoLmpzIiwid2VicGFjazovL1Blcm1hd2l0Lyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9QZXJtYXdpdC8uL3NyYy9mZWVkLmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL1Blcm1hd2l0Ly4vc3JjL3N0b3Jlcy9sb2NhbFN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHFCQUFxQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEMsd0NBQXdDLG1CQUFtQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLDBDQUEwQztBQUM3RDtBQUNBLG1DQUFtQyxRQUFROztBQUUzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTs7QUFFQSxvQ0FBb0Msa0JBQWtCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsK0NBQStDO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzRkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsVUFBVTtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkhBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs4Q0M1dkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsT0FBTztBQUNwQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sT0FBTztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixhQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ25RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLFVBQVU7O0FBRWxCO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25GQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0pBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDSkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsV0FBVyxZQUFZLG1CQUFtQjtBQUMxRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxXQUFXLFlBQVksbUJBQW1CO0FBQzFGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsTUFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuS0E7O0FBRUE7QUFDQSxPQUFPLFlBQVk7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxjQUFjO0FBQzNCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsY0FBYztBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLG1DQUFtQzs7QUFFM0U7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQ0FBb0MsMENBQTBDO0FBQzlFO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkMsK0JBQStCOztBQUUxRTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLHVDQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN2TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIscUJBQXFCO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0Qyx3Q0FBd0MsbUJBQW1CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIsMENBQTBDO0FBQzdEO0FBQ0EsbUNBQW1DLFFBQVE7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTs7QUFFQSxvQ0FBb0Msa0JBQWtCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsK0NBQStDO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDeEZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OzhDQ3pCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLElBQUk7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxJQUFJOztBQUVMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OENDdklBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDL1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5REE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OzhDQ1hBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDLy9CRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsY0FBYyw0REFBNEQ7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBEQUEwRCxrQkFBa0I7QUFDNUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1ELGlCQUFpQjtBQUNwRTtBQUNBOztBQUVBO0FBQ0Esd0RBQXdELG9CQUFvQjtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJEQUEyRCxLQUFLO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRSxLQUFLO0FBQ3hFOztBQUVBO0FBQ0EsbURBQW1ELEtBQUs7QUFDeEQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2IsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaE9BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7OztBQ25CQTs7QUFFQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBOztBQUVBLGVBQWUsT0FBTztBQUN0QiwrQkFBK0Isd0JBQXdCO0FBQ3ZEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDMURBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsY0FBYyxLQUFLO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0NBQWtDLFdBQVc7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLE9BQU87QUFDNUI7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQSxxQkFBcUIsdUJBQXVCO0FBQzVDOztBQUVBLG1CQUFtQixNQUFNO0FBQ3pCOztBQUVBOztBQUVBLHFCQUFxQixzQ0FBc0M7QUFDM0Q7O0FBRUEsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzlFQTs7QUFFQTtBQUNBLGdCQUFnQixnQ0FBZ0MsS0FBSztBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InBlcm1hd2l0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUGVybWF3aXRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiUGVybWF3aXRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGJhc2UteCBlbmNvZGluZ1xuLy8gRm9ya2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NyeXB0b2NvaW5qcy9iczU4XG4vLyBPcmlnaW5hbGx5IHdyaXR0ZW4gYnkgTWlrZSBIZWFybiBmb3IgQml0Y29pbkpcbi8vIENvcHlyaWdodCAoYykgMjAxMSBHb29nbGUgSW5jXG4vLyBQb3J0ZWQgdG8gSmF2YVNjcmlwdCBieSBTdGVmYW4gVGhvbWFzXG4vLyBNZXJnZWQgQnVmZmVyIHJlZmFjdG9yaW5ncyBmcm9tIGJhc2U1OC1uYXRpdmUgYnkgU3RlcGhlbiBQYWlyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTMgQml0UGF5IEluY1xuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiYXNlIChBTFBIQUJFVCkge1xuICB2YXIgQUxQSEFCRVRfTUFQID0ge31cbiAgdmFyIEJBU0UgPSBBTFBIQUJFVC5sZW5ndGhcbiAgdmFyIExFQURFUiA9IEFMUEhBQkVULmNoYXJBdCgwKVxuXG4gIC8vIHByZS1jb21wdXRlIGxvb2t1cCB0YWJsZVxuICBmb3IgKHZhciB6ID0gMDsgeiA8IEFMUEhBQkVULmxlbmd0aDsgeisrKSB7XG4gICAgdmFyIHggPSBBTFBIQUJFVC5jaGFyQXQoeilcblxuICAgIGlmIChBTFBIQUJFVF9NQVBbeF0gIT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IFR5cGVFcnJvcih4ICsgJyBpcyBhbWJpZ3VvdXMnKVxuICAgIEFMUEhBQkVUX01BUFt4XSA9IHpcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZSAoc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuXG4gICAgdmFyIGRpZ2l0cyA9IFswXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgY2FycnkgPSBzb3VyY2VbaV07IGogPCBkaWdpdHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgY2FycnkgKz0gZGlnaXRzW2pdIDw8IDhcbiAgICAgICAgZGlnaXRzW2pdID0gY2FycnkgJSBCQVNFXG4gICAgICAgIGNhcnJ5ID0gKGNhcnJ5IC8gQkFTRSkgfCAwXG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChjYXJyeSA+IDApIHtcbiAgICAgICAgZGlnaXRzLnB1c2goY2FycnkgJSBCQVNFKVxuICAgICAgICBjYXJyeSA9IChjYXJyeSAvIEJBU0UpIHwgMFxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzdHJpbmcgPSAnJ1xuXG4gICAgLy8gZGVhbCB3aXRoIGxlYWRpbmcgemVyb3NcbiAgICBmb3IgKHZhciBrID0gMDsgc291cmNlW2tdID09PSAwICYmIGsgPCBzb3VyY2UubGVuZ3RoIC0gMTsgKytrKSBzdHJpbmcgKz0gTEVBREVSXG4gICAgLy8gY29udmVydCBkaWdpdHMgdG8gYSBzdHJpbmdcbiAgICBmb3IgKHZhciBxID0gZGlnaXRzLmxlbmd0aCAtIDE7IHEgPj0gMDsgLS1xKSBzdHJpbmcgKz0gQUxQSEFCRVRbZGlnaXRzW3FdXVxuXG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlVW5zYWZlIChzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFN0cmluZycpXG4gICAgaWYgKHN0cmluZy5sZW5ndGggPT09IDApIHJldHVybiBCdWZmZXIuYWxsb2NVbnNhZmUoMClcblxuICAgIHZhciBieXRlcyA9IFswXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBBTFBIQUJFVF9NQVBbc3RyaW5nW2ldXVxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICBmb3IgKHZhciBqID0gMCwgY2FycnkgPSB2YWx1ZTsgaiA8IGJ5dGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGNhcnJ5ICs9IGJ5dGVzW2pdICogQkFTRVxuICAgICAgICBieXRlc1tqXSA9IGNhcnJ5ICYgMHhmZlxuICAgICAgICBjYXJyeSA+Pj0gOFxuICAgICAgfVxuXG4gICAgICB3aGlsZSAoY2FycnkgPiAwKSB7XG4gICAgICAgIGJ5dGVzLnB1c2goY2FycnkgJiAweGZmKVxuICAgICAgICBjYXJyeSA+Pj0gOFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlYWwgd2l0aCBsZWFkaW5nIHplcm9zXG4gICAgZm9yICh2YXIgayA9IDA7IHN0cmluZ1trXSA9PT0gTEVBREVSICYmIGsgPCBzdHJpbmcubGVuZ3RoIC0gMTsgKytrKSB7XG4gICAgICBieXRlcy5wdXNoKDApXG4gICAgfVxuXG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGJ5dGVzLnJldmVyc2UoKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZSAoc3RyaW5nKSB7XG4gICAgdmFyIGJ1ZmZlciA9IGRlY29kZVVuc2FmZShzdHJpbmcpXG4gICAgaWYgKGJ1ZmZlcikgcmV0dXJuIGJ1ZmZlclxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb24tYmFzZScgKyBCQVNFICsgJyBjaGFyYWN0ZXInKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBkZWNvZGVVbnNhZmU6IGRlY29kZVVuc2FmZSxcbiAgICBkZWNvZGU6IGRlY29kZVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgKyAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgKyAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsInZhciBiYXNleCA9IHJlcXVpcmUoJ2Jhc2UteCcpXG52YXIgQUxQSEFCRVQgPSAnMTIzNDU2Nzg5QUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaYWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5eidcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNleChBTFBIQUJFVClcbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtaCA9IHJlcXVpcmUoJ211bHRpaGFzaGVzJylcbmNvbnN0IG11bHRpYmFzZSA9IHJlcXVpcmUoJ211bHRpYmFzZScpXG5jb25zdCBtdWx0aWNvZGVjID0gcmVxdWlyZSgnbXVsdGljb2RlYycpXG5jb25zdCBjb2RlY3MgPSByZXF1aXJlKCdtdWx0aWNvZGVjL3NyYy9iYXNlLXRhYmxlJylcbmNvbnN0IGNvZGVjVmFyaW50cyA9IHJlcXVpcmUoJ211bHRpY29kZWMvc3JjL3ZhcmludC10YWJsZScpXG5jb25zdCBtdWx0aWhhc2ggPSByZXF1aXJlKCdtdWx0aWhhc2hlcycpXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU2VyaWFsaXplZENJRFxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGVjXG4gKiBAcGFyYW0ge251bWJlcn0gdmVyc2lvblxuICogQHBhcmFtIHtCdWZmZXJ9IG11bHRpaGFzaFxuICpcbiAqL1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIENJRCBgPG1iYXNlPjx2ZXJzaW9uPjxtY29kZWM+PG1oYXNoPmBcbiAqICwgYXMgZGVmaW5lZCBpbiBbaXBsZC9jaWRdKGh0dHBzOi8vZ2l0aHViLmNvbS9pcGxkL2NpZCkuXG4gKiBAY2xhc3MgQ0lEXG4gKi9cbmNsYXNzIENJRCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgQ0lELlxuICAgKlxuICAgKiBUaGUgYWxnb3JpdGhtIGZvciBhcmd1bWVudCBpbnB1dCBpcyByb3VnaGx5OlxuICAgKiBgYGBcbiAgICogaWYgKHN0cilcbiAgICogICBpZiAoMXN0IGNoYXIgaXMgb24gbXVsdGliYXNlIHRhYmxlKSAtPiBDSUQgU3RyaW5nXG4gICAqICAgZWxzZSAtPiBiczU4IGVuY29kZWQgbXVsdGloYXNoXG4gICAqIGVsc2UgaWYgKEJ1ZmZlcilcbiAgICogICBpZiAoMCBvciAxKSAtPiBDSURcbiAgICogICBlbHNlIC0+IG11bHRpaGFzaFxuICAgKiBlbHNlIGlmIChOdW1iZXIpXG4gICAqICAgLT4gY29uc3RydWN0IENJRCBieSBwYXJ0c1xuICAgKlxuICAgKiAuLmlmIG9ubHkgSlMgaGFkIHRyYWl0cy4uXG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xCdWZmZXJ9IHZlcnNpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlY11cbiAgICogQHBhcmFtIHtCdWZmZXJ9IFttdWx0aWhhc2hdXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIG5ldyBDSUQoPHZlcnNpb24+LCA8Y29kZWM+LCA8bXVsdGloYXNoPilcbiAgICogbmV3IENJRCg8Y2lkU3RyPilcbiAgICogbmV3IENJRCg8Y2lkLmJ1ZmZlcj4pXG4gICAqIG5ldyBDSUQoPG11bHRpaGFzaD4pXG4gICAqIG5ldyBDSUQoPGJzNTggZW5jb2RlZCBtdWx0aWhhc2g+KVxuICAgKiBuZXcgQ0lEKDxjaWQ+KVxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHZlcnNpb24sIGNvZGVjLCBtdWx0aWhhc2gpIHtcbiAgICBpZiAoQ0lELmlzQ0lEKHZlcnNpb24pKSB7XG4gICAgICBsZXQgY2lkID0gdmVyc2lvblxuICAgICAgdGhpcy52ZXJzaW9uID0gY2lkLnZlcnNpb25cbiAgICAgIHRoaXMuY29kZWMgPSBjaWQuY29kZWNcbiAgICAgIHRoaXMubXVsdGloYXNoID0gQnVmZmVyLmZyb20oY2lkLm11bHRpaGFzaClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAobXVsdGliYXNlLmlzRW5jb2RlZCh2ZXJzaW9uKSkgeyAvLyBDSUQgU3RyaW5nIChlbmNvZGVkIHdpdGggbXVsdGliYXNlKVxuICAgICAgICBjb25zdCBjaWQgPSBtdWx0aWJhc2UuZGVjb2RlKHZlcnNpb24pXG4gICAgICAgIHZlcnNpb24gPSBwYXJzZUludChjaWQuc2xpY2UoMCwgMSkudG9TdHJpbmcoJ2hleCcpLCAxNilcbiAgICAgICAgY29kZWMgPSBtdWx0aWNvZGVjLmdldENvZGVjKGNpZC5zbGljZSgxKSlcbiAgICAgICAgbXVsdGloYXNoID0gbXVsdGljb2RlYy5ybVByZWZpeChjaWQuc2xpY2UoMSkpXG4gICAgICB9IGVsc2UgeyAvLyBiczU4IHN0cmluZyBlbmNvZGVkIG11bHRpaGFzaFxuICAgICAgICBjb2RlYyA9ICdkYWctcGInXG4gICAgICAgIG11bHRpaGFzaCA9IG1oLmZyb21CNThTdHJpbmcodmVyc2lvbilcbiAgICAgICAgdmVyc2lvbiA9IDBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2ZXJzaW9uKSkge1xuICAgICAgY29uc3QgZmlyc3RCeXRlID0gdmVyc2lvbi5zbGljZSgwLCAxKVxuICAgICAgY29uc3QgdiA9IHBhcnNlSW50KGZpcnN0Qnl0ZS50b1N0cmluZygnaGV4JyksIDE2KVxuICAgICAgaWYgKHYgPT09IDAgfHwgdiA9PT0gMSkgeyAvLyBDSURcbiAgICAgICAgY29uc3QgY2lkID0gdmVyc2lvblxuICAgICAgICB2ZXJzaW9uID0gdlxuICAgICAgICBjb2RlYyA9IG11bHRpY29kZWMuZ2V0Q29kZWMoY2lkLnNsaWNlKDEpKVxuICAgICAgICBtdWx0aWhhc2ggPSBtdWx0aWNvZGVjLnJtUHJlZml4KGNpZC5zbGljZSgxKSlcbiAgICAgIH0gZWxzZSB7IC8vIG11bHRpaGFzaFxuICAgICAgICBjb2RlYyA9ICdkYWctcGInXG4gICAgICAgIG11bHRpaGFzaCA9IHZlcnNpb25cbiAgICAgICAgdmVyc2lvbiA9IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuY29kZWMgPSBjb2RlY1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QnVmZmVyfVxuICAgICAqL1xuICAgIHRoaXMubXVsdGloYXNoID0gbXVsdGloYXNoXG5cbiAgICBDSUQudmFsaWRhdGVDSUQodGhpcylcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgQ0lEIGFzIGEgYEJ1ZmZlcmBcbiAgICpcbiAgICogQHJldHVybiB7QnVmZmVyfVxuICAgKiBAcmVhZG9ubHlcbiAgICpcbiAgICogQG1lbWJlck9mIENJRFxuICAgKi9cbiAgZ2V0IGJ1ZmZlciAoKSB7XG4gICAgc3dpdGNoICh0aGlzLnZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGloYXNoXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBCdWZmZXIuY29uY2F0KFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnMDEnLCAnaGV4JyksXG4gICAgICAgICAgQnVmZmVyLmZyb20oY29kZWNWYXJpbnRzW3RoaXMuY29kZWNdKSxcbiAgICAgICAgICB0aGlzLm11bHRpaGFzaFxuICAgICAgICBdKVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCB2ZXJzaW9uJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcmVmaXggb2YgdGhlIENJRC5cbiAgICpcbiAgICogQHJldHVybnMge0J1ZmZlcn1cbiAgICogQHJlYWRvbmx5XG4gICAqL1xuICBnZXQgcHJlZml4ICgpIHtcbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChbXG4gICAgICBCdWZmZXIuZnJvbShgMCR7dGhpcy52ZXJzaW9ufWAsICdoZXgnKSxcbiAgICAgIGNvZGVjVmFyaW50c1t0aGlzLmNvZGVjXSxcbiAgICAgIG11bHRpaGFzaC5wcmVmaXgodGhpcy5tdWx0aWhhc2gpXG4gICAgXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHRvIGEgQ0lEIG9mIHZlcnNpb24gYDBgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Q0lEfVxuICAgKi9cbiAgdG9WMCAoKSB7XG4gICAgaWYgKHRoaXMuY29kZWMgIT09ICdkYWctcGInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGEgbm9uIGRhZy1wYiBDSUQgdG8gQ0lEdjAnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ0lEKDAsIHRoaXMuY29kZWMsIHRoaXMubXVsdGloYXNoKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgdG8gYSBDSUQgb2YgdmVyc2lvbiBgMWAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtDSUR9XG4gICAqL1xuICB0b1YxICgpIHtcbiAgICByZXR1cm4gbmV3IENJRCgxLCB0aGlzLmNvZGVjLCB0aGlzLm11bHRpaGFzaClcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmNvZGUgdGhlIENJRCBpbnRvIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Jhc2U9J2Jhc2U1OGJ0YyddIC0gQmFzZSBlbmNvZGluZyB0byB1c2UuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0b0Jhc2VFbmNvZGVkU3RyaW5nIChiYXNlKSB7XG4gICAgYmFzZSA9IGJhc2UgfHwgJ2Jhc2U1OGJ0YydcblxuICAgIHN3aXRjaCAodGhpcy52ZXJzaW9uKSB7XG4gICAgICBjYXNlIDA6IHtcbiAgICAgICAgaWYgKGJhc2UgIT09ICdiYXNlNThidGMnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydGVkIHdpdGggQ0lEdjAsIHRvIHN1cHBvcnQgZGlmZmVyZW50IGJhc2VzLCBwbGVhc2UgbWlncmF0ZSB0aGUgaW5zdGFuY2UgZG8gQ0lEdjEsIHlvdSBjYW4gZG8gdGhhdCB0aHJvdWdoIGNpZC50b1YxKCknKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaC50b0I1OFN0cmluZyh0aGlzLm11bHRpaGFzaClcbiAgICAgIH1cbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG11bHRpYmFzZS5lbmNvZGUoYmFzZSwgdGhpcy5idWZmZXIpLnRvU3RyaW5nKClcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdmVyc2lvbicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZSB0byBhIHBsYWluIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMge1NlcmlhbGl6ZWRDSUR9XG4gICAqL1xuICB0b0pTT04gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2RlYzogdGhpcy5jb2RlYyxcbiAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvbixcbiAgICAgIGhhc2g6IHRoaXMubXVsdGloYXNoXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmUgZXF1YWxpdHkgd2l0aCBhbm90aGVyIENJRC5cbiAgICpcbiAgICogQHBhcmFtIHtDSUR9IG90aGVyXG4gICAqIEByZXR1cm5zIHtib29sfVxuICAgKi9cbiAgZXF1YWxzIChvdGhlcikge1xuICAgIHJldHVybiB0aGlzLmNvZGVjID09PSBvdGhlci5jb2RlYyAmJlxuICAgICAgdGhpcy52ZXJzaW9uID09PSBvdGhlci52ZXJzaW9uICYmXG4gICAgICB0aGlzLm11bHRpaGFzaC5lcXVhbHMob3RoZXIubXVsdGloYXNoKVxuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGdpdmVuIGlucHV0IGlzIGEgQ0lELlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gb3RoZXJcbiAgICogQHJldHVybnMge2Jvb2x9XG4gICAqL1xuICBzdGF0aWMgaXNDSUQgKG90aGVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIENJRC52YWxpZGF0ZUNJRChvdGhlcilcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvKipcbiAgICogVGVzdCBpZiB0aGUgZ2l2ZW4gaW5wdXQgaXMgYSB2YWxpZCBDSUQgb2JqZWN0LlxuICAgKiBUaHJvd3MgaWYgaXQgaXMgbm90LlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gb3RoZXJcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBzdGF0aWMgdmFsaWRhdGVDSUQgKG90aGVyKSB7XG4gICAgaWYgKG90aGVyID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbnVsbCB2YWx1ZXMgYXJlIG5vdCB2YWxpZCBDSURzJylcbiAgICB9XG5cbiAgICBpZiAoIShvdGhlci52ZXJzaW9uID09PSAwIHx8IG90aGVyLnZlcnNpb24gPT09IDEpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmVyc2lvbiwgbXVzdCBiZSBhIG51bWJlciBlcXVhbCB0byAxIG9yIDAnKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3RoZXIuY29kZWMgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvZGVjIG11c3QgYmUgc3RyaW5nJylcbiAgICB9XG5cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihvdGhlci5tdWx0aWhhc2gpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpaGFzaCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgICB9XG5cbiAgICBtaC52YWxpZGF0ZShvdGhlci5tdWx0aWhhc2gpXG4gIH1cbn1cblxuQ0lELmNvZGVjcyA9IGNvZGVjc1xuXG5tb2R1bGUuZXhwb3J0cyA9IENJRFxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBNZXJrbGluZyA9IHJlcXVpcmUoJy4vbWVya2xpbmcnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lcmtsaW5nXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgQ0lEID0gcmVxdWlyZSgnY2lkcycpXG5cbmNvbnN0IGNpZFN5bWJvbCA9IFN5bWJvbC5mb3IoJ21lcmtsaW5nI2NpZCcpXG5jb25zdCBzdGF0dXNTeW1ib2wgPSBTeW1ib2wuZm9yKCdtZXJrbGluZyNzdGF0dXMnKVxuXG5jb25zdCBJcGxkUHJveHlFeHRlbnNpb24gPSB7XG4gIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoa2V5ID09PSBjaWRTeW1ib2wpIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IHRhcmdldFtzdGF0dXNTeW1ib2xdXG4gICAgICBpZiAoc3RhdHVzID09PSAnVU5MT0FERUQnIHx8IHN0YXR1cyA9PT0gJ1NBVkVEJykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0W2NpZFN5bWJvbF1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXR1cyA9PT0gJ0RJUlRZJykge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuXFwndCByZWFkIENJRCBvZiB1bmxvYWRlZCBpcGxkIG5vZGUnKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdfY2lkJykge1xuICAgICAgcmV0dXJuIHRhcmdldFtjaWRTeW1ib2xdXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJ2luc3BlY3QnKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W2tleV1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0W2tleV1cbiAgfSxcblxuICBzZXQgKHRhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgPT09IHN0YXR1c1N5bWJvbCB8fCBrZXkgPT09IGNpZFN5bWJvbCkge1xuICAgICAgUmVmbGVjdC5zZXQoLi4uYXJndW1lbnRzKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0W3N0YXR1c1N5bWJvbF0gPT09ICdTQVZFRCcpIHtcbiAgICAgIHRhcmdldFtjaWRTeW1ib2xdID0gdW5kZWZpbmVkXG4gICAgICB0YXJnZXRbc3RhdHVzU3ltYm9sXSA9ICdESVJUWSdcbiAgICAgIFJlZmxlY3Quc2V0KC4uLmFyZ3VtZW50cylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHRhcmdldFtzdGF0dXNTeW1ib2xdID09PSAnVU5MT0FERUQnKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBSZWZsZWN0LnNldCguLi5hcmd1bWVudHMpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5jbGFzcyBJcGxkUHJveHkge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5VTkxPQURFRCA9ICdVTkxPQURFRCdcbiAgICB0aGlzLlNBVkVEID0gJ1NBVkVEJ1xuICAgIHRoaXMuRElSVFkgPSAnRElSVFknXG4gICAgdGhpcy5URU1QID0gJ1RFTVAnXG5cbiAgICB0aGlzLmFsbG93ZWRTdGF0dXNlcyA9IFt0aGlzLlVOTE9BREVELCB0aGlzLlNBVkVELCB0aGlzLkRJUlRZXVxuICB9XG5cbiAgaXNJcGxkIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIHRoaXMuYWxsb3dlZFN0YXR1c2VzLmluY2x1ZGVzKG9ialtzdGF0dXNTeW1ib2xdKVxuICB9XG5cbiAgaXNQZXJzaXN0ZWQgKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgKG9ialtzdGF0dXNTeW1ib2xdID09PSB0aGlzLlVOTE9BREVEIHx8IG9ialtzdGF0dXNTeW1ib2xdID09PSB0aGlzLlNBVkVEKVxuICB9XG5cbiAgaXNTYXZlZCAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbc3RhdHVzU3ltYm9sXSA9PT0gdGhpcy5TQVZFRFxuICB9XG5cbiAgaXNEaXJ0eSAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbc3RhdHVzU3ltYm9sXSA9PT0gdGhpcy5ESVJUWVxuICB9XG5cbiAgY3JlYXRlIChjaWQsIHN0YXR1cywgb2JqKSB7XG4gICAgaWYgKCF0aGlzLmFsbG93ZWRTdGF0dXNlcy5pbmNsdWRlcyhzdGF0dXMpKSB7XG4gICAgICB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIHN0YXR1cyAnICsgc3RhdHVzKVxuICAgIH1cblxuICAgIG9ialtjaWRTeW1ib2xdID0gY2lkXG4gICAgb2JqW3N0YXR1c1N5bWJvbF0gPSBzdGF0dXNcbiAgICByZXR1cm4gbmV3IFByb3h5KG9iaiwgSXBsZFByb3h5RXh0ZW5zaW9uKVxuICB9XG5cbiAgY3JlYXRlRGlydHlOb2RlIChvYmopIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGUobnVsbCwgdGhpcy5ESVJUWSwgb2JqKVxuICB9XG5cbiAgY3JlYXRlU2F2ZWROb2RlIChjaWQsIG9iaikge1xuICAgIGNvbnN0IGlkID0gQ0lELmlzQ0lEKGNpZCkgPyBjaWQgOiBuZXcgQ0lEKGNpZClcbiAgICByZXR1cm4gdGhpcy5jcmVhdGUoaWQsIHRoaXMuU0FWRUQsIG9iailcbiAgfVxuXG4gIGNyZWF0ZUxpbmtOb2RlIChjaWQpIHtcbiAgICBjb25zdCBpZCA9IENJRC5pc0NJRChjaWQpID8gY2lkIDogbmV3IENJRChjaWQpXG5cbiAgICBjb25zdCBsaW5rT2JqID0ge1xuICAgICAgJy8nOiBpZC50b0Jhc2VFbmNvZGVkU3RyaW5nKClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGUoaWQsIHRoaXMuVU5MT0FERUQsIGxpbmtPYmopXG4gIH1cblxuICByZWFkQ0lEIChvYmopIHtcbiAgICByZXR1cm4gb2JqW2NpZFN5bWJvbF1cbiAgfVxuXG4gIHRyYW5zaXRpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHRyYW5zaXRpb24gfSA9IG9wdGlvbnNcbiAgICBzd2l0Y2ggKHRyYW5zaXRpb24pIHtcbiAgICAgIGNhc2UgJ2xvYWQnOlxuICAgICAgICBpZiAobm9kZVtzdGF0dXNTeW1ib2xdICE9PSB0aGlzLlVOTE9BREVEKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoYFRyYW5zaXRpb24gbm90IGFsbG93ZWQgJHt0cmFuc2l0aW9ufSBpbiBzdGF0ZSAke25vZGVbc3RhdHVzU3ltYm9sXX1gKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZExpbmsobm9kZSwgb3B0aW9ucylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3NhdmUnOlxuICAgICAgICBpZiAobm9kZVtzdGF0dXNTeW1ib2xdICE9PSB0aGlzLkRJUlRZKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoYFRyYW5zaXRpb24gbm90IGFsbG93ZWQgJHt0cmFuc2l0aW9ufSBpbiBzdGF0ZSAke25vZGVbc3RhdHVzU3ltYm9sXX1gKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2F2ZURpcnR5KG5vZGUsIG9wdGlvbnMpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcignVW5rbm93biB0cmFuc2l0aW9uICcgKyB0cmFuc2l0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3QgKG9iaikge1xuICAgIGlmICghdGhpcy5pc0lwbGQob2JqKSkge1xuICAgICAgcmV0dXJuIG9ialxuICAgIH1cblxuICAgIGNvbnN0IHN0YXR1cyA9IG9ialtzdGF0dXNTeW1ib2xdXG4gICAgb2JqW3N0YXR1c1N5bWJvbF0gPSB0aGlzLlRFTVBcbiAgICBjb25zdCBvYmpDb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqKVxuICAgIGRlbGV0ZSBvYmpDb3B5W3N0YXR1c1N5bWJvbF1cbiAgICBkZWxldGUgb2JqQ29weVtjaWRTeW1ib2xdXG4gICAgb2JqW3N0YXR1c1N5bWJvbF0gPSBzdGF0dXNcbiAgICByZXR1cm4gb2JqQ29weVxuICB9XG5cbiAgX2xvYWRMaW5rIChub2RlLCB7IG9iamVjdCB9KSB7XG4gICAgbm9kZVtzdGF0dXNTeW1ib2xdID0gbnVsbFxuICAgIGRlbGV0ZSBub2RlWycvJ11cbiAgICBPYmplY3QuYXNzaWduKG5vZGUsIG9iamVjdClcbiAgICBub2RlW3N0YXR1c1N5bWJvbF0gPSB0aGlzLlNBVkVEXG4gIH1cblxuICBfc2F2ZURpcnR5IChub2RlLCB7IGNpZCB9KSB7XG4gICAgbm9kZVtzdGF0dXNTeW1ib2xdID0gdGhpcy5TQVZFRFxuICAgIG5vZGVbY2lkU3ltYm9sXSA9IGNpZFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJcGxkUHJveHk6IElwbGRQcm94eVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IENJRCA9IHJlcXVpcmUoJ2NpZHMnKVxuY29uc3QgeyBJcGxkUHJveHkgfSA9IHJlcXVpcmUoJy4vaXBsZCcpXG5cbi8qKlxuICogTWVya2xpbmcgZW50cnlwb2ludFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBzZXR1cCBvcHRpb25zIGZvciB0aGlzIG1lcmtsaW5nIGluc3RhbmNlXG4gKi9cbmNvbnN0IE1lcmtsaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLmlwZnMpIHtcbiAgICB0aHJvdyBFcnJvcignSVBGUyBtdXN0IGJlIHBhc3NlZCBhcyBhbiBvcHRpb24gdG8gTWVya2xpbmcnKVxuICB9XG5cbiAgdGhpcy5pcGZzID0gb3B0aW9ucy5pcGZzXG4gIHRoaXMuaXBsZFByb3h5ID0gbmV3IElwbGRQcm94eSgpXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBJUExEIG5vZGUgZnJvbSBhIGpzIG9iamVjdC5cbiAgICogVGhlIElQTEQgbm9kZSBtdXN0IGJlIHNhdmVkIGJlZm9yZSBpdCBpcyBwZXJzaXN0ZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogYSBqcyBvYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH0gYW4gdW5zYXZlZCBJUExEIG5vZGVcbiAgICovXG4gIHRoaXMuY3JlYXRlID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0aGlzLmlwbGRQcm94eS5jcmVhdGVEaXJ0eU5vZGUob2JqKVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcnNpc3QgYSBqcyBvYmplY3Qgb3IgSVBMRCBub2RlIHRvIHRoZSBJUExEIGdyYXBoXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogYSBqcyBvYmplY3Qgb3IgSVBMRCBub2RlXG4gICAqL1xuICB0aGlzLnNhdmUgPSAob2JqKSA9PiB7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgIHRocm93IEVycm9yKCdBcmd1bWVudCBleGNlcHRpb24sIHRyeWluZyB0byBzYXZlIG51bGwgb3IgdW5kZWZpbmVkJylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pcGxkUHJveHkuaXNJcGxkKG9iaikpIHtcbiAgICAgIGlmICh0aGlzLmlwbGRQcm94eS5pc1BlcnNpc3RlZChvYmopKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUob2JqKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJzaXN0KG9iailcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlydHlOb2RlID0gdGhpcy5pcGxkUHJveHkuY3JlYXRlRGlydHlOb2RlKG9iailcbiAgICAgIHJldHVybiB0aGlzLl9wZXJzaXN0KGRpcnR5Tm9kZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYW4gSVBMRCBpZCwgcmV0cmlldmUgdGhlIHZhbHVlIGZyb20gdGhlIElQTEQgZ3JhcGhcbiAgICogYXMgYSBqcyBvYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBjaWRcbiAgICogQHJldHVybnMge09iamVjdH0gYW4gSVBMRCBub2RlXG4gICAqL1xuICB0aGlzLmdldCA9IChjaWQpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5pcGZzLmRhZy5nZXQoY2lkLCAoZXJyLCBibG9jaykgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlkID0gQ0lELmlzQ0lEKGNpZCkgPyBjaWQgOiBuZXcgQ0lEKGNpZClcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX3N1YnN0aXR1dGVNZXJrbGVMaW5rUHJveGllcyhibG9jay52YWx1ZSlcbiAgICAgICAgY29uc3QgbWVya2xlUHJveHkgPSB0aGlzLmlwbGRQcm94eS5jcmVhdGVTYXZlZE5vZGUoaWQsIG5vZGUpXG5cbiAgICAgICAgcmVzb2x2ZShtZXJrbGVQcm94eSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBJUExEIGlkLCBjcmVhdGUgYW4gdW5sb2FkZWQgSVBMRCBub2RlLCB0aGF0IGNhblxuICAgKiBiZSB1c2VkIGluIHBlcnNpc3RpbmdcbiAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBjaWRcbiAgICogQHJldHVybnMge09iamVjdH0gYW4gdW5sb2FkZWQgSVBMRCBub2RlXG4gICAqL1xuICB0aGlzLmxvYWQgPSAoY2lkKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaXBsZFByb3h5LmNyZWF0ZUxpbmtOb2RlKGNpZClcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhbiB1bmxvYWRlZCBJUExEIG5vZGUgYW5kIGxvYWRzIGluIHRoZVxuICAgKiBvYmplY3QgZm9yIHRoZSBub2RlJ3MgaGFzaCBmcm9tIElQTERcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBhbiB1bmxvYWRlZCBJUExEIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdH0gYSBzYXZlZCBJUExEIG5vZGVcbiAgICovXG4gIHRoaXMucmVzb2x2ZSA9IChvYmopID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlwbGRQcm94eS5pc0lwbGQob2JqKSB8fCB0aGlzLmlwbGRQcm94eS5pc1NhdmVkKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUob2JqKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pcGxkUHJveHkuaXNEaXJ0eShvYmopKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgcmVzb2x2ZSBhIGRpcnR5IGlwbGQgbm9kZScpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmlwZnMuZGFnLmdldChvYmouX2NpZCwgKGVyciwgYmxvY2spID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5fc3Vic3RpdHV0ZU1lcmtsZUxpbmtQcm94aWVzKGJsb2NrLnZhbHVlKVxuICAgICAgICB0aGlzLmlwbGRQcm94eS50cmFuc2l0aW9uKG9iaiwgeyB0cmFuc2l0aW9uOiAnbG9hZCcsIG9iamVjdDogbm9kZSB9KVxuXG4gICAgICAgIHJlc29sdmUob2JqKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgdGhpcy5fcGVyc2lzdCA9IChlbGVtKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmlwbGRQcm94eS5pc1BlcnNpc3RlZChlbGVtKSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShlbGVtKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdWJwZXJzaXN0cyA9IE9iamVjdC5rZXlzKGVsZW0pXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGVsZW1ba2V5XSlcbiAgICAgICAgLm1hcChrZXkgPT4ge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgZWxlbVtrZXldID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgPyB0aGlzLl9wZXJzaXN0KGVsZW1ba2V5XSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICB9KS5maWx0ZXIoQm9vbGVhbilcblxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHN1YnBlcnNpc3RzKS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmlwbGRQcm94eS5pc0lwbGQoZWxlbSkpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShlbGVtKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGFnTm9kZSA9IHRoaXMuX3N1YnN0aXR1dGVNZXJrbGVMaW5rcyhlbGVtKVxuXG4gICAgICAgIHRoaXMuaXBmcy5kYWcucHV0KGRhZ05vZGUsIHsgZm9ybWF0OiAnZGFnLWNib3InLCBoYXNoQWxnOiAnc2hhMi0yNTYnIH0sIChlcnIsIGNpZCkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaXBsZFByb3h5LnRyYW5zaXRpb24oZWxlbSwgeyB0cmFuc2l0aW9uOiAnc2F2ZScsIGNpZDogY2lkIH0pXG5cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShlbGVtKVxuICAgICAgICB9KVxuICAgICAgfSkuY2F0Y2gocmVqZWN0KVxuICAgIH0pXG4gIH1cblxuICB0aGlzLl9zdWJzdGl0dXRlTWVya2xlTGlua3MgPSAoZWxlbSkgPT4ge1xuICAgIGlmICghZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW1cbiAgICB9XG5cbiAgICBjb25zdCBkYWdOb2RlID0gdGhpcy5pcGxkUHJveHkuZXh0cmFjdChlbGVtKVxuXG4gICAgT2JqZWN0LmtleXMoZGFnTm9kZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCh0eXBlb2YgZGFnTm9kZVtrZXldICE9PSAnb2JqZWN0JykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlwbGRQcm94eS5pc0lwbGQoZGFnTm9kZVtrZXldKSkge1xuICAgICAgICBkYWdOb2RlW2tleV0gPSB0aGlzLl9jb252ZXJ0VG9NZXJrbGVMaW5rT2JqZWN0KGRhZ05vZGVba2V5XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N1YnN0aXR1dGVNZXJrbGVMaW5rcyhkYWdOb2RlW2tleV0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBkYWdOb2RlXG4gIH1cblxuICB0aGlzLl9zdWJzdGl0dXRlTWVya2xlTGlua1Byb3hpZXMgPSAob2JqKSA9PiB7XG4gICAgY29uc3QgbWVya2xlTm9kZSA9IE9iamVjdC5hc3NpZ24oe30sIG9iailcblxuICAgIE9iamVjdC5rZXlzKG1lcmtsZU5vZGUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbWVya2xlTm9kZVtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodGhpcy5faXNNZXJrbGVMaW5rT2JqZWN0KG1lcmtsZU5vZGVba2V5XSkpIHtcbiAgICAgICAgICBtZXJrbGVOb2RlW2tleV0gPSB0aGlzLl9jb252ZXJ0RnJvbU1lcmtsZUxpbmtPYmplY3QobWVya2xlTm9kZVtrZXldKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3N1YnN0aXR1dGVNZXJrbGVMaW5rUHJveGllcyhtZXJrbGVOb2RlW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIG1lcmtsZU5vZGVcbiAgfVxuXG4gIHRoaXMuX2NvbnZlcnRUb01lcmtsZUxpbmtPYmplY3QgPSAob2JqKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICcvJzogb2JqLl9jaWQudG9CYXNlRW5jb2RlZFN0cmluZygpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5fY29udmVydEZyb21NZXJrbGVMaW5rT2JqZWN0ID0gKGxpbmspID0+IHtcbiAgICByZXR1cm4gdGhpcy5pcGxkUHJveHkuY3JlYXRlTGlua05vZGUobmV3IENJRChsaW5rWycvJ10pKVxuICB9XG5cbiAgdGhpcy5faXNNZXJrbGVMaW5rT2JqZWN0ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiBvYmogJiYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSAmJiBvYmouaGFzT3duUHJvcGVydHkoJy8nKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZXJrbGluZ1xuIiwiLy8gYmFzZS14IGVuY29kaW5nXG4vLyBGb3JrZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vY3J5cHRvY29pbmpzL2JzNThcbi8vIE9yaWdpbmFsbHkgd3JpdHRlbiBieSBNaWtlIEhlYXJuIGZvciBCaXRjb2luSlxuLy8gQ29weXJpZ2h0IChjKSAyMDExIEdvb2dsZSBJbmNcbi8vIFBvcnRlZCB0byBKYXZhU2NyaXB0IGJ5IFN0ZWZhbiBUaG9tYXNcbi8vIE1lcmdlZCBCdWZmZXIgcmVmYWN0b3JpbmdzIGZyb20gYmFzZTU4LW5hdGl2ZSBieSBTdGVwaGVuIFBhaXJcbi8vIENvcHlyaWdodCAoYykgMjAxMyBCaXRQYXkgSW5jXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmFzZSAoQUxQSEFCRVQpIHtcbiAgdmFyIEFMUEhBQkVUX01BUCA9IHt9XG4gIHZhciBCQVNFID0gQUxQSEFCRVQubGVuZ3RoXG4gIHZhciBMRUFERVIgPSBBTFBIQUJFVC5jaGFyQXQoMClcblxuICAvLyBwcmUtY29tcHV0ZSBsb29rdXAgdGFibGVcbiAgZm9yICh2YXIgeiA9IDA7IHogPCBBTFBIQUJFVC5sZW5ndGg7IHorKykge1xuICAgIHZhciB4ID0gQUxQSEFCRVQuY2hhckF0KHopXG5cbiAgICBpZiAoQUxQSEFCRVRfTUFQW3hdICE9PSB1bmRlZmluZWQpIHRocm93IG5ldyBUeXBlRXJyb3IoeCArICcgaXMgYW1iaWd1b3VzJylcbiAgICBBTFBIQUJFVF9NQVBbeF0gPSB6XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGUgKHNvdXJjZSkge1xuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuICAgIHZhciBkaWdpdHMgPSBbMF1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGNhcnJ5ID0gc291cmNlW2ldOyBqIDwgZGlnaXRzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGNhcnJ5ICs9IGRpZ2l0c1tqXSA8PCA4XG4gICAgICAgIGRpZ2l0c1tqXSA9IGNhcnJ5ICUgQkFTRVxuICAgICAgICBjYXJyeSA9IChjYXJyeSAvIEJBU0UpIHwgMFxuICAgICAgfVxuXG4gICAgICB3aGlsZSAoY2FycnkgPiAwKSB7XG4gICAgICAgIGRpZ2l0cy5wdXNoKGNhcnJ5ICUgQkFTRSlcbiAgICAgICAgY2FycnkgPSAoY2FycnkgLyBCQVNFKSB8IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gJydcblxuICAgIC8vIGRlYWwgd2l0aCBsZWFkaW5nIHplcm9zXG4gICAgZm9yICh2YXIgayA9IDA7IHNvdXJjZVtrXSA9PT0gMCAmJiBrIDwgc291cmNlLmxlbmd0aCAtIDE7ICsraykgc3RyaW5nICs9IEFMUEhBQkVUWzBdXG4gICAgLy8gY29udmVydCBkaWdpdHMgdG8gYSBzdHJpbmdcbiAgICBmb3IgKHZhciBxID0gZGlnaXRzLmxlbmd0aCAtIDE7IHEgPj0gMDsgLS1xKSBzdHJpbmcgKz0gQUxQSEFCRVRbZGlnaXRzW3FdXVxuXG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlVW5zYWZlIChzdHJpbmcpIHtcbiAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gMCkgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKVxuXG4gICAgdmFyIGJ5dGVzID0gWzBdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IEFMUEhBQkVUX01BUFtzdHJpbmdbaV1dXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG5cbiAgICAgIGZvciAodmFyIGogPSAwLCBjYXJyeSA9IHZhbHVlOyBqIDwgYnl0ZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgY2FycnkgKz0gYnl0ZXNbal0gKiBCQVNFXG4gICAgICAgIGJ5dGVzW2pdID0gY2FycnkgJiAweGZmXG4gICAgICAgIGNhcnJ5ID4+PSA4XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChjYXJyeSA+IDApIHtcbiAgICAgICAgYnl0ZXMucHVzaChjYXJyeSAmIDB4ZmYpXG4gICAgICAgIGNhcnJ5ID4+PSA4XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVhbCB3aXRoIGxlYWRpbmcgemVyb3NcbiAgICBmb3IgKHZhciBrID0gMDsgc3RyaW5nW2tdID09PSBMRUFERVIgJiYgayA8IHN0cmluZy5sZW5ndGggLSAxOyArK2spIHtcbiAgICAgIGJ5dGVzLnB1c2goMClcbiAgICB9XG5cbiAgICByZXR1cm4gQnVmZmVyLmZyb20oYnl0ZXMucmV2ZXJzZSgpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlIChzdHJpbmcpIHtcbiAgICB2YXIgYnVmZmVyID0gZGVjb2RlVW5zYWZlKHN0cmluZylcbiAgICBpZiAoYnVmZmVyKSByZXR1cm4gYnVmZmVyXG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbi1iYXNlJyArIEJBU0UgKyAnIGNoYXJhY3RlcicpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGRlY29kZVVuc2FmZTogZGVjb2RlVW5zYWZlLFxuICAgIGRlY29kZTogZGVjb2RlXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBCYXNlIHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIGNvZGUsIGltcGxlbWVudGF0aW9uLCBhbHBoYWJldCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLmNvZGUgPSBjb2RlXG4gICAgdGhpcy5hbHBoYWJldCA9IGFscGhhYmV0XG4gICAgaWYgKGltcGxlbWVudGF0aW9uICYmIGFscGhhYmV0KSB7XG4gICAgICB0aGlzLmVuZ2luZSA9IGltcGxlbWVudGF0aW9uKGFscGhhYmV0KVxuICAgIH1cbiAgfVxuXG4gIGVuY29kZSAoc3RyaW5nT3JCdWZmZXIpIHtcbiAgICByZXR1cm4gdGhpcy5lbmdpbmUuZW5jb2RlKHN0cmluZ09yQnVmZmVyKVxuICB9XG5cbiAgZGVjb2RlIChzdHJpbmdPckJ1ZmZlcikge1xuICAgIHJldHVybiB0aGlzLmVuZ2luZS5kZWNvZGUoc3RyaW5nT3JCdWZmZXIpXG4gIH1cblxuICBpc0ltcGxlbWVudGVkICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmdpbmVcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJhc2UxNiAoYWxwaGFiZXQpIHtcbiAgcmV0dXJuIHtcbiAgICBlbmNvZGUgKGlucHV0KSB7XG4gICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihpbnB1dCkudG9TdHJpbmcoJ2hleCcpXG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQudG9TdHJpbmcoJ2hleCcpXG4gICAgfSxcbiAgICBkZWNvZGUgKGlucHV0KSB7XG4gICAgICBmb3IgKGxldCBjaGFyIG9mIGlucHV0KSB7XG4gICAgICAgIGlmIChhbHBoYWJldC5pbmRleE9mKGNoYXIpIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBiYXNlMTYgY2hhcmFjdGVyJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoaW5wdXQsICdoZXgnKVxuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UuanMnKVxuY29uc3QgYmFzZVggPSByZXF1aXJlKCdiYXNlLXgnKVxuY29uc3QgYmFzZTE2ID0gcmVxdWlyZSgnLi9iYXNlMTYnKVxuXG4vLyBuYW1lLCBjb2RlLCBpbXBsZW1lbnRhdGlvbiwgYWxwaGFiZXRcbmNvbnN0IGNvbnN0YW50cyA9IFtcbiAgWydiYXNlMScsICcxJywgJycsICcxJ10sXG4gIFsnYmFzZTInLCAnMCcsIGJhc2VYLCAnMDEnXSxcbiAgWydiYXNlOCcsICc3JywgYmFzZVgsICcwMTIzNDU2NyddLFxuICBbJ2Jhc2UxMCcsICc5JywgYmFzZVgsICcwMTIzNDU2Nzg5J10sXG4gIFsnYmFzZTE2JywgJ2YnLCBiYXNlMTYsICcwMTIzNDU2Nzg5YWJjZGVmJ10sXG4gIFsnYmFzZTMyaGV4JywgJ3YnLCBiYXNlWCwgJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2J10sXG4gIFsnYmFzZTMyJywgJ2InLCBiYXNlWCwgJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MjM0NTY3J10sXG4gIFsnYmFzZTMyeicsICdoJywgYmFzZVgsICd5Ym5kcmZnOGVqa21jcHF4b3QxdXdpc3phMzQ1aDc2OSddLFxuICBbJ2Jhc2U1OGZsaWNrcicsICdaJywgYmFzZVgsICcxMjM0NTY3ODlhYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6QUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaJ10sXG4gIFsnYmFzZTU4YnRjJywgJ3onLCBiYXNlWCwgJzEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXonXSxcbiAgWydiYXNlNjQnLCAnbScsIGJhc2VYLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyddLFxuICBbJ2Jhc2U2NHVybCcsICd1JywgYmFzZVgsICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJ11cbl1cblxuY29uc3QgbmFtZXMgPSBjb25zdGFudHMucmVkdWNlKChwcmV2LCB0dXBwbGUpID0+IHtcbiAgcHJldlt0dXBwbGVbMF1dID0gbmV3IEJhc2UodHVwcGxlWzBdLCB0dXBwbGVbMV0sIHR1cHBsZVsyXSwgdHVwcGxlWzNdKVxuICByZXR1cm4gcHJldlxufSwge30pXG5cbmNvbnN0IGNvZGVzID0gY29uc3RhbnRzLnJlZHVjZSgocHJldiwgdHVwcGxlKSA9PiB7XG4gIHByZXZbdHVwcGxlWzFdXSA9IG5hbWVzW3R1cHBsZVswXV1cbiAgcmV0dXJuIHByZXZcbn0sIHt9KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZXM6IG5hbWVzLFxuICBjb2RlczogY29kZXNcbn1cbiIsIi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIFttdWx0aWJhc2VdKGh0dHBzOi8vZ2l0aHViLmNvbS9tdWx0aWZvcm1hdHMvbXVsdGliYXNlKSBzcGVjaWZpY2F0aW9uLlxuICogQG1vZHVsZSBNdWx0aWJhc2VcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gbXVsdGliYXNlXG5leHBvcnRzLmVuY29kZSA9IGVuY29kZVxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGVcbmV4cG9ydHMuaXNFbmNvZGVkID0gaXNFbmNvZGVkXG5cbmNvbnN0IGVyck5vdFN1cHBvcnRlZCA9IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZW5jb2RpbmcnKVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBidWZmZXIgd2l0aCB0aGUgbXVsdGliYXNlIHZhcmludCtjb2RlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gbmFtZU9yQ29kZSAtIFRoZSBtdWx0aWJhc2UgbmFtZSBvciBjb2RlIG51bWJlci5cbiAqIEBwYXJhbSB7QnVmZmVyfSBidWYgLSBUaGUgZGF0YSB0byBiZSBwcmVmaXhlZCB3aXRoIG11bHRpYmFzZS5cbiAqIEBtZW1iZXJvZiBNdWx0aWJhc2VcbiAqIEByZXR1cm5zIHtCdWZmZXJ9XG4gKi9cbmZ1bmN0aW9uIG11bHRpYmFzZSAobmFtZU9yQ29kZSwgYnVmKSB7XG4gIGlmICghYnVmKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyZXF1aXJlcyBhbiBlbmNvZGVkIGJ1ZmZlcicpXG4gIH1cbiAgY29uc3QgYmFzZSA9IGdldEJhc2UobmFtZU9yQ29kZSlcbiAgY29uc3QgY29kZUJ1ZiA9IG5ldyBCdWZmZXIoYmFzZS5jb2RlKVxuXG4gIGNvbnN0IG5hbWUgPSBiYXNlLm5hbWVcbiAgdmFsaWRFbmNvZGUobmFtZSwgYnVmKVxuICByZXR1cm4gQnVmZmVyLmNvbmNhdChbY29kZUJ1ZiwgYnVmXSlcbn1cblxuLyoqXG4gKiBFbmNvZGUgZGF0YSB3aXRoIHRoZSBzcGVjaWZpZWQgYmFzZSBhbmQgYWRkIHRoZSBtdWx0aWJhc2UgcHJlZml4LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gbmFtZU9yQ29kZSAtIFRoZSBtdWx0aWJhc2UgbmFtZSBvciBjb2RlIG51bWJlci5cbiAqIEBwYXJhbSB7QnVmZmVyfSBidWYgLSBUaGUgZGF0YSB0byBiZSBlbmNvZGVkLlxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqIEBtZW1iZXJvZiBNdWx0aWJhc2VcbiAqL1xuZnVuY3Rpb24gZW5jb2RlIChuYW1lT3JDb2RlLCBidWYpIHtcbiAgY29uc3QgYmFzZSA9IGdldEJhc2UobmFtZU9yQ29kZSlcbiAgY29uc3QgbmFtZSA9IGJhc2UubmFtZVxuXG4gIHJldHVybiBtdWx0aWJhc2UobmFtZSwgbmV3IEJ1ZmZlcihiYXNlLmVuY29kZShidWYpKSlcbn1cblxuLyoqXG4gKlxuICogVGFrZXMgYSBidWZmZXIgb3Igc3RyaW5nIGVuY29kZWQgd2l0aCBtdWx0aWJhc2UgaGVhZGVyXG4gKiBkZWNvZGVzIGl0IGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBkZWNvZGVkIGJ1ZmZlclxuICogYW5kIHRoZSBlbmNvZGVkIHR5cGUgeyBiYXNlOiA8bmFtZT4sIGRhdGE6IDxidWZmZXI+IH1cbiAqXG4gKiBmcm9tIEB0aGVvYmF0IDogVGhpcyBpcyBub3Qgd2hhdCB0aGUgbXVsdGliYXNlLnNwZWMuanMgdGVzdCBpcyB3YWl0aW5nIGZvcixcbiAqIGhlbmNlIHRoZSByZXR1cm4gZGVjb2RlT2JqZWN0LmRhdGFcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcnxzdHJpbmd9IGJ1Zk9yU3RyaW5nXG4gKiBAcmV0dXJucyB7T2JqZWN0fSByZXN1bHRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHJlc3VsdC5iYXNlXG4gKiBAcmV0dXJucyB7QnVmZmVyfSByZXN1bHQuZGF0YVxuICogQG1lbWJlcm9mIE11bHRpYmFzZVxuICpcbiAqL1xuZnVuY3Rpb24gZGVjb2RlIChidWZPclN0cmluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJ1Zk9yU3RyaW5nKSkge1xuICAgIGJ1Zk9yU3RyaW5nID0gYnVmT3JTdHJpbmcudG9TdHJpbmcoKVxuICB9XG5cbiAgY29uc3QgY29kZSA9IGJ1Zk9yU3RyaW5nLnN1YnN0cmluZygwLCAxKVxuICBidWZPclN0cmluZyA9IGJ1Zk9yU3RyaW5nLnN1YnN0cmluZygxLCBidWZPclN0cmluZy5sZW5ndGgpXG5cbiAgaWYgKHR5cGVvZiBidWZPclN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICBidWZPclN0cmluZyA9IG5ldyBCdWZmZXIoYnVmT3JTdHJpbmcpXG4gIH1cblxuICBjb25zdCBiYXNlID0gZ2V0QmFzZShjb2RlKVxuXG4gIGNvbnN0IGRlY29kZU9iamVjdCA9IHtcbiAgICBiYXNlOiBiYXNlLm5hbWUsXG4gICAgZGF0YTogbmV3IEJ1ZmZlcihiYXNlLmRlY29kZShidWZPclN0cmluZy50b1N0cmluZygpKSlcbiAgfVxuICByZXR1cm4gZGVjb2RlT2JqZWN0LmRhdGFcbn1cblxuLyoqXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0YSBtdWx0aWJhc2UgZW5jb2RlZD9cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcnxzdHJpbmd9IGJ1Zk9yU3RyaW5nXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBtZW1iZXJvZiBNdWx0aWJhc2VcbiAqL1xuZnVuY3Rpb24gaXNFbmNvZGVkIChidWZPclN0cmluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJ1Zk9yU3RyaW5nKSkge1xuICAgIGJ1Zk9yU3RyaW5nID0gYnVmT3JTdHJpbmcudG9TdHJpbmcoKVxuICB9XG5cbiAgY29uc3QgY29kZSA9IGJ1Zk9yU3RyaW5nLnN1YnN0cmluZygwLCAxKVxuICB0cnkge1xuICAgIGNvbnN0IGJhc2UgPSBnZXRCYXNlKGNvZGUpXG4gICAgcmV0dXJuIGJhc2UubmFtZVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gdmFsaWRFbmNvZGUgKG5hbWUsIGJ1Zikge1xuICBjb25zdCBiYXNlID0gZ2V0QmFzZShuYW1lKVxuICBiYXNlLmRlY29kZShidWYudG9TdHJpbmcoKSlcbn1cblxuZnVuY3Rpb24gZ2V0QmFzZSAobmFtZU9yQ29kZSkge1xuICBsZXQgYmFzZVxuXG4gIGlmIChjb25zdGFudHMubmFtZXNbbmFtZU9yQ29kZV0pIHtcbiAgICBiYXNlID0gY29uc3RhbnRzLm5hbWVzW25hbWVPckNvZGVdXG4gIH0gZWxzZSBpZiAoY29uc3RhbnRzLmNvZGVzW25hbWVPckNvZGVdKSB7XG4gICAgYmFzZSA9IGNvbnN0YW50cy5jb2Rlc1tuYW1lT3JDb2RlXVxuICB9IGVsc2Uge1xuICAgIHRocm93IGVyck5vdFN1cHBvcnRlZFxuICB9XG5cbiAgaWYgKCFiYXNlLmlzSW1wbGVtZW50ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQmFzZSAnICsgbmFtZU9yQ29kZSArICcgaXMgbm90IGltcGxlbWVudGVkIHlldCcpXG4gIH1cblxuICByZXR1cm4gYmFzZVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vIHNwZWMgYW5kIHRhYmxlIGF0OiBodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL211bHRpY29kZWNcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzXG5cbi8vIE1pc2NlbGxhbmVvdXNcbmV4cG9ydHNbJ3JhdyddID0gQnVmZmVyLmZyb20oJzU1JywgJ2hleCcpXG5cbi8vIGJhc2VzIGVuY29kaW5nc1xuZXhwb3J0c1snYmFzZTEnXSA9IEJ1ZmZlci5mcm9tKCcwMScsICdoZXgnKVxuZXhwb3J0c1snYmFzZTInXSA9IEJ1ZmZlci5mcm9tKCcwMCcsICdoZXgnKVxuZXhwb3J0c1snYmFzZTgnXSA9IEJ1ZmZlci5mcm9tKCcwNycsICdoZXgnKVxuZXhwb3J0c1snYmFzZTEwJ10gPSBCdWZmZXIuZnJvbSgnMDknLCAnaGV4JylcblxuLy8gU2VyaWFsaXphdGlvbiBmb3JtYXRzXG5leHBvcnRzWydjYm9yJ10gPSBCdWZmZXIuZnJvbSgnNTEnLCAnaGV4JylcbmV4cG9ydHNbJ3Byb3RvYnVmJ10gPSBCdWZmZXIuZnJvbSgnNTAnLCAnaGV4JylcbmV4cG9ydHNbJ3JscCddID0gQnVmZmVyLmZyb20oJzYwJywgJ2hleCcpXG5leHBvcnRzWydiZW5jb2RlJ10gPSBCdWZmZXIuZnJvbSgnNjMnLCAnaGV4JylcblxuLy8gTXVsdGlmb3JtYXRzXG5leHBvcnRzWydtdWx0aWNvZGVjJ10gPSBCdWZmZXIuZnJvbSgnMzAnLCAnaGV4JylcbmV4cG9ydHNbJ211bHRpaGFzaCddID0gQnVmZmVyLmZyb20oJzMxJywgJ2hleCcpXG5leHBvcnRzWydtdWx0aWFkZHInXSA9IEJ1ZmZlci5mcm9tKCczMicsICdoZXgnKVxuZXhwb3J0c1snbXVsdGliYXNlJ10gPSBCdWZmZXIuZnJvbSgnMzMnLCAnaGV4JylcbmV4cG9ydHNbJ21kNCddID0gQnVmZmVyLmZyb20oJ2Q0JywgJ2hleCcpXG5leHBvcnRzWydtZDUnXSA9IEJ1ZmZlci5mcm9tKCdkNScsICdoZXgnKVxuXG4vLyBtdWx0aWhhc2hlc1xuZXhwb3J0c1snc2hhMSddID0gQnVmZmVyLmZyb20oJzExJywgJ2hleCcpXG5leHBvcnRzWydzaGEyLTI1NiddID0gQnVmZmVyLmZyb20oJzEyJywgJ2hleCcpXG5leHBvcnRzWydzaGEyLTUxMiddID0gQnVmZmVyLmZyb20oJzEzJywgJ2hleCcpXG5leHBvcnRzWydkYmwtc2hhMi0yNTYnXSA9IEJ1ZmZlci5mcm9tKCc1NicsICdoZXgnKVxuZXhwb3J0c1snc2hhMy0yMjQnXSA9IEJ1ZmZlci5mcm9tKCcxNycsICdoZXgnKVxuZXhwb3J0c1snc2hhMy0yNTYnXSA9IEJ1ZmZlci5mcm9tKCcxNicsICdoZXgnKVxuZXhwb3J0c1snc2hhMy0zODQnXSA9IEJ1ZmZlci5mcm9tKCcxNScsICdoZXgnKVxuZXhwb3J0c1snc2hhMy01MTInXSA9IEJ1ZmZlci5mcm9tKCcxNCcsICdoZXgnKVxuZXhwb3J0c1snc2hha2UtMTI4J10gPSBCdWZmZXIuZnJvbSgnMTgnLCAnaGV4JylcbmV4cG9ydHNbJ3NoYWtlLTI1NiddID0gQnVmZmVyLmZyb20oJzE5JywgJ2hleCcpXG5leHBvcnRzWydrZWNjYWstMjI0J10gPSBCdWZmZXIuZnJvbSgnMWEnLCAnaGV4JylcbmV4cG9ydHNbJ2tlY2Nhay0yNTYnXSA9IEJ1ZmZlci5mcm9tKCcxYicsICdoZXgnKVxuZXhwb3J0c1sna2VjY2FrLTM4NCddID0gQnVmZmVyLmZyb20oJzFjJywgJ2hleCcpXG5leHBvcnRzWydrZWNjYWstNTEyJ10gPSBCdWZmZXIuZnJvbSgnMWQnLCAnaGV4JylcbmV4cG9ydHNbJ211cm11cjMnXSA9IEJ1ZmZlci5mcm9tKCcyMicsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi04J10gPSBCdWZmZXIuZnJvbSgnYjIwMScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0xNiddID0gQnVmZmVyLmZyb20oJ2IyMDInLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMjQnXSA9IEJ1ZmZlci5mcm9tKCdiMjAzJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTMyJ10gPSBCdWZmZXIuZnJvbSgnYjIwNCcsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi00MCddID0gQnVmZmVyLmZyb20oJ2IyMDUnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItNDgnXSA9IEJ1ZmZlci5mcm9tKCdiMjA2JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTU2J10gPSBCdWZmZXIuZnJvbSgnYjIwNycsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi02NCddID0gQnVmZmVyLmZyb20oJ2IyMDgnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItNzInXSA9IEJ1ZmZlci5mcm9tKCdiMjA5JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTgwJ10gPSBCdWZmZXIuZnJvbSgnYjIwYScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi04OCddID0gQnVmZmVyLmZyb20oJ2IyMGInLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItOTYnXSA9IEJ1ZmZlci5mcm9tKCdiMjBjJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTEwNCddID0gQnVmZmVyLmZyb20oJ2IyMGQnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMTEyJ10gPSBCdWZmZXIuZnJvbSgnYjIwZScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0xMjAnXSA9IEJ1ZmZlci5mcm9tKCdiMjBmJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTEyOCddID0gQnVmZmVyLmZyb20oJ2IyMTAnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMTM2J10gPSBCdWZmZXIuZnJvbSgnYjIxMScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0xNDQnXSA9IEJ1ZmZlci5mcm9tKCdiMjEyJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTE1MiddID0gQnVmZmVyLmZyb20oJ2IyMTMnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMTYwJ10gPSBCdWZmZXIuZnJvbSgnYjIxNCcsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0xNjgnXSA9IEJ1ZmZlci5mcm9tKCdiMjE1JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTE3NiddID0gQnVmZmVyLmZyb20oJ2IyMTYnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMTg0J10gPSBCdWZmZXIuZnJvbSgnYjIxNycsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0xOTInXSA9IEJ1ZmZlci5mcm9tKCdiMjE4JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTIwMCddID0gQnVmZmVyLmZyb20oJ2IyMTknLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMjA4J10gPSBCdWZmZXIuZnJvbSgnYjIxYScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0yMTYnXSA9IEJ1ZmZlci5mcm9tKCdiMjFiJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTIyNCddID0gQnVmZmVyLmZyb20oJ2IyMWMnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMjMyJ10gPSBCdWZmZXIuZnJvbSgnYjIxZCcsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0yNDAnXSA9IEJ1ZmZlci5mcm9tKCdiMjFlJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTI0OCddID0gQnVmZmVyLmZyb20oJ2IyMWYnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMjU2J10gPSBCdWZmZXIuZnJvbSgnYjIyMCcsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0yNjQnXSA9IEJ1ZmZlci5mcm9tKCdiMjIxJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTI3MiddID0gQnVmZmVyLmZyb20oJ2IyMjInLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMjgwJ10gPSBCdWZmZXIuZnJvbSgnYjIyMycsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0yODgnXSA9IEJ1ZmZlci5mcm9tKCdiMjI0JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTI5NiddID0gQnVmZmVyLmZyb20oJ2IyMjUnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMzA0J10gPSBCdWZmZXIuZnJvbSgnYjIyNicsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0zMTInXSA9IEJ1ZmZlci5mcm9tKCdiMjI3JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTMyMCddID0gQnVmZmVyLmZyb20oJ2IyMjgnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMzI4J10gPSBCdWZmZXIuZnJvbSgnYjIyOScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0zMzYnXSA9IEJ1ZmZlci5mcm9tKCdiMjJhJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTM0NCddID0gQnVmZmVyLmZyb20oJ2IyMmInLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMzUyJ10gPSBCdWZmZXIuZnJvbSgnYjIyYycsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0zNjAnXSA9IEJ1ZmZlci5mcm9tKCdiMjJkJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTM2OCddID0gQnVmZmVyLmZyb20oJ2IyMmUnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItMzc2J10gPSBCdWZmZXIuZnJvbSgnYjIyZicsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi0zODQnXSA9IEJ1ZmZlci5mcm9tKCdiMjMwJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTM5MiddID0gQnVmZmVyLmZyb20oJ2IyMzEnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItNDAwJ10gPSBCdWZmZXIuZnJvbSgnYjIzMicsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi00MDgnXSA9IEJ1ZmZlci5mcm9tKCdiMjMzJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTQxNiddID0gQnVmZmVyLmZyb20oJ2IyMzQnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItNDI0J10gPSBCdWZmZXIuZnJvbSgnYjIzNScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi00MzInXSA9IEJ1ZmZlci5mcm9tKCdiMjM2JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTQ0MCddID0gQnVmZmVyLmZyb20oJ2IyMzcnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItNDQ4J10gPSBCdWZmZXIuZnJvbSgnYjIzOCcsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi00NTYnXSA9IEJ1ZmZlci5mcm9tKCdiMjM5JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTQ2NCddID0gQnVmZmVyLmZyb20oJ2IyM2EnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItNDcyJ10gPSBCdWZmZXIuZnJvbSgnYjIzYicsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi00ODAnXSA9IEJ1ZmZlci5mcm9tKCdiMjNjJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTQ4OCddID0gQnVmZmVyLmZyb20oJ2IyM2QnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMmItNDk2J10gPSBCdWZmZXIuZnJvbSgnYjIzZScsICdoZXgnKVxuZXhwb3J0c1snYmxha2UyYi01MDQnXSA9IEJ1ZmZlci5mcm9tKCdiMjNmJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJiLTUxMiddID0gQnVmZmVyLmZyb20oJ2IyNDAnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtOCddID0gQnVmZmVyLmZyb20oJ2IyNDEnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtMTYnXSA9IEJ1ZmZlci5mcm9tKCdiMjQyJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTI0J10gPSBCdWZmZXIuZnJvbSgnYjI0MycsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0zMiddID0gQnVmZmVyLmZyb20oJ2IyNDQnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtNDAnXSA9IEJ1ZmZlci5mcm9tKCdiMjQ1JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTQ4J10gPSBCdWZmZXIuZnJvbSgnYjI0NicsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy01NiddID0gQnVmZmVyLmZyb20oJ2IyNDcnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtNjQnXSA9IEJ1ZmZlci5mcm9tKCdiMjQ4JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTcyJ10gPSBCdWZmZXIuZnJvbSgnYjI0OScsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy04MCddID0gQnVmZmVyLmZyb20oJ2IyNGEnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtODgnXSA9IEJ1ZmZlci5mcm9tKCdiMjRiJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTk2J10gPSBCdWZmZXIuZnJvbSgnYjI0YycsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0xMDQnXSA9IEJ1ZmZlci5mcm9tKCdiMjRkJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTExMiddID0gQnVmZmVyLmZyb20oJ2IyNGUnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtMTIwJ10gPSBCdWZmZXIuZnJvbSgnYjI0ZicsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0xMjgnXSA9IEJ1ZmZlci5mcm9tKCdiMjUwJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTEzNiddID0gQnVmZmVyLmZyb20oJ2IyNTEnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtMTQ0J10gPSBCdWZmZXIuZnJvbSgnYjI1MicsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0xNTInXSA9IEJ1ZmZlci5mcm9tKCdiMjUzJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTE2MCddID0gQnVmZmVyLmZyb20oJ2IyNTQnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtMTY4J10gPSBCdWZmZXIuZnJvbSgnYjI1NScsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0xNzYnXSA9IEJ1ZmZlci5mcm9tKCdiMjU2JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTE4NCddID0gQnVmZmVyLmZyb20oJ2IyNTcnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtMTkyJ10gPSBCdWZmZXIuZnJvbSgnYjI1OCcsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0yMDAnXSA9IEJ1ZmZlci5mcm9tKCdiMjU5JywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTIwOCddID0gQnVmZmVyLmZyb20oJ2IyNWEnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtMjE2J10gPSBCdWZmZXIuZnJvbSgnYjI1YicsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0yMjQnXSA9IEJ1ZmZlci5mcm9tKCdiMjVjJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTIzMiddID0gQnVmZmVyLmZyb20oJ2IyNWQnLCAnaGV4JylcbmV4cG9ydHNbJ2JsYWtlMnMtMjQwJ10gPSBCdWZmZXIuZnJvbSgnYjI1ZScsICdoZXgnKVxuZXhwb3J0c1snYmxha2Uycy0yNDgnXSA9IEJ1ZmZlci5mcm9tKCdiMjVmJywgJ2hleCcpXG5leHBvcnRzWydibGFrZTJzLTI1NiddID0gQnVmZmVyLmZyb20oJ2IyNjAnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMjU2LTgnXSA9IEJ1ZmZlci5mcm9tKCdiMzAxJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjI1Ni0xNiddID0gQnVmZmVyLmZyb20oJ2IzMDInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMjU2LTI0J10gPSBCdWZmZXIuZnJvbSgnYjMwMycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMzInXSA9IEJ1ZmZlci5mcm9tKCdiMzA0JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjI1Ni00MCddID0gQnVmZmVyLmZyb20oJ2IzMDUnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMjU2LTQ4J10gPSBCdWZmZXIuZnJvbSgnYjMwNicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtNTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzA3JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjI1Ni02NCddID0gQnVmZmVyLmZyb20oJ2IzMDgnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMjU2LTcyJ10gPSBCdWZmZXIuZnJvbSgnYjMwOScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtODAnXSA9IEJ1ZmZlci5mcm9tKCdiMzBhJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjI1Ni04OCddID0gQnVmZmVyLmZyb20oJ2IzMGInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMjU2LTk2J10gPSBCdWZmZXIuZnJvbSgnYjMwYycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTA0J10gPSBCdWZmZXIuZnJvbSgnYjMwZCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTEyJ10gPSBCdWZmZXIuZnJvbSgnYjMwZScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTIwJ10gPSBCdWZmZXIuZnJvbSgnYjMwZicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTI4J10gPSBCdWZmZXIuZnJvbSgnYjMxMCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTM2J10gPSBCdWZmZXIuZnJvbSgnYjMxMScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTQ0J10gPSBCdWZmZXIuZnJvbSgnYjMxMicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTUyJ10gPSBCdWZmZXIuZnJvbSgnYjMxMycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTYwJ10gPSBCdWZmZXIuZnJvbSgnYjMxNCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTY4J10gPSBCdWZmZXIuZnJvbSgnYjMxNScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTc2J10gPSBCdWZmZXIuZnJvbSgnYjMxNicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTg0J10gPSBCdWZmZXIuZnJvbSgnYjMxNycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMTkyJ10gPSBCdWZmZXIuZnJvbSgnYjMxOCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjAwJ10gPSBCdWZmZXIuZnJvbSgnYjMxOScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjA4J10gPSBCdWZmZXIuZnJvbSgnYjMxYScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjE2J10gPSBCdWZmZXIuZnJvbSgnYjMxYicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjI0J10gPSBCdWZmZXIuZnJvbSgnYjMxYycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjMyJ10gPSBCdWZmZXIuZnJvbSgnYjMxZCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjQwJ10gPSBCdWZmZXIuZnJvbSgnYjMxZScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjQ4J10gPSBCdWZmZXIuZnJvbSgnYjMxZicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4yNTYtMjU2J10gPSBCdWZmZXIuZnJvbSgnYjMyMCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW41MTItOCddID0gQnVmZmVyLmZyb20oJ2IzMjEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluNTEyLTE2J10gPSBCdWZmZXIuZnJvbSgnYjMyMicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW41MTItMjQnXSA9IEJ1ZmZlci5mcm9tKCdiMzIzJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zMiddID0gQnVmZmVyLmZyb20oJ2IzMjQnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluNTEyLTQwJ10gPSBCdWZmZXIuZnJvbSgnYjMyNScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW41MTItNDgnXSA9IEJ1ZmZlci5mcm9tKCdiMzI2JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi01NiddID0gQnVmZmVyLmZyb20oJ2IzMjcnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluNTEyLTY0J10gPSBCdWZmZXIuZnJvbSgnYjMyOCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW41MTItNzInXSA9IEJ1ZmZlci5mcm9tKCdiMzI5JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi04MCddID0gQnVmZmVyLmZyb20oJ2IzMmEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluNTEyLTg4J10gPSBCdWZmZXIuZnJvbSgnYjMyYicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW41MTItOTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzJjJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xMDQnXSA9IEJ1ZmZlci5mcm9tKCdiMzJkJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xMTInXSA9IEJ1ZmZlci5mcm9tKCdiMzJlJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xMjAnXSA9IEJ1ZmZlci5mcm9tKCdiMzJmJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xMjgnXSA9IEJ1ZmZlci5mcm9tKCdiMzMwJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xMzYnXSA9IEJ1ZmZlci5mcm9tKCdiMzMxJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xNDQnXSA9IEJ1ZmZlci5mcm9tKCdiMzMyJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xNTInXSA9IEJ1ZmZlci5mcm9tKCdiMzMzJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xNjAnXSA9IEJ1ZmZlci5mcm9tKCdiMzM0JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xNjgnXSA9IEJ1ZmZlci5mcm9tKCdiMzM1JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xNzYnXSA9IEJ1ZmZlci5mcm9tKCdiMzM2JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xODQnXSA9IEJ1ZmZlci5mcm9tKCdiMzM3JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0xOTInXSA9IEJ1ZmZlci5mcm9tKCdiMzM4JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yMDAnXSA9IEJ1ZmZlci5mcm9tKCdiMzM5JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yMDgnXSA9IEJ1ZmZlci5mcm9tKCdiMzNhJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yMTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzNiJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yMjQnXSA9IEJ1ZmZlci5mcm9tKCdiMzNjJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yMzInXSA9IEJ1ZmZlci5mcm9tKCdiMzNkJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yNDAnXSA9IEJ1ZmZlci5mcm9tKCdiMzNlJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yNDgnXSA9IEJ1ZmZlci5mcm9tKCdiMzNmJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yNTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzQwJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yNjQnXSA9IEJ1ZmZlci5mcm9tKCdiMzQxJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yNzInXSA9IEJ1ZmZlci5mcm9tKCdiMzQyJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yODAnXSA9IEJ1ZmZlci5mcm9tKCdiMzQzJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yODgnXSA9IEJ1ZmZlci5mcm9tKCdiMzQ0JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0yOTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzQ1JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zMDQnXSA9IEJ1ZmZlci5mcm9tKCdiMzQ2JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zMTInXSA9IEJ1ZmZlci5mcm9tKCdiMzQ3JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zMjAnXSA9IEJ1ZmZlci5mcm9tKCdiMzQ4JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zMjgnXSA9IEJ1ZmZlci5mcm9tKCdiMzQ5JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zMzYnXSA9IEJ1ZmZlci5mcm9tKCdiMzRhJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zNDQnXSA9IEJ1ZmZlci5mcm9tKCdiMzRiJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zNTInXSA9IEJ1ZmZlci5mcm9tKCdiMzRjJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zNjAnXSA9IEJ1ZmZlci5mcm9tKCdiMzRkJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zNjgnXSA9IEJ1ZmZlci5mcm9tKCdiMzRlJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zNzYnXSA9IEJ1ZmZlci5mcm9tKCdiMzRmJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zODQnXSA9IEJ1ZmZlci5mcm9tKCdiMzUwJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi0zOTInXSA9IEJ1ZmZlci5mcm9tKCdiMzUxJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00MDAnXSA9IEJ1ZmZlci5mcm9tKCdiMzUyJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00MDgnXSA9IEJ1ZmZlci5mcm9tKCdiMzUzJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00MTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzU0JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00MjQnXSA9IEJ1ZmZlci5mcm9tKCdiMzU1JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00MzInXSA9IEJ1ZmZlci5mcm9tKCdiMzU2JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00NDAnXSA9IEJ1ZmZlci5mcm9tKCdiMzU3JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00NDgnXSA9IEJ1ZmZlci5mcm9tKCdiMzU4JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00NTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzU5JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00NjQnXSA9IEJ1ZmZlci5mcm9tKCdiMzVhJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00NzInXSA9IEJ1ZmZlci5mcm9tKCdiMzViJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00ODAnXSA9IEJ1ZmZlci5mcm9tKCdiMzVjJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00ODgnXSA9IEJ1ZmZlci5mcm9tKCdiMzVkJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi00OTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzVlJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi01MDQnXSA9IEJ1ZmZlci5mcm9tKCdiMzVmJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjUxMi01MTInXSA9IEJ1ZmZlci5mcm9tKCdiMzYwJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtOCddID0gQnVmZmVyLmZyb20oJ2IzNjEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0xNiddID0gQnVmZmVyLmZyb20oJ2IzNjInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0yNCddID0gQnVmZmVyLmZyb20oJ2IzNjMnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0zMiddID0gQnVmZmVyLmZyb20oJ2IzNjQnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC00MCddID0gQnVmZmVyLmZyb20oJ2IzNjUnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC00OCddID0gQnVmZmVyLmZyb20oJ2IzNjYnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC01NiddID0gQnVmZmVyLmZyb20oJ2IzNjcnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC02NCddID0gQnVmZmVyLmZyb20oJ2IzNjgnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC03MiddID0gQnVmZmVyLmZyb20oJ2IzNjknLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC04MCddID0gQnVmZmVyLmZyb20oJ2IzNmEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC04OCddID0gQnVmZmVyLmZyb20oJ2IzNmInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC05NiddID0gQnVmZmVyLmZyb20oJ2IzNmMnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0xMDQnXSA9IEJ1ZmZlci5mcm9tKCdiMzZkJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMTEyJ10gPSBCdWZmZXIuZnJvbSgnYjM2ZScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTEyMCddID0gQnVmZmVyLmZyb20oJ2IzNmYnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0xMjgnXSA9IEJ1ZmZlci5mcm9tKCdiMzcwJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMTM2J10gPSBCdWZmZXIuZnJvbSgnYjM3MScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTE0NCddID0gQnVmZmVyLmZyb20oJ2IzNzInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0xNTInXSA9IEJ1ZmZlci5mcm9tKCdiMzczJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMTYwJ10gPSBCdWZmZXIuZnJvbSgnYjM3NCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTE2OCddID0gQnVmZmVyLmZyb20oJ2IzNzUnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0xNzYnXSA9IEJ1ZmZlci5mcm9tKCdiMzc2JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMTg0J10gPSBCdWZmZXIuZnJvbSgnYjM3NycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTE5MiddID0gQnVmZmVyLmZyb20oJ2IzNzgnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0yMDAnXSA9IEJ1ZmZlci5mcm9tKCdiMzc5JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMjA4J10gPSBCdWZmZXIuZnJvbSgnYjM3YScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTIxNiddID0gQnVmZmVyLmZyb20oJ2IzN2InLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0yMjQnXSA9IEJ1ZmZlci5mcm9tKCdiMzdjJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMjMyJ10gPSBCdWZmZXIuZnJvbSgnYjM3ZCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTI0MCddID0gQnVmZmVyLmZyb20oJ2IzN2UnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0yNDgnXSA9IEJ1ZmZlci5mcm9tKCdiMzdmJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMjU2J10gPSBCdWZmZXIuZnJvbSgnYjM4MCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTI2NCddID0gQnVmZmVyLmZyb20oJ2IzODEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0yNzInXSA9IEJ1ZmZlci5mcm9tKCdiMzgyJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMjgwJ10gPSBCdWZmZXIuZnJvbSgnYjM4MycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTI4OCddID0gQnVmZmVyLmZyb20oJ2IzODQnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0yOTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzg1JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMzA0J10gPSBCdWZmZXIuZnJvbSgnYjM4NicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTMxMiddID0gQnVmZmVyLmZyb20oJ2IzODcnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0zMjAnXSA9IEJ1ZmZlci5mcm9tKCdiMzg4JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMzI4J10gPSBCdWZmZXIuZnJvbSgnYjM4OScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTMzNiddID0gQnVmZmVyLmZyb20oJ2IzOGEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0zNDQnXSA9IEJ1ZmZlci5mcm9tKCdiMzhiJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMzUyJ10gPSBCdWZmZXIuZnJvbSgnYjM4YycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTM2MCddID0gQnVmZmVyLmZyb20oJ2IzOGQnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0zNjgnXSA9IEJ1ZmZlci5mcm9tKCdiMzhlJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMzc2J10gPSBCdWZmZXIuZnJvbSgnYjM4ZicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTM4NCddID0gQnVmZmVyLmZyb20oJ2IzOTAnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0zOTInXSA9IEJ1ZmZlci5mcm9tKCdiMzkxJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNDAwJ10gPSBCdWZmZXIuZnJvbSgnYjM5MicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTQwOCddID0gQnVmZmVyLmZyb20oJ2IzOTMnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC00MTYnXSA9IEJ1ZmZlci5mcm9tKCdiMzk0JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNDI0J10gPSBCdWZmZXIuZnJvbSgnYjM5NScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTQzMiddID0gQnVmZmVyLmZyb20oJ2IzOTYnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC00NDAnXSA9IEJ1ZmZlci5mcm9tKCdiMzk3JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNDQ4J10gPSBCdWZmZXIuZnJvbSgnYjM5OCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTQ1NiddID0gQnVmZmVyLmZyb20oJ2IzOTknLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC00NjQnXSA9IEJ1ZmZlci5mcm9tKCdiMzlhJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNDcyJ10gPSBCdWZmZXIuZnJvbSgnYjM5YicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTQ4MCddID0gQnVmZmVyLmZyb20oJ2IzOWMnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC00ODgnXSA9IEJ1ZmZlci5mcm9tKCdiMzlkJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNDk2J10gPSBCdWZmZXIuZnJvbSgnYjM5ZScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTUwNCddID0gQnVmZmVyLmZyb20oJ2IzOWYnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC01MTInXSA9IEJ1ZmZlci5mcm9tKCdiM2EwJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNTIwJ10gPSBCdWZmZXIuZnJvbSgnYjNhMScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTUyOCddID0gQnVmZmVyLmZyb20oJ2IzYTInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC01MzYnXSA9IEJ1ZmZlci5mcm9tKCdiM2EzJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNTQ0J10gPSBCdWZmZXIuZnJvbSgnYjNhNCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTU1MiddID0gQnVmZmVyLmZyb20oJ2IzYTUnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC01NjAnXSA9IEJ1ZmZlci5mcm9tKCdiM2E2JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNTY4J10gPSBCdWZmZXIuZnJvbSgnYjNhNycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTU3NiddID0gQnVmZmVyLmZyb20oJ2IzYTgnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC01ODQnXSA9IEJ1ZmZlci5mcm9tKCdiM2E5JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNTkyJ10gPSBCdWZmZXIuZnJvbSgnYjNhYScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTYwMCddID0gQnVmZmVyLmZyb20oJ2IzYWInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC02MDgnXSA9IEJ1ZmZlci5mcm9tKCdiM2FjJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNjE2J10gPSBCdWZmZXIuZnJvbSgnYjNhZCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTYyNCddID0gQnVmZmVyLmZyb20oJ2IzYWUnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC02MzInXSA9IEJ1ZmZlci5mcm9tKCdiM2FmJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNjQwJ10gPSBCdWZmZXIuZnJvbSgnYjNiMCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTY0OCddID0gQnVmZmVyLmZyb20oJ2IzYjEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC02NTYnXSA9IEJ1ZmZlci5mcm9tKCdiM2IyJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNjY0J10gPSBCdWZmZXIuZnJvbSgnYjNiMycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTY3MiddID0gQnVmZmVyLmZyb20oJ2IzYjQnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC02ODAnXSA9IEJ1ZmZlci5mcm9tKCdiM2I1JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNjg4J10gPSBCdWZmZXIuZnJvbSgnYjNiNicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTY5NiddID0gQnVmZmVyLmZyb20oJ2IzYjcnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC03MDQnXSA9IEJ1ZmZlci5mcm9tKCdiM2I4JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNzEyJ10gPSBCdWZmZXIuZnJvbSgnYjNiOScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTcyMCddID0gQnVmZmVyLmZyb20oJ2IzYmEnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC03MjgnXSA9IEJ1ZmZlci5mcm9tKCdiM2JiJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNzM2J10gPSBCdWZmZXIuZnJvbSgnYjNiYycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTc0NCddID0gQnVmZmVyLmZyb20oJ2IzYmQnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC03NTInXSA9IEJ1ZmZlci5mcm9tKCdiM2JlJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNzYwJ10gPSBCdWZmZXIuZnJvbSgnYjNiZicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTc2OCddID0gQnVmZmVyLmZyb20oJ2IzYzAnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC03NzYnXSA9IEJ1ZmZlci5mcm9tKCdiM2MxJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtNzg0J10gPSBCdWZmZXIuZnJvbSgnYjNjMicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTc5MiddID0gQnVmZmVyLmZyb20oJ2IzYzMnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC04MDAnXSA9IEJ1ZmZlci5mcm9tKCdiM2M0JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtODA4J10gPSBCdWZmZXIuZnJvbSgnYjNjNScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTgxNiddID0gQnVmZmVyLmZyb20oJ2IzYzYnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC04MjQnXSA9IEJ1ZmZlci5mcm9tKCdiM2M3JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtODMyJ10gPSBCdWZmZXIuZnJvbSgnYjNjOCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTg0MCddID0gQnVmZmVyLmZyb20oJ2IzYzknLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC04NDgnXSA9IEJ1ZmZlci5mcm9tKCdiM2NhJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtODU2J10gPSBCdWZmZXIuZnJvbSgnYjNjYicsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTg2NCddID0gQnVmZmVyLmZyb20oJ2IzY2MnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC04NzInXSA9IEJ1ZmZlci5mcm9tKCdiM2NkJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtODgwJ10gPSBCdWZmZXIuZnJvbSgnYjNjZScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTg4OCddID0gQnVmZmVyLmZyb20oJ2IzY2YnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC04OTYnXSA9IEJ1ZmZlci5mcm9tKCdiM2QwJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtOTA0J10gPSBCdWZmZXIuZnJvbSgnYjNkMScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTkxMiddID0gQnVmZmVyLmZyb20oJ2IzZDInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC05MjAnXSA9IEJ1ZmZlci5mcm9tKCdiM2QzJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtOTI4J10gPSBCdWZmZXIuZnJvbSgnYjNkNCcsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTkzNiddID0gQnVmZmVyLmZyb20oJ2IzZDUnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC05NDQnXSA9IEJ1ZmZlci5mcm9tKCdiM2Q2JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtOTUyJ10gPSBCdWZmZXIuZnJvbSgnYjNkNycsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTk2MCddID0gQnVmZmVyLmZyb20oJ2IzZDgnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC05NjgnXSA9IEJ1ZmZlci5mcm9tKCdiM2Q5JywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtOTc2J10gPSBCdWZmZXIuZnJvbSgnYjNkYScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTk4NCddID0gQnVmZmVyLmZyb20oJ2IzZGInLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC05OTInXSA9IEJ1ZmZlci5mcm9tKCdiM2RjJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMTAwMCddID0gQnVmZmVyLmZyb20oJ2IzZGQnLCAnaGV4JylcbmV4cG9ydHNbJ3NrZWluMTAyNC0xMDA4J10gPSBCdWZmZXIuZnJvbSgnYjNkZScsICdoZXgnKVxuZXhwb3J0c1snc2tlaW4xMDI0LTEwMTYnXSA9IEJ1ZmZlci5mcm9tKCdiM2RmJywgJ2hleCcpXG5leHBvcnRzWydza2VpbjEwMjQtMTAyNCddID0gQnVmZmVyLmZyb20oJ2IzZTAnLCAnaGV4JylcblxuLy8gbXVsdGlhZGRyc1xuZXhwb3J0c1snaXA0J10gPSBCdWZmZXIuZnJvbSgnMDQnLCAnaGV4JylcbmV4cG9ydHNbJ2lwNiddID0gQnVmZmVyLmZyb20oJzI5JywgJ2hleCcpXG5leHBvcnRzWyd0Y3AnXSA9IEJ1ZmZlci5mcm9tKCcwNicsICdoZXgnKVxuZXhwb3J0c1sndWRwJ10gPSBCdWZmZXIuZnJvbSgnMDExMScsICdoZXgnKVxuZXhwb3J0c1snZGNjcCddID0gQnVmZmVyLmZyb20oJzIxJywgJ2hleCcpXG5leHBvcnRzWydzY3RwJ10gPSBCdWZmZXIuZnJvbSgnODQnLCAnaGV4JylcbmV4cG9ydHNbJ3VkdCddID0gQnVmZmVyLmZyb20oJzAxMmQnLCAnaGV4JylcbmV4cG9ydHNbJ3V0cCddID0gQnVmZmVyLmZyb20oJzAxMmUnLCAnaGV4JylcbmV4cG9ydHNbJ2lwZnMnXSA9IEJ1ZmZlci5mcm9tKCcwMWE1JywgJ2hleCcpXG5leHBvcnRzWydodHRwJ10gPSBCdWZmZXIuZnJvbSgnMDFlMCcsICdoZXgnKVxuZXhwb3J0c1snaHR0cHMnXSA9IEJ1ZmZlci5mcm9tKCcwMWJiJywgJ2hleCcpXG5leHBvcnRzWydxdWljJ10gPSBCdWZmZXIuZnJvbSgnMDFjYycsICdoZXgnKVxuZXhwb3J0c1snd3MnXSA9IEJ1ZmZlci5mcm9tKCcwMWRkJywgJ2hleCcpXG5leHBvcnRzWydvbmlvbiddID0gQnVmZmVyLmZyb20oJzAxYmMnLCAnaGV4JylcbmV4cG9ydHNbJ3AycC1jaXJjdWl0J10gPSBCdWZmZXIuZnJvbSgnMDEyMicsICdoZXgnKVxuXG4vLyBhcmNoaXZpbmcgZm9ybWF0c1xuXG4vLyBpbWFnZSBmb3JtYXRzXG5cbi8vIHZpZGVvIGZvcm1hdHNcblxuLy8gVkNTIGZvcm1hdHNcbmV4cG9ydHNbJ2dpdC1yYXcnXSA9IEJ1ZmZlci5mcm9tKCc3OCcsICdoZXgnKVxuXG4vLyBJUExEIGZvcm1hdHNcbmV4cG9ydHNbJ2RhZy1wYiddID0gQnVmZmVyLmZyb20oJzcwJywgJ2hleCcpXG5leHBvcnRzWydkYWctY2JvciddID0gQnVmZmVyLmZyb20oJzcxJywgJ2hleCcpXG5leHBvcnRzWydnaXQtcmF3J10gPSBCdWZmZXIuZnJvbSgnNzgnLCAnaGV4JylcbmV4cG9ydHNbJ2V0aC1ibG9jayddID0gQnVmZmVyLmZyb20oJzkwJywgJ2hleCcpXG5leHBvcnRzWydldGgtYmxvY2stbGlzdCddID0gQnVmZmVyLmZyb20oJzkxJywgJ2hleCcpXG5leHBvcnRzWydldGgtdHgtdHJpZSddID0gQnVmZmVyLmZyb20oJzkyJywgJ2hleCcpXG5leHBvcnRzWydldGgtdHgnXSA9IEJ1ZmZlci5mcm9tKCc5MycsICdoZXgnKVxuZXhwb3J0c1snZXRoLXR4LXJlY2VpcHQtdHJpZSddID0gQnVmZmVyLmZyb20oJzk0JywgJ2hleCcpXG5leHBvcnRzWydldGgtdHgtcmVjZWlwdCddID0gQnVmZmVyLmZyb20oJzk1JywgJ2hleCcpXG5leHBvcnRzWydldGgtc3RhdGUtdHJpZSddID0gQnVmZmVyLmZyb20oJzk2JywgJ2hleCcpXG5leHBvcnRzWydldGgtYWNjb3VudC1zbmFwc2hvdCddID0gQnVmZmVyLmZyb20oJzk3JywgJ2hleCcpXG5leHBvcnRzWydldGgtc3RvcmFnZS10cmllJ10gPSBCdWZmZXIuZnJvbSgnOTgnLCAnaGV4JylcblxuZXhwb3J0c1snYml0Y29pbi1ibG9jayddID0gQnVmZmVyLmZyb20oJ2IwJywgJ2hleCcpXG5leHBvcnRzWydiaXRjb2luLXR4J10gPSBCdWZmZXIuZnJvbSgnYjEnLCAnaGV4JylcbmV4cG9ydHNbJ3pjYXNoLWJsb2NrJ10gPSBCdWZmZXIuZnJvbSgnYzAnLCAnaGV4JylcbmV4cG9ydHNbJ3pjYXNoLXR4J10gPSBCdWZmZXIuZnJvbSgnYzEnLCAnaGV4JylcbmV4cG9ydHNbJ3N0ZWxsYXItYmxvY2snXSA9IEJ1ZmZlci5mcm9tKCdkMCcsICdoZXgnKVxuZXhwb3J0c1snc3RlbGxhci10eCddID0gQnVmZmVyLmZyb20oJ2QxJywgJ2hleCcpXG5cbmV4cG9ydHNbJ3RvcnJlbnQtaW5mbyddID0gQnVmZmVyLmZyb20oJzdiJywgJ2hleCcpXG5leHBvcnRzWyd0b3JyZW50LWZpbGUnXSA9IEJ1ZmZlci5mcm9tKCc3YycsICdoZXgnKVxuZXhwb3J0c1snZWQyNTUxOS1wdWInXSA9IEJ1ZmZlci5mcm9tKCdlZCcsICdoZXgnKVxuIiwiLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgbXVsdGljb2RlYyBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIEBtb2R1bGUgbXVsdGljb2RlY1xuICogQGV4YW1wbGVcbiAqIGNvbnN0IG11bHRpY29kZWMgPSByZXF1aXJlKCdtdWx0aWNvZGVjJylcbiAqXG4gKiBjb25zdCBwcmVmaXhlZFByb3RvYnVmID0gbXVsdGljb2RlYy5hZGRQcmVmaXgoJ3Byb3RvYnVmJywgcHJvdG9idWZCdWZmZXIpXG4gKiAvLyBwcmVmaXhlZFByb3RvYnVmIDB4NTAuLi5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCB2YXJpbnQgPSByZXF1aXJlKCd2YXJpbnQnKVxuY29uc3QgY29kZWNOYW1lVG9Db2RlVmFyaW50ID0gcmVxdWlyZSgnLi92YXJpbnQtdGFibGUnKVxuY29uc3QgY29kZVRvQ29kZWNOYW1lID0gcmVxdWlyZSgnLi9uYW1lLXRhYmxlJylcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHNcblxuLyoqXG4gKiBQcmVmaXggYSBidWZmZXIgd2l0aCBhIG11bHRpY29kZWMtcGFja2VkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gbXVsdGljb2RlY1N0ck9yQ29kZVxuICogQHBhcmFtIHtCdWZmZXJ9IGRhdGFcbiAqIEByZXR1cm5zIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMuYWRkUHJlZml4ID0gKG11bHRpY29kZWNTdHJPckNvZGUsIGRhdGEpID0+IHtcbiAgbGV0IHByZWZpeFxuXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIobXVsdGljb2RlY1N0ck9yQ29kZSkpIHtcbiAgICBwcmVmaXggPSB1dGlsLnZhcmludEJ1ZmZlckVuY29kZShtdWx0aWNvZGVjU3RyT3JDb2RlKVxuICB9IGVsc2Uge1xuICAgIGlmIChjb2RlY05hbWVUb0NvZGVWYXJpbnRbbXVsdGljb2RlY1N0ck9yQ29kZV0pIHtcbiAgICAgIHByZWZpeCA9IGNvZGVjTmFtZVRvQ29kZVZhcmludFttdWx0aWNvZGVjU3RyT3JDb2RlXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpY29kZWMgbm90IHJlY29nbml6ZWQnKVxuICAgIH1cbiAgfVxuICByZXR1cm4gQnVmZmVyLmNvbmNhdChbcHJlZml4LCBkYXRhXSlcbn1cblxuLyoqXG4gKiBEZWNhcHN1bGF0ZSB0aGUgbXVsdGljb2RlYy1wYWNrZWQgcHJlZml4IGZyb20gdGhlIGRhdGEuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGRhdGFcbiAqIEByZXR1cm5zIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMucm1QcmVmaXggPSAoZGF0YSkgPT4ge1xuICB2YXJpbnQuZGVjb2RlKGRhdGEpXG4gIHJldHVybiBkYXRhLnNsaWNlKHZhcmludC5kZWNvZGUuYnl0ZXMpXG59XG5cbi8qKlxuICogR2V0IHRoZSBjb2RlYyBvZiB0aGUgcHJlZml4ZWQgZGF0YS5cbiAqIEBwYXJhbSB7QnVmZmVyfSBwcmVmaXhlZERhdGFcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydHMuZ2V0Q29kZWMgPSAocHJlZml4ZWREYXRhKSA9PiB7XG4gIGNvbnN0IGNvZGUgPSB1dGlsLnZhcmludEJ1ZmZlckRlY29kZShwcmVmaXhlZERhdGEpXG4gIGNvbnN0IGNvZGVjTmFtZSA9IGNvZGVUb0NvZGVjTmFtZVtjb2RlLnRvU3RyaW5nKCdoZXgnKV1cbiAgcmV0dXJuIGNvZGVjTmFtZVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5jb25zdCBiYXNlVGFibGUgPSByZXF1aXJlKCcuL2Jhc2UtdGFibGUnKVxuXG4vLyB0aGlzIGNyZWF0ZXMgYSBtYXAgZm9yIGNvZGUgYXMgaGV4U3RyaW5nIC0+IGNvZGVjTmFtZVxuXG5jb25zdCBuYW1lVGFibGUgPSB7fVxubW9kdWxlLmV4cG9ydHMgPSBuYW1lVGFibGVcblxuZm9yIChsZXQgZW5jb2RpbmdOYW1lIGluIGJhc2VUYWJsZSkge1xuICBsZXQgY29kZSA9IGJhc2VUYWJsZVtlbmNvZGluZ05hbWVdXG4gIG5hbWVUYWJsZVtjb2RlLnRvU3RyaW5nKCdoZXgnKV0gPSBlbmNvZGluZ05hbWVcbn1cbiIsIid1c2Ugc3RyaWN0J1xuY29uc3QgdmFyaW50ID0gcmVxdWlyZSgndmFyaW50JylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG51bWJlclRvQnVmZmVyLFxuICBidWZmZXJUb051bWJlcixcbiAgdmFyaW50QnVmZmVyRW5jb2RlLFxuICB2YXJpbnRCdWZmZXJEZWNvZGVcbn1cblxuZnVuY3Rpb24gYnVmZmVyVG9OdW1iZXIgKGJ1Zikge1xuICByZXR1cm4gcGFyc2VJbnQoYnVmLnRvU3RyaW5nKCdoZXgnKSwgMTYpXG59XG5cbmZ1bmN0aW9uIG51bWJlclRvQnVmZmVyIChudW0pIHtcbiAgbGV0IGhleFN0cmluZyA9IG51bS50b1N0cmluZygxNilcbiAgaWYgKGhleFN0cmluZy5sZW5ndGggJSAyID09PSAxKSB7XG4gICAgaGV4U3RyaW5nID0gJzAnICsgaGV4U3RyaW5nXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGhleFN0cmluZywgJ2hleCcpXG59XG5cbmZ1bmN0aW9uIHZhcmludEJ1ZmZlckVuY29kZSAoaW5wdXQpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhcmludC5lbmNvZGUoYnVmZmVyVG9OdW1iZXIoaW5wdXQpKSlcbn1cblxuZnVuY3Rpb24gdmFyaW50QnVmZmVyRGVjb2RlIChpbnB1dCkge1xuICByZXR1cm4gbnVtYmVyVG9CdWZmZXIodmFyaW50LmRlY29kZShpbnB1dCkpXG59XG4iLCIndXNlIHN0cmljdCdcbmNvbnN0IGJhc2VUYWJsZSA9IHJlcXVpcmUoJy4vYmFzZS10YWJsZScpXG5jb25zdCB2YXJpbnRCdWZmZXJFbmNvZGUgPSByZXF1aXJlKCcuL3V0aWwnKS52YXJpbnRCdWZmZXJFbmNvZGVcblxuLy8gdGhpcyBjcmVhdGVzIGEgbWFwIGZvciBjb2RlY05hbWUgLT4gY29kZVZhcmludEJ1ZmZlclxuXG5jb25zdCB2YXJpbnRUYWJsZSA9IHt9XG5tb2R1bGUuZXhwb3J0cyA9IHZhcmludFRhYmxlXG5cbmZvciAobGV0IGVuY29kaW5nTmFtZSBpbiBiYXNlVGFibGUpIHtcbiAgbGV0IGNvZGUgPSBiYXNlVGFibGVbZW5jb2RpbmdOYW1lXVxuICB2YXJpbnRUYWJsZVtlbmNvZGluZ05hbWVdID0gdmFyaW50QnVmZmVyRW5jb2RlKGNvZGUpXG59XG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IG9mZiAqL1xuLyogZXNsaW50IGtleS1zcGFjaW5nOiBvZmYgKi9cbid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLm5hbWVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICdzaGExJzogICAgICAgMHgxMSxcbiAgJ3NoYTItMjU2JzogICAweDEyLFxuICAnc2hhMi01MTInOiAgIDB4MTMsXG4gICdkYmwtc2hhMi0yNTYnOiAweDU2LFxuICAnc2hhMy0yMjQnOiAgIDB4MTcsXG4gICdzaGEzLTI1Nic6ICAgMHgxNixcbiAgJ3NoYTMtMzg0JzogICAweDE1LFxuICAnc2hhMy01MTInOiAgIDB4MTQsXG4gICdzaGFrZS0xMjgnOiAgMHgxOCxcbiAgJ3NoYWtlLTI1Nic6ICAweDE5LFxuICAna2VjY2FrLTIyNCc6IDB4MUEsXG4gICdrZWNjYWstMjU2JzogMHgxQixcbiAgJ2tlY2Nhay0zODQnOiAweDFDLFxuICAna2VjY2FrLTUxMic6IDB4MUQsXG4gICdtdXJtdXIzLTEyOCc6IDB4MjIsXG4gICdtdXJtdXIzLTMyJzogIDB4MjMsXG4gICdibGFrZTJiLTgnOiAgIDB4YjIwMSxcbiAgJ2JsYWtlMmItMTYnOiAgMHhiMjAyLFxuICAnYmxha2UyYi0yNCc6ICAweGIyMDMsXG4gICdibGFrZTJiLTMyJzogIDB4YjIwNCxcbiAgJ2JsYWtlMmItNDAnOiAgMHhiMjA1LFxuICAnYmxha2UyYi00OCc6ICAweGIyMDYsXG4gICdibGFrZTJiLTU2JzogIDB4YjIwNyxcbiAgJ2JsYWtlMmItNjQnOiAgMHhiMjA4LFxuICAnYmxha2UyYi03Mic6ICAweGIyMDksXG4gICdibGFrZTJiLTgwJzogIDB4YjIwYSxcbiAgJ2JsYWtlMmItODgnOiAgMHhiMjBiLFxuICAnYmxha2UyYi05Nic6ICAweGIyMGMsXG4gICdibGFrZTJiLTEwNCc6IDB4YjIwZCxcbiAgJ2JsYWtlMmItMTEyJzogMHhiMjBlLFxuICAnYmxha2UyYi0xMjAnOiAweGIyMGYsXG4gICdibGFrZTJiLTEyOCc6IDB4YjIxMCxcbiAgJ2JsYWtlMmItMTM2JzogMHhiMjExLFxuICAnYmxha2UyYi0xNDQnOiAweGIyMTIsXG4gICdibGFrZTJiLTE1Mic6IDB4YjIxMyxcbiAgJ2JsYWtlMmItMTYwJzogMHhiMjE0LFxuICAnYmxha2UyYi0xNjgnOiAweGIyMTUsXG4gICdibGFrZTJiLTE3Nic6IDB4YjIxNixcbiAgJ2JsYWtlMmItMTg0JzogMHhiMjE3LFxuICAnYmxha2UyYi0xOTInOiAweGIyMTgsXG4gICdibGFrZTJiLTIwMCc6IDB4YjIxOSxcbiAgJ2JsYWtlMmItMjA4JzogMHhiMjFhLFxuICAnYmxha2UyYi0yMTYnOiAweGIyMWIsXG4gICdibGFrZTJiLTIyNCc6IDB4YjIxYyxcbiAgJ2JsYWtlMmItMjMyJzogMHhiMjFkLFxuICAnYmxha2UyYi0yNDAnOiAweGIyMWUsXG4gICdibGFrZTJiLTI0OCc6IDB4YjIxZixcbiAgJ2JsYWtlMmItMjU2JzogMHhiMjIwLFxuICAnYmxha2UyYi0yNjQnOiAweGIyMjEsXG4gICdibGFrZTJiLTI3Mic6IDB4YjIyMixcbiAgJ2JsYWtlMmItMjgwJzogMHhiMjIzLFxuICAnYmxha2UyYi0yODgnOiAweGIyMjQsXG4gICdibGFrZTJiLTI5Nic6IDB4YjIyNSxcbiAgJ2JsYWtlMmItMzA0JzogMHhiMjI2LFxuICAnYmxha2UyYi0zMTInOiAweGIyMjcsXG4gICdibGFrZTJiLTMyMCc6IDB4YjIyOCxcbiAgJ2JsYWtlMmItMzI4JzogMHhiMjI5LFxuICAnYmxha2UyYi0zMzYnOiAweGIyMmEsXG4gICdibGFrZTJiLTM0NCc6IDB4YjIyYixcbiAgJ2JsYWtlMmItMzUyJzogMHhiMjJjLFxuICAnYmxha2UyYi0zNjAnOiAweGIyMmQsXG4gICdibGFrZTJiLTM2OCc6IDB4YjIyZSxcbiAgJ2JsYWtlMmItMzc2JzogMHhiMjJmLFxuICAnYmxha2UyYi0zODQnOiAweGIyMzAsXG4gICdibGFrZTJiLTM5Mic6IDB4YjIzMSxcbiAgJ2JsYWtlMmItNDAwJzogMHhiMjMyLFxuICAnYmxha2UyYi00MDgnOiAweGIyMzMsXG4gICdibGFrZTJiLTQxNic6IDB4YjIzNCxcbiAgJ2JsYWtlMmItNDI0JzogMHhiMjM1LFxuICAnYmxha2UyYi00MzInOiAweGIyMzYsXG4gICdibGFrZTJiLTQ0MCc6IDB4YjIzNyxcbiAgJ2JsYWtlMmItNDQ4JzogMHhiMjM4LFxuICAnYmxha2UyYi00NTYnOiAweGIyMzksXG4gICdibGFrZTJiLTQ2NCc6IDB4YjIzYSxcbiAgJ2JsYWtlMmItNDcyJzogMHhiMjNiLFxuICAnYmxha2UyYi00ODAnOiAweGIyM2MsXG4gICdibGFrZTJiLTQ4OCc6IDB4YjIzZCxcbiAgJ2JsYWtlMmItNDk2JzogMHhiMjNlLFxuICAnYmxha2UyYi01MDQnOiAweGIyM2YsXG4gICdibGFrZTJiLTUxMic6IDB4YjI0MCxcbiAgJ2JsYWtlMnMtOCc6ICAgMHhiMjQxLFxuICAnYmxha2Uycy0xNic6ICAweGIyNDIsXG4gICdibGFrZTJzLTI0JzogIDB4YjI0MyxcbiAgJ2JsYWtlMnMtMzInOiAgMHhiMjQ0LFxuICAnYmxha2Uycy00MCc6ICAweGIyNDUsXG4gICdibGFrZTJzLTQ4JzogIDB4YjI0NixcbiAgJ2JsYWtlMnMtNTYnOiAgMHhiMjQ3LFxuICAnYmxha2Uycy02NCc6ICAweGIyNDgsXG4gICdibGFrZTJzLTcyJzogIDB4YjI0OSxcbiAgJ2JsYWtlMnMtODAnOiAgMHhiMjRhLFxuICAnYmxha2Uycy04OCc6ICAweGIyNGIsXG4gICdibGFrZTJzLTk2JzogIDB4YjI0YyxcbiAgJ2JsYWtlMnMtMTA0JzogMHhiMjRkLFxuICAnYmxha2Uycy0xMTInOiAweGIyNGUsXG4gICdibGFrZTJzLTEyMCc6IDB4YjI0ZixcbiAgJ2JsYWtlMnMtMTI4JzogMHhiMjUwLFxuICAnYmxha2Uycy0xMzYnOiAweGIyNTEsXG4gICdibGFrZTJzLTE0NCc6IDB4YjI1MixcbiAgJ2JsYWtlMnMtMTUyJzogMHhiMjUzLFxuICAnYmxha2Uycy0xNjAnOiAweGIyNTQsXG4gICdibGFrZTJzLTE2OCc6IDB4YjI1NSxcbiAgJ2JsYWtlMnMtMTc2JzogMHhiMjU2LFxuICAnYmxha2Uycy0xODQnOiAweGIyNTcsXG4gICdibGFrZTJzLTE5Mic6IDB4YjI1OCxcbiAgJ2JsYWtlMnMtMjAwJzogMHhiMjU5LFxuICAnYmxha2Uycy0yMDgnOiAweGIyNWEsXG4gICdibGFrZTJzLTIxNic6IDB4YjI1YixcbiAgJ2JsYWtlMnMtMjI0JzogMHhiMjVjLFxuICAnYmxha2Uycy0yMzInOiAweGIyNWQsXG4gICdibGFrZTJzLTI0MCc6IDB4YjI1ZSxcbiAgJ2JsYWtlMnMtMjQ4JzogMHhiMjVmLFxuICAnYmxha2Uycy0yNTYnOiAweGIyNjAsXG4gICdTa2VpbjI1Ni04JzogMHhiMzAxLFxuICAnU2tlaW4yNTYtMTYnOiAweGIzMDIsXG4gICdTa2VpbjI1Ni0yNCc6IDB4YjMwMyxcbiAgJ1NrZWluMjU2LTMyJzogMHhiMzA0LFxuICAnU2tlaW4yNTYtNDAnOiAweGIzMDUsXG4gICdTa2VpbjI1Ni00OCc6IDB4YjMwNixcbiAgJ1NrZWluMjU2LTU2JzogMHhiMzA3LFxuICAnU2tlaW4yNTYtNjQnOiAweGIzMDgsXG4gICdTa2VpbjI1Ni03Mic6IDB4YjMwOSxcbiAgJ1NrZWluMjU2LTgwJzogMHhiMzBhLFxuICAnU2tlaW4yNTYtODgnOiAweGIzMGIsXG4gICdTa2VpbjI1Ni05Nic6IDB4YjMwYyxcbiAgJ1NrZWluMjU2LTEwNCc6IDB4YjMwZCxcbiAgJ1NrZWluMjU2LTExMic6IDB4YjMwZSxcbiAgJ1NrZWluMjU2LTEyMCc6IDB4YjMwZixcbiAgJ1NrZWluMjU2LTEyOCc6IDB4YjMxMCxcbiAgJ1NrZWluMjU2LTEzNic6IDB4YjMxMSxcbiAgJ1NrZWluMjU2LTE0NCc6IDB4YjMxMixcbiAgJ1NrZWluMjU2LTE1Mic6IDB4YjMxMyxcbiAgJ1NrZWluMjU2LTE2MCc6IDB4YjMxNCxcbiAgJ1NrZWluMjU2LTE2OCc6IDB4YjMxNSxcbiAgJ1NrZWluMjU2LTE3Nic6IDB4YjMxNixcbiAgJ1NrZWluMjU2LTE4NCc6IDB4YjMxNyxcbiAgJ1NrZWluMjU2LTE5Mic6IDB4YjMxOCxcbiAgJ1NrZWluMjU2LTIwMCc6IDB4YjMxOSxcbiAgJ1NrZWluMjU2LTIwOCc6IDB4YjMxYSxcbiAgJ1NrZWluMjU2LTIxNic6IDB4YjMxYixcbiAgJ1NrZWluMjU2LTIyNCc6IDB4YjMxYyxcbiAgJ1NrZWluMjU2LTIzMic6IDB4YjMxZCxcbiAgJ1NrZWluMjU2LTI0MCc6IDB4YjMxZSxcbiAgJ1NrZWluMjU2LTI0OCc6IDB4YjMxZixcbiAgJ1NrZWluMjU2LTI1Nic6IDB4YjMyMCxcbiAgJ1NrZWluNTEyLTgnOiAweGIzMjEsXG4gICdTa2VpbjUxMi0xNic6IDB4YjMyMixcbiAgJ1NrZWluNTEyLTI0JzogMHhiMzIzLFxuICAnU2tlaW41MTItMzInOiAweGIzMjQsXG4gICdTa2VpbjUxMi00MCc6IDB4YjMyNSxcbiAgJ1NrZWluNTEyLTQ4JzogMHhiMzI2LFxuICAnU2tlaW41MTItNTYnOiAweGIzMjcsXG4gICdTa2VpbjUxMi02NCc6IDB4YjMyOCxcbiAgJ1NrZWluNTEyLTcyJzogMHhiMzI5LFxuICAnU2tlaW41MTItODAnOiAweGIzMmEsXG4gICdTa2VpbjUxMi04OCc6IDB4YjMyYixcbiAgJ1NrZWluNTEyLTk2JzogMHhiMzJjLFxuICAnU2tlaW41MTItMTA0JzogMHhiMzJkLFxuICAnU2tlaW41MTItMTEyJzogMHhiMzJlLFxuICAnU2tlaW41MTItMTIwJzogMHhiMzJmLFxuICAnU2tlaW41MTItMTI4JzogMHhiMzMwLFxuICAnU2tlaW41MTItMTM2JzogMHhiMzMxLFxuICAnU2tlaW41MTItMTQ0JzogMHhiMzMyLFxuICAnU2tlaW41MTItMTUyJzogMHhiMzMzLFxuICAnU2tlaW41MTItMTYwJzogMHhiMzM0LFxuICAnU2tlaW41MTItMTY4JzogMHhiMzM1LFxuICAnU2tlaW41MTItMTc2JzogMHhiMzM2LFxuICAnU2tlaW41MTItMTg0JzogMHhiMzM3LFxuICAnU2tlaW41MTItMTkyJzogMHhiMzM4LFxuICAnU2tlaW41MTItMjAwJzogMHhiMzM5LFxuICAnU2tlaW41MTItMjA4JzogMHhiMzNhLFxuICAnU2tlaW41MTItMjE2JzogMHhiMzNiLFxuICAnU2tlaW41MTItMjI0JzogMHhiMzNjLFxuICAnU2tlaW41MTItMjMyJzogMHhiMzNkLFxuICAnU2tlaW41MTItMjQwJzogMHhiMzNlLFxuICAnU2tlaW41MTItMjQ4JzogMHhiMzNmLFxuICAnU2tlaW41MTItMjU2JzogMHhiMzQwLFxuICAnU2tlaW41MTItMjY0JzogMHhiMzQxLFxuICAnU2tlaW41MTItMjcyJzogMHhiMzQyLFxuICAnU2tlaW41MTItMjgwJzogMHhiMzQzLFxuICAnU2tlaW41MTItMjg4JzogMHhiMzQ0LFxuICAnU2tlaW41MTItMjk2JzogMHhiMzQ1LFxuICAnU2tlaW41MTItMzA0JzogMHhiMzQ2LFxuICAnU2tlaW41MTItMzEyJzogMHhiMzQ3LFxuICAnU2tlaW41MTItMzIwJzogMHhiMzQ4LFxuICAnU2tlaW41MTItMzI4JzogMHhiMzQ5LFxuICAnU2tlaW41MTItMzM2JzogMHhiMzRhLFxuICAnU2tlaW41MTItMzQ0JzogMHhiMzRiLFxuICAnU2tlaW41MTItMzUyJzogMHhiMzRjLFxuICAnU2tlaW41MTItMzYwJzogMHhiMzRkLFxuICAnU2tlaW41MTItMzY4JzogMHhiMzRlLFxuICAnU2tlaW41MTItMzc2JzogMHhiMzRmLFxuICAnU2tlaW41MTItMzg0JzogMHhiMzUwLFxuICAnU2tlaW41MTItMzkyJzogMHhiMzUxLFxuICAnU2tlaW41MTItNDAwJzogMHhiMzUyLFxuICAnU2tlaW41MTItNDA4JzogMHhiMzUzLFxuICAnU2tlaW41MTItNDE2JzogMHhiMzU0LFxuICAnU2tlaW41MTItNDI0JzogMHhiMzU1LFxuICAnU2tlaW41MTItNDMyJzogMHhiMzU2LFxuICAnU2tlaW41MTItNDQwJzogMHhiMzU3LFxuICAnU2tlaW41MTItNDQ4JzogMHhiMzU4LFxuICAnU2tlaW41MTItNDU2JzogMHhiMzU5LFxuICAnU2tlaW41MTItNDY0JzogMHhiMzVhLFxuICAnU2tlaW41MTItNDcyJzogMHhiMzViLFxuICAnU2tlaW41MTItNDgwJzogMHhiMzVjLFxuICAnU2tlaW41MTItNDg4JzogMHhiMzVkLFxuICAnU2tlaW41MTItNDk2JzogMHhiMzVlLFxuICAnU2tlaW41MTItNTA0JzogMHhiMzVmLFxuICAnU2tlaW41MTItNTEyJzogMHhiMzYwLFxuICAnU2tlaW4xMDI0LTgnOiAweGIzNjEsXG4gICdTa2VpbjEwMjQtMTYnOiAweGIzNjIsXG4gICdTa2VpbjEwMjQtMjQnOiAweGIzNjMsXG4gICdTa2VpbjEwMjQtMzInOiAweGIzNjQsXG4gICdTa2VpbjEwMjQtNDAnOiAweGIzNjUsXG4gICdTa2VpbjEwMjQtNDgnOiAweGIzNjYsXG4gICdTa2VpbjEwMjQtNTYnOiAweGIzNjcsXG4gICdTa2VpbjEwMjQtNjQnOiAweGIzNjgsXG4gICdTa2VpbjEwMjQtNzInOiAweGIzNjksXG4gICdTa2VpbjEwMjQtODAnOiAweGIzNmEsXG4gICdTa2VpbjEwMjQtODgnOiAweGIzNmIsXG4gICdTa2VpbjEwMjQtOTYnOiAweGIzNmMsXG4gICdTa2VpbjEwMjQtMTA0JzogMHhiMzZkLFxuICAnU2tlaW4xMDI0LTExMic6IDB4YjM2ZSxcbiAgJ1NrZWluMTAyNC0xMjAnOiAweGIzNmYsXG4gICdTa2VpbjEwMjQtMTI4JzogMHhiMzcwLFxuICAnU2tlaW4xMDI0LTEzNic6IDB4YjM3MSxcbiAgJ1NrZWluMTAyNC0xNDQnOiAweGIzNzIsXG4gICdTa2VpbjEwMjQtMTUyJzogMHhiMzczLFxuICAnU2tlaW4xMDI0LTE2MCc6IDB4YjM3NCxcbiAgJ1NrZWluMTAyNC0xNjgnOiAweGIzNzUsXG4gICdTa2VpbjEwMjQtMTc2JzogMHhiMzc2LFxuICAnU2tlaW4xMDI0LTE4NCc6IDB4YjM3NyxcbiAgJ1NrZWluMTAyNC0xOTInOiAweGIzNzgsXG4gICdTa2VpbjEwMjQtMjAwJzogMHhiMzc5LFxuICAnU2tlaW4xMDI0LTIwOCc6IDB4YjM3YSxcbiAgJ1NrZWluMTAyNC0yMTYnOiAweGIzN2IsXG4gICdTa2VpbjEwMjQtMjI0JzogMHhiMzdjLFxuICAnU2tlaW4xMDI0LTIzMic6IDB4YjM3ZCxcbiAgJ1NrZWluMTAyNC0yNDAnOiAweGIzN2UsXG4gICdTa2VpbjEwMjQtMjQ4JzogMHhiMzdmLFxuICAnU2tlaW4xMDI0LTI1Nic6IDB4YjM4MCxcbiAgJ1NrZWluMTAyNC0yNjQnOiAweGIzODEsXG4gICdTa2VpbjEwMjQtMjcyJzogMHhiMzgyLFxuICAnU2tlaW4xMDI0LTI4MCc6IDB4YjM4MyxcbiAgJ1NrZWluMTAyNC0yODgnOiAweGIzODQsXG4gICdTa2VpbjEwMjQtMjk2JzogMHhiMzg1LFxuICAnU2tlaW4xMDI0LTMwNCc6IDB4YjM4NixcbiAgJ1NrZWluMTAyNC0zMTInOiAweGIzODcsXG4gICdTa2VpbjEwMjQtMzIwJzogMHhiMzg4LFxuICAnU2tlaW4xMDI0LTMyOCc6IDB4YjM4OSxcbiAgJ1NrZWluMTAyNC0zMzYnOiAweGIzOGEsXG4gICdTa2VpbjEwMjQtMzQ0JzogMHhiMzhiLFxuICAnU2tlaW4xMDI0LTM1Mic6IDB4YjM4YyxcbiAgJ1NrZWluMTAyNC0zNjAnOiAweGIzOGQsXG4gICdTa2VpbjEwMjQtMzY4JzogMHhiMzhlLFxuICAnU2tlaW4xMDI0LTM3Nic6IDB4YjM4ZixcbiAgJ1NrZWluMTAyNC0zODQnOiAweGIzOTAsXG4gICdTa2VpbjEwMjQtMzkyJzogMHhiMzkxLFxuICAnU2tlaW4xMDI0LTQwMCc6IDB4YjM5MixcbiAgJ1NrZWluMTAyNC00MDgnOiAweGIzOTMsXG4gICdTa2VpbjEwMjQtNDE2JzogMHhiMzk0LFxuICAnU2tlaW4xMDI0LTQyNCc6IDB4YjM5NSxcbiAgJ1NrZWluMTAyNC00MzInOiAweGIzOTYsXG4gICdTa2VpbjEwMjQtNDQwJzogMHhiMzk3LFxuICAnU2tlaW4xMDI0LTQ0OCc6IDB4YjM5OCxcbiAgJ1NrZWluMTAyNC00NTYnOiAweGIzOTksXG4gICdTa2VpbjEwMjQtNDY0JzogMHhiMzlhLFxuICAnU2tlaW4xMDI0LTQ3Mic6IDB4YjM5YixcbiAgJ1NrZWluMTAyNC00ODAnOiAweGIzOWMsXG4gICdTa2VpbjEwMjQtNDg4JzogMHhiMzlkLFxuICAnU2tlaW4xMDI0LTQ5Nic6IDB4YjM5ZSxcbiAgJ1NrZWluMTAyNC01MDQnOiAweGIzOWYsXG4gICdTa2VpbjEwMjQtNTEyJzogMHhiM2EwLFxuICAnU2tlaW4xMDI0LTUyMCc6IDB4YjNhMSxcbiAgJ1NrZWluMTAyNC01MjgnOiAweGIzYTIsXG4gICdTa2VpbjEwMjQtNTM2JzogMHhiM2EzLFxuICAnU2tlaW4xMDI0LTU0NCc6IDB4YjNhNCxcbiAgJ1NrZWluMTAyNC01NTInOiAweGIzYTUsXG4gICdTa2VpbjEwMjQtNTYwJzogMHhiM2E2LFxuICAnU2tlaW4xMDI0LTU2OCc6IDB4YjNhNyxcbiAgJ1NrZWluMTAyNC01NzYnOiAweGIzYTgsXG4gICdTa2VpbjEwMjQtNTg0JzogMHhiM2E5LFxuICAnU2tlaW4xMDI0LTU5Mic6IDB4YjNhYSxcbiAgJ1NrZWluMTAyNC02MDAnOiAweGIzYWIsXG4gICdTa2VpbjEwMjQtNjA4JzogMHhiM2FjLFxuICAnU2tlaW4xMDI0LTYxNic6IDB4YjNhZCxcbiAgJ1NrZWluMTAyNC02MjQnOiAweGIzYWUsXG4gICdTa2VpbjEwMjQtNjMyJzogMHhiM2FmLFxuICAnU2tlaW4xMDI0LTY0MCc6IDB4YjNiMCxcbiAgJ1NrZWluMTAyNC02NDgnOiAweGIzYjEsXG4gICdTa2VpbjEwMjQtNjU2JzogMHhiM2IyLFxuICAnU2tlaW4xMDI0LTY2NCc6IDB4YjNiMyxcbiAgJ1NrZWluMTAyNC02NzInOiAweGIzYjQsXG4gICdTa2VpbjEwMjQtNjgwJzogMHhiM2I1LFxuICAnU2tlaW4xMDI0LTY4OCc6IDB4YjNiNixcbiAgJ1NrZWluMTAyNC02OTYnOiAweGIzYjcsXG4gICdTa2VpbjEwMjQtNzA0JzogMHhiM2I4LFxuICAnU2tlaW4xMDI0LTcxMic6IDB4YjNiOSxcbiAgJ1NrZWluMTAyNC03MjAnOiAweGIzYmEsXG4gICdTa2VpbjEwMjQtNzI4JzogMHhiM2JiLFxuICAnU2tlaW4xMDI0LTczNic6IDB4YjNiYyxcbiAgJ1NrZWluMTAyNC03NDQnOiAweGIzYmQsXG4gICdTa2VpbjEwMjQtNzUyJzogMHhiM2JlLFxuICAnU2tlaW4xMDI0LTc2MCc6IDB4YjNiZixcbiAgJ1NrZWluMTAyNC03NjgnOiAweGIzYzAsXG4gICdTa2VpbjEwMjQtNzc2JzogMHhiM2MxLFxuICAnU2tlaW4xMDI0LTc4NCc6IDB4YjNjMixcbiAgJ1NrZWluMTAyNC03OTInOiAweGIzYzMsXG4gICdTa2VpbjEwMjQtODAwJzogMHhiM2M0LFxuICAnU2tlaW4xMDI0LTgwOCc6IDB4YjNjNSxcbiAgJ1NrZWluMTAyNC04MTYnOiAweGIzYzYsXG4gICdTa2VpbjEwMjQtODI0JzogMHhiM2M3LFxuICAnU2tlaW4xMDI0LTgzMic6IDB4YjNjOCxcbiAgJ1NrZWluMTAyNC04NDAnOiAweGIzYzksXG4gICdTa2VpbjEwMjQtODQ4JzogMHhiM2NhLFxuICAnU2tlaW4xMDI0LTg1Nic6IDB4YjNjYixcbiAgJ1NrZWluMTAyNC04NjQnOiAweGIzY2MsXG4gICdTa2VpbjEwMjQtODcyJzogMHhiM2NkLFxuICAnU2tlaW4xMDI0LTg4MCc6IDB4YjNjZSxcbiAgJ1NrZWluMTAyNC04ODgnOiAweGIzY2YsXG4gICdTa2VpbjEwMjQtODk2JzogMHhiM2QwLFxuICAnU2tlaW4xMDI0LTkwNCc6IDB4YjNkMSxcbiAgJ1NrZWluMTAyNC05MTInOiAweGIzZDIsXG4gICdTa2VpbjEwMjQtOTIwJzogMHhiM2QzLFxuICAnU2tlaW4xMDI0LTkyOCc6IDB4YjNkNCxcbiAgJ1NrZWluMTAyNC05MzYnOiAweGIzZDUsXG4gICdTa2VpbjEwMjQtOTQ0JzogMHhiM2Q2LFxuICAnU2tlaW4xMDI0LTk1Mic6IDB4YjNkNyxcbiAgJ1NrZWluMTAyNC05NjAnOiAweGIzZDgsXG4gICdTa2VpbjEwMjQtOTY4JzogMHhiM2Q5LFxuICAnU2tlaW4xMDI0LTk3Nic6IDB4YjNkYSxcbiAgJ1NrZWluMTAyNC05ODQnOiAweGIzZGIsXG4gICdTa2VpbjEwMjQtOTkyJzogMHhiM2RjLFxuICAnU2tlaW4xMDI0LTEwMDAnOiAweGIzZGQsXG4gICdTa2VpbjEwMjQtMTAwOCc6IDB4YjNkZSxcbiAgJ1NrZWluMTAyNC0xMDE2JzogMHhiM2RmLFxuICAnU2tlaW4xMDI0LTEwMjQnOiAweGIzZTBcbn0pXG5cbmV4cG9ydHMuY29kZXMgPSBPYmplY3QuZnJlZXplKHtcbiAgMHgxMTogJ3NoYTEnLFxuICAweDEyOiAnc2hhMi0yNTYnLFxuICAweDEzOiAnc2hhMi01MTInLFxuICAweDU2OiAnZGJsLXNoYTItMjU2JyxcbiAgMHgxNzogJ3NoYTMtMjI0JyxcbiAgMHgxNjogJ3NoYTMtMjU2JyxcbiAgMHgxNTogJ3NoYTMtMzg0JyxcbiAgMHgxNDogJ3NoYTMtNTEyJyxcbiAgMHgxODogJ3NoYWtlLTEyOCcsXG4gIDB4MTk6ICdzaGFrZS0yNTYnLFxuICAweDFBOiAna2VjY2FrLTIyNCcsXG4gIDB4MUI6ICdrZWNjYWstMjU2JyxcbiAgMHgxQzogJ2tlY2Nhay0zODQnLFxuICAweDFEOiAna2VjY2FrLTUxMicsXG4gIDB4MjI6ICdtdXJtdXIzLTEyOCcsXG4gIDB4MjM6ICdtdXJtdXIzLTMyJyxcblxuICAvLyBibGFrZTJcbiAgMHhiMjAxOiAnYmxha2UyYi04JyxcbiAgMHhiMjAyOiAnYmxha2UyYi0xNicsXG4gIDB4YjIwMzogJ2JsYWtlMmItMjQnLFxuICAweGIyMDQ6ICdibGFrZTJiLTMyJyxcbiAgMHhiMjA1OiAnYmxha2UyYi00MCcsXG4gIDB4YjIwNjogJ2JsYWtlMmItNDgnLFxuICAweGIyMDc6ICdibGFrZTJiLTU2JyxcbiAgMHhiMjA4OiAnYmxha2UyYi02NCcsXG4gIDB4YjIwOTogJ2JsYWtlMmItNzInLFxuICAweGIyMGE6ICdibGFrZTJiLTgwJyxcbiAgMHhiMjBiOiAnYmxha2UyYi04OCcsXG4gIDB4YjIwYzogJ2JsYWtlMmItOTYnLFxuICAweGIyMGQ6ICdibGFrZTJiLTEwNCcsXG4gIDB4YjIwZTogJ2JsYWtlMmItMTEyJyxcbiAgMHhiMjBmOiAnYmxha2UyYi0xMjAnLFxuICAweGIyMTA6ICdibGFrZTJiLTEyOCcsXG4gIDB4YjIxMTogJ2JsYWtlMmItMTM2JyxcbiAgMHhiMjEyOiAnYmxha2UyYi0xNDQnLFxuICAweGIyMTM6ICdibGFrZTJiLTE1MicsXG4gIDB4YjIxNDogJ2JsYWtlMmItMTYwJyxcbiAgMHhiMjE1OiAnYmxha2UyYi0xNjgnLFxuICAweGIyMTY6ICdibGFrZTJiLTE3NicsXG4gIDB4YjIxNzogJ2JsYWtlMmItMTg0JyxcbiAgMHhiMjE4OiAnYmxha2UyYi0xOTInLFxuICAweGIyMTk6ICdibGFrZTJiLTIwMCcsXG4gIDB4YjIxYTogJ2JsYWtlMmItMjA4JyxcbiAgMHhiMjFiOiAnYmxha2UyYi0yMTYnLFxuICAweGIyMWM6ICdibGFrZTJiLTIyNCcsXG4gIDB4YjIxZDogJ2JsYWtlMmItMjMyJyxcbiAgMHhiMjFlOiAnYmxha2UyYi0yNDAnLFxuICAweGIyMWY6ICdibGFrZTJiLTI0OCcsXG4gIDB4YjIyMDogJ2JsYWtlMmItMjU2JyxcbiAgMHhiMjIxOiAnYmxha2UyYi0yNjQnLFxuICAweGIyMjI6ICdibGFrZTJiLTI3MicsXG4gIDB4YjIyMzogJ2JsYWtlMmItMjgwJyxcbiAgMHhiMjI0OiAnYmxha2UyYi0yODgnLFxuICAweGIyMjU6ICdibGFrZTJiLTI5NicsXG4gIDB4YjIyNjogJ2JsYWtlMmItMzA0JyxcbiAgMHhiMjI3OiAnYmxha2UyYi0zMTInLFxuICAweGIyMjg6ICdibGFrZTJiLTMyMCcsXG4gIDB4YjIyOTogJ2JsYWtlMmItMzI4JyxcbiAgMHhiMjJhOiAnYmxha2UyYi0zMzYnLFxuICAweGIyMmI6ICdibGFrZTJiLTM0NCcsXG4gIDB4YjIyYzogJ2JsYWtlMmItMzUyJyxcbiAgMHhiMjJkOiAnYmxha2UyYi0zNjAnLFxuICAweGIyMmU6ICdibGFrZTJiLTM2OCcsXG4gIDB4YjIyZjogJ2JsYWtlMmItMzc2JyxcbiAgMHhiMjMwOiAnYmxha2UyYi0zODQnLFxuICAweGIyMzE6ICdibGFrZTJiLTM5MicsXG4gIDB4YjIzMjogJ2JsYWtlMmItNDAwJyxcbiAgMHhiMjMzOiAnYmxha2UyYi00MDgnLFxuICAweGIyMzQ6ICdibGFrZTJiLTQxNicsXG4gIDB4YjIzNTogJ2JsYWtlMmItNDI0JyxcbiAgMHhiMjM2OiAnYmxha2UyYi00MzInLFxuICAweGIyMzc6ICdibGFrZTJiLTQ0MCcsXG4gIDB4YjIzODogJ2JsYWtlMmItNDQ4JyxcbiAgMHhiMjM5OiAnYmxha2UyYi00NTYnLFxuICAweGIyM2E6ICdibGFrZTJiLTQ2NCcsXG4gIDB4YjIzYjogJ2JsYWtlMmItNDcyJyxcbiAgMHhiMjNjOiAnYmxha2UyYi00ODAnLFxuICAweGIyM2Q6ICdibGFrZTJiLTQ4OCcsXG4gIDB4YjIzZTogJ2JsYWtlMmItNDk2JyxcbiAgMHhiMjNmOiAnYmxha2UyYi01MDQnLFxuICAweGIyNDA6ICdibGFrZTJiLTUxMicsXG4gIDB4YjI0MTogJ2JsYWtlMnMtOCcsXG4gIDB4YjI0MjogJ2JsYWtlMnMtMTYnLFxuICAweGIyNDM6ICdibGFrZTJzLTI0JyxcbiAgMHhiMjQ0OiAnYmxha2Uycy0zMicsXG4gIDB4YjI0NTogJ2JsYWtlMnMtNDAnLFxuICAweGIyNDY6ICdibGFrZTJzLTQ4JyxcbiAgMHhiMjQ3OiAnYmxha2Uycy01NicsXG4gIDB4YjI0ODogJ2JsYWtlMnMtNjQnLFxuICAweGIyNDk6ICdibGFrZTJzLTcyJyxcbiAgMHhiMjRhOiAnYmxha2Uycy04MCcsXG4gIDB4YjI0YjogJ2JsYWtlMnMtODgnLFxuICAweGIyNGM6ICdibGFrZTJzLTk2JyxcbiAgMHhiMjRkOiAnYmxha2Uycy0xMDQnLFxuICAweGIyNGU6ICdibGFrZTJzLTExMicsXG4gIDB4YjI0ZjogJ2JsYWtlMnMtMTIwJyxcbiAgMHhiMjUwOiAnYmxha2Uycy0xMjgnLFxuICAweGIyNTE6ICdibGFrZTJzLTEzNicsXG4gIDB4YjI1MjogJ2JsYWtlMnMtMTQ0JyxcbiAgMHhiMjUzOiAnYmxha2Uycy0xNTInLFxuICAweGIyNTQ6ICdibGFrZTJzLTE2MCcsXG4gIDB4YjI1NTogJ2JsYWtlMnMtMTY4JyxcbiAgMHhiMjU2OiAnYmxha2Uycy0xNzYnLFxuICAweGIyNTc6ICdibGFrZTJzLTE4NCcsXG4gIDB4YjI1ODogJ2JsYWtlMnMtMTkyJyxcbiAgMHhiMjU5OiAnYmxha2Uycy0yMDAnLFxuICAweGIyNWE6ICdibGFrZTJzLTIwOCcsXG4gIDB4YjI1YjogJ2JsYWtlMnMtMjE2JyxcbiAgMHhiMjVjOiAnYmxha2Uycy0yMjQnLFxuICAweGIyNWQ6ICdibGFrZTJzLTIzMicsXG4gIDB4YjI1ZTogJ2JsYWtlMnMtMjQwJyxcbiAgMHhiMjVmOiAnYmxha2Uycy0yNDgnLFxuICAweGIyNjA6ICdibGFrZTJzLTI1NicsXG5cbiAgLy8gc2tlaW5cbiAgMHhiMzAxOiAnU2tlaW4yNTYtOCcsXG4gIDB4YjMwMjogJ1NrZWluMjU2LTE2JyxcbiAgMHhiMzAzOiAnU2tlaW4yNTYtMjQnLFxuICAweGIzMDQ6ICdTa2VpbjI1Ni0zMicsXG4gIDB4YjMwNTogJ1NrZWluMjU2LTQwJyxcbiAgMHhiMzA2OiAnU2tlaW4yNTYtNDgnLFxuICAweGIzMDc6ICdTa2VpbjI1Ni01NicsXG4gIDB4YjMwODogJ1NrZWluMjU2LTY0JyxcbiAgMHhiMzA5OiAnU2tlaW4yNTYtNzInLFxuICAweGIzMGE6ICdTa2VpbjI1Ni04MCcsXG4gIDB4YjMwYjogJ1NrZWluMjU2LTg4JyxcbiAgMHhiMzBjOiAnU2tlaW4yNTYtOTYnLFxuICAweGIzMGQ6ICdTa2VpbjI1Ni0xMDQnLFxuICAweGIzMGU6ICdTa2VpbjI1Ni0xMTInLFxuICAweGIzMGY6ICdTa2VpbjI1Ni0xMjAnLFxuICAweGIzMTA6ICdTa2VpbjI1Ni0xMjgnLFxuICAweGIzMTE6ICdTa2VpbjI1Ni0xMzYnLFxuICAweGIzMTI6ICdTa2VpbjI1Ni0xNDQnLFxuICAweGIzMTM6ICdTa2VpbjI1Ni0xNTInLFxuICAweGIzMTQ6ICdTa2VpbjI1Ni0xNjAnLFxuICAweGIzMTU6ICdTa2VpbjI1Ni0xNjgnLFxuICAweGIzMTY6ICdTa2VpbjI1Ni0xNzYnLFxuICAweGIzMTc6ICdTa2VpbjI1Ni0xODQnLFxuICAweGIzMTg6ICdTa2VpbjI1Ni0xOTInLFxuICAweGIzMTk6ICdTa2VpbjI1Ni0yMDAnLFxuICAweGIzMWE6ICdTa2VpbjI1Ni0yMDgnLFxuICAweGIzMWI6ICdTa2VpbjI1Ni0yMTYnLFxuICAweGIzMWM6ICdTa2VpbjI1Ni0yMjQnLFxuICAweGIzMWQ6ICdTa2VpbjI1Ni0yMzInLFxuICAweGIzMWU6ICdTa2VpbjI1Ni0yNDAnLFxuICAweGIzMWY6ICdTa2VpbjI1Ni0yNDgnLFxuICAweGIzMjA6ICdTa2VpbjI1Ni0yNTYnLFxuICAweGIzMjE6ICdTa2VpbjUxMi04JyxcbiAgMHhiMzIyOiAnU2tlaW41MTItMTYnLFxuICAweGIzMjM6ICdTa2VpbjUxMi0yNCcsXG4gIDB4YjMyNDogJ1NrZWluNTEyLTMyJyxcbiAgMHhiMzI1OiAnU2tlaW41MTItNDAnLFxuICAweGIzMjY6ICdTa2VpbjUxMi00OCcsXG4gIDB4YjMyNzogJ1NrZWluNTEyLTU2JyxcbiAgMHhiMzI4OiAnU2tlaW41MTItNjQnLFxuICAweGIzMjk6ICdTa2VpbjUxMi03MicsXG4gIDB4YjMyYTogJ1NrZWluNTEyLTgwJyxcbiAgMHhiMzJiOiAnU2tlaW41MTItODgnLFxuICAweGIzMmM6ICdTa2VpbjUxMi05NicsXG4gIDB4YjMyZDogJ1NrZWluNTEyLTEwNCcsXG4gIDB4YjMyZTogJ1NrZWluNTEyLTExMicsXG4gIDB4YjMyZjogJ1NrZWluNTEyLTEyMCcsXG4gIDB4YjMzMDogJ1NrZWluNTEyLTEyOCcsXG4gIDB4YjMzMTogJ1NrZWluNTEyLTEzNicsXG4gIDB4YjMzMjogJ1NrZWluNTEyLTE0NCcsXG4gIDB4YjMzMzogJ1NrZWluNTEyLTE1MicsXG4gIDB4YjMzNDogJ1NrZWluNTEyLTE2MCcsXG4gIDB4YjMzNTogJ1NrZWluNTEyLTE2OCcsXG4gIDB4YjMzNjogJ1NrZWluNTEyLTE3NicsXG4gIDB4YjMzNzogJ1NrZWluNTEyLTE4NCcsXG4gIDB4YjMzODogJ1NrZWluNTEyLTE5MicsXG4gIDB4YjMzOTogJ1NrZWluNTEyLTIwMCcsXG4gIDB4YjMzYTogJ1NrZWluNTEyLTIwOCcsXG4gIDB4YjMzYjogJ1NrZWluNTEyLTIxNicsXG4gIDB4YjMzYzogJ1NrZWluNTEyLTIyNCcsXG4gIDB4YjMzZDogJ1NrZWluNTEyLTIzMicsXG4gIDB4YjMzZTogJ1NrZWluNTEyLTI0MCcsXG4gIDB4YjMzZjogJ1NrZWluNTEyLTI0OCcsXG4gIDB4YjM0MDogJ1NrZWluNTEyLTI1NicsXG4gIDB4YjM0MTogJ1NrZWluNTEyLTI2NCcsXG4gIDB4YjM0MjogJ1NrZWluNTEyLTI3MicsXG4gIDB4YjM0MzogJ1NrZWluNTEyLTI4MCcsXG4gIDB4YjM0NDogJ1NrZWluNTEyLTI4OCcsXG4gIDB4YjM0NTogJ1NrZWluNTEyLTI5NicsXG4gIDB4YjM0NjogJ1NrZWluNTEyLTMwNCcsXG4gIDB4YjM0NzogJ1NrZWluNTEyLTMxMicsXG4gIDB4YjM0ODogJ1NrZWluNTEyLTMyMCcsXG4gIDB4YjM0OTogJ1NrZWluNTEyLTMyOCcsXG4gIDB4YjM0YTogJ1NrZWluNTEyLTMzNicsXG4gIDB4YjM0YjogJ1NrZWluNTEyLTM0NCcsXG4gIDB4YjM0YzogJ1NrZWluNTEyLTM1MicsXG4gIDB4YjM0ZDogJ1NrZWluNTEyLTM2MCcsXG4gIDB4YjM0ZTogJ1NrZWluNTEyLTM2OCcsXG4gIDB4YjM0ZjogJ1NrZWluNTEyLTM3NicsXG4gIDB4YjM1MDogJ1NrZWluNTEyLTM4NCcsXG4gIDB4YjM1MTogJ1NrZWluNTEyLTM5MicsXG4gIDB4YjM1MjogJ1NrZWluNTEyLTQwMCcsXG4gIDB4YjM1MzogJ1NrZWluNTEyLTQwOCcsXG4gIDB4YjM1NDogJ1NrZWluNTEyLTQxNicsXG4gIDB4YjM1NTogJ1NrZWluNTEyLTQyNCcsXG4gIDB4YjM1NjogJ1NrZWluNTEyLTQzMicsXG4gIDB4YjM1NzogJ1NrZWluNTEyLTQ0MCcsXG4gIDB4YjM1ODogJ1NrZWluNTEyLTQ0OCcsXG4gIDB4YjM1OTogJ1NrZWluNTEyLTQ1NicsXG4gIDB4YjM1YTogJ1NrZWluNTEyLTQ2NCcsXG4gIDB4YjM1YjogJ1NrZWluNTEyLTQ3MicsXG4gIDB4YjM1YzogJ1NrZWluNTEyLTQ4MCcsXG4gIDB4YjM1ZDogJ1NrZWluNTEyLTQ4OCcsXG4gIDB4YjM1ZTogJ1NrZWluNTEyLTQ5NicsXG4gIDB4YjM1ZjogJ1NrZWluNTEyLTUwNCcsXG4gIDB4YjM2MDogJ1NrZWluNTEyLTUxMicsXG4gIDB4YjM2MTogJ1NrZWluMTAyNC04JyxcbiAgMHhiMzYyOiAnU2tlaW4xMDI0LTE2JyxcbiAgMHhiMzYzOiAnU2tlaW4xMDI0LTI0JyxcbiAgMHhiMzY0OiAnU2tlaW4xMDI0LTMyJyxcbiAgMHhiMzY1OiAnU2tlaW4xMDI0LTQwJyxcbiAgMHhiMzY2OiAnU2tlaW4xMDI0LTQ4JyxcbiAgMHhiMzY3OiAnU2tlaW4xMDI0LTU2JyxcbiAgMHhiMzY4OiAnU2tlaW4xMDI0LTY0JyxcbiAgMHhiMzY5OiAnU2tlaW4xMDI0LTcyJyxcbiAgMHhiMzZhOiAnU2tlaW4xMDI0LTgwJyxcbiAgMHhiMzZiOiAnU2tlaW4xMDI0LTg4JyxcbiAgMHhiMzZjOiAnU2tlaW4xMDI0LTk2JyxcbiAgMHhiMzZkOiAnU2tlaW4xMDI0LTEwNCcsXG4gIDB4YjM2ZTogJ1NrZWluMTAyNC0xMTInLFxuICAweGIzNmY6ICdTa2VpbjEwMjQtMTIwJyxcbiAgMHhiMzcwOiAnU2tlaW4xMDI0LTEyOCcsXG4gIDB4YjM3MTogJ1NrZWluMTAyNC0xMzYnLFxuICAweGIzNzI6ICdTa2VpbjEwMjQtMTQ0JyxcbiAgMHhiMzczOiAnU2tlaW4xMDI0LTE1MicsXG4gIDB4YjM3NDogJ1NrZWluMTAyNC0xNjAnLFxuICAweGIzNzU6ICdTa2VpbjEwMjQtMTY4JyxcbiAgMHhiMzc2OiAnU2tlaW4xMDI0LTE3NicsXG4gIDB4YjM3NzogJ1NrZWluMTAyNC0xODQnLFxuICAweGIzNzg6ICdTa2VpbjEwMjQtMTkyJyxcbiAgMHhiMzc5OiAnU2tlaW4xMDI0LTIwMCcsXG4gIDB4YjM3YTogJ1NrZWluMTAyNC0yMDgnLFxuICAweGIzN2I6ICdTa2VpbjEwMjQtMjE2JyxcbiAgMHhiMzdjOiAnU2tlaW4xMDI0LTIyNCcsXG4gIDB4YjM3ZDogJ1NrZWluMTAyNC0yMzInLFxuICAweGIzN2U6ICdTa2VpbjEwMjQtMjQwJyxcbiAgMHhiMzdmOiAnU2tlaW4xMDI0LTI0OCcsXG4gIDB4YjM4MDogJ1NrZWluMTAyNC0yNTYnLFxuICAweGIzODE6ICdTa2VpbjEwMjQtMjY0JyxcbiAgMHhiMzgyOiAnU2tlaW4xMDI0LTI3MicsXG4gIDB4YjM4MzogJ1NrZWluMTAyNC0yODAnLFxuICAweGIzODQ6ICdTa2VpbjEwMjQtMjg4JyxcbiAgMHhiMzg1OiAnU2tlaW4xMDI0LTI5NicsXG4gIDB4YjM4NjogJ1NrZWluMTAyNC0zMDQnLFxuICAweGIzODc6ICdTa2VpbjEwMjQtMzEyJyxcbiAgMHhiMzg4OiAnU2tlaW4xMDI0LTMyMCcsXG4gIDB4YjM4OTogJ1NrZWluMTAyNC0zMjgnLFxuICAweGIzOGE6ICdTa2VpbjEwMjQtMzM2JyxcbiAgMHhiMzhiOiAnU2tlaW4xMDI0LTM0NCcsXG4gIDB4YjM4YzogJ1NrZWluMTAyNC0zNTInLFxuICAweGIzOGQ6ICdTa2VpbjEwMjQtMzYwJyxcbiAgMHhiMzhlOiAnU2tlaW4xMDI0LTM2OCcsXG4gIDB4YjM4ZjogJ1NrZWluMTAyNC0zNzYnLFxuICAweGIzOTA6ICdTa2VpbjEwMjQtMzg0JyxcbiAgMHhiMzkxOiAnU2tlaW4xMDI0LTM5MicsXG4gIDB4YjM5MjogJ1NrZWluMTAyNC00MDAnLFxuICAweGIzOTM6ICdTa2VpbjEwMjQtNDA4JyxcbiAgMHhiMzk0OiAnU2tlaW4xMDI0LTQxNicsXG4gIDB4YjM5NTogJ1NrZWluMTAyNC00MjQnLFxuICAweGIzOTY6ICdTa2VpbjEwMjQtNDMyJyxcbiAgMHhiMzk3OiAnU2tlaW4xMDI0LTQ0MCcsXG4gIDB4YjM5ODogJ1NrZWluMTAyNC00NDgnLFxuICAweGIzOTk6ICdTa2VpbjEwMjQtNDU2JyxcbiAgMHhiMzlhOiAnU2tlaW4xMDI0LTQ2NCcsXG4gIDB4YjM5YjogJ1NrZWluMTAyNC00NzInLFxuICAweGIzOWM6ICdTa2VpbjEwMjQtNDgwJyxcbiAgMHhiMzlkOiAnU2tlaW4xMDI0LTQ4OCcsXG4gIDB4YjM5ZTogJ1NrZWluMTAyNC00OTYnLFxuICAweGIzOWY6ICdTa2VpbjEwMjQtNTA0JyxcbiAgMHhiM2EwOiAnU2tlaW4xMDI0LTUxMicsXG4gIDB4YjNhMTogJ1NrZWluMTAyNC01MjAnLFxuICAweGIzYTI6ICdTa2VpbjEwMjQtNTI4JyxcbiAgMHhiM2EzOiAnU2tlaW4xMDI0LTUzNicsXG4gIDB4YjNhNDogJ1NrZWluMTAyNC01NDQnLFxuICAweGIzYTU6ICdTa2VpbjEwMjQtNTUyJyxcbiAgMHhiM2E2OiAnU2tlaW4xMDI0LTU2MCcsXG4gIDB4YjNhNzogJ1NrZWluMTAyNC01NjgnLFxuICAweGIzYTg6ICdTa2VpbjEwMjQtNTc2JyxcbiAgMHhiM2E5OiAnU2tlaW4xMDI0LTU4NCcsXG4gIDB4YjNhYTogJ1NrZWluMTAyNC01OTInLFxuICAweGIzYWI6ICdTa2VpbjEwMjQtNjAwJyxcbiAgMHhiM2FjOiAnU2tlaW4xMDI0LTYwOCcsXG4gIDB4YjNhZDogJ1NrZWluMTAyNC02MTYnLFxuICAweGIzYWU6ICdTa2VpbjEwMjQtNjI0JyxcbiAgMHhiM2FmOiAnU2tlaW4xMDI0LTYzMicsXG4gIDB4YjNiMDogJ1NrZWluMTAyNC02NDAnLFxuICAweGIzYjE6ICdTa2VpbjEwMjQtNjQ4JyxcbiAgMHhiM2IyOiAnU2tlaW4xMDI0LTY1NicsXG4gIDB4YjNiMzogJ1NrZWluMTAyNC02NjQnLFxuICAweGIzYjQ6ICdTa2VpbjEwMjQtNjcyJyxcbiAgMHhiM2I1OiAnU2tlaW4xMDI0LTY4MCcsXG4gIDB4YjNiNjogJ1NrZWluMTAyNC02ODgnLFxuICAweGIzYjc6ICdTa2VpbjEwMjQtNjk2JyxcbiAgMHhiM2I4OiAnU2tlaW4xMDI0LTcwNCcsXG4gIDB4YjNiOTogJ1NrZWluMTAyNC03MTInLFxuICAweGIzYmE6ICdTa2VpbjEwMjQtNzIwJyxcbiAgMHhiM2JiOiAnU2tlaW4xMDI0LTcyOCcsXG4gIDB4YjNiYzogJ1NrZWluMTAyNC03MzYnLFxuICAweGIzYmQ6ICdTa2VpbjEwMjQtNzQ0JyxcbiAgMHhiM2JlOiAnU2tlaW4xMDI0LTc1MicsXG4gIDB4YjNiZjogJ1NrZWluMTAyNC03NjAnLFxuICAweGIzYzA6ICdTa2VpbjEwMjQtNzY4JyxcbiAgMHhiM2MxOiAnU2tlaW4xMDI0LTc3NicsXG4gIDB4YjNjMjogJ1NrZWluMTAyNC03ODQnLFxuICAweGIzYzM6ICdTa2VpbjEwMjQtNzkyJyxcbiAgMHhiM2M0OiAnU2tlaW4xMDI0LTgwMCcsXG4gIDB4YjNjNTogJ1NrZWluMTAyNC04MDgnLFxuICAweGIzYzY6ICdTa2VpbjEwMjQtODE2JyxcbiAgMHhiM2M3OiAnU2tlaW4xMDI0LTgyNCcsXG4gIDB4YjNjODogJ1NrZWluMTAyNC04MzInLFxuICAweGIzYzk6ICdTa2VpbjEwMjQtODQwJyxcbiAgMHhiM2NhOiAnU2tlaW4xMDI0LTg0OCcsXG4gIDB4YjNjYjogJ1NrZWluMTAyNC04NTYnLFxuICAweGIzY2M6ICdTa2VpbjEwMjQtODY0JyxcbiAgMHhiM2NkOiAnU2tlaW4xMDI0LTg3MicsXG4gIDB4YjNjZTogJ1NrZWluMTAyNC04ODAnLFxuICAweGIzY2Y6ICdTa2VpbjEwMjQtODg4JyxcbiAgMHhiM2QwOiAnU2tlaW4xMDI0LTg5NicsXG4gIDB4YjNkMTogJ1NrZWluMTAyNC05MDQnLFxuICAweGIzZDI6ICdTa2VpbjEwMjQtOTEyJyxcbiAgMHhiM2QzOiAnU2tlaW4xMDI0LTkyMCcsXG4gIDB4YjNkNDogJ1NrZWluMTAyNC05MjgnLFxuICAweGIzZDU6ICdTa2VpbjEwMjQtOTM2JyxcbiAgMHhiM2Q2OiAnU2tlaW4xMDI0LTk0NCcsXG4gIDB4YjNkNzogJ1NrZWluMTAyNC05NTInLFxuICAweGIzZDg6ICdTa2VpbjEwMjQtOTYwJyxcbiAgMHhiM2Q5OiAnU2tlaW4xMDI0LTk2OCcsXG4gIDB4YjNkYTogJ1NrZWluMTAyNC05NzYnLFxuICAweGIzZGI6ICdTa2VpbjEwMjQtOTg0JyxcbiAgMHhiM2RjOiAnU2tlaW4xMDI0LTk5MicsXG4gIDB4YjNkZDogJ1NrZWluMTAyNC0xMDAwJyxcbiAgMHhiM2RlOiAnU2tlaW4xMDI0LTEwMDgnLFxuICAweGIzZGY6ICdTa2VpbjEwMjQtMTAxNicsXG4gIDB4YjNlMDogJ1NrZWluMTAyNC0xMDI0J1xufSlcblxuZXhwb3J0cy5kZWZhdWx0TGVuZ3RocyA9IE9iamVjdC5mcmVlemUoe1xuICAweDExOiAyMCxcbiAgMHgxMjogMzIsXG4gIDB4MTM6IDY0LFxuICAweDU2OiAzMixcbiAgMHgxNzogMjgsXG4gIDB4MTY6IDMyLFxuICAweDE1OiA0OCxcbiAgMHgxNDogNjQsXG4gIDB4MTg6IDMyLFxuICAweDE5OiA2NCxcbiAgMHgxQTogMjgsXG4gIDB4MUI6IDMyLFxuICAweDFDOiA0OCxcbiAgMHgxRDogNjQsXG4gIDB4MjI6IDMyLFxuXG4gIDB4YjIwMTogMHgwMSxcbiAgMHhiMjAyOiAweDAyLFxuICAweGIyMDM6IDB4MDMsXG4gIDB4YjIwNDogMHgwNCxcbiAgMHhiMjA1OiAweDA1LFxuICAweGIyMDY6IDB4MDYsXG4gIDB4YjIwNzogMHgwNyxcbiAgMHhiMjA4OiAweDA4LFxuICAweGIyMDk6IDB4MDksXG4gIDB4YjIwYTogMHgwYSxcbiAgMHhiMjBiOiAweDBiLFxuICAweGIyMGM6IDB4MGMsXG4gIDB4YjIwZDogMHgwZCxcbiAgMHhiMjBlOiAweDBlLFxuICAweGIyMGY6IDB4MGYsXG4gIDB4YjIxMDogMHgxMCxcbiAgMHhiMjExOiAweDExLFxuICAweGIyMTI6IDB4MTIsXG4gIDB4YjIxMzogMHgxMyxcbiAgMHhiMjE0OiAweDE0LFxuICAweGIyMTU6IDB4MTUsXG4gIDB4YjIxNjogMHgxNixcbiAgMHhiMjE3OiAweDE3LFxuICAweGIyMTg6IDB4MTgsXG4gIDB4YjIxOTogMHgxOSxcbiAgMHhiMjFhOiAweDFhLFxuICAweGIyMWI6IDB4MWIsXG4gIDB4YjIxYzogMHgxYyxcbiAgMHhiMjFkOiAweDFkLFxuICAweGIyMWU6IDB4MWUsXG4gIDB4YjIxZjogMHgxZixcbiAgMHhiMjIwOiAweDIwLFxuICAweGIyMjE6IDB4MjEsXG4gIDB4YjIyMjogMHgyMixcbiAgMHhiMjIzOiAweDIzLFxuICAweGIyMjQ6IDB4MjQsXG4gIDB4YjIyNTogMHgyNSxcbiAgMHhiMjI2OiAweDI2LFxuICAweGIyMjc6IDB4MjcsXG4gIDB4YjIyODogMHgyOCxcbiAgMHhiMjI5OiAweDI5LFxuICAweGIyMmE6IDB4MmEsXG4gIDB4YjIyYjogMHgyYixcbiAgMHhiMjJjOiAweDJjLFxuICAweGIyMmQ6IDB4MmQsXG4gIDB4YjIyZTogMHgyZSxcbiAgMHhiMjJmOiAweDJmLFxuICAweGIyMzA6IDB4MzAsXG4gIDB4YjIzMTogMHgzMSxcbiAgMHhiMjMyOiAweDMyLFxuICAweGIyMzM6IDB4MzMsXG4gIDB4YjIzNDogMHgzNCxcbiAgMHhiMjM1OiAweDM1LFxuICAweGIyMzY6IDB4MzYsXG4gIDB4YjIzNzogMHgzNyxcbiAgMHhiMjM4OiAweDM4LFxuICAweGIyMzk6IDB4MzksXG4gIDB4YjIzYTogMHgzYSxcbiAgMHhiMjNiOiAweDNiLFxuICAweGIyM2M6IDB4M2MsXG4gIDB4YjIzZDogMHgzZCxcbiAgMHhiMjNlOiAweDNlLFxuICAweGIyM2Y6IDB4M2YsXG4gIDB4YjI0MDogMHg0MCxcbiAgMHhiMjQxOiAweDAxLFxuICAweGIyNDI6IDB4MDIsXG4gIDB4YjI0MzogMHgwMyxcbiAgMHhiMjQ0OiAweDA0LFxuICAweGIyNDU6IDB4MDUsXG4gIDB4YjI0NjogMHgwNixcbiAgMHhiMjQ3OiAweDA3LFxuICAweGIyNDg6IDB4MDgsXG4gIDB4YjI0OTogMHgwOSxcbiAgMHhiMjRhOiAweDBhLFxuICAweGIyNGI6IDB4MGIsXG4gIDB4YjI0YzogMHgwYyxcbiAgMHhiMjRkOiAweDBkLFxuICAweGIyNGU6IDB4MGUsXG4gIDB4YjI0ZjogMHgwZixcbiAgMHhiMjUwOiAweDEwLFxuICAweGIyNTE6IDB4MTEsXG4gIDB4YjI1MjogMHgxMixcbiAgMHhiMjUzOiAweDEzLFxuICAweGIyNTQ6IDB4MTQsXG4gIDB4YjI1NTogMHgxNSxcbiAgMHhiMjU2OiAweDE2LFxuICAweGIyNTc6IDB4MTcsXG4gIDB4YjI1ODogMHgxOCxcbiAgMHhiMjU5OiAweDE5LFxuICAweGIyNWE6IDB4MWEsXG4gIDB4YjI1YjogMHgxYixcbiAgMHhiMjVjOiAweDFjLFxuICAweGIyNWQ6IDB4MWQsXG4gIDB4YjI1ZTogMHgxZSxcbiAgMHhiMjVmOiAweDFmLFxuICAweGIyNjA6IDB4MjAsXG4gIDB4YjMwMTogMHgwMSxcbiAgMHhiMzAyOiAweDAyLFxuICAweGIzMDM6IDB4MDMsXG4gIDB4YjMwNDogMHgwNCxcbiAgMHhiMzA1OiAweDA1LFxuICAweGIzMDY6IDB4MDYsXG4gIDB4YjMwNzogMHgwNyxcbiAgMHhiMzA4OiAweDA4LFxuICAweGIzMDk6IDB4MDksXG4gIDB4YjMwYTogMHgwYSxcbiAgMHhiMzBiOiAweDBiLFxuICAweGIzMGM6IDB4MGMsXG4gIDB4YjMwZDogMHgwZCxcbiAgMHhiMzBlOiAweDBlLFxuICAweGIzMGY6IDB4MGYsXG4gIDB4YjMxMDogMHgxMCxcbiAgMHhiMzExOiAweDExLFxuICAweGIzMTI6IDB4MTIsXG4gIDB4YjMxMzogMHgxMyxcbiAgMHhiMzE0OiAweDE0LFxuICAweGIzMTU6IDB4MTUsXG4gIDB4YjMxNjogMHgxNixcbiAgMHhiMzE3OiAweDE3LFxuICAweGIzMTg6IDB4MTgsXG4gIDB4YjMxOTogMHgxOSxcbiAgMHhiMzFhOiAweDFhLFxuICAweGIzMWI6IDB4MWIsXG4gIDB4YjMxYzogMHgxYyxcbiAgMHhiMzFkOiAweDFkLFxuICAweGIzMWU6IDB4MWUsXG4gIDB4YjMxZjogMHgxZixcbiAgMHhiMzIwOiAweDIwLFxuICAweGIzMjE6IDB4MDEsXG4gIDB4YjMyMjogMHgwMixcbiAgMHhiMzIzOiAweDAzLFxuICAweGIzMjQ6IDB4MDQsXG4gIDB4YjMyNTogMHgwNSxcbiAgMHhiMzI2OiAweDA2LFxuICAweGIzMjc6IDB4MDcsXG4gIDB4YjMyODogMHgwOCxcbiAgMHhiMzI5OiAweDA5LFxuICAweGIzMmE6IDB4MGEsXG4gIDB4YjMyYjogMHgwYixcbiAgMHhiMzJjOiAweDBjLFxuICAweGIzMmQ6IDB4MGQsXG4gIDB4YjMyZTogMHgwZSxcbiAgMHhiMzJmOiAweDBmLFxuICAweGIzMzA6IDB4MTAsXG4gIDB4YjMzMTogMHgxMSxcbiAgMHhiMzMyOiAweDEyLFxuICAweGIzMzM6IDB4MTMsXG4gIDB4YjMzNDogMHgxNCxcbiAgMHhiMzM1OiAweDE1LFxuICAweGIzMzY6IDB4MTYsXG4gIDB4YjMzNzogMHgxNyxcbiAgMHhiMzM4OiAweDE4LFxuICAweGIzMzk6IDB4MTksXG4gIDB4YjMzYTogMHgxYSxcbiAgMHhiMzNiOiAweDFiLFxuICAweGIzM2M6IDB4MWMsXG4gIDB4YjMzZDogMHgxZCxcbiAgMHhiMzNlOiAweDFlLFxuICAweGIzM2Y6IDB4MWYsXG4gIDB4YjM0MDogMHgyMCxcbiAgMHhiMzQxOiAweDIxLFxuICAweGIzNDI6IDB4MjIsXG4gIDB4YjM0MzogMHgyMyxcbiAgMHhiMzQ0OiAweDI0LFxuICAweGIzNDU6IDB4MjUsXG4gIDB4YjM0NjogMHgyNixcbiAgMHhiMzQ3OiAweDI3LFxuICAweGIzNDg6IDB4MjgsXG4gIDB4YjM0OTogMHgyOSxcbiAgMHhiMzRhOiAweDJhLFxuICAweGIzNGI6IDB4MmIsXG4gIDB4YjM0YzogMHgyYyxcbiAgMHhiMzRkOiAweDJkLFxuICAweGIzNGU6IDB4MmUsXG4gIDB4YjM0ZjogMHgyZixcbiAgMHhiMzUwOiAweDMwLFxuICAweGIzNTE6IDB4MzEsXG4gIDB4YjM1MjogMHgzMixcbiAgMHhiMzUzOiAweDMzLFxuICAweGIzNTQ6IDB4MzQsXG4gIDB4YjM1NTogMHgzNSxcbiAgMHhiMzU2OiAweDM2LFxuICAweGIzNTc6IDB4MzcsXG4gIDB4YjM1ODogMHgzOCxcbiAgMHhiMzU5OiAweDM5LFxuICAweGIzNWE6IDB4M2EsXG4gIDB4YjM1YjogMHgzYixcbiAgMHhiMzVjOiAweDNjLFxuICAweGIzNWQ6IDB4M2QsXG4gIDB4YjM1ZTogMHgzZSxcbiAgMHhiMzVmOiAweDNmLFxuICAweGIzNjA6IDB4NDAsXG4gIDB4YjM2MTogMHgwMSxcbiAgMHhiMzYyOiAweDAyLFxuICAweGIzNjM6IDB4MDMsXG4gIDB4YjM2NDogMHgwNCxcbiAgMHhiMzY1OiAweDA1LFxuICAweGIzNjY6IDB4MDYsXG4gIDB4YjM2NzogMHgwNyxcbiAgMHhiMzY4OiAweDA4LFxuICAweGIzNjk6IDB4MDksXG4gIDB4YjM2YTogMHgwYSxcbiAgMHhiMzZiOiAweDBiLFxuICAweGIzNmM6IDB4MGMsXG4gIDB4YjM2ZDogMHgwZCxcbiAgMHhiMzZlOiAweDBlLFxuICAweGIzNmY6IDB4MGYsXG4gIDB4YjM3MDogMHgxMCxcbiAgMHhiMzcxOiAweDExLFxuICAweGIzNzI6IDB4MTIsXG4gIDB4YjM3MzogMHgxMyxcbiAgMHhiMzc0OiAweDE0LFxuICAweGIzNzU6IDB4MTUsXG4gIDB4YjM3NjogMHgxNixcbiAgMHhiMzc3OiAweDE3LFxuICAweGIzNzg6IDB4MTgsXG4gIDB4YjM3OTogMHgxOSxcbiAgMHhiMzdhOiAweDFhLFxuICAweGIzN2I6IDB4MWIsXG4gIDB4YjM3YzogMHgxYyxcbiAgMHhiMzdkOiAweDFkLFxuICAweGIzN2U6IDB4MWUsXG4gIDB4YjM3ZjogMHgxZixcbiAgMHhiMzgwOiAweDIwLFxuICAweGIzODE6IDB4MjEsXG4gIDB4YjM4MjogMHgyMixcbiAgMHhiMzgzOiAweDIzLFxuICAweGIzODQ6IDB4MjQsXG4gIDB4YjM4NTogMHgyNSxcbiAgMHhiMzg2OiAweDI2LFxuICAweGIzODc6IDB4MjcsXG4gIDB4YjM4ODogMHgyOCxcbiAgMHhiMzg5OiAweDI5LFxuICAweGIzOGE6IDB4MmEsXG4gIDB4YjM4YjogMHgyYixcbiAgMHhiMzhjOiAweDJjLFxuICAweGIzOGQ6IDB4MmQsXG4gIDB4YjM4ZTogMHgyZSxcbiAgMHhiMzhmOiAweDJmLFxuICAweGIzOTA6IDB4MzAsXG4gIDB4YjM5MTogMHgzMSxcbiAgMHhiMzkyOiAweDMyLFxuICAweGIzOTM6IDB4MzMsXG4gIDB4YjM5NDogMHgzNCxcbiAgMHhiMzk1OiAweDM1LFxuICAweGIzOTY6IDB4MzYsXG4gIDB4YjM5NzogMHgzNyxcbiAgMHhiMzk4OiAweDM4LFxuICAweGIzOTk6IDB4MzksXG4gIDB4YjM5YTogMHgzYSxcbiAgMHhiMzliOiAweDNiLFxuICAweGIzOWM6IDB4M2MsXG4gIDB4YjM5ZDogMHgzZCxcbiAgMHhiMzllOiAweDNlLFxuICAweGIzOWY6IDB4M2YsXG4gIDB4YjNhMDogMHg0MCxcbiAgMHhiM2ExOiAweDQxLFxuICAweGIzYTI6IDB4NDIsXG4gIDB4YjNhMzogMHg0MyxcbiAgMHhiM2E0OiAweDQ0LFxuICAweGIzYTU6IDB4NDUsXG4gIDB4YjNhNjogMHg0NixcbiAgMHhiM2E3OiAweDQ3LFxuICAweGIzYTg6IDB4NDgsXG4gIDB4YjNhOTogMHg0OSxcbiAgMHhiM2FhOiAweDRhLFxuICAweGIzYWI6IDB4NGIsXG4gIDB4YjNhYzogMHg0YyxcbiAgMHhiM2FkOiAweDRkLFxuICAweGIzYWU6IDB4NGUsXG4gIDB4YjNhZjogMHg0ZixcbiAgMHhiM2IwOiAweDUwLFxuICAweGIzYjE6IDB4NTEsXG4gIDB4YjNiMjogMHg1MixcbiAgMHhiM2IzOiAweDUzLFxuICAweGIzYjQ6IDB4NTQsXG4gIDB4YjNiNTogMHg1NSxcbiAgMHhiM2I2OiAweDU2LFxuICAweGIzYjc6IDB4NTcsXG4gIDB4YjNiODogMHg1OCxcbiAgMHhiM2I5OiAweDU5LFxuICAweGIzYmE6IDB4NWEsXG4gIDB4YjNiYjogMHg1YixcbiAgMHhiM2JjOiAweDVjLFxuICAweGIzYmQ6IDB4NWQsXG4gIDB4YjNiZTogMHg1ZSxcbiAgMHhiM2JmOiAweDVmLFxuICAweGIzYzA6IDB4NjAsXG4gIDB4YjNjMTogMHg2MSxcbiAgMHhiM2MyOiAweDYyLFxuICAweGIzYzM6IDB4NjMsXG4gIDB4YjNjNDogMHg2NCxcbiAgMHhiM2M1OiAweDY1LFxuICAweGIzYzY6IDB4NjYsXG4gIDB4YjNjNzogMHg2NyxcbiAgMHhiM2M4OiAweDY4LFxuICAweGIzYzk6IDB4NjksXG4gIDB4YjNjYTogMHg2YSxcbiAgMHhiM2NiOiAweDZiLFxuICAweGIzY2M6IDB4NmMsXG4gIDB4YjNjZDogMHg2ZCxcbiAgMHhiM2NlOiAweDZlLFxuICAweGIzY2Y6IDB4NmYsXG4gIDB4YjNkMDogMHg3MCxcbiAgMHhiM2QxOiAweDcxLFxuICAweGIzZDI6IDB4NzIsXG4gIDB4YjNkMzogMHg3MyxcbiAgMHhiM2Q0OiAweDc0LFxuICAweGIzZDU6IDB4NzUsXG4gIDB4YjNkNjogMHg3NixcbiAgMHhiM2Q3OiAweDc3LFxuICAweGIzZDg6IDB4NzgsXG4gIDB4YjNkOTogMHg3OSxcbiAgMHhiM2RhOiAweDdhLFxuICAweGIzZGI6IDB4N2IsXG4gIDB4YjNkYzogMHg3YyxcbiAgMHhiM2RkOiAweDdkLFxuICAweGIzZGU6IDB4N2UsXG4gIDB4YjNkZjogMHg3ZixcbiAgMHhiM2UwOiAweDgwXG59KVxuIiwiLyoqXG4gKiBNdWx0aWhhc2ggaW1wbGVtZW50YXRpb24gaW4gSmF2YVNjcmlwdC5cbiAqXG4gKiBAbW9kdWxlIG11bHRpaGFzaFxuICovXG4ndXNlIHN0cmljdCdcblxuY29uc3QgYnM1OCA9IHJlcXVpcmUoJ2JzNTgnKVxuXG5jb25zdCBjcyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcblxuZXhwb3J0cy5uYW1lcyA9IGNzLm5hbWVzXG5leHBvcnRzLmNvZGVzID0gY3MuY29kZXNcbmV4cG9ydHMuZGVmYXVsdExlbmd0aHMgPSBjcy5kZWZhdWx0TGVuZ3Roc1xuXG5jb25zdCB2YXJpbnQgPSByZXF1aXJlKCd2YXJpbnQnKVxuXG4vKipcbiAqIENvbnZlcnQgdGhlIGdpdmVuIG11bHRpaGFzaCB0byBhIGhleCBlbmNvZGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gaGFzaFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0cy50b0hleFN0cmluZyA9IGZ1bmN0aW9uIHRvSGV4U3RyaW5nIChoYXNoKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGhhc2gpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdXN0IGJlIHBhc3NlZCBhIGJ1ZmZlcicpXG4gIH1cblxuICByZXR1cm4gaGFzaC50b1N0cmluZygnaGV4Jylcbn1cblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBoZXggZW5jb2RlZCBzdHJpbmcgdG8gYSBtdWx0aWhhc2guXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAqIEByZXR1cm5zIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMuZnJvbUhleFN0cmluZyA9IGZ1bmN0aW9uIGZyb21IZXhTdHJpbmcgKGhhc2gpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGhhc2gsICdoZXgnKVxufVxuXG4vKipcbiAqIENvbnZlcnQgdGhlIGdpdmVuIG11bHRpaGFzaCB0byBhIGJhc2U1OCBlbmNvZGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gaGFzaFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0cy50b0I1OFN0cmluZyA9IGZ1bmN0aW9uIHRvQjU4U3RyaW5nIChoYXNoKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGhhc2gpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdXN0IGJlIHBhc3NlZCBhIGJ1ZmZlcicpXG4gIH1cblxuICByZXR1cm4gYnM1OC5lbmNvZGUoaGFzaClcbn1cblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBiYXNlNTggZW5jb2RlZCBzdHJpbmcgdG8gYSBtdWx0aWhhc2guXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8QnVmZmVyfSBoYXNoXG4gKiBAcmV0dXJucyB7QnVmZmVyfVxuICovXG5leHBvcnRzLmZyb21CNThTdHJpbmcgPSBmdW5jdGlvbiBmcm9tQjU4U3RyaW5nIChoYXNoKSB7XG4gIGxldCBlbmNvZGVkID0gaGFzaFxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGhhc2gpKSB7XG4gICAgZW5jb2RlZCA9IGhhc2gudG9TdHJpbmcoKVxuICB9XG5cbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGJzNTguZGVjb2RlKGVuY29kZWQpKVxufVxuXG4vKipcbiAqIERlY29kZSBhIGhhc2ggZnJvbSB0aGUgZ2l2ZW4gbXVsdGloYXNoLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZcbiAqIEByZXR1cm5zIHt7Y29kZTogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyLCBkaWdlc3Q6IEJ1ZmZlcn19IHJlc3VsdFxuICovXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZSAoYnVmKSB7XG4gIGlmICghKEJ1ZmZlci5pc0J1ZmZlcihidWYpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignbXVsdGloYXNoIG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKGJ1Zi5sZW5ndGggPCAzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdWx0aWhhc2ggdG9vIHNob3J0LiBtdXN0IGJlID4gMyBieXRlcy4nKVxuICB9XG5cbiAgbGV0IGNvZGUgPSB2YXJpbnQuZGVjb2RlKGJ1ZilcbiAgaWYgKCFleHBvcnRzLmlzVmFsaWRDb2RlKGNvZGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtdWx0aWhhc2ggdW5rbm93biBmdW5jdGlvbiBjb2RlOiAweCR7Y29kZS50b1N0cmluZygxNil9YClcbiAgfVxuICBidWYgPSBidWYuc2xpY2UodmFyaW50LmRlY29kZS5ieXRlcylcblxuICBsZXQgbGVuID0gdmFyaW50LmRlY29kZShidWYpXG4gIGlmIChsZW4gPCAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtdWx0aWhhc2ggaW52YWxpZCBsZW5ndGg6IDB4JHtsZW4udG9TdHJpbmcoMTYpfWApXG4gIH1cbiAgYnVmID0gYnVmLnNsaWNlKHZhcmludC5kZWNvZGUuYnl0ZXMpXG5cbiAgaWYgKGJ1Zi5sZW5ndGggIT09IGxlbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgbXVsdGloYXNoIGxlbmd0aCBpbmNvbnNpc3RlbnQ6IDB4JHtidWYudG9TdHJpbmcoJ2hleCcpfWApXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNvZGU6IGNvZGUsXG4gICAgbmFtZTogY3MuY29kZXNbY29kZV0sXG4gICAgbGVuZ3RoOiBsZW4sXG4gICAgZGlnZXN0OiBidWZcbiAgfVxufVxuXG4vKipcbiAqICBFbmNvZGUgYSBoYXNoIGRpZ2VzdCBhbG9uZyB3aXRoIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gY29kZS5cbiAqXG4gKiA+ICoqTm90ZToqKiB0aGUgbGVuZ3RoIGlzIGRlcml2ZWQgZnJvbSB0aGUgbGVuZ3RoIG9mIHRoZSBkaWdlc3QgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBkaWdlc3RcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gY29kZVxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdXG4gKiBAcmV0dXJucyB7QnVmZmVyfVxuICovXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZSAoZGlnZXN0LCBjb2RlLCBsZW5ndGgpIHtcbiAgaWYgKCFkaWdlc3QgfHwgIWNvZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpaGFzaCBlbmNvZGUgcmVxdWlyZXMgYXQgbGVhc3QgdHdvIGFyZ3M6IGRpZ2VzdCwgY29kZScpXG4gIH1cblxuICAvLyBlbnN1cmUgaXQncyBhIGhhc2hmdW5jdGlvbiBjb2RlLlxuICBjb25zdCBoYXNoZm4gPSBleHBvcnRzLmNvZXJjZUNvZGUoY29kZSlcblxuICBpZiAoIShCdWZmZXIuaXNCdWZmZXIoZGlnZXN0KSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpZ2VzdCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKGxlbmd0aCA9PSBudWxsKSB7XG4gICAgbGVuZ3RoID0gZGlnZXN0Lmxlbmd0aFxuICB9XG5cbiAgaWYgKGxlbmd0aCAmJiBkaWdlc3QubGVuZ3RoICE9PSBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpZ2VzdCBsZW5ndGggc2hvdWxkIGJlIGVxdWFsIHRvIHNwZWNpZmllZCBsZW5ndGguJylcbiAgfVxuXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KFtcbiAgICBCdWZmZXIuZnJvbSh2YXJpbnQuZW5jb2RlKGhhc2hmbikpLFxuICAgIEJ1ZmZlci5mcm9tKHZhcmludC5lbmNvZGUobGVuZ3RoKSksXG4gICAgZGlnZXN0XG4gIF0pXG59XG5cbi8qKlxuICogQ29udmVydHMgYSBoYXNoIGZ1bmN0aW9uIG5hbWUgaW50byB0aGUgbWF0Y2hpbmcgY29kZS5cbiAqIElmIHBhc3NlZCBhIG51bWJlciBpdCB3aWxsIHJldHVybiB0aGUgbnVtYmVyIGlmIGl0J3MgYSB2YWxpZCBjb2RlLlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBuYW1lXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnRzLmNvZXJjZUNvZGUgPSBmdW5jdGlvbiBjb2VyY2VDb2RlIChuYW1lKSB7XG4gIGxldCBjb2RlID0gbmFtZVxuXG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoIWNzLm5hbWVzW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVucmVjb2duaXplZCBoYXNoIGZ1bmN0aW9uIG5hbWVkOiAke25hbWV9YClcbiAgICB9XG4gICAgY29kZSA9IGNzLm5hbWVzW25hbWVdXG4gIH1cblxuICBpZiAodHlwZW9mIGNvZGUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBIYXNoIGZ1bmN0aW9uIGNvZGUgc2hvdWxkIGJlIGEgbnVtYmVyLiBHb3Q6ICR7Y29kZX1gKVxuICB9XG5cbiAgaWYgKCFjcy5jb2Rlc1tjb2RlXSAmJiAhZXhwb3J0cy5pc0FwcENvZGUoY29kZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVucmVjb2duaXplZCBmdW5jdGlvbiBjb2RlOiAke2NvZGV9YClcbiAgfVxuXG4gIHJldHVybiBjb2RlXG59XG5cbi8qKlxuICogQ2hlY2tzIHdldGhlciBhIGNvZGUgaXMgcGFydCBvZiB0aGUgYXBwIHJhbmdlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvZGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnRzLmlzQXBwQ29kZSA9IGZ1bmN0aW9uIGFwcENvZGUgKGNvZGUpIHtcbiAgcmV0dXJuIGNvZGUgPiAwICYmIGNvZGUgPCAweDEwXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBtdWx0aWhhc2ggY29kZSBpcyB2YWxpZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuaXNWYWxpZENvZGUgPSBmdW5jdGlvbiB2YWxpZENvZGUgKGNvZGUpIHtcbiAgaWYgKGV4cG9ydHMuaXNBcHBDb2RlKGNvZGUpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChjcy5jb2Rlc1tjb2RlXSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gYnVmZmVyIGlzIGEgdmFsaWQgbXVsdGloYXNoLiBUaHJvd3MgYW4gZXJyb3IgaWYgaXQgaXMgbm90IHZhbGlkLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBtdWx0aWhhc2hcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiBAdGhyb3dzIHtFcnJvcn1cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGUgKG11bHRpaGFzaCkge1xuICBleHBvcnRzLmRlY29kZShtdWx0aWhhc2gpIC8vIHRocm93cyBpZiBiYWQuXG59XG5leHBvcnRzLnZhbGlkYXRlID0gdmFsaWRhdGVcblxuLyoqXG4gKiBSZXR1cm5zIGEgcHJlZml4IGZyb20gYSB2YWxpZCBtdWx0aWhhc2guIFRocm93cyBhbiBlcnJvciBpZiBpdCBpcyBub3QgdmFsaWQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IG11bHRpaGFzaFxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEB0aHJvd3Mge0Vycm9yfVxuICovXG5leHBvcnRzLnByZWZpeCA9IGZ1bmN0aW9uIHByZWZpeCAobXVsdGloYXNoKSB7XG4gIHZhbGlkYXRlKG11bHRpaGFzaClcblxuICByZXR1cm4gbXVsdGloYXNoLnNsaWNlKDAsIDIpXG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBub2RlL25vLWRlcHJlY2F0ZWQtYXBpICovXG52YXIgYnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJylcbnZhciBCdWZmZXIgPSBidWZmZXIuQnVmZmVyXG5cbi8vIGFsdGVybmF0aXZlIHRvIHVzaW5nIE9iamVjdC5rZXlzIGZvciBvbGQgYnJvd3NlcnNcbmZ1bmN0aW9uIGNvcHlQcm9wcyAoc3JjLCBkc3QpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGRzdFtrZXldID0gc3JjW2tleV1cbiAgfVxufVxuaWYgKEJ1ZmZlci5mcm9tICYmIEJ1ZmZlci5hbGxvYyAmJiBCdWZmZXIuYWxsb2NVbnNhZmUgJiYgQnVmZmVyLmFsbG9jVW5zYWZlU2xvdykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlclxufSBlbHNlIHtcbiAgLy8gQ29weSBwcm9wZXJ0aWVzIGZyb20gcmVxdWlyZSgnYnVmZmVyJylcbiAgY29weVByb3BzKGJ1ZmZlciwgZXhwb3J0cylcbiAgZXhwb3J0cy5CdWZmZXIgPSBTYWZlQnVmZmVyXG59XG5cbmZ1bmN0aW9uIFNhZmVCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIENvcHkgc3RhdGljIG1ldGhvZHMgZnJvbSBCdWZmZXJcbmNvcHlQcm9wcyhCdWZmZXIsIFNhZmVCdWZmZXIpXG5cblNhZmVCdWZmZXIuZnJvbSA9IGZ1bmN0aW9uIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuU2FmZUJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgdmFyIGJ1ZiA9IEJ1ZmZlcihzaXplKVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1Zi5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuZmlsbChmaWxsKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBidWYuZmlsbCgwKVxuICB9XG4gIHJldHVybiBidWZcbn1cblxuU2FmZUJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gQnVmZmVyKHNpemUpXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBidWZmZXIuU2xvd0J1ZmZlcihzaXplKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZWFkXG5cbnZhciBNU0IgPSAweDgwXG4gICwgUkVTVCA9IDB4N0ZcblxuZnVuY3Rpb24gcmVhZChidWYsIG9mZnNldCkge1xuICB2YXIgcmVzICAgID0gMFxuICAgICwgb2Zmc2V0ID0gb2Zmc2V0IHx8IDBcbiAgICAsIHNoaWZ0ICA9IDBcbiAgICAsIGNvdW50ZXIgPSBvZmZzZXRcbiAgICAsIGJcbiAgICAsIGwgPSBidWYubGVuZ3RoXG5cbiAgZG8ge1xuICAgIGlmIChjb3VudGVyID49IGwpIHtcbiAgICAgIHJlYWQuYnl0ZXMgPSAwXG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ291bGQgbm90IGRlY29kZSB2YXJpbnQnKVxuICAgIH1cbiAgICBiID0gYnVmW2NvdW50ZXIrK11cbiAgICByZXMgKz0gc2hpZnQgPCAyOFxuICAgICAgPyAoYiAmIFJFU1QpIDw8IHNoaWZ0XG4gICAgICA6IChiICYgUkVTVCkgKiBNYXRoLnBvdygyLCBzaGlmdClcbiAgICBzaGlmdCArPSA3XG4gIH0gd2hpbGUgKGIgPj0gTVNCKVxuXG4gIHJlYWQuYnl0ZXMgPSBjb3VudGVyIC0gb2Zmc2V0XG5cbiAgcmV0dXJuIHJlc1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBlbmNvZGVcblxudmFyIE1TQiA9IDB4ODBcbiAgLCBSRVNUID0gMHg3RlxuICAsIE1TQkFMTCA9IH5SRVNUXG4gICwgSU5UID0gTWF0aC5wb3coMiwgMzEpXG5cbmZ1bmN0aW9uIGVuY29kZShudW0sIG91dCwgb2Zmc2V0KSB7XG4gIG91dCA9IG91dCB8fCBbXVxuICBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICB2YXIgb2xkT2Zmc2V0ID0gb2Zmc2V0XG5cbiAgd2hpbGUobnVtID49IElOVCkge1xuICAgIG91dFtvZmZzZXQrK10gPSAobnVtICYgMHhGRikgfCBNU0JcbiAgICBudW0gLz0gMTI4XG4gIH1cbiAgd2hpbGUobnVtICYgTVNCQUxMKSB7XG4gICAgb3V0W29mZnNldCsrXSA9IChudW0gJiAweEZGKSB8IE1TQlxuICAgIG51bSA+Pj49IDdcbiAgfVxuICBvdXRbb2Zmc2V0XSA9IG51bSB8IDBcbiAgXG4gIGVuY29kZS5ieXRlcyA9IG9mZnNldCAtIG9sZE9mZnNldCArIDFcbiAgXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVuY29kZTogcmVxdWlyZSgnLi9lbmNvZGUuanMnKVxuICAsIGRlY29kZTogcmVxdWlyZSgnLi9kZWNvZGUuanMnKVxuICAsIGVuY29kaW5nTGVuZ3RoOiByZXF1aXJlKCcuL2xlbmd0aC5qcycpXG59XG4iLCJcbnZhciBOMSA9IE1hdGgucG93KDIsICA3KVxudmFyIE4yID0gTWF0aC5wb3coMiwgMTQpXG52YXIgTjMgPSBNYXRoLnBvdygyLCAyMSlcbnZhciBONCA9IE1hdGgucG93KDIsIDI4KVxudmFyIE41ID0gTWF0aC5wb3coMiwgMzUpXG52YXIgTjYgPSBNYXRoLnBvdygyLCA0MilcbnZhciBONyA9IE1hdGgucG93KDIsIDQ5KVxudmFyIE44ID0gTWF0aC5wb3coMiwgNTYpXG52YXIgTjkgPSBNYXRoLnBvdygyLCA2MylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSA8IE4xID8gMVxuICA6IHZhbHVlIDwgTjIgPyAyXG4gIDogdmFsdWUgPCBOMyA/IDNcbiAgOiB2YWx1ZSA8IE40ID8gNFxuICA6IHZhbHVlIDwgTjUgPyA1XG4gIDogdmFsdWUgPCBONiA/IDZcbiAgOiB2YWx1ZSA8IE43ID8gN1xuICA6IHZhbHVlIDwgTjggPyA4XG4gIDogdmFsdWUgPCBOOSA/IDlcbiAgOiAgICAgICAgICAgICAgMTBcbiAgKVxufVxuIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaCAoZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbmNsYXNzIEZlZWQge1xyXG4gIGNvbnN0cnVjdG9yICh7IG5hbWUsIHBlcm1hd2l0IH0pIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMucGVybWF3aXQgPSBwZXJtYXdpdFxyXG4gIH1cclxuXHJcbiAgYXN5bmMgcG9zdCAoeyB0ZXh0IH0pIHtcclxuICAgIHJldHVybiB0aGlzLnBlcm1hd2l0LnBvc3QoeyBmZWVkOiB0aGlzLm5hbWUsIHRleHQgfSlcclxuICB9XHJcblxyXG4gIFtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmVlZEFzeW5jSXRlcmF0b3IoKVxyXG4gIH1cclxuXHJcbiAgZmVlZEFzeW5jSXRlcmF0b3IgKCkge1xyXG4gICAgY29uc3QgZmVlZEhhc2ggPSB0aGlzLnBlcm1hd2l0LnN0b3JlLmdldEZlZWRTeW5jKHRoaXMubmFtZSlcclxuICAgIGxldCBzdGFydGVkID0gZmFsc2VcclxuICAgIGxldCBuZXh0RW50cnkgPSBudWxsXHJcbiAgICBsZXQgcGVybWF3aXQgPSB0aGlzLnBlcm1hd2l0XHJcbiAgICBjb25zdCBpdGVyYXRlRW50cnkgPSAocG9zdCkgPT4ge1xyXG4gICAgICBuZXh0RW50cnkgPSBwb3N0Lm5leHRcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZG9uZTogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6IHBvc3QudGV4dFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZXh0ICgpIHtcclxuICAgICAgICBpZiAoIXN0YXJ0ZWQpIHtcclxuICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlXHJcbiAgICAgICAgICByZXR1cm4gcGVybWF3aXQubWVya2xpbmcuZ2V0KGZlZWRIYXNoKS50aGVuKChoZWFkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaGVhZC5lbnRyaWVzKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwZXJtYXdpdC5tZXJrbGluZy5yZXNvbHZlKGhlYWQuZW50cmllcylcclxuICAgICAgICAgIH0pLnRoZW4oaXRlcmF0ZUVudHJ5KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIW5leHRFbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gcGVybWF3aXQubWVya2xpbmcucmVzb2x2ZShuZXh0RW50cnkpLnRoZW4oaXRlcmF0ZUVudHJ5KVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcmV0dXJuICgpIHtcclxuICAgICAgICByZXR1cm4ge31cclxuICAgICAgfSxcclxuICAgICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGZWVkXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuY29uc3QgTWVya2xpbmcgPSByZXF1aXJlKCdtZXJrbGluZycpXHJcblxyXG5jb25zdCBGZWVkID0gcmVxdWlyZSgnLi9mZWVkJylcclxuY29uc3QgTG9jYWxTdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmVzL2xvY2FsU3RvcmUnKVxyXG5cclxuY2xhc3MgUGVybWF3aXQge1xyXG4gIGNvbnN0cnVjdG9yICh7IGlwZnMsIHN0b3JlIH0gPSB7fSkge1xyXG4gICAgaWYgKGlwZnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5pcGZzKSB7XHJcbiAgICAgICAgaXBmcyA9IHdpbmRvdy5pcGZzXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2lwZnMgbXVzdCBiZSBwYXNzZWQgYXMgYW4gb3B0aW9uJylcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZSB8fCBuZXcgTG9jYWxTdG9yZSgpXHJcblxyXG4gICAgdGhpcy5tZXJrbGluZyA9IG5ldyBNZXJrbGluZyh7aXBmczogaXBmc30pXHJcbiAgICB0aGlzLmZlZWRzID0gW11cclxuICB9XHJcblxyXG4gIGFzeW5jIGluaXQgKCkge1xyXG4gICAgYXdhaXQgdGhpcy5zdG9yZS5pbml0KClcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZUZlZWQgKHsgbmFtZSB9KSB7XHJcbiAgICBjb25zdCBmZWVkSGVhZCA9IGF3YWl0IHRoaXMubWVya2xpbmcuc2F2ZSh7XHJcbiAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgIGVudHJpZXM6IG51bGxcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5zdG9yZS5zZXRGZWVkKG5hbWUsIGZlZWRIZWFkLl9jaWQudG9CYXNlRW5jb2RlZFN0cmluZygpKVxyXG5cclxuICAgIHJldHVybiBuZXcgRmVlZCh7IG5hbWUsIHBlcm1hd2l0OiB0aGlzIH0pXHJcbiAgfVxyXG5cclxuICBhc3luYyBsb2FkRmVlZCAoeyBjaWQgfSkge1xyXG4gICAgY29uc3QgZmVlZEhlYWQgPSBhd2FpdCB0aGlzLm1lcmtsaW5nLmdldChjaWQpXHJcblxyXG4gICAgdGhpcy5zdG9yZS5zZXRGZWVkKGZlZWRIZWFkLm5hbWUsIGZlZWRIZWFkLl9jaWQudG9CYXNlRW5jb2RlZFN0cmluZygpKVxyXG5cclxuICAgIHJldHVybiBuZXcgRmVlZCh7IG5hbWU6IGZlZWRIZWFkLm5hbWUsIHBlcm1hd2l0OiB0aGlzIH0pXHJcbiAgfVxyXG5cclxuICBhc3luYyBwb3N0ICh7IGZlZWQsIHRleHQgfSkge1xyXG4gICAgY29uc3QgZmVlZEhlYWRIYXNoID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRGZWVkKGZlZWQpXHJcbiAgICBjb25zdCBmZWVkSGVhZCA9IGF3YWl0IHRoaXMubWVya2xpbmcuZ2V0KGZlZWRIZWFkSGFzaClcclxuXHJcbiAgICBjb25zdCBwcmV2aW91c0VudHJ5ID0gZmVlZEhlYWQuZW50cmllc1xyXG5cclxuICAgIGZlZWRIZWFkLmVudHJpZXMgPSBhd2FpdCB0aGlzLm1lcmtsaW5nLmNyZWF0ZSh7XHJcbiAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgIG5leHQ6IHByZXZpb3VzRW50cnlcclxuICAgIH0pXHJcblxyXG4gICAgYXdhaXQgdGhpcy5tZXJrbGluZy5zYXZlKGZlZWRIZWFkKVxyXG5cclxuICAgIHRoaXMuc3RvcmUuc2V0RmVlZChmZWVkLCBmZWVkSGVhZC5fY2lkLnRvQmFzZUVuY29kZWRTdHJpbmcoKSlcclxuXHJcbiAgICAvLyB0aGlzLmZlZWRzW2ZlZWRdID0gZmVlZEhlYWQuX2NpZC50b0Jhc2VFbmNvZGVkU3RyaW5nKClcclxuICB9XHJcblxyXG4gIGFzeW5jIHBvc3RzIChmZWVkLCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgZmVlZEhlYWRIYXNoID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRGZWVkKGZlZWQpXHJcbiAgICBjb25zdCBmZWVkSGVhZCA9IGF3YWl0IHRoaXMubWVya2xpbmcuZ2V0KGZlZWRIZWFkSGFzaCkgLy8gdGhpcy5tZXJrbGluZy5nZXQodGhpcy5mZWVkc1tmZWVkXSlcclxuXHJcbiAgICBsZXQgY3VycmVudEVudHJ5ID0gZmVlZEhlYWQuZW50cmllc1xyXG5cclxuICAgIHdoaWxlIChjdXJyZW50RW50cnkgIT09IG51bGwpIHtcclxuICAgICAgYXdhaXQgdGhpcy5tZXJrbGluZy5yZXNvbHZlKGN1cnJlbnRFbnRyeSlcclxuICAgICAgY2FsbGJhY2soY3VycmVudEVudHJ5LnRleHQpXHJcbiAgICAgIGN1cnJlbnRFbnRyeSA9IGN1cnJlbnRFbnRyeS5uZXh0XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBlcm1hd2l0XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuY2xhc3MgTG9jYWxTdG9yZSB7XHJcbiAgY29uc3RydWN0b3IgKHsgbG9jYWxTdG9yYWdlS2V5LCBsb2NhbFN0b3JhZ2UgfSA9IHt9KSB7XHJcbiAgICB0aGlzLmxvY2FsU3RvcmFnZUtleSA9IGxvY2FsU3RvcmFnZUtleSB8fCAncGVybWF3aXQnXHJcbiAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZSB8fCB3aW5kb3cubG9jYWxTdG9yYWdlXHJcbiAgfVxyXG5cclxuICBhc3luYyBpbml0ICgpIHtcclxuICAgIGlmICghdGhpcy5sb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkodGhpcy5sb2NhbFN0b3JhZ2VLZXkpKSB7XHJcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlW3RoaXMubG9jYWxTdG9yYWdlS2V5XSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICB2ZXJzaW9uOiAxLFxyXG4gICAgICAgIGZlZWRzOiB7fVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2V0RmVlZCAobmFtZSwgaXBmc0hhc2gpIHtcclxuICAgIHRoaXMuX2FwcGx5TG9jYWxTdG9yYWdlQ2hhbmdlKChjb25maWcpID0+IHtcclxuICAgICAgY29uZmlnLmZlZWRzW25hbWVdID0gaXBmc0hhc2hcclxuICAgICAgcmV0dXJuIGNvbmZpZ1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEZlZWQgKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmdldEZlZWRTeW5jKG5hbWUpXHJcbiAgfVxyXG5cclxuICBnZXRGZWVkU3luYyAobmFtZSkge1xyXG4gICAgdmFyIGNvbmZpZyA9IHRoaXMuX3JlYWRDb25maWcoKVxyXG4gICAgcmV0dXJuIGNvbmZpZy5mZWVkc1tuYW1lXVxyXG4gIH1cclxuXHJcbiAgX3JlYWRDb25maWcgKCkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5sb2NhbFN0b3JhZ2VbdGhpcy5sb2NhbFN0b3JhZ2VLZXldKVxyXG4gIH1cclxuXHJcbiAgX2FwcGx5TG9jYWxTdG9yYWdlQ2hhbmdlIChhY3Rpb25Gbikge1xyXG4gICAgdmFyIGNvbmZpZyA9IHRoaXMuX3JlYWRDb25maWcoKVxyXG4gICAgdmFyIHVwZGF0ZWQgPSBhY3Rpb25Gbihjb25maWcpXHJcbiAgICB0aGlzLmxvY2FsU3RvcmFnZVt0aGlzLmxvY2FsU3RvcmFnZUtleV0gPSBKU09OLnN0cmluZ2lmeSh1cGRhdGVkKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMb2NhbFN0b3JlXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=