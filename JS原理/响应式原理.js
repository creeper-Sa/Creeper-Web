// vue2 通过Object.defineProperty 给data里的每个属性都添加getter setter （数据量大会导致性能下降

// vue2 中有个watcher，会进行对数据的依赖收集，当属性被调用，watcher收集依赖，当属性值被改变，notify会通知watcher对依赖这个属性的函数重新调用