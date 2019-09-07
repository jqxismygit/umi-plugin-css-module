# umi-plugin-umi-plugin-css-module

[![NPM version](https://img.shields.io/npm/v/umi-plugin-umi-plugin-css-module.svg?style=flat)](https://npmjs.org/package/umi-plugin-umi-plugin-css-module)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-umi-plugin-css-module.svg?style=flat)](https://npmjs.org/package/umi-plugin-umi-plugin-css-module)



## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
      ['umi-plugin-css-modules', {
        cssModule: {
          include: /\.module\.css$/
        },
        lessModule: {
          include: /\.module\.less$/
        },
        sassModule: {
          include: /\.module\.(sass|scss)$/
        }
    }]
  ],
}
```

## Options

TODO

## LICENSE

MIT
