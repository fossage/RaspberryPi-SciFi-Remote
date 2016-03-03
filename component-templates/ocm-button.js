import {x} from '../core/elements';
import {Component} from '../core/component-factory';

export let OCMButton = Component((opts) => {
 
 
  let container = x.div
  
  let button = x
    .img
    .setSrc('../img/icon/text-lines.svg')
    .click((el) => {
      el.publish('openOCM', {});
    })
    .setStyles(opts);
  
  return x.output(
    container.append(
      button
    )
  );
})