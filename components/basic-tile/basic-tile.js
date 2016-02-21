import {registerComponent} from '../../js/dum';
import {x} from '../../js/elements';

export let Tile = (text = '', click = () =>{return}) => {
  
  let outerDiv = x
    .div
      .setClass('tile-outer', 'tile')
      .mouseDown(el => el.toggleClass('highlighted'))
      .mouseUp(el => el.toggleClass('highlighted'))
      
  
  let innerDiv = x
    .div
      .setClass('tile-inner')

  let title = x
    .h1
      .setStyle({
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'blue'
      })
      .text(text)

  return x.output(
    
    outerDiv.append(
      innerDiv.append(
        title
      )
    )
    
  )
}
