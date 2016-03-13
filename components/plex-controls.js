import {FullPane} from '../component-templates/full-pane';
import {x} from '../core/elements';

export let plexControls = plexControlFactory();


function plexControlFactory() {
  let buttonStyles = {
    width: '100px',
    height: '100px',
    borderRadius: '50px',
    textShadow: '3px 2px 3px rgba(246,30,214,1)',
    color: 'rgba(246,30,214,1)',
    backgroundColor: '#111',
    position: 'absolute',
    fontSize: '1.3em'
  }

  let topContent = x
    .div
    .setStyles({
      display: 'flex'
    })
    .append(
      x
      .button
        .setStyles({
          height: '50px',
          width: '50px',
          top: '10px',
          left: '10px',
          position: 'absolute',
          borderRadius: '25px',
          backgroundColor: '#333',
          textShadow: '3px 2px 3px rgba(125,243,54,1)',
          color: 'rgba(125,243,54,1)',
          fontSize: '0.5em'
        })
        .text('CLOSE')
        .touchStart(function(){
          this.publish('closePane', {});
        }),
      x
      .button
        .setStyles(buttonStyles)
        .setStyles({left: '50px', top: '100px'})
        .text('LEFT')
        .touchStart(() => {
          sendCommand('navigation', 'moveLeft');
        }),
      x
      .button
        .setStyles(buttonStyles)
        .setStyles({left: '250px', top: '50px'})
        .text('DOWN')
        .touchStart(() => {
          sendCommand('navigation', 'moveDown');
        }),
      x
      .button
        .setStyles(buttonStyles)
        .setStyles({left: '450px', top: '50px'})
        .text('UP')
        .touchStart(() => {
          sendCommand('navigation', 'moveUp');
        }),
      x
      .button
        .setStyles(buttonStyles)
        .setStyles({left: '650px', top: '100px'})
        .text('RIGHT')
        .touchStart(() => {
          sendCommand('navigation', 'moveRight');
        })
    )
    
  let bottomContent = x
    .div
    .setStyles({
      display: 'flex'
    })
    .append(
      x
      .button
        .setStyles(buttonStyles)
        .setStyles({left: '160px', top: '10px'})
        .text('BACK')
        .touchStart(() => {
          sendCommand('navigation', 'back');
        }),
      x
      .button
        .setStyles(buttonStyles)
        .setStyles({
          left: '325px', 
          top: '-75px',
          width: '150px',
          height: '150px'
        })
        .text('SELECT')
        .touchStart(() => {
          sendCommand('navigation', 'select');
        }),
      x
      .button
        .setStyles(buttonStyles)
        .setStyles({left: '550px', top: '10px'})
        .text('PLAY')
        .touchStart(() => {
          sendCommand('playback', 'play')
        })
    )

  let control = FullPane({
    color: 'RGB(255, 21, 30)', 
    padding: '15px',
    topContent: topContent,
    bottomContent: bottomContent
  });
  
  function sendCommand(type, cmd) {
    fetch(`http://192.168.0.3:32400/system/players/192.168.0.18/${type}/${cmd}`);
  }

  return control;
}

// moveUp
// moveLeft
// moveRight
// moveDown
// contextMenu
// select
// back
// setVolume?level=50
// bigStepBack
// stepBack
// stepForward
// bigStepForward
// toggleOSD
// play
// stop
