'use strict';
export function registerComponent(elementName, templateId, shadowHost) {
  var CustomElement = document.registerElement(elementName);
  var link = document.querySelector('link[rel="import"]' + templateId + '-comp');
  var template = link.import.querySelector(templateId).innerHTML;
  var component = decorateEl(new CustomElement());
  
  component.innerHTML = template;
  
  if (shadowHost !== null) {
    var host = document.querySelector(shadowHost);
    var root = host.createShadowRoot();
    root.appendChild(component);
  } else {
    document.body.appendChild(component);
  }

  return component;
}

export function createEl(elName) {
  let el = document.createElement(elName);
  var decoratedEl = decorateEl(el);
  return decoratedEl;
}

export let dispatcher = (function() {
  let eventHash = Object.create(null);
  let d = {};
  
  Object.defineProperties(d, {
    subscribeTo: (eName, handler) => {
      if (!(eName in eventHash)) {
        eventHash[eName] = [];
      }

      eventHash[eName].push(handler);
    }
  });
}());

export let decorateEl = (function() {
  var uid = 0;
  return (el) => {
    Object.defineProperties(el, {
      $uid: {
        writable: false,
        value: ++uid
      },
      click: {
        value: _setUpHandler('click', el)
      },
      mouseDown: {
        value: _setUpHandler('mouseDown', el)
      },
      mouseUp: {
        value: _setUpHandler('mouseUp', el)
      },
      append: {
        value: (...args) => {
          [...args].forEach(function(childEl) {
            el.appendChild(childEl);
          });
          return el;
        }
      },
      setClass: {
        value: (...args) => {
          el.classList.add(...args);
          return el;
        }
      },
      removeClass: {
        value: (...args) => {
          el.classList.remove(...args);
        }
      },
      toggleClass: {
        value: (className) => {
          el.classList.toggle(className);
        }
      },
      flashClass: {
        value: (className, duration = 75) => {
          el.classList.toggle(className);
          
          let t = setTimeout(() => {
            el.classList.toggle(className);
            clearTimeout(t);
          }, duration);
        }
      },
      setId: {
        value: (id) => {
          el.id = id;
          return el;
        }
      },
      setStyle: {
        value: (rules) => {
          Object.keys(rules).forEach((key) => {
            el.style[key] = rules[key];
          });
          return el;
        }
      },
      text: {
        value: (txt) => {
          el.innerText = txt;
          return el;
        }
      },
      publish: {
        value: function(eventName, data) {
          var e = new CustomEvent(eventName, {detail: {data: data}, bubbles: true, cancelable: false});
          el.dispatchEvent(e);
          return el;
        }
      },
      subscribe: {
        value: function(name, cb) {
          window.addEventListener(name, function(e) {
            cb.call(el, e);
          });
          return el;
        }
      },
      shadow: {
        value: function(templateId) {
          var link = document.querySelector('link[rel="import"]' + templateId + '-comp');
          var template = link.import.querySelector(templateId);
          var root = el.createShadowRoot();
          var clone = document.importNode(template.content, true);
          root.appendChild(clone);
          return el;
        }
      }
    });
    
    return el;
  };
}());

function _setUpHandler(name, el) {
  return (cb) => {
    if (typeof cb !== 'function') {
      throw new TypeError(`Argument to ${name} must be a function`);
    }
    
    let domName = `on${name.toLowerCase()}`;
    el[domName] = cb.bind(el, el);
    return el;
  };
}
