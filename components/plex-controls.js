import {FullPane} from '../component-templates/full-pane';
import {DOM} from '../core/elements';
import {getRandom} from '../utils/number-utils';

export let plexControls = plexControlFactory();

let _volume = 50;
let paused  = true;

function plexControlFactory() {
  let buttonStyles = {
    width: '70px',
    height: '70px',
    borderRadius: '50px',
    textShadow: '3px 4px 4px RGBA(20, 12, 200, 1)',
    boxShadow: '3px 3px 62px 1px RGBA(0, 252, 250, 0.5)',
    color: 'rgba(246,30,214,1)',
    backgroundColor: '#111',
    position: 'absolute',
    fontSize: '1.2em',
    zIndex: '10'
  }

  let topContent = DOM
    .div
    .setStyles({
      position: 'relative',
      height: '480px',
      backgroundColor: 'rgba(250, 250, 250, 0)'
    })
    .append(
      DOM
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
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
        color: 'rgba(125,243,54,1)',
        fontSize: '1.2em'
      })
      .text('吴')
      .touchStart(function(){
        this.publish('closePane', {});
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '270px', 
        top: '20px',
        color: 'RGB(0, 252, 250)',
        width: '50px',
        height: '50px',
        fontSize: '0.95em',
        textShadow: '3px 2px 3px rgba(12, 143, 224,1)',
      })
      .text('ই')
      .touchStart(() => {
        sendCommand('navigation', 'back');
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '480px', 
        top: '20px',
        color: 'RGB(0, 252, 250)',
        width: '50px',
        height: '50px',
        fontSize: '0.95em',
        textShadow: '3px 2px 3px rgba(12, 143, 224,1)',
      })
      .text('頁')
      .touchStart(() => {
        sendCommand('navigation', 'toggleOSD');
      }),
      
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '350px',
        top: '100px',
        width: '100px',
        height: '100px',
        display: 'block'
      })
      .text('䕧')
      .touchStart(() => {
        sendCommand('navigation', 'select');
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({left: '270px', top: '115px'})
      .text('<')
      .touchStart(() => {
        sendCommand('navigation', 'moveLeft');
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({left: '365px', top: '210px'})
      .text('v')
      .touchStart(() => {
        sendCommand('navigation', 'moveDown');
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({left: '365px', top: '20px'})
      .text('^')
      .touchStart(() => {
        sendCommand('navigation', 'moveUp');
      }),

      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({left: '460px', top: '115px'})
      .text('>')
      .touchStart(() => {
        sendCommand('navigation', 'moveRight');
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '200px', 
        color: 'RGB(196, 239, 50)',
        height: '50px',
        width: '50px',
        top: '330px',
        textShadow: '3px 4px 4px RGBA(20, 120, 70, 1)',
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
      })
      .text('<<<')
      .touchStart(() => {
        sendCommand('playback', 'bigStepBack')
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '280px', 
        color: 'RGB(196, 239, 50)',
        height: '50px',
        width: '50px',
        top: '330px',
        textShadow: '3px 4px 4px RGBA(20, 120, 70, 1)',
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
      })
      .text('<<')
      .touchStart(() => {
        sendCommand('playback', 'stepBack')
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '365px', 
        top: '320px',
        color: 'RGB(196, 239, 50)',
        textShadow: '3px 4px 4px RGBA(20, 120, 70, 1)',
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
      })
      .text('蝧')
      .touchStart(() => {
        sendCommand('playback', 'play')
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '470px', 
        color: 'RGB(196, 239, 50)',
        height: '50px',
        width: '50px',
        top: '330px',
        textShadow: '3px 4px 4px RGBA(20, 120, 70, 1)',
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
      })
      .text('>>')
      .touchStart(() => {
        sendCommand('playback', 'stepForward')
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '550px', 
        color: 'RGB(196, 239, 50)',
        height: '50px',
        width: '50px',
        top: '330px',
        textShadow: '3px 4px 4px RGBA(20, 120, 70, 1)',
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
      })
      .text('>>>')
      .touchStart(() => {
        sendCommand('playback', 'bigStepForward')
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '700px', 
        color: 'RGB(196, 239, 50)',
        height: '50px',
        width: '50px',
        top: '20px',
        textShadow: '3px 4px 4px RGBA(20, 120, 70, 1)',
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
      })
      .text('+')
      .touchStart(() => {
        sendCommand('playback', `setParameters?volume=${_setVolume('up')}`)
      }),
      
      DOM
      .button
      .setStyles(buttonStyles)
      .setStyles({
        left: '700px', 
        color: 'RGB(196, 239, 50)',
        height: '50px',
        width: '50px',
        top: '100px',
        textShadow: '3px 4px 4px RGBA(20, 120, 70, 1)',
        boxShadow: '3px 3px 32px 1px RGBA(0, 252, 250, 0.8)',
      })
      .text('-')
      .touchStart(() => {
        sendCommand('playback', `setParameters?volume=${_setVolume('down')}`)
      })
    )  

  function sendCommand(type, cmd) {
    fetch(`http://192.168.0.3:32400/system/players/192.168.0.18/${type}/${cmd}`);
  }
  
  function _setVolume(direction) {
    if(direction === 'up' && _volume < 100) {
     return _volume += 5;
    } else if(direction === 'down' && _volume > 0) {
      return _volume -= 5;
    } else {
      return _volume;
    }
  }
  
  let control = FullPane({
    color: 'RGB(255, 21, 30)', 
    padding: '15px',
    topContent: topContent
  })
  .subscribe('openPlexRemote', () => {
    paused = false;
  })
  .subscribe('closePane', () => {
    paused = true;
  })

  return control;
}
