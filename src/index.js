// ref:
// - https://umijs.org/plugin/develop.html


const ruleMap = {
  'css': {
    rule: 'css',
    loaders: [
      {
        loader: 'extract-css-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      {
        loader: 'postcss-loader'
      }
    ]
  },
  'less': {
    rule: 'less',
    loaders: [
      {
        loader: 'extract-css-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      {
        loader: 'postcss-loader'
      }
    ]
  },
  'sass': {
    rule: 'sass',
    loaders: [
      {
        loader: 'extract-css-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      {
        loader: 'postcss-loader'
      }
    ]
  }
}

const applyCssModule = (config, options, key) => {
  if (options && options.include) {
    const rule = ruleMap[key].rule;
    const loaders = ruleMap[key].loaders;
    config.module.rule(`${rule}-module`).test(options.include);
    loaders.forEach(({ loader, options }) => {
      let loaderClone = config.module.rule(rule).use(loader).get('loader');
      let ops = config.module.rule(rule).use(loader).get('options');
      config.module.rule(`${rule}-module`).use(loader).loader(loaderClone).options({ ...ops, ...options })
    });
    //关闭css的modules
    config.module.rule(rule).exclude.add(options.include).end();
    config.module.rule(rule).use('css-loader').tap(options => Object.assign(options, { modules: false }));
  }
}

export default function (api, options) {

  const { cssModule, lessModule, sassModule } = options;
  // Example: output the webpack config
  api.chainWebpackConfig(config => {
    applyCssModule(config, cssModule, 'css');
    applyCssModule(config, lessModule, 'less')
    applyCssModule(config, sassModule, 'sass')
  });


}
