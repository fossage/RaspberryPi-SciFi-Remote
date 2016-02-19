import {registerComponent} from './dum';
import {x} from './elements';

x.attach(
  x.div.append(
    x.h1.text('Foo!').subscribe('c', function(e){ this.text(e.detail.data)}),
    x.ul.append(
      x.li.append(x.p.text('item1')),
      x.li.append(
        x.p.text('item2').click(el => el.publish('c', 'Bar!'))
      ),
      x.li.append(x.p.text('item3'))
    )
  )
);
 
// registerComponent('my-list', '#list', '#mydiv').subscribe('alertfired', function(e){ this.innerHTML = '<ul><li>Fifth Thing</li><li>Fourth Thing</li><li>Third Thing</li><li>Second Thing</li><li>First Thing</li></ul>'; });
// registerComponent('my-alert', '#alert', '#my-alert').click(el => el.publish('alertfired'));