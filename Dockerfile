FROM node:14 as builder

# 用户工作空间，用于打包到前端工作空间地址
ENV WORKSPACE_DIR workspace
ENV EXTENSION_DIR extensions

COPY . .

ENV ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/

RUN mkdir -p ${WORKSPACE_DIR}  &&\
    mkdir -p ${EXTENSION_DIR}

RUN yarn --ignore-scripts && \
    yarn run build && \
    yarn run download:extensions

FROM node:14 as app

ENV WORKSPACE_DIR /workspace
ENV EXTENSION_DIR /root/.sumi/extensions
ENV EXT_MODE js
ENV NODE_ENV production

RUN mkdir -p ${WORKSPACE_DIR}  &&\
    mkdir -p ${EXTENSION_DIR}

WORKDIR /release

COPY ./configs/docker/productionDependencies.json package.json

RUN yarn

COPY --from=builder dist dist
COPY --from=builder dist-node dist-node
COPY --from=builder hosted hosted
COPY --from=builder extensions /root/.sumi/extensions

EXPOSE 8000

CMD [ "node", "./dist-node/server/index.js" ]
