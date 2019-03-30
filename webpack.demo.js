const webpack = require('webpack');
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './demo/main',
  output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, './demo/dist')
  },

  plugins: [
      // new MiniCssExtractPlugin({
      //     filename: 'css/[name].[chunkhash].css'
      // }),
      new VueLoaderPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: './demo/index.html',
        inject: true
      })
  ],

  devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: 'dist',
		host: 'localhost',
		port: 8080
	},

	module: {
		rules: [
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
              cssSourceMap: true,
              cacheBusting: true,
              transformToRequire: {
                  source: 'src'
              }
          }
      },
			{
          test: /\.js$/,
          include: [path.resolve(__dirname, 'src')],
          loader: 'babel-loader',
              options: {
              plugins: ['syntax-dynamic-import', 'transform-object-rest-spread'],
          },
          exclude: ['/node_modules']
      },
      {
          test: /\.css$/,
          use: [
              // 'style-loader',
              // MiniCssExtractPlugin.loader,
              'css-loader'
          ]
      }
		]
  },
    
  resolve: {
      alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.join(__dirname, 'src')
      }
  },
	
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
}