// Flags: --experimental-addon-modules
'use strict';
const common = require('../../common');
const assert = require('node:assert');

/**
 * Test that the export condition `node-addons` can be used
 * with `*.node` files with the CJS loader.
 */

const mod = require(`esm-package/${common.buildType}`);
assert.strictEqual(mod.hello(), 'world');
