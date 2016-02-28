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
    marginBottom: '10px', 
    text: 'Weather', 
    backgroundColor: 'RGB(0, 252, 250)',
    boxShadow: '3px 3px 32px 3px RGB(0, 252, 250)'
  },
  {
    text: 'Tile',
    backgroundColor: 'RGB(245, 244, 18)',
    boxShadow: '3px 3px 32px 3px RGBA(245, 244, 18, 1)',
    marginBottom: '10px'
  },
  {
    text: 'Tile',
    backgroundColor: 'rgba(125,243,54,1)',
    boxShadow: '3px 3px 32px 3px rgba(125,243,54,1)',
    marginBottom: '10px'
  },
  {
    text: 'Tile',
    backgroundColor: 'RGBA(246, 30, 214, 1)',
    boxShadow: '3px 3px 32px 3px rgba(246,30,214,1)',
    marginBottom: '10px'
  }
];

let ocmOpts = {
  items: ['item1', 'item2', 'item3', 'item4']
}


let weatherPane = Pane({backgroundColor: '#333'});
let tiles = Tile(tileOpts);
let ocm = OCM(ocmOpts);
let ocmButton = OCMButton({width: '30px'});

// let tl = new TweenMax.set(tiles.childNodes, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d"}});
// TweenMax.fromTo(tiles.childNodes, .05, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, immediateRender:true})
//   .to(tiles.childNodes, 0.3, {css:{rotationY:30, rotationX:20}})
//   .add("z", "+=0.2");
  
// tiles.childNodes.forEach(function (index, element) {
//   TweenMax.to(element, 0.2, {css:{z:getRandom(-50, 50)}}, "z"); //place each z-tween of each box at the label "z"
// });

// tiles.childNodes.forEach(function (index, element) {
//   tl.constructor.to(element, 1, {css:{z:200, backgroundColor:Math.random() * 0xffffff, rotationX:getRandom(-360, 600), rotationY:getRandom(-360, -600), autoAlpha:0}}, "explode");
// }) ;


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
  ocmButton,
  ocm,
  tiles,
  weatherPane
);
 
// registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
// registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));
