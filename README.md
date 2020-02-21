# components-ts

由于云枢相关依赖是内网npm 所以需要切换源

npm set registry http://nexus.h3yun.com:8888/repository/npm-all/

# 设计器项目

# 目标结构说明

src     源码资源
  designer   设计器外壳
  website    可视区域
  wrapper    容器
  admin      源码管理平台
static  静态资源
server  服务部署
public  HTML模板
npm     包化管理
dist    编译后资源


# 小程序预研

微信小程序：
1、支持内嵌web-view组件
2、web-view组件支持jsSDK
3、通过jsSDK能调用原生api接口的功能
4、设计器可以使用web-view组件对接，来调用jsSDK来实现部分原生功能

钉钉小程序：
1、支持创建H5版本的微应用
2、微应用中提供了jsapi
3、通过jsapi调用原生接口实现功能

结论是：可以支持小程序，但是需要花时间去对接不同小程序的jsapi层

# 全局状态库
1、全局状态更符合单向数据流的理念
2、可以加以封装，使用更加简单

# 发布订阅
1、保持组件内部私有属性的封装性，不需要将状态属性进行全局性暴露，防止变量污染
缺点：1.会造成数据乱流，2.暴露的事件名，也会造成污染，不宜维护

# 代码事件的环境本身是封闭式的，我暴露什么，用户才能使用，我们要讨论下，到底要暴露哪些信息？
