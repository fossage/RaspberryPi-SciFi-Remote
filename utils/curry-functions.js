export function partialApplyObjStr(cb, string) {
  return (object) => {
    cb(object, string);
    return object;
  }
}