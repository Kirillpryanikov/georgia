const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

if (env === 'prod' || env === 'dev') {
  useDefaultConfig[env].resolve.alias = {
    "@core": path.resolve('./src/@core/'),
    "@shared": path.resolve('./src/@shared/'),
    "@pages": path.resolve('./src/pages/'),
    "@env": path.resolve('./src/environments/')
  };
} else {
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@core": path.resolve('./src/@core/'),
    "@shared": path.resolve('./src/@shared/'),
    "@pages": path.resolve('./src/pages/'),
    "@env": path.resolve('./src/environments/')
  };
}

module.exports = function () {
  return useDefaultConfig;
};


