"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ref:
// - https://umijs.org/plugin/develop.html
var ruleMap = {
  'css': {
    rule: 'css',
    loaders: [{
      loader: 'extract-css-loader'
    }, {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }, {
      loader: 'postcss-loader'
    }]
  },
  'less': {
    rule: 'less',
    loaders: [{
      loader: 'extract-css-loader'
    }, {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }, {
      loader: 'postcss-loader'
    }]
  },
  'sass': {
    rule: 'sass',
    loaders: [{
      loader: 'extract-css-loader'
    }, {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }, {
      loader: 'postcss-loader'
    }]
  }
};

var applyCssModule = function applyCssModule(config, options, key) {
  if (options && options.include) {
    var rule = ruleMap[key].rule;
    var loaders = ruleMap[key].loaders;
    config.module.rule("".concat(rule, "-module")).test(options.include);
    loaders.forEach(function (_ref) {
      var loader = _ref.loader,
          options = _ref.options;
      var loaderClone = config.module.rule(rule).use(loader).get('loader');
      var ops = config.module.rule(rule).use(loader).get('options');
      config.module.rule("".concat(rule, "-module")).use(loader).loader(loaderClone).options(_objectSpread({}, ops, {}, options));
    }); //关闭css的modules

    config.module.rule(rule).exclude.add(options.include).end();
    config.module.rule(rule).use('css-loader').tap(function (options) {
      return Object.assign(options, {
        modules: false
      });
    });
  }
};

function _default(api, options) {
  var cssModule = options.cssModule,
      lessModule = options.lessModule,
      sassModule = options.sassModule; // Example: output the webpack config

  api.chainWebpackConfig(function (config) {
    applyCssModule(config, cssModule, 'css');
    applyCssModule(config, lessModule, 'less');
    applyCssModule(config, sassModule, 'sass');
  });
}