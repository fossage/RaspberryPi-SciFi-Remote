import {x} from '../core/elements';
import {dimmer} from '../components/dimmer';
import {dots} from '../components/dots';
import {mainControlTiles} from '../components/main-control-tiles';
import {weatherPane} from '../components/weather-pane';

/*======== COMPONENT SETUP =======*/
dots();

/*======== LINKAGE =======*/
x.attach(
  dimmer,
  weatherPane,
  mainControlTiles
);
 
/*======== MISC =======*/


