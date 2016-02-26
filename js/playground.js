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
    text: 'Tile1',
    backgroundColor: 'RGBA(189, 244, 222, 1)',
    marginBottom: '10px'
  },
  {
    text: 'Tile2',
    backgroundColor: 'RGBA(189, 244, 222, 1)',
    marginBottom: '10px'
  },
  {
    text: 'Tile3',
    backgroundColor: 'RGBA(189, 244, 222, 1)',
    marginBottom: '10px'
  }
];

let ocmOpts = {
  items: ['item1', 'item2', 'item3', 'item4']
}

let weatherTile = Tile({ marginBottom: '10px', text: 'Weather' });
let weatherPane = Pane({backgroundColor: '#333'});

weatherTile.mouseDown((el) => {
  // TweenMax.staggerFrom(tiles, 0.5, {opacity: 0, y:200, rotation: 360, scale:2}, 0.2);
  fetch('http://api.openweathermap.org/data/2.5/forecast?id=5809844&APPID=54d8527b214ab9b27a7a7ec7aee9efa0')
  .then((response)=>{
    response.json().then((data) => {
      el.publish('openWeather', data)
    });
  });
});

let tiles = Tile(tileOpts);
let ocm = OCM(ocmOpts);
let ocmButton = OCMButton({width: '30px'});

/*======== LINKAGE =======*/
x.attach(
  ocmButton,
  weatherTile,
  ocm,
  tiles,
  weatherPane
);
 
// registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
// registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));
