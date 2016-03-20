'use strict';

let TweenMax = require('gsap');
const renderer = require('electron').ipcRenderer; 

let pi;
renderer.on('pi', (isPi) => { pi = isPi; });
renderer.send('pi?');

export function registerComponent(elementName, templateId, shadowHost) {
  let CustomElement   = document.registerElement(elementName);
  let link            = document.querySelector(`link[rel="import"]${templateId}-comp`);
  let template        = link.import.querySelector(templateId).innerHTML;
  let component       = decorateEl(new CustomElement());
  component.innerHTML = template;
  
  if (shadowHost !== null) {
    let host = document.querySelector(shadowHost);
    let root = host.createShadowRoot();
    root.appendChild(component);
  } else {
    document.body.appendChild(component);
  }

  return component;
}

export function createEl(elName) {
  let el          = document.createElement(elName);
  let decoratedEl = decorateEl(el);
  
  return decoratedEl;
}

export let decorateEl = (function() {
  let uid = 0;
  return (el) => {
    Object.defineProperties(el, {
      $uid: {
        writable: false,
        value: ++uid
      },
      
      touchStart: {
        value: (function(){
          if(pi) {
            return _setUpHandler('touchstart', el);
          } else {
            return _setUpHandler('click', el);
          }
        }())
      },

      touchEnd: {
        value: (function(){
          if(pi) {
            return _setUpHandler('touchend', el);
          } else {
            return _setUpHandler('click', el);
          }
        }())
      },
      
      click: {
        value: _setUpHandler('click', el)
      },
      
      to: {
        value: _setUpSingleAnimation(el, 'to')
      },
      
      from: {
        value: _setUpSingleAnimation(el, 'from')
      },
      
      fromTo: {
        value: _setUpGroupAnimation(el)
      },

      mouseDown: {
        value: _setUpHandler('mouseDown', el)
      },
      
      mouseUp: {
        value: _setUpHandler('mouseUp', el)
      },
      
      append: {
        value: (...args) => {
          let fragment = document.createDocumentFragment();
          
          [...args].forEach((childEl) => {
            if(childEl && childEl.constructor === Array){
              childEl.forEach((elem) => {
                fragment.appendChild(elem);
              });
              
              el.appendChild(fragment);
            } else if(childEl){

              el.appendChild(childEl);
            }
          });
          
          return el;
        }
      },
      
      update: {
        value: (options) => {
          let comp = el.$constructor(options);
          try{
            el.parentNode.replaceChild(comp, el);
            return el;
          } catch(e){
            console.warn('Cant update element because no parent was found');
            return el;
          }
        }
      },
      
      remove: {
        value: () => {
          let parent = el.parentNode;
          try {
            return parent.removeChild(el);
          } catch(e) {
            console.error(e);
            console.warn('Cant remove element because no parent was found');
            return el;
          }
        }
      },
      
      setClass: {
        value: (...args) => {
          if(el.classList){
            el.classList.add(...args);
          }
          return el;
        }
      },
      
      removeClass: {
        value: (...args) => {
          el.classList.remove(...args);
          return el;
        }
      },
      
      toggleClass: {
        value: (className) => {
          el.classList.toggle(className);
          return el;
        }
      },

      setId: {
        value: (id) => {
          el.id = id;
          return el;
        }
      },
      
      setStyles: {
        value: (rules) => {
          let compClass = `component-${el.$uid}`;
          el.setClass(compClass);
          
          let styleSheet;
          
          if(document.styleSheets.length){
            styleSheet = document.styleSheets[0];
          } else {
            var styleEl = document.createElement('style');
            document.head.appendChild(styleEl); 
            styleSheet = styleEl.sheet;
          }

          var rule = `.${compClass} {\n`;
          
          Object.keys(rules).forEach((key) => {
            let cssKey = key.split(/(?=[A-Z])/).join("-");
            rule += `${cssKey}: ${rules[key]};\n`;
          });
          
          rule += '}';
          styleSheet.insertRule(rule, styleSheet.cssRules.length);
          
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
          let e = new CustomEvent(eventName, {detail: {data: data}, bubbles: true, cancelable: false});
          el.dispatchEvent(e);
          
          return el;
        }
      },
      
      subscribe: {
        value: function(name, cb) {
          window.addEventListener(name, function(e) {
            cb.call(el, e, e.detail.data);
          });
          
          return el;
        }
      },
      
      setSrc: {
        value: (src) => {
          el.src = src;
          return el;
        }
      },
      
      attachFunction: {
        value: (cb) => {
          cb.call(el, el);
          return el;
        }
      },
      
      shadow: {
        value: function(templateId) {
          let link     = document.querySelector('link[rel="import"]' + templateId + '-comp');
          let template = link.import.querySelector(templateId);
          let root     = el.createShadowRoot();
          let clone    = document.importNode(template.content, true);
          
          root.appendChild(clone);
          return el;
        }
      }
    });
    
    return el;
  };
}());


/*===========================================
             PRIVATE FUNCTIONS 
===========================================*/
function _setUpHandler(name, el) {
  let callbacks = [];
  return (cb) => {
    if (typeof cb !== 'function') {
      throw new TypeError(`Argument to ${name} must be a function`);
    }
    
    let domName = `on${name.toLowerCase()}`;
    callbacks = callbacks.concat([(cb.bind(el, el))]);

    el[domName] = () => {
      callbacks.forEach((cb) => { cb(); });
    }
    
    return el;
  };
}

function _setUpSingleAnimation(el, type) {
  let currentAnimation = {duration: null, vars: null};
  
  return (duration, vars) => {
    if(el.animation && !el.animation._reversed) {
      el.animation.reverse();
      Object.assign(el, 'to', {
        value: TweenMax[type].bind(TweenMax, el, duration, vars),
        writable: false,
        configurable: true
      });
    } else if((el.animation && el.animation._reversed) || duration !== currentAnimation.duration || !Object.is(vars, currentAnimation.vars)) {
      let timeLine = TweenMax[type](el, duration, vars);
      el.animation = timeLine; 
    }
    
    return el;
  }
}

function _setUpGroupAnimation(el) {
  let currentAnimation = {duration: null, fromVars: null, toVars: null};
  
  return (duration, fromVars, toVars) => {
    if(duration !== currentAnimation.duration 
      || !Object.is(fromVars, currentAnimation.fromVars) 
      || !Object.is(toVars, currentAnimation.toVars)) 
    {
      
      let timeLine = TweenMax.fromTo(el, duration, fromVars, toVars);
      
      if (!el.animation) { el.animation = timeLine };  
      
    }
    
    return el;
  }
}
