import {x} from '../core/elements';
import {dots} from '../components/dots';
import {dimmer} from '../components/dimmer';
import {weatherPane} from '../components/weather-pane';
import {mainControlTiles} from '../components/main-control-tiles';

/*======== COMPONENT SETUP =======*/
dots();

/*======== LINKAGE =======*/
x.attach(
  dimmer,
  weatherPane,
  mainControlTiles
);


