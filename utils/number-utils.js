'use strict';

export function getRandom(max, min){
  return Math.floor(Math.random() * (1 + max - min) + min);
}