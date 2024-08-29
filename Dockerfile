FROM node:18 as builder

# 用户工作空间，用于打包到前端工作空间地址
ENV WORKSPACE_DIR workspace
ENV EXTENSION_DIR extensions

COPY . .

ENV ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/

RUN mkdir -p ${WORKSPACE_DIR}  &&\
    mkdir -p ${EXTENSION_DIR}

RUN yarn config set -H npmRegistryServer "https://registry.npmmirror.com" && \
    yarn --ignore-scripts --network-timeout 1000000 && \
    yarn run build && \
    yarn run download:extensions && \
    rm -rf ./node_modules

FROM node:18 as app

ENV WORKSPACE_DIR /workspace
ENV EXTENSION_DIR /root/.sumi/extensions
ENV EXT_MODE js
ENV NODE_ENV production

RUN mkdir -p ${WORKSPACE_DIR}  &&\
    mkdir -p ${EXTENSION_DIR}

WORKDIR /release

COPY ./configs/docker/productionDependencies.json package.json

RUN yarn config set -H npmRegistryServer "https://registry.npmmirror.com" && \
    yarn --network-timeout 1000000

COPY --from=builder dist dist
COPY --from=builder dist-node dist-node
COPY --from=builder hosted hosted
COPY --from=builder extensions /root/.sumi/extensions

EXPOSE 8000

CMD [ "node", "./dist-node/server/index.js" ]
