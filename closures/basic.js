
/**
 * This function is the basic illustrated useState hook of react lib
 * @param {any} initialValue the intial value for the hook
 * @returns similar to react useState hook
 */
// Problem: we need to get directly _val in destructuring instead of a getter function
// if we return _val, it doesn't change anymore, we want to get the current value instead of
// getting the intial one.
// let move to advance.js implementation

function useState(initialValue) {
  // local variable holds initialValue, a closure
  // every time the function get called, we have a _val closure variable
  let _val = initialValue;
  let _prevVal = initialValue;
  
  // getter
  const getState = () => {
    return _val;
  }

  // setter
  const setState = (val) => {
    _prevVal = _val
    _val = val
  }

  const toString = () => {
    return `${_prevVal},${_val}`
  }

  return [getState, setState, toString];
}

const Counter = (value) => {
  const [getVal, setVal, toString] = useState(value)
  return {
    click: (val) => {
      setVal(getVal() + val || 1)
    },
    render: () => {
      console.log(`For ${value} - ${toString()}`)
    }
  }
}

const C = Counter(1)
setInterval(() => {
  C.click(2)
  C.render()
}, 3000)

const C2 = Counter(10)
setInterval(() => {
  C2.click(Math.floor(Math.random() * 30))
  C2.render()
}, 2000)