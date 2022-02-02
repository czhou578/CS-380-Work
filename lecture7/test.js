function foo(a, b) {
  // console.log(a, b);
  return [a, b, { 'a': a, 'b': b }];
}
console.log(foo(2));