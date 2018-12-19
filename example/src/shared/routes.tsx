import React, { FunctionComponent } from 'react';
import { RouteConfig } from 'react-router-config';
import Loadable, { LoadingComponentProps } from 'react-loadable';

const Loading: FunctionComponent<LoadingComponentProps> = (props) => (
  <h1>Loading...</h1>
);

const Routes: Array<RouteConfig> = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "home" */'./pages/home'),
      loading: Loading
    })
  },
  {
    path: '/blog',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "blog" */'./pages/blog'),
      loading: Loading
    })
  },
  {
    path: '/about',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "about" */'./pages/about'),
      loading: Loading
    })
  },
  {
    path: '/project/:name',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "project" */'./pages/project'),
      loading: Loading
    })
  }
];

export default Routes;