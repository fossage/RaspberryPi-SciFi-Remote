import {registerComponent} from './dum';
import {x} from './elements';
import {Tile} from '../components/basic-tile/basic-tile';
import {Hello} from '../components/hello/hello';

let tile1 = Tile({
    height: '200px',
    width: '400px',
    text: '┬─┬﻿ ノ( ゜-゜ノ)'
  })
  .setStyle({ 
    backgroundColor: 'red',
    height: '400px'
  })
  .mouseDown(function(el){
    this.toggleClass('highlighted');
  })
  .mouseUp(function(el){
    this.toggleClass('highlighted');
  });

let tile2 = Tile({text: '┬─┬﻿ ノ( ゜-゜ノ)'})
  .setStyle({height: '100px'})
  .mouseDown(function(el){
    this.toggleClass('highlighted');
  })
  .mouseUp(function(el){
    this.toggleClass('highlighted');
  });

let hello = Hello();

x.attach(
  tile1,
  tile2,
  hello
);
 
    // registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
    // registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));
