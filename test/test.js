const assert = require('assert');
const getAssetsByRoute = require('../index').default;
const manifest = require('./manifest.json');

describe('getAssetsByRoute', () => {
  it('should return the appropriate assets', () => {
    const { scripts, styles } = getAssetsByRoute('/home', manifest);
    assert.deepStrictEqual(scripts, ['/home.bundle.400c0d45.js', '/vendor~project~home.bundle.400c0d45.js']);
    assert.deepStrictEqual(styles, ['/2.400c0d45.css']);
  });

  it('should return no assets', () => {
    const { scripts, styles } = getAssetsByRoute('/articles', manifest);
    assert.deepStrictEqual(scripts, []);
    assert.deepStrictEqual(styles, []);
  });

  it('should return the appropriate assets with a longer link', () => {
    const { scripts, styles } = getAssetsByRoute('/blog/a-blog-article', manifest);
    assert.deepStrictEqual(scripts, ['/blog.bundle.400c0d45.js']);
    assert.deepStrictEqual(styles, ['/1.400c0d45.css']);
  });

  it('should return appropriate shared assets', () => {
    const { scripts, styles } = getAssetsByRoute('/project/orbit', manifest);
    assert.deepStrictEqual(scripts, ['/project.bundle.400c0d45.js', '/vendor~project~home.bundle.400c0d45.js']);
    assert.deepStrictEqual(styles, ['/4.400c0d45.css']);
  });
});
