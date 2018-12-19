import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import React from 'react';
import Loadable from 'react-loadable';

import manifest from '../../build/manifest.json';
import getAssetsByRoute from '../../../index';
import App from '../shared/app';

const app = express();
app.use(express.static("build/client"))

app.get("*", async (req: Request, res: Response) => {
  const context = {};
  const Root = () => (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const markup = renderToString(<Root />);
  const { styles, scripts } = getAssetsByRoute(req.originalUrl, manifest);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Example</title>
        ${styles.map(style => {
          return `<link href="${style}" rel="stylesheet" />`
        }).join('\n')}
      </head>
      <body>
        <div id="app">${markup}</div>
        ${scripts.map(script => {
          return `<script src="${script}"></script>`
        }).join('\n')}
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
});

