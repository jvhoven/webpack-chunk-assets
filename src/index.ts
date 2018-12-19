export interface Manifest {
  [entry: string] : string;
} 

/**
 * 
 * @param route 
 * @param manifest 
 */
const getAssetsByRoute = (route: string, manifest: Manifest) => {
  /**
   * Default '/' to 'home' and grab the base of every route:
   *  e.g. '/blog/example' becomes 'blog' and it will look for
   * entries that contain the name 'blog' in the manifest.
   */
  route = route === '/' ? 'home' : route.split('/')[1];
  let assets: { scripts: Array<string>, styles: Array<string> } = {
    'scripts': [],
    'styles': []
  };

  /**
   * Search for route name inside the manifest, but skip 
   * source-maps if they do exist.
   */
  Object.keys(manifest).forEach((key: string) => {
    if (key.match(route) && !key.endsWith('.map')) {
      key.endsWith('.js')
        ? assets['scripts'].push(manifest[key])
        : assets['styles'].push(manifest[key]);
    }
  });

  return assets;
}

export default getAssetsByRoute;
