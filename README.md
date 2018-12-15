# mpvue-packager

> mpvue 集成构建工具


## Quickstart

``` bash
vue init F-loat/mpvue-packager my-project
```


## 安装

``` bash
npm i -D mpvue-packager

npm i -D mpvue-packager-mp-plugin
npm i -D mpvue-packager-h5-plugin
```


## 使用

``` json
{
  "scripts": {
    "dev": "mpvue dev",
    "build": "mpvue build",
    "dev:h5": "mpvue dev --mode h5",
    "build:h5": "mpvue build --mode h5",
  }
}
```


## 配置

* 打包配置

通过 `-c` 或 `--config` 指定自定义打包配置文件，默认为 `webpack.conf.js`

* 打包模式

通过 `-m` 或 `--mode` 指定打包模式，可选值 `['mp', 'h5']`, 默认为 `mp`，即小程序平台打包

* 输出路径

通过 `-o` 或 `--output` 指定输出路径，默认为 `dist`

* 监听端口

通过 `-p` 或 `--port` 指定监听端口，默认为 `8080`

* 目标平台

通过 `-t` 或 `--target` 指定目标平台，可选值 `['wx', 'swan']`, 默认为 `wx`

* 代码分析

通过 `--analyze` 指定启用分析插件，生产模式下有效，默认为 `false`

* 自动打开

通过 `--open` 指定自动打开浏览器，默认为 `false`


## Tips

* 可通过 `process.env.NODE_ENV` 判断当前构建环境，可选值 `['production', 'development']`

* 可通过 `process.env.MODE` 判断当前构建模式，可选值 `['mp', 'h5']`

* 自定义配置支持 `['object', 'function']` 两种形式，`object` 类型会与默认配置做合并处理，`function` 类型的入参为现有配置，需返回修改后的配置

* 可通过 package.json 的 packagerOptions 属性对内部 [config](./lib/config.js) 进行覆盖


## Change log

* v0.2.2

  - [fix] 外部配置读取
  - [feat] 整合 lint 依赖
  - [feat] 优化 loader 顺序

* v0.2.1

  - [fix] 文件发布规则

* v0.2.0

  - [feat] 分离不同平台配置
  - [feat] 支持通过 package.json 覆盖配置

* v0.1.8

  - [fix] 生产环境打包配置
  - [feat] 更新 mpvue-entry

* v0.1.5

  - [feat] 新增打包进度显示
  - [feat] 新增监听端口、代码分析等配置
  - [feat] 新增多平台兼容支持
  - [feat] 增强自定义配置能力

* v0.1.4

  - [feat] 注入环境变量 `process.env.NODE_ENV` 及 `process.env.MODE`
  - [feat] 新增输出路径配置项
  - [refactor] 统一配置文件
  - [fix] 修正 h5 热更新配置

* v0.1.3

  - [fix] 修正 vue-loader 配置
  - [fix] 修正小程序输出路径配置

* v0.1.2

  - [feat] 新增 h5 打包配置

* v0.1.1

  - [feat] 支持小程序打包


## 示例项目

* [ithome-lite](https://github.com/F-loat/ithome-lite) - IT之家第三方小程序版客户端
