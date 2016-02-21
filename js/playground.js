import {registerComponent} from './dum';
import {x} from './elements';
import {Tile} from '../components/basic-tile/basic-tile';

let tile1 = Tile('1');
let tile2 = Tile('2');

x.attach(
  tile1,
  tile2
);
 
    // registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
    // registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));
