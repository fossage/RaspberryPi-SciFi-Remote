import {x} from '../core/elements';
import {getRandom} from '../utils/number-utils'

var paused = false;

function runDot(xfrom, xto, time){
  let dot = x.div.setStyles({
    border: '1px solid RGB(216, 254, 254)',
    borderRadius: '8px',
    backgroundColor: 'RGB(216, 254, 254)',
    boxShadow: '3px 3px 32px 3px RGB(216, 254, 254)',
    position: 'absolute'
  })
  .subscribe('openPane', function(){
    this.animation.pause();
    paused = true;
  })
  .subscribe('closePane', function(){
    this.animation.play();
    paused = false;
  });
  
  document.body.appendChild(dot);
  dot.fromTo(time, 
  {
    y: 270, 
    x: xfrom,
    height: 20, 
    width: 20, 
    borderRadius: 12
  }, 
  {
    y: 25,
    x: xto, 
    height: 1, 
    width: 1,  
    borderRadius: 6,
    onComplete: () => { 
      dot.remove();
    }
  });
}

function runAll(){
  if(!paused){
    dotRunner(35, 366);
    dotRunner(214, 382);
    dotRunner(388, 398);
    dotRunner(565, 414);
    dotRunner(741, 430);
  }
}

function dotRunner(xfrom, xto) {
  let num = getRandom(2, 10) * 1000;
  let num2 = getRandom(8, 22);
  let clear = setTimeout(() => {
    runDot(xfrom, xto, num2);
    clearTimeout(clear);
  }, num);
}

export let dots = () => {
  runAll();

  setInterval(() => {
    runAll();
  }, 10000);
}
