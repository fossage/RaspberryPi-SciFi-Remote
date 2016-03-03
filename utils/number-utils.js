'use strict';

export let getRandom = function (max, min){
  return Math.floor(Math.random() * (1 + max - min) + min);
}