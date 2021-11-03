const React = (() => {
  // closure variables at module
  let _hooks = []; // each item holds value of current state or dependencies
  // iterator over 
  let _currentIndex = 0;

  // APIs
  return {
    render: (Component) => {
      const comp = Component();
      // rest index
      _currentIndex = 0;

      // outside calling functions
      return comp;
    },
    // hooks
    useState: (initialValue) => {
      // first call: get initial value
      // later call: get current closure value
      _hooks[_currentIndex] = _hooks[_currentIndex] || initialValue;

      // outside set current value
      const setState = (val) => {
       _hooks[_currentIndex] = val; 
      }

      // report current value outside
      const currentStateIndex = _currentIndex;
      
      // next hook
      _currentIndex++;
      return [
        _hooks[currentStateIndex], // value associated with useState
        setState
      ];
    },
    useEffect: (callback, deps) => {
      const hasNoDeps = !deps;
      const _deps = _hooks[_currentIndex];
      const depsChanged = deps ? !deps.every((el, i) => deps[i] === _deps[i]) : true;
      if (hasNoDeps || depsChanged) {
        callback();
        _hooks[_currentIndex] = deps;
      }
      // next hook
      _currentIndex++;
    }
  }
})();