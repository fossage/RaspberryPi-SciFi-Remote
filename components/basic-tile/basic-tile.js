import {registerComponent} from '../../js/dum';
import {x} from '../../js/elements';

let outerDiv = x.div
  .setClass('tile-outer')
  .click((el) => {
    el.flashClass('highlighted');
  })

let innerDiv = x.div.setClass('tile-inner');

let title = x.h1.text('Tile 1');



export let tile = outerDiv.append(
  innerDiv.append(
    title
  )
);
