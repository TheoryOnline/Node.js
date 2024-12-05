// Flags: --expose-internals
'use strict';
require('../common');
const assert = require('assert');
const { getStringEncodingInfo } = require('util');

[
  undefined,
  null,
  false,
  5n,
  5,
  Symbol(),
  () => {},
  {},
].forEach((value) => {
  assert.throws(
    () => { getStringEncodingInfo(value); },
    /The "content" argument must be of type string/
  );
});

{
  const latin1String = 'hello world!';
  // Run this inside a for loop to trigger the fast API
  for (let i = 0; i < 10_000; i++) {
    const { encoding, byteLength } = getStringEncodingInfo(latin1String);
    assert.strictEqual(encoding, 'latin1');
    assert.strictEqual(byteLength, latin1String.length);
  }
}

{
  const utf16String = '你好😀😃';
  // Run this inside a for loop to trigger the fast API
  for (let i = 0; i < 10_000; i++) {
    const { encoding, byteLength } = getStringEncodingInfo(utf16String);
    assert.strictEqual(encoding, 'utf16le');
    assert.strictEqual(byteLength, utf16String.length * 2);
  }
}
