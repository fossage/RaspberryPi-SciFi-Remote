'use strict'

import {x} from '../core/elements';
import {pxParser} from '../utils/string-utils';
import {Component} from '../core/component-factory';

let TweenMax = require('gsap');

export let Tile = Component((opts) => {
  
  let styles = Object.assign({ 
    color: '#fff',
    textShadow: '2px 1px 2px rgba(150, 150, 150, 1)',
    backgroundColor: '#46ACEC',
    boxShadow: '2px 2px 3px #333',
    border: '2px solid #333',
    borderRadius: '15px',
    height: '170px',
    width: '170px',
    zIndex: '0',
    display: 'inline-block',
    margin: '10px'
  }, opts);

  let rules              = styles.boxShadow.split(' ');
  let depressedBoxShadow = '';
  let heightUpdate       = `${pxParser(styles.height) -1}px`;
  let widthUpdate        = `${pxParser(styles.width)}px`;

  let mouseDownStyles = {
    boxShadow: '1px 1px 2px #222',
    width: widthUpdate,
    height: heightUpdate,
    textShadow: '1px 1px 2px rgba(150, 150, 150, 1)',
    marginBottom: `${pxParser(styles.marginBottom) +1}px`
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
      .mouseDown(el => el.text('(╯°□°)╯︵ ┻━┻'))
      .mouseUp(el => el.text(opts.text))
      .setStyles({
        textAlign: opts.textAlign || 'center',
        verticalAlign: opts.verticalAlign || 'middle',
        color: opts.color || '#333',
        fontSize: opts.fontSize || '2.0em'
      })        

  return x.output(
    innerDiv.append(
      title
    )
  )
});

