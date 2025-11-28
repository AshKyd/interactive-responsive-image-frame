export function encode(obj) {
  return obj.map(obj => [obj.id, obj.breakpoint, obj.mediaQuery].filter(Boolean).join('-')).join('|');
}
export function decode(encodedStr = '') {
  return encodedStr
    .split('|')
    .map(row => row.split('-'))
    .map(([id, breakpoint, mediaQuery]) => ({ id, breakpoint, mediaQuery }));
}
