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
This project is used to show how to run OpenSumi on Web.

![perview](https://img.alicdn.com/imgextra/i2/O1CN01SYtcfI25R80gBjBTI_!!6000000007522-2-tps-1337-918.png)

English | [简体中文](./README-zh_CN.md)

## Quick Start

```bash
$ git clone git@github.com:opensumi/ide-startup.git
$ cd ide-startup
$ yarn
$ yarn start
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080).

You can add `workspaceDir` to the URL to open the specified directory, for example `http://0.0.0.0:8080?workspaceDir=/path/to/dir`.

## Project Structure

```bash
.
├── extensions                  # The Buit-in extensions
├── configs                     # Build configuration
├── src
│   ├── browser
│   └── node
├── tsconfig.json
├── package.json
└── README.md
```

## Use Docker

```bash
# Pull the image
docker pull ghcr.io/opensumi/opensumi-web:latest

# Run
docker run --init --rm -d  -p 8080:8000/tcp ghcr.io/opensumi/opensumi-web:latest
```

Open `http://0.0.0.0:8080`

## License

Copyright (c) 2019-present Alibaba Group Holding Limited, Ant Group Co. Ltd.

Licensed under the [MIT](LICENSE) license.
