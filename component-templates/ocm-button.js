import {DOM} from '../core/elements';
import {Component} from '../core/component-factory';

export let OCMButton = Component((opts) => {
 
 
  let container = DOM.div
  
  let button = x
    .img
    .setSrc('../img/icon/text-lines.svg')
    .click((el) => {
      el.publish('openOCM', {});
    })
    .setStyles(opts);
  
  return DOM.output(
    container.append(
      button
    )
  );
})