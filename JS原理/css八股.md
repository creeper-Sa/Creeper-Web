# 八股

## 行内元素和块级元素和行内块元素

行内元素无法设置宽高，宽度由父元素撑开，padding 和 margin 只能添加左右的不能添加上下的
可以设置行高，等同设置父元素行高，内部可以放行内元素但是 a 标签内不能放 a 标签

## css 选择器

id 属性 标签 通配符 类 伪类 伪元素 1.伪类选择器：
CSS 提供了五种基本伪类选择器，分别对应 HTML 标记的五种状态。 2.伪对象选择器
伪对象选择器根据对象内部的局部元素定义其样式。

## 权重 的 4 个等级定义

我们把特殊性分为 4 个等级，每一个等级代表一类选择器，没个等级的值相加得出选择器的权重。

4 个等级的定义如下：
第一等级：代表内联样式，如 style=""，
第二等级：代表 id 选择器，如#content
第三等级：代表类，伪类和属性选择器，如.content
第四等级：代表标签选择器和伪元素选择器，如 div p
注意：通用选择器（\*），子选择器（>），和相邻同胞选择器（+）并不在这个等级中，所以他们的权值为 0
(A, B, C)

## BFC 和 IFC 的区别

## vue 钩子函数

beforecreated
oncreated
beforemounted
onmounted
beforeunmounted
onunmounted
onupdated
beforeupdated

## mvvm, mvc, mvp

mvvm model view view-model
model 模型，数据
view 页面展示
view-model 数据绑定

mvc model view controller
model 数据模型
view 页面展示
controller 操作数据

mvp model view presenter
model 数据
view 页面
presenter 和 view-model 职责一致但是没有数据绑定功能

## url 输入浏览器到浏览器渲染出第一帧发生了什么

首先是 url 检测
DNS 解析域名，在本地寻找有无当前域名对应的缓存，有则使用，无则访问电脑 hosts 文件，再无则通过本地 dns 服务器（isp 提供）向根 DNS 服务器，顶级域名服务器，权威域名服务器向下迭代寻找域名对应 ip
域名解析完毕三次握手 syn 代表连接建立标识符，数值等于 seq 的值， ack 是收到响应标识符，值是 seq+1 表示期望下一数据报的序列号（TLS 加密实现 https）
请求资源 浏览器准备请求头 发送 get 请求获取资源，拿到响应头根据 contentType 解析资源，之后拿到响应体开始进行渲染
解析 DOM 树，解析 CSSOM，二者合并，计算元素的位置，生成 layout，之后布局，绘画
四次挥手 主动关闭方发送 FIN 进入关闭等待， 被动关闭方发送 ack 也进入关闭等待， 被动关闭方发送 FIN，主动关闭方发送 ack 并进入关闭倒计时，被动关闭方收到 ack 关闭

## vue2 和 vue3 区别

vue2 optionAPI, Vue3composable API
vue2 响应式用 defineProperty 实现，Vue3proxy
setup 语法糖（也是钩子函数一种）
各种 define 函数
钩子函数命名
vue2 v-for 优先 v-if 会导致 先循环渲染，再进行组件卸载，消耗性能， 3 相反但是一起使用 eslint 报错，v-if 访问不到 v-for 作用域
diff算法，vue2使用双端diff算法，vue3diff算法的核心是lis算法

## 强缓存和协商缓存

强缓存服务器会在发送的响应头里添加 cache-control，通过 max-age 来判断缓存是否过期，如果过期则请求新的资源，反之使用浏览器缓存，状态码是 200，不用和服务器通信 http1.0 使用 expires，值是资源过期时间
协商缓存服务器在响应头里添加 Etag 和 last-modify Etag 是根据资源计算的哈希值，last modify（http1.0 使用，1.1 备用）是资源上次的修改时间，浏览器根据这两个的值判断资源有无更改，没有更改就使用缓存资源，返回 304 响应码，有更改返回新资源，200 响应码，需要和服务器通信

## http 1.1/2.0/3.0

1.0 单一请求/响应，短链接，简陋 http 头

1.1 在 1.0 基础上添加了更完整的头部，新增了管道化，使一个 tcp 连接可以一次发送响应多个请求，但是收发必须顺序一致。（缺点）
添加了持久化连接，通过 keep-alive 控制，减少 tcp 连接建立次数。优化了缓存控制

2.0 在 1.1 的基础上实现了多路复用，解决收发顺序必须一致的问题，进行头部压缩，减少了 http 传输数据量，使用二进制分帧，使处理速度加快，增加服务器推送机制，一个请求服务器可以返回多个可能用到的资源（容易被 ddos 攻击）

3.0 整合 TLS 和 TCP 实现 QUIC 协议，在 UDP 上运行，但是效果和 TCP 一样，解决了队头阻塞的问题（从传输层上）

## router 的两种路由方式，history 和 hash

hash 通过锚点技术控制 url，所以 url 会带#
通过 js 控制页面可视
刷新不会丢失页面

history 通过 pushState 进行不刷新跳转 url
js 点击事件控制页面可视
但是会导致刷新丢失页面，因为并不存在当前路径对应的物理文件，生产环境需要服务器配置重定向

## watch 和 computed

watch 无缓存，computed 有缓存
computed 的缓存是基于副作用函数里依赖的属性执行的，当副作用函数里依赖过的属性发生变化，computed 缓存就失效，重新缓存
watch 定义后不会立即执行回调，添加 immediate true 可以强制立即执行
watch 对一个值进行变化监听，准确且灵活
computed 适用于复杂数据的计算和响应，减少计算次数，提升页面性能
watch 可以运行异步代码，computed不能运行异步代码（由于缓存机制computed监听不到异步数据的变化）

## every some

every 全部满足返回 true，遇到不满足的返回 false，所以传入空数组返回 true
some 有一个满足返回 true，传入空数组返回 false

## js 基本类型

Number String Undefined Null Symbol Boolean BigInt(Es11)

## diff 和 虚拟DOM

diff 算法进行同层比较，出现不同不管子元素，直接删除重新挂载新虚拟节点(暴力删除)

## == 和 ===

== 会对两边的变量进行隐式类型转换，即使类型不同转换后相同也是true，比如在 == 下，null和undefined相等

=== 不会对两边的变量进行类型转换，只有在值和类型都相等时才会返回true，是严格相等，在 === 下null和undefined不等

## null 和 undefined 的区别

null是空引用，说明变量还未初始化，六种基本类型之一，但是用typeof会显示object，这算历史遗留问题

undefined是未定义，变量初始化了还没赋值

null会被json保留，undefined会被忽略，null算是程序员手动清空，undefined则是js默认行为

## webpack 五大核心

entry入口
output输出
plugin插件
loader（module.rules）加载器
mode模式
