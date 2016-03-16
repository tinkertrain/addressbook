import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, browserHistory, Router, Route, IndexRoute, RouterContext, match } from 'react-router';
import template from './base-html';

import routes from './routes';

if (typeof document !== 'undefined') {
  render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('root'));
}

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(
      null,
      template(renderToString(<RouterContext {...renderProps} />), locals.path, locals.assets)
    );
  });
};
