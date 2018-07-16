var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    entry:'./src/app.js',
    // {
    //     main:"./src/script/main.js",
    //     a:'./src/script/a.js',
    //     b:'./src/script/b.js',
    //     c:'./src/script/c.js'
    // },
    output:{
        path:__dirname + '/dist',
        filename:'js/[name]-[chunkhash].js',
        // publicPath:'http://b2b.sunrf.cn'
    },
    module:{
        rules: [
            { 
                test: /\.js$/,
                exclude: path.resolve(__dirname,'node_modules'),//包含的文件夹
                include: path.resolve(__dirname,'src'),//包含的文件夹
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/i,
                loader:'file-loader',
                query:{
                    limit:2000,
                    name:'assets/[name]-[hash:5].[ext]'
                }
            },
            {
                test: /\.tpl$/,
                loader:'ejs-loader'
            },
            {
                test: /\.html$/,
                loader:'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader'
                ]
            },
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
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject:'body',
            title:'webpack a',
            date: new Date(),
            // minify:{
            //     removeComments:true,
            //     collapseWhitespace:true
            // },
            // chunks:['main','a'],//包含哪些chunks
            // excludeChunks:['b','c'] //排除的chunks
        }),
        // new htmlWebpackPlugin({
        //     filename:'b.html',
        //     template:'index.html',
        //     inject:'body',
        //     title:'webpack b',
        //     excludeChunks:['a','c']
        // }),
        // new htmlWebpackPlugin({
        //     filename:'c.html',
        //     template:'index.html',
        //     inject:'body',
        //     title:'webpack c',
        //     excludeChunks:['a','b']
        // })
    ]
}