'use strict'

import {x} from '../core/elements';
import {pxParser} from '../utils/string-utils';
import {Component} from '../core/component-factory';

let TweenMax = require('gsap');

export let Pane = Component((opts) => {
  
  let styles = Object.assign({ 
    color: '#fff',
    textShadow: '2px 1px 2px rgba(150, 150, 150, 1)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '205px',
    width: '800px',
    left: '0',
    zIndex: '10',
    margin: '0',
    position: 'absolute',
    top: '-235px'
  }, opts);
  
  let wrapper = x
    .div
    .setStyles(styles)
    .touchStart((el) => {
      wrapper.to(0.2, styles);
      el.publish('closePane', {});
    });
    
  let heading = x.h1;
  
  wrapper.append(heading);
  
  return wrapper;
  
});
