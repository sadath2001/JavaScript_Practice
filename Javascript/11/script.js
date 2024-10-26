// closures are nothig but function within a function
function sample(name) {
  function sayMyName() {
    console.log(name);
  }
  return sayMyName;
}

// curry function, generally used when we want to return the final statement only when all
// the parmteres are available

function sendEmail(to) {
  return function (sub) {
    return function (body) {
      console.log(`sending email ${to}, with sub ${sub} and body ${body}`);
    };
  };
}

sendEmail("sadath")("hi")("bye");

// also like this
const send2 = (to) => (sub) => (body) =>
  console.log(`sending email ${to}, with sub ${sub} and body ${body}`);
send2("yuvraj")("hi")("bye");

// composition

function add(a, b) {
  return a + b;
}
function multiply(a) {
  return a * a;
}

function composeTwoFunctions(f1, f2) {
  return function (a, b) {
    return f1(f2(a, b));
  };
}

const value = composeTwoFunctions(multiply, add);
console.log(value(1, 2));

// can also be written as
const finalvalue = (f1, f2) => (a, b) => f1(f2(a, b));
const result = finalvalue(multiply, add);
console.log(result(1, 2));

// composite function to use with multiple functions
function compose(...fns) {
  return function (...value) {
    return fns.reduce((a, b) => b(a), value);
  };
}

function mult2(args) {
  return args[0] * args[1];
}

function square2(val) {
  return val * val;
}

const final_resukt = compose(mult2, square2);
console.log(final_resukt(2, 3));

// trying composite in es6
const final_value_2 =
  (...fns) =>
  (...value) =>
    fns.reduce((a, b) => b(a), value);
