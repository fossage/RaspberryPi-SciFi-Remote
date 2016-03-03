import {x} from '../core/elements';
import {Tile} from '../component-templates/basic-tile';

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

let tileFragment =  Tile(tileOpts);

[...tileFragment.childNodes].forEach((node, idx) => {
  let tm;
  let amount = idx < 2 ? -700 : 700;
  
  node.subscribe('openPane', () => {
    tm = node.to(node, 2, {x: amount})
  });
  
  node.subscribe('closePane', () => {
    tm.reverse();
  });
})

export let mainControlTiles = x
  .div
  .append(tileFragment)
  .setStyles({
    display: 'flex', 
    justifyContent: 'center', 
    padding: '15px'
  });

mainControlTiles.childNodes[0].click((el) => {
  el.publish('openPane', {});
  el.publish('openWeather', {})
  
  fetch('http://api.openweathermap.org/data/2.5/weather?id=5809844&APPID=54d8527b214ab9b27a7a7ec7aee9efa0&units=imperial')
  .then((response) => {
    response.json()
    .then((data) => {
      el.publish('weatherLoaded', data)
    });
  });
});
