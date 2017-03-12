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
      } else if (typeof obj[i] === 'number' || typeof obj[i] === 'boolean') {
        string += obj[i].toString() + ',';
      } else if (Array.isArray(obj[i])) {
        string += stringifyJSON(obj[i]) + ',';
      } else if (typeof obj[i] === 'object' && !(Array.isArray(obj[i]))) {
        string += stringifyJSON(obj[i]) + ',';
      }
    }
    var last = obj[obj.length - 1];
    if (typeof last === 'string') {
      string += '"' + last + '"]'
    } else if (typeof last === 'number' || typeof last === 'boolean') {
      string += last.toString() + ']';
    } else if (Array.isArray(obj[i])) {
      string += stringifyJSON(obj[i]) + ']';
    } else if (typeof obj[i] === 'object' && !(Array.isArray(obj[i]))) {
      string += stringifyJSON(obj[i]) + ']';
    }
    return string;
    }
  }
  // for object inputs
  if (typeof obj === 'object' && !(Array.isArray(obj))) {
    var string = '{';
    var properties = [];
    for (var prop in obj) {
      var key = '';
      key += '"' + prop.toString() + '":';
      if (obj[prop] === null || obj[prop] === undefined) {
        key += 'null';
      } else if (typeof obj[prop] !== 'object' && (typeof obj[prop] === 'number' || typeof obj[prop] === 'boolean')) {
        key += obj[prop].toString();
      } else if (typeof obj[prop] !== 'object' && typeof obj[prop] === 'string') {
        key += '"' + obj[prop].toString() + '"';
      } else if (typeof obj[prop] === 'object') {
        key += stringifyJSON(obj[prop]);
      }
      if (typeof obj[prop] !== 'function' && obj[prop] !== undefined) {
        properties.push(key);
      }
    }
    string += properties.join(',') + '}';
    return string;
  }
};
