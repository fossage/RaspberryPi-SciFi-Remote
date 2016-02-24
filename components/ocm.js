'use strict';

import {x} from '../core/elements';
import {Component} from '../core/component-factory';
let TweenMax = require('gsap');

const electron = require('electron');

export let OCM = Component((opts) => {
  let electronScreen = electron.screen;
  let size = electronScreen.getPrimaryDisplay().workAreaSize;
  
  let containerStyles = {
    width: '300px',
    border: '0 2px solid #333',
    backgroundColor: 'RGBA(0, 117, 204, 1)',
    height: `${size.height - 3}px`,
    position: 'absolute',
    top: '0',
    left: '-310px',
    zIndex: '1'
  }
  
  let container = x
    .div
      .setStyle(containerStyles)
      .subscribe('openOCM', function(e){
        TweenMax.to(this, 0.3, {
          left: 0
        });
      })
      .click(function(e){
        TweenMax.to(this, 0.3, containerStyles)
      });
  
  return x
    .output(
      container
    )
});