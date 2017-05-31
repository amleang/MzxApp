import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './route/route'

import { Provider } from 'react-redux';
import createStore from './reducers/creatReducer';



let reduxState;
if (window.__REDUX_STATE__) {
	try {
		reduxState = __REDUX_STATE__;
		__REDUX_STATE__ = {};
	} catch (e) {}
}
const store = createStore(reduxState);
render(
	 <Provider store={store}>
        <Router  history={browserHistory} routes={routes} />
    </Provider>
  ,
  document.getElementById('app')
);
