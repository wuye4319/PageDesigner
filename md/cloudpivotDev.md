

### 云枢前期迁入示例 指引
一. 以自定义组件模式自已开发自测。
二. 完成后提交集成成全局公有组件。
TIP:云枢需要token,需要拿到正式token人为写入localStorage(本地开发现阶段云枢还没有更好方法拿到token)
>由于云枢现阶段开发需要有相关依赖及配置，所以每个页面需要通过页面事件注入相关依赖等。
所以本地开发可以在设计器根目录env.local.json配有接口反向代理

****线上环境需要根据实际情况在页面事件（页面创建后）中配置相关的云枢相关环境变量。****
###### 本地开发时页面事件（页面创建后） 示例
```javascript
function setConfig() {
    /* 云枢环境变量 */
    window.config = {
        client_id: 'demo',
        secret: '8a5da52ed126447d359e70c05721a8aa',
        redirectHost: 'http://localhost:8001',
        oauthHost: '/cloudpivotOauthHost',
        apiHost: '/cloudpivoApiHost',
        scope: 'oauth',
        portalHost: 'http://localhost:8001'
    };
    window.Environment = {
        appCode: 'xll'
    }
}
```

###### 线上开发时页面事件（页面创建后）示例
```javascript
function setConfig() {
    var host = window.location.protocol + '//' + window.location.hostname;
     window.config = {
        oauthHost: host + ':8080', //注意跨域问题，如果设计器与云枢项目不同域
        redirectHost: host, 
        client_id: 'api',
        scope: 'read',
        secret: 'c31b32364ce19ca8fcd150a417ecce58',
        apiHost: host + ':8080',  //注意跨域问题，如果设计器与云枢项目不同域
        portalHost: host,
    };
    window.Environment = {
        appCode: 'xll' //云枢需要用到的appCode
    }
}

//或者 (设计器测试环境用法) 
function setConfig() {
     window.config = {
        oauthHost: 'http://47.106.247.123:8080',
        redirectHost: 'http://120.25.77.12',
        client_id: 'demo',
        scope: 'read',
        secret: 'c31b32364ce19ca8fcd150a417ecce58',
        apiHost: 'http://47.106.247.123:8080',
        portalHost: 'http://120.25.77.12',
    };
    window.Environment = {
        appCode: 'xll'
    }
}

```
###### 本地开发env.local.json反向代理 示例
>
```javascript
"/cloudpivotOauthHost": {
            "target": "http://47.106.247.123:8080",//该地址根据实际情况配置 对应云枢oauthHost
            "changeOrigin": true,
            "pathRewrite": {
                "^/cloudpivotOauthHost":"/"
            }
        },
 "/cloudpivoApiHost": {
            "target": "http://47.106.247.123:8080",//该地址根据实际情况配置 对应云枢apiHost
            "changeOrigin": true,
            "pathRewrite": {
                "^/cloudpivoApiHost":"/"
            }
        }
```

