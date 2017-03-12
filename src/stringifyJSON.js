// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // for null input
  if (obj === null || obj === undefined) {
    return 'null';
  }
  // for number or boolean inputs
  if (typeof obj !== 'object' && (typeof obj === 'number' || typeof obj === 'boolean')) {
    return obj.toString();
  }
  // for string inputs
  if (typeof obj !== 'object' && typeof obj === 'string') {
    var string = obj.split('');
    string.push('"');
    string.unshift('"');
    return string.join('');
  }
  // for array inputs
  if (typeof obj === 'object' && Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    } else {
    var string = '[';
    for (var i = 0; i < obj.length - 1; i++) {
      if (typeof obj[i] === 'string') {
        string += '"' + obj[i].toString() + '",';
      } else {
        string += obj[i].toString() + ',';
      }
    }
    var last = obj[obj.length - 1];
    if (typeof last === 'string') {
      string += '"' + last + '"]'
    } else {
      string += last.toString() + ']';
    }
    return string;
    }
  } else {
    var string = '{';
    for (var prop in obj) {
      if (typeof obj[prop] !== 'object') {
        str += prop.toString + ':' + obj[prop].toString + ', ';
      } else {
        return stringifyJSON(obj[prop]);
      }
    }
  }
};
