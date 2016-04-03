'use strict';

export function pxParser(rule) {
  return parseInt(rule.slice(0, -2), 10);
}