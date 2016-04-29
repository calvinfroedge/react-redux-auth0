import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', (req, res)=>{
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});

app.listen(port, '0.0.0.0', (err)=>{
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
