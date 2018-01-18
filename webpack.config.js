const path = require('path'),
			webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      ImageminPlugin = require('imagemin-webpack-plugin').default;

const extractCSS = new ExtractTextPlugin('main.css');

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/js/index.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].bundle.js"
	},
  devServer: {
    compress: true,
    stats: "errors-only",
    open: true
  },
	module: {
    rules: [
			{
	      test: /\.js$/,
	      exclude: /node_modules/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: [
	            ['env', { 
	            	modules: false,
	            }]
	          ]
	        }
	      }
	    },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader'
        }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/css'),
        loader: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader'
          }
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: path.join(__dirname, 'src/imgs'),
        use: {
          loader: 'responsive-loader',
          options: {
            sizes: [300],
            placeholder: true,
            placeholderSize: 50,
            name: 'imgs/[name]-[hash].[ext]'
          }
        }
      }
    ]
	},
  plugins: [
  	extractCSS,
    new HtmlWebpackPlugin({
      template: 'src/template.pug'
    }),
    new ImageminPlugin({test: /\.(png|jpg|gif)$/})
  ]
}