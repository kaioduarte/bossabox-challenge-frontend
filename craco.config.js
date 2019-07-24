const { when, whenProd } = require('@craco/craco')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  webpack: {
    alias: {
      ...whenProd(
        () => ({
          react: 'preact/compat',
          'react-dom': 'preact/compat'
        }),
        []
      )
    },
    plugins: [
      ...when(
        Boolean(process.env.ANALYZE),
        () => [new BundleAnalyzerPlugin()],
        []
      )
    ]
  }
}
