const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const SpikeDatoCMS = require('spike-datocms')
const env = process.env.SPIKE_ENV
const locals = {}

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: (ctx) => { return Object.assign(
      locals,
      { pageId: pageId(ctx) }
    )},
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards(),
  server: { open: false },
  plugins: [
    new SpikeDatoCMS ({
      addDataTo: locals,
      token: '8ea4a0a71742a4fe364eec58a2de93',
      models: [
        {
          name: 'game',
          json: 'games.json'
        }
      ],
      json: 'data.json'
    })
  ]
}
