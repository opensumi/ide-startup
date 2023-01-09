<h1 align="center">OpenSumi Web Sample</h1>
<div align="center">

[![License][license-image]][license-url]
[![Docker Image CI][docker-image]][docker-uri]
[![CLA assistant][cla-image]][cla-url]


[docker-uri]: https://github.com/opensumi/ide-startup/actions/workflows/docker-image.yml
[docker-image]: https://github.com/opensumi/ide-startup/actions/workflows/docker-image.yml/badge.svg
[license-url]: https://github.com/opensumi/ide-startup/blob/master/LICENSE
[license-image]: https://img.shields.io/npm/l/@opensumi/ide-core-common.svg
[cla-image]: https://cla-assistant.io/readme/badge/opensumi/core
[cla-url]: https://cla-assistant.io/opensumi/core

</div>

本项目用于展示如何在 Web 下运行 OpenSumi。

![perview](https://img.alicdn.com/imgextra/i2/O1CN01SYtcfI25R80gBjBTI_!!6000000007522-2-tps-1337-918.png)

[English](./README.md) | 简体中文

### Quick Start

```bash
$ git clone git@github.com:opensumi/ide-startup.git
$ cd ide-startup
$ yarn
$ yarn start
```

浏览器打开 [http://127.0.0.1:8080](http://127.0.0.1:8080)。

你可以通过添加 `workspaceDir` 参数至 URI 来实现对指定目录文件的方案，例如：`http://0.0.0.0:8080?workspaceDir=/path/to/dir`.

### 目录结构

```bash
.
├── extensions                  # 内置插件安装位置
├── configs                     # 构建配置
├── src
│   ├── browser
│   └── node
├── tsconfig.json
├── package.json
└── README.md
```

## 使用 Docker 镜像

```bash
# Pull the image
docker pull ghcr.io/opensumi/opensumi-web:latest

# Run
docker run --init --rm -d  -p 8080:8000/tcp ghcr.io/opensumi/opensumi-web:latest
```

浏览器打开 `http://0.0.0.0:8080` 访问。

## 协议

Copyright (c) 2019-present Alibaba Group Holding Limited, Ant Group Co. Ltd.

本项目采用 [MIT](LICENSE) 协议。
