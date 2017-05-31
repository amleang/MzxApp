import actionKeys from '../constant/constant_action';
import Utils from "../common/utils.js";
// 临时性配置
import seoConf from "./seo.js";

var url = "/";
// 服务端
if(typeof(isBrowser) == "undefined") {
	url= "http://localhost:3002/"
}
else {
	// 前端
	url = "/"
}
export function articleList(params) {
	return dispatch => {
		return new Promise(function(resolve, reject){
			Utils.fetchGet(url + "API/articles", params).then((res) => {
				
				if(res.code == 200) {
						dispatch({type: actionKeys.LIST, list:res.data.docs, counts: res.data.count})
						resolve("ok");
				}
				else {
					reject("fail");
				}
			})
		})
	}
}

export function articleDetail(params) {
	return dispatch => {
		return new Promise(function(resolve, reject){
			Utils.fetchGet(url + "API/articles/detail", params).then((res) => {
				if(res.code == 200) {
						dispatch({type: actionKeys.DETAIL, detail: res.data})
						dispatch({type: actionKeys.SEO, title:res.data.title, keywords:res.data.title, desc:res.data.desc, time: Math.random()})
						resolve("ok");
				}
				else {
					reject("fail");
				}
			})
		})
	}
}
// name 如果是String 则查询配置 
export function seoEmit(data) {
	return dispatch => {
		return new Promise(function(resolve, reject){
				let res = seoConf[data] || {}
				 dispatch({type: actionKeys.SEO, title: res.title, keywords: res.keywords, desc: res.desc, time: Math.random()})
				resolve("ok")
		})
		// else dispatch({type: actionKeys.SEO, title: data.title, keywords: data.keywords, desc: data.desc, time: Math.random()})
	}
}
