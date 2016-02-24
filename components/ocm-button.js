import {x} from '../core/elements';

export let OCMButton = (opts) => {
  if(typeof opts === 'undefined') {
    opts = {};
  } 
  
  let container = x.div;
  let button = x
    .img
    .setSrc('../img/icon/text-lines.svg')
    .click((el) => {
      el.publish('openOCM', {});
    });
  
  return x.output(
    container.append(
      button
    )
  );
}