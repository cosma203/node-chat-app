const expect = require('expect');

var generateMessage = require('./message');

describe('generateMessage', function() {
  it('should generate the correct message object', function() {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from: from, text: text });
  });
});
