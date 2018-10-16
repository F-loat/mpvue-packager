# mpvue-builder

> mpvue 集成构建工具

## Quickstart

> https://github.com/F-loat/mpvue-quickstart

``` bash
vue init F-loat/mpvue-quickstart#next my-project
```

## 安装

``` bash
npm i mpvue-builder -D
```

## 使用

``` json
{
  "scripts": {
    "dev": "mpvue dev",
    "build": "mpvue build"
  }
}
```

## 配置

* 页面配置

通过 `-p` 或 `--pages` 指定页面配置文件，默认为 `src/pages.js`

* 打包配置

通过 `-c` 或 `--config` 指定自定义打包配置文件，会与默认配置做合并处理，默认为 `webpack.conf.js`

## 示例项目

* [ithome-lite](https://github.com/F-loat/ithome-lite) - IT之家第三方小程序版客户端
