import {registerComponent} from '../core/dum';
import {x} from '../core/elements';
import {Tile} from '../components/basic-tile';
import {OCM} from '../components/ocm';
import {OCMButton} from '../components/ocm-button'

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
    text: 'Tile2',
    backgroundColor: 'RGBA(189, 244, 222, 1)',
    marginBottom: '10px'
  }
];

let ocmOpts = {
  items: ['item1', 'item2', 'item3', 'item4']
}

let tile1 = Tile({ marginBottom: '10px', text: 'Lights' });

tile1.click((el) => {
  TweenMax.staggerFrom(tiles, 0.5, {opacity: 0, y:200, rotation: 360, scale:2}, 0.2);
});

let tiles = Tile(tileOpts);
let ocm = OCM(ocmOpts);
let ocmButton = OCMButton({width: '30px'});

/*======== LINKAGE =======*/
x.attach(
  ocmButton,
  tile1,
  ocm,
  tiles
);
 
// registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
// registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));
