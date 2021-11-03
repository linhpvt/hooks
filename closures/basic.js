
/**
 * This function is the basic illustrated useState hook of react lib
 * @param {any} initialValue the intial value for the hook
 * @returns similar to react useState hook
 */
function useState(initialValue) {
  // local variable holds initialValue, a closure
  let _val = initialValue;

  // getter
  function getState() {
    return _val;
  }

  // setter
  function setState(val) {
    _val = val
  }
  
  return [getState, setState];
}

const [foo, setFoo] = useState(0)
console.log(foo()) // 0

setFoo(10);
console.log(foo()) // 10

setInterval(() => {
  setFoo(Math.floor(Math.random() * 100) )
  console.log(foo())
}, 2000)