import {FullPane} from '../component-templates/full-pane';
import {x} from '../core/elements';

export let plexControls = plexControlFactory();


function plexControlFactory() {
  let buttonStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '5px',
    backgroudColor: 'orange',
    flex: '1'
  }

  let topContent = x
    .div
    .setStyles({
      display: 'flex'
    })
    .append(
      x.button
      .setStyles(buttonStyles),
      x.button
      .setStyles(buttonStyles),
      x.button
      .setStyles(buttonStyles),
      x.button
      .setStyles(buttonStyles)
    )
    
  let bottomContent = x
    .div
    .setStyles({
      display: 'flex'
    })
    .append(
      x.button
      .setStyles(buttonStyles),
      x.button
      .setStyles(buttonStyles),
      x.button
      .setStyles(buttonStyles),
      x.button
      .setStyles(buttonStyles)
    )

  let control = FullPane({
    color: 'RGB(255, 21, 30)', 
    padding: '15px',
    topContent: topContent,
    bottomContent: bottomContent
  });
  
  control
  .touchStart((el) => {
    el.animation.reverse();
    
    el.animation.eventCallback('onReverseComplete', () => {      
      [...el.childNodes].forEach((node) => { node.remove(); });
    });
  });

  return control;
}

