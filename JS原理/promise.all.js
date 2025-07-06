console.log("同步 1"); // 同步任务

Promise.resolve().then(() => {
  console.log("微任务 1");
  
  // 在微任务中再添加一个微任务
  Promise.resolve().then(() => {
    console.log("微任务 2");
    
    // 再嵌套一个微任务
    Promise.resolve().then(() => {
      console.log("微任务 3");
    });
  });
});

setTimeout(() => console.log("宏任务 1"), 0); // 宏任务

console.log("同步 2"); // 同步任务