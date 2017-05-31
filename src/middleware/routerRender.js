import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import pug from 'pug'
import { Provider } from 'react-redux';
import ua from 'mobile-agent';
import routes_front from '../front/route/route'
import createStore_front from '../front/reducers/creatReducer';

const version = "1.0";
const store_front = createStore_front();

const f_tpl = pug.compileFile("./src/front/views/index.pug");
var _match = function(params) {
    return function(done) {
        match(params, (err, redirect, props) => {
            done(null, {err, redirect, props})
        });
    }
}

var prefetchComponentData = function(dispatch, components, params, scope) {
    const needs = components.reduce((prev, current) => {
        return (current.prefetchData || []).concat(prev);
    }, []);
    const promises = needs.map(need => dispatch(need(params)));
    return function(done){
        Promise.all(promises).then(res => {
            done(null, res);
        })
    };
}

var initFrame = function* (scope, store, routes, compiledFunction, next){
    var instance = yield _match({ routes: routes, location: scope.path });
    if(instance.err) {
            scope.body = {code: 500, msg: instance.err.message}
    }
    else if(instance.redirect) {
            scope.redirect(instance.redirect.pathname + instance.redirect.search)
    }
    else if(instance.props) {
        // 
        instance.props.location.query = scope.query; // 同步服务端与location的query
        yield prefetchComponentData(store.dispatch, instance.props.components, instance.props.params, scope);
        let sourceState = store.getState();
        let reduxState = JSON.stringify(sourceState);
        let html = renderToString(
        <Provider store={store}>
            { <RouterContext {...instance.props} /> }
        </Provider>
        );
        let seoInfo = store.getState().seoReducer;
        // let compiledFunction = pug.compileFile(template);
        scope.body = compiledFunction({ html, reduxState, version, seoInfo})
    }   
    else {
        yield next
    }
}
export default (app) => {
    return function* (next) {
        app.logger.info('router 中间件初始化----');
        app.logger.info(this.url);
        
        yield initFrame(this,store_front, routes_front, f_tpl, next);

    }

}
