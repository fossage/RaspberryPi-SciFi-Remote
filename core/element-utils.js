export function traverseNodes(node, cb) {
  if(cb){
    cb(node);
  }

  if(node.childNodes.length) {
    Object.keys(node.childNodes).forEach((key) => {
      traverseNodes(node.childNodes[key], cb);
    });
  }
}

export function callNodesEventCallbacks(node, event) {
  if(node.$$eventCallbacks && node.$$eventCallbacks[event]) {
    node.$$eventCallbacks[event].forEach((cb) => {
      cb()
    });
  }
}