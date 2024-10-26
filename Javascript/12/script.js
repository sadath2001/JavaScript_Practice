// IIFE - Immediately invoked function expression, check MDN docs
(function () {
  console.log("jellow");
})();

// or
(() => console.log("macha"))();

// iterator and generator function
var a = [1, 2, 4];
console.log(a);

for (const val of a) {
  // const val in a whill give me the index
  console.log(val);
}

// iterator - custom
function makeIterator(start = 0, end = Infinity, step = 1) {
  let nextStart = start;
  let iterationCount = 0;

  return {
    next() {
      let result;
      if (nextStart <= end) {
        result = { value: nextStart, done: false };
        nextStart += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    },
  };
}

let iterator = makeIterator(10, 90, 1);
let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}

// generators area pirce of code whose execution is not conitnous
function* getEven() {
  yield 2;
  yield 4;
  yield 6;
  yield 8;
  yield 10;
}
const value = getEven();
for (const i of value) {
  console.log(i);
}

// similaryl using generator function
function* IteratorNew(start, end, step) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}
const btn = document.getElementById("button");
const divs = document.getElementById("divs");
let one = IteratorNew(10, 20, 1);
btn.addEventListener("click", () => {
  divs.innerHTML = one.next().value;
});
