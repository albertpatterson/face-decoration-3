const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

class InlineChunkHtmlPlugin {
  constructor(htmlWebpackPlugin, tests) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.tests = tests;
  }

  getInlinedTag(publicPath, assets, tag) {
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return tag;
    }
    const scriptName = publicPath
      ? tag.attributes.src.replace(publicPath, '')
      : tag.attributes.src;
    if (!this.tests.some((test) => scriptName.match(test))) {
      return tag;
    }
    const asset = assets[scriptName];

    if (asset == null) {
      return tag;
    }
    return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
  }

  apply(compiler) {
    let publicPath = compiler.options.output.publicPath || '';
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', (compilation) => {
      const tagFunction = (tag) =>
        this.getInlinedTag(publicPath, compilation.assets, tag);

      const hooks = this.htmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', (assets) => {
        assets.headTags = assets.headTags.map(tagFunction);
        assets.bodyTags = assets.bodyTags.map(tagFunction);
      });

      // Still emit the runtime chunk for users who do not use our generated
      // index.html file.
      // hooks.afterEmit.tap('InlineChunkHtmlPlugin', () => {
      //   Object.keys(compilation.assets).forEach(assetName => {
      //     if (this.tests.some(test => assetName.match(test))) {
      //       delete compilation.assets[assetName];
      //     }
      //   });
      // });
    });
  }
}

const deleteMainPlugin = {
  apply: (compiler) => {
    compiler.hooks.afterEmit.tap('DeleteMainPlugin', async (compilation) => {
      await fs.promises.rm('./dist/main.js');
      await fs.promises.cp('./STACKBLITZ_README.md', './dist/README.md');
      await fs.promises.rm('./dist/code.js');
      await fs.promises.cp('./src/code.js', './dist/code.js');
    });
  },
};

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/main/]),
    deleteMainPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /.*code\.js$/i,
        type: 'asset/resource',
        generator: {
          filename: 'code.js',
        },
      },
    ],
  },
};
