/**
 * babel只能处理语法，但是像Promise一类的新的语法，就需要利用corejs
 * 
 * core-js是JavaScript标准库的 polyfill（垫片/补丁）
 * 新功能的ES代码转换为大部分现代浏览器都可以支持
 */

const path = require('path') // 引入path包
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// webpack中所有的配置信息都应该写在module.exports当中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在目录
  output: {
    path: path.resolve(__dirname, "dist"), // 指定打包文件的目录
    filename: "bundle.js", // 打包后文件的名称
    
    // webpack在打包的时候，为了污染作用域，会在js的最外层套一个立即执行的箭头函数
    // 这个箭头函数不是我们写的，不会经过babel进行转换
    // 这样导致了ie当中无法运行代码，可以通过下面的配置项来解决这个问题，即不添加箭头函数
    environment: {
      arrowFunction: false
    }
  },

  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件，是一个正则表达式
        test: /\.ts$/,
        // 要用到的loader
        // 从后往前执行loader
        use: [
          {
            loader: "babel-loader", // 指定加载器
            options: {
              // 设置预定义文件的环境
              presets: [
                [
                  "@babel/preset-env", // 指定环境的插件
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "88",
                      "ie": "11"
                    },
                    // 指定core-js的版本，可以看package.json
                    "corejs": "3",
                    // 使用corejs的方式，usage表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          "ts-loader"
        ],
        exclude: /node_modules/, // 指定排除的文件，是一个正则表达式
      }
    ]
  },

  // 配置Webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      title: "HTML自定义的title",
      // template: "./src/index.html", // HTMLWebpackPlugin可以自动生成html文件，也可以通过template自己提供一个文件
    }),
    new CleanWebpackPlugin(), // 每次打包之前，删除上次的打包文件
  ],

  // 用来设置引用模块
  // 如果不添加这个配置项，则代码当中使用模块化，就会报错
  // 凡是以.ts和.js结尾的文件都可以作为模块使用
  resolve: {
    extensions: ['.ts', '.js']
  }
}