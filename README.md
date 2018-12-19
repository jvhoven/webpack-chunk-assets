# webpack-chunk-assets
Helper function to automatically retrieve assets that belong to the requested route for use in server-side rendering. Currently only supports route-based code splitting.

![](https://img.shields.io/travis/jvhoven/webpack-chunk-assets.svg?style=for-the-badge)

## Use

### Setup code-splitting

Make sure you are code-splitting by utilizing dynamic imports. If you're unsure how this works, either check out the example or read up on [Code Splitting with Webpack](https://webpack.js.org/guides/code-splitting/).

For this helper function to fetch the appropriate assets for the current route, it is required to name your chunks to match your route name. For example, in order to load the assets belonging to `/home`, it is required to have a chunk called `home`. Luckily Webpack provides the option to rename your dynamic import:

```JavaScript
import(/* webpackChunkName: "home" */'./pages/home')
```

### Configure the manifest plugin

In order to retrieve the assets that are associated to the current route this package utilizes the `webpack-assets-manifest` plugin. Install it with `yarn add webpack-assets-manifest --dev` and add it to the `plugins` section in your Webpack configuration.

```JavaScript
...
const WebpackAssetsManifest = require('webpack-assets-manifest');
...
plugins: [
  ...
  new WebpackAssetsManifest({
    publicPath: true, // Appends the publicPath to the outputted filename.
    output: 'YOUR_OUTPUT_PATH/manifest.json'),
    writeToDisk: true
  });
  ...
]
```

Now you're all set to retrieve the appropriate assets on the server-side! Add the following to your server-side entrypoint:

```JavaScript
...
import manifest from '../../build/manifest.json';
import getAssetsByRoute from 'webpack-chunk-assets';
...
app.get("*", async (req, res) => {
  const { styles, scripts } = getAssetsByRoute(req.originalUrl, manifest);

  res.send(`
    ...
    ${styles.map(style => {
      return `<link href="${style}" rel="stylesheet" />`
    }).join('\n')}
    ...
    ${scripts.map(script => {
      return `<script src="${script}"></script>`
    }).join('\n')}
  `)
}
```

If you're having trouble be sure to check out the `example`.