var a = require('./a.js');
a.sayHello();
module.exports = function() {
    var element = document.createElement('h1');
    element.innerHTML = 'Hello Clover';

    return element;
}
