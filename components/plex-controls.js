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
  
  function runDot(xfrom, xto, yfrom, yto, sizefrom = 15, sizeto = 15, brfrom = '12px', brto = '12px'){
    let num = getRandom(1000, 10000);
    var clear = setTimeout(() => {
      let color = 'RGB(0, 194, 253)';
      let time = getRandom(5, 16);
      let dot = DOM.div.setStyles({
        border: `1px solid ${color}`,
        borderRadius: '8px',
        backgroundColor: color,
        boxShadow: `3px 3px 32px 3px ${color}`,
        position: 'absolute',
        zIndex: '0'
      })
      .subscribe('closePane', function(){
        this.animation.pause();
      })
      .subscribe('openPlexRemote', function(){
        this.animation.play();
      });

      dot.fromTo(time, 
      {
        y: yfrom, 
        x: xfrom,
        height: sizefrom, 
        width: sizefrom, 
        borderRadius: brfrom
      }, 
      {
        y: yto,
        x: xto,
        height: sizeto, 
        width: sizeto, 
        borderRadius: brto, 
        onComplete: () => { 
          dot.remove();
        }
      });
      
      topContent.append(dot);
      clearTimeout(clear);
    }, num);
  }

  function runAll(){
    let num = getRandom(6000, 15000);
    _defaultDots();
    setInterval(() => {
      if(!paused){
        num = getRandom(6000, 15000);
        _defaultDots();
      }
    }, num);
  }
  
  function _defaultDots() {
    runDot(855, -150, 265, 265, 2, 2);
    runDot(-150, 855, 285, 285, 5, 5);
    runDot(-150, 855, 323, 323, 10, 10);
    runDot(855, -150, 410, 410);
    runDot(150, 383, 450, '200px', 25, 1);
    runDot(623, 414, 450, '200px', 25, 1);
  }
  

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
  // .attachFunction(() => {
  //   runAll();
  // });
  

  return control;
}

// navigation/moveUp
// navigation/moveLeft
// navigation/moveRight
// navigation/moveDown
// navigation/contextMenu
// select
// back
// playback/setParameters?volume=50
// playback/bigStepBack
// playback/stepBack
// playback/stepForward
// playback/bigStepForward
// playback/play
// navigation/toggleOSD
// navigation/stop
