'use strict'

import {x} from '../js/elements';
import {pxParser} from '../utils/string-utils';

export let Tile = (opts) => {
  if(typeof opts === 'undefined') {
    opts = {};
  }
  
  let styles = { 
    color: opts.color || '#fff',
    textShadow: opts.textShadow || '2px 1px 2px rgba(150, 150, 150, 1)',
    backgroundColor: opts.backgroundColor || '#46ACEC',
    boxShadow: opts.boxShadow || '2px 2px 3px #333',
    border: opts.border || '2px solid #333',
    borderRadius: opts.borderRadius || '15px',
    height: opts.height || '300px',
    width: opts.width || '300px'
  };
  
  let rules = styles.boxShadow.split(' ');
  let depressedBoxShadow = '';
  
  rules.forEach(function(rule){
    if(rule.slice(-2) === 'px') {
      depressedBoxShadow += `${pxParser(rule) - 1}px `;
    }
  });
  
  depressedBoxShadow += rules[rules.length-1];
  
  let heightUpdate = `${pxParser(styles.height) -1}px`;
  let widthUpdate = `${pxParser(styles.width)}px`;

  let mouseDownStyles = {
    boxShadow: depressedBoxShadow,
    width: widthUpdate,
    height: heightUpdate,
    textShadow: '1px 1px 2px rgba(150, 150, 150, 1)'
  };
  
  let outerDiv = x
    .div
      .setClass('tile-outer', 'tile')

  let innerDiv = x
    .div
      .setClass('tile-inner')
      .setStyle(styles)
      .mouseDown(function(el){
        this.setStyle(mouseDownStyles);
        this.publish('tileDepressed', {});
      })
      .mouseUp(function(el){
        this.setStyle(styles);
        this.publish('tileReleased', {});
      });

  let title = x
    .h1
      .text(opts.text || 'hi')
      .mouseDown(el => el.text('(╯°□°)╯︵ ┻━┻'))
      .mouseUp(el => el.text(opts.text))
      .setStyle({
        textAlign: opts.textAlign || 'center',
        verticalAlign: opts.verticalAlign || 'middle',
        color: opts.color || '#333',
        fontSize: opts.fontSize || '2.0em'
      })
      .subscribe('tileDepressed', function(){
        this.setStyle({
          marginRight: '1px',
          marginBottom: '1px'
        });
      })
      .subscribe('tileReleased', function(){
        this.setStyle({
          marginRight: '0',
          marginBottom: '0'
        });
      });

  return x.output(
    
    outerDiv.append(
      innerDiv.append(
        title
      )
    )
    
  )
}

Tile.repeat = (...args) => {
  let outputArray = [];
  [...args].forEach((opt, idx) => {
    outputArray.push(Tile(opt))
  });
    debugger
  
  return outputArray;
}
