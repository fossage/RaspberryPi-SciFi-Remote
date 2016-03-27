import {DOM} from '../core/elements';

export let dimmer = DOM.div.setStyles({
  height: '480px',
  width: '800px',
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: '0.6'
});