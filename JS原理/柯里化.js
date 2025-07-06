function add() {
  const args = [...arguments];

  function inner() {
    args.push(...arguments);
    return inner;
  }

  inner.toString = () => {
    return args.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
  };

  return inner;
}

console.log(add(1)(2).toString());
