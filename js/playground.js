import {registerComponent} from '../core/dum';
import {x} from '../core/elements';
import {Tile} from '../components/basic-tile';
import {OCM} from '../components/ocm';
import {OCMButton} from '../components/ocm-button'
import {Pane} from '../components/pane';

let TweenMax = require('gsap');

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

let weatherPane = Pane({color: 'RGB(255, 21, 30)', padding: '15px'});
let wtl;

weatherPane.subscribe('openWeather', () => {
  wtl = TweenMax.to(weatherPane, 1.4, {y: 235, delay: 0.6});
})
.click(() => {
  weatherPane.publish('closePane', {});
  wtl.reverse();
  
  wtl.eventCallback('onReverseComplete', () => {      
    [...weatherPane.childNodes].forEach((node) => { weatherPane.removeChild(node); });
  });
});

let weatherInner = 

weatherPane.subscribe('weatherLoaded', (e, data) => {
  weatherPane.append(
    x.h1.text('Current Weather').setClass('blade'), 
    x.hr,
    x.h1.text(`${data.main.temp}ºF`).setClass('blade'),
    x.h3.text(data.weather[0].description).setClass('blade')
  )
});


let tileFragment =  Tile(tileOpts);

[...tileFragment.childNodes].forEach((node, idx) => {
  let tm;
  let amount = idx < 2 ? -700 : 700;
  
  node.subscribe('openPane', () => {
    tm = TweenMax.to(node, 2, {x: amount})
  });
  
  node.subscribe('closePane', () => {
    tm.reverse();
  });
})

let tiles = x.div.append(tileFragment).setStyles({display: 'flex', justifyContent: 'center', padding: '15px'});
let ocm = OCM(ocmOpts);
let dimmer = x.div.setStyles({height: '480px', width: '800px', position: 'absolute', backgroundColor: '#000', opacity: '0.3'});


runAllDots();
setInterval(() => {
  runAllDots();
}, 10000);

tiles.childNodes[0].click((el) => {
  el.publish('openPane', {});
  el.publish('openWeather', {})
  fetch('http://api.openweathermap.org/data/2.5/weather?id=5809844&APPID=54d8527b214ab9b27a7a7ec7aee9efa0&units=imperial')
  .then((response)=>{
    response.json()
    .then((data) => {
      el.publish('weatherLoaded', data)
    });
  });
});



/*======== LINKAGE =======*/
x.attach(
  dimmer,
  weatherPane,
  ocm,
  tiles
);
 
// registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
// registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));

function runAllDots(){
  dotRunner(50, 355);
  dotRunner(205, 375);
  dotRunner(383, 390);
  dotRunner(550, 410);
  dotRunner(715, 428);
}

function getRandom(max, min){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function runDot(xfrom, xto, time){
  let dot1 = x.div.setStyles({
    border: '1px solid RGB(216, 254, 254)',
    borderRadius: '8px',
    backgroundColor: 'RGB(216, 254, 254)',
    boxShadow: '3px 3px 32px 3px RGB(216, 254, 254)',
    position: 'absolute'
  });
  
  document.body.appendChild(dot1);
  TweenMax.fromTo(dot1, time, {
    y: 250, 
    left: xfrom,
    height: 20, 
    width: 20, 
    borderRadius: 12
  }, 
  {
    y: 20,
    left: xto, 
    height: 0, 
    width: 0,  
    borderRadius: 6,
    onComplete: () => { dot1.setStyles({display: 'none'}); document.body.removeChild(dot1);}
  });
}

function dotRunner(xfrom, xto) {
  let num = getRandom(2, 10) * 1000;
  let num2 = getRandom(8, 22);
  let clear = setTimeout(() => {
    runDot(xfrom, xto, num2);
    clearTimeout(clear);
  }, num);
}
	