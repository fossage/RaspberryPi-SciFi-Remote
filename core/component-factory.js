'use strict';

export let Component = (defaultConstructor) => {
  return (opts) => { 
    if(typeof opts === 'undefined') {
      opts = {};
    } else if(opts.constructor === Array) {
      let outputArray = [];
  
      opts.forEach((opt) => {
        let comp = defaultConstructor(opt);
        comp.$constructor = Component.apply(null, [defaultConstructor]);
        outputArray.push(comp);
      });
      
      return outputArray; 
    }
    let comp = defaultConstructor(opts);
    comp.$constructor = Component.apply(null, [defaultConstructor]);
    return comp;
  }
}