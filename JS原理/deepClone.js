function deepClone(param, map = new Map()) {
  // 首先判断参数原型链上有无对象
  if (!param instanceof Object) {
    return param;
  }

  // 原型链上有对象再分辨用什么包裹,是数组就返回数组，不是就对象
  const obj = Array.isArray(param) ? [] : {};

  // 加入map解决循环引用问题
  if(map.has(param)) {
	return map.get(param)
  }
  map.set(param, obj)

  // 遍历参数的所有属性
  for (let item in param) {
    // 如果是对象，进行递归
    if (param[item] instanceof Object) {
      obj[item] = deepClone(param[item]);
    }
    // 相反则返回原值
    else if (param.hasOwnProperty(item)) {
      obj[item] = param[item];
    }
  }

  return obj;
}

const obj = {
  a: 100,
  func: function () {
    console.log(this.a);
  },
  obj: { b: 100, c: 200, d: { e: 100, f: 200, g:[5423,523,523,6523,4623,34,51,1] } },
};


const obj2 = deepClone(obj);

obj.obj.d.g = [1,2]

console.log(obj2.obj.d.g);
