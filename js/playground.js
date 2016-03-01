import {registerComponent} from '../core/dum';
import {x} from '../core/elements';
import {Tile} from '../components/basic-tile';
import {OCM} from '../components/ocm';
import {OCMButton} from '../components/ocm-button'
import {Pane} from '../components/pane';

let TweenMax = require('gsap');
const electron = require('electron');

/*======== COMPONENT SETUP =======*/
let tileOpts = [
  { 
    text: 'Weather', 
    backgroundColor: 'RGBA(0, 0, 0, 0.2)',
    boxShadow: '3px 3px 32px 3px RGB(0, 252, 250)',
    textShadow: '3px 2px 3px RGB(0, 252, 250)',
    marginBottom: '10px',
    opacity: '0.8'
  },
  {
    text: 'Movies',
    backgroundColor: 'RGBA(0, 0, 0, 0.2)',
    boxShadow: '3px 3px 32px 3px RGBA(245, 244, 18, 1)',
    textShadow: '3px 2px 3px RGBA(245, 244, 18, 1)',
    color: 'RGBA(245, 244, 18, 1)',
    marginBottom: '10px',
    opacity: '0.8'
  },
  {
    text: 'Music',
    backgroundColor: 'RGBA(0, 0, 0, 0.2)',
    boxShadow: '3px 3px 32px 3px rgba(125,243,54,1)',
    textShadow: '3px 2px 3px rgba(125,243,54,1)',
    color: 'rgba(125,243,54,1)',
    marginBottom: '10px',
    opacity: '0.8'
  },
  {
    text: 'Settings',
    backgroundColor: 'RGBA(0, 0, 0, 0.2)',
    boxShadow: '3px 3px 32px 3px rgba(246,30,214,1)',
    textShadow: '3px 2px 3px rgba(246,30,214,1)',
    color: 'rgba(246,30,214,1)',
    marginBottom: '10px',
    opacity: '0.8'
  }
];

let ocmOpts = {
  items: ['item1', 'item2', 'item3', 'item4']
}

let size = electron.screen.getPrimaryDisplay().workAreaSize;


let weatherPane = Pane({backgroundColor: '#333'});
let tiles = x.div.append(Tile(tileOpts)).setStyles({display: 'flex', justifyContent: 'center', padding: '15px'});
let ocm = OCM(ocmOpts);

function runCenterDot(xfrom, xto, time){
  let dot1 = x.div.setStyles({
    border: '1px solid RGB(216, 254, 254)',
    borderRadius: '8px',
    backgroundColor: 'RGB(216, 254, 254)',
    boxShadow: '3px 3px 32px 3px RGB(216, 254, 254)',
    position: 'absolute'
  });
  
  document.body.appendChild(dot1);
  TweenMax.fromTo(dot1, time, {
    y: 280, 
    x: xfrom,
    height: 20, 
    width: 20, 
    borderRadius: 12
  }, 
  {
    y: 2,
    x: xto, 
    height: 1, 
    width: 1,  
    borderRadius: 6,
    onComplete: () => { dot1.setStyles({display: 'none'}); document.body.removeChild(dot1);}
  });
}

function runAll(){
  dotRunner(-25, 335);
  dotRunner(165, 352);
  dotRunner(358, 366);
  dotRunner(550, 380);
  dotRunner(740, 400);
}

runAll();

setInterval(() => {
  runAll();
}, 10000);

function dotRunner(xfrom, xto) {
  let num = getRandom(2, 10) * 1000;
  let num2 = getRandom(8, 22);
  let clear = setTimeout(() => {
    runCenterDot(xfrom, xto, num2);
    clearTimeout(clear);
  }, num);
}

let dimmer = x.div.setStyles({
  height: '480px',
  width: '800px',
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: '0.6'
});

tiles.childNodes[0].click((el) => {
  fetch('http://api.openweathermap.org/data/2.5/forecast?id=5809844&APPID=54d8527b214ab9b27a7a7ec7aee9efa0&units=imperial')
  .then((response)=>{
    response.json()
    .then((data) => {
      el.publish('openWeather', data)
    });
  });
});

function getRandom(max, min){
  return Math.floor(Math.random() * (1 + max - min) + min);
}	

/*======== LINKAGE =======*/
x.attach(
  dimmer,
  ocm,
  tiles,
  weatherPane
);
 
// registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
// registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));
