'use strict';

import {decorateEl, createEl} from './dum';
const electron = require('electron');
const renderer = require('electron').ipcRenderer; 

let size = electron.screen.getPrimaryDisplay().workAreaSize;
let pi;

renderer.on('pi', (e, isPi) => { pi = isPi;});
renderer.send('pi?');

export let x = {};
Object.defineProperties(x, {
  attach: {
    value: (...args) => {
      
      decorateEl(document.body);
      document.body.setStyles({
        overflow: 'hidden',
        height: pi ? `${size.height}px` : '480px',
        width: pi ? `${size.width}px` : '800px',
        backgroundImage: 'url("./img/background/80s.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
	      cursor: pi ? 'none' : 'pointer'
      });
      
      let fragment = decorateEl(document.createDocumentFragment());
      
      [...args].forEach((arg) => {
        if(arg && arg.constructor === Array){
          arg.forEach((elem) => {
            fragment.append(elem);
          });

        } else {
          fragment.append(arg);
        }
      });
      
      document.body.appendChild(fragment);
      
      return args;
    }
  },
  output: {
    value: el => el
  },
  a: {
    get: () => {
      return createEl('a');
    }
  },
  p: {
    get: () => {
      return createEl('p');
    }
  },
  h1:  {
    get: () => {
      return createEl('h1');
    }
  },
  h2:  {
    get: () => {
      return createEl('h2');
    }
  },
  h3:  {
    get: () => {
      return createEl('h3');
    }
  },
  h4:  {
    get: () => {
      return createEl('h4');
    }
  },
  h5:  {
    get: () => {
      return createEl('h5');
    }
  },
  h6:  {
    get: () => {
      return createEl('h6');
    }
  },
  ul:  {
    get: () => {
      return createEl('ul');
    }
  },
  ol: {
    get: () => {
      return createEl('ol');
    }
  },
  li: {
    get: () => {
      return createEl('li');
    }
  },
  div: {
    get: () => {
      return createEl('div');
    }
  },
  img: {
    get: () => {
      return createEl('IMG');
    }
  },
  small: {
    get: () => {
      return createEl('small');
    }
  },
  footer: {
    get: () => {
      return createEl('footer');
    }
  },
  header: {
    get: () => {
      return createEl('header');
    }
  },
  hgroup: {
    get: () => {
      return createEl('hgroup');
    }
  },
  nav: {
    get: () => {
      return createEl('nav');
    }
  },
  dd: {
    get: () => {
      return createEl('dd');
    }
  },
  dl: {
    get: () => {
      return createEl('dl');
    }
  },
  dt: {
    get: () => {
      return createEl('dt');
    }
  },
  figcaption: {
    get: () => {
      return createEl('figcaption');
    }
  },
  figure: {
    get: () => {
      return createEl('figure');
    }
  },
  hr: {
    get: () => {
      return createEl('hr');
    }
  },
  main: {
    get: () => {
      return createEl('main');
    }
  },
  pre: {
    get: () => {
      return createEl('pre');
    }
  },
  abbr: {
    get: () => {
      return createEl('abbr');
    }
  },
  b: {
    get: () => {
      return createEl('b');
    }
  },
  bdi: {
    get: () => {
      return createEl('bdi');
    }
  },
  bdo: {
    get: () => {
      return createEl('bdo');
    }
  },
  br: {
    get: () => {
      return createEl('br');
    }
  },
  cite: {
    get: () => {
      return createEl('cite');
    }
  },
  code: {
    get: () => {
      return createEl('code');
    }
  },
  data: {
    get: () => {
      return createEl('data');
    }
  },
  dfn: {
    get: () => {
      return createEl('dfn');
    }
  },
  em: {
    get: () => {
      return createEl('em');
    }
  },
  i: {
    get: () => {
      return createEl('i');
    }
  },
  kdb: {
    get: () => {
      return createEl('kdb');
    }
  },
  mark: {
    get: () => {
      return createEl('mark');
    }
  },
  q: {
    get: () => {
      return createEl('q');
    }
  },
  rp: {
    get: () => {
      return createEl('rp');
    }
  },
  rt: {
    get: () => {
      return createEl('rt');
    }
  },
  rtc: {
    get: () => {
      return createEl('rtc');
    }
  },
  ruby: {
    get: () => {
      return createEl('ruby');
    }
  },
  s: {
    get: () => {
      return createEl('s');
    }
  },
  samp: {
    get: () => {
      return createEl('samp');
    }
  },
  span: {
    get: () => {
      return createEl('span');
    }
  },
  strong: {
    get: () => {
      return createEl('strong');
    }
  },
  sub: {
    get: () => {
      return createEl('sub');
    }
  },
  sup: {
    get: () => {
      return createEl('sup');
    }
  },
  time: {
    get: () => {
      return createEl('time');
    }
  },
  u: {
    get: () => {
      return createEl('u');
    }
  },
  wbr: {
    get: () => {
      return createEl('wbr');
    }
  },
  area: {
    get: () => {
      return createEl('area');
    }
  },
  audio: {
    get: () => {
      return createEl('audio');
    }
  },
  map: {
    get: () => {
      return createEl('map');
    }
  },
  track: {
    get: () => {
      return createEl('track');
    }
  },
  video: {
    get: () => {
      return createEl('video');
    }
  },
  embed: {
    get: () => {
      return createEl('embed');
    }
  },
  object: {
    get: () => {
      return createEl('object');
    }
  },
  param: {
    get: () => {
      return createEl('param');
    }
  },
  source: {
    get: () => {
      return createEl('source');
    }
  },
  canvas: {
    get: () => {
      return createEl('canvas');
    }
  },
  caption: {
    get: () => {
      return createEl('caption');
    }
  },
  col: {
    get: () => {
      return createEl('col');
    }
  },
  colgroup: {
    get: () => {
      return createEl('colgroup');
    }
  },
  table: {
    get: () => {
      return createEl('table');
    }
  },
  tbody: {
    get: () => {
      return createEl('tbody');
    }
  },
  td: {
    get: () => {
      return createEl('td');
    }
  },
  tfoot: {
    get: () => {
      return createEl('tfooter');
    }
  },
  th: {
    get: () => {
      return createEl('th');
    }
  },
  thead: {
    get: () => {
      return createEl('thead');
    }
  },
  tr: {
    get: () => {
      return createEl('tr');
    }
  },
  button: {
    get: () => {
      return createEl('button');
    }
  },
  datalist: {
    get: () => {
      return createEl('datalist');
    }
  },
  fieldset: {
    get: () => {
      return createEl('fieldset');
    }
  },
  form: {
    get: () => {
      return createEl('form');
    }
  },
  input: {
    get: () => {
      return createEl('input');
    }
  },
  keygen: {
    get: () => {
      return createEl('keygen');
    }
  },
  label: {
    get: () => {
      return createEl('label');
    }
  },
  legend: {
    get: () => {
      return createEl('legend');
    }
  },
  meter: {
    get: () => {
      return createEl('meter');
    }
  },
  optgroup: {
    get: () => {
      return createEl('optgroup');
    }
  },
  option: {
    get: () => {
      return createEl('option');
    }
  },
  progress: {
    get: () => {
      return createEl('progress');
    }
  },
  select: {
    get: () => {
      return createEl('select');
    }
  },
  details: {
    get: () => {
      return createEl('details');
    }
  },
  dialog: {
    get: () => {
      return createEl('dialog');
    }
  },
  menu: {
    get: () => {
      return createEl('menu');
    }
  },
  menuitem: {
    get: () => {
      return createEl('menuitem');
    }
  },
  summary: {
    get: () => {
      return createEl('summary');
    }
  },
  
  //componenets
  content: {
    get: () => {
      return createEl('content');
    }
  },
  element: {
    get: () => {
      return createEl('element');
    }
  },
  shadow: {
    get: () => {
      return createEl('shadow');
    }
  },
  template: {
    get: () => {
      return createEl('template');
    }
  }
});

