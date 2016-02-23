import {registerComponent} from './dum';
import {x} from './elements';

import {Tile} from '../components/basic-tile';
import {OCM} from '../components/ocm';
import {OCMButton} from '../components/ocm-button'

let TweenMax = require('gsap');

/*======== COMPONENT SETUP =======*/


let tile1 = Tile({
  height: '200px',
  width: '200px',
  text: 'Lights'
});

let ocm = OCM();
let ocmButton = OCMButton();

/*======== LINKAGE =======*/
x.attach(
  ocmButton,
  tile1,
  ocm
);
 
// registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
// registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));
