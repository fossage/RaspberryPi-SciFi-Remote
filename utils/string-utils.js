'use strict';

export let pxParser = (rule) => {
  return parseInt(rule.slice(0, -2));
}