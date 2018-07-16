安装：

```
npm install webpack -g
```

Webpack打包文件：

```
webpack --mode development  hello.js --output hello.bundle.js
```

安装loader: 

```
npm install css-loader style-loader  --savr-dev
```

引入loader:

```
require('style-loader!css-loader!./style.css');
```

监听文件的变化：

```
webpack --mode development  hello.js --output hello.bundle.js --module-bind 'css=style-loade!css-loader' --watch
```

Webpack设置配置文件: 

```
webpack –config webpack.dev.config.js
```

使用npm 启动webpack: npm run dev 需要在package.json的scripts配置webpack命令：

```
"webpack": "webpack --config webpack.config.js --progress --display-modules --colors --display-reasons"
```

Webpack多入口打包防止文件覆盖:
可使用文件名+hash+chunkhash的方法，其中chunkhash每次都会不同，hash代表的是本次打包hash
安装html-webpack-plugin: 

```
npm install html-webpack-plugin –save-dev
```

webpack.config.js引入插件：

```
plugins:[
        new htmlWebpackPlugin({
            template:'index.html',
            inject:'head',
            title:'webpack heloo',
            date: new Date()
        })
    ]
```

Html-webpack-plugin的模板语法:

```
<%= htmlWebpackPlugin.options.title %> 
//htmlWebpackPlugin是你在webpack.config.js引入该插件时定义的变量名称
```

htmlWebpackPlugin存在的两个属性:
files和options,可以通过模板语法和files来定义js文件在head还是body引入publicPath引入文件配置绝对路径：

```
output:{
        path:__dirname + '/dist',
        filename:'js/[name]-[chunkhash].js',
        publicPath:'http://b2b.sunrf.cn'
    }
```

Index.html文件进行压缩minify:

```
plugins:[
        new htmlWebpackPlugin({
            template:'index.html',
            inject:'head',
            title:'webpack heloo',
            date: new Date(),
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        })
    ]
```

打包多页面：

```
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        main:"./src/script/main.js",
        a:'./src/script/a.js',
        b:'./src/script/b.js',
        c:'./src/script/c.js'
    },
    output:{
        path:__dirname + '/dist',
        filename:'js/[name]-[chunkhash].js',
        publicPath:'http://b2b.sunrf.cn'
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'a.html',
            template:'index.html',
            inject:'head',
            title:'webpack a',
            date: new Date(),
            // minify:{
            //     removeComments:true,
            //     collapseWhitespace:true
            // },
            // chunks:['main','a'],//包含哪些chunks
            excludeChunks:['b','c'] //排除的chunks
        }),
        new htmlWebpackPlugin({
            filename:'b.html',
            template:'index.html',
            inject:'head',
            title:'webpack b',
            excludeChunks:['a','c']
        }),
        new htmlWebpackPlugin({
            filename:'c.html',
            template:'index.html',
            inject:'head',
            title:'webpack c',
            excludeChunks:['a','b']
        })
    ]
}
```

优化减少http请求文件，可以使用模板语言来实现：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <script type="text/javascript">
        <%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
    </script>
</head>
<body>
    <% for(k in htmlWebpackPlugin.files.chunks) { %>
        <% if (k !== 'main') { %>
            <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks[k].entry %>">
               
            </script>
        <% } %>
    <% } %>
</body>
```

Webpack使用babel-loader转换es6语法：

```
npm install --save-dev babel-loader babel-core
npm install --save-dev babel-preset-latest
```

webpack.config.js的module配置babel:

```
rules: [
            { 
                test: /\.js$/,
                exclude: /node_modules/,//包含的文件夹
                include: /src/,//包含的文件夹
                loader: "babel-loader"
            }
        ]
```

打包的时候添加浏览器前缀(css后处理器)：

```
npm install postcss-loader –save-dev
npm install autoprefixer –save-dev
```

在与webpack.config.js同级目录下添加postcss.config.js文件:

```
module.exports = {

    plugins: [
  
      require('autoprefixer')({
  
         browsers:['last 5 versions']
  
      })
  
    ]
  
}
```

Webpack.config.js的module添加postcss:

```
module:{
        rules: [
            { 
                test: /\.js$/,
                exclude: path.resolve(__dirname,'node_modules'),//包含的文件夹
                include: path.resolve(__dirname,'src'),//包含的文件夹
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader'
                ]
            }
        ]
    }
```

安装less和less-loader:

```
npm install less –save-dev
npm I install less-loader –save-dev
```

Webpack.config.js的module添加less-loader:

```
module:{
        rules: [              
            {
                test: /\.less$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader',
                  'less-loader'
                ]
            }
        ]
    }
```

安装html-loader;

```
npm install html-loader –save-dev
Webpack.config.js的module添加html-loader:
module:{
        rules: [
            {
                test: /\.html$/,
                loader:'html-loader'
            }
    }
```

安装ejs-loader,用于处理html模板;

```
npm install ejs-loader –save-dev
```

Webpack.config.js的module添加ejs-loader:

```
module:{
        rules: [
            {
                test: /\.tpl$/,
                loader:'ejs-loader'
            }
    }
```

安装file-loader,用于处理图片

```
npm install file-loader –save-dev
```

Webpack.config.js的module添加file-loader:

```
module:{
        rules: [
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                loader:'file-loader'
            }
    }
```