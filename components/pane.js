'use strict'

import {x} from '../core/elements';
import {pxParser} from '../utils/string-utils';
import {Component} from '../core/component-factory';

let TweenMax = require('gsap');

export let Pane = Component((opts) => {
  
  let styles = Object.assign({ 
    color: '#fff',
    textShadow: '2px 1px 2px rgba(150, 150, 150, 1)',
    backgroundColor: '#ccc',
    height: '485px',
    width: '800px',
    left: '0',
    zIndex: '10',
    margin: '0',
    position: 'absolute',
    bottom: '-485px'
  }, opts);
  
  let wrapper = x
    .div
    .setStyles(styles)
    .mouseDown((el) => {
      TweenMax.to(el, 0.2, styles);
    });
    
  let heading = x.h1;
  
  wrapper.append(heading);

    wrapper.subscribe('openWeather', (e, data) => {
      TweenMax.to(wrapper, 0.2, {
        bottom: 0
      });
      
      heading.text(data.cnt)
    });
    
  // if(opts.subscribeTo) {
  //   wrapper.subscribeTo(opts.subscribeTo.event, (e, data) => {
  //     TweenMax.to(wrapper, 0.3, {bottom: 0});
  //   });
  // }
  
  return wrapper;
  
});