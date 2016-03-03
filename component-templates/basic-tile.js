'use strict'

import {x} from '../core/elements';
import {pxParser} from '../utils/string-utils';
import {Component} from '../core/component-factory';

let TweenMax = require('gsap');

export let Tile = Component((opts) => {
  
  let styles = Object.assign({ 
    color: 'RGB(111, 249, 252)',
    textShadow: '2px 1px 2px rgba(150, 150, 150, 1)',
    backgroundColor: '#46ACEC',
    boxShadow: '2px 2px 3px #333',
    border: '1px  RGB(0, 15, 72)',
    borderRadius: '4px',
    zIndex: '0',
    flex: 'flex-grow',
    height: '160px',
    width: '160px',
    margin: '10px',
  }, opts);

  let rules              = styles.boxShadow.split(' ');
  let depressedBoxShadow = '';
  

  let mouseDownStyles = {
    boxShadow: '1px 1px 2px #222',
    textShadow: 'none',
    color: '#666'
  };

  let innerDiv = x
    .div
      .setClass('tile-inner')
      .setStyles(styles)
      .mouseDown(function(el){
        this.setStyles(mouseDownStyles);
        this.publish('tileDepressed', {});
      })
      .mouseUp(function(el){
        this.setStyles(styles);
        this.publish('tileReleased', {});
      });

  let title = x
    .h1
      .text(opts.text || 'hi')
      .setStyles({
        textAlign: opts.textAlign || 'center',
        verticalAlign: opts.verticalAlign || 'middle',
        fontSize: opts.fontSize || '1.6em'
      });

  return x.output(
    innerDiv.append(
      title
    )
  )
});

