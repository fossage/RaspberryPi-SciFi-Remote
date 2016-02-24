'use strict';

export let Component = (defaultConstructor) => {
  return (opts) => { 
    if(typeof opts === 'undefined') {
      opts = {};
    } else if(opts.constructor === Array) {
      let outputArray = [];
  
      opts.forEach((opt) => {
        outputArray.push(defaultConstructor(opt));
      });
      
      return outputArray; 
    }
    return defaultConstructor(opts);
  }
}