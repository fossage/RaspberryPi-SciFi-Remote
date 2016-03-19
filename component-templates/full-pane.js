'use strict'

import {x} from '../core/elements';
import {pxParser} from '../utils/string-utils';
import {Component} from '../core/component-factory';

let TweenMax = require('gsap');

export let FullPane = Component((opts) => {
  
  let styles = Object.assign(defaultFactory(), opts);
  
  let topStyles = Object.assign(defaultFactory(), { 
    top: '0px', 
    position: 'absolute',
    height: '480px',
    color: '#fff',
    textShadow: '2px 1px 2px rgba(150, 150, 150, 1)',
    backgroundColor: '#000',
    width: '800px',
    left: '0',
    margin: '0',
    backgroundImage: 'url("./img/background/plex-background.jpeg")',
    backgroundPosition: '-36px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: '0' 
  });
  
  let wrapper = x
    .div
    .setStyles({ 
      position: 'absolute', 
      display: 'none', 
      zIndex: '100',
      top: '0'
    })
    .subscribe('openPlexRemote', function(){
      this.setStyles({display: 'block'})
      this.to(1, { opacity: 1})
    })
    .subscribe('closePane', function(){
      this.animation.reverse();
      this.setStyles({display: 'none'})
    })
    .append(
      x.div
      .setStyles(topStyles)
      .subscribe('openPlexRemote', function(){
        this.to(1, { opacity: 1})
      })
      .subscribe('closePane', function(){
        this.animation.reverse();
      })
    );
    
    if(opts.topContent) {
      wrapper.childNodes[0].append(opts.topContent);
    }
  
    function defaultFactory (){
      return { 
        
      }
    }

  return wrapper;
  
});
