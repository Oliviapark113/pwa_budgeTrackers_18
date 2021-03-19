const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");


const config = {
    // Update the entry point
    entry: "./public/index.js",
    output: {
      // Set the path and filename for the output bundle (hint: You will need to use "__dirname")
      path: __dirname+ "/public/dist/",
      filename: "bundle.js"
    },
    mode: "production",
    plugins: [
      new WebpackPwaManifest({
        publicPath: '/dist',
        inject: false,
        fingerprints: false,
        name: 'Budget Tracker App',
        filename: "manifest.json",
        short_name: 'Budget App',
        description: 'My awesome Progressive Web App!',
        start_url:'/',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('public/icons/icon-512x512.png'),
            sizes: [ 192, 512], // multiple sizes
            
          }
        
        ]
      })
    ]
  };
  
  module.exports = config;
  