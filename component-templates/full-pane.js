'use strict'

import {x} from '../core/elements';
import {pxParser} from '../utils/string-utils';
import {Component} from '../core/component-factory';

let TweenMax = require('gsap');

export let FullPane = Component((opts) => {
  
  let styles = Object.assign(defaultFactory(), opts);
  
  let topStyles = Object.assign(defaultFactory(), { top: '0', position: 'absolute' });
  let bottomStyles = Object.assign(defaultFactory(), { top: '225px', position: 'absolute' });
  
  let wrapper = x
    .div
    .append(
      x.div
      .setStyles(topStyles)
      .touchStart((el) => {
        wrapper.to(0.2, topStyles);
        el.publish('closePane', {});
      }),
      x.div
      .setStyles(bottomStyles)
      .touchStart((el) => {
        wrapper.to(0.2, bottomStyles);
        el.publish('closePane', {});
      })
    );
    
    if(opts.topContent) {
      wrapper.childNodes[0].append(opts.topContent);
    }
    
    if(opts.bottomContent) {
      wrapper.childNodes[1].append(opts.bottomContent);
    }
    
    function defaultFactory (){
      return { 
        color: '#fff',
        textShadow: '2px 1px 2px rgba(150, 150, 150, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: '240px',
        width: '800px',
        left: '0',
        zIndex: '10',
        margin: '0'
      }
    }

  return wrapper;
  
});
