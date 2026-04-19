process.env.NODE_ENV = 'development';

const { defineConfig } = require("cypress");
const path = require("path");


const webpackConfig = require(path.resolve(
  __dirname,
  "node_modules/react-scripts/config/webpack.config.js"
))('development'); 


delete webpackConfig.output.devtoolModuleFilenameTemplate;

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: webpackConfig,
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false, 
  },
});
