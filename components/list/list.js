'use strict';

let decorateEl = (function(){
  var uid = 0;
  return (el) => {
    Object.defineProperties(el, {
      $uid: {
        writable: false,
        value: ++uid
      },
      click: {
        value: (cb) => {
          if (typeof cb !== 'function') throw new TypeError('Argument to click must be a function');
          el.onclick = cb.bind(el, el);
          return el;
        }
      },
      append: {
        value: (...args) => {
          [...args].forEach(function(childEl){
            el.appendChild(childEl);
          });
          return el;
        }
      },
      setClass: {
        value: (...args) => {
          el.className = [...args];
          return el;
        }
      },
      setId: {
        value: (id) => {
          el.id = id;
          return el;
        }
      },
      style: {
        value: (rules) => {
          rules.keys().forEach(key => el.style[key] = rules[key]);
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
          window.addEventListener(name, function(e){
            cb.call(el, e)
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
  }
}())

function registerComponent(elementName, templateId) {
  var CustomElement = document.registerElement(elementName);
  var link = document.querySelector('link[rel="import"]' + templateId + '-comp');
  var template = link.import.querySelector(templateId).innerHTML;
  var component = decorateEl(new CustomElement());
  if(typeof shadowHost !== 'undefined' || shadowHost !== null) {
    var host = document.querySelector(shadowHost);
    var root = host.createShadowRoot();
    component.innerHTML = template;
    root.appendChild(component);
  } else {
    var root = component.createShadowRoot();
    root.innerHTML = template;
    // document.body.appendChild(root);
  }
  return component;
}

registerComponent('my-list', '#list', null);
