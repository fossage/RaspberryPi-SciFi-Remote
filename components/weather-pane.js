import {Pane} from '../component-templates/pane';
import {x} from '../core/elements';

export let weatherPane = Pane({color: 'RGB(255, 21, 30)', padding: '15px'});

let wtl;

weatherPane.subscribe('openWeather', () => {
  wtl = weatherPane.to(weatherPane, 1.4, {y: 220, delay: 0.6});
})
.click(() => {
  weatherPane.publish('closePane', {});
  wtl.reverse();
  
  wtl.eventCallback('onReverseComplete', () => {      
    [...weatherPane.childNodes].forEach((node) => { weatherPane.removeChild(node); });
  });
});

weatherPane.subscribe('weatherLoaded', (e, data) => {
  weatherPane.append(
    x.h1.text('Current Weather').setClass('blade'), 
    x.hr,
    x.h1.text(`${data.main.temp}ºF`).setClass('blade'),
    x.h3.text(data.weather[0].description).setClass('blade')
  )
});