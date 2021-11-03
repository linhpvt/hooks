

// closure - module pattern

const React = (() => {
  let _val; // hold our state in module scope
  let _deps;
  return {
    render: (Comp) => {
      const comp = Comp();
      comp.render();
      return comp;
    },
    useState: (initialValue) => {
      // first call:  _val = undefined  -> get initialValue
      // later calls: _val != undefined -> get that value
      _val = _val || initialValue;
      const setVal = (newVal) => {
        _val = newVal;
      }
      return [_val, setVal];
    },

    useEffect(callback, deps) {
      const hasNoDeps = !deps;
      const depsChanged = _deps  
        ? !deps.every((el, i) => el === _deps[i]) 
        : true;
      if (hasNoDeps || depsChanged) {
        callback();
        _deps = deps;
      }
    }
  };
})();

const Counter = () => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    console.log('effect: ', val)
  }, [val])
  return {
    click: () => {
      // increased by 1
      setVal(val + 1);
    },
    render: () => {
      console.log('Current value: ' + val);
    }
  }
}

// first component rendering
let c1 = React.render(Counter);
// every state change will trigger re-rendering
c1.click();
c1 = React.render(Counter)
c1.click();
c1 = React.render(Counter)
c1.click();
React.render(Counter)
