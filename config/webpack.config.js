const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

if (env === 'prod' || env === 'dev') {
  useDefaultConfig[env].resolve.alias = {
    "@core": path.resolve('./src/@core/'),
    "@shared": path.resolve('./src/@shared/'),
    "@pages": path.resolve('./src/pages/'),
    "@env": path.resolve('./src/environments/'),
    "@theme": path.resolve('./src/theme/'),
    "@IFolder": path.resolve('./src/IFolder/')
  };
} else {
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@core": path.resolve('./src/@core/'),
    "@shared": path.resolve('./src/@shared/'),
    "@pages": path.resolve('./src/pages/'),
    "@env": path.resolve('./src/environments/'),
    "@theme": path.resolve('./src/theme/'),
    "@IFolder": path.resolve('./src/IFolder/')
  };
}

module.exports = function () {
  return useDefaultConfig;
};


