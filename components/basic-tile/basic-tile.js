'use strict'

import {x} from '../../js/elements';

export let Tile = (opts) => {
  if(typeof opts === 'undefined') {
    opts = {};
  }
  
  let outerDiv = x
    .div
      .setClass('tile-outer', 'tile')
      .setStyle({
        height: opts.height || '300px',
        width: opts.width || '300px',
        border: opts.border || '1px solid #666'
      })
      
  
  let innerDiv = x
    .div
      .setClass('tile-inner')

  let title = x
    .h1
      .text(opts.text || 'hi')
      .mouseDown(el => el.text('(╯°□°)╯︵ ┻━┻'))
      .mouseUp(el => el.text(opts.text))
      .setStyle({
        textAlign: 'center',
        verticalAlign: 'middle',
        color: opts.color || 'blue'
      })

  return x.output(
    
    outerDiv.append(
      innerDiv.append(
        title
      )
    )
    
  )
}
