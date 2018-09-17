const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', function() {
  it('should reject non-string values', function() {
    var res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject strings with only spaces', function() {
    var res = isRealString('   ');
    expect(res).toBe(false);
  });

  it('should allow strings with non-space characters', function() {
    var res = isRealString('  Milos  ');
    expect(res).toBe(true);
  });
});
