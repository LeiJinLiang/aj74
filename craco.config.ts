//@ts-ignore
module.exports = {
    webpack: {
      configure: (webpackConfig: any) => {
        if (process.env.NODE_ENV === 'production') {
          // remove console in production
          const TerserPlugin = webpackConfig.optimization.minimizer.find((i: any) => i.constructor.name === 'TerserPlugin');
          if (TerserPlugin) {
            TerserPlugin.options.terserOptions.compress['drop_console'] = true;
          }
        }
  
        return webpackConfig;
      },
    },
};
