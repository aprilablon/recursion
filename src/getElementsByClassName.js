// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// each function created in underbar
_.each = function(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else if (typeof collection === 'object') {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  }
};

var getElementsByClassName = function(className) {
  var results = [];
  function getClass(element) {
    var collection = element.childNodes;
    _.each(collection, function(node) {
      if (node.classList && node.classList.contains(className)) {
        results.push(node);
      }
      getClass(node);
    })
  }
  getClass(document);
  return results;
};
