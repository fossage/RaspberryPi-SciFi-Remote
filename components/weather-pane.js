import {Pane} from '../component-templates/pane';
import {DOM} from '../core/elements';

export let weatherPane = Pane({color: 'RGB(255, 21, 30)', padding: '15px'});

weatherPane.subscribe('openWeather', () => {
  weatherPane.to(1.4, {y: 235, delay: 0.6});
})
.touchStart((el) => {
  el.animation.reverse();
  
  el.animation.eventCallback('onReverseComplete', () => {      
    [...el.childNodes].forEach((node) => { node.remove(); });
  });
});

weatherPane.subscribe('weatherLoaded', (e, data) => {
  weatherPane.append(
    DOM.h1.text('Current Weather').setClass('blade'), 
    DOM.hr,
    DOM.h1.text(`${data.main.temp}ºF`).setClass('blade'),
    DOM.h3.text(data.weather[0].description).setClass('blade')
  )
});
