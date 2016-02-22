'use strict';

import {x} from '../../js/elements';

export let Hello = () => {
  
  let wrapper = x
    .div
    .mouseDown(el => el.publish('hi', 'hello yall'))
    .mouseUp(el => el.publish('bye', 'goodbye'))
      
      
  let txt = x
    .h1
    .text('hello')
    .subscribe('hi', function(e, data) {
      this.text(data);
    })
    .subscribe('bye', function(e, data) {
      this.text(data);
    })
    
    
  return x.output(
    
    wrapper.append(
      txt
    )
  )
}