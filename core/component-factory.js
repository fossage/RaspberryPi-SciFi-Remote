'use strict';

import {decorateEl} from './dum';

export let Component = (defaultConstructor) => {
  return (opts) => { 
    if(typeof opts === 'undefined') {
      opts = {};
    } else if(opts.constructor === Array) {
      let fragment          = document.createDocumentFragment();
      fragment.$constructor = Component.call(null, defaultConstructor);
    
      opts.forEach((opt) => {
        let comp = defaultConstructor(opt);
        fragment.appendChild(comp);
      });
      
      return fragment; 
    }
 
    let comp          = defaultConstructor(opts);
    comp.$constructor = Component.call(null, defaultConstructor);
    
    return comp;
    
  }
}