'use strict';
require('../common');
const assert = require('assert').strict;

process.env.NODE_DISABLE_COLORS = true;

assert.throws(
  () => {
    assert.deepStrictEqual({}, { foo: 'bar' });
  },
  {
    message: 'Expected values to be strictly deep-equal:\n' +
      '+ actual - expected\n' +
      '\n' +
      '+ {}\n' +
      '- {\n' +
      '-   foo: \'bar\'\n' +
      '- }\n',
  });

{
  // TODO(puskin94): remove the emitWarning override once the partialDeepStrictEqual method is not experimental anymore
  // Suppress warnings, necessary otherwise the tools/pseudo-tty.py runner will fail
  const originalEmitWarning = process.emitWarning;
  process.emitWarning = () => {};

  assert.throws(
    () => {
      assert.partialDeepStrictEqual({}, { foo: 'bar' });
    },
    {
      message: 'Expected values to be partially and strictly deep-equal:\n' +
        '+ actual - expected\n' +
        '\n' +
        '+ {}\n' +
        '- {\n' +
        "-   foo: 'bar'\n" +
        '- }\n',
    });

  process.emitWarning = originalEmitWarning; // Restore original process.emitWarning
}
