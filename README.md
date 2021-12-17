## OpenSumi Web 集成示例

本项目为基于 OpenSumi 框架的 Web 版 IDE 集成示例

### 项目结构
```bash
.
└── workspace                   # 工作目录
├── extensions                  # 插件目录
├── src
│   ├── browser
│   └── node
├── tsconfig.json
├── webpack.browser.config.js
├── webpack.node.config.js
├── package.json
└── README.md
```

### 启动

```bash
$ git clone git@github.com:opensumi/ide-startup.git
$ cd startup
$ yarn install				# 安装依赖
$ yarn run prepare			# 运行 prepare，编译 node 和 webworker 两个插件环境
$ yarn run start:client			# 启动前端
$ yarn run start:server			# 启动后端
```

浏览器打开 http://127.0.0.1:8080

![KAITIAN](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/239771/1599814353078-d13b1cbb-c3c9-4406-aad9-3ec63f7c516e.png)

